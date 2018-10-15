import * as t from '@babel/types';

import { isAbsoluteImport, isRelativeImport, isStyleImport } from './utils';

export const sort = (imports: Array<t.ImportDeclaration>) => {
    // sort here
    const absoluteImports: Array<t.ImportDeclaration> = [];
    const relativeImports: Array<t.ImportDeclaration> = [];
    const stylesImports: Array<t.ImportDeclaration> = [];

    imports.forEach((importDeclaration) => {
        if (isAbsoluteImport(importDeclaration)) {
            absoluteImports.push(importDeclaration);
        }

        if (isRelativeImport(importDeclaration)) {
            relativeImports.push(importDeclaration);
        }
    });

    return [
        ...absoluteImports,
        ...relativeImports,
    ];
};