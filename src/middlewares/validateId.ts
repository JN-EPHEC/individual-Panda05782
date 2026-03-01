import type { Request, Response, NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: 'ID manquant' });
    }

    const numericId = Number(id);
    if (Number.isNaN(numericId) || !Number.isInteger(numericId) || numericId <= 0) {
        return res.status(400).json({ error: 'ID invalide - doit être un nombre entier positif' });
    }

    next();
};
