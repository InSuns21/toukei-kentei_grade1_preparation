# AG3-06 準連接層・連接層

前章で[ファイバー積](../AG3-05/index.md#thm-ag3-05-affine-product)を構成し、環をテンソル積で動かせるようになりました。しかし、スキーム上の「関数以外の情報」、例えば方程式の関係式、イデアル、線束の切断を一括して運びたいとき、構造層 $\mathcal O_X$ だけでは足りません。各アフィン開集合の上で加群を考え、局所化したものが重なりで一致するように貼ればよさそうです。

この章では、まず一つの $A$-加群 $M$ から $\operatorname{Spec}A$ 上の層 $\widetilde M$ を作り、茎が $M_{\mathfrak p}$ になることを証明します。次に、局所的にその形をした準連接層を定義して、アフィンスキームでは加群の理論と正確に対応することを示します。最後に、有限個の生成元で済むか、関係式まで有限個で済むかを区別し、Noether条件の役割を調べます。

以下、環は可換・単位的とします。$A$ は任意の環、$X=\operatorname{Spec}A$、$\mathcal O_X$ は[素スペクトルの構造層](../AG3-02/index.md#def-ag3-02-structure-sheaf)です。必要な場所でのみ $A$ に Noether 条件を課します。

## 1. 加群を各主開集合に割り当てる

[局所化](../AG1-04/index.md#def-ag1-04-localization)は環だけでなく加群にも適用できます。$A$-加群 $M$ と $f\in A$ に対し、$M_f$ の元は $m/f^r$ で表され、二つの分数はある $N\ge0$ に対して

$$
f^N(f^s m-f^r n)=0
$$

を満たすとき等しいとします。環の場合と同様に、$D(g)\subseteq D(f)$ なら $f$ は $A_g$ で単元となり、$M_f\to M_g$ という制限が定まります。

最初の例として、$A=k[t]$、$M=A/(t^2)$ を見ます。$D(t)$ では $t$ が逆元を持つため、$t^2\bar1=0$ から $\bar1=0$ になり $M_t=0$ です。一方 $(t)$ の点の近くでは、$M_{(t)}=k[t]_{(t)}/(t^2)$ に非零の $\bar t$ が残ります。同じ加群でも、点によって消えたり残ったりします。

<a id="def-ag3-06-tilde-module"></a>

<!-- formal-statement-start -->
> **定義（加群に付随する層）**  
> 可換環 $A$ と $A$-加群 $M$ に対して、$X=\operatorname{Spec}A$ 上の各主開集合 $D(f)$ に $M_f$ を対応させ、包含に対する局所化写像を制限とする。このデータから得られる $\mathcal O_X$-加群の層を $\widetilde M$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-06-tilde-module -->
**定義の確認。** $M=A$ では $M_f=A_f$ なので、[主開集合上の構造層の切断](../AG3-02/index.md#thm-ag3-02-principal-sections)と一致し、$\widetilde A=\mathcal O_X$ になります。$M=A/(t^2)$ の上の例では $D(t)$ 上の切断は $0$、点 $(t)$ の茎は非零です。制限と局所化が同じ規則で動くことを直接確かめられます。
<!-- definition-example-end -->

この割当てが本当に層を定めるには、局所的に一致する分数が一つに貼れることが必要です。

<a id="thm-ag3-06-tilde-sheaf"></a>

<!-- formal-statement-start -->
> **定理（加群から層への構成）**  
> $A$ を可換環、$M$ を $A$-加群、$X=\operatorname{Spec}A$ とする。主開集合への割当て $D(f)\mapsto M_f$ は層に一意に延長される。得られる層 $\widetilde M$ について
>
> （1）各 $f\in A$ に対し $\Gamma(D(f),\widetilde M)\simeq M_f$。
>
> （2）各素イデアル $\mathfrak p$ に対し $(\widetilde M)_{\mathfrak p}\simeq M_{\mathfrak p}$。
>
> （3）$\Gamma(X,\widetilde M)\simeq M$。
<!-- formal-statement-end -->

### 証明の見取り図

主開集合 $D(f)$ の有限主開被覆を取り、$A_f$ へ基底環を替えます。被覆する元が生成するイデアルは単位イデアルです。この恒等式を使って、局所分数の分母を払って足し合わせます。茎では、点を含む主開近傍をすべて動かすことが、$\mathfrak p$ の外の元で局所化することと一致します。

<!-- proof-start -->
### 証明

まず $D(f)=\operatorname{Spec}A_f$ に取り直します。主開被覆 $D(g_1),\ldots,D(g_r)$ が $X$ を覆うとします。このとき $(g_1,\ldots,g_r)=A$ です。実際、真のイデアルならそれを含む極大イデアルがあり、その素点は被覆に含まれません。

各 $D(g_i)$ に切断 $s_i=m_i/g_i^{e_i}\in M_{g_i}$ があり、$D(g_ig_j)$ では一致するとします。$g_i$ をさらにべき乗しても主開集合は変わらないため、共通の指数 $N$ を十分大きく取れます。具体的には各 $i,j$ について等式 $s_i=s_j$ が $M_{g_ig_j}$ で成り立つので、ある $n_{ij}$ が存在して

$$
(g_ig_j)^{n_{ij}}(g_j^{e_j}m_i-g_i^{e_i}m_j)=0
$$

です。$N\ge e_i+n_{ij}$ を全ての組について満たすよう選ぶと、$u_i=g_i^Ns_i\in M$ と表せ、さらに $M_{g_j}$ の中で

$$
g_i^N(s_i-s_j)=0
$$

が成立します（$s_i$ は $M_{g_ig_j}$ の元として解釈し、左辺は $M_{g_j}$ の元へ分母を払って戻します）。$(g_1^N,\ldots,g_r^N)=A$ なので、ある $a_i\in A$ があって $\sum_i a_ig_i^N=1$ です。ここで

$$
m=\sum_{i=1}^r a_i u_i\in M
$$

と置くと、$M_{g_j}$ において

$$
m-s_j=\sum_i a_ig_i^N(s_i-s_j)=0
$$

です。従って $m$ は指定された局所切断を貼り合わせます。

一意性も直接示します。$m\in M$ が各 $M_{g_i}$ で $0$ なら、ある $n_i$ で $g_i^{n_i}m=0$ です。$N\ge\max_i n_i$ とすれば

$$
m=\Big(\sum_i a_ig_i^N\Big)m
=\sum_i a_i(g_i^Nm)=0.
$$

任意の主開集合について同じ議論を $A_f,M_f$ で行えます。主開集合は位相の基底なので、この一致性と貼り合わせにより一意の層が得られ、（1）が成り立ちます。

点 $\mathfrak p$ の主開近傍は $f\notin\mathfrak p$ を満たす $D(f)$ です。その切断をさらに小さい近傍で同一視して得る茎は

$$
(\widetilde M)_{\mathfrak p}
=\varinjlim_{f\notin\mathfrak p}M_f
\simeq (A\setminus\mathfrak p)^{-1}M=M_{\mathfrak p}.
$$

分数 $m/f^n$ を局所化の同じ分数へ送る写像は、さらに局所化して等しくなる場合をちょうど同一視するので全単射です。これで（2）。最後に $D(1)=X$、$M_1=M$ から（3）を得ます。
<!-- proof-end -->

この定理から、$M$ の情報は「大域切断だけ」にも「各点の茎」にも現れます。ただし、一般のスキームではすべての層が一つの大域加群から復元できるわけではありません。

## 2. 準連接層は局所的に加群から作れる層

既に[可逆層](../AG2-06/index.md#def-ag2-06-invertible-sheaf)を、局所的に $\mathcal O_X$ に同型な加群の層として扱いました。そこでは局所自由という強い条件を課しましたが、方程式の商加群 $A/I$ などは一般には自由になりません。自由かどうかを問わず、各アフィン開集合で $\widetilde M$ として記述できることを条件にします。

<a id="def-ag3-06-quasicoherent"></a>

<!-- formal-statement-start -->
> **定義（準連接層）**  
> スキーム $X$ 上の $\mathcal O_X$-加群の層 $\mathcal F$ が準連接層であるとは、$X$ にアフィン開被覆 $U_i=\operatorname{Spec}A_i$ が存在し、各 $i$ についてある $A_i$-加群 $M_i$ と $\mathcal O_{U_i}$-加群の層同型
>
> $$
> \mathcal F|_{U_i}\simeq\widetilde {M_i}
> $$
>
> が存在することをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-06-quasicoherent -->
**定義の確認。** $X=\operatorname{Spec}k[t]$、$I=(t^2)$ とすれば $\mathcal F=\widetilde{k[t]/(t^2)}$ は被覆が $X$ 一枚で済む準連接層です。点 $(t)$ における茎は $k[t]_{(t)}/(t^2)$、$D(t)$ への制限は零です。$k[t]/(t^2)$ が自由である必要はなく、まさにそれを許すための定義です。
<!-- definition-example-end -->

別の例として、[射影直線上の $\mathcal O(1)$](../AG2-06/index.md#def-ag2-06-twisting-sheaf) は二つのアフィンチャートのそれぞれで $\mathcal O$ と同型です。従って準連接ですが、一般に $\mathcal O(1)$ は一つの大域的自由加群の層としては記述できません。アフィン性が重要です。

<a id="thm-ag3-06-affine-equivalence"></a>

<!-- formal-statement-start -->
> **定理（アフィンスキーム上の準連接層と加群）**  
> $A$ を可換環、$X=\operatorname{Spec}A$ とする。$A$-加群 $M$ から $\widetilde M$ を作る対応と、準連接層 $\mathcal F$ から $\Gamma(X,\mathcal F)$ を取る対応は互いに逆の同値を与える。特に準連接層 $\mathcal F$ と $f\in A$ について
>
> $$
> \Gamma(X,\mathcal F)_f
> \simeq \Gamma(D(f),\mathcal F),
> \qquad
> \widetilde{\Gamma(X,\mathcal F)}\simeq\mathcal F.
> $$
>
> また任意の $A$-加群 $M,N$ に対し、層の射には自然な全単射がある。
>
> $$
> \operatorname{Hom}_A(M,N)\simeq
> \operatorname{Hom}_{\mathcal O_X}(\widetilde M,\widetilde N).
> $$
<!-- formal-statement-end -->

### 証明の見取り図

各アフィン開チャートでは $\mathcal F$ はある加群の局所化で記述されています。$X$ を有限個の主開集合で覆い、局所的に分母を払います。重複部分で一致する条件をもう一度分母を払って揃えると、大域切断から各主開集合の切断を復元できます。射についても $X=D(1)$ 上の作用を決めれば、すべての局所化で一意に決まります。

<!-- proof-start -->
### 証明

まず局所補題を示します。$\mathcal F$ が準連接であるとき、任意の点には $\mathcal F|_{D(g)}\simeq\widetilde N$ となる主開近傍 $D(g)$ が存在します。実際、準連接の定義によるアフィン開 $U$ の中にその点を含む主開 $D(g)$ を取ります。[主開集合のアフィン性](../AG3-03/index.md#prop-ag3-03-principal-affine)と $\widetilde M$ の主開への制限が局所化であることから成立します。

$X$ は[準コンパクト](../AG3-02/index.md#thm-ag3-02-quasicompact)なので、有限個の $D(g_i)$ で $X$ を覆えて、$\mathcal F|_{D(g_i)}=\widetilde{N_i}$ と書けます。任意の $f\in A$ に対して自然な写像

$$
\alpha_f:\Gamma(X,\mathcal F)_f\longrightarrow
\Gamma(D(f),\mathcal F)
$$

を考えます。左辺の $s/f^n$ を $D(f)$ 上で $f^{-n}s|_{D(f)}$ へ送る写像です。

**単射。** $\alpha_f(s/f^n)=0$ なら、$s$ は $D(f)$ 上で零です。各 $D(g_i)$ では $s_i\in N_i$、その $f$ による局所化が零なので、ある $r_i$ で $f^{r_i}s_i=0$。$r=\max r_i$ とすると $f^r s$ は有限被覆の各部分で零、従って層の一意性から $f^r s=0$ です。このため $s/f^n=0$。

**全射。** $t\in\Gamma(D(f),\mathcal F)$ を取ります。各 $D(fg_i)$ 上の切断は $(N_i)_f$ の元なので、ある $n_i$ と $u_i\in N_i$ で $t|_{D(fg_i)}=u_i/f^{n_i}$ です。$n=\max n_i$ に揃えると $f^n t$ は各 $D(g_i)$ に切断 $v_i=f^{n-n_i}u_i$ として延長します。ただし $v_i,v_j$ が重複部分 $D(g_ig_j)$ で直ちに一致するとは限りません。両者は $D(fg_ig_j)$ 上で一致し、$\mathcal F|_{D(g_ig_j)}$ は局所化から来る層なので、ある $r_{ij}$ で

$$
f^{r_{ij}}(v_i-v_j)|_{D(g_ig_j)}=0.
$$

有限個の組について $r=\max r_{ij}$ とすれば、$f^rv_i$ はすべての重複部分で一致します。層の貼り合わせにより $s\in\Gamma(X,\mathcal F)$ が存在し、$D(f)$ では $s=f^{n+r}t$ です。従って $\alpha_f(s/f^{n+r})=t$ となり全射です。

この同型は $D(f)$ をさらに制限したときにも可換で、主開基底上の切断をすべて同定します。従って[加群から層への構成](#thm-ag3-06-tilde-sheaf)により $\widetilde{\Gamma(X,\mathcal F)}\simeq\mathcal F$ です。逆方向は $\Gamma(X,\widetilde M)=M$ で既に示しました。

最後に層の射 $\phi:\widetilde M\to\widetilde N$ があれば、$X$ 上で $A$-線形写像 $u=\phi_X:M\to N$ を得ます。$D(f)$ 上では $f$ が単元なので、$\phi_{D(f)}(m/f^n)=u(m)/f^n$ を満たす以外にありません。逆に任意の $u$ の局所化 $u_f$ は制限と可換な層の射を定めます。二つの対応は互いに逆です。
<!-- proof-end -->

アフィンの場合の対応は便利ですが、**任意の層**について成り立つわけではありません。準連接という仮定こそ、局所化での再構成を可能にしている条件です。

## 3. 準連接層の射・完全性と基底変換

$\widetilde M$ は加群を幾何へ運ぶだけでなく、加群の列の「どこで完全か」という性質も保存します。

<a id="prop-ag3-06-exactness"></a>

<!-- formal-statement-start -->
> **命題（加群列と準連接層の完全性）**  
> $A$ を可換環とする。$A$-加群列
>
> $$
> M'\xrightarrow{u}M\xrightarrow{v}M''
> $$
>
> が $M$ で完全であることと、$X=\operatorname{Spec}A$ 上の層の列
>
> $$
> \widetilde{M'}\xrightarrow{\widetilde u}
> \widetilde M\xrightarrow{\widetilde v}\widetilde{M''}
> $$
>
> が $\widetilde M$ で完全であることは同値である。ここで層の完全性は各茎での完全性をいう。
<!-- formal-statement-end -->

### 証明の見取り図

局所化は完全です。逆向きは、加群の非零元がすべての素イデアルで同時に消えることはない、という事実を核と像の商に使います。

<!-- proof-start -->
### 証明

$u,v$ が合成零で $\operatorname{im}u=\ker v$ とします。[茎の表示](#thm-ag3-06-tilde-sheaf)から $\mathfrak p$ での列は $M'_{\mathfrak p}\to M_{\mathfrak p}\to M''_{\mathfrak p}$ です。局所化は核・像を保つので、各茎で完全です。

逆に茎の列がすべて完全なら、$v\circ u$ は各 $\mathfrak p$ で零です。ある元 $x\in M'$ の像 $y=(v\circ u)(x)\ne0$ が存在すると仮定します。$y$ の消去イデアル $\operatorname{Ann}(y)$ は真のイデアルだから、これを含む極大イデアル $\mathfrak m$ が存在します。もし $y/1=0$ in $M''_{\mathfrak m}$ なら $s\notin\mathfrak m$ で $sy=0$ となり、$s\in\operatorname{Ann}(y)\subseteq\mathfrak m$ に矛盾します。従って合成は零です。

そこで $Q=\ker v/\operatorname{im}u$ とします。局所化の完全性と茎の仮定から各 $Q_{\mathfrak p}=0$ です。$Q\ne0$ なら先ほどと同じ消去イデアルの議論で非零の局所化を持ち矛盾します。従って $Q=0$、すなわち加群列も完全です。
<!-- proof-end -->

<a id="prop-ag3-06-affine-base-change"></a>

<!-- formal-statement-start -->
> **命題（アフィン射による引戻し）**  
> 環準同型 $A\to B$ が定めるスキームの射 $f:\operatorname{Spec}B\to\operatorname{Spec}A$ と $A$-加群 $M$ に対し、$\mathcal O_{\operatorname{Spec}B}$-加群の層として自然な同型がある。
>
> $$
> f^*(\widetilde M)\simeq\widetilde{B\otimes_A M}.
> $$
>
> ここで $f^*\mathcal F=f^{-1}\mathcal F\otimes_{f^{-1}\mathcal O_X}\mathcal O_Y$ は加群の層の引戻しを表す。
<!-- formal-statement-end -->

### 証明の見取り図

自由加群では基底ごとに成り立ちます。一般の加群は自由加群の表示を持ち、テンソル積と層の引戻しはいずれも右完全なので、関係式の商に降ろせます。

<!-- proof-start -->
### 証明

任意の $M$ について（無限集合を許す）自由表示 $A^{(J)}\to A^{(I)}\to M\to0$ を取ります。$A^{(I)}$ の各標準基底を局所化すると $\widetilde{A^{(I)}}\simeq\mathcal O_X^{(I)}$ です。$f^*$ は層のテンソル積として右完全であり、直和を保ちます。従って表示を引き戻したものは

$$
\mathcal O_Y^{(J)}\longrightarrow\mathcal O_Y^{(I)}
\longrightarrow f^*\widetilde M\longrightarrow0
$$

です。各写像の行列係数は $A\to B$ で移るので、この余核は $B^{(J)}\to B^{(I)}$ の余核を層化したものと一致します。一方 [テンソル積](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)の右完全性により $B\otimes_A M$ は $B^{(J)}\to B^{(I)}$ の余核です。両者を同定して結論を得ます。局所的には $b\otimes m$ を $b$ 倍した $m$ の引戻しへ送る写像です。
<!-- proof-end -->

この式は前章の[基底変換](../AG3-05/index.md#def-ag3-05-base-change)を加群の層に拡張したものです。ただし任意の単射が引戻し後にも単射のままとは限りません。この失敗を平坦性として扱うのは後の章です。

## 4. 有限生成と有限表示は違う

加群が有限個の元で生成されるとは、有限個の生成元を持つ自由加群 $A^r$ から全射を受けることです。しかし有限個の関係式で記述できるとは限りません。

<a id="def-ag3-06-finite-type-presentation"></a>

<!-- formal-statement-start -->
> **定義（有限型・有限表示の準連接層）**  
> スキーム $X$ 上の準連接層 $\mathcal F$ が有限型であるとは、各点のあるアフィン開近傍 $U=\operatorname{Spec}A$ で $\mathcal F|_U\simeq\widetilde M$ と書け、$M$ が有限生成 $A$-加群であることをいう。
>
> 有限表示であるとは、同じように局所的に有限整数 $r,s$ と完全列
>
> $$
> A^s\longrightarrow A^r\longrightarrow M\longrightarrow0
> $$
>
> を取れることをいう。有限表示なら有限型だが、一般には逆は成り立たない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-06-finite-type-presentation -->
**定義の確認。** $A=k[x,y]$、$M=A/(x^2,xy)$ とすると、$A^2\to A$ の写像 $(a,b)\mapsto ax^2+bxy$ の余核が $M$ です。従って $A^2\to A\to M\to0$ は有限表示であり、$\widetilde M$ は有限表示です。対して環 $A=k[x_1,x_2,\ldots]$ のイデアル $I=(x_1,x_2,\ldots)$ に対する $A/I$ は $1$ 個で生成されますが、関係式を有限個に切り詰められません。
<!-- definition-example-end -->

<a id="prop-ag3-06-cyclic-presentation"></a>

<!-- formal-statement-start -->
> **命題（巡回商加群の有限表示判定）**  
> 可換環 $A$ とイデアル $I$ に対し、$A/I$ が有限表示 $A$-加群であるための必要十分条件は $I$ が有限生成であることである。
<!-- formal-statement-end -->

### 証明の見取り図

$I$ が有限生成なら、その生成元を関係式として並べれば足ります。逆は、一つの有限表示から任意の有限生成自由加群による全射の核も有限生成になることを示します。

<!-- proof-start -->
### 証明

$I=(a_1,\ldots,a_s)$ なら $A^s\to A\to A/I\to0$ で、最初の写像を $(b_i)\mapsto\sum_i b_i a_i$ とすれば有限表示です。

逆に $A/I$ の有限表示 $A^s\xrightarrow{d}A^r\xrightarrow{\pi}A/I\to0$ があるとします。標準全射 $q:A\to A/I$ と比較します。$A$ と $A^r$ は自由なので、$\pi$ を $A$ に持ち上げた $h:A^r\to A$、$q$ を $A^r$ に持ち上げた $j:A\to A^r$ が存在し、$qh=\pi$、$\pi j=q$ です。

$K=\ker\pi=\operatorname{im}d$ は有限生成です。$x\in I=\ker q$ なら $\pi j(x)=q(x)=0$ なので $j(x)\in K$。また $x-hj(x)\in I$ ですが、$h j(x)$ 自体は $q h j(x)=0$ より $I$ に属します。より直接に、$q h=\pi$ から $h(K)\subseteq I$、$j(x)\in K$ なので $h j(x)\in h(K)$ です。さらに $j$ と $h$ を一般には逆にできませんが、$j h-\mathrm{id}_{A^r}$ の像は $K$ に含まれます。よって $\ker q$ が有限生成であることは次の直接和比較でも分かります。

二つの全射 $A^r\twoheadrightarrow A/I$ と $A\twoheadrightarrow A/I$ のファイバー積を $P=\{(u,a):\pi(u)=q(a)\}$ とします。第一射影 $P\to A^r$ は核 $I$、第二射影 $P\to A$ は核 $K$ を持ちます。自由加群 $A^r,A$ へのそれぞれの全射は分裂するため

$$
P\simeq A^r\oplus I\simeq A\oplus K.
$$

$A\oplus K$ は有限生成なので $A^r\oplus I$ も有限生成です。その直和因子 $I$ も有限生成となります。
<!-- proof-end -->

上の証明は環を Noether と仮定していません。従って $A=k[x_1,x_2,\ldots]$ で $I=(x_1,x_2,\ldots)$ が有限生成でないことを確かめれば、有限型と有限表示の違いが実際に生じます。有限個の多項式は有限個の変数しか含まず、残りの変数 $x_j$ をその有限個で生成したイデアルに入れることはできません（残りの変数だけを $1$、使われた変数を $0$ とする代入で確認できます）。

## 5. 連接層とNoether条件

有限表示だけでは、層の射の核が局所的に有限個の生成元を持つとは限りません。連接性は、有限表示された情報を有限個の関係式で制御し続けられるという条件です。

<a id="def-ag3-06-coherent"></a>

<!-- formal-statement-start -->
> **定義（連接層）**  
> スキーム $X$ 上の準連接層 $\mathcal F$ が連接層であるとは、$\mathcal F$ が有限型であり、さらに任意の開集合 $U\subseteq X$、任意の有限整数 $r$、任意の $\mathcal O_U$-加群の層の射
>
> $$
> \varphi:\mathcal O_U^r\longrightarrow\mathcal F|_U
> $$
>
> に対して $\ker\varphi$ が有限型であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag3-06-coherent -->
**定義の確認。** $A=k[t]$、$M=A/(t^2)$ を考えます。$A$ は[Hilbertの基底定理](../AG1-05/index.md#thm-ag1-05-hilbert-basis)により Noether 環です。$M$ は $\bar1$ で生成され、任意の有限自由加群から $M$ への射の核は Noether 加群 $A^r$ の部分加群なので有限生成です。局所化したチャートでもこの性質が続くため $\widetilde M$ は連接層です。
<!-- definition-example-end -->

<a id="thm-ag3-06-noether-coherence"></a>

<!-- formal-statement-start -->
> **定理（局所Noetherスキームの有限型準連接層）**  
> スキーム $X$ が局所Noether、すなわち Noether 環の素スペクトルによるアフィン開被覆を持つとする。このとき $X$ 上の準連接層 $\mathcal F$ は、有限型であることと連接であることが同値である。特に有限型なら局所的に有限表示である。
<!-- formal-statement-end -->

### 証明の見取り図

重要なのは、Noether 環上の有限生成自由加群の部分加群が再び有限生成になることです。有限型の層をアフィンチャートで有限個の生成元に落とし、その関係式と任意の自由加群からの射の核を同じ性質で処理します。

<!-- proof-start -->
### 証明

連接層は定義により有限型です。逆に有限型 $\mathcal F$ を取り、点 $x\in X$ の Noether なアフィン開近傍 $U=\operatorname{Spec}A$ に制限します。さらに主開集合へ縮めて $\mathcal F|_U=\widetilde M$、$M$ を有限生成とできます。環 $A$ の Noether 性は局所化で保存されるので、縮めた $A$ も Noether です。

$M$ の生成元を $m_1,\ldots,m_r$ とすると $A^r\to M$ は全射です。$A$ が Noether なので $A^r$ の部分加群 $\ker(A^r\to M)$ は有限生成です。従って有限整数 $s$ による表示

$$
A^s\longrightarrow A^r\longrightarrow M\longrightarrow0
$$

が得られます。

任意の開集合 $W\subseteq X$ 上の $\varphi:\mathcal O_W^n\to\mathcal F|_W$ を考え、その任意の点の周囲で、上の $U$ に含まれる主開 $D(g)$ を取ります。[アフィン対応](#thm-ag3-06-affine-equivalence)から制限した $\varphi$ は $A_g^n\to M_g$ に対応します。$A_g$ は Noether 環なので、その核は $A_g^n$ の有限生成部分加群です。[完全性](#prop-ag3-06-exactness)から層の核はこの加群の層に一致し、局所的に有限型です。すべての点で成立するので $\ker\varphi$ は有限型です。よって $\mathcal F$ は連接層です。
<!-- proof-end -->

**Noether 条件を外したとき。** $A=k[x_1,x_2,\ldots]$ 上の $A/I$ は有限型ですが、$A\to A/I$ の核 $I$ は有限生成ではありません。従って $\widetilde{A/I}$ は連接でありません。破綻したのは「有限生成自由加群の部分加群が有限生成」という証明の一手です。

## 6. 演習：局所化・再構成・有限性

### A1. 冪零元を持つ支持

$A=k[t]$、$M=A/(t^3)$ とする。$\widetilde M(D(t))$ と $(\widetilde M)_{(t)}$ を計算し、$\bar t$ がどちらで非零か説明せよ。

- Level: A
- ID: AG3-06-A1

<!-- solution-start -->
### 詳細解答

[加群に付随する層の定理](#thm-ag3-06-tilde-sheaf)から $D(t)$ 上の切断は $M_t$ です。$t^3\bar1=0$ に $t^{-3}$ を掛けて $\bar1=0$ なので $M_t=0$ です。一方、茎は $M_{(t)}=k[t]_{(t)}/(t^3)$。ここで $t\notin(t^3)k[t]_{(t)}$ です。もし $t=t^3 a/s$、$s(0)\ne0$ なら $st=t^3a$ で、左辺の $t$ の次数は1、右辺は3以上になり矛盾します。従って茎では $\bar t\ne0$、ただし $\bar t^3=0$ です。
<!-- solution-end -->

### A2. 主開集合の切断

$A=k[x,y]$、$M=A/(xy)$ とする。$D(x)$ 上での切断加群を $k$-代数として同定せよ。

- Level: A
- ID: AG3-06-A2

<!-- solution-start -->
### 詳細解答

[加群に付随する層の定理](#thm-ag3-06-tilde-sheaf)から $\Gamma(D(x),\widetilde M)=M_x$ です。局所化では $x$ が単元となるため、$xy=0$ から $y=0$ です。写像

$$
k[x,x^{-1}]\longrightarrow (k[x,y]/(xy))_x,\quad x\mapsto\bar x
$$

は全射であり、逆は $x\mapsto x$、$y\mapsto0$ で定まります。互いの合成が各生成元で恒等なので $M_x\simeq k[x,x^{-1}]$ です。
<!-- solution-end -->

### A3. 有限表示の行列

$A=k[x,y]$、$M=A/(x^2,xy)$ を有限表示せよ。$A^2\to A$ の写像を明示し、余核を計算せよ。

- Level: A
- ID: AG3-06-A3

<!-- solution-start -->
### 詳細解答

$e_1,e_2$ を $A^2$ の標準基底とし、$d(e_1)=x^2$、$d(e_2)=xy$ と置きます。$d(ae_1+be_2)=ax^2+bxy$ なので $\operatorname{im}d=(x^2,xy)$ です。従って

$$
A^2\xrightarrow{\begin{pmatrix}x^2&xy\end{pmatrix}}A
\longrightarrow A/(x^2,xy)\longrightarrow0
$$

は完全列です。生成元は $\bar1$ 一つ、関係式は $x^2\bar1=xy\bar1=0$ の二つです。従って $\widetilde M$ は有限表示です。
<!-- solution-end -->

### A4. 巡回商の連接性

$A=k[t]$、$M=A/(t^2)$ とする。$\widetilde M$ が有限型・連接である理由を区別して述べよ。

- Level: A
- ID: AG3-06-A4

<!-- solution-start -->
### 詳細解答

$M$ は $\bar1$ で生成されるので有限生成です。[有限型の定義](#def-ag3-06-finite-type-presentation)から $\widetilde M$ は有限型です。さらに $k[t]$ は[Hilbertの基底定理](../AG1-05/index.md#thm-ag1-05-hilbert-basis)で Noether、従って $\operatorname{Spec}k[t]$ は局所Noetherです。[局所Noetherの場合の定理](#thm-ag3-06-noether-coherence)を、有限型であると確認した $\widetilde M$ に適用し、連接と結論します。有限型だけから任意の環で連接とするのは誤りです。
<!-- solution-end -->

### B1. 加群射と層の核

$A=k[t]$ の加群射 $u:A\to A/(t^2)$ を自然な全射とする。$\widetilde u$ の核を記述し、点 $(t)$ と $D(t)$ での挙動を求めよ。

- Level: B
- ID: AG3-06-B1

<!-- solution-start -->
### 詳細解答

$u$ の核は $(t^2)$ です。[加群列と層の完全性](#prop-ag3-06-exactness)から

$$
\ker\widetilde u\simeq\widetilde{(t^2)}.
$$

$D(t)$ 上では $(t^2)_t=A_t$ です。$t^2$ が単元となるので、$\widetilde u|_{D(t)}:A_t\to(A/(t^2))_t=0$ の核が $A_t$ であることと一致します。点 $(t)$ の茎では核は $(t^2)A_{(t)}$ で、$A_{(t)}\to A_{(t)}/(t^2)$ の核です。この茎は零でなく、$t^2$ を生成元とする自由階数1の $A_{(t)}$-加群です。
<!-- solution-end -->

### B2. 非Noether環で有限型と有限表示が異なる例

$A=k[x_1,x_2,\ldots]$、$I=(x_1,x_2,\ldots)$、$M=A/I$ とする。$M$ が有限生成であることと有限表示でないことを示せ。

- Level: B
- ID: AG3-06-B2

<!-- solution-start -->
### 詳細解答

$M$ は $\bar1$ 一つで生成されるので有限生成です。$I$ が有限生成と仮定し、その生成元を $f_1,\ldots,f_r$ とします。それらは有限個の変数 $x_1,\ldots,x_N$ だけを使います。代入 $x_i\mapsto0$（$1\le i\le N$）、$x_{N+1}\mapsto1$、残りを $0$ とする $k$-代数準同型 $A\to k$ では、すべての $f_i$ が $0$ に写る一方 $x_{N+1}$ は $1$ に写ります。これは $x_{N+1}\in I=(f_1,\ldots,f_r)$ に矛盾します。

従って $I$ は有限生成でありません。[巡回商の判定](#prop-ag3-06-cyclic-presentation)から $A/I$ は有限表示でありません。さらに $A\to A/I$ の核が有限型でないため $\widetilde M$ は連接でもありません。
<!-- solution-end -->

### B3. 基底変換で関係式がどう変わるか

$A=k[t]$、$M=A/(t^2)$、$B=A/(t)$ とする。$f:\operatorname{Spec}B\to\operatorname{Spec}A$ に沿った $f^*(\widetilde M)$ を求めよ。元の層の $D(t)$ 上の切断との違いを説明せよ。

- Level: B
- ID: AG3-06-B3

<!-- solution-start -->
### 詳細解答

[引戻しの命題](#prop-ag3-06-affine-base-change)から $f^*(\widetilde M)=\widetilde{B\otimes_A M}$ です。商環と[テンソル積](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)について

$$
B\otimes_A A/(t^2)\simeq B/(t^2)B=B\simeq k.
$$

従って引戻しは $\operatorname{Spec}k$ 上の構造層です。一方 $\Gamma(D(t),\widetilde M)=M_t=0$。前者は $t=0$ という閉点へ基底変換し、後者は $t$ が可逆になる開集合へ制限する操作です。対象となる部分が反対なので、結果は矛盾しません。
<!-- solution-end -->

### B4. 開集合上の切断と大域切断の局所化

$A=k[x,y]$、$M=A/(x)$、$f=y$ とする。$\Gamma(\operatorname{Spec}A,\widetilde M)_f$ と $\Gamma(D(f),\widetilde M)$ を別々に計算して同型を示せ。

- Level: B
- ID: AG3-06-B4

<!-- solution-start -->
### 詳細解答

[大域切断](#thm-ag3-06-tilde-sheaf)は $M=A/(x)\simeq k[y]$ です。従って左辺は

$$
\Gamma(X,\widetilde M)_y=M_y\simeq k[y,y^{-1}].
$$

一方、主開集合上の切断は定義から

$$
\Gamma(D(y),\widetilde M)=(A/(x))_y\simeq
k[x,y,y^{-1}]/(x)\simeq k[y,y^{-1}].
$$

同型は $(\bar p)/y^n$ を $\overline{p/y^n}$ に送ります。[アフィン対応](#thm-ag3-06-affine-equivalence)で一般の準連接層にも成り立つ写像の具体例です。
<!-- solution-end -->

### C1. 商層・引戻し・完全性を一度に使う

$A=k[t]$、$M=A/(t^2)$、$N=A/(t)$ とする。自然な全射 $q:M\to N$ の核を計算せよ。さらに $B=A/(t)$ に基底変換したときの $B\otimes_A\ker q$ と $\ker(B\otimes_A q)$ を比較し、なぜ一致しなくても層化定理に矛盾しないか説明せよ。

- Level: C
- ID: AG3-06-C1

<!-- solution-start -->
### 詳細解答

$M\to N$ は剰余類 $\bar a\bmod t^2$ を $\bar a\bmod t$ に送ります。核は $(t)/(t^2)$ であり、$t$ の剰余類で生成され、$t\cdot\bar t=0$ なので $A/(t)\simeq\ker q$ です。従って

$$
0\longrightarrow (t)/(t^2)\longrightarrow A/(t^2)
\xrightarrow{q} A/(t)\longrightarrow0
$$

は完全です。

$B=A/(t)\simeq k$ を使い、[アフィン引戻し](#prop-ag3-06-affine-base-change)で各項をテンソル積へ移します。

$$
B\otimes_A\ker q\simeq k,\quad
B\otimes_A M\simeq k,\quad
B\otimes_A N\simeq k.
$$

後ろの写像 $B\otimes_A q:k\to k$ は $1\mapsto1$ なので恒等写像、その核は $0$ です。一方、$B\otimes_A\ker q\simeq k$ から $B\otimes_A M\simeq k$ への写像は $\bar t\mapsto0$ で零写像です。

つまり

$$
B\otimes_A\ker q\simeq k\ne0
=\ker(B\otimes_A q).
$$

[加群から層への完全性](#prop-ag3-06-exactness)は、**固定した環の上で層化**すると完全性が保たれる主張です。今は $A\to B$ によるテンソル積で基底環を替えました。テンソル積が単射を保つという主張は別であり、ここでその失敗を実際に見ています。
<!-- solution-end -->

### C2. 射影直線と準連接層の局所・大域

$k$ を体、$X=\mathbb P^1_k$ とし、標準チャート $U_0,U_1$ をそれぞれ $\operatorname{Spec}k[x]$、$\operatorname{Spec}k[y]$（重なりで $xy=1$）とする。[ねじれ層 $\mathcal O(1)$](../AG2-06/index.md#def-ag2-06-twisting-sheaf) を考える。

1. 各チャートへの制限が加群から作る層であることを説明せよ。
2. $U_0\cap U_1$ での局所基底変換と、切断の係数変換を書け。
3. $\mathcal O(1)$ が準連接であり、大域的に $\mathcal O_X$ と同型ではないことを示せ。

- Level: C
- ID: AG3-06-C2

<!-- solution-start -->
### 詳細解答

(1) $U_i$ 上の基底を $e_i$ とすると $\mathcal O(1)|_{U_i}\simeq\mathcal O_{U_i}e_i$ です。[加群に付随する層の構成](#thm-ag3-06-tilde-sheaf)で、これは $k[x]$ または $k[y]$ という自由階数1の加群を層化したものです。

(2) $e_1=x e_0$ なので、同じ切断を $s=f_0e_0=f_1e_1$ と表示すると

$$
f_0e_0=f_1x e_0,\qquad
f_1=x^{-1}f_0=yf_0.
$$

ここで $x$ は重なりでは可逆ですが、$U_0$ の全体では可逆とは限りません。

(3) 二つのアフィン開集合が $X$ を覆い、それぞれで $\widetilde{k[x]}$、$\widetilde{k[y]}$ なので、[準連接層の定義](#def-ag3-06-quasicoherent)を満たします。一方 [射影直線上の $\mathcal O(d)$ の大域切断定理](../AG2-06/index.md#thm-ag2-06-p1-od-sections)を $d=1$ に適用すると

$$
\dim_k\Gamma(X,\mathcal O(1))=2.
$$

同じ章での $d=0$ の場合は $\Gamma(X,\mathcal O_X)=k$ で一次元です。層同型は大域切断の $k$-線形同型を誘導するため、二つの次元が異なる以上 $\mathcal O(1)\not\simeq\mathcal O_X$ です。局所自由と大域自由を混同してはいけません。
<!-- solution-end -->

## 7. 次章への見通し

準連接層はアフィン開集合ごとに加群として計算でき、連接層は Noether な場合に有限個の生成元・関係式で局所計算を閉じられます。しかし、大域切断を調べるときには、局所切断を貼り合わせる条件が障害になります。次章では層の射と完全列を大域的に読み、貼り合わせの失敗を Čech コホモロジーとして測ります。
