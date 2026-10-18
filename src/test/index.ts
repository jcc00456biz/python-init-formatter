import * as path from 'path';
import Mocha from 'mocha';
import { glob } from 'glob';

export async function run(): Promise<void> {
    // Mocha インスタンスの作成
    const mocha = new Mocha({
        ui: 'tdd',
        color: true
    });

    const testsRoot = path.resolve(__dirname, '.');

    return new Promise(async (resolve, reject) => {
        try {
            // glob v10以降の非同期呼び出しに対応
            const files = await glob('**/**.test.js', { cwd: testsRoot });

            // テストファイルを Mocha に追加
            files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

            // テストの実行
            mocha.run((failures: number) => {
                if (failures > 0) {
                    reject(new Error(`${failures} tests failed.`));
                } else {
                    resolve();
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}