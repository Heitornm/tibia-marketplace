import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário para mesclar classes CSS do Tailwind de forma inteligente.
 * Resolve conflitos de classes (ex: 'p-2 p-4' vira apenas 'p-4').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata valores numéricos para o padrão de moeda do jogo (Gold/GP).
 * Ex: 10000 -> 10.000 GP
 */
export function formatGP(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value) + " GP";
}

/**
 * Formata datas para o padrão brasileiro de ofertas.
 */
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}