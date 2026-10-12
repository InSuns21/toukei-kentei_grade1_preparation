# INFO8 率歪み関数と有限離散情報源の歪み付き符号化

[固定長の無歪み情報源符号化定理](../INFO5/index.md#thm-info5-achievability)は、元の列を正確に復元できるかどうかで圧縮の限界を定めました。しかし画像の微小な画素差や、測定値を少し丸める誤差まで完全に禁止すると、必要なビット数が増えます。どの誤差を許し、平均的にどこまで再現すればよいかを先に指定すれば、さらに圧縮できるのでしょうか。

今回の中心問いは、**一記号あたりの平均歪みを $D$ 以下に抑えたいとき、最小のビット率はいくらか**です。[相互情報量](../INFO1/index.md#def-info1-mutual-information)を「復元値から元の記号について知れる量」と読み替え、再現規則を最適化します。通信路容量では相互情報量をできるだけ大きくしますが、ここでは許容歪みの範囲で相互情報量をできるだけ小さくします。

全編で、空でない有限集合 $\mathcal X$（情報源）と $\widehat{\mathcal X}$（復元記号）を固定します。$X_1,\ldots,X_n$ は有限分布 $p(x)$ に従う独立同分布列、対数は底2です。歪み関数 $d:\mathcal X\times\widehat{\mathcal X}\to[0,\infty)$ は有限値で、したがって $d_{\max}=\max_{x,\hat x}d(x,\hat x)<\infty$ です。$\widehat{\mathcal X}$ は $\mathcal X$ と異なっても構いません。

## 1. 誤りの個数ではなく、誤差の大きさを測る

例えば二値信号では、誤った位置に1、合った位置に0を割り当てる Hamming 歪みを使えます。一方、$0,1,2$ の三値測定なら $d(x,\hat x)=(x-\hat x)^2$ として、大きなずれを強く罰することもできます。そこで、符号器と復号器が作る再現列に対して、各位置の歪みを平均します。

<a id="def-info8-distortion-code"></a>

<!-- formal-statement-start -->
> **定義（歪み尺度・固定長歪み付きブロック符号）**  
> 上記の有限情報源と歪み関数 $d$ に対し、長さ $n\ge1$、メッセージ数 $M\ge1$ の決定的ブロック符号を、写像

$$
f:\mathcal X^n\to\{1,\ldots,M\},\qquad
g:\{1,\ldots,M\}\to\widehat{\mathcal X}^{\,n}
$$

> の組とする。$\widehat X^n=g(f(X^n))$、一記号あたりの期待歪み $\Delta_n$、ビット率 $r_n$ をそれぞれ

$$
d_n(x^n,\hat x^n)=\frac1n\sum_{i=1}^nd(x_i,\hat x_i),
\quad
\Delta_n=E[d_n(X^n,\widehat X^n)],
\quad
r_n=\frac{\log_2 M}{n}
$$

> と定める。情報源列は $p^n(x^n)=\prod_{i=1}^np(x_i)$ に従うものとする。ここでは最大歪みでも超過歪み確率でもなく、期待歪みを制約する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info8-distortion-code -->
### 例：三値の再現誤差

**定義の確認**：$\mathcal X=\widehat{\mathcal X}=\{0,1,2\}$、$d(x,\hat x)=(x-\hat x)^2$、$n=2$ とします。入力 $(0,2)$ を $(1,1)$ に復元すれば、二つの位置の歪みはどちらも1なので $d_2((0,2),(1,1))=(1+1)/2=1$ です。$(0,0)$ に復元すれば $(0+4)/2=2$ です。$\Delta_n$ は**情報源分布による全入力列の平均**であり、この一列だけの歪みと混同しません。
<!-- definition-example-end -->

## 2. 一記号の最適な「復元通信路」

符号全体を直接最適化する前に、ひとつの情報源記号 $X$ から復元記号 $\widehat X$ を確率的に生じさせる規則 $Q(\hat x|x)$ を考えます。これは実際の符号器を乱数化する要求ではなく、どんな統計的関係を復元列に持たせたいかを調べるための補助的な規則です。

$a_Q(x,\hat x)=p(x)Q(\hat x|x)$、$q_Q(\hat x)=\sum_xp(x)Q(\hat x|x)$ と置きます。期待歪みと[相互情報量](../INFO1/index.md#def-info1-mutual-information)は

$$
D(Q)=\sum_{x,\hat x}p(x)Q(\hat x|x)d(x,\hat x),
\qquad
I_Q(X;\widehat X)=
\sum_{x,\hat x:a_Q(x,\hat x)>0}
a_Q(x,\hat x)\log_2\frac{Q(\hat x|x)}{q_Q(\hat x)}.
$$

正確率の項に限って比を評価するので、零確率の分母を割り算に使いません。$Q(\cdot|x)$ は各 $x$ について和が1の非負分布です。

<a id="def-info8-rate-distortion"></a>

<!-- formal-statement-start -->
> **定義（有限情報源の率歪み関数）**  
> 空でない有限 $\mathcal X,\widehat{\mathcal X}$、分布 $p$、有限非負歪み $d$ を固定する。$D\ge0$ に対し

$$
R(D)=\inf_{\substack{Q(\hat x|x)\ge0,\ \sum_{\hat x}Q(\hat x|x)=1\\D(Q)\le D}}
I_Q(X;\widehat X)
$$

> と定める。実現可能な $Q$ がなければ $R(D)=+\infty$ とする。これは一記号あたりのビット数を表す量で、$\widehat{\mathcal X}$ の選択と $d$ に依存する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info8-rate-distortion -->
### 例：非対称な二値情報源と復元規則

**定義の確認**：$P(X=1)=1/4$、$P(X=0)=3/4$、Hamming 歪み $d(x,\hat x)=\mathbf1_{\{x\ne\hat x\}}$ とします。$Q(1|0)=0$、$Q(0|1)=1/2$、残りは行和1とすると、誤りは「$X=1$ かつ $\widehat X=0$」に限られ

$$
D(Q)=\frac14\cdot\frac12=\frac18.
$$

$\widehat X=1$ の確率は $1/8$。従って条件付きエントロピーは $H(\widehat X|X)=(3/4)h_2(0)+(1/4)h_2(1/2)=1/4$、相互情報量は $h_2(1/8)-1/4$ ビットです。ただしこの $Q$ が**最適**と証明したわけではなく、$R(1/8)\le h_2(1/8)-1/4$ という実現可能な上界を得たにすぎません。$h_2(t)=-t\log_2t-(1-t)\log_2(1-t)$ とし、端点の $0\log_20$ は0とします。
<!-- definition-example-end -->

各 $x$ で歪みの最小値を選べるので、どれほど多くのビットを使っても避けられない歪みが存在します。逆に、同じ定数記号だけを出す復元なら情報源を一切伝えずに済みます。この二つが定義域の端点です。

<a id="prop-info8-endpoints"></a>

<!-- formal-statement-start -->
> **命題（実現可能な歪みと零率の境界）**  
> 有限情報源 $(p,d)$ に対して

$$
D_{\min}=\sum_xp(x)\min_{\hat x}d(x,\hat x),
\qquad
D_0=\min_{\hat x}\sum_xp(x)d(x,\hat x)
$$

> と置く。$D<D_{\min}$ では $R(D)=+\infty$。$D\ge D_{\min}$ なら $R(D)$ は有限で最小値を取る。さらに $R(D)=0$ と $D\ge D_0$ は同値であり、$D\ge D_0$ ならメッセージ1個の決定的符号で歪み $D_0$ を実現できる。
<!-- formal-statement-end -->

### 証明の見取り図

$D_{\min}$ は各入力ごとに再現記号を自由に選んだときの限界、$D_0$ は入力を一切見ずに同じ復元記号を選ぶときの限界です。後者の「情報を全く伝えない」という条件は、相互情報量が0なら $X$ と $\widehat X$ が独立になるという[相対エントロピー表示](../INFO2/index.md#thm-info2-mutual-kl)で精密に扱えます。

<!-- proof-start -->
### 証明

どの確率核 $Q$ についても、各 $x$ の $Q(\cdot|x)$ は確率分布なので

$$
\begin{aligned}
D(Q)
&=\sum_xp(x)\sum_{\hat x}Q(\hat x|x)d(x,\hat x)\\
&\ge\sum_xp(x)\min_{\hat x}d(x,\hat x)=D_{\min}.
\end{aligned}
$$

各 $x$ で最小の $\hat x$ を一つ選ぶ決定的な $Q$ は等号を達成します。有限個の $Q(\hat x|x)$ が満たす閉じた有界な確率単体の直積はコンパクトで、$D(Q)\le D$ は閉条件です。[相互情報量の相対エントロピー表示](../INFO2/index.md#thm-info2-mutual-kl)と $-t\log_2t$ の $t=0$ への連続拡張により $I_Q$ は $Q$ の連続関数です。従って非空な制約集合上で有限最小値を持ちます。

定数 $\hat x_0$ を常に返す $Q(\hat x_0|x)=1$ は $I_Q=0$、期待歪み $\sum_xp(x)d(x,\hat x_0)$ です。これらの期待歪みの最小値が $D_0$ です。逆に $R(D)=0$ なら最小値を達成する $Q$ で $I_Q=0$ です。[Gibbs不等式の等号条件](../INFO2/index.md#thm-info2-gibbs)により $a_Q(x,\hat x)=p(x)q_Q(\hat x)$、つまり $X,\widehat X$ は独立です。すると

$$
D(Q)=\sum_{\hat x}q_Q(\hat x)
\underbrace{\sum_xp(x)d(x,\hat x)}_{\ge D_0}
\ge D_0.
$$

従って $D\ge D(Q)\ge D_0$。最後に、最良の定数 $\hat x_0$ を $n$ 回並べる $M=1$ の符号で $\Delta_n=D_0$、$r_n=0$ です。
<!-- proof-end -->

## 3. 歪みを緩めると必要率はどう動くか

許す歪みを増やして必要率が上昇するのは不自然です。さらに、二つの復元規則を確率的に混ぜると、歪みは線形に変わり、相互情報量は上に凸の不等式を満たします。これを証明しておくと、ブロック符号の各座標で歪みが違っても一つの率の下界にまとめられます。

<a id="prop-info8-shape"></a>

<!-- formal-statement-start -->
> **命題（率歪み関数の単調性・凸性・右連続性）**  
> 上記の有限模型で $R(D)$ は $[D_{\min},\infty)$ 上で有限・非負・単調非増加かつ凸である。さらに、この区間のどの $D$ においても右連続であり、$D_k\downarrow D$ なら $R(D_k)\to R(D)$ が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

凸性は情報量の[対数和不等式](../INFO2/index.md#lem-info2-log-sum)から導きます。右連続性は、より大きな歪みで最適だった復元規則を有限次元のコンパクト集合から極限抽出することで確かめます。

<!-- proof-start -->
### 証明

$D_1\le D_2$ なら $D(Q)\le D_1$ を満たす $Q$ はすべて $D(Q)\le D_2$ も満たすため、$R(D_2)\le R(D_1)$ です。非負性は[相対エントロピーの非負性](../INFO2/index.md#thm-info2-gibbs)によります。

$D_1,D_2\ge D_{\min}$ の最適核を $Q_1,Q_2$ とし、$0\le\lambda\le1$ とします。$Q_\lambda=\lambda Q_1+(1-\lambda)Q_2$ は各行和1の核で

$$
D(Q_\lambda)=\lambda D(Q_1)+(1-\lambda)D(Q_2)
\le\lambda D_1+(1-\lambda)D_2.
$$

$q_j(\hat x)=\sum_xp(x)Q_j(\hat x|x)$、$q_\lambda=\lambda q_1+(1-\lambda)q_2$ です。[対数和不等式](../INFO2/index.md#lem-info2-log-sum)を、各 $(x,\hat x)$ について非負数 $\lambda p(x)Q_1(\hat x|x)$ と $(1-\lambda)p(x)Q_2(\hat x|x)$、分母側の $\lambda p(x)q_1(\hat x)$ と $(1-\lambda)p(x)q_2(\hat x)$ に適用します（零項は連続拡張）。全組で和を取ると

$$
I_{Q_\lambda}(X;\widehat X)
\le\lambda I_{Q_1}(X;\widehat X)+(1-\lambda)I_{Q_2}(X;\widehat X).
$$

従って $R(\lambda D_1+(1-\lambda)D_2)\le\lambda R(D_1)+(1-\lambda)R(D_2)$ です。

次に $D_k\downarrow D\ge D_{\min}$ とし、各最適核 $Q_k$ を選びます。コンパクト性により部分列 $Q_{k_j}$ は $Q_*$ に収束します。有限和と連続性から

$$
D(Q_*)=\lim_jD(Q_{k_j})\le\lim_jD_{k_j}=D.
$$

単調性から $R(D_k)$ は単調非減少で $R(D_k)\le R(D)$、従ってある極限 $L\le R(D)$ を持ちます。情報量の連続性により

$$
R(D)\le I_{Q_*}=\lim_jI_{Q_{k_j}}=\lim_jR(D_{k_j})=L\le R(D).
$$

よって $L=R(D)$ です。これは特に $D=D_{\min}$ の右端からの連続性も保証します。
<!-- proof-end -->

## 4. 具体例：公平二値情報源の Hamming 歪み

$\mathcal X=\widehat{\mathcal X}=\{0,1\}$、$P(X=0)=P(X=1)=1/2$、$d(x,\hat x)=\mathbf1_{\{x\ne\hat x\}}$ とします。$D_{\min}=0$ で、定数0を返すと平均歪み $1/2$、したがって $D_0=1/2$ です。

<a id="thm-info8-binary"></a>

<!-- formal-statement-start -->
> **定理（公平二値情報源の率歪み関数）**  
> 公平二値独立同分布情報源と Hamming 歪みについて、$D\ge0$ における率歪み関数は

$$
R(D)=
\begin{cases}
1-h_2(D),&0\le D\le1/2,\\
0,&D\ge1/2
\end{cases}
$$

> である。ここで $h_2(t)=-t\log_2t-(1-t)\log_2(1-t)$（$0\le t\le1$、$0\log_20=0$）とする。
<!-- formal-statement-end -->

### 証明の見取り図

下界では「復元値を知っても分からない元のビット」を誤りビット $E=X\oplus\widehat X$ に置き換え、条件付きエントロピーを抑えます。上界は二元対称の復元通信路で達成します。これは[二元対称通信路の容量](../INFO6/index.md#thm-info6-bsc-capacity)と式の形が似ていますが、最適化の役割は逆です。

<!-- proof-start -->
### 証明

任意の核 $Q$ を取り、$\delta=P(X\ne\widehat X)=D(Q)$ と置きます。$E=X\oplus\widehat X$ とすると、$\widehat X$ を固定したとき $X$ と $E$ は一対一対応なので

$$
H(X|\widehat X)=H(E|\widehat X)\le H(E)=h_2(\delta).
$$

最初の等号は、$\widehat X$ を固定すると $E=X\oplus\widehat X$ と $X=E\oplus\widehat X$ が互いに逆の対応になるためです。次の不等号は、[相互情報量の相対エントロピー表示](../INFO2/index.md#thm-info2-mutual-kl)と[Gibbs不等式](../INFO2/index.md#thm-info2-gibbs)を $(E,\widehat X)$ に適用し、

$$
H(E)-H(E|\widehat X)=I(E;\widehat X)\ge0
$$

とすることで得られます。すなわち、**条件付けを外すとエントロピーは減少しません**。$0\le\delta\le D\le1/2$ のとき、$h_2$ は $[0,1/2]$ 上単調増加です。実際、内部で $h_2'(t)=\log_2((1-t)/t)\ge0$、端点でも連続です。ゆえに

$$
I(X;\widehat X)=H(X)-H(X|\widehat X)
\ge1-h_2(\delta)\ge1-h_2(D).
$$

逆に $\widehat X=X\oplus N$、$N\sim\operatorname{Bernoulli}(D)$ を $X$ と独立に選ぶ核は $D(Q)=D$。このとき $\widehat X$ は一様、$H(\widehat X)=1$、$H(\widehat X|X)=h_2(D)$ なので $I_Q=1-h_2(D)$ です。$D\ge1/2$ なら[零率境界](#prop-info8-endpoints)により $R(D)=0$ です。
<!-- proof-end -->

零歪みなら $R(0)=1$、$D=1/4$ なら $R(1/4)=1-h_2(1/4)$、$D=1/2$ なら率0です。損失を少し許すだけで必要率が減るのは、復元列の細部が元の列を完全に識別しなくてもよくなるからです。

## 5. どんな固定長符号も率歪み関数を下回れない

ここからは、一記号の仮想復元規則と、実際の長さ $n$ の決定的符号を結びます。復元列の各座標 $\widehat X_i$ は入力**全列**を参照してよく、各座標の復元誤差が独立であるとは仮定しません。それでも情報源列が独立同分布なら下界が成り立ちます。

<a id="thm-info8-converse"></a>

<!-- formal-statement-start -->
> **定理（有限歪み付き情報源符号化の有限長逆定理）**  
> 有限情報源 $X^n\sim p^n$、非負有限歪み $d$、長さ $n\ge1$ の任意の決定的 $(n,M)$ 符号に対し、$\Delta_n=E[d_n(X^n,\widehat X^n)]$ とすると

$$
\frac{\log_2M}{n}\ge R(\Delta_n).
$$

> 特に $\Delta_n\le D$ なら $r_n\ge R(D)$。$\Delta_n\ge D_{\min}$ は全符号について成立する。
<!-- formal-statement-end -->

### 証明の見取り図

符号器の出力 $J=f(X^n)$ は $M$ 通りしかなく、復元列は $J$ だけから決まります。従って入力・復元列の相互情報量は $\log_2M$ を超えません。下からは、独立情報源のエントロピーと条件付きエントロピーの評価を使い、座標ごとの $I(X_i;\widehat X_i)$ を足し合わせます。最後に[率歪み関数の凸性](#prop-info8-shape)が効きます。

<!-- proof-start -->
### 証明

$J=f(X^n)$、$\widehat X^n=g(J)$ とします。[相互情報量のデータ処理不等式](../INFO2/index.md#thm-info2-mutual-dpi)は $X^n\to J\to\widehat X^n$ に適用でき、さらに $I(X^n;J)\le H(J)\le\log_2M$ です。よって

$$
\log_2M\ge I(X^n;J)\ge I(X^n;\widehat X^n).
$$

情報源の独立性から $H(X^n)=\sum_{i=1}^nH(X_i)$ です。次に、[結合エントロピーの連鎖律](../INFO1/index.md#thm-info1-chain-rule)を、各 $i$ について組 $(X^{i-1},\widehat X^n)$ と変数 $X_i$ に適用します。$X^0$ は空列とし、差を足すと途中の項が消えて

$$
\begin{aligned}
H(X^n|\widehat X^n)
&=H(X^n,\widehat X^n)-H(\widehat X^n)\\
&=\sum_{i=1}^n\bigl[H(X^i,\widehat X^n)
                  -H(X^{i-1},\widehat X^n)\bigr]\\
&=\sum_{i=1}^nH(X_i|X^{i-1},\widehat X^n).
\end{aligned}
$$

右辺を各座標の条件付きエントロピーで上から抑えます。$B_i=\widehat X_i$、$Z_i=(X^{i-1},\widehat X_1,\ldots,\widehat X_{i-1},\widehat X_{i+1},\ldots,\widehat X_n)$ と置くと、有限分布の定義から

$$
\begin{aligned}
&H(X_i|B_i)-H(X_i|B_i,Z_i)\\
&\quad=\sum_{\substack{b,z:\\P(B_i=b,Z_i=z)>0}}
P(B_i=b,Z_i=z)
D\bigl(P_{X_i|B_i=b,Z_i=z}\,\|\,P_{X_i|B_i=b}\bigr)\ge0.
\end{aligned}
$$

最後は[相対エントロピーの定義](../INFO2/index.md#def-info2-relative-entropy)と[Gibbs不等式](../INFO2/index.md#thm-info2-gibbs)によります。正確率の $(b,z)$ で条件付き分布が正である記号は $P_{X_i|B_i=b}$ でも正なので、比の分母は零になりません。従って

$$
H(X^n|\widehat X^n)
\le\sum_{i=1}^nH(X_i|\widehat X_i).
$$

ここで独立であると仮定したのは入力列 $X^n$ だけで、復元列の座標に独立性は必要ありません。両式を引き算して

$$
\begin{aligned}
I(X^n;\widehat X^n)
&=H(X^n)-H(X^n|\widehat X^n)\\
&\ge\sum_i\bigl[H(X_i)-H(X_i|\widehat X_i)\bigr]
=\sum_i I(X_i;\widehat X_i).
\end{aligned}
$$

$D_i=E[d(X_i,\widehat X_i)]$ と置きます。$X_i$ の周辺分布はすべて $p$ なので、各対 $(X_i,\widehat X_i)$ が誘導する条件付き分布は[有限情報源の率歪み関数](#def-info8-rate-distortion)の実現可能な核であり、$I(X_i;\widehat X_i)\ge R(D_i)$。よって[凸性と単調性](#prop-info8-shape)から

$$
\begin{aligned}
\log_2M
&\ge\sum_iR(D_i)
\ge nR\left(\frac1n\sum_iD_i\right)\\
&=nR(\Delta_n).
\end{aligned}
$$

中間の不等号は[率歪み関数の凸性](#prop-info8-shape)を、歪み値 $D_1,\ldots,D_n\ge D_{\min}$ に反復したものです。例えば $n\ge2$ なら

$$
\begin{aligned}
R\left(\frac1n\sum_{i=1}^nD_i\right)
&=R\left(\frac{n-1}{n}\frac{\sum_{i=1}^{n-1}D_i}{n-1}
          +\frac1nD_n\right)\\
&\le\frac{n-1}{n}R\left(\frac{\sum_{i=1}^{n-1}D_i}{n-1}\right)
+\frac1nR(D_n).
\end{aligned}
$$

この操作を $n-1$ 個の平均にも繰り返すと $\frac1n\sum_iR(D_i)$ が得られます。$n=1$ では等号です。最後の等号は期待値の線形性から $\Delta_n=n^{-1}\sum_iD_i$ としたものです。$\Delta_n\le D$ なら単調非増加性から $R(\Delta_n)\ge R(D)$ です。
<!-- proof-end -->

情報源座標間の独立性が失われると、$H(X^n)=\sum_iH(X_i)$ という等式が一般に成立しません。この証明を定常だが相関のある情報源へ、そのまま転用することはできません。

## 6. ランダム被覆：良い復元列を一つ見つける

逆定理は「これより少ないビット数では不可能」と教えます。では、$R(D)$ より少し多くビットを使えば復元できるのでしょうか。圧縮側では、送信列を誤らず識別するのではなく、**歪みの小さい復元候補が符号帳のどこかに存在する**ことを示します。

核 $Q$ を固定し、$a(x,\hat x)=p(x)Q(\hat x|x)$、$q(\hat x)=\sum_xa(x,\hat x)$ とします。$a(x,\hat x)>0$ の組で

$$
\jmath_Q(x;\hat x)=\log_2\frac{Q(\hat x|x)}{q(\hat x)}
$$

とし、ブロックでは正確率の組に限って座標和 $\sum_i\jmath_Q(x_i;\hat x_i)$ を取ります。[INFO7の情報密度](../INFO7/index.md#def-info7-information-density)と同じ対数比でも、今回は「復元候補を無作為に引いてよい組が現れる確率」の評価に使います。

<a id="lem-info8-covering"></a>

<!-- formal-statement-start -->
> **補題（有限離散模型のランダム被覆評価）**  
> 上記の有限確率核 $Q$ に対し、$I=I_Q(X;\widehat X)$、$D_Q=D(Q)$ とする。任意の $\varepsilon>0$、整数 $n\ge1$ について、独立同分布 $a^n$ の組 $(X^n,\widehat X^n)$ が満たす事象

$$
G_n=\left\{
\frac1n\sum_{i=1}^nd(X_i,\widehat X_i)\le D_Q+\varepsilon,\ \
\frac1n\sum_{i=1}^n\jmath_Q(X_i;\widehat X_i)\le I+\varepsilon
\right\}
$$

> の失敗確率を $\eta_n=P_{a^n}(G_n^c)$ とする。$M\ge1$ 個の候補 $\widehat C_1,\ldots,\widehat C_M$ を互いに独立に $q^n$ から抽出したとき、平均符号帳・平均情報源列の下で、どの候補も $G_n$ の条件を満たさない確率は

$$
P(\text{候補なし})
\le2\eta_n+\exp\!\left(-\frac M2\,2^{-n(I+\varepsilon)}\right).
$$

> さらに固定した $\varepsilon>0$ に対し $\eta_n\to0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まず結合分布 $a^n$ から独立に作った座標対について、歪みと情報密度の標本平均が各期待値へ集中することを確認します。一つの固定した典型入力に対し、独立な復元候補 $q^n$ が当たる確率を、情報密度の上界で下から押さえます。その確率が指数 $2^{-nI}$ 程度なので、候補数 $M$ が $2^{nI}$ より速く増えれば、全滅の確率が消えます。

<!-- proof-start -->
### 証明

$\jmath_Q(x;\hat x)$ は有限個の正確率の組だけで評価するので、確率1で有限かつ有界です。また $d$ も有界です。独立同分布で有界な変数 $Z_i$ の標本平均は $E[n^{-1}\sum_iZ_i]=EZ_1$、$\operatorname{Var}(n^{-1}\sum_iZ_i)=\operatorname{Var}(Z_1)/n$ を満たします。$Z_i=d(X_i,\widehat X_i)$ と $Z_i=\jmath_Q(X_i;\widehat X_i)$ のそれぞれについて、二乗平均から得る Chebyshev 評価 $P(|n^{-1}\sum_i Z_i-EZ_1|>\varepsilon)\le\operatorname{Var}(Z_1)/(n\varepsilon^2)$ を適用します。二つの失敗事象の和集合上界から $\eta_n\to0$ です。

$x^n$ を固定して、条件を満たす候補の集合を $A_n(x^n)$ とします。$a^n(x^n,\hat x^n)>0$ の候補に限り、積の比を取ると

$$
q^n(\hat x^n)
=Q^n(\hat x^n|x^n)\,
2^{-\sum_i\jmath_Q(x_i;\hat x_i)}.
$$

$A_n(x^n)$ 上では右辺の指数が $-n(I+\varepsilon)$ 以上です。従って $p^n(x^n)>0$ の各 $x^n$ で

$$
\begin{aligned}
q^n(A_n(x^n))
&=\sum_{\hat x^n\in A_n(x^n)}q^n(\hat x^n)\\
&\ge2^{-n(I+\varepsilon)}
\sum_{\hat x^n\in A_n(x^n)}Q^n(\hat x^n|x^n)\\
&=2^{-n(I+\varepsilon)}Q^n(A_n(x^n)|x^n).
\end{aligned}
$$

$\alpha(x^n)=Q^n(A_n(x^n)|x^n)$ と書くと、結合分布での平均は $E_{p^n}[\alpha(X^n)]=P_{a^n}(G_n)=1-\eta_n$。$1-\alpha(X^n)\ge0$ に [Markovの不等式](../../../解析系/F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を使って

$$
P_{p^n}\bigl(\alpha(X^n)<1/2\bigr)
\le P_{p^n}(1-\alpha(X^n)>1/2)
\le 2E_{p^n}[1-\alpha(X^n)]
=2\eta_n.
$$

従って残りの入力列では、候補一個が当たる確率は少なくとも $s_n=\frac12\,2^{-n(I+\varepsilon)}$。$M$ 個の候補は条件付きで独立だから、どれも当たらない確率は

$$
(1-q^n(A_n(x^n)))^M
\le(1-s_n)^M\le\exp(-Ms_n).
$$

最初の入力列の悪い集合については確率を1で抑え、残りの集合には上の指数上界を適用すれば、主張した式が得られます。
<!-- proof-end -->

この被覆評価は、復元記号列の重複を禁止していません。重複があっても上界は成り立ちます。また、$\eta_n$ は**補助として定めた結合分布 $a^n$**での失敗確率、最後に評価する「候補なし」は**独立に作った復元符号帳**に関する確率です。この二つの確率模型を混同しないことが核心です。

<a id="thm-info8-achievability"></a>

<!-- formal-statement-start -->
> **定理（有限歪み付き情報源符号化の達成可能性）**  
> 空でない有限 $\mathcal X,\widehat{\mathcal X}$、分布 $p$、有限非負歪み $d$、実現可能な歪み $D\ge D_{\min}$ を固定する。任意の実数 $r>R(D)$ に対し、長さ $n$ の決定的ブロック符号の列を選んで

$$
\limsup_{n\to\infty}\frac{\log_2M_n}{n}\le r,
\qquad
\limsup_{n\to\infty}\Delta_n\le D
$$

> とできる。さらに $\limsup\Delta_n\le D$ を保ったまま $r_n\to R(D)$ を満たす決定的符号列も存在する。
<!-- formal-statement-end -->

### 証明の見取り図

最適な核 $Q_*$ を固定すると $I_{Q_*}=R(D)$、$D(Q_*)\le D$ です。率 $r$ に余裕があるので $I_{Q_*}+\varepsilon<r$ に選べます。[被覆補題](#lem-info8-covering)の指数項が消え、典型入力について低歪みの候補が見つかります。符号帳はランダムに設計するだけで、最後は期待歪みの小さい**決定的符号**を一つ固定します。

<!-- proof-start -->
### 証明

[最小値の存在](#prop-info8-endpoints)により $I_{Q_*}=R(D)<r$ と $D(Q_*)\le D$ を満たす $Q_*$ を選べます。$I=R(D)$、$D_*=D(Q_*)$ と書き、$0<\varepsilon<r-I$ を固定します。$M_n=\lceil2^{nr}\rceil$ 個の候補を、$Q_*$ の周辺分布 $q^n$ に従い独立に生成します。

符号帳と入力列を与えられた符号器は、[被覆補題](#lem-info8-covering)の二条件を満たす最初の候補の番号を返し、候補がなければ番号1を返すものとします。復号器はその番号の候補列を出力します。符号帳を固定した後、この二つは全入力に定義された決定的写像です。

候補がある場合、定義から $d_n(X^n,\widehat X^n)\le D_*+\varepsilon$。候補がない場合でも常に $d_n\le d_{\max}$ なので、符号帳に関する平均を取った期待歪みは

$$
\begin{aligned}
E_{\mathcal C}[\Delta_n(\mathcal C)]
&\le D_*+\varepsilon+d_{\max}P(\text{候補なし})\\
&\le D+\varepsilon+
d_{\max}\left[2\eta_n+
\exp\!\left(-\frac12\,2^{n(r-I-\varepsilon)}\right)\right].
\end{aligned}
$$

ここで $M_n\ge2^{nr}$ を指数項に代入し、$r-I-\varepsilon>0$ としました。$\eta_n\to0$ なので括弧内は0へ収束します。平均以下の歪みを持つ符号帳が少なくとも一つあり、各 $n$ でそれを固定します。率は

$$
r\le\frac{\log_2M_n}{n}
\le r+\frac1n
$$

です。これは**固定した** $\varepsilon$ では $\limsup\Delta_n\le D+\varepsilon$ を与えるだけなので、$D$ への収束には次の対角化を使います。

各整数 $k\ge1$ について $\varepsilon_k=\min\{1/k,(r-I)/2\}>0$ を選びます。被覆補題から、ある増大する整数 $N_k$ を選べて、すべての $n\ge N_k$ について対応する符号の期待歪みは $D+\varepsilon_k+1/k$ 以下になります。$N_1<N_2<\cdots$ となるよう増やして、$N_k\le n<N_{k+1}$ ではその $k$ の符号を選ぶと $k\to\infty$、ゆえに $\limsup\Delta_n\le D$ です。初めの有限個の $n$ の符号は任意に選べます。

最後に $r_k=R(D)+1/k$ とし、前段落の構成を各 $r_k$ に適用します。十分大きい $n$ では率が $r_k+1/n$ 以下で歪みが $D+1/k$ 以下の符号を選べるので、もう一度増大する区切り $N_k'$ で対角化すると、$\limsup\Delta_n\le D$ かつ $\limsup r_n\le R(D)$ を得ます。一方、[有限歪み付き情報源符号化の有限長逆定理](#thm-info8-converse)により $r_n\ge R(\Delta_n)$。$\limsup\Delta_n\le D$ と[単調性・右連続性](#prop-info8-shape)から $\liminf R(\Delta_n)\ge R(D)$ が従い、結局 $r_n\to R(D)$ です。
<!-- proof-end -->

境界 $D=D_{\min}$ もこの議論に含まれます。有限長で歪みを**常に**ちょうど $D_{\min}$ 以下にできると主張しているのではなく、期待歪みの上極限が $D_{\min}$ 以下になる符号列を構成しています。

<a id="cor-info8-coding"></a>

<!-- formal-statement-start -->
> **系（有限離散情報源の歪み付き符号化定理）**  
> 上記の有限独立同分布情報源について、期待歪みの上極限が $D\ge D_{\min}$ 以下である決定的固定長ブロック符号列の達成可能な漸近ビット率の下限は $R(D)$ である。すなわち、$r_n\to r$ かつ $\limsup\Delta_n\le D$ を満たす列では $r\ge R(D)$ であり、$r=R(D)$ を満たす列が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

存在は[達成可能性定理](#thm-info8-achievability)の第二の結論です。逆向きは[有限長逆定理](#thm-info8-converse)で $r_n\ge R(\Delta_n)$ とし、$\limsup\Delta_n\le D$ に[単調性・右連続性](#prop-info8-shape)を適用して $\liminf r_n\ge R(D)$ を得ます。
<!-- proof-end -->

## 7. 演習：歪みと率を別々に検算する

### Level A：定義・台・端点

#### A1. 最小歪みと零率境界

$P(X=1)=0.3$ の二値情報源を Hamming 歪みで復元する。$D_{\min}$ と $D_0$、$R(D)=+\infty$ となる $D\ge0$ の範囲、および $R(D)=0$ となる範囲を求めよ。

- Level: A
- ID: INFO8-A1

<!-- solution-start -->
**詳細解答**　各入力 $x$ に同じ記号 $\hat x=x$ を選べば歪み0なので $D_{\min}=0$。定数0を返した場合の期待歪みは $P(X=1)=0.3$、定数1なら $P(X=0)=0.7$、よって $D_0=\min(0.3,0.7)=0.3$。[端点命題](#prop-info8-endpoints)より $D\ge0$ では実現可能で $R(D)$ は有限、$D\ge0.3$ で $R(D)=0$ です。問題は $D\ge0$ としているため、この範囲で $R(D)=+\infty$ はありません。定義を負の $D$ にまで拡張する場合には $D<0$ で $+\infty$ になります。
<!-- solution-end -->

#### A2. 二位置の歪みとビット率

$\mathcal X=\widehat{\mathcal X}=\{0,1\}$ とし、$n=2$、$p(0)=p(1)=1/2$、Hamming 歪みとする。$M=2$、$f(x_1,x_2)=1+x_1$、$g(1)=(0,0)$、$g(2)=(1,1)$ による符号の率と期待歪みを求めよ。

- Level: A
- ID: INFO8-A2

<!-- solution-start -->
**詳細解答**　符号は最初のビットを送り、二位置ともその値で復元します。第一位置は常に一致するので歪み0、第二位置は独立な公平ビット $X_2$ と $X_1$ が異なるときだけ歪み1です。従って $P(X_2\ne X_1)=P(0,1)+P(1,0)=1/4+1/4=1/2$。一記号あたりの期待歪みは $\Delta_2=(0+1/2)/2=1/4$、率は $r_2=(\log_22)/2=1/2$ です。[有限長逆定理](#thm-info8-converse)は $1/2\ge R(1/4)=1-h_2(1/4)$ と整合します。
<!-- solution-end -->

#### A3. 非対称復元通信路

$P(X=1)=1/4$、Hamming 歪み、$Q(1|0)=0$、$Q(0|1)=1/2$ とする。復元値の分布、期待歪み、相互情報量を求め、$R(D)$ に対して言える不等式の向きを示せ。

- Level: A
- ID: INFO8-A3

<!-- solution-start -->
**詳細解答**　$P(\widehat X=1)=P(X=1)Q(1|1)=(1/4)(1/2)=1/8$。誤りは $(X,\widehat X)=(1,0)$ だけで $D(Q)=1/8$。条件付きエントロピーは

$$
H(\widehat X|X)=\frac34h_2(0)+\frac14h_2(1/2)=\frac14.
$$

ゆえに $I_Q=H(\widehat X)-H(\widehat X|X)=h_2(1/8)-1/4$。これは許容歪み $1/8$ を満たす一つの $Q$ の値であるため、[有限情報源の率歪み関数](#def-info8-rate-distortion)から $R(1/8)\le h_2(1/8)-1/4$。上界であって下界ではありません。
<!-- solution-end -->

#### A4. 公平二値の三つの歪み制約

公平二値情報源の Hamming 歪みについて $D=0,1/4,3/4$ の率歪み関数をそれぞれ求めよ。$D=3/4$ のとき $1-h_2(3/4)$ と答えてはいけない理由も述べよ。

- Level: A
- ID: INFO8-A4

<!-- solution-start -->
**詳細解答**　[公平二値情報源の率歪み関数](#thm-info8-binary)から $R(0)=1-h_2(0)=1$、$R(1/4)=1-h_2(1/4)$、$R(3/4)=0$ です。$D=3/4$ では定数0を常に復元するだけで平均歪み $1/2\le3/4$、率0が可能です。二元対称核の反転確率を $3/4$ に固定する必要はなく、「歪みは $D$ と等しい」でなく「$D$ **以下**」が制約です。
<!-- solution-end -->

### Level B：不等式の向き・独立性・被覆

#### B1. 零歪みの一般離散情報源

$\mathcal X=\widehat{\mathcal X}$ を有限集合、$d(x,\hat x)=\mathbf1_{\{x\ne\hat x\}}$ とする。任意の分布 $p$ について $R(0)=H(X)$ を証明せよ。零確率の記号を含んでもよい。

- Level: B
- ID: INFO8-B1

<!-- solution-start -->
**詳細解答**　$D(Q)\le0$ と非負性から $P(X\ne\widehat X)=0$、従って $\widehat X=X$ が確率1で成立します。ゆえに $H(X|\widehat X)=0$、[相互情報量](../INFO1/index.md#def-info1-mutual-information)は $I(X;\widehat X)=H(X)$ です。逆に $Q(\hat x|x)=\mathbf1_{\{\hat x=x\}}$ は歪み0、情報量 $H(X)$ を達成します。$p(x)=0$ の $x$ の行は最適値に影響しないため、台の外の確率を割り算に使う必要はありません。
<!-- solution-end -->

#### B2. 二つの復元規則を混ぜる

公平二値情報源の Hamming 歪みを考える。$Q_1$ は $\widehat X=X$、$Q_0$ は常に $\widehat X=0$ とする。$Q_\lambda=\lambda Q_1+(1-\lambda)Q_0$、$0\le\lambda\le1$ の歪みと相互情報量を求め、凸性からの上界 $I_{Q_\lambda}\le\lambda$ を確認せよ。

- Level: B
- ID: INFO8-B2

<!-- solution-start -->
**詳細解答**　$X=0$ なら $\widehat X=0$ が確率1、$X=1$ なら $\widehat X=1$ が確率 $\lambda$ です。従って不一致は $X=1$ から0へ復元される場合だけで

$$
D(Q_\lambda)=\frac12(1-\lambda).
$$

$P(\widehat X=1)=\lambda/2$、また $H(\widehat X|X=0)=0$、$H(\widehat X|X=1)=h_2(\lambda)$ なので

$$
I_{Q_\lambda}=h_2(\lambda/2)-\frac12h_2(\lambda).
$$

一方 $I_{Q_1}=1$、$I_{Q_0}=0$ であり、[相互情報量の核に関する凸性](#prop-info8-shape)を混合係数 $\lambda$ に適用すると $I_{Q_\lambda}\le\lambda I_{Q_1}+(1-\lambda)I_{Q_0}=\lambda$。端点 $\lambda=0,1$ は等号となります。
<!-- solution-end -->

#### B3. 被覆補題を数値的な指数にする

有限の試験核 $Q$ について $I_Q=1/4$、$D(Q)=1/5$ とする。閾値 $\varepsilon=1/20$、候補数 $M_n=\lceil 2^{(2/5)n}\rceil$ とする。[被覆補題](#lem-info8-covering)の「候補なし」確率上界を $\eta_n$ を用いて示し、その上界が0になる理由を述べよ。

- Level: B
- ID: INFO8-B3

<!-- solution-start -->
**詳細解答**　情報密度閾値は $I+\varepsilon=1/4+1/20=3/10$。従って $M_n\ge2^{(2/5)n}$ と[被覆補題](#lem-info8-covering)より

$$
\begin{aligned}
P(\text{候補なし})
&\le2\eta_n+\exp\left(-\frac{M_n}{2}2^{-3n/10}\right)\\
&\le2\eta_n+\exp\left(-\frac12\,2^{n(2/5-3/10)}\right)\\
&=2\eta_n+\exp\left(-2^{n/10}/2\right).
\end{aligned}
$$

$\eta_n\to0$ は歪みと情報密度という有界な独立同分布変数の標本平均の分散が、いずれも一文字分散を $n$ で割った値となり0へ収束するためです。指数の内部は $2^{n/10}/2\to\infty$ なので第二項も0へ収束します。$D(Q)=1/5$ は候補がある場合に一記号歪みが $1/5+1/20=1/4$ 以下となる側で使われ、候補がある確率の指数に直接は入りません。
<!-- solution-end -->

#### B4. 独立同分布条件を抜かせない

$X_1=X_2=Z$、$Z$ は公平二値とし、復元歪みは Hamming、$n=2$ とする。$M=2$ の符号で歪み0を達成できることを示せ。もし誤って $X_1,X_2$ を独立同分布と仮定して公平二値の $R(0)=1$ を[有限長逆定理](#thm-info8-converse)へ代入すると何が矛盾するか、証明中で壊れる等式を特定せよ。

- Level: B
- ID: INFO8-B4

<!-- solution-start -->
**詳細解答**　入力は $(0,0)$ または $(1,1)$ の二種類だけです。符号器は $(0,0)$ を番号1、$(1,1)$ を番号2に送り、それ以外の入力列も例えば番号1に写す全域写像とします。復号器は1を $(0,0)$、2を $(1,1)$ に写します。実際に現れる入力列では歪み0、率は $(\log_22)/2=1/2$ です。誤って公平二値の $R(0)=1$ を入れると $1/2\ge1$ を主張してしまいます。[逆定理](#thm-info8-converse)の証明で本質的なのは $H(X^2)=H(X_1)+H(X_2)$ の独立性による等式で、ここでは $H(X^2)=H(Z)=1$ に対し右辺は $1+1=2$ となり成立しません。
<!-- solution-end -->

### Level C：定理・符号・極限を統合する

#### C1. 二値情報源の率歪み符号化を最初からつなぐ

公平二値独立同分布情報源と Hamming 歪みを考える。

1. 任意の一文字復元規則 $Q$ に対して、$0\le D\le1/2$、$D(Q)\le D$ なら $I_Q\ge1-h_2(D)$ を導け。
2. その下界に一致する $Q$ を構成し、$D=1/4$ における $R(D)$ を決めよ。
3. $n=2$ で先頭ビットだけを伝えて $(X_1,X_1)$ と復元する決定的符号の歪みと率を求め、有限長逆定理の数値的不等式を確認せよ。
4. 任意の $r>R(1/4)$ について、ランダム復元候補の分布と情報密度閾値を指定し、期待歪みの上極限を $1/4$ 以下にする決定的符号列が存在する理由を、指数の符号まで示して説明せよ。
5. $D=0$ と $D\ge1/2$ の端点を求め、この証明を相関二値情報源へそのまま延ばせない箇所を示せ。

- Level: C
- ID: INFO8-C1

<!-- solution-start -->
**詳細解答**

**(1)** $E=X\oplus\widehat X$ と置くと、$\widehat X$ が与えられたとき $X$ と $E$ は一対一対応です。従って $H(X|\widehat X)=H(E|\widehat X)\le H(E)$ です。$\delta=P(E=1)=D(Q)\le D\le1/2$ とすると

$$
I_Q=H(X)-H(X|\widehat X)
\ge1-h_2(\delta)\ge1-h_2(D).
$$

最後は $h_2'(t)=\log_2((1-t)/t)\ge0$（$0<t\le1/2$）と端点連続性によります。

**(2)** $N\sim\operatorname{Bernoulli}(1/4)$ を $X$ と独立にし、$\widehat X=X\oplus N$ とします。$D(Q)=P(N=1)=1/4$、$\widehat X$ は公平二値、$H(\widehat X|X)=H(N)=h_2(1/4)$ です。従って $I_Q=1-h_2(1/4)$ が下界と一致し、$R(1/4)=1-h_2(1/4)$ です。

**(3)** 符号器は $X_1$ を1ビットとして送り、復号器は二位置とも受け取ったビットを復元します。$P(X_1\ne X_2)=1/2$ なので $\Delta_2=(0+1/2)/2=1/4$、率は $r_2=\log_22/2=1/2$ です。[有限長逆定理](#thm-info8-converse)は

$$
\frac12\ge 1-h_2(1/4)
$$

と述べており、$h_2(1/4)=1/2+(3/4)\log_2(4/3)>1/2$ なので成り立ちます。

**(4)** 第2問の核 $Q_*$ とその周辺 $\widehat X$ の公平二値分布 $q(0)=q(1)=1/2$ を使います。$I=R(1/4)$。$0<\varepsilon<r-I$ として $M_n=\lceil2^{nr}\rceil$ 個の復元列を独立に $q^n$ から引きます。入力列と候補列の組で、一記号平均 Hamming 歪みが $1/4+\varepsilon$ 以下かつ情報密度平均が $I+\varepsilon$ 以下となる候補を選びます。[被覆補題](#lem-info8-covering)から候補なしの確率は

$$
2\eta_n+\exp\left(-2^{n(r-I-\varepsilon)}/2\right)
$$

以下です。$\eta_n\to0$ かつ $r-I-\varepsilon>0$ なので両項は消え、平均符号帳から良い決定的符号を固定できます。固定 $\varepsilon$ では上極限 $1/4+\varepsilon$ までしかいえませんが、[達成可能性定理の対角化](#thm-info8-achievability)のように $\varepsilon_k\downarrow0$ で区切り長を増やせば $\limsup\Delta_n\le1/4$ となります。

**(5)** $D=0$ なら $R(0)=H(X)=1$。$D\ge1/2$ なら定数復元で率0、$R(D)=0$ です。第3問の有限長逆定理は $H(X^n)=\sum_iH(X_i)$ を用いたので、相関列ではこの等式が壊れ得ます。第4問の被覆補題も $(X_i,\widehat X_i)$ の独立同分布に基づく座標平均の分散 $\operatorname{Var}(Z_1)/n$ という評価を使っているため、情報源に相関がある場合に同じ積分布を勝手に置くことはできません。
<!-- solution-end -->

---

率歪み関数は「許容歪みを固定すると、復元値に最低どれだけの情報を残す必要があるか」を表します。有限情報源では、[有限長逆定理](#thm-info8-converse)と[ランダム被覆による達成可能性](#thm-info8-achievability)が一致し、計算した一記号あたりの最小情報量がブロック符号の限界になります。連続値情報源では密度や微分エントロピーの扱いが別途必要であり、有限和とコンパクト性に基づく今回の証明をそのまま転用することはできません。
