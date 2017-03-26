import { HersiteOptions, PageOptions } from "../../options";


export class PageBuilder {
    protected hersiteOptions: HersiteOptions;

    constructor(options: HersiteOptions) {
        this.hersiteOptions = options;
    }

    public useThisBuilder(sourcePath: string): boolean {
        return false;
    }

    public build(sourcePath: string, destPath: string, callback: (error: any) => void): void {
    }
}
