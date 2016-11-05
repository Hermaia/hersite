/// <reference path="../../typings/hogan/hogan.d.ts" />
/// <reference path="../../typings/index.d.ts" />
import * as fs from "fs";
import * as path from "path";
import * as hogan from "hogan.js";

import { HersiteOptions, PageOptions } from "../options";
import { finalizeContent } from "../helpers/html-helper";


export function readTemplate(options: HersiteOptions): any {
    const templatePath = path.join(options.directories.templates, "_page.html");

    return hogan.compile(fs.readFileSync(templatePath, {
        encoding: "utf8"
    }));
}

export function withTemplate(template: any, content: string, options: PageOptions, hersite: HersiteOptions): string {
    const opt: PageOptions = {
        title: options.title || hersite.defaultPageOption.title,
    };

    if (options.useMathjax === true || options.useMathjax === false) {
        opt.useMathjax = options.useMathjax;
    } else {
        opt.useMathjax = hersite.defaultPageOption.useMathjax;
    }

    if (options.isDraft === true || options.isDraft === false) {
        opt.isDraft = options.isDraft;
    } else {
        opt.isDraft = hersite.defaultPageOption.isDraft;
    }

    return template.render({
        title: opt.title,
        useMathjax: opt.useMathjax,
        isDraft: opt.isDraft,
        content: finalizeContent(content),
    });
}
