# E2-05 状態空間モデル

状態空間モデルは、**直接は見えない「状態」**と、そこからノイズを伴って得られる**「観測」**を分けて記述する時系列モデルです。

たとえば工場の炉内温度を考えます。本当に知りたい炉内温度を $x_t$、センサー表示を $y_t$ とすると、センサーには測定誤差があるため一般に $x_t=y_t$ ではありません。また真の温度自体も前時点から完全には決まらず、外乱によって揺れます。

このとき

$$
\text{真の状態の変化} \quad x_{t-1}\longrightarrow x_t,
$$

$$
\text{状態から観測} \quad x_t\longrightarrow y_t
$$

を別々の式にします。これが状態空間モデルの基本思想です。

本章では、公式を暗記するのではなく

$$
\boxed{
\text{予測}
\longrightarrow
\text{観測の予測}
\longrightarrow
\text{予測誤差}
\longrightarrow
\text{更新}
}
$$

という順番で Kalman filter を導きます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md) に従います。

## この章で解けるようになる問題

- 状態変数・観測変数・状態方程式・観測方程式を識別する。
- 状態の1期先予測平均・予測分散を求める。
- 観測の予測値とイノベーションを求める。
- 多変量正規分布の条件付き分布から Kalman gain を導く。
- 観測後の状態推定平均・分散を更新する。
- スカラー形を理解した上で行列形の Kalman filter を使う。
- filtering・prediction・smoothing を区別する。
- AR(1) や局所レベルモデルを状態空間表現として読む。
- イノベーションから Gaussian 尤度を組み立てる。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 状態空間モデル | 状態と観測の分離、線形 Gaussian 状態空間モデル |
| 状態方程式 | 状態遷移、システムノイズ |
| 観測方程式 | 観測行列、観測ノイズ |
| 時系列解析 | prediction・filtering・smoothing、AR表現 |
| Kalman filter | 予測、イノベーション、gain、更新 |

## 前提知識チェック

1. E2-03: ARモデルと1期先予測の意味。
2. E1-01: 多変量正規分布の条件付き分布。
3. F0-00: 行列積、転置、逆行列。

特に本章の Kalman 更新は、新しい公式が空から降ってくるのではありません。**多変量正規分布の条件付き平均・条件付き分散を毎時点で繰り返しているだけ**です。

---

## 1. なぜ「状態」と「観測」を分けるのか

観測時系列 $y_1,y_2,\ldots$ だけを直接モデル化する AR・MA・ARIMA に対して、状態空間モデルでは裏側に状態 $x_t$ を導入します。

例として

- $x_t$: 時点 $t$ の真の温度
- $y_t$: 温度センサーの表示値

とします。

真の温度が

$$
x_t=ax_{t-1}+w_t
$$

のように変化し、センサーが

$$
y_t=cx_t+v_t
$$

を返すと考えます。

ここで

- $a$: 状態が前時点からどれだけ残るか
- $c$: 状態を観測へ変換する係数
- $w_t$: **システムノイズ**。状態そのものを揺らす外乱
- $v_t$: **観測ノイズ**。測定だけを揺らす誤差

です。

重要なのは $w_t$ と $v_t$ の役割が違うことです。$w_t$ が大きければ本当の状態が激しく変化し、$v_t$ が大きければ状態は安定していてもセンサー値が信用しにくくなります。

## 2. 線形 Gaussian 状態空間モデル

まずスカラー形から始めます。

<a id="def-e2-05-state-observation-equations"></a>

<!-- formal-statement-start -->
> **定義（状態方程式・観測方程式）**  
> スカラー線形状態空間モデルで

$$
x_t=ax_{t-1}+w_t
$$

> を **状態方程式**、

$$
y_t=cx_t+v_t
$$

> を **観測方程式** といいます。$w_t$ はシステムノイズ、$v_t$ は観測ノイズです。
<!-- formal-statement-end -->

Gaussian モデルでは

$$
w_t\sim N(0,q),
\qquad
v_t\sim N(0,r)
$$

とし、異なる時点のノイズ、$w$ と $v$、初期状態は互いに独立とします。

初期状態も

$$
x_0\sim N(m_0,P_0)
$$

とします。

### 2.1 条件付き独立性が計算を簡単にする

状態 $x_t$ が分かっていれば、過去の状態や観測を全部覚えていなくても $y_t$ の分布が決まります。また $x_t$ の次の状態 $x_{t+1}$ も $x_t$ から生成されます。

したがって状態は「過去の情報を未来予測に必要な形へ圧縮したもの」と見ることができます。

これは E2-01 の Markov 性と同じ発想です。

---

## 3. filtering・prediction・smoothing

状態空間モデルでは「何時点まで観測したか」を明示する必要があります。

時点 $t$ までの観測情報を

$$
\mathcal F_t=\sigma(y_1,\ldots,y_t)
$$

と書きます。

### filtering

現在までの観測を使って現在の状態を推定します。

$$
p(x_t\mid\mathcal F_t)
$$

### prediction

現在までの観測を使って未来の状態を予測します。

$$
p(x_{t+h}\mid\mathcal F_t),\qquad h\ge1
$$

### smoothing

