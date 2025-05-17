package com.pg155.inventorymanagementserver.repository;

import com.pg155.inventorymanagementserver.model.Transaction;

import java.time.LocalDate;

public class TransactionRepository extends TextFileRepository<Transaction> {

    public TransactionRepository() {
        super("transactions.txt");
    }

    @Override
    protected String toLine(Transaction transaction) {
        // Format: id|itemId|type|quantity|timestamp
        return String.join("|",
                transaction.getId(),
                transaction.getItemId(),
                transaction.getType(),
                String.valueOf(transaction.getQuantity()),
                transaction.getDate().toString());
    }

    @Override
    protected Transaction fromLine(String line) {
        String[] parts = line.split(DELIMITER);
        if (parts.length != 5) {
            throw new IllegalArgumentException("Invalid transaction record: " + line);
        }

        String id = parts[0];
        String itemId = parts[1];
        String type = parts[2];
        int quantity = Integer.parseInt(parts[3]);
        LocalDate date = LocalDate.parse(parts[4]);

        return new Transaction(id, itemId, type, quantity, date);
    }
}

