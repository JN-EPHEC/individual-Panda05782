import express, { Request, Response } from 'express';
import sequelize from './config/database';
import './models/User';
import userRouter from './routes/userRoutes';

const app = express();
const port: number = 3000;

// 1. Middlewares de configuration
// Permet à Express de lire le JSON envoyé par le client (req.body)
app.use(express.json());

// 2. Servir les fichiers statiques (Point 4.1 du TP)
// Cherche automatiquement index.html dans le dossier /public
app.use(express.static('public'));

// 3. Définition des routes API
// On préfixe toutes les routes du fichier userRouter par '/api'
app.use('/api', userRouter);

// 4. Authentification et Synchronisation avec la base de données
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données SQLite réussie.');
        // On synchronise les modèles (crée la table users si elle n'existe pas)
        return sequelize.sync({ force: false });
    })
    .then(() => {
        console.log('Synchronisation du modèle effectuée.');
        // 5. Lancement du serveur
        app.listen(port, () => {
            console.log(`Serveur lancé sur http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Erreur lors du démarrage du serveur :', error);
    });

/* Route GET sur la racine /
/ Défi typage relevé : on précise que 'req' est de type Request et 'res' de type Response
interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
}
/ Ton tableau de données typé
const etudiants: Etudiant[] = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];

/ La route GET /api/data
app.get('/api/data', (req: Request, res: Response) => {
    res.json(etudiants);
});

app.get('/', (req: Request, res: Response) => {
    res.send("Bienvenue sur mon serveur API");
});

/ Route avec paramètre dynamique (:name)
app.get('/api/hello/:name', (req: Request, res: Response) => {
    / 1. On récupère la valeur de ":name" depuis l'URL
    const nameFromUrl: string = req.params.name;

    / 2. On prépare la réponse JSON demandée
    res.json({
        message: `Bonjour ${nameFromUrl}`,
        timestamp: new Date().toISOString() // Génère la date précise au format ISO
    });
});
*/


/* partie synvrho qui marche
 SYNCHRONISATION : C'est ici que Sequelize crée les tables manquantes
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données SQLite établie.');
    })
    .catch((error) => {
        console.error('Erreur de connexion à la base de données SQLite:', error);
    });


sequelize.sync().then(() => {
    console.log('Synchronisation du modèle avec la base de données effectuée.');

    app.listen(port, () => {
        console.log(`Serveur lancé sur http://localhost:${port}`);
    });
});*/
