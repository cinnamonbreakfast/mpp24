import { User } from "../domain/User";
import DBDuplicateException from "../exception/DBDuplicateException";
import DBNotFoundException from "../exception/DBNotFoundException";
import { cryptPassword, verifyPassword } from "../utils/functions";
import pool from "./";

export const createUser = async (user: User) => {
  try {
    const passw = await cryptPassword(user.secretCode as string);
    console.log(passw);
    const res = await pool.query(
      "INSERT INTO users (id, username, full_name, secret_code) VALUES ($1, $2, $3, $4)",
      [user.id, user.username, user.fullName, passw]
    );
    console.log(`Added a user with the name ${user.fullName}`);
  } catch (e: any) {
    if (e.code === "23505") throw DBDuplicateException.of(e.detail, 400);
    throw e;
  }
};

export const getUserById = async (id: string) => {
  const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (res.rows.length === 0)
    throw DBNotFoundException.of("User not found!", 404);

  const record = res.rows[0];
  return {
    id: record.id,
    username: record.username,
    fullName: record.full_name,
  } as User;
};

export const authUser = async (username: string, secretCode: string) => {
  const pass = await cryptPassword(secretCode);
  console.log(pass);
  const res = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (res.rows.length === 0)
    throw DBNotFoundException.of("User not found!", 404);

  const record = res.rows[0];
  if (!(await verifyPassword(record.secret_code, secretCode))) return;
  return {
    id: record.id,
    username: record.username,
    fullName: record.full_name,
  } as User;
};
