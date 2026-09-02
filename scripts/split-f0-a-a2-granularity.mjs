import fs from 'node:fs';
import path from 'node:path';

const root='textbook/volumes/00_foundations';
const aDir=`${root}/F0_00A_集合_写像_上限下限`;
const a2Dir=`${root}/F0_00A2_選択公理_Zorn_極大原理`;
const a=fs.readFileSync(`${aDir}/index.md`,'utf8');
const a2=fs.readFileSync(`${a2Dir}/index.md`,'utf8');
const slice=(t,s,e)=>{const i=t.indexOf(s); if(i<0)throw new Error(`missing ${s}`); const j=e?t.indexOf(e,i):t.length; if(j<0)throw new Error(`missing ${e}`); return t.slice(i,j).trim();};
const write=(f,c)=>{fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,c.replace(/\n{3,}/g,'\n\n').trim()+'\n');};
const renumber=(t,pairs)=>{let o=t;for(const [x,y] of pairs)o=o.replace(new RegExp(`^## ${x}\\. `,'m'),`## ${y}. `);return o;};

// A: sets/maps + quantifiers
const aCore=slice(a,'## 1. 集合を「条件を満たすものの集まり」と読む','## 7. 上界・下界');
const aQuant=renumber(slice(a,'## 10. 量化記号を日本語へ戻す','## 11. 後続補講への接続'),[[10,7]]);
const aExercises=`## 8. 演習

### F0-00A-A01 集合記号を読む

- Level: A
- 目安時間: 8分

$A=\\{1,2\\}$、$B=\\{1,2,3\\}$ とする。$A\\subset B$、$A\\in B$ の真偽を判定し、違いを説明せよ。

<!-- solution-start -->
#### 詳細解答
$A$ の全要素1,2は $B$ に入るので $A\\subset B$ は真。一方、$B$ の要素は1,2,3であり、集合 $A$ 自身は要素ではないので $A\\in B$ は偽。$\\subset$ は集合間の包含、$\\in$ は要素と集合の所属関係である。

#### 本番答案
$A\\subset B$ は真、$A\\in B$ は偽。前者は包含、後者は所属を表す。

#### 採点基準（20点）
- 包含判定: 6点
- 所属判定: 6点
- 記号の意味の区別: 6点
- 結論: 2点
<!-- solution-end -->

### F0-00A-B01 逆像は逆関数ではない

- Level: B
- 目安時間: 12分

$f:\\mathbb R\\to\\mathbb R$, $f(x)=x^2$ と $B=[1,4)$ に対して $f^{-1}(B)$ を求めよ。また、$f$ が全単射でないことがこの逆像の定義を妨げない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
$1\\le x^2<4$ より $1\\le |x|<2$。したがって
$$
f^{-1}(B)=(-2,-1]\\cup[1,2).
$$
逆像は「値が $B$ に入る定義域の点全体」という集合操作であり、逆関数 $f^{-1}:Y\\to X$ の存在を仮定しない。

#### 本番答案
$$
\\boxed{f^{-1}([1,4))=(-2,-1]\\cup[1,2)}.
$$
逆像は集合の条件 $f(x)\\in B$ で定義されるため、$f$ の全単射性は不要。

#### 採点基準（20点）
- 不等式変形: 6点
- 逆像: 8点
- 逆関数との区別: 4点
- 結論: 2点
<!-- solution-end -->`;
const aMain=`# F0-00A 補講：集合・写像・量化記号

この補講は、後続の位相・測度・関数解析で使う「集合と写像の言葉」を一度だけ丁寧に整理します。

中心線は

$$
\\boxed{\\text{集合操作}\\to\\text{写像・像・逆像}\\to\\text{単射/全射}\\to\\text{量化記号}}
$$

です。上限・下限と最適化の話は次講F0-00A1へ分離します。

---

${aCore}

---

${aQuant}

---

${aExercises}

---

## 9. 次に進む

集合と写像の読み方が固まったら、実数集合の「境界値」を表すsupremum / infimumへ進みます。

**次：[F0-00A1 上界・下界・supremum・infimum](../F0_00A1_上界_下界_supremum_infimum/index.md)**`;
write(`${aDir}/index.md`,aMain);

