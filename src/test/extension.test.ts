import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

suite('Python Init Formatter Test Suite', () => {
    vscode.window.showInformationMessage('Start python-init-formatter tests.');

    test('Extension should be present and register command', async () => {
        // 拡張機能自体が正しくロードされているか確認
        const ext = vscode.extensions.getExtension('jcc00456biz.python-init-formatter');
        assert.ok(ext, 'Extension should exist');

        await ext?.activate();

        // 登録されているコマンドの中にターゲットが含まれているか確認
        const commands = await vscode.commands.getCommands(true);
        assert.ok(
            commands.includes('python-init-formatter.formatInitAll'),
            'Command python-init-formatter.formatInitAll should be registered'
        );
    });
	test('Should format __init__.py correctly', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            assert.fail('No workspace folder found for testing.');
        }
        const rootPath = workspaceFolders[0].uri.fsPath;
        const initFilePath = path.join(rootPath, '__init__.py');
        const sampleModulePath = path.join(rootPath, 'sample_module.py');

        try {
            // テスト用ファイルの作成
            fs.writeFileSync(sampleModulePath, '# sample module');
            fs.writeFileSync(initFilePath, 'from .sample_module import sample_module\n');

            // ファイルを開いてアクティブにする
            const doc = await vscode.workspace.openTextDocument(initFilePath);
            await vscode.window.showTextDocument(doc);

            // フォーマットコマンドを実行
            await vscode.commands.executeCommand('python-init-formatter.formatInitAll');

            // 処理が完了するまで少し待機
            await new Promise(resolve => setTimeout(resolve, 800));

            // ★ ディスクからではなく、現在開いているドキュメントのテキストを取得して検証
            const editorText = doc.getText();

            // または、もしディスク上の最新を読みたい場合は save() を呼ぶか、doc.getText() を使う
            assert.ok(
                editorText.includes('__all__'),
                'The document text should contain __all__ after formatting.'
            );
        } finally {
            // クリーンアップ
            if (fs.existsSync(initFilePath)) { fs.unlinkSync(initFilePath); }
            if (fs.existsSync(sampleModulePath)) { fs.unlinkSync(sampleModulePath); }
        }
    });
});
