package com.example.message_feed.service;

import com.example.message_feed.model.MessageEntry;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class MessageService {

    private final ConcurrentHashMap<UUID, MessageEntry> store = new ConcurrentHashMap<>();

    public MessageEntry save(MessageEntry entry) {
        store.put(UUID.randomUUID(), entry);
        return entry;
    }

    public List<MessageEntry> lastMessages() {
        return store.values().stream()
                .sorted((a, b) -> Long.compare(b.getTimestamp(), a.getTimestamp()))
                .limit(10)
                .collect(Collectors.toList());
    }
}
