import * as vscode from 'vscode';

/**
 * __init__.py の __all__ を整形するメイン関数
 */
export function formatInitAll(editor: vscode.TextEditor) {
    const document = editor.document;

    // __init__.py 以外では動作しない
    if (!document.fileName.endsWith('__init__.py')) {
        vscode.window.showErrorMessage(
            vscode.l10n.t('This command only works on __init__.py files.')
        );
        return;
    }

    const text = document.getText();

    // 抽出されたインポート名を格納する配列（出現順を保持、重複チェックなし）
    const importedNames: string[] = [];

    // 補助関数: "A as B" からエイリアス名（B）または元の名前（A）を取り出す
    function extractNames(rawStr: string): string[] {
        return rawStr
            .split(/[\n,]/)
            .map(s => s.trim())
            .filter(Boolean)
            .map(item => {
                // "item as alias" の場合は alias を取得
                const parts = item.split(/\s+as\s+/);
                return parts[parts.length - 1].trim();
            })
            .filter(name => name.length > 0);
    }

    // インポート文をファイル上からの出現順にスキャンする正規表現
    // 1: from ... import (...)  （複数行括弧付き）
    // 2: from ... import ...    （単行・括弧なし）
    // 3: import ...             （通常の import）
    const importRegex = new RegExp(
        "from\\s+\\.?[\\w\\.]+\\s+import\\s*\\(([\\s\\S]*?)\\)|" +
        "^from\\s+\\.?[\\w\\.]+\\s+import\\s+([^\\(\\n]+)|" +
        "^import\\s+([^\\n]+)",
        "gm"
    );

    let match: RegExpExecArray | null;

    while ((match = importRegex.exec(text)) !== null) {
        if (match[1]) {
            // 1. from ... import (...) の複数行パターン
            importedNames.push(...extractNames(match[1]));
        } else if (match[2]) {
            // 2. from ... import ... の単行パターン
            importedNames.push(...extractNames(match[2]));
        } else if (match[3]) {
            // 3. import ... のパターン
            const rawModules = match[3].split(',');
            for (const rawMod of rawModules) {
                const parts = rawMod.trim().split(/\s+as\s+/);
                const name = parts[parts.length - 1].trim().split('.')[0];
                if (name) {
                    importedNames.push(name);
                }
            }
        }
    }

    if (importedNames.length === 0) {
        vscode.window.showInformationMessage(
            vscode.l10n.t('No imports found to format.')
        );
        return;
    }

    // __all__ の文字列を定義順（ダブルクォート）で構築
    let allLine = "__all__ = [\n";
    for (const name of importedNames) {
        allLine += '    "' + name + '",\n';
    }
    allLine += "]\n";

    // 既存の __all__ ブロックをすべて検出する正規表現（複数があっても多重にならないよう全体をカバー）
    const allRegex = /^__all__\s*=\s*\[[\s\S]*?\]/gm;
    const matches = Array.from(text.matchAll(allRegex));

    const edit = new vscode.WorkspaceEdit();

    if (matches.length > 0) {
        // 最初の __all__ の位置を基準にして、そこを新しいブロックに置き換える
        const firstMatch = matches[0];
        const startPos = document.positionAt(firstMatch.index!);

        // 2つ目以降の古い __all__ 定義が存在する場合は、それらも含めてまとめて置換範囲に含める（多重定義を完全防止）
        const lastMatch = matches[matches.length - 1];
        const endPos = document.positionAt(lastMatch.index! + lastMatch[0].length);

        edit.replace(document.uri, new vscode.Range(startPos, endPos), allLine);
    } else {
        // __all__ が存在しない場合はファイル末尾に追加
        const end = document.lineAt(document.lineCount - 1).range.end;
        edit.insert(document.uri, end, "\n" + allLine);
    }

    vscode.workspace.applyEdit(edit);
    vscode.window.showInformationMessage(
        vscode.l10n.t('__all__ formatted successfully.')
    );
}