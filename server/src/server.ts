import express, { type Request, type Response } from 'express';
import { requestLogger } from './middlewares/logger';
import sequelize from './config/database';
import './models/User';
import userRouter from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import cors from 'cors';


const app = express();
const port: number = 3000;

app.use(cors()); // Autorise tout le monde (acceptable uniquement en dev)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use(express.static('public'));

app.use(requestLogger);

app.use('/api', userRouter);

app.use(errorHandler);

// Authentification et Synchronisation
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données SQLite réussie.');
        // On synchronise les modèles (crée la table users si elle n'existe pas)
        return sequelize.sync({ force: false });
    })
    .then(() => {
        console.log('Synchronisation du modèle effectuée.');
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