未来の観測まで使って、過去の状態を推定し直します。

$$
p(x_t\mid\mathcal F_T),\qquad T>t
$$

試験ではこの3つの添字を混同しないことが重要です。Kalman filter が直接計算する中心は **filtering と1期先 prediction** です。

---

## 4. 予測ステップ

時点 $t-1$ の観測まで使った状態分布が

$$
x_{t-1}\mid\mathcal F_{t-1}
\sim N(m_{t-1}^+,P_{t-1}^+)
$$

まで得られているとします。

上付き $+$ は「時点 $t-1$ の観測で更新済み」という意味です。

状態方程式

$$
x_t=ax_{t-1}+w_t
$$

から

$$
E[x_t\mid\mathcal F_{t-1}]
=aE[x_{t-1}\mid\mathcal F_{t-1}]+E[w_t]
$$

なので

$$
\boxed{m_t^-=am_{t-1}^+}.
$$

分散は $x_{t-1}$ と $w_t$ の独立性から

$$
\begin{aligned}
P_t^-
&=\operatorname{Var}(ax_{t-1}+w_t\mid\mathcal F_{t-1})\\
&=a^2P_{t-1}^++q.
\end{aligned}
$$

したがって

$$
\boxed{P_t^-=a^2P_{t-1}^++q}.
$$

ここで上付き $-$ は「$y_t$ をまだ見ていない予測分布」を表します。

$$
\boxed{
x_t\mid\mathcal F_{t-1}
\sim N(m_t^-,P_t^-)
}
$$

です。

### なぜ $q$ を足すのか

前時点の不確実性 $P_{t-1}^+$ を状態方程式で伝播させると $a^2P_{t-1}^+$ になります。しかし次の状態には新しい外乱 $w_t$ も入るため、その分散 $q$ が追加されます。

つまり予測だけを続けると、新しいシステムノイズの分だけ不確実性が増えます。

---

## 5. 観測の予測とイノベーション

観測方程式は

$$
y_t=cx_t+v_t.
$$

時点 $t-1$ までの情報から予測した観測平均は

$$
\hat y_t^-=E[y_t\mid\mathcal F_{t-1}]
=cm_t^-.
$$

実際に $y_t$ を観測したとき、

$$
\boxed{e_t=y_t-cm_t^-}
$$

を **イノベーション** または1期先予測誤差と呼びます。

「予測していた観測」と「実際の観測」のズレです。

その分散は

$$
\begin{aligned}
S_t
&=\operatorname{Var}(y_t\mid\mathcal F_{t-1})\\
&=c^2P_t^-+r.
\end{aligned}
$$

したがって

$$
\boxed{S_t=c^2P_t^-+r}.
$$

$S_t$ には

- 状態予測そのものの不確実性 $c^2P_t^-$
- 観測ノイズ $r$

の両方が含まれます。

---

## 6. Kalman 更新は条件付き正規分布そのもの

ここが本章の中心です。

$\mathcal F_{t-1}$ の下で

$$
x_t\sim N(m_t^-,P_t^-)
$$

であり、

$$
y_t=cx_t+v_t
$$

です。線形変換と独立正規変数の和なので $(x_t,y_t)$ は2変量正規になります。

平均は

$$
E
\begin{bmatrix}
x_t\\
y_t
\end{bmatrix}
=
\begin{bmatrix}
m_t^-\\
cm_t^-
\end{bmatrix}.
$$

共分散は

$$
\operatorname{Var}(x_t)=P_t^-,
$$

$$
\operatorname{Cov}(x_t,y_t)
=\operatorname{Cov}(x_t,cx_t+v_t)
=cP_t^-,
$$

$$
\operatorname{Var}(y_t)=c^2P_t^-+r=S_t.
$$

したがって

$$
\begin{bmatrix}
x_t\\
y_t
\end{bmatrix}
\Bigm|\mathcal F_{t-1}
\sim
N\left(
\begin{bmatrix}
m_t^-\\
cm_t^-
\end{bmatrix},
\begin{bmatrix}
P_t^-&cP_t^-\\
cP_t^-&S_t
\end{bmatrix}
\right).
$$

E1-01 の条件付き正規分布公式を使うと、観測 $y_t$ を得た後の条件付き平均は

$$
\begin{aligned}
m_t^+
&=m_t^-+
\frac{cP_t^-}{S_t}
(y_t-cm_t^-).
\end{aligned}
$$

<a id="def-e2-05-kalman-gain"></a>

<!-- formal-statement-start -->
> **定義（Kalman gain）**  
> スカラー線形Gaussian状態空間モデルの更新で、予測誤差分散 $S_t=c^2P_t^-+r$ に対して

$$
K_t=\frac{cP_t^-}{S_t}
=\frac{cP_t^-}{c^2P_t^-+r}
$$

> と定める係数を **Kalman gain** といいます。
<!-- formal-statement-end -->

したがって

$$
\boxed{m_t^+=m_t^-+K_te_t}.
$$

更新分散も条件付き正規公式から

$$
\begin{aligned}
P_t^+
&=P_t^--\frac{(cP_t^-)^2}{S_t}\\
&=P_t^- - K_tcP_t^-\\
&=(1-K_tc)P_t^-.
\end{aligned}
$$

