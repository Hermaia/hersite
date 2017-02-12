/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../typings/pygmentize-bundled/pygmentize-bundled.d.ts" />

import * as marked from "marked";
import * as pygmentize from "pygmentize-bundled";

import { toDistUrl } from "../helpers/path-helper";
import { emojify } from "../helpers/emoji-helper";


class CustomRenderer extends marked.Renderer {
    constructor() {
        super();
    }

    public code(code: string, lang: string): string {
        switch (lang) {
            case "math":
                return "\n$$\n" + code + "\n$$\n";
            default:
                return code;
        }
    }


    public link(href: string, title: string, text: string): string {
        return super.link(toDistUrl(href), title, text);
    }


    public heading(text: string, level: number) {
        console.error(text);
        switch (level) {
            case 1:
                return "<h1 class=\"page-header\">" + emojify(text) + "</h1>";
            case 2:
                return "<h2 class=\"page-header\">" + text + "</h2>";
            case 3:
                return "<h3 class=\"page-header\">" + text + "</h3>";
            case 4:
                return "<h4 class=\"page-header\">" + text + "</h4>";
            case 5:
                return "<h5 class=\"page-header\">" + text + "</h5>";
            case 6:
                return "<h6 class=\"page-header\">" + text + "</h6>";
            default:
                return "<h1 class=\"page-header\">" + text + "</h1>";
        }
    }


    public table(header: string, body: string): string {
        return "<table class=\"table table-hover\">\n"
                + "<thead>\n"
                    + header
                + "</thead>\n"
                + "<tbody>\n"
                    + body
                + "</tbody>\n"
            + "</table>\n";
    }


    public image(href: string, title: string, text: string): string {
        let out = "<img class=\"img-responsive\" src=\"" + href + "\" alt=\"" + text + "\" style=\"margin-right: auto; margin-left: auto;\"";
        if (title) {
            out += " title=\"" + title + "\"";
        }
        out += (<any>this).options.xhtml ? "/>" : ">";
        return out;
    }


    public text(text: string): string {
        console.error("text");
//        console.error(text);
        return super.text(emojify(text));
    }
}


export const renderer = new CustomRenderer();


marked.setOptions({
    highlight: (code: string, lang: string, callback) => {
        if (lang === "math") {
            callback(null, code);
            return;
        }

        pygmentize({ lang: lang, format: "html" }, code, function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(err, result.toString());
            }
        });
    }
});
