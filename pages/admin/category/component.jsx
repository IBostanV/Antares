import React, {useEffect, useRef, useState} from 'react';
import {getAllCategories, saveCategory} from "../../../api/category";
import Form from "react-bootstrap/Form";
import {Button, Col, Row, Table} from "react-bootstrap";
import {toast} from "react-toastify";

function Category() {
    const name = useRef();
    const parent = useRef();
    const visible = useRef();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => await getAllCategories();
        fetchCategories().then((result) => setCategories(result));
    }, []);

    const submit = async () => {
        const response = await saveCategory({
            name: name.current.value,
            parentId: parent.current.value,
            visible: visible.current.checked
        });

        if (response) {
            toast.success('Category successfully saved');

            const index = parent.current.selectedIndex;
            const parentName = parent.current.options[index].textContent;
            setCategories([...categories, {...response.data, parentName}]);

            name.current.value = null;
            parent.current.value = null;
        }
    }

    return (
        <div className={'d-flex m-2 border'}>
            <div className={'col-3 border'}>
                <Table striped bordered variant='dark'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parent</th>
                        <th className="text-center">Visible</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories?.map(item => (
                        <tr key={item.catId}>
                            <td>{item.name}</td>
                            <td>{item.parentName}</td>
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
            <Form className={'col-9'}>
                <h3 className={'text-center'}>Categories</h3>
                <hr/>
                <Form.Group
                    as={Row}
                    className="mb-3">
                    <Form.Label
                        column sm={3}
                        className={'text-end'}>
                        Name
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            ref={name}
                            aria-label="Name"
                            placeholder="Name"
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
                        Parent
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Select
                            aria-label="Sub-category"
                            ref={parent}
                        >
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
                        Save
                    </Form.Label>
                    <Col sm={8}>
                        <Button
                            variant={'primary'}
                            onClick={submit}
                        >
                            Submit
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Category;