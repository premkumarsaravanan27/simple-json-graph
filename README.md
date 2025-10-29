# 🌳 JSON Tree Visualizer

An **interactive web application** built with **React**, **Vite**, **React Flow**, and **Tailwind CSS** that allows users to **visualize JSON data as a hierarchical tree structure** with search and highlighting functionality.

---

## 🚀 Demo

👉 [Live Demo](https://your-deployment-link-here.vercel.app)  
*(Replace the above link after deploying on Vercel, Netlify, or GitHub Pages)*

---

## 🎯 Objective

This project helps users **understand and explore complex JSON data** visually.  
Paste your JSON, click **Visualize**, and explore it as a tree of connected nodes.

---

## 🧩 Features

### 🧠 Core
- ✅ Paste or type JSON data into an editor
- ✅ Validate and show errors for invalid JSON
- ✅ Visualize JSON structure as an **interactive tree**
- ✅ Each node displays:
  - Object keys
  - Array indices
  - Primitive key-value pairs

### 🎨 Visualization
- Built with **React Flow**
- Colored nodes:
  - 🟦 Objects → Blue or Purple
  - 🟩 Arrays → Green
  - 🟧 Primitives → Orange or Yellow
- Connect parent and child nodes with smooth edges

### 🔍 Search (JSON Path)
- Search using JSON paths like `$.user.address.city` or `items[0].name`
- Highlights the matching node
- Auto-pans and zooms to the result
- Shows “Match found” or “No match found”

### 🧭 Optional Enhancements
- Zoom in/out and fit view controls  
- Hover tooltips showing node info  
- Dark/Light mode toggle  
- Reset / Clear JSON button  
- Copy node JSON path on click  
- Download tree as PNG image  

---

## ⚙️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React + Vite** | Frontend Framework |
| **React Flow** | Tree Visualization |
| **Tailwind CSS** | Styling |
| **JavaScript (ES6+)** | Logic and Interactivity |

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/premkumarsaravanan27/simple-json-graph.git
cd simple-json-graph
