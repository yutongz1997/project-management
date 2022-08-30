import React from 'react';

import { useAccordionButton } from 'react-bootstrap/AccordionButton';


export default function ProjectHeaderToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
        <div onClick={decoratedOnClick}>
            {children}
        </div>
    );
};
