# AG2-09 射影空間の標準束とEuler列

[前章で構成した曲線の標準束](../AG2-08/index.md#def-ag2-08-canonical-sheaf)は、局所的に一つの微分 $dt$ を基底としていました。射影空間 $\mathbb P^n$ では、一つのチャートに $n$ 個の座標があります。各チャートで $n$ 個の微分を作るだけなら簡単ですが、**斉次座標の $n+1$ 個の成分から、なぜ余分な一方向が消えるのか**、さらにチャートを変えたとき $n$ 個の微分の行列式がどう変わるかを一度に知りたいのです。

その答えが **Euler列** です。斉次座標に由来する $n+1$ 本の局所成分から「同時に拡大する一方向」を取り除くと、射影空間の余接方向が残ります。最後にその行列式を取ると、曲線で既習の標準束が高次元でも計算できます。

以下 $k=\mathbb C$、$n\ge1$、$P=\mathbb P^n_k$、斉次座標を $[X_0:\cdots:X_n]$ とします。$U_i=\{X_i\ne0\}$、その上の座標を $z_j^{(i)}=X_j/X_i$（$j\ne i$）、便宜上 $z_i^{(i)}=1$ とします。$\mathcal O_P(d)$ の局所基底の変換は[射影空間のO(d)の定義](../AG2-06/index.md#def-ag2-06-twisting-sheaf)に従います。

## 1. $n$ 個の座標微分はどこから来るか

[標準アフィンチャートの全単射](../AG2-01/index.md#prop-ag2-01-chart-bijection)から $U_i\simeq\mathbb A^n$ の座標環は $k[z_j^{(i)}:j\ne i]$ です。[Kähler微分加群](../AG2-08/index.md#def-ag2-08-kahler)の積の規則を各変数へ適用すると、多項式 $f$ の微分は

$$
df=\sum_{j\ne i}\frac{\partial f}{\partial z_j^{(i)}}\,dz_j^{(i)}.
$$

自由性も[多項式環の微分表示](../AG2-08/index.md#prop-ag2-08-polynomial-differentials)と同じ方法で確認できます。各 $j\ne i$ の形式的偏微分 $D_j=\partial/\partial z_j^{(i)}$ は積の規則を満たし、$D_j(z_\ell^{(i)})=\delta_{j\ell}$ です。微分加群の関係式に $D_j$ から誘導される係数写像を適用すると、

$$
\sum_{\ell\ne i}a_\ell dz_\ell^{(i)}=0
\quad\Longrightarrow\quad
0=\sum_{\ell\ne i}a_\ell D_j(z_\ell^{(i)})=a_j
\qquad(j\ne i).
$$

全係数が零となるので、この微分族は一次独立です。上の $df$ の表示と合わせて、$U_i$ 上で微分の層は階数 $n$ の自由加群です。

しかし $U_i\cap U_k$ 上では $z_j^{(k)}=z_j^{(i)}/z_k^{(i)}$ なので、分数の微分が生じます。異なるチャートの基底を単純に同一視することはできません。

<a id="def-ag2-09-cotangent-sheaf"></a>

<!-- formal-statement-start -->
> **定義（射影空間の余接層と標準束）**  
> $P=\mathbb P^n_{\mathbb C}$、$n\ge1$ とする。標準アフィンチャートのKähler微分加群を、重なりでの分数微分に従って貼り合わせた層を $\Omega^1_P$（余接層）とする。その第 $n$ 外冪を

$$
\omega_P=\bigwedge\nolimits^n\Omega^1_P
$$

> と書き、$P$ の標準束とする。ここで階数 $n$ の自由加群の第 $n$ 外冪は、基底 $v_1,\ldots,v_n$ に対して $v_1\wedge\cdots\wedge v_n$ を基底とする階数1の加群であり、基底変換行列 $A$ に対して $\det(A)$ 倍で変換する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-09-cotangent-sheaf -->
**定義の確認**：$P=\mathbb P^2$ の $U_0$ では $x=X_1/X_0$、$y=X_2/X_0$ を取り、$\Omega^1_P|_{U_0}$ の基底は $dx,dy$、$\omega_P|_{U_0}$ の基底は $dx\wedge dy$ です。$U_1$ での座標 $u=X_0/X_1=1/x$、$v=X_2/X_1=y/x$ に対し

$$
du=-x^{-2}dx,\qquad
dv=x^{-1}dy-yx^{-2}dx
$$

です。従って

$$
du\wedge dv=-x^{-3}dx\wedge dy.
$$

変換係数が零でないのは重なり $x\ne0$ に限ります。この計算が後の $\omega_{\mathbb P^2}\simeq\mathcal O(-3)$ を予告します。
<!-- definition-example-end -->

## 2. 斉次座標から一本の写像を作る

$\mathcal O_P(-1)$ は、チャート $U_i$ 上で局所基底 $e_i$ を持ち、重なりでは $e_k=(X_k/X_i)^{-1}e_i$ と変わります。$n+1$ 個のコピーを並べ

$$
E=\mathcal O_P(-1)^{\oplus(n+1)}
$$

と置きます。$U_i$ 上で第 $j$ 成分の基底を $b_j^{(i)}$ と書けば、$b_j^{(k)}=(z_k^{(i)})^{-1}b_j^{(i)}$ です。この $n+1$ 成分から一つの関数を取り出す写像は、$U_i$ で

$$
\varepsilon_i\left(\sum_{j=0}^n a_jb_j^{(i)}\right)
=\sum_{j=0}^n z_j^{(i)}a_j
$$

と定められます。第 $j$ 成分を $X_j$ 倍する、という斉次な操作です。例えば $U_0$ の $\mathbb P^2$ なら $(a_0,a_1,a_2)\mapsto a_0+xa_1+ya_2$ となります。

<a id="def-ag2-09-euler-map"></a>

<!-- formal-statement-start -->
> **定義（Euler写像）**  
> $P=\mathbb P^n_{\mathbb C}$、$E=\mathcal O_P(-1)^{\oplus(n+1)}$ とする。各 $U_i$ の局所基底 $b_j^{(i)}$ を用い

$$
\varepsilon:E\longrightarrow\mathcal O_P,\qquad
\varepsilon|_{U_i}\left(\sum_{j=0}^n a_jb_j^{(i)}\right)
=\sum_{j=0}^n\frac{X_j}{X_i}a_j
$$

> で与える層の射をEuler写像という。係数 $X_j/X_i$ はチャート上の正則関数である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-09-euler-map -->
**定義の確認**：$U_0\subset\mathbb P^1$ で $x=X_1/X_0$ なら $\varepsilon(a_0b_0+a_1b_1)=a_0+xa_1$ です。$\varepsilon(b_0)=1$、$\varepsilon(b_1-xb_0)=0$ であり、核は局所的に一本の基底を持ちます。
<!-- definition-example-end -->

<a id="prop-ag2-09-euler-surjective"></a>

<!-- formal-statement-start -->
> **命題（Euler写像の貼り合わせと全射性）**  
> $n\ge1$ の射影空間 $P$ で、上の $\varepsilon_i$ は一つの層準同型 $\varepsilon:E\to\mathcal O_P$ に貼り合わさり、各点の近傍で右逆を持つ全射である。$U_i$ 上の核は次の $n$ 個の元を基底とする。

$$
q_j^{(i)}=b_j^{(i)}-z_j^{(i)}b_i^{(i)}
\qquad(j\ne i).
$$
<!-- formal-statement-end -->

### 証明の見取り図

重なりでは $b_j^{(k)}=z_k^{-1}b_j^{(i)}$ ですが、写像に掛ける係数も $z_j^{(k)}=z_j/z_k$ になります。両者が一致することを先に確かめます。全射性は $z_i=1$ から、核の自由性は $i$ 番目以外の成分を読んで確かめます。

<!-- proof-start -->
### 証明

重なり $U_i\cap U_k$ で $z_j=z_j^{(i)}$ と略記します。[O(-1)の遷移規則](../AG2-06/index.md#def-ag2-06-twisting-sheaf)から $b_j^{(k)}=z_k^{-1}b_j^{(i)}$ です。よって第 $j$ 成分に対して

$$
\varepsilon_i(b_j^{(k)})
=z_k^{-1}z_j
=z_j^{(k)}
=\varepsilon_k(b_j^{(k)}).
$$

任意の局所切断はこの基底の線形結合なので、写像は貼り合わさります。各 $U_i$ では $\varepsilon_i(b_i^{(i)})=z_i^{(i)}=1$ です。従って $f\mapsto fb_i^{(i)}$ が右逆で、全射です。

$\varepsilon_i(q_j^{(i)})=z_j-z_j\cdot1=0$ です。一方、局所切断 $v=\sum_j a_jb_j^{(i)}$ が核にあれば

$$
0=\varepsilon_i(v)=a_i+\sum_{j\ne i}z_ja_j,
\qquad a_i=-\sum_{j\ne i}z_ja_j.
$$

これを $v$ に代入すると

$$
v=\sum_{j\ne i}a_jb_j^{(i)}
-\sum_{j\ne i}z_ja_jb_i^{(i)}
=\sum_{j\ne i}a_jq_j^{(i)}.
$$

$q_j^{(i)}$ の $j$ 成分は $1$、他の $j'\ne i,j$ 成分は $0$ ですから、$\sum_{j\ne i}a_jq_j^{(i)}=0$ なら全 $a_j=0$ です。よって核は自由階数 $n$ で、提示した族が基底です。
<!-- proof-end -->

「$n+1$ 成分から一つの関係を引くと $n$ 次元」という数え上げだけでなく、**核のすべての元を表せることと、その表示の一意性**まで確認できました。

## 3. Euler列の核が余接層であることを証明する

ここがこの章の核心です。各 $U_i$ では $dz_j^{(i)}$ と $q_j^{(i)}$ がともに $n$ 本ありますが、それだけでは層の同型とは言えません。**重なりでの変換が一致すること**を検証します。

<a id="thm-ag2-09-euler-sequence"></a>

<!-- formal-statement-start -->
> **定理（射影空間の余接Euler列）**  
> $k=\mathbb C$、$n\ge1$、$P=\mathbb P^n_k$ とする。自然な短完全列

$$
0\longrightarrow\Omega^1_P
\xrightarrow{\;\iota\;}
\mathcal O_P(-1)^{\oplus(n+1)}
\xrightarrow{\;\varepsilon\;}
\mathcal O_P\longrightarrow0
$$

> が存在する。$U_i$ では、$\iota$ は各 $j\ne i$ に対し

$$
\iota(dz_j^{(i)})=b_j^{(i)}-z_j^{(i)}b_i^{(i)}
$$

> で与えられ、$\varepsilon$ は前節のEuler写像である。列は各チャート上で分裂するが、ここでは大域分裂は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

[微分と局所化](../AG2-08/index.md#lem-ag2-08-localization)を使い、座標の変換 $z_j^{(k)}=z_j/z_k$ を微分します。他方で $q_j^{(k)}$ を $U_i$ の $q$ で表します。両方の係数行列が一致するので、局所の対応が大域の同型になります。最後に[核の基底と右逆](#prop-ag2-09-euler-surjective)を用います。

<!-- proof-start -->
### 証明

$U_i$ で $z_j=z_j^{(i)}$ とします。[多項式環の微分表示](../AG2-08/index.md#prop-ag2-08-polynomial-differentials)を各変数に適用した自由基底 $dz_j$ は、局所化すると[分数の微分公式](../AG2-08/index.md#lem-ag2-08-localization)に従います。$U_i\cap U_k$ 上で $k\ne i$ とすると

$$
z_j^{(k)}=\frac{z_j}{z_k},\qquad
d z_j^{(k)}
=\frac{1}{z_k}dz_j-\frac{z_j}{z_k^2}dz_k.
$$

ここで $j=i$ の場合は $z_i=1$、従って $dz_i=0$ と読めば同じ式が成立します。さらに $b_j^{(k)}=z_k^{-1}b_j^{(i)}$ なので、$q_j^{(k)}$ を書き直すと

$$
q_j^{(k)}
=b_j^{(k)}-z_j^{(k)}b_k^{(k)}
=\frac{1}{z_k}b_j^{(i)}
-\frac{z_j}{z_k^2}b_k^{(i)}.
$$

$q_j^{(i)}=b_j^{(i)}-z_jb_i^{(i)}$、$q_k^{(i)}=b_k^{(i)}-z_kb_i^{(i)}$ を代入して整理すると

$$
\frac{1}{z_k}q_j^{(i)}-\frac{z_j}{z_k^2}q_k^{(i)}
=\frac{1}{z_k}b_j^{(i)}-\frac{z_j}{z_k^2}b_k^{(i)},
$$

なぜなら $b_i^{(i)}$ の係数 $-z_j/z_k+z_j/z_k=0$ だからです。$j=i$ のときは $q_i^{(i)}:=0$ と置けば同じ等式が成立します。この表示は先ほどの $dz_j^{(k)}$ の表示と係数が一致します。

従って $dz_j^{(i)}\mapsto q_j^{(i)}$ はチャートを変えても整合し、層の射 $\iota:\Omega^1_P\to E$ を定めます。[前節の核計算](#prop-ag2-09-euler-surjective)より、各 $U_i$ で $\iota$ は $\Omega^1_P|_{U_i}$ と $\ker\varepsilon|_{U_i}$ の自由基底を一対一に対応させ、同型です。$\varepsilon$ は局所的な右逆を持つので全射であり、列の各位置で核と像が一致します。これで短完全性が証明されました。
<!-- proof-end -->

**$\mathbb P^1$ で再確認**：$U_0$ の $x=X_1/X_0$ に対する核の基底は $q_1^{(0)}=b_1^{(0)}-xb_0^{(0)}$。$U_1$ の $y=1/x$ に対する基底は $q_0^{(1)}$ であり、上の計算では

$$
q_0^{(1)}=-x^{-2}q_1^{(0)}.
$$

これは前章の $dy=-x^{-2}dx$ とまったく同じ変換です。Euler列は既知の $\mathbb P^1$ の標準束を含んでいます。

## 4. 行列式から標準束を求める

局所的に分裂する短完全列 $0\to F\to E\to L\to0$ で、$F$ の階数が $r$、$L$ が階数1なら、$F$ の局所基底 $f_1,\ldots,f_r$ と $L$ の基底の持ち上げ $v$ を並べて $E$ の基底を作れます。$v$ を別の持ち上げに変えると $v$ は $F$ の元だけ変わり、外積 $f_1\wedge\cdots\wedge f_r\wedge v$ は変わりません。従って基底の遷移を比較して

$$
\bigwedge\nolimits^{r+1}E
\simeq\left(\bigwedge\nolimits^rF\right)\otimes L
$$

が得られます。ここではこの局所基底の計算をEuler列に直接適用します。

<a id="prop-ag2-09-determinant-exact"></a>

<!-- formal-statement-start -->
> **命題（局所分裂短完全列の行列式）**  
> 同じ空間上で局所自由層の短完全列 $0\to F\to E\to L\to0$ が局所分裂し、$\operatorname{rank}F=r$、$\operatorname{rank}L=1$ とする。このとき可逆層として

$$
\det E\simeq(\det F)\otimes L,\qquad
\det F:=\bigwedge\nolimits^rF
$$

> が自然に成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

核の基底と商の持ち上げを並べます。持ち上げを変えても外積が不変であること、および基底を変えると行列式倍になることを確認します。

<!-- proof-start -->
### 証明

局所開集合で $F$ の基底を $f_1,\ldots,f_r$、$L$ の基底を $\ell$ とし、$\ell$ の $E$ への持ち上げ $v$ を選びます。$E$ の切断 $e$ の商における像は $a\ell$ と一意に書けるため、$e-av\in F$ です。従って $f_1,\ldots,f_r,v$ は $E$ の生成族です。$f_1,\ldots,f_r,v$ に係数関係があれば商へ写して $v$ の係数が $0$、さらに $F$ の自由性で他の係数も $0$ となるので基底です。

持ち上げを $v'=v+\sum c_jf_j$ に替えても、外積の交代性から

$$
f_1\wedge\cdots\wedge f_r\wedge v'
=f_1\wedge\cdots\wedge f_r\wedge v
$$

です。$F$ の基底を行列 $A$ で替え、$L$ の基底を $b\ell$ に替えると、$E$ の対応する基底の外積は $\det(A)b$ 倍になります。従って写像

$$
(f_1\wedge\cdots\wedge f_r)\otimes\ell
\longmapsto f_1\wedge\cdots\wedge f_r\wedge v
$$

は基底・持ち上げの選択と整合し、局所的な同型が貼り合わさります。
<!-- proof-end -->

<a id="thm-ag2-09-canonical-projective"></a>

<!-- formal-statement-start -->
> **定理（射影空間の標準束）**  
> $k=\mathbb C$、$n\ge1$、$P=\mathbb P^n_k$ とする。標準束は

$$
\boxed{\omega_P=\bigwedge\nolimits^n\Omega^1_P
\simeq\mathcal O_P(-n-1)}
$$

> である。一次斉次式 $X_0$ が定める因子 $H=V(X_0)\subset P$ に対して $\mathcal O_P(H)\simeq\mathcal O_P(1)$ と見なすと、標準因子類は $K_P\sim-(n+1)H$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[Euler列](#thm-ag2-09-euler-sequence)へ[行列式命題](#prop-ag2-09-determinant-exact)を適用します。$\det(\mathcal O(-1)^{\oplus(n+1)})$ は同じ遷移関数の $(n+1)$ 乗なので $\mathcal O(-n-1)$、商の $\mathcal O$ は自明です。定理名だけで終わらせず、局所基底の行列式まで照合します。

<!-- proof-start -->
### 証明

$U_i$ 上のEuler写像は $b_i^{(i)}\mapsto1$ なので、[核の自由基底](#prop-ag2-09-euler-surjective) $q_j^{(i)}$（$j\ne i$）に $b_i^{(i)}$ を加えた $n+1$ 本は $E|_{U_i}$ の基底です。局所分裂を使えるため、[行列式命題](#prop-ag2-09-determinant-exact)から

$$
\det E\simeq(\det\Omega^1_P)\otimes\det\mathcal O_P
\simeq\omega_P.
$$

一方 $E$ の標準基底は $b_0^{(i)},\ldots,b_n^{(i)}$ です。$U_i\cap U_k$ では各基底が $z_k^{-1}$ 倍になるため、外積の変換は

$$
b_0^{(k)}\wedge\cdots\wedge b_n^{(k)}
=z_k^{-(n+1)}
b_0^{(i)}\wedge\cdots\wedge b_n^{(i)}.
$$

これは[O(d)の遷移規則](../AG2-06/index.md#def-ag2-06-twisting-sheaf)で $d=-(n+1)$ と置いたものです。従って $\det E\simeq\mathcal O_P(-n-1)$ であり、二つの同型を合成して所望の式を得ます。

最後に $H=\{X_0=0\}$ は一次斉次式の零点集合であり、各チャートで一つの正則関数によって定まる因子です。$X_0$ は[O(1)の斉次式切断](../AG2-06/index.md#prop-ag2-06-homogeneous-sections)で、零因子が $H$ です。[因子の付随可逆層](../AG2-07/index.md#def-ag2-07-associated-line-bundle)の局所表示から $\mathcal O_P(H)\simeq\mathcal O_P(1)$ が従い、[ねじれ層のテンソル積](../AG2-06/index.md#prop-ag2-06-tensor-dual)で次数を加えれば $\omega_P\simeq\mathcal O_P(-(n+1)H)$ です。
<!-- proof-end -->

**低次元での確認**：$n=1$ なら $\omega_{\mathbb P^1}\simeq\mathcal O(-2)$ で、[前章の直接計算](../AG2-08/index.md#thm-ag2-08-p1-canonical)と一致します。$n=2$ なら $\omega_{\mathbb P^2}\simeq\mathcal O(-3)$ であり、第1節の $du\wedge dv=-x^{-3}dx\wedge dy$ の係数と一致します。$n=3$ なら $\mathcal O(-4)$ です。いずれも次数 $-(n+1)$ が現れるのは、元の $E$ が **$n+1$ 本の $\mathcal O(-1)$** からできているためです。

## 5. 接Euler列と大域的な切断

余接層の局所自由基底 $dz_j$ に対する双対基底を $\partial/\partial z_j$ と書き、$T_P=(\Omega^1_P)^\vee$ とします。短完全列は各 $U_i$ 上で分裂しているので、局所自由層を双対にすると矢印の向きを逆にした短完全列が得られます。

<a id="def-ag2-09-tangent-sheaf"></a>

<!-- formal-statement-start -->
> **定義（接層）**  
> $P=\mathbb P^n_{\mathbb C}$ の接層を $T_P=(\Omega^1_P)^\vee$ と定義する。$U_i$ 上では $dz_j^{(i)}$ の双対 $\partial/\partial z_j^{(i)}$（$j\ne i$）を自由基底とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-09-tangent-sheaf -->
**定義の確認**：$U_0\subset\mathbb P^2$ で $x=X_1/X_0,y=X_2/X_0$ とすると、$\partial_x(dx)=1$、$\partial_x(dy)=0$、$\partial_y(dx)=0$、$\partial_y(dy)=1$ です。従って $a\partial_x+b\partial_y$ は $dx,dy$ に対してそれぞれ $a,b$ を返す $\mathcal O$-線形写像です。
<!-- definition-example-end -->

<a id="thm-ag2-09-tangent-euler"></a>

<!-- formal-statement-start -->
> **定理（射影空間の接Euler列）**  
> $P=\mathbb P^n_{\mathbb C}$、$n\ge1$ の接層は、自然な短完全列

$$
0\longrightarrow\mathcal O_P
\xrightarrow{\;(X_0,\ldots,X_n)\;}
\mathcal O_P(1)^{\oplus(n+1)}
\longrightarrow T_P\longrightarrow0
$$

> によって記述できる。最初の射は $U_i$ 上で $1\mapsto(z_0^{(i)},\ldots,z_n^{(i)})$ と表される。
<!-- formal-statement-end -->

### 証明の見取り図

余接Euler列の各チャート上の右逆を使って双対を取ります。各チャートでは分裂した自由加群の列ですから、双対後も核と像が一致します。

<!-- proof-start -->
### 証明

[余接Euler列](#thm-ag2-09-euler-sequence)を $U_i$ に制限すると

$$
0\to\Omega^1_P|_{U_i}\to E|_{U_i}
\xrightarrow{\varepsilon_i}\mathcal O_{U_i}\to0
$$

であり、$1\mapsto b_i^{(i)}$ が $\varepsilon_i$ の右逆でした。従って $E|_{U_i}\simeq\Omega^1_P|_{U_i}\oplus\mathcal O_{U_i}$ です。自由加群の双対を取ると

$$
E^\vee|_{U_i}\simeq
(\Omega^1_P)^\vee|_{U_i}\oplus\mathcal O_{U_i}
$$

となり、双対列 $0\to\mathcal O_{U_i}\to E^\vee|_{U_i}\to T_P|_{U_i}\to0$ は完全です。$\mathcal O(-1)^\vee\simeq\mathcal O(1)$ は[直線束の双対](../AG2-06/index.md#prop-ag2-06-tensor-dual)によります。

$E$ の局所基底 $b_j^{(i)}$ とその双対 $c_j^{(i)}$ に対し、$\varepsilon_i(b_j^{(i)})=z_j^{(i)}$ です。従って双対写像 $\varepsilon_i^\vee$ は

$$
\varepsilon_i^\vee(1)=\sum_{j=0}^n z_j^{(i)}c_j^{(i)}.
$$

これは $X_j$ を $\mathcal O(1)$ の局所基底で表した係数であり、全チャートに貼り合わさります。よって主張した接Euler列が得られます。
<!-- proof-end -->

<a id="cor-ag2-09-no-global-forms"></a>

<!-- formal-statement-start -->
> **系（射影空間の大域正則1形式と標準形式）**  
> $n\ge1$ の $\mathbb P^n_{\mathbb C}$ について

$$
H^0(P,\Omega^1_P)=0,\qquad H^0(P,\omega_P)=0
$$

> である。ここで $H^0(P,F)$ は層 $F$ の大域切断の集合を表す。
<!-- formal-statement-end -->

### 証明の見取り図

余接Euler列の単射から大域的な1形式を $\mathcal O(-1)$ の大域切断の組へ写します。標準束は負次数の $\mathcal O(d)$ と同型です。

<!-- proof-start -->
### 証明

[余接Euler列](#thm-ag2-09-euler-sequence)の単射 $\iota$ は、各開集合上で単射です。従って大域切断でも、$\iota(s)=0$ なら各チャートで $s=0$、ゆえに $s=0$ であり、単射

$$
H^0(P,\Omega^1_P)\hookrightarrow
H^0(P,\mathcal O_P(-1))^{\oplus(n+1)}
$$

が得られます。[射影空間のO(d)の大域切断](../AG2-06/index.md#thm-ag2-06-pn-sections)より $H^0(P,\mathcal O_P(d))=0$（$d<0$）です。右辺は零なので $H^0(P,\Omega^1_P)=0$。また[標準束定理](#thm-ag2-09-canonical-projective)で $\omega_P\simeq\mathcal O_P(-n-1)$、$-n-1<0$ なので同じ大域切断定理から $H^0(P,\omega_P)=0$ です。
<!-- proof-end -->

ここで層の高次コホモロジーは使っていません。使ったのは **大域切断が単射を保つこと**と、既習の $\mathcal O(d)$ の大域切断計算だけです。

## 6. 演習：局所成分、Euler列、行列式を往復する

特記しない限り基礎体は $\mathbb C$。チャート上の $b_j^{(i)}$ は $\mathcal O(-1)^{\oplus(n+1)}$ の第 $j$ 成分の基底です。解答では、分数の微分と核の表示を必ず書いてください。

**Level A：局所表示の確立**

### A1. $\mathbb P^1$ の核を解く

$\mathbb P^1$ の $U_0$ における写像 $\varepsilon(a_0b_0+a_1b_1)=a_0+xa_1$ の核を求め、$U_1$ での核の基底と変換係数を求めよ。

- Level: A
- ID: AG2-09-A1

<!-- solution-start -->
**詳細解答。** 核では $a_0=-xa_1$ なので $a_0b_0+a_1b_1=a_1(b_1-xb_0)$ です。よって $q_1^{(0)}=b_1^{(0)}-xb_0^{(0)}$ が基底です。$U_1$ の座標は $y=1/x$、基底は $b_j^{(1)}=x^{-1}b_j^{(0)}$ です。従って

$$
q_0^{(1)}=b_0^{(1)}-yb_1^{(1)}
=x^{-1}b_0^{(0)}-x^{-2}b_1^{(0)}
=-x^{-2}q_1^{(0)}.
$$

この変換は $dy=-x^{-2}dx$ に等しく、核が余接層の局所基底と対応することを示します。
<!-- solution-end -->

### A2. $\mathbb P^2$ の余接基底

$U_0\subset\mathbb P^2$ で $x=X_1/X_0,y=X_2/X_0$ とする。Euler写像の局所式とその核の基底を求め、$\iota(dx),\iota(dy)$ を記せ。

- Level: A
- ID: AG2-09-A2

<!-- solution-start -->
**詳細解答。** $z_0=1,z_1=x,z_2=y$ なので

$$
\varepsilon(a_0b_0+a_1b_1+a_2b_2)=a_0+xa_1+ya_2.
$$

核では $a_0=-xa_1-ya_2$ です。これを代入すると

$$
a_0b_0+a_1b_1+a_2b_2
=a_1(b_1-xb_0)+a_2(b_2-yb_0).
$$

第1・第2成分から係数が一意に読めるので、$q_1=b_1-xb_0$、$q_2=b_2-yb_0$ は自由基底です。[Euler列](#thm-ag2-09-euler-sequence)の局所同型では $\iota(dx)=q_1$、$\iota(dy)=q_2$ です。
<!-- solution-end -->

### A3. 二次元で外積を変換する

$\mathbb P^2$ の $U_0\cap U_1$ で $x=X_1/X_0$、$y=X_2/X_0$、$u=1/x$、$v=y/x$ とする。$du\wedge dv$ を $dx\wedge dy$ で表せ。

- Level: A
- ID: AG2-09-A3

<!-- solution-start -->
**詳細解答。** [分数微分公式](../AG2-08/index.md#lem-ag2-08-localization)により

$$
du=-x^{-2}dx,\qquad dv=x^{-1}dy-yx^{-2}dx.
$$

外積は交代的で $dx\wedge dx=0$ なので

$$
du\wedge dv=(-x^{-2}dx)\wedge(x^{-1}dy-yx^{-2}dx)
=-x^{-3}dx\wedge dy.
$$

$U_0\cap U_1$ では $x\ne0$ であり、係数は単元です。$\mathcal O(-3)$ の変換と符号を除いて一致します。
<!-- solution-end -->

### A4. 標準束の次数を読み取る

$\mathbb P^1,\mathbb P^2,\mathbb P^4$ の標準束を $\mathcal O(d)$ で表せ。またそれぞれの大域正則な最高次微分形式の空間を求めよ。

- Level: A
- ID: AG2-09-A4

<!-- solution-start -->
**詳細解答。** [射影空間の標準束定理](#thm-ag2-09-canonical-projective)で $d=-(n+1)$ と代入します。$n=1,2,4$ に対して順に $\mathcal O(-2),\mathcal O(-3),\mathcal O(-5)$ です。いずれも $d<0$ なので、[射影空間上のO(d)の大域切断](../AG2-06/index.md#thm-ag2-06-pn-sections)により $H^0(\mathbb P^n,\mathcal O(d))=0$ です。同型を通じ、各最高次微分形式の空間も零となります。
<!-- solution-end -->

**Level B：チャートの整合性と完全性**

### B1. 重なりで核の基底を変換する

$\mathbb P^2$ の $U_0\cap U_1$ で $q_1^{(0)},q_2^{(0)}$ を使い、$q_0^{(1)},q_2^{(1)}$ を表せ。その係数が $du,dv$ の変換と等しいことを確認せよ。

- Level: B
- ID: AG2-09-B1

<!-- solution-start -->
**詳細解答。** $z_0=1,z_1=x,z_2=y$、$b_j^{(1)}=x^{-1}b_j^{(0)}$ です。まず

$$
q_0^{(1)}=b_0^{(1)}-x^{-1}b_1^{(1)}
=x^{-1}b_0^{(0)}-x^{-2}b_1^{(0)}
=-x^{-2}q_1^{(0)}.
$$

次に $v=y/x$ より

$$
q_2^{(1)}
=b_2^{(1)}-vb_1^{(1)}
=x^{-1}b_2^{(0)}-yx^{-2}b_1^{(0)}.
$$

右辺で $b_2^{(0)}=q_2^{(0)}+yb_0^{(0)}$、$b_1^{(0)}=q_1^{(0)}+xb_0^{(0)}$ を代入すると、$b_0$ の係数 $y/x-y/x$ が消えるので

$$
q_2^{(1)}=x^{-1}q_2^{(0)}-yx^{-2}q_1^{(0)}.
$$

これは $du=-x^{-2}dx$、$dv=x^{-1}dy-yx^{-2}dx$ と同じです。従って局所同型は重なりでも一致します。
<!-- solution-end -->

### B2. Euler写像の全射性と核

$\mathbb P^3$ の $U_2$ で $z_j=X_j/X_2$（$j=0,1,3$）、$z_2=1$ とする。$\varepsilon$ の局所的右逆を一つ示し、核の階数と基底を求めよ。

- Level: B
- ID: AG2-09-B2

<!-- solution-start -->
**詳細解答。** Euler写像は

$$
\varepsilon(a_0b_0+a_1b_1+a_2b_2+a_3b_3)
=z_0a_0+z_1a_1+a_2+z_3a_3.
$$

右逆は $f\mapsto fb_2$ です。実際 $\varepsilon(fb_2)=f$。核に属するには $a_2=-z_0a_0-z_1a_1-z_3a_3$ が必要十分であり、代入すると

$$
v=a_0(b_0-z_0b_2)+a_1(b_1-z_1b_2)+a_3(b_3-z_3b_2).
$$

第 $0,1,3$ 成分を読めば係数の一意性が分かるので、この3本が自由基底です。核の階数は $3$ で、$U_2$ の余接層の階数と一致します。
<!-- solution-end -->

### B3. 行列式の持ち上げ依存性

可換環 $R$ 上で $E=R^3$、$F=\langle e_1,e_2\rangle$、$L=E/F\simeq R$ とする。$L$ の基底の持ち上げとして $v=e_3$、$v'=e_3+ae_1+be_2$ を選んだとき、$e_1\wedge e_2\wedge v=e_1\wedge e_2\wedge v'$ を示せ。また $F$ の基底を $(e_1+e_2,e_2)$ に替えた場合の行列式を求めよ。

- Level: B
- ID: AG2-09-B3

<!-- solution-start -->
**詳細解答。** 外積の線形性から

$$
e_1\wedge e_2\wedge v'
=e_1\wedge e_2\wedge e_3
+a\,e_1\wedge e_2\wedge e_1
+b\,e_1\wedge e_2\wedge e_2.
$$

交代性で同じ基底が二度現れる項は $0$、従って $e_1\wedge e_2\wedge v'=e_1\wedge e_2\wedge e_3$ です。新基底から旧基底への行列は

$$
A=\begin{pmatrix}1&0\\1&1\end{pmatrix},\qquad\det(A)=1.
$$

よって $(e_1+e_2)\wedge e_2=e_1\wedge e_2$ です。これは[行列式命題](#prop-ag2-09-determinant-exact)の二つの選択不変性を具体化しています。
<!-- solution-end -->

### B4. 負次数で形式が消える理由

$\mathbb P^n$ に非零の大域正則1形式が存在しないことを、標準束の公式だけを引用せず、余接Euler列の単射と $\mathcal O(-1)$ の大域切断から示せ。

- Level: B
- ID: AG2-09-B4

<!-- solution-start -->
**詳細解答。** [Euler列](#thm-ag2-09-euler-sequence)の単射 $\iota:\Omega^1_P\to\mathcal O_P(-1)^{\oplus(n+1)}$ は、各チャートで核が $0$ です。非零の大域切断 $s$ が存在すると仮定します。$\iota(s)=0$ なら各チャートで $s=0$ となるので、$\iota(s)$ も非零の大域切断のはずです。

一方、[射影空間上のO(d)の大域切断](../AG2-06/index.md#thm-ag2-06-pn-sections)に $d=-1$ を代入すると

$$
H^0(P,\mathcal O_P(-1))=0.
$$

有限直和の大域切断は各成分の大域切断からなります。従って

$$
\iota(s)\in H^0\!\left(P,\mathcal O_P(-1)^{\oplus(n+1)}\right)
=H^0(P,\mathcal O_P(-1))^{\oplus(n+1)}=0.
$$

これは $\iota(s)$ が非零という結論に矛盾します。ゆえに $H^0(P,\Omega^1_P)=0$ です。
<!-- solution-end -->

**Level C：複数の構成を接続する**

### C1. 二つのEuler列と標準束

$\mathbb P^2$ について余接Euler列と接Euler列を書け。各層の階数を確かめ、余接Euler列の行列式から標準束を求めよ。接層の行列式は何になるか。

- Level: C
- ID: AG2-09-C1

<!-- solution-start -->
**詳細解答。** [余接Euler列](#thm-ag2-09-euler-sequence)は

$$
0\to\Omega^1_{\mathbb P^2}\to\mathcal O(-1)^{\oplus3}
\to\mathcal O\to0
$$

で、中央は階数 $3$、右端は階数 $1$、左端は階数 $2$ です。[接Euler列](#thm-ag2-09-tangent-euler)は

$$
0\to\mathcal O\to\mathcal O(1)^{\oplus3}
\to T_{\mathbb P^2}\to0
$$

で、接層も階数 $2$ です。[行列式命題](#prop-ag2-09-determinant-exact)を余接列へ適用すると

$$
\det\Omega^1_{\mathbb P^2}
\simeq\det(\mathcal O(-1)^{\oplus3})\otimes(\det\mathcal O)^{-1}
\simeq\mathcal O(-3).
$$

局所基底の遷移関数はそれぞれ $z_k^{-1}$ が3回掛かるので $z_k^{-3}$ です。接列では $\det\mathcal O(1)^{\oplus3}\simeq\det\mathcal O\otimes\det T_{\mathbb P^2}$ より $\det T_{\mathbb P^2}\simeq\mathcal O(3)$ です。余接と接の双対関係とも一致します。
<!-- solution-end -->

### C2. 三つの射影チャートと標準束の貼り合わせ

$\mathbb P^2$ で各 $U_i$ の局所座標を添字の小さい順に並べ、対応する最高次微分形式を $\eta_i$ とする。$U_0\cap U_1$、$U_1\cap U_2$、$U_0\cap U_2$ 上で $\eta_j/\eta_i$ を求め、三重交叉で積が整合することを示せ。係数に現れる符号は標準束の同型類に影響するか。

- Level: C
- ID: AG2-09-C2

<!-- solution-start -->
**詳細解答。** $U_0$ では $x=X_1/X_0,y=X_2/X_0$ として $\eta_0=dx\wedge dy$ です。$U_1$ では $u=X_0/X_1=1/x,v=X_2/X_1=y/x$ として $\eta_1=du\wedge dv$。よって[第1節の定義例](#def-ag2-09-cotangent-sheaf)と同じ微分から

$$
\eta_1=-x^{-3}\eta_0.
$$

$U_2$ では $s=X_0/X_2=1/y,t=X_1/X_2=x/y$ として $\eta_2=ds\wedge dt$ です。$ds=-y^{-2}dy$、$dt=y^{-1}dx-xy^{-2}dy$ より

$$
\eta_2=(-y^{-2}dy)\wedge(y^{-1}dx-xy^{-2}dy)
=y^{-3}dx\wedge dy
=y^{-3}\eta_0.
$$

さらに $U_1$ の変数で $s=u/v,t=1/v$ なので

$$
ds=v^{-1}du-uv^{-2}dv,\quad dt=-v^{-2}dv,
\quad\eta_2=-v^{-3}\eta_1.
$$

三重交叉で $v=y/x$ なので

$$
(-v^{-3})(-x^{-3})=v^{-3}x^{-3}=y^{-3},
$$

となり $\eta_2/\eta_1$ と $\eta_1/\eta_0$ の積は $\eta_2/\eta_0$ と一致します。$\mathcal O(-3)$ の基底変換は $(X_j/X_i)^{-3}$ で、$\eta_i$ にはチャートの座標順に由来する定数符号が加わるだけです。各局所基底 $\eta_i$ に適切な $-1$ を掛けて符号を吸収できるため、可逆層の同型類は $\mathcal O(-3)$ です。
<!-- solution-end -->

## 7. 次の章との接続

Euler列は、射影空間の余接層と接層を、計算できる $\mathcal O(d)$ の列に収めました。標準束が $\mathcal O(-n-1)$ となるのは、その行列式を取った結果です。しかし射影空間の**部分多様体**の標準束は、周囲の標準束を単に制限したものとは限りません。部分多様体には外側への法線方向があり、それを取り除く必要があります。次章では正規束を定義して、超曲面の**随伴公式**へ進みます。
