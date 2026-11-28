# MQFC43 スケール変更とくりこみ群

前提講座：[MQFC35 二線核の対角延長](../MQFC35/index.md)、[MQFC42 くりこみ処方の変更](../MQFC42/index.md)、[QFT25 くりこみ群方程式](../../QFT/QFT25/index.md)、[QFT26 Wilson流](../../QFT/QFT26/index.md)。

発散を引いて有限な分布を作れても、どの長さで引くかという選択が残る。尺度を変えるたびに別の理論を作るのではなく、局所入力をどれだけ変えれば同じ予測になるかを計算したい。本講では対数の係数を出発点に、有限な尺度変更の合成、微小変更、結合の走りを順に結び付ける。

## 1. 長さと運動量の尺度

時空は四次元Minkowski時空、計量は $(-,+,+,+)$ とする。[二線核の減算延長とcutoff反項](../MQFC35/index.md#thm-mqfc35-fish-extension) で得た延長を $T_R$ と書く。

$R>0$ は減算に使う長さ、$C=-i/(8\pi^2)$ は角度分布の定数関数への作用である。$\varphi\in C_c^\infty(\mathbb R^4)$ は滑らかなコンパクト支持の試験関数、$\delta$ は差変数の原点における四次元の [Dirac のデルタ超関数](../../../解析系/GPDE/GPDE1/index.md#def-gpde1-dirac) で、$\langle\delta,\varphi\rangle=\varphi(0)$ である。二つの延長の差は

$$
\langle T_S-T_R,\varphi\rangle=-C\log(S/R)\varphi(0).
$$

$\mu=1/R$ を逆長さの尺度とし、基準 $\mu_0=1/R_0$ からの無次元の変化量 $t=\log(\mu/\mu_0)$ を用いる。すると $R=R_0e^{-t}$ である。尺度の差を原点にだけ支持を持つ分布として取り出せる。

<a id="prop-mqfc43-scale-residue"></a>

<!-- formal-statement-start -->
> **命題（対数延長の尺度差）**
> 四次元の質量ゼロ二線核の減算延長 $T_R$ を上の規格化で取る。$\mu,\mu_0>0$ に対して

$$
T_{1/\mu}-T_{1/\mu_0}
=C\log(\mu/\mu_0)\delta,\qquad C=-\frac{i}{8\pi^2}.
$$

> 従って $\mu\,dT_{1/\mu}/d\mu=C\delta$ が分布の意味で成り立つ。尺度に依存しない定数倍のデルタを全延長に加えても、この微分は不変である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

既習の [二線核の減算延長とcutoff反項](../MQFC35/index.md#thm-mqfc35-fish-extension) の式に $S=1/\mu,R=1/\mu_0$ を代入する。

$$
-C\log(S/R)=-C\log(\mu_0/\mu)=Ct.
$$

任意の固定試験関数に対する差は $Ct\varphi(0)$ であり、$t$ で微分すれば $C\varphi(0)$ となる。$dt/d\mu=1/\mu$ なので、固定した試験関数への作用を微分する連鎖律から

$$
\mu\frac{d}{d\mu}\langle T_{1/\mu},\varphi\rangle
=\mu\frac{dt}{d\mu}\frac{d}{dt}
\langle T_{R_0e^{-t}},\varphi\rangle
=C\varphi(0).
$$

任意の試験関数で成り立つので分布の等式を得る。全延長に同じ $c\delta$ を加えると差で相殺される。ただし $c$ を尺度依存にすれば微分には $\mu c'(\mu)\delta$ が残る。
<!-- proof-end -->

例えば $\mu=2\mu_0$ では差は $-i\log2\,\delta/(8\pi^2)$ である。逆に長さ $R$ を二倍にした場合は符号が反転する。これはEuclid半径での減算に基づく計算であり、追加のLorentz共変性をこの式だけから主張しない。

## 2. 時空の拡大と処方変更の合成

[Stückelberg–Petermann型処方変更写像](../MQFC42/index.md#def-mqfc42-prescription-map) の設定を引き継ぐ。局所Wick多項式を試験関数で積分した実入力の空間を $\mathcal L$、その複素化を含む単位的スター積代数を $\mathcal A$ とする。局所写像の各多重線形係数は、全入力の位置と出力位置が一致する全対角に支持を持つ有限階の分布核で表される。形式変数の正次数を持つ入力 $X$ だけを代入し、各次数を有限和として扱う。$O(X^k)$ は入力の形式次数 $k$ 以上の項をまとめた記号である。ここからは尺度変換が定義された場合を考える。

質量ゼロの四次元スカラー場では、自由運動項を不変にする場の古典的尺度次元は1である（[再スケーリングと局所演算子のスケーリング指数](../../QFT/QFT26/index.md#def-qft26-rescaling) の四次元の場合。定数倍の座標変換はMinkowski計量でも同じ冪を与える）。例えば場を $(\sigma_t\phi)(x)=e^t\phi(e^tx)$ と変換すると、局所入力 $F_f^{(k)}=\int f(x)\phi(x)^k/k!\,d^4x$ に場の変換を代入し、$y=e^tx$ と置くことで

$$
F_f^{(k)}(\sigma_t\phi)
= e^{(k-4)t}F_{f(e^{-t}\cdot)}^{(k)}(\phi)
$$

を得る。実際、$y=e^tx$ の座標変換の微分行列は $e^t I_4$（$I_4$ は四次の単位行列）なので、体積要素は $d^4x=e^{-4t}d^4y$ となる。場の $k$ 因子からの $e^{kt}$ と掛け合わせた結果が上式であり、$f(e^{-t}\cdot)$ は $y\mapsto f(e^{-t}y)$ を表す。四次項は係数の冪が零、二次項は $e^{-2t}$ となる。試験関数の台は $e^t$ 倍に変換され（$t$ が負なら縮小）、コンパクト性は保たれる。これは局所入力での作用の例であり、量子代数への拡張は次の仮定で明示する。質量が固定されたままの massive 自由場には一般に同じ尺度自己同型がないので、質量も変換する代数族の間の同型が必要になる。

$\sigma_t$ を $\mathcal A$ の単位的複素線形代数自己同型の滑らかな一径数群と仮定する。ここで自己同型とは代数の和・複素数倍・積・単位元を保つ全単射であり、体の自己同型に対象を限定しない。

すなわち $\sigma_0=\mathrm{id}$、$\sigma_{s+t}=\sigma_s\sigma_t$ で、局所入力に上のような尺度変換を誘導し、因果順序を保つとする。

$S^{(t)}=\sigma_t\circ S\circ\sigma_{-t}$ は変換後の処方である。

[局所S行列の処方比較](../MQFC42/index.md#thm-mqfc42-prescription-comparison) と同じく $S(X)=1+iX+O(X^2)$ とする。$\sigma_t$ は複素線形で単位元を保つので $S^{(t)}$ の定数・一次項も $1+iX$ である。因果帰納と局所閉性の条件を満たすと仮定すれば、局所写像 $Z_t$ により $S^{(t)}=S\circ Z_t$ と表せる。尺度変換は入力の複素化を保ち、分布係数への共役は固定した $t$ で係数ごとの微分と交換できる通常の尺度引き戻しとする。

<a id="def-mqfc43-scaling-cocycle"></a>

<!-- formal-statement-start -->
> **定義（尺度処方変更コサイクル）**
> $\sigma_t$ を上記の局所性・因果順序を保つ代数自己同型の一径数群、$S$ を局所S行列とし、各 $S^{(t)}$ が [局所S行列の処方比較](../MQFC42/index.md#thm-mqfc42-prescription-comparison) の条件を満たすとする。そこで一意に定まる局所処方変更写像 $Z_t$ を

$$
\sigma_t\circ S\circ\sigma_{-t}=S\circ Z_t
$$

> により取る。また局所写像 $Z$ への尺度の作用を

$$
A_t Z=\sigma_t\circ Z\circ\sigma_{-t}
$$

> と置く。この尺度に伴う処方変更の族を尺度処方変更コサイクルとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc43-scaling-cocycle -->
### 直接例：一変数の形式模型

**定義の確認**。位置を一つだけに縮約した可換代数模型として $\mathcal A=\mathbb C[u]$、$\mathcal L=\mathbb R[u]$ とし、$\sigma_t p(u)=p(e^tu)$ を取る。多項式変数 $u$ と挿入数を数える形式変数は別物である。任意の多項式 $p,q$ について $\sigma_t(pq)=p(e^tu)q(e^tu)=\sigma_t(p)\sigma_t(q)$、$\sigma_t(1)=1$ である。実係数も保ち、$\sigma_s\sigma_t p(u)=p(e^{s+t}u)$ だから群の条件を満たし、$\sigma_{-t}$ が逆になる。形式入力 $X$ に対して $S(X)=1+iX+auX^2$（$a=ik$、$k$ は実定数）と置くと、直接共役して

$$
S^{(t)}(X)=1+iX+ae^tuX^2
$$

となる。定数項と一次項は元の処方と一致する。一次項が $iX$ なので形式的比較写像は次数ごとに一意に構成できる。実際、$a=ik$ と置いた比較式を $i$ で割り定数項を除くと

$$
Z_t+kuZ_t^2=X+ke^tuX^2.
$$

次数 $n$ の未知係数は左辺第一項にだけ現れ、第二項は既に求めた次数 $n-1$ 以下の係数だけで決まる。従って実多項式係数で一意に解け、二次まで

$$
Z_t(X)=X+\frac{a(e^t-1)}i uX^2+O(X^3).
$$

代入すると $iZ_t+auZ_t^2=iX+ae^tuX^2+O(X^3)$ となる。

定数部は零、線形部は恒等であり、各係数は通常の多項式積による対称多重線形写像である。位置は一つだけなので対角支持条件に対応する局所性も満たす。

$A_s$ は補正に含まれる $u$ を $e^su$ に置き換える。例えば $\sigma_s(u(\sigma_{-s}X)^2)=e^suX^2$ であり、入力への逆変換は外側の変換と相殺する。これは因果順序を持つ場の理論そのものではなく、合成則の代数部分を直接確認する模型である。
<!-- definition-example-end -->

普通の一径数群なら $Z_{s+t}=Z_s\circ Z_t$ と考えたくなる。しかし最初の尺度変更によって、次の局所補正の係数も変換される。

<a id="thm-mqfc43-cocycle"></a>

<!-- formal-statement-start -->
> **定理（尺度処方変更のねじれた合成則）**
> [尺度処方変更コサイクル](#def-mqfc43-scaling-cocycle) の仮定の下で、任意の実数 $s,t$ について

$$
Z_0=\mathrm{id},\qquad
Z_{s+t}=Z_s\circ A_s Z_t,\qquad
Z_t^{-1}=A_t Z_{-t}.
$$

> $A_s Z_t=Z_t$ がすべての $s,t$ で成立する場合には通常の一径数群となる。
<!-- formal-statement-end -->

### 証明の見取り図

変換後のS行列を二通りに書き、局所処方変更写像の一意性を使う。尺度変換は合成全体に作用するので、二番目の写像に共役が残る。

<!-- proof-start -->
### 証明

$\sigma_0=\mathrm{id}$ より $S^{(0)}=S$。恒等写像が比較式を満たすため、一意性から $Z_0=\mathrm{id}$ となる。群の積を使って

$$
S^{(s+t)}=\sigma_s\circ S^{(t)}\circ\sigma_{-s}.
$$

ここに $S^{(t)}=S\circ Z_t$ を入れ、$S$ と $Z_t$ の間へ $\sigma_{-s}\sigma_s=\mathrm{id}$ を挿入する。

$$
S^{(s+t)}
=(\sigma_s\circ S\circ\sigma_{-s})
\circ(\sigma_s\circ Z_t\circ\sigma_{-s})
=S\circ Z_s\circ A_s Z_t.
$$

共役は局所性と線形部の恒等性を保つ。[局所処方変更写像の合成と逆](../MQFC42/index.md#thm-mqfc42-prescription-group) により右辺の入力写像も許容される。比較の一意性から合成則が従う。$s=t_0,t=-t_0$ を代入すると

$$
\mathrm{id}=Z_{t_0}\circ A_{t_0}Z_{-t_0}.
$$

既習の逆写像が存在するので左から $Z_{t_0}^{-1}$ を合成して逆の式を得る。
<!-- proof-end -->

この代数模型で $uX^2$ の係数を $d(t)=a(e^t-1)/i$ と置けば $d(s+t)=d(s)+e^sd(t)$ となる。$e^s$ が無い合成則では一致しない。

## 3. 微小な変更から有限な流れへ

有限な尺度差が分かれば、基準点での微分によって局所的な生成項を取り出せる。以下の微分は入力 $X$ を固定して尺度変数 $t$ だけについて取り、形式級数の各係数（分布なら固定試験関数への作用）を微分する。$d/dt$ と $\partial_t$ は固定入力で同じ意味である。係数ごとの $o(h)$ は $h$ で割ると零へ収束する剰余を表す。一方、入力の変化を調べる $DZ_t(X)[H]$ は $t$ を固定し、$Z_t(X+\epsilon H)$ の形式変数 $\epsilon$ の一次係数として定める方向微分である。

<a id="def-mqfc43-scale-generator"></a>

<!-- formal-statement-start -->
> **定義（尺度処方変更の無限小生成項）**
> 各係数が $t$ について微分可能な [尺度処方変更コサイクル](#def-mqfc43-scaling-cocycle) $Z_t$ に対し、その無限小生成項を局所入力の形式写像

$$
B(X)=\left.\frac{d}{dt}Z_t(X)\right|_{t=0}
$$

> とする。$Z_t(0)=0$ と恒等線形部が全 $t$ で保たれるため $B$ は定数項・一次項を持たない。微分した分布核は全対角に支持を持つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc43-scale-generator -->
### 直接例：二次の尺度変化

**定義の確認**。前節の模型では各係数が $e^t$ の多項式なので微分可能である。$d(t)=a(e^t-1)/i$ についてプライムは $t$ に関する導関数を表し、$d'(0)=a/i$ となる。従って

$$
B(X)=\frac ai uX^2+O(X^3).
$$

定数・一次の係数は全 $t$ でそれぞれ零・恒等なので微分後はどちらも零である。

全対角外の位置を持たない模型なので局所性も満たす。一般の分布核でも全対角外に台を持つ試験関数への作用は全 $t$ で零であり、その微分も零となる。
<!-- definition-example-end -->

<a id="thm-mqfc43-infinitesimal-flow"></a>

<!-- formal-statement-start -->
> **定理（尺度処方変更の微分方程式）**
> 各形式係数が微分可能な [尺度処方変更コサイクル](#def-mqfc43-scaling-cocycle) $Z_t$ とその [無限小生成項](#def-mqfc43-scale-generator) $B$ について

$$
\frac{d}{dt}Z_t(X)=DZ_t(X)[(A_tB)(X)],\qquad Z_0(X)=X.
$$

> ここで $DZ_t(X)[H]$ は $Z_t(X+\epsilon H)$ の形式変数 $\epsilon$ の一次係数である。$A_tB=B$ の場合にはさらに $dZ_t(X)/dt=B(Z_t(X))$ が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[尺度処方変更のねじれた合成則](#thm-mqfc43-cocycle) を $Z_{t+h}=Z_t\circ A_tZ_h$ に適用する。$Z_h(X)=X+hB(X)+o(h)$ を各形式次数で用いると

$$
(A_tZ_h)(X)=X+h(A_tB)(X)+o(h).
$$

$Z_t$ の多重線形係数を展開すると、一つの入力だけが $h(A_tB)(X)$ に置き換わる項が一次で、二つ以上置き換わる項は $o(h)$ となる。よって

$$
Z_{t+h}(X)-Z_t(X)=hDZ_t(X)[(A_tB)(X)]+o(h).
$$

$h$ で割り極限を取る。$A_s Z_t$ の不変性を仮定せずとも、$A_tB=B$ なら右辺の方程式を形式次数ごとに一意に解ける。

実際、$Z_t(X)=X+\sum_{k\ge2} Z_{t,k}(X,\ldots,X)/k!$ とすると、対称多重線形性から

$$
DZ_t(X)[B(X)]
=B(X)+\sum_{k\ge2}\frac{Z_{t,k}(B(X),X,\ldots,X)}{(k-1)!}.
$$

$B$ は二次以上なので、和の第 $k$ 項は少なくとも $k+1$ 次である。従って次数 $n$ の右辺は $Z_t$ の次数 $n-1$ 以下の係数のみを含み、初期値から逐次積分できる。

$A_s Z_t$ も共役した同じ方程式と初期値を満たすので、一意性から $A_s Z_t=Z_t$。

したがって [ねじれた合成則](#thm-mqfc43-cocycle) を順序 $(h,t)$ に適用すると $Z_{t+h}=Z_h\circ A_hZ_t=Z_h\circ Z_t$ とも書け、$h$ で微分すると $B(Z_t(X))$ が得られる。
<!-- proof-end -->

この方程式は形式次数ごとの等式である。数値的に収束した相互作用の存在や無限尺度での極限を与えるわけではない。

## 4. 二線核から結合と質量項を読む

尺度差の局所入力への移行を実際に計算しよう。局所Wick多項式の四次項と二次項に対し、$f,h$ を実の滑らかなコンパクト支持関数とし、

$$
V_f=\int f(x)\frac{:\phi^4(x):}{4!}\,d^4x,\qquad
M_h=\int h(x)\frac{:\phi^2(x):}{2!}\,d^4x
$$

と置く。ここでは質量ゼロの自由核を使う。$M_h$ は二次の相互作用への挿入であり、自由伝播関数に非零の質量を入れた計算とは区別する。$f,h$ に結合を含めるため挿入数の形式変数 $\lambda$ は別に付ける。MQFC39では各収縮に $\hbar$ が付く。本節では二線収縮の数値係数を求めるため、時間順序積の差の計算中に共通因子 $\hbar^2$ をくくる。比較写像へ戻すときはこの因子を復元する（全形式級数に $\hbar=1$ を代入する操作ではない）。

[円筒多項式の時間順序積](../MQFC39/index.md#def-mqfc39-time-product) の二点間の収縮を、[局所二次挿入の非対角収縮](../MQFC39/index.md#prop-mqfc39-local-quadratic) と同じ差変数 $z=x-y$ の設定で局所多項式の非対角部分へ適用する。二本の収縮を選ぶと、四次項同士では両側の4本から2本ずつを選び、選んだ2本を $2!$ 通りで結ぶ。係数は

$$
\frac{\binom42^2 2!}{(4!)^2}
=\frac{6^2\cdot2}{24^2}=\frac18.
$$

残る場は各点2本ずつで、対角に制限すれば四次のWick多項式になる。四次項と二次項の場合は

$$
\frac{\binom42\binom22 2!}{4!2!}
=\frac{6\cdot1\cdot2}{24\cdot2}=\frac14.
$$

残るのは四次側の場2本である。これらの項だけに [対数延長の尺度差](#prop-mqfc43-scale-residue) を適用し、$\mu=\mu_0e^t$ の処方を $S_\mu$ とする。

ここでの比較は固定座標で $S_\mu=S_{\mu_0}\circ Y_t$ と書く（時空の共役を伴う $Z_t$ と区別する）。両処方は [局所S行列の処方比較](../MQFC42/index.md#thm-mqfc42-prescription-comparison) の因果帰納・局所閉性・同じ一次積の条件を満たすとし、他の反項・収縮数の効果は分離する。

<a id="prop-mqfc43-fish-couplings"></a>

<!-- formal-statement-start -->
> **命題（二線収縮による局所結合の尺度変化）**
> 四次元質量ゼロ自由スカラー場の上記規格化の $V_f,M_h$ に対し、$T_{1/\mu}-T_{1/\mu_0}=Ct\delta$ とする。$S_\mu=S_{\mu_0}\circ Y_t$ を満たす比較写像の二次係数のうち二線収縮に由来する四次・二次の成分を取ると、$X=\lambda(V_f+M_h)$ に対する $\lambda^2\hbar^2$ の係数は

$$
\frac{3t}{16\pi^2}V_{f^2}
+\frac{t}{16\pi^2}M_{fh}
$$

> となる。真空項および他の収縮数の成分はこの式の対象外とする。
<!-- formal-statement-end -->

### 証明の見取り図

対角上に残った場を再び $4!$ または $2!$ で規格化した局所入力へ戻す。最後にS行列の規約による $i$ と、二次係数の $1/2!$ を掛ける。

<!-- proof-start -->
### 証明

$\Delta T_2=T_{2,\mu}-T_{2,\mu_0}$ と差の向きを定める。以下、$\Delta T_2^{[2]}$ は二線成分の $\hbar^2$ の係数を表す。四次同士では差変数のデルタが $x=y$ に集めるため $f(x)f(y)$ は $f(y)^2$、残った二点の場は同一点の四次Wick多項式となる。係数 $1/8$ を規格化 $1/4!$ に戻すと $4!/8=3$ なので、時間順序積の差は

$$
\Delta T_2^{[2]}(V_f,V_f)
=\frac{Ct}{8}\int f(x)^2:\phi^4(x):\,d^4x
=3Ct V_{f^2}
$$

である（ここでは指定成分のみを等式に残す）。四次と二次の混合項では

$$
\Delta T_2^{[2]}(V_f,M_h)
=\frac{Ct}{4}\int f(x)h(x):\phi^2(x):\,d^4x
=\frac{Ct}{2}M_{fh}.
$$

二次同士の二線収縮には場が残らないので真空項である。[処方変更の低次係数](../MQFC42/index.md#thm-mqfc42-low-order-change) により $Y_{t,2}=i\Delta T_2$（$Y_{t,2}$ は $Y_t(X)=X+Y_{t,2}(X,X)/2!+\cdots$ の対称双線形係数）。入力 $X$ への二次寄与は

$$
\frac{\lambda^2\hbar^2 i}{2}
\bigl(3CtV_{f^2}+2(Ct/2)M_{fh}\bigr).
$$

混合項の2は二つの入力の選び方から来る。$iC=1/(8\pi^2)$ を代入し、$\lambda^2\hbar^2$ の係数を取り出せば結論を得る。
<!-- proof-end -->

例えば $f=g\chi,h=m^2\chi$ とし、滑らかなコンパクト支持関数 $\chi$ が1である領域に着目すれば、そこで $f^2=g^2$、$fh=gm^2$ となる。結合の二次係数は $3g^2t/(16\pi^2)$、二次挿入の係数は $gm^2t/(16\pi^2)$ である。領域外では $\chi^2$ を $\chi$ に置き換えてはいけない。

[四次相互作用の一ループβ関数と質量の走り](../../QFT/QFT25/index.md#thm-qft25-phi4-beta) の係数 $3/(16\pi^2)$ と $1/(16\pi^2)$ がここにも現れる。

ただし比較の向きを区別する。$S_\mu(X)=S_{\mu_0}(Y_t(X))$ は新処方の固定入力を旧処方の入力へ移す式である。固定した予測を新処方で表すなら [局所処方変更写像の合成と逆](../MQFC42/index.md#thm-mqfc42-prescription-group) により $X_\mu=Y_t^{-1}(X_{\mu_0})$ と逆変換する。

例えば相互作用の符号を $X=-\lambda(V_f+M_h)$ と取ると、二次補正は二入力の負号が相殺されるため正の入力の場合と同じである。逆変換ではその補正を引くので、$\chi=1$ の領域で負号付き入力の係数を読み直すと

$$
g_\mu=g+\lambda\hbar^2 ag^2t+O(\lambda^2),\qquad
u_\mu=u+\lambda\hbar^2 bgu t+O(\lambda^2)
$$

となる（全入力の共通因子 $-\lambda$ をくくった式。$u=m^2,a=3/(16\pi^2),b=1/(16\pi^2)$）。ここでは指定した二線成分だけを追っている。通常の頂点の結合との同定には作用の符号、規格化、裸パラメータの固定条件を対応させる必要がある。ここで係数の一致を確認したことは、質量付き理論全体のβ関数をこの二線核だけから導いたという意味ではない。

[くりこみ群β関数と場の異常次元](../../QFT/QFT25/index.md#def-qft25-rg-functions) の固定裸パラメータの規約では、[四次相互作用の一ループβ関数と質量の走り](../../QFT/QFT25/index.md#thm-qft25-phi4-beta) により $d g/d\log\mu=ag^2$、$d u/d\log\mu=bgu$（一ループ打切り）。ここで $u=m^2$、$a=3/(16\pi^2)$、$b=1/(16\pi^2)$ とする。

$g(0)=g_0>0,u(0)=u_0>0$ とすると [一ループの流れの積分と有効域](../../QFT/QFT25/index.md#prop-qft25-flow-solution) の結合解は $g(t)=g_0/(1-ag_0t)$ である。

質量の方は、$u>0$ の初期値近傍で連鎖律により $d\log u/dt=(du/dt)/u=bg(t)$ となる。積分変数を $v$ とすれば

$$
\log\frac{u(t)}{u_0}
=\int_0^t\frac{bg_0}{1-ag_0v}\,dv.
$$

$1-ag_0t>0$ の範囲で対数を用いて積分すると

$$
\log(u/u_0)=-\frac ba\log(1-ag_0t),
\qquad
u(t)=u_0(1-ag_0t)^{-1/3}.
$$

これは打切った微分方程式の解であり、結合が大きくなる領域まで摂動近似を保証しない。

## 5. Wilson流との違い

[高運動量殻の積分消去とWilson作用](../../QFT/QFT26/index.md#def-qft26-wilson-action) では、有限モードで低運動量場 $x$ と高運動量場 $y$ を分け、例えば

$$
e^{-S_{\mathrm{low}}(x)}=\int e^{-S(x,y)}\,dy
$$

とする。積分が有限で正なら対数を取れる。$S(x,y)=(x^2+y^2)/2+\kappa xy$、実数 $|\kappa|<1$ なら

$$
S(x,y)=\frac{(y+\kappa x)^2}{2}
+\frac{1-\kappa^2}{2}x^2.
$$

$x$ を固定し $v=y+\kappa x$ と置くと $dv=dy$、積分範囲は実数全体のままである。よって

$$
e^{-S_{\mathrm{low}}(x)}
=e^{-(1-\kappa^2)x^2/2}
\int_{\mathbb R}e^{-v^2/2}\,dv
=\sqrt{2\pi}e^{-(1-\kappa^2)x^2/2}.
$$

最後の積分値は [有限次元Gaussian生成公式](../../QFT/QFT19/index.md#thm-qft19-gaussian) の一次元・源が零の場合である。低モード作用は定数を除いて $(1-\kappa^2)x^2/2$ となる。$1-\kappa^2>0$ なので低モードも積分可能で、全積分が有限・正というWilson作用の仮定を満たす。

$\kappa$ と $-\kappa$ で同じ低モード作用になるため、この操作一般には元の全モード作用を一意に復元できない。一方、[尺度処方変更のねじれた合成則](#thm-mqfc43-cocycle) の $Z_t$ は同じ局所入力空間で逆を持つ。

| 操作 | 固定するもの | 変化させるもの |
| --- | --- | --- |
| 有限処方変更 | 原点外の核、局所比較の条件 | 対角上の反項と局所入力 |
| 固定裸理論の尺度微分 | 裸パラメータ | くりこみ結合、質量など |
| Wilsonの殻積分 | 残った低モードの期待値 | 積分する自由度、作用、カットオフ |

[薄殻Wilson流](../../QFT/QFT26/index.md#thm-qft26-shell-flow) の四次元軽質量の近似では、赤外向きの変数 $s=\log(\Lambda_0/Q)$ に対して $r=m^2/\Lambda^2\ll1$ として $(1+r)^{-2}$ を1で近似した結合の先頭項は $dg/ds=-ag^2$ である。

$\mu=Q$ と対応させると $ds=-d\log\mu$ だから、QFT25の紫外向きのβ関数と同じ先頭係数になる。ただしWilson流の質量には加法的カットオフ依存もあり、両者の全係数や操作そのものを同一視してはいけない。

## 6. 演習

### 演習 MQFC43-A1：尺度の向き
- Level: A

$\mu=4\mu_0$ と $R=4R_0$ の場合それぞれの二線核の延長差を求めよ。

<!-- solution-start -->
**詳細解答**

[対数延長の尺度差](#prop-mqfc43-scale-residue) で前者は $t=\log4$、差は $-i\log4\,\delta/(8\pi^2)$。後者は $\mu=\mu_0/4$ なので $t=-\log4$、差は $+i\log4\,\delta/(8\pi^2)$。長さと逆長さの対数が逆符号になる。
<!-- solution-end -->

### 演習 MQFC43-A2：固定反項と尺度依存反項
- Level: A

$U_\mu=T_{1/\mu}+(c+k\log(\mu/\mu_0))\delta$（$c,k$ は複素定数）について $\mu\,dU_\mu/d\mu$ を求めよ。

<!-- solution-start -->
**詳細解答**

[対数延長の尺度差](#prop-mqfc43-scale-residue) より最初の微分は $C\delta$。$c$ の微分は零で、$\mu d\log(\mu/\mu_0)/d\mu=1$。従って $(C+k)\delta$ となる。固定有限反項では係数は不変だが、$k\ne0$ では変わる。
<!-- solution-end -->

### 演習 MQFC43-A3：二次入力の古典的尺度
- Level: A

第2節の場の変換について $F_f^{(2)}$ と $F_f^{(4)}$ の係数の冪を求めよ。

<!-- solution-start -->
**詳細解答**

場の $k$ 個の因子から $e^{kt}$、変数 $y=e^tx$ のJacobianから $d^4x=e^{-4t}d^4y$ が出る。試験関数は $f(e^{-t}y)$ になるので二次は $e^{-2t}F_{f(e^{-t}\cdot)}^{(2)}$、四次は $F_{f(e^{-t}\cdot)}^{(4)}$ となる。係数の冪が異なるが試験関数の変換は共通である。
<!-- solution-end -->

### 演習 MQFC43-A4：二線の組合せ
- Level: A

$:\phi^4:/4!$ と $:\phi^2:/2!$ の間の二線収縮について、選択数と残る場の数を求めよ。

<!-- solution-start -->
**詳細解答**

四次側で $\binom42=6$、二次側で $\binom22=1$、対応が $2!=2$ 通りなので12通り。規格化を入れると $12/(24\cdot2)=1/4$。合計6本のうち2本ずつ消えるので2本が残る。対角上で $:\phi^2:=2!(:\phi^2:/2!)$ と戻すと係数は $1/2$ になる。
<!-- solution-end -->

### 演習 MQFC43-B1：ねじれた合成の低次検算
- Level: B

一変数の形式入力座標 $x$ について $Z_t(x)=x+k(e^t-1)x^2+O(x^3)$（$k\in\mathbb R$）とする。ここでは入力座標の線形変換 $\sigma_s:x\mapsto e^{-s}x$ による共役を考える（第2節の多項式代数の自己同型とは別の模型）。$Z_s\circ A_sZ_t$ と $Z_s\circ Z_t$ を二次まで計算せよ。

<!-- solution-start -->
**詳細解答**

$A_sZ_t(x)=e^{-s}Z_t(e^sx)=x+ke^s(e^t-1)x^2+O(x^3)$。これを $Z_s$ に代入すると二次係数は

$$
k(e^s-1)+ke^s(e^t-1)=k(e^{s+t}-1).
$$

従って [尺度処方変更のねじれた合成則](#thm-mqfc43-cocycle) と一致する。通常の合成の二次係数は $k(e^s+e^t-2)$ で、差は $k(e^s-1)(e^t-1)$。$k=0$ または片方の尺度変更が零でなければ一致しない。
<!-- solution-end -->

### 演習 MQFC43-B2：不変な生成項の三次係数
- Level: B

$A_tB=B$ と仮定した一変数の形式模型で $B(x)=ax^2+bx^3+O(x^4)$ とする。$Z_t=x+c(t)x^2+d(t)x^3+O(x^4)$ を三次まで求めよ。

<!-- solution-start -->
**詳細解答**

[尺度処方変更の微分方程式](#thm-mqfc43-infinitesimal-flow) より、$x$ を固定した微分 $dZ_t(x)/dt=B(Z_t(x))$ を使う。以下 $c',d'$ はそれぞれ $dc/dt,dd/dt$ を表す。$Z_t^2=x^2+2cx^3+O(x^4)$、$Z_t^3=x^3+O(x^4)$ なので

$$
c'=a,\qquad d'=2ac+b.
$$

初期値 $c(0)=d(0)=0$ から $c=at$、$d'=2a^2t+b$、$d=a^2t^2+bt$。従って $Z_t=x+atx^2+(a^2t^2+bt)x^3+O(x^4)$。二次生成項だけでも三次が生じる。
<!-- solution-end -->

### 演習 MQFC43-B3：結合と質量の同時変化
- Level: B

正定数 $a,b,g_0,u_0$ に対し、プライムを尺度時間 $t$ についての微分として $g'=ag^2,u'=bgu$、$g(0)=g_0,u(0)=u_0$ を解き、$u/u_0=(g/g_0)^{b/a}$ を確認せよ。

<!-- solution-start -->
**詳細解答**

$g>0$ の初期値近傍で $(1/g)'=-g'/g^2=-a$。積分して $1/g=1/g_0-at$、$g=g_0/(1-ag_0t)$。$u>0$ の範囲で $(\log u)'=bg$ なので

$$
\log(u/u_0)=\int_0^t\frac{bg_0}{1-ag_0s}\,ds
=-\frac ba\log(1-ag_0t).
$$

指数を取り $u=u_0(1-ag_0t)^{-b/a}$。この解は $1-ag_0t>0$ の区間全体で正であり、連鎖律によって $u'=u\,bg_0/(1-ag_0t)=bgu$ と確認できる。$g/g_0=(1-ag_0t)^{-1}$ から求める関係が従う。$t<1/(ag_0)$ で両者正、微分方程式にも直接代入できる。物理的な摂動近似の有効域はこれより狭くなり得る。
<!-- solution-end -->

### 演習 MQFC43-B4：積分消去の非一意性
- Level: B

$S(x,y)=x^2/2+c(y+\kappa x)^2/2$（$c>0,\kappa\in\mathbb R$）で $y$ を積分消去し、$\kappa$ の情報が残るか調べよ。

<!-- solution-start -->
**詳細解答**

固定した $x$ で $v=y+\kappa x$ と置けば $dv=dy$ で積分範囲は実数全体。従って

$$
\int e^{-S(x,y)}dy
=e^{-x^2/2}\int e^{-cv^2/2}dv
=\sqrt{2\pi/c}\,e^{-x^2/2}.
$$

ここで $c>0$ より $w=\sqrt c\,v$ と置けば $dv=dw/\sqrt c$ となり、[有限次元Gaussian生成公式](../../QFT/QFT19/index.md#thm-qft19-gaussian) の一次元・源が零の場合の値 $\sqrt{2\pi}$ から上の係数を得る。残った $x$ についてもGaussian積分は有限で正なので全積分は有限・正である。低モード作用は定数を除いて $x^2/2$ であり $\kappa$ に依存しない。[Wilson積分消去と低運動量期待値の保存](../../QFT/QFT26/index.md#prop-qft26-low-mode-observables) の通り低モードだけの期待値は保存されるが、元の混合係数 $\kappa$ は復元できない。
<!-- solution-end -->

### 演習 MQFC43-C1：尺度差、局所入力、予測の固定
- Level: C

$X=\lambda V_f$ とし、二線収縮の四次成分だけを二次まで追う。$\mu_1/\mu_0=e^s,\mu_2/\mu_1=e^t$ とする。

1. 延長差の加法性を示せ。
2. $S_{\mu_1}=S_{\mu_0}\circ Y_{01}$、$S_{\mu_2}=S_{\mu_1}\circ Y_{12}$ の比較写像の二次四次成分を計算せよ。
3. 固定した旧処方の入力を新処方で表すときの二次補正を求め、通常の固定裸理論のβ関数を求める操作と区別せよ。

<!-- solution-start -->
**詳細解答**

(1) [対数延長の尺度差](#prop-mqfc43-scale-residue) により一段目は $Cs\delta$、二段目は $Ct\delta$。和は $C(s+t)\delta$ であり $\log(\mu_2/\mu_0)=s+t$ と一致する。

(2) [二線収縮による局所結合の尺度変化](#prop-mqfc43-fish-couplings) から $a=3/(16\pi^2)$ と書くと

$$
Y_{01}(\lambda V_f)=\lambda V_f+\lambda^2\hbar^2 as V_{f^2}+O(\lambda^3),
$$

$$
Y_{12}(\lambda V_f)=\lambda V_f+\lambda^2\hbar^2 at V_{f^2}+O(\lambda^3).
$$

式は一次項と指定した二線四次成分だけを残して読む。合成では外側の二次写像に内側の二次項を入れると、もう一方の入力は最低一次なので三次以上になる。外側の線形部が恒等であるため内側の二次項はそのまま残り、外側の二次項と加算される。よって $Y_{02}=Y_{01}\circ Y_{12}$ の指定成分は $\lambda^2\hbar^2 a(s+t)V_{f^2}$。これは処方間の比較であり、座標の共役を行った第2節のコサイクルとは区別される。

(3) 固定した $S_{\mu_0}(X)$ を $S_{\mu_2}(W)$ と書くには $Y_{02}(W)=X$ とする。[局所処方変更写像の合成と逆](../MQFC42/index.md#thm-mqfc42-prescription-group) の二次逆写像の式より

$$
W=\lambda V_f-\lambda^2\hbar^2 a(s+t)V_{f^2}+O(\lambda^3)
$$

が指定成分での答えである。代入すると $-\lambda^2\hbar^2 a(s+t)V_{f^2}$ と外側の二次補正が相殺する。旧処方での新入力を求める式と新処方での旧入力を求める式の向きが逆である。QFT25の [くりこみ群β関数と場の異常次元](../../QFT/QFT25/index.md#def-qft25-rg-functions) では裸パラメータを固定してくりこみ結合を微分する。その比較には作用・頂点の規格化と尺度の意味を揃える必要がある。
<!-- solution-end -->

## 参考文献

- K. Rejzner, *Perturbative Algebraic Quantum Field Theory*, Springer, 2016.
- M. Dütsch, *From Classical Field Theory to Perturbative Quantum Field Theory*, Birkhäuser, 2019.
- R. Brunetti, M. Dütsch and K. Fredenhagen, “Perturbative Algebraic Quantum Field Theory and the Renormalization Groups,” Advances in Theoretical and Mathematical Physics 13 (2009), 1541–1599.
