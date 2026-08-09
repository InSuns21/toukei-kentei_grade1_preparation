# 統計検定1級 独習教材

統計検定1級「統計数理」「統計応用（理工学）」向けの教材生成・検証基盤です。`curriculum.yaml` が章構成と進捗の正本です。

## セットアップと検証

```powershell
npm install
npm run validate
npm run progress
```

## 執筆開始

```powershell
npm run progress -- start M1-01
npm run new:chapter -- M1-01
```

章雛形は、独習本文、例題、問題解決パターン、Level A〜D問題集、詳細解答、30分ドリル、査読記録を分離します。生成には `prompts/generate-chapter.md`、独立査読には `prompts/review-chapter.md` を使います。

## 情報源の優先順位

1. 公式出題範囲 `pdfs/grade1_hani_20150508_2.pdf`
2. 公式過去問・公式解答
3. `syllabus.md`
4. 久保川『現代数理統計学の基礎』の目次・章末演習解答

参考資料は構造・難度の校正に用い、問題・解答を転載しません。詳細は `references/sources.md` を参照してください。

