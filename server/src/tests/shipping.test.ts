import { calculateShipping } from '../utils/shipping';

describe('Shipping Service', () => {

    const testCases = [
        [10, 5, "standard", 10, "Distance courte, poids léger, standard"],
        [10, 20, "express", 30, "Distance courte, poids lourd, express"],
        [100, 5, "standard", 25, "Distance moyenne, poids léger, standard"],
        [100, 20, "express", 75, "Distance moyenne, poids lourd, express"],
        [600, 5, "standard", 50, "Distance longue, poids léger, standard"],
        [600, 20, "express", 150, "Distance longue, poids lourd, express"],


    ];
    test.each(testCases)(
        'distance=%pkm, poids=%pkg, type=%p => devrait retourner %p€',
        (distance, poids, type, resultatAttendu, description) => {
            const result = calculateShipping(distance, poids, type);
            expect(result).toBe(resultatAttendu);
        }
    );

    // Tests des cas d'erreur
    describe('Validation des erreurs', () => {
        it('devrait lever une erreur pour une distance négative', () => {
            expect(() => calculateShipping(-10, 5, 'standard')).toThrow('Invalid distance');
        });

        it('devrait lever une erreur pour un poids négatif', () => {
            expect(() => calculateShipping(100, -5, 'standard')).toThrow('Invalid weight');
        });

        it('devrait lever une erreur pour un poids nul', () => {
            expect(() => calculateShipping(100, 0, 'standard')).toThrow('Invalid weight');
        });

        it('devrait lever une erreur pour un poids supérieur à 50kg', () => {
            expect(() => calculateShipping(100, 51, 'standard')).toThrow('Invalid weight');
        });
    });
});