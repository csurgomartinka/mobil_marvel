const express = require('express');
const mysql = require('mysql');
var cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("kepek"));

let connection;

function kapcsolat() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'marvel'
    });

    connection.connect(err => {
        if (err) {
            console.error('Hiba a kapcsolat során: ' + err.stack);
            return;
        }
        console.log('Csatlakoztatva: ' + connection.threadId);
    });
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/film', (req, res) => {
    kapcsolat();
    connection.query('SELECT * from film', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send("Hiba a filmek lekérdezésekor");
        } else {
            console.log(rows);
            res.status(200).send(rows);
        }
        connection.end(err => {
            if (err) {
                console.error('Hiba a kapcsolat lezárásakor: ' + err.stack);
            }
        });
    });
});

app.post('/szavazatFelvitel', (req, res) => {
    if (!req.body.bevitel1) {
        return res.status(400).send("Hiányzó adat: bevitel1");
    }

    kapcsolat();
    connection.query('INSERT INTO szavazat VALUES (NULL, ?)', [req.body.bevitel1], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Hiba a szavazat felvitelénél");
        } else {
            console.log(result);
            res.status(200).send("Sikeres szavazás");
        }
        connection.end(err => {
            if (err) {
                console.error('Hiba a kapcsolat lezárásakor: ' + err.stack);
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
