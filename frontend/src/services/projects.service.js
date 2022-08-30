export async function getProjects() {
    const response = await fetch('/api/projects');
    return response.json();
}


export async function createProject(data) {
    const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}


export async function updateProject(id, data) {
    const response = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}


export async function deleteProject(id) {
    const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}
