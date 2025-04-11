import React, { useState } from "react";
import "./LostForm.css";
import { useNavigate } from "react-router-dom";
import { ref, push } from "firebase/database";
import { db } from "../../firebase";

const LostForm = () => {
  const [formData, setFormData] = useState({
    item: "",
    description: "",
    date: "",
    location: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      ...formData,
      id: Date.now(),
      type: "Lost",
    };

    try {
      const lostItemsRef = ref(db, "lostItems");
      await push(lostItemsRef, newItem);

      alert("Your response has been captured!");
      navigate("/all-items");
    } catch (err) {
      console.error("Error saving to Firebase:", err);
      alert("Failed to save item. Please try again.");
    }
  };

  return (
    <div className="lost-form-container">
      <form className="lost-form" onSubmit={handleSubmit}>
        <h2>Report Lost Item</h2>

        <label>Item Name</label>
        <input
          type="text"
          name="item"
          placeholder="e.g., Blue Umbrella"
          value={formData.item}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Brief description of the item"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <div className="grid-fields">
          <div>
            <label>Date Lost</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Your last known location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Contact Info</label>
        <input
          type="text"
          name="contact"
          placeholder="Email"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Lost Item</button>
      </form>
    </div>
  );
};

export default LostForm;
