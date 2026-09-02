import fs from 'node:fs';

const path = 'textbook/f0-dream-theater-proof-audit.md';
let text = fs.readFileSync(path, 'utf8');

const marker = '## 監査範囲の拡張：教材密度・例題・演習';
if (!text.includes(marker)) {
  const needle = 'この文書に `TODO` として載せた命題は、今後の証明補完対象です。すでに十分な証明があるものは対象外です。\n\n---';
  const insert = `この文書に \`TODO\` として載せた命題は、今後の証明補完対象です。すでに十分な証明があるものは対象外です。\n\n## 監査範囲の拡張：教材密度・例題・演習\n\n証明監査に加えて、**定義・定理の明示性、具体例、A/B/C演習、通常教材比の内容密度**も通読保証の対象とする。詳細基準は [DREAM THEATER 教材密度・例題・演習監査計画](../f0-dream-theater-content-exercise-audit.md) を正本とする。\n\n以後の各Batchでは、証明だけを追加して終わらず、そのBatchで触る章について教材密度監査も同時に行う。特にD2はBatch 2で全面再構成する。\n\n---`;
  if (!text.includes(needle)) throw new Error('intro insertion point not found');
  text = text.replace(needle, insert);
}

const batchNeedle = '## Batch 2：Lebesgue積分\n\nD2の MCT → Fatou → DCT → product measure → Tonelli/Fubini → Minkowski → $L^2$ completeness。\n\nここが最大のボトルネック。';
const batchReplace = '## Batch 2：Lebesgue積分\n\nD2の MCT → Fatou → DCT → product measure → Tonelli/Fubini → Minkowski → $L^2$ completeness。\n\nここが最大のボトルネック。**証明追記だけでなく、定義・定理の明示、具体例、A/B中心の演習、C最大1問まで含むD2全面再構成**を行う。';
if (text.includes(batchNeedle)) text = text.replace(batchNeedle, batchReplace);

const completionNeedle = '7. 読者が「なにこれ？」となったとき、前へ戻るべき章がリンクで特定できる。';
const completionReplace = `7. 読者が「なにこれ？」となったとき、前へ戻るべき章がリンクで特定できる。\n8. 主要概念が明示的な定義として識別でき、主要命題の仮定と結論が明確である。\n9. 主要概念に具体例または反例があり、原則として各講義章にA/B演習がある。\n10. B問題を主力とし、C問題は必要な章に0〜1問程度とする。\n11. 演習は共通規約の詳細解答・本番答案・20点採点基準を満たす。\n12. 通常教材と比べて、説明だけで終わる主要学習目標が残っていない。`;
if (text.includes(completionNeedle)) text = text.replace(completionNeedle, completionReplace);

text = text.replace('現在は **監査・計画段階**。次の実装は Batch 0 から順に行う。', 'Batch 0の読者ブロッカー除去後、Batch 1からは証明監査と教材密度監査を同時に進める。');

fs.writeFileSync(path, text);
