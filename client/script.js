let auth0 = null;

const config = {
  domain: "dev-nckl6bnzvs1rz24i.us.auth0.com",
  clientId: "mZfYtCA8XudEP5ZvPbF0jA6NLXEZnjUh",
  audience: "https://message-feed-api"
};

const API_BASE = "http://localhost:8080/api/messages";

window.onload = async () => {
  console.log("Iniciando Auth0...");

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience,
    cacheLocation: "localstorage",   // ← IMPORTANTE
    useRefreshTokens: true           // ← IMPORTANTE
  });

  // Procesar callback después de login
  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  const isAuthenticated = await auth0.isAuthenticated();
  console.log("¿Autenticado?:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("Usuario NO autenticado → redirigiendo a login...");
    return login();
  }

  console.log("Usuario autenticado ✔");

  await loadMessages();
};


// Obtener token
async function getToken() {
  try {
    return await auth0.getTokenSilently();
  } catch (e) {
    console.warn("Token no disponible, redirigiendo a login…");
    return login();
  }
}


// Enviar mensaje
document.getElementById("sendButton").addEventListener("click", async () => {
  const message = document.getElementById("messageInput").value;
  if (!message.trim()) return;

  const token = await getToken();

  await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  document.getElementById("messageInput").value = "";
  await loadMessages();
});


// Cargar mensajes
async function loadMessages() {
  const token = await getToken();

  const res = await fetch(API_BASE, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  const messages = await res.json();

  const list = document.getElementById("messagesList");
  list.innerHTML = "";

  messages.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `[${new Date(m.timestamp).toLocaleString()}] ${m.clientIp}: ${m.message}`;
    list.appendChild(li);
  });
}


// Login / Logout
function login() {
  return auth0.loginWithRedirect({
    redirect_uri: window.location.origin + "/client/index.html"
  });
}

function logout() {
  auth0.logout({
    returnTo: window.location.origin + "/client/index.html"
  });
}
