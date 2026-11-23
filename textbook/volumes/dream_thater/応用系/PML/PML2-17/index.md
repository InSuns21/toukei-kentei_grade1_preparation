# PML2-17 解像度を変えても同じ精度が出るのか

## 1. 同じ重みを使えることと、同じ誤差であること

[前講のFNO層](../PML2-16/index.md#def-pml2-16-fno-layer)では、周期領域 $\mathbb T=\mathbb R/\mathbb Z$ 上の関数に対し、有限個のFourier係数へ行列 $R_k$ を掛けた。計算機では[格子FNO](../PML2-16/index.md#def-pml2-16-dft)がDFTを使う。$R_k$ は格子数 $N$ に依存しないため、8点でも16点でも同じ重みを使用できる。

しかし、次の三つは別の問題である。

1. **重み共有**：異なる格子に同じ行列・活性化を適用できるか。
2. **離散化誤差**：格子FNOが連続FNOをどれだけ正確に再現するか。
3. **モデル誤差**：連続FNOが目標とするPDE解作用素をどれだけ近似できるか。

本講ではまず2番目を定量化し、帯域制限による厳密一致と、高周波の折り返しによる誤差を証明する。その後、非線形層、非周期境界、PDEの解誤差との関係を整理する。

## 2. 標本化から出力の格子誤差を定義する

連続関数を有限個の格子点で読む操作を**標本化**という。$N$ 点で得た配列と、元の連続関数は違う対象である。誤差を調べるには、連続出力を**同じ格子点で評価**したものと格子FNOの出力を比較する。

<a id="def-pml2-17-grid-error"></a>

<!-- formal-statement-start -->
> **定義（標本化と解像度移植誤差）**  
> $m\ge1$、偶数 $N\ge2$、整数 $0\le M<N/2$ とし、$x_j=j/N$（$0\le j<N$）とする。周期連続関数 $h\in C(\mathbb T;\mathbb R^m)$ の**標本化**を

$$
(S_Nh)_j=h(x_j)\in\mathbb R^m
$$

> とする。[有限モードFNO層](../PML2-16/index.md#def-pml2-16-fno-layer)を $\mathcal F$、同じ $W,b,\sigma,R_k$ を用いる[格子FNO](../PML2-16/index.md#def-pml2-16-dft)を $\mathcal F_N$ とし、**解像度移植誤差**を

$$
E_N(h)=\max_{0\le j<N}\max_{1\le a\le m}
|(\mathcal F_N(S_Nh))_{j,a}-(\mathcal Fh)_a(x_j)|
$$

> と定める。格子数以外のパラメータとモード切断位置 $M$ は固定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-17-grid-error -->
**定義の確認。** $m=1$、$M=1$、$R_1=R_{-1}=1$、$R_0=W=b=0$、$\sigma(s)=s$ とする。$h(x)=\cos(2\pi x)$ は連続、実数値、周期1であり、$N=4$ と8の両方で $M<N/2$ を満たす。[Fourier係数](../PML2-16/index.md#def-pml2-16-fourier)は $\widehat h_{\pm1}=1/2$、[DFT](../PML2-16/index.md#def-pml2-16-dft)も両格子で $\widetilde h_1=\widetilde h_{N-1}=1/2$ である。したがって

$$
(\mathcal Fh)(x)=\cos(2\pi x),
\qquad
(\mathcal F_NS_Nh)_j=\cos(2\pi j/N).
$$

両者がすべての節点で等しいので $E_4(h)=E_8(h)=0$。入力、重み、比較位置を実際に指定して、定義の各条件を満たすことを確認した。
<!-- definition-example-end -->

## 3. 帯域制限があると格子を変えても厳密に一致する

周波数 $H$ までしか含まれない入力を**帯域制限された三角多項式**と呼ぶ。格子が十分細かければ、高周波が別の低周波へ折り返さず、離散Fourier係数は連続Fourier係数と等しくなる。

<a id="thm-pml2-17-bandlimit"></a>

<!-- formal-statement-start -->
> **定理（帯域制限入力の一層厳密一致）**  
> 整数 $m\ge1$、$M,H\ge0$ と偶数 $N>2\max\{M,H\}$ を取る。実数値の周期三角多項式

$$
h(x)=\sum_{|q|\le H}c_qe^{2\pi iqx},
\qquad c_q\in\mathbb C^m,\quad c_{-q}=\overline{c_q}
$$

> に対し、同じ $W\in\mathbb R^{m\times m}$、$b\in C(\mathbb T;\mathbb R^m)$、連続な成分別活性化 $\sigma$ と、共役対称な行列 $R_k\in\mathbb C^{m\times m}$（$|k|\le M$）を用いて連続・格子FNOを定める。このとき

$$
\mathcal F_N(S_Nh)=S_N(\mathcal Fh),
\qquad E_N(h)=0.
$$

<!-- formal-statement-end -->

**証明の見取り図。** [前講の格子周波数の同一視定理](../PML2-16/index.md#thm-pml2-16-alias)を有限Fourier和に適用し、保持する周波数では他の周波数が同じ剰余に入らないと示す。局所項と活性化は同一の入力を受け取る。

<!-- proof-start -->
### 証明

$|k|\le M$ を固定する。[エイリアシング公式](../PML2-16/index.md#thm-pml2-16-alias)によるDFT係数は

$$
\widetilde h_{k\bmod N}
=\sum_{\substack{|q|\le H\\q\equiv k\pmod N}}c_q.
$$

$|q-k|\le H+M<N$ である。$q-k$ が $N$ の整数倍である場合には $q-k=0$ しかない。ゆえに $|k|\le M$ で

$$
\widetilde h_{k\bmod N}=c_k=\widehat h_k
$$

となる。ただし $|k|>H$ なら $c_k=0$ と解釈する。右の等号は[連続Fourier係数の定義](../PML2-16/index.md#def-pml2-16-fourier)に三角多項式を代入し、基本波を積分した結果である。

この等号を[格子FNOの式](../PML2-16/index.md#def-pml2-16-dft)に代入すると、各節点の活性化前の値は

$$
Wh(x_j)+b(x_j)+\sum_{k=-M}^{M}e^{2\pi ikx_j}R_k\widehat h_k.
$$

これは[連続層](../PML2-16/index.md#def-pml2-16-fno-layer)を $x_j$ で評価した式そのものなので、同じ $\sigma$ を適用した後も等しい。
<!-- proof-end -->

**直接計算例。** $h(x)=1+2\cos(2\pi x)+\frac14\cos(6\pi x)$ では $H=3$。$M=1$ と $N=8,16$ は $N>2\max\{1,3\}=6$ を満たす。$R_{\pm1}=1$、$W=b=R_0=0$、恒等活性化を選べば両格子とも $2\cos(2\pi j/N)$ が出力され、連続層を格子で評価した結果と等しい。

**定理の適用範囲。** これは一層の**入力**の帯域制限である。活性化が新しい高周波を作る場合、次の層の入力にも同じ条件が成立するとは限らない。

## 4. 高周波の尾部が離散化誤差を支配する

入力のFourier係数が有限個でない場合でも、絶対収束するFourier展開があれば誤差を評価できる。以降、実数値周期関数が

$$
h(x)=\sum_{q\in\mathbb Z}c_qe^{2\pi iqx},
\qquad
c_{-q}=\overline{c_q},\qquad
\sum_{q\in\mathbb Z}\|c_q\|_{\infty,m}<\infty
$$

と表せる場合を考える。$\|c_q\|_{\infty,m}=\max_a|(c_q)_a|$ とする。この条件は級数の一様絶対収束を保証するため、DFTの有限和との交換やFourier積分への代入が正当化できる。

保持する周波数 $|k|\le M$ に折り返す別の周波数 $k+\ell N$（$\ell\ne0$）は、絶対値が少なくとも $N-M$ である。そこで高周波の係数をまとめて測る量を導入する。

<a id="def-pml2-17-tail"></a>

<!-- formal-statement-start -->
> **定義（Fourier係数の尾部）**  
> 整数 $m\ge1$、$M\ge0$、偶数 $N>2M$ と、絶対総和可能なFourier係数 $(c_q)_{q\in\mathbb Z}$ に対し、

$$
T_{N,M}(h)=\sum_{|q|\ge N-M}\|c_q\|_{\infty,m}
$$

> を **Fourier係数の尾部** と呼ぶ。和は正負の整数周波数を含む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml2-17-tail -->
**定義の確認。** $h(x)=\cos(14\pi x)$ の非零係数は $c_7=c_{-7}=1/2$ だけである。$M=1$、$N=8$ なら $N-M=7$ より $T_{8,1}=1/2+1/2=1$。$N=16$ なら $N-M=15$ より $T_{16,1}=0$。実数値、周期連続性、絶対総和可能性も満たすので、いずれの値も定義に適合する。
<!-- definition-example-end -->

<a id="thm-pml2-17-tail-bound"></a>

<!-- formal-statement-start -->
> **定理（格子FNOの尾部誤差評価）**  
> $m\ge1$、$M\ge0$、偶数 $N>2M$ を取り、$h\in C(\mathbb T;\mathbb R^m)$ が上記の絶対総和可能なFourier級数表示を持つとする。$\sigma$ は $L_\sigma$-Lipschitz連続で、連続FNOと格子FNOには同じ $W,b,R_k,\sigma$ を用いる。このとき

$$
E_N(h)\le
L_\sigma\left(\sum_{k=-M}^{M}\|R_k\|_{\mathrm{row}}\right)
T_{N,M}(h).
$$

> 最大行絶対和ノルムは[前講の定義と安定性定理](../PML2-16/index.md#thm-pml2-16-stability)に従う。$M$ と重みを固定すれば $N\to\infty$ で $E_N(h)\to0$ となる。
<!-- formal-statement-end -->

**証明の見取り図。** DFTへ一様絶対収束する級数を代入すると、連続係数 $c_k$ に高周波 $c_{k+\ell N}$ が足される。尾部で上から押さえ、保持モードの行列と活性化のLipschitz定数を掛ける。

<!-- proof-start -->
### 証明

$|k|\le M$ について、[DFTの定義](../PML2-16/index.md#def-pml2-16-dft)と級数の一様絶対収束から

$$
\begin{aligned}
\widetilde h_{k\bmod N}
&=\frac1N\sum_{j=0}^{N-1}
\sum_{q\in\mathbb Z}c_qe^{2\pi i(q-k)j/N}\\
&=\sum_{q\in\mathbb Z}c_q
\left(\frac1N\sum_{j=0}^{N-1}e^{2\pi i(q-k)j/N}\right)\\
&=\sum_{\ell\in\mathbb Z}c_{k+\ell N}.
\end{aligned}
$$

最後の変形は[前講の有限等比級数の直交性](../PML2-16/index.md#thm-pml2-16-alias)を使った。また連続Fourier積分に級数を代入して基本波の直交性を使うと $\widehat h_k=c_k$ である。従って

$$
\widetilde h_{k\bmod N}-\widehat h_k
=\sum_{\ell\ne0}c_{k+\ell N}.
$$

$\ell\ne0$ なら $|k+\ell N|\ge N-|k|\ge N-M$ なので

$$
\|\widetilde h_{k\bmod N}-\widehat h_k\|_{\infty,m}
\le\sum_{\ell\ne0}\|c_{k+\ell N}\|_{\infty,m}
\le T_{N,M}(h).
$$

連続層と格子層の活性化前の式を同じ節点で差し引く。局所項 $Wh(x_j)+b(x_j)$ は相殺される。出力成分 $a$ のFourier項の差は、行列の成分に展開して

$$
\begin{aligned}
\left|\sum_{|k|\le M}\sum_{r=1}^m
e^{2\pi ikx_j}(R_k)_{ar}
(\widetilde h_{k\bmod N}-\widehat h_k)_r\right|
&\le\sum_{|k|\le M}\sum_{r=1}^m |(R_k)_{ar}|T_{N,M}(h)\\
&\le\left(\sum_{|k|\le M}\|R_k\|_{\mathrm{row}}\right)T_{N,M}(h).
\end{aligned}
$$

成分ごとの $\sigma$ にLipschitz条件を適用し、$a,j$ の最大を取れば結論を得る。最後に、絶対収束級数の尾部は $N-M\to\infty$ で0に収束するため、固定重みに対して $E_N(h)\to0$。
<!-- proof-end -->

**滑らかさによる定量化。** 周期的な $C^2$ 実数値関数では、$h(0)=h(1)$ と $h'(0)=h'(1)$ のため、非零周波数 $q$ の係数を二度部分積分すると

$$
c_q=\frac1{(2\pi iq)^2}\int_0^1h''(x)e^{-2\pi iqx}\,dx,
\qquad
|c_q|\le\frac{\|h''\|_\infty}{4\pi^2q^2}.
$$

この係数の絶対和は収束する。周期Fourier級数の一意性を用いれば関数の絶対一様収束表示に一致する。$Q=N-M\ge2$ とすると

$$
\begin{aligned}
T_{N,M}(h)
&\le\frac{\|h''\|_\infty}{2\pi^2}
\sum_{q=Q}^\infty\frac1{q^2}\\
&\le\frac{\|h''\|_\infty}{2\pi^2(Q-1)}.
\end{aligned}
$$

最後の不等式は $q\ge2$ で $1/q^2\le1/(q(q-1))$ とし、$1/(q(q-1))=1/(q-1)-1/q$ を足し合わせて得る。これは保守的な $O(N^{-1})$ 上界であり、学習器がPDEの解を正しく予測するという主張ではない。

## 5. 同じ入力でも8点では誤り、16点では正しい例

$M=1$、$R_{\pm1}=1$、$R_0=W=b=0$、恒等活性化を固定し、$h(x)=\cos(14\pi x)$ とする。連続FNOは周波数 $\pm7$ を捨てるから $\mathcal Fh=0$ となる。一方、格子数8では $7\equiv-1\pmod8$、$-7\equiv1\pmod8$ なので $\widetilde h_{\pm1}=1/2$ となり、格子出力は $\cos(2\pi j/8)$。$j=0$ の誤差が1である。

格子数16では、周波数 $\pm7$ は $\pm1$ に折り返さない。したがって

$$
E_8(h)=1,\qquad E_{16}(h)=0.
$$

[尾部評価](#thm-pml2-17-tail-bound)の上界はそれぞれ2と0なので、実値と一致する必要はない。エイリアシングは剰余類で決まるため、有限個の格子について誤差が単調に下がる一般定理もない。上記の収束定理は**固定した入力**に対して十分細かな格子を取る場合の主張である。

## 6. 非線形層を重ねると新しい周波数が生まれる

最初の入力が帯域制限されていても、次の層の入力に同じ制限があるとは限らない。恒等でない活性化の最小例として $\sigma(s)=s^3$ を使う。

最初の層は $R_{\pm1}=1$、$R_0=W=b=0$、$\sigma(s)=s^3$、次の層は同じ重みで恒等活性化とする。入力 $h(x)=\cos(2\pi x)$ に対し、三倍角公式から

$$
\begin{aligned}
\mathcal F^{(1)}h(x)
&=\cos^3(2\pi x)
=\frac34\cos(2\pi x)+\frac14\cos(6\pi x),\\
\mathcal F^{(2)}(\mathcal F^{(1)}h)(x)
&=\frac34\cos(2\pi x).
\end{aligned}
$$

$N=4$ では新たな周波数3が $-1$ と一致する。格子では $\cos^3(2\pi j/4)=\cos(2\pi j/4)$ なので、2層後も $\cos(2\pi j/4)$ が残る。連続2層出力と最大 $1/4$ の差がある。$N=8$ なら周波数3と $\pm1$ が衝突せず、出力は連続2層の標本値に一致する。

$$
E_4^{(2)}(h)=\frac14,\qquad E_8^{(2)}(h)=0.
$$

ここで $E_N^{(2)}$ は2層合成とその格子実装の同じ節点上の差である。失われたのは**第2層に入力される関数の帯域制限条件**であって、第1層の入力の帯域制限ではない。深いネットワークでは各層の標本化誤差と[安定性定数](../PML2-16/index.md#thm-pml2-16-stability)による誤差増幅の両方を調べる。

## 7. 非周期境界では、何を周期延長したかが重要

前講の連続FNOは周期1の**連続**関数を前提としていた。区間 $[0,1]$ 上の $u(x)=x$ は $u(0)=0$、$u(1)=1$ で端点が一致せず、そのまま $C(\mathbb T)$ の元とすることはできない。境界条件をもつPDEに適用する場合は延長・padding・境界補正の方法を明示する。

周期1で単純に繰り返した $u$ は跳びを持つが、積分可能な関数としてのFourier係数は計算できる。非零整数 $k$ に対し

$$
\widehat u_k=\int_0^1xe^{-2\pi ikx}\,dx
=-\frac1{2\pi ik}.
$$

これは $1/|k|$ の減衰で、絶対総和可能ではない。したがって第4節の尾部評価をそのまま適用できない。

一方、$[0,2]$ 上で $v(x)=x$（$0\le x\le1$）、$v(x)=2-x$（$1\le x\le2$）と**鏡映延長**し、長さ2で繰り返せば連続になる。周波数基底は $e^{\pi ikx}$ となり、平均は $1/2$、$k\ne0$ の係数は

$$
\widehat v_k=\frac12\int_0^2v(x)e^{-\pi ikx}\,dx
=\frac{(-1)^k-1}{\pi^2k^2}.
$$

導関数の角は残るが、係数は $1/k^2$ の次数で減衰する。ただし周期の長さも変わり、元のPDEの境界条件が自動的に維持されるわけではない。**延長規則、切り出す領域、境界上の誤差**を指定してはじめて精度比較に意味が生まれる。

## 8. PDE解作用素への予測誤差は別の項になる

[PML2-14で導入した解作用素の定義](../PML2-14/index.md#def-pml2-14-operator)にならい、周期関数を別の周期関数へ写す参照写像を $\mathcal G$ と書く。入力 $h$ に対する参照解 $\mathcal Gh$ が周期連続関数であり、連続FNOの出力 $\mathcal Fh$ も同じ値域を持つと仮定する。連続モデルそのものが真の解と異なる可能性を区別する。

<a id="prop-pml2-17-error-split"></a>

<!-- formal-statement-start -->
> **命題（離散化誤差とモデル誤差の分解）**  
> $h\in C(\mathbb T;\mathbb R^m)$ と $\mathcal Fh,\mathcal Gh\in C(\mathbb T;\mathbb R^m)$、偶数 $N>2M$ を仮定する。格子FNOが連続FNOと同じ重みを用いるなら

$$
\max_{j,a}|(\mathcal F_NS_Nh)_{j,a}-(\mathcal Gh)_a(x_j)|
\le E_N(h)+\|\mathcal Fh-\mathcal Gh\|_{\infty,m}.
$$

<!-- formal-statement-end -->

**証明の見取り図。** 真の解と格子出力の間に連続FNOの格子評価を挿入し、三角不等式を使う。

<!-- proof-start -->
### 証明

格子配列の差を

$$
\mathcal F_N(S_Nh)-S_N(\mathcal Gh)
=\{\mathcal F_N(S_Nh)-S_N(\mathcal Fh)\}
+S_N(\mathcal Fh-\mathcal Gh)
$$

と書く。格子点 $x_j$ と出力成分 $a$ を固定すると、上の配列の等式から、各成分の差について

$
\begin{aligned}
|(\mathcal F_NS_Nh)_{j,a}-(\mathcal Gh)_a(x_j)|
&\le |(\mathcal F_NS_Nh)_{j,a}-(\mathcal Fh)_a(x_j)|\\
&\quad+|(\mathcal Fh)_a(x_j)-(\mathcal Gh)_a(x_j)|.
\end{aligned}
$

右辺第1項をすべての $j,a$ で最大化した値は[解像度移植誤差](#def-pml2-17-grid-error) $E_N(h)$ であり、第2項は連続関数の全点での最大ノルム以下である。すなわち

$$
\|S_N(\mathcal Fh-\mathcal Gh)\|_{\max}
\le\|\mathcal Fh-\mathcal Gh\|_{\infty,m}.
$$

二項を足して主張を得る。
<!-- proof-end -->

重みを固定し格子を細かくしても、第2項は変わらない。未知入力への汎化、別境界条件への外挿、参照PDEソルバ自身の離散化誤差は、この命題からは評価できない。それぞれ独立の試験条件と誤差指標が必要である。

## 9. 4・8・16点の再現計算

[標準Pythonによる計算ファイル](resolution_demo.py)を同じディレクトリから実行する。DFTは正規化係数を定義式の有限和から計算する。$M=1$、$R_{\pm1}=1$、$W=b=R_0=0$ として、線形一層では $h(x)=\cos(14\pi x)$、非線形二層では $h(x)=\cos(2\pi x)$ と三乗活性化を使う。

~~~bash
python resolution_demo.py
~~~

| 格子数 $N$ | 線形一層の移植誤差 | 三乗活性化を含む二層の移植誤差 |
|---:|---:|---:|
| 4 | 1 | 0.25 |
| 8 | 1 | 0 |
| 16 | 0 | 0 |

線形一層の連続出力は0、二層の連続出力は $\frac34\cos(2\pi x)$ である。表示した0は厳密値で、実際の浮動小数点出力は $10^{-15}$ 程度の丸め差を含むことがある。同じ入力関数と同じ重みを保った上で格子数だけを変更している。

## 10. 演習：解像度の条件を判定する

### Level A：定義と小さな判定

### PML2-17-A01：4点格子での標本化
- Level: A

$h(x)=\cos(2\pi x)$ を4点で標本化し、$R_{\pm1}=1$、$M=1$、$W=b=R_0=0$、恒等活性化での出力と $E_4(h)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $x_j=j/4$ を代入して $S_4h=(1,0,-1,0)$。[DFTの定義](../PML2-16/index.md#def-pml2-16-dft)より、$j=0,2$ だけが非零なので

$$
\widetilde h_r=\frac14\{1-(-1)^r\}.
$$

よって $\widetilde h_1=\widetilde h_3=1/2$。格子出力は $\frac12e^{2\pi ij/4}+\frac12e^{-2\pi ij/4}=\cos(2\pi j/4)$。連続層も同じ余弦を返すので[定義](#def-pml2-17-grid-error)から $E_4(h)=0$。
<!-- solution-end -->

### PML2-17-A02：帯域制限の条件
- Level: A

$h(x)=1+\cos(6\pi x)$、$M=2$ に対し、$N=6$ と $N=8$ のどちらが[一層厳密一致定理](#thm-pml2-17-bandlimit)の仮定を満たすか調べよ。

<!-- solution-start -->
**詳細解答。** $h$ の最大周波数は $H=3$。条件は $N>2\max\{H,M\}=6$ なので $N=8$ は満たし、$N=6$ は満たさない。6点格子では $3\equiv-3\pmod6$ となるため、周波数の識別に衝突がある。定理の十分条件が成立しないことと、特定の重みの出力が必ず誤ることは別である。
<!-- solution-end -->

### PML2-17-A03：尾部の直接計算
- Level: A

$h(x)=\cos(14\pi x)$、$M=1$ で $T_{8,1}$、$T_{16,1}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $c_7=c_{-7}=1/2$ だけが非零である。[尾部の定義](#def-pml2-17-tail)で $N=8$ は $|q|\ge7$ を数えるので $T_{8,1}=1$、$N=16$ は $|q|\ge15$ を数えるので $T_{16,1}=0$。いずれも実数周期連続な三角多項式なので仮定を満たす。
<!-- solution-end -->

### PML2-17-A04：周期境界と微分可能性
- Level: A

$u(x)=x$ と $v(x)=x(1-x)$（$0\le x\le1$）のどちらが周期1の連続関数へ延長できるか調べ、延長可能な方の導関数が周期的か判定せよ。

<!-- solution-start -->
**詳細解答。** $u(0)=0$、$u(1)=1$ なので連続周期延長できない。$v(0)=v(1)=0$ なので $v$ は周期1の連続関数へ延長できる。しかし $v'(x)=1-2x$ だから $v'(0)=1$、$v'(1)=-1$ で、延長後の導関数はつながらない。連続な周期性と $C^1$ の周期性は別の条件である。
<!-- solution-end -->

### PML2-17-A05：周波数の剰余判定
- Level: A

$N=8$ と16で、周波数7が周波数 $-1,0,1$ のどれと同一視されるか示せ。

<!-- solution-start -->
**詳細解答。** $7-(-1)=8$ なので8点では周波数7が $-1$ と同じ剰余になる。一方16点では差が8、7、6のいずれも16の倍数ではないため、$-1,0,1$ のどれとも一致しない。[格子周波数の同一視](../PML2-16/index.md#thm-pml2-16-alias)がこの判定の根拠である。
<!-- solution-end -->

### Level B：証明と反例

### PML2-17-B01：8点格子での厳密一致を計算する
- Level: B

$h(x)=a+b\cos(2\pi x)+c\cos(6\pi x)$、$a,b,c\in\mathbb R$、$M=1$、$N=8$ とする。$R_{\pm1}=1$、$R_0=W=b_{\mathrm{bias}}=0$、恒等活性化での格子出力を求めよ。

<!-- solution-start -->
**詳細解答。** 周波数係数は $c_0=a$、$c_{\pm1}=b/2$、$c_{\pm3}=c/2$ である。ここでは $c_q$ を係数名として用いる。[エイリアシング公式](../PML2-16/index.md#thm-pml2-16-alias)で剰余類1に入るのは周波数1だけ、剰余類7には周波数 $-1$ だけなので

$$
\widetilde h_1=\frac b2,\qquad
\widetilde h_7=\frac b2.
$$

したがって格子出力は $\frac b2(e^{2\pi ij/8}+e^{-2\pi ij/8})=b\cos(2\pi j/8)$。連続層も同じ式を返し、移植誤差は0となる。$H=3$ で $N=8>6$ なので[厳密一致定理](#thm-pml2-17-bandlimit)とも整合する。
<!-- solution-end -->

### PML2-17-B02：尾部上界はどこまで鋭いか
- Level: B

$m=1$、$M=1$、$R_{\pm1}=1$、$R_0=W=b=0$、恒等活性化、$h(x)=\cos(14\pi x)$ とする。$N=8$ と16で[尾部誤差評価](#thm-pml2-17-tail-bound)の上界と実際の誤差を比較せよ。

<!-- solution-start -->
**詳細解答。** $\sum_{|k|\le1}\|R_k\|_{\mathrm{row}}=2$、活性化は1-Lipschitzである。[尾部](#def-pml2-17-tail)は8点で1、16点で0なので上界はそれぞれ2、0。8点では $\cos(14\pi j/8)=\cos(2\pi j/8)$ となり、連続出力0と最大1だけ違う。16点では低周波に折り返さず誤差0。従って $E_8=1\le2$、$E_{16}=0\le0$。評価は安全な上界で、等号は一般に要求されない。
<!-- solution-end -->

### PML2-17-B03：非周期関数の係数を検算する
- Level: B

$u(x)=x$（$0\le x<1$）を周期1で繰り返した場合、$k\ne0$ のFourier積分を部分積分で求め、第4節の定理を適用できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $a=2\pi k$ とすると

$$
\begin{aligned}
\widehat u_k
&=\int_0^1xe^{-iax}\,dx\\
&=\left[\frac{xe^{-iax}}{-ia}\right]_0^1
-\int_0^1\frac{e^{-iax}}{-ia}\,dx\\
&=-\frac1{ia}+
\frac1{ia}\left[\frac{e^{-iax}}{-ia}\right]_0^1
=-\frac1{2\pi ik}.
\end{aligned}
$$

$e^{-ia}=1$ を使った。係数の絶対値は $1/(2\pi|k|)$ だから正負周波数の絶対和は発散する。さらに周期端点で跳びがあり、[連続FNOの入力条件](../PML2-16/index.md#def-pml2-16-fno-layer)を満たさない。尾部評価の絶対収束仮定を失っており、その証明の「無限和と標本化の交換」を正当化できない。
<!-- solution-end -->

### PML2-17-B04：三乗活性化の周波数
- Level: B

$h(x)=\cos(2\pi x)$ を第1層で三乗し、次の層で周波数 $\pm1$ だけを残す。$N=4,8$ の2層格子出力と連続出力の最大差を計算せよ。

<!-- solution-start -->
**詳細解答。** 三倍角公式より $\cos^3(2\pi x)=\frac34\cos(2\pi x)+\frac14\cos(6\pi x)$。連続第2層は後者の周波数3を落として $\frac34\cos(2\pi x)$ を返す。4点では $3\equiv-1\pmod4$ となり、格子の三乗値も $\cos(2\pi j/4)$ なので第2層は $\cos(2\pi j/4)$ を返す。差は $\frac14\cos(2\pi j/4)$、最大 $1/4$。8点では周波数3が $\pm1$ と衝突せず、2層格子出力は連続値と一致して誤差0。最初の帯域制限だけでは次の層の仮定を保証できない。
<!-- solution-end -->

### Level C：モデル誤差を独立に評価する

### PML2-17-C01：格子精度と目標予測の精度
- Level: C

$h(x)=\cos(14\pi x)$、評価目標の関数 $\mathcal Gh(x)=\frac12\cos(2\pi x)$ とする。$M=1$、$R_{\pm1}=1$、$W=b=R_0=0$、恒等活性化の連続FNOと格子FNOについて、次を求めよ。

1. 連続モデル誤差 $\|\mathcal Fh-\mathcal Gh\|_\infty$。
2. $N=8,16$ の移植誤差 $E_N(h)$。
3. 両格子での目標関数との差の最大値と[誤差分解](#prop-pml2-17-error-split)の上界。
4. 16点で離散化誤差0なのに予測誤差が残る理由。

<!-- solution-start -->
**詳細解答。**

**(1) 連続モデル。** $h$ の周波数は $\pm7$ のみで、FNOは $\pm1$ だけを通すから $\mathcal Fh=0$。ゆえに

$$
\|\mathcal Fh-\mathcal Gh\|_\infty
=\sup_x\left|\frac12\cos(2\pi x)\right|=\frac12.
$$

**(2) 移植誤差。** 8点では $7\equiv-1\pmod8$ から格子出力が $\cos(2\pi j/8)$ なので $E_8=1$。16点では折り返しがなく格子出力は0なので $E_{16}=0$。

**(3) 目標との差。** 8点の差は

$$
\cos(2\pi j/8)-\frac12\cos(2\pi j/8)
=\frac12\cos(2\pi j/8)
$$

なので最大 $1/2$。16点の差は $-\frac12\cos(2\pi j/16)$ なのでやはり最大 $1/2$。一方、[分解命題](#prop-pml2-17-error-split)の上界は8点で $1+1/2=3/2$、16点で $0+1/2=1/2$。どちらも真の差の上界である。

**(4) 結論。** 16点の格子実装は連続モデルの出力0を厳密に再現するが、指定された目標 $\mathcal Gh$ 自体が0ではない。**離散化誤差が0**という事実から**モデル近似誤差が0**とは推論できない。なお本問の $\mathcal Gh$ は指定された評価用の関数であり、任意のPDEの解作用素であるという仮定は置いていない。
<!-- solution-end -->

## 11. まとめと次講

1. [帯域制限下の厳密一致](#thm-pml2-17-bandlimit)は、重みを共有できる理由と格子での精度が保証される条件を分けている。
2. [尾部誤差評価](#thm-pml2-17-tail-bound)は、固定入力のFourier係数の高周波成分から離散化誤差を評価する。非線形層と非周期境界では適用条件をもう一度確認する。
3. [誤差分解](#prop-pml2-17-error-split)を使えば格子解像度とPDE予測精度を分離できる。

次のPML2-18では、全格子でのDFTではなく有限個のセンサから入力関数を受け取るDeepONetを扱う。
