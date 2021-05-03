import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password) => {
  return hash(password, 12);
};

export const verifyPassword = async (password, hashedPassword) => {
  return compare(password, hashedPassword);
};
