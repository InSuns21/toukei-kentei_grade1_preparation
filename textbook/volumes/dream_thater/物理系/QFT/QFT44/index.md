# QFT44 有効場の理論のmatching・演算子展開・running

<!-- definition-example-audit: strict -->

[QFT26の重い場の積分消去](../QFT26/index.md#prop-qft26-heavy-matching)では、重い自由度を消すと局所的な四次相互作用と導関数項が残りました。[QFT25のくりこみ群](../QFT25/index.md#def-qft25-rg-equation)では、残された結合定数自体も尺度によって変わりました。しかし、この二つを別々に行うだけでは、**重い理論と軽い理論の係数をどこで合わせ、低エネルギーへ移した後に何を計算すればよいのか**が見えません。

ここでは一つの重いスカラー場を持つ模型を用い、四点散乱振幅を両方の理論で求めて係数を合わせる **matching（整合）** と、その係数を低尺度へ運ぶ **running（くりこみ群による尺度発展）** をつなぎます。さらに、局所演算子の次元だけから物理振幅の最初の補正次数を断定できない例を確かめます。

## 1. 何を固定し、何を近似するか

四次元の平坦時空で自然単位 $\hbar=c=1$、Lorentz計量 $\eta=\operatorname{diag}(-1,+1,+1,+1)$ を使います。$\phi$ は軽い実スカラー、$\chi$ は質量 $M>0$ の重い実スカラーです。軽い場の質量は本講義の木レベル散乱では $m=0$ とし、相互作用を

$$
\mathcal L_{\rm full}=-\frac12\partial_\mu\phi\partial^\mu\phi
-\frac12\partial_\mu\chi\partial^\mu\chi
-\frac12M^2\chi^2-\frac{\lambda}{4!}\phi^4
-\frac h2\chi\phi^2
$$

とします。$\lambda$ は無次元、$h$ の質量次元は1です。真空の古典ポテンシャルが下に有界になる十分条件として $\lambda>3h^2/M^2$ を仮定します。実際、定数場では

$$
\frac12M^2\chi^2+\frac h2\chi\phi^2+\frac\lambda{24}\phi^4
=\frac{M^2}{2}\left(\chi+\frac{h\phi^2}{2M^2}\right)^2
+\frac1{24}\left(\lambda-\frac{3h^2}{M^2}\right)\phi^4.
$$

一方で振幅の導出は、$|s|,|t|,|u|\ll M^2$、重い粒子を外線に作らない領域に限ります。最低次では $\lambda$ を一次、$h$ を二次まで採用し、ループ補正は後の running の節で明示的に扱います。この模型の重い $\chi$ は、**軽い場を固定すればGaussian** なので、必要な matching をまず出発点から検算できます。

以下の規則の根拠は[QFT10の頂点係数](../QFT10/index.md#thm-qft10-vertex-factor)と[QFT12のMandelstam不変量](../QFT12/index.md#def-qft12-mandelstam)です。四元運動量の二乗を $p^2=\eta_{\mu\nu}p^\mu p^\nu$ とし、質量零外線に $p_i^2=0$ を課します。

## 2. 二つの理論で同じ四点振幅を測る

低エネルギー理論では重い場を外線にも内部線にも残さず、軽い場 $\phi$ だけで振幅を再現したいのです。これには「同じ外部状態・同じ運動学・同じくりこみ条件で計算した量」を比較する必要があります。この係数の決定が matching です。

<a id="def-qft44-matching"></a>

<!-- formal-statement-start -->
> **定義（散乱振幅によるEFT matching）**  
> 重い質量 $M$ を含む full theory と、軽い場だけの有効場の理論（effective field theory, EFT）を考える。双方で同じ規格化の軽い外線を取り、指定した外部運動量の領域 $|p_i\cdot p_j|/M^2\le\rho<1$、摂動次数、くりこみ方式と尺度 $\mu$ において、物理的な振幅（または明示した非例外的なGreen関数）の低運動量展開を指定次数まで一致させるよう、EFTの局所演算子の係数を定める操作を matching と呼ぶ。その係数を **Wilson係数** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft44-matching -->
### 例：定数振幅なら四次項の係数を比較する

軽い理論の局所相互作用が $-\lambda_{\rm E}\phi^4/4!$ だけなら、四点接触頂点から $i\mathcal M=-i\lambda_{\rm E}$ です。つまり振幅の定数項が $-\lambda_{\rm E}$ になるよう、full theory の定数項を計算して比較します。ここで一致させるのは $\lambda$ の記号ではなく、同じ四点外線で計算した振幅です。matchingをするときの $\mu$ は、分離する物理質量 $M$ と区別されます。
<!-- definition-example-end -->

<a id="prop-qft44-tree-amplitude"></a>

<!-- formal-statement-start -->
> **命題（重いスカラー交換の四点振幅）**  
> 上記の $(-+++)$ 模型で質量零の $\phi\phi\to\phi\phi$ 散乱を木レベルで考え、$s=-(p_1+p_2)^2$、$t=-(p_1-p_3)^2$、$u=-(p_1-p_4)^2$ と定義する。内部の重い場が質量殻にならない $s,t,u\ne M^2$ では、外線規格化を含まない不変振幅は

$$
\mathcal M_{\rm full}^{(0)}(s,t,u)
=-\lambda+h^2\left(\frac1{M^2-s}+\frac1{M^2-t}+\frac1{M^2-u}\right).
$$

> 特に $|s|,|t|,|u|\le\rho M^2$、$0\le\rho<1$ なら

$$
\mathcal M_{\rm full}^{(0)}
=-\lambda+\frac{3h^2}{M^2}
+\frac{h^2}{M^4}(s+t+u)
+\frac{h^2}{M^6}(s^2+t^2+u^2)+R_3,
$$

> かつ $|R_3|\le 3h^2\rho^3/[M^2(1-\rho)]$ である。
<!-- formal-statement-end -->

### 証明の見取り図

四次接触頂点一つと、二つの $\chi\phi\phi$ 頂点を重い伝播関数でつないだ三つのチャネルを数えます。各伝播関数の分母を $M^2$ でくくり、幾何級数を有限次数で止めた残差を評価します。

<!-- proof-start -->
### 証明

相互作用の $1/2$ と $1/4!$ は同種場の入れ替え個数を相殺するので、頂点はそれぞれ $-ih$ と $-i\lambda$ です。$(-+++)$ 計量における質量 $M$ のFeynman伝播関数は $-i/(k^2+M^2-i0)$。内部運動量 $k=p_1+p_2$ に対し $k^2=-s$ なので、$s$ チャネルは

$$
(-ih)^2\frac{-i}{M^2-s-i0}
=\frac{ih^2}{M^2-s-i0}.
$$

同種の四本の外線を二組に分ける方法は $(12|34)$、$(13|24)$、$(14|23)$ の三つです。$t,u$ も同じ係数で加え、接触頂点 $-i\lambda$ を足して、$i\mathcal M$ から共通の $i$ を外すと第一式を得ます。

$x=X/M^2$（$X=s,t,u$）として $|x|\le\rho<1$ なら、恒等式

$$
\frac1{1-x}=1+x+x^2+\frac{x^3}{1-x}
$$

を各チャネルへ適用します。したがって残差は $R_3=(h^2/M^2)\sum_{X=s,t,u}(X/M^2)^3/[1-X/M^2]$。実運動学では $|1-X/M^2|\ge1-\rho$ であり、三項の三角不等式から表示した上界を得ます。$\rho<1$ を外すと、重い粒子の極 $s=M^2$ を含み得るため、同じ評価は成立しません。
<!-- proof-end -->

式の先頭 $-\lambda+3h^2/M^2$ は重い場の詳細によらない接触相互作用に見えます。しかし、この一致がどの次数まで続くかは、外部運動量を実際に代入して初めて分かります。

## 3. 局所演算子を係数と次数に分ける

「局所演算子」は同じ点での場とその有限回の微分の積です。例えば $\phi^4$ は四つの場だけ、$[\partial_\mu(\phi^2)]^2$ は四つの場と二つの微分を含みます。四次元で正準次元 $[\phi]=1$、$[\partial_\mu]=1$ なので両者の次元は4と6です。これは[QFT26の木レベルスケーリング](../QFT26/index.md#thm-qft26-tree-scaling)の具体例でもあります。

<a id="def-qft44-operator-expansion"></a>

<!-- formal-statement-start -->
> **定義（局所演算子展開と打切り次数）**  
> 軽い場 $\phi$ の局所演算子 $\mathcal O_{d,i}$ が四次元で正準次元 $d$ を持つとき、有効ラグランジアンを、指定した対称性を満たす演算子について

$$
\mathcal L_{\rm EFT}=\mathcal L_{\rm light,0}
+\sum_{d,i}\frac{c_{d,i}(\mu)}{M^{d-4}}\mathcal O_{d,i}
$$

> の形に整理する。係数 $c_{d,i}$ は無次元とし、$M$ に依存する他の無次元比や対数を含んでよい。外部運動量 $Q$ に対して、展開を指定次数で打ち切るには $Q/M$ が小さく、かつ係数・ループ・質量効果を制御できることが必要である。演算子が同じオンシェル振幅に独立に寄与するかは、部分積分や低次の運動方程式も考慮して判定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft44-operator-expansion -->
### 例：場と微分を一つずつ数える

$[\phi^4]=4$ なので係数には $M^0$ が対応します。$\partial_\mu(\phi^2)=2\phi\partial_\mu\phi$ は次元3で、その二乗は次元6、従って係数は $1/M^2$ に無次元因子 $h^2/M^2$ を掛けた形になります。$[\Box(\phi^2)]^2$ は次元8で係数は $1/M^4$ に同じ因子 $h^2/M^2$ を掛けます。**作用の次元が4になる**ことと、特定の四点散乱に寄与することは別々に確認します。
<!-- definition-example-end -->

<a id="prop-qft44-local-matching"></a>

<!-- formal-statement-start -->
> **命題（Gaussian消去と木レベルWilson係数）**  
> 上記模型を有限FourierモードのEuclid作用へ移し、周期境界条件、軽い場の積 $f=\phi^2$ のFourier支持 $|p|\le P<M$、重い場のモード空間が $f$ の全モードを含むことを仮定する。$K=M^2-\partial_E^2$ とおき、$\chi$ をGaussian積分で消去した $\phi$ の有効作用は、場に依らない定数を除き

$$
S_{\rm E,EFT}=S_{\rm E,light}-\frac{h^2}{8}\langle f,K^{-1}f\rangle.
$$

> さらに $P/M<1$ では、局所項の最初の三つは

$$
\begin{aligned}
S_{\rm E,EFT}=\int d^4x\,\bigg[&\frac12|\partial_E\phi|^2
+\frac{\lambda_{\rm match}}{4!}\phi^4
+\frac{h^2}{8M^4}|\partial_E(\phi^2)|^2\\
&-\frac{h^2}{8M^6}|\partial_E^2(\phi^2)|^2\bigg]+\mathcal R_{>8},
\qquad \lambda_{\rm match}=\lambda-\frac{3h^2}{M^2}.
\end{aligned}
$$

> ここで $\partial_E^2=\sum_{i=1}^4\partial_i^2$、$\mathcal R_{>8}$ はこの有限モード展開の次の項以降である。この $\lambda_{\rm match}$ は同じ作用を解析接続した木レベル四点振幅の定数項に一致する。
<!-- formal-statement-end -->

### 証明の見取り図

重い場に関して平方完成し、逆核の固有値 $(M^2+p^2)^{-1}$ を $p^2/M^2$ で展開します。最初の局所項を $\phi^4/4!$ と係数比較し、振幅から得た値とも照合します。

<!-- proof-start -->
### 証明

$J=hf/2$ と置くと、重い場の作用は $\frac12\langle\chi,K\chi\rangle+\langle\chi,J\rangle$ です。有限Fourierモードで $K$ の固有値は $M^2+p^2>0$、よって[QFT19の有限次元Gaussian積分](../QFT19/index.md#thm-qft19-gaussian)の仮定を満たします。

$$
\frac12\langle\chi,K\chi\rangle+\langle\chi,J\rangle
=\frac12\langle\chi+K^{-1}J,K(\chi+K^{-1}J)\rangle
-\frac12\langle J,K^{-1}J\rangle.
$$

平行移動したGaussian積分は $\phi$ に依存しないので、最後の項だけが残ります。Fourier核は恒等式

$$
\frac1{M^2+p^2}=\frac1{M^2}-\frac{p^2}{M^4}
+\frac{p^4}{M^6}-\frac{p^6}{M^6(M^2+p^2)}
$$

を満たします。Fourierモードごとに $p^2$ は $-\partial_E^2$ に対応し、周期境界で境界項は零です。そのため

$$
\begin{aligned}
-\frac{h^2}{8}\langle f,K^{-1}f\rangle
={}&-\frac{h^2}{8M^2}\int f^2
+\frac{h^2}{8M^4}\int|\partial_E f|^2\\
&-\frac{h^2}{8M^6}\int|\partial_E^2f|^2+\mathcal R_{>8}.
\end{aligned}
$$

四次項は $\lambda\phi^4/24-h^2\phi^4/(8M^2)$ なので $\lambda_{\rm match}=\lambda-24h^2/(8M^2)=\lambda-3h^2/M^2$。一方、[四点振幅の命題](#prop-qft44-tree-amplitude)の定数項は $-\lambda+3h^2/M^2=-\lambda_{\rm match}$ です。正規化と符号を異なる方法で検算できました。剰余の核の絶対値は $p^6/[M^6(M^2+p^2)]\le P^6/M^8$ であり、有限モードに固定すれば $|\mathcal R_{>8}|\le h^2P^6\int f^2/(8M^8)$ と評価できます。
<!-- proof-end -->

この平方完成自体は[QFT26の重いGaussian場の消去](../QFT26/index.md#prop-qft26-heavy-matching)を使ったものです。今回は新たに、三チャネル振幅による **matchingの観測量側の検算** と、次元8までの項を用いた **オンシェルでの独立性** を扱っています。

## 4. 次元6の項が四点散乱では消える例

局所作用に次元6の演算子が現れたからといって、どの観測量も $Q^2/M^2$ の相対補正を必ず受けるわけではありません。オンシェル条件と運動量保存が、係数の異なる演算子を結びつけることがあるからです。

<a id="prop-qft44-onshell-cancellation"></a>

<!-- formal-statement-start -->
> **命題（質量零同種四点散乱の最初の運動量補正）**  
> 上記模型で外線四本がすべて質量零かつオンシェル、四元運動量保存を満たし、$|s|,|t|,|u|\ll M^2$ とする。このとき $s+t+u=0$ なので、木レベル四点振幅の $h^2/M^4$ に比例する運動量一次の項は消え、

$$
\mathcal M_{\rm full}^{(0)}
=-\lambda_{\rm match}
+\frac{h^2}{M^6}(s^2+t^2+u^2)+O\!\left(\frac{h^2Q^6}{M^8}\right),
\qquad Q^2=\max(|s|,|t|,|u|).
$$

> したがってこの**特定の木レベル四点振幅**では、定数項以外の最初の運動量依存は次元8に対応する。ただし一般のEFT振幅で次元6の寄与が消えるという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

四元運動量保存 $p_1+p_2=p_3+p_4$ と $p_i^2=0$ を使って $s+t+u$ を展開します。次に三チャネル展開の一次項だけを抜き出します。

<!-- proof-start -->
### 証明

$(-+++)$ で $s=-(p_1+p_2)^2=-2p_1\cdot p_2$、$t=-(p_1-p_3)^2=2p_1\cdot p_3$、$u=2p_1\cdot p_4$ です。よって

$$
s+t+u=2p_1\cdot(-p_2+p_3+p_4)
=2p_1\cdot p_1=0.
$$

ここで二番目の等号に運動量保存、最後の等号に $p_1^2=0$ を使いました。[重い交換の展開](#prop-qft44-tree-amplitude)の一次項 $h^2(s+t+u)/M^4$ が消える一方、二次項は一般に零ではありません。$|X|/M^2\le\rho=Q^2/M^2<1$ の剰余上界は $O(h^2Q^6/M^8)$ です。

同じ事実は演算子からも見えます。$\partial_\mu(\phi^2)=2\phi\partial_\mu\phi$ と積の微分則から

$$
[\partial_\mu(\phi^2)]^2
=\frac43\partial_\mu(\phi^3\partial^\mu\phi)
-\frac43\phi^3\Box\phi.
$$

境界項を無視でき、最低次の自由な質量零外線で $\Box\phi=0$ を使用する四点接触振幅では、この次元6項の寄与は零になります。ただし相互作用のある運動方程式で $\Box\phi\propto\lambda\phi^3$ を代入すれば六点以上の項も現れるため、**演算子を無条件に削除してよい**という結論にはなりません。
<!-- proof-end -->

### 例：数値を代入して「最初の補正」を見分ける

質量零の重心系で $s=Q^2$、$t=u=-Q^2/2$ とします。$Q^2/M^2=1/10$ なら、重い交換三チャネルの和に $M^2$ を掛けた値は

$$
\frac1{1-0.1}+\frac2{1+0.05}
=\frac{10}{9}+\frac{40}{21}=\frac{190}{63}
\approx3.015873.
$$

定数項のみなら $3$、次元8まで加えると $3+(1+1/4+1/4)(0.1)^2=3.015$ です。$Q^2/M^2$ の一次項は $0.1-0.05-0.05=0$。最初の差は確かに $Q^4/M^4$ の次数です。近似との差は剰余 $R_3$ に含まれ、[上界](#prop-qft44-tree-amplitude)では $3(0.1)^3/(1-0.1)=1/300$ 以下です。

なお軽い質量を $m>0$ に戻せば、同じ計算で $s+t+u=4m^2$ となり、次元6項は定数に $4h^2m^2/M^4$ を加えます。EFTの「基底」は部分積分と運動方程式による冗長性を除いて選びますが、質量・外線条件・他の演算子を無視した「一律の削除」は危険です。

## 5. matchingした結合を低尺度へ運ぶ

matchingは重い粒子の効果を係数に写す工程です。しかし、その係数をそのまま低い $Q$ の計算へ使うと、軽い場のループから生じる $\log(Q/M)$ を固定次数で何度も足す必要があります。**running** はこの軽い理論の対数をまとめる工程です。

<a id="def-qft44-matching-scale"></a>

<!-- formal-statement-start -->
> **定義（matching尺度とrunning）**  
> 質量 $M$ の重い場を除く際に、full theory とEFTの係数を同一のくりこみ方式で比較する尺度 $\mu_M$ を matching尺度と呼ぶ。一般に $\mu_M\sim M$ を選び、そこで求めたWilson係数 $c_i(\mu_M)$ を、**重い場を含まないEFTのβ関数または異常次元行列**を使って $\mu\sim Q\ll M$ まで発展させることを running と呼ぶ。係数・演算子を両方変えると物理量の任意の $\mu$ 依存は計算精度内で相殺される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft44-matching-scale -->
### 例：尺度を二つ選ぶ

$\mu_M=M$ で四点接触係数 $\lambda_{\rm E}(M)$ を定め、実験の典型エネルギーが $Q=M/e^2$ なら $\mu=Q$ に向けて $\log(\mu/M)=-2$ だけ発展させます。matchingでは $M$ をもつ伝播関数を展開し、runningでは軽い $\phi$ のループだけを使います。同じ重い交換図をrunningへもう一度足すと二重計数になります。
<!-- definition-example-end -->

<a id="prop-qft44-matching-running"></a>

<!-- formal-statement-start -->
> **命題（木レベルmatchingと一ループleading-log running）**  
> 上記四次元模型について $\mu_M=M$、$m=0$ とし、MS型の同一方式で規格化した full theory の四次結合を $\lambda_{\rm F}(M)$ と書く。matchingを木レベルで行うと

$$
\lambda_{\rm E}(M)=\lambda_{\rm F}(M)-\frac{3h^2}{M^2}
+O(\text{一ループmatching}).
$$

> $M\gg\mu\sim Q>0$ で、外部運動量は非例外的、軽い $\phi^4$ の摂動論が有効で、無関連演算子の冪補正と高次ループを別途小さく制御できるとする。EFTでの四次結合の一ループβ関数は

$$
\mu\frac{d\lambda_{\rm E}}{d\mu}
=\frac{3}{16\pi^2}\lambda_{\rm E}^2+O(\lambda_{\rm E}^3),
$$

> なので、先頭対数の範囲で

$$
\lambda_{\rm E}(Q)=
\frac{\lambda_{\rm E}(M)}{1-\dfrac{3\lambda_{\rm E}(M)}{16\pi^2}\log(Q/M)}.
$$

> この式は高次の閾値補正・異なる演算子の混合・非摂動効果を含む完全予測ではない。
<!-- formal-statement-end -->

### 証明の見取り図

matching係数は四点振幅の定数項で決めます。重い場を除いた後は、[QFT25の四次スカラー理論の一ループβ関数](../QFT25/index.md#thm-qft25-phi4-beta)を使用します。微分方程式を $1/\lambda_{\rm E}$ について積分し、初期条件をmatchingの値にします。

<!-- proof-start -->
### 証明

木レベルmatchingでは $-\lambda_{\rm E}(M)$ を[full theory の四点振幅](#prop-qft44-tree-amplitude)の定数項 $-\lambda_{\rm F}(M)+3h^2/M^2$ と等しく置きます。これが第一式です。重い場のループや一ループmatchingに伴う有限項はこの次数では計算しておらず、等号へ勝手に吸収しません。

EFTの軽い場だけの四次相互作用は $-\lambda_{\rm E}\phi^4/4!$ です。[四次スカラーの一ループ結果](../QFT25/index.md#thm-qft25-phi4-beta)は、この結合のMS型規約と四次元の軽い理論に対して $d\lambda_{\rm E}/d\log\mu=b\lambda_{\rm E}^2$、$b=3/(16\pi^2)$ を与えます。$\lambda_{\rm E}\ne0$ の領域で変数を分離して

$$
\frac{d}{d\log\mu}\left(\frac1{\lambda_{\rm E}}\right)=-b,
\qquad
\frac1{\lambda_{\rm E}(Q)}-\frac1{\lambda_{\rm E}(M)}=-b\log\frac QM.
$$

分母へ移項すれば命題の式になります。$Q<M$ かつ $\lambda_{\rm E}(M)>0$ なら $\log(Q/M)<0$ なので、分母は1より大きくなり、赤外側で結合は小さくなります。ただし $\lambda_{\rm E}(Q)$ を観測振幅そのものと同一視せず、同じ次数の軽いループの有限・運動量依存部分や外線条件を追加して物理量を組み立てます。
<!-- proof-end -->

### 例：matchingとrunningの数値を別々に出す

$\lambda_{\rm F}(M)=0.40$、$h/M=0.20$ なら $3(h/M)^2=0.12$ だから $\lambda_{\rm E}(M)=0.28$ です。$Q=M/e^2$ とすると

$$
\lambda_{\rm E}(Q)=\frac{0.28}{1+\dfrac{3(0.28)}{8\pi^2}}
\approx0.27705.
$$

差 $0.40\to0.28$ は重い場の**matching**、$0.28\to0.27705$ は軽い場の**running**です。後者が小さくても零とは限りません。なお一ループmatchingを落として一ループrunningだけを残しているので、これは**木レベルの閾値を境界値にしたleading-log近似**であり、完全な一ループ精度の結果とは呼びません。

## 6. どこまでを予測と呼べるか

EFTの利点は、未知の短距離物理を有限個のWilson係数へまとめ、低い尺度の観測量を次数ごとに改善できる点です。弱い結合で $Q\ll M$ なら、まずmatchingの定数項、次に演算子展開の冪補正、そして軽い場のループと対数を順に求められます。

ただし、ここで比較したのは質量零の同種四点散乱で、$\chi$ の木レベル交換を展開した特殊な模型です。重い粒子の生成閾値 $s\simeq M^2$ では極が近く展開が破綻し、$Q\to0$ で質量零ループの赤外特異性を無条件に無視することもできません。一般のゲージEFTでは対称性と演算子の混合、フェルミオンではFierz関係、複数の質量閾値では段階的matchingが必要です。これらを「係数の次元だけで判断済み」とはしません。

## 7. 演習：振幅から精度まで再現する

### 演習 QFT44-A1：ポテンシャルの平方完成

- Level: A
- 目安時間: 8分

$V=M^2\chi^2/2+h\chi\phi^2/2+\lambda\phi^4/24$、$M>0$ とする。$\chi$ に関して平方完成し、$\lambda>3h^2/M^2$ が定数場の安定性の十分条件であることを示せ。

<!-- solution-start -->
### 詳細解答

$M^2[\chi+h\phi^2/(2M^2)]^2/2$ を展開すると $M^2\chi^2/2+h\chi\phi^2/2+h^2\phi^4/(8M^2)$。差を取って $V=M^2[\chi+h\phi^2/(2M^2)]^2/2+(\lambda-3h^2/M^2)\phi^4/24$。両項とも非負で、第2項の係数が正なら $|\phi|\to\infty$ に対してもポテンシャルは下へ発散しません。$M>0$ も第一項の符号に必要です。
<!-- solution-end -->

### 演習 QFT44-A2：三つの交換チャネル

- Level: A
- 目安時間: 8分

$(-+++)$ で重い質量 $M$ の伝播関数を $-i/(k^2+M^2-i0)$、$\chi\phi^2$ 頂点を $-ih$ とする。内部運動量 $k=p_1+p_2$ の図の係数を求め、同種四点散乱に三チャネルが生じる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$k^2=-s$ なので $(-ih)^2[-i/(M^2-s-i0)]=ih^2/(M^2-s-i0)$。外線の組分けは $(12|34)$、$(13|24)$、$(14|23)$ の三通りで、各々 $s,t,u$ に対応します。頂点の $1/2$ は二本の $\phi$ の入れ替えを相殺するので追加の $1/2$ は不要です。
<!-- solution-end -->

### 演習 QFT44-A3：演算子の次元と係数

- Level: A
- 目安時間: 7分

四次元で $[\phi]=1$、$[\partial]=1$、$[h]=1$ とする。$\phi^4$、$[\partial(\phi^2)]^2$、$[\partial^2(\phi^2)]^2$ の次元と、$h^2/M^2$ を無次元とした場合のそれぞれの係数の $M$ 依存を求めよ。

<!-- solution-start -->
### 詳細解答

$[\phi^4]=4$、$[\partial(\phi^2)]^2=2(1+2)=6$、$[\partial^2(\phi^2)]^2=2(2+2)=8$。作用密度の次元は4なので係数の次元は $0,-2,-4$。$h^2/M^2$ を無次元因子とすれば順に $(h^2/M^2)$、$(h^2/M^2)M^{-2}$、$(h^2/M^2)M^{-4}$ となります。実際の係数は $-h^2/(8M^2)$、$h^2/(8M^4)$、$-h^2/(8M^6)$ です。
<!-- solution-end -->

### 演習 QFT44-A4：幾何級数の剰余

- Level: A
- 目安時間: 8分

$|X|\le M^2/4$ に対し $(M^2-X)^{-1}$ を $X^2$ の次数まで展開し、打切り誤差の絶対値を $M$ だけで上から評価せよ。

<!-- solution-start -->
### 詳細解答

$x=X/M^2$ と置けば $(M^2-X)^{-1}=M^{-2}[1+x+x^2+x^3/(1-x)]$。$|x|\le1/4$ より誤差は $M^{-2}|x|^3/|1-x|\le M^{-2}(1/4)^3/(3/4)=1/(48M^2)$。$X$ が負の場合も三角不等式で同じ上界が使えます。
<!-- solution-end -->

### 演習 QFT44-A5：matching境界値

- Level: A
- 目安時間: 7分

$\lambda_{\rm F}(M)=0.5$、$h/M=1/4$ のとき、木レベルmatching後の $\lambda_{\rm E}(M)$ を分数で求め、安定性条件を検査せよ。

<!-- solution-start -->
### 詳細解答

$3h^2/M^2=3/16$ なので $\lambda_{\rm E}(M)=1/2-3/16=5/16$。$5/16>0$ であり、$\lambda_{\rm F}=1/2>3/16$ を満たすので平方完成で得た十分条件も成り立ちます。matching値は $\lambda_{\rm F}$ そのものではありません。
<!-- solution-end -->

### 演習 QFT44-B1：Gaussian消去から四点係数まで

- Level: B
- 目安時間: 15分

有限Euclidモードで $K=M^2-\partial_E^2>0$、$J=h\phi^2/2$ とする。Gaussian積分後の作用を求め、$K^{-1}$ の $M^{-4}$ の項まで展開して $\lambda_{\rm match}$ と導関数演算子の係数を導け。周期境界条件を用いてよい。

<!-- solution-start -->
### 詳細解答

$\frac12\langle\chi,K\chi\rangle+\langle\chi,J\rangle=\frac12\langle\chi+K^{-1}J,K(\chi+K^{-1}J)\rangle-\frac12\langle J,K^{-1}J\rangle$。前半の積分は $\phi$ 非依存の定数です。よって補正は $-h^2\langle\phi^2,K^{-1}\phi^2\rangle/8$。Fourier核 $(M^2+p^2)^{-1}=M^{-2}-p^2M^{-4}+O(p^4M^{-6})$ を代入し、Parseval等式と周期境界での部分積分を使うと $-h^2\int\phi^4/(8M^2)+h^2\int|\partial_E(\phi^2)|^2/(8M^4)+\cdots$ です。$\phi^4$ の全係数は $\lambda/24-h^2/(8M^2)$、従って $\lambda_{\rm match}=\lambda-3h^2/M^2$。$K$ の正定値性と $\phi^2$ の支持条件がGaussian積分・Fourier展開を可能にしています。
<!-- solution-end -->

### 演習 QFT44-B2：オンシェルとオフシェルの区別

- Level: B
- 目安時間: 14分

四本の外線が同じ質量 $m\ge0$、運動量保存を満たす場合、$s+t+u=4m^2$ を示せ。$m=0$ で次元6の四点接触寄与が消えても、演算子 $[\partial(\phi^2)]^2$ をあらゆる過程から捨てられない理由を述べよ。

<!-- solution-start -->
### 詳細解答

$s=-p_1^2-p_2^2-2p_1\cdot p_2=2m^2-2p_1\cdot p_2$、$t=2m^2+2p_1\cdot p_3$、$u=2m^2+2p_1\cdot p_4$ です。したがって和は $6m^2+2p_1\cdot(-p_2+p_3+p_4)=6m^2+2p_1^2=4m^2$。$m=0$ の四点振幅では線形項が消えますが、部分積分で $[\partial(\phi^2)]^2$ は境界項を除き $-(4/3)\phi^3\Box\phi$。相互作用を含む運動方程式は $\Box\phi=(\lambda/6)\phi^3+\cdots$ を含むので、六点演算子等へ移されます。オンシェル四点の零は演算子が全ての観測量で零という意味ではありません。
<!-- solution-end -->

### 演習 QFT44-B3：leading-logの積分と符号

- Level: B
- 目安時間: 14分

$d\lambda/d\log\mu=b\lambda^2$、$b=3/(16\pi^2)$、$\lambda(M)=\lambda_*>0$ とする。$Q=M e^{-L}$（$L>0$）まで解き、$\lambda(Q)$ を $\lambda_*$ の二次まで展開せよ。赤外側での増減も判定せよ。

<!-- solution-start -->
### 詳細解答

$d(1/\lambda)/d\log\mu=-b$ を $M$ から $Q$ まで積分すると $1/\lambda(Q)-1/\lambda_*=-b\log(Q/M)=bL$。よって $\lambda(Q)=\lambda_*/(1+bL\lambda_*)$。$|bL\lambda_*|<1$ では分母を幾何級数展開し、$\lambda(Q)=\lambda_*-bL\lambda_*^2+O(\lambda_*^3L^2)$。$b,L,\lambda_*>0$ なので $\lambda(Q)<\lambda_*$ です。$L$ が大きすぎて対数近似や他のIR条件が破れる場合は、この式だけで物理を判定しません。
<!-- solution-end -->

### 演習 QFT44-B4：運動量展開と誤差の数値比較

- Level: B
- 目安時間: 14分

質量零の $s=Q^2$、$t=u=-Q^2/2$、$Q^2/M^2=1/10$ とする。重い三チャネル交換の和 $A=M^2\sum_X(M^2-X)^{-1}$ を厳密分数で計算し、次元4・6・8までの近似をそれぞれ求めよ。残差の一般上界と比較せよ。

<!-- solution-start -->
### 詳細解答

$A=(1-1/10)^{-1}+2(1+1/20)^{-1}=10/9+40/21=190/63$。次元4だけなら $3$。次元6の係数は $s+t+u=Q^2-Q^2/2-Q^2/2=0$ なので依然 $3$。次元8では $s^2+t^2+u^2=(3/2)Q^4$、したがって $3+3/200=603/200=3.015$ です。差は $190/63-603/200=(38000-37989)/12600=11/12600\approx0.0008730$。$\rho=1/10$ の三チャネル上界は $3\rho^3/(1-\rho)=1/300\approx0.003333$ なので差はその範囲です。
<!-- solution-end -->

### 演習 QFT44-C1：match・run・冪補正を一つの計算にする

- Level: C
- 目安時間: 27分

四次元の質量零軽場 $\phi$ と質量 $M>0$ の重い場 $\chi$ を持つ本文の模型を使う。$\lambda_{\rm F}(M)=2/5$、$h/M=1/5$ とし、木レベルmatchingと軽い場の一ループleading-logのみを採用する。外線は $s=Q^2$、$t=u=-Q^2/2$、$Q=M/e^2$ とする。

1. 定数ポテンシャルの安定性条件を確かめ、$\lambda_{\rm E}(M)$ を求めよ。
2. $\lambda_{\rm E}(Q)$ をleading-logで求め、matchingとrunningの寄与を区別せよ。
3. 木レベルfull theoryの重い交換による運動量依存を次元8まで展開し、次元6項が消えること、定数項に対する相対次数を述べよ。
4. (2)の結合を使う低エネルギー四点振幅を「完全な一ループ物理振幅」と称してよいか判定し、追加で必要な内容を二つ挙げよ。

<!-- solution-start -->
### 詳細解答

1. $3h^2/M^2=3/25$、$\lambda_{\rm F}=2/5=10/25>3/25$ なので十分条件を満たします。matchingにより $\lambda_{\rm E}(M)=2/5-3/25=7/25=0.28$。
2. $b=3/(16\pi^2)$、$\log(Q/M)=-2$ と置き、$1/\lambda_{\rm E}(Q)=1/\lambda_{\rm E}(M)+2b$ を得ます。従って $\lambda_{\rm E}(Q)=(7/25)/[1+21/(200\pi^2)]\approx0.27705$。$0.40\to0.28$ は重い場の交換によるmatching、$0.28\to0.27705$ は軽い場の対数発展です。
3. [三チャネルの木レベル式](#prop-qft44-tree-amplitude)で $s+t+u=0$、$s^2+t^2+u^2=(3/2)Q^4$ なので

$$
\mathcal M_{\rm full}^{(0)}
=-\frac7{25}+\frac{3h^2Q^4}{2M^6}
+O\!\left(\frac{h^2Q^6}{M^8}\right).
$$

$h^2/M^2=1/25$ なので、定数項に対する最初の運動量補正の大きさの比は $[(3/2)(1/25)/(7/25)](Q/M)^4=(3/14)e^{-8}$。この木レベル・質量零の四点過程では次元6項は消え、次元8が最初です。
4. 完全一ループとは呼べません。採用した境界値は木レベルであり、有限の一ループmatchingを省略しています。さらに、$\lambda_{\rm E}(Q)$ という結合だけでは非例外的外部運動量に依存する軽い一ループ振幅の有限部分・外線補正がそろいません。$O(Q^2/M^2)$ 以上の必要な演算子や、別過程では消えない次元6項の寄与も精度に応じて保持します。
<!-- solution-end -->

## 8. まとめと次の問い

- **matching**：同じ軽い外線の振幅を full theory とEFTで比較し、重い場の効果をWilson係数へ写す。この模型の木レベルでは $\lambda_{\rm E}(M)=\lambda_{\rm F}(M)-3h^2/M^2$。
- **演算子展開**：次元4・6・8と次数を整理し、オンシェル条件も確認する。質量零同種スカラー四点の次元6補正は消え、最初の運動量依存は次元8から現れる。
- **running**：matching後に残った軽い場のβ関数で係数を低い尺度へ運ぶ。これは重い場の交換をもう一度足す作業ではない。
- **誤差と適用域**：$Q\ll M$、摂動が有効、閾値・赤外特異性を避ける等の条件を確認する。leading-logと完全一ループ精度は同義ではない。

次は自発的対称性の破れの量子補正へ進み、対称性が許す質量項とループ補正の大きさがどう関係するかを考えます。
