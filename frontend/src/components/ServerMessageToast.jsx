import React from 'react';

import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,
         faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


export default function ServerMessageToast(props) {
    const statusIcon = props.success ?
        (<FontAwesomeIcon className={'text-success'} icon={faCheck} />) :
        (<FontAwesomeIcon className={'text-danger'} icon={faTriangleExclamation} />);

    return (
        <ToastContainer position={'top-end'}>
            <Toast show={props.show}
                   onClose={props.onClose}>
                <Toast.Header>
                    <span className={'me-2'}>{statusIcon}</span>
                    {props.success ?
                        <strong className={'me-auto text-success'}>Successful!</strong> :
                        <strong className={'me-auto text-danger'}>Failed...</strong>
                    }
                    <small>{props.timestamp}</small>
                </Toast.Header>
                <Toast.Body>
                    <strong>Message from the Server: </strong>
                    {props.message}.
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};
