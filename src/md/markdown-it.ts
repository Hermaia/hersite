/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../typings/markdown-it-emoji/markdown-it-emoji.d.ts" />
import { Options } from "markdown-it";
import * as emoji from "markdown-it-emoji";
import * as escape from "escape-html";


const options: Options = {
    highlight: function(code: string, lang: string, callback?: Function): string {
        if (lang === "text") {
          return escape(code);
        }

        let result: string = require('child_process').spawnSync(
                'pygmentize', [
                '-l', lang,
                '-f', 'html',
                '-O', 'nowrap=1'
                ], { input: code }
            ).stdout.toString().replace(/\s+$/g,'');
        return result;
    }
};


export function markdown(str: string): string {
    const md = require('markdown-it')(options)

    md.use(emoji, [{}]);

    return md.render(str)
}
