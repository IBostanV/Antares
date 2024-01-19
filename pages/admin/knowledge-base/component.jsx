import Form from 'react-bootstrap/Form';
import { Button, Col, Image, Row } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import { saveKnowledgeBaseRecord } from '../../../api/knowledge-base';
import { toast } from 'react-toastify';
import { KnowledgeBaseRecord } from '../../../components/domain/knowledge-base-record';
import { setWIthPreview } from '../../../utils/fileUtils';
import { KnowledgeBaseStatusEnum } from '../../../components/enums/knowledge-base-status-enum';
import { Editor } from 'primereact/editor';

const KnowledgeBaseAdmin = ({ categories }) => {
  const category = useRef();
  const parent = useRef();
  const visible = useRef();

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState();
  const [status, setStatus] = useState();
  const [attachment, setAttachment] = useState();
  const [previewAttachment, setPreviewAttachment] = useState(null);

  const handleTitle = (event) => setTitle(event.target.value);
  const handleTags = (event) => setTags(event.target.value);
  const handleImage = (event) => setWIthPreview(event, attachment, setAttachment, setPreviewAttachment);

  const submit = async () => {
    const isVisible = visible.current.checked;
    const categoryId = categories[category.current.selectedIndex].catId;
    const record = new KnowledgeBaseRecord(categoryId, content, tags, title, isVisible);

    const result = await saveKnowledgeBaseRecord(record, attachment);
    if (result) {
      toast.success('Record successfully saved!');
    }
  };

  return (
    <Form className={'col-5 shadowed'}>
      <h3 className={'text-center'}>Create new record</h3>
      <hr/>

      <Form.Group
        as={Row}
        className="mb-3">
        <Form.Label
          column sm={3}
          className={'text-end'}
        >
          Title
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            value={title}
            isValid={title}
            isInvalid={!title}
            placeholder="Title"
            onChange={handleTitle}
          />
          <Form.Control.Feedback type="invalid">
            Set <span className="fw-bold">title</span>
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
          Content
        </Form.Label>
        <Col sm={8}>
          <Editor
            value={content}
            onTextChange={(e) => setContent(e.htmlValue)}
            style={{ height: '320px' }}/>
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        className="mb-3">
        <Form.Label
          column sm={3}
          className={'text-end'}
        >
          Tags
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            value={tags}
            isValid={tags}
            isInvalid={!tags}
            placeholder="Tags"
            onChange={handleTags}
          />
          <Form.Control.Feedback type="invalid">
            Set <span className="fw-bold">tags</span>
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
          Category
        </Form.Label>
        <Col sm={8}>
          <Form.Select
            ref={category}
          >
            {categories?.map(item =>
              (<option value={item.catId} key={item.catId}>{item.name}</option>)
            )}
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3} className={'text-end'}>
          Status
        </Form.Label>
        <Col sm={8}>
          <Form.Select ref={category}>
            {Object.values(KnowledgeBaseStatusEnum)
              .map((item, index) =>
                (<option value={item} key={index}>{item}</option>)
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
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
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
          Attachment
        </Form.Label>
        <Col>
          <input
            type="file"
            onChange={handleImage}
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
            src={previewAttachment}
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
            disabled={!title}
          >
            Save
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default KnowledgeBaseAdmin;