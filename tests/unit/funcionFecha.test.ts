import { describe, it, expect } from 'vitest';
import { validarFechaFuncion } from '../../src/funcion/funcion.utils';

const AHORA = new Date('2025-01-01T00:00:00');

describe('validarFechaFuncion', () => {
  it('rechaza fecha ausente', () => {
    const r = validarFechaFuncion(undefined, '20:00', AHORA);
    expect(r.ok).toBe(false);
  });

  it('rechaza horario mal formado', () => {
    const r = validarFechaFuncion('2026-12-25', '9:5', AHORA);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.mensaje).toMatch(/HH:MM/);
  });

  it('rechaza fecha inexistente (30 de febrero)', () => {
    const r = validarFechaFuncion('2026-02-30', '20:00', AHORA);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.mensaje).toMatch(/no existe en el calendario/);
  });

  it('rechaza fechas en el pasado', () => {
    const r = validarFechaFuncion('2020-01-01', '20:00', AHORA);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.mensaje).toMatch(/pasado/);
  });

  it('rechaza fechas demasiado lejanas', () => {
    const r = validarFechaFuncion('2099-01-01', '20:00', AHORA);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.mensaje).toMatch(/lejos/);
  });

  it('acepta fecha y horario válidos', () => {
    const r = validarFechaFuncion('2026-12-25', '20:00', AHORA);
    expect(r.ok).toBe(true);
  });
});