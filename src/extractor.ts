import path from "path";
import { SSGType } from "./type";
import { detectSSGType } from "./utils";
import fs from "fs";
import toml, { AnyJson } from "@iarna/toml";

abstract class Extractor {
    abstract getDocumentLibraryPath(): string;
    ssgType: SSGType;
    rootSourcePath: string;
    constructor(rootSourcePath: string, ssgType: SSGType) {
        this.rootSourcePath = rootSourcePath;
        this.ssgType = ssgType;
    }
}

class MdBookExtractor extends Extractor {
    getDocumentLibraryPath(): string {
        const bookTomlPath = path.join(this.rootSourcePath, 'book.toml');
        const bookTomlContent = fs.readFileSync(bookTomlPath, 'utf8');
        const bookToml = toml.parse(bookTomlContent);
        const srcDir = (bookToml.book as { src: string }).src;
        return srcDir;
    }
}

//TODO: Support Docusaurus
class DocusaurusExtractor extends Extractor {
    getDocumentLibraryPath(): string {
        return 'docs';
    }
}

class UnknownExtractor extends Extractor {
    ssgType: SSGType = 'Unknown';
    getDocumentLibraryPath(): string {
        throw new Error("Unknown SSGType does not support library path extraction");
    }
}

function createExtractor(projectRoot: string): Extractor {
    const ssgType = detectSSGType(projectRoot);
    switch (ssgType) {
        case 'MdBook':
            return new MdBookExtractor(projectRoot, ssgType);
        case 'Docusaurus':
            return new DocusaurusExtractor(projectRoot, ssgType);
        default:
            return new UnknownExtractor(projectRoot, ssgType);
    }
}

export default createExtractor;