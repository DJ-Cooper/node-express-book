let express = require('express')
let app = express()

let handlebars = require('express-handlebars').create({ defaultLayout: 'main' })
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000)

let fortunes = [
    'Immanentize the Eschaton',
    'To be played at the Maximum Volume',
    'Two men enter, one man leave',
    'Lattice of Coincidence',
    'We speak in images, not antiquated verbosity',
]

app.use(express.static(__dirname + '/public'))

app.use(function (req, res, next) {
    res.locals.showTests =
        app.get('env') !== 'production' && req.query.test === '1'
    next()
})

app.get('/', function (req, res) {
    res.render('home')
})

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortunes[Math.floor(Math.random() * fortunes.length)],
        pageTestScript: '/qa/tests-about.js',
    })
})

// custom 404 page
app.use(function (req, res) {
    res.status(404)
    res.render('404')
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), function () {
    console.log(
        'Express started on http://localhost:' +
            app.get('port') +
            '; press Ctrl-C to terminate'
    )
})
