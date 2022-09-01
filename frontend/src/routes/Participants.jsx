import React from 'react';
import { useEffect,
         useState } from 'react';

import Card from 'react-bootstrap/Card';
import { DateTime } from 'luxon';

import ParticipantListHeader from '../components/participants/ParticipantListHeader';
import ParticipantList from '../components/participants/ParticipantList';
import ServerMessageToast from '../components/ServerMessageToast';

import { getParticipants } from '../services/participants.service';


export default function Participants() {
    const [allParticipants, setAllParticipants] = useState([]);
    const [fetchStatus, setFetchStatus] = useState({});

    const [toastShow, setToastShow] = useState(false);
    const [hasSucceeded, setHasSucceeded] = useState(false);
    const [message, setMessage] = useState('');
    const [timestamp, setTimestamp] = useState(
        DateTime.now().toLocaleString(DateTime.DATETIME_MED)
    );

    useEffect(() => {
        const fetchData = async () => {
            const jsonParticipants = await getParticipants();
            setAllParticipants(jsonParticipants.data);
            return jsonParticipants;
        };
        fetchData()
            .then((result) => {
                setFetchStatus({
                    success: true,
                    message: result.message
                });
            })
            .catch((error) => {
                setFetchStatus({
                    success: false,
                    message: error.message
                });
            });
    });

    const handleToastShow = (success, message) => {
        setToastShow(true);
        setHasSucceeded(success);
        setMessage(message);
        setTimestamp(DateTime.now().toLocaleString(DateTime.DATETIME_MED));
    }
    const handleToastClose = () => {
        setToastShow(false);
    };

    return (
       <Card>
           <ParticipantListHeader onChangesSubmitted={handleToastShow} />
           <ParticipantList fetchStatus={fetchStatus}
                            allParticipants={allParticipants}
                            onChangesSubmitted={handleToastShow} />
           <ServerMessageToast show={toastShow}
                               onClose={handleToastClose}
                               success={hasSucceeded}
                               message={message}
                               timestamp={timestamp} />
       </Card>
    );
};
