import { useState, useEffect } from "react";
import AddInspDialog from "../inspiration-am/insp-dialog";
import {
  getInspiration,
  deleteInspiration,
} from "../../../services/inspiration.service";

function TableInspiration() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [inspiration, setInspiration] = useState([]);

  const [editingInspiration, setEditingInspiration] = useState(null);

  const refreshInspiration = async () => {
    try {
      const data = await getInspiration();
      setInspiration(data);
    } catch (error) {
      console.error("Error fetching inspiration information:", error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this inspiration information?",
      )
    ) {
      try {
        await deleteInspiration(id);
        refreshInspiration();
      } catch (error) {
        console.error("Error deleting inspiration information:", error);
      }
    }
  };

  const handleEditClick = (inspiration) => {
    setEditingInspiration(inspiration);
    setIsOpenDialog(true);
  };

  const handleAddClick = () => {
    setEditingInspiration(null);
    setIsOpenDialog(true);
  };

  useEffect(() => {
    let ignore = false;

    async function initialFetch() {
      try {
        const data = await getInspiration();
        if (!ignore) {
          setInspiration(data);
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
          <div className="text-2xl font-bold">Inspiration Planning Table</div>
          <div className="text-gray-600">
            <button
              onClick={handleAddClick}
              className="table-btn table-btn-add"
            >
              Add Inspiration
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
            {inspiration.map((item, index) => (
              <tr key={item._id} className="border-b">
                <td>{String(index + 1).padStart(2, "0")}</td>
                <td className="p-2 col-title font-semibold">{item.title}</td>
                <td className="p-2 col-desc">{item.description}</td>
                <td className="p-2 col-date">
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-GB")
                    : "-"}
                </td>
                <td className="p-2 col-status">
                  <span className={`badge badge-${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-2 col-actions text-right">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="table-btn"
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
      <AddInspDialog
        key={editingInspiration ? editingInspiration._id : "add-new"}
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
        onInspirationSaved={refreshInspiration}
        inspiration={editingInspiration}
      />
    </div>
  );
}

export default TableInspiration;
