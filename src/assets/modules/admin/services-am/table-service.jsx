import { useState, useEffect } from "react"; // 1. นำเข้า useState
import AddServDialog from "../../admin/services-am/services-dialog"; // นำเข้า Component Popup (ต้องมีไฟล์นี้อยู่ด้วย)
import { getServ, deleteServ } from "../../../services/serv.service";

function TableServ() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [serv, setServ] = useState([]);

  // State สำหรับเก็บข้อมูล Service ที่จะแก้ไข (null = Add)
  const [editingServ, setEditingServ] = useState(null);

  const refreshServ = async () => {
    try {
      const data = await getServ();
      setServ(data);
    } catch (error) {
      console.error("Error fetching service information:", error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this service information?")
    ) {
      try {
        await deleteServ(id);
        refreshServ();
      } catch (error) {
        console.error("Error deleting service information:", error);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  // เปิด Dialog โหมด Edit
  const handleEditClick = (serv) => {
    setEditingServ(serv);
    setIsDialogOpen(true);
  };

  // เปิด Dialog โหมด Add
  const handleAddClick = () => {
    setEditingServ(null);
    setIsDialogOpen(true);
  };

  // ดึงข้อมูลครั้งแรกเมื่อโหลดหน้า
  useEffect(() => {
    let ignore = false;

    async function initialFetch() {
      try {
        const data = await getServ();
        if (!ignore) {
          setServ(data);
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
      <div>
        <div className="flex justify-between items-center gap-4 text-center">
          <div className="text-2xl font-bold">About Page Table</div>
          <div className="text-gray-600">
            <button
              onClick={handleAddClick}
              className="table-btn table-btn-add"
            >
              Add About Information
            </button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Project name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right">Setting</th>
            </tr>
          </thead>
          <tbody>
            {serv.map((item, index) => (
              <tr key={item._id} className="border-b">
                <td className="p-2 col-no">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="p-2 col-title font-semibold">{item.title}</td>
                <td className="p-2 col-desc text-gray-500">
                  {item.description}
                </td>
                <td className="p-2 col-date">
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-GB")
                    : "-"}
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

      <AddServDialog
        key={editingServ ? editingServ._id : "add-new"}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onServSaved={refreshServ}
        serv={editingServ}

      />
    </div>
  );
}

export default TableServ;
