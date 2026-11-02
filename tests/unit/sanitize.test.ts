import { describe, it, expect, vi } from 'vitest';
import { sanitizePeliculaInput } from '../../src/pelicula/pelicula.utils';

describe('Sanitize Inputs - Tests Unitarios', () => {
  
  // TEST 1: sanitizePeliculaInput debe eliminar campos undefined

  it('debe eliminar los campos undefined del body de una película', () => {
    // Preparamos un req con campos undefined
    const req = {
      body: {
        TituloPelicula: 'Shrek',
        Sinopsis: undefined,     
        Duracion: 120,
        Clasificacion: 'ATP',
        CodGenero: 1,
        Cartelera: undefined,   
        Trailer: 'https://...',
      },
    } as any;

    const res = {} as any;
    const next = vi.fn(); // Simulamos la función next de Express

    // Ejecutamos la función
    sanitizePeliculaInput(req, res, next);

    // Verificamos que los undefined se hayan eliminado
    expect(req.body.sanitizedInput).toEqual({
      TituloPelicula: 'Shrek',
      Duracion: 120,
      Clasificacion: 'ATP',
      CodGenero: 1,
      Trailer: 'https://...',
    });

    // 4. Verificamos que se llamó a next()
    expect(next).toHaveBeenCalledTimes(1);
  });

  // TEST 2: sanitizePeliculaInput debe mantener los campos válidos
  it('debe mantener los campos válidos sin modificarlos', () => {
    const req = {
      body: {
        TituloPelicula: 'Matrix',
        Sinopsis: 'Un hacker descubre la verdad',
        Duracion: 136,
        Clasificacion: 'R',
        CodGenero: 2,
        Cartelera: 'https://cartelera.jpg',
        Trailer: 'https://trailer.mp4',
      },
    } as any;

    const res = {} as any;
    const next = vi.fn();

    sanitizePeliculaInput(req, res, next);

    // Verificamos que todos los campos se conserven
    expect(req.body.sanitizedInput).toEqual({
      TituloPelicula: 'Matrix',
      Sinopsis: 'Un hacker descubre la verdad',
      Duracion: 136,
      Clasificacion: 'R',
      CodGenero: 2,
      Cartelera: 'https://cartelera.jpg',
      Trailer: 'https://trailer.mp4',
    });

    expect(next).toHaveBeenCalled();
  });
});