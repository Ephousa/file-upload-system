import multer from "multer";
import path from 'node:path';
import { randomUUID } from "node:crypto";
import fs from 'node:fs';

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        //Dosya tipi klasörünü belirle
        const category = req.body.category || 'other';
        const uploadPath = path.resolve('uploads', category);

        //Klasör yoksa oluştur.
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath, {recursive: true});
        }
        cb(null, uploadPath);
    },
    filename: (req,file,cb) =>{
        const ext = path.extname(file.originalname);
        const uniqueName = `${randomUUID()}${ext}`;
        cb(null, uniqueName);
    }
});

const upload = multer({storage});

export default upload;
