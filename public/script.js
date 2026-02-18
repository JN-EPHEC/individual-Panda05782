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

async function presence(userId, currentStatus) {
    try {
        await fetch(`/api/users/${userId}/presence`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ present: !currentStatus })
        });
        loadUsers();
        stats();
    } catch (e) {
        console.error("Erreur toggle présence:", e);
    }
}

    async function stats() {
        try {
            const response = await fetch('/api/stats');
            
        if (!response.ok) {
            console.error('Erreur stats HTTP:', response.status);
            return;
        }
        
        const stats = await response.json();
        const container = document.getElementById('statsContainer');
        
        if (container) {
            container.innerHTML = `
                <strong>Statistiques :</strong> 
                Total: ${stats.total} étudiants | 
                Présents: ${stats.presents}
            `;
        }
    } catch (e) {
        console.error("Erreur stats UI", e);
    }
}

function displayUsers(users) {
    let html = '';
    for (const user of users) {
        let presenceClass;
        let presenceText;
        
        if (user.present) {
            presenceClass = 'btn-success';
            presenceText = 'Présent';
        } else {
            presenceClass = 'btn-secondary';
            presenceText = 'Absent';
        }
        
        html += `
            <tr>
                <td>${user.nom}</td>
                <td>${user.prenom}</td>
                <td>${user.matricule}</td>
                <td>
                    <button class="btn btn-sm ${presenceClass}" onclick="presence(${user.id}, ${user.present})">
                        ${presenceText}
                    </button>
                </td>
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
        loadUsers();//rafraichit
        stats();
    });
}

window.deleteUser = async (id) => {
    if(confirm("Supprimer cet étudiant ?")) {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        loadUsers();
    }
}

loadUsers();