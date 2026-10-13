# CELEV2 最小化列と周期解の存在

<!-- definition-example-audit: strict -->

[CELEV1の重心零周期ループ](../CELEV1/index.md#def-celev1-periodic-loop)ではNewtonの作用を定義し、[重心零だけでは強制性がない](../CELEV1/index.md#prop-celev1-no-coercivity)ことを確認しました。遠くへ離れた静止配置は、速度を上げずに位置エネルギーを小さくできるからです。一方、作用を最小化する手順には、最小化列の有界性、弱極限の許容性、極限で作用が増えないことが必要です。

そこで本章では「**全配置を半周期ずらすと符号が反転する**」という明示的な対称クラスに限り、三つの条件を出発点から確かめます。この制約でNewton作用の最小点は実際に存在します。ただし**最小点が衝突しないことは別問題**です。最後に衝突のない場合の運動方程式への橋を架け、滑らかな時間周期ポテンシャルなら周期解を最後まで計算できる例を示します。

## 1. 半周期の反転は定数モードを消す

粒子数 $n\ge2$、質量 $m_i>0$、重力定数 $G>0$、周期 $T>0$ を固定します。配置 $q=(q_1,\dots,q_n)$ は平面内で、[CELEV1の拡張Newton作用](../CELEV1/index.md#def-celev1-extended-action)を $\mathcal A_T$ とします。

全時刻で重心零にするだけでは不十分なので、時刻を $T/2$ ずらした位置が元の位置の負になるループだけを比較します。この制約は時間並進と平面の原点反転を組み合わせたもので、時間平均を必ず零にします。

<a id="def-celev2-halfturn"></a>
<!-- formal-statement-start -->
> **定義（半周期反転ループの許容クラス）**  
> $n\ge2$、$m_i,T>0$ とし、[重心零の周期ループ空間](../CELEV1/index.md#def-celev1-periodic-loop) $\mathcal H_T$ に対して
$$
\mathcal X_T=
\left\{q\in\mathcal H_T:
q_i(t+T/2)=-q_i(t)\
(0\le t\le T/2,\ 1\le i\le n)\right\}
$$
> と定める。等式は各 $H^1$ 曲線の連続代表について課す。$\mathcal X_T$ の元を半周期反転ループと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-celev2-halfturn -->
### 例：質量が異なっても許容曲線を作れる

**定義の確認**。$n=2$、$m_1=2$、$m_2=1$、$k=2\pi/T$ とし、
$$
q_1(t)=(\cos kt,\sin kt),\qquad
q_2(t)=-2q_1(t)
$$
とします。各成分は滑らかで $T$ 周期、$2q_1+q_2=0$ です。$\cos(k(t+T/2))=-\cos kt$ と $\sin(k(t+T/2))=-\sin kt$ なので、両粒子が半周期反転します。しかも粒子間距離は常に $3$ です。従って $q\in\mathcal X_T$ であり、有限作用の比較対象が一つ得られました。
<!-- definition-example-end -->

この対称性は任意の周期軌道に要求される物理法則ではありません。**比較する許容集合を意図的に狭くする**条件です。将来、異なる対称群を使うときには同じ制約を無条件に流用できません。

## 2. Poincaré評価で逃走列を止める

反転条件の両辺を時間積分すると、各粒子の平均位置が零になります。実際、
$$
\begin{aligned}
\int_0^Tq_i(t)\,dt
&=\int_0^{T/2}\{q_i(t)+q_i(t+T/2)\}\,dt\\
&=\int_0^{T/2}\{q_i(t)-q_i(t)\}\,dt=0.
\end{aligned}
$$

<a id="prop-celev2-coercivity"></a>
<!-- formal-statement-start -->
> **命題（半周期反転クラス上の強制性）**  
> $n\ge2$、$m_i,G,T>0$ とし、$\mathcal A_T$ を平面Newton n体の拡張作用とする。$m_{\min}=\min_i m_i$ とおくと、任意の $q\in\mathcal X_T$ に対し
$$
\|q\|_{H^1(0,T)}^2
\le(1+T^2)\sum_{i=1}^n\|\dot q_i\|_{L^2}^2,
$$
$$
\mathcal A_T[q]\ge
\frac{m_{\min}}{2(1+T^2)}\|q\|_{H^1(0,T)}^2.
$$
> 従って $\mathcal A_T|_{\mathcal X_T}$ は下に有界かつ $H^1$ ノルムについて強制的である。
<!-- formal-statement-end -->

### 証明の見取り図

反転条件から時間平均が零になります。各座標に[VAR9の平均零Poincaré評価](../../../解析系/VAR/VAR9/index.md#prop-var9-mean-zero-poincare)を適用し、速度だけで位置の二乗積分を抑えます。Newtonの正のポテンシャルは下界を悪化させません。

<!-- proof-start -->
### 証明

既に示した平均零の式を $q_i$ の二つの実座標へそれぞれ適用します。[VAR9の平均零Poincaré評価](../../../解析系/VAR/VAR9/index.md#prop-var9-mean-zero-poincare)で区間長 $L=T$ とすると、
$$
\int_0^T|q_i(t)|^2dt
\le T^2\int_0^T|\dot q_i(t)|^2dt.
$$
位置と導関数の $L^2$ ノルムを足して粒子について和を取ると、
$$
\begin{aligned}
\|q\|_{H^1}^2
&=\sum_i\left(\|q_i\|_2^2+\|\dot q_i\|_2^2\right)\\
&\le(1+T^2)\sum_i\|\dot q_i\|_2^2.
\end{aligned}
$$
[拡張作用の定義](../CELEV1/index.md#def-celev1-extended-action)から $U(q(t))\ge0$ であり、衝突がある場合も拡張実数の大小関係で
$$
\mathcal A_T[q]
\ge\frac12\sum_i m_i\|\dot q_i\|_2^2
\ge\frac{m_{\min}}2\sum_i\|\dot q_i\|_2^2.
$$
二つを合わせれば主張する下界です。右辺の係数は正なので、$\|q\|_{H^1}\to\infty$ のとき作用も $+\infty$ に向かいます。$\square$
<!-- proof-end -->

[CELEV1の静止配置による逃走列](../CELEV1/index.md#prop-celev1-no-coercivity)は、このクラスには入りません。反転する定数ループは $q_i=-q_i$ よりすべて零だからです。ここでは「重心零」ではなく「各粒子の時間平均零」が強制性を回復した決め手でした。

## 3. 弱極限も同じ対称性を保つ

最小化列に有界性が得られても、極限が許容集合の外へ出るなら最小点とは呼べません。特に端点一致と半周期反転は、$H^1$ 関数の連続代表で確認する必要があります。

<a id="prop-celev2-weak-closed"></a>
<!-- formal-statement-start -->
> **命題（許容クラスの弱逐次閉性）**  
> $n\ge2$、$m_i,T>0$ とする。$q^{(j)}\in\mathcal X_T$ が $H^1(0,T;(\mathbb R^2)^n)$ で弱収束して $q^{(j)}\rightharpoonup q$ なら $q\in\mathcal X_T$ である。
<!-- formal-statement-end -->

### 証明の見取り図

弱収束列は有界なので、[VAR9の一次元一様コンパクト性](../../../解析系/VAR/VAR9/index.md#prop-var9-uniform-compactness)で一様収束する部分列を取れます。その極限は弱極限と同じです。位置の等式で書かれた制約は、各時刻に一様収束を代入して保てます。

<!-- proof-start -->
### 証明

$H^1$ の弱収束列はノルム有界です。[VAR9の一様収束部分列の命題](../../../解析系/VAR/VAR9/index.md#prop-var9-uniform-compactness)を有限個の実座標へ適用し、同じ部分列を選び直して
$$
\sup_{0\le t\le T}|q^{(j_k)}(t)-v(t)|\longrightarrow0
$
となる連続関数 $v$ が得られます。一様収束は強 $L^2$ 収束を含むので、任意の $\varphi\in L^2(0,T;(\mathbb R^2)^n)$ に対して
$
\int_0^T(q^{(j_k)}-v)\cdot\varphi\,dt\longrightarrow0
$
です。一方、元の列は $q$ に $H^1$ 弱収束し、したがって $L^2$ 弱収束もするので
$
\int_0^T(q-v)\cdot\varphi\,dt=0
$
となります。ここで $\varphi=q-v$ を選べば $\|q-v\|_2^2=0$ です。$q$ と $v$ はともに連続代表を持つため、全時刻で $q(t)=v(t)$ と結論できます。

各 $j_k$ で $q^{(j_k)}(0)=q^{(j_k)}(T)$ なので、$k\to\infty$ として $q(0)=q(T)$ です。各時刻で
$$
\sum_i m_iq_i^{(j_k)}(t)=0
$$
の極限を取れば $\sum_i m_iq_i(t)=0$ です。さらに $0\le t\le T/2$ で
$$
q_i^{(j_k)}(t+T/2)+q_i^{(j_k)}(t)=0
$$
に一様収束を適用すれば $q_i(t+T/2)=-q_i(t)$ を得ます。従って $q$ は定義の全条件を満たします。$\square$
<!-- proof-end -->

弱収束そのものを点ごとの収束と言い換えてはいけません。ここでは**有界区間上の $H^1$ コンパクト埋め込み**を通して、必要な部分列だけで端点値を扱っています。

## 4. 衝突特異性はFatouの補題で扱う

作用の運動項には弱収束が効きます。しかし速度の弱収束から $|\dot q^{(j)}|^2$ の点ごとの収束は言えません。一方、ポテンシャル項には位置の一様収束が効きますが、衝突点では値が $+\infty$ になります。それぞれ別の根拠で下半連続性を証明します。

<a id="prop-celev2-action-lsc"></a>
<!-- formal-statement-start -->
> **命題（Newton拡張作用の弱逐次下半連続性）**  
> $n\ge2$、$m_i,G,T>0$ とし、[拡張作用](../CELEV1/index.md#def-celev1-extended-action)を $H^1(0,T;(\mathbb R^2)^n)$ の重心零ループに定める。$q^{(j)}\rightharpoonup q$ が $H^1$ 弱収束する重心零周期ループ列なら、
$$
\mathcal A_T[q]\le\liminf_{j\to\infty}\mathcal A_T[q^{(j)}].
$$
<!-- formal-statement-end -->

### 証明の見取り図

下極限を実現する部分列を取り、さらに位置が一様収束する部分列を取ります。運動項は[VAR9の弱逐次下半連続性の議論](../../../解析系/VAR/VAR9/index.md#def-var9-weak-lsc)を速度の二乗積分に適用し、位置項は非負の拡張実数値関数に対する[Fatouの補題](../../../解析系/F0/F0-00D2B/index.md#lem-f0-00d2b-01)を使います。

<!-- proof-start -->
### 証明

右辺の下極限を $\ell$ とします。$\ell=+\infty$ なら結論は自明です。有限なら、$\mathcal A_T[q^{(j_k)}]\to\ell$ となる部分列を取り、さらに[VAR9の一様コンパクト性](../../../解析系/VAR/VAR9/index.md#prop-var9-uniform-compactness)から位置の一様収束する部分列を取ります。記号を簡単にするため、この部分列を再び $q^{(j)}$ と書きます。

速度について $\dot q^{(j)}\rightharpoonup\dot q$ in $L^2$ です。[VAR9で用いた弱ノルム下半連続性](../../../解析系/VAR/VAR9/index.md#def-var9-weak-lsc)を質量で重み付けした各座標に適用し、
$$
\frac12\sum_i m_i\|\dot q_i\|_2^2
\le\liminf_j\frac12\sum_i m_i\|\dot q_i^{(j)}\|_2^2
$$
を得ます。

一方、各時刻で $q^{(j)}(t)\to q(t)$ です。$x\mapsto U(x)$ は衝突点で $+\infty$ を取る下半連続関数です。実際 $x_i=x_k$ なら $|x_i^{(j)}-x_k^{(j)}|\to0$ からその対の $Gm_im_k/|x_i^{(j)}-x_k^{(j)}|$ は $+\infty$ へ向かい、非衝突なら通常の連続性が成り立ちます。従って
$$
U(q(t))\le\liminf_j U(q^{(j)}(t)).
$$
すべての値は非負で可測なので[Fatouの補題](../../../解析系/F0/F0-00D2B/index.md#lem-f0-00d2b-01)により
$$
\int_0^TU(q(t))\,dt
\le\liminf_j\int_0^TU(q^{(j)}(t))\,dt.
$$

運動項と位置項はともに非負なので、二つの下半連続評価を加え、
$$
\begin{aligned}
\mathcal A_T[q]
&=\frac12\sum_i m_i\|\dot q_i\|_2^2+\int_0^TU(q(t))\,dt\\
&\le\liminf_j\left\{
\frac12\sum_i m_i\|\dot q_i^{(j)}\|_2^2
+\int_0^TU(q^{(j)}(t))\,dt
\right\}=\ell.
\end{aligned}
$$
最初に選んだ部分列は元の下極限に収束するため、主張が得られます。$\square$
<!-- proof-end -->

衝突時刻が一点だけならポテンシャル積分は有限にもなります。[CELEV1の有限作用衝突例](../CELEV1/index.md#prop-celev1-finite-collision)がその実例です。Fatouの補題は「作用が極限で増えない」ことを保証しますが、「衝突を一切含まない」ことは保証しません。

## 5. 有限作用の比較曲線から最小点の存在まで

存在を示すには、下限が $+\infty$ という空虚な事態も除かねばなりません。任意の正の質量で、粒子同士がぶつからずに一緒に回る**試験ループ**を構成できます。これがNewton方程式を満たす必要はありません。

$a>0$、$k=2\pi/T$、$M=\sum_i m_i$ とし、
$$
c=\frac1M\sum_{i=1}^n m_i i,\qquad
e(t)=(\cos kt,\sin kt),\qquad
p_i(t)=a(i-c)e(t).
$$
$i$ は粒子番号の実数として使っています。重心は $\sum_i m_i(i-c)=0$、半周期後は $e(t+T/2)=-e(t)$ です。また $i\ne j$ なら
$$
|p_i(t)-p_j(t)|=a|i-j|\ge a>0.
$$
速度は有界で、Newtonポテンシャルの各分母にも正の下界があるので $\mathcal A_T[p]<\infty$ です。

<a id="thm-celev2-minimizer"></a>
<!-- formal-statement-start -->
> **定理（半周期反転クラスにおけるNewton作用の最小点）**  
> 平面のNewton $n$ 体問題で $n\ge2$、$m_i,G,T>0$ とする。[半周期反転クラス](#def-celev2-halfturn) $\mathcal X_T$ について、有限作用のループ $q_*\in\mathcal X_T$ が存在し、
$$
\mathcal A_T[q_*]=
\inf_{q\in\mathcal X_T}\mathcal A_T[q]<+\infty
$$
> が成り立つ。$q_*$ は定数ループではない。**この結論だけでは $q_*$ の非衝突性、$C^2$ 正則性、Newton方程式を主張しない。**
<!-- formal-statement-end -->

### 証明の見取り図

比較曲線 $p$ により下限を有限にし、最小化列を取ります。[強制性](#prop-celev2-coercivity)で有界にし、Hilbert空間の弱コンパクト性から部分列の弱極限を得ます。[弱閉性](#prop-celev2-weak-closed)と[下半連続性](#prop-celev2-action-lsc)をその部分列へ適用します。

<!-- proof-start -->
### 証明

$\mathcal A_T\ge0$ であり、上の試験ループ $p$ により
$$
0\le\alpha:=
\inf_{q\in\mathcal X_T}\mathcal A_T[q]
\le\mathcal A_T[p]<+\infty.
$$
下限の定義から $q^{(j)}\in\mathcal X_T$ を、$\mathcal A_T[q^{(j)}]\le\alpha+1/j$ となるよう選べます。各項は有限作用です。[強制性の下界](#prop-celev2-coercivity)を適用すると、
$$
\|q^{(j)}\|_{H^1}^2
\le\frac{2(1+T^2)}{m_{\min}}(\alpha+1),
$$
よって列は $H^1$ 有界です。$H^1$ はHilbert空間なので、部分列（同じ記号）と $q_*$ が存在して $q^{(j)}\rightharpoonup q_*$ です。

[許容クラスの弱逐次閉性](#prop-celev2-weak-closed)から $q_*\in\mathcal X_T$。[Newton作用の弱逐次下半連続性](#prop-celev2-action-lsc)より
$$
\alpha\le\mathcal A_T[q_*]
\le\liminf_j\mathcal A_T[q^{(j)}]=\alpha,
$$
従って $\mathcal A_T[q_*]=\alpha<\infty$ です。

最後に、$q_*$ が定数曲線なら半周期反転条件から $q_{*,i}=-q_{*,i}$、従って全粒子が原点にあり、常時衝突して $\mathcal A_T[q_*]=+\infty$ です。有限作用と矛盾するため定数ではありません。$\square$
<!-- proof-end -->

これは[VAR9の直接法](../../../解析系/VAR/VAR9/index.md#thm-var9-direct-method)の条件を、Newton n体の**特定のクラス**で逐一実証したものです。下限を取ることと、任意の変分方向で停留することはまだ同じではありません。

## 6. 衝突がなければNewton方程式へ進める

最小点 $q_*$ がすべての時刻で非衝突であると**追加で仮定**します。連続な $q_*$ とコンパクト区間から粒子間距離に正の一様下界 $\rho$ ができます。したがって十分小さな $H^1$ 変分では衝突せず、作用の第一変分が定義できます。

[CELEV1の停留命題](../CELEV1/index.md#prop-celev1-periodic-stationarity)は最初から $C^2$ を仮定していました。今回は $H^1$ の極小点から、その正則性と端点速度接合を順序立てて導きます。

<a id="thm-celev2-conditional-newton"></a>
<!-- formal-statement-start -->
> **定理（非衝突極小点のNewton周期解への昇格）**  
> $n\ge2$、$m_i,G,T>0$ とし、$q_*$ は[半周期反転クラス](#def-celev2-halfturn) $\mathcal X_T$ におけるNewton作用の最小点とする。さらに
$$
q_{*,i}(t)\ne q_{*,j}(t)
\quad(0\le t\le T,\ i\ne j)
$$
> を仮定する。このとき $q_*\in C^2([0,T];(\mathbb R^2)^n)$ で、すべての $i$ について
$$
m_i\ddot q_{*,i}(t)
=G\sum_{j\ne i}m_im_j
\frac{q_{*,j}(t)-q_{*,i}(t)}
{|q_{*,j}(t)-q_{*,i}(t)|^3}
\quad(0\le t\le T)
$$
> が成立し、位置と速度はそれぞれ $T$ 周期の端点条件を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

対称クラスの中の極小性から、まず対称変分に対する第一変分が零になります。作用は半周期シフトと原点反転の組合せで不変なので、変分方向を平均化すると任意の周期変分でも停留することが分かります。重心成分を除いて全粒子独立な方向に拡張し、弱方程式、$C^2$ 正則性、速度接合の順に示します。

<!-- proof-start -->
### 証明

非衝突距離の一様下界 $\rho>0$ があるので、$H^1$ の連続代表を使い、$C^1$ 方向 $h$ と十分小さな $|\varepsilon|$ に対して $q_*+\varepsilon h$ は非衝突です。$U$ の偏微分は距離 $\rho/2$ 以上の領域で有界なので積分内微分でき、
$$
D\mathcal A_T(q_*)[h]
=\int_0^T\sum_i\left(
m_i\dot q_{*,i}\cdot\dot h_i
+F_i(q_*)\cdot h_i\right)dt,
$$
ここで
$$
F_i(x)=G\sum_{j\ne i}m_im_j
\frac{x_j-x_i}{|x_j-x_i|^3}.
$$
ここで作用の式は、重心零でない周期方向も検討できるよう同じ積分公式で局所的に拡張して用います。この導出は[CELEV1の粒子対の連鎖律](../CELEV1/index.md#prop-celev1-first-variation)と同じで、部分積分する前の式は $H^1$ 曲線にも成立します。

周期方向 $h$ に作用する写像を $Sh(t)=-h(t+T/2)$ と定め、周期的に延長して解釈します。$S^2h=h$、$Sq_*=q_*$ です。運動項は時間平行移動と符号反転で変わらず、$U(-x)=U(x)$ なので
$$
\mathcal A_T[S(q_*+\varepsilon h)]
=\mathcal A_T[q_*+\varepsilon h].
$$
微分すれば
$$
D\mathcal A_T(q_*)[Sh]
=D\mathcal A_T(q_*)[h].
$$
$h_{\rm sym}=(h+Sh)/2$ は半周期反転します。さらに
$$
c(t)=M^{-1}\sum_i m_i h_{{\rm sym},i}(t),\qquad
\eta_i=h_{{\rm sym},i}-c
$$
と置けば、$\eta$ は重心零・半周期反転・周期端点条件を満たします。従って極小性から $D\mathcal A_T(q_*)[\eta]=0$ です。

$h_{\rm sym}$ と $\eta$ の差は全粒子共通の $c(t)$ です。ポテンシャルは粒子間差だけを見るのでこの方向の微分は零であり、運動項は $\sum_i m_i\dot q_{*,i}=0$ から
$$
\int_0^T\sum_i m_i\dot q_{*,i}\cdot\dot c\,dt=0.
$$
ゆえに
$$
D\mathcal A_T(q_*)[h]
=D\mathcal A_T(q_*)[h_{\rm sym}]
=D\mathcal A_T(q_*)[\eta]=0
$$
が**任意の $C^1$ 周期方向 $h$** について成立します。

$(0,T)$ に台を持ち、粒子 $i$ の一成分だけ非零の滑らかな $h$ を取ると、分布の意味で
$$
-m_i q_{*,i}''+F_i(q_*)=0.
$$
連続な $q_*$ は非衝突なので $t\mapsto F_i(q_*(t))$ も連続です。分布微分が連続関数に等しいことから $q_{*,i}'$ は絶対連続な代表を持ち、その導関数は $F_i(q_*)/m_i$ です。さらに右辺が連続だから $q_{*,i}\in C^2([0,T])$ となり、Newton方程式は端点を含めて成立します。

最後に第一変分を部分積分します。内部方程式によって積分項は零となり、
$$
0=D\mathcal A_T(q_*)[h]
=\sum_i m_i\bigl(\dot q_{*,i}(T)-\dot q_{*,i}(0)\bigr)\cdot h_i(0).
$$
粒子一つだけに任意の定数ベクトルを与え、他の粒子の方向を零にする周期 $h$ を選べるので、$m_i>0$ から各速度差が零です。位置周期は $\mathcal X_T$ の定義に含まれています。$\square$
<!-- proof-end -->

この定理の追加仮定である**非衝突**を証明するのが後続の課題です。対称変分の極小性と全変分の停留性を結ぶ平均化は使えても、そこで先に衝突を消すことはできません。

## 7. 滑らかな時間周期ポテンシャルでは周期解を最後まで計算できる

特異性のない模型では、同じ直接法が本当に周期解の存在へつながる様子を確認できます。質点一つの実数値関数 $u(t)$、$T>0$、$\kappa>0$、$a\ne0$ とし、$k=2\pi/T$、$b(t)=a\sin kt$ と置きます。作用は
$$
J[u]=\frac12\int_0^T
\bigl\{|u'(t)|^2+\kappa|u(t)-b(t)|^2\bigr\}dt
$$
です。これはNewton重力のポテンシャルではなく、**時刻 $T$ 周期の滑らかな位置ポテンシャル**です。$b(t+T/2)=-b(t)$ なので、半周期反転の条件と両立します。

<a id="prop-celev2-smooth-periodic"></a>
<!-- formal-statement-start -->
> **命題（周期外力を持つ二次作用の非自明な周期最小点）**  
> $T,\kappa>0$、$a\in\mathbb R\setminus\{0\}$、$k=2\pi/T$、$b(t)=a\sin kt$ とする。作用
$$
J[u]=\frac12\int_0^T\{(u')^2+\kappa(u-b)^2\}\,dt
$$
> は $H^1$ の $T$ 周期関数全体で一意な最小点を持ち、その最小点は
$$
u_*(t)=\frac{\kappa a}{k^2+\kappa}\sin kt
$$
> である。$u_*$ は半周期反転し、$C^\infty$ 級の非定数周期解として
$$
u_*''(t)=\kappa\{u_*(t)-b(t)\}
$$
> および位置・速度の周期端点条件を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

係数を未知数として正弦関数を方程式へ代入します。その候補と任意の周期曲線の作用差を平方の和へ展開すると、交差項が弱方程式によって消え、大域最小と一意性まで証明できます。

<!-- proof-start -->
### 証明

$u_*(t)=c\sin kt$ と仮定します。$u_*''=-k^2c\sin kt$ であり、右辺は $\kappa(c-a)\sin kt$ なので、
$$
-k^2c=\kappa(c-a)
\quad\Longleftrightarrow\quad
c=\frac{\kappa a}{k^2+\kappa}.
$$
この $c$ は $a\ne0$ と $\kappa>0$ により非零です。$u_*$ と $u_*'$ は $T$ 周期で、正弦関数の半周期反転も成立します。

任意の周期 $u\in H^1(0,T)$ を $u=u_*+w$ と書きます。$w$ も周期 $H^1$ 関数です。平方を一項ずつ展開すると
$$
\begin{aligned}
J[u]-J[u_*]
={}&\int_0^T\{u_*'w'+\kappa(u_*-b)w\}\,dt\\
&+\frac12\int_0^T\{(w')^2+\kappa w^2\}\,dt.
\end{aligned}
$$
絶対連続な $w$ と滑らかな $u_*$ について部分積分すると、
$$
\begin{aligned}
\int_0^T u_*'w'\,dt
&=[u_*'w]_0^T-\int_0^Tu_*''w\,dt\\
&=-\int_0^T\kappa(u_*-b)w\,dt.
\end{aligned}
$$
境界項は両関数の周期端点条件で消えました。従って
$$
J[u]-J[u_*]
=\frac12\int_0^T\{(w')^2+\kappa w^2\}\,dt\ge0.
$$
等号なら $\kappa>0$ から $w=0$ ほとんど至るところであり、連続代表として同一曲線です。よって全周期 $H^1$ 関数上で一意な最小点です。$\square$
<!-- proof-end -->

この例では滑らかな非衝突ポテンシャルと周期外力が、非零の最小点と微分方程式をともに与えました。Newton重力の**非自明な作用最小点が存在する**ことと、**その点が特異集合から離れてNewtonの周期解になる**ことは分けて考える必要があります。

## 8. 演習と詳細解答

### Level A

<a id="ex-celev2-a01"></a>
**A1. 半周期反転の条件。** $m_1=2,m_2=1$、$k=2\pi/T$ として $q_1(t)=r(\cos kt,\sin kt)$、$q_2(t)=-2q_1(t)$（$r>0$）を考える。$\mathcal X_T$ の全条件と各粒子の時間平均を確認せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

三角関数は滑らかな $T$ 周期関数なので両粒子は周期 $H^1$ に属します。重心の分子は $2q_1+q_2=0$ です。$kT/2=\pi$ なので $q_i(t+T/2)=-q_i(t)$。また
$$
\int_0^Tq_1(t)\,dt
=r\left(\frac{\sin kT-\sin0}{k},\frac{-\cos kT+\cos0}{k}\right)=0.
$$
$q_2=-2q_1$ より $q_2$ の平均も零です。従って[半周期反転クラス](#def-celev2-halfturn)に属します。
<!-- solution-end -->

<a id="ex-celev2-a02"></a>
**A2. 平均零の評価。** $T=2$、$u(t)=\sin(\pi t)$ とする。$u(t+1)=-u(t)$ を確かめ、$\|u\|_2^2$ と $\|u'\|_2^2$ を計算して[本章のPoincaré評価](#prop-celev2-coercivity)に矛盾しないことを確かめよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\sin(\pi(t+1))=-\sin\pi t$ なので反転します。$\sin^2\theta=(1-\cos2\theta)/2$ より
$$
\|u\|_2^2
=\int_0^2\sin^2(\pi t)\,dt
=\left[\frac t2-\frac{\sin2\pi t}{4\pi}\right]_0^2=1.
$$
$u'=\pi\cos\pi t$ であり、
$$
\|u'\|_2^2=\pi^2\int_0^2\cos^2(\pi t)\,dt=\pi^2.
$$
区間長 $T=2$ の評価は $1\le4\pi^2$ となり成立します。
<!-- solution-end -->

<a id="ex-celev2-a03"></a>
**A3. 三体の有限作用比較曲線。** $n=3$、$m_i=G=1$、$T=2\pi$ とし、$q_1=-e(t),q_2=0,q_3=e(t)$、$e(t)=(\cos t,\sin t)$ とする。$\mathcal X_T$ に属することを確認し、運動エネルギー、ポテンシャル、全作用を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

重心は $-e+0+e=0$、$e(t+\pi)=-e(t)$ なので各粒子は半周期反転します。三つの相互距離は $1,1,2$ で常に正です。粒子1と3の速度の大きさが1、粒子2は静止なので
$$
K=\frac12(1+0+1)=1.
$$
ポテンシャルは
$$
U=\frac1{|q_1-q_2|}+\frac1{|q_2-q_3|}+\frac1{|q_1-q_3|}
=1+1+\frac12=\frac52.
$$
両者は時刻によらないので $\mathcal A_T=(2\pi)(1+5/2)=7\pi$。有限の比較曲線です。これは運動方程式の解であるとは限りません。
<!-- solution-end -->

<a id="ex-celev2-a04"></a>
**A4. 衝突での下半連続性。** 二粒子配置 $x^{(j)}_1=(1/j,0)$、$x^{(j)}_2=0$、$G=m_1=m_2=1$ とする。$U(x^{(j)})$ と極限配置での $U$ を求め、拡張値の扱いを説明せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

距離は $1/j$ であり、[拡張Newtonポテンシャル](../CELEV1/index.md#def-celev1-extended-action)から
$$
U(x^{(j)})=\frac1{1/j}=j\longrightarrow+\infty.
$$
極限は $x_1=x_2=0$ の衝突配置なので $U(x)=+\infty$ と定義します。従って
$$
U(x)=+\infty=\liminf_{j\to\infty}U(x^{(j)}).
$$
この点ごとの事実だけで曲線の作用が無限大になるとは言えません。単一点の衝突と正の長さの時間集合上での衝突を区別します。
<!-- solution-end -->

<a id="ex-celev2-a05"></a>
**A5. 周期外力の係数。** 第7節で $T=2\pi$、$\kappa=3$、$a=2$ とする。唯一の最小点を求め、微分方程式と半周期反転を代入で確認せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$k=1$ なので[滑らかな周期最小点の命題](#prop-celev2-smooth-periodic)から
$$
u_*(t)=\frac{3\cdot2}{1+3}\sin t=\frac32\sin t.
$$
左辺は $u_*''=-\frac32\sin t$、右辺は $3(u_*-2\sin t)=3(-\frac12\sin t)=-\frac32\sin t$ で一致します。$u_*(t+\pi)=-u_*(t)$ も正弦関数から成立します。
<!-- solution-end -->

### Level B

<a id="ex-celev2-b01"></a>
**B1. なぜ定数の逃走列が消えるか。** 正の質量の二体で、重心零の定数曲線 $q_1=Re,q_2=-(m_1/m_2)Re$ ($|e|=1$) の作用とノルムの $R\to\infty$ における挙動を求めよ。また $R>0$ のとき $\mathcal X_T$ に属さない理由を、半周期条件から説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

相対距離は $R(1+m_1/m_2)=RM/m_2$、運動項は零なので
$$
\mathcal A_T[q]=\frac{TGm_1m_2^2}{RM}\longrightarrow0.
$$
一方、導関数は零で、
$$
\|q\|_{H^1}^2
=TR^2\left(1+\frac{m_1^2}{m_2^2}\right)\longrightarrow+\infty.
$$
これは[CELEV1の非強制性](../CELEV1/index.md#prop-celev1-no-coercivity)と同じ機構です。しかし定数曲線で半周期反転すると $q_i=-q_i$、すなわち各 $q_i=0$ が必要です。$R>0$ では満たせません。このため強制性を壊した具体的な列は新しい許容集合から除外されます。
<!-- solution-end -->

<a id="ex-celev2-b02"></a>
**B2. 弱閉性の確認。** $q^{(j)}\in\mathcal X_T$ が $H^1$ 弱収束すると仮定する。どの部分列を取り、どの三条件へ極限を代入すれば、極限が $\mathcal X_T$ に入るか証明せよ。弱収束を点ごとの収束と同一視しないこと。

- Level: B

<!-- solution-start -->
### 詳細解答

弱収束列は $H^1$ 有界です。[VAR9の一様コンパクト性](../../../解析系/VAR/VAR9/index.md#prop-var9-uniform-compactness)で一様収束部分列 $q^{(j_k)}\to v$ を取れます。一様収束から $L^2$ 強収束も従います。任意の $\varphi\in L^2$ に対し、強収束から $\int(q^{(j_k)}-v)\cdot\varphi\to0$、弱収束から $\int(q^{(j_k)}-q)\cdot\varphi\to0$ です。差を取って $\int(q-v)\cdot\varphi=0$ となり、$\varphi=q-v$ を選ぶと $\|q-v\|_2^2=0$。連続代表として $v=q$ です。すると
$$
q^{(j_k)}(0)-q^{(j_k)}(T)=0
\ \Longrightarrow\ q(0)-q(T)=0.
$$
任意の $t$ について有限和 $\sum_i m_iq_i^{(j_k)}(t)=0$ の極限は $\sum_i m_iq_i(t)=0$ です。最後に $0\le t\le T/2$ で
$$
q_i^{(j_k)}(t+T/2)+q_i^{(j_k)}(t)=0
\ \Longrightarrow\ q_i(t+T/2)+q_i(t)=0.
$$
三条件は全て連続代表で成り立つため、[定義](#def-celev2-halfturn)より $q\in\mathcal X_T$ です。
<!-- solution-end -->

<a id="ex-celev2-b03"></a>
**B3. 弱収束と衝突特異性。** 作用 $\mathcal A_T[q^{(j)}]$ の下極限を扱うとき、(i) 運動エネルギー、(ii) 重力ポテンシャルの積分をそれぞれどう評価するか書き分け、弱収束と一様収束の役割および積分の下極限を扱う根拠を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

(i) $q^{(j)}\rightharpoonup q$ in $H^1$ から $\dot q_i^{(j)}\rightharpoonup\dot q_i$ in $L^2$ です。質量 $m_i>0$ なので弱ノルム下半連続性によって
$$
\frac12\sum_i m_i\|\dot q_i\|_2^2
\le\liminf_j\frac12\sum_i m_i\|\dot q_i^{(j)}\|_2^2.
$$
弱収束だけから速度の点ごとの収束を主張してはいけません。

(ii) まず作用の下極限に収束する部分列を取り、その $H^1$ 有界性から位置が一様収束する部分列を取ります。$U$ は衝突点を $+\infty$ とする下半連続関数なので、各 $t$ で
$$
U(q(t))\le\liminf_jU(q^{(j)}(t)).
$$
$U\ge0$ だから[Fatouの補題](../../../解析系/F0/F0-00D2B/index.md#lem-f0-00d2b-01)を適用して積分の下半連続性を得ます。正の二項の下半連続評価を足せば[本章の命題](#prop-celev2-action-lsc)になります。
<!-- solution-end -->

<a id="ex-celev2-b04"></a>
**B4. 対称方向から全方向へ。** 非衝突の作用最小点 $q_*\in\mathcal X_T$ と任意の周期 $C^1$ 方向 $h$ に対し、$Sh(t)=-h(t+T/2)$、$h_{\rm sym}=(h+Sh)/2$ とする。$h_{\rm sym}$ が反転条件を満たすことを証明し、重心補正後の停留性が任意の $h$ に広がる理由を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

周期性により
$$
S^2h(t)=-Sh(t+T/2)=h(t+T)=h(t).
$$
よって
$$
Sh_{\rm sym}
=\tfrac12(Sh+S^2h)=h_{\rm sym}.
$$
これは $h_{\rm sym}(t+T/2)=-h_{\rm sym}(t)$ を意味します。$c=M^{-1}\sum_i m_i h_{{\rm sym},i}$ は同じ反転条件を満たし、$\eta_i=h_{{\rm sym},i}-c$ は重心零の許容変分です。極小性から $D\mathcal A_T(q_*)[\eta]=0$。一方、$Sq_*=q_*$ と作用の反転不変性により $D\mathcal A_T(q_*)[Sh]=D\mathcal A_T(q_*)[h]$、従って $D\mathcal A_T(q_*)[h_{\rm sym}]=D\mathcal A_T(q_*)[h]$ です。最後に $\sum_i m_i\dot q_{*,i}=0$ とポテンシャルの相対位置依存性により全粒子共通の $c$ 方向の第一変分は零です。よって $D\mathcal A_T(q_*)[h]=0$ となります。**非衝突仮定**はここで微分可能性を使うために必要です。
<!-- solution-end -->

### Level C

<a id="ex-celev2-c01"></a>
**C1. 円形試験ループでの有限次元最小化とその限界。** $m_1,m_2,G,T>0$、$M=m_1+m_2$、$\mu=m_1m_2/M$、$k=2\pi/T$ とする。$a>0$ に対して
$$
q_1(t)=\frac{m_2}{M}a(\cos kt,\sin kt),\quad
q_2(t)=-\frac{m_1}{M}a(\cos kt,\sin kt)
$$
を考える。(i) $\mathcal X_T$ に入ることと非衝突性を確認せよ。(ii) 作用を $a$ の関数として求めよ。(iii) この円形試験族の中で作用を最小にする半径を求め、二階微分で極小性を確かめよ。(iv) 得た円軌道のNewton方程式を確認し、この計算だけで $\mathcal X_T$ 全体の最小点が非衝突であると結論できるか論じよ。

- Level: C

<!-- solution-start -->
### 詳細解答

(i) 重心の分子は $m_1(m_2/M)ae-m_2(m_1/M)ae=0$ です。$e(t+T/2)=-e(t)$ と $e(T)=e(0)$ より周期・反転条件を満たします。相対ベクトルは $q_1-q_2=ae$、距離は常に $a>0$ です。

(ii) $|\dot e|=k$ なので
$$
\begin{aligned}
K&=\frac12a^2k^2
\left(m_1\frac{m_2^2}{M^2}+m_2\frac{m_1^2}{M^2}\right)\\
&=\frac12\frac{m_1m_2(m_1+m_2)}{M^2}a^2k^2
=\frac12\mu a^2k^2.
\end{aligned}
$$
$U=Gm_1m_2/a$ は時刻によらないため
$$
A(a):=\mathcal A_T[q]
=T\left(\frac12\mu k^2a^2+\frac{Gm_1m_2}{a}\right).
$$

(iii) $a>0$ 上で微分すると
$$
A'(a)=T\left(\mu k^2a-\frac{Gm_1m_2}{a^2}\right).
$$
$A'(a)=0$ は $\mu k^2a^3=Gm_1m_2$ と同値です。$\mu=m_1m_2/M$ から
$$
a_*^3=\frac{GM}{k^2},\qquad
a_*=\left(\frac{GMT^2}{4\pi^2}\right)^{1/3}.
$$
さらに
$$
A''(a)=T\left(\mu k^2+\frac{2Gm_1m_2}{a^3}\right)>0.
$$
$A(a)\to+\infty$ は $a\downarrow0$ と $a\to\infty$ の両端で成立するため、これは円形試験族内の唯一の大域最小です。

(iv) $q_1''=-(m_2/M)ak^2e$、粒子1に働く力は $F_1=-Gm_1m_2e/a^2$ です。$m_1q_1''=F_1$ は $k^2a^3=GM$ と等価で、(iii) の条件そのものです。粒子2にも同様に運動方程式が成立します。しかし比較したのは**円形の一パラメータ族だけ**です。[全 $\mathcal X_T$ 上の存在定理](#thm-celev2-minimizer)の最小点がこの円形族にあるという証明はありません。したがって、他の許容曲線に衝突のある極小点が生じないかどうかは、この計算からは判断できません。
<!-- solution-end -->

## 9. 次に必要な論証

本章では、明示した反転クラスについて、有限作用の比較曲線、強制性、弱閉性、弱下半連続性を揃えてNewton作用の最小点を得ました。最小点は定数ではありません。しかし、有限作用の衝突は許されうるため、これをそのままNewtonの周期解と呼ぶことはできません。

一方、**非衝突なら**、変分の平均化、弱方程式、正則性と周期端点の接合までが成立します。残る鍵は、極小点に衝突がないことをどの条件で証明できるかです。次章では、固定端点変形が許される場合と対称性に妨げられる場合を分け、特異ポテンシャルに対する局所変形を学びます。
