import { getAuthHeaders, handleAuthError } from '../../utils/apiAuth';
// const API_URL = 'http://localhost:3000/inspiration';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${BASE_URL}/inspiration`;

export const getInspiration = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
    handleAuthError(response);
    throw new Error('Failed to fetch inspiration');
    }
    return response.json();
};

export const createInspiration = async (formData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
   headers: getAuthHeaders(),
    body: formData
    });
    if (!response.ok) {
    handleAuthError(response);
    throw new Error('Failed to create inspiration');
    }
    return response.json();
};


export const updateInspiration = async (_id, formData) => {
    const response = await fetch(`${API_URL}/${_id}`, {
        method: 'PATCH',
   headers: getAuthHeaders(),
    body: formData,
    });
    if (!response.ok) {
    handleAuthError(response);
    throw new Error('Failed to update inspiration');
    }
    return response.json();
};

export const deleteInspiration = async (_id) => {
    const response = await fetch(`${API_URL}/${_id}`, {
        method: 'DELETE',
   headers: getAuthHeaders(),
    });
    if (!response.ok) {
    handleAuthError(response);
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