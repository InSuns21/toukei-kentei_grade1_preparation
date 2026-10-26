# ML2-18 Attention・Transformerの演算

[再帰ネットワーク](../ML2-17/index.md#def-ml2-17-simple-rnn)は過去を一つの状態へ押し込み、時刻順に計算する。ところが「系列のどこを参照したか」は一つの状態から直接は読めず、遠く離れた入力との関係は多段の状態更新を通る。そこで、各位置が参照先を重み付きで選び、その位置の情報を直接集約する計算を考える。これは現在の入力を得点化して比較する操作であり、学習済み重みが常に言語的な「重要さ」を表すと主張するものではない。

本講では有限長のトークン列を行列として表し、**どの行がどの行を見るか、何を平均しているか**を明確にする。次に未来の情報を遮るマスク、複数の参照方式、位置情報、残差接続、勾配を順に扱う。最後に「位置情報のない同一演算は位置を並べ替えても対応して並び替わる」という性質を、マスクの条件まで含めて証明する。

## 1. 参照先の得点から重み付き平均を作る

長さ $n\ge1$ の系列で各トークンを $d$ 次元の行ベクトル $x_i^{\mathsf T}$ として並べ、$X\in\mathbb R^{n\times d}$ とする。行 $i$ の出力を作るとき、参照先の行 $j$ とどの程度合うかを比較したい。比較する側の特徴を**query（問い合わせ）**、比較される側の特徴を**key（鍵）**、実際に取り出す内容を**value（値）**と呼ぶ。この三者を分ければ、似ているかの尺度と取り出す値を別々に学習できる。

射影行列 $W_Q,W_K\in\mathbb R^{d\times k}$、$W_V\in\mathbb R^{d\times v}$ を共有し、$k,v$ を正整数とする。$Q=XW_Q,K=XW_K,V=XW_V$ の行をそれぞれ $q_i^{\mathsf T},k_i^{\mathsf T},v_i^{\mathsf T}$ と書く。問い合わせと鍵の内積 $q_i^{\mathsf T}k_j$ は実数で、同じ query に対して値が大きい参照先ほど大きな重みを与えたい。得点を $\sqrt{k}$ で割るのは、各座標積が中心化され独立・等分散なら内積の分散が概ね $k$ に比例することを緩和するためであり、一般の学習済み行列で分散一定を保証する定理ではない。

実数列 $s_1,\ldots,s_n$ を指数化して合計で割ると、すべて正で合計1になる。これを**softmax**と呼び、$s$ が大きい項の比重を増やす。行ごとの指数値は数値桁あふれを防ぐため、最大値を引いてから指数化しても同じ比率になる。

<a id="def-ml2-18-attention"></a>

<!-- formal-statement-start -->
> **定義（scaled dot-product attention）**  
> $n,d,k,v$ を正整数とし、$X\in\mathbb R^{n\times d}$、$W_Q,W_K\in\mathbb R^{d\times k}$、$W_V\in\mathbb R^{d\times v}$ を与える。$Q=XW_Q$、$K=XW_K$、$V=XW_V$、得点行列 $S=QK^{\mathsf T}/\sqrt{k}\in\mathbb R^{n\times n}$ を作る。各行について

$$
A_{ij}=\frac{\exp(S_{ij}-m_i)}{\sum_{\ell=1}^{n}\exp(S_{i\ell}-m_i)},
\qquad m_i=\max_{1\le\ell\le n}S_{i\ell}
$$

> と置く。**scaled dot-product attention**の出力は

$$
Y=AV\in\mathbb R^{n\times v},\qquad
y_i=\sum_{j=1}^{n}A_{ij}v_j
$$

> である。$A$ を注意重み行列と呼ぶ。各行の成分は正で行和1となる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-18-attention -->
**定義の確認**。$n=2,d=k=v=1$、$X=(0,1)^{\mathsf T}$、三つの射影重みをすべて1とする。すると $Q=K=V=(0,1)^{\mathsf T}$ で、$QK^{\mathsf T}$ の行・列を順に掛けると

$$
S=\begin{pmatrix}0&0\\0&1\end{pmatrix},\quad
A=\begin{pmatrix}
1/2&1/2\\1/(1+e)&e/(1+e)
\end{pmatrix},\quad
Y=\begin{pmatrix}1/2\\e/(1+e)\end{pmatrix}.
$$

第一行は $0$ と $0$ を等しく比較する。第二行は $0$ と $1$ を比較して後者を $e$ 倍重くする。両行とも成分は正で和1であり、$Y$ の各成分は値 $0$ と $1$ の凸結合である。ここで $e=\exp(1)$ とした。
<!-- definition-example-end -->

$V$ の行がすべて同じベクトル $c$ なら、どんな $A$ でも $y_i=(\sum_jA_{ij})c=c$ となる。逆に注意重みが違っても値ベクトルが同じなら出力に違いはない。したがって、重みの大きさだけから予測への因果的寄与を読み取るのは危険である。

## 2. 未来と無効トークンを許可集合で除く

系列予測では、時刻 $i$ の出力に時刻 $i+1$ の正解を見せてはいけない。[再帰網の因果性](../ML2-17/index.md#def-ml2-17-unrolling)は更新順から生じたが、attentionはすべての行を同時に比較するため、許可しない鍵を明示する必要がある。

行 $i$ から参照してよい列の集合を $J_i\subseteq\{1,\ldots,n\}$ とする。すべての有効な問い合わせ行について $J_i\ne\varnothing$ を要求する。**因果マスク**では $J_i=\{1,\ldots,i\}$、**パディングマスク**では実データでない列を除外する。パディング行自体を出力・損失に使用しない場合、値を捨てることと「全列を禁止したsoftmaxを計算する」ことは異なる。

<a id="def-ml2-18-mask"></a>

<!-- formal-statement-start -->
> **定義（許可集合とマスク付きattention）**  
> [scaled dot-product attention](#def-ml2-18-attention)の $S\in\mathbb R^{n\times n}$ と、各行で空でない許可集合 $J_i\subseteq\{1,\ldots,n\}$ を固定する。$m_i=\max_{j\in J_i}S_{ij}$ とし

$$
A_{ij}=
\begin{cases}
\displaystyle\frac{\exp(S_{ij}-m_i)}{\sum_{\ell\in J_i}\exp(S_{i\ell}-m_i)},&j\in J_i,\\
0,&j\notin J_i
\end{cases},\qquad Y=AV
$$

> と定める。これは禁止列へ重み0を割り当て、許可列だけで行ごとに正規化した**マスク付きattention**である。得点に負の無限大を加える慣用表記は、この分岐の略記である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-18-mask -->
**定義の確認**。第一節の二トークン例で因果マスク $J_1=\{1\},J_2=\{1,2\}$ を使う。第一行は参照先が一個なので $A_{11}=e^0/e^0=1$、禁止された $A_{12}=0$。第二行は元の二列を使うため

$$
A=\begin{pmatrix}1&0\\1/(1+e)&e/(1+e)\end{pmatrix},
\qquad Y=\begin{pmatrix}0\\e/(1+e)\end{pmatrix}.
$$

各行で許可集合は空でなく、行和は1である。第一行の値が $1/2$ から $0$ に変わったのは、将来の値 $v_2=1$ を参照不能にしたためである。
<!-- definition-example-end -->

例えば三つの行のうち第3列だけがパディングなら、有効な問い合わせ $i=1,2$ に $J_i=\{1,2\}$ と指定する。第3行が無効であれば、そもそも第3行の出力と損失を使わない。計算APIで全行の出力が必要なら第3行にも非空の許可集合を明示し、その結果を無効として捨てる。全列を禁止した行は分母が0となり未定義で、0ベクトルをsoftmaxの結果として装うことはできない。

<a id="prop-ml2-18-causal"></a>

<!-- formal-statement-start -->
> **命題（マスク付きattentionの因果性）**  
> $n,d,k,v\ge1$、$X\in\mathbb R^{n\times d}$ と固定された行共有射影 $W_Q,W_K,W_V$ に対し、[マスク付きattention](#def-ml2-18-mask)で各 $J_i\subseteq\{1,\ldots,i\}$ が空でないとする。位置情報を加える場合、それは入力値に依存しない各位置の固定ベクトルとする。このとき各出力 $y_i$ は入力行 $x_1,\ldots,x_i$ のみに依存する。
<!-- formal-statement-end -->

### 証明の見取り図

行 $i$ のqueryは行 $i$ から、許されたkey/valueは先頭 $i$ 行から作る。正規化の和も許可集合の中に限られるので、後の行の入力が現れる経路はない。

<!-- proof-start -->
### 証明

任意の $i$ を固定する。射影は行ごとに共有されるだけで行間を混ぜないので、$q_i=W_Q^{\mathsf T}x_i$ は $x_i$ のみの関数である。同じく $j\in J_i$ なら $k_j=W_K^{\mathsf T}x_j$、$v_j=W_V^{\mathsf T}x_j$ は $j\le i$ の入力のみの関数である。したがって $S_{ij}=q_i^{\mathsf T}k_j/\sqrt{k}$、許可集合内の最大 $m_i$、分母 $\sum_{\ell\in J_i}\exp(S_{i\ell}-m_i)$ はいずれも先頭 $i$ 行から決まり、正の分母を持つ。$y_i=\sum_{j\in J_i}A_{ij}v_j$ に未来入力は現れない。固定位置ベクトルを足しても、各行の計算に他の入力行は混入しない。$\square$
<!-- proof-end -->

この主張は「各行の射影前に系列全体の平均を混ぜる」などの別操作を挿入した場合には自動では成立しない。また訓練時に正解系列をずらして入力する場合は、[教師強制](../ML2-17/index.md#def-ml2-17-teacher-forcing)と同じく、入力自体に将来の答えが紛れ込んでいないかを別途確認する必要がある。

## 3. 行ごとのsoftmaxをどう逆伝播するか

得点から出力を計算できても、射影行列を学習するには微分が必要である。[逆モードの分岐和](../ML2-14/index.md#thm-ml2-14-reverse-chain)を使うが、softmaxの分母は一行のすべての得点に依存するため、重みを各成分独立に微分してはいけない。以下ではマスク $J_i$ を固定し、その許可集合がパラメータで変わらないことを仮定する。

一行の許可得点を $s_j$、その重みを $a_j=e^{s_j}/\sum_{\ell\in J}e^{s_\ell}$ とすると、分子の微分は $e^{s_j}\boldsymbol 1_{\{j=r\}}$、分母の微分は $e^{s_r}$ である。商の微分で両方が現れ、$\partial a_j/\partial s_r=a_j(\boldsymbol 1_{\{j=r\}}-a_r)$ を得る。

<a id="thm-ml2-18-gradient"></a>

<!-- formal-statement-start -->
> **定理（softmaxとattentionの微分）**  
> 正整数 $n,k,v$ に対して $Q,K\in\mathbb R^{n\times k}$、$V\in\mathbb R^{n\times v}$、空でない固定許可集合 $J_i$ を与え、[マスク付きattention](#def-ml2-18-mask)で $S=QK^{\mathsf T}/\sqrt{k}$、$A$、$Y=AV$ を定める。$Y$ に関する微分可能な実数値損失 $L(Y)$ の勾配を $H=\nabla_YL\in\mathbb R^{n\times v}$ とする。$G=HV^{\mathsf T}\in\mathbb R^{n\times n}$、$D\in\mathbb R^{n\times n}$ を

$$
D_{ij}=\begin{cases}
A_{ij}\bigl(G_{ij}-\sum_{\ell\in J_i}A_{i\ell}G_{i\ell}\bigr),&j\in J_i,\\
0,&j\notin J_i
\end{cases}
$$

> と置けば、$D=\nabla_SL$ であり、

$$
\nabla_VL=A^{\mathsf T}H,\qquad
\nabla_QL=\frac{DK}{\sqrt{k}},\qquad
\nabla_KL=\frac{D^{\mathsf T}Q}{\sqrt{k}}.
$$

> 禁止した得点成分の勾配は0である。
<!-- formal-statement-end -->

### 証明の見取り図

まず $Y=AV$ の積から $A$ と $V$ へ分岐させる。次にsoftmaxの行内相互依存を計算し、最後に $S=QK^{\mathsf T}/\sqrt{k}$ を成分微分する。分母の平均項を落とすと、各行の勾配和が0にならない。

<!-- proof-start -->
### 証明

損失の微小変化は $dL=\sum_{i,a}H_{ia}\,dY_{ia}$ である。$Y_{ia}=\sum_jA_{ij}V_{ja}$ を積の微分で展開すれば

$$
dL=\sum_{i,a,j}H_{ia}V_{ja}\,dA_{ij}
  +\sum_{i,a,j}H_{ia}A_{ij}\,dV_{ja}.
$$

したがって $\partial L/\partial A_{ij}=\sum_aH_{ia}V_{ja}=G_{ij}$、$\partial L/\partial V_{ja}=\sum_iA_{ij}H_{ia}$ である。固定行 $i$、許可された列 $j,r$ に対し、商の微分を分子と分母の両方へ適用すると

$$
\begin{aligned}
\frac{\partial A_{ij}}{\partial S_{ir}}
&=\frac{\boldsymbol1_{\{j=r\}}e^{S_{ij}}Z_i-e^{S_{ij}}e^{S_{ir}}}{Z_i^2}\\
&=A_{ij}\bigl(\boldsymbol1_{\{j=r\}}-A_{ir}\bigr),
\quad Z_i=\sum_{\ell\in J_i}e^{S_{i\ell}}.
\end{aligned}
$$

最大値を引く数値表現は同じ比率を表しているため、数学的な微分はこの式でよい。連鎖律で

$$
\begin{aligned}
\frac{\partial L}{\partial S_{ir}}
&=\sum_{j\in J_i}G_{ij}A_{ij}
\bigl(\boldsymbol1_{\{j=r\}}-A_{ir}\bigr)\\
&=A_{ir}G_{ir}-A_{ir}\sum_{j\in J_i}A_{ij}G_{ij}\\
&=A_{ir}\left(G_{ir}-\sum_{j\in J_i}A_{ij}G_{ij}\right)
\end{aligned}
$$

禁止列は定義によって $A_{ij}=0$ が定数だから勾配0である。最後に

$$
S_{ij}=\frac{1}{\sqrt{k}}\sum_{a=1}^{k}Q_{ia}K_{ja}
$$

について、$\partial S_{ij}/\partial Q_{ra}=\boldsymbol1_{\{i=r\}}K_{ja}/\sqrt{k}$、$\partial S_{ij}/\partial K_{ra}=\boldsymbol1_{\{j=r\}}Q_{ia}/\sqrt{k}$ を代入すると

$$
\frac{\partial L}{\partial Q_{ra}}=\frac1{\sqrt{k}}\sum_jD_{rj}K_{ja},\qquad
\frac{\partial L}{\partial K_{ra}}=\frac1{\sqrt{k}}\sum_iD_{ir}Q_{ia}
$$

を得る。これらは主張の行列式であり、形も $Q,K,V$ の形と一致する。$\square$
<!-- proof-end -->

ここで特に、各行で $\sum_jD_{ij}=0$ となる。実際、$\sum_{j\in J_i}A_{ij}G_{ij}-(\sum_jA_{ij})(\sum_\ell A_{i\ell}G_{i\ell})=0$ である。全得点に同じ定数を足してもsoftmaxが変化しないことの微分版である。$Q=XW_Q$ 等の線形射影へ戻すなら、[逆伝播の行列成分展開](../ML2-14/index.md#thm-ml2-14-backprop)から $\nabla_{W_Q}L=X^{\mathsf T}\nabla_QL$ などを得る。また共有入力の勾配は三本の経路の和になる。

$$
\nabla_XL=(\nabla_QL)W_Q^{\mathsf T}
+(\nabla_KL)W_K^{\mathsf T}
+(\nabla_VL)W_V^{\mathsf T}.
$$

## 4. 一つの参照方式だけでは足りない

単一のquery/key/value射影では、一行の出力は一組の重みで作る $v$ 次元の平均になる。異なる特徴に別々の参照パターンを持たせたい場合、射影を複数組用意して結果を連結する。これが**multi-head**の発想である。「headを増やすほど意味的な解釈が一意に定まる」という保証はない。

$h\ge1$ 個のheadの第 $r$ 組に $k_r,v_r\ge1$ を選ぶ。各headの $A^{(r)}$ は $n\times n$、出力 $Y^{(r)}$ は $n\times v_r$。行方向ではなく特徴方向に横連結すれば $n\times(v_1+\cdots+v_h)$ となる。最後の出力射影で入力と同じ幅 $d$ に戻せば、入力 $X$ と加算できる。この加算が**残差接続**であり、平均化の結果だけに置き換えず元の表現を伝える経路を残す。

<a id="def-ml2-18-multihead"></a>

<!-- formal-statement-start -->
> **定義（multi-head attentionと残差ブロック）**  
> $n,d,h\ge1$、$X\in\mathbb R^{n\times d}$ を与える。各head $r=1,\ldots,h$ に $k_r,v_r\ge1$、射影 $W_Q^{(r)},W_K^{(r)}\in\mathbb R^{d\times k_r}$、$W_V^{(r)}\in\mathbb R^{d\times v_r}$、空でない許可集合を指定し、[マスク付きattention](#def-ml2-18-mask)の出力を $Y^{(r)}\in\mathbb R^{n\times v_r}$ とする。$v_\Sigma=\sum_{r=1}^{h}v_r$、$W_O\in\mathbb R^{v_\Sigma\times d}$ により

$$
\operatorname{MHA}(X)
=\bigl[Y^{(1)}\ \cdots\ Y^{(h)}\bigr]W_O\in\mathbb R^{n\times d}
$$

> をmulti-head attentionとする。**残差ブロック**の基本形は $Z=X+\operatorname{MHA}(X)\in\mathbb R^{n\times d}$ である。バイアスや正規化、後続の行ごとの全結合網は必要に応じて追加できるが、ここでは基本形に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-18-multihead -->
**定義の確認**。$n=d=h=2$、両headで $k_r=v_r=1$ とし、queryとkey射影はどちらもゼロ列、value射影をそれぞれ $(1,0)^{\mathsf T}$、$(0,1)^{\mathsf T}$、$W_O=I_2$ とする。$X$ の二行を $(2,0),(0,2)$ とし、全列を許可する。各headで得点0、注意重みは二行とも $(1/2,1/2)$ なので、第一headは各行1、第二headも各行1を返す。連結行列は行が $(1,1)$ で、出力射影後も同じ形となる。よって

$$
Z=X+\operatorname{MHA}(X)
=\begin{pmatrix}2&0\\0&2\end{pmatrix}
 +\begin{pmatrix}1&1\\1&1\end{pmatrix}
=\begin{pmatrix}3&1\\1&3\end{pmatrix}.
$$

各headの $Q,K$ は $2\times1$、$V,Y^{(r)}$ も $2\times1$、連結後は $2\times2$ であり、加算は同じ形の行列に対してだけ行った。
<!-- definition-example-end -->

実際のTransformerブロックでは、行ごとの層正規化、残差接続、行ごとの全結合網を組み合わせることが多い。層正規化の一例では行 $z_i\in\mathbb R^d$ に対し、平均 $\mu_i=d^{-1}\sum_a z_{ia}$、分散 $s_i^2=d^{-1}\sum_a(z_{ia}-\mu_i)^2$ を求め、固定 $\varepsilon>0$、学習係数 $\gamma,\beta\in\mathbb R^d$ で

$$
\operatorname{LN}(z_i)_a
=\gamma_a\frac{z_{ia}-\mu_i}{\sqrt{s_i^2+\varepsilon}}+\beta_a
$$

とする。$d=1$ でも $\varepsilon>0$ なので分母は0にならない。これは行の特徴座標に作用しトークンの行どうしは混ぜない。たとえば $U=\operatorname{LN}(X+\operatorname{MHA}(X))$ として、$Z=\operatorname{LN}(U+f(U))$、$f(u)=\phi(uW_1+b_1)W_2+b_2$ を各行で計算する構成がある。$W_1\in\mathbb R^{d\times m},W_2\in\mathbb R^{m\times d}$ を選べば次元は一致する。実装には正規化を残差の前に置く方式もあり、同じ計算とは限らない。残差は勾配に恒等経路を追加するが、深いモデルで勾配消失が絶対に起こらないという保証ではない。

## 5. 順番を区別する位置情報と置換同変性

ここまでの射影はすべての位置で同じ行列を使い、行全体に固有の時刻番号は渡していない。系列の並びを順番どおりに識別するには、別の位置情報が必要になる。入力と同じ次元の固定または学習可能なベクトル $p_i\in\mathbb R^d$ を各位置に用意し、$x_i+p_i$ を射影へ渡せばよい。この式が動くためには $p_i$ はトークンの値ではなく、**位置 $i$ に割り当てられたベクトル**として管理する必要がある。

<a id="def-ml2-18-position"></a>

<!-- formal-statement-start -->
> **定義（位置情報を加えたトークン表現）**  
> $n,d\ge1$、$X\in\mathbb R^{n\times d}$ と、位置 $i$ ごとのベクトル $p_i\in\mathbb R^d$ を行に並べた $E\in\mathbb R^{n\times d}$ を与える。射影に渡す表現を $Z=X+E$ とする。これを**加算型位置情報**と呼ぶ。$p_i$ が固定か学習可能か、およびトークンの並べ替え時に $E$ の行も並べ替えるかを、使用する操作ごとに区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-18-position -->
**定義の確認**。$n=2,d=1$、$X=(0,0)^{\mathsf T}$、第一位置は $p_1=0$、第二位置は $p_2=1$ とする。$E=(0,1)^{\mathsf T}$ で $Z=(0,1)^{\mathsf T}$ となる。入力トークンは同じ数値でも、第一節と同じ単一headの全列attentionを $Z$ に適用すると、出力は $(1/2,e/(1+e))^{\mathsf T}$ となる。位置の違いが射影前の行を区別し、異なる重みと値が得られた。両位置へ同じベクトルを足した場合には、この例の区別は生まれない。
<!-- definition-example-end -->

順序に依存しない特徴の扱いを数学的に記述する。行の並べ替えを表す $P\in\mathbb R^{n\times n}$ は、各行・列に1が一個ずつあり残りが0の行列で、$PX$ は $X$ の行の並べ替えになる。各列は異なる標準基底なので $P^{\mathsf T}P=I_n$。写像 $F$ が $F(PX)=PF(X)$ を満たすとき、行の並べ替えに対して**置換同変**であるという。これは出力が不変という意味ではなく、出力の行も同じ順番で移る性質である。

<a id="thm-ml2-18-equivariance"></a>

<!-- formal-statement-start -->
> **定理（位置情報なしの置換同変性）**  
> $n,d,k,v\ge1$、共有された射影行列 $W_Q,W_K,W_V$ を固定し、位置情報を加えない[scaled dot-product attention](#def-ml2-18-attention)の写像を $F:\mathbb R^{n\times d}\to\mathbb R^{n\times v}$ とする。$P\in\mathbb R^{n\times n}$ は各行・各列にちょうど一個の1を持ち、他が0の行列とする。全行で全列を許可する（または、$X$ を $P$ で並べ替えた際に許可集合も $P$ で同時に移す）なら

$$
F(PX)=PF(X)
$$

> が成り立つ。各headで同じ条件が成立する[multi-head attention](#def-ml2-18-multihead)と、出力次元を $d$ に合わせた残差 $X+\operatorname{MHA}(X)$ も置換同変である。**位置番号に固定された位置情報**や**元の順序で固定された因果マスク**を加えた一般の写像については、この主張は成り立たない。
<!-- formal-statement-end -->

### 証明の見取り図

行を入れ替えると $Q,K,V$ の行も一緒に入れ替わる。得点行列は行と列の両方が置換される。softmaxは各行の列の順序を変えても同じ重みを並べ替えるだけなので、重み付き和の出力行も同じ置換に従う。

<!-- proof-start -->
### 証明

$X'=PX$ とする。線形射影を左から適用する行列積の結合則によって

$$
Q'=(PX)W_Q=PQ,\quad K'=PK,\quad V'=PV.
$$

したがって置換後の得点行列は

$$
S'=\frac{Q'(K')^{\mathsf T}}{\sqrt{k}}
=\frac{(PQ)(PK)^{\mathsf T}}{\sqrt{k}}
=P\frac{QK^{\mathsf T}}{\sqrt{k}}P^{\mathsf T}
=PSP^{\mathsf T}.
$$

$P$ に対応する並べ替えを行の添字写像 $\pi$ で表し、$(Pz)_i=z_{\pi(i)}$ と書く。このとき $S'_{ij}=S_{\pi(i),\pi(j)}$。行 $i$ にsoftmaxを適用すると、列の和で $\ell$ を $\pi(\ell)$ に置き換えるだけで分母は変わらないため

$$
\begin{aligned}
A'_{ij}
&=\frac{\exp(S_{\pi(i),\pi(j)})}{\sum_{\ell=1}^n\exp(S_{\pi(i),\pi(\ell)})}\\
&=A_{\pi(i),\pi(j)},\qquad A'=PAP^{\mathsf T}.
\end{aligned}
$$

最大値を引く表示でも、置換で各行の最大値は変わらないので同じ結論である。許可集合を同時に運ぶ場合は和の範囲も $\pi(J'_i)=J_{\pi(i)}$ と対応させればよい。最後に

$$
F(PX)=A'V'=(PAP^{\mathsf T})(PV)
=PA(P^{\mathsf T}P)V=PAV=PF(X).
$$

各headは同じ性質を持つので横連結した出力も $P$ の行置換に従い、右からの $W_O$ 乗算は行置換と可換である。残差も $PX+P\operatorname{MHA}(X)=P(X+\operatorname{MHA}(X))$。$\square$
<!-- proof-end -->

反例を二つ比べる。まず位置情報を固定した場合、第5節の $X=(0,0)^{\mathsf T}$ と $E=(0,1)^{\mathsf T}$ を使い、$P$ を二行の交換とする。$PX=X$ だから $F(PX+E)=F(X+E)$ であるが、出力 $(1/2,e/(1+e))^{\mathsf T}$ の二成分は異なり、$PF(X+E)\ne F(X+E)$ となる。原因はトークン行だけを置換して位置ベクトルを運ばなかったことにある。

次に位置情報がなくても因果マスクを元の行番号で固定すると、$Q=K=0$、$V=(1,3)^{\mathsf T}$ で $Y=(1,2)^{\mathsf T}$。行を交換した $V'=(3,1)^{\mathsf T}$ に同じ因果マスクを掛けると $Y'=(3,2)^{\mathsf T}$。しかし $PY=(2,1)^{\mathsf T}$ なので一致しない。定理で必要だった「許可集合も一緒に移す」という仮定を落としたため、softmaxの行ごとの参照列を対応付けられなくなった。

## 6. 小型Attention計算ラボ

<a href="../../../../../../pages/simulation/ml2-18.html" target="_blank" rel="noopener">ML2-18：Attention行列と位置入替を計算するラボ</a>

3トークン・2特徴の実数入力に対して2個の1次元headを計算する。各headでquery/key/value射影係数を動かし、全参照・因果・末尾パディングマスクを選ぶ。位置ベクトルの強度とトークン入替を変えると、得点、注意重み、head出力、連結・残差出力が実際に再計算される。headの幅が1なのでscale係数は $\sqrt1=1$ だが、一般の式では幅 $k$ を掛け忘れてはいけない。

最初は位置強度0・全参照で、元の入力を交換した場合に出力も対応して交換されることを数値で確認する。次に位置強度を非ゼロにするか因果マスクを選び、対応が崩れる例を探す。パディングでは末尾のkeyを見なくなり、末尾queryの値は損失へ使わない。実装は正規化和、有限数・入力範囲、許可先の空集合を検査し、出力はブラウザ内で計算する。

ブラウザの計算は厳密証明の代わりではない。丸め誤差のためゼロの期待差が $10^{-15}$ 程度になる場合がある。実際に置換したのは入力トークンのみで、位置ベクトルと因果マスクは位置番号に固定している点を忘れない。

## 7. 演習

### ML2-18-A01 行列の寸法と出力

- Level: A

$n=3,d=4,k=2,v=3$ の一headで $X\in\mathbb R^{3\times4}$ とする。$W_Q,W_K,W_V,Q,K,V,S,A,Y$ の寸法と、$Y$ の第一行が何本のvalueを足すかを答えよ。全列参照とする。

<!-- solution-start -->
**詳細解答**。[attentionの定義](#def-ml2-18-attention)で射影後の列数を見れば

$$
\begin{aligned}
W_Q,W_K&:4\times2,&W_V&:4\times3,\\
Q,K&:3\times2,&V&:3\times3,\\
QK^{\mathsf T}&:(3\times2)(2\times3)=3\times3,&S,A&:3\times3,\\
Y&:(3\times3)(3\times3)=3\times3.
\end{aligned}
$$

$y_1=A_{11}v_1+A_{12}v_2+A_{13}v_3$ で、三本の3次元ベクトルを行和1の重みで合成する。$k=2$ は内積の次元であり、valueの次元 $v=3$ と混同しない。
<!-- solution-end -->

### ML2-18-A02 二トークンの重みと値

- Level: A

$n=2,k=v=1$、$Q=(0,1)^{\mathsf T}$、$K=(0,1)^{\mathsf T}$、$V=(2,4)^{\mathsf T}$、全列参照とする。$S,A,Y$ を求め、各行和を確認せよ。

<!-- solution-start -->
**詳細解答**。[得点と正規化](#def-ml2-18-attention)へ $k=1$ を代入する。$S_{ij}=q_i k_j$ なので

$$
S=\begin{pmatrix}0&0\\0&1\end{pmatrix},\qquad
A=\begin{pmatrix}1/2&1/2\\1/(1+e)&e/(1+e)\end{pmatrix}.
$$

行和はそれぞれ $1/2+1/2=1$、$(1+e)/(1+e)=1$。値の加重和は

$$
Y=\begin{pmatrix}
(2+4)/2\\(2+4e)/(1+e)
\end{pmatrix}
=\begin{pmatrix}3\\(2+4e)/(1+e)\end{pmatrix}.
$$

重みはquery/keyで決まり、値を $(0,1)$ から $(2,4)$ へ変えても $A$ は変わらない。
<!-- solution-end -->

### ML2-18-A03 因果マスクでの平均

- Level: A

$n=3,k=v=1$、query/keyの全成分が0、$V=(2,4,8)^{\mathsf T}$ とする。$J_i=\{1,\ldots,i\}$ で $A,Y$ を計算せよ。

<!-- solution-start -->
**詳細解答**。すべての得点が0で、許可集合内の指数値はすべて1。[マスク付きattention](#def-ml2-18-mask)の分母は各行で $1,2,3$ となる。

$$
A=\begin{pmatrix}
1&0&0\\
1/2&1/2&0\\
1/3&1/3&1/3
\end{pmatrix}.
$$

$Y=AV$ の三行は $2$、$(2+4)/2=3$、$(2+4+8)/3=14/3$ である。第一行に未来値4や8が混じらないことは[因果性命題](#prop-ml2-18-causal)と一致する。
<!-- solution-end -->

### ML2-18-A04 固定位置情報の直接確認

- Level: A

$n=2,d=1$、$X=(0,0)^{\mathsf T}$、位置行列 $E=(0,1)^{\mathsf T}$、全列参照で三射影をすべて1とする。位置加算後の $Z$ とattention出力を求めよ。$X$ の二行を交換したとき、出力が自動的に二行交換されるか。

<!-- solution-start -->
**詳細解答**。[加算型位置情報](#def-ml2-18-position)に従って $Z=X+E=(0,1)^{\mathsf T}$。第一節の定義で $Q=K=V=Z$ なので

$$
A=\begin{pmatrix}1/2&1/2\\1/(1+e)&e/(1+e)\end{pmatrix},\qquad
Y=\begin{pmatrix}1/2\\e/(1+e)\end{pmatrix}.
$$

$X$ 自体は交換しても不変だが、$E$ は位置に固定なので計算した $Y$ は変わらない。一方 $PY$ は二つの異なる値を入れ替える。したがって出力は自動的には置換されず、[置換同変性定理](#thm-ml2-18-equivariance)の「位置情報なし」の仮定が必要と分かる。
<!-- solution-end -->

### ML2-18-B01 softmaxの逆伝播と不変方向

- Level: B

1行に二つの許可得点 $s=(0,0)$、値 $v_1=1,v_2=3$ を与え、$a=\operatorname{softmax}(s)$、$y=a_1v_1+a_2v_2$、$L=y$ とする。$\partial L/\partial s_1,\partial L/\partial s_2$ を分母の微分から求め、両者の和を確認せよ。

<!-- solution-start -->
**詳細解答**。$a_1=e^{s_1}/(e^{s_1}+e^{s_2})$ を商微分すると

$$
\frac{\partial a_1}{\partial s_1}
=\frac{e^{s_1}(e^{s_1}+e^{s_2})-e^{2s_1}}{(e^{s_1}+e^{s_2})^2}
=a_1(1-a_1).
$$

$a_2=1-a_1$ なので $\partial a_2/\partial s_1=-a_1a_2$。$s=(0,0)$ で $a_1=a_2=1/2$、$y=2$。したがって

$$
\frac{\partial L}{\partial s_1}
=v_1\frac14+v_2\left(-\frac14\right)=-\frac12,\quad
\frac{\partial L}{\partial s_2}
=v_1\left(-\frac14\right)+v_2\frac14=\frac12.
$$

これは[勾配定理](#thm-ml2-18-gradient)の $a_j(v_j-y)$ とも一致する。和は0で、両得点に同じ微小定数を足す方向には出力が変化しない。
<!-- solution-end -->

### ML2-18-B02 並び替えと因果マスクの反例

- Level: B

$n=2,k=v=1$ で $Q=K=0$、$V=(1,3)^{\mathsf T}$ とし、因果マスク $J_1=\{1\},J_2=\{1,2\}$ を固定する。元の出力 $Y$ と、入力二行を交換した場合の出力 $Y'$ を求め、$Y'\ne PY$ を示せ。全列参照ではどうなるか。

<!-- solution-start -->
**詳細解答**。[マスク定義](#def-ml2-18-mask)では得点0なので許可列が均等重みである。元の入力では

$$
A=\begin{pmatrix}1&0\\1/2&1/2\end{pmatrix},\quad
Y=\begin{pmatrix}1\\(1+3)/2\end{pmatrix}
=\begin{pmatrix}1\\2\end{pmatrix}.
$$

交換後もマスクは同じなので $V'=(3,1)^{\mathsf T}$ に $A$ を掛け、$Y'=(3,2)^{\mathsf T}$。しかし $PY=(2,1)^{\mathsf T}$ なので異なる。全列参照では両行の重みが $(1/2,1/2)$ であり、元・交換後とも $(2,2)^{\mathsf T}$ となって $F(PX)=PF(X)$ が成立する。違いはマスクをトークンに連れて移動せず、**元の位置番号に固定**した点である。
<!-- solution-end -->

### ML2-18-B03 二headの射影・連結・残差

- Level: B

$X=\begin{pmatrix}2&0\\0&2\end{pmatrix}$、headを2個、各headで $k=v=1$、全列参照とする。query/key射影は全て零、value射影は第一headが $(1,0)^{\mathsf T}$、第二headが $(0,1)^{\mathsf T}$。$W_O=I_2$ のとき各headの出力、連結、残差後の出力と全次元を求めよ。

<!-- solution-start -->
**詳細解答**。両headとも $Q,K$ は $2\times1$ の零列で、得点は零行列、注意重みの各行は $(1/2,1/2)$。第一headのvalueは $(2,0)^{\mathsf T}$ なので出力は $(1,1)^{\mathsf T}$、第二headのvalueは $(0,2)^{\mathsf T}$ なので出力は同じく $(1,1)^{\mathsf T}$。

$$
Y^{(1)}=\begin{pmatrix}1\\1\end{pmatrix},\quad
Y^{(2)}=\begin{pmatrix}1\\1\end{pmatrix},\quad
[Y^{(1)}\ Y^{(2)}]=\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

各出力が $2\times1$、連結は $2\times2$、$W_O$ は $2\times2$ である。[multi-head定義](#def-ml2-18-multihead)の最後の行列積と $X$ の和から

$$
Z=X+[Y^{(1)}\ Y^{(2)}]W_O
=\begin{pmatrix}3&1\\1&3\end{pmatrix}.
$$

残差なしでは二行の表現は等しいが、残差で元の違いが保持される。
<!-- solution-end -->

### ML2-18-B04 空マスクと安定な指数化

- Level: B

ある有効query行の得点を $(1000,1001,-900)$、許可集合を $J=\{1,2\}$ とする。重みを数値桁あふれしない式にし、禁止列の重みと行和を求めよ。続いて $J=\varnothing$ に変えたとき0ベクトルを答えとしてはいけない理由を述べよ。

<!-- solution-start -->
**詳細解答**。許可列の最大値 $m=1001$ を引くと指数値は $e^{-1}$ と $1$ になり、[マスク定義](#def-ml2-18-mask)で

$$
a_1=\frac{e^{-1}}{1+e^{-1}}=\frac1{1+e},\quad
a_2=\frac{1}{1+e^{-1}}=\frac{e}{1+e},\quad
a_3=0.
$$

許可二列の行和は $(1+e)/(1+e)=1$、禁止列は得点 $-900$ の大小に関係なく0である。$J=\varnothing$ では分母が空和0、最大値も定義できない。したがってsoftmaxが定義されず、全0は行和1の条件を満たさない別の値である。無効queryであればその行を出力・損失から除外する処理を明示する。
<!-- solution-end -->

### ML2-18-C01 因果出力・勾配・順序

- Level: C

二トークン・一次元で $X=(0,1)^{\mathsf T}$、$V=X$、$K=X$、$Q=wX$（$w$ は実数の学習係数）を考える。$k=1$、因果マスク $J_1=\{1\},J_2=\{1,2\}$、位置情報なし、出力 $Y=A V$、残差出力 $Z=X+Y$ とする。

1. $w=1$ のときの $A,Y,Z$ を計算せよ。
2. 第2行のスカラー損失 $L=Z_2$ に対する $dL/dw$ をsoftmaxの微分で求めよ。
3. $w=1$ でトークンを交換し、マスクだけを元の位置に固定した出力 $Z'$ と $PZ$ を比較し、どの仮定が崩れたか説明せよ。

<!-- solution-start -->
**詳細解答**。

**(1)** $Q=(0,1)^{\mathsf T}$、$K=V=(0,1)^{\mathsf T}$ だから得点は

$$
S=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
$$

第一行は列1のみ許可、第二行は両列許可される。[マスク付きattention](#def-ml2-18-mask)を行ごとに計算すれば

$$
A=\begin{pmatrix}1&0\\1/(1+e)&e/(1+e)\end{pmatrix},\quad
Y=\begin{pmatrix}0\\e/(1+e)\end{pmatrix},\quad
Z=\begin{pmatrix}0\\1+e/(1+e)\end{pmatrix}.
$$

**(2)** 第2行の得点は $(0,w)$。従って $a_{22}=e^w/(1+e^w)$、$Y_2=a_{21}\cdot0+a_{22}\cdot1=a_{22}$。$Z_2=1+Y_2$ の定数1は微分に寄与しない。[softmaxの勾配](#thm-ml2-18-gradient)で $\partial Y_2/\partial S_{22}=a_{22}(1-Y_2)=a_{22}(1-a_{22})$。$S_{22}=q_2k_2=w\cdot1=w$ なので連鎖律で

$$
\frac{dL}{dw}
=a_{22}(1-a_{22})\frac{dS_{22}}{dw}
=\frac{e^w}{(1+e^w)^2}.
$$

$w=1$ の値は $e/(1+e)^2>0$。直接商微分 $\{e^w(1+e^w)-e^{2w}\}/(1+e^w)^2$ とも一致する。第一行は禁止先へ依存せず $w$ に関する勾配を加えない。

**(3)** 行交換後は $X'=(1,0)^{\mathsf T}$、$Q'=K'=V'=X'$。第一行は自身だけ見るので $Y'_1=1$、第二行は query が0で両列を等重みで見て $Y'_2=1/2$。ゆえに

$$
Z'=\begin{pmatrix}2\\1/2\end{pmatrix},\qquad
PZ=\begin{pmatrix}1+e/(1+e)\\0\end{pmatrix},
\qquad Z'\ne PZ.
$$

[置換同変性定理](#thm-ml2-18-equivariance)で要求した「許可集合も同じように並べ替える」という条件が成立しない。因果マスクは行番号に固定されたままで、どのトークンから何を見られるかが交換後に変わった。これが破れの機構である。
<!-- solution-end -->

## 8. まとめ

Attentionでは、query/keyの内積から参照比率を作り、valueを行ごとに重み付き平均する。尺度 $\sqrt{k}$、許可集合、安定なsoftmax、出力の次元が一致して初めて計算が定義される。multi-headは別々の参照比率を連結し、出力射影で残差に足せる幅へ戻す。位置情報は並びを区別する力を与えるが、無条件の置換同変性は失わせる。因果マスクは未来参照を遮る一方で、位置順序への依存を導入する。モデルを設計するときは「順序に依存しない集約」か「左から右への予測」かを先に決め、データ流と許可集合の仮定を検査する。
