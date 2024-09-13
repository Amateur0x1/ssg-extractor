import { detectSSGType } from '../utils/utils';
import { MdBookExtractor } from './md-extractor';
import { DocusaurusExtractor } from './docusaurus-extractor';
import { UnknownExtractor } from './unknown-extractor';
import { Extractor } from './extractor';

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
