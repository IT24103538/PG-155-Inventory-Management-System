package com.pg155.inventorymanagementserver.controller;

import com.pg155.inventorymanagementserver.model.DeletedItem;
import com.pg155.inventorymanagementserver.service.deleted_item.IDeletedItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing deleted items.
 */
@RestController
@RequestMapping("/api/deleted-items")
public class DeletedItemController {

    private final IDeletedItemService deletedItemService;

    public DeletedItemController(IDeletedItemService deletedItemService) {
        this.deletedItemService = deletedItemService;
    }

    @GetMapping
    public List<DeletedItem> getAllDeletedItems() {
        return deletedItemService.getAllDeletedItems();
    }

    @PatchMapping
    public boolean updateDeletedItem() {
        return deletedItemService.restoreDeletedItem();
    }

    @GetMapping("/lastly-deleted-item-id")
    public String getLastlyDeletedItemId() {
        return deletedItemService.getLastlyDeletedItemId();
    }

    @DeleteMapping("/{id}")
    public boolean deleteDeletedItem(@PathVariable String id) {
        return deletedItemService.deleteDeletedItem(id);
    }
}

