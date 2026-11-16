# U2-04 Kalman フィルタの予測：運動誤差の伝播

[U2-03 の線形 Gaussian 観測更新](../U2-03/index.md#prop-u2-03-robot-posterior)では、**観測する直前**の位置分布が既に与えられていました。しかし移動するロボットでは、その分布自体を前時刻から作らなければなりません。[密度版 Bayes フィルタ](../U2-02/index.md#thm-u2-02-density-filter)の予測積分を、毎回積分せず平均と分散共分散行列だけで計算できる条件を探します。

本講の中心は **時刻 $t-1$ の観測後 → 時刻 $t$ の観測前** です。位置や速度の推定値を移すだけではなく、推定誤差がどう広がり、どの方向に相関するかまで追います。新しい観測を取り込む Kalman 更新の導出は U2-05 で扱います。

## 1. 予測する量と添字を固定する

時刻 $t$ までに受けた観測・既知の操作の履歴を $D_t$ と書き、状態 $X_t\in\mathbb R^n$ を列ベクトルとします。$D_{t-1}$ まで分かった時点の状態分布を、[正定値 Gaussian belief](../U2-03/index.md#def-u2-03-gaussian-belief)により

$$
X_{t-1}\mid D_{t-1}\sim N(m_{t-1}^{+},P_{t-1}^{+})
$$

と表します。$m$ は平均、$P$ は分散共分散行列であり、$+$ は**その時刻の観測後**、$-$ は**その時刻の観測前**です。$P_{t-1}^{+}\succ0$ とし、前時刻のデータが確定した条件の下で考えます。列ベクトルの第 $i$ 成分の誤差と第 $j$ 成分の誤差の積の条件付き期待値が $P_{ij}$ です。たとえば位置の単位が m なら位置分散の単位は m² です。

指令 $u_t\in\mathbb R^k$ は、$D_{t-1}$ を見て決めてもよいものとします。ただし **$D_{t-1}$ を固定すれば値が既知**であり、新たなランダム誤差ではありません。ここでは既知行列 $F_t\in\mathbb R^{n\times n}$、$B_t\in\mathbb R^{n\times k}$ と既知のオフセット $c_t\in\mathbb R^n$ を用いて、運動を線形・アフィンに近似します。

新しい誤差 $W_t$ は運動を実行した際に付け加わるもので、既に位置を知らないことによる誤差とは区別します。運動が終わってから $X_t$ をセンサーで測る、という[運動・観測の生成順序](../U2-02/index.md#def-u2-02-conditional-model)と整合させます。

<a id="def-u2-04-linear-motion"></a>

<!-- formal-statement-start -->
> **定義（線形 Gaussian 運動模型）**  
> 整数 $n,k\ge1$ と時刻 $t\ge1$ を固定する。$D_{t-1}$ の下で既知の $F_t\in\mathbb R^{n\times n}$、$B_t\in\mathbb R^{n\times k}$、$u_t\in\mathbb R^k$、$c_t\in\mathbb R^n$ を用い、状態が次を満たすとする。

$$
X_t=F_tX_{t-1}+B_tu_t+c_t+W_t.
$$

> 過程雑音 $W_t\in\mathbb R^n$ は平均 $0$、実対称半正定値な分散共分散行列 $Q_t\in\mathbb R^{n\times n}$ を持つ Gaussian ベクトルで、$(X_{t-1},D_{t-1})$ と独立とする。半正定値には $Q_t=0$ も含み、退化した Gaussian は標準正規ベクトルの線形像として解釈する。$u_t$ はこの時刻の運動を決める入力であり、$W_t$ と同一視しない。
<!-- formal-statement-end -->

$F_tX_{t-1}$ は以前の状態の寄与、$B_tu_t+c_t$ は確定した指令・オフセットの寄与、$W_t$ は新しい運動誤差の寄与です。$F_t$ が位置と速度を混ぜる場合、行列の各成分には単位換算（例えば秒）が含まれます。$Q_t$ は **過程雑音の分散共分散**であり、センサーの観測雑音 $R_t$ とは異なります。

<!-- definition-example-start: def-u2-04-linear-motion -->
**定義の確認（廊下を3 m進む）**：$n=k=1$、$F_1=B_1=(1)$、$u_1=3$ m、$c_1=0$、$W_1\sim N(0,1)$ m とします。$Q_1=(1)$ m² は対称で、任意の実数 $v$ に対し $v^TQ_1v=v^2\ge0$ です。$W_1$ と移動前の位置・データが独立である運動モデルを指定したので、$X_1=X_0+3+W_1$ は定義を満たします。制御指令3 mそのものに分散1 m²を与えたのではなく、**3 m進むつもりでも生じる独立な走行誤差**に分散を与えています。
<!-- definition-example-end -->

<a id="def-u2-04-predicted-belief"></a>

観測値をまだ読まない段階で、新しい状態の分布を求めたいのです。[Bayes フィルタの予測段階](../U2-02/index.md#thm-u2-02-density-filter)に相当し、その後にはじめて観測を条件へ加えます。

<!-- formal-statement-start -->
> **定義（線形運動の予測 belief）**  
> 時刻 $t-1$ までの履歴 $D_{t-1}$、既知の時刻 $t$ の入力 $u_t$、[線形 Gaussian 運動模型](#def-u2-04-linear-motion)を固定する。観測 $Z_t$ を取り込む前の $X_t$ の条件付き分布を **予測 belief** とし、平均と分散共分散を次のように記す。

$$
m_t^-=\mathbb E[X_t\mid D_{t-1}],\qquad
P_t^-=\operatorname{Cov}(X_t\mid D_{t-1}).
$$

> 観測を取り込んだ後のものは $m_t^+,P_t^+$ と記す。上付き $-$ は負号でも添字 $t-1$ でもない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-04-predicted-belief -->
**定義の確認**：直前の廊下の模型で $X_0\mid D_0\sim N(2,4)$ m とします。$X_1= X_0+3+W_1$ なので、独立性から $\mathbb E[X_1\mid D_0]=2+3+0=5$ m です。中心からの誤差は $(X_0-2)+W_1$、交差積の期待値は独立かつ平均0のため0となり、分散は $4+1=5$ m² です。従って $m_1^-=5,\ P_1^-=5$ であり、まだ時刻1の観測は含まれていません。
<!-- definition-example-end -->

## 2. 平均と誤差を別々に伝播する

前時刻の推定誤差を $e_{t-1}=X_{t-1}-m_{t-1}^{+}$ と置けば、条件付きで平均0、分散共分散は $P_{t-1}^{+}$ です。運動の式へ代入すると

$$
X_t=F_tm_{t-1}^{+}+B_tu_t+c_t+F_te_{t-1}+W_t.
$$

第1の部分は確定した平均、第2の部分 $F_te_{t-1}+W_t$ が新たな誤差です。$F_t$ の前後の転置は単なる暗記ではなく、この**誤差の積を平均する**ことで生じます。

<a id="thm-u2-04-gaussian-prediction"></a>

<!-- formal-statement-start -->
> **定理（線形 Gaussian 運動の予測公式）**  
> $t\ge1$、$n,k\ge1$ とし、$D_{t-1}$ の下で $X_{t-1}\sim N(m_{t-1}^{+},P_{t-1}^{+})$、$P_{t-1}^{+}\succ0$ とする。既知の $F_t\in\mathbb R^{n\times n}$、$B_t\in\mathbb R^{n\times k}$、$u_t\in\mathbb R^k$、$c_t\in\mathbb R^n$ に対して、$W_t\sim N(0,Q_t)$、$Q_t\succeq0$ が $(X_{t-1},D_{t-1})$ と独立であり、$X_t=F_tX_{t-1}+B_tu_t+c_t+W_t$ とする。このとき観測前の条件付き分布は Gaussian であり、

$$
\boxed{
m_t^-=F_tm_{t-1}^{+}+B_tu_t+c_t,\qquad
P_t^-=F_tP_{t-1}^{+}F_t^T+Q_t
}
$$

> を満たす。$P_t^-$ は必ず対称半正定値である。$P_t^-\succ0$ の場合は [正定値 Gaussian 密度](../U2-03/index.md#def-u2-03-gaussian-belief)を持ち、退化する場合は全空間上の通常の密度を持つとは限らない。
<!-- formal-statement-end -->

**証明の見取り図**：平均では過程雑音が0になります。共分散では $F_te_{t-1}$ と $W_t$ の交差項が独立性により消えます。Gaussian 性は独立な Gaussian ベクトルを並べて線形変換することから示します。観測の尤度はまだ一度も使いません。

<!-- proof-start -->
### 証明

以下、履歴 $D_{t-1}$ を固定した条件付き計算を行います。$F_t,B_t,u_t,c_t$ はこの条件で定数です。運動式の条件付き期待値を一項ずつ取ると

$$
\begin{aligned}
\mathbb E[X_t\mid D_{t-1}]
&=F_t\mathbb E[X_{t-1}\mid D_{t-1}]+B_tu_t+c_t
  +\mathbb E[W_t\mid D_{t-1}]\\
&=F_tm_{t-1}^{+}+B_tu_t+c_t
\end{aligned}
$$

です。最後の項は独立性と $\mathbb E[W_t]=0$ で消えます。

$e_{t-1}=X_{t-1}-m_{t-1}^{+}$ と置くと、平均を引いた新しい誤差は

$$
e_t^-=X_t-m_t^-=F_te_{t-1}+W_t
$$

です。その外積を展開し、条件付き期待値を取ります。

$$
\begin{aligned}
P_t^-
&=\mathbb E[e_t^-(e_t^-)^T\mid D_{t-1}]\\
&=F_t\mathbb E[e_{t-1}e_{t-1}^T\mid D_{t-1}]F_t^T
  +\mathbb E[W_tW_t^T\mid D_{t-1}]\\
&\quad+F_t\mathbb E[e_{t-1}W_t^T\mid D_{t-1}]
  +\mathbb E[W_te_{t-1}^T\mid D_{t-1}]F_t^T.
\end{aligned}
$$

独立性から交差期待値は $\mathbb E[e_{t-1}\mid D_{t-1}]\mathbb E[W_t^T]=0$ およびその転置です。従って

$$
P_t^-=F_tP_{t-1}^{+}F_t^T+Q_t.
$$

Gaussian 性も確かめます。実対称正定値 $P_{t-1}^{+}$ は $LL^T=P_{t-1}^{+}$、実対称半正定値 $Q_t$ は $GG^T=Q_t$ と因数分解できます（零固有値があれば $G$ は特異でもよい）。互いに独立な標準正規ベクトル $Z,Z'$ を取り、条件付き分布を

$$
X_{t-1}=_{\!d}m_{t-1}^{+}+LZ,\qquad
W_t=_{\!d}GZ'
$$

と表せます。独立性により両者の**同時分布**もこの表現で再現できます。したがって

$$
X_t=_{\!d}m_t^-+
\begin{pmatrix}F_tL&G\end{pmatrix}
\begin{pmatrix}Z\\Z'\end{pmatrix}.
$$

独立標準正規の連結ベクトルの線形像は（退化も許す）Gaussian なので、予測分布も Gaussian です。この線形像の平均と共分散は直前で求めた量と一致します。[多変量 Gaussian の構成](../../../解析系/INV/INV15/index.md#def-inv15-gaussian-density)と整合します。

最後に任意の $v\in\mathbb R^n$ について

$$
v^TP_t^-v=(F_t^Tv)^TP_{t-1}^{+}(F_t^Tv)+v^TQ_tv\ge0
$$

です。両行列の対称性から $P_t^-$ は対称で、二次形式の非負性から半正定値です。$\square$
<!-- proof-end -->

**公式の読解**：$F_tP_{t-1}^{+}F_t^T$ は以前から存在した不確実性を運動で変形したものです。$Q_t$ は新たに加わる不確実性です。独立な入力 $u_t$ は平均に入っても、**既知である限り**分散には別項として入りません。雑音の分散を $F_tQ_tF_t^T$ としてしまうのも誤りです。$Q_t$ は既に $X_t$ と同じ座標の雑音の共分散だからです。

## 3. 1次元を二時刻進めて、プラスとマイナスを見失わない

前の定義確認を時系列で続けます。移動前の状態 $X_0\mid D_0\sim N(2,4)$ m、いずれの運動も $F_t=B_t=1,\ c_t=0$ とします。時刻1では指令 $u_1=3$ m、過程雑音分散 $Q_1=1$ m² です。[予測公式](#thm-u2-04-gaussian-prediction)に **$t=1$** を代入すると、

$$
m_1^-=1\cdot m_0^++1\cdot3=2+3=5,\qquad
P_1^-=1\cdot4\cdot1+1=5.
$$

時刻1で観測しない場合、更新は恒等操作です。この場合だけ $m_1^+=m_1^-=5$、$P_1^+=P_1^-=5$ としてよいとします。次に指令 $u_2=-1$ m、$Q_2=2$ m² で動くと、**$t=2$** の予測は

$$
m_2^-=1\cdot m_1^++(-1)=4,\qquad
P_2^-=1\cdot P_1^+\cdot1+2=7.
$$

| 段階 | 平均（m） | 分散（m²） | 使用した観測 |
| --- | ---: | ---: | --- |
| 時刻0の観測後 | $m_0^+=2$ | $P_0^+=4$ | $D_0$ |
| 時刻1の予測 | $m_1^-=5$ | $P_1^-=5$ | まだ $D_0$ |
| 時刻1の更新なし | $m_1^+=5$ | $P_1^+=5$ | 新規観測なし |
| 時刻2の予測 | $m_2^-=4$ | $P_2^-=7$ | まだ $D_0$ |

この計算に時刻2の観測を混ぜてはいけません。もし時刻1に観測があれば、2行目と4行目の間で[U2-03 の事後更新](../U2-03/index.md#prop-u2-03-robot-posterior)を行い、その結果の $m_1^+,P_1^+$ を時刻2へ渡します。

## 4. 二次元：位置と速度を同時に運ぶ

平面姿勢より前に、**一直線上の位置 $p$（m）と速度 $v$（m/s）** を状態 $X=(p,v)^T$ として追います。時間刻み $\Delta t=1$ s の間に一定加速度 $u$（m/s²）を指令すると、位置変化は $v\Delta t+u(\Delta t)^2/2$、速度変化は $u\Delta t$ です。位置・速度の順に並べれば

$$
F=\begin{pmatrix}1&\Delta t\\0&1\end{pmatrix},\qquad
B=\begin{pmatrix}(\Delta t)^2/2\\\Delta t\end{pmatrix}.
$$

行列の第2列が速度を位置へ換算するのは、**時間を掛ける**からです。加速度の未知誤差を1個のスカラー $\varepsilon\sim N(0,4)$（単位は m/s²）とし、$W=B\varepsilon$ と置くと、雑音は2成分であっても同じ原因を共有します。ここから $Q$ が非対角になる理由を導きます。

$$
Q=\mathbb E[B\varepsilon\varepsilon B^T]
=B\mathbb E[\varepsilon^2]B^T
=4\begin{pmatrix}1/2\\1\end{pmatrix}
\begin{pmatrix}1/2&1\end{pmatrix}
=\begin{pmatrix}1&2\\2&4\end{pmatrix}.
$$

$Q$ は対称で任意の $w=(w_1,w_2)^T$ に対して $w^TQw=(w_1+2w_2)^2\ge0$ です。行列式は0で、位置の雑音成分と速度の雑音成分は独立ではありません。しかし **雑音ベクトル全体 $W$ と直前の状態 $X_0$ が独立**という運動模型の仮定は満たせます。

$m_0^+=(0,1)^T$、$P_0^+=\operatorname{diag}(4,1)$ とし、$u=2$ m/s² を指令します。$P_0^+$ は正定値です。まず平均は

$$
m_1^-
=\begin{pmatrix}1&1\\0&1\end{pmatrix}\begin{pmatrix}0\\1\end{pmatrix}
+\begin{pmatrix}1/2\\1\end{pmatrix}2
=\begin{pmatrix}1\\1\end{pmatrix}+\begin{pmatrix}1\\2\end{pmatrix}
=\begin{pmatrix}2\\3\end{pmatrix}.
$$

続いて転置まで明示して共分散を計算します。

$$
FP_0^+=\begin{pmatrix}4&1\\0&1\end{pmatrix},\qquad
FP_0^+F^T
=\begin{pmatrix}4&1\\0&1\end{pmatrix}
\begin{pmatrix}1&0\\1&1\end{pmatrix}
=\begin{pmatrix}5&1\\1&1\end{pmatrix}.
$$

$$
P_1^-=\begin{pmatrix}5&1\\1&1\end{pmatrix}
+\begin{pmatrix}1&2\\2&4\end{pmatrix}
=\boxed{\begin{pmatrix}6&3\\3&5\end{pmatrix}}.
$$

位置分散は6 m²、速度分散は5 (m/s)²、共分散は3 m²/s です。$P_1^-$ は第1主小行列式 $6>0$ と行列式 $6\cdot5-3^2=21>0$ により正定値です。元の共分散は対角でも、**速度を位置へ積分したこと**と**共通の加速度誤差**により非対角成分が生まれます。

## 5. 予測の共分散は必ず正定値か

[予測公式](#thm-u2-04-gaussian-prediction)が保証するのは半正定値までです。「Gaussian」と聞いて必ず全空間上の密度を代入できると思うと、モデルの退化を見逃します。$P_{t-1}^{+}\succ0$ のときの判定を、二次形式から導きます。

<a id="prop-u2-04-positive-definite"></a>

<!-- formal-statement-start -->
> **命題（予測共分散が正定値となる条件）**  
> $n\ge1$、$P\in\mathbb R^{n\times n}$ は実対称正定値、$Q\in\mathbb R^{n\times n}$ は実対称半正定値、$F\in\mathbb R^{n\times n}$ とする。$S=FPF^T+Q$ と置く。このとき $S$ が正定値である必要十分条件は、$F^Tv=0$ かつ $Qv=0$ を満たすベクトルが $v=0$ だけであること、すなわち

$$
\ker F^T\cap\ker Q=\{0\}
$$

> である。特に $F$ が可逆、または $Q$ が正定値なら $S$ も正定値となる。
<!-- formal-statement-end -->

**証明の見取り図**：旧状態の誤差が変換後に消える方向（$F^Tv=0$）でも、新しい雑音がその方向を揺らせば正定値を保てます。両者が同時に0になる方向だけが退化します。

<!-- proof-start -->
### 証明

任意の $v\in\mathbb R^n$ に対し

$$
v^TSv=(F^Tv)^TP(F^Tv)+v^TQv
$$

です。どちらも非負で、$P\succ0$ なので第1項が0であることと $F^Tv=0$ は同値です。$Q$ は実対称半正定値なので直交対角化 $Q=U\operatorname{diag}(\lambda_i)U^T$、$\lambda_i\ge0$ があり、

$$
v^TQv=\sum_i\lambda_i(U^Tv)_i^2=0
$$

なら各 $\lambda_i(U^Tv)_i=0$、すなわち $Qv=0$ です。逆も明らかです。従って非零 $v$ に対して $v^TSv=0$ となることと、非零 $v\in\ker F^T\cap\ker Q$ が存在することが同値です。これが正定値の必要十分条件です。$F$ が可逆なら $\ker F^T=\{0\}$、$Q\succ0$ なら $\ker Q=\{0\}$ なので、いずれも十分です。$\square$
<!-- proof-end -->

**失敗する直接例**：$n=1$、$P=(4)$、$F=(0)$、$Q=(0)$ なら $S=(0)$ です。$X_t=B_tu_t+c_t$ は確定値となり、正の分散を前提とした Gaussian 密度の式で $S^{-1}$ を使えません。$Q=0$ だけが悪いわけではありません。$F=1,Q=0$ なら $S=P\succ0$ のままです。

## 6. 独立性と「指令が既知」の境界

過程雑音が以前の誤差と相関すると、交差項を0と置いた[予測公式](#thm-u2-04-gaussian-prediction)の証明が壊れます。誤差を引いた後の交差共分散を $C_t=\mathbb E[e_{t-1}W_t^T\mid D_{t-1}]$ とします。独立を仮定しない場合にも、平均がそれぞれ定まれば共分散自体は展開できます。

<a id="prop-u2-04-correlated-noise"></a>

<!-- formal-statement-start -->
> **命題（過去の誤差と過程雑音が相関する場合）**  
> $n\ge1$ とし、履歴 $D_{t-1}$ の下で平均0、分散共分散 $P$ を持つ $e\in\mathbb R^n$ と、平均0、分散共分散 $Q$ を持つ $W\in\mathbb R^n$ を考える。$C=\mathbb E[eW^T\mid D_{t-1}]$ が存在し、既知の $F\in\mathbb R^{n\times n}$ により新しい誤差が $Fe+W$ となるなら、その分散共分散は

$$
\operatorname{Cov}(Fe+W\mid D_{t-1})
=FPF^T+Q+FC+C^TF^T
$$

> である。$C=0$ なら標準的な予測共分散の形に戻るが、**無相関だけで Gaussian 性まで保証されるわけではない**。
<!-- formal-statement-end -->

**証明の見取り図**：前の定理と同じ外積展開ですが、交差期待値を消さずに残します。

<!-- proof-start -->
### 証明

条件付き平均0から $Fe+W$ も平均0です。外積を展開して

$$
(Fe+W)(Fe+W)^T
=Fee^TF^T+WW^T+FeW^T+We^TF^T
$$

を得ます。条件付き期待値を項別に取ると、初めの2項は $FPF^T,Q$、後の2項は $FC,C^TF^T$ です。これを足せば主張が従います。$\square$
<!-- proof-end -->

**独立性を失った反例**：$n=1$、前時刻の誤差 $e\sim N(0,1)$、$F=1$、$W=-e$ とすると、$P=Q=1$ でも新しい誤差は $e+W=0$ なので分散0です。実際 $C=\mathbb E[e(-e)]=-1$ で、正しい値は $1+1-1-1=0$。独立と誤認して $1+1=2$ とすると、古い誤差の打消しを見落とします。

**入力もランダムなら**：確定入力を $\bar u_t$ と書いて、実行入力が $\bar u_t+\delta U_t$ である場合、$\delta U_t$ が以前の誤差・$W_t$ と独立、平均0、分散共分散 $S_u$ なら

$$
P_t^-=F_tP_{t-1}^{+}F_t^T+B_tS_uB_t^T+Q_t.
$$

これは $\delta U_t$ が独立という追加仮定の下で、$B_t\delta U_t+W_t$ をまとめて新しい雑音と見なした結果です。指令が履歴から既知ならその条件付き分散は0です。反対に、指令をまだ知らない観測者の**無条件分布**を求めれば入力のばらつきが入るため、条件付けを明示しない比較はできません。

## 7. 再実行可能な数値検算

以下の Python ラボは分数計算を使い、丸めによらず $FPF^T+Q$ と平均を照合します。1次元の二時刻予測、位置・速度の二次元予測、退化の診断を用意しました。乱数標本は使用せず、入力・時刻刻み・共分散は固定値です。過程雑音と旧状態の独立性は生成模型の仮定であって、数値計算そのものが統計的独立性を証明するものではありません。

~~~python-file-lab
# lab-id: U2-04-KALMAN-PREDICT
# lab-title: Kalman 予測の平均と共分散を分数で計算
# lab-file: textbook/volumes/dream_thater/応用系/U/U2-04/assets/kalman_predict.py
# timeout-ms: 30000
# lab-preset: 1次元の二時刻 | --scenario scalar
# lab-preset: 位置と速度 | --scenario kinematic
# lab-preset: 退化を診断 | --scenario singular
~~~

章ディレクトリから次で再実行できます。

~~~bash
python assets/kalman_predict.py --scenario kinematic
python -m unittest discover -s assets/tests -v
~~~

二次元の基準値は $m_1^-=(2,3)^T$、$P_1^-=\left(\begin{smallmatrix}6&3\\3&5\end{smallmatrix}\right)$、$\det P_1^-=21$ です。数値が一致しても、その根拠は2節の交差項の消去と4節の行列積で確認してください。

## 8. 演習と詳細解答

### Level A：予測の入力・添字・単位

<a id="ex-u2-04-a01"></a>

**A1. 平均と分散を一回進める**

- Level: A

$X_0\mid D_0\sim N(1,4)$、$X_1=2X_0+3+W_1$、$W_1\sim N(0,1)$ は $(X_0,D_0)$ と独立とする。$m_1^-,P_1^-$ を求め、$m_0^+$ と区別せよ。

<!-- solution-start -->
**詳細解答**：[予測定理](#thm-u2-04-gaussian-prediction)の $F_1=2$、既知の入力寄与 $B_1u_1+c_1=3$、$Q_1=1$、$m_0^+=1,P_0^+=4$ を使います。独立かつ零平均雑音という仮定を満たすため、

$$
m_1^-=2\cdot1+3=5,\qquad
P_1^-=2\cdot4\cdot2+1=17.
$$

$m_0^+=1$ は前時刻の観測後、$m_1^-=5$ は次時刻の観測前であり等しい必要はありません。
<!-- solution-end -->

<a id="ex-u2-04-a02"></a>

**A2. 二時刻の時刻添字**

- Level: A

$X_0\mid D_0\sim N(0,1)$、$X_t=X_{t-1}+u_t+W_t$ とする。$u_1=2,u_2=-1$、$\operatorname{Var}(W_1)=1,\operatorname{Var}(W_2)=2$ で、雑音は各時刻の過去と独立、いずれの時刻にも新規観測はない。$m_1^\pm,P_1^\pm,m_2^-,P_2^-$ を順に求めよ。

<!-- solution-start -->
**詳細解答**：$F_t=1$、$B_t=1$ です。[予測公式](#thm-u2-04-gaussian-prediction)を $t=1$ に適用すると

$$
m_1^-=0+2=2,\qquad P_1^-=1+1=2.
$$

観測が無いので $m_1^+=m_1^-=2$、$P_1^+=P_1^-=2$ とします。**時刻2にはこの $+$ を渡す**ため、

$$
m_2^-=m_1^++u_2=2-1=1,\qquad
P_2^-=P_1^++2=2+2=4.
$$

$P_0^+=1$ を2回目に再使用すると、1回目の過程雑音を失うので誤りです。
<!-- solution-end -->

<a id="ex-u2-04-a03"></a>

**A3. 正定値と退化**

- Level: A

1次元で $P_0^+=(4)$ とし、$F_1=0$、$Q_1=0$ のとき $P_1^-$ を求め、正定値か半正定値か答えよ。次に $F_1=1,Q_1=0$ ならどうなるか。

<!-- solution-start -->
**詳細解答**：[予測公式](#thm-u2-04-gaussian-prediction)により最初は

$$
P_1^-=0\cdot4\cdot0+0=0.
$$

任意の実数 $v$ で $v^2P_1^-=0\ge0$ なので半正定値ですが、非零 $v$ に対して厳密な正ではないので正定値ではありません。[正定値判定](#prop-u2-04-positive-definite)でも、$F_1^Tv=0$ かつ $Q_1v=0$ を全ての $v$ が満たすため失敗します。$F_1=1,Q_1=0$ なら $P_1^-=1\cdot4\cdot1=4>0$ で正定値です。雑音ゼロだけで退化するわけではありません。
<!-- solution-end -->

<a id="ex-u2-04-a04"></a>

**A4. 座標変換で分散が交換する**

- Level: A

$P_0^+=\operatorname{diag}(4,1)$、$F=\left(\begin{smallmatrix}0&-1\\1&0\end{smallmatrix}\right)$、$Q=\operatorname{diag}(0,1)$ とする。$FP_0^+F^T+Q$ を計算し、対称正定値か判定せよ。

<!-- solution-start -->
**詳細解答**：行列 $F$ は位置成分を交換し一方の符号を反転させる直交行列です。符号に注意して掛けると

$$
FP_0^+=\begin{pmatrix}0&-1\\4&0\end{pmatrix},\qquad
F^T=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

$$
FP_0^+F^T=\begin{pmatrix}1&0\\0&4\end{pmatrix},\qquad
P_1^-=\begin{pmatrix}1&0\\0&5\end{pmatrix}.
$$

対称であり、任意の非零 $v=(v_1,v_2)^T$ に対し $v^TP_1^-v=v_1^2+5v_2^2>0$ です。従って正定値です。
<!-- solution-end -->

<a id="ex-u2-04-a05"></a>

**A5. 新旧の誤差は独立か**

- Level: A

$X_0\mid D_0\sim N(0,4)$、$X_1=-X_0+W_1$、$W_1\sim N(0,9)$ は過去と独立とする。$\operatorname{Var}(X_1\mid D_0)$ と $\operatorname{Cov}(X_1,X_0\mid D_0)$ を求めよ。

<!-- solution-start -->
**詳細解答**：$F=-1$ なので[予測公式](#thm-u2-04-gaussian-prediction)から

$$
\operatorname{Var}(X_1\mid D_0)=(-1)^2\cdot4+9=13.
$$

他方で $X_1=-X_0+W_1$ を使うと

$$
\begin{aligned}
\operatorname{Cov}(X_1,X_0\mid D_0)
&=-\operatorname{Var}(X_0\mid D_0)
 +\operatorname{Cov}(W_1,X_0\mid D_0)\\
&=-4+0=-4.
\end{aligned}
$$

独立なのは新しい $W_1$ と古い $X_0$ であり、**新しい状態 $X_1$ と古い状態 $X_0$ は独立ではありません**。
<!-- solution-end -->

### Level B：模型と共分散を自力で結ぶ

<a id="ex-u2-04-b01"></a>

**B1. 位置・速度の運動誤差**

- Level: B

$\Delta t=1$ s、$X_0=(p_0,v_0)^T$、$m_0^+=(0,1)^T$、$P_0^+=\operatorname{diag}(4,1)$ とする。指令加速度 $u=2$ m/s²、独立な加速度誤差 $\varepsilon\sim N(0,4)$ により $X_1=FX_0+B(u+\varepsilon)$、$F=\left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right)$、$B=(1/2,1)^T$ とする。$Q$、$m_1^-$、$P_1^-$ を導き、分散共分散の非対角成分が0でない理由を述べよ。

<!-- solution-start -->
**詳細解答**：$W=B\varepsilon$ と置き、$\varepsilon$ が $X_0,D_0$ と独立で平均0なので[線形運動の予測定理](#thm-u2-04-gaussian-prediction)を使えます。加速度誤差を共有する2成分の共分散は

$$
Q=B\operatorname{Var}(\varepsilon)B^T
=4\begin{pmatrix}1/2\\1\end{pmatrix}
\begin{pmatrix}1/2&1\end{pmatrix}
=\begin{pmatrix}1&2\\2&4\end{pmatrix}.
$$

平均は $Fm_0^+=(1,1)^T$、$Bu=(1,2)^T$ から

$$
m_1^-=(2,3)^T.
$$

さらに

$$
FP_0^+=\begin{pmatrix}4&1\\0&1\end{pmatrix},\qquad
FP_0^+F^T=\begin{pmatrix}5&1\\1&1\end{pmatrix},
$$

$$
P_1^-=\begin{pmatrix}5&1\\1&1\end{pmatrix}
+\begin{pmatrix}1&2\\2&4\end{pmatrix}
=\begin{pmatrix}6&3\\3&5\end{pmatrix}.
$$

非対角成分3のうち1は以前の速度誤差が位置へ伝播した分、2は同じ加速度誤差が両成分に入る分です。状態と雑音の独立性は、雑音の2成分の独立性を意味しません。
<!-- solution-end -->

<a id="ex-u2-04-b02"></a>

**B2. 雑音が退化方向を補えるか**

- Level: B

$P=I_2$、$F=\operatorname{diag}(1,0)$ とする。$Q=\operatorname{diag}(0,3)$ の場合と $Q=0$ の場合に $S=FPF^T+Q$ を求め、[正定値条件](#prop-u2-04-positive-definite)の共通零方向を明示して判定せよ。

<!-- solution-start -->
**詳細解答**：$F=F^T$ なので

$$
FPF^T=FIF^T=\begin{pmatrix}1&0\\0&0\end{pmatrix},\qquad
\ker F^T=\operatorname{span}\{(0,1)^T\}.
$$

$Q=\operatorname{diag}(0,3)$ なら

$$
S=\begin{pmatrix}1&0\\0&3\end{pmatrix},\quad
\ker Q=\operatorname{span}\{(1,0)^T\}.
$$

2つの核の共通部分は $\{0\}$ です。各対角成分も正なので $S\succ0$。一方 $Q=0$ なら $\ker Q=\mathbb R^2$、共通部分には $(0,1)^T$ が残り、

$$
S=\begin{pmatrix}1&0\\0&0\end{pmatrix},\qquad
(0,1)S(0,1)^T=0
$$

となり正定値ではありません。
<!-- solution-end -->

<a id="ex-u2-04-b03"></a>

**B3. 独立を外したときの数値的破綻**

- Level: B

前時刻の中心化誤差 $e\sim N(0,1)$、$F=1$ とし、過程雑音を $W=-e$ と定める。$Q$、$C=\operatorname{Cov}(e,W)$、実際の新しい誤差分散、独立と誤って仮定した場合の予測分散を求め、両者の食い違いを説明せよ。

<!-- solution-start -->
**詳細解答**：$W=-e$ なので $\mathbb E[W]=0$、$\operatorname{Var}(W)=(-1)^2\operatorname{Var}(e)=1$ で $Q=1$ です。一方

$$
C=\mathbb E[eW]=\mathbb E[-e^2]=-1
$$

となり、独立性は成り立ちません。[相関した雑音の命題](#prop-u2-04-correlated-noise)へ $F=P=Q=1,C=-1$ を代入すると

$$
P^-=1+1+(-1)+(-1)=0.
$$

実際に $Fe+W=e-e=0$ です。[独立雑音用の公式](#thm-u2-04-gaussian-prediction)へ誤って代入すると $1+1=2$ となります。外積展開の交差項を捨てるために必要な仮定が欠けていたことが原因です。
<!-- solution-end -->

<a id="ex-u2-04-b04"></a>

**B4. 既知指令と未知の実行入力**

- Level: B

$X_0\mid D_0\sim N(1,1)$、$X_1=X_0+2U+W$ とする。$W\sim N(0,1)$ は過去と独立、$U\sim N(3,4)$ は $X_0,W$ と独立であり、$U$ は $D_0$ には含まれない。$U$ を観測せずに予測するときの平均・分散と、$U=3$ を既知として条件付けた予測平均・分散をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**：$U$ を知らない場合は中心化して

$$
X_1-\mathbb E[X_1\mid D_0]=(X_0-1)+2(U-3)+W
$$

と書きます。3項は独立で平均0なので共分散の交差項は消え、

$$
m_1^-=1+2\cdot3=7,\qquad
P_1^-=1+2^2\cdot4+1=18.
$$

一方、**$U=3$ を与えた条件付き分布**では入力は確定しています。$X_1=X_0+6+W$ であるため

$$
\mathbb E[X_1\mid D_0,U=3]=7,\qquad
\operatorname{Var}(X_1\mid D_0,U=3)=1+1=2.
$$

入力の条件付けを変えると同じ平均でも分散が変わります。無条件分散18を、指令3を既に知るロボットへそのまま渡してはいけません。
<!-- solution-end -->

### Level C：予測と既習の更新を時系列で接続する

<a id="ex-u2-04-c01"></a>

**C1. 予測 → 観測更新 → 次の予測**

- Level: C

$X_0\mid D_0\sim N(0,1)$ とする。時刻1では $X_1=X_0+2+W_1$、$W_1\sim N(0,1)$、観測 $Z_1=X_1+E_1$、$E_1\sim N(0,2)$ とし、実測 $z_1=4$ を得た。時刻2では $X_2=2X_1-1+W_2$、$W_2\sim N(0,3)$ とする。雑音 $W_1,E_1,W_2$ は相互に独立で $X_0,D_0$ とも独立である。

1. 時刻1の観測前平均と分散を求めよ。
2. [U2-03 の事後更新公式](../U2-03/index.md#prop-u2-03-robot-posterior)を用い、観測後の $m_1^+,P_1^+$ を求めよ。
3. 時刻2の観測前 $m_2^-,P_2^-$ を求め、観測 $z_1$ を無視して2回予測した場合との違いを述べよ。

<!-- solution-start -->
**詳細解答**：時刻1の運動には $F_1=1$、既知入力の寄与2、$Q_1=1$ を用います。雑音の独立性と正定値の直前分散1を確認した上で、[本講の予測定理](#thm-u2-04-gaussian-prediction)より

$$
m_1^-=0+2=2,\qquad P_1^-=1+1=2.
$$

時刻1の観測には $H_1=1$、雑音分散 $R_1=2>0$、実測 $z_1=4$ を用います。$P_1^-=2>0$ かつ $E_1$ は状態から独立なので、[前講の線形 Gaussian 事後更新](../U2-03/index.md#prop-u2-03-robot-posterior)を直接適用できます。精度と情報ベクトルはそれぞれ

$$
\Lambda_1=(P_1^-)^{-1}+H_1^TR_1^{-1}H_1
=\frac12+\frac12=1,
$$

$$
\eta_1=(P_1^-)^{-1}m_1^-+H_1^TR_1^{-1}z_1
=\frac12\cdot2+\frac12\cdot4=3.
$$

従って

$$
P_1^+=\Lambda_1^{-1}=1,\qquad
m_1^+=P_1^+\eta_1=3.
$$

ここで $+$ に切り替えたものを時刻2の予測の入力とします。$F_2=2$、既知入力の寄与 $-1$、$Q_2=3$ なので

$$
m_2^-=2m_1^+-1=2\cdot3-1=5,\qquad
P_2^-=2P_1^+2+3=4+3=7.
$$

もし時刻1の観測を無視すれば $m_1^+=m_1^-=2$、$P_1^+=P_1^-=2$ としてしまい、時刻2は

$$
m_2^-=2\cdot2-1=3,\qquad
P_2^-=2\cdot2\cdot2+3=11
$$

となります。実測 $z_1=4$ を取り込んだ正しい結果は平均5・分散7であり、更新を飛ばすと平均も不確実性も異なります。**観測更新がどの時刻の $+$ を作るか**を明示すれば、$t-1$ と $t$ の取り違えを防げます。
<!-- solution-end -->

---

ここまでの予測は「既知の線形運動と独立 Gaussian 過程雑音」という条件で厳密です。次の U2-05 では、予測された $m_t^-,P_t^-$ と実際の観測 $z_t$ を組み合わせ、innovation と Kalman gain によって同じ時刻の $m_t^+,P_t^+$ を求めます。
