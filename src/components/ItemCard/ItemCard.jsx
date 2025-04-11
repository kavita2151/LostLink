import React from "react";
import "./ItemCard.css";

const ItemCard = ({ item, onDelete }) => {
  const handleDelete = () => {
    onDelete(item.id, item.type);
  };

  return (
    <div className="item-card">
      <div className="card-header">
        <span className={`item-type ${item.type.toLowerCase()}`}>
          {item.type}
        </span>
      </div>

      <div className="card-body">
        <h3 className="item-name">{item.name || item.item}</h3>
        <p className="item-description">{item.description}</p>
        <p className="item-date">
          <strong>Date:</strong> {item.date}
        </p>
        <p className="item-location">
          <strong>Location:</strong> {item.location}
        </p>
        <p className="item-contact">
          <strong>Contact:</strong> {item.contact}
        </p>
      </div>

      <div className="card-footer">
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
