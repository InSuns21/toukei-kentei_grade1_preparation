# BHI15 因数分解・ゲージ制約・局所代数

<!-- definition-example-audit: strict -->

## 1. 内部と外部は、いつ独立の量子系なのか

[BHI10のAMPS三部エントロピー制約](../BHI10/index.md#thm-bhi10-amps-tradeoff)は、早期放射 $R$、後期外部モード $b$、内部相手 $c$ を互いに独立のテンソル因子とし、一つの三部密度演算子にエントロピーの不等式を適用しました。[BHI13のHaar投入・放出実験](../BHI13/index.md#def-bhi13-haar-experiment)でも、入力 $AB$ と出力 $CD$ の因数分解を先に固定しています。

量子重力・ゲージ理論では、**物理状態に課す制約**のため、部分領域で作った演算子がすべて物理状態を物理状態に写すとは限りません。そこで、まず小さな有限模型で次の三つを分けます。

1. 計算のために用意する大きなテンソル積Hilbert空間。
2. Gauss制約を満たす物理Hilbert空間。
3. 領域ごとに実際に作用できる、制約と両立する観測量の代数。

この三つを区別すると、「物理Hilbert空間が左右の独立因子に分かれる」と「大きな空間に埋め込み、片側を部分トレースできる」は異なる主張だと分かります。本講の証明は有限次元の $\mathbb Z_2$ ゲージ制約模型に限ります。連続場のType III性・重力のドレッシングを、この有限模型だけで証明したことにはしません。

本講では対数の底を自然対数とし、エントロピーの単位はnatとします。$B(H)$ は有限次元Hilbert空間 $H$ の全線形作用素、$I_H$ は恒等作用素、$[A,B]=AB-BA$ は交換子です。部分トレースは[QINF3の定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)を使います。[QINF17のvon Neumannエントロピーの定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)は底2（bit）なので、以下で $S(\rho)$ と書くときは固有値 $\lambda_j$ に対して

$$
S(\rho)=-\sum_{\lambda_j>0}\lambda_j\ln\lambda_j
=(\ln2)\left(-\sum_{\lambda_j>0}\lambda_j\log_2\lambda_j\right)
$$

と換算したnat単位を用います。これは対数の底の変更であり、部分トレースや密度作用素の定義は変わりません。

## 2. 一つのGauss制約を満たす二リンク模型

左右のリンクにそれぞれ一つの量子ビットを置きます。各リンクの計算基底を $|0\rangle,|1\rangle$ とし、作用素

$$
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$

を定めます。$X^2=Z^2=I_2$、$XZ=-ZX$ です。電束を読む基底として $X$ の固有ベクトル

$$
|+\rangle=\frac{|0\rangle+|1\rangle}{\sqrt2},
\qquad
|-\rangle=\frac{|0\rangle-|1\rangle}{\sqrt2}
$$

を選びます。直接代入すると $X|\pm\rangle=\pm|\pm\rangle$、$Z|\pm\rangle=|\mp\rangle$ です。左・右リンクの電束の積を $+1$ に固定するため、$G=X_L\otimes X_R$ を使います。ここでいうGauss制約は、この模型において中央の頂点のゲージ変換 $G$ が物理状態に恒等的に作用する、という条件です。

<a id="def-bhi15-gauss-space"></a>

<!-- formal-statement-start -->
> **定義（二リンクのGauss物理空間）**
>
> $\mathcal H_{\mathrm{ext}}=\mathbb C^2_L\otimes\mathbb C^2_R$、$G=X_L\otimes X_R$ とし、
>
$$
P_{\mathrm{phys}}=\frac{I_{\mathrm{ext}}+G}{2},
\qquad
\mathcal H_{\mathrm{phys}}=\{\psi\in\mathcal H_{\mathrm{ext}}:G\psi=\psi\}
=\operatorname{Ran}P_{\mathrm{phys}}
$$
>
> と定める。物理空間上で用いる作用素には、$G$ と交換する条件を課す。この模型での左局所観測量は $O_L\otimes I_R$ という形のうち $G$ と交換するものを物理空間へ制限した作用素、右も同様とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi15-gauss-space -->
**定義の確認**：$G^2=I$、$G^*=G$ なので $P_{\mathrm{phys}}^2=P_{\mathrm{phys}}$ かつ $P_{\mathrm{phys}}^*=P_{\mathrm{phys}}$ です。積基底の四状態で直接調べると

$$
G|++\rangle=|++\rangle,\quad
G|--\rangle=|--\rangle,\quad
G|+-\rangle=-|+-\rangle,\quad
G|-+\rangle=-|-+\rangle.
$$

従って $\mathcal H_{\mathrm{phys}}=\operatorname{span}\{|++\rangle,|--\rangle\}$ は**二次元**です。$X_L\otimes I_R$ は $G$ と交換し、両物理基底をそれぞれ固有値 $+1,-1$ で保ちます。一方 $Z_L\otimes I_R$ は $|++\rangle$ を $|-+\rangle$ に写すので、物理空間に閉じません。
<!-- definition-example-end -->

「左のリンク上で定義された任意の行列」が左の**物理的**操作になるわけではありません。次の補題で、何が残るかを全件列挙します。

<a id="lem-bhi15-local-operators"></a>

<!-- formal-statement-start -->
> **補題（二リンク模型の局所観測量）**
>
> [二リンクのGauss物理空間](#def-bhi15-gauss-space)において、$O_L\in B(\mathbb C^2_L)$ が $[O_L\otimes I_R,G]=0$ を満たすための必要十分条件は、ある $\alpha,\beta\in\mathbb C$ に対して $O_L=\alpha I_2+\beta X_L$ と表せることである。右も同様である。物理空間では
>
$$
(X_L\otimes I_R)|_{\mathrm{phys}}
=(I_L\otimes X_R)|_{\mathrm{phys}}
=\begin{pmatrix}1&0\\0&-1\end{pmatrix}_{\{|++\rangle,|--\rangle\}}.
$$
>
> 従って左右の局所観測量の代数は同じ可換代数であり、左右に独立の全行列代数を与えない。
<!-- formal-statement-end -->

### 証明の見取り図

交換子を計算すると、左側の条件は $[O_L,X_L]=0$ に還元されます。$X$ の異なる二つの固有値の間を結ぶ行列成分は、この条件で零になります。左右の電束が制約によって一致することが最後の等式です。

<!-- proof-start -->
### 証明

$G=X_L\otimes X_R$ だから

$$
[O_L\otimes I_R,G]=[O_L,X_L]\otimes X_R.
$$

$X_R$ は可逆なので、右辺が零であることと $[O_L,X_L]=0$ は同値です。$X$ 固有基底で $O_L$ の行列を $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ と置くと、

$$
\begin{pmatrix}a&b\\c&d\end{pmatrix}
\begin{pmatrix}1&0\\0&-1\end{pmatrix}
-
\begin{pmatrix}1&0\\0&-1\end{pmatrix}
\begin{pmatrix}a&b\\c&d\end{pmatrix}
=
\begin{pmatrix}0&-2b\\2c&0\end{pmatrix}.
$$

従って $b=c=0$。$a=\alpha+\beta$、$d=\alpha-\beta$ と置くと $O_L=\alpha I_2+\beta X_L$ で、逆向きにもこれらは $X_L$ と交換します。右側も同じ計算です。

物理基底の両状態で $X_L$ と $X_R$ の固有値は一致します。よって、それぞれを物理空間へ制限すると同一の対角行列です。二つの局所代数は $\operatorname{span}\{I_{\mathrm{phys}},\operatorname{diag}(1,-1)\}$ に等しく、可換です。$\square$
<!-- proof-end -->

二リンクだけでは「片側の物理量」は電束の二値判定しかできません。しかし物理空間上には、それらより大きな**全体系**の演算子があります。例えば

$$
W=Z_L\otimes Z_R
$$

は $G$ と交換します。$ZX=-XZ$ が左右で二度起こるので $WG=GW$ であり、$W|++\rangle=|--\rangle$、$W|--\rangle=|++\rangle$ です。$W$ は二つの電束セクター間の干渉を測る**両側にまたがる**観測量であり、片側だけの観測量ではありません。以下では異なるリンク上の作用素の積 $Z_LZ_R$ を $Z_L\otimes Z_R$ の略記として使います。物質付き模型では、対応する作用素に物質上の恒等作用素も掛けます。

## 3. 観測量の代数・中心・電束セクター

局所的な量子自由度も残るよう、両リンクの外に左・右各一個の「物質」量子ビット $l,r$ を追加します。制約はリンク電束にだけ働き、物質量子ビットには働かないものとします。各物質Hilbert空間は $\mathbb C^2$ です。リンクを $eL,eR$、物質を $l,r$ と表記し、物質の基底も $|0\rangle,|1\rangle$ とします。後で使う $Z_l$ は、この基底で $Z_l=|0\rangle\langle0|_l-|1\rangle\langle1|_l$ と作用する行列です。

$$
\mathcal K_{\mathrm{ext}}
=(\mathbb C^2_{eL}\otimes\mathbb C^2_l)
\otimes(\mathbb C^2_{eR}\otimes\mathbb C^2_r),
\qquad
G=X_{eL}\otimes I_l\otimes X_{eR}\otimes I_r.
$$

この式は $eL,l,eR,r$ の因子順序です。以下の電束・物質をまとめた表示は、正規直交基底での因子の並べ替え

$$
|e\rangle_{eL}|i\rangle_l|f\rangle_{eR}|j\rangle_r
\longleftrightarrow
|ef\rangle_{eL,eR}|ij\rangle_{lr}
\qquad(e,f\in\{+,-\},\ i,j\in\{0,1\})
$$

による同一のベクトルを表し、因子の順序を変えても内積は保たれます。$e=\pm$ を共通の電束の値とし、物理空間のベクトルを

$$
|\psi\rangle=
|++\rangle_{eL,eR}\otimes|\psi_+\rangle_{lr}
+
|--\rangle_{eL,eR}\otimes|\psi_-\rangle_{lr}
$$

と書きます。二つの係数ベクトル $|\psi_\pm\rangle\in\mathbb C^2_l\otimes\mathbb C^2_r$ は規格化されている必要はなく、全ノルムは $\|\psi_+\|^2+\|\psi_-\|^2$ です。電束ごとの直交和

$$
\mathcal K_{\mathrm{phys}}\simeq
(\mathbb C^2_l\otimes\mathbb C^2_r)_{+}
\oplus
(\mathbb C^2_l\otimes\mathbb C^2_r)_{-}
$$

が得られ、次元は $4+4=8$ です。

ここで**作用素代数**とは、単位元、和、積、複素係数倍、随伴を保つ作用素の集合です。**中心**とは、その代数の全ての元と交換する元の集合です。$\oplus$ は、電束の違う二つのブロックを混ぜないブロック対角表示を表します。電束 $e$ のブロックへの射影 $P_e$ は、$|ff\rangle_{eL,eR}\otimes|\phi\rangle_{lr}$ を $f=e$ なら保ち、そうでなければ零にする作用素です。したがって各 $P_e$ の階数は4です。

<a id="def-bhi15-local-algebras"></a>

<!-- formal-statement-start -->
> **定義（Gauss制約下の左右局所代数）**
>
> 上の物質量子ビット付き物理空間で、$P_e$ を電束 $e\in\{+,-\}$ の四次元ブロックへの直交射影とする。物理空間上の左・右局所観測量代数を
>
$$
\begin{aligned}
\mathcal A_L
&=\bigoplus_{e=\pm}\bigl(B(\mathbb C^2_l)\otimes I_r\bigr)_e,\\
\mathcal A_R
&=\bigoplus_{e=\pm}\bigl(I_l\otimes B(\mathbb C^2_r)\bigr)_e
\end{aligned}
$$
>
> と定める。これらの作用素は、それぞれ拡張空間で対応する側だけに作用し $G$ と交換する作用素を、物理空間へ制限したものに一致する。
<!-- formal-statement-end -->

なぜ左側からこの行列形になるのでしょうか。拡張空間の左因子 $\mathbb C^2_{eL}\otimes\mathbb C^2_l$ 上の任意の作用素を、左リンクの $X_{eL}$ 固有基底で

$$
O_{\mathrm{left}}=\sum_{e,f=\pm}|e\rangle\langle f|_{eL}\otimes M_{ef},
\qquad M_{ef}\in B(\mathbb C^2_l)
$$

と一意に展開します。$s_+=1,s_-=-1$ と置くと $X_{eL}|e\rangle=s_e|e\rangle$ なので、右側には恒等作用素を置いた交換子は

$$
[O_{\mathrm{left}}\otimes I_{eR,r},G]
=\sum_{e,f=\pm}(s_f-s_e)
|e\rangle\langle f|_{eL}\otimes M_{ef}
\otimes X_{eR}\otimes I_r.
$$

この行列単位は独立で $X_{eR}$ は可逆です。従って交換子が零である必要十分条件は $M_{+-}=M_{-+}=0$ です。$M_{++},M_{--}$ は任意の $2\times2$ 物質行列のまま残ります。Gauss物理空間へ制限すると、各電束ブロックで $M_{ee}\otimes I_r$ が作用するので、ちょうど $\mathcal A_L$ の直和表示が得られます。右も同様です。

<!-- definition-example-start: def-bhi15-local-algebras -->
**定義の確認**：$P_+=\operatorname{diag}(I_4,0_4)$、$P_-=\operatorname{diag}(0_4,I_4)$ は $\mathcal K_{\mathrm{phys}}$ の指定基底で直交射影であり、$P_++P_-=I_8$、$P_+P_-=0$ です。左の例

$$
A=(Z_l\otimes I_r)_+\oplus(I_l\otimes I_r)_-
$$

はそれぞれの $4\times4$ ブロックで左物質の行列または恒等行列を作用させ、右物質へは作用しません。拡張空間では左電束への射影 $|+\rangle\langle+|_{eL}$ と $|-\rangle\langle-|_{eL}$ で条件分けすれば構成でき、$G$ と交換します。$A$ の和・積・随伴も同じブロック形で閉じ、恒等行列 $I_8$ を含みます。右側にも同じ検査ができます。
<!-- definition-example-end -->

代数を区別する鍵は、両側が共有する「どちらの電束セクターか」という判定です。

<a id="thm-bhi15-shared-center"></a>

<!-- formal-statement-start -->
> **定理（Gauss制約による共有中心と可換子）**
>
> [Gauss制約下の左右局所代数](#def-bhi15-local-algebras)は、$\mathcal K_{\mathrm{phys}}$ 上で
>
$$
\mathcal A_L'=\mathcal A_R,\qquad
\mathcal A_R'=\mathcal A_L,\qquad
\mathcal A_L\cap\mathcal A_R
=Z(\mathcal A_L)=Z(\mathcal A_R)
=\operatorname{span}_{\mathbb C}\{P_+,P_-\}
$$
>
> を満たす。ここで $\mathcal A'$ は $\mathcal K_{\mathrm{phys}}$ の全作用素のうち $\mathcal A$ の全元と交換する作用素全体である。特に局所代数は相互に交換するが、両側はスカラー以外の中心射影を共有する。
<!-- formal-statement-end -->

### 証明の見取り図

左代数には二つの電束射影が入るので、左の全元と交換する演算子はまず電束ブロックに分かれます。各ブロックでは左の任意の $2\times2$ 行列と交換する演算子が右だけに作用することを行列単位で確かめます。中心は左右両方に属する演算子として求まります。

<!-- proof-start -->
### 証明

$T\in\mathcal A_L'$ とします。$P_\pm\in\mathcal A_L$ だから $[T,P_+]=0$。$T$ を電束直和の $2\times2$ ブロックで表すと

$$
T=\begin{pmatrix}T_{++}&T_{+-}\\T_{-+}&T_{--}\end{pmatrix},
\qquad
[T,P_+]
=\begin{pmatrix}0&-T_{+-}\\T_{-+}&0\end{pmatrix}.
$$

従って $T_{+-}=T_{-+}=0$ です。次に一つの電束ブロック上で $T_{ee}$ と全ての $A\otimes I_r$ の交換を考えます。左物質基底 $|0\rangle,|1\rangle$ について

$$
T_{ee}=\sum_{i,j=0}^1 |i\rangle\langle j|_l\otimes T_{ij}^{(e)}
$$

と一意に展開できます。左射影 $|0\rangle\langle0|\otimes I_r$ との交換から $T_{01}^{(e)}=T_{10}^{(e)}=0$。さらに $|0\rangle\langle1|\otimes I_r$ との交換から $T_{00}^{(e)}=T_{11}^{(e)}$ です。従って $T_{ee}=I_l\otimes B_e$ となります。逆にこの形なら全 $A\otimes I_r$ と交換します。各 $e$ で独立に $B_e$ を選べるので $\mathcal A_L'=\mathcal A_R$ です。左右を交換すればもう一つの等式も得ます。

最後に $\mathcal A_L\cap\mathcal A_R$ の元は一つの $e$ ブロックで $A_e\otimes I_r=I_l\otimes B_e$ を満たします。成分比較、または右側の二つの行列単位との交換から $A_e=\lambda_e I_l$、$B_e=\lambda_e I_r$ です。従って交わりは $\lambda_+P_++\lambda_-P_-$ に限られ、逆にこれは両代数に属します。$\mathcal A_L'=\mathcal A_R$ より中心 $Z(\mathcal A_L)=\mathcal A_L\cap\mathcal A_L'$ も同じです。$\square$
<!-- proof-end -->

この証明で「局所的に可換」は確認できました。しかし、共有中心があるので二つは**独立な全行列因子**ではありません。この点はエンタングルメント・エントロピーを考える前に確定する必要があります。

## 4. 素朴なテンソル因数分解はどこで失敗するか

独立した二部系の通常の形式は $H=H_L\otimes H_R$ で、左右の**全**観測量を $B(H_L)\otimes I_R$ および $I_L\otimes B(H_R)$ と同定します。どちらの代数の中心もスカラー倍の恒等作用素だけです。

<a id="prop-bhi15-factorization-obstruction"></a>

<!-- formal-statement-start -->
> **命題（共有中心は鋭い全行列因子分解を妨げる）**
>
> [定理の代数](#thm-bhi15-shared-center)に対し、非零有限次元Hilbert空間 $H_L,H_R$ とユニタリ $U:\mathcal K_{\mathrm{phys}}\to H_L\otimes H_R$ で
>
$$
U\mathcal A_LU^*=B(H_L)\otimes I_R,\qquad
U\mathcal A_RU^*=I_L\otimes B(H_R)
$$
>
> の両方を満たすものは存在しない。これは指定した**局所観測量を全行列因子と同定する分解**の不可能性であって、八次元ベクトル空間に何らかの抽象的テンソル積座標を入れることまで否定しない。
<!-- formal-statement-end -->

### 証明の見取り図

ユニタリ共役は中心を中心に写します。しかし $P_+$ は非零かつ恒等射影ではない中心射影であり、全行列因子の中心にはこのような射影がありません。

<!-- proof-start -->
### 証明

$P_+P_-=0$、$P_++P_-=I_8$、$\operatorname{rank}P_\pm=4$ なので、$P_+$ はスカラー倍の恒等作用素ではありません。[共有中心定理](#thm-bhi15-shared-center)より $P_+\in Z(\mathcal A_L)$ です。

一方 $B(H_L)$ の全行列単位と交換する行列は対角成分が全て等しい対角行列に限られるため $Z(B(H_L))=\mathbb CI_L$ です。従って

$$
Z(B(H_L)\otimes I_R)=\mathbb C I_{H_L\otimes H_R}.
$$

もし指定した $U$ が存在すると、$UP_+U^*$ は右辺の中心に入り、スカラー倍の恒等作用素となります。ユニタリ共役を戻すと $P_+$ もスカラー倍の恒等作用素となり矛盾します。$\square$
<!-- proof-end -->

この障害は**物理空間を左右の全観測量へ割り当てること**にあります。一方、最初に定義した拡張空間 $\mathcal K_{\mathrm{ext}}=\mathcal K_L\otimes\mathcal K_R$ では、たしかに左右への部分トレースを計算できます。この違いを次節で数値化します。

## 5. 代数への状態制限とエントロピー

物理空間上の密度作用素 $\rho$ は、$P_e\rho P_e$ という二つの対角セクターだけでなく、異なるセクターを結ぶ $P_+\rho P_-$ も持ち得ます。しかし $\mathcal A_L$ の元はブロック対角なので、**左だけの期待値**は対角セクターだけから決まります。

$$
p_e=\operatorname{Tr}(P_e\rho),\qquad p_++p_-=1.
$$

$p_e>0$ のとき $\rho_e=P_e\rho P_e/p_e$ は $\mathbb C^2_l\otimes\mathbb C^2_r$ 上の密度作用素、$\rho_l^e=\operatorname{Tr}_r\rho_e$ は左物質の縮約です。$p_e=0$ のセクターは全ての和から除きます。実際、$A=A_+\oplus A_-\in\mathcal A_L$ に対して

$$
\operatorname{Tr}(\rho A)
=\sum_{e=\pm}\operatorname{Tr}(P_e\rho P_e\,A_e)
=\sum_{e=\pm}p_e\operatorname{Tr}(\rho_l^e A_{l,e}).
$$

最後の式は $A_e=A_{l,e}\otimes I_r$ と[部分トレースの積への作用](../../../応用系/QINF/QINF3/index.md#prop-qinf3-state-product)に基づきます。

局所状態を一つの密度行列で表示したいなら、電束ブロックの左物質空間の直和 $\mathbb C^2_l\oplus\mathbb C^2_l$ を使い、$\sigma_L=p_+\rho_l^+\oplus p_-\rho_l^-$ とすれば、局所代数への全期待値を保存できます。この表現でのエントロピーは、電束の古典的不確実性と、セクター内の量子的エントロピーに分かれます。

<a id="def-bhi15-algebraic-entropy"></a>

<!-- formal-statement-start -->
> **定義（本有限模型の局所代数エントロピー）**
>
> 密度作用素 $\rho$ と[左右局所代数](#def-bhi15-local-algebras)について、左局所代数への状態制限を表すブロック密度行列を
>
$$
\sigma_L=\bigoplus_{e=\pm}p_e\rho_l^e
$$
>
> とする。**本模型での左代数エントロピー**を、このブロック行列の通常の行列トレースを用いて
>
$$
S_{\mathcal A_L}(\rho)=-\operatorname{Tr}(\sigma_L\ln\sigma_L)
$$
>
> と定める。右も $l,r$ を交換して定める。$0\ln0=0$ と約束し、$p_e=0$ のブロックは零とする。この定義は指定した有限次元直和代数のトレース表示に基づくもので、任意の無限次元局所代数に同じエントロピーが存在するという主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi15-algebraic-entropy -->
**定義の確認**：二つのセクターが同じ確率 $1/2$ で、両方の左物質状態が $|0\rangle\langle0|$ なら

$$
\sigma_L=\tfrac12|0\rangle\langle0|\oplus\tfrac12|0\rangle\langle0|.
$$

この行列は正で、全トレースは $1/2+1/2=1$。非零固有値は $1/2,1/2$ なので $S_{\mathcal A_L}=\ln2$ です。各セクター内は純粋でも、どちらの電束かは左から区別できる二値の不確実性として残ります。固定電束 $p_+=1,p_-=0$ なら同じ状態のエントロピーは0です。
<!-- definition-example-end -->

<a id="thm-bhi15-sector-entropy"></a>

<!-- formal-statement-start -->
> **定理（電束セクターのエントロピー分解）**
>
> [本有限模型の局所代数エントロピー](#def-bhi15-algebraic-entropy)は、任意の物理密度作用素 $\rho$ について
>
$$
\boxed{S_{\mathcal A_L}(\rho)=H(p_+,p_-)+\sum_{e=\pm}p_e S(\rho_l^e)},\qquad
H(p_+,p_-)=-\sum_{e=\pm}p_e\ln p_e
$$
>
> を満たす。さらに物理空間を最初の拡張テンソル積 $\mathcal K_L\otimes\mathcal K_R$ へ自然に埋め込むと、拡張空間上で右側を部分トレースして得る左密度作用素のエントロピーは、この値に等しい。後者の等号は**指定した埋め込み**についての事実であり、物理空間の局所因子分解の存在を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

各 $\rho_l^e$ の固有値に確率 $p_e$ を掛けたものが直和行列の固有値になります。$\ln(p_e\lambda)=\ln p_e+\ln\lambda$ を展開すれば二項に分かれます。拡張空間で右リンクの $|\pm\rangle$ が直交するため、セクターを結ぶ干渉項は部分トレースで消えます。

<!-- proof-start -->
### 証明

$p_e>0$ の各ブロックで $\rho_l^e$ の固有値を $\lambda_{e,1},\lambda_{e,2}\ge0$ とすると $\sum_j\lambda_{e,j}=1$ です。$\sigma_L$ の固有値は $p_e\lambda_{e,j}$ なので、零固有値の寄与を0と約束して

$$
\begin{aligned}
S_{\mathcal A_L}(\rho)
&=-\sum_{e,j}p_e\lambda_{e,j}\ln(p_e\lambda_{e,j})\\
&=-\sum_e p_e\ln p_e\sum_j\lambda_{e,j}
-\sum_e p_e\sum_j\lambda_{e,j}\ln\lambda_{e,j}\\
&=H(p_+,p_-)+\sum_e p_e S(\rho_l^e).
\end{aligned}
$$

$p_e=0$ の項は連続性で0とし、同じ式が成立します。

次に、物理空間の状態を拡張空間へ埋め込んだものを $\widetilde\rho$ とします。$\widetilde\rho$ の電束 $(e,f)$ ブロックは、左電束 $|e\rangle\langle f|$、右電束 $|e\rangle\langle f|$ と、物質 $lr$ 上の作用素 $T_{ef}$ のテンソル積です。右電束についてトレースすると

$$
\operatorname{Tr}_{eR}(|e\rangle\langle f|)=\langle f|e\rangle=\delta_{ef}
$$

となり、$e\ne f$ の項は消えます。さらに右物質をトレースすると、左密度行列は

$$
\widetilde\rho_L
=\sum_{e=\pm}|e\rangle\langle e|_{eL}\otimes(p_e\rho_l^e)
\simeq p_+\rho_l^+\oplus p_-\rho_l^-=\sigma_L.
$$

ゆえに固有値が一致してエントロピーも等しくなります。ここで部分トレースしたのは**拡張空間の右側**であり、[因数分解障害](#prop-bhi15-factorization-obstruction)と矛盾しません。$\square$
<!-- proof-end -->

### 数値例：セクターと量子相関は別々に数える

$|\Phi\rangle_{lr}=(|00\rangle+|11\rangle)/\sqrt2$ とし、

$$
|\Psi\rangle
=\frac1{\sqrt2}|++\rangle_e\otimes|\Phi\rangle_{lr}
+\frac1{\sqrt2}|--\rangle_e\otimes|00\rangle_{lr}
$$

を考えます。電束状態は直交するため $\|\Psi\|^2=1$ で、$G|\Psi\rangle=|\Psi\rangle$ です。$p_+=p_-=1/2$、$\rho_l^+=I_2/2$、$\rho_l^-=|0\rangle\langle0|$。従って

$$
S_{\mathcal A_L}(\Psi)
=\ln2+\tfrac12\ln2+\tfrac12\cdot0
=\frac32\ln2.
$$

これは「電束セクターの不確実性」$\ln2$ と「$+$ セクター内でのBell対」$\tfrac12\ln2$ の和です。全状態は純粋でも局所制限は純粋である必要がありません。

## 6. 左右が見落とす干渉と境界電束

電束だけの物理状態

$$
|\chi_p\rangle
=\sqrt p\,|++\rangle+\sqrt{1-p}\,|--\rangle,\qquad 0<p<1
$$

と、そのセクター間の干渉を消した混合状態

$$
\omega_p=p|++\rangle\langle++|+(1-p)|--\rangle\langle--|
$$

を比べます。いずれも左局所代数と右局所代数への制限は電束確率 $(p,1-p)$ だけで決まり、同じ期待値と $H(p,1-p)$ を与えます。しかし前節の**両側にまたがる観測量** $W=Z_LZ_R$ を測ると

$$
\langle\chi_p|W|\chi_p\rangle=2\sqrt{p(1-p)},
\qquad
\operatorname{Tr}(\omega_pW)=0.
$$

左・右局所代数の個々の制限からは、セクター間の全域的な干渉を復元できません。この差は、物理空間の状態自体を混合化したという意味ではなく、**選んだ観測量集合を制限した結果**です。

拡張Hilbert空間では左右の境界電束をそれぞれラベルとして持たせます。この境界電束ラベルは、格子ゲージ理論で議論するedge mode（境界自由度）の最小限の例に当たります。本模型では Gauss 制約が二つの電束ラベルを一致させます。拡張空間で部分トレースすると $H(p)$ が現れますが、これは物理空間が左右の独立全行列因子を持つという証拠ではありません。また、この $\mathbb Z_2$ 模型での $\ln2$ を、一般の重力エントロピーに普遍的に加算できる定数と見なしてはいけません。

## 7. AMPS・量子場・重力に戻す

[BHI10のAMPS三部制約](../BHI10/index.md#thm-bhi10-amps-tradeoff)を使うには、$R,b,c$ が独立のテンソル因子であり、同一状態の $S(Rb),S(R),S(bc),S(c)$ を**通常の部分トレースから**計算できることが必要でした。本講の模型では、局所的に可換な $\mathcal A_L,\mathcal A_R$ でも、共有中心のため全行列因子への単純な対応が失敗しました。従って、制約を持つ対象へBHI10の不等式を移すには、対象の局所代数とエントロピーの定義、必要な因数分解または適切な代数版の不等式を別途確定する必要があります。

ただし**Gauss制約があるからAMPSの矛盾が自動的に解消する**わけでもありません。例えば非重力の放射浴や十分に分離した近似的自由度では、特定の部分系分割を正当化できることがあります。どの観測量がどの領域に属するか、相関をどこで測るかを固定し直すのが次の問題です。

連続場では有限模型と異なる障害があります。[AQFT15のType III局所因子に対する鋭いType I分解の障害](../../../解析系/AQFT/AQFT15/index.md#prop-aqft15-typei-tensor-obstruction)は、Type III局所環を $B(H_L)\otimes I$ と表せないことを最小射影の不在から示します。[AQFT15の周囲の密度作用素の命題](../../../解析系/AQFT/AQFT15/index.md#prop-aqft15-ambient-density)が示すように、全Hilbert空間の密度作用素で局所状態を表せることと、局所環内部で通常のトレース密度が存在することも別です。一方、領域の間に緩衝帯を設け、[AQFT16のsplit inclusion](../../../解析系/AQFT/AQFT16/index.md#def-aqft16-split-inclusion)を仮定できれば、[AQFT16の内外テンソル積表示](../../../解析系/AQFT/AQFT16/index.md#thm-aqft16-split-tensor-inclusion)によって適切に離れた代数の空間的独立性が得られます。**鋭い境界**と**緩衝帯を持つ二領域**は同じ仮定ではありません。

さらに重力では、制約を保つための重力的ドレッシング（局所的な場を漸近領域などへ結び付けてゲージ不変にする構成）が問題になります。本講はこの重力ドレッシングの一般定理を証明していません。以後のisland・放射浴模型では、重力領域と非重力領域の境界条件、用いる代数、一般化エントロピーの定義を指定してからPage曲線を論じます。

## 8. 演習：Gauss制約から代数エントロピーへ

### Level A：物理空間・局所操作・セクターを確かめる

<a id="ex-bhi15-a01"></a>

#### BHI15-A01 Gauss射影と物理次元

- Level: A
- 問題: 二リンク模型で $G^2=I$、$P=(I+G)/2$ が直交射影であることを示せ。四つの電束積基底で $P$ の固有値を列挙し、物理空間の次元を求めよ。

<!-- solution-start -->
**詳細解答。** $X^2=I$、$X^*=X$ なので $G^2=X_L^2\otimes X_R^2=I$、$G^*=G$ です。

$$
P^2=\frac{I+2G+G^2}{4}=\frac{I+G}{2}=P,\qquad P^*=P.
$$

$G$ の固有値は $|++\rangle,|--\rangle$ 上で $+1$、$|+-\rangle,|-+\rangle$ 上で $-1$。従って $P$ の固有値は順に $1,1,0,0$、rankは2です。$\operatorname{Ran}P=\operatorname{span}\{|++\rangle,|--\rangle\}$ が物理空間です。
<!-- solution-end -->

<a id="ex-bhi15-a02"></a>

#### BHI15-A02 左局所作用素の全解

- Level: A
- 問題: $X$ 固有基底で $O=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とする。$[O\otimes I,G]=0$ の全解を求め、物理空間で $Z_L$ が許されない理由を示せ。

<!-- solution-start -->
**詳細解答。** $[O\otimes I,G]=[O,X]\otimes X$、$X$ 可逆だから $[O,X]=0$ が必要十分です。固有基底の $X=\operatorname{diag}(1,-1)$ を代入すると

$$
[O,X]=\begin{pmatrix}0&-2b\\2c&0\end{pmatrix}=0
$$

なので $b=c=0$。任意の $a,d$ に対して $O=\frac{a+d}{2}I+\frac{a-d}{2}X$ です。$Z|+\rangle=|-\rangle$ なので $Z_L|++\rangle=|-+\rangle$ はGauss固有値 $-1$ の空間へ出ます。よって左単独の $Z_L$ は物理局所操作ではありません。
<!-- solution-end -->

<a id="ex-bhi15-a03"></a>

#### BHI15-A03 非局所的な電束反転

- Level: A
- 問題: $W=Z_LZ_R$ が $G$ と交換することを計算し、物理基底 $|++\rangle,|--\rangle$ での $W$ の行列と $W^2$ を求めよ。

<!-- solution-start -->
**詳細解答。** $XZ=-ZX$ を左右それぞれで使うと

$$
GW=(X_LZ_L)\otimes(X_RZ_R)
=(-Z_LX_L)\otimes(-Z_RX_R)=WG.
$$

$Z|\pm\rangle=|\mp\rangle$ より $W|++\rangle=|--\rangle$、$W|--\rangle=|++\rangle$。従って物理基底で $W=\begin{pmatrix}0&1\\1&0\end{pmatrix}$、$W^2=I_2$ です。これは左右両リンクに作用するため、[左局所観測量の補題](#lem-bhi15-local-operators)の対角行列とは異なります。
<!-- solution-end -->

<a id="ex-bhi15-a04"></a>

#### BHI15-A04 電束中心射影

- Level: A
- 問題: 物質量子ビット付き模型の $P_+=\operatorname{diag}(I_4,0)$ と $P_-=\operatorname{diag}(0,I_4)$ について、階数、積、和と任意の $A\in\mathcal A_L$ との交換子を検算せよ。

<!-- solution-start -->
**詳細解答。** 各 $P_e$ は四次元ブロックの恒等または零行列なので $P_e^*=P_e$、$P_e^2=P_e$、$\operatorname{rank}P_e=4$。互いに異なるブロックを射影するので $P_+P_-=0$、$P_++P_-=I_8$ です。$A=A_+\oplus A_-$ と置くと

$$
P_+A=A_+\oplus0=AP_+,\quad P_-A=0\oplus A_-=AP_-.
$$

従って両方とも中心に属します。これは単に「左右の作用素が可換」であることより強い、[共有中心定理](#thm-bhi15-shared-center)の具体的内容です。
<!-- solution-end -->

<a id="ex-bhi15-a05"></a>

#### BHI15-A05 局所状態には見えない位相

- Level: A
- 問題: $|\chi\rangle=(|++\rangle+|--\rangle)/\sqrt2$ と $\omega=(|++\rangle\langle++|+|--\rangle\langle--|)/2$ について、左の電束観測量 $E=X_L$ と全域観測量 $W=Z_LZ_R$ の期待値を求めよ。

<!-- solution-start -->
**詳細解答。** $E|++\rangle=|++\rangle$、$E|--\rangle=-|--\rangle$ なので、純粋状態では交差項が直交して

$$
\langle\chi|E|\chi\rangle=\tfrac12-\tfrac12=0.
$$

混合状態も $\operatorname{Tr}(\omega E)=\tfrac12-\tfrac12=0$。一方 $W|++\rangle=|--\rangle$、$W|--\rangle=|++\rangle$ だから $W|\chi\rangle=|\chi\rangle$、$\langle\chi|W|\chi\rangle=1$。混合状態の各対角成分は $\langle++|W|++\rangle=\langle--|W|--\rangle=0$ で、$\operatorname{Tr}(\omega W)=0$。同じ局所期待値でも全域の干渉は異なります。
<!-- solution-end -->

### Level B：代数・エントロピー・因数分解を接続する

<a id="ex-bhi15-b01"></a>

#### BHI15-B01 可換子と中心を再構成する

- Level: B
- 問題: 物質量子ビット付き模型で、$T$ が左代数の全元と交換すると仮定する。まず $P_+$ との交換から $T$ の電束非対角ブロックが零になることを示し、次に各ブロックが $I_l\otimes B_e$ となることを行列単位で証明せよ。中心も求めよ。

<!-- solution-start -->
**詳細解答。** $T=\begin{pmatrix}T_{++}&T_{+-}\\T_{-+}&T_{--}\end{pmatrix}$ と置くと

$$
[T,P_+]=\begin{pmatrix}0&-T_{+-}\\T_{-+}&0\end{pmatrix}=0
$$

なので $T_{+-}=T_{-+}=0$。各 $T_{ee}=\sum_{i,j}|i\rangle\langle j|_l\otimes B_{ij}$ と展開します。$|0\rangle\langle0|_l\otimes I_r$ と交換するには $B_{01}=B_{10}=0$ が必要です。$|0\rangle\langle1|_l\otimes I_r$ と交換すると $B_{00}=B_{11}$ が必要です。従って $T_{ee}=I_l\otimes B_e$。逆向きの交換も成り立ち、$\mathcal A_L'=\mathcal A_R$ です。

中心の元は左右代数の双方に属します。各ブロックで $A_e\otimes I_r=I_l\otimes B_e$ とすると、任意の左・右行列単位と交換するので $A_e,B_e$ は同じスカラー $\lambda_e$ の恒等行列です。結論は $Z(\mathcal A_L)=\operatorname{span}\{P_+,P_-\}$ です。
<!-- solution-end -->

<a id="ex-bhi15-b02"></a>

#### BHI15-B02 電束とBell相関の足し算

- Level: B
- 問題: 物質付き模型で、$p_+=1/4,p_-=3/4$、$\rho_l^+=I_2/2$、$\rho_l^-=|0\rangle\langle0|$ とする。$\sigma_L$ の非零固有値を求め、局所代数エントロピーを二通りで検算せよ。

<!-- solution-start -->
**詳細解答。** ブロック行列の $+$ 側は $(1/4)(I_2/2)$ なので固有値は $1/8,1/8$。$-$ 側は $(3/4)|0\rangle\langle0|$ なので $3/4,0$ です。従って

$$
S_{\mathcal A_L}
=-2\cdot\tfrac18\ln\tfrac18-\tfrac34\ln\tfrac34
=\tfrac34\ln2+\tfrac34(2\ln2-\ln3)
=\frac94\ln2-\frac34\ln3.
$$

一方、[電束セクターのエントロピー分解](#thm-bhi15-sector-entropy)に $(p_+,p_-)=(1/4,3/4)$ を代入すると

$$
H(1/4,3/4)
=-\tfrac14\ln\tfrac14-\tfrac34\ln\tfrac34
=2\ln2-\tfrac34\ln3.
$$

セクター内の加重項は $(1/4)\ln2+(3/4)\cdot0=\tfrac14\ln2$ です。和は $\frac94\ln2-\frac34\ln3$ となり一致します。
<!-- solution-end -->

<a id="ex-bhi15-b03"></a>

#### BHI15-B03 「Hilbert空間が八次元」の落とし穴

- Level: B
- 問題: 物質付き物理空間は八次元なので $\mathbb C^2\otimes\mathbb C^4$ と抽象的に同型である。これだけでは $\mathcal A_L=B(\mathbb C^2)\otimes I_4$ とみなせない理由を、中心の射影から証明せよ。どの仮定を失うと議論が壊れるかも述べよ。

<!-- solution-start -->
**詳細解答。** $\dim\mathcal K_{\mathrm{phys}}=8=2\cdot4$ なので、正規直交基底に番号を付けて抽象的なユニタリ同型は作れます。しかし[Gauss制約による共有中心と可換子](#thm-bhi15-shared-center)の結論から $P_+\in Z(\mathcal A_L)$ は非零・非恒等射影です。$B(\mathbb C^2)\otimes I_4$ の中心は $\mathbb CI_8$ であり、そこに非自明な射影はありません。ユニタリ共役は中心を保存するので、**局所代数まで**指定した同型は不可能です。

反対に、局所代数を全行列因子と**同定する条件を外す**と、八次元ベクトル空間の抽象的なテンソル座標は排除されません。証明が否定したのは任意の座標分解ではなく、局所観測量と両立する鋭い因数分解です。
<!-- solution-end -->

<a id="ex-bhi15-b04"></a>

#### BHI15-B04 電束固定と可変のエントロピー

- Level: B
- 問題: $|\Psi\rangle$ を第5節の $p_+=p_-=1/2$、$+$ 側Bell対・$-$ 側積状態の純粋状態とする。左代数エントロピーを求め、物理状態の $+$ セクターで条件付けしてから左物質のみへ制限した場合と比べよ。条件付けでどの不確実性が消えるか説明せよ。

<!-- solution-start -->
**詳細解答。** セクター確率は $(1/2,1/2)$ なので $H=\ln2$。$+$ 側の左密度は $I_2/2$ で $S=\ln2$、$-$ 側は $|0\rangle\langle0|$ で $S=0$ です。[電束セクターのエントロピー分解](#thm-bhi15-sector-entropy)より

$$
S_{\mathcal A_L}(\Psi)=\ln2+\tfrac12\ln2+\tfrac12\cdot0=\tfrac32\ln2.
$$

一方 $P_+\Psi/\|P_+\Psi\|=|++\rangle\otimes|\Phi\rangle$ に条件付けすると、電束は確率1で確定します。左物質だけをトレースで残した密度は $I_2/2$ なのでエントロピーは $\ln2$。元の状態との差は

$$
\left(\ln2+\tfrac12\ln2\right)-\ln2
=\tfrac12\ln2.
$$

条件付けによって電束の二値不確実性 $H=\ln2$ が消える一方、残した $+$ セクター内の量子相関への重みは $1/2$ から1に増えます。そのため差は単なる固定の境界定数ではなく、セクター確率と量子相関の加重平均が両方変わった結果です。
<!-- solution-end -->

### Level C：物理空間・代数・全域観測量を統合する

<a id="ex-bhi15-c01"></a>

#### BHI15-C01 電束重ね合わせとAMPSの仮定の監査

- Level: C
- 問題: 物質付きGauss模型で $|\Phi\rangle_{lr}=(|00\rangle+|11\rangle)/\sqrt2$ とし、
  
  $$
  |\Omega\rangle=\tfrac12|++\rangle_e|\Phi\rangle_{lr}
  +\tfrac{\sqrt3}{2}|--\rangle_e|00\rangle_{lr}.
  $$
  
  1. 規格化とGauss制約を確かめよ。
  2. $\sigma_L$ の全固有値とエントロピーを求めよ。
  3. 両電束を反転する $W=Z_{eL}\otimes I_l\otimes Z_{eR}\otimes I_r$（因子を並べ替えれば $(Z_{eL}\otimes Z_{eR})\otimes I_{lr}$）の期待値を求め、電束間の非対角成分を消した混合状態と比べよ。
  4. [BHI10のAMPS三部不等式](../BHI10/index.md#thm-bhi10-amps-tradeoff)を、この左右代数のエントロピーへそのまま代入してはいけない理由と、追加で決めるべき事項を述べよ。

<!-- solution-start -->
**詳細解答。**

(1) 二つの電束基底は直交し、$|\Phi\rangle$ と $|00\rangle$ はともにノルム1なので

$$
\langle\Omega|\Omega\rangle
=\tfrac14\langle\Phi|\Phi\rangle+\tfrac34\langle00|00\rangle=1.
$$

両項の電束は $X_{eL}X_{eR}=+1$ なので $G|\Omega\rangle=|\Omega\rangle$ です。

(2) $p_+=1/4,p_-=3/4$。$+$ 側はBell対だから[部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)で $\rho_l^+=I_2/2$、$-$ 側は $\rho_l^-=|0\rangle\langle0|$。従って

$$
\sigma_L=\frac14\frac{I_2}{2}\oplus\frac34|0\rangle\langle0|,
\qquad
\operatorname{spec}\sigma_L=\left\{\tfrac18,\tfrac18,\tfrac34,0\right\}.
$$

固有値の和は1。[エントロピー分解](#thm-bhi15-sector-entropy)に代入すると

$$
S_{\mathcal A_L}=H(1/4,3/4)+\tfrac14\ln2
=2\ln2-\tfrac34\ln3+\tfrac14\ln2
=\frac94\ln2-\frac34\ln3.
$$

(3) $W$ は電束を $++\leftrightarrow --$ に交換し、物質には作用しません。従って対角の期待値は0で、非対角成分だけが残ります。

$$
\begin{aligned}
\langle\Omega|W|\Omega\rangle
&=2\left(\frac12\right)\left(\frac{\sqrt3}{2}\right)
\operatorname{Re}\langle\Phi|00\rangle\\
&=\frac{\sqrt3}{2}\frac1{\sqrt2}
=\sqrt{\frac38}.
\end{aligned}
$$

この計算では $\langle\Phi|00\rangle=1/\sqrt2$ を用いました。二セクター間の非対角成分を捨てた混合状態は $\rho_{\mathrm{diag}}=\frac14|++\rangle\langle++|\otimes|\Phi\rangle\langle\Phi|+\frac34|--\rangle\langle--|\otimes|00\rangle\langle00|$。局所代数への制限とエントロピーは同じですが、$\operatorname{Tr}(\rho_{\mathrm{diag}}W)=0$ です。

(4) [BHI10のAMPS制約](../BHI10/index.md#thm-bhi10-amps-tradeoff)では $R,b,c$ を**独立テンソル因子**として部分トレースを行い、強劣加法性を適用しました。ここでの左右局所代数は $P_\pm$ を共有し、[因数分解障害](#prop-bhi15-factorization-obstruction)により左右を独立の全行列因子とはみなせません。従って通常の部分トレースで定義した条件付きエントロピーを、定義の違う代数エントロピーへ記号だけ置換することはできません。放射・内部・外部に対応する具体的な局所代数、境界セクター、状態制限と、適用する不等式の仮定を先に確定する必要があります。これはAMPSの矛盾の自動的解消ではなく、議論を使うために必要な仮定の検査です。
<!-- solution-end -->

## 9. 本講で確定したことと次講

| 主張 | 確認した範囲 |
| --- | --- |
| Gauss制約が左右電束を結び付ける | $G=X_LX_R$ の $+1$ 固有空間を直接計算 |
| 局所代数が共有中心を持つ | 物質付き有限模型で可換子・中心を行列単位から証明 |
| 左右の全行列因子への鋭い分解 | 中心の非自明射影との矛盾により否定 |
| 局所代数エントロピーの分解 | 指定した有限次元直和代数で $H(p)+\sum pS(\rho_l^e)$ を証明 |
| 拡張空間での部分トレース | 指定した電束埋め込みで計算可能。物理的因数分解の証明とは別 |
| Type III・split・重力ドレッシング | 既習AQFTの実在する定理へ接続し、一般重力については主張しない |

次のBHI16では、Hawking・Page・Mathur・AMPS・Hayden–Preskill の各主張が**どの状態・どの領域・どの因数分解と時間近似**を仮定するかを同じ表で整理します。本講は「矛盾を消す魔法」ではなく、何に不等式を適用しているかを確定する準備です。

### 参照文献

- D. Harlow, [*Jerusalem Lectures on Black Holes and Quantum Information*](https://doi.org/10.1103/RevModPhys.88.015002) (2016): ブラックホール情報の仮定整理。
- H. Casini, M. Huerta and J. A. Rosabal, [*Remarks on Entanglement Entropy for Gauge Fields*](https://arxiv.org/abs/1312.1183) (2014): ゲージ理論の部分領域代数・中心・エントロピー。
- W. Donnelly, [*Decomposition of Entanglement Entropy in Lattice Gauge Theory*](https://arxiv.org/abs/1109.0036) (2012): 格子ゲージ理論のedge modeと分解。
- S. Giddings, [*Gravitational dressing, soft charges, and perturbative gravitational splitting*](https://arxiv.org/abs/1903.06160) (2019): 重力的ドレッシングと局所化の問題。
