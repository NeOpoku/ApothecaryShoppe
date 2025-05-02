import express from 'express';
import { getUser } from '../Controllers/herbController.js';
import { getUser } from '../Controllers/herbController';

const router = express.Router();

router.get('/user/:id', getUser);