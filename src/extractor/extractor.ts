import { DocumentNode, IExtractor, SSGType } from '../type';

export abstract class Extractor implements IExtractor {
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
