import { changeServiceAvailability, checkWorkerService, createService, findAllServices, findService, removeService, editService } from '../repositories/services.repositories.js';

async function getService (req, res) {
  try {
      const service = await findService(req.params.id);
      if(!service) return res.sendStatus(404);
      return res.status(200).send(service);
  } catch (error) {
      return res.status(500).send('Internal server error');
  };
};

async function postService (req, res) {
    try {
        await createService(req.body);
        return res.status(201).send("Serviço criado com sucesso!");
    } catch (error) {
        return res.status(500).send('Internal server error');
    };
};

async function updateService (req, res) {
  try {
      const worker = await checkWorkerService(res.locals.user.user_id, req.params.id);
      if(!worker) return res.sendStatus(401);
      const result = await editService(Number(req.params.id),req.body);
      if(result.rowCount === 0) return res.sendStatus(404);
      return res.status(201).send("Alterações feitas com sucesso!");
  } catch (error) {
      return res.status(500).send('Internal server error');
  };
};

async function deleteService (req, res) {
    try {
        const worker = await checkWorkerService(res.locals.user.user_id, req.params.id);
        if(!worker) return res.sendStatus(401);
        const result = await removeService(Number(req.params.id));
        if(result.rowCount === 0) return res.sendStatus(404);
        return res.status(204).send("Serviço removido!");
    } catch (error) {
        return res.status(500).send('Internal server error');
    };
};

async function updateServiceAvailability (req, res) {
    try {
        const worker = await checkWorkerService(res.locals.user.user_id,req.params.id);
        if(!worker) return res.sendStatus(401);
        const result = await changeServiceAvailability(Number(req.params.id),req.body.available);
        if(result.rowCount === 0) return res.sendStatus(404);
        return res.status(201).send("Disponibilidade alterada com sucesso!");
    } catch (error) {
        return res.status(500).send('Internal server error');
    };
};

async function getAllServices (req, res) {
    try {
        const allServices = await findAllServices();
        if(!allServices) return res.sendStatus(404);
        return res.status(200).send(allServices);
    } catch (error) {
        return res.status(500).send('Internal server error');
    };
};

export { getService, postService, updateService, deleteService, updateServiceAvailability, getAllServices };