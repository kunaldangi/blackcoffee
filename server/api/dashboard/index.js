import express from "express";

import { intensity } from "./intensity.js";
import { relevance } from "./relevance.js";
import { likelihood } from "./likelihood.js";
import { impact } from "./impact.js";

const router = express.Router();

router.post('/intensity', intensity);
router.post('/relevance', relevance);
router.post('/likelihood', likelihood);
router.post('/impact', impact);

export default router;