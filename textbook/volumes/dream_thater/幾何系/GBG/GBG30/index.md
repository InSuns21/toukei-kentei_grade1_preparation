# GBG30 Spinor・ゲージ場・指数・異常はどうつながるか

[スピン構造の存在障害](../GBG29/index.md#thm-gbg29-obstruction)を消すと、接空間の回転をスピン群の元に持ち上げられる。今度はその群を複素ベクトル空間に作用させ、物質場を載せる束を作る。接続で場を微分し、微分の結果を行列で足し合わせると Dirac 作用素になる。最後に、その方程式の解の個数の差が曲率の積分と結び付く仕組みを見る。

以下、$M$ は境界のない向き付き Riemann 多様体、次元 $n=2m$（$m\ge1$）、計量を $g$ とする。コンパクト性は指数を扱う段階で追加する。Lorentz 計量ではなく正定値計量を使う。右主作用、局所枠の変更 $s_j=s_i h_{ij}$ の規約はこれまでと同じである。

<!-- definition-example-audit: strict -->

## 1. スピン構造から場の束へ

スピン構造 $(Q,\lambda)$ を一つ固定する（[定義](../GBG29/index.md#def-gbg29-spin-structure)）。ここで $\lambda$ は向き付き直交枠束への写像、$\pi_s:\operatorname{Spin}(n)\to SO(n)$ は群の二重被覆である。単に任意の群表現を使うだけでは、接ベクトルと場の積を定められない。そこで複素内積空間 $\Delta$ に、実ベクトル $v$ を線形作用素 $c(v)$ に送る実線形写像を用意する。必要な関係は

$$
c(v)c(w)+c(w)c(v)=-2\langle v,w\rangle I,
\qquad c(v)^*=-c(v).
$$

これが正定値計量に対応する Clifford 関係である。特に $c(v)^2=-|v|^2 I$ で、非零ベクトルなら $c(v)$ は可逆になる。標準的な複素スピン表現では $\dim_{\mathbb C}\Delta=2^m$ であり、群表現 $\sigma:\operatorname{Spin}(n)\to U(\Delta)$ は

$$
\sigma(h)c(v)\sigma(h)^{-1}=c(\pi_s(h)v)
$$

を満たす。本講ではこの標準表現を入力とする。一般次元の Clifford 代数と表現の分類は行わない。

具体的には二次元で $\Delta=\mathbb C^2$ とし、

$$
c_1=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad c_2=\begin{pmatrix}0&i\\i&0\end{pmatrix}
$$

と取る。各二乗は $-I$、共役転置は負自身であり、

$$
c_1c_2=\begin{pmatrix}-i&0\\0&i\end{pmatrix},
\qquad c_2c_1=-c_1c_2.
$$

従って $c(v)=v_1c_1+v_2c_2$ は上の関係を満たす。$\operatorname{Spin}(2)$ の元 $e^{it}$ に対して $\sigma(e^{it})=\cos t\, I+\sin t\,c_1c_2$ と置けば、$(c_1c_2)^2=-I$ から積は角の加法に従い、ユニタリである。$c_1c_2c_1=c_2$ と $c_1c_1c_2=-c_2$ を使うと

$$
\sigma(e^{it})c_1\sigma(e^{it})^{-1}
=\cos(2t)c_1+\sin(2t)c_2.
$$

$c_2$ については $c_1c_2c_2=-c_1$、$c_2c_1c_2=c_1$ から $-\sin(2t)c_1+\cos(2t)c_2$ となる。従って $\pi_s(e^{it})=R(2t)$ の回転に対応する。$t=\pi$ では枠の回転が恒等でも $\sigma=-I$ である。

ゲージ場にも独自の主束 $P\to M$ とユニタリ表現 $\tau:G\to U(V)$ を用意する。$V$ は有限次元複素内積空間である。二つの場を一緒に運ぶため、各点でテンソル積（双線形な積 $a\otimes v$ から生成される複素ベクトル空間）を取る。

<a id="def-gbg30-twisted-spinor"></a>

<!-- formal-statement-start -->
> **定義（スピノル束とゲージ結合スピノル束）**  
> 向き付き偶数次元 Riemann 多様体にスピン構造 $Q$ があり、上記の標準複素スピン表現 $\sigma$ が与えられているとする。主 $G$ 束 $P$ と有限次元ユニタリ表現 $\tau$ に対して

$$
S=Q\times_\sigma\Delta,\qquad
E=P\times_\tau V,\qquad W=S\otimes E
$$

> と置く。$S$ がスピノル束、$W$ がゲージ結合スピノル束であり、場はそれぞれの滑らかな切断である。
<!-- formal-statement-end -->

[結合束の構成](../GBG4/index.md#def-gbg4-associated-bundle)では $(qh,a)\sim(q,\sigma(h)a)$ とする。局所枠 $q_i,p_i$ を選び、$q_j=q_i h_{ij}$、$p_j=p_i g_{ij}$ とすると、テンソル積の局所成分は

$$
\psi_j=T_{ij}^{-1}\psi_i,\qquad
T_{ij}=\sigma(h_{ij})\otimes\tau(g_{ij}).
$$

実際、$[q_j,a_j]\otimes[p_j,v_j]$ は $[q_i,\sigma(h_{ij})a_j]\otimes[p_i,\tau(g_{ij})v_j]$ と同じ元だからである。三重重なりでは $T_{ij}T_{jk}=T_{ik}$ が両表現の積保存性から従う。従って局所積を貼り合わせた束の階数は $2^m\dim V$ であり、積内積も保存される。

例えば標準枠を持つ平面に自明スピン構造と自明な $U(1)$ 束を入れ、$\tau(z)=z$ とする。遷移関数は両方とも $1$ なので $S=\mathbb R^2\times\mathbb C^2$、$W=\mathbb R^2\times\mathbb C^2$ である。局所枠を $e^{it}$ と $e^{i\alpha}$ で変えても、成分を $\sigma(e^{it})^{-1}e^{-i\alpha}$ 倍すれば束の同じ点を表す。

接ベクトル $X=q_i^{\rm fr}v$（$q_i^{\rm fr}=\lambda(q_i)$）に対する作用を局所的に $c(v)\otimes I$ と置ける。枠を変更すると $v_j=\pi_s(h_{ij})^{-1}v_i$ だから

$$
c(v_j)\otimes I=T_{ij}^{-1}(c(v_i)\otimes I)T_{ij}.
$$

従って接ベクトルによる作用は $W$ 上で枠に依存せず定まる。

## 2. 接続を足し合わせて Dirac 作用素を作る

直交枠束の Levi–Civita 接続を $\omega$ とする。二重被覆の微分 $d\pi_s$ は Lie 環の同型である。局所的に $\lambda^*\omega$ に $(d\pi_s)^{-1}$ を作用させれば $Q$ の接続が得られる。実際、基本垂直ベクトル $\xi_Q$ は $d\lambda$ で $(d\pi_s\xi)_{F}$ に移るため接続形式は $\xi$ を返す。右作用に関する同変性も $\lambda(qh)=\lambda(q)\pi_s(h)$ と $d\pi_s$ の随伴作用との可換性から従う。

この接続の局所表現行列を $B_i$、$P$ の接続を表現 $\tau$ に移した行列を $A_i$ とする。[結合束の共変微分の局所公式](../GBG9/index.md#thm-gbg9-local-formula)を各因子に用い、積に Leibniz 則を適用すると

$$
\nabla^W_X(a\otimes v)
=(\nabla^S_Xa)\otimes v+a\otimes(\nabla^E_Xv).
$$

局所成分に対する行列は

$$
C_i=B_i\otimes I_V+I_\Delta\otimes A_i,\qquad
\nabla^W_X\psi_i=X\psi_i+C_i(X)\psi_i.
$$

微分の向きは $X$ に依存する。すべての方向の微分を一つの場へ戻すには、正規直交枠の各方向を Clifford 行列で作用させて足せばよい。

<a id="def-gbg30-dirac"></a>

<!-- formal-statement-start -->
> **定義（ゲージ結合 Dirac 作用素）**  
> スピン構造を持つ向き付き偶数次元 Riemann 多様体上のゲージ結合スピノル束 $W$ に、上記の Levi–Civita 由来の接続とユニタリゲージ接続を入れる。局所正規直交枠 $(e_a)_{a=1}^n$ について

$$
D_E:\Gamma(W)\to\Gamma(W),\qquad
D_E\psi=\sum_{a=1}^n c(e_a)\nabla^W_{e_a}\psi
$$

> と置く。ここで $c(e_a)$ は束上の Clifford 作用（ゲージ因子では恒等作用）、$\Gamma(W)$ は滑らかな切断全体である。
<!-- formal-statement-end -->

平面の標準枠と自明接続では $D=c_1\partial_x+c_2\partial_y$。例えば $\psi=(x+iy,0)^t$ には

$$
D\psi=c_1(1,0)^t+c_2(i,0)^t
=(0,1)^t+(0,-1)^t=0.
$$

これは局所方程式の解であり、まだコンパクト多様体上の解空間の次元を主張していない。

<a id="thm-gbg30-dirac-covariance"></a>

<!-- formal-statement-start -->
> **定理（Dirac 作用素の枠独立性とゲージ共変性）**  
> 上記の束と接続に対して $D_E$ は正規直交枠の選択に依存しない。スピン枠を固定し、ゲージ枠の変更 $p_j=p_i g_{ij}$ に伴い $U=\tau(g_{ij})$ と置けば

$$
(D_E\psi)_j=(I\otimes U^{-1})(D_E\psi)_i.
$$

> 従って局所表示を変更しても同じ大域的な方程式 $D_E\psi=0$ を表す。
<!-- formal-statement-end -->

**証明の見取り図**。枠の回転行列は二回現れ、直交性で打ち消し合う。ゲージ変更では接続の非斉次項が成分の微分から出る項を打ち消す。

<!-- proof-start -->
### 証明

$e'_a=\sum_b e_b R_{ba}$ とし、$R(x)\in SO(n)$ とする。接続は微分方向に関して関数線形なので $\nabla_{e'_a}=\sum_d R_{da}\nabla_{e_d}$ であり、ここで $R$ を微分する項はない。Clifford 作用の線形性を使うと

$$
\sum_a c(e'_a)\nabla_{e'_a}
=\sum_{a,b,d}R_{ba}R_{da}c(e_b)\nabla_{e_d}
=\sum_b c(e_b)\nabla_{e_b}.
$$

次に $H=I\otimes U$ と書く。[局所共変微分のゲージ共変性](../GBG9/index.md#thm-gbg9-gauge-covariance)に対応する接続変換は $C_j=H^{-1}C_iH+H^{-1}dH$ である。$\psi_j=H^{-1}\psi_i$ と $d(H^{-1})=-H^{-1}(dH)H^{-1}$ を用いると

$$
d\psi_j=H^{-1}d\psi_i-H^{-1}(dH)H^{-1}\psi_i,
$$

$$
C_j\psi_j=H^{-1}C_i\psi_i+H^{-1}(dH)H^{-1}\psi_i.
$$

加えると $\nabla^W_j\psi_j=H^{-1}\nabla^W_i\psi_i$。$H$ はゲージ因子だけに作用するため $c(e_a)$ と可換であり、足し合わせれば主張を得る。スピン枠の変更でも、1節の Clifford 作用の変換式と同じ共変微分の変換式を用いるので、束上の作用は一致する。
<!-- proof-end -->

## 3. 解の個数を数えるには何が必要か

まず一階微分の最高次数部分だけを見る。点 $x$ の余接ベクトル $\xi$ を取り、微分 $e_a$ を $i\xi(e_a)$ に置き換えた行列を主シンボルと呼ぶ。この約束では

$$
\sigma_D(x,\xi)=i\sum_a \xi(e_a)c(e_a).
$$

Clifford 関係で交差項が消え、二乗は $|\xi|^2I$ となる。従って $\xi\ne0$ なら逆行列は $\sigma_D/|\xi|^2$。非零余接方向ですべて可逆という性質が楕円性である。

偶数次元ではもう一つの行列が重要になる。$\chi=i^m c_1\cdots c_{2m}$ と置く。積を逆順に並べるには $m(2m-1)$ 回交換が必要なので $(c_1\cdots c_{2m})^2=(-1)^{m(2m-1)}(-1)^{2m}I=(-1)^mI$。従って $\chi^2=I$。共役転置でも同じ交換符号が現れ $\chi^*=\chi$ となる。さらに $c_a$ は残りの $2m-1$ 個と反交換するので $\chi c_a=-c_a\chi$。

正の向きの枠で積は不変である。実際、Clifford 積の完全交代化は外積と同様に行列式を掛ける。互いに直交する枠では異なる因子が反交換するため完全交代化は元の積そのものになる。$R\in SO(2m)$ では $\det R=1$。従って $\chi$ は大域的に定まる。二次元の例では $\chi=i c_1c_2=\operatorname{diag}(1,-1)$ である。

<a id="def-gbg30-chirality"></a>

<!-- formal-statement-start -->
> **定義（カイラリティ分解）**  
> 向き付き偶数次元のゲージ結合スピノル束 $W$ 上で、自己共役な対合を

$$
\chi=i^m c_1\cdots c_{2m}
$$

> と置き、ゲージ因子では恒等作用として延長する。その固有値 $+1,-1$ の部分束をそれぞれ $W^+,W^-$ とし、

$$
W=W^+\oplus W^-
$$

> と分解する。
<!-- formal-statement-end -->

射影は $(I\pm\chi)/2$。二乗すると自身になり、積は零、和は $I$ だからこの分解が得られる。可逆な $c(e_1)$ は二つの固有空間を互いに交換するので階数は等しい。二次元では $(z,0)^t$ と $(0,z)^t$ がそれぞれの固有空間である。

<a id="thm-gbg30-dirac-odd"></a>

<!-- formal-statement-start -->
> **命題（Dirac 作用素のカイラリティ交換と楕円性）**  
> Levi–Civita 由来のスピン接続とユニタリゲージ接続を持つ上記の束では $D_E\chi=-\chi D_E$ であり、

$$
D_E^+:\Gamma(W^+)\to\Gamma(W^-),\qquad
D_E^-:\Gamma(W^-)\to\Gamma(W^+)
$$

> は楕円作用素である。
<!-- formal-statement-end -->

**証明の見取り図**。接続はカイラリティを保存するが Clifford 行列は反転する。主シンボルの二乗から反転写像の逆も得られる。

<!-- proof-start -->
### 証明

スピン表現は正の向きの回転と Clifford 作用を両立させるので、上の積の枠独立性により $\sigma(h)\chi=\chi\sigma(h)$。これを群の一パラメータ曲線に沿って微分すると、表現の接続行列 $B_i$ も $\chi$ と可換になる。ゲージ行列は別因子に作用するから可換である。スピン枠で $\chi$ は定数行列なので

$$
\nabla^W_X(\chi\psi)=\chi X\psi+C_i(X)\chi\psi
=\chi\nabla^W_X\psi.
$$

これと $c(e_a)\chi=-\chi c(e_a)$ を合わせると $D_E\chi=-\chi D_E$。主シンボルも両部分束を交換し、$\sigma_D^-\sigma_D^+=|\xi|^2 I_{W^+}$ および $\sigma_D^+\sigma_D^-=|\xi|^2 I_{W^-}$。従って非零 $\xi$ でそれぞれ可逆である。
<!-- proof-end -->

ここから $M$ をコンパクトかつ境界なしと仮定する。$L^2$ は二乗可積分な切断の Hilbert 空間、$H^1$ は弱い意味での一階微分も二乗可積分な切断の空間である。これらの解析的構成は本講の証明範囲外だが、定義域を明示して使う。

一般の楕円作用素の解析から $D_E^+:H^1(W^+)\to L^2(W^-)$ は Fredholm（核・余核が有限次元で像が閉じている）で、核の元は滑らかである。

またユニタリ接続・Clifford 作用の反自己共役性・境界なしの部分積分により $D_E$ は形式的自己共役、$D_E^+$ の形式随伴は $D_E^-$ となる。楕円正則性により余核は $D_E^-$ の滑らかな核と同一視される。これらの一般解析定理はここでは入力とする。

<a id="def-gbg30-index"></a>

<!-- formal-statement-start -->
> **定義（ゲージ結合 Dirac 作用素の指数）**  
> コンパクトで境界のない向き付き偶数次元 Riemann スピン多様体とユニタリゲージ接続を仮定する。上記の Fredholm 作用素 $D_E^+:H^1(W^+)\to L^2(W^-)$ の指数は

$$
\operatorname{ind}D_E^+
=\dim\ker D_E^+-\dim\ker D_E^-.
$$

> 各核の元は Dirac 方程式の零モード（固有値零の解）である。
<!-- formal-statement-end -->

例えば標準平坦トーラス $\mathbb R^2/(2\pi\mathbb Z)^2$ に周期的スピン構造と自明接続を入れる。$D^2=-(\partial_x^2+\partial_y^2)I$ だから $D\psi=0$ なら $D^2\psi=0$。一周期の積分で境界項が相殺し、

$$
0=\int \langle\psi,D^2\psi\rangle
=\int (|\partial_x\psi|^2+|\partial_y\psi|^2).
$$

従って両微分が零となり、連結性から $\psi$ は定数。逆に定数は解である。正負それぞれ一次元なので指数は $1-1=0$。指数零は零モードが存在しないという意味ではない。

## 4. 曲率の積分との橋

[Chern 指標形式](../GBG23/index.md#def-gbg23-chern-character) $\operatorname{ch}(E)=\operatorname{tr}\exp(iF/2\pi)$ と、[第一 Pontryagin 形式](../GBG24/index.md#prop-gbg24-first-pontryagin) $p_1(TM)$ を用意する。$\widehat A$ は接束の Pontryagin 類から作る特性類であり、本講では次数4までの部分 $1-p_1/24$ を入力として使う。記号 $[\ ]_{2m}$ は積のうち形式次数が $2m$ の成分だけを取る意味である。

<a id="thm-gbg30-index-bridge"></a>

<!-- formal-statement-start -->
> **定理（Atiyah–Singer 指数定理のスピン Dirac 型）**  
> コンパクトで境界のない向き付き偶数次元 Riemann スピン多様体 $M$ と Hermitian 複素ベクトル束 $E$ のユニタリ接続について、上記のカイラリティ規約で

$$
\operatorname{ind}D_E^+
=\int_M[\widehat A(TM)\operatorname{ch}(E)]_{2m}.
$$

> （一般指数定理からの引用。ここでは証明しない。）
<!-- formal-statement-end -->

この定理は微分方程式の解の差を、既習の曲率から計算できることを意味する。適用を二次元と四次元に絞って自力で展開する。

二次元では $\widehat A$ の正次数部分は4以上なので、積の2形式は $c_1(E)$ だけである。$E$ が線束なら $\operatorname{ind}D_E^+=(i/2\pi)\int F$。

球面にスピン構造が存在することも確認しよう。単位球面 $S^d$（ここでは $d=2,4$）では $T_xS^d=x^\perp\subset\mathbb R^{d+1}$ である。

正の直交接枠に法線 $x$ を最後に加えると正の直交枠 $(e_1,\ldots,e_d,x)$ を得る（$d$ は偶数）。従って直交枠束は $SO(d+1)$ の最終列を $x$ とする部分に対応する。

標準スピン被覆では、最後の座標を固定する $SO(d)$ の逆像は $\operatorname{Spin}(d)$ である。この群の性質を入力として、$Q=\operatorname{Spin}(d+1)$ を $S^d$ 上の束と見る。射影は被覆写像で得た行列の最終列である。

二つの元が同じ $x$ に写ればその比は $\operatorname{Spin}(d)$ に入り、右作用は自由で推移的である。局所的な直交接枠を小さな座標近傍で被覆へ持ち上げれば局所自明化を得る。

被覆から最初の $d$ 列を取る写像は射影を保ち、右作用を $SO(d)$ の作用へ移すので、[スピン構造の条件](../GBG29/index.md#def-gbg29-spin-structure)を満たす。

[Dirac monopole の第一 Chern 数の計算](../GBG19/index.md#thm-gbg19-curvature-flux)の線束では $F=-in\sin\vartheta\,d\vartheta\wedge d\varphi/2$。外向きの向きで積分すると $i(-in)/(4\pi)\cdot2\cdot2\pi=n$。従って指数は $n$ である。

四次元で $r=\operatorname{rank}E$ と書く。[Chern 指標と低次 Chern 形式の関係](../GBG23/index.md#prop-gbg23-chern-character-degrees)より、次数0、2、4の部分を掛けると

$$
[\widehat A\operatorname{ch}(E)]_4
=\tfrac12(c_1^2-2c_2)-\tfrac r{24}p_1(TM).
$$

ここで $c_1^2$ は外積である。SU(2) の複素基本表現では $r=2$、曲率の跡が零なので $c_1=0$ となり、

$$
\operatorname{ind}D_E^+
=-\int_M c_2(E)-\frac1{12}\int_M p_1(TM).
$$

丸い $S^4$ のスピン構造には直前の $d=4$ の構成を使う。

丸い球面の曲率行列は正規直交余枠 $\theta^a$ で $R_{ab}=K\theta^a\wedge\theta^b$（$K$ は一定断面曲率、全体符号を逆にしても以下は同じ）。

各 $R_{ab}\wedge R_{ab}=0$ だから [第一 Pontryagin 形式の跡公式](../GBG24/index.md#prop-gbg24-first-pontryagin)より $p_1(TM)=0$。

従って [BPST 束の第二 Chern 数](../GBG28/index.md#thm-gbg28-nontrivial) $-1$ を代入すると指数は $+1$ となる。

この計算は $S^4$ 上に滑らかに貼り合わせた接続に対して行った。非コンパクトな $\mathbb R^4$ 上に同じ Fredholm の結論を条件なしで適用してはいけない。また指数だけでは二つの核の個別次元は分からない。

## 5. 古典的な共変性から量子異常へ

[Dirac 作用素の枠独立性とゲージ共変性](#thm-gbg30-dirac-covariance)は古典方程式の性質である。量子化では場を積分する測度や行列式も対称性を保つかという別の問いが生じる。

零モードに限定した有限次元模型を考えよう。正負の零モード数を $N_+,N_-$ とし、各モードの独立な反交換変数（Grassmann 変数、$\eta_i\eta_j=-\eta_j\eta_i$）を $\eta_j^\pm$ とする。一変数の積分は $\int d\eta\,1=0,\ \int d\eta\,\eta=1$ で決める。$\eta'=a\eta$、$a\ne0$ のとき $\int d\eta'\eta'=1$ とするため $d\eta'=a^{-1}d\eta$。これは通常の実積分とは逆の変換則である。

全変数へ $\eta_j^\pm\mapsto e^{\pm i\alpha}\eta_j^\pm$ を作用させると、積分測度は

$$
J_0=(e^{-i\alpha})^{N_+}(e^{i\alpha})^{N_-}
=\exp(-i\alpha\,\operatorname{ind}D_E^+)
$$

倍になる。独立な共役側の変数にも同じカイラリティ位相を採る軸性変換の模型では同じ因子がもう一つ掛かり、$\exp(-2i\alpha\operatorname{ind}D_E^+)$ になる。変換方向を逆に定義すれば位相の符号も逆になる。

これは零モードだけの有限次元計算である。無限個の非零モードを含む量子場の測度を定義し、局所的な異常密度を導くには正則化と量子場理論の計算が必要である。古典対称性が量子化後に失われる現象を量子異常という。軸性異常（左右の相対的位相回転の対称性の破れ）、ゲージ異常（局所ゲージ対称性の破れ）、大域異常（連続的に恒等へ戻せない変換などに関する量子的な障害）は区別する。指数が非零という事実だけで、ゲージ異常の存在やその相殺条件までは決まらない。

## 6. 演習

<a id="ex-gbg30-a01"></a>

#### GBG30-A01 Clifford 行列の逆
- Level: A

1節の行列で $c(3,4)$ の二乗と逆行列を求め、反自己共役性も確認せよ。

<!-- solution-start -->
**詳細解答**。$c(3,4)=3c_1+4c_2$。$c_1^2=c_2^2=-I$、$c_1c_2+c_2c_1=0$ より二乗は $-9I-16I=-25I$。従って左右から掛けて恒等になる逆は $-c(3,4)/25$。実係数なので $(3c_1+4c_2)^*=3(-c_1)+4(-c_2)=-c(3,4)$ である。
<!-- solution-end -->

<a id="ex-gbg30-a02"></a>

#### GBG30-A02 スピン枠とゲージ枠の変更
- Level: A

二次元の例で $h=e^{i\pi/2}$、$g=e^{i\pi/3}$、$\tau(g)=g$ とする。局所成分 $\psi_i=(1,2)^t$ の新しい成分を求め、元の成分に戻せ。

<!-- solution-start -->
**詳細解答**。[スピノル束の構成](#def-gbg30-twisted-spinor)で $T=\sigma(h)\otimes\tau(g)$。$\sigma(h)=c_1c_2=\operatorname{diag}(-i,i)$ なので逆は $\operatorname{diag}(i,-i)$。従って $\psi_j=e^{-i\pi/3}(i,-2i)^t$。$T$ を掛けると位相は相殺し、第一成分は $-i\cdot i=1$、第二成分は $i(-2i)=2$。元の場を表す。
<!-- solution-end -->

<a id="ex-gbg30-a03"></a>

#### GBG30-A03 局所方程式と主シンボル
- Level: A

平面の自明接続で $\psi=(0,x-iy)^t$ に $D$ を作用させよ。また $\xi=(1,2)$ における主シンボルの逆を求めよ。

<!-- solution-start -->
**詳細解答**。[$D$ の定義](#def-gbg30-dirac)から $\partial_x\psi=(0,1)^t$、$\partial_y\psi=(0,-i)^t$。$c_1(0,1)^t=(-1,0)^t$、$c_2(0,-i)^t=(1,0)^t$ なので和は零。主シンボル $i(c_1+2c_2)$ の二乗は $(-1)(-5I)=5I$ だから逆は $i(c_1+2c_2)/5$。
<!-- solution-end -->

<a id="ex-gbg30-a04"></a>

#### GBG30-A04 第一Chern数と指数
- Level: A

外向きの球面上の monopole 線束で $n=-3$ とする。曲率から指数を求め、核の次元に何が言えるか答えよ。

<!-- solution-start -->
**詳細解答**。[第一 Chern 数の定理](../GBG19/index.md#thm-gbg19-curvature-flux)の曲率に $n=-3$ を入れると $F=3i\sin\vartheta\,d\vartheta\wedge d\varphi/2$。積分は $6\pi i$。球面はコンパクト・境界なしで前述のスピン構造を持つので [指数定理のスピン Dirac 型](#thm-gbg30-index-bridge) を適用でき、指数は $(i/2\pi)6\pi i=-3$。従って $\dim\ker D^-=\dim\ker D^++3$、負側は少なくとも3次元である。正側が零とはまだ結論できない。
<!-- solution-end -->

<a id="ex-gbg30-b01"></a>

#### GBG30-B01 純ゲージの打ち消し
- Level: B

平面で初期接続 $A=0$、ゲージ枠変更 $U=e^{if(x,y)}$（$f$ は実滑らか関数）を行う。新しい接続と $D'$ を求め、任意の滑らかな $\psi$ について $D'(U^{-1}\psi)=U^{-1}D\psi$ を直接示せ。

<!-- solution-start -->
**詳細解答**。[局所ゲージ変換則](../GBG8/index.md#thm-gbg8-local-transform)から $A'=U^{-1}dU=i\,df$。従って $D'=c_1(\partial_x+if_x)+c_2(\partial_y+if_y)$。$a=x,y$ について

$$
\partial_a(e^{-if}\psi)
=e^{-if}\partial_a\psi-if_a e^{-if}\psi,
$$

$$
(\partial_a+if_a)(e^{-if}\psi)=e^{-if}\partial_a\psi.
$$

各成分に Clifford 行列を作用させて足すと $D'(e^{-if}\psi)=e^{-if}D\psi$。接続だけ変更して場の成分を変えなければ一般には同じ方程式を表さない。
<!-- solution-end -->

<a id="ex-gbg30-b02"></a>

#### GBG30-B02 四次元指数の符号
- Level: B

コンパクトな境界なしの向き付き四次元 Riemann スピン多様体に SU(2) 基本表現の束があり、$\int c_2=5$、$\int p_1=-48$ とする。指数を計算せよ。また同じ接続と計量で向きを反転し、対応するスピン構造を取るとどうなるか。

<!-- solution-start -->
**詳細解答**。[Chern 指標の低次公式](../GBG23/index.md#prop-gbg23-chern-character-degrees)と $\operatorname{tr}F=0$ から $[\operatorname{ch}]_4=-c_2$、次数0は2。[指数定理](#thm-gbg30-index-bridge)の積の次数4は $-c_2-p_1/12$。従って指数は $-5-(-48)/12=-5+4=-1$。向き反転は両積分の符号を反転させるので $+5-48/12=+1$。Clifford 体積積も向き反転で負になるので、正負の部分束を交換することと整合する。
<!-- solution-end -->

<a id="ex-gbg30-b03"></a>

#### GBG30-B03 平坦でも解の空間が変わる
- Level: B

平坦二次元トーラスで自明なゲージ接続を取る。スピン構造の符号を第一周期方向で $-1$、第二方向で $+1$ とし、場を $\mathbb R^2$ 上の $\psi(x+2\pi,y)=-\psi(x,y)$、$\psi(x,y+2\pi)=\psi(x,y)$ を満たす関数として表す。零モードを求め、周期的スピン構造と比較せよ。

<!-- solution-start -->
**詳細解答**。[トーラスのスピン構造の構成](../GBG29/index.md#ex-gbg29-c01)に対応する符号である。各パッチでの微分式は $D=c_1\partial_x+c_2\partial_y$ のままで $D^2=-\Delta I$。$D\psi=0$ なら $D^2\psi=0$。一周期矩形で部分積分すると、第一方向の両端で $\psi$ と $\partial_x\psi$ は両方とも符号が反転するので境界積は一致し相殺する。第二方向も周期性から相殺する。従って

$$
0=\int (|\partial_x\psi|^2+|\partial_y\psi|^2).
$$

滑らかさから両微分は至るところ零、$\psi$ は定数。この定数は反周期条件で $\psi=-\psi$ を満たすので零しかない。周期的構造では正負各1次元だったが今回は両方零である。いずれも指数は零。曲率と指数が同じでも零モードの個別次元は変わり得る。
<!-- solution-end -->

<a id="ex-gbg30-c01"></a>

#### GBG30-C01 Monopole・instanton・スピン構造・量子測度
- Level: C

外向き $S^2$ の $n=2$ monopole 線束と、GBG28 の向きでの丸い $S^4$ の BPST 基本表現束を比較する。各々について (i) スピン構造の存在をどう確保するか、(ii) 指数、(iii) 片側の零モード変数だけの測度の $\alpha=\pi/2$ における変換因子を求めよ。(iv) これだけではゲージ異常を証明できない理由を述べよ。

<!-- solution-start -->
**詳細解答**。(i) 4節の球面の構成で $d=2,4$ を選ぶ。外向き法線を最後の列に持つ枠をスピン被覆で持ち上げると、各ファイバーは Spin($d$) の右作用で自由かつ推移的であり、被覆は枠束への同変写像を与える。従って [スピン構造の条件](../GBG29/index.md#def-gbg29-spin-structure) を満たす。どちらもゲージ束とは別の構造である。

(ii) $S^2$ は [monopole の曲率と第一 Chern 数](../GBG19/index.md#thm-gbg19-curvature-flux)より $(i/2\pi)\int F=2$。コンパクト・境界なしでスピン構造を固定したから [指数定理](#thm-gbg30-index-bridge)の次数2部分を使って $N_+-N_-=2$。

$S^4$ では [BPST 束の第二 Chern 数](../GBG28/index.md#thm-gbg28-nontrivial) が $-1$。丸い計量の $R_{ab}$ は単純2形式なので各平方が零、[Pontryagin の跡公式](../GBG24/index.md#prop-gbg24-first-pontryagin)で $p_1=0$。

基本表現の跡零から次数4部分は $-c_2-p_1/12$、従って $N_+-N_-=1$。

(iii) 各変数の積分測度は逆位相を得るから $J_0=e^{-i\alpha(N_+-N_-)}$。球面では $e^{-i\pi}=-1$、四次元球面では $e^{-i\pi/2}=-i$。これは指定した一組の変数の変換である。

(iv) この計算はカイラリティ位相の有限次元模型であり、ゲージ群の局所変換や無限次元測度の正則化を扱っていない。[古典 Dirac 方程式のゲージ共変性](#thm-gbg30-dirac-covariance)は別に成立する。量子ゲージ異常の有無には表現、正則化、全場の寄与、場合によっては大域変換の解析が必要である。
<!-- solution-end -->

## 7. まとめ

主束の遷移関数から場を作り、接続で微分し、Clifford 作用で Dirac 方程式を大域化した。楕円性・コンパクト性を足すと零モードの差を数えられ、指数定理を通して Chern–Weil 形式の積分に到達する。これまで計算した第一 Chern 数や第二 Chern 数はその具体的な入力である。量子測度の問題はこの古典幾何を土台とする次の理論である。

参考文献：Lawson–Michelsohn, [Spin Geometry](https://press.princeton.edu/books/hardcover/9780691085425/spin-geometry)（スピン Dirac 作用素・指数定理）；Nakahara, [Geometry, Topology and Physics](https://www.routledge.com/Geometry-Topology-and-Physics-2nd-Edition/Nakahara/p/book/9780750306065)（特性類・指数・異常）。
