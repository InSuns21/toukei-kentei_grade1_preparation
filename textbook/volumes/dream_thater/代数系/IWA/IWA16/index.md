# IWA16 円分岩澤主予想：正確な定式化

有限層の類群を計算する代わりに、IWA6では無限塔の加群を一つの特徴イデアルで記述しました。IWA15では特殊値を補間する冪級数を作りました。両者はどちらも岩澤代数の元で記述されますが、同じ環に属するだけでは等しいとはいえません。今回は、どの成分とどの冪級数を比較すると等式が成立するのかを調べます。

## 1. 算術側の成分を固定する

奇素数 $p$ に対し $K_n=\mathbb Q(\zeta_{p^{n+1}})$、$n\ge0$ とします。$K_\infty=\bigcup_nK_n$ です。[円分塔の直積分解](../IWA2/index.md#thm-iwa2-odd-splitting) により Galois 群の有限部分 $\Delta$ は位数 $p-1$、無限部分 $\Gamma$ は $\mathbb Z_p$ と同型です。$\gamma$ は根を $g=1+p$ 乗する $\Gamma$ の位相的生成元とし、$T=\gamma-1$ とします。[岩澤代数の冪級数表示](../IWA3/index.md#thm-iwa3-power-series-isomorphism) によって $\Lambda=\mathbb Z_p[[T]]$ と同一視します。

$A_n$ を $K_n$ のイデアル類群の $p$ 部分とし、ノルムを遷移写像として

$$
X=\varprojlim_n A_n
$$

と置きます。[類群逆極限のGalois表示](../IWA9/index.md#thm-iwa9-galois-inverse-limit) ではこれは $K_\infty$ 上の無分岐最大アーベル pro-$p$ 拡大の Galois 群です。作用は上の Galois 群による共役（類群表示ではイデアルに対する自然な作用）です。ここで使うのは無分岐加群であり、$p$ での分岐を許す加群とは区別します。

[指標射影子と指標成分](../IWA8/index.md#def-iwa8-character-idempotent) により、Teichmüller 指標 $\omega$ を用いて

$$
e_j=\frac1{p-1}\sum_{\delta\in\Delta}\omega(\delta)^{-j}\delta,\qquad X^{(j)}=e_jX
$$

と書きます。添字は $p-1$ を法として読みます。$X^{(j)}$ 上では $\delta$ は $\omega(\delta)^j$ 倍として作用します。例えば $p=5$ なら $j=0,1,2,3$ の4成分があり、複素共役は $\omega(-1)^j=(-1)^j$ 倍として作用するので、奇部分は $X^{(1)}\oplus X^{(3)}$ です。

円分塔の $X$ が有限生成 torsion $\Lambda$ 加群であるという Iwasawa の算術的定理を用います（[Sharifi, Iwasawa Theory, 第3章](https://www.math.ucla.edu/~sharifi/notes/iwasawa-ch03.html)）。各 $X^{(j)}$ は $\Lambda$ 線形射影の像なので、$X$ の有限個の生成元を射影すれば生成でき、各元は $X$ の元でもあるので torsion です。このため [特徴イデアルと岩澤不変量](../IWA6/index.md#def-iwa6-characteristic) が適用できます。

例えば模型加群 $\Lambda/(p)\oplus\Lambda/(T-2p)^2$ では特徴イデアルは $(p(T-2p)^2)$、$\mu=1,\lambda=2$ です。有限加群を直和しても [特徴イデアルの擬同型不変性](../IWA6/index.md#prop-iwa6-characteristic-invariance) により変わりません。特徴イデアルは加群そのものの完全な分類ではないことに注意します。

## 2. 解析側の変数を合わせる

[IWA15の岩澤冪級数表示](../IWA15/index.md#thm-iwa15-iwasawa-series) では

$$
L_p(s,\omega^i)=F_i(g^{1-s}-1)
$$

としました。一方、無分岐加群の主予想を述べる標準的な規約では $g^s-1$ を変数とします。二つの座標を交換する必要があります。

$s$ に対し $t=g^s-1$ と置くと

$$
g^{1-s}-1=\frac{g}{1+t}-1=\frac{p-t}{1+t}.
$$

この置換は $p\mathbb Z_p$ 内の値だけでなく冪級数環全体でも意味を持ちます。

<a id="prop-iwa16-reflection-substitution"></a>

<!-- formal-statement-start -->
> **命題（円分座標の反転置換）**
> 奇素数 $p$ と $g=1+p$ に対し、$\Lambda=\mathbb Z_p[[T]]$ 上の置換
>
$$
\phi(H)(T)=H\left(\frac{g}{1+T}-1\right)
$$
>
> は連続な環自己同型であり、$\phi^2=\operatorname{id}$ を満たす。さらに非零元の $\mu$ と $\lambda$ を保存する。
<!-- formal-statement-end -->

### 証明の見取り図

置換先の定数項は $p$ なので、$(p,T)$ 進位相で冪が零に近づきます。置換を2回行えば元に戻ります。法 $p$ では置換先が $T$ に単元を掛けた形になるので、最初の非零係数の次数も変わりません。

<!-- proof-start -->
### 証明

$h(T)=(p-T)/(1+T)$ と置きます。$1+T$ は単元であり、$h\in(p,T)$ です。任意の $H=\sum_{n\ge0}a_nT^n$ に対して $a_nh^n\in(p,T)^n$ ですから、完備性により和が収束します。有限多項式で成り立つ和・積の保存則は連続性によりこの極限でも成立します。

$$
1+h(T)=\frac{g}{1+T},\qquad
h(h(T))=\frac{g}{1+h(T)}-1=T.
$$

したがって逆写像も $\phi$ です。[係数付値とWeierstrass次数](../IWA6/index.md#def-iwa6-orders) に従い、非零の $H$ を $p^mH_0$ と書き、$H_0$ の係数の少なくとも一つは単元とします。法 $p$ の還元を上線で表すと

$$
\overline{H_0}=T^d v(T),\quad v(0)\ne0,\qquad
\overline h=-T/(1+T).
$$

よって $\overline{\phi(H_0)}=(-T/(1+T))^d v(-T/(1+T))$ は非零であり、その最低次数は $d$ です。$\mu(H)=m$、$\lambda(H)=d$ がともに保存されます。
<!-- proof-end -->

例えば $p=5$ で $H(T)=T-10$ とすると

$$
\phi(H)=\frac{5-T}{1+T}-10
=\frac{-5-11T}{1+T}.
$$

$-11$ と $1+T$ は単元なので、特徴イデアルの生成元としては $T+5/11$ と同じです。定数項は変化しますが、係数付値は0、法5の最低次数は1のままです。

この反転は連続部分の逆作用と円分指標による倍率 $g$ の積に対応します。具体的には $\gamma=1+T$ を $g\gamma^{-1}$ に移しています。単なる符号反転 $T\mapsto -T$ とは異なります。

## 3. 円分岩澤主予想

解析側で $i$ が奇数の場合、[p進L関数の偶奇消失](../IWA15/index.md#prop-iwa15-parity) により $F_i=0$ です。また $i=0$ のときは $TF_0$ が単元ですが $F_0$ は極を持ちます。したがって非自明な偶指標に限定して比較するのが自然です。

有限部分でも対応を決める必要があります。指標 $\chi=\omega^i$ に対して逆指標 $\chi^{-1}$ に $\omega$ を掛けると $\omega^{1-i}$ です。これが算術側の指標となります。偶数 $i$ から奇数 $1-i$ が得られ、非自明な偶指標から得られる奇指標には $\omega^1$ が含まれません。この反転と円分指標の積は反射指標とも呼ばれます。

<a id="thm-iwa16-main-conjecture"></a>

<!-- formal-statement-start -->
> **定理（円分岩澤主予想、Mazur–Wiles）**
> $p$ を奇素数、$K_\infty=\bigcup_{n\ge0}\mathbb Q(\zeta_{p^{n+1}})$ とする。
> $X$ をこの塔の $p$ 部分類群のノルム逆極限、$\omega$ を有限部分 $\Delta$ のTeichmüller指標とする。
> $\Gamma$ の生成元 $\gamma$ は根を $g=1+p$ 乗する作用で固定し、$T=\gamma-1$ とする。
> 偶数 $i$ が $2\le i\le p-3$ を満たすとき、$f_i\in\mathbb Z_p[[T]]$ を
>
$$
f_i(g^s-1)=L_p(s,\omega^i)\qquad(s\in\mathbb Z_p)
$$
>
> によって定める。ただし $L_p$ の正規化は [Kubota–Leopoldt補間公式](../IWA15/index.md#thm-iwa15-interpolation) に従う。
> このとき
>
$$
\operatorname{char}_{\Lambda} X^{(1-i)}=(f_i).
$$
<!-- formal-statement-end -->

この定理は [Sharifi, Iwasawa Theory, Introduction](https://www.math.ucla.edu/~sharifi/notes/iwasawa.html) の円分体に関する定式化を採用しています。歴史的な主予想は1984年に Mazur と Wiles が証明しました。本章ではこの深い算術定理を外部入力として使います。原証明は保型曲線のコホモロジーと Galois 表現を用いるため、これまでの環・類体論だけから証明することはできません。別経路の円分単数と Euler system は次講で扱います。

前節の [円分座標の反転置換](#prop-iwa16-reflection-substitution) を用いて前講の記法へ戻すと、

$$
f_i(T)=F_i\left(\frac{1+p}{1+T}-1\right)
$$

です。実際 $T=g^s-1$ なら右辺は $F_i(g^{1-s}-1)=L_p(s,\omega^i)$ になります。[岩澤冪級数表示の一意性](../IWA15/index.md#thm-iwa15-iwasawa-series) と同じ最低次係数の議論で、全ての $s$ における値の一致は冪級数としての一致を与えます。

したがって前講の $F_i$ をそのまま無分岐加群の特徴イデアルと比較してはいけません。一方で $(p,T)$ 進環の自己同型なので、不変量だけを比較するときには変数変換の影響を受けません。

$p=7$ なら $i=2,4$ が対象であり、$1-2\equiv5$、$1-4\equiv3\pmod6$ です。従って比較する組は $(X^{(5)},f_2)$ と $(X^{(3)},f_4)$。$X^{(1)}$ はこの定理の対象外です。$i=0$ の枝に対する $f_0$ は $T=p$ で極を持ちます。実際 $h(p)=0$ であり、$h(T)=(p-T)/(1+T)$ なので極の位置が移ります。極の除去を行った冪級数を作れることと、除去後の元が特徴イデアルを生成すると証明できることは別です。$p=3$ では指定範囲の偶数 $i$ は一つもありません。

## 4. 特徴イデアルから何を読めるか

[IWA6の特徴イデアル](../IWA6/index.md#def-iwa6-characteristic) は素因子の指数を記録します。主予想の等式があれば特殊値の補間から算術側の不変量を読めます。

<a id="cor-iwa16-invariants"></a>

<!-- formal-statement-start -->
> **系（主予想からの不変量比較）**
> [円分岩澤主予想](#thm-iwa16-main-conjecture) の仮定の下で
>
$$
\mu(X^{(1-i)})=\mu(F_i),\qquad
\lambda(X^{(1-i)})=\lambda(F_i).
$$
>
> また $F_i(0)$ が $p$ 進単元であることと $X^{(1-i)}$ が有限であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

特徴イデアルの等式から不変量の等式が従います。有限性については特徴イデアルが単元イデアルである場合の構造定理を使います。

<!-- proof-start -->
### 証明

主予想により $f_i$ は非零で、算術側の特徴イデアルの生成元です。[特徴イデアルと岩澤不変量](../IWA6/index.md#def-iwa6-characteristic) では生成元の係数付値とWeierstrass次数が加群の $\mu,\lambda$ になります。[円分座標の反転置換](#prop-iwa16-reflection-substitution) が両方を保存するので最初の等式が従います。

$F_i(0)$ が単元なら係数比較で逆級数が作れるため $F_i$ は単元です。逆に積が1なら定数項の積も1なので定数項は単元です。自己同型 $\phi$ は単元を保存するから、これは $(f_i)=\Lambda$ と同値です。

[IWA5の構造定理](../IWA5/index.md#thm-iwa5-structure) で $X^{(1-i)}$ は有限の核・余核を除いて $\Lambda/(p^{a})$ や $\Lambda/(q(T)^b)$ の有限直和になります。$a,b$ は正整数、$q$ は非定数の既約 distinguished 多項式です。特徴イデアルが単元であるときそのような非単元因子は存在せず、直和は零です。有限の核・余核だけが残るので $X^{(1-i)}$ は有限です。逆に有限加群は零加群と擬同型であり、[特徴イデアルの擬同型不変性](../IWA6/index.md#prop-iwa6-characteristic-invariance) により特徴イデアルは単元イデアルです。
<!-- proof-end -->

### 補間点で判定する

任意の $a\in p\mathbb Z_p$ に対して整数係数冪級数 $H$ の値は $H(a)\equiv H(0)\pmod p$ です。各正次数の項が $p$ の倍数であり、和も $p$ の倍数だからです。

例えば $p=5,i=2$ とし、$s=-1$ を取ります。[補間公式](../IWA15/index.md#thm-iwa15-interpolation) で $k=2$、$\omega^{i-k}=1$ なので

$$
L_5(-1,\omega^2)=-(1-5)\frac{B_2}{2}=\frac13.
$$

この値は5進単元です。$g^{1-s}-1=6^2-1=35$ は5の倍数なので $F_2(0)\equiv1/3\pmod5$。従って [不変量比較](#cor-iwa16-invariants) から $X^{(3)}$ は有限で、両不変量は0です。有限性からただちに $X^{(3)}=0$ とは結論しません。

反対に補間値が $p$ の倍数なら $F_i(0)$ も $p$ の倍数です。このとき $X^{(1-i)}$ は有限ではありません。ただし一つの値だけで $\mu>0$ なのか $\lambda>0$ なのかは判断できません。例えば $H_1=p$ と $H_2=T+p$ は $T=0$ で同じ値を取りますが、前者は $\mu=1,\lambda=0$、後者は $\mu=0,\lambda=1$ です。

実際の円分塔では [Ferrero–Washingtonのμ=0定理](../IWA7/index.md#thm-iwa7-ferrero-washington) を追加で適用できます。底体 $K_0$ は有理数体のアーベル拡大であり、今回の塔はその円分 $\mathbb Z_p$ 拡大だからです。$X$ の直和分解と特徴イデアルの積により各成分の $\mu$ も0です。主予想の等式で $\mu(F_i)=0$ となるので、定数項が非単元なら $\lambda(F_i)\ge1$ と分かります。これは主予想だけでなく、別の算術定理も用いた結論です。

## 5. 等式の証明には何が残るか

主予想の等式は、生成元の単元倍を許した等式です。二つの非零元 $a,b$ の主イデアルで $(a)\subseteq(b)$ なら $a=bc$ と書けます。逆向きの包含もあれば $b=ad$ なので $a=adc$、整域の性質から $dc=1$ です。従って両方向の整除を示すことが目標になります。なお $(a)\subseteq(b)$ は $b$ が $a$ を割ることに対応し、向きを取り違えないようにします。

次講で円分単数からどちらの整除を得るのかを扱うため、ここでは関係するもう一つの定式化を紹介します。[IWA9のS分岐アーベルpro-p拡大](../IWA9/index.md#def-iwa9-s-ramified-extension) を無限塔で考え、$p$ の上の素点以外では無分岐な最大アーベル pro-$p$ 拡大の Galois 群を $\mathfrak X$ とします。無分岐条件を緩めたので $X$ への自然な全射があります。Sharifi 第6章 Proposition 6.3.2 は非自明な偶指標 $\omega^i$ に対する等価な定式化として

$$
\operatorname{char}_\Lambda \mathfrak X^{(i)}=(F_i)
$$

を与えます。これは反射による擬同型を別に証明して得る比較であり、上記の全射だけから従うものではありません。本章で証明した変数置換はこの二つの式の解析側の対応を説明します。加群間の反射定理や円分単数の比較定理はここでは外部入力として区別し、[Sharifi 第6章](https://www.math.ucla.edu/~sharifi/notes/iwasawa-ch06.html) の定式化と照合します。

## 6. 演習と詳細解答

### Level A

<a id="ex-iwa16-a1"></a>

**A1. 指標の対応**
- Level: A
- ID: IWA16-A1

$p=11$ とする。主予想の対象となる全ての $i$ と、それぞれの $j=1-i\bmod10$ を求めよ。対象外となる奇成分も挙げよ。

<!-- solution-start -->
**詳細解答。** [円分岩澤主予想](#thm-iwa16-main-conjecture) の範囲は偶数 $2\le i\le8$ です。$i=2,4,6,8$ に対し $1-i=-1,-3,-5,-7$。10を加えるとそれぞれ $j=9,7,5,3$ です。奇数の代表は $1,3,5,7,9$ なので残るのは $j=1$。これは $i=0$ に対応するため主予想のこの定式化から除かれます。
<!-- solution-end -->

<a id="ex-iwa16-a2"></a>

**A2. 変数の交換**
- Level: A
- ID: IWA16-A2

$p=7$ とする。$s=2$ のとき、$t=g^s-1$ と $h(t)=(p-t)/(1+t)$ を有理数として計算せよ。

<!-- solution-start -->
**詳細解答。** $g=8$ なので $t=64-1=63$ です。[円分座標の反転置換](#prop-iwa16-reflection-substitution) の式に代入すると

$$
h(63)=\frac{7-63}{64}=-\frac78.
$$

他方 $g^{1-s}-1=8^{-1}-1=-7/8$ なので一致します。分母8は7と互いに素であり、両方の座標は $7\mathbb Z_7$ に入ります。
<!-- solution-end -->

<a id="ex-iwa16-a3"></a>

**A3. 単元判定**
- Level: A
- ID: IWA16-A3

$p=5$ で $H(T)=2+5T+T^2$ とする。$\phi(H)(0)$ を求め、両方の冪級数の $\mu,\lambda$ を求めよ。

<!-- solution-start -->
**詳細解答。** $h(0)=5$ なので $\phi(H)(0)=H(5)=2+25+25=52$。2も52も5の倍数ではありません。[係数付値とWeierstrass次数](../IWA6/index.md#def-iwa6-orders) では最小係数付値が0で、法5で非零になる最低次が定数項なので、どちらも $\mu=0,\lambda=0$ です。
<!-- solution-end -->

<a id="ex-iwa16-a4"></a>

**A4. 主イデアルの包含**
- Level: A
- ID: IWA16-A4

$\Lambda=\mathbb Z_5[[T]]$ とする。$(T^2)\subseteq(T)$ と $(T)\subseteq(T^2)$ のどちらが成り立つか。理由も述べよ。

<!-- solution-start -->
**詳細解答。** $T^2=T\cdot T$ なので任意の $T^2H$ は $T(TH)$ と書け、前者が成立します。後者なら $T=T^2Q$ となる $Q\in\Lambda$ が必要です。整域で $T\ne0$ なので消去して $1=TQ$ となりますが、右辺の定数項は0です。矛盾なので後者は成立しません。
<!-- solution-end -->

### Level B

<a id="ex-iwa16-b1"></a>

**B1. 反転置換と生成元**
- Level: B
- ID: IWA16-B1

$p=7$、$H(T)=7(T-14)^2$ とする。$\phi(H)$ の生成する主イデアルを単元を除いて計算し、$\mu,\lambda$ を求めよ。

<!-- solution-start -->
**詳細解答。** [円分座標の反転置換](#prop-iwa16-reflection-substitution) で $h=(7-T)/(1+T)$ を代入します。

$$
h-14=\frac{7-T-14(1+T)}{1+T}
=\frac{-7-15T}{1+T}.
$$

15と $1+T$ は7進の係数環で単元なので

$$
\phi(H)=\frac{7\cdot15^2}{(1+T)^2}(T+7/15)^2.
$$

主イデアルは $(7(T+7/15)^2)$。係数付値は1で、7を除いて法7に還元すると単元倍の $T^2$ です。よって $\mu=1,\lambda=2$ となり元の $H$ の値と一致します。
<!-- solution-end -->

<a id="ex-iwa16-b2"></a>

**B2. 極の位置**
- Level: B
- ID: IWA16-B2

自明成分について $F_0(T)=U(T)/T$、$U\in\Lambda^\times$ とする。$f_0=\phi(F_0)$ の極の位置を求め、なぜ $f_0$ を非自明偶成分の主予想へそのまま代入できないか説明せよ。

<!-- solution-start -->
**詳細解答。** [円分座標の反転置換](#prop-iwa16-reflection-substitution) は整域の自己同型なので分数体にも延長されます。

$$
f_0(T)=\frac{\phi(U)(T)(1+T)}{p-T}.
$$

分子は単元です。$T=p$ を代入しても分子の値は法 $p$ で非零なので極は消えず、分母が一次式なので単純極です。もし $f_0$ が整数係数級数なら $(p-T)f_0$ を $T=p$ で評価した値は0となって分子の非零性に反します。従って $f_0\notin\Lambda$ です。主予想の特徴イデアルの生成元は $\Lambda$ の元で、また $i=0$ は定理の指標条件にも反します。
<!-- solution-end -->

<a id="ex-iwa16-b3"></a>

**B3. 補間値から有限性を判定する**
- Level: B
- ID: IWA16-B3

$p=7,i=4$ とする。$B_4=-1/30$ を使い、$L_7(-3,\omega^4)$ を求めて $X^{(1-i)}$ の有限性を判定せよ。

<!-- solution-start -->
**詳細解答。** [補間公式](../IWA15/index.md#thm-iwa15-interpolation) に $k=4$ を入れると $\omega^{i-k}=1$、Euler因子は $1-7^3=-342$ です。

$$
L_7(-3,\omega^4)
=-(1-343)\frac{-1/30}{4}
=-\frac{57}{20}.
$$

57も20も7と互いに素なので単元です。$g^{1-s}-1=8^4-1$ は7で割り切れるため $F_4(0)$ も単元です。$1-i=-3\equiv3\pmod6$。$i=4$ は非自明偶指標なので [主予想からの不変量比較](#cor-iwa16-invariants) を適用でき、$X^{(3)}$ は有限、$\mu=\lambda=0$ です。
<!-- solution-end -->

<a id="ex-iwa16-b4"></a>

**B4. 特徴イデアルの限界**
- Level: B
- ID: IWA16-B4

$M=\Lambda/(T-p)$ と $N=M\oplus\Lambda/(p,T)$ の特徴イデアルを比較せよ。$p$ 倍写像の核を調べ、両者が同型か判定せよ。

<!-- solution-start -->
**詳細解答。** $T-p$ は一次の distinguished 多項式です。[Weierstrass除法](../IWA6/index.md#thm-iwa6-division) により任意の級数は $T-p$ で割ると定数の余りを持ち、$T=p$ で評価するとその余りが得られます。従って $M\cong\mathbb Z_p$（加法群）です。$p$ 倍写像は単射です。一方 $\Lambda/(p,T)\cong\mathbb F_p$ なので $N$ の $p$ 倍写像の核にはこの非零成分があり、$M$ と $N$ は同型ではありません。射影 $N\to M$ の核は有限、余核は零なので [特徴イデアルの擬同型不変性](../IWA6/index.md#prop-iwa6-characteristic-invariance) により両方の特徴イデアルは $(T-p)$ です。主予想の等式はこのような有限部分を記録しません。
<!-- solution-end -->

### Level C

<a id="ex-iwa16-c1"></a>

**C1. Bernoulli数の分子と岩澤不変量**
- Level: C
- ID: IWA16-C1

$p=691$ は素数であり、$B_{12}=-691/2730$ とする。$i=12$ の枝について、次を求めよ。

1. 対応する算術側の指標。
2. $L_p(-11,\omega^{12})$ の $p$ 進付値。
3. 円分岩澤主予想と Ferrero–Washington の定理を使った $\mu,\lambda$ に関する結論。
4. この1点の特殊値だけでは $\lambda$ を確定できない理由。

<!-- solution-start -->
**詳細解答。** $p-1=690$、$i=12$ は非自明偶指標なので主予想の範囲に入ります。$1-i=-11\equiv679\bmod690$。対象は $X^{(679)}$ です。

[補間公式](../IWA15/index.md#thm-iwa15-interpolation) に $k=12$ を代入します。指標は $\omega^{12-12}=1$ であり、

$$
L_p(-11,\omega^{12})
=-(1-p^{11})\frac{-p}{2730\cdot12}
=\frac{p(1-p^{11})}{32760}.
$$

$32760=2^3\cdot3^2\cdot5\cdot7\cdot13$ は $p$ と互いに素です。$1-p^{11}\equiv1\bmod p$ なので付値はちょうど1。評価点 $g^{12}-1$ は $p\mathbb Z_p$ に入るから $F_{12}(0)\equiv0\bmod p$ です。

[主予想からの不変量比較](#cor-iwa16-invariants) より $X^{(679)}$ は有限ではありません。底体はアーベル数体、その塔は円分 $\mathbb Z_p$ 拡大なので [Ferrero–Washingtonのμ=0定理](../IWA7/index.md#thm-iwa7-ferrero-washington) により $\mu(X)=0$。指標成分は直和因子で、各 $\mu$ は非負かつ和が全体の $\mu$ なので対象成分も0です。したがって $F_{12}$ の法 $p$ の還元は非零ですが定数項は0、最低非零次数は1以上です。

$$
\mu(X^{(679)})=0,\qquad\lambda(X^{(679)})\ge1.
$$

最後に $a=g^{12}-1$、$v=L_p(-11,\omega^{12})$ と置きます。模型級数 $P_1(T)=T-a+v$ と $P_2(T)=(T-a)^2+v$ はどちらも $T=a$ で $v$ を取ります。$a,v\in p\mathbb Z_p$ なので法 $p$ ではそれぞれ $T,T^2$。両方とも $\mu=0$ なのに $\lambda$ は1と2で異なります。これは1点の値と $\mu=0$ だけでは次数を決められないことを示します。
<!-- solution-end -->

## 7. まとめ

無分岐岩澤加群の奇成分は、反射指標の偶 $p$ 進L関数と結び付きます。有限部分の反射 $\omega^i\mapsto\omega^{1-i}$ と連続部分の反転 $T\mapsto (1+p)/(1+T)-1$ をともに固定して初めて特徴イデアルの等式が意味を持ちます。次講 IWA17 では、その等式を支える整除関係と円分単数・Euler system の役割を学びます。

## 参考文献

- Romyar Sharifi, [Iwasawa Theory, Introduction](https://www.math.ucla.edu/~sharifi/notes/iwasawa.html) および [Chapter 6](https://www.math.ucla.edu/~sharifi/notes/iwasawa-ch06.html)（特に6.3.1–6.3.3）。
- Lawrence C. Washington, [Introduction to Cyclotomic Fields, 2nd ed.](https://link.springer.com/book/10.1007/978-1-4612-1934-7)。
- John Coates and R. Sujatha, [Cyclotomic Fields and Zeta Values](https://link.springer.com/book/10.1007/978-3-540-33069-1)。
