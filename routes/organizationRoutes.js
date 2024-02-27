import express from 'express';
import multer from 'multer'; 
import path from 'path';
import {createProgramController ,getAllProgramController  ,updateProgramController ,deleteProgramController
} from '../controllers/organizationController.js'
// router object 
const router  = express.Router()
  //  multer configuration
  const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
      }
  })
  const upload = multer({
    storage:Storage
  })

router.post('/create-program' , upload.single('image'), createProgramController  )
router.get('/get-program' , getAllProgramController  )
router.patch('/update-program/:id' , updateProgramController  )
router.delete('/delete-program/:id' , deleteProgramController  )

export default router