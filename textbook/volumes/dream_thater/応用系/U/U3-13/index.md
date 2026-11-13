# U3-13 金融モデルへの Itô 公式の適用

U3-12 では、CRR 二項木を細かくした極限として、対数株価に Brown 運動と負の二次補正が現れることを見ました。今回は逆に、**連続時間の株価を出発点にして、その対数や割引額がどう動くか**を計算します。微分の見た目を通常の連鎖律と同じにすると、株価の成長率と割引後の成長率を誤ります。

本講で使う一般定理は、既習の [Itô 過程版・時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) です。理論そのものの証明は STO7 に譲り、金融モデルの係数、関数の偏導関数、適用条件、数値検算を一つずつ示します。確率測度を変更してリスク中立価格を決定するのは U3-15、ヘッジから価格を決める方程式を導くのは U3-16 の課題です。

## 1. 株価モデルと適用できる関数

満期までを $0\le t\le T$（単位：年）とします。フィルトレーション $(\mathcal F_t)$ 上の標準 Brown 運動 $W$ を一つ固定し、配当のない株式の価格 $S$ が、以下の **Itô 積分の意味で**動くと仮定します。

$$
S_t=S_0+\int_0^t\mu S_u\,du+\int_0^t\sigma S_u\,dW_u,
\qquad S_0>0.
$$

ここで $\mu\in\mathbb R$ は年率のドリフト（年$^{-1}$）、$\sigma\ge0$ は変動係数（年$^{-1/2}$）です。両係数は定数で、株価の単位は円とします。特に $S$ は連続・適合で、任意の有限時間区間で正の標本路を持つと仮定します。本講では正値解の存在・一意性を別途証明済みと見なさず、**この仮定を満たす過程に関数を作用させる**問題に限定します（解の構成と分布は U3-14）。

確率積分が定義できることも確認します。正で連続な標本路は $[0,T]$ 上で有界だから

$$
\int_0^T|\mu S_u|\,du<\infty,\qquad
\int_0^T|\sigma S_u|^2\,du<\infty
\quad\text{ほとんど確実に}
$$

