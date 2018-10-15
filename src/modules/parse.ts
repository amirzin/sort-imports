import * as vscode from 'vscode';
import * as babelParser from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

import { sort } from './sort';

export const parseCode = (code: string): string => {
    if (code) {
        try {
            let imports: Array<t.ImportDeclaration> = [];

            const ast = babelParser.parse(code, {
                allowImportExportEverywhere: true,
                allowAwaitOutsideFunction: true,
                allowReturnOutsideFunction: true,
                allowSuperOutsideMethod: true,
                sourceType: "module",
                plugins: [
                    'jsx',
                    'flow',
                    'classProperties',
                    "doExpressions",
                    "objectRestSpread",
                    'decorators-legacy',
                    "classProperties",
                    "classPrivateProperties",
                    "classPrivateMethods",
                    "exportDefaultFrom",
                    "exportNamespaceFrom",
                    "asyncGenerators",
                    "functionBind",
                    "functionSent",
                    "dynamicImport",
                    "numericSeparator",
                    "optionalChaining",
                    "importMeta",
                    "bigInt",
                    "optionalCatchBinding",
                    "throwExpressions",
                    'nullishCoalescingOperator',
                ]
            });
            traverse(ast, {                
                ImportDeclaration: (path) => {
                    if (path.isImportDeclaration()) {                        
                        imports.push(path.node);
                        path.remove();
                    }
                },
            });
            traverse(ast, {
                Program: (path) => {
                    imports = sort(imports);
                    path.node.body.unshift(...imports);
                }
            });
            return generate(ast, {}, code).code;
        } catch (e) {
            vscode.window.showErrorMessage(e.message);
        }
    }
    return '';
};