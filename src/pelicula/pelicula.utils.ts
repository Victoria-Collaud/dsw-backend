import type { Request, Response, NextFunction } from 'express';

export function sanitizePeliculaInput(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  req.body.sanitizedInput = {
    TituloPelicula: req.body.TituloPelicula,
    Sinopsis: req.body.Sinopsis,
    Duracion: req.body.Duracion,
    Clasificacion: req.body.Clasificacion,
    CodGenero: req.body.CodGenero,
    Cartelera: req.body.Cartelera,
    Trailer: req.body.Trailer,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}