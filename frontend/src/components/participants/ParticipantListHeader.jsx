import React, {useState} from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,
         faFileCsv,
         faFilePdf } from '@fortawesome/free-solid-svg-icons';

import OverlayTooltip from '../OverlayTooltip';
import ParticipantEditDialog from './ParticipantEditDialog';

import './ParticipantListHeader.css';


export default function ParticipantListHeader(props) {
    const [registerDialogShow, setRegisterDialogShow] = useState(false);

    const handleRegisterDialogShow = () => setRegisterDialogShow(true);
    const handleRegisterDialogClose = () => setRegisterDialogShow(false);

    return (
        <>
            <Card.Header>
                <Row className={'justify-content-between'}>
                    <Col className={'align-self-center'} xs={'auto'}>
                        <Button variant={'primary'}
                                onClick={handleRegisterDialogShow}>
                            <span className={'me-1'}>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            Register
                        </Button>
                    </Col>
                    <Col className={'align-self-center'}
                         xs={'auto'}>
                        <div>
                            <OverlayTooltip text={'Export to CSV...'}>
                                <Button variant={'link'}>
                                    <FontAwesomeIcon className={'icon-export-csv'}
                                                     icon={faFileCsv} />
                                </Button>
                            </OverlayTooltip>
                            <OverlayTooltip text={'Export to PDF...'}>
                                <Button variant={'link'}>
                                    <FontAwesomeIcon className={'icon-export-pdf'}
                                                     icon={faFilePdf} />
                                </Button>
                            </OverlayTooltip>
                        </div>
                    </Col>
                </Row>
            </Card.Header>

            <ParticipantEditDialog show={registerDialogShow}
                                   onClose={handleRegisterDialogClose}
                                   onChangesSubmitted={props.onChangesSubmitted} />
        </>
    )
};
