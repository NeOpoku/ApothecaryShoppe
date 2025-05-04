import express from 'express';
<<<<<<< Updated upstream
import { getUser } from '../Controllers/usercontroller';
=======
import { getUser } from '../Controllers/herbController';
>>>>>>> Stashed changes

const router = express.Router();

router.get('/user/:id', getUser);

export default router;