よって

$$
\boxed{P_t^+=(1-K_tc)P_t^-}.
$$

これが Kalman filter の1回の更新です。

### 6.1 $c=1$ のときは「予測と観測の重み付き平均」

$c=1$ なら

$$
K_t=\frac{P_t^-}{P_t^-+r}.
$$

平均更新は

$$
\begin{aligned}
m_t^+
&=m_t^-+K_t(y_t-m_t^-)\\
&=(1-K_t)m_t^-+K_ty_t.
\end{aligned}
$$

つまり

$$
\boxed{
\text{更新値}
=
(1-K_t)\times\text{予測}
+K_t\times\text{観測}
}
$$

です。

- $r$ が大きい: 観測がうるさいので $K_t$ は小さくなり、予測を重視。
- $P_t^-$ が大きい: 予測が不確かなので $K_t$ は大きくなり、観測を重視。

この意味を理解しておけば gain の式を丸暗記する必要はありません。

---

## 7. Kalman filter の1サイクル

スカラー線形 Gaussian モデルでは、次の4段階を繰り返します。

### 予測

$$
m_t^-=am_{t-1}^+,
$$

$$
P_t^-=a^2P_{t-1}^++q.
$$

### 観測予測・イノベーション

$$
e_t=y_t-cm_t^-,
$$

$$
S_t=c^2P_t^-+r.
$$

### gain

$$
K_t=\frac{cP_t^-}{S_t}.
$$

### 更新

$$
m_t^+=m_t^-+K_te_t,
$$

$$
P_t^+=(1-K_tc)P_t^-.
$$

試験で混乱したら、**まず $m^-,P^-$ を作り、その後に $e,S,K,m^+,P^+$** と書くと事故が減ります。

---

## 8. 数値例：局所レベルモデル

最も単純な状態空間モデル

$$
x_t=x_{t-1}+w_t,
\qquad
y_t=x_t+v_t
$$

を考えます。これは **局所レベルモデル** と呼ばれます。

$$
w_t\sim N(0,1),
\qquad
v_t\sim N(0,4)
$$

とし、時点 $t-1$ の filtering 分布が

$$
x_{t-1}\mid\mathcal F_{t-1}
\sim N(2,3)
$$

だったとします。新しい観測が $y_t=5$ です。

予測は

$$
m_t^-=2,
$$

$$
P_t^-=3+1=4.
$$

イノベーションは

$$
e_t=5-2=3,
$$

その分散は

$$
S_t=4+4=8.
$$

したがって

$$
K_t=\frac48=\frac12.
$$

更新平均は

$$
m_t^+=2+\frac12\cdot3=3.5,
$$

更新分散は

$$
P_t^+=\left(1-\frac12\right)4=2.
$$

観測前の分散4が、観測を1つ得ることで2まで小さくなっています。

---

## 9. 行列形の状態空間モデル

実際には状態が複数成分を持つことがあります。

$$
\boxed{\boldsymbol x_t=F\boldsymbol x_{t-1}+\boldsymbol w_t}
$$

$$
\boxed{\boldsymbol y_t=H\boldsymbol x_t+\boldsymbol v_t}
$$

とし、

$$
\boldsymbol w_t\sim N(\boldsymbol0,Q),
\qquad
\boldsymbol v_t\sim N(\boldsymbol0,R)
$$

とします。

状態の次元を $p$、観測の次元を $m$ とすると

| 記号 | 次元 |
|---|---:|
| $\boldsymbol x_t$ | $p\times1$ |
| $\boldsymbol y_t$ | $m\times1$ |
| $F$ | $p\times p$ |
| $H$ | $m\times p$ |
| $P_t$ | $p\times p$ |
| $Q$ | $p\times p$ |
| $R$ | $m\times m$ |

です。

### 9.1 予測

$$
\boxed{
\boldsymbol m_t^-=F\boldsymbol m_{t-1}^+
}
$$

$$
\boxed{
P_t^-=FP_{t-1}^+F^{\mathsf T}+Q
}
$$

です。

### 9.2 イノベーション

$$
\boxed{
\boldsymbol e_t
=\boldsymbol y_t-H\boldsymbol m_t^-
}
$$

$$
\boxed{
S_t=HP_t^-H^{\mathsf T}+R
}
$$

です。

### 9.3 gain と更新

$(\boldsymbol x_t,\boldsymbol y_t)$ の条件付き同時正規分布で

$$
\operatorname{Cov}(\boldsymbol x_t,\boldsymbol y_t)
=P_t^-H^{\mathsf T}
$$

だから、条件付き正規公式より

$$
\boxed{
K_t=P_t^-H^{\mathsf T}S_t^{-1}
}
$$

です。

更新平均は

$$
\boxed{
\boldsymbol m_t^+
=\boldsymbol m_t^-+K_t\boldsymbol e_t
}
$$

更新共分散は

$$
\boxed{
P_t^+=(I-K_tH)P_t^-
}
$$

です。

この行列式も、本質はスカラーの場合と全く同じです。

---

## 10. AR(1) は状態空間モデルの特殊例

E2-03 の AR(1)

