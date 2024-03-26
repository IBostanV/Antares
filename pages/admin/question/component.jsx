import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Col, Row, Table } from 'react-bootstrap';
import getQuestionTypes from '../../../api/question/get-types';
import getQuestionAttributes from '../../../api/question/get-attributes';
import getLanguages from '../../../api/question/get-languages';
import saveQuestion from '../../../api/question/save';
import getQuestions from '../../../api/question/get-all';
import { toast } from 'react-toastify';
import { useDebounce } from 'primereact/hooks';

export default function Glossary({
  categories,
  glossaries,
  setGlossaryFilter
}) {
  const [types, setTypes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [attributesSet, setAttributesSet] = useState([]);

  const [type, setType] = useState('');
  const [topic, setTopic] = useState('');
  const [answer, setAnswer] = useState('');
  const [glossary, setGlossary] = useState(glossaries?.[0]);
  const [priority, setPriority] = useState(1);
  const [attributes, setAttributes] = useState([]);
  const [translations, setTranslations] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [complexityLevel, setComplexityLevel] = useState(1);
  const [category, setCategory] = useState({ catId: 2 });
  const [answerTranslations, setAnswerTranslations] = useState({});
  const [content, debouncedContent, setContent] = useDebounce('', 500);

  useEffect(() => {
    const fetchQuestionTypes = async () => await getQuestionTypes();
    fetchQuestionTypes()
      .then(values => setTypes(values));
  }, []);

  useEffect(() => {
    const fetchQuestionLanguages = async () => await getLanguages();
    fetchQuestionLanguages()
      .then(values => setLanguages(values));
  }, []);

  useEffect(() => {
    const fetchQuestionAttributes = async () => await getQuestionAttributes();
    fetchQuestionAttributes()
      .then(values => setAttributesSet(values));
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => await getQuestions();
    fetchQuestions()
      .then(questions => setQuestions(questions));
  }, []);

  useEffect(() => {
    setGlossaryFilter(category.catId);
  }, [category.catId]);

  const handleTopic = (event) => setTopic(event.target.value);

  const handlePriority = (event) => setPriority(event.target.value);

  const handleIsActive = (event) => setIsActive(event.target.checked);

  const handleComplexityLevel = (event) => setComplexityLevel(event.target.value);

  const handleContent = (event) => setContent(event.target.value);

  const handleCategory = (event) => {
    const item = categories[event.target.value];
    setCategory(item);
  };

  const handleAnswer = (event) => setAnswer(event.target.value);

  const handleAttributes = (event) => {
    const value = event.target.value;
    setAttributes(value);
  };

  const handleGlossary = (event) => setGlossary({ termId: event.target.value });

  const handleTranslation = (event, langId) => {
    setTranslations(values => ({
      ...values,
      [langId]: event.target.value
    }));
  };

  const handleAnswerTranslation = (event, langId) => {
    setAnswerTranslations(values => ({
      ...values,
      [langId]: event.target.value
    }));
  };

  const handleAttributeChange = (glossary) => {
    return attributes.includes('ANSWER_BY_KEY') ? glossary?.key : glossary?.value;
  };

  const save = async () => {
    const translationEntries = Object.entries(translations);
    const answerEntries = Object.entries(answerTranslations);
    const response = await saveQuestion(
      {
        type,
        topic,
        content,
        isActive,
        priority,
        complexityLevel,
        attributes: Array.isArray(attributes) ? attributes : [attributes],
        categoryId: category.catId,
        categoryName: category.name,
        answers: [{
          content: answer,
          termId: glossary?.termId
        }],
        translations: translationEntries.map(e => ({
          description: e[1],
          language: { langId: e[0] }
        })),
        answerTranslations: answerEntries.map(e => ({
          description: e[1],
          language: { langId: e[0] }
        }))
      });

    if (response) {
      setQuestions(values => [...values, response.data]);
      toast.success('Question successfully saved');
    }
  };

  return (
    <div>
      <Form className={'shadowed'}>
        <h4 className={'text-center'}>Add Question</h4>
        <hr/>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Topic</Form.Label>
          <Col sm={8}>
            <Form.Control
              value={topic}
              placeholder="Topic"
              onChange={handleTopic}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Priority</Form.Label>
          <Col sm={8}>
            <Form.Control
              min={1}
              max={10}
              type={'number'}
              value={priority}
              isValid={priority}
              isInvalid={!priority}
              placeholder="Priority"
              onChange={handlePriority}
            />
            <Form.Control.Feedback type="invalid">
              Set <span className="fw-bold">priority</span>
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Complexity level</Form.Label>
          <Col sm={8}>
            <Form.Control
              min={1}
              max={10}
              type={'number'}
              value={complexityLevel}
              isValid={complexityLevel}
              isInvalid={!complexityLevel}
              placeholder="Complexity level"
              onChange={handleComplexityLevel}
            />
            <Form.Control.Feedback type="invalid">
              Set <span className="fw-bold">complexity level</span>
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Content</Form.Label>
          <Col sm={8}>
            <Form.Control
              value={content}
              isValid={content}
              isInvalid={!content}
              placeholder="Content"
              onChange={handleContent}
            />
            <Form.Control.Feedback type="invalid">
              Set <span className="fw-bold">content</span>
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Attributes</Form.Label>
          <Col sm={8}>
            <Form.Select onChange={handleAttributes}>
              {attributesSet?.map(item => (
                <option value={item} key={item}>{item}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Category</Form.Label>
          <Col sm={8}>
            <Form.Select
              isValid={category.catId}
              isInvalid={!category.catId}
              onChange={handleCategory}
            >
              {categories?.map((category, index) => (
                <option value={index} key={category.catId}>{category.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Set <span className="fw-bold">category</span>
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Answer</Form.Label>
          <Col sm={4}>
            <Form.Control
              value={answer}
              isValid={answer}
              isInvalid={!answer && !glossary?.termId}
              placeholder="Answer"
              onChange={handleAnswer}
            />
            <Form.Control.Feedback type="invalid">
              Set <span className="fw-bold">answer</span>
            </Form.Control.Feedback>
          </Col>
          <Form.Label column sm={1} className={'text-end'}>By Glossary</Form.Label>
          <Col sm={3}>
            <Form.Select
              onChange={handleGlossary}
              isInvalid={!glossary?.termId && !answer}
              isValid={glossary?.termId}
            >
              <option value={null} key={null}></option>
              {glossaries?.map(glossary => (
                <option value={glossary.termId}
                        key={glossary.termId}>{handleAttributeChange(glossary)}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select <span className="fw-bold">glossary</span>
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        {answer && (
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className={'text-end'}>Answer translations</Form.Label>
            <Col sm={8}>
              {languages?.map(item => (
                <Form.Group as={Row} className="mb-2" key={item.name}>
                  <Form.Label column sm={2} className={'text-end'}>{item.name}</Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      placeholder={item.name}
                      onChange={(e) => handleAnswerTranslation(e, item.langId)}
                    />
                  </Col>
                </Form.Group>
              ))}
            </Col>
          </Form.Group>
        )}

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Type</Form.Label>
          <Col sm={8}>
            <Form.Select
              isValid={type}
              isInvalid={!type}
              onChange={(event) => setType((event.target.value))}
            >
              <option value={null} key={null}></option>
              {types?.map(item => (
                <option value={item} key={item}>{item}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select <span className="fw-bold">type</span>
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Translations</Form.Label>
          <Col sm={8}>
            {languages?.map(item => (
              <Form.Group as={Row} className="mb-2" key={item.name}>
                <Form.Label column sm={2} className={'text-end'}>{item.name}</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    placeholder={item.name}
                    onChange={(e) => handleTranslation(e, item.langId)}
                  />
                </Col>
              </Form.Group>
            ))}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3} className={'text-end'}>Is active</Form.Label>
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
              disabled={!content || (!answer && !glossary?.termId) || !type}
            >
              Save
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <div className={'shadowed'}>
        <h4 className={'text-center'}>Questions</h4>
        <hr/>
        <Table striped bordered variant="dark">
          <thead>
          <tr>
            <th>Topic</th>
            <th>Priority</th>
            <th>Type</th>
            <th>Complexity level</th>
            <th>Content</th>
            <th>Category</th>
            <th>Attributes</th>
            <th>Is Active</th>
          </tr>
          </thead>
          <tbody>
          {questions?.map((question) => (
            <tr key={question.id}>
              <td>{question.topic}</td>
              <td>{question.priority}</td>
              <td>{question.type}</td>
              <td>{question.complexityLevel}</td>
              <td>{question.content}</td>
              <td>{question.categoryName}</td>
              <td>{question.attributes?.map(attribute => (
                <div key={attribute}>{attribute}</div>
              ))}
              </td>
              <td>
                <Form.Switch
                  disabled
                  defaultChecked={question.isActive}
                />
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}