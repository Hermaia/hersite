import { readHersiteOptions, PageOptions } from "./options";

import { HersiteBuilder } from "./build/builder";
import { AssetBuilder } from "./build/pages/asset";
import { MarkdownBuilder } from "./build/pages/md";
import { PugBuilder } from "./build/pages/pug";
import { HtmlBuilder } from "./build/pages/html";


export function buildHersite(callback: (error: any, source: string) => void): void {
    const options = readHersiteOptions();

    const builder = new HersiteBuilder(options, [
        new MarkdownBuilder(options),
        new PugBuilder(options),
        new AssetBuilder(options),
        new HtmlBuilder(options),
    ]);

    builder.build((error: any, source: string) => {
        if (error) {
            callback(error, source);
        }
    });
}
