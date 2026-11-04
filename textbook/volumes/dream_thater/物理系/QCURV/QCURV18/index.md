# QCURV18 Hawking導出の適用範囲と超Planckian周波数の感度

<!-- definition-example-audit: strict -->

[QCURV10の崩壊光線の指数則](../QCURV10/index.md#thm-qcurv10-late-exponential)と[QCURV11のHawking熱因子](../QCURV11/index.md#thm-qcurv11-thermal-ratio)により、地平線を形成する崩壊模型の後期波束には熱的な占有数が現れます。[QCURV17の半古典的な質量収支](../QCURV17/index.md#thm-qcurv17-mass-cubic-law)は、その遠方光度をゆっくり減る質量に結び付けました。しかし、遠方では穏やかな周波数の波を過去へたどると、指数的に高い周波数へ達します。

これは矛盾でしょうか。ここでは「**計算にどこまでの物理を仮定したか**」を、光線の時計、入射状態、周波数の閾値、有限時間の波束に分解して点検します。とくに **超Planckian周波数が現れるという運動学的な計算**と、**その領域で分散関係や状態を変えても放射が不変という物理的主張**を同一視しません。

基本設定は計量符号 $(-,+,+,+)$、$\hbar=c=k_B=1$ の漸近平坦な、非回転・非荷電ブラックホールを形成する球対称崩壊時空です。$G_N>0$ は Newton 定数で、Planck角周波数の目安は $G_N^{-1/2}$ です。自由実スカラー場の外へ逃げる幾何光学成分をまず $1+1$ 次元の光線模型として扱い、散乱障壁・量子状態・重力への逆作用は最後に別の条件として戻します。

## 1. 遠方の低周波光を過去へ逆追跡すると

過去零無限遠の入射光線ラベルを $v$、未来零無限遠の出射光線ラベルを $u$ とします。両方とも漸近平坦な遠方の時計に規格化した、長さの次元を持つ零時刻です。[QCURV10の入出射写像](../QCURV10/index.md#def-qcurv10-ray-map)を $v=p(u)$ と書きます。プライムは各写像の引数による微分で、$p'(u)=dp/du$、逆関数については $q'(v)=dq/dv$ です。脱出光線上で $p'(u)>0$ とすれば逆関数 $u=q(v)$ が存在します。

入射側で $e^{-i\Omega v}$、出射側で $e^{-i\omega u}$ を正周波数と呼ぶ規約は[QCURV10の波束定義](../QCURV10/index.md#def-qcurv10-asymptotic-packets)と同じです。出射角周波数 $\omega>0$ を固定し、出射位相を過去へ戻すと $e^{-i\omega q(v)}$。局所的な位相の変化率は

$$
\frac{d}{dv}[\omega q(v)]
=\omega\frac{dq}{dv}
=\frac{\omega}{p'(u)},\qquad v=p(u).
$$

したがって「光線を過去へ追う」という操作自体は、場の粒子数を計算していないものの、必要となる入射側の位相変化率を明示します。これは**過去零無限遠のアフィン時刻 $v$ に対する周波数**です。地平線近傍の自由落下観測者が一点で測る局所エネルギーと、観測者の四元速度に沿った測定を計算せずに等号で結んではいけません。

ここで $\Lambda>0$ を、特定の模型で高周波物理が変わり始めると考える**UV参照角周波数**とします。$G_N^{-1/2}$ を選べばPlanck尺度の目安ですが、$\Lambda$ が実際の物理的硬いカットオフであるとは仮定しません。

<a id="def-qcurv18-backward-uv"></a>

<!-- formal-statement-start -->
> **定義（遡及周波数とUV閾値）**  
> 遠方で規格化した $v=p(u)$ が開区間 $I$ で一回連続微分可能かつ $p'(u)>0$ とする。出射角周波数 $\omega>0$ の位相を逆追跡した**入射アフィン周波数**を

$$
\Omega_{\mathrm{back}}(u;\omega)
:=\frac{\omega}{p'(u)}>0
$$

> と定める。UV参照角周波数 $\Lambda>0$ に対し、$\Omega_{\mathrm{back}}(u;\omega)>\Lambda$ となる $u\in I$ を**超閾値領域**と呼ぶ。$\Omega_{\mathrm{back}}=\Lambda$ は指定した時刻・周波数規格化に関する境界であり、量子場の理論がそこで破綻したという定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv18-backward-uv -->
### 直接例：線形な光線写像では増幅しない

$p(u)=a u+b$、$a>0$ なら $p'(u)=a$ です。従って $\Omega_{\mathrm{back}}=\omega/a$ は時間に依らず、$v$ と $u$ の時計が同じ速さなら $a=1$、$\Omega_{\mathrm{back}}=\omega$ となります。$a,b$ は定数、$v$ と $u$ はともに長さ次元なので $a$ は無次元です。任意の $\Lambda>\omega/a$ を選べば、**超閾値領域は空**です。**定義の確認**：正の導関数、周波数の次元、閾値との比較をすべて検査しました。
<!-- definition-example-end -->

指数写像では事情が違います。以下は[QCURV10の後期指数則](../QCURV10/index.md#thm-qcurv10-late-exponential)の主項を**全時刻へ延長した理想模型**です。実際の崩壊の早期光線をこの式で記述したとは主張しません。

<a id="prop-qcurv18-backtrace-threshold"></a>

<!-- formal-statement-start -->
> **命題（指数光線写像の遡及周波数と閾値時刻）**  
> $\kappa,A,\omega,\Lambda>0$、$v_H\in\mathbb R$ とし、$u\in\mathbb R$ で単調な理想光線写像 $p(u)=v_H-Ae^{-\kappa u}$ を考える。$\kappa$ は逆長さ、$A$ は長さの次元を持つ。この写像の[遡及周波数](#def-qcurv18-backward-uv)は

$$
\boxed{\Omega_{\mathrm{back}}(u;\omega)
=\frac{\omega}{\kappa A}e^{\kappa u}}
$$

> で、$\Omega_{\mathrm{back}}=\Lambda$ の唯一の時刻は

$$
\boxed{u_*=\frac1\kappa
\log\!\left(\frac{\kappa A\Lambda}{\omega}\right).}
$$

> 超閾値領域は $u>u_*$ である。$u_*$ は後期指数則を使える時刻範囲内に存在するときに限って、実際の後期崩壊光線への近似的な閾値として解釈できる。
<!-- formal-statement-end -->

### 証明の見取り図

写像を一回微分すると $p'$ は指数的に小さくなります。その逆数が遡及周波数です。閾値に達する時刻は対数を取れば求まり、正の $\kappa$ により前後関係が決まります。

<!-- proof-start -->
### 証明

$p'(u)=A\kappa e^{-\kappa u}>0$ であり、$p:\mathbb R\to(-\infty,v_H)$ は一対一です。逆関数の微分を[定義](#def-qcurv18-backward-uv)に代入すると

$$
\Omega_{\mathrm{back}}=\frac{\omega}{A\kappa e^{-\kappa u}}
=\frac{\omega}{A\kappa}e^{\kappa u}.
$$

$\Omega_{\mathrm{back}}=\Lambda$ を解くと、$e^{\kappa u_*}=\Lambda A\kappa/\omega>0$。両辺の自然対数を取って表示を得ます。関数 $e^{\kappa u}$ は $\kappa>0$ により狭義単調増加なので、$u>u_*$ と $\Omega_{\mathrm{back}}>\Lambda$ は同値です。$\kappa A$ および $\Lambda/\omega$ はそれぞれ無次元で、対数の引数も無次元です。
<!-- proof-end -->

例えば $\kappa A=1$、$\Lambda/\omega=10^6$ のとき、$\kappa u_*=\log10^6\simeq13.816$。さらに $\Delta u=2/\kappa$ 後には周波数が $e^2$ 倍になります。出射の $\omega$ は固定したままです。これは「非常に高い入射周波数が**幾何光学の逆追跡**に現れる」ことの計算であり、高周波の場が現実にそのまま伝播するという検証ではありません。

### 時刻原点を動かしても物理的な条件は変わらない

$\tilde u=u-u_0$ と置けば、同じ写像は $p=v_H-\tilde A e^{-\kappa\tilde u}$、$\tilde A=Ae^{-\kappa u_0}$ と表されます。閾値時刻の新座標値は

$$
\tilde u_*=\kappa^{-1}\log(\kappa\tilde A\Lambda/\omega)
=u_*-u_0.
$$

時計の原点を動かした分だけ座標値も移動し、同一の光線を指します。したがって「何秒後にPlanck周波数へ達するか」を $A$ や時計の取り方を示さずに数値だけで述べるのは危険です。

## 2. 一つの光線と、周波数幅を持つ波束は違う

[QCURV11の後期波束](../QCURV11/index.md#prop-qcurv11-late-packet-planck)は有限の帯域と到着時刻を持ちます。厳密な波束は一つの入射周波数ではなく、広がった Fourier 成分を含みます。そこで、**正規化された対数周波数の比較模型**を作ります。これは実際のBogoliubov係数を勝手に高周波で切断した「新しい量子理論」ではありません。周波数が後期にずれることの含意だけを抽出する数学模型です。

任意の基準周波数 $\Omega_0>0$ を選び、入射周波数 $\Omega>0$ を対数座標へ写します。

$$
z=\log(\Omega/\Omega_0)\in\mathbb R,\qquad
\frac{dz}{d\Omega}=\frac1\Omega>0.
$$

したがって積分の変数変換では $dz=d\Omega/\Omega$ となり、$\Omega\le\Lambda$ と $z\le\log(\Lambda/\Omega_0)$ は同値です。対数周波数上の重みを比較するには $d\Omega$ ではなく $dz$ で規格化します。

正規化された形状関数 $f\in L^2(\mathbb R,dz)$、$\int_{\mathbb R}|f(t)|^2dt=1$ を、光線追跡による中心の移動

$$
z_c(u)=\log\!\left(\frac{\omega}{\kappa A\Omega_0}\right)
+\kappa u
$$

に沿って平行移動させます。$|f(z-z_c(u))|^2dz$ が入射対数周波数の重みです。中心 $z_c$ は前節の指数模型の遡及周波数の対数に等しくなります。

<a id="def-qcurv18-uv-window-weight"></a>

<!-- formal-statement-start -->
> **定義（対数周波数窓の低周波重み）**  
> $\kappa,A,\omega,\Omega_0,\Lambda>0$ とし、$f\in L^2(\mathbb R,dz)$ を $\int_{\mathbb R}|f|^2=1$ に規格化する。$z_c(u)=\log[\omega/(\kappa A\Omega_0)]+\kappa u$ とする。指数模型の中心が移動する対数周波数波束の、$\Omega\le\Lambda$ に含まれる重みを

$$
P_{\le\Lambda}(u)
:=\int_{-\infty}^{\log(\Lambda/\Omega_0)}
|f(z-z_c(u))|^2\,dz
$$

> と定める。この $P_{\le\Lambda}$ は $0\le P_{\le\Lambda}\le1$ を満たす比較模型の重みであり、崩壊時空の真空におけるout粒子数を直接表す量ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv18-uv-window-weight -->
### 直接例：幅 $2d$ の対数周波数帯

$d>0$ とし、$f(t)=(2d)^{-1/2}$ を $-d\le t\le d$ で、帯外で0と定めます。$\int|f|^2dt=(2d)^{-1}(2d)=1$ です。帯域は $z_c-d\le z\le z_c+d$、すなわち

$$
\Omega_0 e^{z_c-d}\le\Omega\le\Omega_0 e^{z_c+d}.
$$

閾値を $Z=\log(\Lambda/\Omega_0)$ と書けば

$$
P_{\le\Lambda}(u)=
\begin{cases}
1,&Z\ge z_c+d,\\
(Z-z_c+d)/(2d),&z_c-d<Z<z_c+d,\\
0,&Z\le z_c-d.
\end{cases}
$$

積分区間との交わりの長さを $2d$ で割った結果です。**定義の確認**：正規化、非負性、$P\le1$、閾値の位置の三場合を検査しました。この角張った $f$ は解析用模型で、滑らかな切替を備えた実際の波束の形状とは限りません。
<!-- definition-example-end -->

<a id="thm-qcurv18-uv-window-escape"></a>

<!-- formal-statement-start -->
> **定理（有限UV窓内の波束重みの消失）**  
> [対数周波数窓の低周波重み](#def-qcurv18-uv-window-weight)の仮定の下で、$\kappa>0$ と有限の $\Lambda>0$ を固定する。この比較模型は

$$
\boxed{\lim_{u\to+\infty}P_{\le\Lambda}(u)=0}
$$

> を満たす。この結論は $f$ のコンパクト台を仮定せず、$f\in L^2$ と中心の平行移動だけから従う。実際の量子場をUV変更したときのout占有数の極限は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

平行移動で積分変数を $t=z-z_c$ にすると、積分の上端は $-\infty$ へ移ります。$|f|^2$ が全実数上で積分可能なので、その左端の裾の重みは零へ近づきます。

<!-- proof-start -->
### 証明

$t=z-z_c(u)$ と置き、上端 $Z=\log(\Lambda/\Omega_0)$ を固定すると

$$
P_{\le\Lambda}(u)
=\int_{-\infty}^{Z-z_c(u)}|f(t)|^2\,dt.
$$

$z_c(u)=c+\kappa u$（$c$ は定数）なので $\kappa>0$ の下で $Z-z_c(u)\to-\infty$。$f\in L^2$ より $g(t):=|f(t)|^2$ は非負かつ $\int_{\mathbb R}g(t)dt=1<\infty$ です。任意の $\varepsilon>0$ に対し、ある $R>0$ で $\int_{-\infty}^{-R}g(t)dt<\varepsilon$ とできます。十分大きい $u$ で $Z-z_c(u)<-R$ なので

$$
0\le P_{\le\Lambda}(u)
\le\int_{-\infty}^{-R}g(t)\,dt
<\varepsilon.
$$

従って極限は0です。
<!-- proof-end -->

この定理は「遡及周波数の重みが、**どんな有限の参照窓からも後期には離れる**」という限定的で明確な主張です。だからこそ、通常の自由場・線形分散・Hadamard状態の仮定をUV領域へ延長してよいかは、**別の動力学的問題**になります。窓外の波を単に削除した場合に何が起こるかを、この定理だけから求めることはできません。

## 3. 近似を少し変えたとき、何が安定と言えるか

指数光線の形が少し違うだけで、すべての計算が崩れるのでしょうか。まず周波数の**運動学的な誤差**を評価します。ある後期時間区間 $J$ で、基準の指数写像の導関数を $p_0'(u)=\kappa A e^{-\kappa u}$ とし、別の入出射対応 $p$ も $p'(u)>0$ を満たし、さらに

$$
p'(u)=p_0'(u)[1+\zeta(u)],
\qquad |\zeta(u)|\le\delta<1,\quad u\in J
$$

を満たすとします。両者の周波数比は $p_0'/p'$ なので

$$
\frac{\omega e^{\kappa u}}{\kappa A(1+\delta)}
\le\Omega_{\mathrm{back}}(u;\omega)
\le\frac{\omega e^{\kappa u}}{\kappa A(1-\delta)}.
$$

分母が正だから不等号は保たれます。基準の $\Omega_{\mathrm{back},0}$ と比べた相対差は、固定した $u$ で最大 $\delta/(1-\delta)$。これは**導関数が一様に近い区間**に限る評価です。$J$ の外、特に $u\to\infty$ まで保証するものではありません。

熱的な粒子数には、さらに入射状態と**位相のFourier分解**が必要でした。[QCURV11の負周波数混合係数](../QCURV11/index.md#def-qcurv11-fourier-coefficients)には $e^{-i\omega u-i\Omega p(u)}$ の位相が現れます。以下では有界な開区間 $J$ の中で実数値の切替関数 $\chi$ を掛け、その**複素共役**を使います。このとき窓付きの位相積分は

$$
\overline{\int_J\chi(u)e^{-i\omega u-i\Omega p(u)}\,du}
=\int_J\chi(u)e^{i\omega u+i\Omega p(u)}\,du
$$

となり、絶対値を比較するときは同じ情報が残ります。$C_c^\infty(J)$ は、$J$ 内のコンパクトな集合の外で零となる滑らかな関数の集合を表します。このような $\chi$ で有限区間 $J$ の内部を滑らかに切り替えれば、位相の安定性だけを調べられます。ただしQCURV11の正準係数には端点正則化とモード規格化が必要です。以下の**診断積分**を物理的な正準係数そのものとは同一視しません。

<a id="def-qcurv18-finite-window"></a>

<!-- formal-statement-start -->
> **定義（有限窓Fourier診断積分）**  
> $J\subset\mathbb R$ を有界開区間、$\chi\in C_c^\infty(J)$ を実数値の積分可能な切替関数、$\omega,\Omega>0$ をそれぞれ出射・入射角周波数とする。$p:J\to\mathbb R$ が連続なら、負周波数への混合に現れる位相を抽出した有限窓の診断積分を

$$
I_\chi[p](\omega,\Omega)
:=\int_J\chi(u)
e^{i\omega u+i\Omega p(u)}\,du
$$

> と定める。$\chi$ は $J$ 外で0とするが、$p$ は $J$ 上でのみ定義されるため積分範囲も $J$ とする。$I_\chi$ は正準Bogoliubov係数ではなく、その位相積分に注目した比較用の量である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv18-finite-window -->
### 直接例：一定の光線ラベルずれ

ある連続写像 $p$ を別の関数 $\widetilde p(u)=p(u)+d$（$d\in\mathbb R$、長さ次元）へ変えると

$$
I_\chi[\widetilde p](\omega,\Omega)
=e^{i\Omega d}I_\chi[p](\omega,\Omega),
\qquad |I_\chi[\widetilde p]|=|I_\chi[p]|.
$$

$\chi$ は滑らかでコンパクトな台を持つので積分は絶対収束し、$\omega,\Omega>0$、$\Omega d$ は無次元です。**定義の確認**：位相は変わる一方で絶対値が不変と実際に計算でき、積分の存在、周波数、位相の次元も検査しました。
<!-- definition-example-end -->

<a id="prop-qcurv18-phase-stability"></a>

<!-- formal-statement-start -->
> **命題（有限窓の位相摂動評価）**  
> 同じ有界区間 $J$ の上の二つの連続関数 $p,\widetilde p:J\to\mathbb R$ と、上の $\chi,\omega,\Omega$ を取る。$\sup_{u\in\operatorname{supp}\chi}|p(u)-\widetilde p(u)|\le\varepsilon<\infty$ なら

$$
\boxed{\left|I_\chi[p](\omega,\Omega)
-I_\chi[\widetilde p](\omega,\Omega)\right|
\le\Omega\varepsilon\|\chi\|_{L^1}.}
$$

> 特に $0<\Omega\le\Lambda<\infty$ の有限入射帯域では、右辺を $\Lambda\varepsilon\|\chi\|_{L^1}$ で一様に抑えられる。$\Omega\to\infty$ や窓の支持を後期へ無限に動かす極限での一様な安定性は含意しない。
<!-- formal-statement-end -->

### 証明の見取り図

位相を動かした差に $|e^{ix}-e^{iy}|\le|x-y|$ を使い、切替関数の絶対値で積分します。入射角周波数 $\Omega$ が誤差を拡大するため、有限帯域が必要です。

<!-- proof-start -->
### 証明

実数 $x,y$ に対し、$e^{ix}-e^{iy}=i\int_y^x e^{it}dt$ だから $|e^{ix}-e^{iy}|\le|x-y|$ です。$e^{i\omega u}$ の絶対値は1なので

$$
\begin{aligned}
|I_\chi[p]-I_\chi[\widetilde p]|
&\le\int_J|\chi(u)|
|e^{i\Omega p(u)}-e^{i\Omega\widetilde p(u)}|\,du\\
&\le\int_{\operatorname{supp}\chi}|\chi(u)|
\Omega|p(u)-\widetilde p(u)|\,du\\
&\le\Omega\varepsilon\int_J|\chi(u)|\,du.
\end{aligned}
$$

$0<\Omega\le\Lambda$ を追加すれば $\Omega\varepsilon\le\Lambda\varepsilon$ とでき、結論を得ます。
<!-- proof-end -->

この評価は連続関数の**位相積分**について成立し、二つの関数が物理的に許される光線写像かどうかまでは判定しません。光線の入出射対応として読む場合は、さらに対象区間での微分可能性と $p',\widetilde p'>0$ などを別途確認する必要があります。

**何を証明していないか。** 有限時間・有限周波数で位相積分が連続でも、[QCURV11の熱因子](../QCURV11/index.md#thm-qcurv11-thermal-ratio)は無限区間の指数写像、Gamma積分の枝、正準規格化、適切な入射真空と後期波束の極限を用いています。上のノルム評価だけでは、UV修正後に正準交換関係が保たれるか、熱的占有数が保たれるかを証明できません。

例えば局所的な比較模型で $k\in\mathbb R$ を空間方向の波数、$\varpi(k)\ge0$ をその角振動数として、分散関係を $\varpi(k)=|k|$ から $\varpi(k)=|k|\sqrt{1+k^2/\Lambda^2}$ へ変えた場合を考えます。$|k|/\Lambda\ll1$ のとき

$$
\varpi(k)=|k|\left[1+\frac{k^2}{2\Lambda^2}
+O\!\left(\frac{k^4}{\Lambda^4}\right)\right],
$$

一方 $|k|\sim\Lambda$ なら補正は小さくありません。これはTaylor展開による**低周波での一致**だけで、地平線付近のモード伝播・初期状態・検出器応答を計算した結果ではありません。分散を変えたモデルの量子化と境界条件を解かずに「放射は必ず頑健」とは結論できません。

## 4. 地平線がなくても有限時間に指数則を模倣できる

入出射写像がある有限区間で指数的であることと、未来へ永遠に続く事象地平線が存在することも違います。[QCURV10の正則接続の命題](../QCURV10/index.md#prop-qcurv10-smooth-transfer)では、一次係数が消えないことを明示して初めて指数率を得ました。その条件は、任意の時空が必ず地平線を持つという証明ではありません。

次の**光線写像だけの反例**を作れます。$\kappa,A>0$、切替時刻 $u_2\in\mathbb R$ を取り、$u\le u_2$ では $p(u)=v_H-Ae^{-\kappa u}$ とします。$u\ge u_2+\Delta$（$\Delta>0$）では導関数を一定の $c=\kappa A e^{-\kappa u_2}>0$ にし、その間を滑らかで正の導関数で接続します。例えば $[u_2,u_2+\Delta]$ に、端点で全ての導関数が消える滑らかな切替 $h$（左端0、右端1、$0\le h\le1$）を置いて

$$
p'(u)=[1-h(u)]\kappa A e^{-\kappa u}+h(u)c
$$

とし、$p(u_2)$ を初期値として積分すればよいのです。左端では指数模型に滑らかにつながり、右端では $p(u)=p(u_2+\Delta)+c(u-u_2-\Delta)$。全域で $p'>0$、さらに $p(u)\to+\infty$ となるため、最後の入射ラベル $v_H$ へ収束しません。

この写像は有限の観測区間で[指数模型の遡及周波数](#prop-qcurv18-backtrace-threshold)を再現しても、後期すべてに地平線型指数則を保ちません。物理的な「地平線なし崩壊時空」の解が存在するという証明ではなく、**有限データから永遠の地平線を論理的に推論できない**という写像レベルの反例です。

## 5. 光線が同じでも、量子状態が違えば粒子数は変わる

光線追跡と分散関係を固定しても、[QCURV13の三状態](../QCURV13/index.md#def-qcurv13-three-states)は入射・出射チャネルの占有数が異なります。抽象的な一つの規格化した振動子について[QCURV3のBogoliubov変換](../QCURV3/index.md#def-qcurv3-bogoliubov)を使って、その違いを直接確かめます。多モードの崩壊場全体ではなく、CCRを持つ**一モード模型**です。

<a id="prop-qcurv18-state-occupation"></a>

<!-- formal-statement-start -->
> **命題（入射占有数に対する出射粒子数の依存）**  
> $[a_{\mathrm{in}},a_{\mathrm{in}}^\dagger]=1$ とし、$a_{\mathrm{out}}=\alpha a_{\mathrm{in}}+\beta a_{\mathrm{in}}^\dagger$、$|\alpha|^2-|\beta|^2=1$ とする。正規化した入射状態で $\langle a_{\mathrm{in}}^\dagger a_{\mathrm{in}}\rangle=n\ge0$、$\langle a_{\mathrm{in}}a_{\mathrm{in}}\rangle=\langle a_{\mathrm{in}}^\dagger a_{\mathrm{in}}^\dagger\rangle=0$ と仮定する。このとき

$$
\boxed{\langle N_{\mathrm{out}}\rangle
=|\beta|^2+(|\alpha|^2+|\beta|^2)n.}
$$

> 特に $n=0$ の入射真空では $\langle N_{\mathrm{out}}\rangle=|\beta|^2$ であるが、一般の入射状態には同じ公式をそのまま適用できない。
<!-- formal-statement-end -->

### 証明の見取り図

出射粒子数 $N_{\mathrm{out}}=a_{\mathrm{out}}^\dagger a_{\mathrm{out}}$ を展開します。異常相関が零という仮定で二つの項が消え、交換関係によって $aa^\dagger=a^\dagger a+1$ を得ます。

<!-- proof-start -->
### 証明

随伴を取ると $a_{\mathrm{out}}^\dagger=\alpha^*a_{\mathrm{in}}^\dagger+\beta^*a_{\mathrm{in}}$。従って

$$
\begin{aligned}
a_{\mathrm{out}}^\dagger a_{\mathrm{out}}
&=|\alpha|^2a_{\mathrm{in}}^\dagger a_{\mathrm{in}}
+|\beta|^2a_{\mathrm{in}}a_{\mathrm{in}}^\dagger\\
&\quad+\alpha^*\beta a_{\mathrm{in}}^\dagger a_{\mathrm{in}}^\dagger
+\beta^*\alpha a_{\mathrm{in}}a_{\mathrm{in}}.
\end{aligned}
$$

最後の二項は期待値が零です。CCRから $\langle aa^\dagger\rangle=\langle a^\dagger a\rangle+1=n+1$。ゆえに

$$
\langle N_{\mathrm{out}}\rangle
=|\alpha|^2n+|\beta|^2(n+1)
=|\beta|^2+(|\alpha|^2+|\beta|^2)n.
$$

$n=0$ を代入して真空の場合を得ます。
<!-- proof-end -->

$|\beta|^2=1/4$、$|\alpha|^2=5/4$ とすれば正準条件を満たします。同じ変換でも、入射真空なら出射数 $1/4$、入射占有数 $n=1$ かつ異常相関零なら $1/4+(5/4+1/4)=7/4$ です。**光線写像だけでは状態が指定されない**ことが数値で分かります。

### UVと熱性についての論理の区別

| 調べること | 計算に必要な入力 | この章で確かめたこと |
| --- | --- | --- |
| 過去へ追った周波数 | 単調な $p(u)$、遠方時計、幾何光学 | 指数写像では $\Omega_{\rm back}\propto e^{\kappa u}$ |
| 正負周波数混合・熱因子 | 場の方程式、入射状態、完全なモード、Fourier積分・波束 | [QCURV11の条件](../QCURV11/index.md#thm-qcurv11-thermal-ratio)の確認が必要 |
| 有限窓での位相の安定 | 有界な時刻窓、有限帯域、写像の一様誤差 | 積分の差を $\Lambda\varepsilon\|\chi\|_1$ で抑えた |
| UV修正後も熱的か | 修正した分散・相互作用・真空・因果構造・高周波境界条件 | 普遍的な不変性の定理はここからは出ない |
| 無限遠の光度・蒸発 | 状態、4次元散乱、孤立系の収支、半古典的な逆作用 | [QCURV17の近似条件](../QCURV17/index.md#def-qcurv17-adiabatic-parameter)を別途要する |

すなわち、**定常外部でのKilling周波数**、**後期の崩壊波束**、**未来地平線を横断する[状態の正則性](../QCURV13/index.md#def-qcurv13-horizon-regularity)**、**遠方への正味エネルギー流**は異なる問いです。ここで引用した正則性は状態の短距離構造についての条件であり、超高周波の新物理で自動的に保たれるという意味ではありません。相互作用がある場、蒸発で大きく変化する背景、地平線を形成しない時空では、対応する量子場と境界・状態の計算をやり直します。

## 6. 演習――計算の結果と仮定を切り分ける

### Level A：周波数、閾値、時計を手で確かめる

<a id="ex-qcurv18-a01"></a>
#### QCURV18-A01 逆関数の微分から遡及する
- Level: A
- 問題: $A,\kappa,\omega>0$ とし、$v=p(u)=v_H-Ae^{-\kappa u}$ とする。$p'(u)>0$ を確かめ、出射位相 $e^{-i\omega u}$ を $v$ の関数へ戻したときの周波数 $\Omega_{\rm back}$ を求めよ。$A,\kappa$ の次元も答えよ。

<!-- solution-start -->
**詳細解答**：$A$ は長さ、$\kappa$ は逆長さなので $\kappa u$ は無次元です。微分すると $p'(u)=\kappa A e^{-\kappa u}>0$。逆関数 $q=p^{-1}$ の微分は $q'(v)=1/p'(q(v))$ です。出射位相を $e^{-i\omega q(v)}$ と書くと、位相 $\omega q(v)$ の $v$ 微分が入射側の瞬間角周波数なので

$$
\Omega_{\rm back}(u;\omega)
=\omega q'(p(u))=\frac{\omega}{p'(u)}
=\frac{\omega e^{\kappa u}}{\kappa A}>0.
$$

$\kappa A$ は無次元なので周波数の次元も $\omega$ と同じです。[遡及周波数の定義](#def-qcurv18-backward-uv)を直接確認しました。
<!-- solution-end -->

<a id="ex-qcurv18-a02"></a>
#### QCURV18-A02 UV閾値までの時間
- Level: A
- 問題: $\kappa A=1$、$\Lambda/\omega=e^8$ とする指数模型について、$\Omega_{\rm back}=\Lambda$ の $u_*$ を求めよ。そこから $\Delta u=3/\kappa$ 後の $\Omega_{\rm back}/\Lambda$ も計算せよ。

<!-- solution-start -->
**詳細解答**：[閾値時刻の命題](#prop-qcurv18-backtrace-threshold)により $\kappa u_*=\log(\kappa A\Lambda/\omega)=\log e^8=8$、よって $u_*=8/\kappa$ です。$u=u_*+3/\kappa$ のとき

$$
\frac{\Omega_{\rm back}(u)}{\Lambda}
=\frac{\omega e^{\kappa(u_*+3/\kappa)}}{\kappa A\Lambda}
=\frac{\omega e^{\kappa u_*}}{\kappa A\Lambda}e^3=e^3.
$$

閾値時点の比が1であることを使いました。周波数が大きくなっても、出射の $\omega$ 自身を変化させたわけではありません。
<!-- solution-end -->

<a id="ex-qcurv18-a03"></a>
#### QCURV18-A03 時計の原点を変更する
- Level: A
- 問題: $p(u)=v_H-Ae^{-\kappa u}$、$\tilde u=u-u_0$ とする。$\tilde u$ による係数 $\tilde A$ とUV閾値時刻 $\tilde u_*$ を求め、元の $u_*$ との関係を示せ。$A,\kappa>0$ とする。

<!-- solution-start -->
**詳細解答**：$u=\tilde u+u_0$ を代入すると

$$
p=v_H-Ae^{-\kappa(\tilde u+u_0)}
=v_H-(Ae^{-\kappa u_0})e^{-\kappa\tilde u}.
$$

従って $\tilde A=Ae^{-\kappa u_0}$ です。正値性を保つので[命題](#prop-qcurv18-backtrace-threshold)を新座標で使えます。

$$
\tilde u_*=\frac1\kappa\log\frac{\kappa Ae^{-\kappa u_0}\Lambda}{\omega}
=\frac1\kappa\log\frac{\kappa A\Lambda}{\omega}-u_0
=u_*-u_0.
$$

新旧の数値は原点移動だけずれ、同じ出来事です。
<!-- solution-end -->

<a id="ex-qcurv18-a04"></a>
#### QCURV18-A04 指数ではない写像
- Level: A
- 問題: $v=p(u)=2u+b$（$b$ は長さ次元）を用いる。$\omega>0$ の出射波の入射アフィン周波数を求め、$\Lambda>\omega/2$ なら超閾値領域はどうなるか。また $p(u)$ が有限の $v_H$ へ近づくか判断せよ。

<!-- solution-start -->
**詳細解答**：$p'=2>0$、逆関数は $q(v)=(v-b)/2$ です。位相 $\omega q(v)$ の微分は $\omega/2$、従って $\Omega_{\rm back}=\omega/2<\Lambda$ は全時刻で成立します。超閾値領域は空です。また $u\to+\infty$ で $p(u)=2u+b\to+\infty$ となり有限の最後の入射ラベルは存在しません。単調性と、地平線型の有限極限の有無は別の検査です。
<!-- solution-end -->

<a id="ex-qcurv18-a05"></a>
#### QCURV18-A05 対数帯域の切断率
- Level: A
- 問題: [対数周波数窓](#def-qcurv18-uv-window-weight)の模型で $d=1$、$f(t)=1/\sqrt2$（$|t|\le1$）かつ帯外で0、$\log(\Lambda/\Omega_0)=0$ とする。中心 $z_c=-2,1/2,2$ の三場合で $P_{\le\Lambda}$ を求めよ。

<!-- solution-start -->
**詳細解答**：$|f|^2=1/2$ は長さ2の区間 $[z_c-1,z_c+1]$ だけに台を持つため、$P$ はこの区間と $(-\infty,0]$ の交わりの長さを2で割ったものです。$z_c=-2$ では帯は $[-3,-1]$ で全体が閾値以下だから $P=1$。$z_c=1/2$ では $[-1/2,3/2]$ で交わりは長さ $1/2$、従って $P=1/4$。$z_c=2$ では $[1,3]$ に交わりがなく $P=0$ です。各場合とも $0\le P\le1$ です。
<!-- solution-end -->

### Level B：近似の安定性と失敗機構を調べる

<a id="ex-qcurv18-b01"></a>
#### QCURV18-B01 導関数がずれたときの周波数評価
- Level: B
- 問題: 有界区間 $J$ で $p_0'=\kappa Ae^{-\kappa u}$、$p'=p_0'(1+\zeta)$、$|\zeta|\le1/4$、$\kappa,A,\omega>0$ とする。$\Omega_0=\omega/p_0'$ に対して $\Omega_{\rm back}/\Omega_0$ の上下界と、相対差 $|\Omega_{\rm back}-\Omega_0|/\Omega_0$ の上界を求めよ。熱的粒子数の同じ評価が従うか。

<!-- solution-start -->
**詳細解答**：$3/4\le1+\zeta\le5/4$ なので、正数の逆数を取ると $4/5\le1/(1+\zeta)\le4/3$。一方

$$
\frac{\Omega_{\rm back}}{\Omega_0}
=\frac{\omega/[p_0'(1+\zeta)]}{\omega/p_0'}
=\frac1{1+\zeta}.
$$

従って $4/5\le\Omega_{\rm back}/\Omega_0\le4/3$。相対差は $|1/(1+\zeta)-1|=|\zeta|/|1+\zeta|\le(1/4)/(3/4)=1/3$ です。評価は $J$ 上の局所周波数だけを拘束し、全時刻のFourier積分、入射状態、正準規格化を含まないため粒子数の同じ評価は従いません。
<!-- solution-end -->

<a id="ex-qcurv18-b02"></a>
#### QCURV18-B02 有限窓の位相誤差
- Level: B
- 問題: $\chi\in C_c^\infty(J)$、$\|\chi\|_1=1$、$\omega>0$、$0<\Omega\le\Lambda$ とする。$\widetilde p(u)=p(u)+\varepsilon\sin(u/T)$（$T>0$、$\varepsilon\ge0$）なら $|I_\chi[p]-I_\chi[\widetilde p]|$ の上界を求めよ。$\Omega\to\infty$ でも同じ固定定数で抑えられるか。また $\widetilde p=p+d$ の場合の絶対値の変化を求めよ。

<!-- solution-start -->
**詳細解答**：$|\sin(u/T)|\le1$ なので $\sup_{\operatorname{supp}\chi}|p-\widetilde p|\le\varepsilon$。[位相摂動評価](#prop-qcurv18-phase-stability)から

$$
|I_\chi[p]-I_\chi[\widetilde p]|
\le\Omega\varepsilon\|\chi\|_1
=\Omega\varepsilon\le\Lambda\varepsilon.
$$

この評価の右辺は $\Omega$ とともに増えるため、有限の $\Lambda$ を外して同じ定数を得られません（もちろん個々の積分には自明な $2\|\chi\|_1$ の上界があるが、$\varepsilon\to0$ に比例する一様評価ではありません）。定数シフトなら $I_\chi[p+d]=e^{i\Omega d}I_\chi[p]$ なので $|I_\chi[p+d]|=|I_\chi[p]|$ です。一般の摂動不等式は鋭い等号を常に与えるわけではありません。
なお、この問いでは $\widetilde p$ の単調性を仮定していません。$p$ が微分可能なら $\widetilde p'(u)=p'(u)+(\varepsilon/T)\cos(u/T)$ なので、$J$ 上で $p'(u)>\varepsilon/T$ を追加すれば $\widetilde p'(u)>0$ が保証され、二つを単調な光線写像として比較できます。
<!-- solution-end -->

<a id="ex-qcurv18-b03"></a>
#### QCURV18-B03 有限指数区間と地平線の区別
- Level: B
- 問題: $\kappa,A>0$、$u_2\in\mathbb R$ とし、$u\le u_2$ で $p=v_H-Ae^{-\kappa u}$、$u\ge u_2+1$ で $p'(u)=c:=\kappa Ae^{-\kappa u_2}>0$ となる滑らかな単調接続を取る。(a) 左区間の遡及周波数、(b) 右区間の遡及周波数、(c) $p(+\infty)$ の極限を求め、有限の指数データだけでは何を結論できないか述べよ。

<!-- solution-start -->
**詳細解答**：(a) 左区間では $p'=\kappa Ae^{-\kappa u}$ だから $\Omega_{\rm back}=\omega e^{\kappa u}/(\kappa A)$ です。(b) 右区間で $p'=c$ なので $\Omega_{\rm back}=\omega/c$ は一定です。(c) $u\ge u_2+1$ では

$$
p(u)=p(u_2+1)+c(u-u_2-1)\longrightarrow+\infty.
$$

従って $p(u)$ に有限の上限 $v_H$ はなく、地平線型の最後の入射ラベルへは収束しません。滑らかに接続するには本文の $p'=(1-h)\kappa Ae^{-\kappa u}+hc$ を積分すればよく、両成分が正で $0\le h\le1$ だから単調性も保たれます。有限区間の指数追跡が一致しても、永遠の後期指数則や地平線形成は確定しません。
<!-- solution-end -->

<a id="ex-qcurv18-b04"></a>
#### QCURV18-B04 真空以外の入射状態
- Level: B
- 問題: 一つの規格化した振動子で $a_{\rm out}=\alpha a+\beta a^\dagger$、$|\beta|^2=1/9$、$|\alpha|^2=10/9$ とする。入射状態は $\langle a^\dagger a\rangle=n$、$\langle aa\rangle=0$ とする。$n=0$ と $n=2$ の出射占有数を計算し、同じBogoliubov係数から二つの結果が出る理由を述べよ。

<!-- solution-start -->
**詳細解答**：CCRより $\langle aa^\dagger\rangle=n+1$。異常相関が零なので[出射占有数の命題](#prop-qcurv18-state-occupation)を適用し

$$
\langle N_{\rm out}\rangle
=\frac19+\left(\frac{10}{9}+\frac19\right)n
=\frac{1+11n}{9}.
$$

$n=0$ なら $1/9$、$n=2$ なら $23/9$ です。係数はモード間の混合を指定しますが、そのモードを元の状態がどれだけ占有しているかは指定しません。入射真空の式 $|\beta|^2$ は $n=0$ を使った結果です。
<!-- solution-end -->

### Level C：後期光線から観測量の限界まで組み立てる

<a id="ex-qcurv18-c01"></a>
#### QCURV18-C01 超高周波問題の条件付き総合診断
- Level: C
- 問題: $v=p(u)=v_H-Ae^{-\kappa u}$、$\kappa,A>0$ の理想模型を、質量零・自由場の後期幾何光学近似として使う。出射周波数 $\omega>0$、UV参照周波数 $\Lambda>0$ とする。

  - (a) 遡及アフィン周波数と閾値時刻 $u_*$ を求め、$\Lambda$ の2倍への到達時刻差を求めよ。
  - (b) $\Omega_0>0$、$f(t)=1/\sqrt2$（$|t|\le1$、他で0）の対数波束を使い、中心 $z_c(u_*)$ と $P_{\le\Lambda}(u_*),P_{\le\Lambda}(u_*+2/\kappa)$ を計算せよ。
  - (c) $\chi\in C_c^\infty(J)$、$\|\chi\|_1=1$ の有限窓で $|p-\widetilde p|\le\varepsilon$、$0<\Omega\le\Lambda$ のとき位相積分の差を評価せよ。
  - (d) 元のHawking熱因子から4次元の遠方光度を出すため追加で必要な条件を二つ以上挙げよ。
  - (e) (a)〜(c) の結果から「UV領域で任意の修正を施しても厳密な熱スペクトルが続く」と証明できるか。理由を数式または反例に結び付けて答えよ。

<!-- solution-start -->
**詳細解答**：

(a) 微分で $p'=\kappa A e^{-\kappa u}$、従って

$$
\Omega_{\rm back}(u)=\frac{\omega e^{\kappa u}}{\kappa A},
\qquad u_*=\kappa^{-1}\log(\kappa A\Lambda/\omega).
$$

周波数が $\Lambda$ から $2\Lambda$ になる間は $e^{\kappa\Delta u}=2$ なので $\Delta u=(\log2)/\kappa$ です。この計算には遠方の時刻規格化と、後期指数近似が該当区間で成立することが必要です。

(b) 中心は $z_c(u)=\log[\omega/(\kappa A\Omega_0)]+\kappa u$ です。(a) の $u_*$ を代入して

$$
z_c(u_*)=\log(\Lambda/\Omega_0)=:Z.
$$

幅 $2$ の帯が $[Z-1,Z+1]$ なので、閾値 $Z$ 以下の長さは1、$P_{\le\Lambda}(u_*)=1/2$ です。$2/\kappa$ 後には中心が $Z+2$ へ移り、帯は $[Z+1,Z+3]$ となるため $P_{\le\Lambda}=0$ です。これは比較用の $f$ の重みであり、Hawking粒子数ではありません。

(c) 位相の差の積分を三角不等式で評価し、

$$
\begin{aligned}
|I_\chi[p]-I_\chi[\widetilde p]|
&\le\int_J|\chi(u)|\,
|e^{i\Omega p(u)}-e^{i\Omega\widetilde p(u)}|\,du\\
&\le\Omega\int_J|\chi(u)||p(u)-\widetilde p(u)|\,du\\
&\le\Lambda\varepsilon\|\chi\|_1=\Lambda\varepsilon.
\end{aligned}
$$

これは有限帯域の診断積分についての一様評価です。

(d) [QCURV11の熱因子](../QCURV11/index.md#thm-qcurv11-thermal-ratio)に加え、[QCURV12の周波数・角運動量別の灰色体因子](../QCURV12/index.md#thm-qcurv12-greybody-flux)、入射のない後期Unruh型状態という[状態選択](../QCURV13/index.md#def-qcurv13-three-states)、各チャネルの規格化と和・積分の収束が必要です。質量減少まで述べるなら[QCURV17の準静的な光度と無限遠収支](../QCURV17/index.md#def-qcurv17-quasistatic-luminosity)がさらに必要です。

(e) 証明できません。(a) は幾何光学写像の逆追跡であり、後期極限では

$$
\Omega_{\rm back}(u)\longrightarrow+\infty
\qquad (u\to+\infty).
$$

したがって指定した有限のUV閾値 $\Lambda$ の外側でどの場の方程式が正しいかを、この計算だけでは決められません。

(b) の $P_{\le\Lambda}\to0$ は比較用波束の重みに関するもので、UV変更後の正準量子化や出射粒子数を求めていません。(c) の誤差評価は $\Lambda\varepsilon$ と有限帯域に依存し、全周波数・全時刻では一様ではありません。

さらに同じ $\alpha,\beta$ を固定しても、[状態依存の命題](#prop-qcurv18-state-occupation)では出射占有数が入射占有数 $n$ に依存します。熱性の頑健性を論じるには、UV修正した場の方程式、状態、境界条件、モード規格化を指定し直して計算する必要があります。
<!-- solution-end -->

## 7. この章で得た判断基準

1. 指数写像が成立する後期区間では、過去のアフィン周波数は $\omega e^{\kappa u}/(\kappa A)$ と増大し、有限UV閾値には有限の $u_*$ で達します。これは単独で熱スペクトルの頑健性を意味しません。
2. 正規化した対数周波数波束の重みは後期に有限窓の外へ移ります。有限帯域・有限時間の位相積分には摂動評価がありますが、どちらも量子場のUV変更の普遍定理ではありません。
3. 有限区間の指数則は永遠の地平線形成を確定せず、同じBogoliubov係数でも入射状態が変われば出射占有数は変わります。
4. Hawkingの後期熱因子、4次元の灰色体付き流束、準静的な蒸発質量則は、異なる仮定を積み上げた結果です。初期過渡・相互作用・UV新物理・量子重力的蒸発終期を一つの導出で解決したことにはなりません。

次はde Sitterの静的パッチと宇宙論的地平線を別の観測者・状態選択で検討します。ブラックホールの遠方への正味流束と、静的パッチの検出器が示す温度を区別しながら進みます。
