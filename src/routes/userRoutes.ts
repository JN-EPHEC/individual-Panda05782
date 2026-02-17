import { Router, Request, Response } from 'express';
import User from '../models/User'; // Import du modèle pour parler à la DB

const router = Router();

// --- 1. GET ALL USERS ---
router.get('/users', async (req: Request, res: Response) => {
  try {
    // findAll() génère un "SELECT * FROM users" en SQL
    const users = await User.findAll();
    console.log('Users récupérés:', users); // DEBUG
    res.json(users);
  } catch (error) {
    console.error('Erreur GET /users:', error); // DEBUG
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// --- 2. CREATE USER (POST) ---
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { nom, prenom, matricule } = req.body;
    console.log('Données reçues:', { nom, prenom, matricule }); // DEBUG

    if (!nom || !prenom || !matricule) {
      return res.status(400).json({ error: 'Nom, prenom et matricule requis' });
    }

    // create() génère un "INSERT INTO users..."
    const newUser = await User.create({ nom, prenom, matricule });
    console.log('Utilisateur créé:', newUser); // DEBUG
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur POST /users:', error); // DEBUG
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
});

// --- 3. DELETE USER BY ID ---
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // destroy() génère un "DELETE FROM users WHERE id = ..."
    const deletedCount = await User.destroy({ where: { id: id } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(204).send(); // Succès, mais pas de contenu à renvoyer
  } catch (error) {
    console.error('Erreur DELETE /users:', error); // DEBUG
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

export default router;