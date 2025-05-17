package com.pg155.inventorymanagementserver.service.transaction;

import com.pg155.inventorymanagementserver.model.Inventory;
import com.pg155.inventorymanagementserver.model.Transaction;
import com.pg155.inventorymanagementserver.repository.TransactionRepository;
import com.pg155.inventorymanagementserver.service.inventory.IInventoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TransactionServiceImpl implements ITransactionService {

    private final TransactionRepository transactionRepository = new TransactionRepository();
    private final IInventoryService inventoryService;

    public TransactionServiceImpl(IInventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.getAll();
    }

    @Override
    public Transaction addTransaction(Transaction transaction) {
        // First get the inventory
        Inventory inventory = inventoryService.getInventoryByItemId(transaction.getItemId());

        // If inventory not found discard this transaction
        if (inventory == null) {
            throw new IllegalStateException("No Inventory for this item");
        }

        // Update the inventory of the item
        int quantity = inventory.getStockLevel();

        if (Objects.equals(transaction.getType(), "PURCHASE")) {
            quantity += transaction.getQuantity();
        } else {
            quantity -= transaction.getQuantity();
        }

        // If inventory quantity get minus value after this transaction
        if (quantity < 0) {
            throw new IllegalStateException("Cannot add a negative quantity to the transaction");
        }

        inventory.setStockLevel(quantity);
        inventoryService.updateInventory(inventory.getId(), inventory);

        return transactionRepository.add(transaction);
    }

    @Override
    public Transaction updateTransaction(String id, Transaction updatedTransaction) {
        return transactionRepository.updateById(id, updatedTransaction);
    }

    @Override
    public boolean deleteTransaction(String id) {
        return transactionRepository.removeById(id);
    }
}

