# HPDE11 局所Cauchy問題の存在

[HPDE10の有限伝播定理](../HPDE10/index.md#thm-hpde10-finite-propagation)は「解があれば影響は光円錐を越えない」と保証しました。しかし評価だけでは解は生まれません。今回は有限次元の常微分方程式から近似解を**作り**、近似の次数に依存しないエネルギー評価で極限を取り、滑らかな局所解を得ます。次のHPDE12–14の基本解やHadamard構成には頼りません。

核心は、二階の波動方程式を一次系へ変形するとき、時間方向に**正定値のエネルギー**を持つ系を作ることです。単に微分の階数を下げただけでは、近似解の収束に必要な評価は保証されません。

## 1. 初期面の近くで波動作用素を読む

時間向き付きの滑らかなLorentz多様体 $(M,g)$（符号 $(-,+,\ldots,+)$）上の、有限ランクの実または複素ベクトル束 $E\to M$ と滑らかな [normally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic) $P:\Gamma(E)\to\Gamma(E)$ を扱います。$\Sigma$ は滑らかな空間的超曲面、$N$ は未来向き単位法線です。必要なのは局所的な非特性性であり、現段階で大域双曲性を要求しません。

局所存在を定式化する前に、係数がどこから現れるかを確かめます。$p\in\Sigma$ を固定し、$\Sigma$ 内の座標 $x=(x^1,\ldots,x^n)$ を選びます。各点から初速度 $N$ の時間的測地線を出し、その固有時間を $t$ とします。測地線の局所存在と[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により $p$ の近くで $(t,x)$ は座標になります。$\partial_t$ は測地線の接ベクトルなので $\nabla_{\partial_t}\partial_t=0$ かつ $g(\partial_t,\partial_t)=-1$。さらに座標ベクトル場が可換であることから

$$
\begin{aligned}
\partial_t g(\partial_t,\partial_i)
&=g(\nabla_{\partial_t}\partial_t,\partial_i)
 +g(\partial_t,\nabla_{\partial_t}\partial_i)\\
&=g(\partial_t,\nabla_{\partial_i}\partial_t)
 =\tfrac12\partial_i g(\partial_t,\partial_t)=0.
\end{aligned}
$$

$t=0$ で $\partial_t=N$ と $\partial_i\in T\Sigma$ は直交するので、時間方向に沿って直交が保たれます。こうして局所的に

$$
g=-dt^2+h_{ij}(t,x)\,dx^i dx^j,\qquad
(h_{ij})>0,\qquad N|_\Sigma=\partial_t
$$

となります。$h=(h_{ij})$ が正定値なのは各 $t$ の小さな切断が空間的だからです。大域的なこの形は主張しません。[HPDE6の非特性性](../HPDE6/index.md#prop-hpde6-noncharacteristic)は、時間方向の二階係数を解けることに対応します。

束をこの座標近傍で枠 $e_1,\ldots,e_r$ によって自明化し、切断を $\mathbb K^r$ 値関数で表します（$\mathbb K=\mathbb R$ または $\mathbb C$）。主シンボルの等式より、$P$ の二階主部は $\partial_t^2-h^{ij}\partial_i\partial_j$ に単位行列を掛けたものです。束の接続と枠の微分は**一階以下**に入るので、局所方程式は

$$
Lu:=\partial_t^2u-a^{ij}\partial_i\partial_j u+
b^0\partial_tu+b^i\partial_i u+cu=F,
\qquad a^{ij}=h^{ij}
$$

と書けます。$a=(a^{ij})$ は実対称正定値、$b^\mu,c$ は滑らかな $r\times r$ 行列です。繰返した空間添字は和を取ります。時間・空間を縮小した閉直方体上では、連続性によってある $\lambda,\Lambda>0$ が存在し

$$
\lambda|\xi|^2\le a^{ij}(t,x)\xi_i\xi_j\le\Lambda|\xi|^2
$$

が全点・全 $\xi\in\mathbb R^n$ で成立します。この**一様性はコンパクトな小領域でだけ**用います。

### 初期速度の枠による読み替え

[HPDE6のCauchyデータ](../HPDE6/index.md#def-hpde6-cauchy-data)は幾何学的に $u|_\Sigma=u_0,\ \nabla_Nu|_\Sigma=u_1$ でした。選んだ局所枠では $\nabla_{\partial_t}u=\partial_tu+\omega_tu$ なので、一次系に渡す速度は

$$
\partial_tu(0,x)=u_1(x)-\omega_t(0,x)u_0(x).
$$

ここで $\omega_t$ は接続の $r\times r$ 行列です。$u_1$ をそのまま $\partial_tu$ と置くと、一般には初期条件が別物になります。

## 2. 二階方程式を一次対称双曲系にする

$u$ の時間微分だけでなく、空間微分も未知量として並べます。$v_0=\partial_tu,\ v_i=\partial_i u$ と考え、まずは独立な未知関数として解きます。最後に本当に微分と一致することを確認します。

<a id="def-hpde11-first-order-reduction"></a>
<!-- formal-statement-start -->
> **定義（波動方程式の一次還元）**  
> $a=(a^{ij})$ を実対称正定値、$b^\mu,c$ を行列値係数とする二階方程式 $Lu=F$ に対し、$U=(v_0,v_1,\ldots,v_n,u)^T$ の成分が次の系を満たすとき、$Lu=F$ の一次還元系とする。

$$
\begin{cases}
\partial_tv_0-a^{ij}\partial_iv_j
=F-b^0v_0-b^iv_i-cu,\\
\partial_tv_i-\partial_iv_0=0\quad(1\le i\le n),\\
\partial_tu-v_0=0.
\end{cases}
$$
<!-- formal-statement-end -->

最上段に $v_j=\partial_j u$ を代入すれば $Lu=F$ が戻ります。逆方向は単なる代入では足りません。$C_i=v_i-\partial_i u$ とすると下二段から

$$
\partial_tC_i=\partial_tv_i-\partial_i(\partial_tu)
=\partial_iv_0-\partial_iv_0=0.
$$

よって初期値 $C_i(0)=0$ であれば全時間で $C_i=0$。この**拘束の伝播**が二階問題と一次系を結びます。

一次系を $\partial_tU+A^j\partial_jU=BU+\mathcal F$ と書き、空間成分を $(v_i)$ の順に並べれば、$A^j$ の非零成分は

$$
(A^j)_{0k}=-a^{jk}I_r,\qquad
(A^j)_{i0}=-\delta_i^jI_r
$$

だけです（$0\le j$ とせず、$j=1,\ldots,n$）。対角重み

$$
H=\operatorname{diag}(I_r,\ a^{ik}I_r,\ I_r)
$$

は、真ん中が $n\times n$ のブロック行列を意味します。$a$ が正定値なので $H$ は正定値Hermite行列です。積 $HA^j$ の $0k$ 成分は $-a^{jk}I_r$、$i0$ 成分は $-a^{ij}I_r$ で、$a^{ij}=a^{ji}$ から

$$
(HA^j)^*=HA^j
$$

です。$B$ には下位係数と末行の $v_0$ が入り、$\mathcal F=(F,0,\ldots,0)^T$ です。

<a id="prop-hpde11-positive-symmetrizer"></a>
<!-- formal-statement-start -->
> **命題（正定値時間行列と対称化）**  
> 実対称正定値の滑らかな $a^{ij}$ と滑らかな行列値 $b^\mu,c$ を持つ上記の一次還元系では、$H$ は正定値で $HA^j$ はHermiteである。$S=H^{1/2}$ と $V=SU$ を用いると、同系は

$$
\partial_tV+C^j\partial_jV=DV+G,\qquad
C^j=SA^jS^{-1}=(C^j)^*,\quad G=S\mathcal F
$$

> という、時間微分係数が単位行列で空間行列がHermiteの一次系になる。$D$ は $S$ と係数の一階微分から決まる滑らかな行列である。
<!-- formal-statement-end -->

### 証明の見取り図

$H$ を使って直接Galerkin投影すると、変係数の $H$ と投影が可換でないためエネルギー計算に誤差が残ります。先に $S$ で変数を変え、通常の $L^2$ 内積で対称な係数へ移すのが肝心です。

<!-- proof-start -->
### 証明

$H$ は各対角ブロックが正定値であり、$a^{ij}$ の一様正定値性から固有値は正の範囲にあります。実対称正定値行列の滑らかな平方根 $S$ とその逆を局所的に取り、$U=S^{-1}V$ を元の系へ代入します。

$$
S^{-1}\partial_tV-S^{-1}(\partial_tS)S^{-1}V
+A^jS^{-1}\partial_jV
-A^jS^{-1}(\partial_jS)S^{-1}V
=BS^{-1}V+\mathcal F.
$$

左から $S$ を掛ければ

$$
D=(\partial_tS)S^{-1}
+C^j(\partial_jS)S^{-1}+SBS^{-1}
$$

を得ます。$HA^j=(A^j)^*H$ と $H=S^2$ より

$$
(C^j)^*=(S^{-1})^*(A^j)^*S^*
=S^{-1}(A^j)^*S
=SA^jS^{-1}=C^j.
$$

$H$ は実対称のブロックから成るので $S^*=S$ を使用しました。複素束でも $b^\mu,c$ の自己随伴性は不要で、これらは $D$ に吸収されます。$\square$
<!-- proof-end -->

例えば $n=r=1,\ a=4$ なら $A^1=\left(\begin{smallmatrix}0&-4&0\\-1&0&0\\0&0&0\end{smallmatrix}\right)$、$H=\operatorname{diag}(1,4,1)$、$S=\operatorname{diag}(1,2,1)$ です。実際

$$
C^1=SA^1S^{-1}
=\begin{pmatrix}0&-2&0\\-2&0&0\\0&0&0\end{pmatrix}
$$

は対称で、対応する伝播速度の絶対値は $2$ です。行列の対称性は数値的な偶然ではなく、元の $a>0$ から導きました。

## 3. 有限次元Galerkin近似を本当に構成する

局所係数のまま切断して境界条件を勝手に与えると、元の初期値問題とは別問題になります。そこでまず**空間を平坦なトーラス $\mathbb T^n=(\mathbb R/2\pi\mathbb Z)^n$ にした補助問題**を解きます。これは局所的な座標箱の外へ滑らかに係数を延長した後で使う道具であり、時空そのものが周期的であるとの仮定ではありません。

<a id="thm-hpde11-torus-symmetric-system"></a>
<!-- formal-statement-start -->
> **定理（滑らかな対称双曲系の存在一意性）**  
> 有限区間 $I=[-T,T]$ 上の $\mathbb T^n$ で、$C^j(t,x)$ を滑らかなHermite行列値関数、$D(t,x)$ を滑らかな行列値関数、$G(t,x)$ を滑らかなベクトル値関数とする。任意の滑らかな初期値 $V(0,x)=V_{\mathrm{in}}(x)$ に対し

$$
\partial_tV+C^j\partial_jV=DV+G
$$

> は $I\times\mathbb T^n$ 上に唯一の滑らかな解を持つ。各整数 $s\ge0$ に対し、係数の有限階微分に依存する定数 $K_s$ が存在して

$$
\|V(t)\|_{H^s}\le e^{K_s|t|}
\left(\|V_{\mathrm{in}}\|_{H^s}
+\int_{\min(0,t)}^{\max(0,t)}\|G(\tau)\|_{H^s}\,d\tau\right)
$$

> が成立する（負時刻側では時間反転で評価する）。
<!-- formal-statement-end -->

この定理のポイントは、正しい解を仮定して評価するのではなく、各有限周波数で常微分方程式を解いた後、その評価を**次数に依存せず**証明することです。

### 証明の見取り図

Fourier射影 $\Pi_N$ は $|k|\le N$ の有限個の指数関数だけを残します。有限次元系を解き、$C^j=(C^j)^*$ のおかげで最高階空間微分を部分積分します。$\Pi_N$ が直交射影かつ微分と可換であることを使えば、$\Pi_N$ と係数が可換だとは仮定する必要はありません。高階評価・コンパクト埋込み・時間方向の評価で滑らかな極限を得ます。

<!-- proof-start -->
### 証明

**(1) 近似解の生成。** $L^2(\mathbb T^n)$ のFourier基底 $e^{ik\cdot x}$ を使い、$\Pi_N$ を $|k|\le N$ の直交射影とします。有限次元空間の未知量 $V_N$ を

$$
\partial_tV_N=-\Pi_N(C^j\partial_jV_N)
+\Pi_N(DV_N+G),\qquad
V_N(0)=\Pi_NV_{\mathrm{in}}
$$

で定めます。右辺は有限個のFourier係数について、$t$ に連続な係数を持つ線形常微分方程式です。従って有限区間全体で唯一の解が存在します。$\Pi_N$ は空間微分と可換です。

**(2) $L^2$ 評価。** $\Pi_N V_N=V_N$ で射影が自己随伴なので、右辺と $V_N$ の内積で射影を外せます。複素の場合は実部を取ります。

$$
\frac12\frac{d}{dt}\|V_N\|_2^2
=-\operatorname{Re}\int_{\mathbb T^n}V_N^*C^j\partial_jV_N\,dx
+\operatorname{Re}\langle V_N,DV_N+G\rangle.
$$

$C^j$ がHermiteで周期境界項が消えるため

$$
\begin{aligned}
2\operatorname{Re}(V_N^*C^j\partial_jV_N)
&=\partial_j(V_N^*C^jV_N)-V_N^*(\partial_jC^j)V_N,\\
-\operatorname{Re}\int V_N^*C^j\partial_jV_N
&=\frac12\int V_N^*(\partial_jC^j)V_N.
\end{aligned}
$$

係数の上界と $2ab\le a^2+b^2$ から

$$
\frac{d}{dt}\|V_N\|_2^2
\le K_0\|V_N\|_2^2+2\|V_N\|_2\|G\|_2.
$$

零ノルムの点では $\sqrt{\|V_N\|_2^2+\varepsilon^2}$ を微分して $\varepsilon\downarrow0$ とすれば、[Grönwallの不等式](../HPDE8/index.md#lem-hpde8-gronwall)で所望の $s=0$ 評価になります。定数は $N$ と無関係です。

**(3) 高階評価。** 多重指数 $\alpha$（$|\alpha|\le s$）について $\partial^\alpha$ を近似方程式に作用させると、$\Pi_N$ と微分の可換性から

$$
\begin{aligned}
\partial_t\partial^\alpha V_N
+\Pi_N(C^j\partial_j\partial^\alpha V_N)
&=\Pi_N\bigl(D\partial^\alpha V_N+\partial^\alpha G+R_\alpha\bigr),\\
R_\alpha
&=-\sum_{0<\beta\le\alpha}{\alpha\choose\beta}
(\partial^\beta C^j)\partial_j\partial^{\alpha-\beta}V_N\\
&\quad+\sum_{0<\beta\le\alpha}{\alpha\choose\beta}
(\partial^\beta D)\partial^{\alpha-\beta}V_N.
\end{aligned}
$$

$|\beta|\ge1$ なら $\partial_j\partial^{\alpha-\beta}V_N$ の階数は $1+|\alpha|-|\beta|\le s$。従って一階高い未知微分を失わず、滑らかな係数から

$$
\sum_{|\alpha|\le s}\|R_\alpha\|_2
\le c_s\|V_N\|_{H^s}
$$

と評価できます。各 $\partial^\alpha V_N$ に対して(2)と同じ部分積分を行い、有限個の $\alpha$ について加えると

$$
\frac{d}{dt}\|V_N\|_{H^s}
\le K_s\|V_N\|_{H^s}+\|G\|_{H^s}
$$

が得られます。$H^s$ ノルムは $\sum_{|\alpha|\le s}\|\partial^\alpha V_N\|_2^2$ の平方根で定めました。これを積分し、$\|\Pi_NV_{\mathrm{in}}\|_{H^s}\le\|V_{\mathrm{in}}\|_{H^s}$ とすれば、すべての $N$ に一様な評価です。負の時刻は $\tau=-t$ に変換して同じ議論をします。

**(4) 極限と方程式。** 滑らかなデータ・係数なので、任意の整数 $s$ について $\sup_N\|V_N\|_{C^0(I;H^{s+1})}<\infty$ です。近似式から、係数との積の微分を展開して

$$
\sup_N\|\partial_tV_N\|_{C^0(I;H^s)}<\infty
$$

も成り立ちます。トーラス上で $H^{s+1}\hookrightarrow H^s$ はコンパクト埋込みです。各時刻の集合の相対コンパクト性と時間方向の等連続性から、[Arzela-Ascoli定理](../../../基礎科目/RA/RA8/index.md#thm-ra8-arzela-ascoli)の距離空間値版により部分列は $C^0(I;H^s)$ で収束します。RA8では実数値関数族を扱いましたが、有限個の時刻を選んで等連続性でその間を補う証明は、値域が距離空間 $H^s$ で各時刻の値集合が相対コンパクトな場合にも適用できます。$s=0,1,\ldots$ に順次部分列を取り対角部分列を選べば、同じ極限 $V$ は全 $s$ について $C^0(I;H^s)$ に属します。

任意の固定 $s$ に対し $\Pi_N(C^j\partial_jV_N)\to C^j\partial_jV$ が $C^0(I;H^s)$ で成り立ちます。実際、$V_N\to V$ を $H^{s+1}$ で使って積を評価し、残差 $(\Pi_N-I)(C^j\partial_jV)$ はコンパクトな時刻集合上で一様に零へ収束します。$D,G$ 項も同じです。近似式を時間積分して極限に移し

$$
V(t)=V_{\mathrm{in}}+
\int_0^t[-C^j\partial_jV+DV+G](\tau)\,d\tau
$$

を得ます。右辺は各 $H^s$ で連続なので $V\in C^1(I;H^s)$、式を繰り返し時間微分しSobolev埋込みを用いれば時空の滑らかさが従います。$V(0)=V_{\mathrm{in}}$ も極限から成立します。

**(5) 一意性。** 二解の差 $W$ は零初期値・零源の同じ対称系を満たします。(2)を $W$ に直接適用すると $\|W(t)\|_2=0$ なので $W=0$。極限にも一様評価が移り、結論の不等式を得ます。$\square$
<!-- proof-end -->

**注意。** この段階の有限周波数近似は、まだ $v_i=\partial_i u$ を正確に満たすとは限りません。極限で一次系が成立してから拘束の伝播を使います。有限次元射影に拘束保存を根拠なく要求しないことが重要です。

## 4. トーラス解を元の局所解に戻す

局所座標箱の中だけで係数が与えられている場合に、どうやって上の定理を使えるのでしょうか。まず小さい閉座標箱の周囲に滑らかな切断関数 $\chi$ を置き、元の正定値行列 $a(t,x)$ と単位行列を

$$
\widetilde a(t,x)=\chi(t,x)a(t,x)+(1-\chi(t,x))I_n
$$

でつなぎます。$0\le\chi\le1$ なので

$$
\xi^T\widetilde a\xi
=\chi\,\xi^Ta\xi+(1-\chi)|\xi|^2
\ge\min(\lambda,1)|\xi|^2.
$$

従って延長後も**一様正定値**です。切断を大きな座標立方体の内側に支持させ、外側で $\widetilde a=I_n$、$\widetilde b^\mu=\widetilde c=0$ として周期化できます。初期データ $(u_0,u_1)$ と源 $F$ は、より小さい箱で元と一致するよう別の切断を掛けて滑らかに延長します。局所自明化はこの箱でだけ必要です。

<a id="prop-hpde11-torus-localization"></a>
<!-- formal-statement-start -->
> **命題（局所係数の周期延長による解の構成）**  
> $(-\varepsilon,\varepsilon)\times B$ に滑らかな係数 $a^{ij},b^\mu,c$ を持つ二階波動系があり、$a^{ij}$ が実対称正定値であるとする。$B$ の内部の点 $x_*$ に対し、滑らかな局所初期値 $u_0,u_1$ と滑らかな源 $F$ から、ある小近傍 $W$ 上の滑らかな解 $u$ を構成できる。$W\cap\{t=0\}$ 上で所定の初期値を満たし、$W$ を十分縮小したとき、外側へ延長した係数とデータの選び方には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

周期化で作るのは**補助問題**であり、元の箱と一致する部分に解を制限します。構成の依存性は [HPDE10の局所後方領域一意性](../HPDE10/index.md#lem-hpde10-local-cone) が取り除きます。

<!-- proof-start -->
### 証明

上記の方法で $\widetilde a,\widetilde b,\widetilde c,\widetilde F$ と初期データをトーラス上へ延長します。滑らかな正定値平方根による[対称化](#prop-hpde11-positive-symmetrizer)を行い、[滑らかな対称双曲系の存在一意性](#thm-hpde11-torus-symmetric-system)から $V$ を得て、$U=S^{-1}V$ に戻します。

初期状態を

$$
v_0(0)=u_1,\qquad v_i(0)=\partial_i u_0,\qquad u(0)=u_0
$$

と選びます。一次系の極限は滑らかで、前節の $C_i$ の計算により $C_i(0)=0$ から $v_i=\partial_i u$。最後の方程式から $v_0=\partial_tu$ なので、最初の方程式は $Lu=F$ に戻ります。

延長は元の箱内で元の係数・データに一致します。$x_*$ の十分小さい空間球 $B_\rho(x_*)$ と短い時間帯を選び、各点の後方（負時刻側では前方）の局所非流入領域が元の箱内に収まるようにします。$\widetilde a$ の固有値上界はコンパクト箱で有限なので、その特性速度を上回る側面の円錐を選べます。二つの延長から作った解の差はこの小領域で同じ斉次波動作用素を満たし、底面の初期変位・速度は零です。[局所零データ一意性](../HPDE10/index.md#lem-hpde10-local-cone)によって差は零です。逆時刻も同様です。従って小近傍 $W$ で延長の選択に依存しません。$\square$
<!-- proof-end -->

例えば一次元の係数 $a=4$、$b^0=b^1=c=0$ なら、初期変位 $\varphi$、初期速度 $\psi$ の局所解は [d'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)により

$$
u(t,x)=\tfrac12\{\varphi(x-2t)+\varphi(x+2t)\}
+\tfrac14\int_{x-2t}^{x+2t}\psi(y)\,dy.
$$

$u_t(0,x)=\psi(x)$ であることは積分端点を微分して確認できます。周期延長の違いは、$x\pm2t$ が元の初期区間内にある限り、この式へ現れません。ここでも「局所」とは任意の $t,x$ ではなく、過去の足跡が元の箱に収まる範囲を意味します。

## 5. 幾何学的な局所Cauchy存在

<a id="thm-hpde11-local-cauchy"></a>
<!-- formal-statement-start -->
> **定理（normally hyperbolic作用素の滑らかな局所Cauchy解）**  
> $(M,g)$ は境界のない滑らかな時間向き付きLorentz多様体、$E\to M$ は有限ランクの滑らかな実または複素ベクトル束、$P:\Gamma(E)\to\Gamma(E)$ は滑らかなnormally hyperbolic作用素とする。$\Sigma\subset M$ は滑らかな空間的超曲面、$N$ はその未来向き単位法線とする。任意の $p\in\Sigma$、$p$ の周囲で滑らかな初期切断 $u_0,u_1$、$p$ の時空近傍で滑らかな源 $f$ に対し、$p$ の時空近傍 $W$ と滑らかな切断 $u\in\Gamma(W,E)$ が存在して

$$
Pu=f\quad\text{on }W,\qquad
u|_{W\cap\Sigma}=u_0,\qquad
\nabla_Nu|_{W\cap\Sigma}=u_1
$$

> を満たす。さらに二つの局所解は、両方が定義されている共通の十分小さい初期面近傍の依存領域で一致する。大域存在や非コンパクト超曲面全体に一様な存在時間は、この定理からは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

時間的法線測地線から座標を作り、非特性性から正定値 $a$ を得ます。束の枠では幾何学的法線速度を座標速度へ変換して周期的補助問題を解きます。最後に局所枠から束の切断へ戻します。

<!-- proof-start -->
### 証明

$p$ を通る空間的超曲面の小片に、§1で計算した測地的法線座標を取ります。$P$ の主シンボルは $-g^{-1}(\xi,\xi)\operatorname{id}$ なので、座標表示で主部は $\partial_t^2-h^{ij}\partial_i\partial_j$ です。$h^{ij}$ は正定値で、コンパクトな小座標箱上では一様に正定値です。束の局所枠を固定し、接続行列 $\omega_t$ を用いて初期座標速度を

$$
\partial_tu(0,x)=u_1(x)-\omega_t(0,x)u_0(x)
$$

とします。[周期延長による局所構成](#prop-hpde11-torus-localization)をこの座標データと $f$ の座標成分へ適用すると、ある箱内で $Lu=F$ を満たす滑らかな $\mathbb K^r$ 値関数が得られます。逆に枠 $e_A$ を用いて $u=u^Ae_A$ と読み直せば $Pu=f$ が成立します。また $\nabla_Nu=\partial_tu+\omega_tu=u_1$ が $t=0$ で成り立ちます。

任意の別の局所解との差は共通箱で同じ斉次方程式の解です。初期変位・法線速度の差は零なので、[HPDE10の局所後方領域一意性](../HPDE10/index.md#lem-hpde10-local-cone)を正負両方向へ適用して一致します。局所枠や座標選択による違いも同じ理由で消えます。$\square$
<!-- proof-end -->

この証明では形式的自己随伴性を仮定しません。必要なのは**主部が計量に由来するスカラー倍の単位行列**であることと、空間的初期面の非特性性です。$b^\mu,c$ が非対称でも、対称化後の $D$ に入りエネルギー不等式を壊しません。

## 6. この局所存在定理の射程

[HPDE9の高階Sobolev評価](../HPDE9/index.md#thm-hpde9-high-energy-estimate)は、既存の滑らかな解を評価するときの正則性を与えました。ここでは、その前提であった近似解列を有限次元ODEとして作り、同じ**微分損失のない交換子評価**を用いて滑らかな解を構成しました。$H^{s+1}\to H^s$ のコンパクト性と時間微分の上界を両方用いた点が、単なる有界性からの誤った「収束」と異なります。

ただし、局所解を分割関数で足せば大域解になるわけではありません。切断関数 $\chi$ と解 $u$ の積には $P(\chi u)=\chi Pu+[P,\chi]u$ という追加項が現れます。HPDE15–16では、[HPDE10の有限伝播](../HPDE10/index.md#thm-hpde10-finite-propagation)と重なりでの一意性を使い、時間的な貼り合わせを実施します。HPDE12–14では別経路として分布核と局所基本解を調べます。

## 7. 演習：構成が各段階で成立することを確かめる

<a id="ex-hpde11-a01"></a>
### A1. 法線速度と座標速度
- Level: A
- 問題：局所枠で $\nabla_{\partial_t}u=\partial_tu+\omega_tu$、$\omega_t(0,x)=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ とする。初期値 $u_0=(x,1)^T,\ u_1=(0,2)^T$ に対応する $\partial_tu(0,x)$ を計算せよ。

<!-- solution-start -->
**詳細解答**。接続項は

$$
\omega_tu_0=\begin{pmatrix}0&1\\0&0\end{pmatrix}\binom{x}{1}
=\binom{1}{0}.
$$

$\nabla_{\partial_t}u=u_1$ を解き、$\partial_tu=u_1-\omega_tu_0=(-1,2)^T$。$u_1$ を座標速度へそのまま代入すると第一成分で $1$ だけ誤ります。
<!-- solution-end -->

<a id="ex-hpde11-a02"></a>
### A2. 正定値行列の確認
- Level: A
- 問題：$n=2,r=1$、$a=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ とする。$a$ と $H=\operatorname{diag}(1,a,1)$ の正定値性を、平方完成または固有値から確かめよ。

<!-- solution-start -->
**詳細解答**。$(\xi_1,\xi_2)$ に対して

$$
\xi^Ta\xi=2\xi_1^2+2\xi_1\xi_2+2\xi_2^2
=(\xi_1+\xi_2)^2+\xi_1^2+\xi_2^2>0
$$

が $\xi\ne0$ で成立します。固有値を計算すると $(1,1)$ 方向は $3$、$(1,-1)$ 方向は $1$。従って $H$ の固有値は $1,3,1,1$ で、すべて正です。
<!-- solution-end -->

<a id="ex-hpde11-a03"></a>
### A3. 拘束の伝播
- Level: A
- 問題：$n=1$ で $\partial_tv_1=\partial_xv_0,\ \partial_tu=v_0$ を満たす滑らかな三つ組を考える。$v_1(0,x)=u_0'(x)$、$u(0,x)=u_0(x)$ なら $v_1=\partial_xu$ が成立することを示せ。

<!-- solution-start -->
**詳細解答**。$C=v_1-\partial_xu$ とおくと

$$
\partial_tC=\partial_xv_0-\partial_x(\partial_tu)
=\partial_xv_0-\partial_xv_0=0.
$$

$C(0,x)=u'_0(x)-u'_0(x)=0$ なので $C(t,x)=0$。この等式がないと、一次系の解から二階方程式を戻す際に $a\partial_xv_1=a\partial_x^2u$ と置けません。
<!-- solution-end -->

<a id="ex-hpde11-a04"></a>
### A4. 対称化された速度
- Level: A
- 問題：$n=r=1,\ a=9$、下位項は零とする。$A^1,H,S,C^1$ を書き、$C^1$ の固有値を求めよ。

<!-- solution-start -->
**詳細解答**。$U=(v_0,v_1,u)^T$ の順で

$$
A^1=\begin{pmatrix}0&-9&0\\-1&0&0\\0&0&0\end{pmatrix},
\quad H=\operatorname{diag}(1,9,1),\quad
S=\operatorname{diag}(1,3,1).
$$

左から $S$、右から $S^{-1}=\operatorname{diag}(1,1/3,1)$ を掛けると

$$
C^1=\begin{pmatrix}0&-3&0\\-3&0&0\\0&0&0\end{pmatrix}.
$$

特性多項式は $z(z^2-9)$ で固有値は $-3,0,3$。$a=9$ の波速 $3$ と一致します。
<!-- solution-end -->

<a id="ex-hpde11-b01"></a>
### B1. Galerkin射影と部分積分
- Level: B
- 問題：一次元トーラスの実対称行列 $C=C(x)$ に対し $\partial_tV_N=-\Pi_N(C\partial_xV_N)$ とする。$E_N=\tfrac12\|V_N\|_2^2$ の微分を求め、$\|\partial_xC\|_\infty$ だけで評価せよ。射影と $C$ が可換であると仮定してはならない。

<!-- solution-start -->
**詳細解答**。$V_N=\Pi_NV_N$、$\Pi_N^*=\Pi_N$ なので

$$
E'_N=-\langle V_N,\Pi_N(C\partial_xV_N)\rangle
=-\langle V_N,C\partial_xV_N\rangle.
$$

周期境界での部分積分と対称性より

$$
0=\int_{\mathbb T}\partial_x(V_N^TCV_N)\,dx
=2\int V_N^TC\partial_xV_N\,dx+\int V_N^TC_xV_N\,dx.
$$

従って $E'_N=\tfrac12\int V_N^TC_xV_N\,dx$ であり、$|E'_N|\le \tfrac12\|C_x\|_\infty\|V_N\|_2^2=\|C_x\|_\infty E_N$。射影は内積の相手の $V_N$ に移しただけです。
<!-- solution-end -->

<a id="ex-hpde11-b02"></a>
### B2. 係数微分の階数を数える
- Level: B
- 問題：一次元の $\partial_tV+C(x)\partial_xV=0$ を二階空間微分し、$W=\partial_x^2V$ が満たす方程式を求めよ。右辺に $\partial_x^3V$ が残らない理由を述べよ。

<!-- solution-start -->
**詳細解答**。Leibniz則を二回用いて

$$
\partial_x^2(C\partial_xV)
=C\partial_x^3V+2C_x\partial_x^2V+C_{xx}\partial_xV.
$$

よって

$$
\partial_tW+C\partial_xW=-2C_xW-C_{xx}\partial_xV.
$$

$\partial_x^3V=\partial_xW$ は右辺へ送らず、左辺の対称な主部に残します。右辺の最高階微分は $W$ までなので、$H^2$ エネルギー評価は微分損失なしに閉じます。
<!-- solution-end -->

<a id="ex-hpde11-b03"></a>
### B3. 正定値な周期延長
- Level: B
- 問題：実対称行列 $a(x)$ が小箱で $\xi^Ta\xi\ge2|\xi|^2$ を満たすとする。$0\le\chi\le1$ を使い $\widetilde a=\chi a+(1-\chi)I$ を作ったとき、$\widetilde a$ の固有値下界を求めよ。また任意の実係数行列 $b$ を同様に補間しても問題ない理由を述べよ。

<!-- solution-start -->
**詳細解答**。任意の $\xi$ に対し

$$
\xi^T\widetilde a\xi
=\chi\,\xi^Ta\xi+(1-\chi)|\xi|^2
\ge(2\chi+1-\chi)|\xi|^2=(1+\chi)|\xi|^2
\ge|\xi|^2.
$$

よって全点で最小固有値は少なくとも $1$。下位行列 $b$ の正定値性は一次対称化に不要であり、$D$ の有界性だけを利用するので、滑らかで有界になるよう切断すれば足ります。
<!-- solution-end -->

<a id="ex-hpde11-b04"></a>
### B4. 有界性だけでは収束しない
- Level: B
- 問題：$\mathbb T^1$ 上の $w_N(x)=e^{iNx}$ を考える。$L^2$ で一様有界でも強収束部分列が得られないことを示せ。この障害をGalerkin証明では何で克服するか。

<!-- solution-start -->
**詳細解答**。標準の規格化内積で $\|w_N\|_2=1$、異なる $N\ne M$ で直交します。従って

$$
\|w_N-w_M\|_2^2=\|w_N\|_2^2+\|w_M\|_2^2=2,
$$

でありCauchy部分列が存在しません。局所存在の証明では $H^{s+1}$ での一様評価と、コンパクト埋込み $H^{s+1}\hookrightarrow H^s$ を使って空間的な相対コンパクト性を得ます。さらに $\partial_tV_N$ の $H^s$ 一様上界で等連続性を作り、[Arzela-Ascoli定理](../../../基礎科目/RA/RA8/index.md#thm-ra8-arzela-ascoli)の距離空間値版により時間一様の強収束部分列を取ります。
<!-- solution-end -->

<a id="ex-hpde11-c01"></a>
### C1. 二階波動から局所解までを一つの論証にする
- Level: C
- 問題：$Lu=u_{tt}-a(t,x)u_{xx}+b(t,x)u_t+c(t,x)u=f$ を $t=0$ の近くの $1+1$ 次元座標箱で考える。$a,b,c,f,u_0,u_1$ は滑らかで、$0<\lambda\le a\le\Lambda$ とする。(i) 一次還元系と対称化行列、(ii) 周期延長で保つべき条件、(iii) Galerkin極限で必要な二種類の評価、(iv) 極限が元の初期値問題を解く根拠を示せ。

<!-- solution-start -->
**詳細解答**。(i) $v_0=u_t,\ v_1=u_x$ として

$$
\begin{cases}
(v_0)_t-a(v_1)_x=f-bv_0-cu,\\
(v_1)_t-(v_0)_x=0,\\
u_t-v_0=0.
\end{cases}
$$

$A^1=\begin{pmatrix}0&-a&0\\-1&0&0\\0&0&0\end{pmatrix}$、$H=\operatorname{diag}(1,a,1)$、$S=\operatorname{diag}(1,\sqrt a,1)$ とすると $C^1=SA^1S^{-1}$ は、$01,10$ 成分がともに $-\sqrt a$ の対称行列です。$\lambda>0$ が正定値性に必要です。

(ii) 小箱の外へ延長するとき $\widetilde a=\chi a+(1-\chi)$ とすれば $\widetilde a\ge\min(\lambda,1)>0$。$\widetilde b,\widetilde c,\widetilde f$ と初期値は滑らかな切断で延長し、元の小箱と一致させてトーラスへ周期化します。

(iii) $\Pi_N$ を使う有限次元ODEは各 $N$ で解けます。対称な $C^1$ に対する部分積分と交換子展開により

$$
\sup_N\|V_N\|_{C^0(I;H^{s+1})}<\infty,\qquad
\sup_N\|\partial_tV_N\|_{C^0(I;H^s)}<\infty
$$

を得ます。第一の評価とコンパクト埋込みは各時刻の相対コンパクト性を、第二は時間等連続性を与えます。Ascoliと対角部分列で $V_N\to V$ を任意の $C^0H^s$ で得て、積分した方程式へ極限を通します。

(iv) $U=S^{-1}V=(v_0,v_1,u)$ は一次還元系を満たします。初期値を $(u_1,u'_0,u_0)$ とすれば $C=v_1-u_x$ は $C_t=(v_1)_t-(u_t)_x=(v_0)_x-(v_0)_x=0$、$C(0)=0$。よって $v_1=u_x,\ v_0=u_t$ で $Lu=f$ に戻ります。局所的な一致は[HPDE10の局所一意性](../HPDE10/index.md#lem-hpde10-local-cone)を使い、周期延長の選び方に依存しません。これは大域双曲時空全体での解の存在を主張するものではありません。
<!-- solution-end -->

## 8. 次章へ：点源に対する解は何を意味するか

ここでは滑らかな初期データと滑らかな源に対する**局所的な解の存在**まで到達しました。次のHPDE12では、点に集中した源（Dirac分布）を許したときのMinkowski基本解を構成します。分布の源を今回の滑らかな局所存在定理へ無条件で代入することはできず、別の議論が必要です。
