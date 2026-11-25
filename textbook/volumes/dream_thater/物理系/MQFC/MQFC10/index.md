# MQFC10 OS公理から相対論的場へ

[MQFC9](../MQFC9/index.md) で得た非負 ハミルトニアン は、Euclid 時間の減衰を実時間の振動へ変えます。しかし相対論的場を構成するには、全ての多点相関について実時間の分布を得て、局所性・時空共変性・スペクトル条件を確認する必要があります。本講では再構成の入力と出力を整理し、自由場についてその変換を紙上で実行します。

直接の前提は [MQFC3](../MQFC3/index.md)、[MQFC4](../MQFC4/index.md)、[MQFC7](../MQFC7/index.md)、[MQFC8](../MQFC8/index.md)、[MQFC9](../MQFC9/index.md) です。時空は4次元、Lorentz計量は $(-,+,+,+)$、自然単位系、内積は第2引数線形とします。MQFC3・4の内積表示を使う際は引数を交換します。空間 Fourier 変換の逆変換の位相は $e^{ik\cdot x}$ です。

## 1. 何を相関階層に要求するか

[Schwinger関数](../MQFC7/index.md#def-mqfc7-schwinger) は Euclid 場の測定の積の平均です。一方、量子場の真空期待値は場の積の順序に依存します。対称な Euclid 相関から順序付きの真空期待値を取り戻すためには、時間の順序を指定して解析接続します。

まず一致点を分けます。$x_j=(\tau_j,\boldsymbol x_j)$ とし、$\mathcal S_0(\mathbb R^{4n})$ は [Schwartz空間](../MQFC1/index.md#def-mqfc1-schwartz) のうち、いずれかの $x_i=x_j$ となる集合上で関数と全偏導関数が零となるものの空間です。位相は Schwartz 空間から受け継ぎます。その連続双対の元は一致点に支持されるデルタ分布やその導関数を区別しません。例えば $n=2$ では $f(x,x)=0$ なので $\int f(x,x)d^4x=0$ です。全 Schwartz 空間への分布の延長が一意という意味ではありません。

有限列 $f=(f_0,f_1,\ldots)$ を考えます。$f_0\in\mathbb C$、$f_n\in\mathcal S(\mathbb R^{4n})$ で、$n\ge1$ の各成分とその導関数は $0<\tau_1<\cdots<\tau_n$ の外で零とします。この空間を $\mathcal S_+$ と書きます。時間反転 $\theta(\tau,\boldsymbol x)=(-\tau,\boldsymbol x)$ と複素共役を合わせた試験関数を

$$
(\Theta f_n)(x_1,\ldots,x_n)
=\overline{f_n(\theta x_1,\ldots,\theta x_n)}
$$

と置きます。$\otimes$ は別々の変数の関数の積を表します。空間ベクトル $a\in\mathbb R^3$ に対し $g_m^{(a)}$ は $g_m$ の全点を $(0,a)$ だけ移動した試験関数、すなわち各引数から $(0,a)$ を引いた関数です。零次の成分には反転や並進は作用しません（$\Theta f_0=\bar f_0$）。

次の条件は、1973年の原論文の実スカラー場の形式です。[多項式反射陽性](../MQFC8/index.md#def-mqfc8-reflection-positivity) を一般の順序付き試験関数の有限列へ広げます。原論文は反転・共役に加えて負時間側の引数順を逆転しますが、実スカラー場では E3 の点の置換に関する対称性を同時に要求するので、反転したブロック内を逆順にしてもしなくても各相関分布の値は等しくなります。ここでは逆順を省いた等価な表記を採ります。クラスター性とは、空間的に遠ざけた二つの観測の相関がそれぞれの平均の積へ近づく性質です。

<a id="def-mqfc10-os-conditions"></a>

<!-- formal-statement-start -->
> **定義（Euclid相関階層のOS条件 E0–E4）**
> $S_n$ は $n$ 点の Euclid 相関分布、$n=0,1,\ldots$ とする。
>
> E0（分布性）：$S_0=1$、各 $S_n$ は $\mathcal S_0(\mathbb R^{4n})$ 上の連続線形汎関数である。
>
> E1（Euclid共変性）：全点に同じ Euclid 並進および回転を作用させても $S_n$ は不変である（実スカラー場）。
>
> E2（反射陽性）：上で定めた正の順序付き時間の有限列 $f\in\mathcal S_+$ に対し
>
$$
\sum_{n,m\ge0}S_{n+m}(\Theta f_n\otimes f_m)\ge0.
$$
>
> E3（対称性）：点の任意の置換に対して $S_n$ は不変である。
>
> E4（クラスター性）：任意の $f,g\in\mathcal S_+$ と非零空間ベクトル $a$ に対し
>
$$
\begin{aligned}
&\lim_{\lambda\to+\infty}\sum_{n,m\ge0}
S_{n+m}(\Theta f_n\otimes g_m^{(\lambda a)})\\
&=\left(\sum_{n\ge0}S_n(\Theta f_n)\right)
\left(\sum_{m\ge0}S_m(g_m)\right).
\end{aligned}
$$
<!-- formal-statement-end -->

反転後の負時間の変数と正時間の変数は一致せず、各ブロック内部も順序条件により一致点で全導関数が零です。従って E2、E4 の評価対象は E0 の試験空間に入ります。E4 は離れた観測の相関が積に近づく条件であり、減衰率は指定しません。

<!-- definition-example-start: def-mqfc10-os-conditions -->
### 直接例：確定した定数場

**定義の確認**

実数 $c$ を固定し、場が全時空で $c$ である場合を考えます。$S_n(f_n)=c^n\int f_n$、$S_0=1$ と置きます。E0 の連続性は [Schwartz空間の半ノルム](../MQFC1/index.md#def-mqfc1-schwartz) で判定します。$n\ge1$、$X=(x_1,\ldots,x_n)\in\mathbb R^{4n}$ とし、$N=4n+1$ を選ぶと

$$
|S_n(f_n)|\le |c|^n p_{N,0}(f_n)
\int_{\mathbb R^{4n}}(1+|X|)^{-N}dX.
$$

半径 $r\ge1$ での積分は定数倍の $\int_1^\infty r^{4n-1-N}dr=\int_1^\infty r^{-2}dr$ 以下です。従って積分は有限で E0 を満たします。E1 では各点に同じ回転行列 $R\in SO(4)$ と並進 $b$ を作用させます。回転は $R^{\mathsf T}R=I$ なので $|\det R|=1$、全変数の変換の Jacobian の絶対値は $|\det R|^n=1$ です。並進でも1ですから積分は不変です。E3 では点の置換が座標ブロックの入れ替えであり、同じく Jacobian の絶対値が1なので積分は不変です。

$A(f)=\sum_n c^n\int f_n$（零次積分は $f_0$）と置くと、反転の Jacobian の絶対値は1、$c$ は実数なので

$$
\sum_{n,m}S_{n+m}(\Theta f_n\otimes f_m)
=\overline{A(f)}A(f)=|A(f)|^2.
$$

これは E2 を満たします。また $\int g_m^{(\lambda a)}=\int g_m$ だから E4 の左辺はすべての $\lambda$ で $\overline{A(f)}A(g)$、右辺も同じです。全条件を確認できました。対応する量子場は1次元 Hilbert 空間で $c$ 倍の恒等作用素として表せます。
<!-- definition-example-end -->

## 2. 1973年の主張と1975年の訂正

各 $n$ で E0 が成立するということは、その次数ごとに分布を抑える定数と微分次数があることです。しかし $n$ を動かしたとき、それらがどれほど大きくなるかは E0 だけからは分かりません。多点関数の解析接続を行う途中には、より高い次数の相関も登場します。

1973年の Osterwalder–Schrader I は E0–E4 からの再構成を主張しましたが、1975年の II の序論で補題8.8の誤りを明示しています。II は第III節で別のより強い分布条件による同値定理を与え、第IV節で以下の実用的な十分条件を与えました。1973年の逆方向（Wightman から E0–E4）はこの誤りによって取り消されたわけではありません。1975年の論文では、元の E0–E4 だけの十分性は未解決として扱われています。

$X\in\mathbb R^{4n}$、多重指数 $\alpha=(\alpha_1,\ldots,\alpha_{4n})$ の各成分を非負整数とし、$|\alpha|=\sum_i\alpha_i$、$\partial^\alpha=\partial_{X_1}^{\alpha_1}\cdots\partial_{X_{4n}}^{\alpha_{4n}}$ と書き、原論文 II の第II節 (2.1) に従って

$$
p_j(f)=\max_{|\alpha|\le j}\sup_X
(1+|X|^2)^{j/2}|\partial^\alpha f(X)|
$$

を使います。固定次数での連続性と、全次数で共通の評価を比較するためのものです。

<a id="def-mqfc10-linear-growth"></a>

<!-- formal-statement-start -->
> **定義（OSの線形増大条件）**
> 1975年の OS II の条件 E0' は $S_0=1$、$S_n\in\mathcal S_0'(\mathbb R^{4n})$ に加え、固定の正整数 $s$ と正定数 $A,B$ が存在して、すべての $n\ge1$ と $f\in\mathcal S_0(\mathbb R^{4n})$ に対し
>
$$
|S_n(f)|\le \sigma_n p_{ns}(f),
\qquad 0<\sigma_n\le A(n!)^B
$$
>
> となることである。より強い条件 E0'' は全 Schwartz 空間上の分布 $S_n$ が存在し、同様の $s,\sigma_n$ で、すべての $f_j\in\mathcal S(\mathbb R^4)$ に対し
>
$$
|S_n(f_1\otimes\cdots\otimes f_n)|
\le \sigma_n\prod_{j=1}^n p_s(f_j)
$$
>
> となることである。
<!-- formal-statement-end -->

ここで線形とは分布の評価に使う次数 $ns$ を指し、相関の値が $n$ に比例するという意味ではありません。E0'' から E0' への含意は OS II の Summers による付録で証明されています。積試験関数での評価を無条件で一般の試験関数に移しているわけではありません。

<!-- definition-example-start: def-mqfc10-linear-growth -->
### 直接例：質量正の自由Gaussian場の増大評価

**定義の確認**

質量 $m>0$ とします。[Euclid自由場の試験関数共分散](../MQFC5/index.md#def-mqfc5-covariance-form) の Fourier 乗数は $(|p|^2+m^2)^{-1}$ です。複素双線形に延長した二点のモーメントを $C(f,g)$ と書きます。既習の共分散形式 $B_m$ は第1引数が共役線形なので、対応は

$$
C(f,g)=B_m(\bar f,g)
=\int\frac{\hat f(-p)\hat g(p)}{|p|^2+m^2}\frac{d^4p}{(2\pi)^4}.
$$

ここでは $\widehat{\bar f}(p)=\overline{\hat f(-p)}$ を使いました。実試験関数上では $C=B_m$ です。乗数は $m^{-2}$ 以下であり、Cauchy–Schwarz と Fourier の $L^2$ 等長性（測度 $d^4p/(2\pi)^4$）で

$$
|C(f,g)|\le m^{-2}\|f\|_2\|g\|_2.
$$

$p_3(f)$ の零階微分の項から

$$
|f(x)|^2\le p_3(f)^2(1+|x|^2)^{-3}.
$$

4次元で右辺の重みは可積分です。実際、半径 $r\ge1$ では球座標の重み付き積分が定数倍の $\int_1^\infty r^3r^{-6}dr$ 以下です。$K^2=\int_{\mathbb R^4}(1+|x|^2)^{-3}d^4x<\infty$ とすれば

$$
|C(f,g)|\le L p_3(f)p_3(g),
\qquad L=m^{-2}K^2.
$$

[Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) を $2r$ 個の試験関数に適用します。対分割の数は $(2r-1)!!$ です。各対が係数 $L$ を一つずつ与えるので

$$
|S_{2r}(f_1\otimes\cdots\otimes f_{2r})|
\le (2r-1)!! L^r\prod_{j=1}^{2r}p_3(f_j).
$$

奇数次は零、零次は1です。$D=\max(1,\sqrt L)$ とすれば

$$
(2r-1)!! L^r\le (2r)!D^{2r}.
$$

任意の $n\ge1$ で数列 $D^n/n!$ は有界です。連続する項の比 $D/(n+1)$ はやがて $1/2$ 以下になるからです。

従って、ある $A>0$（例えば $e^D$）で全次数に共通の上界

$$
\sigma_n=A(n!)^2
$$

を選べます。[Gaussian Schwinger多点分布の構成](../MQFC7/index.md#prop-mqfc7-distribution) により全 Schwartz 空間上の分布性も得ています。従って $s=3$、$B=2$ で E0'' が成立します。
<!-- definition-example-end -->

<a id="thm-mqfc10-os-reconstruction"></a>

<!-- formal-statement-start -->
> **定理（1975年のOS再構成：十分条件）**
> 4次元 Euclid 空間の実スカラー場の相関階層 $(S_n)_{n\ge0}$ が E1–E4 と E0'（または E0''）を満たすとする。
>
> このとき、順序付き Euclid 領域での解析接続が与えられた相関階層と一致する Wightman 分布階層が一意に存在する。分布階層は緩増加性、相対論的共変性、正値性、局所可換性、クラスター性、スペクトル条件を満たし、真空を含む実スカラー場の理論をユニタリ同値まで決定する。
<!-- formal-statement-end -->

ここでいう一致は一致点を除く試験空間での一致です。E0'' を満たす全空間への延長が複数ある場合にも、一致点に支持される項を一意に決めるという主張ではありません。また原論文は Wightman 分布についての追加の増大評価 R0' も与えますが、本講では再構成の結論だけを使います。

この一般定理は [OS II, 第IV節、pp.287–288](https://doi.org/10.1007/BF01608978) から引用する研究水準の外部定理です。全証明には多変数の解析接続領域の帰納的拡大と、次数を横断する分布の評価が必要です。本講ではその証明を以下の道筋に分解し、半群の複素時間への延長と自由場での境界値を証明します。一般の相互作用場に対する帰納的評価そのものは同論文第V–VI節に委ねます。

| 入力・道具 | 得られるもの |
|---|---|
| E2 と正の順序付き時間の試験関数列 | 半正定値形式、零方向の商、Hilbert 空間 |
| E0、E1、E2 | 時間並進の自己共役縮小半群、複素時間への延長 |
| E1 と解析接続 | Lorentz 共変性、全時空並進のスペクトル条件 |
| E0' の次数横断評価 | 境界値が緩増加分布となるための評価 |
| E2 と境界値構成 | Wightman 階層の正値性 |
| E3 と拡張された解析領域 | 空間的分離での局所可換性 |
| E4 | クラスター性と真空の一意性 |

最後に [実スカラー場のWightman再構成](../MQFC4/index.md#thm-mqfc4-reconstruction) により場の作用素と共通稠密領域を得るという見方ができます。MQFC9 の確率測度からの構成では通常の $L^2$ ノルムで並進を評価できましたが、一般の OS 分布では確率測度の存在は仮定しません。原論文では順序付き試験関数列の形式と分布の増大評価を使います。時刻の非負性だけで四元運動量の未来光円錐への支持が得られるわけではなく、共変性の段階も必要です。

## 3. 半群の複素時間への延長

[自己共役縮小半群の非負生成作用素](../MQFC9/index.md#thm-mqfc9-hamiltonian) により $H\ge0$ と $T_s=e^{-sH}$ が得られました。以下では $E_H$ をそのスペクトル射影値測度とし、任意の Borel 集合 $B\subset[0,\infty)$ に対し $E_H(B)$ はそのエネルギー範囲への直交射影です。[自己共役作用素のBorel関数計算](../../../解析系/QM/QM6/index.md#def-qm6-borel-functional-calculus) により $e^{-zH}$ は $\lambda\mapsto e^{-z\lambda}$ を作用素に移したものです。$u,v$ に対して $\nu_{u,v}(B)=\langle u,E_H(B)v\rangle$ と置きます。これは有限複素測度です。実際互いに素な $B_j$ に対して

$$
\sum_j|\langle E_H(B_j)u,E_H(B_j)v\rangle|
\le \|u\|\|v\|
$$

となります。右辺は数列の Cauchy–Schwarz と直交する射影の二乗ノルムの和の評価から得られます。

<a id="thm-mqfc10-complex-semigroup"></a>

<!-- formal-statement-start -->
> **定理（非負生成作用素の複素時間境界値）**
> Hilbert 空間上の非負自己共役作用素 $H$ と任意の $u,v$ に対して
>
$$
F_{u,v}(z)=\langle u,e^{-zH}v\rangle,
\qquad \operatorname{Re}z>0
$$
>
> は正則であり、$|F_{u,v}(z)|\le\|u\|\|v\|$ である。任意の実時刻 $t$ で
>
$$
\lim_{\epsilon\downarrow0} e^{-(\epsilon+it)H}v=e^{-itH}v
$$
>
> がノルムで成立し、$e^{-itH}$ は強連続ユニタリ群をなす。
<!-- formal-statement-end -->

### 証明の見取り図

正の実部は高エネルギーを指数的に減衰させます。微分するとエネルギーが一つ掛かりますが、正の実部を保つ限りこの増加は指数で抑えられます。境界では減衰が消え、絶対値1の位相だけが残ります。

<!-- proof-start -->
### 証明

スペクトル積分（[自己共役作用素のBorel関数計算](../../../解析系/QM/QM6/index.md#def-qm6-borel-functional-calculus)）から

$$
F_{u,v}(z)=\int_{[0,\infty)}e^{-z\lambda}\,d\nu_{u,v}(\lambda).
$$

$z_0$ の実部を $2\delta>0$ とします。$0<|h|<\delta$ で差商は

$$
\frac{e^{-(z_0+h)\lambda}-e^{-z_0\lambda}}h
=-\lambda\int_0^1 e^{-(z_0+rh)\lambda}dr.
$$

絶対値は $\lambda e^{-\delta\lambda}\le 1/(e\delta)$。有限全変動測度 $|\nu_{u,v}|$ に対する [優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01) により

$$
F'_{u,v}(z_0)=-\int\lambda e^{-z_0\lambda}\,d\nu_{u,v}(\lambda).
$$

全 $z_0$ で複素微分が存在するので正則です。$|e^{-z\lambda}|\le1$ から有界性が従います。

$\mu_v(B)=\langle v,E_H(B)v\rangle$ とすると

$$
\begin{aligned}
&\|(e^{-(\epsilon+it)H}-e^{-itH})v\|^2\\
&=\int_{[0,\infty)}|e^{-\epsilon\lambda}-1|^2\,d\mu_v(\lambda).
\end{aligned}
$$

被積分関数は1以下で点ごとに零へ収束し、$\mu_v$ の全質量は $\|v\|^2$ なので [優収束定理](../../../解析系/F0/F0-00D2B/index.md#thm-f0-00d2b-01) よりノルムは零へ収束します。位相の積 $e^{-it\lambda}e^{-is\lambda}=e^{-i(t+s)\lambda}$ と複素共役 $e^{it\lambda}$ に関数計算の積・随伴の規則を適用すると群則とユニタリ性が得られます。強連続性も $|e^{-ih\lambda}-1|^2\le4$ を用いた同じ優収束で従います。
<!-- proof-end -->

例えば $H=\operatorname{diag}(0,2)$、$v=(1,1)$ なら $F_{v,v}(z)=1+e^{-2z}$。正の実軸では減衰して1に近づき、虚軸では $1+e^{-2it}$ と振動します。

## 4. 自由場でSchwingerからWightmanへ

質量 $m>0$ とし、次のエネルギーと測度を用います。

$$
E_k=\sqrt{|k|^2+m^2},\qquad
d\eta(k)=\frac{d^3k}{(2\pi)^3 2E_k}.
$$

[自由共分散の時間指数核](../MQFC8/index.md#thm-mqfc8-time-kernel) により、二点の Euclid 相関の空間 Fourier 表示は、時間差 $\tau$ に対して $e^{-E_k|\tau|}/(2E_k)$ です。

$\tau>0$ の側を選び、その変数を $z=\epsilon+it$ に拡張します。空間差の平滑化に使う Schwartz 関数 $g(x)$ の Fourier 変換は

$$
\hat g(k)=\int e^{-ik\cdot x}g(x)d^3x
$$

とします。

<a id="thm-mqfc10-free-boundary"></a>

<!-- formal-statement-start -->
> **定理（自由二点相関の実時間境界値）**
> $m>0$ とし、$E_k=\sqrt{|k|^2+m^2}$、$d\eta(k)=d^3k/((2\pi)^3 2E_k)$ とする。
> $\operatorname{Re}z>0$ において、空間差で平滑化した自由二点相関
>
$$
G_g(z)=\int e^{-zE_k}\hat g(-k)\,d\eta(k)
$$
>
> は正則である。$z=\tau>0$ では Euclid 二点相関であり、$z=\epsilon+it$、$\epsilon\downarrow0$ の境界値は
>
$$
W_2(t,x)=\int e^{-itE_k+ik\cdot x}\,d\eta(k)
$$
>
> という緩増加分布を与える。積分の表示は分布の意味で読む。エネルギー・運動量の支持は $p^0=E_k,\ \boldsymbol p=k$ である。
<!-- formal-statement-end -->

### 証明の見取り図

時間と空間で別々に Fourier 変換すると、Euclid 時間の減衰率が質量殻のエネルギーそのものになっています。時間順序を決めた後で解析接続すると、負エネルギーを混ぜずに境界値を取れます。

<!-- proof-start -->
### 証明

$\operatorname{Re}z>0$ なら $e^{-zE_k}$ の絶対値は $e^{-E_k\operatorname{Re}z}$ で、$\hat g(-k)$ は Schwartz 関数です。$E_k\ge m$ だから測度の密度は $1/(2m(2\pi)^3)$ 以下です。コンパクトな右半平面内の集合上では、前節と同じ差商の評価に $E_k$ を代入して

$$
E_k e^{-\delta E_k}|\hat g(-k)|
\le (e\delta)^{-1}|\hat g(-k)|
$$

という可積分な上界を得ます。これで差商と積分の交換ができ正則性が従います。正の実軸上では自由共分散の時間指数核の逆空間 Fourier 変換です。

次に全時空差の任意の $f\in\mathcal S(\mathbb R^4)$ を使い、

$$
I_f(E,k)=\int_{\mathbb R^4}f(t,x)e^{-itE+ik\cdot x}\,dt\,d^3x
$$

とします。これは $f$ の Fourier 変換を $(E,-k)$ に制限したものです。[Schwartz空間のFourier変換](../MQFC1/index.md#thm-mqfc1-fourier) により任意の整数 $N$ について

$$
|I_f(E,k)|\le C_N(f)(1+E^2+|k|^2)^{-N}
$$

です。$C_N(f)$ は連続 Schwartz 半ノルムで選べます。$N=2$ とすれば、$k$ の3次元積分は $E_k\ge m$ と $\int_{\mathbb R^3}(1+|k|^2)^{-2}d^3k<\infty$ から絶対収束します。

境界値を試験関数で評価する順序は

$$
W_{2,\epsilon}(f)=\int e^{-\epsilon E_k}I_f(E_k,k)\,d\eta(k)
$$

です。$\epsilon>0$ では元の積分と試験関数積分を Fubini で交換できます（$e^{-\epsilon E_k}$ は無限遠で指数減衰し、$f$ は可積分）。$0<e^{-\epsilon E_k}\le1$ なので上の可積分上界で優収束を適用でき、

$$
W_2(f)=\lim_{\epsilon\downarrow0}W_{2,\epsilon}(f)
=\int I_f(E_k,k)\,d\eta(k).
$$

この絶対値は定数倍の $C_2(f)$ 以下なので連続線形汎関数、すなわち緩増加分布です。Fourier 位相を $e^{-ip^0t+i\boldsymbol p\cdot x}$ と読めば、分布は質量殻への写像 $k\mapsto(E_k,k)$ による非負測度 $d\eta(k)$ の像測度の Fourier 型積分です。この支持は $p^0>0$、$-(p^0)^2+|\boldsymbol p|^2=-m^2$ を満たし、未来光円錐内にあります。
<!-- proof-end -->

これは [質量正の自由実スカラー場のWightman公理](../MQFC3/index.md#thm-mqfc3-free-wightman) に現れる真空二点関数と一致します。時間順序を逆にすれば、同じ空間差で一般には別の境界値を得ます。$e^{-E_k|\tau|}$ にそのまま $\tau=it$ を代入してはいけません。絶対値は複素正則な関数ではなく、解析接続する側を決める必要があります。

## 5. 多点関数と一般の場合に残る課題

自由 Gaussian 場では奇数次は零で、偶数次は [Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) で求まります。例えば $\tau_1>\tau_2>\tau_3>\tau_4$ の順序付き領域では

$$
S_4=C_{12}C_{34}+C_{13}C_{24}+C_{14}C_{23}.
$$

ここで $C_{ij}$ は点 $i,j$ の Euclid 二点核です。各対で $i<j$ なら $\tau_i-\tau_j>0$ です。複素時間 $\tau_j=\epsilon_j+it_j$ を選び、$\epsilon_1>\epsilon_2>\epsilon_3>\epsilon_4$ とします。例えば対 $(1,3),(2,4)$ では指数因子は

$$
e^{-(\epsilon_1-\epsilon_3)E_k}
e^{-(\epsilon_2-\epsilon_4)E_l}
e^{-i(t_1-t_3)E_k-i(t_2-t_4)E_l}.
$$

空間の位相は $e^{ik\cdot(x_1-x_3)+il\cdot(x_2-x_4)}$ です。全点で Schwartz 試験関数 $F$ を積分すると、その全 Fourier 変換を $\pm(E_k,k)$、$\pm(E_l,l)$ の組に制限した値（時間・空間の位相規約に応じた符号）が得られます。その絶対値は定数倍の $(1+|k|^2+|l|^2)^{-4}$ 以下であり、6次元で可積分です。測度 $d\eta(k)d\eta(l)$ の密度は有界、減衰因子は1以下なので優収束により $\epsilon_j\downarrow0$ の順序を保った極限が存在します。

他の対分割でも点の添字を対応する対へ置き換えるだけで、この上界の積分次元と減衰次数は変わりません。従って四点の境界値は

$$
W_4=W_{12}W_{34}+W_{13}W_{24}+W_{14}W_{23}
$$

です。一般の $2r$ 点でも一つの対分割は $r$ 個の独立な運動量を持つので、全 Fourier 変換の減衰次数 $N>3r/2$ を選んで同じ積分評価を適用します。各項は互いに素な点変数の対について上で示した独立な運動量積分で定まる連続線形汎関数です。同一変数の任意の分布の積を仮定していません。結果は [自由場真空期待値の多点分布](../MQFC3/index.md#prop-mqfc3-free-kernels) と一致します。自由場では既に [Gaussian場の多項式反射陽性](../MQFC8/index.md#thm-mqfc8-gaussian-extension) も確認しました。

相互作用場では高次相関は二点の積だけでは表せません。解析接続の存在、境界値の分布性、局所性、スペクトル条件は別々の証明責務です。特に反射陽性が成り立ち ハミルトニアン が非負でも、正のスペクトルギャップがあるとは限りません。例えば $\ell^2(\{0,1,2,\ldots\})$ 上の $H$ を $He_0=0$、$He_n=n^{-1}e_n$（$n\ge1$）とすれば、零固有ベクトルは $e_0$ の倍数だけですが、正の固有値が0へ集積します。次講以降ではこのような違いをスペクトル測度から読み取ります。

## 6. 演習

### 演習 MQFC10-A1：一致点を除く試験関数

- Level: A

$D(f)=\int_{\mathbb R^4}f(x,x)d^4x$ とする。全 Schwartz 空間上で $D$ が非零であり、$\mathcal S_0$ 上で零であることを示せ。

<!-- solution-start -->
$f\in\mathcal S_0$ なら $f(x,x)=0$ なので $D(f)=0$ です。

全 Schwartz 空間では $f(x,y)=e^{-|x|^2-|y|^2}$ とすれば

$$
f(x,x)=e^{-2|x|^2}>0,\qquad D(f)>0.
$$

積分の有限性は Gaussian 減衰から従います。また

$$
|f(x,x)|\le p_5(f)(1+2|x|^2)^{-5/2}
$$

で右辺は4次元で可積分です。従って $D$ は連続線形汎関数です。

$S_2$ と $S_2+D$ の一致点を除いた制限が等しくても、全空間上の延長としては異なります。
<!-- solution-end -->

### 演習 MQFC10-A2：増大条件の次数

- Level: A

$\sigma_n=3^n n!$ が階乗増大であることを示せ。これに対し分布の評価に用いた次数が $n^2$ であったとき、その評価だけで E0' を確認できるか。

<!-- solution-start -->
$a_n=3^n/n!$ と置きます。連続する項の比は

$$
\frac{a_{n+1}}{a_n}=\frac3{n+1}
$$

で、$n\ge5$ なら $1/2$ 以下です。従って $a_n$ は有界で、ある $A>0$ について

$$
3^n n!\le A(n!)^2
$$

が全 $n$ で成立します。

一方 [OSの線形増大条件](#def-mqfc10-linear-growth) は固定の $s$ に対する次数 $ns$ の評価を要求します。$n>s$ では $n^2>ns$ です。

与えられた評価は小さい次数 $ns$ での上界を直接保証しないので、E0' の確認には不十分です。E0' が偽だとまでは結論できません。
<!-- solution-end -->

### 演習 MQFC10-A3：実時間への境界値

- Level: A

$H=\operatorname{diag}(0,3)$、$v=(1,2)$ とする。$F_{v,v}(z)$ と $\lim_{\epsilon\downarrow0}F_{v,v}(\epsilon+it)$、さらに $\|e^{-itH}v\|$ を求めよ。

<!-- solution-start -->
関数計算は対角成分ごとに行うので $e^{-zH}v=(1,2e^{-3z})$。内積を取ると $F_{v,v}(z)=1+4e^{-3z}$ です。$e^{-3(\epsilon+it)}=e^{-3\epsilon}e^{-3it}$ で、$\epsilon\downarrow0$ の極限は $1+4e^{-3it}$。実時間では位相の絶対値は1なので $\|e^{-itH}v\|^2=1+4=5$、従ってノルムは $\sqrt5$ です。[非負生成作用素の複素時間境界値](#thm-mqfc10-complex-semigroup) の有限次元例です。
<!-- solution-end -->

### 演習 MQFC10-A4：質量殻と符号

- Level: A

$m=3$、$k=(4,0,0)$ の自由二点核の一つの運動量成分の Euclid 時間因子と実時間因子を求め、Lorentz ノルムを確認せよ。

<!-- solution-start -->
$E_k=\sqrt{4^2+3^2}=5$ です。$\tau>0$ では Fourier 表示の時間因子は $e^{-5\tau}/10$ です。[自由二点相関の実時間境界値](#thm-mqfc10-free-boundary) で $z=\epsilon+it$ とすれば極限は $e^{-5it}/10$。空間位相 $e^{4ix_1}$ を添えます。四元運動量の Lorentz ノルムは $-5^2+4^2=-9=-m^2$、時間成分は $5>0$ なので未来質量殻です。
<!-- solution-end -->

### 演習 MQFC10-B1：クラスター性と真空

- Level: B

正規化された真空 $\Omega$ を持つ Hilbert 空間で空間並進 $V(a)$ がユニタリであり、ある非零 $a$ について全 $u,v$ で $\langle u,V(\lambda a)v\rangle\to\langle u,\Omega\rangle\langle\Omega,v\rangle$ とする。全空間並進で不変なベクトルは $\Omega$ の倍数であることを示せ。

<!-- solution-start -->
不変ベクトル $v$ を取れば $V(\lambda a)v=v$ が全 $\lambda$ で成立します。$u=v$ を極限の式に代入すると

$$
\|v\|^2=|\langle\Omega,v\rangle|^2.
$$

$w=v-\Omega\langle\Omega,v\rangle$ と置けば $\langle\Omega,w\rangle=0$、$\|\Omega\|=1$ より直交分解の二乗ノルムは $\|w\|^2=\|v\|^2-|\langle\Omega,v\rangle|^2=0$ です。従って $w=0$。空間並進で不変なベクトルの一意性が得られたので、全時空並進で不変なベクトルについても同じ結論です。
<!-- solution-end -->

### 演習 MQFC10-B2：負エネルギーがあると何が壊れるか

- Level: B

$\mathbb C$ 上で $H=-2I$ とする。複素時間の作用が正則で実時間でユニタリであるにもかかわらず、Euclid 時間の縮小性が成り立たないことを示せ。

<!-- solution-start -->
$e^{-zH}=e^{2z}I$ は全複素平面で正則です。$z=it$ では $|e^{2it}|=1$、逆作用素は $e^{-2it}I$ なのでユニタリです。

$z=s>0$ では任意の非零 $v$ に対し

$$
\|e^{2s}v\|=e^{2s}\|v\|>\|v\|.
$$

第3節のスペクトル積分の有界性では $\lambda\ge0$ による $|e^{-s\lambda}|\le1$ が使われました。ここでは $\lambda=-2$ なのでその評価が壊れます。正則性や実時間のユニタリ性だけから非負エネルギーは結論できません。
<!-- solution-end -->

### 演習 MQFC10-B3：四点の順序付き境界値

- Level: B

固定運動量での時間因子だけを考える。$C_{ij}=a e^{-E(\tau_i-\tau_j)}$（$i<j$、$a>0,E>0,\tau_1>\cdots>\tau_4$）とする。Wick の3項をまとめ、境界値を求めよ。

<!-- solution-start -->
[Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) の3項は

$$
\begin{aligned}
C_{12}C_{34}&=a^2e^{-E(\tau_1-\tau_2+\tau_3-\tau_4)},\\
C_{13}C_{24}&=a^2e^{-E(\tau_1+\tau_2-\tau_3-\tau_4)},\\
C_{14}C_{23}&=a^2e^{-E(\tau_1+\tau_2-\tau_3-\tau_4)}.
\end{aligned}
$$

後二項の指数が等しいので係数は $2a^2$ です。$\tau_j=\epsilon_j+it_j$ とし $\epsilon_1>\cdots>\epsilon_4>0$ を保ったまま全 $\epsilon_j$ を零へ近づけると、各実部の指数因子が1へ収束します。従って境界値は

$$
a^2e^{-iE(t_1-t_2+t_3-t_4)}
+2a^2e^{-iE(t_1+t_2-t_3-t_4)}.
$$

全場では運動量積分も必要であり、第5節の Schwartz 評価がその交換を正当化します。
<!-- solution-end -->

### 演習 MQFC10-B4：零エネルギーの一意性とギャップの違い

- Level: B

$\ell^2(\{0,1,\ldots\})$ 上の $H e_0=0,\ H e_n=e_n/n$（$n\ge1$）について、自己共役性、非負性、零固有空間を確認し、真空直交空間で一様な正の指数減衰が成立しないことを示せ。

<!-- solution-start -->
任意の $v=(v_n)$ に対し $\sum_{n\ge1}|v_n/n|^2\le\sum_n|v_n|^2$ なので $H$ は全空間上の有界作用素です。対角成分が実数なので対称、従って自己共役です。$\langle v,Hv\rangle=\sum_{n\ge1}|v_n|^2/n\ge0$。$Hv=0$ なら全 $n\ge1$ で $v_n=0$ なので零固有空間は $\mathbb C e_0$ です。

$e_n$ は $e_0$ と直交し、$\|e^{-sH}e_n\|=e^{-s/n}$。もし全真空直交ベクトルについて $\|e^{-sH}v\|\le e^{-\Delta s}\|v\|$ なる $\Delta>0$ が存在すれば、$n>1/\Delta$ を取り $s=1$ として $e^{-1/n}>e^{-\Delta}$ となり矛盾します。
<!-- solution-end -->

### 演習 MQFC10-C1：スペクトル積分から境界値と正値性を読む

- Level: C

自由場の質量 $m>0$ と上の測度 $d\eta$ を使い、$g\in\mathcal S(\mathbb R^3)$ を非零とする。$v(k)=\hat g(k)$ として $L^2(d\eta)$ 上で $H$ を $E_k$ の掛け算作用素とする。

(1) $v$ が $D(H)$ に属すことを示せ。(2) $F(z)=\int e^{-zE_k}|v(k)|^2d\eta(k)$ の境界値と $F'(s)$（$s>0$）を求めよ。(3) 任意の $t_j\in\mathbb R$ と $c_j\in\mathbb C$（$j=1,\ldots,N$）に対し $\sum_{j,l}\bar c_j c_l F(i(t_l-t_j))\ge0$ を示せ。

<!-- solution-start -->
(1) $v$ は Schwartz 関数なので $\int |v|^2d\eta$ は有限です。さらに

$$
\int E_k^2|v(k)|^2d\eta(k)
=\int \frac{E_k}{2(2\pi)^3}|v(k)|^2d^3k.
$$

$E_k\le |k|+m$ で、$v$ は任意の多項式次数より速く減衰します。この積分も有限なので $v\in D(H)$ です。

(2) [非負生成作用素の複素時間境界値](#thm-mqfc10-complex-semigroup) に $u=v$、$H=E_k$ の掛け算を代入します。スペクトル測度は $|v(k)|^2d\eta(k)$ の写像 $k\mapsto E_k$ による像測度で、全質量は有限です。$|e^{-(\epsilon+it)E_k}|\le1$ なので

$$
F(it)=\int e^{-itE_k}|v(k)|^2d\eta(k).
$$

また $s>0$ の近傍では $E_ke^{-sE_k/2}\le2/(es)$ が一様上界を与えるので差商を積分へ入れて

$$
F'(s)=-\int E_ke^{-sE_k}|v(k)|^2d\eta(k).
$$

被積分関数は符号を除いて非負で、$m>0$、$v$ は非零なので $F'(s)<0$ です。

(3) (2) の式を有限和に代入し、和を積分の中に移すと

$$
\begin{aligned}
&\sum_{j,l}\bar c_j c_l F(i(t_l-t_j))\\
&=\int \left(\sum_j\bar c_j e^{it_jE_k}\right)
\left(\sum_l c_l e^{-it_lE_k}\right)|v(k)|^2d\eta(k)\\
&=\int\left|\sum_l c_l e^{-it_lE_k}\right|^2
|v(k)|^2d\eta(k)\ge0.
\end{aligned}
$$

有限和は有界な係数の位相の和なので積分は有限です。Euclid 時間の減衰が、実時間の振動と真空相関の正値性に接続する一例です。ただしこれは二点型の行列の正値性であり、一般の Wightman 階層全体の正値性の代用ではありません。
<!-- solution-end -->

## 7. 次の講義

Euclid 相関の条件、次数を横断する増大評価、実時間の境界値を区別しました。自由場では正エネルギーの質量殻が直接現れました。次講では粒子質量とスペクトル測度を扱い、二点分布の正値性からどのように質量の情報を取り出すかを学びます。

参考文献：

- K. Osterwalder and R. Schrader, [Axioms for Euclidean Green's Functions](https://doi.org/10.1007/BF01645738), Commun. Math. Phys. 31 (1973), 83–112, §§2–5.
- K. Osterwalder and R. Schrader, [Axioms for Euclidean Green's Functions II](https://doi.org/10.1007/BF01608978), Commun. Math. Phys. 42 (1975), 281–305, §§I–IV, V–VI および Summers の付録。
