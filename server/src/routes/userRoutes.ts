import { Router, type Request, type Response, type NextFunction } from 'express';
import User from '../models/User'; // Import du modèle pour parler à la DB
import * as userController from "../controllers/userController";
import { checkIdParam } from "../middlewares/validateId";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste de tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   prenom:
 *                     type: string
 *       500:
 *         description: Erreur serveur
 */
router.get("/users", userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/users/:id", checkIdParam, userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Dupont
 *               prenom:
 *                 type: string
 *                 example: Jean
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *       400:
 *         description: Données manquantes ou invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/users', userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Met à jour un utilisateur existant
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Martin
 *               prenom:
 *                 type: string
 *                 example: Sophie
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/users/:id', checkIdParam, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/users/:id', checkIdParam, userController.deleteUser);

export default router;