# E2-04 ブラウン運動・拡散極限

ランダムウォークでは時間も位置も離散的でした。ところが、粒子の熱運動、微小な測定誤差の累積、連続時間で変動するノイズなどを考えると、「非常に短い時間ごとに非常に小さな独立変動が積み重なる」極限を扱いたくなります。その代表が **ブラウン運動（Brownian motion, Wiener process）** です。

本章では [E2-02 ポアソン過程・ランダムウォーク](../E2_02_poisson過程_ランダムウォーク/index.md) を出発点として、ブラウン運動を **ランダムウォークの拡散極限** として理解します。定義を暗記して終わるのではなく、独立正規増分から平均・分散・共分散を導き、反射原理、最大値、初到達時刻までをつなげます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md) に従います。

## この章で解けるようになる問題

- 標準ブラウン運動の定義を、4つの条件に分けて説明できる。
- 独立増分から $B(t)-B(s)\sim N(0,t-s)$ を使い、平均・分散・共分散を導ける。
- $\operatorname{Cov}(B(s),B(t))=\min(s,t)$ を公式暗記ではなく導出できる。
- 複数時点のブラウン運動が多変量正規分布になることを使える。
- ランダムウォークを時間・空間方向に縮尺変換するとブラウン運動へ近づく理由を説明できる。
- ブラウン運動の自己相似性 $B(ct)\overset{d}=\sqrt c\,B(t)$ を説明できる。
- 反射原理から最大値分布と初到達時刻分布を導ける。
- ドリフト付きブラウン運動 $X(t)=\mu t+\sigma B(t)$ の平均・分散・増分分布を求められる。

## 公式出題範囲との対応

統計検定1級「統計応用」では、各応用分野に共通した事項の「確率過程」に **ブラウン運動** が明記されています。本章はその項目を直接担当します。

| 出題範囲 | 本章の内容 |
|---|---|
| ブラウン運動 | 定義、独立定常正規増分、連続経路 |
| ランダムウォーク | 拡散スケーリング、ブラウン運動への極限 |
| 多変量正規分布 | 複数時点の同時分布、共分散行列 |
| 確率過程 | Markov性、遷移分布、初到達問題 |

## 前提知識チェック

1. E2-02: 単純ランダムウォーク、独立増分、到達問題。
2. P3-02: 正規分布。
3. P3-03: 多変量正規分布、条件付き正規分布、共分散行列。
4. P4-02: 中心極限定理。

---

## 1. 離散ランダムウォークから何を極限にするのか

対称単純ランダムウォーク

$$
S_n=X_1+\cdots+X_n,
\qquad
P(X_k=1)=P(X_k=-1)=\frac12
$$

を考えます。

1歩の平均と分散は

$$
E[X_k]=0,
\qquad
\operatorname{Var}(X_k)=1.
$$

したがって

$$
E[S_n]=0,
\qquad
\operatorname{Var}(S_n)=n.
$$

ここで重要なのは、典型的な大きさが $n$ ではなく $\sqrt n$ だという点です。標準偏差が $\sqrt n$ だからです。

そこで時間 $t$ に対して、$nt$ 歩程度進んだ位置を $\sqrt n$ で割った

$$
W_n(t)=\frac{S_{\lfloor nt\rfloor}}{\sqrt n}
$$

を考えます。

固定した $t$ について

$$
E[W_n(t)]=0,
$$

$$
\operatorname{Var}(W_n(t))
=\frac{\lfloor nt\rfloor}{n}
\longrightarrow t.
$$

さらに中心極限定理から

$$
W_n(t)
\Rightarrow N(0,t).
$$

つまり、時間を $n$ 倍細かくし、空間を $\sqrt n$ で縮めると、時刻 $t$ の位置は分散 $t$ の正規分布に近づきます。

この「時間は $n$、空間は $\sqrt n$」という縮尺が **拡散スケーリング** です。

> ブラウン運動は、ランダムウォークを極端に細かくしたときに現れる連続時間版、と考えると全体像が掴みやすくなります。

厳密には、各固定時点での収束だけでなく「経路全体」の収束を示す関数型中心極限定理（Donskerの定理）が必要です。本章では定理の証明は要求せず、統計検定1級で必要な使い方と意味を扱います。

---

## 2. 標準ブラウン運動の定義

確率過程 $\{B(t):t\ge0\}$ が **標準ブラウン運動** であるとは、次を満たすことをいいます。

