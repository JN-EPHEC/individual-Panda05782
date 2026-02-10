import express, { Request, Response } from 'express';
const app = express();
const port: number = 3000; // Typage explicite du port

// Route GET sur la racine /
// Défi typage relevé : on précise que 'req' est de type Request et 'res' de type Response
app.get('/', (req: Request, res: Response) => {
    res.send("Bienvenue sur mon serveur API");
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});