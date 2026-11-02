export function validarFechaFuncion(
  fecha: unknown,
  horario: unknown,
  ahora: Date = new Date() 

): { ok: true } | { ok: false; mensaje: string } {
  //  Formato básico
  if (typeof fecha !== 'string' || fecha.trim() === '') {
    return { ok: false, mensaje: 'La fecha es obligatoria' };
  }
  if (typeof horario !== 'string' || !/^\d{2}:\d{2}$/.test(horario)) {
    return { ok: false, mensaje: 'El horario debe tener formato HH:MM' };
  }

  // Parseo controlado (evita que "2026-13-45" se convierta en algo raro)
  const fechaString = fecha.split('T')[0]; // por si viene ISO completo
  const fechaHora = new Date(`${fechaString}T${horario}:00`);

  if (Number.isNaN(fechaHora.getTime())) {
    return { ok: false, mensaje: `La fecha "${fecha}" no es válida` };
  }

  // Rechazar fechas "normalizadas" por JS (ej: 2026-02-30 → 2026-03-02)
  const [anio, mes, dia] = fechaString.split('-').map(Number);
  const [hh, mm] = horario.split(':').map(Number);
  if (
    fechaHora.getFullYear() !== anio ||
    fechaHora.getMonth() + 1 !== mes ||
    fechaHora.getDate() !== dia ||
    fechaHora.getHours() !== hh ||
    fechaHora.getMinutes() !== mm
  ) {
    return {
      ok: false,
      mensaje: `La fecha "${fecha} ${horario}" no existe en el calendario`,
    };
  }

  // No permitir fechas pasadas
  if (fechaHora.getTime() < ahora.getTime()) {
    return { ok: false, mensaje: 'No se puede cargar una función en el pasado' };
  }

  // Rango razonable (ej: no más de 2 años a futuro)
  const dosAnios = 1000 * 60 * 60 * 24 * 365 * 2;
  if (fechaHora.getTime() - ahora.getTime() > dosAnios) {
    return { ok: false, mensaje: 'La fecha está demasiado lejos en el futuro' };
  }

  return { ok: true };
}