1. 初期値
   $$
   B(0)=0\qquad\text{a.s.}
   $$
2. 独立増分：$0\le t_0<t_1<\cdots<t_m$ に対して
   $$
   B(t_1)-B(t_0),\ldots,B(t_m)-B(t_{m-1})
   $$
   が互いに独立。
3. 正規定常増分：$0\le s<t$ に対して
   $$
   B(t)-B(s)\sim N(0,t-s).
   $$
4. 経路の連続性：確率1で $t\mapsto B(t)$ は連続。

### 2.1 「定常増分」と「定常過程」は違う

$B(t)-B(s)$ の分布は $s,t$ そのものではなく差 $t-s$ だけで決まります。これが **定常増分** です。

一方、

$$
B(t)\sim N(0,t)
$$

なので、$B(t)$ 自体の分布は $t$ に依存します。したがってブラウン運動そのものは定常過程ではありません。

ここは時系列の定常性と混同しやすい点です。

---

## 3. 平均・分散・共分散を定義から導く

$B(0)=0$ と増分分布から

$$
B(t)=B(t)-B(0)\sim N(0,t).
$$

したがって

$$
\boxed{E[B(t)]=0},
\qquad
\boxed{\operatorname{Var}(B(t))=t}.
$$

### 3.1 共分散 $\min(s,t)$ の導出

$0\le s\le t$ とします。

$$
B(t)=B(s)+\{B(t)-B(s)\}.
$$

独立増分より $B(s)$ と $B(t)-B(s)$ は独立なので共分散は0です。よって

$$
\begin{aligned}
\operatorname{Cov}(B(s),B(t))
&=\operatorname{Cov}\left(B(s),B(s)+B(t)-B(s)\right)\\
&=\operatorname{Var}(B(s))
+\operatorname{Cov}(B(s),B(t)-B(s))\\
&=s.
\end{aligned}
$$

$s>t$ の場合は対称性から $t$ です。したがって

$$
\boxed{
\operatorname{Cov}(B(s),B(t))=\min(s,t)
}.
$$

この公式は暗記するより、

> 「早い時刻までの部分 $B(s)$ を両方が共有し、その後の増分は独立」

と理解する方が安全です。

### 3.2 相関係数

$s\le t$ なら

$$
\operatorname{Corr}(B(s),B(t))
=\frac{s}{\sqrt{s}\sqrt{t}}
=\sqrt{\frac{s}{t}}.
$$

時刻が離れるほど相関は弱くなりますが、0にはなりません。一方、**重ならない時間区間の増分** は独立です。

---

## 4. 複数時点をまとめると多変量正規分布

$0<t_1<\cdots<t_m$ とします。

独立な増分を

$$
Y_1=B(t_1),
$$

$$
Y_j=B(t_j)-B(t_{j-1})\quad(j\ge2)
$$

と置くと、$Y_1,\ldots,Y_m$ は独立正規分布です。

各 $B(t_j)$ は $Y_1,\ldots,Y_j$ の線形結合なので、

$$
(B(t_1),\ldots,B(t_m))^{\mathsf T}
$$

は多変量正規分布に従います。

平均は0、共分散行列の $(i,j)$ 成分は

$$
\Sigma_{ij}=\min(t_i,t_j)
$$

です。

例えば $t_1=1,t_2=2,t_3=4$ なら

$$
\begin{pmatrix}
B(1)\\B(2)\\B(4)
\end{pmatrix}
\sim
N_3\left(
\begin{pmatrix}0\\0\\0\end{pmatrix},
\begin{pmatrix}
1&1&1\\
1&2&2\\
1&2&4
\end{pmatrix}
\right).
$$

これにより、ブラウン運動の条件付き分布は P3-03 の多変量正規分布の公式で計算できます。

---

## 5. 条件付き分布：未来は現在＋独立増分

$s<t$ とします。

ブラウン運動は

$$
B(t)=B(s)+\{B(t)-B(s)\}
$$

と分解でき、増分は $B(s)$ と独立で

$$
B(t)-B(s)\sim N(0,t-s).
$$

したがって $B(s)=x$ が与えられたとき

$$
\boxed{
B(t)\mid B(s)=x
\sim N(x,t-s)
}.
$$

よって

$$
E[B(t)\mid B(s)]=B(s),
$$

$$
\operatorname{Var}(B(t)\mid B(s))=t-s.
$$

