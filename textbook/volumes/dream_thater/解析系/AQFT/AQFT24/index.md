# AQFT24 Gibbs状態とKMSの帯解析

[Takesakiのモジュラー不変性](../AQFT23/index.md#thm-aqft23-modular-invariance)により、標準対から観測量のモジュラー時間発展 $\sigma_t=\operatorname{Ad}\Delta^{it}$ を作れます。しかし時間発展が状態を保存することと、**熱平衡であること**は別です。前者は実数時刻の等式だけで述べられますが、後者には時間を複素数へ延長したときの二つの境界値の関係が必要です。

有限次元ではトレースを使ってこの関係を最後まで計算できます。本講ではそれを足場に、後に局所Type III環でも使える、トレースを定義に含めない **複素時間の熱平衡条件** を導入します。重要なのは「上側の帯」と「時間発展の符号」を同時に固定することです。一般のvon Neumann環でのKMS定理の証明は次講で行います。

## 1. Gibbs模型で何を準備するか

$n\ge1$ とし、$\mathcal A=M_n(\mathbb C)$ に通常の行列積と随伴を入れます。$H=H^*\in\mathcal A$ をエネルギーを表す行列（Hamiltonian）、$\beta>0$ を逆温度とします。スペクトル定理によって正の行列指数関数が定義され、有限次元なので

$$
Z_\beta=\operatorname{Tr}(e^{-\beta H})>0,\qquad
\rho_\beta=Z_\beta^{-1}e^{-\beta H}
$$

は正定値でトレース1です。$\omega_\beta(C)=\operatorname{Tr}(\rho_\beta C)$ は状態です。[AQFT20の忠実密度行列の定義](../AQFT20/index.md#def-aqft20-faithful-density)に照らすと、すべての固有値が正であり、$\rho_\beta^{-1}$ を使えることが重要です。

物理時間 $s$ のHeisenberg時間発展を

$$
\tau_s(C)=e^{isH}Ce^{-isH}
$$

とします。状態は $\tau_s$ で不変です。実際、$H$ と $\rho_\beta$ は同じ固有射影の関数なので交換し、トレースの巡回性から

$$
\omega_\beta(\tau_s(C))
=\operatorname{Tr}(e^{-isH}\rho_\beta e^{isH}C)
=\omega_\beta(C).
$$

時間発展を保存する状態はほかにもあり得ます。例えば $H=\operatorname{diag}(0,1)$ のとき、どの対角密度行列も状態を保存します。このため、**熱的な相関の向き**を決める追加条件を調べます。

<a id="def-aqft24-gibbs"></a>

<!-- formal-statement-start -->
> **定義（有限次元Gibbs状態）**  
> $H=H^*\in M_n(\mathbb C)$ と $\beta>0$ に対し、$Z_\beta=\operatorname{Tr}(e^{-\beta H})$ とする。このとき密度行列 $\rho_\beta=Z_\beta^{-1}e^{-\beta H}$ の定める状態
$$
\omega_\beta(C)=\operatorname{Tr}(\rho_\beta C)
$$
> を、Hamiltonian $H$ と逆温度 $\beta$ の **Gibbs状態** とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft24-gibbs -->
### 直接例：二準位で正値性と正規化を確かめる

$H=\operatorname{diag}(0,1)$、$\beta=\log3$ とします。$H$ の固有基底では指数関数は各固有値へ指数を作用させるので

$$
e^{-\beta H}=\operatorname{diag}(1,1/3),\quad
Z_\beta=1+1/3=4/3,\quad
\rho_\beta=\operatorname{diag}(3/4,1/4).
$$

両固有値は正、和は1です。よって $\omega_\beta(I)=1$、任意の $C$ について

$$
\omega_\beta(C^*C)
=\tfrac34\|Ce_1\|^2+\tfrac14\|Ce_2\|^2\ge0.
$$

等号なら両列 $Ce_1,Ce_2$ が零なので $C=0$。**定義の確認**：指数行列の正定値性、トレースによる正規化、状態の正値性、さらに忠実性を順に検証しました。
<!-- definition-example-end -->

## 2. KMS条件：複素時間の帯の両端を比較する

実時間の一パラメータ自己同型群 $\alpha_t$ と状態 $\omega$ を考えます。複素数 $z=t+iy$ に対し $t=\operatorname{Re}z$、$y=\operatorname{Im}z$ と書きます。**帯**とは実部を制限せず虚部だけを $0\le y\le1$ とする領域です。帯の内部で複素微分可能な関数を、その帯で正則と呼びます。

重要な注意は、一般の自己同型 $\alpha_t$ を複素 $z$ にそのまま代入できるとは限らないことです。そこで、KMS条件は「各二元 $A,B$ に対し**相関関数の解析的延長が存在する**」という形で書きます。有限行列なら後で $\alpha_z$ 自体を直接定義できます。

<a id="def-aqft24-kms"></a>

<!-- formal-statement-start -->
> **定義（逆温度1の上側帯KMS条件）**  
> 単位的C*環 $\mathcal A$ の強連続な一パラメータ $*$-自己同型群 $\alpha_t$ と状態 $\omega$ に対し、任意の $A,B\in\mathcal A$ に、閉帯 $0\le\operatorname{Im}z\le1$ 上で有界・連続、開帯 $0<\operatorname{Im}z<1$ 上で正則な複素数値関数 $F_{A,B}$ が存在し、
$$
F_{A,B}(t)=\omega(\alpha_t(A)B),
$$

$$
F_{A,B}(t+i)=\omega(B\alpha_t(A))
\qquad(t\in\mathbb R)
$$
> を満たすとき、$\omega$ は $\alpha$ に関して **逆温度1のKMS状態** であるという。有限次元では強連続は通常のノルム連続を意味する。
<!-- formal-statement-end -->

二つの境界で **$A$ と $B$ の順序が逆** になることが条件の核心です。$\omega(\alpha_t(A)B)=\omega(B\alpha_t(A))$ を実軸上で要求しているわけではありません。

<!-- definition-example-start: def-aqft24-kms -->
### 直接例：可換な模型は帯の条件を満たす

$\mathcal A$ が有限次元の可換行列代数で $\alpha_t=\operatorname{id}$ とします。任意の状態 $\omega$ と $A,B$ について $AB=BA$ なので、定数関数

$$
F_{A,B}(z)=\omega(AB)
$$

を採れば閉帯で有界・連続、内部で正則です。下端は $\omega(AB)$、上端は $\omega(BA)$ に等しいです。**定義の確認**：各 $A,B$ に対する解析的関数の存在・一様有界性・両端の等式が全て成立しています。非可換の場合はこの定数関数による証明が通用しないため、次のGibbs計算が必要です。
<!-- definition-example-end -->

## 3. モジュラー時間の複素化

以後 $\rho=\rho_\beta$ と略記します。[AQFT20の有限次元モジュラー流](../AQFT20/index.md#thm-aqft20-finite-flow)は

$$
\sigma_t(A)=\rho^{it}A\rho^{-it}
$$

です。$\rho$ は正定値なので $\log\rho$ が自己共役行列として存在し、有限次元では $z\in\mathbb C$ に対して

$$
\rho^{iz}=e^{iz\log\rho},\qquad
\sigma_z(A)=\rho^{iz}A\rho^{-iz}
$$

が全複素平面で定義できます。ただし虚部が非零の $\sigma_z$ は通常 $*$-自己同型ではなく、解析接続を計算するための写像です。

固有基底で $\rho=\operatorname{diag}(p_1,\ldots,p_n)$、$p_j>0$、$\sum p_j=1$ とすると、行列単位 $E_{ij}$ について

$$
\sigma_z(E_{ij})
=e^{iz(\log p_i-\log p_j)}E_{ij}
=\left(\frac{p_i}{p_j}\right)^{iz}E_{ij}.
$$

この中間式によって、複素時間への延長が各成分の指数関数であり、したがって整関数であることが分かります。

<a id="thm-aqft24-gibbs-kms"></a>

<!-- formal-statement-start -->
> **定理（有限次元Gibbs状態のモジュラーKMS条件）**  
> $n\ge1$、$H=H^*\in M_n(\mathbb C)$、$\beta>0$ とし、$\rho=Z_\beta^{-1}e^{-\beta H}$、$\omega(A)=\operatorname{Tr}(\rho A)$ とする。$\sigma_t(A)=\rho^{it}A\rho^{-it}$ に対し、すべての $A,B\in M_n(\mathbb C)$ について
$$
F_{A,B}(z)=\operatorname{Tr}(\rho\,\sigma_z(A)B)
$$
> は整関数であり、閉帯 $0\le\operatorname{Im}z\le1$ 上で有界かつ連続で、すべての実 $t$ に対し
$$
F_{A,B}(t)=\omega(\sigma_t(A)B),\qquad
F_{A,B}(t+i)=\omega(B\sigma_t(A)).
$$
> 特に $\omega$ は $\sigma$ に関して逆温度1のKMS状態である。
<!-- formal-statement-end -->

### 証明の見取り図

複素時間で虚部を1だけ増すと $\rho^{i(t+i)}=\rho^{it-1}$ です。この負べきがトレース内の最初の $\rho$ と打ち消し合い、残った $\rho$ を巡回させると $A,B$ の順序が反転します。帯全体での評価は二段階です。まずHilbert–Schmidt内積にCauchy–Schwarzを適用し、次に正数の加重相加相乗平均を使います。

<!-- proof-start -->
### 証明

$\rho$ の固有値はすべて正です。前節の各行列成分が $z$ の指数関数であるため、$F_{A,B}(z)$ は有限個の整関数の和で整関数です。実 $t$ では定義から第一境界式が成立します。

次に $\sigma_{t+i}(A)=\rho^{-1}\sigma_t(A)\rho$ を行列指数関数から直接確かめます。

$$
\begin{aligned}
\sigma_{t+i}(A)
&=\rho^{it-1}A\rho^{-it+1}\\
&=\rho^{-1}(\rho^{it}A\rho^{-it})\rho\\
&=\rho^{-1}\sigma_t(A)\rho.
\end{aligned}
$$

ゆえに、有限行列のトレースの巡回性を用いて

$$
\begin{aligned}
F_{A,B}(t+i)
&=\operatorname{Tr}(\rho\rho^{-1}\sigma_t(A)\rho B)\\
&=\operatorname{Tr}(\sigma_t(A)\rho B)\\
&=\operatorname{Tr}(\rho B\sigma_t(A))
=\omega(B\sigma_t(A)).
\end{aligned}
$$

最後に帯の**全実部にわたる**有界性を確認します。$z=t+iy$、$0\le y\le1$ とすると $\rho$ の各べきが交換することから

$$
F_{A,B}(t+iy)
=\operatorname{Tr}\bigl(\rho^{1-y}\sigma_t(A)\rho^y B\bigr).
$$

この評価を行列成分から証明します。$\rho=\operatorname{diag}(p_1,\dots,p_n)$ の固有基底を取り、$C=\sigma_t(A)$ と置きます。

$$
X=\rho^{(1-y)/2}C\rho^{y/2},\qquad
Y=\rho^{y/2}B\rho^{(1-y)/2}
$$

に対し、トレースの巡回性と[Hilbert–Schmidt内積](../AQFT20/index.md#def-aqft20-hilbert-schmidt)のCauchy–Schwarz不等式から

$$
F_{A,B}(t+iy)=\operatorname{Tr}(XY),\qquad
|\operatorname{Tr}(XY)|\le\|X\|_2\|Y\|_2
$$

です。行列成分でノルムを展開すると

$$
\|X\|_2^2=\sum_{i,j}p_i^{1-y}p_j^y|C_{ij}|^2.
$$

$0\le y\le1$ の加重相加相乗平均不等式

$$
p_i^{1-y}p_j^y\le(1-y)p_i+yp_j
$$

を使います。各行・列の二乗和は

$$
\sum_j|C_{ij}|^2=\|C^*e_i\|^2\le\|C\|^2,\quad
\sum_i|C_{ij}|^2=\|Ce_j\|^2\le\|C\|^2
$$

なので、$\sum_i p_i=1$ とユニタリ共役による $\|C\|=\|A\|$ から

$$
\begin{aligned}
\|X\|_2^2
&\le(1-y)\sum_i p_i\sum_j|C_{ij}|^2
+y\sum_jp_j\sum_i|C_{ij}|^2\\
&\le(1-y)\|C\|^2+y\|C\|^2
=\|A\|^2.
\end{aligned}
$$

$Y$ についても同じ計算で $\|Y\|_2\le\|B\|$ です。従って

$$
|F_{A,B}(t+iy)|\le\|A\|\|B\|.
$$

この評価は $t$ に依存せず、$y=0,1$ も含みます。これで閉帯上の一様有界性・連続性・内部正則性・二つの境界条件がすべて証明されました。
<!-- proof-end -->

この定理の本体は**トレース等式のどこに $\rho$ を動かしたか**という計算です。一般のType III環ではこのトレースを持たないため、今の証明をそのまま使えません。ただしKMSの定義自体はトレースを要求していません。

## 4. 二準位で上下の境界を直接検算する

先ほどの $\rho=\operatorname{diag}(3/4,1/4)$ を使います。行列単位 $E_{12}$ と $E_{21}$ は $E_{12}E_{21}=E_{11}$、$E_{21}E_{12}=E_{22}$ を満たします。

$A=E_{12}$、$B=E_{21}$ と置けば $\sigma_z(A)=3^{iz}E_{12}$ ですから

$$
F_{E_{12},E_{21}}(z)
=\operatorname{Tr}(\rho\,3^{iz}E_{11})
=\frac34\,3^{iz}.
$$

二つの境界は

$$
F(t)=\frac34\,3^{it},\qquad
F(t+i)=\frac34\,3^{it-1}
=\frac14\,3^{it}.
$$

実際、$\omega(E_{21}\sigma_t(E_{12}))=\omega(3^{it}E_{22})=\frac14\,3^{it}$ です。上端で $3^{it+1}$ としてしまうと誤りになります。**$i(t+i)=it-1$** を計算してから比を代入しましょう。

逆順の $A=E_{21}$、$B=E_{12}$ では

$$
F_{E_{21},E_{12}}(z)=\frac14\,3^{-iz},\quad
F(t+i)=\frac34\,3^{-it}.
$$

二つの演算子の順を交換すると下端の重みも上端の重みも交換されます。この具体例は、帯の向きと行列単位の積の両方を点検する最小模型です。

## 5. 物理時間とモジュラー時間の符号

Gibbs状態の密度行列の対数は

$$
\log\rho=-\beta H-(\log Z_\beta)I.
$$

スカラーの $I$ に比例する項は共役作用で消えるので

$$
\begin{aligned}
\sigma_t(A)
&=e^{it\log\rho}Ae^{-it\log\rho}\\
&=e^{-i\beta tH}Ae^{i\beta tH}
=\tau_{-\beta t}(A).
\end{aligned}
$$

つまり採用した $\sigma_t=\operatorname{Ad}\rho^{it}$ は **物理時間 $s=-\beta t$** に対応します。$H=\operatorname{diag}(0,1)$、$\beta=\log3$、$A=E_{12}$ では $\tau_s(A)=e^{-is}A$ なので、$\tau_{-\beta t}(A)=3^{it}A$ と前節の位相に一致します。

<a id="thm-aqft24-physical-kms"></a>

<!-- formal-statement-start -->
> **定理（物理時間における逆温度βの帯）**  
> $H=H^*\in M_n(\mathbb C)$ と $\beta>0$ に対し、$\omega_\beta(C)=Z_\beta^{-1}\operatorname{Tr}(e^{-\beta H}C)$、$\tau_s(C)=e^{isH}Ce^{-isH}$ とする。任意の $A,B$ に対し
$$
G_{A,B}(w)=\omega_\beta(A\tau_w(B))
$$
> は閉帯 $0\le\operatorname{Im}w\le\beta$ で有界・連続、内部で正則となり、
$$
G_{A,B}(s)=\omega_\beta(A\tau_s(B)),\qquad
G_{A,B}(s+i\beta)=\omega_\beta(\tau_s(B)A)
$$
> が成り立つ。この物理時間の規約では、時間発展する演算子を **右側** に置いている。
<!-- formal-statement-end -->

### 証明の見取り図

$\tau_{s+i\beta}(B)=\rho\,\tau_s(B)\rho^{-1}$ と変形します。右側に置いた演算子が $\rho$ と出会う順序が、上端の式における $A$ と $B$ の反転を作ります。

<!-- proof-start -->
### 証明

$e^{-\beta H}=Z_\beta\rho$ なので $e^{-\beta H}$ と $e^{isH}$ は交換します。有限次元の行列指数関数から

$$
\begin{aligned}
\tau_{s+i\beta}(B)
&=e^{isH}e^{-\beta H}B e^{-isH}e^{\beta H}\\
&=\rho\,\tau_s(B)\rho^{-1}.
\end{aligned}
$$

従って

$$
\begin{aligned}
G_{A,B}(s+i\beta)
&=\operatorname{Tr}(\rho A\rho\tau_s(B)\rho^{-1})\\
&=\operatorname{Tr}(A\rho\tau_s(B))\\
&=\operatorname{Tr}(\rho\tau_s(B)A).
\end{aligned}
$$

連続性と正則性は有限行列の指数関数から得られます。$w=s+iv$、$0\le v\le\beta$ に対して $y=v/\beta$ と置き、$\tau_{s+iv}(B)=\rho^y\tau_s(B)\rho^{-y}$ を用いると

$$
G_{A,B}(s+iv)
=\operatorname{Tr}(\rho^{1-y}A\rho^y\tau_s(B)).
$$

前定理のHilbert–Schmidtノルム評価を、今度は $A,\tau_s(B)$ の並びに用いれば

$$
|G_{A,B}(s+iv)|\le\|A\|\|B\|
$$

が帯全体で成立します。これは $F$ の上側帯とは**同じ境界式を異なる順序・異なる時間向きで表したもの**です。
<!-- proof-end -->

注意：$\omega_\beta(\tau_w(A)B)$ と書いて物理時間の**上側**帯をそのまま使うと、一般には上端のKMS式は得られません。前の $F_{A,B}$ に対応する物理時間は $w=-\beta z$ であり、これは物理時間では下側帯です。文字の置換だけではなく、**どちらの演算子を発展させるか**を確認します。

## 6. 仮定を外すと何が壊れるか

### 忠実でない密度行列

$\rho=\operatorname{diag}(1,0)$ では、$\rho^{-1}$ が存在しません。したがって $\sigma_{t+i}(A)=\rho^{-1}\sigma_t(A)\rho$ という証明の第一歩が未定義です。有限次元の有限 $\beta$ と有限の自己共役 $H$ から作るGibbs状態の密度行列は必ず忠実なので、これは本定理の仮定を外した例です。非忠実な状態から一般のモジュラー作用素を作るには支持射影などの区別が必要です。

### 実時間の不変性だけでは熱平衡を特徴付けられない

$H=\operatorname{diag}(0,1)$ とし、$\eta(C)=\operatorname{Tr}(\operatorname{diag}(1/2,1/2)C)$ とします。この状態は $\tau_s$ で不変です。しかし、$\beta=\log3$ の物理KMS境界は満たしません。実際 $A=E_{21}$、$B=E_{12}$ の物理時間相関は

$$
G_{A,B}(w)=\eta(E_{21}\tau_w(E_{12}))
=\tfrac12e^{-iw}.
$$

そこで $G(i\beta)=\frac12e^\beta=\frac32$ ですが、要求される $\eta(E_{12}E_{21})=\frac12$ と異なります。別の解析関数を選んで上端だけ修正することもできません。実軸上で既知の整関数 $G(w)=\frac12e^{-iw}$ と一致する、閉帯で連続・内部正則な関数があれば、その差は下端で零です。下端の任意の有限区間で差を零としてSchwarz反射すると実軸をまたぐ近傍へ正則に延長できます。零点が実軸に集積するので[CA3の恒等定理](../../CA/CA3/index.md#thm-ca3-isolated-zeros-identity)により差は恒等的に零です。上端の値も上の計算に限られ、状態保存だけではKMSは従いません。

## 7. 演習と詳細解答

### Level A：帯の端点と行列単位

<a id="ex-aqft24-a01"></a>
**演習 A1：二準位のGibbs状態の密度行列**

- Level: A
- 問題：$H=\operatorname{diag}(0,2)$、$\beta=(\log2)/2$ とする。$Z_\beta$、$\rho_\beta$ を求め、忠実性と状態の正規化を確かめよ。

<!-- solution-start -->
**詳細解答。** $\beta\cdot2=\log2$ なので $e^{-\beta H}=\operatorname{diag}(1,1/2)$ です。従って $Z_\beta=3/2$、$\rho_\beta=\operatorname{diag}(2/3,1/3)$。固有値はどちらも正なので逆行列があり、$\operatorname{Tr}\rho_\beta=2/3+1/3=1$ です。任意の $C$ について $\operatorname{Tr}(\rho_\beta C^*C)=\frac23\|Ce_1\|^2+\frac13\|Ce_2\|^2$ は非負で、零なら $C=0$ です。
<!-- solution-end -->

<a id="ex-aqft24-a02"></a>
**演習 A2：虚部の符号**

- Level: A
- 問題：$\rho=\operatorname{diag}(3/4,1/4)$、$A=E_{12}$ に対し $\sigma_{t+iy}(A)$ を求め、$y=0,1$ の振幅を比べよ。

<!-- solution-start -->
**詳細解答。** [有限次元モジュラー流の式](../AQFT20/index.md#thm-aqft20-finite-flow)より $\sigma_z(E_{12})=(p_1/p_2)^{iz}E_{12}$。$p_1/p_2=3$、$i(t+iy)=it-y$ だから

$$
\sigma_{t+iy}(E_{12})=3^{it-y}E_{12}.
$$

$y=0$ の係数の絶対値は1、$y=1$ では $3^{-1}$ です。$e^{+y\log3}$ としてしまうのは $i^2=-1$ を落とした符号ミスです。
<!-- solution-end -->

<a id="ex-aqft24-a03"></a>
**演習 A3：上端の順序**

- Level: A
- 問題：同じ $\rho$ と $A=E_{21}$、$B=E_{12}$ について $F(z)=\omega(\sigma_z(A)B)$ を計算し、上端の値を $\omega(B\sigma_t(A))$ と照合せよ。

<!-- solution-start -->
**詳細解答。** $\sigma_z(E_{21})=3^{-iz}E_{21}$ で、$E_{21}E_{12}=E_{22}$ です。よって

$$
F(z)=\tfrac14\,3^{-iz},\qquad
F(t+i)=\tfrac14\,3^{-it+1}=\tfrac34\,3^{-it}.
$$

一方、$B\sigma_t(A)=3^{-it}E_{12}E_{21}=3^{-it}E_{11}$。したがって $\omega(B\sigma_t(A))=\frac34\,3^{-it}$ で上端と一致します。
<!-- solution-end -->

<a id="ex-aqft24-a04"></a>
**演習 A4：可換模型のKMS**

- Level: A
- 問題：$\mathcal A=\{\operatorname{diag}(a,b):a,b\in\mathbb C\}$、$\alpha_t=\operatorname{id}$ とする。$\omega(\operatorname{diag}(a,b))=pa+(1-p)b$（$0\le p\le1$）が[上側帯KMS条件](#def-aqft24-kms)を満たすことを、正則性と両境界を含めて示せ。

<!-- solution-start -->
**詳細解答。** $A=\operatorname{diag}(a_1,a_2)$、$B=\operatorname{diag}(b_1,b_2)$ と置くと $AB=BA=\operatorname{diag}(a_1b_1,a_2b_2)$。$F(z)=pa_1b_1+(1-p)a_2b_2$ は定数なので帯で有界・連続、内部で正則です。$\alpha_t(A)=A$ であることから下端は $\omega(AB)$、上端は $\omega(BA)$ に等しいです。$p=0,1$ も定数関数の議論で許され、ここでは忠実性は不要です。
<!-- solution-end -->

### Level B：解析接続と仮定の使い方

<a id="ex-aqft24-b01"></a>
**演習 B1：一般の行列単位から帯の境界を再構成**

- Level: B
- 問題：$\rho=\operatorname{diag}(p_1,\ldots,p_n)$、$p_i>0$、$\sum p_i=1$ とする。$A=E_{ij}$、$B=E_{ji}$ として $F(z)$ を求め、$F(t+i)=\omega(B\sigma_t(A))$ を添字を追って示せ。

<!-- solution-start -->
**詳細解答。** [有限次元の流](../AQFT20/index.md#thm-aqft20-finite-flow)と $E_{ij}E_{ji}=E_{ii}$ より

$$
F(z)=p_i\left(\frac{p_i}{p_j}\right)^{iz}.
$$

$z=t+i$ を代入して

$$
F(t+i)
=p_i\left(\frac{p_i}{p_j}\right)^{it-1}
=p_j\left(\frac{p_i}{p_j}\right)^{it}.
$$

他方、$B\sigma_t(A)=(p_i/p_j)^{it}E_{jj}$ だから $\omega(B\sigma_t(A))=p_j(p_i/p_j)^{it}$ で一致します。$i=j$ なら両辺とも $p_i$ です。
<!-- solution-end -->

<a id="ex-aqft24-b02"></a>
**演習 B2：帯全体で有界な理由**

- Level: B
- 問題：有限次元の忠実な密度行列 $\rho$ と $A,B\in M_n(\mathbb C)$ に対し、$F(t+iy)=\operatorname{Tr}(\rho^{1-y}\sigma_t(A)\rho^yB)$ を導き、$0\le y\le1$ に一様な上界を証明せよ。

<!-- solution-start -->
**詳細解答。** $\sigma_{t+iy}(A)=\rho^{-y}\sigma_t(A)\rho^y$ なので、最初の $\rho$ と $\rho^{-y}$ を掛けて指定式が出ます。$C=\sigma_t(A)$ と置き、

$$
X=\rho^{(1-y)/2}C\rho^{y/2},\qquad
Y=\rho^{y/2}B\rho^{(1-y)/2}
$$

と分解すれば、$\operatorname{Tr}(XY)=F(t+iy)$ です。[Hilbert–Schmidt内積](../AQFT20/index.md#def-aqft20-hilbert-schmidt)のCauchy–Schwarz不等式から $|F|\le\|X\|_2\|Y\|_2$。成分表示と $p_i^{1-y}p_j^y\le(1-y)p_i+yp_j$ を用いて

$$
\begin{aligned}
\|X\|_2^2
&=\sum_{ij}p_i^{1-y}p_j^y|C_{ij}|^2\\
&\le(1-y)\sum_i p_i\sum_j|C_{ij}|^2
+y\sum_jp_j\sum_i|C_{ij}|^2\\
&\le(1-y)\|C\|^2+y\|C\|^2=\|A\|^2.
\end{aligned}
$$

各行と列の二乗和は $\|C\|^2$ 以下であり、$\|C\|=\|A\|$ です。$Y$ も同様に $\|Y\|_2\le\|B\|$。よって $0\le y\le1$ の全帯で $|F|\le\|A\|\|B\|$。上界に $t$ が入らないので実方向に無限の帯でも有界です。
<!-- solution-end -->

<a id="ex-aqft24-b03"></a>
**演習 B3：物理時間への変数変換**

- Level: B
- 問題：$H=\operatorname{diag}(0,2)$、$\beta>0$ とする。$A=E_{12}$ について $\sigma_t(A)$ と $\tau_s(A)$ を別々に計算し、$\sigma_t=\tau_{-\beta t}$ を確認せよ。$G_{E_{21},E_{12}}(i\beta)$ も求めよ。

<!-- solution-start -->
**詳細解答。** $p_1/p_2=e^{2\beta}$ なので $\sigma_t(E_{12})=e^{2i\beta t}E_{12}$ です。$H$ の固有エネルギー差は $0-2=-2$ だから $\tau_s(E_{12})=e^{-2is}E_{12}$。$s=-\beta t$ の代入で一致します。$G_{E_{21},E_{12}}(w)=\omega(E_{21}\tau_w(E_{12}))=p_2e^{-2iw}$。$w=i\beta$ で $p_2e^{2\beta}=p_1$、これは $\omega(E_{12}E_{21})=\omega(E_{11})$ に等しく、[物理時間KMSの定理](#thm-aqft24-physical-kms)の上端です。
<!-- solution-end -->

<a id="ex-aqft24-b04"></a>
**演習 B4：状態保存はKMSを保証しない**

- Level: B
- 問題：$H=\operatorname{diag}(0,1)$、$\eta(C)=\operatorname{Tr}(\operatorname{diag}(q,1-q)C)$（$0<q<1$）とする。$\eta$ が $\tau_s$ で不変であることを示し、$A=E_{21}$、$B=E_{12}$ で逆温度 $\beta>0$ の物理KMS境界が成立するための $q$ を求めよ。

<!-- solution-start -->
**詳細解答。** 対角密度 $\operatorname{diag}(q,1-q)$ は $H$ と交換するのでトレース巡回性により $\eta\circ\tau_s=\eta$ です。$\tau_w(E_{12})=e^{-iw}E_{12}$ と $E_{21}E_{12}=E_{22}$ から

$$
G_{A,B}(w)=(1-q)e^{-iw}.
$$

上端は $G(i\beta)=(1-q)e^\beta$。右境界は $\eta(BA)=\eta(E_{11})=q$ なので必要な等式は $(1-q)e^\beta=q$ です。これを解くと

$$
q=\frac{e^\beta}{1+e^\beta}
=\frac1{1+e^{-\beta}}.
$$

これはエネルギー $0,1$ のGibbs重みです。単に不変な任意の $q$ とは異なります。
<!-- solution-end -->

### Level C：相関関数全体の構造を理解する

<a id="ex-aqft24-c01"></a>
**演習 C1：有限次元のKMS条件を全ての行列へ組み立てる**

- Level: C
- 問題：$\rho=\operatorname{diag}(p_1,\ldots,p_n)$ を忠実な密度行列、$\sigma_t(A)=\rho^{it}A\rho^{-it}$ とする。任意の $A=(a_{ij})$、$B=(b_{ij})$ に対し、行列単位表示から $F_{A,B}(z)$ の明示式を作り、正則性・二つの境界・帯の有界性を一つの証明として再構成せよ。

<!-- solution-start -->
**詳細解答。** $A=\sum_{ij}a_{ij}E_{ij}$ と展開します。[有限次元の流](../AQFT20/index.md#thm-aqft20-finite-flow)を各基底に適用すると $\sigma_z(A)=\sum_{ij}(p_i/p_j)^{iz}a_{ij}E_{ij}$。さらに $\operatorname{Tr}(\rho E_{ij}B)=p_i b_{ji}$ なので

$$
F_{A,B}(z)
=\sum_{i,j}p_i\left(\frac{p_i}{p_j}\right)^{iz}a_{ij}b_{ji}.
$$

正の比に実対数を使えば各項は $e^{iz\log(p_i/p_j)}$ という整関数であり、有限和も整関数です。$z=t$ は $\omega(\sigma_t(A)B)$ そのものです。上端を計算すると

$$
F_{A,B}(t+i)
=\sum_{ij}p_j\left(\frac{p_i}{p_j}\right)^{it}a_{ij}b_{ji}.
$$

他方、$\omega(B\sigma_t(A))=\sum_{ji}p_j b_{ji}(p_i/p_j)^{it}a_{ij}$ で等しいです。最後に $z=t+iy$ と置き、本文の加重相加相乗平均とHilbert–Schmidt Cauchy–Schwarzの評価を適用すれば $|F(z)|\le\|A\|\|B\|$。端点は $1,\infty$ の指数で同様に評価できます。これで[定義の全条件](#def-aqft24-kms)が各 $A,B$ に対し成立しました。
<!-- solution-end -->

<a id="ex-aqft24-c02"></a>
**演習 C2：物理KMSとモジュラーKMSの違いを統合する**

- Level: C
- 問題：$H=\operatorname{diag}(0,\varepsilon)$（$\varepsilon>0$）、$\beta>0$ に対するGibbs状態を考える。$A=E_{12}$、$B=E_{21}$ のモジュラー相関 $F(z)=\omega(\sigma_z(A)B)$ と物理相関 $G(w)=\omega(B\tau_w(A))$ を求める。両者の帯の対応、境界値、有限温度で $\rho$ が忠実である理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $r=e^{-\beta\varepsilon}\in(0,1)$ とすると $p_1=1/(1+r)$、$p_2=r/(1+r)$ で、両方正です。比 $p_1/p_2=r^{-1}=e^{\beta\varepsilon}$ なので

$$
F(z)=p_1 e^{i\beta\varepsilon z}.
$$

モジュラー上端は $F(t+i)=p_1e^{i\beta\varepsilon t-\beta\varepsilon}=p_2e^{i\beta\varepsilon t}=\omega(B\sigma_t(A))$。

物理時間では $\tau_w(A)=e^{-i\varepsilon w}A$、$BA=E_{22}$ なので $G(w)=p_2e^{-i\varepsilon w}$ です。上端は $G(s+i\beta)=p_2e^{-i\varepsilon s+\beta\varepsilon}=p_1e^{-i\varepsilon s}$、一方 $\omega(\tau_s(A)B)=p_1e^{-i\varepsilon s}$。$F$ と $G$ は一般に同じ関数ではありません。$F$ は「時間発展する $A$ を左に置く」上側帯、$G$ は「時間発展する $A$ を右に置く」上側の物理帯です。$\sigma_t=\tau_{-\beta t}$ のため、$F$ に入る $w=-\beta z$ は物理時間の下側帯になります。$\beta,\varepsilon$ が有限なら $0<e^{-\beta\varepsilon}<1$ で二つの重みは零にならず、$\rho^{-1}$ が存在します。
<!-- solution-end -->

## 8. 次講への橋

有限次元では正の $\rho$ の逆とトレースの巡回性がKMS境界条件の証明を一行ずつ支えました。一般の[AQFT23のモジュラー自己同型群](../AQFT23/index.md#def-aqft23-modular-flow)は、通常の密度行列やトレースを仮定せずに存在します。次の AQFT25 では、その一般群について複素帯の解析的元を用いKMS境界を構成します。有限行列で証明したことと一般の定理でこれから証明すべきことを混同しないでください。

参考：O. Bratteli and D. W. Robinson, *Operator Algebras and Quantum Statistical Mechanics II*（KMS条件）；S. J. Summers, [Tomita–Takesaki Modular Theory](https://arxiv.org/abs/math-ph/0511034)（モジュラー群と熱的性質）。
