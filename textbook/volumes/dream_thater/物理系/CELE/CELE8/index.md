# CELE8 太陽系の長期力学

<!-- definition-example-audit: strict -->

> **使う既出結果**：[Kepler作用変数](../CELE1/index.md#prop-cele1-kepler-actions)、[円制限三体問題](../CELE4/index.md#def-cele4-cr3bp)、[三角点の線形安定条件](../CELE4/index.md#thm-cele4-triangular-stability)、[共鳴振り子](../CELE7/index.md#prop-cele7-resonant-reduction)、[KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)。

## 1. 二体問題は解けるのに、長期予報はなぜ難しいのか

Kepler楕円には長半径・離心率・近点方向があります。ほかの惑星の引力は小さくても、何周も経過すると近点の歳差や共鳴角の振動が蓄積します。ここでは「速い公転を平均すると何が残るか」「共鳴では何を平均してはいけないか」「数値で見えた運動と定理で保証した運動の差は何か」を順に調べます。

まず中心星質量 $M$、外側の円軌道天体質量 $m'$、質量を無視できる内側試験粒子の**平面制限模型**に対象を限定します。実際の太陽系が円軌道だけからなるとは仮定しません。

## 2. 摂動関数と動く原点

重力定数を $\mathsf G$、$\mu_0=\mathsf GM$、中心星相対位置を $r$、摂動天体位置を $r'(t)$、$|r'|=a'$ とします。中心星も摂動天体に引かれます。そのため相対運動には原点の加速度を引く補正が必要です。

<a id="def-cele8-disturbing"></a>

<!-- formal-statement-start -->
> **定義（円軌道摂動天体の摂動関数）**  
> 衝突を除いた $r\ne0,\ r\ne r'(t)$ で、直接項と間接項を含む摂動関数および単位質量当たりのHamiltonianを

$$
\mathcal R=\mathsf Gm'\left(\frac1{|r-r'|}-\frac{r\cdot r'}{a'^3}\right),
\qquad
H=\frac{|p|^2}{2}-\frac{\mu_0}{|r|}-\mathcal R
$$

> と定める。$p=\dot r$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele8-disturbing -->

**直接例**。$r=(a,0)$、$r'=(a',0)$、$0<a<a'$ なら $\mathcal R=\mathsf Gm'((a'-a)^{-1}-a/a'^2)$。$r=(-a,0)$ なら距離だけでなく間接項の符号も変わります。

<!-- definition-example-end -->

<a id="prop-cele8-relative-force"></a>

<!-- formal-statement-start -->
> **命題（中心星相対加速度）**  
> 上のHamiltonianから、衝突のない時刻には

$$
\ddot r=-\frac{\mu_0r}{|r|^3}
-\mathsf Gm'\left(\frac{r-r'}{|r-r'|^3}+\frac{r'}{a'^3}\right)
$$

> が得られる。
<!-- formal-statement-end -->

### 証明の見取り図

直接項の勾配と間接項の勾配を分け、$\dot p=-\nabla_rH$ へ代入します。

<!-- proof-start -->
### 証明

$\nabla_r|r-r'|^{-1}=-(r-r')/|r-r'|^3$ および $\nabla_r(r\cdot r')=r'$ から、

$$
\nabla_r\mathcal R=-\mathsf Gm'
\left(\frac{r-r'}{|r-r'|^3}+\frac{r'}{a'^3}\right).
$$

$\dot r=\partial_pH=p$、$\dot p=-\nabla_rH=-\mu_0r/|r|^3+\nabla_r\mathcal R$ を用いて結論を得ます。
<!-- proof-end -->

外側天体の円運動を入力として固定した**制限模型**です。惑星同士が軌道を変え合う一般多体問題そのものではありません。

## 3. 二重平均から近点歳差へ

内側軌道が $|r|<a'$ を保ち、$\gamma$ が $r$ と $r'$ のなす角のとき、逆距離の展開は

