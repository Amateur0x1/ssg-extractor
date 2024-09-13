import { Extractor } from './extractor';
import { DocumentNode } from '../type';

//TODO: Support Docusaurus
export class DocusaurusExtractor extends Extractor {
  protected getDocumentLibraryPath(): string {
    return 'docs';
  }
  protected getDocumentStructure(): DocumentNode[] {
    return [];
  }
}
