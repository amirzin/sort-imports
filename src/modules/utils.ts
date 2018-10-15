import * as t from '@babel/types';

export const isAbsoluteImport = (importDeclaration: t.ImportDeclaration): boolean => {
    return !isRelativeImport(importDeclaration);
};

export const isRelativeImport = (importDeclaration: t.ImportDeclaration): boolean => {
    return importDeclaration.source.value.indexOf(".") === 0;
};

export const isStyleImport = (importDeclaration: t.ImportDeclaration) => {

};