import fs from 'node:fs';
import path from 'node:path';

const root = 'textbook/volumes/00_foundations';
const cDir = `${root}/F0_00C_連続写像_コンパクト性_最大最小`;
const dDir = `${root}/F0_00D_Cauchy列_完備性_無限次元`;
const c = fs.readFileSync(`${cDir}/index.md`, 'utf8');
const d = fs.readFileSync(`${dDir}/index.md`, 'utf8');

const slice = (text, start, end) => {
  const s = text.indexOf(start);
  if (s < 0) throw new Error(`missing start: ${start}`);
  const e = end ? text.indexOf(end, s) : text.length;
  if (e < 0) throw new Error(`missing end: ${end}`);
  return text.slice(s, e).trim();
};
const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content.replace(/\n{3,}/g, '\n\n').trim() + '\n');
};
const renumber = (text, pairs) => {
  let out = text;
  for (const [from, to] of pairs) {
    out = out.replace(new RegExp(`^## ${from}\\. `, 'm'), `## ${to}. `);
  }
  return out;
};
const jpCauchy = (text) => text.replaceAll('Cauchy列', 'コーシー列');

// ----- C split -----
const cContinuity = slice(c, '## 1. 連続写像', '## 3. コンパクト性');
const cCompact = renumber(slice(c, '## 3. コンパクト性', '## 8. Weierstrassの最大最小定理'), [[3,1],[4,2],[5,3],[6,4],[7,5]]);
const cApplications = renumber(slice(c, '## 8. Weierstrassの最大最小定理', '## 12. 演習 Level A'), [[8,1],[9,2],[10,3],[11,4]]);
const cA01 = slice(c, '### F0-00C-A01', '### F0-00C-A02');
const cA02 = slice(c, '### F0-00C-A02', '---\n\n## 13. 演習 Level B');
const cB01 = slice(c, '### F0-00C-B01', '### F0-00C-B02');
const cB02 = slice(c, '### F0-00C-B02', '### F0-00C-B03');
const cB03 = slice(c, '### F0-00C-B03', '---\n\n## 14. 演習 Level C');
const cC01 = slice(c, '### F0-00C-C01', '---\n\n## 15. 後続補講への接続');

const cNewB = `### F0-00C-B04 連続性を開集合の逆像で使う

- Level: B
- 目安時間: 12分
- 主題: 連続写像と閉集合
- 使用技術: 開集合の逆像、補集合

距離空間 $X,Y$、連続写像 $f:X\\to Y$、閉集合 $F\\subset Y$ に対して、$f^{-1}(F)$ が $X$ の閉集合であることを示せ。

<!-- solution-start -->
#### 詳細解答

$F$ が閉なので $Y\\setminus F$ は開集合です。$f$ は連続だから

$$
f^{-1}(Y\\setminus F)
$$

は $X$ の開集合です。逆像は補集合と可換なので

$$
f^{-1}(Y\\setminus F)
=
X\\setminus f^{-1}(F).
$$

したがって $X\\setminus f^{-1}(F)$ は開集合であり、$f^{-1}(F)$ は閉集合です。

#### 本番答案

$F$ が閉なので $Y\\setminus F$ は開。連続性より $f^{-1}(Y\\setminus F)$ は開であり、

$$
f^{-1}(Y\\setminus F)=X\\setminus f^{-1}(F)
$$

だから $f^{-1}(F)$ は閉。

#### 採点基準（20点）

- 閉集合の補集合を見る: 5点
- 連続性を逆像へ適用: 7点
- 逆像と補集合の関係: 5点
- 結論: 3点
<!-- solution-end -->`;

