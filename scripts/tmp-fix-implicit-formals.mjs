import fs from 'node:fs';

function replaceExact(path, from, to) {
  let s = fs.readFileSync(path, 'utf8');
  if (!s.includes(from)) throw new Error(`replacement source not found in ${path}: ${from.slice(0,80)}`);
  s = s.replace(from, to);
  fs.writeFileSync(path, s);
}

const d4 = 'textbook/volumes/00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md';
replaceExact(d4,
`実数上の開集合全体から生成される最小のsigma代数を

$$
\\mathcal B(\\mathbb R)
$$

と書き、**Borel sigma代数** といいます。`,
`<a id="def-borel-sigma-algebra"></a>

<!-- formal-statement-start -->
> **定義（Borel sigma代数）**  
> 実数上の開集合全体から生成される最小のsigma代数を **Borel sigma代数** といい、
$$
\\mathcal B(\\mathbb R)
=
\\sigma(\\text{open sets})
$$
> と書く。
<!-- formal-statement-end -->`);
replaceExact(d4,
`生成を記号で

$$
\\mathcal B(\\mathbb R)
=
\\sigma(\\text{open sets})
$$

と書きます。

`, ``);
replaceExact(d4,
`一般の測度空間

$$
(X,\\mathcal F,\\mu)
$$

が完全でないとします。

測度0集合 $N\\in\\mathcal F$ の全ての部分集合を新たに可測集合として加えた最小の拡張を、測度空間の **完備化** といいます。`,
`<a id="def-measure-completion"></a>

<!-- formal-statement-start -->
> **定義（測度空間の完備化）**  
> 測度空間 $(X,\\mathcal F,\\mu)$ に対し、$\\mu(N)=0$ を満たす $N\\in\\mathcal F$ のすべての部分集合を可測集合として加えて得られる最小の完全な拡張測度空間を、$(X,\\mathcal F,\\mu)$ の **完備化** という。
<!-- formal-statement-end -->`);
replaceExact(d4,
`集合族 $\\mathcal A$ が

- 全体集合を含む
- 補集合で閉じる
- 有限和で閉じる

とき **algebra** といいます。`,
`<a id="def-set-algebra"></a>

<!-- formal-statement-start -->
> **定義（集合のalgebra）**  
> 集合 $X$ の部分集合族 $\\mathcal A$ が、$X\\in\\mathcal A$、$A\\in\\mathcal A\\Rightarrow A^c\\in\\mathcal A$、および $A,B\\in\\mathcal A\\Rightarrow A\\cup B\\in\\mathcal A$ を満たすとき、$\\mathcal A$ を $X$ 上の **algebra** という。
<!-- formal-statement-end -->`);
replaceExact(d4,
`algebra $\\mathcal A$ 上の集合関数

$$
\\mu_0:\\mathcal A\\to[0,\\infty]
$$

が **premeasure** であるとは、互いに素な $A_n\\in\\mathcal A$ について、その可算和が再び $\\mathcal A$ に属するとき

$$
\\mu_0\\left(\\bigcup_nA_n\\right)
=
\\sum_n\\mu_0(A_n)
$$

を満たすことです。`,
`<a id="def-premeasure"></a>

<!-- formal-statement-start -->
> **定義（premeasure）**  
> algebra $\\mathcal A$ 上の集合関数 $\\mu_0:\\mathcal A\\to[0,\\infty]$ が **premeasure** であるとは、互いに素な $A_n\\in\\mathcal A$ について $\\bigcup_n A_n\\in\\mathcal A$ なら
$$
\\mu_0\\left(\\bigcup_nA_n\\right)
=
\\sum_n\\mu_0(A_n)
$$
> が成り立つことをいう。
<!-- formal-statement-end -->`);
replaceExact(d4,
`Carathéodory拡張定理は、大まかに次を述べます。

> algebra上のpremeasureは、そのalgebraが生成するsigma代数上の測度へ拡張できる。`,
`<!-- formal-statement-start -->
> **定理（Carathéodory拡張定理）**  
> 集合 $X$ 上のalgebra $\\mathcal A$ と、その上のpremeasure $\\mu_0$ に対して、$\\mu_0$ と $\\mathcal A$ 上で一致する測度 $\\mu$ が生成sigma代数 $\\sigma(\\mathcal A)$ 上に存在する。さらに $\\mu_0$ がsigma有限なら、この拡張は一意である。
<!-- formal-statement-end -->`);
replaceExact(d4,
`さらに適切なsigma有限性の下では、この拡張は一意です。

---

## 15. sigma有限性

測度空間が **sigma有限** であるとは

$$
X=\\bigcup_{n=1}^{\\infty}E_n
$$

かつ

$$
\\mu(E_n)<\\infty
$$

となる可測集合列が存在することです。`,
`---

## 15. sigma有限性

<a id="def-sigma-finite"></a>

<!-- formal-statement-start -->
> **定義（sigma有限）**  
> 測度空間 $(X,\\mathcal F,\\mu)$ が **sigma有限** であるとは、可測集合列 $(E_n)$ が存在して
$$
X=\\bigcup_{n=1}^{\\infty}E_n,
\\qquad
\\mu(E_n)<\\infty\\quad(n\\ge1)
$$
> を満たすことをいう。
<!-- formal-statement-end -->`);

