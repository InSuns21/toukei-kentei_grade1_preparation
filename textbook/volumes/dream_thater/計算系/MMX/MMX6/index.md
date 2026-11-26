# MMX6 任意標数の分離補題、任意の体への9/4上界、Amanov–van den Berg–Zuiddamの証明とShpilka解説の照合

[MMX5](../MMX5/index.md) で共有脚を分離して得た対角増大率は、複素数上の行列積指数を制約しました。位相平均には原始根と複製数の逆元が必要でした。今回は多項式の評価と局所代入で同じ役割を果たし、残りの議論に標数の制限がないことを検証します。最後に、代数閉体で得た漸近上界を元の体に戻します。

直接前提：[MMX5](../MMX5/index.md)、[ACOMP4](../../ACOMP/ACOMP4/index.md)、[ACOMP21](../../ACOMP/ACOMP21/index.md)、[ACOMP22](../../ACOMP/ACOMP22/index.md)。

## 1. 標数に依存しない補間と局所代入

標数 $p>0$ で $p$ が複製数 $L$ を割ると、$1/L$ は存在しません。[有限共有脚分離](../MMX5/index.md#prop-mmx5-finite-separation) の位相平均をそのまま使えない理由です。一方、相異なる点での補間に必要な逆元は点の差だけです。例えば標数2でも相異なる二点 $0,1$ では、一次多項式 $f(t)=c_0+c_1t$ は $c_0=f(0),c_1=f(1)-f(0)$ と復元できます。

体を $K$、$K[t]_{<d}$ を次数が $d$ 未満の多項式の空間とします。次の構成では $u^n$ 以上の項を捨てて積を扱います。この切断は、捨てた項が後で低次数に戻らないことを利用しています。

<a id="def-mmx6-truncated-polynomial"></a>

<!-- formal-statement-start -->
> **定義（切断多項式環）**
>
> 体 $K$ と正整数 $n$ に対し、$J_n=K[u]/(u^n)$ を切断多項式環とする。元は次数 $n$ 未満の代表元で一意に表し、積は通常の多項式積から $u^n$ 以上の項を除いたものとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mmx6-truncated-polynomial -->
$n=3$、$K=\mathbb F_2$ としましょう。$f=1+u^2$、$g=u+u^2$ とすると

$$
fg=u+u^2+u^3+u^4\equiv u+u^2\pmod{u^3}.
$$

捨てた部分は $u^3(1+u)$ で、$(u^3)$ に属します。代表元を変えても差は $u^3$ の倍数であり、任意の多項式を掛けてもそのまま倍数なので積は代表元の選択に依存しません。次数3未満の二つの代表元の差が $u^3$ の倍数なら、その差は零です。従って代表元も一意です。$1,u,u^2$ は基底なので $\dim_K J_3=3$ です。
<!-- definition-example-end -->

以下、局所代入 $t=a+\varepsilon u$ を使います。例えば $n=2$ なら $p(t)=c_0+c_1t+c_2t^2$ に対し

$$
p(a+\varepsilon u)=p(a)+\varepsilon(c_1+2ac_2)u
\quad\text{in }J_2[\varepsilon].
$$

標数2では $2ac_2=0$ になりますが、定数項はどの標数でも $p(a)$ です。Taylor展開の階乗による除算は必要ありません。

## 2. 多項式乗算による共有脚の分離

[共有脚付き整合ブロック](../MMX5/index.md#def-mmx5-shared-leg) の第1脚を多項式の係数で拡張すると、各区画に異なる評価点を割り当てられます。第2・第3脚に $J_n$ とその双対（線形汎関数の空間）を添えて、評価点の周りの局所代入を通常の多項式乗算から作ります。

<a id="prop-mmx6-polynomial-separation"></a>

<!-- formal-statement-start -->
> **命題（多項式による共有脚分離）**
>
> $M,n\ge1$ とし、体 $K$ が少なくとも $M+n-1$ 個の相異なる元を含むとする。有限次元の $K$ ベクトル空間 $X,Y_h,Z_h$ 上の三重線形形式 $A_h:X\times Y_h\times Z_h\to K$ と、その和
>
$$
A(x,y,z)=\sum_{h=1}^M A_h(x,y_h,z_h),
\quad y\in\bigoplus_hY_h,\quad z\in\bigoplus_h Z_h
$$
>
> を考える。$A$ の $M+n-1$ 個の直和から、多項式パラメータに関する退化で
>
$$
\bigoplus_{h=1}^M (A_h\boxtimes B_X(n))
$$
>
> が得られる。右辺は三脚とも区画間で独立であり、$B_X(n)$ は第1脚が一次元の長さ $n$ の内積型テンソルである。
<!-- formal-statement-end -->

### 証明の見取り図

評価点で第1脚を独立にし、各区画の局所代入を普通の積へ戻します。非零のパラメータで必要な座標変換は逆を持ち、最終的な係数には負の冪が残りません。

<!-- proof-start -->
### 証明

$\ell=M+n-1$、$P=K[t]_{<M}$、$Q=K[t]_{<n}$、$W=K[t]_{<\ell}$、$J=J_n$ とします。積写像は

$$
\mu:P\times Q\longrightarrow W,\qquad (p,q)\longmapsto pq
$$

です。次数の和は高々 $M+n-2=\ell-1$ なので値域に入ります。

相異なる $a_1,\ldots,a_M$ を選び、評価写像

$$
e:P\to K^M,\qquad p\mapsto(p(a_1),\ldots,p(a_M))
$$

を作ります。次数 $M$ 未満の非零多項式は $M$ 個の相異なる根を持てないため核は零で、両辺の次元が $M$ なので同型です。

区画 $h$ ごとに

$$
g_h(q)=q(a_h+\varepsilon u),\qquad
i_h(w)=w(a_h+\varepsilon u)
$$

とします。$g_h:Q\to J$、$i_h:W\to J$ の係数を $\varepsilon$ の多項式として扱います。$g_h$ は基底 $(t-a_h)^s$ ($0\le s<n$) を $\varepsilon^s u^s$ に写すので、$\varepsilon$ を可逆とした環 $K[\varepsilon,\varepsilon^{-1}]$ 上で逆写像を持ちます。具体的には次数 $n$ 未満の代表元 $j$ に

$$
g_h^{-1}(j)=j((t-a_h)/\varepsilon)
$$

を対応させます。代入して $j(u)$ に戻るため逆写像です。これは有限個の負の冪を含み得ますが、[形式 Laurent 級数](../../ACOMP/ACOMP21/index.md#def-acomp21-formal-laurent) と同じくパラメータの冪を形式的に扱えばよく、解析的収束は要りません。

積の代入は積のままなので

$$
i_h\bigl(p\,g_h^{-1}(j)\bigr)
=p(a_h+\varepsilon u)j
\quad\text{in }J[\varepsilon,\varepsilon^{-1}].
$$

右辺には負の冪がありません。左辺が負の冪を含む座標変換を経ても、積の結果にはそれが残らないことが重要です。

$\mu$ に対応する [多項式乗算テンソル](../MMX4/index.md#def-mmx4-convolution) を三重線形形式 $\psi(pq)$ ($\psi\in W^*$) として使います。相異なる $\ell$ 点 $b_s$ で積を評価すると $p(b_s)q(b_s)$ が得られます。$W$ の評価写像は上と同じ根の個数と次元の議論で同型です。その逆写像で単位ベクトルを戻した多項式を $w_s$ とすれば

$$
pq=\sum_{s=1}^{\ell}p(b_s)q(b_s)w_s.
$$

従って三重線形形式は $\sum_s p(b_s)q(b_s)\psi(w_s)$ と表せ、$\ell$ 個のスカラー積の [制限](../../TSP/TSP4/index.md#def-tsp4-restriction) です。$A$ と積を取れば、$A^{\oplus\ell}$ から $A\boxtimes C(M,n)$ を制限で得ます。

その三脚の入力空間を順に

$$
X\otimes P,\qquad \bigoplus_h(Y_h\otimes Q),
\qquad \bigoplus_h(Z_h\otimes W^*)
$$

と見ます。新しい第2・第3脚にはそれぞれ $J,J^*$ を使い、第1脚はそのまま、第2脚は各区画で $g_h^{-1}$、第3脚は各区画で $i_h^*:\varphi\mapsto\varphi\circ i_h$ を作用させます。異なる区画の間に項は生じません。一致する区画の純テンソル上で得られる形式は

$$
\Phi_\varepsilon(x\otimes p,y_h\otimes j,z_h\otimes\varphi)
=A_h(x,y_h,z_h)(i_h^*\varphi)(p\,g_h^{-1}j)

$$

$$
=A_h(x,y_h,z_h)\varphi(p(a_h+\varepsilon u)j).
$$

純テンソルが各空間を張るため、この等式が全係数を定めます。最後の式は $\varepsilon$ の多項式で、次数は高々 $\min(M-1,n-1)$ です。よって定数項に移れます。

$$
\Phi_0(x\otimes p,y_h\otimes j,z_h\otimes\varphi)
=A_h(x,y_h,z_h)p(a_h)\varphi(j).
$$

$e$ を第1脚へ適用すると $p(a_h)$ は第 $h$ 成分だけを読みます。$J$ の基底と双対基底で $\varphi(j)=\sum_{s=0}^{n-1}j_s\varphi_s$ なので、この補助因子は [内積型テンソル](../MMX4/index.md#def-mmx4-dot) $B_X(n)$ です。第2・第3脚も元から区画ごとに独立です。従って定数項は所望の全直和になります。
<!-- proof-end -->

$M=n=2$ の場合、$K$ に3点あれば複製は3個で足ります。$p(t)=c_0+c_1t$、$j=j_0+j_1u$ とすると

$$
p(a_h+\varepsilon u)j
=(c_0+c_1a_h)j_0+
\bigl((c_0+c_1a_h)j_1+c_1\varepsilon j_0\bigr)u
$$

です。定数項では二つの係数に同じ $p(a_h)$ が掛かり、残る二成分の積和は長さ2の内積型テンソルになります。$a_1=0,a_2=1$ なら評価座標は $c_0,c_0+c_1$ で、標数2でも独立です。

## 3. 無限体上のスペクトル評価

無限体なら退化の冪を何回取っても必要な評価点が確保できます。[多項式退化のスペクトル単調性](../MMX4/index.md#lem-mmx4-spectral-degeneration) の補間論証を確認します。$\Phi_\varepsilon$ の次数を $D$ とすると、$N$ 回のKronecker積の次数は高々 $ND$ です。相異なる非零点を $ND+1$ 個選ぶと、定数項 $\Phi_0^{\boxtimes N}$ は評価テンソルの直和から制限で得られます。各評価値が $S$ の制限なら

$$
\lambda(\Phi_0)^N\le(ND+1)\lambda(S)^N.
$$

$D$ を固定して $N$ 乗根を取ると $(ND+1)^{1/N}\to1$ なので $\lambda(\Phi_0)\le\lambda(S)$ です。[回路の形式的退化](../../ACOMP/ACOMP22/index.md#def-acomp22-degeneration) で負の冪を許したときと同様に、各写像の係数に Laurent 多項式を用いても、非零点で写像が定義され、結果が多項式ならこの証明が働きます。有限体の点だけでは任意の $ND+1$ 点を選べないことに注意します。

<a id="cor-mmx6-entropy"></a>

<!-- formal-statement-start -->
> **系（任意標数の共有脚評価）**
>
> 無限体 $K$ 上で非零の整合ブロック $A_1,\ldots,A_M$ の和を $A$ とする。任意のスペクトル点 $\lambda$、その第1脚指数 $p_X$、正整数 $n$ に対し
>
$$
(M+n-1)\lambda(A)\ge n^{p_X}\sum_h\lambda(A_h).
$$
>
> さらに非零の整合ブロック $T_i$ の和 $T$ と確率ベクトル $q$ に対し
>
$$
\lambda(T)\ge \exp(p_XH(q))\prod_i\lambda(T_i)^{q_i},
\qquad H(q)=-\sum_iq_i\log q_i
$$
>
> が成立する。対数は自然対数、$0\log0=0$ とする。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[多項式による共有脚分離](#prop-mmx6-polynomial-separation) と上の補間単調性、[内積型テンソルのスペクトル指数](../MMX4/index.md#thm-mmx4-dot-exponents) を使います。後者の証明は添字の切り詰め、基底の付け替え、正実数の対数だけを使うので任意の体で通用します。直和の加法性と積の乗法性により

$$
(M+n-1)\lambda(A)
\ge\sum_h\lambda(A_h)\lambda(B_X(n))
=n^{p_X}\sum_h\lambda(A_h).
$$

次に有理確率 $q_i$ を固定し、$Nq_i$ が整数になる $N$ で冪 $T^{\boxtimes N}$ を考えます。[共有脚のエントロピー不等式](../MMX5/index.md#cor-mmx5-entropy) の固定頻度語の構成を使うと

$$
M_N=\frac{N!}{\prod_i(Nq_i)!}
$$

個の整合ブロックが残り、各ブロックの評価は $V_N=\prod_i\lambda(T_i)^{Nq_i}$ です。上の有限評価で $M=n=M_N$ と選ぶと

$$
(2M_N-1)\lambda(T)^N\ge M_N^{1+p_X}V_N.
$$

従って

$$
\lambda(T)\ge
\left(\frac{M_N}{2M_N-1}\right)^{1/N}
M_N^{p_X/N}\prod_i\lambda(T_i)^{q_i}.
$$

$1/2\le M_N/(2M_N-1)\le1$ なので最初の因子は1に収束します。MMX5の階乗の積分評価は整数の語数に対する実数上の評価であり、体の中で階乗を割ってはいません。従って $\log M_N/N\to H(q)$ が成立し、結論が得られます。最後に有理確率で近似します。非零の $T_i$ の値は1以上であり、$x\log x\to0$ ($x\downarrow0$) なので右辺は境界を含む確率単体で連続です。
<!-- proof-end -->

複製数が $5M$ から $2M-1$ になっても冪の根を取ると定数倍は消えるため、エントロピー指数そのものは同じです。

## 4. 残りの証明はどの体で通るか

複素数の特殊性を使っていない部分も、適用条件を一つずつ確かめます。無限体 $K$ の任意のスペクトル点 $\lambda$ を固定し、[対称化次数プロファイル](../MMX4/index.md#def-mmx4-profile) と同じ式を $K$ 上で使います。

$$
t=(p_X+p_Y+p_Z)/3,\qquad
P(a,b)=\left(\prod_{\pi\in S_3}\lambda_\pi(C(a,b))\right)^{1/(6t)}.
$$

指数は実数であり $t\ge1/3$ です。無限体での $a+b-1$ 点の補間、入力交換による置換の並び替え、$C(1,b)=B_X(b)$ から [対称化次数プロファイルの基本評価](../MMX4/index.md#thm-mmx4-profile-basic) の証明が通り、$P(1,b)=b$、$P(a,b)=P(b,a)>0$、$P(a,b)\le(a+b-1)^{1/t}$ を得ます。

[行列式による次数の分離](../MMX4/index.md#lem-mmx4-determinant-filtration) では、$V_e$ を二変数の斉次次数 $e$ の空間とし、$\sigma_e(As+Bw)=uA+vB$ とします。単項式の像で全射性が成り立ち、$D=uw-vs$ に対して $\sigma_e(Dg)=-uvg+vug=0$ です。$Dg=0$ なら $ug=0$ より $g=0$。従って $DV_{e-1}$ は $e$ 次元であり、核の次元 $2(e+1)-(e+2)=e$ と一致します。標数2では減算が加算になりますが $-uvg+vug=0$ は保たれます。$f$ 倍と $\sigma_e$ は可換であり、核と商の二つの対角ブロックは MMX5 と同じです。

[次数プロファイルの離散凹性](../MMX5/index.md#lem-mmx5-concavity) の重み付けを施せば、$C(a,b)\boxtimes B_X(2)$ から共有脚付きの $C(a,b+1),C(a,b-1)$ が得られます。負の重みのブロックは核から商への零写像、正の重みのブロックは消えるため、この構成に逆元2は不要です。[任意標数の共有脚評価](#cor-mmx6-entropy) を六置換に使い、共通確率 $q=(q_+,q_-)$ を固定すると

$$
2P(a,b)\ge e^{H(q)}U^{q_+}V^{q_-},
\qquad U=P(a,b+1),\quad V=P(a,b-1).
$$

ここで六置換の第1脚指数の和が $6t$ なので、積の $1/(6t)$ 乗により係数2が現れます。$q_+=U/(U+V)$、$q_-=V/(U+V)$ を選ぶと右辺は $(U+V)^{q_++q_-}=U+V$。従って離散凹性が成立します。

[移動付き三倍不等式](../MMX5/index.md#lem-mmx5-tripling) の区画は、整数添字 $k=i+j$ の範囲と整数の重みだけで決まり、体の元として3で割りません。中央の区画は第2・第3脚を交換した $C(a,h)$、左右は元の $C(a,h)$ です。上の共有脚評価を $q=(1/3,1/3,1/3)$ で使えば、$\lambda_\pi(C(a,3h+a-1))$ の下界は

$$
3^{p_X^{(\pi)}}\lambda_\pi(C(a,h))^{2/3}
\lambda_\pi(C(a,h)^{(23)})^{1/3}.
$$

六つの積で $(23)$ は置換の並び替えになり、$1/(6t)$ 乗すると $P(a,3h+a-1)\ge3P(a,h)$ です。確率 $1/3$ は実数です。標数3でも問題ありません。

ここで [対角増大率](../MMX5/index.md#lem-mmx5-growth) を適用できます。これは正実数関数の差分の定理で、体の標数とは独立です。以上で無限体上の任意のスペクトル点に対して

$$
a^{4/3}\le P(a,a)\le (2a-1)^{1/t}
$$

が成立します。$a\to\infty$ の対数比から $t\le3/4$、[内積型テンソルのスペクトル指数](../MMX4/index.md#thm-mmx4-dot-exponents) から $\lambda(M_2)=2^{3t}\le2^{9/4}$。任意の体を対象とする [行列積指数のスペクトル表示と基本上下界](../../TSP/TSP14/index.md#thm-tsp14-spectrum) により無限体上で $\omega_K\le9/4$ を得ます。

## 5. 有限体へ戻す際の費用

無限体上での補間を有限体上で直接実行する必要はありません。代数閉包で一度だけ固定サイズの分解を選び、その係数を含む有限次拡大を固定してから再帰します。この順序を変えると拡大次数が入力サイズに依存する恐れがあります。

<a id="thm-mmx6-algebraic-transfer"></a>

<!-- formal-statement-start -->
> **定理（代数閉包と行列積指数）**
>
> 任意の体 $F$ とその代数閉包 $\overline F$ に対し、任意定数を許す除算なしの形式算術モデルの行列積指数は
>
$$
\omega_F=\omega_{\overline F}
$$
>
> を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$F$ 上の分解は $\overline F$ 上でも使えるため $\omega_{\overline F}\le\omega_F$ です。逆向きに、任意の実数 $\eta>0$ を固定します。[行列積指数と漸近階数の一致](../../TSP/TSP14/index.md#thm-tsp14-omega-rank) から、ある整数 $b\ge2$ の正方行列積テンソルが $\overline F$ 上で $r$ 個の単純テンソルへ分解され、

$$
\log_b r<\omega_{\overline F}+\eta
$$

となります。分解の係数は有限個で、全て $F$ 上代数的です。それらを順に添加した体 $E$ の拡大次数 $d=[E:F]$ は有限です。各添加で有限次となり、その積で全体の次数が有限になるためです。

分解を再帰的に使うと、$b^k$ 次の積の全演算数 $T_k$ は次の漸化式を満たします。固定された $b,r$ に対し $c$ は入力・出力の線形結合に必要な定数です。

$
T_k\le rT_{k-1}+c b^{2(k-1)}.
$

繰り返し代入すると

$
T_k\le r^k T_0+c\sum_{j=0}^{k-1}r^j b^{2(k-1-j)}.
$

[行列積テンソルの基本上下界](../../TSP/TSP7/index.md#thm-tsp7-matrix-bounds) より $r\ge b^2$ なので、和の各項は $r^{k-1}$ 以下。よって $T_k\le r^kT_0+ckr^{k-1}=O(k r^k)$ です。$r=b^2$ の場合も含めて指数に任意の正の余裕を加えれば十分です。

入力成分は $F$ に属し、$E$ の基底を $1,e_2,\ldots,e_d$ とすれば入力の第1座標だけが非零です。[有限体拡大上の回路の座標シミュレーション](../../ACOMP/ACOMP4/index.md#thm-acomp4-coordinate-simulation) では

$$
e_i e_j=\sum_{h=1}^d c_{ijh}e_h,\qquad c_{ijh}\in F
$$

として、一つの $E$ 上の乗法を

$$
(xy)_h=\sum_{i,j=1}^d c_{ijh}x_i y_j
$$

で実現しました。$d$ は固定なので各演算の費用は $F$ 上で定数倍です。出力は元の行列積の形式多項式と一致するので第1座標を取り出せばよく、残りの座標は零です。任意サイズの零埋めでも指数は変わりません。

$k$ の因子を吸収するためさらに $\eta$ の余裕を取ると、$\omega_F\le\omega_{\overline F}+2\eta$。$\eta$ は任意なので逆向きも成立します。
<!-- proof-end -->

例えば $\mathbb F_4=\mathbb F_2[\alpha]$、$\alpha^2=\alpha+1$ の基底 $1,\alpha$ では

$$
(a+b\alpha)(c+d\alpha)
=(ac+bd)+(ad+bc+bd)\alpha.
$$

この座標式は固定の演算数で計算できます。$\mathbb F_2$ の行列から出発し、$\mathbb F_4$ 上で形式恒等式として正しい算法を使った場合、最終出力の $\alpha$ 座標は零です。

<a id="thm-mmx6-field-upper-bound"></a>

<!-- formal-statement-start -->
> **定理（任意の体上の行列積指数の上界）**
>
> 任意の体 $F$ 上で形式的に正しい除算なしの正方行列積の算術演算指数は
>
$$
\omega_F\le 9/4
$$
>
> を満たす。任意の $\eta>0$ に対し $O_{F,\eta}(n^{9/4+\eta})$ 算術演算で計算できる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\overline F$ は無限体です。有限の代数閉体 $K$ が存在したとすると、$\prod_{a\in K}(t-a)-1$ は非定数であるのに $K$ 内のどの点でも値が $-1\ne0$ となり根が存在しないため矛盾します。

第4節で示した無限体上のスペクトル評価を $\overline F$ に適用すると $\omega_{\overline F}\le9/4$。[代数閉包と行列積指数](#thm-mmx6-algebraic-transfer) により $\omega_F=\omega_{\overline F}\le9/4$ です。[行列積指数と漸近階数の一致](../../TSP/TSP14/index.md#thm-tsp14-omega-rank) の固定サイズの分解と再帰から、任意の $\eta>0$ に対する上記の演算数が従います。
<!-- proof-end -->

## 6. 三つの証明の対応

- [Lü, arXiv:2610.18914v1](https://arxiv.org/abs/2610.18914v1) の命題2.1は本講の局所代入による分離に対応します。任意の長さ $n$ に対して $M+n-1$ コピーという有限構成を与えます。
- [Amanov–van den Berg–Zuiddam, arXiv:2610.30054v1](https://arxiv.org/abs/2610.30054v1) は部分直和の退化とその組合せを明示します。補題4.6で $p_X>0$ のとき $\lambda^{1/p_X}$ の部分直和に対する超加法性を得ます。本講の系で $q_i=\lambda(T_i)^{1/p_X}/\sum_j\lambda(T_j)^{1/p_X}$ と置けば $\lambda(T)\ge(\sum_i\lambda(T_i)^{1/p_X})^{p_X}$ となり同じ評価です。$p_X=0$ のときはこの累乗を使わず制限単調性を使います。補題4.10と命題4.12は三倍不等式と六置換の積の増大に対応します。第5節の操作的障壁は許された退化・組合せ規則の範囲内の最適性であり、すべての算術回路への下界ではありません。
- [Shpilka, ECCC TR26-281](https://eccc.weizmann.ac.il/report/2026/281/) は三つの循環置換の積を $K_a=C(a,a)\boxtimes C(a,a)^\sigma\boxtimes C(a,a)^{\sigma^2}$（$\sigma$ は三脚の巡回置換）と置きます。定義3.5では六置換の積 $Q(a,b)=\boxtimes_{\pi\in S_3} C(a,b)^\pi$ の冪から退化で取り出せる正方行列のサイズを $n^{1/(2m)}$ で正規化し、その上限を $F(a,b)$ とします。対角線上では入力交換によって $Q(a,a)\simeq K_a^{\boxtimes 2}$ なので $1/(2m)$ という正規化です。これは一つのスペクトル点の $P(a,b)$ とは異なります。定理1.1では MMX5 と同じ積の下界
  $\Lambda_a=\frac{3a-1}{2}\prod_{i=1}^{a-1}(1+1/(3i))$
  を得ます。さらに第6節・定理1.2では精度 $\eta$ に応じた固定サイズの算法の明示構成を与えます。第7節では代数閉包で複製数を $2M-1$ または $2M$ のうち標数で割れない方に選ぶ位相法を使い、有限拡大から素体へ戻します。本講は局所代入法を採用しており、第6節の定量的な基底サイズ評価までは証明していません。

どの経路もここで比較した結論は上界です。$\omega=9/4$ の等号には一般の算法に対する別の下界が必要です。次講では長方形行列積の指数に進みます。

## 7. 演習

### Level A

<a id="ex-mmx6-a01"></a>

#### MMX6-A01 標数2での切断積
- Level: A
- ID: MMX6-A01

$\mathbb F_2[u]/(u^3)$ で $(1+u+u^2)(1+u)$ を求めよ。

<!-- solution-start -->
##### 詳細解答

[切断多項式環](#def-mmx6-truncated-polynomial) の積を使うと、通常の積は

$$
1+2u+2u^2+u^3=1+u^3.
$$

標数2で係数2が零になり、$u^3$ は切断されるので答えは1です。
<!-- solution-end -->

<a id="ex-mmx6-a02"></a>

#### MMX6-A02 評価座標
- Level: A
- ID: MMX6-A02

標数2の体で $p(t)=c_0+c_1t$ の $p(0)=x_1,p(1)=x_2$ を独立座標として使えることを示せ。

<!-- solution-start -->
##### 詳細解答

$c_0=x_1$、$c_0+c_1=x_2$ なので $c_1=x_2-x_1=x_2+x_1$。任意の $x_1,x_2$ に対し一意に復元でき、評価写像は同型です。差 $1-0=1$ は逆元を持ちます。
<!-- solution-end -->

<a id="ex-mmx6-a03"></a>

#### MMX6-A03 局所代入の逆
- Level: A
- ID: MMX6-A03

$n=3,a=1$ とする。$j(u)=2+u+u^2$ に対して $g^{-1}(j)$ を求め、再代入せよ。係数は任意の体の元として読む。

<!-- solution-start -->
##### 詳細解答

[多項式による共有脚分離](#prop-mmx6-polynomial-separation) の逆写像は

$$
q(t)=2+(t-1)/\varepsilon+(t-1)^2/\varepsilon^2.
$$

$t=1+\varepsilon u$ を代入すると $q(1+\varepsilon u)=2+u+u^2$。$\varepsilon$ が可逆なら標数に依存しません。
<!-- solution-end -->

<a id="ex-mmx6-a04"></a>

#### MMX6-A04 複製数の比較
- Level: A
- ID: MMX6-A04

$M=4,n=6$ の多項式分離の複製数を求めよ。$n=M$ とした場合に旧構成の $5M$ と比較せよ。

<!-- solution-start -->
##### 詳細解答

[多項式による共有脚分離](#prop-mmx6-polynomial-separation) では $M+n-1=4+6-1=9$。$n=M=4$ なら7個です。旧構成は $5M=20$ 個なので13個減ります。前者には9点、後者の新構成には7点が必要です。
<!-- solution-end -->

### Level B

<a id="ex-mmx6-b01"></a>

#### MMX6-B01 標数2での行列式の核
- Level: B
- ID: MMX6-B01

$e=1$、標数2とする。$\sigma_1$ の核を $us,vs,uw,vw$ の係数から求めよ。

<!-- solution-start -->
##### 詳細解答

[行列式による次数の分離](../MMX4/index.md#lem-mmx4-determinant-filtration) の写像に

$$
A us+B vs+C uw+D vw
$$

を代入すると $Au^2+(B+C)uv+Dv^2$ です。三つの単項式が独立なので $A=D=0,B+C=0$。標数2では $B=C$ で、核は $vs+uw=uw-vs$ の一次元空間です。全射性も $us,vs,vw$ の像が三つの基底を与えることから分かります。
<!-- solution-end -->

<a id="ex-mmx6-b02"></a>

#### MMX6-B02 複製の費用と語数
- Level: B
- ID: MMX6-B02

二つの非零ブロックの評価値が3と12、$p_X=1$ であると仮定する。$N=4,q=(1/2,1/2)$ の有限評価と漸近評価を計算せよ。

<!-- solution-start -->
##### 詳細解答

[任意標数の共有脚評価](#cor-mmx6-entropy) の語数は $M_4=\binom42=6$。各語の値は $3^2 12^2=1296$。従って

$$
11\lambda(T)^4\ge6^2\cdot1296=46656.
$$

有限評価は $\lambda(T)\ge(46656/11)^{1/4}$ です。固定頻度で $N$ を増やすと $H(q)=\log2$ なので

$$
\lambda(T)\ge2\sqrt{3\cdot12}=12.
$$

これは指定した評価値から得た下界です。非零点の補間に使える無限体を仮定しています。
<!-- solution-end -->

<a id="ex-mmx6-b03"></a>

#### MMX6-B03 超加法性との照合
- Level: B
- ID: MMX6-B03

$p_X=1/2$、二つのブロックの評価が2と3のとき、最適な確率選択を求め、$\lambda(T)$ の下界を計算せよ。

<!-- solution-start -->
##### 詳細解答

[任意標数の共有脚評価](#cor-mmx6-entropy) を $1/p_X=2$ 乗すると

$$
\lambda(T)^2\ge e^{H(q)}4^{q_1}9^{q_2}.
$$

$q=(4/13,9/13)$ とすると右辺は

$$
(4/q_1)^{q_1}(9/q_2)^{q_2}
=13^{q_1+q_2}=13.
$$

従って $\lambda(T)\ge\sqrt{13}$。この選択が最大を与えることも確認します。$U_1=4,U_2=9$ とし、全ての $q_i>0$ に対して $\log x\le x-1$ ($x>0$、$x-1-\log x$ は $x=1$ で最小値0) を使えば

$
\sum_i q_i\log\frac{U_i}{13q_i}
\le\sum_i q_i\left(\frac{U_i}{13q_i}-1\right)
=1-1=0.
$

従って $\prod_i(U_i/q_i)^{q_i}\le13$ です。境界では右辺の値が4または9なので13を超えません。
<!-- solution-end -->

<a id="ex-mmx6-b04"></a>

#### MMX6-B04 有限拡大の座標計算
- Level: B
- ID: MMX6-B04

$\mathbb F_4$ の $\alpha^2=\alpha+1$ を用いて $(1+\alpha)^2$ と $\alpha(1+\alpha)$ を基礎体の座標で計算せよ。

<!-- solution-start -->
##### 詳細解答

第5節の座標式で $a=b=c=d=1$ を代入すると定数座標は $1+1=0$、$\alpha$ 座標は $1+1+1=1$。従って $(1+\alpha)^2=\alpha$ です。次に $a=0,b=1,c=d=1$ では定数座標が $0+1=1$、$\alpha$ 座標は $0+1+1=0$。従って $\alpha(1+\alpha)=1$ です。固定基底での各演算は基礎体の加法と乗法のみで実行されました。
<!-- solution-end -->

<a id="ex-mmx6-b05"></a>

#### MMX6-B05 証明の比較と指数の読み方
- Level: B
- ID: MMX6-B05

無限体 $K$ 上で Shpilkaの三つの循環置換からなる積 $K_a$ の階数上界を $(2a-1)^3$、その冪から得る行列サイズの増加率の下界を $a^{4/3}$ とする。$a\ge2$ で導かれる指数上界とその $a\to\infty$ の極限を求めよ。また、操作的障壁だけでは一般の下界を導けない理由を述べよ。

<!-- solution-start -->
##### 詳細解答

冪の1回当たりの階数上界と行列サイズの増加率の対数比を取ります。増加率の定義に上限が含まれるので、$1<\rho<a^{4/3}$ を選んでから有限の冪を選ぶと、行列サイズの増加率が $\rho$ 以上になります。[行列積指数と漸近階数の一致](../../TSP/TSP14/index.md#thm-tsp14-omega-rank) と [多項式退化のスペクトル単調性](../MMX4/index.md#lem-mmx4-spectral-degeneration) の冪・補間の議論から

$
\omega_K\le\frac{3\log(2a-1)}{\log\rho}.
$

$\rho\uparrow a^{4/3}$ とすると

$
\omega_K\le \frac{9}{4}
\left(1+\frac{\log(2-1/a)}{\log a}\right).
$

括弧内の追加項は $a\to\infty$ で0に収束するので $\omega_K\le9/4$ です。Amanov–van den Berg–Zuiddamの操作的障壁は指定された構成規則の組合せだけを対象とするため、その規則で表せない算法を排除しません。したがってすべての算法について $\omega_K\ge9/4$ とは結論できません。
<!-- solution-end -->

### Level C

<a id="ex-mmx6-c01"></a>

#### MMX6-C01 有限体上への指数移行
- Level: C
- ID: MMX6-C01

有限体 $F$ の代数閉包上で、任意の $\delta>0$ に対して固定サイズ $b\ge2$ の行列積に $r<b^{9/4+\delta}$ 項の分解が存在すると仮定する。$F$ 上で $\omega_F\le9/4$ となる理由を示せ。拡大次数をサイズ $n$ に応じて変える場合の問題も述べよ。

<!-- solution-start -->
##### 詳細解答

$\delta>0$ を固定し、その条件を満たす $b,r$ と分解を一つ選びます。係数の有限集合を $F$ に添加した $E$ は有限次拡大で、$d=[E:F]$ は $n$ に依存しません。

[行列積指数と漸近階数の一致](../../TSP/TSP14/index.md#thm-tsp14-omega-rank) の再帰構成により $b^k$ 次では高々 $O(k r^k)$ 演算です。$b^{k-1}<n\le b^k$ となる $k$ を選んで零埋めすると $b^k<bn$ ($n\ge2$)。$\log_b r<9/4+\delta$ なので

$$
k r^k=O((\log n)n^{9/4+\delta}).
$$

[有限体拡大上の回路の座標シミュレーション](../../ACOMP/ACOMP4/index.md#thm-acomp4-coordinate-simulation) で各加法・乗法の費用は固定 $d$ に依存する定数倍です。出力の第1座標を取り出し、$\log n=O_\delta(n^\delta)$ を使えば $O_{F,\delta}(n^{9/4+2\delta})$。$\delta$ は任意なので $\omega_F\le9/4$ となります。これが [代数閉包と行列積指数](#thm-mmx6-algebraic-transfer) の適用です。

もし $n$ ごとに拡大体を選び、例えば $d=n$ となれば、座標計算の費用が $n$ の冪として増え得ます。その費用を定数扱いすることはできません。まず固定サイズの分解を選ぶ順序が必要です。
<!-- solution-end -->
