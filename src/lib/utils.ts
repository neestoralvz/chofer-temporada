import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utilidades para cálculos laborales
export const SALARIOS_MINIMOS = {
  GENERAL: 278.80,
  ZLFN: 419.88
}

export const UMA_2025 = 108.57

export const CUOTAS_IMSS = {
  ENFERMEDAD_MATERNIDAD_FIJA: 0.204,
  ENFERMEDAD_MATERNIDAD_EXCEDENTE: 0.011,
  PRESTACIONES_DINERO: 0.01425,
  GASTOS_MEDICOS_PENSIONADOS: 0.0095,
  INVALIDEZ_VIDA: 0.02375,
  RETIRO: 0.02,
  CESANTIA_VEJEZ_MIN: 0.04275,
  CESANTIA_VEJEZ_MAX: 0.13,
  RIESGOS_TRABAJO_MIN: 0.005,
  RIESGOS_TRABAJO_MAX: 0.15,
  GUARDERIAS: 0.01,
  INFONAVIT: 0.05
}

export function calcularCostosLaborales(
  salarioDiario: number,
  diasTrabajados: number,
  modalidad: 'indefinido' | 'determinado' | 'discontinuo'
) {
  const salarioMensual = salarioDiario * 30
  const salarioAnual = salarioDiario * diasTrabajados
  
  // Cálculo base de IMSS (simplificado)
  const cuotasIMSS = salarioAnual * 0.3275 // Aproximado total cuotas patronales
  const infonavit = salarioAnual * CUOTAS_IMSS.INFONAVIT
  
  // Prestaciones
  let aguinaldo = (salarioDiario * 15) * (diasTrabajados / 365)
  let vacaciones = Math.floor(diasTrabajados / 365) * 6 * salarioDiario
  let primaVacacional = vacaciones * 0.25
  
  const totalPrestaciones = aguinaldo + vacaciones + primaVacacional
  const totalAnual = salarioAnual + cuotasIMSS + infonavit + totalPrestaciones
  
  return {
    salarioAnual,
    cuotasIMSS,
    infonavit,
    aguinaldo,
    vacaciones,
    primaVacacional,
    totalPrestaciones,
    totalAnual,
    porcentajePrestaciones: (totalPrestaciones / salarioAnual) * 100
  }
}

export function compararModalidades(
  salarioDiario: number,
  diasIndefinido: number = 365,
  diasDeterminado: number = 365,
  diasDiscontinuo: number = 180
) {
  return {
    indefinido: calcularCostosLaborales(salarioDiario, diasIndefinido, 'indefinido'),
    determinado: calcularCostosLaborales(salarioDiario, diasDeterminado, 'determinado'),
    discontinuo: calcularCostosLaborales(salarioDiario, diasDiscontinuo, 'discontinuo')
  }
}