import React from 'react';
import Glossary from './glossary';
import Category from './category';
import Question from './question';
import {Col, Nav, Row, Tab} from 'react-bootstrap';

function Admin() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Glossaries</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Categories</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Questions</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">{(<Glossary/>)}</Tab.Pane>
                        <Tab.Pane eventKey="second">{(<Category/>)}</Tab.Pane>
                        <Tab.Pane eventKey="third">{(<Question/>)}</Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default Admin;