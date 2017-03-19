/// <reference path="../../../typings/index.d.ts" />
import * as cheerio from "cheerio";

import { PageOptions } from "../../options";
import { createDestUrl } from "./path";


export class Html {
    private _$: CheerioStatic;

    constructor(source: string) {
        this._$ = cheerio.load(source);
    }

    public finalize(): void {
        const that: Html = this;

        this._$("a").each((i, elem) => {
            const $this = that._$(that);
            const href = $this.attr("href");

            if (href) {
                $this.attr("href", createDestUrl(href));
            }
        });
    }

    public getPageOptions(): PageOptions {
        // title は 1 つ目の h1

        const h1 = this._$("h1").first();

        if (h1) {
            return {
                title: h1.text(),
            };
        } else {
            return {
                title: "",
            };
        }
    }

    public toHtml(): string {
        return this._$.html();
    }
}
