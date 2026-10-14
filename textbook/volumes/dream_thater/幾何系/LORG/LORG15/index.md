# LORG15 Cauchy超曲面の定義と具体例

<!-- definition-example-audit: strict -->

## 1. 初期値の面が時空全体を覆うとは何か

[LORG13の依存領域](../LORG13/index.md#def-lorg13-dependence)では有限な初期区間の未来に、その区間を通らない過去因果曲線が入り込むことを確認しました。[LORG14の限界曲線補題](../LORG14/index.md#thm-lorg14-limit-curve)は、因果曲線の列を制御する道具です。では、初期面を十分広げれば、過去から未来へ進む**あらゆる**因果曲線が、一度だけその面を通るでしょうか。

ここで区別するのは「少なくとも一度通る」**存在**と「二度は通らない」**一意性**です。時間的曲線だけを見るのでは不十分で、光的曲線も調べる必要があります。

以下、$(M,g)$ は境界のない滑らかな連結Hausdorff・第二可算の時間向き付きLorentz多様体（次元 $n+1$、$n\ge1$、符号 $(-,+,\ldots,+)$）です。[因果曲線](../LORG3/index.md#def-lorg3-causal-curve)は未来向き区分的 $C^1$ または局所Lipschitzで、停留片を除いた非定数曲線を考えます。[過去・未来非延長性](../LORG13/index.md#def-lorg13-inextendible)を両方持つものを両側非延長といいます。非延長とは時空内で因果曲線として継ぎ足せないことであり、測地線をアフィンパラメータで延長できるかどうかとは別の条件です。

## 2. Cauchy面の定義

二次元Minkowski時空の時刻零の直線は、すべての未来向き因果曲線が過去から未来へ通り抜ける候補です。正確には無限に両側へ延長できる曲線だけを対象とします。

<a id="def-lorg15-cauchy"></a>

<!-- formal-statement-start -->
> **定義（Cauchy超曲面・Cauchy面）**  
> 時間向き付きLorentz多様体 $(M,g)$ の部分集合 $\Sigma\subset M$ が **Cauchy超曲面** であるとは、**任意の両側非延長な未来因果曲線** $\gamma:I\to M$ について、停留片を取り除いたパラメータ化で交点を表す集合
>
> $$\{s\in I:\gamma(s)\in\Sigma\}$$
>
> がちょうど一つの元を持つことをいう。光的曲線も含める。定義の段階では面の滑らかさを仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg15-cauchy -->
**定義の確認**。$M=\mathbb R^{1,1}$、$g=-dt^2+dx^2$、$\Sigma_0=\{(0,x):x\in\mathbb R\}$ とします。[LORG13の時刻零交点補題](../LORG13/index.md#lem-lorg13-intersection)の証明では、非延長曲線の時刻は過去へ $-\infty$ まで続きました。時間反転して未来へも $+\infty$ まで続きます。未来因果曲線の二時刻の位置は

$$
|x(t_2)-x(t_1)|\le t_2-t_1\qquad(t_1<t_2)
$$

を満たすので、曲線を停留片なしに時刻 $t$ で表せます。時刻の全範囲が $\mathbb R$ なので必ず $t=0$ を通ります。同じ時刻を二度取ることもできません。従って光線も含む**全因果曲線**との交点がちょうど一つです。
<!-- definition-example-end -->

「全非延長時間的曲線と一度交差する」を先に定義してから光的曲線との関係を示す文献もあります。光的部分が面に含まれる場合には、異なる交差条件を無断で置き換えられません。本講は上記の**因果曲線との一意交差**を使用します。一般のCauchy面は滑らかとは限らず、滑らかな空間的Cauchy面は特別な場合です。

## 3. 一意交差はacausal性を強制する

[LORG12のachronalとacausal](../LORG12/index.md#def-lorg12-achronal-acausal)を復習すると、achronalは時間的につながる二点がなく、acausalは異なる二点が因果的にもつながらないことでした。光線に沿う二点を同じCauchy面に置けば、光線が面に二度当たります。

<a id="prop-lorg15-acausal"></a>

<!-- formal-statement-start -->
> **命題（Cauchy面はacausalかつachronal）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ のCauchy面 $\Sigma$ は、異なる二点を因果的に結べないacausal集合であり、自己への時間的到達もないachronal集合である。
<!-- formal-statement-end -->

### 証明の見取り図

二点を結ぶ因果曲線が存在すると仮定し、それを両側へ因果的に延長して、二度の交差を作ります。閉時間的曲線なら周回させて一つの点へ二度戻すことで矛盾を作れます。

<!-- proof-start -->
### 証明

異なる $p,q\in\Sigma$ が $p\le q$ を満たすとすると、$p$ から $q$ への未来因果曲線分があります。[LORG2の局所時間的ベクトル場](../LORG2/index.md#lem-lorg2-local-timelike-field)の積分曲線を両端へ順次継ぎ足し、有限端点が時空内に残る限り延長を繰り返すと、両側非延長な未来因果曲線が得られます。この曲線は少なくとも $p$ と $q$ の二箇所で $\Sigma$ と交わるため、[Cauchyの定義](#def-lorg15-cauchy)に反します。

同一点 $p\in\Sigma$ に $p\ll p$ が成り立つ場合も、非定数の閉時間的曲線を通った後でさらに両側へ延長すれば、$p$ を異なるパラメータ時刻で二度通る両側非延長因果曲線が得られます。従って $p\ll p$ も不可能です。前者がacausal性、両者を合わせたものがachronal性です。$\square$
<!-- proof-end -->

この証明は交差の一意性を用いました。「すべての曲線と**少なくとも一度**交差する」だけでは二点の因果的結合は排除できません。

## 4. 依存領域とCauchy面の同値

[LORG13の未来・過去依存領域](../LORG13/index.md#def-lorg13-dependence)では、各点から過去側または未来側へ進むすべての非延長曲線を量化しました。これをCauchyの両側曲線と結びます。以下は特に[LORG9のcausal時空](../LORG9/index.md#def-lorg9-causal)（非定数の閉因果曲線を持たない時空）で使える基本定理です。

<a id="thm-lorg15-domain"></a>

<!-- formal-statement-start -->
> **定理（Cauchy面と全依存領域）**  
> $(M,g)$ を滑らかな時間向き付き **causal時空** とする。$\Sigma\subset M$ に関して次は同値である。
>
> 1. $\Sigma$ は[Cauchy面](#def-lorg15-cauchy)である。
> 2. $\Sigma$ は[LORG12のacausal集合](../LORG12/index.md#def-lorg12-achronal-acausal)で、[LORG13の依存領域](../LORG13/index.md#def-lorg13-dependence)が
>
> $$D(\Sigma)=D^+(\Sigma)\cup D^-(\Sigma)=M$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

(1)なら、ある点を通る非延長曲線が面に未来側で当たる場合、過去側で面に当たる別曲線は二交差を作り矛盾します。従ってその点からの**すべての未来非延長曲線**が面に当たります。(2)なら全曲線に少なくとも一つの交点があり、acausal性により二つにはなれません。

<!-- proof-start -->
### 証明

(1)を仮定します。[命題](#prop-lorg15-acausal)によりacausalです。任意の $p\in M$ を取ります。$p\in\Sigma$ なら、$p$ 自身がどの片側曲線とも交わるので $p\in D^+(\Sigma)\cap D^-(\Sigma)$ です。

$p\notin\Sigma$ の場合を調べます。まず $p$ を通る両側非延長因果曲線 $\gamma_0$ を一本選び、その唯一のCauchy面との交点が $p$ より未来にあるとします。

ここで、$p$ までの過去非延長因果曲線 $\alpha$ が $\Sigma$ に当たると仮定します。$\alpha$ に $\gamma_0$ の $p$ 以降の未来部分を連結すれば、面との交点が過去と未来に二つ存在します。これはCauchy条件に反します。従って、**$p$ までのどの過去非延長曲線も面に当たりません**。

任意の未来非延長因果曲線 $\beta$ を取り、先の $\alpha$ と $p$ で連結します。この両側非延長曲線はCauchy条件によって $\Sigma$ と交わり、過去部分には交点がないので $\beta$ の未来部分で交わります。$\beta$ は任意だから

$$
p\in D^-(\Sigma).
$$

$\gamma_0$ と $\Sigma$ の唯一の交点が $p$ より過去にある場合は、同じ連結の議論で

$$
p\in D^+(\Sigma)
$$

となります。両場合を合わせて $D(\Sigma)=M$ が得られます。

(2)を仮定します。任意の両側非延長因果曲線 $\gamma$ と $p$ を取ります。$D(\Sigma)=M$ より $p$ は少なくとも一方の依存領域に属します。前者なら過去半曲線が、後者なら未来半曲線が $\Sigma$ に当たるので、交点は存在します。異なる二交点があればその間の $\gamma$ は一方を他方へ因果的に結ぶため、acausal性に反します。さらにcausal条件で同一点を周回して再度通過することもありません。よって交点は一度だけで、Cauchy条件が成立します。$\square$
<!-- proof-end -->

**注意**：この定理はCauchy面とその依存領域の関係であって、まだ「大域双曲性とCauchy面存在」の同値を証明していません。後者には別の大域的コンパクト性が必要であり、次の講で検討します。

## 5. Minkowski因果曲線はすべての時刻を横切る

$\mathbb R^{1,n}$ に $g=-dt^2+|d\mathbf x|^2$ を置きます。未来因果曲線 $\gamma(s)=(t(s),\mathbf x(s))$ は

$$
-(t'(s))^2+|\mathbf x'(s)|^2\le0,\qquad t'(s)\ge0
$$

なので、ほとんど至る所で $|\mathbf x'(s)|\le t'(s)$ です。積分して

$$
|\mathbf x(s_2)-\mathbf x(s_1)|
\le\int_{s_1}^{s_2}|\mathbf x'(s)|\,ds
\le t(s_2)-t(s_1).
$$

停留片を除き時刻 $t$ で表示すれば、$|\mathbf x(t_2)-\mathbf x(t_1)|\le t_2-t_1$ という1-Lipschitz評価になります。

<a id="lem-lorg15-full-time"></a>

<!-- formal-statement-start -->
> **補題（Minkowskiの非延長因果曲線の全時刻通過）**  
> $n\ge1$ とする。$\mathbb R^{1,n}$ の両側非延長未来因果曲線は、時刻をパラメータとして
>
> $$\gamma(t)=(t,\mathbf x(t)),\qquad t\in\mathbb R$$
>
> と表示できる。このとき任意の $t_1<t_2$ で
>
> $$|\mathbf x(t_2)-\mathbf x(t_1)|\le t_2-t_1$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

有限の時刻で端を迎えたら、空間成分も1-Lipschitz評価により一つの極限点を持ちます。Minkowski空間には穴がないので、その極限点を足せてしまい非延長に矛盾します。

<!-- proof-start -->
### 証明

時刻表示と不等式は直前の速度積分で得ました。時刻域の下端 $a$ が有限なら、$t_k\downarrow a$ で

$$
|\mathbf x(t_k)-\mathbf x(t_m)|\le|t_k-t_m|\longrightarrow0\quad(k,m\to\infty).
$$

従って $(\mathbf x(t_k))$ はEuclid空間のCauchy列で、$\mathbf x_a\in\mathbb R^n$ に収束します。同じ評価は極限が列の選び方に依存しないことも示します。ゆえに曲線の過去端点 $(a,\mathbf x_a)\in M$ を付け足し、さらにその前に垂直な時間的線分をつなげます。過去非延長性に矛盾します。上端が有限なら未来側で同様に矛盾します。時刻域は両方向に無限なので $\mathbb R$ です。$\square$
<!-- proof-end -->

この証明は$\mathbb R^n$ の完備性を使いました。点除去時空では極限が時空に属さず、同じ推論はできません。

## 6. 傾きが一様に光速未満のグラフ

時刻一定面に限らず、空間位置 $\mathbf x$ に応じて時刻を $f(\mathbf x)$ とするグラフを考えます。全域での傾きに余裕があれば、任意の因果曲線はグラフを下から上へ一度だけ通ります。

<a id="thm-lorg15-uniform-graph"></a>

<!-- formal-statement-start -->
> **定理（Minkowskiの一様Lipschitzグラフ）**  
> $\mathbb R^{1,n}$ で、関数 $f:\mathbb R^n\to\mathbb R$ が定数 $0\le L<1$ を用いて
>
> $$|f(\mathbf x)-f(\mathbf y)|\le L|\mathbf x-\mathbf y|$$
>
> を任意の $\mathbf x,\mathbf y$ で満たすとする。このとき
>
> $$\Sigma_f=\{(f(\mathbf x),\mathbf x):\mathbf x\in\mathbb R^n\}$$
>
> はCauchy面である。$f$ の微分可能性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

非延長因果曲線 $\gamma(t)=(t,\mathbf x(t))$ に対して、面との差 $F(t)=t-f(\mathbf x(t))$ を考えます。光速以下の位置変化とグラフの傾き $L<1$ が、$F$ の狭義増加と両端での符号変化を保証します。

<!-- proof-start -->
### 証明

[全時刻補題](#lem-lorg15-full-time)から $t\in\mathbb R$ です。$t_1<t_2$ とすると

$$
\begin{aligned}
F(t_2)-F(t_1)
&=(t_2-t_1)-[f(\mathbf x(t_2))-f(\mathbf x(t_1))]\\
&\ge(t_2-t_1)-L|\mathbf x(t_2)-\mathbf x(t_1)|\\
&\ge(1-L)(t_2-t_1)>0.
\end{aligned}
$$

従って $F$ は連続かつ狭義増加です。$t>0$ なら $F(t)\ge F(0)+(1-L)t\to+\infty$。$t<0$ なら同じ評価を $t_1=t$、$t_2=0$ として使い、

$$
F(t)\le F(0)+(1-L)t\longrightarrow-\infty
$$

を得ます。中間値の定理で $F(t_*)=0$ を満たす点が存在し、狭義増加性により唯一です。等式は $t_*=f(\mathbf x(t_*))$ と同値なので $\gamma$ と $\Sigma_f$ の交点は一つです。曲線が任意なのでCauchy面です。$\square$
<!-- proof-end -->

<!-- definition-example-start: thm-lorg15-uniform-graph -->
**定理の適用確認**。二次元で $f(x)=\frac12\sin x$ とすると、平均値の定理から $|f(x)-f(y)|\le\frac12|x-y|$ です。$L=1/2$ を上の定理に代入できます。垂直線 $x=a$ とは $(\frac12\sin a,a)$ で一度だけ交差します。非垂直の光線も、上の増分評価で一括して制御しています。
<!-- definition-example-end -->

例えば $f(x)=ax+b$（$|a|<1$）は傾いたCauchy面です。また $f(x)=|x|/2$ は原点で微分できませんが、同じLipschitz条件を満たすCauchy面です。「Cauchy」と「滑らかな空間的面」は同じ定義ではありません。

## 7. 四つの非例を比べる

**有限初期区間**：$S_a=\{(0,x):|x|\le a\}$ に対し、$\gamma(t)=(t,a+1)$ は両側非延長な時間的直線ですが、$S_a$ を回避します。[有限区間の依存ダイヤモンド](../LORG13/index.md#cor-lorg13-closed-interval)が全時空に届かないことと一致します。失敗は空間的な広がりの不足です。

**一点除去**：$M_*=\mathbb R^{1,1}\setminus\{(0,0)\}$、$S_*=\{(0,x):x\ne0\}$ とすると、$\gamma(t)=(t,0)$、$0<t<\infty$ は $M_*$ 内で両側非延長です。過去極限 $(0,0)$ が時空に属さないので延長できず、$S_*$ と交差しません。失敗は曲線の端点が時空から失われたことです。

**光的グラフ**：$N=\{(x,x):x\in\mathbb R\}$ はachronalですが、光線 $\lambda(t)=(t,t)$ は像全体が $N$ に含まれ、無数のパラメータ時刻で面を通ります。また $\mu(t)=(t,t+1)$ は光線ですが $t=x$ と交わりません。一意性と存在性の両方が壊れます。[achronalとacausalの差](../LORG12/index.md#def-lorg12-achronal-acausal)が可視化された例です。

**滑らかで空間的な双曲線**：$H=\{(\sqrt{1+x^2},x):x\in\mathbb R\}$ は $f'(x)=x/\sqrt{1+x^2}$ から接ベクトル $(f'(x),1)$ のLorentz二乗が

$$
-(f'(x))^2+1=\frac{1}{1+x^2}>0
$$

なので、どの点でも空間的な滑らかな超曲面です。しかし光線 $\lambda(t)=(t,t)$ との交点条件 $t=\sqrt{1+t^2}$ は、二乗すると $t^2=1+t^2$ となり不可能です。従ってCauchyではありません。$|f'(x)|<1$ は各有限の $x$ で成立するものの、$x\to+\infty$ で $f'(x)\to1$ となり、[グラフ定理](#thm-lorg15-uniform-graph)の**全域共通の定数 $L<1$** は取れません。局所的な空間的性質だけでは無限遠の光線を捕まえられないのです。

## 8. 演習と詳細解答

<a id="ex-lorg15-a01"></a>
### LORG15-A01 時刻の平行移動
- Level: A

$\Sigma_c=\{(c,x):x\in\mathbb R\}$（$c\in\mathbb R$）が二次元Minkowski時空のCauchy面であることを示せ。

<!-- solution-start -->
**詳細解答**。[全時刻補題](#lem-lorg15-full-time)によって任意の両側非延長因果曲線を $\gamma(t)=(t,x(t))$、$t\in\mathbb R$ と書けます。$t=c$ の点 $(c,x(c))$ が必ず $\Sigma_c$ に属します。$t$ は曲線の一意の時刻表示なので $c$ を二度異なるパラメータで取ることはありません。交点はちょうど一つです。
<!-- solution-end -->

<a id="ex-lorg15-a02"></a>
### LORG15-A02 光的グラフ
- Level: A

$N=\{(x,x):x\in\mathbb R\}$ に対して一意交差と存在交差のそれぞれに反例を与えよ。

<!-- solution-start -->
**詳細解答**。$\lambda(t)=(t,t)$、$t\in\mathbb R$ は速度 $(1,1)$、Lorentz二乗 $-1+1=0$ の両側非延長光線です。全時刻で $\lambda(t)\in N$ なので一意交差に反します。$\mu(t)=(t,t+1)$ も両側非延長光線ですが、交点条件は $t=t+1$ で不可能です。従って存在交差にも反します。
<!-- solution-end -->

<a id="ex-lorg15-a03"></a>
### LORG15-A03 有限区間
- Level: A

$S=\{(0,x):|x|\le2\}$ がCauchy面でないことを示し、点 $(1,1)$ と $(1,3)$ の $D^+(S)$ への所属を判定せよ。

<!-- solution-start -->
**詳細解答**。$\gamma(t)=(t,3)$、$t\in\mathbb R$ は速度 $(1,0)$ の両側非延長時間的曲線で、時刻零で $x=3\notin[-2,2]$ を通るため面を避けます。[二次元Minkowski時空の依存領域公式](../LORG13/index.md#thm-lorg13-domain-formula)から $(T,X)$ が $D^+(S)$ に入る条件は $[X-T,X+T]\subset[-2,2]$ です。$(1,1)$ は $[0,2]$ が含まれるので所属、$(1,3)$ は $[2,4]$ が含まれないので不所属です。
<!-- solution-end -->

<a id="ex-lorg15-a04"></a>
### LORG15-A04 穴で変わる非延長性
- Level: A

原点除去時空 $M_*$ で $\gamma(t)=(t,0)$、$t>0$ が両側非延長となり、$\Sigma_*=\{(0,x):x\ne0\}$ と交わらない理由を示せ。

<!-- solution-start -->
**詳細解答**。$t\downarrow0$ で $\gamma(t)\to(0,0)$ ですが極限は $M_*$ にないため過去へ連続に延長できません。未来へは $t\to+\infty$ まで続くため未来端点もありません。時刻零の点は曲線上に一つもないので $\gamma\cap\Sigma_*=\varnothing$ です。時空全体のMinkowski空間なら原点を付け足せるため、非延長性が周囲の時空に依存することが分かります。
<!-- solution-end -->

<a id="ex-lorg15-a05"></a>
### LORG15-A05 双曲線の空間的接線
- Level: A

$f(x)=\sqrt{1+x^2}$ のグラフが滑らかで空間的だがCauchyではないことを計算せよ。

<!-- solution-start -->
**詳細解答**。$f'(x)=x/\sqrt{1+x^2}$ より $g((f'(x),1),(f'(x),1))=1-x^2/(1+x^2)=1/(1+x^2)>0$ です。従って接線は空間的です。光線 $\lambda(t)=(t,t)$ との交点があるなら $t=\sqrt{1+t^2}$、二乗して $t^2=1+t^2$ という矛盾になります。全時刻を走る光線が面を避けるのでCauchyではありません。
<!-- solution-end -->

<a id="ex-lorg15-b01"></a>
### LORG15-B01 傾いた面の判定
- Level: B

$|a|<1$、$b\in\mathbb R$ とするとき $\Sigma=\{(ax+b,x):x\in\mathbb R\}$ がCauchy面であることを証明し、垂直直線 $x=x_0$ との交点を計算せよ。

<!-- solution-start -->
**詳細解答**。$f(x)=ax+b$ について $|f(x)-f(y)|=|a||x-y|$ だから、[一様グラフ定理](#thm-lorg15-uniform-graph)へ $L=|a|<1$ を代入できます。これにより任意の両側非延長因果曲線に一度だけ交わります。垂直曲線の交点は $t=f(x_0)=ax_0+b$ なので $(ax_0+b,x_0)$ です。
<!-- solution-end -->

<a id="ex-lorg15-b02"></a>
### LORG15-B02 波打つCauchy面
- Level: B

$f(x)=\frac12\sin x$ のグラフと任意の両側非延長因果曲線との一意交差を、関数 $F(t)=t-f(x(t))$ の増分から示せ。

<!-- solution-start -->
**詳細解答**。平均値の定理で $|\sin x-\sin y|\le|x-y|$ だから $|f(x)-f(y)|\le|x-y|/2$ です。[全時刻補題](#lem-lorg15-full-time)で $|x(t_2)-x(t_1)|\le t_2-t_1$ なので

$$
F(t_2)-F(t_1)
\ge(t_2-t_1)-\frac12|x(t_2)-x(t_1)|
\ge\frac12(t_2-t_1)>0.
$$

また $F(t)\ge F(0)+t/2\to+\infty$（$t>0$）、$F(t)\le F(0)+t/2\to-\infty$（$t<0$）です。$F$ は連続なので零点を取り、厳密単調性から一つだけです。零点は $t=f(x(t))$、すなわち面との交差時刻です。
<!-- solution-end -->

<a id="ex-lorg15-b03"></a>
### LORG15-B03 依存領域の量化
- Level: B

causal時空でacausal集合 $S$ が $D(S)=M$ を満たすとする。すべての両側非延長因果曲線とちょうど一度交わることを示せ。

<!-- solution-start -->
**詳細解答**。両側非延長曲線 $\gamma$ の一点 $p$ を取ると、$D(S)=M$ により $p\in D^+(S)$ または $p\in D^-(S)$ です。前者なら $\gamma$ の過去側、後者なら未来側が必ず $S$ と交差します。従って全体は少なくとも一度交わります。二つの異なる交点 $q,r\in S$ があれば $\gamma$ に沿って $q\le r$ または $r\le q$ となり、acausal性に矛盾します。causal条件は同一点に戻る閉因果経路も禁じるので、一意です。
<!-- solution-end -->

<a id="ex-lorg15-b04"></a>
### LORG15-B04 一様条件と局所条件
- Level: B

$f(x)=\sqrt{1+x^2}$ が各点で $|f'(x)|<1$ を満たすのに、全域で $|f(x)-f(y)|\le L|x-y|$ を満たす $L<1$ が存在しないことを示せ。

<!-- solution-start -->
**詳細解答**。$f'(x)=x/\sqrt{1+x^2}$ は有限の $x$ では絶対値が1未満ですが、$x\to+\infty$ で $f'(x)\to1$ です。もし一定の $L<1$ のLipschitz評価があれば差商の極限から全 $x$ で $|f'(x)|\le L$ が必要です。十分大きな $x$ では $f'(x)>L$ になるので矛盾します。ただし一般に「この定理を使えない」ことだけから非Cauchyと断定してはいけません。本例が非Cauchyなのは光線 $\lambda(t)=(t,t)$ の非交差を別途計算できるからです。
<!-- solution-end -->

<a id="ex-lorg15-c01"></a>
### LORG15-C01 折れたCauchy面と光円錐
- Level: C

次のグラフを考える。

$$
\Sigma=\left\{\left(\frac12|x|,x\right):x\in\mathbb R\right\}.
$$

1. このグラフのCauchy性と非滑らかさを示せ。
2. 光線 $\gamma(t)=(t,t)$ と垂直線 $\eta(t)=(t,2)$ との交点をそれぞれ求めよ。
3. グラフの式を $t=|x|$ に変えたとき、Cauchy条件のどの部分が失敗するか説明せよ。

<!-- solution-start -->
**詳細解答**。(1) [逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)を絶対値に適用した $||x|-|y||\le|x-y|$ により $f(x)=|x|/2$ は $|f(x)-f(y)|\le|x-y|/2$ を満たします。[一様グラフ定理](#thm-lorg15-uniform-graph)へ $L=1/2$ を代入してCauchy性が従います。一方 $f'(x)$ は $x<0$ で $-1/2$、$x>0$ で $1/2$ なので原点で微分できません。

(2) $\gamma$ との交点条件は $t=|t|/2$ です。$t\ge0$ では $t=t/2$、$t<0$ では $t=-t/2$ で、どちらも $t=0$ 以外に解はありません。従って $(0,0)$ が唯一の交点です。$\eta$ は $x=2$ なので $t=|2|/2=1$、交点は $(1,2)$ です。

(3) $t=|x|$ 上には未来光的半直線 $\{(u,u):u\ge0\}$ が含まれます。両側非延長光線 $\gamma(t)=(t,t)$ はその半直線上の無数の点で面と交差し、一意交差が失敗します。証明の増分下界 $(1-L)(t_2-t_1)$ は $L=1$ になると零となり、狭義単調性を保証できません。
<!-- solution-end -->

## 9. 何を次の章へ渡すか

Cauchy面の**一意交差**、acausal性、依存領域との同値、Minkowski模型での判定法がそろいました。有限区間・穴・光的面・無限遠で光速に近づく面という異なる失敗機構も検証しました。次のLORG16では、この全曲線の条件と因果ダイヤモンドのコンパクト性を結ぶ大域双曲性を扱います。時間関数・滑らかな分割はさらにLORG19–20の課題です。

参考：E. Minguzzi, *Lorentzian causality theory*, Living Reviews in Relativity (2019), https://link.springer.com/article/10.1007/s41114-019-0019-x