未来の分布は、過去の経路全体ではなく現在値 $B(s)$ だけで決まります。これはブラウン運動が Markov 過程であることの具体例です。

---

## 6. 遷移密度

時刻 $s$ で $B(s)=x$ と分かっているとき、$t>s$ の $B(t)$ は $N(x,t-s)$ です。したがって遷移密度は

$$
\boxed{
p_{t-s}(x,y)
=\frac{1}{\sqrt{2\pi(t-s)}}
\exp\left\{-\frac{(y-x)^2}{2(t-s)}\right\}
}.
$$

この形は「現在位置 $x$ を中心に、経過時間に比例して分散が広がる」ことを表しています。

物理でいう拡散方程式の基本解と同じガウス核が現れます。ブラウン運動と拡散方程式が表裏一体なのは偶然ではありません。

---

## 7. 自己相似性

$c>0$ とします。過程

$$
X(t)=\frac{B(ct)}{\sqrt c}
$$

を考えます。

増分は

$$
X(t)-X(s)
=\frac{B(ct)-B(cs)}{\sqrt c}.
$$

分子は

$$
B(ct)-B(cs)\sim N(0,c(t-s))
$$

なので

$$
X(t)-X(s)\sim N(0,t-s).
$$

独立増分と連続性も保たれるため、$X$ も標準ブラウン運動です。

したがって過程として

$$
\boxed{
\{B(ct):t\ge0\}
\overset{d}=
\{\sqrt c\,B(t):t\ge0\}
}
$$

です。

特に固定時刻なら

$$
B(ct)\overset{d}=\sqrt c\,B(t).
$$

これはランダムウォークで「時間 $n$ に対して空間 $\sqrt n$」だった拡散スケーリングと一致します。

---

## 8. 反射原理

ここからブラウン運動特有の到達問題を扱います。

$a>0$ とし、最大値

$$
M_T=\max_{0\le t\le T}B(t)
$$

を考えます。

求めたいのは

$$
P(M_T\ge a),
$$

つまり「時刻 $T$ までに水準 $a$ に一度でも到達する確率」です。

### 8.1 最初の到達時刻で経路を反射する

初到達時刻を

$$
\tau_a=\inf\{t\ge0:B(t)=a\}
$$

とします。

$\tau_a\le T$ を満たし、しかも終点 $B(T)<a$ である経路を考えます。$\tau_a$ より後だけを水準 $a$ に関して鏡映し、

$$
\widetilde B(t)=
\begin{cases}
B(t),&t\le\tau_a,\\
2a-B(t),&t>\tau_a
\end{cases}
$$

とします。

到達後の増分は0を中心とする正規分布で左右対称なので、符号を反転しても分布は変わりません。この対応により

$$
\{M_T\ge a,\ B(T)<a\}
$$

の経路と

$$
\{B(T)>a\}
$$

の経路が同じ確率を持ちます。

したがって

$$
\begin{aligned}
P(M_T\ge a)
&=P(B(T)\ge a)
+P(M_T\ge a,B(T)<a)\\
&=P(B(T)\ge a)+P(B(T)>a).
\end{aligned}
$$

連続分布なので $P(B(T)=a)=0$ であり、

$$
\boxed{
P(M_T\ge a)=2P(B(T)\ge a)
}.
$$

これが **反射原理** です。

### 8.2 最大値分布

$B(T)\sim N(0,T)$ なので

$$
P(B(T)\ge a)
=1-\Phi\left(\frac{a}{\sqrt T}\right).
$$

よって

$$
\boxed{
P(M_T\ge a)
=2\left\{1-\Phi\left(\frac{a}{\sqrt T}\right)\right\}
}.
$$

したがって $a\ge0$ に対して

$$
P(M_T\le a)
=2\Phi\left(\frac{a}{\sqrt T}\right)-1.
$$

特に

$$
M_T\overset{d}=|B(T)|
$$

です。ただし、これは **各 $T$ を固定したときの分布が同じ** という意味で、経路として $M_t=|B(t)|$ という意味ではありません。

---

## 9. 初到達時刻

経路が連続なので、$a>0$ について

$$
\{\tau_a\le T\}=\{M_T\ge a\}.
$$

したがって

$$
\boxed{
P(\tau_a\le T)
=2\left\{1-\Phi\left(\frac{a}{\sqrt T}\right)\right\}
}.
$$

これは $\tau_a$ の累積分布関数です。

### 9.1 密度

$T>0$ で微分すると