const cMain = `# F0-00C 補講：連続写像・連続性の同値条件

F0-00Bで距離・開集合・点列収束を準備しました。この講義では、それら三つの言葉が「連続性」で一致することを示します。

中心線は

$$
\\boxed{
\\varepsilon\\text{--}\\delta
\\Longleftrightarrow
\\text{点列を極限へ送る}
\\Longleftrightarrow
\\text{開集合の逆像が開}
}
$$

です。コンパクト性は次講F0-00C1へ分離します。

---

${cContinuity}

---

## 3. 演習

${cA01}

${cNewB}

---

## 4. 次に進む

連続性を三つの形で扱えるようになったので、次は「無限の局所情報を有限に圧縮できる」コンパクト性へ進みます。

**次：[F0-00C1 コンパクト性・点列コンパクト性・Heine--Borel](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md)**`;
write(`${cDir}/index.md`, cMain);

const c1Dir = `${root}/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel`;
const c1 = `# F0-00C1 補講：コンパクト性・点列コンパクト性・Heine--Borel

この講義の問いは一つです。

> **どんな条件なら、無限に続く点列や開被覆から有限な情報を取り出せるか。**

距離空間でのコンパクト性と点列コンパクト性を結び、有限次元ではHeine--Borelへ落とします。

---

${cCompact}

---

## 6. 演習

${cA02}

${cB01}

---

## 7. 次に進む

ここまでで「コンパクトであることを判定する道具」が揃いました。次講では、それを最大最小・集合間距離・最近点の**存在証明**へ使います。

**次：[F0-00C2 コンパクト性の応用・最大最小・最近点](../F0_00C2_コンパクト性の応用_最大最小_最近点/index.md)**`;
write(`${c1Dir}/index.md`, c1);

const c2Dir = `${root}/F0_00C2_コンパクト性の応用_最大最小_最近点`;
const c2 = `# F0-00C2 補講：コンパクト性の応用・最大最小・最近点

この講義では、F0-00C1のコンパクト性を「存在する」を証明する道具として使います。

$$
\\boxed{
\\text{compactness}
\\to
\\text{有限直積・連続像}
\\to
\\text{極値・距離最小化の達成}
}
$$

最適化で何度も現れる存在証明の型をここで閉じます。

---

${cApplications}

---

## 5. 演習

${cB02}

${cB03}

${cC01}

---

## 6. 次に進む

コンパクト性は「収束部分列を取れる」保証でした。次は、極限候補を先に知らなくても列の後半同士が近づけば極限を確保できる**完備性**へ進みます。

**次：[F0-00D コーシー列・完備距離空間](../F0_00D_Cauchy列_完備性_無限次元/index.md)**`;
write(`${c2Dir}/index.md`, c2);

