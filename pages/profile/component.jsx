import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row} from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';
import {MultiSelect} from 'primereact/multiselect';
import {getAllCategoriesShort} from '../../api/category';
import {Dropdown} from 'primereact/dropdown';
import getLanguages from '../../api/question/get-languages';
import {InputText} from 'primereact/inputtext';
import {getOccupations, saveProfileInfo} from '../../api/profile';
import {toast} from 'react-toastify';
import {changePassword, verifyOldPassword} from '../../api/authentication';
import {CHANGE_PASSWORD_URL} from '../../api/constant';
import {useRouter} from 'next/router';
import {getCurrentUser} from '../../api/user';
import base64Util from '../../utils/base64Util';
import moment from 'moment';
import {setWIthPreview} from '../../utils/fileUtils';

function Profile() {
    const router = useRouter();

    const [user, setUser] = useState({});

    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [passwordMatches, setPasswordMatches] = useState(null);

    const [languages, setLanguages] = useState([]);
    const [userOccupations, setUserOccupations] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleName = (event) => setUser(values => ({
        ...values,
        name: event.target.value
    }));
    const handleBirthday = (event) => setUser(values => ({
        ...values,
        birthday: event.target.value
    }));
    const handleLanguage = (event) => setUser(values => ({
        ...values,
        language: event.value
    }));
    const handleEmail = (event) => setUser(values => ({
        ...values,
        email: event.target.value
    }));
    const handleTheme = (event) => setUser(values => ({
        ...values,
        theme: event.target.value
    }));
    const handleUserOccupation = (event) => setUser(values => ({
        ...values,
        occupations: event.value
    }));
    const handleSurname = (event) => setUser(values => ({
        ...values,
        surname: event.target.value
    }));
    const handleUsername = (event) => setUser(values => ({
        ...values,
        username: event.target.value
    }));
    const handleFavCategories = (event) => {
        console.log(event.value)
        setUser(values => ({
            ...values,
            favoriteCategories: event.value
        }));
    }

    const handlePassword = (event) => setPassword(event.target.value);
    const handleOldPassword = (event) => setOldPassword(event.target.value);
    const handleRepeatPassword = (event) => setRepeatPassword(event.target.value);

    useEffect(() => {
        const fetchUser = async () => await getCurrentUser();
        fetchUser()
            .then((response) => {
                const {
                    birthday = [2000, 1, 1],
                    avatar
                } = response ?? {};
                setUser({
                    ...response,
                    birthday: new Date(birthday[0], birthday[1] - 1, birthday[2])
                });
                setPreviewAvatar(avatar && base64Util(avatar));
            });
    }, []);

    useEffect(() => {
        const fetchCategories = async () => await getAllCategoriesShort();
        fetchCategories()
            .then(result => setCategories(result));

        const fetchLanguages = async () => await getLanguages();
        fetchLanguages()
            .then(result => setLanguages(result));

        const fetchOccupations = async () => await getOccupations();
        fetchOccupations()
            .then(result => setUserOccupations(result));
    }, []);

    const saveProfile = async () => {
        const birthday = moment(user.birthday)
            .format('YYYY-MM-DD');
        const response = await saveProfileInfo(({
            ...user,
            isEnabled: user.enabled,
            birthday
        }), avatar);

        if (response) {
            toast.success('Your info has been successfully saved');
        }
    };

    const savePassword = async () => {
        if (password !== repeatPassword) {
            toast.error('Passwords do not match. Try again');
            return;
        }

        if (!passwordMatches) {
            toast.error('Old password does not match');
            return;
        }

        const response = await changePassword(CHANGE_PASSWORD_URL, {
            oldPassword,
            password
        });
        if (response) {
            toast.success('Password successfully changed');
            await router.push('/login');
        }
    };

    const checkOldPassword = async () => {
        if (!oldPassword) {
            setPasswordMatches(null);
            return;
        }

        const response = await verifyOldPassword({password: oldPassword});
        setPasswordMatches(response === true);
    };

    return (
        <div className="d-flex">
            <Container>
                <h3>User</h3>
                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                value={user.username}
                                onChange={handleUsername}
                                className="w-100"/>
                            <label htmlFor="input_value">Username</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                readOnly
                                value={user.email}
                                onChange={handleEmail}
                                className="w-100"
                            />
                            <label htmlFor="input_value">Email</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                value={user.name}
                                onChange={handleName}
                                className="w-100"/>
                            <label htmlFor="input_value">Name</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                value={user.surname}
                                onChange={handleSurname}
                                className="w-100"/>
                            <label htmlFor="input_value">Surname</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                value={user.theme}
                                onChange={handleTheme}
                                className="w-100"/>
                            <label htmlFor="input_value">Theme</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <MultiSelect
                                filter
                                value={user.occupations}
                                onChange={handleUserOccupation}
                                options={userOccupations}
                                optionLabel="name"
                                virtualScrollerOptions={{itemSize: 40}}
                                className="w-100"/>
                            <label htmlFor="input_value">Occupation</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col sm={4}>
                        <span className="p-float-label">
                                <Calendar
                                    showButtonBar
                                    className="w-100"
                                    value={user.birthday}
                                    dateFormat="yy-mm-dd"
                                    onChange={handleBirthday}
                                />
                            <label htmlFor="input_value">Birthday</label>
                        </span>
                    </Col>
                    <Col sm={4}>
                        <span className="p-float-label">
                                <Dropdown
                                    value={user.language}
                                    onChange={handleLanguage}
                                    options={languages}
                                    optionLabel="name"
                                    className="w-100"/>
                            <label htmlFor="input_value">Language</label>
                        </span>
                    </Col>
                    <Col sm={4}>
                        <span className="p-float-label">
                            <MultiSelect
                                filter
                                value={user.favoriteCategories}
                                onChange={handleFavCategories}
                                options={categories}
                                optionLabel="name"
                                virtualScrollerOptions={{itemSize: 40}}
                                className="w-100"/>
                            <label htmlFor="input_value">Favorite categories</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <input
                            type="file"
                            onChange={(event) => setWIthPreview(event, avatar, setAvatar, setPreviewAvatar)}
                        />
                        <Image
                            fluid
                            rounded
                            width={200}
                            src={previewAvatar}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button onClick={saveProfile}>Save</Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                <h3>Privacy</h3>
                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                type="password"
                                value={oldPassword}
                                onChange={handleOldPassword}
                                onBlur={checkOldPassword}
                                className={passwordMatches === null || passwordMatches ? 'w-100' : 'w-100 p-invalid'}
                            />
                            <label htmlFor="input_value">Old password</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                type="password"
                                value={password}
                                onChange={handlePassword}
                                className="w-100"/>
                            <label htmlFor="input_value">New password</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                type="password"
                                value={repeatPassword}
                                onChange={handleRepeatPassword}
                                className="w-100"/>
                            <label htmlFor="input_value">Retype new password</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Button onClick={savePassword}>Change password</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;