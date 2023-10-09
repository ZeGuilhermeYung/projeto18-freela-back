import db from "../database/db.js";

async function registerUser (name, email, password, phone, city) {
  try {
      const user = await db.query(
        `INSERT INTO users ("name", "email" , "password", "phone", "city") VALUES ( $1, $2, $3, $4, $5 )`,
        [name, email, password, phone, city]
      );
      return user;
  } catch (error) {
      return error;
  };
};

async function validateEmail (email) {
    try {
        const userEmail = await db.query(
          `SELECT * FROM users WHERE "email"=$1`,
          [email]
        );
        return userEmail.rowCount > 0;
    } catch (error) {
        return null;
    };
};

async function validateUserRegister (email, password) {
    try {
        const userInfo = await db.query(
          `SELECT * FROM users WHERE "email"=$1`,
          [email]
        );
        if (userInfo.rowCount == 0 || userInfo.rows[0].password !== password) return false;
        return true;
    } catch (error) {
        return false;
    };
};

export { registerUser, validateEmail, validateUserRegister };