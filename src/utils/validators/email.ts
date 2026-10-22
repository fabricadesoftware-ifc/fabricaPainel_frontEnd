// Formato mínimo de e-mail: algo@dominio.ext, sem espaços.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const EMAIL_REQUIRED_MESSAGE =
  'Digite o e-mail cadastrado (ex.: nome@dominio.com), não o nome de usuário ou a matrícula.'

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim())
}
