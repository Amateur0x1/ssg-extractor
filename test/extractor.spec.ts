import { expect } from 'chai';
import { createExtractor } from '../src';
import { DocumentNode } from '../src/type';

describe('Test for MdBook', function() {
  it('should get the type of the project', function() {
    const extractor = createExtractor('./test/data/rareskills-solana-course-main');
    expect(extractor.ssgType).to.equal('MdBook');
  });
  it('should get the document library path', function() {
    const extractor = createExtractor('./test/data/rareskills-solana-course-main');
    expect(extractor.docSourcePath).to.equal('src/zh-cn');
  });
  it('should extract document structure including paths and titles', function() {
    const extractor = createExtractor('./test/data/rareskills-solana-course-main');
    const expectedStructure: Partial<DocumentNode>[] = [
      { path: 'src/zh-cn/README.md', title: '序言' },
      { path: 'src/zh-cn/chapter_1.md', title: '第 1 天' },
      { path: 'src/zh-cn/chapter_2.md', title: '第 2 天' },
      { path: 'src/zh-cn/chapter_3.md', title: '第 3 天' },
      { path: 'src/zh-cn/chapter_4.md', title: '第 4 天' },
      { path: 'src/zh-cn/chapter_5.md', title: '第 5 天' },
      { path: 'src/zh-cn/chapter_6.md', title: '第 6 天' },
      { path: 'src/zh-cn/chapter_7.md', title: '第 7 天' },
      { path: 'src/zh-cn/chapter_8.md', title: '第 8 天' },
      { path: 'src/zh-cn/chapter_9.md', title: '第 9 天' },
      { path: 'src/zh-cn/chapter_10.md', title: '第 10 天' },
      { path: 'src/zh-cn/chapter_11.md', title: '第 11 天' },
      { path: 'src/zh-cn/chapter_12.md', title: '第 12 天' },
      { path: 'src/zh-cn/chapter_13.md', title: '第 13 天' },
      { path: 'src/zh-cn/chapter_14.md', title: '第 14 天' },
      { path: 'src/zh-cn/chapter_15.md', title: '第 15 天' },
      { path: 'src/zh-cn/chapter_16.md', title: '第 16 天' },
      { path: 'src/zh-cn/chapter_17.md', title: '第 17 天' },
      { path: 'src/zh-cn/chapter_18.md', title: '第 18 天' },
      { path: 'src/zh-cn/chapter_19.md', title: '第 19 天' },
      { path: 'src/zh-cn/chapter_20.md', title: '第 20 天' },
      { path: 'src/zh-cn/chapter_21.md', title: '第 21 天' },
      { path: 'src/zh-cn/chapter_22.md', title: '第 22 天' },
      { path: 'src/zh-cn/chapter_23.md', title: '第 23 天' },
      { path: 'src/zh-cn/chapter_24.md', title: '第 24 天' },
      { path: 'src/zh-cn/chapter_25.md', title: '第 25 天' },
      { path: 'src/zh-cn/chapter_26.md', title: '第 26 天' },
      { path: 'src/zh-cn/chapter_27.md', title: '第 27 天' },
      { path: 'src/zh-cn/chapter_28.md', title: '第 28 天' },
      { path: 'src/zh-cn/chapter_29.md', title: '第 29 天' },
      { path: 'src/zh-cn/chapter_30.md', title: '第 30 天' },
      { path: 'src/zh-cn/chapter_31.md', title: '第 31 天' },
      { path: 'src/zh-cn/chapter_32.md', title: '第 32 天' },
      { path: 'src/zh-cn/chapter_33.md', title: '第 33 天' },
    ];

    const documentStructure = extractor.documentStructure;
    console.log(documentStructure)
  });
});