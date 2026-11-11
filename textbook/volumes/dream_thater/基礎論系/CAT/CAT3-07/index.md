# CAT3-07 点ごとの左Kan拡張

## 1. 普遍性だけでなく、各対象で値を計算したい

前講では、[左Kan拡張](../CAT3-06/index.md#def-cat3-06-left-kan)を自然変換全体の一意な因子分解で特徴づけた。しかし、$F:\mathcal A\to\mathcal C$ と $K:\mathcal A\to\mathcal B$ を渡されたとき、$\operatorname{Lan}_K F$ の値を実際にどう作るかは分からなかった。

最も小さい例を先に見る。$\mathbf2$ は $0\xrightarrow{u}1$ からなる圏、$\mathbf1$ は一対象圏とする。$K:\mathbf1\to\mathbf2$ が $0$ を選び、$F(*)=X$ が集合であれば、左Kan拡張は $X\xrightarrow{1_X}X$ だった。$1$ での値に $X$ が現れるのは、$K(*)=0$ **から $1$ へ射 $u$ が届く**からである。では、複数の $a$ から $b$ へ射が届くとき、各 $F(a)$ をどう貼り合わせるのだろうか。

その答えは、$Ka\to b$ を持つすべての $a$ を集めた添字圏の**余極限**である。まず「どの射が $b$ まで到達するか」を正確に分類し、その後に[余極限の普遍性](../CAT2-05/index.md#def-cat2-05-colimit)で値・射への作用・自然変換を一つずつ構成する。

本講では $\mathcal A,\mathcal B$ を**小さい圏**、$\mathcal C$ を**局所小圏**、$K:\mathcal A\to\mathcal B$、$F:\mathcal A\to\mathcal C$ を関手とする。合成 $gf$ は $f$ の後に $g$ を行う。$F(a)$ は $\mathcal C$ の対象、$K(a)$ は $\mathcal B$ の対象であり、両者を同一視しない。$\mathcal C$ に全ての小余極限が存在する**余完備性**を課せば下の構成は必ずできるが、実際には使う各余極限だけが存在すればよい。

## 2. $Ka\to b$ を全て集めるcomma圏

$b\in\mathcal B$ を固定する。$b$ へ向かう矢印 $u:Ka\to b$ は、$F(a)$ から求める値 $L(b)$ へ入る「標準射」の添字になる。同じ情報を二重に数えないよう、$a\xrightarrow{f}a'$ と $u'Kf=u$ という関係も添字圏の射として記録する。

これは既習の[comma圏](../CAT2-10/index.md#def-cat2-10-comma)であり、片方の関手を一点 $b$ への定数関手にした特殊例である。以後 $(K\downarrow b)$ と書く。

<a id="def-cat3-07-comma-diagram"></a>

<!-- formal-statement-start -->
> **定義（左Kan拡張のcomma添字図式）**
> 小さい圏 $\mathcal A,\mathcal B$、関手 $K:\mathcal A\to\mathcal B$、対象 $b\in\mathcal B$ を取る。圏 $(K\downarrow b)$ は、次の対象・射・合成を持つ。
>
> - 対象：$(a,u)$。ただし $a\in\mathcal A$、$u:Ka\to b$ は $\mathcal B$ の射。
> - 射：$(a,u)\to(a',u')$ は $\mathcal A$ の射 $f:a\to a'$ で、$u'K(f)=u$ を満たすもの。
> - 恒等射と合成は $\mathcal A$ のものを用いる。
>
> 射影関手 $\pi_b:(K\downarrow b)\to\mathcal A$ は $(a,u)\mapsto a$、$f\mapsto f$ とする。$F:\mathcal A\to\mathcal C$ に対する **comma添字図式**は

$$
D_b=F\pi_b:(K\downarrow b)\longrightarrow\mathcal C
$$

> である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-07-comma-diagram -->
**定義の確認**（一本の矢印）。$K:\mathbf1\to\mathbf2$ が $0$ を選ぶ。$b=0$ には $0\to0$ の恒等射しかないので、$(K\downarrow0)$ の対象は $(*,1_0)$ 一つである。$b=1$ には $0\xrightarrow{u}1$ が一つあるので、$(K\downarrow1)$ の対象は $(*,u)$ 一つ。どちらも恒等射だけを持つ。従って $D_0$ も $D_1$ も唯一の対象に $X=F(*)$ を置く図式である。

定義にある射の条件も実際に確かめる。唯一の射 $f=1_*$ について、$uKf=u1_0=u$ なので恒等射が許される。一般の $f:(a,u)\to(a',u')$ と $g:(a',u')\to(a'',u'')$ では

$$
u''K(gf)=u''K(g)K(f)=u'K(f)=u
$$

となり合成が閉じる。$\pi_b(gf)=gf=\pi_b(g)\pi_b(f)$ なので射影は関手であり、$F$ との合成も関手となる。
<!-- definition-example-end -->

**小ささを確認する。** comma圏の対象は $a$ ごとのHom集合のタグ付き和で表せる。

$$
\operatorname{Ob}(K\downarrow b)
=\coprod_{a\in\operatorname{Ob}(\mathcal A)}
\operatorname{Hom}_{\mathcal B}(Ka,b).
$$

$\mathcal A$ の対象全体と $\mathcal B$ の各Homが集合なので、上式は集合である。comma圏の射は $\mathcal A$ の射から条件 $u'Kf=u$ を満たすものを抜き出すため、その全体も集合である。

従って $(K\downarrow b)$ は小さい圏である。一方、$\mathcal A$ が大きい場合にはこの結論は自動ではない。「値域が余完備だから、任意の大きな図式の余極限も存在する」とは言えない。

## 3. 余極限を $L(b)$ として組み立てる

各 $b$ について $D_b$ の余極限が存在すると仮定する。[余錐](../CAT2-05/index.md#def-cat2-05-cocone)の脚を $i^b_{a,u}:F(a)\to L(b)$ と書く。この添字は $a$ だけでなく、$u:Ka\to b$ も含む。同じ $a$ に複数の $u$ があれば、一般には別の脚である。

<a id="def-cat3-07-pointwise"></a>

<!-- formal-statement-start -->
> **定義（点ごとの左Kan拡張の余極限構成）**
> 小さい圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$、関手 $K:\mathcal A\to\mathcal B$ と $F:\mathcal A\to\mathcal C$ を取る。各 $b\in\mathcal B$ で図式 $D_b=F\pi_b$ の余極限が存在するとき、値を

$$
L(b)=\underset{(a,u:Ka\to b)\in(K\downarrow b)}{\operatorname{colim}}F(a)
$$

> と置き、余極限余錐の脚 $i^b_{a,u}:F(a)\to L(b)$ を選ぶ。この余錐は任意の射 $f:(a,u)\to(a',u')$ に対して

$$
i^b_{a',u'}F(f)=i^b_{a,u}
$$

> を満たし、任意の同じ形の余錐 $(q_{a,u}:F(a)\to Q)$ には、全ての脚について $q_{a,u}=h\,i^b_{a,u}$ となる唯一の $h:L(b)\to Q$ がある。この点ごとの構成を以下で関手と左Kan拡張へ組み立てる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-07-pointwise -->
**定義の確認**（一本の矢印）。第2節の $(K\downarrow0),(K\downarrow1)$ は一対象一射圏なので、余極限はいずれも $X$ で脚を $1_X$ に取れる。なぜかというと、任意の余錐は一つの射 $q:X\to Q$ だけであり、$q=h1_X$ の唯一の解が $h=q$ だからである。これから $L(0)=L(1)=X$ を得る。矢印 $u:0\to1$ を $L(u)=1_X$ へ送ることは次節で導く。
<!-- definition-example-end -->

「点ごと」という表現には二つの主張が含まれる。余極限で**値を得た**だけではまだ $\mathcal B$ 上の関手ではないし、関手になっても前講の**自然変換全体の普遍性**は未証明である。順に確認する。

### 3.1 $b\to b'$ が余極限の脚を運ぶ

$v:b\to b'$ があると、$u:Ka\to b$ の後に $v$ を合成して $vu:Ka\to b'$ が得られる。従って $b$ の添字は $b'$ の添字へ移せる。$F(a)$ 自体は変えない。

<a id="prop-cat3-07-transport"></a>

<!-- formal-statement-start -->
> **命題（comma添字の移送と関手の構成）**
> 小さい圏 $\mathcal A,\mathcal B$、局所小圏 $\mathcal C$ と関手 $K,F$ について、第3節の全ての余極限を選ぶ。$\mathcal B$ の射 $v:b\to b'$ は関手

$$
v_*:(K\downarrow b)\longrightarrow(K\downarrow b'),
\qquad (a,u)\longmapsto(a,vu),\quad f\longmapsto f
$$

> を定める。さらに全ての $(a,u)$ について

$$
L(v)\,i^b_{a,u}=i^{b'}_{a,vu}
$$

> を満たす唯一の $L(v):L(b)\to L(b')$ が存在する。この対応 $b\mapsto L(b)$、$v\mapsto L(v)$ は関手 $L:\mathcal B\to\mathcal C$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

$v_*$ では $u'Kf=u$ を左から $v$ で合成すればよい。次に $i^{b'}_{a,vu}$ が $D_b$ の余錐になることを確かめ、[余極限の一意な媒介射](../CAT2-05/index.md#def-cat2-05-colimit)で $L(v)$ を定める。恒等射と合成は、余極限の脚との合成を比較して証明する。

<!-- proof-start -->
### 証明

$f:(a,u)\to(a',u')$ なら $u'Kf=u$ である。左から $v$ を合成すると

$$
(vu')Kf=v(u'Kf)=vu
$$

となるので、同じ $f$ が $(a,vu)\to(a',vu')$ の射になる。$v_*$ は射自体を変えないから恒等射と合成を保つ。

第3節の $b'$ における余錐関係を $f$ に適用すると

$$
i^{b'}_{a',vu'}Ff=i^{b'}_{a,vu}.
$$

従って $(i^{b'}_{a,vu})_{(a,u)}$ は図式 $D_b$ から $L(b')$ への余錐であり、$D_b$ の余極限の普遍性から唯一の $L(v)$ が存在する。

恒等射 $1_b$ では $L(1_b)i^b_{a,u}=i^b_{a,1_bu}=i^b_{a,u}$。$1_{L(b)}$ も同じ性質を持つので、余極限の媒介射の一意性から $L(1_b)=1_{L(b)}$。

$b\xrightarrow{v}b'\xrightarrow{w}b''$ に対しては、

$$
\begin{aligned}
L(w)L(v)i^b_{a,u}
&=L(w)i^{b'}_{a,vu}\\
&=i^{b''}_{a,w(vu)}
=i^{b''}_{a,(wv)u}\\
&=L(wv)i^b_{a,u}.
\end{aligned}
$$

両辺が全ての余極限の脚で一致するから $L(w)L(v)=L(wv)$。以上で関手公理を満たす。
<!-- proof-end -->

ここで重要なのは、$L(v)$ を「自然そうだから」指定したのではなく、**実在する余錐から一意に作った**ことである。$b$ ごとの余極限の選び方が異なっても、この方法で関手が得られる。

## 4. 単位を作り、前講の普遍性に戻る

各 $a\in\mathcal A$ で $1_{Ka}:Ka\to Ka$ は $(K\downarrow Ka)$ の対象 $(a,1_{Ka})$ を定める。そこで $F(a)$ から $L(Ka)$ への比較射として、対応する余極限の脚を選ぶ。

$$
\eta_a=i^{Ka}_{a,1_{Ka}}:F(a)\longrightarrow L(Ka).
$$

この族が自然変換であるかを最初に検証する。$f:a\to a'$ に対して、$(K\downarrow Ka')$ の中に射

$$
f:(a,Kf)\longrightarrow(a',1_{Ka'})
$$

がある。実際 $1_{Ka'}Kf=Kf$ だからである。従って余錐関係と前命題の $L(Kf)$ の特徴づけから

$$
\eta_{a'}Ff
=i^{Ka'}_{a',1_{Ka'}}Ff
=i^{Ka'}_{a,Kf}
=L(Kf)i^{Ka}_{a,1_{Ka}}
=L(Kf)\eta_a.
$$

左右はともに $F(a)\to L(Ka')$ である。よって $\eta:F\Rightarrow LK$ は自然変換になる。

<a id="thm-cat3-07-pointwise"></a>

<!-- formal-statement-start -->
> **定理（点ごとの左Kan拡張の公式と普遍性）**
> $\mathcal A,\mathcal B$ を小さい圏、$\mathcal C$ を局所小圏、$K:\mathcal A\to\mathcal B$ と $F:\mathcal A\to\mathcal C$ を関手とする。全ての $b\in\mathcal B$ で $F\pi_b:(K\downarrow b)\to\mathcal C$ の余極限が存在すると仮定する。
>
> その余極限から第3節の関手 $L$ を作り、$\eta_a=i^{Ka}_{a,1_{Ka}}$ と定めると、$(L,\eta)$ は [左Kan拡張](../CAT3-06/index.md#def-cat3-06-left-kan)である。特に

$$
(\operatorname{Lan}_K F)(b)
\cong\underset{(a,u:Ka\to b)}{\operatorname{colim}}F(a)
$$

> となる。任意の $H:\mathcal B\to\mathcal C$ との対応

$$
\operatorname{Nat}(L,H)
\xrightarrow{\ \cong\ }\operatorname{Nat}(F,HK),
\qquad \theta\longmapsto(\theta K)\eta
$$

> は $H$ に自然な全単射である。したがって $\mathcal C$ が[余完備](../CAT2-05/index.md#def-cat2-05-cocomplete)なら、任意の $F$ にこの構成が適用できる。
<!-- formal-statement-end -->

### 証明の見取り図

$\alpha:F\Rightarrow HK$ を入力として、各 $(a,u:Ka\to b)$ に $H(u)\alpha_a:F(a)\to H(b)$ を作る。これが余錐になることから各 $b$ に唯一の $\theta_b:L(b)\to H(b)$ を得る。難所は、$\theta_b$ が $b$ に自然であることと、自然変換 $\theta$ の**一意性**である。どちらも標準射 $i^b_{a,u}$ で比較する。

<!-- proof-start -->
### 証明

前命題で $L$ が関手となること、上の計算で $\eta$ が自然変換となることは確認した。

**（1）余錐を作る。** $H:\mathcal B\to\mathcal C$ と $\alpha:F\Rightarrow HK$ を任意に固定する。$b\in\mathcal B$ と $(a,u:Ka\to b)$ に対し

$$
q^b_{a,u}=H(u)\alpha_a:F(a)\longrightarrow H(b)
$$

と置く。$f:(a,u)\to(a',u')$ では $u'Kf=u$ であり、$\alpha$ の自然性は $\alpha_{a'}Ff=H(Kf)\alpha_a$ だから

$$
\begin{aligned}
q^b_{a',u'}Ff
&=H(u')\alpha_{a'}Ff\\
&=H(u')H(Kf)\alpha_a\\
&=H(u'Kf)\alpha_a\\
&=H(u)\alpha_a=q^b_{a,u}.
\end{aligned}
$$

従って $(q^b_{a,u})$ は $D_b$ から $H(b)$ への余錐である。

**（2）各成分を得て自然性を確認する。** 余極限の普遍性から唯一の $\theta_b:L(b)\to H(b)$ があって

$$
\theta_b\,i^b_{a,u}=H(u)\alpha_a
$$

となる。$v:b\to b'$ に対して、左辺の合成 $H(v)\theta_b$ と $\theta_{b'}L(v)$ はともに $L(b)\to H(b')$ である。任意の余極限の脚に前後から合成すると

$$
\begin{aligned}
H(v)\theta_b i^b_{a,u}
&=H(v)H(u)\alpha_a=H(vu)\alpha_a,\\
\theta_{b'}L(v)i^b_{a,u}
&=\theta_{b'}i^{b'}_{a,vu}=H(vu)\alpha_a.
\end{aligned}
$$

余極限の媒介射の一意性から $H(v)\theta_b=\theta_{b'}L(v)$。よって $\theta:L\Rightarrow H$ は自然変換である。

**（3）比較の等式。** $b=Ka$、$u=1_{Ka}$ として（2）の式を使うと

$$
\theta_{Ka}\eta_a
=\theta_{Ka}i^{Ka}_{a,1_{Ka}}
=H(1_{Ka})\alpha_a
=\alpha_a.
$$

従って $(\theta K)\eta=\alpha$ である。

**（4）自然変換の一意性。** 別の $\theta':L\Rightarrow H$ も $(\theta'K)\eta=\alpha$ を満たすとする。任意の $(a,u:Ka\to b)$ について、[移送の特徴づけ](#prop-cat3-07-transport)に $u:Ka\to b$ を入れると

$$
i^b_{a,u}=L(u)i^{Ka}_{a,1_{Ka}}=L(u)\eta_a.
$$

$\theta'$ の自然性を $u$ に適用して

$$
\begin{aligned}
\theta'_b i^b_{a,u}
&=\theta'_b L(u)\eta_a\\
&=H(u)\theta'_{Ka}\eta_a\\
&=H(u)\alpha_a
=\theta_b i^b_{a,u}.
\end{aligned}
$$

よって余極限の媒介射の一意性から $\theta'_b=\theta_b$ が全 $b$ で成立し、$\theta'=\theta$。

**（5）自然な全単射。** 上記の存在・一意性は $\theta\mapsto(\theta K)\eta$ が各 $H$ について全単射であることを意味する。$t:H\Rightarrow H'$ に対して

$$
((t\theta)K)\eta=(tK)(\theta K)\eta
$$

なので $H$ にも自然である。$\mathcal C$ が余完備なら、小圏 $(K\downarrow b)$ の全ての余極限が存在し、仮定が成立する。
<!-- proof-end -->

この定理は「任意の左Kan拡張は常に余極限で書ける」と無条件に言っているわけではない。**comma図式の余極限が存在するという十分条件**のもとで実際に構成した。構成された $L$ と、他の方法で与えられた左Kan拡張は[同型一意性](../CAT3-06/index.md#prop-cat3-06-uniqueness)で比較できる。各値にこの余極限表示が適用できるものを「点ごとの」左Kan拡張と呼ぶ。

## 5. 図式 $F$ 自体が変わったとき

今までは $F$ を固定した。$F\xRightarrow{\sigma}G$ と自然変換が与えられると、同じ添字圏 $(K\downarrow b)$ の各頂点で $\sigma_a:F(a)\to G(a)$ を使える。そこから余極限間の射が得られるはずである。

<a id="prop-cat3-07-functoriality"></a>

<!-- formal-statement-start -->
> **命題（左Kan拡張のFに関する関手性）**
> 小さい圏 $\mathcal A,\mathcal B$、余完備な局所小圏 $\mathcal C$ と $K:\mathcal A\to\mathcal B$ を取る。任意の自然変換 $\sigma:F\Rightarrow G$ に対して、各 $b$ の次の条件は自然変換 $L\sigma:\operatorname{Lan}_K F\Rightarrow\operatorname{Lan}_K G$ を一意に定める。

$$
(L\sigma)_b\,i^{F,b}_{a,u}
=i^{G,b}_{a,u}\,\sigma_a.
$$

> ここで $i^{F,b}_{a,u}$ と $i^{G,b}_{a,u}$ はそれぞれ $F$ と $G$ に対する余極限の脚である。この対応は関手

$$
\operatorname{Lan}_K:[\mathcal A,\mathcal C]
\longrightarrow[\mathcal B,\mathcal C]
$$

> となり、[前合成関手](../CAT3-06/index.md#def-cat3-06-precomposition) $K^*$ の左随伴である。
<!-- formal-statement-end -->

### 証明の見取り図

まず $i^{G,b}_{a,u}\sigma_a$ の余錐条件を自然性で確認する。次に $b$ の射に関する自然性、$\sigma$ の恒等・合成保存を、いずれも余極限の脚との合成で検証する。最後は[前講の左随伴判定](../CAT3-06/index.md#thm-cat3-06-left-adjoint)を使う。

<!-- proof-start -->
### 証明

$(a,u)\xrightarrow{f}(a',u')$ において、$\sigma_{a'}Ff=Gf\,\sigma_a$ だから

$$
\begin{aligned}
i^{G,b}_{a',u'}\sigma_{a'}Ff
&=i^{G,b}_{a',u'}Gf\,\sigma_a\\
&=i^{G,b}_{a,u}\sigma_a.
\end{aligned}
$$

これは $F\pi_b$ から $L_G(b)$ への余錐なので、余極限から唯一の $(L\sigma)_b:L_F(b)\to L_G(b)$ を得る。

$v:b\to b'$ について両経路を同じ脚に合成すると

$$
\begin{aligned}
(L\sigma)_{b'}L_F(v)i^{F,b}_{a,u}
&=(L\sigma)_{b'}i^{F,b'}_{a,vu}
=i^{G,b'}_{a,vu}\sigma_a,\\
L_G(v)(L\sigma)_b i^{F,b}_{a,u}
&=L_G(v)i^{G,b}_{a,u}\sigma_a
=i^{G,b'}_{a,vu}\sigma_a.
\end{aligned}
$$

一意性により $(L\sigma)_{b'}L_F(v)=L_G(v)(L\sigma)_b$。自然変換になった。

$\sigma=1_F$ のとき $(L1_F)_b i^{F,b}_{a,u}=i^{F,b}_{a,u}$ なので $L1_F=1_{L_F}$。$\sigma:F\Rightarrow G$、$\tau:G\Rightarrow J$ のとき

$$
\begin{aligned}
(L\tau)_b(L\sigma)_b i^{F,b}_{a,u}
&=(L\tau)_b i^{G,b}_{a,u}\sigma_a\\
&=i^{J,b}_{a,u}\tau_a\sigma_a\\
&=(L(\tau\sigma))_b i^{F,b}_{a,u}
\end{aligned}
$$

なので $L(\tau\sigma)=L\tau\,L\sigma$。従って $L$ は関手である。

さらに第4節の $\eta_F$ に関して、$b=Ka,u=1_{Ka}$ の構成式は

$$
(L\sigma)_{Ka}\eta_{F,a}=\eta_{G,a}\sigma_a
$$

を意味する。これで $\eta$ は $F$ にも自然である。第4節の $H$ に自然な全単射は、$\sigma$ に関して

$$
\begin{aligned}
((\theta L\sigma)K)\eta_F
&=(\theta K)((L\sigma)K)\eta_F\\
&=(\theta K)\eta_G\sigma
\end{aligned}
$$

を満たすので $F$ にも自然。[前講の随伴の特徴づけ](../CAT3-06/index.md#thm-cat3-06-left-adjoint)により $\operatorname{Lan}_K\dashv K^*$ となる。
<!-- proof-end -->

## 6. 値を手で計算する四つの例と、一つの障害

### 6.1 離散二点を一点へ送る：余積

$\mathcal A$ を異なる二対象 $p,q$ と恒等射だけからなる離散圏、$\mathcal B=\mathbf1$、$K$ を唯一の関手、$F(p)=X,F(q)=Y$ とする。$(K\downarrow*)$ は二対象で恒等射だけの圏なので、[離散図式の余極限](../CAT2-05/index.md#prop-cat2-05-discrete-empty)は余積である。

$$
L(*)=X\amalg Y,\qquad
\eta_p=\iota_X:X\to X\amalg Y,\quad
\eta_q=\iota_Y:Y\to X\amalg Y.
$$

$\mathbf{Set}$ ならタグ付き非交和を使う。任意の集合 $Z$ と写像 $f:X\to Z,g:Y\to Z$ に対し、$[f,g](\iota_Xx)=f(x)$、$[f,g](\iota_Yy)=g(y)$ が唯一の媒介写像となる。$X$ と $Y$ に同じ元があってもタグを付けて衝突を防ぐ必要がある。

### 6.2 一本の矢印を一点へ潰す：終域

$\mathcal A=\mathbf2$、$\mathcal B=\mathbf1$、$K$ は唯一の関手、$F(0)=X,F(1)=Y,F(u)=f:X\to Y$ とする。$(K\downarrow*)$ の対象は $(0,1_*),(1,1_*)$、非恒等射は $u$ 一つなので元の $\mathbf2$ と同型である。脚 $i_0=f:X\to Y$、$i_1=1_Y:Y\to Y$ は余錐をなす。

実際、余錐 $(q_0:X\to Q,q_1:Y\to Q)$ は $q_1f=q_0$ という条件を持つから、唯一の媒介射 $h:Y\to Q$ は $h=q_1$ であり、$hi_0=q_1f=q_0$、$hi_1=q_1$。従って $L(*)=Y$、単位は $\eta_0=f,\eta_1=1_Y$。この計算は、余極限の存在だけでなく脚の内容も決める。

### 6.3 矢印圏へ延ばす：始点と終点で異なる

$\mathcal A=\mathbf1,\mathcal B=\mathbf2,\mathcal C=\mathbf{Set}$ とする。$K(*)=0$ の場合は両comma圏が一対象で、$L=(X\xrightarrow{1_X}X)$。$K(*)=1$ の場合、$(K\downarrow0)$ は空圏なので、[空図式の余極限](../CAT2-05/index.md#prop-cat2-05-discrete-empty)として $L(0)=\varnothing$。$(K\downarrow1)$ は一対象なので $L(1)=X$、射は唯一の $\varnothing\to X$。従って

$$
\operatorname{Lan}_K X=
\begin{cases}
X\xrightarrow{1_X}X & (K(*)=0),\\
\varnothing\longrightarrow X & (K(*)=1).
\end{cases}
$$

これは[前講の普遍性による計算](../CAT3-06/index.md#prop-cat3-06-arrow)とも一致する。始点での値を固定する場合と終点での値を固定する場合で、到達可能な添字が変わるのである。

### 6.4 充満忠実な関手なら元の値を取り戻す

ある $a\in\mathcal A$ に対して $(K\downarrow Ka)$ の対象 $(a,1_{Ka})$ が**終対象**なら、そこへの唯一の射を使い、余極限は $F(a)$ となる。[充満忠実](../CAT1-09/index.md#def-cat1-09-fully-faithful)な $K$ なら、任意の $u:Ka'\to Ka$ は唯一の $f:a'\to a$ に等しく $Kf=u$ なので、$(a',u)\to(a,1_{Ka})$ が一意にある。

<a id="prop-cat3-07-fully-faithful"></a>

<!-- formal-statement-start -->
> **命題（充満忠実なKに沿う左Kan拡張の単位同型）**
> $\mathcal A,\mathcal B$ を小さい圏、$\mathcal C$ を局所小圏とし、$K:\mathcal A\to\mathcal B$ は充満忠実、$F:\mathcal A\to\mathcal C$ は関手とする。各 $(K\downarrow b)$ 上の $F\pi_b$ の余極限が存在するとき、点ごとの左Kan拡張の単位

$$
\eta_a:F(a)\longrightarrow(\operatorname{Lan}_K F)(Ka)
$$

> はすべての $a$ で同型である。
<!-- formal-statement-end -->

### 証明の見取り図

各 $u:Ka'\to Ka$ を充満性で $Kf$ として持ち上げ、忠実性で $f$ を一意にする。すると $(a,1_{Ka})$ はcomma圏の終対象となり、その頂点の値 $F(a)$ が余極限となる。

<!-- proof-start -->
### 証明

$b=Ka$ と固定する。任意の $(a',u:Ka'\to Ka)$ に対し、$K$ の充満性より $Kf=u$ を満たす $f:a'\to a$ が存在し、忠実性より一意である。$1_{Ka}Kf=u$ だから $f:(a',u)\to(a,1_{Ka})$ は唯一の射となり、後者は終対象である。

この終対象に向かう射を $f$ として $Ff:F(a')\to F(a)$ を脚とする。$(a',u)\xrightarrow{g}(a'',u'')$ なら $f''g=f'$ が終対象性から従うので、$Ff''Fg=Ff'$、従って余錐である。任意の余錐 $q_{a',u}$ は射 $f$ に関する関係から

$$
q_{a',u}=q_{a,1_{Ka}}Ff
$$

となり、媒介射は $q_{a,1_{Ka}}:F(a)\to Q$ ただ一つである。よって $F(a)$ は余極限を表す。第3節で選んだ $L(Ka)$ との[余極限の同型一意性](../CAT2-05/index.md#thm-cat2-05-uniqueness)により、その対象から $L(Ka)$ への比較射 $\eta_a=i^{Ka}_{a,1_{Ka}}$ は同型である。
<!-- proof-end -->

充満性だけでは一意な $f$ が保証されず、忠実性だけでは $u$ の持ち上げが保証されない。この二条件が**一つの**終対象を作るために必要である（一般にこの命題の逆は主張しない）。

### 6.5 余完備性を外すと値が作れない

[余完備](../CAT2-05/index.md#def-cat2-05-cocomplete)でない値域では、必要な余極限がないことがある。例えば非空有限集合と全写像の圏 $\mathbf{FinSet}_{\ne\varnothing}$ では空図式の余極限である始対象がない。$\mathcal A=\varnothing,\mathcal B=\mathbf1$、$K$ を唯一の関手とすると $(K\downarrow*)$ も空である。

<a id="prop-cat3-07-obstruction"></a>

<!-- formal-statement-start -->
> **命題（余完備性を外すと存在しない場合）**
> 添字圏を空圏、対象圏を一対象圏とし、$K$ をその間の唯一の関手とする。値域は非空有限集合と全写像の圏とする。

$$
\mathcal A=\varnothing,\qquad
\mathcal B=\mathbf1,\qquad
\mathcal C=\mathbf{FinSet}_{\ne\varnothing}.
$$

> このとき唯一の $F:\mathcal A\to\mathcal C$ の $K$ に沿う左Kan拡張は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

存在したら $L(*)$ から任意の非空有限集合への射が一意となる。しかし二点集合への異なる二つの定数写像が必ずある。

<!-- proof-start -->
### 証明

$F$ と $HK$ は空圏上の関手だから、$\operatorname{Nat}(F,HK)$ は任意の $H:\mathbf1\to\mathcal C$ に対し一元集合である。もし左Kan拡張 $(L,\eta)$ が存在すれば、[左Kan拡張のHom全単射](../CAT3-06/index.md#prop-cat3-06-correspondence)から $\operatorname{Hom}_{\mathcal C}(L(*),H(*))$ も常に一元集合となる。$L(*)$ は非空であり、$H(*)=\{0,1\}$ と置くと異なる定数写像 $x\mapsto0$ と $x\mapsto1$ が存在する。矛盾する。
<!-- proof-end -->

欠けたのは空comma圏の**余極限（始対象）**であり、定理の普遍性の計算そのものに誤りがあったわけではない。

## 7. 演習：値・射・自然性・普遍性を再構成する

### 問題1：comma圏を二通りの値で調べる

- Level: A
- 問題ID: CAT3-07-COMMA-ARROW

$\mathbf2$ を $0\xrightarrow{u}1$ の圏、$\mathbf1$ を一対象 $*$ の圏とする。$K:\mathbf1\to\mathbf2$ が $1$ を選ぶとき、$(K\downarrow0)$ と $(K\downarrow1)$ の対象と射を全て列挙せよ。$F(*)=X$ を集合として $\operatorname{Lan}_K F$ の対象 $0,1$ における値と射 $u$ の像を求めよ。

<!-- solution-start -->
**詳細解答**：$K(*)=1$ である。$1\to0$ の射は $\mathbf2$ に存在しないので、$(K\downarrow0)$ は対象を持たず空圏である。$1\to1$ は恒等射 $1_1$ だけなので $(K\downarrow1)$ は $(*,1_1)$ 一対象と恒等射だけを持つ。

空図式の $\mathbf{Set}$ での余極限は空集合 $\varnothing$ である。実際、任意の集合 $Q$ への余錐は脚を持たず一通り、$\varnothing\to Q$ も一通りである。一対象図式 $X$ の余極限は $X$ 自身で、脚は $1_X$ である。従って

$$
L(0)=\varnothing,\qquad L(1)=X.
$$

$L(u):\varnothing\to X$ は空集合からの唯一の写像である。[射への作用の構成](#prop-cat3-07-transport)では、$0$ 側に脚がないため、この唯一の写像が条件を満たす。単位 $\eta_*:X\to L(K*)=X$ は $1_X$ である。
<!-- solution-end -->

### 問題2：離散二点から余積を作る

- Level: A
- 問題ID: CAT3-07-DISCRETE-COPRODUCT

$\mathcal A$ は離散二点 $p,q$、$\mathcal B=\mathbf1$、$K$ は唯一の関手とする。$F(p)=\{a,b\}$、$F(q)=\{b,c\}$ は集合である。$\operatorname{Lan}_K F(*)$ をタグ付き集合として書き、$H(*)=\{0,1\}$ への二つの写像 $f:F(p)\to H(*)$、$g:F(q)\to H(*)$ が与えられたとき、媒介写像を具体的に定義し一意性を確かめよ。

<!-- solution-start -->
**詳細解答**：$(K\downarrow*)$ の対象は $(p,1_*),(q,1_*)$ で、非恒等射はない。従って $F\pi_*$ は二つの集合だけからなる離散図式であり、余極限は

$$
L(*)=(\{p\}\times\{a,b\})\ \cup\
(\{q\}\times\{b,c\}).
$$

四元は $(p,a),(p,b),(q,b),(q,c)$ であり、文字 $b$ が二度現れても異なる元である。脚は $\iota_p(x)=(p,x)$、$\iota_q(y)=(q,y)$。$f,g$ から作る媒介写像 $h:L(*)\to\{0,1\}$ を

$$
h(p,x)=f(x)\quad(x\in F(p)),\qquad
h(q,y)=g(y)\quad(y\in F(q))
$$

と定める。タグが違うので両指定は衝突せず写像になる。$h\iota_p=f$、$h\iota_q=g$ である。別の $h'$ が両等式を満たすなら、$L(*)$ の全ての元はどちらかの脚の像だから $h'(p,x)=f(x)=h(p,x)$、$h'(q,y)=g(y)=h(q,y)$、ゆえに $h'=h$。
<!-- solution-end -->

### 問題3：矢印図式を一点へ潰す

- Level: A
- 問題ID: CAT3-07-ARROW-COLLAPSE

$K:\mathbf2\to\mathbf1$ を唯一の関手、$F(0)=\{x,y\}$、$F(1)=\{z\}$、$F(u)$ を唯一の写像とする。$(K\downarrow*)$ の射を調べ、余極限対象と二つの脚を求めよ。任意の余錐 $(q_0,q_1)$ の媒介射を示せ。

<!-- solution-start -->
**詳細解答**：$K(0)=K(1)=*$ で、$K(u)=1_*$。comma圏の対象は $(0,1_*),(1,1_*)$、非恒等射は $u:(0,1_*)\to(1,1_*)$ である。$1_*K(u)=1_*$ なので射の条件を満たす。

$F\pi_*$ は二点集合から一元集合への写像 $f:\{x,y\}\to\{z\}$ だから、余極限は $\{z\}$ で、脚は $i_0=f$ と $i_1=1_{\{z\}}$ である。余錐 $(q_0,q_1)$ の条件は $q_1f=q_0$。媒介写像は $h=q_1:\{z\}\to Q$ とすれば

$$
hi_0=q_1f=q_0,\qquad hi_1=q_1.
$$

$hi_1=q_1$ と $i_1=1$ から $h=q_1$ に強制されるので一意である。単位の成分は $\eta_0=f,\eta_1=1_{\{z\}}$ となる。
<!-- solution-end -->

### 問題4：単位の自然性を手で追う

- Level: A
- 問題ID: CAT3-07-UNIT-NATURALITY

小圏 $\mathcal A,\mathcal B$、関手 $K:\mathcal A\to\mathcal B$ と $F:\mathcal A\to\mathcal C$ について、comma図式の必要な余極限が存在するとする。射 $f:a\to a'$ を固定する。$(K\downarrow Ka')$ に現れる特定の射を一つ構成し、その余錐関係と $L(Kf)$ の特徴づけだけから

$$
\eta_{a'}Ff=L(Kf)\eta_a
$$

を導け。各辺の始域・終域も記せ。

<!-- solution-start -->
**詳細解答**：$(K\downarrow Ka')$ の二対象 $(a,Kf)$ と $(a',1_{Ka'})$ を考える。$1_{Ka'}Kf=Kf$ より $f:(a,Kf)\to(a',1_{Ka'})$ はcomma圏の射である。余錐関係は

$$
i^{Ka'}_{a',1_{Ka'}}Ff=i^{Ka'}_{a,Kf}.
$$

一方、[移送の構成](#prop-cat3-07-transport)に $\mathcal B$ の射 $Kf:Ka\to Ka'$ と $(a,1_{Ka})$ を入れると

$$
L(Kf)i^{Ka}_{a,1_{Ka}}=i^{Ka'}_{a,Kf}.
$$

単位の定義 $\eta_{a'}=i^{Ka'}_{a',1_{Ka'}}$ と $\eta_a=i^{Ka}_{a,1_{Ka}}$ を両式に代入し、共通する右辺を消去すれば要求する式が得られる。両辺の型は $F(a)\to L(Ka')$ である。
<!-- solution-end -->

### 問題5：空comma圏による非存在

- Level: A
- 問題ID: CAT3-07-NONEXISTENCE

$\mathcal A=\varnothing,\mathcal B=\mathbf1$、$K$ を唯一の関手とする。値域 $\mathcal C$ を非空有限集合とその全写像の圏とする。もし左Kan拡張 $(L,\eta)$ が存在するとすれば、どのHom集合が一元集合になるかを書き、なぜ二点集合が矛盾を与えるか示せ。失われた仮定を特定せよ。

<!-- solution-start -->
**詳細解答**：任意の $H:\mathbf1\to\mathcal C$ に対し、空圏上の自然変換 $F\Rightarrow HK$ は成分の指定がないので唯一である。従って左Kan拡張の普遍性は

$$
\operatorname{Hom}_{\mathcal C}(L(*),H(*))\cong\{*\}
$$

を全 $H$ に要求する。しかし $S=L(*)$ は非空であり、$H(*)=\{0,1\}$ と選べば $S$ からの定数写像 $c_0(x)=0,c_1(x)=1$ は異なる二つの射である。よって全単射は不可能。この圏には空図式の余極限である始対象がなく、[点ごとの公式](#thm-cat3-07-pointwise)の**余極限存在仮定**が破れる。余完備性を外しても自動的に存在するわけではない。
<!-- solution-end -->

### 問題6：別々の位置から来る値を貼り合わせる

- Level: B
- 問題ID: CAT3-07-MIXED-ARROW

$\mathcal A$ を離散二点 $p,q$ とし、$\mathcal B=\mathbf2$ は $0\xrightarrow{v}1$ の圏とする。$K(p)=0,K(q)=1$、$F(p)=X,F(q)=Y$ は集合とする。

1. $(K\downarrow0),(K\downarrow1)$ を記述し、$L(0),L(1),L(v)$ と単位 $\eta_p,\eta_q$ を全て求めよ。
2. $H=(Z_0\xrightarrow{h}Z_1)$ と $\alpha_p:X\to Z_0,\alpha_q:Y\to Z_1$ が与えられたとき、唯一の自然変換 $\theta:L\Rightarrow H$ を成分ごとに書き、自然性と比較条件を検証せよ。

<!-- solution-start -->
**詳細解答**：

1. $0$ へ向かう $Kp=0$ からの射は $1_0$ だけ、$Kq=1$ から $0$ への射はない。従って $(K\downarrow0)$ は $(p,1_0)$ 一対象。$1$ へは $Kp=0$ から $v$、$Kq=1$ から $1_1$ が届き、$\mathcal A$ は離散なのでcomma圏に両者間の射はない。よって

   $$
   L(0)=X,\qquad L(1)=X\amalg Y.
   $$

   $0\to1$ の[移送](#prop-cat3-07-transport)は $(p,1_0)$ を $(p,v)$ に送るため、$L(v)=\iota_X:X\to X\amalg Y$。単位は $\eta_p=1_X$、$\eta_q=\iota_Y:Y\to X\amalg Y$ となる。

2. $K$ の定義域は離散なので、$\alpha_p,\alpha_q$ は自動的に自然変換 $\alpha:F\Rightarrow HK$ をなす。比較条件 $\theta_0\eta_p=\alpha_p$ より $\theta_0=\alpha_p$、$\theta_1\eta_q=\alpha_q$ より $\theta_1\iota_Y=\alpha_q$。さらに $v$ に関する $\theta$ の自然性は

   $$
   \theta_1\iota_X=h\theta_0=h\alpha_p.
   $$

   だから

   $$
   \theta_1=[h\alpha_p,\alpha_q]:
   X\amalg Y\longrightarrow Z_1.
   $$

   この写像は二つの脚上で定められ、余積の普遍性で存在し一意である。$\theta_1L(v)=\theta_1\iota_X=h\alpha_p=h\theta_0$ なので自然性が成立し、$\theta_{Kp}\eta_p=\alpha_p$、$\theta_{Kq}\eta_q=\alpha_q$ なので比較条件も成立する。別の $\theta'$ は各脚上の値が同じため $\theta'=\theta$ である。
<!-- solution-end -->

### 問題7：充満忠実性はどこに使われるか

- Level: B
- 問題ID: CAT3-07-FULLY-FAITHFUL

$K:\mathcal A\to\mathcal B$ を小圏間の充満忠実な関手とし、$F:\mathcal A\to\mathcal C$ に必要なcomma余極限が全て存在するとする。各 $a$ について $(a,1_{Ka})$ が $(K\downarrow Ka)$ の終対象であることを証明せよ。その結果、$\eta_a$ が同型になることを、余極限の脚を用いて説明せよ。また充満性と忠実性がそれぞれどこに必要か指摘せよ。

<!-- solution-start -->
**詳細解答**：任意の $(a',u:Ka'\to Ka)$ を取る。$K$ が充満なので $u=Kf$ を満たす $f:a'\to a$ があり、$1_{Ka}Kf=u$ によりcomma圏の射となる。$K$ が忠実なので $Kf=Kg$ なら $f=g$、従ってこの射は一意。全対象から唯一の射が到達するため $(a,1_{Ka})$ は終対象である。

その対象を頂点とする $F(a)$ への余錐は、各 $(a',u)$ で唯一の $f$ に $Ff:F(a')\to F(a)$ を割り当てる。射の合成に関する整合性は終対象への射の一意性で従う。任意の余錐 $q$ は

$$
q_{a',u}=q_{a,1_{Ka}}Ff
$$

を満たし、唯一の媒介射は $q_{a,1_{Ka}}$ である。ゆえに $F(a)$ が余極限を表す。選ばれた余極限 $L(Ka)$ への脚 $i^{Ka}_{a,1_{Ka}}=\eta_a$ は、この二つの余極限対象間の唯一の同型となる。充満性を外すと射 $f$ の**存在**が、忠実性を外すと**一意性**が保証されず、終対象性の証明が止まる。
<!-- solution-end -->

### 問題8：$F$ の変化を余積へ運ぶ

- Level: B
- 問題ID: CAT3-07-FUNCTOR-IN-F

$\mathcal A$ を離散二点 $p,q$、$\mathcal B=\mathbf1$、$K$ を唯一の関手とする。$F(p)=X,F(q)=Y$、$G(p)=X',G(q)=Y'$ とし、自然変換 $\sigma:F\Rightarrow G$ は二写像 $s:X\to X',t:Y\to Y'$ からなる。$(L\sigma)_*:X\amalg Y\to X'\amalg Y'$ を定義し、別の $\tau:G\Rightarrow J$（成分 $r:X'\to X'',z:Y'\to Y''$）に対して $L(\tau\sigma)=L\tau\,L\sigma$ を元の像から示せ。

<!-- solution-start -->
**詳細解答**：余極限の脚は余積への包含 $\iota_X,\iota_Y$、$G$ 側では $\iota_{X'},\iota_{Y'}$ である。従って[関手性の命題](#prop-cat3-07-functoriality)が要求する写像は

$$
(L\sigma)_*(\iota_Xx)=\iota_{X'}s(x),\qquad
(L\sigma)_*(\iota_Yy)=\iota_{Y'}t(y).
$$

タグ付き非交和なのでこの指定で全元に一意に値が定まり、余積の脚との等式も成立する。$\tau$ に対する $L\tau$ は同様に $\iota_{X'}x'\mapsto\iota_{X''}r(x')$、$\iota_{Y'}y'\mapsto\iota_{Y''}z(y')$。従って

$$
\begin{aligned}
(L\tau)(L\sigma)(\iota_Xx)
&=(L\tau)(\iota_{X'}s(x))\\
&=\iota_{X''}r(s(x))
=L(\tau\sigma)(\iota_Xx),\\
(L\tau)(L\sigma)(\iota_Yy)
&=\iota_{Y''}z(t(y))
=L(\tau\sigma)(\iota_Yy).
\end{aligned}
$$

$X\amalg Y$ の全元は二つの脚の像なので二写像は等しい。恒等自然変換の場合は両成分が恒等写像となり $L1_F=1_{X\amalg Y}$ も直接分かる。
<!-- solution-end -->

### 問題9：順序圏では余極限が和集合になる

- Level: B
- 問題ID: CAT3-07-POSET-JOIN

$S$ を集合とし、$\mathcal C=\mathcal P(S)$ を部分集合を対象、包含関係を唯一の射とする順序圏とする。$\mathcal A$ は離散二点 $p,q$、$\mathcal B=\mathbf1$、$K$ は唯一の関手。$F(p)=P\subseteq S,F(q)=Q\subseteq S$ とする。

1. $\operatorname{Lan}_K F(*)$ を求め、余極限の普遍性を包含関係で確認せよ。
2. $\mathcal C$ を「$S$ の非空部分集合だけ」の順序圏に変えた場合、$P,Q$ が非空なら今回の余極限はあるか。また空のcomma図式の余極限は必ずあるか。

<!-- solution-start -->
**詳細解答**：

1. $(K\downarrow*)$ は離散二点なので、余錐の頂点 $T\subseteq S$ の条件は $P\subseteq T$ および $Q\subseteq T$ である。これは $P\cup Q\subseteq T$ と同値であり、$P\cup Q$ 自身は両包含を満たす。従って最小の余錐頂点は

   $$
   L(*)=P\cup Q.
   $$

   $P\hookrightarrow P\cup Q$ と $Q\hookrightarrow P\cup Q$ が脚である。任意の上界 $T$ には $P\cup Q\subseteq T$ という射が唯一あり、順序圏では射の一意性が自動的なので余極限の普遍性を満たす。

2. $P,Q$ が非空なら $P\cup Q$ も非空なのでこの二点図式の余極限は存在する。一方、空図式の余極限はこの順序圏の始対象、すなわち全ての非空部分集合に含まれる非空部分集合でなければならない。$S$ が二元以上なら互いに素な非空単元集合があり、その双方に含まれる非空集合はない。従って必ず存在するわけではない。必要なのは今回のcomma図式ごとの余極限であり、圏全体の余完備性は十分条件にすぎない。
<!-- solution-end -->

### 問題10：Kan拡張を二回行うことと一回行うこと

- Level: C
- 問題ID: CAT3-07-COMPOSITION

$\mathcal A,\mathcal B,\mathcal D$ を小さい圏、$\mathcal C$ を余完備な局所小圏とする。関手 $K:\mathcal A\to\mathcal B$、$J:\mathcal B\to\mathcal D$、$F:\mathcal A\to\mathcal C$ を取る。点ごとの構成により $(L,\eta^K)=\operatorname{Lan}_K F$ と $(M,\eta^J)=\operatorname{Lan}_J L$ を選び、各 $\eta^J_b:L(b)\to M(Jb)$ とする。

1. $\zeta_a=\eta^J_{Ka}\eta^K_a:F(a)\to M(JKa)$ が自然変換 $\zeta:F\Rightarrow MJK$ を定めることを示せ。
2. 任意の $H:\mathcal D\to\mathcal C$ と $\alpha:F\Rightarrow HJK$ について、$\alpha=(\theta JK)\zeta$ を満たす唯一の $\theta:M\Rightarrow H$ を、**二回の普遍性**を順に適用して構成せよ。
3. この結果から、$M$ と一点ごとの余極限公式による $\operatorname{Lan}_{JK}F$ は自然同型であると結論せよ。余極限の添字圏が異なるから等号とは主張しないこと。

<!-- solution-start -->
**詳細解答**：

1. $\eta^K:F\Rightarrow LK$、$\eta^J:L\Rightarrow MJ$ はそれぞれ[点ごとの左Kan拡張の定理](#thm-cat3-07-pointwise)による自然変換である。$f:a\to a'$ について $\eta^K_{a'}Ff=L(Kf)\eta^K_a$、$\eta^J_{Ka'}L(Kf)=M(JKf)\eta^J_{Ka}$ なので

   $$
   \begin{aligned}
   \zeta_{a'}Ff
   &=\eta^J_{Ka'}\eta^K_{a'}Ff\\
   &=\eta^J_{Ka'}L(Kf)\eta^K_a\\
   &=M(JKf)\eta^J_{Ka}\eta^K_a\\
   &=M(JKf)\zeta_a.
   \end{aligned}
   $$

   両辺は $F(a)\to M(JKa')$ であり、自然性が成り立つ。

2. まず関手 $HJ:\mathcal B\to\mathcal C$ に対し、$(L,\eta^K)$ の普遍性へ $\alpha:F\Rightarrow(HJ)K$ を入力する。唯一の $\beta:L\Rightarrow HJ$ が存在して

   $$
   \alpha=(\beta K)\eta^K
   $$

   を満たす。次に $(M,\eta^J)$ の普遍性へこの $\beta:L\Rightarrow HJ$ を入力する。唯一の $\theta:M\Rightarrow H$ が存在して

   $$
   \beta=(\theta J)\eta^J
   $$

   を満たす。従って各 $a$ で

   $$
   \begin{aligned}
   \alpha_a
   &=\beta_{Ka}\eta^K_a\\
   &=\theta_{JKa}\eta^J_{Ka}\eta^K_a\\
   &=(\theta JK)_a\zeta_a.
   \end{aligned}
   $$

   別の $\theta'$ が同じ $\alpha$ を与えるとし、$\beta'=(\theta'J)\eta^J$ と置くと $\alpha=(\beta'K)\eta^K$。第一段階の一意性から $\beta'=\beta$、次に第二段階の一意性から $\theta'=\theta$ となる。

3. 2は $(M,\zeta)$ が[左Kan拡張の定義](../CAT3-06/index.md#def-cat3-06-left-kan)を満たすことを示した。$\mathcal C$ は余完備で、$JK:\mathcal A\to\mathcal D$ に対するcomma圏 $(JK\downarrow d)$ は小さいので、[点ごとの公式](#thm-cat3-07-pointwise)から別の左Kan拡張 $N=\operatorname{Lan}_{JK}F$ が構成できる。[同型一意性](../CAT3-06/index.md#prop-cat3-06-uniqueness)により比較を保つ唯一の自然同型

   $$
   M=\operatorname{Lan}_J(\operatorname{Lan}_K F)
   \xrightarrow{\ \cong\ }\operatorname{Lan}_{JK}F=N
   $$

   が得られる。左辺は二段階のcomma余極限、右辺は $(JK\downarrow d)$ の一段階の余極限であり、構成上の等号は不要である。
<!-- solution-end -->

## 8. 次の講義へ

本講で、左Kan拡張の普遍性は「各 $b$ に届く射 $Ka\to b$ を添字にした余極限」という**計算可能な構成**になった。値、$b$ の射、$F$ の自然変換、単位と自然全単射を全て確認した。

次の CAT3-08「点ごとの右Kan拡張」では向きを反転し、$b\to Ka$ を集めるcomma圏上の**極限**から右Kan拡張を構成する。左右を単なる名前の交換で済ませず、射と比較の向きを一つずつ検算する。
