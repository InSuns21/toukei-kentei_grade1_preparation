# U3-21 連続時間の American 価格：最適停止

[離散時間の American オプション](../U3-06/index.md#def-u3-06-american)では、各節点で「今行使する額」と「1期後へ進む価値」を比べ、[Snell 包絡](../U3-06/index.md#def-u3-06-snell)を後ろ向きに計算しました。[Bermudan の行使日集合](../U3-07/index.md#def-u3-07-bermudan)を増やせば値は下がりません。しかし連続取引の株価では、時刻を有限個の節点に限定する理由がありません。無限個の候補時刻から、**未来を見ずに一度だけ行使する時刻**を選びたいのです。

本講では連続時間の行使規則を価格の定義に組み込み、格子上の計算と連続時間の理論を接続します。これにより、早期行使が有利な領域と、通常の Black–Scholes 方程式が成り立つ領域を区別できます。格子上で障害問題を**数値的に解く方法**は U3-24 で扱います。

## 1. 市場・情報・行使額を固定する

評価開始時刻 $0\le t<T$、株価 $s>0$ 円、満期 $T$ 年、行使価格 $K>0$ 円、一定の連続複利金利 $r\ge0$ 年$^{-1}$、連続配当利回り $q\ge0$ 年$^{-1}$、変動率 $\sigma>0$ 年$^{-1/2}$ を固定します。摩擦、取引量制限、信用リスクのない [配当付き Black–Scholes 市場](../U3-19/index.md#thm-u3-19-bsm-dividend)で、価格付け用測度 $Q$ の下、

$$
dS_u=(r-q)S_u\,du+\sigma S_u\,dW_u^Q,\qquad S_t=s
$$

とします。$W^Q$ は $Q$ 下の Brown 運動です。株価は[幾何 Brown 運動の解](../U3-14/index.md#thm-u3-14-explicit-gbm)を使い、$h=u-t\ge0$ に対して

$$
S_u^{t,s}=sX_h,\qquad
X_h=\exp\!\left((r-q-\sigma^2/2)h+\sigma(W_u^Q-W_t^Q)\right)
$$

と表せます。$X_h>0$ は初値 $s$ に依存しません。添字 $u$ は暦上の時刻、$h$ は経過年数です。$Q$ は価格付け用で、実際の価格変動を表す $P$ と混同しません。

時刻 $u$ までの Brown 運動の増分から判定できる事象の集合を $\mathcal F_u$ とし、通常の完備化・右連続化を施した情報族を使います。時刻 $t$ の初値 $s$ からの期待値を $E_{t,s}^Q$ と記します。時刻 $u$ に保有者が受け取る円建ての行使額は

$$
g_P(s)=(K-s)_+,\qquad
g_C(s)=(s-K)_+,\qquad x_+=\max\{x,0\}
$$

です。これは[European call/put の満期支払額](../U3-05/index.md#def-u3-05-european)と同じ関数ですが、American 契約では受取日も選べます。価格とは**時刻 $t$ に支払う額**であり、将来の行使額を単純に比べず必ず時刻 $t$ へ割り引きます。

## 2. 未来を見ない時刻と連続時間の価格

有限二項モデルでの[停止時刻](../U3-06/index.md#def-u3-06-stopping)は、時刻ごとに行使判定がその時点の情報で決まるという条件でした。連続時間でも同じ禁止を集合で表します。

<a id="def-u3-21-stopping"></a>

<!-- formal-statement-start -->
> **定義（連続時間の行使停止時刻）**  
> 上記のフィルトレーション $(\mathcal F_u)_{t\le u\le T}$ に対し、確率変数 $\tau:\Omega\to[t,T]$ が停止時刻であるとは、すべての $u\in[t,T]$ について

$$
\{\tau\le u\}\in\mathcal F_u
$$

> が成立することをいう。値が $[t,T]$ にある停止時刻全体を $\mathcal T_{t,T}$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-21-stopping -->
**定義の確認**：$a\in(0,s)$ とし、株価が初めて $a$ 円以下になったら行使し、達しなければ満期に行使する規則

$$
\tau_a=\inf\{u\in[t,T]:S_u\le a\}\wedge T
$$

を考えます（集合が空なら $\inf\varnothing=+\infty$）。連続標本路なので、$u<T$ での事象 $\{\tau_a\le u\}$ は「$[t,u]$ の株価最小値が $a$ 以下」と一致し、$\mathcal F_u$ に属します。$u=T$ では $\{\tau_a\le T\}=\Omega$ です。したがって停止時刻です。一方、満期の株価 $S_T$ を見てから時刻 $t$ に行使したことにする規則は、通常 $\mathcal F_t$ では判定できず、認められません。
<!-- definition-example-end -->

時刻が変わる割引支払額を比較するため、連続時間 American 価格を停止時刻にわたる上限で定めます。

<a id="def-u3-21-american-value"></a>

<!-- formal-statement-start -->
> **定義（連続時間 American 価値関数）**  
> 前節の $Q$ 下の株価過程、$r\ge0$、$g=g_P$ または $g_C$、$0\le t\le T$、$s>0$ に対して

$$
V_g(t,s)=\sup_{\tau\in\mathcal T_{t,T}}
 E_{t,s}^Q\!\left[e^{-r(\tau-t)}g(S_\tau)\right]
$$

> と定める。これを連続時間 American オプションの時刻 $t$ における価値という。$\tau=T$ のみを許した値を European 価値 $v_g^E(t,s)$ とする。
<!-- formal-statement-end -->

この定義では停止時刻を選ぶという**権利の価値**が上限に含まれます。[リスク中立評価](../U3-15/index.md#thm-u3-15-replication-price)と整合する摩擦なしの完備市場を前提とし、現実の注文費用や流動性を含む実売買価格の保証ではありません。

<!-- definition-example-start: def-u3-21-american-value -->
**定義の確認**：$K=100$ 円、$s=1$ 円、$r=0.05$ 年$^{-1}$、$q=0$、$T-t=1$ 年、$\sigma=0.2$ 年$^{-1/2}$ の put を考えます。$\tau=t$ は停止時刻なので $V_P(t,1)\ge(100-1)_+=99$ 円です。一方 European put の支払額は常に100円以下で、$v_P^E(t,1)\le100e^{-0.05}\approx95.122942$ 円です。従って $V_P>v_P^E$ が厳密に成立し、早期行使機会が値を生んでいます。これは「今行使すべき」と断定するための比較ではなく、少なくとも満期固定より有利な規則があることの証明です。
<!-- definition-example-end -->

**期待値が有限である理由**：$0\le g_P(S_u)\le K$、$0\le g_C(S_u)\le S_u$ です。有限区間の GBM は $E_{t,s}^Q[\sup_{t\le u\le T}S_u]<\infty$ を満たします。実際 $\sup S_u\le s\exp(|r-q-\sigma^2/2|(T-t)+\sigma\sup_{0\le h\le T-t}|W_{t+h}-W_t|)$ であり、Brown 運動最大値のガウス型尾部評価により右辺は可積分です。従って各停止時刻の支払額、後の極限で用いる共通の上界はともに可積分です。

## 3. Bermudan の細分化から連続時間へ

停止時刻全体を直接列挙できなくても、[Bermudan の後退帰納](../U3-07/index.md#prop-u3-07-stopping-value)は有限の行使日なら使えます。$n=0,1,\ldots$ ごとに日程を

$$
D_n=\{t+j(T-t)/2^n:j=0,\ldots,2^n\}
$$

とします。$D_n\subset D_{n+1}$ なので、同じ株価モデルで日程だけを細かくした価格を比較できます。

<a id="prop-u3-21-grid-limit"></a>

<!-- formal-statement-start -->
> **命題（Bermudan 格子価格の単調収束）**  
> 第1節の $r,q\ge0,\sigma>0$ の GBM と連続・高々一次成長の行使額 $g=g_P$ または $g_C$ を仮定する。$D_n$ に値をとる停止時刻に限定した価値を $V_g^{(n)}(t,s)$ とすると、各 $t\le T,s>0$ で

$$
v_g^E(t,s)\le V_g^{(n)}(t,s)
\le V_g^{(n+1)}(t,s)\le V_g(t,s),
\qquad
\lim_{n\to\infty}V_g^{(n)}(t,s)=V_g(t,s).
$$

> 各 $V_g^{(n)}$ は、行使日で「即時行使額」と「条件付き継続価値」の最大を取る Bermudan 後退帰納で計算できる。
<!-- formal-statement-end -->

### 証明の見取り図

日程を細かくすると許された選択肢が増えます。逆向きの不等式を極限で示すには、任意の連続時間停止時刻を直後の格子点へ丸め、株価の連続性から割引行使額が収束することを使います。丸めた規則も停止時刻である点が核心です。

<!-- proof-start -->
### 証明

$D_n$ に値をとる停止時刻集合を $\mathcal T_n$ とします。$\tau=T$ はどの集合にも属し、$\mathcal T_n\subset\mathcal T_{n+1}\subset\mathcal T_{t,T}$ なので、上限を取る集合の包含から表示した不等式が従います。既習の[行使日集合の単調性](../U3-07/index.md#prop-u3-07-schedule-monotonicity)と同じ論理です。

任意の $\tau\in\mathcal T_{t,T}$ に対して、$\tau_n=\min\{d\in D_n:d\ge\tau\}$ と置きます。各格子日 $d_j$ について

$$
\{\tau_n\le d_j\}=\{\tau\le d_j\}\in\mathcal F_{d_j}
$$

です。二つの格子日の間の時点 $u$ では $\{\tau_n\le u\}$ はその直前の格子日までの事象と同じなので、$\tau_n$ は停止時刻です。しかも

$$
\tau\le\tau_n<\tau+(T-t)2^{-n}
$$

（$\tau=T$ では等号 $\tau_n=T$）であり、$\tau_n\downarrow\tau$ です。$S$ の標本路の連続性と $g$ の連続性から

$$
e^{-r(\tau_n-t)}g(S_{\tau_n})
\longrightarrow e^{-r(\tau-t)}g(S_\tau)
\quad Q\text{-a.s.}
$$

が成り立ちます。第2節の可積分な共通上界 $K+\sup_{t\le u\le T}S_u$ と $r\ge0$ を使って優収束定理を適用すると、

$$
E_{t,s}^Q[e^{-r(\tau_n-t)}g(S_{\tau_n})]
\longrightarrow E_{t,s}^Q[e^{-r(\tau-t)}g(S_\tau)].
$$

左辺は $V_g^{(n)}(t,s)$ 以下なので、その単調極限 $L$ は任意の $\tau$ に対して右辺以上です。$\tau$ にわたり上限を取れば $L\ge V_g(t,s)$。逆に $L\le V_g(t,s)$ は既述の不等式から従うため、等号となります。各格子の後退帰納は[有限 Bermudan 価値の定理](../U3-07/index.md#prop-u3-07-stopping-value)によります。
<!-- proof-end -->

**注意**：上の収束定理は「同じ連続時間 GBM 上で行使日だけを細分化する」結果です。実際の CRR 二項木は、日程と**株価近似**を同時に変えるので、その数値誤差には別途[CRR の株価近似](../U3-11/index.md#def-u3-11-crr)とその収束の検討が必要です。単調収束の証明をそのまま CRR の価格が $N$ に対して単調である証明へ流用してはいけません。

## 4. 連続時間の Snell 包絡と最適停止

離散モデルの[割引 Snell 包絡の最小優マルチンゲール性](../U3-06/index.md#prop-u3-06-minimal)を連続時間へ拡張します。優マルチンゲールとは、現在の情報から見た将来の条件付き期待値が現在値を超えない過程です。これは無条件に「株価が下がる」という意味ではありません。

<a id="thm-u3-21-snell"></a>

<!-- formal-statement-start -->
> **定理（連続時間の割引 Snell 包絡）**  
> 第1節の Brown 運動の通常の情報族、有限満期、非負金利および連続な call/put 行使額を仮定する。初期時刻 $t$ で、$u\in[t,T]$ に対し

$$
Z_u=e^{-r(u-t)}g(S_u),\qquad
Y_u=e^{-r(u-t)}V_g(u,S_u)
$$

> と置く。$Y$ は、$Z$ を各時刻で上回る**最小の優マルチンゲール**であり、$Y_T=Z_T$ を満たす。さらに最初の接触時刻

$$
\tau_*=\inf\{u\in[t,T]:Y_u=Z_u\}\wedge T
$$

> は最適停止時刻で、

$$
V_g(t,s)=E_{t,s}^Q[e^{-r(\tau_*-t)}g(S_{\tau_*})]
$$

> が成立する。最小性は可積分で右連続な優マルチンゲールの間で考える。
<!-- formal-statement-end -->

### 証明の見取り図

どの時刻でも即時行使できるので $Y\ge Z$ です。時刻 $u$ で「時刻 $v$ まで必ず待ち、そこから最適に選ぶ」行動は許されるため、$Y_u\ge E[Y_v\mid\mathcal F_u]$。一方、$Z$ を上回る任意の優マルチンゲール $M$ は任意の停止時刻 $\tau$ で $M_u\ge E[Z_\tau\mid\mathcal F_u]$ です。行使領域へ初めて入るまで待つと、最適価値から確定的な割引行使額へ移り、等号が達成されます。

<!-- proof-start -->
### 証明

条件付き版の価値を明示します。Brown 運動の独立増分と $S_u=sX_{u-t}$ による Markov 性を使うと、

$$
Y_u=\mathop{\mathrm{ess\,sup}}_{\tau\in\mathcal T_{u,T}}
E^Q[Z_\tau\mid\mathcal F_u].
$$

ここで右辺は時刻 $u$ に利用できる情報で条件付けた上限です。有限 Bermudan 格子なら、[各節点の後退帰納](../U3-07/index.md#prop-u3-07-stopping-value)がこの等式を与えます。格子で得た最適規則を過去に応じて貼り合わせても未来情報は使用しません。前節の可積分上界を用いて格子の幅を0にすると、各候補停止時刻の直後丸めの期待値が収束するため連続時間の式を得ます。

$\tau=u$ を選べるので $Y_u\ge Z_u$ です。また $u\le v$ で、$v$ までは行使せず、その後に条件付き最適停止を選べば、

$$
Y_u\ge E^Q[Y_v\mid\mathcal F_u]
$$

です。従って $Y$ は優マルチンゲールです。任意の可積分・右連続な優マルチンゲール $M$ が $M_v\ge Z_v$ を満たすとき、有界停止時刻への[条件付き期待値の停止時刻版](../U3-06/index.md#prop-u3-06-minimal)と連続時間の任意停止定理より

$$
M_u\ge E^Q[M_\tau\mid\mathcal F_u]
\ge E^Q[Z_\tau\mid\mathcal F_u]
$$

となります。$\tau$ の本質的上限を取れば $M_u\ge Y_u$ で、最小性が示されます。

最後の最適停止については、連続標本路で可積分上界を持つ Snell 包絡の**接触時刻による最適停止原理**を用います。その仕組みを格子で確かめます。有限格子では、[最初の行使節点による最適停止](../U3-06/index.md#thm-u3-06-first-exercise)により、接触前は $Y$ の割引条件付き継続期待値と等しく、停止した包絡はマルチンゲールです。連続時間でも $Y$ と $Z$ の連続性およびクラス D（一様可積分な停止値族）から、接触前の局所区間でこの等式を保ち、$\tau_\varepsilon=\inf\{u:Y_u-Z_u\le\varepsilon\}\wedge T$ で停止した包絡をマルチンゲールとして近似できます。$\varepsilon\downarrow0$ では $\tau_\varepsilon\uparrow\tau_*$、連続性により $Y_{\tau_*}=Z_{\tau_*}$ となり、一様可積分性から

$$
Y_t=E^Q[Y_{\tau_*}]
=E^Q[Z_{\tau_*}]
$$

を得ます。接触時刻原理のための連続性・一様可積分性を落とした一般の支払過程へ、この結論を無条件に拡張してはいけません。
<!-- proof-end -->

前の式における $Y$ の連続性は、GBM の連続性と Lipschitz な行使額に対する価値の連続性から得られます。確率過程一般の不連続な payoff では、最初の接触時刻が最適とは限りません。

## 5. 早期行使領域・境界・比較

将来まで保有する価値が即時行使を**厳密に**上回る場所では、行使する理由はありません。両者が一致するときには即時行使が最適な選択肢になります。

<a id="def-u3-21-regions"></a>

<!-- formal-statement-start -->
> **定義（連続時間の継続領域・行使領域と put 行使境界）**  
> 上記の $V_g$ と $g$ に対し、$t<T,s>0$ で

$$
\mathcal C_g=\{(t,s):V_g(t,s)>g(s)\},\qquad
\mathcal E_g=\{(t,s):V_g(t,s)=g(s)\}
$$

> をそれぞれ継続領域・行使領域とする。put の場合、固定した $t$ で $\mathcal E_P$ が $s\le b(t)$ の形を持つとき、その境目 $b(t)$ を put の行使境界という。該当する正の株価がなければ境界を0と約束する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-21-regions -->
**定義の確認**：前節の $s=1,K=100,r=0.05,\tau=1$ の例は $V_P\ge99>v_P^E$ ですが、これだけで $\mathcal E_P$ に属するとはまだ言えません。行使領域の判定には **$V_P=g_P$** そのものが必要です。対照的に、2期 CRR 木の時点1で株価86.812345円、即時行使13.187655円、継続10.718647円なら、**格子モデル**において行使節点です。連続時間の境界へ読み替える前に格子誤差を評価する必要があります。
<!-- definition-example-end -->

<a id="prop-u3-21-put-shape"></a>

<!-- formal-statement-start -->
> **命題（連続時間 put の低株価側の行使領域）**  
> 第1節の $r,q\ge0$ の GBM と put 行使額 $g_P(s)=(K-s)_+$ を仮定する。任意の固定時刻 $t<T$ について、$s\mapsto V_P(t,s)$ は凸・非増加・1-Lipschitz である。さらに $0<s_1<s_2<K$ で $V_P(t,s_2)=K-s_2$ なら、$V_P(t,s_1)=K-s_1$ である。従って $s<K$ の put の行使集合は低株価側に連なる（空集合の可能性は残す）。
<!-- formal-statement-end -->

### 証明の見取り図

同じ Brown 運動の経路で初値だけ $s$ を変えると、株価は $sX$ と比例します。各停止規則に対する put の期待値は $s$ に関して凸であり、その上限も凸です。$1$-Lipschitz 性は割引株価の優マルチンゲール性から出ます。即時行使との差は $s<K$ で非減少なので、高い株価で即時行使なら低い株価でも即時行使です。

<!-- proof-start -->
### 証明

同一の停止時刻 $\tau$ について $X_{\tau-t}>0$ は $s$ と無関係です。$f_\tau(s)=E^Q[e^{-r(\tau-t)}(K-sX_{\tau-t})_+]$ とおきます。各経路の $(K-sX)_+$ は $s$ の凸・非増加関数なので、その正の重み付き期待値 $f_\tau$ も凸・非増加です。停止時刻集合は $s$ に依存せず Brown 運動の情報族で共通に選べるため、$V_P=\sup_\tau f_\tau$ も凸・非増加です。

$0<s_1<s_2$ のとき、$x\mapsto(K-x)_+$ が1-Lipschitz であることから、経路ごとに

$$
0\le(K-s_1X)_+-(K-s_2X)_+\le(s_2-s_1)X
$$

です。また $e^{-r(u-t)}X_{u-t}$ は $q=0$ ではマルチンゲール、$q\ge0$ では優マルチンゲールです。実際 $d(e^{-r(u-t)}X_{u-t})=-q e^{-r(u-t)}X_{u-t}\,du+\sigma e^{-r(u-t)}X_{u-t}\,dW_u^Q$ であり、停止値は前述の共通可積分上界で支配されます。有界停止時刻への任意停止から

$$
E^Q[e^{-r(\tau-t)}X_{\tau-t}]\le1.
$$

従って $0\le f_\tau(s_1)-f_\tau(s_2)\le s_2-s_1$ です。上限を取るときも、各 $\tau$ で $f_\tau(s_1)\le f_\tau(s_2)+s_2-s_1$ なので、

$$
0\le V_P(t,s_1)-V_P(t,s_2)\le s_2-s_1.
$$

$s<K$ では $D(s)=V_P(t,s)-(K-s)\ge0$ と置けます。上式を変形すると $D(s_2)-D(s_1)\ge0$ です。$D(s_2)=0$ なら $0\le D(s_1)\le D(s_2)=0$ なので $D(s_1)=0$。これが主張です。
<!-- proof-end -->

$V_P(t,s)\ge0=g_P(s)$ は $s\ge K$ でも成立しますが、$s>K$ では満期まで待つと正の put 支払額が正の確率で生じるので、$\sigma>0,t<T$ なら $V_P(t,s)>0$ です。従って $s\ge K$ に真の行使領域はありません。境界 $b(t)$ が常に正であるという**存在の証明**や滑らかな接続性は、今の凸性だけからは出ません。

<a id="thm-u3-21-call-no-early"></a>

<!-- formal-statement-start -->
> **定理（無配当・非負金利 call の早期行使不要）**  
> 第1節のモデルで $q=0$、$r\ge0$、$K>0$、$\sigma>0$ とする。call の連続時間 American 価格は同じ満期の European call 価格に一致する。

$$
V_C(t,s)=v_C^E(t,s)
=E_{t,s}^Q[e^{-r(T-t)}(S_T-K)_+].
$$
<!-- formal-statement-end -->

### 証明の見取り図

満期固定の call 価格自体が、満期までの任意時点で即時行使額以上です。その割引価格は $Q$ 下のマルチンゲールだから、どんな行使停止時刻を選んでも、その行使額の割引期待値は満期固定の価格を超えません。$\tau=T$ は American にも許されるので等号です。

<!-- proof-start -->
### 証明

任意の $u\in[t,T]$ と株価 $x>0$ に対し、正部分関数の凸性と $q=0$ におけるリスク中立株価平均 $E_{u,x}^Q[S_T]=xe^{r(T-u)}$ を使います。[割引評価の条件付き期待値](../U3-17/index.md#def-u3-17-valuation)から

$$
\begin{aligned}
v_C^E(u,x)
&=e^{-r(T-u)}E_{u,x}^Q[(S_T-K)_+]\\
&\ge e^{-r(T-u)}(E_{u,x}^Q[S_T]-K)_+\\
&=(x-Ke^{-r(T-u)})_+\ge(x-K)_+.
\end{aligned}
$$

最後の不等式は $r\ge0$ だからです。[リスク中立終端価値のマルチンゲール表示](../U3-15/index.md#thm-u3-15-replication-price)により $M_u=e^{-r(u-t)}v_C^E(u,S_u)=E^Q[e^{-r(T-t)}(S_T-K)_+\mid\mathcal F_u]$ は可積分なマルチンゲールです。任意の有界停止時刻 $\tau\in\mathcal T_{t,T}$ について任意停止定理を適用し、

$$
\begin{aligned}
E^Q[e^{-r(\tau-t)}(S_\tau-K)_+]
&\le E^Q[e^{-r(\tau-t)}v_C^E(\tau,S_\tau)]\\
&=E^Q[M_\tau]=M_t=v_C^E(t,s)
\end{aligned}
$$

を得ます。$\tau$ の上限で $V_C\le v_C^E$、$\tau=T$ を取れば $V_C\ge v_C^E$ で一致します。
<!-- proof-end -->

配当 $q>0$ があると $e^{-r(T-u)}E_{u,x}^Q[S_T]=xe^{-q(T-u)}$ となり、$x-Ke^{-r(T-u)}$ への下界の置き換えはできません。従ってこの証明を配当付き call に流用できません。[離散モデルの配当付き反例](../U3-07/index.md#prop-u3-07-dividend-counterexample)も、この条件が重要であることを示しています。

## 6. 変分不等式と自由境界：どこが PDE になるか

[欧州型価格の Black–Scholes 方程式](../U3-16/index.md#prop-u3-16-dividend-pde)は満期まで必ず保有する状況に対応します。American の継続領域では、短い時間待っても最適であるため、そこに限れば同じ PDE になります。一方、行使領域では $V=g$ を優先させます。

株価に作用する二階微分演算子を

$$
\mathcal Lf(t,s)=(r-q)s f_s(t,s)+\frac{\sigma^2s^2}{2}f_{ss}(t,s),
\qquad
\mathcal Af=f_t+\mathcal Lf-rf
$$

と表します。$\mathcal A$ は割引効果を含んだ時間発展を表し、$s>0$ と $t<T$ の滑らかな関数に作用させます。

<a id="prop-u3-21-obstacle"></a>

<!-- formal-statement-start -->
> **命題（古典的に滑らかな場所での American 障害条件）**  
> 第1節の $V_g$ を考える。ある開集合 $U\subset[0,T)\times(0,\infty)$ 上で $V_g\in C^{1,2}(U)$ と仮定する。このとき $U$ では

$$
V_g\ge g,\qquad
\mathcal AV_g\le0,\qquad
(V_g-g)(\mathcal AV_g)=0.
$$

> すなわち、同じ開集合の各点で

$$
\max\{g-V_g,\ \mathcal AV_g\}=0
$$

> が成立する。特に継続領域 $\mathcal C_g$ の滑らかな内点では $\mathcal AV_g=0$、行使領域の滑らかな内点では $V_g=g$ と $\mathcal AV_g\le0$ が成立する。満期条件は $V_g(T,s)=g(s)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

即時行使できるので $V_g\ge g$ です。割引価値 $Y$ が優マルチンゲールであることから、微小時間の条件付き平均は現在価値以下になり、Itô 公式の $du$ 係数 $\mathcal AV_g$ は非正になります。継続領域で短い時間待つことが最適なら等号なので、二つの条件の積は0です。

<!-- proof-start -->
### 証明

$V_g\ge g$ は[価値関数の定義](#def-u3-21-american-value)で $\tau=t$ を選べば従います。任意の $(t_0,s_0)\in U$ に対し、閉じた小さな空間時間長方形を $U$ 内に取り、株価がその外へ出る時刻か $t_0+h$ の早い方を $\eta_h$ とします。局所化した $e^{-r(u-t_0)}V_g(u,S_u)$ に、[$Q$ 下の Itô 公式](../U3-13/index.md#prop-u3-13-discounted-function)を適用すると

$$
\begin{aligned}
e^{-r(\eta_h-t_0)}V_g(\eta_h,S_{\eta_h})-V_g(t_0,s_0)
&=\int_{t_0}^{\eta_h}e^{-r(u-t_0)}\mathcal AV_g(u,S_u)\,du\\
&\quad+\int_{t_0}^{\eta_h}e^{-r(u-t_0)}
 \sigma S_u(V_g)_s(u,S_u)\,dW_u^Q.
\end{aligned}
$$

長方形内で係数と導関数が有界になるよう局所化してあるので、右辺最後の確率積分は期待値0です。[Snell 包絡の優マルチンゲール性](#thm-u3-21-snell)から左辺の期待値は非正です。$h\downarrow0$ で連続性と $\eta_h-t_0$ の局所挙動により平均積分を $h$ で割った極限は $\mathcal AV_g(t_0,s_0)$ となるので $\mathcal AV_g\le0$ です。

さらに $(t_0,s_0)\in\mathcal C_g$ なら $V_g-g>0$ です。両関数は連続なので、長方形を縮めればそこでは即時行使が劣後し、[接触時刻までの Snell 包絡](#thm-u3-21-snell)は局所マルチンゲールです。従って上式左辺の期待値が0となり、同じ極限により $\mathcal AV_g(t_0,s_0)=0$ です。行使領域では $V_g=g$ なので、いずれの領域でも積が0です。満期では $\tau=T$ しか選べず $V_g(T,s)=g(s)$ です。
<!-- proof-end -->

**重要な限定**：この命題は $V_g$ が古典微分可能な開集合についての主張です。$g_P,g_C$ は $s=K$ で微分不可能で、未知の自由境界で $V_g$ が $C^{1,2}$ とも限りません。境界全体を含む方程式の厳密な扱いには弱解・粘性解・追加正則性が必要であり、本講では無条件の古典解存在や smooth fit（滑らかな接続）を主張しません。U3-24 の数値的相補条件も、この区別を保って扱います。

<!-- definition-example-start: prop-u3-21-obstacle -->
**局所判定の計算**：put の行使領域の滑らかな内点で $s<K$ なら $V_P=K-s$ です。従って $(V_P)_t=0$、$(V_P)_s=-1$、$(V_P)_{ss}=0$ を上の演算子へ代入すると

$$
\mathcal A(K-s)=-(r-q)s-r(K-s)=qs-rK.
$$

$q=0,r>0$ なら $-rK<0$ で障害条件と整合します。配当付きでは $qs-rK>0$ となる点を put の**滑らかな行使領域の内点**に置くことはできません。これは局所的な必要条件であって、符号だけで境界の存在や位置が確定するわけではありません。
<!-- definition-example-end -->

## 7. CRR 木で行使判断を検算する

直接連続時間の停止時刻をすべて列挙する代わりに、[CRR 木](../U3-11/index.md#def-u3-11-crr)で時刻も株価も近似します。次の数値はすべて**円、年**を単位とし、$s=K=100$ 円、$T-t=1$ 年、$r=0.05$、$q=0$、$\sigma=0.20$ です。時刻幅 $\Delta t=1/N$、上下倍率と評価用確率は

$$
u=e^{\sigma\sqrt{\Delta t}},\qquad
d=u^{-1},\qquad
p=\frac{e^{r\Delta t}-d}{u-d},\qquad
R=e^{-r\Delta t}.
$$

まず $N=2$ なら $u\approx1.151910$、$d\approx0.868123$、$p\approx0.553908$ です。時刻1の下枝では

$$
\begin{aligned}
S_D&=100d\approx86.812345,\\
H_D&=100-S_D\approx13.187655,\\
C_D&=R\{p(100-100)_++(1-p)(100-100d^2)_+\}\\
&\approx10.718647.
\end{aligned}
$$

$H_D>C_D$ なので行使を選びます。上枝では直後の put 行使額も満期支払額も0円です。根では即時行使0円に対し、後ろ向き評価は

$$
V_0^{\mathrm{CRR},N=2}
=R\bigl\{(1-p)13.187655+p\cdot0\bigr\}
\approx5.737654\ \text{円}.
$$

この粗い木で早期行使節点が現れることは、連続時間 put が低株価側に行使領域を持つことと**整合**します。しかし数値近似の2期木の境界が連続時間の厳密境界だとは言えません。

再現可能な計算は次の Python ファイルに置きます。

<!-- lab-start -->
# lab-id: U3-21-AMERICAN-STOPPING
# lab-title: American put の後退帰納・行使節点と欧州型比較
# lab-file: textbook/volumes/dream_thater/応用系/U/U3-21/assets/american_stopping.py
# timeout-ms: 15000
# lab-preset: N=2,25,100,400 の American/European put と無配当 call を比較 |
<!-- lab-end -->

プログラムは各 $N$ に対し American put $\ge$ European put $\ge$ 時刻0の即時行使額を検査し、無配当 call の American/European が格子でも一致することを確認します。$N=2,25,100,400$ の American put はおよそ $5.737654,6.146185,6.082354,6.088406$ 円で、**CRR の $N$ に対する単調性はない**ことも分かります。行使日だけの包含から得た第3節の単調性とは別の主張です。

## 8. 演習と詳細解答

以下では断りがなければ第1節の GBM 市場・$r,q\ge0$・$\sigma>0$、円・年を単位とし、停止時刻は満期 $T$ 以下です。各解答は必要な仮定と中間式を再現できるように書きます。

<a id="ex-u3-21-a1"></a>
### U3-21-A1：連続時間の停止時刻
- Level: A

$a<s$ とし、$\tau_a=\inf\{u\ge t:S_u\le a\}\wedge T$ を考える。$\tau_a$ が停止時刻であることと、$S_T<a$ のときだけ $\tau=t$ に行使したことにする規則が一般には停止時刻でないことを説明せよ。

<!-- solution-start -->
**詳細解答**：株価の連続性から $u<T$ で $\{\tau_a\le u\}=\{\min_{t\le v\le u}S_v\le a\}$ です。右辺は時刻 $u$ までの株価経路だけで判定できるので $\mathcal F_u$ に属します。$u=T$ では全事象 $\Omega$ です。一方、$t<T$ で $\sigma>0$ なら $S_T$ は将来の Brown 増分で変わり、$\{S_T<a\}$ は一般に $\mathcal F_t$ の事象ではありません。時刻 $t$ の判定へ未来情報を持ち込むため不適格です。
<!-- solution-end -->

<a id="ex-u3-21-a2"></a>
### U3-21-A2：行使額と時刻0への割引
- Level: A

$K=100$ 円、$S_t=80$ 円、$r=0.05$ 年$^{-1}$、$T-t=1$ 年の put について、今行使する額と、満期に $S_T=70$ 円となった経路の時刻 $t$ への割引額を求めよ。経路の値だけで将来待つ方が最適と言えるか。

<!-- solution-start -->
**詳細解答**：今行使する額は $(100-80)_+=20$ 円です。指定経路で満期に行使すれば受取は $(100-70)_+=30$ 円、その時刻 $t$ の額は $30e^{-0.05}\approx28.536882$ 円です。ただし時刻 $t$ では $S_T=70$ になるか分かりません。停止時刻の最適化は $Q$ 下の**全経路の割引期待値**で行うので、都合のよい一経路だけで継続が最適とは結論できません。
<!-- solution-end -->

<a id="ex-u3-21-a3"></a>
### U3-21-A3：American と European の大小
- Level: A

一般の非負行使額 $g$ について $V_g(t,s)\ge g(s)$ と $V_g(t,s)\ge v_g^E(t,s)$ を、許される停止時刻を具体的に挙げて証明せよ。

<!-- solution-start -->
**詳細解答**：$\tau=t$ は $\{\tau\le u\}=\Omega$ なので停止時刻です。この値を[価値関数の上限](#def-u3-21-american-value)へ代入すると $E[e^{-r(t-t)}g(S_t)]=g(s)$ です。また $\tau=T$ も決定的停止時刻で、対応する期待値は $E[e^{-r(T-t)}g(S_T)]=v_g^E(t,s)$ です。上限は各候補の値以上なので二つの不等式が従います。
<!-- solution-end -->

<a id="ex-u3-21-a4"></a>
### U3-21-A4：put の早期行使機会の厳密な価値
- Level: A

$K=100$、$r=0.05$、$T-t=1$、$s=1$ の put で、$\sigma>0,q=0$ とする。閉形式を計算せず $V_P>v_P^E$ を証明せよ。この事実から $\tau=t$ の最適性も結論できるか。

<!-- solution-start -->
**詳細解答**：$\tau=t$ が許されるので $V_P\ge(100-1)_+=99$ 円です。満期 put 支払額は経路ごとに $(100-S_T)_+\le100$ 円なので $v_P^E=E[e^{-0.05}(100-S_T)_+]\le100e^{-0.05}\approx95.122942<99$ 円です。従って $V_P>v_P^E$ です。しかし $V_P$ はあらゆる停止時刻の上限であり、$V_P=99$ と示したわけではありません。即時行使が**最適**かどうかは未確定です。
<!-- solution-end -->

<a id="ex-u3-21-a5"></a>
### U3-21-A5：行使領域での演算子
- Level: A

put の行使領域の滑らかな内点で $V_P=K-s$ ($s<K$) とする。$\mathcal AV_P$ を求め、$r=0.05,q=0.02,K=100,s=80$ で符号を調べよ。

<!-- solution-start -->
**詳細解答**：時刻微分は0、株価一階微分は $-1$、二階微分は0なので

$$
\mathcal AV_P=0+(r-q)s(-1)+0-r(K-s)=qs-rK.
$$

指定値では $0.02\cdot80-0.05\cdot100=1.6-5=-3.4$ 円/年で非正となり、[障害条件](#prop-u3-21-obstacle)に矛盾しません。負だから必ず行使領域だという逆向きの判定はできません。
<!-- solution-end -->

<a id="ex-u3-21-b1"></a>
### U3-21-B1：格子へ丸めても未来を見ない
- Level: B

$n$ 番目の格子 $D_n=\{t+j(T-t)/2^n\}$ を使い、$\tau_n=\min\{d\in D_n:d\ge\tau\}$ とする。任意の連続時間停止時刻 $\tau$ に対して、$\tau_n$ が停止時刻で $\tau_n\downarrow\tau$ を示し、put の格子価値が連続時間価値へ収束する理由を説明せよ。

<!-- solution-start -->
**詳細解答**：$d_j\in D_n$ に対し $\{\tau_n\le d_j\}=\{\tau\le d_j\}\in\mathcal F_{d_j}$ です。$d_j\le u<d_{j+1}$ のときは $\{\tau_n\le u\}=\{\tau_n\le d_j\}\in\mathcal F_u$ です。従って停止時刻です。丸め誤差は $0\le\tau_n-\tau<(T-t)2^{-n}$（$\tau=T$ の場合は0）なので $\tau_n\downarrow\tau$。連続株価と put の連続性により $e^{-r(\tau_n-t)}g_P(S_{\tau_n})\to e^{-r(\tau-t)}g_P(S_\tau)$ が標本路ごとに成り立ちます。put では割引額が常に $K$ 以下なので優収束定理で期待値も収束します。各 $\tau_n$ は格子価値の許容候補であり、任意の $\tau$ で極限下界を得たあと停止時刻全体の上限を取ると、格子価値の極限が $V_P$ になります。
<!-- solution-end -->

<a id="ex-u3-21-b2"></a>
### U3-21-B2：put 行使集合が低い株価へ連なる理由
- Level: B

$0<s_1<s_2<K$ で $V_P(t,s_2)=K-s_2$ とする。$q\ge0$ の割引株価の優マルチンゲール性を用いて $V_P(t,s_1)=K-s_1$ を導け。

<!-- solution-start -->
**詳細解答**：同一経路の $S_u^{t,s}=sX_{u-t}$ を使います。各 $\tau$ に対して、正部分の1-Lipschitz性から

$$
0\le (K-s_1X_{\tau-t})_+-(K-s_2X_{\tau-t})_+
\le(s_2-s_1)X_{\tau-t}.
$$

割引株価のドリフトは $-q$ なので、$q\ge0$ で $E[e^{-r(\tau-t)}X_{\tau-t}]\le1$ です。割引期待値と $\tau$ にわたる上限から $V_P(t,s_1)-V_P(t,s_2)\le s_2-s_1$ を得ます。$V_P(t,s_2)=K-s_2$ を代入すると $V_P(t,s_1)\le K-s_1$。一方 [即時行使下界](#def-u3-21-american-value)により $V_P(t,s_1)\ge K-s_1$ です。二つを合わせて等号です。
<!-- solution-end -->

<a id="ex-u3-21-b3"></a>
### U3-21-B3：PDE を全領域へ貼る誤り
- Level: B

無配当、$r>0$ の American put について、「価格 $V$ はどこでも Black–Scholes 方程式 $\mathcal AV=0$ を満たす」と仮定する。もし滑らかな行使領域の内点で $V=K-s$ なら何が矛盾するか。正しい条件を述べよ。

<!-- solution-start -->
**詳細解答**：$q=0$、$V=K-s$ では $V_t=0$、$V_s=-1$、$V_{ss}=0$ なので $\mathcal AV=-rs-r(K-s)=-rK$ です。$r>0,K>0$ により $-rK<0$ となり $\mathcal AV=0$ と矛盾します。正しくは $V\ge g_P$、$\mathcal AV\le0$、$(V-g_P)\mathcal AV=0$ という[障害条件](#prop-u3-21-obstacle)であり、$V>g_P$ の**継続領域**で $\mathcal AV=0$ が成立します。これは古典微分可能な点での主張で、自由境界で同じ微分式を強制できません。
<!-- solution-end -->

<a id="ex-u3-21-b4"></a>
### U3-21-B4：割引 European call を上界に使う
- Level: B

$q=0,r\ge0$ の BSM 市場で、任意の American call 行使停止時刻 $\tau$ の割引支払額の期待値が European call の時刻 $t$ 価格以下であることを、条件付き Jensen 不等式と任意停止を使って証明せよ。

<!-- solution-start -->
**詳細解答**：時刻 $u$、株価 $x$ で Jensen 不等式から

$$
v_C^E(u,x)
=e^{-r(T-u)}E[(S_T-K)_+]
\ge(e^{-r(T-u)}E[S_T]-Ke^{-r(T-u)})_+
=(x-Ke^{-r(T-u)})_+.
$$

$q=0$ で $E[S_T]=xe^{r(T-u)}$ を使いました。$r\ge0$ なので右辺は $(x-K)_+$ 以上です。一方 $M_u=e^{-r(u-t)}v_C^E(u,S_u)$ は終端支払額の条件付き期待値で、可積分なマルチンゲールです。従って

$$
E[e^{-r(\tau-t)}(S_\tau-K)_+]
\le E[M_\tau]=M_t=v_C^E(t,s).
$$

最後は $\tau\le T$ と任意停止定理によります。$\tau=T$ を許すので American の上限はこの値と一致します。
<!-- solution-end -->

<a id="ex-u3-21-c1"></a>
### U3-21-C1：2期 CRR put・境界・障害条件の統合検算
- Level: C

$s=K=100$ 円、$r=0.05$、$q=0$、$\sigma=0.2$、$T-t=1$ 年とする。(i) $N=2$ の CRR 木の $u,d,p$ を求め、満期 put 支払額と時刻1の行使・継続を比較して時刻0 American put 価格を求めよ。(ii) $N=2$ の結果が、同じ連続時間 GBM 上で行使日を増やす価格の単調性を**証明しない理由**を述べよ。(iii) 無配当 American call の早期行使不要と put の行使領域での $\mathcal AV$ の符号を説明せよ。

<!-- solution-start -->
**詳細解答**：

(i) 期間は $\Delta t=1/2$ 年、1期の割引係数は $R=e^{-0.025}$ です。

$$
u=e^{0.2/\sqrt2}\approx1.151910,\qquad
d=e^{-0.2/\sqrt2}\approx0.868123,
$$

$$
p=\frac{e^{0.025}-d}{u-d}\approx0.553908,\qquad
1-p\approx0.446092.
$$

株価の終端値は上上 $S_{UU}=100u^2\approx132.689644$、上下 $S_{UD}=100ud=100$、下下 $S_{DD}=100d^2\approx75.363832$ 円です。put の満期支払額は順に $0,0,24.636168$ 円です。時刻1の上節点では $H_U=0,C_U=0$、下節点では

$$
H_D=100-100d\approx13.187655,
\quad C_D=R\{p\cdot0+(1-p)(100-100d^2)\}
\approx10.718647.
$$

よって下では行使、上では同点のため継続も行使も可能です。根で即時行使額は0、条件付き継続額は

$$
V_0=R\{p\cdot0+(1-p)H_D\}
\approx5.737654\ \text{円}.
$$

(ii) [格子単調収束命題](#prop-u3-21-grid-limit)は、**同じ確率過程 $S$ を固定したまま**許容停止時刻集合だけを $D_n\subset D_{n+1}$ に拡張したものです。CRR の $N$ を変えると株価の標本路、遷移確率 $p$、上下倍率 $u,d$ も変わるので、価格の単調性を導く許容集合の包含はそのまま使えません。

(iii) $q=0,r\ge0$ なら European call の割引価格が各時刻の call 行使額以上のマルチンゲールなので、[早期行使不要定理](#thm-u3-21-call-no-early)が成り立ちます。一方 put の滑らかな行使領域内点で $V=K-s$ を代入すると $\mathcal AV=-rK=-5$ 円/年です。これは $\mathcal AV\le0$ に適合し、継続領域だけで PDE の等号 $\mathcal AV=0$ を課す[障害条件](#prop-u3-21-obstacle)と両立します。
<!-- solution-end -->

## 9. 到達点と次講

- 連続時間の American 価格は、$Q$ 下の**停止時刻にわたる割引期待値の上限**であり、未来を見てから行使日を選ぶ価格ではありません。
- 同一 GBM 上の Bermudan 行使日を密にすると価格は連続時間価格へ単調収束します。しかし CRR 木の $N$ を増やした価格は必ずしも単調ではありません。
- 最適停止の手続きは、割引 Snell 包絡が行使額へ初めて接触する時刻です。
- 無配当・非負金利 call は満期まで待ってよいのに対し、put では行使領域が現れ得ます。
- Black–Scholes PDE は継続領域での等号であり、行使領域では障害条件に置き換わります。自由境界の古典的正則性は別途確認が必要です。

次講 U3-22 では欧州型 Black–Scholes PDE を時間・株価格子に離散化し、陽解法と刻み幅の安定条件を検証します。その後 U3-24 で本講の障害条件を格子上の数値計算へ移します。
