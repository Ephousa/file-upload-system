//Bu fonksiyon dosya yükleme işlemini yönetmek için yapılmış bir controller fonksiyonudur. 
// Yani sunucuda dosya başarıyla geldi mi, doğru mu, buna göre kullanıcıya belirli bir cevap göndermek amacıyla yapılmıştır.
import fs from 'node:fs'; //klasör dpsya okuma işlemleri
import path from 'node:path'; //Dosya ve klasör yollarını güvenli oluşturmak için

const uploadFile = (req,res) => {
    if(!req.file){
        return res.status(400).json({success: false, error: 'No file uploaded'}); //dosya yüklenmemişse 400 Bad Request döndür.
    }
    res.status(201).json({
        success: true,
        message:'File uploaded successfully',
        data: {
            originalName: req.file.originalname,
            storedAs: req.file.filename,
            path: req.file.path, //tam kaydedilen kısım
        }, //Dosya yüklenmişse (201) Created status kodu gönderir ve dosyayı ilgili kısma ekler.
    });
};

const listFiles = (req, res) => {
    const category = req.query.category || 'other' //query paramsı ile kategori belirlenmezse 'other klasörünü  baz alacağız.'
    const directoryPath = path.resolve('uploads', category); //tam klasör yolu üretir. (path.resolve() sayesinde farklı işletim sistemlerinde uyumlu yollar oluşturabilir.)
    if (!fs.existsSync(directoryPath)){
        return res.status(404).json({
            success: false,
            message:`Kategori bulunamadı ${category}`,
        });
    }
    fs.readdir(directoryPath,  (err,files) => {
        if(err){
            return res.status(500).json({
                success: false,
                message: 'Dosyalar listelenirken hata oluştu',
            });
        }
        res.json({
            success: true,
            count: files.length,
            files: files.map(filename =>({
                filename,
                url: `/uploads/${category}/${filename}`,
            })),
        });
    });
 };


export { uploadFile }
export { listFiles }