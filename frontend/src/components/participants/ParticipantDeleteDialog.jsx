import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { deleteParticipant } from '../../services/participants.service';


export default function ParticipantDeleteDialog(props) {
    const handleDelete = () => {
        deleteParticipant(props.fields.id)
            .then((result) => props.onChangesSubmitted(true,
                result.message))
            .catch((error) => props.onChangesSubmitted(false,
                error.response.data.message))
            .finally(() => props.onClose());
    };

    return (
        <Modal show={props.show}
               onHide={props.onClose}
               centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Participant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete the participant
                    <span className={'fst-italic'}>
                    {' '} {props.fields.firstName} {props.fields.lastName}
                </span>?
                </p>
                <small className={'fst-italic fw-bold text-danger'}>
                    Warning: This action cannot be undone!
                    Make sure you delete all related projects first before deleting
                    this participant, otherwise deletion would be failed.
                </small>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'}
                        onClick={props.onClose}>
                    Cancel
                </Button>
                <Button variant={'danger'}
                        onClick={handleDelete}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
