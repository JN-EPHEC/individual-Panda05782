import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/config/database.sqlite' // Le fichier se créera ici
});

// test connexion dans la console
sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données SQLite établie.'))
  .catch(err => console.error('Erreur de connexion :', err));

export default sequelize; // TRÈS IMPORTANT pour la suite, mais pq à chercher? => réponse de AI: Parce que c'est la même instance de Sequelize qui doit être utilisée partout (modèles, server, etc.) pour éviter les problèmes de connexion et de synchronisation.