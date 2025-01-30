import request from 'supertest';
import app from '../../src/app';// ou le chemin vers ton fichier app.ts
import { JeuDeDes } from "../../src/core/jeuDeDes"; // ou le bon chemin vers la classe JeuDeDes

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  let agent: request.SuperTest<request.Test>;

  // beforeAll pour préparer deux joueurs avant les tests
  beforeAll(async () => {
    // Création de deux joueurs
    await request(app).post('/api/v1/jeu/demarrerJeu').send({ nom: 'Pierre' });
    await request(app).post('/api/v1/jeu/demarrerJeu').send({ nom: 'Marie' });
  });

  // Test du scénario principal (succès)
  it('should restart the game and return status 200', async () => {
    const response = await request(app).get('/api/v1/jeu/redemarrerJeu');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      message: 'Game restarted successfully',
    }));
  });

  // Test de la postcondition du contrat d’opération : vérifier qu’il n’y a plus de joueurs
  it('should have no players after restarting the game', async () => {
    // Appel à la route pour redémarrer le jeu
    await request(app).get('/api/v1/jeu/redemarrerJeu');

    // Vérifier qu’il n’y a plus de joueurs
    const response = await request(app).get('/api/v1/jeu/joueurs');
    expect(response.status).toBe(200);
    expect(response.body.joueurs).toHaveLength(0);
  });
});
