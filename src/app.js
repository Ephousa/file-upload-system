 import express from "express"; //Frameworkleri içe aktarıyoruz.
 import helmet from "helmet";
 import cors from 'cors';
 import fileRoutes from './routes/fileRoutes.js'; //Dosya rotalarını içeri aktarıyoruz.
 import rateLimit from "express-rate-limit";
 import upload from "./config/multer.js";

 const app = express();

 app.use(cors()); //Hangi domainlerin API'ye erişebileceğini kontrol eder.
 app.use(helmet()); //HTTP başlıklarını güvenlik için optimize eder.
 app.use(express.json()); //Gelen JSON verilerini parse etmek için middleware (Daha kullanışlı hale getirmek için)
 app.use(express.urlencoded({extended:true})); //Formlardan gelen URL-encoded verilerini parse etmek için middleware kullanıyoruz.

//Upload route'u 
app.use('/api/v1/files', fileRoutes); //Dosya ile ilgili rotaları aktif hale getiriyoruz.
app.use('/api/v1/multer', upload);
//rate limiting ayarları.
//Rate limiting aşırı istekleri engelleyerek DoS saldırılarını önler.
const limiter = rateLimit({
    windowMs: 15*60*1000, //15 Dakika
    max:100, //15 dakika içinde maksimum 100 istek atılabilir. 
    message: 'Çok fazla istek yaptınız, Lütfen daha sonra deneyiniz.'
});
app.use('/api/', limiter);

 //Çalışıyor mu diye test endpointi kurduk. 
 app.get('/api/v1/health', (req,res) => {
    res.json({status: 'ok'});
 });

//Çalışıyor mu diye test endpointi kurduk. 
app.get('/api/v2/health', (req,res) => {
    res.json({success:true, message: 'API is healthy'}); //Basit cevap döndürür
});
//Express uygulamasını dışa aktarıyoruz (server.js'de kullanılacağı için)
 export default app;



//  sqllite 
//  crud http metotds
//  user tablosu 