// src/assets/services/user.service.js

const API_URL = 'http://localhost:3000/user';

// 1. ฟังก์ชันดึงข้อมูล (Get)
export const getUser = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch user information');
  }
  return response.json();
};

// 2. ฟังก์ชันสร้างข้อมูล (Create)
export const createUser = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to create user information');
  }
  return response.json();
};

// 3. ฟังก์ชันอัปเดตข้อมูล (Update)
export const updateUser = async (_id, formData) => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'PATCH',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to update user information');
  }
  return response.json();
};

// 4. 🔥 ฟังก์ชันลบข้อมูล (Delete) -> ตัวนี้แหละที่หน้าตารางตามหาอยู่!
export const deleteUser = async (_id) => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user information');
  }
  return response.json();
};