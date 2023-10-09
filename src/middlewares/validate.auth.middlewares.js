import db from "../database/db.js";

async function validateAuth (req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  
  if (!token) return res.sendStatus(401);
  
  try {
    const validateUser = await db.query(
      `SELECT * FROM sessions WHERE "token"=$1`,
      [token]
    );

    if (validateUser.rowCount == 0) return res.sendStatus(401);

    res.locals = {user: validateUser.rows[0]};

  } catch (err) {
    res.status(500).send(err.message);
  };
  
  next();
};

export default validateAuth;