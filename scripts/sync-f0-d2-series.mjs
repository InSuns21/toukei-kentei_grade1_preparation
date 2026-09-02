import fs from 'node:fs';

function replaceOrThrow(text, from, to, label) {
  if (!text.includes(from)) throw new Error(`missing pattern: ${label}`);
  return text.replace(from, to);
}

// Facade / direct-link table
{
  const path = 'textbook/dream-theater.md';
  let text = fs.readFileSync(path, 'utf8');
  const from = `6. [F0-00D2 測度・可測関数・Lebesgue積分・Lp](textbook/volumes/00_foundations/F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md)\n7. [F0-00D3 外測度・Carathéodory可測性](textbook/volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md)\n8. [F0-00D4 Lebesgue測度・Borel集合・拡張定理](textbook/volumes/00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md)\n9. [F0-00D5 Vitali集合・非可測集合・選択公理](textbook/volumes/00_foundations/F0_00D5_Vitali集合_非可測集合_選択公理/index.md)\n10. [F0-00E ベクトル空間・基底・Gram–Schmidt・直交射影](textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md)\n11. [F0-00E2 Cauchy–Schwarz・Bessel・Parseval](textbook/volumes/00_foundations/F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md)\n12. [F0-00F 線形写像・固有空間・スペクトル定理・SVD](textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md)\n13. [F0-00G 凸集合・凸関数・凸最適化](textbook/volumes/00_foundations/F0_00G_凸集合_凸関数_凸最適化/index.md)`;
  const to = `6. [F0-00D2 測度空間・測度0・a.e.・可測関数](textbook/volumes/00_foundations/F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md)\n7. [F0-00D2A 単関数からLebesgue積分を構成](textbook/volumes/00_foundations/F0_00D2A_単関数_Lebesgue積分_構成/index.md)\n8. [F0-00D2B 単調収束・Fatou・優収束](textbook/volumes/00_foundations/F0_00D2B_単調収束_Fatou_優収束/index.md)\n9. [F0-00D2C 積測度・Tonelli・Fubini](textbook/volumes/00_foundations/F0_00D2C_積測度_Tonelli_Fubini/index.md)\n10. [F0-00D2D Lp・Hölder・Minkowski](textbook/volumes/00_foundations/F0_00D2D_Lp_Holder_Minkowski/index.md)\n11. [F0-00D2E L2完備性・Riesz–Fischer](textbook/volumes/00_foundations/F0_00D2E_L2完備性_Riesz_Fischer/index.md)\n12. [F0-00D3 外測度・Carathéodory可測性](textbook/volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md)\n13. [F0-00D4 Lebesgue測度・Borel集合・拡張定理](textbook/volumes/00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md)\n14. [F0-00D5 Vitali集合・非可測集合・選択公理](textbook/volumes/00_foundations/F0_00D5_Vitali集合_非可測集合_選択公理/index.md)\n15. [F0-00E ベクトル空間・基底・Gram–Schmidt・直交射影](textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md)\n16. [F0-00E2 Cauchy–Schwarz・Bessel・Parseval](textbook/volumes/00_foundations/F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md)\n17. [F0-00F 線形写像・固有空間・スペクトル定理・SVD](textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md)\n18. [F0-00G 凸集合・凸関数・凸最適化](textbook/volumes/00_foundations/F0_00G_凸集合_凸関数_凸最適化/index.md)`;
  text = replaceOrThrow(text, from, to, 'dream-theater D2 block');
  fs.writeFileSync(path, text);
}

// Global roadmap
{
  const path = 'textbook/volumes/00_foundations/F0_00R_基礎論ロードマップ/index.md';
  let text = fs.readFileSync(path, 'utf8');
  text = replaceOrThrow(text,
`F0-00 → A → A2 → B → C → D → D2\n  ↓\nE → E2 → F → G → F0-02 → 02A → 02B`,
`F0-00 → A → A2 → B → C → D\n  ↓\nD2 → D2A → D2B → D2C → D2D → D2E\n  ↓\nE → E2 → F → G → F0-02 → 02A → 02B`,
'roadmap standard route');
  text = text.replace('A2はHahn--BanachのZorn証明、D2は $L^2$・a.e.・可測関数を関数解析で突然出さないための橋です。',
'A2はHahn--BanachのZorn証明、D2〜D2Eは測度・Lebesgue積分・収束定理・積測度・$L^p$・$L^2$完備性を一講義ずつ閉じる橋です。');
  text = replaceOrThrow(text,
`D2 → D3 外測度・Caratheodory可測性\n   → D4 Lebesgue測度・Borel集合・拡張定理\n   → D5 Vitali集合・非可測集合・選択公理\n   → Eへ復帰`,
`D2 → D3 外測度・Caratheodory可測性\n   → D4 Lebesgue測度・Borel集合・拡張定理\n   → D5 Vitali集合・非可測集合・選択公理\n   → D2Aへ復帰 → D2B → D2C → D2D → D2E`,
'roadmap deep route');
  text = replaceOrThrow(text,
`D2 → P1 確率空間・確率変数・分布\n   → P2 Radon--Nikodym・密度・期待値\n   → P3 独立・積測度・条件付き期待値\n   → P4 収束・Borel--Cantelli・一様可積分性\n   → P5 強大数則\n   → P6 特性関数・CLT\n   → P7 統計モデル・尤度・正則性`,
`D2 → P1 確率空間・確率変数・分布\nD2A ─→ P2 Radon--Nikodym・密度・期待値\nD2C / D2E ─→ P3 独立・積測度・条件付き期待値\nD2B ─────────→ P4 収束・Borel--Cantelli・一様可積分性\n                 ↓\n                P5 強大数則 → P6 特性関数・CLT → P7 統計モデル・尤度・正則性`,
'roadmap probability route');
  fs.writeFileSync(path, text);
}

