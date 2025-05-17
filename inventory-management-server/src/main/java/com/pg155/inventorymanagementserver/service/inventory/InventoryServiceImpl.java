package com.pg155.inventorymanagementserver.service.inventory;

import com.pg155.inventorymanagementserver.model.Inventory;
import com.pg155.inventorymanagementserver.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements IInventoryService {

    private final InventoryRepository inventoryRepository = new InventoryRepository();

    @Override
    public List<Inventory> getAllInventories() {
        return inventoryRepository.getAll();
    }

    @Override
    public Inventory addInventory(Inventory inventory) {
        return inventoryRepository.add(inventory);
    }

    @Override
    public Inventory updateInventory(String id, Inventory updatedInventory) {
        return inventoryRepository.updateById(id, updatedInventory);
    }

    @Override
    public boolean deleteInventory(String id) {
        return inventoryRepository.removeById(id);
    }

    @Override
    public Inventory getInventoryByItemId(String itemId) {
        return inventoryRepository.getAll().stream()
                .filter(i -> i.getItemId().equals(itemId))
                .findFirst()
                .orElse(null);
    }
}

