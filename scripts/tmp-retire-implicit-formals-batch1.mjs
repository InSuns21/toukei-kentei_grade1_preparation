import fs from 'node:fs';

function replaceOnce(file, from, to) {
  let s = fs.readFileSync(file, 'utf8');
  const n = s.split(from).length - 1;
  if (n !== 1) throw new Error(`${file}: expected exactly one match, found ${n}: ${from.slice(0, 80)}`);
  s = s.replace(from, to);
  fs.writeFileSync(file, s);
}

const f = 'textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md';
replaceOnce(f,
`ベクトル空間 $V,W$ の間の写像

$$
T:V\\to W
$$

が、任意の $x,y\\in V$ と $a,b\\in\\mathbb R$ に対して

$$
T(ax+by)=aT(x)+bT(y)
$$

を満たすとき、$T$ を **線形写像** といいます。`,
`<a id="def-f0-00f-linear-map"></a>

<!-- formal-statement-start -->
> **定義（線形写像）**  
> ベクトル空間 $V,W$ の間の写像 $T:V\\to W$ が、任意の $x,y\\in V$ と $a,b\\in\\mathbb R$ に対して

$$
T(ax+by)=aT(x)+bT(y)
$$

> を満たすとき、$T$ を **線形写像** といいます。
<!-- formal-statement-end -->`);

replaceOnce(f,
`線形写像 $T:V\\to W$ に対して

$$
\\ker T
=
\\{x\\in V:T(x)=0\\}
$$

を **核（kernel）**、

$$
\\operatorname{Im}T
=
\\{T(x):x\\in V\\}
$$

を **像（image）** といいます。`,
`<a id="def-f0-00f-kernel-image"></a>

<!-- formal-statement-start -->
> **定義（核と像）**  
> 線形写像 $T:V\\to W$ に対して

$$
\\ker T
=
\\{x\\in V:T(x)=0\\},
\\qquad
\\operatorname{Im}T
=
\\{T(x):x\\in V\\}
$$

> をそれぞれ **核（kernel）**、**像（image）** といいます。
<!-- formal-statement-end -->`);

replaceOnce(f,
`この係数を列に並べた行列

$$
[T]_{\\mathcal C\\leftarrow\\mathcal B}
=
\\begin{pmatrix}
|&&|\\\\
[T(v_1)]_{\\mathcal C}&\\cdots&[T(v_n)]_{\\mathcal C}\\\\
|&&|
\\end{pmatrix}
$$

を、基底 $\\mathcal B,\\mathcal C$ に関する $T$ の **表現行列** といいます。`,
`<a id="def-f0-00f-representation-matrix"></a>

<!-- formal-statement-start -->
> **定義（表現行列）**  
> $V$ の基底 $\\mathcal B=(v_1,\\dots,v_n)$、$W$ の基底 $\\mathcal C=(w_1,\\dots,w_m)$ を選び、各 $T(v_j)$ の $\\mathcal C$ 座標を列に並べた行列

$$
[T]_{\\mathcal C\\leftarrow\\mathcal B}
=
\\begin{pmatrix}
|&&|\\\\
[T(v_1)]_{\\mathcal C}&\\cdots&[T(v_n)]_{\\mathcal C}\\\\
|&&|
\\end{pmatrix}
$$

> を、基底 $\\mathcal B,\\mathcal C$ に関する $T$ の **表現行列** といいます。
<!-- formal-statement-end -->`);

replaceOnce(f,
`$$
\\boxed{
A'=P^{-1}AP
}
$$

です。

この関係を **相似** といいます。`,
`<a id="def-f0-00f-similarity"></a>

<!-- formal-statement-start -->
> **定義（相似）**  
> 正方行列 $A,A'$ に対し、ある正則行列 $P$ が存在して

$$
A'=P^{-1}AP
$$

> と書けるとき、$A$ と $A'$ は **相似** であるといいます。
<!-- formal-statement-end -->`);