$$
\boxed{
f_{\tau_a}(T)
=\frac{a}{\sqrt{2\pi T^3}}
\exp\left(-\frac{a^2}{2T}\right)
}.
$$

この分布は右裾が非常に重く、標準ブラウン運動では

$$
E[\tau_a]=\infty
$$

です。

「ほぼ確実にいつか到達する」ことと「平均到達時間が有限」は別問題です。

実際、$T\to\infty$ とすると

$$
P(\tau_a\le T)\to1,
$$

なので

$$
P(\tau_a<\infty)=1.
$$

---

## 10. ドリフト付き・尺度付きブラウン運動

実際の理工系モデルでは

$$
X(t)=x_0+\mu t+\sigma B(t),
\qquad \sigma>0
$$

をよく使います。

$0\le s<t$ なら

$$
X(t)-X(s)
=\mu(t-s)+\sigma\{B(t)-B(s)\}.
$$

したがって

$$
\boxed{
X(t)-X(s)
\sim N\left(\mu(t-s),\sigma^2(t-s)\right)
}.
$$

また

$$
E[X(t)]=x_0+\mu t,
$$

$$
\operatorname{Var}(X(t))=\sigma^2t,
$$

$$
\operatorname{Cov}(X(s),X(t))
=\sigma^2\min(s,t).
$$

$\mu$ は平均的な傾向、$\sigma^2$ は単位時間あたりの拡散の強さを表します。

---

## 11. ブラウン運動で頻出する混同

### 11.1 $B(t)$ と増分を混同しない

$$
B(t)\sim N(0,t)
$$

ですが

$$
B(t)-B(s)\sim N(0,t-s).
$$

分散は「終点時刻」ではなく「区間長」です。

### 11.2 値は相関しているが、非重複増分は独立

例えば $B(1)$ と $B(2)$ は

$$
\operatorname{Cov}(B(1),B(2))=1
$$

なので独立ではありません。

一方、

$$
B(1)-B(0),\qquad B(3)-B(2)
$$

は非重複区間の増分なので独立です。

### 11.3 連続だが滑らかではない

ブラウン運動の標本経路は連続ですが、通常の意味ではほとんど至る所で微分可能、というような滑らかな曲線ではありません。統計検定1級ではこの厳密証明は不要ですが、

> 連続経路 = なめらかな経路

ではないことは押さえておきます。

---

# 演習

各問題は、まず自力で答案を作ってから解答を開いてください。

## Level A

### E2-04-A01 基本モーメント

標準ブラウン運動 $B(t)$ について、$0\le s\le t$ とする。

1. $E[B(t)]$ と $\operatorname{Var}(B(t))$ を求めよ。
2. $\operatorname{Cov}(B(s),B(t))$ を独立増分から導け。
3. $\operatorname{Corr}(B(s),B(t))$ を求めよ。

<details>
<summary>解答</summary>

$B(t)\sim N(0,t)$ より

$$
E[B(t)]=0,
\qquad
\operatorname{Var}(B(t))=t.
$$

また

$$
B(t)=B(s)+\{B(t)-B(s)\}
$$

で、$B(s)$ と増分は独立だから

$$
\operatorname{Cov}(B(s),B(t))
=\operatorname{Var}(B(s))=s.
$$

したがって

$$
\boxed{\operatorname{Cov}(B(s),B(t))=\min(s,t)}.
$$

$s\le t$ では

$$
\boxed{
\operatorname{Corr}(B(s),B(t))
=\sqrt{\frac{s}{t}}
}.
$$

**本番答案**: $B(t)=B(s)+[B(t)-B(s)]$ と分解し、独立増分により交差共分散が0であることを書く。

**採点基準（20点）**: 平均・分散4点、分解4点、独立増分4点、共分散4点、相関4点。

</details>

### E2-04-A02 増分の分布

標準ブラウン運動について

$$
Y=B(5)-B(2)
$$

の分布と $P(Y\le y)$ を $\Phi$ で表せ。

<details>
<summary>解答</summary>

増分の長さは3なので

$$
Y\sim N(0,3).
$$

したがって

$$
\boxed{
P(Y\le y)=\Phi\left(\frac{y}{\sqrt3}\right)
}.
$$

**本番答案**: 「分散は $5-2=3$」を明記する。

**採点基準（20点）**: 増分分布10点、標準化10点。

</details>

### E2-04-A03 条件付き未来分布

