
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LostForm from "./components/LostForm/LostForm";
import FoundItem from "./components/FoundItem/FoundItem";
import ItemsList from "./components/ItemsList/ItemsList";
import Home from "./components/Home/Home";

import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
    alert("Your response is captured!");
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report-lost" element={<LostForm onAddItem={addItem} />} />
        <Route path="/report-found" element={<FoundItem onAddItem={addItem} />} />
        <Route path="/all-items" element={<ItemsList items={items} />} />
      </Routes>
    </div>
  );
};

export default App;
