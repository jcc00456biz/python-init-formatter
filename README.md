# Python __init__.py __all__ Formatter

[English](#english) | [日本語](#japanese)

---

## English {#english}

VS Code extension that automatically formats and generates `__all__` in Python `__init__.py` files based on import statements.

### Features

- __Automated `__all__` Generation__: Reads `import` and `from ... import ...` statements in `__init__.py` and generates/updates `__all__`.
- __Duplicate Removal & Sorting__: Automatically deduplicates imported names and sorts them alphabetically.
- __ContextMenu Support__: Easily execute from the right-click context menu in the Explorer or Editor on `__init__.py` files.
- __Internationalization (i18n)__: Fully supports English and Japanese UI/messages.

### Usage

1. Open a Python `__init__.py` file in the editor or select it in the Explorer.
2. Right-click on the file or inside the editor.
3. Select __"Format __all__ in __init__.py"__ from the context menu.
   *(Alternatively, run the `Format __all__ in __init__.py` command from the Command Palette `Ctrl+Shift+P` / `Cmd+Shift+P`)*

### Example

#### Before

```python
from .rm import safe_remove
from .bin import write_bytes
from .comp import cmp_is_equal_fast
from .hash import get_file_hash, comp_file_hash
```

#### After Formatting

```python
from .rm import safe_remove
from .bin import write_bytes
from .comp import cmp_is_equal_fast
from .hash import get_file_hash, comp_file_hash

__all__ = [
    'cmp_is_equal_fast',
    'comp_file_hash',
    'get_file_hash',
    'safe_remove',
    'write_bytes',
]
```

### Requirements

- Visual Studio Code v1.85.0 or higher.

---

## 日本語 {#japanese}

Pythonの `__init__.py` 内のインポート記述を解析し、`__all__` リストを自動生成・整形するVS Code拡張機能です。

### 主な機能

- __`__all__` の自動生成__: `__init__.py` 内の `import` および `from ... import ...` 文を読み込み、アルファベット順にソートされた `__all__` を自動生成・更新します。
- __重複除去__: インポートされた名前の重複を自動的に排除します。
- __コンテキストメニュー対応__: エクスプローラーやエディター上で `__init__.py` を右クリックして簡単に実行できます。
- __多言語対応__: 日本語および英語の表示に対応しています。

### 使い方

1. エディターで `__init__.py` を開くか、エクスプローラー上で対象の `__init__.py` を選択します。
2. エディター内またはエクスプローラー上で右クリックします。
3. メニューから __「__init__.py の __all__ を整形」__ を選択します。
   *(コマンドパレット `Ctrl+Shift+P` / `Cmd+Shift+P` から `__init__.py の __all__ を整形` を実行することも可能です)*

### 実行例

#### 実行前

```python
from .rm import safe_remove
from .bin import write_bytes
from .comp import cmp_is_equal_fast
from .hash import get_file_hash, comp_file_hash
```

#### 整形実行後

```python
from .rm import safe_remove
from .bin import write_bytes
from .comp import cmp_is_equal_fast
from .hash import get_file_hash, comp_file_hash

__all__ = [
    'cmp_is_equal_fast',
    'comp_file_hash',
    'get_file_hash',
    'safe_remove',
    'write_bytes',
]
```

---

## License

[Apache License 2.0](LICENSE)
