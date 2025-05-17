package com.pg155.inventorymanagementserver.model;


import java.time.LocalDate;

public class Transaction extends BaseModel {

    private String itemId;
    private String type;
    private int quantity;
    private LocalDate date;

    public Transaction() {}

    public Transaction(String id, String itemId, String type, int quantity, LocalDate date) {
        super(id);
        this.itemId = itemId;
        this.type = type;
        this.quantity = quantity;
        this.date = date;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "itemId='" + itemId + '\'' +
                ", type='" + type + '\'' +
                ", quantity=" + quantity +
                ", timestamp=" + date +
                ", id='" + id + '\'' +
                '}';
    }
}
