export type SSGType = 'MdBook' | 'Docusaurus' | 'Unknown';

export interface DocumentNode {
  path: string;
  title: string;
  currentLevel: number;
}

export interface IExtractor {
  ssgType: SSGType;
  rootSourcePath: string;
  docSourcePath: string;
  documentStructure: DocumentNode[];
}

export interface MdBookDocumentNode extends DocumentNode {
  type: 'part' | 'numbered' | 'prefix' | 'suffix' | 'draft' | 'unknown';
}

// TODO: DocusaurusDocumentNode
export interface DocusaurusDocumentNode extends DocumentNode {}
