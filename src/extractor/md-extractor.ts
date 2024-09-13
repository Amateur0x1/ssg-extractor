import path from 'path';
import { MdBookDocumentNode } from '../type';
import fs from 'fs';
import toml from '@iarna/toml';
import { Extractor } from './extractor';
import {
  INumberedLine,
  IPartLine,
  IXfixLine,
  ITitleLine,
} from './mdbook-line-type';
import { normalizeSpaces } from '../utils/utils';

export class MdBookExtractor extends Extractor {
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
    let matchedLineSpaceNumbers = [0];

    lines.forEach((line, index, lines) => {
      // Match a numbered node with leading spaces, title, path
      const numberedMatch = line.match(/^(\s*)- \[(.*?)\]\((.*?)\)/);
      if (
        !numberedMatch ||
        numberedMatch.length !== 4 ||
        !numberedMatch[2].trim() ||
        !numberedMatch[3].trim()
      ) {
        return;
      }
      const currentSpacesNumber = numberedMatch[1].length;

      for (let i = matchedLineSpaceNumbers.length - 1; i >= 0; i--) {
        const previousIndentLevel = structure[i - 1]?.currentLevel ?? 0;
        const spacesNumberDiff =
          currentSpacesNumber - matchedLineSpaceNumbers[i];
        if (previousIndentLevel === 0) {
          if (spacesNumberDiff <= 3) {
            const currentIndentLevel = previousIndentLevel + 1;
            matchedLineSpaceNumbers.push(currentSpacesNumber);
            structure.push({
              title: numberedMatch[2],
              path: path.join(srcDir, numberedMatch[3]),
              type: 'part',
              currentLevel: currentIndentLevel,
            });
          }
          return;
        } else {
          if (spacesNumberDiff >= 2 && spacesNumberDiff <= 5) {
            const currentIndentLevel = previousIndentLevel + 1;
            matchedLineSpaceNumbers.push(currentSpacesNumber);
            structure.push({
              title: numberedMatch[2],
              path: path.join(srcDir, numberedMatch[3]),
              type: 'numbered',
              currentLevel: currentIndentLevel,
            });
            return;
          } else {
            continue;
          }
        }
      }
    });

    return structure;
  }

  // TODO
  // according to https://hellowac.github.io/mdbook-doc-zh/zh-cn/format/summary.html
  private detectLineType(
    line: string
  ): INumberedLine | ITitleLine | IPartLine | IXfixLine | IPartLine | null {
    const numberedMatchPattern = /^(\s+)- \[\s*(\S.*\S)\s*\]\(\s*(\S.*\S)\s*\)/;
    const xfixMatchPattern = /^\[\s*(\S.*\S)\s*\]\(\s*(\S.*\S)\s*\)/;
    const partMatchPattern = /^- \[\s*(\S.*\S)\s*\]\(\s*(\S.*\S)\s*\)/;
    const titleMatchPattern = /^#\s+(\S.*\S)\s*$/;

    const titleMatchedContent = line.match(titleMatchPattern);
    if (titleMatchedContent && titleMatchedContent[1]) {
      const matchedLine: ITitleLine = {
        title: normalizeSpaces(titleMatchedContent[1]),
      };
      return matchedLine;
    } else if (titleMatchPattern) {
      return null;
    }

    const xfixMatchedContent = line.match(xfixMatchPattern);
    if (xfixMatchedContent && xfixMatchedContent[1] && xfixMatchedContent[2]) {
      const matchedLine: IXfixLine = {
        title: normalizeSpaces(xfixMatchedContent[1]),
        path: xfixMatchedContent[2],
      };
      return matchedLine;
    } else if (xfixMatchedContent && xfixMatchedContent[1]) {
      const matchedLine: IXfixLine = {
        title: xfixMatchedContent[1],
        path: null,
      };
      return matchedLine;
    } else if (xfixMatchedContent) {
      return null;
    }

    const partMatchedContent = line.match(partMatchPattern);
    if (partMatchedContent && partMatchedContent[1] && partMatchedContent[2]) {
      const matchedLine: IPartLine = {
        title: normalizeSpaces(partMatchedContent[1]),
        path: partMatchedContent[2],
      };
      return matchedLine;
    } else if (partMatchedContent && partMatchedContent[1]) {
      const matchedLine: IPartLine = {
        title: normalizeSpaces(partMatchedContent[1]),
        path: null,
      };
      return matchedLine;
    } else if (partMatchedContent) {
      return null;
    }

    const numberedMatchedContent = line.match(numberedMatchPattern);
    if (
      numberedMatchedContent &&
      numberedMatchedContent[1] &&
      numberedMatchedContent[2] &&
      numberedMatchedContent[3]
    ) {
      const matchedLine: INumberedLine = {
        spacesNumber: numberedMatchedContent[1].length,
        title: normalizeSpaces(numberedMatchedContent[2]),
        path: numberedMatchedContent[3],
      };
      return matchedLine;
    } else if (
      numberedMatchedContent &&
      numberedMatchedContent[1] &&
      numberedMatchedContent[2]
    ) {
      const matchedLine: INumberedLine = {
        spacesNumber: numberedMatchedContent[1].length,
        title: normalizeSpaces(numberedMatchedContent[2]),
        path: null,
      };
      return matchedLine;
    }

    return null;
  }
}
