package com.pg155.inventorymanagementserver.model;

public abstract class BaseModel {
    protected String id;

    public BaseModel() {}

    public BaseModel(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}