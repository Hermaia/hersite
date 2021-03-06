import { HersiteOptions } from "../options";


export function getDefaultHersiteOptions(): HersiteOptions {
    return {
        directories: {
            pages: "./_pages/",
            templates: "./_templates/",
            dests: "./docs/",
        },
        assetExts: [".jpg", ".png", ".svg", ".mp3", ".jpeg"],
    };
}
