import React from 'react';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

import logo from '../logo.svg';


export default function NavigationBar() {
    return (
        <Navbar expand="lg" bg="light" variant="light" sticky="top">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} width={48} height={48} alt={'Project Management'} />
                        Project Management
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto my-2 my-lg-0">
                        <LinkContainer to="/participants">
                            <Nav.Link>Participants</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/projects">
                            <Nav.Link>Projects</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Form className="d-flex">
                        <Nav.Link>Logout</Nav.Link>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
