# DREAM THEATER 講義系列ID階層の追加・演習科目移動

- 2026-10-12、状態: **完了**（[PR #999](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/999) merge済み、merge SHA `5941238dd0f448ca2f7173f1eedbd7d8b1ffc580`）
- 前回の [#996](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/996) で欠落した講義系列ID階層を補う独立の訂正作業
- 完成形: `textbook/volumes/dream_thater/<公開目次のカテゴリー>/<講義系列ID>/<章ID>/`
- 例: `幾何系/SYM/SYM7`, `解析系/CA/CA1`, `代数系/AG/AG1-01`
- 旧URLのリダイレクト、互換コピー、symlinkは作らない

## 範囲

1. 公開索引掲載の540章を、実在するchapter.yaml IDを保ったまま系列IDの下へ再配置する。カテゴリーは元の公開索引に従う。公開済み系列のIDはシリーズmanifestと照合する。既存F0補講は`F0`を系列フォルダとする（索引掲載分のみ）。
2. `textbook/volumes/00_foundations/F0_00CALC_線形代数_院試編入計算演習` を `基礎科目/LAX/LAX1`、`textbook/volumes/00_foundations/F0_00CALC_複素解析_院試編入計算演習` を `解析系/CAX/CAX1` に移す。これらは別途の演習科目であり、独立の章IDを維持する。
3. **それ以外の `00_foundations` 配下のF0旧版教材は移さない**。特に `F0_02_制約付き最適化_双対_KKT` は移動対象外。旧版の数学本文を削除・改稿しない。
4. ディレクトリごと移動し、`index.md`, `chapter.yaml`, `knowledge.yaml`, SVG・その他アセット・追加Markdownも保つ。
5. 本文・解答の数式を一切変更せず、旧パスを実際に参照するリンク・manifest・サイト目次・依存・検証・文書だけを更新する。

## 必須ゲート

- [x] 540索引章 + 2演習章の移動元／移動先対応表、全件の章IDとカテゴリー確認
- [x] 542章の移動と全シリーズmanifestのplanned/completed両方のパス変更
- [x] Markdown/HTML/画像/アセットの相対リンクを旧参照先から再計算
- [x] 公開目次・章間リンク・stable anchor・アーカイブからのリンクを新パスへ更新
- [x] 講義ID resolver、索引検証、章パス検証、全文監査、数式配置、SVG、演習・概念監査を3層対応
- [x] 542章の数学本文・バイナリアセットを元commitと比較し、URL変更のみであることを証明
- [x] GitHub Actions全件・Pages build/link/image/fragment・全manifest検証
- [x] PRの査読・検算証拠、未解消事項・非改稿本文について記録
- [x] マージして完了を記録

講義本文はディレクトリ移動に過ぎず、証明・演習の改稿査読を実施したと称さない。相互参照が変わった箇所の検証と、全ファイルの本文同値証明を採用する。既存章の追跡監査は明示章ID指定がない限り追加しない。

## 完了実績（2026-10-12）

- 8カテゴリー・542章（旧公開540章＋LAX1/CAX1）、23系列manifestを検証。新索引の全章が「カテゴリー/系列ID/章ID」の3層構造。
- 指定されたLAX1とCAX1だけを旧`00_foundations`から移行。それ以外の旧版F0ディレクトリ（F0_02を含む）は維持。
- 全移動元2,207ファイルを照合：1,820件バイト一致、387件リンク/URL/パスのみ変更。数学本文とアセットの非リンク内容は保存。
- Pages完全ビルド、542件のナビゲーション、1,276件の直接前提リンク、安定アンカー、画像、数式表示、教材、概念、演習、用語、構造の6ワークフローに成功。
- 数学本文の全章再査読や公開サイトの手動ブラウザ表示確認は実施していない。これはコンテンツ改稿ではなく構造移行とリンク整備であり、リポジトリ本文の機械的同値検査とPagesの検証を実施。
- 旧URLの互換ファイル、リダイレクト、複製は追加していない。
- 初回試行のドラフト [#998](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/998) は新規workflow追加権限によりpush不可となり、権限を要しないクリーンなブランチ経由の[#999](https://github.com/InSuns21/toukei-kentei_grade1_preparation/pull/999) に引き継いで完了。
