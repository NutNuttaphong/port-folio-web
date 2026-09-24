// src/assets/services/port.service.js

// const API_URL = 'http://localhost:3000/portfolio';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${BASE_URL}/project`;

// 1. ฟังก์ชันดึงข้อมูล (Get)
export const getPort = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch portfolios');
  }
  return response.json();
};

// 2. ฟังก์ชันสร้างข้อมูล (Create)
export const createPort = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to create portfolio');
  }
  return response.json();
};

// 3. ฟังก์ชันอัปเดตข้อมูล (Update)
export const updatePort = async (_id, formData) => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'PATCH',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to update portfolio');
  }
  return response.json();
};

// 4. 🔥 ฟังก์ชันลบข้อมูล (Delete) -> ตัวนี้แหละที่หน้าตารางตามหาอยู่!
export const deletePort = async (_id) => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete portfolio');
  }
  return response.json();
};

const PortService = {
  getPorts: getPort,
  createPort,
  updatePort,
  deletePort,
};

export default PortService; 