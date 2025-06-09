import { useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";

const EnquiryPopup = ({ isOpen, onClose }) => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/enquiries';
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/api/enquiries`, formData);
      setSuccessMessage("Enquiry submitted successfully!");
      setFormData({ name: "", phone: "", email: "", note: "" });

      // Optionally auto-close popup after delay
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 3000);
    } catch (err) {
      alert("Failed to submit enquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative bg-[#2b2b2b] text-white w-[90%] max-w-xl p-6 rounded-xl shadow-lg animate-slideUp">
        <button
          onClick={onClose}
          className="absolute -top-7 -right-4 text-5xl"
        >
          &times;
        </button>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-3 text-sm font-[Gothic] py-3"
        >
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-[#1f1f1f] text-white outline-none"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Contact No."
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-[#1f1f1f] text-white outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Id"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-[#1f1f1f] text-white outline-none"
          />
          <textarea
            name="note"
            placeholder="Add a note"
            rows="3"
            value={formData.note}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-[#1f1f1f] text-white outline-none resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-[170px] bg-[#1f1f1f] text-white border border-white rounded-full py-2 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Enquire Now"}
          </button>

          {/* ✅ Success message */}
          {successMessage && (
            <div className="flex items-center gap-2 mt-3 text-green-400 text-sm">
              <FaCheckCircle className="text-lg" />
              <span className="text-white">{successMessage}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EnquiryPopup;
