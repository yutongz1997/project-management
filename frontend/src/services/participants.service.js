import axios from 'axios';


export async function getParticipants() {
    const response = await axios.get('/api/participants');
    return response.data;
}


export async function createParticipant(data) {
    const response = await axios.post('/api/participants', data);
    return response.data;
}


export async function updateParticipant(id, data) {
    const response = await axios.patch(`/api/participants/${id}`, data);
    return response.data;
}


export async function deleteParticipant(id) {
    const response = await axios.delete(`/api/participants/${id}`);
    return response.data;
}
