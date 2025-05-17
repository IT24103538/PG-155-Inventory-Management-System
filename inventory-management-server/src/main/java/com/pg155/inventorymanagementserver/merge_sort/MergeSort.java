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
        return merge(left, right);
    }

    /**
     * Merges two sorted lists into one, sorted by expiryDate.
     *
     * @param left  The first sorted sublist.
     * @param right The second sorted sublist.
     * @return A merged and sorted list.
     */
    private static List<Item> merge(List<Item> left, List<Item> right) {
        List<Item> result = new ArrayList<>();
        int i = 0, j = 0;

        // While there are elements in both lists, compare and pick the earlier expiryDate
        while (i < left.size() && j < right.size()) {
            LocalDate leftDate = left.get(i).getExpiryDate();
            LocalDate rightDate = right.get(j).getExpiryDate();

            // Add the item with the earlier (or equal) expiryDate
            if (leftDate.isBefore(rightDate) || leftDate.isEqual(rightDate)) {
                result.add(left.get(i++));
            } else {
                result.add(right.get(j++));
            }
        }

        // Add remaining elements from the left list, if any
        while (i < left.size()) {
            result.add(left.get(i++));
        }

        // Add remaining elements from the right list, if any
        while (j < right.size()) {
            result.add(right.get(j++));
        }

        // The result list is now sorted by expiryDate
        return result;
    }
}
