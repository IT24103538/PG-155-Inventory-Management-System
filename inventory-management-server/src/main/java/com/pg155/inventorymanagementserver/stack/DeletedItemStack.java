package com.pg155.inventorymanagementserver.stack;

import com.pg155.inventorymanagementserver.model.DeletedItem;

/**
 * A stack implementation to store DeletedItem objects in LIFO order.
 * Maximum stack size is 100.
 */
public class DeletedItemStack {
    // Maximum number of deleted items the stack can hold
    private static final int MAX_SIZE = 100;

    // Array to store deleted items; declared final since it's initialized once
    private final DeletedItem[] deletedItems;

    // Points to the top of the stack (-1 means empty)
    private int top;

    /**
     * Constructor initializes the deletedItems array and sets top to -1.
     */
    public DeletedItemStack() {
        this.deletedItems = new DeletedItem[MAX_SIZE];
        this.top = -1;
    }

    /**
     * Checks if the stack is empty.
     * @return true if stack is empty, false otherwise
     */
    public boolean isEmpty() {
        return top == -1;
    }

    /**
     * Checks if the stack is full.
     * @return true if stack is full, false otherwise
     */
    public boolean isFull() {
        return top == MAX_SIZE - 1;
    }

    /**
     * Pushes a DeletedItem onto the stack.
     * @param item the DeletedItem to push
     * @throws IllegalStateException if the stack is full
     */
    public void push(DeletedItem item) {
        if (isFull()) {
            throw new IllegalStateException("Stack is full. Cannot add more deleted items.");
        }
        deletedItems[++top] = item;
    }

    /**
     * Pops the top DeletedItem from the stack.
     * @return the most recently pushed DeletedItem
     * @throws IllegalStateException if the stack is empty
     */
    public DeletedItem pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty. Cannot remove item.");
        }
        return deletedItems[top--];
    }

    /**
     * Peeks at the top DeletedItem without removing it.
     * @return the top DeletedItem
     * @throws IllegalStateException if the stack is empty
     */
    public DeletedItem peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty. No item to peek.");
        }
        return deletedItems[top];
    }

    /**
     * Returns the number of items currently in the stack.
     * @return stack size
     */
    public int size() {
        return top + 1;
    }
}
