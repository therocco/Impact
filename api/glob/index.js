const glob = require("glob");
const path = require("path");

module.exports = (req, res, root) => {
    const results = [];
    const globs = [];
    const globParam = req.query.glob;

    if (typeof globParam === "string") {
        globs.push(path.join(root, globParam));
    } else if (Array.isArray(globParam)) {
        globParam.forEach(g => globs.push(path.join(root, g)));
    }

    globs.forEach(async item => {
        await glob(item, 0, (err, matches) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            matches.map(match => match.substring(root.length));
            results.push.apply(results, matches);
        });
    });
    
    res.send(results);
};
