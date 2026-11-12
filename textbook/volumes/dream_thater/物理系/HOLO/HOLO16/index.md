# HOLO16 BTZ・熱場二重状態

[HOLO15の正準熱状態](../HOLO15/index.md#def-holo15-thermal-state)では、片側の境界CFTの熱分配関数を重力サドルへ結び付けました。しかし、熱密度行列は混合状態です。**純粋な二境界状態から片側の熱状態を作れるでしょうか。** また、二つの境界を結ぶ空間的な橋は、量子情報や信号を自由に渡せる通路なのでしょうか。

この講義では、有限次元でも厳密に証明できる**二体系の純粋状態による熱状態の表現**と、三次元の**非回転BTZブラックホール**を対応させます。その片側縮約と二側相関は量子論として導出し、BTZの温度・エネルギー・地平線エントロピーは計量から検算します。二境界幾何とTFDの同一視は、制御されたAdS/CFT辞書および半古典サドルという**追加の仮定**の下で述べます。量子状態の恒等式だけからEinstein方程式が証明されるわけではありません。

## 0. 対象・単位・時間の向きを固定する

バルクは三次元の純Einstein重力、負の宇宙定数 $\Lambda=-1/L^2$、Newton定数 $G_3>0$、半径 $L>0$ とします。$\hbar=c_{\rm light}=k_B=1$、Lorentz符号 $(-,+,+)$、角座標 $\phi\sim\phi+2\pi$、電荷・角運動量は零です。$c_{\rm CFT}>0$ は**境界二次元CFTの左・右それぞれのVirasoro中央電荷**とし、光速 $c_{\rm light}$ と区別します。

境界代表計量は円筒

$$
ds_{\partial}^2=-dt^2+L^2d\phi^2
$$

を選びます。従って空間円周は $2\pi L$、逆温度 $\beta>0$ はこの $t$ に共役です。$S^1_\beta\times S^1_{2\pi L}$ はEuclid境界の**一つのトーラス**であり、二境界とは異なる概念です。二つの境界が現れるのは、非回転BTZのLorentz時空を**最大解析拡張した**ときです。

量子系では、まず有限次元のHilbert空間 $\mathcal H$、自己共役 $H$、エネルギー固有基底 $\{|n\rangle\}$ を考えます。その後、可算スペクトルで $0<Z(\beta)=\operatorname{Tr}e^{-\beta H}<\infty$ が成り立つ場合にも同じノルム収束の構成を使います。局所QFT一般に自動的に跡クラス性やHilbert空間の単純な左右分解を仮定しません。熱的な[跡とEuclid時間円](../HOLO15/index.md#def-holo15-thermal-state)を使います。

## 1. 一境界の熱状態を二境界の純粋状態にする

単一の境界系に熱状態 $\rho_\beta=e^{-\beta H}/Z$ を置くと、密度行列は通常 $\rho_\beta^2\ne\rho_\beta$ です。これを純粋状態の部分系として表現するには、同じエネルギー準位を持つ補助系 $\mathcal H_L$ を導入します。縮約には[QINF3で定義した部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)を使います。左の正規直交基底 $|k\rangle_L$ ごとに全体の演算子を左右から $({}_L\langle k|\otimes I_R)$ と $(|k\rangle_L\otimes I_R)$ で挟み、その結果を $k$ について足す操作です。単に左側のケットを消すのではありません。**左と右の準位が同じ**になるように重ねることが鍵になります。

エネルギーが縮退すると、同じ固有値に属する基底を取り替えられます。右基底を $|n\rangle'_R=\sum_m U_{mn}|m\rangle_R$ とユニタリ行列 $U$ で取り替えるなら、左基底は $|n\rangle'_L=\sum_m\overline{U_{mn}}|m\rangle_L$ と**係数を複素共役にして**取り替えます。この対応を反線形共役な対応と呼びます。同じエネルギーの固有空間内での変換なら

$$
\sum_n |n\rangle'_L\otimes|n\rangle'_R
=\sum_{m,k}\left(\sum_n\overline{U_{mn}}U_{kn}\right)|m\rangle_L\otimes|k\rangle_R
=\sum_m|m\rangle_L\otimes|m\rangle_R
$$

です。二番目の等号は $UU^\dagger=I$ によります。したがって縮退空間内の基底変更は、左右を共役に対応させればTFDを変えません。

<a id="def-holo16-tfd"></a>

<!-- formal-statement-start -->
> **定義（熱場二重状態）**  
> $\mathcal H_R$ 上の自己共役Hamiltonian $H_R$ が固有基底 $|n\rangle_R$、固有値 $E_n$ を持ち、$0<Z(\beta)=\sum_n e^{-\beta E_n}<\infty$ とする。これと同型な左側 $\mathcal H_L$ の対応基底を $|n\rangle_L$ と選ぶ。二体系のベクトル
>
$$
|\mathrm{TFD}_\beta\rangle
=Z(\beta)^{-1/2}\sum_n e^{-\beta E_n/2}
|n\rangle_L\otimes|n\rangle_R
$$
>
> を、この固有基底の対応についての熱場二重状態（TFD）と呼ぶ。縮退準位の基底選択を変えるときは左側を反線形共役な対応基底として扱えば、同じ純粋状態を表せる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo16-tfd -->
**定義の確認**：右側の正規直交基底 $|0\rangle_R,|1\rangle_R$ に対して $H_R|0\rangle_R=0$、$H_R|1\rangle_R=\varepsilon|1\rangle_R$（$\varepsilon>0$）とします。この作用を基底の順 $(|0\rangle_R,|1\rangle_R)$ で表した行列が $H_R=\operatorname{diag}(0,\varepsilon)$ です。固有値が実数なので $H_R$ は自己共役であり、[熱重みの固有基底計算](../HOLO15/index.md#def-holo15-thermal-state)と同じく $e^{-\beta H_R}|j\rangle_R=e^{-\beta E_j}|j\rangle_R$ です。左右にこの基底を対応させ、$\beta>0$ と $q=e^{-\beta\varepsilon}\in(0,1)$ を取れば、$Z=e^{-\beta\cdot0}+e^{-\beta\varepsilon}=1+q$ は正で有限です。定義の係数 $e^{-\beta E_j/2}/\sqrt Z$ を各基底対に掛けると

$$
|\mathrm{TFD}_\beta\rangle
=\frac{|0_L0_R\rangle+\sqrt q\,|1_L1_R\rangle}{\sqrt{1+q}}.
$$

左右の直交規格化基底について交差項は零なので、ノルムの二乗は $(1+q)/(1+q)=1$。右側だけに作用する観測量 $A_R$ の期待値は

$$
\langle\mathrm{TFD}|(I_L\otimes A_R)|\mathrm{TFD}\rangle
=\frac{\langle0|A_R|0\rangle+q\langle1|A_R|1\rangle}{1+q}
$$

です。これは右の熱密度行列の対角重みそのものです。右側の非対角成分についても次の命題で確認します。
<!-- definition-example-end -->

右側の混合度は[QINF17のvon Neumannエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)で測ります。QINF17は底2で定義しましたが、本章の熱力学との整合のために自然対数に換算し、$S_{\rm nat}=(\ln2)S_{\rm bit}$ とします。

<a id="prop-holo16-partial-trace"></a>

<!-- formal-statement-start -->
> **命題（TFDの片側縮約とエントロピー）**  
> 上のTFDが定義されるとき、左側の部分跡を取った右側密度行列は
>
$$
\rho_R=\operatorname{Tr}_L|\mathrm{TFD}_\beta\rangle
\langle\mathrm{TFD}_\beta|
=\frac{e^{-\beta H_R}}{Z(\beta)}.
$$
>
> 右側のvon Neumannエントロピーが有限であれば
>
$$
S(\rho_R)=-\operatorname{Tr}(\rho_R\log\rho_R)
=\log Z(\beta)+\beta E_\beta,\quad
E_\beta=\operatorname{Tr}(\rho_R H_R).
$$
>
> TFD全体の密度行列は階数1の射影なので、そのvon Neumannエントロピーは零である。
<!-- formal-statement-end -->

### 証明の見取り図

左右の密度演算子の基底表示を先に書き、左成分 $\langle m|n\rangle_L=\delta_{mn}$ を使います。**相関を消す操作**であって、単に片側のケットを削除する操作ではありません。エントロピーは熱状態の固有値 $p_n=e^{-\beta E_n}/Z$ から直接計算します。

<!-- proof-start -->
### 証明

TFDの射影を展開すると

$$
|\mathrm{TFD}\rangle\langle\mathrm{TFD}|
=\frac1Z\sum_{n,m}e^{-\beta(E_n+E_m)/2}
|n\rangle_L\langle m|\otimes|n\rangle_R\langle m|.
$$

[部分トレースの定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)に従い、左の固有基底で取ると

$$
\operatorname{Tr}_L(|n\rangle_L\langle m|)
=\sum_k\langle k|n\rangle\langle m|k\rangle
=\delta_{mn}.
$$

したがって

$$
\rho_R=\frac1Z\sum_ne^{-\beta E_n}|n\rangle_R\langle n|
=Z^{-1}e^{-\beta H_R}.
$$

これより $p_n=e^{-\beta E_n}/Z$ かつ $\log p_n=-\beta E_n-\log Z$ なので

$$
-\sum_np_n\log p_n
=\beta\sum_np_n E_n+(\log Z)\sum_np_n
=\beta E_\beta+\log Z.
$$

一方、ノルム1のベクトルの射影 $P=|\mathrm{TFD}\rangle\langle\mathrm{TFD}|$ は $P^2=P$ で、固有値は1が1個と残りの0だけです。従って $S(P)=0$。無限次元の場合、エネルギー期待値やエントロピーの有限性は別途必要です。$\square$
<!-- proof-end -->

この命題は量子力学の恒等式です。**熱的な片側と純粋な全体は両立します**。ただし、これだけでは時空に橋があると結論できません。橋の描像には次の重力サドルが必要です。

## 2. 非回転BTZの地平線から温度を求める

四次元Schwarzschild–AdSを扱った[HOLO15のブラックホール](../HOLO15/index.md#prop-holo15-boundary-phase)とは、今度は**三次元**なので球面ではなく円が地平線になります。中心の特異な曲率ではなく、大域的な同一視と地平線構造がBTZを特徴づけます。局所的な外部は負の定曲率を持ちます。

<a id="def-holo16-btz"></a>

<!-- formal-statement-start -->
> **定義（非回転BTZ外部領域）**  
> $L,G_3,r_+>0$、$\phi\sim\phi+2\pi$ を固定する。$r>r_+$ におけるLorentz計量
>
$$
ds^2=-f(r)dt^2+\frac{dr^2}{f(r)}+r^2d\phi^2,
\qquad f(r)=\frac{r^2-r_+^2}{L^2}
$$
>
> を非回転BTZ外部領域と呼び、$f(r_+)=0$ の円を地平線とする。標準の漸近AdSエネルギー規約で質量パラメータを $M=r_+^2/(8G_3L^2)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo16-btz -->
**定義の確認**：$r_+=L$ と取れば $f(r)=r^2/L^2-1$ で、$r>L$ では $f>0$。計量行列は座標基底 $(\partial_t,\partial_r,\partial_\phi)$ で $\operatorname{diag}(-f,1/f,r^2)$ です。これは表示した $dt^2,dr^2,d\phi^2$ の係数を並べたもので、交差成分 $g_{t\phi}=0$ が**非回転**の仮定に対応します。$g_{tt}=-f<0$、$g_{rr}=1/f>0$、$g_{\phi\phi}=r^2>0$ だからLorentz符号は $(-,+,+)$ です。

$r=L$ では $f=0$、$\partial_t$ のノルム $g(\partial_t,\partial_t)=-f$ が零に近づき、$r=\text{const.}$ 面の法線 $dr$ のノルムも $g^{rr}=f\to0$ です。従ってこの円は外部座標の地平線候補であり、座標の発散が実際の特異点でないことは第4節のKruskal表示で確かめます。円周は $\phi$ の周期 $2\pi$ と誘導計量 $L^2d\phi^2$ から $2\pi L$。大半径で $ds^2$ を $L^2/r^2$ 倍すると、境界方向は $-dt^2+L^2d\phi^2$ となり、第0節の時間規格化と一致します。
<!-- definition-example-end -->

<a id="prop-holo16-btz-thermo"></a>

<!-- formal-statement-start -->
> **命題（非回転BTZの温度と熱力学）**  
> 上記のBTZ外部がEuclid地平線で滑らかな充填を持つとする。地平線での正則性、Einstein重力の地平線エントロピー公式、および標準の漸近AdSエネルギー規格化を用いれば
>
$$
\beta=\frac{2\pi L^2}{r_+},\qquad
T=\frac{r_+}{2\pi L^2},\qquad
S_{\rm BH}=\frac{\pi r_+}{2G_3},
$$
>
$$
M=\frac{r_+^2}{8G_3L^2},\qquad
F_{\rm BTZ}=M-TS_{\rm BH}=-M,\qquad
dM=T\,dS_{\rm BH}
$$
>
> が成立する。$F$ はBTZ枝の規約上の値であり、熱的AdSを参照した**相対自由エネルギー**とは区別する。
<!-- formal-statement-end -->

### 証明の見取り図

地平線の近くでEuclid計量の $(\tau,r)$ 面を極座標に変換し、角度の周期 $2\pi$ を要求します。これは温度の独立な検算です。地平線の「面積」は三次元では円周であり、半径を掛ける因子を四次元の球面積と取り違えないようにします。

<!-- proof-start -->
### 証明

$t=-i\tau$ とおくと、Euclid計量の二次元部分は $f\,d\tau^2+dr^2/f$。$r=r_++x$、$x>0$ が小さいとき、$f(r)=f'(r_+)x+O(x^2)$、$f'(r_+)=2r_+/L^2$ です。新しい半径座標を

$$
\rho=2\sqrt{\frac{x}{f'(r_+)}}\,,\qquad
x=\frac{f'(r_+)}4\rho^2
$$

とすると $dx=(f'(r_+)/2)\rho\,d\rho$ だから先頭項は

$$
f\,d\tau^2+\frac{dx^2}{f}
=d\rho^2+
\left(\frac{f'(r_+)}2\right)^2\rho^2d\tau^2+O(\rho^2)d\rho^2+O(\rho^4)d\tau^2.
$$

原点の円錐特異点を避けるため、角 $\theta=f'(r_+)\tau/2$ の周期を $2\pi$ として

$$
\beta=\frac{4\pi}{f'(r_+)}=\frac{2\pi L^2}{r_+},\qquad
T=\beta^{-1}.
$$

地平線円周 $A_H=2\pi r_+$ を[Einstein重力のBekenstein–Hawkingエントロピー](../../BHT/BHT16/index.md#prop-bht16-ads-state)と同じ $A_H/(4G_3)$ という次元に依存しない形式へ代入して $S_{\rm BH}=\pi r_+/(2G_3)$ を得ます。標準質量規約を用いて

$$
TS_{\rm BH}
=\frac{r_+}{2\pi L^2}\frac{\pi r_+}{2G_3}
=\frac{r_+^2}{4G_3L^2}=2M,
\qquad F=M-TS_{\rm BH}=-M.
$$

最後に $L,G_3$ を固定して

$$
\frac{dM}{dr_+}=\frac{r_+}{4G_3L^2},\qquad
T\frac{dS_{\rm BH}}{dr_+}
=\frac{r_+}{2\pi L^2}\frac{\pi}{2G_3}
=\frac{r_+}{4G_3L^2}.
$$

よって第一法則も一致します。$\square$
<!-- proof-end -->

特に $r_+=L$ の代入結果は

$$
\beta=2\pi L,\qquad M=\frac1{8G_3},\qquad
S_{\rm BH}=\frac{\pi L}{2G_3},\qquad F=-\frac1{8G_3}
$$

です。**BTZ質量零の状態とglobal AdS真空は同一ではありません。** global AdS$_3$ の真空エネルギーは同じ規約で $-1/(8G_3)$ です。

## 3. 境界CFTの温度・円周とBTZを合わせる

[HOLO13で得たBrown–Henneaux関係](../HOLO13/index.md#prop-holo13-brown-henneaux)は三次元の漸近AdS Einstein重力に対し

$$
c_{\rm CFT}=\frac{3L}{2G_3}
$$

です。これを使うには、**二次元の左右対称なCFT**で、空間円周が $2\pi L$、十分高温で真空がモジュラー変換後の分配関数を支配する条件が必要です。一般のCFTの任意の温度や任意の状態で単一BTZサドルが支配するとは言いません。

以下の $\partial_\beta$ は、円周 $2\pi L$、中央電荷 $c_{\rm CFT}$（重力側では $L,G_3$）を固定して**逆温度 $\beta$ のみ**を微分する演算です。この一変数での微分は $d/d\beta$ と同じであり、$r_+$ を動かす前節の $dM/dr_+$ とは変数が異なります。

<a id="prop-holo16-cft-matching"></a>

<!-- formal-statement-start -->
> **命題（高温CFTとBTZの条件付き一致）**  
> 空間円周 $2\pi L$ のユニタリな二次元CFTで、左右中央電荷が $c_{\rm CFT}=3L/(2G_3)$、適切なモジュラー不変性と低温での真空優勢を仮定する。$\beta/L$ が十分小さく、その近似を重力の半古典極限でも制御できるなら、高温分配関数の先頭は
>
$$
\log Z_{\rm CFT}(\beta)\simeq\frac{\pi^2 c_{\rm CFT}L}{3\beta}
=\frac{\pi^2L^2}{2G_3\beta}.
$$
>
> その温度微分から得る $E,S,F$ の先頭は $r_+=2\pi L^2/\beta$ と置いた非回転BTZの $M,S_{\rm BH},F_{\rm BTZ}$ に一致する。等号は先頭サドルの比較であり、有限中央電荷での厳密な分配関数の同一性を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

低温側では、真空エネルギーの分配関数への寄与は $e^{-\beta E_0}$。モジュラー変換が逆温度を $\beta'=4\pi^2L^2/\beta$ に変えるため、高温の $\log Z$ を求められます。そこで $-\partial_\beta\log Z$ と $(1-\beta\partial_\beta)\log Z$ を実際に微分し、BTZとの一致を確かめます。

<!-- proof-start -->
### 証明

円周 $2\pi L$ 上の左右対称CFTの真空エネルギーは $E_0=-c_{\rm CFT}/(12L)$ です。低温 $\beta'\gg L$ で真空が支配するなら

$$
\log Z(\beta')\simeq-\beta'E_0=\frac{\beta' c_{\rm CFT}}{12L}.
$$

モジュラー不変性の $S$ 変換で $\beta'=4\pi^2L^2/\beta$ とすると

$$
\log Z(\beta)\simeq
\frac{4\pi^2L^2}{\beta}\frac{c_{\rm CFT}}{12L}
=\frac{\pi^2c_{\rm CFT}L}{3\beta}.
$$

ここで $A=\pi^2c_{\rm CFT}L/3$ と置けば $\log Z\simeq A/\beta$ ですから

$$
E=-\partial_\beta\log Z\simeq\frac A{\beta^2},\qquad
S=\log Z+\beta E\simeq\frac{2A}{\beta},\qquad
F=-\beta^{-1}\log Z\simeq-\frac A{\beta^2}.
$$

$c_{\rm CFT}=3L/(2G_3)$ を代入して $A=\pi^2L^2/(2G_3)$。一方 $\beta=2\pi L^2/r_+$ だから

$$
M=\frac{(2\pi L^2/\beta)^2}{8G_3L^2}
=\frac{\pi^2L^2}{2G_3\beta^2},\quad
S_{\rm BH}=\frac{\pi(2\pi L^2/\beta)}{2G_3}
=\frac{\pi^2L^2}{G_3\beta},\quad
F_{\rm BTZ}=-M.
$$

三つがそれぞれ一致します。$\square$
<!-- proof-end -->

**同じ境界トーラスのもう一つの充填**は熱的global AdS$_3$ です。真空エネルギーとBTZの古典自由エネルギーは

$$
F_{\rm AdS}^{\rm(cl)}=-\frac{c_{\rm CFT}}{12L}=-\frac1{8G_3},
\qquad
F_{\rm BTZ}^{\rm(cl)}=-\frac{\pi^2L^2}{2G_3\beta^2}
$$

です。二つの値を等置して $1/(8G_3)=\pi^2L^2/(2G_3\beta^2)$ と解くと、$\beta>0$ より交差点は $\beta=2\pi L$ です。これは[BHTとHOLO15の熱サドル比較](../HOLO15/index.md#prop-holo15-free-energy-dictionary)と同じ考え方ですが、**次元と温度式は異なります**。前因子や他の鞍点を含む厳密な分配関数に鋭い相転移を証明したわけではありません。

## 4. 二つの境界とEinstein–Rosen橋

BTZの外部座標 $r>r_+$ は境界を一つしか表示しません。最大拡張のもう一つの外部領域には**別の漸近AdS境界**があります。二境界のTFDは、Euclid時間の**半円筒**を用いた状態準備から動機づけられます。具体的には長さ $\beta/2$ のEuclid時間進化で左右境界の波動汎関数に $e^{-\beta E_n/2}$ を付け、上下端を各一境界の状態とみなします。一方、全円周 $\beta$ を閉じた跡は一境界の $Z$ です。Euclid BTZの境界トーラス自体が二つの境界へ分裂するわけではありません。

時刻 $t=0$ の左右を対称に通る空間断面では、外部の誘導計量は $dr^2/f+r^2d\phi^2$ です。地平線で $1/f$ が発散しても、**空間の固有距離が無限になるわけではありません**。固有距離座標でつなぐと橋の最小円周が見えます。

<a id="prop-holo16-bridge"></a>

<!-- formal-statement-start -->
> **命題（時間対称BTZ断面の橋）**  
> 非回転BTZの最大拡張における時間対称な二境界断面を考える。外部計量の $t=0$ 誘導計量に対し、符号付き固有距離 $\ell\in\mathbb R$ を地平線で $\ell=0$ となるように取ると
>
$$
r(\ell)=r_+\cosh(\ell/L),\qquad
ds_{\rm slice}^2=d\ell^2+
r_+^2\cosh^2(\ell/L)d\phi^2.
$$
>
> $\ell\to\pm\infty$ はそれぞれ異なる外部境界へ向かい、$\ell=0$ の最小円周は $2\pi r_+$ である。ただしこの空間的な連結性から、二境界間の未来向き因果曲線が存在するとは結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

固有距離は $d\ell=dr/\sqrt{f(r)}$。これを積分して $r$ を $\ell$ の関数に直すと、地平線の座標発散が消えます。$\ell$ の正負を許すことが、左右二つの外部をつなぐ延長に当たります。

<!-- proof-start -->
### 証明

外部で $dr/d\ell=\sqrt{r^2-r_+^2}/L$。従って

$$
\frac{d\ell}{L}=\frac{dr}{\sqrt{r^2-r_+^2}},\qquad
\frac{\ell}{L}=\operatorname{arcosh}(r/r_+)\quad(\ell\ge0)
$$

を得ます。これは $r=r_+\cosh(\ell/L)$ と同値です。負の $\ell$ に偶関数として滑らかに延長すると

$$
\frac{dr}{d\ell}=\frac{r_+}{L}\sinh(\ell/L),\qquad
\frac{dr^2}{f(r)}
=\frac{r_+^2\sinh^2(\ell/L)d\ell^2/L^2}
{r_+^2\sinh^2(\ell/L)/L^2}=d\ell^2
$$

となり、$\ell=0$ でも連続延長で正則です。角方向は $r^2d\phi^2$ を代入すれば主張の計量です。$\cosh(\ell/L)\ge1$ より円周は $\ell=0$ で最小。$\ell\to\pm\infty$ では $r\to\infty$ です。$\square$
<!-- proof-end -->

**因果的には通れません。** 外部における亀座標とKruskal座標を

$$
r_*=\frac{L^2}{2r_+}\log\frac{r-r_+}{r+r_+},\qquad
\kappa=\frac{r_+}{L^2},\qquad
U=-e^{-\kappa(t-r_*)},\quad
V=e^{\kappa(t+r_*)}
$$

と置きます。右外部は $U<0,V>0$。解析延長した左外部は $U>0,V<0$ です。計量は

$$
ds^2=-\frac{4L^2}{(1+UV)^2}\,dU\,dV+
r_+^2\left(\frac{1-UV}{1+UV}\right)^2d\phi^2
$$

となります。ここで $dU\,dV$ は対称化した交差項を表します。因果接ベクトル $(\dot U,\dot V,\dot\phi)$ では $ds^2(\dot\gamma,\dot\gamma)\le0$ なので、$1+UV>0$ の領域では

$$
\frac{4L^2}{(1+UV)^2}\dot U\dot V
\ge r^2\dot\phi^2\ge0.
$$

従って $\dot U,\dot V$ は同符号（または一方が零）です。右外部の未来向き静的時間並進は、$U<0,V>0$ において $\partial_tU=-\kappa U>0$、$\partial_tV=\kappa V>0$ を満たします。この未来円錐を連続に延長すると、未来向き因果曲線では $\dot U\ge0,\dot V\ge0$ です。右から左へ行くには $V>0$ から $V<0$ へ減らさなければならず不可能です。従ってTFDの相関や空間橋は、**可通行なワームホールや超光速通信を意味しません**。このKruskal計算はLevel Cでも再構成します。

## 5. 両側相関は片側の熱的相関とどう違うか

片側の熱的期待値は $\rho_R$ で計算できますが、左右の演算子の積の期待値には純粋なTFD全体が必要です。左右のエネルギー固有基底の対応を固定し、右のHermitian演算子 $O=O^\dagger$ の行列要素を $O_{mn}={}_R\langle m|O|n\rangle_R$ とします。右の基底表示と**転置で定める**左演算子の基底表示は

$$
O_R=\sum_{m,n}O_{mn}|m\rangle_R\langle n|,\qquad
O_L=O^{\mathsf T}=\sum_{m,n}O_{nm}|m\rangle_L\langle n|.
$$

すなわち左の $(m,n)$ 成分には右の $(n,m)$ 成分を置きます。Hermitian性から $O_{nm}=\overline{O_{mn}}$ なので、後の二側相関で二つの行列要素の積は $|O_{mn}|^2$ になります。**転置は定めた基底で行い**、空間反転や「左側の時間の逆向き」と同じ演算ではありません。

<a id="prop-holo16-two-sided-correlator"></a>

<!-- formal-statement-start -->
> **命題（TFDの二側相関と熱的解析接続）**  
> 有限次元の二体系で $H_L,H_R$ が同一のエネルギー $E_n$ を持ち、$O_R=O=O^\dagger$、$O_L=O^{\mathsf T}$ とする。各側で $O_s(t)=e^{iH_st}O_se^{-iH_st}$ と定めれば
>
$$
C_{LR}(t_L,t_R)=
\langle\mathrm{TFD}|O_L(t_L)\otimes O_R(t_R)|\mathrm{TFD}\rangle
=\frac1Z\sum_{m,n}e^{-\beta(E_m+E_n)/2}
e^{i(E_m-E_n)(t_L+t_R)}|O_{mn}|^2.
$$
>
> さらに $C_{RR}(t)=\operatorname{Tr}[\rho_R O_R(t)O_R(0)]$ とすると
>
$$
C_{LR}(t_L,t_R)=C_{RR}(t_L+t_R-i\beta/2).
$$
>
> 解析接続は有限次元では全複素時刻で定義できるが、一般のQFTでは相関関数の解析領域・演算子の定義域を別途確認する必要がある。
<!-- formal-statement-end -->

### 証明の見取り図

行列要素で指数の重みを並べます。熱的相関のBoltzmann重み $e^{-\beta E_m}$ とTFDの左右それぞれ半分ずつの重みとの差が、虚時間 $-i\beta/2$ のずれに対応します。**符号は必ず直接代入して検算**します。

<!-- proof-start -->
### 証明

定義の基底で

$$
\langle m|O_L(t_L)|n\rangle
=e^{i(E_m-E_n)t_L}O_{nm},\qquad
\langle m|O_R(t_R)|n\rangle
=e^{i(E_m-E_n)t_R}O_{mn}.
$$

これをTFDの左右の和に代入すると、係数は $Z^{-1}e^{-\beta(E_m+E_n)/2}$、行列要素の積はHermitian性により $O_{nm}O_{mn}=|O_{mn}|^2$ です。最初の式を得ます。

一方、熱的相関を跡で展開すると

$$
C_{RR}(t)=\frac1Z\sum_{m,n}e^{-\beta E_m}
e^{i(E_m-E_n)t}|O_{mn}|^2.
$$

$t=t_L+t_R-i\beta/2$ を代入した指数の因子は

$$
e^{i(E_m-E_n)t}
=e^{i(E_m-E_n)(t_L+t_R)}
e^{+\beta(E_m-E_n)/2}.
$$

従って

$$
e^{-\beta E_m}e^{+\beta(E_m-E_n)/2}
=e^{-\beta(E_m+E_n)/2}.
$$

両者は項ごとに一致します。$\square$
<!-- proof-end -->

この式は、熱的な片側とエンタングルした両側の**観測可能な相関**の接点です。ただし、二側相関が非零であるという事実は、どちらかの側が局所操作で相手へ信号を送れることを示しません。左側への局所的なトレース保存操作では、右側の縮約密度行列は変わらないからです。

**時間の注意**：TFDは同じエネルギーの左右ペアからなるので

$$
(I_L\otimes H_R-H_L\otimes I_R)|\mathrm{TFD}\rangle=0.
$$

ここで二体系の生成子を $H_R-H_L:=I_L\otimes H_R-H_L\otimes I_R$ と略記すれば、$e^{-is(H_R-H_L)}|\mathrm{TFD}\rangle=|\mathrm{TFD}\rangle$ です。一方、左右それぞれの未来向き物理時間を同符号で進める $H_L+H_R$ では一般に位相が変わります。二境界BTZのグローバルな静的Killing時間は右では未来向き、左では過去向きに作用し、生成子の符号差と整合します。左右の**局所的な未来時間** $t_L,t_R$ をグローバルKilling時間と混ぜないことが重要です。

## 6. 対応するもの・対応しないもの

| 境界の量子論 | 半古典重力の描像 | 成立に必要な入力 |
| --- | --- | --- |
| $\rho_R=e^{-\beta H_R}/Z$ | 右外部から見た定常熱状態 | CFTの熱平衡、適切な重力双対 |
| 純粋な $|\mathrm{TFD}\rangle_{LR}$ | 永遠BTZの二境界最大拡張 | 半円筒の状態準備と支配する重力サドル |
| $S(\rho_R)=\beta E+\log Z$ | 地平線円周 $/(4G_3)$ の先頭値 | 半古典・高温近似と中央電荷の対応 |
| $C_{LR}$ の非零性 | 二外部間の相関 | 演算子辞書・近似と解析領域 |
| 二側の空間橋 | 非可通行なEinstein–Rosen橋 | 時間対称断面・Lorentz因果構造 |

TFDは**永遠ブラックホールの二境界模型**です。形成や蒸発、有限時間での情報回収、片側だけの実在するブラックホールの完全な内部復元を、ここでの恒等式から結論してはなりません。また $S_{\rm BH}$ との一致は古典先頭値であり、バルク量子場のエントロピーや量子極値曲面の議論は後続講義で条件付きに扱います。

## 7. 演習（全問に詳細解答）

<a id="ex-holo16-a1"></a>

### A1. 二準位TFDの規格化と片側縮約
- Level: A

**問題**：$H=\operatorname{diag}(0,\varepsilon)$、$q=e^{-\beta\varepsilon}$、$\varepsilon,\beta>0$ に対し、TFDを作ってノルムと右側密度行列を計算せよ。

<!-- solution-start -->
**詳細解答**：[TFDの定義](#def-holo16-tfd)に代入すると $Z=1+q$、

$$
|\mathrm{TFD}\rangle=\frac{|00\rangle+\sqrt q\,|11\rangle}{\sqrt{1+q}}.
$$

内積では $\langle00|11\rangle=0$ なのでノルム二乗は $(1+q)/(1+q)=1$。射影の交差項 $|00\rangle\langle11|$ を左の基底で部分跡すると $\operatorname{Tr}_L(|0\rangle\langle1|)=0$。よって

$$
\rho_R=\frac{|0\rangle\langle0|+q|1\rangle\langle1|}{1+q}
=\frac{e^{-\beta H}}{Z}.
$$

非対角項が消えるのは**部分跡**によるもので、TFD全体が混合状態になるからではありません。
<!-- solution-end -->

<a id="ex-holo16-a2"></a>

### A2. 温度は円錐の角度から
- Level: A

**問題**：$f=(r^2-r_+^2)/L^2$ について $f'(r_+)$ を求め、Euclid地平線の正則周期 $\beta=4\pi/f'(r_+)$ に代入せよ。

<!-- solution-start -->
**詳細解答**：$df/dr=2r/L^2$ だから $f'(r_+)=2r_+/L^2>0$。近傍 $r=r_++x$ では $f\simeq(2r_+/L^2)x$、$\rho=2\sqrt{x/f'(r_+)}$ と置くと二次元計量は $d\rho^2+[f'(r_+)/2]^2\rho^2d\tau^2$。角の周期 $2\pi$ から

$$
\beta=\frac{4\pi}{2r_+/L^2}=\frac{2\pi L^2}{r_+},\qquad T=\frac{r_+}{2\pi L^2}.
$$

$\beta$ を任意にすると原点に円錐特異点を作ってしまいます。
<!-- solution-end -->

<a id="ex-holo16-a3"></a>

### A3. BTZの第一法則
- Level: A

**問題**：$M=r_+^2/(8G_3L^2)$、$T=r_+/(2\pi L^2)$、$S=\pi r_+/(2G_3)$ から、$dM=T\,dS$ と $F=-M$ を示せ。

<!-- solution-start -->
**詳細解答**：$L,G_3$ を固定して

$$
dM=\frac{r_+}{4G_3L^2}\,dr_+,\qquad
T\,dS=\frac{r_+}{2\pi L^2}\frac{\pi}{2G_3}dr_+
=\frac{r_+}{4G_3L^2}dr_+.
$$

また $TS=r_+^2/(4G_3L^2)=2M$ なので $F=M-TS=-M$。これらは[BTZ熱力学命題](#prop-holo16-btz-thermo)と一致します。
<!-- solution-end -->

<a id="ex-holo16-a4"></a>

### A4. TFDの相対時間での不変性
- Level: A

**問題**：$H_L|n\rangle_L=E_n|n\rangle_L$、$H_R|n\rangle_R=E_n|n\rangle_R$ のとき $(H_R-H_L)|\mathrm{TFD}\rangle=0$ を項ごとに確認せよ。

<!-- solution-start -->
**詳細解答**：[TFD](#def-holo16-tfd) の各項に作用させると

$$
(H_R-H_L)(|n\rangle_L\otimes|n\rangle_R)
=(E_n-E_n)|n\rangle_L\otimes|n\rangle_R=0.
$$

重み $e^{-\beta E_n/2}/\sqrt Z$ を掛けて総和しても零です。対して和 $H_R+H_L$ の固有値は $2E_n$ なので、一般のTFDはその固有状態ではありません。
<!-- solution-end -->

<a id="ex-holo16-a5"></a>

### A5. 片側のエントロピーはゼロではない
- Level: A

**問題**：A1の二準位TFDについて $S(\rho_R)$ を $q$ で表示し、$\beta\to\infty$ と $\beta\to0^+$ の極限を求めよ。

<!-- solution-start -->
**詳細解答**：固有値は $p_0=1/(1+q)$、$p_1=q/(1+q)$ なので

$$
S=-p_0\log p_0-p_1\log p_1
=\log(1+q)-\frac{q}{1+q}\log q.
$$

$\beta\to\infty$ では $q\to0$、$q\log q\to0$ なので $S\to0$。$\beta\to0^+$ では $q\to1$ となり $S\to\log2$。TFD全体は純粋ですが、片側は高温で最大混合へ近づきます。
<!-- solution-end -->

<a id="ex-holo16-b1"></a>

### B1. 固有距離による橋の構成
- Level: B

**問題**：$t=0$ 断面の $d\ell=dr/\sqrt{f(r)}$ を積分し、$\ell\in\mathbb R$ での断面計量と最小円周を求めよ。

<!-- solution-start -->
**詳細解答**：$r\ge r_+$、$\ell\ge0$ で

$$
\ell=L\int_{r_+}^{r}\frac{du}{\sqrt{u^2-r_+^2}}
=L\operatorname{arcosh}(r/r_+).
$$

従って $r=r_+\cosh(\ell/L)$。負の $\ell$ に偶延長すると $\frac{dr}{d\ell}=\frac{r_+}{L}\sinh(\ell/L)$ であり

$$
\frac{dr^2}{f}
=\frac{(r_+^2/L^2)\sinh^2(\ell/L)}{(r_+^2/L^2)\sinh^2(\ell/L)}d\ell^2=d\ell^2.
$$

$\ell=0$ へは連続的に延長します。よって $ds^2=d\ell^2+r_+^2\cosh^2(\ell/L)d\phi^2$、円周 $2\pi r_+\cosh(\ell/L)$ は $\ell=0$ で $2\pi r_+$ が最小です。[橋の命題](#prop-holo16-bridge)の空間的連結性だけでは信号の可通行性は決まりません。
<!-- solution-end -->

<a id="ex-holo16-b2"></a>

### B2. 熱的AdSとBTZの交差温度
- Level: B

**問題**：$F_{\rm AdS}^{\rm(cl)}=-1/(8G_3)$ と $F_{\rm BTZ}^{\rm(cl)}=-\pi^2L^2/(2G_3\beta^2)$ を比較し、交差する逆温度、$r_+$、相対作用差 $\beta(F_{\rm BTZ}-F_{\rm AdS})$ の符号を求めよ。

<!-- solution-start -->
**詳細解答**：交差条件は

$$
\frac{\pi^2L^2}{2G_3\beta^2}=\frac1{8G_3}
\ \Longleftrightarrow\ 
\beta^2=4\pi^2L^2.
$$

$\beta>0$ より $\beta_{\rm HP}=2\pi L$。このとき $r_+=2\pi L^2/\beta=L$。相対自由エネルギーは

$$
F_{\rm BTZ}-F_{\rm AdS}
=\frac1{8G_3}-\frac{\pi^2L^2}{2G_3\beta^2}.
$$

$\beta<2\pi L$ で負、$\beta>2\pi L$ で正です。$\beta>0$ を掛けても作用差は同符号なので、高温でBTZの先頭指数が優勢です。有限 $G_3$ の完全な分配関数が非解析になるとまでは結論しません。
<!-- solution-end -->

<a id="ex-holo16-b3"></a>

### B3. 二準位系の両側相関
- Level: B

**問題**：二準位 $H=\operatorname{diag}(0,\varepsilon)$、$q=e^{-\beta\varepsilon}$、$O=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ とする。$C_{LR}(t_L,t_R)$ を直接計算し、$\beta\to\infty$ の極限を述べよ。

<!-- solution-start -->
**詳細解答**：[二側相関命題](#prop-holo16-two-sided-correlator)で非零行列要素は $(m,n)=(0,1),(1,0)$ の2組です。各重みは $e^{-\beta\varepsilon/2}=\sqrt q$、位相はそれぞれ $e^{-i\varepsilon(t_L+t_R)}$ と $e^{i\varepsilon(t_L+t_R)}$。従って

$$
C_{LR}(t_L,t_R)
=\frac{\sqrt q}{1+q}\left[e^{-i\varepsilon(t_L+t_R)}
+e^{i\varepsilon(t_L+t_R)}\right]
=\frac{2\sqrt q}{1+q}\cos(\varepsilon(t_L+t_R)).
$$

$\beta\to\infty$ で $q\to0$ だから相関は零に近づきます。これはこの特定の演算子が基底状態間で非対角なためで、一般の全演算子について相関が零になるという意味ではありません。
<!-- solution-end -->

<a id="ex-holo16-b4"></a>

### B4. 高温分配関数から三つの状態量を復元
- Level: B

**問題**：$\log Z(\beta)\simeq A/\beta$、$A=\pi^2 c_{\rm CFT}L/3$ とする。$E=-\partial_\beta\log Z$、$S=(1-\beta\partial_\beta)\log Z$、$F=-\beta^{-1}\log Z$ を計算し、$c_{\rm CFT}=3L/(2G_3)$、$r_+=2\pi L^2/\beta$ でBTZと一致することを確認せよ。

<!-- solution-start -->
**詳細解答**：$d(A/\beta)/d\beta=-A/\beta^2$ なので

$$
E\simeq\frac A{\beta^2},\qquad
S\simeq\frac A\beta-\beta\left(-\frac A{\beta^2}\right)
=\frac{2A}{\beta},\qquad
F\simeq-\frac A{\beta^2}.
$$

中央電荷を代入すると $A=\pi^2L^2/(2G_3)$。従って

$$
E=\frac{\pi^2L^2}{2G_3\beta^2}
=\frac{r_+^2}{8G_3L^2}=M,\qquad
S=\frac{\pi^2L^2}{G_3\beta}
=\frac{\pi r_+}{2G_3}=S_{\rm BH},\qquad F=-M.
$$

この一致は[高温CFTの条件](#prop-holo16-cft-matching)付きの先頭次数に限られます。
<!-- solution-end -->

<a id="ex-holo16-c1"></a>

### C1. Kruskal延長と非可通行性を一続きに検証
- Level: C

**問題**：$f(r)=(r^2-r_+^2)/L^2$、$\kappa=r_+/L^2$ とする。(i) $dr_*/dr=1/f$ を $r_*<0$ となる積分定数で解け。(ii) $U=-e^{-\kappa(t-r_*)}$、$V=e^{\kappa(t+r_*)}$ から $UV$ と $r(UV)$ を求めよ。(iii) $ds^2$ を $(U,V,\phi)$ へ直せ。(iv) 右外部 $U<0,V>0$ と左外部 $U>0,V<0$ を未来向き因果曲線が結べないことを、未来向き $dU,dV\ge0$ から説明せよ。

<!-- solution-start -->
**詳細解答**：(i) 因数分解 $r^2-r_+^2=(r-r_+)(r+r_+)$ を用いると

$$
\frac{dr_*}{dr}=\frac{L^2}{r^2-r_+^2}
=\frac{L^2}{2r_+}\left(\frac1{r-r_+}-\frac1{r+r_+}\right).
$$

無限遠で $r_*\to0$ と選べば

$$
r_*=\frac{L^2}{2r_+}\log\frac{r-r_+}{r+r_+}<0\quad(r>r_+).
$$

(ii) $UV=-e^{2\kappa r_*}=-(r-r_+)/(r+r_+)$。$x=UV$ と書いて $x(r+r_+)=-r+r_+$ を整理すると

$$
r(x)=r_+\frac{1-x}{1+x}.
$$

右外部では $-1<x<0$、地平線は $x=0$、漸近境界は $x\to-1$ です。

(iii) $u=t-r_*$、$v=t+r_*$ とすると $-fdt^2+dr^2/f=-f\,du\,dv$。微分は $du=-dU/(\kappa U)$、$dv=dV/(\kappa V)$ なので

$$
-f\,du\,dv=\frac f{\kappa^2UV}\,dU\,dV.
$$

また $r=r_+(1-x)/(1+x)$ から

$$
r^2-r_+^2
=\frac{r_+^2[(1-x)^2-(1+x)^2]}{(1+x)^2}
=-\frac{4r_+^2x}{(1+x)^2}.
$$

これらと $\kappa^2=r_+^2/L^4$ を代入すると

$$
ds^2=-\frac{4L^2}{(1+UV)^2}\,dU\,dV+
r_+^2\frac{(1-UV)^2}{(1+UV)^2}d\phi^2.
$$

(iv) 因果曲線の接ベクトルに計量を適用すれば $4L^2\dot U\dot V/(1+UV)^2\ge r^2\dot\phi^2\ge0$ です。よって $\dot U,\dot V$ は同符号であり、右外部の未来向き時間並進 $\partial_tU=-\kappa U>0$、$\partial_tV=\kappa V>0$ と同じ未来円錐を選べば $\dot U,\dot V\ge0$ です。右外部で $V>0$ だった点から未来に進むと $V$ は減少しないため、$V<0$ の左外部には到達できません。$t=0$ の橋が空間的に連結でも、因果的には非可通行です。TFDの左右相関から直接の通信可能性は導けません。
<!-- solution-end -->

## 8. まとめと次講

TFDは二つのHilbert空間上の**純粋状態**ですが、片側を部分跡すると正準**熱状態**になります。非回転BTZの温度はEuclid地平線の正則性で定まり、空間円周 $2\pi L$ の境界CFTの高温熱力学と、適切なBrown–Henneaux関係・モジュラー条件の下で一致します。最大拡張BTZの時間対称断面には左右を結ぶ橋があっても、未来向き因果曲線では横断できません。

**次のHOLO17**では、二境界を丸ごと左右に分けるのではなく、**一つの境界CFTの空間部分領域**を選んだときのエントロピー、UV正則化とRényiエントロピーへ進みます。RT面の長さとの対応はHOLO18以降で扱います。
