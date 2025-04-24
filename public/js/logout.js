document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const adminPanelBtn = document.getElementById("adminPanelBtn");
  const loginBtn = document.getElementById("loginBtn"); // Bouton Connexion

  // Vérifie si l'utilisateur est connecté
  fetch("/api/users/login", { method: "GET" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      if (data !== undefined) {
        if (data.loggedIn) {
          logoutBtn.classList.remove("hidden"); // Affiche le bouton de déconnexion
          if (data.user.isAdmin) {
            adminPanelBtn.classList.remove("hidden"); // Affiche le bouton Admin Panel si admin
          }
        }
      }else {
        loginBtn.classList.remove("hidden"); // Affiche le bouton Connexion si non connecté
      }
    })
    .catch((err) => console.error("Erreur lors de la vérification de connexion:", err));

  // Déconnexion
  logoutBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/users/logout", { method: "POST" });
      if (response.ok) {
        alert("Déconnexion réussie.");
        window.location.href = "/"; // Redirige vers la page d'accueil
      } else {
        alert("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  });
});