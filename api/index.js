module.exports = (app, root) => {
    
    app.post('/lib/weltmeister/api/save.php', (req, res) => require('./save')(req, res, root));
    app.get('/lib/weltmeister/api/browse.php', (req, res) => require('./browse')(req, res, root));
    app.get('/lib/weltmeister/api/glob.php', (req, res) => require('./glob')(req, res, root));

    // route not found - 404
    app.get('*', (req, res) => res.sendStatus(404));
}