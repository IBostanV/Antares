import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import {Button, Col, Row, Table} from "react-bootstrap";
import getGlossaryTypes from "../../../api/glossary/get-types";
import saveGlossaryType from "../../../api/glossary/save-type";

function GlossaryType() {
    const [glossaryTypes, setGlossaryTypes] = useState([]);

    const [options, setOptions] = useState();
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const fetchData = async () => await getGlossaryTypes();

        fetchData().then((result) => setGlossaryTypes(result));
    }, []);


    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleOptions = (event) => {
        setOptions(event.target.value);
    }

    const handleIsActive = (event) => {
        setIsActive(event.target.checked);
    }

    const submit = async () => {
        const response = await saveGlossaryType({name, options, isActive});
        if (response) {
            setName('');
            setGlossaryTypes([...glossaryTypes, response.data]);
        }
    }

    return (
        <div className={'d-flex m-2 border'}>
            <div className={'col-3 border'}>
                <Table striped bordered variant='dark'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Options</th>
                        <th>Is Active</th>
                    </tr>
                    </thead>
                    <tbody>
                    {glossaryTypes?.map(item => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.options}</td>
                            <td>
                                <Form.Switch
                                    disabled
                                    defaultChecked={isActive}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <Form className={'col-9'}>
                <h3 className={'text-center'}>Glossary Types</h3>
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
                    <Form.Label column sm={3} className={'text-end'}>Options</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            placeholder="Options"
                            aria-label="Options"
                            aria-describedby="basic-addon1"
                            onChange={handleOptions}
                            value={options}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Is Active</Form.Label>
                    <Col sm={8}>
                        <Form.Switch
                            onChange={handleIsActive}
                            checked={isActive}
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

export default GlossaryType;