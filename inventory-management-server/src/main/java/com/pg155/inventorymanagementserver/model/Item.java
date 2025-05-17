package com.pg155.inventorymanagementserver.model;

import java.time.LocalDate;

public class Item extends BaseModel {

    protected String name;
    protected String category;
    protected LocalDate expiryDate;
    protected double price;

    public Item() {
    }

    public Item(String id, String name, String category, LocalDate expiryDate, double price) {
        super(id);
        this.name = name;
        this.category = category;
        this.expiryDate = expiryDate;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Item{" +
                "name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", expiryDate=" + expiryDate +
                ", price=" + price +
                ", id='" + id + '\'' +
                '}';
    }
}