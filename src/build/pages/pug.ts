import * as path from "path";
import * as pug from "pug";
import * as fs from "fs";

import { HersiteOptions, PageOptions } from "../../options";
import { PageBuilder } from "./page";
import { writeFile, readFile } from "../helpers/file";
import { compileMarkdown } from "../helpers/md";
import { TemplateBuilder } from "../helpers/template";
import { Html } from "../helpers/html";


export class PugBuilder extends PageBuilder {
    private _template: TemplateBuilder;

    constructor(options: HersiteOptions) {
        super(options);

        this._template = new TemplateBuilder(options);
    }

    public useThisBuilder(sourcePath: string): boolean {
        const ext = path.extname(sourcePath);

        return ext === ".pug";
    }

    public build(sourcePath: string, destPath: string, callback: (error: any) => void): void {
        readFile(sourcePath, (err: NodeJS.ErrnoException, source: string) => {
            if (err) {
                callback(err);
                return;
            }

            const content = pug.compile(source)({});

            // content のファイナライズと
            // options の抽出
            const html = new Html(content);
            html.finalize();

            const options = html.getPageOptions();

            writeFile(destPath, this._template.build(html.toHtml(), options), (error: NodeJS.ErrnoException) => {
                callback(error);
            });
        });
    }
}
