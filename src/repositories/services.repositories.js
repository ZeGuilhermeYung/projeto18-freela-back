import db from "../database/db.js";

async function createService (body) {
    const { name, photo, description, price, category, availability, workerId } = body;
    try {
        const session = await db.query(
          `INSERT INTO services ("name","worker_id","photo","description","price","category","availability") VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [name, workerId, photo, description, price, category, availability]
        );
        return session;
    } catch (error) {
        console.log(error);
        return null;
    };
};

async function editService (id, body) {
    const { name, photo, description, price, category, availability, workerId } = body;
    try {
        const query = `
            UPDATE services
            SET 
                "name" = $1,
                "worker_id" = $2,
                "photo" = $3,
                "description" = $4,
                "price" = $5,
                "category" = $6,
                "availability" = $7
            WHERE id = $8
        `;
        
        const result = await db.query(query,
          [name, workerId, photo, description, price, category, availability, id]
        );

        return result;
        
    } catch (error) {

        console.log(error);
    };
};

async function removeService (id) {
  try {
      const query = `DELETE FROM services WHERE id = $1`;
      
      const result = await db.query(query,[id]);

      return result;
      
  } catch (error) {
      console.log(error);
  };
};

async function findService (id) {
    console.log(id);
  try {
      const query = `
  SELECT 
      services.*, 
      users.name AS worker_name, 
      users.city,
      users.phone AS worker_phone,
      COALESCE(
          (
              SELECT 
                  json_agg(json_build_object(
                      'id', reviews.id, 
                      'text_description', reviews.text_description, 
                      'rating', reviews.rating,
                      'customer_id', reviews.customer_id,
                      'customer_name', u_customer.name
                  )) 
              FROM 
                  reviews 
              JOIN 
                  users AS u_customer ON reviews.customer_id = u_customer.id
              WHERE 
                  reviews.service_id = services.id
          ),
          '[]'::json
      ) AS reviews,
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
      ) AS overall_rating
  FROM 
      services
  JOIN 
      users ON services.worker_id = users.id
  WHERE 
      services.id = $1;
`;
      
      const service = await db.query(query,[id]);
      
      return service.rows[0];
  } catch (error) {
      console.log(error);
      return null;
  };
};

async function findAllServices() {
  try {
      const query = `
  SELECT 
      services.*, 
      users.name AS worker_name, 
      users.city,
      users.phone AS worker_phone,
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
                      'customer_name', customer.name
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
      users ON services.worker_id = users.id;
`;
      
      const services = await db.query(query,[]);
      
      return services.rows;
  } catch (error) {
      console.log(error);
      return null;
  };
};

async function changeServiceAvailability (id, value) {
    try {
        const query = `
            UPDATE services
            SET "availability" = $1
            WHERE id = $2
        `;
        
        const result = await db.query(query, [value, id]);

        return result;
        
    } catch (error) {
        
        console.log(error);
    };
};


async function checkWorkerService (workerId, serviceId) {
    try {
        const query = `SELECT * FROM services WHERE id = $1`;
        
        const service = await db.query(query,[serviceId]);
        
        return service.rows[0].worker_id == workerId;
    } catch (error) {
        console.log(error);
        return null;
    };
};

export { createService, editService, removeService, findService, findAllServices, changeServiceAvailability, checkWorkerService };