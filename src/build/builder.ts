import { HersiteOptions, PageOptions } from "../options";
import { PageBuilder } from "./pages/page";

import { getFiles } from "./helpers/file";
import { createDestPath } from "./helpers/path";

export class HersiteBuilder {
    private _options: HersiteOptions;
    private _builders: PageBuilder[];

    constructor(options: HersiteOptions, builders: PageBuilder[]) {
        this._options = options;
        this._builders = builders;
    }

    public enumerateFiles() {
    }

    public build(callback: (error: any, source: string) => void) {
        const that: HersiteBuilder = this;

        getFiles(this._options.directories.pages, (err: NodeJS.ErrnoException, sourcePath: string) => {
            that._builders.forEach((builder: PageBuilder) => {
                if (!builder.useThisBuilder(sourcePath)) {
                    return;
                }

                const destPath = createDestPath(sourcePath, that._options);

                builder.build(sourcePath, destPath, (error: any) => {
                    callback(error, sourcePath);
                });
            });
        });
    }
}
