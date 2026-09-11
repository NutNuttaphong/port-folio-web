import { useState, useEffect } from "react";
import AddPortDialog from "../portfolio-am/port-dialog";
import { getPort, deletePort } from "../../../services/port.service";

function TablePortfolio() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [portfolios, setPortfolios] = useState([]);

  // State สำหรับเก็บข้อมูล Portfolio ที่จะแก้ไข (null = Add)
  const [editingPort, setEditingPort] = useState(null);

  // ฟังก์ชันดึงข้อมูลใหม่หลังบันทึกเสร็จ
  const refreshPortfolios = async () => {
    try {
      const data = await getPort();
      setPortfolios(data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      try {
        await deletePort(id);
        refreshPortfolios();
      } catch (error) {
        console.error("Error deleting portfolio:", error);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  // เปิด Dialog โหมด Edit
  const handleEditClick = (port) => {
    setEditingPort(port);
    setIsDialogOpen(true);
  };

  // เปิด Dialog โหมด Add
  const handleAddClick = () => {
    setEditingPort(null);
    setIsDialogOpen(true);
  };

  // ดึงข้อมูลครั้งแรกเมื่อโหลดหน้า
  useEffect(() => {
    let ignore = false;

    async function initialFetch() {
      try {
        const data = await getPort();
        if (!ignore) {
          setPortfolios(data);
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
        {/* 🔥 เปลี่ยนหัวข้อเป็น Portfolio Table ให้ตรงกับเมนู */}
        <div className="text-2xl font-bold">Portfolio Table</div>
        <button
          className="table-btn table-btn-add"
          onClick={handleAddClick}
        >
          Add Portfolio
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
            {portfolios.map((item, index) => (
              <tr key={item._id} className="border-b">
                <td className="p-2 col-no">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="p-2 col-title font-semibold">{item.title}</td>
                <td className="p-2 col-desc text-gray-500">
                  {item.description}
                </td>
                <td className="p-2 col-date">
                  {item.date ? new Date(item.date).toLocaleDateString("en-GB") : "-"}
                </td>
                <td className="p-2">
                  <span
                    className={`badge ${item.status === "Completed" ? "badge-success" : "badge-progress"}`}
                  >
                    {item.status || "In Progress"}
                  </span>
                </td>
                <td className="p-2 col-actions text-right">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="table-btn mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
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

      {/* Dialog จัดการทั้ง Add และ Edit */}
      <AddPortDialog
        key={editingPort ? editingPort._id : "add-new"}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onProjectSaved={refreshPortfolios}
        project={editingPort}
      />
    </div>
  );
}

export default TablePortfolio;