$$
y_t=\phi y_{t-1}+\varepsilon_t
$$

は、状態をそのまま観測すると考えれば

$$
x_t=\phi x_{t-1}+w_t,
$$

$$
y_t=x_t
$$

という状態空間表現を持ちます。

より状態空間モデルらしいのは、観測誤差も入れた

$$
x_t=\phi x_{t-1}+w_t,
$$

$$
y_t=x_t+v_t
$$

です。

この場合、観測 $y_t$ 自体は単純な AR(1) ではありません。**裏側の状態 $x_t$ が AR(1) 的に動き、それをノイズ付きで観測している**からです。

状態空間モデルは「潜在した動学」と「測定」を分離できる点で ARIMA より柔軟です。

---

## 11. なぜ状態をベクトルにするのか

観測 $y_t$ が過去2期に依存する AR(2)

$$
y_t=\phi_1y_{t-1}+\phi_2y_{t-2}+\varepsilon_t
$$

でも、状態を

$$
\boldsymbol x_t=
\begin{bmatrix}
y_t\\
y_{t-1}
\end{bmatrix}
$$

と置けば

$$
\boldsymbol x_t
=
\begin{bmatrix}
\phi_1&\phi_2\\
1&0
\end{bmatrix}
\boldsymbol x_{t-1}
+
\begin{bmatrix}
\varepsilon_t\\
0
\end{bmatrix}
$$

と1階のベクトル漸化式にできます。

つまり「高階の時系列を、状態を増やすことで1階の Markov 系へ変換する」のが状態空間表現の重要な利点です。

---

## 12. イノベーションから尤度が作れる

線形 Gaussian 状態空間モデルでは

$$
\boldsymbol y_t\mid\mathcal F_{t-1}
\sim N(H\boldsymbol m_t^-,S_t)
$$

です。

したがって連鎖律から

$$
p(\boldsymbol y_1,\ldots,\boldsymbol y_T)
=
\prod_{t=1}^T
p(\boldsymbol y_t\mid\mathcal F_{t-1}).
$$

各項は Gaussian なので、観測次元を $m$ とすると対数尤度は

$$
\boxed{
\ell
=-\frac12
\sum_{t=1}^T
\left[
 m\log(2\pi)
 +\log|S_t|
 +\boldsymbol e_t^{\mathsf T}S_t^{-1}\boldsymbol e_t
\right]
}
$$

となります。

つまり Kalman filter は状態推定だけでなく、**パラメータ推定のための尤度計算**にも使われます。

### スカラーの場合

$$
y_t\mid\mathcal F_{t-1}
\sim N(cm_t^-,S_t)
$$

なので

$$
\ell
=-\frac12
\sum_{t=1}^T
\left[
\log(2\pi)+\log S_t+\frac{e_t^2}{S_t}
\right].
$$

この形では「標準化予測誤差 $e_t/\sqrt{S_t}$ が大きすぎないか」を診断する意味も見えます。

---

## 13. 観測が欠測したらどうするか

時点 $t$ の $y_t$ が得られなかった場合でも状態方程式による予測はできます。

$$
\boldsymbol m_t^-=F\boldsymbol m_{t-1}^+,
\qquad
P_t^-=FP_{t-1}^+F^{\mathsf T}+Q.
$$

しかし更新に使う観測がないため

$$
\boxed{
\boldsymbol m_t^+=\boldsymbol m_t^-,
\qquad
P_t^+=P_t^-
}
$$

として次時点へ進みます。

「欠測値を適当な値で埋めてから filter する」のではなく、**その時点の観測更新を飛ばす**という処理が自然にできます。

---

## 14. Gaussian 仮定はどこで効いているか

予測平均・予測分散の式は、線形性・平均分散・独立性だけでも計算できます。

一方、

$$
m_t^+=m_t^-+K_te_t
$$

が **真の条件付き平均 $E[x_t\mid\mathcal F_t]$ そのもの**になるのは、線形 Gaussian モデルだからです。

Gaussian を外した場合、同じ形は線形最小二乗推定として意味を持つことがありますが、一般には真の条件付き分布は Gaussian ではなく、条件付き平均も線形とは限りません。

試験で「Kalman filter を適用できる理由」を問われたら、単に公式を書くのではなく

1. 状態・観測が線形関係で結ばれている。
2. ノイズと初期状態が Gaussian。
3. 必要な独立性がある。
4. よって予測・更新後も Gaussian が保たれる。

という流れを確認します。

---

## 15. よくある混同

### $q$ と $r$

- $q$: 状態自体の変動、システムノイズ分散。
- $r$: 測定誤差、観測ノイズ分散。

### $P_t^-$ と $P_t^+$

- $P_t^-$: $y_t$ を見る前の予測分散。
- $P_t^+$: $y_t$ を見た後の filtering 分散。

通常、観測によって情報が増えるため $P_t^+\le P_t^-$ です。

### イノベーションと状態誤差

$$
e_t=y_t-Hm_t^-
$$

は観測空間での予測誤差です。状態誤差 $x_t-m_t^-$ そのものではありません。

### smoothing と filtering

未来の観測を使って過去を推定し直すのが smoothing です。通常の forward Kalman filter の更新だけではありません。

