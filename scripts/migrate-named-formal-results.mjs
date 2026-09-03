import fs from 'node:fs';

function insertAfterHeading(file, heading, block) {
  const text = fs.readFileSync(file, 'utf8');
  const needle = `${heading}\n`;
  if (!text.includes(needle)) throw new Error(`${file}: heading not found: ${heading}`);
  if (text.includes(block.trim())) return;
  const next = text.replace(needle, `${needle}\n${block.trim()}\n`);
  if (next === text) throw new Error(`${file}: replacement failed: ${heading}`);
  fs.writeFileSync(file, next);
}

function replaceOnce(file, from, to) {
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes(to)) return;
  const count = text.split(from).length - 1;
  if (count !== 1) throw new Error(`${file}: expected one occurrence, found ${count}: ${from}`);
  fs.writeFileSync(file, text.replace(from, to));
}

const T = 'textbook/volumes';

insertAfterHeading(`${T}/00_foundations/F0_00FA1_Fourier級数_直交展開/index.md`, '## 5. Bessel不等式', String.raw`
<a id="thm-f0-00fa1-fourier-bessel"></a>

<!-- formal-statement-start -->
> **定理（Fourier係数に対するBessel不等式）**  
> $f\in L^2(-\pi,\pi)$ とし、複素Fourier係数を

$$
c_n=\frac1{2\pi}\int_{-\pi}^{\pi}f(x)e^{-inx}\,dx
\qquad(n\in\mathbb Z)
$$

> と定めます。このとき

$$
\boxed{
2\pi\sum_{n\in\mathbb Z}|c_n|^2
\le
\int_{-\pi}^{\pi}|f(x)|^2\,dx
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00FA1_Fourier級数_直交展開/index.md`, '## 6. 完全性とParseval等式', String.raw`
<a id="thm-f0-00fa1-parseval"></a>

<!-- formal-statement-start -->
> **定理（Fourier級数のParseval等式）**  
> $f\in L^2(-\pi,\pi)$ とし、複素Fourier係数を $c_n=(2\pi)^{-1}\int_{-\pi}^{\pi}f(x)e^{-inx}\,dx$ とします。三角関数系の $L^2(-\pi,\pi)$ における完全性により

$$
\boxed{
\int_{-\pi}^{\pi}|f(x)|^2\,dx
=
2\pi\sum_{n\in\mathbb Z}|c_n|^2
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00FA2_Fourier変換_畳み込み_反転/index.md`, '## 4. Riemann--Lebesgueの補題', String.raw`
<a id="lem-f0-00fa2-riemann-lebesgue"></a>

<!-- formal-statement-start -->
> **補題（Riemann--Lebesgueの補題）**  
> $f\in L^1(\mathbb R)$ のFourier変換を $\widehat f(\xi)=\int_{\mathbb R}f(x)e^{-i\xi x}\,dx$ とします。このとき

$$
\boxed{
\widehat f(\xi)\to0
\qquad(|\xi|\to\infty)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00FA2_Fourier変換_畳み込み_反転/index.md`, '## 6. 畳み込み定理', String.raw`
<a id="thm-f0-00fa2-convolution"></a>

<!-- formal-statement-start -->
> **定理（畳み込み定理）**  
> $f,g\in L^1(\mathbb R)$ とし、$(f*g)(x)=\int_{\mathbb R}f(x-y)g(y)\,dy$ と定めます。Fourier変換を $\widehat h(\xi)=\int_{\mathbb R}h(x)e^{-i\xi x}\,dx$ とすると、任意の $\xi\in\mathbb R$ に対して

$$
\boxed{
\widehat{f*g}(\xi)
=
\widehat f(\xi)\widehat g(\xi)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00FA3_Plancherel_L2_特性関数/index.md`, '## 2. Plancherel等式', String.raw`
<a id="thm-f0-00fa3-plancherel"></a>

<!-- formal-statement-start -->
> **定理（Plancherel等式）**  
> $L^1(\mathbb R)\cap L^2(\mathbb R)$ 上で $\widehat f(\xi)=\int_{\mathbb R}f(x)e^{-i\xi x}\,dx$ と定義したFourier変換を $L^2(\mathbb R)$ へ連続拡張します。この拡張に対して、任意の $f\in L^2(\mathbb R)$ で

$$
\boxed{
\|f\|_2^2
=
\frac1{2\pi}\|\widehat f\|_2^2
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00G_凸集合_凸関数_凸最適化/index.md`, '## 8. 微分可能な凸関数の一次支持不等式', String.raw`
<a id="prop-f0-00g-first-order-convexity"></a>

<!-- formal-statement-start -->
> **命題（微分可能な凸関数の一次支持不等式）**  
> $C\subset\mathbb R^d$ を凸な開集合、$f:C\to\mathbb R$ を微分可能な凸関数とします。このとき任意の $x,y\in C$ に対して

$$
\boxed{
f(y)\ge f(x)+\nabla f(x)^{\mathsf T}(y-x)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00P2_密度_期待値_Radon_Nikodym/index.md`, '## 2. Radon--Nikodym定理', String.raw`
<a id="thm-f0-00p2-radon-nikodym"></a>

<!-- formal-statement-start -->
> **定理（Radon--Nikodym定理）**  
> $(\Omega,\mathcal F)$ 上の sigma 有限な非負測度 $\mu,\nu$ が $\nu\ll\mu$ を満たすとします。このとき非負可測関数 $f$ が存在し、任意の $A\in\mathcal F$ に対して

$$
\boxed{
\nu(A)=\int_A f\,d\mu
}
$$

> が成り立ちます。この $f$ は $\mu$-a.e. の意味で一意です。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00P4A_一様可積分性_Vitali/index.md`, '## 3. Vitali型の収束定理', String.raw`
<a id="thm-f0-00p4a-vitali"></a>

<!-- formal-statement-start -->
> **定理（Vitali型の収束定理）**  
> 同一の確率空間上の可積分確率変数列 $X_n$ が確率変数 $X$ へ確率収束し、族 $\{X_n:n\ge1\}$ が一様可積分であるとします。このとき $X$ も可積分で

$$
\boxed{
E|X_n-X|\to0
}
$$

> が成り立ちます。特に $E[X_n]\to E[X]$ です。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md`, '## 4. Borel--Cantelli第1補題', String.raw`
<!-- formal-statement-start -->
> **補題（Borel--Cantelli第1補題）**  
> 同一の確率空間上の事象列 $A_1,A_2,\ldots$ が

$$
\sum_{n=1}^{\infty}P(A_n)<\infty
$$

> を満たすなら

$$
\boxed{P(A_n\ \mathrm{i.o.})=0}
$$

> が成り立ちます。独立性は仮定しません。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md`, '## 6. Borel--Cantelli第2補題', String.raw`
<a id="lem-borel-cantelli-2"></a>

<!-- formal-statement-start -->
> **補題（Borel--Cantelli第2補題）**  
> 同一の確率空間上の事象列 $A_1,A_2,\ldots$ が互いに独立で

$$
\sum_{n=1}^{\infty}P(A_n)=\infty
$$

> を満たすなら

$$
\boxed{P(A_n\ \mathrm{i.o.})=1}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN/index.md`, '## 3. Kolmogorov収束定理', String.raw`
<!-- formal-statement-start -->
> **定理（Kolmogorov収束定理）**  
> 独立な確率変数列 $Z_1,Z_2,\ldots$ が $E[Z_n]=0$、$\operatorname{Var}(Z_n)<\infty$ を満たし、

$$
\sum_{n=1}^{\infty}\operatorname{Var}(Z_n)<\infty
$$

> であるとします。このとき級数 $\sum_{n=1}^{\infty}Z_n$ は概収束します。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN/index.md`, '## 4. Kronecker補題', String.raw`
<!-- formal-statement-start -->
> **補題（Kronecker補題）**  
> 実数列 $a_1,a_2,\ldots$ について級数 $\sum_{n=1}^{\infty}a_n/n$ が収束するなら

$$
\boxed{
\frac1n\sum_{k=1}^n a_k\to0
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00P5_大数の強法則/index.md`, '## 3. Kolmogorov最大不等式', String.raw`
<!-- formal-statement-start -->
> **定理（Kolmogorov最大不等式）**  
> $Y_1,\ldots,Y_n$ を独立で $E[Y_j]=0$、$\operatorname{Var}(Y_j)<\infty$ を満たす確率変数とし、$S_k=\sum_{j=1}^kY_j$ とします。このとき任意の $\lambda>0$ に対して

$$
\boxed{
P\left(\max_{1\le k\le n}|S_k|\ge\lambda\right)
\le
\frac{\operatorname{Var}(S_n)}{\lambda^2}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00P6_特性関数_中心極限定理/index.md`, '## 8. Levy連続性定理', String.raw`
<!-- formal-statement-start -->
> **定理（Levy連続性定理）**  
> 確率変数列 $X_n$ の特性関数を $\varphi_n$、確率変数 $X$ の特性関数を $\varphi$ とします。すべての $t\in\mathbb R$ で $\varphi_n(t)\to\varphi(t)$ なら $X_n\xrightarrow{d}X$ です。逆に $X_n\xrightarrow{d}X$ なら、すべての $t\in\mathbb R$ で $\varphi_n(t)\to\varphi(t)$ が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00P7A_MLE_一致性_漸近正規性/index.md`, '### Slutskyの定理', String.raw`
<a id="thm-f0-00p7a-slutsky"></a>

<!-- formal-statement-start -->
> **定理（Slutskyの定理）**  
> 確率変数列 $Y_n,Z_n$ が $Y_n\xrightarrow{d}Y$、$Z_n\xrightarrow{p}c$ を満たし、$c$ が定数であるとします。このとき

$$
Y_n+Z_n\xrightarrow{d}Y+c,
\qquad
Y_nZ_n\xrightarrow{d}cY
$$

> が成り立ちます。また $c\ne0$ なら $Y_n/Z_n\xrightarrow{d}Y/c$ です。
<!-- formal-statement-end -->`);
replaceOnce(`${T}/00_foundations/F0_00P7A_MLE_一致性_漸近正規性/index.md`, '## 2. スコア側には中心極限定理', '## 2. スコア側：中心極限定理を使う');