const f1 = 'textbook/volumes/00_foundations/F0_00F1_固有空間_スペクトル定理_PSD/index.md';
replaceExact(f1,
`$T:V\\to V$ に対して、$v\\ne0$ が

$$
T(v)=\\lambda v
$$

を満たすとき、$\\lambda$ を固有値、$v$ を固有ベクトルといいます。

固有値 $\\lambda$ に対応する

$$
\\boxed{
E_\\lambda
=\\ker(T-\\lambda I)
}
$$

を **固有空間** といいます。`,
`<a id="def-eigenvalue-eigenvector-eigenspace"></a>

<!-- formal-statement-start -->
> **定義（固有値・固有ベクトル・固有空間）**  
> 線形自己写像 $T:V\\to V$ に対し、$v\\ne0$ とスカラー $\\lambda$ が
$$
T(v)=\\lambda v
$$
> を満たすとき、$\\lambda$ を $T$ の **固有値**、$v$ を $\\lambda$ に属する **固有ベクトル** という。また
$$
E_\\lambda=\\ker(T-\\lambda I)
$$
> を固有値 $\\lambda$ に対応する **固有空間** という。
<!-- formal-statement-end -->`);
replaceExact(f1,
`部分空間 $M\\subset V$ が

$$
T(M)\\subset M
$$

を満たすとき、$M$ を **不変部分空間** といいます。`,
`<a id="def-invariant-subspace"></a>

<!-- formal-statement-start -->
> **定義（不変部分空間）**  
> 線形自己写像 $T:V\\to V$ と部分空間 $M\\subset V$ に対して
$$
T(M)\\subset M
$$
> が成り立つとき、$M$ を $T$ の **不変部分空間** という。
<!-- formal-statement-end -->`);
replaceExact(f1,
`対称行列 $A$ と非零ベクトル $x$ に対して

$$
\\boxed{
R_A(x)
=
\\frac{x^{\\mathsf T}Ax}{x^{\\mathsf T}x}
}
$$

を **Rayleigh商** といいます。`,
`<a id="def-rayleigh-quotient"></a>

<!-- formal-statement-start -->
> **定義（Rayleigh商）**  
> 実対称行列 $A\\in\\mathbb R^{n\\times n}$ と非零ベクトル $x\\in\\mathbb R^n$ に対して
$$
R_A(x)=\\frac{x^{\\mathsf T}Ax}{x^{\\mathsf T}x}
$$
> を $A$ の $x$ における **Rayleigh商** という。
<!-- formal-statement-end -->`);
replaceExact(f1,
`これが **実対称行列のスペクトル定理** です。

つまり

> 実対称行列には正規直交固有基底が存在する。`,
`<a id="thm-real-symmetric-spectral"></a>

<!-- formal-statement-start -->
> **定理（実対称行列のスペクトル定理）**  
> 実対称行列 $A\\in\\mathbb R^{n\\times n}$ に対して、$\\mathbb R^n$ には $A$ の固有ベクトルからなる正規直交基底が存在する。したがって、ある直交行列 $Q$ と実対角行列 $\\Lambda$ が存在して
$$
A=Q\\Lambda Q^{\\mathsf T}
$$
> と表せる。
<!-- formal-statement-end -->`);

console.log('formalized D4 and F1 implicit definitions/results');