です。$\sigma S$ は連続適合ゆえ予測可能であり、[Itô 過程の定義](../../../解析系/STO/STO7/index.md#def-sto7-ito-process) に合致します。ここでいう $\mu$ は、確率測度を指定しないまま「リスク中立ドリフト」と断定した値ではありません。

[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) において $d=m=1$、$b_t=\mu S_t$、拡散係数 $\sigma_t^{11}=\sigma S_t$、したがって $a_t=\sigma^2S_t^2$ と対応させます。$F\in C^{1,2}([0,T]\times(0,\infty))$ は時間 $t$ で1回、株価を表す空間変数 $s$ で2回まで連続微分できることを意味します。$F_t=\partial F/\partial t$ は $s$ を固定した時間偏微分、$F_s=\partial F/\partial s$ と $F_{ss}=\partial^2F/\partial s^2$ は $t$ を固定した空間偏微分です。これらは $F(t,S_t)$ の確率微分 $dF(t,S_t)$ とは異なります。正値領域内で次の式を使います。

$$
\boxed{
dF(t,S_t)
=
\left(F_t+\mu S_tF_s+\frac12\sigma^2S_t^2F_{ss}\right)dt
+\sigma S_tF_s\,dW_t.
}
$$

偏導関数はすべて $(t,S_t)$ で評価します。原定理の空間領域は $\mathbb R$ ですが、$\log s$ や $s^p$ のように $s>0$ のみで滑らかな関数にも適用できます。

具体的には、株価が $[1/n,n]$ を離れる最初の時刻で停止して、そこで関数を滑らかに延長します。連続な正値標本路は各 $[0,T]$ 上で正の最小値と有限の最大値を持つため、十分大きい $n$ では停止が起こらず、元の区間の式が得られます。この確認抜きに、$\log$ を $s=0$ まで微分してはいけません。

## 2. なぜ対数成長率は $\mu$ より小さいのか

乗法的な株価変化を加法的に読みたいので $X_t=\log(S_t/S_0)$ を考えます。$S_0>0$ は固定した基準価格です。

<a id="prop-u3-13-log-price"></a>

<!-- formal-statement-start -->
> **命題（正の株価の Itô 対数変換）**  
> 前節の条件を満たす正の連続 Itô 過程 $S$ について $X_t=\log(S_t/S_0)$ とおく。このとき、任意の $0\le t\le T$ について、ほとんど確実に
>
$$
X_t=\left(\mu-\frac{\sigma^2}{2}\right)t+\sigma W_t
$$
>
> が成り立つ。特に
>
$$
dX_t=\left(\mu-\frac{\sigma^2}{2}\right)dt+\sigma\,dW_t.
$$
<!-- formal-statement-end -->

見取り図：通常の連鎖律なら $S^{-1}dS$ しか残りません。しかし Brown 運動の二次変分が $dt$ を生むため、$\log$ の二階導関数から $-\sigma^2/2$ が付け加わります。U3-12 の [CRR 対数価格の Brown 運動極限](../U3-12/index.md#thm-u3-12-crr-brownian-limit) は評価用確率の下で対数ドリフトが $r-\sigma^2/2$ になる結果です。したがって、**この章でも $\mu=r$ と置いた場合に限り**係数が一致します。任意の $\mu$ について一致を主張しているわけではありません。

<!-- proof-start -->
### 証明

関数を $F(t,s)=\log(s/S_0)$（$s>0$）と選びます。各偏導関数を先に計算すると

$$
F_t=0,\qquad F_s=\frac1s,\qquad F_{ss}=-\frac1{s^2}.
$$

前節で確認した局所化によって [時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) を適用できます。$b_t=\mu S_t$、$a_t=\sigma^2S_t^2$ を代入すれば

$$
\begin{aligned}
dX_t
&=\left(0+\mu S_t\frac1{S_t}
+\frac12\sigma^2S_t^2\left(-\frac1{S_t^2}\right)\right)dt
+\sigma S_t\frac1{S_t}\,dW_t\\
&=\left(\mu-\frac{\sigma^2}{2}\right)dt+\sigma\,dW_t.
\end{aligned}
$$

両辺を $0$ から $t$ まで積分し、$X_0=\log(S_0/S_0)=0$、$W_0=0$ を代入して表示式を得ます。
<!-- proof-end -->

**数値を伴う確認**：$\mu=0.08$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$ とすると、対数価格の年当たりドリフトは

$$
0.08-\frac{0.20^2}{2}=0.08-0.02=0.06\quad\text{年}^{-1}.
$$

「株価のドリフトが年8%」は「対数株価の期待増分が年8%」を意味しません。二階補正は負であり、$\sigma=0$ ならゼロになります。ここでは連続複利であり、単純利回り8%と同一視もしません。

## 3. 預金で割った株価はどう動くか

[有限時間の割引株価を使う考え方](../U3-03/index.md#thm-u3-03-stock-martingale) を連続時間に持ち込みます。無リスク預金残高を $B_t=e^{rt}$（初期値1、$r\in\mathbb R$ は定数・年率の連続複利金利）とし、割引株価を

$$
D_t=B_t^{-1}S_t=e^{-rt}S_t
$$

と書きます。ここでは配当・取引費用はありません。

<a id="prop-u3-13-discount-stock"></a>

<!-- formal-statement-start -->
> **命題（割引株価のドリフト）**  
> 前節の $S$ と、定数金利 $r\in\mathbb R$ に対し $D_t=e^{-rt}S_t$ とおく。このとき
>
$$
dD_t=(\mu-r)D_t\,dt+\sigma D_t\,dW_t.
$$
>
> さらに $0\le s\le t\le T$ に対し
>
$$
E[D_t\mid\mathcal F_s]=e^{(\mu-r)(t-s)}D_s.
$$
>
> したがってこの定数係数モデルでは、$D$ が真のマルチンゲールであることと $\mu=r$ は同値である。
<!-- formal-statement-end -->

見取り図：割引率 $r$ は時間微分にだけ現れ、二階補正は $F(t,s)=e^{-rt}s$ の二階空間微分がゼロなので生じません。ドリフトがゼロになった後、真のマルチンゲール性は別途条件付き期待値で確かめます。

<!-- proof-start -->
### 証明

$F(t,s)=e^{-rt}s$ を用いると

$$
F_t=-re^{-rt}s,\qquad F_s=e^{-rt},\qquad F_{ss}=0.
$$

[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) の $b_t=\mu S_t$、$a_t=\sigma^2 S_t^2$ を代入すると

$$
\begin{aligned}
dD_t
&=\left(-re^{-rt}S_t+\mu S_te^{-rt}
+\frac12\sigma^2S_t^2\cdot0\right)dt\\
&\quad+\sigma S_te^{-rt}\,dW_t\\
&=(\mu-r)D_t\,dt+\sigma D_t\,dW_t.
\end{aligned}
$$

条件付き期待値の検証には [対数変換](#prop-u3-13-log-price) を $s,t$ 間で引き算して使います。

$$
\frac{D_t}{D_s}
=\exp\left(
(\mu-r-\sigma^2/2)(t-s)+\sigma(W_t-W_s)
\right).
$$

ここでは $s,t$ は $0\le s\le t\le T$ を満たす二つの**時刻**であり、第1節の空間変数 $s$ とは役割が異なります。$D_s>0$ は $\mathcal F_s$-可測です。Brown 運動の独立増分 $W_t-W_s\sim N(0,t-s)$ について、[Brown 指数マルチンゲールの命題](../../../解析系/STO/STO7/index.md#prop-sto7-brownian-exponential-martingale) と同じ正規指数モーメント計算から

$$
E\left[e^{\sigma(W_t-W_s)}\right]
=e^{\sigma^2(t-s)/2}
$$

は有限であるため、条件付き期待値を取れます。従って

$$
\begin{aligned}
E[D_t\mid\mathcal F_s]
&=D_s e^{(\mu-r-\sigma^2/2)(t-s)}
e^{\sigma^2(t-s)/2}\\
&=D_se^{(\mu-r)(t-s)}.
\end{aligned}
$$

$\mu=r$ なら右辺は $D_s$。逆に、$t>s$ を固定してマルチンゲール条件が成り立てば、$D_s>0$ より $e^{(\mu-r)(t-s)}=1$、すなわち $\mu=r$ です。
<!-- proof-end -->

この検算は、ドリフトゼロの局所マルチンゲールを無条件に真のマルチンゲールと扱っていません。定数係数の場合には [Brown 指数マルチンゲールの結果](../../../解析系/STO/STO7/index.md#prop-sto7-brownian-exponential-martingale) からも同じ結論が従います。一般の状態依存拡散や測度変更にこの同値を無条件に拡張してはいけません。

数値例では $\mu=0.08,r=0.03,\sigma=0.20,T=1$ 年なら、割引株価の $dt$ 係数は $0.05D_t$ 年$^{-1}$ です。初期値100円の場合

$$
E[D_1]=100e^{0.05}\simeq105.1271\ \text{円}.
$$

一方 $\mu=r=0.03$ と置き直すと、同じ $\sigma$ でも $E[D_1]=100$ 円になります。**どの確率測度の下で $\mu=r$ と仮定するか**は別の問題であり、ここだけで実確率と評価用測度が一致するとは言えません。

## 4. オプション価値を表す滑らかな関数への準備

株価自身ではなく、時刻と株価の関数 $v(t,s)$ を円建てで評価したいとします。$v$ が $C^{1,2}$ で、$v(t,S_t)$ が経路上で定義できれば、前節と同じ計算をもう一度行えます。ここでは $v$ を**任意に与えられた滑らかな関数**として扱い、まだオプション価格であるとは仮定しません。

<a id="prop-u3-13-discounted-function"></a>

<!-- formal-statement-start -->
> **命題（滑らかな価値関数の割引過程）**  
> 第1節の $S$、定数金利 $r$ と $v\in C^{1,2}([0,T]\times(0,\infty))$ に対し、$Y_t=e^{-rt}v(t,S_t)$ とする。停止によって必要な積分が定義できる範囲では
>
$$
\begin{aligned}
dY_t
&=e^{-rt}\left(v_t+\mu S_tv_s
+\frac12\sigma^2S_t^2v_{ss}-rv\right)(t,S_t)\,dt\\
&\quad+e^{-rt}\sigma S_tv_s(t,S_t)\,dW_t.
\end{aligned}
$$
>
> 特に表示された $dt$ 係数がすべての $(t,S_t)$ でゼロなら、$Y$ は連続局所マルチンゲールである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) に入れる関数は $v$ そのものではなく

$$
F(t,s)=e^{-rt}v(t,s)
$$

です。積の微分から

$$
F_t=e^{-rt}(v_t-rv),\qquad
F_s=e^{-rt}v_s,\qquad
F_{ss}=e^{-rt}v_{ss}.
$$

ここへ $b_t=\mu S_t$、$a_t=\sigma^2S_t^2$ を代入します。偏導関数 $v_t,v_s,v_{ss}$ はすべて $(t,S_t)$ で評価すると、$dt$ 係数は

$
\begin{aligned}
F_t+\mu S_tF_s+\frac12\sigma^2S_t^2F_{ss}
&=e^{-rt}(v_t-rv)
  +\mu S_te^{-rt}v_s
  +\frac12\sigma^2S_t^2e^{-rt}v_{ss}\\
&=e^{-rt}\left(v_t+\mu S_tv_s
  +\frac12\sigma^2S_t^2v_{ss}-rv\right).
\end{aligned}
$

同様に $dW_t$ 係数は $\sigma S_tF_s=e^{-rt}\sigma S_tv_s$ です。これで表示式の両係数を確認しました。$dt$ 係数がゼロなら、残るのは予測可能な被積分過程による Brown 確率積分です。停止による局所化の下でこれは局所マルチンゲールですが、真のマルチンゲールになるには可積分性等を別途確かめる必要があります。
<!-- proof-end -->

この式に $\mu=r$ を入れて $dt$ 係数をゼロと置いたものが、後で現れる価格方程式の**計算上の形**です。しかし、この章では市場で複製可能か、どの測度を選ぶか、満期の受取額を何にするかをまだ証明していません。方程式だけをもって一意の無裁定価格と呼ぶのは早計です。

## 5. 二乗株価で計算と単位を確認する

関数変換の検算用に $p\in\mathbb R$ を固定して $G(s)=s^p$ を考えます。$s>0$ なので二階微分はすべて定義できます。

<a id="prop-u3-13-power-transform"></a>

<!-- formal-statement-start -->
> **命題（株価のべきと二次受取額）**  
> 第1節の正値株価 $S$ と任意の定数 $p\in\mathbb R$ に対して
>
$$
d(S_t^p)
=
\left(p\mu+\frac12p(p-1)\sigma^2\right)S_t^p\,dt
+p\sigma S_t^p\,dW_t.
$$
>
> 特に定数係数モデルで、満期 $T$ の二乗受取額 $H=S_T^2/S_0$（単位：円）の期待割引額は
>
$$
e^{-rT}E[H]
=S_0\exp\bigl((2\mu+\sigma^2-r)T\bigr).
$$
>
> $\mu=r$ の場合には $S_0e^{(r+\sigma^2)T}$ となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$G_s(s)=ps^{p-1}$、$G_{ss}(s)=p(p-1)s^{p-2}$、$G_t=0$ を [時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) に代入すると

$$
\begin{aligned}
d(S_t^p)
&=\left(\mu S_t\cdot pS_t^{p-1}
+\frac12\sigma^2S_t^2\cdot p(p-1)S_t^{p-2}\right)dt\\
&\quad+\sigma S_t\cdot pS_t^{p-1}\,dW_t,
\end{aligned}
$$

となり第一式が得られます。二乗受取額には $p=2$ を代入します。ただし $d(S_t^2)$ のドリフトが $(2\mu+\sigma^2)S_t^2$ と分かっただけでは、確率積分の期待値を無条件にゼロとしてよいとは限りません。今回は [対数変換](#prop-u3-13-log-price) を指数に戻し、Brown 運動の正規指数モーメントを直接使います。

$$
S_T^2
=S_0^2\exp\left((2\mu-\sigma^2)T+2\sigma W_T\right).
$$

$W_T\sim N(0,T)$ なので $E[e^{2\sigma W_T}]=e^{2\sigma^2T}$。従って

$$
E[S_T^2]
=S_0^2e^{(2\mu-\sigma^2)T}e^{2\sigma^2T}
=S_0^2e^{(2\mu+\sigma^2)T}.
$$

$S_0$ で割り、さらに $e^{-rT}$ を掛ければ主張を得ます。
<!-- proof-end -->

$\mu=r$ の結果は U3-11 で二項木・三項木から導いた [二乗受取額の連続極限](../U3-11/index.md#thm-u3-11-square-convergence) の $S_0e^{(r+\sigma^2)T}$ と整合します。一般に $e^{-rt}S_t$ がマルチンゲールでも、**$e^{-rt}S_t^2/S_0$ はそうとは限りません**。$\mu=r$ では後者のドリフトは $(r+\sigma^2)e^{-rt}S_t^2/S_0$ です。非線形変換後も同じ割引率でマルチンゲールになるという誤解をここで防ぎます。

### 変換を見比べる

| 対象 | 変換後の $dt$ 係数 | 変換後の $dW_t$ 係数 |
| --- | --- | --- |
| $\log(S_t/S_0)$ | $\mu-\sigma^2/2$ | $\sigma$ |
| $e^{-rt}S_t$ | $(\mu-r)e^{-rt}S_t$ | $\sigma e^{-rt}S_t$ |
| $S_t^2/S_0$ | $(2\mu+\sigma^2)S_t^2/S_0$ | $2\sigma S_t^2/S_0$ |

係数の単位は左の過程を単位時間（年）で割ったものと、平方根時間（年$^{1/2}$）で割ったものです。株価を対数へ移す場合だけ無次元になります。

### Python による再現

標準ライブラリだけで実行できる [検算プログラム](check_ito.py) を収録しました。固定した乱数種で $W_T=\sqrt T Z$（$Z\sim N(0,1)$）を生成し、次の項目を検算します。

1. 対数増分の標本平均・分散と理論値。
2. 割引株価の標本平均と解析的期待値。
3. $\mu=r$ に変えた場合の割引平均。

株価は離散時間 Euler 近似ではなく、**対数変換の恒等式から得た満期値**です。数値的な時間離散化誤差は含めず、有限標本の揺らぎを別に表示します。プログラムを実行すると、$T=1$ 年、$S_0=100$ 円、$\sigma=0.2$ 年$^{-1/2}$ の例が再現できます。

---

## 6. どの仮定が効いたか

- **$S_t>0$**：対数と負のべき乗が意味を持ちます。非負だけの過程では、0への到達後に $\log S_t$ は定義できません。
- **連続な Itô 過程**：Brown 運動の二次変分を使っています。株価にジャンプがあれば追加のジャンプ補正が必要です。
- **定数係数と Brown 独立増分**：条件付き指数モーメントの直接計算に必要です。局所マルチンゲールと真のマルチンゲールの区別を曖昧にしません。
- **無配当・連続複利金利**：$e^{-rt}S_t$ を割引株価としました。配当を受け取る資産の総収益や別の日数規約に同じ式をそのまま使いません。
- **測度の固定**：$E[\cdot]$ はこの節で仮定した Brown 運動の確率測度の下です。リスク中立測度の存在や選択はまだ結論していません。

## 7. 演習

各問で $W$ は適切なフィルトレーションに関する標準 Brown 運動です。株価は特記しない限り第1節の正値連続 Itô 過程で、係数は定数、満期は $T>0$ 年とします。

<a id="ex-u3-13-a1"></a>
### A1：対数の二階項を再現する
- Level: A

$dS_t=0.07S_tdt+0.30S_tdW_t$、$S_0>0$ とする。無次元の対数変化 $X_t=\log(S_t/S_0)$ の $dt$、$dW_t$ 係数を求め、通常の連鎖律による誤答との差を数値で示せ。

<!-- solution-start -->
**詳細解答**：$f(s)=\log(s/S_0)$（$s>0$）では $f_s=1/s$、$f_{ss}=-1/s^2$ です。[対数変換の導出](#prop-u3-13-log-price) の係数を置き直すと、

$$
\begin{aligned}
dX_t
&=\left(\frac{0.07S_t}{S_t}
+\frac12(0.30S_t)^2\frac{-1}{S_t^2}\right)dt
+\frac{0.30S_t}{S_t}\,dW_t\\
&=(0.07-0.045)dt+0.30\,dW_t\\
&=0.025\,dt+0.30\,dW_t.
\end{aligned}
$$

通常の連鎖律だけなら $0.07\,dt$ となりますが、これは年率 $0.045$、すなわち4.5パーセントポイント過大です。
<!-- solution-end -->

<a id="ex-u3-13-a2"></a>
### A2：割引過程の符号
- Level: A

$\mu=0.02$ 年$^{-1}$、$r=0.05$ 年$^{-1}$、$\sigma=0.10$ 年$^{-1/2}$ とし、$D_t=e^{-rt}S_t$ の微分を求めよ。割引後のドリフトは正か負か。

<!-- solution-start -->
**詳細解答**：$F(t,s)=e^{-0.05t}s$ の偏導関数は $F_t=-0.05F$、$F_s=e^{-0.05t}$、$F_{ss}=0$。従って

$$
dD_t=(-0.05+0.02)D_tdt+0.10D_tdW_t
=-0.03D_tdt+0.10D_tdW_t.
$$

$dt$ 係数は $D_t>0$ の下で負です。割引をすると預金成長率を**引く**のであり、$+r$ としてはいけません。
<!-- solution-end -->

<a id="ex-u3-13-a3"></a>
### A3：平方根株価
- Level: A

$\mu=0.06$、$\sigma=0.20$ のモデルで $Z_t=\sqrt{S_t}$ の微分を求めよ（時間単位は年）。$Z_t>0$ であることをどう使ったかも述べよ。

<!-- solution-start -->
**詳細解答**：$p=1/2$ を [べき変換](#prop-u3-13-power-transform) へ代入します。ドリフト倍率は

$$
p\mu+\tfrac12p(p-1)\sigma^2
=\tfrac12(0.06)+\tfrac12(\tfrac12)(-\tfrac12)(0.04)
=0.03-0.005=0.025.
$$

雑音倍率は $p\sigma=0.10$ なので

$$
dZ_t=0.025Z_tdt+0.10Z_tdW_t.
$$

$S_t>0$ によって $\sqrt{s}$ の一階・二階導関数が評価点 $S_t$ で定義でき、局所化して Itô 公式を適用できます。
<!-- solution-end -->

<a id="ex-u3-13-a4"></a>
### A4：二乗の係数と通貨単位
- Level: A

$S_0=80$ 円、$\mu=0.04$、$\sigma=0.30$ とする。$H_t=S_t^2/S_0$ の $dt$、$dW_t$ 係数を $H_t$ の倍数で書け。$H_t$ の通貨単位も答えよ。

<!-- solution-start -->
**詳細解答**：$S_0$ は時間に依存しない定数です。$p=2$ の [べき変換](#prop-u3-13-power-transform) を $S_0$ で割って

$$
dH_t=(2\mu+\sigma^2)H_tdt+2\sigma H_tdW_t.
$$

$2\mu+\sigma^2=0.08+0.09=0.17$、$2\sigma=0.60$ より

$$
dH_t=0.17H_tdt+0.60H_tdW_t.
$$

$S_t^2/S_0$ の単位は円$^2$/円＝円であり、円$^2$ ではありません。
<!-- solution-end -->

<a id="ex-u3-13-a5"></a>
### A5：雑音のない境界
- Level: A

$\sigma=0$、$\mu\in\mathbb R$ とする。対数株価と割引株価の式を出し、二階補正が消える理由を述べよ。

<!-- solution-start -->
**詳細解答**：$\sigma=0$ では仮定した積分式が $S_t=S_0+\int_0^t\mu S_u\,du$ となります。$S$ の経路が連続なので右辺は時間 $t$ に関して微分可能です。ここでプライム $S'_t$ は常微分 $dS_t/dt$ を表し、$S'_t=\mu S_t$ です。確率微分の $dS_t$ に $dt$ で形式的に割り算しているのではありません。積の微分則で $(e^{-\mu t}S_t)'=e^{-\mu t}(S'_t-\mu S_t)=0$ を得るので、初期値を代入して $S_t=S_0e^{\mu t}>0$ となります。従って

$$
\log(S_t/S_0)=\mu t,\qquad
D_t=S_0e^{(\mu-r)t},\qquad
dD_t=(\mu-r)D_tdt.
$$

二階項には $(\sigma S_t)^2$ が掛かるので $\sigma=0$ ではゼロです。Brown 確率積分項も消え、通常の微積分へ戻ります。
<!-- solution-end -->

<a id="ex-u3-13-b1"></a>
### B1：時間で変わる確定金利
- Level: B

本問に限り、株価モデルのドリフトを第1節の定数 $\mu$ から連続な確定関数 $\mu(t)$（年$^{-1}$）へ拡張し、$dS_t=\mu(t)S_t\,dt+\sigma S_t\,dW_t$ とする（$\sigma$ は定数、$S$ は引き続き正の連続 Itô 過程）。金利 $r(t)$ も $[0,T]$ 上の連続な確定関数（年$^{-1}$）とし、$A(t)=\exp(-\int_0^t r(u)\,du)$ とする。$D_t=A(t)S_t$ に対して Itô 公式を適用せよ。$\mu(t)=r(t)$ が全時刻で成立するなら $dt$ 係数はどうなるか。

<!-- solution-start -->
**詳細解答**：微積分の基本定理と合成関数の微分から $A'(t)=dA(t)/dt=-r(t)A(t)$ です。$F(t,s)=A(t)s$ と選べば、$F_t$ は株価を表す変数 $s$ を固定した偏微分なので

$$
F_t=-r(t)A(t)s,\qquad F_s=A(t),\qquad F_{ss}=0.
$$

従って、[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) を本問の $b_t=\mu(t)S_t$、$a_t=\sigma^2S_t^2$ に適用すると

$$
\begin{aligned}
dD_t
&=\{-r(t)A(t)S_t+\mu(t)S_tA(t)\}dt
+\sigma A(t)S_tdW_t\\
&=(\mu(t)-r(t))D_tdt+\sigma D_tdW_t.
\end{aligned}
$$

$\mu(t)=r(t)$ なら $dt$ 係数は0です。ただし真のマルチンゲール性を断定するにはさらに積分可能性等が要ります。連続な確定 $r(t)$ は $[0,T]$ 上有界なので、今回の定数 $\sigma$ モデルなら Brown 指数モーメントから真のマルチンゲール性まで確認できます。
<!-- solution-end -->

<a id="ex-u3-13-b2"></a>
### B2：条件付き期待値からマルチンゲールを判定する
- Level: B

$\mu,r\in\mathbb R$、$\sigma\ge0$ を定数とし、$0\le s<t\le T$ とする。$D_t=e^{-rt}S_t$ について $E[D_t\mid\mathcal F_s]$ を計算し、$\mu\ne r$ なら $D$ がマルチンゲールでないことを示せ。

<!-- solution-start -->
**詳細解答**：[対数変換](#prop-u3-13-log-price) を二時刻で引けば

$$
D_t=D_s\exp\{(\mu-r-\sigma^2/2)(t-s)+\sigma(W_t-W_s)\}.
$$

$D_s$ は $\mathcal F_s$-可測、増分は $\mathcal F_s$ と独立で正規分布 $N(0,t-s)$。従って

$$
\begin{aligned}
E[D_t\mid\mathcal F_s]
&=D_se^{(\mu-r-\sigma^2/2)(t-s)}
E[e^{\sigma(W_t-W_s)}]\\
&=D_se^{(\mu-r-\sigma^2/2)(t-s)}
e^{\sigma^2(t-s)/2}\\
&=D_se^{(\mu-r)(t-s)}.
\end{aligned}
$$

$\mu\ne r$ なら $t-s>0$ のため指数倍率は1でなく、$D_s>0$ なのでマルチンゲール等式が破れます。これは期待値の存在も正規指数モーメントで確認した反証です。
<!-- solution-end -->

<a id="ex-u3-13-b3"></a>
### B3：割引二乗がマルチンゲールとは限らない
- Level: B

$\mu=r$、$\sigma>0$ のとき $D_t=e^{-rt}S_t$ と $K_t=e^{-rt}S_t^2/S_0$ の $dt$ 係数を比較し、$K$ がマルチンゲールかどうかを条件付き期待値で結論せよ（$r+\sigma^2$ の符号に注意）。

<!-- solution-start -->
**詳細解答**：[割引株価の命題](#prop-u3-13-discount-stock) より $D$ の $dt$ 係数はゼロです。一方 [二乗変換](#prop-u3-13-power-transform) と割引の時間微分を合わせると

$$
dK_t=(2r+\sigma^2-r)K_tdt+2\sigma K_tdW_t
=(r+\sigma^2)K_tdt+2\sigma K_tdW_t.
$$

二乗株価の対数表示から

$$
E[K_t\mid\mathcal F_s]
=K_s e^{(r+\sigma^2)(t-s)}.
$$

よって $r+\sigma^2\ne0$ なら $K$ はマルチンゲールではありません。逆に $r=-\sigma^2$ ならこの定数係数モデルでは $K$ は真のマルチンゲールです（条件付き期待値式が成立し、積分可能）。負金利も許したので「$\sigma>0$ なら必ず非マルチンゲール」とは断定できません。
<!-- solution-end -->

<a id="ex-u3-13-b4"></a>
### B4：数値平均と標本誤差
- Level: B

$S_0=100$ 円、$T=1$ 年、$\mu=0.08$ 年$^{-1}$、$r=0.03$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$ とする。$E[D_T]$ と $\operatorname{Var}(D_T)$ を求め、独立経路 $M$ 本の標本平均の標準偏差を式で示せ。$M=10000$ の数値も求めよ。

<!-- solution-start -->
**詳細解答**：$D_T=S_0e^{(\mu-r-\sigma^2/2)T+\sigma W_T}$ なので、正規指数モーメントから

$$
E[D_T]=S_0e^{(\mu-r)T}=100e^{0.05}\simeq105.1271\ \text{円}.
$$

二乗の期待値は

$$
E[D_T^2]=S_0^2e^{2(\mu-r-\sigma^2/2)T}e^{(2\sigma)^2T/2}
=S_0^2e^{2(\mu-r)T+\sigma^2T}.
$$

従って

$$
\begin{aligned}
\operatorname{Var}(D_T)
&=S_0^2e^{2(\mu-r)T}(e^{\sigma^2T}-1)\\
&=10000e^{0.10}(e^{0.04}-1)\simeq451.0\ \text{円}^2.
\end{aligned}
$$

独立同分布な $M$ 経路の平均は分散が $1/M$ 倍になるので、標準偏差は

$$
\operatorname{SE}(\overline D_M)
=S_0e^{(\mu-r)T}
\sqrt{\frac{e^{\sigma^2T}-1}{M}}.
$$

$M=10000$ では約 $0.2124$ 円です。標本平均が105.1271円に厳密一致することは要求しません。
<!-- solution-end -->

<a id="ex-u3-13-c1"></a>
### C1：二乗受取額の条件付き割引評価を二通りで確認する
- Level: C

$\mu=r$、$\sigma>0$、$S_0>0$、$0\le t\le T$ とし、満期受取額を $H=S_T^2/S_0$ 円とする。関数

$$
v(t,s)=\frac{s^2}{S_0}e^{(r+\sigma^2)(T-t)}
$$

について (i) 偏導関数をすべて計算し、$e^{-rt}v(t,S_t)$ の $dt$ 係数が0であることを示せ。(ii) Brown 運動の独立増分を用い、$E[e^{-rT}H\mid\mathcal F_t]=e^{-rt}v(t,S_t)$ を別に導け。(iii) $t=0$ の値と U3-11 の二乗受取額の木の極限とを比較せよ。

<!-- solution-start -->
**詳細解答**：

(i) $v(t,s)$ は $s>0$ で $C^{1,2}$ です。$c=r+\sigma^2$ とおいて微分すると

$$
v_t=-cv,\qquad v_s=\frac{2v}{s},\qquad v_{ss}=\frac{2v}{s^2}.
$$

[滑らかな関数の割引公式](#prop-u3-13-discounted-function) へ $\mu=r$ を代入した $dt$ 係数は

$$
\begin{aligned}
e^{-rt}\left(v_t+rS_tv_s
+\frac12\sigma^2S_t^2v_{ss}-rv\right)
&=e^{-rt}\left(-cv+2rv+\sigma^2v-rv\right)\\
&=e^{-rt}(-r-\sigma^2+2r+\sigma^2-r)v=0.
\end{aligned}
$$

また $dW_t$ 係数は $e^{-rt}\sigma S_t(2v/S_t)=2\sigma e^{-rt}v$ です。この段階では局所マルチンゲール性だけが分かります。

(ii) [対数変換](#prop-u3-13-log-price) を $t,T$ 間で引き、$\Delta=T-t$ とすると

$$
S_T=S_t\exp\{(r-\sigma^2/2)\Delta+\sigma(W_T-W_t)\}.
$$

これを二乗し、増分の独立性と [Brown 指数マルチンゲールの命題](../../../解析系/STO/STO7/index.md#prop-sto7-brownian-exponential-martingale) と同じ $N(0,\Delta)$ の正規指数モーメント計算を使います。

$$
\begin{aligned}
E[S_T^2/S_0\mid\mathcal F_t]
&=\frac{S_t^2}{S_0}
e^{(2r-\sigma^2)\Delta}
E[e^{2\sigma(W_T-W_t)}]\\
&=\frac{S_t^2}{S_0}
e^{(2r-\sigma^2)\Delta}e^{2\sigma^2\Delta}\\
&=\frac{S_t^2}{S_0}e^{(2r+\sigma^2)\Delta}.
\end{aligned}
$$

$e^{-rT}=e^{-rt}e^{-r\Delta}$ を掛けると

$$
E[e^{-rT}H\mid\mathcal F_t]
=e^{-rt}\frac{S_t^2}{S_0}e^{(r+\sigma^2)\Delta}
=e^{-rt}v(t,S_t).
$$

右辺は有限な正規指数モーメントを持つので、このモデルでは真のマルチンゲール性も確認できました。

(iii) $t=0$ では $S_t=S_0$、よって $v(0,S_0)=S_0e^{(r+\sigma^2)T}$。これは [U3-11 の二乗受取額の CRR・三項木極限](../U3-11/index.md#thm-u3-11-square-convergence) に一致します。ただし、この照合は特定の受取額・仮定での一致であり、任意の商品に対する評価法の一般的同値性を証明したものではありません。
<!-- solution-end -->

---

次の **U3-14** は、対数式から正の株価過程を構成し、対数正規分布とそのモーメントを体系的に調べます。その後の U3-15 以降で、割引株価のマルチンゲール性を金融の価格付けと結び付けます。
