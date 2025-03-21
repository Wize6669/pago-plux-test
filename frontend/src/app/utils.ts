import CryptoJS from 'crypto-js';
import { environment } from '../environments/environment';

export function encryptData(data: any): string {
  const stringData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringData, environment.secretKey).toString();
}

export function decryptData(encryptedData: string): any {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, environment.secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Error al descifrar los datos:', error);
    return null;
  }
}

export function setSecureLocalStorage(key: string, value: any) {
  const encryptedValue = encryptData(value);
  localStorage.setItem(key, encryptedValue);
}

export function getSecureLocalStorage(key: string): any {
  const encryptedValue = localStorage.getItem(key);
  return encryptedValue ? decryptData(encryptedValue) : null;
}

export function removeSecureLocalStorage(key: string) {
  localStorage.removeItem(key);
}

function processErrors(error: any): string {
  if (typeof error === 'string') return error;

  const errorMessage = error?.error?.message || error?.message;

  if (Array.isArray(error?.errors)) {
    return (
      error.errors.map((err: { message: string }) => err.message).join(', ') ||
      'Error de formato desconocido'
    );
  }

  return errorMessage || 'Error inesperado, comuníquese con soporte técnico';
}

function processErrorsForm(errorResponse: any) {
  const errors: { [key: string]: string } = {};

  if (errorResponse.errors) {
    errorResponse.errors.forEach((error: { message: string; path: string }) => {
      errors[error.path] = error.message;
    });
  } else if (errorResponse.error) {
    if (typeof errorResponse.error === 'string') {
      errors['general'] = errorResponse.error;
    } else if (errorResponse.error.message) {
      errors[errorResponse.error.path || 'general'] =
        errorResponse.error.message;
    } else {
      errors['general'] = 'Error inesperado, comuníquese con soporte técnico';
    }
  } else {
    errors['general'] = 'Error inesperado, comuníquese con soporte técnico';
  }

  return errors;
}

export { processErrors, processErrorsForm };
