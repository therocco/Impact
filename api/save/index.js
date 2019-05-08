const fs = require("fs");
const path = require("path");

module.exports = (req, res, root) => {
    const params = Object.assign(req.body, req.params);
    const { data } = params;
    const _path = params.path;
    const filepath = path.join(root, _path);

    if (_path && data) {
        if (/\.js$/.test(_path)) {
            fs.promises
                .mkdir(path.dirname(filepath), { recursive: true })
                .then(() => {
                    fs.promises
                        .writeFile(filepath, data)
                        .then(response => res.send({ error: 0 }))
                        .catch(err => {
                            console.log(err);
                            res.send({ error: 2, msg: `Couldn't write to file: ${_path}` });
                        });
                })
                .catch(err => {
                    console.log(err);
                    res.send({ error: 2, msg: `Couldn't write to file: ${_path}` });
                });
        } else {
            res.send({ error: 3, msg: "File must have a .js suffix" });
        }
    } else {
        res.send({ error: 1, msg: "No Data or Path specified" });
    }
};
