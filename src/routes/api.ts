import { Router } from 'express';
import { privateRoute } from '../config/passport';

import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/ping', ApiController.ping);
router.get('/list', privateRoute, ApiController.list);
router.post('/login', privateRoute, ApiController.login);

export default router;