# F0-02C1A 関数解析I-A：Hilbert射影定理・直交分解

F0-02C1でBanach/Hilbert空間の型を分けました。この講義ではHilbert空間の**閉凸集合への最近点**を、有限次元のcompactnessに頼らず、内積構造と完備性から構成します。

この証明で本当に使う道具は、凸集合の定義、平行四辺形恒等式、ノルムの連続性です。後続理論を先取りせず、この章で必要な範囲だけを先に確認します。

$$
\boxed{
\text{最小化列}
\to\text{Cauchy列}
\to\text{完備性}
\to\text{射影}
\to\text{直交分解}
}
$$

---

## 1. 射影定理の準備

### 1.1 凸集合：中間点が集合から出ない

<a id="def-f0-02c1a-convex-set"></a>

<!-- formal-statement-start -->
> **定義（凸集合）**  
> 実ベクトル空間 $H$ の部分集合 $C$ が **凸** であるとは、任意の $x,y\in C$ と任意の $t\in[0,1]$ に対して次が成り立つことをいいます。

$$
(1-t)x+ty\in C.
$$
<!-- formal-statement-end -->

特に $t=1/2$ とすれば

$$
\frac{x+y}{2}\in C.
$$

射影定理の存在証明では、この「二つの候補の中点も候補である」という事実で最小化列をCauchy列へ押し込みます。ここで必要なのは凸集合の初歩的な定義だけです。

<!-- definition-example-start: def-f0-02c1a-convex-set -->
**定義の確認**

線形部分空間 $M\subset H$ は凸です。実際、$x,y\in M$ と $0\le t\le1$ に対して、線形部分空間は加法とスカラー倍で閉じているので

$$
(1-t)x+ty\in M.
$$

従って、閉線形部分空間はこの章で扱う閉凸集合の結果の適用対象になります。
<!-- definition-example-end -->

### 1.2 平行四辺形恒等式

