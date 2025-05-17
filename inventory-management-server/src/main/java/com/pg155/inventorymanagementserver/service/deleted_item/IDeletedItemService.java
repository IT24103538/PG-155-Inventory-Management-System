package com.pg155.inventorymanagementserver.service.deleted_item;

import com.pg155.inventorymanagementserver.model.DeletedItem;

import java.util.List;

/**
 * Interface for deleted item tracking.
 */
public interface IDeletedItemService {

    /**
     * Get all deleted items.
     */
    List<DeletedItem> getAllDeletedItems();

    /**
     * Add a new deleted item entry.
     */
    void addDeletedItem(DeletedItem deletedItem);

    /**
     * Update a deleted item by ID.
     */
    boolean restoreDeletedItem();

    /**
     * Get the lastly deleted item from stack and return its id
     */
    String getLastlyDeletedItemId();

    /**
     * Delete a deleted item record by ID.
     */
    boolean deleteDeletedItem(String id);
}
