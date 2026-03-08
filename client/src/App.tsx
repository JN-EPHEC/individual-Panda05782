import { useEffect, useState } from "react";
import './App.css'

// Définition d'une interface pour le typage
// Correspond au modèle User du backend
interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  // 1. Définition de l'état
  const [data, setData] = useState<User[]>([]);
  
  // 2. Appel API au montage du composant
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, []);

  // 3. Rendu (JSX)
  return (
    <div className="container">
      <div className="main-card">
        <h1>Liste des étudiants</h1>
        
        <hr />
        
        <ul className="user-list">
          {data.map((user) => (
            <li key={user.id} className="user-item">
              <span className="user-name">{user.nom} {user.prenom}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;