/**
 * Genera los asientos de una sala a partir de su capacidad.
 * @param capacidad - Capacidad total de la sala (ej: 40)
 * @returns Array de asientos (ej: ["A1", "A2", ..., "E8"])
 */
export function generarAsientos(capacidad: number): string[] {
  // Definimos la cantidad de columnas según la capacidad (misma lógica que en el frontend)
  let columnas = 8; // Default
  if (capacidad === 24) columnas = 6;
  if (capacidad === 40) columnas = 8;
  if (capacidad === 64) columnas = 8;
  if (capacidad === 100) columnas = 10;
  if (capacidad === 150) columnas = 15;

  const filas = Math.ceil(capacidad / columnas);
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const asientos: string[] = [];
  for (let i = 0; i < filas; i++) {
    const letraFila = letras[i];
    // Si es la última fila y no se completa, ajustamos las columnas
    const columnasFila = (i === filas - 1) 
      ? capacidad - (i * columnas) 
      : columnas;
    
    for (let j = 1; j <= columnasFila; j++) {
      asientos.push(`${letraFila}${j}`);
    }
  }
  return asientos;
}