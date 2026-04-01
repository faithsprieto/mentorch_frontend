import { useState } from "react";
import { postRequest } from "../../utils/api";

import "../../styles/CommonButtonStyles.css";
import "../../styles/CommonStyles.css";

export default function AdminCreateDept({ onSuccess }) {
  const [department, setDepartment] = useState(""); // ✅ fixed naming
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // ✅ FIXED TYPO
    if (!department.trim()) {
      alert("Department is required");
      return;
    }

    try {
      setLoading(true);

      const res = await postRequest("/department/create", {
        department: department.trim(),
      });

      alert(res?.message || "Department created successfully");

      setDepartment(""); // ✅ fixed setter

      // ✅ refresh parent list
      if (onSuccess) onSuccess();

    } catch (error) {
      console.error("Error creating department:", error);
      alert(
        error?.response?.data?.message ||
        "Failed to create department"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="department-header">
      <h3>Create department</h3>

      <div className="create-department">
        <h6>Name of department:</h6>

        <input
          type="text"
          placeholder="Enter department..."
          value={department}
          onChange={(e) => setDepartment(e.target.value)} // ✅ fixed
          disabled={loading}
        />

        <div className="bottom-right">
          <button
            className="blue-button"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}