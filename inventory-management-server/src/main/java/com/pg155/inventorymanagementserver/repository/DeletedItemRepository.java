package com.pg155.inventorymanagementserver.repository;

import com.pg155.inventorymanagementserver.model.DeletedItem;
import com.pg155.inventorymanagementserver.model.Item;

import java.time.LocalDate;

public class DeletedItemRepository extends TextFileRepository<DeletedItem> {

    public DeletedItemRepository() {
        super("deleted-items.txt");
    }

    @Override
    protected String toLine(DeletedItem item) {
        // Format: id|name|category|expiryDate|price|deletedAt|reason
        return String.join("|",
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getExpiryDate().toString(),
                String.valueOf(item.getPrice()),
                item.getDeletedAt().toString(),
                item.getReason());
    }

    @Override
    protected DeletedItem fromLine(String line) {
        String[] parts = line.split(DELIMITER);
        if (parts.length != 7) {
            throw new IllegalArgumentException("Invalid deleted item record: " + line);
        }

        Item baseItem = new Item(
                parts[0],
                parts[1],
                parts[2],
                LocalDate.parse(parts[3]),
                Double.parseDouble(parts[4])
        );

        LocalDate deletedAt = LocalDate.parse(parts[5]);
        String reason = parts[6];

        return new DeletedItem(baseItem, deletedAt, reason);
    }
}
