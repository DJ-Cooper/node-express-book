module.exports = function (grunt) {
    //load plugins
    ['grunt-cafe-mocha', 'gruntify-eslint', 'grunt-exec'].forEach(function (
        task
    ) {
        grunt.loadNpmTasks(task);
    });

    // configure plugins
    grunt.initConfig({
        cafemocha: {
            all: { src: 'qa/tests-*.js', options: { ui: 'tdd' } },
        },
        eslint: {
            app: {
                src: [
                    'node-express-book.js',
                    'public/js/**/*.js',
                    'lib/**/*.js',
                ],
            },
            qa: {
                src: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
            },
        },
        exec: {
            linkchecker: { cmd: 'linkchecker http://localhost:3000' },
        },
    });

    // register tasks
    grunt.registerTask('default', ['cafemocha', 'eslint', 'exec']);
};
