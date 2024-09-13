import { Extractor } from './extractor';
import { DocumentNode, SSGType } from '../type';

export class UnknownExtractor extends Extractor {
  ssgType: SSGType = 'Unknown';
  getDocumentLibraryPath(): string {
    throw new Error('Unknown SSGType does not support library path extraction');
  }
  getDocumentStructure(): DocumentNode[] {
    throw new Error(
      'Unknown SSGType does not support document structure extraction'
    );
  }
}
