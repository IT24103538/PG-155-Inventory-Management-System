import React, { useEffect, useState } from "react";

// Base URL for the deleted items API
const API_BASE_URL = "http://localhost:8080/api/deleted-items";

export default function DeletedItemManagement() {
  // State for storing the list of deleted items
  const [deletedItems, setDeletedItems] = useState([]);
  // State for storing the ID of the most recently deleted item
  const [lastlyDeletedItemId, setLastlyDeletedItemId] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    fetchDeletedItems();
    fetchLastlyDeletedItemId();
  }, []);

  // Function to fetch all deleted items from the API
  const fetchDeletedItems = () => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => setDeletedItems(data));
  };

  // Function to fetch the ID of the most recently deleted item
  const fetchLastlyDeletedItemId = () => {
    fetch(`${API_BASE_URL}/lastly-deleted-item-id`)
      .then((res) => res.text())
      .then((data) => setLastlyDeletedItemId(data));
  };

  // Handler for restoring the most recently deleted item
  const handleRestore = () => {
    fetch(API_BASE_URL, { method: "PATCH" }).then(() => {
      // Refresh both the items list and last deleted ID after restoration
      fetchDeletedItems();
      fetchLastlyDeletedItemId();
    });
  };

  // Handler for permanently deleting an item
  const handlePermanentDelete = (id) => {
    // Confirm deletion with user before proceeding
    if (
      window.confirm("Are you sure you want to permanently delete this item?")
    ) {
      fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" }).then(() => {
        // Refresh both the items list and last deleted ID after deletion
        fetchDeletedItems();
        fetchLastlyDeletedItemId();
      });
    }
  };

  // Helper function to format date strings
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Deleted Items Management
      </h1>

      {/* Deleted Items Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
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
                Deleted At
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {/* Show empty state if no deleted items */}
            {deletedItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No deleted items found.
                </td>
              </tr>
            ) : (
              // Map through deleted items and render table rows
              deletedItems.map((item) => (
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
                    {formatDate(item.deletedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                    {/* Only show actions for the most recently deleted item */}
                    {lastlyDeletedItemId && lastlyDeletedItemId == item.id && (
                      <>
                        <button
                          onClick={handleRestore}
                          className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium hover:bg-green-200"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(item.id)}
                          className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </>
                    )}
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