insertAfterHeading(`${T}/00_foundations/F0_00SOB2_H01_Poincare_trace/index.md`, '## 5. Poincare不等式', String.raw`
<a id="thm-f0-00sob2-poincare"></a>

<!-- formal-statement-start -->
> **定理（Poincare不等式）**  
> $\Omega\subset\mathbb R^d$ を有界なLipschitz領域とします。このとき $\Omega$ のみに依存する定数 $C_P>0$ が存在し、任意の $u\in H_0^1(\Omega)$ に対して

$$
\boxed{
\|u\|_{L^2(\Omega)}
\le C_P\|\nabla u\|_{L^2(\Omega)}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00TS2_Herglotz_spectral_measure_density/index.md`, '## 2. Herglotz定理', String.raw`
<a id="thm-f0-00ts2-herglotz"></a>

<!-- formal-statement-start -->
> **定理（Herglotz定理）**  
> $\gamma:\mathbb Z\to\mathbb C$ が正定値列、すなわち任意の整数 $t_1,\ldots,t_m$ と複素数 $c_1,\ldots,c_m$ に対して

$$
\sum_{j,k=1}^m c_j\overline{c_k}\gamma(t_j-t_k)\ge0
$$

> を満たすとします。このとき $[-\pi,\pi]$ 上の一意な有限非負測度 $F$ が存在して

$$
\boxed{
\gamma(h)=\int_{-\pi}^{\pi}e^{ih\lambda}\,dF(\lambda)
\qquad(h\in\mathbb Z)
}
$$

> と表せます。逆に有限非負測度 $F$ からこの式で定めた列は正定値です。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00WK2_Lax_Milgram_存在一意性/index.md`, '## 2. Lax--Milgram定理', String.raw`
<a id="thm-f0-00wk2-lax-milgram"></a>

<!-- formal-statement-start -->
> **定理（Lax--Milgram定理）**  
> $V$ を実Hilbert空間、$a:V\times V\to\mathbb R$ を双線形形式とします。ある $M,\alpha>0$ が存在して、任意の $u,v\in V$ に対し $|a(u,v)|\le M\|u\|\|v\|$、$a(v,v)\ge\alpha\|v\|^2$ が成り立つとします。任意の $F\in V^*$ に対して一意な $u\in V$ が存在し、

$$
a(u,v)=F(v)
\qquad(\forall v\in V)
$$

> を満たします。さらに

$$
\boxed{
\|u\|\le\frac1\alpha\|F\|_{V^*}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00WK3_楕円型PDE_Galerkin_FEM/index.md`, '## 7. Ceaの補題', String.raw`
<a id="lem-f0-00wk3-cea"></a>

<!-- formal-statement-start -->
> **補題（Ceaの補題）**  
> $V$ を実Hilbert空間、$V_h\subset V$ を有限次元部分空間とし、双線形形式 $a:V\times V\to\mathbb R$ が $|a(u,v)|\le M\|u\|\|v\|$ と $a(v,v)\ge\alpha\|v\|^2$ を満たすとします。$F\in V^*$ に対し、$u\in V$ が $a(u,v)=F(v)$ をすべての $v\in V$ で満たし、$u_h\in V_h$ が $a(u_h,v_h)=F(v_h)$ をすべての $v_h\in V_h$ で満たすとします。このとき

$$
\boxed{
\|u-u_h\|
\le
\frac M\alpha
\inf_{w_h\in V_h}\|u-w_h\|
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_00_統計検定1級のための数学速習/index.md`, '### 6.2 フビニの定理とトネリの定理', String.raw`
<a id="thm-f0-00-fubini"></a>

<!-- formal-statement-start -->
> **定理（Fubiniの定理）**  
> 可測関数 $f:\mathbb R^2\to\mathbb R$ が

$$
\iint_{\mathbb R^2}|f(x,y)|\,dx\,dy<\infty
$$

> を満たすとします。このとき反復積分はほとんど至る所で定義でき、

$$
\boxed{
\iint_{\mathbb R^2}f(x,y)\,dx\,dy
=
\int_{\mathbb R}\left(\int_{\mathbb R}f(x,y)\,dy\right)dx
=
\int_{\mathbb R}\left(\int_{\mathbb R}f(x,y)\,dx\right)dy
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<a id="thm-f0-00-tonelli"></a>

<!-- formal-statement-start -->
> **定理（Tonelliの定理）**  
> 可測関数 $f:\mathbb R^2\to[0,\infty]$ に対して、積分値が $+\infty$ の場合も許せば

$$
\boxed{
\iint_{\mathbb R^2}f(x,y)\,dx\,dy
=
\int_{\mathbb R}\left(\int_{\mathbb R}f(x,y)\,dy\right)dx
=
\int_{\mathbb R}\left(\int_{\mathbb R}f(x,y)\,dx\right)dy
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md`, '## 10. Farkasの補題：必要な形', String.raw`
<a id="lem-f0-02a-farkas-alternative"></a>

<!-- formal-statement-start -->
> **補題（Farkas型のalternative）**  
> $A\in\mathbb R^{p\times n}$、$B\in\mathbb R^{q\times n}$、$v\in\mathbb R^n$ とします。次の二つのうち、ちょうど一方が成立します。  
> (A) $v=A^{\mathsf T}\lambda+B^{\mathsf T}\nu$、$\lambda\ge0$ を満たす $\lambda\in\mathbb R^p,\nu\in\mathbb R^q$ が存在する。  
> (B) $Ad\le0$、$Bd=0$、$v^{\mathsf T}d>0$ を満たす $d\in\mathbb R^n$ が存在する。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md`, '## 9. Farkasの補題', String.raw`
<!-- formal-statement-start -->
> **補題（Farkasの補題）**  
> $A\in\mathbb R^{m\times n}$、$b\in\mathbb R^m$ とします。次の二つのうち、ちょうど一方が成立します。  
> (A) $Ax=b$、$x\ge0$ を満たす $x\in\mathbb R^n$ が存在する。  
> (B) $A^{\mathsf T}y\le0$、$b^{\mathsf T}y>0$ を満たす $y\in\mathbb R^m$ が存在する。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/00_foundations/F0_02C1A_Hilbert射影定理_直交分解/index.md`, '## 1. Hilbert空間の射影定理', String.raw`
<!-- formal-statement-start -->
> **定理（Hilbert空間の射影定理）**  
> $H$ をHilbert空間、$C\subset H$ を空でない閉凸集合、$z\in H$ とします。このとき一意な $p\in C$ が存在して

$$
\boxed{
\|z-p\|=\inf_{x\in C}\|z-x\|
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

replaceOnce(`${T}/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md`, '### 7.1 Cauchy--Schwarz不等式', '### 7.1 内積の基本評価（Cauchy--Schwarzの復習）');
replaceOnce(`${T}/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md`, '$$\n\\boxed{\n|\\langle x,y\\rangle|\n\\le\\|x\\|\\,\\|y\\|\n}\n$$\n\nです。', '$$\n\\boxed{\n|\\langle x,y\\rangle|\n\\le\\|x\\|\\,\\|y\\|\n}\n$$\n\nです。有限次元での証明と等号条件は [F0-00E2 のCauchy--Schwarz不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz) を正本とします。');

insertAfterHeading(`${T}/00_foundations/F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md`, '## 11. Moore--Aronszajnの定理', String.raw`
<a id="thm-f0-02c7-moore-aronszajn"></a>

<!-- formal-statement-start -->
> **定理（Moore--Aronszajnの定理）**  
> 集合 $\mathcal X$ 上の対称なpositive semidefinite kernel $K:\mathcal X\times\mathcal X\to\mathbb R$ を与えます。このとき $K$ を再生核とする再生核Hilbert空間が存在し、関数Hilbert空間として一意に定まります。
<!-- formal-statement-end -->`);

replaceOnce(`${T}/01_probability/P1_01_事象と確率/index.md`, '## 5. 加法公式と包除原理', '## 5. 加法公式と包除の考え方');

insertAfterHeading(`${T}/02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md`, '## 4. 中心極限定理', String.raw`
<a id="thm-p4-02-iid-clt"></a>

<!-- formal-statement-start -->
> **定理（独立同分布の場合の中心極限定理）**  
> $X_1,X_2,\ldots$ を独立同分布とし、$E[X_1]=\mu$、$0<\operatorname{Var}(X_1)=\sigma^2<\infty$ とします。$\overline X_n=n^{-1}\sum_{i=1}^nX_i$ とすると

$$
\boxed{
\frac{\sqrt n(\overline X_n-\mu)}{\sigma}
\xrightarrow{d}N(0,1)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/04_linear_models/L1_02_重回帰_線形モデルの行列表現/index.md`, '## 6. ガウス・マルコフの定理', String.raw`
<a id="thm-l1-02-gauss-markov"></a>

<!-- formal-statement-start -->
> **定理（Gauss--Markovの定理）**  
> 線形モデル $Y=X\beta+\varepsilon$ で、$X\in\mathbb R^{n\times p}$ は列フルランク、$E[\varepsilon]=0$、$\operatorname{Var}(\varepsilon)=\sigma^2I_n$ とします。このとき最小二乗推定量

$$
\widehat\beta=(X^{\mathsf T}X)^{-1}X^{\mathsf T}Y
$$

> は線形不偏推定量の中で最良です。すなわち任意の線形不偏推定量 $\widetilde\beta=AY$ に対して

$$
\boxed{
\operatorname{Var}(\widetilde\beta)-\operatorname{Var}(\widehat\beta)
\succeq0
}
$$

> が成り立ちます。正規性は仮定しません。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/05_engineering/E2_01_markov連鎖/index.md`, '### 5.5 有限状態連鎖の収束定理', String.raw`
<a id="thm-e2-01-finite-markov-convergence"></a>

<!-- formal-statement-start -->
> **定理（有限状態マルコフ連鎖の定常分布と収束）**  
> 有限状態空間上の時間一様マルコフ連鎖の推移行列を $P$ とします。連鎖が既約なら定常分布 $\pi$ は一意に存在します。さらに非周期的なら、任意の初期分布 $\mu$ に対して

$$
\boxed{
\mu P^n\longrightarrow\pi
\qquad(n\to\infty)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

insertAfterHeading(`${T}/05_engineering/E2_04_ブラウン運動_拡散極限/index.md`, '## 8. 反射原理', String.raw`
<a id="principle-e2-04-reflection"></a>

<!-- formal-statement-start -->
> **原理（ブラウン運動の反射原理）**  
> $B(t)$ を標準ブラウン運動、$T>0$、$a>0$ とし、$M_T=\max_{0\le t\le T}B(t)$ とします。このとき

$$
\boxed{
P(M_T\ge a)=2P(B(T)\ge a)
}
$$

> が成り立ちます。
<!-- formal-statement-end -->`);

console.log('Named formal result migration applied.');
