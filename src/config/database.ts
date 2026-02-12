import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/config/database.sqlite' // Le fichier se créera ici
});

// On teste la connexion dans la console
sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données SQLite réussie.'))
  .catch(err => console.error('Erreur de connexion :', err));

export default sequelize; // TRÈS IMPORTANT pour la suite