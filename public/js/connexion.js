document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;

    if (!email || !password) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    const data = {
        email: email,
        passwordHash: CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64),
    };

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Connexion réussie :', result); // Ajout du console.log
            alert('Connexion réussie !');
            window.location.href = '/';
        } else {
            const error = await response.json();
            console.log('Erreur lors de la connexion :', error); // Ajout du console.log
            alert(`Erreur: ${error.message}`);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la connexion.');
    }
});