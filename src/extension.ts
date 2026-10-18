import * as vscode from 'vscode';
import { formatInitAll } from './formatter';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "python-init-formatter" is now active!');

    const disposable = vscode.commands.registerCommand(
        'python-init-formatter.formatInitAll',
        async (uri?: vscode.Uri) => {
            let targetEditor = vscode.window.activeTextEditor;

            // エクスプローラーの右クリックから渡された場合
            if (uri) {
                const document = await vscode.workspace.openTextDocument(uri);
                targetEditor = await vscode.window.showTextDocument(document);
            }

            if (!targetEditor) {
                vscode.window.showErrorMessage(
                    vscode.l10n.t('No active editor or file found.')
                );
                return;
            }

            formatInitAll(targetEditor);
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
