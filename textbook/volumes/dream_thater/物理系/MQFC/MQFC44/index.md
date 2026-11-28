# MQFC44 ゲージ対称性とBRST複体

前提講座：[MQFC37 汎関数微分と局所汎関数](../MQFC37/index.md)、[MQFC38 Peierls括弧と自由場の積](../MQFC38/index.md)、[QFT28 非可換ゲージ変換](../../QFT/QFT28/index.md)、[QFT29 ゲージ固定とBRST対称性](../../QFT/QFT29/index.md)。

場の成分を変えても同じ物理を表すことがある。量子論へ進む前に、その冗長性を代数の内部で扱いたい。QFT29ではゲージ固定作用に残る奇の変換を得た。本講では、その変換を場の多項式全体へ延ばし、二度作用させると零になる理由を追う。さらに、自由理論から非可換理論へ移ると何が変わるか、補助場が観測量の候補に新しい類を加えない理由を調べる。

## 1. 場の変換から多項式の変換へ

時空は四次元Minkowski時空、計量は $(-,+,+,+)$ とする。色添字 $a,b,c,d,e$ は $1,\dots,\dim\mathfrak{su}(N)$、時空添字は $0,\dots,3$ を走る。$N\ge2$ とし、実数の結合定数を $g$ とする。色成分の規約は [QFT28の共変微分](../../QFT/QFT28/index.md#def-qft28-covariant-derivative) と [随伴共変微分](../../QFT/QFT28/index.md#def-qft28-curvature) に合わせる。構造定数 $f^{abc}$ は完全反対称で、基底のLie括弧のJacobi恒等式を満たす。Grassmann係数を許した括弧は成分で $[u,v]^a=f^{abc}u^bv^c$ と書く。

[非可換ゲージ変換の共変性](../../QFT/QFT28/index.md#thm-qft28-gauge-covariance) の無限小版では、偶のパラメータ $\omega$ によって $A_\mu$ の変化は $\partial_\mu\omega+g[A_\mu,\omega]$ と表せる。二つの偶の変換を交換すると、一般には零にならない。パラメータを反交換する奇の変数 $c^a$（ghost）に替え、その変数自身にも変換を与えるのがBRSTの工夫である。

まず多項式の変数を整える。偶の変数は互いに可換、奇の変数は互いに反交換し、偶と奇は可換とする。特に奇変数の平方は零である。場 $A_\mu^a$ と補助場 $B^a$ のghost数は0、ghost $c^a$ は1、反ghost $\bar c^a$ は $-1$。積のghost数は和、偶奇 $|X|$ はghost数の2を法とする剰余とする。同じghost数の項を足したものを斉次元とする。

局所的な密度には微分も現れる。例えば $\partial_1 A_2^a$ を $A_2^a$ と別の形式変数と見なすと、微分を含む密度を多項式として扱える。多重添字 $I=(i_0,i_1,i_2,i_3)$ は非負整数の組、$\partial^I$ は対応する座標微分の積である（ここで上付き $I$ は計量による添字上げではない）。$e_\mu$ は第 $\mu$ 成分だけが1の多重添字とする。

<a id="def-mqfc44-jet-algebra"></a>

<!-- formal-statement-start -->
> **定義（局所場の次数付き多項式代数）**
> 四次元時空の場 $A_\mu^a,B^a,c^a,\bar c^a$ とすべての形式微分 $\partial^I$ を生成元とし、複素数上の多項式を考える。偶の生成元は可換、奇の生成元は反交換する。各微分生成元のghost数は元の場のghost数と同じとし、積では加算する。この代数を $\mathcal P=\bigoplus_n\mathcal P^n$ とする。
> 各元は有限個の生成元を含む有限和である。全微分 $\partial_\mu$ は偶の導分として、生成元 $\partial^I X$ を $\partial^{I+e_\mu}X$ へ送る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc44-jet-algebra -->
### 直接例：微分を含む三つの項

$A_1^1\partial_2c^2$ はghost数1の奇元、$\bar c^1\partial_2c^2$ はghost数0の偶元、$B^1B^2$ はghost数0の偶元である。奇元同士なので

$$
(\partial_2c^2)\bar c^1=-\bar c^1\partial_2c^2.
$$

同一の奇生成元を二つ掛ければ零になるが、$c^2\partial_2c^2$ は異なる生成元の積であり一般には零でない。全微分は

$$
\partial_1(A_1^1\partial_2c^2)
=(\partial_1 A_1^1)\partial_2c^2
+A_1^1\partial_1\partial_2c^2
$$

となる。両項ともghost数1を保つ。形式微分の添字を一つ増す規則と積の微分則で計算が閉じる。
<!-- definition-example-end -->

[局所汎関数](../MQFC37/index.md#def-mqfc37-local-functional) と同じ発想で、密度 $p\in\mathcal P$ を滑らかなコンパクト支持の試験関数 $h$ で平均し、$\int h(x)p(x)\,d^4x$ と書ける。本講の計算は密度の形式代数上で行い、必要なときだけこの積分へ線形に延ばす。まだ [自由場のスター積](../MQFC38/index.md#def-mqfc38-star) を使って量子積へ変形してはいない。

## 2. 奇の導分と二回作用の計算

既習の [非可換ゲージ理論のBRST変換](../../QFT/QFT29/index.md#def-qft29-brst) をこの代数へ移す。符号付きの積の微分則が重要で、斉次元 $X,Y$ に対して

$$
s(XY)=(sX)Y+(-1)^{|X|}X(sY).
$$

生成元への作用は次である。

$$
sA_\mu=\partial_\mu c+g[A_\mu,c],\qquad
sc=-\frac g2[c,c],
$$

$$
s\bar c=B,\qquad sB=0.
$$

微分生成元への作用は $s(\partial^I X)=\partial^I(sX)$ と定める。$A_\mu,B$ は偶、$c,\bar c$ は奇なので、すべての非零像はghost数が1だけ増え、偶奇が反転する。積の交換関係にも整合する。実際、$XY-(-1)^{|X||Y|}YX$ に $s$ を掛け、$sX,sY$ の偶奇をそれぞれ $|X|+1,|Y|+1$ として並べ直せば、$(sX)Y$ の係数は $1-1$、$X(sY)$ の係数は $(-1)^{|X|}-(-1)^{|X|}$ になる。従って生成元の順序によらず導分が定まる。

QFT29の [古典BRST変換のoff-shell冪零性](../../QFT/QFT29/index.md#thm-qft29-brst-nilpotent) は場の生成元について $s^2=0$ を与える。ここでは、その代数的機構を微分と積にまで追う。

<a id="thm-mqfc44-jet-nilpotency"></a>

<!-- formal-statement-start -->
> **定理（局所多項式上のBRST冪零性）**
> 上記の局所場の次数付き多項式代数 $\mathcal P$ にQFT29のBRST変換を、全微分と交換するghost数1の奇の導分として延ばす。構造定数がLie括弧のJacobi恒等式を満たすなら、すべての $p\in\mathcal P$ に対して

$$
s^2p=0.
$$

> 補助場は独立な生成元とし、運動方程式を課さない。
<!-- formal-statement-end -->

### 証明の見取り図

ghostの三次項はJacobi恒等式で、ゲージ場の二次変換は共変微分の積の微分則で消える。さらに奇の導分を二度作用させると積の交差項が相殺される。この最後の段階によって個々の場から任意の多項式へ結果が広がる。

<!-- proof-start -->
### 証明

斉次な色付き元について、構造定数の反対称性と係数の交換則から

$$
[u,v]=-(-1)^{|u||v|}[v,u].
$$

$c$ は奇なので $[c,c]$ は零とは限らない。$s[c,c]=[sc,c]-[c,sc]=2[sc,c]$（$sc$ は偶）となる。従って

$$
s^2c=-g[sc,c]=\frac{g^2}{2}[[c,c],c].
$$

成分で最後の括弧は $f^{ade}f^{dbc}c^bc^cc^e$ である。三つのghostの巡回置換は二回の交換だから正符号であり、

$$
3[[c,c],c]^a
=(f^{ade}f^{dbc}+f^{adb}f^{dce}
+f^{adc}f^{deb})c^bc^cc^e.
$$

括弧内は [Lie括弧のJacobi恒等式](../../../幾何系/GEO/GEO5/index.md#thm-geo5-bracket-identities) の基底成分（$[[T_b,T_c],T_e]$ とその巡回和）なので零である。

次に $D_\mu u=\partial_\mu u+g[A_\mu,u]$ と置く（[随伴共変微分](../../QFT/QFT28/index.md#def-qft28-curvature) の成分規約）。$A_\mu$ は偶である。Jacobi恒等式から $[A_\mu,[u,v]]=[[A_\mu,u],v]+[u,[A_\mu,v]]$ が成り立つので、通常の微分の積則と合わせると

$$
D_\mu[u,v]=[D_\mu u,v]+[u,D_\mu v].
$$

$c$ と $D_\mu c$ はともに奇なので $D_\mu[c,c]=2[D_\mu c,c]$。従って

$$
\begin{aligned}
s^2A_\mu&=\partial_\mu(sc)+g[sA_\mu,c]+g[A_\mu,sc]\\
&=D_\mu(sc)+g[D_\mu c,c]\\
&=-\frac g2D_\mu[c,c]+g[D_\mu c,c]=0.
\end{aligned}
$$

$s^2\bar c=sB=0$、$s^2B=0$ でもある。ここまでがQFT29の生成元上の計算である。微分生成元に対しても $s^2(\partial^I X)=\partial^I(s^2X)=0$ が従う。

最後に斉次元 $X,Y$ について、$|sX|=|X|+1$ を用いると

$$
\begin{aligned}
s^2(XY)&=(s^2X)Y+(-1)^{|X|+1}(sX)(sY)\\
&\quad+(-1)^{|X|}(sX)(sY)+X(s^2Y)\\
&=(s^2X)Y+X(s^2Y).
\end{aligned}
$$

すなわち $s^2$ は偶の導分である。定数と全生成元で零であり、単項式の因子数について帰納すれば全単項式で零、線形性により全多項式で零となる。
<!-- proof-end -->

### 例：非可換のghostと積の符号

$SU(2)$ では $f^{abc}=\varepsilon^{abc}$ なので $sc^1=-gc^2c^3$、$sc^2=-gc^3c^1$、$sc^3=-gc^1c^2$。例えば

$$
s^2c^1=g^2c^3c^1c^3-g^2c^2c^1c^2=0
$$

である。どちらも同一奇変数を二つ含む。積 $\bar c^1c^2$ では

$$
s(\bar c^1c^2)=B^1c^2+g\bar c^1c^3c^1.
$$

もう一度作用させると第一項から $-gB^1c^3c^1$、第二項から $gB^1c^3c^1-g\bar c^1s(c^3c^1)$。最後の $s(c^3c^1)$ は繰り返しghostを含んで零となる。奇の積則を普通の積則に替えると、これらの相殺は失われる。

## 3. 自由部分と非線形部分を分離する

結合定数 $g$ の次数で分ければ、自由場の段階で使える変換と非可換相互作用で加わる変換が見える。$g=0$ ではghost自身は変化せず、ゲージ場の変化は微分だけである。

<a id="def-mqfc44-brst-split"></a>

<!-- formal-statement-start -->
> **定義（BRST変換の自由・非線形分解）**
> 局所場の次数付き多項式代数において、全微分と交換するghost数1の奇の導分 $s_0,s_1$ を生成元上で次のように定める。

$$
\begin{array}{c|cccc}
 &A_\mu&c&\bar c&B\\ \hline
s_0&\partial_\mu c&0&B&0\\
s_1&[A_\mu,c]&-[c,c]/2&0&0
\end{array}
$$

> 古典BRST変換は $s=s_0+gs_1$ と表される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc44-brst-split -->
### 直接例：一つの微分項

$SU(2)$ で $p=\partial_1A_2^1$ を取ると、定義と全微分の積則から

$$
s_0p=\partial_1\partial_2c^1,
$$

$$
s_1p=(\partial_1 A_2^2)c^3+A_2^2\partial_1c^3
-(\partial_1 A_2^3)c^2-A_2^3\partial_1c^2.
$$

各項はghost数1であり、$s_0p+gs_1p$ は実際に $\partial_1(sA_2^1)$ に一致する。$s_0,s_1$ の反交換する積則は第2節と同じ交換関係の確認で全多項式に延びる。
<!-- definition-example-end -->

<a id="prop-mqfc44-split-relations"></a>

<!-- formal-statement-start -->
> **命題（BRST自由部分と非線形部分の反交換関係）**
> 上記の自由・非線形分解で、構造定数がJacobi恒等式を満たすとき、局所場の多項式上で

$$
s_0^2=0,\qquad s_0s_1+s_1s_0=0,\qquad s_1^2=0
$$

> が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[局所多項式上のBRST冪零性](#thm-mqfc44-jet-nilpotency) は任意の実数 $g$ に対して成立する。固定した $p$ に対して展開すると

$$
0=s^2p=s_0^2p+g(s_0s_1+s_1s_0)p+g^2s_1^2p.
$$

$g=0$ より $s_0^2p=0$。$g=1,-1$ を代入した二式の和と差を取ると

$$
2s_1^2p=0,\qquad 2(s_0s_1+s_1s_0)p=0.
$$

係数体は複素数なので2で割ることができる。任意の $p$ について成立するから三つの作用素の等式を得る。
<!-- proof-end -->

例えばゲージ場上の混合項は $s_0s_1A_\mu=[\partial_\mu c,c]$ と $s_1s_0A_\mu=-\partial_\mu[c,c]/2$ で、互いに逆符号である。自由部分だけを残して $sA_\mu=D_\mu c$ としながら $sc=0$ と変更すると $s^2A_\mu=g[D_\mu c,c]$ が残る。一般に零ではない。非線形項を一方だけ落とせない理由である。

## 4. 閉じた量と同じ類を表す量

ここで [BRSTコホモロジー](../../QFT/QFT29/index.md#def-qft29-brst-cohomology) を密度の多項式へ適用する。次数 $n$ の閉じた元は $sp=0$ を満たす元、完全な元はある $q\in\mathcal P^{n-1}$ について $p=sq$ と書ける元である。冪零性のため完全な元は必ず閉じる。二つの閉じた元の差が完全なら同じ類を表す。

$$
H^n(s,\mathcal P)=
\frac{\ker(s:\mathcal P^n\to\mathcal P^{n+1})}
{\operatorname{im}(s:\mathcal P^{n-1}\to\mathcal P^n)}.
$$

例えば $sB^a=0$ かつ $B^a=s\bar c^a$ なので $B^a$ は零の類である。これだけでは $B$ を含む任意の閉じた多項式について何も言えない。補助場のすべての微分を含めて取り除く方法を考える。

反ghostと補助場の微分生成元をそれぞれ $u_i,v_i$ と書く。$i$ は色と多重添字の組であり、$su_i=v_i$、$sv_i=0$。$u_i$ は奇・ghost数 $-1$、$v_i$ は偶・ghost数0である。この二つを組として戻す作用素を作る。

<a id="thm-mqfc44-doublet-contraction"></a>

<!-- formal-statement-start -->
> **定理（BRST二重項の縮約）**
> 局所場の次数付き多項式代数 $\mathcal P$ の反ghost・補助場の全微分生成元を $u_i,v_i$ とする。BRST変換が $su_i=v_i,sv_i=0$ を満たし、残る生成元の像が $u_i,v_i$ を含まないとする。
> 残る生成元だけの部分代数を $\mathcal P_{\rm min}$ とすると、その包含は全次数で同型

$$
H^n(s,\mathcal P_{\rm min})\longrightarrow H^n(s,\mathcal P)
$$

> を誘導する。これは有限多項式の代数上の主張である。
<!-- formal-statement-end -->

### 証明の見取り図

二重項を一つ含むごとに1を足す作用素を作る。この作用素を $s$ と、$v$ を $u$ に戻す奇の作用素の和の形に書ければ、二重項を含む閉じた多項式はその個数で割ることで完全と判定できる。

<!-- proof-start -->
### 証明

$k$ をghost数 $-1$ の奇の導分とし、$kv_i=u_i$、$ku_i=0$、他の生成元で零と定める。第2節と同じ符号付き積則で延長できる。$N$ は二重項の生成元の個数を重複込みで数える偶の導分、すなわち $Nu_i=u_i,Nv_i=v_i$、他の生成元で零とする。

$s,k$ はともに奇なので、積に $sk+ks$ を作用させると

$$
\begin{aligned}
sk(XY)&=(skX)Y+(-1)^{|X|+1}(kX)sY\\
&\quad+(-1)^{|X|}(sX)kY+X(skY),\\
ks(XY)&=(ksX)Y+(-1)^{|X|+1}(sX)kY\\
&\quad+(-1)^{|X|}(kX)sY+X(ksY).
\end{aligned}
$$

和では中間の四項が相殺し、$sk+ks$ は偶の導分となる。生成元上で $(sk+ks)u_i=kv_i=u_i$、$(sk+ks)v_i=su_i=v_i$、他の生成元では仮定によって零である。よって

$$
sk+ks=N.
$$

$s$ は二重項の個数を保つ。実際、$u_i$ を $v_i$ に替えても個数は同じであり、残る生成元の像には二重項がない。閉じた多項式 $p$ を個数 $m$ ごとの有限和 $p=\sum_{m\ge0}p_m$ に分解すると $sp_m=0$、$Np_m=mp_m$。$m>0$ なら

$$
mp_m=(sk+ks)p_m=s(kp_m),
$$

$$
p_m=s\left(\frac{kp_m}{m}\right).
$$

従って $p$ と $p_0$ は同じ類を表す。これは包含の誘導写像の全射性である。逆に $p_0\in\mathcal P_{\rm min}$ が全代数で $p_0=sq$ と書けるなら、$q$ の二重項個数0の部分を $q_0$ として $p_0=sq_0$。従って部分代数ですでに零の類であり、単射性も従う。
<!-- proof-end -->

### 例：補助場の二乗

$p=(B^1)^2$ では $Np=2p$、$kp=2\bar c^1B^1$。$sp=0$ なので、実際に

$$
s(\bar c^1B^1)=(B^1)^2.
$$

$B$ の二乗を単に捨てるのではなく、元の類を変えない完全項であることが確かめられた。$\mathcal P_{\rm min}$ のghost数は非負であるから、そこでghost数0の完全元は零に限られる。よってこの設定では、$A$ とその微分だけから作られた閉じた非零密度は非零の類を与える。

## 5. 曲率の多項式を観測量の候補にする

[Yang–Mills曲率と随伴共変微分](../../QFT/QFT28/index.md#def-qft28-curvature) の成分規約で

$$
F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu
+g[A_\mu,A_\nu].
$$

$F$ は偶でghost数0である。自由理論では最後の項が消え、$s_0$ を作用させると混合微分の交換により零になる。相互作用がある場合には曲率自体が不変なのではなく、色成分が混ざる。色について縮約した密度なら閉じる可能性がある。

<a id="prop-mqfc44-curvature-class"></a>

<!-- formal-statement-start -->
> **命題（曲率二次密度のBRST類）**
> 上記の局所場の多項式代数とBRST変換に対して、曲率の変換は

$$
sF_{\mu\nu}=g[F_{\mu\nu},c]
$$

> である。固定した $\mu<\nu$ に対する色縮約 $p=\sum_a(F_{\mu\nu}^a)^2$ はghost数0で閉じており、非零のコホモロジー類を表す。時空添字はここでは縮約しない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

曲率の定義に $s$ を掛ける。$A_\mu$ は偶なので

$$
sF_{\mu\nu}=D_\mu(sA_\nu)-D_\nu(sA_\mu)
=(D_\mu D_\nu-D_\nu D_\mu)c.
$$

二重の共変微分を展開すると、混合偏微分と $\partial A$ 以外の一階微分項が相殺され、

$$
\begin{aligned}
[D_\mu,D_\nu]c
&=g[\partial_\mu A_\nu-\partial_\nu A_\mu,c]\\
&\quad+g^2([A_\mu,[A_\nu,c]]-[A_\nu,[A_\mu,c]])\\
&=g[\partial_\mu A_\nu-\partial_\nu A_\mu+g[A_\mu,A_\nu],c].
\end{aligned}
$$

最後の行はJacobi恒等式を適用した。これは [曲率の共変変換](../../QFT/QFT28/index.md#thm-qft28-curvature-bianchi) の無限小版に対応する。

従って

$$
sp=2g\sum_{a,b,c} f^{abc}F_{\mu\nu}^aF_{\mu\nu}^b c^c=0.
$$

ここで和の添字 $c$ は色添字であり、$F^aF^b$ は対称、$f^{abc}$ は $a,b$ に関して反対称なので相殺する。$p$ は二重項を含まない非零多項式である（例えば一点で $A=0$、$\partial_\mu A_\nu^1=1$、他の微分を零とすると $p=1$）。[BRST二重項の縮約](#thm-mqfc44-doublet-contraction) により、もし完全なら $\mathcal P_{\rm min}$ 内で完全である。しかし同代数にはghost数 $-1$ の非零元がない。従って $p$ は非零の類を表す。
<!-- proof-end -->

この結論は運動方程式で割っていない密度の多項式代数についてのものである。積分した密度を全微分で同一視する場合や、運動方程式を課した場合には商が変わる。さらに量子積や量子BRST電荷を構成したわけではないため、物理的内積の正値性・非摂動的質量ギャップは別問題である。

## 6. 演習

### 演習 MQFC44-A1：ghost数と交換
- Level: A

$p=\bar c^1 A_0^2\partial_1 c^3$、$q=c^3\partial_1c^3$ のghost数、偶奇を求めよ。$q=0$ と言えるか。また $\bar c^1$ と $\partial_1c^3$ の順序を入れ替えよ。

<!-- solution-start -->
**詳細解答**

[局所場の次数付き多項式代数](#def-mqfc44-jet-algebra) よりghost数は $p$ が $-1+0+1=0$、$q$ が $1+1=2$、いずれも偶である。$c^3$ と $\partial_1c^3$ は異なる奇生成元なので $q$ は零とは限らない。$A$ は偶であるから

$$
p=-A_0^2(\partial_1c^3)\bar c^1.
$$

奇同士の交換に一つの負号が付く。
<!-- solution-end -->

### 演習 MQFC44-A2：自由曲率
- Level: A

$g=0$ とし、$f_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu$ と置く。$s_0 f_{\mu\nu}$ と $s_0(\bar c^a f_{\mu\nu}^a)$ を求めよ（色 $a$ は固定）。

<!-- solution-start -->
**詳細解答**

[BRST変換の自由・非線形分解](#def-mqfc44-brst-split) より $s_0A_\nu=\partial_\nu c$。全微分と交換するので

$$
s_0f_{\mu\nu}=\partial_\mu\partial_\nu c-\partial_\nu\partial_\mu c=0.
$$

$\bar c^a$ は奇なので

$$
s_0(\bar c^a f_{\mu\nu}^a)
=B^af_{\mu\nu}^a-\bar c^as_0f_{\mu\nu}^a=B^af_{\mu\nu}^a.
$$

従って右辺は完全である。
<!-- solution-end -->

### 演習 MQFC44-A3：SU(2)のghost
- Level: A

$sc^1=-gc^2c^3$、$sc^2=-gc^3c^1$、$sc^3=-gc^1c^2$ のとき $s^2c^2$ を積則から計算せよ。

<!-- solution-start -->
**詳細解答**

$c^3$ は奇なので

$$
\begin{aligned}
s^2c^2&=-g((sc^3)c^1-c^3sc^1)\\
&=g^2c^1c^2c^1-g^2c^3c^2c^3\\
&=-g^2(c^1)^2c^2+g^2(c^3)^2c^2=0.
\end{aligned}
$$

奇生成元の平方が零になる。二回作用させると零という結果は、一般のLie環では [局所多項式上のBRST冪零性](#thm-mqfc44-jet-nilpotency) のJacobi恒等式の計算で得られる。
<!-- solution-end -->

### 演習 MQFC44-A4：微分した補助場
- Level: A

$p=(\partial_1B^1)B^2$ のghost数を求め、$p=sq$ となるghost数 $-1$ の多項式 $q$ を一つ構成せよ。

<!-- solution-start -->
**詳細解答**

$p$ の二つの因子はともにghost数0なので $\operatorname{gh}(p)=0$。$q=(\partial_1\bar c^1)B^2$ と置く。ghost数は $-1+0=-1$ で、

$$
sq=(\partial_1B^1)B^2-(\partial_1\bar c^1)sB^2=p.
$$

全微分とBRST変換が交換すること、$sB^2=0$ を用いた。従って $p$ は零の類である。
<!-- solution-end -->

### 演習 MQFC44-B1：混合項の相殺
- Level: B

[BRST変換の自由・非線形分解](#def-mqfc44-brst-split) の $s_0s_1+s_1s_0$ が $A_\mu,c,\bar c,B$ の各生成元上で零になることを、結合定数の多項式比較を使わずに証明せよ。

<!-- solution-start -->
**詳細解答**

$A_\mu$ は偶であるから

$$
s_0s_1A_\mu=[s_0A_\mu,c]+[A_\mu,s_0c]
=[\partial_\mu c,c].
$$

一方、

$$
s_1s_0A_\mu=\partial_\mu(s_1c)
=-\frac12\partial_\mu[c,c].
$$

$\partial_\mu$ は偶、$c,\partial_\mu c$ は奇である。従って

$$
\partial_\mu[c,c]=[\partial_\mu c,c]+[c,\partial_\mu c]
=2[\partial_\mu c,c].
$$

和は零。$s_0s_1c=-s_0[c,c]/2=0$ は $s_0c=0$ から、$s_1s_0c=0$ も直接従う。反ghostについては $s_0s_1\bar c=0$、$s_1s_0\bar c=s_1B=0$。補助場では両者とも零。これで [反交換関係](#prop-mqfc44-split-relations) の混合部分を生成元で確認できた。
<!-- solution-end -->

### 演習 MQFC44-B2：奇の符号を落とした場合
- Level: B

$g=0$ とし、$X=\bar c^1$、$Y=A_0^2$ を取る。正しい積則で $s_0^2(XY)=0$ を確認せよ。両方の段階で通常の符号なし積則を使ったとき、どんな項が残るか。

<!-- solution-start -->
**詳細解答**

正しい積則では

$$
s_0(XY)=B^1 A_0^2-\bar c^1\partial_0 c^2.
$$

二回目の作用で第一項から $B^1\partial_0c^2$、第二項から $-B^1\partial_0c^2$ が出る。$s_0B=s_0c=0$ なので和は零である。

符号なし積則をこの順序の式に誤って用いると、一回目は $B^1A_0^2+\bar c^1\partial_0c^2$、二回目は $2B^1\partial_0c^2$ となる。この元は一般には零でない。実際には符号なしの作用は奇生成元の交換関係にも整合しないため、代数上の写像として定義できない。[局所多項式上のBRST冪零性](#thm-mqfc44-jet-nilpotency) の交差項の相殺には奇の積則が必要である。
<!-- solution-end -->

### 演習 MQFC44-B3：二重項の個数
- Level: B

二重項 $u_i,v_i$ のうち $i=1,2$ について $p=v_1^2v_2$ を取る。[BRST二重項の縮約](#thm-mqfc44-doublet-contraction) の作用素 $k,N$ を用い、完全性を直接確かめよ。

<!-- solution-start -->
**詳細解答**

$v_i$ は偶なので $sp=0$、$Np=3p$。$kv_i=u_i$ より

$$
kp=2u_1v_1v_2+v_1^2u_2.
$$

$s$ を作用させると第一項から $2v_1^2v_2$、第二項から $v_1^2v_2$。$sv_i=0$ なので他の項は零。従って $s(kp)=3p$ であり、

$$
p=s\left(\frac{2u_1v_1v_2+v_1^2u_2}{3}\right).
$$

分母3は二重項生成元の個数であって、ghost数ではない。
<!-- solution-end -->

### 演習 MQFC44-B4：補助場を消去する危険
- Level: B

自由理論で $\xi>0$ とし、独立な補助場を $B^a=-\partial^\mu A_\mu^a/\xi$ に置き換える。残った変換 $s_0\bar c^a=-\partial^\mu A_\mu^a/\xi$、$s_0A_\mu^a=\partial_\mu c^a$、$s_0c^a=0$ の二回作用を反ghostについて計算せよ。

<!-- solution-start -->
**詳細解答**

計量 $(-,+,+,+)$ のもとで $\partial^\mu=\eta^{\mu\nu}\partial_\nu$。従って

$$
s_0^2\bar c^a=-\frac1\xi\partial^\mu\partial_\mu c^a
=-\frac1\xi(-\partial_0^2+\partial_1^2+\partial_2^2+\partial_3^2)c^a.
$$

例えば $\partial_1^2 c^a$ は自由な形式生成元であり、他の二階微分を零に選んでもこの項が残り得る。従って運動方程式を課さない代数では零ではない。QFT29の [古典BRST変換のoff-shell冪零性](../../QFT/QFT29/index.md#thm-qft29-brst-nilpotent) では $B$ が独立で $s_0B=0$ だったことが重要である。
<!-- solution-end -->

### 演習 MQFC44-C1：非零の類と完全項を区別する
- Level: C

$SU(2)$ と固定した時空添字 $1,2$ に対し $P=\sum_a(F_{12}^a)^2$ とする。$R=P+(B^1)^2+(\partial_1B^2)B^1$ と置く。

(1) $sP$ を色成分で計算せよ。

(2) $R-P=sQ$ となるghost数 $-1$ の密度 $Q$ を構成せよ。

(3) $R$ が非零の類を表すことを、補助場を含まない部分代数と一点での形式微分の値を使って示せ。さらに、量子物理状態の存在をこの結果から結論できるか述べよ。

<!-- solution-start -->
**詳細解答**

(1) [曲率二次密度のBRST類](#prop-mqfc44-curvature-class) の変換則に $f^{abc}=\varepsilon^{abc}$ を代入する。$F^a=F_{12}^a$ と略記すれば

$$
sF^1=g(F^2c^3-F^3c^2),\quad
sF^2=g(F^3c^1-F^1c^3),
$$

$$
sF^3=g(F^1c^2-F^2c^1).
$$

$F^a$ は偶なので

$$
\begin{aligned}
sP/(2)&=g(F^1F^2c^3-F^1F^3c^2\\
&\quad+F^2F^3c^1-F^2F^1c^3\\
&\quad+F^3F^1c^2-F^3F^2c^1)=0.
\end{aligned}
$$

各ghostの係数が可換性により相殺する。

(2) $Q=\bar c^1B^1+(\partial_1\bar c^2)B^1$ と置く。ghost数は両項とも $-1$ である。$sB^1=0$ なので

$$
sQ=(B^1)^2+(\partial_1B^2)B^1=R-P.
$$

従って $R$ も閉じており、$P$ と同じ類を表す。

(3) $P$ が完全だと仮定する。[BRST二重項の縮約](#thm-mqfc44-doublet-contraction) の単射性により、二重項を含まない部分代数で $P=sq_0$ と書けるはずである。しかしそこにはghost数 $-1$ の非零元がなく、右辺は零でなければならない。一方、一点で $A=0$、$\partial_1A_2^1=2$、他の微分成分をすべて零と選べば $F_{12}^1=2,F_{12}^2=F_{12}^3=0$、$P=4$ である。よって $P$ は零多項式ではない。矛盾から $P$ と $R$ の類は非零である。

ただし計算対象は運動方程式を課さない古典密度の形式代数である。量子BRST電荷、状態空間、正定値内積、異常の不在は構成していないので、量子物理状態の存在は結論できない。
<!-- solution-end -->

## 7. 次の講義へ

- 生成元での冪零性は奇の積則によって全多項式へ延びる。
- 自由部分と非線形部分はそれぞれ二回作用で零となり、互いに反交換する。
- 反ghostと補助場の二重項は局所多項式のコホモロジーに新しい類を加えない。

次は運動方程式も代数の内部へ取り込むため、場とは異なる次数を持つ変数とBV形式を導入する。本講の密度の代数と、運動方程式を含む複体との差を意識して進もう。

## 参考文献

- K. Rejzner, *Perturbative Algebraic Quantum Field Theory*, Springer, 2016（古典BV形式と形式的量子化）。
- M. Henneaux and C. Teitelboim, *Quantization of Gauge Systems*, Princeton University Press, 1992（ゲージ対称性とBRSTの代数）。
