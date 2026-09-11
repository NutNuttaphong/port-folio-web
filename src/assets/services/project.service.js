// src/services/project.service.js

const API_URL = 'http://localhost:3000/project';

// ฟังก์ชันสำหรับดึงข้อมูลทั้งหมด (ใช้ในหน้า Table)
export const getProjects = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

// ฟังก์ชันสำหรับสร้างโปรเจกต์ใหม่พร้อมรูปภาพ (ใช้ในหน้า AddProjectDialog)
export const createProject = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    // ข้อควรระวัง: เวลาส่ง FormData ห้ามใส่ 'Content-Type': 'application/json' เด็ดขาด
    // เบราว์เซอร์จะจัดการ Header ให้เราเองอัตโนมัติครับ
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json();
};

export const updateProject = async (_id, formData) => {
 const response = await fetch(`${API_URL}/${_id}`, {
    method: 'PATCH', // แนะนำให้พิมพ์ตัวพิมพ์ใหญ่ครับ
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to Update project');
  }
  return response.json();
};

// ฟังก์ชันสำหรับสร้างโปรเจกต์ใหม่พร้อมรูปภาพ (ใช้ในหน้า AddProjectDialog)
export const deleteProject = async (_id) => {
 const response = await fetch(`${API_URL}/${_id}`, {
    method: 'DELETE', // แนะนำให้พิมพ์ตัวพิมพ์ใหญ่ครับ
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
  return response.json();
};

// ... (ฟังก์ชัน getProjects, createProject, updateProject, deleteProject ด้านบนคงเดิม)
// เติมฟังก์ชัน getSlides เข้าไปในนี้ด้วย (ถ้าต้องการให้ตรงกับที่ home.jsx เรียกใช้)

const ProjectService = {
  getSlides: getProjects, // หรือสร้างฟังก์ชันแยกตามต้องการ
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};

export default ProjectService; // 👈 คราวนี้จะมีตัวแปร ProjectService ให้ Export แบบ Default จริงๆ แล้ว
