# KAH1-06 Fubini–Study形式I（局所構成）

<!-- definition-example-audit: strict -->

## 1. 平坦な座標から、射影空間の曲がった計量へ

[平坦な複素Euclid模型](../KAH1-05/index.md#prop-kah1-05-constant-model)は、二次関数をポテンシャルとして正のKähler形式を与えた。しかし、射影空間の点は複素ベクトルそのものではなく、非零ベクトルを複素数倍した**方向**である。一枚の複素座標で全ての方向を表すことはできない。まず方向を局所座標に直し、その各座標上で正値な形式を計算しよう。

この章の問いは「射影空間の標準座標で、どんなポテンシャルがKähler計量を作るか」である。別の座標との貼り合わせと面積の規格化は次章で扱う。ここでは局所式の正値性を最後まで証明する。

以後 $n\ge1$ とし、$z=(z^1,\ldots,z^n)\in\mathbb C^n$、$r^2=\sum_j|z^j|^2$、$S=1+r^2$ とする。複素偏微分は[Wirtinger微分の定義](../../CM/CM2-02/index.md#def-cm2-02-wirtinger-operators)に従い、$z^j$ と $\bar z^j$ を独立変数として微分する。例えば $\partial_i z^j=\delta_{ij}$、$\partial_{\bar i}\bar z^j=\delta_{ij}$、$\partial_i\bar z^j=0$ である。

## 2. 射影空間の点と標準チャート

複素数 $c\ne0$ による同時スカラー倍で同じ方向と考える。例えば $(1,z)$ と $(2,2z)$ は同じ方向である。どの成分も零でないことは要求せず、**全成分が同時に零ではない**ことだけを要求する。

<a id="def-kah1-06-projective-space"></a>

<!-- formal-statement-start -->
> **定義（複素射影空間と標準チャート）**  
> $n\ge1$ とする。$\mathbb C^{n+1}\setminus\{0\}$ に $Z\sim W$ を「ある $c\in\mathbb C^\times$ について $W=cZ$」で定める。商集合

$$
\mathbb{CP}^n=(\mathbb C^{n+1}\setminus\{0\})/\sim
$$

> を**複素射影空間**といい、その点を $[Z_0:\cdots:Z_n]$ と書く。$a\in\{0,\ldots,n\}$ に対し $U_a=\{[Z]\mid Z_a\ne0\}$ を**標準チャートの領域**とし、$U_a$ の座標は $Z_j/Z_a$（$j\ne a$）を添字の順に並べたものとする。
<!-- formal-statement-end -->

ここで「座標」が本当に一点を一つの複素 $n$ 組に対応させるかを確かめる。$Z$ を $cZ$ に替えても $(cZ_j)/(cZ_a)=Z_j/Z_a$ なので、比は代表元に依存しない。逆に座標が決まれば $a$ 番目の成分を $1$ とした代表元を一意に作れる。

<!-- definition-example-start: def-kah1-06-projective-space -->
**定義の確認**。$\mathbb{CP}^1$ の点 $[2:2i]=[1:i]$ は $U_0$ に属し、座標は $z=Z_1/Z_0=i$ である。同じ点は $U_1$ にも属し、そちらの座標は $w=Z_0/Z_1=1/i=-i$。$[0:1]$ は $U_1$ には属するが $U_0$ に属さない。任意の非零代表元には非零成分があるから、$U_0,\ldots,U_n$ は全射影空間を覆う。$U_0$ の逆座標は $z\mapsto[1:z^1:\cdots:z^n]$ である。
<!-- definition-example-end -->

ここで確認するのは、[複素 $n$ 次元座標近傍](../../CM/CM1-01/index.md#def-cm1-01-chart)の条件である「開集合から複素空間の開集合への同相性」と、[正則アトラス](../../CM/CM1-01/index.md#def-cm1-01-atlas)の条件である「重なり上の正則な座標変換」である。[複素多様体の定義](../../CM/CM1-01/index.md#def-cm1-01-manifold)には、さらにHausdorff性と第二可算性が必要になる。

<a id="prop-kah1-06-projective-atlas"></a>

<!-- formal-statement-start -->
> **命題（標準チャートは複素アトラスを与える）**  
> 上記の商に商位相を入れる。各 $U_a$ の座標写像は $\mathbb C^n$ への同相写像であり、重なり上の座標変換とその逆は正則である。したがって標準チャートは $\mathbb{CP}^n$ の複素 $n$ 次元アトラスを定める。
<!-- formal-statement-end -->

### 証明の見取り図

比で作った座標の逆を実際に書く。チャートの重なりでは非零な分母を用いて比をもう一度取り、正則性を確かめる。商位相での連続性も代表元から確かめる。

<!-- proof-start -->
### 証明

商写像を $q:\mathbb C^{n+1}\setminus\{0\}\to\mathbb{CP}^n$ とする。$q^{-1}(U_a)=\{Z_a\ne0\}$ は開集合なので、商位相の定義から $U_a$ は開である。また、開集合への商写像の制限 $q|_{\{Z_a\ne0\}}:\{Z_a\ne0\}\to U_a$ は再び商写像である。比の写像 $Z\mapsto(Z_j/Z_a)_{j\ne a}$ は連続で、各同値類上で一定だから、$U_a$ 上の連続な座標写像 $\varphi_a$ を誘導する。

逆写像を添字の順序まで明示する。$z=(z^1,\ldots,z^n)$ から代表元 $\sigma_a(z)$ を

$$
(\sigma_a(z))_j=
\begin{cases}
z^{j+1} & (0\le j<a),\\
1 & (j=a),\\
z^j & (a<j\le n)
\end{cases}
$$

で作る。$\sigma_a$ は連続で零ベクトルを取らないので、$q\circ\sigma_a$ も連続である。さらに

$$
\varphi_a(q(\sigma_a(z)))=z,\qquad
q(\sigma_a(\varphi_a([Z])))=[Z/Z_a]=[Z]
$$

となるから、$\varphi_a$ は $\mathbb C^n$ への同相写像である。

例えば $U_0\cap U_1$ で $z^j=Z_j/Z_0$ と置くと $z^1\ne0$ であり、$U_1$ 座標は

$$
w^0=\frac1{z^1},\qquad
w^j=\frac{z^j}{z^1}\quad (j=2,\ldots,n)
$$

となる。これらは $z^1\ne0$ で正則である。逆は $z^1=1/w^0$、$z^j=w^j/w^0$ であり、同じく正則。

一般の $a\ne b$ に対しても遷移を式で確かめる。$U_a$ の同次比を $t_j=Z_j/Z_a$（$j\ne a$）、便宜上 $t_a=1$ と書く。重なりでは $t_b\ne0$ であり、$U_b$ 側の各座標は

$$
s_k=\frac{Z_k}{Z_b}=\frac{t_k}{t_b}
\qquad(k\ne b)
$$

である。分母は零にならず、成分は正則関数の商だから正則。逆方向も $s_a\ne0$ の下で $t_j=s_j/s_a$（$j\ne a$、ただし $s_b=1$）と書けるため正則である。

残る位相条件も確認する。各方向は単位球面 $S^{2n+1}\subset\mathbb C^{n+1}$ に代表元を持つので、$q$ を球面に制限した連続全射により $\mathbb{CP}^n$ はコンパクトである。$S^1=\{c\in\mathbb C:|c|=1\}$ とおく。異なる方向を表す単位ベクトル $u,v$ の円軌道 $S^1u,S^1v$ は互いに交わらないコンパクト集合だから、両者のEuclid距離の最小値 $\delta$ は正である。それぞれの軌道からの距離が $\delta/3$ 未満の球面内の集合 $V_u,V_v$ は、開かつ $S^1$ の作用で不変であり、互いに交わらない。

ここで商像が**開**である理由も必要である。$V\subset S^{2n+1}$ が開かつ $S^1$ 不変なら、

$$
q^{-1}(q(V))
=\{rw:r>0,\ w\in V\}
$$

は $\mathbb C^{n+1}\setminus\{0\}$ で開である。実際、正規化写像 $Z\mapsto Z/\lVert Z\rVert$ による $V$ の逆像である。したがって $q(V)$ は商位相で開になる。

二つの集合 $V_u,V_v$ は回転作用で不変かつ交わらないため、その商像も交わらない。よって異なる射影空間の点を開集合で分離でき、Hausdorff性が従う。

最後に、有限個の開チャート $U_a$ は各々第二可算な $\mathbb C^n$ と同相である。それぞれの可算基底を合わせれば全体の可算基底になる。[複素多様体の定義](../../CM/CM1-01/index.md#def-cm1-01-manifold)の条件は全て満たされた。$\square$
<!-- proof-end -->

$\mathbb{CP}^1$ の重なりでは単に $w=1/z$ である。ここでは**座標変換が正則であること**だけを確かめた。計量や2形式が一致することは、まだ示していない。

## 3. 対数ポテンシャルから基本形式を作る

[局所Kählerポテンシャル](../KAH1-04/index.md#def-kah1-04-local-potential)では、実関数 $\varphi$ の複素Hessianを用いて $\omega=i\partial\bar\partial\varphi$ を作った。平坦な二次関数から変更するため、今回は常に正である $S(z)=1+\sum|z^j|^2$ の対数を選ぶ。

<a id="def-kah1-06-local-fs"></a>

<!-- formal-statement-start -->
> **定義（標準チャート上の局所Fubini–Study形式）**  
> $U_a\simeq\mathbb C^n$ の標準座標を $z=(z^1,\ldots,z^n)$ と書く。実関数

$$
\varphi_{\mathrm{FS},a}(z)=\log\left(1+\sum_{j=1}^n|z^j|^2\right)
$$

> をそのチャートの局所Fubini–Studyポテンシャルとし、

$$
\omega_{\mathrm{FS},a}=i\partial\bar\partial\varphi_{\mathrm{FS},a}
$$

> を**局所Fubini–Study形式**とする。これは現時点では各チャート上の形式の定義であり、大域的な貼り合わせは主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-kah1-06-local-fs -->
**定義の確認**。$n=1$ の $U_0$ で $S=1+z\bar z$ とすると、$S>0$ なので $\log S$ は滑らかな実関数である。まず

$$
\partial_z\log S=\frac{\bar z}{S}
$$

であり、もう一度微分すると

$$
\partial_{\bar z}\frac{\bar z}{S}
=\frac{S-\bar z z}{S^2}=\frac1{S^2}.
$$

従って $\omega_{\mathrm{FS},0}=iS^{-2}dz\wedge d\bar z$ である。$dz\wedge d\bar z=-2i\,dx\wedge dy$ より

$$
\omega_{\mathrm{FS},0}=\frac{2}{(1+x^2+y^2)^2}\,dx\wedge dy.
$$

これは実2形式であり、係数が全点で正なので $J\partial_x=\partial_y$ に対して $\omega(\partial_x,J\partial_x)>0$。さらに実二次元で3形式は零だから $d\omega=0$。複素座標表示で $(1,1)$ 型であることも見える。したがってチャート上でのKähler形式の条件を直接満たす。
<!-- definition-example-end -->

正値性を高次元で確かめるには、単に対数を微分するだけでなく、得られた行列の二次形式を計算する必要がある。

## 4. 複素Hessianの全成分を求める

$S=1+\sum_k z^k\bar z^k$ では、固定した $i,j$ に対して $\partial_i S=\bar z^i$、$\partial_{\bar j}S=z^j$、$\partial_{\bar j}\bar z^i=\delta_{ij}$ である。商の微分則を適用すると

$$
\begin{aligned}
\partial_i\partial_{\bar j}\log S
&=\partial_{\bar j}\left(\frac{\bar z^i}{S}\right)\\
&=\frac{\delta_{ij}}S-\frac{\bar z^i z^j}{S^2}\\
&=\frac{S\delta_{ij}-\bar z^i z^j}{S^2}.
\end{aligned}
$$

この成分は正定値Hermite行列になるが、各対角成分が正であることだけでは $n\ge2$ の正定値性を保証しない。複素ベクトル全体で二次形式を評価する。

<a id="thm-kah1-06-fs-positive"></a>

<!-- formal-statement-start -->
> **定理（局所Fubini–Study形式の正値性）**  
> $n\ge1$ とし、$\mathbb C^n$ 上に上記の局所Fubini–Study形式を与える。そのHermite係数行列 $H(z)=(h_{i\bar j}(z))$ は

$$
h_{i\bar j}(z)=
\frac{(1+\lVert z\rVert^2)\delta_{ij}-\bar z^i z^j}
{(1+\lVert z\rVert^2)^2}
$$

> である。全ての $z$ で $H(z)$ は正定値であり、$\omega_{\mathrm{FS}}$ は閉じた実 $(1,1)$ 形式である。したがって各標準チャートにはKähler計量が定まる。
<!-- formal-statement-end -->

### 証明の見取り図

上の微分式を二次形式へ代入し、[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を適用する。正値性の計算と別に、実ポテンシャルの混合二階微分から形式の実性を、$\partial^2=\bar\partial^2=0$ から閉性を確認する。

<!-- proof-start -->
### 証明

まず $\overline{h_{i\bar j}}=h_{j\bar i}$ であるから $H$ はHermite行列。任意の $v=(v^1,\ldots,v^n)\in\mathbb C^n$ について

$$
\begin{aligned}
Q_z(v)
&=\sum_{i,j}h_{i\bar j}v^i\overline{v^j}\\
&=\frac{S\sum_i|v^i|^2-
  \sum_{i,j}\bar z^i z^j v^i\bar v^j}{S^2}\\
&=\frac{S\lVert v\rVert^2-
  \left|\sum_i\bar z^i v^i\right|^2}{S^2}.
\end{aligned}
$$

[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を $z,v\in\mathbb C^n$ に適用すると

$$
\left|\sum_i\bar z^i v^i\right|^2
\le\left(\sum_i|z^i|^2\right)
\left(\sum_i|v^i|^2\right)
=(S-1)\lVert v\rVert^2.
$$

よって

$$
Q_z(v)\ge\frac{\lVert v\rVert^2}{S^2}>0
\qquad (v\ne0).
$$

したがって[正の実 $(1,1)$ 形式のHermite行列判定](../KAH1-02/index.md#prop-kah1-02-matrix-criterion)により、局所Fubini–Study形式は正である。

ポテンシャルが実で滑らかであることから、[ポテンシャルからKähler形式が得られる命題](../KAH1-02/index.md#prop-kah1-02-potential-suffices)を適用できる。そのため、この形式は実 $(1,1)$ 型かつ閉である。次のように、外微分が零になることを計算でも確かめよう。

$$
\partial^2=\bar\partial^2=0,
\qquad
\partial\bar\partial+\bar\partial\partial=0.
$$

これを基本形式へ適用すると

$$
\partial(i\partial\bar\partial\varphi)=0,
\qquad
\bar\partial(i\partial\bar\partial\varphi)=0
$$

であり、両者の和は $d\omega_{\mathrm{FS}}=0$ を与える。複素座標は正則であるから複素構造は可積分である。$\square$
<!-- proof-end -->

実Riemann計量を求めたい場合、係数行列 $H$ をそのまま実計量成分と読んではいけない。前章の[Hermite行列から実計量を作る構成](../KAH1-05/index.md#prop-kah1-05-constant-model)と同じ点ごとの対応を使い、実接ベクトル $u,v$ に

$$
g_{\mathrm{FS}}(u,v)=2\operatorname{Re}
\sum_{i,j}h_{i\bar j}(z)\,dz^i(u)\overline{dz^j(v)}
$$

を対応させる。特に $n=1$ なら

$$
g_{\mathrm{FS}}=\frac{2}{(1+|z|^2)^2}(dx^2+dy^2).
$$

この係数 $2$ は $\omega=g(J\cdot,\cdot)$ という規約に必要である。

## 5. 半径方向と垂直方向：固有値で再検算する

二次形式の評価では正値性が一気に分かった。さらに、なぜ射影計量が方向によって縮み方を変えるかを、実際に固有値で確かめよう。$z\ne0$ に対し、複素直線 $\mathbb Cz$ に沿う方向と、標準Hermite内積で $z$ に直交する方向に分解する。ここで「直交」は $\sum_i\bar z^i v^i=0$ のことである。

<a id="prop-kah1-06-eigenvalues"></a>

<!-- formal-statement-start -->
> **命題（局所Fubini–Study行列の固有値と行列式）**  
> $n\ge1$、$S=1+\lVert z\rVert^2$ とする。上の正定値Hermite行列 $H(z)=(h_{i\bar j})$ を通常の複素行列と見たとき、$z\ne0$ では $\mathbb C\bar z$ に沿う固有値が $S^{-2}$、その直交補空間に沿う固有値が $S^{-1}$ である。後者の重複度は $n-1$。二次形式 $\sum h_{i\bar j}v^i\bar v^j$ では、対応する半径方向の変数は $\mathbb Cz$ になる。$z=0$ では $H(0)=I_n$ であり、全ての $z$ で

$$
\det H(z)=S^{-(n+1)}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二次形式が $\lVert v\rVert^2$ と内積 $\sum\bar z^iv^i$ だけに依存することから、$z$ 方向とその直交補への分解が自然に出る。両部分空間での行列作用を直接確認し、固有値を掛ける。

<!-- proof-start -->
### 証明

§4で得た係数を、通常の複素行列としてまとめ直す。$z$ を列ベクトルとし、$\bar z$ をその成分ごとの共役列とすれば、

$$
H=\frac1S I_n-\frac1{S^2}\bar z\,z^{\mathsf T},
\qquad
(Hv)^i=\frac{v^i}S-\frac{\bar z^i}{S^2}
\sum_j z^jv^j.
$$

ここで $z^{\mathsf T}\bar z=\sum_j|z^j|^2=S-1$。したがって行列作用での特別な直線は $\mathbb C\bar z$ であり、その標準Hermite直交補は $\{v:z^{\mathsf T}v=0\}$ である。一方、正値性の定義で評価した二次形式は

$$
Q_z(v)=v^{\mathsf T}H\bar v
=(\bar v)^*H(\bar v)
$$

なので、**二次形式の入力 $v$** における対応する直線は $\mathbb Cz$、直交条件は $\sum_j\bar z^jv^j=0$ となる。行列の固有ベクトルと二次形式の入力を混同してはならない。

この二つの空間に作用を制限すると、

$$
\begin{aligned}
H\bar z
&=\left(\frac1S-\frac{S-1}{S^2}\right)\bar z
=\frac1{S^2}\bar z,\\
Hv&=\frac1S v\qquad(z^{\mathsf T}v=0).
\end{aligned}
$$

$z\ne0$ では前者の次元が1、後者の次元が $n-1$ である。$z=0$ なら $S=1$ で $H(0)=I_n$。固有値の積を取ると

$$
\det H=S^{-2}(S^{-1})^{n-1}=S^{-(n+1)}
$$

となる。$n=1$ なら直交補の重複度は0で同じ結論になる。$\square$
<!-- proof-end -->

ここでの注意点は、$h_{i\bar j}$ を通常の複素行列として作用させると、二次形式 $\sum h_{i\bar j}v^i\bar v^j$ における変数の共役が関わることである。**「$z$ に沿う」と記すときは、行列作用の固有ベクトルか二次形式の変数かを明確にする**。具体計算では二次形式の分解を使えば曖昧さがない。

例えば $z=(t,0)\in\mathbb C^2$ なら

$$
H(t,0)=
\begin{pmatrix}
(1+|t|^2)^{-2}&0\\
0&(1+|t|^2)^{-1}
\end{pmatrix}.
$$

原点では両方 $1$ だが、$|t|$ が大きくなると第一方向の縮み方は第二方向より速い。いずれも正なので、有限のチャート座標で計量が退化するわけではない。

## 6. 局所計算で分かること、まだ分からないこと

各チャートで作った形式が正で閉じていても、重なりで等しいとはまだ言えない。局所ポテンシャルはそもそも一意ではなく、[差が多重調和になるという定理](../KAH1-04/index.md#thm-kah1-04-gauge)が貼り合わせの鍵になる。次章では実際に $U_0\cap U_1$ の変数変換を代入して、ポテンシャルの差を求める。

今回確定したのは、$S^{-2}$ という方向依存の正値性、$S^{-(n+1)}$ という行列式、そして実計量との係数の対応である。これらは後のFubini–Study曲率や体積の計算にも使う。

## 7. 演習：チャート・Hessian・正値性を自分でつなぐ

### Level A

<a id="ex-kah1-06-a01"></a>
#### KAH1-06-A01 射影座標と代表元
- Level: A

$\mathbb{CP}^2$ の $p=[2:2i:4]$ を $U_0,U_1,U_2$ それぞれの座標で表せ。また $[0:1:0]$ が属する標準チャートを全て挙げよ。

<!-- solution-start -->
**詳細解答**。$p$ の三成分は全て非零なので三つのチャートに入る。$U_0$ では $(Z_1/Z_0,Z_2/Z_0)=(i,2)$。$U_1$ では $(Z_0/Z_1,Z_2/Z_1)=(1/i,2/i)=(-i,-2i)$。$U_2$ では $(Z_0/Z_2,Z_1/Z_2)=(1/2,i/2)$。いずれも全成分を同じ非零数倍しても変わらない。$[0:1:0]$ は第二成分だけが非零なので $U_1$ のみに属し、座標は $(0,0)$。
<!-- solution-end -->

<a id="ex-kah1-06-a02"></a>
#### KAH1-06-A02 混合二階微分の復元
- Level: A

$\mathbb C^2$ 上の $\varphi(z)=\log(1+|z^1|^2+|z^2|^2)$ の四つの混合二階微分を求め、$H$ がHermite行列であることを確認せよ。

<!-- solution-start -->
**詳細解答**。$S=1+|z^1|^2+|z^2|^2$ とおく。$\partial_i\varphi=\bar z^i/S$ である。従って

$$
\begin{aligned}
h_{1\bar1}&=\frac{S-|z^1|^2}{S^2}
=\frac{1+|z^2|^2}{S^2},\\
h_{2\bar2}&=\frac{S-|z^2|^2}{S^2}
=\frac{1+|z^1|^2}{S^2},\\
h_{1\bar2}&=-\frac{\bar z^1z^2}{S^2},
\qquad
h_{2\bar1}=-\frac{\bar z^2z^1}{S^2}.
\end{aligned}
$$

$S$ は正の実数だから対角項は実数、$\overline{h_{1\bar2}}=h_{2\bar1}$。ゆえに $H^*=H$ である。
<!-- solution-end -->

<a id="ex-kah1-06-a03"></a>
#### KAH1-06-A03 原点と軸上の行列
- Level: A

$n=2$ の $z=(t,0)$（$t\in\mathbb C$）で $H$ を対角化し、固有値・行列式・正値性を直接求めよ。

<!-- solution-start -->
**詳細解答**。$S=1+|t|^2$ だから $h_{1\bar1}=(S-|t|^2)/S^2=S^{-2}$、$h_{2\bar2}=S/S^2=S^{-1}$、非対角成分は零。ゆえに

$$
H(t,0)=\operatorname{diag}(S^{-2},S^{-1}),
\qquad \det H=S^{-3}.
$$

$S\ge1$ で両固有値は正、行列式も正である。$t=0$ なら $H=I_2$。この計算は[一般の固有値命題](#prop-kah1-06-eigenvalues)で $n=2$ とした結果と一致する。
<!-- solution-end -->

<a id="ex-kah1-06-a04"></a>
#### KAH1-06-A04 複素次元一の実計量
- Level: A

$\varphi(z)=\log(1+|z|^2)$ から $\omega$ と実計量 $g$ を求めよ。$z=0$ における $g(\partial_x,\partial_x)$ と $\omega(\partial_x,\partial_y)$ を確認せよ。

<!-- solution-start -->
**詳細解答**。$S=1+z\bar z$ とすると $\partial_z\partial_{\bar z}\log S=S^{-2}$。また $dz\wedge d\bar z=-2i\,dx\wedge dy$ なので

$$
\omega=\frac{i}{S^2}dz\wedge d\bar z
=\frac2{S^2}dx\wedge dy.
$$

$J\partial_x=\partial_y$ で $\omega(u,v)=g(Ju,v)$ だから実計量は $g=2S^{-2}(dx^2+dy^2)$。原点で $S=1$ となり、$g(\partial_x,\partial_x)=2$、$\omega(\partial_x,\partial_y)=2=g(J\partial_x,\partial_y)$ である。
<!-- solution-end -->

### Level B

<a id="ex-kah1-06-b01"></a>
#### KAH1-06-B01 二次元の直接行列式
- Level: B

$n=2$ において $H$ の四成分だけから $\det H=S^{-3}$ を展開で導け。固有値の公式を使わず検算せよ。

<!-- solution-start -->
**詳細解答**。$a=|z^1|^2,b=|z^2|^2$ とすると $S=1+a+b$。演習A02より

$$
\begin{aligned}
\det H
&=\frac{(1+b)(1+a)-(\bar z^1z^2)(\bar z^2z^1)}{S^4}\\
&=\frac{1+a+b+ab-ab}{S^4}
=\frac S{S^4}=S^{-3}.
\end{aligned}
$$

この結果は[固有値の積](#prop-kah1-06-eigenvalues)とは独立の計算であり、指数 $n+1=3$ を確認できる。
<!-- solution-end -->

<a id="ex-kah1-06-b02"></a>
#### KAH1-06-B02 座標を伸ばしたときのHessian
- Level: B

複素直線上の正則座標変換 $w=2z$ を考える。$\psi(w)=\log(1+|w|^2)$ の引き戻し $\psi(2z)$ を $z$ で二階微分し、$i\partial\bar\partial$ による形式が写像 $f(z)=2z$ の引き戻しと一致することを確認せよ。

<!-- solution-start -->
**詳細解答**。$T(z)=1+4|z|^2$ と置く。まず $\partial_z\log T=4\bar z/T$、さらに

$$
\partial_{\bar z}\frac{4\bar z}T
=\frac4T-\frac{16|z|^2}{T^2}
=\frac{4(T-4|z|^2)}{T^2}=\frac4{T^2}.
$$

従って $i\partial\bar\partial(\psi\circ f)=4iT^{-2}dz\wedge d\bar z$。一方、$w=2z$ なら $dw=2dz$、$d\bar w=2d\bar z$、$1+|w|^2=T$ だから

$$
f^*\left(\frac i{(1+|w|^2)^2}dw\wedge d\bar w\right)
=\frac{4i}{T^2}dz\wedge d\bar z.
$$

双方が一致する。正則な座標変換では微分形式の引き戻しと混合Hessianの連鎖律が整合する。
<!-- solution-end -->

<a id="ex-kah1-06-b03"></a>
#### KAH1-06-B03 正則曲線への制限
- Level: B

$a\in\mathbb C$ とし、正則はめ込み $f:\mathbb C\to\mathbb C^2,\ f(z)=(z,az)$ を考える。$\mathbb C^2$ の局所Fubini–Study形式の引き戻しを求め、正値性と閉性を示せ。

<!-- solution-start -->
**詳細解答**。$c=1+|a|^2>0$ とおく。合成ポテンシャルは

$$
\varphi_{\mathrm{FS}}(f(z))
=\log(1+|z|^2+|az|^2)=\log(1+c|z|^2).
$$

$T=1+c|z|^2$ とすれば $\partial_z\log T=c\bar z/T$、さらに $\partial_{\bar z}(c\bar z/T)=c/T-c^2|z|^2/T^2=c/T^2$。従って

$$
f^*\omega_{\mathrm{FS}}
=\frac{ic}{(1+c|z|^2)^2}dz\wedge d\bar z.
$$

$f$ は第一成分の微分が1なので各点で単射微分。$c/T^2>0$ だから正値、ポテンシャルから構成したので閉じている。これは[正則はめ込みの引き戻し定理](../KAH1-05/index.md#thm-kah1-05-holomorphic-immersion)の直接例である。
<!-- solution-end -->

### Level C

<a id="ex-kah1-06-c01"></a>
#### KAH1-06-C01 射影型と平坦型を混ぜた全域正値性
- Level: C

実数 $a,b$ に対し、$\mathbb C^n$（$n\ge2$）上で

$$
\Phi_{a,b}(z)=a\log(1+\lVert z\rVert^2)+b\lVert z\rVert^2
$$

を考える。次を全て行え。

1. 複素Hessian $H_{a,b}(z)$ を求め、半径方向・それに直交する方向の二種類の固有値を導け。
2. $\omega_{a,b}=i\partial\bar\partial\Phi_{a,b}$ が **全ての点**でKähler形式となる $(a,b)$ の必要十分条件を求めよ。
3. $a=1,b=0$ と $a=0,b=1$ を比較し、両方が閉じていても方向ごとの係数が異なることを説明せよ。

<!-- solution-start -->
**詳細解答**。$S=1+\lVert z\rVert^2$ とする。二次関数の混合二階微分は $\partial_i\partial_{\bar j}\lVert z\rVert^2=\delta_{ij}$ だから、

$$
(H_{a,b})_{i\bar j}
=a\left(\frac{\delta_{ij}}S-\frac{\bar z^i z^j}{S^2}\right)+b\delta_{ij}.
$$

これを行列作用で計算する場合は $\bar z$ 方向とそれに直交する方向に分ける。$z\ne0$ なら [固有値の計算](#prop-kah1-06-eigenvalues)により

$$
\lambda_{\mathrm{rad}}(z)=b+\frac a{S^2},\qquad
\lambda_{\mathrm{tan}}(z)=b+\frac aS
$$

であり、後者は $n-1$ 重である。$z=0$ では共通の固有値は $a+b$。

全点で正値となる条件を調べる。$r=\lVert z\rVert\to\infty$ では両固有値が $b$ に近づくから、$b<0$ なら十分大きい $r$ で負になり不適。$b=0$ のとき二種類とも $a$ の正の倍数なので、全点で正となる条件は $a>0$。$b>0$ で $a\ge0$ なら常に正。$b>0$ かつ $a<0$ なら $S\ge1$ で $a/S^2\ge a$、$a/S\ge a$ だから全固有値が $a+b$ 以上である。原点ではちょうど $a+b$ なので、正値条件は $a+b>0$。以上をまとめると

$$
\boxed{\,b\ge0\ \text{かつ}\ a+b>0\,}
$$

が必要十分条件となる。いずれの $a,b$ でも $\Phi_{a,b}$ は滑らかな実関数なので $\omega_{a,b}$ は実 $(1,1)$ 型で閉じている。ただしKähler形式には正値性も必要であり、この条件を外した組には退化または負の方向が生じる。

$a=1,b=0$ は局所Fubini–Study模型で、半径方向が $S^{-2}$、直交方向が $S^{-1}$。$a=0,b=1$ は定数Hermite行列 $I_n$ の平坦模型で、両方向の固有値が1である。どちらも閉じた形式だが、座標に伴う変化と曲率は同じではない。
<!-- solution-end -->

## 8. 次章でつなぐもの

今回の成果は各チャートでの **局所形式の構成・正値性・閉性**である。射影空間の標準チャート間では $w=1/z$ などの非線形な正則遷移があり、二つのチャートで計算したポテンシャルが同一の関数になるわけではない。次章では差の混合微分が零になることを示し、局所形式を大域のFubini–Study形式として貼り合わせる。その後で $\mathbb{CP}^1$ の面積 $2\pi$ と規格化を直接検算する。
