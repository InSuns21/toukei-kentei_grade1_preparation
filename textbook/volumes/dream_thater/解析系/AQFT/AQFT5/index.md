# AQFT5 因果伝播子とシンプレクティック形式

[AQFT4の試験関数商](../AQFT4/index.md#def-aqft4-local-quotient)は、Klein–Gordon方程式の「源」を、同じ斉次解を生むもの同士で同一視しました。しかし、この段階では二つの局所源が互いに影響を及ぼし得るかどうかを、**商に固有の一つの数**として表していません。次講のWeyl交換関係を作るには、その数が代表元の選び方に依存せず、源が空間的に分離すれば零になることを先に証明する必要があります。

実際には、[HPDE23の商上の交代形式](../../HPDE/HPDE23/index.md#cor-hpde23-quotient-form)がその道具です。本講では既証明の一般定理を繰り返して新定理とするのでなく、AQFT4の具体的な商に代入して、符号、核、局所部分空間、Poincaré変換との整合性を手で追います。**まだ量子化していない**ことも重要です。以下の $\sigma$ は実数値の古典的形式であり、場の演算子の交換子ではありません。

## 1. 源商と初期データを同じ形式で見る

時空と質量の規約を
$$
M=\mathbb R^{1,3},\qquad
g=-dt^2+\sum_{j=1}^{3}(dx^j)^2,\qquad
P=-\Box_g+m^2=\partial_t^2-\Delta_{\boldsymbol x}+m^2,\quad m\ge0
$$
とします。時間の未来向きは $t$ の増加方向です。以下、実数値の滑らかなコンパクト支持関数だけを源とし、
$$
\mathcal D=C_c^\infty(M,\mathbb R),\qquad
\mathcal V=\mathcal D/P\mathcal D,\qquad
E=G_{\mathrm{ret}}-G_{\mathrm{adv}}
$$
と置きます。$G_{\mathrm{ret}}$ は過去側で零の遅延解、$G_{\mathrm{adv}}$ は未来側で零の先進解です。[AQFT4の同型定理](../AQFT4/index.md#thm-aqft4-kg-quotient)は
$$
\overline E:\mathcal V\longrightarrow\operatorname{Sol}_{\mathrm{sc}}(P),
\qquad [f]\longmapsto Ef
$$
が実線形同型であることを保証します。ここで $\operatorname{Sol}_{\mathrm{sc}}(P)$ は滑らかな空間コンパクト斉次解の実ベクトル空間であり、任意の滑らかな解全体ではありません。

二つの斉次解 $u,v$ の時刻 $t$ の初期データを $(u_0,u_1)=(u,\partial_tu)|_t$、$(v_0,v_1)=(v,\partial_tv)|_t$ と書くと、[HPDE23のシンプレクティック形式](../../HPDE/HPDE23/index.md#def-hpde23-symplectic)は
$$
\Omega(u,v)=\int_{\mathbb R^3}(u_0v_1-v_0u_1)\,d^3\boldsymbol x
$$
です。[Cauchy面独立性](../../HPDE/HPDE23/index.md#thm-hpde23-slice-independence)により、右辺は時刻を変えても一定です。両解のデータはコンパクト支持なので積分は有限です。

ここで商の元を $\Omega$ に移して測るための記法を固定します。**積分に付く負号は任意ではありません。** いまの $E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ と $(-,+,+,+)$ の組合せで決まります。

<a id="def-aqft5-causal-symplectic"></a>

<!-- formal-statement-start -->
> **定義（Minkowski源商の因果的シンプレクティック形式）**  
> 上記の $M,P,\mathcal D,\mathcal V,E$ に対し、$[f],[h]\in\mathcal V$ の組に実数
$$
\sigma([f],[h]):=-\int_M f(x)(Eh)(x)\,d^4x
$$
> を対応させる。これは[HPDE23の商形式](../../HPDE/HPDE23/index.md#cor-hpde23-quotient-form)を四次元Minkowski時空に特殊化した同じ形式である。次節で代表元独立性を直接検算する。
<!-- formal-statement-end -->

定義の入力は商類ですが、積分の中には代表元 $f,h\in\mathcal D$ を書きました。$Eh$ 自体は一般に時空コンパクトではありませんが、$f$ の台がコンパクトなので積分は有限です。先に代表元の変更による相殺を調べ、その後で非退化性を確認します。

<!-- definition-example-start: def-aqft5-causal-symplectic -->
### 直接例：変位と速度の組で零でない値を作る

零でない実数値 $a\in C_c^\infty(\mathbb R^3)$ を選びます。[Klein–Gordonの大域Cauchy存在一意性](../../HPDE/HPDE16/index.md#thm-hpde16-global-cauchy)を使い、初期データ
$$
(u_0,u_1)=(a,0),\qquad
(v_0,v_1)=(0,a)
$$
を持つ空間コンパクトな斉次解 $u,v$ を作れます。[AQFT4の全射性](../AQFT4/index.md#thm-aqft4-kg-quotient)より $Ef=u,\ Eh=v$ となる $f,h\in\mathcal D$ が存在します。[因果伝播子と源の積分対の符号](../../HPDE/HPDE23/index.md#prop-hpde23-green-pairing)をこの二組に適用すると
$$
\sigma([f],[h])
=-\int_Mfv\,d^4x
=\Omega(u,v)
=\int_{\mathbb R^3}a(\boldsymbol x)^2\,d^3\boldsymbol x>0.
$$
最後の不等号は $a$ が零でなく連続であることから従います。順番を交換すれば符号が反転し、同じ元を二度入れれば零です。**交代性は「すべての組が零」という意味ではありません。**
<!-- definition-example-end -->

## 2. 代表元独立性・交代性・非退化性を検算する

ここで必要なのは[交代双線形形式](../../../幾何系/SYM/SYM1/index.md#def-sym1-alternating-form)と[非退化交代形式](../../../幾何系/SYM/SYM1/index.md#def-sym1-nondegenerate-form)の区別です。交代性は $\sigma(v,v)=0$、非退化性は全ての相手との値が零である元が零だけである、という別々の条件です。

### 代表を変えたときの主要中間式

$f'=f+P\varphi$、$h'=h+P\psi$（$\varphi,\psi\in\mathcal D$）とします。[Green合成と因果伝播子の核](../AQFT4/index.md#prop-aqft4-green-identities)および[源と解の対応](../AQFT4/index.md#thm-aqft4-kg-quotient)から
$$
E(P\psi)=0,\qquad P(Eh)=0.
$$
したがって $Eh'=Eh$ です。また、$P$ が実係数で形式的自己随伴であり、$\varphi$ はコンパクト支持だから、境界項は生じず
$$
\int_M(P\varphi)\,Eh\,d^4x
=\int_M\varphi\,P(Eh)\,d^4x=0.
$$
二つを一緒に代入すると
$$
\begin{aligned}
-\int_M f'Eh'\,d^4x
&=-\int_M(f+P\varphi)E(h+P\psi)\,d^4x\\
&=-\int_MfEh\,d^4x-\int_M(P\varphi)Eh\,d^4x\\
&=-\int_MfEh\,d^4x.
\end{aligned}
$$
これが **well-defined性** です。第一引数の変更を $EP=0$ だけで処理するのは誤りで、形式的自己随伴性がもう一段必要です。

### 交代性と非退化性

[HPDE23のGreen対の反対称性](../../HPDE/HPDE23/index.md#prop-hpde23-green-pairing)は
$$
\int_M fEh\,d^4x=-\int_M hEf\,d^4x
$$
を与えます。従って $\sigma([h],[f])=-\sigma([f],[h])$、特に $\sigma([f],[f])=0$ です。双線形性は $E$ と積分の実線形性から従います。

非退化性については「ある $[f]$ が全ての $[h]$ に対して $\sigma([f],[h])=0$」と仮定します。[HPDE23の源・面積分対応](../../HPDE/HPDE23/index.md#prop-hpde23-green-pairing)より
$$
0=\sigma([f],[h])=\Omega(Ef,Eh)
\quad(\forall[h]\in\mathcal V).
$$
[AQFT4の全射性](../AQFT4/index.md#thm-aqft4-kg-quotient)で $Eh$ は $\operatorname{Sol}_{\mathrm{sc}}(P)$ 全体を走ります。したがって[解空間の非退化性](../../HPDE/HPDE23/index.md#thm-hpde23-nondegenerate)から $Ef=0$、さらに[AQFT4の核の同定](../AQFT4/index.md#thm-aqft4-kg-quotient)から $f\in P\mathcal D$、つまり $[f]=0$ です。

結局、$(\mathcal V,\sigma)$ は[シンプレクティックベクトル空間](../../../幾何系/SYM/SYM1/index.md#def-sym1-symplectic-vector-space)です。これを新しい一般定理として再証明したのではなく、HPDE23の結果を今回の符号・商・局所化に合わせて確かめました。

### もう一つの独立検算：時間カットオフ

上の直接例に登場した $f,h$ を実際に構成できます。$\chi\in C^\infty(\mathbb R)$ を、十分過去で $0$、十分未来で $1$ とし、$u,v$ はコンパクトな初期データからの斉次解とします。
$$
f=P(\chi u)=\chi''u+2\chi'\partial_tu,\qquad
h=P(\chi v)=\chi''v+2\chi'\partial_tv.
$$
$\chi',\chi''$ は有限時間帯に支持を持ち、有限伝播によりこの帯で $u,v$ の空間台も有界なので $f,h\in\mathcal D$ です。[AQFT4のカットオフ逆写像](../AQFT4/index.md#thm-aqft4-kg-quotient)によって
$$
G_{\mathrm{ret}}f=\chi u,\qquad
G_{\mathrm{adv}}f=(\chi-1)u,\qquad Ef=u
$$
となります。$h$ に対しても $Eh=v$ です。ここでは[Green対の符号公式](../../HPDE/HPDE23/index.md#prop-hpde23-green-pairing)を引用せず、$\chi$ の微分から負号を再確認することもできます。$f=\chi''u+2\chi'\partial_tu$ と $Pv=0$ を使い、時間部分積分（$\chi'$ はコンパクト支持）すると
$
\begin{aligned}
-\int_M f v\,d^4x
&=-\int_M(\chi''uv+2\chi'\partial_tu\,v)\,d^4x\\
&=\int_M\chi'(\partial_tu\,v+u\,\partial_tv-2\partial_tu\,v)\,d^4x\\
&=\int_{\mathbb R}\chi'(t)
  \left\{\int_{\mathbb R^3}(u\partial_tv-v\partial_tu)\,d^3x\right\}\,dt\\
&=\left(\int_{\mathbb R}\chi'(t)\,dt\right)\Omega(u,v)
=\Omega(u,v).
\end{aligned}
$
三番目の式では括弧内が時刻に依存しないことを[面独立性](../../HPDE/HPDE23/index.md#thm-hpde23-slice-independence)で使いました。したがって源を具体的に取っても $\sigma([f],[h])=\int a^2>0$ が再現されます。$P(\chi u)$ と $P\chi\cdot u$ は異なる表記であることに注意してください。

## 3. 局所部分空間とシンプレクティック直交

[AQFT4で定めた局所商](../AQFT4/index.md#def-aqft4-local-quotient)は開集合 $O\subset M$ に対し
$$
\mathcal V(O)=q(\mathcal D(O))\subset\mathcal V,\qquad
q(f)=[f],\qquad
\mathcal D(O)=\{f\in\mathcal D:\operatorname{supp}f\subset O\}
$$
でした。一般に $\mathcal V(O)$ は $\mathcal D(O)/P\mathcal D(O)$ と同じと即断できません。[局所像と核の命題](../AQFT4/index.md#prop-aqft4-local-image)が示す通り、正しい核は $\mathcal D(O)\cap P\mathcal D$ です。

[SYM1のシンプレクティック直交補](../../../幾何系/SYM/SYM1/index.md#def-sym1-symplectic-orthogonal)をこの無限次元実空間にも同じ式で使います。部分空間 $W\subset\mathcal V$ に対し
$$
W^{\perp_\sigma}
=\{v\in\mathcal V:\sigma(v,w)=0\ \text{for every }w\in W\}
$$
です。通常の正定値内積の直交と違い、交代形式では零でない $w$ 自身が $w$ と直交します。$\mathcal V(O)$ への $\sigma$ の制限が常に非退化だとは、全体の非退化性だけからは言えません。

[AQFT1の因果補集合](../AQFT1/index.md#def-aqft1-causal-complement)を $O'$ と書きます。$O_1\subset O_2'$ なら、$O_1$ の全点は $O_2$ の全点と空間的に分離しています。必要な結論は、**この幾何的条件から局所商のシンプレクティック直交が従う**ことです。

<a id="prop-aqft5-local-orthogonality"></a>

<!-- formal-statement-start -->
> **命題（空間的に分離した局所源のシンプレクティック直交性）**  
> $M=\mathbb R^{1,3}$ を未来向き $t$ と計量 $(-,+,+,+)$ を持つMinkowski時空とし、$m\ge0$、$P=-\Box_g+m^2$、$E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$、$\mathcal V=\mathcal D/P\mathcal D$、上記の $\sigma$ と $\mathcal V(O)$ を用いる。開集合 $O_1,O_2\subset M$ が $O_1\subset O_2'$ を満たすなら
$$
\sigma(v_1,v_2)=0
\quad(v_1\in\mathcal V(O_1),\ v_2\in\mathcal V(O_2)),
\qquad
\mathcal V(O_1)\subset\mathcal V(O_2)^{\perp_\sigma}.
$$
> また $O_1\subset O_2$ なら $\mathcal V(O_1)\subset\mathcal V(O_2)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

局所元には台を持つ代表 $f,h$ が取れます。[AQFT4の空間的分離に対する伝播子積分零](../AQFT4/index.md#prop-aqft4-spacelike-pairing)を、今度は商に降ろした $\sigma$ に代入します。局所性を示すには $\sigma$ の**零性**だけで十分で、量子演算子の交換関係を先取りする必要はありません。

<!-- proof-start -->
### 証明

任意の $v_1\in\mathcal V(O_1)$、$v_2\in\mathcal V(O_2)$ を取ります。局所像の定義より、$f\in\mathcal D(O_1)$、$h\in\mathcal D(O_2)$ で $v_1=[f]$、$v_2=[h]$ と書けます。

[因果伝播子の支持条件](../../HPDE/HPDE21/index.md#prop-hpde21-propagator-identities)より
$$
\operatorname{supp}(Eh)\subset
J^+(\operatorname{supp}h)\cup J^-(\operatorname{supp}h).
$$
$O_1\subset O_2'$ なので、$\operatorname{supp}f\subset O_1$ は右辺と交わりません。従って $f(x)(Eh)(x)=0$ が全点で成り立ち、
$$
\sigma(v_1,v_2)
=-\int_M f(x)(Eh)(x)\,d^4x=0.
$$
[代表元独立性](#def-aqft5-causal-symplectic)の検算があるため、$f,h$ を別の代表で書いてもこの値は変わりません。第一の結論と直交補への包含が従います。

次に $O_1\subset O_2$ なら任意の $f\in\mathcal D(O_1)$ は $\mathcal D(O_2)$ にも属します。よって
$$
\mathcal V(O_1)=q(\mathcal D(O_1))
\subset q(\mathcal D(O_2))=\mathcal V(O_2).
$$
これが包含の結論です。$\square$
<!-- proof-end -->

### 直接例：二つの小さなdouble cone

時間・空間座標を $(t,\boldsymbol x)$ とし、$e_1=(1,0,0)$ とします。
$$
O_-=\{(t,\boldsymbol x):|t|+|\boldsymbol x+4e_1|<1\},
\qquad
O_+=\{(t,\boldsymbol x):|t|+|\boldsymbol x-4e_1|<1\}.
$$
任意の点 $p\in O_-$、$q\in O_+$ について
$$
|\boldsymbol x_p-\boldsymbol x_q|>8-1-1=6,\qquad
|t_p-t_q|<2.
$$
従って全点対が空間的に分離し、$O_-\subset O_+'$ です。例えば互いの領域内の滑らかな非零バンプ関数 $f,h$ についても
$$
\sigma([f],[h])=0
$$
です。**二つの商類そのものが零**という主張ではありません。各局所元は非零であっても、互いの組合せだけが零になります。

### 逆方向にしてはいけない推論

$\sigma([f],[h])=0$ から $\operatorname{supp}f$ と $\operatorname{supp}h$ が空間的に分離するとは結論できません。実際、前節の $[f]\ne0$ を使って $h=f$ とすれば、交代性により $\sigma([f],[f])=0$ ですが支持は完全に重なります。失われているのは**支持の幾何条件**であり、積分が零であるという一つのスカラー条件だけでは幾何的位置は復元できません。

## 4. Poincaré変換は形式を保存するか

[AQFT4で証明したPoincaré共変性](../AQFT4/index.md#prop-aqft4-poincare)を利用します。$F(x)=\Lambda x+a$ を未来向き・時間向きを保つPoincaré変換とし、$\Lambda$ はLorentz変換、$\rho_F f=f\circ F^{-1}$ と置きます。この範囲では $F$ は因果の未来と過去をそれぞれ保つので
$$
E(\rho_Fh)=\rho_F(Eh),\qquad
P(\rho_F\varphi)=\rho_F(P\varphi)
$$
が成立します。$\rho_F$ は $\mathcal D(O)$ を $\mathcal D(FO)$ に移し、商上の作用 $U_F[f]=[\rho_Ff]$ を定めます。

<a id="prop-aqft5-poincare-symplectic"></a>

<!-- formal-statement-start -->
> **命題（Poincaré共変性とシンプレクティック形式の保存）**  
> 四次元Minkowski時空上の $m\ge0$ に対する実Klein–Gordon源商 $(\mathcal V,\sigma)$ を考える。固有・未来向きPoincaré変換 $F(x)=\Lambda x+a$（$\det\Lambda=1$、未来の時間向きを保存）と $U_F[f]=[f\circ F^{-1}]$ について、任意の $v,w\in\mathcal V$ と開集合 $O\subset M$ に対し
$$
\sigma(U_Fv,U_Fw)=\sigma(v,w),
\qquad
U_F\mathcal V(O)=\mathcal V(FO).
$$
<!-- formal-statement-end -->

### 証明の見取り図

解の変換と伝播子が可換で、$|\det\Lambda|=1$ なので四次元体積要素が不変です。局所部分空間の等号は $F$ と逆変換 $F^{-1}$ の両方による包含を確認します。

<!-- proof-start -->
### 証明

任意の $v=[f],w=[h]$ を取り、[Poincaré変換とGreen作用素](../AQFT4/index.md#prop-aqft4-poincare)の可換性を使うと
$$
\begin{aligned}
\sigma(U_F[f],U_F[h])
&=-\int_M(\rho_Ff)(x)\,E(\rho_Fh)(x)\,d^4x\\
&=-\int_M f(F^{-1}x)(Eh)(F^{-1}x)\,d^4x.
\end{aligned}
$$
$y=F^{-1}x$ と変数変換すると、$d^4x=|\det\Lambda|\,d^4y=d^4y$ なので
$$
\sigma(U_F[f],U_F[h])
=-\int_M f(y)(Eh)(y)\,d^4y=\sigma([f],[h]).
$$
また $f\in\mathcal D(O)$ なら $\rho_Ff\in\mathcal D(FO)$ です。この事実を $F$ に適用して $U_F\mathcal V(O)\subset\mathcal V(FO)$ を得ます。逆変換 $F^{-1}$ に適用して逆包含も得るので等号が従います。$\square$
<!-- proof-end -->

例えば空間並進 $F(t,\boldsymbol x)=(t,\boldsymbol x+b)$ は二つのdouble coneを同じだけ動かしますが、その中の二つの局所源の $\sigma$ の値を変えません。先ほどの零性は座標原点に依存しません。

**時間反転は別です。** $R(t,\boldsymbol x)=(-t,\boldsymbol x)$ は遅延と先進を交換するため、$E\rho_R=-\rho_RE$ となります。$|\det R|=1$ でも
$$
\sigma(U_R[f],U_R[h])=-\sigma([f],[h])
$$
です（$U_R[f]=[\rho_Rf]$）。時間向きの仮定を落として「どんなPoincaré変換も $\sigma$ を保存する」と言うと、この符号を誤ります。

## 5. 全体の非退化性と局所直交性の境界

ここまでで三種類の言明を区別できます。

| 言明 | 数学的内容 | 成立する理由 |
|---|---|---|
| 全体の非退化性 | $\sigma(v,w)=0$ が全 $w\in\mathcal V$ について成り立てば $v=0$ | [Cauchyデータの非退化性](../../HPDE/HPDE23/index.md#thm-hpde23-nondegenerate)と源・解同型 |
| 局所直交性 | $O_1\subset O_2'$ なら $\sigma(\mathcal V(O_1),\mathcal V(O_2))=0$ | [因果支持](../../HPDE/HPDE21/index.md#prop-hpde21-propagator-identities) |
| ある二元の組合せが零 | $\sigma(v,w)=0$ | これだけでは支持の分離も $v=0$ も結論できない |

[SYM1の直交補](../../../幾何系/SYM/SYM1/index.md#def-sym1-symplectic-orthogonal)を使うと、$W_1\subset W_2$ なら
$$
W_2^{\perp_\sigma}\subset W_1^{\perp_\sigma}
$$
となります。大きな部分空間の全てと直交する条件の方が厳しいからです。ただし局所直交性 $\mathcal V(O_1)\subset\mathcal V(O_2)^{\perp_\sigma}$ を、追加証明なしに等号へ強めません。Haag双対性や量子代数の可換子についての等式は、これとは別の問題です。

次講のAQFT6では、$\sigma$ をWeyl関係
$$
W(v)W(w)=e^{-i\sigma(v,w)/2}W(v+w)
$$
の位相に入れます。この式は**ここでは後続の目標の紹介**であって、AQFT5で量子演算子を構成済みという主張ではありません。局所性はこの位相に局所直交性を代入したときに現れます。

## 6. 演習：符号・支持・商と局所性

### Level A：定義と主要式を自分で判定する

<a id="ex-aqft5-a01"></a>
#### AQFT5-A01 初期データから交代積分を出す

- Level: A

$m\ge0$、$P=\partial_t^2-\Delta+m^2$ とする。コンパクト支持の実数値滑らかな関数 $a,b$ から作った斉次解 $u,v$ の時刻 $0$ のデータを $(u_0,u_1)=(a,0)$、$(v_0,v_1)=(0,b)$ とする。$\Omega(u,v)$、$\Omega(v,u)$、$\Omega(u,u)$ を求め、$a=b\ne0$ のとき非零の組が得られることを説明せよ。

<!-- solution-start -->
**詳細解答**。[初期データのシンプレクティック式](../../HPDE/HPDE23/index.md#def-hpde23-symplectic)へ代入します。
$$
\begin{aligned}
\Omega(u,v)&=\int_{\mathbb R^3}(u_0v_1-v_0u_1)\,d^3x
=\int_{\mathbb R^3}(ab-0)\,d^3x,\\
\Omega(v,u)&=\int_{\mathbb R^3}(0-ab)\,d^3x=-\int_{\mathbb R^3}ab\,d^3x,\\
\Omega(u,u)&=\int_{\mathbb R^3}(a\cdot0-a\cdot0)\,d^3x=0.
\end{aligned}
$$
$a=b\ne0$ なら連続性により $a^2$ が正である開集合が存在し、$\int a^2\,d^3x>0$ です。交代性と非零の組が両立します。
<!-- solution-end -->

<a id="ex-aqft5-a02"></a>
#### AQFT5-A02 代表元の変更と積分

- Level: A

$f,h,\varphi,\psi\in\mathcal D$、$f'=f+P\varphi$、$h'=h+P\psi$ とする。$EP=0$、$PE=0$ と $P$ の形式的自己随伴性を使い、$\int f'Eh'=\int fEh$ を証明せよ。どの項でコンパクト支持を使うかも述べよ。

<!-- solution-start -->
**詳細解答**。$E(P\psi)=0$ だから $Eh'=Eh$ です。従って
$$
\int_Mf'Eh'\,d^4x
=\int_MfEh\,d^4x+\int_M(P\varphi)Eh\,d^4x.
$$
$\varphi$ はコンパクト支持なので部分積分の境界項が消え、[HPDE23の実Klein–Gordon作用素](../../HPDE/HPDE23/index.md#def-hpde23-real-kg)の形式的自己随伴性から
$$
\int_M(P\varphi)Eh\,d^4x
=\int_M\varphi\,P(Eh)\,d^4x
=\int_M\varphi\cdot0\,d^4x=0.
$$
$h$ もコンパクト支持なので $Eh$ は滑らかで、$f,\varphi$ の積分は有限です。$Eh$ がコンパクト支持であるとは用いていません。
<!-- solution-end -->

<a id="ex-aqft5-a03"></a>
#### AQFT5-A03 座標で空間的分離を検査する

- Level: A

$O_\pm=\{(t,\boldsymbol x):|t|+|\boldsymbol x\mp4e_1|<1\}$ とする。任意の $p\in O_-$、$q\in O_+$ について $|t_p-t_q|<|\boldsymbol x_p-\boldsymbol x_q|$ を示せ。さらに $f\in\mathcal D(O_-)$、$h\in\mathcal D(O_+)$ なら $\sigma([f],[h])$ を求めよ。

<!-- solution-start -->
**詳細解答**。$|t_p|<1$、$|t_q|<1$ なので三角不等式で $|t_p-t_q|\le|t_p|+|t_q|<2$ です。空間について
$$
|\boldsymbol x_p-\boldsymbol x_q|
\ge8-|\boldsymbol x_p+4e_1|-|\boldsymbol x_q-4e_1|>8-1-1=6.
$$
よって $|t_p-t_q|<2<6<|\boldsymbol x_p-\boldsymbol x_q|$ です。[局所直交命題](#prop-aqft5-local-orthogonality)の仮定を全点対で満たすため $\sigma([f],[h])=0$ です。支持条件から得た結論であり、$[f]$ や $[h]$ が零とは限りません。
<!-- solution-end -->

<a id="ex-aqft5-a04"></a>
#### AQFT5-A04 零の組合せは零の元を意味するか

- Level: A

任意の $v\in\mathcal V$ について $\sigma(v,v)$ を求めよ。その事実と、$\sigma$ の非退化性の定義が矛盾しない理由を量化子を明示して説明せよ。

<!-- solution-start -->
**詳細解答**。交代性により任意の $v$ に対し $\sigma(v,v)=0$ です。しかし非退化性は
$$
\bigl[\forall w\in\mathcal V,\ \sigma(v,w)=0\bigr]\Longrightarrow v=0
$$
を主張します。左辺は **相手を $w=v$ に固定した一つの条件** より強い条件です。例えば[A01の非零データ](#ex-aqft5-a01)から $v=[f]\ne0$ を選べば $\sigma(v,v)=0$ でも、別の $w=[h]$ に対し $\sigma(v,w)>0$ にできます。
<!-- solution-end -->

### Level B：構成・不変性・直交補を使う

<a id="ex-aqft5-b01"></a>
#### AQFT5-B01 Cauchyデータからコンパクト源を具体的に作る

- Level: B

$(u_0,u_1)=(a,0)$、$(v_0,v_1)=(0,a)$ を持つ実Klein–Gordon解 $u,v$ を取り、$a\in C_c^\infty(\mathbb R^3)$ は非零とする。$\chi(t)=0$（$t\le-1$）、$\chi(t)=1$（$t\ge1$）となる滑らかな関数を用いて $f=P(\chi u)$、$h=P(\chi v)$ を作る。$f,h\in\mathcal D$、$Ef=u$、$Eh=v$ を証明し、$\sigma([f],[h])$ を求めよ。

<!-- solution-start -->
**詳細解答**。$Pu=Pv=0$ と積の微分から
$$
f=\chi''u+2\chi'\partial_tu,\qquad
h=\chi''v+2\chi'\partial_tv.
$$
$\chi',\chi''$ は $[-1,1]$ に支持を持ちます。$a$ の台 $K$ はコンパクトで、[有限伝播](../../HPDE/HPDE16/index.md#thm-hpde16-global-cauchy)から $|t|\le1$ の解の空間台は $K$ の距離 $1$ 以内に入ります。従って $f,h$ は時間・空間ともコンパクト支持の滑らかな実関数です。

$\chi u$ は十分過去で零、$(\chi-1)u$ は十分未来で零です。両者への $P$ の作用はそれぞれ $f$ です。支持を指定した[Green両側逆](../../HPDE/HPDE20/index.md#thm-hpde20-green-two-sided)から
$$
G_{\mathrm{ret}}f=\chi u,\qquad
G_{\mathrm{adv}}f=(\chi-1)u
$$
なので $Ef=u$ です。同じ計算で $Eh=v$。最後に[源積分と面積分の符号](../../HPDE/HPDE23/index.md#prop-hpde23-green-pairing)で
$$
\sigma([f],[h])=\Omega(u,v)
=\int_{\mathbb R^3}(a\cdot a-0)\,d^3x
=\int_{\mathbb R^3}a^2\,d^3x>0
$$
を得ます。ここでは $f=P(\chi u)$ ですが $\chi u$ は時空コンパクトとは限らず、$f\in P\mathcal D$ とは言えません。従って $[f]=0$ と誤って判断してはいけません。
<!-- solution-end -->

<a id="ex-aqft5-b02"></a>
#### AQFT5-B02 時間並進と時間反転の違い

- Level: B

$T_s(t,\boldsymbol x)=(t+s,\boldsymbol x)$、$R(t,\boldsymbol x)=(-t,\boldsymbol x)$ とする。$\rho_Ff=f\circ F^{-1}$ で源を変換する。$E\rho_{T_s}=\rho_{T_s}E$、$E\rho_R=-\rho_RE$ を、Greenの支持条件から説明し、それぞれの変換の $\sigma$ に対する符号を求めよ。

<!-- solution-start -->
**詳細解答**。$T_s$ は未来・過去の向きを保ち、$P$ と可換です。[Greenの一意性](../../HPDE/HPDE19/index.md#thm-hpde19-uniqueness)で遅延解・先進解をそれぞれ対応させれば
$$
G_{\mathrm{ret}}\rho_{T_s}=\rho_{T_s}G_{\mathrm{ret}},
\qquad
G_{\mathrm{adv}}\rho_{T_s}=\rho_{T_s}G_{\mathrm{adv}},
$$
従って $E\rho_{T_s}=\rho_{T_s}E$ です。$R$ は未来と過去を交換するので
$$
G_{\mathrm{ret}}\rho_R=\rho_RG_{\mathrm{adv}},
\qquad
G_{\mathrm{adv}}\rho_R=\rho_RG_{\mathrm{ret}}.
$$
両式を引けば $E\rho_R=-\rho_RE$ です。

どちらもLebesgue体積要素を保存します。そこで変数変換によって
$$
\begin{aligned}
\sigma([\rho_{T_s}f],[\rho_{T_s}h])
&=-\int(\rho_{T_s}f)\rho_{T_s}(Eh)\,d^4x
=\sigma([f],[h]),\\
\sigma([\rho_Rf],[\rho_Rh])
&=+\int(\rho_Rf)\rho_R(Eh)\,d^4x
=-\sigma([f],[h]).
\end{aligned}
$$
時間向き保存の仮定が符号を分けています。
<!-- solution-end -->

<a id="ex-aqft5-b03"></a>
#### AQFT5-B03 包含と直交補の順序反転

- Level: B

$O_1\subset O_2$ を開集合とし、$W_i=\mathcal V(O_i)$ とする。(i) $W_1\subset W_2$、(ii) $W_2^{\perp_\sigma}\subset W_1^{\perp_\sigma}$ を証明せよ。さらに $O_3\subset O_2'$ なら $W_3\subset W_2^{\perp_\sigma}\subset W_1^{\perp_\sigma}$ を示せ。

<!-- solution-start -->
**詳細解答**。$O_1\subset O_2$ から $\mathcal D(O_1)\subset\mathcal D(O_2)$ です。商写像 $q$ で像を取ると
$$
W_1=q(\mathcal D(O_1))\subset q(\mathcal D(O_2))=W_2.
$$
次に $v\in W_2^{\perp_\sigma}$ は全ての $w\in W_2$ に対し $\sigma(v,w)=0$ を満たします。$W_1\subset W_2$ なので全ての $w\in W_1$ でも零であり、$v\in W_1^{\perp_\sigma}$ です。従って直交補の包含は逆になります。

$O_3\subset O_2'$ のとき[局所直交命題](#prop-aqft5-local-orthogonality)から $W_3\subset W_2^{\perp_\sigma}$。これと今証明した包含を連結して最後の主張を得ます。
<!-- solution-end -->

<a id="ex-aqft5-b04"></a>
#### AQFT5-B04 零の積分から幾何を逆算できない例

- Level: B

B01の構成から $[f]\ne0$ となる源を一つ選び、$\sigma([f],[h])=0$ であるのに二源の台が空間的に分離しない $h$ を示せ。さらに「全ての $[h]\in\mathcal V$ に対して零」と仮定を強くすると結論がどう変わるか論証せよ。

<!-- solution-start -->
**詳細解答**。B01より $[f]$ と $[k]$ に対して $\sigma([f],[k])=\int a^2>0$ が成立するので $[f]\ne0$ です。$h=f$ を選べば
$$
\sigma([f],[h])=\sigma([f],[f])=0
$$
ですが $\operatorname{supp}h=\operatorname{supp}f\ne\varnothing$ であり、支持は互いに空間的に分離しません。零になった理由は交代性であって因果支持ではありません。

一方、任意の $[h]\in\mathcal V$ について $\sigma([f],[h])=0$ なら、[非退化性](../../HPDE/HPDE23/index.md#cor-hpde23-quotient-form)により $[f]=0$ です。幾何の分離を逆算するのではなく、**全相手への零性**から商類の零性を結論します。
<!-- solution-end -->

### Level C：構成・符号・局所化を統合する

<a id="ex-aqft5-c01"></a>
#### AQFT5-C01 一つの局所領域の非可換性の種と、遠方領域との直交

- Level: C

$R>0$、$0<r<R/4$ を取り、$a\in C_c^\infty(B_r(0),\mathbb R)$ を非零とする。$P=\partial_t^2-\Delta+m^2$、$m\ge0$、$u,v$ を $(a,0)$、$(0,a)$ の初期データから得た解とする。$\chi$ は $t\le-\varepsilon$ で $0$、$t\ge\varepsilon$ で $1$ となる滑らかな関数とし、$0<\varepsilon<R/4$ とする。
$$
O=\{(t,\boldsymbol x):|t|+|\boldsymbol x|<R\},\qquad
f=P(\chi u),\quad h=P(\chi v).
$$
(i) $f,h\in\mathcal D(O)$ を示せ。(ii) $\sigma([f],[h])>0$ を計算せよ。(iii) 開集合 $Q$ が $Q\subset O'$ なら全ての $k\in\mathcal D(Q)$ に対し $\sigma([f],[k])=0$ を示せ。(iv) $\varphi,\psi\in\mathcal D$ を取り $f+P\varphi,h+P\psi$ に置換しても (ii)、(iii) が変わらない理由を説明せよ。最後に、(ii) と (iii) が矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答**。

(i) $\chi'$、$\chi''$ は $[-\varepsilon,\varepsilon]$ に支持を持ちます。初期データの台は $\overline B_r(0)$ に含まれるため、[有限伝播](../../HPDE/HPDE16/index.md#thm-hpde16-global-cauchy)より
$$
\operatorname{supp}u\cap\{|t|\le\varepsilon\},
\quad
\operatorname{supp}v\cap\{|t|\le\varepsilon\}
\ \subset\ \{(t,\boldsymbol x):|t|\le\varepsilon,\ |\boldsymbol x|\le r+\varepsilon\}.
$$
$Pu=Pv=0$ なので
$$
f=\chi''u+2\chi'\partial_tu,\qquad
h=\chi''v+2\chi'\partial_tv.
$$
これらの台は上記のコンパクト集合に含まれます。そこでは $|t|+|\boldsymbol x|\le r+2\varepsilon<3R/4<R$ です。ゆえに $f,h\in\mathcal D(O)$。

(ii) カットオフの過去・未来の支持を使う[Green両側逆](../../HPDE/HPDE20/index.md#thm-hpde20-green-two-sided)から
$$
Ef=\chi u-(\chi-1)u=u,\qquad
Eh=\chi v-(\chi-1)v=v.
$$
[HPDE23の源対の符号](../../HPDE/HPDE23/index.md#prop-hpde23-green-pairing)を用いると
$$
\sigma([f],[h])=\Omega(u,v)
=\int_{\mathbb R^3}\{a(\boldsymbol x)a(\boldsymbol x)-0\}\,d^3x
=\int_{\mathbb R^3}a^2\,d^3x>0.
$$
この計算は $[f],[h]$ が同じ局所部分空間 $\mathcal V(O)$ の元でも、互いの形式が零とは限らないことを示します。

(iii) $Q\subset O'$ と $f\in\mathcal D(O)$ により、$\operatorname{supp}f$ は $J(\operatorname{supp}k)$ と交わりません。[因果伝播子の支持](../../HPDE/HPDE21/index.md#prop-hpde21-propagator-identities)から $fEk=0$ が点ごとに成り立つため
$$
\sigma([f],[k])=-\int_MfEk\,d^4x=0.
$$

(iv) $E(P\psi)=0$ と
$$
\int_M(P\varphi)Ew\,d^4x
=\int_M\varphi\,P(Ew)\,d^4x=0
$$
（$w=h$ または $w=k$）を使えば、$f,h$ の代表を変えても形式の値は不変です。ただし新代表が $\mathcal D(O)$ に属するとは限りません。**局所元であることの根拠は元の $f,h\in\mathcal D(O)$ の存在**であって、すべての代表が局所支持を持つことではありません。

(ii) の相手 $[h]$ は同じ局所領域から作られ、(iii) の相手 $[k]$ はその因果補集合の領域から作られます。異なる相手についての主張なので矛盾しません。
<!-- solution-end -->

## 7. 到達点と次講への接続

(A) コンパクト源の商は時空コンパクト解の空間ではなく、**空間コンパクトな斉次解**の空間と同型でした。(B) その上の $\sigma([f],[h])=-\int fEh$ は代表に依存せず、交代かつ非退化でした。(C) 空間的に分離した局所部分空間は互いにシンプレクティック直交でした。(D) 未来向きPoincaré変換は $\sigma$ と局所像の構造を保存し、時間反転は符号を変えました。

これらはすべて**古典的な場の方程式と因果支持**から得られた結論です。AQFT6ではこの同じ $\mathcal V$ と $\sigma$ に対してWeyl CCRを定義し、局所可換性を量子代数の中で証明します。
