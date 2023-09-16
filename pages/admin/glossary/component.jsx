import React, {useEffect, useState} from 'react';
import getCategories from "../../../api/category/get-all";
import saveGlossary from "../../../api/glossary/save";
import getByCategoryGlossaries from "../../../api/glossary/get-all";
import Form from 'react-bootstrap/Form';
import {Button, Image, Row, Col, Table} from "react-bootstrap";
import getGlossaryTypes from "../../../api/glossary/get-types";

export default function Glossary() {
    const [glossaries, setGlossaries] = useState([]);
    const [categories, setCategories] = useState([]);
    const [glossaryTypes, setGlossaryTypes] = useState([]);

    const [addType, setAddType] = useState();
    const [addParent, setAddParent] = useState();
    const [addKey, setAddKey] = useState('');
    const [addValue, setAddValue] = useState('');
    const [addAttachment, setAddAttachment] = useState();
    const [addCategory, setAddCategory] = useState({});
    const [addIsActive, setAddIsActive] = useState(false);

    const [glossariesBy, setGlossariesBy] = useState(1);
    const [blob, setBlob] = useState(null);
    const [item, setItem] = useState({
        key: '',
        value: '',
        isActive: false,
        type: {
            name: ''
        },
        category: {
            catId: ''
        }
    });

    useEffect(() => {
        const fetchCategories = async () => await getCategories();
        fetchCategories().then((categories) => {
            setCategories(categories);
        });
    }, []);

    useEffect(() => {
        const fetchGlossaryTypes = async () => await getGlossaryTypes();
        fetchGlossaryTypes().then((types) => {
            setGlossaryTypes(types);
        });
    }, []);

    useEffect(() => {
        const fetchCategoryGlossaries = async () => await getByCategoryGlossaries(glossariesBy);
        fetchCategoryGlossaries().then((glossaries) => {
            setGlossaries(glossaries);
        });
    }, [glossariesBy]);

    const handleKey = (event) => setAddKey(event.target.value);
    const handleValue = (event) => setAddValue(event.target.value)
    const handleParent = (event) => setAddParent(event.target.value);
    const handleActive = (event) => setAddIsActive(event.target.checked);
    const handleAttachment = (event) => setAddAttachment(event.target.files[0]);
    const handleCategory = (event) => {
        const category = categories[event.target.value];
        setAddCategory(category);
    }

    const handleType = (event) => {
        const type = glossaryTypes[event.target.value];
        setAddType({id: type.id, name: type.name});
    }

    const handleTypeEdit = (event) => {
        const value = event.target.value || null;
        setItem((values) => ({
            ...values,
            type: value && {id: value}
        }));
    }

    const saveNew = async () => {
        const response = await saveGlossary(
            {
                key: addKey,
                type: addType,
                value: addValue,
                parent: addParent,
                isActive: addIsActive,
                categoryId: addCategory.catId
            }, addAttachment);
        if (response) {
            setGlossaries(values => [...values,
                {
                    ...response.data,
                    categoryName: addCategory.name,
                    categoryId: addCategory.catId
                }]);
        }
    }

    const setItemToEdit = async (item) => {
        setItem(item);
        if (item.attachment) {
            setBlob(`data:image/jpeg;base64,${item.attachment}`);
        } else {
            setBlob(null);
        }
    }

    const edit = async () => {
        const response = await saveGlossary({
            ...item,
            attachment: null
        }, typeof item.attachment === 'string' ? null : item.attachment);
        if (response) {
            const index = glossaries.findIndex(item => item.termId === response.data.termId);
            if (index !== -1) {
                glossaries.splice(index, 1, response.data);
                setGlossaries([...glossaries]);
            }
        }
    }

    return (
        <div>
            <div className={'d-flex border'}>
                <div className={'col-5 border'}>
                    <h3 className={'text-center'}>Glossaries by</h3>
                    <Form.Select aria-label="Category" onChange={(event) => setGlossariesBy(event.target.value)}>
                    {categories?.map(category => (
                        <option value={category.catId} key={category.catId}>{category.name}</option>
                    ))}
                    </Form.Select>
                    <hr/>
                    <Table striped bordered variant='dark'>
                        <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Is active</th>
                        </tr>
                        </thead>
                        <tbody>
                        {glossaries?.map((glossary) => (
                            <tr onClick={() => setItemToEdit(glossary)} key={glossary.value} role="button">
                                <td>{glossary.key}</td>
                                <td>{glossary.value}</td>
                                <td>{glossary.categoryName}</td>
                                <td>{glossary.type?.name}</td>
                                <td>
                                    <Form.Check
                                        disabled
                                        type={'switch'}
                                        checked={glossary.isActive}
                                    /></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className={'col-7 border'}>
                    <Form className={'border mb-2 pb-4'}>
                        <h3 className={'text-center'}>Add glossary</h3>
                        <hr/>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Key</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    placeholder="Key"
                                    aria-label="Key"
                                    aria-describedby="basic-addon1"
                                    onChange={handleKey}
                                    value={addKey}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Value</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    placeholder="Value"
                                    aria-label="Value"
                                    aria-describedby="basic-addon1"
                                    onChange={handleValue}
                                    value={addValue}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Category</Form.Label>
                            <Col sm={8}>
                                <Form.Select aria-label="Category" onChange={handleCategory}>
                                    {categories?.map((category, index) => (
                                        <option value={index} key={category.catId}>{category.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Type</Form.Label>
                            <Col sm={8}>
                                <Form.Select aria-label="Category" onChange={handleType}>
                                    <option value={null}></option>
                                    {glossaryTypes?.map((type, index) => (
                                        <option value={index} key={type.name}>{type.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Parent</Form.Label>
                            <Col sm={8}>
                                <Form.Select aria-label="Parent" onChange={handleParent}>
                                    <option value={null}></option>
                                    {glossaries?.map(glossary => (
                                        <option value={glossary.termId} key={glossary.termId}>{glossary.value}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Attachment</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    placeholder="Attachment"
                                    aria-label="Attachment"
                                    aria-describedby="basic-addon1"
                                    onChange={handleAttachment}
                                    type={'file'}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Is active</Form.Label>
                            <Col sm={8}>
                                <Form.Check
                                    type={'checkbox'}
                                    id={`isActive`}
                                    onChange={handleActive}
                                    checked={addIsActive}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}></Form.Label>
                            <Col sm={8}>
                                <Button variant={'primary'} onClick={saveNew}>Save</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                    <h3 className={'text-center'}>Edit Glossary</h3>
                    <hr/>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Key</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                placeholder="Key"
                                aria-label="Key"
                                aria-describedby="basic-addon1"
                                onChange={(event) => setItem((values) => ({...values, key: event.target.value}))}
                                value={item.key}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Value</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                placeholder="Value"
                                aria-label="Value"
                                aria-describedby="basic-addon1"
                                onChange={(event) => setItem((values) => ({...values, value: event.target.value}))}
                                value={item.value}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Category</Form.Label>
                        <Col sm={8}>
                            <Form.Select aria-label="Category" value={item.categoryId} onChange={(event) => setItem((values) => ({
                                ...values,
                                category: {catId: event.target.value}
                            }))}>
                                {categories?.map(category => (
                                    <option value={category.catId} key={category.catId}>{category.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Type</Form.Label>
                        <Col sm={8}>
                            <Form.Select aria-label="Type" value={item.type?.id || {id: null}} onChange={handleTypeEdit}>
                                <option value={null}></option>
                                {glossaryTypes?.map(type => (
                                    <option value={type.id} key={type.name}>{type.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Parent</Form.Label>
                        <Col sm={8}>
                            <Form.Select aria-label="Parent" onChange={(event) => setItem((values) => ({...values, parent: event.target.value}))}>
                                <option value={null}></option>
                                {glossaries?.map(glossary => (
                                    <option value={glossary.termId} key={glossary.termId}>{glossary.value}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Is active</Form.Label>
                        <Col sm={8}>
                            <Form.Check
                                type={'checkbox'}
                                id={`editIsActive`}
                                onChange={(event) => setItem((values) => ({...values, isActive: event.target.checked}))}
                                checked={item.isActive}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Attachment</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                placeholder="Attachment"
                                aria-label="Attachment"
                                aria-describedby="basic-addon1"
                                onChange={(event) => setItem((values) => ({
                                    ...values,
                                    attachment: event.target.files[0]
                                }))}
                                name={'Attachment'}
                                type={'file'}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Preview</Form.Label>
                        <Col sm={8}>
                        	{blob && <Image rounded src={blob} fluid/>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3}></Form.Label>
                        <Col sm={8}>
                            <Button variant={'primary'} onClick={edit}>Save</Button>
                        </Col>
                    </Form.Group>
                </div>
            </div>
        </div>
    );
}
