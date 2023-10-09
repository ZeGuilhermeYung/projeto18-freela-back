import addReview from "../repositories/reviews.repositories.js";
import { findService } from "../repositories/services.repositories.js";

async function createReview (req, res) {
    const {customer_id, text, rating, service_id} = req.body;
    try {
        await addReview(customer_id, text, rating,service_id);
        
        const service = await findService(service_id);

        return res.status(201).send(service);
    } catch (error) {
        return res.status(500).send('Internal server error');
    };
};

export default createReview;