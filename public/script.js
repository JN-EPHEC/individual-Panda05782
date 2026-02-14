// public/script.js
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        userList.innerHTML = ''; 
        data.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${user.prenom} ${user.nom}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Supprimer</button>
            `;
            userList.appendChild(li);
        });
    } catch (e) { console.error("Erreur chargement:", e); }
}

if (userForm) {
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;

        await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom })
        });

        userForm.reset();
        loadUsers(); // Rafraîchissement sans recharger la page !
    });
}

window.deleteUser = async (id) => {
    if(confirm("Supprimer cet étudiant ?")) {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        loadUsers();
    }
}

loadUsers();