import multer from "multer";
//Dosya yollarını ve uzantıları yönetebilmek için core Node modülleri kullanıyoruz.
import path from 'node:path';
import { randomUUID } from "node:crypto"; //Benzersiz dosya isimleri üretebilmek için.
import fs from 'node:fs';

//Multer için özelleştirilmiş disk yapılandırması kullanıyoruz.
const storage = multer.diskStorage({
    //Dosyanın kaydedileceği klasörü belirler.
    destination: (req,file,cb) =>{
        //Formdan gelen kategori bilgisi yoksa "other"
        const category = req.body.category || 'other';
        //Kayıt klasörünü belirleyen blok.
        const uploadPath = path.resolve('uploads', category);

        //Klasör yoksa oluştur.
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath, {recursive: true});
        }
        //Kaydedilecek klasörü multer'a bildir.
        cb(null, uploadPath);
    },
    //Dosyanın adını belirler
    filename: (req,file,cb) =>{
        //Örnek: .pdf, .jpg gibi uzantıları al
        const ext = path.extname(file.originalname);
        //Benzersiz isim oluştur.
        const uniqueName = `${randomUUID()}${ext}`;
        cb(null, uniqueName); //Bu ismi multer'a bildir
    }
});

const upload = multer({storage});

export default upload;
