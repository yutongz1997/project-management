import React from 'react';
import { useState,
         useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { DateTime } from 'luxon';

import { MAX_NAME_LENGTH,
         MAX_EMAIL_LENGTH,
         MAX_POSITION_LENGTH } from '../../constants';
import { createParticipant,
         updateParticipant } from '../../services/participants.service';


export default function ParticipantEditDialog(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(
        DateTime.utc().toFormat('yyyy-MM-dd')
    );
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (props.editing) {
            if (props.fields.firstName) {
                setFirstName(props.fields.firstName);
            }
            if (props.fields.lastName) {
                setLastName(props.fields.lastName);
            }
            if (props.fields.dateOfBirth) {
                setDateOfBirth(props.fields.dateOfBirth);
            }
            if (props.fields.email) {
                setEmail(props.fields.email);
            }
            if (props.fields.position) {
                setPosition(props.fields.position);
            }
            if (props.fields.description) {
                setDescription(props.fields.description);
            }
            if (props.fields.notes) {
                setNotes(props.fields.notes);
            }
        }
    }, [props.editing, props.fields]);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value.substring(0, MAX_NAME_LENGTH));
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value.substring(0, MAX_NAME_LENGTH));
    };
    const handleDateOfBirthChange = (event) => {
        setDateOfBirth(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value.substring(0, MAX_EMAIL_LENGTH));
    }
    const handlePositionChange = (event) => {
        setPosition(event.target.value.substring(0, MAX_POSITION_LENGTH));
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };

    const handleSubmit = () => {
        const fields = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            email: email,
            position: position,
            description: description,
            notes: notes
        };
        (!props.editing ?
            createParticipant(fields) : updateParticipant(props.fields.id, fields))
            .then((result) => props.onChangesSubmitted(true,
                result.message))
            .catch((error) => props.onChangesSubmitted(false,
                error.response.data.message))
            .finally(() => {
                setFirstName('');
                setLastName('');
                setDateOfBirth(DateTime.utc().toFormat('yyyy-MM-dd'));
                setEmail('');
                setPosition('');
                setDescription('');
                setNotes('');
                props.onClose();
            });
    };

    return (
        <Modal show={props.show}
               onHide={props.onClose}
               backdrop={'static'}
               keyboard={false}
               centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.editing ? 'Edit Participant' : 'Register New Participant'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className={'mb-3'}>
                        <Form.Group as={Col}>
                            <Form.Label>
                                First Name
                            </Form.Label>
                            <Form.Control type={'text'}
                                          value={firstName}
                                          onChange={handleFirstNameChange} />
                            <Form.Text className={'text-muted'}>
                                {MAX_NAME_LENGTH - firstName.length} characters remaining.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>
                                Last Name <span className={'text-danger'}>*</span>
                            </Form.Label>
                            <Form.Control type={'text'}
                                          value={lastName}
                                          onChange={handleLastNameChange} />
                            <Form.Text className={'text-muted'}>
                                {MAX_NAME_LENGTH - lastName.length} characters remaining.
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <Form.Group className={'my-3'}>
                        <Form.Label>
                            Date of Birth <span className={'text-danger'}>*</span>
                        </Form.Label>
                        <Form.Control type={'date'}
                                      value={dateOfBirth}
                                      onChange={handleDateOfBirthChange} />
                    </Form.Group>
                    <Form.Group className={'my-3'}>
                        <Form.Label>
                            Email <span className={'text-danger'}>*</span>
                        </Form.Label>
                        <Form.Control type={'email'}
                                      value={email}
                                      onChange={handleEmailChange} />
                        <Form.Text className={'text-muted'}>
                            {MAX_EMAIL_LENGTH - email.length} characters remaining.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={'my-3'}>
                        <Form.Label>
                            Position <span className={'text-danger'}>*</span>
                        </Form.Label>
                        <Form.Control type={'text'}
                                      value={position}
                                      onChange={handlePositionChange} />
                        <Form.Text className={'text-muted'}>
                            {MAX_POSITION_LENGTH - position.length} characters remaining.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={'my-3'}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as={'textarea'}
                                      rows={5}
                                      value={description}
                                      onChange={handleDescriptionChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as={'textarea'}
                                      rows={3}
                                      value={notes}
                                      onChange={handleNotesChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'}
                        onClick={props.onClose}>
                    Close
                </Button>
                <Button type={'submit'}
                            variant={'primary'}
                            onClick={handleSubmit}>
                        {props.editing ? 'Update' : 'Register'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
