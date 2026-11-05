# SLT1-03 有限仮説クラスの汎化界

<!-- definition-example-audit: strict -->

## 1. 固定した予測器の保証だけでは足りない

[PAC学習可能性](../SLT1-02/index.md#def-slt1-02-realizable-pac)は、未知の分布から標本を受け取った学習算法が、真のリスクを高確率で小さくできるかという問いだった。[経験リスク最小化（ERM）](../../ML/ML1-03/index.md#def-ml1-03-erm)は実行できても、選んだ予測器は標本に依存する。ここでは「**有限個の候補だけを、標本を見る前に固定する**」という制限が、なぜ汎化保証を生むのかを証明する。

初めに、二値0–1分類を例にする。入力集合を $\mathcal X=\{a,b\}$、真のラベルを常に0とし、$P(X=a)=3/4$、$P(X=b)=1/4$ とする。候補は常に0を返す $h_0$、$a$ で0・$b$ で1を返す $h_1$、常に1を返す $h_2$ の三つとする。[母集団リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)は

$$
R_P(h_0)=0,\qquad R_P(h_1)=\frac14,\qquad R_P(h_2)=1.
$$

長さ2の標本で入力が両方とも $a$ だった場合、三つの[経験リスク](../../ML/ML1-01/index.md#def-ml1-01-risks)は順に $0,0,1$。ERMが同点の $h_1$ を選ぶこともあり、訓練誤差0だけでは真の誤差0を意味しない。一方、候補が三つだけなら、各候補について経験リスクが真のリスクに近いという事象を、**同時に**保証できそうだ。

以後、非空有限集合 $\mathcal H$ の大きさを $M=|\mathcal H|\ge1$ とする。観測 $Z$ が値を取る可測空間を $\mathcal Z$、その未知の分布を $P$、$S=(Z_1,\ldots,Z_n)\sim P^n$（$n\ge1$、独立同分布）を訓練標本とする。クラス $\mathcal H$ と損失 $\ell(h,z)\in[0,1]$ は標本の抽選前に固定し、各 $h\in\mathcal H$ について $z\mapsto\ell(h,z)$ は可測とする。0–1損失だけでなく、値が $[0,1]$ に収まる別の損失も許す。リスクは

$$
R_P(h)=\mathbb E_{Z\sim P}\ell(h,Z),\qquad
\widehat R_S(h)=\frac1n\sum_{i=1}^n\ell(h,Z_i)
$$

と書く。$R_P(h)$ は未知だが固定された値、$\widehat R_S(h)$ は標本により変わる確率変数である。$\widehat h=A_n(S,U)\in\mathcal H$ と書く場合、$U$ は標本から独立な算法用乱数とする。決定的な算法では $U$ を省く。

## 2. 固定した一つの候補に Hoeffding 不等式を使う

まず標本を**見ずに**選んだ $h$ を一つだけ考える。各標本点での損失を $X_i=\ell(h,Z_i)$ と置くと、$X_1,\ldots,X_n$ は独立同分布、ほとんど確実に $0\le X_i\le1$ であり、$\mathbb E X_i=R_P(h)$ である。従って[HDP1の Hoeffding の両側不等式](../../../解析系/HDP/HDP1/index.md#cor-hdp1-two-sided)を使える。

<a id="thm-slt1-03-fixed-risk"></a>

<!-- formal-statement-start -->
> **定理（固定仮説のリスク偏差界）**
> 非空集合 $\mathcal H$、独立同分布標本 $S\sim P^n$、$[0,1]$ 値の可測損失 $\ell$、標本と独立に固定した $h\in\mathcal H$ を考える。任意の $n\ge1$ と $\varepsilon>0$ について

$$
P_S\bigl(|\widehat R_S(h)-R_P(h)|>\varepsilon\bigr)
\le 2e^{-2n\varepsilon^2}.
$$

> また各片側の偏差確率は $e^{-2n\varepsilon^2}$ 以下である。
<!-- formal-statement-end -->

### 証明の見取り図

損失を $X_i$ と読み替え、HDP1の各区間幅を $b_i-a_i=1$、偏差和の閾値を $t=n\varepsilon$ と置く。平均へ戻すと分母の $n$ が一つだけ残る。

<!-- proof-start -->
### 証明

$X_i=\ell(h,Z_i)$ と置く。$h$ は標本と独立に固定されているため、$Z_i$ の独立性から $X_i$ も独立であり、$\mathbb E X_i=R_P(h)$ である。$[0,1]$ 値なので [Hoeffdingの不等式](../../../解析系/HDP/HDP1/index.md#thm-hdp1-hoeffding) の区間を全て $[a_i,b_i]=[0,1]$ とすると、幅の二乗和は $V=\sum_i1=n$ になる。$t=n\varepsilon>0$ を代入すると

$$
\begin{aligned}
P_S(\widehat R_S(h)-R_P(h)\ge\varepsilon)
&=P_S\left(\sum_{i=1}^n(X_i-\mathbb E X_i)\ge n\varepsilon\right)\\
&\le\exp\left(-\frac{2(n\varepsilon)^2}{n}\right)
=e^{-2n\varepsilon^2}.
\end{aligned}
$$

同じ不等式を $-X_i\in[-1,0]$ に適用すると、$P_S(R_P(h)-\widehat R_S(h)\ge\varepsilon)\le e^{-2n\varepsilon^2}$ となる。絶対値偏差が $\varepsilon$ を超える事象は二つの片側偏差事象の和集合に含まれるため、[Hoeffdingの両側不等式](../../../解析系/HDP/HDP1/index.md#cor-hdp1-two-sided)と同じ合併上界で

$$
P_S(|\widehat R_S(h)-R_P(h)|>\varepsilon)
\le 2e^{-2n\varepsilon^2}
$$

を得る。右辺が1を超える場合も上界としては正しいが、そのとき有益な数値保証ではない。
<!-- proof-end -->

例えば $n=200$、$\varepsilon=0.1$ なら、固定した $h$ の両側偏差が $0.1$ を超える確率は高々 $2e^{-4}\approx0.0367$ である。この文の「固定」を消して $h=\widehat h(S)$ と代入することはできない。標本を見てから選んだ $\widehat h$ では $\ell(\widehat h(S),Z_1),\ldots,\ell(\widehat h(S),Z_n)$ が標本全体を通じて結び付くため、証明冒頭の独立性をそのまま使えないからだ。

## 3. 全候補を同時に守る

標本依存の選択に備え、個別の偏差保証を全候補に**先回りして**課す。候補が有限なら、失敗事象の合併を数えられる。

<a id="def-slt1-03-simultaneous-event"></a>

<!-- formal-statement-start -->
> **定義（有限クラスの同時偏差事象）**
> 空でない有限仮説クラス $\mathcal H$、分布 $P$、標本 $S\sim P^n$、有界損失 $\ell:\mathcal H\times\mathcal Z\to[0,1]$ と閾値 $\varepsilon>0$ に対し、全ての候補の経験リスクが母集団リスクから $\varepsilon$ 以内にある標本の集合を

$$
E_\varepsilon
=\bigcap_{h\in\mathcal H}
\left\{S:\bigl|\widehat R_S(h)-R_P(h)\bigr|\le\varepsilon\right\}
$$

> と定める。有限個の可測事象の共通部分なので $E_\varepsilon$ は可測である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-03-simultaneous-event -->
**定義の確認**。冒頭の三候補の例で $S=((a,0),(a,0))$ とし、$\varepsilon=0.3$ とする。母集団・経験リスクの組は $h_0$ で $(0,0)$、$h_1$ で $(1/4,0)$、$h_2$ で $(1,1)$ である。各差の絶対値は $0,1/4,0$ で全て $0.3$ 以下だから、この $S$ は $E_{0.3}$ に属する。一方、$\varepsilon=0.2$ では $h_1$ が条件を破るので $S\notin E_{0.2}$ である。一つでも破れば交差事象は成立しない。
<!-- definition-example-end -->

<a id="thm-slt1-03-finite-uniform"></a>

<!-- formal-statement-start -->
> **定理（有限仮説クラスの一様汎化界）**
> $M=|\mathcal H|\ge1$ の非空有限仮説クラスを標本の抽選前に固定し、$S=(Z_1,\ldots,Z_n)\sim P^n$ を独立同分布標本、$\ell:\mathcal H\times\mathcal Z\to[0,1]$ を各仮説について可測な損失とする。任意の $n\ge1$、$\varepsilon>0$ に対し

$$
P_S(E_\varepsilon^c)
=P_S\left(\max_{h\in\mathcal H}
|\widehat R_S(h)-R_P(h)|>\varepsilon\right)
\le 2M e^{-2n\varepsilon^2}.
$$

> 特に $\delta\in(0,1)$ に対し、$n\ge\log(2M/\delta)/(2\varepsilon^2)$ なら $P_S(E_\varepsilon)\ge1-\delta$ である。
<!-- formal-statement-end -->

### 証明の見取り図

「全候補が成功」の否定は「少なくとも一候補が失敗」である。候補ごとの[固定仮説の偏差界](#thm-slt1-03-fixed-risk)を合計するだけでよい。ただし独立な候補である必要はない。共通の標本から作った経験リスクが互いに従属していても、合併上界は使える。

<!-- proof-start -->
### 証明

各 $h\in\mathcal H$ の失敗事象を $B_h=\{S:|\widehat R_S(h)-R_P(h)|>\varepsilon\}$ と置く。定義の否定を取ると

$$
E_\varepsilon^c
=\left(\bigcap_{h\in\mathcal H}B_h^c\right)^c
=\bigcup_{h\in\mathcal H}B_h.
$$

$\mathcal H$ は標本抽選前に固定された有限集合なので、各 $B_h$ に[固定仮説の偏差界](#thm-slt1-03-fixed-risk)を適用できる。合併上界により

$$
\begin{aligned}
P_S(E_\varepsilon^c)
&\le\sum_{h\in\mathcal H}P_S(B_h)\\
&\le\sum_{h\in\mathcal H}2e^{-2n\varepsilon^2}\\
&=2M e^{-2n\varepsilon^2}.
\end{aligned}
$$

右辺を $\delta$ 以下にする十分条件は、指数・対数が単調なことから

$$
2M e^{-2n\varepsilon^2}\le\delta
\quad\Longleftrightarrow\quad
n\ge\frac{\log(2M/\delta)}{2\varepsilon^2}.
$$

従って補事象を取れば $P_S(E_\varepsilon)\ge1-\delta$ である。$n$ は整数なので実際の十分標本数は右辺の天井整数で与えられる。
<!-- proof-end -->

同じ式を $\varepsilon$ について解くと、任意の $\delta\in(0,1)$ に対し、確率 $1-\delta$ 以上で

$$
\max_{h\in\mathcal H}|\widehat R_S(h)-R_P(h)|
\le\sqrt{\frac{\log(2M/\delta)}{2n}}
$$

である。右辺が1を超えれば損失の範囲から得られる自明な界より弱いが、不等式はなお成立する。$n$ が増えると $n^{-1/2}$、候補数は $\sqrt{\log M}$ として効く。これは**候補を列挙する計算量**の評価ではなく、母集団リスクと経験リスクの差の評価である。

### 数値例：何個まで候補を比較できるか

$M=10$、$n=200$、$\delta=0.05$ を代入すると

$$
\varepsilon_{200}
=\sqrt{\frac{\log(2\cdot10/0.05)}{2\cdot200}}
=\sqrt{\frac{\log400}{400}}
\approx0.1224.
$$

従って標本を見る前に用意した10候補の**どの候補を後から選んでも**、経験リスクとの差は高確率で約0.1224以下になる。これは誤分類率が0.1224以下という意味ではない。例えばある候補の経験リスクが0.4なら、保証される母集団リスクの上界は約0.5224である。

## 4. 標本を見てから選んだERMにも届く理由

重要なのは[同時偏差事象](#def-slt1-03-simultaneous-event)が標本だけで定まっており、**どの候補を選ぶかを指定する前**に全候補について成立している点である。従ってERM以外の学習算法にも使える。

<a id="cor-slt1-03-selected-hypothesis"></a>

<!-- formal-statement-start -->
> **系（標本依存の有限クラス選択に対するリスク保証）**
> [有限仮説クラスの一様汎化界](#thm-slt1-03-finite-uniform)の全ての仮定を満たすとする。標本と独立な乱数 $U$ を使ってもよい任意の可測な算法 $A_n$ が $\widehat h=A_n(S,U)\in\mathcal H$ を返すとする。このとき任意の $\delta\in(0,1)$ について、$S,U$ に関して確率 $1-\delta$ 以上で

$$
R_P(\widehat h)
\le\widehat R_S(\widehat h)
+\sqrt{\frac{\log(2M/\delta)}{2n}}
$$

> が成立する。同じ確率事象の上で逆向きの偏差評価も成立する。
<!-- formal-statement-end -->

### 証明の見取り図

乱択の有無とは無関係に、全候補について同時に成り立つ不等式へ、算法が実際に返した一候補を代入する。固定仮説へ Hoeffding を「再適用」するわけではない。

<!-- proof-start -->
### 証明

$\varepsilon_n=\sqrt{\log(2M/\delta)/(2n)}$ とする。[有限仮説クラスの一様汎化界](#thm-slt1-03-finite-uniform)より $P_S(E_{\varepsilon_n})\ge1-\delta$ である。任意の $S\in E_{\varepsilon_n}$ に対し、**全ての** $h\in\mathcal H$ について

$$
-\varepsilon_n\le R_P(h)-\widehat R_S(h)\le\varepsilon_n
$$

が成立する。算法乱数の値 $U=u$ をどのように取っても $A_n(S,u)\in\mathcal H$ なので、上式に $h=A_n(S,u)$ を代入できる。よって $E_{\varepsilon_n}$ 上では $U$ の値に依存せず主張が成り立ち、$P_{S,U}(E_{\varepsilon_n})=P_S(E_{\varepsilon_n})\ge1-\delta$ が従う。
<!-- proof-end -->

この保証は**真のリスクと訓練リスクの差**であって、選んだERMがクラス内でどれだけ最良に近いかを直接は述べていない。[クラス内最良リスク](../SLT1-01/index.md#def-slt1-01-approximation)との差を保証するには、経験リスクを最小化した事実と同時偏差事象をさらに組み合わせる。次章でその論証を扱う。

### どうして固定仮説の評価を直接代入できないのか

入力が一つだけで $Y$ が独立な公平ビット、$\mathcal H=\{h_0\equiv0,h_1\equiv1\}$ とする。標本が一個なら、ERMは観測ラベルと同じ値を返す定数予測器を選び、必ず $\widehat R_S(\widehat h)=0$ となる。しかしどちらの候補も母集団リスクは $1/2$ なので、選択後のギャップは確率1で $1/2$ となる。

ここで各**固定** $h$ の期待経験リスクは $1/2$、選択後の経験リスクの期待値は0である。標本依存の最小化により分布が変わっている。なお、有限クラスの界はこの例と矛盾しない。$n=1$ で得る偏差上界は弱く、選択の効果を含んでいるからだ。

## 5. realizableなら「訓練誤差ゼロ」をより鋭く使える

ここまでは任意の $[0,1]$ 値損失を許す代わりに、標本数が概ね $\varepsilon^{-2}$ に比例した。二値0–1分類が[realizable](../SLT1-02/index.md#def-slt1-02-realizable)で、学習算法が標本の全ラベルと整合するなら、誤りを一度も観測しない確率を直接評価できる。この別証明では $\varepsilon^{-1}$ 型になる。

<a id="thm-slt1-03-consistent-fast"></a>

<!-- formal-statement-start -->
> **定理（有限realizableクラスの整合学習界）**
> 非空有限クラス $\mathcal H\subseteq\{h:\mathcal X\to\{0,1\}\}$、$M=|\mathcal H|$、二値0–1分類分布 $P$、独立同分布標本 $S=((X_i,Y_i))_{i=1}^n\sim P^n$ を考える。$\mathcal H$ にリスク0の仮説が存在し、算法が全標本で $\widehat R_S(\widehat h)=0$ を満たす $\widehat h=A_n(S,U)\in\mathcal H$ を返すとする（$U$ は標本と独立な算法用乱数で、決定的な場合は省く）。このとき任意の $\varepsilon\in(0,1)$ に対し

$$
P_{S,U}\bigl(R_P(\widehat h)>\varepsilon\bigr)
\le M(1-\varepsilon)^n
\le M e^{-n\varepsilon}.
$$

> 特に $\delta\in(0,1)$ に対して $n\ge\log(M/\delta)/\varepsilon$ なら、$P_{S,U}(R_P(\widehat h)\le\varepsilon)\ge1-\delta$ である。乱択同点選択でも同じ結論となる。
<!-- formal-statement-end -->

### 証明の見取り図

真のリスクが大きい一つの仮説が標本の全点で正解するには、独立な $n$ 回の観測で偶然一度も間違わない必要がある。これを候補全体で数える。realizable条件は、訓練誤差0の候補が常に少なくとも一つ存在するために使う。

<!-- proof-start -->
### 証明

[realizableな分類分布](../SLT1-02/index.md#def-slt1-02-realizable)の定義から、ある $h^*\in\mathcal H$ は $R_P(h^*)=0$ を満たす。0–1損失が非負なので、各標本点の誤分類確率は0となり、有限個の標本の全てで $\widehat R_S(h^*)=0$ が確率1で成立する。したがって整合仮説が確率1で存在する。

固定した $h$ の真の誤分類率を $r=R_P(h)$ と書く。各 $\boldsymbol{1}_{\{h(X_i)\ne Y_i\}}$ は独立なBernoulli確率変数で、1になる確率は $r$ である。よって

$$
P_S(\widehat R_S(h)=0)
=P_S\bigl(h(X_i)=Y_i\ (i=1,\ldots,n)\bigr)
=(1-r)^n.
$$

$r>\varepsilon$ なら $1-r<1-\varepsilon$ である。整合算法が $R_P(\widehat h)>\varepsilon$ の仮説を選ぶときは、「真のリスクが $\varepsilon$ より大きいのに経験リスク0」という候補が少なくとも一つ存在する。従って有限和の合併上界から

$$
\begin{aligned}
P_{S,U}(R_P(\widehat h)>\varepsilon)
&\le\sum_{h\in\mathcal H:\,R_P(h)>\varepsilon}
P_S(\widehat R_S(h)=0)\\
&=\sum_{h:\,R_P(h)>\varepsilon}(1-R_P(h))^n\\
&\le M(1-\varepsilon)^n\\
&\le M e^{-n\varepsilon}.
\end{aligned}
$$

最後の不等式は $1-x\le e^{-x}$ を $x=\varepsilon$ に適用したもの。これを $\delta$ 以下にする $n\ge\log(M/\delta)/\varepsilon$ を選べばよい。算法の同点選択に独立な乱数があっても、選ばれた悪い整合仮説は上記合併事象に必ず含まれるので結論は変わらない。
<!-- proof-end -->

$M=32$、$\varepsilon=0.1$、$\delta=0.05$ なら $\log(32/0.05)/0.1=10\log640\approx64.615$ で、65標本が十分である。同じ数値を一般の両側偏差界へ入れると $\log(2\cdot32/0.05)/(2\cdot0.1^2)\approx357.7$、したがって358標本が十分条件になる。前者が鋭いのは偶然ではなく、「**真の誤りがある候補が全標本を正解する**」という片側の特殊事象を直接数えたからである。

ただしrealizableでない分布では、経験リスク0の仮説が常に存在するとは限らない。例えば入力が一つで $Y$ が公平ビットなら、二つの定数仮説はいずれも母集団リスク $1/2$ であり、異なるラベルが標本に現れたとき整合候補は存在しない。一般のagnostic学習へ $\varepsilon^{-1}$ の界をそのまま持ち込むことはできない。

## 6. 有限クラスの保証が使えなくなる境目

上界の適用条件を整理する。

| 条件 | 証明中の役割 | 外すと起こること |
|---|---|---|
| 標本の独立同分布性 | 固定 $h$ の Hoeffding、および $(1-r)^n$ | 同じ観測を複製しただけでは誤差が集中しない |
| $[0,1]$ 有界損失 | Hoeffdingの幅を1に固定 | 無制限な二乗損失へ同じ定数を使えない |
| $\mathcal H$ を標本より前に固定 | 全候補への合併上界 | 選択後に「候補数1」と数えてはならない |
| $M<\infty$ | 失敗確率の有限和 | 無限クラスでは別の複雑度評価が必要 |
| realizable・経験リスク0 | $\varepsilon^{-1}$ 型の特別な界 | 一般のagnosticでは整合候補がない場合がある |

一つ目の反例を計算しよう。$Z_1$ を確率 $1/2$ で0または1とし、$Z_2=\cdots=Z_n=Z_1$ とする。固定した損失 $\ell(h,z)=z$ なら $R_P(h)=1/2$、$\widehat R_S(h)=Z_1$ なので

$$
P_S(|\widehat R_S(h)-R_P(h)|>0.4)=1
$$

が全ての $n$ で成立する。各周辺分布は同じでも独立ではない。独立標本用の指数界は成り立たない。

もう一つ、$X$ が区間 $[0,1]$ で密度1（それ以外で密度0）を持ち、$Y=0$ が常に成立するとする。標本を見た後で $h_S(x)=0$（$x$ が訓練入力のどれか）、それ以外は1と定めると、連続分布では有限個の訓練点の確率質量が0なので

$$
\widehat R_S(h_S)=0,\qquad R_P(h_S)=1
$$

が確率1で成立する。この場合「標本から作ったクラス $\{h_S\}$ は1個だから $M=1$」とは言えない。**固定クラスである**という仮定が失われ、失敗事象 $B_h$ の対象自体が標本ごとに変わってしまう。無限クラスでも汎化できる条件は、後のVC次元やRademacher複雑度で調べる。

## 演習

### SLT1-03-A01 固定仮説の数値保証
- Level: A
- 目安時間: 10分

$[0,1]$ 値損失と独立同分布の $n=50$ 標本を考える。標本と独立な固定仮説 $h$ に対し、経験リスクと母集団リスクの差の絶対値が $0.2$ を超える確率を[固定仮説の偏差界](#thm-slt1-03-fixed-risk)で評価せよ。

<!-- solution-start -->
#### 詳細解答

$X_i=\ell(h,Z_i)\in[0,1]$ は独立なので、[固定仮説の偏差界](#thm-slt1-03-fixed-risk)の $n=50$、$\varepsilon=0.2$ に代入して

$$
P_S(|\widehat R_S(h)-R_P(h)|>0.2)
\le2e^{-2\cdot50\cdot(0.2)^2}=2e^{-4}\approx0.03663.
$$

これは真のリスク自体の上界ではなく、二つのリスクの差についての確率上界である。
<!-- solution-end -->

### SLT1-03-A02 十候補の信頼半径
- Level: A
- 目安時間: 10分

標本前に固定した $M=10$ 個の予測器、$[0,1]$ 値損失、独立同分布 $n=200$ 標本を考える。失敗確率 $\delta=0.05$ の両側同時偏差半径を求めよ。

<!-- solution-start -->
#### 詳細解答

[有限仮説クラスの一様汎化界](#thm-slt1-03-finite-uniform)から

$$
\varepsilon=\sqrt{\frac{\log(2M/\delta)}{2n}}
=\sqrt{\frac{\log(400)}{400}}
\approx0.1224.
$$

$P_S(E_\varepsilon)\ge0.95$ であり、成功事象では10候補の全てで偏差がこの値以下となる。10候補のうちどれを後から選ぶかは、この成功事象を変えない。
<!-- solution-end -->

### SLT1-03-A03 同時偏差事象を判定する
- Level: A
- 目安時間: 10分

$\mathcal X=\{a,b\}$、$P(X=a)=3/4$、$P(X=b)=1/4$、ラベルは常に0とする。$h_0\equiv0$、$h_1(a)=0,h_1(b)=1$、$h_2\equiv1$、0–1損失で、標本 $S=((a,0),(a,0))$ が $E_{0.2}$ および $E_{0.3}$ に属するか判定せよ。

<!-- solution-start -->
#### 詳細解答

各 $h$ のリスク差は、$h_0$ で $|0-0|=0$、$h_1$ で $|0-1/4|=1/4$、$h_2$ で $|1-1|=0$ である。従って

$$
\max_{h\in\mathcal H}|\widehat R_S(h)-R_P(h)|=\frac14.
$$

[有限クラスの同時偏差事象](#def-slt1-03-simultaneous-event)の定義より、$1/4>0.2$ だから $S\notin E_{0.2}$、$1/4\le0.3$ だから $S\in E_{0.3}$ となる。
<!-- solution-end -->

### SLT1-03-A04 損失区間を変えた場合
- Level: A
- 目安時間: 10分

標本と独立な固定仮説 $h$ の損失が常に $[2,5]$ にあるとする。独立同分布 $n$ 標本に対し、$P_S(|\widehat R_S(h)-R_P(h)|>\varepsilon)$ をHoeffdingの両側不等式で上から抑えよ。

<!-- solution-start -->
#### 詳細解答

各 $X_i=\ell(h,Z_i)$ は $[2,5]$ にあり、区間幅は $5-2=3$、幅の二乗和は $V=9n$ である。[Hoeffdingの両側不等式](../../../解析系/HDP/HDP1/index.md#cor-hdp1-two-sided)へ $t=n\varepsilon$ を代入して

$$
P_S(|\widehat R_S(h)-R_P(h)|>\varepsilon)
\le2\exp\left(-\frac{2(n\varepsilon)^2}{9n}\right)
=2e^{-2n\varepsilon^2/9}.
$$

$[0,1]$ の式をそのまま使うと幅の二乗9を落としてしまう。
<!-- solution-end -->

### SLT1-03-A05 選択後の経験リスク
- Level: A
- 目安時間: 10分

入力が一点のみ、$Y$ は公平な二値ラベル、候補は定数0と定数1の二つ、0–1損失とする。長さ1の標本でERMが標本のラベルを返すとき、$\widehat R_S(\widehat h)$ と $R_P(\widehat h)$、およびそれらの期待値を計算せよ。

<!-- solution-start -->
#### 詳細解答

標本ラベルが0なら $\widehat h=h_0$、1なら $\widehat h=h_1$ である。どちらも観測した一点のラベルに一致するから、$\widehat R_S(\widehat h)=0$ が確率1である。どちらの定数予測器も真のラベルと確率 $1/2$ で不一致なので $R_P(\widehat h)=1/2$ が確率1である。従って

$$
\mathbb E_S\widehat R_S(\widehat h)=0,
\qquad \mathbb E_S R_P(\widehat h)=\frac12.
$$

一方、事前に固定した $h_0$ なら $\mathbb E_S\widehat R_S(h_0)=R_P(h_0)=1/2$ である。標本依存の選択により期待経験リスクが下がることが分かる。
<!-- solution-end -->

### SLT1-03-B01 片側保証で定数を節約する
- Level: B
- 目安時間: 20分

非空有限クラス $\mathcal H$（$|\mathcal H|=M$）、独立同分布標本 $S\sim P^n$、$[0,1]$ 値損失を考える。全候補について $R_P(h)\le\widehat R_S(h)+\varepsilon$ を同時に保証する失敗確率上界を求め、$\delta\in(0,1)$ の必要十分ではない十分標本数を導け。任意の標本依存選択 $\widehat h\in\mathcal H$ への適用も説明せよ。

<!-- solution-start -->
#### 詳細解答

固定した $h$ について[固定仮説の片側偏差界](#thm-slt1-03-fixed-risk)は $P_S(R_P(h)-\widehat R_S(h)>\varepsilon)\le e^{-2n\varepsilon^2}$。全候補の失敗事象の合併上界を取ると

$$
P_S\bigl(\exists h\in\mathcal H:\ R_P(h)>\widehat R_S(h)+\varepsilon\bigr)
\le M e^{-2n\varepsilon^2}.
$$

これを $\delta$ 以下とする十分条件は

$$
n\ge\frac{\log(M/\delta)}{2\varepsilon^2}.
$$

この成功事象では全候補に上界が成り立つ。したがって標本依存（あるいは独立乱数による）選択 $\widehat h$ を後から代入しても同じ上界が成立する。両側保証で必要な係数2は片側しか求めない今回は不要である。
<!-- solution-end -->

### SLT1-03-B02 整合学習の標本数
- Level: B
- 目安時間: 20分

二値0–1分類のrealizableな有限クラスの大きさを $M=32$ とする。独立同分布標本と整合する仮説を返す算法について、$\varepsilon=0.1$、$\delta=0.05$ の保証に十分な標本数を[整合学習界](#thm-slt1-03-consistent-fast)で求めよ。同じ $M,\varepsilon,\delta$ で一般の両側一様偏差界を使う場合と比較せよ。

<!-- solution-start -->
#### 詳細解答

realizable条件からリスク0の候補は経験リスク0となり、整合算法は存在する。[有限realizableクラスの整合学習界](#thm-slt1-03-consistent-fast)による十分条件は

$$
n\ge\frac{\log(M/\delta)}{\varepsilon}
=\frac{\log(32/0.05)}{0.1}
=10\log640\approx64.615.
$$

整数標本数は $n=65$ で十分。一般の[両側同時偏差界](#thm-slt1-03-finite-uniform)なら

$$
n\ge\frac{\log(2M/\delta)}{2\varepsilon^2}
=50\log1280\approx357.745,
$$

なので $n=358$ が十分条件となる。前者は整合仮説の存在を使い、後者はrealizableを使わず、全候補の両側偏差を要求しているため、この比較で保証の強さを同一視しない。
<!-- solution-end -->

### SLT1-03-B03 独立性を外す反例
- Level: B
- 目安時間: 20分

$Z_1$ は確率 $1/2$ ずつ0または1を取り、$n\ge3$ について $Z_2=\cdots=Z_n=Z_1$ とする。固定仮説の損失を $\ell(h,z)=z$ とする。$\varepsilon=0.4$ での偏差確率を計算し、独立標本用Hoeffding上界を誤って適用したときの矛盾を示せ。

<!-- solution-start -->
#### 詳細解答

各変数の周辺分布は公平な二点分布であるが、全て $Z_1$ に等しいため独立でない。母集団リスクは $R_P(h)=\mathbb EZ_1=1/2$、経験リスクは $\widehat R_S(h)=n^{-1}(nZ_1)=Z_1$。従って偏差の絶対値は確率1で $1/2$ なので

$$
P_S(|\widehat R_S(h)-R_P(h)|>0.4)=1.
$$

誤って[固定仮説の偏差界](#thm-slt1-03-fixed-risk)を適用すると $2e^{-0.32n}$ が上界になるはずだが、$n=3$ ですでに $2e^{-0.96}<1$ となり矛盾する。破れた条件は独立性であり、標本数が増えても実際には新しい情報が増えていない。
<!-- solution-end -->

### SLT1-03-B04 データ依存の候補集合
- Level: B
- 目安時間: 20分

$X$ は $[0,1]$ で確率密度1（それ以外は0）、$Y=0$、0–1損失とし、独立同分布標本の入力を $X_1,\ldots,X_n$ とする。標本を見た後で $h_S(x)=0$（$x\in\{X_1,\ldots,X_n\}$ の場合）、それ以外で1と定め、候補集合を $\mathcal H_S=\{h_S\}$ とする。経験リスク・母集団リスクを求め、$|\mathcal H_S|=1$ を有限クラス定理の $M$ に代入できない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

各訓練入力 $X_i$ は集合 $\{X_1,\ldots,X_n\}$ に含まれるため、予測 $h_S(X_i)=0=Y_i$ であり、$\widehat R_S(h_S)=0$ である。独立なテスト入力 $X'$ は密度が有界な連続分布なので、固定された有限集合 $\{X_1,\ldots,X_n\}$ に入る条件付き確率は0。従って $P(h_S(X')=1\mid S)=1$ であり

$$
R_P(h_S)=1\qquad\text{（確率1）}.
$$

[有限仮説クラスの一様汎化界](#thm-slt1-03-finite-uniform)では、全候補 $h$ を抽選**前**に列挙し、各固定 $h$ の失敗確率へHoeffdingを適用してから合計する。$\mathcal H_S$ は標本ごとに変化し、固定した一候補の確率評価ができないため、集合の観測後の大きさ1を $M$ に代入してはならない。
<!-- solution-end -->

### SLT1-03-C01 二種類の保証を一つの学習問題で使い分ける
- Level: C
- 目安時間: 35分

標本を見る前に有限の二値分類クラス $\mathcal H$（大きさ $M\ge2$）を固定し、0–1損失を使う。$S\sim P^n$ は独立同分布とする。

1. 一般の分布 $P$ について、任意の（乱択でもよい）$\widehat h\in\mathcal H$ に対し、確率 $1-\delta$ 以上で成り立つ経験リスクからの上側信頼界を証明せよ。
2. $P$ が $\mathcal H$ に関してrealizableで、$\widehat h$ が経験リスク0を達成するとき、標本と算法用乱数に関する失敗確率 $P_{S,U}(R_P(\widehat h)>\varepsilon)$ の改善された上界を一から証明せよ。
3. $M=16,\varepsilon=0.1,\delta=0.05$ に対する両者の十分標本数を計算し、それぞれが保証する事象を区別せよ。
4. 入力が一点だけでラベルが公平ビット、$\mathcal H=\{h_0\equiv0,h_1\equiv1\}$ の場合、2の証明のどの前提が破れるか説明せよ。

<!-- solution-start -->
#### 詳細解答

**1.** 固定した $h$ の0–1損失は独立な $[0,1]$ 値確率変数なので、[片側Hoeffding界](#thm-slt1-03-fixed-risk)から $P_S(R_P(h)-\widehat R_S(h)>t)\le e^{-2nt^2}$。$M$ 個を合併して

$$
P_S\bigl(\exists h\in\mathcal H:\ R_P(h)>\widehat R_S(h)+t\bigr)
\le M e^{-2nt^2}.
$$

$t=\sqrt{\log(M/\delta)/(2n)}$ とすると右辺は $\delta$ になる。補事象では全ての候補で不等式が成立するから、標本依存の $\widehat h$ にも代入でき、確率 $1-\delta$ 以上で

$$
R_P(\widehat h)
\le\widehat R_S(\widehat h)+\sqrt{\frac{\log(M/\delta)}{2n}}
$$

を得る。乱択の値を固定しても成功事象は同じなので保証は変わらない。

**2.** realizableであるため、リスク0の $h^*$ が存在する。独立な標本上で $h^*$ は必ず正解し、経験リスク0の候補は存在する。真のリスクが $r_h>\varepsilon$ の固定候補が全標本に正解する確率は、独立性により $(1-r_h)^n\le(1-\varepsilon)^n$。悪い整合候補を選ぶ事象はそのような候補の存在に含まれるので

$$
\begin{aligned}
P_{S,U}(R_P(\widehat h)>\varepsilon)
&\le\sum_{h:\,r_h>\varepsilon}P_S(\widehat R_S(h)=0)\\
&\le M(1-\varepsilon)^n\\
&\le M e^{-n\varepsilon}.
\end{aligned}
$$

**3.** 1の半径を $\varepsilon$ 以下にするには $n\ge\log(M/\delta)/(2\varepsilon^2)$ であり

$$
n\ge\frac{\log(16/0.05)}{0.02}
=50\log320\approx288.416,
$$

ゆえに $n=289$ が十分。これは全候補の**上側**偏差を一律に抑える保証であり、経験リスクが0とは限らない。2の整合学習界は

$$
n\ge\frac{\log(16/0.05)}{0.1}
=10\log320\approx57.683,
$$

ゆえに $n=58$ が十分。こちらは経験リスク0の仮説を選ぶという条件の下で、**真のリスクそのもの**が $0.1$ 以下となる保証である。二つの十分条件は達成可能な最小標本数を主張しない。

**4.** 二つの定数仮説の真のリスクはいずれも $1/2$ であり、リスク0の仮説は存在しない。例えば標本にラベル0と1がともに現れた場合、どちらの定数仮説も経験リスクが正となり、整合候補が存在しない。[realizableの定義](../SLT1-02/index.md#def-slt1-02-realizable)の仮定が破れているので、2の「常に経験リスク0の候補がある」という出発点が使えない。一般の上側信頼界1は適用できる。
<!-- solution-end -->

## まとめと次章への橋

固定仮説の偏差界から標本依存の予測器を評価するには、候補全体で先に成功する**同時事象**を作る必要があった。有限クラスなら失敗確率の合併上界でそれができ、候補数に対して対数的な標本数の増加で済む。realizableな整合学習では、誤りの大きい仮説が一度も誤らない確率を直接数え、より速い $\varepsilon^{-1}$ 型の保証を得た。

ただし、一般の分布で「ERMのリスクはクラス内最良にどれだけ近いか」という問いはまだ残っている。次のSLT1-04では、同時偏差を[クラス内最良リスク](../SLT1-01/index.md#def-slt1-01-approximation)とERMの比較へ変換し、汎化差と超過リスクの違いを定量化する。
