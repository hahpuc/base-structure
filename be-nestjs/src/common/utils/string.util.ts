import bcrypt from 'bcrypt';

export async function hashPassword(plainText: string): Promise<string> {
  return await bcrypt.hash(plainText, 12);
}

export async function comparePassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, storedHash);
}

export function capitalizeText(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export enum ECharset {
  numbers = 'numbers',
  alphabetic = 'alphabetic',
  alphanumeric = 'alphanumeric',
}

export function generateCode(options: {
  length: number;
  charset: ECharset;
  prefix?: string | number;
  postfix?: string | number;
  isUpperCase?: boolean;
}) {
  const charsets = {
    numbers: '0123456789',
    alphabetic: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    alphanumeric:
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  };
  const charset = charsets[options.charset];
  let str = '';
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    str += charset.charAt(randomIndex);
  }
  str = (options?.prefix || '') + str + (options?.postfix || '');
  if (options?.isUpperCase) {
    str = str.toLocaleUpperCase();
  }
  return str;
}

export function stringReplacer<T>(template: string, replacer: T) {
  return template.replace(/%(\w+)?%/g, (_, $2) => replacer[$2]);
}

export function formatPrice(value: number | string): string {
  return new Intl.NumberFormat('vi-VN').format(+value) + 'đ';
}

export function normalizePhone(phone: string): string {
  if (!phone) return phone;

  if (phone.startsWith('0')) {
    phone = phone.replace(/^0/, '84');
  } else if (phone.startsWith('+84')) {
    phone = phone.replace(/^\+84/, '84');
  }

  return phone;
}

export function insertNewlinesAfterWords(
  input: string,
  wordInterval: number,
): string {
  const words = input.split(' ');
  for (let i = wordInterval; i < words.length; i += wordInterval + 1) {
    words.splice(i, 0, '\n');
  }
  return words.join(' ');
}
