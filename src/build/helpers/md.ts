/// <reference path="../../../typings/markdown-it-emoji/markdown-it-emoji.d.ts" />
import * as os from "os";
import * as child_process from "child_process";

import { Options } from "markdown-it";
import * as emoji from "markdown-it-emoji";
import * as escape from "escape-html";
import * as md_it from "markdown-it";

import * as iconv from "iconv-lite";

const options: md_it.Options = {
    highlight: function(code: string, lang: string, callback?: Function): string {
        if (lang === "text") {
          return escape(code);
        }

        const buffer = child_process.spawnSync(
                "pygmentize", [
                    "-l", lang,
                    "-f", "html",
                    "-O", "nowrap=1",
                ], {
                    input: code,
                }
            ).stdout;

        if (os.type().toString().match("Windows")) {
            return iconv.decode(buffer, "Shift_JIS").replace(/\s+$/g, "");
        } else {
            return buffer.toString().replace(/\s+$/g, "");
        }

        /*
        const result = iconv.decode(buffer, "Shift_JIS");
        return result.replace(/\s+$/g, "");
        */
    }
};

const md = md_it(options);

md.use(emoji, [{}]);

const default_fence = md.renderer.rules["fence"];

md.renderer.rules["fence"] = function(tokens: md_it.Token[], index: number, options: any, env: any, self: md_it.Renderer): void {
    const token = tokens[index];
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : "";
    let langName = "";

    if (info) {
        langName = info.split(/\s+/g)[0];
    }

    if (langName === "math") {
        // return "\n$$\n" + md.utils.escapeHtml(token.content) + "\n$$\n";
        return <any>("\n<div class=\"language-math\">$$\n" + token.content + "\n$$</div>\n");
    }

    if (langName === "embed") {
        return <any>(token.content);
    }

    return default_fence(tokens, index, options, env, self);
};

export function compileMarkdown(str: string): string {
    return md.render(str);
}
