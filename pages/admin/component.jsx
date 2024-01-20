import React, { useEffect, useState } from 'react';
import Glossary from './glossary';
import Category from './category';
import Question from './question';
import GlossaryType from './glossary-type';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { getAllCategories } from '../../api/category';
import getByCategoryGlossaries from '../../api/glossary/get-all';
import getGlossaryTypes from '../../api/glossary/get-types';
import KnowledgeBaseAdmin from './knowledge-base';

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [glossaries, setGlossaries] = useState([]);
  const [glossaryTypes, setGlossaryTypes] = useState([]);
  const [glossaryFilter, setGlossaryFilter] = useState(2);

  useEffect(() => {
    const fetchCategories = async () => await getAllCategories();
    fetchCategories()
      .then(result => setCategories(result));
  }, []);

  useEffect(() => {
    const fetchGlossaries = async () => await getByCategoryGlossaries(glossaryFilter);
    fetchGlossaries()
      .then(result => setGlossaries(result));
  }, [glossaryFilter]);

  useEffect(() => {
    const fetchGlossaryTypes = async () => await getGlossaryTypes();
    fetchGlossaryTypes()
      .then((result) => setGlossaryTypes(result));
  }, []);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="category">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="category">Categories</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="glosary">Glossaries</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="glossaryType">Glossary type</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="question">Questions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="knowledge-base">Knowledge base</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="category">
              {(<Category categories={categories}
                          setCategories={setCategories}
              />)}
            </Tab.Pane>
            <Tab.Pane eventKey="glosary">
              {(<Glossary
                categories={categories}
                glossaries={glossaries}
                setGlossaries={setGlossaries}
                glossaryTypes={glossaryTypes}
                setGlossaryFilter={setGlossaryFilter}
              />)}
            </Tab.Pane>
            <Tab.Pane eventKey="glossaryType">
              {(<GlossaryType
                glossaryTypes={glossaryTypes}
                setGlossaryTypes={setGlossaryTypes}
              />)}
            </Tab.Pane>
            <Tab.Pane eventKey="question">
              {(<Question
                categories={categories}
                glossaries={glossaries}
                setGlossaryFilter={setGlossaryFilter}
              />)}
            </Tab.Pane>
            <Tab.Pane eventKey="knowledge-base">
              <KnowledgeBaseAdmin
                categories={categories}
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Admin;