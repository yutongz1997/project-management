import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


export default function OverlayTooltip(props) {
    const tooltip = (
        <Tooltip>{props.text}</Tooltip>
    );
    return (
        <OverlayTrigger placement={props.placement}
                        overlay={tooltip}>
            {props.children}
        </OverlayTrigger>
    );
};
