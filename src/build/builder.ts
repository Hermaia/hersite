/// <reference path="../../typings/index.d.ts" />

import { HersiteOptions, PageOptions } from "../options";
import { PageBuilder } from "./pages/page";

import { getFiles } from "./helpers/file";

export class HersiteBuilder {
    private _options: HersiteOptions;
    private _builders: PageBuilder[];

    constructor(options: HersiteOptions, builders: PageBuilder[]) {
        this._options = options;
        this._builders = builders;
    }

    public enumerateFiles() {
    }

    public build() {
        const that: HersiteBuilder = this;

        getFiles(this._options.directories.pages, (err: NodeJS.ErrnoException, source: string) => {
            that._builders.forEach((builder: PageBuilder) => {
                if (builder.useThisBuilder(source)) {

                }
            });
        });
    }
}
