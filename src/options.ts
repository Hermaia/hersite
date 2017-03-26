import * as path from "path";
import * as fs from "fs";

export interface PageOptions {
    title?: string;
}

export interface HersiteDirectoryOptions {
    pages?: string;
    templates?: string;
    dests?: string;
}

export interface HersiteOptions {
    directories?: HersiteDirectoryOptions;

    assetExts?: string[];
}


export function readHersiteOptions(): HersiteOptions {
    const defaultOptions: HersiteOptions = {
        directories: {
            pages: "./_pages/",
            templates: "./_templates/",
            dests: "./docs/",
        },
        assetExts: [".jpg", ".png", ".svg", ".mp3", ".jpeg"],
    };

    try {
        const f = fs.readFileSync("./hersite.json", "utf8");
        const d = <HersiteOptions>JSON.parse(f);

        return {
            directories: {
                pages: (d && d.directories && d.directories.pages) || defaultOptions.directories.pages,
                templates: (d && d.directories && d.directories.templates) || defaultOptions.directories.templates,
                dests: (d && d.directories && d.directories.dests) || defaultOptions.directories.dests,
            },
            assetExts: (d && d.assetExts) || defaultOptions.assetExts,
        };
    } catch (e) {
        return defaultOptions;
    }
}
