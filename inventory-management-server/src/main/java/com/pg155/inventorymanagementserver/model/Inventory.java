package com.pg155.inventorymanagementserver.model;

public class Inventory extends BaseModel {

    private String itemId;
    private int stockLevel;
    private String warehouse;
    private String block;

    public Inventory() {}

    public Inventory(String id, String itemId, int stockLevel, String warehouse, String block) {
        super(id);
        this.itemId = itemId;
        this.stockLevel = stockLevel;
        this.warehouse = warehouse;
        this.block = block;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public int getStockLevel() {
        return stockLevel;
    }

    public void setStockLevel(int stockLevel) {
        this.stockLevel = stockLevel;
    }

    public String getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(String warehouse) {
        this.warehouse = warehouse;
    }

    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    @Override
    public String toString() {
        return "Inventory{" +
                "itemId='" + itemId + '\'' +
                ", stockLevel=" + stockLevel +
                ", warehouse='" + warehouse + '\'' +
                ", block='" + block + '\'' +
                ", id='" + id + '\'' +
                '}';
    }
}
