import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const time = now.getTime().toString().slice(-4);
  
  return `INV-${year}${month}${day}-${time}`;
}

export function calculateTax(amount: number, taxRate: number = 18): number {
  return (amount * taxRate) / 100;
}

export function validateNTN(ntn: string): boolean {
  // Remove any non-digit characters
  const cleaned = ntn.replace(/\D/g, '');
  
  // NTN should be 7 digits
  return cleaned.length === 7;
}

export function formatNTN(ntn: string): string {
  const cleaned = ntn.replace(/\D/g, '');
  return cleaned.substring(0, 7);
}

export function validateCNIC(cnic: string): boolean {
  // Remove any non-digit characters
  const cleaned = cnic.replace(/\D/g, '');
  
  // CNIC should be 13 digits
  return cleaned.length === 13;
}

export function formatCNIC(cnic: string): string {
  const cleaned = cnic.replace(/\D/g, '');
  if (cleaned.length >= 5) {
    return cleaned.replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3');
  }
  return cleaned;
}