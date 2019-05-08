const fs = require("fs");
const path = require("path");

module.exports = (req, res, root) => {
    let stats;
    let { dir = "", type } = req.query;

    const filetypes = { scripts: [".js"], images: [".png", ".gif", ".jpg", ".jpeg"] };
    const result = { parent: false, dirs: [], files: [] };
    const isFiletype = type && filetypes[type] ? filetypes[type] : false;

    result.parent = req.query.dir ? dir.substring(0, dir.lastIndexOf("/")) : false;

    if (dir[dir.length - 1] === "/") dir = dir.substring(0, dir.length - 1);
    dir += "/";
    const dirpath = path.normalize(root + dir);

    fs.readdir(dirpath, (err, files) => {
        if(files) {
            files.forEach(file => {
                stats = fs.statSync(dirpath + file);
                if (stats.isDirectory()) {
                    result.dirs.push(dir + file);
                } else if (stats.isFile()) {
                    if (isFiletype) {
                        if (isFiletype.indexOf(path.extname(file)) >= 0) {
                            result.files.push(dir + file);
                        }
                    } else {
                        result.files.push(dir + file);
                    }
                }
            });
        }

        result.files.sort((a, b) => {
            return a.toUpperCase() < b.toUpperCase() ? -1 : 1;
        });

        res.send(result);
    });
};
