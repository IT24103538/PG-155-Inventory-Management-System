package com.pg155.inventorymanagementserver.controller;

import com.pg155.inventorymanagementserver.model.Transaction;
import com.pg155.inventorymanagementserver.service.transaction.ITransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing transactions.
 */
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final ITransactionService transactionService;

    public TransactionController(ITransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionService.addTransaction(transaction);
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable String id, @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction);
    }

    @DeleteMapping("/{id}")
    public boolean deleteTransaction(@PathVariable String id) {
        return transactionService.deleteTransaction(id);
    }
}

