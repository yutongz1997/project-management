import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

import logo from '../logo.svg';


function NavigationBar() {
    const [darkModeState, setDarkModeState] = useState(false);
    const theme = darkModeState ? "dark" : "light";
    return (
        <Navbar expand="lg" bg={theme} variant={theme} sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    <img src={logo} width="48" height="48" alt="Project Management" />
                    User and Project Management
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link href="/participants">Participants</Nav.Link>
                        <Nav.Link href="/projects">Projects</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Switch label="Dark Mode"
                                     onChange={() => setDarkModeState(!darkModeState)}
                                     checked={darkModeState} />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
