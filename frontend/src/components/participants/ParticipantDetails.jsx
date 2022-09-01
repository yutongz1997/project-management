import React from 'react';


export default function ParticipantDetails({ data }) {
    const description = (data.description && data.description.length > 0) ?
        <p>{data.description}</p> :
        <p className={'fst-italic text-muted'}>
            No description available for this participant.
        </p>;
    const notes = (data.notes && data.notes.length > 0) ?
        <small className={'text-muted'}>{data.notes}</small> :
        <small className={'fst-italic text-muted'}>
            No notes available for this participant.
        </small>;
    return (
        <div className={'p-3'}>
            <div>{description}</div>
            <div className={'mt-2'}>
                <small className={'fw-bold'}>Notes: </small>
                {notes}
            </div>
        </div>
    );
};
