import React from 'react';
import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import { DateTime } from 'luxon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare,
         faTrash } from '@fortawesome/free-solid-svg-icons';

import ParticipantEditDialog from './ParticipantEditDialog';
import ParticipantDeleteDialog from './ParticipantDeleteDialog';
import ParticipantDetails from './ParticipantDetails';

import './ParticipantList.css';
import OverlayTooltip from '../OverlayTooltip';


export default function ParticipantList(props) {
    const [editDialogShow, setEditDialogShow] = useState(false);
    const [deleteDialogShow, setDeleteDialogShow] = useState(false);
    const [dialogFields, setDialogFields] = useState({});

    const handleEditDialogShow = (fields) => {
        setEditDialogShow(true);
        setDialogFields(fields);
    };
    const handleEditDialogClose = () => {
        setEditDialogShow(false);
        setDialogFields({});
    };
    const handleDeleteDialogShow = (fields) => {
        setDeleteDialogShow(true);
        setDialogFields(fields);
    };
    const handleDeleteDialogClose = () => {
        setDeleteDialogShow(false);
        setDialogFields({});
    };

    const columns = [
        {
            name: 'id',
            selector: (row) => row.id,
            omit: true
        },
        {
            name: 'First Name',
            selector: (row) => row.firstName,
            sortable: true
        },
        {
            name: 'Last Name',
            selector: (row) => row.lastName,
            sortable: true
        },
        {
            name: 'Date of Birth',
            selector: (row) => DateTime.fromISO(row.dateOfBirth)
                .toLocaleString(DateTime.DATE_MED),
            sortable: true
        },
        {
            name: 'Email',
            selector: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
            sortable: true
        },
        {
            name: 'Position',
            selector: (row) => row.position,
            sortable: true
        },
        {
            name: 'Join Date',
            selector: (row) => DateTime.fromISO(row.joinDate)
                .toLocaleString(DateTime.DATE_MED),
            sortable: true
        },
        {
            name: 'Last Update Time',
            selector: (row) => DateTime.fromISO(row.lastUpdateTime)
                .toLocaleString(DateTime.DATETIME_MED),
            sortable: true
        },
        {
            button: true,
            cell: (row) => {
                const fields = {
                    id: row.id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    dateOfBirth: DateTime.fromISO(row.dateOfBirth)
                        .toFormat('yyyy-MM-dd'),
                    email: row.email,
                    position: row.position,
                    description: row.description,
                    notes: row.notes
                };
                return (
                    <OverlayTooltip text={'Edit'}>
                        <Button variant={'link'}
                                onClick={() => handleEditDialogShow(fields)}>
                            <FontAwesomeIcon className={'icon-edit-participant'}
                                             icon={faPenToSquare}/>
                        </Button>
                    </OverlayTooltip>
                );
            }
        },
        {
            button: true,
            cell: (row) => {
                const fields = {
                    id: row.id,
                    firstName: row.firstName,
                    lastName: row.lastName
                };
                return (
                    <OverlayTooltip text={'Delete'}>
                        <Button variant={'link'}
                                onClick={() => handleDeleteDialogShow(fields)}>
                            <FontAwesomeIcon className={'icon-delete-participant'}
                                             icon={faTrash} />
                        </Button>
                    </OverlayTooltip>
                );
            }
        }
    ];

    let body;
    if (props.fetchStatus.success) {
        body = (
            <DataTable columns={columns}
                       data={props.allParticipants}
                       fixedHeader
                       pagination
                       expandableRows
                       expandableRowsComponent={ParticipantDetails} />
        );
    } else {
        body = (
            <p className={'mt-3 text-center text-muted'}>
                Oops! There is something wrong when retrieving the participants...
            </p>
        );
    }
    return (
        <>
            <Card.Body>{body}</Card.Body>
            <ParticipantEditDialog show={editDialogShow}
                                   onClose={handleEditDialogClose}
                                   onChangesSubmitted={props.onChangesSubmitted}
                                   editing
                                   fields={dialogFields} />
            <ParticipantDeleteDialog show={deleteDialogShow}
                                     onClose={handleDeleteDialogClose}
                                     onChangesSubmitted={props.onChangesSubmitted}
                                     fields={dialogFields} />
        </>
    );
};
