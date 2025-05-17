package com.pg155.inventorymanagementserver.repository;

import com.pg155.inventorymanagementserver.model.Item;

import java.time.LocalDate;

public class ItemRepository extends TextFileRepository<Item> {

    public ItemRepository() {
        super("items.txt");
    }

    @Override
    protected String toLine(Item item) {
        // Format: id|name|category|expiryDate|price
        return String.join("|",
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getExpiryDate().toString(),
                String.valueOf(item.getPrice()));
    }

    @Override
    protected Item fromLine(String line) {
        String[] parts = line.split(DELIMITER);
        if (parts.length != 5) {
            throw new IllegalArgumentException("Invalid item data: " + line);
        }

        String id = parts[0];
        String name = parts[1];
        String category = parts[2];
        LocalDate expiryDate = LocalDate.parse(parts[3]);
        double price = Double.parseDouble(parts[4]);

        return new Item(id, name, category, expiryDate, price);
    }
}
