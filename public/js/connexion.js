document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = event.target[0].value;
  const password = event.target[1].value;

  if (!email || !password) {
    showPopup("Veuillez remplir tous les champs.", "error");
    return;
  }

  const data = {
    email: email,
    password: CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64),
  };

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      showPopup("Connexion réussie !", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      const error = await response.json();
      console.log("Erreur lors de la connexion :", error);
      showPopup(`Erreur: ${error.message}`, "error");
    }
  } catch (error) {
    console.error("Erreur:", error);
    showPopup("Erreur lors de la connexion.", "error");
  }
});