$B(2)=1$ が分かっているときの $B(5)$ の条件付き分布を求めよ。

<details>
<summary>解答</summary>

$$
B(5)=B(2)+\{B(5)-B(2)\}
$$

で、増分は $B(2)$ と独立かつ $N(0,3)$。したがって

$$
\boxed{B(5)\mid B(2)=1\sim N(1,3)}.
$$

**本番答案**: Markov性を公式として書くより、現在値＋独立増分に分解する方が短く確実。

**採点基準（20点）**: 分解8点、独立性4点、平均4点、分散4点。

</details>

### E2-04-A04 ドリフト付きブラウン運動

$$
X(t)=3+2t+4B(t)
$$

について $E[X(5)]$, $\operatorname{Var}(X(5))$, $X(5)-X(2)$ の分布を求めよ。

<details>
<summary>解答</summary>

$$
E[X(5)]=3+2\cdot5=13,
$$

$$
\operatorname{Var}(X(5))=4^2\cdot5=80.
$$

また

$$
X(5)-X(2)=2(5-2)+4\{B(5)-B(2)\},
$$

よって

$$
\boxed{X(5)-X(2)\sim N(6,48)}.
$$

**採点基準（20点）**: 平均5点、分散5点、増分平均5点、増分分散5点。

</details>

## Level B

### E2-04-B01 3時点の同時分布

$$
\boldsymbol X=(B(1),B(2),B(4))^{\mathsf T}
$$

の平均ベクトルと分散共分散行列を求めよ。

<details>
<summary>解答</summary>

平均は0。共分散は $\min(s,t)$ なので

$$
\boxed{
\boldsymbol X\sim
N_3\left(
\boldsymbol 0,
\begin{pmatrix}
1&1&1\\
1&2&2\\
1&2&4
\end{pmatrix}
\right)
}.
$$

**採点基準（20点）**: 多変量正規性8点、対角4点、非対角8点。

</details>

### E2-04-B02 線形結合

$$
Z=2B(1)-B(3)
$$

の分布を求めよ。

<details>
<summary>解答</summary>

平均は0。分散は

$$
\begin{aligned}
\operatorname{Var}(Z)
&=4\operatorname{Var}(B(1))
+\operatorname{Var}(B(3))
-4\operatorname{Cov}(B(1),B(3))\\
&=4+3-4=3.
\end{aligned}
$$

多変量正規ベクトルの線形結合なので

$$
\boxed{Z\sim N(0,3)}.
$$

**採点基準（20点）**: 正規性5点、分散式8点、共分散3点、結論4点。

</details>

### E2-04-B03 自己相似性

$X(t)=B(9t)/3$ とする。$X$ が標準ブラウン運動と同じ有限次元分布を持つことを説明せよ。

<details>
<summary>解答</summary>

$0\le s<t$ に対して

$$
X(t)-X(s)
=\frac{B(9t)-B(9s)}3.
$$

分子は $N(0,9(t-s))$ だから

$$
X(t)-X(s)\sim N(0,t-s).
$$

独立増分も保たれ、$X(0)=0$。したがって標準ブラウン運動と同じ分布構造を持つ。

$$
\boxed{B(9t)\overset{d}=3B(t)}.
$$

**採点基準（20点）**: 増分5点、分散変換7点、独立性4点、結論4点。

</details>

### E2-04-B04 拡散スケーリング

対称単純ランダムウォーク $S_n$ について

$$
W_n(t)=\frac{S_{\lfloor nt\rfloor}}{\sqrt n}
$$

とする。固定した $t$ について $E[W_n(t)]$ と $\operatorname{Var}(W_n(t))$ を求め、極限を述べよ。

<details>
<summary>解答</summary>

$$
E[W_n(t)]=0.
$$

また

$$
\operatorname{Var}(W_n(t))
=\frac{\lfloor nt\rfloor}{n}
\to t.
$$

中心極限定理により固定 $t$ では

$$
W_n(t)\Rightarrow N(0,t).
$$

これはブラウン運動の $B(t)\sim N(0,t)$ と一致する。

**採点基準（20点）**: 平均4点、分散8点、極限4点、ブラウン運動との対応4点。

</details>

## Level C

### E2-04-C01 反射原理と最大値

標準ブラウン運動について $a>0,T>0$ とし

$$
M_T=\max_{0\le t\le T}B(t)
$$

とする。反射原理を説明し、$P(M_T\ge a)$ を求めよ。

