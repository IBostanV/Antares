import React from 'react';
import {Button, Col, Container, Image, Row} from 'react-bootstrap';
import {Calendar} from 'primereact/calendar';
import {MultiSelect} from 'primereact/multiselect';
import {InputText} from 'primereact/inputtext';
import {saveProfileInfo} from '../../api/profile';
import {toast} from 'react-toastify';
import {changePassword, verifyOldPassword} from '../../api/authentication';
import {CHANGE_PASSWORD_URL} from '../../api/constant';
import {useRouter} from 'next/router';
import moment from 'moment';
import {setWIthPreview} from '../../utils/fileUtils';
import {useTranslation} from "react-i18next";
import {FlexContainer} from "../../components/common/FlexContainer";
import {useProfile, useProfileSecurity} from "./hooks";

type ValueChangeType = (arg: any) => void;

function Profile() {
    const router = useRouter();
    const { t} = useTranslation();

    const {
        categories,
        userOccupations,
        avatar, setAvatar,
        user, setUser,
        previewAvatar, setPreviewAvatar,
    } = useProfile();

    const {
        password, setPassword,
        oldPassword, setOldPassword,
        repeatPassword, setRepeatPassword,
        passwordMatches, setPasswordMatches
    } = useProfileSecurity();

    const handleChange = (event, field: string) =>
        setUser(values => ({
            ...values,
            [field]: event.value
        }));

    const handleTargetChange = (event, field: string) =>
        setUser(values => ({
            ...values,
            [field]: event.target.value
        }));

    const handleFunctionChange = (event, setValue: ValueChangeType) =>
        setValue(event.target.value);

    const saveProfile = async () => {
        const birthday = moment(user.birthday).format('YYYY-MM-DD');
        const infoSaved = await saveProfileInfo(
            {...user, isEnabled: user.enabled, birthday},
            avatar
        );

        if (infoSaved) {
            toast.success(t('saved'));
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
        <FlexContainer>
            <Container>
                <h3>{t('user')}</h3>
                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                readOnly
                                value={user.email}
                                onChange={(event) => handleTargetChange(event, 'email')}
                                className="w-100"
                            />
                            <label htmlFor="input_value">{t('email')}</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                value={user.username}
                                onChange={(event) => handleTargetChange(event, 'username')}
                                className="w-100"/>
                            <label htmlFor="input_value">{t('username')}</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                value={user.name}
                                onChange={(event) => handleTargetChange(event, 'name')}
                                className="w-100"/>
                            <label htmlFor="input_value">{t('name')}</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                value={user.surname}
                                onChange={(event) => handleTargetChange(event, 'surname')}
                                className="w-100"/>
                            <label htmlFor="input_value">{t('surname')}</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                value={user.theme}
                                onChange={(event) => handleTargetChange(event, 'theme')}
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
                                onChange={(event) => handleChange(event, 'occupations')}
                                options={userOccupations}
                                optionLabel="name"
                                virtualScrollerOptions={{itemSize: 40}}
                                className="w-100"/>
                            <label htmlFor="input_value">{t('occupation')}</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col sm={6}>
                        <span className="p-float-label">
                                <Calendar
                                    showButtonBar
                                    className="w-100"
                                    value={user.birthday}
                                    dateFormat="yy-mm-dd"
                                    onChange={(event) => handleTargetChange(event, 'birthday')}
                                />
                            <label htmlFor="input_value">{t('birthday')}</label>
                        </span>
                    </Col>

                    <Col sm={6}>
                        <span className="p-float-label">
                            <MultiSelect
                                filter
                                value={user.favoriteCategories}
                                onChange={(event) => handleChange(event, 'favoriteCategories')}
                                options={categories}
                                optionLabel="name"
                                virtualScrollerOptions={{itemSize: 40}}
                                className="w-100"/>
                            <label htmlFor="input_value">{t('favorite_categories')}</label>
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
                        <Button onClick={saveProfile}>{t('save')}</Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                <h3>{t('privacy')}</h3>
                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                type="password"
                                autoComplete='new-password'
                                value={oldPassword}
                                onChange={(event) => handleFunctionChange(event, setOldPassword)}
                                onBlur={checkOldPassword}
                                className={passwordMatches === null || passwordMatches ? 'w-100' : 'w-100 p-invalid'}
                            />
                            <label htmlFor="input_value">{t('old_password')}</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                type="password"
                                value={password}
                                onChange={(event) => handleFunctionChange(event, setPassword)}
                                className="w-100"/>
                            <label htmlFor="input_value">{t('new_password')}</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <span className="p-float-label">
                            <InputText
                                type="password"
                                value={repeatPassword}
                                onChange={(event) => handleFunctionChange(event, setRepeatPassword)}
                                className="w-100"/>
                            <label htmlFor="input_value">{t('retype_new_password')}</label>
                        </span>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Button onClick={savePassword}>{t('change_password')}</Button>
                    </Col>
                </Row>
            </Container>
        </FlexContainer>
    );
}

export default Profile;