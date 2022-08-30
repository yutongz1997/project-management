import React from 'react';
import { useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import ProjectHeaderToggle from './ProjectHeaderToggle';
import ProjectEditDialog from './ProjectEditDialog';
import ProjectDeleteDialog from './ProjectDeleteDialog';

import './ProjectListItem.css';


export default function ProjectListItem(props) {
    const [editDialogShow, setEditDialogShow] = useState(false);
    const [deleteDialogShow, setDeleteDialogShow] = useState(false);

    const handleEditDialogShow = () => setEditDialogShow(true);
    const handleEditDialogHide = () => setEditDialogShow(false);
    const handleDeleteDialogShow = () => setDeleteDialogShow(true);
    const handleDeleteDialogHide = () => setDeleteDialogShow(false);

    const participants = props.fields.participants
        .map(participant => `${participant.firstName} ${participant.lastName}`)
        .join(', ');
    const description = props.fields.description
        .split('\n')
        .map((paragraph, index) => <p key={index}>{paragraph}</p>);

    return (
        <>
            <Card className={'project-item'}>
                <Card.Header>
                    <Row>
                        <Col xs={10}>
                            <ProjectHeaderToggle eventKey={props.index}>
                                <div className={'mt-1 d-flex align-items-start'}>
                                    <h6>{props.fields.title}</h6>
                                </div>
                                <small>{participants}</small>
                            </ProjectHeaderToggle>
                        </Col>
                        <Col className={'d-flex align-self-center justify-content-end'}
                             xs={2}>
                            <span className={'mx-2'}>
                                <Button variant={'link'}
                                        onClick={handleEditDialogShow}>
                                    <FontAwesomeIcon className={'icon-edit-project'}
                                                     icon={faPenToSquare} />
                                </Button>
                            </span>
                            <span className={'mx-2'}>
                                <Button variant={'link'}
                                        onClick={handleDeleteDialogShow}>
                                    <FontAwesomeIcon className={'icon-delete-project'}
                                                     icon={faTrash} />
                                </Button>
                            </span>
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey={props.index}>
                    <Card.Body>
                        <div>{description}</div>
                        <small className={'text-muted'}>{props.fields.year}</small>
                        <hr />
                        <div>
                            <small className={'fw-bold'}>Notes: </small>
                            <small className={'text-muted'}>{props.fields.notes}</small>
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

            <ProjectEditDialog show={editDialogShow}
                               handleClose={handleEditDialogHide}
                               editing
                               fields={props.fields}
                               allParticipants={props.allParticipants} />
            <ProjectDeleteDialog show={deleteDialogShow}
                                 handleClose={handleDeleteDialogHide}
                                 fields={props.fields} />
        </>
    );
};
