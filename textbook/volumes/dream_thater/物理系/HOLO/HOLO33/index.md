# HOLO33 何が双対で何が未解決か

<!-- definition-example-audit: strict -->

[HOLO9のGKPW 2点関数](../HOLO9/index.md#prop-holo9-two-point)、[HOLO18の区間RT計算](../HOLO18/index.md#thm-holo18-interval-coefficient)、[HOLO29の消失訂正](../HOLO29/index.md#thm-holo29-three-representations)は、いずれも境界とバルクを結ぶ成果です。しかし一つの計算が正しいことと、任意の境界理論・任意の時空について完全な双対性が証明されたことは違います。本講では各式の**模型・状態・正則化・近似・論証の入力**を見えるようにします。

これまで、AdS幾何から相関関数、面積・エントロピー、部分領域再構成、線形重力拘束まで学びました。残る問題は「どこまで同じ理論の異なる表現と言えるのか」です。そのため二つの境界観測量を実際に計算し、別に有限次元符号の復号器を組み立て、何が証明されなかったかを区別します。

## 0. 何を比べるか

以下の幾何の計算は、境界が2次元の平坦な真空CFT、バルクが半古典的な純 $AdS_3$ のPoincaré patchである設定です。$L>0$ をAdS半径、$G_3>0$ を三次元Newton定数、$c_{\mathrm{CFT}}$ を中心電荷とし、$\hbar=1$ とします。Lorentz符号は $(-,+,+)$ です。

$$
ds^2=\frac{L^2}{z^2}(-dt^2+dx^2+dz^2),\qquad z>0.
$$

場の2点関数では時間をEuclid化し、区間エントロピーでは時刻 $t=0$ の正定値計量 $L^2(dx^2+dz^2)/z^2$ を用います。Euclid相関関数を実時間の任意の時間順序相関関数と混同しません。

<a id="def-holo33-claim-scope"></a>

<!-- formal-statement-start -->
> **定義（双対性の主張の条件票）**  
> 境界とバルクを対応させる個々の主張に対し、その**条件票**とは、次の四種類の情報を明記した組である。
>
> - 境界理論とバルク模型。
> - 状態と観測量または領域。
> - 極限・近似次数・正則化。
> - 計算で導いた部分と辞書として仮定した部分。
>
> 四成分の記号は順に、$\mathcal M$ が模型、$\mathcal S$ が状態と観測対象、$\mathcal A$ が近似・正則化、$\mathcal J$ が導出済み部分と入力した辞書を表す。
>
$$
\mathcal R=(\mathcal M,\mathcal S,\mathcal A,\mathcal J).
$$
>
> 異なる条件票の等式は、対象・仮定の対応を追加検証しない限り互いの証明とはならない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo33-claim-scope -->
**定義の確認**。 RT区間の条件票を確認します。模型 $\mathcal M$ は純 $AdS_3$ と真空CFTです。対象 $\mathcal S$ は区間 $[-a,a]$ のエントロピー、近似 $\mathcal A$ は共通cutoffと古典面積次数です。ここで面積項の次数は $O(G_3^{-1})$ です。論証 $\mathcal J$ では測地線長を積分で導き、RTの同定そのものは入力します。

次に3-qutrit消失訂正の条件票を確認します。模型は有限Hilbert空間への等長符号、対象は任意の論理状態と一つの消失領域です。近似は不要で有限次元の厳密な等号を使います。論証では保持した二つのqutritの**計算基底ラベルの置換**によって復号器を構成します。四項を別々に確認したので、後者の等式だけでは前者の重力方程式を証明できない理由も分かります。
<!-- definition-example-end -->

## 1. AdS/CFT辞書には何が入力されるか

[HOLO9のGKPW辞書](../HOLO9/index.md#def-holo9-gkpw)では、境界の源 $J$ とバルク場の境界係数 $\phi_{(0)}$ を対応させます。Euclidの選択した真空・境界条件で、半古典的な鞍点近似を使う場合、

$$
Z_{\mathrm{CFT}}[J]\simeq
\exp\left(-S_{\mathrm{bulk,ren}}^{\mathrm{on-shell}}[\phi_{(0)}=J]\right)
$$

と評価します。右辺は必要な境界項・反項を含む繰り込み済み作用です。$\simeq$ は**近似**であり、鞍点一つの計算を厳密な全量子経路積分の等号とはしません。二回の源変分から得る非接触2点関数と、局所反項で変わり得る接触項も区別します。

[HOLO6の大$N$・結合と弦補正の検算](../HOLO6/index.md#def-holo6-controlled-window)が示すように、大$N$のみで弱曲率の局所Einstein重力が保証されるわけではありません。ループ抑制に加え、弦補正・軽い高スピン励起等を抑える別の条件が必要です。代表的な超対称模型での強い整合性の証拠を、任意の非超対称CFTに対する普遍定理へ拡張してはいけません。

| 対応 | ここで確認できる対象 | 追加なしには言えないこと |
| --- | --- | --- |
| 場と演算子 | 固定背景・指定境界条件・摂動次数での相関関数 | 全CFTの厳密な局所重力双対 |
| 面とエントロピー | 静的RT、共変HRT、FLMとQESの各条件下の結果 | 全状態で古典面積だけが厳密な答え |
| 境界領域とバルク作用素 | コード部分空間におけるHKLL・JLMS・再構成 | 全状態での有限$N$の厳密な局所演算子 |
| 量子誤り訂正 | 有限次元の等長写像と復号器 | 連続時空の動力学・蒸発の普遍的復号 |

## 2. 同じ $AdS_3$ 背景での二つの独立な検算

### 2.1 Euclidスカラーの2点関数

この小節ではEuclid境界の2点を $u,v\in\mathbb R^2$、その距離を $r=|u-v|$ と書き、Lorentz側で使った空間座標 $x$ と区別します。Euclid $AdS_3$ 上の実スカラーの作用を $S_\phi=\frac12\int\sqrt g\,[(\nabla\phi)^2+m^2\phi^2]$ と規格化します。$d=2,\nu=1/2,\Delta_+=d/2+\nu=3/2$ とし、**標準量子化**と内部の正則条件を選びます。[HOLO8の質量・次元関係](../HOLO8/index.md#prop-holo8-mass-dimension)により

$$
m^2L^2=\Delta(\Delta-d)=\frac32\left(-\frac12\right)
=-\frac34>-1=-\frac{d^2}{4}.
$$

BF境界を満たしますが、この質量では代替量子化も選択肢となり得るため、境界条件の指定が重要です。$0<\nu<1$ なので[HOLO9の自由スカラー2点関数命題](../HOLO9/index.md#prop-holo9-two-point)を適用できます。異なるEuclid境界点 $u\ne v$ について

$$
\begin{aligned}
G(u,v)
&=\frac{(2\Delta-d)L^{d-1}\Gamma(\Delta)}
{\pi^{d/2}\Gamma(\Delta-d/2)}
\frac1{|u-v|^{2\Delta}}\\
&=\frac{L\Gamma(3/2)}{\pi\Gamma(1/2)}
\frac1{|u-v|^3}
=\frac{L}{2\pi|u-v|^3}.
\end{aligned}
$$

$\Gamma(3/2)=\sqrt\pi/2$、$\Gamma(1/2)=\sqrt\pi$ を使いました。スカラー作用の前置係数を $q$ 倍すれば $G$ の係数も $q$ 倍となります。分離点の距離指数と同一点の接触項は別です。実時間への解析接続には状態・時間輪郭・境界値を指定する必要があります。

### 2.2 真空区間の古典RT量

境界の時刻0の区間 $A=[-a,a]$、$a>0$、長さ $\ell=2a$ と、cutoff $0<\epsilon<a$ を固定します。半円 $x=a\cos\theta,z=a\sin\theta$ の $z\ge\epsilon$ 部分を使い、$\theta_\epsilon=\arcsin(\epsilon/a)$ と置きます。接ベクトルは $(dx/d\theta,dz/d\theta)=(-a\sin\theta,a\cos\theta)$ なので

$$
ds=\frac{L}{a\sin\theta}
\sqrt{a^2\sin^2\theta+a^2\cos^2\theta}\,d\theta
=\frac{L}{\sin\theta}\,d\theta.
$$

[HOLO18の正則化長](../HOLO18/index.md#prop-holo18-regulated-length)と同じ計算を実行すると

$$
\begin{aligned}
D_\epsilon(a)
&=L\int_{\theta_\epsilon}^{\pi-\theta_\epsilon}
\frac{d\theta}{\sin\theta}
=2L\log\cot\frac{\theta_\epsilon}{2}\\
&=2L\log\frac{a+\sqrt{a^2-\epsilon^2}}{\epsilon}
=2L\log\frac{\ell}{\epsilon}
+O\!\left(\frac{L\epsilon^2}{a^2}\right).
\end{aligned}
$$

最後の等号は $\cot(\theta/2)=(1+\cos\theta)/\sin\theta$ と $\sqrt{a^2-\epsilon^2}=a+O(\epsilon^2/a)$ によります。さらに[HOLO18の区間RT処方](../HOLO18/index.md#thm-holo18-interval-coefficient)を**静的真空・古典重力の範囲**に入力し、$c_{\mathrm{CFT}}=3L/(2G_3)$ を使うと

$$
S_{\mathrm{RT},\epsilon}^{(0)}(A)
=\frac{D_\epsilon(a)}{4G_3}
=\frac{c_{\mathrm{CFT}}}{3}\log\frac{\ell}{\epsilon}
+O\!\left(\frac{L\epsilon^2}{G_3a^2}\right).
$$

曲線長の積分は幾何学の計算です。それを境界エントロピーに同定する段階にはRT処方という独立の入力があります。カットオフ依存の定数や量子補正はこの主項では定まりません。

### 2.3 規格化・cutoffを消せる比較

<a id="prop-holo33-two-checks"></a>

<!-- formal-statement-start -->
> **命題（分離点相関の比と区間エントロピーの差）**  
> 前節のEuclid自由スカラーの標準量子化・木レベル・分離点条件のもとで、距離 $r_1,r_2>0$ の相関関数 $G(r)$ を取る。また静的純 $AdS_3$ の半幅 $a_1,a_2>0$ の二つの区間について、同じ $L,G_3$ と共通cutoff $0<\epsilon<\min(a_1,a_2)$ の古典RT量 $S_\epsilon^{(0)}(a)$ を取る。このとき
>
$$
\frac{G(r_2)}{G(r_1)}
=\left(\frac{r_1}{r_2}\right)^3
$$
>
> と
>
$$
\lim_{\epsilon\downarrow0}
\left[S_\epsilon^{(0)}(a_2)-S_\epsilon^{(0)}(a_1)\right]
=\frac{c_{\mathrm{CFT}}}{3}\log\frac{a_2}{a_1}
$$
>
> が成立する。二つの等式はそれぞれの条件下の独立な検算であり、相関関数とエントロピーを同じ観測量とみなすものではない。
<!-- formal-statement-end -->

**証明の見取り図。** 分離点2点関数では共通の係数を消し、RT量では**有限cutoffで差を取ってから極限へ進む**ので共通の発散項が消えます。

<!-- proof-start -->
### 証明

[HOLO9の自由スカラー2点関数](../HOLO9/index.md#prop-holo9-two-point)に $d=2,\Delta=3/2$ を代入した $G(r)=L/(2\pi r^3)$ は $r>0$ で非零です。従って

$$
\frac{G(r_2)}{G(r_1)}
=\frac{L/(2\pi r_2^3)}{L/(2\pi r_1^3)}
=(r_1/r_2)^3.
$$

[HOLO18の有限cutoff長](../HOLO18/index.md#prop-holo18-regulated-length)を二つの区間に適用すると

$$
\begin{aligned}
S_\epsilon^{(0)}(a_2)-S_\epsilon^{(0)}(a_1)
&=\frac{L}{2G_3}
\left[
\log\frac{a_2+\sqrt{a_2^2-\epsilon^2}}{\epsilon}
-\log\frac{a_1+\sqrt{a_1^2-\epsilon^2}}{\epsilon}
\right]\\
&=\frac{L}{2G_3}\log
\frac{a_2+\sqrt{a_2^2-\epsilon^2}}
{a_1+\sqrt{a_1^2-\epsilon^2}}.
\end{aligned}
$$

固定した $a_i>0$ について $\sqrt{a_i^2-\epsilon^2}\to a_i$。対数の引数は正なので連続性から極限は $(L/(2G_3))\log(2a_2/(2a_1))$ です。最後に $c_{\mathrm{CFT}}=3L/(2G_3)$ を代入すると主張を得ます。発散する二つの量を個別に有限値とみなしていません。$\square$
<!-- proof-end -->

例えば $r_2=2r_1$ の相関比は $1/8$、$a_2=2a_1$ のエントロピー差は $(c_{\mathrm{CFT}}/3)\log2$ です。これらは同じ背景に対する**異なる**観測量の予測です。

## 3. RT・HRT・FLM・QESは何が違うか

[HOLO19の相同条件](../HOLO19/index.md#def-holo19-homology)は境界アンカーだけでは面候補を指定しきれないことを示します。古典RTは共通時間断面上の適切な最小面、[HOLO22のHRT](../HOLO22/index.md#def-holo22-null-expansion)は時間依存の共変的な極値面を扱います。[HOLO23のFLM補正](../HOLO23/index.md#prop-holo23-counterterm)では面積の $O(G_3^{-1})$ 項にバルク量子エントロピー等の $O(G_3^0)$ 項を加え、発散は面積・局所反項と整合的に処理します。[HOLO24のQES定義](../HOLO24/index.md#def-holo24-qes)では和の一般化エントロピーを全許容法線方向で極値化し、候補間の選択も行います。

| 手段 | 幾何条件・変分対象 | 言える次数と限界 |
| --- | --- | --- |
| RT | 静的な断面、アンカーと相同条件、最小面 | 古典的面積主項 |
| HRT | Lorentz時空での空間的余次元2の極値面 | 古典的主項、因果・エネルギー等の条件が必要 |
| FLM | 古典面上の面積とバルク量子補正 | $O(G_3^0)$、裸のバルクエントロピーだけではない |
| QES | 繰り込み済み $S_{\mathrm{gen}}$ 全体の極値面と候補比較 | 形状変分・複数候補・状態条件を含む |

**一方向の直接計算。** 許容面のある局所的な法線変位座標 $x$（Poincaré patchの空間座標とは別の変数）に沿って、繰り込み済みの和を

$$
S_{\mathrm{gen}}(x)=\frac{A_0+\kappa x^2/2}{4G_3}+s_0+qx,
\qquad \kappa,G_3>0
$$

と仮定します。これは実際のAdS状態から導いた曲面族ではなく、変分順序を調べる模型です。ここでプライムは $d/dx$、すなわち変位 $x$ に関する微分です。$S'_{\mathrm{gen}}(x)=\kappa x/(4G_3)+q$ なので停留位置は $x_*=-4G_3q/\kappa$。値の変化は

$$
\begin{aligned}
S_{\mathrm{gen}}(x_*)-S_{\mathrm{gen}}(0)
&=\frac{\kappa x_*^2}{8G_3}+qx_*\\
&=\frac{2G_3q^2}{\kappa}-\frac{4G_3q^2}{\kappa}
=-\frac{2G_3q^2}{\kappa}.
\end{aligned}
$$

$q,\kappa$ を固定すると移動は $O(G_3)$、最初の値の修正は $O(G_3)$ です。従って古典面上で $O(1)$ の量子項を評価するFLMと矛盾しません。しかし**一方向の停留性は全方向のQES条件ではなく**、時間的方向では最小ではないこともあります。

## 4. 領域再構成の厳密な有限模型と重力への距離

[HOLO26のHKLL再構成](../HOLO26/index.md#def-holo26-smearing-kernel)は指定した自由場・境界条件のモード構成、[HOLO27の部分領域再構成](../HOLO27/index.md#def-holo27-subregion-reconstruction)は符号空間上の演算子同値、[HOLO28のJLMS模型](../HOLO28/index.md#thm-holo28-fixed-sector-jlms)はモジュラー量と相対エントロピーの比較です。いずれも作用する空間・近似次数を落とせません。

[HOLO29の3-qutrit符号](../HOLO29/index.md#thm-holo29-three-representations)を一つ具体的に復号します。$\mathbb Z_3$ の加減算は3を法とします。論理レジスタ $L$ と物理レジスタ $A,B,C$ のHilbert空間はいずれも $\mathbb C^3$ です。下付きの $L$ は論理レジスタ名であり、AdS半径 $L$ とは別です。

$$
V|j\rangle_L=\frac1{\sqrt3}\sum_{i=0}^2
|i\rangle_A|i+j\rangle_B|i+2j\rangle_C,
\qquad j\in\mathbb Z_3.
$$

異なる $(i,j)$ の三つ組 $(i,i+j,i+2j)$ は相異なる計算基底を指定します。従って固定した $j$ での3項は直交し、異なる $j,k$ の符号語にも共通の基底項がありません。よって $\langle j|V^\dagger V|k\rangle=\delta_{jk}$、すなわち $V^\dagger V=I_L$ です。$A$ が消失し、$BC$ に $(b,c)=(i+j,i+2j)$ が残るとき、引き算で $j=c-b$、代入で $i=2b-c$ と求められます。復号後の第2因子に計算基底ラベル $i$ を保持する補助レジスタ $G\simeq\mathbb C^3$ を導入します。これにより

$$
U_{BC}|b,c\rangle=|c-b\rangle_L|2b-c\rangle_G
$$

を定義します。逆は $(j,i)\mapsto(b,c)=(i+j,i+2j)$。9個の基底間の全単射なので $U_{BC}$ はユニタリです。任意の論理状態 $|\psi\rangle=\sum_j\alpha_j|j\rangle$ について

$$
\begin{aligned}
(I_A\otimes U_{BC})V|\psi\rangle
&=\frac1{\sqrt3}\sum_{i,j}\alpha_j
|i\rangle_A|j\rangle_L|i\rangle_G\\
&=|\psi\rangle_L\otimes
\frac1{\sqrt3}\sum_i|i\rangle_A|i\rangle_G.
\end{aligned}
$$

$A$ を捨てた後も、$G$ をトレースすれば論理状態は完全に残ります。式が任意の $\alpha_j$ に線形に成立するので混合状態・参照系とのもつれでも同じ復号を使えます。一方 $BC$ が失われた場合、[HOLO29の一領域秘匿の計算](../HOLO29/index.md#def-holo29-region-recovery)では残る $A$ は入力 $\rho$ にかかわらず $I_A/3$ です。異なる入力を同じ出力へ送る写像に逆写像はありません。

これは有限Hilbert空間での厳密な結果ですが、符号には時空計量もEinstein作用も存在しません。[HOLO30の作用素代数RT型模型](../HOLO30/index.md#thm-holo30-algebraic-rt)や[HOLO31の離散エントロピー模型](../HOLO31/index.md#thm-holo31-discrete-entropy)も、連続した重力の運動方程式を追加仮定なしに導くものではありません。「復号の存在」と「効率的な復号手続の存在」も別問題です。

## 5. 第一法則は非線形方程式の証明ではない

[HOLO28のエンタングルメント第一法則](../HOLO28/index.md#prop-holo28-first-law)を有限状態で確認します。$|\lambda|<1/3$ として $\rho(\lambda)=\operatorname{diag}(1/3+\lambda,2/3-\lambda)$、$K_0=-\log\rho(0)$ とします。$S(\rho)=-\operatorname{Tr}(\rho\log\rho)$ はvon Neumannエントロピーで、$K_0$ は $\lambda$ に依存しません。ここでの $d/d\lambda$ とプライムはどちらも $\lambda$ を動かす微分です。すると

$$
\left.\frac{dS(\rho(\lambda))}{d\lambda}\right|_0
=-\log(1/3)+\log(2/3)=\log2
=\left.\frac{d}{d\lambda}\operatorname{Tr}(\rho(\lambda)K_0)\right|_0.
$$

ところが $S''(0)=-1/(1/3)-1/(2/3)=-9/2$ なので、有限差は

$$
S(\rho(\lambda))-S(\rho(0))
=\lambda\log2-\frac94\lambda^2+O(\lambda^3)
$$

となり、$\Delta\langle K_0\rangle=\lambda\log2$ との一致は一次に限られます。[HOLO32の積分Einstein拘束](../HOLO32/index.md#thm-holo32-integrated-gravity-constraint)は、真空球の第一法則と適切な重力変分恒等式を結んだ**線形応答**です。一つの球の積分拘束だけから点ごとの全成分は出ません。境界方向の成分を得るには全ての球・Lorentz方向と積分変換の単射性が必要です。**動径成分を求める段階では、線形化Bianchi恒等式と動径方向の境界条件も必要**です。非線形方程式、全状態、蒸発ブラックホールの復号をこの一次等式から主張できません。

## 6. 確立した模型と残る問いを仕分ける

| 問題 | 計算・証拠の射程 | ここでは未導出・別の研究課題 |
| --- | --- | --- |
| 代表的AdS/CFT | 制御された極限、相関・スペクトル・熱状態など多方面の整合性 | 一般の非超対称CFTすべてに弱曲率の重力双対があるという普遍定理 |
| RT/HRT/FLM/QES | 指定した静的・共変・量子補正の模型と近似 | 任意状態で裸の面積と裸のエントロピーを単純に足せること |
| 部分領域再構成 | コード部分空間上のHKLL/JLMS、有限次元の厳密復号 | 全Hilbert空間・内部を含む一般的再構成、効率的な普遍復号 |
| 宇宙・天体への適用 | AdS境界を持つ理論の道具 | 実天体の漸近平坦時空やde Sitter宇宙への同じ辞書の直接適用 |
| 蒸発・factorization | 半古典鞍点と量子情報が与える重要な制約 | 全模型での微視的蒸発復号、連結鞍点と境界因数分解の一般的解決 |

例えば独立な二つの境界系について、厳密な分配関数は積の構造を持つ設定がありますが、重力の鞍点計算では連結した寄与が現れ得ます。この**factorization問題**では重力経路積分の解釈・許される状態・理論の指定が必要です。島公式、replica wormhole、蒸発過程のPage曲線の扱いは別の量子重力模型を定める問題であり、この33講の有限符号の演習だけでは解決しません。

## 7. 演習と詳細解答

### Level A：仮定・係数・限界を確かめる

<a id="ex-holo33-a01"></a>
### A1. スカラーの境界次元
- Level: A
- 問題: Euclid $AdS_3$ で $d=2,\Delta_+=3/2$ を標準量子化として採用する。$m^2L^2,\nu$、BF境界との大小、$G(3r)/G(r)$ を求めよ。

<!-- solution-start -->
**詳細解答。** [HOLO8の質量・次元関係](../HOLO8/index.md#prop-holo8-mass-dimension)から $m^2L^2=(3/2)(3/2-2)=-3/4$、$\nu=\Delta-d/2=1/2$。BF境界は $-d^2/4=-1$ で、$-3/4>-1$ です。[HOLO9の2点関数](../HOLO9/index.md#prop-holo9-two-point)の適用範囲 $0<\nu<1$ を満たすので、分離点では $G(r)\propto r^{-2\Delta}=r^{-3}$。従って $G(3r)/G(r)=3^{-3}=1/27$。この質量では代替量子化も候補となるため、標準量子化という指定は省けません。
<!-- solution-end -->

<a id="ex-holo33-a02"></a>
### A2. cutoff測地線長
- Level: A
- 問題: $a>\epsilon>0$ とし、$x=a\cos\theta,z=a\sin\theta$ の $z\ge\epsilon$ の部分について、$D_\epsilon(a)$ を積分し、$D_\epsilon(a)-2L\log(2a/\epsilon)\to0$ を示せ。

<!-- solution-start -->
**詳細解答。** $\theta_\epsilon=\arcsin(\epsilon/a)$ とおきます。$dx^2+dz^2=a^2d\theta^2$ より $ds=L\,d\theta/\sin\theta$ です。

$$
D_\epsilon(a)=L\int_{\theta_\epsilon}^{\pi-\theta_\epsilon}
\frac{d\theta}{\sin\theta}
=2L\log\frac{a+\sqrt{a^2-\epsilon^2}}{\epsilon}.
$$

$\int d\theta/\sin\theta=\log\tan(\theta/2)$ と半角公式を使いました。差は $2L\log[(1+\sqrt{1-(\epsilon/a)^2})/2]$ で、括弧内が1へ収束するので0となります。これは[HOLO18のRT幾何量](../HOLO18/index.md#def-holo18-regulated-rt-length)の計算で、境界エントロピーへの同定は別の入力です。
<!-- solution-end -->

<a id="ex-holo33-a03"></a>
### A3. 次数と繰り込み
- Level: A
- 問題: $L$ と古典面の形を固定し、$G_3\downarrow0$ とする。$A_0=O(1),S_{\mathrm{bulk,ren}}=O(1)$ なら $A_0/(4G_3)$ と量子項の次数は何か。裸の $S_{\mathrm{bulk}}$ を有限と仮定してよいか。

<!-- solution-start -->
**詳細解答。** 面積項は $O(G_3^{-1})$、量子・局所補正は $O(G_3^0)$ です。$A_0$ の $G_3$ 独立性と、$S_{\mathrm{bulk,ren}}$ が繰り込み済みであるという仮定を使いました。[HOLO23の反項の扱い](../HOLO23/index.md#prop-holo23-counterterm)により、連続体で裸のエントロピーは発散し得るため、それ単独をcutoff除去後の有限数とみなすことはできません。
<!-- solution-end -->

<a id="ex-holo33-a04"></a>
### A4. 一次変分と有限差
- Level: A
- 問題: $\rho(\lambda)=\operatorname{diag}(1/3+\lambda,2/3-\lambda)$（$|\lambda|<1/3$）、$K_0=-\log\rho(0)$ とする。$S'(0)$、$\langle K_0\rangle'(0)$、$S''(0)$ を求めよ。

<!-- solution-start -->
**詳細解答。** $p=1/3+\lambda$ と置けば $S=-p\log p-(1-p)\log(1-p)$ です。以下のプライムは $d/d\lambda$ を意味し、$dp/d\lambda=1$ です。

$$
S'=-\log p+\log(1-p),\qquad
S''=-1/p-1/(1-p).
$$

従って $S'(0)=\log2,S''(0)=-3-3/2=-9/2$。一方、$\langle K_0\rangle=-p\log(1/3)-(1-p)\log(2/3)$ から $\langle K_0\rangle'(0)=\log2$。一次が等しいのは[エンタングルメント第一法則](../HOLO28/index.md#prop-holo28-first-law)で、二階微分が異なるので有限差の完全な等号ではありません。
<!-- solution-end -->

<a id="ex-holo33-a05"></a>
### A5. 一領域の秘匿
- Level: A
- 問題: $V|j\rangle=3^{-1/2}\sum_{i=0}^2|i,i+j,i+2j\rangle$ で、任意の論理密度行列 $\rho$ について $\operatorname{Tr}_{BC}(V\rho V^\dagger)=I_A/3$ を非対角項も含めて示せ。

<!-- solution-start -->
**詳細解答。** $\operatorname{Tr}_{BC}(V|j\rangle\langle k|V^\dagger)$ の非零条件は $i+j=i'+k$ と $i+2j=i'+2k$ です。二式の差から $j=k$、戻すと $i=i'$。従ってこの縮約は $\delta_{jk}I_A/3$ です。$\rho=\sum_{jk}\rho_{jk}|j\rangle\langle k|$ と展開すれば

$$
\operatorname{Tr}_{BC}(V\rho V^\dagger)
=\sum_{jk}\rho_{jk}\delta_{jk}I_A/3
=(\operatorname{Tr}\rho)I_A/3=I_A/3.
$$

非対角項の消失も示したので、位相を含む任意の入力について[HOLO29の秘匿条件](../HOLO29/index.md#def-holo29-region-recovery)を確認できました。
<!-- solution-end -->

### Level B：独立な検算をつなぐ

<a id="ex-holo33-b01"></a>
### B1. 二領域の復号器
- Level: B
- 問題: A05の符号で $A$ を消失させる。$U_{BC}|b,c\rangle=|c-b,2b-c\rangle$ のユニタリ性を確認し、任意の論理ベクトルを復号せよ。二領域 $BC$ が消失した場合の不可能性も示せ。

<!-- solution-start -->
**詳細解答。** 添字は $\mathbb Z_3$。$(j,i)=(c-b,2b-c)$ の逆は $(b,c)=(i+j,i+2j)$ なので、9個の基底の置換はユニタリです。$|\psi\rangle=\sum_j\alpha_j|j\rangle$ とすると

$$
(I_A\otimes U_{BC})V|\psi\rangle
=\frac1{\sqrt3}\sum_{i,j}\alpha_j|i,j,i\rangle
=|\psi\rangle_L\otimes\frac1{\sqrt3}\sum_i|i\rangle_A|i\rangle_G.
$$

$A$ を失った後でも $G$ を捨てれば論理状態を復元でき、線形性により混合状態・参照系にも働きます。反対に $BC$ を失うとA05から $A$ は全入力で $I_A/3$。異なる論理状態が同じ状態へ写るので共通の逆写像は存在しません。これは[HOLO29の二領域表現](../HOLO29/index.md#thm-holo29-three-representations)を具体的に検算したものです。
<!-- solution-end -->

<a id="ex-holo33-b02"></a>
### B2. 2点関数の比とRT差
- Level: B
- 問題: $d=2,\Delta=3/2$ の2点関数で $r_2=2r_1$ とし、区間半幅は $a_2=3a_1$、cutoffは共通とする。それぞれの相関比と $\epsilon\downarrow0$ の古典RTエントロピー差を計算し、両者が等号でない理由を述べよ。

<!-- solution-start -->
**詳細解答。** [HOLO9の2点関数](../HOLO9/index.md#prop-holo9-two-point)から $G(2r_1)/G(r_1)=1/8$。[HOLO18の有限cutoff長](../HOLO18/index.md#prop-holo18-regulated-length)から

$$
\begin{aligned}
S_\epsilon^{(0)}(3a_1)-S_\epsilon^{(0)}(a_1)
&=\frac{L}{2G_3}\log
\frac{3a_1+\sqrt{9a_1^2-\epsilon^2}}
{a_1+\sqrt{a_1^2-\epsilon^2}}\\
&\longrightarrow \frac{L}{2G_3}\log3
=\frac{c_{\mathrm{CFT}}}{3}\log3.
\end{aligned}
$$

前者はスカラー演算子の無次元**相関比**、後者は区間の**エントロピー差**です。GKPWとRTは異なる辞書であり、同じ背景の予測でも相互の等号を意味しません。
<!-- solution-end -->

<a id="ex-holo33-b03"></a>
### B3. QESの変分順序
- Level: B
- 問題: $S_{\mathrm{gen}}(x)=(A_0+\kappa x^2/2)/(4G_3)+s_0+qx$（$\kappa,G_3>0$）の停留位置と $x=0$ からの値の変化を求めよ。この一方向の計算で全法線方向のQES条件を示せるか。

<!-- solution-start -->
**詳細解答。** $S'_{\mathrm{gen}}(x)=\kappa x/(4G_3)+q$ から $x_*=-4G_3q/\kappa$。二階微分 $\kappa/(4G_3)>0$ なのでこの一方向の二次模型では最小です。

$$
S_{\mathrm{gen}}(x_*)-S_{\mathrm{gen}}(0)
=\frac{\kappa}{8G_3}\frac{16G_3^2q^2}{\kappa^2}
-\frac{4G_3q^2}{\kappa}
=-\frac{2G_3q^2}{\kappa}.
$$

位置は固定した $q,\kappa$ に対し $O(G_3)$ 動きます。しかし[HOLO24のQES定義](../HOLO24/index.md#def-holo24-qes)は**全ての許容法線変位**での停留性を要求し、[極値候補選択](../HOLO24/index.md#def-holo24-minimal-qes)も別に必要です。一方向の模型では確認できません。
<!-- solution-end -->

<a id="ex-holo33-b04"></a>
### B4. 三つの飛躍を反証する
- Level: B
- 問題: (i) 大$N$なら全て局所純Einsteinバルクを持つ、(ii) 3-qutritの復号から蒸発ブラックホールの効率的復号が従う、(iii) 真空球の第一法則一つで非線形Einstein方程式が従う、という推論に不足する条件と破綻箇所を述べよ。

<!-- solution-start -->
**詳細解答。** (i) [HOLO6の近似条件](../HOLO6/index.md#def-holo6-controlled-window)では大$N$のループ抑制と、強結合・弦補正抑制・スペクトルギャップは独立の条件です。一つだけでは結論できません。(ii) B01の $V$ は有限行列で、蒸発時空・重力の時間発展・計算量を定義しません。復号が存在することさえ、一般時空についてはまだ示していません。(iii) A04では $S''(0)=-9/2$ であり第一法則は一次だけです。[HOLO32の積分拘束](../HOLO32/index.md#thm-holo32-integrated-gravity-constraint)から局所方程式へ進むには全ての球・Lorentz方向と積分変換の単射性等が必要で、一球から全ての方程式は出ません。
<!-- solution-end -->

### Level C：最後の統合問題

<a id="ex-holo33-c01"></a>
### C1. 辞書・エントロピー・復号を条件付きで統合する
- Level: C
- 問題: 次の四項を実行し、最後に結論の射程を比較せよ。

**(a) 相関関数。** Euclid $AdS_3$ のスカラー場で境界次元を $d=2,\Delta_+=3/2$ とする。作用係数1、標準量子化、木レベル、分離点を仮定し、次を求めよ。

$$
m^2L^2,\qquad G(r),\qquad G(2r)/G(r).
$$

**(b) 区間エントロピー。** 同じ半径 $L$ の純 $AdS_3$ 真空で、半幅 $a$ と $2a$ の区間の古典RT量の差を、共通cutoffで計算せよ。

**(c) 有限符号。** 3-qutrit符号で $A$ の消失を復号し、$BC$ の消失が復号不能であることを示せ。

**(d) 論証の分類。** 各計算で辞書として仮定した部分、有限次元で厳密に証明した部分、未導出の一般的結論を区別せよ。

<!-- solution-start -->
**詳細解答。**

**(a)** [質量・次元関係](../HOLO8/index.md#prop-holo8-mass-dimension)により $m^2L^2=(3/2)(-1/2)=-3/4>-1$、$\nu=1/2$ です。[HOLO9の2点関数](../HOLO9/index.md#prop-holo9-two-point)に $d=2,\Delta=3/2$ を入れ、

$$
G(r)=\frac{L\Gamma(3/2)}{\pi\Gamma(1/2)}r^{-3}
=\frac{L}{2\pi r^3},\qquad
G(2r)/G(r)=1/8.
$$

**(b)** $x=a\cos\theta,z=a\sin\theta$ で $ds=L\,d\theta/\sin\theta$、端点は $\theta_\epsilon=\arcsin(\epsilon/a)$ と $\pi-\theta_\epsilon$。従って

$$
D_\epsilon(a)=2L\log\frac{a+\sqrt{a^2-\epsilon^2}}{\epsilon}.
$$

$S_\epsilon^{(0)}=D_\epsilon/(4G_3)$ として二つを引けば

$$
\begin{aligned}
S_\epsilon^{(0)}(2a)-S_\epsilon^{(0)}(a)
&=\frac{L}{2G_3}\log
\frac{2a+\sqrt{4a^2-\epsilon^2}}
{a+\sqrt{a^2-\epsilon^2}}\\
&\longrightarrow\frac{L}{2G_3}\log2
=\frac{c_{\mathrm{CFT}}}{3}\log2.
\end{aligned}
$$

この最後の量を**境界**のエントロピー差と読む部分は[RT処方](../HOLO18/index.md#thm-holo18-interval-coefficient)を仮定しています。

**(c)** $(a,b,c)=(i,i+j,i+2j)$ に対して $j=c-b,i=2b-c$ と解き、$U_{BC}|b,c\rangle=|j,i\rangle$ を取ります。逆は $(b,c)=(i+j,i+2j)$ なので基底置換ユニタリです。

$$
(I_A\otimes U_{BC})V|\psi\rangle
=|\psi\rangle_L\otimes3^{-1/2}\sum_i|i\rangle_A|i\rangle_G.
$$

$A$ の消失後に $G$ を捨てて復号できます。一方、$BC$ を消失させると $\operatorname{Tr}_{BC}(V\rho V^\dagger)=I_A/3$ で全入力が同じ出力へ写り、全入力用の逆写像はありません。

**(d)** (a) はEuclid・標準量子化・木レベル・非接触部分の**GKPW辞書を入力した計算**、(b) は静的・真空・古典領域での**幾何計算にRT辞書を入力した計算**、(c) は**有限Hilbert空間の厳密な行列等式**です。(c) は連続バルクの運動方程式を定義せず、(a)(b)も非線形の全状態や漸近平坦な蒸発時空の双対性を証明しません。各等号の模型・状態・次数・辞書の入口を区別することが結論です。
<!-- solution-end -->

## 8. 次へ進むための結論

同じ「双対性」の下に、指定されたAdS/CFT模型の強い整合性、半古典重力の近似式、有限符号の厳密な行列等式、なお別の仮定・検証が必要な研究課題が同居しています。計算した等式を無条件に拡張せず、**何を入力し、何を導き、何がまだ従わないか**を毎回確認してください。

背景文献：[AdS/CFT概説（Aharonyほか）](https://arxiv.org/abs/hep-th/9905111)、[バルク創発の講義（Harlow）](https://arxiv.org/abs/1802.01040)、[量子誤り訂正とバルク局所性（Almheiri–Dong–Harlow）](https://arxiv.org/abs/1411.7041)、[エンタングルメントと線形化重力（Faulknerほか）](https://arxiv.org/abs/1312.7856)。
