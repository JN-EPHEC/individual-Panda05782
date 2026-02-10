import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];

// On définit la route. 
// Note : on met '/users' ici car le préfixe '/api' sera ajouté dans server.ts
router.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

export default router;