package com.pg155.inventorymanagementserver.repository;

import com.pg155.inventorymanagementserver.model.Inventory;

public class InventoryRepository extends TextFileRepository<Inventory> {

    public InventoryRepository() {
        super("inventory.txt");
    }

    @Override
    protected String toLine(Inventory inventory) {
        // Format: id|itemId|stockLevel|warehouse|block
        return String.join("|",
                inventory.getId(),
                inventory.getItemId(),
                String.valueOf(inventory.getStockLevel()),
                inventory.getWarehouse(),
                inventory.getBlock());
    }

    @Override
    protected Inventory fromLine(String line) {
        String[] parts = line.split(DELIMITER);
        if (parts.length != 5) {
            throw new IllegalArgumentException("Invalid inventory record: " + line);
        }

        String id = parts[0];
        String itemId = parts[1];
        int stockLevel = Integer.parseInt(parts[2]);
        String warehouse = parts[3];
        String block = parts[4];

        return new Inventory(id, itemId, stockLevel, warehouse, block);
    }
}
