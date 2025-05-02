import express from 'express';
import { getUser } from '../Controllers/usercontroller';

const router = express.Router();

router.get('/user/:id', getUser);