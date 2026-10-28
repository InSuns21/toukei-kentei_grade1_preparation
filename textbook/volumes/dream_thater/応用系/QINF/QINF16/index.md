# QINF16 Bell不等式とCHSH

## 1. もつれがあることと、古典的に説明できないこと

[QINF15の分離可能性](../QINF15/index.md#def-qinf15-separable)は、状態を局所状態の確率混合として準備できるかを問いました。しかし、状態の行列を実験者に直接見せず、AliceとBobが遠く離れてそれぞれ二通りの測定を選ぶとしたら、**観測された確率表だけで古典的な共通原因の説明を排除できるでしょうか**。

古典的な共通原因には、例えば二人があらかじめ同じ乱数表を配られ、その表と各自の質問だけで答える仕組みが含まれます。これを比較対象として正確に定め、その模型なら必ず成立する不等式を導きます。次に[QINF13のBell対](../QINF13/index.md#def-qinf13-ebit)を測ると不等式が破れることを、演算子の計算から確かめます。

以下、測定の選択を $x,y\in\{0,1\}$、結果を $a,b\in\{-1,+1\}$ とします。Aliceが $x$、Bobが $y$ を選んだ試行で結果 $(a,b)$ が得られる条件付き確率を $p(a,b\mid x,y)$ と書きます。各 $(x,y)$ で確率は非負、四つの結果にわたる和は1です。**測定設定の選択と出力結果は異なる変数**であり、一試行で四組の設定を同時に測定するのではありません。

## 2. 局所的な古典模型を定式化する

隠れた共通原因を $\lambda$ と記し、その確率分布を $\mu(\lambda)$ とします。まず有限集合上の和として説明しますが、連続変数なら和を積分へ置き換えて同じ議論が成り立ちます。$\lambda$ が与えられた後のAliceの応答確率を $p_A(a\mid x,\lambda)$、Bobのものを $p_B(b\mid y,\lambda)$ とします。

「局所的」とは、共通原因を固定したときAliceの応答がBobの選択 $y$ を参照せず、逆側も同様ということです。さらに測定設定は共通原因と独立に選べると仮定します。これらを分けて明記しておかないと、不等式の実験上の意味が曖昧になります。

<a id="def-qinf16-local-model"></a>

<!-- formal-statement-start -->
> **定義（二設定二値Bell実験と局所隠れ変数模型）**  
> 設定 $x,y\in\{0,1\}$ と結果 $a,b\in\{-1,+1\}$ をもつ条件付き確率表が**局所隠れ変数模型**を持つとは、共通原因 $\lambda$ の確率分布 $\mu(\lambda)$ と、正規化された局所応答 $p_A(a\mid x,\lambda)$、$p_B(b\mid y,\lambda)$ が存在し、すべての $a,b,x,y$ について

$$
p(a,b\mid x,y)=\sum_\lambda\mu(\lambda)
p_A(a\mid x,\lambda)p_B(b\mid y,\lambda)
$$

> と書けることをいう。ここでは $\mu(\lambda)\ge0$、$\sum_\lambda\mu(\lambda)=1$ で、$\mu$ は設定 $(x,y)$ に依存しない（測定設定の独立性）。応答の積は、$\lambda$ の下での条件付き因子化を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf16-local-model -->
### 定義の確認：同じカードを二人に配る

**定義の確認**として、局所応答・因子化・設定の独立性を順に調べます。

$\lambda$ を確率 $1/2$ ずつで $+1,-1$ とし、Aliceは設定にかかわらず $a=\lambda$、Bobも $b=\lambda$ を返すとします。各応答は指定結果で1、それ以外で0の正規化分布です。共通原因の分布は設定に依存せず、Alice側の規則は $y$ を、Bob側は $x$ を参照しません。したがって積の和の全条件を満たし、

$$
p(+1,+1\mid x,y)=p(-1,-1\mid x,y)=\frac12
$$

で、それ以外は0です。結果は完全に相関していますが、局所模型そのものです。
<!-- definition-example-end -->

局所応答が確率的でも、乱数を $\lambda$ に追加すれば決定論的な応答で表せます。ただし次の不等式の証明はこの追加構成に頼らず、確率的応答のままで行います。なお上の模型は、相手の選択へ信号を送る仕組みの不在よりも強い条件です。

## 3. CHSH式と古典上界2

二人の結果の積 $ab$ は $+1$ または $-1$ です。各設定でのその平均を $E_{xy}$ とし、三つの相関を加え、最後の相関を引いたものを比較します。

<a id="def-qinf16-chsh"></a>

<!-- formal-statement-start -->
> **定義（CHSH相関量）**  
> 二設定二値実験の条件付き確率表 $p(a,b\mid x,y)$ に対し、相関およびCHSH相関量 $S$ を

$$
E_{xy}:=\sum_{a,b\in\{-1,+1\}}ab\,p(a,b\mid x,y),
\qquad S:=E_{00}+E_{01}+E_{10}-E_{11}
$$

> と定める。各相関は $-1\le E_{xy}\le1$ なので、確率表だけからは $|S|\le4$ しか従わない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf16-chsh -->
### 定義の確認：完全に同じ答えの表

**定義の確認**として、各相関の期待値を求めます。

前節のカード模型では常に $ab=\lambda^2=1$ だから、四設定のすべてで $E_{xy}=1$ です。よって

$$
S=1+1+1-1=2.
$$

相関が完全であっても、四つを同時に足して4になるわけではありません。最後の項の符号が重要です。
<!-- definition-example-end -->

<a id="thm-qinf16-classical-chsh"></a>

<!-- formal-statement-start -->
> **定理（局所隠れ変数模型のCHSH不等式）**  
> 二設定二値の確率表 $p(a,b\mid x,y)$ が[局所隠れ変数模型](#def-qinf16-local-model)を持つなら、その[CHSH相関量](#def-qinf16-chsh)は必ず

$$
|S|\le2
$$

> を満たす。境界値2は実現可能である。
<!-- formal-statement-end -->

### 証明の見取り図

共通原因を固定すると、AliceとBobの出力平均はそれぞれ区間 $[-1,1]$ にあります。四項を二組にまとめれば、Bobの二平均の「和の絶対値＋差の絶対値」は最大でも2です。最後に共通原因について平均してもこの上界は変わりません。

<!-- proof-start -->
### 証明

各 $\lambda$、各設定に対して出力の条件付き平均を

$$
\alpha_x(\lambda)=\sum_a a\,p_A(a\mid x,\lambda),\qquad
\beta_y(\lambda)=\sum_b b\,p_B(b\mid y,\lambda)
$$

とします。各局所応答は確率分布で $a,b=\pm1$ ですから、$|\alpha_x|,|\beta_y|\le1$。因子化を $E_{xy}$ の定義へ代入し、有限和の順序を交換すると

$$
E_{xy}=\sum_\lambda\mu(\lambda)
\left(\sum_a a\,p_A(a\mid x,\lambda)\right)
\left(\sum_b b\,p_B(b\mid y,\lambda)\right)
=\sum_\lambda\mu(\lambda)\alpha_x(\lambda)\beta_y(\lambda).
$$

したがって $S$ は、各 $\lambda$ で

$$
s_\lambda=\alpha_0(\beta_0+\beta_1)
+\alpha_1(\beta_0-\beta_1)
$$

とおいた量の確率平均です。三角不等式と $|\alpha_0|,|\alpha_1|\le1$ により

$$
|s_\lambda|\le|\beta_0+\beta_1|+|\beta_0-\beta_1|
=2\max(|\beta_0|,|\beta_1|)\le2.
$$

真ん中の等式は二実数 $u,v$ について、$|u+v|+|u-v|=2\max(|u|,|v|)$ という恒等式です。例えば $|u|\ge|v|$ なら $u+v,u-v$ は $u$ と同符号（零を含む）なので和は $2|u|$ です。最後に

$$
|S|=\left|\sum_\lambda\mu(\lambda)s_\lambda\right|
\le\sum_\lambda\mu(\lambda)|s_\lambda|
\le2\sum_\lambda\mu(\lambda)=2.
$$

前節のカード模型では $S=2$ なので境界は実現します。$\square$
<!-- proof-end -->

**解釈の境界**：実験で $|S|>2$ を得たとき否定されるのは、設定独立性と条件付き因子化を含むこの模型の**同時成立**です。「何らの仮定もなくあらゆる古典模型が否定された」とは言いません。

## 4. 局所量子測定を同じ確率表へ写す

[QINF5のPOVM](../QINF5/index.md#def-qinf5-povm)では、二値の局所測定を二つの正値作用素 $M_+^x,M_-^x$（和は $I_A$）で記述できます。Bob側も $N_+^y,N_-^y$（和は $I_B$）とします。各局所Hilbert空間は有限次元で、全体は $H_A\otimes H_B$、状態は密度演算子 $\rho_{AB}$ です。

測定結果のラベル $\pm1$ を作用素へ組み込むため、$A_x=M_+^x-M_-^x$、$B_y=N_+^y-N_-^y$ と置きます。$M_\pm^x=(I_A\pm A_x)/2$ ですから $A_x$ はHermitianで、$-I_A\le A_x\le I_A$、すなわち演算子ノルムが1以下です。Bob側も同様です。射影測定で結果がちょうど $\pm1$ のときは $A_x^2=I_A$、$B_y^2=I_B$ となりますが、一般のPOVMでは二乗が恒等になるとは限りません。

<a id="def-qinf16-quantum-chsh"></a>

<!-- formal-statement-start -->
> **定義（二値量子測定の相関とCHSH作用素）**  
> 有限次元二部状態 $\rho_{AB}$ と、局所二値POVMの差から得たHermitian作用素 $A_0,A_1$（$H_A$ 上）、$B_0,B_1$（$H_B$ 上）をとる。いずれも演算子ノルムは1以下とする。設定 $(x,y)$ における同時確率は

$$
p(a,b\mid x,y)=\operatorname{Tr}\!\left[
\rho_{AB}M_a^x\otimes N_b^y\right]
$$

> で、量子相関およびCHSH作用素 $\mathcal B$ を

$$
E_{xy}=\operatorname{Tr}[\rho_{AB}(A_x\otimes B_y)],
\quad
\mathcal B=A_0\otimes(B_0+B_1)+A_1\otimes(B_0-B_1)
$$

> と定義する。このとき $S=\operatorname{Tr}(\rho_{AB}\mathcal B)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf16-quantum-chsh -->
### 定義の確認：積状態を計算基底で測る

**定義の確認**として、効果の正値性・正規化と相関を一つの例で確かめます。

$|00\rangle$ に対して全設定で $A_x=B_y=Z:=|0\rangle\langle0|-|1\rangle\langle1|$ を使います。$Z$ は計算基底で $\operatorname{diag}(1,-1)$ なので $Z^\dagger=Z$、$Z^2=I_2$。対応する効果 $M_\pm=(I\pm Z)/2$ はそれぞれ $|0\rangle,|1\rangle$ への射影であり、正値で和が $I_2$ です。積状態の期待値を因子分解すると

$$
E_{xy}=\langle00|Z\otimes Z|00\rangle
=\langle0|Z|0\rangle^2=1,\quad
\mathcal B=2Z\otimes Z,\quad S=2.
$$

作用素を定義しただけでなく、測定としての正値性・完全性と元の確率表への対応も確認できました。
<!-- definition-example-end -->

局所作用素の組 $A_x\otimes I_B$ と $I_A\otimes B_y$ は[テンソル積の局所演算](../QINF1/index.md#prop-qinf1-local-algebra)により可換です。ただしAliceの**異なる設定** $A_0,A_1$ 同士、Bobの $B_0,B_1$ 同士は可換でなくてよい点が古典模型との重要な違いです。

## 5. Tsirelson上界：量子論でも4には達しない

古典模型なら上界は2ですが、量子論ではもっと強い相関が可能です。それでも任意の確率表の代数上界4までは達しません。ここでは射影測定だけに限定せず、前節の一般の二値POVMを扱います。

<a id="thm-qinf16-tsirelson"></a>

<!-- formal-statement-start -->
> **定理（Tsirelson上界）**  
> 任意の有限次元二部密度演算子 $\rho_{AB}$ と、$H_A,H_B$ 上のHermitian収縮作用素 $A_0,A_1,B_0,B_1$（それぞれ演算子ノルム1以下）について、[CHSH作用素](#def-qinf16-quantum-chsh)の期待値は

$$
\left|\operatorname{Tr}(\rho_{AB}\mathcal B)\right|\le2\sqrt2.
$$

> 特にすべての局所二値POVMの量子CHSH相関量は $|S|\le2\sqrt2$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

純粋状態を使い、四つの局所作用素をその状態へ作用させたベクトルへ変換します。CHSH式は二つの内積へまとまり、Cauchy–Schwarzの不等式を二度使うと、ベクトルの和と差の二乗が相殺し合う構造が現れます。混合状態へは純粋状態分解の平均で拡張できます。

<!-- proof-start -->
### 証明

初めに $\rho_{AB}=|\psi\rangle\langle\psi|$、$\langle\psi|\psi\rangle=1$ とします。共通Hilbert空間 $H_A\otimes H_B$ のベクトルを

$$
u_x=(A_x\otimes I_B)|\psi\rangle,\qquad
v_y=(I_A\otimes B_y)|\psi\rangle
$$

と置きます。収縮作用素なので $\|u_x\|,\|v_y\|\le1$。局所作用素の可換性とHermitian性から

$$
E_{xy}=\langle\psi|(A_x\otimes B_y)|\psi\rangle
=\langle u_x,v_y\rangle\in\mathbb R.
$$

ゆえにCauchy–Schwarzを各項へ使うと

$$
\begin{aligned}
|S|
&=\left|\langle u_0,v_0+v_1\rangle
+\langle u_1,v_0-v_1\rangle\right|\\
&\le\|u_0\|\|v_0+v_1\|+\|u_1\|\|v_0-v_1\|\\
&\le\|v_0+v_1\|+\|v_0-v_1\|.
\end{aligned}
$$

二つの非負実数 $r,s$ に対して $(r+s)^2\le2(r^2+s^2)$ を使い、内積の交差項を打ち消す平行四辺形恒等式を適用すれば

$$
\begin{aligned}
|S|^2
&\le2\left(\|v_0+v_1\|^2+\|v_0-v_1\|^2\right)\\
&=4\left(\|v_0\|^2+\|v_1\|^2\right)\le8.
\end{aligned}
$$

したがって $|S|\le2\sqrt2$。一般の密度演算子には[QINF2の純粋状態アンサンブル表示](../QINF2/index.md#thm-qinf2-density-ensemble)を適用して $\rho_{AB}=\sum_jq_j|\psi_j\rangle\langle\psi_j|$ とします。各状態の期待値を $S_j$ とすれば $|S_j|\le2\sqrt2$ なので、

$$
|\operatorname{Tr}(\rho_{AB}\mathcal B)|
=\left|\sum_jq_jS_j\right|
\le\sum_jq_j|S_j|\le2\sqrt2.
$$

$\square$
<!-- proof-end -->

この証明では、$A_x^2=B_y^2=I$ を仮定しません。POVMの効果の差から収縮作用素が生まれることと、AliceとBobの局所作用素が可換であることだけで量子上界が出ます。

## 6. Bell対で上界を実現する

一qubit上の二つのPauli作用素を、$Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}$、$X=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ とします。$X,Z$ はHermitianで $X^2=Z^2=I_2$、$XZ=-ZX$ です。まずこれは、各設定を実際の二値射影測定にするための条件確認です。

<a id="prop-qinf16-saturation"></a>

<!-- formal-statement-start -->
> **命題（Bell状態によるTsirelson上界の達成）**  
> 二qubitの[Bell状態](../QINF13/index.md#def-qinf13-ebit) $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ に対して

$$
A_0=Z,\quad A_1=X,\qquad
B_0=\frac{Z+X}{\sqrt2},\quad B_1=\frac{Z-X}{\sqrt2}
$$

> を局所観測量に選べば、いずれも結果 $\pm1$ の射影測定を定め、[CHSH相関量](#def-qinf16-chsh)は $S=2\sqrt2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

Bobの二つの測定は $Z$ と $X$ の中間の向きです。Bell対では $Z$ と $Z$、$X$ と $X$ を測ると結果の積の平均が1で、異なる軸の組合せでは0です。この四つの値でCHSH式を作ります。

<!-- proof-start -->
### 証明

まず $B_0,B_1$ はHermitianであり、反交換関係を使うと

$$
(Z\pm X)^2=Z^2+X^2\pm(ZX+XZ)=2I_2,
\qquad B_0^2=B_1^2=I_2.
$$

従って各 $B_y$ の固有値は $\pm1$、効果 $(I\pm B_y)/2$ は正射影で和が $I$ です。Alice側も $X^2=Z^2=I_2$ から同様に正規な二値測定です。

Bell対には

$$
(Z\otimes Z)|\Phi^+\rangle=|\Phi^+\rangle,\qquad
(X\otimes X)|\Phi^+\rangle=|\Phi^+\rangle
$$

が成立します。実際、$Z\otimes Z$ は $|00\rangle,|11\rangle$ の各符号を二度掛けて変えず、$X\otimes X$ は二項を入れ替えます。一方

$$
(Z\otimes X)|\Phi^+\rangle=\frac{|01\rangle-|10\rangle}{\sqrt2},
\quad
(X\otimes Z)|\Phi^+\rangle=\frac{|10\rangle-|01\rangle}{\sqrt2}
$$

で、どちらも $|\Phi^+\rangle$ と直交します。よって量子相関は

$$
E_{00}=E_{01}=E_{10}=\frac1{\sqrt2},
\qquad E_{11}=-\frac1{\sqrt2},
$$

となります。したがって

$$
S=\frac1{\sqrt2}+\frac1{\sqrt2}
+\frac1{\sqrt2}-\left(-\frac1{\sqrt2}\right)=2\sqrt2.
$$

$\square$
<!-- proof-end -->

古典模型の上界2との隔たりは $2(\sqrt2-1)$ です。ここで必要なのは状態のもつれだけではなく、Aliceの二測定とBobの二測定がそれぞれ非可換になる選び方です。

## 7. 無信号性と、分離可能性との論理関係

局所模型の因子化より弱い性質として、一方の設定を選び直しても他方の結果の周辺分布が変わらない、という要求を考えます。Aliceの周辺分布は $p_A(a\mid x,y)=\sum_b p(a,b\mid x,y)$ なので、設定 $y$ に依存しなければBobからAliceへこの確率表だけで情報を送れません。

<a id="def-qinf16-no-signalling"></a>

<!-- formal-statement-start -->
> **定義（無信号条件）**  
> 二設定二値の条件付き確率表 $p(a,b\mid x,y)$ が**無信号**であるとは、任意の $x,y,y',a$ と $x,x',y,b$ について、それぞれ

$$
\sum_b p(a,b\mid x,y)=\sum_b p(a,b\mid x,y'),
\qquad
\sum_a p(a,b\mid x,y)=\sum_a p(a,b\mid x',y)
$$

> が成り立つことをいう。両方向の周辺分布について要求する条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf16-no-signalling -->
### 定義の確認：量子上界より大きい無信号表

**定義の確認**として、全設定で周辺分布が保たれるかを確かめます。

各設定と結果の組に、次の確率を割り当てます。

$$
p(a,b\mid x,y)=
\begin{cases}
1/2,&ab=(-1)^{xy},\\
0,&ab\ne(-1)^{xy}.
\end{cases}
$$

各設定で許される結果対は二つあり、重みの和は1で、どの確率も非負です。Aliceの二結果の周辺確率はどちらも $1/2$、Bob側も同じです。相手の設定を変えても周辺確率が変わらないため、上の無信号条件を満たします。

一方、各設定の相関は次の値です。

$$
E_{00}=E_{01}=E_{10}=1,\qquad E_{11}=-1,\qquad S=4.
$$

これは無信号ですが、[Tsirelson上界](#thm-qinf16-tsirelson)により量子実現はできません。
<!-- definition-example-end -->

<a id="prop-qinf16-separable-no-signalling"></a>

<!-- formal-statement-start -->
> **命題（分離可能状態のCHSH上界と無信号性）**  
> 有限次元二部系の任意の[分離可能状態](../QINF15/index.md#def-qinf15-separable)に局所二値POVMを施した確率表は局所隠れ変数模型を持ち、したがって $|S|\le2$ である。さらに、有限次元二部系の任意の状態へ局所POVMを施して得られる確率表は無信号である。
<!-- formal-statement-end -->

### 証明の見取り図

分離可能状態を作る積状態の番号を共通原因とみなせば、各結果確率は局所Born則の積となります。他方、無信号性は相手の全結果について足すとPOVMの効果の和が恒等作用素になることから、もつれの有無と無関係に従います。

<!-- proof-start -->
### 証明

分離可能な $\rho_{AB}=\sum_jq_j\sigma_j^A\otimes\tau_j^B$ をとり、[分離可能状態の表示](../QINF15/index.md#def-qinf15-separable)の混合番号 $j$ を $\lambda$ とします。[局所POVMのBorn則](../QINF5/index.md#def-qinf5-povm)に従い

$$
\begin{aligned}
p(a,b\mid x,y)
&=\operatorname{Tr}[\rho_{AB}(M_a^x\otimes N_b^y)]\\
&=\sum_jq_j\operatorname{Tr}(\sigma_j^AM_a^x)
\operatorname{Tr}(\tau_j^BN_b^y).
\end{aligned}
$$

各因子は非負で、$a,b$ についてそれぞれ和1です。分布 $q_j$ は設定に依存しないので、[局所模型](#def-qinf16-local-model)の全条件が成立し、[局所隠れ変数模型のCHSH不等式](#thm-qinf16-classical-chsh)より $|S|\le2$。

任意の（分離可能とは限らない）$\rho_{AB}$ でも、Bobの全結果で和を取れば

$$
\begin{aligned}
\sum_b p(a,b\mid x,y)
&=\operatorname{Tr}\left[\rho_{AB}\left(M_a^x\otimes
\sum_bN_b^y\right)\right]\\
&=\operatorname{Tr}[\rho_{AB}(M_a^x\otimes I_B)].
\end{aligned}
$$

最後の式にBobの設定 $y$ がないため、Aliceの周辺分布は $y$ に依存しません。Alice側で和を取る場合も $I_A\otimes N_b^y$ となり、Bobの周辺分布は $x$ に依存しません。$\square$
<!-- proof-end -->

以上を混同しないでください。**CHSH違反は分離可能でないことの十分条件**ですが、エンタングル状態すべてが任意の四測定で違反するわけではありません。例えば[QINF15のWerner型状態](../QINF15/index.md#thm-qinf15-werner-threshold)

$$
\rho_W(p)=(1-p)I_4/4+p|\Psi^-\rangle\langle\Psi^-|
$$

では、$p=1/2$ はエンタングル状態ですが、上のBell対用の特定の測定を $|\Psi^-\rangle$ に合う向きへ回しても $|S|=\sqrt2<2$ です。$\rho_W(p)$ での一般的な測定方向の最適化は後の統合演習で行います。また「無信号だから量子状態で実現できる」も偽で、前の確率表は反例です。

## 8. 射影測定なら作用素の交換子でも上界が見える

ここまでの上界は全POVMで成立します。結果が必ず $\pm1$ となる射影測定では $A_x^2=B_y^2=I$ なので、CHSH作用素の二乗にも特別な形があります。作用素の交換子を $[P,Q]=PQ-QP$ と記します。

<a id="lem-qinf16-chsh-square"></a>

<!-- formal-statement-start -->
> **補題（射影二値測定のCHSH作用素二乗恒等式）**  
> 有限次元局所Hilbert空間上のHermitian作用素 $A_0,A_1,B_0,B_1$ が $A_0^2=A_1^2=I_A$、$B_0^2=B_1^2=I_B$ を満たすとする。[CHSH作用素](#def-qinf16-quantum-chsh)に対して

$$
\mathcal B^2=4I_A\otimes I_B-[A_0,A_1]\otimes[B_0,B_1].
$$

> とくに一方の二設定が可換なら $\mathcal B^2=4I$ で、すべての状態について $|S|\le2$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

Bobの和と差を $C=B_0+B_1$、$D=B_0-B_1$ とすれば、$C^2+D^2=4I$、$CD=-[B_0,B_1]$、$DC=[B_0,B_1]$ です。これらを展開して交差項を交換子へまとめます。

<!-- proof-start -->
### 証明

$C=B_0+B_1$、$D=B_0-B_1$ と書きます。$B_y^2=I_B$ より

$$
C^2+D^2=(2I+B_0B_1+B_1B_0)
+(2I-B_0B_1-B_1B_0)=4I_B
$$

であり、また

$$
CD=(B_0+B_1)(B_0-B_1)=-[B_0,B_1],
\quad DC=[B_0,B_1].
$$

この順序を保って $\mathcal B=A_0\otimes C+A_1\otimes D$ を二乗すると

$$
\begin{aligned}
\mathcal B^2
&=A_0^2\otimes C^2+A_1^2\otimes D^2
+A_0A_1\otimes CD+A_1A_0\otimes DC\\
&=I_A\otimes(C^2+D^2)
-(A_0A_1-A_1A_0)\otimes[B_0,B_1]\\
&=4I_A\otimes I_B-[A_0,A_1]\otimes[B_0,B_1].
\end{aligned}
$$

一方の交換子が0なら $\mathcal B^2=4I$。$\mathcal B$ はHermitianなので固有値は $\pm2$ に限られ、任意の密度演算子による期待値の絶対値は2以下です。$\square$
<!-- proof-end -->

逆に非可換であるだけでは任意の状態が必ず違反するわけではありません。相関には状態と測定方向の両方が関係します。

## 9. 演習：確率表から量子作用素まで

<a id="ex-qinf16-a01"></a>
### QINF16-A01 四つの決定論的回答

- Level: A

Aliceが $a_0=+1,a_1=-1$、Bobが $b_0=+1,b_1=-1$ と決めている局所決定論的模型について、四つの $E_{xy}$ と $S$ を求めよ。符号を一つ変えると $|S|$ が4にできるかも答えよ。

<!-- solution-start -->
### 詳細解答

決定論的なので $E_{xy}=a_xb_y$ です。順に

$$
E_{00}=1,\quad E_{01}=-1,\quad
E_{10}=-1,\quad E_{11}=1.
$$

よって $S=1-1-1-1=-2$。任意の符号の選び方でも

$$
S=a_0(b_0+b_1)+a_1(b_0-b_1)
$$

で、$b_0,b_1\in\{\pm1\}$ なら括弧の一方は0、他方は $\pm2$。したがって常に $S=\pm2$ で $|S|=4$ にはできません。
<!-- solution-end -->

<a id="ex-qinf16-a02"></a>
### QINF16-A02 確率的応答のCHSH値

- Level: A

共通原因が一値だけの局所模型で、Aliceの出力平均を $\alpha_0=1/2,\alpha_1=-1/2$、Bobを $\beta_0=1,\beta_1=0$ とする。応答確率をそれぞれ一例ずつ構成し、$E_{xy}$ と $S$ を求めよ。

<!-- solution-start -->
### 詳細解答

結果 $\pm1$ の出力平均が $m$ なら $p(+1)=(1+m)/2$、$p(-1)=(1-m)/2$ です。Aliceの二設定ではそれぞれ $(3/4,1/4)$、$(1/4,3/4)$、Bobでは $(1,0)$、$(1/2,1/2)$ とすれば、すべて非負で和1です。局所模型の積の形から $E_{xy}=\alpha_x\beta_y$ なので

$$
E_{00}=\frac12,\quad E_{01}=0,\quad
E_{10}=-\frac12,\quad E_{11}=0,\quad S=0.
$$

確率的応答でも平均 $m\in[-1,1]$ を使えば古典上界の証明は同じです。
<!-- solution-end -->

<a id="ex-qinf16-a03"></a>
### QINF16-A03 傾斜した二値量子測定

- Level: A

$X,Z$ を本章のPauli作用素とし、$B=(Z+X)/\sqrt2$ とする。$B$ がHermitianで $B^2=I$ を満たすこと、および $N_\pm=(I\pm B)/2$ が二値POVMの効果になることを確認せよ。

<!-- solution-start -->
### 詳細解答

$X^\dagger=X$、$Z^\dagger=Z$ なので $B^\dagger=B$。行列表現を用いると $ZX=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$、$XZ=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ で、和は0。よって

$$
B^2=\frac{Z^2+ZX+XZ+X^2}{2}=\frac{2I}{2}=I.
$$

従って $B$ の固有値は $\pm1$ です。各固有空間上で $(I\pm B)/2$ の固有値は0または1なので効果は正値で、$N_++N_-=I$。さらに $N_\pm^2=N_\pm$ だから射影POVMです。
<!-- solution-end -->

<a id="ex-qinf16-a04"></a>
### QINF16-A04 Bell対の交差相関

- Level: A

$|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ について、$\langle Z\otimes Z\rangle$、$\langle X\otimes X\rangle$、$\langle Z\otimes X\rangle$、$\langle X\otimes Z\rangle$ を基底への作用から求めよ。

<!-- solution-start -->
### 詳細解答

$Z\otimes Z$ は $|00\rangle$、$|11\rangle$ をともに固有値1で保ちます。$X\otimes X$ は二つを交換するので、どちらもBell対を不変にします。従って前二つの期待値は1です。一方、

$$
(Z\otimes X)|\Phi^+\rangle=(|01\rangle-|10\rangle)/\sqrt2,
$$

$$
(X\otimes Z)|\Phi^+\rangle=(|10\rangle-|01\rangle)/\sqrt2.
$$

これらは $|00\rangle,|11\rangle$ と直交し、元のBell対との内積は0です。従って後二つの期待値は0です。
<!-- solution-end -->

<a id="ex-qinf16-a05"></a>
### QINF16-A05 無信号でも古典模型ではない

- Level: A

各設定 $(x,y)$ で $ab=(-1)^{xy}$ を満たす二対に確率 $1/2$ ずつを与える。$(x,y)=(0,1)$ と $(1,1)$ の確率表を書き、無信号条件とCHSH値を調べよ。

<!-- solution-start -->
### 詳細解答

$(0,1)$ では $xy=0$ だから $(a,b)=(+,+),(-,-)$ が各 $1/2$、他は0です。$(1,1)$ では $xy=1$ なので $(+,-),(-,+)$ が各 $1/2$、他は0です。いずれもAlice・Bobの周辺分布は各結果 $1/2$。残る二設定も積が $+1$ の同じ二対なので、設定の変更でどちらの周辺分布も変わりません。

各設定で $ab$ は確率1で $(-1)^{xy}$ だから

$$
(E_{00},E_{01},E_{10},E_{11})=(1,1,1,-1),\quad S=4.
$$

[古典CHSH上界](#thm-qinf16-classical-chsh)にも[量子Tsirelson上界](#thm-qinf16-tsirelson)にも反するため、無信号性だけではそのどちらも保証できません。
<!-- solution-end -->

<a id="ex-qinf16-b01"></a>
### QINF16-B01 混合状態のTsirelson評価を再導出する

- Level: B

有限次元二部系のHermitian収縮作用素 $A_0,A_1,B_0,B_1$ と任意の密度演算子 $\rho$ を考える。純粋状態について局所作用素をベクトルへ写して $|S|\le2\sqrt2$ を導き、混合状態へ拡張せよ。射影性 $A_x^2=B_y^2=I$ は仮定しない。

<!-- solution-start -->
### 詳細解答

純粋状態 $|\psi\rangle$ のとき、$u_x=(A_x\otimes I)|\psi\rangle$、$v_y=(I\otimes B_y)|\psi\rangle$ とすると、収縮性から各ノルムは1以下です。局所作用素の可換性により $E_{xy}=\langle u_x,v_y\rangle$ ですから

$$
|S|\le\|v_0+v_1\|+\|v_0-v_1\|.
$$

実数のCauchy–Schwarzと平行四辺形恒等式を順に適用すると

$$
|S|^2\le2(\|v_0+v_1\|^2+\|v_0-v_1\|^2)
=4(\|v_0\|^2+\|v_1\|^2)\le8.
$$

密度行列は[純粋状態の有限確率混合](../QINF2/index.md#thm-qinf2-density-ensemble) $\rho=\sum_jq_j|\psi_j\rangle\langle\psi_j|$ なので、

$$
|S(\rho)|=\left|\sum_jq_jS(\psi_j)\right|
\le\sum_jq_j\,2\sqrt2=2\sqrt2.
$$

二乗が恒等であることは一度も使っておらず、全二値POVMが対象です。
<!-- solution-end -->

<a id="ex-qinf16-b02"></a>
### QINF16-B02 分離可能状態の二設定相関

- Level: B

$\rho=\frac13|00\rangle\langle00|+\frac23|++\rangle\langle++|$、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ とし、$A_0=B_0=Z$、$A_1=B_1=X$ とする。密度行列の分離可能性を確認し、四相関とCHSH値を求めよ。

<!-- solution-start -->
### 詳細解答

二項は正規化した積純粋状態への射影で、重みは非負で総和1ですから[分離可能状態の定義](../QINF15/index.md#def-qinf15-separable)を満たします。積状態では $\langle A\otimes B\rangle=\langle A\rangle_A\langle B\rangle_B$ です。$|0\rangle$ では $\langle Z\rangle=1,\langle X\rangle=0$、$|+\rangle$ では $\langle Z\rangle=0,\langle X\rangle=1$ なので

$$
E_{00}=\tfrac13(1)(1)+\tfrac23(0)(0)=\tfrac13,
\quad E_{01}=E_{10}=0,
$$

$$
E_{11}=\tfrac13(0)(0)+\tfrac23(1)(1)=\tfrac23.
$$

従って $S=1/3-2/3=-1/3$ です。[分離可能状態の上界](#prop-qinf16-separable-no-signalling)とも一致して $|S|\le2$ です。
<!-- solution-end -->

<a id="ex-qinf16-b03"></a>
### QINF16-B03 交換子を使った別証明

- Level: B

局所二値射影測定 $A_0,A_1,B_0,B_1$（Hermitian、各二乗は恒等）に対し、$\mathcal B^2=4I-[A_0,A_1]\otimes[B_0,B_1]$ を導け。また $\|PQ\|\le\|P\|\|Q\|$ と $\|P+Q\|\le\|P\|+\|Q\|$ を用いて $\|\mathcal B\|\le2\sqrt2$ を示せ。

<!-- solution-start -->
### 詳細解答

$C=B_0+B_1,D=B_0-B_1$ と置くと

$$
C^2+D^2=4I,\quad CD=-[B_0,B_1],\quad DC=[B_0,B_1].
$$

よって四項に展開した $\mathcal B^2$ は

$$
\begin{aligned}
\mathcal B^2&=A_0^2\otimes C^2+A_1^2\otimes D^2
+A_0A_1\otimes CD+A_1A_0\otimes DC\\
&=4I-[A_0,A_1]\otimes[B_0,B_1].
\end{aligned}
$$

Hermitianで二乗が $I$ の各作用素のノルムは1ですから

$$
\|[A_0,A_1]\|\le\|A_0A_1\|+\|A_1A_0\|\le2
$$

であり、Bob側も同様。従って

$$
\|\mathcal B\|^2=\|\mathcal B^2\|
\le4+\|[A_0,A_1]\|\|[B_0,B_1]\|\le8.
$$

$\mathcal B$ はHermitianなので $\|\mathcal B^2\|=\|\mathcal B\|^2$ であり、結論は $\|\mathcal B\|\le2\sqrt2$ です。一般のPOVMは二乗が $I$ とは限らないため、この二乗恒等式による証明は射影測定に限ります。
<!-- solution-end -->

<a id="ex-qinf16-b04"></a>
### QINF16-B04 四組を異なる数で測るときの統計

- Level: B

各設定 $(x,y)$ を別々に $N_{xy}\ge1$ 回測定し、結果 $ab=+1$ の回数を $n^+_{xy}$、$ab=-1$ を $n^-_{xy}$ とする（$n^+_{xy}+n^-_{xy}=N_{xy}$）。標本相関 $\widehat E_{xy}$ と標本CHSH値 $\widehat S$ を定義し、局所模型が成立する場合でも有限標本で $|\widehat S|>2$ が起こり得る理由を述べよ。

<!-- solution-start -->
### 詳細解答

各組の標本平均は

$$
\widehat E_{xy}=\frac1{N_{xy}}\sum_{i=1}^{N_{xy}}a_ib_i
=\frac{n^+_{xy}-n^-_{xy}}{N_{xy}}.
$$

従って $\widehat S=\widehat E_{00}+\widehat E_{01}+\widehat E_{10}-\widehat E_{11}$ です。例えば各設定を一回ずつ測り、$ab$ が順に $+1,+1,+1,-1$ となれば $\widehat S=4$。局所模型でも各設定の結果に乱数性があれば、この四つの観測結果がそれぞれ正確率で生じることはあり得ます。[古典CHSH定理](#thm-qinf16-classical-chsh)が制約するのは条件付き確率から計算した真の相関 $E_{xy}$ であり、四組それぞれの有限標本の実現値ではありません。統計的主張には試行の抽出法・設定選択・誤差評価が別途必要です。
<!-- solution-end -->

<a id="ex-qinf16-c01"></a>
### QINF16-C01 もつれとCHSH違反の二つの境界

- Level: C

二qubitで $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$、$0\le p\le1$ とし、

$$
\rho_p=(1-p)I_4/4+p|\Phi^+\rangle\langle\Phi^+|
$$

を考える。

1. 密度演算子として正しいこと、および両側縮約を確認せよ。
2. Bob側部分転置の固有値から、$p>1/3$ のときエンタングル状態であることを示せ。$p\le1/3$ の分離可能性は[QINF15のWerner型分解](../QINF15/index.md#thm-qinf15-werner-threshold)と局所ユニタリ同値を使ってよい。
3. 第6節の四つの測定で $S=2\sqrt2\,p$ となることを示し、CHSH違反の範囲を求めよ。
4. さらに全ての**非自明なqubit射影二値測定**、すなわち各観測量が $\boldsymbol a\cdot(X,Y,Z)$（$\boldsymbol a$ は長さ1の実三次元ベクトル）の形である場合について、最大 $|S|$ が $2\sqrt2\,p$ であることを証明せよ。ただし $Y=\begin{pmatrix}0&-i\\i&0\end{pmatrix}$。同じ状態について「エンタングルだがCHSH違反しない」パラメータ帯を説明せよ。

<!-- solution-start -->
### 詳細解答

**（1）** $I_4/4$ とBell射影はいずれも正値・トレース1であり、$0\le p\le1$ の確率混合も同様です。Bell方向の固有値は $(1+3p)/4$、直交する三方向は $(1-p)/4$ です。[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)を使うと双方の項の片側縮約は $I_2/2$ なので、$\rho_A=\rho_B=I_2/2$。

**（2）** 計算基底 $00,01,10,11$ での行列は

$$
\rho_p=\begin{pmatrix}
(1+p)/4&0&0&p/2\\
0&(1-p)/4&0&0\\
0&0&(1-p)/4&0\\
p/2&0&0&(1+p)/4
\end{pmatrix}.
$$

[部分転置](../QINF15/index.md#def-qinf15-partial-transpose)は外側の非対角要素を中央へ移すので、部分転置の固有値は $(1+p)/4$ が三個、$(1-3p)/4$ が一個です。$p>1/3$ で最後が負となり、[PPT必要条件](../QINF15/index.md#thm-qinf15-ppt-necessary)によりエンタングル状態です。$0\le p\le1/3$ では、[QINF15の局所ユニタリによる積状態分解](../QINF15/index.md#thm-qinf15-werner-threshold)により分離可能です。

**（3）** $I_4/4$ からのPauli積の期待値は $\operatorname{Tr}(I_4(A_x\otimes B_y))/4=0$ です。両側の観測量はトレース0なので、積のトレースも0です。したがって各相関は第6節のBell純粋状態の $p$ 倍となり、

$$
S=p\left(\frac1{\sqrt2}+\frac1{\sqrt2}+\frac1{\sqrt2}
-\left(-\frac1{\sqrt2}\right)\right)=2\sqrt2\,p.
$$

よってこの測定では $p>1/\sqrt2$ でのみ2を超えます。

**（4）** 三つのPauli行列の積を直接使うとBell対では

$$
\langle X\otimes X\rangle=1,\qquad
\langle Y\otimes Y\rangle=-1,\qquad
\langle Z\otimes Z\rangle=1
$$

で、異なるPauli軸の積の期待値は0です。例えば $Y\otimes Y$ は $|00\rangle\mapsto-|11\rangle$、$|11\rangle\mapsto-|00\rangle$ と作用するので $-1$、異なる軸では $|00\rangle,|11\rangle$ の組と直交するか、二項の位相が相殺します。従って $\boldsymbol a,\boldsymbol b$ を単位実ベクトルとすると

$$
E(\boldsymbol a,\boldsymbol b)
=p\,\boldsymbol a\cdot T\boldsymbol b,\qquad
T=\operatorname{diag}(1,-1,1).
$$

$T$ は直交行列なので $|T\boldsymbol b|=1$。Bobの二方向を $\boldsymbol b_0,\boldsymbol b_1$ として、Aliceの各単位方向を最適化すると

$$
|S|\le p\left(
|\boldsymbol b_0+\boldsymbol b_1|+
|\boldsymbol b_0-\boldsymbol b_1|\right).
$$

二つの和差の二乗和は $4$ なので、その和は Cauchy–Schwarz より最大 $2\sqrt2$。等号は $\boldsymbol b_0\cdot\boldsymbol b_1=0$ とし、Aliceの方向を $T(\boldsymbol b_0\pm\boldsymbol b_1)$ の正規化ベクトルへ選べば実現します。従って非自明なqubit射影二値測定の最大値は $2\sqrt2 p$。

特に $1/3<p\le1/\sqrt2$ の状態はエンタングル状態でも、この二設定二値の非自明な射影測定ではCHSH違反しません。エンタングルメントの判定とBell非局所性の検出は同じ検査ではないのです。
<!-- solution-end -->

## 10. 何を検査すればよいか

確率表が渡されたら、まず各設定での正規化を確かめ、四相関から $S$ を計算します。$|S|>2$ なら、設定と独立な共通原因と局所的応答の積からなる模型は排除されます。量子状態・測定が与えられたら、局所POVMから $A_x,B_y$ を導いて $\mathcal B$ の期待値を計算し、必ず $|S|\le2\sqrt2$ と照合します。無信号性は周辺分布の等式を別に確認します。

本章の結論は「もつれ＝どの実験でもCHSH違反」ではありません。局所模型が許す確率表、量子論が許す確率表、無信号な確率表はそれぞれ異なる範囲です。次のQINF17「von Neumannエントロピー」では、相関の可否とは別に、量子状態の混合と情報量を数値化します。
