package com.pg155.inventorymanagementserver.service.item;

import com.pg155.inventorymanagementserver.model.Item;

import java.util.List;

/**
 * Interface for item-related operations.
 */
public interface IItemService {

    /**
     * Get all items.
     */
    List<Item> getAllItems();

    /**
     * Add a new item.
     */
    Item addItem(Item item);

    /**
     * Update an existing item by ID.
     */
    Item updateItem(String id, Item updatedItem);

    /**
     * Delete an item by ID.
     */
    boolean deleteItem(String id);

    /**
     * Get item by ID.
     */
    Item getItemById(String id);
}