const a1Dir=`${root}/F0_00A1_上界_下界_supremum_infimum`;
const aBounds=renumber(slice(a,'## 7. 上界・下界','## 10. 量化記号を日本語へ戻す'),[[7,1],[8,2],[9,3]]);
const a1Exercises=`## 4. 演習

### F0-00A1-A01 supとmaxを区別する

- Level: A
- 目安時間: 8分

$A=(0,1]$ について $\\sup A,\\inf A,\\max A,\\min A$ を求め、存在しないものを明記せよ。

<!-- solution-start -->
#### 詳細解答
上端1は集合に含まれるので $\\sup A=\\max A=1$。下端0は集合に含まれないので $\\inf A=0$ だが最小値は存在しない。

#### 本番答案
$$
\\sup A=1,\\quad\\max A=1,\\quad\\inf A=0,
$$
$\\min A$ は存在しない。

#### 採点基準（20点）
- supremum: 5点
- maximum: 5点
- infimum: 5点
- minimum不存在と理由: 5点
<!-- solution-end -->

### F0-00A1-B01 infimumはあるが最小点がない

- Level: B
- 目安時間: 12分

$C=(0,\\infty)$ 上で $f(x)=x^2$ を考える。$\\inf_{x\\in C}f(x)$ を求め、その値を達成する最小点が存在するか判定せよ。

<!-- solution-start -->
#### 詳細解答
$f(x)>0$ なので0は下界。任意の $\\varepsilon>0$ に対し $x<\\sqrt\\varepsilon$ となる正の $x$ を選べば $f(x)<\\varepsilon$。よって
$$
\\inf_{x\\in C}x^2=0.
$$
しかし $x=0\\notin C$ なので値0は達成されず、最小点は存在しない。

#### 本番答案
$$
\\boxed{\\inf_{x>0}x^2=0}
$$
だが0を達成するには $x=0$ が必要で $0\\notin C$。したがってminimumは存在しない。

#### 採点基準（20点）
- 0が下界: 5点
- 下限であること: 7点
- 非達成の説明: 6点
- 結論: 2点
<!-- solution-end -->`;
const a1=`# F0-00A1 補講：上界・下界・supremum・infimum

この講義では「集合が値を実際に取るか」と「そこより先へ行けない境界値があるか」を分離します。

$$
\\boxed{\\text{sup/infは境界値}\\qquad\\text{max/minは達成値}}
$$

この区別が、後の最適化で「まずinfimumを定義し、その達成を別に証明する」という流れになります。

---

${aBounds}

---

${a1Exercises}

---

## 5. 次に進む

次は、有限回の構成では済まない「任意の集合族から選ぶ」という存在問題を扱います。

**次：[F0-00A2 選択関数・選択公理・可算選択](../F0_00A2_選択公理_Zorn_極大原理/index.md)**`;
write(`${a1Dir}/index.md`,a1);

