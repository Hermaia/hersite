import * as fs from "fs";
import * as path from "path";

import { HersiteOptions, PageOptions } from "../../options";
import { PageBuilder } from "./page";
import { mkdir } from "../helpers/file";


export class AssetBuilder extends PageBuilder {
    constructor(options: HersiteOptions) {
        super(options);
    }

    public useThisBuilder(sourcePath: string): boolean {
        const ext = path.extname(sourcePath);

        return this.hersiteOptions.assetExts.indexOf(ext) < 0;
    }

    public build(sourcePath: string, destPath: string, callback: (error: any) => void): void {
        mkdir(path.dirname(destPath), function(error: NodeJS.ErrnoException) {
            if (error) {
                callback(error);
                return;
            }

            try {
                const rs = fs.createReadStream(sourcePath);
                rs.on("error", function (err) {
                    callback(err);
                });

                const ws = fs.createWriteStream(destPath);
                ws.on("finish", function (err) {
                    callback(null);
                });
                ws.on("error", function (err) {
                    callback(err);
                });

                rs.pipe(ws);
            }
            catch (err) {
                callback(err);
            }
        });
    }
}
