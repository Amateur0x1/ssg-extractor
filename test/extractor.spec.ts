import { expect } from 'chai';
import { createExtractor } from '../src';
import { DocumentNode } from '../src/type';

describe('Test for MdBook', function () {
  it('should get the type of the project', function () {
    const extractor = createExtractor(
      './test/data/rareskills-solana-course-main'
    );
    expect(extractor.ssgType).to.equal('MdBook');
  });
  it('should get the document library path', function () {
    const extractor = createExtractor(
      './test/data/rareskills-solana-course-main'
    );
    expect(extractor.docSourcePath).to.equal('src/zh-cn');
  });
  it('should extract document structure including paths and titles', function () {
    const extractor = createExtractor(
      './test/data/rareskills-solana-course-main'
    );

    const documentStructure = extractor.documentStructure;
    console.log(documentStructure);
  });
});
