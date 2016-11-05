/// <reference path="../../typings/index.d.ts" />
import * as cheerio from "cheerio";

import { finalizePath } from "../helpers/path-helper";


export function finalizeContent(html: string): string {
    const $ = cheerio.load(html);

    finalizeHeading($);
    finalizeTable($);

    finalizeLink($);

    return $.html();
}


export function finalizeTable($: CheerioStatic): void {
    /*
    $("table").addClass("table table-hover");
    */
}


export function finalizeHeading($: CheerioStatic): void {
    /*
    $("h1").addClass("page-header");
    $("h2").addClass("page-header");
    */
}


export function finalizeLink($: CheerioStatic): void {
    $("a").each(function(i, elem) {
        const $this = $(this);
        const href = $this.attr("href");
//        console.log($this.html());
//        console.log(href);

        if (href) {
            $this.attr("href", finalizePath(href));
        }
    });
}
