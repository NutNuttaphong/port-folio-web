import { getAuthHeaders, handleAuthError } from '../../utils/apiAuth';
// const API_URL = 'http://localhost:3000/serv';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${BASE_URL}/serv`;

export const getServ = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
    handleAuthError(response);
    throw new Error('Failed to fetch serv');
    }
    return response.json();
};

export const createServ = async (formData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
   headers: getAuthHeaders(),
    body: formData,
    });
    if (!response.ok) {
    handleAuthError(response);
    throw new Error('Failed to create serv');
    }
    return response.json();
};

export const updateServ = async (_id, formData) => {
    const response = await fetch(`${API_URL}/${_id}`, {
        method: 'PATCH',
   headers: getAuthHeaders(),
    body: formData,
    });
    if (!response.ok) {
    handleAuthError(response);
    throw new Error('Failed to update serv');
    }
    return response.json();
};

export const deleteServ = async (_id) => {
    const response = await fetch(`${API_URL}/${_id}`, {
        method: 'DELETE',
   headers: getAuthHeaders(),
    });
    if (!response.ok) {
    handleAuthError(response);
    throw new Error('Failed to delete serv');
    }
    return response.json();
};


const ServService = {
    getServ,
    createServ,
    updateServ,
    deleteServ,
};

export default ServService;