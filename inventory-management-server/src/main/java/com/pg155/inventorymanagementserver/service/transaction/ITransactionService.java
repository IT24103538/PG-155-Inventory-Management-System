package com.pg155.inventorymanagementserver.service.transaction;

import com.pg155.inventorymanagementserver.model.Transaction;

import java.util.List;

/**
 * Interface for transaction-related operations.
 */
public interface ITransactionService {

    /**
     * Get all transactions.
     */
    List<Transaction> getAllTransactions();

    /**
     * Add a new transaction.
     */
    Transaction addTransaction(Transaction transaction);

    /**
     * Update an existing transaction by ID.
     */
    Transaction updateTransaction(String id, Transaction updatedTransaction);

    /**
     * Delete a transaction by ID.
     */
    boolean deleteTransaction(String id);

}

