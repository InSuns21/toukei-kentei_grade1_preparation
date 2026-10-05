# NS8A 補講：2026年の有限時間特異点構成と検証状況

> **研究状況の基準日：2026年10月5日。**  
> この補講だけは研究・認定状況が変わり得ます。数学的内容と、Clay Mathematics Institute（CMI）の賞の認定状況を分けて読みます。

NS8 では、CMI の公式 problem description を直接読み、三次元 Navier--Stokes 問題には

- 全空間・無外力の大域滑らかさを問う Statement A、
- 周期空間・無外力の大域滑らかさを問う Statement B、
- 全空間で滑らかな外力を許して breakdown を示す Statement C、
- 周期空間で滑らかな外力を許して breakdown を示す Statement D

という四つの accepted target があることを確認しました。

2026年9月8日に公表された結果は、このうち **C と D を狙う有限時間特異点構成**です。したがって最初に固定すべき論理は

$$
\boxed{
\text{C / D の成立}
\not\Rightarrow
\text{無外力 A / B の否定}
}
$$

です。

この章の目的は「Navier--Stokes が解けたらしい」というニュースを読むことではありません。NS1--NS7 で作った道具を使って、

$$
\text{滑らかな外力}
\longrightarrow
\text{滑らかな古典解}
\longrightarrow
\text{有限エネルギーのまま速度が集中}
\longrightarrow
\text{有限時間で }L^\infty\text{ 発散}
$$

がどう両立するのかを、主要な尺度計算と構成機構まで追います。

一次資料は次です。

