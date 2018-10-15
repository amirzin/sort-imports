'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { parseCode } from './modules/parse';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "react-imports-sorter" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        const activeTextEditor = vscode.window.activeTextEditor;

        if (activeTextEditor) {
            const code = activeTextEditor.document.getText();
            writeCode(parseCode(code));
        }
    });

    context.subscriptions.push(disposable);
}

const writeCode = (newCode: string = ''): void => {
    let activeTextEditor = vscode.window.activeTextEditor;

    if (activeTextEditor) {
        activeTextEditor.edit((edit: vscode.TextEditorEdit): void => {
            if (activeTextEditor) {
                edit.replace(
                    new vscode.Range(
                        new vscode.Position(0, 0),
                        new vscode.Position(activeTextEditor.document.getText().length, 0)
                    ),
                    newCode
                );
            }
        });
    }
};

export const sortImports = (code?: string): string => {
    // Display a message box to the user
    if (code) {
        vscode.window.showInformationMessage(code.substr(0, 6));
    }

    // Sort here

    return code || '';
};

// this method is called when your extension is deactivated
export function deactivate() {
}