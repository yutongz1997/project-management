import React from 'react';
import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,
         faSortUp,
         faSortDown,
         faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { SORT_FIELDS } from '../../constants';
import OverlayTooltip from '../OverlayTooltip';
import ProjectEditDialog from './ProjectEditDialog';


export default function ProjectListHeader(props) {
    const [createDialogShow, setCreateDialogShow] = useState(false);

    const handleCreateDialogShow = () => setCreateDialogShow(true);
    const handleCreateDialogClose = () => setCreateDialogShow(false);

    const sortOrderButtonColor = props.sortOrder.value === 'asc' ?
        'text-success' : 'text-danger';
    return (
        <>
            <Card.Header>
                <Row className={'justify-content-between'}>
                    <Col className={'align-self-center'} xs={'auto'}>
                        <Button variant="primary"
                                onClick={handleCreateDialogShow}>
                            <span className={'me-1'}>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            Create
                        </Button>
                    </Col>
                    <Col xs={'auto'}>
                        <Form className="justify-content-end">
                            <Row>
                                <Col xs={'auto'}>
                                    <FloatingLabel label={'Sort by'}>
                                        <Form.Select value={props.sortField.value}
                                                     onChange={props.onSortFieldChange}>
                                            {SORT_FIELDS.map(({ value, label }) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col className={'ps-0 align-self-center'} xs={'auto'}>
                                    <OverlayTooltip placement={'top'}
                                                    text={props.sortOrder.label}>
                                        <Button className={`px-0 ${sortOrderButtonColor}`}
                                                variant={'link'}
                                                onClick={props.onSortOrderChange}>
                                            {props.sortOrder.value === 'asc' ?
                                                <FontAwesomeIcon icon={faSortUp} /> :
                                                <FontAwesomeIcon icon={faSortDown} />}
                                        </Button>
                                    </OverlayTooltip>
                                </Col>
                                <Col xs={'auto'}>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </InputGroup.Text>
                                        <OverlayTooltip text={'By title, participants, or year'}>
                                            <FloatingLabel label={'Search...'}>
                                                <Form.Control placeholder={'Search...'}
                                                              value={props.filter}
                                                              onChange={props.onFilterChange}  />
                                            </FloatingLabel>
                                        </OverlayTooltip>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Card.Header>

            <ProjectEditDialog show={createDialogShow}
                               onClose={handleCreateDialogClose}
                               allParticipants={props.allParticipants} />
        </>
    );
};
