# AQFT6 Weyl CCRと局所C*net

[AQFT5で作った交代形式](../AQFT5/index.md#def-aqft5-causal-symplectic)は古典的な自由度 $F,G$ の組に実数 $\sigma(F,G)$ を割り当てます。[局所直交性](../AQFT5/index.md#prop-aqft5-local-orthogonality)から、空間的に分離した領域の源ならこの値が零になることも分かりました。しかしこれだけでは[AQFT2のEinstein局所性](../AQFT2/index.md#def-aqft2-locality)が要求する**量子観測量の可換性**はまだ導けません。

非有界な場 $\Phi(F)$ の積を最初から扱うと、共通の定義域の問題が立ちはだかります。本講ではまず有界なユニタリ $W(F)$ を作り、その積の位相に $\sigma$ を組み込むことでこの障害を避けます。抽象的な関係式を宣言するだけでなく、実際に作用素で構成し、時空領域ごとに共通のC*環の部分環を割り当てます。

## 1. 古典的な入力を確定する

舞台は未来向きを $t$ の増加方向とした四次元Minkowski時空、計量符号は $(-,+,+,+)$ です。質量 $m\ge0$ として
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

二つの自由度を「足す」操作を、そのまま作用素の積へ移すと $\sigma$ が消えてしまいます。足し算に複素位相を付けるのがWeyl関係です。$\sigma$ が実数値だから位相の絶対値は $1$ です。

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

二次元実空間 $V_0=\mathbb R^2$ 上の $\sigma_0((q,p),(q',p'))=qp'-pq'$ を用い、$F=(1,0)$、$G=(0,1)$ とします。$\sigma_0(F,G)=1$、$\sigma_0(G,F)=-1$ なので
$$
W(F)W(G)=e^{-i/2}W(1,1),\qquad
W(G)W(F)=e^{i/2}W(1,1).
$$
両位相の絶対値は $1$ で、$W(F)W(-F)=1$ も確かめられます。これは符号を調べる二次元模型であり、まだ全Minkowski場の表示を構成したわけではありません。
<!-- definition-example-end -->

三つの積に対して結合律が壊れないことも計算しましょう。$c(F,G)=e^{-i\sigma(F,G)/2}$ とおけば
$$
c(F,G)c(F+G,H)=c(G,H)c(F,G+H)
$$
です。左の指数の括弧内は $\sigma(F,G)+\sigma(F,H)+\sigma(G,H)$、右も $\sigma(G,H)+\sigma(F,G)+\sigma(F,H)$ で一致します。これは双線形性が保証する整合性です。

## 3. 有界作用素による実在性の証明

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

$C^*(S)$ を、集合 $S$ と単位元を含む *-多項式の作用素ノルム閉包とします。すべての $L(F)$ が同じ $B(\ell^2(\mathcal V))$ 内にあることを利用します。

<a id="def-aqft6-local-weyl-net"></a>

<!-- formal-statement-start -->
> **定義（自由Klein–Gordon場の局所Weyl C*net）**  
> 第1節の $(\mathcal V,\sigma,\mathcal V(O))$ と第3節の $L(F)$ を固定する。各開領域 $O\subset M$ に
$$
\mathfrak A_{\mathrm W}(O)
=C^*(\{L(F):F\in\mathcal V(O)\})\subset B(\ell^2(\mathcal V))
$$
> を対応させる。全域の環は $\mathfrak A_{\mathrm W}=C^*(\{L(F):F\in\mathcal V\})$ である。各局所環は同じ単位元 $I$ を共有し、$\mathfrak A_{\mathrm W}(\varnothing)=\mathbb CI$ とする。
<!-- formal-statement-end -->

局所元は全域の商 $\mathcal V$ の元です。$f'=f+P\varphi$（$\varphi\in\mathcal D$）なら $[f']=[f]$ なので $L([f'])=L([f])$、つまり代表元を変えても作用素は変わりません。$\varphi$ の台が $O$ に含まれない場合、$f'$ 自身の台が外へ拡がっても、**$f$ という局所代表がある**ため $[f']\in\mathcal V(O)$ です。

<!-- definition-example-start: def-aqft6-local-weyl-net -->
### 直接例：二つの入れ子のdouble cone

$O_r=\{(t,\boldsymbol x):|t|+|\boldsymbol x|<r\}$ と $O_R$（$0<r<R$）を取ります。[AQFT1のdouble cone](../AQFT1/index.md#def-aqft1-double-cone)で $O_r\subset O_R$ です。$f\in\mathcal D(O_r)$ なら同じ台が $O_R$ にも含まれるので
$$
[f]\in\mathcal V(O_r)\subset\mathcal V(O_R).
$$
従って $L([f])$ は両局所環の生成元です。$-f$ も局所源だから随伴 $L([f])^*=L([-f])$ も入ります。生成された環は和・積・随伴とノルム極限で閉じ、単位元を共有します。空集合では $\mathcal D(\varnothing)=\{0\}$ より $\mathfrak A_{\mathrm W}(\varnothing)=\mathbb CI$ です。
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