write(`${cDir}/chapter.yaml`, `id: "F0-00C"
title: "補講：連続写像・連続性の同値条件"
volume: "foundations"
status: supplementary
prerequisites:
  - F0-00B
official_scope: []
learning_objectives:
  - 距離空間の連続性をepsilon-delta・点列・開集合逆像の三形式で説明できる
  - 三つの連続性条件の同値性を証明できる
  - 距離関数の連続性を三角不等式から示せる
definitions:
  - { id: F000C-DEF-01, name: 点における連続性 }
  - { id: F000C-DEF-02, name: 連続写像 }
theorems:
  - { id: F000C-THM-01, name: 距離空間における連続性の同値条件 }
canonical_examples: [距離関数の連続性]
problem_patterns: [連続性の点列判定, 開集合と閉集合の逆像]
past_exam_alignment: []
integrated_exam_problems: []
exercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }
estimated_hours: { reading: 1.75, exercises: 0.75, review: 0.25 }
`);
write(`${cDir}/glossary.yaml`, `chapter: "F0-00C"
terms:
  - term: 連続写像
    english: continuous map
    meaning: 入力の十分小さい変化を出力の任意に小さい変化へ抑えられる写像。
  - term: 点列による連続性
    english: sequential continuity
    meaning: 収束する点列をその極限の像へ収束する点列に送る性質。距離空間では通常の連続性と同値。
`);
write(`${c1Dir}/chapter.yaml`, `id: "F0-00C1"
title: "補講：コンパクト性・点列コンパクト性・Heine--Borel"
volume: "foundations"
status: supplementary
prerequisites:
  - F0-00C
official_scope: []
learning_objectives:
  - 開被覆によるコンパクト性と点列コンパクト性を定義できる
  - 距離空間で両者が同値であることを証明できる
  - Bolzano--Weierstrassを実数からR^pへ拡張できる
  - Heine--Borelを両方向に証明できる
  - 連続像がコンパクトであることを証明できる
definitions:
  - { id: F000C1-DEF-01, name: 開被覆 }
  - { id: F000C1-DEF-02, name: コンパクト集合 }
  - { id: F000C1-DEF-03, name: 点列コンパクト性 }
theorems:
  - { id: F000C1-THM-01, name: コンパクト性と点列コンパクト性の同値性 }
  - { id: F000C1-THM-02, name: Bolzano--Weierstrassの定理 }
  - { id: F000C1-THM-03, name: Heine--Borelの定理 }
  - { id: F000C1-THM-04, name: 連続像のコンパクト性 }
canonical_examples: [有限点集合の凸包のコンパクト性]
problem_patterns: [Heine--Borelによる判定, 連続像]
past_exam_alignment: []
integrated_exam_problems: []
exercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }
estimated_hours: { reading: 2.5, exercises: 0.75, review: 0.35 }
`);
write(`${c1Dir}/glossary.yaml`, `chapter: "F0-00C1"
terms:
  - term: 開被覆
    english: open cover
    meaning: 対象集合を和集合で覆う開集合の族。
  - term: コンパクト集合
    english: compact set
    meaning: 任意の開被覆から有限部分被覆を選べる集合。距離空間では点列コンパクト性と同値。
  - term: 点列コンパクト性
    english: sequential compactness
    meaning: 任意の点列が集合内に極限を持つ収束部分列を持つ性質。
  - term: Heine--Borelの定理
    english: Heine--Borel theorem
    meaning: R^pではコンパクトであることと閉かつ有界であることが同値であるという定理。
`);
write(`${c2Dir}/chapter.yaml`, `id: "F0-00C2"
title: "補講：コンパクト性の応用・最大最小・最近点"
volume: "foundations"
status: supplementary
prerequisites:
  - F0-00C1
official_scope: []
learning_objectives:
  - Weierstrassの最大最小定理を証明できる
  - 有限直積のコンパクト性を証明できる
  - 互いに素な非空コンパクト集合間の距離が正で達成されることを証明できる
  - 閉集合への最近点存在証明を再構成できる
definitions: []
theorems:
  - { id: F000C2-THM-01, name: Weierstrassの最大最小定理 }
  - { id: F000C2-THM-02, name: 有限直積のコンパクト性 }
  - { id: F000C2-THM-03, name: 互いに素なコンパクト集合間の正距離 }
canonical_examples: [二つの円板の距離, 閉集合への最近点の存在]
problem_patterns: [最大最小, コンパクト集合間距離, 最近点存在証明]
past_exam_alignment: []
integrated_exam_problems: []
exercise_counts: { level_a: 0, level_b: 2, level_c: 1, level_d: 0 }
estimated_hours: { reading: 2.25, exercises: 1.25, review: 0.35 }
`);
write(`${c2Dir}/glossary.yaml`, `chapter: "F0-00C2"
terms:
  - term: Weierstrassの最大最小定理
    english: extreme value theorem
    meaning: 空でないコンパクト集合上の実数値連続関数は最大値と最小値を達成する。
  - term: 最近点
    english: nearest point
    meaning: 与えた点から集合までの距離の下限を実際に達成する集合内の点。
`);

