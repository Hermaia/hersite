/// <reference path="../typings/index.d.ts" />

import { globalHelp } from "./help";

interface HersiteOptions {
}


(function() {
    "use strict";
    const args = process.argv;

    if (args.length < 3) {
        console.log(globalHelp);
        return;
    }

    switch (args[2]) {
        case "build":
            return;
        case "check":
            return;
        case "help":
            if (4 <= args.length) {
                switch (args[3]) {
                    case "build":
                        return;
                    case "check":
                        return;
                    default:
                        return;
                }
            }

            console.log(globalHelp);
            return;

        default:
            console.log(globalHelp);
            return;
    }
})();
