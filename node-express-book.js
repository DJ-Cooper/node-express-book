let express = require('express');
let app = express();

let handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

const LOCALHOST_PORT = 3000;
const ERROR_404 = 404;
const ERROR_500 = 500;

app.set('port', process.env.PORT || LOCALHOST_PORT);

let zombo = require('./lib/fortune.js');

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.locals.showTests =
        app.get('env') !== 'production' && req.query.test === '1';
    next();
});

// ROUTES

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: zombo.getFortune(),
        pageTestScript: '/qa/tests-about.js',
    });
});

app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

// custom 404 page
app.use(function (req, res) {
    res.status(ERROR_404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(ERROR_500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log(
        'Express started on http://localhost:' +
            app.get('port') +
            '; press Ctrl-C to terminate'
    );
});