// ----- D split -----
const dCore = slice(d, '## 1. Cauchy列', '## 6. ノルムとBanach空間');
const dCompactComplete = renumber(slice(d, '## 9. コンパクト距離空間は完備', '## 10. 無限次元で「閉有界ならコンパクト」が壊れる'), [[9,6]]);
const dNorm = renumber(slice(d, '## 6. ノルムとBanach空間', '## 9. コンパクト距離空間は完備'), [[6,1],[7,2],[8,3]]);
const dInfinite = renumber(slice(d, '## 10. 無限次元で「閉有界ならコンパクト」が壊れる', '## 12. 演習 Level A'), [[10,4],[11,5]]);
const dA01 = slice(d, '### F0-00D-A01', '### F0-00D-A02');
const dA02 = slice(d, '### F0-00D-A02', '---\n\n## 13. 演習 Level B');
const dB01 = slice(d, '### F0-00D-B01', '### F0-00D-B02');
const dB02 = slice(d, '### F0-00D-B02', '### F0-00D-B03');
const dB03 = slice(d, '### F0-00D-B03', '---\n\n## 14. 02C系列への入口');

const dMain = jpCauchy(`# F0-00D 補講：コーシー列・完備距離空間

この講義では、「極限値を先に知らなくても、列の後半同士が十分近ければ極限を確保できるか」を扱います。

$$
\\boxed{
\\text{収束列}
\\Rightarrow
\\text{コーシー列}
}
$$

の逆向きが成立する空間が完備空間です。ノルム空間・有限次元/無限次元の話は次講F0-00D1へ分離します。

---

${dCore}

---

${dCompactComplete}

---

## 7. 演習

${dA01}

${dA02}

${dB01}

---

## 8. 次に進む

完備性そのものは距離空間の概念です。次講ではベクトル空間へノルムを入れ、Banach空間と有限次元・無限次元の差を整理します。

**次：[F0-00D1 ノルム空間・Banach・有限次元と無限次元](../F0_00D1_ノルム_Banach_有限次元_無限次元/index.md)**`);
write(`${dDir}/index.md`, dMain);

const d1Dir = `${root}/F0_00D1_ノルム_Banach_有限次元_無限次元`;
const d1A = `### F0-00D1-A01 三つのノルムを計算する

- Level: A
- 目安時間: 8分
- 主題: ノルム
- 使用技術: 定義への代入

$x=(1,-2,2)\\in\\mathbb R^3$ に対して $\\|x\\|_1,\\|x\\|_2,\\|x\\|_\\infty$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$$
\\|x\\|_1=|1|+|-2|+|2|=5,
$$

$$
\\|x\\|_2=\\sqrt{1^2+(-2)^2+2^2}=3,
$$

$$
\\|x\\|_\\infty=\\max\\{1,2,2\\}=2.
$$

#### 本番答案

$$
\\boxed{\\|x\\|_1=5,\\quad\\|x\\|_2=3,\\quad\\|x\\|_\\infty=2}
$$

#### 採点基準（20点）

- 1ノルム: 6点
- 2ノルム: 7点
- 無限大ノルム: 5点
- 結論: 2点
<!-- solution-end -->`;
const d1 = jpCauchy(`# F0-00D1 補講：ノルム空間・Banach・有限次元と無限次元

F0-00Dで完備距離空間を定義しました。この講義では、ベクトル空間にノルムを入れたときに完備性がどう働くかを調べます。

中心線は

$$
\\boxed{
\\text{有限次元：ノルム同値・完備性が自動}
\\qquad\\text{vs}\\qquad
\\text{無限次元：コンパクト性を別途確認}
}
$$

です。

---

${dNorm}

---

${dInfinite}

---

## 6. 演習

${d1A}

${dB02}

${dB03}

---

## 7. 次に進む

これで有限次元の「なぜ極限で困りにくいのか」と、無限次元で別の注意が必要な理由が見えました。次は測度と可測関数へ進みます。

**次：[F0-00D2 測度空間・測度0・a.e.・可測関数](../F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md)**`);
write(`${d1Dir}/index.md`, d1);