// A2: choice axiom only
const acIntro=slice(a2,'## 1. 「選ぶ」だけなら何が難しいのか','## 5. 半順序集合');
const acEquiv=renumber(slice(a2,'## 11. 選択公理・Zorn・整列可能定理','## 12. ベクトル空間の基底にも選択公理が潜んでいる'),[[11,5]]);
const acCare=renumber(slice(a2,'## 14. どこまで選択公理を気にすべきか','## 章末チェック'),[[14,6]]);
const a2Exercises=`## 7. 演習

### F0-00A2-A01 選択公理が不要な選択

- Level: A
- 目安時間: 8分

$A_n=\\{n,n+1,n+2,\\ldots\\}$ $(n\\in\\mathbb N)$ に対し、選択関数を一つ明示せよ。この例で完全な選択公理を持ち出す必要がない理由も述べよ。

<!-- solution-start -->
#### 詳細解答
$f(n)=n$ と置けば $f(n)\\in A_n$ なので選択関数である。各集合に明示的な選択規則が与えられているため、存在だけを公理で保証する必要はない。

#### 本番答案
$f(n)=n$ とすればよい。選び方を具体的に構成できるため、選択公理は不要。

#### 採点基準（20点）
- 選択関数: 10点
- 所属確認: 4点
- 選択公理不要の理由: 6点
<!-- solution-end -->

### F0-00A2-B01 可算選択と完全な選択を区別する

- Level: B
- 目安時間: 10分

「非空集合 $A_n$ $(n\\in\\mathbb N)$ から一つずつ元を選べる」という主張と、完全な選択公理の違いを説明せよ。

<!-- solution-start -->
#### 詳細解答
前者は添字集合が $\\mathbb N$ に限られた可算選択公理である。完全な選択公理は任意の添字集合 $I$ に対する非空集合族 $\\{A_i\\}_{i\\in I}$ について選択関数の存在を主張する。したがって完全な選択公理の方が強い。

#### 本番答案
前者は可算集合族だけを対象にする可算選択。完全な選択公理は任意の添字集合に対して選択関数を保証する。

#### 採点基準（20点）
- 可算選択の対象: 7点
- 完全な選択の対象: 7点
- 強さの違い: 6点
<!-- solution-end -->`;
const a2Main=`# F0-00A2 補講：選択関数・選択公理・可算選択

この講義の問いは、**「非空だと分かっている集合が大量にあるとき、全部から一斉に1個ずつ選べると言ってよいのか」**です。

Zornの補題そのものは次講F0-00A3へ分離します。

---

${acIntro}

---

${acEquiv}

---

${acCare}

---

${a2Exercises}

---

## 8. 次に進む

選択公理と同値な形のうち、関数解析で最も使いやすいのがZornの補題です。次講では半順序・chain・極大元から極大延長テンプレートを作ります。

**次：[F0-00A3 半順序・Zornの補題・極大延長](../F0_00A3_半順序_Zorn_極大延長/index.md)**`;
write(`${a2Dir}/index.md`,a2Main);

const a3Dir=`${root}/F0_00A3_半順序_Zorn_極大延長`;
const zornCore=renumber(slice(a2,'## 5. 半順序集合','## 11. 選択公理・Zorn・整列可能定理'),[[5,1],[6,2],[7,3],[8,4],[9,5],[10,6]]);
const zornApps=renumber(slice(a2,'## 12. ベクトル空間の基底にも選択公理が潜んでいる','## 14. どこまで選択公理を気にすべきか'),[[12,7],[13,8]]);
const a3Exercises=`## 9. 演習

### F0-00A3-A01 最大元と極大元

- Level: A
- 目安時間: 8分

$P=\\{\\{1\\},\\{2\\}\\}$ を包含関係で順序付ける。極大元と最大元を求めよ。

<!-- solution-start -->
#### 詳細解答
$\\{1\\}$ と $\\{2\\}$ は互いに比較不能で、どちらにも真に大きい要素が $P$ 内にないため両方が極大元。全要素を含む一つの要素は存在しないので最大元はない。

#### 本番答案
極大元は $\\{1\\},\\{2\\}$ の2つ。最大元は存在しない。

#### 採点基準（20点）
- 極大元2つ: 10点
- 最大元不存在: 6点
- 理由: 4点
<!-- solution-end -->

### F0-00A3-B01 Zornテンプレートのchain上界

- Level: B
- 目安時間: 15分

ベクトル空間 $X$ の一次独立集合全体を包含関係で順序付ける。chain $\\mathcal C$ に対して $U=\\bigcup_{A\\in\\mathcal C}A$ が一次独立であることを示せ。

<!-- solution-start -->
#### 詳細解答
$U$ から有限個 $x_1,\\ldots,x_m$ を取り
$$
\\sum_{j=1}^m c_jx_j=0
$$
とする。各 $x_j$ はある $A_j\\in\\mathcal C$ に属する。$\\mathcal C$ はchainで有限個の $A_j$ は包含関係で比較可能なので、その中の最大の集合 $A_* $ が全ての $x_j$ を含む。$A_*$ は一次独立だから $c_1=\\cdots=c_m=0$。従って $U$ は一次独立。

#### 本番答案
任意の有限個 $x_1,\\ldots,x_m\\in U$ はchain中の一つの集合 $A_*$ に同時に含まれる。$A_*$ が一次独立なので、それらの有限線形関係は自明。よって $U$ も一次独立。

#### 採点基準（20点）
- 有限個を取る: 4点
- chainから共通の上位集合を取る: 8点
- 一次独立性適用: 6点
- 結論: 2点
<!-- solution-end -->`;
const a3=`# F0-00A3 補講：半順序・Zornの補題・極大延長

F0-00A2で選択公理を導入しました。この講義では、その同値な道具であるZornの補題を、**「これ以上延長できない候補を得る」ための証明テンプレート**として使える形にします。

---

${zornCore}

---

${zornApps}

---

${a3Exercises}

---

## 10. 次に進む

Zornの補題は後のF0-02C6 Hahn--Banachで再登場します。標準通読では次に距離空間へ進みます。

**次：[F0-00B 距離空間・開集合・閉集合・収束](../F0_00B_距離空間_開集合_閉集合_収束/index.md)**`;
write(`${a3Dir}/index.md`,a3);

