import express from 'express';
import { getAllSuperheroes, getSuperheroById } from "./superhero.controller.js";

const router = express.Router();

router.get('/', getAllSuperheroes);
router.get('/:id', getSuperheroById);

export default router;