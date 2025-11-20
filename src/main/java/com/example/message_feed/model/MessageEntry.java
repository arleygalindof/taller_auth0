package com.example.message_feed.model;

public class MessageEntry {
    private String message;
    private String clientIp;
    private long timestamp;

    public MessageEntry() {}

    public MessageEntry(String message, String clientIp, long timestamp) {
        this.message = message;
        this.clientIp = clientIp;
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public String getClientIp() {
        return clientIp;
    }
    public void setClientIp(String clientIp) {
        this.clientIp = clientIp;
    }

    public long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