---

## 16. 問題処理パターン

### SS-READ-1: 式から状態と観測を読む

状態方程式、観測方程式、$Q,R$ をまず識別する。

### SS-PREDICT-1: 予測分布を作る

$$
m^-\rightarrow P^-.
$$

### SS-UPDATE-1: 観測で更新する

$$
e\rightarrow S\rightarrow K\rightarrow m^+\rightarrow P^+.
$$

### SS-MATRIX-1: 行列形では次元確認を先にする

特に

$$
P^-H^{\mathsf T}S^{-1}
$$

の積の次元を確認する。

### SS-REPRESENT-1: 高階ARを状態ベクトル化する

ラグを状態に入れて1階のベクトル漸化式へ直す。

### SS-LIKELIHOOD-1: 尤度はイノベーション分解

各時点の

$$
\boldsymbol e_t,S_t
$$

から条件付き Gaussian 密度を掛ける。

---

# 演習

## Level A

### E2-05-A01 状態・観測・ノイズを区別する

ある装置の真の位置 $x_t$ と GPS 観測 $y_t$ が

$$
x_t=0.9x_{t-1}+w_t,
\qquad
y_t=2x_t+v_t
$$

で表される。$w_t$ と $v_t$ の役割、$a,c$ を答えよ。

<!-- solution-start -->
**詳細解答**

状態は $x_t$、観測は $y_t$。状態方程式の係数は $a=0.9$、観測係数は $c=2$ である。$w_t$ は状態そのものへ加わるシステムノイズ、$v_t$ は測定だけへ加わる観測ノイズである。

**本番答案**

$x_t$ が状態、$y_t$ が観測、$a=0.9,c=2$。$w_t$ は状態外乱、$v_t$ は観測誤差。

**採点基準** 2点: 状態・観測1点、2種のノイズ1点。
<!-- solution-end -->

### E2-05-A02 1期先予測

$$
x_t=0.8x_{t-1}+w_t,
\qquad w_t\sim N(0,2)
$$

で

$$
x_{t-1}\mid\mathcal F_{t-1}\sim N(5,3)
$$

とする。$m_t^-,P_t^-$ を求めよ。

<!-- solution-start -->
**詳細解答**

$$
m_t^-=0.8\times5=4.
$$

独立な $w_t$ の分散2を加えて

$$
P_t^-=0.8^2\times3+2=3.92.
$$

**本番答案**

$$
(m_t^-,P_t^-)=(4,3.92).
$$

**採点基準** 2点: 平均1点、分散1点。
<!-- solution-end -->

### E2-05-A03 イノベーション

$c=1,m_t^-=3,P_t^-=2,r=3,y_t=7$ とする。$e_t,S_t,K_t$ を求めよ。

<!-- solution-start -->
**詳細解答**

$$
e_t=7-3=4,
$$

$$
S_t=2+3=5,
$$

$$
K_t=\frac25.
$$

**本番答案**

$$
(e_t,S_t,K_t)=(4,5,2/5).
$$

**採点基準** 2点: イノベーション1点、$S,K$ 1点。
<!-- solution-end -->

### E2-05-A04 filtering・prediction・smoothing

次を filtering、prediction、smoothing に分類せよ。

1. $p(x_t\mid y_1,\ldots,y_t)$
2. $p(x_{t+1}\mid y_1,\ldots,y_t)$
3. $p(x_t\mid y_1,\ldots,y_T)$, $T>t$

<!-- solution-start -->
**詳細解答**

1は現在までで現在を推定するので filtering。2は未来状態なので prediction。3は未来観測まで使って過去を推定するので smoothing。

**本番答案**

1 filtering、2 prediction、3 smoothing。

**採点基準** 2点: 3分類すべて正解。
<!-- solution-end -->

## Level B

### E2-05-B01 スカラー Kalman 更新

$$
x_t=x_{t-1}+w_t,
\qquad y_t=x_t+v_t
$$

で $q=2,r=6$ とする。時点 $t-1$ の filtering 分布が $N(4,2)$、新しい観測が $y_t=10$ のとき、$m_t^-,P_t^-,K_t,m_t^+,P_t^+$ を求めよ。

<!-- solution-start -->
**詳細解答**

予測は

$$
m_t^-=4,
\qquad
P_t^-=2+2=4.
$$

$c=1$ なので

$$
K_t=\frac{4}{4+6}=0.4.
$$

イノベーションは $10-4=6$ だから

$$
m_t^+=4+0.4\times6=6.4.
$$

$$
P_t^+=(1-0.4)4=2.4.
$$

**本番答案**

$$
(m^-,P^-,K,m^+,P^+)=(4,4,0.4,6.4,2.4).
$$

**採点基準** 4点: 予測1点、gain1点、平均更新1点、分散更新1点。
<!-- solution-end -->

### E2-05-B02 gain を条件付き正規から導く

スカラー状態空間モデルで $x_t\mid\mathcal F_{t-1}\sim N(m^-,P^-)$、$y_t=cx_t+v_t$、$v_t\sim N(0,r)$ とする。Kalman gain を導け。

<!-- solution-start -->
**詳細解答**

条件付きで $(x_t,y_t)$ は同時正規で、

