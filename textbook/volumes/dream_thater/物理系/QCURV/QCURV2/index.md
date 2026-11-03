# QCURV2 保存内積・正振動数分解・量子状態

<!-- definition-example-audit: strict -->

[曲率結合場の大域Cauchy問題](../QCURV1/index.md#cor-qcurv1-cauchy)により、曲率結合Klein–Gordon方程式のコンパクト支持初期データは一つの古典解を決めます。しかし「解が一意である」ことから「量子真空が一意である」ことは出てきません。自由場を量子化するには、解の間の保存された量を見つけ、その上で何を正振動数と呼ぶかを選ぶ必要があります。

本章の流れは、**初期値から保存量へ → 正と負の符号の問題 → 複素構造による選択 → Fock状態と二点関数へ**、です。次のQCURV章で二つの選択を比較するため、ここではまだBogoliubov係数の一般論には進みません。

背景 $(M,g)$ は境界のない滑らかな時間向き付き4次元大域双曲Lorentz時空、計量符号は $(-,+,+,+)$、$m\ge0$、$\xi\in\mathbb R$ とします。[QCURV1の作用素](../QCURV1/index.md#def-qcurv1-kg-operator)を

$$
P=-\Box_g+V,\qquad V=m^2+\xi R\in C^\infty(M,\mathbb R)
$$

と書きます。$\Sigma$ は滑らかな空間的Cauchy面、$n^a$ は未来向き単位法線、$d\Sigma$ は誘導された正の体積要素です。

初期データが $C_c^\infty(\Sigma)$ に属する実解の空間を $\mathcal S$ と書きます。複素初期データを許した解空間 $\mathcal S_{\mathbb C}$ はその複素化で、複素共役 $u\mapsto\bar u$ により閉じています。空間非コンパクトの場合の積分・極限には台の条件を使い、デルタ規格化した平面波は一般化されたモードとして区別します。

## 1. 解の間に残る保存量

実場の二つの解 $f,h$ を比べるとき、単に $\int_\Sigma fh$ を積分しても時間発展に伴い変化することがあります。そこで場の値と法線方向微分を交差させます。これは初期値 $(f_0,f_1)$ と $(h_0,h_1)$ の組に対して $f_0h_1-f_1h_0$ を積分する操作です。

<a id="def-qcurv2-symplectic"></a>

<!-- formal-statement-start -->
> **定義（実Klein–Gordon解のシンプレクティック形式）**  
> 上記の $\mathcal S$ に属する実解 $f,h$ とCauchy面 $\Sigma$ に対し、実双線形形式を

$$
\sigma_\Sigma(f,h)=\int_\Sigma
\left(f n^a\nabla_a h-h n^a\nabla_a f\right)d\Sigma
$$

> と定める。$\sigma_\Sigma(f,h)=-\sigma_\Sigma(h,f)$ を交代性と呼ぶ。以下でCauchy面に依らないことと非退化性を証明した後、添字 $\Sigma$ を外して $\sigma$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv2-symplectic -->
### 例：一つの振動モードの初期値で確認する

超静的な背景 $g=-dt^2+h$ で、$L=-\Delta_h+m^2+\xi R_h$ の実固有関数 $\psi$ が $L\psi=\omega^2\psi$、$\omega>0$、$\int_\Sigma\psi^2d\Sigma=1$ を満たすとします。[$P$ の超静的表示](../QCURV1/index.md#prop-qcurv1-ultrastatic)より $f=\cos(\omega t)\psi$、$h=\omega^{-1}\sin(\omega t)\psi$ は解です。$t=0$ では $(f,\dot f)=(\psi,0)$、$(h,\dot h)=(0,\psi)$。ゆえに

$$
\sigma_{t=0}(f,h)=\int_\Sigma\psi^2d\Sigma=1,
\qquad\sigma_{t=0}(h,f)=-1,
\qquad\sigma_{t=0}(f,f)=0.
$$

**定義の確認**：二つの引数は実解であり、正規化された空間モードを用いて積分可能です。入力順を交換した符号と同じ入力での零を直接計算し、双線形性は積分の線形性から従います。$\sigma(f,f)=0$ でも $f$ 自身が零とは限りません。
<!-- definition-example-end -->

複素解では、最初の引数を複素共役にして、正・負の振動を区別する形式を作ります。ここで**Hermitian形式**とは第一引数に共役線形、第二引数に線形で、引数の交換が複素共役になる形式です。正定値性はその定義には含めず、別に調べます。

<a id="def-qcurv2-kg-pairing"></a>

<!-- formal-statement-start -->
> **定義（曲がった背景上のKlein–Gordon内積）**  
> $u,v\in\mathcal S_{\mathbb C}$ とCauchy面 $\Sigma$ に対し、Hermitian形式を

$$
(u,v)_{\mathrm{KG},\Sigma}
=i\int_\Sigma\left(\bar u\,n^a\nabla_a v
-(n^a\nabla_a\bar u)\,v\right)d\Sigma
$$

> と定義する。複素解全体では正定値性を仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv2-kg-pairing -->
### 例：共役な二つのモードは逆符号

先ほどの $\psi$ と $\omega>0$ を用いて $u=e^{-i\omega t}\psi/\sqrt{2\omega}$ と置くと、$n^a\nabla_au=\partial_tu=-i\omega u$ です。共役は $\partial_t\bar u=i\omega\bar u$ を満たします。これを定義に代入して

$$
\begin{aligned}
(u,u)_{\mathrm{KG}}
&=i\int_\Sigma\bigl(-i\omega|u|^2-i\omega|u|^2\bigr)d\Sigma
=2\omega\int_\Sigma|u|^2d\Sigma=1,\\
(\bar u,\bar u)_{\mathrm{KG}}&=-1,\qquad
(u,\bar u)_{\mathrm{KG}}=0.
\end{aligned}
$$

最後の交差項は $\bar u\,\partial_t\bar u-(\partial_t\bar u)\bar u=0$ から従います。**定義の確認**：解・複素共役・有限積分・Hermitian性は保たれますが、$\bar u\ne0$ に対して負のノルムがあるため、全解空間をHilbert空間と呼べません。
<!-- definition-example-end -->

<a id="thm-qcurv2-conservation"></a>

<!-- formal-statement-start -->
> **定理（保存内積とCauchy面独立性）**  
> $(M,g)$ を上記の大域双曲時空とし、$V$ は実数値で滑らかとする。コンパクト支持Cauchy初期データを持つ任意の複素解 $u,v\in\mathcal S_{\mathbb C}$ に対し、$(u,v)_{\mathrm{KG},\Sigma}$ は滑らかな空間的Cauchy面 $\Sigma$ の選び方に依らない。実解の $\sigma_\Sigma$ も同様である。
<!-- formal-statement-end -->

### 証明の見取り図

二つの解を掛け合わせた保存流を作ります。[QCURV1の方程式](../QCURV1/index.md#def-qcurv1-kg-operator)でその発散を零にし、二つのCauchy面に挟まれた領域で発散の体積積分を境界流束へ移します。初期データの因果的支持条件が側面の流束を消す鍵です。

<!-- proof-start -->
### 証明

複素解に対してベクトル場

$$
j^a(u,v)=i\left(\bar u\,\nabla^a v-v\,\nabla^a\bar u\right)
$$

を作ります。積の微分とスカラーの共変微分の可換性により、交差する一次微分項が相殺されて

$$
\begin{aligned}
\nabla_aj^a
&=i\bigl((\nabla_a\bar u)\nabla^av
+\bar u\Box_gv-(\nabla_av)\nabla^a\bar u
-v\Box_g\bar u\bigr)\\
&=i\bigl(\bar u\Box_gv-v\Box_g\bar u\bigr).
\end{aligned}
$$

$Pu=Pv=0$ かつ $V$ が実なので、$\Box_gv=Vv$、$\Box_g\bar u=V\bar u$。従って発散は $i(\bar uVv-vV\bar u)=0$ です。

まず同じ大域時間関数の二枚のレベル面 $\Sigma_{t_1},\Sigma_{t_2}$ を取ります。初期データの支持を $K$ とすると、[QCURV1の因果的支持評価](../QCURV1/index.md#cor-qcurv1-cauchy)で $j$ の支持は $J(K)$ に含まれ、二つのCauchy面間の時間スラブ内では適切な大きなコンパクト領域の側面で $j=0$ とできます（大域双曲性による有限時間の因果影のコンパクト性を使います）。[曲率結合Klein–Gordon作用素の座標表示](../QCURV1/index.md#prop-qcurv1-kg-coordinate)を導出したとき、$\sqrt{-\det g}\,\nabla_aj^a=\partial_a(\sqrt{-\det g}\,j^a)$ を示しました。局所座標片で積分すると、隣接片の内側の境界流束は逆向きで相殺し、時間スラブの外側の境界だけが残ります。未来端と過去端の外向き法線の違いを入れると

$$
0=\int_{\mathrm{slab}}\nabla_aj^a\,d\mathrm{vol}_g
=-\int_{\Sigma_{t_2}}n_aj^a\,d\Sigma
+\int_{\Sigma_{t_1}}n_aj^a\,d\Sigma.
$$

$n_aj^a=i(\bar u\,n^a\nabla_av-v\,n^a\nabla_a\bar u)$ は定義した内積の被積分関数そのものです。任意の二枚の滑らかな空間的Cauchy面も同じ保存流を使って比較でき、必要なら共通の時間スライスを挟みます。実解 $f,h$ については $j^a(f,h)=i(f\nabla^ah-h\nabla^af)$ なので $(f,h)_{\mathrm{KG}}=i\sigma(f,h)$ が成り立ち、$\sigma$ も保存されます。
<!-- proof-end -->

無限遠の流束が消えることを確認せず、任意の非減衰平面波へこの証明を適用してはいけません。平面波のデルタ規格化は別の分布的意味を持ちます。さらに $V$ が複素なら $\bar u$ は同じ方程式を満たさず、上の二つの $V$ が相殺される段階が壊れます。

<a id="prop-qcurv2-nondegenerate"></a>

<!-- formal-statement-start -->
> **命題（実解空間での非退化性）**  
> 上記の $\mathcal S$ において、$\sigma(f,h)=0$ がすべての $h\in\mathcal S$ に対して成り立つなら $f=0$ である。従って $\sigma$ は非退化で、引数交換時に符号が反転する実双線形形式である。
<!-- formal-statement-end -->

### 証明の見取り図

「非退化」とは $f$ をすべての解と組にした値が零なら $f=0$ という意味です。初期値問題の存在一意性により、相手の場の初期値と初期速度を**独立に**選べるので、二つの初期データを順に取り出します。

<!-- proof-start -->
### 証明

$f_0=f|_\Sigma$、$f_1=n^a\nabla_af|_\Sigma$ とします。任意の $k\in C_c^\infty(\Sigma,\mathbb R)$ に対し、[曲率結合場の大域Cauchy問題](../QCURV1/index.md#cor-qcurv1-cauchy)で初期データ $(0,k)$ を持つ $h$ が存在します。これを[シンプレクティック形式](#def-qcurv2-symplectic)へ代入すると

$$
0=\sigma(f,h)=\int_\Sigma f_0 k\,d\Sigma.
$$

試験関数の任意性と正の体積密度により $f_0=0$ です。次に $(k,0)$ を持つ $h$ を取れば

$$
0=\sigma(f,h)=-\int_\Sigma f_1k\,d\Sigma
$$

なので $f_1=0$。零初期値からの解の一意性により $f=0$ です。交代性は定義の被積分関数を入れ替えれば従います。
<!-- proof-end -->

## 2. なぜ正振動数を「選ぶ」必要があるのか

[QFT3の平坦時空での正負振動数分解](../../QFT/QFT3/index.md#def-qft3-frequency)は時間座標 $t$ に関して $e^{-i\omega t}$ と $e^{+i\omega t}$ を分けました。一般の曲がった背景では保存内積があっても、時間並進の対称性やすべての解に共通なエネルギー固有値が存在するとは限りません。

ここで使う**複素構造**とは、実ベクトル空間の上で二回作用させると $-1$ となる実線形演算子 $J$ のことです。さらに保存形式 $\sigma$ と両立するよう選びます。複素構造は解を勝手に複素数化する操作ではなく、もとの実いくつかの自由度をどのように「正と負」に分けるかを決めます。

<a id="def-qcurv2-compatible-complex"></a>

<!-- formal-statement-start -->
> **定義（正の両立複素構造）**  
> 非退化な実シンプレクティック空間 $(\mathcal S,\sigma)$（またはその適切な実の完成空間）上の実線形写像 $J$ が

$$
J^2=-I,\qquad
\sigma(Jf,Jh)=\sigma(f,h),\qquad
\mu(f,h):=\sigma(f,Jh)
$$

> を満たし、$\mu$ が対称で $f\ne0$ に対し $\mu(f,f)>0$ なら、$J$ を正の両立複素構造と呼ぶ。$J$ を複素線形に拡張したとき、固有値 $+i$ の部分を正振動数部分空間とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv2-compatible-complex -->
### 例：一個の調和振動子を正振動数に分ける

**定義の確認**：$J^2=-I$、交差形式の保存、対称正定値性の三条件を初期値の係数から直接調べます。

第1節の正規化空間モードを固定し、実解を

$$
f_{q,p}(t,x)=\left(q\cos\omega t+\frac p\omega\sin\omega t\right)\psi(x)
$$

と初期値 $(q,p)\in\mathbb R^2$ で表します。[形式の定義](#def-qcurv2-symplectic)へ $t=0$ を代入すれば $\sigma(f_{q,p},f_{q',p'})=qp'-pq'$ です。この座標は元の場の初期値と法線微分の**係数**を表し、その交差積が定義の積分に一致しています。ここで

$$
J(q,p)=\left(-\frac p\omega,\omega q\right)
$$

とします。行列を書くなら基底 $(1,0),(0,1)$ における $J$ は $\bigl(\begin{smallmatrix}0&-1/\omega\\\omega&0\end{smallmatrix}\bigr)$ です。列が各基底ベクトルの像になっているためで、判定するのは定義の**三条件**です。

$$
\begin{aligned}
J^2(q,p)&=(-q,-p),\\
\sigma(J(q,p),J(q',p'))
&=(-p/\omega)(\omega q')-(\omega q)(-p'/\omega)=qp'-pq',\\
\mu((q,p),(q',p'))
&=qq'\omega+pp'/\omega.
\end{aligned}
$$

$\mu$ は対称で、$\mu((q,p),(q,p))=\omega q^2+p^2/\omega>0$（非零のとき）です。最後に $J\cos\omega t=\sin\omega t$、$J\sin\omega t=-\cos\omega t$ から $J(e^{-i\omega t})=i e^{-i\omega t}$ を直接確認できます。これで条件・振動数の符号・選んだ基底との関係をすべて確かめました。
<!-- definition-example-end -->

<a id="prop-qcurv2-projection"></a>

<!-- formal-statement-start -->
> **命題（正振動数射影と正定値内積）**  
> $(\mathcal S,\sigma)$ に正の両立複素構造 $J$ があるとする。複素化上で $Kf=(f-iJf)/2$ と置けば $J(Kf)=iKf$ である。また実解 $f,h$ について

$$
(Kf,Kh)_{\mathrm{KG}}=\frac12\left(\mu(f,h)+i\sigma(f,h)\right).
$$

> よって $f\ne0$ に対し $(Kf,Kf)_{\mathrm{KG}}=\mu(f,f)/2>0$ であり、正振動数部分は正定値な一粒子内積を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$K$ は「実解と $J$ で90度回した実解」を合わせる射影です。実解同士のKG形式は $i\sigma$ なので、共役線形性を守って四項を展開します。

<!-- proof-start -->
### 証明

$J^2=-I$ だから

$$
J(Kf)=\frac12(Jf-iJ^2f)=\frac12(Jf+if)=iKf.
$$

実解について $(f,h)_{\mathrm{KG}}=i\sigma(f,h)$ です。$\sigma(Jf,Jh)=\sigma(f,h)$ を使い、また

$$
\sigma(Jf,h)=-\sigma(f,Jh)=-\mu(f,h)
$$

（後の等号は $\sigma(Jf,J^2h)=\sigma(f,Jh)$ に $J^2h=-h$ を代入）を得ます。したがって

$$
\begin{aligned}
(Kf,Kh)_{\mathrm{KG}}
&=\frac14(f-iJf,h-iJh)_{\mathrm{KG}}\\
&=\frac{i}{4}\left[\sigma(f,h)-i\sigma(f,Jh)
+i\sigma(Jf,h)+\sigma(Jf,Jh)\right]\\
&=\frac{i}{4}\left[2\sigma(f,h)-2i\mu(f,h)\right]\\
&=\frac12\bigl(\mu(f,h)+i\sigma(f,h)\bigr).
\end{aligned}
$$

この展開で第一引数の $-iJf$ は共役線形性により $+i\sigma(Jf,\cdot)$ を生みます。$h=f$ なら $\sigma(f,f)=0$ なので正定値性が従います。
<!-- proof-end -->

ただし一般の $(M,g)$ には、物理的に優先すべき $J$ を決める世界共通の時間並進がありません。「正の両立複素構造が存在する」と「特定のものが背景だけから一意に決まる」は異なります。$J$ が作用する関数空間・完成の仕方も指定する必要があり、特に非コンパクトな空間では正振動数への射影がコンパクト台を保存するとは限りません。

## 3. 量子状態は二点関数にも現れる

正振動数部分のKG内積が正になれば、その内積による完備化を $\mathcal H_J$ と書けます。これは一個の量子励起を入れるHilbert空間であり、[QFT4の対称Fock空間](../../QFT/QFT4/index.md#def-qft4-fock-space)の構成に従って

$$
\mathscr F_s(\mathcal H_J)=\mathbb C\oplus\mathcal H_J
\oplus\mathcal H_J^{\widehat\otimes_s2}\oplus\cdots
$$

を作ります。零粒子成分 $|0_J\rangle=(1,0,\ldots)$ がこの選択に対応するFock真空です。有限個の正規直交モード $u_j$ を使う段階では、$[a_j,a_k^\dagger]=\delta_{jk}$ という交換関係は[QFT4のFock交換関係](../../QFT/QFT4/index.md#thm-qft4-fock-ccr)と同じです。無限個の場合には無制限作用素の共通稠密領域・場の分布としての意味を付け加えます。

一点での粒子数よりも基本的なのは、二つの時空点における量子場の積の期待値です。点ごとの作用素積は形式的な表示とし、実際には滑らかなコンパクト支持試験関数で二点を別々に積分した分布として扱います。これを次に定義します。

<a id="def-qcurv2-wightman"></a>

<!-- formal-statement-start -->
> **定義（Fock真空のWightman二点分布）**  
> 正振動数部分の正規直交モード $u_j$ を持つ自由実場について、真空 $|0_J\rangle$ の二点分布 $W_J$ を、試験関数による積分が定義される範囲で

$$
W_J(x,y):=\langle0_J|\widehat\phi(x)\widehat\phi(y)|0_J\rangle
=\sum_j u_j(x)\overline{u_j(y)}
$$

> と定める。$W_J(F,G)$ は $W_J(x,y)$ を $F(x)G(y)$ と積分した双線形な分布の値である。$\widehat\phi(F)$ は試験関数 $F$ による量子場のsmearingを意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv2-wightman -->
### 例：一モードでは時間差だけの関数

**定義の確認**：正規化した正振動数モードからFock真空の期待値を作り、二点での順序と共役関係まで確認します。

実の正規化された空間モード $\psi$ を一つ固定し、$u(t,x)=e^{-i\omega t}\psi(x)/\sqrt{2\omega}$ とすると、そのモードだけの二点関数は

$$
W((t,x),(s,y))=\frac{e^{-i\omega(t-s)}}{2\omega}\psi(x)\psi(y).
$$

場を $\widehat\phi(t,x)=a u(t,x)+a^\dagger\bar u(t,x)$ と置き、$a|0\rangle=0$、$[a,a^\dagger]=1$ を使うと、四つの積のうち $\langle0|aa^\dagger|0\rangle u(t,x)\bar u(s,y)$ だけが残ります。$W(x,y)=\overline{W(y,x)}$ ですが、一般に $W(x,y)\ne W(y,x)$ です。正値性は次の命題で試験関数に対して確認します。
<!-- definition-example-end -->

<a id="prop-qcurv2-wightman-properties"></a>

<!-- formal-statement-start -->
> **命題（二点分布の正値性・方程式・交換子）**  
> 上記の自由実場のFock構成が試験関数上の分布として定義でき、正規直交モードの展開が分布の意味で収束すると仮定する。任意の複素数値 $F\in C_c^\infty(M)$ について

$$
W_J(\bar F,F)\ge0,
$$

> また分布の意味で $P_xW_J=P_yW_J=0$ である。実試験関数 $F,G$ に対し、交換子の真空期待値は

$$
\langle0_J|[\widehat\phi(F),\widehat\phi(G)]|0_J\rangle
=W_J(F,G)-W_J(G,F)
=2i\operatorname{Im}W_J(F,G).
$$

> 特に対称部分は状態選択を反映し、反対称部分は場の交換子を反映する。
<!-- formal-statement-end -->

### 証明の見取り図

正値性は、$W$ を正振動数モードの積として書くと絶対値二乗の和になることから従います。方程式は各 $u_j$ に $P u_j=0$ を適用します。交換子は二つの場の積の差そのものです。

<!-- proof-start -->
### 証明

複素試験関数 $F$ を固定し、$c_j=\int_M\bar F(x)u_j(x)d\mathrm{vol}_g(x)$ と書きます。二点分布の定義から

$$
\begin{aligned}
W_J(\bar F,F)
&=\sum_j\left(\int_M\bar F(x)u_j(x)d\mathrm{vol}_g(x)\right)
\left(\int_M F(y)\bar u_j(y)d\mathrm{vol}_g(y)\right)\\
&=\sum_j c_j\bar c_j=\sum_j|c_j|^2\ge0.
\end{aligned}
$$

無限和の場合は分布としての収束を仮定しているので、非負の有限部分和の極限として不等式が保たれます。$P$ は実係数なので $P\bar u_j=0$ も成立し、$P_x[u_j(x)\bar u_j(y)]=(Pu_j)(x)\bar u_j(y)=0$、$P_y$ 側も同様です。分布の微分は試験関数へ移して解釈できます。

最後は交換子の定義と真空期待値の線形性から第一の等号を得ます。実 $F,G$ では $W_J(G,F)=\overline{W_J(F,G)}$ なので、差は $2i\operatorname{Im}W_J(F,G)$ です。形式的な点の表示でも $[a_j,a_k^\dagger]=\delta_{jk}$ により

$$
[\widehat\phi(x),\widehat\phi(y)]
=\sum_j\bigl(u_j(x)\bar u_j(y)-\bar u_j(x)u_j(y)\bigr)I,
$$

と計算でき、分布の式と一致します。任意の状態で同じ交換子を持つことはこの自由場の正準交換関係を固定した結果であり、正値性だけから交換子の値が決まったわけではありません。
<!-- proof-end -->

二点分布を正であると呼ぶとき、**各点で $W(x,y)\ge0$ という意味ではありません**。複素数値の分布を試験関数で挟むと非負になるという条件です。また正値性・方程式・交換関係だけで全ての物理的状態を選別できません。局所的な短距離特異性を制限するHadamard条件は後続章で扱い、一般定理はMICA系列に接続します。

## 4. 時間並進対称性がある場合の具体的な状態

ここでは抽象的な $J$ を、実際に計算できる固有モードから作ります。$M=\mathbb R\times\Sigma$、$g=-dt^2+h$ とし、$\Sigma$ は**コンパクト・境界なし**と仮定します。$h$ と $R_h$ は時間に依らず、空間作用素

$$
L=-\Delta_h+m^2+\xi R_h
$$

が厳密に正（ある $\varepsilon>0$ について $L\ge\varepsilon I$）であるとします。例えば $m>0,\xi=0$ ならこの条件は満たされます。この条件なら零振動数や負の固有値を除外でき、$L$ の実固有関数 $\psi_j$ を $L^2(\Sigma)$ の正規直交基底として取れます。ここで必要な固有関数の存在・完備性は、コンパクト断面上の自己共役楕円作用素が持つ離散固有モードの理論を使います。その一般証明は本章では扱わず、以下はこのモード系を実際に与えたときの場の計算です。

<a id="prop-qcurv2-ultrastatic-modes"></a>

<!-- formal-statement-start -->
> **命題（超静的背景の規格化モードと真空）**  
> 上記のコンパクトな超静的背景と正の $L$ で $L\psi_j=\omega_j^2\psi_j$、$\omega_j>0$、$\int_\Sigma\psi_j\psi_kd\Sigma=\delta_{jk}$ とする。このとき

$$
u_j(t,x)=\frac{e^{-i\omega_j t}}{\sqrt{2\omega_j}}\psi_j(x)
$$

> は $Pu_j=0$ を満たし、$(u_j,u_k)_{\mathrm{KG}}=\delta_{jk}$、$(\bar u_j,\bar u_k)_{\mathrm{KG}}=-\delta_{jk}$、$(u_j,\bar u_k)_{\mathrm{KG}}=0$ を満たす。これらを正振動数部分とすると、対応する二点分布は

$$
W_0((t,x),(s,y))
=\sum_j\frac{e^{-i\omega_j(t-s)}}{2\omega_j}\psi_j(x)\psi_j(y)
$$

> であり、同時刻並進 $(t,s)\mapsto(t+a,s+a)$ に対して不変である。無限和は分布として解釈する。
<!-- formal-statement-end -->

### 証明の見取り図

[超静的な場の方程式](../QCURV1/index.md#prop-qcurv1-ultrastatic)は $(\partial_t^2+L)u=0$ です。時間微分で $-\omega_j^2$ が生じることを確認し、KG内積の空間積分を固有関数の直交性へ落とします。

<!-- proof-start -->
### 証明

$\partial_t^2u_j=-\omega_j^2u_j$、$Lu_j=\omega_j^2u_j$ なので $(\partial_t^2+L)u_j=0$ です。$\partial_tu_k=-i\omega_k u_k$、$\partial_t\bar u_j=i\omega_j\bar u_j$ を使い、[KG内積の定義](#def-qcurv2-kg-pairing)へ代入すると

$$
\begin{aligned}
(u_j,u_k)_{\mathrm{KG}}
&=i\int_\Sigma\bigl(-i\omega_k\bar u_ju_k-i\omega_j\bar u_ju_k\bigr)d\Sigma\\
&=\frac{\omega_j+\omega_k}{2\sqrt{\omega_j\omega_k}}
e^{i(\omega_j-\omega_k)t}\int_\Sigma\psi_j\psi_kd\Sigma
=\delta_{jk}.
\end{aligned}
$$

$\bar u$ 同士は各時間微分の符号が逆なので $-\delta_{jk}$ です。交差項は $u_ju_k$ に対して $\omega_j-\omega_k$ を係数に持ち、$j\ne k$ では空間直交性で零、$j=k$ では係数が零です。固有値縮退があっても同じ直交基底を取っているので問題ありません。

[$W$ のモード表示](#def-qcurv2-wightman)へ代入して主張の級数を得ます。$t-s$ だけに依存するから同時刻並進不変です。滑らかなコンパクト支持試験関数で時間積分を行うと、高い $\omega_j$ に対するFourier係数は繰返し部分積分により任意次数で減衰し、空間の楕円スペクトルの多項式的な増大を抑えます。従って適切な試験関数上で級数は分布を定めます。
<!-- proof-end -->

このモードは計量が時間並進 $t\mapsto t+a$ で変わらない対称性を利用しています。しかし $L$ に零固有値があると $1/\sqrt{2\omega_j}$ は使えず、負固有値があると振動せず指数的に成長します。たとえば $m=\xi=0$ のコンパクト空間では空間一定の零モードがあり、上の構成をそのまま適用できません。**時間並進が存在するだけで、常にこの形式の真空を作れるわけではない**のです。

### 同じ古典振動子に別の真空がある

正規化モードを一つだけ取り、実数 $r$ に対して

$$
v=\cosh(r)u+\sinh(r)\bar u
$$

と置きます。[KG内積の正負の符号](#def-qcurv2-kg-pairing)と直交性により

$$
(v,v)_{\mathrm{KG}}=\cosh^2r-\sinh^2r=1,
\qquad (v,\bar v)_{\mathrm{KG}}=0.
$$

従って $v$ を正振動数に選んだ別の複素構造・Fock真空 $|0_v\rangle$ も作れます。この一モードについて、時刻 $t$ の座標演算子 $\widehat q(t)=b v(t)+b^\dagger\bar v(t)$（$b|0_v\rangle=0$）の揺らぎは

$$
\begin{aligned}
\langle0_v|\widehat q(t)^2|0_v\rangle
&=|v(t)|^2\\
&=\frac1{2\omega}\left(\cosh(2r)+\sinh(2r)\cos(2\omega t)\right).
\end{aligned}
$$

$r=0$ では時間に依らず $1/(2\omega)$、$r\ne0$ では振動します。場の方程式・保存形式・交換関係は同じでも、状態の二点関数は違います。超静的背景では時間並進を生成するエネルギーが最小となる真空を選ぶ追加基準がありますが、**古典方程式だけ**からそれが選ばれたのではありません。

## 5. 何が決まり、何が残るか

| 古典場で決まるもの | さらに量子状態で選ぶもの |
| --- | --- |
| $P$ とCauchyデータからの古典解 | 両立複素構造 $J$、正振動数の部分空間 |
| 保存された $\sigma$ と不定符号のKG形式 | 一粒子内積が正になる選択とFock真空 |
| 自由場の交換子の反対称構造 | 二点分布の対称部分・揺らぎ・粒子の解釈 |

時間に沿って背景が変わると、初期に自然に見えた正振動数部分と後期のそれが一致するとは限りません。次章では二つの完全モード系を比較し、Bogoliubov変換の係数がどの正準条件を満たすか、真空から観測される粒子数をどう計算するかを扱います。

## 演習

### Level A：定義・符号・直接判定

<a id="ex-qcurv2-a01"></a>
#### QCURV2-A01 一モードのKG符号を計算する
- Level: A

$g=-dt^2+h$、$L\psi=\omega^2\psi$、$\omega>0$、実 $\psi$ は $\int_\Sigma\psi^2d\Sigma=1$ とする。$u=e^{-i\omega t}\psi/\sqrt{2\omega}$ について $(u,u)_{\mathrm{KG}}$、$(\bar u,\bar u)_{\mathrm{KG}}$、$(u,\bar u)_{\mathrm{KG}}$ を求めよ。

<!-- solution-start -->
**詳細解答。** [KG内積](#def-qcurv2-kg-pairing)の法線微分はこの背景で $\partial_t$ です。$\dot u=-i\omega u$、$\dot{\bar u}=i\omega\bar u$ だから

$$
(u,u)_{\mathrm{KG}}=i\int_\Sigma\bigl(\bar u(-i\omega u)-(i\omega\bar u)u\bigr)\,d\Sigma
=2\omega\int_\Sigma|u|^2d\Sigma=1.
$$

同じ計算で $(\bar u,\bar u)_{\mathrm{KG}}=-2\omega\int|u|^2=-1$ です。交差項は $i\int(\bar u\,\dot{\bar u}-\dot{\bar u}\,\bar u)d\Sigma=0$。非零の $\bar u$ のノルムが負なので全複素解空間は正定値ではありません。
<!-- solution-end -->

<a id="ex-qcurv2-a02"></a>
#### QCURV2-A02 振動子でCauchy面独立性を確かめる
- Level: A

$f(t)=\cos\omega t$、$h(t)=\omega^{-1}\sin\omega t$（$\omega>0$）を、空間積分が1になる規格化された一モードの係数とする。$\sigma_t(f,h)=f(t)\dot h(t)-h(t)\dot f(t)$ を任意の $t$ で計算せよ。

<!-- solution-start -->
**詳細解答。** $\dot f=-\omega\sin\omega t$、$\dot h=\cos\omega t$ をそれぞれ代入すると

$$
\sigma_t(f,h)
=\cos^2\omega t-\frac{\sin\omega t}{\omega}(-\omega\sin\omega t)
=\cos^2\omega t+\sin^2\omega t=1.
$$

定義の二項を引く順序が重要です。$t=0$ だけでなく任意の時刻で保存されていることを直接確かめられました。
<!-- solution-end -->

<a id="ex-qcurv2-a03"></a>
#### QCURV2-A03 複素構造の三条件
- Level: A

$\mathbb R^2$ に $\sigma((q,p),(q',p'))=qp'-pq'$ を与え、$\omega>0$ とする。$J(q,p)=(-p/\omega,\omega q)$ が正の両立複素構造かを、定義の全条件で判定せよ。

<!-- solution-start -->
**詳細解答。** [両立複素構造の定義](#def-qcurv2-compatible-complex)では $J^2=-I$、$\sigma$ の保存、$\mu$ の対称正定値性を別々に確認します。

$$
J^2(q,p)=J(-p/\omega,\omega q)=(-q,-p).
$$

さらに

$$
\begin{aligned}
\sigma(J(q,p),J(q',p'))
&=(-p/\omega)(\omega q')-(\omega q)(-p'/\omega)\\
&=qp'-pq',\\
\mu((q,p),(q',p'))
&=\sigma((q,p),(-p'/\omega,\omega q'))
=\omega qq'+pp'/\omega.
\end{aligned}
$$

最後の式は引数の交換で不変です。$\omega>0$ より $\mu((q,p),(q,p))=\omega q^2+p^2/\omega$ は $(q,p)\ne(0,0)$ のとき厳密に正です。従ってすべて満たします。
<!-- solution-end -->

<a id="ex-qcurv2-a04"></a>
#### QCURV2-A04 二点関数と交換子の違い
- Level: A

一個の規格化振動子の真空に対して $W(t,s)=e^{-i\omega(t-s)}/(2\omega)$（$\omega>0$）とする。$W(s,t)$ と $W(t,s)-W(s,t)$ を求め、$W(t,t)$ が何を表すか述べよ。

<!-- solution-start -->
**詳細解答。** 時刻を交換すると指数の符号が反転し、$W(s,t)=e^{i\omega(t-s)}/(2\omega)=\overline{W(t,s)}$ です。Eulerの公式で

$$
W(t,s)-W(s,t)
=\frac{-2i\sin(\omega(t-s))}{2\omega}
=-\frac{i}{\omega}\sin\bigl(\omega(t-s)\bigr).
$$

一方 $W(t,t)=1/(2\omega)$ はこの振動子の座標演算子 $\widehat q(t)$ の真空二乗期待値 $\langle0|\widehat q(t)^2|0\rangle$ です。二点関数は対称ではありませんが、反対称部分だけが交換子になります。
<!-- solution-end -->

<a id="ex-qcurv2-a05"></a>
#### QCURV2-A05 零振動数が規格化を妨げる理由
- Level: A

$M=\mathbb R\times S^3_a$、$m=\xi=0$、空間一定の実モード $\psi$ を $\int\psi^2=1$ と規格化する。このモードに対する時間方程式を求め、$e^{-i\omega t}/\sqrt{2\omega}$ を $\omega=0$ に代入してよいか判定せよ。

<!-- solution-start -->
**詳細解答。** $\Delta_h\psi=0$ だから $L\psi=(-\Delta_h+m^2+\xi R_h)\psi=0$ です。[超静的方程式](../QCURV1/index.md#prop-qcurv1-ultrastatic)は $\ddot q=0$ に還元され、解は $q(t)=A+Bt$ です。規格化因子 $1/\sqrt{2\omega}$ は $\omega=0$ で発散し、振動する独立な $e^{\pm i\omega t}$ もともに定数1に潰れます。第4節の $L\ge\varepsilon I$ が失われたため、正負のモードをこの公式で分離する機構が壊れます。
<!-- solution-end -->

### Level B：保存と量子化の導出

<a id="ex-qcurv2-b01"></a>
#### QCURV2-B01 時間依存振動子の保存Wronskian
- Level: B

実の滑らかな $\Omega(t)^2$ を係数とする $\ddot q+\Omega(t)^2q=0$ の複素解 $u,v$ を考える。$B(t)=i(\bar u\dot v-\dot{\bar u}v)$ の保存を直接示せ。$\Omega(t)$ が時間に依存していても結論が成り立つ理由を述べよ。

<!-- solution-start -->
**詳細解答。** 積の微分を四項に分けると

$$
\begin{aligned}
\dot B
&=i(\dot{\bar u}\dot v+\bar u\ddot v
-\ddot{\bar u}v-\dot{\bar u}\dot v)\\
&=i(\bar u\ddot v-\ddot{\bar u}v).
\end{aligned}
$$

係数が実なので、$\ddot v=-\Omega(t)^2v$、$\ddot{\bar u}=-\Omega(t)^2\bar u$ を使えます。よって $\dot B=i(-\Omega^2\bar uv+\Omega^2\bar uv)=0$。$\dot\Omega$ は現れません。二つの解に同じ**実の**係数が掛かることが必要で、時間並進対称性は保存Wronskianに不要です。
<!-- solution-end -->

<a id="ex-qcurv2-b02"></a>
#### QCURV2-B02 正規直交モードの四項を展開する
- Level: B

コンパクトな超静的背景で $L\psi_j=\omega_j^2\psi_j$、$\omega_j>0$、$\int\psi_j\psi_k=\delta_{jk}$ とする。$u_j=e^{-i\omega_jt}\psi_j/\sqrt{2\omega_j}$ について $(u_j,u_k)_{\mathrm{KG}}$ と $(u_j,\bar u_k)_{\mathrm{KG}}$ を求めよ。縮退 $\omega_j=\omega_k$ にも対応せよ。

<!-- solution-start -->
**詳細解答。** $\dot u_k=-i\omega_k u_k$ と $\dot{\bar u}_j=i\omega_j\bar u_j$ を代入すると

$$
(u_j,u_k)_{\mathrm{KG}}
=\frac{\omega_j+\omega_k}{2\sqrt{\omega_j\omega_k}}
e^{i(\omega_j-\omega_k)t}\delta_{jk}=\delta_{jk}.
$$

一方、二番目を $\bar u_k$ にすると $\partial_t\bar u_k=i\omega_k\bar u_k$ より

$$
(u_j,\bar u_k)_{\mathrm{KG}}
=-\frac{\omega_k-\omega_j}{2\sqrt{\omega_j\omega_k}}
e^{i(\omega_j+\omega_k)t}\delta_{jk}=0.
$$

問題で仮定した $\int\psi_j\psi_k=\delta_{jk}$ を使うので、異なる添字の固有値が偶然一致しても $\delta_{jk}=0$ です。同じ添字なら $\omega_k-\omega_j=0$。どちらの場合も交差項は零になります。
<!-- solution-end -->

<a id="ex-qcurv2-b03"></a>
#### QCURV2-B03 二点関数から等時刻交換関係を戻す
- Level: B

一振動子の $W(t,s)=e^{-i\omega(t-s)}/(2\omega)$ を用い、$[\widehat q(t),\widehat q(s)]$ を計算し、$\widehat p(t)=\dot{\widehat q}(t)$ として $[\widehat q(t),\widehat p(t)]=iI$ を復元せよ。

<!-- solution-start -->
**詳細解答。** [二点関数の反対称部分](#prop-qcurv2-wightman-properties)を取り、$C(t,s)=[\widehat q(t),\widehat q(s)]$ と書けば

$$
C(t,s)=\frac{e^{-i\omega(t-s)}-e^{i\omega(t-s)}}{2\omega}I
=-\frac{i}{\omega}\sin(\omega(t-s))I.
$$

二番目の時刻 $s$ で微分すると、$\partial_s\sin(\omega(t-s))=-\omega\cos(\omega(t-s))$ です。従って

$$
[\widehat q(t),\widehat p(s)]
=\partial_s C(t,s)=i\cos(\omega(t-s))I.
$$

$s=t$ とすれば $iI$。交換子は二点関数の**差**であり、$W(t,t)=1/(2\omega)$ を交換子と誤認してはいけません。
<!-- solution-end -->

<a id="ex-qcurv2-b04"></a>
#### QCURV2-B04 別の真空の揺らぎ
- Level: B

$u(t)=e^{-i\omega t}/\sqrt{2\omega}$、$\omega>0$、$v(t)=\cosh(r)u(t)+\sinh(r)\bar u(t)$（実 $r$）とする。$v$ のKGノルムと $|v(t)|^2$ を計算し、$r\ne0$ の状態が時間並進に不変かを考察せよ。

<!-- solution-start -->
**詳細解答。** $(u,u)=1$、$(\bar u,\bar u)=-1$、交差項零より

$$
(v,v)=\cosh^2r-\sinh^2r=1.
$$

絶対値二乗は、$u^2=e^{-2i\omega t}/(2\omega)$ を用いて

$$
\begin{aligned}
|v(t)|^2
&=\cosh^2r|u|^2+\sinh^2r|u|^2
+2\cosh r\sinh r\operatorname{Re}(u^2)\\
&=\frac1{2\omega}\left(\cosh^2r+\sinh^2r
+2\cosh r\sinh r\cos2\omega t\right)\\
&=\frac1{2\omega}\left(\cosh2r+\sinh2r\cos2\omega t\right).
\end{aligned}
$$

$r\ne0$ では $\sinh2r\ne0$ なので、一般の時間並進で値が変わります。古典方程式とKG規格化が同じでも、状態の時間並進不変性は別の条件です。
<!-- solution-end -->

### Level C：解空間から真空の比較まで

<a id="ex-qcurv2-c01"></a>
#### QCURV2-C01 二つの独立モードの量子状態
- Level: C

コンパクトな超静的背景で、実正規直交固有関数 $\psi_1,\psi_2$ が $L\psi_1=\psi_1$、$L\psi_2=4\psi_2$ を満たすとする。二モードに制限した実解を

$$
f(t,x)=\sum_{j=1}^2\left(q_j\cos\omega_jt
+\frac{p_j}{\omega_j}\sin\omega_jt\right)\psi_j(x),
\quad(\omega_1,\omega_2)=(1,2)
$$

とする。

1. 実解のシンプレクティック形式を $(q_1,p_1,q_2,p_2)$ で表し、非退化性を確認せよ。
2. 各モードで $J(q_j,p_j)=(-p_j/\omega_j,\omega_jq_j)$ としたとき、$J$ が正の両立複素構造であることを示せ。
3. 対応する規格化正振動数モード $u_j$ と二点関数 $W_0$ を書き、任意の複素試験関数 $F$ に対して $W_0(\bar F,F)\ge0$ を確かめよ（この二モード部分だけを扱う）。
4. 第一モードだけを $v_1=\cosh r\,u_1+\sinh r\,\bar u_1$ に替えた真空の二点関数を求め、第二モードの揺らぎは不変だが第一モードの揺らぎが変わることを示せ。

<!-- solution-start -->
**詳細解答。** (1) $t=0$ で $f|_\Sigma=q_1\psi_1+q_2\psi_2$、$\dot f|_\Sigma=p_1\psi_1+p_2\psi_2$ です。もう一つの初期値 $(q'_j,p'_j)$ と[シンプレクティック形式](#def-qcurv2-symplectic)へ入れると

$$
\begin{aligned}
\sigma(f,f')
&=\int_\Sigma\sum_{j,k}(q_jp'_k-p_jq'_k)\psi_j\psi_kd\Sigma\\
&=q_1p'_1-p_1q'_1+q_2p'_2-p_2q'_2.
\end{aligned}
$$

すべての $(q'_j,p'_j)$ との値が零なら、順に $p'_1=1,p'_2=1$ を一つずつ選んで $q_1=q_2=0$、$q'_1=1,q'_2=1$ を選んで $p_1=p_2=0$ です。したがって非退化です。

(2) 各ブロックで $J^2(q_j,p_j)=(-q_j,-p_j)$。第1節の交差積を各モードに適用すれば

$$
\sigma(Jf,Jf')=\sum_{j=1}^2(q_jp'_j-p_jq'_j)=\sigma(f,f').
$$

また $\mu(f,f')=\sum_{j=1}^2(\omega_jq_jq'_j+p_jp'_j/\omega_j)$ で対称です。特に

$$
\mu(f,f)=q_1^2+p_1^2+2q_2^2+\frac12p_2^2>0
$$

は非零初期値で正です。よって[$J$ の定義](#def-qcurv2-compatible-complex)の三条件をすべて満たします。

(3) $u_1(t,x)=e^{-it}\psi_1(x)/\sqrt2$、$u_2(t,x)=e^{-2it}\psi_2(x)/2$ です。[規格化モードの命題](#prop-qcurv2-ultrastatic-modes)の仮定 $\omega_j>0$ と直交性を満たします。よって

$$
W_0((t,x),(s,y))
=\frac{e^{-i(t-s)}}2\psi_1(x)\psi_1(y)
+\frac{e^{-2i(t-s)}}4\psi_2(x)\psi_2(y).
$$

$c_j(F)=\int_M\bar F(x)u_j(x)d\mathrm{vol}_g(x)$ と置けば、二点積分を展開して

$$
W_0(\bar F,F)=|c_1(F)|^2+|c_2(F)|^2\ge0.
$$

これは個々の $W_0(x,y)$ が実非負という主張ではありません。

(4) $v_1$ と $u_2$ は空間直交性によりKG直交で、$v_1$ のノルムは $\cosh^2r-\sinh^2r=1$。従って新しい二点関数は

$$
W_r((t,x),(s,y))
=v_1(t,x)\overline{v_1(s,y)}
+u_2(t,x)\overline{u_2(s,y)}.
$$

$\psi_1$ を空間射影した場の同時刻二乗期待値は

$$
\int_{\Sigma^2}\psi_1(x)W_r((t,x),(t,y))\psi_1(y)d\Sigma_xd\Sigma_y
=\frac12\bigl(\cosh2r+\sinh2r\cos2t\bigr).
$$

同様に $\psi_2$ を射影すれば、第一モードは直交して消え、値は $1/(2\omega_2)=1/4$ のままです。第一モードの値は $r=0$ では $1/2$、$r\ne0$ では一般に時刻依存します。**保存された古典形式は共通でも真空の揺らぎは選択に依存する**ことを二つの観測モードで確認できました。
<!-- solution-end -->
