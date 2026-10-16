export const dialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onClose(); // ปิด Popup
    } catch (error) {
      console.error("Error adding about:", error);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <div onSubmit={handleSubmit}>
            <div className="text-lg font-bold mb-4 text-black">
                อยู่ใน Project นี้อยู่ในขั้นตอนการพัฒนา
            </div>
          <div className="text-right">
            <button type="button" onClick={onClose} className="table-btn mr-2">
              Cancel
            </button>
          </div>
        </div>
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
    zIndex: 1000, // เพิ่ม z-index เพื่อให้ Popup อยู่ด้านบน
  },
  dialog: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "350px",
  },
};

export default dialog;
