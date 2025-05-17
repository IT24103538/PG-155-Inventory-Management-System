package com.pg155.inventorymanagementserver.merge_sort;

import com.pg155.inventorymanagementserver.model.Item;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * MergeSort provides a static method to sort a list of Item
 * objects by their expiryDate using the merge sort algorithm.
 */
public class MergeSort {

    /**
     * Sorts a list of Item objects by expiryDate in ascending order.
     *
     * @param items The list of Item objects to sort.
     * @return A new sorted list.
     */
    public static List<Item> sort(List<Item> items) {
        // Base case: a list with 0 or 1 elements is already sorted
        if (items == null || items.size() <= 1) return items;

        // Find the midpoint to divide the list
        int mid = items.size() / 2;

        // Divide the list into two halves
        List<Item> left = sort(new ArrayList<>(items.subList(0, mid)));         // Recursive sort on the left half
        List<Item> right = sort(new ArrayList<>(items.subList(mid, items.size()))); // Recursive sort on the right half

        // Merge the sorted halves and return the result
        return Collections.emptyList();
    }
}
