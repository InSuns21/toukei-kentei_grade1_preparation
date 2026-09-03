import fs from 'node:fs';

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function write(file, text) {
  fs.writeFileSync(file, text);
}

function insertAfterHeading(file, heading, block) {
  const text = read(file);
  if (text.includes(block.trim())) return;
  const needle = `${heading}\n`;
  if (!text.includes(needle)) throw new Error(`${file}: heading not found: ${heading}`);
  write(file, text.replace(needle, () => `${needle}\n${block.trim()}\n`));
}

function replaceOnce(file, from, to) {
  const text = read(file);
  if (text.includes(to)) return;
  const count = text.split(from).length - 1;
  if (count !== 1) throw new Error(`${file}: expected one occurrence, found ${count}: ${from}`);
  write(file, text.replace(from, () => to));
}

const T = 'textbook/volumes';

insertAfterHeading(`${T}/00_foundations/F0_00_統計検定1級のための数学速習/linear_algebra_singular_null_span.md`, '## 4. 階数・退化次数の定理', String.raw`
<a id="thm-f0-00-linear-rank-nullity"></a>

<!-- formal-statement-start -->
> **定理（階数・退化次数の定理）**  
> $A\in\mathbb R^{m\times n}$ を線形写像 $A:\mathbb R^n\to\mathbb R^m$ とみなします。このとき

$$
\boxed{
\operatorname{rank}(A)+\dim\operatorname{Null}(A)=n
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading('statistical-mathematics/advanced/24_characteristic_function_clt.md', '### 使用してよい事実C：Lévyの連続性定理（本問で使う向き）', String.raw`
<a id="thm-statmath-advanced24-levy"></a>

<!-- formal-statement-start -->
> **定理（Lévyの連続性定理：本問で使う向き）**  
> 確率変数列 $W_n$ の特性関数を $\varphi_n$ とします。ある確率変数 $W$ の特性関数 $\varphi$ に対して、すべての $t\in\mathbb R$ で

$$
\varphi_n(t)\to\varphi(t)
$$

> が成り立つなら

$$
\boxed{W_n\xrightarrow{d}W}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading('statistical-mathematics/advanced/64_two_sided_umpu_mean.md', '### この問題で使用してよい定理', String.raw`
<a id="thm-statmath-advanced64-umpu-expfam"></a>

<!-- formal-statement-start -->
> **定理（1母数指数型分布族の両側UMPU検定）**  
> 正則な1母数指数型分布族

$$
f_\eta(x)=h(x)\exp\{\eta T(x)-A(\eta)\}
$$

> を考えます。自然母数空間が開区間で、$T$ が連続分布を持つとします。点帰無仮説 $H_0:\eta=\eta_0$ に対するレベル $\alpha$ の不偏検定の中では、適切な $c_1<c_2$ を選び

$$
T<c_1\quad\text{または}\quad T>c_2
$$

> で棄却する検定が一様最強力不偏検定になります。臨界点はサイズ条件と不偏性条件で定まります。
<!-- formal-statement-end -->`);

const factorizationPanel = (anchor) => String.raw`
<a id="${anchor}"></a>

<!-- formal-statement-start -->
> **定理（Neyman--Fisher因子分解定理：十分性の向き）**  
> 標本 $X$ の同時確率密度関数または同時確率質量関数を $f_\theta(x)$ とします。ある統計量 $T=T(X)$ と関数 $g_\theta,h$ が存在して

$$
f_\theta(x)=g_\theta(T(x))h(x)
$$

> と書け、$h$ が母数 $\theta$ に依存しないなら、$T$ は $\theta$ の十分統計量です。
<!-- formal-statement-end -->`;

insertAfterHeading('statistical-mathematics/core/01_order_statistics_rao_blackwell.md', '### 3. 十分性：Neyman–Fisher 因子分解定理', factorizationPanel('thm-statmath-core01-neyman-fisher'));
insertAfterHeading('statistical-mathematics/core/41_uniform_complete_sufficient_umvu.md', '### 1. 十分性：Neyman–Fisher 因子分解定理', factorizationPanel('thm-statmath-core41-neyman-fisher'));
insertAfterHeading('statistical-mathematics/core/55_exponential_complete_sufficient_umvu.md', '### 1. 十分性：Neyman–Fisher 因子分解定理', factorizationPanel('thm-statmath-core55-neyman-fisher'));

insertAfterHeading('statistical-mathematics/core/02_gamma_beta_jacobian.md', '### 3. 周辺分布・独立性と Beta–Gamma 恒等式', String.raw`
<a id="prop-statmath-core02-beta-gamma"></a>

<!-- formal-statement-start -->
> **命題（Beta--Gamma恒等式）**  
> $a,b>0$ に対して

$$
\boxed{
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

replaceOnce('statistical-mathematics/core/46_moment_estimation_delta.md', '### 2. 一致性：大数の法則と連続写像定理', '### 2. 一致性：大数の法則と連続写像定理を使う');
replaceOnce('statistical-mathematics/core/49_poisson_mle_fisher_ci.md', '### 3. 漸近分布：中心極限定理と Slutsky の定理', '### 3. 漸近分布：中心極限定理と Slutsky の定理を使う');
replaceOnce('statistical-mathematics/core/63_neyman_pearson_ump.md', '#### 1.2 Neyman–Pearson補題', '#### 1.2 Neyman–Pearson補題を使う');

insertAfterHeading('statistical-mathematics/core/63a_neyman_pearson_mp_ump_umpu.md', '# 3. Neyman–Pearson補題', String.raw`
<a id="lem-statmath-core63a-neyman-pearson"></a>

<!-- formal-statement-start -->
> **補題（Neyman--Pearson補題）**  
> 観測 $X$ の確率密度関数または確率質量関数を $f(x;\theta)$ とし、単純仮説 $H_0:\theta=\theta_0$ 対 $H_1:\theta=\theta_1$ を考えます。ある $k\ge0$ と、必要なら $0\le\gamma\le1$ を選び、

$$
\varphi^*(x)=
\begin{cases}
1,&f(x;\theta_1)>k f(x;\theta_0),\\
\gamma,&f(x;\theta_1)=k f(x;\theta_0),\\
0,&f(x;\theta_1)<k f(x;\theta_0)
\end{cases}
$$

> が $E_{\theta_0}[\varphi^*(X)]=\alpha$ を満たすようにします。このとき $\varphi^*$ は、水準 $\alpha$ の検定の中で $H_1:\theta=\theta_1$ に対する最強力検定です。
<!-- formal-statement-end -->`);

replaceOnce('applied-rikou-80/advanced/21_brownian_reflection.md', '### 4. 反射原理', '### 4. 反射原理を導く');

insertAfterHeading('applied-rikou-80/standard/15_poisson_order_stats.md', '### 1. Poisson条件付き順序統計量定理', String.raw`
<a id="thm-rikou-standard15-poisson-order-stats"></a>

<!-- formal-statement-start -->
> **定理（Poisson過程の条件付き順序統計量定理）**  
> 率 $\lambda>0$ のhomogeneous Poisson過程を考え、$T>0$ を固定します。$N(T)=n$ に条件付けると、条件付き到着時刻

$$
0<S_1<\cdots<S_n<T
$$

> の同時密度は

$$
\boxed{
\frac{n!}{T^n},
\qquad 0<s_1<\cdots<s_n<T
}
$$

> となります。したがって $(S_1,\ldots,S_n)$ の条件付き分布は、独立な $U(0,T)$ 標本 $n$ 個の順序統計量の分布と一致します。
<!-- formal-statement-end -->`);

console.log('Second named-formal migration applied.');
