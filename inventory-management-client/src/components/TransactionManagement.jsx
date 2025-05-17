import React, { useEffect, useState } from "react";

export default function TransactionManagement() {
  // State for storing transactions
  const [transactions, setTransactions] = useState([]);
  // State for storing all available items
  const [items, setItems] = useState([]);
  // State for form data
  const [form, setForm] = useState({
    id: "",
    itemId: "",
    type: "",
    quantity: "",
    date: "",
  });
  // State to track if we're editing an existing transaction
  const [isEditing, setIsEditing] = useState(false);

  // API endpoints
  const API_BASE_URL = "http://localhost:8080/api/transactions";
  const ITEM_API_URL = "http://localhost:8080/api/items";

  // Fetch data when component mounts
  useEffect(() => {
    fetchTransactions();
    fetchItems();
  }, []);

  // Fetch all transactions from API
  const fetchTransactions = () => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  };

  // Fetch all items from API (for dropdown)
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
      .then((res) => {
        if (!res.ok) {
          // Handle API errors (like insufficient inventory)
          return res.json().then((err) => Promise.reject(err));
        }
        return res.json();
      })
      .then(() => {
        fetchTransactions(); // Refresh transactions list
        resetForm(); // Clear the form
      })
      .catch(() => {
        alert(
          "Something went wrong. Please check Inventory availability or inventory quantity."
        );
      });
  };

  // Handle deletion of a transaction
  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" }).then(
      () => fetchTransactions() // Refresh transactions list after deletion
    );
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "quantity" ? parseInt(value) : value, // Convert quantity to number
    });
  };

  // Handle editing an existing transaction (populate form with transaction data)
  const handleEdit = (transaction) => {
    setForm({
      ...transaction,
      date: transaction.date.split("T")[0], // Format date for input field (YYYY-MM-DD)
    });
    setIsEditing(true);
  };

  // Reset form to initial state
  const resetForm = () => {
    setForm({
      id: "",
      itemId: "",
      type: "",
      quantity: "",
      date: "",
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
        Transaction Management
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
              disabled={isEditing} // Disable when editing to maintain data integrity
            >
              <option value="">Select item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Transaction Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
              required
              disabled={isEditing} // Disable when editing to maintain data integrity
            >
              <option value="">Select type</option>
              <option value="PURCHASE">Purchase</option>
              <option value="SALE">Sale</option>
            </select>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="quantity"
              value={form.quantity}
              onChange={handleInputChange}
              required
              placeholder="Enter Quantity"
              disabled={isEditing} // Disable when editing to maintain data integrity
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {isEditing ? "Update Transaction" : "Add Transaction"}
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

      {/* Transactions Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Item
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {/* Empty state */}
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              // Transactions list
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {getItemName(transaction.itemId)}
                  </td>
                  {/* Transaction type with color-coded indicator */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === "PURCHASE"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {transaction.quantity}
                  </td>
                  {/* Formatted date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  {/* Action buttons */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
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
