import * as vscode from 'vscode';
import * as babelParser from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

export const parseCode = (code: string): string => {
    if (code) {
        try {
            const imports: Array<any> = [];

            const ast = babelParser.parse(code, {
                allowImportExportEverywhere: true,
                allowAwaitOutsideFunction: true,
                allowReturnOutsideFunction: true,
                allowSuperOutsideMethod: true,
                plugins: [
                    'jsx',
                    'flow',
                    'classProperties',
                ]
            });
            traverse(ast, {
                ImportDeclaration: (path) => {
                    imports.push(path);
                    path.replaceWith(
                        imports[0]
                      );
                },
            });
            return generate(ast, {
                
            }, code).code;
        } catch (e) {
            vscode.window.showErrorMessage(e.message);
        }
    }
    return '';
};