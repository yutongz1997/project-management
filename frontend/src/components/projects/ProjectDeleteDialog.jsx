import React, {useState} from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { deleteProject } from '../../services/projects.service';


export default function ProjectDeleteDialog(props) {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [hasSucceeded, setHasSucceeded] = useState(false);
    const [message, setMessage] = useState('');

    const handleDelete = () => {
        deleteProject(props.fields.id)
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
    }

    const compTextBefore = (
        <>
            <p>
                Are you sure you want to delete the project
                <span className={'fst-italic'}> {props.fields.title}</span>?
            </p>
            <small className={'fst-italic fw-bold text-danger'}>
                Warning: This action cannot be undone!
            </small>
        </>
    );
    const compTextAfter = (
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
               onHide={props.handleClose}
               centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {hasSubmitted ? compTextAfter : compTextBefore}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'}
                        onClick={handleClose}>
                    {hasSubmitted ? 'Done' : 'Cancel'}
                </Button>
                {hasSubmitted ? null :
                    <Button variant={'danger'}
                            onClick={handleDelete}>
                        Confirm
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
}