write(`${dDir}/chapter.yaml`, `id: "F0-00D"
title: "補講：コーシー列・完備距離空間"
volume: "foundations"
status: supplementary
prerequisites:
  - F0-00C1
official_scope: []
learning_objectives:
  - コーシー列を定義し、収束列との関係を証明できる
  - 完備距離空間を定義できる
  - 実数と有理数を完備性の観点から比較できる
  - 完備空間の閉部分集合が完備であることを証明できる
  - 完備な部分空間が閉集合であることを証明できる
  - コンパクト距離空間が完備であることを証明できる
definitions:
  - { id: F000D-DEF-01, name: コーシー列 }
  - { id: F000D-DEF-02, name: 完備距離空間 }
theorems:
  - { id: F000D-THM-01, name: 収束列はコーシー列 }
  - { id: F000D-THM-02, name: 完備空間の閉部分集合は完備 }
  - { id: F000D-THM-03, name: 完備な部分空間は閉集合 }
  - { id: F000D-THM-04, name: コンパクト距離空間は完備 }
canonical_examples: [有理数の非完備性]
problem_patterns: [非完備性の反例, compactとcompleteの判定, 閉部分集合の完備性]
past_exam_alignment: []
integrated_exam_problems: []
exercise_counts: { level_a: 2, level_b: 1, level_c: 0, level_d: 0 }
estimated_hours: { reading: 2.25, exercises: 1.0, review: 0.35 }
`);
write(`${dDir}/glossary.yaml`, `chapter: "F0-00D"
terms:
  - term: コーシー列
    english: Cauchy sequence
    meaning: 列の十分後ろの二項同士の距離を任意に小さくできる点列。
  - term: 完備
    english: complete
    meaning: すべてのコーシー列がその空間内で収束する性質。
  - term: 完備距離空間
    english: complete metric space
    meaning: 距離について完備な距離空間。
`);
write(`${d1Dir}/chapter.yaml`, `id: "F0-00D1"
title: "補講：ノルム空間・Banach・有限次元と無限次元"
volume: "foundations"
status: supplementary
prerequisites:
  - F0-00D
  - F0-00C2
official_scope: []
learning_objectives:
  - ノルムとBanach空間を定義できる
  - 有限次元で全てのノルムが同値であることを証明できる
  - 有限次元ノルム空間の完備性を証明できる
  - l2の標準基底を使って無限次元では閉有界集合がコンパクトとは限らないことを示せる
definitions:
  - { id: F000D1-DEF-01, name: ノルム }
  - { id: F000D1-DEF-02, name: Banach空間 }
  - { id: F000D1-DEF-03, name: 同値なノルム }
  - { id: F000D1-DEF-04, name: l2空間 }
theorems:
  - { id: F000D1-THM-01, name: 有限次元ノルム空間では全てのノルムが同値 }
  - { id: F000D1-THM-02, name: 有限次元ノルム空間の完備性 }
canonical_examples: [有限次元ノルムの比較, l2標準基底による非コンパクト性]
problem_patterns: [ノルム比較, 無限次元非コンパクト性]
past_exam_alignment: []
integrated_exam_problems: []
exercise_counts: { level_a: 1, level_b: 2, level_c: 0, level_d: 0 }
estimated_hours: { reading: 2.5, exercises: 1.0, review: 0.35 }
`);
write(`${d1Dir}/glossary.yaml`, `chapter: "F0-00D1"
terms:
  - term: ノルム
    english: norm
    meaning: ベクトルの大きさを測り、正定値性・斉次性・三角不等式を満たす関数。
  - term: Banach空間
    english: Banach space
    meaning: ノルムから定まる距離について完備なノルム空間。
  - term: 同値なノルム
    english: equivalent norms
    meaning: 正の定数倍を介して互いを上下から評価できる二つのノルム。
`);

