import { useState } from "react";
import { createAbout, updateAbout } from "../../../services/about.service";

// รับค่า isOpen (เพื่อเช็คว่าเปิดอยู่ไหม) และ onClose (ฟังก์ชันปิด)
const AddAboutDialog = ({ isOpen, onClose, onAboutSaved, about }) => {
  const [title, setTitle] = useState(about ? about.title : "");
  const [description, setDescription] = useState(
    about ? about.description : "",
  );
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(about ? about.imageUrl : null);

  if (!isOpen) return null;

  // ถ้า isOpen เป็น false จะไม่ render อะไรออกมา
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

      // 🔥 แยกว่าจะ Create หรือ Update โดยดูว่ามีข้อมูล about ส่งมาไหม
      if (about) {
        // กรณี Edit
        await updateAbout(about._id, formData);
      } else {
        // กรณี Add (ต้องเติม date ด้วย)
        const today = new Date().toISOString().split("T")[0];
        formData.append("date", today);
        await createAbout(formData);
      }

      onAboutSaved(); // สั่งรีเฟรชตาราง
      onClose(); // ปิด Popup
    } catch (error) {
      console.error("Error adding about:", error);
    }
  };

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
        <h3 className="text-xl font-bold mb-4">Add New About</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>About Name</label>
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
            <label>Image {about && "(ถ้าไม่เปลี่ยนไม่ต้องเลือก)"}:</label>

            {/* โชว์รูปภาพถ้ามี preview */}
            {preview && (
              <div className="my-2">
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
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

// CSS แบบ Object
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

export default AddAboutDialog;
