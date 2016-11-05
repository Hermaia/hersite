/// <reference path="../../typings/index.d.ts" />
import * as fs from "fs";
import * as path from "path";

import { HersiteOptions } from "../options";
import { getFiles, mkdir } from "../helpers/file-helper";


export function copyFilesWithExt(options: HersiteOptions, callback: (error: any, source: string) => void): void {
    getFiles(options.directories.pages, (err: NodeJS.ErrnoException, source: string) => {
        if (err) {
            callback(err, source);
            return;
        }

        const ext = path.extname(source);

        if (options.assetExts.indexOf(ext) < 0) {
            return;
        }

        const rel = path.relative(options.directories.pages, source);
        const dest = path.join(options.directories.dests, rel);

        mkdir(path.dirname(dest), function(error: NodeJS.ErrnoException) {
            if (error) {
                callback(error, source);
                return;
            }

            try {
                const rs = fs.createReadStream(source);
                rs.on("error", function (err) {
                    callback(err, source);
                });

                const ws = fs.createWriteStream(dest);
                ws.on("finish", function (err) {
                    callback(null, source);
                });
                ws.on("error", function (err) {
                    callback(err, source);
                });

                rs.pipe(ws);
            }
            catch (err) {
                callback(err, source);
            }
        });
    });
}
