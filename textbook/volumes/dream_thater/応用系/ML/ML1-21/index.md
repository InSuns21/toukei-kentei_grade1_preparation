# ML1-21 分布シフト・欠測・総合検証実験

[訓練・検証・テスト分割](../ML1-12/index.md#def-ml1-12-three-way-split)では、学習と評価で観測が独立で同じ分布に従う場合を中心に考えた。しかし学習時と運用時で利用者の属性構成が変わったり、特定の条件の回答だけが欠けたりすることがある。[分類の評価指標](../ML1-13/index.md#def-ml1-13-classification-rates)を正しく計算しても、**何の集団に対する値か**を取り違えれば結論は変わる。

本講では、学習側の分布と運用側の分布を分けることから始める。「変わらない条件付き分布はどれか」「欠測する確率は何に依存するか」を指定し、重み付き評価が成り立つ条件と、データからは回復できない場合を区別する。最後に、[ブートストラップ](../ML1-15/index.md#def-ml1-15-bootstrap)や[クラスタリング](../ML1-20/index.md#def-ml1-20-kmeans-objective)と結び付けた再現可能な実験を行う。

## 1. 二つの集団で予測を評価する

説明変数 $X$ と二値目的変数 $Y\in\{0,1\}$ の組 $Z=(X,Y)$ を考える。学習側の結合確率分布を $P$、運用側を $Q$ とする。まず $X$ も有限集合 $\mathcal X$ の値を取るとし、和で全てを確かめる。実数特徴量へ拡張する際には、密度比の存在と積分可能性を別途確認する。

[母集団リスク](../ML1-01/index.md#def-ml1-01-risks)に従い、予測器 $h$ と非負の損失 $\ell(h(x),y)$ に対して、運用側で知りたい量は

$$
R_Q(h)=\sum_{x\in\mathcal X}\sum_{y=0}^1
Q(X=x,Y=y)\ell(h(x),y)
$$

である。以下の恒等式では $h$ は固定した予測器とし、損失の期待値は有限とする。訓練データに依存する予測器を評価するなら、それとは独立な標本に条件付けて適用する。

一つの数値模型を用意しよう。学習分布 $P$ の下で

$$
P(X=0)=P(X=1)=\frac12,\qquad
P(Y=1\mid X=0)=\frac15,\quad
P(Y=1\mid X=1)=\frac45
$$

とする。結合確率の4セルは順に $P(0,0)=2/5,\ P(0,1)=1/10,\ P(1,0)=1/10,\ P(1,1)=2/5$ で、合計は1である。定数分類器 $h_0(x)=0$ の誤分類率は $P(Y=1)=1/2$。これを基準に二種類の変化を比較する。

## 2. 説明変数の比率が変わる場合

運用先で $X=1$ の人が増えても、各 $X$ における $Y$ の条件付き確率が変わらない場合を考える。例えば、先の模型で運用側の $Q(X=1)=4/5$ とする。

<a id="def-ml1-21-covariate-shift"></a>

<!-- formal-statement-start -->
> **定義（共変量シフト）**  
> 有限な $\mathcal X$ と二値 $Y$ 上の結合分布 $P,Q$ が、各 $x$ で $Q(X=x)>0$ なら $P(X=x)>0$ を満たすとする。$Q(X=x)>0$ の各 $x$ と $y\in\{0,1\}$ について

$$
Q(Y=y\mid X=x)=P(Y=y\mid X=x)
$$

> が成り立つとき、共変量シフト（covariate shift）と呼ぶ。$P(X=x)>0$ 上の比 $w(x)=Q(X=x)/P(X=x)$ を説明変数の重要度重みと呼ぶ。$Q(X=x)=0$ なら $w(x)=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-21-covariate-shift -->
**定義の確認**：上の $P$ に対し $Q(X=0)=1/5,\ Q(X=1)=4/5$、$Q(Y=1\mid X=x)$ はそれぞれ $1/5,4/5$ のままとする。両方の $x$ で $P(X=x)>0$ だから台の条件を満たす。各 $x$ で $Y=0$ の確率も $1$ から引けば一致する。重みは $w(0)=(1/5)/(1/2)=2/5,\ w(1)=(4/5)/(1/2)=8/5$。両条件を直接確認した。
<!-- definition-example-end -->

<a id="prop-ml1-21-covariate-weight"></a>

<!-- formal-statement-start -->
> **命題（共変量シフトのリスク重み付け）**  
> 有限集合上の分布 $P,Q$ が[共変量シフト](#def-ml1-21-covariate-shift)を満たし、固定予測器 $h$ の非負損失の $Q$ 期待値が有限なら

$$
R_Q(h)=\mathbb E_P[w(X)\ell(h(X),Y)],
\qquad \mathbb E_P[w(X)]=1.
$$

> さらに $Z_1,\ldots,Z_n$ が $P$ からの独立同分布標本で $h,w$ をこれらの標本で推定していないとする。$T_i=w(X_i)\ell(h(X_i),Y_i)$ が二乗可積分なら $n^{-1}\sum_i T_i$ は $R_Q(h)$ に不偏で、分散は $\operatorname{Var}_P(T_1)/n$ である。
<!-- formal-statement-end -->

### 証明の見取り図

条件付き分布は変えずに $X$ の周辺分布だけを入れ替える。リスクの和を $X$ ごとにまとめ、比 $Q(X=x)/P(X=x)$ を掛ける。

<!-- proof-start -->
### 証明

$P(X=x)>0$ の各 $x$ では $P(x,y)=P(X=x)P(Y=y\mid X=x)$ である。$Q(X=x)>0$ なら仮定から

$$
\begin{aligned}
Q(x,y)&=Q(X=x)P(Y=y\mid X=x)\\
&=P(X=x)w(x)P(Y=y\mid X=x)=w(x)P(x,y).
\end{aligned}
$$

$Q(X=x)=0$ では $Q(x,y)=0=w(x)P(x,y)$ なので、全セルについて同じ関係になる。これを運用リスクの有限和に代入して第一式を得る。損失の代わりに1を入れれば

$$
\mathbb E_P[w(X)]=\sum_xP(X=x)w(x)=\sum_xQ(X=x)=1.
$$

標本に依存しない $h,w$ の下では $T_i$ は同一分布で独立、期待値は $R_Q(h)$。よって平均の期待値は $R_Q(h)$、分散は $\sum_i\operatorname{Var}(T_i)/n^2=\operatorname{Var}(T_1)/n$ である。$\square$
<!-- proof-end -->

**計算してみる**：$h_0=0$ の条件付き誤分類率は $X=0$ で $1/5$、$X=1$ で $4/5$。運用側でのリスクは

$$
R_Q(h_0)=\frac15\cdot\frac15+\frac45\cdot\frac45
=\frac1{25}+\frac{16}{25}=\frac{17}{25}.
$$

[重み付けの命題](#prop-ml1-21-covariate-weight)を学習側へ適用しても

$$
\frac12\cdot\frac25\cdot\frac15+
\frac12\cdot\frac85\cdot\frac45
=\frac1{25}+\frac{16}{25}
=\frac{17}{25}
$$

となる。一方、元の $P$ でのリスクは $1/2$ だった。重みを付ける操作は**特徴量の分布だけを変える**仮定に依存する。重みが巨大なら命題の分散も大きくなり得る。また $P(X=x)=0<Q(X=x)$ では比を作れず、学習側からその群の損失を求められない。

## 3. 目的変数の比率が変わる場合

別の変化として、疾病の有病率のように $Y$ の割合が変わり、$Y$ を固定したときの $X$ の分布が変わらない場合を考える。これは前節とは保持する条件が逆である。

<a id="def-ml1-21-label-shift"></a>

<!-- formal-statement-start -->
> **定義（ラベルシフト）**  
> 有限集合上の $P,Q$ について、$Q(Y=y)>0$ なら $P(Y=y)>0$ とし、その各 $y$ と $x\in\mathcal X$ で

$$
Q(X=x\mid Y=y)=P(X=x\mid Y=y)
$$

> が成立するとき、ラベルシフト（label shift）と呼ぶ。$P(Y=y)>0$ では $v(y)=Q(Y=y)/P(Y=y)$ とし、$Q(Y=y)=0$ なら $v(y)=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-21-label-shift -->
**定義の確認**：第1節の $P$ は $P(Y=1)=1/2$ で、$P(X=1\mid Y=1)=(2/5)/(1/2)=4/5$、$P(X=1\mid Y=0)=(1/10)/(1/2)=1/5$。$Q(Y=1)=4/5,\ Q(Y=0)=1/5$ として両 $Y$ 群の $X$ 条件付き分布をこのまま使う。$P(Y=y)=1/2>0$ により台の条件を満たし、$v(1)=8/5,\ v(0)=2/5$ になる。これは第2節の $w(X)$ ではなく、目的変数の関数である。
<!-- definition-example-end -->

<a id="prop-ml1-21-label-weight"></a>

<!-- formal-statement-start -->
> **命題（ラベルシフトのリスク重み付け）**  
> 有限集合上の $P,Q$ が[ラベルシフト](#def-ml1-21-label-shift)を満たし、固定した $h$ の非負損失の $Q$ 期待値が有限なら

$$
R_Q(h)=\mathbb E_P[v(Y)\ell(h(X),Y)],
\qquad \mathbb E_P[v(Y)]=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

前節と違って $Y$ で和をまとめる。条件付き確率の保存を使う位置が鍵である。

<!-- proof-start -->
### 証明

$Q(Y=y)>0$ なら

$$
Q(x,y)=Q(Y=y)Q(X=x\mid Y=y)
=v(y)P(Y=y)P(X=x\mid Y=y)=v(y)P(x,y).
$$

$Q(Y=y)=0$ のセルでは両辺が0であり全セルで成立する。従って

$$
R_Q(h)=\sum_{x,y}v(y)P(x,y)\ell(h(x),y)
=\mathbb E_P[v(Y)\ell(h(X),Y)].
$$

最後に $\mathbb E_P[v(Y)]=\sum_yP(Y=y)v(y)=\sum_yQ(Y=y)=1$。$\square$
<!-- proof-end -->

この例では $h_0=0$ の運用誤分類率は $Q(Y=1)=4/5$。[ラベルシフトの重み式](#prop-ml1-21-label-weight)も、$P(Y=1)v(1)=(1/2)(8/5)=4/5$ と再現する。第2節の運用分布は $Q(Y=1)=17/25$ であり、二つのシフトを同一視できない。

**条件の破れを数える**：第2節の共変量シフトでは $Q(X=1,Y=1)=(4/5)(4/5)=16/25$、$Q(Y=1)=17/25$ なので

$$
Q(X=1\mid Y=1)=\frac{16/25}{17/25}=\frac{16}{17}\ne\frac45.
$$

従って共変量シフトでも一般にラベルシフトではない。逆に本節のラベルシフトでは $Q(X=1,Y=1)=16/25$、$Q(X=1)=16/25+1/25=17/25$ となるので、$Q(Y=1\mid X=1)=16/17\ne4/5$。つまりラベルシフトから共変量シフトも従わない。

ラベルシフトの重みは $Y$ の値を要する。運用側のラベルが全く観測できないとき、$v(y)$ が既知とは限らない。ラベル比率の推定には、別途識別可能性やラベル付き標本などの仮定が要る。

## 4. 何が観測されなくなるのか

今度は分布が変わらなくても、目的変数 $Y$ の回答が欠ける場合を調べる。$X$ は常に観測できるとし、$R=1$ は $Y$ を観測できたこと、$R=0$ は $Y$ が欠けたことを表す。記録に残るのは $(X,R,RY)$ であり、$R=0$ なら $RY=0$ と記録しても、それは真の $Y=0$ を意味しない。

回答される確率 $\pi(x,y)=P(R=1\mid X=x,Y=y)$ が何に依存するかによって区別する。

<a id="def-ml1-21-missingness"></a>

<!-- formal-statement-start -->
> **定義（MCAR・MAR・MNAR：目的変数欠測）**  
> 有限な $(X,Y)$ と回答指標 $R\in\{0,1\}$ に対し、確率が正のセルで次のように定める。
>
> - **MCAR（完全無作為欠測）**：ある定数 $c\in[0,1]$ があり、全セルで $P(R=1\mid X=x,Y=y)=c$。
> - **MAR（無作為欠測）**：各 $x$ に対応する値 $\pi(x)\in[0,1]$ があり、全セルで $P(R=1\mid X=x,Y=y)=\pi(x)$。すなわち $R$ と未観測になり得る $Y$ が、常に観測できる $X$ を固定すると条件付き独立である。
> - **MNAR（非無作為欠測）**：MARの条件を満たさない機構。ある正確率の $x$ で $P(R=1\mid X=x,Y=0)\ne P(R=1\mid X=x,Y=1)$ となる。
>
> MCARはMARの特別な場合である。この分類は「$Y$ だけが欠測し、$X$ は観測済み」という設定に対するものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-21-missingness -->
**定義の確認**：第1節の $P$ を使う。(i) 全セルで回答確率 $1/2$ はMCARなのでMARでもある。(ii) $\pi(0)=1/4,\ \pi(1)=1$ は、同じ $X$ のもとで $Y=0,1$ の回答確率が一致するのでMARだが、$X$ によって違うためMCARではない。(iii) 全ての $x$ で $\pi(x,0)=1/5,\ \pi(x,1)=4/5$ とすれば、同じ $x$ でも未観測の $Y$ に依存するのでMNARである。3例とも回答確率は $[0,1]$ 内で、各セルの元の確率も正である。
<!-- definition-example-end -->

MARでも、回答済みの人だけを集めたデータが母集団を代表するとは限らない。例(ii)では

$$
\begin{aligned}
P(R=1)&=\frac12\cdot\frac14+\frac12\cdot1=\frac58,\\
P(Y=1,R=1)&=\frac12\cdot\frac15\cdot\frac14
+\frac12\cdot\frac45\cdot1=\frac{17}{40},\\
P(Y=1\mid R=1)&=\frac{17/40}{5/8}=\frac{17}{25}.
\end{aligned}
$$

真の $P(Y=1)=1/2$ より大きい。回答が $X$ を介して $Y$ の構成を変えてしまったからである。

<a id="prop-ml1-21-ipw-missing"></a>

<!-- formal-statement-start -->
> **命題（MAR下での逆回答確率重み付け）**  
> $(X,Y,R)$ が有限集合上の分布に従い、$Y$ のみが欠測する。[MAR](#def-ml1-21-missingness)かつ全ての $P(X=x)>0$ で $\pi(x)=P(R=1\mid X=x)>0$ とする。固定した任意の実数値関数 $g(X,Y)$ が可積分なら

$$
\mathbb E_P\left[\frac{R\,g(X,Y)}{\pi(X)}\right]
=\mathbb E_P[g(X,Y)].
$$

> 左辺では $R=0$ の項を0と定義するので、欠測した $Y$ を参照しなくてよい。
<!-- formal-statement-end -->

### 証明の見取り図

既習の[条件付き期待値の性質](../../../解析系/F0/F0-00P3A/index.md#thm-f0-00p3a-basic-properties)を使い、まず $(X,Y)$ を固定したときの $R$ の平均を計算する。

<!-- proof-start -->
### 証明

$P(X=x,Y=y)>0$ のセルでMARの仮定から

$$
\mathbb E[R\mid X=x,Y=y]=P(R=1\mid x,y)=\pi(x).
$$

$\pi(x)>0$ なので

$$
\mathbb E\left[\left.\frac{R\,g(X,Y)}{\pi(X)}\right|X=x,Y=y\right]
=\frac{g(x,y)}{\pi(x)}\,\pi(x)=g(x,y).
$$

この条件付き期待値を $P(x,y)$ で重み付けして全セルで和を取ると右辺になる。有限集合で $g$ が可積分かつ $\pi(x)>0$ なので、割り算に問題はない。$\square$
<!-- proof-end -->

**数値確認**：上のMAR例で $g(X,Y)=Y$ とする。$X=0$ の寄与は $(1/2)(1/5)(1/4)/(1/4)=1/10$、$X=1$ の寄与は $(1/2)(4/5)(1)/1=2/5$。合計は $1/2$ になり、回答者だけの平均 $17/25$ と異なる。

分母が0となる群は補正できない。$\pi(x)$ が未知なら、観測済み $X,R$ からそれを推定する誤差も無視できない。上の式は**真の $\pi$ を使用した母集団の恒等式**であって、推定した $\pi$ を用いる有限標本比率の厳密な不偏性を主張するものではない。

## 5. MNARでは観測だけで真値を決められない

重要な違いは、MNARであること自体より、未観測ラベルについて追加仮定なしに何を同定できるかにある。次の反例は、同じ記録が全く違う有病率を生み得ることを示す。

<a id="prop-ml1-21-mnar-nonidentify"></a>

<!-- formal-statement-start -->
> **命題（欠測下の陽性率の非識別性）**  
> $X$ を定数とし、観測記録を $(R,RY)$ のみとする。$P(R=1,Y=1)=2/5,\ P(R=1,Y=0)=1/10,\ P(R=0)=1/2$ という観測分布からは、追加仮定がなければ $P(Y=1)$ は一意に決まらない。
<!-- formal-statement-end -->

### 証明の見取り図

未回答者の $Y$ が記録されないことを使い、同じ三つの観測確率を二つの異なる完全データ分布から構成する。

<!-- proof-start -->
### 証明

模型Aでは $P_A(Y=1)=P_A(Y=0)=1/2$ とし、

$$
P_A(R=1\mid Y=1)=\frac45,\quad
P_A(R=1\mid Y=0)=\frac15.
$$

従って観測される $(R=1,Y=1)$ の確率は $(1/2)(4/5)=2/5$、$(R=1,Y=0)$ は $(1/2)(1/5)=1/10$、残りの $R=0$ は $1-2/5-1/10=1/2$ である。回答率は $Y$ に依存するためMNARである。

模型Bでは $P_B(Y=1)=4/5,\ P_B(Y=0)=1/5$ とし、$Y$ によらず $P_B(R=1\mid Y)=1/2$ とする。観測セルの確率は $(4/5)(1/2)=2/5$、$(1/5)(1/2)=1/10$、未回答は $1/2$。この模型はMCARである。

観測記録の全確率は一致するが、$P_A(Y=1)=1/2$ と $P_B(Y=1)=4/5$ は異なる。$\square$
<!-- proof-end -->

したがって「回答者の陽性率を補正する」には、MARのような検証可能とは限らない機構仮定や、追跡調査など追加情報が必要になる。観測分布だけからMARを自動的に確認できたことにはならない。

## 6. 分布シフトと欠測が同時に起きる

学習側で $Y$ の一部が欠測し、運用先では $X$ の割合が変わる場合を考える。まず何を仮定すれば**一つの**重み式で運用リスクを評価できるかを明示する。

<a id="thm-ml1-21-joint-weighting"></a>

<!-- formal-statement-start -->
> **定理（共変量シフトとMARの積重み恒等式）**  
> 有限な $\mathcal X\times\{0,1\}$ 上の学習分布 $P(X,Y,R)$ と運用分布 $Q(X,Y)$ を考える。$(X,Y)$ の二つの周辺分布が[共変量シフト](#def-ml1-21-covariate-shift)を満たし、学習側の回答機構が[MAR](#def-ml1-21-missingness)であるとする。$Q(X=x)>0$ なら $P(X=x)>0$ かつ $\pi(x)=P(R=1\mid X=x)>0$ と仮定する。固定した予測器 $h$ の非負損失が $Q$ の下で可積分なら

$$
R_Q(h)=\mathbb E_P\left[
\frac{R\,w(X)}{\pi(X)}\,\ell(h(X),Y)
\right],\qquad w(x)=\frac{Q(X=x)}{P(X=x)}.
$$

> $Q(X=x)=0$ なら対応する $w(x)=0$ とし、$R=0$ の項は0とする。右辺は学習側の回答済みラベルだけで計算できる。
<!-- formal-statement-end -->

### 証明の見取り図

先にMARの回答確率で重みを消し、残った $(X,Y)$ の期待値を共変量シフトで運用側へ移す。二つの仮定は使う場所が異なる。

<!-- proof-start -->
### 証明

$Q(X=x)>0$ のセルに限って $\pi(x)>0$ である。そこで条件付き平均を取れば

$$
\begin{aligned}
&\mathbb E_P\left[\left.
\frac{R\,w(X)}{\pi(X)}\ell(h(X),Y)\right|X=x,Y=y\right]\\
&\quad=\frac{w(x)\ell(h(x),y)}{\pi(x)}
P(R=1\mid x,y)
=w(x)\ell(h(x),y).
\end{aligned}
$$

$Q(X=x)=0$ のセルの積重みは0と置く。全セルで平均すると右辺は $\mathbb E_P[w(X)\ell(h(X),Y)]$。これに[共変量シフトの重み付け命題](#prop-ml1-21-covariate-weight)を適用して $R_Q(h)$ を得る。有限集合なので全ての和は有限であり、示した正の確率以外では割り算をしていない。$\square$
<!-- proof-end -->

この定理を有限標本で使う際には注意が必要である。例えば学習済み予測器 $h$ を同じラベル付き標本で採点すると、[独立保留評価の定理](../ML1-12/index.md#thm-ml1-12-independent-holdout)の独立条件を失う。重み $w,\pi$ も推定値なら、上式の真の比が得られているとは限らない。どちらの推定も検証・テスト用ラベルを盗み見ず、訓練側または別途用意したデータで行う。

## 7. 評価を設計する：何をいつ固定するか

未知の運用環境を評価する際は、分布の違いを予測精度から切り離して考える。[検証損失による選択](../ML1-12/index.md#def-ml1-12-validation-selection)と[Brier損失](../ML1-13/index.md#def-ml1-13-brier)を再利用する。

<a id="def-ml1-21-shift-evaluation"></a>

<!-- formal-statement-start -->
> **定義（シフト下の訓練・検証・テスト手順）**  
> 分布 $P$ の訓練集合 $T$、運用側の分布 $Q$ を代表する検証集合 $V$ と独立な最終テスト集合 $U$ を用意し、三集合の標本・算法乱数を相互に独立に生成する。前処理（欠測処理・中心化・尺度変換・特徴量選択）、欠測回答率・分布比・模型のパラメータは、$T$ と独立に許された補助データのみで学習する。$V$ の損失で候補を一つ選択し、$U$ のラベルはその予測器と全設定を固定した後に一度だけ評価するために用いる。
>
> $V$ と $U$ にラベルが得られない場合、教師付き損失を直接計算できない。このときは既知の分布比・欠測機構による補正や、新たなラベル取得などの条件を別途明示する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-21-shift-evaluation -->
**定義の確認**：訓練 $T$ に $X=(0,2)$、テスト $U$ に $X=100$ があるとする。$T$ だけの平均は1なので、中心化変換は訓練に $(-1,1)$、未知点に99を返す。テストを混ぜた全平均は34であり、訓練に $(-34,-32)$、テストに66を返す。後者はテスト特徴量から前処理を学習したので定義に反する。テストラベルを使わなくても、未来の特徴量を勝手に前処理へ取り込む設計は、固定済みモデルの独立評価と区別しなければならない。
<!-- definition-example-end -->

現場では日時や拠点ごとに分割し、将来の集団をどの標本が代表するかを先に決める。訓練分布の重み付けは、運用分布を完全に再現する保証ではない。[適切な損失](../ML1-13/index.md#thm-ml1-13-brier-proper)も、評価対象の分布を明示して初めて比較できる。

## 8. 計算ラボ：固定seedで統制比較する

以下は外部APIや個人データを使わないNumPy実験である。学習データは第1節の $P$、検証・最終テストは第2節の共変量シフト $Q$ から**別々に**生成する。訓練ラベルは $X=0$ で回答率 $1/4$、$X=1$ で $4/5$ というMAR機構で部分的に観測される。固定seedを使い、訓練標本、重み、模型候補、検証・テストの役割を明示する。

比較候補は、観測ラベルの単純平均を返す定数模型、逆回答確率で補正した定数模型、$X$ ごとの頻度を用いる模型、そして[Bagging](../ML1-15/index.md#def-ml1-15-bagging)によるその平均である。これらはすべて $Y=1$ の予測確率を返す。さらに[2群k-means](../ML1-20/index.md#def-ml1-20-kmeans-objective)の距離平方和を別途出力する。**教師なしの平方和は予測精度のスコアではない**ため、Brier損失とは混ぜない。

~~~python
import numpy as np

seed = 2026
rng = np.random.default_rng(seed)
n_train, n_val, n_test = 1200, 2000, 2000
pi = np.array([0.25, 0.80])  # MAR: P(R=1 | X=0,1)
eta = np.array([0.20, 0.80]) # P(Y=1 | X=0,1) は不変
p_source, p_target = 0.50, 0.80

def draw(n, prob_x1):
    x = rng.binomial(1, prob_x1, size=n)
    y = rng.binomial(1, eta[x])
    return x, y

train_x, train_y = draw(n_train, p_source)
val_x, val_y = draw(n_val, p_target)
test_x, test_y = draw(n_test, p_target)
responded = rng.random(n_train) < pi[train_x]
obs_x = train_x[responded]
obs_y = train_y[responded]
inv_pi = 1.0 / pi[obs_x]
assert len(obs_x) > 0 and set(np.unique(train_x)) == {0, 1}

def rate(x, y, weights=None):
    weights = np.ones(len(y)) if weights is None else weights
    return float(np.sum(weights * y) / np.sum(weights))

def table(x, y, weights=None, alpha=1.0):
    weights = np.ones(len(y)) if weights is None else weights
    out = np.empty(2)
    for j in range(2):
        mask = x == j
        # alphaを両クラスへ加える対称な平滑化
        out[j] = (np.sum(weights[mask] * y[mask]) + alpha) / (
            np.sum(weights[mask]) + 2 * alpha)
    return out

naive = rate(obs_x, obs_y)
ipw = rate(obs_x, obs_y, inv_pi)
group = table(obs_x, obs_y, inv_pi)

bag_models = []
for _ in range(50):
    ids = rng.integers(0, len(obs_y), size=len(obs_y))
    bag_models.append(table(obs_x[ids], obs_y[ids],
                            inv_pi[ids]))
bagged = np.mean(np.array(bag_models), axis=0)

models = {
    "complete-case constant": lambda x: np.full(len(x), naive),
    "MAR-weighted constant": lambda x: np.full(len(x), ipw),
    "stratified": lambda x: group[x],
    "bagged stratified": lambda x: bagged[x],
}
def brier(pred, y):
    return float(np.mean((pred - y) ** 2))

val_scores = {name: brier(model(val_x), val_y)
              for name, model in models.items()}
chosen = min(val_scores, key=val_scores.get)
test_score = brier(models[chosen](test_x), test_y)
print("n observed", len(obs_y), "observed rate", naive,
      "MAR weighted rate", ipw)
print("group rates", group, "bagging", bagged)
print("validation", val_scores)
print("selected", chosen, "one-shot test Brier", test_score)

# 固定された h(x)=0 のリスク: 学習母集団と運用先
w = np.array([0.40, 1.60])
ipw_shift_risk = np.mean(
    responded * (w[train_x] / pi[train_x]) * train_y)
print("risk h=0: exact source", 0.5,
      "exact target", 0.68, "joint-IPW sample", ipw_shift_risk)

# k-means: Xが0/1で両値とも存在すれば、k=2の中心(0,1)は平方和0
centers = np.array([0., 1.])
objective = float(np.sum((train_x - centers[train_x]) ** 2))
assert objective == 0.0
print("k-means k=2 training SSE", objective)
assert all(0 <= s <= 1 for s in val_scores.values())
assert 0 <= test_score <= 1
~~~

観測数・seed・MAR回答率・運用先の $P(X=1)$ を変更して再実行してよい。ただし運用先の $P(X=1)$ を変えたら、理論上の $w$ と「正確な運用リスク」の表示値も更新する。上の $0.68$ は運用先を $4/5$ に固定した場合の値である。また、真の $\pi,\eta,w$ を実験者が知っているのは合成データだからであり、現実に自動取得できることを意味しない。

正しい条件付き確率 $(1/5,4/5)$ による運用Brierリスクは、各群で $\eta(1-\eta)=4/25$ なので $4/25=0.16$。定数確率 $1/2$ を返す模型なら各群のBrier期待損失は $1/4$。固定seedで得た実測値はこれらに近づき得るが一致を強制しない。訓練側のMAR補正と運用側のシフト補正は異なる役割を持つ。検証で候補を選ぶ場合、**選択後のテスト値が下がるとは保証されない**ことも確かめよう。

## 9. 演習

### ML1-21-A01 共変量シフトの重み

- Level: A

学習分布で $P(X=0)=P(X=1)=1/2$、$P(Y=1\mid X=0)=1/5$、$P(Y=1\mid X=1)=4/5$ とする。運用側では $Q(X=1)=4/5$ で $Y\mid X$ は不変である。$w(0),w(1)$ と $h(x)=0$ の運用誤分類率を求めよ。

<!-- solution-start -->
**詳細解答**：[共変量シフトの定義](#def-ml1-21-covariate-shift)から $Q(X=0)=1/5$、$w(0)=(1/5)/(1/2)=2/5$、$w(1)=(4/5)/(1/2)=8/5$。$h=0$ の誤りは $Y=1$ に限られるので、[重み付け命題](#prop-ml1-21-covariate-weight)へ $x=0,1$ を代入すると

$$
R_Q(h)=\frac12\frac25\frac15+\frac12\frac85\frac45
=\frac1{25}+\frac{16}{25}=\frac{17}{25}.
$$

$P$ の両 $x$ に正の確率があるため、台の仮定も満たす。
<!-- solution-end -->

### ML1-21-A02 ラベルシフトの重み

- Level: A

$P(Y=0)=P(Y=1)=1/2$、$P(X=1\mid Y=0)=1/5$、$P(X=1\mid Y=1)=4/5$ とする。$Q(Y=1)=4/5$ で $X\mid Y$ は保存される。$v(y)$ と $Q(X=1)$ を求めよ。

<!-- solution-start -->
**詳細解答**：[ラベルシフト](#def-ml1-21-label-shift)で $Q(Y=0)=1/5$ なので $v(0)=2/5$、$v(1)=8/5$。全確率により

$$
Q(X=1)=Q(Y=0)P(X=1\mid Y=0)
+Q(Y=1)P(X=1\mid Y=1)
=\frac15\frac15+\frac45\frac45=\frac{17}{25}.
$$

条件付き分布と台の条件を保っていることを確認した。
<!-- solution-end -->

### ML1-21-A03 回答機構を判別する

- Level: A

二値 $X,Y$ の全4セルが正確率とする。目的変数 $Y$ の回答指標を $R$ とする。(i) $P(R=1\mid x,y)=0.6$、(ii) $P(R=1\mid x,y)=0.2+0.5x$、(iii) $P(R=1\mid x,y)=0.2+0.5y$ をMCAR/MAR/MNARで判別せよ。$(x,y)\in\{0,1\}^2$ とする。

<!-- solution-start -->
**詳細解答**：[定義](#def-ml1-21-missingness)に各回答確率を代入する。(i) は全セルで0.6なのでMCARかつMAR。(ii) は $x=0$ で0.2、$x=1$ で0.7であり、各 $x$ を固定すれば $y$ に依存しないからMARだがMCARでない。(iii) は同じ $x$ でも $y=0$ で0.2、$y=1$ で0.7と変わるのでMNAR。どの例も確率は0以上1以下で、(ii) は回答確率が正なのでIPWの分母を作れる。
<!-- solution-end -->

### ML1-21-A04 前処理の漏洩

- Level: A

訓練説明変数 $(0,2)$、テスト説明変数100を平均で中心化する。訓練だけで平均を求める場合と、3点をまとめる場合の平均、訓練・テストの変換値を計算せよ。どちらが独立テストに適するか述べよ。

<!-- solution-start -->
**詳細解答**：訓練平均は $(0+2)/2=1$、変換後は $(-1,1)$ と $100-1=99$。全体平均は $(0+2+100)/3=34$、変換後は $(-34,-32)$ と66。後者の変換規則には、テストから持ち込んだ100が含まれる。[分割手順](#def-ml1-21-shift-evaluation)では前処理を訓練で固定するので前者を採用する。
<!-- solution-end -->

### ML1-21-B01 MARなのに回答者平均が偏る

- Level: B

$P(X=0)=P(X=1)=1/2$、$P(Y=1\mid X=0)=1/5$、$P(Y=1\mid X=1)=4/5$。$R$ は $Y$ の回答指標で、MARの回答率は $\pi(0)=1/4,\pi(1)=1$ とする。(i) $P(R=1)$、(ii) 回答者の陽性率、(iii) 逆回答確率補正後の母集団陽性率を求めよ。

<!-- solution-start -->
**詳細解答**：$R\perp Y\mid X$ だから、各 $x$ で $P(Y=1,R=1\mid X=x)=P(Y=1\mid X=x)\pi(x)$。

$$
P(R=1)=\frac12\frac14+\frac12=\frac58.
$$

陽性かつ回答した確率は

$$
P(Y=1,R=1)=\frac12\frac15\frac14+
\frac12\frac45\cdot1=\frac1{40}+\frac{16}{40}=\frac{17}{40}.
$$

従って回答者の陽性率は $(17/40)/(5/8)=17/25$。一方、[MAR重み式](#prop-ml1-21-ipw-missing)で $g=Y$ とし、回答の寄与を各 $x$ で $\pi(x)$ で割ると

$$
\mathbb E[RY/\pi(X)]=\frac{1/40}{1/4}+
\frac{16/40}{1}=\frac1{10}+\frac25=\frac12.
$$

真の $P(Y=1)$ と一致し、回答者平均との違いも確認できる。
<!-- solution-end -->

### ML1-21-B02 同じ観測から異なる陽性率

- Level: B

$X$ は定数、$Y\in\{0,1\}$ の回答指標を $R$ とする。観測確率は $P(R=1,Y=1)=2/5$、$P(R=1,Y=0)=1/10$、$P(R=0)=1/2$。$P(Y=1)=1/2$ のMNAR模型と、$P(Y=1)=4/5$ のMCAR模型をそれぞれ構成し、観測分布が一致することを示せ。

<!-- solution-start -->
**詳細解答**：前者で $\pi(1)=P(R=1\mid Y=1)=(2/5)/(1/2)=4/5$、$\pi(0)=(1/10)/(1/2)=1/5$ とする。$Y$ により異なるのでMNARで、観測セルは $(1/2)(4/5)=2/5$ と $(1/2)(1/5)=1/10$。後者では両 $Y$ に対し回答確率を $1/2$ にする。MCARで観測セルは $(4/5)(1/2)=2/5$ と $(1/5)(1/2)=1/10$。どちらも残余確率は $1-2/5-1/10=1/2$。従って[非識別性の命題](#prop-ml1-21-mnar-nonidentify)を具体的に構成できた。
<!-- solution-end -->

### ML1-21-B03 重み付き評価の分散

- Level: B

$Z_i=(X_i,Y_i)$ が有限分布 $P$ から独立同分布に従い、$P,Q$ は共変量シフト、$h$ は標本から独立に固定、$T_i=w(X_i)\ell(h(X_i),Y_i)$ は二乗可積分とする。(i) $\widehat R=n^{-1}\sum_iT_i$ の期待値と分散を導け。(ii) もし $P(X=1)=1/100$、$Q(X=1)=1/2$ なら $w(1)$ を計算し、重みの分散上の懸念を述べよ。

<!-- solution-start -->
**詳細解答**：[共変量重みの命題](#prop-ml1-21-covariate-weight)より各 $T_i$ の期待値は $R_Q(h)$。期待値の線形性で $\mathbb E\widehat R=(1/n)nR_Q(h)=R_Q(h)$。独立性により共分散の交差項は0なので

$$
\operatorname{Var}(\widehat R)
=\frac1{n^2}\left(\sum_i\operatorname{Var}(T_i)+
2\sum_{i<j}\operatorname{Cov}(T_i,T_j)\right)
=\frac{\operatorname{Var}(T_1)}n.
$$

(ii) の比は $(1/2)/(1/100)=50$。希少群の観測1件へ大きな重みが掛かるため、$T_i$ の二乗モーメントが大きくなり得る。ただし損失が全て0なら分散は0であり、重み50だけから分散の数値は決められない。
<!-- solution-end -->

### ML1-21-B04 分類確率とシフトを混同しない

- Level: B

学習側で $P(Y=0)=P(Y=1)=1/2$、$P(X=1\mid Y=0)=1/5$、$P(X=1\mid Y=1)=4/5$ とする。運用先はラベルシフトで $Q(Y=1)=4/5$ とする。(i) $P(Y=1\mid X=1)$、(ii) $Q(Y=1\mid X=1)$、(iii) 元の $P$ の確率予測を運用先の真の条件付き確率のままと見なせない理由を示せ。

<!-- solution-start -->
**詳細解答**：まず $P(X=1)=(1/2)(1/5)+(1/2)(4/5)=1/2$ で、Bayes公式より $P(Y=1\mid X=1)=(1/2)(4/5)/(1/2)=4/5$。ラベルシフトでは $Q(X=1,Y=1)=(4/5)(4/5)=16/25$、$Q(X=1,Y=0)=(1/5)(1/5)=1/25$ なので

$$
Q(Y=1\mid X=1)=\frac{16/25}{16/25+1/25}=\frac{16}{17}.
$$

ラベルシフトは[条件 $X\mid Y$](#def-ml1-21-label-shift)を保存するが、$Y\mid X$ は保存しない。従って $4/5$ のままの確率予測は運用先で一般に校正されない。
<!-- solution-end -->

### ML1-21-C01 シフト・欠測・予測・検証の統合

- Level: C

学習側で $X,Y\in\{0,1\}$、$P(X=1)=1/2$、$P(Y=1\mid X=0)=1/5$、$P(Y=1\mid X=1)=4/5$ とする。学習側では $Y$ の回答指標 $R$ がMARで、$\pi(0)=1/4,\pi(1)=4/5$。運用側 $Q$ は共変量シフトで $Q(X=1)=4/5$、$Y\mid X$ は変わらない。

(i) 各 $x$ の説明変数の比 $w(x)$ と、$P(R=1)$、$P(Y=1,R=1)$ を求めよ。(ii) 回答者の陽性率を求めよ。(iii) 固定分類器 $h(x)=0$ の運用リスクを真の $Q$ から求め、積重みの式で独立に照合せよ。(iv) $Y=1$ の確率予測を返す $f_1(x)=1/2$ と $f_2(0)=1/5,\ f_2(1)=4/5$ の運用Brierリスクを比べよ。(v) この2模型を選ぶ訓練・検証・テストの利用順と、テストを使ってはいけない操作を述べよ。

<!-- solution-start -->
**詳細解答**：

(i) 台は両 $x$ で正なので $w(0)=(1/5)/(1/2)=2/5,\ w(1)=(4/5)/(1/2)=8/5$。MARの下では

$$
P(R=1)=\frac12\frac14+\frac12\frac45
=\frac18+\frac25=\frac{21}{40}.
$$

回答済みで陽性の確率は

$$
P(Y=1,R=1)=\frac12\frac15\frac14+
\frac12\frac45\frac45
=\frac1{40}+\frac8{25}=\frac{69}{200}.
$$

(ii) 従って回答者陽性率は

$$
P(Y=1\mid R=1)=\frac{69/200}{21/40}
=\frac{69}{105}=\frac{23}{35}.
$$

真の学習側陽性率 $1/2$ とも、運用側陽性率とも一致しない。

(iii) 定数分類器は $Y=1$ で誤りとなる。運用分布から直接

$$
R_Q(h)=\frac15\frac15+\frac45\frac45=\frac{17}{25}.
$$

[積重み定理](#thm-ml1-21-joint-weighting)の右辺を $x$ ごとに評価する。$Y=1$ のセルだけを数え、MAR回答確率は各 $x$ で打ち消されるから

$$
\begin{aligned}
\mathbb E_P\left[\frac{Rw(X)}{\pi(X)}\mathbf1_{\{Y=1\}}\right]
&=\frac12\frac15\frac14\frac{2/5}{1/4}
+\frac12\frac45\frac45\frac{8/5}{4/5}\\
&=\frac1{25}+\frac{16}{25}=\frac{17}{25}.
\end{aligned}
$$

(iv) 二値の[Brier損失](../ML1-13/index.md#def-ml1-13-brier)は $(f(X)-Y)^2$。確率 $\eta$ のBernoulli変数に対して

$$
\mathbb E[(p-Y)^2\mid X=x]
=p^2(1-\eta)+(1-p)^2\eta
=p^2-2p\eta+\eta.
$$

$f_1$ では $p=1/2$ として両群で $1/4$。よって運用平均も $R_Q^{\rm Brier}(f_1)=1/4$。$f_2$ では $p=\eta$ なので各群で $\eta(1-\eta)=(1/5)(4/5)=4/25$。従って $R_Q^{\rm Brier}(f_2)=4/25$。真の運用分布では $f_2$ の方が小さい。

(v) 訓練 $T$ で欠測処理と模型の当てはめを行い、独立で運用側を代表する検証 $V$ で $f_1,f_2$ の損失を比較して選び、**固定した後**に独立テスト $U$ で一度だけ最終評価する。[評価手順](#def-ml1-21-shift-evaluation)から、$U$ のラベルを使って模型選択・平滑化係数・重み・前処理を変更してはいけない。理論リスクの大小は、有限の検証標本が必ず同じ順序になることを保証しない。
<!-- solution-end -->

## 10. 何が残ったか

共変量シフトは $Y\mid X$、ラベルシフトは $X\mid Y$ を保存する。MARは **観測済みの $X$ を固定したときに**回答率が未観測ラベル $Y$ に依存しない条件であり、単純な回答者平均の不偏性を意味しない。真の確率比と回答率に対する重み式は厳密だが、未知の比の推定や、大きな重みによる分散は別の問題として残る。

運用先の分布・損失・独立評価標本を先に指定することが、どの算法よりも評価の出発点となる。次の機械学習IIでは、分布そのものを予測し不確実性を計算する側へ進む。