前章で導入した[平行四辺形恒等式](../F0_02C1_ノルム空間_Banach_Hilbert/index.md#ref-parallelogram-identity)は、射影定理の核心計算なのでここでも式と導出を確認します。実内積空間 $H$ の任意の $u,v\in H$ に対して

$$
\boxed{
\|u+v\|^2+\|u-v\|^2
=2\|u\|^2+2\|v\|^2
}
$$

が成り立ちます。

<!-- proof-start -->
#### 証明

内積の双線形性と対称性から

$$
\begin{aligned}
\|u+v\|^2
&=\langle u+v,u+v\rangle\\
&=\|u\|^2+2\langle u,v\rangle+\|v\|^2,
\end{aligned}
$$

$$
\begin{aligned}
\|u-v\|^2
&=\langle u-v,u-v\rangle\\
&=\|u\|^2-2\langle u,v\rangle+\|v\|^2.
\end{aligned}
$$

二式を足すと交差項が相殺され、

$$
\|u+v\|^2+\|u-v\|^2
=2\|u\|^2+2\|v\|^2
$$

を得ます。
<!-- proof-end -->

### 1.3 ノルムは連続である

<a id="lem-f0-02c1a-norm-continuity"></a>

<!-- formal-statement-start -->
> **補題（ノルム写像の連続性）**  
> 任意のノルム空間で次が成り立ちます。

$$
\boxed{
\bigl|\|x\|-\|y\|\bigr|\le\|x-y\|
}
$$

> したがって $x_n\to x$ なら $\|x_n\|\to\|x\|$ です。
<!-- formal-statement-end -->

<!-- proof-start -->
#### 証明

三角不等式から

$$
\|x\|=\|(x-y)+y\|\le\|x-y\|+\|y\|
$$

なので

$$
\|x\|-\|y\|\le\|x-y\|.
$$

$x,y$ を入れ替えると

$$
\|y\|-\|x\|\le\|x-y\|
$$

も得られます。二つを合わせれば

$$
\bigl|\|x\|-\|y\|\bigr|\le\|x-y\|.
$$

従って $x_n\to x$ なら

$$
\bigl|\|x_n\|-\|x\|\bigr|\le\|x_n-x\|\to0,
$$

ゆえに $\|x_n\|\to\|x\|$ です。
<!-- proof-end -->

<a id="thm-hilbert-projection"></a>

### 1.4 Hilbert空間の射影定理

<!-- formal-statement-start -->
> **定理（Hilbert空間の射影定理）**  
> $H$ を実Hilbert空間、$C\subset H$ を空でない閉凸集合、$z\in H$ とします。このとき一意な $p\in C$ が存在して次を満たします。

$$
\boxed{
\|z-p\|=\inf_{x\in C}\|z-x\|
}
$$

> この一意な点を $P_C(z)$ と書きます。
<!-- formal-statement-end -->

有限次元のF0-02Bでは[Heine--Borel](../F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md#thm-f0-00c1-02)を使いました。しかし無限次元では閉有界集合がコンパクトとは限りません。

Hilbert空間では、**内積構造と完備性**を使って別の証明をします。

---

<!-- round3-hidden-proof-fixed -->
## 2. 証明の見取り図：最近点を「最小化列の極限」として作る

有限次元のように閉有界集合のコンパクト性へ逃げず、Hilbert空間では

```text
距離のinfimumへ近づく列を取る
  ↓
凸性 + 平行四辺形恒等式でCauchy列にする
  ↓
完備性で極限 p を作る
  ↓
閉性で p を C に戻す
  ↓
ノルムの連続性で距離の極限を取る
  ↓
同じ恒等式で一意性を出す
```

という順です。「凸性がCauchy性を作り、完備性が極限を作り、閉性が極限を集合内へ戻す」という役割分担を追うのが核心です。

<!-- proof-start -->
## 3. 射影定理の存在証明

$$
\delta=\inf_{x\in C}\|z-x\|
$$

と置きます。infimumの定義から、各 $n\ge1$ に対して

$$
\delta\le\|z-x_n\|<\delta+\frac1n
$$

を満たす $x_n\in C$ を取れます。したがって

$$
\|z-x_n\|\to\delta.
$$

凸性より

$$
\frac{x_n+x_m}{2}\in C
$$

なので、$\delta$ の定義から

$$
\left\|z-\frac{x_n+x_m}{2}\right\|\ge\delta.
$$

ここで1.2の恒等式を

$$
u=z-x_n,\qquad v=z-x_m
$$

に使います。すると

$$
u-v=x_m-x_n,
$$

$$
u+v=2z-x_n-x_m
=2\left(z-\frac{x_n+x_m}{2}\right)
$$

なので

$$
\|x_n-x_m\|^2
=2\|z-x_n\|^2+2\|z-x_m\|^2
-4\left\|z-\frac{x_n+x_m}{2}\right\|^2.
$$

したがって

$$
0\le\|x_n-x_m\|^2
\le
2\|z-x_n\|^2+2\|z-x_m\|^2-4\delta^2.
$$

$n,m\to\infty$ とすると右辺は

$$
2\delta^2+2\delta^2-4\delta^2=0
$$

へ行きます。よって任意の $\varepsilon>0$ に対して十分大きい $n,m$ では $\|x_n-x_m\|<\varepsilon$ となり、$(x_n)$ はCauchy列です。

$H$ は完備なので、ある $p\in H$ が存在して

$$
x_n\to p.
$$

[閉集合の点列特徴付け](../F0_00B_距離空間_開集合_閉集合_収束/index.md#thm-f0-00b-01)より、$C$ は閉なので $p\in C$ です。

さらに

$$
z-x_n\to z-p.
$$

[ノルム写像の連続性](#lem-f0-02c1a-norm-continuity)から

$$
\|z-p\|
=\lim_{n\to\infty}\|z-x_n\|
=\delta.
$$

これで最近点の存在が示されました。

重要なのは、コンパクト性ではなく

$$
\boxed{
\text{凸性}
+\text{平行四辺形恒等式}
+\text{完備性}
+\text{閉性}
+\text{ノルムの連続性}
}
$$

を使ったことです。

---

## 4. 射影の一意性

$p,q\in C$ が両方最近点だとし、

$$
\|z-p\|=\|z-q\|=\delta
$$

とします。

凸性から中点 $(p+q)/2$ も $C$ に入ります。ここでも1.2の恒等式を使うと

$$
\left\|z-\frac{p+q}{2}\right\|^2
=\frac12\|z-p\|^2
+\frac12\|z-q\|^2
-\frac14\|p-q\|^2.
$$

したがって

$$
\left\|z-\frac{p+q}{2}\right\|^2
=\delta^2-\frac14\|p-q\|^2.
$$

もし $p\ne q$ なら右辺は $\delta^2$ より小さくなります。しかし $(p+q)/2\in C$ なので、これは $\delta$ が $C$ までの距離のinfimumであることに反します。

よって $p=q$ です。
<!-- proof-end -->

---

<a id="thm-f0-02c1a-projection-characterization"></a>

## 5. 射影の特徴付け

<!-- formal-statement-start -->
> **定理（Hilbert射影の変分不等式特徴付け）**  
> $H$ を実Hilbert空間、$C\subset H$ を空でない閉凸集合、$z\in H$、$p\in C$ とします。このとき次は同値です。
>
> 1. $p=P_C(z)$。
> 2. 任意の $x\in C$ に対して、次の内積不等式が成り立つ。

$$
\boxed{
\langle z-p,x-p\rangle\le0
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

#### 5.1 最近点なら内積不等式が成り立つ

$p=P_C(z)$ とし、任意の $x\in C$ を固定します。凸性より、$0\le t\le1$ に対して

$$
p_t=p+t(x-p)=(1-t)p+tx\in C.
$$

$p$ は最近点なので

$$
\|z-p\|^2\le\|z-p_t\|^2.
$$

右辺を展開すると

$$
\begin{aligned}
\|z-p_t\|^2
&=\|(z-p)-t(x-p)\|^2\\
&=\|z-p\|^2
-2t\langle z-p,x-p\rangle
+t^2\|x-p\|^2.
\end{aligned}
$$

したがって $t>0$ に対して

$$
2\langle z-p,x-p\rangle
\le t\|x-p\|^2.
$$

左辺が正だと仮定すれば、十分小さい $t>0$ を選ぶことでこの不等式に反します。よって

$$
\langle z-p,x-p\rangle\le0.
$$

#### 5.2 内積不等式が成り立てば最近点である

逆に、任意の $x\in C$ に対して

$$
\langle z-p,x-p\rangle\le0
$$

が成り立つとします。このとき

$$
\begin{aligned}
\|z-x\|^2
&=\|(z-p)-(x-p)\|^2\\
&=\|z-p\|^2+\|x-p\|^2
-2\langle z-p,x-p\rangle\\
&\ge\|z-p\|^2.
\end{aligned}
$$

したがって

$$
\|z-p\|\le\|z-x\|\qquad(\forall x\in C),
$$

つまり $p=P_C(z)$ です。
<!-- proof-end -->

この定理は「最近点」という距離の最小化問題を、残差 $z-p$ と許される方向 $x-p$ の内積条件へ読み替えています。

---

<a id="thm-f0-02c1a-orthogonal-decomposition"></a>

## 6. 閉線形部分空間への射影と直交分解

<!-- formal-statement-start -->
> **定理（閉部分空間への射影と直交分解）**  
> $H$ を実Hilbert空間、$M\subset H$ を閉線形部分空間とします。このとき任意の $z\in H$ に対して一意に、$p\in M$ と $q\in M^\perp$ が存在して次を満たします。

$$
z=p+q.
$$

> ここで $p=P_Mz$ であり、従って次の直交分解が成り立ちます。

$$
\boxed{H=M\oplus M^\perp}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

線形部分空間は凸なので、[Hilbert空間の射影定理](#thm-hilbert-projection)から $p=P_Mz$ が存在します。[Hilbert射影の変分不等式特徴付け](#thm-f0-02c1a-projection-characterization)より任意の $x\in M$ に対して

$$
\langle z-p,x-p\rangle\le0.
$$

任意の $m\in M$ に対して $p+m,p-m\in M$ ですから、$x=p+m$ と $x=p-m$ をそれぞれ代入すると

$$
\langle z-p,m\rangle\le0,
$$

$$
-\langle z-p,m\rangle\le0.
$$

よって

$$
\langle z-p,m\rangle=0
\qquad(\forall m\in M).
$$

したがって

$$
q=z-p\in M^\perp.
$$

これで分解の存在が示されました。

一意性も確認します。もし

$$
z=p_1+q_1=p_2+q_2,
\qquad p_1,p_2\in M,
\qquad q_1,q_2\in M^\perp
$$

なら

$$
p_1-p_2=q_2-q_1.
$$

左辺は $M$、右辺は $M^\perp$ に入るため、この共通ベクトル $r$ は $M\cap M^\perp$ に入ります。すると $r\perp r$ なので

$$
\|r\|^2=\langle r,r\rangle=0,
$$

従って $r=0$ です。よって $p_1=p_2$、$q_1=q_2$ となり分解は一意です。
<!-- proof-end -->

この射影定理と直交分解が、次章のRiesz表現定理の証明にも使われます。

---

## 7. 有限次元で無意識に使っていたもの

$\mathbb R^p$ では

- 完備性が自動
- 閉有界ならコンパクト
- 標準内積がある
- 線形汎関数をベクトルと同一視できる

ため、いくつもの構造が重なって見えます。

無限次元ではそれぞれを分離して確認しなければなりません。

この章で分けたのは

$$
\boxed{
\text{ノルム}
\ne
\text{内積}
\ne
\text{完備性}
\ne
\text{コンパクト性}
}
$$

という点です。

---

## 演習

### F0-02C1A-A01 $\ell^2$ の座標部分空間へ射影する

- Level: A
- 目安時間: 10分

$$
H=\ell^2,\qquad M=\{x\in\ell^2:x_1=0\}
$$

とする。$z=(z_1,z_2,\dots)$ の $M$ への直交射影 $P_Mz$ と残差 $z-P_Mz$ を求めよ。

<!-- solution-start -->
#### 詳細解答
第1成分だけを0にした

$$
p=(0,z_2,z_3,\dots)
$$

は $M$ に入る。残差は

$$
z-p=(z_1,0,0,\dots)=z_1e_1.
$$

任意の $m=(0,m_2,m_3,\dots)\in M$ に対して

$$
\langle z-p,m\rangle=0
$$

だから $z-p\in M^\perp$。[閉部分空間への射影と直交分解](#thm-f0-02c1a-orthogonal-decomposition)の一意性より $p=P_Mz$ である。

#### 本番答案
$P_Mz=(0,z_2,z_3,\dots)$、$z-P_Mz=(z_1,0,0,\dots)\in M^\perp$。

#### 採点基準（20点）
- 射影候補: 7点
- 残差: 5点
- 直交性: 6点
- 結論: 2点
<!-- solution-end -->

### F0-02C1A-A02 ノルム差を三角不等式で評価する

- Level: A
- 目安時間: 10分

ノルム空間 $X$ で

$$
\bigl|\|x\|-\|y\|\bigr|\le\|x-y\|
$$

を三角不等式から導き、$x_n\to x$ なら $\|x_n\|\to\|x\|$ であることを示せ。

<!-- solution-start -->
#### 詳細解答
三角不等式より

$$
\|x\|\le\|x-y\|+\|y\|
$$

だから $\|x\|-\|y\|\le\|x-y\|$。$x,y$ を交換すると $\|y\|-\|x\|\le\|x-y\|$。従って

$$
\bigl|\|x\|-\|y\|\bigr|\le\|x-y\|.
$$

$x=x_n$、$y=x$ とすれば

$$
\bigl|\|x_n\|-\|x\|\bigr|\le\|x_n-x\|\to0,
$$

ゆえに $\|x_n\|\to\|x\|$。

#### 本番答案
三角不等式を $x=(x-y)+y$ と $y=(y-x)+x$ に適用して二方向の評価を得る。そこへ $x_n\to x$ を代入すれば結論が従う。

#### 採点基準（20点）
- 一方向の評価: 5点
- 逆方向の評価: 5点
- 絶対値への統合: 4点
- 連続性の結論: 6点
<!-- solution-end -->

### F0-02C1A-A03 infimumから最小化列を作る

- Level: A
- 目安時間: 10分

$C\ne\varnothing$ とし

$$
\delta=\inf_{x\in C}\|z-x\|
$$

と置く。各 $n\ge1$ に対して

$$
\delta\le\|z-x_n\|<\delta+\frac1n
$$

を満たす $x_n\in C$ が取れることを、infimumの定義から説明せよ。

<!-- solution-start -->
#### 詳細解答
$\delta$ は集合

$$
S=\{\|z-x\|:x\in C\}
$$

の最大下界である。もしある $n$ について $s\ge\delta+1/n$ がすべての $s\in S$ に対して成り立つなら、$\delta+1/n$ も $S$ の下界になり、$\delta$ が最大下界であることに反する。従ってある $s_n\in S$ が存在して $s_n<\delta+1/n$。$s_n=\|z-x_n\|$ となる $x_n\in C$ を取ればよい。また $\delta$ は下界なので $\delta\le\|z-x_n\|$ である。

#### 本番答案
$\delta+1/n$ は $S$ の下界ではないので、ある $x_n\in C$ が存在して $\|z-x_n\|<\delta+1/n$。一方 $\delta$ は下界だから $\delta\le\|z-x_n\|$。

#### 採点基準（20点）
- 距離値集合の設定: 4点
- 最大下界の使用: 8点
- $x_n$ の存在: 5点
- 両側評価: 3点
<!-- solution-end -->

### F0-02C1A-B01 線形部分空間では射影条件が等号になる

- Level: B
- 目安時間: 15分

閉線形部分空間 $M\subset H$ と $p=P_Mz$ に対し、[Hilbert射影の変分不等式特徴付け](#thm-f0-02c1a-projection-characterization)から

$$
\langle z-p,x-p\rangle\le0\qquad(\forall x\in M)
$$

が成り立つ。これを使って $z-p\in M^\perp$ を示せ。

<!-- solution-start -->
#### 詳細解答
任意の $m\in M$ に対して $p+m,p-m\in M$。$x=p+m$ を代入すると

$$
\langle z-p,m\rangle\le0.
$$

$x=p-m$ を代入すると

$$
-\langle z-p,m\rangle\le0.
$$

従って $\langle z-p,m\rangle=0$。$m$ は任意なので $z-p\in M^\perp$。

#### 本番答案
$x=p\pm m$ を代入すると $\pm\langle z-p,m\rangle\le0$。従って内積は0で、$z-p\perp M$。

#### 採点基準（20点）
- 線形部分空間の利用: 5点
- $p\pm m$ の代入: 7点
- 等号の導出: 5点
- 直交補への結論: 3点
<!-- solution-end -->

### F0-02C1A-B02 閉球への射影を特徴付けから求める

- Level: B
- 目安時間: 20分

実Hilbert空間 $H$、$r>0$ に対して

$$
C=\{x\in H:\|x\|\le r\}
$$

とする。$\|z\|>r$ のとき

$$
P_C(z)=r\frac{z}{\|z\|}
$$

であることを、[Hilbert射影の変分不等式特徴付け](#thm-f0-02c1a-projection-characterization)を使って示せ。なお $C$ が凸であることも確認せよ。

<!-- solution-start -->
#### 詳細解答
まず $x,y\in C$、$0\le t\le1$ なら三角不等式より

$$
\|(1-t)x+ty\|
\le(1-t)\|x\|+t\|y\|
\le r,
$$

従って $C$ は凸である。

$$
u=\frac{z}{\|z\|},\qquad p=ru
$$

と置くと $\|p\|=r$ なので $p\in C$。また

$$
z-p=(\|z\|-r)u.
$$

任意の $x\in C$ に対し[Cauchy--Schwarz不等式](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
\langle u,x\rangle\le|\langle u,x\rangle|
\le\|u\|\|x\|
\le r.
$$

従って

$$
\begin{aligned}
\langle z-p,x-p\rangle
&=(\|z\|-r)\langle u,x-ru\rangle\\
&=(\|z\|-r)(\langle u,x\rangle-r)\\
&\le0.
\end{aligned}
$$

[Hilbert射影の変分不等式特徴付け](#thm-f0-02c1a-projection-characterization)より $p=P_C(z)$。

#### 本番答案
$C$ の凸性は三角不等式で確認できる。$u=z/\|z\|$, $p=ru$ と置くと $p\in C$ かつ $z-p=(\|z\|-r)u$。任意の $x\in C$ について $\langle u,x\rangle\le\|x\|\le r$ なので $\langle z-p,x-p\rangle\le0$。よって $p=P_C(z)$。

#### 採点基準（20点）
- 凸性: 4点
- 射影候補の設定: 4点
- Cauchy--Schwarz評価: 5点
- 特徴付け条件: 5点
- 結論: 2点
<!-- solution-end -->

---

## 次に進む

射影定理はRiesz表現定理の標準証明で $\ker\ell$ への射影として直ちに使います。

**次：[F0-02C2 線形汎関数・双対空間・Riesz表現](../F0_02C2_線形汎関数_双対空間_Riesz/index.md)**

---

## 章末チェック

- 凸集合の定義を述べ、射影定理のどこで凸性を使うか説明できる。
- 平行四辺形恒等式を内積の展開から導ける。
- ノルム差の評価からノルム写像の連続性を示せる。
- infimumから最小化列を具体的に作れる。
- 閉凸集合への射影定理の存在証明で完備性と閉性が使われる箇所を区別できる。
- 1.2の恒等式から最小化列がCauchyになることを説明できる。
- 射影点の一意性を示せる。
- 射影の特徴付けを両方向とも証明できる。
- 閉線形部分空間では残差が直交補空間に入り、$H=M\oplus M^\perp$ となることを説明できる。
