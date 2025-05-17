package com.pg155.inventorymanagementserver.model;

import java.time.LocalDate;

public class DeletedItem extends Item {

    private LocalDate deletedAt;
    private String reason;

    public DeletedItem(Item item, LocalDate deletedAt, String reason) {
        super(item.getId(), item.getName(), item.getCategory(), item.getExpiryDate(), item.getPrice());
        this.deletedAt = deletedAt;
        this.reason = reason;
    }

    public LocalDate getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    @Override
    public String toString() {
        return "DeletedItem{" +
                "deletedAt=" + deletedAt +
                ", reason='" + reason + '\'' +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", expiryDate=" + expiryDate +
                ", price=" + price +
                ", id='" + id + '\'' +
                '}';
    }
}
