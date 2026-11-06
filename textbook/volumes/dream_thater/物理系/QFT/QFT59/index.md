# QFT59 単一区間のRényi・von Neumannエントロピーと普遍係数

[QFT58の単一区間レプリカ指数](../QFT58/index.md#prop-qft58-interval-moment)で、分岐点のtwist演算子の二点関数から整数 $n$ のモーメントの長さ依存を求めました。いま知りたいのは、**そのモーメントから「エンタングルメントの量」をどう取り出すか**です。

この章では、無限直線上の二次元ユニタリCFTの真空、空間区間 $A=[u,v]$ の長さ $\ell=v-u>0$、短距離cutoff $a>0$、$\ell\gg a$ を考えます。左右の中心電荷は $c=\bar c\ge0$ とします。場の作用のLorentz符号は $(-,+)$（四次元へ拡張すると $(-,+,+,+)$）を用い、ここで行う計算はEuclid化した二次元相関関数です。質量・温度・有限円周・物理的境界が別の長さを導入する場合は、まだ扱いません。

## 1. モーメントを情報量へ変換する

[QFT57の有限cutoffのRényiエントロピー](../QFT57/index.md#def-qft57-replica-moments)では、正規化された縮約密度演算子 $\rho_A$ の固有値 $p_i\ge0$、$\sum_i p_i=1$ に対し、$R(n)=\sum_i p_i^n$ から $S_n=(1-n)^{-1}\ln R(n)$ を作りました。まず二準位でこの変換が実際に何を数えるか確認します。

**直接例（最大混合）**：$\rho_A=\operatorname{diag}(1/2,1/2)$ なら $R(n)=2^{1-n}$ なので、整数 $n\ge2$ でも一般の実数 $n>0$、$n\ne1$ でも $S_n=\ln2$ です。対して純粋状態 $\rho_A=\operatorname{diag}(1,0)$ は $R(n)=1$、$S_n=0$ です。いずれも **密度行列を先に知っている有限系** の計算であり、連続場の分岐被覆を定義したことにはなりません。

量子場では有限cutoffでの $R_a(n,\ell)$ を考え、[QFT58のtwist二点表示](../QFT58/index.md#prop-qft58-twist-geometry)で整数レプリカに限って主たる長さ依存を得ます。以下、計算の見通しを良くするため $x=\ell/a>1$ と置きます。整数 $n\ge2$ についての主項は

$$
R_a(n,\ell)\simeq C_n x^{-p_n},\qquad
p_n=\frac c6\left(n-\frac1n\right),\qquad C_n>0.
$$

$\simeq$ は $x\to\infty$ のスケーリング主項を表します。正の係数 $C_n$ は模型・端点の規格化・cutoff処方に依存するため、中心電荷だけでは計算できません。有限cutoffでの等式へ無断で格上げしないため、必要なら $R_a=C_nx^{-p_n}(1+\varepsilon_n(x))$、$\varepsilon_n(x)\to0$（**固定整数 $n$ ごと**）と書きます。

<a id="prop-qft59-renyi-interval"></a>

<!-- formal-statement-start -->
> **命題（平面真空の単一区間Rényi普遍項）**
> 二次元ユニタリCFTの無限直線真空で、$c=\bar c$、区間長 $\ell\gg a>0$ とする。整数 $n\ge2$ について[QFT58の整数レプリカ主項](../QFT58/index.md#prop-qft58-interval-moment)が成立し、$C_n>0$ とする。このとき区間Rényiエントロピーのスケーリング主項は

$$
S_n(A)=\frac c6\left(1+\frac1n\right)\ln\frac\ell a+k_n+o(1),
\qquad k_n=\frac{\ln C_n}{1-n}.
$$

> $o(1)$ は $\ell/a\to\infty$、**固定整数 $n$** で消える補正を表す。$k_n$ の値は普遍的ではない。
<!-- formal-statement-end -->

### 証明の見取り図

対数を取ると、長さのべきが前に下ります。重要なのは $n-1/n$ を $n-1$ で割ると $1+1/n$ が現れる点です。

<!-- proof-start -->
### 証明

$R_a=C_nx^{-p_n}(1+\varepsilon_n)$ と置くと、固定整数 $n$ では $\ln(1+\varepsilon_n)=o(1)$。したがって

$$
\begin{aligned}
S_n(A)
&=\frac1{1-n}\ln R_a(n,\ell)\\
&=\frac{\ln C_n}{1-n}
  +\frac{-p_n}{1-n}\ln x+\frac{\ln(1+\varepsilon_n)}{1-n}\\
&=k_n+\frac c6\frac{n-1/n}{n-1}\ln x+o(1)\\
&=k_n+\frac c6\frac{(n-1)(n+1)/n}{n-1}\ln x+o(1)\\
&=k_n+\frac c6\left(1+\frac1n\right)\ln x+o(1).
\end{aligned}
$$

ここでは $n\ge2$ なので $n-1$ で割る操作は適法です。補正項については固定 $n$ の極限しか使っておらず、$n\to1$ の微分可能性はまだ主張していません。
<!-- proof-end -->

**直接例（自由bosonと自由Majorana）**：[自由bosonの中心電荷](../QFT51/index.md#thm-qft51-boson-central-charge)は $c=1$、[自由Majoranaの中心電荷](../QFT53/index.md#thm-qft53-majorana-central)は $c=1/2$ です。従って $n=2$ ではそれぞれ $S_2=\tfrac14\ln x+k_2+o(1)$、$S_2=\tfrac18\ln x+k_2+o(1)$ です。後者の $k_2$ は前者と同じと仮定できません。$n=3$ では係数が $2c/9$ になることを式に $n=3$ を代入して確かめてください。

## 2. 普遍なのは絶対値ではなく長さに対する傾き

エントロピーの絶対値がUV規格化に依存する一方、二つの十分大きい長さでの差は定数を消せます。$\ell_1,\ell_2\gg a$ を同じ模型・同じcutoffで比較すると

$$
S_n(\ell_2)-S_n(\ell_1)
=\frac c6\left(1+\frac1n\right)\ln\frac{\ell_2}{\ell_1}+o(1).
$$

右辺の誤差は両方の長さをスケーリング領域に保って極限を取るときのものです。例えば自由bosonの $n=2$ で長さを4倍にすると、主項の差は $(1/4)\ln4=(1/2)\ln2$。ここでは $C_2$ を求めずに検算できました。

cutoffの名前を変えた場合に何が変わるかも調べます。物理的な $R(n,\ell)$ を不変にして、新しい表示尺度 $a'=\lambda a$（$\lambda>0$、$a'\ll\ell$）を使うと、$x'=\ell/a'=x/\lambda$ です。

<a id="prop-qft59-cutoff-shift"></a>

<!-- formal-statement-start -->
> **命題（cutoff表示尺度の変更）**
> 整数 $n\ge2$、$p_n=c(n-1/n)/6$ とし、同じ物理的レプリカモーメントを $C_n(\ell/a)^{-p_n}$ と $C'_n(\ell/a')^{-p_n}$ で表示する。ただし $a'=\lambda a$、$\lambda>0$ とする。すると

$$
C'_n=C_n\lambda^{-p_n},\qquad
k'_n=k_n+\frac c6\left(1+\frac1n\right)\ln\lambda.
$$

> この変化によって $S_n$ 全体は不変となる。
<!-- formal-statement-end -->

### 証明の見取り図

物理量を変えずに $x$ だけ $x/\lambda$ と書き直し、その前の定数を決め直します。

<!-- proof-start -->
### 証明

同じモーメントを表す必要条件は

$$
C_nx^{-p_n}=C'_n(x/\lambda)^{-p_n}
=C'_n\lambda^{p_n}x^{-p_n}.
$$

$x^{-p_n}>0$ を消去して $C'_n=C_n\lambda^{-p_n}$。両辺の対数を取り、$k_n=\ln C_n/(1-n)$ を使うと

$$
\begin{aligned}
k'_n-k_n
&=-\frac{p_n}{1-n}\ln\lambda\\
&=\frac c6\frac{n-1/n}{n-1}\ln\lambda
=\frac c6\left(1+\frac1n\right)\ln\lambda.
\end{aligned}
$$

従って $\alpha_n\ln(\ell/a')+k'_n=\alpha_n[\ln(\ell/a)-\ln\lambda]+k_n+\alpha_n\ln\lambda$、ここで $\alpha_n=c(1+1/n)/6$ なので元の式に戻ります。
<!-- proof-end -->

これは実験で格子間隔を変えても $C_n$ が固定という意味ではありません。**同一物理量の再表示** と **格子模型や正則化方式そのものの変更** を分けてください。後者では有限cutoff補正も変わり得ます。

## 3. $n=1$ の極限はどこまで正当化できるか

有限密度行列では固有値 $p_i$ が既知なので、実数 $n>0$ に対して $R(n)=\sum_{p_i>0}p_i^n$ という自然な拡張を持ちます。その導関数は $R'(1)=\sum_{p_i>0}p_i\ln p_i$、$R(1)=1$。従って[QFT57の有限次元のレプリカ微分公式](../QFT57/index.md#thm-qft57-replica-derivative)から $-R'(1)$ はvon Neumannエントロピーです。**整数の分岐被覆で得た数列には、この固有値表示が自動では付いていません。**

何が追加で必要かを、誤差項まで含めて明示します。整数式の指数 $p_n$ を実数へ延長したうえで、$n=1$ 近傍の区間 $I$ 上で実際の連続したレプリカ関数を $R(n,x)$ とします。$n$ はもはやコピーの枚数ではなく、定義された補間の引数です。

<a id="thm-qft59-conditional-von-neumann"></a>

<!-- formal-statement-start -->
> **定理（条件付きの単一区間von Neumann普遍係数）**
> $c=\bar c$ の上記CFT真空について、有限cutoffの物理的モーメントの実数拡張 $R(n,x)>0$ が $1$ を含む実区間 $I$ 上で微分可能かつ $R(1,x)=1$ であり、$S_A(x)=-\partial_n\ln R(n,x)|_{n=1}$ をその縮約状態のエントロピーとして使えると仮定する。さらに

$$
\ln R(n,x)=\ln C(n)
-\frac c6\left(n-\frac1n\right)\ln x+r(n,x)
$$

> が $I$ 上で成り立ち、$C(n)>0$ は $n=1$ で微分可能、$C(1)=1$、$r(1,x)=0$、$\partial_n r(1,x)=o(1)$（$x\to\infty$）とする。このとき

$$
S_A(x)=\frac c3\ln x+k_1+o(1),\qquad
k_1=-\left.\partial_n\ln C(n)\right|_{n=1}.
$$

> これらの補間・微分・極限の仮定は整数レプリカの幾何からは従わない。
<!-- formal-statement-end -->

### 証明の見取り図

$n=1$ の近くで**実在する物理的な拡張**を仮定したので対数を微分できます。主項の傾き、規格化定数の傾き、cutoff誤差の傾きを別々に取ります。

<!-- proof-start -->
### 証明

仮定の $R(1,x)=C(1)=1$ と $p_1=0$ から $r(1,x)=0$ と整合します。$n$ 微分を実行すると

$$
\partial_n\ln R(n,x)
=\frac{C'(n)}{C(n)}
-\frac c6\left(1+\frac1{n^2}\right)\ln x
+\partial_nr(n,x).
$$

これを $n=1$ で評価し、全体に負号を付けます。

$$
\begin{aligned}
S_A(x)
&=-\frac{C'(1)}{C(1)}
  +\frac c6(1+1)\ln x-\partial_nr(1,x)\\
&=\frac c3\ln x+k_1+o(1).
\end{aligned}
$$

最後の $o(1)$ は $-\partial_nr(1,x)$ で、**固定整数 $n$ で $r(n,x)\to0$** より強い仮定です。[QFT58の条件付き係数](../QFT58/index.md#prop-qft58-conditional-entropy)を、微分する補正の必要条件まで明記した形です。
<!-- proof-end -->

この式に出る $c/3$ が普遍的なのは、仮定した真空・無限直線・単一区間・CFTスケーリング領域においてです。$k_1$ は規格化に依存します。[前節のcutoff変換](#prop-qft59-cutoff-shift)を $n=1$ 近傍で微分可能に延ばせるなら、$k'_1=k_1+(c/3)\ln\lambda$ となり、$S_A$ 自体は同じです。

**極限の直接検算**：$C(n)=\exp[-b(n-1)+d(n-1)^2]$ を $n=1$ 近傍で取ると、$C(1)=1$、$k_1=b$。$n\ne1$ の規格化項は

$$
\frac{\ln C(n)}{1-n}=b-d(n-1)\longrightarrow b.
$$

したがってRényiの主項 $\frac c6(1+1/n)\ln x+k_n$ は $n\to1$ で $\frac c3\ln x+b$ へ近づきます。ただしこの計算は、その $C(n)$ が**物理的な補間**である場合のものです。

## 4. 整数データだけでは導関数を固定できない

失敗例を一つ作り、何を仮定しなければならないか確かめます。整数で得た長さ依存を満たす正の補間 $R(n,x)$ があったとして、任意の実数 $\eta$ について

$$
\widetilde R(n,x)=R(n,x)
\exp\bigl[\eta\sin(\pi n)\ln x\bigr]
$$

と置きます。すべての整数 $m\ge1$ で $\sin(\pi m)=0$ なので $\widetilde R(m,x)=R(m,x)$、しかも $\widetilde R(1,x)=1$。ですが微分は

$$
\left.\partial_n\ln\widetilde R\right|_1
=\left.\partial_n\ln R\right|_1
-\eta\pi\ln x,
$$

よって形式的なエントロピーは $\widetilde S=S+\eta\pi\ln x$ となってしまいます。整数レプリカの全データが一致しても、追加条件を欠けば **対数の係数そのもの** すら一意に導けません。

この $\widetilde R$ が正しい密度演算子の全実数モーメントだと主張しているのではありません。むしろそれを保証する正値性・スペクトル・解析条件がない補間は排除する必要があるという反例です。エントロピーの普遍係数は、[twistの整数ウェイト](../QFT58/index.md#thm-qft58-twist-weight)だけでなく、物理的な $n\to1$ 極限を選ぶ入力を必要とします。

## 5. 適用範囲を見極める

- **有限cutoff**：局所領域の密度行列とエントロピーは[QFT57のcutoff依存の領域エントロピーの定義](../QFT57/index.md#def-qft57-cutoff-entropy)に従う。連続極限で局所密度行列が無条件に存在するとは言わない。
- **無限直線の真空・単一区間**：この章の主公式。中心電荷だけで長さに対する係数を固定するが、定数は固定しない。
- **有限温度・有限円周**：[QFT55の平面–円筒写像](../QFT55/index.md#thm-qft55-stress-transform)を使うと新しい相関関数を検討できるが、温度と円周の極限を含む区間エントロピーは次章で導く。ここで $\ell$ を機械的に温度の逆数へ置換しない。
- **複数区間・物理的境界**：twist四点関数や境界状態に依存するデータが入り、単一区間の定数と指数だけでは決まらない。物理的境界とレプリカの切れ目は[QFT58の区別](../QFT58/index.md#thm-qft58-replica-partition)のとおり異なる。
- **Rényi次数の別極限**：$n\to\infty$ は最大固有値に関係するが、固定整数 $n$ での $o(1)$ を一様に制御できない以上、この章のスケーリング公式をそのまま $n=\infty$ へ持ち込めない。

## 6. 演習：係数・規格化・二つの極限

<a id="ex-qft59-a01"></a>

### QFT59-A01 自由bosonの二次Rényi

- Level: A
- 対応目標: 中心電荷とRényi係数

$c=1$、$n=2$、$\ell/a=16$ の単一区間真空で、$S_2-k_2$ の主項を計算せよ。また $\ell/a$ を64に増やしたときの差を求めよ。

<!-- solution-start -->
### 詳細解答

[単一区間Rényi命題](#prop-qft59-renyi-interval)に $c=1,n=2$ を代入して係数は $(1/6)(1+1/2)=1/4$。従って $S_2-k_2=(1/4)\ln16=\ln2$（主項）です。同じ模型・cutoffでの差は $(1/4)\ln(64/16)=(1/4)\ln4=(1/2)\ln2$。どちらも有限cutoff補正を省いた値です。
<!-- solution-end -->

<a id="ex-qft59-a02"></a>

### QFT59-A02 自由Majoranaの三次Rényi

- Level: A
- 対応目標: 二つの自由模型の係数比較

$c=1/2$ の自由Majoranaと $c=1$ の自由bosonについて、$n=3$ の $\ln(\ell/a)$ 係数をそれぞれ求め、比を求めよ。

<!-- solution-start -->
### 詳細解答

$1+1/3=4/3$ なので係数は $c(4/3)/6=2c/9$。Majoranaでは $1/9$、bosonでは $2/9$ で、比は $1:2$ です。[自由模型の中心電荷](../QFT53/index.md#thm-qft53-majorana-central)を使いました。各模型の $k_3$ まで同じ比になるとは結論できません。
<!-- solution-end -->

<a id="ex-qft59-a03"></a>

### QFT59-A03 cutoff名の変更

- Level: A
- 対応目標: 定数項の非普遍性

$c=1,n=2$ で表示尺度を $a'=2a$ へ変える。同じモーメントを表す $C'_2/C_2$ と $k'_2-k_2$ を求めよ。

<!-- solution-start -->
### 詳細解答

$p_2=(1/6)(2-1/2)=1/4$ です。[cutoff表示尺度の命題](#prop-qft59-cutoff-shift)に $\lambda=2$ を入れて $C'_2/C_2=2^{-1/4}$、$k'_2-k_2=(1/4)\ln2$。$\ln(\ell/a')=\ln(\ell/a)-\ln2$ なので $(1/4)\ln(\ell/a')+k'_2=(1/4)\ln(\ell/a)+k_2$ と戻ります。
<!-- solution-end -->

<a id="ex-qft59-a04"></a>

### QFT59-A04 有限Bell対との違い

- Level: A
- 対応目標: 既知の固有値と場のレプリカを区別する

$|\Psi\rangle=(|00\rangle+|11\rangle)/\sqrt2$ の第一系について $R(n)$、$S_n$、$S$ を求めよ。なぜ $c/3$ の係数がこの問題に現れないか述べよ。

<!-- solution-start -->
### 詳細解答

第二系を部分トレースすると $\rho_A=I_2/2$、固有値は $1/2,1/2$。[有限cutoffのレプリカモーメントとRényiエントロピー](../QFT57/index.md#def-qft57-replica-moments)により $R(n)=2(1/2)^n=2^{1-n}$、$S_n=\ln2$。von Neumannエントロピーも $S=-2(1/2)\ln(1/2)=\ln2$。ここには平面CFT、空間区間、長さスケーリングがないため、$c/3$ は適用できません。
<!-- solution-end -->

<a id="ex-qft59-a05"></a>

### QFT59-A05 規格化関数の微分

- Level: A
- 対応目標: $n\to1$ と規格化の有限極限

$C(n)=\exp[-b(n-1)+d(n-1)^2]$、$b,d\in\mathbb R$ とする。$C(1)$、$k_n=\ln C(n)/(1-n)$、$k_1$ を求めよ。

<!-- solution-start -->
### 詳細解答

$n=1$ では指数が0なので $C(1)=1$。$\ln C(n)=-b(n-1)+d(n-1)^2$ だから、$n\ne1$ で $k_n=b-d(n-1)$。従って $k_1=\lim_{n\to1}k_n=b$。直接 $-\partial_n\ln C(n)|_1=-[-b+2d(n-1)]_{n=1}=b$ と計算しても一致します。
<!-- solution-end -->

<a id="ex-qft59-b01"></a>

### QFT59-B01 長さ差から中心電荷を読む

- Level: B
- 対応目標: 未知の端点定数を消去する

同じCFT真空について $n=2$ で長さを $\ell$ から $e^2\ell$ へ変えると、エントロピー差のスケーリング主項が $1$ だった。この測定から $c$ を推定し、$n=3$ の同じ長さ比で期待する差を求めよ。

<!-- solution-start -->
### 詳細解答

[Rényi普遍項](#prop-qft59-renyi-interval)より $\Delta S_2=(c/6)(3/2)\ln(e^2)=c/2$。差が1なら $c=2$。同じ $c$ で $n=3$ の係数は $2c/9=4/9$、長さ比の対数が2なので $\Delta S_3=8/9$。どちらも $k_2,k_3$ が消えるが、有限cutoff補正は測定誤差として残ります。
<!-- solution-end -->

<a id="ex-qft59-b02"></a>

### QFT59-B02 係数を $n=1$ へ運ぶ

- Level: B
- 対応目標: 微分と極限の条件を区別する

物理的な正の補間が $\ln R(n,x)=\ln C(n)-\frac c6(n-1/n)\ln x+r(n,x)$ を満たすとする。$C(1)=1$、$r(1,x)=0$ とし、$C'(1)/C(1)=-b$、$\partial_nr(1,x)=\delta(x)$ なら $S_A(x)$ を計算せよ。$\delta(x)\to0$ が必要な箇所を特定せよ。

<!-- solution-start -->
### 詳細解答

$\partial_n(n-1/n)=1+1/n^2$ なので $n=1$ では2。微分すると $\partial_n\ln R|_1=-b-(c/3)\ln x+\delta(x)$。従って $S_A(x)=-\partial_n\ln R|_1=b+(c/3)\ln x-\delta(x)$。$\delta(x)\to0$ は最後の誤差を $o(1)$ と書くために必要で、固定整数で $r(n,x)\to0$ と分かるだけでは不十分です。
<!-- solution-end -->

<a id="ex-qft59-b03"></a>

### QFT59-B03 整数一致と微分の非一意性

- Level: B
- 対応目標: 未正当化の解析接続を見抜く

正の補間 $R(n,x)$ に $\exp[\eta\sin(\pi n)\ln x]$ を掛ける。整数での一致、$n=1$ での正規化、$n=1$ の対数微分の変化を検算せよ。この関数が密度行列のモーメントといえるか。

<!-- solution-start -->
### 詳細解答

整数 $m\ge1$ では $\sin(\pi m)=0$ なので因子は1、特に $\widetilde R(1,x)=R(1,x)=1$。対数微分への付加項は $\eta\pi\cos(\pi n)\ln x$、$n=1$ では $-\eta\pi\ln x$。よって $\widetilde S-S=\eta\pi\ln x$。正の補間であるだけでは $\sum_i p_i^n$ の形を保証できず、物理的な密度行列のモーメントとして許されるとは限りません。整数データだけから係数を決定する証明には使えません。
<!-- solution-end -->

<a id="ex-qft59-b04"></a>

### QFT59-B04 大きなRényi次数を急いで取らない

- Level: B
- 対応目標: $n$ とcutoffの二重極限

固定整数 $n\ge2$ の各々で $\varepsilon_n(x)=n^2/(x+n^2)$ とする。(1) $x\to\infty$ での極限、(2) 固定 $x>0$ で $n\to\infty$ の極限、(3) $n=\lfloor\sqrt x\rfloor$ として $x\to\infty$ の極限を求め、固定 $n$ の $o(1)$ の意味を述べよ。

<!-- solution-start -->
### 詳細解答

(1) 固定 $n$ では分子が定数で分母は $x$ とともに増えるので $\varepsilon_n(x)\to0$。(2) 固定 $x$ では分子・分母を $n^2$ で割ると $1/(x/n^2+1)\to1$。(3) $n=\lfloor\sqrt x\rfloor$ なら $n^2/x\to1$ なので $\varepsilon_n= (n^2/x)/(1+n^2/x)\to1/2$。従って固定整数 $n$ での $o(1)$ は $n$ に一様とは限らず、Rényi次数を無限大へ送る式にはそのまま使えません。
<!-- solution-end -->

<a id="ex-qft59-c01"></a>

### QFT59-C01 単一区間の情報量を最初から再構成する

- Level: C
- 対応目標: レプリカ指数、規格化、解析接続、誤差制御の統合

平面真空の二次元ユニタリCFTで $c=\bar c=1/2$、区間 $\ell\gg a$ を考える。整数レプリカの主項が $R_a(n,\ell)=C_n(\ell/a)^{-\frac c6(n-1/n)}(1+\varepsilon_n)$ と与えられ、固定整数 $n$ で $\varepsilon_n\to0$ とする。

1. $n=2,3$ の長さ指数とRényiエントロピーの対数係数を求めよ。
2. $a'=3a$ へ表示尺度を変えた際の $C'_2/C_2$ と $k'_2-k_2$ を求めよ。
3. 実数補間を追加仮定して $C(n)=\exp[-b(n-1)+d(n-1)^2]$、$r(1,x)=0$、$\partial_nr(1,x)=o(1)$ とする。von Neumannエントロピーの主項を導け。
4. 固定整数の $\varepsilon_n\to0$ だけでは (3) を結論できない理由を、具体的な補間変形で説明せよ。

<!-- solution-start -->
### 詳細解答

**(1) 整数での計算。** $n=2$ では $n-1/n=3/2$。$p_2=(1/2)(3/2)/6=1/8$ なので $R_2\simeq C_2x^{-1/8}$。$S_2$ は $-p_2\ln x/(1-2)=\tfrac18\ln x$ に定数 $k_2$ を足したもの。$n=3$ では $n-1/n=8/3$、$p_3=(1/2)(8/3)/6=2/9$。$S_3$ の係数は $p_3/(3-1)=1/9$。従って

$$
S_2=\frac18\ln x+k_2+o(1),\qquad
S_3=\frac19\ln x+k_3+o(1).
$$

**(2) 規格化。** $p_2=1/8$ なので [cutoff表示尺度の命題](#prop-qft59-cutoff-shift)から $C'_2/C_2=3^{-1/8}$、$k'_2-k_2=(1/8)\ln3$。$\frac18\ln(x/3)+k'_2=\frac18\ln x+k_2$ で物理量が不変であることも検算できます。

**(3) $n=1$ の操作。** 補間は $C(1)=1$、$\partial_n\ln C|_1=-b$ を満たします。[条件付きvon Neumann定理](#thm-qft59-conditional-von-neumann)の微分で $\partial_n(n-1/n)|_1=2$ なので、$S_A=-(-b)+(c/3)\ln x-\partial_nr(1,x)$。$c=1/2$ を入れると

$$
S_A=\frac16\ln\frac\ell a+b+o(1).
$$

$d$ は二階以降の項で $n=1$ の一階微分には寄与しません。

**(4) 論理上の境界。** $\widetilde R=R\exp[\eta\sin(\pi n)\ln x]$ は整数のすべてで同じ値ですが、$n=1$ での対数微分は $-\eta\pi\ln x$ だけ変わります。従って仮定なしに (3) の係数を得たとする議論は成り立ちません。$\widetilde R$ が実在する物理的密度行列のモーメントである保証がない点こそ、必要な追加条件を示しています。
<!-- solution-end -->

## 7. 次に学ぶこと

単一区間のRényiエントロピーには $\frac c6(1+1/n)\ln(\ell/a)$、条件を満たす $n\to1$ のvon Neumannエントロピーには $\frac c3\ln(\ell/a)$ が現れます。両者の**対数係数**は共形対称性で固定されますが、端点定数と整数から非整数への拡張は別問題です。

次の段階は、同じtwist演算子を有限温度の熱円筒・有限空間円周へ写し、$\ell\ll\beta$ や $\ell\ll L$ の極限を実際に確かめることです。無限直線での長さ $\ell$ を他の尺度に置き換えるだけでは、正しい答えにはなりません。
