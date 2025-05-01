import React from "react";
import "./DrawerCabinet.css";
import { useNavigate } from "react-router0-dom";

export default function DrawerCabinet() {
  const navigate = useNavigate();
  const drawers = [
    { label: "Search Herbs", path: "/search" },
    { label: "Saved Searches", path: "/saved" },
    { label: "Create Recipe", path: "/create-recipe" },
    { label: "Browse Recipes", path: "/recipes" },
    { label: "About", path: "/about" },
  ];

  return (
    <div className="cabinet">
      {drawers.map((drawer, index) => (
        <div
          key={index}
          className="drawer"
          onClick={() => navigate(drawer.path)}
        >
          <span>{drawer.label}</span>
        </div>
      ))}
    </div>
  );
}
