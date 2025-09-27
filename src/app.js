 import express from "express";
 import helmet from "helmet";
 import cors from 'cors';
import fileRoutes from './routes/fileRoutes.js';


 const app = express();

 app.use(cors());
 app.use(helmet());
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));

 app.get('/api/v1/health', (req,res) => {
    res.json({status: 'ok'});
 });
 
//Test route'u
app.get('/api/v2/health', (req,res) => {
    res.json({success:true, message: 'API is healthy'});
});

//Upload route'u
app.use('/api/v2/files', fileRoutes);


 export default app;