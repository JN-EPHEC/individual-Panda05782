// src/stats/statique.ts
import User from '../models/User';

export class StatsService {
    static async getGlobalStats() {
        const total = await User.count();
        const presents = await User.count({ where: { present: true } });

        return {
            total: total,
            presents: presents
        };
    }
}