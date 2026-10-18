import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        // 拡張機能の開発者ルートディレクトリのパス
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');

        // テスト用ワークスペースのパス
        const extensionTestsPath = path.resolve(__dirname, './index');

        // VS Code をダウンロードしてテストを実行
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: [extensionDevelopmentPath] // ← これによりワークスペースが開いた状態で起動します
        });
    } catch (err) {
        console.error('Failed to run tests', err);
        process.exit(1);
    }
}

main();
