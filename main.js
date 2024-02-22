var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();

const client = new pg.Client({
    host: "localhost",
    user: "postgres",
    password: "Sp00ky!",
    database: "postgres",
    port: "54321"
});


app.use(express.static(__dirname));
app.use(bodyParser.json());
client.connect();
client.query("SET search_path = \"FriendshipApp\"");

const viewPath = path.join(__dirname, 'view');

app.get("/*", function (req, res) {
    const requestedPath = req.path === '/' ? '/index.html' : req.path;
    const filePath = path.join(viewPath, requestedPath);
    
    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        const contentType = getContentType(requestedPath);

        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        return res.end();
    });
});

app.use('/icons', express.static(path.join(__dirname, 'icons')));

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        default:
            return 'application/octet-stream'; 
    }
}

app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/script.js');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = password;

        await client.query('INSERT INTO UserLogin (Username, Email, Pwd) VALUES ($1, $2, $3)', [name, email, password]);

        res.json({ success: true });
    } catch (error) {
        console.error('Error during registration:', error);
        res.json({ success: false, error: 'Internal Server Error' });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});