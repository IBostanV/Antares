import React, {useRef, useState} from 'react';
import {saveCategory} from "../../../api/category";
import Form from "react-bootstrap/Form";
import {Button, Col, Image, Row, Table} from "react-bootstrap";
import {toast} from "react-toastify";
import base64Util from "../../../utils/base64Util";

const Category = ({categories, setCategories}) => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);

    const parent = useRef();
    const visible = useRef();

    const handleName = (event) => setName(event.target.value);

    const handleAvatar = (event) => {
        const file = event.target.files[0];
        setAvatar(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewAvatar(reader.result);
            reader.readAsDataURL(file);
        } else if (!avatar) {
            setPreviewAvatar(null);
        }
    };

    const submit = async () => {
        const response = await saveCategory({
            name,
            parentId: parent.current.value,
            visible: visible.current.checked
        }, avatar);

        if (response) {
            toast.success('Category successfully saved');

            const index = parent.current.selectedIndex;
            const parentName = parent.current.options[index].textContent;
            setCategories([...categories, {...response.data, parentName}]);

            setName('');
            parent.current.value = null;
        }
    }

    return (
        <div className='d-flex justify-content-around m-2'>
            <div className={'col-5 shadowed'}>
                <h3 className={'text-center'}>Categories</h3>
                <hr/>
                <Table striped bordered variant='dark'>
                    <thead>
                    <tr>
                        <th className='col-4'>Name</th>
                        <th className='col-3'>Parent</th>
                        <th className='col-3'>Attachment</th>
                        <th className="text-center col-2">Visible</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories?.map(item => (
                        <tr key={item.catId}>
                            <td>{item.name}</td>
                            <td>{item.parentName}</td>
                            <td>
                                {item.attachment && (
                                    <Image
                                        rounded
                                        width={200}
                                        src={base64Util(item.attachment)}
                                        fluid
                                    />
                                )}
                            </td>
                            <td className="text-center">
                                <Form.Switch
                                    disabled
                                    defaultChecked={item.visible}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <Form className={'col-5 shadowed'}>
                <h3 className={'text-center'}>Add category</h3>
                <hr/>
                <Form.Group
                    as={Row}
                    className="mb-3">
                    <Form.Label
                        column sm={3}
                        className={'text-end'}
                    >
                        Name
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            value={name}
                            isValid={name}
                            isInvalid={!name}
                            placeholder="Name"
                            onChange={handleName}
                        />
                        <Form.Control.Feedback type="invalid">
                            Set <span className='fw-bold'>name</span>
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3">
                    <Form.Label
                        column sm={3}
                        className={'text-end'}
                    >
                        Parent
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Select ref={parent}>
                            <option value={null}></option>
                            {categories?.map(item =>
                                (<option value={item.catId} key={item.catId}>{item.name}</option>)
                            )}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3">
                    <Form.Label
                        column sm={3}
                        className={'text-end'}
                    >
                        Visible
                    </Form.Label>
                    <Col
                        sm={8}
                        style={{display: 'flex', alignItems: 'center'}}
                    >
                        <Form.Switch ref={visible}/>
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3">
                    <Form.Label
                        column sm={3}
                        className={'text-end'}
                    >
                        Image
                    </Form.Label>
                    <Col>
                        <input
                            type='file'
                            onChange={handleAvatar}
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}/>
                    <Col>
                        <Image
                            fluid
                            rounded
                            width={200}
                            src={previewAvatar}
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className="mb-3">
                    <Form.Label
                        column sm={3}
                        className={'text-end'}
                    >
                    </Form.Label>
                    <Col sm={8}>
                        <Button
                            variant={'primary'}
                            onClick={submit}
                            disabled={!name}
                        >
                            Save
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Category;