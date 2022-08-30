import React from 'react';
import { useState,
         useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
// TODO: From validation
// import { Formik } from 'formik';
// import * as Yup from 'yup';

import { MAX_TITLE_LENGTH,
         MIN_PROJECT_YEAR,
         MAX_PROJECT_YEAR } from '../../constants';
import { createProject,
         updateProject } from '../../services/projects.service';


export default function ProjectEditDialog(props) {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [hasSucceeded, setHasSucceeded] = useState(false);
    const [message, setMessage] = useState('');

    const [title, setTitle] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [description, setDescription] = useState('');
    const [year, setYear] = useState(new Date().getUTCFullYear());
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (props.editing) {
            if (props.fields.title) {
                setTitle(props.fields.title);
            }
            if (props.fields.participants) {
                setSelectedParticipants(props.fields.participants.map((participant) => {
                    return {
                        value: participant.id,
                        label: `${participant.firstName} ${participant.lastName}`
                    };
                }));
            }
            if (props.fields.description) {
                setDescription(props.fields.description);
            }
            if (props.fields.notes) {
                setNotes(props.fields.notes);
            }
            if (props.fields.year) {
                setYear(parseInt(props.fields.year));
            }
        }
    }, [props.editing, props.fields]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value.substring(0, MAX_TITLE_LENGTH));
    };
    const handleSelectedParticipantsChange = (selected) => {
        setSelectedParticipants(selected);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleYearChange = (event) => {
        setYear(parseInt(event.target.value));
    };
    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    };
    const handleSubmit = () => {
        const fields = {
            title: title,
            participants: selectedParticipants
                .map((participants) => participants.value),
            description: description,
            year: year,
            notes: notes
        };
        (!props.editing ?
            createProject(fields) : updateProject(props.fields.id, fields))
            .then((result) => {
                setHasSubmitted(true);
                setHasSucceeded(true);
                setMessage(result.message);
            })
            .catch((error) => {
                setHasSubmitted(true);
                setHasSucceeded(false);
                setMessage(error.message);
            });
    };
    const handleClose = () => {
        if (hasSubmitted) {
            window.location.reload();
        } else {
            props.handleClose();
        }
    };

    const participantOptions = props.allParticipants.map((participant) => {
        return {
            value: participant.id,
            label: `${participant.firstName} ${participant.lastName}`
        };
    });
    const compEditForm = (
        <Form>
            <Form.Group className={'mb-3'}>
                <Form.Label>
                    Title <span className={'text-danger'}>*</span>
                </Form.Label>
                <Form.Control type={'text'}
                              value={title}
                              onChange={handleTitleChange} />
                <Form.Text className={'text-muted'}>
                    {MAX_TITLE_LENGTH - title.length} characters remaining.
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>
                    Participants <span className={'text-danger'}>*</span>
                </Form.Label>
                <Select isMulti
                        placeholder={'Start typing the name of any participant...'}
                        value={selectedParticipants}
                        options={participantOptions}
                        onChange={handleSelectedParticipantsChange} />
                <Form.Text>
                    Click to add desired participants from the dropdown list.
                </Form.Text>
            </Form.Group>
            <Form.Group className={'my-3'}>
                <Form.Label>Description</Form.Label>
                <Form.Control as={'textarea'}
                              rows={5}
                              value={description}
                              onChange={handleDescriptionChange} />
            </Form.Group>
            <Form.Group className={'my-3'}>
                <Form.Label>
                    Year <span className={'text-danger'}>*</span>
                </Form.Label>
                <Form.Control type={'number'}
                              min={MIN_PROJECT_YEAR}
                              max={MAX_PROJECT_YEAR}
                              step={1}
                              value={year}
                              onChange={handleYearChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control as={'textarea'}
                              rows={3}
                              value={notes}
                              onChange={handleNotesChange} />
            </Form.Group>
        </Form>
    );
    const compTextSubmitted = (
        <>
            <h6 className={['fw-bold', hasSucceeded ? 'text-success' : 'text-danger'].join(' ')}>
                {hasSucceeded ? 'Successful!' : 'Failed...'}
            </h6>
            <p>
                <span className={'fw-semibold'}>Message From the Server: </span>
                {message}.
            </p>
        </>
    );

    return (
        <Modal show={props.show}
               onHide={handleClose}
               backdrop={'static'}
               keyboard={false}
               centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.editing ? 'Edit Project' : 'Create New Project'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {hasSubmitted ? compTextSubmitted : compEditForm}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'}
                        onClick={handleClose}>
                    {hasSubmitted ? 'Done' : 'Close'}
                </Button>
                {hasSubmitted ? null :
                    <Button type={'submit'}
                            variant={'primary'}
                            onClick={handleSubmit}>
                        {props.editing ? 'Update' : 'Create'}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
};
