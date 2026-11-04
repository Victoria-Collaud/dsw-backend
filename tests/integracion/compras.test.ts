import { describe, it, expect } from 'vitest';
import request from 'supertest';

//Apuntamos al servidor que ya está corriendo
const API_URL = 'http://localhost:3001';

describe('Integración - API de Compras', () => {

  it('debe devolver 404 si la ruta no existe', async () => {
    const response = await request(API_URL).get('/api/ruta-que-no-existe');
    expect(response.status).toBe(404);
  });

  it('debe devolver 401 si se intenta comprar sin token', async () => {
    const response = await request(API_URL)
      .post('/api/compras')
      .send({
        MetodoPago: 'TARJETA_CREDITO',
        CantEntradas: 1,
        IdUsuario: 1,
        IdFuncion: 1,
      });

    expect(response.status).toBe(401);
  });

  it('debe devolver 401 al listar compras sin token', async () => {
    const response = await request(API_URL).get('/api/compras');
    expect(response.status).toBe(401);
  });
});