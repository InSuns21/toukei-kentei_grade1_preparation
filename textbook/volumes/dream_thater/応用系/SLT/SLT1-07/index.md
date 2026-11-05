# SLT1-07 VC次元からの一様汎化界

<!-- definition-example-audit: strict -->

## 1. 組合せ的な上界を、確率的な保証へ変える

これまでに、[VC次元と成長関数](../SLT1-05/index.md#def-slt1-05-vc)を導入し、[Sauer–Shelah補題](../SLT1-06/index.md#thm-slt1-06-sauer-shelah)から、VC次元が有限なら有限標本上の予測パターン数が多項式程度になることを学んだ。一方、[有限仮説クラスの一様汎化界](../SLT1-03/index.md#thm-slt1-03-finite-uniform)は仮説数そのものを数えていた。

実数の閾値を少し動かすだけで無限個の仮説ができる。しかし、固定した有限個の入力では予測列はわずかな種類にまとまる。**無限個の仮説のかわりに、標本上で区別できる予測列だけを数えたい。**

障害は、母集団リスクが標本の外側での期待値なので、入力列を固定して単に予測パターンを数えても、期待値との差を直接比較できないことだ。そこで独立なもう一組の標本を用意し、二組の経験平均の差を比べる。

この章では次を一貫して固定する。

- 入力 $X$ は可測空間 $\mathcal X$、正解ラベル $Y$ は $\{0,1\}$ に属する。$Z=(X,Y)$ の同時分布を $P$ とする。ラベルは確率的でよく、正解を完全予測できるとは仮定しない。
- $S=(Z_1,\ldots,Z_n)\sim P^n$ は $n\ge1$ 個の独立同分布標本。$\mathcal H$ は標本抽選前に固定した**非空かつ有限または可算**な二値予測関数のクラスで、各 $h$ は可測とする。
- [0–1損失とリスク](../../ML/ML1-01/index.md#def-ml1-01-risks)を使い、$\ell_h(x,y)=\boldsymbol1_{\{h(x)\ne y\}}$、$R_P(h)=\mathbb E_P\ell_h(Z)$、$\widehat R_S(h)=n^{-1}\sum_i\ell_h(Z_i)$ と書く。ここで $\boldsymbol1_{\{A\}}$ は $A$ が成立するとき1、それ以外では0を返す。
- [一様リスク偏差](../SLT1-04/index.md#def-slt1-04-uniform-deviation)を $D_{P,n}(S)=\sup_{h\in\mathcal H}|R_P(h)-\widehat R_S(h)|$ と書く。可算性により、上限と後述の事象は可測である。

非可算クラスに対する一般化では、上限や仮説選択の可測性を別途確かめなければならない。ここでは可算クラスで証明を完全に閉じる。例えば**有理数**を境界とする閾値全体は可算だが無限であり、有限クラスの結果だけでは扱えない重要な例である。

## 2. 二重標本と損失パターン

標本の外の期待値を扱うため、$S$ と独立で、同じ $P^n$ に従う標本 $S'=(Z'_1,\ldots,Z'_n)$ を用意する。これを **ghost sample（補助標本）** と呼ぶ。$S'$ は学習器へ与えるデータではなく、確率的な証明の道具である。

二組の観測値を合わせた $2n$ 点で、各仮説の損失列を記録する。予測列は入力値だけで決まり、損失列はその予測と正解ラベルの不一致で決まる。

<a id="def-slt1-07-double-sample-trace"></a>

<!-- formal-statement-start -->
> **定義（二重標本と損失トレース）**
> $P$ を $\mathcal X\times\{0,1\}$ 上の分布、$n\ge1$、$S,S'\sim P^n$ を互いに独立な標本とする。$\mathcal H$ を非空の二値予測関数クラスとする。二重標本の経験リスク差の最大値を

$$
D_{2,n}(S,S')=
\sup_{h\in\mathcal H}
\left|\widehat R_{S'}(h)-\widehat R_S(h)\right|
$$

> とする。また任意の固定列 $w_j=(x_j,y_j)$（$1\le j\le m$）について、$m$ 点の**損失トレース**を

$$
\mathcal L_{\mathcal H}(w_1,\ldots,w_m)
=\left\{(\boldsymbol1_{\{h(x_j)\ne y_j\}})_{j=1}^m:h\in\mathcal H\right\}
$$

> と定める。$m=0$ では唯一の空列からなる。$D_{2,n}$ は補助標本と訓練標本を比較する量であり、母集団リスクは含まない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-07-double-sample-trace -->
**定義の確認**。入力列 $(a,b,a)$、正解ラベル列 $(0,1,1)$ を固定する。仮説 $h_0$ が $h_0(a)=1,h_0(b)=0$、仮説 $h_1$ が $h_1(a)=0,h_1(b)=1$ を返すなら、予測列は順に $(1,0,1),(0,1,0)$、損失列は

$$
(1\ne0,\ 0\ne1,\ 1\ne1)=(1,1,0),
$$

$$
(0\ne0,\ 1\ne1,\ 0\ne1)=(0,0,1)
$$

の指示値である。したがって $\mathcal H=\{h_0,h_1\}$ の損失トレースはこの二列からなり、同じ入力 $a$ が二度現れても定義できる。

さらに $n=1$ で $S=((a,0)),S'=((b,1))$ と取れば、$h_0$ の二つの経験損失はともに1、$h_1$ のそれらはともに0なので、$D_{2,1}(S,S')=0$。これは、損失トレースが非定数でも**二組の平均の差が0になり得る**ことを示す。
<!-- definition-example-end -->

なぜ損失トレースを数えるのに、[成長関数](../SLT1-05/index.md#def-slt1-05-growth)を使えるのだろうか。ラベル $y_j$ が固定されているとき、各損失ビットは予測ビットを0と1の間で反転するだけだからである。

<a id="lem-slt1-07-loss-trace"></a>

<!-- formal-statement-start -->
> **補題（損失トレースの個数上界）**
> 非空の二値予測関数クラス $\mathcal H$ と任意の固定列 $w_j=(x_j,y_j)\in\mathcal X\times\{0,1\}$（$1\le j\le m$、重複入力を許す）について、

$$
|\mathcal L_{\mathcal H}(w_1,\ldots,w_m)|
\le\Pi_{\mathcal H}(m).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$j$ 番目の損失は、予測 $h(x_j)$ と固定ラベル $y_j$ の排他的論理和である。ラベル列を固定した排他的論理和は可逆なので、予測列の種類数と損失列の種類数は一致する。

<!-- proof-start -->
### 証明

$(h(x_1),\ldots,h(x_m))$ を $v\in\{0,1\}^m$ と置く。損失列は成分ごとに $v_j\oplus y_j$ であり、ここで $\oplus$ は二値の排他的論理和を表す。各 $y_j$ は固定され、$v_j=(v_j\oplus y_j)\oplus y_j$ と復元できる。よって予測列の集合から損失列の集合への写像は一対一かつ全射である。

したがって損失トレースの大きさは、この入力列上の予測列数に等しい。[成長関数の定義](../SLT1-05/index.md#def-slt1-05-growth)では入力列の重複も許して最大を取るので、その数は $\Pi_{\mathcal H}(m)$ 以下である。$m=0$ でも双方1である。
<!-- proof-end -->

## 3. ghost sampleで未知の期待値を外す

まず本当のリスクと一つの経験平均の差を、独立な二つの経験平均の差へ置き換える。この操作が**確率的対称化**である。固定した仮説への集中を標本依存の選択へ直接適用しないために、最初から一様偏差の事象を扱う。

<a id="lem-slt1-07-prob-symmetrization"></a>

<!-- formal-statement-start -->
> **補題（ghost sampleによる確率的対称化）**
> $\mathcal H$ を標本抽選前に固定した非空の有限または可算な可測二値予測関数クラス、$S,S'$ を互いに独立な $P^n$ 標本とし、損失を0–1損失とする。$\varepsilon>0$ かつ $n\varepsilon^2\ge2$ なら、

$$
\Pr\{D_{P,n}(S)>\varepsilon\}
\le2\Pr\{D_{2,n}(S,S')>\varepsilon/2\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

ある訓練標本で真のリスクとのずれが $\varepsilon$ を超えたとする。そのずれを起こす仮説を一つ選ぶ。独立な補助標本の平均は、その**選んだ仮説を固定した条件の下で**真のリスクへ確率少なくとも $1/2$ で近づく。すると二組の経験平均が $\varepsilon/2$ より離れる。

<!-- proof-start -->
### 証明

可算クラスを $h_1,h_2,\ldots$ と列挙する。$D_{P,n}(S)>\varepsilon$ の場合、

$$
|R_P(h_k)-\widehat R_S(h_k)|>\varepsilon
$$

となる最初の添字 $k$ を選べる。この選択は $S$ のみから定まり可測である。以後、その $S$ を固定し $h=h_k$ と書く。$S'$ は $S$ から独立なので、補助標本上の $\ell_h(Z'_i)$ は**条件付きでも**独立な0–1確率変数で、各平均は $R_P(h)$、分散は高々 $1/4$ である。よって

$$
\operatorname{Var}(\widehat R_{S'}(h)\mid S)
=\frac{\operatorname{Var}(\ell_h(Z))}{n}
\le\frac1{4n}.
$$

[Chebyshev不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)を偏差幅 $\varepsilon/2$ に適用すると

$$
\Pr\left(\left.|\widehat R_{S'}(h)-R_P(h)|>
\frac\varepsilon2\ \right|S\right)
\le\frac{1/(4n)}{(\varepsilon/2)^2}
=\frac1{n\varepsilon^2}\le\frac12.
$$

従って、条件付き確率少なくとも $1/2$ で

$$
\begin{aligned}
|\widehat R_{S'}(h)-\widehat R_S(h)|
&\ge |R_P(h)-\widehat R_S(h)|
-|\widehat R_{S'}(h)-R_P(h)|\\
&>\varepsilon-\frac\varepsilon2
=\frac\varepsilon2.
\end{aligned}
$$

これを満たすと $D_{2,n}(S,S')>\varepsilon/2$ である。したがって $E=\{D_{P,n}(S)>\varepsilon\}$ とおけば

$$
\begin{aligned}
\Pr(D_{2,n}>\varepsilon/2)
&=\mathbb E_S[\Pr(D_{2,n}>\varepsilon/2\mid S)]\\
&\ge\frac12\Pr(E).
\end{aligned}
$$

両辺を2倍して求める不等式を得る。$n\varepsilon^2\ge2$ は、補助標本が確率少なくとも $1/2$ で十分近づくための、この証明での条件である。
<!-- proof-end -->

例えば $n=800,\varepsilon=0.1$ なら $n\varepsilon^2=8$ で、補助標本の平均が幅 $0.05$ から外れる条件付き確率は高々 $1/8$。実際には $1/2$ より強い成功確率 $7/8$ が得られる。

## 4. 対交換を使って有限パターンだけを数える

次の工夫は、二組の標本を添字ごとに対にして、各対の左右を独立にランダム交換することだ。$P^n\times P^n$ の下で $(Z_i,Z'_i)$ は交換可能なので、交換後も二組の標本の**同時分布は変わらない**。

固定された二重標本で $a_i(h)=\ell_h(Z'_i)-\ell_h(Z_i)\in\{-1,0,1\}$ とする。独立な符号 $\sigma_i\in\{-1,1\}$ をそれぞれ確率 $1/2$ で選び、左と右を交換すると経験平均差は

$$
\frac1n\sum_{i=1}^n\sigma_i a_i(h)
$$

と同じ分布になる。各 $a_i(h)$ は固定され、符号だけがランダムである。これなら[Hoeffding不等式](../../../解析系/HDP/HDP1/index.md#thm-hdp1-hoeffding)を直接使える。

**三対の手計算**。$a(h)=(1,0,-1)$ としてみると、交換後の平均差は $(\sigma_1-\sigma_3)/3$。$\sigma_1,\sigma_3$ の四組のうち二組で0、残る二組で $\pm2/3$ だから、絶対値が $1/3$ を超える確率は $1/2$ である。中央値のような対の並べ方は関係なく、符号の独立性が重要になる。

<a id="lem-slt1-07-pair-swap"></a>

<!-- formal-statement-start -->
> **補題（対交換による二重標本偏差の上界）**
> $\mathcal H$ を非空の有限または可算な可測二値予測関数クラスとし、$S,S'$ を互いに独立な $P^n$ 標本、損失を0–1損失とする。任意の $t>0$ に対して

$$
\Pr\{D_{2,n}(S,S')>t\}
\le2\Pi_{\mathcal H}(2n)\exp(-nt^2/2).
$$
<!-- formal-statement-end -->

### 証明の見取り図

固定した二重標本では、各仮説の $2n$ 個の損失値だけが平均差を決める。[損失トレースの個数上界](#lem-slt1-07-loss-trace)から、その種類は $\Pi_{\mathcal H}(2n)$ 以下。各種類へ、独立なランダム交換の [Hoeffding不等式](../../../解析系/HDP/HDP1/index.md#thm-hdp1-hoeffding)を使って union bound を取る。

<!-- proof-start -->
### 証明

$W=(Z_1,Z'_1,\ldots,Z_n,Z'_n)$ を一旦固定する。独立な対称符号 $\sigma_1,\ldots,\sigma_n$ で各対を交換する。交換前の左右の差を $a_i(h)$ とすれば、交換後の差は $\sigma_i a_i(h)$（符号の呼び方を逆にしても分布は同じ）となる。

固定した $h$ と $W$ に対して $U_i=\sigma_i a_i(h)$ は独立で、$\mathbb E_\sigma U_i=0$、$-1\le U_i\le1$。[Hoeffdingの両側版](../../../解析系/HDP/HDP1/index.md#cor-hdp1-two-sided)へ $\sum_i(b_i-a_i)^2\le4n$ と偏差 $nt$ を代入すると

$$
\begin{aligned}
\Pr_\sigma\left\{\left|\frac1n\sum_i U_i\right|>t\,\middle|\,W\right\}
&\le2\exp\left(-\frac{2(nt)^2}{4n}\right)\\
&=2e^{-nt^2/2}.
\end{aligned}
$$

ここで仮説ごとに union bound を取る前に、$W$ に現れる $2n$ 個の損失値が同じ仮説を同一視する。二つの仮説が同じ損失列なら、全符号 $\sigma$ に対し $a_i(h)$ も同じであるから、上の事象も同一である。[損失トレースの個数上界](#lem-slt1-07-loss-trace)により、異なる事象の数は高々 $\Pi_{\mathcal H}(2n)$。したがって

$$
\Pr_\sigma\left\{\sup_h\left|\frac1n\sum_i\sigma_i a_i(h)\right|>t\,\middle|\,W\right\}
\le2\Pi_{\mathcal H}(2n)e^{-nt^2/2}.
$$

最後に $W$ について期待値を取る。$Z_i,Z'_i$ は同じ分布から独立に抽出されているので、各対を任意に交換しても $(S,S')$ の同時分布は不変である。従って左辺の無条件確率は元の $D_{2,n}>t$ の確率と等しく、結論を得る。
<!-- proof-end -->

**ここで $\Pi_{\mathcal H}(n)$ ではなく $\Pi_{\mathcal H}(2n)$ を使う理由**は、訓練側だけでなく ghost sample 側にも予測値が必要だからである。また、損失を二乗損失などへ替えると、予測パターンは二値でなくなり、この数え上げと有界差の評価をそのまま使うことはできない。

## 5. VC次元による高確率の一様汎化界

二つの補題をつなぐと、有限クラスの $|\mathcal H|$ を成長関数に置き換えられる。これが求めた確率的な橋である。

<a id="thm-slt1-07-vc-uniform"></a>

<!-- formal-statement-start -->
> **定理（VC成長関数による一様汎化界）**
> $n\ge1$、$P$ を $\mathcal X\times\{0,1\}$ 上の任意の分布、$S\sim P^n$ とする。$\mathcal H$ を標本抽選前に固定した非空の有限または可算な可測二値予測関数クラスとし、0–1損失を用いる。このとき全ての $\varepsilon>0$ に対し

$$
\Pr\left\{\sup_{h\in\mathcal H}
|R_P(h)-\widehat R_S(h)|>\varepsilon\right\}
\le\min\left\{1,\;4\Pi_{\mathcal H}(2n)
e^{-n\varepsilon^2/8}\right\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$n\varepsilon^2\ge2$ なら、[確率的対称化](#lem-slt1-07-prob-symmetrization)の係数2と、[対交換の上界](#lem-slt1-07-pair-swap)へ $t=\varepsilon/2$ を代入した係数2を掛ける。$n\varepsilon^2<2$ では確率の自明な上界1が使えるため、同じ式を全 $\varepsilon$ に拡張できる。

<!-- proof-start -->
### 証明

$n\varepsilon^2\ge2$ の場合、二補題の全ての仮定は定理の仮定から満たされる。従って

$$
\begin{aligned}
\Pr(D_{P,n}>\varepsilon)
&\le2\Pr(D_{2,n}>\varepsilon/2)\\
&\le2\cdot2\Pi_{\mathcal H}(2n)
\exp\left(-\frac n2\left(\frac\varepsilon2\right)^2\right)\\
&=4\Pi_{\mathcal H}(2n)e^{-n\varepsilon^2/8}.
\end{aligned}
$$

$n\varepsilon^2<2$ の場合は $\Pi_{\mathcal H}(2n)\ge1$ より

$$
4\Pi_{\mathcal H}(2n)e^{-n\varepsilon^2/8}
>4e^{-1/4}>1.
$$

このとき右辺の $\min$ は1なので、確率が1以下であることから成立する。前の場合も確率は1以下だから $\min$ を取ってよい。よって全ての $\varepsilon>0$ で結論を得る。
<!-- proof-end -->

次に[VC次元](../SLT1-05/index.md#def-slt1-05-vc)を $d$ として、成長関数を具体的な二項和に置き換える。

<a id="cor-slt1-07-vc-high-prob"></a>

<!-- formal-statement-start -->
> **系（有限VC次元の高確率界）**
> $n\ge1$、$P$ を $\mathcal X\times\{0,1\}$ 上の分布、$S\sim P^n$ を独立同分布標本とする。$\mathcal H$ を標本抽選前に固定した非空の有限または可算な可測二値予測関数クラスとし、0–1損失を用いる。$\operatorname{VCdim}(\mathcal H)=d<\infty$（整数 $d\ge0$）とする。$\delta\in(0,1)$ に対し

$$
B_{n,d,\delta}
=\sqrt{\frac8n\log\left(
\frac4\delta\sum_{j=0}^{\min(d,2n)}\binom{2n}{j}
\right)}
$$

> と置くと、少なくとも確率 $1-\delta$ で全ての $h\in\mathcal H$ について同時に

$$
|R_P(h)-\widehat R_S(h)|\le B_{n,d,\delta}
$$

> が成立する。さらに $1\le d\le2n$ では

$$
B_{n,d,\delta}
\le\sqrt{\frac8n\left[
d\log\frac{2en}{d}+\log\frac4\delta
\right]}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[Sauer–Shelahの成長関数上界](../SLT1-06/index.md#cor-slt1-06-growth)を $m=2n$ に適用する。[二項和の多項式界](../SLT1-06/index.md#cor-slt1-06-polynomial)も、$1\le d\le2n$ でのみ使う。最後に偏差幅を $B_{n,d,\delta}$ と選んで、確率上界を $\delta$ へ合わせる。

<!-- proof-start -->
### 証明

$S(2n,d)=\sum_{j=0}^{\min(d,2n)}\binom{2n}{j}$ と置く。非空クラスのVC次元は非負整数なので、[Sauer–Shelahの系](../SLT1-06/index.md#cor-slt1-06-growth)から $\Pi_{\mathcal H}(2n)\le S(2n,d)$ である。前定理へ代入すると

$$
\Pr(D_{P,n}>\varepsilon)
\le4S(2n,d)e^{-n\varepsilon^2/8}.
$$

$B_{n,d,\delta}>0$ であり、$\varepsilon=B_{n,d,\delta}$ と選べば

$$
4S(2n,d)e^{-nB_{n,d,\delta}^2/8}
=4S(2n,d)\frac\delta{4S(2n,d)}
=\delta.
$$

したがって $\Pr(D_{P,n}\le B_{n,d,\delta})\ge1-\delta$。さらに $1\le d\le2n$ では[二項和の多項式界](../SLT1-06/index.md#cor-slt1-06-polynomial)

$$
S(2n,d)\le\left(\frac{2en}{d}\right)^d
$$

を対数へ代入し、平方根が増加関数であることから第二の不等式を得る。
<!-- proof-end -->

$d=0$ では二項和は1となり、$d>2n$ では二項和は $2^{2n}$ となる。**多項式界を $d=0$ や $d>2n$ へ無断で当てはめない。** また保証が意味を持つには $B_{n,d,\delta}<1$ 程度の標本数が必要で、係数8を持つこの初等的な証明は定数の鋭さを主張していない。固定した $d$ なら上界は概ね $\sqrt{(d\log n+\log(1/\delta))/n}$ のオーダーで0へ向かう。

**閾値の数値例**。$\mathcal X=\mathbb R$ で $h_t(x)=\boldsymbol1_{\{x\ge t\}}$、$t\in\mathbb Q$ とする。これは可算で、[閾値クラスの成長関数](../SLT1-05/index.md#thm-slt1-05-threshold)から $\operatorname{VCdim}=1$、$\Pi_{\mathcal H}(m)=m+1$（$m\ge1$）。$n=1000,\delta=0.05$ なら

$$
\sqrt{\frac8{1000}\log\frac{4(2001)}{0.05}}
\approx0.310.
$$

従って確率95%以上で一様偏差は約0.310以下になる。これはあくまで**上界**であり実際の誤差が0.310になるという予測ではない。正解ラベル $Y$ がノイズを含んでいても、独立同分布と0–1損失の条件を守れば結論は変わらない。

## 6. ERMへの帰結と、仮定が壊れる例

目的は真のリスクを、標本を見て選んだ予測器について保証することだった。これには[近似ERMの決定論的過剰リスク界](../SLT1-04/index.md#thm-slt1-04-approximate-erm-oracle)を組み合わせればよい。

<a id="cor-slt1-07-agnostic-erm"></a>

<!-- formal-statement-start -->
> **系（近似ERMのagnostic超過リスク界）**
> $n\ge1$、$P$ を $\mathcal X\times\{0,1\}$ 上の分布、$S\sim P^n$ を独立同分布標本とする。$\mathcal H$ を標本抽選前に固定した非空の有限または可算な可測二値予測関数クラスとし、0–1損失を用いる。$\operatorname{VCdim}(\mathcal H)=d<\infty$（整数 $d\ge0$）、$\delta\in(0,1)$ として

$$
B_{n,d,\delta}=\sqrt{\frac8n\log\left(
\frac4\delta\sum_{j=0}^{\min(d,2n)}\binom{2n}{j}
\right)}
$$

> とする。各標本に対し $\widehat h(S)\in\mathcal H$ が $\eta$-近似ERM（$\eta\ge0$）を達成し、その選択が可測なら、少なくとも確率 $1-\delta$ で

$$
R_P(\widehat h)-\inf_{h\in\mathcal H}R_P(h)
\le2B_{n,d,\delta}+\eta.
$$

> 分布が realizable である必要はない。$\eta=0$ のときはERMが実際に存在することを仮定する。
<!-- formal-statement-end -->

### 証明の見取り図

同時事象 $D_{P,n}\le B$ の上では、標本から選ばれた $\widehat h$ にも、比較に使う全ての $h$ にも偏差幅 $B$ が適用できる。二つの偏差と最適化誤差 $\eta$ を足せばよい。

<!-- proof-start -->
### 証明

前節の高確率事象 $E=\{D_{P,n}(S)\le B_{n,d,\delta}\}$ は $\Pr(E)\ge1-\delta$ である。$E$ 上で任意の $h\in\mathcal H$ について

$$
\begin{aligned}
R_P(\widehat h)
&\le\widehat R_S(\widehat h)+B_{n,d,\delta}\\
&\le\widehat R_S(h)+\eta+B_{n,d,\delta}\\
&\le R_P(h)+2B_{n,d,\delta}+\eta.
\end{aligned}
$$

最初と最後は一様偏差、中央は近似ERM条件を使った。$h$ は任意なので右辺の $R_P(h)$ について下限を取れば結論を得る。最良仮説が達成されなくても、この操作は有効である。
<!-- proof-end -->

この保証は **$\mathcal H$ 内の最良候補に比べた過剰リスク**である。Bayes最適リスクとの差には[近似誤差](../SLT1-01/index.md#def-slt1-01-approximation)を別途足す必要がある。

**独立性を失った反例**。$\mathcal X=\{0,1\}$、$Y=0$、$X\sim\operatorname{Bernoulli}(1/2)$、$\mathcal H=\{h\}$、$h(x)=x$ とする。仮説クラスは一つだけでVC次元0、母集団リスクは $R_P(h)=1/2$ である。ところが独立標本の代わりに一つの $U\sim\operatorname{Bernoulli}(1/2)$ を $n$ 回複製して $X_1=\cdots=X_n=U$ とすると

$$
\widehat R_S(h)=U,
\qquad
|R_P(h)-\widehat R_S(h)|=\frac12
$$

が**確率1**で成立する。各観測の周辺分布は同じ $P$ なのに、一様偏差は $n$ を増やしても小さくならない。壊れた仮定は標本間の独立性で、補助標本平均の分散を $1/(4n)$ に下げる計算と独立な対交換の証明が使えなくなる。

ほかにも、標本を見てから自由に $\mathcal H$ を作ると固定トレース数の評価が学習過程の選択と独立でなくなり、0–1損失から非有界の二乗損失へ切り替えると Hoeffding の有界区間条件を失う。いずれもこの定理をそのまま適用してはならない。

## 演習

### Level A：定義と係数を一段ずつ確かめる

**問題 SLT1-07-A01（損失列への変換）**
- Level: A

$\mathcal X=\{a,b\}$、$\mathcal H=\{h_0,h_1\}$、$h_0(a)=1,h_0(b)=0,h_1(a)=0,h_1(b)=1$ とする。三観測の入力列 $(a,b,a)$、正解列 $(0,1,1)$ について、予測トレースと損失トレースを列挙し、両者の大きさが一致することを確かめよ。

<!-- solution-start -->
**詳細解答**。$h_0$ の予測列は $(1,0,1)$、$h_1$ は $(0,1,0)$ で二通り。0–1損失は各成分の予測と正解の不一致なので、

$$
\begin{aligned}
h_0:&\quad(\boldsymbol1_{\{1\ne0\}},\boldsymbol1_{\{0\ne1\}},\boldsymbol1_{\{1\ne1\}})=(1,1,0),\\
h_1:&\quad(\boldsymbol1_{\{0\ne0\}},\boldsymbol1_{\{1\ne1\}},\boldsymbol1_{\{0\ne1\}})=(0,0,1).
\end{aligned}
$$

損失列も二通りである。正解列 $(0,1,1)$ との排他的論理和をもう一度取ると元の予測列に戻り、[損失トレースの補題](#lem-slt1-07-loss-trace)の一対一性を直接確かめた。
<!-- solution-end -->

**問題 SLT1-07-A02（補助標本の成功確率）**
- Level: A

固定した仮説の0–1損失を $n=800$ 回独立観測する。Chebyshev不等式で経験平均が母集団リスクから $0.05$ より大きく離れる確率を上から抑えよ。また $\varepsilon=0.1$ で確率的対称化の条件を確認せよ。

<!-- solution-start -->
**詳細解答**。Bernoulli型損失の分散は $p(1-p)\le1/4$、独立な平均の分散は $1/(4n)$ 以下。よって

$$
\Pr(|\widehat R-R_P|>0.05)
\le\frac{1/(4\cdot800)}{0.05^2}
=\frac1{8}.
$$

少なくとも確率 $7/8$ で幅0.05以内になる。さらに $n\varepsilon^2=800(0.1)^2=8\ge2$ なので、[確率的対称化の補題](#lem-slt1-07-prob-symmetrization)の条件を満たす。ここで確率 $7/8$ は $h$ を固定した補助標本の話であり、全仮説の同時偏差の成功確率ではない。
<!-- solution-end -->

**問題 SLT1-07-A03（三対の交換）**
- Level: A

固定された三対について損失差 $a=(1,0,-1)$ を考える。独立な対称符号 $\sigma_i$ を掛けた平均 $T=(\sigma_1a_1+\sigma_2a_2+\sigma_3a_3)/3$ の分布と $\Pr(|T|>1/3)$ を求めよ。

<!-- solution-start -->
**詳細解答**。$a_2=0$ なので $T=(\sigma_1-\sigma_3)/3$。$\sigma_1,\sigma_3$ の四組は各確率 $1/4$ で、$(1,1),(-1,-1)$ なら0、$(1,-1)$ なら $2/3$、$(-1,1)$ なら $-2/3$。従って

$$
\Pr(T=0)=\frac12,\quad
\Pr(T=2/3)=\Pr(T=-2/3)=\frac14,
$$

$$
\Pr(|T|>1/3)=\frac14+\frac14=\frac12.
$$

独立符号は三個だが中央の符号には結果が依存しない。
<!-- solution-end -->

**問題 SLT1-07-A04（二項和と境界ケース）**
- Level: A

$2n=8$ とする。$d=0,1,2,9$ に対し $\sum_{j=0}^{\min(d,8)}\binom8j$ を求めよ。$d=9$ で $(8e/d)^d$ を使ってよいかも答えよ。

<!-- solution-start -->
**詳細解答**。順に

$$
\begin{aligned}
d=0:&\quad\binom80=1,\\
d=1:&\quad1+\binom81=9,\\
d=2:&\quad1+8+\binom82=1+8+28=37,\\
d=9:&\quad\sum_{j=0}^8\binom8j=2^8=256.
\end{aligned}
$$

最後は $d>2n$ なので[二項和の多項式界](../SLT1-06/index.md#cor-slt1-06-polynomial)の適用条件 $1\le d\le2n$ を満たさない。$(8e/9)^9$ を用いる根拠はない。
<!-- solution-end -->

**問題 SLT1-07-A05（信頼度から偏差幅へ）**
- Level: A

VC次元1、$n=1000$、$\delta=0.05$ の二値分類で、Sauer–Shelah上界を使った一様偏差幅 $B_{n,d,\delta}$ を式で書き、少なくとも何%以上の確率で成立するかを答えよ。

<!-- solution-start -->
**詳細解答**。$2n=2000,d=1$ だから二項和は $1+2000=2001$。よって[高確率界](#cor-slt1-07-vc-high-prob)の式に代入して

$$
B_{1000,1,0.05}=
\sqrt{\frac8{1000}\log\left(\frac{4\cdot2001}{0.05}\right)}
\approx0.310.
$$

失敗確率は高々 $\delta=0.05$ なので成功確率は95%以上である。これは全仮説について同時の保証で、ある一つの仮説だけの保証ではない。
<!-- solution-end -->

### Level B：補題を自分でつなぐ

**問題 SLT1-07-B01（確率的対称化を再構成する）**
- Level: B

$\mathcal H$ は非空可算、$S,S'$ は独立な $P^n$、損失は0–1、$n\varepsilon^2\ge2$ とする。$D_{P,n}(S)>\varepsilon$ のとき、$S$ のみから選んだ仮説 $h_S$ に対する補助標本の成功確率を示し、$\Pr(D_{P,n}>\varepsilon)\le2\Pr(D_{2,n}>\varepsilon/2)$ を導け。

<!-- solution-start -->
**詳細解答**。可算列挙 $h_1,h_2,\ldots$ の最初の $|R_P(h_k)-\widehat R_S(h_k)|>\varepsilon$ を満たすものを $h_S$ とする。$S$ について可測で、条件付きでは固定仮説になる。独立な補助標本の0–1損失平均について

$$
\operatorname{Var}(\widehat R_{S'}(h_S)\mid S)
=\frac{\operatorname{Var}(\ell_{h_S}(Z))}{n}
\le\frac1{4n}.
$$

[Chebyshev不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-chebyshev)から $\Pr(|\widehat R_{S'}(h_S)-R_P(h_S)|>\varepsilon/2\mid S)\le1/(n\varepsilon^2)\le1/2$。補助標本の平均がこの幅の内側にある事象を考える。二つの経験平均の差について、三角不等式を適用して

$$
\begin{aligned}
|\widehat R_{S'}(h_S)-\widehat R_S(h_S)|
&\ge|R_P(h_S)-\widehat R_S(h_S)|
-|R_P(h_S)-\widehat R_{S'}(h_S)|\\
&>\varepsilon/2.
\end{aligned}
$$

従って $D_{P,n}>\varepsilon$ が起きた $S$ では、条件付き確率少なくとも $1/2$ で $D_{2,n}>\varepsilon/2$ となる。条件付き確率を $S$ で積分し、

$$
\Pr(D_{2,n}>\varepsilon/2)
\ge\frac12\Pr(D_{P,n}>\varepsilon)
$$

を得て、両辺を2倍する。
<!-- solution-end -->

**問題 SLT1-07-B02（VC界から近似ERMへ）**
- Level: B

VC次元 $d=2$、$n=500$、$\delta=0.05$、0–1損失の可算仮説クラスで、標本は独立同分布とする。$\eta$-近似ERMのクラス内過剰リスクを $\eta$ を残して式で上から抑えよ。母集団最小値の達成を仮定する必要があるかも説明せよ。

<!-- solution-start -->
**詳細解答**。$2n=1000$ なので[成長関数界](../SLT1-06/index.md#cor-slt1-06-growth)の二項和は

$$
S(1000,2)=1+1000+\frac{1000\cdot999}{2}=500501.
$$

従って確率95%以上で $D_{P,500}\le B$、ただし

$$
B=\sqrt{\frac8{500}\log\frac{4\cdot500501}{0.05}}.
$$

[近似ERMの決定論的界](../SLT1-04/index.md#thm-slt1-04-approximate-erm-oracle)にこの事象を代入すると

$$
R_P(\widehat h)-\inf_{h\in\mathcal H}R_P(h)
\le2\sqrt{\frac8{500}\log\frac{4\cdot500501}{0.05}}+\eta.
$$

比較する任意の $h$ について $R_P(\widehat h)\le R_P(h)+2B+\eta$ を示してから下限を取るので、最小値を達成する $h$ の存在は不要である。一方、$\eta=0$ のERM解が存在するかどうかは別に確かめる必要がある。
<!-- solution-end -->

**問題 SLT1-07-B03（独立でないとどうなるか）**
- Level: B

$P(X=0,Y=0)=P(X=1,Y=0)=1/2$、$\mathcal H=\{h\}$、$h(x)=x$ とする。一つの $(U,0)\sim P$ を全 $n$ 観測へ複製した場合、VC次元、母集団リスク、一様偏差を求め、なぜ本章の結論が適用できないか証明せよ。

<!-- solution-start -->
**詳細解答**。$\mathcal H$ は一関数のみなので、任意の一点でも0と1の両方を実現できず、[VC次元の定義](../SLT1-05/index.md#def-slt1-05-vc)から $d=0$。分布下の損失は $\ell_h(X,0)=X$ で $R_P(h)=1/2$。複製標本では

$$
\widehat R_S(h)=\frac1n\sum_{i=1}^n U=U,
\qquad D_{P,n}(S)=|1/2-U|=1/2
$$

であり、$n$ に関係なく確率1で偏差 $1/2$ が残る。周辺分布は全て $P$ だが $n\ge2$ では互いに独立でない。特に標本平均の分散は $\operatorname{Var}(U)=1/4$ で、独立同分布なら成立する $1/(4n)$ への減少がない。[確率的対称化](#lem-slt1-07-prob-symmetrization)と[対交換](#lem-slt1-07-pair-swap)の独立性条件が崩れる。
<!-- solution-end -->

**問題 SLT1-07-B04（無限クラスと有限クラスを比較する）**
- Level: B

$n=100$、VC次元1で、仮説数がちょうど $10^6$ の有限二値分類クラスがあるとする。$2n$ 点の損失パターン数を仮説数とSauer–Shelah上界の両方で評価し、$\delta=0.05$ の高確率界の対数項をどちらで小さくできるか比較せよ。閾値が有理数全体の可算無限クラスならどうなるか。

<!-- solution-start -->
**詳細解答**。仮説数からはパターン数高々 $10^6$。VC次元1の[成長関数界](../SLT1-06/index.md#cor-slt1-06-growth)からは $1+2n=201$。従って二つを合わせた上界は

$$
\Pi_{\mathcal H}(200)\le\min(10^6,201)=201.
$$

定理の確率を $\delta$ で制御する際、仮説数だけなら $\log(4\cdot10^6/0.05)$、VCからは $\log(4\cdot201/0.05)$ となり、単調性から後者が小さい。可算無限の有理閾値クラスでは仮説数による union bound は使えないが、[閾値の成長関数](../SLT1-05/index.md#thm-slt1-05-threshold)は $\Pi(200)=201$ なので同じVC型評価ができる。
<!-- solution-end -->

### Level C：統合した標本数設計

**問題 SLT1-07-C01（agnostic分類で保証を設計する）**
- Level: C

$\mathcal X=\mathbb R$、$\mathcal H=\{x\mapsto\boldsymbol1_{\{x\ge t\}}:t\in\mathbb Q\}$ とする。$(X,Y)$ の分布 $P$ は任意で、$Y$ にノイズがあってよい。独立同分布標本からERM解 $\widehat h$ が可測に選ばれ、実際に経験リスクの最小値を達成すると仮定する。$\delta=0.05$ の下で、$n=12000$ ならクラス内過剰リスクが $0.2$ 以下であることを本章の境界から数値的に証明せよ。またこの結論が Bayes最適リスクからの差を意味しない理由を述べよ。

<!-- solution-start -->
**詳細解答**。まず $\mathcal H$ は可算で、各閾値関数は可測な0–1予測関数であり、標本抽選前に固定されている。$Y$ は0または1、損失は0–1で有界、標本は独立同分布なので定理の条件を満たす。[閾値の定理](../SLT1-05/index.md#thm-slt1-05-threshold)より $d=1$、$\Pi(2n)=2n+1$ である。

[高確率界](#cor-slt1-07-vc-high-prob)と[近似ERMの系](#cor-slt1-07-agnostic-erm)に $\eta=0$ を入れると、確率95%以上で

$$
R_P(\widehat h)-\inf_{h\in\mathcal H}R_P(h)
\le2\sqrt{\frac8n\log\frac{4(2n+1)}{0.05}}.
$$

$n=12000$ を代入すると $2n+1=24001$、$4(24001)/0.05=1920080$ で、

$$
\begin{aligned}
2\sqrt{\frac8{12000}\log(1920080)}
&\approx2\sqrt{0.0006667\cdot14.468}\\
&\approx0.1964<0.2.
\end{aligned}
$$

この計算は、失敗確率を0.05以下とする**クラス内の**過剰リスク保証を与える。Bayes最適予測器が閾値関数で表せるとは限らず、

$$
R_P(\widehat h)-R_P^*
=\bigl(R_P(\widehat h)-\inf_{h\in\mathcal H}R_P(h)\bigr)
+\bigl(\inf_{h\in\mathcal H}R_P(h)-R_P^*\bigr)
$$

の第二項は[近似誤差](../SLT1-01/index.md#def-slt1-01-approximation)として残る。ノイズがあってもクラス内の保証は成立するが、Bayesリスクとの差が0.2以下とは主張できない。
<!-- solution-end -->

## まとめ

1. ghost sample により未知の期待値をもう一つの経験平均へ置き換える。確率的対称化の係数2には、補助標本が十分近づく確率の下界が必要である。
2. 独立な対交換で、$2n$ 個の損失値を固定した有限パターンの問題になる。予測列から損失列への反転は可逆なので、パターン数は $\Pi_{\mathcal H}(2n)$ 以下である。
3. Sauer–Shelah補題を合成すると、VC次元が有限なら分布に依存しない高確率の一様汎化界を得る。それを近似ERMに適用すれば、agnosticなクラス内過剰リスクを制御できる。

ここでは**VC次元が有限なら一様汎化界が得られる**ことを証明した。次章では、逆にVC次元が無限のとき分布自由PAC学習がなぜ難しくなるかを調べる。