// metadata
write(`${aDir}/chapter.yaml`,`id: "F0-00A"\ntitle: "補講：集合・写像・量化記号"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00\nofficial_scope: []\nlearning_objectives:\n  - 集合・部分集合・集合演算を記号と日本語で読める\n  - 像と逆像を区別し、逆像が逆関数を必要としないことを説明できる\n  - 単射・全射・全単射を区別できる\n  - 合成写像と逆像の関係を使える\n  - 量化記号を日本語へ戻して読める\ndefinitions:\n  - { id: F000A-DEF-01, name: 部分集合 }\n  - { id: F000A-DEF-02, name: 像 }\n  - { id: F000A-DEF-03, name: 逆像 }\n  - { id: F000A-DEF-04, name: 単射 }\n  - { id: F000A-DEF-05, name: 全射 }\ntheorems: []\ncanonical_examples: [x平方の区間逆像]\nproblem_patterns: [SET-NOTATION-1, PREIMAGE-1]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 1.5, exercises: 0.6, review: 0.25 }\n`);
write(`${aDir}/glossary.yaml`,`chapter: "F0-00A"\nterms:\n  - term: 逆像\n    english: preimage\n    meaning: B⊂Y に対する {x∈X:f(x)∈B}。逆関数の存在は必要ない。\n  - term: 単射\n    english: injective map\n    meaning: 同じ値へ写る二点が必ず同じ点である写像。\n  - term: 全射\n    english: surjective map\n    meaning: 終域の各点が少なくとも一つの定義域の点の像になっている写像。\n`);
write(`${a1Dir}/chapter.yaml`,`id: "F0-00A1"\ntitle: "補講：上界・下界・supremum・infimum"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00A\nofficial_scope: []\nlearning_objectives:\n  - 上界・下界・supremum・infimumを定義できる\n  - supremum/infimumとmaximum/minimumを区別できる\n  - 最適化でinfimumから始める理由を説明できる\ndefinitions:\n  - { id: F000A1-DEF-01, name: 上界 }\n  - { id: F000A1-DEF-02, name: 下界 }\n  - { id: F000A1-DEF-03, name: supremum }\n  - { id: F000A1-DEF-04, name: infimum }\ntheorems: []\ncanonical_examples: [開区間のsupremumとinfimum, infimumが達成されない最適化]\nproblem_patterns: [SUP-INF-1, ATTAINMENT-1]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 1.0, exercises: 0.6, review: 0.25 }\n`);
write(`${a1Dir}/glossary.yaml`,`chapter: "F0-00A1"\nterms:\n  - term: supremum\n    english: supremum\n    meaning: 上界全体の中で最小のもの。集合の要素とは限らない。\n  - term: infimum\n    english: infimum\n    meaning: 下界全体の中で最大のもの。集合の要素とは限らない。\n  - term: maximum\n    english: maximum\n    meaning: 集合に実際に属する最大の要素。\n`);
write(`${a2Dir}/chapter.yaml`,`id: "F0-00A2"\ntitle: "補講：選択関数・選択公理・可算選択"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00A\nofficial_scope: []\nlearning_objectives:\n  - 選択関数と選択公理を定義できる\n  - 明示的な選択規則がある場合と公理的存在保証を区別できる\n  - 可算選択と完全な選択公理を区別できる\n  - 選択公理・Zornの補題・整列可能定理がZF上で同値であることを位置付けられる\ndefinitions:\n  - { id: F000A2-DEF-01, name: 選択関数 }\n  - { id: F000A2-DEF-02, name: 選択公理 }\n  - { id: F000A2-DEF-03, name: 可算選択公理 }\ntheorems:\n  - { id: F000A2-THM-01, name: 選択公理・Zornの補題・整列可能定理の同値性 }\ncanonical_examples: [明示的選択関数]\nproblem_patterns: [CHOICE-FUNCTION-1, COUNTABLE-CHOICE-1]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 1.4, exercises: 0.6, review: 0.3 }\n`);
write(`${a2Dir}/glossary.yaml`,`chapter: "F0-00A2"\nterms:\n  - term: 選択関数\n    english: choice function\n    meaning: 非空集合族の各集合から一つずつ元を選ぶ写像。\n  - term: 選択公理\n    english: axiom of choice\n    meaning: 非空集合からなる任意の族に選択関数が存在するとする公理。\n  - term: 可算選択公理\n    english: axiom of countable choice\n    meaning: 可算個の非空集合から一つずつ元を選べるとする選択原理。\n`);
write(`${a3Dir}/chapter.yaml`,`id: "F0-00A3"\ntitle: "補講：半順序・Zornの補題・極大延長"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00A\n  - F0-00A2\nofficial_scope: []\nlearning_objectives:\n  - 半順序集合・chain・上界・極大元を定義できる\n  - 最大元と極大元を区別できる\n  - Zornの補題を正確に述べられる\n  - Zornを候補集合・順序・chain上界・極大元の4段階で適用できる\n  - Hamel基底とHahn--Banachの極大延長にZornが使われる理由を説明できる\ndefinitions:\n  - { id: F000A3-DEF-01, name: 半順序集合 }\n  - { id: F000A3-DEF-02, name: chain }\n  - { id: F000A3-DEF-03, name: 上界 }\n  - { id: F000A3-DEF-04, name: 極大元 }\ntheorems:\n  - { id: F000A3-THM-01, name: Zornの補題 }\ncanonical_examples: [極大元はあるが最大元がない有限半順序集合, 一次独立集合のchainの合併, Hahn--Banachの延長候補族]\nproblem_patterns: [MAXIMAL-VS-MAXIMUM-1, ZORN-TEMPLATE-1]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2.0, exercises: 0.8, review: 0.35 }\n`);
write(`${a3Dir}/glossary.yaml`,`chapter: "F0-00A3"\nterms:\n  - term: 半順序集合\n    english: partially ordered set\n    meaning: 反射律・反対称律・推移律を満たす順序関係を備えた集合。\n  - term: chain\n    english: chain\n    meaning: 半順序集合の部分集合で、任意の二要素が比較可能なもの。\n  - term: 極大元\n    english: maximal element\n    meaning: 自分より真に大きい要素が存在しない要素。最大元とは異なる。\n  - term: Zornの補題\n    english: Zorn's lemma\n    meaning: すべてのchainが上界を持つ半順序集合には極大元が存在するという定理。\n  - term: Hamel基底\n    english: Hamel basis\n    meaning: 各ベクトルを有限線形結合で一意に表す基底。一般の存在証明には標準的にZornを使う。\n`);

