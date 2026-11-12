# AQFT6 Weyl CCRと局所C*net

[AQFT5で作った交代形式](../AQFT5/index.md#def-aqft5-causal-symplectic)は古典的な自由度 $F,G$ の組に実数 $\sigma(F,G)$ を割り当てます。[局所直交性](../AQFT5/index.md#prop-aqft5-local-orthogonality)から、空間的に分離した領域の源ならこの値が零になることも分かりました。しかしこれだけでは[AQFT2のEinstein局所性](../AQFT2/index.md#def-aqft2-locality)が要求する**量子観測量の可換性**はまだ導けません。

非有界な場 $\Phi(F)$ の積を最初から扱うと、共通の定義域の問題が立ちはだかります。本講ではまず有界なユニタリ $W(F)$ を作り、その積の位相に $\sigma$ を組み込むことでこの障害を避けます。抽象的な関係式を宣言するだけでなく、実際に作用素で構成し、時空領域ごとに共通のC*環の部分環を割り当てます。

## 1. 古典的な入力を確定する

舞台は未来向きを $t$ の増加方向とした四次元Minkowski時空 $M=\mathbb R^{1,3}$、計量符号は $(-,+,+,+)$ です。質量 $m\ge0$ として
$$
P=\partial_t^2-\Delta_{\boldsymbol x}+m^2,\quad
\mathcal D=C_c^\infty(\mathbb R^{1,3},\mathbb R),\quad
\mathcal V=\mathcal D/P\mathcal D
$$
とします。$E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ の順序を固定すると、[AQFT5の形式](../AQFT5/index.md#def-aqft5-causal-symplectic)は
$$
\sigma([f],[g])=-\int_{\mathbb R^{1,3}}f(Eg)\,d^4x.
$$
ここで $\mathcal V$ は実ベクトル空間、$\sigma$ は実数値双線形・交代・非退化形式です。$F,G,H$ は商 $\mathcal V$ の元、$f,g$ は試験関数の代表元と区別します。

開領域 $O$ に対応する[局所商の像](../AQFT4/index.md#def-aqft4-local-quotient)は
$$
\mathcal V(O)=q(\mathcal D(O)),\qquad
q(f)=[f],\qquad
\mathcal D(O)=\{f\in\mathcal D:\operatorname{supp}f\subset O\}.
$$
ここで局所像の核は $\mathcal D(O)\cap P\mathcal D$ であり、一般に $\mathcal D(O)/P\mathcal D(O)$ と同一視しません。既習の結果は
$$
\begin{aligned}
O_1\subset O_2&\ \Longrightarrow\
\mathcal V(O_1)\subset\mathcal V(O_2),\\
O_1\subset O_2'&\ \Longrightarrow\
\sigma(\mathcal V(O_1),\mathcal V(O_2))=0.
\end{aligned}
$$
次に、上の数値的な零性を**作用素の交換**へ移します。

## 2. Weylの正準交換関係

[QM8のWeyl関係](../../QM/QM8/index.md#def-qm8-weyl-relations)では、位置と運動量に対応する強連続な1パラメータ群 $U(a),V(b)$（各元はユニタリ作用素）から有界な作用素を作りました。ここでは無限次元にもなる自由Klein–Gordon場の商へ進むため、まず**積と随伴の代数的関係だけ**を課します。QM8で仮定した強連続性は、この関係からは従いません。第5節で「規則性」として改めて判定します。

二つの自由度を「足す」操作を、そのまま作用素の積へ移すと $\sigma$ が消えてしまいます。足し算に複素位相を付けるのがWeyl関係です。$\sigma$ が実数値だから位相の絶対値は $1$ です。ここで[単位的C*環](../../OA/OA3/index.md#def-oa3-cstar-algebra)はノルムと随伴を備えた環、[ユニタリ元](../../OA/OA3/index.md#def-oa3-unitary)は随伴が逆元となる元です。

<a id="def-aqft6-weyl-ccr"></a>

<!-- formal-statement-start -->
> **定義（Weylの正準交換関係）**  
> 実ベクトル空間 $\mathcal V$ とその実数値交代双線形形式 $\sigma$ に対し、単位的C*環 $\mathfrak B$ のユニタリ元 $W(F)$（$F\in\mathcal V$）がすべての $F,G$ に対して
$$
W(0)=1,\qquad W(F)^*=W(-F),\qquad
W(F)W(G)=e^{-i\sigma(F,G)/2}W(F+G)
$$
> を満たすとき、符号 $-\sigma/2$ の Weyl CCR を満たすという。ユニタリとは $W(F)W(F)^*=W(F)^*W(F)=1$ を意味する。
<!-- formal-statement-end -->

この位相符号は $E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ および $\sigma=-\int fEg$ と一緒に固定します。$\sigma(F,F)=0$ なので
$$
W(F)W(-F)
=e^{-i\sigma(F,-F)/2}W(0)=1
$$
となり、随伴と逆元の規則は整合します。

<!-- definition-example-start: def-aqft6-weyl-ccr -->
### 直接例：位相が逆順で反転する

**定義の確認**。まず二次元の具体的な作用素を作り、ユニタリ性・積・逆元を検算してから位相の符号を読みます。

二次元実空間 $V_0=\mathbb R^2$ 上で、座標 $K=(q,p)$、$J=(q',p')$ に対し $\sigma_0(K,J)=qp'-pq'$ と置きます。各座標に線形で $\sigma_0(K,K)=0$ なので実交代双線形形式です。$V_0$ を加法群として離散的に扱い、$\ell^2(V_0)$ の正規直交基底を $\delta_H$（$H\in V_0$）と書いて
$$
W_0(K)\delta_H=e^{-i\sigma_0(K,H)/2}\delta_{K+H}
$$
と定めます。$H\mapsto K+H$ が全単射で位相の絶対値が $1$ だから、有限線形結合のノルムと基底の全体が保たれ、$W_0(K)$ は全空間にユニタリとして延長されます。$W_0(0)=I$ です。また任意の $K,J,H$ について
$$
\begin{aligned}
W_0(K)W_0(J)\delta_H
&=e^{-i\{\sigma_0(J,H)+\sigma_0(K,J+H)\}/2}\delta_{K+J+H}\\
&=e^{-i\sigma_0(K,J)/2}W_0(K+J)\delta_H,
\end{aligned}
$$
ここで二行目は交代形式の双線形性によります。$J=-K$ とすれば $\sigma_0(K,-K)=0$ なので $W_0(K)W_0(-K)=I$、逆順も同様で、ユニタリ性から $W_0(K)^*=W_0(-K)$ です。

特に $F=(1,0)$、$G=(0,1)$ を取ると $\sigma_0(F,G)=1$、$\sigma_0(G,F)=-1$ だから
$$
W_0(F)W_0(G)=e^{-i/2}W_0(1,1),\qquad
W_0(G)W_0(F)=e^{i/2}W_0(1,1).
$$
これは実在する二次元模型で定義の各条件を確認した例です。第3節では任意の実交代形式へ同じ構成を拡張します。Minkowski場の物理的な真空表示を作ったという意味ではありません。
<!-- definition-example-end -->

三つの積に対して結合律が壊れないことも計算しましょう。$c(F,G)=e^{-i\sigma(F,G)/2}$ とおけば
$$
c(F,G)c(F+G,H)=c(G,H)c(F,G+H)
$$
です。左の指数の括弧内は $\sigma(F,G)+\sigma(F,H)+\sigma(G,H)$、右も $\sigma(G,H)+\sigma(F,G)+\sigma(F,H)$ で一致します。これは双線形性が保証する整合性です。

## 3. 有界作用素でWeyl関係を実現する

$\mathcal V$ を加法群として**離散的**に扱い、$\mathcal H_{\mathrm d}=\ell^2(\mathcal V)$ を考えます。$\mathcal V$ は非可算でも構いません。元 $H$ の位置だけ $1$ の正規直交基底を $\delta_H$ と記します。各 $F$ はラベルを $F$ だけ移動させる作用素を定めます。

<a id="prop-aqft6-twisted-translation"></a>

<!-- formal-statement-start -->
> **命題（Weyl関係を満たす有界な模型）**  
> 任意の実交代双線形形式 $(\mathcal V,\sigma)$ に対して、$\ell^2(\mathcal V)$ 上の作用素
$$
L(F)\delta_H=e^{-i\sigma(F,H)/2}\delta_{F+H}
$$
> はユニタリであり、$L(0)=I$、$L(F)^*=L(-F)$ および上記の Weyl CCR を満たす。また $F\ne G$ なら $L(F)\ne L(G)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

ラベルの移動 $H\mapsto F+H$ は全単射で、掛ける位相の絶対値は $1$ です。従って各 $L(F)$ はノルムを保ちます。積の位相差は $\sigma$ の双線形性で計算できます。

<!-- proof-start -->
### 証明

有限線形結合 $\xi=\sum_Ha_H\delta_H$ に対して
$$
\|L(F)\xi\|^2=\sum_H|a_H|^2=\|\xi\|^2
$$
です。有限線形結合は $\ell^2(\mathcal V)$ に稠密なので $L(F)$ は等長な有界作用素へ延長されます。$H\mapsto F+H$ は全射であるため、像は全基底を含み、延長はユニタリです。

任意の基底ベクトルについて
$$
\begin{aligned}
L(F)L(G)\delta_H
&=e^{-i\sigma(G,H)/2}e^{-i\sigma(F,G+H)/2}\delta_{F+G+H}\\
&=e^{-i\sigma(F,G)/2}e^{-i\sigma(F+G,H)/2}\delta_{F+G+H}\\
&=e^{-i\sigma(F,G)/2}L(F+G)\delta_H.
\end{aligned}
$$
二行目は $\sigma(F,G+H)=\sigma(F,G)+\sigma(F,H)$ と $\sigma(F+G,H)=\sigma(F,H)+\sigma(G,H)$ によります。稠密な線形包で一致する有界作用素は全空間で一致します。$L(0)\delta_H=\delta_H$ であり、$\sigma(F,-F)=0$ から $L(F)L(-F)=L(-F)L(F)=I$、従って $L(F)^*=L(-F)$ です。最後に $L(F)\delta_0=\delta_F$ より、異なるラベルは異なる作用素です。
<!-- proof-end -->

これで関係式を満たす作用素が**実際に存在する**ことを確かめました。[単位的C*環](../../OA/OA3/index.md#def-oa3-cstar-algebra)の具体例である $B(\mathcal H_{\mathrm d})$ の中で、これらの作用素を生成元としてノルム閉包を取れます。この離散模型が真空表示や正エネルギー表示だという主張はまだしていません。

<a id="prop-aqft6-weyl-commutator"></a>

<!-- formal-statement-start -->
> **命題（Weyl交換子の位相判定）**  
> Weyl CCRを満たす $W$ に対して
$$
W(F)W(G)=e^{-i\sigma(F,G)}W(G)W(F)
$$
> および
$$
[W(F),W(G)]
=-2i\sin\!\left(\frac{\sigma(F,G)}2\right)W(F+G)
$$
> が成立する。特定の二元が可換となる必要十分条件は $\sigma(F,G)\in2\pi\mathbb Z$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Weyl積を両順序で展開し、同じ $W(F+G)$ の係数を比較します。

<!-- proof-start -->
### 証明

交代性から $\sigma(G,F)=-\sigma(F,G)$ です。よって
$$
\begin{aligned}
W(F)W(G)&=e^{-i\sigma(F,G)/2}W(F+G),\\
W(G)W(F)&=e^{i\sigma(F,G)/2}W(F+G).
\end{aligned}
$$
二式の比が $e^{-i\sigma(F,G)}$ であり、差は $(e^{-is/2}-e^{is/2})W(F+G)=-2i\sin(s/2)W(F+G)$（$s=\sigma(F,G)$）です。$W(F+G)$ はユニタリで零ではないので、交換子が零なのは $\sin(s/2)=0$、すなわち $s\in2\pi\mathbb Z$ の場合に限ります。
<!-- proof-end -->

**一組の可換性と局所代数全体の可換性は別です。** $\sigma(F,G)=2\pi$ でも $W(F)$ と $W(G)$ は可換です。しかしすべての実数 $t$ について $W(tF)$ と $W(G)$ が可換なら、$e^{-it\sigma(F,G)}=1$ が任意の $t$ に成立しなければなりません。$\sigma(F,G)\ne0$ なら $t=\pi/\sigma(F,G)$ で左辺が $-1$ となるので矛盾します。局所性では、全組の $\sigma=0$ という**より強い**情報を使います。

## 4. 局所C*netを生成する

[AQFT2の局所C*代数の割当て](../AQFT2/index.md#def-aqft2-local-assignment)を、具体的なWeyl作用素で作ります。$C^*(S)$ を、集合 $S$ と単位元を含む *-多項式の作用素ノルム閉包とします。すべての $L(F)$ が同じ $B(\ell^2(\mathcal V))$ 内にあることを利用します。

<a id="def-aqft6-local-weyl-net"></a>

<!-- formal-statement-start -->
> **定義（自由Klein–Gordon場の局所Weyl C*net）**  
> 第1節の $(\mathcal V,\sigma,\mathcal V(O))$ と第3節の $L(F)$ を固定する。各開領域 $O\subset M$ に
$$
\mathfrak A_{\mathrm W}(O)
=C^*(\{L(F):F\in\mathcal V(O)\})\subset B(\ell^2(\mathcal V))
$$
> を対応させる。全域の環は $\mathfrak A_{\mathrm W}=C^*(\{L(F):F\in\mathcal V\})$ である。各領域のC*代数は同じ単位元 $I$ を共有し、$\mathfrak A_{\mathrm W}(\varnothing)=\mathbb CI$ とする。
<!-- formal-statement-end -->

局所元は全域の商 $\mathcal V$ の元です。$f'=f+P\varphi$（$\varphi\in\mathcal D$）なら $[f']=[f]$ なので $L([f'])=L([f])$、つまり代表元を変えても作用素は変わりません。$\varphi$ の台が $O$ に含まれない場合、$f'$ 自身の台が外へ拡がっても、**$f$ という局所代表がある**ため $[f']\in\mathcal V(O)$ です。

<!-- definition-example-start: def-aqft6-local-weyl-net -->
### 直接例：二つの入れ子のdouble cone

**定義の確認**。局所部分空間の包含、生成元の随伴、C*閉包と空集合の単位元を順に確認します。

$O_r=\{(t,\boldsymbol x):|t|+|\boldsymbol x|<r\}$ と $O_R$（$0<r<R$）を取ります。[AQFT1のdouble cone](../AQFT1/index.md#def-aqft1-double-cone)で $O_r\subset O_R$ です。$f\in\mathcal D(O_r)$ なら同じ台が $O_R$ にも含まれるので
$$
[f]\in\mathcal V(O_r)\subset\mathcal V(O_R).
$$
従って $L([f])$ は両領域のC*代数の生成元です。$-f$ も局所源だから随伴 $L([f])^*=L([-f])$ も入ります。生成された環は和・積・随伴とノルム極限で閉じ、単位元を共有します。空集合では $\mathcal D(\varnothing)=\{0\}$ より $\mathfrak A_{\mathrm W}(\varnothing)=\mathbb CI$ です。
<!-- definition-example-end -->

<a id="thm-aqft6-haag-kastler"></a>

<!-- formal-statement-start -->
> **定理（Weyl netの包含単調性・局所性・共変性）**  
> 四次元Minkowski時空上で未来向きを固定し、$m\ge0$、$P=-\Box_g+m^2$、$E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$、$\sigma=-\int fEg$ による上記の局所Weyl C*netを取る。このとき次が成立する。
>
> 1. $O_1\subset O_2$ なら $\mathfrak A_{\mathrm W}(O_1)\subset\mathfrak A_{\mathrm W}(O_2)$。
> 2. $O_1\subset O_2'$ なら任意の $A\in\mathfrak A_{\mathrm W}(O_1)$、$B\in\mathfrak A_{\mathrm W}(O_2)$ に対して $[A,B]=0$。
> 3. 固有・未来向きPoincaré変換 $h$ ごとにC*自己同型 $\alpha_h$ があり、$\alpha_h(\mathfrak A_{\mathrm W}(O))=\mathfrak A_{\mathrm W}(hO)$、$\alpha_{h_1h_2}=\alpha_{h_1}\alpha_{h_2}$。
>
> 従って[AQFT2のHaag–Kastler型net](../AQFT2/index.md#def-aqft2-haag-kastler)の具体例である。
<!-- formal-statement-end -->

### 証明の見取り図

局所源の包含から生成環の包含が従います。局所性には[AQFT5の直交性](../AQFT5/index.md#prop-aqft5-local-orthogonality)を[Weyl交換子公式](#prop-aqft6-weyl-commutator)へ代入し、有限多項式とノルム極限まで延長します。共変性は[AQFT5の形式保存](../AQFT5/index.md#prop-aqft5-poincare-symplectic)を使って証明します。

<!-- proof-start -->
### 証明

**包含**。$O_1\subset O_2$ なら $\mathcal D(O_1)\subset\mathcal D(O_2)$、従って $\mathcal V(O_1)\subset\mathcal V(O_2)$ です。小さい方の全生成元は大きい方の生成元でもあるため、有限 *-多項式とそのノルム閉包について包含が成立します。

**局所性**。$F\in\mathcal V(O_1)$、$G\in\mathcal V(O_2)$ とします。$O_1\subset O_2'$ なので[AQFT5の局所直交性](../AQFT5/index.md#prop-aqft5-local-orthogonality)から $\sigma(F,G)=0$ です。従って
$$
[L(F),L(G)]=-2i\sin(0/2)L(F+G)=0.
$$
$-F,-G$ もそれぞれの局所部分空間にあるので、随伴を含む全生成元同士が可換です。分配法則で任意の有限 *-多項式 $A_n,B_n$ が可換となります。$A_n\to A$、$B_n\to B$ を作用素ノルム収束とすると
$$
\begin{aligned}
\|[A,B]-[A_n,B_n]\|
&\le2\|A-A_n\|\|B\|+2\|A_n\|\|B-B_n\|\longrightarrow0.
\end{aligned}
$$
ここで収束列 $(A_n)$ はノルム有界です。よって $[A,B]=0$ です。

**共変性**。[AQFT4の商共変性](../AQFT4/index.md#prop-aqft4-poincare)により $h$ は実線形同型 $T_h:\mathcal V\to\mathcal V$ を誘導し、$T_h\mathcal V(O)=\mathcal V(hO)$、$T_{h_1h_2}=T_{h_1}T_{h_2}$ です。また[AQFT5のシンプレクティック保存](../AQFT5/index.md#prop-aqft5-poincare-symplectic)から $\sigma(T_hF,T_hG)=\sigma(F,G)$ です。基底を置換するユニタリ
$$
U_h\delta_F=\delta_{T_hF}
$$
を定めます。任意の $H$ について
$$
\begin{aligned}
U_hL(F)U_h^*\delta_H
&=e^{-i\sigma(F,T_h^{-1}H)/2}\delta_{T_hF+H}\\
&=e^{-i\sigma(T_hF,H)/2}\delta_{T_hF+H}
=L(T_hF)\delta_H.
\end{aligned}
$$
従って $\alpha_h(A)=U_hAU_h^*$ は $\mathfrak A_{\mathrm W}$ の積・随伴を保存し、逆写像 $\alpha_{h^{-1}}$ を持つ自己同型です。$\alpha_h$ は各局所生成集合を $\mathcal V(hO)$ の生成集合へ写すため、局所代数の等式が成立します。$U_{h_1h_2}=U_{h_1}U_{h_2}$ から群作用の法則も成立します。
<!-- proof-end -->

これで自由Klein–Gordon場に対して三つの局所net条件を**実際に証明**しました。しかし離散模型の共変ユニタリは物理的な正エネルギー表現や真空を保証しません。[AQFT3の真空条件](../AQFT3/index.md#def-aqft3-vacuum)は追加条件です。次節ではなぜ表現の選択が本質的かを確認します。


## 5. 規則的表現と場演算子の境界

前節のWeyl元は有界なので積とノルム極限が問題なく扱えます。ここからの $t\in\mathbb R$ は第1節の時空の時間座標とは異なり、固定した $F$ を実数倍するときのパラメータです。一方、場演算子を
$$
W(tF)=e^{it\Phi(F)}
$$
のように考えるには、$t$ を連続的に変えた際の振る舞いが必要です。Weyl関係から $\sigma(F,F)=0$ を用いれば
$$
L(tF)L(sF)=L((t+s)F)
$$
となるので、各方向 $F$ ごとにはユニタリ作用素の一パラメータ群が得られます。しかし、この積の等式だけでは $t\mapsto L(tF)$ の強連続性は得られません。[QM7の強連続1パラメータユニタリ群](../../QM/QM7/index.md#def-qm7-strongly-continuous-unitary-group)では、群の法則とは別にベクトルごとのノルム連続性を要求しました。ここでHilbert空間 $\mathcal H$ 上の単位的 *-表現とは、[OA3の単位的 *-準同型](../../OA/OA3/index.md#def-oa3-unital-star-hom)と同様に和・積・随伴を保つ写像 $\pi:\mathfrak A_{\mathrm W}\to B(\mathcal H)$ で、$\pi(I)=I_{\mathcal H}$ を満たすものです。

<a id="def-aqft6-regular-representation"></a>

<!-- formal-statement-start -->
> **定義（Weyl CCRの規則的表現）**  
> $\mathfrak A_{\mathrm W}$ のHilbert空間 $\mathcal H$ 上の単位的 *-表現 $\pi$ が規則的（regular）であるとは、任意の $F\in\mathcal V$ について
$$
t\longmapsto\pi(L(tF))
$$
> が強連続、すなわち任意の $\xi\in\mathcal H$ に対して $\|\pi(L(tF))\xi-\xi\|\to0$（$t\to0$）となることをいう。
<!-- formal-statement-end -->

規則的な表現であれば、[QM7のStone定理](../../QM/QM7/index.md#thm-qm7-stone)をこの強連続な一パラメータ群に適用でき、一意な自己共役作用素 $\Phi_\pi(F)$ が存在して
$$
\pi(L(tF))=e^{it\Phi_\pi(F)}
$$
と書けます。ただし右辺の $\Phi_\pi(F)$ は一般に**非有界**であり、その定義域はHilbert空間全体とは限りません。異なる $F,G$ に対する場の交換子を $i\sigma(F,G)I$ と微分で取り出すときにも、適切な共通定義域を確保する必要があります。本講は有界なWeyl関係の段階でその問題を回避しています。

<!-- definition-example-start: def-aqft6-regular-representation -->
### 直接例：二次元のSchrödinger表示は規則的である

**定義の確認**。有限二次元のWeyl模型について、群の積と随伴の後に、定義が要求する強連続性を直接検算します。

二次元実空間 $(q,p)\in\mathbb R^2$ と $\sigma_0((q,p),(q',p'))=qp'-pq'$ を使います。この例の $x\in\mathbb R$ は一次元の位置座標であり、第1節の時空点とは異なります。$\mathcal H=L^2(\mathbb R,dx)$ 上に
$$
(W_{\mathrm S}(q,p)\psi)(x)=e^{iq(x+p/2)}\psi(x+p)
$$
を定義します。位相の絶対値が $1$ で平行移動はLebesgue測度を保つので、$W_{\mathrm S}(q,p)$ は等長です。また $W_{\mathrm S}(-q,-p)$ を代入すれば逆作用素となることが確かめられ、従ってユニタリです。

積をそのまま計算すると
$$
\begin{aligned}
(W_{\mathrm S}(q,p)W_{\mathrm S}(q',p')\psi)(x)
&=e^{i(q+q')x+iqp/2+iq'p+iq'p'/2}\psi(x+p+p')\\
&=e^{-i(qp'-pq')/2}
(W_{\mathrm S}(q+q',p+p')\psi)(x).
\end{aligned}
$$
これは前節のWeyl位相に一致します。固定した $F=(q,p)$ に対し、$\psi\in C_c^\infty(\mathbb R)$ なら
$$
(W_{\mathrm S}(tq,tp)\psi)(x)
=e^{itq(x+tp/2)}\psi(x+tp)\longrightarrow\psi(x)
$$
が各 $x$ で成立します。$|t|\le1$ に制限すれば共通コンパクト集合の外で両辺は零となり、差の絶対値は $2\|\psi\|_\infty$ 以下です。[Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)により $L^2$ ノルムでも収束します。

一般の $\xi\in L^2$ には $\|\xi-\psi\|_2<\varepsilon$ となる $\psi\in C_c^\infty$ を選びます。ユニタリ性から
$$
\|W_{\mathrm S}(tF)\xi-\xi\|_2
\le2\varepsilon+\|W_{\mathrm S}(tF)\psi-\psi\|_2.
$$
先に $t\to0$、次に $\varepsilon\to0$ として強連続性を得ます。ここで示したのは**二次元模型の規則性**であり、全Minkowski場の物理的真空表示を作ったわけではありません。
<!-- definition-example-end -->

<a id="prop-aqft6-nonregular-discrete"></a>

<!-- formal-statement-start -->
> **命題（第3節の離散表示は非規則的）**  
> $\mathcal V\ne\{0\}$ に対する第3節の表示 $L$ は、どの非零方向 $F$ に対しても $t\mapsto L(tF)$ が強連続でない。
<!-- formal-statement-end -->

### 証明の見取り図

$\delta_0$ に作用させれば、零でない $tF$ に対応する基底は $\delta_0$ と直交するので、二つのベクトルの距離は一定です。

<!-- proof-start -->
### 証明

$F\ne0$ かつ $t\ne0$ のとき $tF\ne0$ です。$\sigma(tF,0)=0$ より
$$
L(tF)\delta_0=\delta_{tF},\qquad L(0)\delta_0=\delta_0.
$$
正規直交基底の性質から
$$
\begin{aligned}
\|(L(tF)-I)\delta_0\|^2
&=\|\delta_{tF}-\delta_0\|^2\\
&=\|\delta_{tF}\|^2+\|\delta_0\|^2
-2\operatorname{Re}\langle\delta_{tF},\delta_0\rangle\\
&=1+1-0=2.
\end{aligned}
$$
従って $t\to0$ でもノルムは $\sqrt2$ のままであり、強連続性の定義を満たしません。
<!-- proof-end -->

**非規則性はWeyl関係の矛盾ではありません。** Weyl関係、状態の正値性、表現の強連続性、真空の正エネルギー性はそれぞれ別の条件です。次講では正値な特性汎関数から適切な状態・表現を選ぶ準備をします。

## 6. 演習：位相・局所可換性・規則性

### Level A：一つずつ定義から検算する

<a id="ex-aqft6-a01"></a>
#### AQFT6-A01 Weyl位相と逆元
- Level: A

$\sigma(F,G)=3$ とする。$W(F)W(G)$、$W(G)W(F)$ を $W(F+G)$ の倍数で表し、$W(F)W(-F)$ を求めよ。

<!-- solution-start -->
**詳細解答**。[Weyl関係](#def-aqft6-weyl-ccr)に $\sigma(F,G)=3$ を代入すると
$$
W(F)W(G)=e^{-3i/2}W(F+G).
$$
交代性から $\sigma(G,F)=-3$ ですから逆順は
$$
W(G)W(F)=e^{3i/2}W(G+F)=e^{3i/2}W(F+G).
$$
また $\sigma(F,-F)=-\sigma(F,F)=0$ より $W(F)W(-F)=e^0W(0)=1$ です。ユニタリの逆元は随伴なので $W(F)^*=W(-F)$ と整合します。
<!-- solution-end -->

<a id="ex-aqft6-a02"></a>
#### AQFT6-A02 三つの積の位相
- Level: A

$c(F,G)=e^{-i\sigma(F,G)/2}$ に対し、$c(F,G)c(F+G,H)=c(G,H)c(F,G+H)$ を指数の中身まで展開して証明せよ。

<!-- solution-start -->
**詳細解答**。左辺の指数は
$$
-\frac i2\{\sigma(F,G)+\sigma(F+G,H)\}
=-\frac i2\{\sigma(F,G)+\sigma(F,H)+\sigma(G,H)\}.
$$
右辺の指数は
$$
-\frac i2\{\sigma(G,H)+\sigma(F,G+H)\}
=-\frac i2\{\sigma(G,H)+\sigma(F,G)+\sigma(F,H)\}.
$$
両括弧の項は同じで、和の順序だけが違います。従って指数関数も一致し、$(W(F)W(G))W(H)=W(F)(W(G)W(H))$ となります。
<!-- solution-end -->

<a id="ex-aqft6-a03"></a>
#### AQFT6-A03 一組の交換性は直交性か
- Level: A

$\sigma(F,G)=2\pi$ とする。$W(F)$ と $W(G)$ は交換するか。また $W(F/2)$ と $W(G)$ はどうか。

<!-- solution-start -->
**詳細解答**。[交換子公式](#prop-aqft6-weyl-commutator)から
$$
[W(F),W(G)]=-2i\sin(\pi)W(F+G)=0.
$$
一方、双線形性から $\sigma(F/2,G)=\pi$ なので
$$
[W(F/2),W(G)]=-2i\sin(\pi/2)W(F/2+G)
=-2iW(F/2+G)\ne0.
$$
最後はWeyl元がユニタリで零作用素ではないからです。従って一組が可換でも、シンプレクティック直交とは限りません。
<!-- solution-end -->

<a id="ex-aqft6-a04"></a>
#### AQFT6-A04 非規則性を検出する
- Level: A

$\mathcal V$ の非零元 $F$ を固定する。第3節の模型で $\|(L(tF)-I)\delta_0\|$ を $t=0$ と $t\ne0$ で求め、連続性を判定せよ。

<!-- solution-start -->
**詳細解答**。$t=0$ なら $L(0)=I$ なのでノルムは零です。$t\ne0$ なら $tF\ne0$ で
$$
(L(tF)-I)\delta_0=\delta_{tF}-\delta_0.
$$
二つの基底は直交するので、ノルムの二乗は $1+1=2$、ノルムは $\sqrt2$ です。$t\to0$ でも零に収束しないため、[規則性の定義](#def-aqft6-regular-representation)を満たしません。
<!-- solution-end -->

### Level B：条件と証明の機構を使う

<a id="ex-aqft6-b01"></a>
#### AQFT6-B01 生成元の可換性から閉包の可換性へ
- Level: B

$O_1\subset O_2'$ とする。$\mathfrak A_{\mathrm W}(O_j)$ の任意の二つの有限 *-多項式が可換であることを示し、ノルム極限で可換性が保たれる不等式を導け。

<!-- solution-start -->
**詳細解答**。[AQFT5の局所直交性](../AQFT5/index.md#prop-aqft5-local-orthogonality)から各 $F\in\mathcal V(O_1)$、$G\in\mathcal V(O_2)$ に対して $\sigma(F,G)=0$ です。従って[交換子公式](#prop-aqft6-weyl-commutator)により $[L(F),L(G)]=0$。$-F,-G$ も同じ局所部分空間にあるので、生成元とその随伴すべてが相手側と可換です。分配法則で有限 *-多項式 $A_n,B_n$ も可換です。

$A_n\to A$、$B_n\to B$ をノルム収束する列とすると
$$
[A,B]-[A_n,B_n]=[A-A_n,B]+[A_n,B-B_n].
$$
従って $\|[X,Y]\|\le2\|X\|\|Y\|$ から
$$
\|[A,B]\|\le2\|A-A_n\|\|B\|+2\|A_n\|\|B-B_n\|\to0.
$$
$(A_n)$ はノルム収束するので有界です。よって $[A,B]=0$ です。
<!-- solution-end -->

<a id="ex-aqft6-b02"></a>
#### AQFT6-B02 局所代表と全域の商
- Level: B

$f\in\mathcal D(O)$、$\varphi\in\mathcal D$、$f'=f+P\varphi$ とする。$f'$ 自身は $O$ に台を持たないかもしれない。にもかかわらず $L([f'])\in\mathfrak A_{\mathrm W}(O)$ となる理由を説明せよ。

<!-- solution-start -->
**詳細解答**。[AQFT4の源商](../AQFT4/index.md#def-aqft4-local-quotient)では $P\mathcal D$ を零とするので
$$
[f']=[f]+[P\varphi]=[f].
$$
従って $L([f'])=L([f])$ です。元の $f\in\mathcal D(O)$ から $[f]\in q(\mathcal D(O))=\mathcal V(O)$ なので、[自由Klein–Gordon場の局所Weyl C*net](#def-aqft6-local-weyl-net)により $L([f])$ は生成元として領域のC*代数に属します。局所性の判定は「**局所支持をもつ代表が存在する**」ことであり、すべての代表の台が $O$ に含まれることではありません。
<!-- solution-end -->

<a id="ex-aqft6-b03"></a>
#### AQFT6-B03 共変変換と位相保存
- Level: B

$T_h$ が $\sigma(T_hF,T_hG)=\sigma(F,G)$ を満たす実線形同型とする。$\alpha_h(L(F))=L(T_hF)$ がWeyl積と随伴を保つことを計算せよ。さらに $T_h\mathcal V(O)=\mathcal V(hO)$ が何に必要か述べよ。

<!-- solution-start -->
**詳細解答**。元のWeyl積の像は
$$
\alpha_h(L(F)L(G))
=e^{-i\sigma(F,G)/2}L(T_h(F+G)).
$$
一方、像のWeyl積は
$$
L(T_hF)L(T_hG)
=e^{-i\sigma(T_hF,T_hG)/2}L(T_hF+T_hG).
$$
$\sigma$ 保存と線形性で両辺は一致します。また
$$
\alpha_h(L(F)^*)=L(T_h(-F))=L(-T_hF)=L(T_hF)^*.
$$
$T_h$ が可逆なので生成集合上の逆写像もあり、具体的実装 $U_h$ によってC*ノルムも保たれます。局所部分空間の等式は生成元を $O$ から $hO$ へ**ちょうど**移し、[共変性](../AQFT2/index.md#def-aqft2-covariance)の $\alpha_h(\mathfrak A(O))=\mathfrak A(hO)$ を示すために必要です。
<!-- solution-end -->

<a id="ex-aqft6-b04"></a>
#### AQFT6-B04 Schrödinger表示の強連続性
- Level: B

$L^2(\mathbb R)$ で $(W_{\mathrm S}(q,p)\psi)(x)=e^{iq(x+p/2)}\psi(x+p)$ とする。固定した $F=(q,p)$ に対し、$t\mapsto W_{\mathrm S}(tF)$ の強連続性を、コンパクト支持の滑らかな関数から一般の $L^2$ ベクトルへ拡張して証明せよ。

<!-- solution-start -->
**詳細解答**。$\psi\in C_c^\infty(\mathbb R)$ に対し
$$
W_{\mathrm S}(tF)\psi(x)
=e^{itq(x+tp/2)}\psi(x+tp)\to\psi(x)
$$
です。$|t|\le1$ なら $\psi(x+tp)$ の台は $\operatorname{supp}\psi+[-|p|,|p|]$ 内にあり、差の二乗は共通コンパクト集合の指示関数に $4\|\psi\|_\infty^2$ を掛けた可積分関数で上から抑えられます。[Lebesgueの優収束定理](../../F0/F0-00D2B/index.md#thm-f0-00d2b-01)から
$$
\|W_{\mathrm S}(tF)\psi-\psi\|_2\to0.
$$
任意の $\xi\in L^2$ に $\|\xi-\psi\|_2<\varepsilon$ を満たす $\psi\in C_c^\infty$ を選べます。ユニタリ性を用いると
$$
\|W_{\mathrm S}(tF)\xi-\xi\|_2
\le2\varepsilon+\|W_{\mathrm S}(tF)\psi-\psi\|_2.
$$
先に $t\to0$、次に $\varepsilon\to0$ とすることで強連続性が従います。
<!-- solution-end -->

### Level C：自由場の構成を統合する

<a id="ex-aqft6-c01"></a>
#### AQFT6-C01 空間的に分離した二領域のWeyl代数
- Level: C

空間的に分離した開領域 $O_1,O_2$ と $f_j\in\mathcal D(O_j)$ を取り、$F_j=[f_j]$ とする。(i) $f_j+P\varphi_j$ による代表変更に結果が依存しないこと、(ii) $L(F_1)$ と $L(F_2)$ の可換性、(iii) 両局所C*環全体の相互可換性、(iv) 全域のWeyl環自体が可換だとは言えないことを、一つの議論として証明せよ。

<!-- solution-start -->
**詳細解答**。(i) $\varphi_j\in\mathcal D$ とすると、商で $[f_j+P\varphi_j]=[f_j]+[P\varphi_j]=[f_j]$ です。従ってラベルと作用素は変わりません。局所代表 $f_j$ が存在するので、変えた代表の台が広がっても $F_j\in\mathcal V(O_j)$ です。

(ii) [AQFT5の直交性](../AQFT5/index.md#prop-aqft5-local-orthogonality)から $\sigma(F_1,F_2)=0$。従って
$$
\begin{aligned}
L(F_1)L(F_2)
&=e^{-i\sigma(F_1,F_2)/2}L(F_1+F_2)=L(F_1+F_2),\\
L(F_2)L(F_1)
&=e^{-i\sigma(F_2,F_1)/2}L(F_1+F_2)=L(F_1+F_2).
\end{aligned}
$$

(iii) $\mathcal V(O_j)$ は実線形部分空間なので、生成元の随伴 $L(-F)$ も同じ領域の生成元です。全組の $\sigma=0$ から有限 *-多項式が相互可換となります。ノルム収束する $A_n\to A$、$B_n\to B$ に対して
$$
\|[A,B]\|
\le2\|A-A_n\|\|B\|+2\|A_n\|\|B-B_n\|\to0
$$
なので、閉包を取った領域のC*代数全体も可換です。

(iv) [AQFT5の非退化性の直接例](../AQFT5/index.md#def-aqft5-causal-symplectic)では、コンパクト初期データ $(a,0)$ と $(0,a)$ の解に対応する $F,G$ を取り
$$
\sigma(F,G)=\int_{\mathbb R^3}a(\boldsymbol x)^2\,d^3\boldsymbol x>0
$$
となります。$s=\pi/\sigma(F,G)$ とおけば $\sigma(F,sG)=\pi$ です。[交換子公式](#prop-aqft6-weyl-commutator)より
$$
[L(F),L(sG)]=-2iL(F+sG)\ne0.
$$
ユニタリは零でないため最後の不等号が成立します。ゆえに全域のWeyl環は非可換です。局所性は**離れた領域の代数間**の相互可換性だけを意味します。
<!-- solution-end -->

## 7. 到達点と次講

古典的な商上の $\sigma$ をWeyl位相へ移し、実際に有界なユニタリを構成できました。局所源の包含はisotonyへ、因果的な直交性はEinstein局所性へ、Poincaréでの形式保存は共変性へ移ります。他方、Weyl関係だけでは規則性も真空も得られないことを、規則的なSchrödinger模型と非規則的な離散模型の比較で確かめました。

次講AQFT7「quasifree状態と二点形式」では、二点形式と正値性の条件を指定してWeyl代数上の状態を構成し、そこから物理的な表現を選ぶ道筋を調べます。
