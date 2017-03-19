/// <reference path="../../../typings/hogan/hogan.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
import * as fs from "fs";
import * as path from "path";
import * as hogan from "hogan.js";

import { HersiteOptions, PageOptions } from "../../options";


export class TemplateBuilder {
    private _compiled: any;

    constructor(options: HersiteOptions) {
        const templatePath = path.join(options.directories.templates, "_page.html");

        this._compiled = hogan.compile(fs.readFileSync(templatePath, {
            encoding: "utf8"
        }));
    }

    public build(content: string, options: PageOptions): string {
        return this._compiled.render({
            title: options.title,
            useMathjax: options.useMathjax,
            isDraft: options.isDraft,
            content: content,
        });
    }
}
