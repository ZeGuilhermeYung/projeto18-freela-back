import db from "../database/db.js";

async function addReview (customer_id, text, rating, service_id) {
    try {
        const review = await db.query(
          `INSERT INTO reviews ("customer_id", "text", "rating", "service_id") VALUES ( $1, $2, $3, $4 )`,
          [customer_id, text, rating, service_id]
        );
        return review;
    } catch (error) {
        console.log(error);
        return null;
    };
};

export default addReview;