<details>
<summary>詳細解答</summary>

最初の到達時刻

$$
\tau_a=\inf\{t\ge0:B(t)=a\}
$$

で、到達後の増分の符号を反転する。ブラウン運動の増分は左右対称な正規分布であり、反転後も同じ確率法則を持つ。

この写像は

$$
\{M_T\ge a,B(T)<a\}
$$

と

$$
\{B(T)>a\}
$$

を一対一に対応させる。よって

$$
P(M_T\ge a)=2P(B(T)\ge a).
$$

$B(T)\sim N(0,T)$ だから

$$
\boxed{
P(M_T\ge a)
=2\left\{1-\Phi\left(\frac a{\sqrt T}\right)\right\}
}.
$$

**本番答案**: 「最初に $a$ に達した後を反射」「増分の対称性」「連続経路」の3点を書けば十分。

**採点基準（20点）**: 初到達4点、反射対応6点、対称性4点、正規標準化6点。

</details>

### E2-04-C02 初到達時刻の分布

$$
\tau_a=\inf\{t\ge0:B(t)=a\}
$$

について $P(\tau_a\le T)$ を求め、密度 $f_{\tau_a}(T)$ を導け。

<details>
<summary>詳細解答</summary>

経路の連続性から

$$
\{\tau_a\le T\}=\{M_T\ge a\}.
$$

したがって

$$
F_{\tau_a}(T)
=2\left\{1-\Phi\left(\frac a{\sqrt T}\right)\right\}.
$$

$z(T)=aT^{-1/2}$ と置くと

$$
\frac{dz}{dT}=-\frac a2T^{-3/2}.
$$

$\Phi'(z)=\phi(z)$ より

$$
\begin{aligned}
f_{\tau_a}(T)
&=-2\phi(z(T))\frac{dz}{dT}\\
&=aT^{-3/2}\frac1{\sqrt{2\pi}}
\exp\left(-\frac{a^2}{2T}\right).
\end{aligned}
$$

よって

$$
\boxed{
f_{\tau_a}(T)
=\frac{a}{\sqrt{2\pi T^3}}
\exp\left(-\frac{a^2}{2T}\right)
}.
$$

**採点基準（20点）**: 最大値との同値4点、CDF6点、微分6点、密度4点。

</details>

### E2-04-C03 条件付き正規分布で計算する

$0<s<t$ とする。$(B(s),B(t))$ の分散共分散行列から、多変量正規分布の条件付き分布公式を使って

$$
B(t)\mid B(s)=x
$$

の分布を導け。

<details>
<summary>詳細解答</summary>

平均は0、分散共分散行列は

$$
\begin{pmatrix}
s&s\\
s&t
\end{pmatrix}.
$$

条件付き平均は

$$
0+\frac{s}{s}x=x.
$$

条件付き分散は

$$
t-\frac{s^2}{s}=t-s.
$$

よって

$$
\boxed{B(t)\mid B(s)=x\sim N(x,t-s)}.
$$

独立増分による導出と一致する。

**採点基準（20点）**: 共分散行列6点、条件付き平均5点、条件付き分散5点、結論4点。

</details>

### E2-04-C04 最大値の分位点

$M_T=\max_{0\le t\le T}B(t)$ とする。$0<q<1$ に対し

$$
P(M_T\le m_q)=q
$$

を満たす $m_q$ を $\Phi^{-1}$ で表せ。

<details>
<summary>詳細解答</summary>

$a\ge0$ で

$$
P(M_T\le a)=2\Phi\left(\frac a{\sqrt T}\right)-1.
$$

したがって

$$
2\Phi\left(\frac{m_q}{\sqrt T}\right)-1=q,
$$

$$
\Phi\left(\frac{m_q}{\sqrt T}\right)=\frac{1+q}{2}.
$$

よって

$$
\boxed{
m_q=\sqrt T\,\Phi^{-1}\left(\frac{1+q}{2}\right)
}.
$$

**採点基準（20点）**: CDF8点、方程式4点、逆関数4点、尺度 $\sqrt T$ 4点。

</details>

## Level D

### E2-04-D01 ランダムウォークからブラウン運動への橋

対称単純ランダムウォーク $S_n$ と

$$
W_n(t)=\frac{S_{\lfloor nt\rfloor}}{\sqrt n}
$$

を考える。$0<s<t$ について、次を示せ。

