/// <reference path="../typings/index.d.ts" />
import * as path from "path";
import * as fs from "fs";

export interface PageOptions {
    title?: string;
    useMathjax?: boolean;
    isDraft?: boolean;
}

export interface HersiteDirectoryOptions {
    pages?: string;
    templates?: string;
    dests?: string;
}

export interface HersiteOptions {
    directories?: HersiteDirectoryOptions;
    defaultPageOption?: PageOptions;

    assetExts?: string[];
}


export function readHersiteOptions(): HersiteOptions {
    const defaultOptions: HersiteOptions = {
        directories: {
            pages: "./_pages/",
            templates: "./_templates/",
            dests: "./docs/",
        },
        defaultPageOption: {
            title: "Hersite Page",
            useMathjax: false,
            isDraft: true,
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
            defaultPageOption: {
                title: (d && d.defaultPageOption && d.defaultPageOption.title) || defaultOptions.defaultPageOption.title,
                useMathjax: (d && d.defaultPageOption && d.defaultPageOption.useMathjax) || defaultOptions.defaultPageOption.useMathjax,
                isDraft: (d && d.defaultPageOption && d.defaultPageOption.isDraft) || defaultOptions.defaultPageOption.isDraft,
            },
            assetExts: (d && d.assetExts) || defaultOptions.assetExts,
        };
    } catch (e) {
        return defaultOptions;
    }
}



export function getPageOptions(source: string): { code: string, options: PageOptions } {
    const def: PageOptions = {
        title: "Hermaia",
        useMathjax: false,
    };
    const divided = source.split("================================================================================");

    if (divided.length < 2) {
        return {
            code: source,
            options: def,
        };
    }

    try {
        divided[0].match(/^\`\`\`json([^\`]*)\`\`\`/);
        // const json = divided[0].match(/^\`\`\`json([^\`]*)\`\`\`/);
        const json = RegExp.$1;

//        console.log("JSON");
//        console.log(json);

        return {
            code: divided[1].trim(),
            options: <PageOptions>JSON.parse(json),
        };
    } catch (e) {
        return {
            code: source,
            options: def,
        };
    }
}
