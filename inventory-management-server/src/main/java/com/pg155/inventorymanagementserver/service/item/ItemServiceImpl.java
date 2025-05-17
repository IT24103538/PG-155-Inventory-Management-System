package com.pg155.inventorymanagementserver.service.item;

import com.pg155.inventorymanagementserver.merge_sort.MergeSort;
import com.pg155.inventorymanagementserver.model.Item;
import com.pg155.inventorymanagementserver.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ItemServiceImpl implements IItemService {

    private final ItemRepository itemRepository = new ItemRepository();

    public ItemServiceImpl() {
    }

    @Override
    public List<Item> getAllItems() {
        return MergeSort.sort(itemRepository.getAll());
    }

    @Override
    public Item addItem(Item item) {
        return itemRepository.add(item);
    }

    @Override
    public Item updateItem(String id, Item updatedItem) {
        return itemRepository.updateById(id, updatedItem);
    }

    @Override
    public boolean deleteItem(String id) {
        Item deletingItem = this.getItemById(id);
        return itemRepository.removeById(id);
    }

    @Override
    public Item getItemById(String id) {
        return itemRepository.getAll().stream()
                .filter(item -> item.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
