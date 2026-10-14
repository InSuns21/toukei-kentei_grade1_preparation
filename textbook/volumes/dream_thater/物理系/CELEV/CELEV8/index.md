# CELEV8 数値変分法と実際のn体シミュレーション

<!-- definition-example-audit: strict -->

[CELEV2の直接法による極小点の存在](../CELEV2/index.md#thm-celev2-minimizer)は無限次元のループを対象にし、[CELEV7のFloquet理論](../CELEV7/index.md#def-celev7-monodromy)は既に与えられた周期解の微小摂動を対象にしました。しかしコンピュータ上のループは有限個の点列です。その点列を最小化した結果を、いつ「Newton方程式の周期解」と呼べるのでしょうか。

答えは、**離散作用の停留性、連続Newton方程式への適合、初期値からの一周期閉合、厳密な存在証明を別々に検査する**ことです。本章では作用の格子化と勾配を一から導き、対称性を壊さない更新を作った後、独立した初期値問題の積分で検算します。画面の軌跡は飾りではなく、毎回計算された座標です。

**[CELEV8 数値実験室を開く](https://insuns21.github.io/toukei-kentei_grade1_preparation/simulation/celev8.html)**

実験室のAモードはNewton方程式の数値積分、Bモードは周期ループの離散作用最小化です。どちらもブラウザ内のPythonカーネルが計算し、JavaScriptは操作とCanvas描画を担当します。初回はPyodideの読込にネット接続が必要です。実験で用いる数値は近似値であり、存在や無限時間安定性を証明しません。

## 1. 時間格子を導入する理由

数値計算で時刻を分割する考え方は[時間格子の定義](../../../計算系/NA/NA6/index.md#def-na6-time-grid)で導入しました。

$n\ge2$、質量 $m_i>0$、$G>0$、周期候補 $T>0$ を固定します。[CELEV1のNewton作用](../CELEV1/index.md#def-celev1-extended-action)は、重心零で衝突しない曲線 $q_i(t)\in\mathbb R^2$ に対して

$$
\mathcal A_T(q)=\int_0^T\left\{\frac12\sum_{i=1}^nm_i|\dot q_i|^2+
G\sum_{i<j}\frac{m_im_j}{|q_i-q_j|}\right\}dt
$$

でした。積分する代わりに時刻を $N$ 個に分け、未知数を各時刻の位置にします。ここで $N\ge3$ は整数、$h=T/N$、$q_i^k\in\mathbb R^2$ は $t_k=kh$ での候補位置です。上付き $k$ はべき乗でなく格子番号とし、$q_i^N=q_i^0$ と巡回させます。

連続の速度 $\dot q_i(t_k)$ を前進差分 $(q_i^{k+1}-q_i^k)/h$ に置き換えると、運動エネルギーの積分は $h\sum_k m_i|q_i^{k+1}-q_i^k|^2/(2h^2)$ で近似されます。逆距離は各格子時刻で評価します。これが最小化する有限次元関数です。

<a id="def-celev8-discrete-action"></a>
<!-- formal-statement-start -->
> **定義（周期格子上の離散Newton作用）**  
> $N\ge3$、$h=T/N$、$G,m_1,\ldots,m_n,T>0$ とする。$q_i^{k+N}=q_i^k$ とし、すべての $k$、$i<j$ について $q_i^k\ne q_j^k$ を満たす位置列 $q=(q_i^k)$ の**離散作用**を

$$
A_N(q)=\sum_{k=0}^{N-1}\left[
\frac1{2h}\sum_{i=1}^nm_i|q_i^{k+1}-q_i^k|^2+
hG\sum_{i<j}\frac{m_im_j}{|q_i^k-q_j^k|}
\right]
$$

> と定める。重心零を課す場合は各 $k$ で $\sum_i m_iq_i^k=0$ とする。格子点に衝突があれば $A_N(q)=+\infty$ と拡張する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-celev8-discrete-action -->
### 例：二体・静止した三点格子

質量 $m_1=m_2=1$、$G=T=1$、$N=3$、$q_1^k=(-1/2,0)$、$q_2^k=(1/2,0)$ をすべての $k$ で与えます。**定義の確認**として周期端点、重心、非衝突、作用の順に調べます。位置は一定だから $q_i^{k+3}=q_i^k$。重心は $q_1^k+q_2^k=0$、粒子間距離は1で衝突しません。各速度差分は0、各ポテンシャル項は $hG/1=1/3$ なので

$$
A_3(q)=\sum_{k=0}^2(0+1/3)=1.
$$

これは格子の許容点の例であってNewton方程式の解ではありません。停止した二粒子には重力加速度があり、後で定義する勾配も零ではないからです。
<!-- definition-example-end -->

**格子間の衝突には注意**が必要です。離散作用が有限であることは、隣り合う格子点を直線補間した途中に衝突がないことを保証しません。滑らかな曲線での[衝突排除の議論](../CELEV3/index.md#thm-celev3-marchal)を格子へ機械的に移すことはできません。

## 2. 離散勾配はNewtonの力から直接求まる

勾配は各位置 $q_i^k$ を少し動かしたときの作用の一次変化の係数です。速度項には、格子 $k-1$ から $k$ に入る辺と、$k$ から $k+1$ に出る辺の**二本**が寄与します。逆距離項の微分は[CELEV1の第一変分](../CELEV1/index.md#prop-celev1-first-variation)と同じ符号を保つ必要があります。

$a_i(q^k)$ を[CELE2のNewton加速度](../../CELE/CELE2/index.md#prop-cele2-nbody-equations)で格子位置 $q^k$ に評価したものとします。

<a id="prop-celev8-gradient"></a>
<!-- formal-statement-start -->
> **命題（離散Newton作用の勾配）**  
> 第1節の衝突のない格子位置列について、各 $k=0,\ldots,N-1$、$i=1,\ldots,n$ の位置 $q_i^k$ に関するユークリッド勾配は

$$
\nabla_{q_i^k}A_N(q)
=\frac{m_i}{h}(2q_i^k-q_i^{k-1}-q_i^{k+1})
+h\,m_i a_i(q^k),
$$

> ただし

$$
a_i(q^k)=G\sum_{j\ne i}m_j
\frac{q_j^k-q_i^k}{|q_j^k-q_i^k|^3}.
$$

> 従って制約のない勾配零条件は、中央二階差分による離散Newton方程式と同値である。
<!-- formal-statement-end -->

### 証明の見取り図

位置 $q_i^k$ の前後二本の辺の微分を足し、逆距離微分を足します。最後に全式を $-1/(m_i h)$ 倍すれば中央二階差分が加速度に一致します。

<!-- proof-start -->
### 証明

$e=q_i^k$ に依存する運動項は

$$
K(e)=\frac{m_i}{2h}|e-q_i^{k-1}|^2+
\frac{m_i}{2h}|q_i^{k+1}-e|^2.
$$

方向 $w\in\mathbb R^2$ に沿って $e+\varepsilon w$ を代入すると

$$
\left.\frac d{d\varepsilon}K(e+\varepsilon w)\right|_0
=\frac{m_i}{h}(e-q_i^{k-1})\cdot w+
\frac{m_i}{h}(e-q_i^{k+1})\cdot w.
$$

次に $r=q_i^k-q_j^k$ として $r\ne0$ では

$$
\left.\frac d{d\varepsilon}|r+\varepsilon w|^{-1}\right|_0
=-\frac{r\cdot w}{|r|^3}.
$$

一対ずつの寄与を集めると位置 $i$ の逆距離項の勾配は

$$
-hG\sum_{j\ne i}m_im_j\frac{q_i^k-q_j^k}{|q_i^k-q_j^k|^3}
=h\,m_i a_i(q^k).
$$

二つを加えれば命題の式です。これを零とおき、$m_i h>0$ で割って移項すると

$$
\frac{q_i^{k+1}-2q_i^k+q_i^{k-1}}{h^2}=a_i(q^k).
$$

衝突のない格子に限り全微分が存在します。$\square$
<!-- proof-end -->

<a id="def-celev8-discrete-residual"></a>
<!-- formal-statement-start -->
> **定義（離散Newton残差）**  
> 第2節の衝突のない格子曲線について

$$
R_N(q)=\max_{k,i}\left|
\frac{q_i^{k+1}-2q_i^k+q_i^{k-1}}{h^2}-a_i(q^k)
\right|
$$

> を離散Newton残差とする。$R_N=0$ は**格子上の差分方程式**の成立であり、連続方程式の厳密解を意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-celev8-discrete-residual -->
### 例：静止格子の残差

前節の静止二体では中央差分は零で、距離1、質量と $G$ は1です。1番粒子は $(1,0)$、2番粒子は $(-1,0)$ の加速度を受けるので、**定義の確認**として各格子点で残差の大きさは1、従って $R_3=1$ です。位置の周期閉合は満たしてもNewtonの力を全く再現していません。
<!-- definition-example-end -->

格子数が変わると勾配の成分数と係数 $h$ が変わります。**勾配ノルムを異なる $N$ の間で無条件に精度指標として比較しない**でください。力学残差 $R_N$ も、格子間の高周波誤差をすべて測るわけではありません。

## 3. 対称拘束を満たす候補だけを更新する

[CELEV6の単純舞踏解](../CELEV6/index.md#def-celev6-choreography)では等質量三体の粒子が一つの曲線を $T/3$ ずつ時間をずらして辿ります。格子数 $N$ が3で割り切れるとき、$\ell=N/3$ として、生成点列 $\gamma^k$ から $q_i^k=\gamma^{k+(i-1)\ell}$ を作れます。しかし任意の $\gamma$ は、重心零や8の字に似た鏡映対称性を自動的には満たしません。

本章の**数値探索で採用する一つの対称部分空間**は、$N$ を6の倍数として、実数値の生成曲線 $\gamma^k=(x^k,y^k)$ に次を課します。

$$
\gamma^{-k}=-\gamma^k,\qquad
x^{k+N/2}=-x^k,\qquad y^{k+N/2}=y^k,\qquad
\sum_{j=0}^2\gamma^{k+jN/3}=0.
$$

添字はすべて $N$ を法として読みます。第1式は時刻反転と原点反転、第2・3式は半周期の鏡映条件、最後は各時刻の重心零です。これは8の字型の候補を探すための**数値的な制限**で、8の字解の存在をこれだけで断言するものではありません。

これらを毎反復手で満たす代わりに、任意の三体位置列を近い許容列へ写す演算を使います。[CELEV4の群平均の射影性](../CELEV4/index.md#prop-celev4-reynolds)と同様に、時間・粒子の対称操作を平均して固定点を作る方法ですが、以下では有限格子の標準内積に関する最短距離性も確認します。

<a id="def-celev8-projection"></a>
<!-- formal-statement-start -->
> **定義（三体舞踏格子の直交射影）**  
> $N$ が6の倍数であるとし、標準ユークリッド内積を入れた格子空間 $(\mathbb R^2)^{3N}$ から、上の時間差・重心零・時刻反転・半周期鏡映条件をすべて満たす線形部分空間 $V_N$ への直交射影を $P_N$ と書く。$P_Nq$ はその条件を満たす格子のうち $\sum_{k,i}|q_i^k-z_i^k|^2$ を最小にする唯一の $z$ である。
<!-- formal-statement-end -->

射影を実装で隠さないため、$P_N$ の作り方を確かめます。まず各粒子を共通の時刻規約へずらして平均した

$$
\widetilde\gamma^k=\frac13\sum_{i=1}^3q_i^{k-(i-1)N/3}
$$

を作り、次に $F\gamma^k=(\gamma^k-\gamma^{-k})/2$ とします。半周期鏡映は $H(x^k,y^k)=((x^k-x^{k+N/2})/2,(y^k+y^{k+N/2})/2)$ です。最後に $C\gamma^k=\gamma^k-\frac13\sum_{j=0}^2\gamma^{k+jN/3}$ として重心成分を除去し、時刻をずらして三粒子へ戻します。

<a id="prop-celev8-projection-properties"></a>
<!-- formal-statement-start -->
> **命題（射影の制約保存と最小距離）**  
> 上の平均、$F,H,C$、舞踏表示への復元を合成した写像は、$V_N$ への直交射影 $P_N$ である。従って $P_N^2=P_N$ であり、$v\in V_N$ なら $P_Nv=v$、任意の $q$ について $q-P_Nq$ は $V_N$ に直交する。
<!-- formal-statement-end -->

### 証明の見取り図

舞踏平均は三つの粒子の時刻シフトを取り除く直交射影です。残り三つは格子列に作用する反転・時間シフトの平均で、互いに可換な直交射影です。その積は共通固定部分空間への直交射影になります。

<!-- proof-start -->
### 証明

粒子ラベルごとの時刻のずれを取り除けば、一つの $\gamma$ を三回持つ格子空間に同一視できます。任意の三列 $a_i^k=q_i^{k-(i-1)\ell}$ と候補 $\gamma$ について

$$
\sum_i|a_i^k-\gamma^k|^2
=\sum_i|a_i^k-\widetilde\gamma^k|^2+
3|\gamma^k-\widetilde\gamma^k|^2
$$

です。交差項が $\sum_i(a_i^k-\widetilde\gamma^k)=0$ により消えるので、三列平均が最小距離を与えます。

残る制約を格子列の直交射影として導きます。$S(x,y)=(-x,y)$ とし、$\ell=N/3$ を用いて三つの線形演算子を

$$
(J\gamma)^k=-\gamma^{-k},\qquad
(K\gamma)^k=S\gamma^{k+N/2},\qquad
(M\gamma)^k=\frac13(\gamma^k+\gamma^{k+\ell}+\gamma^{k+2\ell})
$$

と置きます。$J$ と $K$ は添字の置換と座標の符号変更なので内積を保ちます。また $J^2=K^2=I$ です。したがって逆写像が自分自身であり、内積を保つことから $J^*=J$、$K^*=K$ です。

一方、$M$ は巡回シフトを三つ平均するので、$M\gamma$ は $\ell$ だけずらしても変わりません。従って $M^2=M$ です。格子和の添字を付け替えると

$$
\langle M\gamma,\eta\rangle
=\frac13\sum_k(\gamma^k+\gamma^{k+\ell}+\gamma^{k+2\ell})\cdot\eta^k
=\langle\gamma,M\eta\rangle
$$

となるため $M^*=M$ でもあります。求める三つの演算子は

$$
F=\frac{I+J}{2},\qquad H=\frac{I+K}{2},\qquad C=I-M
$$

です。例えば $F^2=(I+2J+J^2)/4=F$、$F^*=F$ で、$H$ と $C$ もそれぞれ $K^2=I$、$M^2=M$ から冪等・自己共役になります。各像は順に $J\gamma=\gamma$（反転）、$K\gamma=\gamma$（半周期鏡映）、$M\gamma=0$（三つの時刻シフトの和が零）を満たす列です。

可換性も添字で確かめます。反転と半周期シフトの順序を変えても、$-N/2\equiv N/2\pmod N$ なので $JK=KJ$ です。$M$ の平均には $0,\ell,2\ell$ の三つのシフトがすべて入るため、反転によるシフト順序の交換で $JM=MJ$、半周期シフトとの交換で $KM=MK$ となります。よって $F,H,C$ は互いに可換です。その積 $Q=FHC$ は

$$
Q^*=C^*H^*F^*=FHC=Q,\qquad
Q^2=F^2H^2C^2=FHC=Q
$$

を満たし、像は三制約の共通部分です。

最初の舞踏平均については上の平方和の恒等式を全 $k$ で足せば、任意の舞踏候補の最短距離となる生成列が $\widetilde\gamma$ だと分かります。残る最小化は $3\sum_k|\gamma^k-\widetilde\gamma^k|^2$ なので、$Q\widetilde\gamma$ が三制約を同時に満たす唯一の最短距離の生成列です。これを舞踏表示に戻すと $P_Nq$ になります。この写像は線形で、$V_N$ 上の点をそのまま保ちます。よって $P_N^2=P_N$ です。

最後に直交性を添字から確認します。$v\in V_N$ の生成列を $\eta$ とすると $Q\eta=\eta$ であり、舞踏平均の定義によって

$$
\begin{aligned}
\langle q-P_Nq,v\rangle
&=\sum_{k,i}\left(q_i^k-(Q\widetilde\gamma)^{k+(i-1)\ell}\right)
\cdot\eta^{k+(i-1)\ell}\\
&=3\sum_k\left(\widetilde\gamma^k-(Q\widetilde\gamma)^k\right)\cdot\eta^k\\
&=3\langle\widetilde\gamma-Q\widetilde\gamma,Q\eta\rangle\\
&=3\langle Q\widetilde\gamma-Q^2\widetilde\gamma,\eta\rangle=0.
\end{aligned}
$$

ここでは $Q^*=Q$ と $Q^2=Q$ を用いました。したがって $P_Nq$ は $V_N$ への直交射影であり、命題の三性質がすべて従います。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-celev8-projection -->
### 例：振幅を持つ8の字型格子を直接作る

$N=12$ とし、$\theta_k=2\pi k/12$、$a,b>0$ で

$$
\gamma^k=(a\sin\theta_k,b\sin2\theta_k),\qquad
q_i^k=\gamma^{k+4(i-1)}
$$

とします。**定義の確認**：$\sin(-\theta)=-\sin\theta$ から時刻反転条件を満たします。$\sin(\theta+\pi)=-\sin\theta$、$\sin(2\theta+2\pi)=\sin2\theta$ から半周期の二条件を満たします。さらに

$$
\sum_{j=0}^2\sin(\theta+2\pi j/3)=0,\quad
\sum_{j=0}^2\sin(2\theta+4\pi j/3)=0
$$

を複素指数表示か加法公式で確認でき、三粒子の重心は各時刻で零です。従って $q\in V_{12}$ なので $P_{12}q=q$。例えば時刻 $k=0$ では三粒子が

$$
(0,0),\quad(\sqrt3a/2,-\sqrt3b/2),\quad(-\sqrt3a/2,\sqrt3b/2)
$$

に位置し、$a,b>0$ なので三点は相異なります。

この例は残りの時刻でも非衝突です。粒子1と2が同じ位置になると仮定すると、$a,b>0$ より二成分それぞれについて

$$
\sin\theta=\sin(\theta+2\pi/3),\qquad
\sin2\theta=\sin(2\theta+4\pi/3)
$$

が必要です。第一式から $\cos(\theta+\pi/3)=0$、すなわち $\theta=\pi/6+\pi r$（整数 $r$）です。第二式から $\cos(2\theta+2\pi/3)=0$、すなわち $\theta=-\pi/12+\pi s/2$（整数 $s$）です。両者が同時に成立するなら $s=2r+1/2$ となり整数性に反します。残る粒子対も $\theta$ を $2\pi/3$ または $4\pi/3$ ずらした同じ計算で否定できます。したがって全格子点が非衝突です。

ただし**対称制約を保つこと**と**全格子点の非衝突**は一般には別です。別の候補では各反復で後者も直接検査します。
<!-- definition-example-end -->

## 4. 射影勾配と、作用が下がる更新だけを採用する

有限次元の関数であっても $1/|q_i-q_j|$ の特異性があり、作用は一般に凸ではありません。勾配法が世界で最小の周期軌道を見つける保証はありません。そこで候補 $q\in V_N$ から、勾配を許容方向に射影し、

$$
g=P_N\nabla A_N(q),\qquad
q_{\mathrm{try}}=P_N(q-\alpha g)
$$

を作ります。$\alpha>0$ を大きくしすぎると作用が増えたり粒子間距離がほぼ零になったりするので、段階的に半減する線探索を行います。

<a id="prop-celev8-descent"></a>
<!-- formal-statement-start -->
> **命題（射影勾配の局所降下方向）**  
> $q\in V_N$ が格子で非衝突、$g=P_N\nabla A_N(q)\ne0$ とする。十分小さい $\alpha>0$ について、$q-\alpha g\in V_N$ は非衝突であり、

$$
A_N(q-\alpha g)=A_N(q)-\alpha\|g\|^2+o(\alpha)<A_N(q).
$$

> この結論は、局所停留点への収束や連続Newton周期解の存在を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

射影は自己共役かつ冪等で、$g$ は許容部分空間内の方向です。微分係数は $-\nabla A_N(q)\cdot g=-\|g\|^2$ になります。有限格子の非衝突距離には正の最小値があるため、小さい更新は衝突を避けます。

<!-- proof-start -->
### 証明

$P_Nq=q$ および $P_Ng=g$ から $P_N(q-\alpha g)=q-\alpha g$ です。また自己共役性と $P_N^2=P_N$ によって

$$
\nabla A_N(q)\cdot g
=\nabla A_N(q)\cdot P_N\nabla A_N(q)
=|P_N\nabla A_N(q)|^2=\|g\|^2.
$$

各粒子対の距離を $r_{ij}^k=|q_i^k-q_j^k|$ と置きます。すべての格子点で $r_{ij}^k>0$ だから、有限個の距離の最小値 $\rho>0$ が存在します。位置変化は有限次元ノルムで $O(\alpha)$ なので、小さい $\alpha$ では全距離が $\rho/2$ より大きく、作用はその近傍で微分可能です。従って一変数の微分可能性から

$$
A_N(q-\alpha g)=A_N(q)-\alpha\|g\|^2+o(\alpha).
$$

$g\ne0$ より一次係数は厳密に負です。$\square$
<!-- proof-end -->

実装の線探索では $A_N(q_{\mathrm{try}})\le A_N(q)-10^{-4}\alpha\|g\|^2$ を満たすステップだけを受け入れます。格子点の距離が設定した閾値以下なら**衝突警告として候補を棄却**します。24回の半減でも採用できなければそのバッチの更新を打ち切ります。$g$ のノルムはログへ記録し、更新できなかった場合は「収束した」と表示しません。

## 5. 最小化した格子は何を満たしているか

勾配が小さいのは**射影された方向だけ**かもしれません。$P_N\nabla A_N=0$ でも、制約外の $\nabla A_N$ は零とは限りません。これは[CELEV7で学んだ制約つき第二変分](../CELEV7/index.md#prop-celev7-minimum-necessary)と同種の区別です。さらに格子の停留性は連続Newton方程式とは異なります。

実験室では次の五つを並べます。

1. 作用
2. 射影勾配ノルム
3. 制約違反
4. 粒子間最小距離
5. 離散Newton残差制約違反は $\|q-P_Nq\|_\infty$ で測り、射影した列が本当に許容クラスに留まっているか確かめます。離散Newton残差 $R_N$ は**制約外方向も含めた**差分方程式の不適合を測ります。

候補曲線から初期値を推定するときは、位置 $q_i(0)\approx q_i^0$、速度を

$$
v_i(0)\approx\frac{q_i^1-q_i^{N-1}}{2h}
$$

と置けます。この近似速度をNewton初期値問題へ渡して積分し、時刻 $T$ の位置と速度を初期値と比較する必要があります。位置閉合残差と速度閉合残差を区別し、どちらも0に近いだけで真の周期解とは言いません。格子点で $q_i^N=q_i^0$ と指定したことは、**独立に積分しても時刻 $T$ に帰ってくる**という主張ではありません。

## 6. Newton方程式を別に積分する：velocity-Verlet

[CELE2のNewton方程式](../../CELE/CELE2/index.md#prop-cele2-nbody-equations)を直接初期値問題として解く方は、作用の勾配降下とは独立した計算です。座標と速度を $x_i^k,v_i^k$ とし、各時刻の加速度を $a_i(x^k)$ とすれば、まず現在の加速度で位置を進め、新位置からもう一度加速度を評価し、前後の平均で速度を進めます。

<a id="def-celev8-verlet"></a>
<!-- formal-statement-start -->
> **定義（固定刻みvelocity-Verlet法）**  
> $G,m_i,h>0$、初期位置 $x_i^0\in\mathbb R^2$ と速度 $v_i^0\in\mathbb R^2$ を与える。全粒子間距離が各ステップで正である限り

$$
\begin{aligned}
a_i^k&=G\sum_{j\ne i}m_j
\frac{x_j^k-x_i^k}{|x_j^k-x_i^k|^3},\\
x_i^{k+1}&=x_i^k+h v_i^k+\frac{h^2}{2}a_i^k,\\
a_i^{k+1}&=a_i(x^{k+1}),\\
v_i^{k+1}&=v_i^k+\frac h2(a_i^k+a_i^{k+1})
\end{aligned}
$$

> と更新する方式を**固定刻みvelocity-Verlet法**と呼ぶ。各ステップで全粒子に共通の同じ $h$ を使う。衝突検知によって計算を止めることは、衝突を通過する正則化を与えるものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-celev8-verlet -->
### 例：二体円運動の最初の一歩

$G=m_1=m_2=1$、$x_1^0=(-1/2,0)$、$x_2^0=(1/2,0)$、$v_1^0=(0,-1/\sqrt2)$、$v_2^0=(0,1/\sqrt2)$ を代入します。初期距離は1で、**定義の確認**として $a_1^0=(1,0)$、$a_2^0=(-1,0)$ です。従って

$$
x_1^1=(-1/2+h^2/2,\,-h/\sqrt2),\qquad
x_2^1=(1/2-h^2/2,\,h/\sqrt2).
$$

新距離は

$$
d_1=\sqrt{(1-h^2)^2+2h^2}
=\sqrt{1+h^4}>0.
$$

この位置を使うと $a_1^1=((1-h^2),\sqrt2 h)/d_1^3$、$a_2^1=-a_1^1$ が求まり、

$$
v_1^1=\left(\frac h2\left[1+\frac{1-h^2}{d_1^3}\right],
-\frac1{\sqrt2}+\frac{\sqrt2 h^2}{2d_1^3}\right)
$$

となります。$v_2^1=-v_1^1$ です。初期の重心と全運動量が零なので、更新後も零を保つことが直接確認できます。
<!-- definition-example-end -->

<a id="prop-celev8-momentum"></a>
<!-- formal-statement-start -->
> **命題（Verlet法の全運動量保存）**  
> 第6節の更新で、各段階の全粒子位置が非衝突なら、全運動量 $P^k=\sum_i m_iv_i^k$ はステップごとに厳密な数式として保存する。浮動小数点実装での丸め誤差は別とする。
<!-- formal-statement-end -->

### 証明の見取り図

各粒子対 $(i,j)$ に働く質量を掛けた加速度の寄与が反対符号で打ち消し合います。その事実を速度更新式に代入します。

<!-- proof-start -->
### 証明

一対 $(i,j)$ による力は

$$
F_{ij}^k=Gm_im_j\frac{x_j^k-x_i^k}{|x_j^k-x_i^k|^3},
\quad F_{ji}^k=-F_{ij}^k.
$$

従って任意の非衝突位置列について

$$
\sum_i m_i a_i^k=\sum_{i<j}(F_{ij}^k+F_{ji}^k)=0.
$$

これを速度更新に掛けて和をとると

$$
P^{k+1}-P^k=\frac h2\left(\sum_i m_i a_i^k+
\sum_i m_i a_i^{k+1}\right)=0.
$$

よって帰納法で $P^k=P^0$ です。$\square$
<!-- proof-end -->

一方、**エネルギーを各ステップで厳密保存するとは主張しません**。時間刻みを半分にして有限区間のエネルギー偏差と閉合残差が小さくなるかを比較します。Euler法とVerlet法を同じ精度とみなさないことも大切です。質点間距離が正の下限を持ち、積分区間が有限で、滑らかなNewton解に十分近い条件なら、Taylor展開による局所位置誤差 $O(h^3)$、通常の有限時間大域二次精度が得られますが、近接衝突で一律の定数を保証しません。

## 7. エネルギー、重心、周期閉合の読み方

物理積分の各出力について、運動エネルギーから負の重力ポテンシャルを引いた全エネルギーを

$$
E=\frac12\sum_i m_i|v_i|^2-
G\sum_{i<j}\frac{m_im_j}{|x_i-x_j|}
$$

とし、[CELE2で導入した全運動量と角運動量](../../CELE/CELE2/index.md#prop-cele2-nbody-equations)に従って $P=\sum_i m_iv_i$、$L=\sum_i m_i(x_i\wedge v_i)$（$x_i\wedge v_i=x_{i,1}v_{i,2}-x_{i,2}v_{i,1}$）、重心 $c=\sum_i m_ix_i/\sum_i m_i$ を記録します。粒子間最小距離も一緒に表示します。$E(t)-E(0)$ はエネルギー偏差であり、$E(0)$ が零に近いとき相対偏差で割ることは避けます。

最初の検証模型は、前節の二体の円運動です。二粒子の間隔は1、各粒子が描く円の半径は $1/2$ です。各粒子に働くNewton加速度の大きさは1なので、円運動の向心加速度と照合すると

$$
\omega^2\frac12=1,\qquad
\omega=\sqrt2,\qquad
v=\omega\frac12=\frac1{\sqrt2},\qquad
T=\frac{2\pi}{\sqrt2}
$$

となります。これを質量1の二体の運動・位置エネルギーへ代入すると

$$
K=2\cdot\frac12\cdot\frac12=\frac12,\qquad
U=-\frac1{1}=-1
$$

です。従って

$$
E=-1/2,\qquad L=1/\sqrt2,\qquad c=(0,0),\qquad P=(0,0).
$$

これらは独立に計算した解析基準値です。[等質量正多角形の円形舞踏解定理](../CELEV6/index.md#thm-celev6-regular-polygon)により、等質量正三角形でも正しい $\omega$ を選んだ円軌道が作れます。

8の字の実験では $G=m_i=1$ とし、近似初期値

$$
\begin{aligned}
x_1(0)&=(-0.97000436,0.24308753),&
x_2(0)&=-x_1(0),&x_3(0)&=(0,0),\\
v_3(0)&=(0.93240737,0.86473146),&
v_1(0)&=v_2(0)=-v_3(0)/2
\end{aligned}
$$

を使い、参考周期を $T\approx6.3259$ とします。これらは丸めた近似値です。速度や質量を変更したら元の周期をそのまま満たすと期待してはいけません。

保存量の小さい誤差・見た目の閉じた軌跡・格子作用の降下だけでは、[CELEV5の8の字存在定理](../CELEV5/index.md#thm-celev5-eight-shape)を再証明したことにはなりません。数値軌道は有限時間しか積分せず、誤差を含みます。

### Burrauのピタゴラス三体問題：滑らかな図が正確とは限らない

二体円運動は解析解を持つため数値計算の検算に適しています。しかし三体問題には、初期条件が簡単でも近接遭遇によって数値積分が急に難しくなる例があります。それが**Burrauのピタゴラス三体問題**です。

$G=1$ とし、質量 $(m_1,m_2,m_3)=(3,4,5)$ の三粒子を、それぞれ $q_1(0)=(1,3)$、$q_2(0)=(-2,-1)$、$q_3(0)=(1,-1)$ に置き、全初速度を零にします。距離は

$$
|q_1-q_2|=5,\quad |q_1-q_3|=4,\quad |q_2-q_3|=3
$$

で、**質量と対辺の長さ**が一致しています。初速零なので運動エネルギーは零、ポテンシャルだけを計算すれば

$$
E(0)=-\left(\frac{3\cdot4}{5}+\frac{3\cdot5}{4}+
\frac{4\cdot5}{3}\right)=-\frac{769}{60}.
$$

この初期値からの運動は近接遭遇を経て非周期的となり、小さい質量3の粒子が脱出し、質量4と5が束縛されることが研究されました。ただし、固定刻みVerletで近接遭遇の向こうまで滑らかな軌跡が描けたことをもって、その結論を検証したと考えてはいけません。とくに $|E_h(t)-E(0)|$ と最小距離 $d_{\min}$ を追い、刻み半減も確認します。

[補講「Burrauのピタゴラス三体問題」](supplement-burrau.md) では、3粒子の初期加速度をNewton方程式から成分ごとに計算し、重心・保存量の独立検算と近接警告の意味を追います。[対話実験](https://insuns21.github.io/toukei-kentei_grade1_preparation/simulation/index.html) では番号付きの丸・四角・三角を**質点の現在位置**、線を**過去の軌跡**として表示します。これは三体の全時間軌道を保証するプログラムではありません。

## 8. 演習

### Level A

<a id="ex-celev8-a01"></a>
**A1. 離散作用の係数を点検する。** $m_1=m_2=G=T=1$、$N=4$ の静止格子 $q_1^k=(-1,0),q_2^k=(1,0)$ について $h,A_N$ と重心を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$h=T/N=1/4$。両粒子の位置は一定なので、すべての運動項 $|q_i^{k+1}-q_i^k|^2$ は0。距離は2だからポテンシャル項は各 $k$ で $hGm_1m_2/2=1/8$ です。よって $A_4=4(1/8)=1/2$。重心は $(q_1^k+q_2^k)/2=(0,0)$ です。作用が有限でも静止した二体はNewton解ではありません。
<!-- solution-end -->

<a id="ex-celev8-a02"></a>
**A2. 力の符号を確かめる。** 同じ静止二体で距離を $d>0$、位置を $(-d/2,0),(d/2,0)$ としたとき、$\nabla_{q_1^k}A_N$ の符号と大きさを求めよ（$G=m_i=T=1$）。

- Level: A

<!-- solution-start -->
### 詳細解答

時間差分は0で、加速度は $a_1=(1/d^2,0)$ です。[離散勾配命題](#prop-celev8-gradient)の式へ代入すると $\nabla_{q_1^k}A_N=h(1/d^2,0)$ です。$h=1/N$ だから $(1/(Nd^2),0)$。左粒子を右へ動かすと正の逆距離作用が増えるので、勾配の右向きという符号と一致します。
<!-- solution-end -->

<a id="ex-celev8-a03"></a>
**A3. 二体の解析基準値。** $G=m_1=m_2=r=1$ の円軌道で、半径 $r/2$、速さ $v=\sqrt{1/2}$ のとき $K,U,E,\omega,T$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

運動エネルギーは $K=2(1/2)v^2=v^2=1/2$、ポテンシャルエネルギーは $U=-1/r=-1$、合計 $E=-1/2$ です。角速度は円の半径から $\omega=v/(r/2)=2v=\sqrt2$、周期 $T=2\pi/\omega=2\pi/\sqrt2$ です。
<!-- solution-end -->

<a id="ex-celev8-a04"></a>
**A4. 中央差分を確認する。** $q^k=(k h)^2$ を無限等間隔のスカラー格子で考える。中央二階差分と真の二階微分を比較せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$q^{k+1}=(k+1)^2h^2$、$q^{k-1}=(k-1)^2h^2$ なので

$$
\frac{q^{k+1}-2q^k+q^{k-1}}{h^2}
=(k+1)^2-2k^2+(k-1)^2=2.
$$

連続関数 $q(t)=t^2$ の二階微分 $q''(t)=2$ と一致します。ここでは無限格子であって周期端点を課していません。有限周期格子に $q^k=(kh)^2$ をそのまま貼ると端点接合が変わり、同じ計算は境界で成立しません。
<!-- solution-end -->

<a id="ex-celev8-a05"></a>
**A5. 離散残差と周期閉合を区別する。** 第1節の三点静止二体で格子端点とNewton残差の値を答えよ。

- Level: A

<!-- solution-start -->
### 詳細解答

すべての $k$ で同じ位置だから $q^3=q^0$ となり、格子の位置閉合誤差は零です。しかし中央差分は零、各粒子の加速度は大きさ1なので、[離散Newton残差の定義](#def-celev8-discrete-residual)から $R_3=1$。端点の一致は力学方程式の成立とは独立です。
<!-- solution-end -->

### Level B

<a id="ex-celev8-b01"></a>
**B1. 勾配を有限差分で検算する。** $N=3,T=1$ の非衝突格子を取り、一つの座標成分だけ $\varepsilon$ 動かしたときの中心差分 $(A_N(q+\varepsilon e)-A_N(q-\varepsilon e))/(2\varepsilon)$ と第2節の勾配がどう対応するか導け。衝突からの距離にどんな条件が必要か。

- Level: B

<!-- solution-start -->
### 詳細解答

$e$ を一つの格子・粒子・座標成分が1で他が0の基底方向とします。最小距離 $\rho=\min_{k,i<j}|q_i^k-q_j^k|>0$ とし、$|\varepsilon|<\rho/4$ とすれば $q\pm\varepsilon e$ に衝突はありません。各方向で $f(s)=A_N(q+se)$ は $s=0$ の近傍で滑らかです。Taylor展開

$$
f(\varepsilon)=f(0)+\varepsilon f'(0)+\frac{\varepsilon^2}{2}f''(0)+O(\varepsilon^3),
$$

$$
f(-\varepsilon)=f(0)-\varepsilon f'(0)+\frac{\varepsilon^2}{2}f''(0)+O(\varepsilon^3)
$$

の差を $2\varepsilon$ で割ると $f'(0)+O(\varepsilon^2)$ になります。[勾配の公式](#prop-celev8-gradient)から $f'(0)=e\cdot\nabla A_N(q)$、つまり選んだ成分そのものです。$\varepsilon$ を小さくし過ぎると[桁落ち](../../../計算系/NA/NA1/index.md#def-na1-cancellation)が増えるため、検算では複数の刻みを比較します。
<!-- solution-end -->

<a id="ex-celev8-b02"></a>
**B2. 対称射影の固定点。** $N=12$、$\gamma^k=(a\sin\theta_k,b\sin2\theta_k)$、$\theta_k=2\pi k/12$ から三体ループを作る。(i) 舞踏条件、(ii) 重心零、(iii) 時刻反転・半周期鏡映を確認し、$P_Nq=q$ を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

(i) $q_i^k=\gamma^{k+4(i-1)}$ と作ったので $q_{i+1}^k=q_i^{k+4}$、また $\gamma^{k+12}=\gamma^k$ です。(ii) 和公式 $\sum_{j=0}^2e^{ir(\theta+2\pi j/3)}=e^{ir\theta}(1+\zeta^r+\zeta^{2r})=0$（$r=1,2$、$\zeta=e^{2\pi i/3}$）を虚部に適用すると、各成分の三粒子和は零です。(iii) 正弦関数は奇関数なので $\gamma^{-k}=-\gamma^k$。半周期では $\theta_{k+6}=\theta_k+\pi$ だから $x$ は符号が反転し、$y$ は不変です。全条件を満たすので、[射影命題](#prop-celev8-projection-properties)より $P_Nq=q$。
<!-- solution-end -->

<a id="ex-celev8-b03"></a>
**B3. 対称拘束でしか停留しない例。** $f(x,y)=x^2+(y-1)^2$ と部分空間 $V=\{(x,0)\}$ を考える。$V$ 上の極小と全空間の停留性を比較し、CELEV8の診断への教訓を述べよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$V$ 上では $y=0$ だから $f(x,0)=x^2+1$、極小点は $(0,0)$ です。全勾配は $\nabla f=(2x,2(y-1))$ なので $\nabla f(0,0)=(0,-2)\ne0$。$V$ への直交射影は $P_V(a,b)=(a,0)$ だから $P_V\nabla f(0,0)=(0,0)$ です。従って射影勾配零は制約外の微分が零という主張にはならず、[離散Newton残差](#def-celev8-discrete-residual)を別に表示する意味があります。
<!-- solution-end -->

<a id="ex-celev8-b04"></a>
**B4. 作用の減少と衝突ガード。** 非衝突 $q\in V_N$ で $g=P_N\nabla A_N(q)\ne0$ とする。$A_N$ の一次展開を導出し、線探索の採用判定を述べよ。もし試行点で距離が閾値以下になったらどうするか。

- Level: B

<!-- solution-start -->
### 詳細解答

直交射影の自己共役性から $\nabla A_N(q)\cdot P_N\nabla A_N(q)=\|g\|^2$ です。よって微分可能性を使い $A_N(q-\alpha g)=A_N(q)-\alpha\|g\|^2+o(\alpha)$。線探索は例えば $A_N(q-\alpha g)\le A_N(q)-10^{-4}\alpha\|g\|^2$ を試し、失敗なら $\alpha$ を半分にします。途中で距離が小さくなった試行点は**作用値の代わりに例外として棄却**し、旧 $q$ を維持します。分母に小さな正則化定数を足すと別のポテンシャルへ変わるため、同じNewton模型として扱えません。
<!-- solution-end -->

### Level C

<a id="ex-celev8-c01"></a>
**C1. 一つの候補を三種類の残差で検査する。** $N$ は6の倍数、等質量・$G=1$・$T>0$ とする。$q\in V_N$ が全格子点で非衝突であり、$P_N\nabla A_N(q)=0$ だが $\nabla A_N(q)\ne0$ と仮定する。(i) この条件から言えること・言えないことを整理せよ。(ii) 差分Newton残差と全勾配の関係を係数まで導出せよ。(iii) $q$ から近似速度を作って独立にNewton積分した場合、何を比べれば周期候補をさらに検算できるか述べよ。(iv) 最後になぜ厳密な存在証明とは別なのかを説明せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

(i) $q\in V_N$ は舞踏・重心零・鏡映等の線形条件を満たします。射影勾配が零なので、$V_N$ 内のすべての方向 $\eta$ に対して $DA_N(q)[\eta]=\nabla A_N(q)\cdot\eta=0$ です。しかし制約外の $\nabla A_N(q)$ は非零という仮定なので、全格子位置を独立に動かす停留点ではありません。非凸関数のため $V_N$ 上で最小だとさえ、一次条件だけでは言えません。

(ii) [離散勾配命題](#prop-celev8-gradient)により

$$
\nabla_{q_i^k}A_N
=\frac{m_i}{h}(2q_i^k-q_i^{k-1}-q_i^{k+1})+hm_ia_i(q^k)
=-hm_i\left(
\frac{q_i^{k+1}-2q_i^k+q_i^{k-1}}{h^2}-a_i(q^k)\right).
$$

従って等質量 $m_i=1$ では

$$
R_N(q)=\frac1h\max_{k,i}|\nabla_{q_i^k}A_N(q)|.
$$

これは無制約の勾配であり、$P_N\nabla A_N=0$ から $R_N=0$ は導けません。

(iii) まず各粒子について $x_i(0)=q_i^0$、$v_i(0)=(q_i^1-q_i^{N-1})/(2h)$ を用意します。格子作用最小化とは別の[Verlet更新](#def-celev8-verlet)で近似時刻 $T$ まで積分し、$|x_i(T)-x_i(0)|$ と $|v_i(T)-v_i(0)|$ の最大値を測ります。$T$ が物理刻みで割り切れないときは最終刻みを適切に分けるか端点補間の誤差を明示し、何を比較したか固定します。エネルギー偏差、最小距離、刻み半減での変化も確認します。

(iv) 有限格子・丸め・有限回反復には誤差があり、残差が小さいという数値事実だけでは無限次元の作用に非衝突の停留点が存在するとは言えません。[CELEV5の存在定理](../CELEV5/index.md#thm-celev5-eight-shape)は衝突回避、対称拡張など別の解析的論証を必要とします。数値探索は候補を作り検算する道具ですが、その論証の代わりではありません。
<!-- solution-end -->

## 9. 検証実験の順番と限界

まずAモードで二体円軌道を実行し、解析基準 $E=-1/2$、$L=1/\sqrt2$、$P=0$ と比較します。次に同じ物理時間で $dt$ を半分にし、エネルギー偏差と位置の閉合残差の変化を調べます。正三角形、8の字へ進むときは、近接距離と実際に積分した時間を確認します。

続いてBモードで $N$、周期、初期振幅を変更して、作用が減少するか、許容制約が維持されるか、射影勾配と**全方向の差分Newton残差**がどれだけ異なるかを比較します。表示された候補は初期曲線から更新した結果で、既知の8の字初期値の固定再生ではありません。局所停留点、試行失敗、衝突ガードは数値的な限界としてそのまま記録します。

有限刻みでの運動方程式の残差、作用の停留性、閉合、安定性はそれぞれ別の判定です。安定性を調べるなら[CELEV7のモノドロミーと乗数](../CELEV7/index.md#def-celev7-monodromy)に戻り、すべての独立初期方向に対して変分方程式を解く必要があります。単に近い軌跡を二本描いて重なるかどうかでは、Floquet乗数を計算したことにはなりません。
