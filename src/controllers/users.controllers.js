import { getUserbyId } from "../repositories/auth.repositories.js";
import { findUserServices } from '../repositories/services.repositories.js';

async function getUser (req, res) {
  try {
      const user = await getUserbyId (res.locals.user.user_id);
      const userServices = await findUserServices (res.locals.user.user_id);
      if(user)
      {
          delete user.password;
          user.services = userServices;
      }
      return res.status(200).send(user);
  } catch (error) {
      console.log(error);
      return res.status(500).send('Internal server error');
  };
};

export default getUser;