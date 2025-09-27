import { Router } from 'express';
import upload from '../config/multer.js';

const router = Router();

//basit upload route

router.post('/upload', upload.single('file'), (req,res) =>{
    if(!req.file){
        return res.status(400)._construct.json ({success: false, error: 'No file uploaded'});
    }
    res.json({
        success: true,
        message: 'File uploaded successfully',
        data: {
            originalName: req.file.originalname,
            storedAs: req.file.filename,
            path: req.file.path
        }
    });
});

export default router;