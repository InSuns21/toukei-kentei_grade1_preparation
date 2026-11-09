# BHT9 Bekenstein–Hawkingエントロピー

<!-- definition-example-audit: strict -->

[前講の温度と面積係数の関係](../BHT8/index.md#prop-bht8-first-law-area)から、非極限の定常ブラックホールでは

$$
dM-\Omega_H\,dJ-\Phi_H\,dQ=T_H\,d(A/4)
$$

が成り立ちます。右辺は熱力学の $T\,dS$ と同じ形です。しかし **$dS$ が分かることと $S$ の絶対値が分かることは違います**。[TH4のエントロピー](../../TH/TH4/index.md#def-th4-entropy)でも、初めに決まるのは二つの状態間の差でした。

本講では、(1) この微分形式が本当に状態関数の差となる理由、(2) $S_{\rm BH}=A/4$ の **$1/4$ と積分定数**の役割、(3) 質量や面積に戻した計算と物理単位、を順に確かめます。古典的な面積非減少と半古典的な蒸発中のエントロピー収支は最後まで区別します。

基本設定は4次元、漸近平坦、$\Lambda=0$、Einstein–Maxwell重力、計量符号 $(-,+,+,+)$、自然単位 $G=c=\hbar=k_B=1$ です。$M>0$ は幾何単位のADM質量、$A$ は事象地平線の空間切断面積、$J,Q$ は無限遠で定義した角運動量と電荷です。$\kappa>0$ の非極限定常Kerr–Newman解族を扱い、時間と電位の無限遠規格化を固定します。特に $J=Q=0$ はSchwarzschild解族です。熱力学的な微分は**近傍の定常解の間**の変分であって、蒸発の時間微分を最初から意味しません。

## 1. 第一法則から「エントロピーの差」を取り出す

### 1.1 仕事を差し引いた一形式

回転と電荷を変える場合、$dM$ 全体を熱とみなして $dS=dM/T_H$ と書いてはいけません。[BHT5のKerr–Newman第一法則](../BHT5/index.md#prop-bht5-kn-first-law)の仕事項 $\Omega_HdJ+\Phi_HdQ$ を差し引きます。ここでの $d$ は定常解族のパラメータ $(M,J,Q)$ に関する全微分です。熱浴への実際の可逆熱移動 $\delta Q_{\rm heat}$ と機械的に同一視するものではありません。

[TH4の可逆熱積分の経路独立性](../../TH/TH4/index.md#thm-th4-entropy-state-function)では、過程の選び方ではなく端点の平衡状態だけで値が決まる状態関数を構成しました。ここでも、どの候補関数 $S$ を求めるべきかを先に微分条件として定めます。

<a id="def-bht9-entropy-potential"></a>

<!-- formal-statement-start -->
> **定義（定常解族のエントロピー・ポテンシャル）**  
> 上記の非極限Kerr–Newman解族の開いたパラメータ領域 $U$ で、$A,\kappa,\Omega_H,\Phi_H$ が滑らか、$T_H=\kappa/(2\pi)>0$ とする。$U$ 上の微分可能な実数値関数 $S$ が

$$
\boxed{dS=\frac{dM-\Omega_HdJ-\Phi_HdQ}{T_H}}
$$

> をすべての許される接方向で満たすとき、$S$ をこの領域の**定常解族のエントロピー・ポテンシャル**と呼ぶ。これは状態関数に課す条件であり、右辺が任意のモデルで自動的に完全微分となるという仮定ではない。$S$ の値は加法定数だけ変えても同じ条件を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht9-entropy-potential -->
**定義の確認**：Schwarzschildの $M>0,\ J=Q=0$ の一パラメータ解族では[地平線データ](../BHT1/index.md#prop-bht1-schwarzschild-data)から $A=16\pi M^2$、前講の[Hawking温度](../BHT8/index.md#prop-bht8-physical-units)の自然単位形から $T_H=1/(8\pi M)>0$ です。仕事項はなく

$$
\frac{dM}{T_H}=8\pi M\,dM=d(4\pi M^2).
$$

従って $S(M)=4\pi M^2+C$ は $M>0$ で微分可能で、指定した**唯一の接方向** $dM$ に対し上の等式を満たします。$C$ は任意の実定数です。一変数でのこの確認だけでは、回転・電荷の接方向で同じ候補が成立するとはまだ言えません。
<!-- definition-example-end -->

### 1.2 なぜ $1/4$ は普遍的な微分係数になるのか

前講では、Hawking温度を古典的第一法則へ代入して**面積係数**を得ました。今回はこれを完全微分の存在証明として使います。

<a id="thm-bht9-area-difference"></a>

<!-- formal-statement-start -->
> **定理（非極限定常解族の面積エントロピー差と積分定数）**  
> 4次元の漸近平坦・$\Lambda=0$ のEinstein–Maxwell非極限Kerr–Newman定常解族を考える。正規化済みの無限遠の時間・電位を固定し、$M>0$、

$$
M^2>Q^2+(J/M)^2
$$

> の領域 $D$ に限る。$A,\kappa,\Omega_H,\Phi_H$ はこの領域で滑らかで、$T_H=\kappa/(2\pi)>0$ とする。古典的第一法則を仮定すると、定義したエントロピー・ポテンシャルが存在し、

$$
\boxed{dS=\frac14\,dA,\qquad
S(y)-S(x)=\frac{A(y)-A(x)}4}
$$

> が $D$ の任意の二状態 $x,y$ に対して成り立つ。任意のポテンシャルは $S=A/4+C$ の形で、**一つの任意定数** $C$ を持つ。第一法則と温度だけでは $C$ の値を決定しない。
<!-- formal-statement-end -->

### 証明の見取り図

右辺の一形式が $dA/4$ に**等しい**ことを示せば、積分経路に依存しません。定数が各連結成分で別々になり得る点にも注意し、ここでは領域 $D$ 自体が経路連結であることを確認します。

<!-- proof-start -->
### 証明

[Kerr–Newman第一法則](../BHT5/index.md#prop-bht5-kn-first-law)を解族の任意の接方向へ適用すると

$$
dM-\Omega_HdJ-\Phi_HdQ=\frac{\kappa}{8\pi}dA.
$$

$\kappa>0$ なので $T_H=\kappa/(2\pi)$ で割る操作は許され、

$$
\frac{dM-\Omega_HdJ-\Phi_HdQ}{T_H}
=\frac{\kappa\,dA/(8\pi)}{\kappa/(2\pi)}
=\frac14\,dA=d(A/4).
$$

従って $S_0=A/4$ は[定常解族のエントロピー・ポテンシャル](#def-bht9-entropy-potential)の条件を満たす。任意の別の $S$ も同じ一形式を持つから

$$
d(S-S_0)=0.
$$

$D$ が経路連結なら、任意の滑らかな区分的曲線 $\gamma:[0,1]\to D$ に対して連鎖律から

$$
\frac{d}{dt}(S-S_0)(\gamma(t))
=d(S-S_0)_{\gamma(t)}[\dot\gamma(t)]=0.
$$

よって各曲線上で $S-S_0$ は一定です。最後に $D$ の経路連結性を確認します。$x=(M,J,Q)\in D$ で $0\le t\le1$ に対し $(M,tJ,tQ)$ は

$$
M^2-t^2\{Q^2+(J/M)^2\}
\ge M^2-\{Q^2+(J/M)^2\}>0
$$

を満たし、同じ $M$ のSchwarzschild点 $(M,0,0)$ に接続できます。Schwarzschild軸上の任意の正質量二点も、正の質量を線形に変える経路で結べます。従って二状態はこの経路を連結して結べます。$S-S_0=C$ は $D$ 全体の単一の定数で、任意の経路 $\gamma$ の両端について

$$
S(y)-S(x)=\int_\gamma dS
=\frac14\int_\gamma dA
=\frac{A(y)-A(x)}4.
$$

積分経路によらないことも同時に示されました。
<!-- proof-end -->

**積分定数に関する反証テスト。** $S_1=A/4$ と $S_2=A/4+100$ は共に同じ定常解族の第一法則を満たします。$dS_1=dS_2$ なので、第一法則の測定や積分路の工夫だけで数値 $100$ を排除することはできません。$S(0)=0$ と書く場合も $M=0$ はこの定理の $D$ に属さず、**極限での追加の規格化条件**を選んだことになります。

## 2. 面積の規格化とSchwarzschildによる二重検算

### 2.1 面積規格化は物理的な選択である

この先は、面積に比例する正の量を標準のエントロピー値として採用します。選択の意味を明示した上で定義します。

<a id="def-bht9-area-normalization"></a>

<!-- formal-statement-start -->
> **定義（Bekenstein–Hawking面積規格化）**  
> 前定理の4次元Einstein重力・非極限定常解族 $D$ で、エントロピー・ポテンシャルの加法定数を $C=0$ と選んだ

$$
\boxed{S_{\rm BH}:=\frac A4}
$$

> を、自然単位での **Bekenstein–Hawkingエントロピー**と呼ぶ。Schwarzschild部分族で $M\downarrow0$ の形式的極限に沿って $S_{\rm BH}\to0$ とする規格化に対応する。この極限は正則な非極限ブラックホールの内部点ではない。一般の物質エントロピーや量子補正まで $A/4$ で表すという定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht9-area-normalization -->
**定義の確認**：$M=1$ のSchwarzschild解では $M>0$、$J=Q=0$ で非極限、[面積公式](../BHT1/index.md#prop-bht1-schwarzschild-data)から $A=16\pi$ です。従って $S_{\rm BH}=4\pi>0$ となります。$M\downarrow0$ の極限を別途課すと $4\pi M^2\to0$ ですが、$C=100$ とすれば極限値は $100$ となるので、選択した条件が確かに定数を区別します。
<!-- definition-example-end -->

この値を「地平線の微視状態数の対数」と読むには微視的理論が別途必要です。ここでは第一法則と温度の整合により正当化した**熱力学的な面積エントロピー**として扱います。また、別の重力作用にまで係数 $1/4$ を無条件に広げません。高階曲率への拡張はBHT19・BHT20で検討します。

### 2.2 質量依存、微分と有限差

Schwarzschildでは面積の式から計算しても、温度の逆数を積分しても同じ値に到達する必要があります。

<a id="prop-bht9-schwarzschild-entropy"></a>

<!-- formal-statement-start -->
> **命題（Schwarzschildエントロピーの質量依存と有限差）**  
> 自然単位の漸近平坦なSchwarzschild定常解族 $M>0$ に対し、無限遠規格化のHawking温度と前定義の面積規格化を採用すると

$$
\boxed{S_{\rm BH}(M)=4\pi M^2,\qquad
\frac{dS_{\rm BH}}{dM}=8\pi M=\frac1{T_H}>0.}
$$

> 任意の $M_2>M_1>0$ では

$$
\boxed{\Delta S_{\rm BH}=4\pi(M_2^2-M_1^2),
\qquad \int_{S(M_1)}^{S(M_2)}T_H(S)\,dS=M_2-M_1.}
$$

> 一般に $T_H(M_1)\Delta S_{\rm BH}\ne M_2-M_1$ であり、微分関係の温度を始状態の定数に固定して有限差へ代入してはいけない。
<!-- formal-statement-end -->

### 証明の見取り図

$A(M)$ の微分と $1/T_H(M)$ の積分を**別々**に出し、その後で一致させます。有限の二状態差では積分中の温度が変わる点が核心です。

<!-- proof-start -->
### 証明

[Schwarzschildの面積・表面重力](../BHT1/index.md#prop-bht1-schwarzschild-data)から $A=16\pi M^2$、[Hawking温度式](../BHT8/index.md#prop-bht8-first-law-area)のSchwarzschild制限から $T_H=1/(8\pi M)$ です。よって

$$
S_{\rm BH}=\frac{16\pi M^2}{4}=4\pi M^2,\qquad
\frac{dS_{\rm BH}}{dM}=8\pi M=\frac1{T_H}.
$$

一方、温度から独立に積分すると、基準 $M_*>0$ に対し

$$
S(M)-S(M_*)=\int_{M_*}^{M}\frac{dm}{T_H(m)}
=\int_{M_*}^{M}8\pi m\,dm
=4\pi(M^2-M_*^2).
$$

面積規格化 $S(M_*)=4\pi M_*^2$ を代入すると最初の式が回復します。二状態に対しては

$$
\Delta S_{\rm BH}=4\pi(M_2^2-M_1^2)
=4\pi(M_2-M_1)(M_2+M_1).
$$

$S(M)$ は $M>0$ で単調増加なので積分変数を $S$ から $M$ に変えることができ、

$$
\int_{S(M_1)}^{S(M_2)}T_H(S)\,dS
=\int_{M_1}^{M_2}\frac1{8\pi M}(8\pi M)\,dM
=M_2-M_1.
$$

しかし始状態の温度に固定すると

$$
T_H(M_1)\Delta S_{\rm BH}
=\frac{(M_2-M_1)(M_2+M_1)}{2M_1}.
$$

$M_2>M_1$ では係数 $(M_2+M_1)/(2M_1)>1$ なので、真の質量差より大きくなります。
<!-- proof-end -->

例えば $M_2=2M_1=2M$ なら

$$
S(M)=4\pi M^2,\quad S(2M)=16\pi M^2,\quad
\Delta S=12\pi M^2.
$$

$T_H(M)\Delta S=3M/2$ ですが、正しく変化する温度で積分すると $\Delta M=M$ です。この $M\to2M$ は**定常解族の二点比較**であり、実際の合体・降着過程でどれだけの熱が移ったかを表すものではありません。

### 2.3 面積一定でもエネルギー一定とは限らない

回転・電荷を持つ解族では[面積差の定理](#thm-bht9-area-difference)から、接方向 $dA=0$ なら $dS_{\rm BH}=0$ です。しかし[第一法則](../BHT5/index.md#prop-bht5-kn-first-law)をこの方向に評価すると

$$
dM=\Omega_H\,dJ+\Phi_H\,dQ.
$$

従って $dJ$ や $dQ$ を許せば一般に $dM$ は零ではありません。例えば非極限Kerrで $Q=0$、$J\ne0$、面積一定の接方向を取ると $dM=\Omega_HdJ$ です。[BHT7の固定面積曲線](../BHT7/index.md#prop-bht7-constant-area-path)がそのような許される接方向を具体的に構成します。定常状態の比較と現実の可逆過程は区別してください。

## 3. $G,\hbar,c,k_B$ を戻すと何が見えるか

### 3.1 面積はPlanck面積で数える

自然単位の $A/4$ は無次元ですが、SIの面積は $\mathrm{m^2}$ です。面積を無次元化する長さの二乗として

$$
\ell_P^2:=\frac{G\hbar}{c^3}
$$

を使います。$\ell_P^2$ の単位は面積です。エントロピーの物理単位は $\mathrm{J/K}$ なので、無次元化した量に $k_B$ を掛けて復元します。重力定数と量子作用が同じ係数に現れることが、古典的面積と量子温度の接続を端的に示します。

<a id="prop-bht9-si-entropy"></a>

<!-- formal-statement-start -->
> **命題（Bekenstein–Hawkingエントロピーの物理単位）**  
> 4次元Einstein重力の非回転・非荷電Schwarzschild解で、SI質量 $m>0$、事象地平線面積 $A_{\rm SI}>0$、$\ell_P^2=G\hbar/c^3$ とする。前節の面積規格化をSI単位に復元すると

$$
\boxed{S_{\rm BH}=\frac{k_BA_{\rm SI}}{4\ell_P^2}
=\frac{k_Bc^3A_{\rm SI}}{4G\hbar}
=\frac{4\pi k_B Gm^2}{\hbar c}.}
$$

> [SIのHawking温度](../BHT8/index.md#prop-bht8-physical-units)を用いると $d(mc^2)=T_H\,dS_{\rm BH}$ が成立する。$A_{\rm SI}$ の単位は $\mathrm{m^2}$、$S_{\rm BH}$ の単位は $\mathrm{J/K}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

面積 $A$ を $\ell_P^2$ で割って無次元化します。次にSchwarzschild半径 $r_s=2Gm/c^2$ を用い、温度との積が**エネルギーの全微分**になるか別に検算します。

<!-- proof-start -->
### 証明

$[G]=\mathrm{m^3\,kg^{-1}\,s^{-2}}$、$[\hbar]=\mathrm{kg\,m^2\,s^{-1}}$、$[c]=\mathrm{m\,s^{-1}}$ から

$$
[\ell_P^2]=[G\hbar/c^3]
=\frac{\mathrm{m^5\,s^{-3}}}{\mathrm{m^3\,s^{-3}}}
=\mathrm{m^2}.
$$

従って $A_{\rm SI}/(4\ell_P^2)$ は無次元です。$[k_B]=\mathrm{J/K}$ を掛ければ最初の二式が得られます。Schwarzschild面積は

$$
A_{\rm SI}=4\pi r_s^2
=4\pi\left(\frac{2Gm}{c^2}\right)^2
=\frac{16\pi G^2m^2}{c^4}.
$$

これを代入して

$$
\frac{k_Bc^3}{4G\hbar}\frac{16\pi G^2m^2}{c^4}
=\frac{4\pi k_B Gm^2}{\hbar c}
$$

を得ます。質量で微分すると

$$
\frac{dS_{\rm BH}}{dm}=\frac{8\pi k_B Gm}{\hbar c}.
$$

一方、[BHT8のSI温度式](../BHT8/index.md#prop-bht8-physical-units)は $T_H=\hbar c^3/(8\pi Gk_Bm)$ なので

$$
T_H\,dS_{\rm BH}
=\frac{\hbar c^3}{8\pi Gk_Bm}
  \frac{8\pi k_B Gm}{\hbar c}\,dm
=c^2\,dm=d(mc^2).
$$

エネルギーを $mc^2$ とせず $m$ としたままSIの温度を掛けると、$c^2$ が欠落します。
<!-- proof-end -->

Planck質量 $m_P:=\sqrt{\hbar c/G}$ を用いれば、同じ内容は

$$
\frac{S_{\rm BH}}{k_B}=4\pi\left(\frac m{m_P}\right)^2
$$

とも書けます。形式的に $m=m_P$ なら $S/k_B=4\pi$ ですが、この質量域で半古典Einstein重力の式を高精度な量子重力予言として扱うことはできません。以下の大質量の数値例は $m\gg m_P$ に限ります。

### 3.2 太陽質量級の数値スケール

次の数値は計算用に $G=6.67430\times10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}}$、$\hbar=1.054571817\times10^{-34}\,\mathrm{J\,s}$、$c=299792458\,\mathrm{m/s}$、$k_B=1.380649\times10^{-23}\,\mathrm{J/K}$、参照質量 $m_\odot=1.98847\times10^{30}\,\mathrm{kg}$ を採用して丸めたものです（天体質量の精密測定を目的とする表ではありません）。

| 量 | $m=m_\odot$ への代入結果 | 解釈 |
| --- | ---: | --- |
| 半径 $r_s=2Gm/c^2$ | $2.953\times10^3\,\mathrm{m}$ | 数kmの地平線 |
| 面積 $4\pi r_s^2$ | $1.096\times10^8\,\mathrm{m^2}$ | 幾何学的面積 |
| $S_{\rm BH}/k_B=A/(4\ell_P^2)$ | $1.049\times10^{77}$ | 無次元のエントロピー |
| $S_{\rm BH}$ | $1.448\times10^{54}\,\mathrm{J/K}$ | SIエントロピー |
| $T_H$ | $6.170\times10^{-8}\,\mathrm K$ | 無限遠規格化の温度 |

例えば $r_s$ と $\ell_P^2\simeq2.612\times10^{-70}\,\mathrm{m^2}$ を使うと

$$
\frac{A}{4\ell_P^2}
\simeq\frac{1.096\times10^8}{4(2.612\times10^{-70})}
\simeq1.049\times10^{77}.
$$

巨大な $S/k_B$ は面積を非常に小さいPlanck面積単位で数えた結果です。**大きいエントロピーだから高温**とは言えません。同じSchwarzschild族では $S\propto m^2$ に対し $T_H\propto m^{-1}$ で、質量を増やすとエントロピーは増え、温度は下がります。

## 4. この式が述べていないこと

1. **古典的面積定理との条件付き接続。** [GR36の面積非減少定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の滑らかな未来地平線・零収束条件・大域的仮定が成り立つ古典過程では、切断面積の非減少から $A/4$ も非減少です。しかし**地平線面積が増えること**と**ブラックホール外部も含めた熱力学的第二法則**を無条件に同一視しません。[BHT3の流束検算](../BHT3/index.md#prop-bht3-vaidya-future-integral)はエネルギー条件を失うと面積の符号が変わり得ることを示しました。
2. **量子蒸発に古典的増大則を移植しない。** Schwarzschildの準静的な定常族比較では $dS_{\rm BH}/dM=8\pi M>0$ ですから、質量が減る方向を形式的にたどれば地平線エントロピーは減ります。Hawking蒸発時の外部場を含む $S_{\rm gen}$ の収支はBHT21・BHT22で別途扱います。蒸発の瞬間瞬間を厳密な定常解と仮定する証明ではありません。
3. **極限へ除算を持ち込まない。** [面積差の定理](#thm-bht9-area-difference)は $T_H>0$ で割りました。$\kappa=0$ の極限解そのものへこの除算を適用できません。非極限解族から面積を極限に運んで $A/4$ を計算する操作と、極限地平線上に熱力学を直接構成する操作は異なります（BHT11）。
4. **微視状態の数は導出していない。** 形式的な $S=k_B\log\Omega$ の読みから $\Omega\simeq e^{A/(4\ell_P^2)}$ と示唆されても、ここで状態数を数えたわけではありません。微視的計数の範囲と情報問題はBHT24以降の別課題です。
5. **重力理論を替えた場合は別問題。** 面積係数 $1/4$ はここで使ったEinstein重力の第一法則・温度規格化に依存します。高階曲率作用のエントロピーを同じ面積則で定義し直すことはしません。

## 5. 演習――差分、規格化、単位と限界を自力で再構成する

### Level A：一つの公式とその仮定を確かめる

<a id="ex-bht9-a01"></a>

#### BHT9-A01 温度からの積分

- Level: A
- 問題: Schwarzschildの自然単位 $M>0$ で $T_H=1/(8\pi M)$ から $S(M)-S(M_*)$ を積分せよ。ただし $M_*>0$ は基準質量とし、まだエントロピーの零点を選ばない。

<!-- solution-start -->
**詳細解答**：仕事項がないので[定常解族のエントロピー・ポテンシャル](#def-bht9-entropy-potential)の条件より $dS=dM/T_H=8\pi M\,dM$ です。したがって

$$
S(M)-S(M_*)=\int_{M_*}^{M}8\pi x\,dx
=\left[4\pi x^2\right]_{M_*}^{M}
=4\pi(M^2-M_*^2).
$$

$S(M_*)$ の値を与えていないので $S(M)$ の絶対値は確定しません。
<!-- solution-end -->

<a id="ex-bht9-a02"></a>

#### BHT9-A02 積分定数の判定

- Level: A
- 問題: $A>0$ の状態領域で $S_1=A/4$ と $S_2=A/4+7$ を比較し、第一法則が区別できる量とできない量を答えよ。さらにSchwarzschildの $M\downarrow0$ で $S\to0$ という追加条件ならどちらを選ぶか。

<!-- solution-start -->
**詳細解答**：$7$ は定数なので

$$
dS_1=\frac14dA=dS_2,\qquad
S_2(y)-S_2(x)=S_1(y)-S_1(x).
$$

従って差分と第一法則は両者を区別できません。Schwarzschildでは $A=16\pi M^2\to0$ だから $S_1\to0$、$S_2\to7$ です。追加の極限規格化なら $S_1$ を選びます。$M=0$ が非極限解族の点だと主張したわけではありません。
<!-- solution-end -->

<a id="ex-bht9-a03"></a>

#### BHT9-A03 質量を倍にしたとき

- Level: A
- 問題: 自然単位のSchwarzschildで $M\mapsto2M$ とする。面積、エントロピー、温度の倍率をそれぞれ答えよ。$M>0$ とする。

<!-- solution-start -->
**詳細解答**：[面積の式](../BHT1/index.md#prop-bht1-schwarzschild-data)から $A(M)=16\pi M^2$、[面積規格化](#def-bht9-area-normalization)から $S(M)=4\pi M^2$、[Hawking温度](../BHT8/index.md#prop-bht8-first-law-area)から $T_H(M)=1/(8\pi M)$ です。代入すると

$$
\frac{A(2M)}{A(M)}=4,\qquad
\frac{S(2M)}{S(M)}=4,\qquad
\frac{T_H(2M)}{T_H(M)}=\frac12.
$$

面積とエントロピーは二乗、温度は逆比例の質量依存を持ちます。
<!-- solution-end -->

<a id="ex-bht9-a04"></a>

#### BHT9-A04 Planck面積で数える

- Level: A
- 問題: 4次元Einstein重力で面積が $A=400\ell_P^2$ の地平線に面積規格化を適用する。$S_{\rm BH}/k_B$ を求め、単位の整合を確かめよ（この数値だけで半古典近似の有効性を判定しない）。

<!-- solution-start -->
**詳細解答**：[物理単位の面積則](#prop-bht9-si-entropy)に面積を代入すると

$$
\frac{S_{\rm BH}}{k_B}
=\frac{400\ell_P^2}{4\ell_P^2}=100.
$$

面積の単位 $\mathrm{m^2}$ が約分され、比は無次元です。$S_{\rm BH}=100k_B$ の単位は $\mathrm{J/K}$ です。近似の成立には背景曲率・量子効果など追加の検討が必要です。
<!-- solution-end -->

<a id="ex-bht9-a05"></a>

#### BHT9-A05 SI第一法則の質量微分

- Level: A
- 問題: $S(m)=4\pi k_B Gm^2/(\hbar c)$、$T_H(m)=\hbar c^3/(8\pi Gk_Bm)$、$m>0$ とする。$T_H(dS/dm)$ を計算し、なぜ $dm$ だけがエネルギー変化にならないか説明せよ。

<!-- solution-start -->
**詳細解答**：先に $m$ で微分すると $dS/dm=8\pi k_B Gm/(\hbar c)$ です。よって

$$
T_H\frac{dS}{dm}
=\frac{\hbar c^3}{8\pi Gk_Bm}
 \frac{8\pi k_B Gm}{\hbar c}=c^2.
$$

したがって $T_H\,dS=c^2\,dm=d(mc^2)$。SI質量 $m$ の単位はkg、エネルギー $mc^2$ の単位はJなので、右辺に $c^2$ が必要です。
<!-- solution-end -->

### Level B：二つの考え方を接続する

<a id="ex-bht9-b01"></a>

#### BHT9-B01 有限差の罠

- Level: B
- 問題: $M>0$ のSchwarzschild解族の二状態 $M,3M$ を比較する。$\Delta S_{\rm BH}$、$T_H(M)\Delta S_{\rm BH}$、$\int T_H\,dS_{\rm BH}$ を求め、どれが $\Delta M$ と一致するか示せ。

<!-- solution-start -->
**詳細解答**：[Schwarzschildエントロピー命題](#prop-bht9-schwarzschild-entropy)の $S(x)=4\pi x^2$ から

$$
\Delta S=4\pi(9M^2-M^2)=32\pi M^2.
$$

温度を初期値 $1/(8\pi M)$ に固定すると

$$
T_H(M)\Delta S=\frac{32\pi M^2}{8\pi M}=4M
$$

となり、実際の定常質量差 $3M-M=2M$ の2倍です。一方、変化する温度を使い $x$ を積分変数に取れば

$$
\int_{S(M)}^{S(3M)}T_H(S)\,dS
=\int_M^{3M}\frac1{8\pi x}(8\pi x)\,dx
=[x]_M^{3M}=2M.
$$

微分恒等式 $dM=T_H\,dS$ は積分中に $T_H$ が変化することと両立します。
<!-- solution-end -->

<a id="ex-bht9-b02"></a>

#### BHT9-B02 面積一定の仕事方向

- Level: B
- 問題: 非極限Kerrの定常解族で、ある状態 $J\ne0$ から面積を一次まで固定する接方向 $dA=0,\ dQ=0,\ dJ\ne0$ を考える。$dS_{\rm BH}$ と $dM$ を求める。$dS=0$ なら質量も変わらないという主張の誤りを指摘せよ。

<!-- solution-start -->
**詳細解答**：[非極限定常解族の面積エントロピー差と積分定数](#thm-bht9-area-difference)から $dS_{\rm BH}=dA/4=0$ です。[Kerrの第一法則](../BHT5/index.md#thm-bht5-kerr-first-law)を $dA=0$ に制限すると

$$
dM=\frac{\kappa}{8\pi}dA+\Omega_HdJ=\Omega_HdJ.
$$

非極限Kerrの $J\ne0$ では、[地平線角速度](../BHT5/index.md#prop-bht5-kerr-data)は $\Omega_H\ne0$ です。従って $dJ\ne0$ なら一般に $dM\ne0$。この方向は[BHT7の固定面積曲線](../BHT7/index.md#prop-bht7-constant-area-path)によって実際の解族内に実現します。エントロピー差が零でも、エネルギーは回転仕事で変化できます。
<!-- solution-end -->

<a id="ex-bht9-b03"></a>

#### BHT9-B03 古典的第二法則と蒸発

- Level: B
- 問題: (i) [GR36の滑らかな地平線の面積非減少定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の仮定を満たし、$A_2\ge A_1$ の古典過程で $\Delta S_{\rm BH}$ の符号を求めよ。(ii) 準静的なSchwarzschild解族で形式的に $dM<0$ の向きへ変化するとき $dS_{\rm BH}$ の符号を求め、(i) と矛盾しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**：(i) 面積規格化が成り立つEinstein重力では

$$
\Delta S_{\rm BH}=(A_2-A_1)/4\ge0.
$$

ここでは面積定理に必要な滑らかさ、零収束条件、大域的仮定を保持しています。(ii) [Schwarzschildエントロピー](#prop-bht9-schwarzschild-entropy)を微分して $dS_{\rm BH}=8\pi M\,dM$。$M>0$ と $dM<0$ より $dS_{\rm BH}<0$ です。Hawking蒸発に関係する量子場の有効エネルギー条件は古典的な面積定理の仮定をそのまま満たしません。またこの符号計算は準静的近似にすぎず、外部放射のエントロピーを数えていません。従って古典定理の反例とはなりません。
<!-- solution-end -->

<a id="ex-bht9-b04"></a>

#### BHT9-B04 太陽質量スケールの二重計算

- Level: B
- 問題: 本文の数値定数を用い、$m=m_\odot$ のとき $S_{\rm BH}/k_B$ を (i) $A/(4\ell_P^2)$、(ii) $4\pi Gm^2/(\hbar c)$ の二通りで概算せよ。二つの式が同値になる代数的理由も示せ。

<!-- solution-start -->
**詳細解答**：(i) 本文の $A\simeq1.096\times10^8\,\mathrm{m^2}$、$\ell_P^2\simeq2.612\times10^{-70}\,\mathrm{m^2}$ から

$$
\frac{A}{4\ell_P^2}
\simeq\frac{1.096\times10^8}{1.045\times10^{-69}}
\simeq1.05\times10^{77}.
$$

(ii) $m^2\simeq(1.98847)^2\times10^{60}\,\mathrm{kg^2}$ として

$$
\frac{4\pi Gm^2}{\hbar c}
\simeq\frac{4\pi(6.67430\times10^{-11})(1.98847\times10^{30})^2}
{(1.054571817\times10^{-34})(2.99792458\times10^8)}
\simeq1.05\times10^{77}.
$$

代数的には $A=16\pi G^2m^2/c^4$、$\ell_P^2=G\hbar/c^3$ を代入すれば

$$
\frac{A}{4\ell_P^2}
=\frac{16\pi G^2m^2/c^4}{4G\hbar/c^3}
=\frac{4\pi Gm^2}{\hbar c}
$$

です。二つの概算は同じ公式を異なる入力から検査したものです。
<!-- solution-end -->

### Level C：一つの設定で全条件を総合する

<a id="ex-bht9-c01"></a>

#### BHT9-C01 面積則の成立範囲と状態比較

- Level: C
- 問題: 自然単位の4次元漸近平坦Schwarzschild定常解族で $M>0$ とし、Hawking温度を $T_H=1/(8\pi M)$、面積を $A=16\pi M^2$ とする。(1) 熱力学的エントロピー・ポテンシャルの一般形を、温度から積分して求めよ。(2) 面積規格化で定数を決め、$M$ と $2M$ のエントロピー差を求めよ。(3) $T_H(M)\Delta S$ と $\int T_H\,dS$ を比較せよ。(4) SI質量 $m$ へ戻した第一法則を示せ。(5) この計算が量子蒸発中の全エントロピー増大則の証明にならない理由を、少なくとも二つの仮定に触れて説明せよ。

<!-- solution-start -->
**詳細解答**：

(1) $J=Q=0$ を保持する一変数の定常解族なので仕事項は消え、[定常解族のエントロピー・ポテンシャル](#def-bht9-entropy-potential)の条件により

$$
dS=\frac{dM}{T_H}=8\pi M\,dM.
$$

$M>0$ の任意の連結区間で積分して $S(M)=4\pi M^2+C$ を得ます。$C$ は第一法則から決まりません。

(2) [Bekenstein–Hawking面積規格化](#def-bht9-area-normalization)は $C=0$ を選び、$S_{\rm BH}=A/4=4\pi M^2$ とします。従って

$$
\Delta S=4\pi(2M)^2-4\pi M^2=12\pi M^2.
$$

(3) 始状態の温度に固定した積は

$$
T_H(M)\Delta S
=\frac1{8\pi M}(12\pi M^2)=\frac{3M}{2}.
$$

しかし温度は $M$ に依存します。積分の変数を $x$ にして

$$
\int_{S(M)}^{S(2M)}T_H(S)\,dS
=\int_M^{2M}\frac{1}{8\pi x}\frac{d(4\pi x^2)}{dx}\,dx
=\int_M^{2M}1\,dx=M.
$$

従って有限質量差 $\Delta M=M$ と一致するのは積分の方です。

(4) SIでは $M=Gm/c^2$、$A_{\rm SI}=16\pi G^2m^2/c^4$ です。[Bekenstein–Hawkingエントロピーの物理単位](#prop-bht9-si-entropy)から

$$
S_{\rm BH}(m)=\frac{4\pi k_B Gm^2}{\hbar c},
\quad
\frac{dS_{\rm BH}}{dm}=\frac{8\pi k_B Gm}{\hbar c}.
$$

[SI温度式](../BHT8/index.md#prop-bht8-physical-units)を掛けると

$$
T_H\,dS_{\rm BH}
=\frac{\hbar c^3}{8\pi Gk_Bm}\,
  \frac{8\pi k_B Gm}{\hbar c}\,dm
=c^2dm=d(mc^2).
$$

(5) 第一に、この計算は各点が**非極限の定常解**である解族の微分であり、動的な蒸発過程の場と幾何の厳密な時間発展を扱っていません。第二に、Hawking放射を伴う量子状態では古典的面積定理の零収束・エネルギー条件をそのまま使えず、地平線の $S_{\rm BH}$ 自体は質量とともに減り得ます。さらに外部放射のエントロピーを数えていないので、全体の一般化第二法則を結論できません。
<!-- solution-end -->

## 6. 次への橋

本講で確定したのは、標準規格化での **$S_{\rm BH}=A/4$ と、その物理単位 $k_Bc^3A/(4G\hbar)$** です。微分係数 $1/4$ は古典的第一法則とHawking温度の組合せから出ますが、絶対値の零点は追加の選択です。次のBHT10では $J,Q$ を動かすときに $T_HdS$ と $\Omega_HdJ,\Phi_HdQ$ が正しく分離するか、RN/Kerr解族で状態空間・共役量・Smarr関係をもう一度検算します。

**直接前提講座：** [BHT8 Hawking温度の熱力学的意味](../BHT8/index.md)、[BHT7 Smarr関係・不可逆質量と仕事](../BHT7/index.md)、[TH4 エントロピーと基本関係式](../../TH/TH4/index.md)。
