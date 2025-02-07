import {type Request,type Response, Router} from 'express';
import {get,post} from '../controllers/users.ts';

export const router:Router = Router();

router.get('/get',get);
router.post('/add',post);