// ----- Facade / manifest / roadmaps -----
const manifestPath = 'textbook/dream-theater-index.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const mainSection = manifest.sections.find(s => s.name === 'DREAM THEATER 本編');
const cPath = 'textbook/volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md';
const dPath = 'textbook/volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md';
const additions = [
  ['textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md', cPath],
  ['textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md', 'textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md'],
  ['textbook/volumes/00_foundations/F0_00D1_ノルム_Banach_有限次元_無限次元/index.md', dPath],
];
for (const [p, after] of additions) {
  if (!mainSection.paths.includes(p)) {
    const i = mainSection.paths.indexOf(after);
    mainSection.paths.splice(i + 1, 0, p);
  }
}
write(manifestPath, JSON.stringify(manifest, null, 2));

const facadePath = 'textbook/dream-theater.md';
let facade = fs.readFileSync(facadePath, 'utf8');
const bStart = facade.indexOf('#### 基礎論\n\n');
const bEnd = facade.indexOf('\n\n#### 制約付き最適化', bStart);
if (bStart < 0 || bEnd < 0) throw new Error('facade foundation list not found');
const foundationList = `#### 基礎論

1. [F0-00A 集合・写像・上限下限](textbook/volumes/00_foundations/F0_00A_集合_写像_上限下限/index.md)
2. [F0-00A2 選択公理・Zornの補題・極大原理](textbook/volumes/00_foundations/F0_00A2_選択公理_Zorn_極大原理/index.md)
3. [F0-00B 距離空間・開集合・閉集合・収束](textbook/volumes/00_foundations/F0_00B_距離空間_開集合_閉集合_収束/index.md)
4. [F0-00C 連続写像・連続性の同値条件](textbook/volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md)
5. [F0-00C1 コンパクト性・点列コンパクト性・Heine–Borel](textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md)
6. [F0-00C2 コンパクト性の応用・最大最小・最近点](textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md)
7. [F0-00D コーシー列・完備距離空間](textbook/volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md)
8. [F0-00D1 ノルム空間・Banach・有限次元と無限次元](textbook/volumes/00_foundations/F0_00D1_ノルム_Banach_有限次元_無限次元/index.md)
9. [F0-00D2 測度空間・測度0・a.e.・可測関数](textbook/volumes/00_foundations/F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md)
10. [F0-00D2A 単関数からLebesgue積分を構成](textbook/volumes/00_foundations/F0_00D2A_単関数_Lebesgue積分_構成/index.md)
11. [F0-00D2B 単調収束・Fatou・優収束](textbook/volumes/00_foundations/F0_00D2B_単調収束_Fatou_優収束/index.md)
12. [F0-00D2C 積測度・Tonelli・Fubini](textbook/volumes/00_foundations/F0_00D2C_積測度_Tonelli_Fubini/index.md)
13. [F0-00D2D Lp・Hölder・Minkowski](textbook/volumes/00_foundations/F0_00D2D_Lp_Holder_Minkowski/index.md)
14. [F0-00D2E L2完備性・Riesz–Fischer](textbook/volumes/00_foundations/F0_00D2E_L2完備性_Riesz_Fischer/index.md)
15. [F0-00D3 外測度・Carathéodory可測性](textbook/volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md)
16. [F0-00D4 Lebesgue測度・Borel集合・拡張定理](textbook/volumes/00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md)
17. [F0-00D5 Vitali集合・非可測集合・選択公理](textbook/volumes/00_foundations/F0_00D5_Vitali集合_非可測集合_選択公理/index.md)
18. [F0-00E ベクトル空間・基底・Gram–Schmidt・直交射影](textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md)
19. [F0-00E2 Cauchy–Schwarz・Bessel・Parseval](textbook/volumes/00_foundations/F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md)
20. [F0-00F 線形写像・固有空間・スペクトル定理・SVD](textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md)
21. [F0-00G 凸集合・凸関数・凸最適化](textbook/volumes/00_foundations/F0_00G_凸集合_凸関数_凸最適化/index.md)`;
facade = facade.slice(0, bStart) + foundationList + facade.slice(bEnd);
facade = facade.replace('        ├─→ DREAM THEATER本編\n        │      選択公理 / Zorn', '        ├─→ DREAM THEATER本編\n        │      距離 → 連続 → compactness → existence → completeness\n        │      選択公理 / Zorn');
write(facadePath, facade);

