import { Router, Request, Response } from 'express';
import User from '../models/User'; // Import du modèle pour parler à la DB

const router = Router();

// --- 1. GET ALL USERS ---
router.get('/users', async (req: Request, res: Response) => {
  try {
    // findAll() génère un "SELECT * FROM users" en SQL
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// --- 2. CREATE USER (POST) ---
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { nom, prenom } = req.body; 

    if (!nom || !prenom) {
      return res.status(400).json({ error: 'Nom et prenom requis' });
    }

    // create() génère un "INSERT INTO users..."
    const newUser = await User.create({ nom, prenom });
    res.status(201).json(newUser);
  } catch (error) {
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
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

export default router;
/*import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();


//route pour récupérer tous les utilisateurs

router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

//route pour créer un nouvel utilisateur(POST)

router.post('/users', async (req: Request, res: Response) => {
  try {
    const { nom, prenom } = req.body; 

    if (!nom || !prenom) {
      return res.status(400).json({ error: 'nom et prenom sont requis' });
    }

    const newUser = await User.create({ nom, prenom });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


//route pour supprimer un utilisateur par son ID

router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    const deletedCount = await User.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(204).send(); // pas de contenu, juste "OK"
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
*/