replaceOnce(f,
`自己写像

$$
T:V\\to V
$$

に対して $v\\ne0$ が

$$
T(v)=\\lambda v
$$

を満たすとき、$\\lambda$ を **固有値**、$v$ を **固有ベクトル** といいます。

固有値 $\\lambda$ に対応する

$$
E_\\lambda
=
\\ker(T-\\lambda I)
$$

を **固有空間** といいます。`,
`<a id="def-f0-00f-eigen-data"></a>

<!-- formal-statement-start -->
> **定義（固有値・固有ベクトル・固有空間）**  
> 自己写像 $T:V\\to V$ に対して、$v\\ne0$ が

$$
T(v)=\\lambda v
$$

> を満たすとき、$\\lambda$ を **固有値**、$v$ を **固有ベクトル** といいます。また

$$
E_\\lambda=\\ker(T-\\lambda I)
$$

> を固有値 $\\lambda$ に対応する **固有空間** といいます。
<!-- formal-statement-end -->`);

replaceOnce(f,
`自己写像 $T:V\\to V$ が **対角化可能** であるとは、ある基底 $\\mathcal B$ が存在して

$$
[T]_{\\mathcal B\\leftarrow\\mathcal B}
=
\\operatorname{diag}(\\lambda_1,\\dots,\\lambda_n)
$$

となることです。`,
`<a id="def-f0-00f-diagonalizable"></a>

<!-- formal-statement-start -->
> **定義（対角化可能）**  
> 自己写像 $T:V\\to V$ が **対角化可能** であるとは、ある基底 $\\mathcal B$ が存在して

$$
[T]_{\\mathcal B\\leftarrow\\mathcal B}
=
\\operatorname{diag}(\\lambda_1,\\dots,\\lambda_n)
$$

> となることです。
<!-- formal-statement-end -->`);

replaceOnce(f,
`行列 $A$ の特性多項式

$$
\\chi_A(t)=\\det(tI-A)
$$

で、固有値 $\\lambda$ が根として何重に現れるかを **代数的重複度** といいます。

一方

$$
\\dim E_\\lambda
$$

を **幾何学的重複度** といいます。`,
`<a id="def-f0-00f-multiplicities"></a>

<!-- formal-statement-start -->
> **定義（代数的重複度・幾何学的重複度）**  
> 行列 $A$ の特性多項式 $\\chi_A(t)=\\det(tI-A)$ において、固有値 $\\lambda$ が根として現れる重複度を **代数的重複度** といいます。一方、固有空間 $E_\\lambda$ の次元

$$
\\dim E_\\lambda
$$

> を **幾何学的重複度** といいます。
<!-- formal-statement-end -->`);

const e = 'textbook/volumes/05_engineering/E2_01_markov連鎖/index.md';
replaceOnce(e,
`この集まり
$$
\\boxed{\\{X_t:t\\in T\\}}
$$
を確率過程と呼びます。

- $T=\\{0,1,2,\\ldots\\}$ なら **離散時間**。
- $T=[0,\\infty)$ などなら **連続時間**。
- $S$ を **状態空間** と呼びます。`,
`<a id="def-e2-01-stochastic-process"></a>

<!-- formal-statement-start -->
> **定義（確率過程・状態空間）**  
> 時刻集合 $T$ の各 $t$ に対して、共通の状態集合 $S$ に値を取る確率変数 $X_t:\\Omega\\to S$ が与えられているとき、族

$$
\\{X_t:t\\in T\\}
$$

> を **確率過程** といい、$S$ をその **状態空間** といいます。
<!-- formal-statement-end -->

- $T=\\{0,1,2,\\ldots\\}$ なら **離散時間**。
- $T=[0,\\infty)$ などなら **連続時間**。`);

replaceOnce(e,
`1回の具体的な試行結果 $\\omega$ を固定すると、
$$
X_0(\\omega),X_1(\\omega),X_2(\\omega),\\ldots
$$
という1本の状態列が得られます。これを **標本路**（sample path）と呼びます。`,
`<a id="def-e2-01-sample-path"></a>

<!-- formal-statement-start -->
> **定義（標本路）**  
> 確率過程 $\\{X_t\\}$ で1回の試行結果 $\\omega$ を固定して得られる時刻の関数 $t\\mapsto X_t(\\omega)$ を **標本路**（sample path）といいます。離散時間なら

$$
X_0(\\omega),X_1(\\omega),X_2(\\omega),\\ldots
$$

> という1本の状態列です。
<!-- formal-statement-end -->`);

