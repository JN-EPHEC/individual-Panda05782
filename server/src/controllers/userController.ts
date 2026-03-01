import type { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// GET /users/:id - Récupère un utilisateur par son ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const user = await User.findByPk(id);

        if (!user) {
            const error: any = new Error('Utilisateur non trouvé');
            error.status = 404;
            return next(error);
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// POST /users - Crée un nouvel utilisateur
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nom, prenom } = req.body;

        if (!nom || !prenom) {
            const error: any = new Error('Nom et prenom requis');
            error.status = 400;
            return next(error);
        }

        const newUser = await User.create({ nom, prenom });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

// PUT /users/:id - Met à jour un utilisateur
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const { nom, prenom } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            const error: any = new Error('Utilisateur non trouvé');
            error.status = 404;
            return next(error);
        }

        // On met à jour uniquement les champs fournis
        if (nom !== undefined) user.set('nom', nom);
        if (prenom !== undefined) user.set('prenom', prenom);

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// DELETE /users/:id - Supprime un utilisateur
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const deletedCount = await User.destroy({ where: { id: id } });

        if (deletedCount === 0) {
            const error: any = new Error('Utilisateur non trouvé');
            error.status = 404;
            return next(error);
        }

        res.status(204).send(); // Succès, mais pas de contenu à renvoyer
    } catch (error) {
        next(error);
    }
};