// Proof audit
{
  const path = 'textbook/f0-dream-theater-proof-audit.md';
  let text = fs.readFileSync(path, 'utf8');
  const anchor = '詳細基準は [DREAM THEATER 教材密度・例題・演習監査計画](f0-dream-theater-content-exercise-audit.md) を正本とする。';
  text = replaceOrThrow(text, anchor, anchor + '\n\n講義が過積載になっていないかは [DREAM THEATER 講義粒度・分割監査](f0-dream-theater-granularity-audit.md) を正本とする。内容を補強する前に粒度を確認し、必要なら先に分割する。', 'proof audit granularity link');
  text = text.replace('A → A2 → B → C → D → D2 → E → E2 → F → G', 'A → A2 → B → C → D → D2 → D2A → D2B → D2C → D2D → D2E → E → E2 → F → G');
  text = text.replace('D2 → D3 → D4 → D5', 'D2 → D3 → D4 → D5 → D2Aへ復帰');
  text = text.replace('D2 → P1 → P2 → P3 → P4 → P5 → P6 → P7', 'D2/D2A/D2B/D2C/D2E → P1 → P2 → P3 → P4 → P5 → P6 → P7');
  for (const id of ['D2-04','D2-05','D2-06','D2-09','D2-10']) {
    text = text.replace(`### TODO-P1-${id}`, `### DONE-P1-${id} ✅`);
  }
  text = text.replace('### TODO-P1-D2-07：積測度の存在と一意性\n\n少なくともσ有限の場合に後続で必要な形を定理として明示し、証明を補完する。',
`### TODO-P1-D2-07：積測度の存在と一意性\n\nD2Cでσ有限版を自己完結した定理として明示済み。完全証明はD4でCarathéodory拡張定理から構成する。Batch 3でDONEへ上げる。`);
  text = text.replace('### TODO-P1-D2-08：Tonelli / Fubini\n\n非負関数のTonelliから可積分関数のFubiniへ進む証明を付ける。',
`### TODO-P1-D2-08：Tonelli / Fubini\n\nD2Cで「指示関数 → 単関数 → MCT → Tonelli → Fubini」の主要論理を追加済み。残るのは積測度構成に付随するsection測度補題であり、D4の積測度存在証明と同時に閉じる。`);
  text = text.replace('12. 通常教材と比べて、説明だけで終わる主要学習目標が残っていない。',
'12. 通常教材と比べて、説明だけで終わる主要学習目標が残っていない。\n13. 一講義に独立した学習サイクルを詰め込みすぎていない。過積載ならURL互換を保って分割する。');
  fs.writeFileSync(path, text);
}

// Content/exercise audit
{
  const path = 'textbook/f0-dream-theater-content-exercise-audit.md';
  let text = fs.readFileSync(path, 'utf8');
  text = text.replace('今後の通読監査は、各章について次の5軸を確認します。', '今後の通読監査は、各章について次の6軸を確認します。');
  const item5 = '5. **内容密度**：通常の統計検定1級本編と比べて、主要学習目標が説明だけで終わっていないか。';
  text = replaceOrThrow(text, item5, item5 + '\n6. **講義粒度**：一ページに独立した学習サイクルを詰め込みすぎていないか。必要なら増補前に分割する。', 'content audit sixth axis');
  const density = '**単なる文字数比較はしません。** ただし、上の項目が多数欠けた短い章は「内容密度不足」と判定します。';
  text = replaceOrThrow(text, density, density + '\n\n講義粒度の詳細判定は [DREAM THEATER 講義粒度・分割監査](f0-dream-theater-granularity-audit.md) を正本とします。長いから分割するのではなく、一つの主要な問いと一つの学習サイクルにまとまっているかで判断します。', 'content audit granularity link');
  text = text.replace('したがってBatch 2では、単に証明を追記するのではなく **D2全体を教材として再構成**します。',
'したがってBatch 2では、単に証明を追記するのではなく **D2をD2〜D2Eの6講義へ分割して再構成**します。旧D2 URLは第1講として維持します。');
  text = text.replace(/### D2 Batch 2 の完成イメージ[\s\S]*?### D2 演習の初期案/, `### D2 Batch 2 の完成イメージ\n\n\`\`\`text\nD2   測度空間・測度0・a.e.・可測関数\n ↓\nD2A  単関数からLebesgue積分を構成\n ↓\nD2B  MCT → Fatou → DCT\n ↓\nD2C  積測度 → Tonelli → Fubini\n ↓\nD2D  Lp → Hölder → Minkowski\n ↓\nD2E  L2完備性 → Hilbert空間への橋\n\`\`\`\n\n完全基礎論では D2 → D3 → D4 → D5 → D2A と寄り道できる。\n\n### D2 演習の初期案`);
  text = text.replace('Batch 2  Lebesgue積分\n         + D2全面再構成（定義・定理・例・A/B/C演習）',
'Batch 2  Lebesgue積分\n         + D2〜D2Eへ粒度分割し、各講義を定義・定理・例・A/B/C演習まで閉じる');
  fs.writeFileSync(path, text);
}
