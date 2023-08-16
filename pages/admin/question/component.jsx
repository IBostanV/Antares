import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button, Col, Row, Table} from "react-bootstrap";
import getQuestionTypes from "../../../api/question/get-types";
import getCategories from "../../../api/category/get-all";
import getQuestionAttributes from "../../../api/question/get-attributes";
import getQuestionLanguages from "../../../api/question/get-languages";
import saveQuestion from "../../../api/question/save";
import getQuestions from "../../../api/question/get-all";
import getByCategoryGlossaries from "../../../api/glossary/get-all";

export default function Glossary() {
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [attributesSet, setAttributesSet] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [glossaries, setGlossaries] = useState([]);

    const [topic, setTopic] = useState('');
    const [priority, setPriority] = useState(1);
    const [type, setType] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [complexityLevel, setComplexityLevel] = useState(1);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState();
    const [attributes, setAttributes] = useState([]);
    const [answer, setAnswer] = useState('');
    const [translations, setTranslations] = useState({});
    const [answerTranslations, setAnswerTranslations] = useState({});
    const [glossary, setGlossary] = useState({});
    const [answerByGlossary, setAnswerByGlossary] = useState('');

    useEffect(() => {
        const fetchQuestionTypes = async () => {
            return await getQuestionTypes();
        }

        fetchQuestionTypes().then(values => setTypes(values));
    }, []);

    useEffect(() => {
        const fetchQuestionLanguages = async () => {
            return await getQuestionLanguages();
        }

        fetchQuestionLanguages().then(values => setLanguages(values));
    }, []);

    useEffect(() => {
        const fetchQuestionAttributes = async () => {
            return await getQuestionAttributes();
        }

        fetchQuestionAttributes().then(values => {
            setAttributesSet(values);
            setAttributes(values[0]);
        });
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            return await getCategories();
        };
        fetchCategories().then((categories) => {
            setCategories(categories);
        });
    }, []);

    useEffect(() => {
        const fetchQuestions = async () => {
            return await getQuestions();
        }

        fetchQuestions().then(questions => {
            setQuestions(questions);
        })
    }, []);

    useEffect(() => {
        const fetchGlossaries = async () => {
            return await getByCategoryGlossaries(category || 1);
        }

        fetchGlossaries().then(glossaries => {
            setGlossaries(glossaries);
            setGlossary(glossaries[0]);
        })
    }, [category]);

    const handleTopic = (event) => {
        setTopic(event.target.value);
    }

    const handlePriority = (event) => {
        setPriority(event.target.value);
    }

    const handleIsActive = (event) => {
        setIsActive(event.target.checked);
    }

    const handleComplexityLevel = (event) => {
        setComplexityLevel(event.target.value);
    }

    const handleContent = (event) => {
        setContent(event.target.value);
    }

    const handleCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleAttributes = (event) => {
        const value = event.target.value;
        setAttributes(value);
        setAnswerByGlossary(handleAttributeChange(glossary));
    }

    const handleAnswer = (event) => {
        setAnswer(event.target.value);
    }

    const handleGlossary = (event) => {
        setGlossary(event.target.value);
    }

    const handleTranslation = (event, langId) => {
        setTranslations(values => ({...values, [langId]: event.target.value}));
    }

    const handleAnswerTranslation = (event, langId) => {
        setAnswerTranslations(values => ({...values, [langId]: event.target.value}));
    }

    const handleAttributeChange = (glossary) => {
        if (attributes === 'ANSWER_BY_KEY') {
            return glossary?.key;
        }
        return glossary?.value;
    }

    const save = async () => {
        const translationEntries = Object.entries(translations);
        const answerEntries = Object.entries(answerTranslations);
        const response = await saveQuestion(
            {
                topic,
                type,
                answers: [{content: answer || answerByGlossary, glossary}],
                content,
                priority,
                isActive,
                complexityLevel,
                attributes: [attributes],
                translations: translationEntries.map(e => ({description: e[1], language: {langId: e[0]}})),
                answerTranslations: answerEntries.map(e => ({description: e[1], language: {langId: e[0]}})),
                category: {catId: category}
            });

        if (response) {
            setQuestions(values => [...values, response.data]);
        }
    }

    return (
        <div>
            <Form className={'border'}>
                <h3 className={'text-center'}>Add Question</h3>
                <hr/>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Topic</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            placeholder="Topic"
                            aria-label="Topic"
                            aria-describedby="basic-addon1"
                            onChange={handleTopic}
                            value={topic}
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
                            placeholder="Priority"
                            aria-label="Priority"
                            aria-describedby="basic-addon1"
                            onChange={handlePriority}
                            value={priority}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Complexity level</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            min={1}
                            max={10}
                            type={'number'}
                            placeholder="Complexity level"
                            aria-label="Complexity-level"
                            aria-describedby="basic-addon1"
                            onChange={handleComplexityLevel}
                            value={complexityLevel}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Content</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            placeholder="Content"
                            aria-label="Content"
                            aria-describedby="basic-addon1"
                            onChange={handleContent}
                            value={content}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Attributes</Form.Label>
                    <Col sm={8}>
                        <Form.Select aria-label="Type" onChange={handleAttributes}>
                            {attributesSet?.map(item => (
                                <option value={item} key={item}>{item}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Answer</Form.Label>
                    <Col sm={4}>
                        <Form.Control
                            placeholder="Answer"
                            aria-label="Answer"
                            aria-describedby="basic-addon1"
                            onChange={handleAnswer}
                            value={answer}
                        />
                    </Col>
                    <Form.Label column sm={1} className={'text-end'}>By Glossary</Form.Label>
                    <Col sm={3}>
                        <Form.Select aria-label="Answer" onChange={handleGlossary}>
                            {glossaries?.map(glossary => (
                                <option value={glossary.termId}
                                        key={glossary.id}>{handleAttributeChange(glossary)}</option>
                            ))}
                        </Form.Select>
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
                                            aria-label={item.name}
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => handleAnswerTranslation(e, item.langId)}
                                        />
                                    </Col>
                                </Form.Group>
                            ))}
                        </Col>
                    </Form.Group>
                )}

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Category</Form.Label>
                    <Col sm={8}>
                        <Form.Select aria-label="Category" onChange={handleCategory}>
                            {categories?.map(category => (
                                <option value={category.catId} key={category.catId}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Type</Form.Label>
                    <Col sm={8}>
                        <Form.Select aria-label="Type" onChange={(event) => setType((event.target.value))}>
                            {types?.map(item => (
                                <option value={item} key={item}>{item}</option>
                            ))}
                        </Form.Select>
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
                                        aria-label={item.name}
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => handleTranslation(e, item.langId)}
                                    />
                                </Col>
                            </Form.Group>
                        ))}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3} className={'text-end'}>Is active</Form.Label>
                    <Col sm={8}>
                        <Form.Check
                            type={'checkbox'}
                            id={`isActive`}
                            onChange={handleIsActive}
                            checked={isActive}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}></Form.Label>
                    <Col sm={8}>
                        <Button variant={'primary'} onClick={save}>Save</Button>
                    </Col>
                </Form.Group>
            </Form>
            <div className={'border'}>
                <h3 className={'text-center'}>Questions</h3>
                <hr/>
                <Table striped bordered variant='dark'>
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
                            <td>{question.category?.name}</td>
                            <td>{question.attributes?.map(attribute => (
                                <div key={attribute.name}>{attribute}</div>
                            ))}
                            </td>
                            <td>
                                <Form.Check
                                    type={'checkbox'}
                                    id={`isActive`}
                                    defaultChecked={question.isActive}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}