import express, { Application } from 'express';
import path from 'path';
import mainRouter from './routes/mainRouter';

const app: Application = express();

// Statik dosyalar için public klasörünü ayarlıyoruz.
// __dirname "src" klasörünü gösteriyorsa, public klasörü projenin kökünde olduğu için '..' ile bir üst dizine çıkıyoruz.
app.use(express.static(path.join(__dirname, '..', 'public')));

// EJS view engine ayarları
app.set('view engine', 'ejs');
// views klasörüne erişmek için bir üst dizine çıkıp 'views' klasörünü belirtiyoruz.
app.set('views', path.join(__dirname, '..', 'views'));

// Router'ı ekleyelim
app.use('/', mainRouter);


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000}`);
});