1. $W_n(t)-W_n(s)$ の平均は0。
2. 分散は $t-s$ に収束する。
3. $[0,s]$ に属する歩数で構成される増分と $[s,t]$ に属する歩数で構成される増分は、端点の丸めを無視すれば独立である。
4. 以上と中心極限定理から、ブラウン運動の独立正規増分がなぜ自然な極限構造か説明せよ。

<details>
<summary>詳細解答</summary>

$$
W_n(t)-W_n(s)
=\frac{S_{\lfloor nt\rfloor}-S_{\lfloor ns\rfloor}}{\sqrt n}
$$

は、異なる時点間の独立な歩みの和を $\sqrt n$ で割ったものです。

歩数を

$$
k_n=\lfloor nt\rfloor-\lfloor ns\rfloor
$$

とすると平均は0、分散は

$$
\frac{k_n}{n}\to t-s.
$$

また非重複時間区間は異なる $X_i$ の集合を使うので独立です。

中心極限定理から

$$
W_n(t)-W_n(s)
\Rightarrow N(0,t-s).
$$

したがって極限過程では、区間長だけで決まる正規増分と非重複区間の独立性が現れます。これがブラウン運動の増分構造です。

ただし、これだけでは連続経路を含む「過程全体の収束」を完全には証明していません。厳密な主張には関数型中心極限定理が必要です。

**本番答案**: 有限次元の増分構造と経路全体の収束を区別すると高評価。

**採点基準（20点）**: 増分表示4点、平均分散5点、独立性4点、CLT4点、極限解釈3点。

</details>

---

## 30分ドリル

### E2-04-DRILL-01 ブラウン運動の基本から初到達まで

標準ブラウン運動 $B(t)$ について、$a>0$ とする。

1. $\operatorname{Cov}(B(2),B(5))$ を求めよ。
2. $B(5)\mid B(2)=x$ の分布を求めよ。
3. $M_5=\max_{0\le t\le5}B(t)$ として $P(M_5\ge a)$ を $\Phi$ で表せ。
4. $\tau_a=\inf\{t\ge0:B(t)=a\}$ として $P(\tau_a\le5)$ を求めよ。
5. 反射原理を使う際に必要なブラウン運動の性質を2つ挙げよ。

<details>
<summary>解答</summary>

1. $2\le5$ なので
   $$
   \boxed{\operatorname{Cov}(B(2),B(5))=2}.
   $$
2. 独立増分から
   $$
   \boxed{B(5)\mid B(2)=x\sim N(x,3)}.
   $$
3. 反射原理より
   $$
   \boxed{
   P(M_5\ge a)
   =2\left\{1-\Phi\left(\frac a{\sqrt5}\right)\right\}
   }.
   $$
4. 連続性により $\{\tau_a\le5\}=\{M_5\ge a\}$ なので同じ式。
5. 例えば「連続経路」「到達後の独立増分」「0中心正規増分の対称性」のうち2つ。

**本番答案の優先順位**: まず $\min(s,t)$ と現在＋独立増分を確実に取り、その後反射原理を書く。

**採点基準（20点）**: 各小問4点。

</details>

---

## 章末整理

ブラウン運動で最優先なのは次の5本です。

$$
\boxed{B(t)-B(s)\sim N(0,t-s)}
$$

$$
\boxed{\operatorname{Cov}(B(s),B(t))=\min(s,t)}
$$

$$
\boxed{B(t)\mid B(s)=x\sim N(x,t-s)}
$$

$$
\boxed{B(ct)\overset{d}=\sqrt c\,B(t)}
$$

$$
\boxed{
P\left(\max_{0\le t\le T}B(t)\ge a\right)
=2\left\{1-\Phi\left(\frac a{\sqrt T}\right)\right\}
}.
$$

ただし、公式を孤立して覚えるのではなく、

- 共分散：**現在までの部分を共有し、その後の増分が独立**
- 条件付き分布：**現在値＋独立な未来増分**
- $\sqrt t$ スケール：**ランダムウォークの分散が歩数に比例**
- 反射原理：**初到達後の増分の対称性**

から復元できるようにしておくことが重要です。

### 関連演習

- [Applied 理工学 Advanced 21 Brown運動・反射原理](../../../../applied-rikou-80/advanced/21_brownian_reflection.md)
- E2-02 ポアソン過程・ランダムウォーク
- P3-03 多変量分布・条件付き分布
- P4-02 確率変数の収束・大数則・中心極限定理
