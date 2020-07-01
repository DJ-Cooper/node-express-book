let express = require('express');
let app = express();

let handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
    },
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

app.get('/nursery-rhyme', function (req, res) {
    res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function (req, res) {
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck',
    });
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

function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3C)',
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8C)',
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8C)',
            },
        ],
    };
}

app.use(function (req, res, next) {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherContext = getWeatherData();
    next();
});
