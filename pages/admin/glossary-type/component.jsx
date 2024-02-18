import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Col, Row, Table } from 'react-bootstrap';
import saveGlossaryType from '../../../api/glossary/save-type';
import { toast } from 'react-toastify';

function GlossaryType({
  glossaryTypes,
  setGlossaryTypes
}) {
  const [options, setOptions] = useState();
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleName = (event) => setName(event.target.value);
  const handleOptions = (event) => setOptions(event.target.value);
  const handleIsActive = (event) => setIsActive(event.target.checked);

  const save = async () => {
    const response = await saveGlossaryType({
      name,
      options,
      isActive
    });
    if (response) {
      toast.success('Glossary type successfully saved');

      setName('');
      setGlossaryTypes([...glossaryTypes, response.data]);
    }
  };

  return (
    <div className={'d-flex m-2'}>
      <div className={'col-3 shadowed'}>
        <Table striped bordered variant="dark">
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
      <Form className={'col-9 shadowed'}>
        <h4 className={'text-center'}>Glossary Types</h4>
        <hr/>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Name</Form.Label>
          <Col sm={8}>
            <Form.Control
              value={name}
              isValid={name}
              isInvalid={!name}
              placeholder="Name"
              onChange={handleName}
            />
            <Form.Control.Feedback type="invalid">
              Select <span className="fw-bold">name</span>
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Options</Form.Label>
          <Col sm={8}>
            <Form.Control
              value={options}
              placeholder="Options"
              onChange={handleOptions}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Is Active</Form.Label>
          <Col sm={8} className="d-flex align-items-center">
            <Form.Switch
              checked={isActive}
              onChange={handleIsActive}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}></Form.Label>
          <Col sm={8}>
            <Button
              onClick={save}
              variant={'primary'}
              disabled={!name}
            >
              Save
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default GlossaryType;