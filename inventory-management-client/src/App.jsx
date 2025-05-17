import { Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import DeletedItemManagement from "./components/DeletedItemManagement";
import ItemManagement from "./components/ItemManagement";
import InventoryManagement from "./components/InventoryManagement";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <Routes>
          <Route path="/" element={<ItemManagement />} />
          <Route path="/deleted-items" element={<DeletedItemManagement />} />
          <Route path="/inventory" element={<InventoryManagement />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