- [OpenAI, On the Navier--Stokes Millennium Prize Problem](https://openai.com/index/navier-stokes-solution/)
- [OpenAI, Finite Time Blowup for Navier--Stokes](https://cdn.openai.com/pdf/0908-NS-Research-Paper-20260907b.pdf)
- [Lean formalization: openai/NavierStokesAndEuler](https://github.com/openai/NavierStokesAndEuler)
- [CMI, Navier-Stokes Announcement](https://www.claymath.org/news/navier-stokes-announcement/)
- [CMI, Navier-Stokes Equation](https://www.claymath.org/millennium/Navier-Stokes-Equation/)
- [Charles L. Fefferman, Existence and Smoothness of the Navier--Stokes Equation](https://www.claymath.org/wp-content/uploads/2022/06/navierstokes.pdf)
- [CMI, Rules for the Millennium Prize Problems](https://www.claymath.org/millennium-problems/rules/)

---

## 1. 何が新しかったのか

NS3 では Leray--Hopf 弱解が大域的に存在することを学びました。NS5 では滑らかな初期値から短時間の強解を作り、有限最大存在時刻があるなら高階ノルムが発散しなければならないことを確認しました。NS6--NS7 では、エネルギーだけでは小スケール集中を排除できず、臨界量の制御が本質になることを見ました。

したがって 2026年の結果を読むときの中心問いは、

> 有限エネルギーを保ったまま、どのように速度を小領域へ集中させ、しかも方程式を満たすための外力を最後まで滑らかに保つのか。

です。

単に大きな速度場を手で書いて

$$
f
=
\partial_tu+(u\cdot\nabla)u-\nu\Delta u+\nabla p
$$

と置くだけでは不十分です。その $f$ 自体が特異になれば、CMI の Statement C / D で許された滑らかな外力ではなくなるからです。

---

## 2. 2026年結果の全空間主結果

まず論文の主定理を、この講義で必要な条件が見える形に整理します。

<a id="thm-ns8a-forced-blowup-2026"></a>

<!-- formal-statement-start -->
> **定理（2026年の全空間有限時間特異点構成）**  
> 任意の粘性係数 $\nu>0$ に対して、滑らかな速度 $u$、圧力 $p$、滑らかな外力 $f$ とコンパクト集合 $K\subset\mathbb R^3$ を選べる。$0\le t<1$ で

$$
\partial_tu+(u\cdot\nabla)u-\nu\Delta u+\nabla p=f,
\qquad
\nabla\cdot u=0,
$$

> を満たし、初期速度は

$$
u(x,0)=0
$$

> である。外力は時空間で滑らかかつコンパクト台を持ち、$u(\cdot,t)$ と $p(\cdot,t)$ の空間台は $t<1$ で共通の $K$ に含まれる。さらに

$$
\sup_{0\le t<1}\|u(t)\|_{L^2(\mathbb R^3)}<\infty
$$

> である一方、

$$
\limsup_{t\uparrow1}\|u(t)\|_{L^\infty(\mathbb R^3)}
=
\infty.
$$

> 同じ初期値と外力に対する全時間の smooth finite-energy solution は存在しない。
<!-- formal-statement-end -->

初期値が $u^0=0$ であることは重要です。初期状態そのものに粗さを埋め込んでいるのではありません。さらに

$$
f\in C_c^\infty
$$

なので、外力にも特異点を仕込んでいません。

「外力付きだから簡単」という読み方も正しくありません。CMI の Statement C は最初から滑らかな外力を許しています。難所は、その admissible class の中で **smooth forcing のまま smooth solution を有限時間で壊す**ことです。

---

## 3. 特異時刻へ近づく変数

特異時刻を

$$
T_*=1
$$

に正規化し、

$$
\tau=1-t
$$

と置きます。$t\uparrow1$ は $\tau\downarrow0$ と同じです。

論文では、小さい固定定数 $h$ を

$$
0<h<\frac1{100}
$$

に取ります。

<a id="def-ns8a-core-scales"></a>

<!-- formal-statement-start -->
> **定義（2026年構成の主要尺度）**  
> 特異時刻までの残り時間を $\tau=1-t$ とする。構成の中心領域では、代表的な半径方向尺度 $\ell_r$、軸方向尺度 $\ell_z$、主要速度振幅を

$$
\ell_r\asymp\tau^{1/2},
\qquad
\ell_z\asymp\tau^{1/2-h},
$$

$$
|u_\theta^{(0)}|,\ |u_z^{(0)}|
\asymp
\tau^{-1/2-h},
\qquad
|u_r^{(0)}|
=
O(\tau^{-1/2})
$$

> という次数で読む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns8a-core-scales -->
**定義の確認**

$0<\tau<1$ とします。半径方向と軸方向の比は

$
\frac{\ell_z}{\ell_r}
\asymp
\frac{\tau^{1/2-h}}{\tau^{1/2}}
=
\tau^{-h}.
$

$h>0$ なので

$
\tau^{-h}>1,
\qquad
\tau\downarrow0
\ \Longrightarrow\
\tau^{-h}\to\infty.
$

従って特異時刻へ近づくほど、中心領域は半径方向より軸方向に相対的に長くなります。

また主要速度を自然な放物型振幅 $\tau^{-1/2}$ と比べると

$
\frac{\tau^{-1/2-h}}{\tau^{-1/2}}
=
\tau^{-h}\to\infty.
$

つまり「軸方向を自然尺度より $\tau^{-h}$ 倍長くし、主要速度も自然振幅より $\tau^{-h}$ 倍強くする」という組合せが、この定義の具体的な意味です。
<!-- definition-example-end -->

ここで $\\asymp$ は、$\\tau\\downarrow0$ で正の定数倍の範囲に上下から挟まれるという「次数の比較」に使っています。

半径方向は熱方程式の自然尺度

$$
\ell_r\sim\sqrt{\tau}
$$

ですが、軸方向は

$$
\tau^{1/2-h}
>
\tau^{1/2}
$$

なので少し長く、速度の主要成分には自然な $\tau^{-1/2}$ よりさらに

$$
\tau^{-h}
$$

の増幅が乗っています。この小さな指数差が、集中と有限エネルギーを両立させます。

---

## 4. 速度が発散してもエネルギーは発散しない

ここは NS6 との最重要接続です。

中心領域の体積は、二つの半径方向と一つの軸方向の尺度を掛けて

$$
V_{\mathrm{core}}
\asymp
\ell_r^2\ell_z.
$$

主要尺度を代入すると

$$
V_{\mathrm{core}}
\asymp
\tau^{1/2}
\tau^{1/2}
\tau^{1/2-h}
=
\tau^{3/2-h}.
$$

一方、主要速度振幅の二乗は

$$
|u|^2
\asymp
\tau^{-1-2h}.
$$

したがって中心領域の運動エネルギー次数は

$$
|u|^2V_{\mathrm{core}}
\asymp
\tau^{-1-2h}
\tau^{3/2-h}
=
\tau^{1/2-3h}.
$$

<a id="prop-ns8a-energy-concentration"></a>

<!-- formal-statement-start -->
> **命題（集中による有限エネルギーと速度発散の両立）**  
> 上の主要尺度を仮定する。$h<1/6$ なら中心領域の速度振幅は $\tau\downarrow0$ で発散する一方、その領域が担う $L^2$ エネルギーの代表次数は

$$
\tau^{1/2-3h}\longrightarrow0.
$$

> 特に論文の $0<h<1/100$ では、$L^\infty$ 発散と一様な有限 $L^2$ エネルギーは矛盾しない。
<!-- formal-statement-end -->

### 証明の見取り図

見るべきものは「高さ」だけではなく、

$$
\text{振幅}^2
\times
\text{集中領域の体積}
$$

です。速度は高くなりますが、支える領域はそれ以上に小さくなります。

<!-- proof-start -->
### 証明

主要速度振幅から

$$
|u|^2
\asymp
\tau^{-1-2h}.
$$

中心領域体積は

$$
\ell_r^2\ell_z
\asymp
(\tau^{1/2})^2
\tau^{1/2-h}
=
\tau^{3/2-h}.
$$

よって積は

$$
\tau^{-1-2h}
\tau^{3/2-h}
=
\tau^{1/2-3h}.
$$

$h<1/6$ なら

$$
\frac12-3h>0
$$

なので

$$
\tau^{1/2-3h}\to0.
$$

一方

$$
\tau^{-1/2-h}\to\infty.
$$

従って点wiseな速度振幅の発散と $L^2$ エネルギーの有限性は同時に起こり得ます。
<!-- proof-end -->

NS6 で「$L^2$ は三次元で超臨界」と学んだ意味が、ここで具体化します。$L^2$ を抑えても、小さい領域に高い速度を集中させる自由度が残ります。

---

## 5. 粘性はなぜ直ちに集中を消さないのか

粘性項は小スケールを平滑化します。それでも特異点構成が成立するなら、輸送・圧力・粘性を同じ尺度で釣り合わせる必要があります。

半径方向の輸送率は

$$
\frac{|u_r|}{\ell_r}
=
O\left(
\frac{\tau^{-1/2}}{\tau^{1/2}}
\right)
=
O(\tau^{-1}).
$$

軸方向も

$$
\frac{|u_z|}{\ell_z}
\asymp
\frac{\tau^{-1/2-h}}{\tau^{1/2-h}}
=
\tau^{-1}.
$$

半径方向粘性は

$$
\frac{\nu}{\ell_r^2}
\asymp
\nu\tau^{-1}.
$$

したがって三つとも主要時間尺度

$$
\tau^{-1}
$$

に乗ります。

一方、軸方向拡散と半径方向拡散の比は

$$
\frac{\ell_r^2}{\ell_z^2}
\asymp
\tau^{2h}
\longrightarrow0.
$$

つまり構成は等方的ではありません。軸方向を少し長く保つことで、半径方向の強い粘性と輸送を主バランスに置きつつ、軸方向拡散を低い次数へ落とします。

また代表的な角方向 Reynolds 数は

$$
\operatorname{Re}_\theta
\asymp
\tau^{-h}
\longrightarrow\infty,
$$

半径方向は

$$
\operatorname{Re}_r=O(1)
$$

です。

「粘性があるのに blow-up」という一文ではなく、**どの方向でどの項が同じ次数に残り、どの方向の拡散が相対的に小さくなるか**を見る必要があります。

---

## 6. 任意の発散場から外力を定義するだけでは失敗する

候補の速度・圧力が方程式をどれだけ満たしていないかを一つの量にまとめ、最終的にそれを滑らかな外力へしたいので、方程式左辺そのものを次の量として取り出します。

<a id="def-ns8a-residual"></a>

<!-- formal-statement-start -->
> **定義（Navier--Stokes 残差）**  
> 滑らかな候補 $u,p$ に対し、粘性係数 $\nu>0$ で

$$
R_\nu(u,p)
=
\partial_tu
+
(u\cdot\nabla)u
-
\nu\Delta u
+
\nabla p
$$

> を Navier--Stokes 残差と呼ぶ。$f=R_\nu(u,p)$ が admissible な滑らかな外力として特異時刻を越えて延長できれば、候補は外力付き Navier--Stokes 解になる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns8a-residual -->
**定義の確認**

時間に依らない shear flow

$
u(x)
=
\left(
e^{-x_2^2},
0,
0
\right),
\qquad
p(x)=0
$

を考えます。$u_1$ は $x_1$ に依らないので

$
\nabla\cdot u
=
\partial_1u_1
=
0.
$

また

$
(u\cdot\nabla)u
=
u_1\partial_1u
=
0,
\qquad
\partial_tu=0.
$

二階微分は

$
\partial_2^2 e^{-x_2^2}
=
(4x_2^2-2)e^{-x_2^2}
$

なので、

$
R_\nu(u,0)
=
-\nu\Delta u
=
\nu
\left(
(2-4x_2^2)e^{-x_2^2},
0,
0
\right).
$

この例では、残差を外力

$
f=R_\nu(u,0)
$

と取れば、候補 $u$ は外力付き Navier--Stokes 方程式を満たします。NS8A の難しさは、この単純例と違って $u$ が有限時間で発散するのに、同じ残差 $f$ をなお滑らかに保つ点にあります。
<!-- definition-example-end -->

問題は

$
u\\to\\infty
$

なら各項も巨大になることです。粗雑に候補を作ると

$$
R_\nu(u,p)
$$

も同じ時刻で発散し、Statement C の admissible forcing を失います。

従って証明の核心は

$$
\boxed{
u\text{ は特異になるが }
R_\nu(u,p)\text{ は滑らかに残る}
}
$$

よう、巨大な項を**設計して相殺すること**です。

---

## 7. 構成の核心：背景流・環状応力・振動パルス

論文全体の長い技術計算を一つの式へ圧縮することはできません。しかし、何をしているのかという核心は次の順に追えます。

### 7.1 軸対称な背景流を作る

まず、前節の異方的尺度で集中する軸対称背景流を用意します。中心部では輸送・圧力・粘性を主要次数で釣り合わせます。

ただし、中心部だけを空間全体へそのまま貼ることはできません。集中領域と外側をつなぐ遷移環では残差が生じます。

### 7.2 残差を「必要な応力」として読む

遷移環で残る主要残差を、単に誤差として捨てず、

$$
\operatorname{div} S
$$

型の応力の発散として読み替えます。

ここで欲しいのは、速度補正 $w$ の平均が小さくても

$$
w\otimes w
$$

の平均が指定された応力を作る仕組みです。

最小模型として

$$
w(\theta)
=
a\cos(k\theta)
$$

なら

$$
\frac1{2\pi}
\int_0^{2\pi}
w(\theta)\,d\theta
=
0
$$

ですが、

$$
\frac1{2\pi}
\int_0^{2\pi}
w(\theta)\otimes w(\theta)\,d\theta
=
\frac12 a\otimes a
$$

です。

**一次平均は消えるのに二次運動量流束は残る**。これが高周波補正を使う理由の原型です。

### 7.3 振動パルスで主要残差を相殺する

論文では環状に局在した空間振動パルスを追加します。パルスは角方向平均を打ち消しながら、二次の運動量流束を残し、それが背景残差の主要部分を相殺するよう調整されます。

背景のせん断はパルスを増幅しますが、その増幅も含めて時間・空間尺度を選びます。

### 7.4 補正を繰り返し、残差を平坦化する

一回の補正ですべては消えません。残った低次数の項へさらに補正を加え、特異時刻へ近づく残差の次数を順に改善します。

最終的に残差が $t=1$ を越えて

$$
C^\infty
$$

に延長できるところまで平坦化します。

### 7.5 外側は熱方程式でつなぎ、空間的に切り落とす

中心構成の外側では角方向成分を熱方程式型の場へ接続し、残差を消します。その後さらに空間 cutoff を行います。

cutoff は新しい残差を生みますが、そこは特異中心から離れており、場がすでに滑らかなので、その残差も滑らかな外力へ吸収できます。

この順により、最終的な

$$
f=R_\nu(u,p)
$$

は滑らかでコンパクト台を持ちます。

---

## 8. 「大きな項の相殺」は何を意味するか

Navier--Stokes の各項の大きさを別々に小さくする必要はありません。必要なのは和

$$
\partial_tu
+
(u\cdot\nabla)u
-
\nu\Delta u
+
\nabla p
$$

が滑らかに残ることです。

したがって、

- 加速度が大きい、
- 非線形輸送が大きい、
- 圧力勾配が大きい、
- 粘性項が大きい、

という事実だけから「外力も特異」とは結論できません。

主要次数で

$$
\partial_tu
+
(u\cdot\nabla)u
-
\nu\Delta u
+
\nabla p
\approx0
$$

になるよう背景流を設計し、遷移部で残るものを振動応力と補正で消すことが本質です。

これは NS2 のエネルギー相殺よりはるかに精密ですが、発想は似ています。**各項の絶対値ではなく、方程式が要求する組合せを見る**のです。

---

## 9. 一般の粘性係数へどう戻すか

論文は粘性 $1$ の構成を得たあと、任意の $\nu>0$ へ空間 rescaling します。

粘性 $1$ の解を $(u,p,f)$ とすると、代表的には

$$
u_\nu(x,t)
=
\sqrt{\nu}\,
u\left(\frac{x}{\sqrt{\nu}},t\right),
$$

$$
p_\nu(x,t)
=
\nu\,
p\left(\frac{x}{\sqrt{\nu}},t\right),
$$

$$
f_\nu(x,t)
=
\sqrt{\nu}\,
f\left(\frac{x}{\sqrt{\nu}},t\right)
$$

と取ります。

空間微分は

$$
\nabla_x
=
\nu^{-1/2}\nabla_y,
\qquad
y=\frac{x}{\sqrt{\nu}}
$$

なので、

$$
(u_\nu\cdot\nabla_x)u_\nu
=
\sqrt{\nu}\,
(u\cdot\nabla_y)u,
$$

$$
\nu\Delta_xu_\nu
=
\sqrt{\nu}\,
\Delta_yu,
$$

$$
\nabla_xp_\nu
=
\sqrt{\nu}\,
\nabla_yp.
$$

時間微分も

$$
\partial_tu_\nu
=
\sqrt{\nu}\,\partial_tu.
$$

よって全項が同じ $\sqrt{\nu}$ 倍になり、粘性 $\nu$ の方程式が得られます。時間は rescale していないので、特異時刻 $t=1$ はそのままです。

---

## 10. Statement C にどう対応するか

NS8 の [公式 A / B / C / D の論理構造](../NS8/index.md#prop-ns8-four-alternatives)へ戻ります。

Statement C で必要だったものを一つずつ照合します。

1. **領域**：$\mathbb R^3$。
2. **初期値**：滑らか、発散零、急減少。ここでは $u^0=0$ なので満たす。
3. **外力**：滑らかで空間・時間に急減少。ここでは $C_c^\infty$ なので、任意次数の急減少条件よりさらに強い。
4. **有限エネルギー**：$t<1$ で $\|u(t)\|_2$ が一様有界。
5. **breakdown**：$t\uparrow1$ で $\|u(t)\|_\infty$ が非有界。
6. **大域 smooth finite-energy competitor の不存在**：論文では同一データに対する局所一意性と構成解の発散を使って排除する。

<a id="prop-ns8a-cd-mapping"></a>

<!-- formal-statement-start -->
> **命題（2026年構成の C / D 対応）**  
> 上の全空間構成は CMI 公式問題の Statement C に対応する。さらに構成の空間台を基本周期セルの内部へ圧縮して周期化することで、同じ型の有限時間 breakdown を周期領域で得られ、Statement D に対応する。
>
> これらの結論だけから、無外力の Statement A または B の真偽は決まらない。
<!-- formal-statement-end -->

### 証明の見取り図

C では非零外力が許され、今回の $f$ はその滑らかさ・減衰条件を満たします。D はコンパクトな全空間構成を周期セル内へ入れて lattice sum で周期化します。A/B は $f=0$ を全初期値について問うため、量化と外力条件が別です。

<!-- proof-start -->
### 証明

全空間では $u^0=0$ は滑らか・発散零・急減少です。$f\in C_c^\infty$ なら、任意の多重指数 $\alpha$、時間微分次数 $m$、任意の $N$ に対し、ある定数 $C_{\alpha,m,N}$ が存在して

$$
|\partial_x^\alpha\partial_t^m f(x,t)|
\le
C_{\alpha,m,N}(1+|x|+t)^{-N}
$$

を満たします。コンパクト台の外では左辺が $0$ だからです。

さらに定理は一様 $L^2$ 有界性と $L^\infty$ 発散を同時に与え、同じデータに対する global smooth finite-energy solution の不存在を含みます。従って Statement C の条件を満たします。

周期版では、空間台を基本セル内部へ収めたあと周期化します。異なる格子コピーが重ならないようにして局所 PDE を保ち、外力も周期化します。これにより smooth periodic forcing と zero initial velocity を持つ periodic breakdown が得られ、Statement D に対応します。

一方 A/B は

$$
f=0
$$

の下で任意の admissible 初期値に対する大域滑らかさを主張します。C/D の証明では非零外力を利用してよいので、

$$
C\not\Rightarrow\neg A,
\qquad
D\not\Rightarrow\neg B.
$$

よって無外力 A/B の真偽はこの論理だけでは決まりません。
<!-- proof-end -->

---

## 11. Leray--Hopf 弱解と矛盾しない

ここで

> 有限時間で smooth solution が壊れるなら、NS3 の大域弱解存在と矛盾するのではないか。

という疑問が出ます。

矛盾しません。

NS3 が保証したのは、エネルギー階級

$$
u\in
L^\infty_tL^2_x
\cap
L^2_tH^1_x
$$

での大域弱解です。

今回壊れるのは、公式 problem description が要求する全時間の smooth solution です。

特異時刻前は構成解が滑らかなので、弱--強一意性が使える区間では Leray--Hopf 解と一致します。しかし $t=1$ で古典的な正則性が失われた後、弱解クラスへ移って continuation が存在すること自体は排除されません。

従って

$$
\boxed{
\text{smooth breakdown}
\quad\text{と}\quad
\text{global weak existence}
}
$$

は両立できます。

むしろ今回の例は、NS3 と NS5 の役割を鮮明にします。

- NS3: 有限エネルギーの弱解は大域に作れる。
- NS5: 強解は blow-up alternative の壁を持つ。
- NS8A: smooth forcing の下で、その壁へ実際に到達する構成を与える。

---

## 12. Lean 形式化は何を保証しているか

公開リポジトリ openai/NavierStokesAndEuler には、数学論文 に対応する Lean 形式化があります。

たとえば全空間側では、形式化された主結果が

- 任意の正粘性、
- 構成された速度・圧力・外力、
- 発散零、
- Navier--Stokes 方程式、
- 零初期速度、
- 有限エネルギー条件、
- 有限時間の速度非有界性、
- 同じデータに対する global finite-energy smooth solution の不存在

を一つの theorem chain として結びます。

周期側でも、圧縮した全空間構成を periodize し、global smooth periodic competitor を排除する theorem が形式化されています。

ここで四つを分けます。

### 12.1 数学論文

人間向けの数学的構成・評価・補題の体系です。

### 12.2 Lean の theorem statement

機械が実際に検証する命題です。自然言語の「同じ問題を形式化したつもり」という説明だけでなく、量化、領域、正則性、外力、エネルギー、breakdown の条件をコード側で固定します。

### 12.3 Lean kernel による導出検証

登録された定義・公理・ライブラリの上で、その theorem statement が形式的に導出されていることを検査します。長い手計算の取り違えや、未証明の中間補題を「当然」として通すことはできません。

### 12.4 CMI の problem statement / Prize Rules との照合

これは別の仕事です。

形式化された theorem が Fefferman の Statement C / D と数学的に対応しているか、どの公表・受容・審査手続きが賞の条件になるかは、Lean kernel が自動的に決める項目ではありません。

したがって

$$
\boxed{
\text{Lean で検証済み}
\not\equiv
\text{CMI の賞の認定手続きが完了}
}
$$

です。

これは Lean の価値を下げる話ではありません。むしろ「内部の論理的導出」と「外部の問題設定との意味対応」を分けることで、形式証明の保証範囲が明確になります。

---

## 13. 2026年10月5日時点の状況

基準日を付けて状態を固定します。

| 項目 | 2026年10月5日時点 |
| --- | --- |
| 数学論文 | 公開済み |
| Lean formalization | 公開済み |
| 主張される公式 target | Statement C / D |
| CMI の 2026-09-11 発表 | problem has apparently been settled と表現 |
| CMI Navier--Stokes 問題ページ | Active 表示 |
| Prize Rules に基づく最終認定 | 完了したものとしては扱わない |
| 無外力 A / B | C / D の論理的帰結としては決まらない |

この表の最後の二行は特に重要です。

**数学的な C/D 型結果の公表**と、**CMI の最終的な prize recognition**は同じイベントではありません。また C/D と無外力 A/B は、NS8 で確認した通り単純な否定関係ではありません。

---

## 14. ここまでの流れを一本にする

NS1--NS8A を一行でつなぐと、

$$
\text{Leray 射影}
\to
\text{エネルギー}
\to
\text{大域弱解}
\to
\text{2D 制御}
\to
\text{3D 局所強解}
\to
\text{臨界性}
\to
\text{正則性判定}
\to
\text{公式 C/D}
\to
\text{有限時間特異点構成}
$$

です。

2026年構成で起きることは、NS6 で抽象的に見た「超臨界エネルギーでは集中を止められない」という可能性を、非常に精密な異方的構成で実現したものと読めます。

ただし、単なる scaling argument だけでは解は作れません。

本当に難しいのは、

1. 速度を集中させる。
2. 非圧縮条件を保つ。
3. 圧力を整合させる。
4. 粘性と輸送を釣り合わせる。
5. 遷移領域の残差を振動応力で消す。
6. 残差を $C^\infty$ まで平坦化する。
7. 外力をコンパクト台へ局在化する。
8. 同じデータの global smooth competitor を排除する。

を同時に満たすことです。

「渦が細くなるから blow-up」では、2--8 が全部抜けています。

---

# 演習

## Level A

<a id="ex-ns8a-a01"></a>
### A1. 主定理の条件を Statement C と照合する

2026年の全空間定理について、次の各条件が Statement C のどの要求を満たすか説明せよ。

1. $u(x,0)=0$。
2. $\nabla\cdot u=0$。
3. $f\in C_c^\infty$。
4. $\sup_{t<1}\|u(t)\|_2<\infty$。
5. $\limsup_{t\uparrow1}\|u(t)\|_\infty=\infty$。

- Level: A

<!-- solution-start -->
### 詳細解答

1. $u^0=0$ は $C^\infty$ で、発散零で、任意次数の急減少条件を自動的に満たします。
2. $\nabla\cdot u=0$ は非圧縮条件そのものです。
3. $f\in C_c^\infty$ は滑らかで、台の外では全微分が $0$ です。従って公式問題の空間・時間の任意多項式次数の減衰条件を満たします。
4. 一様 $L^2$ 有界性は finite-energy 条件を保証します。
5. $L^\infty$ 非有界性は、$t=1$ まで同じ構成解を smooth に延長できないことを示す特異性です。さらに主定理は同じデータに対する global smooth finite-energy competitor の不存在まで含むので、Statement C の breakdown 結論に対応します。
<!-- solution-end -->

<a id="ex-ns8a-a02"></a>
### A2. 集中領域のエネルギー

$$
\ell_r\asymp\tau^{1/2},
\qquad
\ell_z\asymp\tau^{1/2-h},
\qquad
|u|\asymp\tau^{-1/2-h}
$$

とする。中心領域の体積と運動エネルギーの次数を求め、$h<1/6$ ならエネルギーが発散しないことを示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

中心領域には半径方向尺度が二つ、軸方向尺度が一つあるので

$$
V_{\mathrm{core}}
\asymp
\ell_r^2\ell_z.
$$

従って

$$
V_{\mathrm{core}}
\asymp
(\tau^{1/2})^2\tau^{1/2-h}
=
\tau^{3/2-h}.
$$

速度の二乗は

$$
|u|^2
\asymp
\tau^{-1-2h}.
$$

よって代表的なエネルギーは

$$
|u|^2V_{\mathrm{core}}
\asymp
\tau^{-1-2h}\tau^{3/2-h}
=
\tau^{1/2-3h}.
$$

$h<1/6$ なら指数は正なので

$$
\tau^{1/2-3h}\to0.
$$

速度振幅そのものは $\tau^{-1/2-h}\to\infty$ ですが、領域の縮小がそれを上回るため、$L^2$ エネルギーは発散しません。
<!-- solution-end -->

<a id="ex-ns8a-a03"></a>
### A3. 輸送と粘性の時間尺度

$$
|u_r|=O(\tau^{-1/2}),
\qquad
|u_z|\asymp\tau^{-1/2-h}
$$

を使い、

$$
\frac{|u_r|}{\ell_r},
\qquad
\frac{|u_z|}{\ell_z},
\qquad
\frac{\nu}{\ell_r^2}
$$

の次数を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

半径方向では

$$
\frac{|u_r|}{\ell_r}
=
O\left(
\frac{\tau^{-1/2}}{\tau^{1/2}}
\right)
=
O(\tau^{-1}).
$$

軸方向では

$$
\frac{|u_z|}{\ell_z}
\asymp
\frac{\tau^{-1/2-h}}{\tau^{1/2-h}}
=
\tau^{-1}.
$$

粘性の半径方向尺度は

$$
\frac{\nu}{\ell_r^2}
\asymp
\frac{\nu}{\tau}
=
\nu\tau^{-1}.
$$

固定した $\nu>0$ では三者とも $\tau^{-1}$ の時間次数です。

従って「輸送が粘性を完全に無視する」のではなく、両者を同じ主要次数で釣り合わせる構成になっています。
<!-- solution-end -->

<a id="ex-ns8a-a04"></a>
### A4. なぜ compact support は公式の急減少条件より強いか

$f\in C_c^\infty(\mathbb R^3\times(0,\infty))$ とする。任意の $\alpha,m,N$ に対し

$$
|\partial_x^\alpha\partial_t^m f(x,t)|
\le
C_{\alpha,m,N}(1+|x|+t)^{-N}
$$

を満たす定数が存在することを説明せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\partial_x^\alpha\partial_t^m f$ も $C_c^\infty$ なので連続かつコンパクト台を持ちます。従って

$$
M=
\sup_{x,t}
|\partial_x^\alpha\partial_t^m f(x,t)|
<\infty.
$$

その台を

$$
|x|+t\le R
$$

に含むよう $R$ を取れます。

台の外では左辺は $0$ です。台の中では

$$
(1+|x|+t)^N
\le
(1+R)^N.
$$

従って

$$
|\partial_x^\alpha\partial_t^m f(x,t)|
\le
M(1+R)^N(1+|x|+t)^{-N}.
$$

よって

$$
C_{\alpha,m,N}=M(1+R)^N
$$

と取れます。
<!-- solution-end -->

<a id="ex-ns8a-a05"></a>
### A5. C が成立しても A の真偽が決まらない理由

Statement A と C の量化を、外力 $f$ を含めて書き分け、なぜ

$$
C\not\Rightarrow\neg A
$$

なのか説明せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

A は概略

$$
\forall u^0
\quad
[f=0]
\quad
\exists\text{ global smooth finite-energy solution}
$$

です。

C は概略

$$
\exists u^0
\exists f
\quad
[f\text{ is admissible and smooth}]
\quad
\text{no global smooth finite-energy solution}
$$

です。

C の $f$ は非零でもよいので、A が扱う無外力問題とは条件が異なります。

従って、ある非零 smooth forcing が breakdown を起こしたとしても、

$$
f=0
$$

ではすべての admissible 初期値が大域滑らかかもしれない、という論理的可能性は残ります。

よって

$$
C\not\Rightarrow\neg A.
$$
<!-- solution-end -->

## Level B

<a id="ex-ns8a-b01"></a>
### B1. NS6 の自然尺度との差を定量化する

Navier--Stokes の放物型自然尺度を

$$
\ell_{\mathrm{nat}}\asymp\tau^{1/2},
\qquad
U_{\mathrm{nat}}\asymp\tau^{-1/2}
$$

とする。2026年構成の $\ell_z$ と主要速度振幅が、それぞれ自然尺度から何倍ずれているか求め、その意味を説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

軸方向尺度は

$$
\ell_z
\asymp
\tau^{1/2-h}
=
\tau^{-h}\tau^{1/2}.
$$

従って

$$
\frac{\ell_z}{\ell_{\mathrm{nat}}}
\asymp
\tau^{-h}\to\infty.
$$

つまり半径方向に比べて軸方向は相対的に長い領域になります。

主要速度は

$$
U
\asymp
\tau^{-1/2-h}
=
\tau^{-h}\tau^{-1/2}
$$

なので

$$
\frac{U}{U_{\mathrm{nat}}}
\asymp
\tau^{-h}\to\infty.
$$

自然な自己相似尺度より速度は少し強く増幅します。

この二つの $\tau^{-h}$ が同時に現れることで

$$
\frac{U}{\ell_z}
\asymp
\tau^{-1}
$$

が保たれます。したがって単に「自然尺度を壊した」のではなく、軸方向長さと速度増幅を連動させて主要時間尺度を維持しています。
<!-- solution-end -->

<a id="ex-ns8a-b02"></a>
### B2. 零平均の振動から非零の二次応力を作る

固定ベクトル $a\in\mathbb R^3$ と整数 $k\ne0$ に対し

$$
w(\theta)=a\cos(k\theta)
$$

とする。

1. $w$ の $[0,2\pi]$ 平均が $0$ であることを示せ。
2. $w\otimes w$ の平均を求めよ。
3. この計算が「振動補正は一次平均を小さく保ちながら二次運動量流束を作れる」という説明にどうつながるか述べよ。

- Level: B

<!-- solution-start -->
### 詳細解答

まず

$$
\frac1{2\pi}
\int_0^{2\pi}
w(\theta)\,d\theta
=
\frac{a}{2\pi}
\int_0^{2\pi}
\cos(k\theta)\,d\theta
=
0.
$$

次に

$$
w\otimes w
=
(a\otimes a)\cos^2(k\theta).
$$

$\cos^2$ の一周期平均は $1/2$ なので

$$
\frac1{2\pi}
\int_0^{2\pi}
w\otimes w\,d\theta
=
\frac12 a\otimes a.
$$

従って速度補正自体は平均 $0$ でも、Navier--Stokes 非線形項に現れる二次量は消えません。

実際の論文では、発散零条件、局在化、複数成分、時間発展を同時に満たすはるかに精密なパルスを使います。しかし「平均を増やさずに必要な応力を作る」という核心はこの最小計算に現れています。
<!-- solution-end -->

<a id="ex-ns8a-b03"></a>
### B3. 残差の正則性がなぜ本質か

候補 $u,p$ が $t<1$ で滑らかで速度発散を起こすとする。

$$
f=R_\nu(u,p)
$$

と定義しただけでは Statement C の証明にならない理由を述べよ。また、何を追加で証明すればよいか整理せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

Statement C では外力にも滑らかさと急減少条件があります。

従って

$$
f
=
\partial_tu
+
(u\cdot\nabla)u
-
\nu\Delta u
+
\nabla p
$$

と形式的に置いて方程式を恒等的に満たしただけでは不十分です。

$u$ が $t=1$ で発散するなら、右辺の各項も発散し得ます。その結果 $f$ が特異になれば、CMI が許したデータ class の外へ出ます。

追加で必要なのは少なくとも、

1. 主要特異項同士が相殺すること。
2. 遷移領域の残差も補正で除去できること。
3. 最終残差が $t=1$ を越えて $C^\infty$ に延長できること。
4. 空間・時間減衰条件を満たすこと。
5. 今回の構成ではさらに compact support まで得ること。

です。

したがって「blow-up field を書く」ことと「smooth forced Navier--Stokes blow-up を作る」ことの間に、残差正則化という大きな証明責務があります。
<!-- solution-end -->

<a id="ex-ns8a-b04"></a>
### B4. smooth breakdown と Leray--Hopf 大域存在を両立させる

次の二つがなぜ矛盾しないか説明せよ。

$$
\text{同じ smooth data から global smooth solution は存在しない},
$$

$$
\text{同じ型の有限エネルギーデータから global Leray--Hopf weak solution は存在する}.
$$

- Level: B

<!-- solution-start -->
### 詳細解答

二つの主張は解の class が違います。

global smooth solution では

$$
u,p\in C^\infty
$$

型の正則性を全時間で要求します。

Leray--Hopf weak solution では代表的に

$$
u\in
L^\infty_tL^2_x
\cap
L^2_tH^1_x
$$

を要求し、方程式は弱形式で満たします。

smooth solution が存在する時間区間では weak--strong uniqueness によって弱解は strong/smooth 解と一致します。

しかし特異時刻で smooth class から脱落しても、より広い弱解 class へ continuation する可能性は残ります。

従って

$$
\text{global smooth existence}
$$

の失敗と

$$
\text{global weak existence}
$$

は論理的に両立します。
<!-- solution-end -->

## Level C

<a id="ex-ns8a-c01"></a>
### C1. 2026年結果を NS1--NS8 の言葉で再構成する

次の仮想的な研究要約を考える。

> $\nu>0$ ごとに、零初期速度と $C_c^\infty$ 外力から始まる $\mathbb R^3$ の非圧縮 Navier--Stokes 解を $t<1$ で構成した。中心部では $\ell_r\asymp\tau^{1/2}$、$\ell_z\asymp\tau^{1/2-h}$、$|u|\asymp\tau^{-1/2-h}$ で集中し、最終残差は $t=1$ を越えて滑らかに延長される。$\|u(t)\|_2$ は一様有界だが $\|u(t)\|_\infty$ は非有界となる。

以下を一続きに説明せよ。

1. エネルギーの代表次数。
2. NS6 の観点から、有限エネルギーだけで集中を排除できない理由。
3. 輸送と半径方向粘性の主要時間次数。
4. smooth forcing を得るため残差へ何をしなければならないか。
5. CMI のどの statement に対応するか。
6. Leray--Hopf 理論と矛盾しない理由。
7. Lean 形式化の検証と CMI の prize recognition を分ける理由。
8. この結果だけから無外力 A の真偽が決まるか。

- Level: C

<!-- solution-start -->
### 詳細解答

まず中心領域体積は

$$
\ell_r^2\ell_z
\asymp
\tau^{3/2-h}.
$$

速度二乗は

$$
|u|^2
\asymp
\tau^{-1-2h}.
$$

従って代表エネルギーは

$$
\tau^{3/2-h}
\tau^{-1-2h}
=
\tau^{1/2-3h}.
$$

$h<1/6$ ならこれは $0$ へ向かいます。一方速度振幅は

$$
\tau^{-1/2-h}\to\infty.
$$

従って $L^\infty$ 発散と有限 $L^2$ エネルギーは両立します。

NS6 では $L^2$ が三次元 Navier--Stokes scaling に対して超臨界でした。したがって $L^2$ 制御は、小領域へ速度振幅を集中させる自由度を消しません。今回の尺度計算はその可能性を具体化しています。

次に輸送は

$$
\frac{|u_r|}{\ell_r}
=
O(\tau^{-1}),
$$

$$
\frac{|u_z|}{\ell_z}
\asymp
\tau^{-1}.
$$

半径方向粘性も

$$
\frac{\nu}{\ell_r^2}
\asymp
\nu\tau^{-1}.
$$

従って固定 $\nu$ では主要時間次数が一致し、輸送と粘性を同じオーダーで釣り合わせる必要があります。

ただし候補場を作っただけでは

$$
R_\nu(u,p)
=
\partial_tu
+
(u\cdot\nabla)u
-
\nu\Delta u
+
\nabla p
$$

が特異になり得ます。そこで背景流で主要項を相殺し、遷移環に残る残差を応力として読み、零平均だが非零二次流束を持つ振動補正で主要残差を打ち消し、さらに補正を重ねて残差を $C^\infty$ まで平坦化します。外側では熱型解と cutoff を使い、最終的な外力を compact support にします。

初期値 $0$ は admissible で、外力 $C_c^\infty$ は公式の急減少条件を満たし、有限エネルギーなのに smooth continuation が壊れるので、全空間結果は Statement C に対応します。周期化すれば D に対応します。

Leray--Hopf 理論はより広いエネルギー弱解 class の大域存在を述べるので、smooth solution の breakdown と矛盾しません。特異時刻後に弱解として continuation する可能性は残ります。

Lean は形式化された定義と theorem statement から結論が論理的に導出されることを kernel で確認します。一方、その formal statement が CMI の自然言語 problem description と完全に対応するか、そして Prize Rules 上の公表期間・一般的受容・CMI の評価が満たされたかは外部の数学的・制度的判断です。従って両者を同一視できません。

最後に C は非零 smooth forcing を許します。A は

$$
f=0
$$

の全 admissible 初期値について問う statement です。よって C が成立しても A の真偽は論理的には決まりません。
<!-- solution-end -->

---

## 15. まとめ

この補講で最も持ち帰ってほしい式は、巨大な定理名ではなく次の三つです。

第一に、集中とエネルギーの釣り合い

$$
\tau^{-1-2h}
\tau^{3/2-h}
=
\tau^{1/2-3h}.
$$

第二に、主要時間尺度の一致

$$
\frac{|u_r|}{\ell_r}
\sim
\frac{|u_z|}{\ell_z}
\sim
\frac{\nu}{\ell_r^2}
\sim
\tau^{-1}.
$$

第三に、構成問題の本体

$$
u\text{ は特異}
\qquad\text{だが}\qquad
R_\nu(u,p)=f\in C_c^\infty.
$$

この三つがそろって初めて、「有限エネルギーの滑らかな流れが、滑らかな外力の下で有限時間に特異になる」という Statement C / D 型結果を理解できます。

そして研究状況については、数学と認定を分けます。

$$
\text{C / D 型の解析的結果・形式化}
\qquad\text{と}\qquad
\text{CMI の最終 prize status}
$$

は同じ問いではありません。

さらに

$$
\text{C / D}
\qquad\text{と}\qquad
\text{無外力 A / B}
$$

も同じ問いではありません。

この区別まで含めて、NS1 から始めた「Navier--Stokes ミレニアム問題の入口」は完結します。
