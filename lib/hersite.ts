import { globalHelp, buildHelp, checkHelp } from "./help";
import { buildHersite } from "../src/build";
import { cleanHersite } from "../src/clean";


(function() {
    "use strict";
    const args = process.argv;

    if (args.length < 3) {
        console.log(globalHelp);
        return;
    }

    switch (args[2]) {
        case "build":
            buildHersite(function(error: any, source: string) {
                console.log(source);

                if (error) {
                    console.error(source);
                    console.error(error);

                    process.exitCode = 1;
                }
            });
            return;

        case "check":
            console.error("this command is not implemented");
            return;

        case "clean":
            console.error("this command is not implemented");
            return;

        case "--version":
            console.log(`0.0.6`);
            process.exitCode = 0;
            return;

        case "help":
            if (4 <= args.length) {
                switch (args[3]) {
                    case "build":
                        console.log(buildHelp);
                        process.exitCode = 0;
                        return;

                    case "check":
                        console.log(checkHelp);
                        process.exitCode = 0;
                        return;

                    default:
                        return;
                }
            } else {
                console.log(globalHelp);
                process.exitCode = 0;
                return;
            }

        default:
            console.log(globalHelp);
            return;
    }
})();
