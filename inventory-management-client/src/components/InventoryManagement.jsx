import React, { useEffect, useState } from "react";

export default function InventoryManagement() {
  // State for storing inventory items
  const [inventoryItems, setInventoryItems] = useState([]);
  // State for storing all available items (for dropdown)
  const [items, setItems] = useState([]);
  // State for form data
  const [form, setForm] = useState({
    id: "",
    itemId: "",
    stockLevel: "",
    warehouse: "",
    block: "",
  });
  // State to track if we're editing an existing item
  const [isEditing, setIsEditing] = useState(false);

  // API endpoints
  const API_BASE_URL = "http://localhost:8080/api/inventories";
  const ITEM_API_URL = "http://localhost:8080/api/items";

  // Fetch data on component mount
  useEffect(() => {
    fetchInventory();
    fetchItems();
  }, []);

  // Fetch inventory items from API
  const fetchInventory = () => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => setInventoryItems(data));
  };

  // Fetch all available items from API (for dropdown)
  const fetchItems = () => {
    fetch(ITEM_API_URL)
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  // Handle form submission (both create and update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_BASE_URL}/${form.id}` : API_BASE_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        fetchInventory(); // Refresh inventory list
        resetForm(); // Clear the form
      });
  };

  // Handle deletion of an inventory item
  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" }).then(
      () => fetchInventory() // Refresh inventory list after deletion
    );
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "stockLevel" ? parseInt(value) : value, // Convert stockLevel to number
    });
  };

  // Handle editing an existing item (populate form with item data)
  const handleEdit = (inventoryItem) => {
    setForm(inventoryItem);
    setIsEditing(true);
  };

  // Reset form to initial state
  const resetForm = () => {
    setForm({
      id: "",
      itemId: "",
      stockLevel: "",
      warehouse: "",
      block: "",
    });
    setIsEditing(false);
  };

  // Helper function to get item name by ID
  const getItemName = (itemId) => {
    const item = items.find((i) => i.id === itemId);
    return item ? item.name : "Deleted Item"; // Fallback if item not found
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Inventory Management
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Item Selection Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item
            </label>
            <select
              name="itemId"
              value={form.itemId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
              required
            >
              <option value="">Select item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Level Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Level
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="stockLevel"
              value={form.stockLevel}
              onChange={handleInputChange}
              required
              placeholder="Enter Stock Level"
            />
          </div>

          {/* Warehouse Selection Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Warehouse
            </label>
            <select
              name="warehouse"
              value={form.warehouse}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Warehouse</option>
              <option value="Main">Main</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>

          {/* Block Selection Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Block
            </label>
            <select
              name="block"
              value={form.block}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Block</option>
              <option value="A">Block A</option>
              <option value="B">Block B</option>
              <option value="C">Block C</option>
              <option value="D">Block D</option>
              <option value="E">Block E</option>
            </select>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {isEditing ? "Update Inventory" : "Add Inventory"}
          </button>
          {/* Show Cancel button only when editing */}
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Inventory Items Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Item
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Stock Level
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Warehouse
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Block
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {/* Empty state */}
            {inventoryItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No inventory items found.
                </td>
              </tr>
            ) : (
              // Inventory items list
              inventoryItems.map((inventoryItem) => (
                <tr
                  key={inventoryItem.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {getItemName(inventoryItem.itemId)}
                  </td>
                  {/* Stock level with color-coded indicator */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        inventoryItem.stockLevel <= 0
                          ? "bg-red-100 text-red-800"
                          : inventoryItem.stockLevel <= 10
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {inventoryItem.stockLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {inventoryItem.warehouse}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {inventoryItem.block}
                  </td>
                  {/* Action buttons */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                    <button
                      onClick={() => handleEdit(inventoryItem)}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(inventoryItem.id)}
                      className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
