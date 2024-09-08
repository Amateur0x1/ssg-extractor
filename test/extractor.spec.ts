import { expect } from 'chai';
import { createExtractor } from '../src';

describe('Test for MdBook', function() {
  it('should get the type of the project', function() {
    const extractor = createExtractor('./test/data/rareskills-solana-course-main');
    expect(extractor.ssgType).to.equal('MdBook');
  });
  it('should get the document library path', function() {
    const extractor = createExtractor('./test/data/rareskills-solana-course-main');
    expect(extractor.getDocumentLibraryPath()).to.equal('src/zh-cn');
  });
});