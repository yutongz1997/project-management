export async function getParticipants() {
    const response = await fetch('/api/participants');
    return response.json();
}
