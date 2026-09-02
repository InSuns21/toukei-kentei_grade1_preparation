import fs from 'node:fs';
import path from 'node:path';

const root='textbook/volumes/00_foundations';
const read=p=>fs.readFileSync(p,'utf8');
const write=(p,t)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,t.replace(/\n{4,}/g,'\n\n\n').trim()+'\n');};
const slice=(t,s,e)=>{const i=t.indexOf(s);if(i<0)throw new Error(`missing start: ${s}`);const j=e?t.indexOf(e,i):t.length;if(j<0)throw new Error(`missing end: ${e}`);return t.slice(i,j).trim();};
const renumberH2=t=>{let n=0;return t.replace(/^## \d+\. /gm,()=>`## ${++n}. `);};
const insertAfter=(t,needle,addition)=>t.includes(addition.trim())?t:t.replace(needle,needle+addition);

const eDir=`${root}/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影`;
const e1Dir=`${root}/F0_00E1_内積_Gram_Schmidt_射影_QR`;
const e2Dir=`${root}/F0_00E2_Cauchy_Schwarz_Bessel_Parseval`;
const fDir=`${root}/F0_00F_線形写像_固有空間_スペクトル定理_SVD`;
const f1Dir=`${root}/F0_00F1_固有空間_スペクトル定理_PSD`;
const f2Dir=`${root}/F0_00F2_SVD_特異値_作用素ノルム`;
const gDir=`${root}/F0_00G_凸集合_凸関数_凸最適化`;

const E=read(`${eDir}/index.md`);
const E2=read(`${e2Dir}/index.md`);
const F=read(`${fDir}/index.md`);
const G=read(`${gDir}/index.md`);

const eCore=renumberH2(slice(E,'## 1. ベクトル空間は「足して伸ばしても同じ世界にいる」集合','## 6. 内積と直交'));
const eGeom=renumberH2(slice(E,'## 6. 内積と直交','## 19. 関数解析へ持っていく語彙'));
const fCore=renumberH2(slice(F,'## 1. 線形写像と行列','## 5. 固有値と固有空間'));
const fSpec=renumberH2(slice(F,'## 5. 固有値と固有空間','## 16. 一般の行列は固有値だけでは足りない'));
const fSvd=renumberH2(slice(F,'## 16. 一般の行列は固有値だけでは足りない','## 25. 通読ルートでの位置'));
const gCore=renumberH2(slice(G,'## 1. 凸結合','## 12. Slater条件'));

const eEx=`
---

## 6. 演習

### F0-00E-A01 spanと一次独立

- Level: A
- 目安時間: 8分

$v_1=(1,0,1)^T$, $v_2=(0,1,1)^T$ とする。$x=(2,3,5)^T$ が $\\operatorname{span}(v_1,v_2)$ に属することを示し、係数を求めよ。

<!-- solution-start -->
#### 詳細解答
$av_1+bv_2=(a,b,a+b)$ なので $a=2,b=3$ とすれば $(2,3,5)$ になる。
#### 本番答案
$x=2v_1+3v_2$ より $x\\in\\operatorname{span}(v_1,v_2)$。
#### 採点基準（20点）
- 線形結合の設定: 6点
- 係数決定: 8点
- 所属の結論: 6点
<!-- solution-end -->

### F0-00E-B01 基底座標の一意性

- Level: B
- 目安時間: 12分

$v_1,\\dots,v_n$ が一次独立で、$x=\\sum_i a_iv_i=\\sum_i b_iv_i$ とする。$a_i=b_i$ を示せ。

<!-- solution-start -->
#### 詳細解答
二式を引くと $\\sum_i(a_i-b_i)v_i=0$。一次独立性より全ての係数が0なので $a_i=b_i$。
#### 本番答案
一次独立性を $\\sum_i(a_i-b_i)v_i=0$ に適用すれば $a_i-b_i=0$。
#### 採点基準（20点）
- 差を取る: 6点
- 一次独立性の適用: 10点
- 結論: 4点
<!-- solution-end -->`;

const e1Ex=`
---

## 14. 演習

### F0-00E1-A01 Gram--Schmidt

- Level: A
- 目安時間: 12分

$v_1=(1,1)^T$, $v_2=(1,0)^T$ にGram--Schmidtを適用し、正規直交基底を求めよ。

<!-- solution-start -->
#### 詳細解答
$q_1=(1,1)^T/\\sqrt2$。$u_2=v_2-\\langle v_2,q_1\\rangle q_1=(1/2,-1/2)^T$ なので $q_2=(1,-1)^T/\\sqrt2$。
#### 本番答案
$\\displaystyle q_1=\\frac1{\\sqrt2}(1,1)^T,\\quad q_2=\\frac1{\\sqrt2}(1,-1)^T$。
#### 採点基準（20点）
- $q_1$: 5点
- 射影成分: 6点
- $u_2$: 4点
- $q_2$: 5点
<!-- solution-end -->

### F0-00E1-B01 射影と最短距離

- Level: B
- 目安時間: 15分

$q_1,\\dots,q_k$ を部分空間 $V$ の正規直交基底とし、$p=\\sum_i\\langle x,q_i\\rangle q_i$ とする。任意の $v\\in V$ に対し $\\|x-v\\|^2=\\|x-p\\|^2+\\|p-v\\|^2$ を示せ。

<!-- solution-start -->
#### 詳細解答
$x-p$ は各 $q_i$ に直交するので $x-p\\in V^\\perp$。一方 $p-v\\in V$。従って両者は直交し、$x-v=(x-p)+(p-v)$ にPythagorasを適用する。
#### 本番答案
$x-p\\perp V$ と $p-v\\in V$ より直交。Pythagorasから所望の等式。
#### 採点基準（20点）
- $x-p\\perp V$: 8点
- 分解: 4点
- Pythagoras: 6点
- 結論: 2点
<!-- solution-end -->`;

const e2Ex=`
---

## 13. 演習

### F0-00E2-A01 Cauchy--Schwarz

- Level: A
- 目安時間: 8分

$x=(1,2)^T$, $y=(2,-1)^T$ についてCauchy--Schwarz不等式を数値で確認せよ。

<!-- solution-start -->
#### 詳細解答
$\\langle x,y\\rangle=0$、$\\|x\\|=\\|y\\|=\\sqrt5$ なので $0\\le5$。
#### 本番答案
$|\\langle x,y\\rangle|=0\\le\\sqrt5\\sqrt5=5$。
#### 採点基準（20点）
- 内積: 6点
- 各ノルム: 8点
- 比較: 6点
<!-- solution-end -->

### F0-00E2-B01 Besselの不足分

- Level: B
- 目安時間: 12分

正規直交系 $q_1,\\dots,q_k$ と $p=\\sum_i\\langle x,q_i\\rangle q_i$ に対し、$\\|x\\|^2-\\sum_i|\\langle x,q_i\\rangle|^2=\\|x-p\\|^2$ を示せ。

<!-- solution-start -->
#### 詳細解答
$p\\perp(x-p)$ なので $\\|x\\|^2=\\|p\\|^2+\\|x-p\\|^2$。正規直交性より $\\|p\\|^2=\\sum_i|\\langle x,q_i\\rangle|^2$。
#### 本番答案
Pythagorasと正規直交性を組み合わせれば直ちに従う。
#### 採点基準（20点）
- 直交性: 6点
- Pythagoras: 6点
- $\\|p\\|^2$ の計算: 6点
- 結論: 2点
<!-- solution-end -->`;

const fEx=`
---

## 5. 演習

### F0-00F-A01 kernelとimage

- Level: A
- 目安時間: 10分

$T:\\mathbb R^3\\to\\mathbb R^2$, $T(x,y,z)=(x+y,y+z)$ のkernelの次元を求めよ。

<!-- solution-start -->
#### 詳細解答
$x+y=0,y+z=0$ より $(x,y,z)=t(-1,1,-1)$。従ってkernelは1次元。
#### 本番答案
$\\ker T=\\operatorname{span}((-1,1,-1)^T)$、よって $\\dim\\ker T=1$。
#### 採点基準（20点）
- 方程式: 6点
- 一般解: 8点
- 次元: 6点
<!-- solution-end -->

### F0-00F-B01 rank-nullity

- Level: B
- 目安時間: 12分

上の $T$ についてrank-nullity theoremから $\\dim\\operatorname{Im}T$ を求め、実際に像が $\\mathbb R^2$ であることを確認せよ。

<!-- solution-start -->
#### 詳細解答
定義域は3次元、nullityは1なのでrankは2。終域も2次元だから像は $\\mathbb R^2$。実際 $T(a,0,b)=(a,b)$。
#### 本番答案
$3=1+\\operatorname{rank}T$ よりrank 2。さらに任意の $(a,b)$ は $T(a,0,b)$ なので全射。
#### 採点基準（20点）
- rank-nullity適用: 8点
- rank: 4点
- 全射確認: 6点
- 結論: 2点
<!-- solution-end -->`;

const f1Ex=`
---

## 12. 演習

### F0-00F1-A01 対称行列の固有ベクトル直交性

- Level: A
- 目安時間: 10分

実対称行列 $A$ の固有ベクトル $u,v$ が異なる固有値 $\\lambda,\\mu$ に属するとき $u\\perp v$ を示せ。

<!-- solution-start -->
#### 詳細解答
$\\langle Au,v\\rangle=\\langle u,Av\\rangle$ より $\\lambda\\langle u,v\\rangle=\\mu\\langle u,v\\rangle$。$\\lambda\\ne\\mu$ なので内積は0。
#### 本番答案
$(\\lambda-\\mu)\\langle u,v\\rangle=0$ から従う。
#### 採点基準（20点）
- 対称性: 7点
- 固有方程式代入: 7点
- 結論: 6点
<!-- solution-end -->

### F0-00F1-B01 PSDと固有値

- Level: B
- 目安時間: 12分

実対称行列 $A=Q\\Lambda Q^T$ に対し、$A\\succeq0$ と全固有値 $\\lambda_i\\ge0$ が同値であることを示せ。

<!-- solution-start -->
#### 詳細解答
$z=Q^Tx$ とすると $x^TAx=\\sum_i\\lambda_i z_i^2$。全固有値非負なら右辺非負。逆にある $\\lambda_j<0$ なら対応固有ベクトル $q_j$ に対し $q_j^TAq_j=\\lambda_j<0$ でPSDに反する。
#### 本番答案
スペクトル座標で二次形式を $\\sum_i\\lambda_i z_i^2$ と書き、両方向を示す。
#### 採点基準（20点）
- 座標変換: 6点
- 十分性: 5点
- 必要性の反証: 7点
- 結論: 2点
<!-- solution-end -->`;

const f2Ex=`
---

## 10. 演習

### F0-00F2-A01 特異値

- Level: A
- 目安時間: 10分

$A=\\operatorname{diag}(3,1)$ の特異値と作用素ノルムを求めよ。

<!-- solution-start -->
#### 詳細解答
$A^TA=\\operatorname{diag}(9,1)$ なので特異値は3,1。最大特異値より作用素ノルムは3。
#### 本番答案
$\\sigma_1=3,\\sigma_2=1,\\|A\\|_{op}=3$。
#### 採点基準（20点）
- $A^TA$: 6点
- 特異値: 8点
- 作用素ノルム: 6点
<!-- solution-end -->

### F0-00F2-B01 SVDとrank

- Level: B
- 目安時間: 12分

$A=U_r\\Sigma_rV_r^T$ が薄いSVDで $\\Sigma_r$ の対角成分が全て正とする。$\\operatorname{rank}(A)=r$ を説明せよ。

<!-- solution-start -->
#### 詳細解答
$U_r,V_r$ は列直交でrank $r$、$\\Sigma_r$ は正則。$A$ の像は $U_r$ の列空間に一致し、その次元が $r$。
#### 本番答案
$\\Sigma_r$ が正則なので $A$ は $V_r$ の $r$ 次元空間を $U_r$ の $r$ 次元空間へ同型に写す。従ってrankは $r$。
#### 採点基準（20点）
- $\\Sigma_r$ の正則性: 6点
- 像の同定: 8点
- rank結論: 6点
<!-- solution-end -->`;

const gEx=`
---

## 12. 演習

### F0-00G-A01 凸集合判定

- Level: A
- 目安時間: 8分

$C=\\{x\\in\\mathbb R^n:a^Tx\\le b\\}$ が凸であることを示せ。

<!-- solution-start -->
#### 詳細解答
$x,y\\in C$, $0\\le t\\le1$ とすると $a^T((1-t)x+ty)=(1-t)a^Tx+ta^Ty\\le b$。
#### 本番答案
凸結合に線形性を適用すれば制約を保つ。
#### 採点基準（20点）
- 凸結合設定: 5点
- 線形性: 7点
- 不等式: 6点
- 結論: 2点
<!-- solution-end -->

### F0-00G-B01 局所最小は大域最小

- Level: B
- 目安時間: 12分

凸集合 $C$ 上の凸関数 $f$ について、局所最小点が大域最小点であることを示せ。

<!-- solution-start -->
#### 詳細解答
局所最小 $x^*$ が大域最小でないなら $f(y)<f(x^*)$ となる $y\\in C$ がある。十分小さい $t>0$ で $z_t=(1-t)x^*+ty$ は $x^*$ の近傍にあり、凸性から $f(z_t)\\le(1-t)f(x^*)+tf(y)<f(x^*)$。局所最小性に矛盾。
#### 本番答案
大域的により小さい点への線分上で、凸性により任意に近い改善点ができるため矛盾。
#### 採点基準（20点）
- 背理法: 4点
- 凸結合点: 5点
- 凸性評価: 7点
- 矛盾と結論: 4点
<!-- solution-end -->`;

write(`${eDir}/index.md`,`# F0-00E ベクトル空間・span・一次独立・基底\n\nこの講義では、線形代数の土台を「どのベクトルを組み合わせれば空間を表せるか」という問いに絞ります。内積・直交化・射影は次講F0-00E1へ分離します。\n\n---\n\n${eCore}\n${eEx}\n\n---\n\n## 7. 次に進む\n\n**次：[F0-00E1 内積・Gram--Schmidt・直交射影・QR](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md)**`);

write(`${e1Dir}/index.md`,`# F0-00E1 内積・Gram--Schmidt・直交射影・QR\n\nF0-00Eで基底まで準備しました。この講義では内積から直交構造を入れ、正規直交基底・射影・最小二乗・QRまでを一つの幾何としてつなぎます。\n\n$$\\boxed{\\text{内積}\\to\\text{Gram--Schmidt}\\to\\text{射影}\\to\\text{最小二乗}\\to\\text{QR}}$$\n\n---\n\n${eGeom}\n${e1Ex}\n\n---\n\n## 15. 次に進む\n\n内積が作るノルムと直交展開の基本不等式を次講で証明します。\n\n**次：[F0-00E2 Cauchy--Schwarz・Bessel・Parseval](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md)**`);

let e2=E2;
e2=e2.replace('[F0-00E](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md) では、Gram--Schmidt直交化によって正規直交基底を作り、直交射影と最小二乗法を導きました。','[F0-00E1](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md) では、Gram--Schmidt直交化によって正規直交基底を作り、直交射影と最小二乗法を導きました。');
e2=e2.replace('## 13. F0-00Fへの接続',`${e2Ex}\n\n---\n\n## 14. F0-00Fへの接続`);
write(`${e2Dir}/index.md`,e2);

write(`${fDir}/index.md`,`# F0-00F 線形写像・kernel・image・rank-nullity\n\nこの講義では行列を「基底を選んだ線形写像の座標表示」として読み直し、kernel・image・rank-nullityまでを閉じます。固有空間以降は次講F0-00F1へ分離します。\n\n---\n\n${fCore}\n${fEx}\n\n---\n\n## 6. 次に進む\n\n**次：[F0-00F1 固有空間・スペクトル定理・PSD](../F0_00F1_固有空間_スペクトル定理_PSD/index.md)**`);

write(`${f1Dir}/index.md`,`# F0-00F1 固有空間・実対称行列・スペクトル定理・PSD\n\nF0-00Fで線形写像のkernelとimageを準備しました。この講義では自己写像の固有方向から、実対称行列の正規直交固有基底とPSDまでを組み立てます。\n\n$$\\boxed{\\text{固有空間}\\to\\text{対称性}\\to\\text{Rayleigh商}\\to\\text{スペクトル定理}\\to\\text{PSD}}$$\n\n---\n\n${fSpec.replaceAll('F0-00EのGram--Schmidt','F0-00E1のGram--Schmidt').replaceAll('F0-00CのHeine--Borel','F0-00C1のHeine--Borel')}\n${f1Ex}\n\n---\n\n## 13. 次に進む\n\n一般の長方形行列へ進むには、$A^TA$ のスペクトル分解を使います。\n\n**次：[F0-00F2 SVD・特異値・作用素ノルム](../F0_00F2_SVD_特異値_作用素ノルム/index.md)**`);

write(`${f2Dir}/index.md`,`# F0-00F2 SVD・特異値・作用素ノルム\n\nF0-00F1のスペクトル定理を $A^TA$ に適用し、任意の長方形行列を方向別の伸縮へ分解します。\n\n$$\\boxed{A^TA\\to\\text{特異値}\\to\\text{SVD}\\to\\operatorname{rank}\\to\\text{作用素ノルム}}$$\n\n---\n\n${fSvd}\n${f2Ex}\n\n---\n\n## 11. 次に進む\n\nこれで有限次元線形代数側の床が揃いました。次は凸性を準備してF0-02の双対・KKTへ進みます。\n\n**次：[F0-00G 凸集合・凸関数・凸最適化](../F0_00G_凸集合_凸関数_凸最適化/index.md)**`);

write(`${gDir}/index.md`,`# F0-00G 凸集合・凸関数・凸最適化の基礎\n\nこの講義では「凸性がなぜ局所情報を大域最適化へ変えるのか」に集中します。Slater条件・強双対性は双対関数を定義した後の話なので、次のF0-02へ責務を移します。\n\n$$\\boxed{\\text{凸集合}\\to\\text{凸関数}\\to\\text{一次支持}\\to\\text{局所最小=大域最小}\\to\\text{凸実行可能集合}}$$\n\n---\n\n${gCore.replaceAll('F0-00/F0-00Fで扱った正定値・半正定値','F0-00F1で扱った正定値・半正定値')}\n${gEx}\n\n---\n\n## 13. F0-02への接続\n\nここまでで凸問題の幾何は準備できました。次のF0-02ではLagrangian・双対関数・弱双対性を定義した上で、Slater条件による強双対性とKKT条件を扱います。\n\n**次：[F0-02 制約付き最適化・双対問題・KKT条件](../F0_02_制約付き最適化_双対_KKT/index.md)**`);

write(`${eDir}/chapter.yaml`,`id: "F0-00E"\ntitle: "ベクトル空間・span・一次独立・基底"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00\n  - F0-00A\n  - F0-00B\nofficial_scope: []\nlearning_objectives:\n  - ベクトル空間・部分空間・線形包を説明できる\n  - 一次独立・基底・次元を相互に結び付けて説明できる\n  - 基底に対する座標表示の一意性を説明できる\ndefinitions:\n  - { id: F000E-DEF-01, name: ベクトル空間 }\n  - { id: F000E-DEF-02, name: 線形部分空間 }\n  - { id: F000E-DEF-03, name: 線形包 }\n  - { id: F000E-DEF-04, name: 一次独立 }\n  - { id: F000E-DEF-05, name: 基底と次元 }\ntheorems: []\ncanonical_examples: [R3の部分空間, spanの具体計算, 基底座標]\nproblem_patterns: [LA-BASIS-1]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2, exercises: 0.5, review: 0.5 }\n`);
write(`${eDir}/glossary.yaml`,`chapter: "F0-00E"\nterms:\n  - { term: ベクトル空間, english: vector space, meaning: ベクトルの加法とスカラー倍について閉じた線形構造。 }\n  - { term: 線形包, english: span, meaning: 与えたベクトルの有限線形結合全体。 }\n  - { term: 一次独立, english: linear independence, meaning: 自明でない線形結合で0を作れない性質。 }\n  - { term: 基底, english: basis, meaning: 空間を張る一次独立なベクトル族。 }\n`);
write(`${e1Dir}/chapter.yaml`,`id: "F0-00E1"\ntitle: "内積・Gram--Schmidt・直交射影・QR"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00E\nofficial_scope: []\nlearning_objectives:\n  - 内積・直交・正規直交系・直交補空間を定義できる\n  - Gram--Schmidt直交化法で正規直交基底を構成できる\n  - 直交射影の公式と最短距離性を導ける\n  - 最小二乗の正規方程式を残差の直交性から導ける\n  - Gram--SchmidtとQR分解を結び付けられる\ndefinitions:\n  - { id: F000E1-DEF-01, name: 内積 }\n  - { id: F000E1-DEF-02, name: 正規直交系 }\n  - { id: F000E1-DEF-03, name: 直交補空間 }\n  - { id: F000E1-DEF-04, name: 直交射影 }\n  - { id: F000E1-DEF-05, name: QR分解 }\ntheorems:\n  - { id: F000E1-THM-01, name: Gram--Schmidt直交化法 }\n  - { id: F000E1-THM-02, name: 有限次元直交分解 }\n  - { id: F000E1-THM-03, name: 直交射影の最短距離性 }\n  - { id: F000E1-THM-04, name: 最小二乗の正規方程式 }\ncanonical_examples: [Gram--Schmidt, QQT射影, 最小二乗, QR分解]\nproblem_patterns: [LA-GS-1, LA-PROJ-1, LA-QR-1]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 3, exercises: 1, review: 0.5 }\n`);
write(`${e1Dir}/glossary.yaml`,`chapter: "F0-00E1"\nterms:\n  - { term: 内積, english: inner product, meaning: 長さと角度を定める二変数の線形構造。 }\n  - { term: 正規直交系, english: orthonormal system, meaning: 互いに直交し各ベクトルのノルムが1の族。 }\n  - { term: 直交射影, english: orthogonal projection, meaning: 残差が対象部分空間に直交する射影。 }\n  - { term: QR分解, english: QR decomposition, meaning: 行列を正規直交列を持つQと上三角Rへ分解すること。 }\n`);

let e2Yaml=read(`${e2Dir}/chapter.yaml`).replace('  - F0-00E\n','  - F0-00E1\n').replace('exercise_counts: { level_a: 0, level_b: 0, level_c: 0, level_d: 0 }','exercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }');
write(`${e2Dir}/chapter.yaml`,e2Yaml);

write(`${fDir}/chapter.yaml`,`id: "F0-00F"\ntitle: "線形写像・kernel・image・rank-nullity"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00E\nofficial_scope: []\nlearning_objectives:\n  - 線形写像と行列表現を基底との関係から説明できる\n  - 基底変換と相似変換の意味を説明できる\n  - 核・像・階数・退化次数を定義できる\n  - rank-nullity theoremを基底から証明できる\ndefinitions:\n  - { id: F000F-DEF-01, name: 線形写像 }\n  - { id: F000F-DEF-02, name: 核 }\n  - { id: F000F-DEF-03, name: 像 }\ntheorems:\n  - { id: F000F-THM-01, name: 階数・退化次数の定理 }\ncanonical_examples: [線形写像の行列表現, kernelとimage]\nproblem_patterns: [LA-MAP-1]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2, exercises: 0.5, review: 0.5 }\n`);
write(`${fDir}/glossary.yaml`,`chapter: "F0-00F"\nterms:\n  - { term: 線形写像, english: linear map, meaning: 加法とスカラー倍を保つ写像。 }\n  - { term: 核, english: kernel, meaning: 0へ写る入力全体の部分空間。 }\n  - { term: 像, english: image, meaning: 線形写像で到達できる出力全体の部分空間。 }\n  - { term: 階数・退化次数の定理, english: rank-nullity theorem, meaning: 定義域の次元がkernelの次元とimageの次元の和になる定理。 }\n`);
write(`${f1Dir}/chapter.yaml`,`id: "F0-00F1"\ntitle: "固有空間・実対称行列・スペクトル定理・PSD"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00\n  - F0-00C2\n  - F0-00E1\n  - F0-00E2\n  - F0-00F\nofficial_scope: []\nlearning_objectives:\n  - 固有値・固有空間・不変部分空間を説明できる\n  - 実対称行列の異なる固有空間が直交することを証明できる\n  - Rayleigh商とコンパクト性からスペクトル定理の流れを説明できる\n  - 正定値・半正定値を固有値で特徴付けられる\n  - PSD行列の平方根を構成できる\ndefinitions:\n  - { id: F000F1-DEF-01, name: 固有空間 }\n  - { id: F000F1-DEF-02, name: 不変部分空間 }\n  - { id: F000F1-DEF-03, name: Rayleigh商 }\ntheorems:\n  - { id: F000F1-THM-01, name: 実対称行列のスペクトル定理 }\ncanonical_examples: [対称行列の固有空間, PSD行列の平方根]\nproblem_patterns: [LA-SPECTRAL-1, LA-PSD-1]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 3, exercises: 1, review: 0.5 }\n`);
write(`${f1Dir}/glossary.yaml`,`chapter: "F0-00F1"\nterms:\n  - { term: 固有空間, english: eigenspace, meaning: 固有値lambdaに対するker(T-lambda I)。 }\n  - { term: 不変部分空間, english: invariant subspace, meaning: 作用させてもその部分空間内に残る部分空間。 }\n  - { term: Rayleigh商, english: Rayleigh quotient, meaning: xTAx/xTxで表される方向別の二次形式の倍率。 }\n  - { term: スペクトル定理, english: spectral theorem, meaning: 実対称行列が正規直交固有基底を持つことを述べる定理。 }\n`);
write(`${f2Dir}/chapter.yaml`,`id: "F0-00F2"\ntitle: "SVD・特異値・作用素ノルム"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00F1\n  - F0-00E2\nofficial_scope: []\nlearning_objectives:\n  - ATAのスペクトル分解から特異値を構成できる\n  - SVDを入力方向・伸縮・出力方向として説明できる\n  - rankと非零特異値の本数の関係を説明できる\n  - 2-作用素ノルムが最大特異値に一致することを説明できる\ndefinitions:\n  - { id: F000F2-DEF-01, name: 特異値 }\n  - { id: F000F2-DEF-02, name: 特異値分解 }\n  - { id: F000F2-DEF-03, name: 作用素ノルム }\ntheorems:\n  - { id: F000F2-THM-01, name: 特異値分解 }\n  - { id: F000F2-THM-02, name: 2-作用素ノルムと最大特異値の一致 }\ncanonical_examples: [長方形行列のSVD, rankと特異値, 作用素ノルム]\nproblem_patterns: [LA-SVD-1]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2.5, exercises: 0.75, review: 0.5 }\n`);
write(`${f2Dir}/glossary.yaml`,`chapter: "F0-00F2"\nterms:\n  - { term: 特異値, english: singular value, meaning: ATAの固有値の非負平方根。 }\n  - { term: 特異値分解, english: singular value decomposition, meaning: 任意の行列をU Sigma VTへ分解する表現。 }\n  - { term: 作用素ノルム, english: operator norm, meaning: 単位ベクトルを作用させたときの最大伸長率。 }\n`);

write(`${gDir}/chapter.yaml`,`id: "F0-00G"\ntitle: "凸集合・凸関数・凸最適化の基礎"\nvolume: "foundations"\nstatus: supplementary\nprerequisites:\n  - F0-00F1\nofficial_scope: []\nlearning_objectives:\n  - 凸結合・凸集合・凸包を定義し具体例を判定できる\n  - 凸関数・狭義凸関数を定義できる\n  - 微分可能凸関数の一次支持不等式を導ける\n  - 凸関数では局所最小が大域最小になることを示せる\n  - 凸制約から作られる実行可能集合が凸になる条件を説明できる\ndefinitions:\n  - { id: F000G-DEF-01, name: 凸結合 }\n  - { id: F000G-DEF-02, name: 凸集合 }\n  - { id: F000G-DEF-03, name: 凸包 }\n  - { id: F000G-DEF-04, name: 凸関数 }\n  - { id: F000G-DEF-05, name: 狭義凸関数 }\n  - { id: F000G-DEF-06, name: 凸最適化問題 }\ntheorems:\n  - { id: F000G-THM-01, name: 微分可能凸関数の一次支持不等式 }\n  - { id: F000G-THM-02, name: 凸関数の局所最小は大域最小 }\ncanonical_examples: [区間と半空間, 二次関数, 線形不等式制約]\nproblem_patterns: [CVX-SET-1, CVX-FUNC-1]\npast_exam_alignment: []\nintegrated_exam_problems: []\nexercise_counts: { level_a: 1, level_b: 1, level_c: 0, level_d: 0 }\nestimated_hours: { reading: 2.5, exercises: 0.75, review: 0.5 }\n`);
let gGloss=read(`${gDir}/glossary.yaml`).replace(/  - term: Slater条件[\s\S]*$/m,'').trim()+'\n';
write(`${gDir}/glossary.yaml`,gGloss);

// Known downstream prerequisite refinements.
for(const [p,from,to] of [
  [`${root}/F0_00H1_常微分方程式_線形系_行列指数/chapter.yaml`,'  - F0-00F\n','  - F0-00F1\n'],
  [`${root}/F0_00NA1_浮動小数点_誤差_条件数_安定性/chapter.yaml`,'  - F0-00F\n','  - F0-00F2\n'],
  [`${root}/F0_00UQ1_random_PDE_Monte_Carlo_FEM/chapter.yaml`,'  - F0-00F\n','  - F0-00F1\n']
]){let t=read(p);if(t.includes(from))write(p,t.replace(from,to));}

// F0-02 explicitly owns Slater / strong duality.
const opt=`${root}/F0_02_制約付き最適化_双対_KKT/index.md`;
let optText=read(opt);
if(!optText.includes('凸集合・凸関数そのものの基礎は')) optText=optText.replace('この補講では、ラグランジュ未定乗数法から一歩進んで、**不等式制約を含む最適化問題をどう扱うか**を整理します。','この補講では、ラグランジュ未定乗数法から一歩進んで、**不等式制約を含む最適化問題をどう扱うか**を整理します。凸集合・凸関数そのものの基礎は [F0-00G](../F0_00G_凸集合_凸関数_凸最適化/index.md) で準備済みとし、ここで双対関数・Slater条件・KKTへ進みます。');
write(opt,optText);

// Facade and machine-readable index.
let dream=read('textbook/dream-theater.md');
dream=insertAfter(dream,'20. [F0-00E ベクトル空間・基底・Gram–Schmidt・直交射影](textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md)','\n21. [F0-00E1 内積・Gram–Schmidt・直交射影・QR](textbook/volumes/00_foundations/F0_00E1_内積_Gram_Schmidt_射影_QR/index.md)');
dream=dream.replace('20. [F0-00E ベクトル空間・基底・Gram–Schmidt・直交射影]','20. [F0-00E ベクトル空間・span・一次独立・基底]');
dream=dream.replace('21. [F0-00E2 Cauchy–Schwarz・Bessel・Parseval]','22. [F0-00E2 Cauchy–Schwarz・Bessel・Parseval]');
dream=dream.replace('22. [F0-00F 線形写像・固有空間・スペクトル定理・SVD]','23. [F0-00F 線形写像・kernel・image・rank-nullity]');
dream=insertAfter(dream,'23. [F0-00F 線形写像・kernel・image・rank-nullity](textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md)','\n24. [F0-00F1 固有空間・スペクトル定理・PSD](textbook/volumes/00_foundations/F0_00F1_固有空間_スペクトル定理_PSD/index.md)\n25. [F0-00F2 SVD・特異値・作用素ノルム](textbook/volumes/00_foundations/F0_00F2_SVD_特異値_作用素ノルム/index.md)');
dream=dream.replace('23. [F0-00G 凸集合・凸関数・凸最適化]','26. [F0-00G 凸集合・凸関数・凸最適化]');
write('textbook/dream-theater.md',dream);

const manifest='textbook/dream-theater-index.json';
let obj=JSON.parse(read(manifest));
const sec=obj.sections.find(s=>s.name==='DREAM THEATER 本編');
const ePath='textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md';
const e1Path='textbook/volumes/00_foundations/F0_00E1_内積_Gram_Schmidt_射影_QR/index.md';
const fPath='textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md';
const f1Path='textbook/volumes/00_foundations/F0_00F1_固有空間_スペクトル定理_PSD/index.md';
const f2Path='textbook/volumes/00_foundations/F0_00F2_SVD_特異値_作用素ノルム/index.md';
for(const [anchor,adds] of [[ePath,[e1Path]],[fPath,[f1Path,f2Path]]]){const i=sec.paths.indexOf(anchor);for(let k=adds.length-1;k>=0;k--)if(!sec.paths.includes(adds[k]))sec.paths.splice(i+1,0,adds[k]);}
write(manifest,JSON.stringify(obj,null,2));

let road=read(`${root}/F0_00R_基礎論ロードマップ/index.md`);
road=road.replace('E → E2 → F → G → F0-02','E → E1 → E2 → F → F1 → F2 → G → F0-02');
road=road.replace('C〜C2は連続性・コンパクト性・存在定理、D〜D1は完備性・ノルム空間・有限/無限次元を一講義ずつ閉じます。','C〜C2は連続性・コンパクト性・存在定理、D〜D1は完備性・ノルム空間・有限/無限次元、E〜E2は基底・直交幾何・内積不等式、F〜F2は線形写像・スペクトル理論・SVDを一講義ずつ閉じます。');
write(`${root}/F0_00R_基礎論ロードマップ/index.md`,road);

let dep=read('textbook/dependency-graph.md');
dep=dep.replace('F0-00E  基底・Gram--Schmidt・射影\n  ↓\nF0-00E2 Cauchy--Schwarz・Bessel・Parseval\n  ↓\nF0-00F  スペクトル定理・SVD\n  ↓\nF0-00G  凸解析の入口','F0-00E  ベクトル空間・基底\n  ↓\nF0-00E1 内積・Gram--Schmidt・射影・QR\n  ↓\nF0-00E2 Cauchy--Schwarz・Bessel・Parseval\n  ↓\nF0-00F  線形写像・kernel・image・rank-nullity\n  ↓\nF0-00F1 固有空間・スペクトル定理・PSD\n  ↓\nF0-00F2 SVD・作用素ノルム\n  ↓\nF0-00G  凸解析の入口');
dep=dep.replace('F0-00F / F0-00D2 / F0-00E2 / F0-02C1','F0-00F1 / F0-00D2 / F0-00E2 / F0-02C1');
dep=dep.replace('F0-00F\n  ↓\nF0-00NA1','F0-00F2\n  ↓\nF0-00NA1');
write('textbook/dependency-graph.md',dep);

let proof=read('textbook/f0-dream-theater-proof-audit.md');
proof=proof.replace('D2E → E → E2 → F → G','D2E → E → E1 → E2 → F → F1 → F2 → G');
write('textbook/f0-dream-theater-proof-audit.md',proof);

let gran=read('textbook/f0-dream-theater-granularity-audit.md');
if(!gran.includes('## 9. E / E2 / F / G の遡及監査')) gran += `\n\n---\n\n## 9. E / E2 / F / G の遡及監査\n\n| 旧講義 | 判定 | 対応 |\n|---|---|---|\n| F0-00E | **SPLIT** | E（ベクトル空間・基底）とE1（内積・Gram--Schmidt・射影・QR）へ分割。 |\n| F0-00E2 | **OK** | Cauchy--Schwarz→Bessel→Parsevalが一つの直交展開サイクル。分割せずA/B演習を追加。 |\n| F0-00F | **SPLIT** | F（線形写像・rank-nullity）、F1（スペクトル定理・PSD）、F2（SVD・作用素ノルム）へ分割。 |\n| F0-00G | **OK after trim** | 凸性の基礎に集中。Slater・強双対性はF0-02へ責務を一本化。 |\n\n再編後の標準線は `E → E1 → E2 → F → F1 → F2 → G → F0-02`。\n`;
write('textbook/f0-dream-theater-granularity-audit.md',gran);

let content=read('textbook/f0-dream-theater-content-exercise-audit.md');
if(!content.includes('E / E2 / F / G の粒度再編')) content += `\n\n## E / E2 / F / G の粒度再編\n\nEとFは独立学習サイクルごとに分割し、E2は一講義のまま維持した。新設・再編講義には最低限のA/B演習を配置した。今後の密度監査では、通常教材基準に照らしてB問題を追加し、各講義の反復量をさらに揃える。GのSlater・強双対性はF0-02へ一本化し、同じ定理説明の二重管理を避ける。\n`;
write('textbook/f0-dream-theater-content-exercise-audit.md',content);

// Report remaining direct prerequisite references for follow-up inspection.
const hits=[];
function walk(d){for(const ent of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,ent.name);if(ent.isDirectory())walk(p);else if(ent.name==='chapter.yaml'){const t=read(p);if(t.includes('  - F0-00E\n')||t.includes('  - F0-00F\n'))hits.push(`${p}: ${t.includes('  - F0-00E\n')?'E ':''}${t.includes('  - F0-00F\n')?'F':''}`);}}}
walk(root);
console.log('REMAINING_DIRECT_SPLIT_PREREQS');
for(const h of hits)console.log(h);
