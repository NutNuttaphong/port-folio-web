import { useState } from "react";
import {
  createInspiration,
  updateInspiration,
} from "../../../services/inspiration.service";

const AddInspDialog = ({
  isOpen,
  onClose,
  onInspirationSaved,
  inspiration,
}) => {
  const [title, setTitle] = useState(inspiration ? inspiration.title : "");
  const [description, setDescription] = useState(
    inspiration ? inspiration.description : "",
  );
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(
    inspiration ? inspiration.imageUrl : null,
  );

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      if (inspiration) {
        await updateInspiration(inspiration._id, formData);
      } else {
        const today = new Date().toISOString().split("T")[0];
        formData.append("date", today);
        await createInspiration(formData);
      }

      onInspirationSaved?.();
      onClose();
    } catch (error) {
      console.error("Error adding inspiration:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
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
            <label>Image {inspiration && "(ถ้าไม่เปลี่ยนไม่ต้องเลือก)"}:</label>

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
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    minWidth: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  closeBtn: {
    padding: "8px 16px",
    backgroundColor: "#f1f3f5",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  submitBtn: {
    backgroundColor: "#20c997",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AddInspDialog;
