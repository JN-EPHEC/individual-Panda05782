import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// mon GET
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    console.log('Users récupérés:', users); // DEBUG
    res.json(users);
  } catch (error) {
    console.error('Erreur GET /users:', error); // DEBUG
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// mon CREATE and Post
router.post('/users', async (req: Request, res: Response) => {
  try {
    const { nom, prenom, matricule } = req.body;
    console.log('Données reçues:', { nom, prenom, matricule }); // DEBUG

    if (!nom || !prenom || !matricule) {
      return res.status(400).json({ error: 'Nom, prenom et matricule requis' });
    }

    // et mon INSERT INTO
    const newUser = await User.create({ nom, prenom, matricule });
    console.log('Utilisateur créé:', newUser); // DEBUG
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur POST /users:', error); // DEBUG
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
});

// mon DELETE
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deletedCount = await User.destroy({ where: { id: id } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Erreur DELETE /users:', error); // DEBUG
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// mon UPDATE pr les présences
router.patch('/users/:id/presence', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { present } = req.body;

    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    await user.update({ present });
    res.json(user);
  } catch (error) {
    console.error('Erreur PATCH /users/:id/presence:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

export default router;