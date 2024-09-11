import path from "path";
import { DocumentNode, MdBookDocumentNode, SSGType } from "./type";
import { detectSSGType } from "./utils";
import fs from "fs";
import toml from "@iarna/toml";

abstract class Extractor {
    protected abstract getDocumentLibraryPath(): string;
    protected abstract getDocumentStructure(): DocumentNode[];
    ssgType: SSGType;
    rootSourcePath: string;
    docSourcePath: string;
    documentStructure: DocumentNode[];
    constructor(rootSourcePath: string, ssgType: SSGType) {
        this.rootSourcePath = rootSourcePath;
        this.ssgType = ssgType;
        this.documentStructure = this.getDocumentStructure();
        this.docSourcePath = this.getDocumentLibraryPath();
    }
}

class MdBookExtractor extends Extractor {
    protected getDocumentLibraryPath(): string {
        const bookTomlPath = path.join(this.rootSourcePath, 'book.toml');
        const bookTomlContent = fs.readFileSync(bookTomlPath, 'utf8');
        const bookToml = toml.parse(bookTomlContent);
        const srcDir = (bookToml.book as { src: string }).src;
        return srcDir;
    }

    protected getDocumentStructure(): MdBookDocumentNode[] {
        const srcDir = this.getDocumentLibraryPath();
        const summaryPath = path.join(this.rootSourcePath, srcDir, 'SUMMARY.md');
        const summaryContent = fs.readFileSync(summaryPath, 'utf8');

        const lines = summaryContent.split('\n');
        const structure: MdBookDocumentNode[] = [];
        let spaceNumbers = [0];

        for (const line of lines) {
            const numberedMatch = line.match(/^(\s*)- \[(.*?)\]\((.*?)\)/);
            if (!numberedMatch || numberedMatch.length !== 4) {continue}

            const currentSpaces = numberedMatch[1].length

            for (let i = spaceNumbers.length - 1; i >= 0; i--) {
                const pcl = structure[i-1]?.currentLevel ?? 0
                const diff = currentSpaces - spaceNumbers[i]
                if (pcl === 0) {
                    if (diff <= 3) {
                        const currentLevel = pcl + 1
                        spaceNumbers.push(currentLevel)
                        structure.push({
                            title: numberedMatch[2],
                            path: path.join(srcDir, numberedMatch[3]),
                            type: 'part',
                            currentLevel: currentLevel,
                        });
                    }
                    break
                } else {
                    if (diff >= 2 && diff <= 5) {
                        const currentLevel = pcl + 1
                        spaceNumbers.push(currentLevel)
                        structure.push({
                            title: numberedMatch[2],
                            path: path.join(srcDir, numberedMatch[3]),
                            type: 'numbered',
                            currentLevel: currentLevel,
                        });
                    } else {
                        continue
                    }
                }
            }
        }
        return structure;
    }
}

    


//TODO: Support Docusaurus
class DocusaurusExtractor extends Extractor {
    protected getDocumentLibraryPath(): string {
        return 'docs';
    }
    protected getDocumentStructure(): DocumentNode[] {
        return [];
    }
}

class UnknownExtractor extends Extractor {
    ssgType: SSGType = 'Unknown';
    getDocumentLibraryPath(): string {
        throw new Error("Unknown SSGType does not support library path extraction");
    }
    getDocumentStructure(): DocumentNode[] {
        throw new Error("Unknown SSGType does not support document structure extraction");
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