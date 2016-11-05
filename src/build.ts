/// <reference path="../typings/index.d.ts" />
import * as path from "path";

import { readHersiteOptions, PageOptions } from "./options";
import { buildMarkdownPages } from "./md/builder";
import { copyFilesWithExt } from "./asset/copy";
import { buildPugPages } from "./pug/builder";


export function buildHersite(callback: (error: any, source: string) => void): void {
    const options = readHersiteOptions();

    buildMarkdownPages(options, function(error: any, source: string) {
        callback(error, source);
    });

    copyFilesWithExt(options, function(error: any, source: string) {
        callback(error, source);
    });

    buildPugPages(options, function(error: any, source: string) {
        callback(error, source);
    });
}
