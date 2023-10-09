import db from "../database/db.js";

async function getUserbyId (id) {
  try {
      const query = `SELECT * FROM users WHERE id=$1`;
      
      const userInfo = await db.query (query, [id]);
      
      const user = userInfo.rows[0];
      return user;
  } catch (error) {
      return null;
  };
};


async function getUserbyEmail (email) {
  try {
      const query = `SELECT * FROM users WHERE email=$1`;
      
      const userInfo = await db.query(query,[email]);
      
      const user = userInfo.rows[0];
      return user;
  } catch (error) {
      return null;
  };
};

async function registerUserSession (user_id, token) {
  try {
      const session = await db.query(
        `INSERT INTO sessions ("user_id", "token") VALUES ($1, $2)`,
        [user_id, token]
      );
      return session;
  } catch (error) {
      console.log(error);
      return null;
  };
};

export { getUserbyId, getUserbyEmail, registerUserSession };