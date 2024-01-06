import React, {useState} from 'react';
import saveGlossary from "../../../api/glossary/save";
import Form from 'react-bootstrap/Form';
import {Button, Col, Image, Row, Table} from "react-bootstrap";
import {toast} from "react-toastify";
import base64Util from "../../../utils/base64Util";

export default function Glossary({categories, glossaries, setGlossaries, setGlossaryFilter, glossaryTypes}) {
    const [addType, setAddType] = useState();
    const [addParent, setAddParent] = useState();
    const [addKey, setAddKey] = useState('');
    const [addValue, setAddValue] = useState('');
    const [addAttachment, setAddAttachment] = useState();
    const [addCategory, setAddCategory] = useState({catId: 2});
    const [addIsActive, setAddIsActive] = useState(false);

    const [blob, setBlob] = useState(null);
    const [item, setItem] = useState({
        termId: null, key: '', value: '', isActive: false, type: {
            name: ''
        }, category: {
            catId: ''
        }
    });

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
        if (type) {
            setAddType({id: type.id, name: type.name});
        } else {
            setAddType(undefined);
        }
    }

    const handleTypeEdit = (event) => {
        const value = event.target.value || null;
        setItem((values) => ({
            ...values, type: value && {id: value}
        }));
    }

    const save = async () => {
        const response = await saveGlossary({
            key: addKey,
            type: addType,
            value: addValue,
            parent: addParent,
            isActive: addIsActive,
            categoryId: addCategory.catId
        }, addAttachment);
        if (response) {
            toast.success('Glossary successfully saved');

            setGlossaries(values => [...values, {
                ...response.data, categoryName: addCategory.name, categoryId: addCategory.catId
            }]);
        }
    }

    const setItemToEdit = async (item) => {
        setItem(item);
        if (item.attachment) {
            setBlob(base64Util(item.attachment));
        } else {
            setBlob(null);
        }
    }

    const edit = async () => {
        const response = await saveGlossary({
            ...item, attachment: null
        }, typeof item.attachment === 'string' ? null : item.attachment);
        if (response) {
            toast.success('Category successfully edited');

            const index = glossaries.findIndex(item => item.termId === response.data.termId);
            if (index !== -1) {
                glossaries.splice(index, 1, response.data);
                setGlossaries([...glossaries]);
            }
        }
    }

    return (<div>
            <div className={'d-flex shadowed'}>
                <div className={'col-5 shadowed'}>
                    <h3 className={'text-center'}>Glossaries by</h3>
                    <Form.Select onChange={(event) => setGlossaryFilter(event.target.value)}>
                        {categories?.map(category => (
                            <option value={category.catId} key={category.catId}>{category.name}</option>))}
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
                            <tr onClick={() => setItemToEdit(glossary)} key={glossary.key + glossary.value}
                                role="button">
                                <td>{glossary.key}</td>
                                <td>{glossary.value}</td>
                                <td>{glossary.categoryName}</td>
                                <td>{glossary.type?.name}</td>
                                <td>
                                    <Form.Switch
                                        disabled
                                        checked={glossary.isActive}
                                    /></td>
                            </tr>))}
                        </tbody>
                    </Table>
                </div>
                <div className={'col-7 shadowed'}>
                    <Form className={'shadowed mb-2 pb-4'}>
                        <h3 className={'text-center'}>Add glossary</h3>
                        <hr/>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Key</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    value={addKey}
                                    isValid={addKey}
                                    isInvalid={!addKey}
                                    placeholder="Key"
                                    onChange={handleKey}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Set <span className='fw-bold'>key</span>
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Value</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    value={addValue}
                                    isValid={addValue}
                                    isInvalid={!addValue}
                                    placeholder="Value"
                                    onChange={handleValue}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Set <span className='fw-bold'>value</span>
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Value type</Form.Label>
                            <Col sm={8}>
                                <Form.Select onChange={handleType}>
                                    <option value={null}></option>
                                    {glossaryTypes?.map((type, index) => (
                                        <option value={index} key={type.name}>{type.name}</option>))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Category</Form.Label>
                            <Col sm={8}>
                                <Form.Select
                                    isValid={addCategory.catId}
                                    isInvalid={!addCategory.catId}
                                    onChange={handleCategory}
                                >
                                    {categories?.map((category, index) => (
                                        <option value={index} key={category.catId}>{category.name}</option>))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Select <span className='fw-bold'>category</span>
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Parent</Form.Label>
                            <Col sm={8}>
                                <Form.Select onChange={handleParent}>
                                    <option value={null}></option>
                                    {glossaries?.map(glossary => (<option value={glossary.termId}
                                                                          key={glossary.termId}>{glossary.value}</option>))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Attachment</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type={'file'}
                                    placeholder="Attachment"
                                    onChange={handleAttachment}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className={'text-end'}>Is active</Form.Label>
                            <Col sm={8} className="d-flex align-items-center">
                                <Form.Switch
                                    checked={addIsActive}
                                    onChange={handleActive}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}></Form.Label>
                            <Col sm={8}>
                                <Button
                                    onClick={save}
                                    variant={'primary'}
                                    disabled={!addKey || !addValue || !addCategory}
                                >
                                    Save
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                    <h3 className={'text-center'}>Edit Glossary</h3>
                    <hr/>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Key</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value={item.key}
                                isValid={item.key}
                                isInvalid={item.termId && !item.key}
                                placeholder="Key"
                                onChange={(event) => setItem((values) => ({...values, key: event.target.value}))}
                            />
                            <Form.Control.Feedback type="invalid">
                                Set <span className='fw-bold'>key</span>
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Value</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                value={item.value}
                                isValid={item.value}
                                isInvalid={item.termId && !item.value}
                                placeholder="Value"
                                onChange={(event) => setItem((values) => ({...values, value: event.target.value}))}
                            />
                            <Form.Control.Feedback type="invalid">
                                Set <span className='fw-bold'>value</span>
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Category</Form.Label>
                        <Col sm={8}>
                            <Form.Select value={item.categoryId}
                                         onChange={(event) => setItem((values) => ({
                                             ...values, category: {catId: event.target.value}
                                         }))}>
                                {categories?.map(category => (
                                    <option value={category.catId} key={category.catId}>{category.name}</option>))}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Type</Form.Label>
                        <Col sm={8}>
                            <Form.Select value={item.type?.id || {id: null}}
                                         onChange={handleTypeEdit}>
                                <option value={null}></option>
                                {glossaryTypes?.map(type => (
                                    <option value={type.id} key={type.name}>{type.name}</option>))}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Parent</Form.Label>
                        <Col sm={8}>
                            <Form.Select onChange={(event) => setItem((values) => ({
                                ...values, parent: event.target.value
                            }))}>
                                <option value={null}></option>
                                {glossaries?.map(glossary => (
                                    <option value={glossary.termId} key={glossary.termId}>{glossary.value}</option>))}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Is active</Form.Label>
                        <Col sm={8} className="d-flex align-items-center">
                            <Form.Switch
                                checked={item.isActive}
                                onChange={(event) => setItem((values) => ({...values, isActive: event.target.checked}))}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className={'text-end'}>Attachment</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                placeholder="Attachment"
                                onChange={(event) => setItem((values) => ({
                                    ...values, attachment: event.target.files[0]
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
                            <Button
                                onClick={edit}
                                variant={'primary'}
                                disabled={!item.key || !item.value}
                            >
                                Edit
                            </Button>
                        </Col>
                    </Form.Group>
                </div>
            </div>
        </div>);
}