const roadPath = `${root}/F0_00R_基礎論ロードマップ/index.md`;
let road = fs.readFileSync(roadPath, 'utf8');
road = road.replace('F0-00 → A → A2 → B → C → D\n  ↓\nD2 → D2A', 'F0-00 → A → A2 → B → C → C1 → C2 → D → D1\n  ↓\nD2 → D2A');
road = road.replace('A2はHahn--BanachのZorn証明、D2〜D2Eは', 'C〜C2は連続性・コンパクト性・存在定理、D〜D1は完備性・ノルム空間・有限/無限次元を一講義ずつ閉じます。A2はHahn--BanachのZorn証明、D2〜D2Eは');
write(roadPath, road);

const depPath = 'textbook/dependency-graph.md';
let dep = fs.readFileSync(depPath, 'utf8');
dep = dep.replace('F0-00C  連続・コンパクト\n  ↓\nF0-00D  Cauchy列・完備性\n  ↓\nF0-00D2', 'F0-00C  連続写像\n  ↓\nF0-00C1 コンパクト性・Heine--Borel\n  ↓\nF0-00C2 最大最小・最近点\n  ↓\nF0-00D  コーシー列・完備性\n  ↓\nF0-00D1 ノルム・Banach・有限/無限次元\n  ↓\nF0-00D2');
write(depPath, dep);

const auditPath = 'textbook/f0-dream-theater-granularity-audit.md';
let audit = fs.readFileSync(auditPath, 'utf8');
audit = audit.replace('### 第1優先：既に大幅増補した章', '### 第1優先：既に大幅増補した章（再監査済み）');
audit = audit.replace(/\| F0-00B \| WATCH \|[^\n]*\n\| F0-00C \| WATCH \|[^\n]*\n\| F0-00D \| WATCH \|[^\n]*/,
`| F0-00B | **OK** | 距離→開閉→収束→閉包が「閉集合は極限を逃さない」という一つの問いへ収束。独立講義へ割るほど論理鎖が分離していない。 |
| F0-00C | **SPLIT** | 連続性・compactness・存在定理の三つの学習サイクルが独立。C/C1/C2へ分割。 |
| F0-00C1 | **OK** | compactness→点列compactness→Bolzano--Weierstrass→Heine--Borel→連続像が一つの判定・保存サイクル。 |
| F0-00C2 | **OK** | Weierstrass→有限直積→正距離→最近点が「compactnessで存在を示す」という一つの応用サイクル。 |
| F0-00D | **SPLIT** | 完備距離空間の論理と、ノルム/Banach・有限/無限次元の論理が独立。D/D1へ分割。 |
| F0-00D1 | **OK** | ノルム→Banach→有限次元ノルム同値→有限次元完備→無限次元反例が一つの比較サイクル。 |`);
audit = audit.replace('Batch 1で教材密度を大きく上げたため、まず次を再監査します。', 'Batch 1で教材密度を大きく上げたため再監査し、Bは維持、CとDは実分割しました。');
write(auditPath, audit);

const contentAuditPath = 'textbook/f0-dream-theater-content-exercise-audit.md';
let contentAudit = fs.readFileSync(contentAuditPath, 'utf8');
contentAudit = contentAudit.replace('Batch 1  距離空間・compactness・completeness\n         + B/C/D の定義・例・A/B演習監査', 'Batch 1  距離空間・compactness・completeness\n         + Bは一講義維持、C→C/C1/C2、D→D/D1へ粒度分割済み\n         + 各分割講義にA/B中心の演習を再配置');
write(contentAuditPath, contentAudit);

console.log('split B/C/D granularity: B=OK, C->C/C1/C2, D->D/D1');
