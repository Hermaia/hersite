/// <reference path="../typings/index.d.ts" />
import * as path from "path";

import { readHersiteOptions, PageOptions } from "./options";
import { buildMarkdownPages } from "./md/builder";
import { copyFilesWithExt } from "./asset/copy";
import { buildPugPages } from "./pug/builder";


const options = readHersiteOptions();


buildMarkdownPages(options, function(error: any, source: string) {
    if (error) {
        console.error(source);
        console.error(error);
    }
});


copyFilesWithExt(options, function(error: any, source: string) {
    if (error) {
        console.error(source);
        console.error(error);
    }
});


buildPugPages(options, function(error: any, source: string) {
    if (error) {
        console.error(source);
        console.error(error);
    }
});
