# BHI32 放射のentanglement wedge

## 1. islandの出現を「放射がどこを記述できるか」へ読み替える

[BHI24のisland候補と一般化エントロピー](../BHI24/index.md#def-bhi24-jt-island-ledger)では、非重力浴の放射領域 $R$ と重力側の候補領域 $I$ について、物質エントロピー $S_{\mathrm{matter}}(R\cup I)$ にisland端点の重力寄与を加えました。[BHI25の端点の極値化](../BHI25/index.md#prop-bhi25-thermal-functional)によって候補の位置を求め、[BHI26の極値化済みの枝の比較](../BHI26/index.md#def-bhi26-extremized-branches)と[BHI30の条件付きisland則](../BHI30/index.md#prop-bhi30-conditional-island)を使うと、半古典近似で放射エントロピーの支配枝が切り替わる場合を計算できます。

しかし、数 $S(R)$ が分かっただけでは、ブラックホール内部の演算子を放射から測定できるかは決まりません。その問いには、**幾何学的な領域**と、そこに付随する**量子情報の符号化**という二つの道具が必要です。

[HOLO25のentanglement wedgeの定義](../../HOLO/HOLO25/index.md#def-holo25-entanglement-wedge)は、選択済みの極値曲面と外側の境界領域に挟まれた空間的部分領域の、時間方向への依存域を使います。一方、[HOLO27の部分領域演算子再構成](../../HOLO/HOLO27/index.md#def-holo27-subregion-reconstruction)は、全コード状態で物理領域上の演算子が論理演算子と同じ作用をする条件です。本講では、JT＋浴の放射に対応する前者を具体化し、後者との間に何を追加で仮定するかを調べます。

対象を次に固定します。浴は非重力領域、$R$ はその指定した空間的放射部分領域、$I$ は同じ時刻断面に取った重力領域内のisland候補とします。$\partial I$ は[JTの一般化エントロピー](../BHI24/index.md#def-bhi24-jt-island-ledger)の停留条件を満たすQES端点であり、各候補の状態・浴との接合条件・紫外cutoff・重力境界条件は同一です。因果依存域を作るときは、これらを固定した半古典的な有効時空とその初期値問題を使います。

## 2. 放射に対応する空間領域と時間的な依存域

ある空間的部分領域 $\Sigma$ の**依存域** $D(\Sigma)$ は、適切な境界条件の下で、延長不能な因果曲線を調べると初期データが $\Sigma$ によって定まる時空部分です。[HOLO25の境界依存域の定義](../../HOLO/HOLO25/index.md#def-holo25-boundary-diamond)にある全因果曲線の条件を、ここでも有効時空の初期値問題に使います。空間的な $R\cup I$ と、その時間発展を含む $D(R\cup I)$ は同じ集合ではありません。

<a id="def-bhi32-radiation-wedge"></a>

<!-- formal-statement-start -->
> **定義（浴の放射に対するisland wedge）**  
> JT重力領域と非重力浴を接合した半古典模型で、浴の空間的領域 $R$、状態、接合・境界条件、共通cutoffを固定する。空候補 $I=\varnothing$ と、$R\cup I$ の一般化エントロピーに関して端点が停留する許容island候補を求め、同一の半古典近似で支配する候補 $I_*$ を選ぶ。指定した空間的部分Cauchy断面上で $R$ と $I_*$ に対応する部分領域を $\Sigma_{R,I_*}$ と書く。選択した鞍点の有効幾何と境界条件で取る依存域
>
$$
\mathcal E_{\mathrm{rad}}(R)
:=D_{\mathrm{eff}}(\Sigma_{R,I_*})
$$
>
> を、この設定の**放射のisland wedge**と呼ぶ。空候補では $\Sigma_{R,\varnothing}=R$、非空候補では $\Sigma_{R,I_*}=R\cup I_*$ とする。この構成は、[HOLO25のentanglement wedge](../../HOLO/HOLO25/index.md#def-holo25-entanglement-wedge)を非重力浴とislandを持つ設定に翻訳したもので、量子重力のHilbert空間が $R$ と $I$ の単純な直積に分かれるという定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi32-radiation-wedge -->
**定義の確認**（断面）：一つの空間断面を座標 $x$ で表し、左の重力側に $I=[-4,-2]$、右の浴に $R=[1,3]$ を置きます。端点は重ならず、$-4<-2<0<1<3$ です。

非空候補に選ばれた場合の初期領域は二つの区間の和集合です。$x=-3$ と $x=2$ は含み、$x=0$ は含みません。空候補を選べば $x=-3$ は含まれません。

ここで $I$ の端点が実際のJT模型でQESかどうかは、別途[停留方程式](../BHI25/index.md#prop-bhi25-thermal-functional)を満たすかで決めます。数値区間だけでQESを認定していません。
<!-- definition-example-end -->

この構成で「内部が放射に含まれる」というとき、**放射浴の場所が重力側へ物理的に移動する**のではありません。観測領域 $R$ 自体は同じであり、対応付けられた有効バルクの領域 $\mathcal E_{\mathrm{rad}}(R)$ が変わります。因果的に信号が $I$ から $R$ へ直接飛ぶという主張とも区別します。

### 2.1 離れた区間の依存域は二つの因果菱形になる

ここで一度、重力の曲率や接合を外し、時間座標 $\tau$ と空間座標 $x$ を持つ二次元Minkowski時空で**依存域の計算手順だけ**を確認します。計量は $ds^2=-d\tau^2+dx^2$、光速は1とします。これは実際のJT＋浴のQES解ではなく、定義の因果幾何部分を検算するための局所模型です。

<a id="prop-bhi32-disjoint-diamonds"></a>

<!-- formal-statement-start -->
> **命題（離れた二区間の因果依存域）**  
> 全実直線を初期断面 $\tau=0$ とする境界のない二次元Minkowski時空で、$a<b<c<d$ とし $J_1=[a,b]$、$J_2=[c,d]$ を置く。初期データを $J_1\cup J_2$ だけで与えるとき、その因果依存域は二区間の菱形の和集合であり、
>
$$
D(J_1\cup J_2)
=\bigcup_{[u,v]\in\{J_1,J_2\}}
\left\{(\tau,x):u+|\tau|\le x\le v-|\tau|\right\}.
$$
>
> とくに $D(J_1\cup J_2)$ は、二つの区間の間にある初期断面の空隙を埋めない。
<!-- formal-statement-end -->

### 証明の見取り図

点 $(\tau,x)$ から初期面に届き得る光円錐の足は、$[x-|\tau|,x+|\tau|]$ です。この足全体がどちらか一つの区間に入るかを調べます。二つの区間の間には空隙があるため、連結な足が両区間をまたいで空隙を避けることはできません。

<!-- proof-start -->
### 証明

$\tau>0$ とします。点 $(\tau,x)$ から過去へ向かう左右のnull直線は、初期面にそれぞれ $x-\tau$ と $x+\tau$ で交わります。速度 $|dx/d\tau|\le1$ の因果曲線が初期面に交わる位置は、この間のすべての値を取り得ます。従って初期面上の必要なデータ区間は
$$
F_{\tau,x}=[x-\tau,x+\tau].
$$
$F_{\tau,x}\subseteq[a,b]$ は $x-\tau\ge a$ かつ $x+\tau\le b$、すなわち $a+\tau\le x\le b-\tau$ と同値です。$[c,d]$ についても同じです。

もし $F_{\tau,x}$ が $[a,b]\cup[c,d]$ に含まれ、両方の区間と交わるなら、区間の連結性から $(b,c)$ の点も含まなければなりません。しかし $(b,c)$ には初期データがないので矛盾します。従って足はどちらか一つの区間に完全に含まれる必要があります。$\tau<0$ では未来向きのnull直線を初期面へ延ばし、時間反転により $\tau$ を $|\tau|$ に置き換えます。$\tau=0$ では元の二区間になります。$\square$
<!-- proof-end -->

**座標による検算**：$J_1=I=[-4,-2]$、$J_2=R=[1,3]$ なら、二つの菱形は
$$
D(I)=\{(\tau,x):-4+|\tau|\le x\le-2-|\tau|\},
$$
$$
D(R)=\{(\tau,x):1+|\tau|\le x\le3-|\tau|\}.
$$
$|\tau|=1/2$ では $D(I)$ の断面は $[-7/2,-5/2]$、$D(R)$ は $[3/2,5/2]$ です。$(\tau,x)=(1/2,-3)$ は前者に入りますが、後者に入りません。間の $(1/2,0)$ はどちらにも入りません。

この二菱形は**有効因果領域の模式計算**です。JTのdilatonの値や量子状態はこの平坦な座標から決まりません。実際のislandの位置は先にQES方程式で決め、選ばれた有効幾何の因果関係に戻して依存域を評価します。

## 3. Page転移前後のウェッジを候補から作る

[BHI26の二浴JT模型](../BHI26/index.md#prop-bhi26-page-crossing)では、端点の停留方程式を解いた後に異なる枝のエントロピーを比較しました。放射ウェッジについても**同じ順序**を守ります。候補islandを勝手に選んでから、その幾何を常に放射へ帰属させることはしません。

<a id="def-bhi32-wedge-phase"></a>

<!-- formal-statement-start -->
> **定義（二枝模型の放射ウェッジ相図）**  
> 同一の状態・放射領域 $R$ と正則化を持つ半古典模型を考える。空island枝のエントロピー $S_0(T)$ と、端点を停留化した許容非空island枝のエントロピー $S_I(T)$ が、時間パラメータ $T$ の範囲 $\mathcal T$ で計算されているとする。
>
> この二枝以外に支配枝がなく、[条件付きisland則](../BHI30/index.md#prop-bhi30-conditional-island)の適用条件が成立するとする。$S_0(T)<S_I(T)$ では空枝の $\mathcal E_0(R;T)$、$S_I(T)<S_0(T)$ では非空枝の $\mathcal E_I(R;T)$ を選ぶ。
>
> この時刻ごとの対応を**放射ウェッジ相図**と呼ぶ。両枝が等しい点では、先頭の半古典近似だけで一意の支配ウェッジを指定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi32-wedge-phase -->
**定義の確認**：エントロピーを自然対数単位の無次元量として、$T\ge0$、$S_0(T)=2T$、$S_I(T)=6$ とする二枝の**代数模型**を考えます。$T=1$ では $2<6$ なので空枝、$T=4$ では $6<8$ なのでisland枝です。$T=3$ は等値であり、定義は一意のウェッジを指定しません。$6$ が実在のJT端点から生じると仮定した模型ではなく、極値化後の枝の選択順序だけを検算しています。
<!-- definition-example-end -->

<a id="prop-bhi32-page-wedge-transition"></a>

<!-- formal-statement-start -->
> **命題（二枝交点と放射ウェッジの切替）**  
> 上の二枝模型で、$\mathcal T=[0,\infty)$、$S_0(T)=a+bT$、$S_I(T)=c+dT$ とし、$b>d\ge0$、$c>a\ge0$ と仮定する。両枝は指定済みの許容・停留化済み鞍点を表し、他の支配枝がないとする。このとき
>
$$
T_{\mathrm P}=\frac{c-a}{b-d}>0
$$
>
> より前で空island、後で非空islandが支配する。交点では両枝の先頭エントロピーが等しい。これは候補の幾何学的ラベルの切替であり、各時刻の物理的な復号写像の存在を単独で証明するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

差 $S_I-S_0$ を一変数一次式として計算し、傾きの符号と正の交点を確かめます。極値化済みという条件がないなら、この一次式はisland公式の枝の値とは呼べません。

<!-- proof-start -->
### 証明

差を取ると
$$
\Delta(T)=S_I(T)-S_0(T)=(c-a)-(b-d)T.
$$
仮定より $c-a>0$ かつ $b-d>0$ なので、$\Delta(0)>0$、傾き $-(b-d)<0$ です。$\Delta(T)=0$ を解くと $T_{\mathrm P}=(c-a)/(b-d)>0$ です。$0\le T<T_{\mathrm P}$ で $\Delta(T)>0$ より $S_0<S_I$、$T>T_{\mathrm P}$ で $\Delta(T)<0$ より $S_I<S_0$ です。交点では差が零であり、双方の候補を同じ先頭次数で保持する必要があります。$\square$
<!-- proof-end -->

| 時間域 | 比較結果 | 半古典的に選ばれる空間領域 | ウェッジの読み方 |
| --- | --- | --- | --- |
| $T<T_{\mathrm P}$ | $S_0<S_I$ | $\Sigma_{R,\varnothing}=R$ | 放射浴の依存域 |
| $T=T_{\mathrm P}$ | $S_0=S_I$ | 二つの競合候補 | 先頭次数では一意に選べない |
| $T>T_{\mathrm P}$ | $S_I<S_0$ | $\Sigma_{R,I_*}=R\cup I_*$ | 放射浴と選択済みislandの依存域 |

これは**空間領域の所属の変化**を表します。例えば第2節の局所因果模型なら、$(-3,0)$ は空枝の $D(R)$ には入らず、非空枝の $D(R\cup I)$ には入ります。ただしこの表は、$S_0=2T,S_I=6$ の物理的なJT解を導いたものではありません。

実際の**定常二浴JT模型**では、[BHI25の停留根](../BHI25/index.md#prop-bhi25-near-horizon-root)で候補端点を決め、[BHI26の極値化済み枝](../BHI26/index.md#def-bhi26-extremized-branches)で許容性と同一模型内の支配を判定します。一方、[BHI27の蒸発JT境界模型](../BHI27/index.md#def-bhi27-evaporating-jt)は浴の状態と時間規格化が異なり、そこで計算した[有限放射区間の精細エントロピー差](../BHI27/index.md#prop-bhi27-radiation-entropy)だけからisland枝の値やQESの位置は決まりません。

## 4. ウェッジに「ある」作用素を、放射でどう表現するか

幾何の包含はまだ演算子の存在定理ではありません。重力領域の内側の局所的な自由度を表す観測量 $O_I$ が放射から表せる、というのは、定めた**コード部分空間内のすべての状態**に対して $R$ の演算子が同じ作用をするという意味です。これには[HOLO27のコード上の再構成条件](../../HOLO/HOLO27/index.md#def-holo27-subregion-reconstruction)、[HOLO28の条件付きJLMS関係](../../HOLO/HOLO28/index.md#def-holo28-jlms-dictionary)、[HOLO30の作用素代数の完全再構成](../../HOLO/HOLO30/index.md#def-holo30-algebra-reconstruction)が関係します。

正確な有限次元の定義に従うと、論理演算子 $O$ と等長符号化 $V:\mathcal H_{\mathrm{code}}\to\mathcal H_R\otimes\mathcal H_B$ に対して、放射だけに作用する $O_R$ が
$$
(O_R\otimes I_B)V=VO
$$
を満たせば、$O$ を放射上で再構成できます。全論理代数を扱うなら、和・積・随伴を保つ表現も必要です。$V^\dagger(O_R\otimes I_B)V=O$ という圧縮等式**だけ**では、$O_R$ がコード状態をコード空間の外へ漏らしてしまう可能性を除けません。

ここで $\mathcal H_B$ は残存する物理自由度をまとめた記号であり、重力内部のHilbert空間が因子化されるという主張を正確な重力理論へ移植したものではありません。[BHI15の因数分解障害](../BHI15/index.md#prop-bhi15-factorization-obstruction)を踏まえ、以下では**明示的に有限次元模型としてのみ** $\mathcal H_R\otimes\mathcal H_B$ を使います。

### 4.1 量子情報が残存系から放射へ移る最小模型

まず一つの論理量子ビット $L$ の状態 $\alpha|0\rangle+\beta|1\rangle$（$|\alpha|^2+|\beta|^2=1$）を考えます。$L,R,B$ の $|0\rangle,|1\rangle$ はそれぞれの二次元Hilbert空間で選んだ正規直交基底で、$|rb\rangle:=|r\rangle_R\otimes|b\rangle_B$ と書きます。初めは放射量子ビット $R$ を $|0\rangle$ に固定し、残存量子ビット $B$ に情報を置きます。後では二つの物理量子ビットの内容を交換します。

<a id="def-bhi32-transfer-code"></a>

<!-- formal-statement-start -->
> **定義（放射と残存系の情報移送符号）**  
> $\mathcal H_L=\mathcal H_R=\mathcal H_B=\mathbb C^2$ とし、$j\in\{0,1\}$ に対して等長写像の候補
>
$$
V_{\mathrm{early}}|j\rangle_L=|0\rangle_R|j\rangle_B,\qquad
V_{\mathrm{late}}|j\rangle_L=|j\rangle_R|0\rangle_B
$$
>
> を線形に拡張する。これらを**情報移送符号**と呼ぶ。物理SWAP演算子 $U_{\mathrm{swap}}$ は $U_{\mathrm{swap}}|r\rangle_R|b\rangle_B=|b\rangle_R|r\rangle_B$ とする。これは時間発展と演算子再構成の論理関係を調べる玩具符号であり、JTの幾何とPage曲線を生成する重力符号ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi32-transfer-code -->
**定義の確認**：早期の基底像は $|00\rangle,|01\rangle$、後期の基底像は $|00\rangle,|10\rangle$ です。いずれも各像のノルムが1で、異なる基底像の内積は0です。したがって、$V$ を早期・後期のどちらとしても
$$
\langle Vj|Vk\rangle=\delta_{jk}\qquad (j,k\in\{0,1\})
$$
が成立します。これは単に二つの数値を計算しただけでなく、等長性の判定です。任意の $|\psi\rangle=\sum_j c_j|j\rangle$ と $|\varphi\rangle=\sum_k d_k|k\rangle$ に対し、線形性から
$$
\begin{aligned}
\langle V\psi|V\varphi\rangle
&=\sum_{j,k}\overline{c_j}d_k\langle Vj|Vk\rangle\\
&=\sum_j\overline{c_j}d_j
=\langle\psi|\varphi\rangle
\end{aligned}
$$
となります。ゆえに両符号について $V^\dagger V=I_L$ です。さらに $U_{\mathrm{swap}}V_{\mathrm{early}}|0\rangle=|00\rangle=V_{\mathrm{late}}|0\rangle$、$U_{\mathrm{swap}}V_{\mathrm{early}}|1\rangle=|10\rangle=V_{\mathrm{late}}|1\rangle$ です。両基底で一致するので $U_{\mathrm{swap}}V_{\mathrm{early}}=V_{\mathrm{late}}$ が線形写像として成立します。
<!-- definition-example-end -->

<a id="prop-bhi32-transfer-reconstruction"></a>

<!-- formal-statement-start -->
> **命題（情報移送符号の早期と後期の演算子再構成）**  
> 上で定義した二量子ビットの等長符号について、早期の $R$ 上では非スカラーの論理演算子を再構成できないが、$B$ 上では任意の論理演算子 $O$ を $I_R\otimes O_B$ で再構成できる。後期には逆に、任意の $O$ を $O_R\otimes I_B$ で再構成できる。いずれも[部分領域演算子再構成の意味](../../HOLO/HOLO27/index.md#def-holo27-subregion-reconstruction)での等式である。
<!-- formal-statement-end -->

### 証明の見取り図

早期の放射は入力に依存せず常に $|0\rangle_R$ です。放射上の演算子をコードへ圧縮すると恒等演算子のスカラー倍にしかなりません。後期の放射には論理状態そのものが写るため、任意の行列を放射側へ移せます。

<!-- proof-start -->
### 証明

各基底で $O_{kj}:=\langle k|O|j\rangle_L$ と置きます。$O_B$ と $O_R$ は、論理行列 $O$ と同じ成分 $O_{kj}$ をそれぞれ $B$ と $R$ の正規直交基底で作用させる物理行列です。したがって $O_B|j\rangle_B=\sum_k O_{kj}|k\rangle_B$、$O_R|j\rangle_R=\sum_k O_{kj}|k\rangle_R$ です。任意の $|\psi\rangle_L=\alpha|0\rangle+\beta|1\rangle$ に対し、
$$
V_{\mathrm{early}}|\psi\rangle=|0\rangle_R|\psi\rangle_B,\qquad
V_{\mathrm{late}}|\psi\rangle=|\psi\rangle_R|0\rangle_B.
$$
従って早期の $B$ 上で
$$
(I_R\otimes O_B)V_{\mathrm{early}}|\psi\rangle
=|0\rangle_R(O|\psi\rangle)_B
=V_{\mathrm{early}}O|\psi\rangle.
$$
後期の $R$ 上でも
$$
(O_R\otimes I_B)V_{\mathrm{late}}|\psi\rangle
=(O|\psi\rangle)_R|0\rangle_B
=V_{\mathrm{late}}O|\psi\rangle.
$$
どちらも任意の $|\psi\rangle$ で成立するので再構成条件を満たします。

一方、早期の $R$ 上の任意の行列 $A_R$ について、基底を挟むと
$$
\langle j|V_{\mathrm{early}}^\dagger(A_R\otimes I_B)V_{\mathrm{early}}|k\rangle
=\langle0|A_R|0\rangle\,\langle j|k\rangle
=\langle0|A_R|0\rangle\delta_{jk}.
$$
よって圧縮した論理行列は常に $\langle0|A_R|0\rangle I_L$ です。再構成条件が成り立つなら左から $V_{\mathrm{early}}^\dagger$ を掛けて $O=\langle0|A_R|0\rangle I_L$ でなければならず、非スカラーの $O$ は不可能です。$\square$
<!-- proof-end -->

例えば論理Pauli行列 $X|0\rangle=|1\rangle$、$X|1\rangle=|0\rangle$、$Z|j\rangle=(-1)^j|j\rangle$ は後期には放射の $X_R,Z_R$ で表現できます。早期にはどちらも放射だけでは表現できません。ここでは**全入力状態で**同じ行列が働いています。一つの入力状態の期待値を偶然合わせただけではありません。以下、論理側を明示するときは $X_L:=X$、$Z_L:=Z$ と書き、$X_R,Z_R$ は同じ行列成分を放射の基底で作用させる物理演算子です。

### 4.2 エントロピー値だけでは所属先を決定できない

同じ二つの符号へ論理入力 $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を入れます。早期の放射縮約状態は $\rho_R^{\mathrm{early}}=|0\rangle\langle0|$、後期は $\rho_R^{\mathrm{late}}=|+\rangle\langle+|$ です。両者は固有値 $(1,0)$ を持つため
$$
S(\rho_R^{\mathrm{early}})=S(\rho_R^{\mathrm{late}})=0
$$
ですが、論理 $X,Z$ の再構成可否は上の命題で反対です。**放射エントロピーの一つの数値だけから、どの論理代数が放射へ符号化されたかは判定できません。**

この反例はisland公式と矛盾しません。island公式は指定した重力模型・状態におけるエントロピーの計算規則であり、復元可能な演算子代数について主張するには、追加の量子誤り訂正構造が必要だからです。例えば有限コードでは[HOLO30の相補的代数再構成](../../HOLO/HOLO30/index.md#thm-holo30-complementary-reconstruction)がその条件を実際に実装しています。重力では適切なJLMS型関係、コード部分空間、近似の制御を検査します。

## 5. 因果的に遠い内部の再構成と複製禁止

ウェッジに内部の点が含まれることを、その点からの通常の因果信号が今すぐ放射領域へ出ることと同一視すると誤解が生じます。第2節の例では $(-3,0)$ は $D(I)$ に入りますが $D(R)$ には入りません。情報の再構成は幾何学的な移動ではなく、**符号化された演算子の異なる表現**を問題にしています。

ただし、放射と残存系の**互いに独立な物理部分系**の双方へ、同じ全非可換論理代数を複製することはできません。この制約を有限模型で直接示します。

<a id="prop-bhi32-disjoint-no-cloning"></a>

<!-- formal-statement-start -->
> **命題（非可換論理演算子の独立二領域への複製障害）**  
> 有限次元等長符号化 $V:\mathcal H_L\to\mathcal H_R\otimes\mathcal H_B$ と、非可換な論理演算子 $X,Z$（$[X,Z]\ne0$）を固定する。$R$ の演算子 $X_R$ と $B$ の演算子 $Z_B$ が、同一の全コード部分空間でそれぞれ正確に
>
$$
(X_R\otimes I_B)V=VX,\qquad
(I_R\otimes Z_B)V=VZ
$$
>
> を満たすことは不可能である。従って、独立な二つの領域が両方とも同じ全非可換論理代数を正確に再構成することも不可能である。
<!-- formal-statement-end -->

### 証明の見取り図

物理的に分離した二領域の演算子は可換です。それらをコードに引き戻すと論理演算子の交換子が零になってしまい、$[X,Z]\ne0$ に反します。単なる期待値の一致ではなく、コード上の作用の等式を使う点が核心です。

<!-- proof-start -->
### 証明

$X_R\otimes I_B$ と $I_R\otimes Z_B$ は異なるテンソル因子に作用するので交換します。再構成の等式を二度使えば
$$
(X_R\otimes I_B)(I_R\otimes Z_B)V
=(X_R\otimes I_B)VZ
=VXZ,
$$
$$
(I_R\otimes Z_B)(X_R\otimes I_B)V
=(I_R\otimes Z_B)VX
=VZX.
$$
左辺の物理演算子は可換なので差は零です。従って $V[X,Z]=0$。$V^\dagger V=I_L$ であるため、左から $V^\dagger$ を掛けて $[X,Z]=0$ となり、仮定に矛盾します。$\square$
<!-- proof-end -->

二量子ビットのPauli行列では
$$
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad
[X,Z]=\begin{pmatrix}0&-2\\2&0\end{pmatrix}\ne0.
$$
早期には $B$、後期には $R$ が全論理代数を持つ情報移送符号はこの制約と整合します。重力の場合はさらに、[HOLO30の中心・可換子を持つ代数](../../HOLO/HOLO30/index.md#def-holo30-observable-algebra)や[BHI15の重力・ゲージ制約](../BHI15/index.md#prop-bhi15-factorization-obstruction)を扱うため、「内部と外部の二つの完全に独立なコピー」という前提自体を再検討します。

## 6. islandから内部再構成を読むための条件表

| 計算または主張 | 何を固定するか | 得られるもの | さらに必要なもの |
| --- | --- | --- | --- |
| $S_{\mathrm{gen}}(R\cup I)$ の停留化 | 重力模型・状態・cutoff・端点変分 | 許容QES候補 | 候補間の支配比較 |
| 空枝と非空枝の比較 | 同一放射領域・共通近似次数 | 選択済みのislandの有無 | 鞍点の存在と寄与の制御 |
| $\mathcal E_{\mathrm{rad}}(R)$ | 選択したQES・有効幾何・境界条件 | 有効バルクの依存域 | 作用素と状態の符号化の指定 |
| $O_I$ の $R$ 上での再構成 | コード部分空間・演算子代数・誤差 | 放射での等価な演算子表現 | JLMS型関係などの再構成を支える追加構造 |
| 実際の復号 | 再構成可能な論理情報・アクセス範囲 | 情報理論的な存在命題 | 具体的な写像・実装コスト・実行条件 |

重力における再構成は、一般に全状態・全エネルギーの単一の内部演算子を与える話ではありません。半古典的な**コード部分空間**で状態・次数・重力ドレッシングを固定し、相対エントロピーや作用素代数の関係から条件付きで理解します。[HOLO28のJLMS使用条件](../../HOLO/HOLO28/index.md#def-holo28-jlms-dictionary)と[HOLO30の完全再構成条件](../../HOLO/HOLO30/index.md#def-holo30-algebra-reconstruction)を、islandが選ばれたという幾何学的な事実へ追加する必要があります。

また[BHI31のensemble平均と固定理論の区別](../BHI31/index.md#def-bhi31-ensemble-connected)は残ります。平均された重力レプリカ計算の結果を、そのまま任意の単一の固定理論の、全状態に作用する厳密な再構成演算子へ昇格させることはできません。

本講の到達点は、**QESの選択 → 放射に対応する有効バルク領域 → 追加条件付きの演算子再構成**という順序を区別し、各段階を具体的に検査できることです。[HOLO29の消失回復の定義](../../HOLO/HOLO29/index.md#def-holo29-region-recovery)を踏まえ、次講BHI33では、存在する演算子表現を操作的な復号へどう結び付けるかを扱います。

---

## 7. 演習

### Level A：領域と基本的な写像を自分で判定する

<a id="ex-bhi32-a01"></a>

#### BHI32-A01 初期断面のisland候補

- Level: A
- 問題: 平坦な因果模型の $\tau=0$ 断面に $I=[-4,-2]$、$R=[1,3]$ を置く。$x=-3,0,2$ が空候補 $R$ と非空候補 $I\cup R$ のそれぞれに含まれるか判定し、これだけでは $I$ が実際のJT模型のQESと断定できない理由を述べよ。

<!-- solution-start -->
**詳細解答**：$R=[1,3]$ なので $2\in R$ ですが、$-3,0\notin R$ です。

$I=[-4,-2]$ を加えると $-4\le-3\le-2$ から $-3\in I\cup R$ となります。$0$ は $-2<0<1$ にあるので含まれず、$2$ は引き続き含まれます。

island端点の条件は区間の左右だけではなく、[一般化エントロピーの端点停留](../BHI25/index.md#prop-bhi25-thermal-functional)と境界条件です。従ってこれは[放射のisland wedgeの定義](#def-bhi32-radiation-wedge)の空間部分を検査したもので、QESの認定ではありません。
<!-- solution-end -->

<a id="ex-bhi32-a02"></a>

#### BHI32-A02 二つの因果菱形

- Level: A
- 問題: 第2節の $I,R$ を二次元Minkowski初期面に置く。$\tau=1/2$ で各依存域の $x$ の範囲を求め、$(1/2,-3)$、$(1/2,0)$、$(1/2,2)$ を判定せよ。

<!-- solution-start -->
**詳細解答**：[離れた二区間の依存域](#prop-bhi32-disjoint-diamonds)に $|\tau|=1/2$ を代入すると $I$ は $-4+1/2=-7/2\le x\le-2-1/2=-5/2$、$R$ は $1+1/2=3/2\le x\le3-1/2=5/2$ です。$-7/2\le-3\le-5/2$ より第一点は $D(I)$、$0$ は両範囲外、$3/2\le2\le5/2$ より第三点は $D(R)$ に入ります。空枝では第一点は含まれません。
<!-- solution-end -->

<a id="ex-bhi32-a03"></a>

#### BHI32-A03 二枝の交点

- Level: A
- 問題: すでに極値化された二枝の値が $S_0(T)=2T$、$S_I(T)=6$（$T\ge0$）である。交点と $T=2,3,5$ の選択枝を求めよ。交点でウェッジが一意に決まるか答えよ。

<!-- solution-start -->
**詳細解答**：$2T=6$ より $T_{\mathrm P}=3$ です。$T=2$ では $(S_0,S_I)=(4,6)$ で空枝、$T=3$ では $(6,6)$ で等値、$T=5$ では $(10,6)$ で非空island枝が小さいです。[二枝相図の定義](#def-bhi32-wedge-phase)により、等値点は先頭の半古典近似だけでは一意のウェッジを指定しません。
<!-- solution-end -->

<a id="ex-bhi32-a04"></a>

#### BHI32-A04 早期の縮約状態

- Level: A
- 問題: $V_{\mathrm{early}}(\alpha|0\rangle+\beta|1\rangle)=|0\rangle_R(\alpha|0\rangle+\beta|1\rangle)_B$ とし、$|\alpha|^2+|\beta|^2=1$ とする。$B$ を部分トレースして $\rho_R$ を求め、入力に依存するか確認せよ。

<!-- solution-start -->
**詳細解答**：出力密度行列は
$$
|0\rangle\langle0|_R\otimes
(\alpha|0\rangle+\beta|1\rangle)
(\overline\alpha\langle0|+\overline\beta\langle1|)_B.
$$
$B$ の因子のトレースは $|\alpha|^2+|\beta|^2=1$ なので、部分トレースから $\rho_R=|0\rangle\langle0|$ です。$\alpha,\beta$ に依存しません。[早期の再構成不能性](#prop-bhi32-transfer-reconstruction)の縮約状態による見方です。
<!-- solution-end -->

<a id="ex-bhi32-a05"></a>

#### BHI32-A05 後期のPauli作用素

- Level: A
- 問題: $V_{\mathrm{late}}|j\rangle=|j\rangle_R|0\rangle_B$ で、論理 $X,Z$ を第4節のPauli行列とする。$X_R$ と $Z_R$ がそれぞれ論理 $X,Z$ を表すことを $j=0,1$ の両方で確認せよ。

<!-- solution-start -->
**詳細解答**：$X_R,Z_R$ が放射側だけに作用することを明示し、残存系には単位演算子 $I_B$ を作用させます。二つの基底で
$$
\begin{aligned}
(X_R\otimes I_B)V_{\mathrm{late}}|0\rangle&=|10\rangle=V_{\mathrm{late}}X_L|0\rangle,\\
(X_R\otimes I_B)V_{\mathrm{late}}|1\rangle&=|00\rangle=V_{\mathrm{late}}X_L|1\rangle,\\
(Z_R\otimes I_B)V_{\mathrm{late}}|0\rangle&=|00\rangle=V_{\mathrm{late}}Z_L|0\rangle,\\
(Z_R\otimes I_B)V_{\mathrm{late}}|1\rangle&=-|10\rangle=V_{\mathrm{late}}Z_L|1\rangle
\end{aligned}
$$
となります。基底で一致するため、線形性で任意の入力に対して[再構成の定義](../../HOLO/HOLO27/index.md#def-holo27-subregion-reconstruction)を満たします。
<!-- solution-end -->

### Level B：幾何・符号・仮定の境界をつなぐ

<a id="ex-bhi32-b01"></a>

#### BHI32-B01 非空islandと直接の因果通信

- Level: B
- 問題: $I=[-4,-2]$、$R=[1,3]$ を平坦な初期面に置く。$p=(0,-3)$ は非空枝の $D(I\cup R)$ には入るが空枝の $D(R)$ には入らないことを示せ。これだけで $p$ の演算子が放射から再構成可能と結論できるか、必要な条件を列挙せよ。

<!-- solution-start -->
**詳細解答**：初期面 $\tau=0$ では次の等式が成立します。

$$
D(I\cup R)\cap\{\tau=0\}=I\cup R,\qquad
D(R)\cap\{\tau=0\}=R.
$$

$-4\le-3\le-2$ より $p\in D(I\cup R)$ ですが、$-3<1$ より $p\notin D(R)$ です。この計算だけでは演算子を構成していません。再構成のためには次を確かめます。

1. 実際の重力模型で停留化済みQESを持つ非空枝が支配すること。
2. 適切な状態・コード部分空間と演算子代数を指定すること。
3. [HOLO27の再構成条件](../../HOLO/HOLO27/index.md#def-holo27-subregion-reconstruction)を支える量子誤り訂正や[JLMS型関係](../../HOLO/HOLO28/index.md#def-holo28-jlms-dictionary)の適用条件が成立すること。
4. 近似精度とドレッシングを管理すること。

通常の光信号が $p$ から $R$ へ直接届くという結論にもなりません。
<!-- solution-end -->

<a id="ex-bhi32-b02"></a>

#### BHI32-B02 非可換演算子の複製障害を計算する

- Level: B
- 問題: 論理量子ビットの $X=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ と $Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}$ を考える。同じ等長コード $V$ で $X$ が $R$ に、$Z$ が独立な $B$ に正確に再構成できると仮定して矛盾を導け。

<!-- solution-start -->
**詳細解答**：行列を掛けると
$$
XZ=\begin{pmatrix}0&-1\\1&0\end{pmatrix},\qquad
ZX=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$
従って $[X,Z]=XZ-ZX=\begin{pmatrix}0&-2\\2&0\end{pmatrix}\ne0$ です。仮定より $(X_R\otimes I_B)V=VX$、$(I_R\otimes Z_B)V=VZ$。物理側の異なる因子の演算子は可換なので
$$
0=[X_R\otimes I_B,I_R\otimes Z_B]V=V(XZ-ZX).
$$
$V^\dagger V=I_L$ を左から掛けて $[X,Z]=0$ となり、直接計算に矛盾します。これは[複製障害の命題](#prop-bhi32-disjoint-no-cloning)の二次元実例です。
<!-- solution-end -->

<a id="ex-bhi32-b03"></a>

#### BHI32-B03 同じエントロピー・異なる再構成

- Level: B
- 問題: $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を情報移送符号の早期と後期に入力する。それぞれの放射密度行列、固有値、エントロピーを求め、$Z_L$ の放射への再構成可能性が異なることを示せ。なぜエントロピーだけで判定できないかを説明せよ。

<!-- solution-start -->
**詳細解答**：早期は $|0\rangle_R|+\rangle_B$、後期は $|+\rangle_R|0\rangle_B$ です。従って
$$
\rho_R^{\mathrm{early}}=\begin{pmatrix}1&0\\0&0\end{pmatrix},\qquad
\rho_R^{\mathrm{late}}=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$
前者の固有値は $1,0$。後者は $|+\rangle$ 方向で固有値1、直交する $|-\rangle$ 方向で固有値0です。従って両方とも $S=-1\log1-0\log0=0$（$0\log0=0$ と約束）。しかし早期の $R$ はどの論理入力でも $|0\rangle\langle0|$ なので、$|0\rangle_L$ と $|1\rangle_L$ で異なる $Z_L$ の期待値 $+1,-1$ を識別できず再構成不能です。後期は $(Z_R\otimes I_B)V_{\mathrm{late}}=V_{\mathrm{late}}Z_L$ を両基底で直接確認できます。一つの入力の $S(R)$ は、全コード状態に対する演算子表現の有無を指定しません。
<!-- solution-end -->

<a id="ex-bhi32-b04"></a>

#### BHI32-B04 交点移動と停留性の確認

- Level: B
- 問題: $S_0(T)=1+3T$、$S_I(T)=9+T$（$T\ge0$）という二つの極値化済み候補を仮定する。交点、$T=2,4,6$ の支配枝を求めよ。さらに端点を表す実変数 $q\in\mathbb R$ による候補の「island値」$S_{\mathrm{trial}}(T,q)=9+T+(q-2)^2$ が与えられた場合、$T$ を固定して $q$ を変化させ、$q=3$ を選んで $S_0$ と比較してはいけない理由を停留微分で示せ。

<!-- solution-start -->
**詳細解答**：二枝の差は

$$
S_I(T)-S_0(T)=(9+T)-(1+3T)=8-2T
$$

です。交点は $T=4$。$T=2$ では差4なので空枝、$T=4$ では差0なので競合、$T=6$ では差 $-4$ なのでisland枝です。

一方、$T$ を固定し、端点変数 $q$ だけを動かす偏微分は

$$
\partial_q S_{\mathrm{trial}}=2(q-2)
$$

です。$q=3$ では2で停留せず、$q=2$ で零です。$q=2$ を代入して初めて $S_{\mathrm{trial}}(T,2)=9+T=S_I(T)$ が得られます。$q=3$ の $10+T$ を極値化済みisland枝として比較する操作は、[QESの停留条件](../BHI25/index.md#prop-bhi25-thermal-functional)を満たしません。
<!-- solution-end -->

### Level C：幾何・エントロピー・作用素を一つの設定で整理する

<a id="ex-bhi32-c01"></a>

#### BHI32-C01 放射ウェッジと有限情報移送の統合検査

- Level: C
- 問題: 次の二つの**独立な模型**を、同じ論理のどの段階を表すか比較せよ。幾何の模型は $\tau=0$ に $I=[-4,-2]$ と $R=[1,3]$ を持ち、極値化済み枝のエントロピーは $S_0(T)=2T$、$S_I(T)=6$ とする（$T\ge0$）。符号の模型は $\mathcal H_L=\mathcal H_R=\mathcal H_B=\mathbb C^2$、$V_{\mathrm{early}}|j\rangle=|0\rangle_R|j\rangle_B$、$V_{\mathrm{late}}|j\rangle=|j\rangle_R|0\rangle_B$ とする。
  1. $T=1,3,5$ の幾何学的な支配候補と、初期点 $x=-3$ が選択済み初期領域に入るかを判定せよ。
  2. 二つの符号が等長であること、SWAPでつながることを確かめ、早期の放射では $Z_L$ が再構成不能、後期では再構成可能なことを示せ。
  3. 両模型を同一視できない理由を述べ、放射が内部の論理代数を再構成できるという主張を実際の重力模型で行うための追加条件を説明せよ。

<!-- solution-start -->
**詳細解答**：

(1) $S_I-S_0=6-2T$ です。$T=1$ では差4なので空枝、$T=3$ では差0なので競合、$T=5$ では差 $-4$ なので非空枝です。空枝の初期領域は $R=[1,3]$、非空枝は $R\cup I$ です。$-4\le-3\le-2$ だから、$x=-3$ は $T=1$ の支配初期領域には含まれず、$T=5$ では含まれます。$T=3$ では先頭次数で一意の領域は決まりません。これはあらかじめ仮定した枝の比較であり、JT方程式の解を新たに作ったものではありません。

(2) 早期の基底像 $|00\rangle,|01\rangle$ はそれぞれノルム1、内積0です。後期の像 $|00\rangle,|10\rangle$ も同じです。従って各 $V^\dagger V=I_L$ です。SWAPは $|0\rangle_R|j\rangle_B$ を $|j\rangle_R|0\rangle_B$ へ写すので $U_{\mathrm{swap}}V_{\mathrm{early}}=V_{\mathrm{late}}$ です。早期に $R$ の任意の演算子 $A_R$ を作用させても
$$
V_{\mathrm{early}}^\dagger(A_R\otimes I_B)V_{\mathrm{early}}
=\langle0|A_R|0\rangle I_L.
$$
これが $Z_L=\operatorname{diag}(1,-1)$ と一致することはありません。後期では $Z_R|0\rangle_R|0\rangle_B=|0\rangle_R|0\rangle_B$、$Z_R|1\rangle_R|0\rangle_B=-|1\rangle_R|0\rangle_B$ より $(Z_R\otimes I_B)V_{\mathrm{late}}=V_{\mathrm{late}}Z_L$ であり、再構成可能です。

(3) 幾何模型の $T$ は放射エントロピーの二つの仮定された半古典枝を比較するパラメータであり、平坦な区間もJTの実際のQESを計算していません。二量子ビット模型はSWAPというユニタリにより論理情報の保持系が変わることを示しますが、$S_0(T),S_I(T)$、一般化エントロピーや重力レプリカを計算していません。両者を接続するには、状態・接合条件・重力の鞍点選択とQES、半古典的コード部分空間、ドレッシングされた内部観測量の代数、[JLMS型関係の適用条件](../../HOLO/HOLO28/index.md#def-holo28-jlms-dictionary)、[作用素代数再構成](../../HOLO/HOLO30/index.md#def-holo30-algebra-reconstruction)を確認し、誤差の次数も管理する必要があります。これらを確認して初めて「幾何学的にislandが放射のウェッジにある」から「内部の特定の論理演算子を放射上に表せる」へ進めます。具体的な復号写像と実行可能性はさらに別の課題です。
<!-- solution-end -->
