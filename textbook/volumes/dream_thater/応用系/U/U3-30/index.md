# U3-30 Itô–Taylor 展開・高次法・安定性

[U3-29 の強誤差・弱誤差](../U3-29/index.md#def-u3-29-strong-weak)では、同じ Brown 運動上の誤差と期待値の誤差を区別しました。[U3-28 の Milstein 法](../U3-28/index.md#def-u3-28-milstein)が二次変動補正を含む理由も分かりました。しかし「もう一つ補正を足せば必ず精度が上がり、どんな刻みでも使える」わけではありません。

本講は平均二乗誤差（Mean Squared Error; MSE）を精度の指標として使い、三つの問いを分離します。**(i)** 反復 Itô 積分のうち、次数に応じて何を残すか。**(ii)** 高次法の次数を、厳密解の分かるモデルでどう証明するか。**(iii)** 有限時間で収束する数値法が、長時間の二乗平均を増幅してしまうのはなぜか。一般の数値 SDE の高次収束定理を無条件に仮定せず、完全に再計算できる線形モデルを主軸にします。

## 1. 積分をもう一度展開する

確率空間 $(\Omega,\mathcal F,P)$ 上の標準 Brown 運動 $W$ と、それが生成する情報 $(\mathcal F_t)$ を考えます。時間単位は年とし、$h>0$ 年、$Z=W_{t+h}-W_t\sim N(0,h)$ と置きます。$E$ は $P$ による期待値です。価格付けの $Q$ を用いる場合はモデル係数を $Q$ の下で別途指定します。

まず区間 $[t,t+h]$ における反復積分を、内側・外側の積分順序まで固定します。「$1$」を $dW$、「$0$」を $ds$ とする添字の約束です。

<a id="def-u3-30-iterated"></a>

<!-- formal-statement-start -->
> **定義（重み付き反復 Itô 積分）**  
> $t\ge0,h>0$ と標準 Brown 運動 $W$ に対し、以下を定める。左側の添字が内側、右側が外側の積分を表す。

$$
\begin{aligned}
I_{11}&=\int_t^{t+h}\int_t^s dW_u\,dW_s,&
I_{111}&=\int_t^{t+h}\int_t^s\int_t^v dW_u\,dW_v\,dW_s,\\
I_{01}&=\int_t^{t+h}(s-t)\,dW_s,&
I_{10}&=\int_t^{t+h}(W_s-W_t)\,ds.
\end{aligned}
$$

> 確率微分を1個含む添字に重み $1/2$、時間積分を1個含む添字に重み $1$ を割り当てる。例えば $I_{11}$ は重み $1$、$I_{01}$ と $I_{111}$ は重み $3/2$ である。
<!-- formal-statement-end -->

この重みは $Z$ を何回掛けたかだけで数えるものではありません。Brown 増分の大きさは二乗平均で $\sqrt h$、時間積分は $h$ だからです。

<!-- definition-example-start: def-u3-30-iterated -->
**定義の確認**：$h=1/4$ 年とします。$EZ^2=h$ であり、後で証明する $I_{11}=(Z^2-h)/2$ と正規分布の四次モーメントから

$$
EI_{11}=0,\qquad EI_{11}^2=\frac{h^2}{2}=\frac1{32}
$$

を得ます。また $I_{01}$ の被積分関数 $s-t$ は確定的です。[Itô 等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)を適用すると

$$
EI_{01}^2=\int_t^{t+h}(s-t)^2\,ds
=\frac{h^3}{3}=\frac1{192}.
$$

二乗平均平方根は順に $h/\sqrt2$ と $h^{3/2}/\sqrt3$ です。よって「重み」は積分の大きさに対応します。内側の $ds$ と外側の $dW_s$ を取り違えると、$I_{01}$ と $I_{10}$ を交換してしまいます。
<!-- definition-example-end -->

<a id="prop-u3-30-ito-integrals"></a>

<!-- formal-statement-start -->
> **命題（反復積分の Hermite 表示と混合積分）**  
> 上記の $t,h,Z$ と積分について、ほとんど確実に

$$
I_{11}=\frac{Z^2-h}{2},
\qquad
I_{111}=\frac{Z^3-3hZ}{6},
\qquad
I_{01}+I_{10}=hZ
$$

> が成立する。また $I_{01}$ は $Z$ だけからは決まらず、独立な標準正規変数 $U$ を追加して次の同時分布を実現できる。

$$
I_{01}=\frac{hZ}{2}+\sqrt{\frac{h^3}{12}}\,U,
\qquad
I_{10}=\frac{hZ}{2}-\sqrt{\frac{h^3}{12}}\,U.
$$
<!-- formal-statement-end -->

**見取り図**：二次・三次の反復積分は [時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)で $Z$ の多項式へ戻ります。混合積分は時間についての部分積分で和が $hZ$ となりますが、差には格子点の増分から見えない Brown 運動の揺れが残ります。

<!-- proof-start -->
### 証明

$B_s=W_{t+s}-W_t$（$0\le s\le h$）とします。既習の [時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $f(x)=x^2$ に適用すると $d(B_s^2)=2B_s\,dB_s+ds$。初期値 $B_0=0$ なので

$$
\int_0^h B_s\,dB_s
=\frac{B_h^2-h}{2}=I_{11}.
$$

次に $f(s,x)=x^3-3sx$ へ同じ公式を適用します。時間微分は $-3x$、空間微分は $3x^2-3s$、二階微分は $6x$ です。従って時間微分と二次変動項が打ち消し、

$$
d(B_s^3-3sB_s)=3(B_s^2-s)\,dB_s.
$$

一方、内側の二重積分は $(B_s^2-s)/2$ だから

$$
I_{111}
=\frac12\int_0^h(B_s^2-s)\,dB_s
=\frac{B_h^3-3hB_h}{6}.
$$

積の [時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $(s,B_s)$ に用いると、$s$ は有限変動なので交差変動は0であり、$d(sB_s)=s\,dB_s+B_s\,ds$。$0$ から $h$ まで積分すると $I_{01}+I_{10}=hB_h=hZ$ となります。

最後に $I_{01}=\int_0^h s\,dB_s$ と $Z=\int_0^h1\,dB_s$ は共同正規で、[Itô 等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)と確定的積分の内積から

$$
\operatorname{Var}(I_{01})=\frac{h^3}{3},\quad
\operatorname{Var}(Z)=h,\quad
\operatorname{Cov}(I_{01},Z)=\frac{h^2}{2}.
$$

よって $I_{01}-hZ/2$ は $Z$ と共分散0の共同正規変数で独立、その分散は $h^3/3-h^3/4=h^3/12$ です。これを $\sqrt{h^3/12}\,U$ と表し、$I_{10}=hZ-I_{01}$ を代入すれば後半の式を得ます。
<!-- proof-end -->

この追加乱数は複数の細分刻みを一つの粗い刻みに束ねる際にも重要です。$I_{01}$ を単に $hZ/2$ に置換すると、その**条件付き平均**は再現できますが、分散 $h^3/12$ を落とします。

## 2. 一般のスカラー方程式でどの項が現れるか

実数値 Itô SDE を

$$
dX_s=a(X_s)\,ds+b(X_s)\,dW_s,\qquad X_t=x
$$

とします。以下の局所展開では $a,b$ を十分滑らか（例えば必要階数まで有界な導関数を持つ）とし、必要な二乗モーメントを仮定します。

添字 $0,1$ と作用素を結び付けましょう。まずプライムは、時間 $s$ ではなく状態変数 $x$ による微分を表します。

$$
f'(x)=\frac{df(x)}{dx},
\qquad f''(x)=\frac{d^2f(x)}{dx^2}.
$$

時間積分側の $L_0$ はドリフトと二次変動の寄与、確率積分側の $L_1$ は Brown 増分の寄与を取り出します。[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)で $f(X_s)$ を微分すると、この対応を確認できます。

<a id="def-u3-30-operators"></a>

<!-- formal-statement-start -->
> **定義（Itô–Taylor の微分作用素）**  
> $a,b:\mathbb R\to\mathbb R$ が二階微分可能で、$f$ が二階微分可能なとき、作用する点 $x$ を明示して

$$
L_0 f(x)=a(x)f'(x)+\frac12 b(x)^2f''(x),
\qquad
L_1 f(x)=b(x)f'(x)
$$

> と定める。$L_1L_1b$ は $L_1(L_1b)$ を意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-30-operators -->
**定義の確認**：$a(x)=\mu x,b(x)=\sigma x$ と置きます。$b'(x)=\sigma,b''(x)=0$ をまず計算し、

$$
\begin{aligned}
L_1b(x)&=(\sigma x)\sigma=\sigma^2x,\\
L_1L_1b(x)&=(\sigma x)(\sigma^2)=\sigma^3x,\\
L_0b(x)&=(\mu x)\sigma+\tfrac12\sigma^2x^2\cdot0=\mu\sigma x,\\
L_1a(x)&=(\sigma x)\mu=\mu\sigma x.
\end{aligned}
$$

各係数がどこから来るかは定義の導関数へ代入した結果であり、行列計算を前提としません。
<!-- definition-example-end -->

<a id="prop-u3-30-taylor-terms"></a>

<!-- formal-statement-start -->
> **命題（スカラー Itô–Taylor の重み3/2までの項）**  
> $a,b\in C_b^5(\mathbb R)$（5階までの導関数と関数自身が有界）で、$X_t=x$ からの強解を考える。$t$ を固定し $h\downarrow0$ とすると、次の展開が成立する。$R_h$ は条件付き $L^2$ に関して $\{E[|R_h|^2\mid X_t=x]\}^{1/2}=O(h^2)$ である。

$$
\begin{aligned}
X_{t+h}={}&x+a(x)h+b(x)Z
 +(L_1b)(x)I_{11}\\
 &+(L_1a)(x)I_{10}
 +(L_0b)(x)I_{01}
 +(L_1L_1b)(x)I_{111}+R_h.
\end{aligned}
$$
<!-- formal-statement-end -->

**見取り図**：$a(X_s)$ と $b(X_s)$ にそれぞれ [時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を適用して時間積分と確率積分を一段ずつ代入します。$a$ は最後に $ds$、$b$ は最後に $dW$ で積分されるため、混合積分の添字が異なります。

<!-- proof-start -->
### 証明

[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)から、$f=a,b$ のいずれについても

$$
f(X_s)=f(x)+\int_t^s(L_0f)(X_u)\,du
+\int_t^s(L_1f)(X_u)\,dW_u.
$$

これを $X_{t+h}=x+\int_t^{t+h}a(X_s)\,ds+\int_t^{t+h}b(X_s)\,dW_s$ に代入します。始点 $x$ で係数を評価した項を分けると、$a(x)h+b(x)Z$ に加えて

$$
(L_0a)(x)I_{00}+(L_1a)(x)I_{10}
+(L_0b)(x)I_{01}+(L_1b)(x)I_{11}
$$

が現れます。ただし $I_{00}=\int_t^{t+h}\int_t^s du\,ds=h^2/2$ は重み2なので残差に入れます。$L_1a$ は内側が $dW_u$、外側が $ds$ だから $I_{10}$、$L_0b$ は内側が $du$、外側が $dW_s$ だから $I_{01}$ となります。

さらに $D=L_1b$ に同じ [Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を適用すると

$$
D(X_u)-D(x)
=\int_t^u(L_0D)(X_v)\,dv
+\int_t^u(L_1D)(X_v)\,dW_v.
$$

最後の被積分関数を $(L_1D)(x)+\{(L_1D)(X_v)-(L_1D)(x)\}$ に分けます。定数部分を二回の外側の確率積分へ代入すると、$(L_1L_1b)(x)I_{111}$ になります。

残差が本当に条件付き二乗平均 $O(h^2)$ であることも調べます。$0<h\le1$ とし、時刻 $t$ の出発点を $X_t=x$ に固定した期待値を $E_x$ と書きます。係数の有界性、積分形、[Itô 等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)から

$$
E_x|X_{t+v}-x|^2
\le2v^2\|a\|_\infty^2+2v\|b\|_\infty^2
\le Cv\quad(0\le v\le h).
$$

$C_b^5$ の下で $L_1a,L_0b,L_1D$ は有界かつ Lipschitz なので、各関数の $X_{t+v}$ と $x$ における値の差の二乗平均は $Cv$ 以下です。$B_v=W_{t+v}-W_t$ を用い、残差を五つの積分に分解します。

$$
\begin{aligned}
R_1&=\int_0^h\int_0^s(L_0a)(X_{t+u})\,du\,ds,\\
R_2&=\int_0^h\int_0^s[(L_1a)(X_{t+u})-(L_1a)(x)]\,dB_u\,ds,\\
R_3&=\int_0^h\int_0^s[(L_0b)(X_{t+u})-(L_0b)(x)]\,du\,dB_s,\\
R_4&=\int_0^h\int_0^s\int_0^u(L_0D)(X_{t+v})\,dv\,dB_u\,dB_s,\\
R_5&=\int_0^h\int_0^s\int_0^u[(L_1D)(X_{t+v})-(L_1D)(x)]\,dB_v\,dB_u\,dB_s.
\end{aligned}
$$

通常積分には Cauchy–Schwarz、確率積分には [Itô 等長性](../../../解析系/STO/STO6/index.md#thm-sto6-ito-isometry-simple)を順に適用します。定数 $C$ は $h,x$ に依存しない値へ適宜取り直すと

$$
\begin{aligned}
E_x|R_1|^2&\le Ch^4,\\
E_x|R_2|^2&\le Ch\int_0^h\int_0^s u\,du\,ds\le Ch^4,\\
E_x|R_3|^2&\le C\int_0^h s\int_0^s u\,du\,ds\le Ch^4,\\
E_x|R_4|^2&\le C\int_0^h\int_0^s u^2\,du\,ds\le Ch^4,\\
E_x|R_5|^2&\le C\int_0^h\int_0^s\int_0^u v\,dv\,du\,ds\le Ch^4.
\end{aligned}
$$

従って $R_h=\sum_{i=1}^5R_i$ に対し $E_x|R_h|^2\le5\sum_{i=1}^5E_x|R_i|^2\le Ch^4$、ゆえに $(E_x|R_h|^2)^{1/2}\le Ch^2$ です。これは**一刻みの局所評価**であり、一般 SDE の大域的な強 $3/2$ 次収束を、安定性の条件なしに主張したものではありません。
<!-- proof-end -->

**高次化の限界**：$I_{10}$ と $I_{01}$ には $Z$ とは別の乱数が必要です。多次元の非可換な拡散係数では、さらに Brown 運動間の反復積分（Lévy 面積）が現れます。スカラー GBM の簡単な補正式を多次元モデルにそのまま移すことはできません。

## 3. 厳密に検算できる強 $3/2$ 次法

ここでは高次法の強収束を一から証明するため、**ドリフトなし**の GBM に限定します。$s_0>0,\sigma>0,T>0$ とし、

$$
dS_s=\sigma S_s\,dW_s,\qquad S_0=s_0.
$$

[GBM の陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)は

$$
S_T=s_0\exp\left(\sigma W_T-\frac12\sigma^2T\right)
$$

です。ここでの GBM の線形係数は**有界ではなく**、前節の $C_b^5$ の命題をそのまま援用できません。ただし厳密な指数乗数を直接 Taylor 展開すれば三次補正を導け、以下で誤差も厳密に評価できます。一刻みの増分を $Z\sim N(0,h)$ とし、$R(\theta)=\exp(\theta Z-\theta^2h/2)$ を $\theta=0$ の周りで展開します。導関数を実際に計算すると

$$
R(0)=1,\quad R'(0)=Z,\quad R''(0)=Z^2-h,\quad R'''(0)=Z^3-3hZ.
$$

したがって $\theta=\sigma$ までの三次 Taylor 多項式が下の更新乗数です。ここでのプライムは **$\theta$ に関する**微分で、前節の $f'(x)$（状態 $x$ に関する微分）とは作用変数が異なります。作用素を形式的に代入して確認すれば $a=0,b(x)=\sigma x$ では $L_0b=L_1a=0$ となり、混合積分の項が消える構造とも一致します。

<a id="def-u3-30-cubic"></a>

<!-- formal-statement-start -->
> **定義（ドリフトなし GBM の三次 Hermite 更新）**  
> 整数 $m\ge1$、$h=T/m$ とする。時刻格子と互いに独立な Brown 増分を

$$
t_j=jh\quad(0\le j\le m),\qquad
Z_j=\Delta_jW:=W_{t_{j+1}}-W_{t_j}\sim N(0,h)
\quad(0\le j<m)
$$

> と定め、$H_0=s_0$ として

$$
H_{j+1}=H_j\left[
1+\sigma Z_j+\frac{\sigma^2}{2}(Z_j^2-h)
+\frac{\sigma^3}{6}(Z_j^3-3hZ_j)
\right]
$$

> で作る近似を、ここでは三次 Hermite 更新と呼ぶ。二次で打ち切ればドリフトなし GBM の [Milstein 更新](../U3-28/index.md#def-u3-28-milstein)、一次で打ち切れば [EM 更新](../U3-28/index.md#def-u3-28-euler)である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-30-cubic -->
**定義の確認**：$s_0=100$ 円、$\sigma=1$ 年$^{-1/2}$、$h=1/4$ 年、$Z=1/2$ 年$^{1/2}$ を代入します。$Z^2-h=0$、$Z^3-3hZ=1/8-3/8=-1/4$ だから一刻みの乗数は

$$
1+\frac12+0-\frac1{24}=\frac{35}{24}.
$$

従って $H_1=100\cdot35/24\approx145.8333$ 円です。条件付き平均の計算では $Z$ は正規変数であり、その奇数次モーメントと $E(Z^2-h)$ は0ですから、$E[H_1\mid H_0]=H_0$ となります。これはドリフト0の厳密解の平均とも一致します。
<!-- definition-example-end -->

<a id="prop-u3-30-cubic-error"></a>

<!-- formal-statement-start -->
> **命題（三次 Hermite 法の有限刻み強 MSE と正確な次数）**  
> $s_0>0,\sigma>0,T>0,m\ge1,h=T/m$ のもとで、厳密値 $S_T$ と $p=1,2,3$ 次で打ち切った終端値 $Y_m^{(p)}$ を同一 Brown 増分から構成する。$u=\sigma^2h$、$v_p(u)=\sum_{k=0}^pu^k/k!$ とすると、

$$
E[(Y_m^{(p)}-S_T)^2]
=s_0^2\left\{e^{\sigma^2T}-v_p(u)^m\right\}.
$$

> $h\downarrow0$ では

$$
E[(Y_m^{(p)}-S_T)^2]
=s_0^2e^{\sigma^2T}
\frac{\sigma^{2p+2}T}{(p+1)!}\,h^p+O(h^{p+1}).
$$

> したがって強 $L^2$ 次数は $p/2$、特に三次 Hermite 更新は**正確に強 $3/2$ 次**である。
<!-- formal-statement-end -->

**見取り図**：確率指数の一刻み乗数 $R=e^{\sigma Z-\sigma^2h/2}$ と多項式 $P_p$ の二乗期待値・相互積を直接求めます。時刻ごとの増分は独立なので、一刻みの結果を $m$ 乗すれば大域的な MSE になります。ここでは一般高次収束定理に頼りません。

<!-- proof-start -->
### 証明

$Z\sim N(0,h)$ とおき、$Q_0=1,Q_1=Z,Q_2=Z^2-h,Q_3=Z^3-3hZ$ とします。正規変数のモーメント $EZ^2=h,EZ^4=3h^2,EZ^6=15h^3$、奇数次モーメント0を用いて展開すると、$k\ne\ell$ で $E(Q_kQ_\ell)=0$、また

$$
EQ_0^2=1,\quad EQ_1^2=h,\quad EQ_2^2=2h^2,\quad EQ_3^2=6h^3.
$$

例えば $EQ_2Q_3=E[(Z^2-h)(Z^3-3hZ)]=0$ は奇関数性から、$EQ_1Q_3=EZ^4-3hEZ^2=0$ は四次モーメントから確認できます。よって $P_p=\sum_{k=0}^p\sigma^kQ_k/k!$ について

$$
EP_p^2=\sum_{k=0}^p\frac{\sigma^{2k}h^k}{k!}=v_p(u).
$$

正規の指数積率 $Ee^{cZ}=e^{c^2h/2}$ を $c$ で繰り返し微分すると

$$
E[e^{cZ}Z]=ch\,e^{c^2h/2},\quad
E[e^{cZ}(Z^2-h)]=c^2h^2e^{c^2h/2},
$$

$$
E[e^{cZ}(Z^3-3hZ)]=c^3h^3e^{c^2h/2}.
$$

$c=\sigma$ を代入して $R=e^{\sigma Z-\sigma^2h/2}$ とすると、$E(RQ_k)=\sigma^kh^k$（$0\le k\le3$）。従って

$$
E(RP_p)=v_p(u),\qquad E(R^2)=e^u.
$$

独立な $m$ 個の増分の乗数を掛ければ

$$
ES_T^2=s_0^2e^{um},\quad
E[(Y_m^{(p)})^2]=s_0^2v_p(u)^m,\quad
E[S_TY_m^{(p)}]=s_0^2v_p(u)^m.
$$

二乗差を展開すると主張の有限刻み MSE が得られます。$e^u-v_p(u)=u^{p+1}/(p+1)!+O(u^{p+2})$、$v_p(u)>0$ より

$$
\log v_p(u)
=u-\frac{u^{p+1}}{(p+1)!}+O(u^{p+2}).
$$

$m=T/h$ を掛け、$u=\sigma^2h$ として

$$
m\log v_p(u)=\sigma^2T-
\frac{\sigma^{2p+2}T}{(p+1)!}h^p+O(h^{p+1}).
$$

指数関数に戻して $e^{\sigma^2T}-v_p(u)^m=e^{\sigma^2T}\{\sigma^{2p+2}Th^p/(p+1)!+O(h^{p+1})\}$ を得ます。先頭係数は $s_0,\sigma,T>0$ で正なので、平方根を取った強誤差は正確に $h^{p/2}$ に比例します。
<!-- proof-end -->

この証明は**ドリフトなしのスカラー乗法雑音**に限定しています。$a\ne0$ の SDE では前節の混合積分も必要で、単に三次の項だけを増やしても同じ次数になりません。また数値乗数は三次多項式なので、負に大きい $Z$ では負となり、厳密 GBM の正値性を保証しません。

## 4. 弱高次と predictor–corrector の落とし穴

弱誤差は、[強・弱誤差の定義](../U3-29/index.md#def-u3-29-strong-weak)に従って試験関数ごとに評価します。前節のドリフトなしモデルでは、すべての $p=1,2,3$ について $EP_p=1$ です。従って $\varphi(s)=s$ に対する弱誤差は**全刻みで0**です。一方 $\varphi(s)=s^2$ では

$$
E[(Y_m^{(p)})^2]-E[S_T^2]
=-s_0^2\left\{e^{\sigma^2T}-v_p(u)^m\right\}=O(h^p).
$$

これはこの特定の $\varphi$ に対する弱 $p$ 次であって、すべての滑らかな支払やデジタル支払に対する一般命題ではありません。一般の弱2次近似を目指す場合は、例えば $a,b,f\in C_b^6(\mathbb R)$ の下、[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $f,L_0f,L_0^2f$ に順に用いて期待値を取ります。確率積分は平均0で、積分を一回ずつ代入すると

$$
E_x[f(X_{t+h})]=f(x)+hL_0f(x)+\int_0^h(h-s)E_x[(L_0^2f)(X_{t+s})]ds.
$$

$E_x[(L_0^2f)(X_{t+s})]-(L_0^2f)(x)=\int_0^s E_x[(L_0^3f)(X_{t+v})]dv=O(s)$ なので、時間積分の主項は $h^2L_0^2f(x)/2$ となります。したがって

$$
E[f(X_{t+h})\mid X_t=x]
=f(x)+hL_0f(x)+\frac{h^2}{2}L_0^2f(x)+O(h^3)
$$

という一刻みの条件付き期待値の展開が得られます。ここで $L_0^2f=L_0(L_0f)$、$L_0^3f=L_0(L_0^2f)$ で、微分はすべて状態変数 $x$ に関するものです。数値法側でも右辺の係数と一致することを検査し、大域的なモーメント安定性などを確保して初めて弱高次を主張できます。

安易な予測修正法（predictor–corrector）を試してみます。$dS=\sigma S\,dW$ の Itô 方程式で予測値を $S^*=x+\sigma xZ$ とし、拡散係数を始点と予測値で平均するだけの更新は

$$
\begin{aligned}
Y_{\rm naive}
&=x+\frac12\{\sigma x+\sigma S^*\}Z\\
&=x\left(1+\sigma Z+\frac12\sigma^2Z^2\right).
\end{aligned}
$$

<a id="prop-u3-30-naive-heun"></a>

<!-- formal-statement-start -->
> **命題（Itô 方程式への無補正 Heun 更新は平均が一致しない）**  
> $s_0>0,\sigma>0,T>0$ とし、ドリフトなし GBM に上記の $Y_{\rm naive}$ を $m=T/h$ 回適用した終端値を $N_m$ とする。このとき

$$
E[N_m]=s_0(1+\sigma^2h/2)^m
\longrightarrow s_0e^{\sigma^2T/2}\ne s_0=E[S_T].
$$

> 従ってこの更新は $\varphi(s)=s$ に対して弱収束しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$EZ=0,EZ^2=h$ なので、一刻みの乗数の平均は $1+\sigma^2h/2$。過去の値と次の独立増分の乗数の期待値を分離して $m$ 乗します。[GBM 陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)と正規指数積率から厳密解の平均は $s_0$ です。最後に $\log(1+\sigma^2h/2)/h\to\sigma^2/2$ を使います。差は刻みを細かくしても消えません。
<!-- proof-end -->

原因は [Itô–Stratonovich 変換](../../../解析系/STO/STO7/index.md#thm-sto7-ito-stratonovich-conversion)の二次変動補正を忘れたことです。拡散係数が $b(x)=\sigma x$ なら Stratonovich 側のドリフトは $a_{\rm S}(x)=a(x)-b(x)b'(x)/2=-\sigma^2x/2$。予測修正法の形式を変えずに Itô の式へ使うことはできません。修正しても自動的に弱2次・強 $3/2$ 次になるとは限りません。

## 5. 平均二乗安定性は収束次数とは別

長時間の金融リスクモデルで重要なのは、刻み $h$ を固定して $j$ 回更新したときの二乗モーメントが増えるかどうかです。実数 $\lambda,\nu$ に対し、

$$
dX_t=\lambda X_t\,dt+\nu X_t\,dW_t,\qquad X_0=x_0\ne0
$$

を調べます。$\lambda$ の単位は年$^{-1}$、$\nu$ は年$^{-1/2}$ です。

<a id="def-u3-30-ms-stability"></a>

<!-- formal-statement-start -->
> **定義（平均二乗漸近安定性）**  
> 実数係数 $\lambda,\nu$ と非零の初期値 $x_0$ を持つ Itô SDE

$$
dX_t=\lambda X_t\,dt+\nu X_t\,dW_t,\qquad X_0=x_0
$$

> の解が平均二乗漸近安定であるとは、次の極限が0になることをいう。

$$
\lim_{t\to\infty}E|X_t|^2=0.
$$

> また刻み $h>0$ の数値法 $Y_{j+1}=F_jY_j$ で、$Y_0=x_0$、乗数 $F_j$ が独立同分布かつ過去と独立である場合、数値法が平均二乗漸近安定であるとは次を満たすことをいう。

$$
\lim_{j\to\infty}E|Y_j|^2=0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-30-ms-stability -->
**定義の確認**：$\lambda=-1$ 年$^{-1}$、$\nu=1$ 年$^{-1/2}$ とします。[GBM 陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)の係数に代入すると $X_t=x_0\exp(-3t/2+W_t)$ で、$E e^{2W_t}=e^{2t}$ だから $E|X_t|^2=x_0^2e^{-t}\to0$ です。一方、$h=1$ 年の [Milstein 更新](../U3-28/index.md#def-u3-28-milstein)では $Z\sim N(0,1)$ として乗数が $F=1-1+Z+(Z^2-1)/2$ です。$EZ^2=1,E(Z^2-1)^2=2,E[Z(Z^2-1)]=0$ より

$$
EF^2=1+\frac14\cdot2=\frac32.
$$

各時刻の乗数は独立で過去の近似値とも独立なので $E|Y_j|^2=x_0^2(3/2)^j\to\infty$ となります。二つの定義条件を、長時間極限で直接判定できました。
<!-- definition-example-end -->

<a id="prop-u3-30-ms-region"></a>

<!-- formal-statement-start -->
> **命題（線形 SDE の厳密解・EM・Milstein の平均二乗安定領域）**  
> $\lambda,\nu\in\mathbb R$、$x_0\ne0$、$h>0$ とする。厳密 SDE は $2\lambda+\nu^2<0$ のとき、かつそのときに限り平均二乗漸近安定である。EM およびスカラー Milstein 更新の二乗増幅率は

$$
G_{\rm EM}(h)=1+(2\lambda+\nu^2)h+\lambda^2h^2,
$$

$$
G_{\rm Mil}(h)=1+(2\lambda+\nu^2)h+
\left(\lambda^2+\frac{\nu^4}{2}\right)h^2.
$$

> 数値法はそれぞれ $G(h)<1$ のとき、かつそのときに限り平均二乗漸近安定である。特に $2\lambda+\nu^2<0$ の場合、EM は $0<h<-(2\lambda+\nu^2)/\lambda^2$、Milstein は $0<h<-(2\lambda+\nu^2)/(\lambda^2+\nu^4/2)$ で安定である。
<!-- formal-statement-end -->

**見取り図**：[GBM 陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)で厳密解の二乗指数を読み、数値乗数は正規モーメントを使って二乗します。各段が独立なので、長時間での増幅は $G(h)^j$ だけを判定すればよいのです。

<!-- proof-start -->
### 証明

[GBM 陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)を $\mu=\lambda,\sigma=\nu$ に適用すると、正規指数積率から

$$
EX_t^2=x_0^2 e^{(2\lambda+\nu^2)t}.
$$

指数の係数が負のときだけ $t\to\infty$ で0となります。EM 乗数は $F_E=1+\lambda h+\nu Z$。$EZ=0,EZ^2=h$ より

$$
EF_E^2=(1+\lambda h)^2+\nu^2h.
$$

Milstein 乗数は $F_M=F_E+\frac12\nu^2(Z^2-h)$ です。$E[Z(Z^2-h)]=0$、$E[(Z^2-h)^2]=2h^2$ から交差項が消え、

$$
EF_M^2=EF_E^2+\frac14\nu^4(2h^2)
=(1+\lambda h)^2+\nu^2h+\frac12\nu^4h^2.
$$

過去の $Y_j$ と新しい $F_j$ は独立だから $EY_j^2=x_0^2G(h)^j$。$G(h)\ge0$ なので、$G(h)<1$ と0への収束は同値です。$2\lambda+\nu^2<0$ なら $\lambda<0$、従って正の $\lambda^2$ および $\lambda^2+\nu^4/2$ で不等式 $G(h)-1<0$ を割って、二つの刻み範囲を得ます。
<!-- proof-end -->

この結果を比較表にすると、安定と不安定の境界が具体的になります。$\lambda=-1$ 年$^{-1}$、$\nu=1$ 年$^{-1/2}$ に固定し、値は**一刻みの二乗増幅率**です。

| $h$（年） | 厳密 $e^{-h}$ | EM の $G$ | Milstein の $G$ | 判定 |
|---:|---:|---:|---:|---|
| $1$ | $0.367879$ | $1.000000$ | $1.500000$ | EM は減衰せず、Milstein は発散 |
| $1/2$ | $0.606531$ | $0.750000$ | $0.875000$ | 両方式が減衰 |
| $1/4$ | $0.778801$ | $0.812500$ | $0.843750$ | 両方式が減衰 |

EM の安定範囲は $0<h<1$ 年、Milstein は $0<h<2/3$ 年です。このモデルでは高い強次数を持つ Milstein の方が、安定な刻み範囲は**狭い**のです。境界 $G=1$ は「不変」であって「0へ収束」ではないため、安定に含めません。

## 6. 数値実験：同一路誤差と長時間増幅を別々に測る

付属の [再現用 Python](assets/ito_taylor_stability.py) は標準ライブラリだけで動作します。固定乱数種の同じ Brown 増分から、ドリフトなし GBM の厳密値、EM、Milstein、三次 Hermite を更新し、同一路二乗誤差の標本平均と上の**有限刻み理論 MSE**を並べます。また平均二乗安定領域は**乱数実験に依存しない**理論増幅率を出力します。

~~~bash
python textbook/volumes/dream_thater/応用系/U/U3-30/assets/ito_taylor_stability.py --paths 20000
python -m unittest discover -s textbook/volumes/dream_thater/応用系/U/U3-30/assets/tests
~~~

計算対象は $s_0=100$ 円、$\sigma=0.2$ 年$^{-1/2}$、$T=1$ 年、$m=8,16,32,64$ で、$P$ 下のドリフトなし検証モデルです。各 $m$ で同じ乱数を**全方式に共通**に使い、標本間は独立にします。刻みを変えた比較では理論 MSE を基準とし、有限本数の推定値の揺れを厳密な単調性と混同しません。

有限刻み理論値の計算は上の [強 MSE 命題](#prop-u3-30-cubic-error)をそのまま代入します。$v_p(u)$ が $e^u$ に非常に近いときの桁落ちを減らすため、コードは $-\,\operatorname{expm1}(m\log v_p-\sigma^2T)$ を使います。三方式とも一経路の仕事量は $O(m)$（三次法は定数倍の演算が増える）で、同じ本数 $n$ なら $O(nm)$ です。

**数値精度と費用の境界**：このモデルに限り、終端強誤差の先頭次数は EM $1/2$、Milstein $1$、三次法 $3/2$ です。[U3-29 の誤差予算](../U3-29/index.md#def-u3-29-error-budget)で既習のように、価格推定の標本誤差は別に残ります。弱高次が確認されない支払に強次数を流用して $m$ を決めないでください。

## 7. 演習（全問に詳細解答）

<a id="ex-u3-30-a1"></a>
### U3-30-A1：二重積分の補正
- Level: A

$Z\sim N(0,h)$、$I_{11}=(Z^2-h)/2$ について $EI_{11}$、$EI_{11}^2$ を求めよ。$-h$ を落とすと何が起きるか。

<!-- solution-start -->
**詳細解答**：$EZ^2=h,EZ^4=3h^2$ だから

$$
EI_{11}=(h-h)/2=0,\quad
EI_{11}^2=\{3h^2-2h^2+h^2\}/4=h^2/2.
$$

$Z^2/2$ へ置換すると期待値は $h/2$ となり、確率積分としての平均0を壊します。[二重積分の表示](#prop-u3-30-ito-integrals)の中心化 $-h$ が必要です。
<!-- solution-end -->

<a id="ex-u3-30-a2"></a>
### U3-30-A2：混合積分の追加乱数
- Level: A

$h=1$、$Z\sim N(0,1)$、$U\sim N(0,1)$ を独立とする。$I_{01}=Z/2+U/\sqrt{12}$、$I_{10}=Z/2-U/\sqrt{12}$ について、それぞれの分散、共分散、和を求めよ。

<!-- solution-start -->
**詳細解答**：[混合積分の表示](#prop-u3-30-ito-integrals)により

$$
\operatorname{Var}(I_{01})=\operatorname{Var}(I_{10})
=1/4+1/12=1/3.
$$

独立性から交差の $ZU$ は平均0なので

$$
\operatorname{Cov}(I_{01},I_{10})=1/4-1/12=1/6.
$$

和は $Z$ です。$U$ を省けば分散は $1/4$ に減り、本来の分散 $1/3$ を再現できません。
<!-- solution-end -->

<a id="ex-u3-30-a3"></a>
### U3-30-A3：作用素から係数を作る
- Level: A

$a(x)=-x,b(x)=2x$ の SDE に対し、$L_1b,L_1L_1b,L_0b,L_1a$ を求めよ。

<!-- solution-start -->
**詳細解答**：[作用素の定義](#def-u3-30-operators)へ $a'=-1,b'=2,b''=0$ を代入します。

$$
L_1b=(2x)2=4x,\qquad
L_1L_1b=(2x)\frac{d}{dx}(4x)=8x.
$$

また

$$
L_0b=(-x)2+\tfrac12(2x)^2\cdot0=-2x,\quad
L_1a=(2x)(-1)=-2x.
$$

$L_0b$ にある二階微分は $b''=0$ のため消え、$L_1L_1b$ では中間関数 $4x$ をもう一度微分する必要があります。
<!-- solution-end -->

<a id="ex-u3-30-a4"></a>
### U3-30-A4：一刻みの三次更新
- Level: A

ドリフトなし GBM で $s_0=10,\sigma=1,h=1,Z=0$ のとき、EM、Milstein、三次 Hermite の一刻み終端値を比べよ。

<!-- solution-start -->
**詳細解答**：[三次更新の定義](#def-u3-30-cubic)で $Z=0$ を代入すると、二次と三次の補正に使う式はそれぞれ

$$
Z^2-h=-1,\qquad Z^3-3hZ=0
$$

となります。よって、初期値10に掛ける EM・Milstein・三次 Hermite の乗数と終端値は順に

$$
F_E=1,\qquad Y_E=10.
$$

$$
F_M=1-\frac12=\frac12,\qquad Y_M=5.
$$

$$
F_H=1-\frac12+0=\frac12,\qquad Y_H=5.
$$

一方、[GBM 陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)から厳密乗数は $e^{-1/2}$、終端値は $10e^{-1/2}\approx6.0653$ です。この一経路では EM の誤差がほかの二方式より小さく、強誤差の**期待値としての次数**と一経路の誤差の大小は別だと分かります。
<!-- solution-end -->

<a id="ex-u3-30-a5"></a>
### U3-30-A5：平均二乗安定性の境界
- Level: A

$\lambda=-1,\nu=1$ の線形 SDE に EM と Milstein を適用する。$h=1/2$ と $h=1$ の増幅率を計算し、各刻みの長時間安定性を判定せよ。

<!-- solution-start -->
**詳細解答**：[増幅率の命題](#prop-u3-30-ms-region)に代入すると $G_E=1-h+h^2,G_M=1-h+3h^2/2$。$h=1/2$ では $G_E=3/4,G_M=7/8$ で両方とも1より小さく減衰します。$h=1$ では $G_E=1$ なので二乗平均は初期値のまま、$G_M=3/2$ なので二乗平均は $(3/2)^j$ 倍となり発散します。$G=1$ を漸近安定に含めてはいけません。
<!-- solution-end -->

<a id="ex-u3-30-b1"></a>
### U3-30-B1：三次の先頭誤差係数
- Level: B

ドリフトなし GBM で $s_0=\sigma=T=1$ とする。三次 Hermite 更新の終端強 MSE の先頭項を導き、$m=8$ と $m=32$ で理論的に期待する強 RMSE の比を求めよ（主項で比較する）。

<!-- solution-start -->
**詳細解答**：[強 MSE 命題](#prop-u3-30-cubic-error)で $p=3$ とすると

$$
E[(H_m-S_1)^2]=e\,\frac{1^8\cdot1}{4!}h^3+O(h^4)
=\frac e{24}h^3+O(h^4).
$$

従って強 RMSE の先頭項は $\sqrt{e/24}\,h^{3/2}$。$h_8=1/8,h_{32}=1/32$ の比は

$$
\frac{\mathrm{RMSE}(1/8)}{\mathrm{RMSE}(1/32)}
\sim\left(\frac{1/8}{1/32}\right)^{3/2}=4^{3/2}=8.
$$

これは漸近式による予測であり、有限刻みの厳密な比を8と断定するものではありません。
<!-- solution-end -->

<a id="ex-u3-30-b2"></a>
### U3-30-B2：強高次でも弱次数を一律に言えない
- Level: B

ドリフトなし GBM の $p=1,2,3$ の更新について、$\varphi(s)=s$ と $\varphi(s)=s^2$ の弱誤差を計算せよ。$\varphi(s)=\boldsymbol{1}_{\{s>K\}}$ に同じ結論を無条件で適用できるか述べよ。

<!-- solution-start -->
**詳細解答**：$EP_p=1$ は $EZ=0,E(Z^2-h)=0,E(Z^3-3hZ)=0$ によります。各段の独立性より $EY_m^{(p)}=s_0$、厳密値も $ES_T=s_0$ なので線形支払の弱誤差は0です。

二乗支払では [強 MSE 命題の証明](#prop-u3-30-cubic-error)から $E[(Y_m^{(p)})^2]=s_0^2v_p(u)^m$、$ES_T^2=s_0^2e^{\sigma^2T}$。差は

$$
s_0^2\{v_p(u)^m-e^{\sigma^2T}\}
=-s_0^2e^{\sigma^2T}
\frac{\sigma^{2p+2}T}{(p+1)!}h^p+O(h^{p+1}).
$$

従って二乗支払では弱次数が正確に $p$ です。デジタル支払は行使価格 $K$ で不連続であり、この多項式モーメントの計算だけでは期待値の誤差次数を確定できません。
<!-- solution-end -->

<a id="ex-u3-30-b3"></a>
### U3-30-B3：predictor–corrector の期待値を点検
- Level: B

$S_0=1,\sigma=1,T=1$ のドリフトなし Itô GBM について、拡散係数だけを平均する無補正 Heun 法を $m$ 回反復した期待値を導き、$h\to0$ の極限と厳密平均を比較せよ。どの補正を忘れたかも説明せよ。

<!-- solution-start -->
**詳細解答**：予測値 $x^*=x+xZ$ を使うと、無補正 Heun の乗数は $1+Z+Z^2/2$。独立な増分について $EZ=0,EZ^2=h$ だから平均は $1+h/2$。従って

$$
E N_m=(1+h/2)^{1/h}.
$$

$\log(1+h/2)/h=1/2-h/8+O(h^2)$ だから $EN_m\to e^{1/2}$。一方 [GBM 陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)は $S_1=e^{W_1-1/2}$、指数積率から $ES_1=1$。偏りは $e^{1/2}-1$ に残ります。[Itô–Stratonovich 変換](../../../解析系/STO/STO7/index.md#thm-sto7-ito-stratonovich-conversion)の $-bb'/2=-x/2$ というドリフト補正を忘れたことが原因です。
<!-- solution-end -->

<a id="ex-u3-30-b4"></a>
### U3-30-B4：安定刻みと誤差許容差を切り分ける
- Level: B

$\lambda=-2,\nu=1$ の線形 SDE について、厳密モデルの平均二乗安定条件を確かめ、EM と Milstein の安定刻み上限を求めよ。$h=1$ 年での二乗増幅率も計算せよ。

<!-- solution-start -->
**詳細解答**：厳密指数の係数は $2(-2)+1^2=-3<0$。[安定領域の命題](#prop-u3-30-ms-region)により EM は

$$
0<h<-\frac{-3}{(-2)^2}=\frac34,
$$

Milstein は

$$
0<h<-\frac{-3}{4+1/2}=\frac23.
$$

$h=1$ では $G_E=1-3+4=2$、$G_M=1-3+4+1/2=5/2$ で、いずれも不安定です。有限時間の強誤差を小さくする刻み選択と、長時間の安定上限を守ることは別の条件です。
<!-- solution-end -->

<a id="ex-u3-30-c1"></a>
### U3-30-C1：高次化と安定性の統合設計
- Level: C

ドリフトなし GBM $dS=\sigma S\,dW$（$s_0>0,\sigma>0,T>0$）を同一 Brown 増分で近似し、線形安定性テストは別の SDE $dX=-X\,dt+X\,dW$（年単位）で行う。

1. $I_{11}$、$I_{111}$ を $Z$ で表し、三次法の乗数を導け。
2. 三次法の一刻み $E P_3^2$、$E(RP_3)$ を計算し、$m$ 刻みの強 MSE の主項と強次数を求めよ。
3. $\varphi(s)=s$ と $\varphi(s)=s^2$ の弱誤差を区別せよ。
4. 安定性モデルで $h=1/2$ と $h=1$ を EM・Milstein で判定し、より強次数が高い方式の安定範囲がどうなったか説明せよ。
5. $n$ 本の独立経路で終端支払を平均するとき、時間離散化と標本の誤差をどう区別するか述べよ。

<!-- solution-start -->
**詳細解答**：

1. [反復積分の命題](#prop-u3-30-ito-integrals)で、二つの積分は

   $$
   I_{11}=\frac{Z^2-h}{2},\qquad
   I_{111}=\frac{Z^3-3hZ}{6}
   $$

   となります。$a=0,b(x)=\sigma x$ を [作用素の定義](#def-u3-30-operators)に代入すると、$L_1b=\sigma^2x$、$L_1L_1b=\sigma^3x$、$L_1a=L_0b=0$ です。

   ただし GBM の係数 $b(x)=\sigma x$ は有界ではありません。従って $C_b^5$ を仮定する [一般の局所展開](#prop-u3-30-taylor-terms)を直接適用しません。第3節の厳密な一刻み乗数 $R(\theta)=\exp(\theta Z-\theta^2h/2)$ を、$\theta=0$ で三回微分します。その導関数 $Z$、$Z^2-h$、$Z^3-3hZ$ を用い、$\theta=\sigma$ の三次 Taylor 多項式として

   $$
   P_3=1+\sigma Z+\frac{\sigma^2}{2}(Z^2-h)
   +\frac{\sigma^3}{6}(Z^3-3hZ)
   $$

   を得ます。
2. $u=\sigma^2h$ と置くと、正規の偶数次モーメントと直交性から

$$
EP_3^2=1+u+\frac{u^2}{2}+\frac{u^3}{6}=v_3(u).
$$

   $R=e^{\sigma Z-\sigma^2h/2}$ の指数積率を微分して $E(RZ)=\sigma h$、$E[R(Z^2-h)]=\sigma^2h^2$、$E[R(Z^3-3hZ)]=\sigma^3h^3$ と得るので $E(RP_3)=v_3(u)$ です。独立な $m$ 個の乗数の積より

$$
\begin{aligned}
E[(H_m-S_T)^2]
&=s_0^2[e^{\sigma^2T}-v_3(u)^m]\\
&=\frac{s_0^2e^{\sigma^2T}\sigma^8T}{24}h^3+O(h^4).
\end{aligned}
$$

   正の主係数の平方根から強次数は $3/2$ です。
3. $EP_3=1$ なので $EH_m=s_0=ES_T$。線形支払の弱誤差は0です。二乗支払の偏りは $s_0^2[v_3(u)^m-e^{\sigma^2T}]$ で負、弱次数は正確に3です。ほかの支払について次数は未判定です。
4. [安定性の命題](#prop-u3-30-ms-region)に $\lambda=-1,\nu=1$ を代入して $G_E=1-h+h^2,G_M=1-h+3h^2/2$。$h=1/2$ で $3/4,7/8$ はともに1未満、$h=1$ で $1,3/2$ はともに漸近安定でありません。強次数の高い Milstein の安定範囲 $0<h<2/3$ は EM の $0<h<1$ より狭いと分かります。
5. [時間離散化と独立標本平均の分解](../U3-29/index.md#prop-u3-29-mc-decomposition)を二乗可積分な支払 $P_h=\varphi(Y_m)$ に適用すると、$V=E\varphi(S_T)$、$\widehat V=n^{-1}\sum_{i=1}^nP_h^{(i)}$ に対し

$$
E(\widehat V-V)^2
=\{E P_h-V\}^2+\operatorname{Var}(P_h)/n.
$$

   前項は時間刻みと支払に依存する離散化バイアスの二乗で、後項は独立経路数 $n$ による標本分散です。強次数 $3/2$ を根拠にデジタル支払の弱バイアス次数を勝手に定めず、価格付けなら測度と割引も別途指定します。
<!-- solution-end -->

## 8. まとめと次講

反復 Itô 積分は**どの積分を何階層重ねたか**で高次補正を決めます。ドリフトなし GBM では三次 Hermite 更新が正確に強 $3/2$ 次になることを、有限刻みの二乗平均誤差から直接示しました。一方、無補正の predictor–corrector は Itô の平均を壊し、Milstein の安定刻みは EM より狭くなる線形モデルもあります。**高次・弱精度・長時間安定性は三つの別の検証課題**です。

続く U3-31 では、このような格子ごとの離散化誤差と計算費用を利用し、粗格子と細格子を同じ Brown 運動で結合する Multilevel Monte Carlo（MLMC）を構成します。
