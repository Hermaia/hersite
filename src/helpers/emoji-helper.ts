/// <reference path="../../typings/index.d.ts" />

import * as emoji from "node-emoji";


export function emojify(source: string): string {
    return emoji.emojify(source);
}
