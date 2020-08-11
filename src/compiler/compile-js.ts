import { transformAsync } from '@babel/core';
import { readFileSync, removeSync, outputFileSync } from 'fs-extra';
import { replaceExt } from '../utils';

export function compileJs(filePath: string): Promise<undefined> {
    return new Promise((resolve, reject) => {
        let code = readFileSync(filePath, 'utf-8');

        transformAsync(code, { filename: filePath })
            .then((result) => {
                if (result) {
                    const jsFilePath = replaceExt(filePath, '.js');

                    removeSync(filePath);
                    outputFileSync(jsFilePath, result.code);
                    resolve();
                }
            })
            .catch(reject);
    });
}
