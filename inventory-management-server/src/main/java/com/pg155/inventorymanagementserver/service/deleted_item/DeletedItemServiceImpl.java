package com.pg155.inventorymanagementserver.service.deleted_item;

import com.pg155.inventorymanagementserver.model.DeletedItem;
import com.pg155.inventorymanagementserver.model.Item;
import com.pg155.inventorymanagementserver.repository.DeletedItemRepository;
import com.pg155.inventorymanagementserver.repository.ItemRepository;
import com.pg155.inventorymanagementserver.stack.DeletedItemStack;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeletedItemServiceImpl implements IDeletedItemService {

    private final DeletedItemRepository deletedItemRepository = new DeletedItemRepository();
    private final ItemRepository itemRepository = new ItemRepository();
    private final DeletedItemStack deletedItemStack;

    public DeletedItemServiceImpl() {
        deletedItemStack = new DeletedItemStack();

        // Initiate stack from stored values
        List<DeletedItem> deletedItems = this.getAllDeletedItems();
        for (DeletedItem deletedItem : deletedItems) {
            deletedItemStack.push(deletedItem);
        }
    }

    @Override
    public List<DeletedItem> getAllDeletedItems() {
        return deletedItemRepository.getAll();
    }

    @Override
    public void addDeletedItem(DeletedItem deletedItem) {
        DeletedItem savedDeletedItem = deletedItemRepository.add(deletedItem);

        // Add the deleted item to stack
        deletedItemStack.push(savedDeletedItem);
    }

    @Override
    public boolean restoreDeletedItem() {
        // First remove the lastly deleted item from the stack
        DeletedItem deletedItem = deletedItemStack.pop();

        // Restore the item
        Item item = new Item(deletedItem.getId(), deletedItem.getName(), deletedItem.getCategory(), deletedItem.getExpiryDate(), deletedItem.getPrice());
        itemRepository.add(item);

        return deletedItemRepository.removeById(deletedItem.getId());
    }

    @Override
    public String getLastlyDeletedItemId() {
        return deletedItemStack.peek().getId();
    }

    @Override
    public boolean deleteDeletedItem(String id) {
        // Remove the lastly deleted item from the stack
        deletedItemStack.pop();

        return deletedItemRepository.removeById(id);
    }
}