$$
\operatorname{Cov}(x_t,y_t)=cP^-,
$$

$$
\operatorname{Var}(y_t)=c^2P^-+r.
$$

多変量正規の条件付き平均公式の回帰係数は「共分散÷条件付ける変数の分散」なので

$$
K=\frac{cP^-}{c^2P^-+r}.
$$

**本番答案**

同時正規性と

$$
\operatorname{Cov}(x_t,y_t)=cP^-,\quad
\operatorname{Var}(y_t)=c^2P^-+r
$$

より

$$
\boxed{K=cP^-/(c^2P^-+r)}.
$$

**採点基準** 4点: 同時正規1点、共分散1点、観測分散1点、gain1点。
<!-- solution-end -->

### E2-05-B03 2時点連続更新

局所レベルモデルで $q=1,r=3$、初期 filtering 分布を $x_0\mid\mathcal F_0\sim N(0,2)$ とする。$y_1=4,y_2=2$ を順に観測したとき、$m_1^+,P_1^+,m_2^+,P_2^+$ を求めよ。

<!-- solution-start -->
**詳細解答**

時点1では

$$
m_1^-=0,\qquad P_1^-=2+1=3,
$$

$$
K_1=\frac{3}{3+3}=\frac12.
$$

したがって

$$
m_1^+=0+\frac12(4)=2,
$$

$$
P_1^+=\frac12\times3=1.5.
$$

時点2では

$$
m_2^-=2,
\qquad P_2^-=1.5+1=2.5.
$$

$$
K_2=\frac{2.5}{2.5+3}=\frac5{11}.
$$

今回は $y_2-m_2^-=0$ なので

$$
m_2^+=2.
$$

$$
P_2^+=\left(1-\frac5{11}\right)2.5
=\frac{15}{11}.
$$

**本番答案**

$$
(m_1^+,P_1^+)=(2,1.5),
$$

$$
(m_2^+,P_2^+)=(2,15/11).
$$

**採点基準** 4点: 各時点2点。
<!-- solution-end -->

### E2-05-B04 行列形の次元

状態次元 $p=3$、観測次元 $m=2$ とする。$P^-,H,R,S,K$ の次元を答え、

$$
K=P^-H^{\mathsf T}S^{-1}
$$

が何次元になるか確認せよ。

<!-- solution-start -->
**詳細解答**

$$
P^-:3\times3,
\quad H:2\times3,
\quad R:2\times2.
$$

したがって

$$
S=HP^-H^{\mathsf T}+R:2\times2.
$$

よって

$$
K:(3\times3)(3\times2)(2\times2)=3\times2.
$$

$K\boldsymbol e$ は $(3\times2)(2\times1)=3\times1$ となり、状態平均へ加えられる。

**本番答案**

$P^-:3\times3,H:2\times3,R,S:2\times2,K:3\times2$。

**採点基準** 4点: 各次元と積の整合性。
<!-- solution-end -->

## Level C

### E2-05-C01 AR(1) + 測定誤差

潜在状態が

$$
x_t=0.7x_{t-1}+w_t,
\qquad w_t\sim N(0,1)
$$

で動き、

$$
y_t=x_t+v_t,
\qquad v_t\sim N(0,2)
$$

を観測する。$x_{t-1}\mid\mathcal F_{t-1}\sim N(3,2)$、$y_t=1$ とする。

1. 状態空間モデルとして各成分を説明せよ。
2. 1期先予測を求めよ。
3. Kalman 更新を行え。
4. 観測 $y_t$ 自体を単純な AR(1) と同一視できない理由を述べよ。

<!-- solution-start -->
**詳細解答**

状態は $x_t$、観測は $y_t$、$a=0.7,c=1,q=1,r=2$。

予測平均は

$$
m^-=0.7\times3=2.1,
$$

予測分散は

$$
P^-=0.7^2\times2+1=1.98.
$$

したがって

$$
K=\frac{1.98}{1.98+2}
=\frac{1.98}{3.98}.
$$

イノベーションは $1-2.1=-1.1$ なので

$$
m^+=2.1+\frac{1.98}{3.98}(-1.1)
\approx1.553.
$$

$$
P^+=\left(1-\frac{1.98}{3.98}\right)1.98
\approx0.995.
$$

$y_t=x_t+v_t$ には各時点の測定誤差が追加されるため、観測系列自身の動学は潜在 AR(1) の式と同じではない。

**本番答案**

$$
m^-=2.1,\ P^-=1.98,\ K=1.98/3.98,
$$

$$
m^+\approx1.553,\quad P^+\approx0.995.
$$

$y_t$ は潜在状態に独立な測定誤差を加えた系列なので、$x_t$ の AR(1) 式をそのまま $y_t$ に適用できない。

**採点基準** 8点: モデル識別2点、予測2点、更新2点、観測系列の解釈2点。
<!-- solution-end -->

### E2-05-C02 イノベーション尤度

スカラー Gaussian 状態空間モデルで、filter により

$$
(e_1,S_1)=(1,2),
\qquad
(e_2,S_2)=(-2,4)
$$

が得られた。2時点分の対数尤度を定数項も含めて書け。

