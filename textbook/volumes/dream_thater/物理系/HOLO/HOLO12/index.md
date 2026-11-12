# HOLO12 バルクゲージ場と保存流

[HOLO9のスカラー場のGKPW辞書](../HOLO9/index.md#def-holo9-gkpw)では、境界のスカラー源を変えると、バルクの解からスカラー演算子の応答が得られました。しかし境界の**保存電流**には、スカラー源と異なる特徴があります。電流と結び付く境界源はベクトルの成分を持ち、しかもその一部はゲージ変換で変えられます。**何が物理的な入力で、何が単なる記述の違いなのでしょうか。**

本講は、固定したEuclid AdS上の自由なAbelゲージ場（Maxwell場）を用い、有限cutoffの変分から境界の電流応答を導きます。次に径方向ゲージで横成分だけが伝播することを確かめ、$d=3$の境界に対して2点関数を計算します。最後に、ゲージ不変性からWard恒等式を導きます。AdS/CFTそのものは証明せず、境界の大域的$U(1)$対称性と、適切なベクトル版の[GKPW辞書](../HOLO9/index.md#def-holo9-gkpw)が成立する理論を**仮定**します。

## 0. 背景、作用域、符号

整数$d\ge3$、半径$L>0$、結合$g_F^2>0$、$\hbar=1$とします。計算対象は[Euclid AdSのPoincaré座標](../HOLO3/index.md#def-holo3-euclidean-ads)の領域$z\ge\epsilon>0$で、計量は

$$
ds_E^2=\frac{L^2}{z^2}(dz^2+\delta_{ij}dx^i dx^j),
\qquad \sqrt{g}=\frac{L^{d+1}}{z^{d+1}}.
$$

添字$a,b$は動径座標と境界座標の全て、添字$i,j$は境界座標のみを走ります。繰り返した上下添字はそれぞれの範囲で和を取ります。

最初の部分積分は$z\in[\epsilon,Z]$で行い、境界方向は大きな周期箱、または十分な減衰を持つ滑らかな場を用います。その後$Z\to\infty$とし、非零境界波数では**物理的な横成分が減衰するEuclid解**を選びます。純ゲージの縦成分にはポテンシャル自体の減衰を課しません。

境界源は滑らかな実1形式$a=a_i(x)dx^i$です。Fourier計算では急減少する滑らかな源を用います。厳密な零波数の境界条件は別途指定を要するため、主に$|k|>0$を扱います。

全てEuclid符号で計算します。Lorentz計量の標準は[符号規約](../../../../../dream-theater-lorentz-conventions.md)の$(-,+,\ldots,+)$ですが、Euclidの正値作用からLorentzの時間順序2点関数を無条件に同一視しません。バルク場のループ、重力の反作用、荷電物質の伝播は扱いません。したがって本章で証明するWard恒等式は**外部の荷電演算子を挿入しない**場合です。

## 1. Maxwell作用と「異なるポテンシャル、同じ場」

電磁場のポテンシャル$A=A_a\,dX^a$は1形式です。ここで**Abelゲージ変換**とは、滑らかな実関数を足し合わせる変換が互いに可換である場合を指します。同じ物理的な場に異なるポテンシャルが対応するので、作用を$A$そのものではなく、反対称な成分

$$
F_{ab}=\partial_a A_b-\partial_b A_a
$$

で作ります。この$F$は2形式の成分であり、境界で必要な$F_{zi}$は深さ方向と境界方向の混合成分です。

<a id="def-holo12-maxwell"></a>

<!-- formal-statement-start -->
> **定義（Euclid AdS上のMaxwell作用とゲージ変換）**  
> 第0節の固定Euclid計量上で滑らかな実1形式$A$を取り、$F_{ab}=\partial_aA_b-\partial_bA_a$とする。$g_F^2>0$に対し

$$
S_E[A]=\frac{1}{4g_F^2}\int_{M_{\epsilon,Z}}d^{d+1}X\,\sqrt{g}\,F_{ab}F^{ab}
$$

> と定義する。滑らかな実関数$\lambda$による$A_a\mapsto A_a+\partial_a\lambda$をAbelゲージ変換とする。添字を上げる際は$F^{ab}=g^{ac}g^{bd}F_{cd}$を用いる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo12-maxwell -->
**定義の確認**：局所座標で$A_z=cx^1$、$A_1=cz$、その他を零とすると、$F_{z1}=\partial_z(cz)-\partial_1(cx^1)=c-c=0$で、他の成分も零です。$\lambda=czx^1$とおけば$A=d\lambda$であり、零ポテンシャルからゲージ変換で得た例です。作用密度も零です。これは有限の座標領域での例で、$x^1$を周期座標とする箱での大域的なゲージ関数とは主張しません。

一方、$A_1=f(z)$、他は零なら、$f'(z)=df/dz$（境界座標$x^i$を固定した$z$微分）と書いて$F_{z1}=f'(z)$、$F^{z1}=(z^4/L^4)f'(z)$です。後者は$g^{zz}=g^{11}=z^2/L^2$を反対称テンソルの二つの添字へそれぞれ掛けた結果です。したがって局所の作用密度は

$$
\frac{\sqrt{g}}{4g_F^2}F_{ab}F^{ab}
=\frac{L^{d-3}}{2g_F^2}z^{3-d}(f'(z))^2.
$$

係数2は$(z,1)$と$(1,z)$の二つの成分から生じます。$f'\ne0$なら純ゲージではありません。これで変換の自由と物理的な曲率$F$の違いを、成分から判定できました。
<!-- definition-example-end -->

実際、変換後の場の強さは

$$
F'_{ab}=F_{ab}+\partial_a\partial_b\lambda-\partial_b\partial_a\lambda=F_{ab}
$$

です。これは滑らかな$\lambda$について偏微分が交換するためです。従って[本節の作用](#def-holo12-maxwell)は厳密にゲージ不変です。ただし**境界値を固定するDirichlet問題**において、境界で非零の$\lambda$は源を変える操作です。「作用が不変」と「固定源の許容変分」を混同しません。

## 2. 有限cutoffの境界変分から電流へ

スカラーの[HOLO7の境界変分](../HOLO7/index.md#prop-holo7-boundary-variation)では、境界値と法線方向の応答が対になりました。Maxwell場でも同じ論理が使えますが、$F_{zi}$の**反対称性**と紫外側の**外向き法線の負号**を正確に残す必要があります。

<a id="prop-holo12-boundary-variation"></a>

<!-- formal-statement-start -->
> **命題（Maxwell作用の第一変分と境界運動量）**  
> $A,\delta A$を第0節の滑らかな実1形式・変分とし、有限領域$M_{\epsilon,Z}$の境界を向き付きで取る。このとき

$$
\delta S_E
=-\frac{1}{g_F^2}\int_M\sqrt{g}\,(\nabla_aF^{ab})\,\delta A_b
+\frac{1}{g_F^2}\int_{\partial M}\sqrt{\gamma}\,n_aF^{ab}\,\delta A_b.
$$

> 従って内部の場の方程式は$\nabla_aF^{ab}=0$である。$z=\epsilon$における外向き運動量密度を$\pi_\epsilon^i$とすると

$$
\pi_\epsilon^i
=\frac{\sqrt{\gamma}}{g_F^2}n_aF^{ai}
=-\frac{L^{d-3}}{g_F^2}\epsilon^{3-d}F_{zi}(\epsilon,x).
$$

> 赤外側の境界変分が消える解について、on-shell第一変分は$\delta S_{E,\mathrm{os}}=\int d^dx\,\pi_\epsilon^i\,\delta a_i^\epsilon$となる。ただし$a_i^\epsilon=A_i(\epsilon,x)$である。
<!-- formal-statement-end -->

### 証明の見取り図

$F$の二つの添字を反対称性でまとめ、共変部分積分を行います。次に誘導計量と外向き法線を座標成分へ代入します。紫外側で$n^z=-z/L$となる点が、負号を決めます。

<!-- proof-start -->
### 証明

計量は固定して$A$だけを変分します。$\delta F_{ab}=\nabla_a\delta A_b-\nabla_b\delta A_a$だから、

$$
\delta S_E
=\frac{1}{2g_F^2}\int_M\sqrt{g}\,F^{ab}
(\nabla_a\delta A_b-\nabla_b\delta A_a).
$$

第2項の添字$a,b$を交換し$F^{ba}=-F^{ab}$を使うと、第1項と等しくなり、

$$
\delta S_E=\frac{1}{g_F^2}\int_M\sqrt{g}\,F^{ab}\nabla_a\delta A_b.
$$

積の微分$\nabla_a(F^{ab}\delta A_b)$を展開します。[Gauss--Ostrogradskyの発散定理](../../../幾何系/VC/VC4/index.md#thm-vc4-gauss-divergence)の直方体での証明と同じく、ここでは本章の座標箱で微分積分を直接実行します。$V^a=F^{ab}\delta A_b$とおくと、計量密度を含む発散は

$$
\sqrt g\,\nabla_a V^a=\partial_a(\sqrt g\,V^a)
$$

となります。境界方向は周期的または十分に減衰するので$\partial_i$の積分が消え、残りは動径方向の微積分学の基本定理により

$$
\int_M\sqrt g\,\nabla_aV^a\,d^{d+1}X
=\int d^dx\,[\sqrt g\,V^z]_{z=\epsilon}^{z=Z}.
$$

$z$一定面では$\sqrt\gamma\,n_z=-\sqrt g$（紫外側）または$+\sqrt g$（赤外側）です。従って右辺は$\int_{\partial M}\sqrt\gamma\,n_a V^a$に一致します。この計算により、三次元Euclid空間だけを対象とする引用先の定理を、追加の根拠なしで一般次元の曲がった空間へ適用したことにはなりません。ここで$z=\epsilon$面の誘導計量は$\gamma_{ij}=L^2\epsilon^{-2}\delta_{ij}$、従って$\sqrt{\gamma}=L^d\epsilon^{-d}$です。外向き単位法線は$n^z=-\epsilon/L$、$n_z=g_{zz}n^z=-L/\epsilon$であり、

$$
\sqrt{\gamma}\,n_zF^{zi}
=\frac{L^d}{\epsilon^d}\left(-\frac L\epsilon\right)
\frac{\epsilon^4}{L^4}F_{zi}
=-L^{d-3}\epsilon^{3-d}F_{zi}.
$$

また$F^{zz}=0$なので$z$面に$\delta A_z$の項はありません。内部方程式が零の解で、赤外面の寄与が消える変分を取れば指定の境界変分だけが残ります。$\square$
<!-- proof-end -->

**符号の最小例**：$d=3$で$A_z=0$、$A_1=f(z)$なら$\pi_\epsilon^1=-f'(\epsilon)/g_F^2$です。$f'(z)<0$なら運動量は正です。これは「$z$が増える」ことと「外向き」が**反対**であるためです。

境界CFTとの辞書では、裸の運動量をそのまま常に電流と呼べるわけではありません。反項のある次元では境界変分に局所項が加わるためです。以下では一般の源を定義したうえで、$d=3$の非局所部分を完全に計算します。

<a id="def-holo12-current"></a>

<!-- formal-statement-start -->
> **定義（境界の保存電流応答）**  
> 境界の大域的$U(1)$対称性を持ち、境界源$a_i$に結合する理論について、ベクトル版GKPW辞書として$W[a]=\log Z_{\mathrm{CFT}}[a]=-S_{E,\mathrm{ren}}[a]$を仮定する。$\delta W=\int d^dx\,\langle J^i(x)\rangle_a\,\delta a_i(x)$により

$$
\langle J^i(x)\rangle_a=\frac{\delta W}{\delta a_i(x)}
=-\frac{\delta S_{E,\mathrm{ren}}}{\delta a_i(x)}
$$

> を境界の電流応答と定義する。$S_{E,\mathrm{ren}}$は必要な局所反項を加えたon-shell作用で、$a_i$は境界における$A_i$の先頭係数である。以下の$d=3$の非局所計算では局所有限反項を零に選ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo12-current -->
**定義の確認**：$d=3$で境界に一つの横波数モードだけを置き、正規化された振幅$t$について$S_{E,\mathrm{os}}(t)=C t^2/2$、$C>0$とします。$W(t)=-Ct^2/2$なので、応答は$dW/dt=-Ct$、2回の微分は$d^2W/dt^2=-C$です。[境界運動量](#prop-holo12-boundary-variation)が$dS/dt=Ct$であることと負号が一致します。この簡単な1変数例は**作用の係数と電流の符号を結ぶ判定**であり、以下で$C=|k|/g_F^2$を微分方程式から確定します。
<!-- definition-example-end -->

## 3. ゲージ条件と横波の方程式

$A_z$は物理自由度を一つ増やすのではありません。$\lambda(z,x)=-\int_\epsilon^z A_z(s,x)\,ds$と取れば$A'_z=0$とでき、しかも$\lambda(\epsilon,x)=0$なので境界値$a^\epsilon$を変えません。この選択を**径方向ゲージ**とします。その後、境界源を変える変換としては$z$に依存しない$\lambda_0(x)$が残ります。

Fourier変換は$A_i(z,x)=\int d^dk\,(2\pi)^{-d}e^{ik\cdot x}A_i(z,k)$とします。$k_i$を境界波数ベクトルの成分、$k=|k|=(\sum_i k_i^2)^{1/2}>0$をその長さとします。ここで$P_{ij}(k)=\delta_{ij}-k_i k_j/k^2$は境界の直交座標基底で表した線形写像で、$k$方向を除いてそれに直交する成分を残します。実際、$P_{ij}k_j=k_i-k_i(k_jk_j)/k^2=0$です。任意の$a_i$は

$$
a_i^T=P_{ij}a_j,\qquad
a_i^L=\frac{k_i k_j}{k^2}a_j,\qquad
k_i a_i^T=0
$$

に分解されます。$P^2=P$であることは$k_i k_i=k^2$から直接確かめられます。$a^L_i=ik_i\lambda_0$の形に取れるため、縦成分は境界ゲージ変換で動きます。

<a id="prop-holo12-radial-equations"></a>

<!-- formal-statement-start -->
> **命題（径方向ゲージの拘束と横波）**  
> $d\ge3$のEuclid AdSで$A_z=0$とし、波数$k\ne0$の滑らかなMaxwell解を考える。$z$成分の方程式は$k_i\partial_zA_i=0$を課す。横成分$A_i^T=P_{ij}A_j$は

$$
\partial_z\left(z^{3-d}\partial_zA_i^T\right)
-k^2z^{3-d}A_i^T=0
$$

> に従い、縦成分は$z$に依存しない。特に$d=3$、$z\ge\epsilon$で横成分に赤外減衰条件を課すと

$$
A_i(z,k)=e^{-k(z-\epsilon)}a_i^{T,\epsilon}(k)+a_i^{L,\epsilon}(k).
$$

> この解の縦成分は$F_{ab}=0$の部分にのみ寄与する。
<!-- formal-statement-end -->

### 証明の見取り図

$\nabla_aF^{ab}=0$を密度$\partial_a(\sqrt g F^{ab})=0$で書き、$b=z$の式を拘束として使います。残りの$i$成分に横射影$P$をかけると、$A_i^T$だけの常微分方程式が現れます。

<!-- proof-start -->
### 証明

$A_z=0$では$F_{zi}=\partial_zA_i$、$F_{ji}=\partial_jA_i-\partial_iA_j$です。密度は

$$
\sqrt g\,F^{zi}=L^{d-3}z^{3-d}\partial_zA_i,\qquad
\sqrt g\,F^{ji}=L^{d-3}z^{3-d}F_{ji}.
$$

$z$成分は$\partial_i(\sqrt g F^{iz})=0$なので、非零$k$で$k_i\partial_zA_i=0$。$i$成分は

$$
\partial_z(z^{3-d}\partial_z A_i)
+z^{3-d}(-k^2A_i+k_i k_jA_j)=0.
$$

$P_{ij}k_j=0$を使い、左から$P$を作用させれば命題の横波方程式です。一方、$k_j A_j$の$z$微分は拘束によって零なので、縦成分$a_i^L$は一定です。$d=3$なら横波方程式は$A_i^{T\prime\prime}-k^2A_i^T=0$、一般解は$c_ie^{kz}+d_ie^{-kz}$。$z\to\infty$の減衰で$c_i=0$となり、$z=\epsilon$の境界値から$d_ie^{-k\epsilon}=a_i^{T,\epsilon}$が定まります。縦成分は$ik_i\lambda_0$、$z$成分は零なので、対応する$F_{zi}$も$F_{ij}$も零です。$\square$
<!-- proof-end -->

**直接例**：$d=3$、波数ベクトル$k=(k,0,0)$、$k>0$、境界源$a=(a_1,a_2,0)$を取ります。この直交座標基底では$k_i k_j/k^2=\mathrm{diag}(1,0,0)$だから、射影の成分表示は$P=\mathrm{diag}(0,1,1)$です。$A_1=a_1$は縦の純ゲージ、$A_2=a_2e^{-k(z-\epsilon)}$は横の伝播解となります。$F_{z2}=-ka_2e^{-k(z-\epsilon)}$、$F_{12}=ika_2e^{-k(z-\epsilon)}$で、両方が非零のときだけ場の強さに寄与します。

## 4. 源の次元と$d=3$での2点関数

$d$一般で$k=0$の横波方程式を形式的に解くと、$d>2$では$A_i=a_i+b_i z^{d-2}$となります。先頭係数$a_i$が境界源です。非零$k$かつ$d\ge4$では途中に$z^2$などの局所項が現れ、特に偶数$d$では対数が出る場合があります。従って**全ての$d$で応答が単純に$b_i$だけとはしません**。反項を含む一般論はHOLO14で扱います。

バルクの等長な拡大$(z,x)\mapsto(\rho z,\rho x)$では、1形式$A=A_i dx^i+A_z dz$を同一の幾何学的場として表すため、$A'_i(\rho z,\rho x)=\rho^{-1}A_i(z,x)$です。境界源$a_i$のスケーリング次元は1です。境界の結合$\int d^dx\,a_iJ^i$を無次元に保つには電流の次元が$d-1$でなければなりません。

<a id="prop-holo12-current-dimension"></a>

<!-- formal-statement-start -->
> **命題（保存流の境界スケーリング次元）**  
> $d\ge3$、平坦境界の固定Euclid AdSを考える。境界源$a_i$をバルク1形式の先頭係数とし、無次元の変形$\int d^dx\,a_iJ^i$が拡大の下で不変であると仮定する。このとき

$$
[a_i]=1,\qquad [J^i]=d-1.
$$

> ここで$[\ ]$は質量次元である。保存電流の次元は本模型の境界での源の変換則から決まり、任意の非保存ベクトル演算子への一般化は含まない。
<!-- formal-statement-end -->

### 証明の見取り図

座標の伸縮で$dx^i$が$\rho$倍になるため、1形式の成分は$\rho^{-1}$倍になります。測度$d^dx$の$\rho^d$倍と釣り合わせると結論が得られます。

<!-- proof-start -->
### 証明

$\rho>0$とし、$x'=\rho x$、$z'=\rho z$とおきます。$dx'^i=\rho dx^i$のため、同じ1形式の成分は$A'_i(z',x')=\rho^{-1}A_i(z,x)$です。$z\to0$の先頭係数も$a_i'(x')=\rho^{-1}a_i(x)$を満たします。境界結合の変換後は

$$
\int d^dx'\,a'_i(x')J'^i(x')
=\rho^d\int d^dx\,(\rho^{-1}a_i(x))(\rho^{-\Delta_J}J^i(x)).
$$

任意の源についてこれが元の結合に等しいためには$\rho^{d-1-\Delta_J}=1$が必要で、$\Delta_J=d-1$です。$\square$
<!-- proof-end -->

次に$d=3$へ限定します。第3節の横波解を[境界運動量の公式](#prop-holo12-boundary-variation)へ代入すると、$\epsilon\to0$の前から

$$
\pi_\epsilon^i(k)
=-\frac{1}{g_F^2}\partial_zA_i(\epsilon,k)
=\frac{k}{g_F^2}P_{ij}(k)a_j^\epsilon(k).
$$

作用は二次で、境界値を一様に$t$倍すると$S_{\mathrm{os}}$も$t^2$倍になるため、$S_{\mathrm{os}}=\frac12\int a_i^\epsilon\pi_\epsilon^i$です。ここでは純ゲージの寄与は零です。カットオフ除去後も有限な非局所核を得ます。

<a id="prop-holo12-two-point"></a>

<!-- formal-statement-start -->
> **命題（三次元境界の横射影された保存流2点関数）**  
> $d=3$、固定Euclid $AdS_4$、自由Abel Maxwell作用、径方向ゲージ、$k\ne0$での横成分の赤外減衰解、ゲージ異常のない境界辞書を仮定する。$W[a]=-S_{E,\mathrm{ren}}[a]$の規約を用い、局所有限反項を零に選ぶと、非局所部分は

$$
S_{E,\mathrm{ren}}[a]
=\frac{1}{2g_F^2}\int\frac{d^3k}{(2\pi)^3}\,
a_i(-k)\,|k|P_{ij}(k)\,a_j(k),
$$

$$
\langle J_i(k)\rangle_a=-\frac{|k|}{g_F^2}P_{ij}(k)a_j(k),
\qquad
\langle J_i(k)J_j(-k)\rangle_{\mathrm{conn}}
=-\frac{|k|}{g_F^2}P_{ij}(k).
$$

> 後者は運動量保存のデルタ関数を除いた核である。分離した点$x\ne0$では、同じ規約に対応する位置空間の核は

$$
\langle J_i(x)J_j(0)\rangle
=\frac{2}{\pi^2g_F^2}\,
\frac{\delta_{ij}-2x_ix_j/|x|^2}{|x|^4}.
$$

> 多項式の運動量接触項は局所反項の選び方で変化し得る。
<!-- formal-statement-end -->

### 証明の見取り図

[径方向の横波解](#prop-holo12-radial-equations)を[on-shell境界変分](#prop-holo12-boundary-variation)へ入れます。$W=-S$の負号を維持して2回微分すれば横射影を持つ核が出ます。位置空間では$1/|k|$のFourier変換を一度計算すれば、残りは微分で得られます。

<!-- proof-start -->
### 証明

赤外端を$Z\to\infty$とし、非零$k$で減衰解を選びます。第3節から$\partial_zA_i(\epsilon,k)=-|k|P_{ij}a_j^\epsilon$です。よって第2節の式に代入すれば

$$
\pi_\epsilon^i(k)=\frac{|k|}{g_F^2}P_{ij}a_j^\epsilon.
$$

作用の斉次二次性または第一変分を経路$t a^\epsilon$に沿って積分する方法で、

$$
S_{\mathrm{os}}[a^\epsilon]-S_{\mathrm{os}}[0]
=\int_0^1dt\int d^3x\,
\pi_\epsilon^i[t a^\epsilon]\frac{d(t a_i^\epsilon)}{dt}
=\frac12\int d^3x\,a_i^\epsilon\pi_\epsilon^i[a^\epsilon].
$$

$S_{\mathrm{os}}[0]=0$としFourier変換すれば表示の二次作用を得ます。$d=3$では$\epsilon^{3-d}=1$で、自由な減衰解からの非局所部分に$\epsilon^{-1}$発散はありません。$W=-S_{\mathrm{ren}}$を源で一度微分すると$-|k|Pa/g_F^2$、再度微分すると$-|k|P/g_F^2$になります。

位置空間の検算も行います。$r=|x|>0$についてGaussian積分を使うと

$$
\int\frac{d^3k}{(2\pi)^3}\frac{e^{ik\cdot x}}{|k|}
=\frac{1}{\sqrt\pi}\int_0^\infty\frac{dt}{\sqrt t}
\frac{e^{-r^2/(4t)}}{(4\pi t)^{3/2}}
=\frac{1}{2\pi^2r^2}.
$$

最初の等号は$|k|^{-1}=\pi^{-1/2}\int_0^\infty t^{-1/2}e^{-tk^2}\,dt$を使ったもので、$r>0$の分布的解釈で成立します。$|k|=k^2/|k|$なので

$$
\mathcal F^{-1}[|k|]=-\Delta_x\left(\frac{1}{2\pi^2r^2}\right)
=-\frac{1}{\pi^2r^4},
$$

$$
\mathcal F^{-1}\left[\frac{k_i k_j}{|k|}\right]
=-\partial_i\partial_j\left(\frac{1}{2\pi^2r^2}\right)
=\frac{\delta_{ij}}{\pi^2r^4}-\frac{4x_ix_j}{\pi^2r^6}.
$$

これらを$|k|P_{ij}=|k|\delta_{ij}-k_i k_j/|k|$へ代入すると$-2(\delta_{ij}-2x_ix_j/r^2)/(\pi^2r^4)$です。$W$からの負号を掛けて命題の位置空間表示を得ます。$x=0$ではこの通常関数表示だけで分布を定めず、接触項を区別します。$\square$
<!-- proof-end -->

符号を見て「電流相関が負だから不適切」と判断してはいけません。$-|k|P$は**局所接触項を差し引いた非解析的運動量核**です。離れた点の位置空間係数は上式のとおり正であり、Euclidの反射陽性を単なる各運動量固有値の非負性と同一視できません。

## 5. 境界ゲージ変換からWard恒等式へ

境界の縦成分$a_i\mapsto a_i+\partial_i\lambda_0$を変えても、$F$およびon-shell作用の非局所部分は変わりません。そこで境界理論にも**ゲージ異常のない源の不変性**を仮定します。電流が保存されるという式はこの不変性の汎関数版です。

<a id="prop-holo12-ward"></a>

<!-- formal-statement-start -->
> **命題（源のゲージ不変性と保存流Ward恒等式）**  
> 境界が$\mathbb R^d$で、$\lambda_0\in C_c^\infty(\mathbb R^d)$とし、境界理論の生成汎関数が$W[a+\partial\lambda_0]=W[a]$を満たすと仮定する。源微分が滑らかなコンパクト台の変分方向に対して存在すれば、分布の意味で

$$
\partial_i\langle J^i(x)\rangle_a=0.
$$

> さらに二次微分が存在するとき、荷電演算子の挿入がない2点関数では$k_i\langle J_i(k)J_j(-k)\rangle=0$が成立する。ただし局所的なWard接触項は、荷電演算子を挿入する場合には別途現れ得る。
<!-- formal-statement-end -->

### 証明の見取り図

境界源を$\partial_i\lambda_0$だけ変化させて$W$の第一変分を計算し、部分積分して$\lambda_0$の任意性を使います。その後さらに$a_j$で微分します。

<!-- proof-start -->
### 証明

[境界電流の定義](#def-holo12-current)から

$$
0=\delta_{\lambda_0}W
=\int d^dx\,\langle J^i(x)\rangle_a\,\partial_i\lambda_0(x)
=-\int d^dx\,\lambda_0(x)\,\partial_i\langle J^i(x)\rangle_a.
$$

$\lambda_0$は滑らかなコンパクト台の任意関数なので、分布の基本的な一意性により発散は零です。これを$a_j(y)$で微分し、Fourier変換で$\partial_i\mapsto ik_i$とすれば$k_i G_{ij}(k)=0$です。具体的に[本章の2点核](#prop-holo12-two-point)では

$$
k_iG_{ij}(k)
=-\frac{|k|}{g_F^2}\left(k_j-\frac{k_i k_i}{k^2}k_j\right)=0.
$$

ここでは$k\ne0$です。零波数、境界付き多様体、ゲージ異常、荷電挿入のある場合に対して、同じ境界項なしの式を無条件に主張しません。$\square$
<!-- proof-end -->

**位置空間での独立した検算**：$d=3$、$r=|x|>0$に対して$\partial_i(r^{-4}\delta_{ij})=-4x_jr^{-6}$です。一方、

$$
\partial_i(x_ix_jr^{-6})
=(3+1-6)x_jr^{-6}=-2x_jr^{-6}.
$$

従って$\partial_i[r^{-4}(\delta_{ij}-2x_ix_j/r^2)]=-4x_jr^{-6}+4x_jr^{-6}=0$。分離点での保存は直接成立します。$x=0$で何が起こるかは分布と接触項の問題で、[QFT49のWard接触項](../../QFT/QFT49/index.md#def-qft49-contact-term)を区別して読みます。

ゲージ不変な量は$F_{ab}$、閉曲線に沿う$\oint_\Gamma A$（指数化したWilsonループを含む）、および境界源の**ゲージ同値類**です。ただし閉曲線積分のゲージ不変性は$\lambda$が一価で滑らかな場合の$\oint_\Gamma d\lambda=0$に基づき、大域的な束・大きなゲージ変換の問題は本講の局所模型に含めません。これに対し$A_i$の個々の縦成分はゲージ不変な観測量ではありません。

## 6. 演習

### Level A：計算を単独で確認する

<a id="ex-holo12-a1"></a>

**HOLO12-A1（純ゲージを判定する）**  
$\lambda(z,x)=z^2x^1$で$A_a=\partial_a\lambda$とする。$A_z,A_1,F_{z1}$を計算し、Maxwell作用密度を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**：$A_z=\partial_z(z^2x^1)=2zx^1$、$A_1=\partial_1(z^2x^1)=z^2$、他の$A_i$は零です。$F_{z1}=\partial_z A_1-\partial_1 A_z=2z-2z=0$です。他の組の$F$も零なので$F_{ab}F^{ab}=0$、作用密度は零です。$A_a$が非零でも純ゲージであることを成分で確認しました。
<!-- solution-end -->

<a id="ex-holo12-a2"></a>

**HOLO12-A2（法線と運動量の負号）**  
$d=3$で$A_z=0$、$A_1=f(z)$とする。$z=\epsilon$の$n_z$、$\sqrt\gamma F^{z1}$、$\pi_\epsilon^1$を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**：$n^z=-\epsilon/L$、$g_{zz}=L^2/\epsilon^2$なので$n_z=-L/\epsilon$です。また$\sqrt\gamma=L^3/\epsilon^3$、$F^{z1}=\epsilon^4 f'(\epsilon)/L^4$から$\sqrt\gamma F^{z1}=\epsilon f'(\epsilon)/L$。これに$n_z/g_F^2$を掛けて

$$
\pi_\epsilon^1=-\frac{f'(\epsilon)}{g_F^2}.
$$

$d=3$では動径のべきが消え、紫外側の外向き法線の負号だけが残ります。
<!-- solution-end -->

<a id="ex-holo12-a3"></a>

**HOLO12-A3（1偏極の赤外正則解）**  
$d=3$、$k=(q,0,0)$、$q>0$、$a=(0,A,0)$として、径方向ゲージの$A_2(z,k)$と$\partial_zA_2(\epsilon,k)$を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**：$k\cdot a=0$なので境界源は横成分だけです。[横波方程式](#prop-holo12-radial-equations)は$A_2''-q^2A_2=0$で、一般解は$C e^{qz}+D e^{-qz}$。赤外で減衰させるため$C=0$、$A_2(\epsilon)=A$より$D=Ae^{q\epsilon}$。従って

$$
A_2(z,k)=Ae^{-q(z-\epsilon)},\qquad
\partial_z A_2(\epsilon,k)=-qA.
$$
<!-- solution-end -->

<a id="ex-holo12-a4"></a>

**HOLO12-A4（横射影の数値例）**  
$k=(3,4,0)$、$a=(1,2,3)$を与える。$a^L$、$a^T$を計算し、$k\cdot a^T=0$を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答**：$k^2=3^2+4^2=25$、$k\cdot a=3+8=11$です。定義より

$$
a^L=\frac{k(k\cdot a)}{k^2}
=\left(\frac{33}{25},\frac{44}{25},0\right),
\qquad
a^T=a-a^L=\left(-\frac8{25},\frac6{25},3\right).
$$

内積は$k\cdot a^T=3(-8/25)+4(6/25)=-24/25+24/25=0$です。
<!-- solution-end -->

<a id="ex-holo12-a5"></a>

**HOLO12-A5（源と電流の次元）**  
拡大$x'=\rho x$のもとで1形式の境界源$a_i$が$\rho^{-1}$倍になるとする。$d=3$で$\int d^3x\,a_iJ^i$の不変性から電流の次元を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答**：測度は$d^3x'=\rho^3d^3x$、源は$a'_i=\rho^{-1}a_i$なので、$J'^i=\rho^{-\Delta_J}J^i$なら結合全体は$\rho^{3-1-\Delta_J}$倍です。任意の$\rho>0$でこれを1とするには$3-1-\Delta_J=0$、よって$\Delta_J=2=d-1$です。
<!-- solution-end -->

### Level B：境界辞書とWard恒等式を接続する

<a id="ex-holo12-b1"></a>

**HOLO12-B1（2次作用から二回微分する）**  
$d=3$、$k\ne0$で$A_i(z,k)=e^{-k(z-\epsilon)}P_{ij}a_j+a_i^L$とする。[境界運動量](#prop-holo12-boundary-variation)からon-shell作用、$W=-S$の一階・二階源微分を導け。

- Level: B

<!-- solution-start -->
**詳細解答**：微分すると$\partial_zA_i(\epsilon,k)=-kP_{ij}a_j$で、縦成分は微分で消えます。従って$\pi_i=kP_{ij}a_j/g_F^2$。[作用の二次性](#prop-holo12-two-point)から

$$
S_{\mathrm{os}}=\frac{1}{2g_F^2}\int\frac{d^3k}{(2\pi)^3}a_i(-k)kP_{ij}a_j(k).
$$

$P_{ij}=P_{ji}$、$P^2=P$であるため、$a_j(k)$による一階微分は$\delta S/\delta a_i(-k)=kP_{ij}a_j(k)/g_F^2$です。$W=-S$なので電流はこの負号付き、一階微分を再び行うと$\delta^2W/\delta a_i(-k)\delta a_j(k)=-kP_{ij}/g_F^2$となります。境界方向の積分に由来する$(2\pi)^3\delta^{(3)}(k+k')$は縮約核の表示では省略します。
<!-- solution-end -->

<a id="ex-holo12-b2"></a>

**HOLO12-B2（Ward恒等式の二つの確認）**  
$d=3$で$G_{ij}(k)=-|k|P_{ij}/g_F^2$とする。$k_iG_{ij}=0$を計算せよ。さらに位置空間の$I_{ij}(x)/r^4$（$I_{ij}=\delta_{ij}-2x_ix_j/r^2$）が$r>0$で発散零であることを直接示せ。

- Level: B

<!-- solution-start -->
**詳細解答**：$k_iP_{ij}=k_j-(k_i k_i)k_j/k^2=0$より$k_iG_{ij}=0$です。位置空間では$\partial_i r^{-4}=-4x_i r^{-6}$なので$\partial_i(\delta_{ij}r^{-4})=-4x_jr^{-6}$。積の微分により

$$
\partial_i(x_ix_jr^{-6})
=(\partial_i x_i)x_jr^{-6}
+x_i(\partial_i x_j)r^{-6}
+x_ix_j(\partial_i r^{-6})
$$

$$
=3x_jr^{-6}+x_jr^{-6}-6x_i x_i x_jr^{-8}
=(3+1-6)x_jr^{-6}=-2x_jr^{-6}.
$$

従って$\partial_i(I_{ij}/r^4)=-4x_jr^{-6}-2(-2x_jr^{-6})=0$です。この計算は$r=0$の接触項を決定しません。
<!-- solution-end -->

<a id="ex-holo12-b3"></a>

**HOLO12-B3（非局所核の位置空間係数）**  
$\mathcal F^{-1}[1/|k|]=1/(2\pi^2r^2)$（$r>0$）を出発点とし、$G_{ij}(k)=-|k|(\delta_{ij}-k_ik_j/k^2)/g_F^2$の位置空間表示を微分だけで求めよ。

- Level: B

<!-- solution-start -->
**詳細解答**：$|k|=k^2/|k|$なので$k^2$は位置空間で$-\Delta$に対応します。$d=3$では$\Delta r^{-2}=2r^{-4}$より$\mathcal F^{-1}[|k|]=-1/(\pi^2r^4)$。一方、

$$
\partial_i\partial_j r^{-2}
=-2\delta_{ij}r^{-4}+8x_ix_jr^{-6}
$$

から

$$
\mathcal F^{-1}[k_i k_j/|k|]
=-\frac{1}{2\pi^2}\partial_i\partial_j r^{-2}
=\frac{\delta_{ij}}{\pi^2r^4}-\frac{4x_ix_j}{\pi^2r^6}.
$$

よって$\mathcal F^{-1}[|k|P_{ij}]=-2\delta_{ij}/(\pi^2r^4)+4x_ix_j/(\pi^2r^6)$。$G$の係数$-1/g_F^2$を掛けて

$$
G_{ij}(x)=\frac{2}{\pi^2g_F^2r^4}
\left(\delta_{ij}-2\frac{x_ix_j}{r^2}\right),\qquad r>0.
$$

零点の接触項は求めていないので、最後に$r>0$を明示します。
<!-- solution-end -->

<a id="ex-holo12-b4"></a>

**HOLO12-B4（$d=4$で裸の応答を使えない理由）**  
$d=4$の横波方程式$A''-z^{-1}A'-k^2A=0$に対して、$k\ne0$、$z\downarrow0$の近似解$A(z)=a+c z^2\log(z/\ell)+b z^2+\cdots$を代入する。$c$を求め、なぜ境界運動量に対数発散が起こるか説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答**：$\ell>0$は対数を無次元にする固定長さです。$z^2\log(z/\ell)$の一階微分は$2z\log(z/\ell)+z$、二階微分は$2\log(z/\ell)+3$です。従って

$$
\left(\partial_z^2-z^{-1}\partial_z\right)
[z^2\log(z/\ell)]=2.
$$

また$\left(\partial_z^2-z^{-1}\partial_z\right)z^2=0$なので、微分方程式の定数項は$2c-k^2a=0$、従って$c=k^2a/2$です。$d=4$では[境界運動量](#prop-holo12-boundary-variation)に$z^{3-d}=z^{-1}$が掛かります。従って

$$
\pi_\epsilon\sim-\frac{L}{g_F^2}\frac{A'(\epsilon)}{\epsilon}
=-\frac{L}{g_F^2}
\left[k^2a\log(\epsilon/\ell)+\frac{k^2a}{2}+2b+\cdots\right].
$$

$k\ne0$で対数が発散するので、$d=3$の有限応答を$d=4$へ機械的に移せません。局所反項を指定してから応答を定める必要があります。
<!-- solution-end -->

### Level C：一つのモデルを最初から最後まで

<a id="ex-holo12-c1"></a>

**HOLO12-C1（境界ゲージ場から保存電流の2点関数まで）**  
固定Euclid $AdS_4$で、$g_F^2>0$、$k=(q,0,0)$、$q>0$とし、Maxwell作用と$W=-S_{E,\mathrm{ren}}$を使う。境界源$a=(\alpha,\beta,0)$に対して次を順に導け。

1. 境界源の横成分・縦成分と、正則なバルク解。
2. 紫外法線の符号を含めた境界運動量およびon-shell作用のモード寄与。
3. 電流の一階応答と2点の縮約核$G_{ij}(k)$。
4. $k_iG_{ij}=0$の確認、$\alpha$を変えたときの作用不変性。
5. 分離点の位置空間2点関数と次元の整合性。

- Level: C

<!-- solution-start -->
**詳細解答**：

**（1）横・縦とバルク解**：$k^2=q^2$より$P=\mathrm{diag}(0,1,1)$。従って$a^L=(\alpha,0,0)$、$a^T=(0,\beta,0)$です。[径方向ゲージの解](#prop-holo12-radial-equations)は

$$
A_z=0,\quad A_1(z,k)=\alpha,\quad
A_2(z,k)=\beta e^{-q(z-\epsilon)},\quad A_3(z,k)=0.
$$

$A_1$は$x^1$方向の勾配で生じる純ゲージ部分です。$F_{z2}=-q\beta e^{-q(z-\epsilon)}$、$F_{12}=iq\beta e^{-q(z-\epsilon)}$だけが横の非零場強度に対応します。

**（2）境界運動量と作用**：$z=\epsilon$の外向き法線は$n_z=-L/\epsilon$です。[境界変分の公式](#prop-holo12-boundary-variation)で$d=3$とし、$\pi^i=-\partial_z A_i/g_F^2$へ代入すると

$$
\pi^1=0,\qquad \pi^2=\frac{q\beta}{g_F^2},\qquad \pi^3=0.
$$

実場のFourier成分では、$k$と$-k$を対にして数えます。係数を明確にするため、体積$V$の周期箱で$a_i(x)=V^{-1/2}\sum_k e^{ik\cdot x}a_i(k)$と規格化し、$k=(q,0,0)$の成分を$a_2(k)=\beta$、逆波数の成分を$a_2(-k)=\beta^*$とします。このとき、[二次作用](#prop-holo12-two-point)の各波数の寄与と、二つを合わせた寄与はそれぞれ

$
S_{\mathrm{os}}^{(k)}=\frac{q|\beta|^2}{2g_F^2},\qquad
S_{\mathrm{os}}^{(k,-k)}=\frac{q|\beta|^2}{g_F^2}.
$

従って対全体に$1/2$を二重に掛けてはいけません。$\alpha$は$F=0$の縦成分で作用に入らず、$q>0$で赤外減衰条件を課した横解だけが寄与します.

**（3）辞書と2点**：$W=-S$より電流応答は$\langle J_1\rangle=0$、$\langle J_2\rangle=-q\beta/g_F^2$、$\langle J_3\rangle=0$です。一般の入力方向に線形にした核は

$$
G_{ij}(k)=-\frac{q}{g_F^2}
\begin{pmatrix}
0&0&0\\
0&1&0\\
0&0&1
\end{pmatrix}_{ij}.
$$

**（4）Wardとゲージ**：$k_iG_{ij}=qG_{1j}=0$です。$\alpha$だけを変更するのは$a_1\mapsto a_1+iq\lambda_0$に相当し、$F$も$S$も不変です。この操作は物理的な横偏極を変えません。

**（5）位置空間と次元**：[三次元境界の横射影された保存流2点関数](#prop-holo12-two-point)から$x\ne0$では

$$
G_{ij}(x)=\frac{2}{\pi^2g_F^2|x|^4}
\left(\delta_{ij}-2\frac{x_ix_j}{|x|^2}\right).
$$

$d=3$における[電流の次元](#prop-holo12-current-dimension)は2なので、2点の距離冪は$|x|^{-2\cdot2}=|x|^{-4}$と一致します。$x=0$の分布的接触項や、一般のCFTにおける係数の正規化をこの自由Maxwell模型だけで固定したとは主張しません。
<!-- solution-end -->

## 7. まとめと次講

Maxwell作用を有限cutoffで変分すると、$z=\epsilon$の外向き法線の負号が境界運動量を定めます。径方向ゲージでは縦成分は純ゲージで、非零波数で伝播するのは横成分だけです。$d=3$の赤外減衰解は$e^{-|k|z}$となり、非局所2点核が$-|k|P_{ij}/g_F^2$に固定されます。境界源のゲージ不変性から得たWard恒等式は、この横射影の零固有方向と一致しました。

ここで得た電流は、境界に**ベクトル源**を与えると生じる応答です。次のHOLO13では源を**境界計量**へ置き換え、バルク重力作用の変分から応力テンソルを読むときの境界項を検討します。