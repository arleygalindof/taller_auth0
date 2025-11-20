package com.example.message_feed.controller;

import com.example.message_feed.model.MessageEntry;
import com.example.message_feed.service.MessageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService service;

    public MessageController(MessageService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<MessageEntry> addMessage(@RequestBody MessageEntry incoming, HttpServletRequest request) {

        String clientIp = request.getRemoteAddr();
        long timestamp = Instant.now().toEpochMilli();

        MessageEntry entry = new MessageEntry(
                incoming.getMessage(),
                clientIp,
                timestamp
        );

        service.save(entry);
        return ResponseEntity.ok(entry);
    }

    @GetMapping
    public ResponseEntity<List<MessageEntry>> getMessages() {
        return ResponseEntity.ok(service.lastMessages());
    }
}
