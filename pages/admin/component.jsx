import React from 'react';
import Glossary from './glossary';
import Category from './category';
import Question from './question';
import GlossaryType from "./glossary-type";
import {Col, Nav, Row, Tab} from 'react-bootstrap';

function Admin() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Categories</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Glossaries</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Glossary Type</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="fourth">Questions</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">{(<Category/>)}</Tab.Pane>
                        <Tab.Pane eventKey="second">{(<Glossary/>)}</Tab.Pane>
                        <Tab.Pane eventKey="third">{(<GlossaryType/>)}</Tab.Pane>
                        <Tab.Pane eventKey="fourth">{(<Question/>)}</Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default Admin;