<!-- solution-start -->
**詳細解答**

スカラーのイノベーション尤度は

$$
\ell
=-\frac12\sum_{t=1}^2
\left[
\log(2\pi)+\log S_t+\frac{e_t^2}{S_t}
\right].
$$

したがって

$$
\ell
=-\frac12
\left[
2\log(2\pi)+\log2+\frac12+\log4+1
\right].
$$

**本番答案**

$$
\boxed{
\ell=-\frac12\{2\log(2\pi)+\log2+\log4+3/2\}
}.
$$

**採点基準** 6点: 尤度形3点、代入3点。
<!-- solution-end -->

### E2-05-C03 欠測を含む filtering

局所レベルモデルで、時点 $t-1$ の filtering 分布が $N(4,1)$、$q=2$ とする。時点 $t$ の観測 $y_t$ が欠測している。

1. 時点 $t$ の予測分布を求めよ。
2. 時点 $t$ の filtering 分布をどう扱うか。
3. 欠測だからといって $y_t=0$ を代入してはいけない理由を述べよ。

<!-- solution-start -->
**詳細解答**

局所レベルなので

$$
m_t^-=4,
\qquad P_t^-=1+2=3.
$$

観測がないため更新ステップを実行できない。したがって

$$
m_t^+=m_t^-=4,
\qquad P_t^+=P_t^-=3.
$$

$y_t=0$ と代入すると「値0を精度 $r$ で実際に観測した」という別の情報を加えたことになり、欠測とは異なる。

**本番答案**

予測・filtering とも $N(4,3)$。欠測時は更新を飛ばす。0代入は0という観測情報を捏造するため不可。

**採点基準** 6点: 予測2点、更新スキップ2点、理由2点。
<!-- solution-end -->

### E2-05-C04 $q$ と $r$ の極端な場合

$c=1$ の局所レベルモデルを考える。

1. $r\to\infty$ で Kalman gain はどうなるか。
2. $r\to0$ でどうなるか。
3. $q$ が大きいと次時点の gain が一般に大きくなる理由を説明せよ。

<!-- solution-start -->
**詳細解答**

$$
K=\frac{P^-}{P^-+r}.
$$

したがって $r\to\infty$ なら $K\to0$ で、観測をほぼ無視する。$r\to0$ なら $K\to1$ で、観測をほぼそのまま採用する。

また

$$
P_t^-=P_{t-1}^++q
$$

なので $q$ が大きいほど予測分散 $P_t^-$ が大きくなる。予測への信頼が下がるため、相対的に観測へ置く重み $K$ が大きくなる。

**本番答案**

$r\to\infty$ で $K\to0$、$r\to0$ で $K\to1$。$q$ 増大は $P^-$ を増やし、予測を不確かにするため観測重みが増える。

**採点基準** 6点: 極限各2点、$q$ の解釈2点。
<!-- solution-end -->

## Level D

### E2-05-D01 行列 Kalman 更新を導出する

$$
\boldsymbol x_t\mid\mathcal F_{t-1}
\sim N(\boldsymbol m^-,P^-)
$$

かつ

$$
\boldsymbol y_t=H\boldsymbol x_t+\boldsymbol v_t,
\qquad
\boldsymbol v_t\sim N(\boldsymbol0,R)
$$

とし、$\boldsymbol v_t$ は $\boldsymbol x_t$ と独立、$S=HP^-H^{\mathsf T}+R$ は正則とする。

1. $(\boldsymbol x_t,\boldsymbol y_t)$ の同時平均・共分散を求めよ。
2. 条件付き正規公式から $K$、更新平均、更新共分散を導け。

<!-- solution-start -->
**詳細解答**

観測平均は

$$
E[\boldsymbol y_t\mid\mathcal F_{t-1}]
=H\boldsymbol m^-.
$$

独立性から

$$
\operatorname{Cov}(\boldsymbol x_t,\boldsymbol y_t)
=P^-H^{\mathsf T},
$$

$$
\operatorname{Var}(\boldsymbol y_t)
=HP^-H^{\mathsf T}+R=S.
$$

従って条件付き同時分布は平均

$$
\begin{bmatrix}
\boldsymbol m^-\\
H\boldsymbol m^-
\end{bmatrix}
$$

と共分散

$$
\begin{bmatrix}
P^-&P^-H^{\mathsf T}\\
HP^-&S
\end{bmatrix}
$$

を持つ。

多変量正規の条件付き平均公式から

$$
E[\boldsymbol x_t\mid\mathcal F_t]
=\boldsymbol m^-+P^-H^{\mathsf T}S^{-1}
(\boldsymbol y_t-H\boldsymbol m^-).
$$

したがって

$$
\boxed{K=P^-H^{\mathsf T}S^{-1}}
$$

および

$$
\boxed{
\boldsymbol m^+
=\boldsymbol m^-+K(\boldsymbol y_t-H\boldsymbol m^-)
}.
$$

条件付き共分散公式から

$$
P^+
=P^- -P^-H^{\mathsf T}S^{-1}HP^-.
$$

$K=P^-H^{\mathsf T}S^{-1}$ を使えば

$$
\boxed{P^+=(I-KH)P^-}.
$$