$$
\frac1{|r-r'|}=\frac1{a'}+\frac{|r|\cos\gamma}{a'^2}
+\frac{|r|^2}{2a'^3}(3\cos^2\gamma-1)
+O(|r|^3/a'^4).
$$

間接項はちょうど一次項 $|r|\cos\gamma/a'^2$ なので相殺されます。これが「四重極から始まる」理由です。摂動天体の円軌道位相、次に内側粒子の平均近点角 $l$ の順に平均しましょう。

<a id="prop-cele8-quadrupole-average"></a>

<!-- formal-statement-start -->
> **命題（円軌道摂動の二重平均・四重極近似）**  
> 内側のKepler楕円が $a(1+e)<a'$、$0\le e<1$ を満たすとする。四重極次数までの摂動関数を外側円位相と内側平均近点角で平均すると

$$
\langle\mathcal R\rangle_{\rm quad}
=\frac{\mathsf Gm'}{a'}
+\frac{\mathsf Gm'a^2}{4a'^3}\left(1+\frac32e^2\right).
$$

> この近似は内側楕円の近点方向に依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

外側位相平均は $\langle\cos^2\gamma\rangle=1/2$。内側のKepler平均には $dl=(1-e\cos E)dE$ という重みが必要です。

<!-- proof-start -->
### 証明

外側位相を一周させると $\int_0^{2\pi}\cos^2u\,du=\pi$ なので、

$$
\langle\mathcal R\rangle_{\rm outer,quad}
=\frac{\mathsf Gm'}{a'}
+\frac{\mathsf Gm'|r|^2}{2a'^3}\left(\frac32-1\right)
=\frac{\mathsf Gm'}{a'}+\frac{\mathsf Gm'|r|^2}{4a'^3}.
$$

内側Kepler軌道では $|r|=a(1-e\cos E)$ と $l=E-e\sin E$ より

$$
\begin{aligned}
\langle |r|^2\rangle_l
&=\frac{a^2}{2\pi}\int_0^{2\pi}(1-e\cos E)^3\,dE\\
&=\frac{a^2}{2\pi}\int_0^{2\pi}
(1-3e\cos E+3e^2\cos^2E-e^3\cos^3E)\,dE\\
&=a^2(1+3e^2/2).
\end{aligned}
$$

$\cos E$、$\cos^3 E$ の積分は零、$\cos^2E$ の積分は $\pi$ です。代入すれば主張が従い、近点方向を表す角は現れません。
<!-- proof-end -->

この式は**切り捨てた四重極模型の中で正しい式**であり、もとの非平均運動との誤差が全時刻で小さいという主張ではありません。

束縛平面Kepler軌道の[作用変数](../CELE1/index.md#prop-cele1-kepler-actions)を

$$
L=\sqrt{\mu_0a},\qquad G=L\sqrt{1-e^2}
$$

とし、共役角を $(l,g)$ とします。位置に依存しない定数を除けば、二重平均Hamiltonianは

$$
\bar H=-\frac{\mu_0^2}{2L^2}
-C(L)\left(\frac52-\frac{3G^2}{2L^2}\right),\quad
C(L)=\frac{\mathsf Gm'a(L)^2}{4a'^3},\quad
a(L)=L^2/\mu_0.
$$

<a id="prop-cele8-secular-precession"></a>

<!-- formal-statement-start -->
> **命題（円軌道四重極模型の近点歳差）**  
> $0<e<1$ の上記二重平均Hamiltonianでは $L,G$ が保存され、近点角 $g$ の変化率は

$$
\dot g=\frac34n\frac{m'}M\left(\frac a{a'}\right)^3\sqrt{1-e^2},
\qquad n=\sqrt{\mu_0/a^3}
$$

> である。これは四重極・二重平均模型内での値である。
<!-- formal-statement-end -->

### 証明の見取り図

$\dot g=\partial_G\bar H$ では $L$ を固定するので、$a(L)$ も固定です。

<!-- proof-start -->
### 証明

$\bar H$ が $l,g$ を含まないので $\dot L=-\partial_l\bar H=0$、$\dot G=-\partial_g\bar H=0$。また

$$
\dot g=\partial_G\bar H=\frac{3CG}{L^2}
=\frac{3\mathsf Gm'a^2}{4a'^3}
\frac{\sqrt{1-e^2}}{\sqrt{\mu_0a}}.
$$

$n^2a^3=\mathsf GM=\mu_0$ より $a^2/\sqrt{\mu_0a}=1/n$、さらに $(\mathsf Gm'/a'^3)/n=n(m'/M)(a/a')^3$。代入すれば結論です。
<!-- proof-end -->

この模型では長半径と離心率が一定で、**近点方向だけが回ります**。$e=0$ では近点方向が定義できないので、式を円軌道の近点歳差と呼ばないでください。

## 4. 平均運動共鳴とKirkwood空隙

公転平均運動が整数比に近づくと、何周も繰り返す間に同じ幾何配置に戻り、速い角だと思った組合せが遅くなります。共鳴角を平均で消してはなりません。

<a id="def-cele8-mean-motion-resonance"></a>

<!-- formal-statement-start -->
> **定義（平均運動共鳴）**  
> 正整数 $p,q$ に対し $qn-pn'\simeq0$ を $p:q$ の平均運動共鳴近傍と呼ぶ。平均黄経 $\lambda,\lambda'$、内側粒子の近点経度 $\varpi$ を用いる共鳴角の一例は

$$
\phi=p\lambda'-q\lambda-(p-q)\varpi.
$$

> 実際に現れるFourier角と係数は摂動関数の展開で決める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele8-mean-motion-resonance -->

**直接例**。内側粒子の $3:1$ 候補で $p=3,q=1$ とすると $\phi=3\lambda'-\lambda-2\varpi$。従って $\dot\phi=3n'-n-2\dot\varpi$ です。近点歳差まで含めて遅い角を検査します。

<!-- definition-example-end -->

Kepler第三法則 $n^2a^3\simeq n'^2a'^3$（中心質量を共通にした小質量比近似）より

$$
a_{\rm res}/a'\simeq(q/p)^{2/3}.
$$

$3:1$ の場所は $a_{\rm res}/a'\simeq3^{-2/3}$。木星との共鳴は小惑星帯のKirkwood空隙を説明する重要な材料ですが、位置を計算しただけで空隙の生成、軌道の散乱・消失が証明されるわけではありません。

<a id="prop-cele8-resonant-width"></a>

<!-- formal-statement-start -->
> **命題（離調つき共鳴正規形の島幅・面積）**  
> 正準対 $(\phi,J)$ の一自由度模型

$$
K=\frac\beta2J^2+\delta J-\varepsilon\cos\phi,\qquad
\beta,\varepsilon>0,\quad\delta\in\mathbb R
$$

> で、$J_c=-\delta/\beta$ とする。$(0,J_c)$ は楕円型、$(\pi,J_c)$ は双曲型で、分離曲線の $J$ 全幅は $4\sqrt{\varepsilon/\beta}$、囲む面積は $16\sqrt{\varepsilon/\beta}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

離調を正方完成して振り子に直し、鞍点のエネルギーで分離曲線を求めます。

<!-- proof-start -->
### 証明

$P=J+\delta/\beta$ と置けば $dP=dJ$ で正準対を保ち、

$$
K=\frac\beta2P^2-\varepsilon\cos\phi-\frac{\delta^2}{2\beta}.
$$

$\dot\phi=\beta P,\ \dot P=-\varepsilon\sin\phi$ より、$\phi=0$ 周りで $\ddot\phi=-\beta\varepsilon\phi+O(\phi^3)$、$\phi=\pi+u$ 周りで $\ddot u=\beta\varepsilon u+O(u^3)$。従って楕円型・双曲型です。定数を省いた鞍点エネルギーは $+\varepsilon$ だから、

$$
\frac\beta2P^2-\varepsilon\cos\phi=\varepsilon
\quad\Longrightarrow\quad
P_\pm=\pm2\sqrt{\varepsilon/\beta}|\cos(\phi/2)|.
$$

最大と最小の差は $4\sqrt{\varepsilon/\beta}$。面積は

$$
A=\int_0^{2\pi}(P_+-P_-)\,d\phi
=4\sqrt{\varepsilon/\beta}\cdot4
=16\sqrt{\varepsilon/\beta}.
$$
<!-- proof-end -->

この幅は**正準作用 $J$ の幅**です。天体の半長径の幅として使うには、共鳴正準変換とFourier係数 $\varepsilon$ の計算が必要です。一自由度模型は可積分なので、分離曲線だけでは[横断ホモクリニック交差](../CELE6/index.md#def-cele6-homoclinic)やカオスを示しません。

## 5. Trojanの共回転系での遅い振動

$1:1$ 共鳴のTrojanは公転を止めるのではなく、惑星とほぼ同じ平均運動で太陽を回りつつ、共回転系で三角点近傍を振動します。[CELE4の三角点定理](../CELE4/index.md#thm-cele4-triangular-stability)を使い、単に安定型と呼ぶ以上の振動数を計算します。

<a id="prop-cele8-trojan-frequency"></a>

<!-- formal-statement-start -->
> **命題（三角点の遅い線形振動数）**  
> 平面円制限三体問題の公転角速度を $1$、質量比を $0<\nu<\nu_R=(1-\sqrt{23/27})/2$ とする。三角点の二つの線形振動数は

$$
\omega_{\rm slow}^2=\frac{1-\sqrt{1-27\nu(1-\nu)}}2,\quad
\omega_{\rm fast}^2=\frac{1+\sqrt{1-27\nu(1-\nu)}}2.
$$

> $\nu\to0+$ では $\omega_{\rm slow}=\sqrt{27\nu/4}\,[1+O(\nu)]$。
<!-- formal-statement-end -->

### 証明の見取り図

既出の特性方程式へ $\lambda=i\omega$ を入れ、$\omega^2$ について解きます。

<!-- proof-start -->
### 証明

[三角点の特性多項式](../CELE4/index.md#thm-cele4-triangular-stability)は $\lambda^4+\lambda^2+27\nu(1-\nu)/4=0$。$\lambda=i\omega$、$z=\omega^2$ と置けば

$$
z^2-z+\frac{27}{4}\nu(1-\nu)=0,
$$

従って二次方程式から表示した正の二根が得られます。$\sqrt{1-x}=1-x/2+O(x^2)$ に $x=27\nu(1-\nu)$ を代入すると $\omega_{\rm slow}^2=27\nu/4+O(\nu^2)$。正の平方根を取って結論です。
<!-- proof-end -->

これは**線形・小振幅の結果**であり、有限振幅のすべてのTrojanが永久に安定だとは主張しません。

## 6. 自転軌道共鳴の最小模型

自転角 $\theta$ をもつ非球対称物体が円軌道で受けるトルクの最小模型は、慣性モーメント $I>0$、結合定数 $A>0$、公転角速度 $n>0$ に対し

$$
H_{\rm spin}=\frac{p^2}{2I}-A\cos(2\theta-2nt)
$$

です。楕円軌道の $3:2$ 自転共鳴の形成・捕獲まで、この円軌道模型からは言えません。

<a id="prop-cele8-spin-synchronous"></a>

<!-- formal-statement-start -->
> **命題（同期自転の振り子還元）**  
> 時間依存正準変換 $\phi=\theta-nt,\ J=p-In$ によって、定数を除くHamiltonianは

$$
K_{\rm spin}=\frac{J^2}{2I}-A\cos2\phi.
$$

> $(\phi,J)=(0,0)$ は楕円型の同期平衡点で、小振幅角振動数は $2\sqrt{A/I}$。分離曲線上の最大 $|J|$ は $2\sqrt{IA}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

時間依存生成関数の $\partial_tF_2$ を忘れないことが中心です。

<!-- proof-start -->
### 証明

$F_2(\theta,P,t)=(\theta-nt)P$ なら $p=P$、$\phi=\theta-nt$。従って変換後は

$$
K=\frac{P^2}{2I}-A\cos2\phi-nP
=\frac{(P-In)^2}{2I}-A\cos2\phi-\frac{In^2}2.
$$

$J=P-In$ とおけば表示した式です。$\dot\phi=J/I,\ \dot J=-2A\sin2\phi$。$\phi=u$ で $\ddot u=-(4A/I)u+O(u^3)$ だから小振幅周波数は $2\sqrt{A/I}$。鞍点は $(\pi/2,0)$、エネルギーは $+A$ で、

$$
\frac{J^2}{2I}-A\cos2\phi=A
\Longrightarrow J^2=4IA\cos^2\phi.
$$

最大値は $|J|=2\sqrt{IA}$ です。
<!-- proof-end -->

自転共鳴への捕獲確率には離心率に依存するFourier成分や潮汐散逸のモデルが必要です。単なる同期振り子の存在を捕獲の証明と取り違えません。

## 7. 長期積分・KAM・無限時間安定性の距離

軌道を長く積分するときは、時間刻み、初期値、非衝突範囲、エネルギーやJacobi積分の誤差だけでなく、共鳴角が循環したか振動したかを追います。保存構造と元のエネルギーの完全一致は別条件です。

<a id="prop-cele8-symplectic-euler"></a>

<!-- formal-statement-start -->
> **命題（kick–drift型symplectic Euler法の面積保存）**  
> $V\in C^2(\mathbb R)$、$h>0$ に対し、一自由度Hamiltonian $H=p^2/2+V(q)$ の写像

$$
p_+=p-hV'(q),\qquad q_+=q+hp_+
$$

> は $dq\wedge dp$ を保存するが、一般には $H$ を厳密保存しない。
<!-- formal-statement-end -->

### 証明の見取り図

更新行列の行列式と具体的なエネルギー差を分けて計算します。

<!-- proof-start -->
### 証明

$V''(q)=v$ とおくと

$$
D(q_+,p_+)=\begin{pmatrix}1-h^2v&h\\-hv&1\end{pmatrix},
\quad\det D=(1-h^2v)+h^2v=1.
$$

二次元ではこれが正準面積の保存を意味します。一方 $V=q^2/2$、$(q,p)=(1,0)$ なら $(q_+,p_+)=(1-h^2,-h)$ で、

$$
H_+-H_0=\frac{(1-h^2)^2+h^2-1}{2}
=\frac{h^4-h^2}{2},
$$

これは例えば $h=1/2$ で零ではありません。
<!-- proof-end -->

[KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)は解析性・非退化性・Diophantine条件と摂動の小ささを確認した模型で存続トーラスを与えます。しかし実太陽系全軌道の無限時間安定性を自動的に証明しません。有限時間の軌道図、検証済み数値計算による有限区間の包含、数学的な無限時間存在定理は区別します。

## 8. 演習と詳細解答

### Level A

<a id="ex-cele8-a01"></a>
**A1：間接項の相殺**
- Level: A

$|r|<a'$ で逆距離を二次まで展開し、間接項を引いて一次が消えることを示せ。

<!-- solution-start -->
**詳細解答**。$\rho=|r|,\ c=\cos\gamma$ と置くと $|r'-r|^{-1}=a'^{-1}+\rho c/a'^2+\rho^2(3c^2-1)/(2a'^3)+O(\rho^3/a'^4)$。間接項は $r\cdot r'/a'^3=\rho c/a'^2$。差では一次の $\rho c/a'^2$ が相殺し、定数と $\rho^2(3c^2-1)/(2a'^3)$ が残ります。
<!-- solution-end -->

<a id="ex-cele8-a02"></a>
**A2：平均半径二乗**
- Level: A

$r=a(1-e\cos E)$、$dl=(1-e\cos E)dE$ から $\langle r^2\rangle_l$ を求めよ。

<!-- solution-start -->
**詳細解答**。$r^2dl=a^2(1-e\cos E)^3dE$。展開は $1-3e\cos E+3e^2\cos^2E-e^3\cos^3E$。一周積分で奇数次は零、$\int_0^{2\pi}\cos^2E\,dE=\pi$ なので $\langle r^2\rangle_l=a^2(1+3e^2/2)$。$E$ の一様平均と混同しません。
<!-- solution-end -->

<a id="ex-cele8-a03"></a>
**A3：三対一の場所**
- Level: A

二つのKepler運動について $n=3n'$ のとき $a/a'$ を求め、共鳴角を一つ書け。

<!-- solution-start -->
**詳細解答**。$n/n'=(a'/a)^{3/2}$ なので $(a'/a)^{3/2}=3$、従って $a/a'=3^{-2/3}$。角の一例は $\phi=3\lambda'-\lambda-2\varpi$ で、$\dot\phi=3n'-n-2\dot\varpi$。実際に遅くなるには近点歳差も小さい必要があります。
<!-- solution-end -->

<a id="ex-cele8-a04"></a>
**A4：自転振り子の安定型**
- Level: A

$K=J^2/(2I)-A\cos2\phi$ の $\phi=0$ と $\phi=\pi/2$ の線形型を計算せよ。

<!-- solution-start -->
**詳細解答**。$\dot\phi=J/I$、$\dot J=-2A\sin2\phi$。$\phi=u$ では $\ddot u=-(4A/I)u+O(u^3)$ で楕円型。$\phi=\pi/2+u$ では $\sin(\pi+2u)=-2u+O(u^3)$ から $\ddot u=(4A/I)u+O(u^3)$ で双曲型です。
<!-- solution-end -->

<a id="ex-cele8-a05"></a>
**A5：Trojanの周期**
- Level: A

$\nu\ll1$ の小振幅の遅い振動が $\omega_{\rm slow}\simeq\sqrt{27\nu/4}$ のとき、主天体の公転周期 $T_{\rm orb}$ に対する振動周期の比を求めよ。

<!-- solution-start -->
**詳細解答**。実際の振動数は $n'\omega_{\rm slow}$、公転周期は $2\pi/n'$。よって $T_{\rm lib}/T_{\rm orb}=1/\omega_{\rm slow}\simeq\sqrt{4/(27\nu)}$。小質量比では遅い振動が多くの公転にまたがります。
<!-- solution-end -->

### Level B

<a id="ex-cele8-b01"></a>
**B1：歳差の中間計算**
- Level: B

$\bar H=-\mu_0^2/(2L^2)-C(5/2-3G^2/(2L^2))$、$C=\mathsf Gm'a^2/(4a'^3)$ から $L,G$ と $\dot g$ を求めよ。

<!-- solution-start -->
**詳細解答**。角 $l,g$ が現れないから $\dot L=\dot G=0$。$G=L\sqrt{1-e^2}$、$L=\sqrt{\mu_0a}$ として

$$
\dot g=\partial_G\bar H=\frac{3CG}{L^2}
=\frac{3\mathsf Gm'a^2\sqrt{1-e^2}}{4a'^3\sqrt{\mu_0a}}
=\frac34n\frac{m'}M\left(\frac a{a'}\right)^3\sqrt{1-e^2}.
$$

最後は $n^2a^3=\mu_0=\mathsf GM$ を使用。$e=0$ では近点方向は定義不能です。
<!-- solution-end -->

<a id="ex-cele8-b02"></a>
**B2：離調共鳴島の面積**
- Level: B

$\beta,\varepsilon>0$ の $K=\beta J^2/2+\delta J-\varepsilon\cos\phi$ の島の中心、全幅、面積を求めよ。

<!-- solution-start -->
**詳細解答**。$P=J+\delta/\beta$ として $K=\beta P^2/2-\varepsilon\cos\phi-\delta^2/(2\beta)$。中心は $J=-\delta/\beta,\phi=0$。鞍点エネルギーから $P^2=4(\varepsilon/\beta)\cos^2(\phi/2)$、枝は $P_\pm=\pm2\sqrt{\varepsilon/\beta}|\cos(\phi/2)|$。最大の作用差は $4\sqrt{\varepsilon/\beta}$。面積は $4\sqrt{\varepsilon/\beta}\int_0^{2\pi}|\cos(\phi/2)|d\phi=16\sqrt{\varepsilon/\beta}$。
<!-- solution-end -->

<a id="ex-cele8-b03"></a>
**B3：三角点の線形条件**
- Level: B

$\lambda^4+\lambda^2+27\nu(1-\nu)/4=0$ から線形振動となる質量比条件を求め、$\nu=0.01$ を判定せよ。

<!-- solution-start -->
**詳細解答**。$\lambda=i\omega$、$z=\omega^2$ で $z^2-z+27\nu(1-\nu)/4=0$。異なる正の根を持つには $0<27\nu(1-\nu)<1$ が必要十分です。$0<\nu\le1/2$ では $\nu<(1-\sqrt{23/27})/2$。$\nu=0.01$ の場合 $27\nu(1-\nu)=0.2673<1$ で線形振動型です。非線形安定を意味しません。
<!-- solution-end -->

<a id="ex-cele8-b04"></a>
**B4：symplectic積分とエネルギー**
- Level: B

$H=(q^2+p^2)/2$ をkick–drift法で一歩進め、Jacobian行列式と初期値 $(1,0)$ でのエネルギー差を計算せよ。

<!-- solution-start -->
**詳細解答**。$p_+=p-hq$、$q_+=q+hp_+=(1-h^2)q+hp$ なので、更新行列は $\begin{pmatrix}1-h^2&h\\-h&1\end{pmatrix}$、行列式は $1-h^2+h^2=1$。$(1,0)$ は $(1-h^2,-h)$ へ移り、差は $((1-h^2)^2+h^2-1)/2=(h^4-h^2)/2$。面積保存でもエネルギーは一般に不変ではありません。
<!-- solution-end -->

### Level C

<a id="ex-cele8-c01"></a>
**C1：永年摂動・共鳴・長期予測**
- Level: C

$a(1+e)<a'$、$0<e<1$、$m'/M\ll1$ とする。(1) 四重極二重平均から歳差を得よ。(2) $3:1$ 共鳴角を記し、単純平均の限界を述べよ。(3) 離調振り子の厳密結果と実際のKirkwood空隙について未証明の部分を区別せよ。(4) 数値実験とKAMの適用条件の差を述べよ。

<!-- solution-start -->
**詳細解答**。(1) 逆距離展開の一次項は間接項と相殺する。円軌道位相の $\langle\cos^2\gamma\rangle=1/2$ から $\langle\mathcal R\rangle_{\rm outer}=\mathsf Gm'/a'+\mathsf Gm'r^2/(4a'^3)$。内側楕円では $dl=(1-e\cos E)dE$ を使い $\langle r^2\rangle=a^2(1+3e^2/2)$。従って $\bar H=-\mu_0^2/(2L^2)-C(5/2-3G^2/(2L^2))$。$\dot L=\dot G=0$、$\dot g=3CG/L^2=(3/4)n(m'/M)(a/a')^3\sqrt{1-e^2}$。

(2) $\phi=3\lambda'-\lambda-2\varpi$ の微分は $3n'-n-2\dot\varpi$。整数比付近では $\phi$ が遅くなるので、この共鳴角の項まで平均で消してはならない。候補位置は $a/a'\simeq3^{-2/3}$ です。

(3) $P=J+\delta/\beta$ とすると $K=\beta P^2/2-\varepsilon\cos\phi+\text{定数}$。鞍点エネルギーから $P^2=4(\varepsilon/\beta)\cos^2(\phi/2)$、従って島の作用全幅 $4\sqrt{\varepsilon/\beta}$ と面積 $16\sqrt{\varepsilon/\beta}$ は**この正規形**での結果です。実小惑星の脱出・空隙には別の共鳴との結合や散乱の評価が必要で、この模型だけではカオスも消失も証明しません。

(4) 数値実験ではモデル、初期条件、時間、刻み幅、精度、保存量誤差、共鳴角の履歴を示し、刻み幅収束を検査します。[KAM定理](../../../幾何系/INT/INT8/index.md#thm-int8-kam)は解析性、非退化性、Diophantine条件、十分小さい摂動を確認したHamiltonianに対して無限時間存続するトーラスを与えます。有限時間の数値的規則性と実太陽系全体の無限時間安定性は、どちらもKAMの仮定を調べずには従いません。
<!-- solution-end -->

## 9. 何が分かったか

本章で式から示したのは、限定した円軌道・四重極平均模型、共鳴正規形、三角点の線形化、自転振り子、積分写像の性質です。「太陽系は安定」と一括して結論するのではなく、対象モデル・時間尺度・仮定・定理の主張を揃えることが長期力学の出発点です。
