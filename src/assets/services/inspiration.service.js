// const API_URL = 'http://localhost:3000/inspiration';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${BASE_URL}/project`;

export const getInspiration = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch inspiration');
    }
    return response.json();
};

export const createInspiration = async (formData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
    });
    if (!response.ok) {
        throw new Error('Failed to create inspiration');
    }
    return response.json();
};


export const updateInspiration = async (_id, formData) => {
    const response = await fetch(`${API_URL}/${_id}`, {
        method: 'PATCH',
        body: formData,
    });
    if (!response.ok) {
        throw new Error('Failed to update inspiration');
    }
    return response.json();
};

export const deleteInspiration = async (_id) => {
    const response = await fetch(`${API_URL}/${_id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete inspiration');
    }
    return response.json();
};

const InspirationService = {
    getInspiration,
    createInspiration,
    updateInspiration,
    deleteInspiration,
};

export default InspirationService;