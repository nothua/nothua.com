import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {title:"Home"});
});

app.get("/blog", (req, res) =>{
    res.render('blog', {title:"Blog"});
});

app.get("/blog_page", (req, res) =>{
    res.render('blog_page', {title:"Blog Page"});
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

import fs from 'fs';
import path from 'path';
import pug from 'pug';

//module __dirname
const __dirname = path.resolve();

const viewsDir = path.join(__dirname, 'views');
const distDir = path.join(__dirname, 'dist');

fs.readdir(viewsDir, (err, files) => {
    if (err) {
        console.error('Error reading the views directory:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(viewsDir, file);

        const html = pug.renderFile(filePath, { pretty: true });

        const fileName = file.replace('.pug', '.html');

        fs.writeFile(path.join(distDir, fileName), html, err => {
            if (err) {
                console.error('Error writing the file:', err);
                return;
            }

            console.log(`The file ${fileName} was written successfully`);
        });
    });
});