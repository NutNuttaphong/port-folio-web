import { useState, useEffect } from "react"; // เอา useCallback ออกได้แล้วครับ
import AddProjectDialog from "../home-am/projectDialog";
import { getProjects, deleteProject } from "../../../services/project.service";

function TableHome() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  // 🔥 เพิ่ม State สำหรับเก็บข้อมูลที่จะแก้ไข (ถ้าเป็น null คือการ Add)
  const [editingProject, setEditingProject] = useState(null);

  // ฟังก์ชันสำหรับเรียกใช้ตอนกด Save ข้อมูลเสร็จ
  const refreshProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        refreshProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  // 🔥 ฟังก์ชันเปิดหน้าต่าง Edit
  const handleEditClick = (project) => {
    setEditingProject(project); // ส่งข้อมูลเดิมเข้าไป
    setIsDialogOpen(true);
  };

  // 🔥 ฟังก์ชันเปิดหน้าต่าง Add
  const handleAddClick = () => {
    setEditingProject(null); // เคลียร์ข้อมูลทิ้ง
    setIsDialogOpen(true);
  };

  // ดึงข้อมูลเมื่อเปิดหน้าเว็บครั้งแรก
  useEffect(() => {
    let ignore = false;

    async function initialFetch() {
      try {
        const data = await getProjects();
        if (!ignore) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Error initial fetch:", error);
      }
    }

    initialFetch();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="root">
      <div className="flex justify-between items-center gap-4 text-center mb-4">
        <div className="text-2xl font-bold">Home Page Table</div>
        <button
          className="table-btn table-btn-add"
          onClick={handleAddClick} // 🔥 เปลี่ยนมาใช้ handleAddClick
        >
          Add Project
        </button>
      </div>

      <div className="table-container">
        <table className="custom-table w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">No.</th>
              <th className="p-2">Project name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2 text-right">Setting</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id} className="border-b">
                <td className="p-2 col-no">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="p-2 col-title font-semibold">{project.title}</td>
                <td className="p-2 col-desc text-gray-500">
                  {project.description}
                </td>
                <td className="p-2 col-date">
                  {new Date(project.date).toLocaleDateString("en-GB")}
                </td>
                <td className="p-2">
                  <span
                    className={`badge ${project.status === "Completed" ? "badge-success" : "badge-progress"}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="p-2 col-actions text-right">
                  <button
                    onClick={() => handleEditClick(project)} // 🔥 เรียก handleEditClick
                    className="table-btn mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="table-btn table-btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddProjectDialog
        key={editingProject ? editingProject._id : "add-new"}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onProjectSaved={refreshProjects} // เปลี่ยนชื่อเป็น onProjectSaved ให้ครอบคลุมทั้ง Add/Edit
        project={editingProject} // 🔥 ส่งข้อมูลที่จะแก้ไปให้ Dialog (ถ้าเป็น Add จะเป็น null)
      />
    </div>
  );
}

export default TableHome;
