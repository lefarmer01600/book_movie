document.getElementById('submitRegister').addEventListener('click', async () => {
    const form = document.getElementById('registerForm');
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        passwordHash: formData.get('password'),
    };

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Inscription réussie !');
            form.reset();
        } else {
            const error = await response.json();
            alert(`Erreur: ${error.message}`);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'inscription.');
    }
});