# TSA1 Encore IV 時系列解析 I：定常過程・Hilbert 予測

<!-- definition-example-audit: strict -->

時系列解析では、未来予測を始める前に「時間をずらしても二次の構造が変わらない」とは何かを固定する必要があります。

この章の中心は、平均を引いた時系列を Hilbert 空間のベクトルとして見て、

$$
\text{過去の閉線形包}
\longrightarrow
\text{直交射影}
\longrightarrow
\text{最良線形予測}
\longrightarrow
\text{イノベーション}
$$

という一本の幾何へ落とすことです。

条件付き期待値による最良予測は [F0-00P3B の最小二乗最良予測](../F0_00P3B_L2射影_最良予測/index.md#thm-f0-00p3b-best-predictor)、閉部分空間への射影の存在一意性は [Hilbert 射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection) を正本として再利用します。

Wold 分解、remote past、純非決定論性は次章 TSA2 の主役です。この章では、それらを証明へ逆輸入しません。

---

## 1. 狭義定常性と二次定常性

まず「分布全体が時間移動で不変」という強い条件と、「平均・共分散だけが時間移動で不変」という二次の条件を分けます。

<a id="def-tsa1-strict-stationarity"></a>

<!-- formal-statement-start -->
> **定義（狭義定常性）**  
> 実確率過程 $(X_t)_{t\in\mathbb Z}$ が狭義定常（strictly stationary）であるとは、任意の $n\ge1$、任意の時刻 $t_1,\dots,t_n\in\mathbb Z$、任意の整数 $h$ に対して
>
> $$
> (X_{t_1},\dots,X_{t_n})
> \overset{d}{=}
> (X_{t_1+h},\dots,X_{t_n+h})
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

### 1.1 直接例：独立同分布列

$(Z_t)_{t\in\mathbb Z}$ を独立同分布列とします。

<!-- definition-example-start: def-tsa1-strict-stationarity -->
**定義の確認**  
任意の有限個の時刻 $t_1,\dots,t_n$ について、ベクトル $(Z_{t_1},\dots,Z_{t_n})$ の同時分布は各成分の共通分布の積で決まります。全時刻を同じ $h$ だけずらしても各成分の分布と独立性は変わらないため、

$$
(Z_{t_1},\dots,Z_{t_n})
\overset{d}{=}
(Z_{t_1+h},\dots,Z_{t_n+h}).
$$

従って独立同分布列は狭義定常です。
<!-- definition-example-end -->

<a id="def-tsa1-second-order-stationarity"></a>

<!-- formal-statement-start -->
> **定義（二次定常性）**  
> 実確率過程 $(X_t)_{t\in\mathbb Z}$ が二次定常であるとは、各 $X_t\in L^2$ であり、ある定数 $\mu$ と関数 $\gamma:\mathbb Z\to\mathbb R$ が存在して
>
> $$
> E[X_t]=\mu,
> \qquad
> \operatorname{Cov}(X_t,X_s)=\gamma(t-s)
> $$
>
> が全ての $s,t\in\mathbb Z$ で成り立つことをいう。$\gamma$ を自己共分散関数と呼ぶ。
<!-- formal-statement-end -->

### 1.2 直接例：分布は時刻で変わるが二次構造は同じ列

各時刻で独立な $(X_t)$ を次のように取ります。

- 偶数 $t$ では $X_t=\pm1$ を各確率 $1/2$ で取る。
- 奇数 $t$ では $X_t=0$ を確率 $2/3$、$X_t=\pm\sqrt3$ を各確率 $1/6$ で取る。

<!-- definition-example-start: def-tsa1-second-order-stationarity -->
**定義の確認**  
どちらの分布でも

$$
E[X_t]=0,
\qquad
E[X_t^2]=1.
$$

異なる時刻では独立かつ平均0なので

$$
\operatorname{Cov}(X_t,X_s)=0
\qquad (t\ne s).
$$

従って

$$
\gamma(h)=
\begin{cases}
1,&h=0,\\
0,&h\ne0
\end{cases}
$$

と置けば二次定常です。

しかし偶数時刻では $P(|X_t|=1)=1$、奇数時刻では $P(X_t=0)=2/3$ なので一時点分布さえ時刻で変わります。従って狭義定常ではありません。
<!-- definition-example-end -->

<a id="thm-tsa1-strict-implies-second-order"></a>

<!-- formal-statement-start -->
> **定理（狭義定常性から二次定常性）**  
> $(X_t)$ が狭義定常で、$E[X_0^2]<\infty$ なら $(X_t)$ は二次定常である。
<!-- formal-statement-end -->

### 証明の見取り図

狭義定常性を一時点分布と二時点分布に適用します。一時点分布の不変性から平均が一定になり、二時点分布の不変性から $E[X_tX_s]$ が差 $t-s$ だけで決まります。

<!-- proof-start -->
### 証明

狭義定常性から $X_t\overset d= X_0$ なので

$$
E[X_t^2]=E[X_0^2]<\infty,
\qquad
E[X_t]=E[X_0]=:\mu.
$$

次に任意の $s,t$ に対して、時間を $-s$ だけ移動すると

$$
(X_t,X_s)\overset d=(X_{t-s},X_0).
$$

二乗可積分性から積も可積分なので

$$
E[X_tX_s]=E[X_{t-s}X_0].
$$

従って

$$
\operatorname{Cov}(X_t,X_s)
=
E[(X_{t-s}-\mu)(X_0-\mu)]
=:\gamma(t-s).
$$

よって二次定常です。
<!-- proof-end -->

この逆は成り立ちません。1.2 の例が、二次定常でも狭義定常でない直接反例です。

---

## 2. ホワイトノイズ

時系列予測で「新しい情報だけ」を測る基準になるのがホワイトノイズです。

<a id="def-tsa1-white-noise"></a>

<!-- formal-statement-start -->
> **定義（弱ホワイトノイズ）**  
> 実確率過程 $(\varepsilon_t)_{t\in\mathbb Z}$ が分散 $\sigma^2>0$ の弱ホワイトノイズであるとは、
>
> $$
> E[\varepsilon_t]=0,
> \qquad
> \operatorname{Cov}(\varepsilon_t,\varepsilon_s)
> =
> \begin{cases}
> \sigma^2,&t=s,\\
> 0,&t\ne s
> \end{cases}
> $$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

無相関は独立より弱い条件です。従って「ホワイトノイズ」と言っただけで独立性を使ってはいけません。独立同分布まで仮定するときは、その仮定を別に明記します。

### 2.1 直接例：独立標準正規列

<!-- definition-example-start: def-tsa1-white-noise -->
**定義の確認**  
$(Z_t)$ を独立な標準正規確率変数列とします。各 $t$ で

$$
E[Z_t]=0,
\qquad
E[Z_t^2]=1.
$$

また $t\ne s$ なら独立性から

$$
E[Z_tZ_s]=E[Z_t]E[Z_s]=0.
$$

従って $(Z_t)$ は分散1の弱ホワイトノイズです。
<!-- definition-example-end -->

---

## 3. 自己共分散関数は正定値核になる

二次定常性は「共分散が lag だけで決まる」というだけではありません。任意の有限線形結合の分散が非負であるため、$\gamma$ には強い制約があります。

以降は

$$
Y_t:=X_t-\mu
$$

と中心化して議論します。このとき $E[Y_t]=0$ で

$$
\gamma(h)=E[Y_{t+h}Y_t].
$$

<a id="prop-tsa1-covariance-kernel"></a>

<!-- formal-statement-start -->
> **命題（自己共分散関数の正定値性）**  
> $(X_t)$ を二次定常過程、$\gamma$ を自己共分散関数とする。このとき
>
> $$
> \gamma(-h)=\gamma(h),
> \qquad
> |\gamma(h)|\le\gamma(0)
> $$
>
> が全ての $h\in\mathbb Z$ で成り立つ。さらに任意の $n$、任意の実数 $c_1,\dots,c_n$、任意の整数 $t_1,\dots,t_n$ に対して
>
> $$
> \sum_{i=1}^n\sum_{j=1}^n
> c_ic_j\gamma(t_i-t_j)\ge0.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

対称性は共分散の対称性、上界は Cauchy--Schwarz の不等式から出ます。正定値性は有限線形結合 $\sum_i c_iY_{t_i}$ の分散そのものです。

<!-- proof-start -->
### 証明

共分散の対称性から

$$
\gamma(-h)
=
\operatorname{Cov}(X_t,X_{t+h})
=
\operatorname{Cov}(X_{t+h},X_t)
=
\gamma(h).
$$

また Cauchy--Schwarz の不等式より

$$
|\gamma(h)|
=
|E[Y_{t+h}Y_t]|
\le
\|Y_{t+h}\|_2\|Y_t\|_2
=
\gamma(0).
$$

最後に

$$
Z:=\sum_{i=1}^n c_iY_{t_i}
$$

と置くと

$$
0\le E[Z^2]
=
\sum_{i=1}^n\sum_{j=1}^n
c_ic_jE[Y_{t_i}Y_{t_j}]
=
\sum_{i=1}^n\sum_{j=1}^n
c_ic_j\gamma(t_i-t_j).
$$

従って主張が成り立ちます。
<!-- proof-end -->

等間隔時刻 $t_i=i$ を取ると、行列

$$
\Gamma_n
=
\bigl(\gamma(i-j)\bigr)_{1\le i,j\le n}
$$

は半正定値です。これは後で有限過去予測の正規方程式にそのまま現れます。TSA3 では、この正定値列をスペクトル測度へ変換する Herglotz の定理へ進みます。

---

## 4. 過去の閉線形包

線形予測では、過去の観測値へ任意の非線形関数をかけるのではなく、過去観測の線形結合とその $L^2$ 極限だけを許します。

<a id="def-tsa1-past-space"></a>

<!-- formal-statement-start -->
> **定義（過去の線形予測空間）**  
> 平均 $\mu$ の二次定常過程 $(X_t)$ に対し $Y_t=X_t-\mu$ とする。時刻 $t$ までの過去の線形予測空間を
>
> $$
> \mathcal H_t
> :=
> \overline{\operatorname{span}}
> \{Y_s:s\le t\}^{L^2}
> $$
>
> と定める。
<!-- formal-statement-end -->

### 4.1 直接例：ホワイトノイズの過去

<!-- definition-example-start: def-tsa1-past-space -->
**定義の確認**  
$Y_t=\varepsilon_t$ が弱ホワイトノイズなら

$$
\mathcal H_t
=
\overline{\operatorname{span}}
\{\varepsilon_t,\varepsilon_{t-1},\varepsilon_{t-2},\dots\}.
$$

定義で閉包を取っているため $\mathcal H_t$ は $L^2$ の閉線形部分空間です。また生成集合が増えるので

$$
\mathcal H_{t-1}\subseteq\mathcal H_t.
$$
<!-- definition-example-end -->

<a id="def-tsa1-finite-past-space"></a>

<!-- formal-statement-start -->
> **定義（有限過去予測空間）**  
> 正整数 $p$ に対して
>
> $$
> \mathcal H_{t-1}^{(p)}
> :=
> \operatorname{span}
> \{Y_{t-1},\dots,Y_{t-p}\}
> $$
>
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa1-finite-past-space -->
**定義の確認**  
$p=2$ なら任意の元は

$$
a_1Y_{t-1}+a_2Y_{t-2}
$$

と書けます。有限次元部分空間なので自動的に閉です。また

$$
\mathcal H_{t-1}^{(1)}
\subseteq
\mathcal H_{t-1}^{(2)}
\subseteq\cdots\subseteq
\mathcal H_{t-1}
$$

です。
<!-- definition-example-end -->

---

## 5. 有限過去予測と正規方程式

まず有限個の lag だけを使う予測を解きます。ここで Toeplitz 型の自己共分散行列が自然に現れます。

<a id="thm-tsa1-finite-normal-equations"></a>

<!-- formal-statement-start -->
> **定理（有限過去線形予測の正規方程式）**  
> $(X_t)$ を平均 $\mu$ の二次定常過程、$Y_t=X_t-\mu$ とする。$p$ 個の過去
>
> $$
> Y_{t-1},\dots,Y_{t-p}
> $$
>
> から $Y_t$ を最小二乗線形予測する。予測量を
>
> $$
> \widehat Y_t^{(p)}
> =
> \sum_{j=1}^p a_jY_{t-j}
> $$
>
> と書くと、係数は
>
> $$
> \Gamma_pa=\gamma_p,
> $$
>
> $$
> \Gamma_p
> =
> \bigl(\gamma(k-j)\bigr)_{1\le k,j\le p},
> \qquad
> \gamma_p
> =
> \begin{pmatrix}
> \gamma(1)\\
> \vdots\\
> \gamma(p)
> \end{pmatrix}
> $$
>
> を満たす。$\Gamma_p$ が正定値なら係数 $a$ は一意である。$\Gamma_p$ が特異でも、最良予測確率変数 $\widehat Y_t^{(p)}$ 自体は $L^2$ の元として一意である。
<!-- formal-statement-end -->

### 証明の見取り図

有限過去空間への直交射影なので、残差は各基底候補 $Y_{t-k}$ と直交します。その $p$ 本の条件を書き下すと正規方程式になります。係数が非一意でも、同じ射影先の元は一意です。

<!-- proof-start -->
### 証明

[Hilbert 射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)を有限次元閉部分空間 $\mathcal H_{t-1}^{(p)}$ に適用します。最良予測の残差

$$
R_t^{(p)}
=
Y_t-\sum_{j=1}^pa_jY_{t-j}
$$

は $\mathcal H_{t-1}^{(p)}$ 全体と直交するので、各 $k=1,\dots,p$ に対して

$$
E[R_t^{(p)}Y_{t-k}]=0.
$$

従って

$$
\gamma(k)
-
\sum_{j=1}^pa_j\gamma(k-j)
=0.
$$

これを $k=1,\dots,p$ について並べれば

$$
\Gamma_pa=\gamma_p
$$

を得ます。

$\Gamma_p$ が正定値なら可逆なので $a$ は一意です。

一方、$\Gamma_p$ が特異で二つの係数 $a,b$ が同じ射影を表す可能性があります。もし両方が最適なら射影の一意性から

$$
\sum_{j=1}^pa_jY_{t-j}
=
\sum_{j=1}^pb_jY_{t-j}
\quad\text{in }L^2.
$$

従って係数表現が複数あっても、予測確率変数自体は一意です。
<!-- proof-end -->

### 5.1 一つ前だけを使う場合

$\gamma(0)>0$ として $p=1$ なら

$$
a_1
=
\frac{\gamma(1)}{\gamma(0)}.
$$

従って

$$
\boxed{
\widehat Y_t^{(1)}
=
\frac{\gamma(1)}{\gamma(0)}Y_{t-1}
}
$$

です。これは「相関が大きければ前時点を強く使う」という直感を、射影係数として正確にした式です。

---

## 6. 無限過去の最良線形予測

有限 lag 数を増やし続けた極限が、本来の「過去全体を使う線形予測」です。

<a id="thm-tsa1-best-linear-prediction"></a>

<!-- formal-statement-start -->
> **定理（無限過去に基づく最良線形予測）**  
> 二次定常過程 $(X_t)$ を中心化して $Y_t=X_t-\mu$ とする。時刻 $t-1$ までの過去から $Y_t$ を線形予測する問題
>
> $$
> \inf_{Z\in\mathcal H_{t-1}}E[(Y_t-Z)^2]
> $$
>
> は一意な解を持ち、
>
> $$
> \widehat Y_t
> =
> P_{\mathcal H_{t-1}}Y_t
> $$
>
> で与えられる。さらに
>
> $$
> Y_t-\widehat Y_t
> \perp
> \mathcal H_{t-1}.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal H_{t-1}$ は定義により閉線形部分空間です。従って Hilbert 射影定理をそのまま適用できます。

<!-- proof-start -->
### 証明

$L^2$ は Hilbert 空間であり、$\mathcal H_{t-1}$ は閉線形部分空間です。[Hilbert 射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)より

$$
P_{\mathcal H_{t-1}}Y_t
$$

が一意に存在し、

$$
Y_t-P_{\mathcal H_{t-1}}Y_t
\perp
\mathcal H_{t-1}.
$$

任意の $Z\in\mathcal H_{t-1}$ に対して直交分解から

$$
\|Y_t-Z\|_2^2
=
\|Y_t-P_{\mathcal H_{t-1}}Y_t\|_2^2
+
\|P_{\mathcal H_{t-1}}Y_t-Z\|_2^2.
$$

右辺第2項は非負なので、射影が一意な最小化解です。
<!-- proof-end -->

<a id="prop-tsa1-finite-to-infinite"></a>

<!-- formal-statement-start -->
> **命題（有限過去予測から無限過去予測への収束）**  
> $\widehat Y_t^{(p)}=P_{\mathcal H_{t-1}^{(p)}}Y_t$、$\widehat Y_t=P_{\mathcal H_{t-1}}Y_t$ とする。このとき
>
> $$
> \widehat Y_t^{(p)}
> \longrightarrow
> \widehat Y_t
> \qquad\text{in }L^2
> $$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

有限過去空間の合併は、定義により $\mathcal H_{t-1}$ で稠密です。従って $\widehat Y_t$ 自身を有限過去の線形結合で近似でき、その近似より最良な有限射影も同じ極限へ近づきます。

<!-- proof-start -->
### 証明

$\widehat Y_t\in\mathcal H_{t-1}$ なので、定義から

$$
Z_p\in\mathcal H_{t-1}^{(m_p)}
$$

で

$$
\|Z_p-\widehat Y_t\|_2\to0
$$

となる列を取れます。添字を増やして $m_p$ を単調増加に取ってよいので、記号を簡単にして $Z_p\in\mathcal H_{t-1}^{(p)}$ とします。

また

$$
Y_t-\widehat Y_t
\perp
\mathcal H_{t-1}
$$

なので、特に $\mathcal H_{t-1}^{(p)}$ と直交します。従って

$$
P_{\mathcal H_{t-1}^{(p)}}Y_t
=
P_{\mathcal H_{t-1}^{(p)}}\widehat Y_t.
$$

射影は最良近似なので

$$
\|\widehat Y_t-\widehat Y_t^{(p)}\|_2
\le
\|\widehat Y_t-Z_p\|_2
\to0.
$$

よって結論を得ます。
<!-- proof-end -->

---

## 7. 定常性は時間移動をユニタリ作用素にする

「同じ予測問題が全時刻で同じ形を持つ」ことを Hilbert 空間上で表します。

全時刻の中心化変数が張る閉部分空間を

$$
\mathcal H_X
:=
\overline{\operatorname{span}}\{Y_t:t\in\mathbb Z\}
$$

とします。

<a id="lem-tsa1-unitary-shift"></a>

<!-- formal-statement-start -->
> **補題（二次定常過程の時間移動作用素）**  
> 二次定常過程の中心化列 $(Y_t)$ に対し
>
> $$
> UY_t:=Y_{t+1}
> $$
>
> と定める。この対応は有限線形結合上で矛盾なく定義された等長写像となり、一意にユニタリ作用素
>
> $$
> U:\mathcal H_X\to\mathcal H_X
> $$
>
> へ延長される。さらに
>
> $$
> U\mathcal H_t=\mathcal H_{t+1}.
> $$
<!-- formal-statement-end -->

### 証明の見取り図

有限線形結合の $L^2$ ノルムは自己共分散だけで決まります。二次定常性により全時刻を一つずらしてもその Gram 行列が変わらないので、時間移動は等長です。逆向き移動も同様に作れるためユニタリになります。

<!-- proof-start -->
### 証明

有限線形結合

$$
Z=\sum_{j=1}^m c_jY_{t_j}
$$

を考えます。時間を一つ進めた候補は

$$
UZ:=\sum_{j=1}^m c_jY_{t_j+1}.
$$

そのノルムは

$$
\|UZ\|_2^2
=
\sum_{i=1}^m\sum_{j=1}^m
c_ic_j\gamma(t_i-t_j)
=
\|Z\|_2^2.
$$

従って $Z=0$ in $L^2$ なら $UZ=0$ in $L^2$ であり、表現の取り方によらず定義できます。また $U$ は等長です。

逆向きの写像 $Y_t\mapsto Y_{t-1}$ も同じ議論で等長に定義できるため、$U$ は稠密な有限線形包上で全単射です。等長性により閉包 $\mathcal H_X$ へ一意に延長でき、その延長も全単射等長、すなわちユニタリです。

最後に

$$
U\mathcal H_t
=
\overline{\operatorname{span}}
\{Y_{s+1}:s\le t\}
=
\mathcal H_{t+1}.
$$
<!-- proof-end -->

射影の一意性から

$$
UP_{\mathcal H_{t-1}}
=
P_{\mathcal H_t}U
$$

が成り立ちます。これが「予測則の幾何は時刻に依存しない」という本体です。

---

## 8. イノベーション

過去で説明できなかった直交成分を取り出します。

<a id="def-tsa1-innovation"></a>

<!-- formal-statement-start -->
> **定義（イノベーション）**  
> 二次定常過程の中心化列 $Y_t=X_t-\mu$ に対し、一段先最良線形予測誤差
>
> $$
> \varepsilon_t
> :=
> Y_t-P_{\mathcal H_{t-1}}Y_t
> $$
>
> を時刻 $t$ のイノベーション（innovation）という。
<!-- formal-statement-end -->

### 8.1 直接例：ホワイトノイズ

<!-- definition-example-start: def-tsa1-innovation -->
**定義の確認**  
$Y_t$ 自身が弱ホワイトノイズなら、$s<t$ に対して

$$
E[Y_tY_s]=0.
$$

従って $Y_t$ は $\mathcal H_{t-1}$ を生成する全ての過去変数と直交し、閉包全体とも直交します。よって

$$
P_{\mathcal H_{t-1}}Y_t=0,
$$

したがって

$$
\varepsilon_t=Y_t.
$$
<!-- definition-example-end -->

<a id="prop-tsa1-innovation-white-noise"></a>

<!-- formal-statement-start -->
> **命題（イノベーション列の直交性と定常分散）**  
> 二次定常過程から得られるイノベーション列 $(\varepsilon_t)$ は平均0であり、$s\ne t$ なら
>
> $$
> E[\varepsilon_t\varepsilon_s]=0.
> $$
>
> さらに
>
> $$
> E[\varepsilon_t^2]
> =
> \sigma_\varepsilon^2
> $$
>
> は時刻 $t$ に依存しない。$\sigma_\varepsilon^2>0$ なら $(\varepsilon_t)$ は分散 $\sigma_\varepsilon^2$ の弱ホワイトノイズである。
<!-- formal-statement-end -->

### 証明の見取り図

直交性は射影残差の特徴付けから出ます。分散一定性には前節の時間移動作用素を使い、$\varepsilon_t=U^t\varepsilon_0$ を示します。

<!-- proof-start -->
### 証明

定義から

$$
\varepsilon_t
\perp
\mathcal H_{t-1}.
$$

また $E[Y_t]=0$ で、定数0も予測空間の元なので射影も平均0の線形結合の $L^2$ 極限です。従って

$$
E[\varepsilon_t]=0.
$$

$s<t$ とします。$\varepsilon_s$ は

$$
Y_s-P_{\mathcal H_{s-1}}Y_s
$$

なので $\mathcal H_s$ に属し、

$$
\mathcal H_s\subseteq\mathcal H_{t-1}.
$$

従って

$$
E[\varepsilon_t\varepsilon_s]=0.
$$

次に時間移動作用素 $U$ について

$$
UP_{\mathcal H_{t-1}}
=
P_{\mathcal H_t}U
$$

なので

$$
U\varepsilon_t
=
UY_t-UP_{\mathcal H_{t-1}}Y_t
=
Y_{t+1}-P_{\mathcal H_t}Y_{t+1}
=
\varepsilon_{t+1}.
$$

従って

$$
\varepsilon_t=U^t\varepsilon_0.
$$

$U$ はユニタリなので

$$
\|\varepsilon_t\|_2
=
\|\varepsilon_0\|_2.
$$

よって分散は時刻に依存しません。
<!-- proof-end -->

重要なのは、ここで得たのは**無相関**です。一般の二次定常過程では、イノベーションが独立とは限りません。

---

## 9. 線形決定論的な極端例

イノベーションが「毎時刻に新しく入ってくる直交方向」なら、その反対側は「過去だけで完全に再構成できる」過程です。

<a id="def-tsa1-linearly-deterministic"></a>

<!-- formal-statement-start -->
> **定義（線形決定論的過程）**  
> 二次定常過程 $(X_t)$ の中心化列 $Y_t=X_t-\mu$ が
>
> $$
> Y_t\in\mathcal H_{t-1}
> \qquad(\forall t\in\mathbb Z)
> $$
>
> を満たすとき、線形決定論的であるという。同値に、全ての時刻でイノベーションが0である。
<!-- formal-statement-end -->

### 9.1 直接例：ランダム振幅を持つ正弦波

$0<\omega<\pi$ とし、$A,B\in L^2$ が

$$
E[A]=E[B]=0,
\qquad
E[A^2]=E[B^2]=\tau^2,
\qquad
E[AB]=0
$$

を満たすとします。

$$
X_t
=
A\cos(\omega t)
+
B\sin(\omega t)
$$

と置きます。

<!-- definition-example-start: def-tsa1-linearly-deterministic -->
**定義の確認**  
まず

$$
E[X_t]=0
$$

であり、

$$
E[X_tX_s]
=
\tau^2
\{\cos(\omega t)\cos(\omega s)+\sin(\omega t)\sin(\omega s)\}
=
\tau^2\cos(\omega(t-s)).
$$

従って二次定常です。

さらに三角関数の漸化式から

$$
X_t
=
2\cos\omega\,X_{t-1}
-
X_{t-2}.
$$

右辺は $\mathcal H_{t-1}$ に属するので $X_t\in\mathcal H_{t-1}$。従って最良線形予測誤差は0で、この過程は線形決定論的です。
<!-- definition-example-end -->

この例は「ランダム変数を含むから予測不能」とは限らないことを示します。$A,B$ 自体はランダムでも、一度十分な過去を観測すれば将来は線形漸化式で完全に決まります。

TSA2 では、一般の二次定常過程をこのような決定論的側と、イノベーションが作る純非決定論的側へ分ける Wold 分解を構成します。

---

## 10. 条件付き期待値による最良予測との違い

過去の情報を

$$
\mathcal F_{t-1}
=
\sigma(Y_s:s\le t-1)
$$

とします。[F0-00P3B](../F0_00P3B_L2射影_最良予測/index.md#thm-f0-00p3b-best-predictor) により

$$
E[Y_t\mid\mathcal F_{t-1}]
$$

は $L^2(\mathcal F_{t-1})$ 全体に対する最良予測です。

一方、最良線形予測は

$$
\mathcal H_{t-1}
\subseteq
L^2(\mathcal F_{t-1})
$$

という小さい空間への射影です。従って

$$
E\!\left[
\{Y_t-E[Y_t\mid\mathcal F_{t-1}]\}^2
\right]
\le
E[(Y_t-\widehat Y_t)^2].
$$

一般には条件付き期待値は過去の非線形関数を使えるため、線形予測より良くなり得ます。

同時 Gaussian な時系列では、この二つが一致する重要な場合があります。しかしその一致は「定常だから」ではなく Gaussian 構造に由来します。

---

## 11. この章でできるようになったこと

この章の流れは

$$
\text{二次定常性}
\Rightarrow
\text{正定値な自己共分散}
\Rightarrow
\text{過去の閉線形包}
\Rightarrow
\text{Hilbert 射影}
\Rightarrow
\text{最良線形予測}
\Rightarrow
\text{イノベーション}
$$

です。

次章 TSA2 では、

- 過去空間が一時刻進むときに増えるイノベーション部分空間
- 無限に遠い過去
- 純非決定論性
- Wold 分解
- 無限移動平均表現

を、この章の射影幾何から構成します。

---

# 演習

## TSA1-A01 二次定常だが狭義定常でない列

- Level: A
- 目安時間: 12分

各時刻で独立な $(X_t)$ を、偶数 $t$ では $\pm1$ を各確率 $1/2$、奇数 $t$ では $0$ を確率 $2/3$、$\pm\sqrt3$ を各確率 $1/6$ で取るものとする。

1. $E[X_t]$ と $\operatorname{Var}(X_t)$ を求めよ。
2. 自己共分散関数 $\gamma(h)$ を求め、二次定常性を示せ。
3. 狭義定常でないことを示せ。

<!-- solution-start -->
### 詳細解答

偶数時刻では対称性から

$$
E[X_t]=0,
\qquad
E[X_t^2]=1.
$$

奇数時刻でも

$$
E[X_t]
=
\frac16\sqrt3-\frac16\sqrt3=0,
$$

$$
E[X_t^2]
=
\frac16\cdot3+\frac16\cdot3=1.
$$

従って全時刻で平均0、分散1です。

異時刻では独立なので、$s\ne t$ に対して

$$
E[X_tX_s]
=
E[X_t]E[X_s]
=0.
$$

よって

$$
\gamma(h)
=
\begin{cases}
1,&h=0,\\
0,&h\ne0.
\end{cases}
$$

これは lag $h$ だけの関数なので二次定常です。

一方、偶数時刻では $P(X_t=0)=0$、奇数時刻では $P(X_t=0)=2/3$ です。一時点分布が時間移動で変わるため、狭義定常ではありません。
<!-- solution-end -->

## TSA1-A02 自己共分散行列の半正定値性

- Level: A
- 目安時間: 12分

二次定常過程の中心化列を $(Y_t)$ とする。任意の $a,b\in\mathbb R$ に対して

$$
a^2\gamma(0)+2ab\gamma(1)+b^2\gamma(0)\ge0
$$

を示せ。さらにここから

$$
|\gamma(1)|\le\gamma(0)
$$

を導け。

<!-- solution-start -->
### 詳細解答

確率変数

$$
Z=aY_t+bY_{t-1}
$$

を考えると

$$
0\le E[Z^2].
$$

展開して

$$
E[Z^2]
=
a^2E[Y_t^2]
+
2abE[Y_tY_{t-1}]
+
b^2E[Y_{t-1}^2].
$$

二次定常性より

$$
E[Y_t^2]=E[Y_{t-1}^2]=\gamma(0),
\qquad
E[Y_tY_{t-1}]=\gamma(1),
$$

なので

$$
a^2\gamma(0)+2ab\gamma(1)+b^2\gamma(0)\ge0.
$$

$\gamma(0)=0$ なら $Y_t=0$ in $L^2$ なので $\gamma(1)=0$ です。

$\gamma(0)>0$ とします。$a=1$、$b=-\gamma(1)/\gamma(0)$ を代入すると

$$
0
\le
\gamma(0)
-
\frac{\gamma(1)^2}{\gamma(0)}.
$$

両辺に $\gamma(0)$ を掛けて

$$
\gamma(1)^2\le\gamma(0)^2.
$$

従って

$$
|\gamma(1)|\le\gamma(0).
$$
<!-- solution-end -->

## TSA1-A03 一つ前だけを使う最良線形予測

- Level: A
- 目安時間: 12分

平均0の二次定常過程 $(X_t)$ について $\gamma(0)>0$ とする。

$$
aX_{t-1}
$$

の形で $X_t$ を最小二乗予測するとき、最適な $a$ と最小予測誤差分散を求めよ。

<!-- solution-start -->
### 詳細解答

残差

$$
R_t=X_t-aX_{t-1}
$$

が予測空間 $\operatorname{span}\{X_{t-1}\}$ と直交することが必要十分です。従って

$$
E[R_tX_{t-1}]=0.
$$

すなわち

$$
\gamma(1)-a\gamma(0)=0.
$$

よって

$$
\boxed{
a=\frac{\gamma(1)}{\gamma(0)}
}.
$$

予測誤差分散は

$$
E[R_t^2]
=
\gamma(0)-2a\gamma(1)+a^2\gamma(0).
$$

最適な $a$ を代入して

$$
\boxed{
E[R_t^2]
=
\gamma(0)-\frac{\gamma(1)^2}{\gamma(0)}
}.
$$
<!-- solution-end -->

## TSA1-A04 ホワイトノイズの最良線形予測

- Level: A
- 目安時間: 10分

$(\varepsilon_t)$ を分散 $\sigma^2$ の弱ホワイトノイズとする。

1. $P_{\mathcal H_{t-1}}\varepsilon_t$ を求めよ。
2. イノベーションを求めよ。
3. 一段先最小二乗線形予測誤差を求めよ。

<!-- solution-start -->
### 詳細解答

$s\le t-1$ なら

$$
E[\varepsilon_t\varepsilon_s]=0.
$$

従って $\varepsilon_t$ は過去変数の有限線形結合全てと直交し、連続性によりその閉包 $\mathcal H_{t-1}$ 全体と直交します。

従って

$$
P_{\mathcal H_{t-1}}\varepsilon_t=0.
$$

イノベーションは

$$
\varepsilon_t-0=\varepsilon_t
$$

です。

予測誤差の二乗平均は

$$
E[\varepsilon_t^2]=\sigma^2.
$$

よって

$$
\boxed{\text{最良線形予測}=0,\qquad \text{誤差分散}=\sigma^2}.
$$
<!-- solution-end -->

## TSA1-B01 二時点過去の正規方程式

- Level: B
- 目安時間: 18分

平均0の二次定常過程で

$$
\gamma(0)=2,
\qquad
\gamma(1)=1,
\qquad
\gamma(2)=\frac12
$$

とする。

$$
\widehat X_t
=
a_1X_{t-1}+a_2X_{t-2}
$$

の形の最良線形予測を求め、予測誤差分散も求めよ。

<!-- solution-start -->
### 詳細解答

正規方程式は

$$
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}
\begin{pmatrix}
a_1\\
a_2
\end{pmatrix}
=
\begin{pmatrix}
1\\
1/2
\end{pmatrix}.
$$

従って

$$
2a_1+a_2=1,
\qquad
a_1+2a_2=\frac12.
$$

第1式から $a_2=1-2a_1$。第2式へ代入して

$$
a_1+2(1-2a_1)=\frac12,
$$

$$
-3a_1=-\frac32.
$$

よって

$$
a_1=\frac12,
\qquad
a_2=0.
$$

したがって

$$
\boxed{
\widehat X_t=\frac12X_{t-1}
}.
$$

射影誤差分散は

$$
\operatorname{Var}(X_t)-a^\mathsf T\gamma_2
$$

であり、

$$
2-
\begin{pmatrix}
1/2&0
\end{pmatrix}
\begin{pmatrix}
1\\
1/2
\end{pmatrix}
=
\frac32.
$$

従って

$$
\boxed{
E[(X_t-\widehat X_t)^2]=\frac32
}.
$$
<!-- solution-end -->

## TSA1-B02 有限過去予測は無限過去予測へ収束する

- Level: B
- 目安時間: 22分

$$
M_p
=
\operatorname{span}\{Y_{t-1},\dots,Y_{t-p}\},
\qquad
M
=
\overline{\bigcup_{p\ge1}M_p}
$$

とする。$x\in L^2$ に対して

$$
P_{M_p}x\to P_Mx
\qquad\text{in }L^2
$$

を証明せよ。

<!-- solution-start -->
### 詳細解答

$y=P_Mx$ と置きます。射影の特徴付けから

$$
x-y\perp M.
$$

特に全ての $p$ で

$$
x-y\perp M_p.
$$

従って

$$
P_{M_p}x=P_{M_p}y.
$$

一方、$M$ は $\bigcup_pM_p$ の閉包なので、$y\in M$ に対して

$$
z_n\in\bigcup_pM_p,
\qquad
\|z_n-y\|_2\to0
$$

となる列を取れます。

各 $z_n$ はある $M_{p_n}$ に属します。$M_p$ は増加列なので、添字を取り直して $z_p\in M_p$ かつ

$$
\|z_p-y\|_2\to0
$$

としてよいです。

$P_{M_p}y$ は $M_p$ 内の最良近似なので

$$
\|y-P_{M_p}y\|_2
\le
\|y-z_p\|_2
\to0.
$$

従って

$$
P_{M_p}x
=
P_{M_p}y
\to
y
=
P_Mx.
$$
<!-- solution-end -->

## TSA1-B03 ランダム正弦波は完全に線形予測できる

- Level: B
- 目安時間: 20分

$0<\omega<\pi$ とし、

$$
X_t=A\cos(\omega t)+B\sin(\omega t)
$$

とする。ただし

$$
E[A]=E[B]=0,
\quad
E[A^2]=E[B^2]=\tau^2,
\quad
E[AB]=0.
$$

1. $(X_t)$ が二次定常であることを示せ。
2. 自己共分散関数を求めよ。
3.
$$
X_t=2\cos\omega\,X_{t-1}-X_{t-2}
$$
を示せ。
4. イノベーションが0であることを示せ。

<!-- solution-start -->
### 詳細解答

平均は

$$
E[X_t]
=
E[A]\cos(\omega t)+E[B]\sin(\omega t)
=0.
$$

共分散は平均0なので $E[X_tX_s]$ です。展開すると交差項は $E[AB]=0$ により消え、

$$
E[X_tX_s]
=
\tau^2\cos(\omega t)\cos(\omega s)
+
\tau^2\sin(\omega t)\sin(\omega s).
$$

加法定理から

$$
E[X_tX_s]
=
\tau^2\cos(\omega(t-s)).
$$

従って

$$
\boxed{
\gamma(h)=\tau^2\cos(\omega h)
}
$$

で、$(X_t)$ は二次定常です。

次に

$$
2\cos\omega\cos(\omega(t-1))
=
\cos(\omega t)+\cos(\omega(t-2)),
$$

$$
2\cos\omega\sin(\omega(t-1))
=
\sin(\omega t)+\sin(\omega(t-2)).
$$

両式へそれぞれ $A,B$ を掛けて足すと

$$
2\cos\omega\,X_{t-1}
=
X_t+X_{t-2}.
$$

従って

$$
X_t
=
2\cos\omega\,X_{t-1}-X_{t-2}.
$$

右辺は $\mathcal H_{t-1}$ に属するので

$$
X_t\in\mathcal H_{t-1}.
$$

よって

$$
P_{\mathcal H_{t-1}}X_t=X_t
$$

であり、イノベーションは

$$
\boxed{\varepsilon_t=0}.
$$
<!-- solution-end -->

## TSA1-C01 MA(1) の有限過去予測と無限過去予測

- Level: C
- 目安時間: 35分

$(Z_t)$ を分散 $\sigma^2$ の弱ホワイトノイズとし、

$$
X_t=Z_t+\theta Z_{t-1},
\qquad
|\theta|<1
$$

とする。さらに $Z_t$ は $\{Z_s:s<t\}$ の閉線形包と直交するとする。

1. $(X_t)$ の自己共分散関数を求めよ。
2. $X_{t-1}$ だけを使う最良線形予測を求めよ。
3.
$$
Z_{t-1}
=
L^2\text{-}\sum_{j=0}^\infty(-\theta)^jX_{t-1-j}
$$
を示し、$Z_{t-1}\in\mathcal H_{t-1}$ を証明せよ。
4. 無限過去に基づく最良線形予測が
$$
\widehat X_t=\theta Z_{t-1}
$$
で、イノベーションが $Z_t$ であることを示せ。
5. 一時点過去だけを使う予測誤差分散と無限過去予測の誤差分散を比較せよ。

<!-- solution-start -->
### 詳細解答

まず平均は0です。

自己共分散について、

$$
\gamma(0)
=
E[(Z_t+\theta Z_{t-1})^2]
=
(1+\theta^2)\sigma^2
$$

です。交差項は異時点ホワイトノイズの無相関性で0です。

lag 1 では

$$
\gamma(1)
=
E[X_tX_{t-1}]
$$

$$
=
E[(Z_t+\theta Z_{t-1})(Z_{t-1}+\theta Z_{t-2})]
=
\theta\sigma^2.
$$

$|h|\ge2$ では共通する $Z$ の時刻がなく、全て異時点の積になるので

$$
\gamma(h)=0.
$$

従って

$$
\boxed{
\gamma(0)=(1+\theta^2)\sigma^2,\quad
\gamma(\pm1)=\theta\sigma^2,\quad
\gamma(h)=0\ (|h|\ge2)
}.
$$

一つ前だけを使う予測係数は

$$
a
=
\frac{\gamma(1)}{\gamma(0)}
=
\frac{\theta}{1+\theta^2}.
$$

従って

$$
\boxed{
\widehat X_t^{(1)}
=
\frac{\theta}{1+\theta^2}X_{t-1}
}.
$$

次に

$$
X_{t-1}=Z_{t-1}+\theta Z_{t-2}
$$

から

$$
Z_{t-1}
=
X_{t-1}-\theta Z_{t-2}.
$$

これを反復すると任意の $N\ge1$ に対して

$$
Z_{t-1}
=
\sum_{j=0}^{N-1}(-\theta)^jX_{t-1-j}
+
(-\theta)^NZ_{t-1-N}.
$$

余りの $L^2$ ノルムは

$$
\|(-\theta)^NZ_{t-1-N}\|_2
=
|\theta|^N\sigma
\to0
$$

です。従って

$$
Z_{t-1}
=
L^2\text{-}\sum_{j=0}^\infty(-\theta)^jX_{t-1-j}.
$$

各有限部分和は $\mathcal H_{t-1}$ に属し、$\mathcal H_{t-1}$ は閉なので

$$
Z_{t-1}\in\mathcal H_{t-1}.
$$

さて

$$
X_t=\theta Z_{t-1}+Z_t.
$$

第1項は $\mathcal H_{t-1}$ に属します。一方、仮定より $Z_t$ は全ての過去 $Z_s$ と直交し、各 $X_s$ $(s\le t-1)$ は過去 $Z$ の線形結合なので

$$
Z_t\perp\mathcal H_{t-1}.
$$

従って直交分解の一意性から

$$
\boxed{
P_{\mathcal H_{t-1}}X_t
=
\theta Z_{t-1}
}
$$

であり、

$$
\boxed{
\varepsilon_t=Z_t
}.
$$

無限過去予測の誤差分散は

$$
\boxed{\sigma^2}.
$$

一方、一時点過去だけを使う誤差分散は A03 の公式から

$$
\gamma(0)-\frac{\gamma(1)^2}{\gamma(0)}
$$

$$
=
(1+\theta^2)\sigma^2
-
\frac{\theta^2\sigma^4}{(1+\theta^2)\sigma^2}
$$

$$
=
\sigma^2
\frac{1+\theta^2+\theta^4}{1+\theta^2}.
$$

従って $\theta\ne0$ なら

$$
\sigma^2
\frac{1+\theta^2+\theta^4}{1+\theta^2}
-
\sigma^2
=
\sigma^2\frac{\theta^4}{1+\theta^2}
>0.
$$

つまり有限過去を一時点に切り詰めると、無限過去から復元できる $Z_{t-1}$ の情報を失うため、予測誤差が厳密に大きくなります。
<!-- solution-end -->

---

## 次に進む

次章 TSA2 では、この章のイノベーションを一時刻ごとの直交部分空間として整理し、remote past と純非決定論性を導入して Wold 分解を証明します。
