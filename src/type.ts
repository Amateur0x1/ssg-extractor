export type SSGType = 'MdBook' | 'Docusaurus' | 'Unknown';

export interface DocumentNode {
    path: string;
    title: string;
    currentLevel: number;
}

export interface MdBookDocumentNode extends DocumentNode {
    type: 'part' | 'numbered' | 'prefix' | 'suffix' | 'title';
}

// TODO: DocusaurusDocumentNode
export interface DocusaurusDocumentNode extends DocumentNode {}