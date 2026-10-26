# ML2-17 系列模型・再帰ネットワーク

[多層網](../ML2-13/index.md#def-ml2-13-mlp)は一つの入力を複数層で変換する。[畳み込み層](../ML2-16/index.md#def-ml2-16-multichannel)は位置をずらしても同じ重みを使う。一方、文章の単語列、日々の観測、機器の時系列では、**これまでに何が来たか**によって次の出力が変わる。系列を固定長の一つのベクトルとして扱うこともできるが、長さの違う系列で「過去の情報を持ち回る」仕組みをどう作るかが残る。

そこで各時刻で同じ更新規則を用い、過去の要約を次の時刻へ渡す**再帰ネットワーク**（recurrent neural network, RNN）を作る。前講までの[逆伝播](../ML2-14/index.md#thm-ml2-14-backprop)を時間方向へ展開すると、重みが繰り返し使われるために勾配が足し合わされ、さらに時刻をまたぐJacobianが積になる。この二つを混同しないことが本講の中心である。

## 1. 過去を一つの状態として持ち回る

時刻は $t=1,\ldots,T$（$T\ge1$）。入力 $x_t\in\mathbb R^d$ は時刻 $t$ で観測できる特徴、**内部状態ベクトル** $h_t\in\mathbb R^m$ は時刻 $t$ までの入力を計算で要約したベクトル、出力 $o_t\in\mathbb R^q$ は予測前の得点とする。$h_0\in\mathbb R^m$ は系列の開始前に固定した初期状態である。今回は $d,m,q$ を正整数とし、有限長系列に限る。

各時刻で「現在の入力」と「一つ前の状態」を足し合わせてから活性化関数をかける。活性化関数 $\phi:\mathbb R\to\mathbb R$ は成分ごとに作用し、導関数を用いる箇所では該当点で微分可能とする（$\tanh$ や恒等関数は例となる）。状態を更新する係数は時刻で変えず、一組の重みを全時刻で再使用する。

<a id="def-ml2-17-simple-rnn"></a>

<!-- formal-statement-start -->
> **定義（単純再帰ネットワークと時間方向の重み共有）**
> 正整数 $d,m,q,T$、入力列 $x_1,\ldots,x_T\in\mathbb R^d$、固定初期状態 $h_0\in\mathbb R^m$ を取る。重み $W\in\mathbb R^{m\times m}$、$U\in\mathbb R^{m\times d}$、$V\in\mathbb R^{q\times m}$ とバイアス $b\in\mathbb R^m$、$c\in\mathbb R^q$、成分別の活性化 $\phi$ により

$$
\begin{aligned}
a_t&=Wh_{t-1}+Ux_t+b,\\
h_t&=\phi(a_t),\\
o_t&=Vh_t+c,\qquad t=1,\ldots,T
\end{aligned}
$$

> と定める写像を**単純再帰ネットワーク**という。すべての時刻で同じ $W,U,V,b,c$ を使う性質を**時間方向の重み共有**という。各時刻の予測値は用途に応じて $o_t$ をそのまま使うか、確率に変換するなどして得る。
<!-- formal-statement-end -->

行列が何を計算するかは、前活性の第 $i$ 成分を展開すると分かる。ここで $1\le i\le m$ である。

$$
a_{t,i}=\sum_{j=1}^{m}W_{ij}h_{t-1,j}
       +\sum_{r=1}^{d}U_{ir}x_{t,r}+b_i.
$$

第1の和は前状態の $m$ 成分、第2の和は現在の入力の $d$ 成分から、いずれも次状態の第 $i$ 成分への寄与を作る。したがって $W$ は $m\times m$、$U$ は $m\times d$ でなければならない。同様に $o_{t,k}=\sum_{i=1}^{m}V_{ki}h_{t,i}+c_k$（$1\le k\le q$）だから、$V$ は $q\times m$ である。この次元の対応と、時刻を変えても係数が同じことを次の例で確認する。

<!-- definition-example-start: def-ml2-17-simple-rnn -->
**定義の確認**。 $d=m=q=1$、$T=2$、活性化は恒等写像、$W=2,U=1,V=1,b=c=0$、$h_0=0$、$(x_1,x_2)=(1,3)$ とする。すべて1行1列の行列（実数）なので積の次元は一致し、時刻を進めると

$$
\begin{aligned}
a_1&=2\cdot0+1=1,&h_1&=1,&o_1&=1,\\
a_2&=2\cdot1+3=5,&h_2&=5,&o_2&=5.
\end{aligned}
$$

同じ係数 $W=2$ を一時刻目・二時刻目のどちらでも使い、第二時刻の値は第一時刻の状態を通じて $x_1$ にも依存する。対して二時刻目の入力だけを3から4へ変えれば $h_1$ は1のまま、$h_2$ は6になる。これで初期状態・入力・状態・出力・共有係数の全条件を確認できた。
<!-- definition-example-end -->

任意の $t$ で $h_t$ は $x_1,\ldots,x_t$ のみに依存し、将来 $x_{t+1}$ はまだ使わない。この**因果性**は更新式へ順次代入することで帰納的に確かめられる。ただし $h_t$ が過去を完全に復元する保証はない。たとえば $W=U=0$ なら、どんな系列を与えても同じ状態 $\phi(b)$ になり、情報を捨てる。

時刻ごとに $m\times m$ の独立した行列を置く方式と異なり、単純RNNのパラメータ総数は

$$
m^2+md+m+qm+q
$$

であり、系列長 $T$ には依存しない。演算の回数や保存する中間状態の個数が $T$ とともに増えることと、学習パラメータ数が増えることは別である。

## 2. 同じ重みを使う計算を時間方向へ開く

[計算グラフ](../ML2-14/index.md#def-ml2-14-computational-graph)では、値を求める演算ごとに節点を設け、依存を有向の辺でつなぐ。再帰式には「戻る」矢印があるように見えるが、有限長 $T$ の場合は時刻 $0,1,\ldots,T$ に節点を複製すれば、前時刻から次時刻へしか進まない有限の計算グラフになる。これを**時間展開**と呼ぶ。$W$ の数値は複数の演算節点へ渡すが、学習する変数としては一個の行列のままである。

損失を各時刻で測る場合と終端でだけ測る場合を統一する。微分可能な実数値関数 $\ell_t:\mathbb R^q\to\mathbb R$ を時刻 $t$ の損失とし、$\ell_t\equiv0$ とすればその時刻の監督を省ける。教師ラベルがある場合は、例えば $\ell_t(o)=\|o-y_t\|^2/2$ と定める。

<a id="def-ml2-17-unrolling"></a>

<!-- formal-statement-start -->
> **定義（時間展開と系列損失）**
> [単純再帰ネットワーク](#def-ml2-17-simple-rnn)の長さ $T\ge1$ の入力列を考える。時刻 $t$ の演算 $a_t=Wh_{t-1}+Ux_t+b$、$h_t=\phi(a_t)$、$o_t=Vh_t+c$ を $t=1,\ldots,T$ へ並べた有限計算グラフを**時間展開グラフ**という。各 $\ell_t:\mathbb R^q\to\mathbb R$ が微分可能なら、系列全体の損失を

$$
L(W,U,V,b,c)=\sum_{t=1}^{T}\ell_t(o_t)
$$

> と定める。$x_t,h_0$ と各 $\ell_t$ は固定して勾配を考える。特に $\ell_1=\cdots=\ell_{T-1}\equiv0$ なら**終端損失**である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-17-unrolling -->
**定義の確認**。 前節の二時刻・一状態の網で $\ell_1(o)=o^2/2$、$\ell_2(o)=(o-4)^2/2$ とする。$o_1=1,o_2=5$ だったから $\ell_1=1/2$、$\ell_2=1/2$、合計 $L=1$ である。$\ell_1\equiv0$ に替えれば終端損失は $1/2$ だけになる。いずれも有限個の微分可能な関数の合成であり、同じ $W=2$ を時間展開した二つの節点へ入力する。
<!-- definition-example-end -->

可変長の系列を同じ配列へ詰める際は、後ろにダミー時刻を追加することがある。系列 $i$ の有効長 $T_i$ と最大長 $T_{\max}$ について、マスク $M_{i,t}=1$（$t\le T_i$）、それ以外を0とし、$\sum_{t=1}^{T_{\max}}M_{i,t}\ell_{i,t}$ とすれば、**損失から**ダミー時刻を除外できる。一方、ダミー時刻を本当の状態遷移へ混ぜると最終状態は変わりうる。終端状態を使うときは $h_{T_i}$ を取り出すか、有効長以降の状態更新を停止する必要がある。損失マスクだけでは状態の意味までは保証しない。

## 3. 時間方向の逆伝播を添字から導く

系列全体の勾配を求めたい。各時刻の状態は直接その時刻の損失に寄与する一方、将来の状態を経由して将来の損失にも寄与する。したがって単に各時刻の $\ell_t$ だけを微分するのは不十分である。

以下では $\phi$ が計算された各 $a_t$ の成分で微分可能と仮定する。$h_{t,i}=\phi(a_{t,i})$ は $a_{t,j}$（$j\ne i$）に依存しないため、Jacobianの行を出力成分、列を入力成分とする[既習の約束](../ML2-14/index.md#thm-ml2-14-layer-jacobian)では

$$
\frac{\partial h_{t,i}}{\partial a_{t,j}}
=\begin{cases}\phi'(a_{t,i})&i=j,\\0&i\ne j,\end{cases}
\qquad
D_t=\frac{\partial h_t}{\partial a_t}
=\operatorname{diag}(\phi'(a_{t,1}),\ldots,\phi'(a_{t,m}))
\in\mathbb R^{m\times m}.
$$

$\eta_t=\nabla_{o_t}\ell_t(o_t)\in\mathbb R^q$ は出力で測った局所勾配、$\delta_t=\nabla_{a_t}L\in\mathbb R^m$ は前活性で測った全損失の勾配とする。**随伴量**とは、このように後続の全経路から流れ込む損失勾配を一つの中間変数に集約したものを指し、[逆モードの随伴量](../ML2-14/index.md#def-ml2-14-adjoint)として既習である。

<a id="thm-ml2-17-bptt"></a>

<!-- formal-statement-start -->
> **定理（再帰ネットワークの時間方向逆伝播）**
> 正整数 $d,m,q,T$ を固定し、[単純再帰ネットワーク](#def-ml2-17-simple-rnn)と[系列損失](#def-ml2-17-unrolling)を考える。$h_0,x_1,\ldots,x_T$ は固定、$\phi$ は評価点で成分ごとに微分可能、$\ell_t$ も各 $o_t$ で微分可能とする。各時刻の対角行列を

$$
D_t=\operatorname{diag}\bigl(\phi'(a_{t,1}),\ldots,\phi'(a_{t,m})\bigr)
$$

> と定める。$\eta_t=\nabla_{o_t}\ell_t(o_t)$、$\delta_{T+1}=0\in\mathbb R^m$ と置くと、$t=T,T-1,\ldots,1$ の逆順に

$$
\delta_t=D_t\bigl(V^{\mathsf T}\eta_t+W^{\mathsf T}\delta_{t+1}\bigr)
$$

> が成立する。共有パラメータの全損失勾配は

$$
\begin{aligned}
\nabla_W L&=\sum_{t=1}^T\delta_t h_{t-1}^{\mathsf T},&
\nabla_U L&=\sum_{t=1}^T\delta_t x_t^{\mathsf T},\\
\nabla_b L&=\sum_{t=1}^T\delta_t,&
\nabla_V L&=\sum_{t=1}^T\eta_t h_t^{\mathsf T},&
\nabla_c L&=\sum_{t=1}^T\eta_t.
\end{aligned}
$$

> また各入力に関する勾配は $\nabla_{x_t}L=U^{\mathsf T}\delta_t$ であり、固定初期状態を形式的に変数と見た感度は $\nabla_{h_0}L=W^{\mathsf T}\delta_1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[逆モードの連鎖律と分岐和](../ML2-14/index.md#thm-ml2-14-reverse-chain)を時刻 $t$ の状態に適用する。$h_t$ の直後には出力 $o_t$ と次の前活性 $a_{t+1}$ という二本の経路がある。前活性の勾配 $\delta_t$ を確定したら、$a_t$ に入る線形項 $Wh_{t-1}$ と $Ux_t$ の成分微分を足し上げる。

<!-- proof-start -->
### 証明

$t\le T$ で $h_t$ に関する全損失勾配を $\lambda_t=\nabla_{h_t}L$ と書く。これは計算グラフの中間節点 $h_t$ を一時的に独立に動かし、後続節点だけを再計算したときの勾配である。$h_t$ から直接 $o_t=Vh_t+c$ へ進む経路の寄与は $V^{\mathsf T}\eta_t$。$t<T$ で $a_{t+1}=Wh_t+Ux_{t+1}+b$ へ進む経路の寄与は $W^{\mathsf T}\delta_{t+1}$ である。最終時刻には後者がないので $\delta_{T+1}=0$ と約束すれば両者を一式で表せる。

$$
\lambda_t=V^{\mathsf T}\eta_t+W^{\mathsf T}\delta_{t+1}.
$$

$h_t=\phi(a_t)$ のJacobianは成分別の導関数から $D_t$ であり、$D_t^{\mathsf T}=D_t$。よって[逆モードの連鎖律](../ML2-14/index.md#thm-ml2-14-reverse-chain)で $\delta_t=D_t^{\mathsf T}\lambda_t=D_t\lambda_t$。これが再帰式である。

時刻 $t$ の演算節点で、入力 $h_{t-1}$ を固定した**局所偏微分**を考える。和の添字を $j$ と衝突させないよう $r$、$u$ として

$$
a_{t,k}=\sum_{r=1}^{m}W_{kr}h_{t-1,r}
       +\sum_{u=1}^{d}U_{ku}x_{t,u}+b_k,
\qquad
\left.\frac{\partial a_{t,k}}{\partial W_{ij}}\right|_{h_{t-1}\,\mathrm{fixed}}
=\mathbf 1_{\{k=i\}}h_{t-1,j}.
$$

過去の状態 $h_{t-1}$ 自身が $W$ に依存する経路は、すでに $\delta_{t-1}$ まで戻す逆伝播が数えている。ここでその依存をもう一度微分すると二重計上になる。したがってこの時刻の寄与は

$$
\sum_{k=1}^m\delta_{t,k}\frac{\partial a_{t,k}}{\partial W_{ij}}
=\delta_{t,i}h_{t-1,j}.
$$

同一の $W_{ij}$ がすべての時刻で使われるため、総和 $\partial L/\partial W_{ij}=\sum_t\delta_{t,i}h_{t-1,j}$ となり、行列として $\nabla_WL=\sum_t\delta_t h_{t-1}^{\mathsf T}$。同じ成分微分を $U_{ir}$、$b_i$ に行うと、それぞれ $\sum_t\delta_{t,i}x_{t,r}$、$\sum_t\delta_{t,i}$ を得る。

出力側では $\partial o_{t,k}/\partial V_{ij}=1_{k=i}h_{t,j}$、$\partial o_{t,k}/\partial c_i=1_{k=i}$ より $\nabla_VL=\sum_t\eta_th_t^{\mathsf T}$、$\nabla_cL=\sum_t\eta_t$。最後に $a_t$ の入力 $x_t$ へのJacobianは $U$、$h_0$ への最初のJacobianは $W$ なので、転置を介して $U^{\mathsf T}\delta_t$、$W^{\mathsf T}\delta_1$ が得られる。$W$ の勾配は $m\times m$、$U$ は $m\times d$、$V$ は $q\times m$ で、すべて元のパラメータ形状と一致する。$\square$
<!-- proof-end -->

### 二時刻で全経路を検算する

第1節の一状態モデルで、出力は $o_t=h_t$、終端損失だけを $L=h_2^2/2$ とする（つまり $\ell_1=0,\ell_2(o)=o^2/2$）。$h_0=0$、$(x_1,x_2)=(1,3)$、$W=2,U=V=1,b=c=0$、恒等活性化で $h_1=1,h_2=5$ だから

$$
\begin{aligned}
\eta_1&=0,&\eta_2&=5,\\
\delta_2&=1(5+2\cdot0)=5,&
\delta_1&=1(0+2\cdot5)=10.
\end{aligned}
$$

共有重みの各時刻からの寄与を足すと

$$
\begin{aligned}
\frac{\partial L}{\partial W}&=\delta_1h_0+\delta_2h_1=10\cdot0+5\cdot1=5,\\
\frac{\partial L}{\partial U}&=\delta_1x_1+\delta_2x_2=10\cdot1+5\cdot3=25,\\
\frac{\partial L}{\partial V}&=\eta_1h_1+\eta_2h_2=0+5\cdot5=25,\\
\frac{\partial L}{\partial b}&=10+5=15,\qquad
\frac{\partial L}{\partial c}=0+5=5.
\end{aligned}
$$

別法として、$h_0=b=0$ を代入してから $W,U$ への依存を直接展開すると

$$
h_2=W(Ux_1)+Ux_2,\qquad
\frac{\partial h_2}{\partial W}=Ux_1=1,\qquad
\frac{\partial h_2}{\partial U}=Wx_1+x_2=5.
$$

終端損失の微分 $\partial L/\partial h_2=5$ をそれぞれに掛けると5と25になり、二経路の加算と一致する。$b,c$ の微分は、値が0でも変数として動かすため消えない。

## 4. なぜ遠い過去の勾配が弱くなるのか

ある時刻の状態を少し動かしたとき、後の状態へどれだけ伝わるかを考える。ここでも時刻 $s$ の状態を独立に摂動し、その後の状態を計算し直す感度を指す。$a_t=Wh_{t-1}+Ux_t+b$ において $x_t$ とパラメータは固定だから、[層のJacobian積](../ML2-14/index.md#thm-ml2-14-layer-jacobian)を状態更新へ適用し、$\partial a_t/\partial h_{t-1}=W$、$\partial h_t/\partial a_t=D_t$ から $h_{t-1}$ に対するJacobianは $J_t=D_tW\in\mathbb R^{m\times m}$ である。これは「一時刻の変化の倍率」を表す線形写像で、複数時刻の倍率は**和ではなく積**になる。

ベクトルのEuclidノルム $\|v\|_2$ と、それが誘導する行列作用素ノルム $\|A\|_2=\sup_{\|v\|_2=1}\|Av\|_2$ を用いる。積に対して $\|AB\|_2\le\|A\|_2\|B\|_2$ が成立することは、$\|ABv\|_2\le\|A\|_2\|Bv\|_2$ を単位ベクトルについて上限化すれば分かる。

<a id="thm-ml2-17-jacobian-product"></a>

<!-- formal-statement-start -->
> **定理（状態間Jacobian積と勾配消失の十分条件）**
> 長さ $T\ge2$ の[単純再帰ネットワーク](#def-ml2-17-simple-rnn)で、各時刻の $\phi$ は評価点で微分可能、入力 $x_1,\ldots,x_T$ とパラメータを固定する。$J_t=D_tW$ とすると、$0\le s<t\le T$ について

$$
\frac{\partial h_t}{\partial h_s}=J_tJ_{t-1}\cdots J_{s+1}.
$$

> さらに対象区間の全 $k=s+1,\ldots,t$ に $\|J_k\|_2\le\rho<1$ が成り立てば、$\|\partial h_t/\partial h_s\|_2\le\rho^{t-s}$。終端の微分可能なスカラー損失 $L=\ell(h_T)$ が $\|\nabla_{h_T}\ell(h_T)\|_2\le C$ を満たすなら、その直接的な状態感度は

$$
\|\nabla_{h_s}L\|_2\le C\rho^{T-s}
$$

> となる。$C$ が系列長に対し一定なら、$T-s\to\infty$ で右辺は0へ向かう。一方、単に $\|J_k\|_2>1$ の時刻があることだけでは勾配爆発は結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

[層のJacobian積](../ML2-14/index.md#thm-ml2-14-layer-jacobian)を、層の代わりに時刻で使う。時間距離が増えると積の因子が増え、各因子の作用素ノルムが一定値1未満なら指数的に上から抑えられる。

<!-- proof-start -->
### 証明

$s+1$ 番目では $\partial h_{s+1}/\partial h_s=J_{s+1}$。次に $h_{s+2}=\phi(Wh_{s+1}+Ux_{s+2}+b)$ に連鎖律を使うと $\partial h_{s+2}/\partial h_s=J_{s+2}J_{s+1}$。同じ操作を $t$ まで繰り返せば、右から古い時刻、左から新しい時刻の順に積が並ぶ。

積のノルムの性質から

$$
\left\|\frac{\partial h_t}{\partial h_s}\right\|_2
\le\prod_{k=s+1}^{t}\|J_k\|_2\le\rho^{t-s}.
$$

終端損失だけなら連鎖律で

$$
\nabla_{h_s}L=
\left(\frac{\partial h_T}{\partial h_s}\right)^{\mathsf T}
\nabla_{h_T}\ell(h_T).
$$

転置の作用素ノルムは元と等しいので、右辺のノルムは $\rho^{T-s}C$ 以下になる。$0\le\rho<1$ の場合、距離が大きくなるほど上界は0に収束する。最後の注意については、例えば $J_1=2I$、$J_2=0$ なら $\|J_1\|_2>1$ でも $J_2J_1=0$ であり、増幅は生じない。$\square$
<!-- proof-end -->

例えば $\phi=\tanh$ では $\phi'(z)=1-\tanh^2 z\in(0,1]$ だから $\|D_t\|_2\le1$。$\|W\|_2<1$ なら $\|J_t\|_2\le\|W\|_2<1$ となり、定理の十分条件を満たす。ただし $\|W\|_2>1$ でも、活性化が飽和した時刻では $\|D_t\|_2$ が小さくなりうる。勾配が消えることは**更新済みの重みが必ずゼロになること**でも、**学習が絶対に不可能になること**でもない。遠い時刻からの信号の一部が弱まりうる、という微分に関する結論である。

一般に行列が非可換な場合、個々の固有値だけから有限長の積の増減を断定することもできない。逆に、上界を得ただけでは爆発が存在するとは証明できない。そこで全計算を閉じられるスカラー模型を見る。

<a id="prop-ml2-17-linear-gradient"></a>

<!-- formal-statement-start -->
> **命題（線形スカラー再帰の勾配消失・爆発）**
> 長さ $T\ge1$、$a\in\mathbb R$ とし、$h_0=0$、$h_t=ah_{t-1}+x_t$、$x_1=\cdots=x_{T-1}=0$、$x_T=1$ とする。終端損失を $L=h_T^2/2$ とすると、$h_T=1$ かつ、初期状態を変数として微分した感度は

$$
\frac{\partial L}{\partial h_0}=a^T.
$$

> 従って $|a|<1$ なら $T\to\infty$ で勾配は0へ、$|a|>1$ なら勾配の絶対値は無限大へ増える。$a=\pm1$ なら絶対値は常に1である。
<!-- formal-statement-end -->

### 証明の見取り図

終端入力を1、前の入力を0にしたため、$a$ の値に関係なく終端状態は1になる。従って「最終損失自身が大きいだけ」という要因を取り除いて、各時刻に掛かる導関数 $a$ の反復だけを比較できる。

<!-- proof-start -->
### 証明

まず $h_0=0$ と $x_1=\cdots=x_{T-1}=0$ から、帰納的に $h_t=0$（$t<T$）であり、$h_T=ah_{T-1}+1=1$。初期状態を一時的に $z$ に変えた一般解は

$$
h_t(z)=a^tz+\sum_{j=1}^{t}a^{t-j}x_j
$$

である。$t=1$ で式が成立し、次時刻には $a(a^tz+\sum_{j=1}^{t}a^{t-j}x_j)+x_{t+1}$ となるので帰納的に成立する。従って $\partial h_T/\partial z=a^T$。連鎖律により $\partial L/\partial z=h_T(z)a^T$ であり、$z=h_0=0$ を代入すると $a^T$。等比数列の絶対値 $|a|^T$ の極限を調べれば結論を得る。$\square$
<!-- proof-end -->

$T=6$ なら $a=1/2$ で感度は $1/64$、$a=2$ で64となる。どちらも実際に観測する終端値 $h_T=1$ と終端損失 $1/2$ は同じである。なおこの例で $h_0$ は固定の値0として順伝播し、**感度を調べるためにだけ**仮想的に動かした。$h_0$ を学習変数にする実装ならその勾配が更新に用いられるが、固定なら感度を計測するだけである。

## 5. 勾配計算を途中で打ち切ると何が変わるか

長い系列で全時刻の状態を保存して逆伝播すると、保存する数値の個数も時間方向の計算も増える。そこで実務では直近 $K$ 時刻だけを逆にたどり、それより古い状態を**固定値として扱う**打切り時間逆伝播（truncated backpropagation through time）を使うことがある。ただしこれは一般に真の勾配の厳密計算ではない。

損失が終端だけにある場合、全勾配は時刻 $1$ から $T$ までの共有係数への寄与の総和である。打切り長 $K$ は $1\le K\le T$ とし、時刻 $T-K$ の状態を定数とみなして $T-K+1,\ldots,T$ の部分だけを微分する方式を考える。

<a id="prop-ml2-17-truncation"></a>

<!-- formal-statement-start -->
> **命題（打切り時間逆伝播による勾配の欠落）**
> $T\ge1$、$a\in\mathbb R$、$h_0=1$、$h_t=ah_{t-1}$（$t=1,\ldots,T$）とし、終端のスカラー量 $F=h_T$ を考える。$1\le K\le T$ とする。全時刻を微分した導関数と、$h_{T-K}$ を固定して最後の $K$ 回の更新だけ微分した導関数は、それぞれ

$$
\frac{dF}{da}=Ta^{T-1},\qquad
\left.\frac{dF}{da}\right|_{\mathrm{trunc}(K)}=Ka^{T-1}
$$

> である（$a=0,T=1$ の場合も $a^0=1$ とする）。特に $a=1$、$K<T$ なら打切り勾配は $K$、真の導関数は $T$ であり、差は $T-K$ である。
<!-- formal-statement-end -->

### 証明の見取り図

真の出力は $a^T$ だが、打切りでは途中の状態 $a^{T-K}$ を数値として固定し、末尾 $K$ 回に含まれる $a^K$ だけを微分する。どの依存経路を捨てたかが式に現れる。

<!-- proof-start -->
### 証明

帰納的に $h_t=a^t$ だから $F(a)=a^T$。多項式の微分により $F'(a)=Ta^{T-1}$。一方、順伝播で計算済みの $h_{T-K}=a^{T-K}$ を、微分時には $H$ という固定数として扱うと、末尾の式は $\widetilde F(a)=a^KH$ となる。$\widetilde F'(a)=Ka^{K-1}H$ であり、勾配評価点に $H=a^{T-K}$ を代入すれば $Ka^{T-1}$。$a=0$ で $K<T$ などでは $a^0=1$ の約束の下、いずれも多項式として直接評価すれば同じ結論になる。$\square$
<!-- proof-end -->

この例の $F$ は損失ではなく微分する**終端出力**である。二乗損失 $L=F^2/2$ を用いれば、同じ評価点で真の勾配も打切り勾配もさらに $F=a^T$ を掛けることになる（$a=1$ なら値は同じ）。一般の非線形RNNでも、勾配を打ち切った位置より前にある共有パラメータの寄与が欠落する。打切りが有効なことはあるが、系列が長いほど必ず正確という保証はない。

## 6. 予測を学習するときの時刻のずれ

現在の状態から次の観測を予測する場合、学習時には本当の前時刻の値を次の入力へ渡せる。一方、未来の真値がまだない生成時には、前時刻に**自分で予測した値**を渡す必要がある。この違いを明記しないと、評価に未来の答えを混ぜてしまう。

簡単のため観測は $y_0,y_1,\ldots$ という実数列、予測は $\hat y_t\in\mathbb R$、状態は $h_t\in\mathbb R^m$ とし、$f(h,x)=\phi(Wh+Ux+b)$、$g(h)=Vh+c$（この場合 $d=q=1$）を用いる。時刻 $t$ の状態は入力 $x_t$ を取り込んだ後のものとする。

<a id="def-ml2-17-teacher-forcing"></a>

<!-- formal-statement-start -->
> **定義（教師強制と自律生成）**
> $f:\mathbb R^m\times\mathbb R\to\mathbb R^m$、$g:\mathbb R^m\to\mathbb R$、初期状態 $h_0\in\mathbb R^m$、初期観測 $y_0\in\mathbb R$ を固定する。実測列 $y_1,\ldots,y_T$ が利用できる**教師強制**では、$t=1,\ldots,T$ に対し

$$
x_t=y_{t-1},\qquad h_t=f(h_{t-1},x_t),\qquad\hat y_t=g(h_t)
$$

> として予測 $\hat y_t$ と真値 $y_t$ を比較する。一方、未来の真値が利用できない**自律生成**では $x_1=y_0$ とした後、$x_t=\hat y_{t-1}$（$t\ge2$）を使い、同じ $f,g$ で状態・予測を順次更新する。どちらも時刻 $t$ の予測に未来の $y_t,y_{t+1},\ldots$ を直接入力しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-17-teacher-forcing -->
**定義の確認**。一状態で恒等活性化し、重みとバイアスを $W=0,U=1,b=0,V=1/2,c=0$ とする。[単純再帰ネットワーク](#def-ml2-17-simple-rnn)の更新式へ代入すると

$$
f(h,x)=0\cdot h+1\cdot x+0=x,\qquad
g(h)=\tfrac12 h+0=\tfrac12h.
$$

前者は前状態を引き継がず現在の入力だけを次状態へ保存し、後者は更新後の状態を半分にする。初期状態を $h_0=0$、実測値を $(y_0,y_1)=(4,3)$ とする。

時刻1では両方式とも初期観測を取り込むので

$$
x_1=4,\qquad h_1=f(0,4)=4,\qquad \hat y_1=g(4)=2.
$$

時刻2の**教師強制**は直前の実測値を入力するから

$$
x_2=y_1=3,\qquad h_2=f(4,3)=3,\qquad
\hat y_2=g(3)=\tfrac32.
$$

一方、**自律生成**は直前の予測値を入力するから

$$
x_2=\hat y_1=2,\qquad h_2=f(4,2)=2,\qquad
\hat y_2=g(2)=1.
$$

どちらも時刻2の予測に真値 $y_2$ を入力していない。前時刻の真値を使うか自己予測を使うかで、二時刻目以降の状態は一般に一致しない。
<!-- definition-example-end -->

学習時に教師強制の予測誤差が小さくても、自律生成での長期予測誤差が小さいとは限らない。予測誤差が次の入力の誤差となり、状態遷移を通って増幅されうるからである。また、時刻 $t$ を予測する教師強制の入力へ $y_t$ 自体を入れると「予測対象をすでに観測した」ことになり、検証損失が実際の未来予測性能を示さない。[訓練・検証・テスト分割](../ML1-12/index.md#def-ml1-12-three-way-split)を守ることに加え、**時刻方向の可用情報**も守る必要がある。

勾配爆発への実務的な対策には、勾配のノルムを閾値で切る操作などがある。これは大きな更新を抑える算法上の変更であり、[定理のJacobian積](#thm-ml2-17-jacobian-product)自体が小さくなることを証明するものではない。長期依存を扱う門付きRNNや別方式との比較でも、最初に何を改善しようとしているかをこの区別で見極める。

## 7. 計算ラボ：系列長と係数で状態・感度を追う

次のNumPyラボはスカラー線形RNN $h_t=ah_{t-1}+x_t$（$h_0=0$）を計算する。変更可能な値は反復係数 $a$、系列長 $T$、入力の配置 `mode`、乱数初期値 `seed`。終端損失は $L=h_T^2/2$ とする。状態 $h_t$ と各時刻の微分 $\partial L/\partial h_t$ を同時に求め、$h_0$ の微小摂動による中心差分を比較する。

`mode="last"` は入力列の最後だけ1で、[線形スカラー命題](#prop-ml2-17-linear-gradient)の状況をそのまま再現する。`mode="first"` は最初だけ1、`mode="random"` は固定した乱数初期値から生成する標準正規乱数であり、最後の状態が同じとは限らない。グラフの横軸は時刻で、縦軸は状態値と勾配絶対値である。

```python-lab
import numpy as np
import matplotlib.pyplot as plt

def rnn_experiment(a=0.5, T=8, mode="last", seed=2717):
    assert 1 <= T <= 40 and np.isfinite(a) and abs(a) <= 3
    rng = np.random.default_rng(seed)
    x = np.zeros(T)
    if mode == "last":
        x[-1] = 1.
    elif mode == "first":
        x[0] = 1.
    elif mode == "random":
        x[:] = rng.normal(size=T)
    else:
        raise ValueError("mode must be last, first or random")

    def forward(h0):
        h = np.zeros(T + 1)
        h[0] = h0
        for t in range(1, T + 1):
            h[t] = a * h[t-1] + x[t-1]
        return h

    h = forward(0.)
    grad = np.zeros(T + 1)
    grad[T] = h[T]                 # d(h_T^2/2)/d h_T
    for t in range(T-1, -1, -1):
        grad[t] = a * grad[t+1]   # 逆伝播: d h_(t+1)/d h_t = a
    eps = 1e-5
    plus = forward(eps)[-1]
    minus = forward(-eps)[-1]
    finite_difference = (plus**2/2 - minus**2/2)/(2*eps)
    return x, h, grad, finite_difference

a, T, mode, seed = 0.5, 8, "last", 2717
x, h, grad, fd = rnn_experiment(a, T, mode, seed)
print("last state:", h[-1], "dL/dh0:", grad[0], "center diff:", fd)
fig, axes = plt.subplots(2, 1, figsize=(8, 5), sharex=True)
axes[0].plot(range(T + 1), h, "o-", label="state h[t]")
axes[0].legend(); axes[0].set_ylabel("state")
axes[1].semilogy(range(T + 1), np.maximum(np.abs(grad), 1e-300), "s--", label="|dL/dh[t]|")
axes[1].legend(); axes[1].set_xlabel("time t"); axes[1].set_ylabel("gradient magnitude")
plt.tight_layout(); plt.show()
```

```python-solution
import numpy as np

def rnn_experiment(a=0.5, T=8, mode="last", seed=2717):
    assert 1 <= T <= 40 and np.isfinite(a) and abs(a) <= 3
    rng = np.random.default_rng(seed)
    x = np.zeros(T)
    if mode == "last":
        x[-1] = 1.
    elif mode == "first":
        x[0] = 1.
    elif mode == "random":
        x[:] = rng.normal(size=T)
    else:
        raise ValueError("mode must be last, first or random")

    def forward(h0):
        h = np.zeros(T + 1)
        h[0] = h0
        for t in range(1, T + 1):
            h[t] = a * h[t-1] + x[t-1]
        return h

    h = forward(0.)
    grad = np.zeros(T + 1)
    grad[T] = h[T]
    for t in range(T-1, -1, -1):
        grad[t] = a * grad[t+1]
    eps = 1e-5
    plus = forward(eps)[-1]
    minus = forward(-eps)[-1]
    finite_difference = (plus**2/2 - minus**2/2)/(2*eps)
    return x, h, grad, finite_difference
```

```python-test
import numpy as np
for a in (0.5, 1., -1., 2.):
    for T in (1, 4, 8):
        x, h, grad, fd = rnn_experiment(a, T, "last")
        assert h[-1] == 1. and np.isclose(grad[0], a**T)
        assert np.isclose(fd, grad[0], rtol=1e-7, atol=1e-7)
x, h, grad, fd = rnn_experiment(0.7, 6, "first")
assert np.isclose(h[-1], 0.7**5)
assert np.isclose(grad[0], 0.7**6 * h[-1])
x, h, grad, fd = rnn_experiment(0.4, 12, "random", seed=37)
assert np.isclose(fd, grad[0], atol=1e-7)
assert not np.array_equal(rnn_experiment(0.4, 12, "random", 37)[0],
                          rnn_experiment(0.4, 12, "random", 38)[0])
```

$a=1/2$ と $a=2$ で同じ `mode="last"` と $T$ を試すと、最後の状態・損失は同じでも、過去への微分だけが異なる。`mode="first"` にすると状態そのものも小さくまたは大きくなり、終端勾配 $\nabla_{h_T}L=h_T$ も変わる。したがって、一般の学習で観測した勾配変化を**Jacobian積だけの効果**と決めつけてはいけない。中心差分は、計算が正しいかをチェックする数値的手掛かりであり、微小幅・大きな係数での丸め誤差まで排除する証明ではない。

## 8. 演習

### ML2-17-A01 三時刻の状態更新

- Level: A

スカラー再帰 $h_t=\frac12h_{t-1}+x_t$ を $h_0=0$、$(x_1,x_2,x_3)=(2,0,-1)$ で実行する。$h_1,h_2,h_3$ を順に求めよ。入力 $x_1$ を3へ変え、他の入力を固定した場合の $h_3$ の変化も求めよ。

<!-- solution-start -->
### 詳細解答

[状態更新の定義](#def-ml2-17-simple-rnn)で $W=1/2,U=1,b=0$、活性化は恒等写像とした場合である。

$$
\begin{aligned}
h_1&=\tfrac12\cdot0+2=2,\\
h_2&=\tfrac12\cdot2+0=1,\\
h_3&=\tfrac12\cdot1-1=-\tfrac12.
\end{aligned}
$$

$x_1$ が1増えると $h_1$ は1増える。$x_2,x_3$ は変わらないため $h_2$ の増分は $1/2$、$h_3$ の増分は $(1/2)(1/2)=1/4$。従って新しい $h_3=-1/2+1/4=-1/4$ である。直接再計算でも $h_1=3,h_2=3/2,h_3=3/4-1=-1/4$ と一致する。
<!-- solution-end -->

### ML2-17-A02 パラメータ数と系列長

- Level: A

入力次元 $d=3$、状態次元 $m=2$、出力次元 $q=1$ の[単純再帰ネットワーク](#def-ml2-17-simple-rnn)を、系列長 $T=7$ に使う。各重み・バイアスの形と総パラメータ数を求めよ。$T=70$ に延長したとき同じ項目がどう変わるか述べよ。

<!-- solution-start -->
### 詳細解答

$W$ は前状態から次状態へ写すので $2\times2$ の4成分、$U$ は3入力から2状態なので $2\times3$ の6成分、$V$ は2状態から1出力なので $1\times2$ の2成分を持つ。$b$ は2成分、$c$ は1成分。総数は

$$
4+6+2+2+1=15.
$$

$T=70$ にしても一組のパラメータ $W,U,V,b,c$ を再利用するため15個のままである。ただし順伝播を70回行い、全時間逆伝播のために保存する中間状態や演算回数は増える。
<!-- solution-end -->

### ML2-17-A03 状態Jacobianの順序

- Level: A

二状態RNNのある区間で $D_1=D_2=I_2$、$W=\operatorname{diag}(1/2,2)$ とする。$\partial h_2/\partial h_0$ を求めよ。別のケースで $D_1=I_2$、$D_2=\operatorname{diag}(1,1/4)$ のとき同じJacobianを求め、各成分の差を説明せよ。$I_2$ は2次の単位行列とする。

<!-- solution-start -->
### 詳細解答

[Jacobian積](#thm-ml2-17-jacobian-product)から $\partial h_2/\partial h_0=J_2J_1=(D_2W)(D_1W)$ である。第一のケースでは

$$
J_2J_1=W^2=\operatorname{diag}(1/4,4).
$$

第二のケースでは $J_1=W$、$J_2=\operatorname{diag}(1/2,1/2)$ となり、

$$
J_2J_1=\operatorname{diag}(1/2,1/2)\operatorname{diag}(1/2,2)
=\operatorname{diag}(1/4,1).
$$

第二成分の増幅が4から1へ減った理由は、二時刻目の活性化導関数が第二成分で $1/4$ となり、同時刻の $W$ による倍率2を半分へ抑えたからである。活性化導関数が異なれば同じ $W$ でもJacobian積は異なる。
<!-- solution-end -->

### ML2-17-A04 教師強制と生成の入力

- Level: A

$f(h,x)=x$、$g(h)=h/2$ の一状態予測器を考え、$y_0=4$、実測 $y_1=3$ とする。時刻1・2の $x_t,h_t,\hat y_t$ を教師強制と自律生成でそれぞれ求めよ。どの真値を時刻2の予測時に利用したかを明示せよ。

<!-- solution-start -->
### 詳細解答

[教師強制と自律生成](#def-ml2-17-teacher-forcing)より時刻1は両方式とも $x_1=y_0=4$、$h_1=f(h_0,4)=4$、$\hat y_1=g(4)=2$ となる。

教師強制の時刻2は実測済みの $y_1=3$ を入力するので、$x_2=3,h_2=3,\hat y_2=3/2$。自律生成は一時刻前の**予測** $\hat y_1=2$ を使い、$x_2=2,h_2=2,\hat y_2=1$。両者とも評価対象である $y_2$ は入力していない。教師強制のみ、時刻2の予測直前に既知とする $y_1$ を利用した。
<!-- solution-end -->

### ML2-17-B01 時間逆伝播を手計算する

- Level: B

$h_t=ah_{t-1}+x_t$、$o_t=h_t$、$h_0=1$、$(x_1,x_2)=(-1,1)$、$L=(o_1^2+o_2^2)/2$ とする。$a=2$ で順伝播、$\delta_2,\delta_1$、$\partial L/\partial a$、$\partial L/\partial x_1$ を求めよ。最後に $L$ を $a$ の多項式へ展開して重み勾配を別法で確かめよ。

<!-- solution-start -->
### 詳細解答

活性化は恒等写像なので $D_t=1$、$W=a,U=V=1,b=c=0$。[時間逆伝播の定理](#thm-ml2-17-bptt)を適用できる。順伝播は $h_1=2\cdot1-1=1$、$h_2=2\cdot1+1=3$、$L=(1+9)/2=5$。各時刻の損失の出力微分は $\eta_t=o_t$ であるから

$$
\begin{aligned}
\delta_2&=\eta_2=3,\\
\delta_1&=\eta_1+a\delta_2=1+2\cdot3=7,\\
\frac{\partial L}{\partial a}&=\delta_1h_0+\delta_2h_1=7\cdot1+3\cdot1=10,\\
\frac{\partial L}{\partial x_1}&=U\delta_1=7.
\end{aligned}
$$

直接 $h_1=a-1$、$h_2=a(a-1)+1=a^2-a+1$ を代入すると

$$
L(a)=\tfrac12(a-1)^2+\tfrac12(a^2-a+1)^2.
$$

よって連鎖律から $L'(a)=(a-1)+(a^2-a+1)(2a-1)$。$a=2$ で $1+3\cdot3=10$ となり、逆伝播と一致した。第一時刻には直接の損失1と将来経由の寄与6が共存する。
<!-- solution-end -->

### ML2-17-B02 ノルム評価と爆発を混同しない

- Level: B

時刻 $1,\ldots,5$ の状態Jacobianが $J_t=D_tW$、$W=\operatorname{diag}(1/2,1/4)$、各 $D_t$ は対角行列で $\|D_t\|_2\le1$ とする。$\|\partial h_5/\partial h_0\|_2$ の上界を与えよ。また二時刻だけの別模型で $J_1=2I_2$、$J_2=0$ の場合に $\|J_1\|_2>1$ なのに勾配爆発を主張できない理由を示せ。

<!-- solution-start -->
### 詳細解答

$W$ は対角なので、Euclidノルムに関する作用素ノルムは対角成分の絶対値の最大で $\|W\|_2=1/2$。$\|J_t\|_2\le\|D_t\|_2\|W\|_2\le1/2$ となる。[Jacobian積と上界](#thm-ml2-17-jacobian-product)を $s=0,t=5,\rho=1/2$ へ適用すると

$$
\left\|\frac{\partial h_5}{\partial h_0}\right\|_2
\le(1/2)^5=1/32.
$$

別模型の積は $J_2J_1=0\cdot(2I_2)=0$。従って初期状態の微小変化は二時刻後にはゼロへ写される。$\|J_1\|_2=2>1$ は最初の一段だけの倍率であり、次の $J_2$ がすべてを消すから積の増大を保証しない。
<!-- solution-end -->

### ML2-17-B03 打切り長の代償

- Level: B

$h_0=1$、$h_t=ah_{t-1}$（$t=1,\ldots,6$）、終端量 $F=h_6$ とする。$a=1$ で全時間微分と、最後の $K=2$ 時刻のみを微分する打切り時間逆伝播の $a$ 勾配を求めよ。また終端損失 $L=F^2/2$ に変えた場合も答えよ。

<!-- solution-start -->
### 詳細解答

順伝播は $h_t=a^t$ で、$a=1$ ならすべての状態は1となる。[打切り命題](#prop-ml2-17-truncation)を $T=6,K=2$ に適用すると、$F'(a)=6a^5$ は6、打切り導関数 $2a^5$ は2。欠落は4で、直近2時刻より前の共有係数に対する依存を微分から外した分である。

$L=F^2/2$ なら連鎖律により $dL/da=F(dF/da)$。$a=1$ では $F=1$ だから真の勾配は $1\cdot6=6$、打切り側は $1\cdot2=2$。終端出力がたまたま1なのでここでは二つの答えが同じ数になるが、一般の $a$ では $F=a^6$ を乗じる必要がある。
<!-- solution-end -->

### ML2-17-B04 パディングと損失マスク

- Level: B

一状態網 $h_t=2h_{t-1}+x_t$、$h_0=0$ に、長さ2の系列 $(x_1,x_2)=(1,2)$ を入力する。長さ3へ揃えるため $x_3=0$ を付加した場合の $h_1,h_2,h_3$ を求めよ。マスク $M=(1,1,0)$ を用いた損失 $\sum_{t=1}^3M_t h_t^2/2$ と、有効長の終端状態 $h_2$ を二乗する損失 $h_2^2/2$ が一致するか確認せよ。また誤って $h_3^2/2$ を終端損失とした場合を比較せよ。

<!-- solution-start -->
### 詳細解答

$h_1=2\cdot0+1=1$、$h_2=2\cdot1+2=4$、$h_3=2\cdot4+0=8$。損失マスクは時刻3の損失を0とするだけなので、各時刻の二乗損失の和は

$$
\sum_{t=1}^3M_t h_t^2/2=\tfrac12(1^2+4^2)=17/2.
$$

一方、終端時刻だけの損失は $h_2^2/2=16/2=8$ であり、前者は時刻1の損失 $1/2$ を含むので一致しない。パディングした末尾 $h_3$ を終端と間違えると $h_3^2/2=64/2=32$ となり、有効長の終端損失8とも異なる。マスクは「どの時刻に損失を課すか」、有効長は「どの状態を最終状態とするか」という異なる指定である。
<!-- solution-end -->

### ML2-17-C01 共有重み・勾配・生成時の差を統合する

- Level: C

一状態・一出力の再帰模型 $h_0=0$、$h_t=ah_{t-1}+x_t$、$\hat y_t=h_t$ を考える。教師強制の入力は $(x_1,x_2,x_3)=(1,0,1)$（実測 $y_0=1,y_1=0,y_2=1$ に対応）、最終時刻の真値は $y_3=1$ とする。$a=2$ で以下を求めよ。

1. 状態 $h_1,h_2,h_3$ と終端二乗損失 $L=(h_3-y_3)^2/2$。
2. $\delta_3,\delta_2,\delta_1$、共有重みの勾配 $\partial L/\partial a$、初回入力の勾配 $\partial L/\partial x_1$。$h_3$ を $a$ の多項式で書いて再検算せよ。
3. 最終時刻から1更新だけを逆にたどる打切り時間逆伝播の $a$ 勾配と、欠落した項。
4. 学習した $a=2$ を固定し、最初の観測 $y_0=1$ から自律生成で三時刻分の予測を実行せよ。教師強制の予測との差を説明せよ。

<!-- solution-start -->
### 詳細解答

**(1)** [状態更新](#def-ml2-17-simple-rnn)を順に行うと

$$
h_1=2\cdot0+1=1,\quad h_2=2\cdot1+0=2,\quad
h_3=2\cdot2+1=5.
$$

終端の誤差は $h_3-y_3=5-1=4$、従って $L=4^2/2=8$。

**(2)** 活性化は恒等で $D_t=1$、終端だけの損失だから $\eta_3=4,\eta_2=\eta_1=0$。[時間逆伝播](#thm-ml2-17-bptt)を最後から実行して

$$
\delta_3=4,\quad\delta_2=2\cdot4=8,\quad
\delta_1=2\cdot8=16.
$$

よって共有重みへ流れる寄与は各時刻 $\delta_t h_{t-1}$。$h_0=0,h_1=1,h_2=2$ なので

$$
\frac{\partial L}{\partial a}=
16\cdot0+8\cdot1+4\cdot2=16,
\qquad\frac{\partial L}{\partial x_1}=\delta_1=16.
$$

直接式に戻すと $h_1=1$、$h_2=a$、$h_3=a^2+1$、したがって $L(a)=((a^2+1)-1)^2/2=a^4/2$。$L'(a)=2a^3$ を $a=2$ で評価して16を得る。二方式は一致する。

**(3)** 最終更新だけを微分すると $h_2$ は固定値2として扱う。このとき $\partial L/\partial a$ の残る寄与は $\delta_3h_2=4\cdot2=8$。取り去った時刻2からの寄与は $\delta_2h_1=8\cdot1=8$、時刻1の寄与は $\delta_1h_0=0$。差は16から8を引いた8である。打切りで順伝播の $h_2$ を変えるのではなく、**微分するときだけ**その依存を外す点に注意する。

**(4)** [自律生成](#def-ml2-17-teacher-forcing)では $x_1=y_0=1$ から $h_1=1,\hat y_1=1$。次の入力は教師強制で用いた $y_1=0$ ではなく $x_2=\hat y_1=1$ なので、$h_2=2\cdot1+1=3,\hat y_2=3$。さらに $x_3=\hat y_2=3$ より $h_3=2\cdot3+3=9,\hat y_3=9$。教師強制の予測 $(1,2,5)$ に対し、自律生成は $(1,3,9)$ となる。教師強制の入力は実測の過去、生成時の入力は自身の過去予測なので、予測誤差が次の状態へ伝わる。
<!-- solution-end -->

## 9. 学びの接続

単純RNNは系列長が変わっても同じパラメータで更新できる一方、遠い時刻への感度は状態Jacobianの積に支配される。**全時間逆伝播のパラメータ勾配は時刻ごとの寄与の和**、**ある過去状態から終端状態までの感度はJacobianの積**である。この二つを区別すると、長系列で生じる問題と打切りによる近似の意味が見通せる。

次のML2-18「Attention・Transformerの演算」では、時刻ごとの状態を一本の再帰だけで伝える代わりに、系列内の位置どうしの情報を重み付きで直接集約する方式を扱う。そこで比較するためにも、本講では「何をいつ観測できるか」「どの重みを共有するか」「勾配がどの経路を通るか」を具体的に押さえておこう。