**本番答案**

$$
\operatorname{Cov}(x,y)=P^-H^{\mathsf T},
\quad S=HP^-H^{\mathsf T}+R.
$$

同時正規の条件付き分布公式より

$$
K=P^-H^{\mathsf T}S^{-1},
$$

$$
m^+=m^-+K(y-Hm^-),
$$

$$
P^+=(I-KH)P^-.
$$

**採点基準** 10点: 同時分布3点、gain2点、平均更新2点、共分散更新3点。
<!-- solution-end -->

---

# 30分ドリル

## E2-05-DRILL-01 状態空間モデルを一通り処理する

スカラー線形 Gaussian 状態空間モデル

$$
x_t=0.5x_{t-1}+w_t,
\qquad
w_t\sim N(0,1),
$$

$$
y_t=x_t+v_t,
\qquad
v_t\sim N(0,3)
$$

を考える。ノイズは互いに独立とする。時点 $t-1$ の filtering 分布は

$$
x_{t-1}\mid\mathcal F_{t-1}\sim N(4,4)
$$

で、新しい観測は $y_t=1$ だった。

1. 状態方程式・観測方程式・$a,c,q,r$ を確認せよ。
2. $x_t\mid\mathcal F_{t-1}$ を求めよ。
3. $y_t\mid\mathcal F_{t-1}$ の平均・分散を求めよ。
4. イノベーションと Kalman gain を求めよ。
5. filtering 分布 $x_t\mid\mathcal F_t$ を求めよ。
6. $y_{t+1}$ が欠測した場合、次の更新をどう処理するか述べよ。
7. Gaussian 仮定を外した場合、5の更新式が一般に真の条件付き平均になるとは限らない理由を述べよ。

<!-- solution-start -->
**詳細解答**

1. $a=0.5,c=1,q=1,r=3$。

2. 予測平均は

$$
m_t^-=0.5\times4=2.
$$

予測分散は

$$
P_t^-=0.5^2\times4+1=2.
$$

したがって

$$
x_t\mid\mathcal F_{t-1}\sim N(2,2).
$$

3. 観測予測は

$$
y_t\mid\mathcal F_{t-1}\sim N(2,2+3)=N(2,5).
$$

4. イノベーションは

$$
e_t=1-2=-1,
$$

Kalman gain は

$$
K_t=\frac{2}{5}.
$$

5. 更新平均は

$$
m_t^+=2+\frac25(-1)=\frac85=1.6.
$$

更新分散は

$$
P_t^+=\left(1-\frac25\right)2
=\frac65=1.2.
$$

よって

$$
\boxed{x_t\mid\mathcal F_t\sim N(1.6,1.2)}.
$$

6. 次時点は状態方程式で予測だけ行い、観測がないので $m^-_{t+1},P^-_{t+1}$ をそのまま $m^+_{t+1},P^+_{t+1}$ として次へ渡す。

7. Gaussian 性があると $(x_t,y_t)$ が同時正規なので条件付き平均が線形になり、Kalman 式と一致する。Gaussian を外すと条件付き平均が非線形になり得るため、同じ線形更新は一般には真の条件付き平均ではない。

**本番答案**

$$
a=0.5,c=1,q=1,r=3,
$$

$$
m^-=2,\quad P^-=2,
$$

$$
y_t\mid\mathcal F_{t-1}\sim N(2,5),
$$

$$
e=-1,\quad K=2/5,
$$

$$
x_t\mid\mathcal F_t\sim N(8/5,6/5).
$$

欠測時は予測のみで更新を飛ばす。Gaussian 性がない場合、線形 Kalman 更新が真の条件付き平均になる保証はない。

**採点基準（100点）**

- モデル読解: 10点
- 状態予測: 15点
- 観測予測: 15点
- イノベーション・gain: 15点
- filtering 更新: 20点
- 欠測処理: 10点
- Gaussian 条件の説明: 15点
<!-- solution-end -->

---

## 理工80との接続

本章を終えたら、`applied-rikou-80/advanced/30_state_space.md` の **Advanced 30 状態空間モデル・1期先Kalman更新** を解きます。

その問題で現れる

$$
x_t=ax_{t-1}+w_t,
\qquad y_t=x_t+v_t
$$

は本章の $c=1$ の場合です。解答を公式照合で済ませず、

$$
\text{予測分布}
\rightarrow
\text{条件付き同時正規}
\rightarrow
\text{条件付き分布}
$$

の順に再導出できれば、この論点は十分です。

## 章末チェック

- [ ] 状態と観測を言葉で区別できる。
- [ ] $q$ と $r$ の意味を混同しない。
- [ ] $m^-,P^-$ を状態方程式から導出できる。
- [ ] $e,S,K$ の順で Kalman 更新を組み立てられる。
- [ ] Kalman gain を条件付き正規公式から導ける。
- [ ] 行列形で $F,H,Q,R,P,S,K$ の次元を確認できる。
- [ ] filtering・prediction・smoothingを区別できる。
- [ ] ARモデルを状態空間表現として読み替えられる。
- [ ] イノベーションから Gaussian 尤度を書ける。
- [ ] 観測欠測時には更新を飛ばす理由を説明できる。
