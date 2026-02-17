// public/script.js
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

let usersData = [];
let currentSort = { column: null, ascending: true };

async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        
        if (!response.ok) { //debug
            console.error('Erreur HTTP:', response.status);
            return;
        }
        
        const data = await response.json();
        console.log('Données reçues:', data); // debug
        
        if (!Array.isArray(data)) {
            console.error('Les données ne sont pas un tableau:', data);
            return;
        }
        
        usersData = data;
        displayUsers(usersData);
    } catch (e) { 
        console.error("Erreur chargement:", e); 
    }
}

function displayUsers(users) {
    let html = '';
    for (const user of users) {
        html += `
        <tr>
            <td>${user.nom}</td>
            <td>${user.prenom}</td>
            <td>${user.matricule}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Supprimer</button>
            </td>
        </tr>
        `;
    }
    userList.innerHTML = html;
}

function sortTable(column) {
    // Si on clique sur la même colonne, on inverse l'ordre
    if (currentSort.column === column) {
        currentSort.ascending = !currentSort.ascending;
    } else {
        currentSort.column = column;
        currentSort.ascending = true;
    }

    const sortedUsers = [...usersData].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        // tri pr matricule
        if (column === 'matricule') {
            valA = Number(valA);
            valB = Number(valB);
            if (currentSort.ascending) {
                return valA - valB;
            } else {
                return valB - valA;
            }
        }

        //tri nom et prenom
        if (valA < valB) {
            if (currentSort.ascending) {
                return -1;
            } else {
                return 1;
            }
        }
        if (valA > valB) {
            if (currentSort.ascending) {
                return 1;
            } else {
                return -1;
            }
        }
        return 0;
    });

    displayUsers(sortedUsers);
}

window.sortTable = sortTable;

if (userForm) {
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const matricule = document.getElementById('matricule').value;

        await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom, matricule })
        });

        userForm.reset();
        loadUsers(); // Rafraîchissement
    });
}

window.deleteUser = async (id) => {
    if(confirm("Supprimer cet étudiant ?")) {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        loadUsers();
    }
}

loadUsers();