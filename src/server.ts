import express, { Request, Response } from 'express';
import sequelize from './config/database';
import User from './models/User';
import userRouter from './routes/userRoutes';
import { StatsService } from './stat/stats';

const app = express();
const port: number = 3000;

app.use(express.json());

app.use(express.static('public'));

app.use('/api', userRouter);

app.get('/api/stats', async (req: Request, res: Response) => {
    try {
        const stats = await StatsService.getGlobalStats();
        console.log('Stats générées:', stats); // DEBUG
        res.json(stats);
    } catch (error) {
        console.error('Erreur stats:', error);
        res.status(500).json({ error: "Erreur stats" });
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données SQLite établie.');
    })
    .catch((error) => {
        console.error('Erreur de connexion à la base de données SQLite:', error);
    });

sequelize.sync({ force: false }).then(async () => {
    console.log('Synchronisation du modèle effectuée.');
    // au cas où si j'ai rien dans ma table je mets qd même qqch chose qui s'affiche
    const count = await User.count();
    if (count === 0) {
        await User.bulkCreate([
            { nom: 'Alpha', prenom: 'test', matricule: 'HE0000' }
        ]);
    }
    app.listen(port, () => {
        console.log(`Serveur lancé sur http://localhost:${port}`);
    });
});
/* Route GET sur la racine /
/ Défi typage relevé : on précise que 'req' est de type Request et 'res' de type Response
interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
}
/ tableau de données typé
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
    const nameFromUrl: string = req.params.name;

    res.json({
        message: `Bonjour ${nameFromUrl}`,
        timestamp: new Date().toISOString() // Génère la date précise au format ISO
    });
});
*/
