import fs from 'fs';
import path from 'path';
import { SSGType } from './type';

export function detectSSGType(projectRoot: string): SSGType {
    if (fs.existsSync(path.join(projectRoot, 'book.toml'))) {
        return 'MdBook';
    }
    if (fs.existsSync(path.join(projectRoot, 'docusaurus.config.js'))) {
        return 'Docusaurus';
    }
    return 'Unknown';
}