# CYG1-04 楕円曲線と複素トーラス：標準束とホロノミーを手で確かめる

<!-- definition-example-audit: strict -->

## 1. 標準束が自明でも、ホロノミーは最大になるのか

[標準束の自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)では、零にならない大域正則最高次形式を一つ作れば十分だった。一方、[Kähler計量のホロノミー](../../KAH/KAH1-16/index.md#def-kah1-16-holonomy)は接続に沿ってベクトルを一周させて測る。正則形式の存在とホロノミー群が **ちょうど** $SU(n)$ であることは同じ主張ではない。

この差を、局所座標を貼り合わせる操作が最も単純な例で調べよう。複素ベクトル空間の点を格子ベクトルだけ平行移動して同一視すると、コンパクトな複素多様体ができる。平行移動は微分すると恒等写像なので、正則形式と平坦計量はどちらも商へ降りる。この観察から標準束、Ricci形式、**全**ホロノミーまで直接計算する。

さらに、Hodge数だけを見てこの多様体が射影代数多様体だと判断してよいのか、最後に別の条件を調べる。

## 2. 格子を割ると何が残るか

$V=\mathbb C^n$ を実次元 $2n$ のベクトル空間としても見る。[CM1-09の全格子の定義](../../CM/CM1-09/index.md#def-cm1-09-full-lattice)に従い、実ベクトルとして一次独立な $\lambda_1,\ldots,\lambda_{2n}\in V$ を選び、整数係数で生成される集合を

$$
\Lambda=\mathbb Z\lambda_1+\cdots+\mathbb Z\lambda_{2n}
$$

とする。独立性は「複素数係数で」ではなく、**実数係数で**の独立性である。例えば $\mathbb C$ では $1,i$ は複素線形従属だが実線形独立である。

格子点の差だけ離れた $z,w$ を同一視する $z\sim w\iff z-w\in\Lambda$ を用いる。[既習の高次元複素トーラスの定義](../../CM/CM1-09/index.md#def-cm1-09-complex-torus)により、この商が複素トーラスである。

$$
T=V/\Lambda
$$

商の原点は $[0]$ とし、加法 $[z]+[w]=[z+w]$ を備える。

**直接例の確認。** $\Lambda=\mathbb Z+i\mathbb Z\subset\mathbb C$ なら、実基底 $1,i$ は一次独立で階数 $2$。商 $E=\mathbb C/\Lambda$ の代表を $z=x+iy$ とすれば、$0\le x,y<1$ の半開正方形に選べる。反対の辺を同一視するので境界のないコンパクトな実2次元多様体になる。局所的には十分小さな円板上で別の格子移動像と交わらず、商写像は正則座標を与える。加法が代表の取り方に依存しないのは $(z+\lambda)+(w+\mu)-(z+w)=\lambda+\mu\in\Lambda$ による。この一次元の商は、原点を指定した**楕円曲線の解析的モデル**である。楕円曲線を滑らかな射影三次曲線として表すこととの同値は、後述する古典的な結果を使う。

より一般に、実基底 $\lambda_a$ による平行六面体

$$
P=\left\{\sum_{a=1}^{2n}t^a\lambda_a:0\le t^a\le1\right\}
$$

はコンパクトで、すべての商の点が $P$ の像に入る。よって $T$ はコンパクトである。[全格子の商による複素多様体](../../CM/CM1-09/index.md#thm-cm1-09-quotient-atlas)の定理によれば、格子の一様離散性から小さい開球の格子移動像は互いに重ならず、商写像 $\pi:V\to T$ はその上で正則座標を与える。座標の重なりは $z\mapsto z+\lambda$ であり、そのJacobianは恒等行列。したがって $T$ は滑らか・連結・コンパクトな複素多様体である。

**重要な注意。** $\mathbb C^n$ を階数 $n$ の「複素格子」で割ったつもりになると、例えば $\mathbb C/\mathbb Z$ は虚方向に無限に伸び、コンパクトにはならない。全格子の階数 $2n$ は後のHodge理論を使う前提でもある。

## 3. $dz^1\wedge\cdots\wedge dz^n$ が商へ降りる理由

局所形式を単に $dz^j$ と書くだけでは、大域的に貼り合うことの証明にならない。格子移動を $\tau_\lambda(z)=z+\lambda$ と置くと、$\tau_\lambda^*dz^j=d(z^j+\lambda^j)=dz^j$ である。したがって各 $dz^j$ は商 $T$ 上の大域正則1形式 $\alpha^j$ の引戻しになり、$\pi^*\alpha^j=dz^j$ である。

<a id="prop-cyg1-04-volume-form"></a>

<!-- formal-statement-start -->
> **命題（複素トーラスの標準束と正則最高次形式）**
> $T=\mathbb C^n/\Lambda$ を全格子による複素トーラスとする。商へ降りた $\alpha^1,\ldots,\alpha^n$ は正則余接束 $\Omega_T^1$ の大域枠をなし、

$$
\Omega=\alpha^1\wedge\cdots\wedge\alpha^n
$$

> は各点で零にならない大域正則 $n$ 形式である。従って $K_T\simeq\mathcal O_T$、$c_1(T)_{\mathbb Z}=0$。さらに $H^0(T,K_T)=\mathbb C\Omega$ である。
<!-- formal-statement-end -->

### 証明の見取り図

移動の微分が恒等写像なので1形式もその楔積も不変である。商上の各接空間では $dz^j$ が双対基底なので楔積は非零。正則最高次形式がもう一つあっても、比はコンパクト連結多様体上の正則関数であり定数になる。

<!-- proof-start -->
### 証明

$\tau_\lambda^*dz^j=dz^j$ だから、局所座標の重なりで $dz^j$ の係数は変わらず、$\alpha^j$ が貼り合う。任意の $[z]\in T$ の十分小さい近傍を $U\subset V$ から取る。座標 $z^1,\ldots,z^n$ で $\alpha^j(\partial/\partial z^k)=\delta^j_k$ だから、$\alpha^j$ は各点で複素余接空間の基底。よって

$$
\Omega\left(\frac{\partial}{\partial z^1},\ldots,
\frac{\partial}{\partial z^n}\right)=\det I_n=1\ne0.
$$

これは大域的な正則枠であり、[CYG1-02の標準束の自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)を $K_T$ に適用して $K_T\simeq\mathcal O_T$ を得る。第一Chern類が零であることは[標準束からChern類への含意](../CYG1-01/index.md#prop-cyg1-01-chern-chain)による。

任意の正則 $n$ 形式 $\eta$ は $\Omega$ が非消失なので $\eta=f\Omega$ と一意に書ける。$f$ は大域正則関数であり、[複素トーラス上の大域正則関数の剛性](../../CM/CM1-09/index.md#thm-cm1-09-holomorphic-rigidity)を用いると定数である。したがって $H^0(T,K_T)=\mathbb C\Omega$。$\square$
<!-- proof-end -->

**二つの低次元例。** $n=1$ の $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ では $\Omega=dz$ が零にならない正則1形式。$n=2$ の積 $E\times E$ では座標を $z,w$ とすると $\Omega=dz\wedge dw$ であり、$(\partial_z,\partial_w)$ に代入すると $1$。**$dz\wedge dw$ と $dz\wedge d\bar w$ は型が違う**ので、後者を標準束の正則枠と取り違えない。

## 4. 平坦Kähler計量と全ホロノミー

前節の座標を使うと一定係数のHermitian行列 $H=(h_{j\bar k})$ を選べる。ここで $H^*=H$ かつ $v^*Hv>0$（$v\ne0$）を仮定する。これは「接ベクトルの長さの二乗が正」という条件を座標にしたもの。対応する実のRiemann計量とKähler形式を、それぞれ $g_H$、

$$
\omega_H=i\sum_{j,k=1}^nh_{j\bar k}\,dz^j\wedge d\bar z^k
$$

と記す。係数一定なので格子移動の引戻しで変わらない。正値性は計量の非退化性を与え、$d\omega_H=0$ は各係数の微分が零であることから従う。これは[平坦トーラスの曲率計算](../../KAH/KAH1-10/index.md#prop-kah1-10-flat-torus)と同じモデルを、商での貼り合わせまで明示したものである。

<a id="prop-cyg1-04-flat-holonomy"></a>

<!-- formal-statement-start -->
> **命題（一定Hermitian計量のRicci形式と全ホロノミー）**
> 複素トーラス $T=\mathbb C^n/\Lambda$ と正定値Hermitian行列 $H$ に対して、$g_H$ は $T$ 上の平坦Kähler計量となる。そのRicci形式は零であり、任意の基点 $x\in T$ で制限ホロノミー群と全ホロノミー群はともに

$$
\rho_{g_H}=0,\qquad
\operatorname{Hol}_x^0(g_H)=\operatorname{Hol}_x(g_H)=\{I_n\}.
$$

<!-- formal-statement-end -->

### 証明の見取り図

一定係数では接続係数が零なので、被覆空間の平行移動は座標ベクトルをそのまま運ぶ。ただし「曲率零だから全ホロノミーが自明」とは一般には言えない。最後に閉路の端点を同一視する**格子作用の微分**も確認する。

<!-- proof-start -->
### 証明

各 $dz^j$ が商へ降り、$H$ は一定なので $g_H$ と $\omega_H$ も商へ降りる。Hermitian正値性から正の実計量が得られ、$d\omega_H=0$ によりKählerである。局所座標で $\partial_\ell h_{j\bar k}=0$ のため、[Kähler接続・曲率の計算](../../KAH/KAH1-10/index.md#prop-kah1-10-flat-torus)によるChristoffel係数と曲率は零となる。Ricci形式も直接

$$
\rho_{g_H}=-i\partial\bar\partial\log\det H=0
$$

である。$H$ の行列式は正の**定数**なので対数が取れ、その偏微分は零。

任意の基点 $x=[z_0]$ における区分的滑らかな閉路 $\gamma$ を取り、被覆空間で $z_0$ から始まる持ち上げを考える。その終点は格子ベクトル $\lambda\in\Lambda$ を用いて $z_0+\lambda$ と書ける。

一定係数の接続では平行ベクトルの成分は変わらない。終点の接空間を始点へ戻す貼り合わせは格子平行移動 $\tau_{-\lambda}$ であり、その微分は恒等写像である。従って任意の閉路で

$$
d\tau_{-\lambda}=I_n,\qquad P_\gamma=I_n
$$

となる。[ホロノミー群](../../KAH/KAH1-16/index.md#def-kah1-16-holonomy)の定義から全群は $\{I_n\}$、その部分群である制限群も同じである。$\square$
<!-- proof-end -->

これは「$K_T$ は正則自明」「$\rho_{g_H}=0$」「$\operatorname{Hol}(g_H)=\{I_n\}$」が同時に実現する例だが、それぞれ**別の計算**で確認した。$n\ge2$ なら $SU(n)$ には恒等行列以外の行列があるため、

$$
\operatorname{Hol}(g_H)=\{I_n\}\subsetneq SU(n).
$$

従って標準束自明から $\operatorname{Hol}=SU(n)$ という**等号**は導けない。$n=1$ では $SU(1)=\{1\}$ なので、この特定の比較は真の包含にならない。また別のKähler計量を同じトーラスへ入れた場合までRicci平坦と主張していない。

## 5. Hodgeダイヤモンドの数はどこから出るか

コンパクトKähler多様体の[Hodge数の定義](../../HOD/HOD1-07/index.md#def-hod1-07-hodge-numbers)は $h^{p,q}=\dim_{\mathbb C}H_{\bar\partial}^{p,q}(T)$ である。[Dolbeaultコホモロジーの調和代表](../../HOD/HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)により、平坦計量の調和 $(p,q)$ 形式を数えればよい。ただし「定数係数形式が調和である」だけでは、それ以外が存在しないことを示していない。ここは[HOD1-09の平坦トーラスの定数性補題](../../HOD/HOD1-09/index.md#lem-hod1-09-flat-harmonic)を使う。

既習の[複素トーラスのHodge数定理](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)は、全格子による複素トーラスと一定正定値Hermitian計量という本章の仮定のもとで、調和 $(p,q)$ 形式を $\alpha^I\wedge\bar\alpha^J$（$|I|=p,|J|=q$）の複素線形結合に限定する。従って

$$
h^{p,q}(T)=\binom np\binom nq,
\qquad b_k(T)=\binom{2n}{k}.
$$

**なぜこの公式が適用できるか。** 格子基底 $\lambda_a$ で $z=\sum_at^a\lambda_a$ と置くと、$t^a$ は $\mathbb R/\mathbb Z$ 値の実座標であり、計量は定数正定値実行列 $G$ で表される。非零FourierモードのLaplacian固有値は

$$
\Delta_d e^{2\pi i m\cdot t}
=4\pi^2(m^TG^{-1}m)e^{2\pi i m\cdot t},\qquad
m\ne0\ \Longrightarrow\ m^TG^{-1}m>0.
$$

ゆえに調和形式には定数係数だけが残る。型 $(p,q)$ を数えるには、$n$ 個の $\alpha^j$ から $p$ 個、$n$ 個の $\bar\alpha^j$ から $q$ 個選べばよい。

Betti数は[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)で型別次元を足す。二項式の積

$$
\sum_{k=0}^{2n}b_ks^k=(1+s)^n(1+s)^n=(1+s)^{2n}
$$

の係数比較から得られる。この経路の一般証明は上記のHOD1-09にある。

**楕円曲線のダイヤモンド。** $n=1$ では $\{1,dz,d\bar z,dz\wedge d\bar z\}$ が各型の調和基底である。従って

$$
\begin{matrix}
&h^{0,0}=1&\\
h^{1,0}=1&&h^{0,1}=1\\
&h^{1,1}=1&
\end{matrix}
$$

であり、$b_0=1,b_1=2,b_2=1$。これは既習の[HOD1-07の楕円曲線計算](../../HOD/HOD1-07/index.md#def-hod1-07-hodge-numbers)と同じ値だが、今回は格子商から始めて一般 $n$ へ拡張した。

**複素2次元なら。** $n=2$ の中央の行は $h^{2,0}=1,h^{1,1}=4,h^{0,2}=1$ となり、$b_2=6$。特に $h^{1,0}=2$ である。標準束が自明でも中間の正則形式が消えるとは限らないという、後のCalabi–Yauの定義差に重要な例になる。

## 6. 複素トーラスはすべて射影代数多様体か

楕円曲線は複素次元1のトーラスであり、古典的なWeierstrassの理論により滑らかな射影三次曲線として表せる。しかし**複素次元が2以上の複素トーラスは一般には射影的ではない**。平坦Kähler計量や大域正則体積形式だけでは、射影空間へ埋め込むための正の整係数 $(1,1)$ 類を確保できないからである。

格子の実ベクトル空間 $V_{\mathbb R}$ で、複素構造 $J$ は $Ju=iu$ という実線形写像である。射影性の別条件を調べるには、格子上で整数を取る双線形形式 $E$ で $E(u,u)=0$ を満たすものを選び、$J$ と整合しているかを確かめる。$E(u,u)=0$ という条件から、$0=E(u+v,u+v)=E(u,v)+E(v,u)$ が導かれる。このような正の形式を**Riemann形式**として導入する。

<a id="def-cyg1-04-riemann-form"></a>

<!-- formal-statement-start -->
> **定義（正のRiemann形式）**
> $T=V/\Lambda$ を複素トーラス、$J$ を $V$ 上の複素構造とする。格子上の整数値双線形形式 $E:\Lambda\times\Lambda\to\mathbb Z$ が $E(u,u)=0$ を満たすとし、実双線形に $V_{\mathbb R}$ へ延長する。この延長が任意の $u,v\in V_{\mathbb R}$ に対し

$$
E(Ju,Jv)=E(u,v),\qquad E(u,Ju)>0\quad(u\ne0)
$$

> を満たすとき、$E$ を**正のRiemann形式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cyg1-04-riemann-form -->
**定義の確認**（正方格子）。 $\Lambda=\mathbb Z+i\mathbb Z$ で $u=a+bi$、$v=c+di$（$a,b,c,d\in\mathbb R$）とし、$E(u,v)=ad-bc$ と置く。格子上では整数、$E(v,u)=-E(u,v)$ で交代的。$Ju=-b+ai$、$Jv=-d+ci$ だから

$$
E(Ju,Jv)=(-b)c-a(-d)=ad-bc=E(u,v),
$$

$$
E(u,Ju)=a^2+b^2>0\quad(u\ne0).
$$

よって定義の整数性・交代性・$J$ 不変性・正値性をすべて満たす。
<!-- definition-example-end -->

<a id="thm-cyg1-04-projectivity-criterion"></a>

<!-- formal-statement-start -->
> **定理（複素トーラスの射影性判定：外部入力）**
> 複素トーラス $T=\mathbb C^n/\Lambda$ が複素射影空間に正則埋め込みを持つことと、$\Lambda$ に正のRiemann形式が存在することは同値である。
<!-- formal-statement-end -->

この定理は正の線束と整係数 $(1,1)$ 類を結ぶAppell–Humbert理論・Kodaira埋め込み定理に依存するため、ここでは**証明なしで使用する外部定理**とする。具体的な判定条件は上に全て記した。$n=1$ では任意の格子 $\Lambda=\mathbb Z\lambda_1+\mathbb Z\lambda_2$ について向きを $\operatorname{Im}(\bar\lambda_1\lambda_2)>0$ と選び、

$$
E(u,v)=\frac{\operatorname{Im}(\bar u v)}{\operatorname{Im}(\bar\lambda_1\lambda_2)}
$$

とすると、格子基底の整数係数での行列式になり整数値である。$E(iu,iv)=E(u,v)$ で、$E(u,iu)=|u|^2/\operatorname{Im}(\bar\lambda_1\lambda_2)>0$。ゆえに**すべての一次元複素トーラスは射影的**であることが判定定理から従う。

一方 $n\ge2$ では、正のRiemann形式を持たない複素トーラスが存在する。例えば複素構造を一般に動かすと、固定した非零整数交代形式が $(1,1)$ 型になる条件 $E(Ju,Jv)=E(u,v)$ は真の制約になり、候補となる整数形式は可算個しかない。非射影例の存在を厳密に導く一般論はここでは外部の複素トーラス理論に委ねる。**非射影であっても、前節までの $K_T\simeq\mathcal O_T$、平坦Kähler性、自明ホロノミー、Hodge数の公式はすべて成り立つ。**

## 7. 演習：格子から幾何とHodge数を再構成する

<a id="ex-cyg1-04-a01"></a>
#### CYG1-04-A01 全格子とコンパクト性
- Level: A

$\Lambda=\mathbb Z(1,0)+\mathbb Z(i,0)+\mathbb Z(0,1)+\mathbb Z(0,i)\subset\mathbb C^2$ が全格子であることを実座標で示し、商の複素次元・実次元とコンパクトな基本領域を答えよ。

<!-- solution-start -->
**詳細解答。** $(z^1,z^2)=(x_1+iy_1,x_2+iy_2)$ とし、実座標を $(x_1,y_1,x_2,y_2)$ の順に取る。格子の四つの生成元は標準基底 $(1,0,0,0),(0,1,0,0),(0,0,1,0),(0,0,0,1)$ なので実線形独立である。従って階数 $4=2\cdot2$ の全格子。商は複素次元2、実次元4で、$[0,1]^4$ の像が商全体を覆う。この立方体はコンパクトで、連続な商写像の像もコンパクトとなる。境界の反対側の面が貼られるため商には境界が残らない。
<!-- solution-end -->

<a id="ex-cyg1-04-a02"></a>
#### CYG1-04-A02 形式の貼り合わせと非消失性
- Level: A

$T=\mathbb C^2/\Lambda$ で $\lambda=(\lambda^1,\lambda^2)\in\Lambda$ とする。$dz^1$ と $dz^1\wedge dz^2$ が商へ降りることを示し、後者が正則最高次形式として非消失であることを一つの接基底への代入で確認せよ。

<!-- solution-start -->
**詳細解答。** $\tau_\lambda(z)=z+\lambda$ は定数平行移動なので $\tau_\lambda^*dz^j=d(z^j+\lambda^j)=dz^j$。引戻しは楔積を保つから $\tau_\lambda^*(dz^1\wedge dz^2)=dz^1\wedge dz^2$。よって局所形式は商で貼り合う。複素接基底 $(\partial_{z^1},\partial_{z^2})$ に代入すると $dz^1\wedge dz^2(\partial_{z^1},\partial_{z^2})=1\cdot1-0\cdot0=1$。各点で非零なので[標準束の自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)により $K_T\simeq\mathcal O_T$。
<!-- solution-end -->

<a id="ex-cyg1-04-a03"></a>
#### CYG1-04-A03 定数Hermitian行列の条件
- Level: A

$T=\mathbb C^2/\Lambda$ に $H=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ を用いた計量を降ろす。正定値性、Kähler条件、Ricci形式を順に確認せよ。

<!-- solution-start -->
**詳細解答。** 任意の $v=(v_1,v_2)\in\mathbb C^2$ について

$$
v^*Hv=|v_1+v_2|^2+|v_1|^2+|v_2|^2>0\quad(v\ne0)
$$

なので正定値。係数は一定で、すべての格子平行移動の微分が恒等だから計量・Kähler形式は降りる。$\omega_H=i(2dz^1\wedge d\bar z^1+dz^1\wedge d\bar z^2+dz^2\wedge d\bar z^1+2dz^2\wedge d\bar z^2)$ は係数一定で $d\omega_H=0$。$\det H=4-1=3$ なので $\rho=-i\partial\bar\partial\log3=0$。正定値性・閉性・Ricci形式の消滅は別々に確かめた。
<!-- solution-end -->

<a id="ex-cyg1-04-a04"></a>
#### CYG1-04-A04 楕円曲線の調和形式
- Level: A

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$ の平坦計量で $h^{0,0},h^{1,0},h^{0,1},h^{1,1}$ と $b_1$ を求め、各型の調和基底を一つずつ示せ。

<!-- solution-start -->
**詳細解答。** [HOD1-09のHodge数定理](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)で $n=1$ とすれば $\binom10=\binom11=1$ なので四つのHodge数は各々1。調和基底は順に $1,dz,d\bar z,dz\wedge d\bar z$ であり、格子移動不変かつ定数係数なので商で定義され調和的。Hodge分解で次数1の型は $(1,0),(0,1)$ だけなので $b_1=h^{1,0}+h^{0,1}=2$。
<!-- solution-end -->

<a id="ex-cyg1-04-b01"></a>
#### CYG1-04-B01 斜め格子と面積
- Level: B

$\operatorname{Im}\tau>0$ とし $E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ に $\omega=(i/2)dz\wedge d\bar z$ を入れる。$\omega$ がKähler形式として降りること、$\int_{E_\tau}\omega=\operatorname{Im}\tau$、全ホロノミーが自明なことを示せ。

<!-- solution-start -->
**詳細解答。** $\tau=s+it$（$t>0$）と置くと、格子の実基底 $1,\tau$ の行列式は $t>0$ なので全格子である。まず

$$
\omega=\frac i2(dx+i\,dy)\wedge(dx-i\,dy)=dx\wedge dy
$$

は正の面積形式で係数一定。従って $d\omega=0$ であり、格子移動の下でも不変だから商上のKähler形式となる。

頂点 $0,1,\tau,1+\tau$ の平行四辺形を $z=a+b\tau$（$0\le a,b\le1$）で表すと、$x=a+bs,\ y=bt$ である。したがって

$$
dx\wedge dy=t\,da\wedge db,\qquad
\int_{E_\tau}\omega=\int_0^1\int_0^1t\,da\,db
=t=\operatorname{Im}\tau.
$$

被覆上の平行移動はベクトルの定数成分を保ち、閉路終点を格子移動で戻す微分も $1$ である。よって[ホロノミー群](../../KAH/KAH1-16/index.md#def-kah1-16-holonomy)の定義から全群は $\{1\}$。
<!-- solution-end -->

<a id="ex-cyg1-04-b02"></a>
#### CYG1-04-B02 複素2次元トーラスのHodge数とEuler標数
- Level: B

$T=\mathbb C^2/\Lambda$ について $h^{2,0},h^{1,1},h^{0,2}$、$b_0,\ldots,b_4$、位相的Euler標数 $\chi_{\mathrm{top}}(T)$ を求めよ。また $K_T\simeq\mathcal O_T$ と $h^{1,0}$ の値を比較せよ。

<!-- solution-start -->
**詳細解答。** [HOD1-09のHodge数定理](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)を $n=2$ に適用する。次数2の三つのHodge数は

$$
h^{2,0}=\binom22\binom20=1,\qquad
h^{1,1}=\binom21^2=4,\qquad
h^{0,2}=\binom20\binom22=1.
$$

Betti数は $b_k=\binom4k$ なので列は $(1,4,6,4,1)$ である。交代和を計算すると

$$
\chi_{\mathrm{top}}(T)=1-4+6-4+1=0.
$$

一方 $h^{1,0}=\binom21\binom20=2$ であり、標準束は[本章の大域体積形式命題](#prop-cyg1-04-volume-form)から自明である。最高次の $(2,0)$ 形式の存在は、中間次数の $(1,0)$ 形式が零になることを意味しない。
<!-- solution-end -->

<a id="ex-cyg1-04-b03"></a>
#### CYG1-04-B03 トーラス上の別のKähler計量
- Level: B

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$ で $z=x+iy$ とし、$g_{z\bar z}=e^{\varepsilon\cos(2\pi x)}$（$\varepsilon\in\mathbb R\setminus\{0\}$）を与える。Kähler性、Ricci形式の非零性、実係数第一Chern類との関係を調べよ。

<!-- solution-start -->
**詳細解答。** $g_{z\bar z}>0$ かつ周期1の滑らかな関数なので、格子商へ降りる。複素次元1ではKähler形式は実2形式で、その外微分は実3形式となり必ず零。従ってKähler計量である。$\partial\bar\partial f=(1/4)(f_{xx}+f_{yy})dz\wedge d\bar z$ を $f=\log g=\varepsilon\cos(2\pi x)$ に適用すると

$$
f_{xx}=-4\pi^2\varepsilon\cos(2\pi x),\quad f_{yy}=0,
$$

$$
\rho=-i\partial\bar\partial f=i\pi^2\varepsilon\cos(2\pi x)\,dz\wedge d\bar z.
$$

$x=0$ で非零だから指定計量はRicci平坦ではない。しかし $\rho=-i\partial\bar\partial f$ は大域関数から作る完全な実2形式で、$[\rho]=0$。実係数第一Chern類は[Ricci–Chern対応](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)から零であり、$K_E$ 自明という結果と矛盾しない。前節のRicci形式零は**定数係数の計量を選んだとき**の結論だった。
<!-- solution-end -->

<a id="ex-cyg1-04-b04"></a>
#### CYG1-04-B04 任意の楕円格子にRiemann形式を作る
- Level: B

$\tau=s+it$（$t>0$）、$\Lambda=\mathbb Z+\tau\mathbb Z$ とする。実ベクトル $u=a+b\tau$、$v=c+d\tau$ に $E(u,v)=ad-bc$ と置く。$E$ が正のRiemann形式の全条件を満たすことを、$J$ の作用も含めて確認せよ。

<!-- solution-start -->
**詳細解答。** 格子元なら $a,b,c,d\in\mathbb Z$ なので $E$ は整数値。式から双線形かつ $E(v,u)=-E(u,v)$。実・虚部を使って

$$
E(u,v)=\frac{\operatorname{Im}(\bar u v)}{t}
$$

と書ける。なぜなら $\operatorname{Im}(\overline{a+b\tau}(c+d\tau))=t(ad-bc)$ だからである。従って $E(iu,iv)=\operatorname{Im}(\overline{iu}iv)/t=E(u,v)$、さらに

$$
E(u,Ju)=E(u,iu)=\frac{\operatorname{Im}(i|u|^2)}t=\frac{|u|^2}{t}>0
$$

が $u\ne0$ で成り立つ。正の[本章のRiemann形式の定義](#def-cyg1-04-riemann-form)の全条件を満たすので、[射影性判定定理（外部入力）](#thm-cyg1-04-projectivity-criterion)から $E_\tau$ は射影的となる。
<!-- solution-end -->

<a id="ex-cyg1-04-c01"></a>
#### CYG1-04-C01 積トーラスの幾何と射影性を総合判定する
- Level: C

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$、$T=E\times E$ とし、$z,w$ 座標に定数計量 $H=I_2$ を入れる。以下を順序立てて判定せよ。

1. $T$ のコンパクト性、標準束の正則自明性と正則最高次形式の次元。
2. $\rho$、全ホロノミー、$SU(2)$ との包含関係。
3. $h^{p,q}$（$0\le p,q\le2$）、$b_2$、$\chi_{\mathrm{top}}$。
4. $T$ に正のRiemann形式があることを示して射影性を判定し、これらの数値・計量情報だけで**任意の**複素2次元トーラスが射影的と結論できるかを論じよ。

<!-- solution-start -->
**詳細解答。** 1. $\Lambda=(\mathbb Z+i\mathbb Z)^2$ の四つの生成元は $\mathbb C^2$ の実基底だから全格子で、基本領域 $[0,1]^4$ の像がコンパクトな $T$ を覆う。格子の微分は $I_2$ なので $dz,dw$ が降り、$\Omega=dz\wedge dw$ は $(\partial_z,\partial_w)$ に代入して $1$。従って[本章の標準束命題](#prop-cyg1-04-volume-form)で $K_T\simeq\mathcal O_T$、$H^0(T,K_T)=\mathbb C\Omega$、次元1。

2. $\det H=1$ だから $\rho=-i\partial\bar\partial\log1=0$。任意の閉路は被覆空間で格子ベクトルだけ終点がずれるが、平行移動とその終端同一視の微分はともに $I_2$。従って $\operatorname{Hol}(g_H)=\{I_2\}$。例えば $\operatorname{diag}(e^{i\theta},e^{-i\theta})$（$0<\theta<\pi$）は $SU(2)$ の非単位元なので $\{I_2\}\subsetneq SU(2)$。

3. [HOD1-09のHodge数定理](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)で $\binom20=1,\binom21=2,\binom22=1$ より、$p$ を行、$q$ を列に並べると

$$
(h^{p,q})_{0\le p,q\le2}
=\begin{pmatrix}1&2&1\\2&4&2\\1&2&1\end{pmatrix}.
$$

次数2は $h^{2,0}+h^{1,1}+h^{0,2}=1+4+1=6$。Betti数列は $(1,4,6,4,1)$、従って $\chi_{\mathrm{top}}=1-4+6-4+1=0$。

4. $u=(u_1,u_2),v=(v_1,v_2)$ に対して

$$
E(u,v)=\operatorname{Im}(\bar u_1v_1)+\operatorname{Im}(\bar u_2v_2)
$$

と置く。格子上で各項は整数、交代的で、$E(iu,iv)=E(u,v)$。さらに $E(u,iu)=|u_1|^2+|u_2|^2>0$（$u\ne0$）なので正のRiemann形式。ゆえに[射影性判定（外部入力）](#thm-cyg1-04-projectivity-criterion)でこの $T$ は射影的。ただし一般の2次元複素トーラスでこのような**整数値**の正の形式があるとは限らない。前3項の標準束・平坦性・ホロノミー・Hodge数は任意の複素トーラスに共通するため、そこから射影性を推論するのは誤りである。
<!-- solution-end -->

## 次の講義へ

楕円曲線と複素トーラスでは、正則体積形式も平坦Kähler計量も具体的に作れた。しかし複素2次元トーラスには非零の正則1形式が二つあり、全ホロノミーは自明であって $SU(2)$ と等しくない。次は四次曲面で、標準束が自明という点は共通でもHodge数・位相・ホロノミーの事情が大きく異なるK3の模型を調べる。
