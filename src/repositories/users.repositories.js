import db from "../database/db.js";

async function getUserbyId (id) {
  try {
      const query = `SELECT * FROM users WHERE id=$1`;
      
      const userInfo = await db.query (query, [id]);
      
      const user = userInfo.rows[0];
      return user;
  } catch (error) {
      console.log(error);
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
      console.log(error);
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

async function findUserServices(userId) {
  try {
      const query = `
  SELECT 
      services.*, 
      users.name AS worker_name, 
      users.city,
      users.cellphone AS worker_phone,
      COALESCE(
          (
              SELECT 
                  ROUND(AVG(reviews.rating), 2)
              FROM 
                  reviews 
              WHERE 
                  reviews.service_id = services.id
          ),
          0
      ) AS overall_rating,
      COALESCE(
          (
              SELECT 
                  json_agg(json_build_object(
                      'id', reviews.id,
                      'text_description', reviews.text_description,
                      'rating', reviews.rating,
                      'customer_id', reviews.customer_id,
                      'customer_name', customer.name,
                      'created_at', reviews.created_at
                  )) 
              FROM 
                  reviews 
              JOIN 
                  users AS customer ON reviews.customer_id = customer.id 
              WHERE 
                  reviews.service_id = services.id
          ),
          '[]'::json
      ) AS reviews
  FROM 
      services
  JOIN 
      users ON services.worker_id = users.id
  WHERE services.worker_id = $1
`;
      const service = await db.query(query, [userId]);
      
      return service.rows;
  } catch (error) {
      console.log(error);
      return null;
  }
};

export { getUserbyId, getUserbyEmail, registerUserSession, findUserServices };