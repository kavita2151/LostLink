import React, { useEffect, useState } from "react";
import "./ItemsList.css";
import ItemCard from "../ItemCard/ItemCard";
import { db } from "../../firebase";
import { onValue, ref, remove } from "firebase/database";

const ItemsList = () => {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const lostRef = ref(db, "lostItems");
    const foundRef = ref(db, "foundItems");

    const unsubscribeLost = onValue(lostRef, (snapshot) => {
      const data = snapshot.val() || {};
      const lostItems = Object.entries(data).map(([id, item]) => ({
        ...item,
        id,
        type: "Lost",
      }));

      setAllItems((prev) => {
        const other = prev.filter((i) => i.type !== "Lost");
        return [...lostItems, ...other];
      });
    });

    const unsubscribeFound = onValue(foundRef, (snapshot) => {
      const data = snapshot.val() || {};
      const foundItems = Object.entries(data).map(([id, item]) => ({
        ...item,
        id,
        type: "Found",
      }));

      setAllItems((prev) => {
        const other = prev.filter((i) => i.type !== "Found");
        return [...other, ...foundItems];
      });
    });

    return () => {
      unsubscribeLost();
      unsubscribeFound();
    };
  }, []);

  const handleDeleteItem = (id, type) => {
    const path = type === "Lost" ? `lostItems/${id}` : `foundItems/${id}`;
    remove(ref(db, path));
  };

  return (
    <div className="items-container">
      <h2>All Reported Items</h2>
      {allItems.length === 0 ? (
        <p>No items reported yet.</p>
      ) : (
        <div className="item-grid">
          {allItems.map((item) => (
            <ItemCard key={item.id} item={item} onDelete={handleDeleteItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemsList;
