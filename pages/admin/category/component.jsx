import React, {useEffect, useState} from 'react';
import getCategories from '../../../api/category/get-all';
import {saveCategory} from "../../../api/category";
import Form from "react-bootstrap/Form";
import {Button, Col, Row, Table} from "react-bootstrap";

function Category() {
    const [categories, setCategories] = useState([]);

    const [parent, setParent] = useState();
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            return await getCategories();
        };

        fetchData().then((result) => setCategories(result));
    }, []);


    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleSubcategory = (event) => {
        const category = JSON.parse(event.target.value);
        setParent({catId: category.catId, name: category.name});
    }

    const handleVisible = (event) => {
        setVisible(event.target.checked);
    }

    const submit = async () => {
        const response = await saveCategory({name, parent, visible});
        if (response) {
            setName('');
            setCategories([...categories, response.data]);
        }
    }

    return (
        <div className={'d-flex m-2 border'}>
            <div className={'col-3 border'}>
                <Table striped bordered variant='dark'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Sub Category</th>
                        <th className="text-center">Visible</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories?.map(item => (
                        <tr key={item.catId}>
                            <td>{item.name}</td>
                            <td>{item?.parent?.name}</td>
                            <td className="text-center">
                                <Form.Switch
                                    disabled
                                    id={`default-checkbox`}
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
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Name</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                            onChange={handleName}
                            value={name}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Sub-category</Form.Label>
                    <Col sm={8}>
                        <Form.Select aria-label="Sub-category" onChange={handleSubcategory}>
                            <option value={null}></option>
                            {categories?.map(item => (
                                <option value={JSON.stringify(item)} key={item.catId}>{item.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Visible</Form.Label>
                    <Col sm={8} style={{display: 'flex', alignItems: 'center'}}>
                        <Form.Switch
                            id={`visible`}
                            onChange={handleVisible}
                            checked={visible}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}></Form.Label>
                    <Col sm={8}>
                        <Button variant={'primary'} onClick={submit}>Save</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Category;