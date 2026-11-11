# CAT3-06 Kan拡張の普遍性

## 1. 関手の情報を別の添字圏へ運ぶ

[随伴](../CAT2-08/index.md#def-cat2-08-adjunction)は、異なる圏の射を自然に対応させる道具だった。今度は**図式そのもの**を別の添字圏へ移したい。

例えば矢印 $0\to1$ だけを持つ圏 $\mathbf 2$ と、一対象一射の圏 $\mathbf 1$ を考える。関手 $K:\mathbf1\to\mathbf2$ が $0$ を選ぶとする。集合 $X$ を $\mathbf1$ 上の図式と見ると、$\mathbf2$ 上への延長には $X\xrightarrow{1_X}X$ も $X\to\{*\}$ もあり、単に「$0$ で $X$ と一致する」だけでは選べない。

そこで任意の別の図式への射を、もとの $X$ からの射と**一意に対応させる**延長を求める。この普遍的な延長が Kan 拡張である。左右の拡張は「延長から他へ射を出す」か「他から延長へ射を入れる」かで区別する。

以下、$\mathcal A,\mathcal B$ を**小さい圏**、$\mathcal C$ を**局所小圏**、$K:\mathcal A\to\mathcal B$ を関手とする。[関手圏の局所小性](../CAT1-08/index.md#prop-cat1-08-size)により、$[\mathcal A,\mathcal C]$ と $[\mathcal B,\mathcal C]$ の自然変換はそれぞれ集合をなす。$\operatorname{Nat}(F,G)$ は自然変換の集合、$\beta\cdot\alpha$ は先に $\alpha$、次に $\beta$ を適用する合成を表す。$\mathcal C$ に極限・余極限の存在は今は要求しない。

## 2. まず前合成を関手にする

$H:\mathcal B\to\mathcal C$ を $K$ に沿って「見る範囲を狭める」と、合成関手 $HK=H\circ K:\mathcal A\to\mathcal C$ になる。自然変換 $\theta:H\Rightarrow H'$ も $K$ に沿って前合成でき、$\theta K:HK\Rightarrow H'K$ の $a$ 成分を $(\theta K)_a=\theta_{K(a)}$ とする。これは[whiskering](../CAT1-08/index.md#def-cat1-08-whiskering)の特別な場合である。

<a id="def-cat3-06-precomposition"></a>

<!-- formal-statement-start -->
> **定義（前合成関手）**
> 小さい圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$、関手 $K:\mathcal A\to\mathcal B$ に対し、**前合成関手** $K^*$ を、対象 $H:\mathcal B\to\mathcal C$ と射 $\theta:H\Rightarrow H'$ に対して

$$
K^*:[\mathcal B,\mathcal C]\longrightarrow[\mathcal A,\mathcal C],
\qquad K^*H=HK,\qquad (K^*\theta)_a=\theta_{Ka}
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-06-precomposition -->
**定義の確認**。上記の $K:\mathbf1\to\mathbf2$ が $0$ を選ぶとき、$H=(Y_0\xrightarrow{h}Y_1)$ に対して $K^*H=Y_0$ となる。射 $\theta=(u_0,u_1):H\Rightarrow H'$ は $h'u_0=u_1h$ を満たす可換四角形であり、$K^*\theta=u_0$ である。$1_H$ の $0$ 成分は $1_{Y_0}$、合成 $(v\cdot u)_0=v_0u_0$ だから、恒等射と合成の保存も成分から確認できる。
<!-- definition-example-end -->

一般にも $\theta$ の自然性を $Ka\xrightarrow{Kf}Ka'$ に適用すると

$$
H'(Kf)\theta_{Ka}=\theta_{Ka'}H(Kf)
$$

であり、$K^*\theta$ は自然変換である。恒等射の成分は $1_{H(Ka)}$、合成の成分は $(\psi\cdot\theta)_{Ka}=\psi_{Ka}\theta_{Ka}$ なので $K^*$ は関手の公理を満たす。

## 3. 左右の Kan 拡張を定義する

固定した $F:\mathcal A\to\mathcal C$ に対し、$\mathcal B$ 上の図式 $L$ と $\eta:F\Rightarrow LK$ を用意する。$\eta$ は「$F$ を $L$ に写し込む比較」と考える。任意の $H:\mathcal B\to\mathcal C$ と $\alpha:F\Rightarrow HK$ が与えられたとき、$\alpha$ がただ一つの $\theta:L\Rightarrow H$ を経由できれば、$L$ は出発点として普遍的である。

<a id="def-cat3-06-left-kan"></a>

<!-- formal-statement-start -->
> **定義（左Kan拡張）**
> 小さい圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$、関手 $K:\mathcal A\to\mathcal B$、$F:\mathcal A\to\mathcal C$ を取る。関手 $L:\mathcal B\to\mathcal C$ と自然変換 $\eta:F\Rightarrow LK$ の組 $(L,\eta)$ が **$F$ の $K$ に沿う左Kan拡張**であるとは、任意の $H:\mathcal B\to\mathcal C$ と $\alpha:F\Rightarrow HK$ に対して、唯一の $\theta:L\Rightarrow H$ が存在し

$$
\alpha=(\theta K)\cdot\eta
$$

> を満たすことをいう。存在するとき $L=\operatorname{Lan}_K F$ と書く（この記号だけで選んだ $\eta$ を忘れない）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-06-left-kan -->
**定義の確認**（恒等関手）。$K=1_{\mathcal A}$、$L=F$、$\eta=1_F$ とする。$H$ と $\alpha:F\Rightarrow H$ が任意なら $\alpha=\theta\cdot1_F$ を満たす $\theta$ は $\alpha$ だけである。従って $(F,1_F)$ は左Kan拡張であり、単なる対象の等号ではなく**全自然変換の一意な分解**を確認した。
<!-- definition-example-end -->

逆向きの比較 $RK\Rightarrow F$ を取れば、他の図式から $R$ への射が一意に定まるという双対の問いが立つ。

<a id="def-cat3-06-right-kan"></a>

<!-- formal-statement-start -->
> **定義（右Kan拡張）**
> 小さい圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$、関手 $K:\mathcal A\to\mathcal B$、$F:\mathcal A\to\mathcal C$ を取る。関手 $R:\mathcal B\to\mathcal C$ と自然変換 $\varepsilon:RK\Rightarrow F$ の組 $(R,\varepsilon)$ が **$F$ の $K$ に沿う右Kan拡張**であるとは、任意の $H:\mathcal B\to\mathcal C$ と $\beta:HK\Rightarrow F$ に対して、唯一の $\phi:H\Rightarrow R$ が存在し

$$
\beta=\varepsilon\cdot(\phi K)
$$

> を満たすことをいう。存在するとき $R=\operatorname{Ran}_K F$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-06-right-kan -->
**定義の確認**（恒等関手）。$K=1_{\mathcal A}$、$R=F$、$\varepsilon=1_F$ とする。$\beta:H\Rightarrow F$ に対して $1_F\cdot\phi=\beta$ を満たす唯一の $\phi$ は $\beta$ 自身である。従って $(F,1_F)$ は右Kan拡張でもある。左とは $\eta$ と $\varepsilon$ の向きが逆である。
<!-- definition-example-end -->

左右とも、$L$ や $R$ が存在するとはまだ仮定していない。$LK=F$ や $RK=F$ という厳密な等号も不要で、自然変換 $\eta$ または $\varepsilon$ が与えられればよい。

## 4. 普遍射と自然なHom全単射は同じ条件

定義は自然変換の**一意な因子分解**で述べた。これを[Hom集合による随伴の定義](../CAT2-08/index.md#def-cat2-08-adjunction)に接続する。左の $\theta$ を入れたときに右辺 $(\theta K)\eta$ を作る写像は、すでに型が定まっている。

<a id="prop-cat3-06-correspondence"></a>

<!-- formal-statement-start -->
> **命題（普遍射と自然全単射）**
> 小さい圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$、$K:\mathcal A\to\mathcal B$、$F:\mathcal A\to\mathcal C$ を取る。
>
> **左の場合。** $(L,\eta:F\Rightarrow LK)$ が左Kan拡張であることと、各 $H:\mathcal B\to\mathcal C$ で次の写像が全単射であることは同値である。この全単射は $H$ に自然である。

$$
\Theta_H:\operatorname{Nat}(L,H)\longrightarrow
\operatorname{Nat}(F,HK),
\quad \theta\longmapsto(\theta K)\cdot\eta.
$$

> **右の場合。** $(R,\varepsilon:RK\Rightarrow F)$ が右Kan拡張であることと、各 $H$ で次の写像が全単射であることは同値である。この全単射は $H$ に自然である。

$$
\Psi_H:\operatorname{Nat}(H,R)\longrightarrow
\operatorname{Nat}(HK,F),
\quad \phi\longmapsto\varepsilon\cdot(\phi K).
$$

> さらに、左の普遍対は [comma 圏](../CAT2-10/index.md#def-cat2-10-comma) $(F\downarrow K^*)$ の[始対象](../CAT1-04/index.md#def-cat1-04-initial-terminal)、右の普遍対は $(K^*\downarrow F)$ の終対象である。
<!-- formal-statement-end -->

### 証明の見取り図

全単射の全射性は因子分解の存在、単射性はその一意性そのものである。ただし自然性は**別に**確かめる。comma 圏の射はまさに比較 $\eta$ または $\varepsilon$ と可換になる自然変換である。

<!-- proof-start -->
### 証明

左側で任意の $\alpha\in\operatorname{Nat}(F,HK)$ を取る。定義により唯一の $\theta$ が $\Theta_H(\theta)=\alpha$ を満たすので $\Theta_H$ は全単射。逆に全単射を仮定すると、$\alpha$ の逆像が存在して唯一であり定義を満たす。

$u:H\Rightarrow H'$ を固定し、$\theta:L\Rightarrow H$ に対して、[whiskering の合成保存](../CAT1-08/index.md#prop-cat1-08-whisker-natural)を成分ごとに使うと

$$
\Theta_{H'}(u\cdot\theta)
=((u\cdot\theta)K)\cdot\eta
=(uK)\cdot(\theta K)\cdot\eta
=(uK)\cdot\Theta_H(\theta).
$$

これは $H$ に関する自然性である。

右側では $\beta:HK\Rightarrow F$ が与えられるとき、$\beta=\varepsilon(\phi K)$ を満たす $\phi$ の存在・一意性が $\Psi_H$ の全単射と同値になる。$u:H'\Rightarrow H$ に対しては

$$
\Psi_{H'}(\phi\cdot u)
=\varepsilon\cdot((\phi\cdot u)K)
=\varepsilon\cdot(\phi K)\cdot(uK)
=\Psi_H(\phi)\cdot(uK),
$$

なので反変方向の自然性も確認できる。

[comma 圏の定義](../CAT2-10/index.md#def-cat2-10-comma)により、$(F\downarrow K^*)$ の対象は $(H,\alpha:F\Rightarrow HK)$、$(L,\eta)$ からこれへの射は $u:L\Rightarrow H$ で $\alpha=(uK)\eta$ を満たすものに等しい。始対象の「各対象への唯一の射」が左の定義である。$(K^*\downarrow F)$ の対象は $(H,\beta:HK\Rightarrow F)$、これから $(R,\varepsilon)$ への射は $u:H\Rightarrow R$ で $\beta=\varepsilon(uK)$ を満たす。従って終対象の条件と右の定義は一致する。
<!-- proof-end -->

「普遍的」という語が意味するものは、図式の値が一番大きい／小さいということではない。関手圏での自然変換の**全体**を一対一に記述することである。

## 5. 同型一意性と随伴の存在

同じ図式に対して普遍的な延長を二つ作っても、比較を保つ同型で結ばれる。しかし普遍的な延長そのものが必ず存在するとは限らない。

<a id="prop-cat3-06-uniqueness"></a>

<!-- formal-statement-start -->
> **命題（Kan拡張の同型一意性）**
> 小さい圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$、関手 $K:\mathcal A\to\mathcal B$、$F:\mathcal A\to\mathcal C$ を取る。同じ $F$ の二つの左Kan拡張 $(L,\eta)$ と $(L',\eta')$ の間には、$\eta'=(sK)\eta$ を満たす唯一の自然同型 $s:L\xrightarrow{\cong}L'$ がある。右Kan拡張 $(R,\varepsilon)$ と $(R',\varepsilon')$ の間には、$\varepsilon=\varepsilon'(tK)$ を満たす唯一の自然同型 $t:R\xrightarrow{\cong}R'$ がある。
<!-- formal-statement-end -->

### 証明の見取り図

左の普遍性を二度使って $s:L\to L'$ と $s':L'\to L$ を作る。合成が比較を保つ恒等射なので、それぞれ一意性で恒等射になる。右も射の向きだけ注意して同じ構成を行う。

<!-- proof-start -->
### 証明

左で $H=L'$、$\alpha=\eta'$ と置くと唯一の $s:L\Rightarrow L'$ が $\eta'=(sK)\eta$ を満たす。逆の普遍性から $s':L'\Rightarrow L$ で $\eta=(s'K)\eta'$ を得る。合成すると

$$
((s's)K)\eta=(s'K)(sK)\eta=(s'K)\eta'=\eta.
$$

$1_L$ も $(1_LK)\eta=\eta$ を満たすから左の一意性で $s's=1_L$。同じ計算で $ss'=1_{L'}$。よって $s$ は自然同型で、比較を保つものとして一意である。

右では $(R,\varepsilon)$ の普遍性に $(H,\beta)=(R',\varepsilon')$ を入れて $t':R'\Rightarrow R$ と $\varepsilon'=\varepsilon(t'K)$ を得る。逆側から $t:R\Rightarrow R'$ と $\varepsilon=\varepsilon'(tK)$ を得る。従って

$$
\varepsilon=\varepsilon'(tK)=\varepsilon(t'K)(tK)
=\varepsilon((t't)K),
$$

であり、$1_R$ の一意性で $t't=1_R$。同じく $tt'=1_{R'}$ を得る。
<!-- proof-end -->

さらに、**各 $F$ の普遍対を一斉に指定できる**なら、前合成関手に随伴があることと一致する。固定した一つの $F$ にだけ Kan 拡張が存在しても、関手圏全体の随伴はまだ得られない。$[\mathcal A,\mathcal C]$ が大きい場合、各 $F$ での存在だけから類全体の選択を無条件には行えない。この注意は[対象ごとの普遍射から随伴を構成する定理](../CAT2-10/index.md#thm-cat2-10-left-adjoint)と同じである。

<a id="thm-cat3-06-left-adjoint"></a>

<!-- formal-statement-start -->
> **定理（左Kan拡張と前合成の随伴）**
> 小さい圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$、関手 $K:\mathcal A\to\mathcal B$ に対し、各 $F\in[\mathcal A,\mathcal C]$ の $K$ に沿う左Kan拡張の普遍対 $(L_F,\eta_F)$ を**一斉に指定できること**と、$K^*:[\mathcal B,\mathcal C]\to[\mathcal A,\mathcal C]$ が左随伴を持つことは同値である。選んだ拡張を関手的に組み立てると

$$
\operatorname{Lan}_K\dashv K^*,
\qquad
\operatorname{Nat}(\operatorname{Lan}_K F,H)
\cong\operatorname{Nat}(F,HK)
$$

> となり、この全単射は $F,H$ の両変数に自然である。
<!-- formal-statement-end -->

### 証明の見取り図

定義から得た全単射は最初 $H$ にしか自然とは述べていない。$F\Rightarrow G$ に対応する $\operatorname{Lan}_K F\Rightarrow\operatorname{Lan}_K G$ を普遍性で**定義**し、恒等射・合成の保存と $F$ 側の自然性を確かめて初めて随伴になる。

<!-- proof-start -->
### 証明

各 $F$ で左普遍対 $(L_F,\eta_F:F\Rightarrow L_FK)$ を選ぶ。$\alpha:F\Rightarrow G$ に対して、$H=L_G$、比較 $\eta_G\cdot\alpha:F\Rightarrow L_GK$ に $L_F$ の普遍性を適用し、唯一の射 $L\alpha:L_F\Rightarrow L_G$ を

$$
((L\alpha)K)\cdot\eta_F=\eta_G\cdot\alpha.
$$

で定義する。$\alpha=1_F$ の場合 $1_{L_F}$ がこの特徴づけの等式を満たすので、一意性により $L(1_F)=1_{L_F}$。

$F\xrightarrow{\alpha}G\xrightarrow{\beta}J$ に対して

$$
((L\beta\cdot L\alpha)K)\eta_F
=((L\beta)K)((L\alpha)K)\eta_F
=((L\beta)K)\eta_G\alpha
=\eta_J\beta\alpha.
$$

この計算の両端は、$\beta\alpha:F\Rightarrow J$ を最初の特徴づけの等式へ代入した条件そのものである。従って一意性から $L(\beta\alpha)=L\beta\cdot L\alpha$ となり、$L:[\mathcal A,\mathcal C]\to[\mathcal B,\mathcal C]$ は関手である。

[普遍射と自然全単射](#prop-cat3-06-correspondence)を使い $\Theta_{F,H}(\theta)=(\theta K)\eta_F$ と置く。$H$ 側の自然性はすでに証明した。$F\xrightarrow{\alpha}G$ と $\theta:L_G\Rightarrow H$ に対して、$((L\alpha)K)\eta_F=\eta_G\alpha$ を代入すると

$$
\Theta_{F,H}(\theta\cdot L\alpha)
= (\theta K)((L\alpha)K)\eta_F
=(\theta K)\eta_G\alpha
=\Theta_{G,H}(\theta)\alpha.
$$

よって $F$ 側にも自然で、[随伴のHom集合による定義](../CAT2-08/index.md#def-cat2-08-adjunction)を満たす。

逆に $L\dashv K^*$ が与えられたら、その[単位](../CAT2-09/index.md#def-cat2-09-unit) $\eta_F:F\Rightarrow (LF)K$ を取る。随伴の全単射は $(\theta K)\eta_F$ で書ける（[転置の公式](../CAT2-09/index.md#prop-cat2-09-transpose)で $\theta$ を右へ転置する）。この全単射が任意の $H$ に存在するので $(LF,\eta_F)$ は左Kan拡張となる。
<!-- proof-end -->

<a id="thm-cat3-06-right-adjoint"></a>

<!-- formal-statement-start -->
> **定理（右Kan拡張と前合成の随伴）**
> 小さい圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$、関手 $K:\mathcal A\to\mathcal B$ に対し、各 $F\in[\mathcal A,\mathcal C]$ の右Kan拡張の普遍対 $(R_F,\varepsilon_F)$ を**一斉に指定できること**と、$K^*$ が右随伴を持つことは同値である。選んだ拡張から関手 $\operatorname{Ran}_K$ を作ると

$$
K^*\dashv\operatorname{Ran}_K,
\qquad
\operatorname{Nat}(HK,F)
\cong\operatorname{Nat}(H,\operatorname{Ran}_K F)
$$

> が $H,F$ に自然に成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

右では $F\Rightarrow G$ を $\varepsilon_G(R\alpha K)=\alpha\varepsilon_F$ で持ち上げる。自然性は $H$ で反変、$F$ で共変に動く。

<!-- proof-start -->
### 証明

各 $F$ に右普遍対 $(R_F,\varepsilon_F:R_FK\Rightarrow F)$ を選ぶ。$\alpha:F\Rightarrow G$ のとき、$R_F$ を候補 $H$ とし、$\alpha\cdot\varepsilon_F:R_FK\Rightarrow G$ に $R_G$ の普遍性を適用して

$$
\varepsilon_G\cdot((R\alpha)K)=\alpha\cdot\varepsilon_F.
$$

を満たす唯一の $R\alpha:R_F\Rightarrow R_G$ を得る。$1_{R_F}$ は $\alpha=1_F$ でこの特徴づけの等式を満たす。$\beta:G\Rightarrow J$ に対しては

$$
\varepsilon_J((R\beta\cdot R\alpha)K)
=\varepsilon_J(R\beta K)(R\alpha K)
=\beta\varepsilon_G(R\alpha K)
=\beta\alpha\varepsilon_F.
$$

従って一意性で $R(1_F)=1_{R_F}$、$R(\beta\alpha)=R\beta\cdot R\alpha$。$R$ は関手となる。

$\Psi_{H,F}(\phi)=\varepsilon_F(\phi K)$ は[普遍射と自然全単射の命題](#prop-cat3-06-correspondence)で $H$ に自然な全単射だった。$F\xrightarrow{\alpha}G$ に対し、$\varepsilon_G((R\alpha)K)=\alpha\varepsilon_F$ を代入すると

$$
\Psi_{H,G}(R\alpha\cdot\phi)
=\varepsilon_G(R\alpha K)(\phi K)
=\alpha\varepsilon_F(\phi K)
=\alpha\Psi_{H,F}(\phi).
$$

従って $F$ にも自然で、$\Psi^{-1}$ が表示した随伴のHom全単射となる。逆に $K^*\dashv R$ の[余単位](../CAT2-09/index.md#def-cat2-09-counit) $\varepsilon_F:(RF)K\Rightarrow F$ を取れば、[転置の公式](../CAT2-09/index.md#prop-cat2-09-transpose)から $\Psi_{H,F}(\phi)=\varepsilon_F(\phi K)$ は全単射になる。[前命題](#prop-cat3-06-correspondence)により $(RF,\varepsilon_F)$ は右Kan拡張である。
<!-- proof-end -->

二つの定理は「左・右随伴の両方が常に存在する」とは言っていない。例えば左だけが存在する場合もある。**どの図式にも**普遍対を選んで一斉に指定できるときに、関手圏間の随伴が得られる。

## 6. 矢印圏で左右を手計算する

定義が抽象的なので、始点の集合を固定し、矢印の終点をどう決めるかを計算しよう。$\mathbf2$ の射は $1_0,1_1$ と $u:0\to1$、$\mathbf1$ の対象を $*$ とする。$K(*)=0$ とし、値域を集合の圏 $\mathbf{Set}$ とする。$[\mathbf1,\mathbf{Set}]$ は集合と写像の圏、$[\mathbf2,\mathbf{Set}]$ は写像 $Y_0\xrightarrow{h}Y_1$ と可換四角形の圏である。

<a id="prop-cat3-06-arrow"></a>

<!-- formal-statement-start -->
> **命題（矢印圏の始点に沿うKan拡張）**
> $K:\mathbf1\to\mathbf2$ が対象 $0$ を選び、$\mathcal C=\mathbf{Set}$ とする。任意の集合 $X$ に対して

$$
\operatorname{Lan}_K X=(X\xrightarrow{1_X}X),
\qquad
\operatorname{Ran}_K X=(X\xrightarrow{!}\{*\})
$$

> はそれぞれ左・右Kan拡張を与える。ただし $!$ は終対象への唯一の写像であり、比較 $\eta_X:X\to X$、$\varepsilon_X:X\to X$ はともに $1_X$ とする。
<!-- formal-statement-end -->

### 証明の見取り図

左で $L(X)\to(Y_0\xrightarrow{h}Y_1)$ という可換四角形を描くと、始点の写像 $f_0:X\to Y_0$ を決めれば終点の写像は $f_1=hf_0$ に強制される。右で $(Y_0\xrightarrow{h}Y_1)\to R(X)$ を描くと、終点の写像は $Y_1\to\{*\}$ の唯一のものになり、始点の写像だけを自由に選べる。

<!-- proof-start -->
### 証明

$L(X)$ は対象 $0,1$ をともに $X$ に、射 $u$ を $1_X$ に送るから確かに関手である。$\eta_X=1_X:X\Rightarrow L(X)K$ も自然変換である（$\mathbf1$ には恒等射しかない）。

任意の $H=(Y_0\xrightarrow{h}Y_1)$ と $\alpha:X\to HK=Y_0$ を取る。$\theta:L(X)\Rightarrow H$ を成分 $(\theta_0,\theta_1)$ で書くと、射 $u$ に関する自然性は

$$
h\theta_0=\theta_1 1_X=\theta_1.
$$

比較条件 $(\theta K)\eta_X=\alpha$ は $\theta_0=\alpha$ である。よって $\theta_1=h\alpha$ とただ一通り決まる。逆にこの二成分は自然性を満たす。従って左の普遍性が成立する。

$R(X)$ は $R(X)(0)=X$、$R(X)(1)=\{*\}$、$R(X)(u)=!$ とした関手であり、$\varepsilon_X=1_X:R(X)K\Rightarrow X$ とする。任意の $\beta:HK=Y_0\to X$ と $\phi:H\Rightarrow R(X)$ に対し、自然性は

$$
!\,\phi_0=\phi_1h.
$$

$\phi_1:Y_1\to\{*\}$ は唯一、$\phi_0=\beta$ が比較条件 $\varepsilon_X(\phi K)=\beta$ なので上式は自動的に成立する。$\phi$ は一意で、右の普遍性も成立する。
<!-- proof-end -->

**何が違うのか。** $L(X)$ は $X$ から出る任意の写像を相手の矢印に沿って延ばせる最も自由な配置で、$R(X)$ は $X$ へ来る任意の写像に対応できる配置である。$X=\{0,1\}$ とすると $X\xrightarrow{1_X}X$ と $X\to\{*\}$ は終点の濃度が違うため同型ではない。この違いこそ左右の普遍性の違いである。

同じ $\mathbf2$ でも $K$ が**終点 $1$ を選ぶ**場合は役割が変わる。左は $\varnothing\to X$、右は $X\xrightarrow{1_X}X$ となる。これも第9問で証明する。

## 7. 普遍拡張が存在しない場合

前の有限矢印圏では左右とも構成できたが、値域圏に必要な対象がないと失敗する。最小の障害を、空の添字圏から取り出そう。

<a id="prop-cat3-06-obstruction"></a>

<!-- formal-statement-start -->
> **命題（空図式の左Kan拡張が存在しない例）**
> $\mathcal A=\varnothing$ を空圏、$\mathcal B=\mathbf1$ を一対象一射の圏、$K:\mathcal A\to\mathcal B$ を唯一の関手とする。$\mathcal C$ を非空有限集合とそれらの全写像からなる局所小圏とする。このとき唯一の $F:\mathcal A\to\mathcal C$ の $K$ に沿う左Kan拡張は存在しない。一方、右Kan拡張は存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$F$ の自然変換は空の添字集合に成分を指定するだけなので常に唯一である。左の普遍性は $\mathcal C$ の始対象、右の普遍性は終対象の存在にそれぞれ帰着する。

<!-- proof-start -->
### 証明

空圏から $\mathcal C$ への関手 $F$ は、指定すべき対象も射もないため唯一である。$L:\mathbf1\to\mathcal C$ を選ぶことは非空有限集合 $L(*)$ を一つ選ぶことに等しい。任意の $H:\mathbf1\to\mathcal C$ について、空圏上の自然変換 $F\Rightarrow HK$ は唯一なので、左の普遍性は

$$
\operatorname{Hom}_{\mathcal C}(L(*),H(*))\cong\{*\}
$$

があらゆる非空有限集合 $H(*)$ について成立するという条件である。ところが $L(*)$ は非空だから、二点集合 $\{0,1\}$ への定数写像 $c_0,c_1:L(*)\to\{0,1\}$ が少なくとも二つあり、条件に反する。よって左拡張は存在しない。

右では $R(*)=\{*\}$ とする。任意の非空有限集合 $H(*)$ から $R(*)$ への写像は唯一であり、$\operatorname{Nat}(HK,F)$ も空圏上で唯一である。比較 $\varepsilon:RK\Rightarrow F$ は空の自然変換として一意に存在するので右の普遍性は成立する。
<!-- proof-end -->

ここで欠けているのは**始対象**であり、右の終対象はある。「Kan拡張は関手の延長だから必ずある」という推論は、まさにこの存在条件を見落としている。

## 8. 演習：向き・一意性・存在条件を使いこなす

### 問題1：前合成で可換四角形を取り出す

- Level: A
- 問題ID: CAT3-06-PRECOMPOSE

$K:\mathbf1\to\mathbf2$ が $0$ を選ぶ。$H=(\{a\}\xrightarrow{h}\{0,1\})$ は $h(a)=0$、$H'=(\{b,c\}\xrightarrow{h'}\{p,q\})$ は $h'(b)=p,h'(c)=q$ とする。$\theta_0(a)=b$、$\theta_1(0)=p,\theta_1(1)=q$ で与えた組が自然変換か検査し、$K^*\theta$ と $K^*(1_H)$ を求めよ。

<!-- solution-start -->
**詳細解答**：$\theta_0:\{a\}\to\{b,c\}$ と $\theta_1:\{0,1\}\to\{p,q\}$ の型は合っている。唯一の非恒等射 $u:0\to1$ で

$$
h'\theta_0(a)=h'(b)=p,\qquad \theta_1h(a)=\theta_1(0)=p
$$

なので $h'\theta_0=\theta_1h$ となり自然変換である。前合成は $K(*)=0$ の成分を取るから $K^*\theta=\theta_0:\{a\}\to\{b,c\}$、$K^*(1_H)=1_{\{a\}}$ である。
<!-- solution-end -->

### 問題2：始点に沿う左Kan拡張

- Level: A
- 問題ID: CAT3-06-LEFT-ARROW

$K(*)=0$、$X=\{r,s\}$ とし、$H=(Y_0\xrightarrow{h}Y_1)$ を集合値図式とする。任意の写像 $\alpha:X\to Y_0$ を $L(X)=(X\xrightarrow{1_X}X)$ から $H$ への自然変換へ延ばせ。一意性を示せ。

<!-- solution-start -->
**詳細解答**：自然変換 $\theta=(\theta_0,\theta_1)$ の始点成分は比較条件より $\theta_0=\alpha$。射 $u$ の自然性 $h\theta_0=\theta_1 1_X$ を代入すると $\theta_1=h\alpha$ に強制される。これを選べば $h\alpha=(h\alpha)1_X$ で自然性を満たす。他の選び方はこの等式に反するので、存在と一意性が確認できる。
<!-- solution-end -->

### 問題3：始点に沿う右Kan拡張

- Level: A
- 問題ID: CAT3-06-RIGHT-ARROW

問題2と同じ $K,X,H$ について、$R(X)=(X\to\{*\})$ が右Kan拡張になることを、任意の $\beta:Y_0\to X$ の因子分解から検証せよ。

<!-- solution-start -->
**詳細解答**：$\phi:H\Rightarrow R(X)$ の始点成分は $\varepsilon_X(\phi K)=\beta$ と $\varepsilon_X=1_X$ から $\phi_0=\beta$。終点成分 $\phi_1:Y_1\to\{*\}$ は唯一である。自然性の左右は $!\beta:Y_0\to\{*\}$ と $\phi_1h:Y_0\to\{*\}$ であり、終対象への写像の一意性で等しい。従って任意の $\beta$ に対し唯一の $\phi$ を得る。
<!-- solution-end -->

### 問題4：恒等関手の場合

- Level: A
- 問題ID: CAT3-06-IDENTITY

小圏 $\mathcal A$、局所小圏 $\mathcal C$、$K=1_{\mathcal A}$ と $F:\mathcal A\to\mathcal C$ に対し、$(F,1_F)$ が左右のKan拡張であることを両方の因子分解式で検証せよ。

<!-- solution-start -->
**詳細解答**：左で $\alpha:F\Rightarrow HK=H$ を取ると、$\alpha=(\theta K)1_F=\theta$ だから唯一の選択は $\theta=\alpha$。右で $\beta:HK=H\Rightarrow F$ を取ると、$\beta=1_F(\phi K)=\phi$ だから唯一の選択は $\phi=\beta$。いずれも全ての $H$ について成立する。
<!-- solution-end -->

### 問題5：存在しない理由をHom集合で示す

- Level: A
- 問題ID: CAT3-06-NONEXISTENCE

空圏 $\varnothing$ から $\mathbf1$ への唯一の $K$ と、非空有限集合圏 $\mathcal C$ を取る。左Kan拡張が存在しない理由を、二点集合への写像を用いて証明せよ。また右Kan拡張の値を答えよ。

<!-- solution-start -->
**詳細解答**：左の候補 $L$ は $L(*)=S$ という非空有限集合を選ぶことに等しい。空圏上の自然変換は一通りなので、左の普遍性はすべての非空有限集合 $Y$ への写像 $S\to Y$ が一通りであることを要求する。$Y=\{0,1\}$ では $S$ が非空ゆえ定数写像 $s\mapsto0$ と $s\mapsto1$ が異なり、矛盾する。右では $R(*)=\{*\}$ とすれば、任意の $Y$ から $\{*\}$ への写像が一意であるため普遍性が成立する。
<!-- solution-end -->

### 問題6：比較を保つ同型は一つだけ

- Level: B
- 問題ID: CAT3-06-UNIQUENESS

$(L,\eta)$ と $(M,\xi)$ を同じ $F$ の左Kan拡張とする。$\xi=(sK)\eta$ と $\eta=(tK)\xi$ を満たす射をそれぞれ構成し、$ts=1_L$ と $st=1_M$ を証明せよ。

<!-- solution-start -->
**詳細解答**：$L$ の普遍性に $H=M,\alpha=\xi$ を入れると唯一の $s:L\Rightarrow M$ が存在する。$M$ の普遍性に $H=L,\alpha=\eta$ を入れると唯一の $t:M\Rightarrow L$ が存在する。合成して

$$
((ts)K)\eta=(tK)(sK)\eta=(tK)\xi=\eta.
$$

$1_L$ についても $(1_LK)\eta=\eta$ なので、$L$ の普遍性の一意性から $ts=1_L$。同様に $((st)K)\xi=\xi$ と $(1_MK)\xi=\xi$ を比較し $st=1_M$。したがって $s,t$ は互いに逆の自然同型である。
<!-- solution-end -->

### 問題7：左拡張は射も運ぶ

- Level: B
- 問題ID: CAT3-06-LEFT-FUNCTORIALITY

全ての $F:\mathcal A\to\mathcal C$ に左普遍対 $(L_F,\eta_F)$ を選べるとする。$\alpha:F\Rightarrow G$ を $L\alpha$ に送る式を普遍性から書き、$L(\beta\alpha)=L\beta\,L\alpha$ を導け。

<!-- solution-start -->
**詳細解答**：$F$ から $L_GK$ への比較 $\eta_G\alpha$ を、$L_F$ の普遍性に入力する。唯一の $L\alpha:L_F\Rightarrow L_G$ は

$$
(L\alpha K)\eta_F=\eta_G\alpha
$$

を満たす。$\beta:G\Rightarrow J$ については

$$
((L\beta\,L\alpha)K)\eta_F
=(L\beta K)(L\alpha K)\eta_F
=(L\beta K)\eta_G\alpha
=\eta_J\beta\alpha.
$$

$L(\beta\alpha)$ も同じ比較条件を満たすから一意性で等しい。$\alpha=1_F$ のとき $1_{L_F}$ が条件を満たすので恒等射も保存する。
<!-- solution-end -->

### 問題8：右拡張は射も運ぶ

- Level: B
- 問題ID: CAT3-06-RIGHT-FUNCTORIALITY

全ての $F$ に右普遍対 $(R_F,\varepsilon_F)$ を選べるとする。$\alpha:F\Rightarrow G$ に対する $R\alpha$ の特徴づけを与え、$R(\beta\alpha)=R\beta\,R\alpha$ を計算で示せ。

<!-- solution-start -->
**詳細解答**：$R_FK\Rightarrow G$ の自然変換 $\alpha\varepsilon_F$ に、$R_G$ の普遍性を適用すると唯一の $R\alpha:R_F\Rightarrow R_G$ が得られ

$$
\varepsilon_G(R\alpha K)=\alpha\varepsilon_F
$$

となる。$\beta:G\Rightarrow J$ に対し

$$
\varepsilon_J((R\beta\,R\alpha)K)
=\varepsilon_J(R\beta K)(R\alpha K)
=\beta\varepsilon_G(R\alpha K)
=\beta\alpha\varepsilon_F
$$

となり、右普遍性の一意性から $R(\beta\alpha)=R\beta\,R\alpha$。$\alpha=1_F$ に対しても $1_{R_F}$ が条件を満たし $R(1_F)=1_{R_F}$ となる。
<!-- solution-end -->

### 問題9：終点を選ぶと左右は入れ替わる

- Level: B
- 問題ID: CAT3-06-TARGET-ARROW

$J:\mathbf1\to\mathbf2$ が対象 $1$ を選び、$X$ が任意の集合であるとする。左Kan拡張 $(\varnothing\to X)$ と右Kan拡張 $(X\xrightarrow{1_X}X)$ の普遍性を、任意の $H=(Y_0\xrightarrow{h}Y_1)$ に対して検証せよ。

<!-- solution-start -->
**詳細解答**：$J^*H=Y_1$ である。左の $L=(\varnothing\to X)$ から $H$ への自然変換 $\theta=(\theta_0,\theta_1)$ では $\theta_0:\varnothing\to Y_0$ は唯一、$\theta_1:X\to Y_1$ は任意である。自然性 $h\theta_0=\theta_1(\varnothing\to X)$ は空集合からの写像の一意性で常に成り立つ。比較 $\eta_X:X\to LJ=X$ を恒等射とすれば $\theta_1=\alpha:X\to Y_1$ が一意な因子分解を与える。

右の $R=(X\xrightarrow{1_X}X)$ へ $H$ からの自然変換 $\phi=(\phi_0,\phi_1)$ を取る。自然性は $\phi_1h=1_X\phi_0=\phi_0$ である。比較 $\varepsilon_X=1_X:RJ=X\to X$ の条件から $\phi_1=\beta:Y_1\to X$、従って $\phi_0=\beta h$ に強制される。逆にこの二成分は可換であり、右普遍性が成立する。
<!-- solution-end -->

### 問題10：普遍射・随伴・非存在を一つにつなぐ

- Level: C
- 問題ID: CAT3-06-UNIVERSAL-RECONSTRUCTION

小さい圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$ と $K:\mathcal A\to\mathcal B$ を取る。

1. 左普遍対 $(L_F,\eta_F)$ が全ての $F$ に対して一斉に指定されているとき、$(F\downarrow K^*)$ の始対象性から、$L_F$ が自然変換に対して関手的に動き、$L\dashv K^*$ となることを証明せよ。$F$ 側の自然性を省略してはならない。
2. $\mathcal A=\varnothing,\mathcal B=\mathbf1$、$\mathcal C$ を非空有限集合圏に取る場合、1の仮定が破れる箇所を指摘せよ。また $K^*$ に**右随伴**はあるか、全ての $F$ を考えて判定せよ。

<!-- solution-start -->
**詳細解答**：

1. [普遍射の特徴づけ](#prop-cat3-06-correspondence)により各 $F$ の $(L_F,\eta_F)$ は始対象で、$\Theta_{F,H}:\operatorname{Nat}(L_F,H)\to\operatorname{Nat}(F,HK)$ は全単射である。$\alpha:F\Rightarrow G$ を与えたとき、始対象 $(L_F,\eta_F)$ から対象 $(L_G,\eta_G\alpha)$ への唯一の射を $L\alpha$ と置くと

   $$
   (L\alpha K)\eta_F=\eta_G\alpha.
   $$

   $\alpha=1_F$ なら $1_{L_F}$ がこの式を満たすので恒等射が保たれる。$\beta:G\Rightarrow J$ について

   $$
   ((L\beta L\alpha)K)\eta_F
   =(L\beta K)\eta_G\alpha
   =\eta_J\beta\alpha
   $$

   なので一意性から $L(\beta\alpha)=L\beta L\alpha$。従って $L$ は関手となる。$u:H\Rightarrow H'$ に関して

   $$
   \Theta_{F,H'}(u\theta)=(uK)\Theta_{F,H}(\theta)
   $$

   であり、$\alpha:F\Rightarrow G$ に関して

   $$
   \Theta_{F,H}(\theta L\alpha)
   =(\theta K)(L\alpha K)\eta_F
   =(\theta K)\eta_G\alpha
   =\Theta_{G,H}(\theta)\alpha.
   $$

   よって二変数自然なHom全単射となり、[随伴の定義](../CAT2-08/index.md#def-cat2-08-adjunction)から $L\dashv K^*$。

2. $[\varnothing,\mathcal C]$ には図式 $F$ が一つだけあり、$K^*$ は全ての非空有限集合 $Y$ をその $F$ に写す。左普遍対の存在は、全ての $Y$ に対して

   $$
   \operatorname{Hom}_{\mathcal C}(L(*),Y)\cong\{*\}
   $$

   が成立すること、すなわち始対象の存在を要求する。非空集合 $L(*)$ から二点集合 $\{0,1\}$ へは、値が常に $0$ の写像と常に $1$ の写像がある。従って左随伴はない。

   一方 $R(*)=\{*\}$ という終対象がある。任意の $H(*)=Y$ について

   $$
   \operatorname{Hom}_{\mathcal C}(Y,\{*\})\cong
   \operatorname{Nat}(HK,F)\cong\{*\}
   $$

   であり、左右の集合がともに一元集合なので唯一の全単射は自然である。[右Kan拡張と随伴](#thm-cat3-06-right-adjoint)より、$K^*\dashv\operatorname{Ran}_K$ が成立する。
<!-- solution-end -->

## 9. 次の講義へ

Kan拡張の本質は**どの対象にも通用する自然変換の一意な因子分解**であり、値を個別にどう計算するかは別の問題である。次の CAT3-07「点ごとの左Kan拡張」では、$K:\mathcal A\to\mathcal B$ と $b\in\mathcal B$ に対する comma 圏を用いて各 $b$ での値を余極限として構成し、その公式が本章の普遍性を満たすことを証明する。
