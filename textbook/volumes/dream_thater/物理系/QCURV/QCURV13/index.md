# QCURV13 Boulware・Unruh・Hartle–Hawking状態と地平線の正則性

<!-- definition-example-audit: strict -->

[QCURV11の後期Hawking波束](../QCURV11/index.md#prop-qcurv11-late-packet-planck)は熱因子を与え、[QCURV12の灰色体因子](../QCURV12/index.md#def-qcurv12-greybody-factor)は、その一部だけが無限遠へ透過することを示しました。しかし**どの量子状態で測るか**を指定しなければ、外から粒子が入ってくるのか、地平線を横切る観測者が滑らかな状態を見るのか、放射と吸収が釣り合うのかは決まりません。

本章では質量 $M>0$ の**永遠の非回転・非荷電Schwarzschild時空**と、その右外部領域 $r>2M$ を比較の舞台とします。場は質量零の実自由スカラー場、計量符号 $(-,+,+,+)$、自然単位 $G=\hbar=c=k_B=1$ とし、状態は指定した領域で[QCURV5を通じて既習の局所Hadamard条件](../../../解析系/MICA/MICA12/index.md#def-mica12-local-parametrix)を満たすものを考えます。地平線付近の説明には伝播方向を分離できる $1+1$ 次元の無質量模型も使います。**二次元模型で示せる局所診断と、四次元状態の全域での存在・正則性を同一の証明だとは扱いません。**

## 1. 同じ時空でも「真空」は一つではない

右外部のSchwarzschild計量と遠方で規格化されたKilling時刻 $t$ は

$$
ds^2=-f(r)dt^2+f(r)^{-1}dr^2+r^2d\Omega^2,
\qquad f(r)=1-\frac{2M}{r}.
$$

[QCURV9の表面重力](../QCURV9/index.md#prop-qcurv9-kappa)は $\kappa=1/(4M)$、$T_H=\kappa/(2\pi)$ です。[同章のtortoise座標と出射時刻](../QCURV9/index.md#prop-qcurv9-arrival)を用いて

$$
r_*=r+2M\log\!\left(\frac{r}{2M}-1\right),\qquad
u=t-r_*,\quad v=t+r_*.
$$

$u$ 一定は外へ向かう光線、$v$ 一定は内へ向かう光線を表します。外部で正の周波数 $e^{-i\omega u}$、$e^{-i\omega v}$ を選ぶと、無限遠の静止時計に対する**出射・入射**の空間がそれぞれ決まります。ただしこの選び方は、地平線を自由落下して通過する観測者にとって滑らかとは限りません。

外部の座標を未来・過去地平線の先まで伸ばすため、外部で

$$
U=-\kappa^{-1}e^{-\kappa u}<0,\qquad
V=\kappa^{-1}e^{\kappa v}>0
$$

を使います。これは[QCURV9のKruskal光線ラベル](../QCURV9/index.md#thm-qcurv9-compression)の規格化を固定したものです。右外部に接する**未来地平線**は $U=0,V>0$、**過去地平線**は $V=0,U<0$ です。地平線上の有限の $U,V$ は、$u,v$ の無限大とは異なり、滑らかな局所座標に使えます。

### 地平線で「正則」と言うために

単に粒子数が有限かどうかでは、自由落下する観測者の短距離測定を判定できません。[QCURV2のWightman二点分布](../QCURV2/index.md#def-qcurv2-wightman)は状態を区別する基礎データです。地平線での正則性とは、特異な二点分布そのものが消えることではありません。[MICA12の局所Hadamard特異部](../../../解析系/MICA/MICA12/index.md#def-mica12-local-parametrix)を除いた**状態依存の余り**が、自由落下座標でも滑らかなことを要求します。

<a id="def-qcurv13-horizon-regularity"></a>

<!-- formal-statement-start -->
> **定義（地平線を横断する状態の正則性）**  
> 固定したSchwarzschild背景上の自由スカラー場の状態 $\omega$ が、地平線の開いた部分 $H$ に接する近傍へ拡張でき、その近傍で二点分布 $W_\omega(x,x')$ が局所Hadamard形を持つとき、$\omega$ は $H$ において正則という。すなわち同じ幾何から決まる局所的な普遍特異部 $H_{\mathrm{loc}}(x,x')$ を引いた $W_\omega-H_{\mathrm{loc}}$ が、地平線を横切る滑らかな座標で滑らかであることを要求する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv13-horizon-regularity -->
### 直接例：同じ短距離特異性を持つ二つの二点関数

地平線を含む一つの滑らかな座標近傍を固定します。そこで正則な状態の二点分布 $W_0=H_{\mathrm{loc}}+S_0$（$S_0$ は滑らか）を考え、同じ背景・場・交換子条件を満たす別の状態の二点分布を $W_1=W_0+S_1$（$S_1$ もその近傍で滑らか）とします。このような差の滑らかさは、[MICA13のHadamard二点分布の差に関する命題](../../../解析系/MICA/MICA13/index.md#prop-mica13-smooth-difference)と整合します。このとき

$$
W_1-H_{\mathrm{loc}}=S_0+S_1
$$

も滑らかで、同じ局所Hadamard特異性を保ちます。**定義の確認**：地平線を含む同じ座標近傍で拡張できること、差引き後に滑らかであることの二条件をそれぞれ確認しました。ただし任意の滑らかな $S_1$ が正値な量子状態を作るわけではありません。ここでは既に状態である場合を仮定しています。
<!-- definition-example-end -->

## 2. 三状態はどの光線を真空とするか

右外部の場のモードには、過去の無限遠 $\mathscr I^-$ から入る **in** 成分と、永遠の時空の過去地平線 $\mathcal H^-$ から出る **up** 成分があります。各モードは無限遠での $t$ の周波数 $\omega>0$ と球面調和次数 $\ell,m$ でラベル付けします。両成分は外部の散乱障壁で混ざりますが、同じ正のKilling周波数を保ちます。

三つの名前が指すのは幾何の違いではなく、これらの成分にどのような量子状態を置くかという**境界条件の違い**です。各 $\omega,\ell,m$ の規格化した波束モードの消滅演算子を $a_{\rm in},a_{\rm up}$ と書き、$n_j=\langle a_j^\dagger a_j\rangle$（$j={\rm in},{\rm up}$）を占有数とします。$\dagger$ は随伴、期待値の括弧は今指定する状態での平均です。これは[QCURV2のFock真空・二点分布](../QCURV2/index.md#def-qcurv2-wightman)と同じ演算子の記法です。

<a id="def-qcurv13-three-states"></a>

<!-- formal-statement-start -->
> **定義（Boulware・Unruh・Hartle–Hawking状態）**  
> 永遠のSchwarzschild外部の質量零自由スカラー場で、$T_H=\kappa/(2\pi)>0$、$\kappa=1/(4M)$ とする。右外部のin/up入射チャネルの占有数をそれぞれ $n_{\rm in}(\omega)$、$n_{\rm up}(\omega)$ とし、異なるチャネル間に粒子数を変える相関がなく、散乱は同じ周波数のチャネルをユニタリに混合するとする。代表的な三つの準自由定常状態の外部チャネルは次で特徴付けられる。

$$
\begin{array}{c|cc}
\text{状態}&n_{\rm in}(\omega)&n_{\rm up}(\omega)\\\hline
\text{Boulware (B)}&0&0\\
\text{Unruh (U)}&0&(e^{\omega/T_H}-1)^{-1}\\
\text{Hartle--Hawking (HH)}&(e^{\omega/T_H}-1)^{-1}&(e^{\omega/T_H}-1)^{-1}
\end{array}
$$

> これは外部チャネルの占有数の表示であり、**地平線を跨ぐ状態全体の定義を占有数だけで尽くすものではない**。Bは外部Killing時間の正振動数真空、Uは入射が空で出射側が地平線に滑らかな非平衡状態、HHは両向きに熱的なKMS平衡状態として、それぞれの二点関数の境界条件も合わせて指定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qcurv13-three-states -->
### 直接例：一つの周波数を固定して三状態を判定する

$\omega=T_H\log 3$ と固定すると $e^{\omega/T_H}=3$ なので熱的占有数は $1/2$ です。上表へ代入すると

$$
(n_{\rm in},n_{\rm up})_{\rm B}=(0,0),\quad
(n_{\rm in},n_{\rm up})_{\rm U}=(0,1/2),\quad
(n_{\rm in},n_{\rm up})_{\rm HH}=(1/2,1/2).
$$

さらに各成分を粒子数基底で対角な密度演算子 $\rho_j$ とし、全状態を積 $\rho=\rho_{\rm in}\otimes\rho_{\rm up}$ で作ります。消滅演算子は粒子数を一つ下げるので $\operatorname{Tr}(\rho_j a_j)=0$ となり、

$$
\langle a_{\rm in}^\dagger a_{\rm up}\rangle
=\operatorname{Tr}(\rho_{\rm in}a_{\rm in}^\dagger)
\operatorname{Tr}(\rho_{\rm up}a_{\rm up})=0
$$

です。逆向きの交差期待値も同様に零です。熱的な側では

$$
\frac{n_H}{1+n_H}=\frac{1/2}{1+1/2}=\frac13
=e^{-\omega/T_H}
$$

となり、[QCURV8で確認した熱的モードのKMS境界条件](../QCURV8/index.md#def-qcurv8-kms)の占有数比とも一致します。**定義の確認**：$\omega>0$ と $T_H>0$、二つのチャネルの占有数と交差相関、熱的側の比を確認しました。地平線正則性は占有数だけから結論せず、第4節でアフィン座標の二点関数を使って別に照合します。
<!-- definition-example-end -->

## 3. なぜKruskalでの真空は外部で熱的なのか

地平線正則性を見通すため、まず自由無質量場の**二次元の出射成分**を使います。ここでの $u,U$ は四次元時空の動径光線から得られたラベルですが、以下の対数二点関数は二次元模型の計算です。質量零場の零モードによる赤外の定数は微分すると消えるため、微分した二点関数を調べます。

ここから二点の光線座標を $U=U(u)$、$U'=U(u')$ と書きます。プライムは第二の点を表し、導関数を意味しません。アフィン光線座標 $U$ の正周波数で定義した真空の出射二点分布は、適切な $i0$ 境界値で

$$
W^{(U)}_{\rm out}(U,U')=-\frac1{4\pi}\log(U-U'-i0)+\text{赤外定数}
$$

と書けます。微分を取れば

$$
\partial_U\partial_{U'}W^{(U)}_{\rm out}
=-\frac1{4\pi}\frac1{(U-U'-i0)^2}.
$$

Killing時間の出射座標で見るには、$U(u)$ を代入して両側に連鎖律を適用します。

<a id="prop-qcurv13-kruskal-thermal-correlator"></a>

<!-- formal-statement-start -->
> **命題（Kruskal出射真空の外部二点関数）**  
> $\kappa>0$ とし、二次元の無質量自由場の出射成分に $U(u)=-\kappa^{-1}e^{-\kappa u}$ を用いる。$U$ に関する真空の微分二点関数を $u$ 座標へ引き戻すと、外部の異なる点について

$$
\partial_u\partial_{u'}W^{(U)}_{\rm out}
=-\frac{\kappa^2}{16\pi}\,
\frac1{\sinh^2\!\left[\frac\kappa2(u-u'-i0)\right]}.
$$

> この相関の解析的な境界値は逆温度 $\beta_H=2\pi/\kappa$ のKMS関係を満たす。したがって外部で測る出射Killing周波数に関し $T_H=\kappa/(2\pi)$ の熱的因子を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

$U(u)-U(u')$ を双曲線正弦へ因数分解すると、連鎖律の二つの指数因子が相殺します。虚時間の間隔 $2\pi/\kappa$ は $\sinh(z+i\pi)=-\sinh z$ に由来します。ただしKMSは関数の単なる周期性ではなく、時間順序を交換した二つの境界値を結ぶ条件です。

<!-- proof-start -->
### 証明

$\bar u=(u+u')/2$、$\Delta u=u-u'$ と置くと

$$
\begin{aligned}
U(u)-U(u')
&=-\kappa^{-1}\left(e^{-\kappa u}-e^{-\kappa u'}\right)\\
&=\frac2\kappa e^{-\kappa\bar u}
\sinh\!\left(\frac{\kappa\Delta u}2\right).
\end{aligned}
$$

ここで $U'=U(u')$ のプライムは**第二の点の座標**を表し、導関数のプライムとは区別します。座標写像の二つの導関数は

$$
\frac{dU(u)}{du}=e^{-\kappa u},\qquad
\frac{dU(u')}{du'}=e^{-\kappa u'}
$$

です。$u,u'$ の一方を微分するとき他方を固定する[連鎖律](../../../基礎科目/RA/RA3/index.md#prop-ra3-chain-rule)をそれぞれ適用すると

$$
\begin{aligned}
\partial_u\partial_{u'}W^{(U)}_{\rm out}
&=-\frac1{4\pi}\frac{[dU(u)/du][dU(u')/du']}{[U(u)-U(u')-i0]^2}\\
&=-\frac1{4\pi}\frac{e^{-2\kappa\bar u}}{(4/\kappa^2)e^{-2\kappa\bar u}
\sinh^2(\kappa\Delta u/2)}\\
&=-\frac{\kappa^2}{16\pi}\frac1{\sinh^2(\kappa\Delta u/2)}.
\end{aligned}
$$

最後に二点分布の境界値を、正周波数の処方を保って $\Delta u\to\Delta u-i0$ として読む。$s=\Delta u$、$\beta_H=2\pi/\kappa$ とし、

$$
F(z)=-\frac{\kappa^2}{16\pi\sinh^2(\kappa z/2)}
$$

を取る。分母の零点は $z=2\pi i n/\kappa$（$n\in\mathbb Z$）だけなので、$-\beta_H<\operatorname{Im}z<0$ で $F$ は正則である。上側の境界値は $w(s)=F(s-i0)$ であり、$\sinh(z-i\pi)=-\sinh z$ と偶関数性から下側の境界値は

$$
\begin{aligned}
F(s-i\beta_H+i0)
&=-\frac{\kappa^2}{16\pi\sinh^2[\kappa(s+i0)/2]}\\
&=F(-s-i0)=w(-s).
\end{aligned}
$$

したがって単なる周期性ではなく、[QCURV8のKMS条件](../QCURV8/index.md#def-qcurv8-kms)の上端・下端と演算子順序の反転を検証した。逆温度が $\beta_H$ なので $T_H=1/\beta_H$ を得る。$\square$
<!-- proof-end -->

この計算は、熱因子の出所が**指数的な光線ラベルの対応**であることを示します。一方、外部の $u$ 正周波数真空なら

$$
\partial_u\partial_{u'}W^{(u)}_{\rm out}
=-\frac1{4\pi}(u-u'-i0)^{-2}
$$

です。自由落下座標へ移すと $du/dU=-1/(\kappa U)$ の因子が現れ、$U=0$ の近くで真空の選択の違いが顕在化します。

## 4. 未来地平線と過去地平線では正則性が違う

未来地平線 $U=0,V>0$ を横切るには、出射成分を $u$ だけで定義することが問題になります。過去地平線 $V=0,U<0$ では、同じことが入射成分 $v$ に対して起こります。二次元の微分二点関数の滑らかなアフィン座標表示は、なぜ必要な真空を選び分けるかの診断になります。

<a id="prop-qcurv13-horizon-sectors"></a>

<!-- formal-statement-start -->
> **命題（二次元光線模型の地平線正則性判定）**  
> $\kappa>0$ の永遠のブラックホール右外部で、無質量二次元模型の出射・入射成分をそれぞれ $u$ または $U$、$v$ または $V$ の正周波数真空で構成する。地平線の交点から離れた開いた部分で、アフィン座標 $U,V$ における局所Hadamard差引きを基準にすると、$(u,v)$ は未来・過去の両地平線で非正則、$(U,v)$ は未来地平線で正則で過去地平線で非正則、$(U,V)$ は両地平線で正則となる。
<!-- formal-statement-end -->

### 証明の見取り図

同一点近傍の普遍特異性は、アフィン座標の差 $U-U'$ または $V-V'$ で決まります。$u$ 真空を $U$ へ変換すると、異なる二点の短距離特異部の差には $1/U$ 型の因子が残ります。反対に $U$ 真空を使えば、外部の $u\to+\infty$ が座標特異点でも、$U=0$ 自身は特異点ではありません。

<!-- proof-start -->
### 証明

$u=-\kappa^{-1}\log(-\kappa U)$ なので

$$
\frac{du}{dU}=-\frac1{\kappa U}.
$$

$u$ 真空の微分二点関数を $U$ に変えると

$$
\partial_U\partial_{U'}W^{(u)}
=-\frac1{4\pi}\frac1{\kappa^2 UU'}\,
\frac1{[u(U)-u(U')-i0]^2}.
$$

ここでも $U'$ は微分ではなく第二の点の座標である。$U'=aU$（固定した $a>0$、$a\neq1$）の二点を $U\to0^-$ と近づけると、$u(U)-u(aU)=\kappa^{-1}\log a$ は一定なので

$$
\partial_U\partial_{U'}W^{(u)}
=-\frac1{4\pi}\frac1{aU^2(\log a-i0)^2}.
$$

同じ二点のアフィン真空側は

$$
\partial_U\partial_{U'}W^{(U)}
=-\frac1{4\pi(1-a)^2U^2}
$$

です。例えば $a=2$ なら前者の $U^{-2}$ の係数は $[2(\log2)^2]^{-1}$、後者は $1$ であり、一致しません。滑らかなHadamard余りなら二点を同時に地平線へ寄せても導関数の差が有界なはずなので、これは正則性の反証です。いっぽう $U$ 真空は初めからアフィン座標の普遍形を持ちます。

入射成分は $v=\kappa^{-1}\log(\kappa V)$ と $dv/dV=1/(\kappa V)$ に同じ議論を適用し、過去地平線 $V=0$ の正則性を判定します。最後に $(u,v)$、$(U,v)$、$(U,V)$ の組を当てはめれば結論です。$\square$
<!-- proof-end -->

四次元で実際に用いるBoulware・Unruh・Hartle–Hawking状態では、角運動量・散乱と二点関数の完全な構成が必要です。しかし上の局所診断は、標準的な四次元の状態で得られる次の違いを正しく予告します。

| 状態 | 未来地平線 $\mathcal H^+$ | 過去地平線 $\mathcal H^-$ | 遠方の物理像 |
| --- | --- | --- | --- |
| Boulware | 非正則 | 非正則 | 遠方に熱的入射も正味放射もない |
| Unruh | 正則（分岐二球面を除く） | 非正則 | 入射真空からの後期放射 |
| Hartle–Hawking | 正則 | 正則 | 両向きの熱放射が釣り合う |

**注意**：Unruh状態の未来地平線での正則性は、外部の非定常な崩壊時空と対応する物理的性質です。永遠の拡張時空の過去地平線や分岐二球面まで滑らかだという主張ではありません。また、Boulware状態は地平線を持たない静止した星の外部での真空近似としては自然であっても、地平線を跨ぐ真空ではありません。

## 5. 灰色体因子を通した遠方流束を比較する

遠方における平衡性は「熱因子があるか」だけでは判定できません。遠方へ出るモードには、地平線側のup成分が**透過**して来たものと、無限遠からのin成分が**反射**して戻ったものが同時に含まれます。

[QCURV12の散乱の流束保存と相反性](../QCURV12/index.md#thm-qcurv12-flux-unitarity)から、同一 $\omega,\ell,m$ において正規化した出射消滅演算子は

$$
b_{\rm out}=\mathcal T_\ell a_{\rm up}+\mathcal R_\ell a_{\rm in},
\qquad |\mathcal T_\ell|^2=\Gamma_\ell,
\quad |\mathcal R_\ell|^2=1-\Gamma_\ell
$$

と書けます。反射・透過の位相は以下の占有数には寄与しません。inとupが独立な準自由状態なら $\langle a_{\rm in}^\dagger a_{\rm up}\rangle=0$ です。

<a id="thm-qcurv13-state-flux"></a>

<!-- formal-statement-start -->
> **定理（三状態の遠方出射占有数と正味流束）**  
> 非回転Schwarzschild背景の質量零自由スカラー場で、$\omega>0$、$\ell\ge0$、$m=-\ell,\ldots,\ell$ とし、固定した背景の定常散乱に $0\le\Gamma_\ell(\omega)\le1$ を用いる。in/upチャネルの交差期待値について

$$
\langle a_{\rm in}^\dagger a_{\rm up}\rangle
=\langle a_{\rm up}^\dagger a_{\rm in}\rangle=0
$$

> を仮定し、平均占有数を $n_{\rm in},n_{\rm up}$ とすると、無限遠における出射占有数は

$$
n_{\rm out}=\Gamma_\ell n_{\rm up}+(1-\Gamma_\ell)n_{\rm in},
\qquad n_{\rm out}-n_{\rm in}=\Gamma_\ell(n_{\rm up}-n_{\rm in}).
$$

> 特に $n_H(\omega)=(e^{\omega/T_H}-1)^{-1}$ とすると、Boulwareでは $(n_{\rm in},n_{\rm out})=(0,0)$、Unruhでは $(0,\Gamma_\ell n_H)$、Hartle–Hawkingでは $(n_H,n_H)$ となる。遠方の**正味**粒子数流束スペクトルは

$$
\frac{d^2N_{\rm net}}{dt\,d\omega}
=\frac1{2\pi}\sum_{\ell=0}^\infty(2\ell+1)
\Gamma_\ell(\omega)[n_{\rm up}(\omega)-n_{\rm in}(\omega)]
$$

> であり、正味エネルギー流束には積分核にさらに $\omega$ を掛ける。外部からの入射が無い場合に限って、この正味流束は出射流束と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

二つの独立な入射チャネルの絶対値二乗を足し、反射の割合を $1-\Gamma_\ell$ に置き換えます。遠方の「出る粒子数」から「入る粒子数」を引くと、散乱しなかった入射成分が相殺されます。熱平衡状態では二方向が同じ熱的占有数なので、出射している粒子がいても正味は零です。

<!-- proof-start -->
### 証明

上の線形結合の随伴を掛けると

$$
\begin{aligned}
b_{\rm out}^\dagger b_{\rm out}
={}&|\mathcal T_\ell|^2a_{\rm up}^\dagger a_{\rm up}
+|\mathcal R_\ell|^2a_{\rm in}^\dagger a_{\rm in}\\
&+\mathcal T_\ell^*\mathcal R_\ell a_{\rm up}^\dagger a_{\rm in}
+\mathcal R_\ell^*\mathcal T_\ell a_{\rm in}^\dagger a_{\rm up}.
\end{aligned}
$$

仮定した二つの交差期待値が零なので交差項は消え、[QCURV12のユニタリ散乱](../QCURV12/index.md#thm-qcurv12-flux-unitarity)を代入すると

$$
\langle b_{\rm out}^\dagger b_{\rm out}\rangle
=\Gamma_\ell n_{\rm up}+(1-\Gamma_\ell)n_{\rm in}.
$$

ここから入射分を差し引けば

$$
n_{\rm out}-n_{\rm in}
=\Gamma_\ell n_{\rm up}+(1-\Gamma_\ell)n_{\rm in}-n_{\rm in}
=\Gamma_\ell(n_{\rm up}-n_{\rm in})
$$

を得ます。Bでは両者が零、Uでは $(n_{\rm in},n_{\rm up})=(0,n_H)$、HHでは $(n_H,n_H)$ です。したがってHHの出射側にも

$$
n_{\rm out}^{\rm HH}=\Gamma_\ell n_H+(1-\Gamma_\ell)n_H=n_H
$$

だけ粒子があり、入射分との正味は零です。

連続周波数を幅 $d\omega$、時間幅 $dt$ の波束で数えると、一チャネルの状態数は $dt\,d\omega/(2\pi)$ です。球面調和の $m$ は $2\ell+1$ 個あるため全チャネルを足して表示式になります。エネルギーは一量子あたり $\omega$ なので、その重みを掛けます。$\square$
<!-- proof-end -->

### 直接計算：熱的な入射があるときの反射波

$\Gamma_\ell=1/4$、$n_H=2$ とします。Unruhでは $n_{\rm out}=(1/4)\cdot2=1/2$。HHでは $n_{\rm out}=(1/4)\cdot2+(3/4)\cdot2=2$、入射も $2$ なので正味は零です。**HHでも個々の出射量が零になるわけではありません。**

## 6. 熱平衡・崩壊・自由落下を混同しない

Unruhは「未来地平線で正則、無限遠からの入射真空」という境界条件を持ち、[QCURV10の崩壊光線写像](../QCURV10/index.md#thm-qcurv10-late-exponential)と[QCURV11の後期熱因子](../QCURV11/index.md#thm-qcurv11-thermal-ratio)によって、後期の崩壊ブラックホールの外部観測に対応します。永遠の時空のUnruh状態を、実際の重力崩壊の**全時刻に厳密に一致する**状態とは主張しません。

Hartle–Hawkingは[QCURV8のKMS条件](../QCURV8/index.md#def-qcurv8-kms)を静的外部のKilling時間に関して満たす平衡状態です。遠方からも熱い放射が到来するため、孤立した崩壊ブラックホールの境界条件ではありません。KMSの熱性は静止系の時間発展に対する状態の性質です。自由落下観測者の個別の有限時間検出器が、そのまま温度 $T_H$ の理想的な熱放射を読むという結論は出ません。検出器には世界線・切替関数・二点関数を組み合わせる[QCURV6の応答](../QCURV6/index.md#def-qcurv6-response)が必要です。

地平線正則性は無限遠粒子数と異なる条件です。Boulwareは遠方の粒子数が零でも地平線で非正則、Unruhは遠方に正味流束があって未来地平線で正則、HHは熱い入射も出射もあって正味流束は零です。いずれも四次元の局所応力テンソルの値を上の粒子数だけで直接計算したことにはなりません。そのためには次に扱うHadamard差引き・点分離と曲率項が必要です。

## 演習

### Level A：状態の境界条件を自分で判定する

<a id="ex-qcurv13-a01"></a>
#### QCURV13-A01 温度と熱的占有数
- Level: A
- 問題: $M>0$ のSchwarzschild背景で $\kappa=1/(4M)$ とする。$T_H$ を求め、$\omega=T_H\log 5$ の熱的Bose占有数 $n_H=(e^{\omega/T_H}-1)^{-1}$ を計算せよ。

<!-- solution-start -->
**詳細解答**：$T_H=\kappa/(2\pi)=1/(8\pi M)$ です。指定周波数を割ると $\omega/T_H=\log5$、したがって $e^{\omega/T_H}=5$、$n_H=1/(5-1)=1/4$ です。$\omega>0$ なので分母は正です。
<!-- solution-end -->

<a id="ex-qcurv13-a02"></a>
#### QCURV13-A02 Kruskal光線ラベルの微分
- Level: A
- 問題: $\kappa>0$、$U=-\kappa^{-1}e^{-\kappa u}$、$V=\kappa^{-1}e^{\kappa v}$ とする。$dU/du$、$du/dU$、$dV/dv$、$dv/dV$ を求め、どの微分がどの地平線で発散するか述べよ。

<!-- solution-start -->
**詳細解答**：指数微分で $dU/du=e^{-\kappa u}=-\kappa U$、$dV/dv=e^{\kappa v}=\kappa V$ です。[逆関数の微分公式](../../../基礎科目/RA/RA3/index.md#thm-ra3-inverse)から

$$
\frac{du}{dU}=-\frac1{\kappa U},\qquad
\frac{dv}{dV}=\frac1{\kappa V}.
$$

右外部で $U<0,V>0$ です。$U\to0^-$ で $du/dU$ が、$V\to0^+$ で $dv/dV$ が発散します。それぞれ未来・過去地平線です。
<!-- solution-end -->

<a id="ex-qcurv13-a03"></a>
#### QCURV13-A03 三状態の入射とup占有数
- Level: A
- 問題: ある $\omega>0$ で $n_H(\omega)=3$ とする。Boulware・Unruh・Hartle–Hawking状態について $(n_{\rm in},n_{\rm up})$ を書き、入射真空の状態をすべて挙げよ。

<!-- solution-start -->
**詳細解答**：[三状態の定義](#def-qcurv13-three-states)に代入します。Bは $(0,0)$、Uは $(0,3)$、HHは $(3,3)$ です。in成分の占有数が零なのはBとUです。ただしBのup成分も空であり、Uだけが出射側に熱的占有数を持ちます。
<!-- solution-end -->

<a id="ex-qcurv13-a04"></a>
#### QCURV13-A04 地平線の向きと正則性
- Level: A
- 問題: 右外部 $U<0,V>0$ で未来地平線を $U=0,V>0$、過去地平線を $V=0,U<0$ とする。外部の出射 $u$ 真空と入射 $v$ 真空のうち、それぞれどちらの地平線で正則性の問題が現れるか答え、座標微分で根拠を示せ。

<!-- solution-start -->
**詳細解答**：出射 $u$ 真空は未来地平線で問題になります。$du/dU=-1/(\kappa U)$ が $U=0$ で発散するからです。入射 $v$ 真空は過去地平線で問題になります。$dv/dV=1/(\kappa V)$ が $V=0$ で発散するからです。ただし座標微分の発散だけで状態の非正則性が自動確定するわけではなく、[二点分布の差引き診断](#prop-qcurv13-horizon-sectors)を合わせて使います。
<!-- solution-end -->

### Level B：相関関数と遠方の散乱を検算する

<a id="ex-qcurv13-b01"></a>
#### QCURV13-B01 指数座標から熱的相関関数へ
- Level: B
- 問題: $\kappa>0$、$U(u)=-e^{-\kappa u}/\kappa$ とし、二次元の出射アフィン真空に $\partial_U\partial_{U'}W=-1/[4\pi(U-U'-i0)^2]$ を用いる。$\Delta u=u-u'$、$\bar u=(u+u')/2$ により引戻しの微分二点関数を求め、$\kappa\to0$ の極限を検算せよ。

<!-- solution-start -->
**詳細解答**：指数差は

$$
U(u)-U(u')=\frac2\kappa e^{-\kappa\bar u}\sinh(\kappa\Delta u/2),
\quad \frac{dU(u)}{du}\frac{dU(u')}{du'}=e^{-2\kappa\bar u}.
$$

二つの導関数を掛ける連鎖律を使い、指数を約分して

$$
\partial_u\partial_{u'}W=-\frac{\kappa^2}{16\pi}
\sinh^{-2}\left[\frac\kappa2(\Delta u-i0)\right].
$$

$\sinh x=x+O(x^3)$ なので $\kappa^2/[4\sinh^2(\kappa\Delta u/2)]\to1/(\Delta u)^2$ です。従って分布の境界値も通常の $u$ 真空の $-1/[4\pi(\Delta u-i0)^2]$ に移ります。
<!-- solution-end -->

<a id="ex-qcurv13-b02"></a>
#### QCURV13-B02 地平線で滑らかでない差の係数
- Level: B
- 問題: 二次元の出射 $u$ 真空について、$u=-\log(-\kappa U)/\kappa$、$U'=2U$（$U<0$）とする。$\partial_U\partial_{U'}W^{(u)}$ とアフィン $U$ 真空の対応量を計算し、差が $U\to0$ で滑らかにならないことを示せ。

<!-- solution-start -->
**詳細解答**：$du/dU=-1/(\kappa U)$、$u(U)-u(2U)=\log2/\kappa$ です。したがって

$$
\partial_U\partial_{U'}W^{(u)}
=-\frac1{4\pi}\frac1{2U^2(\log2)^2}.
$$

アフィン真空では差 $U-U'=-U$ なので

$$
\partial_U\partial_{U'}W^{(U)}=-\frac1{4\pi U^2}.
$$

二つの差の $U^{-2}$ の係数は $1/[2(\log2)^2]\ne1$ です。$U\to0$ で有限の滑らかな余りへは延長できません。二点を同時に地平線へ寄せる極限での差を調べたので、単なる座標発散の言い換えではありません。
<!-- solution-end -->

<a id="ex-qcurv13-b03"></a>
#### QCURV13-B03 反射と透過を含む三状態
- Level: B
- 問題: 固定した $\omega,\ell,m$ で $\Gamma_\ell=2/5$、$n_H=5/2$ とする。独立なin/upチャネルを仮定し、B・U・HHの遠方出射占有数 $n_{\rm out}$ と入射との差をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**：[遠方占有数の定理](#thm-qcurv13-state-flux)で反射率は $1-\Gamma=3/5$ です。各状態の $(n_{\rm in},n_{\rm up})$ を代入すると

$$
\begin{aligned}
n_{\rm out}^{\rm B}&=(2/5)\cdot0+(3/5)\cdot0=0,\\
n_{\rm out}^{\rm U}&=(2/5)(5/2)+(3/5)\cdot0=1,\\
n_{\rm out}^{\rm HH}&=(2/5)(5/2)+(3/5)(5/2)=1+3/2=5/2.
\end{aligned}
$$

したがって入射数を引いた正味は、B、U、HHの順に $0$、$1-0=1$、$5/2-5/2=0$ です。
<!-- solution-end -->

<a id="ex-qcurv13-b04"></a>
#### QCURV13-B04 平衡と熱的詳細釣合いの区別
- Level: B
- 問題: $T_H>0$、$\omega>0$、$n_H=(e^{\omega/T_H}-1)^{-1}$ とする。$n_H/(1+n_H)=e^{-\omega/T_H}$ を示せ。さらに $0<\Gamma<1$ で、UnruhとHHの**正味**遠方流束が異なる理由を、各状態のin/up占有数から説明せよ。

<!-- solution-start -->
**詳細解答**：$x=e^{\omega/T_H}>1$ と置くと $n_H=1/(x-1)$、$1+n_H=x/(x-1)$ です。従って

$$
\frac{n_H}{1+n_H}=\frac{1/(x-1)}{x/(x-1)}
=\frac1x=e^{-\omega/T_H}.
$$

これは熱的な励起・脱励起比の元になる式です。一方、Unruhは $(n_{\rm in},n_{\rm up})=(0,n_H)$、HHは $(n_H,n_H)$ なので、[遠方正味流束の定理](#thm-qcurv13-state-flux)の差は

$$
(n_{\rm out}-n_{\rm in})_{\rm U}=\Gamma n_H>0,
\qquad (n_{\rm out}-n_{\rm in})_{\rm HH}=\Gamma(n_H-n_H)=0
$$

です。熱的なupチャネルを共通に持つことと、遠方に正味流束があることは同値ではありません。
<!-- solution-end -->

### Level C：地平線・状態・観測量を一度に結ぶ

<a id="ex-qcurv13-c01"></a>
#### QCURV13-C01 ブラックホール三状態の総合判定
- Level: C
- 問題: $M>0$ の永遠のSchwarzschild外部の質量零スカラー場を考え、$\kappa=1/(4M)$、$T_H=\kappa/(2\pi)$ とする。

  出射・入射時刻を $u=t-r_*$、$v=t+r_*$ とし、Kruskal光線ラベルを次で定める。

  $$
  U=-\frac{e^{-\kappa u}}\kappa,\qquad
  V=\frac{e^{\kappa v}}\kappa.
  $$

  各 $\omega>0$、$\ell,m$ の散乱は、独立なin/upチャネルと次の係数で与える。

  $$
  |\mathcal T_\ell|^2=\Gamma_\ell,\qquad
  |\mathcal R_\ell|^2=1-\Gamma_\ell.
  $$

  1. $(u,v)$、$(U,v)$、$(U,V)$ の三つの二次元真空模型について未来・過去地平線の正則性を判定せよ。
  2. それぞれに対応するB・U・HHの占有数を記し、無限遠での出射と正味粒子数を求めよ。
  3. HHが「粒子が出ない」状態ではなく、Uが「全時刻の崩壊状態」でもない理由を述べよ。

<!-- solution-start -->
**詳細解答**：

(1) まず逆座標の微分は

$$
\frac{du}{dU}=-\frac1{\kappa U},\qquad
\frac{dv}{dV}=\frac1{\kappa V}
$$

です。外部の $u$ 真空は $U=0$ の未来地平線に非正則で、$v$ 真空は $V=0$ の過去地平線に非正則です。アフィン $U,V$ 真空はそれぞれの地平線で普遍Hadamard形を保ちます。

よって $(u,v)$ は両方非正則、$(U,v)$ は未来正則・過去非正則、$(U,V)$ は両方正則です。これは[二次元模型の命題](#prop-qcurv13-horizon-sectors)の範囲の判定で、四次元全般の存在証明とは区別します。

(2) $n_H=(e^{\omega/T_H}-1)^{-1}$ と書くとBでは $(n_{\rm in},n_{\rm up})=(0,0)$、Uでは $(0,n_H)$、HHでは $(n_H,n_H)$。反射・透過の加重和

$$
n_{\rm out}=\Gamma_\ell n_{\rm up}+(1-\Gamma_\ell)n_{\rm in}
$$

に順に代入すると $n_{\rm out}=0,\Gamma_\ell n_H,n_H$ です。入射を引いた正味は $0,\Gamma_\ell n_H,0$ です。全周波数・角運動量を足すとUだけが

$$
\frac{d^2N_{\rm net}}{dt\,d\omega}
=\frac1{2\pi}\sum_{\ell=0}^\infty(2\ell+1)
\frac{\Gamma_\ell(\omega)}{e^{8\pi M\omega}-1}
$$

の正の寄与を持ちます。エネルギーでは被積分項に $\omega$ を掛けます。

(3) HHでは入射も出射も $n_H$ であるため、差が零になっても両向きの個々の放射は非零です。Uは永遠の拡張時空で未来地平線の正則性と無入射境界条件をモデル化しますが、現実の崩壊初期の過渡や時変な背景を含みません。$\mathcal H^-$ での非正則性も、永遠の平衡状態と同じではないことを示します。
<!-- solution-end -->

---

**次への問い**：地平線の正則性と遠方の粒子流束を区別しました。次は静止時計の赤方偏移、自由落下検出器の応答、局所温度のTolman則を比較し、「温度と観測者」をさらに精密に考えます。
