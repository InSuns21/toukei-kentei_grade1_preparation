# KAH1-09 Kähler曲率テンソル

<!-- definition-example-audit: strict -->

## 1. 接続係数を消しても残るもの

[前章のKähler正規座標の存在定理](../KAH1-08/index.md#thm-kah1-08-normal-existence)によって、任意の点 $p$ で計量行列を単位行列にし、接続係数を零にできた。しかし一点で係数を零にできても、近傍で接続が一定になるとは限らない。接続係数の**一階微分**に、座標によらない幾何学的な情報が残る。その情報をどう取り出すのだろうか。

[一般のRiemann曲率](../../GEO/GEO16/index.md#def-geo16-curvature)と[Chern接続の曲率](../../CM/CM2-11/index.md#def-cm2-11-curvature)は既習である。本章ではその一般理論を再定義せず、Kähler条件の下で成分を最後まで計算し、二階微分・二次項・対称性を証明する。

以下 $X$ は複素次元 $n\ge1$ の複素多様体、$g$ は滑らかなKähler計量、$\nabla$ はLevi–Civita接続の複素線形延長とする。正則座標 $z=(z^1,\ldots,z^n)$ で $\partial_i=\partial/\partial z^i$、$\partial_{\bar j}=\partial/\partial\bar z^j$ と書く。実計量を複素双線形に延長して

$$
g_{i\bar j}=g(\partial_i,\partial_{\bar j}),\qquad
\omega=i\,g_{i\bar j}\,dz^i\wedge d\bar z^j
$$

とする。$g_{i\bar j}$ は正値Hermite行列。反復添字は $1,\ldots,n$ にわたり総和し、逆行列成分の添字を

$$
g^{k\bar\ell}g_{m\bar\ell}=\delta^k_m
$$

で定める（左辺の $\ell$ は総和）。この複素座標表示と実座標表示の添字を混同しない。

ここで行列 $(g_{i\bar j})$ は、正則座標基底 $\partial_i$ と反正則座標基底 $\partial_{\bar j}$ に関する**計量の成分表示**である。実際、$v=c^i\partial_i\in T^{1,0}_xX$ に対して複素双線形性から

$$
g(v,\bar v)
=g(c^i\partial_i,\overline{c^j}\partial_{\bar j})
=g_{i\bar j}c^i\overline{c^j}
$$

となる。[正の基本形式とHermite行列](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)により、計量の正値性をこの二次形式で判定できる。特に対角行列なら各対角成分が正であることを $g(v,\bar v)$ の和から直接確認できる。以下の行列計算は、抽象的な計量条件をこの座標表示へ移したものである。

## 2. 曲率の符号と四階成分

本章では[既習の曲率演算子](../../GEO/GEO16/index.md#def-geo16-curvature)と同じ符号を用いる。

$$
\boxed{R(U,V)W=\nabla_U\nabla_VW-\nabla_V\nabla_UW-\nabla_{[U,V]}W.}
$$

$R(V,U)=-R(U,V)$ である。この規約の下で、$T^{1,0}X$ の方向に作用した曲率を計量により複素数にすると、正則二添字と反正則二添字の並びが得られる。

[Kähler条件による接続の一致](../KAH1-03/index.md#thm-kah1-03-main-equivalence)と[接束のChern接続係数](../KAH1-03/index.md#prop-kah1-03-chern-coefficients)から

$$
\nabla_{\partial_i}\partial_k=\Gamma^m_{ik}\partial_m,\qquad
\nabla_{\partial_{\bar j}}\partial_k=0,\qquad
\Gamma^m_{ik}=g^{m\bar q}\partial_i g_{k\bar q}.
$$

ここで混合方向の基底微分が消えるのは**正則座標基底**での事実であり、任意のベクトル場に対する微分が消えるのではない。

<a id="def-kah1-09-curvature-components"></a>

<!-- formal-statement-start -->
> **定義（Kähler曲率テンソルの成分）**  
> 複素次元 $n\ge1$ の滑らかなKähler多様体 $(X,g)$ に上記符号のLevi–Civita曲率演算子 $R$ を取る。正則座標で、その複素添字成分を次により定める。

$$
R_{i\bar j k\bar\ell}
:=g\bigl(R(\partial_i,\partial_{\bar j})\partial_k,
                \partial_{\bar\ell}\bigr).
$$

> 計量は複素双線形に延長したものであり、四つの添字は順に正則・反正則・正則・反正則である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-09-curvature-components -->
**定義の確認**。 $\mathbb C^n$ の標準正則座標で $g_{i\bar j}=\delta_{ij}$ とする。任意の $v=c^i\partial_i\ne0$ に対し

$$
g(v,\bar v)=\delta_{ij}c^i\overline{c^j}
=\sum_{i=1}^n|c^i|^2>0.
$$

従って[正値Hermite行列の判定](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)を満たす。また $\overline{\delta_{ji}}=\delta_{ij}$ なので実性があり、係数が定数であるため[閉性の局所条件](../KAH1-02/index.md#thm-kah1-02-local-closedness)の両辺はすべて零になる。よって実・正値・閉性の各条件を満たすKähler計量である。

接続係数は $\Gamma^m_{ik}=\delta_{mq}\partial_i\delta_{kq}=0$、反正則方向の正則座標基底への接続作用も零である。さらに $[\partial_i,\partial_{\bar j}]=0$ なので、曲率の定義に三つの基底を代入すると

$$
R(\partial_i,\partial_{\bar j})\partial_k
=\nabla_{\partial_i}0-\nabla_{\partial_{\bar j}}0-\nabla_0\partial_k=0.
$$

最後に $g(0,\partial_{\bar\ell})=0$ より、定義した $R_{i\bar j k\bar\ell}=0$ がすべての添字について確かめられた。行列を見ただけで曲率を推測したのではなく、定義の操作を実行した。
<!-- definition-example-end -->

## 3. 二階微分から曲率を導く

座標ベクトルは $[\partial_i,\partial_{\bar j}]=0$ を満たす。従って、定義へ三つのベクトルを入力すると

$$
\begin{aligned}
R(\partial_i,\partial_{\bar j})\partial_k
&=\nabla_{\partial_i}(0)
  -\nabla_{\partial_{\bar j}}(\Gamma^m_{ik}\partial_m)\\
&=-(\partial_{\bar j}\Gamma^m_{ik})\partial_m
  -\Gamma^m_{ik}\nabla_{\partial_{\bar j}}\partial_m\\
&=-(\partial_{\bar j}\Gamma^m_{ik})\partial_m.
\end{aligned}
$$

したがって $R_{i\bar j k\bar\ell}=-g_{m\bar\ell}\partial_{\bar j}\Gamma^m_{ik}$。ここで接続係数を計量へ戻そう。$g_{m\bar\ell}\Gamma^m_{ik}=\partial_i g_{k\bar\ell}$ を $\partial_{\bar j}$ で微分すると

$$
\begin{aligned}
\partial_{\bar j}\partial_i g_{k\bar\ell}
&=\partial_{\bar j}(g_{m\bar\ell}\Gamma^m_{ik})\\
&=(\partial_{\bar j}g_{m\bar\ell})\Gamma^m_{ik}
 +g_{m\bar\ell}\partial_{\bar j}\Gamma^m_{ik}.
\end{aligned}
$$

負の二階微分だけでなく、計量の一階微分同士の積が現れる理由はこの積の微分則である。

<a id="prop-kah1-09-local-curvature"></a>

<!-- formal-statement-start -->
> **命題（Kähler曲率の局所成分公式）**  
> $g$ を滑らかなKähler計量とし、正則座標で上記の符号規約を採用する。このとき

$$
\boxed{
R_{i\bar j k\bar\ell}
=-\partial_i\partial_{\bar j}g_{k\bar\ell}
 +g^{m\bar q}(\partial_i g_{k\bar q})
                 (\partial_{\bar j}g_{m\bar\ell}).
}
$$

> さらに $R(\partial_i,\partial_j)$ と $R(\partial_{\bar i},\partial_{\bar j})$ は $T^{1,0}X$ 上で零であり、$R(\partial_i,\partial_{\bar j})$ は $T^{1,0}X$ を自身に写す。
<!-- formal-statement-end -->

### 証明の見取り図

混合方向の曲率演算子から始め、計量を掛けて四階成分にする。接続係数を消去するために積の微分則を使う。純正則・純反正則の曲率消失は既習の[Chern曲率の型定理](../../CM/CM2-11/index.md#thm-cm2-11-chern-type)を接束へ適用する。

<!-- proof-start -->
### 証明

上の計算を移項し、$\Gamma^m_{ik}=g^{m\bar q}\partial_i g_{k\bar q}$ を代入する。

$$
\begin{aligned}
R_{i\bar j k\bar\ell}
&=-g_{m\bar\ell}\partial_{\bar j}\Gamma^m_{ik}\\
&=-\partial_{\bar j}\partial_i g_{k\bar\ell}
  +(\partial_{\bar j}g_{m\bar\ell})\Gamma^m_{ik}\\
&=-\partial_i\partial_{\bar j}g_{k\bar\ell}
  +g^{m\bar q}(\partial_i g_{k\bar q})
                 (\partial_{\bar j}g_{m\bar\ell}).
\end{aligned}
$$

二階微分の順序を交換できるのは成分関数が滑らかだからである。

[Kähler接続とChern接続の一致](../KAH1-03/index.md#thm-kah1-03-main-equivalence)により、$\nabla$ の $T^{1,0}X$ 上の作用は正則Hermite束のChern接続に等しい。適用先は正則接束 $E=T^{1,0}X$ である。

[Chern曲率の $(1,1)$ 型定理](../../CM/CM2-11/index.md#thm-cm2-11-chern-type)をこの束へ適用すると、曲率の純正則型と純反正則型の成分が零である。具体的には

$$
R(\partial_i,\partial_j)|_{T^{1,0}X}=0,\qquad
R(\partial_{\bar i},\partial_{\bar j})|_{T^{1,0}X}=0.
$$

混合方向の曲率は先に導出した局所式により、正則接ベクトルを正則接ベクトルへ写す。以上で命題を示した。$\square$
<!-- proof-end -->

**一次元での符号確認。** $n=1$ として $g=g_{z\bar z}>0$ と書くと

$$
\begin{aligned}
R_{z\bar z z\bar z}
&=-\partial_z\partial_{\bar z}g
  +g^{-1}(\partial_zg)(\partial_{\bar z}g)\\
&=-g\,\partial_z\partial_{\bar z}\log g.
\end{aligned}
$$

実際、接続係数の微分に積の微分則を適用すると

$$
\partial_{\bar z}(g^{-1}\partial_z g)
=-g^{-2}(\partial_{\bar z}g)(\partial_z g)
 +g^{-1}\partial_{\bar z}\partial_zg
$$

である。計量 $g=1+|z|^2$ は正値で、複素次元1の実 $(1,1)$ 形式は閉じているためKähler計量を与える。このとき

$$
\Gamma^z_{zz}=\frac{\bar z}{1+|z|^2},\quad
\partial_{\bar z}\Gamma^z_{zz}
=\frac{(1+|z|^2)-|z|^2}{(1+|z|^2)^2}
=\frac1{(1+|z|^2)^2},
$$

$$
R_{z\bar z z\bar z}=-\frac1{1+|z|^2}.
$$

原点では接続係数は $0$ だが曲率成分は $-1$。接続係数そのものと曲率を同一視してはいけない。

## 4. なぜ二組の添字を交換できるのか

[Kähler閉性の局所条件](../KAH1-02/index.md#thm-kah1-02-local-closedness)は

$$
\partial_i g_{k\bar q}=\partial_k g_{i\bar q},\qquad
\partial_{\bar j}g_{m\bar\ell}
=\partial_{\bar\ell}g_{m\bar j}
$$

である。後者は前者を複素共役にし、Hermite対称性 $g_{i\bar j}=\overline{g_{j\bar i}}$ を使って得られる。したがって二階微分項でも二次項でも、正則添字 $i,k$ の交換と反正則添字 $\bar j,\bar\ell$ の交換が可能になる。

<a id="thm-kah1-09-kahler-symmetries"></a>

<!-- formal-statement-start -->
> **定理（Kähler曲率の複素添字対称性）**  
> $(X,g)$ が滑らかなKähler多様体なら、任意の正則座標において

$$
\boxed{
R_{i\bar j k\bar\ell}
=R_{k\bar j i\bar\ell}
=R_{i\bar\ell k\bar j}
=R_{k\bar\ell i\bar j}
}
$$

> が成り立ち、さらに

$$
\boxed{
\overline{R_{i\bar j k\bar\ell}}=R_{j\bar i\ell\bar k}.
}
$$

> この交換則は複素添字についてのものであり、実四階曲率テンソルの添字を無条件に同じように交換する主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

二階項では微分を交換したうえでKähler閉性を代入する。二次項でも閉性を因子ごとに使う。共役関係は計量・逆行列のHermite対称性から個別に計算する。

<!-- proof-start -->
### 証明

正則添字について、滑らかさと局所閉性により

$$
\partial_i\partial_{\bar j}g_{k\bar\ell}
=\partial_{\bar j}\partial_i g_{k\bar\ell}
=\partial_{\bar j}\partial_k g_{i\bar\ell}
=\partial_k\partial_{\bar j}g_{i\bar\ell}.
$$

同じ閉性は二次項の第一因子を $\partial_i g_{k\bar q}=\partial_k g_{i\bar q}$ に変える。従って $R_{i\bar j k\bar\ell}=R_{k\bar j i\bar\ell}$。反正則添字については

$$
\partial_i\partial_{\bar j}g_{k\bar\ell}
=\partial_i\partial_{\bar\ell}g_{k\bar j},\qquad
\partial_{\bar j}g_{m\bar\ell}
=\partial_{\bar\ell}g_{m\bar j}.
$$

従って $R_{i\bar j k\bar\ell}=R_{i\bar\ell k\bar j}$。二つの交換を続ければ四項の等号を得る。

共役の関係では $\overline{g^{m\bar q}}=g^{q\bar m}$ と $\overline{g_{k\bar\ell}}=g_{\ell\bar k}$ を使う。二階項は

$$
\overline{-\partial_i\partial_{\bar j}g_{k\bar\ell}}
=-\partial_{\bar i}\partial_jg_{\ell\bar k}
=-\partial_j\partial_{\bar i}g_{\ell\bar k}.
$$

二次項は、共役の後で総和添字 $m,q$ を付け替えて

$$
\begin{aligned}
&\overline{
g^{m\bar q}(\partial_i g_{k\bar q})
                 (\partial_{\bar j}g_{m\bar\ell})}\\
&\qquad=g^{q\bar m}(\partial_{\bar i}g_{q\bar k})
                          (\partial_jg_{\ell\bar m})\\
&\qquad=g^{m\bar q}(\partial_jg_{\ell\bar q})
                          (\partial_{\bar i}g_{m\bar k}).
\end{aligned}
$$

どちらも $R_{j\bar i\ell\bar k}$ の局所式の対応する項と一致する。$\square$
<!-- proof-end -->

この交換則が成立する理由はKähler閉性である。単に計量がHermiteであるだけでは正則二添字の交換は証明できない。

## 5. Kähler正規座標では二階微分が残る

[点におけるKähler正規座標](../KAH1-08/index.md#def-kah1-08-normal-coordinates)とは、$p$ で $g_{i\bar j}(p)=\delta_{ij}$、すべての一階微分 $\partial_k g_{i\bar j}(p)$ と $\partial_{\bar k}g_{i\bar j}(p)$ が零となる正則座標である。これを局所曲率公式へ代入する。

<a id="prop-kah1-09-normal-curvature"></a>

<!-- formal-statement-start -->
> **命題（Kähler正規座標での曲率）**  
> 滑らかなKähler多様体の点 $p$ にKähler正規座標を取ると、その点で

$$
\boxed{
R_{i\bar j k\bar\ell}(p)
=-\partial_i\partial_{\bar j}g_{k\bar\ell}(p).
}
$$

> さらに $p$ の近傍で実数値の滑らかなKählerポテンシャル $\varphi$ が $g_{k\bar\ell}=\partial_k\partial_{\bar\ell}\varphi$ を与えるとき、

$$
R_{i\bar j k\bar\ell}(p)
=-\partial_i\partial_{\bar j}\partial_k\partial_{\bar\ell}\varphi(p).
$$
<!-- formal-statement-end -->

### 証明の見取り図

零になるのは二次項の各一階微分因子であり、二階微分そのものではない。局所ポテンシャルの公式は既習の結果をKähler正規座標の点に適用する。

<!-- proof-start -->
### 証明

曲率の二次項を点 $p$ で評価すると

$$
g^{m\bar q}(p)\underbrace{\partial_i g_{k\bar q}(p)}_{0}
                 \underbrace{\partial_{\bar j}g_{m\bar\ell}(p)}_{0}=0.
$$

従って最初の式を得る。[局所ポテンシャルの存在](../KAH1-04/index.md#thm-kah1-04-local-existence)から、$p$ を含む十分小さな近傍に $\varphi$ が存在する。そこでは $g_{k\bar\ell}=\partial_k\partial_{\bar\ell}\varphi$。この表示を二階微分項へ代入すると第二の式になる。滑らかな $\varphi$ の四階までの微分は交換できる。任意の座標で二次項が消えるとは主張していない。$\square$
<!-- proof-end -->

**二変数の直接計算。** 実数 $\lambda$ を固定する。[局所ポテンシャルと計量成分の関係](../KAH1-04/index.md#prop-kah1-04-positive-equivalence)を使い、$g_{i\bar j}=\partial_i\partial_{\bar j}\varphi$ で係数行列を作る。例えば $|z^1|^2|z^2|^2=z^1\bar z^1z^2\bar z^2$ だから

$$
\partial_1\partial_{\bar2}(\lambda |z^1|^2|z^2|^2)
=\partial_1(\lambda z^1\bar z^1z^2)=\lambda\bar z^1z^2.
$$

原点付近の $\mathbb C^2$ で、この $\lambda$ を使って

$$
\varphi=|z^1|^2+|z^2|^2+\lambda|z^1|^2|z^2|^2
$$

を取る。ポテンシャルを二度微分すると

$$
(g_{i\bar j})=
\begin{pmatrix}
1+\lambda|z^2|^2&\lambda\bar z^1 z^2\\
\lambda z^1\bar z^2&1+\lambda|z^1|^2
\end{pmatrix}.
$$

原点で $g(0)=I$、全一階微分は零、$z(0)=0$ である。正定値行列の集合は開集合なので、任意の固定した実数 $\lambda$ に対し十分小さい近傍で正値が保たれる。$\omega=i\partial\bar\partial\varphi$ は閉じているので、その近傍でKählerとなる。原点では[命題（Kähler正規座標での曲率）](#prop-kah1-09-normal-curvature)から

$$
\begin{aligned}
R_{1\bar1 2\bar2}(0)
&=-\partial_1\partial_{\bar1}(1+\lambda|z^1|^2)\big|_0=-\lambda,\\
R_{1\bar2 2\bar1}(0)
&=-\partial_1\partial_{\bar2}(\lambda z^1\bar z^2)\big|_0=-\lambda.
\end{aligned}
$$

これらの一致は前節の対称性を独立な成分計算で確かめた結果である。$\lambda\ne0$ なら原点で接続係数は零でも曲率は非零になる。

## 6. 非Kähler計量では何が壊れるか

一般Hermite計量でもChern接続を取ることはできる。しかし[Kähler閉性と捩率消滅の同値性](../KAH1-03/index.md#thm-kah1-03-closed-torsion)を使えないと、二つの正則添字の交換は成り立たない場合がある。

$\mathbb C^2$ 上の正値Hermite計量を

$$
(g_{i\bar j})=\begin{pmatrix}1&0\\0&1+|z^1|^2\end{pmatrix}
$$

とする。$\partial_1g_{2\bar2}=\bar z^1$ に対し $\partial_2g_{1\bar2}=0$ だから、この計量はKählerではない。ここで $D$ を正則接束のChern接続、その曲率を $F_D$ とし、Levi–Civita曲率とは区別して

$$
R^{\mathrm{Ch}}_{i\bar j k\bar\ell}
:=g\bigl(F_D(\partial_i,\partial_{\bar j})\partial_k,
              \partial_{\bar\ell}\bigr)
$$

と書く。[Chern曲率の定義](../../CM/CM2-11/index.md#def-cm2-11-curvature)を座標基底へ適用した四階成分である。この例では原点で

$$
R^{\mathrm{Ch}}_{1\bar1 2\bar2}(0)=-1,\qquad
R^{\mathrm{Ch}}_{2\bar1 1\bar2}(0)=0
$$

となる。これを曲率として判定できるのは、一般Hermite計量でも正則接束の[Chern接続係数公式](../KAH1-03/index.md#prop-kah1-03-chern-coefficients)と[Chern曲率の型・局所公式](../../CM/CM2-11/index.md#thm-cm2-11-chern-type)が使えるためである。$f=1+|z^1|^2$ とおくと

$$
\Gamma^2_{12}=f^{-1}\partial_1g_{2\bar2}
=\frac{\bar z^1}{f},\qquad
\Gamma^m_{21}=g^{m\bar q}\partial_2g_{1\bar q}=0.
$$

$D_{\partial_{\bar1}}\partial_2=0$ と座標基底の可換性から、先の曲率演算子の定義と同じ順序で

$$
\begin{aligned}
R^{\mathrm{Ch}}_{1\bar1 2\bar2}
&=-g_{2\bar2}\partial_{\bar1}\Gamma^2_{12}\\
&=-f\,\frac{f-|z^1|^2}{f^2}
=-\frac1f,\\
R^{\mathrm{Ch}}_{2\bar1 1\bar2}
&=-g_{m\bar2}\partial_{\bar1}\Gamma^m_{21}=0.
\end{aligned}
$$

原点で前者が $-1$、後者が $0$ であることを直接確かめられる。ここで二階微分の簡約に使ったのはChern接続の公式であり、Kähler閉性を仮定したのではない。**計算したのは非Kähler計量のChern曲率であってLevi–Civita曲率ではない。** 一般Hermite計量で両者を同一視しないことが重要である。

## 7. 演習：符号・微分・対称性

### Level A

<a id="ex-kah1-09-a01"></a>
#### KAH1-09-A01 定数だが単位ではない計量
- Level: A

$\mathbb C^2$ で $g_{i\bar j}=\operatorname{diag}(2,3)$ とする。正値性・Kähler閉性・接続係数・曲率成分をすべて確かめよ。

<!-- solution-start -->
**詳細解答。** 行列はHermite対称である。任意の $c=(c^1,c^2)\ne0$ に対し

$$
g(c,\bar c)=2|c^1|^2+3|c^2|^2>0.
$$

従って[正値の行列判定](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)を満たす（対角成分・固有値も $2,3$）。すべての計量係数は一定だから $\partial_i g_{k\bar\ell}=\partial_{\bar j}g_{k\bar\ell}=0$、よって基本形式は閉じ、Kähler計量である。$\Gamma^m_{ik}=g^{m\bar q}\partial_i g_{k\bar q}=0$。曲率公式の二階微分項も一階微分の積もすべて零なので $R_{i\bar j k\bar\ell}=0$。単位行列でないことは平坦性を妨げない。
<!-- solution-end -->

<a id="ex-kah1-09-a02"></a>
#### KAH1-09-A02 接続微分の負号
- Level: A

$\mathbb C$ 上の $g_{z\bar z}=1+2|z|^2$ について $\Gamma^z_{zz}$、$R(\partial_z,\partial_{\bar z})\partial_z$、$R_{z\bar z z\bar z}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $g^{-1}=(1+2|z|^2)^{-1}$、$\partial_zg=2\bar z$ だから

$$
\Gamma=\frac{2\bar z}{1+2|z|^2},\qquad
\partial_{\bar z}\Gamma
=\frac{2(1+2|z|^2)-4|z|^2}{(1+2|z|^2)^2}
=\frac{2}{(1+2|z|^2)^2}.
$$

混合方向の接続係数が零なので

$$
R(\partial_z,\partial_{\bar z})\partial_z
=-\frac{2}{(1+2|z|^2)^2}\partial_z.
$$

最後に $g_{z\bar z}$ を掛けて

$$
R_{z\bar z z\bar z}=-\frac{2}{1+2|z|^2}.
$$

演算子の最初の二引数を逆にすると符号も反転する。
<!-- solution-end -->

<a id="ex-kah1-09-a03"></a>
#### KAH1-09-A03 Kähler正規座標で消えるもの
- Level: A

点 $p$ で $g_{i\bar j}(p)=\delta_{ij}$ と全一階微分零を仮定する。曲率公式のどの項が消えるか、二階微分も零と結論できるか説明せよ。

<!-- solution-start -->
**詳細解答。** 二次項の $\partial_i g_{k\bar q}(p)$ と $\partial_{\bar j}g_{m\bar\ell}(p)$ がそれぞれ零だから積は零。しかし二階微分の値は制約されない。例として $g_{z\bar z}=1+|z|^2$ は原点で単位成分と一階微分零を満たすが、$\partial_z\partial_{\bar z}g(0)=1$、従って $R_{z\bar z z\bar z}(0)=-1$ である。
<!-- solution-end -->

<a id="ex-kah1-09-a04"></a>
#### KAH1-09-A04 複素添字の交換
- Level: A

複素次元 $n\ge4$ で $R_{1\bar2 3\bar4}$ と等しい成分を別に三つ挙げ、その複素共役も一つの成分で書け。

<!-- solution-start -->
**詳細解答。** [Kähler曲率の複素添字対称性](#thm-kah1-09-kahler-symmetries)より、正則二添字の交換で $R_{3\bar2 1\bar4}$、反正則二添字の交換で $R_{1\bar4 3\bar2}$、両方の交換で $R_{3\bar4 1\bar2}$。共役関係は

$$
\overline{R_{1\bar2 3\bar4}}=R_{2\bar1 4\bar3}.
$$

共役では正則と反正則の種類も入れ替わる。
<!-- solution-end -->

### Level B

<a id="ex-kah1-09-b01"></a>
#### KAH1-09-B01 Hermiteだが非Kählerの反例
- Level: B

$g_{i\bar j}=\operatorname{diag}(1,1+|z^1|^2)$ の正値性、非Kähler性を確かめ、原点でChern曲率の $R^{\mathrm{Ch}}_{1\bar1 2\bar2}$ と $R^{\mathrm{Ch}}_{2\bar1 1\bar2}$ を求めよ。

<!-- solution-start -->
**詳細解答。** 対角成分は $1$ と $1+|z^1|^2$ で常に正。Kähler閉性に必要な $\partial_1g_{2\bar2}=\partial_2g_{1\bar2}$ は $\bar z^1=0$ を要求するが、どの開近傍でも成立しないので非Kählerである。一般Chern曲率の局所計算では原点で $g(0)=I$、一階微分零だから二次項が消え、

$$
R^{\mathrm{Ch}}_{1\bar1 2\bar2}(0)
=-\partial_1\partial_{\bar1}(1+|z^1|^2)\big|_0=-1.
$$

$g_{1\bar2}=0$、$\partial_2g_{1\bar q}=0$ なので $R^{\mathrm{Ch}}_{2\bar1 1\bar2}(0)=0$。正則添字交換が失敗するのは閉性がないためであり、この計算はLevi–Civita曲率の式ではない。
<!-- solution-end -->

<a id="ex-kah1-09-b02"></a>
#### KAH1-09-B02 二変数ポテンシャルの交差項
- Level: B

原点付近で $\varphi=|z^1|^2+|z^2|^2+3|z^1|^2|z^2|^2$ とする。Kähler計量を与える近傍があることを示し、$R_{1\bar1 2\bar2}(0)$、$R_{1\bar2 2\bar1}(0)$ を計算せよ。

<!-- solution-start -->
**詳細解答。** 計量成分は

$$
g_{1\bar1}=1+3|z^2|^2,\quad
g_{2\bar2}=1+3|z^1|^2,\quad
g_{1\bar2}=3\bar z^1 z^2,\quad
g_{2\bar1}=3z^1\bar z^2.
$$

$g(0)=I$ であるから連続性により小近傍で正値であり、$\omega=i\partial\bar\partial\varphi$ は閉じる。一階微分も原点で零なのでKähler正規座標であり、

$$
R_{1\bar1 2\bar2}(0)
=-\partial_1\partial_{\bar1}(1+3z^1\bar z^1)\big|_0=-3,
$$

$$
R_{1\bar2 2\bar1}(0)
=-\partial_1\partial_{\bar2}(3z^1\bar z^2)\big|_0=-3.
$$

両者はKähler対称性の要求とも一致する。
<!-- solution-end -->

<a id="ex-kah1-09-b03"></a>
#### KAH1-09-B03 非零の接続係数と零曲率
- Level: B

$a\in\mathbb C$ を定数とし、$\mathbb C$ の $g_{z\bar z}=e^{az+\bar a\bar z}$ の接続係数と曲率を求め、$a\ne0$ の場合を解釈せよ。

<!-- solution-start -->
**詳細解答。** 指数の中は実数なので $g>0$。複素次元1の実 $(1,1)$ 形式は閉じ、Kähler計量となる。$\partial_zg=ag$ より

$$
\Gamma^z_{zz}=g^{-1}\partial_zg=a,\qquad
\partial_{\bar z}\Gamma^z_{zz}=0.
$$

従って $R_{z\bar z z\bar z}=-g\partial_{\bar z}\Gamma=0$。別法として[局所曲率公式](#prop-kah1-09-local-curvature)を一次元に適用すると、

$$
R_{z\bar z z\bar z}
=-g\partial_z\partial_{\bar z}\log g
=-g\partial_z\partial_{\bar z}(az+\bar a\bar z)=0.
$$

$a\ne0$ では接続係数は非零だが曲率は零である。
<!-- solution-end -->

### Level C

<a id="ex-kah1-09-c01"></a>
#### KAH1-09-C01 四次ポテンシャルの曲率を全分類する
- Level: C

原点近くの $\mathbb C^2$ で $a,b,c\in\mathbb R$ に対して

$$
\varphi=|z^1|^2+|z^2|^2
+a|z^1|^4+b|z^1|^2|z^2|^2+c|z^2|^4
$$

とする。次の事項を確かめよ。

1. Kähler計量が定義される近傍を示す。
2. 原点のKähler正規座標条件を確認する。
3. 非零となり得る曲率成分を、添字対称性も含めてすべて列挙する。
4. $a=b=c=0$ の場合と $b\ne0$ の場合を比較する。

<!-- solution-start -->
**詳細解答。** (1) $\varphi$ を混合二階微分すると

$$
\begin{aligned}
g_{1\bar1}&=1+4a|z^1|^2+b|z^2|^2,\\
g_{2\bar2}&=1+b|z^1|^2+4c|z^2|^2,\\
g_{1\bar2}&=b\bar z^1 z^2,\qquad
g_{2\bar1}=bz^1\bar z^2.
\end{aligned}
$$

$g(0)=I$ であるため、$a,b,c$ の符号を問わず正定値性は十分小さな近傍で保たれる。$\omega=i\partial\bar\partial\varphi$ は $\partial^2=\bar\partial^2=0$ と反交換則により閉じている。(2) 成分は定数項と二次項のみなので、一階微分は原点で全部零。$z(0)=0$、$g(0)=I$ と併せてKähler正規座標の全条件が成立する。

(3) [Kähler正規座標での曲率命題](#prop-kah1-09-normal-curvature)より、成分公式は $R_{i\bar j k\bar\ell}(0)=-\partial_i\partial_{\bar j}g_{k\bar\ell}(0)$。直接微分して

$$
R_{1\bar1 1\bar1}(0)=-4a,\qquad
R_{2\bar2 2\bar2}(0)=-4c.
$$

また

$$
\begin{aligned}
R_{1\bar1 2\bar2}(0)
&=R_{2\bar1 1\bar2}(0)\\
&=R_{1\bar2 2\bar1}(0)
=R_{2\bar2 1\bar1}(0)=-b.
\end{aligned}
$$

例えば $\partial_1\partial_{\bar2}g_{2\bar1}=\partial_1\partial_{\bar2}(bz^1\bar z^2)=b$。列挙外の組は、どの計量成分にも該当する混合二階微分項がないので零である。上の値は実数で共役対称性も満たす。

(4) $a=b=c=0$ では $g=I$ で全域の曲率は零。一方 $b\ne0$ では $R_{1\bar1 2\bar2}(0)=-b\ne0$、異なる正則方向を結ぶ混合曲率が残る。どちらも原点の接続係数は零であり、係数の値だけでは区別できない。$\square$
<!-- solution-end -->

## 8. 次の曲率計算へ

Kähler曲率は負の二階微分と正の一階微分の二次項から成る。Kähler閉性が複素二組の添字対称性を保証し、Kähler正規座標では二次項が一点で消える。ただし曲率までは消えない。次章では平坦トーラス、一次元計量、Fubini–Study計量などで曲率を実計算し、後のRicci形式の縮約へつなぐ。