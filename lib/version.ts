import * as path from "path";
import * as fs from "fs";


export function getVersion(): string {
    try {
        const package_json = path.join(path.dirname(__dirname), "package.json");
        const file = fs.readFileSync(package_json, {
            encoding: "utf8",
        });
        const data = JSON.parse(file);

        return <string>data.version;
    } catch (e) {
        console.error(e);
        return "Error";
    }
}
