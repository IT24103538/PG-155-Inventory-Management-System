import React, { useEffect, useState } from "react";

export default function ItemManagement() {
  // State for storing all items
  const [items, setItems] = useState([]);
  // State for form data
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    expiryDate: "",
    price: "",
  });
  // State to track if we're editing an existing item
  const [isEditing, setIsEditing] = useState(false);
  // Available categories for items
  const categories = [
    "Food & Beverages",
    "Pharmaceuticals & Healthcare",
    "Cosmetics & Personal Care",
    "Chemicals & Cleaning Supplies",
  ];

  // API endpoint for items
  const API_BASE_URL = "http://localhost:8080/api/items";

  // Fetch items when component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all items from API
  const fetchItems = () => {
    fetch(API_BASE_URL)
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
        fetchItems(); // Refresh items list
        resetForm(); // Clear the form
      });
  };

  // Handle deletion of an item
  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" }).then(
      () => fetchItems() // Refresh items list after deletion
    );
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle editing an existing item (populate form with item data)
  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  // Reset form to initial state
  const resetForm = () => {
    setForm({
      id: Date.now(), // Generate a new ID (temporary until server assigns one)
      name: "",
      category: "",
      expiryDate: "",
      price: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Item Management
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Enter Item Name"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Expiry Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              required
              placeholder="Enter Item Price"
            />
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {isEditing ? "Update Item" : "Add Item"}
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

      {/* Items Table */}
      <div className="overflow-x-auto shadow-md rounded-lg shadow-">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {/* Empty state */}
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No items found.
                </td>
              </tr>
            ) : (
              // Items list
              items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.expiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.price}
                  </td>
                  {/* Action buttons */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
