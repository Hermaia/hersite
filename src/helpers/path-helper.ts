/// <reference path="../../typings/index.d.ts" />
import * as path from "path";

import { HersiteOptions } from "../options";



export function toDistPath(sourcePath: string, options: HersiteOptions): string {
    const rel = path.relative(options.directories.pages, sourcePath);
    const dest = path.join(options.directories.dests, rel);

    return finalizePath(dest);
}

export function toDistUrl(sourcePath: string): string {
    if (sourcePath.startsWith("http://") || sourcePath.startsWith("https://")) {
        return sourcePath;
    }

    if (sourcePath.startsWith("./") || sourcePath.startsWith("../")) {
        if (sourcePath.endsWith("/README.md")) {
            return sourcePath.replace(/\/README\.md$/i, "/");
        }

        if (sourcePath.endsWith(".md")) {
            return sourcePath.replace(/\.md$/, ".html");
        }

        if (sourcePath.endsWith(".pug")) {
            return sourcePath.replace(/\.pug/, ".html");
        }
    }

    return sourcePath.replace(/README\.md$/i, "index.html").replace(/\.md$/, ".html");
}

export function finalizePath(sourcePath: string): string {
    if (sourcePath.startsWith("http://") || sourcePath.startsWith("https://")) {
        return sourcePath;
    }

    return sourcePath.replace(/README\.md$/i, "index.html")
                     .replace(/\.md$/, ".html")
                     .replace(/\.pug$/, ".html");
}
