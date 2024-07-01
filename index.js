const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 1856;

// Middleware untuk parsing body dari POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/upload', (req, res) => {
    try {
        const base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, '');
        const filename = `image_${Date.now()}.jpg`;
        const uploadDir = path.join(__dirname, 'uploads');
        const imagePath = path.join(uploadDir, filename);

        // Pastikan direktori 'uploads' ada
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // Menyimpan gambar ke dalam direktori 'uploads'
        fs.writeFileSync(imagePath, base64Data, 'base64');

        console.log(`Image saved: ${filename}`);
        res.status(200).send('Image saved');
    } catch (err) {
        console.error('Error saving image:', err);
        res.status(500).send('Failed to save image');
    }
});

// Middleware untuk melayani file statis
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk menerima data dari form HTML
app.post('/submit', (req, res) => {
    const inputData = req.body.inputData;
    const dataDir = path.join(__dirname, 'data');
    const filePath = path.join(dataDir, 'input.txt');

    // Pastikan direktori 'data' ada
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    // Tulis data ke file input.txt
    fs.appendFile(filePath, inputData + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Internal Server Error');
        }
        res.sendFile(path.join(__dirname, 'public', 'success.html'));
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
