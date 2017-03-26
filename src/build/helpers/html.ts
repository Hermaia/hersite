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

        this._$("a").each(function(i, elem) {
            const $this = that._$(this);
            const href = $this.attr("href");

            if (href) {
                $this.attr("href", createDestUrl(href));
            }
        });

        if (this._$(".language-math").length !== 0) {
            this._$("*").each(function(i, elem) {
                const $this = that._$(this);


                $this.before(`
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$','$'], ["\\\\(","\\\\)"]],
    displayMath: [ ['$$','$$'], ["\\\\[","\\\\]"] ]
  }
});
</script>
<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>
<meta http-equiv="X-UA-Compatible" CONTENT="IE=EmulateIE7" />
`);

                return false;
            });
        }
    }

    public getPageOptions(): PageOptions {
        // title は 1 つ目の h1
        const options: PageOptions = {};

        const h1 = this._$("h1").first();

        options.title = (h1 && h1.text()) || "";

        return options;
    }

    public toHtml(): string {
        return this._$.html();
    }
}
