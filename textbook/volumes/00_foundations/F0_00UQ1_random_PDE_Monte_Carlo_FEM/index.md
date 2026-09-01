# F0-00UQ1 Encore V：random PDE・Monte Carlo FEM・不確実性定量化

ここで有限要素法とMonte Carlo法を本当に合流させます。

典型例は、係数そのものが不確実な楕円型PDEです。

---

## 1. random coefficient PDE

領域 $D$ で

$$
\boxed{
-\nabla\cdot\{a(x,\omega)\nabla u(x,\omega)\}
=f(x)
}
$$

を考えます。

$\omega$ は確率空間上の結果で、$a(x,\omega)$ はrandom fieldです。

地下水なら $a$ は透水係数、熱伝導なら熱伝導率などに対応します。

---

## 2. sample-wise weak formulation

各 $\omega$ を固定すると普通の楕円型PDEです。

$$
\boxed{
a_\omega(u,v)
=
\int_D a(x,\omega)\nabla u\cdot\nabla v\,dx
}
$$

として

$$
a_\omega(u(\omega),v)=F(v)
$$

を解きます。

もし

$$
0<a_{\min}\le a(x,\omega)\le a_{\max}<\infty
$$

が一様に成り立てば、Lax--Milgramにより各sampleで弱解が一意に存在します。

Encore IIIの理論がそのまま使われます。

---

## 3. random field

random variableが数を返すのに対し、random fieldは

$$
x\mapsto a(x,\omega)
$$

という空間関数全体がランダムです。

平均

$$
m(x)=E[a(x,\omega)]
$$

と共分散kernel

$$
C(x,y)
=
\operatorname{Cov}(a(x),a(y))
$$

で二次構造を記述できます。

---

## 4. Karhunen--Loeve展開への入口

共分散作用素

$$
(C\phi)(x)
=
\int_D C(x,y)\phi(y)dy
$$

の固有対

$$
C\phi_k=\lambda_k\phi_k
$$

を使うと、適切な条件でrandom fieldを

$$
\boxed{
a(x,\omega)
=m(x)+
\sum_{k=1}^{\infty}
\sqrt{\lambda_k}\,\xi_k(\omega)\phi_k(x)
}
$$

と展開できます。

これは確率版の主成分展開です。

Hilbert空間・スペクトル定理・共分散kernelが、地質のrandom field表現へ戻ってきます。

---

## 5. truncation

実計算では

$$
a_M(x,\omega)
=m(x)+
\sum_{k=1}^{M}
\sqrt{\lambda_k}\,\xi_k(\omega)\phi_k(x)
$$

と有限項で打ち切ります。

ここで新たにKL truncation errorが生まれます。

数値誤差の水脈がさらに増えました。

---

## 6. lognormal coefficient

透水係数など正値であるべき係数では

$$
a(x,\omega)=\exp(G(x,\omega))
$$

とGaussian random field $G$ の指数でモデル化することがあります。

これにより係数の正値性を保てます。

ただし一様ellipticityやtailの扱いはより慎重になります。

---

## 7. Monte Carlo FEM

基本アルゴリズムは単純です。

1. $\omega_i$ をsamplingする。
2. random coefficient $a(\cdot,\omega_i)$ を生成する。
3. 各sampleについてFEM系
   $$
   K(\omega_i)U(\omega_i)=F
   $$
   を解く。
4. quantity of interest $Q_i=Q(u_h(\omega_i))$ を計算する。
5. 平均を
   $$
   \widehat Q_{N,h}
   =\frac1N\sum_{i=1}^NQ_i
   $$
   で推定する。

これがMonte Carlo FEMです。

---

## 8. 誤差分解

真のquantityを $Q(u)$ とすると概念的に

$$
\boxed{
|E[Q(u)]-\widehat Q_{N,h}|
\le
\text{model/truncation}
+
\text{FEM bias}
+
\text{sampling error}
+
\text{solver error}
}
$$

です。

典型的に

$$
\text{FEM bias}=O(h^\alpha),
\qquad
\text{sampling RMSE}=O(N^{-1/2}).
$$

---

## 9. error balancing

一方だけ極端に小さくしても無駄です。

例えばFEM biasを $\varepsilon$、sampling errorを $\varepsilon$ 程度へ合わせるなら

$$
h^\alpha\asymp\varepsilon,
\qquad
N^{-1/2}\asymp\varepsilon.
$$

計算予算はこのbalanceから設計します。

---

## 10. sampleごとのlinear solve

Monte Carlo FEMでは大量のFEM solveが必要です。

そこで

- sparse matrix
- preconditioned CG
- mesh hierarchy
- parallel computing

が非常に重要になります。

Monte Carlo sample間は独立なので並列化しやすい一方、fine mesh solveは高価です。

---

## 11. quantity of interest

全場 $u(x,\omega)$ の期待値だけでなく

- 特定地点の値
- 境界flux
- 領域平均
- failure probability

など $Q(u)$ を推定することが多いです。

目的によって必要なFEM精度やvariance reduction戦略が変わります。

---

## 12. 地下水流の例

Darcy型の地下水流では

$$
-\nabla\cdot(k(x,\omega)\nabla h(x,\omega))=q(x)
$$

のように、透水係数 $k$ をrandom fieldとして扱えます。

地質の不確実性をsamplingし、各地質scenarioでFEMを解き、水頭やfluxの分布を推定します。

したがって「FEMとMonte Carloは地下水脈でつながる」は文字通り成立します。

---

## 13. stochastic Galerkinへの入口

random parameter方向にも基底を入れて一つの巨大なGalerkin系として解くstochastic Galerkin法もあります。

Monte Carlo FEMとは異なりsample-wise独立solveではありません。

Encore VではMonte Carlo系を主役にし、polynomial chaos等は発展とします。

---

## 14. MLMCへの動機

plain Monte Carlo FEMでは、全sampleをfine meshで解くと高価です。

しかし粗いmeshは安く、fineとcoarseの差は小さい。

この構造を利用して

$$
E[Q_L]
=E[Q_0]
+
\sum_{\ell=1}^L
E[Q_\ell-Q_{\ell-1}]
$$

と分解するのが次章のMultilevel Monte Carloです。

---

## 章末チェック

- random coefficient PDEを定義できる。
- sample-wise Lax--Milgramの使い方を説明できる。
- random fieldの平均・共分散を説明できる。
- Karhunen--Loeve展開の構造を説明できる。
- Monte Carlo FEMのアルゴリズムを説明できる。
- FEM biasとsampling errorを分離できる。
- error balancingの考え方を説明できる。
- 地下水流でMonte Carlo FEMが自然な理由を説明できる。
