/// <reference path="../../../typings/index.d.ts" />
import * as fs from "fs";
import * as path from "path";


export function readFile(filePath: string, callback: (err: NodeJS.ErrnoException, content: string) => void): void {
    fs.readFile(filePath, { encoding: "utf8" }, (err: NodeJS.ErrnoException, data: string) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}


export function mkdir(dir: string, callback: (err: NodeJS.ErrnoException) => void): void {
    try {
        const exist = fs.statSync(dir).isDirectory();

        callback(null);
    } catch (e) {
        mkdir(path.dirname(dir), function(err: NodeJS.ErrnoException) {
            if (err) {
                callback(err);
            } else {
                fs.mkdirSync(dir);
                callback(null);
            }
        });
    }
}

export function writeFile(filePath: string, content: string, callback: (error: NodeJS.ErrnoException) => void): void {
    const dir = path.dirname(filePath);

    mkdir(dir, (err: NodeJS.ErrnoException) => {
        if (err) {
            callback(err);
            return;
        }

        fs.writeFile(filePath, content, { encoding: "utf8" }, (err: NodeJS.ErrnoException) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    });
}


export function getFiles(root: string, callback: (err: NodeJS.ErrnoException, path: string) => void): void {
    fs.readdir(root, function(err, files) {
        if (err) {
            callback(err, null);
            return;
        }

        files.forEach(function(f) {
            const fullPath = path.join(root, f);

            if (fs.statSync(fullPath).isDirectory()) {
                getFiles(fullPath, callback);
            } else {
                callback(null, fullPath);
            }
        });
    });
}

export function getFilesWithExt(root: string, ext: string, callback: (err: NodeJS.ErrnoException, path: string) => void): void {
    getFiles(root, (err: NodeJS.ErrnoException, fullPath: string) => {
        if (err) {
            callback(err, null);
        } else {
            const e = path.extname(fullPath);

            if (e === ext) {
                callback(null, fullPath);
            }
        }
    });
}


export function getFilesSync(root: string): string[] {
    const results: string[] = [];

    try {
        const files = fs.readdirSync(root);

        for (let i = 0; i < files.length; i++) {
            const fullPath = path.join(root, files[i]);

            if (fs.statSync(fullPath).isDirectory()) {
                const fss = getFilesSync(fullPath);

                if (fss) {
                    fss.forEach(function(p) {
                        results.push(p);
                    });
                }
            } else {
                results.push(fullPath);
            }
        }

        return results;
    } catch (e) {
        return null;
    }
}
