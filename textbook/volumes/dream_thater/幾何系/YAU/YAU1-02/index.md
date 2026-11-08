# YAU1-02 Ricci形式からポテンシャルへ

## 1. 曲率の指定を、関数の方程式に変えたい

[前章の許容データ](../YAU1-01/index.md#def-yau1-01-data)は、コンパクト連結Kähler多様体 $X$ でKähler類 $\alpha$ とRicci形式の目標 $\eta$ を指定するものだった。欲しい計量 $\widehat\omega$ は

$$
[\widehat\omega]=\alpha,\qquad \rho(\widehat\omega)=\eta
$$

を満たす。しかし、未知の計量の全成分と曲率を直接求めるのは大変である。既習の[大域 $\partial\bar\partial$ 補題の帰結](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)を使えば、同じde Rham類にある実閉 $(1,1)$ 形式の差を、**一つの実関数の二階微分**へ置き換えられる。

まず基準Kähler形式 $\omega$ を $[\omega]=\alpha$ となるよう一つ固定する。$X$ は境界なし、複素次元 $n\ge1$ とし、すべての形式・関数は滑らかとする。Ricci形式の符号規約は

$$
\rho(\omega)=-i\partial\bar\partial\log\det(g_{j\bar k}),
\qquad
\omega=i\sum_{j,k}g_{j\bar k}\,dz^j\wedge d\bar z^k
$$

である。正値Hermite行列 $G=(g_{j\bar k})$ の行列式は正で、対数が定義できる。局所表示の行列式そのものは座標に依存するが、二つの計量を比較する**行列式の比**は大域的な関数になる。

### まず一次元で体積比を見る

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし、$z=x+iy$ と書く。$0<\varepsilon<1$ に対して

$$
\omega_0=i\,dz\wedge d\bar z,\qquad
\omega_\varepsilon=f(x)\omega_0,\qquad
f(x)=1+\varepsilon\cos(2\pi x)
$$

を取る。$f>0$ なので $\omega_\varepsilon$ は正値、周期的だから商に降り、複素次元1では3形式が零なので閉じる。よってKähler形式である。体積比は $f$ そのものであり、[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)から

$$
\rho(\omega_\varepsilon)-\rho(\omega_0)
=-i\partial\bar\partial\log f.
$$

例えば $x=0$ では $f'(0)=0$、$f''(0)=-4\pi^2\varepsilon$ なので

$$
\left.\partial_z\partial_{\bar z}\log f\right|_{x=0}
=\frac14\left(\frac{f''}{f}-\frac{(f')^2}{f^2}\right)_{x=0}
=-\frac{\pi^2\varepsilon}{1+\varepsilon}.
$$

Ricci形式が零でないことまで直接判定できる。ここでは $\partial_z\partial_{\bar z}=\frac14(\partial_x^2+\partial_y^2)$ を用いた。

## 2. 行列式の比からRicci差の符号を確かめる

複素次元 $n$ の正則座標で二つのKähler形式 $\omega_0,\omega_1$ の正値行列を $G_0,G_1$ とする。最高次外積の行列式表示では、共通の座標体積形式と係数 $n!$ が比で相殺される：

$$
R:=\frac{\omega_1^n}{\omega_0^n}
=\frac{\det G_1}{\det G_0}>0.
$$

座標を変えれば両行列式に同じ正則Jacobi行列式の絶対値二乗が掛かるので、$R$ は大域的な滑らかな正関数である。既習の[Ricci差と体積比の命題](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)は、この比について

$$
\boxed{\rho(\omega_1)-\rho(\omega_0)
=-i\partial\bar\partial\log R}
$$

を与える。**負号**を無意識に消さないよう、[Ricci形式の局所行列式公式](../../KAH/KAH1-11/index.md#thm-kah1-11-local-ricci)からも照合しておこう：

$$
\begin{aligned}
\rho(\omega_1)-\rho(\omega_0)
&=-i\partial\bar\partial\log\det G_1
+i\partial\bar\partial\log\det G_0\\
&=-i\partial\bar\partial\log(\det G_1/\det G_0)
=-i\partial\bar\partial\log R.
\end{aligned}
$$

この式は**二つの既に存在する正値計量**の比較である。任意に指定した正関数 $R$ を実現する新しいKähler計量がある、とはまだ主張していない。

## 3. 同じRicci類から実関数を取り出す

目標 $\eta$ は [Ricci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)によって $[\rho(\omega)]=2\pi c_1(X)_{\mathbb R}$ と等しいde Rham類を持つ必要がある。そこで差

$$
\beta:=\eta-\rho(\omega)
$$

を考える。$\eta$ と $\rho(\omega)$ はともに滑らかな**実閉 $(1,1)$ 形式**なので、$\beta$ も同じ型・実性・閉性を持つ。さらに $[\beta]=0$ は、ある滑らかな1形式 $\gamma$ について $\beta=d\gamma$ と書けることを意味する。この時点で正値性は要求していない。

この差を関数で表示することがRicci指定問題を偏微分方程式へ変える最初の段階である。

<a id="def-yau1-02-ricci-potential"></a>

<!-- formal-statement-start -->
> **定義（基準Kähler形式に対するRicciポテンシャル）**
>
> $X$ を複素次元 $n\ge1$ のKähler多様体、$\omega$ を基準Kähler形式、$\eta$ を滑らかな実閉 $(1,1)$ 形式とする。滑らかな実関数 $u:X\to\mathbb R$ が

$$
\eta-\rho(\omega)=i\partial\bar\partial u
$$

> を満たすとき、$u$ を **$\omega$ に関する $\eta$ のRicciポテンシャル** とする。存在は定義の一部ではなく、以下の命題で条件付きで証明する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-yau1-02-ricci-potential -->
**定義の確認**（平坦楕円曲線）。上の $T$ と $\omega_0$ で $\eta=\rho(\omega_\varepsilon)$ を指定し、$u=-\log f$ とする。$f$ は周期的で正なので $u$ は商上の滑らかな実関数である。[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)の命題を適用すると

$$
\eta-\rho(\omega_0)
=-i\partial\bar\partial\log f
=i\partial\bar\partial(-\log f)
=i\partial\bar\partial u.
$$

$u$ は確かに定義式を満たす。ここで目標 $\eta$ は実 $(1,1)$ 形式で、[Ricci形式の閉性](../../KAH/KAH1-11/index.md#thm-kah1-11-closed)の定理により閉じる。さらに同類条件は両Ricci形式が同じ実第一Chern類を表すため成立する。
<!-- definition-example-end -->

### 大域補題から「実」のポテンシャルまで

<a id="prop-yau1-02-real-potential"></a>

<!-- formal-statement-start -->
> **命題（実Ricciポテンシャルの存在と定数差）**
>
> $X$ を境界のない滑らかなコンパクト連結Kähler多様体（複素次元 $n\ge1$）、$\omega$ をKähler形式、$\eta$ を滑らかな実閉 $(1,1)$ 形式とする。もし

$$
[\eta]=[\rho(\omega)]\in H^2_{\mathrm{dR}}(X;\mathbb R)
$$

> なら、$\eta-\rho(\omega)=i\partial\bar\partial u$ を満たす滑らかな実関数 $u$ が存在する。二つの実関数 $u_1,u_2$ がこの等式を満たすなら、その差は $X$ 上で定数である。
<!-- formal-statement-end -->

### 証明の見取り図

差 $\beta$ は純型 $(1,1)$ で $d$ 完全だから、[Hodge理論で証明した系](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)で一度複素値関数 $v$ を作る。実形式という条件を使い、$v$ の虚部を取り出す。二つの実解の差は $i\partial\bar\partial$ で消えるので、Kähler Laplacianで跡を取って調和性を示し、コンパクト連結性から定数と結論する。

<!-- proof-start -->
### 証明

**存在。** $[\eta]=[\rho(\omega)]$ から $\beta=\eta-\rho(\omega)$ は $d$ 完全で、しかも純型 $(1,1)$ である。$X$ がコンパクトKählerであるため、[純型 $d$ 完全形式の $\partial\bar\partial$ 表示](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)を $\beta$ に適用して、滑らかな複素値関数 $v$ を得る：

$$
\beta=\partial\bar\partial v.
$$

実形式 $\beta=\bar\beta$ に複素共役を取ると、型別微分の反交換関係により

$$
\beta=\overline{\partial\bar\partial v}
=\bar\partial\partial\bar v
=-\partial\bar\partial\bar v.
$$

従って二式の平均を取って

$$
\beta=\partial\bar\partial\frac{v-\bar v}{2}
=i\partial\bar\partial u,\qquad
u:=\frac{v-\bar v}{2i}=\operatorname{Im}v\in C^\infty(X;\mathbb R).
$$

ここでは $v$ 自体が実であると仮定していない。**虚部を取るのは実性を確保するために必要な一段階**である。

**定数差。** 二つの実ポテンシャルに対し $h:=u_1-u_2$ と置けば $i\partial\bar\partial h=0$。正則座標での係数は $\partial_j\partial_{\bar k}h=0$ だから、正値Hermite逆行列 $(g^{j\bar k})$ で縮約して

$$
\Delta_\omega h
:=2\sum_{j,k}g^{j\bar k}\partial_j\partial_{\bar k}h=0.
$$

ここで $\Delta_\omega$ は実関数に作用する計量Laplacianのこの章での符号規約である。Hodge Laplacian $\Delta_d$ とは実関数上で符号が反対だから $\Delta_dh=0$ である。コンパクト境界なしの $X$ 上で[調和性のエネルギー判定](../../GA/GA6/index.md#thm-ga6-energy)を使えば

$$
0=\langle h,\Delta_dh\rangle_{L^2}=\|dh\|_{L^2}^2.
$$

従って $dh=0$。$X$ は連結だから $h$ は一個の定数になる。$\square$
<!-- proof-end -->

この命題で得た $u$ は**既知のデータ** $\eta,\omega$ から定まる。未知の正値Kähler形式を作るための関数は別に $\varphi$ と書く。混同しないことが重要である。

## 4. Ricci差が消えるのは、体積比が指数密度になるとき

$[\widehat\omega]=[\omega]$ なら、同じ[純型 $d$ 完全形式の系](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)を $\widehat\omega-\omega$ に適用して、実関数 $\varphi$ によって

$$
\widehat\omega=\omega_\varphi
:=\omega+i\partial\bar\partial\varphi
$$

と書ける。しかし $\omega_\varphi>0$ は**別途必要**である。逆に実関数 $\varphi$ で $\omega_\varphi>0$ なら、$i\partial\bar\partial\varphi=d(i\bar\partial\varphi)$ だから同じKähler類に属する。

実Ricciポテンシャル $u$ を一つ選び、正値な $\omega_\varphi$ が存在したと仮定する。[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)の命題を適用すると

$$
\begin{aligned}
\rho(\omega_\varphi)=\eta
&\iff -i\partial\bar\partial
 \log\frac{\omega_\varphi^n}{\omega^n}
 =i\partial\bar\partial u\\
&\iff i\partial\bar\partial
\left(\log\frac{\omega_\varphi^n}{\omega^n}+u\right)=0.
\end{aligned}
$$

括弧内は大域的な滑らかな**実**関数である。[実Ricciポテンシャルの存在と定数差](#prop-yau1-02-real-potential)の証明と同様に、Laplacianで縮約して[エネルギー判定](../../GA/GA6/index.md#thm-ga6-energy)を使えば、この関数は定数 $C$ になる。したがって

$$
\boxed{\omega_\varphi^n=e^{C-u}\omega^n}.
$$

逆向きも重要である。この体積方程式と $\omega_\varphi>0$ を仮定すれば、対数を取り、[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)の命題に代入して

$$
\rho(\omega_\varphi)
=\rho(\omega)-i\partial\bar\partial(C-u)
=\rho(\omega)+i\partial\bar\partial u
=\eta.
$$

これは既習の[指定Ricci形式と体積方程式の同値性](../../CYG/CYG1-10/index.md#prop-cyg1-10-monge-ampere-reduction)を、入力の実関数 $u$ と未知関数 $\varphi$ を区別して導出したものである。

### 積分で定数を一つに定める

体積方程式に現れる $C$ は自由定数ではない。$V:=\int_X\omega^n>0$ と置く。二つの同類Kähler形式に対して

$$
\omega_\varphi^n-\omega^n
=i\partial\bar\partial\varphi\wedge
\sum_{k=0}^{n-1}\omega_\varphi^k\wedge\omega^{n-1-k}.
$$

右辺の和を $S$ とすると $dS=0$ である。さらに $i\partial\bar\partial\varphi=d(i\bar\partial\varphi)$ より

$$
\omega_\varphi^n-\omega^n=d(i\bar\partial\varphi\wedge S).
$$

$X$ はコンパクトで境界なしなので[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で差の積分は零となる。つまり $\int_X\omega_\varphi^n=V$ である。両辺を積分すると

$$
V=e^C\int_Xe^{-u}\omega^n,\qquad
\boxed{C=\log\frac{V}{\int_Xe^{-u}\omega^n}}.
$$

分母は正関数のコンパクト上の積分だから正かつ有限である。これも前章の[体積正規化命題](../YAU1-01/index.md#prop-yau1-01-volume)と一致する。特に定数関数 $u=a$ なら $C=a$ で、正規化密度は $e^{C-u}=1$ となる。

ここまでの帰着は**必要条件と方程式の同値変形**であり、一般の右辺に対する正値解 $\varphi$ の存在証明ではない。

## 5. 基準のKähler形式を変えても幾何的な問いは変わらない

固定類 $\alpha$ には多数の代表がある。$\omega$ から同じ類の $\widetilde\omega$ へ変えると、[大域ポテンシャルの表示](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)により $\widetilde\omega=\omega+i\partial\bar\partial\psi>0$ と書ける。$\eta$ は同じ目標のまま、Ricciポテンシャルはどう変わるだろうか。

<a id="prop-yau1-02-reference-change"></a>

<!-- formal-statement-start -->
> **命題（基準Kähler形式の変更と正規化密度）**
>
> $X$ を境界のないコンパクト連結Kähler多様体、$\omega,\widetilde\omega$ を同じKähler類の形式、$\eta$ を滑らかな実閉 $(1,1)$ 形式で $[\eta]=[\rho(\omega)]$ とする。$u$ が $\omega$ に関する $\eta$ の実Ricciポテンシャルなら、

$$
\widetilde u
:=u+\log\frac{\widetilde\omega^n}{\omega^n}
$$

> は $\widetilde\omega$ に関するRicciポテンシャルである。また $V=\int_X\omega^n=\int_X\widetilde\omega^n$ とし、

$$
C_\omega=\log\frac{V}{\int_Xe^{-u}\omega^n},
\qquad
C_{\widetilde\omega}
=\log\frac{V}{\int_Xe^{-\widetilde u}\widetilde\omega^n}
$$

> と定めると、$C_{\widetilde\omega}=C_\omega$ であり、大域的な正の体積形式として

$$
e^{C_{\widetilde\omega}-\widetilde u}\widetilde\omega^n
=e^{C_\omega-u}\omega^n
$$

> が成り立つ。$u$ の定数変更を伴う場合でも、正規化済み体積形式は同じである。
<!-- formal-statement-end -->

### 証明の見取り図

[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)の命題で基準計量の変更分を移項すると、$\widetilde u$ に体積比の対数を**足す**必要が分かる。密度 $e^{-\widetilde u}\widetilde\omega^n$ の二つの因子は正確に打ち消し合う。

<!-- proof-start -->
### 証明

大域的な正関数 $R=\widetilde\omega^n/\omega^n$ を置く。[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)の命題から

$$
\rho(\widetilde\omega)
=\rho(\omega)-i\partial\bar\partial\log R.
$$

従って $\widetilde u=u+\log R$ と置くと

$$
\begin{aligned}
\rho(\widetilde\omega)+i\partial\bar\partial\widetilde u
&=\rho(\omega)-i\partial\bar\partial\log R
 +i\partial\bar\partial(u+\log R)\\
&=\rho(\omega)+i\partial\bar\partial u=\eta.
\end{aligned}
$$

また正関数 $R$ の定義により、各点で

$$
e^{-\widetilde u}\widetilde\omega^n
=e^{-u-\log R}R\omega^n
=e^{-u}\omega^n.
$$

$\omega,\widetilde\omega$ は同じ類なので、前節のStokes計算から体積 $V$ も等しい。上式を積分すれば正規化定数の分母が等しく、従って $C_{\widetilde\omega}=C_\omega$。これを上式へ掛けると結論の正規化密度の一致が得られる。

最後に $u'=u+a$ なら、分母が $e^{-a}$ 倍なので $C_\omega'=C_\omega+a$ となる。よって $e^{C_\omega'-u'}=e^{C_\omega-u}$。$\square$
<!-- proof-end -->

この命題は、基準計量が違うからといってRicci指定問題が別物になるわけではないことを示す。未知の解を $\widehat\omega=\omega+i\partial\bar\partial\varphi$ と書くか、$\widehat\omega=\widetilde\omega+i\partial\bar\partial(\varphi-\psi)$ と書くかの違いにすぎない。

### 楕円曲線で完全に照合する

先ほどの $T$ で $\omega=\omega_0$、$\widetilde\omega=\omega_\varepsilon=f\omega_0$、目標 $\eta=0$ を取る。$\rho(\omega_0)=0$ だから $u=0$ を選べる。基準変更の公式は $\widetilde u=\log f$ を与える。

$$
\rho(\omega_\varepsilon)+i\partial\bar\partial\log f
=-i\partial\bar\partial\log f+i\partial\bar\partial\log f=0.
$$

ここで $\int_T\omega_0=2$、$\int_T\omega_\varepsilon=2$ は $\int_0^1\cos(2\pi x)\,dx=0$ から従う。また

$$
\int_Te^{-\widetilde u}\omega_\varepsilon
=\int_T f^{-1}f\omega_0=2,
\qquad C_\omega=C_{\widetilde\omega}=0.
$$

未知計量として $\widehat\omega=\omega_0$ を取れば、$\omega_\varepsilon+i\partial\bar\partial\varphi=\omega_0$ とする周期関数は

$$
\varphi(x)=\frac{\varepsilon}{\pi^2}\cos(2\pi x)
$$

である。実際 $\partial_z\partial_{\bar z}\varphi=\frac14\varphi''=-\varepsilon\cos(2\pi x)$ なので、二階微分が $\omega_0-\omega_\varepsilon$ を与える。体積方程式も

$$
\widehat\omega=e^{-\widetilde u}\omega_\varepsilon
=f^{-1}f\omega_0=\omega_0
$$

と直接成立する。この一次元の**既知解を検算した**のであり、一般の場合の解の存在を証明したのではない。

## 6. 仮定を外すと、どの段階が止まるか

- **同じde Rham類でない場合：** $\beta=\eta-\rho(\omega)$ が $d$ 完全でなく、[大域 $\partial\bar\partial$ 補題の系](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)へ入力できない。例えば $\mathbb{CP}^1$ で $\eta=0$ としても、[Ricci–Chern同定](../../KAH/KAH1-12/index.md#thm-kah1-12-ricci-chern)が与える非零類に矛盾する。
- **コンパクト性を外す場合：** $\mathbb C$ 上で実関数 $h(z)=\operatorname{Re}z$ は $\partial\bar\partial h=0$ だが定数ではない。ポテンシャルの定数差一意性が壊れ、体積積分も有限とは限らない。
- **Kähler正値性を外す場合：** $R$ が正とは限らず $\log R$ が実数として定義できない。正値な行列式の比を使うRicci公式・楕円的な解釈の入口が失われる。
- **連結性を外す場合：** 実Ricciポテンシャルの差は各成分で定数だが、全体で一個の定数とは限らない。体積方程式の定数も成分ごとに判定すべきである。

## 7. 演習：差公式・大域化・正規化を手で再現する

<a id="ex-yau1-02-a01"></a>
#### YAU1-02-A01 行列式と体積比
- Level: A

複素次元2の同一正則座標で、二つのKähler形式の係数行列を $G_0=\operatorname{diag}(1,2)$、$G_1=\operatorname{diag}(3,4)$ とする。その点での $\omega_1^2/\omega_0^2$ を求めよ。座標によらず定義できる理由も述べよ。

<!-- solution-start -->
**詳細解答。** 正値行列の行列式は $\det G_0=2$、$\det G_1=12$。最高次外積は共通座標体積形式に $2!i^2\det G_a$ を掛けたものなので、

$$
\frac{\omega_1^2}{\omega_0^2}
=\frac{\det G_1}{\det G_0}=\frac{12}{2}=6.
$$

正則座標変換で両行列式には同じ $|\det B|^2$ が掛かるから、比では消える。したがって正の大域関数の値として意味がある。
<!-- solution-end -->

<a id="ex-yau1-02-a02"></a>
#### YAU1-02-A02 Ricci差の符号
- Level: A

Kähler形式 $\omega_0,\omega_1$ が $\omega_1^n=e^{2f}\omega_0^n$ を満たす。$f$ は滑らかな実関数とする。Ricci差を求め、$f$ が定数の場合を確認せよ。

<!-- solution-start -->
**詳細解答。** 体積比 $R=e^{2f}>0$ の対数は $\log R=2f$ である。[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)の命題へ代入し、

$$
\rho(\omega_1)-\rho(\omega_0)
=-i\partial\bar\partial(2f)
=-2i\partial\bar\partial f.
$$

$f$ が定数なら $\partial\bar\partial f=0$ なのでRicci差は零である。体積比が変わっても、定数倍ならRicci形式は変わらない。
<!-- solution-end -->

<a id="ex-yau1-02-a03"></a>
#### YAU1-02-A03 定数ポテンシャルの正規化
- Level: A

境界のないコンパクトKähler多様体 $(X,\omega)$ で $u\equiv\log 5$ とする。$V=\int_X\omega^n$ に対して $\int_Xe^{-u}\omega^n$ と正規化定数 $C$ を求めよ。

<!-- solution-start -->
**詳細解答。** $e^{-u}=1/5$ なので

$$
\int_Xe^{-u}\omega^n=\frac15V,\qquad
C=\log\frac{V}{V/5}=\log5.
$$

従って $e^{C-u}=e^{\log5-\log5}=1$。定数ポテンシャルによる見かけの倍率は正規化で相殺される。
<!-- solution-end -->

<a id="ex-yau1-02-a04"></a>
#### YAU1-02-A04 ポテンシャルの定数変更
- Level: A

コンパクトKähler多様体 $(X,\omega)$ 上の実Ricciポテンシャル $u$ を $u'=u+a$ に変える。$\eta$ が同じであることと、体積正規化後の密度が不変なことを示せ。

<!-- solution-start -->
**詳細解答。** $\partial\bar\partial a=0$ だから $\rho(\omega)+i\partial\bar\partial(u+a)=\eta$。$I=\int_Xe^{-u}\omega^n$ と置けば

$$
I'=\int_Xe^{-u-a}\omega^n=e^{-a}I,\qquad
C'=\log\frac V{I'}=\log\frac V{e^{-a}I}=C+a.
$$

よって $C'-u'=C+a-u-a=C-u$、従って $e^{C'-u'}\omega^n=e^{C-u}\omega^n$ となる。
<!-- solution-end -->

<a id="ex-yau1-02-a05"></a>
#### YAU1-02-A05 一次元の混合微分
- Level: A

$z=x+iy$、$u(x)=\cos(2\pi x)$ とする。$i\partial\bar\partial u$ の $dz\wedge d\bar z$ 成分を求めよ。

<!-- solution-start -->
**詳細解答。** $\partial_z=\frac12(\partial_x-i\partial_y)$、$\partial_{\bar z}=\frac12(\partial_x+i\partial_y)$ なので

$$
\partial_z\partial_{\bar z}u
=\frac14(\partial_x^2+\partial_y^2)u
=\frac14(-4\pi^2\cos2\pi x+0)
=-\pi^2\cos2\pi x.
$$

従って $i\partial\bar\partial u=-i\pi^2\cos(2\pi x)\,dz\wedge d\bar z$ である。
<!-- solution-end -->

<a id="ex-yau1-02-b01"></a>
#### YAU1-02-B01 複素値原始関数を実関数へ
- Level: B

コンパクトKähler多様体 $X$ 上の実 $(1,1)$ 形式 $\beta$ が $\beta=\partial\bar\partial v$ と書ける。ただし $v$ は複素値の滑らかな関数である。実関数 $u$ を具体的に作り、$\beta=i\partial\bar\partial u$ を示せ。

<!-- solution-start -->
**詳細解答。** 実性と複素共役での次数1の微分の反交換から

$$
\beta=\overline\beta
=\overline{\partial\bar\partial v}
=\bar\partial\partial\bar v
=-\partial\bar\partial\bar v.
$$

これと $\beta=\partial\bar\partial v$ を足して2で割れば

$$
\beta=\partial\bar\partial\frac{v-\bar v}{2}
=i\partial\bar\partial\frac{v-\bar v}{2i}.
$$

$u=(v-\bar v)/(2i)=\operatorname{Im}v$ は実かつ滑らかなので目的を満たす。実関数 $v$ をそのまま選ぶことは一般にできない点に注意する。
<!-- solution-end -->

<a id="ex-yau1-02-b02"></a>
#### YAU1-02-B02 定数差しかない理由
- Level: B

境界のないコンパクト連結Kähler多様体で、実関数 $u_1,u_2$ がともに $\eta-\rho(\omega)=i\partial\bar\partial u_j$ を満たすとする。二つの差が定数であることを、座標成分と調和性のエネルギー判定を使って示せ。非連結の場合はどう変わるか。

<!-- solution-start -->
**詳細解答。** $h=u_1-u_2$ とおくと $i\partial\bar\partial h=0$ なので、正則座標ではすべての $\partial_j\partial_{\bar k}h=0$。これに計量の逆行列を掛けて和を取れば

$$
\Delta_\omega h=2\sum_{j,k}g^{j\bar k}\partial_j\partial_{\bar k}h=0.
$$

Hodge Laplacianは $\Delta_dh=-\Delta_\omega h=0$ となる。コンパクト境界なしなので[調和性のエネルギー判定](../../GA/GA6/index.md#thm-ga6-energy)から

$$
0=\langle h,\Delta_dh\rangle_{L^2}=\|dh\|_{L^2}^2.
$$

よって各成分で $dh=0$、すなわち $h$ は定数となる。連結ならその定数は一つ。非連結では異なる成分に別々の定数を与えても二階微分は零なので、全体で一つの定数とは限らない。
<!-- solution-end -->

<a id="ex-yau1-02-b03"></a>
#### YAU1-02-B03 正規化がなぜ必要か
- Level: B

$X$ を境界のないコンパクト連結Kähler多様体とする。$V=\int_X\omega^n$、$I=\int_Xe^{-u}\omega^n$ とし、$I=4V$ とする。正値な $\omega_\varphi=\omega+i\partial\bar\partial\varphi$ が $\omega_\varphi^n=e^{-u}\omega^n$ を満たせないことを示し、適切な定数 $C$ を求めよ。

<!-- solution-start -->
**詳細解答。** 同類の二つのKähler形式の体積は、差を完全形式と書いて[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)を用いると一致する。よって左辺の積分は $V$、右辺は仮定から $I=4V$。$V>0$ だから $V=4V$ は矛盾である。

正規化するには $e^CI=V$ が必要なので

$$
e^C=\frac V{4V}=\frac14,\qquad C=-\log4.
$$

これは必要な定数を決めただけで、正値解の存在までは導かない。
<!-- solution-end -->

<a id="ex-yau1-02-b04"></a>
#### YAU1-02-B04 基準計量の変更
- Level: B

同じ類に属するKähler形式 $\omega,\widetilde\omega$ に対して、$\widetilde\omega^n=R\omega^n$（$R>0$）とする。$\eta=\rho(\omega)+i\partial\bar\partial u$ から、$\widetilde\omega$ を基準にしたポテンシャルを求め、正規化定数が変わらないことを示せ。

<!-- solution-start -->
**詳細解答。** [Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)の命題で $\rho(\widetilde\omega)=\rho(\omega)-i\partial\bar\partial\log R$。従って

$$
\eta=\rho(\widetilde\omega)+i\partial\bar\partial(u+\log R),
\qquad\widetilde u=u+\log R.
$$

さらに

$$
e^{-\widetilde u}\widetilde\omega^n
=e^{-u-\log R}R\omega^n=e^{-u}\omega^n.
$$

積分の分母は同じで、同類性によるStokesから分子の体積も同じ。よって両者の $C=\log(V/I)$ は一致し、正規化密度も一致する。
<!-- solution-end -->

<a id="ex-yau1-02-c01"></a>
#### YAU1-02-C01 楕円曲線の目標Ricci形式を零へ戻す
- Level: C

$T=\mathbb C/(\mathbb Z+i\mathbb Z)$、$\omega_0=i\,dz\wedge d\bar z$、$z=x+iy$ とする。$0<\varepsilon<1$ と置き、$f(x)=1+\varepsilon\cos(2\pi x)$、$\omega_\varepsilon=f\omega_0$ とする。

1. $\omega_\varepsilon$ がKähler形式で、$\omega_0$ と同じ類であることを示せ。
2. 参照計量 $\omega_\varepsilon$ と目標 $\eta=0$ に対するRicciポテンシャル $u$ と正規化定数 $C$ を求めよ。
3. $\widehat\omega=\omega_0$ を得る実関数 $\varphi$ を構成し、体積方程式を検算せよ。

<!-- solution-start -->
**詳細解答。** $1-\varepsilon<f<1+\varepsilon$ なので $\omega_\varepsilon$ は正値。$f$ は周期的だから形式は $T$ に降り、複素次元1で $d\omega_\varepsilon$ は3形式ゆえ零。したがってKähler形式である。

類の一致には $\psi(x)=-\varepsilon\cos(2\pi x)/\pi^2$ を取る。$\partial_z\partial_{\bar z}=\frac14(\partial_x^2+\partial_y^2)$ と $\psi''=4\varepsilon\cos(2\pi x)$ から

$$
i\partial\bar\partial\psi=\varepsilon\cos(2\pi x)\omega_0
=\omega_\varepsilon-\omega_0.
$$

従って差は $d(i\bar\partial\psi)$ で完全だから、同類である。

次に $\rho(\omega_0)=0$ で、[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)の命題より $\rho(\omega_\varepsilon)=-i\partial\bar\partial\log f$。よって $\eta=0$ に対して $u=\log f$ が $\rho(\omega_\varepsilon)+i\partial\bar\partial u=0$ を満たす。

$\omega_0=2dx\wedge dy$ で基本領域の面積は2。また $\int_0^1\cos(2\pi x)dx=0$ なので

$$
V=\int_T\omega_\varepsilon
=2\int_0^1\!\int_0^1f(x)\,dx\,dy=2,\qquad
\int_Te^{-u}\omega_\varepsilon
=\int_Tf^{-1}f\omega_0=2.
$$

従って $C=\log(2/2)=0$。最後に $\varphi=-\psi=\varepsilon\cos(2\pi x)/\pi^2$ とすると

$$
\omega_\varepsilon+i\partial\bar\partial\varphi
=\omega_\varepsilon-(\omega_\varepsilon-\omega_0)=\omega_0>0.
$$

最高次外積は一次元では形式そのものなので、

$$
\omega_\varphi=\omega_0
=e^{-\log f}f\omega_0=e^{C-u}\omega_\varepsilon.
$$

正値性・同類性・Ricci目標・正規化をすべて確認した。
<!-- solution-end -->

<a id="ex-yau1-02-c02"></a>
#### YAU1-02-C02 Ricci指定と体積方程式の論理を再構成する
- Level: C

$X$ を境界のないコンパクト連結Kähler多様体（複素次元 $n\ge1$）、$\omega$ をKähler形式、$\eta$ を滑らかな実閉 $(1,1)$ 形式とし、$[\eta]=[\rho(\omega)]$ を仮定する。

1. 実ポテンシャル $u$ が存在する根拠を、必要な仮定を挙げて示せ。
2. $\omega_\varphi=\omega+i\partial\bar\partial\varphi>0$ に対して $\rho(\omega_\varphi)=\eta$ と正規化済み体積方程式が同値であることを両方向に証明せよ。
3. 非コンパクトな $\mathbb C$ で、$\partial\bar\partial h=0$ が $h$ の定数性を意味しない例を挙げ、上の証明のどこが止まるか述べよ。

<!-- solution-start -->
**詳細解答。** $\beta=\eta-\rho(\omega)$ は同類性より $d$ 完全で、二形式の型・実性・閉性から実 $(1,1)$ 形式である。コンパクトKählerという仮定の下で[純型 $d$ 完全形式の系](../../HOD/HOD1-08/index.md#cor-hod1-08-d-exact)に入力し、$\beta=\partial\bar\partial v$ を得る。共役を取ると $\beta=-\partial\bar\partial\bar v$。従って $u=(v-\bar v)/(2i)$ が実関数で、$\beta=i\partial\bar\partial u$ を満たす。

正値性より比 $R=\omega_\varphi^n/\omega^n$ は正関数だから $\log R$ が定義できる。[Ricci形式の差と体積比](../../CYG/CYG1-10/index.md#prop-cyg1-10-ricci-volume-ratio)の命題を使えば

$$
\rho(\omega_\varphi)=\eta
\iff-i\partial\bar\partial\log R=i\partial\bar\partial u
\iff i\partial\bar\partial(\log R+u)=0.
$$

$h=\log R+u$ は実関数で、計量逆行列で跡を取れば $\Delta_\omega h=0$。Hodge Laplacianは $\Delta_dh=0$ だから、コンパクト境界なしの[エネルギー恒等式](../../GA/GA6/index.md#thm-ga6-energy)で $dh=0$、連結性から $h=C$。従って $R=e^{C-u}$ となる。

$\omega_\varphi-\omega=d(i\bar\partial\varphi)$、両形式が閉じることから

$$
\omega_\varphi^n-\omega^n
=d\left(i\bar\partial\varphi\wedge
 \sum_{k=0}^{n-1}\omega_\varphi^k\wedge\omega^{n-1-k}\right).
$$

[一般Stokesの定理](../../GEO/GEO8/index.md#thm-geo8-general-stokes)で積分は零。$V=\int_X\omega^n>0$ として $V=e^C\int_Xe^{-u}\omega^n$ から

$$
C=\log\frac{\int_X\omega^n}{\int_Xe^{-u}\omega^n}.
$$

逆に $\omega_\varphi>0$ と $\omega_\varphi^n=e^{C-u}\omega^n$ が成立すると、対数を取って $\log R=C-u$。これを同じ命題に戻すと

$$
\rho(\omega_\varphi)-\rho(\omega)
=-i\partial\bar\partial(C-u)=i\partial\bar\partial u,
$$

よって $\rho(\omega_\varphi)=\eta$。最後に $X=\mathbb C$、$h(z)=\operatorname{Re}z$ は非定数だが $\partial_z\partial_{\bar z}h=\frac14\Delta_{\mathbb R^2}x=0$。コンパクト性がなければ[調和性のエネルギー判定](../../GA/GA6/index.md#thm-ga6-energy)で使った境界項の消滅・有限な積分を保証できず、体積積分による $C$ の決定にも有限性がない。
<!-- solution-end -->

## 8. 次に扱う非線形方程式の入口

Ricci形式を指定する問題は、固定した基準Kähler形式 $\omega$ と既知の実ポテンシャル $u$ から、体積を正規化して

$$
(\omega+i\partial\bar\partial\varphi)^n=e^{C-u}\omega^n,
\qquad \omega+i\partial\bar\partial\varphi>0
$$

を解く問題へ帰着した。次はこの方程式の**正値性の領域、楕円性と線形化**を詳しく調べる。正の解がすべての許容データに存在することは、事前評価と連続性の方法を経て初めて証明できる。

### 参考文献

- [V. V. Datar, *Lecture Notes on Calabi’s Conjectures and Kähler–Einstein Metrics*](https://math.iisc.ac.in/~vvdatar/Lecture_Notes/Calabi_Yau.pdf) — Ricciポテンシャルと正規化、連続性の方法への準備。
- [Z. Błocki, *The Complex Monge–Ampère Equation on Compact Kähler Manifolds*](https://www3.nd.edu/~jdiller/teaching/archive/spring11_80380/blocki2.pdf) — 体積比・ポテンシャルと複素Monge–Ampère方程式の導入。
