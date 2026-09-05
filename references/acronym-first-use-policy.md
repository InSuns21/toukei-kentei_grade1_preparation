# 略称のページ内初出ルール

この文書は `textbook/`、`statistical-mathematics/`、`applied-rikou-80/`、`anki/` の学習者向け本文で使う英字略称の初出規約です。

## 原則

略称は **Markdown ページごとにリセット**して扱います。

同じ略称を別ページですでに説明していても、そのページでは再び正式名を示します。読者が前ページを読んでいることを前提にしません。

略称を本文で使う場合、そのページでの最初の使用は原則として次の形にします。

```text
日本語正式名（English Full Name; 略称）
```

例：

```text
単調収束定理（Monotone Convergence Theorem; MCT）
Lebesgueの優収束定理（Dominated Convergence Theorem; DCT）
中心極限定理（Central Limit Theorem; CLT）
通常最小二乗法（Ordinary Least Squares; OLS）
ほとんど至る所（almost everywhere; a.e.）
```

初出でこの3点を揃えた後は、そのページ内では略称だけを使って構いません。

1. 日本語正式名
2. 英語正式名
3. 略称

日本語教材なので主表記は日本語正式名です。略称だけを見出しや説明の起点にしないでください。

## CI の考え方

既存教材には歴史的に略称だけで始まるページがあるため、全ページを一度に strict にすると既存負債だけで CI が停止します。

そこで CI は **ラチェット方式**にします。

- PR / push で変更された Markdown ページを対象にする。
- 変更行だけではなく、そのページ全体を読み直す。
- 登録済み略称について、そのページ内の最初の読者向け使用を検査する。
- 初出行に日本語正式名と英語正式名がなければ CI を失敗させる。
- したがって古いページでも、一度編集対象になればこの規約へ引き上げられる。

ローカルでは次を使えます。

```bash
npm run audit:acronym-first-use
npm run validate:acronym-first-use
npm run validate:acronym-first-use:changed
```

## CI 対象の略称

正本は `scripts/audit_acronym_first_use.mjs` の registry です。

初期 registry には、既存の用語 CI が扱っていた主要略称に加え、収束定理で頻出する MCT / DCT / a.e. を含めます。例として PMF、PDF、CDF、MGF、MLE、LRT、UMP、UMPU、UMVU、CI、SE、MSE、CLT、LLN、OLS、GLS、ANOVA、ANCOVA、GLM、SVD、PCA、MCT、DCT、a.e. などです。

新しい非自明な略称を教材の標準語彙として導入する場合は、本文だけでなく registry にも日本語正式名と英語正式名を追加してください。

## 検査から除外するもの

CI は読者向け本文の略称を対象にし、次は自動検査から除外します。

- fenced code block
- inline code
- 数式ブロック・インライン数式
- URL
- HTML コメント
- 安定 ID 等のメタデータ

数式中に略称が出る場合でも、本文側で読者が意味を知れるように説明するのが原則です。

## 例外

同じ綴りが別の意味で使われ、registry の意味ではないことが明白な場合だけ、ページ内に次のコメントを置いて個別に除外できます。

```html
<!-- acronym-first-use-ignore: CI -->
```

複数ならカンマ区切りです。

```html
<!-- acronym-first-use-ignore: CI, LR -->
```

この例外は「説明が面倒だから」使うものではありません。略称の同形衝突など、registry の意味と異なる場合に限定します。

## レビュー時の確認

自動検査の registry にまだ入っていない略称についても、レビューでは同じ原則を適用します。

新しいページで読者が「その英字は何の略か」を推測しなければならない状態を残さないことを基準にします。
