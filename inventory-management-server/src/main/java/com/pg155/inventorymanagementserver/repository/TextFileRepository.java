package com.pg155.inventorymanagementserver.repository;

import com.pg155.inventorymanagementserver.model.BaseModel;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

/**
 * An abstract repository that stores entities of type T in a text file.
 * Each entity is serialized into a line using a delimiter.
 *
 * @param <T> The entity type that extends BaseModel (must have getId/setId).
 */
public abstract class TextFileRepository<T extends BaseModel> {

    // The file where entities are stored
    private final File file;

    // Delimiter used for serializing and deserializing entity fields
    protected static final String DELIMITER = "\\|";

    /**
     * Converts an entity to a single line of text (to be stored in the file).
     */
    protected abstract String toLine(T entity);

    /**
     * Converts a line of text from the file back into an entity.
     */
    protected abstract T fromLine(String line);

    /**
     * Constructor that sets up the file to be used for storing entities.
     * Creates the file and its parent directories if they do not exist.
     *
     * @param filename the name of the file (relative to 'db-files/' directory)
     */
    protected TextFileRepository(String filename) {
        this.file = new File("db-files/" + filename);
        file.getParentFile().mkdirs(); // Create parent directories if needed

        try {
            file.createNewFile(); // Create file if it doesn't exist
        } catch (IOException e) {
            throw new RuntimeException("Could not create file: " + filename, e);
        }
    }

    /**
     * Retrieves all entities from the file.
     *
     * @return a list of all entities
     */
    public List<T> getAll() {
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            return reader.lines()
                    .map(this::fromLine)
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException("Failed to read entities", e);
        }
    }
    
    /**
     * Adds a new entity to the file, assigning it a unique UUID as its ID.
     *
     * @param entity the entity to add
     * @return the added entity with an assigned ID
     */
    public T add(T entity) {
        if(entity.getId() == null) {
            entity.setId(UUID.randomUUID().toString());
        }

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file, true))) {
            writer.write(toLine(entity));
            writer.newLine();
        } catch (IOException e) {
            throw new RuntimeException("Failed to write entity", e);
        }

        return entity;
    }
}