// manifest
const manifestPath='textbook/dream-theater-index.json';
const m=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const sec=m.sections.find(s=>s.name==='DREAM THEATER 本編');
const A='textbook/volumes/00_foundations/F0_00A_集合_写像_上限下限/index.md';
const A1='textbook/volumes/00_foundations/F0_00A1_上界_下界_supremum_infimum/index.md';
const A2='textbook/volumes/00_foundations/F0_00A2_選択公理_Zorn_極大原理/index.md';
const A3='textbook/volumes/00_foundations/F0_00A3_半順序_Zorn_極大延長/index.md';
for(const [p,after] of [[A1,A],[A3,A2]]) if(!sec.paths.includes(p)){const i=sec.paths.indexOf(after);sec.paths.splice(i+1,0,p);}
write(manifestPath,JSON.stringify(m,null,2));

// Facade foundation list: insert and renumber only that block
const facadePath='textbook/dream-theater.md';
let facade=fs.readFileSync(facadePath,'utf8');
const fs0=facade.indexOf('#### 基礎論\n\n'); const fe=facade.indexOf('\n\n#### 制約付き最適化',fs0); if(fs0<0||fe<0)throw new Error('facade list missing');
let block=facade.slice(fs0,fe);
block=block.replace(/\n2\. \[F0-00A2 /,'\n2. [F0-00A1 上界・下界・supremum・infimum](textbook/volumes/00_foundations/F0_00A1_上界_下界_supremum_infimum/index.md)\n3. [F0-00A2 ');
block=block.replace(/\n4\. \[F0-00B /,'\n4. [F0-00A3 半順序・Zornの補題・極大延長](textbook/volumes/00_foundations/F0_00A3_半順序_Zorn_極大延長/index.md)\n5. [F0-00B ');
let n=0; block=block.replace(/^\d+\. /gm,()=>`${++n}. `);
facade=facade.slice(0,fs0)+block+facade.slice(fe);write(facadePath,facade);

// roadmaps / dependency graph
const rp=`${root}/F0_00R_基礎論ロードマップ/index.md`;let r=fs.readFileSync(rp,'utf8');r=r.replace('F0-00 → A → A2 → B','F0-00 → A → A1 → A2 → A3 → B');r=r.replace(/A2はHahn--BanachのZorn証明/g,'A3はHahn--BanachのZorn証明');write(rp,r);
const dp='textbook/dependency-graph.md';let dep=fs.readFileSync(dp,'utf8');dep=dep.replace('F0-00A  集合・写像・sup/inf\n  ↓\nF0-00A2 選択公理・Zorn','F0-00A  集合・写像・量化記号\n  ↓\nF0-00A1 sup/inf・最適化の入口\n  ↓\nF0-00A2 選択公理・可算選択\n  ↓\nF0-00A3 半順序・Zorn・極大延長');dep=dep.replace(/A2はF0-02C6/g,'A3はF0-02C6');write(dp,dep);

// granularity audit status
const gp='textbook/f0-dream-theater-granularity-audit.md';let g=fs.readFileSync(gp,'utf8');
g=g.replace('次は標準基礎論ルートの残りを同じ基準で監査します。','A/A2も同じ基準で再監査し、A→A/A1、A2→A2/A3へ分割しました。次は標準基礎論ルートの残りを監査します。');
g=g.replace('```text\nA → A2\nE → E2 → F → G','```text\nA → A1 → A2 → A3  [再監査・分割済み]\nE → E2 → F → G');
const marker='| F0-00B | **OK** |';
if(!g.includes('| 旧F0-00A |')){const i=g.indexOf(marker);g=g.slice(0,i)+`| 旧F0-00A | **SPLIT済み** | 集合・写像とsup/inf・最適化が独立した学習サイクル。 |\n| F0-00A | **OK** | 集合操作→写像→逆像→量化記号が一つの記法基礎サイクル。 |\n| F0-00A1 | **OK** | 上下界→sup/inf→max/min→最適化の達成問題が一つのサイクル。 |\n| 旧F0-00A2 | **SPLIT済み** | 選択公理とZornの極大延長テンプレートが独立した学習サイクル。 |\n| F0-00A2 | **OK** | 選択関数→選択公理→可算選択→同値な選択原理の位置付けで閉じる。 |\n| F0-00A3 | **OK** | 半順序→chain→Zorn→基底/Hahn--Banachの極大延長で閉じる。 |\n`+g.slice(i);}
write(gp,g);

console.log('split A/A2: A,A1,A2,A3');
