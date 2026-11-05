# QFT53 自由bosonと自由Majorana場の相関関数・中心電荷

<!-- definition-example-audit: strict -->

[QFT51の自由boson](../QFT51/index.md#thm-qft51-boson-central-charge)では、二次の微分場を掛け合わせると応力テンソルの四次極が現れ、正則中心電荷は $c=1$ になりました。[QFT52の放射量子化](../QFT52/index.md#def-qft52-radial-state)では、その中心電荷が子孫状態の内積を決めました。では、**同じ二次元の自由場でも、粒子を作る演算子が反交換すると何が変わるのでしょうか。**

比較するのは二次元Euclid平面 $z=x+iy$ の正則（左向きとも呼ばれる）部分です。反正則部分には対応する独立な式があります。以下の $c$ は **正則Virasoro代数の中心電荷**で、$c+\bar c$ との取り違えに注意します。Lorentz時空では本講座の $(-,+,+,+)$ 規約を用いますが、ここではEuclid平面の複素座標だけを使います。相関関数は互いに異なる挿入点で計算し、同一点積は正規順序で定めます。

## 1. 交換する電流と反交換するフェルミオン

自由bosonの正則電流 $a=i\sqrt{2g}\,\partial\phi$（$g>0$）を使います。[前章の正規化](../QFT52/index.md#def-qft52-current-modes)によって、$z\ne w$ では

$$
\langle a(z)a(w)\rangle=\frac1{(z-w)^2},\qquad
t_B(z)=\frac12:a(z)^2:.
$$

bosonの電流は、同じ向きに四つ挿入すると二点収縮の三通りの積を**すべて正符号**で足します。比較相手は、物理的には質量零の二次元Majorana場の正則成分です。その二点核は極の次数が一つ低く、場同士を交換するたび符号が反転します。奇演算子の反交換は[QFT8のFock演算子のCAR](../QFT8/index.md#thm-qft8-car)と同じ符号規約を用います。一方、経路積分の[QFT19のGrassmann代数](../QFT19/index.md#def-qft19-grassmann)は反交換する形式変数であり、Fock空間の演算子そのものではありません。以下では演算子の奇偶と、Grassmann積分でのWick符号を区別します。

円周の回転するスピン枠に対して反周期的な境界条件をNeveu–Schwarz（NS）条件と呼び、この章ではその真空部門を使います。境界条件の異なるRamond部門については最後に適用範囲を区別します。

<a id="def-qft53-majorana-ns"></a>

<!-- formal-statement-start -->
> **定義（正則自由Majorana場とNS真空）**  
> 正則自由Majorana場 $\psi(z)$ を、フェルミオン数の偶奇で奇となる演算子値の正則場で、平面の相異なる点での収縮が

$$
\langle\psi(z)\psi(w)\rangle=\frac1{z-w},
\qquad \psi(z)\psi(w)\sim\frac1{z-w}
$$

> となるGaussian自由場とする。奇場の入れ替えでは符号を反転させる。原点の周りのNeveu–Schwarz（NS）真空部門では、そのLaurentモードを

$$
\psi(z)=\sum_{r\in\mathbb Z+1/2}b_r z^{-r-1/2},
\qquad b_r|0\rangle=0\quad(r>0)
$$

> と定め、$\langle0|0\rangle=1$、$b_r^\dagger=b_{-r}$ とする。二点核・奇性・Gaussian収縮則はこの自由模型の仮定であり、一般の相互作用フェルミオンへ無条件に拡張しない。
<!-- formal-statement-end -->

半整数 $r$ に対して $-r-1/2$ は整数なので、上式は平面上の局所座標でLaurent展開になっています。NSという名前は、円周の**回転するスピン枠**で反周期的になる境界条件を表します。スピン枠を取り除いた座標成分の単純な一周値だけで反周期性を判定しないでください。整数モードを持つRamond部門には零モードと別の真空が必要で、この章のNS真空公式をそのまま移しません。

<a id="prop-qft53-majorana-car"></a>

<!-- formal-statement-start -->
> **命題（自由Majoranaモードの反交換関係）**  
> 上の正則自由Majorana場のNSモードは、有限励起状態の共通定義域で

$$
\{b_r,b_s\}=b_rb_s+b_sb_r=\delta_{r+s,0}
$$

> を満たす。特に、$r>0$ の状態 $b_{-r}|0\rangle$ はノルム二乗が $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

反交換子は、二つの奇場を入れ替えた輪郭積分の差に対応します。二点核の一位の極の留数は $1$ であり、最後の輪郭積分は指数が $-1$ のときだけ残ります。[QFT52のHeisenberg交換子](../QFT52/index.md#prop-qft52-heisenberg) $[a_m,a_n]=m\delta_{m+n,0}$ と違い、モード番号の係数は出ません。

<!-- proof-start -->
### 証明

[QFT52の電流モードの取り出し](../QFT52/index.md#def-qft52-current-modes)と同じ輪郭留数を用い、逆Laurent公式を $b_r=\oint_0 dz\,z^{r-1/2}\psi(z)/(2\pi i)$ とします。ここで指数 $r-1/2$ は整数なので、被積分関数は局所的に一価です。二つのモードの反交換子を、外側輪郭から内側輪郭を差し引く放射順序の積分として書きます。$z$ の輪郭を $w$ の周りに縮めると、$\psi(z)\psi(w)$ の一位の極から

$$
\mathop{\mathrm{Res}}_{z=w}\frac{z^{r-1/2}}{z-w}
=w^{r-1/2}.
$$

続く $w$ 積分には $w^{r-1/2}w^{s-1/2}=w^{r+s-1}$ が残ります。$r+s$ は整数であり、留数が非零なのは $r+s=0$ の場合だけです。よって反交換関係が得られます。

$r>0$ では $b_r|0\rangle=0$ ですから

$$
\|b_{-r}|0\rangle\|^2
=\langle0|b_rb_{-r}|0\rangle
=\langle0|\{b_r,b_{-r}\}|0\rangle=1.
$$
<!-- proof-end -->

<!-- definition-example-start: def-qft53-majorana-ns -->
**定義の確認**：$\psi(z)|0\rangle=b_{-1/2}|0\rangle+z b_{-3/2}|0\rangle+z^2b_{-5/2}|0\rangle+\cdots$ です。正モードが消えるため原点極限が存在し、$|\psi\rangle=b_{-1/2}|0\rangle$ はノルム $1$ を持ちます。また $b_{-1/2}^2=\{b_{-1/2},b_{-1/2}\}/2=0$。同じモードへ二つの励起を詰め込めないことを、定義と反交換子から直接確認できました。
<!-- definition-example-end -->

## 2. 四点関数で統計の符号を見分ける

相異なる添字 $i\ne j$ に対して収縮核を $B_{ij}=(z_i-z_j)^{-2}$、$F_{ij}=(z_i-z_j)^{-1}$ と書きます。Pfaffianを考える際は反対称行列の対角成分を $F_{ii}=0$ と定義します（同一点の発散する二点核を代入する意味ではありません）。[QFT19のboson Wick対合](../QFT19/index.md#thm-qft19-boson-wick)と[フェルミオン収縮](../QFT19/index.md#prop-qft19-fermion-wick)の奇変数の順序規約を比べます。反対称行列の**Pfaffian**は、添字を二つずつ組に分け、その組を作る置換の符号を添えて足した式です。四点なら組の作り方は三通りだけで、次の式を直接検算できます。

<a id="prop-qft53-four-point"></a>

<!-- formal-statement-start -->
> **命題（bosonの対称和とMajoranaのPfaffian）**  
> 相異なる四点 $z_1,z_2,z_3,z_4$ における、規格化自由boson電流 $a$ と正則自由Majorana場 $\psi$ の平面真空四点関数はそれぞれ

$$
\begin{aligned}
\langle a_1a_2a_3a_4\rangle
&=B_{12}B_{34}+B_{13}B_{24}+B_{14}B_{23},\\
\langle\psi_1\psi_2\psi_3\psi_4\rangle
&=F_{12}F_{34}-F_{13}F_{24}+F_{14}F_{23}.
\end{aligned}
$$

> ここで $a_i=a(z_i)$、$\psi_i=\psi(z_i)$ であり、奇数個の $\psi$ の真空相関関数は零である。フェルミオンの後者は反対称行列 $(F_{ij})$ のPfaffianである。
<!-- formal-statement-end -->

四点の場合に対合の符号を手で調べられるので、一般のPfaffianの行列式公式を暗記する必要はありません。

### 証明の見取り図

四つの位置を二組に分ける方法は $12|34$、$13|24$、$14|23$ の三つです。フェルミオンでは真ん中の組を隣り合わせにする際、奇場を一度横切らせるため負号が出ます。

<!-- proof-start -->
### 証明

bosonのGaussian Wick則では三つの対合の収縮が全部正です。二点核 $\langle a_i a_j\rangle=B_{ij}$ を代入すると第一式が得られます。Majoranaの場合、順序 $(1,2,3,4)$ を保って $(12)(34)$ を縮約する項の符号は正、$(13)(24)$ では $\psi_3$ を $\psi_2$ の左へ一度動かすので負、$(14)(23)$ では二度動かすので正です。各二点収縮を $F_{ij}$ で置き換えれば第二式となります。

奇数個の相関関数については、Gaussian Wick則の完全対合を作れず、フェルミオン数の偶奇も奇なので零です。これは任意の相互作用理論の奇数点関数が零という主張ではありません。
<!-- proof-end -->

**直接の数値例**：$z_1=0,z_2=1/2,z_3=1,z_4=2$ なら $F_{12}=-2$、$F_{34}=-1$、$F_{13}=-1$、$F_{24}=-2/3$、$F_{14}=-1/2$、$F_{23}=-2$ です。したがって

$$
\langle\psi(0)\psi(1/2)\psi(1)\psi(2)\rangle
=2-\frac23+1=\frac73.
$$

途中の負号をすべて正にしてしまうと $11/3$ となり、フェルミオンの反対称性と矛盾します。例えば最初の二挿入を交換した相関関数は $-7/3$ です。

## 3. 正則応力テンソルを作ってウェイトを測る

bosonの応力テンソルは $t_B=\tfrac12:a^2:$ でした。Majoranaでは奇場の同一点積を正規順序で定めると $:\!\psi\psi\!:=0$ なので、同じ二乗は応力テンソルになりません。未正規化の $\psi(z)\psi(z)$ はこの議論では定義しません。**一階微分を片方へ付ける**とウェイト2の偶演算子を作れます。

<a id="def-qft53-majorana-stress"></a>

<!-- formal-statement-start -->
> **定義（自由Majoranaの正則応力テンソル）**  
> 二点収縮が $\langle\psi(z)\psi(w)\rangle=(z-w)^{-1}$ の正則自由Majorana場に対し、点分離で自己収縮を引いた正規順序を用いて、正則応力テンソルを

$$
t_F(z)=-\frac12:\!\psi(z)\partial\psi(z)\!:
$$

> と定める。微分 $\partial=\partial/\partial z$ は正則座標に関する微分とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft53-majorana-stress -->
**定義の確認**：$\psi$ は奇、$\partial\psi$ も奇ですから積は偶です。二つの場のウェイトが後で $1/2$ と分かると、微分による増分 $1$ を加えた $1/2+(1/2+1)=2$ が応力テンソルのウェイトに一致します。さらに原点のNS真空では、負モードの生成部分 $\psi(0)|0\rangle=b_{-1/2}|0\rangle$、$\partial\psi(0)|0\rangle=b_{-3/2}|0\rangle$ を正規順序で並べると $:\!\psi\partial\psi\!:(0)|0\rangle=b_{-1/2}b_{-3/2}|0\rangle=-b_{-3/2}b_{-1/2}|0\rangle$ なので、$t_F(0)|0\rangle=\tfrac12b_{-3/2}b_{-1/2}|0\rangle$ は非零です。異なる二つのモードなのでPauli原理にも反しません。
<!-- definition-example-end -->

<a id="prop-qft53-fermion-ward"></a>

<!-- formal-statement-start -->
> **命題（Majorana場のWard作用と共形ウェイト）**  
> 上の自由Majorana模型では、$z\to w$ の特異項は

$$
t_F(z)\psi(w)\sim
\frac{\psi(w)}{2(z-w)^2}+\frac{\partial\psi(w)}{z-w}.
$$

> 従って $\psi$ は正則共形ウェイト $h=1/2$ の一次場である。
<!-- formal-statement-end -->

### 証明の見取り図

収縮の微分 $\langle\partial\psi(z)\psi(w)\rangle=-(z-w)^{-2}$ が二次極を与えます。奇場を一つ横切るもう一つの収縮にも負号があるので、応力テンソルの先頭の $-1/2$ と合わせて正しいWard OPEになります。

<!-- proof-start -->
### 証明

$s=z-w$ と置きます。二点核を $z$ で微分して

$$
\langle\partial\psi(z)\psi(w)\rangle=-s^{-2},\qquad
\langle\psi(z)\psi(w)\rangle=s^{-1}.
$$

奇場のWick収縮では、$:\!\psi(z)\partial\psi(z)\!:\,\psi(w)$ の特異部分は

$$
-\frac{\psi(z)}{s^2}-\frac{\partial\psi(z)}s.
$$

第一項には $\partial\psi(z)$ と外側の $\psi(w)$ を縮約する符号、第二項には最初の $\psi(z)$ と外側の奇場を縮約するときの交換符号を含めています。$\psi(z)=\psi(w)+s\partial\psi(w)+O(s^2)$ と展開し、$-1/2$ を掛けると二次極 $\psi(w)/(2s^2)$ と一次極 $\partial\psi(w)/s$ を得ます。[QFT50の一次場Ward式](../QFT50/index.md#thm-qft50-primary-ward)の $h=1/2$ と一致します。
<!-- proof-end -->

この一次場は[QFT52の最高ウェイト条件](../QFT52/index.md#def-qft52-primary-descendant)により、$|\psi\rangle=b_{-1/2}|0\rangle$ という正規化された最高ウェイト状態を作ります。特に $L_0|\psi\rangle=\tfrac12|\psi\rangle$ です。さらに[QFT50の一次場の座標変換](../QFT50/index.md#def-qft50-weights)を $z=e^u$（円筒座標 $u=\tau+i\theta$）に適用すると、スピン枠での場は $\psi_{\mathrm{cyl}}(u)=e^{u/2}\psi(e^u)=\sum_{r\in\mathbb Z+1/2}b_re^{-ru}$ です。$u\mapsto u+2\pi i$ では各項に $e^{-2\pi ir}=-1$ が掛かるため、定義で指定したNS反周期性をモードごとに確認できます。

## 4. 四次極を計算し中心電荷を比較する

[QFT51の中心電荷の定義](../QFT51/index.md#def-qft51-stress-ope)では、一般の正則応力テンソルの自己OPEを

$$
t(z)t(w)\sim\frac{c/2}{(z-w)^4}
+\frac{2t(w)}{(z-w)^2}+\frac{\partial t(w)}{z-w}
$$

と正規化します。中心電荷は**四次極の係数の二倍**であって、四次極の係数そのものではありません。

<a id="thm-qft53-majorana-central"></a>

<!-- formal-statement-start -->
> **定理（自由bosonと自由Majoranaの中心電荷）**  
> $\langle a(z)a(w)\rangle=(z-w)^{-2}$、$t_B=\tfrac12:a^2:$ の自由bosonと、$\langle\psi(z)\psi(w)\rangle=(z-w)^{-1}$、$t_F=-\tfrac12:\!\psi\partial\psi\!:$ の正則自由Majorana場は、それぞれ

$$
\begin{aligned}
t_B(z)t_B(w)&\sim\frac{1/2}{(z-w)^4}
+\frac{2t_B(w)}{(z-w)^2}+\frac{\partial t_B(w)}{z-w},\\
t_F(z)t_F(w)&\sim\frac{1/4}{(z-w)^4}
+\frac{2t_F(w)}{(z-w)^2}+\frac{\partial t_F(w)}{z-w}.
\end{aligned}
$$

> 従って正則中心電荷は $c_B=1$、$c_F=1/2$ である。独立な自由場の応力テンソルの和では中心電荷も加法的である。
<!-- formal-statement-end -->

### 証明の見取り図

bosonでは二つの二点収縮の対応が二通りで四次極係数が $1/2$ になります。Majoranaでは導関数付きの二種類の完全収縮に逆の符号が現れ、その差が $1/4$ になります。二次・一次極は応力テンソルがウェイト2の生成子として働くことを反映します。

<!-- proof-start -->
### 証明

以下の計算では $s=z-w$ と置き、$\partial\psi(z)$ は $z$ 微分、$\partial\psi(w)$ は $w$ 微分と区別します。\n\n**boson**：$t_B(z)t_B(w)$ の二重収縮は、二本の $a(z)$ を二本の $a(w)$ に対応させる二通りです。各収縮は $s^{-2}$ なので

$$
\frac14\cdot2(s^{-2})^2=\frac1{2s^4}.
$$

一重収縮は $4\cdot(1/4)s^{-2}:a(z)a(w):$ です。$a(z)=a(w)+s\partial a(w)+\cdots$ と展開すると

$$
\frac{:a(w)^2:}{s^2}+\frac{:\!\partial a(w)a(w)\!:}{s}
=\frac{2t_B(w)}{s^2}+\frac{\partial t_B(w)}s.
$$

**Majorana**：まず導関数の向きを固定します。

$$
\begin{array}{ll}
\langle\psi(z)\psi(w)\rangle=s^{-1},
&\langle\partial\psi(z)\partial\psi(w)\rangle=-2s^{-3},\\
\langle\psi(z)\partial\psi(w)\rangle=s^{-2},
&\langle\partial\psi(z)\psi(w)\rangle=-s^{-2}.
\end{array}
$$

奇場四つの完全収縮で二つの対合の符号が異なるので、$t_F(z)t_F(w)$ の二重収縮は

$$
\begin{aligned}
\frac14\big[\langle\psi(z)\partial\psi(w)\rangle
\langle\partial\psi(z)\psi(w)\rangle
-\langle\psi(z)\psi(w)\rangle
\langle\partial\psi(z)\partial\psi(w)\rangle\big]
&=\frac14[-s^{-4}-(-2s^{-4})]\\
&=\frac1{4s^4}.
\end{aligned}
$$

一重収縮も符号を残して展開します。四つの奇場の順序 $\psi(z),\partial\psi(z),\psi(w),\partial\psi(w)$ を固定すると、各一重収縮の寄与は

$$
\begin{aligned}
\bigl(t_F(z)t_F(w)\bigr)_{\text{一重収縮}}
&=\frac14\bigg[
-\frac{:\!\partial\psi(z)\partial\psi(w)\!:}{s}
+\frac{:\!\partial\psi(z)\psi(w)\!:}{s^2}\\
&\qquad-\frac{:\!\psi(z)\partial\psi(w)\!:}{s^2}
+\frac{2:\!\psi(z)\psi(w)\!:}{s^3}
\bigg].
\end{aligned}
$$

ここで $X=:\!\psi(w)\partial\psi(w)\!:$、$Y=:\!\psi(w)\partial^2\psi(w)\!:$ と置きます。正規順序の反対称性により $:\!\psi(w)\psi(w)\!:=:\!\partial\psi(w)\partial\psi(w)\!:=0$ です。Taylor展開 $\psi(z)=\psi(w)+s\partial\psi(w)+s^2\partial^2\psi(w)/2+\cdots$ から

$$
\begin{aligned}
:\!\psi(z)\psi(w)\!: &=-sX-\frac{s^2}{2}Y+O(s^3),\\
:\!\partial\psi(z)\psi(w)\!: &=-X-sY+O(s^2),\\
:\!\psi(z)\partial\psi(w)\!: &=X+O(s^2),\\
:\!\partial\psi(z)\partial\psi(w)\!: &=O(s)
\end{aligned}
$$

を得ます。四項を元の式に戻し、$\partial X=Y$（$:\!\partial\psi\partial\psi\!:=0$）を使うと

$$
\frac14\left(-\frac{4X}{s^2}-\frac{2Y}{s}\right)
=-\frac{X}{s^2}-\frac{\partial X}{2s}
=\frac{2t_F(w)}{s^2}+\frac{\partial t_F(w)}s.
$$

四次極の係数を $c/2$ と照合して $c_B=1$、$c_F=1/2$ を得ます。独立な二模型の混合収縮はないため、$t=t_1+t_2$ とすれば四次極はそれぞれの四次極の和になり、$c=c_1+c_2$ です。
<!-- proof-end -->

**比較の例**：独立なMajorana場 $\psi^1,\psi^2$ を二つ置くと $c=1/2+1/2=1$ になり、自由bosonの値と一致します。ただし**中心電荷が等しいだけで演算子の全スペクトル・境界条件・相関関数が同じになるわけではありません**。複素自由フェルミオンとbosonの対応には荷電部門、零モード、局所性条件を指定する追加の議論が必要です。

## 5. NS状態の子孫と零状態を手で確かめる

一次場のWard OPEから、$L_n=\oint dz\,z^{n+1}t_F(z)/(2\pi i)$ の作用が決まります。[QFT52の輪郭モード作用](../QFT52/index.md#thm-qft52-primary-modes)に $h=1/2$ を代入すると、フェルミオンモードの交換子は

$$
[L_n,b_r]=-\left(r+\frac n2\right)b_{n+r}.
$$

ここで $L_n$ は偶演算子なので、$b_r$ との括弧は**通常の交換子**です。$b_r$ と $b_s$ 同士には前節の**反交換子**を使います。

<a id="thm-qft53-fermion-null"></a>

<!-- formal-statement-start -->
> **定理（Majorana一次場のレベル2零状態）**  
> 上のNS真空が $L_n|0\rangle=0$（$n\ge-1$）を満たす正値Fock表現では、$|\psi\rangle=b_{-1/2}|0\rangle$ は $c=1/2,h=1/2$ の最高ウェイト状態である。そのレベル2子孫は

$$
L_{-2}|\psi\rangle=\frac32 b_{-5/2}|0\rangle,
\qquad L_{-1}^2|\psi\rangle=2b_{-5/2}|0\rangle
$$

> となり、$(L_{-2}-\tfrac34L_{-1}^2)|\psi\rangle=0$ である。この零状態は対応するVerma加群のレベル2 Gram行列の核に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

bosonの [QFT52のレベル2特異ベクトル](../QFT52/index.md#cor-qft52-c1-null) は $c=1,h=1/4$ でした。同じGram行列の一般式に $c=1/2,h=1/2$ を入れ、さらにMajoranaのモードで二つの子孫を作ると、今回は $3/4$ という係数で一致します。

<!-- proof-start -->
### 証明

まず[QFT52の一次場の輪郭作用](../QFT52/index.md#thm-qft52-primary-modes)を、先に定義した $b_r=\oint dz\,z^{r-1/2}\psi(z)/(2\pi i)$ に代入します。$[L_n,\psi(z)]=z^{n+1}\partial\psi(z)+(n+1)z^n\psi(z)/2$ だから、第一項を部分積分して

$$
[L_n,b_r]
=\left[-\left(r+n+\frac12\right)+\frac{n+1}{2}\right]b_{r+n}
=-\left(r+\frac n2\right)b_{r+n}.
$$

$L_0|0\rangle=L_{n>0}|0\rangle=0$ より $L_0|\psi\rangle=\tfrac12|\psi\rangle$、$L_{n>0}|\psi\rangle=0$。平面真空の $L_{-1}|0\rangle=0$ を使うと

$$
\begin{aligned}
L_{-1}|\psi\rangle
&=[L_{-1},b_{-1/2}]|0\rangle=b_{-3/2}|0\rangle,\\
L_{-1}^2|\psi\rangle
&=[L_{-1},b_{-3/2}]|0\rangle=2b_{-5/2}|0\rangle,\\
L_{-2}|\psi\rangle
&=[L_{-2},b_{-1/2}]|0\rangle+b_{-1/2}L_{-2}|0\rangle.
\end{aligned}
$$

[定義の確認](#def-qft53-majorana-stress)で $L_{-2}|0\rangle=\tfrac12b_{-3/2}b_{-1/2}|0\rangle$ と計算したので、最後の第2項は $b_{-1/2}^2=0$ により零です。第1項の係数は $1+1/2=3/2$ だから定理の二式を得ます。

また[QFT52のGram行列公式](../QFT52/index.md#thm-qft52-level-gram)に $(c,h)=(1/2,1/2)$ を代入すると

$$
G_2=\begin{pmatrix}4h+c/2&6h\\6h&4h(2h+1)\end{pmatrix}
=\begin{pmatrix}9/4&3\\3&4\end{pmatrix},
\quad\det G_2=9-9=0.
$$

その核方向は $(1,-3/4)$ です。したがってモード計算で実際に消えた方向と一致します。普遍Verma加群の形式的零ノルムベクトルを、具体的な正値Fock表現では商で消している、という二つの意味を区別しました。
<!-- proof-end -->

## 6. どこまで同じ「自由CFT」なのか

| 正則模型 | 基本場・ウェイト | 基本二点関数 | 四点収縮 | 中心電荷 |
|---|---|---|---|---|
| 実自由bosonの電流 | $a,\ h=1$ | $(z-w)^{-2}$ | 三対合すべて正 | $c=1$ |
| 実自由Majorana | $\psi,\ h=1/2$ | $(z-w)^{-1}$ | 中央の対合が負 | $c=1/2$ |
| 独立なMajorana二個 | $\psi^1,\psi^2$ | 各成分は上式 | 成分ごとに反交換 | $c=1$ |

両者は正則二点核の極・Gaussian収縮則・Virasoro構造を具体的に計算できる模型です。$c$ は局所応力テンソル代数の情報の一つに過ぎません。たとえばbosonでは電荷部門（[QFT52](../QFT52/index.md#cor-qft52-c1-null)）、MajoranaではNS以外のスピン部門を追加すると演算子の候補が変わります。一般の二次元CFTの全演算子、交差対称性の解、スピン場の構成までここから自動的には出ません。

補足として、自由bosonの荷電部門では、零モードと対数の枝を指定した正則場 $X$ を $\langle X(z)X(w)\rangle=-\log(z-w)$ と規格化し、$a=i\partial X$ とできます。荷電挿入 $V_q(z)=:\!e^{iqX(z)}\!:$ は $a(z)V_q(w)\sim qV_q(w)/(z-w)$ を満たします。$q$ と $-q$ の中性な二点関数には

$$
\langle V_q(z)V_{-q}(w)\rangle\propto(z-w)^{-q^2}
$$

が現れます。さらに $a(z)V_q(w)$ の一次極を用い、$t_B=\tfrac12:\!a^2\!:$ の二重収縮から $q^2V_q(w)/(2(z-w)^2)$、二通りの一重収縮から $q:\!aV_q\!:(w)/(z-w)$ を得ます。$\partial V_q=q:\!aV_q\!:$（$a=i\partial X$ の連鎖律）なので

$$
t_B(z)V_q(w)\sim\frac{q^2V_q(w)}{2(z-w)^2}+\frac{\partial V_q(w)}{z-w}.
$$

[QFT50の一次場Ward核](../QFT50/index.md#thm-qft50-primary-ward)と各極を照合して、二点関数のべきだけに依存せず $h_q=q^2/2$ と判定できます。正則指数場の対数の枝や互いの局所性は別途条件を要し、任意の実 $q$ を完全な局所理論の場と宣言しているわけではありません。これはフェルミオンの $h=1/2$ と、bosonの荷電部門にも $q^2=1$ で同じウェイトが現れる、という**比較の入口**です。ウェイト一致だけでは両場の同一視になりません。

## 演習：Wickの符号から零状態まで

### 演習 QFT53-A1：boson四点関数

- Level: A
- 問題: 相異なる四点で $\langle a_i a_j\rangle=(z_i-z_j)^{-2}$ のGaussian boson電流を考える。$\langle a_1a_2a_3a_4\rangle$ を三つの二点収縮の積で表し、$z_1=0,z_2=1,z_3=2,z_4=3$ で値を求めよ。

**詳細解答**：[QFT19のboson Wick則](../QFT19/index.md#thm-qft19-boson-wick)より、完全対合は $(12)(34)$、$(13)(24)$、$(14)(23)$ の三つで、置換符号はありません。$B_{12}=B_{34}=1$、$B_{13}=B_{24}=1/4$、$B_{14}=1/9$、$B_{23}=1$ より

$$
\langle a_1a_2a_3a_4\rangle
=1\cdot1+\frac14\cdot\frac14+\frac19\cdot1
=1+\frac1{16}+\frac19=\frac{169}{144}.
$$

### 演習 QFT53-A2：フェルミオン四点の符号

- Level: A
- 問題: 二点核 $F_{ij}=(z_i-z_j)^{-1}$ のGaussian奇場について、$\langle\psi_1\psi_2\psi_3\psi_4\rangle$ の三つの符号を求めよ。挿入 $\psi_1$ と $\psi_2$ を交換すると全体が負になる理由も述べよ。

**詳細解答**：[QFT19のフェルミオン収縮則](../QFT19/index.md#prop-qft19-fermion-wick)に従い、順序 $1234$ から対合へ移す置換回数は $12|34$ で0回、$13|24$ で1回、$14|23$ で2回なので $F_{12}F_{34}-F_{13}F_{24}+F_{14}F_{23}$ です。$F_{ji}=-F_{ij}$ であり、最初の二挿入を交換した期待値は奇演算子を一度入れ替えた値ですから全体に $-1$ が掛かります。これは各二点核の符号だけでなく、相関関数に指定した奇場の順序の効果です。

### 演習 QFT53-A3：NS一粒子状態のノルム

- Level: A
- 問題: $\{b_r,b_s\}=\delta_{r+s,0}$、$b_{r>0}|0\rangle=0$、$\langle0|0\rangle=1$、$b_r^\dagger=b_{-r}$ のNS真空で、$\|b_{-3/2}|0\rangle\|^2$ と $b_{-1/2}^2|0\rangle$ を求めよ。

**詳細解答**：前者は $\langle0|b_{3/2}b_{-3/2}|0\rangle=\langle0|\{b_{3/2},b_{-3/2}\}|0\rangle=1$ です。後者は $\{b_{-1/2},b_{-1/2}\}=2b_{-1/2}^2=\delta_{-1,0}=0$ から零です。正ノルムと同一モード重複励起の禁止が両立します。

### 演習 QFT53-A4：Ward二次極の係数

- Level: A
- 問題: $t_F=-\tfrac12:\!\psi\partial\psi\!:$ と $\langle\psi(z)\psi(w)\rangle=(z-w)^{-1}$ から、$t_F(z)\psi(w)$ の二次極と一次極を求め、正則ウェイトを答えよ。

**詳細解答**：$s=z-w$ とすると $\langle\partial\psi(z)\psi(w)\rangle=-s^{-2}$。奇場を横切る収縮の符号を含めて $:\!\psi\partial\psi\!:(z)\psi(w)\sim-\psi(z)s^{-2}-\partial\psi(z)s^{-1}$ です。$\psi(z)=\psi(w)+s\partial\psi(w)+O(s^2)$ を代入して $-1/2$ を掛けると $t_F(z)\psi(w)\sim\psi(w)/(2s^2)+\partial\psi(w)/s$。よってウェイトは $1/2$ です。

### 演習 QFT53-A5：中心電荷の加法性

- Level: A
- 問題: 互いに混合収縮のない二つの自由Majorana場の応力テンソルを $t=t_F^{(1)}+t_F^{(2)}$ とする。$t(z)t(w)$ の四次極係数と正則中心電荷を求め、自由bosonと比較せよ。

**詳細解答**：独立性により $t_F^{(1)}t_F^{(2)}$ の四次極はなく、それぞれの自己OPEから $1/(4s^4)$ が一つずつ出ます。係数は $1/4+1/4=1/2$。$c/2=1/2$ なので $c=1$ で自由bosonと同じです。ただしこれだけで相関関数や全状態空間が同型とは分かりません。

### 演習 QFT53-B1：中心項の二種類の収縮

- Level: B
- 問題: 正則Majorana自由場について、$\langle\psi(z)\partial\psi(w)\rangle$、$\langle\partial\psi(z)\psi(w)\rangle$、$\langle\partial\psi(z)\partial\psi(w)\rangle$ を一つずつ微分で求めよ。その後 $t_F(z)t_F(w)$ の二重収縮の符号を含め、中心電荷を再導出せよ。

**詳細解答**：$s=z-w$ として $\partial_w s^{-1}=s^{-2}$、$\partial_zs^{-1}=-s^{-2}$、$\partial_z\partial_ws^{-1}=-2s^{-3}$。したがって完全収縮は

$$
\frac14\left[(s^{-2})(-s^{-2})-(s^{-1})(-2s^{-3})\right]
=\frac14(-1+2)s^{-4}=\frac1{4s^4}.
$$

一般の $tt$ OPEの四次極は $c/(2s^4)$ ですから $c/2=1/4$、よって $c=1/2$ です。導関数のどちらを微分するか、完全収縮を引く符号の二点が本問の核心です。

### 演習 QFT53-B2：Majoranaのレベル2 Gram行列

- Level: B
- 問題: $[L_m,L_n]=(m-n)L_{m+n}+\frac c{12}m(m^2-1)\delta_{m+n,0}$ の最高ウェイト表現 $L_{n>0}|h\rangle=0$、$L_0|h\rangle=h|h\rangle$、$L_n^\dagger=L_{-n}$ を用いる。レベル2基底 $(L_{-2}|h\rangle,L_{-1}^2|h\rangle)$ のGram行列を求め、$(c,h)=(1/2,1/2)$ の核を出せ。

**詳細解答**：$\langle h|L_2L_{-2}|h\rangle=4h+c/2$ は $[L_2,L_{-2}]$ から求まります。$[L_2,L_{-1}]=3L_1$ と $[L_1,L_{-1}]=2L_0$ を二回の積に作用させると、非対角成分は $6h$ です。また $L_1L_{-1}^2|h\rangle=2(2h+1)L_{-1}|h\rangle$ より右下は $4h(2h+1)$。よって

$$
G_2=\begin{pmatrix}4h+c/2&6h\\6h&4h(2h+1)\end{pmatrix}
\xrightarrow{c=h=1/2}\begin{pmatrix}9/4&3\\3&4\end{pmatrix}.
$$

第1行の方程式 $(9/4)x+3y=0$ から $y=-3x/4$ です。第2行にも代入すると $3x+4(-3x/4)=0$。よって核は $(1,-3/4)$ の張る直線で、零方向は $(L_{-2}-3L_{-1}^2/4)|h\rangle$ です。

### 演習 QFT53-B3：Majoranaモードによる零状態検算

- Level: B
- 問題: $[L_n,b_r]=-(r+n/2)b_{n+r}$、$L_{-1}|0\rangle=0$、$L_{-2}|0\rangle=\tfrac12b_{-3/2}b_{-1/2}|0\rangle$、$b_{-1/2}^2=0$ とする。$L_{-2}b_{-1/2}|0\rangle$ と $L_{-1}^2b_{-1/2}|0\rangle$ を計算し、B2の核と照合せよ。

**詳細解答**：$[L_{-2},b_{-1/2}]=(3/2)b_{-5/2}$ です。$b_{-1/2}L_{-2}|0\rangle$ は $b_{-1/2}b_{-3/2}b_{-1/2}|0\rangle=-b_{-3/2}b_{-1/2}^2|0\rangle=0$ なので、第一の結果は $(3/2)b_{-5/2}|0\rangle$。次に $[L_{-1},b_{-1/2}]=b_{-3/2}$、$[L_{-1},b_{-3/2}]=2b_{-5/2}$ で、真空への $L_{-1}$ の作用が零だから第二の結果は $2b_{-5/2}|0\rangle$。差 $(3/2)-(3/4)\cdot2=0$ はB2の核と一致します。

### 演習 QFT53-B4：荷電bosonとMajoranaのウェイト

- Level: B
- 問題: $\langle X(z)X(w)\rangle=-\log(z-w)$、$a=i\partial X$、$V_q=:\!e^{iqX}\!:$ を零モードの中性条件付きで考える。$a(z)V_q(w)$ の一次極と $V_q(z)V_{-q}(w)$ のべき、ウェイト $h_q$ を導け。$h_q=1/2$ となる実電荷を求め、Majorana場と同一視してよいか説明せよ。

**詳細解答**：収縮は $\langle\partial X(z)X(w)\rangle=-1/(z-w)$。指数から一つの $X$ を取り出すと係数は $i\cdot iq\cdot(-1/(z-w))=q/(z-w)$ なので $a(z)V_q(w)\sim qV_q(w)/(z-w)$。二つの指数の交差収縮を指数化すると $\exp((iq)(-iq)(-\log(z-w)))=(z-w)^{-q^2}$。一次場の二点べき $(z-w)^{-2h_q}$ と比べて $h_q=q^2/2$。ここで正規順序 $t_B=\tfrac12:\!a^2\!:$ と指数のWick展開を使うと、$t_B(z)V_q(w)$ の二重収縮は $q^2V_q(w)/(2(z-w)^2)$、一重収縮は $q:\!aV_q\!:(w)/(z-w)=\partial V_q(w)/(z-w)$ です。従って[一次場Ward核](../QFT50/index.md#thm-qft50-primary-ward)からも $h_q=q^2/2$ と確かめられ、実 $q=\pm1$ で $h_q=1/2$ です。ただし半整数スピンの局所性、スピン部門、交換符号、零モードを未指定のままMajorana場と同一視はできません。

### 演習 QFT53-C1：自由場の統計・Ward作用・零状態を結ぶ

- Level: C
- 問題: 相異なる挿入点の二次元正則自由場として、bosonの $\langle a(z)a(w)\rangle=(z-w)^{-2}$、$t_B=\tfrac12:a^2:$ と、NS Majoranaの $\langle\psi(z)\psi(w)\rangle=(z-w)^{-1}$、$t_F=-\tfrac12:\!\psi\partial\psi\!:$ を考える。次を順に示せ。

  1. 両模型の四点関数を二点核から作り、両者の置換符号の差を説明する。
  2. Majoranaの $t_F\psi$ OPEを導き、一次場のウェイトを求める。
  3. 両模型の $tt$ OPEの四次極を計算して $c$ を比較する。
  4. NS最高ウェイト状態 $|\psi\rangle=b_{-1/2}|0\rangle$ に対して $L_{-2}-\tfrac34L_{-1}^2$ が消えることを、モード交換子とレベル2Gram行列の双方で確かめる。$L_n|0\rangle=0$（$n\ge-1$）、$b_r|0\rangle=0$（$r>0$）を用いてよい。

**詳細解答**：

**（1）四点収縮。** 三対合は $(12)(34)$、$(13)(24)$、$(14)(23)$ です。[QFT19のWick対合](../QFT19/index.md#thm-qft19-boson-wick)によりbosonでは $B_{12}B_{34}+B_{13}B_{24}+B_{14}B_{23}$、fermionでは奇場の1回の横断を含む中項だけ負にして $F_{12}F_{34}-F_{13}F_{24}+F_{14}F_{23}$ です。ここで $B_{ij}=(z_i-z_j)^{-2}$、$F_{ij}=(z_i-z_j)^{-1}$ としました。

**（2）Ward作用。** $s=z-w$ とすると $\langle\partial\psi(z)\psi(w)\rangle=-s^{-2}$。二通りの奇場収縮と $\psi(z)=\psi(w)+s\partial\psi(w)+\cdots$ から

$$
t_F(z)\psi(w)
\sim-\frac12\left[-\frac{\psi(z)}{s^2}-\frac{\partial\psi(z)}s\right]
\sim\frac{\psi(w)}{2s^2}+\frac{\partial\psi(w)}s.
$$

従って $h=1/2$、$L_0|\psi\rangle=\tfrac12|\psi\rangle$ です。

**（3）中心電荷。** bosonの二重収縮は $(1/2)^2\cdot2\cdot s^{-4}=1/(2s^4)$。Majoranaでは $\langle\partial\psi(z)\partial\psi(w)\rangle=-2s^{-3}$、$\langle\psi(z)\partial\psi(w)\rangle=s^{-2}$、$\langle\partial\psi(z)\psi(w)\rangle=-s^{-2}$ を別々に微分で確認して

$$
\frac14\left[s^{-2}(-s^{-2})-s^{-1}(-2s^{-3})\right]
=\frac1{4s^4}.
$$

四次極は $c/(2s^4)$ なので、$c_B=1$、$c_F=1/2$ です。

**（4）二つの再計算。** $[L_n,b_r]=-(r+n/2)b_{n+r}$ と $L_{-1}|0\rangle=0$ より

$$
\begin{aligned}
L_{-1}|\psi\rangle&=b_{-3/2}|0\rangle,\\
L_{-1}^2|\psi\rangle&=2b_{-5/2}|0\rangle,\\
L_{-2}|\psi\rangle&=\frac32b_{-5/2}|0\rangle
+b_{-1/2}\frac12b_{-3/2}b_{-1/2}|0\rangle
=\frac32b_{-5/2}|0\rangle.
\end{aligned}
$$

最後は $b_{-1/2}^2=0$ を使いました。したがって $(L_{-2}-\tfrac34L_{-1}^2)|\psi\rangle=0$。一方、[一般Gram行列](../QFT52/index.md#thm-qft52-level-gram)へ $(c,h)=(1/2,1/2)$ を代入すると $G_2=\left(\begin{smallmatrix}9/4&3\\3&4\end{smallmatrix}\right)$ で、$G_2(1,-3/4)^\mathsf T=0$。振動子で消える方向と正値表現のGram核が一致します。

## この章で確認したこと

自由bosonと自由Majoranaは、どちらも二点核から高次相関関数を再構成できますが、**フェルミオンの対合には置換符号が必要**です。Majoranaの微分を含む応力テンソルは $h=1/2$ のWard作用を生み、二重収縮の四次極から $c=1/2$ を与えます。正値NS Fock表現では $h=1/2$ のレベル2子孫が具体的に消え、Virasoro表現論と相関関数の計算がつながりました。次に相関関数のOPEを使って共形ブロックや交差対称性を論じる際には、対象の演算子集合・スピン部門・収束や正値性の仮定を明記します。
