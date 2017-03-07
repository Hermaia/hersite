/// <reference path="../../typings/index.d.ts" />
import * as cheerio from "cheerio";

import { toDistUrl } from "../helpers/path-helper";


export class HtmlContent {
    private _$: CheerioStatic;


    constructor(source: string) {
        this._$ = cheerio.load(source);
    }

    public finalize(): void {
        const that: HtmlContent = this;

        this._$("a").each((i, elem) => {
            const $this = that._$(that);
            const href = $this.attr("href");

            if (href) {
                $this.attr("href", toDistUrl(href));
            }
        });
    }

    public toHtml(): string {
        return this._$.html();
    }
}
