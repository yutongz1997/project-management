import React from 'react';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import ProjectListItem from './ProjectListItem';


export default function ProjectList(props) {
    const items = props.filteredProjects.map((project, index) => {
        const fields = {
            id: project.id,
            title: project.title,
            participants: project.participants,
            description: project.description,
            year: project.year,
            notes: project.notes
        };
        return (
            <ProjectListItem key={project.id}
                             index={index}
                             fields={fields}
                             allParticipants={props.allParticipants}/>
        );
    });

    let body;
    if (props.numTotalProjects === 0) {
        body = (
            <p className={'mt-3 text-center text-muted'}>
                There is currently no projects in the database.
            </p>
        );
    } else {
        if (props.filteredProjects.length > 0) {
            body = (
                <Accordion>{items}</Accordion>
            );
        } else {
            body = (
                <p className={'mt-3 text-center text-muted'}>
                    No project found with the given search keywords.
                </p>
            );
        }
    }
    return (
        <Card.Body>{body}</Card.Body>
    );
}
