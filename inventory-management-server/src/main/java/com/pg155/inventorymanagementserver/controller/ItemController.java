package com.pg155.inventorymanagementserver.controller;

import com.pg155.inventorymanagementserver.model.Item;
import com.pg155.inventorymanagementserver.service.item.IItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing items.
 */
@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final IItemService itemService;

    public ItemController(IItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @PostMapping
    public Item addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable String id, @RequestBody Item item) {
        return itemService.updateItem(id, item);
    }

    @DeleteMapping("/{id}")
    public boolean deleteItem(@PathVariable String id) {
        return itemService.deleteItem(id);
    }
}
