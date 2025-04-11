import React, { useState } from "react";
import "./FoundItem.css";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { ref, push } from "firebase/database";
import { db } from "../../firebase";

const FoundItem = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    date: "",
    location: "",
    contact: "",
  });

  const [loadingCaption, setLoadingCaption] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setLoadingCaption(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      try {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: base64Image,
            }),
          }
        );

        const result = await response.json();
        console.log("HuggingFace Response:", result);

        const caption = result[0]?.generated_text || "Unknown Item";
        const date = new Date().toLocaleDateString();

        setFormData((prev) => ({
          ...prev,
          itemName: caption,
          description: caption,
          date,
        }));
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to get AI caption. Check your Hugging Face token.");
        setFormData((prev) => ({
          ...prev,
          itemName: "Unknown Item",
          description: "Could not generate description.",
        }));
      }

      setLoadingCaption(false);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      ...formData,
      id: Date.now(),
      type: "Found",
      name: formData.itemName,
    };

    try {
      //  I Stored found item in Firebase
      const foundItemsRef = ref(db, "foundItems");
      await push(foundItemsRef, newItem);
    } catch (err) {
      console.error("Firebase Error:", err);
      alert("Failed to submit item to Firebase.");
      return;
    }

    const lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];

    const matchedLostItem = lostItems.find((item) => {
      const lostItemName = item.item?.toLowerCase().trim();
      const foundItemName = formData.itemName.toLowerCase().trim();

      return (
        lostItemName &&
        foundItemName &&
        (lostItemName.includes(foundItemName) ||
          foundItemName.includes(lostItemName) ||
          lostItemName.split(" ").some((word) => foundItemName.includes(word)))
      );
    });

    if (matchedLostItem && matchedLostItem.contact?.includes("@")) {
      emailjs.send(
        "service_q0txzah",
        "template_x16q3qt",
        {
          to_email: matchedLostItem.contact,
          item_name: formData.itemName,
          found_date: formData.date,
          found_location: formData.location,
          name: "LostLink Team",
          email: formData.contact,
          website_url: "http://localhost:3000",
        },
        "9AFrY2MGxBgjV3W9S"
      )
      
        .then((result) => {
          console.log("Email sent:", result.text);
        })
        .catch((error) => {
          console.error("Email error:", error);
        });
    }

    alert("Your response has been captured!");
    navigate("/all-items");
  };

  return (
    <div className="found-container">
      <form onSubmit={handleSubmit} className="found-form">
        <h2>Report Found Item</h2>

        <label>Upload Image (AI will suggest details)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />
        {loadingCaption && (
          <p className="loading-text">Analyzing image with AI...</p>
        )}

        <label>Item Name</label>
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
        />

        <div className="found-grid">
          <div>
            <label>Date Found</label>
            <input
              type="text"
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

        <button type="submit">Submit Found Item</button>
      </form>
    </div>
  );
};

export default FoundItem;
