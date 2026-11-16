# U2-05 Kalman フィルタの更新：innovation と不確実性の縮小

前講の[線形 Gaussian 運動の予測公式](../U2-04/index.md#thm-u2-04-gaussian-prediction)で、ロボットが動いた直後、センサーを読む**前**の分布を求めました。しかし予測位置が 2 m、センサーが 5 m を示したとき、ただ 5 m に飛びつくのは危険です。センサーにも誤差があり、予測と測定のどちらを重く見るかは**両方の不確実性**で決まります。

ここでは観測値と予測観測の差を調べ、どれだけ平均を修正するかを計算し、観測後の分散共分散を二通りの式で照合します。正規分布・独立雑音という仮定が何に効くか、巨大な残差が分散まで自動的に大きくするわけではないことも区別します。

<!-- definition-example-audit: strict -->

## 1. 観測する前に、差とそのばらつきを予測する

時刻 $t\ge1$ の状態を $X_t\in\mathbb R^n$ とします。$D_{t-1}$ は前時刻までの観測と既知の入力の履歴です。以下では $D_{t-1}$ を固定して、[予測 belief](../U2-04/index.md#def-u2-04-predicted-belief)が

$$
X_t\mid D_{t-1}\sim N(m_t^-,P_t^-),\qquad P_t^-\succ0
$$

であると仮定します。$m_t^-$ は観測前の平均、$P_t^-$ は観測前の対称正定値な分散共分散行列です。[U2-04 の正定値条件](../U2-04/index.md#prop-u2-04-positive-definite)は、運動によってこれが保証される状況を教えます。

センサーが $p\ge1$ 個の実数値を返すとし、観測行列 $H_t\in\mathbb R^{p\times n}$ とセンサー誤差 $E_t\in\mathbb R^p$ によって

$$
Z_t=H_tX_t+E_t,\qquad E_t\sim N(0,R_t)
$$

とモデル化します。$R_t\in\mathbb R^{p\times p}$ は対称正定値、$E_t$ は $(X_t,D_{t-1})$ と独立です。これは[線形 Gaussian 観測模型](../U2-03/index.md#def-u2-03-linear-observation)を時刻 $t$ に使ったもので、$R_t$ は**観測雑音**の共分散です。前講の過程雑音 $Q_t$ とは違います。実際の観測値を $z_t\in\mathbb R^p$ と書きます。

予測平均 $m_t^-$ をセンサー式 $H_tx$ に入れると $H_tm_t^-$ が**予測観測値**です。まだ測定していない観測 $Z_t$ と予測観測値との差はランダムであり、一度測った $z_t$ との差は確定した数です。この違いを守ります。

<a id="def-u2-05-innovation"></a>

<!-- formal-statement-start -->
> **定義（innovation と innovation 共分散）**  
> $n,p\ge1$、$P_t^-\succ0$、$H_t\in\mathbb R^{p\times n}$、$R_t\succ0$ とし、上の独立な線形 Gaussian 観測模型を固定する。観測前のランダムな **innovation** を $\mathcal V_t=Z_t-H_tm_t^-$、その実現値を $\nu_t=z_t-H_tm_t^-$ とする。観測前の **innovation covariance** を

$$
S_t=\operatorname{Cov}(\mathcal V_t\mid D_{t-1})
    =H_tP_t^-H_t^T+R_t
$$

> とする。ここで $\nu_t\in\mathbb R^p$、$S_t\in\mathbb R^{p\times p}$ である。
<!-- formal-statement-end -->

「innovation」は、観測のうち予測から説明できなかった部分です。平均との差が大きいかどうかを判断するときには、差そのものだけでなく $S_t$ の大きさを見る必要があります。

<!-- definition-example-start: def-u2-05-innovation -->
**定義の直接確認**：廊下の位置を $X_t\sim N(2,4)$ m、センサーを $Z_t=X_t+E_t$、$E_t\sim N(0,1)$ m（独立）とします。$n=p=1,H_t=1,R_t=1$ m² です。測定値が $z_t=5$ m なら

$$
\nu_t=5-1\cdot2=3\ {\rm m},\qquad S_t=1\cdot4\cdot1+1=5\ {\rm m}^2.
$$

測定前には $\mathcal V_t=(X_t-2)+E_t$ であり、独立で両項が平均0なので平均は0、分散は $4+1=5$ です。$S_t$ は標本一個の $\nu_t^2=9$ ではありません。$S_t=5>0$ なので逆数を取れます。
<!-- definition-example-end -->

一般の場合にも、条件付き平均を取ると $\mathbb E[\mathcal V_t\mid D_{t-1}]=0$ です。$X_t-m_t^-$ と $E_t$ の交差共分散は独立性により0なので

$$
\begin{aligned}
\operatorname{Cov}(\mathcal V_t\mid D_{t-1})
 &=\operatorname{Cov}(H_t(X_t-m_t^-)+E_t\mid D_{t-1})\\
 &=H_tP_t^-H_t^T+R_t.
\end{aligned}
$$

非零の $a\in\mathbb R^p$ に対し $a^TS_ta=(H_t^Ta)^TP_t^-(H_t^Ta)+a^TR_ta>0$ です。**$H_t$ が階数不足でも $S_t\succ0$ で可逆**という結論は $R_t\succ0$ のためです。

## 2. 差の何割を平均へ戻すか

例えば位置予測が不確かでセンサーが精密なら大きく修正します。反対に、センサーが不確かなら少しだけ修正します。ここでは観測の差を状態 $n$ 成分へ戻す $n\times p$ 行列を考えます。残差を単純に足すだけでは $p\ne n$ のとき次元さえ合いません。

<a id="def-u2-05-gain"></a>

<!-- formal-statement-start -->
> **定義（Kalman gain と線形補正）**  
> 上の観測模型で、観測前の $P_t^-\succ0$、$H_t\in\mathbb R^{p\times n}$、$S_t=H_tP_t^-H_t^T+R_t\succ0$ に対し **Kalman gain** を

$$
K_t=P_t^-H_t^TS_t^{-1}\in\mathbb R^{n\times p}
$$

> とする。観測 $z_t$ から作る状態平均の線形補正候補は $m_t^-+L\nu_t$（$L\in\mathbb R^{n\times p}$）であり、$L=K_t$ の場合を Kalman 補正と呼ぶ。
<!-- formal-statement-end -->

$P_t^-H_t^T$ は、状態の予測誤差と innovation の**交差共分散**です。実際、

$$
\operatorname{Cov}(X_t-m_t^-,\mathcal V_t\mid D_{t-1})
 =P_t^-H_t^T,
$$

であり、$\operatorname{Cov}(X_t-m_t^-,E_t\mid D_{t-1})=0$ を使いました。$S_t^{-1}$ は観測残差の不確実性に応じて重みを調整します。

<!-- definition-example-start: def-u2-05-gain -->
**定義の直接確認**：先ほどの位置では $P_t^-=4,H_t=1,S_t=5$ より $K_t=4/5$（無次元）です。$L=K_t$ なら補正後の候補平均は $2+(4/5)\cdot3=22/5$ m です。$R_t$ を大きくすれば $S_t$ だけが大きくなり $K_t$ は小さくなるので、「観測の信頼度が下がれば補正を弱める」という意味と一致します。
<!-- definition-example-end -->

この $K_t$ は単なる経験的重みではありません。任意の補正行列 $L$ に対し、測定**前**に想定する推定誤差は

$$
e(L)=X_t-m_t^--L\mathcal V_t
    =(I-LH_t)(X_t-m_t^-)-LE_t.
$$

ここで $I$ は $n\times n$ 単位行列です。独立性より誤差の共分散は

$$
M(L)=(I-LH_t)P_t^-(I-LH_t)^T+LR_tL^T.
$$

展開して $S_t$ をまとめると

$$
M(L)=P_t^--LP_t^-H_t^T-H_tP_t^-L^T+LS_tL^T.
$$

ただし二つ目の項の正しい行列積は $-LP_t^-H_t^T$ ではなく **$-LH_tP_t^-$** です。次元を揃えた正しい展開を以後用います。

$$
M(L)=P_t^--LH_tP_t^--P_t^-H_t^TL^T+LS_tL^T.
$$

$K_tS_t=P_t^-H_t^T$ と $S_tK_t^T=H_tP_t^-$ を代入すると、平方完成に対応する行列等式

$$
\boxed{M(L)=M(K_t)+(L-K_t)S_t(L-K_t)^T}
$$

を得ます。任意の $v\in\mathbb R^n$ に対し追加項の二次形式は非負なので、$K_t$ は**すべての方向で誤差共分散を最小にする**補正です。$S_t\succ0$ であるため、$M(L)=M(K_t)$ が成り立つのは $L=K_t$ のときだけです。

## 3. 観測後の Gaussian 分布を計算する

[前々講の Gaussian 事後更新](../U2-03/index.md#prop-u2-03-robot-posterior)では、事前と尤度の積を平方完成しました。それを時刻 $t$ の予測分布に適用すれば事後は Gaussian になります。ただし、前講から今講へ引き継ぐのは **$m_t^-,P_t^-$** であって $m_{t-1}^+,P_{t-1}^+$ ではありません。

観測 $Z_t=z_t$ を条件に加えた履歴を $D_t=(D_{t-1},z_t)$ と書きます。連続型の観測では $P(Z_t=z_t)=0$ でも、事後密度は条件付き密度の意味で定義されます。

<a id="thm-u2-05-update"></a>

<!-- formal-statement-start -->
> **定理（Kalman フィルタの Gaussian 観測更新）**  
> $t\ge1$、$n,p\ge1$ とする。$X_t\mid D_{t-1}\sim N(m_t^-,P_t^-)$、$P_t^-\succ0$、$Z_t=H_tX_t+E_t$、$H_t\in\mathbb R^{p\times n}$、$E_t\sim N(0,R_t)$、$R_t\succ0$ とし、$E_t$ は $(X_t,D_{t-1})$ と独立とする。$z_t\in\mathbb R^p$ は実測値である。$S_t=H_tP_t^-H_t^T+R_t$、$\nu_t=z_t-H_tm_t^-$、$K_t=P_t^-H_t^TS_t^{-1}$ と置く。このとき $S_t\succ0$ であり、観測後の分布は $N(m_t^+,P_t^+)$ で、

$$
\boxed{m_t^+=m_t^-+K_t\nu_t}
$$

$$
\boxed{P_t^+=P_t^--K_tH_tP_t^-}
$$

> となる。$P_t^+$ は観測値 $z_t$ には依存せず、対称正定値である。また、情報形式は

$$
(P_t^+)^{-1}=(P_t^-)^{-1}+H_t^TR_t^{-1}H_t
$$

> で与えられる。
<!-- formal-statement-end -->

**証明の見取り図**：既習の平方完成で、まず事後の精度行列と平均を得ます。次に $S_t=H_tP_t^-H_t^T+R_t$ を利用して逆行列を消去し、残差による平均補正と減算型の共分散式へ書き換えます。単に「逆行列の公式より」と飛ばさず、行列積で両式を確かめます。

<!-- proof-start -->
### 証明

読みやすくするためこの証明だけ $P=P_t^-$、$H=H_t$、$R=R_t$、$S=HPH^T+R$、$m=m_t^-$、$z=z_t$ と略します。$P\succ0,R\succ0$ より $S\succ0$ であり、すべての逆行列が存在します。

[線形 Gaussian 位置観測の事後更新](../U2-03/index.md#prop-u2-03-robot-posterior)に事前平均 $a=m$、事前共分散 $P$、観測行列 $H$、雑音共分散 $R$ を代入すると、事後の精度と平均は

$$
\Lambda=P^{-1}+H^TR^{-1}H,\quad
P^+=\Lambda^{-1},\quad
m^+=P^+(P^{-1}m+H^TR^{-1}z).
$$

です。$\Lambda\succ0$ であることも前々講の定理の仮定・証明から保証されます。

まず共分散候補を $C=P-PH^TS^{-1}HP$ とします。$HPH^T=S-R$ を用いて

$$
\begin{aligned}
\Lambda C
&=I-H^TS^{-1}HP+H^TR^{-1}HP\\
&\quad-H^TR^{-1}HPH^TS^{-1}HP\\
&=I+H^T\{R^{-1}-S^{-1}-R^{-1}(S-R)S^{-1}\}HP\\
&=I+H^T\{R^{-1}-S^{-1}-R^{-1}+S^{-1}\}HP=I.
\end{aligned}
$$

従って $\Lambda$ が可逆なので $C=\Lambda^{-1}=P^+$ です。$K=PH^TS^{-1}$ と置けば

$$
P^+=P-KHP.
$$

次に $\Lambda m=P^{-1}m+H^TR^{-1}Hm$ より、平均の差は

$$
m^+-m=P^+H^TR^{-1}(z-Hm).
$$

ここで

$$
\begin{aligned}
P^+H^TR^{-1}
&=(P-PH^TS^{-1}HP)H^TR^{-1}\\
&=PH^T(I-S^{-1}HPH^T)R^{-1}\\
&=PH^TS^{-1}(S-HPH^T)R^{-1}\\
&=PH^TS^{-1}RR^{-1}=K.
\end{aligned}
$$

ゆえに $m^+=m+K(z-Hm)$ です。事後が Gaussian で、その共分散 $P^+=\Lambda^{-1}$ が正定値なことは既習の更新定理により保証されます。また $P^+$ は $P,H,R$ のみで決まり、実測値 $z$ を含みません。$\square$
<!-- proof-end -->

**1次元での結果**：$m_t^-=2,P_t^-=4,H_t=1,R_t=1,z_t=5$ なら、$S_t=5$、$K_t=4/5$ から

$$
m_t^+=2+\frac45(5-2)=\frac{22}{5},\qquad
P_t^+=4-\frac45\cdot1\cdot4=\frac45.
$$

予測平均 2 m は観測 5 m の側へ動き、位置分散は 4 m² から $4/5$ m² へ減少しました。**推定の平均は観測値で変わり、共分散はこの理想化した既知分散・既知対応の線形 Gaussian 模型では値に依存しません。**

## 4. Joseph 形：正定値性を見える形で守る

標準の $P_t^-=P_t^++K_tH_tP_t^-$ という減算型の更新は計算が短い一方、有限精度計算では近い数の引き算で対称性・半正定値性が損なわれるおそれがあります。先ほどの誤差式を使い、正定値行列の和として共分散を表す方法があります。

<a id="prop-u2-05-joseph"></a>

<!-- formal-statement-start -->
> **命題（Joseph 形と標準形の同値性）**  
> [Kalman 観測更新定理](#thm-u2-05-update)の仮定を置く。$I_n$ を $n\times n$ 単位行列とする。$K_t=P_t^-H_t^TS_t^{-1}$ に対して

$$
\boxed{
P_t^+=(I_n-K_tH_t)P_t^-(I_n-K_tH_t)^T
       +K_tR_tK_t^T
}
$$

> が成り立つ。この右辺を **Joseph 形**という。任意の $L\in\mathbb R^{n\times p}$ についても、$K_t$ を $L$ に置き換えた右辺は対称半正定値である。ただし $L\ne K_t$ の場合、一般には真の事後共分散とは一致しない。
<!-- formal-statement-end -->

**証明の見取り図**：観測する前の誤差を状態の誤差とセンサー誤差に分解し、交差項が独立性で消えることから和の形を得ます。標準形との同値性には $K_tS_t=P_t^-H_t^T$ を使います。

<!-- proof-start -->
### 証明

$e^-=X_t-m_t^-$、$\mathcal V_t=H_te^-+E_t$ とすると、Kalman 補正の測定前誤差は

$$
e^+=e^--K_t\mathcal V_t=(I_n-K_tH_t)e^--K_tE_t.
$$

$e^-$ と $E_t$ は条件付きで独立・平均0であるため、外積の交差2項の期待値は0です。よってその共分散は Joseph 形の右辺です。前節で、この補正が Gaussian 事後平均となることを示したので、これは $P_t^+$ と一致します。

直接展開しても

$$
\begin{aligned}
J&=P_t^--K_tH_tP_t^--P_t^-H_t^TK_t^T\\
 &\quad+K_t(H_tP_t^-H_t^T+R_t)K_t^T\\
 &=P_t^--K_tH_tP_t^--P_t^-H_t^TK_t^T+K_tS_tK_t^T.
\end{aligned}
$$

$K_tS_t=P_t^-H_t^T$ より、最後の項が $P_t^-H_t^TK_t^T$ を相殺し、$J=P_t^--K_tH_tP_t^-$ が得られます。

任意の $L$ について、非零とは限らない $v$ の二次形式は

$$
v^T\{(I-LH_t)P_t^-(I-LH_t)^T+LR_tL^T\}v
=\|P_t^{-1/2}P_t^-(I-LH_t)^Tv\|^2+\|R_t^{1/2}L^Tv\|^2\ge0.
$$

ここで $P_t^{1/2},R_t^{1/2}$ は対称正定値平方根です。より直接には、各項が正定値行列の合同変換だから半正定値です。$\square$
<!-- proof-end -->

上の二次形式は平方根を使って単純に

$$
\|(P_t^-)^{1/2}(I-LH_t)^Tv\|^2+\|R_t^{1/2}L^Tv\|^2
$$

と書けます。$P_t^-$ は正定値ですが $(I-LH_t)$ は可逆である必要はありません。Joseph 形は**対称な正の和**であることが見えやすい式です。ただし浮動小数点の丸めが全く無いと保証する式ではありません。

実数計算での同値性は、1次元 $P_t^-=4,R_t=1,H_t=1,K_t=4/5$ で直ちに確かめられます。

$$
(1-\tfrac45)^2\cdot4+(\tfrac45)^2\cdot1
=\tfrac4{25}+\tfrac{16}{25}=\tfrac45.
$$

## 5. どの方向の不確実性が縮むか

同じ観測を得ても、状態のすべての成分が等しく改善するわけではありません。たとえば一つの座標だけを直接測っても、事前共分散に相関があれば別の座標まで改善することがあります。

<a id="prop-u2-05-contraction"></a>

<!-- formal-statement-start -->
> **命題（Kalman 更新の共分散縮小と等号条件）**  
> [観測更新定理](#thm-u2-05-update)の仮定のもとで

$$
P_t^--P_t^+=K_tS_tK_t^T
=P_t^-H_t^TS_t^{-1}H_tP_t^-\succeq0
$$

> である。$v\in\mathbb R^n$ の分散が変わらないこと、すなわち $v^T(P_t^--P_t^+)v=0$ は、$H_tP_t^-v=0$ と同値である。さらに $P_t^+\succ0$ が成立する。
<!-- formal-statement-end -->

**証明の見取り図**：差を二次形式にして $S_t^{-1}\succ0$ を用います。等号は予測共分散を掛けた方向 $P_t^-v$ がセンサーから見えないときです。これは一般には $H_tv=0$ とは違います。

<!-- proof-start -->
### 証明

[更新公式](#thm-u2-05-update)を引き算すると

$$
P_t^--P_t^+=K_tH_tP_t^-
=P_t^-H_t^TS_t^{-1}H_tP_t^-.
$$

$K_tS_t=P_t^-H_t^T$、$S_t=S_t^T$ なので $K_tH_tP_t^-=K_tS_tK_t^T$ とも書けます。任意の $v$ に対し

$$
v^T(P_t^--P_t^+)v
=(H_tP_t^-v)^TS_t^{-1}(H_tP_t^-v)\ge0.
$$

$S_t^{-1}\succ0$ のため等号成立は $H_tP_t^-v=0$ と同値です。最後に[Gaussian 事後更新](#thm-u2-05-update)で $P_t^+=\{(P_t^-)^{-1}+H_t^TR_t^{-1}H_t\}^{-1}$ でした。括弧内は正定値行列と半正定値行列の和であり、非零 $v$ について厳密に正です。従ってその逆行列 $P_t^+$ も正定値です。$\square$
<!-- proof-end -->

[U2-03 の共分散縮小命題](../U2-03/index.md#prop-u2-03-covariance-contraction)と同じ現象ですが、ここでは innovation 共分散によって**どれだけ縮んだか**と縮まない方向まで具体的に判定できます。

<a id="prop-u2-05-noise-limits"></a>

<!-- formal-statement-start -->
> **命題（一次元観測雑音の極限）**  
> 一次元の観測前分布が $N(m,p)$、$p>0$、観測が $Z=X+E$、$E\sim N(0,r)$、$r>0$ で独立、実測値が $z$ とする。Kalman 更新は

$$
K=\frac{p}{p+r},\quad
m^+=\frac{rm+pz}{p+r},\quad
p^+=\frac{pr}{p+r}
$$

> である。$r\to\infty$ で $K\to0,m^+\to m,p^+\to p$、$r\downarrow0$ で $K\to1,m^+\to z,p^+\to0$ となる。
<!-- formal-statement-end -->

**証明の見取り図**：$S=p+r$ を代入して分母を揃え、$r$ の極限を取ります。後者の極限が退化しても、各 $r>0$ での更新定理の正定値仮定は保っています。

<!-- proof-start -->
### 証明

[Kalman 更新公式](#thm-u2-05-update)で $H=1,P^-=p,R=r$ と代入すると $S=p+r>0$ です。

$$
m^+=m+\frac{p}{p+r}(z-m)
=\frac{(p+r)m+pz-pm}{p+r}
=\frac{rm+pz}{p+r},
$$

$$
p^+=p-\frac{p^2}{p+r}
=\frac{p(p+r)-p^2}{p+r}
=\frac{pr}{p+r}.
$$

$r\to\infty$ では分子分母を $r$ で割ると $K\to0$、$m^+\to m$、$p^+\to p$ です。$r\downarrow0$ では分母が $p>0$ に近づくため $K\to1$、$m^+\to z$、$p^+\to0$ です。$\square$
<!-- proof-end -->

**適用範囲**：$r=0$ を正定値な観測雑音に含めてはいけません。$r\downarrow0$ はあくまでも**正の分散を持つ模型列の極限**です。観測行列が $H=0$ の場合、どれほど小さい $r>0$ でも $K=0$ となり、情報のない観測では更新できません。

## 6. 2次元の数値例：一つのセンサーが二つの値を動かす

予測状態 $X=(X_1,X_2)^T$ の平均・共分散を

$$
m^-=\begin{pmatrix}0\\0\end{pmatrix},\qquad
P^-=\begin{pmatrix}4&0\\0&1\end{pmatrix}
$$

とし、$H=\begin{pmatrix}1&1\end{pmatrix}$、$R=(1)$、実測 $z=3$ とします。センサーは $X_1+X_2$ を読むので、予測観測は0、innovation は3です。

$$
S=HP^-H^T+R=4+1+1=6,\qquad
K=P^-H^TS^{-1}=\frac16\begin{pmatrix}4\\1\end{pmatrix}.
$$

したがって平均は

$$
m^+=m^-+K(3)
=\begin{pmatrix}2\\1/2\end{pmatrix}.
$$

共分散を掛け算で確かめると

$$
\begin{aligned}
P^+&=P^--KHP^-\\
&=\begin{pmatrix}4&0\\0&1\end{pmatrix}
-\frac16\begin{pmatrix}4\\1\end{pmatrix}\begin{pmatrix}4&1\end{pmatrix}\\
&=\begin{pmatrix}4/3&-2/3\\-2/3&5/6\end{pmatrix}.
\end{aligned}
$$

$\det P^+=(4/3)(5/6)-(2/3)^2=2/3>0$、左上要素 $4/3>0$ なので対称正定値です。元は独立だった位置成分間に、観測後は負の共分散が生じます。「和が約3」と分かったため、一方が大きければ他方が小さい方向が相対的にあり得るからです。

ベクトル $v=(1,-4)^T$ では $HP^-v=(1,1)(4,-4)^T=0$、従って[縮小命題](#prop-u2-05-contraction)より $v^T(P^--P^+)v=0$ です。反対に $v=(0,1)^T$ では $HP^-v=1$ なので、$X_2$ を単独で測っていなくても分散が 1 から $5/6$ に減ります。

## 7. 観測モデルが間違っているときの落とし穴

この章の更新は、$H_t$ が観測に対応し、$R_t$ が既知で正定値、観測雑音が予測状態・過去から独立、という条件で**厳密**です。センサーの取り違え・外れ値・誤差分散の過小評価がある場合は、この式をただ実行しても正しい事後分布とは限りません。

- 実測 $z_t$ が予測より極端に遠い場合でも、上の模型で $K_t$ と $P_t^+$ は $z_t$ を含みません。大きく変わるのは $m_t^+$ です。大残差だけを理由に「更新で精度が高まった」と現実について断定できません。
- $R_t$ を本当より小さく置くと $S_t$ を過小評価し、$K_t$ は観測を過信します。失敗の仕組みは、独立で既知共分散という**尤度の指定が誤っている**ことです。
- $R_t=0$ と置くと、本章の $R_t^{-1}$ と通常の密度による平方完成が使えなくなります。観測に無誤差拘束がある退化 Gaussian 模型は別途扱う必要があります。

この限界を踏まえて、実際の座標・非線形センサーへ進むのが次の講義群です。

## 8. 再実行可能な数値検算

一次元・二次元・観測精度の比較を、Python の有理数で計算します。標準更新式、情報形式、Joseph 形の一致、対称性・正定値性、誤った行列形状の拒否を独立に検査できるようにしました。数値実験の結果は証明の代わりではなく、手計算で見落としやすい係数を確かめるものです。

~~~python-file-lab
# lab-id: U2-05-KALMAN-UPDATE
# lab-title: Kalman 更新：innovation・gain・Joseph 形を分数で検算
# lab-file: textbook/volumes/dream_thater/応用系/U/U2-05/assets/kalman_update.py
# timeout-ms: 30000
# lab-preset: 1次元の測定 | --scenario scalar
# lab-preset: 二次元の和を観測 | --scenario plane
# lab-preset: 観測雑音の大小 | --scenario noise
# lab-preset: 全項目の自己検査 | --self-test
~~~

## 9. 演習と詳細解答

### Level A：差・分散・gain を一段ずつ確認する

<a id="ex-u2-05-a01"></a>

**A1. innovation の二つの意味**

- Level: A

時刻 $t$ に $X_t\mid D_{t-1}\sim N(1,9)$、$Z_t=2X_t+E_t$、$E_t\sim N(0,4)$ で独立とする。$z_t=8$ を観測した。予測観測、実現 innovation $\nu_t$、予測 innovation 共分散 $S_t$ を求め、$S_t$ と $\nu_t^2$ が一般に違う理由を述べよ。

<!-- solution-start -->
**詳細解答**：$H_t=2$、$m_t^-=1$、$P_t^-=9$、$R_t=4$ です。[innovation の定義](#def-u2-05-innovation)から予測観測は $Hm^-=2$、実測との差は $\nu_t=8-2=6$ です。測定前の誤差は $\mathcal V_t=2(X_t-1)+E_t$ なので、独立性から

$$
S_t=2^2\cdot9+4=40,\qquad \nu_t^2=36.
$$

$S_t$ は**測定前の全標本にわたる分散**、$\nu_t^2$ は一度観測した差の平方です。観測が一個しかなくても $S_t$ は与えられた生成模型から計算できます。
<!-- solution-end -->

<a id="ex-u2-05-a02"></a>

**A2. 一次元の平均・分散更新**

- Level: A

$X\sim N(2,4)$、$Z=X+E$、$E\sim N(0,1)$ 独立、$z=5$ とする。$S,K,m^+,P^+$ を求めよ。平均・分散のそれぞれの単位を位置が m のときに答えよ。

<!-- solution-start -->
**詳細解答**：[更新定理](#thm-u2-05-update)で $H=1$ を代入します。

$$
S=4+1=5,\quad K=\frac45,\quad
m^+=2+\frac45(5-2)=\frac{22}{5},\quad
P^+=4-\frac45\cdot4=\frac45.
$$

$S$ と $P^+$ の単位は m²、$m^+$ は m、$K$ は観測と状態が同じ単位なので無次元です。$S$ は実測差の二乗ではありません。
<!-- solution-end -->

<a id="ex-u2-05-a03"></a>

**A3. 観測しない方向**

- Level: A

$P^-=\operatorname{diag}(4,9)$、$H=(1,0)$、$R=(1)$ とする。$S,K,P^+$ を求め、二番目の座標の分散が変わらない理由を説明せよ。

<!-- solution-start -->
**詳細解答**：$HP^-H^T=4$ なので $S=5$、$P^-H^T=(4,0)^T$ より

$$
K=\begin{pmatrix}4/5\\0\end{pmatrix},\qquad
P^+=\begin{pmatrix}4&0\\0&9\end{pmatrix}
-\begin{pmatrix}4/5\\0\end{pmatrix}\begin{pmatrix}4&0\end{pmatrix}
=\begin{pmatrix}4/5&0\\0&9\end{pmatrix}.
$$

[縮小命題](#prop-u2-05-contraction)に $v=(0,1)^T$ を代入すると $HP^-v=0$ です。今回は事前に座標間の共分散がなく、第一座標の観測から第二座標を推測できません。
<!-- solution-end -->

<a id="ex-u2-05-a04"></a>

**A4. Joseph 形を手で照合する**

- Level: A

一次元で $P^-=3,H=2,R=4$ とする。$K$、標準形の $P^+$、Joseph 形の $P^+$ を求めて比較せよ。

<!-- solution-start -->
**詳細解答**：$S=HP^-H^T+R=2\cdot3\cdot2+4=16$、$K=P^-H^T/S=6/16=3/8$ です。[更新定理](#thm-u2-05-update)により

$$
P^+=3-\frac38\cdot2\cdot3=\frac34.
$$

[Joseph 形](#prop-u2-05-joseph)では $1-KH=1-3/4=1/4$ なので

$$
P^+_{\rm J}=(1/4)^2\cdot3+(3/8)^2\cdot4
=\frac3{16}+\frac9{16}=\frac34.
$$

両者は一致し、どちらも正です。
<!-- solution-end -->

<a id="ex-u2-05-a05"></a>

**A5. 分散と観測値の役割**

- Level: A

同一の $m^-=2,P^-=4,H=1,R=1$ で、実測 $z=5$ と $z=100$ の二通りを考える。二つの事後平均・事後分散を計算し、「大残差では必ず事後分散が大きくなる」という主張の妥当性を判定せよ。

<!-- solution-start -->
**詳細解答**：いずれも $S=5,K=4/5$ です。$z=5$ の平均は $22/5$、$z=100$ の場合の差は $100-2=98$ なので

$$
m^+(100)=2+\frac45\cdot98=\frac{402}{5}.
$$

両方とも

$$
P^+=4-\frac45\cdot4=\frac45.
$$

従って主張は、この**観測値から独立な共分散を持つ Gaussian 模型の下では偽**です。現実に $z=100$ が異常である可能性と、正しい模型の下で計算した事後共分散は分けて考えます。
<!-- solution-end -->

### Level B：二つの表現・相関・モデルを接続する

<a id="ex-u2-05-b01"></a>

**B1. 平方完成による gain の再導出**

- Level: B

一次元で $X\sim N(m,p)$、$p>0$、$Z=X+E$、$E\sim N(0,r)$、$r>0$、$z$ を観測したとする。事前密度と尤度の積の指数部を平方完成し、Kalman の $m^+,p^+$ と一致することを示せ。

<!-- solution-start -->
**詳細解答**：[前々講の更新の考え方](../U2-03/index.md#prop-u2-03-robot-posterior)に従い、$x$ に依存する負の対数密度を定数項を除いて書くと

$$
\frac{(x-m)^2}{2p}+\frac{(z-x)^2}{2r}
=\frac12\left\{\left(\frac1p+\frac1r\right)x^2
-2\left(\frac mp+\frac zr\right)x\right\}+\text{定数}.
$$

$\lambda=1/p+1/r=(p+r)/(pr)>0$、$\eta=m/p+z/r$ とすれば

$$
\frac12\lambda x^2-\eta x
=\frac\lambda2\left(x-\frac\eta\lambda\right)^2-\frac{\eta^2}{2\lambda}.
$$

したがって

$$
p^+=\lambda^{-1}=\frac{pr}{p+r},\qquad
m^+=\frac\eta\lambda=\frac{rm+pz}{p+r}
=m+\frac{p}{p+r}(z-m).
$$

一方 [Kalman 更新定理](#thm-u2-05-update)では $S=p+r,K=p/(p+r)$ ですから、同じ二式が得られます。
<!-- solution-end -->

<a id="ex-u2-05-b02"></a>

**B2. 直接測らない成分まで変わる**

- Level: B

$X=(X_1,X_2)^T$ に対し $m^-=(0,0)^T$、$P^-=\left(\begin{smallmatrix}2&1\\1&2\end{smallmatrix}\right)$、$H=(1,0)$、$R=1$、$z=3$ とする。$K,m^+,P^+$ と $P^+$ の正定値性を計算せよ。「第二成分を測っていないからその平均は変わらない」という誤りを説明せよ。

<!-- solution-start -->
**詳細解答**：$P^-\succ0$ は左上要素 $2>0$ と行列式 $4-1=3>0$ から確認できます。$S=HP^-H^T+1=3$、$P^-H^T=(2,1)^T$ より

$$
K=\begin{pmatrix}2/3\\1/3\end{pmatrix},\qquad
m^+=K(3)=\begin{pmatrix}2\\1\end{pmatrix}.
$$

共分散は $HP^-=(2,1)$ なので

$$
P^+=\begin{pmatrix}2&1\\1&2\end{pmatrix}
-\frac13\begin{pmatrix}2\\1\end{pmatrix}\begin{pmatrix}2&1\end{pmatrix}
=\begin{pmatrix}2/3&1/3\\1/3&5/3\end{pmatrix}.
$$

左上要素 $2/3>0$、行列式 $10/9-1/9=1>0$ だから正定値です。事前共分散 $(P^-)_{21}=1$ により、第一成分の観測と第二成分の誤差が相関します。このため $K_2=1/3\ne0$ となり、平均 $X_2$ も更新されます。
<!-- solution-end -->

<a id="ex-u2-05-b03"></a>

**B3. まったく状態を読まないセンサー**

- Level: B

$P^-\succ0$、$H$ を全成分0の $p\times n$ 行列、$R\succ0$ とする。$S,K,m^+,P^+$ を求め、$R$ が非常に小さくても状態が更新されない理由を述べよ。

<!-- solution-start -->
**詳細解答**：[innovation の定義](#def-u2-05-innovation)で $S=HP^-H^T+R=R\succ0$ です。$P^-H^T=0$ なので

$$
K=P^-H^TR^{-1}=0,\qquad m^+=m^-+0\cdot z=m^-,
$$

$$
P^+=P^--0\cdot HP^-=P^-.
$$

$Z=E$ が状態 $X$ から独立なので、精密でも**状態について情報を与えない**観測です。精度の良さ $R$ と、何を観測しているか $H$ を区別する必要があります。
<!-- solution-end -->

<a id="ex-u2-05-b04"></a>

**B4. 独立な二回の観測と一度の情報更新**

- Level: B

初め $X\sim N(0,4)$、同一の静止状態を独立な $E_1,E_2\sim N(0,4)$ により $Z_i=X+E_i$ と測る。実測は $z_1=2,z_2=4$ とする。Kalman 形式で順次更新し、二つの尤度を一度に掛けた情報形式と一致することを確認せよ。

<!-- solution-start -->
**詳細解答**：条件付き独立な二観測のため、初回は $S_1=4+4=8,K_1=4/8=1/2$ です。

$$
m_1=0+\frac12(2-0)=1,\qquad
P_1=4-\frac12\cdot4=2.
$$

二回目は**一回目の事後**を事前として $S_2=2+4=6,K_2=2/6=1/3$ を用い、

$$
m_2=1+\frac13(4-1)=2,\qquad
P_2=2-\frac13\cdot2=\frac43.
$$

一度に尤度を掛ける場合は[Gaussian 事後更新の情報形式](../U2-03/index.md#prop-u2-03-robot-posterior)を二つの独立項について展開し、

$$
\lambda=\frac14+\frac14+\frac14=\frac34,\qquad
\eta=\frac04+\frac24+\frac44=\frac32
$$

となります。従って $P=\lambda^{-1}=4/3$、$m=\eta/\lambda=2$ で一致します。二回目に $P_0=4$ を再利用してはいけません。
<!-- solution-end -->

### Level C：予測・観測・Joseph 形を一つにまとめる

<a id="ex-u2-05-c01"></a>

**C1. 位置と速度を持つロボットの一時刻 Kalman フィルタ**

- Level: C

状態 $X_t=(\text{位置},\text{速度})^T$ を考える。時刻0の観測後 belief は $N(m_0^+,P_0^+)$ で

$$
m_0^+=\begin{pmatrix}0\\0\end{pmatrix},\qquad P_0^+=I_2.
$$

時刻1に $X_1=FX_0+W_1$、$F=\left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right)$、$W_1\sim N(0,Q)$、$Q=\operatorname{diag}(1,0)$ とする。$W_1$ は過去と独立であり、時刻間隔は1秒とする。続いて $Z_1=HX_1+E_1$、$H=(1,0)$、$E_1\sim N(0,1)$ は $(X_1,D_0)$ と独立で、実測は $z_1=2$ とする。

1. 時刻1の観測前 $m_1^-,P_1^-$ を求め、$P_1^-\succ0$ を確認せよ。
2. $\nu_1,S_1,K_1,m_1^+,P_1^+$ を求めよ。
3. $P_1^+$ が Joseph 形でも一致することを行列積で確かめよ。
4. $v=(1,-3)^T$ について分散が変わらないことを示し、「速度を直接測っていないから速度の平均も更新できない」という誤りを診断せよ。

<!-- solution-start -->
**詳細解答**：

**(1) 予測**：[前講の Gaussian 予測定理](../U2-04/index.md#thm-u2-04-gaussian-prediction)に $m_0^+=0,P_0^+=I_2,F,Q$ を代入します。$F I_2 F^T=FF^T$ であり、

$$
FF^T=\begin{pmatrix}1&1\\0&1\end{pmatrix}
\begin{pmatrix}1&0\\1&1\end{pmatrix}
=\begin{pmatrix}2&1\\1&1\end{pmatrix}.
$$

従って

$$
m_1^-=Fm_0^+=\begin{pmatrix}0\\0\end{pmatrix},\qquad
P_1^-=FF^T+Q=\begin{pmatrix}3&1\\1&1\end{pmatrix}.
$$

$P_1^-$ の左上要素は3、行列式は $3-1=2>0$ なので正定値です。過程雑音 $Q$ は退化していますが $F$ が可逆なため予測共分散は正定値です。

**(2) innovation と更新**：実測と予測観測はそれぞれ2と $Hm_1^-=0$ なので $\nu_1=2$ です。[innovation と gain の定義](#def-u2-05-innovation)から

$$
S_1=HP_1^-H^T+1=3+1=4,\qquad
K_1=\frac14\begin{pmatrix}3\\1\end{pmatrix}.
$$

[Kalman 更新定理](#thm-u2-05-update)により

$$
m_1^+=m_1^-+K_1\nu_1
=\begin{pmatrix}3/2\\1/2\end{pmatrix}.
$$

$HP_1^-=(3,1)$ なので

$$
\begin{aligned}
P_1^+&=P_1^--K_1HP_1^-\\
&=\begin{pmatrix}3&1\\1&1\end{pmatrix}
-\frac14\begin{pmatrix}3\\1\end{pmatrix}\begin{pmatrix}3&1\end{pmatrix}\\
&=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}.
\end{aligned}
$$

$P_1^+$ の行列式は $9/16-1/16=1/2>0$ で、正定値性とも一致します。

**(3) Joseph 形**：$I-K_1H=\left(\begin{smallmatrix}1/4&0\\-1/4&1\end{smallmatrix}\right)$ と置き、まず左から掛けます。

$$
(I-K_1H)P_1^-=
\begin{pmatrix}1/4&0\\-1/4&1\end{pmatrix}
\begin{pmatrix}3&1\\1&1\end{pmatrix}
=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}.
$$

右から転置を掛け、さらに $R=1$ の項を加えると

$$
\begin{aligned}
&(I-K_1H)P_1^-(I-K_1H)^T
=\begin{pmatrix}3/16&1/16\\1/16&11/16\end{pmatrix},\\
&K_1RK_1^T
=\begin{pmatrix}9/16&3/16\\3/16&1/16\end{pmatrix},\\
&P_{1,\mathrm J}^+
=\begin{pmatrix}12/16&4/16\\4/16&12/16\end{pmatrix}
=P_1^+.
\end{aligned}
$$

**(4) 分散の等号方向と速度**：$P_1^-v=(3-3,1-3)^T=(0,-2)^T$ です。従って $HP_1^-v=0$ であり、[縮小命題](#prop-u2-05-contraction)の等号条件を満たします。直接計算でも

$$
v^TP_1^-v=(1,-3)\begin{pmatrix}0\\-2\end{pmatrix}=6,\quad
P_1^+v=\begin{pmatrix}0\\-2\end{pmatrix},\quad
v^TP_1^+v=6
$$

で一致します。一方 $K_{1,2}=1/4$ なので、**速度の平均も0から $1/2$ に変わります**。運動で生じた位置と速度の共分散 $(P_1^-)_{12}=1$ を介して、位置観測が速度についても情報を与えたためです。
<!-- solution-end -->

## 10. 本講のまとめ

予測から更新までを一つの時間刻みとしてまとめると、

$$
\begin{aligned}
m_t^-&=F_tm_{t-1}^++B_tu_t+c_t,&
P_t^-&=F_tP_{t-1}^+F_t^T+Q_t,\\
\nu_t&=z_t-H_tm_t^-,&
S_t&=H_tP_t^-H_t^T+R_t,\\
K_t&=P_t^-H_t^TS_t^{-1},&
m_t^+&=m_t^-+K_t\nu_t,\\
P_t^+&=(I-K_tH_t)P_t^-(I-K_tH_t)^T+K_tR_tK_t^T.
\end{aligned}
$$

上二行の予測は[前講の定理](../U2-04/index.md#thm-u2-04-gaussian-prediction)から、更新は[本講の定理](#thm-u2-05-update)と[Joseph 形](#prop-u2-05-joseph)から得られます。**観測前 $-$ と観測後 $+$ の順番**、$Q_t$（走行誤差）と $R_t$（測定誤差）の違い、innovation の実現値とその予測共分散の違いを混ぜないことが重要です。

次の U2-06 では、ロボットの状態が位置だけでなく**平面の向き**を持つ場合を扱います。異なる座標系で同じ位置をどう表し、角度の差をどう計算するかが次の問題です。
