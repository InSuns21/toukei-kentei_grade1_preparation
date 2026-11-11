# BHT22 一般化第二法則（GSL）

[前講で定義した一般化エントロピー](../BHT21/index.md#def-bht21-generalized-entropy)は、地平線の切断面に付随する重力の局所エントロピーと外部量子場のエントロピーを、同一の繰り込み規約で足したものでした。しかし「和を定義できる」ことから「和が増加する」ことは導けません。Hawking放射で面積が減る場合にも第二法則をどう述べればよいのでしょうか。

この講義では、まず落下物体と放射の収支を数値・式で比較し、その後に[量子相対エントロピーのデータ処理不等式](../../../応用系/QINF/QINF20/index.md#thm-qinf20-dpi)を使う証明の仕組みへ進みます。最終的な主張は、**半古典的な因果的地平線**で条件を満たしたときのものです。局所的な見かけの地平線、任意の量子重力理論、強く非定常な背景を一括して証明したことにはしません。

4次元、計量符号 $(-,+,+,+)$、$c=\hbar=k_B=1$ を用い、$G_{\rm ren}>0$ を明示します。エントロピー・相対エントロピーの対数は自然対数です。量子場の重力への逆作用は必要な範囲で半古典Einstein方程式に従うとし、時間とエネルギーの規格化、状態、未来境界条件を使う場所で指定します。

## 1. 第二法則が比較する二つの切断面

未来の事象の地平線を考え、その生成線に沿って後の位置にある二つの空間的切断面を $\Sigma_1,\Sigma_2$ とします。各切断面に対応する外部領域・状態を指定し、外部に残る量子相関を数えます。「後の面」とは、無限遠での単一の時計の値だけでなく、各地平線生成線上で未来向きであるという意味です。

Einstein項が支配的な場合には

$$
S_{\rm gen}(\Sigma_i)
=\frac{A_i}{4G_{\rm ren}}+S_{{\rm out},i}^{\rm ren},
\qquad i=1,2
$$

です。高階曲率項・接触項・境界項を無視できない理論では、面積項を適切な重力局所エントロピーに置き換えます。別々のカットオフで外部エントロピーだけを引く比較は、[BHT21の繰り込みの定義](../BHT21/index.md#def-bht21-generalized-entropy)に反します。

<a id="def-bht22-gsl-balance"></a>

<!-- formal-statement-start -->
> **定義（切断面間の一般化エントロピー収支）**  
> 同じ半古典理論、同一の繰り込み処方と、指定された量子状態のもとで、未来向きに順序付けた二つの因果的地平線切断面 $\Sigma_1,\Sigma_2$ に対して、両側の[一般化エントロピー](../BHT21/index.md#def-bht21-generalized-entropy)が有限なら、収支を

$$
\Delta S_{\rm gen}
:=S_{\rm gen}(\Sigma_2)-S_{\rm gen}(\Sigma_1)
=\Delta S_{\rm grav}+\Delta S_{\rm out}^{\rm ren}
$$

> と定義する。**一般化第二法則（GSL）**は、この収支が非負であるという、適用条件を伴う主張である。定義だけで任意の状態・時空に対する不等式が得られるわけではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht22-gsl-balance -->
**定義の確認**：未来向きに順序付けた $\Sigma_1\prec\Sigma_2$ に、同じ理論・量子状態・繰り込み規約で有限な値が得られたと**仮定する数値模型**を考えます。たとえば $(S_{\rm grav},S_{\rm out}^{\rm ren})$ が $\Sigma_1$ で $(10,7)$、$\Sigma_2$ で $(7,12)$ なら、二切断面の差をとることで

$$
\Delta S_{\rm grav}=7-10=-3,\quad
\Delta S_{\rm out}^{\rm ren}=12-7=5,\quad
\Delta S_{\rm gen}=2\ge0
$$

となりGSLと整合します。外部項の後の値を $8$ に変えれば $-3+(8-7)=-2$ で収支は負です。ただしこれは**定義の代入例**であり、数値を持つ物理状態の存在は証明していません。同じ規約で有限という前提を満たす実在の半古典状態かどうかは、エネルギー流束・場の状態・地平線方程式を調べる必要があります。GSLは「負になる二数値を禁止する」ための根拠を要求します。
<!-- definition-example-end -->

古典的な[面積非減少の議論](../BHT3/index.md#prop-bht3-vaidya-future-integral)は零エネルギー条件と大域的な地平線仮定を使います。量子場の繰り込まれた応力テンソルは点ごとの零エネルギー条件を満たすとは限らず、蒸発するブラックホールでは $\Delta A<0$ も起こります。GSLが比較するのは**面積単独でなく和**です。

## 2. 物体を落とすと外のエントロピーはどこへ行くか

十分大きな非極限・ほぼ定常なSchwarzschildブラックホールへ、小さな物体を投入する思考実験を考えます。$E_\infty>0$ は無限遠の定常Killing時間に関する物体のエネルギー、$S_{\rm box}$ は外部から失う物体のエントロピーです。投入に伴う重力波、仕事、熱的雰囲気、他の外部相関は**この最初の模型では**無視します。

[BHT8の第一法則の面積係数表示](../BHT8/index.md#prop-bht8-first-law-area)を、仕事項がなく質量変化が十分小さい条件で用いると、

$$
\Delta S_{\rm BH}
=\frac{\Delta M}{T_H}+O((\Delta M)^2),
\qquad
\Delta M=E_\infty,\quad
\Delta S_{\rm out}\simeq-S_{\rm box}.
$$

そこで $\beta_H:=1/T_H$ とおけば、

$$
\boxed{\displaystyle
\Delta S_{\rm gen}\simeq\beta_HE_\infty-S_{\rm box}.}
$$

この計算は第二法則の**必要な収支条件**を示すだけです。$E_\infty$ を好きなだけ小さくしつつ $S_{\rm box}$ を維持できるなら、見かけ上負になります。しかし物体の有限サイズ・保持に必要な力・地平線近傍の熱的雰囲気を省いています。

### 2.1 地平線直上に降ろす操作

静的な計量の地平線近傍で、外向き固有距離を $\ell>0$、表面重力を $\kappa>0$ とします。非極限Killing地平線の十分近くで赤方偏移係数は $\chi\simeq\kappa\ell$ です。静止した物体の局所エネルギー $E_{\rm loc}$ と無限遠でのエネルギーは $E_\infty=\chi E_{\rm loc}$ なので、[BHT8で確認したHawking温度](../BHT8/index.md#prop-bht8-normalization) $T_H=\kappa/(2\pi)$ に代入して

$$
\beta_HE_\infty
\simeq\frac{2\pi}{\kappa}(\kappa\ell E_{\rm loc})
=2\pi\ell E_{\rm loc}.
$$

ゆえに単純模型では $S_{\rm box}\le2\pi\ell E_{\rm loc}$ が非負収支の条件です。半径 $R$ の有限サイズの物体なら中心を $\ell<R$ に置けないという幾何的制約が現れますが、これから任意の系について $S_{\rm box}\le2\pi R E_{\rm loc}$ を**証明したわけではありません**。その境界と反例の読み方は次講BHT23で吟味します。

さらに静止した箱を支える観測者にはUnruh型の熱的雰囲気が見えます。箱を下ろす際の浮力・変位された熱的雰囲気のエントロピーを含めれば、$\Delta S_{\rm out}=-S_{\rm box}$ という初歩模型の式自体が修正されます。したがって「浮力を無視した降下実験で負を作れた」は、GSLへの反例にはなりません。

## 3. Hawking放射で面積が減っても和は増えるか

今度は逆に、放射が外へエネルギーを運ぶ過程です。十分大きなほぼ定常のブラックホールで短時間の出射エネルギーを $E_{\rm rad}>0$ とし、仕事項と高次の逆作用を無視すると、

$$
\Delta M=-E_{\rm rad},
\qquad
\Delta S_{\rm BH}\simeq-\beta_HE_{\rm rad}.
$$

外部放射のエントロピー増分が $S_{\rm rad}$ なら

$$
\Delta S_{\rm gen}\simeq S_{\rm rad}-\beta_HE_{\rm rad}
$$

という条件付きの収支になります。**粒子一個ごとにエントロピー1を足す**わけではありません。ここで明示的に計算できるのは、以前は空だった単一の外部モードが独立な対角の熱型状態になるという、相関を省略した模型です。

エネルギー $\omega>0$ のボースモードの平均占有数を $n\ge0$ とします。熱型の幾何分布 $p_m=(1-q)q^m$（$m=0,1,\ldots$）で $q=n/(1+n)$ とすれば、$\sum_m p_m=1$、$\sum_m mp_m=q/(1-q)=n$ です。この分布の自然対数エントロピーは

$$
\begin{aligned}
s(n)&=-\sum_{m=0}^\infty p_m\ln p_m\\
&=-\ln(1-q)-n\ln q\\
&=(1+n)\ln(1+n)-n\ln n,
\end{aligned}
$$

ただし $s(0)=0$ は連続極限です。出射エネルギーは $\omega n$。温度 $T_H$ の理想的な熱占有数 $n_H=(e^{\beta_H\omega}-1)^{-1}$ を超えない出射モードを考えます。灰色体因子 $0\le\Gamma\le1$ による $n=\Gamma n_H$ はこの範囲にありますが、**散乱後の場全体の相関**まで独立とする追加近似を忘れてはいけません。

<a id="prop-bht22-boson-flux"></a>

<!-- formal-statement-start -->
> **命題（独立なボース出射モードの収支）**  
> 温度 $T_H>0$ を固定し、$\beta_H=1/T_H$ とする。エネルギー $\omega>0$ の外部ボースモードが初期の真空から平均占有数 $0\le n\le n_H=(e^{\beta_H\omega}-1)^{-1}$ の幾何分布へ変化するものとする。外部の他の自由度との相関によるエントロピー差を無視し、ブラックホールの面積エントロピーの変化を $-\beta_H\omega n$ で近似できるなら、

$$
\Delta S_{\rm gen}^{\rm mode}
=s(n)-\beta_H\omega n\ge0,
\qquad
s(n)=(1+n)\ln(1+n)-n\ln n.
$$

> $n=n_H$ なら、その差は $-\ln(1-e^{-\beta_H\omega})>0$ である。この命題は独立モード模型の結果であり、任意の蒸発状態に対するGSLの証明ではない。
<!-- formal-statement-end -->

### 証明の見取り図

量子状態の固有値が幾何分布なので、和からエントロピーが直接計算できます。$f(n):=s(n)-\beta_H\omega n$ を作り、熱占有数より小さい区間で $f'(n)\ge0$ を示します。

<!-- proof-start -->
### 証明

$n>0$ では積の微分から

$$
\begin{aligned}
s'(n)
&=\ln(1+n)+1-(\ln n+1)\\
&=\ln\frac{1+n}{n},\\
f'(n)&=\ln\left(1+\frac1n\right)-\beta_H\omega.
\end{aligned}
$$

$n\le n_H$ のとき $1/n\ge1/n_H=e^{\beta_H\omega}-1$ なので、

$$
\ln\left(1+\frac1n\right)
\ge\ln(e^{\beta_H\omega})
=\beta_H\omega.
$$

従って $f'(n)\ge0$。さらに $n\ln n\to0$（$n\downarrow0$）より $f(0)=0$ なので、区間全体で $f(n)\ge0$ です。上端で $q=e^{-\beta_H\omega}$ を上のエントロピー式へ代入すると

$$
\begin{aligned}
f(n_H)
&=-\ln(1-q)-n_H\ln q-\beta_H\omega n_H\\
&=-\ln(1-q)
>0
\end{aligned}
$$

です。$\ln q=-\beta_H\omega$ によって最後の二項が相殺します。$\square$
<!-- proof-end -->

この計算では $n$ に伴う**平均エネルギーの**変化を第一法則へ代入しました。放射が先に出た量子と強く相関する場合、外部全体の微細なエントロピー変化は個々のモードの $s(n)$ の和にならず、質量変化が大きい場合は $\beta_H$ も変化します。放射の単独モード熱性とGSLの一般定理は異なります。

## 4. 相対エントロピーの単調性から証明へ

前節は放射の模型ごとに外部エントロピーを推測しました。一般の量子相関を含む議論では、**未来の切断面へ進むと、外部から利用できる情報が減る**という構造を使う方が強力です。二つの切断面に対応する場の領域の代数を $\mathcal A_1\supseteq\mathcal A_2$ と書きます。初めに有限次元の正則化模型で、後者への制限が一部の自由度を捨てる量子チャネルとして表せる場合を考えます。

参照状態 $\sigma_i$ と実際の状態 $\rho_i$ を各領域へ制限した密度演算子とします。[QINF20の量子相対エントロピー](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)は底2ですが、ここでは自然対数の量 $D_{\rm nat}=\ln2\,D_{\rm bit}$ を用います。参照状態が忠実（零固有値なし）なら、**モジュラーHamiltonian** を有限次元で $K_i=-\ln\sigma_i$ と定義できます。

同じ切断面 $i$ で状態 $\rho_i$ と $\sigma_i$ を比べる記号を $\Delta_\sigma X_i:=X_i(\rho)-X_i(\sigma)$ と定めます。これは異なる切断面を比べる $\Delta X:=X_2-X_1$ とは別です。有限次元では $S_{{\rm out},i}(\tau)=-\operatorname{Tr}(\tau_i\ln\tau_i)$（$\tau=\rho,\sigma$）なので、

$$
\begin{aligned}
D_i&:=D_{\rm nat}(\rho_i\Vert\sigma_i)\\
&=\operatorname{Tr}(\rho_i\ln\rho_i)
 -\operatorname{Tr}(\rho_i\ln\sigma_i)\\
&=\Delta_\sigma\langle K_i\rangle-\Delta_\sigma S_{{\rm out},i},
\end{aligned}
$$

となります。連続場では局所代数を有限次元Hilbert空間へ単純に因子分解できないため、この式とデータ処理を使うには、相対エントロピーを局所代数に拡張できる状態・正則化を仮定します。

<a id="def-bht22-modular-energy"></a>

<!-- formal-statement-start -->
> **定義（参照状態に対するモジュラーエネルギー差）**  
> 有限次元の外部領域代数で忠実な参照状態 $\sigma_i$ を指定し、$K_i=-\ln\sigma_i$ とする。同一領域上の状態 $\rho_i$ に対する

$$
\Delta_\sigma\langle K_i\rangle
:=\operatorname{Tr}[(\rho_i-\sigma_i)K_i]
$$

> を**参照状態に対するモジュラーエネルギー差**と呼ぶ。これは一般には通常の物理Hamiltonianのエネルギー差ではなく、$\sigma_i$ の選択に依存する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht22-modular-energy -->
**行列表示への橋渡し**：忠実な参照状態を固有分解して $\sigma=\sum_j s_j|j\rangle\langle j|$（$s_j>0$）と書けば、行列の対数はこの固有基底で $\ln\sigma=\sum_j(\ln s_j)|j\rangle\langle j|$ です。$\rho$ も同じ基底で対角な例では $\rho=\sum_j r_j|j\rangle\langle j|$ と表せるので、トレースの定義から

$$
\operatorname{Tr}[(\rho-\sigma)(-\ln\sigma)]
=\sum_j(r_j-s_j)(-\ln s_j)
$$

となります。つまり、対角成分の計算はモジュラーエネルギー差の**定義を固有基底で展開したもの**です。一般に $\rho$ と $\sigma$ が可換でなければ両方を同じ基底で対角化できず、右辺の $r_j$ を $\rho$ の固有値で置き換えてはいけません。

**定義の確認**：二準位の参照状態と実際の状態を同じ基底で

$$
\sigma=\operatorname{diag}(3/4,1/4),\qquad
\rho=\operatorname{diag}(1,0)
$$

と指定します。固有値は非負、両者のトレースは1なので密度演算子です。$\sigma$ の固有値はともに正だから[QINF20の台の包含条件](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)を満たし、$K=-\ln\sigma$ は有限です。上の展開式へ $s=(3/4,1/4)$、$r=(1,0)$ を代入すると

$$
\begin{aligned}
\Delta_\sigma\langle K\rangle
&=\left(1-\frac34\right)\left(-\ln\frac34\right)
  +\left(0-\frac14\right)\left(-\ln\frac14\right)\\
&=\frac14\ln\frac13=-\frac{\ln3}{4}.
\end{aligned}
$$

負でも問題ありません。モジュラーエネルギー差そのものには非負性は要求せず、非負なのは上の**相対エントロピー**です。ここでは $\rho$ と $\sigma$ が同じ固有基底で対角であることも実際に使いました。確かに $S(\rho)=0$、$S(\sigma)=\ln4-\tfrac34\ln3$ なので、先に得た恒等式は

$$
D_{\rm nat}(\rho\Vert\sigma)
=-\frac14\ln3-\left(-\ln4+\frac34\ln3\right)
=\ln\frac43>0
$$

を与え、[量子相対エントロピーの定義](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)から直接計算した値と一致します。
<!-- definition-example-end -->

### 4.1 何があれば一般化第二法則になるか

[データ処理不等式](../../../応用系/QINF/QINF20/index.md#thm-qinf20-dpi)を外部自由度の制限へ適用すれば、有限次元では $D_2\le D_1$ です。連続場でも同じ代数包含に対する単調性を適用できることを、この節の追加仮定とします。

しかし $D$ の単調性だけでは面積の変化は出ません。ここに半古典重力から得るもう一つの関係、**面積応答と参照モジュラーエネルギー差の相殺**が必要です。この関係の由来を次節で計算します。

<a id="prop-bht22-conditional-gsl"></a>

<!-- formal-statement-start -->
> **命題（相対エントロピーによる条件付きGSL）**  
> 未来の切断面 $\Sigma_1\prec\Sigma_2$ に対応する外部代数が $\mathcal A_1\supseteq\mathcal A_2$ と入れ子になり、状態 $\rho,\sigma$ の有限な相対エントロピー $D_1,D_2$ が制限に関して単調 $D_2\le D_1$ だとする。両状態の繰り込まれた一般化エントロピーが定義され、参照状態の $S_{\rm gen}(\sigma;\Sigma_i)$ は両切断面で同一とする。さらに各切断面で

$$
\Delta_\sigma S_{\rm grav}(\Sigma_i)
=-\Delta_\sigma\langle K_i\rangle+C
$$

> が**切断面によらない同じ定数** $C$ について成り立ち、外部エントロピー差と相対エントロピーが $D_i=\Delta_\sigma\langle K_i\rangle-\Delta_\sigma S_{\rm out}(\Sigma_i)$ を満たすとする。この場合

$$
S_{\rm gen}(\rho;\Sigma_2)-S_{\rm gen}(\rho;\Sigma_1)
=D_1-D_2\ge0.
$$

> これは列挙した条件の下の結論であり、それらが全ての動的ブラックホールや量子場について成立するという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

固定した切断面では、一般化エントロピーの状態差をモジュラーエネルギー差と相対エントロピーへ書き換えます。重力項とモジュラー項が相殺した後に、二切断面の差を取ります。

<!-- proof-start -->
### 証明

各 $i=1,2$ に対して、

$$
\begin{aligned}
\Delta_\sigma S_{\rm gen}(\Sigma_i)
&=\Delta_\sigma S_{\rm grav}(\Sigma_i)
  +\Delta_\sigma S_{\rm out}(\Sigma_i)\\
&=\bigl(-\Delta_\sigma\langle K_i\rangle+C\bigr)
  +\bigl(\Delta_\sigma\langle K_i\rangle-D_i\bigr)\\
&=C-D_i.
\end{aligned}
$$

ここで第2行の外部項は相対エントロピーの恒等式を $S$ について解いたものであり、重力側の関係は**独立の仮定**です。参照状態の一般化エントロピーは切断面間で一定なので、

$$
\begin{aligned}
S_{\rm gen}(\rho;\Sigma_2)-S_{\rm gen}(\rho;\Sigma_1)
&=[C-D_2]-[C-D_1]\\
&=D_1-D_2\ge0.
\end{aligned}
$$

最後の不等号だけが[相対エントロピーの単調性](../../../応用系/QINF/QINF20/index.md#thm-qinf20-dpi)に依存します。$\square$
<!-- proof-end -->

**有限模型で向きを確認**：二量子ビットの参照状態を $\sigma_{AB}=I_4/4$、実際の状態を $\rho_{AB}=|00\rangle\langle00|$ とし、未来側では $A$ を捨て $B$ だけを見るとします。自然対数の相対エントロピーは

$$
D_{AB}=\ln4,\qquad
D_B=\ln2,\qquad D_{AB}-D_B=\ln2>0.
$$

実際、純粋状態の $\operatorname{Tr}\rho\ln\rho$ は0、最大混合参照状態の対数は $-\ln4$ または $-\ln2$ 倍の単位行列です。この例は**情報の単調性**を直接検算しますが、量子ビットを捨てるだけでは重力の面積応答を作りません。面積の条件は別に必要です。

## 5. 地平線の面積がモジュラー項を打ち消す模型

面積とモジュラーエネルギーが結び付く仕組みを、平坦なRindler地平線の小さな摂動で追います。未来向きのアフィンパラメータを $v$、地平線生成方向の接ベクトルを $k^a=dx^a/dv$ とします。横断座標を $y$ とし、以下の $d^2y$ は背景の横断面積要素を表すものとします。横断面で積分した繰り込まれた応力テンソルの参照状態差を

$$
F(v):=\int d^2y\,\Delta_\sigma\langle T_{ab}(v,y)\rangle k^ak^b
$$

と置きます。ここでは十分速く減衰する滑らかな流束、有限の一次モーメント、未来の無せん断・定常端状態を仮定します。$F$ は量子論では符号が必ずしも正とは限りません。

地平線膨張率の一次の状態差を $\delta\theta(v,y)$、対応する断面積の一次の状態差を $\delta A(v)$ とします。[GR34の光的Raychaudhuri方程式](../../GR/GR34/index.md#thm-gr34-null-raychaudhuri)を使い、背景で膨張率・せん断・ねじれが零、摂動一次で膨張率の二乗とせん断二乗を落とします。せん断 $\sigma_{ab}$ の記号は参照量子状態 $\sigma_i$ とは別です。

[QCURV17の半古典Einstein方程式](../../QCURV/QCURV17/index.md#def-qcurv17-semiclassical-equation)のEinstein項が支配的なら、$g_{ab}k^ak^b=0$ により、光的なRicci縮約は

$$
R_{ab}k^ak^b
=8\pi G_{\rm ren}\langle T_{ab}\rangle k^ak^b
$$

です。参照状態と実際の状態の一次差をとって代入すると、

$$
\frac{d\,\delta\theta}{dv}
=-8\pi G_{\rm ren}\,
 \Delta_\sigma\langle T_{ab}\rangle k^ak^b.
$$

まず[GR34の面積の対数微分](../../GR/GR34/index.md#prop-gr34-volume-area)を背景の面積要素で一次展開すると、$\theta=\partial_v\ln\sqrt h$ より

$$
\frac{d\,\delta A(v)}{dv}
=\int d^2y\,\delta\theta(v,y),
\qquad
\frac{d^2\,\delta A(v)}{dv^2}
=-8\pi G_{\rm ren}F(v).
$$

未来境界条件 $\delta\theta(+\infty,y)=0$ と流束の可積分性から、固定した $y$ でRaychaudhuri方程式を $v$ から未来へ積分し、さらに横断面で積分します。こうして

$$
\frac{d\,\delta A(v)}{dv}
=8\pi G_{\rm ren}\int_v^\infty F(u)\,du
$$

を得ます。$\Delta_\sigma S_{\rm grav}=\delta A/(4G_{\rm ren})$ と同定するEinstein重力の一次近似では、

$$
\frac{d}{dv}\Delta_\sigma S_{\rm grav}(v)
=2\pi\int_v^\infty F(u)\,du
$$

となります。係数は $8\pi G_{\rm ren}/(4G_{\rm ren})=2\pi$ です。$\delta A$ は同じ切断面上の二状態の幾何応答であり、異なる切断面間の差 $A(v_2)-A(v_1)$ ではありません。

Rindler真空の地平線上では、参照状態のモジュラーHamiltonianの**状態差**が、適切な量子場・地平線代数・正則化の下で次の加重流束表示を持つことを**量子場理論側の入力**とします：

$$
\Delta_\sigma\langle K_v\rangle
=2\pi\int_v^\infty(u-v)F(u)\,du.
$$

この式は任意の時空の任意の参照状態で成り立つ定義ではありません。積分核 $u-v$ がどこから来るかは、Rindlerブースト対称性とその真空のモジュラー構造に依存します。$u$ は積分変数で、$v$ は動かす切断面の位置です。$F(u)$ は $v$ に依存しないので、有限な一次モーメントを使って下端の寄与を確認します：

$$
\begin{aligned}
\frac{d}{dv}\Delta_\sigma\langle K_v\rangle
&=2\pi\left[-(v-v)F(v)
  +\int_v^\infty\frac{\partial}{\partial v}\{(u-v)F(u)\}\,du\right]\\
&=2\pi\left[0-\int_v^\infty F(u)\,du\right].
\end{aligned}
$$

したがって

$$
\frac{d}{dv}\Delta_\sigma\langle K_v\rangle
=-2\pi\int_v^\infty F(u)\,du.
$$

従って

$$
\boxed{\displaystyle
\frac{d}{dv}\left(
\Delta_\sigma S_{\rm grav}
+\Delta_\sigma\langle K_v\rangle
\right)=0.}
$$

これが[条件付きGSLの命題](#prop-bht22-conditional-gsl)で要求した定数 $C$ の物理的な由来の一例です。**絶対エントロピーの状態差、面積の一次応答、Rindler真空のモジュラー表示**をそろえて初めて、相対エントロピー単調性と接続できます。

### 5.1 矩形流束で係数と未来境界条件を検算する

計算を透明にするため $F(u)=f>0$（$1\le u\le2$）、それ以外は0という有限流束の理想化を考えます。角の不連続は滑らかな近似で置き換えられます。切断面を $v=0$ と $v=3/2$ に置くと、

$$
\begin{aligned}
\Delta_\sigma\langle K_0\rangle
&=2\pi f\int_1^2u\,du=3\pi f,\\
\Delta_\sigma\langle K_{3/2}\rangle
&=2\pi f\int_{3/2}^2(u-3/2)\,du
=\frac{\pi f}{4}.
\end{aligned}
$$

ゆえに $\Delta_\sigma S_{\rm grav}(3/2)-\Delta_\sigma S_{\rm grav}(0)=11\pi f/4$。正流束なのに面積が**流入時刻より前から**応答するのは、事象の地平線の位置が未来の定常境界条件に依存するためです。これは局所的な見かけの地平線に同じ式を移植してよい理由にはなりません。

## 6. 証明が届く範囲と残る問い

| 結論 | この講義で確かめた根拠 | 必ず点検する条件 |
| --- | --- | --- |
| 落下物体の単純収支 | $\Delta S_{\rm BH}\simeq\beta_HE_\infty$ と外部の損失 | 小さい摂動、仕事・浮力・相関を無視した近似 |
| 独立な出射ボースモード | $s(n)-\beta_H\omega n\ge0$ を微分で証明 | $0\le n\le n_H$、初期真空、独立なモード、ほぼ定常 |
| 相対エントロピー型GSL | $S_{\rm gen}=C-D$ と制限の単調性 | 入れ子の外部代数、有限な相対エントロピー、参照状態、面積応答 |
| Rindler地平線での相殺 | 線形化Raychaudhuri方程式と加重流束の微分 | 半古典Einstein重力、未来境界条件、Rindler真空のモジュラー表示、一次摂動 |

相対エントロピーに基づくより一般の半古典GSLには、因果的地平線の代数、局所量子場の正則性、応力テンソルとエントロピーの繰り込み、量子場の地平線上の性質などの追加仮定が必要です。特定の自由場や理論のクラスではその仮定が検証され、任意の切断面を扱う定理も知られています。しかし**任意の状態・任意の重力作用・任意の「地平線」について無条件に成立すると宣言してはいけません**。

特に蒸発の後半では、過去の放射との相関を捨てた粗視化エントロピーと、外部全体の微細なvon Neumannエントロピーを区別しなければなりません。一般化エントロピーの切断面依存性と、量子極値曲面・islandの処方は同じ定義を無条件に置換するものではありません。

## 7. 演習（全問に詳細解答）

### Level A：式の符号と条件を一つずつ確かめる

<a id="ex-bht22-a01"></a>

#### BHT22-A01 落下物体の単純収支

- Level: A

- 問題: この設問に限り $G_{\rm ren}=1$ とし、ほぼ定常な中性Schwarzschildブラックホールに物体を落とす模型で $T_H=1/1000$、$E_\infty=1/50$、$S_{\rm box}=15$ とする。仕事・浮力・相関を無視した一次収支を求め、結論が適用できる条件を述べよ。

<!-- solution-start -->
**詳細解答**：$\beta_H=1/T_H=1000$ です。[BHT8の第一法則の面積係数表示](../BHT8/index.md#prop-bht8-first-law-area)を仕事なし・小さい質量変化に適用すると、

$$
\Delta S_{\rm BH}\simeq\beta_HE_\infty
=1000\cdot\frac1{50}=20.
$$

外部で箱の自由度が失われるだけと置けば $\Delta S_{\rm out}\simeq-15$ なので、

$$
\Delta S_{\rm gen}\simeq20-15=5>0.
$$

質量変化は背景質量より十分小さく、温度変化を一次で無視できる必要があります。実際この温度に対応するSchwarzschild質量について、

$$
M=\frac1{8\pi T_H}=\frac{125}{\pi},\qquad
\frac{E_\infty}{M}=\frac{\pi}{6250}\ll1.
$$

$S_{\rm box}$ が外部全体の微細エントロピーの減少に一致するには、初期・最終の他の自由度との相関が無視できることも必要です。この数値例は一般的な投下過程のGSLを証明しません。
<!-- solution-end -->

<a id="ex-bht22-a02"></a>

#### BHT22-A02 赤方偏移したエネルギー

- Level: A

- 問題: 非極限静的地平線の近傍で $\chi\simeq\kappa\ell$、$T_H=\kappa/(2\pi)$、$E_\infty=\chi E_{\rm loc}$ とする。$\beta_HE_\infty$ を $\ell,E_{\rm loc}$ で表し、$\kappa$ が消えることを確かめよ。

<!-- solution-start -->
**詳細解答**：$\beta_H=2\pi/\kappa$ を掛けると、

$$
\beta_HE_\infty
=\frac{2\pi}{\kappa}\chi E_{\rm loc}
\simeq\frac{2\pi}{\kappa}(\kappa\ell)E_{\rm loc}
=2\pi\ell E_{\rm loc}.
$$

$\kappa>0$ が分母と分子で相殺されます。$\ell$ は外向きの固有距離で、近傍近似が有効な範囲に限ります。箱の中心を地平線上へ無限に近づけられるという物理的結論は含まれません。
<!-- solution-end -->

<a id="ex-bht22-a03"></a>

#### BHT22-A03 ボースモードのエントロピー微分

- Level: A

- 問題: $s(n)=(1+n)\ln(1+n)-n\ln n$（$n>0$）、$x=\beta_H\omega>0$ とする。$f(n)=s(n)-xn$ の導関数を求め、$n=(e^x-1)^{-1}$ で0となることを示せ。

<!-- solution-start -->
**詳細解答**：$n>0$ で積の微分を使うと、

$$
s'(n)=[\ln(1+n)+1]-[\ln n+1]
=\ln\frac{1+n}{n}.
$$

従って

$$
f'(n)=\ln(1+1/n)-x.
$$

$n=(e^x-1)^{-1}$ では $1+1/n=e^x$ なので $f'(n)=\ln(e^x)-x=0$ です。さらに $f'(n)>0$（$0<n<n_H$）であり $f'(n)<0$（$n>n_H$）なので、これは最大点です。$n=0$ で直接対数微分せず、関数値は $n\ln n\to0$ の極限で定めます。
<!-- solution-end -->

<a id="ex-bht22-a04"></a>

#### BHT22-A04 相対エントロピーの対数の底

- Level: A

- 問題: 二値分布 $p=(1,0)$、$q=(1/2,1/2)$ について、底2の $D_{\rm bit}(p\Vert q)$ と自然対数の $D_{\rm nat}(p\Vert q)$ を求めよ。なぜGSLの式では自然対数を用いるか述べよ。

<!-- solution-start -->
**詳細解答**：台包含は $q_1,q_2>0$ から成立します。[QINF20の定義](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)に代入し、$p_2=0$ の項を0とすると、

$$
D_{\rm bit}=1\log_2(1/(1/2))=1,
\qquad
D_{\rm nat}=1\ln2=\ln2.
$$

$\ln x=(\ln2)\log_2x$ なので $D_{\rm nat}=(\ln2)D_{\rm bit}$ です。[BHT21の外部エントロピー](../BHT21/index.md#def-bht21-regulated-outside)は熱力学的な自然対数を使うため、$S_{\rm gen}$ と差し引く相対エントロピーも同じ底にそろえます。
<!-- solution-end -->

<a id="ex-bht22-a05"></a>

#### BHT22-A05 未来端からの面積応答

- Level: A

- 問題: $d\theta/dv=-8\pi G t(v)$、$\theta(\infty)=0$ とする。$t(v)=t_0>0$（$1\le v\le2$）、それ以外は0として $\theta(v)$ を $v<1$、$1\le v\le2$、$v>2$ に分けて求めよ。

<!-- solution-start -->
**詳細解答**：未来境界条件から

$$
\theta(v)=8\pi G\int_v^\infty t(u)\,du.
$$

区間の重なる長さは $v<1$ で1、$1\le v\le2$ で $2-v$、$v>2$ で0です。従って

$$
\theta(v)=8\pi Gt_0
\begin{cases}
1,&v<1,\\
2-v,&1\le v\le2,\\
0,&v>2.
\end{cases}
$$

$v<1$ でも正なのは未来の境界条件を使って地平線を定めたためです。未来積分を過去積分へ取り違えるとこの性質を失います。
<!-- solution-end -->

### Level B：熱収支・状態・幾何の接続

<a id="ex-bht22-b01"></a>

#### BHT22-B01 灰色体因子は符号を変えるか

- Level: B

- 問題: $x>0$、$n_H=(e^x-1)^{-1}$、$n=\Gamma n_H$（$0\le\Gamma\le1$）とする。$f(n)=(1+n)\ln(1+n)-n\ln n-xn$ の符号を判定せよ。$\Gamma=0,1$ の値を示し、なぜ放射全体のGSLの証明ではないか説明せよ。

<!-- solution-start -->
**詳細解答**：$0<\Gamma\le1$ なら $0<n\le n_H$ です。$n_H^{-1}=e^x-1$ を代入すれば、

$$
f'(n)=\ln(1+1/n)-x
\ge\ln(1+1/n_H)-x=0.
$$

$f(0)=0$ より全区間で $f(n)\ge0$。$\Gamma=0$ では $n=0$ で $f=0$、$\Gamma=1$ では

$$
f(n_H)=-\ln(1-e^{-x})>0.
$$

ただしこの $f$ は初期真空から独立な一つの対角モードが現れるときのエントロピー差です。複数モードや以前の放射と相関していれば、外部全体のエントロピーは各 $s(n)$ の和ではありません。また背景温度変化と逆作用も省いています。
<!-- solution-end -->

<a id="ex-bht22-b02"></a>

#### BHT22-B02 箱を下げれば無限に安いか

- Level: B

- 問題: 物体の局所エネルギー $E_{\rm loc}$、エントロピー $S_{\rm box}$、半径 $R$、保持する中心の固有距離 $\ell$ を考える。近地平線の $\Delta S_{\rm BH}\simeq2\pi\ell E_{\rm loc}$ を使い、$\ell\ge R$ とする幾何的制約の下で単純収支が非負となる十分条件を示せ。これを普遍的なエントロピー境界の証明と呼べない理由を二つ述べよ。

<!-- solution-start -->
**詳細解答**：箱の外部エントロピー損失を $-S_{\rm box}$ と置く模型では

$$
\Delta S_{\rm gen}\simeq2\pi\ell E_{\rm loc}-S_{\rm box}.
$$

$\ell\ge R$、$E_{\rm loc}\ge0$ なので $2\pi\ell E_{\rm loc}\ge2\pi R E_{\rm loc}$。従って $S_{\rm box}\le2\pi R E_{\rm loc}$ を**仮定すれば** $\Delta S_{\rm gen}\ge0$ です。しかし普遍的な境界の証明ではありません。

1. この境界自体は落下収支から導けず、置いた追加条件です。
2. 箱の保持・浮力・熱的雰囲気・エネルギー測定の仕方を省いており、現実の準静的降下で $\Delta S_{\rm out}=-S_{\rm box}$ が成り立つとは限りません。
<!-- solution-end -->

<a id="ex-bht22-b03"></a>

#### BHT22-B03 データ処理から収支へ

- Level: B

- 問題: 二切断面で $D_1=3\ln2$、$D_2=\ln2$、参照状態の $S_{\rm gen}$ が一定、かつ $\Delta_\sigma S_{\rm grav}(\Sigma_i)=-\Delta_\sigma\langle K_i\rangle+C$ とする。実際の状態の一般化エントロピー変化を求め、面積の関係を除いた場合にも同じ結論が出るか検討せよ。

<!-- solution-start -->
**詳細解答**：[条件付きGSL](#prop-bht22-conditional-gsl)の証明と同じく、各切断面で

$$
\Delta_\sigma S_{\rm gen}(\Sigma_i)
=-\Delta_\sigma\langle K_i\rangle+C
+\Delta_\sigma\langle K_i\rangle-D_i=C-D_i.
$$

参照状態は一定なので、実際の二切断面の差は $(C-D_2)-(C-D_1)=D_1-D_2=2\ln2>0$ です。面積の関係を除くと $\Delta_\sigma S_{\rm grav}$ と $\Delta_\sigma\langle K\rangle$ が相殺する保証がなく、[データ処理](../../../応用系/QINF/QINF20/index.md#thm-qinf20-dpi)から分かる $D_2\le D_1$ だけでは $S_{\rm gen}$ の増減を決められません。
<!-- solution-end -->

<a id="ex-bht22-b04"></a>

#### BHT22-B04 加重流束と面積の微分

- Level: B

- 問題: $F$ が $\int_v^\infty |F(u)|du$ と $\int_v^\infty(u-v)|F(u)|du$ を有限にする関数で、$K(v)=2\pi\int_v^\infty(u-v)F(u)\,du$、$S_{\rm grav}'(v)=2\pi\int_v^\infty F(u)\,du$ とする。$K'(v)$ を境界項も含めて求め、$S_{\rm grav}+K$ が一定であることを示せ。

<!-- solution-start -->
**詳細解答**：Leibnizの微分公式で、下端 $u=v$ の被積分関数は $(v-v)F(v)=0$ です。従って

$$
\begin{aligned}
K'(v)
&=2\pi\left[-(v-v)F(v)
+\int_v^\infty\frac{\partial}{\partial v}\{(u-v)F(u)\}\,du\right]\\
&=-2\pi\int_v^\infty F(u)\,du.
\end{aligned}
$$

指定した可積分性と適切な連続性のもとで微分と積分を交換しました。$S_{\rm grav}'(v)=+2\pi\int_v^\infty F$ と足すと $(S_{\rm grav}+K)'(v)=0$。$F$ の符号を正とする必要はありませんが、未来境界条件と同じ流束が両式に現れることが必要です。
<!-- solution-end -->

### Level C：物体・放射・相対エントロピーを統合する

<a id="ex-bht22-c01"></a>

#### BHT22-C01 Rindler流束と情報損失の一体検算

- Level: C

- 問題: 半古典的なRindler地平線の一次摂動で、横断積分流束を $F(u)=f>0$（$1\le u\le2$）、それ以外0とする。未来の定常境界条件を仮定する。モジュラーHamiltonian演算子 $K_v$ の参照状態に対する**期待値差**と重力エントロピーの**状態差**を、それぞれ次の数値関数で表す。

$$
\begin{aligned}
\mathcal K(v)&:=\Delta_\sigma\langle K_v\rangle
=2\pi\int_v^\infty(u-v)F(u)\,du,\\
S_g(v)&:=\Delta_\sigma S_{\rm grav}(v),\qquad
\frac{dS_g}{dv}=2\pi\int_v^\infty F(u)\,du.
\end{aligned}
$$

切断面を $v_1=0$、$v_2=3/2$ に取る。

1. $\mathcal K(v_1),\mathcal K(v_2)$ と重力エントロピーの参照状態差の時間変化を計算する。
2. 状態 $\rho$ と参照状態 $\sigma$ の相対エントロピーが $D_{v_1}=2a$、$D_{v_2}=a$（$a>0$）で、参照状態の一般化エントロピーは一定とする。外部エントロピーの**参照状態差の時間変化**を求める。
3. 全一般化エントロピーの変化を求める。流束だけから2. の相対エントロピー値を計算できるか、また非極限ブラックホール以外へ一般化できるか説明する。

<!-- solution-start -->
**詳細解答**：

**1. 重力項とモジュラー項。** 定義の積分は

$$
\begin{aligned}
\mathcal K(0)&=2\pi f\int_1^2u\,du
=2\pi f\left[\frac{u^2}{2}\right]_1^2=3\pi f,\\
\mathcal K(3/2)&=2\pi f\int_{3/2}^2(u-3/2)\,du\\
&=2\pi f\left[\frac{(u-3/2)^2}{2}\right]_{3/2}^2
=\frac{\pi f}{4}.
\end{aligned}
$$

よって $\mathcal K(3/2)-\mathcal K(0)=-11\pi f/4$。$S_g'(v)+\mathcal K'(v)=0$ を同じ $v$ 区間で積分し、

$$
S_g(3/2)-S_g(0)
=-[\mathcal K(3/2)-\mathcal K(0)]=\frac{11\pi f}{4}.
$$

ここでは $S_g$ は参照状態との差の幾何摂動部分を表し、絶対的な重力エントロピーとは区別しています。

**2. 外部項。** [自然対数の相対エントロピー恒等式](#def-bht22-modular-energy)は

$$
\Delta_\sigma S_{\rm out}(v)
=\Delta_\sigma\langle K_v\rangle-D_v.
$$

ゆえに二切断面の差は

$$
\begin{aligned}
\Delta_\sigma S_{\rm out}(3/2)-\Delta_\sigma S_{\rm out}(0)
&=[\mathcal K(3/2)-a]-[\mathcal K(0)-2a]\\
&=-\frac{11\pi f}{4}+a.
\end{aligned}
$$

単独の外部エントロピー差は負にもなり得ます。

**3. 和と射程。** 重力項と外部項を足し、

$$
\Delta S_{\rm gen}
=\frac{11\pi f}{4}
 +\left(-\frac{11\pi f}{4}+a\right)
=a>0.
$$

一般式では $D_{v_1}-D_{v_2}=a$ に等しいので、[データ処理による単調性](../../../応用系/QINF/QINF20/index.md#thm-qinf20-dpi)と一致します。ただし $F$ は応力テンソルの**期待値差**しか与えず、量子状態の相関を含む $D_v$ をそれだけから決定できません。問題文の $D_{v_i}$ は追加データであり、実在する同一量子状態から得られるには整合性の確認が必要です。またRindler真空のモジュラー表示と未来の定常条件を外した動的時空・高階曲率重力へ、同じ式を無条件に延長できません。
<!-- solution-end -->

## 8. まとめと次講への橋

1. GSLは[切断面ごとの繰り込まれた一般化エントロピー](../BHT21/index.md#def-bht21-generalized-entropy)の非減少という、条件付きの主張です。面積の古典的非減少とは別の法則です。
2. 単純な箱の投下では $\Delta S_{\rm gen}\simeq\beta_HE_\infty-S_{\rm box}$。近地平線の赤方偏移は $2\pi\ell E_{\rm loc}$ を与えますが、これだけでエントロピー境界は証明されません。
3. 独立な熱型ボース出射モードでは $s(n)-\beta_H\omega n\ge0$ を直接検算できます。しかし放射全体の相関・逆作用を含む一般GSLではありません。
4. 相対エントロピーが切断面を未来へ進めて**減少**し、面積応答とモジュラー項が相殺する条件が揃うと、一般化エントロピーは**増加**します。

次講 **BHT23「Bekenstein boundと限界」** では、落下箱の議論で現れた $S\le2\pi ER$ の成立条件、熱的浮力、弱重力・有限サイズという適用範囲を改めて精査します。

### さらに学ぶための一次資料

- A. C. Wall, [*A proof of the generalized second law for rapidly changing fields and arbitrary horizon slices*](https://arxiv.org/abs/1105.3445)（2011）：因果的地平線上の量子場の性質を仮定して、切断面ごとの半古典GSLを証明する。
- A. C. Wall, [*Proof of the generalized second law for rapidly evolving Rindler horizons*](https://doi.org/10.1103/PhysRevD.82.124019)（2010）：Rindler地平線における相対エントロピー型証明。
- W. G. Unruh and R. M. Wald, [*Acceleration radiation and the generalized second law of thermodynamics*](https://doi.org/10.1103/PhysRevD.25.942)（1982）：箱を下ろす際の加速放射・熱的浮力とGSLの関係。
- W. G. Unruh and R. M. Wald, [*Entropy bounds, acceleration radiation, and the generalized second law*](https://doi.org/10.1103/PhysRevD.27.2271)（1983）：浮力とエントロピー収支の追加条件を検討する。