replaceOnce(e,
`時間が離散で、状態空間が有限または可算のマルコフ過程を **マルコフ連鎖** と呼びます。`,
`<a id="def-e2-01-markov-chain"></a>

<!-- formal-statement-start -->
> **定義（マルコフ連鎖）**  
> 時間が離散で、状態空間が有限または可算であり、マルコフ性を満たす確率過程を **マルコフ連鎖** といいます。
<!-- formal-statement-end -->`);

replaceOnce(e,
`これが時刻によらず
$$
\\boxed{
p_{ij}(n)=p_{ij}
}
$$
となるとき、連鎖を **時間一様**（time-homogeneous）と呼びます。`,
`<a id="def-e2-01-time-homogeneous"></a>

<!-- formal-statement-start -->
> **定義（時間一様）**  
> 一段階遷移確率 $p_{ij}(n)=P(X_{n+1}=j\\mid X_n=i)$ が時刻 $n$ に依存せず

$$
p_{ij}(n)=p_{ij}
$$

> と書けるとき、その連鎖を **時間一様**（time-homogeneous）といいます。
<!-- formal-statement-end -->`);

replaceOnce(e,
`行を「現在状態」、列を「次状態」とする行列
$$
\\boxed{P=(p_{ij})}
$$
を **遷移行列** と呼びます。`,
`<a id="def-e2-01-transition-matrix"></a>

<!-- formal-statement-start -->
> **定義（遷移行列）**  
> 時間一様なマルコフ連鎖の一段階遷移確率 $p_{ij}=P(X_{n+1}=j\\mid X_n=i)$ を、行を現在状態、列を次状態として並べた行列

$$
P=(p_{ij})
$$

> を **遷移行列** といいます。
<!-- formal-statement-end -->`);

replaceOnce(e,
`状態 $i$ から $n$ 段階後に状態 $j$ にいる確率を
$$
\\boxed{
p_{ij}^{(n)}
=P(X_n=j\\mid X_0=i)
}
$$
と定義します。`,
`<a id="def-e2-01-n-step-transition"></a>

<!-- formal-statement-start -->
> **定義（$n$ 段階遷移確率）**  
> 状態 $i$ から出発して $n$ 段階後に状態 $j$ にいる条件付き確率

$$
p_{ij}^{(n)}=P(X_n=j\\mid X_0=i)
$$

> を **$n$ 段階遷移確率** といいます。
<!-- formal-statement-end -->`);

replaceOnce(e,
`確率ベクトル $\\boldsymbol\\pi$ が
$$
\\boxed{
\\boldsymbol\\pi=\\boldsymbol\\pi P,
\\qquad
\\sum_i\\pi_i=1,
\\qquad
\\pi_i\\ge0
}
$$
を満たすとき、$\\boldsymbol\\pi$ を **定常分布** と呼びます。`,
`<a id="def-e2-01-stationary-distribution"></a>

<!-- formal-statement-start -->
> **定義（定常分布）**  
> マルコフ連鎖の遷移行列 $P$ に対し、確率ベクトル $\\boldsymbol\\pi$ が

$$
\\boldsymbol\\pi=\\boldsymbol\\pi P,
\\qquad
\\sum_i\\pi_i=1,
\\qquad
\\pi_i\\ge0
$$

> を満たすとき、$\\boldsymbol\\pi$ を **定常分布** といいます。
<!-- formal-statement-end -->`);

replaceOnce(e,
`状態 $i$ から $j$ へ有限回で正の確率で到達できる、すなわちある $n\\ge0$ について
$$
p_{ij}^{(n)}>0
$$
となるとき、$j$ は $i$ から **到達可能** といいます。

$i$ から $j$ へ到達可能で、かつ $j$ から $i$ へも到達可能なら、$i$ と $j$ は **通信する** といいます。

通信する状態をまとめた集合が **通信クラス**です。

全状態が1つの通信クラスなら、そのマルコフ連鎖を **既約** と呼びます。`,
`<a id="def-e2-01-communication-classes"></a>

<!-- formal-statement-start -->
> **定義（到達可能・通信・通信クラス・既約）**  
> 状態 $i$ から $j$ へ有限回で正の確率で到達できる、すなわちある $n\\ge0$ について $p_{ij}^{(n)}>0$ となるとき、$j$ は $i$ から **到達可能** といいます。$i$ から $j$ へ到達可能で、かつ $j$ から $i$ へも到達可能なら、$i$ と $j$ は **通信する** といいます。互いに通信する状態からなる同値類を **通信クラス** といい、全状態が一つの通信クラスになるマルコフ連鎖を **既約** といいます。
<!-- formal-statement-end -->`);

