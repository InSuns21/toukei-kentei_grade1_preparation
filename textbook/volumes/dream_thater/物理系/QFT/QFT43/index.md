# QFT43 パートン模型・深非弾性散乱と因子化の入口

<!-- definition-example-audit: strict -->

[QFT41のQCD作用とクォーク–グルーオン頂点](../QFT41/index.md#def-qft41-qcd-action)は短距離で色付き粒子の振幅を計算する道具でした。しかし実験装置が衝突させるのは自由クォークではなく陽子であり、最終状態にも多数のハドロンが現れます。[QFT42で確認した摂動域と閉じ込めの境界](../QFT42/index.md#def-qft42-lambda)を踏まえると、「陽子内のクォークを直接数える」という直観には条件が必要です。

そこで高エネルギーの電子を陽子へ照射し、**散乱後の電子だけを測ってハドロン最終状態を合計する**深非弾性散乱（DIS）を考えます。まず電子から測れる不変量を決め、次に電磁電流の応答を二つの構造関数へ分けます。最後に、短距離の硬い散乱と長距離の陽子内部をどう分離できるか、またその分離がどこで破綻するかを学びます。

本章は四次元Minkowski計量 $\eta=\operatorname{diag}(-1,1,1,1)$、$\hbar=c=1$ を用います。電子質量・弱相互作用・陽子の偏極を無視する一光子交換を基本例とします。標的の陽子質量は $M>0$、光子の運動量は **電子が失った** $q=k-k'$ とし、空間的な $q$ について $Q^2=q^2>0$ と書きます。別の計量規約の文献に現れる $Q^2=-q^2$ を混ぜないでください。

## 1. 電子だけを測って何が確定するか

入射電子 $k$、散乱電子 $k'$、標的陽子 $P$、観測しないハドロン系 $X$ の総運動量 $P_X=P+q$ を使います。質量殻は $k^2=k'^2=0$、$P^2=-M^2$ です。陽子静止系なら $P=(M,\mathbf0)$、$k=(E,\mathbf k)$、$k'=(E',\mathbf k')$ であり、電子の散乱角を $\theta$ とします。

高いエネルギーを与えても、光子が十分な空間的運動量を運ばなければ短距離は見えません。そこで $Q$ を硬さの尺度とし、電子から陽子を含むハドロン系へ移ったエネルギー $\nu$ と、運動量移行のうち陽子のどの割合を測ったかを表す $x_B$ を導入します。

<a id="def-qft43-dis-kinematics"></a>

<!-- formal-statement-start -->
> **定義（深非弾性散乱の不変運動学）**  
> $e(k)+N(P)\to e(k')+X(P_X)$ で、$k^2=k'^2=0$、$P^2=-M^2$、$q=k-k'$、$Q^2=q^2>0$、$P_X=P+q$ とする。陽子静止系のエネルギー移行、Bjorken変数、非弾性度、ハドロン系の不変質量をそれぞれ

$$
\nu=-\frac{P\cdot q}{M}>0,\qquad
x_B=\frac{Q^2}{-2P\cdot q}=\frac{Q^2}{2M\nu},\qquad
y=\frac{P\cdot q}{P\cdot k},\qquad
W^2=-P_X^2
$$

> と定義する。$x_B$ と $y$ は無次元である。以下で $x$ と略記するときは $x=x_B$ を指す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft43-dis-kinematics -->
### 例：電子のエネルギーと角度から全条件を確認する

**定義の確認**：単位を $M=1$ とし、静止標的へ $E=10$ の電子を入射、$E'=5$、$\cos\theta=0.95$ とします。零質量条件 $|\mathbf k|=E$、$|\mathbf k'|=E'$ と $(-+++)$ の内積から

$$
k\cdot k'=-EE'+\mathbf k\cdot\mathbf k'=-EE'(1-\cos\theta),
\qquad Q^2=-2k\cdot k'=5>0.
$$

静止標的 $P=(M,\mathbf0)$ では $P\cdot q=-M(E-E')=-5$、$P\cdot k=-ME=-10$ なので $\nu=5>0$、$x=1/2$、$y=1/2$。四元運動量保存 $P_X=P+q$ を二乗すると $W^2=-P^2-2P\cdot q-q^2=1+10-5=6>0$ です。零質量・標的質量殻、符号、正値、運動量保存の各条件をこの値で直接確かめました。
<!-- definition-example-end -->

<a id="prop-qft43-w2"></a>

<!-- formal-statement-start -->
> **命題（最終状態質量とBjorken変数）**  
> [深非弾性散乱の不変運動学](#def-qft43-dis-kinematics)の仮定で $0<x_B$、$0<y$ とし、標的静止系で電子の散乱を測る。このとき

$$
\begin{aligned}
Q^2&=2EE'(1-\cos\theta), &y&=\frac{E-E'}{E},\\
W^2&=M^2+Q^2\left(\frac1{x_B}-1\right),
&Q^2&=x_By(s-M^2),\quad s=-(P+k)^2.
\end{aligned}
$$

> 特に $W^2\ge M^2$ の物理的な標的散乱では $0<x_B\le1$。$W^2=M^2$ は弾性終状態に対応し、$W^2>M^2$ なら $x_B<1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

電子側では二つの零質量ベクトルの内積、陽子側では $P_X=P+q$ の二乗を展開します。$(-+++)$ 計量では **$W^2=-(P+q)^2$** である点に注意します。

<!-- proof-start -->
### 証明

質量殻を使うと $q^2=(k-k')^2=-2k\cdot k'=2EE'(1-\cos\theta)$ です。静止標的では $P\cdot q=-M(E-E')$、$P\cdot k=-ME$ なので $y=(E-E')/E$ です。次に

$$
\begin{aligned}
W^2&=-(P+q)^2=-P^2-2P\cdot q-q^2\\
&=M^2+2M\nu-Q^2
=M^2+Q^2\left(\frac1{x_B}-1\right).
\end{aligned}
$$

また $s=-(P+k)^2=M^2-2P\cdot k=M^2+2ME$。$-2P\cdot q=y(-2P\cdot k)=y(s-M^2)$ を $Q^2=x_B(-2P\cdot q)$ に代入します。最後に $W^2-M^2=Q^2(1/x_B-1)\ge0$、$Q^2>0$ から $x_B\le1$ が従います。任意の多粒子状態で $W^2\ge M^2$ を主張したのではなく、陽子を標的とする保存量・終状態の物理的閾値を仮定した結論です。
<!-- proof-end -->

**Bjorken極限**とは $Q^2,\nu\to\infty$ に際して $x_B=Q^2/(2M\nu)$ を固定する操作です。標的質量補正は典型的に $M^2/Q^2$ で抑制されます。しかし $x_B\to1$ の閾値領域や非常に小さい $x_B$ では新しい大きな対数や別のスケールが現れ、「$Q$ が大きい」だけで一様な近似精度を保証しません。

## 2. 陽子の応答を二つの関数として測る

最終状態 $X$ を一つずつ計算する代わりに、電磁電流 $J^\mu=\sum_f e_f\bar\psi_f\gamma^\mu\psi_f$ の全状態和を取ります。$e_f$ は陽子電荷を単位とするクォークの電荷（$u:2/3$、$d:-1/3$ など）です。非偏極標的について、各終状態の電流行列要素の積を、運動量保存 $P_X=P+q$ の下で足し合わせた対称なハドロンテンソル $W^{\mu\nu}$ を用います。[QFT17の保存電流](../QFT17/index.md#thm-qft17-eom-current)を各行列要素へ適用すると $q_\mu W^{\mu\nu}=0$ です。Lorentz対称性により、この非偏極・パリティ偶の二階テンソルを作る四元ベクトルは $P,q$ だけです。

四元運動量 $P$ から光子方向の成分を取り除いた $\widetilde P^\mu=P^\mu-(P\cdot q/Q^2)q^\mu$ と、光子に直交する射影テンソル $G^{\mu\nu}=\eta^{\mu\nu}-q^\mu q^\nu/Q^2$ を作れば、$q\cdot\widetilde P=0$ と $q_\mu G^{\mu\nu}=0$ が直接成り立ちます。

なぜこの二つだけでよいのでしょうか。一般の対称・パリティ偶な二階テンソルは次の四つの構造の線形結合です。

$$
\eta^{\mu\nu},\qquad P^\mu P^\nu,\qquad
P^\mu q^\nu+q^\mu P^\nu,\qquad q^\mu q^\nu.
$$

混合添字の射影 $G^\mu{}_{\rho}=G^{\mu\alpha}\eta_{\alpha\rho}$ を両添字へ作用させると、

$$
G^\mu{}_{\rho}q^\rho=0,\qquad
G^\mu{}_{\rho}P^\rho=\widetilde P^\mu
$$

により、最初の二構造から $G^{\mu\nu}$ と $\widetilde P^\mu\widetilde P^\nu$ だけが残り、残り二構造は消えます。保存条件 $q_\mu W^{\mu\nu}=0$ の下では元の $W$ 自体が二重射影に等しいため、二構造で尽くされます。また $\widetilde P^2=-M^2-(P\cdot q)^2/Q^2<0$ なので、二構造は独立です。

<a id="def-qft43-structure-functions"></a>

<!-- formal-statement-start -->
> **定義（非偏極DISの構造関数）**  
> 四次元、非偏極・パリティ偶、保存された電磁ベクトル電流の一光子交換において、ハドロンテンソルの対称部分を、上記の $G^{\mu\nu}$ と $\widetilde P^\mu$ により

$$
W^{\mu\nu}_{\rm sym}
=G^{\mu\nu}F_1(x_B,Q^2)
+\frac{\widetilde P^\mu\widetilde P^\nu}{M\nu}F_2(x_B,Q^2)
$$

> と分解する。この規格化で無次元関数 $F_1,F_2$ を構造関数と定義する。$\nu=-P\cdot q/M>0$ とする。$Q^2\gg M^2$ では縦方向構造関数を $F_L=F_2-2x_BF_1$ と置く。有限 $M$ での正確な慣用的縦応答は $(1+4M^2x_B^2/Q^2)F_2-2x_BF_1$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft43-structure-functions -->
### 例：電流保存を分解の両項で検査する

**定義の確認**：$q_\mu G^{\mu\nu}=q^\nu-q^2q^\nu/Q^2=0$ です。また $q_\mu\widetilde P^\mu=P\cdot q-(P\cdot q)q^2/Q^2=0$。したがって任意の有限な $F_1,F_2$ に対し $q_\mu W^{\mu\nu}_{\rm sym}=0$ であり、保存電流の必要条件を実際に確認しました。二つの係数は一般には独立です。次のスピン $1/2$ 模型で初めて両者の関係を導きます。
<!-- definition-example-end -->

散乱で測れるのは、[QFT12の入射流束とLorentz不変位相空間](../QFT12/index.md#def-qft12-rate-cross-section)を使って電子テンソル $L_{\mu\nu}$ と $W^{\mu\nu}$ を縮約した量です。零質量電子では

$$
L_{\mu\nu}=2\bigl(k_\mu k'_\nu+k_\nu k'_\mu-\eta_{\mu\nu}k\cdot k'\bigr),
\quad q_\mu L^{\mu\nu}=0.
$$

例えば $q_\mu L^{\mu\nu}=0$ なので $L$ との縮約では $\widetilde P$ を $P$ へ置き換えられ、次の二式を得ます。

$$
L_{\mu\nu}G^{\mu\nu}=2Q^2,\qquad
L_{\mu\nu}\widetilde P^\mu\widetilde P^\nu
=4(P\cdot k)(P\cdot k')-2P^2(k\cdot k').
$$

これと位相空間・流束の規格化を合わせると、$Q^2\gg M^2$ での電磁一光子交換断面積は

$$
\frac{d^2\sigma}{dx_B\,dQ^2}
=\frac{2\pi\alpha^2}{x_BQ^4}
\left(\bigl[1+(1-y)^2\bigr]F_2-y^2F_L\right).
$$

この式は先頭べきのもので、相対的に $M^2/Q^2$ で抑制される標的質量項や、荷電・中性弱電流を含む測定では対応する補正を別に含めます。$F_L=0$ は仮定でも定義でもなく、次に導くスピンと近似に依存する予測です。

## 3. 硬い光子が見る運動量割合

陽子の運動量 $P$ のうち割合 $\xi$ を持つほぼ平行な質量零クォークを $p\simeq\xi P$ と書きます。これは陽子が複合粒子であるための**先頭べき近似**です。$p^2=0$ と $P^2=-M^2$ を同時に厳密等式 $p=\xi P$ へ代入してはいけません。差は標的質量や内部横運動量による補正として管理します。

<a id="prop-qft43-shell-fraction"></a>

<!-- formal-statement-start -->
> **命題（自由パートン質量殻とBjorken変数）**  
> Bjorken極限で、入射・出射パートンを質量零、横運動量・束縛効果を $Q$ に比べて無視できるとし、入射パートンを $p\simeq\xi P$、$0<\xi\le1$ と近似する。一光子吸収 $p+q$ の質量殻条件 $(p+q)^2=0$ は、先頭べきで

$$
\xi=x_B+O\left(\frac{M^2}{Q^2},\frac{\Lambda_{\rm had}^2}{Q^2}\right)
$$

> を与える。$\Lambda_{\rm had}$ は内部横運動量・束縛の代表尺度であり、誤差表示は $x_B$ を端点から離して固定したときのべき計数を表す。
<!-- formal-statement-end -->

### 証明の見取り図

光子を吸収する前後の質量殻を比較すれば、入射パートンと光子の内積が決まります。標的の四元運動量を用いて書き直します。

<!-- proof-start -->
### 証明

$(p+q)^2=p^2+2p\cdot q+q^2=0$、$p^2=0$ より $2p\cdot q=-Q^2$。先頭べきで $p\cdot q=\xi P\cdot q+$ べき抑制項となるから

$$
-2\xi P\cdot q=Q^2+\text{べき抑制項},\qquad
\xi=\frac{Q^2}{-2P\cdot q}+\text{べき抑制項}=x_B+\text{べき抑制項}.
$$

厳密に $p=\xi P$ とすると $p^2=-\xi^2M^2\ne0$ であるため、その等号を中間の厳密な質量殻条件へ代入していません。内部横運動量が硬い尺度に達するイベントや端点極限では別の展開が必要です。
<!-- proof-end -->

## 4. スピン $1/2$ の証拠を電磁応答から読む

パートンが光子を吸収する最小の模型は、[QFT17のDirac電磁頂点](../QFT17/index.md#def-qft17-vertex)を自由クォークに適用するものです。$\gamma^\mu$ を $\{\gamma^\mu,\gamma^\nu\}=-2\eta^{\mu\nu}$ を満たす四次元Dirac行列とし、$\Gamma(p)=p_\mu\gamma^\mu$ と書きます。スピン平均後のクォークテンソルは、共通の状態密度と質量殻delta因子を除けば

$$
T^{\mu\nu}(p,q)
=\frac12\operatorname{tr}\bigl[\Gamma(p)\gamma^\mu\Gamma(p+q)\gamma^\nu\bigr].
$$

<a id="prop-qft43-callan-gross"></a>

<!-- formal-statement-start -->
> **命題（自由DiracパートンのCallan–Gross関係）**  
> 四次元、零質量・非偏極の自由Diracパートンへの木レベル一光子吸収を考える。$p^2=(p+q)^2=0$、$q^2=Q^2>0$ とし、標的質量・内部横運動量・強結合補正を先頭べきで無視する。上の構造関数規約で、パートンの木レベル寄与は

$$
F_2(x_B,Q^2)=2x_BF_1(x_B,Q^2),
\qquad F_L=0
$$

> を満たす。この関係は一般の強結合QCDでの厳密恒等式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

四つのDirac行列の跡を展開し、$p\cdot q=-Q^2/2$ を使って光子に直交する二つのテンソルへ分けます。二つの係数の比を構造関数の定義と比べれば、共通のパートン密度・delta関数は消えます。

<!-- proof-start -->
### 証明

Clifford関係と $\operatorname{tr}(\gamma^\alpha\gamma^\beta\gamma^\gamma\gamma^\delta)$ の縮約により

$$
T^{\mu\nu}
=2\left[p^\mu(p+q)^\nu+p^\nu(p+q)^\mu
-\eta^{\mu\nu}p\cdot(p+q)\right].
$$

質量殻から $2p\cdot q=-Q^2$ です。$\widetilde p^\mu=p^\mu-(p\cdot q/Q^2)q^\mu=p^\mu+q^\mu/2$ を使い、一項ずつ展開すると

$$
\begin{aligned}
T^{\mu\nu}
&=4p^\mu p^\nu+2(p^\mu q^\nu+p^\nu q^\mu)+Q^2\eta^{\mu\nu}\\
&=Q^2G^{\mu\nu}+4\widetilde p^\mu\widetilde p^\nu.
\end{aligned}
$$

この書き方では $q_\mu T^{\mu\nu}=0$ も見えます。先頭べきで $p\simeq\xi P$、$\widetilde p\simeq\xi\widetilde P$ です。[構造関数の定義](#def-qft43-structure-functions)の二係数を比べると、共通の非負状態密度を $D$ として $F_1=DQ^2$、$F_2=D(4\xi^2M\nu)$。よって

$$
\frac{F_2}{F_1}
=\frac{4\xi^2M\nu}{Q^2}
=\frac{2\xi^2}{x_B}
\xrightarrow{\,\xi=x_B\,}2x_B.
$$

木レベル吸収のdelta関数が先頭べきで $\xi=x_B$ を選ぶことには[前節の質量殻命題](#prop-qft43-shell-fraction)を用いました。有限質量、放射補正、質量を持つパートンではこの結論は修正されます。
<!-- proof-end -->

**スピンの反証例**：荷電スカラーなら光子との頂点は $(2p+q)^\mu=2\widetilde p^\mu$ です。木レベルの応答は $\widetilde p^\mu\widetilde p^\nu$ 方向だけを持ち、上の $G^{\mu\nu}$ 成分がありません。つまりこの近似の $F_1=0$ で、非零 $F_2$ に対するCallan–Gross関係は成立しません。これは構造関数の比がパートンのスピンに敏感な理由です。

## 5. パートン分布をどこまで「確率」と考えられるか

自由パートンが担う運動量割合 $\xi$ を、一つの決まった値から分布へ広げます。**パートン分布関数（Parton Distribution Function; PDF）**は、硬い散乱へ入力する陽子側の長距離情報です。leading-orderの直観では、$q_f(\xi,\mu)$ は尺度 $\mu$ でフレーバー $f$ のクォークが運動量割合 $\xi$ を持つ密度、$\bar q_f$ は反クォーク、$g$ はグルーオンに対応します。

ここで**因子化尺度** $\mu$ は硬い係数と陽子側の分布へ寄与を分ける境目、**因子化方式**は有限な寄与を両者のどちらへ割り当てるかの規則です。また**ツイスト**は局所演算子の次元とスピンの差で、**先頭ツイスト**は固定した $0<x_B<1$ で $Q$ を大きくしたときに支配的な寄与を指します。非可換ゲージ理論でのPDFの定義では、クォークなら異なる点のクォーク場を、グルーオンなら場の強さを、光の進む向きに沿う開いたWilson線で結び、双局所演算子をくりこみます。この光的Wilson線は[QFT42の格子閉路](../QFT42/index.md#def-qft42-wilson-loop)と異なり、両端を持つ経路に沿った平行移動です。

<a id="def-qft43-pdf"></a>

<!-- formal-statement-start -->
> **定義（先頭ツイストのパートン分布）**  
> 因子化方式と尺度 $\mu>0$ を指定した非偏極陽子に対し、$0<\xi<1$ 上のクォーク・反クォーク・グルーオン分布を次の記号で表す。

$$
q_f(\xi,\mu),\qquad \bar q_f(\xi,\mu),\qquad g(\xi,\mu).
$$

> これらは光的方向に分離したゲージ不変な双局所場の行列要素をFourier変換し、指定方式でくりこんだ無次元密度である。形式的な粒子数密度として用いるのは先頭次数・適切な方式での直観であり、一般の高次方式で点ごとの非負性を仮定しない。クォークの価数分布を次で表す。

$$
q_{f,v}(\xi,\mu)=q_f(\xi,\mu)-\bar q_f(\xi,\mu).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft43-pdf -->
### 例：陽子の価数を直接積分する

**定義の確認**：まずクォークPDFの双局所演算子がゲージ不変であることを確かめます。光的な方向 $n$（$n^2=0$）に離れた二点 $0,\lambda n$ を、基本表示のWilson線 $U[0,\lambda n]$ で結ぶと、双局所演算子は $\bar\psi(0)\Gamma U[0,\lambda n]\psi(\lambda n)$ の形です。$\Gamma$ は例えば $n_\mu\gamma^\mu$ のようなDirac行列で、色変換には作用しません。[QFT42のリンクの端点変換則](../QFT42/index.md#prop-qft42-wilson-invariant)を開いた経路へ適用すると、局所ゲージ変換 $V$ に対して

$$
\begin{aligned}
\psi(\lambda n)&\longmapsto V(\lambda n)\psi(\lambda n),\\
U[0,\lambda n]&\longmapsto V(0)U[0,\lambda n]V(\lambda n)^\dagger,\\
\bar\psi(0)&\longmapsto\bar\psi(0)V(0)^\dagger
\end{aligned}
$$

となり、両端の $V$ が相殺します。これが**異なる点の場をそのまま掛けるだけでは足りず、Wilson線が必要な理由**です。相互作用を切った自由クォーク標的なら $U=I$ で、二点間の平面波位相 $e^{-i\lambda p\cdot n}$ を $\lambda$ でFourier変換するため、木レベルPDFは端点分布 $\delta(1-\xi)$ となります。自由極限では非自明なくりこみは不要ですが、相互作用のある陽子のPDFはこの検査だけでは構成できません。

続いて価数と運動量の和則を確認します。陽子の密度を表すtoy model として $u_v(\xi)=4(1-\xi)$、$d_v(\xi)=2(1-\xi)$、$\bar u=\bar d=0$、その他の分布を零と置きます。これはWilson線付き演算子から導出したPDFではなく、和則を検査する仮の先頭次数分布です。$0<\xi<1$ で両密度は非負です。また、価数の積分は

$$
\int_0^1u_v(\xi)\,d\xi=4\left(1-\frac12\right)=2,\qquad
\int_0^1d_v(\xi)\,d\xi=2\left(1-\frac12\right)=1.
$$

さらに運動量分率は $\int_0^1\xi(u_v+d_v)\,d\xi=6(1/2-1/3)=1$ なので、この特別な模型では陽子の縦方向運動量を価数クォークだけに割り当てても整合します。実際の陽子でグルーオン・海クォークが零だという主張ではありません。
<!-- definition-example-end -->

物理的な価数和則 $\int_0^1(u-\bar u)d\xi=2$、$\int_0^1(d-\bar d)d\xi=1$ は保存されたフレーバー量子数に対応します。全パートンを含めた運動量和則は $\int_0^1d\xi\,\xi[\sum_f(q_f+\bar q_f)+g]=1$ です。価数和則と運動量和則は別の条件であり、クォークの粒子数和とクォークが運ぶ運動量を取り違えません。

<a id="prop-qft43-lo-structure"></a>

<!-- formal-statement-start -->
> **命題（単純パートン模型の構造関数）**  
> $Q^2$ がハドロン内部尺度と $M^2$ より十分大きく、$0<x_B<1$ を固定し、非偏極・質量零・相互作用しないスピン $1/2$ パートンの非干渉和を一光子交換の木レベルで用いる。フレーバー $f$ の電荷を $e_f$ とすると

$$
F_2(x_B)=x_B\sum_f e_f^2\bigl[q_f(x_B)+\bar q_f(x_B)\bigr],
\qquad
F_1(x_B)=\frac12\sum_f e_f^2\bigl[q_f(x_B)+\bar q_f(x_B)\bigr].
$$

> 右辺の分布を一定の低次近似で扱うため、ここではBjorken scaling（固定 $x_B$ での $Q^2$ 非依存）が現れる。放射・くりこみを含むQCDの厳密なスケーリングではない。
<!-- formal-statement-end -->

### 証明の見取り図

一つのパートンが光子を吸収するときの質量殻で $\xi=x_B$ が選ばれます。異なるフレーバー・クォークと反クォークの電磁確率を、電荷の二乗で重み付けして足します。

<!-- proof-start -->
### 証明

密度 $f(\xi)=q_f(\xi)+\bar q_f(\xi)$ を持つフレーバーについて、[QFT12の一粒子流束規格化](../QFT12/index.md#thm-qft12-rate-formulas)を用いた単純パートン模型の木レベル応答を、前節のDiracテンソル $T^{\mu\nu}$ で書くと

$$
W_f^{\mu\nu}
=e_f^2\int_{x_B}^1\frac{d\xi}{\xi}\,f(\xi)
\delta\left(1-\frac{x_B}{\xi}\right)
\frac{T^{\mu\nu}(p,q)}{2Q^2},\qquad p\simeq\xi P
$$

となります。$1/(2Q^2)$ はこのテンソル $T$ と構造関数の電磁電流・流束規格化を合わせる共通係数です。質量殻deltaは $\xi=x_B$ を選び、$h(\xi)=1-x_B/\xi$ について $h'(x_B)=1/x_B$ なので $\delta(h(\xi))=x_B\delta(\xi-x_B)$ です。従って畳み込み測度の $1/\xi$ とJacobian $x_B$ が相殺し、$f(x_B)$ が残ります。[前節のDiracトレース](#prop-qft43-callan-gross)の $T=Q^2G+4\widetilde p\widetilde p$ を代入して

$$
W_f^{\mu\nu}=e_f^2f(x_B)
\left(\frac12G^{\mu\nu}
+\frac{2x_B^2}{Q^2}\widetilde P^\mu\widetilde P^\nu\right).
$$

[構造関数の定義](#def-qft43-structure-functions)へ係数を照合すると $F_1^{(f)}=e_f^2f(x_B)/2$、$F_2^{(f)}=e_f^2f(x_B)(2x_B^2M\nu/Q^2)=x_Be_f^2f(x_B)$。干渉を無視するこの模型では各 $f$ を足して結論です。
<!-- proof-end -->

例えば[価数分布の具体例](#def-qft43-pdf)なら $e_u^2=4/9$、$e_d^2=1/9$ から $F_2=x[(4/9)4(1-x)+(1/9)2(1-x)]=2x(1-x)$、$F_1=1-x$。この模型では $x=1/2$ で $F_2=1/2$、$F_1=1/2$ となり、$F_2=2xF_1$ を直接確認できます。

## 6. 短距離係数と長距離PDFを分ける

実際にはクォークが硬い光子を吸収する前後にグルーオンを放射します。特に入射陽子中のパートンとほぼ平行な放射（初期状態の共線放射）の寄与は、硬い断面積へそのまま足すとPDFに割り当てる長距離部分を重複して数えてしまいます。**因子化**ではこれをPDF側へ吸収し、短距離だけを係数関数に残します。この手順は運動量を持つパートンの割合が次々と分裂するので、通常の積ではなく畳み込みになります。

<a id="def-qft43-convolution"></a>

<!-- formal-statement-start -->
> **定義（パートンのMellin型畳み込み）**  
> $0<x<1$ とし、積分が定義される係数分布 $C(z)$ とPDF $f(\xi)$ に対し

$$
(C\otimes f)(x)=\int_x^1\frac{d\xi}{\xi}\,C\left(\frac{x}{\xi}\right)f(\xi)
$$

> と定義する。$\xi$ は陽子に対する入射パートン割合、$z=x/\xi\in(0,1]$ は硬い反応へ入る割合である。端点のdelta関数やplus分布は通常の関数と区別して分布として積分する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft43-convolution -->
### 例：測る割合と親パートン割合を区別する

**定義の確認**：$C(z)=z$、$f(\xi)=2\xi$（$0<\xi<1$）なら、$0<x<1$ で

$$
(C\otimes f)(x)=\int_x^1\frac{d\xi}{\xi}\frac{x}{\xi}(2\xi)
=2x\int_x^1\frac{d\xi}{\xi}=-2x\log x.
$$

積分の下端 $\xi=x$ は $z\le1$ に由来します。$x=1/2$ で結果は $\log2$、積分区間が空になる $x\uparrow1$ では零へ近づきます。普通の積 $C(x)f(x)=2x^2$ とは異なります。
<!-- definition-example-end -->

<a id="lem-qft43-delta-convolution"></a>

<!-- formal-statement-start -->
> **補題（木レベル係数の畳み込み）**  
> $f$ が $0<x<1$ で連続で、$C^{(0)}(z)=\delta(1-z)$ とする。このとき

$$
(C^{(0)}\otimes f)(x)=f(x).
$$
<!-- formal-statement-end -->

### 証明の見取り図

$z=x/\xi$ のdelta関数のJacobianを取ります。$\delta(1-\xi)$ と取り違えると余分な $x$ が出ます。

<!-- proof-start -->
### 証明

$h(\xi)=1-x/\xi$ は $\xi=x$ に単純な零点を持ち、$h'(x)=1/x$。したがって $\delta(h(\xi))=x\delta(\xi-x)$ であり、$\int_x^1d\xi\,\xi^{-1}x\delta(\xi-x)f(\xi)=f(x)$。端点での分布は通常の因子化処方で理解し、$x$ 自体は開区間内部に固定しています。
<!-- proof-end -->

<a id="def-qft43-factorization"></a>

<!-- formal-statement-start -->
> **定義（DISの先頭べき因子化表示）**  
> 十分大きい $Q^2$、固定した $0<x_B<1$、包摂的な非偏極電磁DISを考え、因子化尺度 $\mu$ と方式を指定する。短距離の係数関数 $C_{2,q}$、$C_{2,g}$ と、同じ方式・尺度のPDFにより、先頭ツイストの構造関数を

$$
\frac{F_2(x_B,Q^2)}{x_B}
=\sum_f e_f^2\left[
C_{2,q}\otimes(q_f+\bar q_f)
+C_{2,g}\otimes g\right](x_B)
+O\left(\frac{M^2+\Lambda_{\rm had}^2}{Q^2}\right)
$$

> と表す。ここで $C_{2,q}(z)=\delta(1-z)+O(\alpha_s)$、$C_{2,g}(z)=O(\alpha_s)$。これはQCDの**因子化を適用できる**過程・運動学で用いる表示であり、任意の観測量に無条件で成立するという定理ではない。$\mu$・方式依存は係数とPDFを合わせた物理量で相殺される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft43-factorization -->
### 例：木レベル極限とグルーオンの開始次数

**定義の確認**：$\alpha_s\to0$ の係数を代入すると $C_{2,q}=\delta(1-z)$、$C_{2,g}=0$。よって[畳み込み補題](#lem-qft43-delta-convolution)により $F_2/x_B=\sum_fe_f^2(q_f+\bar q_f)$ となり、[木レベルの構造関数](#prop-qft43-lo-structure)に一致します。光子は電荷を持たないグルーオンに木レベルで直接結合しないため、グルーオン係数の最初の項は $O(\alpha_s)$ です。初項・規格化・同一尺度という定義上の条件を確認しました。
<!-- definition-example-end -->

**成立の条件を取り違えない**：ここでの「因子化」は、有限の硬さを持つ断面積の一般的な数学的恒等式ではありません。大きな $Q$ で赤外安全な包摂量を選び、共線領域を適切なWilson線付きPDFにまとめ、硬い部分の赤外特異性が相殺されるというQCDの性質に依存します。端点 $x_B\to1$ には閾値対数、小さい $x_B$ には $\log(1/x_B)$、低い $Q$ には高ツイスト・質量補正、標的の種類や偏極には別のPDFが必要です。非摂動的なPDFの形はこの式だけから導けず、実験・格子計算・模型などの入力を要します。

## 7. 分離尺度が動いても予測が変わらない条件

「PDFは陽子の固定した絵」という説明にも限界があります。長距離と短距離の境目 $\mu$ を変更すると、クォークがグルーオンを放射して観測割合を変える確率の割り当ても変わります。ここで $\mu^2$ に関する対数微分を取り、どちらへ移すかを見ます。

実放射の $q\to qg$ には $0<z<1$ で $C_F(1+z^2)/(1-z)$ という核が現れます。ただし $z\to1$ で発散するため、仮想補正を含めた端点の処方が必要です。分布 $[1/(1-z)]_+$ は、滑らかな試験関数 $\varphi$ について $\int_0^1 dz\,[1/(1-z)]_+\varphi(z)=\int_0^1dz\,[\varphi(z)-\varphi(1)]/(1-z)$ により作用を定めます。

<a id="prop-qft43-quark-number"></a>

<!-- formal-statement-start -->
> **命題（最低次の非一重項クォーク数保存）**  
> [QFT41の基本表示二次Casimir](../QFT41/index.md#def-qft41-color-invariants) $C_F=4/3$ とし、通常のplus処方を用いる最低次分裂核を

$$
P_{qq}^{(0)}(z)=C_F\left[
(1+z^2)\left(\frac1{1-z}\right)_+
+\frac32\delta(1-z)\right]
$$

> とする。このとき核の全積分は零になる。

$$
\int_0^1P_{qq}^{(0)}(z)\,dz=0.
$$

> 分布端点の操作が許され、$q_v$ が積分可能で、非一重項の最低次DGLAP式

$$
\frac{\partial q_v}{\partial\log\mu^2}
=\frac{\alpha_s}{2\pi}P_{qq}^{(0)}\otimes q_v
$$

> を満たすとき、価数 $\int_0^1q_v(x,\mu)dx$ はこの次数で尺度に依らない。
<!-- formal-statement-end -->

### 証明の見取り図

実放射の発散核を、そのまま通常積分することはできません。plus分布に試験関数 $1+z^2$ を代入し、仮想項の $3/2$ と相殺させます。畳み込みの $x$ 積分を入れ替えます。

<!-- proof-start -->
### 証明

plus分布の定義で $\varphi(z)=1+z^2$ とすると

$$
\int_0^1dz\,(1+z^2)\left(\frac1{1-z}\right)_+
=\int_0^1\frac{1+z^2-2}{1-z}dz
=-\int_0^1(1+z)dz=-\frac32.
$$

したがってdelta項との和は零です。次に $\xi$ と $x$ の積分を適切に交換し、$z=x/\xi$ を置けば

$$
\begin{aligned}
\int_0^1dx\,(P\otimes q_v)(x)
&=\int_0^1d\xi\,\frac{q_v(\xi)}{\xi}
\int_0^\xi dx\,P(x/\xi)\\
&=\int_0^1d\xi\,q_v(\xi)\int_0^1dz\,P(z)=0.
\end{aligned}
$$

微分方程式の両辺を $x$ 積分すると $d\int q_v/d\log\mu^2=0$。この議論はクォーク数の非一重項であり、各クォーク・グルーオンの運動量分率が別々に保存されるという主張ではありません。
<!-- proof-end -->

<a id="prop-qft43-scale-cancel"></a>

<!-- formal-statement-start -->
> **命題（一次精度の因子化尺度相殺）**  
> 単一のクォークチャネルで、$t=\log\mu^2$、$a=\alpha_s/(2\pi)$ と置く。ある固定された赤外安全な包摂量について $\partial_tq=aP\otimes q+O(a^2)$、$C=\delta(1-z)+aC^{(1)}(z,t)+O(a^2)$、$\partial_tC=-aP+O(a^2)$ を同じ方式で満たすとする。$\partial_ta=O(a^2)$ なら

$$
\frac{\partial}{\partial t}(C\otimes q)=O(a^2).
$$

> この等式は因子化が成り立った後の**尺度整合性**であり、それ自体は全次数の因子化を証明しない。
<!-- formal-statement-end -->

### 証明の見取り図

積の微分則に対応する二つの項を畳み込みで書き、係数側の $-P$ とPDF側の $+P$ を一次で打ち消します。

<!-- proof-start -->
### 証明

積分が定義される領域で分布の畳み込みは結合的で、単位元は $\delta(1-z)$ です。従って

$$
\begin{aligned}
\partial_t(C\otimes q)
&=(\partial_tC)\otimes q+C\otimes(\partial_tq)\\
&=(-aP)\otimes q+\delta(1-z)\otimes(aP\otimes q)+O(a^2)\\
&=-aP\otimes q+aP\otimes q+O(a^2)=O(a^2).
\end{aligned}
$$

$a$ の微分は仮定から $O(a^2)$ であり、この精度では追加項を生みません。多フレーバーQCDでは $P$ はクォーク・グルーオンの混合を表す行列、単一の観測量に対する $C$ は各パートン成分に掛かる行ベクトルになります。積の順序を保った行列・ベクトルの畳み込みで、同じ相殺機構が働きます。
<!-- proof-end -->

この結果は[QFT25のRGによる尺度整理](../QFT25/index.md#def-qft25-rg-equation)の具体例です。一方で $Q\sim\Lambda_{\rm QCD}$ になれば係数の摂動計算自体が制御できません。$\mu$ を選び直すだけでは強結合問題を消去できないのです。

## 8. 演習：観測量と模型の仮定を自分で切り分ける

### 演習 QFT43-A1：電子の運動学から $x_B$ を求める

- Level: A
- 目安時間: 8分

$(-+++)$、質量零電子、静止標的 $M=1$、入射 $E=10$、散乱後 $E'=5$、$\cos\theta=0.95$ とする。$Q^2,\nu,x_B,y,W^2$ を順に求めよ。

<!-- solution-start -->
### 詳細解答

$Q^2=-2k\cdot k'=2EE'(1-\cos\theta)=100(0.05)=5$、$\nu=E-E'=5$。$x_B=Q^2/(2M\nu)=5/10=1/2$、$y=\nu/E=1/2$。$W^2=M^2+2M\nu-Q^2=1+10-5=6$。すべて $Q^2>0$、$0<x_B<1$、$0<y<1$、$W^2>M^2$ を満たす。
<!-- solution-end -->

### 演習 QFT43-A2：異なる不変量で同じ質量を確認する

- Level: A
- 目安時間: 7分

質量零電子、標的質量 $M=1$、入射電子エネルギー $E=10$ で、$x_B=2/5$、$y=1/2$ とする。$s,Q^2,W^2$ を求め、$W^2=M^2+2M\nu-Q^2$ からの計算と照合せよ。

<!-- solution-start -->
### 詳細解答

$s=M^2+2ME=1+20=21$。$Q^2=x_By(s-M^2)=(2/5)(1/2)20=4$。$W^2=M^2+Q^2(1/x_B-1)=1+4(5/2-1)=7$。$\nu=yE=5$ からも $1+2(1)(5)-4=7$。両経路は一致する。
<!-- solution-end -->

### 演習 QFT43-A3：横射影の条件

- Level: A
- 目安時間: 7分

$q^2=Q^2>0$、$\widetilde P^\mu=P^\mu-(P\cdot q/Q^2)q^\mu$、$G^{\mu\nu}=\eta^{\mu\nu}-q^\mu q^\nu/Q^2$ とする。$q\cdot\widetilde P=0$ と $G^{\mu\nu}q_\nu=0$ をそれぞれ示せ。

<!-- solution-start -->
### 詳細解答

$q\cdot\widetilde P=P\cdot q-(P\cdot q/Q^2)q^2=P\cdot q-P\cdot q=0$。また $G^{\mu\nu}q_\nu=q^\mu-q^\mu(q^\nu q_\nu)/Q^2=q^\mu-q^\mu=0$。二つの構造は別々に横的である。
<!-- solution-end -->

### 演習 QFT43-A4：価数模型と構造関数

- Level: A
- 目安時間: 9分

$0<x<1$ に $u_v(x)=4(1-x)$、$d_v(x)=2(1-x)$ を置き、海クォーク・グルーオンは零とする。電荷 $e_u=2/3,e_d=-1/3$、木レベル式 $F_2=x\sum_fe_f^2(q_f+\bar q_f)$ とする。価数積分と $F_2(1/2)$ を求めよ。

<!-- solution-start -->
### 詳細解答

$\int_0^14(1-x)dx=4[x-x^2/2]_0^1=2$、$\int_0^12(1-x)dx=1$。$F_2(x)=x[(4/9)4(1-x)+(1/9)2(1-x)]=2x(1-x)$。したがって $F_2(1/2)=2(1/2)(1/2)=1/2$。価数和と電荷二乗重みは異なる。
<!-- solution-end -->

### 演習 QFT43-A5：畳み込みと普通の積の違い

- Level: A
- 目安時間: 8分

$C(z)=z$、$f(\xi)=2\xi$（両者は $0<z,\xi<1$）とする。$(C\otimes f)(x)$ を求め、$x=1/2$ で $C(x)f(x)$ と比較せよ。

<!-- solution-start -->
### 詳細解答

定義から $\int_x^1(d\xi/\xi)(x/\xi)(2\xi)=2x\int_x^1d\xi/\xi=-2x\log x$。$x=1/2$ で $\log2$ だが、普通の積は $(1/2)\cdot1=1/2$。親パートンの割合 $\xi$ を積分している点が違いの原因である。
<!-- solution-end -->

### 演習 QFT43-B1：木レベルのCallan–Gross比を再導出

- Level: B
- 目安時間: 14分

質量零Diracパートンの $p^2=(p+q)^2=0$、$q^2=Q^2>0$、$T^{\mu\nu}=2[p^\mu(p+q)^\nu+p^\nu(p+q)^\mu-\eta^{\mu\nu}p\cdot(p+q)]$ を仮定する。$\widetilde p=p+q/2$ によって $T^{\mu\nu}$ を $G^{\mu\nu}$ と $\widetilde p^\mu\widetilde p^\nu$ に分け、$p\simeq x_BP$ で $F_2/F_1$ を求めよ。

<!-- solution-start -->
### 詳細解答

$(p+q)^2-p^2=2p\cdot q+Q^2=0$ より $p\cdot q=-Q^2/2$。従って $T=4pp+2(pq+qp)+Q^2\eta$。一方、$4\widetilde p\widetilde p=4pp+2(pq+qp)+qq$ であるから $T=Q^2(\eta-qq/Q^2)+4\widetilde p\widetilde p=Q^2G+4\widetilde p\widetilde p$。$\widetilde p\simeq x_B\widetilde P$、共通係数を $D$ とすると $F_1=DQ^2$、$F_2=D4x_B^2M\nu$。$2M\nu=Q^2/x_B$ から $F_2/F_1=4x_B^2M\nu/Q^2=2x_B$。比で共通係数は消える。
<!-- solution-end -->

### 演習 QFT43-B2：スカラー・パートンで反証する

- Level: B
- 目安時間: 11分

電荷を持つ質量零スカラーの電磁頂点が $(2p+q)^\mu$ であり、$p^2=(p+q)^2=0$ とする。包摂テンソルの木レベル寄与が $(2p+q)^\mu(2p+q)^\nu$ に比例するとき、構造関数分解における $F_1$ を求めよ。Dirac模型との差の原因を説明せよ。

<!-- solution-start -->
### 詳細解答

$2p\cdot q=-Q^2$ なので $\widetilde p=p+q/2$ は $q$ に直交する。頂点は $2p+q=2\widetilde p$、積は $4\widetilde p^\mu\widetilde p^\nu$ である。独立な $G^{\mu\nu}$ 成分がなく $F_1=0$。$F_2$ は状態密度が非零なら非零になり得る。Diracの四つのgamma行列の跡から生じる $Q^2G^{\mu\nu}$ がスカラーにはないので、同じCallan–Gross関係は成立しない。
<!-- solution-end -->

### 演習 QFT43-B3：plus処方と価数保存

- Level: B
- 目安時間: 14分

$\int_0^1dz\,[1/(1-z)]_+\varphi(z)=\int_0^1dz[\varphi(z)-\varphi(1)]/(1-z)$、$P_{qq}^{(0)}=C_F[(1+z^2)[1/(1-z)]_++3\delta(1-z)/2]$ とする。$\int_0^1P_{qq}^{(0)}dz$ を計算し、$\partial_tq_v=aP_{qq}^{(0)}\otimes q_v$ で $\int q_v$ が保存される理由を示せ。

<!-- solution-start -->
### 詳細解答

試験関数に $\varphi(z)=1+z^2$ を取ると、積分は $\int_0^1(z^2-1)/(1-z)dz=-\int_0^1(z+1)dz=-3/2$。delta項の積分 $+3/2$ と相殺し、核の積分は零。積分可能性と分布の交換を仮定すれば $\int_0^1dx\int_x^1(d\xi/\xi)P(x/\xi)q_v(\xi)=\int_0^1d\xi\,q_v(\xi)\int_0^1dz\,P(z)=0$。従って $d\int q_v/dt=a\cdot0=0$。実放射核だけでは発散し、この結論に至らない。
<!-- solution-end -->

### 演習 QFT43-B4：因子化尺度の一次相殺

- Level: B
- 目安時間: 12分

$t=\log\mu^2$、$a=\alpha_s/(2\pi)$ とする。$\partial_tq=aP\otimes q+O(a^2)$、$\partial_tC=-aP+O(a^2)$、$C=\delta(1-z)+O(a)$、$\partial_ta=O(a^2)$ を仮定し、$\partial_t(C\otimes q)$ を一次まで求めよ。これだけでQCDの因子化が証明できるか。

<!-- solution-start -->
### 詳細解答

積の微分則で $(\partial_tC)\otimes q+C\otimes(\partial_tq)=(-aP)\otimes q+\delta(1-z)\otimes(aP\otimes q)+O(a^2)$。deltaは畳み込みの単位元なので二項は $-aP\otimes q+aP\otimes q=0$。結果は $O(a^2)$。これはすでに適用可能な因子化表示の尺度整合性であり、軟・共線領域の一般的分離や赤外安全性を証明したものではない。
<!-- solution-end -->

### 演習 QFT43-C1：測定からパートン模型、因子化の境界まで

- Level: C
- 目安時間: 25分

非偏極陽子 $M=1$ の静止系に質量零電子 $E=20$ を入射し、$E'=10$、$\cos\theta=0.975$ で散乱した。単純な価数模型 $u_v(x)=4(1-x)$、$d_v(x)=2(1-x)$、海とグルーオンは零とし、クォーク電荷は $2/3,-1/3$ とする。一光子交換・木レベル、$Q^2\gg M^2$ を仮定する。

1. $Q^2,\nu,x_B,y,W^2$ を計算して物理的な非弾性領域か判定せよ。
2. $F_1,F_2,F_L$ を木レベルで求め、Callan–Gross関係を検査せよ。
3. $C_q^{(0)}(z)=\delta(1-z)$、$C_g^{(0)}=0$ として因子化表示が (2) の $F_2$ に戻ることをdelta関数のJacobianから示せ。
4. $Q$ を内部ハドロンスケールへ近づけた場合、(2) のどの主張を厳密な予測として残せないか、原因を二つ挙げよ。

<!-- solution-start -->
### 詳細解答

1. $Q^2=2EE'(1-\cos\theta)=2(20)(10)(0.025)=10$、$\nu=E-E'=10$。$x_B=10/(2\cdot1\cdot10)=1/2$、$y=10/20=1/2$。$W^2=1+2(1)(10)-10=11>1$ なので非弾性領域です。$s=M^2+2ME=41$ から $xy(s-M^2)=(1/2)(1/2)40=10$ でも $Q^2$ を検算できます。
2. $q_u(1/2)=4(1/2)=2$、$q_d(1/2)=2(1/2)=1$。電荷重み和は $(4/9)2+(1/9)1=1$。よって $F_1=1/2$、$F_2=x_B\cdot1=1/2$、$F_L=F_2-2x_BF_1=1/2-2(1/2)(1/2)=0$。$F_2=2x_BF_1$ です。
3. 畳み込みには $\int_x^1(d\xi/\xi)\delta(1-x/\xi)q_f(\xi)$ が現れます。$h(\xi)=1-x/\xi$ の零点は $\xi=x$、$h'(x)=1/x$ なので $\delta(h(\xi))=x\delta(\xi-x)$。したがって積分は $q_f(x)$。$C_g^{(0)}=0$ と合わせて $F_2/x=\sum_fe_f^2q_f(x)=1$、つまり $F_2=1/2$ を再現します。
4. $Q$ が低ければ $\alpha_s(Q)$ が大きくなり、木レベルの係数と厳密スケーリングの近似精度が失われます。さらに $M^2/Q^2$、内部横運動量、束縛・高ツイストが無視できず $p\simeq x_BP$ と自由質量殻から導いた $F_L=0$ に補正が入ります。PDFの形は非摂動入力であり、因子化尺度の変更だけで強結合を解けません。$(Q^2=10,M=1)$ の今回の設定は数式の演習模型であって、特定の実測データを精度保証つきで説明したものではありません。
<!-- solution-end -->

## 9. まとめと次の問い

- 散乱電子から $Q^2,x_B,y,W^2$ を決められ、$(-+++)$ では $Q^2=q^2>0$、$W^2=-(P+q)^2$ とする。
- 電磁電流の保存により非偏極応答は $F_1,F_2$ に分解できる。自由零質量Diracパートンの木レベルでは $F_2=2x_BF_1$ が導かれ、スピン・放射・質量の仮定を外すと修正される。
- 先頭べき因子化では硬い係数と長距離PDFを畳み込み、尺度依存は計算次数の範囲で相殺する。PDFをすべての次数で古典的確率密度とみなすことはできない。
- 大きな $Q$ での包摂DISの計算と、任意の $x_B$・低 $Q$・任意の最終状態への一般化は別問題である。

次は有効場の理論で、重い自由度を積分消去して得る局所演算子の係数を、**matchingとrunningを区別して**計算します。
