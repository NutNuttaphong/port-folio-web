// src/assets/services/about information.service.js

// const API_URL = 'http://localhost:3000/about';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${BASE_URL}/about`;

// 1. ฟังก์ชันดึงข้อมูล (Get)
export const getAbout = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch about information');
  }
  return response.json();
};

// 2. ฟังก์ชันสร้างข้อมูล (Create)
export const createAbout = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to create about information');
  }
  return response.json();
};

// 3. ฟังก์ชันอัปเดตข้อมูล (Update)
export const updateAbout = async (_id, formData) => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'PATCH',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to update about information');
  }
  return response.json();
};

// 4. 🔥 ฟังก์ชันลบข้อมูล (Delete) -> ตัวนี้แหละที่หน้าตารางตามหาอยู่!
export const deleteAbout = async (_id) => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete about information');
  }
  return response.json();
};