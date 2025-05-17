package com.pg155.inventorymanagementserver.controller;

import com.pg155.inventorymanagementserver.model.Inventory;
import com.pg155.inventorymanagementserver.service.inventory.IInventoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing inventory.
 */
@RestController
@RequestMapping("/api/inventories")
public class InventoryController {

    private final IInventoryService inventoryService;

    public InventoryController(IInventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public List<Inventory> getAllInventories() {
        return inventoryService.getAllInventories();
    }

    @PostMapping
    public Inventory addInventory(@RequestBody Inventory inventory) {
        return inventoryService.addInventory(inventory);
    }

    @PutMapping("/{id}")
    public Inventory updateInventory(@PathVariable String id, @RequestBody Inventory inventory) {
        return inventoryService.updateInventory(id, inventory);
    }

    @DeleteMapping("/{id}")
    public boolean deleteInventory(@PathVariable String id) {
        return inventoryService.deleteInventory(id);
    }
}

