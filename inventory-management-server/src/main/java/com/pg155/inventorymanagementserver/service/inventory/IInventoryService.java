package com.pg155.inventorymanagementserver.service.inventory;

import com.pg155.inventorymanagementserver.model.Inventory;

import java.util.List;

/**
 * Interface for inventory-related operations.
 */
public interface IInventoryService {

    /**
     * Get all inventory records.
     */
    List<Inventory> getAllInventories();

    /**
     * Add a new inventory record.
     */
    Inventory addInventory(Inventory inventory);

    /**
     * Update an existing inventory record by ID.
     */
    Inventory updateInventory(String id, Inventory updatedInventory);

    /**
     * Delete an inventory record by ID.
     */
    boolean deleteInventory(String id);

    /**
     * Get inventory by item ID.
     */
    Inventory getInventoryByItemId(String itemId);
}
