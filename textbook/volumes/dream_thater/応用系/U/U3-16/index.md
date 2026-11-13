# U3-16 自己金融 delta hedge と Black–Scholes–Merton PDE

[U3-15 の二乗支払額の複製](../U3-15/index.md#prop-u3-15-quadratic-hedge)では、一つの価格関数を与えてから自己金融を確認しました。しかし、別の満期支払額に対して価格関数を毎回思いつくことはできません。**どんな滑らかな価格関数なら、株式と預金だけで途中の価格変化を賄えるのか**を、式そのものから判定したいのです。

本講では、[Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)と[連続時間の自己金融条件](../U3-15/index.md#def-u3-15-self-financing)を突き合わせ、価格関数が満たす偏微分方程式（PDE）を導きます。さらに方程式を満たす関数から複製戦略を作り直し、配当を入れるとどの項が変わるかを確かめます。

## 1. 「価格関数」と「保有量」は別のもの

満期を $T>0$ 年、初期株価を $s_0>0$ 円とし、通常の条件を満たすフィルトレーション上の標準 Brown 運動 $W^P$ を考えます。無配当・無取引費用・連続取引可能・空売りと借入れを許す市場で、株価 $S$ と預金 $B$ を

$$
dS_t=\mu S_t\,dt+\sigma S_t\,dW_t^P,\qquad
B_t=e^{rt},\qquad S_0=s_0,\quad B_0=1
$$

とします。$\mu,r\in\mathbb R$ の単位は年$^{-1}$、$\sigma>0$ の単位は年$^{-1/2}$ です。[GBM の陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)から $S_t>0$ です。

支払額 $g(S_T)$ 円を満期に渡す契約を想定します。偏微分方程式とは、時刻 $t$ と株価 $s$ に関する偏導関数を結ぶ条件式で、基礎となる[偏微分方程式の定義](../../../解析系/PDE/PDE1/index.md#def-pde1-pde-order)を前提とします。価格を時刻と現在株価の関数 $v(t,s)$ で表すのは、過去の経路が今後の条件付き株価分布を変えないこの定数係数 GBM モデルに対応した選び方です。一般の経路依存商品では追加状態が必要です。

時刻で1回、株価で2回連続微分でき、満期支払額と一致する関数を、これから**滑らかな満期価値関数**と呼びます。実際に価格として使えるかは別途自己金融で検証します。

**デルタ（delta）**は、時刻を止めて株価 $s$ を微小に変えたときの価格の変化率 $v_s(t,s)$ を意味します。例えば $v(t,s)=2s+5e^{-r(T-t)}$ なら、1円の株価変化で価格は約2円変わるので、デルタは2株相当です。これはまだ**ヘッジ戦略が自己金融だと証明したわけではありません**。

<a id="def-u3-16-smooth-value"></a>

<!-- formal-statement-start -->
> **定義（滑らかな満期価値関数とデルタ）**  
> $T>0$、満期支払関数 $g:(0,\infty)\to\mathbb R$ を固定する。$v:[0,T]\times(0,\infty)\to\mathbb R$ が $[0,T)\times(0,\infty)$ 上で時間について1回、株価について2回連続微分可能で、$t=T$ まで連続に延長でき、

$$
v(T,s)=g(s)\qquad(s>0)
$$

> を満たすとき、$v$ を支払額 $g(S_T)$ に対する**滑らかな満期価値関数**と呼ぶ。そのデルタを $\Delta(t,s):=\partial_s v(t,s)$ とする。$v$ が実際の無裁定価格であることは、この定義だけからは従わない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-16-smooth-value -->
**定義の確認**：$g(s)=s$、$v(t,s)=s$ とします。定義域は $[0,T]\times(0,\infty)$、偏導関数は $v_t=0,v_s=1,v_{ss}=0$ で連続です。満期条件は $v(T,s)=s=g(s)$ と一致し、デルタは1です。1株を保有する価値は常に $S_t$ で、[一定株数の自己金融例](../U3-15/index.md#def-u3-15-self-financing)にも一致します。この例は定義の正則性、終端条件、デルタのすべてを直接確認しています。
<!-- definition-example-end -->

## 2. 株価の雑音を株式で相殺する

まず $v$ は実際に株式 $\Delta_t$ 株と預金 $\psi_t$ 単位で複製できると**仮定**します。ポートフォリオの価値は $V_t=\Delta_tS_t+\psi_tB_t$ です。途中の持ち出し・資金注入をしない自己金融戦略なら、[自己金融戦略の定義](../U3-15/index.md#def-u3-15-self-financing)より

$$
dV_t=\Delta_t\,dS_t+\psi_t\,dB_t
=\bigl(\mu S_t\Delta_t+rB_t\psi_t\bigr)dt
+\sigma S_t\Delta_t\,dW_t^P.
$$

一方、価格を $V_t=v(t,S_t)$ と書いたときの[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)は

$$
dv(t,S_t)=
\left(v_t+\mu S_tv_s+\frac12\sigma^2S_t^2v_{ss}\right)dt
+\sigma S_tv_s\,dW_t^P.
$$

ここで偏導関数はすべて $(t,S_t)$ で評価しています。二つの確率積分が同じ過程を与えるには、Brown 運動の係数が一致しなければなりません。$\sigma S_t>0$ を使うと

$$
\sigma S_t\Delta_t=\sigma S_tv_s(t,S_t)
\quad\Longrightarrow\quad
\boxed{\Delta_t=v_s(t,S_t)}.
$$

これが **delta hedge** です。さらに $\psi_tB_t=v(t,S_t)-S_tv_s(t,S_t)$ をドリフトの式へ代入すると

$$
\begin{aligned}
v_t+\mu S_tv_s+\tfrac12\sigma^2S_t^2v_{ss}
&=\mu S_tv_s+r(v-S_tv_s),\\
v_t+\tfrac12\sigma^2S_t^2v_{ss}+rS_tv_s-rv&=0.
\end{aligned}
$$

この計算で、実確率 $P$ の平均成長率 $\mu$ が**相殺**されました。$P$ を $Q$ と取り違えたのではありません。

<a id="thm-u3-16-bsm-necessity"></a>

<!-- formal-statement-start -->
> **定理（自己金融複製からの Black–Scholes–Merton 方程式）**  
> $T>0,s_0>0,\mu,r\in\mathbb R,\sigma>0$ とし、無配当株式が $dS_t=\mu S_tdt+\sigma S_tdW_t^P$、預金が $B_t=e^{rt}$ に従うとする。$v$ は前節の滑らかな満期価値関数で、各初期時刻 $t<T$・初期株価 $s>0$ から、予測可能で確率積分可能な自己金融戦略 $(\Delta,\psi)$ が $V_u=v(u,S_u)$ を $u\in[t,T]$ で複製すると仮定する。このとき各 $(t,s)$ で

$$
\boxed{v_t(t,s)+\frac12\sigma^2s^2v_{ss}(t,s)
+rs\,v_s(t,s)-rv(t,s)=0}
$$

> が成り立ち、終端条件は $v(T,s)=g(s)$ である。またヘッジの保有量は $du\times P$-ほとんど至るところで

$$
\Delta_u=v_s(u,S_u),\qquad
\psi_u=\frac{v(u,S_u)-S_uv_s(u,S_u)}{B_u}
$$

> に一致する。これは無配当・定数金利・定数ボラティリティ市場の Black–Scholes–Merton（BSM）PDE である。
<!-- formal-statement-end -->

**証明の見取り図**：$v(t,S_t)$ の変動と、株式・預金の自己金融利得の変動を比較します。確率変動の係数からデルタが決まり、残る時間変化の係数から PDE が出ます。すべての $(t,s)$ へ拡張するため、任意の初期状態から複製できるという仮定を明示しています。

<!-- proof-start -->
### 証明

[Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $f(u,x)=v(u,x)$、$x=S_u$ に適用します。$v\in C^{1,2}$ と $S_u>0$ により、各コンパクト区間に停止させれば積分は定義できます。ドリフトと Brown 係数は順に

$$
a_u=v_t+\mu S_uv_s+\tfrac12\sigma^2S_u^2v_{ss},
\qquad b_u=\sigma S_uv_s
$$

です。他方、[自己金融条件](../U3-15/index.md#def-u3-15-self-financing)と $\psi_uB_u=v(u,S_u)-\Delta_uS_u$ から

$$
dV_u=\bigl(\mu S_u\Delta_u+r(v-\Delta_uS_u)\bigr)du
+\sigma S_u\Delta_u\,dW_u^P.
$$

両者は同一連続半マルチンゲールです。差の有限変動部分と連続局所マルチンゲール部分はともに0なので、Brown 係数差の二次変分も0です。

$$
\int_t^w\sigma^2S_u^2(v_s-\Delta_u)^2du=0
\qquad(t\le w\le T).
$$

$\sigma S_u>0$ より $\Delta_u=v_s(u,S_u)$ が $du\times P$-ほとんど至る所で成立します。これをドリフト差へ代入すると

$$
0=a_u-\mu S_uv_s-r(v-S_uv_s)
=v_t+\tfrac12\sigma^2S_u^2v_{ss}+rS_uv_s-rv.
$$

この等式は時間についてほとんど至るところで成立しますが、残差は $(u,S_u)$ に関して連続です。初期状態 $(t,s)$ を任意に選び、$u\downarrow t$ とすると初期点で残差が0です。従ってすべての $(t,s)\in[0,T)\times(0,\infty)$ で PDE が成立します。満期条件は定義から従います。
<!-- proof-end -->

**単位と符号**：$v$ は円、$v_s$ は円／（円／株）すなわち株相当、$v_{ss}$ は株相当／（円／株）です。よって $v_t$、$\sigma^2s^2v_{ss}$、$rs v_s$、$rv$ はいずれも円／年になります。金利の項は $+rs v_s-rv$ であり、預金の利息を取り忘れると最後の $-rv$ が失われます。

## 3. PDE の解から本当に複製できるか

必要条件だけでは、方程式を満たす関数が自己金融かはまだ分かりません。そこで逆方向へ計算します。

<a id="thm-u3-16-bsm-replication"></a>

<!-- formal-statement-start -->
> **定理（古典解からの自己金融複製と一意価格）**  
> 前定理の市場で $g:(0,\infty)\to\mathbb R$ は連続、$v\in C^{1,2}([0,T)\times(0,\infty))\cap C([0,T]\times(0,\infty))$ は BSM PDE と $v(T,s)=g(s)$ を満たすとする。さらにある $C>0,m\ge0$ について

$$
|v(t,s)|+|v_s(t,s)|\le C(1+s^m)
\qquad(0\le t<T,\ s>0)
$$

> を仮定する。$\Delta_t=v_s(t,S_t)$、$\psi_t=(v(t,S_t)-\Delta_tS_t)/B_t$ と置くと、この戦略は自己金融で $V_t=v(t,S_t)$、$V_T=g(S_T)$ を複製する。また $Q$ を [U3-15 のリスク中立測度](../U3-15/index.md#thm-u3-15-risk-neutral-measure) とすれば、

$$
v(t,S_t)=B_tE_Q[g(S_T)/B_T\mid\mathcal F_t].
$$

> この成長条件を満たす古典解は一意である。
<!-- formal-statement-end -->

**証明の見取り図**：PDE を Itô のドリフトに代入して $dv=\Delta\,dS+\psi\,dB$ を回復します。さらに $Q$ 下で割引すると確率積分だけが残り、成長条件と対数正規のモーメントでそれが真のマルチンゲールになることを確かめます。

<!-- proof-start -->
### 証明

[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)から $P$ の下で

$$
dv=\left(v_t+\mu Sv_s+\tfrac12\sigma^2S^2v_{ss}\right)dt
+\sigma Sv_s\,dW^P.
$$

PDE を $v_t+\tfrac12\sigma^2S^2v_{ss}=rv-rSv_s$ と書き直して代入すると、

$$
\begin{aligned}
dv
&=\bigl(rv+(\mu-r)Sv_s\bigr)dt+\sigma Sv_s\,dW^P\\
&=v_s(\mu Sdt+\sigma SdW^P)+r(v-Sv_s)dt\\
&=\Delta\,dS+\psi\,dB.
\end{aligned}
$$

第二行は $dB=rBdt$、$\psi B=v-\Delta S$ を使いました。$\Delta,\psi$ は連続適合なので予測可能であり、局所化の下で積分可能です。$t\uparrow T$ で $v$ の連続性から $V_T=g(S_T)$ です。

[割引自己金融命題](../U3-15/index.md#prop-u3-15-discounted-wealth)および [リスク中立株価 SDE](../U3-15/index.md#thm-u3-15-risk-neutral-measure)から

$$
d(e^{-rt}v(t,S_t))=\Delta_t\sigma e^{-rt}S_t\,dW_t^Q.
$$

成長条件より、有限な $T$ である定数 $C_T$ が存在して

$$
\begin{aligned}
E_Q\int_0^T\Delta_t^2\sigma^2e^{-2rt}S_t^2dt
&\le C_T\int_0^T E_Q[(1+S_t^m)^2S_t^2]dt\\
&\le 2C_T\int_0^T
\bigl(E_Q[S_t^2]+E_Q[S_t^{2m+2}]\bigr)dt<\infty.
\end{aligned}
$$

最後の有限性は[GBM の実数モーメント](../U3-14/index.md#prop-u3-14-moments)をドリフト $r$、指数 $2,2m+2$ に適用した結果です。従って [Itô 等長性](../../../解析系/STO/STO6/index.md#thm-sto6-l2-construction)により割引価値は真の $Q$-マルチンゲールです。[複製価格定理](../U3-15/index.md#thm-u3-15-replication-price)で終端値 $g(S_T)$ を代入すれば表示式を得ます。もし $v_1,v_2$ が条件を満たすなら、両者の差は同じ終端値0に対する上の条件付き期待値0となるので、任意の初期状態で $v_1(t,s)=v_2(t,s)$ です。
<!-- proof-end -->

**ここで証明できたことと、まだ証明していないこと**：この定理は、指定した正則性・成長条件のもとで、**古典解が存在すれば**複製でき一意である、という主張です。任意の不連続な支払関数に古典解が存在するとは主張しません。期待値から解を構成する一般論は次講 U3-17 で扱います。満期の call の折れ曲がりは、$t<T$ で滑らかでも $t=T$ で2階微分可能とは限らないことに注意します。

## 4. 手で作れる三つの価格とヘッジ

**株式を1株渡す契約**：$g(s)=s$ なら $v(t,s)=s$。$v_t=v_{ss}=0,v_s=1$ を PDE に代入すると $rs-rs=0$ です。$\Delta=1,\psi=0$ で終端まで株式1株を保持します。

**満期に $K$ 円を渡す契約**：$K>0$ として $v(t,s)=Ke^{-r(T-t)}$ です。$v_t=rv,v_s=v_{ss}=0$ なので $v_t-rv=0$。$\Delta=0$、$\psi=v/B=Ke^{-rT}$ 単位を保有します。$r$ が負でも同じ代数が成立します。

**満期に株価の二乗を基準額で割って渡す契約**：$g(s)=s^2/K$ を考えます。$a=r+\sigma^2$、$\tau=T-t$ と置き、

$$
v(t,s)=\frac{s^2}{K}e^{a\tau},\quad
v_t=-av,\quad v_s=\frac{2v}{s},\quad
v_{ss}=\frac{2v}{s^2}
$$

を計算します。PDE 左辺は

$$
-av+\tfrac12\sigma^2s^2(2v/s^2)+rs(2v/s)-rv
=(-a+\sigma^2+r)v=0.
$$

$T$ では指数が1なので $v(T,s)=s^2/K$、$\Delta=2v/s$、$\psi=(v-2v)/B=-v/B$ です。これは [U3-15 の二乗支払額ヘッジ](../U3-15/index.md#prop-u3-15-quadratic-hedge)と完全に一致します。正値の $S$ と有限満期、[GBM のモーメント](../U3-14/index.md#prop-u3-14-moments)から必要な可積分性も満たします。

$s_0=K=100$ 円、$r=0.03$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$、$T=1$ 年のとき

$$
v(0,100)=100e^{0.07}\approx107.2508\text{ 円},\qquad
\Delta_0=2e^{0.07}\approx2.1450,\qquad
\psi_0=-100e^{0.07}.
$$

2.145株を保有し、約107.25円を預金から借りています。株の時価約214.50円から借入れを引くと、契約価値約107.25円になります。

## 5. ヘッジ残差は「必要な外部資金」を測る

任意の滑らかな候補 $w$ を用いて、株式 $\Delta=w_s(t,S_t)$ 株と預金 $\psi=(w-Sw_s)/B$ 単位を**その時点ごとに形式的に**並べたとします。常に保有価値の恒等式は $w=\Delta S+\psi B$ を満たしますが、リバランスが無費用とは限りません。

候補の Itô 変化量から保有資産の利得を差し引くと、

$$
dw-\bigl(\Delta\,dS+\psi\,dB\bigr)
=\mathcal R[w](t,S_t)\,dt,
$$

ここで **自己金融残差**を

$$
\boxed{\mathcal R[w](t,s)
:=w_t+\tfrac12\sigma^2s^2w_{ss}+rsw_s-rw}
$$

と書きます。単位は円／年です。$\mathcal R[w]\ne0$ なら、候補価値を維持するために、微小時間 $dt$ あたり $\mathcal R[w]dt$ の外部資金投入（負なら引出し）が必要になります。単に現在価値の恒等式を合わせるだけでは自己金融ではないのです。

例えば二乗支払額に、変動率による補正を忘れた $w(t,s)=s^2e^{r(T-t)}/K$ を使うと

$$
w_t=-rw,\quad w_s=2w/s,\quad w_{ss}=2w/s^2,
\qquad \mathcal R[w]=\sigma^2w>0.
$$

$K=s_0=100,r=0.03,\sigma=0.2,T=1$ なら時刻0で $w=100e^{0.03}\approx103.0455$ 円、外部資金が約 $0.04w\approx4.1218$ 円／年の速度で必要です（その時点での局所値であり、年間の確定支払額ではありません）。この誤った価格は約4.2053円低く、**欠けた拡散二次項が補正の原因**です。

## 6. 連続配当があると何が変わるか

ここまでは無配当でした。今度は株式1株を保有すると、株価とは別に時刻 $t$ の微小期間に **$qS_tdt$ 円の配当**を受け取る市場を考えます。$q\ge0$ は一定の連続配当率（年$^{-1}$）です。配当支払後の株価（権利落ち価格）の $P$-SDE を

$$
dS_t=(\mu-q)S_tdt+\sigma S_tdW_t^P
$$

と置きます。自己金融の利得には配当を含める必要があるので、

$$
dV_t=\Delta_t(dS_t+qS_tdt)+\psi_t\,dB_t.
$$

<a id="prop-u3-16-dividend-pde"></a>

<!-- formal-statement-start -->
> **命題（一定連続配当率つき BSM 方程式）**  
> $T>0,s_0>0,\mu,r\in\mathbb R,\sigma>0,q\ge0$ とし、上の株式（1株当たり連続配当額 $qS_tdt$）・預金市場で、滑らかな満期価値関数 $v$ が任意の初期状態から連続取引の自己金融戦略で複製可能とする。このとき

$$
\boxed{v_t+\tfrac12\sigma^2s^2v_{ss}
+(r-q)s v_s-rv=0,\qquad v(T,s)=g(s)}
$$

> が成立し、$\Delta_t=v_s(t,S_t)$、$\psi_t=(v-\Delta_tS_t)/B_t$ である。逆に $v$ がこの方程式と終端条件を満たし、前節と同じ正則性・成長条件を持つなら、これらの保有量で自己金融複製できる。
<!-- formal-statement-end -->

**証明の見取り図**：配当 $qSdt$ は株式保有者の利得にだけ加わります。株価の $P$-ドリフト $\mu-q$ と混同せず、右辺に株式の総利得 $\mu Sdt$ を入れることが符号の鍵です。

<!-- proof-start -->
### 証明

[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)の株価ドリフトを $\mu-q$ とすると

$$
dv=\bigl(v_t+(\mu-q)Sv_s+\tfrac12\sigma^2S^2v_{ss}\bigr)dt
+\sigma Sv_s\,dW^P.
$$

自己金融の右辺は、配当を明示して

$$
dV=\bigl((\mu-q)S\Delta+qS\Delta+rB\psi\bigr)dt
+\sigma S\Delta\,dW^P
=\bigl(\mu S\Delta+rB\psi\bigr)dt+\sigma S\Delta\,dW^P.
$$

雑音係数を比較して $\Delta=v_s$、価値の恒等式から $B\psi=v-Sv_s$ を得ます。ドリフトを等置すると

$$
\begin{aligned}
v_t+(\mu-q)Sv_s+\tfrac12\sigma^2S^2v_{ss}
&=\mu Sv_s+r(v-Sv_s),\\
v_t+\tfrac12\sigma^2S^2v_{ss}+(r-q)Sv_s-rv&=0.
\end{aligned}
$$

逆方向はこの等式を使って $dv=v_s(dS+qSdt)+\psi\,dB$ と戻せます。自己金融と予測可能性は無配当の場合と同じ局所化で検証できます。さらに、[GBM の実数モーメント](../U3-14/index.md#prop-u3-14-moments)に $p=2m+2$ を代入すれば、配当を含む自己金融価値を割り引いた確率積分の二乗可積分性を確認できます。
<!-- proof-end -->

**直接検算**：二乗支払額 $g(s)=s^2/K$ に対し $a_q=r-2q+\sigma^2$ として

$$
v_q(t,s)=\frac{s^2}{K}e^{a_q(T-t)}
$$

と置きます。$v_{q,t}=-a_qv_q,\,sv_{q,s}=2v_q,\,s^2v_{q,ss}=2v_q$ を命題へ代入すれば

$$
\mathcal R_q[v_q]
=(-a_q+\sigma^2+2(r-q)-r)v_q=0.
$$

$q=0$ なら第4節へ戻ります。$q=0.01,r=0.03,\sigma=0.20,T=1,s=K=100$ なら $a_q=0.05$ で $v_q(0,100)=100e^{0.05}\approx105.1271$ 円です。配当があると株式保有者は途中で収入を得るため、同じ満期の二乗支払額の価格は低くなります。**配当を無視して無配当 PDE を適用すると**、残差は $2qv_q>0$ となり符号を取り違えます。

## 7. どこで仮定が効いているか

- **$\sigma>0$**：デルタを拡散係数比較から一意に定める際、$\sigma S$ で割りました。$\sigma=0$ ではこの操作はできず、前講の[無裁定性を壊す確定的ドリフト差](../U3-15/index.md#thm-u3-15-risk-neutral-measure)の議論を別途行う必要があります。$\mu=r$ の確定モデルでも、雑音によるデルタの一意性は主張できません。
- **連続取引・摩擦なし**：手数料や売買制限があると $\Delta$ の変更には費用・制約が生じ、$dV=\Delta\,dS+\psi\,dB$ の単純な自己金融式はそのまま成立しません。
- **正則性と成長条件**：$v_{ss}$ が存在しない場所では古典的 Itô 公式をそのまま使えません。$v$ が PDE を満たしても真の割引マルチンゲール性が保証されなければ、終端期待値への接続や一意性に飛躍が生じます。
- **配当の扱い**：$dS$ は配当落ち株価の変化、$dS+qSdt$ は保有者の総利得です。両者を混同すると PDE の $(r-q)$ の符号を誤ります。
- **状態数**：$v(t,S_t)$ のみで表すことはこの市場の Markov 的構造に依存します。算術平均や障壁を含む契約は[経路依存状態の例](../U3-08/index.md)のように別状態を加える必要があります。

## 8. 数値で確かめる：係数と残差

次の表は $s=K=100$ 円、$r=0.03$、$\sigma=0.20$、$T-t=1$ 年、$q=0$ の二乗支払額について、解析式を直接代入した値です。数値は最終桁を四捨五入しています。

| 候補 | 価格（円） | $\Delta$（株） | PDE 残差（円／年） |
| --- | ---: | ---: | ---: |
| 正しい $v=s^2e^{(r+\sigma^2)\tau}/K$ | $107.2508$ | $2.1450$ | $0$ |
| 誤った $w=s^2e^{r\tau}/K$ | $103.0455$ | $2.0609$ | $4.1218$ |
| 配当 $q=0.01$ に適合する $v_q$ | $105.1271$ | $2.1025$ | 配当つき残差 $0$ |

[再現用 Python](assets/bsm_pde_check.py) は解析微分による PDE 各項、独立した中心差分近似、配当を入れ忘れたときの残差を比較します。近似では時刻の差分刻みを半分にしたとき残差の減り方を検査でき、解析値との差を区別します。[テスト](assets/tests/test_bsm_pde_check.py)と[実行手順](assets/README.md)を同じ教材に置きます。ここでは確定的な関数を検査するので Monte Carlo の標本誤差はなく、乱数も不要です。途中のヘッジ保有量と残差は上の表で読めるため、新しい図は置きません。

## 9. 演習と詳細解答

以下は、特に指定しない限り本講の無配当・$T>0,s_0>0,\sigma>0$ の定数係数市場で、金利・ドリフトは年$^{-1}$、ボラティリティは年$^{-1/2}$、価格は円とします。

<a id="ex-u3-16-a1"></a>
### A1：BSM の各項を二乗価格へ代入する
- Level: A

$K>0$、$v(t,s)=s^2e^{(r+\sigma^2)(T-t)}/K$ の偏微分と BSM PDE の残差を求めよ。

<!-- solution-start -->
**詳細解答**：$a=r+\sigma^2$ と置くと、時間変数は指数に $-at$ と現れるため

$$
v_t=-av,\qquad v_s=2se^{a(T-t)}/K=2v/s,\qquad
v_{ss}=2e^{a(T-t)}/K=2v/s^2.
$$

従って [BSM 方程式](#thm-u3-16-bsm-necessity)の左辺は

$$
-av+\tfrac12\sigma^2s^2(2v/s^2)+rs(2v/s)-rv
=(-r-\sigma^2+\sigma^2+2r-r)v=0.
$$

さらに $v(T,s)=s^2/K$ で終端条件も満たすので、正則性と成長条件のもとで[逆方向の複製定理](#thm-u3-16-bsm-replication)を適用できます。
<!-- solution-end -->

<a id="ex-u3-16-a2"></a>
### A2：株式と満期固定額を合成する
- Level: A

満期の支払額 $g(S_T)=3S_T+5$ 円を複製する $v,\Delta,\psi$ を求め、自己金融と終端値を確認せよ。

<!-- solution-start -->
**詳細解答**：3株と満期に5円を渡す預金保有を組み合わせます。預金1単位が満期に $B_T=e^{rT}$ 円となるので、$\psi=5e^{-rT}$ 単位が必要です。よって

$$
v(t,s)=3s+5e^{-r(T-t)},\quad
v_t=5re^{-r(T-t)},\quad v_s=3,\quad v_{ss}=0.
$$

[BSM 方程式](#thm-u3-16-bsm-necessity)に代入すると $5re^{-r\tau}+3rs-r(3s+5e^{-r\tau})=0$ です。保有は $\Delta=3$、$\psi=(v-3S)/B=5e^{-rT}$ でともに一定なので

$$
dV=3\,dS+5e^{-rT}\,dB
$$

が[自己金融の定義](../U3-15/index.md#def-u3-15-self-financing)に一致します。満期は $v(T,S_T)=3S_T+5$ です。
<!-- solution-end -->

<a id="ex-u3-16-a3"></a>
### A3：次元から式を監査する
- Level: A

$s$ の単位を円／株、$v$ を円とする。BSM PDE の4項がすべて円／年となる理由を示し、$rv_s$ だけの項が不適切であることを説明せよ。

<!-- solution-start -->
**詳細解答**：$v_t$ は円／年、$v_s$ は 円 ÷（円／株）＝株、$v_{ss}$ は 株 ÷（円／株）＝株$^2$/円 です。$s^2$ は円$^2$/株$^2$ だから $s^2v_{ss}$ は円、$\sigma^2$ は年$^{-1}$ なので拡散項は円／年です。また $rsv_s$ は（年$^{-1}$）（円／株）（株）＝円／年、$rv$ も円／年です。しかし $rv_s$ だけなら株／年で、価格の時間変化と足せません。株価 $s$ の因子が必要です。
<!-- solution-end -->

<a id="ex-u3-16-a4"></a>
### A4：実ドリフトを代入した誤り
- Level: A

$\mu=0.08,r=0.03$ とし、BSM PDE の $rs v_s$ を $\mu s v_s$ に置き換えた式へ、$g(s)=s^2/K$ に対応する本章の正しい満期価値関数 $v$ を代入した残差を求めよ。

<!-- solution-start -->
**詳細解答**：[BSM 方程式](#thm-u3-16-bsm-necessity)では $\mathcal R[v]=0$ なので、誤った式と正しい式の差は $(\mu-r)sv_s$ です。二乗価格の $sv_s=2v$ より

$$
\mathcal R_{\rm wrong}[v]
=(0.08-0.03)\,2v=0.10v>0.
$$

$\mu$ は[自己金融ドリフト比較](#thm-u3-16-bsm-necessity)で相殺されたので、実世界の平均成長率を価格 PDE に戻すのは誤りです。
<!-- solution-end -->

<a id="ex-u3-16-a5"></a>
### A5：初期保有量の内訳
- Level: A

$s_0=K=100,T=1,r=0.03,\sigma=0.20$ とし、$g(s)=s^2/K$ の $v_0,\Delta_0,\psi_0$ を求め、ポートフォリオの初期価値を検算せよ。

<!-- solution-start -->
**詳細解答**：二乗の解は $a=r+\sigma^2=0.03+0.04=0.07$ なので

$$
v_0=100e^{0.07},\qquad
\Delta_0=2e^{0.07},\qquad
\psi_0=\frac{v_0-\Delta_0s_0}{B_0}
=100e^{0.07}-200e^{0.07}=-100e^{0.07}.
$$

$B_0=1$ を用いました。検算すると $\Delta_0s_0+\psi_0B_0=200e^{0.07}-100e^{0.07}=100e^{0.07}$ 円で $v_0$ に一致します。負の預金は借入れです。
<!-- solution-end -->

<a id="ex-u3-16-b1"></a>
### B1：$P$ 下から PDE の係数を再構成する
- Level: B

$V=v(t,S_t)=\Delta S+\psi B$ が自己金融であるとして、Itô 公式のドリフト・拡散係数と保有資産の利得の係数をすべて書き、$\mu$ が消えることを示せ。

<!-- solution-start -->
**詳細解答**：[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)では

$$
dv=(v_t+\mu Sv_s+\tfrac12\sigma^2S^2v_{ss})dt+\sigma Sv_s\,dW^P.
$$

[自己金融条件](../U3-15/index.md#def-u3-15-self-financing)と $dB=rBdt$ から

$$
dV=(\mu S\Delta+rB\psi)dt+\sigma S\Delta\,dW^P.
$$

$\sigma S>0$ より拡散係数を合わせると $\Delta=v_s$ です。$V=v=\Delta S+\psi B$ より $B\psi=v-Sv_s$。ドリフトを比較すると

$$
v_t+\mu Sv_s+\tfrac12\sigma^2S^2v_{ss}
=\mu Sv_s+r(v-Sv_s).
$$

両辺から $\mu Sv_s$ を引き、すべてを左に移すと

$$
v_t+\tfrac12\sigma^2S^2v_{ss}+rSv_s-rv=0
$$

を得ます。[導出定理](#thm-u3-16-bsm-necessity)の計算を、測度変換を使わずに再現できました。
<!-- solution-end -->

<a id="ex-u3-16-b2"></a>
### B2：終端値が同じ二つの解
- Level: B

BSM PDE と同じ連続な $g$ の終端条件を満たす古典解 $v_1,v_2$ が、定理の多項式成長条件を満たすとする。$v_1=v_2$ を、割引自己金融過程と条件付き期待値から示せ。

<!-- solution-start -->
**詳細解答**：$h=v_1-v_2$ とすると PDE は線形なので $\mathcal R[h]=0$、終端は $h(T,s)=0$ です。また三角不等式から $|h|+|h_s|\le C'(1+s^{m'})$ という共通の多項式成長評価を選べます（$m'=\max(m_1,m_2)$、$s\le1$ では定数が支配します）。

[古典解の複製定理](#thm-u3-16-bsm-replication)を $h$ に適用すると $\Delta^h=h_s$ と $\psi^h=(h-Sh_s)/B$ は自己金融です。成長条件と[GBM のモーメント](../U3-14/index.md#prop-u3-14-moments)により

$$
E_Q\!\int_0^T(\Delta_t^h)^2\sigma^2e^{-2rt}S_t^2dt<\infty,
$$

従って割引価値は真のマルチンゲールです。[複製価格定理](../U3-15/index.md#thm-u3-15-replication-price)により

$$
h(t,S_t)=B_tE_Q[h(T,S_T)/B_T\mid\mathcal F_t]=0.
$$

任意の初期状態 $(t,s)$ について繰り返せば $h(t,s)=0$、従って $v_1=v_2$ です。真のマルチンゲール性を省くとこの結論へ直行できません。
<!-- solution-end -->

<a id="ex-u3-16-b3"></a>
### B3：配当を入れると二乗価格はどう変わるか
- Level: B

連続配当率 $q=0.01,r=0.03,\sigma=0.20,T=1,K=s_0=100$ とする。$g(s)=s^2/K$ の配当つき PDE に対する解 $v_q$ を導出し、初期価格、デルタ、無配当価格との差を求めよ。

<!-- solution-start -->
**詳細解答**：$v_q(t,s)=s^2e^{a(T-t)}/K$ と置きます。偏微分は $v_{q,t}=-av_q$、$sv_{q,s}=2v_q$、$s^2v_{q,ss}=2v_q$ です。[配当つき BSM 命題](#prop-u3-16-dividend-pde)に代入すると

$$
(-a+\sigma^2+2(r-q)-r)v_q=0,
\qquad a=r-2q+\sigma^2=0.03-0.02+0.04=0.05.
$$

したがって $v_q(t,s)=s^2e^{0.05(1-t)}/100$、時刻0では

$$
v_q(0,100)=100e^{0.05}\approx105.1271,\qquad
\Delta_0=2e^{0.05}\approx2.1025.
$$

無配当では $v_0^{(0)}=100e^{0.07}\approx107.2508$ だから差は $100(e^{0.07}-e^{0.05})\approx2.1237$ 円です。$\psi_0=-100e^{0.05}$、配当は株価変化とは別に株式保有利得へ入る点も確認できます。
<!-- solution-end -->

<a id="ex-u3-16-b4"></a>
### B4：誤った候補に必要な外部資金
- Level: B

$w(t,s)=s^2e^{r(T-t)}/K$ を二乗請求権の価格と誤認したとする。$\Delta=w_s,\psi=(w-Sw_s)/B$ の形式的な保有で、$dw-\Delta\,dS-\psi\,dB$ を求めよ。また $K=s_0=100,r=0.03,\sigma=0.20,T=1$ の時刻0で残差を数値化せよ。

<!-- solution-start -->
**詳細解答**：$w_t=-rw,w_s=2w/s,w_{ss}=2w/s^2$ です。[残差の定義](#thm-u3-16-bsm-necessity)の導出に代入すると

$$
\begin{aligned}
dw-\Delta\,dS-\psi\,dB
&=(w_t+\tfrac12\sigma^2S^2w_{ss}+rSw_s-rw)dt\\
&=(-rw+\sigma^2w+2rw-rw)dt
=\sigma^2w\,dt.
\end{aligned}
$$

時刻0の $w_0=100e^{0.03}\approx103.0455$ 円より、$\sigma^2w_0=0.04(100e^{0.03})\approx4.1218$ 円／年です。この額は微小時間ごとに不足する外部資金の**瞬間速度**であり、丸一年の確定費用ではありません。誤りの原因は Itô 公式の二階項を省いたことです。
<!-- solution-end -->

<a id="ex-u3-16-c1"></a>
### C1：三乗支払額の PDE・複製・測度横断検算
- Level: C

$T=1,s_0=K=100,\mu=0.08,r=0.03,\sigma=0.20$、無配当・摩擦なしとし、$H=S_T^3/K^2$ 円を考える。

1. $v(t,s)=s^3e^{a(T-t)}/K^2$ の形で BSM PDE と終端条件を満たす $a$ を求めよ。
2. $\Delta,\psi$ を求め、$P$ 下の Itô 公式で自己金融を検証せよ。
3. $Q$ 下の満期支払額の割引期待値を [GBM の条件付きモーメント](../U3-14/index.md#prop-u3-14-conditional)で別に計算し、一致を示せ。
4. 初期費用と保有量を求め、実世界 $P$ 下の単純割引期待値との違いも示せ。

<!-- solution-start -->
**詳細解答**：

**1. PDE と終端条件**：$v=s^3e^{a\tau}/K^2,\tau=T-t$ なので

$$
v_t=-av,\qquad v_s=3v/s,\qquad v_{ss}=6v/s^2.
$$

[BSM PDE](#thm-u3-16-bsm-necessity)に代入すると

$$
(-a+\tfrac12\sigma^2\cdot6+3r-r)v
=(-a+3\sigma^2+2r)v=0.
$$

従って $a=2r+3\sigma^2=0.06+0.12=0.18$。$T$ で $e^{a(T-T)}=1$ となるから $v(T,s)=s^3/K^2$ です。

**2. 複製**：デルタと預金保有を

$$
\Delta_t=\frac{3S_t^2}{K^2}e^{a(T-t)}=\frac{3v(t,S_t)}{S_t},\qquad
\psi_t=\frac{v-\Delta_tS_t}{B_t}=-\frac{2v(t,S_t)}{B_t}
$$

とします。[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $P$ の GBM に適用すると

$$
\begin{aligned}
dv
&=(-av+3\mu v+3\sigma^2v)dt+3\sigma v\,dW^P\\
&=(3\mu-2r)v\,dt+3\sigma v\,dW^P,
\end{aligned}
$$

ここで $a=2r+3\sigma^2$ です。一方、保有利得は

$$
\begin{aligned}
\Delta\,dS+\psi\,dB
&=\Delta(\mu Sdt+\sigma SdW^P)+r\psi Bdt\\
&=(3\mu v-2rv)dt+3\sigma v\,dW^P
=dv.
\end{aligned}
$$

従って自己金融で、満期は所定の $H$ に一致します。$\Delta$ は $S^2$ の多項式なので[GBM の全次数モーメント](../U3-14/index.md#prop-u3-14-moments)により割引した自己金融価値の確率積分に必要な二乗可積分性も満たします。

**3. 独立な $Q$ 検算**：[リスク中立測度](../U3-15/index.md#thm-u3-15-risk-neutral-measure)ではドリフトが $r$ です。[GBM の条件付きモーメント](../U3-14/index.md#prop-u3-14-conditional)に $p=3$、始点 $t$、終点 $T$ を代入すると

$$
E_Q[S_T^3\mid\mathcal F_t]
=S_t^3e^{(3r+3\sigma^2)(T-t)}.
$$

[複製価格定理](../U3-15/index.md#thm-u3-15-replication-price)の割引を掛けると

$$
B_tE_Q[H/B_T\mid\mathcal F_t]
=\frac{S_t^3}{K^2}e^{(3r+3\sigma^2-r)(T-t)}
=v(t,S_t).
$$

PDE から作ったヘッジ費用と別の確率計算が一致しました。

**4. 数値と実確率との差**：$s_0=K=100$ を使うと

$$
v_0=100e^{0.18}\approx119.7217\text{ 円},\quad
\Delta_0=3e^{0.18}\approx3.5917\text{ 株},\quad
\psi_0=-200e^{0.18}\approx-239.4435.
$$

価値検算は $100(3e^{0.18})-200e^{0.18}=100e^{0.18}$ です。$P$ 下のモーメントでは $\mu=0.08$ で、単純割引平均は

$$
E_P[e^{-rT}S_T^3/K^2]
=100e^{(3\mu+3\sigma^2-r)T}
=100e^{0.33},
$$

となり $100e^{0.18}$ と異なります。$\mu$ の代わりに $r$ が入るのは複製と[測度構成定理](../U3-15/index.md#thm-u3-15-risk-neutral-measure)の結果であり、実確率の予測値を金融価格に流用してはいけません。
<!-- solution-end -->

**次講への接続**：ここでは自己金融の複製から PDE を導き、古典解が与えられればその解を条件付き期待値と照合できました。次の U3-17 では逆に、満期ペイオフの期待値から解を作る際に何を仮定すべきかを Feynman–Kac の観点で調べます。
