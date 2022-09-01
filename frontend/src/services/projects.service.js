import axios from 'axios';


export async function getProjects() {
    const response = await axios.get('/api/projects');
    return response.data;
}


export async function createProject(data) {
    const response = await axios.post('/api/projects', data);
    return response.data;
}


export async function updateProject(id, data) {
    const response = await axios.patch(`/api/projects/${id}`, data)
    return response.data;
}


export async function deleteProject(id) {
    const response = await axios.delete(`/api/projects/${id}`);
    return response.data;
}
