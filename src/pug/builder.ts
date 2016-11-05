/// <reference path="../../typings/index.d.ts" />
import * as path from "path";
import * as marked from "marked";
import * as pug from "pug";

import { HersiteOptions, PageOptions, getPageOptions } from "../options";
import { readFile, writeFile, getFilesWithExt } from "../helpers/file-helper";
import { toDistPath } from "../helpers/path-helper";

import { readTemplate, withTemplate } from "../pages/page";


export function buildPugPages(options: HersiteOptions, callback: (error: any, sourece: string) => void): void {
    const template = readTemplate(options);

    getFilesWithExt(options.directories.pages, ".pug", (err: NodeJS.ErrnoException, sourcePath: string) => {
        if (err) {
            callback(err, sourcePath);
            return;
        }

        const distPath = toDistPath(sourcePath, options);

        readFile(sourcePath, function(err: NodeJS.ErrnoException, content: string) {
            if (err) {
                callback(err, sourcePath);
                return;
            }

            const parsed = getPageOptions(content);

            const compiler = pug.compile(parsed.code);
            const html = withTemplate(template, compiler({}), parsed.options, options);

            writeFile(distPath, html, (err: NodeJS.ErrnoException) => {
                callback(err, sourcePath);
            });
        });
    });
}
