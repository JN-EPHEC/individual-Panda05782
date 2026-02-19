import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    const status = 500;

    const message = err.message || 'Une erreur est survenue';

    res.status(status).json({ error: message });
    next();
};
