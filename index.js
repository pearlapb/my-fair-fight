const express = require('express');
const app = express();
const chalk = require('chalk');

const server = require('http').Server(app);

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const db = require('./config/db.js');
const auth = require('./config/auth.js');

app.use(cookieSession({
    name: 'session',
    secret: 'This1 Is2 a3 vERRy4 diFFicUlt5 SecrEt6 to7 KEEP8',
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

app.use('/public', express.static(__dirname+ '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/', require('./routes/loginAndRegRoutes.js'));
app.use('/', require('./routes/userProfileRoutes.js'));
app.use('/', require('./routes/updateUserProfileRoutes.js'));

app.get('/', function(req, res) {
    if (!req.session.user) {
        res.redirect('/identification');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/identification', function(req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('*', function(req, res) {
    if (!req.session.user) {
        res.redirect('/identification');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(8080, function() {
    console.log(chalk.bgMagenta("I'm listening."));
});
