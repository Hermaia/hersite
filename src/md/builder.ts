/// <reference path="../../typings/index.d.ts" />
import * as path from "path";
import * as marked from "marked";

import { HersiteOptions, PageOptions, getPageOptions } from "../options";
import { readFile, writeFile, getFilesWithExt } from "../helpers/file-helper";
import { finalizePath } from "../helpers/path-helper";
import { renderer } from "./renderer";

import { readTemplate, withTemplate } from "../pages/page";


function readContentFromMarkdown(md: string, callback: (error: any, content: string, options: PageOptions) => void): void {
    const parsed = getPageOptions(md);

    marked(parsed.code, { renderer: renderer }, function (err, content) {
        if (err) {
            callback(err, null, null);
        } else {
            callback(null, content, parsed.options);
        }
    });
}


export function buildMarkdownPages(options: HersiteOptions, callback: (error: any, sourece: string) => void): void {
    const template = readTemplate(options);

    getFilesWithExt(options.directories.pages, ".md", (err: NodeJS.ErrnoException, sourcePath: string) => {
        if (err) {
            callback(err, sourcePath);
            return;
        }

        const rel = path.relative(options.directories.pages, sourcePath);
        const destPath = finalizePath(path.join(options.directories.dests, rel));

        readFile(sourcePath, (err: NodeJS.ErrnoException, md: string) => {
            if (err) {
                callback(err, sourcePath);
                return;
            }

            readContentFromMarkdown(md, (error: any, content: string, opt: PageOptions) => {
                if (error) {
                    callback(error, sourcePath);
                } else {
                    const html = withTemplate(template, content, opt, options);

                    writeFile(destPath, html, (err: NodeJS.ErrnoException) => {
                        callback(err, sourcePath);
                    });
                }
            });
        });
    });
}
