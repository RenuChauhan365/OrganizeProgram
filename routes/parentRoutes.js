import express from 'express';
import { registerInProgramController ,subscribedProgramsController ,  unsubscribedProgramsController ,allprogramsController 
} from '../controllers/parentController.js';
const router  = express.Router()
 
router.post('/register-program' , registerInProgramController  )
router.get('/subscribe-program' , subscribedProgramsController)
router.get('/unsubscribe-program' , unsubscribedProgramsController)
router.get('/all-program' , allprogramsController)

export default router
