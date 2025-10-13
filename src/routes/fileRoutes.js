import { Router } from 'express';
import upload from '../config/multer.js';
import { uploadFile } from '../controllers/fileController.js';

const router = Router(); //yeni router ekliyoruz.

//upload.single middleware'i ile gelen tek dosyayı al, ardından uploadFile çalışsın.
router.post('/upload', upload.single('file'), uploadFile,)

//Deneme endpointi.
router.get('/test', (req, res) => {
    res.send('Çalışması lazım')
})

export default router;
