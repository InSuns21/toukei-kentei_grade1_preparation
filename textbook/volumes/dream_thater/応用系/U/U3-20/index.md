# U3-20 Greeks とヘッジ誤差

[前講の配当付き Black–Scholes 価格](../U3-19/index.md#thm-u3-19-bsm-dividend)では、一つの条件を固定すると call と put の値を円単位で出せました。しかし市場で株価が1円動いた場合や、変動率を1%ポイント修正した場合に、価格が**どの程度**動くかは、価格そのものからは一目で分かりません。さらに「今のデルタで複製できる」という [連続取引の理論](../U3-16/index.md#thm-u3-16-bsm-replication)を日次取引へ持ち込むと、取引と取引の**間**に曲率による損益が残ります。

本講の問いは、(1) 何を固定して何で微分するか、(2) 曲率を持つオプションを株式と預金で1日だけ複製すると何が不足するか、です。価格、微分、自己金融の現金収支を同じ設定で導出し、解析式・中心差分・一日後の再評価を独立に照合します。

## 1. 市場・変数・測度を固定する

価格と現金は円、株式は株数、時間 $t,T,\tau$ は年で表します。評価時刻 $0\le t<T$、残存年数 $\tau=T-t>0$、権利落ち株価 $s>0$、行使価格 $K>0$、連続複利金利 $r\in\mathbb R$、連続配当利回り $q\ge0$、変動率 $\sigma>0$ を固定します。変動率の単位は年$^{-1/2}$、$r,q$ は年$^{-1}$ です。

取引費用・空売り制約・税のない、株式と預金を連続取引できる BSM 市場です。配当は保有1株当たり $qS_u\,du$ 円であり、[$Q$ 下の株価過程](../U3-19/index.md#thm-u3-19-bsm-dividend)は

$$
dS_u=(r-q)S_u\,du+\sigma S_u\,dW_u^Q,\qquad S_t=s.
$$

$Q$ は**価格付け用の測度**であり、将来の実損益を予測する測度 $P$ とは区別します。[欧州型 call/put](../U3-05/index.md#def-u3-05-european)について、残存期間を明示した価格関数を $C(t,s;K,r,q,\sigma,T)$、$P(t,s;K,r,q,\sigma,T)$ と書きます。以下では $K,T,q$ を動かさない偏微分が基本で、他の変数を固定したまま一つだけ動かします。

[配当付き閉形式](../U3-19/index.md#thm-u3-19-bsm-dividend)と[標準正規密度・分布関数](../U3-18/index.md#def-u3-18-normal-indices)を再掲して記号を揃えます。

$$
\begin{aligned}
A&=e^{-q\tau},\qquad D=e^{-r\tau},\\
d_1&=\frac{\log(s/K)+(r-q+\sigma^2/2)\tau}{\sigma\sqrt{\tau}},
\qquad d_2=d_1-\sigma\sqrt{\tau},\\
C&=sA\Phi(d_1)-KD\Phi(d_2),\\
P&=KD\Phi(-d_2)-sA\Phi(-d_1).
\end{aligned}
$$

この式は $s,K,\sigma,\tau>0$ で滑らかです。一方、満期 $t=T$ の支払関数には $s=K$ に折れ目があるので、満期での微分可能性を前提にしてはいけません。

## 2. Greeks：微分する対象と単位

小さな株価変化 $\Delta s$ に対して接線の近似 $v(t,s+\Delta s)\approx v(t,s)+v_s\Delta s$ を作れます。ただし接線は曲線そのものではありません。二階導関数がその曲がり具合を測ります。金利、変動率、残存時間を動かした微分も区別しておけば、価格変化の理由を分解できます。

<a id="def-u3-20-greeks"></a>

<!-- formal-statement-start -->
> **定義（Delta・Gamma・Vega・Theta・Rho）**  
> $0\le t<T$、$s,K,\sigma>0$、$r\in\mathbb R$、$q\ge0$ とし、$v=C$ または $v=P$ を前節の欧州型オプション価格とする。$K,T$ と、微分する変数以外の市場パラメータを固定して、次を定める。

$$
\Delta_v=\frac{\partial v}{\partial s},\qquad
\Gamma_v=\frac{\partial^2v}{\partial s^2},\qquad
\mathcal V_v=\frac{\partial v}{\partial \sigma},
$$

$$
\Theta_v=\frac{\partial v}{\partial t}\bigg|_{T\text{ 固定}},
\qquad
\rho_v=\frac{\partial v}{\partial r}.
$$

> それぞれ Delta、Gamma、Vega、Theta、Rho と呼ぶ。Theta は**暦が進む向き**であり、残存年数に関する微分は $\partial_\tau v=-\Theta_v$ である。$q$ はここでは固定する。
<!-- formal-statement-end -->

定義の単位を確認します。オプション1単位の価格が円、$s$ が円/株なら、Delta は株、Gamma は株²/円（株数を無次元の単位数量とみなせば円$^{-1}$）です。Vega は「変動率を年$^{-1/2}$ の単位で1増加させたときの円の微分」、Theta は円/年、Rho は「金利を年$^{-1}$ の単位で1増加させたときの円の微分」です。**Vega と Rho の値は「1%ポイント変化当たり」ではなく、$0.01$ を掛けて初めてその単位の概算**になります。

<!-- definition-example-start: def-u3-20-greeks -->
**定義の直接確認**：満期に $S_T-K$ 円を受け取る[先渡契約の価値](../U3-19/index.md#thm-u3-19-forward) $f(t,s)=se^{-q\tau}-Ke^{-r\tau}$ を使います。これは折れ目がなく、微分の対象が実在する例です。$K,T,q$ 固定で

$$
f_s=A,\quad f_{ss}=0,\quad f_\sigma=0,\quad
f_t=qsA-rKD,\quad f_r=K\tau D.
$$

$s=K=100$ 円、$r=0.05,q=0.02,\tau=1$ 年なら $f_s=e^{-0.02}\approx0.980199$、$f_{ss}=f_\sigma=0$、$f_t=2e^{-0.02}-5e^{-0.05}\approx-2.795750$ 円/年、$f_r=100e^{-0.05}\approx95.122942$ です。$f$ が $\sigma$ に依存しないので Vega が0なのも、Gamma が0なのも**定義から直接判定**できました。
<!-- definition-example-end -->

株価が100円から101円に動くとき、上の先渡では価格変化は厳密に $A$ 円です。しかし call では Gamma が0でないため、Delta だけの線形予測にはずれが生じます。

## 3. 配当付き Black–Scholes 価格を実際に微分する

5種類の Greeks は各々別の公式として暗記するより、[配当付き価格公式](../U3-19/index.md#thm-u3-19-bsm-dividend)を偏微分して、正規密度の項がなぜ消えるかを確かめる方が確実です。

<a id="thm-u3-20-bsm-greeks"></a>

<!-- formal-statement-start -->
> **定理（配当付き欧州型 call/put の Greeks）**  
> $0\le t<T$、$s,K,\sigma>0$、$r\in\mathbb R,q\ge0$ を定数とし、前節の摩擦なし・連続取引可能な配当付き BSM 市場を仮定する。$A,D,d_1,d_2,\Phi,\phi$ を第1節の記号とすると、call の感応度は

$$
\Delta_C=A\Phi(d_1),\qquad
\Gamma_C=\frac{A\phi(d_1)}{s\sigma\sqrt{\tau}},
\qquad \mathcal V_C=sA\phi(d_1)\sqrt{\tau},
$$

$$
\Theta_C=qsA\Phi(d_1)-rKD\Phi(d_2)
-\frac{sA\sigma\phi(d_1)}{2\sqrt{\tau}},
\qquad
\rho_C=K\tau D\Phi(d_2).
$$

> put の感応度は

$$
\Delta_P=-A\Phi(-d_1),\qquad
\Gamma_P=\Gamma_C,\qquad \mathcal V_P=\mathcal V_C,
$$

$$
\Theta_P=-qsA\Phi(-d_1)+rKD\Phi(-d_2)
-\frac{sA\sigma\phi(d_1)}{2\sqrt{\tau}},
\qquad
\rho_P=-K\tau D\Phi(-d_2).
$$

> 特に $s,\sigma,\tau>0$ では $\Gamma_C=\Gamma_P>0$、$\mathcal V_C=\mathcal V_P>0$ が成立する。
<!-- formal-statement-end -->

**証明の見取り図**：まず「株価重み付き正規密度」と「行使価格重み付き正規密度」が一致する恒等式を作ります。これを使うと、株価・変動率・金利の微分で出てくる正規密度項が打ち消し合います。時間の微分は、最後に $\tau=T-t$ の符号を反転します。

<!-- proof-start -->
### 証明

[配当付き価格の導出](../U3-19/index.md#thm-u3-19-bsm-dividend)でも使った $d_1-d_2=\sigma\sqrt{\tau}$ と

$$
d_1^2-d_2^2=(d_1-d_2)(d_1+d_2)
=2\{\log(s/K)+(r-q)\tau\}
$$

から、$\phi(x)=e^{-x^2/2}/\sqrt{2\pi}$ を代入すると

$$
\frac{\phi(d_1)}{\phi(d_2)}
=e^{-(d_1^2-d_2^2)/2}
=\frac Ks e^{-(r-q)\tau},
\qquad
sA\phi(d_1)=KD\phi(d_2).
$$

これを**密度恒等式**とします。$d_1,d_2$ の株価微分はどちらも $1/(s\sigma\sqrt{\tau})$ なので、積の微分をすべて書くと

$$
\begin{aligned}
C_s&=A\Phi(d_1)+sA\phi(d_1)\frac1{s\sigma\sqrt{\tau}}
-KD\phi(d_2)\frac1{s\sigma\sqrt{\tau}}\\
&=A\Phi(d_1).
\end{aligned}
$$

もう一度 $s$ で微分します。$A$ は $s$ と無関係なので

$$
C_{ss}=A\phi(d_1)\frac{\partial d_1}{\partial s}
=\frac{A\phi(d_1)}{s\sigma\sqrt{\tau}}.
$$

変動率微分では

$$
\partial_\sigma d_1
=-\frac{\log(s/K)+(r-q)\tau}{\sigma^2\sqrt{\tau}}
+\frac{\sqrt{\tau}}2,\qquad
\partial_\sigma d_2=\partial_\sigma d_1-\sqrt{\tau}.
$$

従って二つの密度項の係数は

$$
\begin{aligned}
C_\sigma
&=sA\phi(d_1)\,\partial_\sigma d_1
-KD\phi(d_2)\,\partial_\sigma d_2\\
&=sA\phi(d_1)(\partial_\sigma d_1-\partial_\sigma d_2)
=sA\phi(d_1)\sqrt{\tau}.
\end{aligned}
$$

金利については $\partial_r d_1=\partial_r d_2=\sqrt{\tau}/\sigma$、$\partial_r D=-\tau D$ なので

$$
\begin{aligned}
C_r&=sA\phi(d_1)\frac{\sqrt{\tau}}{\sigma}
+K\tau D\Phi(d_2)-KD\phi(d_2)\frac{\sqrt{\tau}}{\sigma}\\
&=K\tau D\Phi(d_2).
\end{aligned}
$$

Theta では満期 $T$ を固定し $\partial_t=-\partial_\tau$ とします。$\ell=\log(s/K)$ と書けば

$$
\partial_\tau d_1=
-\frac{\ell}{2\sigma\tau^{3/2}}
+\frac{r-q+\sigma^2/2}{2\sigma\sqrt{\tau}},
\qquad
\partial_\tau d_2=\partial_\tau d_1-\frac{\sigma}{2\sqrt{\tau}}.
$$

$A_\tau=-qA$、$D_\tau=-rD$ と密度恒等式を使って

$$
\begin{aligned}
C_\tau
&=-qsA\Phi(d_1)+sA\phi(d_1)\partial_\tau d_1
+rKD\Phi(d_2)-KD\phi(d_2)\partial_\tau d_2\\
&=-qsA\Phi(d_1)+rKD\Phi(d_2)
+\frac{sA\sigma\phi(d_1)}{2\sqrt{\tau}},
\end{aligned}
$$

となり、$C_t=-C_\tau$ から call の Theta が得られます。

put は[配当付き put–call parity](../U3-19/index.md#prop-u3-19-parity) $P=C-sA+KD$ を**同じ変数を固定する規則**で微分すればよい。例えば

$$
P_s=C_s-A=-A\Phi(-d_1),\quad
P_r=C_r-K\tau D=-K\tau D\Phi(-d_2),
$$

$$
P_t=C_t-qsA+rKD
=-qsA\Phi(-d_1)+rKD\Phi(-d_2)
-\frac{sA\sigma\phi(d_1)}{2\sqrt{\tau}}.
$$

さらに $(-sA+KD)_{ss}=(-sA+KD)_\sigma=0$ だから Gamma、Vega は call と一致します。$A,s,\sigma,\tau,\phi(d_1)$ は正なので、Gamma と Vega の正値性も成立します。
<!-- proof-end -->

**数値を式で確認する**：$s=K=100$ 円、$r=0.05,q=0.02,\sigma=0.20,\tau=1$ 年で $d_1=0.25,d_2=0.05$、$\phi(0.25)=e^{-0.25^2/2}/\sqrt{2\pi}$ です。計算は以下の通りです（入力は連続複利、年換算済み）。

| 量 | call | put |
| --- | ---: | ---: |
| 価格（円） | 9.227006 | 6.330081 |
| Delta（株） | 0.586851 | −0.393348 |
| Gamma（円$^{-1}$、株単位省略） | 0.018951 | 0.018951 |
| Vega（変動率1単位当たり円） | 37.901158 | 37.901158 |
| Theta（円/年） | −5.089319 | −2.293569 |
| Rho（金利1単位当たり円） | 49.458109 | −45.664833 |

例えば変動率が $0.20$ から $0.21$ へ変わるとき、一次予測は $37.901158\times0.01=0.379012$ 円です。年率金利が5%から6%へ動く一次予測は $49.458109\times0.01=0.494581$ 円ですが、**有限幅の変化に対する厳密な価格差ではありません**。

株価に対しては接線と二次近似を並べると曲率が見えます。$C(100)=9.2270055$、$\Delta_C=0.5868511$、$\Gamma_C=0.0189506$ を基準に、$\delta=s-100$ として

$$
C(100+\delta)\approx C(100)+\Delta_C\delta+\tfrac12\Gamma_C\delta^2.
$$

| 株価（円） | 閉形式（円） | 接線近似（円） | 二次近似（円） |
| --- | ---: | ---: | ---: |
| 98 | 8.091749 | 8.053303 | 8.091204 |
| 100 | 9.227006 | 9.227006 | 9.227006 |
| 102 | 10.438019 | 10.400708 | 10.438609 |

この数値表は、接線が二次曲率を落としていることと、二次近似にも三次以上の残差があることを示します。静的な比較表だけで誤差の符号・量を追えるため、本講では操作アニメーションを使いません。

## 4. 中心差分は何を確認し、どこで壊れるか

解析微分の符号を別経路で検算するため、$s$ だけを $s\pm h_s$ に変更して、価格を直接二回計算します。正の刻み $0<h_s<s$ に対し

$$
\Delta^{(h_s)}=\frac{C(s+h_s)-C(s-h_s)}{2h_s},\qquad
\Gamma^{(h_s)}=\frac{C(s+h_s)-2C(s)+C(s-h_s)}{h_s^2}.
$$

変動率の中心差分は $\sigma\pm h_\sigma$（$0<h_\sigma<\sigma$）、金利の中心差分は $r\pm h_r$ とします。Theta は満期 $T$ を固定して評価時刻を動かすため、$0<h_t<\tau$ として

$$
\Theta^{(h_t)}
=-\frac{C(\tau+h_t)-C(\tau-h_t)}{2h_t}.
$$

この最後の負号を落とすと、残存期間が**長く**なる方向の微分を Theta と誤読します。$C(\tau\pm h_t)$ は金利・配当・変動率・株価・行使価格は変えず、残存期間だけを変えた価格です。

<a id="prop-u3-20-central-difference"></a>

<!-- formal-statement-start -->
> **命題（滑らかな価格に対する中心差分の局所誤差）**  
> 実数 $x$ の近傍で $f$ が4回連続微分可能、$h>0$ が十分小さく $x\pm h$ が定義域内にあるとする。このとき、一階中心差分と二階中心差分はそれぞれ $f'(x)+O(h^2)$、$f''(x)+O(h^2)$ である。ただし後者の評価では4階導関数が有界な近傍を考える。
<!-- formal-statement-end -->

**証明の見取り図**：$x+h$ と $x-h$ の Taylor 展開を足すと奇数次、引くと偶数次が消えます。

<!-- proof-start -->
### 証明

$h$ が十分小さいとき、Taylor 展開の三次までの項を取り、4階剰余を $R_\pm=O(h^4)$ と書くと

$$
f(x\pm h)=f(x)\pm hf'(x)+\frac{h^2}2f''(x)
\pm\frac{h^3}6f'''(x)+R_\pm.
$$

差を $2h$ で割ると

$$
\frac{f(x+h)-f(x-h)}{2h}
=f'(x)+\frac{h^2}{6}f'''(x)+O(h^3)=f'(x)+O(h^2).
$$

二階差分では4階までの項も必要です。連続な4階導関数に対し

$$
f(x+h)+f(x-h)-2f(x)
=h^2f''(x)+\frac{h^4}{12}f^{(4)}(x)+o(h^4),
$$

だから $h^2$ で割れば $f''(x)+h^2 f^{(4)}(x)/12+o(h^2)$ です。
<!-- proof-end -->

**適用条件**：BSM の滑らかな領域 $t<T,s>0,\sigma>0$ で局所的には正しいですが、満期の $s=K$ では payoff が折れ曲がり Gamma は通常の二階導関数として存在しません。$h\downarrow0$ の打切り誤差は減っても、浮動小数演算の桁落ちは $h$ を小さくしすぎると増えます。よって「刻みが小さいほど必ず正しい」という判断も誤りです。

## 5. 日次のデルタ・ヘッジ：自己金融と残差

理論上の[自己金融デルタ複製](../U3-16/index.md#thm-u3-16-bsm-replication)ではデルタを価格の連続変化に合わせて動かします。実際に1日だけデルタを固定すると、その間の曲がりを株式で再現できません。

時刻 $t$ に call 1単位を**空売り**し、受け取った $C=C(t,s)$ 円を用いて $\Delta_C$ 株を買います。預金に入れる額は $b=C-\Delta_C s$ 円であり、負なら借入です。これでオプションを含む初期純資産は $-C+\Delta_C s+b=0$ 円です。

<a id="def-u3-20-hedge-pnl"></a>

<!-- formal-statement-start -->
> **定義（1区間固定デルタ・ヘッジ損益）**  
> $t<T$、$0<h<T-t$ とし、時刻 $t$ の call 価格を $C$、デルタを $\Delta=C_s(t,s)$、預金残高を $b=C-\Delta s$ とする。$\Delta$ 株を区間中変更せず、時刻 $t+h$ の株価が $s'=S_{t+h}>0$ のとき、期間中の配当受取を左端近似 $q\Delta s h$ と評価した、**call 1単位の売り手**のヘッジ純損益を

$$
\Pi_h=\Delta(s'-s)+b(e^{rh}-1)
+q\Delta s h-\{C(t+h,s')-C(t,s)\}
$$

> と定める。配当利回り $q=0$ のとき、この式の配当近似は不要である。$q>0$ では真の連続配当受取額 $\int_t^{t+h}q\Delta S_u\,du$ の左端近似であり、離散取引損益を**厳密な連続時間自己金融損益**と同一視しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-20-hedge-pnl -->
**定義の直接確認**：満期に確定 $K$ 円を支払う債務の価格 $v(t)=Ke^{-r(T-t)}$ では $\Delta=0$、$b=v(t)$ です。時刻 $t+h$ で $v(t+h)=v(t)e^{rh}$ なので

$$
\Pi_h=b(e^{rh}-1)-\{v(t+h)-v(t)\}=0.
$$

株式・配当項はどちらも0で、固定額の複製ではヘッジ誤差が出ないと確認できます。これは株価がどんな経路をたどっても成立します。
<!-- definition-example-end -->

Gamma による主項を取り出しましょう。終端の価格を Taylor 展開すれば、デルタ保有の一次変化 $\Delta(s'-s)$ が価格変化の一次項を打ち消します。残るのは Theta、Gamma、金利・配当です。

<a id="thm-u3-20-hedge-error"></a>

<!-- formal-statement-start -->
> **定理（小区間デルタ・ヘッジ誤差の主項）**  
> $s,K,\sigma>0$、$r\in\mathbb R,q\ge0$ を固定し、$t<T$ で配当付き BSM の call を1単位売って、時刻 $t$ にデルタを設定し区間 $[t,t+h]$ では保有株数を固定する。$Q$ 下の GBM の増分 $Z=(W_{t+h}^Q-W_t^Q)/\sqrt h\sim N(0,1)$ を用い、配当を上記の左端近似で扱う。このとき $h\downarrow0$ で

$$
\Pi_h=\frac12\Gamma_C(t,s)\sigma^2s^2h(1-Z^2)
+O_P(h^{3/2}).
$$

> ここで $O_P(h^{3/2})$ は確率的な次数で、固定した $t<T,s>0$ の周辺での局所漸近を表す。符号は**short call + long delta** の損益であり、買い手側で符号が反転する。
<!-- formal-statement-end -->

**証明の見取り図**：価格変化の二階項から $\tfrac12\Gamma(\Delta S)^2$ が現れます。一方、Theta と預金・配当のドリフト項は [配当付き BSM 方程式](../U3-16/index.md#prop-u3-16-dividend-pde)で $\tfrac12\Gamma\sigma^2s^2h$ に変換できます。その差がヘッジ残差です。

<!-- proof-start -->
### 証明

$X=S_{t+h}-s$ と書きます。[GBM の陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)から、$a=r-q-\sigma^2/2$ として

$$
S_{t+h}=s\exp(ah+\sigma\sqrt h Z),
\qquad
X=s\sigma\sqrt h Z+O_P(h).
$$

指数関数の二次 Taylor 展開と $Z$ の有限モーメントを用いると $X=O_P(\sqrt h)$ かつ

$$
X^2=s^2\sigma^2hZ^2+O_P(h^{3/2}).
$$

$t<T$ と $s>0$ の固定した近傍では $C$ の必要な偏導関数が連続かつ局所有界です。二変数 Taylor 展開（$h=O(h)$、$X=O_P(\sqrt h)$）により

$$
C(t+h,s+X)-C(t,s)
=C_t h+C_s X+\frac12 C_{ss}X^2+O_P(h^{3/2}).
$$

ここで混合項 $C_{ts}hX=O_P(h^{3/2})$、三次項 $C_{sss}X^3=O_P(h^{3/2})$ であり、時間二次項は $O(h^2)$ です。

定義の $\Pi_h$ へ $b=C-s\Delta$ と $\Delta=C_s$ を代入します。金利の指数を $e^{rh}-1=rh+O(h^2)$ と展開すると

$$
\begin{aligned}
\Pi_h
&=\Delta X+(C-s\Delta)rh+q\Delta s h\\
&\quad-C_t h-\Delta X-\frac12\Gamma X^2+O_P(h^{3/2})\\
&=\{rC-(r-q)sC_s-C_t\}h
-\frac12\Gamma X^2+O_P(h^{3/2}).
\end{aligned}
$$

[配当付き BSM 方程式](../U3-16/index.md#prop-u3-16-dividend-pde)は $C_t+(r-q)sC_s+\tfrac12\sigma^2s^2C_{ss}-rC=0$ だから

$$
rC-(r-q)sC_s-C_t=\frac12\sigma^2s^2\Gamma.
$$

従って

$$
\Pi_h=\frac12\Gamma\{\sigma^2s^2h-X^2\}+O_P(h^{3/2})
=\frac12\Gamma\sigma^2s^2h(1-Z^2)+O_P(h^{3/2}).
$$

配当の左端近似と真の $\int_t^{t+h}q\Delta S_u\,du$ の差は、$S_u-s=O_P(\sqrt h)$ の積分から $O_P(h^{3/2})$ なので、表示した主項は変わりません。ただし $h$ が固定で大きければこの近似の正確性を保証しません。
<!-- proof-end -->

**重要な解釈**：$Z^2$ が1より大きい大変動の日は、Gamma が正の call を売った側の損益は負になりやすい。一方、$Z=0$ のように予測上の変動率よりも実現した二乗変化が小さい日は、主項が正です。これは取引費用・裁量・モデルずれのない1区間の **$Q$ モデル診断** であり、$Q$ で毎日利益を得られるという主張ではありません。$E_Q[Z^2]=1$ なので、**主項の $Q$ 期待値は0** です。実測のリスクや保有期間損益は $P$ 下の市場変動も調べる必要があります。

## 6. 解析微分・中心差分・日次損益の再現可能な比較

再現入力は $s=K=100$ 円、$T-t=1$ 年、$r=0.05,q=0.02,\sigma=0.20$、1日 $h=1/252$ 年（この例でのみ1年を252営業日と定義）です。価格の微分には株価刻み0.5円、変動率刻み0.005、金利刻み0.0001、Theta 用残存期間刻み $1/252$ 年を用います。まず同じ中心差分を半分の刻みでも計算し、収束が滑らかな領域で改善するか見ます。

日次シナリオは $Z=0,1,2$ を入力とし、[GBM の陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)に $h$ を代入して翌日の株価 $S_{t+h}$ を求めます。オプションは残存期間 $1-h$ 年で**再評価**し、前日のデルタで固定した株数と預金・近似配当から純損益を計算します。短い1区間の実験なので、取引費用・日中リバランスはありません。

| $Z$ | 翌日株価（円） | short call 固定デルタ損益（円） | Gamma–Theta 主項（円） |
| ---: | ---: | ---: | ---: |
| 0 | 100.003968 | +0.015057 | +0.015040 |
| 1 | 101.271870 | +0.000026 | 0 |
| 2 | 102.555847 | −0.045367 | −0.045120 |

ここでの「主項」は上の定理の $\tfrac12\Gamma\sigma^2s^2h(1-Z^2)$ です。$Z=1$ のとき主項が0でも、有限区間の三次以上の項や配当近似の影響まで消えるとは限りません。実際の差は実装で出力します。$Z$ は実現した標準化増分の例であり、確率や将来価格の予言ではありません。

**ブラウザ実行**：以下のパネルはリポジトリに保存した同じ Python 3.10 以降の標準ライブラリソースを実行します。初回の Pyodide ダウンロードには通信が必要です。データ取得・APIキー・外部 Python ライブラリ・乱数は不要です。出力は公式・中心差分の差、parity、3シナリオの翌日価格・損益です。ローカル実行とテスト方法は [assets/README.md](assets/README.md) にあります。

```python-file-lab
# lab-id: U3-20-GREEKS-HEDGE
# lab-title: 配当付き Greeks と日次固定デルタ・ヘッジの誤差
# lab-file: textbook/volumes/dream_thater/応用系/U/U3-20/assets/greeks_hedge.py
# timeout-ms: 20000
# lab-preset: 中心差分、PDE、日次シナリオを照合 |
```

**数値誤差の内訳**：閉形式・解析微分との比較では浮動小数丸めと中心差分の $O(h^2)$ 打切り誤差が生じます。シナリオ表の「正確な損益」は左端配当規約を採用した**離散再評価値**であり、Gamma–Theta 主項との差には高次の確率変動と配当近似誤差が含まれます。標本平均を推定する Monte Carlo 実験ではないため、ここでは統計的標準誤差を報告しません。時間計算量は1シナリオ当たり定数回の閉形式評価 $O(1)$、作業記憶量も $O(1)$ です。

## 7. 破綻条件と取り違え

- **満期・権利行使価格の折れ目**：$t=T,s=K$ では payoff が微分可能でなく、Gamma・Delta の定義をそのまま代入できません。$t<T$ に戻してから微分し、極限の順序と $s=K$ を分けて考えます。
- **$\sigma\to0$**：Black–Scholes 指標の分母が消えます。確定株価を使う[ゼロ変動率の境界](../U3-19/index.md#thm-u3-19-bsm-dividend)へ戻り、公式へ $\sigma=0$ を代入しません。
- **大きなジャンプ・急変・手数料**：日次ヘッジの主項は $h\downarrow0$、GBM の連続経路の漸近です。ジャンプ、取引費用、流動性不足ではこの理想化モデルの損益式に追加の項が必要です。
- **$q>0$ の保有配当**：株式の値上がり損益だけにせず、配当受取を加えます。一方、確定現金配当と一定の $q$ は[異なる契約](../U3-19/index.md#prop-u3-19-deterministic-term)です。
- **Theta の符号と感応度の定義**：$\partial_t v=-\partial_\tau v$、Vega と Rho は1単位変化当たり、1%ポイントには $0.01$ を掛けます。「Theta は常に負」も一般には成り立ちません。金利や配当がある put や深い行使状態では符号が変わる場合があります。

## 8. 演習と詳細解答

断りがなければ前節と同じ摩擦なし配当付き BSM 市場を用い、$t<T,s,K,\sigma>0,r\in\mathbb R,q\ge0$ とします。価格は円、時間は年、率は連続複利年率です。

<a id="ex-u3-20-a1"></a>
### U3-20-A1：偏微分で固定する変数
- Level: A

配当付き先渡価値 $f=se^{-q\tau}-Ke^{-r\tau}$ に対して、Delta、Gamma、Vega、Theta、Rho を求めよ。満期 $T$ は固定すること。

<!-- solution-start -->
**詳細解答**：[先渡価値](../U3-19/index.md#thm-u3-19-forward)を $s$ で一階・二階微分すると $f_s=e^{-q\tau}$、$f_{ss}=0$。変動率 $\sigma$ は式にないため $f_\sigma=0$ です。$\partial_t\tau=-1$ だから $\partial_te^{-q\tau}=qe^{-q\tau}$、$\partial_te^{-r\tau}=re^{-r\tau}$。従って $f_t=qse^{-q\tau}-rKe^{-r\tau}$ です。最後に $\partial_r e^{-r\tau}=-\tau e^{-r\tau}$ より $f_r=K\tau e^{-r\tau}$。Theta を $f_\tau$ と誤って符号反転しないことが重要です。
<!-- solution-end -->

<a id="ex-u3-20-a2"></a>
### U3-20-A2：call と put のデルタ範囲
- Level: A

$0\le q$、$t<T$ の下で、欧州型 call と put のデルタがそれぞれ $0<\Delta_C<A$、$-A<\Delta_P<0$ を満たすことを示せ。

<!-- solution-start -->
**詳細解答**：[Greeks 定理](#thm-u3-20-bsm-greeks)を使う前に、$d_1$ が有限実数であることを $s,K,\sigma,\tau>0$ から確認します。標準正規密度は正なので $0<\Phi(d_1)<1$ です。$A=e^{-q\tau}>0$ を掛けると $0<A\Phi(d_1)<A$。put は $\Delta_P=-A\Phi(-d_1)$、$0<\Phi(-d_1)<1$ なので $-A<\Delta_P<0$。$q\ge0$ ならさらに $A\le1$ です。
<!-- solution-end -->

<a id="ex-u3-20-a3"></a>
### U3-20-A3：Vega と Rho の1%ポイント
- Level: A

$s=K=100,r=.05,q=.02,\sigma=.20,\tau=1$ の call で Vega と Rho を用い、$\sigma$ と $r$ を各 $0.01$ 上げる**別々の一次予測**を求めよ。

<!-- solution-start -->
**詳細解答**：[Greeks 定理](#thm-u3-20-bsm-greeks)と $d_1=.25,d_2=.05$ を用いると

$$
\mathcal V=100e^{-.02}\phi(.25)\sqrt1
\approx37.901158,\quad
\rho=100\cdot1\cdot e^{-.05}\Phi(.05)\approx49.458109.
$$

従って $\Delta C_{\sigma}\approx37.901158(0.01)=0.379012$ 円、$\Delta C_r\approx49.458109(0.01)=0.494581$ 円です。両者は別の偏微分であり、同時変更の厳密価格差を単純な足し算で保証するものではありません。
<!-- solution-end -->

<a id="ex-u3-20-a4"></a>
### U3-20-A4：Theta と残存期間の向き
- Level: A

$s=K=100,r=.05,q=.02,\sigma=.20,\tau=1$ の call で Theta が約 $-5.089319$ 円/年である。価格関数で $s$ ほかの引数を固定して1営業日 $\delta=1/252$ 年進めると、時間変化だけの一次予測は何円か。なぜ符号が負か。

<!-- solution-start -->
**詳細解答**：[Theta の定義](#def-u3-20-greeks)は $\partial_tC$ ですから、時刻が $\delta$ 進むと $C(t+\delta,s)-C(t,s)\approx\Theta\delta$。数値は $-5.089319/252\approx-0.020196$ 円です。$T$ 固定なら残存年数は $\tau-\delta$ に減り、$\partial_\tau C=-\Theta$ のため、$\partial_\tau C$ を使う場合は $\Delta\tau=-\delta$ も掛ける必要があります。この特定の call では Theta が負ですが、一般のすべてのオプションに同じ符号を仮定しません。
<!-- solution-end -->

<a id="ex-u3-20-a5"></a>
### U3-20-A5：中心差分の消える項
- Level: A

$f(x)=x^3$、$x=2$ で一階中心差分と二階中心差分を任意の $h>0$ について計算し、真の導関数との差と符号を出せ。

<!-- solution-start -->
**詳細解答**：$(2+h)^3=8+12h+6h^2+h^3$、$(2-h)^3=8-12h+6h^2-h^3$ です。差を $2h$ で割ると $12+h^2$ となり、$f'(2)=3(2)^2=12$ より誤差は $+h^2$。和から $2f(2)=16$ を引くと $12h^2$ なので、二階差分は $12$、$f''(2)=6(2)=12$ と厳密に一致します。奇数次が和で消え、偶数次が差で消えることを展開式から確認できます。
<!-- solution-end -->

<a id="ex-u3-20-b1"></a>
### U3-20-B1：密度恒等式から Gamma を再構成
- Level: B

配当付き call 価格の式から $sA\phi(d_1)=KD\phi(d_2)$ を再導出し、Delta と Gamma の公式を証明せよ。

<!-- solution-start -->
**詳細解答**：$d_1-d_2=\sigma\sqrt\tau$、$d_1+d_2=2\{\log(s/K)+(r-q)\tau\}/(\sigma\sqrt\tau)$ なので、その積は $d_1^2-d_2^2=2\{\log(s/K)+(r-q)\tau\}$。よって

$$
\phi(d_1)/\phi(d_2)=e^{-(d_1^2-d_2^2)/2}
=(K/s)e^{-(r-q)\tau}.
$$

右辺に $s e^{-q\tau}\phi(d_2)$ を掛けると $sA\phi(d_1)=K e^{-r\tau}\phi(d_2)=KD\phi(d_2)$。$d_{1,s}=d_{2,s}=1/(s\sigma\sqrt\tau)$ を価格 $C=sA\Phi(d_1)-KD\Phi(d_2)$ に代入して積微分すると、密度項の差が0になり $\Delta_C=A\Phi(d_1)$。もう一度微分して $\Gamma_C=A\phi(d_1)/(s\sigma\sqrt\tau)>0$ が得られます。正値性には $s,\sigma,\tau,A,\phi(d_1)>0$ を使いました。
<!-- solution-end -->

<a id="ex-u3-20-b2"></a>
### U3-20-B2：Vega と Rho の打消し
- Level: B

配当付き call で $C_\sigma$ と $C_r$ の公式を、$d_1,d_2$ の偏微分から導け。

<!-- solution-start -->
**詳細解答**：$a=\sigma\sqrt\tau$ と置き $d_2=d_1-a$ とします。$\partial_\sigma d_2=\partial_\sigma d_1-\sqrt\tau$ だから、[密度恒等式](#thm-u3-20-bsm-greeks)を使って

$$
C_\sigma=sA\phi(d_1)\partial_\sigma d_1-KD\phi(d_2)\partial_\sigma d_2
=sA\phi(d_1)\sqrt\tau.
$$

また $\partial_r d_1=\partial_r d_2=\tau/(\sigma\sqrt\tau)=\sqrt\tau/\sigma$、$D_r=-\tau D$ です。従って

$$
C_r=sA\phi(d_1)\frac{\sqrt\tau}{\sigma}
+K\tau D\Phi(d_2)-KD\phi(d_2)\frac{\sqrt\tau}{\sigma}
=K\tau D\Phi(d_2).
$$

両式とも密度恒等式で消えるのは、指数重み付き株価項と行使価格項の**境界移動成分**です。
<!-- solution-end -->

<a id="ex-u3-20-b3"></a>
### U3-20-B3：Theta の符号を PDE で照合
- Level: B

配当付き BSM 方程式を使い、$s=K=100,r=.05,q=.02,\sigma=.20,\tau=1$ の call の Theta と Gamma・Delta の関係を数値で検査し、put の Theta が call と異なる理由を parity から説明せよ。

<!-- solution-start -->
**詳細解答**：[配当付き BSM 方程式](../U3-16/index.md#prop-u3-16-dividend-pde)で $C_t=\Theta_C$、$C_s=\Delta_C$、$C_{ss}=\Gamma_C$ とすると

$$
\Theta_C=rC-(r-q)s\Delta_C-\frac12\sigma^2s^2\Gamma_C.
$$

数値を代入すると右辺は

$$
.05(9.2270055)-.03(100)(.5868511)-\tfrac12(.2)^2(100)^2(.01895058)
$$

$$
\approx0.4613503-1.7605534-3.7901158=-5.0893189.
$$

put は[配当付き parity](../U3-19/index.md#prop-u3-19-parity) $P=C-sA+KD$ を $t$ で微分し、$\Theta_P=\Theta_C-qsA+rKD$ です。従って $-5.0893189-2e^{-.02}+5e^{-.05}\approx-2.2935691$ 円/年。parity の二項も時間で変化するため Theta は一致しません。
<!-- solution-end -->

<a id="ex-u3-20-b4"></a>
### U3-20-B4：一日後の自己金融損益
- Level: B

基準例で、call を1単位売り、その価格からデルタ株式を買い残りを預金へ置く。日数 $h=1/252$ 年、$Z=0$ と $Z=2$ を別々に実現したときの翌日株価、再評価価格、自己金融損益を計算せよ。配当は $q\Delta s h$ の左端近似とする。

<!-- solution-start -->
**詳細解答**：[Greeks 定理](#thm-u3-20-bsm-greeks)から $\Delta=0.5868511461$ 株、$C_0=9.2270055082$ 円です。現金は $b=C_0-\Delta s=9.2270055082-58.6851146135=-49.4581091053$ 円（借入）です。[GBM の陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)で $r-q-\sigma^2/2=.01$、$h=1/252$ とすると

$$
S_h=100\exp\{.01h+.2\sqrt h\,Z\}.
$$

$Z=0$ なら $S_h=100.003968333$ 円、残存期間 $1-h$ で[配当付き閉形式](../U3-19/index.md#thm-u3-19-bsm-dividend)を再評価すると $C_h=9.209120562$ 円。預金利息 $b(e^{.05h}-1)$、配当 $\Delta(.02)(100)h$、株式増減 $\Delta(S_h-100)$ を別々に加え、short call の価値変化を差し引けば

$$
\Pi_h=\Delta(S_h-100)+b(e^{.05h}-1)+.02\Delta(100)h-(C_h-C_0)
\approx+0.015057225\ \text{円}.
$$

$Z=2$ なら $S_h=102.555847111$ 円、$C_h=10.767118236$ 円です。同じ式を再評価すると $\Pi_h\approx-0.045367463$ 円。これは初日のデルタを翌日まで**変更しなかった**結果です。主項 $\tfrac12\Gamma\sigma^2s^2h(1-Z^2)$ はそれぞれ $+0.015040142$、$-0.045120426$ 円で、差には高次項と配当近似が残ります。
<!-- solution-end -->

<a id="ex-u3-20-c1"></a>
### U3-20-C1：Greeks・差分・ヘッジ残差を統合
- Level: C

$s=K=100,r=.05,q=.02,\sigma=.20,\tau=1$ とする。

1. call と put の Delta、Gamma、Vega、Theta、Rho を式で示し、Delta 差・Gamma 一致・Rho 差を parity と照合せよ。
2. 株価方向の中心差分を導出し、差分の切断誤差が二次となる条件を述べよ。
3. $h=1/252$ 年、$Z=2$ の short call 固定デルタ・ヘッジ損益と Gamma–Theta 主項の符号を、自己金融の現金収支から導け。
4. $\sigma\downarrow0$、$t\uparrow T$ で上の微分公式を無条件に代入できない理由と、$Q$ 期待値がゼロの主項から「$P$ 下で確実に儲かる」とは言えない理由を説明せよ。

<!-- solution-start -->
**詳細解答**：

**(1) 解析感応度と parity。** $d_1=(.05-.02+.2^2/2)/.2=.25$、$d_2=.05$、$A=e^{-.02}$、$D=e^{-.05}$ とします。[Greeks 定理](#thm-u3-20-bsm-greeks)に代入して call は

$$
\begin{aligned}
\Delta_C&=A\Phi(.25)\approx.586851146,\\
\Gamma_C&=\frac{A\phi(.25)}{100(.2)}\approx.018950579,\\
\mathcal V_C&=100A\phi(.25)\approx37.90115751,\\
\Theta_C&=.02(100)A\Phi(.25)-.05(100)D\Phi(.05)-100A(.2)\phi(.25)/2\\
&\approx-5.089318914,\\
\rho_C&=100D\Phi(.05)\approx49.458109105.
\end{aligned}
$$

put は $\Delta_P=-A\Phi(-.25)\approx-.393347527$、$\Gamma_P=\Gamma_C$、$\mathcal V_P=\mathcal V_C$、$\Theta_P=-.02(100)A\Phi(-.25)+.05(100)D\Phi(-.05)-100A(.2)\phi(.25)/2\approx-2.293569138$、$\rho_P=-100D\Phi(-.05)\approx-45.664833345$ です。[parity](../U3-19/index.md#prop-u3-19-parity)を $s,r$ で微分すると

$$
\Delta_C-\Delta_P=A\approx.980198673,\qquad
\rho_C-\rho_P=100D\approx95.12294245
$$

となり、二階 $s$ 微分では $(sA-KD)_{ss}=0$ より $\Gamma_C-\Gamma_P=0$ です。

**(2) 差分。** $C(s+h_s)$ と $C(s-h_s)$ を $s$ の周りで三次まで展開すると

$$
C(s\pm h_s)=C(s)\pm h_s C_s+\frac12h_s^2C_{ss}
\pm\frac16h_s^3C_{sss}+O(h_s^4).
$$

差を $2h_s$ で割れば $\Delta^{(h_s)}=C_s+\frac16h_s^2C_{sss}+O(h_s^3)$。和から $2C(s)$ を引き $h_s^2$ で割れば $\Gamma^{(h_s)}=C_{ss}+\frac1{12}h_s^2 C_{ssss}+o(h_s^2)$ です。$t<T,s>0,\sigma>0$、$s-h_s>0$ で近傍の必要な導関数が連続かつ有界であることが前提です。

**(3) 日次ヘッジ。** 時刻0に short call の受取 $C_0=9.227005508$ 円で $\Delta=.586851146$ 株を買い、残額 $b=C_0-\Delta(100)\approx-49.458109105$ 円を預金勘定へ入れます。$h=1/252$、$Z=2$ で

$$
S_h=100e^{(.05-.02-.02)h+.2\sqrt h(2)}
\approx102.555847111
$$

となり、翌日時点の $C_h=C(h,S_h)$ は $\tau=1-h$ で約10.767118236円です。利息 $b(e^{.05h}-1)$、配当 $\Delta(.02)(100)h$、株式の価格差を加え、short call の評価変動を引くと

$$
\Pi_h=\Delta(S_h-100)+b(e^{.05h}-1)
+.02\Delta(100)h-(C_h-C_0)\approx-0.045367463\ \text{円}.
$$

[ヘッジ誤差定理](#thm-u3-20-hedge-error)の主項は $\Gamma=.018950579$ を用いて

$$
\frac12(.018950579)(.2)^2(100)^2\frac1{252}(1-2^2)
\approx-0.045120426\ \text{円}.
$$

short call の売り手は Gamma が正の請求権を売っているため、大きな二乗変動で損失が出る符号です。

**(4) 適用範囲。** $\sigma=0$ では $d_i$ の分母が0で、確定株価 $S_T=s e^{(r-q)\tau}$ に立ち戻ります。$t=T$ では $s=K$ の payoff に折れ目があり、デルタやガンマを通常の微分で定義できません。また $Z\sim N(0,1)$ が $Q$ 下であるとき $E_Q[1-Z^2]=0$ ですが、これは $P$ 下の株価変動分布が同じだという主張ではなく、さらに現実の取引費用、配当の離散近似、高次誤差も残ります。よって $Q$ 主項の平均0から $P$ 下の確実な利益は推論できません。
<!-- solution-end -->

---

**本講の到達点**：価格の5種類の偏微分は変数・単位を明示して使い、解析式と中心差分で相互検証できます。連続複製と日次固定デルタでは、Gamma と実現した二乗変動によって損益が異なります。次講 **U3-21** は、満期前に権利行使を選べる American オプションを連続時間で評価する講義です。