replaceOnce(e,
`状態集合 $C$ について、$C$ の中から出発したら $C$ の外へ出る確率が0であるとき、$C$ を **閉じたクラス** と呼びます。

特に1状態だけの集合 $\\{i\\}$ が閉じている、すなわち
$$
p_{ii}=1
$$
なら、状態 $i$ を **吸収状態** と呼びます。`,
`<a id="def-e2-01-closed-class-absorbing-state"></a>

<!-- formal-statement-start -->
> **定義（閉じたクラス・吸収状態）**  
> 状態集合 $C$ の中から出発したとき $C$ の外へ出る確率が0であるなら、$C$ を **閉じたクラス** といいます。特に一状態集合 $\\{i\\}$ が閉じている、すなわち

$$
p_{ii}=1
$$

> なら、状態 $i$ を **吸収状態** といいます。
<!-- formal-statement-end -->`);

replaceOnce(e,
`状態 $i$ から始めて、時刻0を除いて再び $i$ に戻る最初の時刻を
$$
\\tau_i^+
=\\inf\\{n\\ge1:X_n=i\\}
$$
とします。

$$
P_i(\\tau_i^+<\\infty)=1
$$
なら状態 $i$ を **再帰的**、
$$
P_i(\\tau_i^+<\\infty)<1
$$
なら **過渡的** と呼びます。`,
`<a id="def-e2-01-recurrent-transient"></a>

<!-- formal-statement-start -->
> **定義（再帰状態・過渡状態）**  
> 状態 $i$ から始め、時刻0を除いて再び $i$ に戻る最初の時刻を

$$
\\tau_i^+=\\inf\\{n\\ge1:X_n=i\\}
$$

> とします。$P_i(\\tau_i^+<\\infty)=1$ なら状態 $i$ を **再帰状態**（再帰的）、$P_i(\\tau_i^+<\\infty)<1$ なら **過渡状態**（過渡的）といいます。
<!-- formal-statement-end -->`);

replaceOnce(e,
`状態 $i$ へ戻れるステップ数の集合
$$
\\{n\\ge1:p_{ii}^{(n)}>0\\}
$$
を考え、その最大公約数
$$
\\boxed{
d(i)=\\gcd\\{n\\ge1:p_{ii}^{(n)}>0\\}
}
$$
を状態 $i$ の **周期** と呼びます。

$d(i)=1$ なら **非周期的**です。`,
`<a id="def-e2-01-period"></a>

<!-- formal-statement-start -->
> **定義（周期・非周期的）**  
> 状態 $i$ へ戻れるステップ数の集合 $\\{n\\ge1:p_{ii}^{(n)}>0\\}$ の最大公約数

$$
d(i)=\\gcd\\{n\\ge1:p_{ii}^{(n)}>0\\}
$$

> を状態 $i$ の **周期** といいます。$d(i)=1$ なら状態 $i$ は **非周期的** であるといいます。
<!-- formal-statement-end -->`);

// Retire all current implicit-formal baseline entries for the two fully audited files.
const baseline = 'scripts/implicit-formal-baseline.txt';
let b = fs.readFileSync(baseline, 'utf8').split(/\r?\n/).filter(Boolean);
const prefixes = [
  'textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md\t',
  'textbook/volumes/05_engineering/E2_01_markov連鎖/index.md\t',
];
b = b.filter((line) => !prefixes.some((p) => line.startsWith(p)));
fs.writeFileSync(baseline, `${b.join('\n')}\n`);

console.log(`Batch 1 complete. Baseline now has ${b.length} entries.`);
