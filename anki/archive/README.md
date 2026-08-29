# Anki card archive

このディレクトリは、約600枚の canonical card へ整理する過程で通常デッキから外したカードを保持するために使います。

通常ビルド・通常 coverage・通常カード数には含めません。

## 分類

- `duplicates/`: 同じ trigger から同じ move を使う重複・近重複
- `low_priority/`: 内容は正しいが通常600枚で反復する優先度が低い
- `too_specific/`: 数値・分布・工学設定だけを変えた特殊例
- `reference_only/`: `formulae.md` や通常教材の参照で十分な定義・公式

判断が分かれるカードは削除せず archive を優先します。明白な完全重複はGit履歴から復元できるため削除しても構いません。

可能なら移動時に次の metadata を残します。

```yaml
archive_reason: duplicate
canonical_card: asym-delta-method
```

`canonical_card` は統合先が確定している場合だけ付けます。

詳細な判定基準は `../../memo/anki.md`、監査記録は `../reports/reduction_audit_*.md` を参照してください。
