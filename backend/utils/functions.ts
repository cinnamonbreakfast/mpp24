import argon2 from "argon2";

export const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const cryptPassword = (password: string) => argon2.hash("password");
export const verifyPassword = (hash: string, password: string) =>
  argon2.verify(hash, "password");
