# MFL20 t-SNE・UMAPと可視化の意味

<!-- definition-example-audit: strict -->

## 1. きれいに離れた島は、何を証明するか

[MFL8のClassical MDS](../MFL8/index.md#def-mfl8-classical-mds)は全点対距離の復元を扱い、[MFL19の固有空間収束](../MFL19/index.md#thm-mfl19-eigenspaces)は離散作用素を連続作用素と比べた。それに対し、2次元の散布図を描くときは「高次元で近い観測点を近く表示する」こと自体が目標になり得る。**局所の近さの可視化と、測地距離・連結成分の推定は異なる問題**である。

t-SNEは規格化した点対確率の相対エントロピー、UMAPは主として各辺の有無の程度を比較する交差エントロピーを最適化する。以下、観測点を相異なる $x_1,\ldots,x_n\in\mathbb R^D$（$n\ge4$）、描画座標を $y_1,\ldots,y_n\in\mathbb R^d$（通常 $d=2$）とし、$d_{ij}=\|x_i-x_j\|$、$\delta_{ij}=\|y_i-y_j\|$ を区別する。$y_i$ は未知の最適化変数である。

本章では[MFL7の方向付き近傍](../MFL7/index.md#def-mfl7-knn-symmetrization)、[INFO2の有限相対エントロピー](../../INFO/INFO2/index.md#def-info2-relative-entropy)を使う。反復最適化の一般論ではなく、目的関数とそこからは出ない結論を有限例から検証する。

## 2. t-SNE：距離を条件付き確率に変える

点 $i$ からほかの点 $j$ を選ぶ確率を作る。密な領域と疎な領域を同じ帯域幅で扱わないよう、各点に $\sigma_i$ を与える。確率の集中度には[Shannonエントロピー](../../INFO/INFO1/index.md#def-info1-entropy)を用い、同じエントロピーを持つ**等確率の選択肢の数**へ換算する。

<a id="def-mfl20-tsne-conditional"></a>

<!-- formal-statement-start -->
> **定義（t-SNEの近傍確率とperplexity）**
>
> 相異なる $n\ge3$ 点 $x_i\in\mathbb R^D$ と $\sigma_i>0$ に対し、

$$
p_{j\mid i}=
\frac{\exp(-d_{ij}^2/(2\sigma_i^2))}
{\sum_{\ell\ne i}\exp(-d_{i\ell}^2/(2\sigma_i^2))}
\quad(j\ne i),\qquad p_{i\mid i}=0
$$

> を定める。$H_i=-\sum_{j\ne i}p_{j\mid i}\log_2p_{j\mid i}$、$\operatorname{Perp}(i)=2^{H_i}$ を点 $i$ のエントロピーおよびperplexityと呼ぶ。$\sum_{j\ne i}p_{j\mid i}=1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl20-tsne-conditional -->
**定義の確認**。$x=(0,1,3)$、$\sigma_1=1$ なら点1からの二重みは $e^{-1/2},e^{-9/2}$。従って

$$
p_{2\mid1}=\frac1{1+e^{-4}},\qquad
p_{3\mid1}=\frac{e^{-4}}{1+e^{-4}}.
$$

和は1、双方正で前者が大きい。$H_1$ は0から1 bitの間、perplexityは1から2の間。二距離が等しければ各確率は $1/2$ でperplexityは2となる。
<!-- definition-example-end -->

目標perplexityを選ぶ実装では $\sigma_i$ を二分探索で調整する。ただし同距離の最近点が複数なら、小さい帯域幅でもその点たちへ等しく確率が残り、任意に小さい目標を達成できるわけではない。

<a id="prop-mfl20-bandwidth"></a>

<!-- formal-statement-start -->
> **命題（帯域幅とperplexityの単調性）**
>
> 一つの点 $i$ で $E_j=d_{ij}^2$（$j\ne i$）、$\beta=1/(2\sigma_i^2)>0$ とし、$p_j(\beta)=e^{-\beta E_j}/\sum_{\ell\ne i}e^{-\beta E_\ell}$ と置く。$H_i(\beta)=-\sum_jp_j\log_2p_j$ は

$$
\frac{dH_i}{d\beta}
=-\frac{\beta}{\ln2}
\left(\sum_jp_jE_j^2-\left(\sum_jp_jE_j\right)^2\right)\le0
$$

> を満たす。括弧内は分散である。$E_j$ が全て等しくなければ厳密に負で、$\sigma_i$ を大きくするとperplexityは増える。
<!-- formal-statement-end -->

### 証明の見取り図

規格化定数の対数を微分すると距離二乗の平均が現れる。その平均の微分が負の分散になる。

<!-- proof-start -->
### 証明

$Z=\sum_j e^{-\beta E_j}$、$\mu=\sum_jp_jE_j$ とする。$\ln p_j=-\beta E_j-\ln Z$ なので

$$
H_i=\frac{\beta\mu+\ln Z}{\ln2},
\qquad \frac{d\ln Z}{d\beta}=-\mu.
$$

各確率の商を微分すると

$$
\frac{dp_j}{d\beta}
=-E_jp_j-p_j\frac{Z'}{Z}
=-p_j(E_j-\mu).
$$

従って $d\mu/d\beta=\sum_jE_jdp_j/d\beta=-\sum_jp_jE_j^2+\mu^2=-\operatorname{Var}_p(E)$。$H_i$ の微分では $\mu$ と $(\ln Z)'$ が消えて結論を得る。全 $p_j>0$ なので分散0は $E_j$ がすべて同じときに限る。また $d\beta/d\sigma_i=-\sigma_i^{-3}<0$。$\square$
<!-- proof-end -->

## 3. t-SNEの対称KLと座標勾配

条件付き確率には一般に $p_{j\mid i}\ne p_{i\mid j}$ がある。対称化して順序付き点対上の確率にし、低次元側は遠方まで重みを残すStudent-t型核で別の確率分布を作る。

<a id="def-mfl20-tsne-kl"></a>

<!-- formal-statement-start -->
> **定義（t-SNEの対称確率とKL目的関数）**
>
> 前節の $n\ge3$ 点と描画座標 $y_i\in\mathbb R^d$ に対し、$i\ne j$ で

$$
\begin{aligned}
p_{ij}&=\frac{p_{j\mid i}+p_{i\mid j}}{2n},\\
w_{ij}&=(1+\delta_{ij}^2)^{-1},\quad
Z=\sum_{k\ne\ell}w_{k\ell},\quad q_{ij}=\frac{w_{ij}}Z,\\
C_{\mathrm{tSNE}}(Y)&=\sum_{i\ne j}p_{ij}\ln\frac{p_{ij}}{q_{ij}}
\end{aligned}
$$

> と定め、対角は零とする。$C_{\mathrm{tSNE}}$ は順序付き点対集合上の相対エントロピーである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl20-tsne-kl -->
**定義の確認**。入力三点が正三角形なら、各条件付き確率は $1/2$、$p_{ij}=1/6$。描画側も一辺 $r>0$ の正三角形なら $w_{ij}=(1+r^2)^{-1}$ が六個等しく、$Z=6/(1+r^2)$、$q_{ij}=1/6$。従って $C_{\mathrm{tSNE}}=0$ は**全ての $r>0$** で成立する。KLが零でも絶対的な距離尺度は復元できない。
<!-- definition-example-end -->

各条件付き確率の行和が1なので

$$
\sum_{i\ne j}p_{ij}
=\frac{1}{2n}\left(\sum_i\sum_{j\ne i}p_{j\mid i}
+\sum_j\sum_{i\ne j}p_{i\mid j}\right)
=\frac{n+n}{2n}=1
$$

であり、$Q$ も $Z$ の定義から総和1。[Gibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)よりKLは非負で等号は $P=Q$ の場合のみ。これは「全距離が復元された」を意味しない。

<a id="prop-mfl20-tsne-gradient"></a>

<!-- formal-statement-start -->
> **命題（t-SNEの座標勾配）**
>
> $n\ge3$、対称で正の $p_{ij}$、$\sum_{i\ne j}p_{ij}=1$ を固定する。前節の $q_{ij}$ と $C_{\mathrm{tSNE}}$ は任意の $y_1,\ldots,y_n\in\mathbb R^d$ で微分可能で、

$$
\nabla_{y_i}C_{\mathrm{tSNE}}
=4\sum_{j\ne i}(p_{ij}-q_{ij})
\frac{y_i-y_j}{1+\|y_i-y_j\|^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

KLを $-\sum p\ln w+\ln Z$ と分ける。第一添字・第二添字の両方から点 $i$ への微分が来るため係数が4になる。

<!-- proof-start -->
### 証明

$C_{\mathrm{tSNE}}=\sum p_{ij}\ln p_{ij}-\sum p_{ij}\ln w_{ij}+\ln Z$。最初の項は座標に依らない。$r_{ij}^2=\|y_i-y_j\|^2$ とすると

$$
\nabla_{y_i}\ln w_{ij}
=-\frac{2(y_i-y_j)}{1+r_{ij}^2},\qquad
\nabla_{y_i}w_{ij}=-2w_{ij}^2(y_i-y_j).
$$

$(i,j)$ と $(j,i)$ の両方を数えると

$$
\begin{aligned}
-\nabla_{y_i}\sum_{k\ne\ell}p_{k\ell}\ln w_{k\ell}
&=4\sum_{j\ne i}p_{ij}\frac{y_i-y_j}{1+r_{ij}^2},\\
\nabla_{y_i}\ln Z
&=-\frac4Z\sum_{j\ne i}w_{ij}^2(y_i-y_j)
=-4\sum_{j\ne i}q_{ij}\frac{y_i-y_j}{1+r_{ij}^2}.
\end{aligned}
$$

最後は $w_{ij}^2/Z=q_{ij}w_{ij}$ を代入した。両式を足して結論を得る。$\square$
<!-- proof-end -->

勾配降下の一項は $p_{ij}>q_{ij}$ で引力、$p_{ij}<q_{ij}$ で斥力になる。ただし全点対の規格化が結合するため、任意の二点の表示間隔が独立に定まるわけではない。

## 4. UMAP：局所尺度で近傍辺の強さを合成する

UMAPは、近傍の方向付き重みを作ってから双方の重みを対称化する。t-SNEの $p_{ij}$ のように**全辺で和1になる確率**ではなく、各辺の存在の程度を $[0,1]$ で表す。ここでは標準的な局所連結性設定のうち、同距離のない有限標本に対する構成を扱う。重複点や局所連結性の変更など、実装のすべての補正を含める主張ではない。

<a id="def-mfl20-umap-fuzzy"></a>

<!-- formal-statement-start -->
> **定義（UMAPの局所fuzzy近傍グラフ）**
>
> $n\ge k+1$、$k\ge3$、各点からの非零距離が互いに異なる標本を考える。距離が小さい順の $k$ 点を $N_k(i)$、$\rho_i=\min_{j\ne i}d_{ij}>0$ とし、正の $\sigma_i$ を

$$
\sum_{j\in N_k(i)}
\exp\left(-\frac{\max(0,d_{ij}-\rho_i)}{\sigma_i}\right)
=\log_2k
$$

> から決める。方向付き近傍重みを

$$
u_{j\mid i}=
\begin{cases}
\exp(-\max(0,d_{ij}-\rho_i)/\sigma_i),&j\in N_k(i),\\
0,&j\notin N_k(i)
\end{cases}
$$

> とし、$a_{ij}=u_{j\mid i}+u_{i\mid j}-u_{j\mid i}u_{i\mid j}$（$i\ne j$）、$a_{ii}=0$ を無向fuzzy union重みと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl20-umap-fuzzy -->
**定義の確認**。$u_{j\mid i}=1/2$、$u_{i\mid j}=1/4$ なら $a_{ij}=1/2+1/4-1/8=5/8$。双方に含まれる $1/8$ を重複計上しない。最近点 $j$ では $d_{ij}=\rho_i$ なので $u_{j\mid i}=e^0=1$。一方が1なら対称重みも1となる。
<!-- definition-example-end -->

距離が厳密に異なる $k\ge3$ の場合、$\sigma\downarrow0$ で左辺は1、$\sigma\uparrow\infty$ で $k$ に近づき、$1<\log_2k<k$。左辺は $\sigma$ に関して厳密増加なので中間値の定理で解は一意に存在する。同率距離や重複点がある場合は目標に届かないこともあり、実装では別処理が必要となる。

描画側には距離の減少関数を置く。原著実装では二つの係数を表示パラメータから近似的に求めるが、以下は固定した正の値で比較できる部分である。

<a id="def-mfl20-umap-loss"></a>

<!-- formal-statement-start -->
> **定義（UMAPの低次元類似度とBernoulli交差エントロピー）**
>
> $n\ge2$、$a,b>0$、互いに異なる描画座標 $y_i$ から $\nu_{ij}=(1+a\delta_{ij}^{2b})^{-1}\in(0,1)$ を作る。対称な $a_{ij}\in[0,1]$ を与え、

$$
C_{\mathrm{UMAP}}(Y)=
\sum_{i<j}\left[
a_{ij}\ln\frac{a_{ij}}{\nu_{ij}}
+(1-a_{ij})\ln\frac{1-a_{ij}}{1-\nu_{ij}}
\right]
$$

> と置く。$0\ln0=0$ とする。原著のfuzzy-set cross-entropyから高次元重みにのみ依存する項を引いたもので、$Y$ に関する最小点は同じである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl20-umap-loss -->
**定義の確認**。$a_{ij}=1/2$、$\nu_{ij}=1/4$ の一辺は

$$
\frac12\ln\frac{1/2}{1/4}
+\frac12\ln\frac{1/2}{3/4}
=\frac12\ln\frac43>0.
$$

$a=b=1$、$\delta_{ij}=\sqrt3$ なら $\nu_{ij}=1/4$ となる。重みも $1/4$ ならこの辺の損失は0。
<!-- definition-example-end -->

<a id="prop-mfl20-umap-properties"></a>

<!-- formal-statement-start -->
> **命題（fuzzy unionとBernoulli目的関数の性質）**
>
> $s,t,w\in[0,1]$、$\nu\in(0,1)$ とする。二つの関数を

$$
A(s,t)=s+t-st,\qquad
\ell_w(\nu)=w\ln\frac w\nu+(1-w)\ln\frac{1-w}{1-\nu}
$$

> と定める。このとき $A(s,t)$ は各引数に対して非減少で、次の範囲を満たす。

$$
A(s,t)=1-(1-s)(1-t)\in[0,1].
$$

> また $\ell_w(\nu)\ge0$ であり、$0<w<1$ のとき唯一の最小点は $\nu=w$ である。$w=0$ では $\nu\downarrow0$、$w=1$ では $\nu\uparrow1$ によって下限0へ近づく。
<!-- formal-statement-end -->

### 証明の見取り図

fuzzy unionは「双方とも辺がない」の補数、第二は二値分布の相対エントロピーである。

<!-- proof-start -->
### 証明

$0\le(1-s)(1-t)\le1$ より第一の範囲が出る。$s'\ge s$ なら $A(s',t)-A(s,t)=(s'-s)(1-t)\ge0$。第二は[INFO2のGibbs不等式](../../INFO/INFO2/index.md#thm-info2-gibbs)を $(w,1-w)$、$(\nu,1-\nu)$ に適用して非負である。微分しても

$$
\frac{d\ell_w}{d\nu}
=-\frac w\nu+\frac{1-w}{1-\nu}
=\frac{\nu-w}{\nu(1-\nu)}
$$

だから $0<w<1$ なら $\nu<w$ で負、$\nu>w$ で正。端点なら $\ell_0=-\ln(1-\nu)$、$\ell_1=-\ln\nu$ で極限も得る。$\square$
<!-- proof-end -->

各辺を独立に動かせるなら $\nu_{ij}=a_{ij}$ が最善。しかし共通の座標 $Y$ から全 $\nu_{ij}$ を作るため、一般には全辺の最善値を同時実現できない。**t-SNEのKLとUMAPの損失の生値は、規格化と標本数依存が異なるので大小比較できない。**

## 5. trustworthinessとcontinuity：順位で近傍を検査する

元の点 $i$ から $j$ を見た近さの順位を $r_X(i,j)$、描画での順位を $r_Y(i,j)$ とする。最近点が1位で、自分自身は含めない。距離同率は点番号などの同じ決定的規則で解消する。

<a id="def-mfl20-trust-continuity"></a>

<!-- formal-statement-start -->
> **定義（trustworthinessとcontinuity）**
>
> $n\ge4$、$1\le k<n/2$ とし、元空間と描画の上位$k$近傍を $N_X^k(i),N_Y^k(i)$ とする。$U_i=N_Y^k(i)\setminus N_X^k(i)$、$V_i=N_X^k(i)\setminus N_Y^k(i)$ と置き、

$$
\begin{aligned}
T(k)&=1-\frac{2}{nk(2n-3k-1)}
\sum_i\sum_{j\in U_i}(r_X(i,j)-k),\\
C(k)&=1-\frac{2}{nk(2n-3k-1)}
\sum_i\sum_{j\in V_i}(r_Y(i,j)-k)
\end{aligned}
$$

> をそれぞれtrustworthiness（描画に現れた偽の近傍の罰則）、continuity（元空間近傍の脱落の罰則）と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl20-trust-continuity -->
**定義の確認**。$n=5,k=1$ で一つの基準点だけ描画最近傍が元空間で3位、ほかは最近傍一致なら、違反一件の罰則は $3-1=2$。分母は $5(10-3-1)=30$ なので $T(1)=1-4/30=13/15$。$C(1)$ は、失われた元最近傍が描画で何位かを追加で調べる必要がある。
<!-- definition-example-end -->

一つの点に最大 $k$ 個の偽近傍があり、最悪の順位は $n-k,\ldots,n-1$ であるから、最大罰則は

$$
\sum_{r=n-k}^{n-1}(r-k)
=\frac{k(2n-3k-1)}2.
$$

従って $0\le T(k),C(k)\le1$。高得点が意味するのは**選んだ $k$ における観測標本の近傍順位**の保持であり、測地距離、曲率、母多様体の位相は保証しない。

## 6. 連結な母空間なのに、二つの島になる反例

連結区間 $[0,2]$ 上から8点 $0,0.10,0.23,0.31,1.70,1.78,1.91,2.00$ を観測したとする。$k=3$ なら左4点の最近3点はすべて左4点内、右4点も同様だ。[MFL7の対称化近傍](../MFL7/index.md#def-mfl7-knn-symmetrization)はこの標本では二成分へ分かれる。母空間の連結性が離散グラフへ自動継承されたわけではない。

UMAPの群間 $a_{ij}=0$。一方の描画群を遠くへ動かすと、群内距離は一定のまま群間だけ離れる。

<a id="prop-mfl20-disconnected"></a>

<!-- formal-statement-start -->
> **命題（非連結近傍グラフの描画分離）**
>
> $n\ge2$、$a,b>0$、空でない分割 $[n]=A\sqcup B$ と対称重み $a_{ij}\in[0,1]$ を取り、$i\in A,j\in B$ なら $a_{ij}=0$ とする。互いに異なる描画点を各群内で固定し、群 $B$ だけ $Re_1$ 平行移動した配置を $Y_R$ とする。このとき

$$
\lim_{R\to\infty}C_{\mathrm{UMAP}}(Y_R)
=C_{\mathrm{within}}(A)+C_{\mathrm{within}}(B).
$$

> 右辺は各群内点対のBernoulli相対エントロピーの和である。群間損失は零へ近づき、目的関数は両群を有限距離へつなぎ止めない。
<!-- formal-statement-end -->

### 証明の見取り図

群内点対距離は平行移動で不変。群間距離は無限大へ発散し、重み0の点対の罰則 $-\ln(1-\nu)$ が0へ近づく。

<!-- proof-start -->
### 証明

$A$ 内・$B$ 内の距離は $R$ に依らず、群内の損失は一定。群間の元の描画差を $z_{ij}$ と置けば

$$
\delta_{ij}(R)=\|z_{ij}-Re_1\|
\ge R-\|z_{ij}\|\longrightarrow\infty,\quad
\nu_{ij}(R)=\frac1{1+a\delta_{ij}(R)^{2b}}\longrightarrow0.
$$

群間では $a_{ij}=0$ だから一辺の損失は $-\ln(1-\nu_{ij}(R))\to0$。点対は有限個なので群間総和も零へ行き、群内の定数項だけが残る。$\square$
<!-- proof-end -->

これはUMAPが必ず二島を描くという定理ではない。またt-SNEでは有限距離の $p_{ij}$ が正なので同じ零辺の証明を適用できない。しかし**描画に島が二つあることだけで母多様体が非連結だと断定できない**点は共通である。標本密度、近傍数、乱数初期値、描画を変えたときの安定性を別に検証する。

## 7. 再計算できる有限点群ラボ

付属の[Pythonラボ](textbook/volumes/dream_thater/応用系/MFL/MFL20/visualization_objectives_lab.py)は標準ライブラリのみで、入力点と描画点から $P,Q$、KL、UMAPの方向付き近傍・fuzzy union・Bernoulli損失、$T,C$、距離ひずみを再計算する。反復学習のデモではなく**同じ描画の異なる採点法**を調べる道具である。

~~~bash
python textbook/volumes/dream_thater/応用系/MFL/MFL20/visualization_objectives_lab.py --preset bridge --gap 2 --perplexity 2 --neighbors 3
python textbook/volumes/dream_thater/応用系/MFL/MFL20/visualization_objectives_lab.py --preset bridge --gap 20 --perplexity 2 --neighbors 3
python textbook/volumes/dream_thater/応用系/MFL/MFL20/visualization_objectives_lab.py --self-test
~~~

~~~text
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL20/visualization_objectives_lab.py
# timeout-ms: 30000
# lab-preset: 区間標本・描画ギャップ2 | --preset bridge --gap 2 --perplexity 2 --neighbors 3
# lab-preset: 区間標本・描画ギャップ20 | --preset bridge --gap 20 --perplexity 2 --neighbors 3
# lab-preset: 円周8点 | --preset ring --gap 1 --perplexity 3 --neighbors 3
# lab-preset: 点群の座標を直接指定 | --points "[[0],[0.1],[0.23],[0.31],[1.7],[1.78],[1.91],[2.0]]" --embedding "[[0,0],[0.1,0],[0.23,0],[0.31,0],[8,0],[8.08,0],[8.21,0],[8.3,0]]" --perplexity 2 --neighbors 3
~~~

ギャップを変えても高次元の $P$ とUMAPの $a_{ij}$ は一定だが、$Q$ と $\nu_{ij}$ が変わる。KLとUMAP損失の値を直接大小比較せず、**それぞれの変化と、同じ近傍順位評価・距離ひずみとの関係**を検討する。

## 8. 演習と詳細解答

<a id="ex-mfl20-a01"></a>

### MFL20-A01 等距離の条件付き確率

- Level: A
- 問題: 基準点から残り二点の距離が等しいとき、条件付き確率、エントロピー、perplexityを求めよ。

**詳細解答。** 二つの正の指数重みが等しく $c$ なら分母は $2c$ なので各確率は $1/2$。$H=-2(1/2)\log_2(1/2)=1$ bit、perplexityは $2^1=2$。

<a id="ex-mfl20-a02"></a>

### MFL20-A02 対称結合確率

- Level: A
- 問題: 各行の条件付き確率の和が1なら $p_{ij}=(p_{j\mid i}+p_{i\mid j})/(2n)$ が対称で、総和1となることを示せ。

**詳細解答。** 添字を交換しても分子が変わらないので対称。全ての順序付き点対を足して

$$
\sum_{i\ne j}p_{ij}
=\frac1{2n}\left(\sum_i1+\sum_j1\right)
=\frac{n+n}{2n}=1.
$$

分母を2だけにすると総和が $n$ になって確率分布ではなくなる。

<a id="ex-mfl20-a03"></a>

### MFL20-A03 fuzzy union

- Level: A
- 問題: 方向付き重み $s=0.4,t=0.7$ を合成し、一般に両方0なら0、片方1なら1を示せ。

**詳細解答。** $A=0.4+0.7-0.4\cdot0.7=0.82$。$A=1-(1-s)(1-t)$ へ $(0,0)$ を代入すると0、$s=1$ または $t=1$ なら積が0で1。

<a id="ex-mfl20-a04"></a>

### MFL20-A04 偽の近傍

- Level: A
- 問題: $n=5,k=1$。ただ一つの基準点の描画最近傍が元空間で4位、他点では最近傍一致とする。$T(1)$ を求めよ。

**詳細解答。** 一件の罰則は $4-1=3$。規格化係数は $2/[5(10-3-1)]=1/15$。従って $T(1)=1-3/15=4/5$。失われた元最近傍が描画で何位か不明なので、この条件だけで $C(1)$ は出ない。

<a id="ex-mfl20-b01"></a>

### MFL20-B01 同距離のため目標perplexityが不可能

- Level: B
- 問題: 基準点からの距離二乗が $(1,1,4,9)$。$\beta\to\infty$ と $\beta\to0$ の確率・perplexityを求め、目標1.5の達成可能性を判定せよ。

**詳細解答。** $\beta\to\infty$ では最小距離の二点が同率で $(1/2,1/2,0,0)$、$H=1$ bit、perplexity2。$\beta\to0$ では $(1/4,1/4,1/4,1/4)$、$H=2$ bit、perplexity4。[$\beta$の単調性](#prop-mfl20-bandwidth)から有限正の $\beta$ ではperplexityは2と4の間で、1.5は実現しない。

<a id="ex-mfl20-b02"></a>

### MFL20-B02 t-SNE勾配の係数4

- Level: B
- 問題: $w_{ij}=(1+\|y_i-y_j\|^2)^{-1}$、$Z=\sum_{k\ne\ell}w_{k\ell}$ とするとき、$\nabla_{y_i}\ln Z=-4\sum_{j\ne i}q_{ij}(y_i-y_j)/(1+\|y_i-y_j\|^2)$ を導け。

**詳細解答。** $\nabla_{y_i}w_{ij}=-2w_{ij}^2(y_i-y_j)$。$Z$ には $(i,j),(j,i)$ の二項があるので $\nabla_{y_i}Z=-4\sum_{j\ne i}w_{ij}^2(y_i-y_j)$。$Z$ で割り、$w_{ij}^2/Z=q_{ij}w_{ij}=q_{ij}/(1+\delta_{ij}^2)$ を使えば結論を得る。

<a id="ex-mfl20-b03"></a>

### MFL20-B03 存在しない辺と描画距離

- Level: B
- 問題: 高次元重み $a_{ij}=0$、低次元で $a=b=1$、距離が $R>0$ の一辺について、損失と $R\to\infty$ の極限を求めよ。

**詳細解答。** $\nu=1/(1+R^2)$、$1-\nu=R^2/(1+R^2)$ より

$$
\ell_0(\nu)=-\ln(1-\nu)
=\ln(1+R^{-2})\longrightarrow0.
$$

これは一辺の結論であり、他の辺の距離も変える操作で全損失が必ず下がるとは限らない。

<a id="ex-mfl20-b04"></a>

### MFL20-B04 t-SNEの尺度非識別

- Level: B
- 問題: 元点が正三角形、描画も一辺 $r>0$ の正三角形とする。$P,Q$ を計算し、KLから元の辺長が決まるか判断せよ。

**詳細解答。** 条件付き確率は全て $1/2$、$p_{ij}=(1/2+1/2)/(2\cdot3)=1/6$。描画では $w_{ij}=1/(1+r^2)$、$Z=6/(1+r^2)$ なので $q_{ij}=1/6$。KLは全項 $p_{ij}\ln1=0$。$r$ は任意なので元の辺長を特定できない。

<a id="ex-mfl20-c01"></a>

### MFL20-C01 連結区間の見かけの二島

- Level: C
- 問題: 母空間 $[0,2]$ から $X=\{0,0.10,0.23,0.31,1.70,1.78,1.91,2.00\}$ を観測する。$k=3$ の方向付き近傍から群間のUMAP重みが0となることを示し、二群の一方を無限遠へ平行移動したときのUMAP損失の極限を証明せよ。この図から母空間の連結性を言えるか。

**詳細解答。** 左4点の最大群内距離は0.31、右4点は0.30、最小群間距離は $1.70-0.31=1.39$。各点の最近3点は同じ群の残り3点だから、群間の方向付き重みはどちら向きも0、$a_{ij}=0$。群内距離は平行移動で変わらず、群間では元の描画差 $z_{ij}$ に対し

$$
\delta_{ij}(R)=\|z_{ij}-Re_1\|
\ge R-\|z_{ij}\|\longrightarrow\infty,\quad
\nu_{ij}(R)\longrightarrow0.
$$

群間の一辺の損失は $-\ln(1-\nu_{ij}(R))\to0$。有限和だから全損失の極限は群内損失の和。これは[描画分離の命題](#prop-mfl20-disconnected)の直接適用である。しかし有限標本だけから母空間が連結区間か二つの区間の合併かは識別できない。散布図の二島から母空間の二連結成分を結論してはならない。

## 9. 原著と次章

- van der Maaten & Hinton (2008), [Visualizing Data using t-SNE](https://www.jmlr.org/papers/v9/vandermaaten08a.html)。対称KL、Student-t核、座標勾配の原著。
- McInnes, Healy & Melville (2018), [UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction](https://arxiv.org/abs/1802.03426)。局所fuzzy近傍と交差エントロピーの原著。
- MFL21では近接枝・交差する層・外れ値を同じ入力で比較し、可視化の目的と幾何推定の誤差を分けて検証する。

<!-- DT-REVIEW: MFL20 substantive; four propositions and nine detailed exercise solutions recalculated; separate second-pass reader review by author; see PR for arithmetic and audit evidence. -->
