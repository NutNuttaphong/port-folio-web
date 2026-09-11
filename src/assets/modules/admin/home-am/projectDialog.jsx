import { useState } from "react";
import {
  createProject,
  updateProject,
} from "../../../services/project.service";

const AddProjectDialog = ({ isOpen, onClose, onProjectSaved, project }) => {
const [title, setTitle] = useState(project ? project.title : "");
  const [description, setDescription] = useState(project ? project.description : "");
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(project ? project.imageUrl : null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch(FormData);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      // 🔥 แยกว่าจะ Create หรือ Update โดยดูว่ามีข้อมูล project ส่งมาไหม
      if (project) {
        // กรณี Edit
        await updateProject(project._id, formData);
      } else {
        // กรณี Add (ต้องเติม date ด้วย)
        const today = new Date().toISOString().split("T")[0];
        formData.append("date", today);
        await createProject(formData);
      }

      onProjectSaved(); // สั่งรีเฟรชตาราง
      onClose(); // ปิด Popup
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // 🔥 2. สร้างฟังก์ชันจัดการตอนเลือกรูปใหม่
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // สร้างลิงก์จำลองให้แสดงรูปใหม่ทันที
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h3 className="text-xl font-bold mb-4">Add New Project</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Project Name</label>
            <br />
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label>Description</label>
            <br />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-1 w-full"
            />
          </div>
          {/* <div className="mb-4">
            <label>อัปโหลดรูปภาพ:</label>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div> */}


          {/* 🔥 3. ส่วนแสดงรูปภาพ */}
          <div className="mb-4">
            <label>Image {project && "(ถ้าไม่เปลี่ยนไม่ต้องเลือก)"}:</label>
            
            {/* โชว์รูปภาพถ้ามี preview */}
            {preview && (
              <div className="my-2">
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }} 
                />
              </div>
            )}
            
            <br />
            <input
              type="file"
              accept="image/*" 
              onChange={handleImageChange} // เรียกใช้ฟังก์ชันที่สร้างไว้
            />
          </div>
          
          <div className="text-right">
            <button type="button" onClick={onClose} className="table-btn mr-2">
              Cancel
            </button>
            <button type="submit" className="table-btn table-btn-add">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "350px",
  },
};

export default AddProjectDialog;
