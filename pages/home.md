# 統計検定1級 対策教材

このサイトは `main` ブランチの教材を GitHub Pages で閲覧するための入口です。問題本文・通常教材・Ankiカードを二重管理せず、リポジトリ側の更新から公開用サイトを自動生成します。

## 教材

- [統計数理 100大問](statistical-mathematics/index.md)
- [統計応用（理工学）80大問](applied-rikou-80/index.md)
- [通常教材（テキストブック）](textbook/index.md)
- <a href="./anki/index.html" data-no-router>Ankiカード</a>

> **発展：DREAM THEATER 数学講座**  
> 測度論・Fourier解析・PDE・Sobolev空間・確率過程・FEM・Monte Carloまで、通常教材の地下に伸びた発展ルートをまとめて眺めるFacadeです。  
> [DREAM THEATER 数学講座へ](textbook/dream-theater.md)

<div class="offline-cache-card">
  <strong>オフライン学習</strong>
  <p>教材一式をこの端末に保存します。通常閲覧はオンラインの最新版を優先し、保存版が古くなっていないかもここで確認できます。</p>
  <dl class="offline-cache-meta">
    <div><dt>教材サイト更新</dt><dd id="site-updated-at">確認中…</dd></div>
    <div><dt>オフライン保存状態</dt><dd id="offline-cache-state">確認中…</dd></div>
    <div><dt>最終保存成功</dt><dd id="offline-cache-saved-at">確認中…</dd></div>
  </dl>
  <button id="cache-all-materials" class="offline-cache-button" type="button">教材をオフライン保存</button>
  <span id="offline-cache-status" class="offline-cache-status" role="status" aria-live="polite"></span>
  <p id="offline-cache-freshness" class="offline-cache-freshness"></p>
</div>

統計数理・統計応用は **Core / Standard / Advanced** の順に整理されています。通常教材は章ごとの目次から導入・定義・定理・例題・演習・詳細解答へ移動できます。Ankiカードはカテゴリー別の専用HTMLビューアで閲覧できます。

## 数式表示

統計数理・統計応用・通常教材の数式は Docsify 上で KaTeX 表示します。Ankiカードは既存の静的HTML生成器で KaTeX を事前レンダリングします。

## 正本

教材の正本は GitHub リポジトリ内の以下です。

- `statistical-mathematics/`
- `applied-rikou-80/`
- `textbook/`
- `anki/cards/`

Pages 専用ディレクトリには教材本文を手作業で複製しません。GitHub Actions のビルドで `_site/` を生成し、公開対象のリンク検証を通過した成果物だけをデプロイします。
