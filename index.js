const express = require('express');
const app = express();
const chalk = require('chalk');

const server = require('http').Server(app);

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const db = require('./config/dbReg.js');
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

app.use(express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/', require('./routes/loginAndRegRoutes.js'));
app.use('/', require('./routes/imageUploadRoutes.js'));
app.use('/', require('./routes/userRoutes.js'));
app.use('/', require('./routes/adminRoutes.js'));

app.get('/admin', function(req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        if (req.session.user.userType != 'FFmember') {
            res.redirect('/');
        } else {
            res.sendFile(__dirname + '/index.html');
        }
    }
});

app.get('/', function(req, res) {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        if (req.session.user.userType == 'FFmember') {
            res.redirect('/admin');
        } else {
            res.sendFile(__dirname + '/index.html');
        }
    }
});

app.get('/login', function(req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        console.log('hi');
        res.sendFile(__dirname + '/index.html');
    }
});


app.get('*', function(req, res) {
    console.log("whoop");
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(process.env.PORT || 8080, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
