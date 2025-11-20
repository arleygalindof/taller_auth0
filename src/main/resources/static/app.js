async function sendMessage() {
    const message = document.getElementById("messageInput").value;

    if (!message.trim()) return;

    await fetch("/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    document.getElementById("messageInput").value = "";
    loadMessages();
}

async function loadMessages() {
    const res = await fetch("/api/messages");
    const messages = await res.json();

    const list = document.getElementById("messagesList");
    list.innerHTML = "";

    messages.forEach(m => {
        const li = document.createElement("li");
        li.textContent = `[${new Date(m.timestamp).toLocaleTimeString()}] ${m.clientIp}: ${m.message}`;
        list.appendChild(li);
    });
}

document.getElementById("sendBtn").addEventListener("click", sendMessage);

// cargar mensajes al abrir
loadMessages();
