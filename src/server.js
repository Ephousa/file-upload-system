 import app from './app.js'; //app.jsi içeri aktarıyoruz.
 const PORT = process.env.PORT || 3000; //Port numarasını .env'den alır, yoksa da 3000 sayılı portu kullanır.

 //Sunucuyu belirtilen portta başlatıyoruz.
 app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
 });
