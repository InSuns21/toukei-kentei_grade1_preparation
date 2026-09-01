# E2-03 AR・MA・ARIMA時系列

時系列では観測の順序そのものが情報を持ちます。昨日と今日の値が似る、ショックの影響が数期残る、トレンドがある、といった時間依存を無視して独立標本として扱うことはできません。本章では、まず定常性・自己共分散・自己相関を具体的な系列から確認し、その後に自己回帰過程（AR）、移動平均過程（MA）、ARMA、ARIMAを組み立てます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 弱定常性を平均・自己共分散で判定する。
- 観測値から標本自己共分散・標本自己相関を計算する。
- AR(1)の平均、分散、自己相関を導く。
- AR(1)の自己共分散漸化式からAR(p)のYule--Walker方程式を導く。
- MA(1)の自己共分散を導き、反転可能性を「innovationを過去の観測から復元できる条件」として説明する。
- ACF・PACFのコレログラムからAR・MA・ARMAの候補を区別する。
- 差分を用いてARIMAモデルを定義する。
- AR過程の多段階予測と予測誤差分散を求める。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 時系列解析 | 定常性、自己共分散、自己相関、標本自己相関、偏自己相関、コレログラム |
| 自己回帰過程 | AR(1)、AR(p)、Yule--Walker方程式、予測 |
| 移動平均過程 | MA(1)、MA(q)、反転可能性 |
| ARIMA過程 | 差分、ARMAとの関係 |

## 前提知識チェック

1. P2-02: 期待値、分散、共分散。
2. P3-03: 多変量分布と分散共分散行列。
3. E2-01: 時間依存を条件付き分布で捉える考え方。
4. F0-00: 多項式の根、漸化式。

---

## 1. まず「時間が違っても同じ仕組みか」を見る

独立標本では異なる観測どうしの共分散を0と置くことが多いですが、時系列では
$$
\operatorname{Cov}(X_t,X_{t-h})
$$
そのものが重要な情報です。

例えば
$$
X_t=0.8X_{t-1}+\varepsilon_t
$$
なら、前期の値の影響が次期以降へ徐々に残ります。一方
$$
X_t=\varepsilon_t+0.8\varepsilon_{t-1}
$$
なら、1期前のショックだけが直接残ります。前者が自己回帰過程、後者が移動平均過程です。

ただし、平均が時間とともに上昇している系列へそのまま自己相関の理論を当てはめるのは適切ではありません。まず「平均・分散・共分散の仕組みが時間で変わらないか」を確認します。

## 2. 定義と記号

### 2.1 弱定常性

時系列 $\{X_t\}$ が弱定常であるとは、有限な二次モーメントをもち、
$$
E[X_t]=\mu
$$
が $t$ に依存せず、さらに
$$
\operatorname{Cov}(X_t,X_{t-h})=\gamma(h)
$$
が時点 $t$ ではなくラグ $h$ のみで決まることをいいます。

自己共分散関数を $\gamma(h)$、自己相関関数を
$$
\rho(h)=\frac{\gamma(h)}{\gamma(0)}
$$
とします。共分散の対称性から
$$
\gamma(-h)=\gamma(h),\qquad \rho(-h)=\rho(h)
$$
です。

### 2.2 白色雑音

白色雑音 $\{\varepsilon_t\}$ は
$$
E[\varepsilon_t]=0,\qquad
\operatorname{Var}(\varepsilon_t)=\sigma_\varepsilon^2,
$$
$$
\operatorname{Cov}(\varepsilon_t,\varepsilon_s)=0\quad(t\ne s)
$$
を満たす時系列です。本章のAR・MAの導出では、必要に応じて白色雑音を独立と仮定します。

時系列モデルでは $\varepsilon_t$ を、その時点までの過去からは予測できない新しいショックという意味で **innovation（イノベーション）** と呼ぶことがあります。後で扱う反転可能性は、このinnovationを観測系列 $X_t,X_{t-1},\ldots$ から逆に復元できるか、という問題です。

### 2.3 標本自己共分散と標本自己相関

観測値 $x_1,\ldots,x_n$ に対し
$$
\bar x=\frac1n\sum_{t=1}^n x_t
$$
とします。本章ではラグ $h\ge0$ の標本自己共分散を
$$
\hat\gamma(h)=\frac1n\sum_{t=h+1}^n(x_t-\bar x)(x_{t-h}-\bar x)
$$
と定義し、標本自己相関を
$$
\hat\rho(h)=\frac{\hat\gamma(h)}{\hat\gamma(0)}
$$
とします。分母を $n-h$ とする流儀もあるため、試験では問題文の定義に従います。

## 3. 自己回帰過程

### 3.1 AR(1)の平均と分散

$$
X_t=c+\phi X_{t-1}+\varepsilon_t
$$
を考えます。弱定常であれば $E[X_t]=E[X_{t-1}]=\mu$ なので
$$
\mu=c+\phi\mu.
$$
したがって $|\phi|<1$ の定常解では
$$
\mu=\frac{c}{1-\phi}.
$$

$Y_t=X_t-\mu$ と中心化すると
$$
Y_t=\phi Y_{t-1}+\varepsilon_t.
$$
$\varepsilon_t$ は過去の $Y_{t-1}$ と無相関なので
$$
\gamma(0)
=\operatorname{Var}(Y_t)
=\phi^2\gamma(0)+\sigma_\varepsilon^2.
$$
よって
$$
\gamma(0)=\frac{\sigma_\varepsilon^2}{1-\phi^2}.
$$

さらに $h\ge1$ では
$$
\begin{aligned}
\gamma(h)
&=\operatorname{Cov}(Y_t,Y_{t-h})\\
&=\operatorname{Cov}(\phi Y_{t-1}+\varepsilon_t,Y_{t-h})\\
&=\phi\gamma(h-1),
\end{aligned}
$$
したがって
$$
\gamma(h)=\phi^{|h|}\gamma(0),\qquad
\rho(h)=\phi^{|h|}.
$$

ここで重要なのは公式そのものより、**モデル式の両辺と過去値の共分散を取ると、自己共分散の漸化式が出る**という操作です。次のAR(p)でも全く同じことをします。

### 3.2 AR(p)とYule--Walker方程式

中心化したAR(p)
$$
X_t=\phi_1X_{t-1}+\cdots+\phi_pX_{t-p}+\varepsilon_t
$$
を考えます。

AR(1)では両辺と $X_{t-k}$ の共分散を取って
$$
\gamma(k)=\phi\gamma(k-1)
$$
を得ました。AR(p)では右辺に過去値が $p$ 個あるだけです。$k\ge1$ について、
$$
\begin{aligned}
\gamma(k)
&=\operatorname{Cov}(X_t,X_{t-k})\\
&=\sum_{j=1}^p\phi_j\operatorname{Cov}(X_{t-j},X_{t-k})
 +\operatorname{Cov}(\varepsilon_t,X_{t-k}).
\end{aligned}
$$
$X_{t-k}$ は時点 $t$ より前の情報なので、innovation $\varepsilon_t$ と無相関です。したがって
$$
\boxed{\gamma(k)=\phi_1\gamma(k-1)+\cdots+\phi_p\gamma(k-p)}
\qquad(k\ge1).
$$
これが **Yule--Walker方程式** です。

特に $k=1,\ldots,p$ を並べると、$\gamma(-h)=\gamma(h)$ を使って
$$
\begin{pmatrix}
\gamma(0)&\gamma(1)&\cdots&\gamma(p-1)\\
\gamma(1)&\gamma(0)&\cdots&\gamma(p-2)\\
\vdots&\vdots&\ddots&\vdots\\
\gamma(p-1)&\gamma(p-2)&\cdots&\gamma(0)
\end{pmatrix}
\begin{pmatrix}
\phi_1\\\phi_2\\\vdots\\\phi_p
\end{pmatrix}
=
\begin{pmatrix}
\gamma(1)\\\gamma(2)\\\vdots\\\gamma(p)
\end{pmatrix}.
$$
$\gamma(0)$ で割れば自己相関だけを使った式
$$
\begin{pmatrix}
1&\rho(1)&\cdots&\rho(p-1)\\
\rho(1)&1&\cdots&\rho(p-2)\\
\vdots&\vdots&\ddots&\vdots\\
\rho(p-1)&\rho(p-2)&\cdots&1
\end{pmatrix}
\begin{pmatrix}
\phi_1\\\phi_2\\\vdots\\\phi_p
\end{pmatrix}
=
\begin{pmatrix}
\rho(1)\\\rho(2)\\\vdots\\\rho(p)
\end{pmatrix}
$$
になります。

つまりYule--Walker方程式は、**観測できる自己相関の形からAR係数を逆算するための連立方程式**でもあります。

なお $k=0$ だけは注意が必要です。このとき $X_t$ 自身に $\varepsilon_t$ が含まれるので
$$
\operatorname{Cov}(\varepsilon_t,X_t)=\sigma_\varepsilon^2
$$
であり、
$$
\gamma(0)=\phi_1\gamma(1)+\cdots+\phi_p\gamma(p)+\sigma_\varepsilon^2
$$
となります。係数を求めた後でinnovation分散を求めるときに使えます。

#### AR多項式と「単位円の外側」

まずAR(1)
$$
X_t=\phi X_{t-1}+\varepsilon_t
$$
を何度も代入してみます。すると
$$
X_t
=\varepsilon_t+\phi\varepsilon_{t-1}+\phi^2\varepsilon_{t-2}+\cdots
$$
となります。$|\phi|<1$ なら $\phi^j\to0$ なので、**昔のショックほど現在への影響が小さくなります**。そのため、遠い過去の影響が際限なく増幅することなく、分散も有限に保たれます。

AR(p)でも本質は同じです。AR多項式
$$
1-\phi_1z-\cdots-\phi_pz^p
$$
の零点がすべて
$$
|z|>1
$$
にあることが、AR(1)の $|\phi|<1$ に対応する一般的な条件です。

つまり、**「零点が単位円の外側にある」とは、過去の影響が時間とともに弱まり、現在値を過去のショックの安定した重み付き和として表せるための条件**だと考えればよいです。この条件を満たすAR過程は、過去から未来へ通常の向きに生成でき、平均・分散・自己共分散が時間とともに暴れない弱定常な解を持ちます。これを教科書では「因果的な弱定常解を持つ」と表現します。

AR(1)ならAR多項式は $1-\phi z$ で、零点は
$$
z=\frac1\phi
$$
です。したがって
$$
|z|>1
\iff
\left|\frac1\phi\right|>1
\iff
|\phi|<1,
$$
となり、いつものAR(1)の定常条件と一致します。

## 4. 移動平均過程

### 4.1 MA(1)の自己共分散

$$
X_t=\mu+\varepsilon_t+\theta\varepsilon_{t-1}
$$
とします。中心化後の分散は
$$
\begin{aligned}
\gamma(0)
&=\operatorname{Var}(\varepsilon_t+\theta\varepsilon_{t-1})\\
&=\sigma_\varepsilon^2+\theta^2\sigma_\varepsilon^2\\
&=(1+\theta^2)\sigma_\varepsilon^2.
\end{aligned}
$$
ラグ1では共通して含まれるショックが $\varepsilon_{t-1}$ だけなので
$$
\gamma(1)=\theta\sigma_\varepsilon^2.
$$
ラグ2以上では共通する白色雑音がないため
$$
\gamma(h)=0\qquad(|h|\ge2).
$$
したがってMA(1)の自己相関関数はラグ1で打ち切られ、
$$
\rho(1)=\frac{\theta}{1+\theta^2},\qquad \rho(h)=0\quad(|h|\ge2)
$$
です。

### 4.2 反転可能性は何を「反転」するのか

ここは定常性と混同しやすい箇所です。有限次数のMA過程
$$
X_t=\varepsilon_t+\theta\varepsilon_{t-1}
$$
は、白色雑音から作る限り $\theta$ の大きさにかかわらず弱定常です。**反転可能性は定常性の条件ではありません。**

では何を反転するのでしょうか。モデル式をinnovationについて解くと
$$
\varepsilon_t=X_t-\theta\varepsilon_{t-1}.
$$
さらに1期前の式
$$
\varepsilon_{t-1}=X_{t-1}-\theta\varepsilon_{t-2}
$$
を代入すると
$$
\varepsilon_t=X_t-\theta X_{t-1}+\theta^2\varepsilon_{t-2}.
$$
これを繰り返すと
$$
\varepsilon_t
=X_t-\theta X_{t-1}+\theta^2X_{t-2}-\theta^3X_{t-3}+\cdots.
$$
この級数が安定して収束するには
$$
|\theta|<1
$$
が必要です。このとき、現在のinnovationを現在・過去の観測値から一意かつ安定に復元できます。これがMA(1)の **反転可能性（invertibility）** です。

同じことを後退作用素 $B$ で書けば
$$
X_t=(1+\theta B)\varepsilon_t
$$
なので
$$
\varepsilon_t=(1+\theta B)^{-1}X_t
=(1-\theta B+\theta^2B^2-\cdots)X_t.
$$
「MA多項式を逆数の級数に展開できる」という意味で反転可能と呼ばれます。

#### なぜ反転可能な表現に限定するのか

MA(1)では
$$
\rho(1)=\frac{\theta}{1+\theta^2}
$$
なので、$\theta$ と $1/\theta$ は同じ自己相関を与えます。例えば $\theta=2$ と $\theta=1/2$ はどちらも
$$
\rho(1)=\frac25
$$
です。innovation分散を調整すれば自己共分散関数全体も一致します。

このままでは同じ二次モーメント構造に複数のMA表現が対応してしまいます。そこで根が単位円の外側にある表現だけを採用します。本章の符号規約
$$
1+\theta z=0
$$
では根は $z=-1/\theta$ なので、
$$
|z|>1\iff |\theta|<1.
$$

一般のMA(q)
$$
X_t=(1+\theta_1B+\cdots+\theta_qB^q)\varepsilon_t
$$
でも、MA多項式
$$
1+\theta_1z+\cdots+\theta_qz^q
$$
の零点がすべて単位円の外側にあることが反転可能性の条件です。

> **ARの単位円条件とMAの単位円条件は似ていますが役割が違います。** AR側は過去innovationによる因果的・定常な表現を保証し、MA側は観測値からinnovationを逆に復元できる表現を保証します。

## 5. 自己相関・偏自己相関とコレログラム

### 5.1 偏自己相関は「途中のラグを取り除いた相関」

ラグ $h$ の自己相関 $\rho(h)$ は $X_t$ と $X_{t-h}$ の単純な相関です。しかし、例えばAR(1)
$$
X_t=\phi X_{t-1}+\varepsilon_t
$$
では、$X_t$ と $X_{t-2}$ も相関します。これは $X_{t-2}\to X_{t-1}\to X_t$ という間接的なつながりだけでも生じます。

そこで、$X_{t-1},\ldots,X_{t-h+1}$ の線形な影響を両側から取り除いた後の $X_t$ と $X_{t-h}$ の相関を見るのが **偏自己相関（PACF）** です。

特にラグ2では、3変量の偏相関の公式から
$$
\alpha(2)
=\frac{\rho(2)-\rho(1)^2}{1-\rho(1)^2}.
$$
AR(1)なら $\rho(2)=\rho(1)^2$ なので
$$
\alpha(2)=0.
$$
つまりラグ2の単純な自己相関は残っていても、ラグ1の影響を除けば直接の線形関係は残りません。

より一般には、$X_t$ を
$$
X_{t-1},\ldots,X_{t-h}
$$
で線形予測したときの最後の係数を $\phi_{hh}$ とすると、ラグ $h$ のPACFは
$$
\alpha(h)=\phi_{hh}
$$
です。この係数はAR(h)のYule--Walker方程式を解けば得られます。したがって **Yule--WalkerとPACFは別々の暗記事項ではなく、同じ線形予測問題の表裏**です。

### 5.2 AR・MAで「打ち切り」が逆になる理由

典型的には次の形を使います。

- **AR(p)**: ACFは漸化式を満たして徐々に減衰する。一方PACFはラグ $p$ を超えると0になる。
- **MA(q)**: $q$ 期を超えると共通するinnovationがなくなるためACFがラグ $q$ で打ち切られる。一方PACFは一般に徐々に減衰する。
- **ARMA(p,q)**: ACF・PACFとも一般には徐々に減衰する。

「ARはPACFが切れる、MAはACFが切れる」を丸暗記するより、

1. MAは共通ショックがなくなるのでACFが切れる。
2. ARは中間ラグを条件づければ、次数を超えた直接効果が消えるのでPACFが切れる。

と考えると整理しやすくなります。

### 5.3 コレログラムを実際に読む

ラグを横軸、標本ACFまたは標本PACFを縦軸にして棒で描いた図を **コレログラム** と呼びます。実データでは理論値どおりに0になるのではなく、標本変動で小さな棒が残ります。

白色雑音を基準にした粗い目安として、標本サイズ $n$ が十分大きいとき
$$
\pm\frac{1.96}{\sqrt n}
$$
を「0と区別しにくい範囲」の目安として図に破線で描くことがあります。ただし各ラグを独立に検定しているわけではなく、これはモデル次数を考えるための診断的な目安です。

以下は理論形を強調した模式的なコレログラムです。棒の長さは相関の絶対値を表します。

**AR(1), $\phi=0.7$**

```text
ACF
lag 1 | +██████████████  0.70
lag 2 | +██████████      0.49
lag 3 | +███████         0.34
lag 4 | +█████           0.24
lag 5 | +███             0.17

PACF
lag 1 | +██████████████  0.70
lag 2 |                  0
lag 3 |                  0
lag 4 |                  0
lag 5 |                  0
```

ACFは尾を引き、PACFはラグ1で打ち切られます。

**MA(1), $\theta=0.7$**

```text
ACF
lag 1 | +█████████       0.47
lag 2 |                  0
lag 3 |                  0
lag 4 |                  0
lag 5 |                  0

PACF
lag 1 | +█████████       0.47
lag 2 | -██████         -0.28
lag 3 | +████            0.19
lag 4 | -███            -0.13
lag 5 | +██              0.09
```

今度はACFがラグ1で打ち切られ、PACFが符号を変えながら徐々に減衰します。

この違いが、実際のコレログラムからARかMAかの第一候補を考える基本です。ただし、短い標本、係数が0に近い場合、ARMA、季節性などでは見分けが曖昧になります。最終的には残差診断や情報量規準なども併用します。

## 6. 差分とARIMA

後退作用素 $B$ を
$$
BX_t=X_{t-1}
$$
と定義します。1階差分は
$$
\Delta X_t=X_t-X_{t-1}=(1-B)X_t.
$$
$d$ 回差分した系列 $(1-B)^dX_t$ がARMA(p,q)に従うとき、元系列をARIMA(p,d,q)と呼びます。

例えばランダムウォーク
$$
X_t=X_{t-1}+\varepsilon_t
$$
は非定常ですが
$$
\Delta X_t=\varepsilon_t
$$
なのでARIMA(0,1,0)です。

## 7. AR(1)の予測

定常AR(1)
$$
X_t-\mu=\phi(X_{t-1}-\mu)+\varepsilon_t
$$
で、時点 $t$ まで観測済みとします。1期先予測は
$$
\hat X_{t+1\mid t}=\mu+\phi(X_t-\mu).
$$
反復すると
$$
\hat X_{t+h\mid t}=\mu+\phi^h(X_t-\mu).
$$

予測誤差は
$$
X_{t+h}-\hat X_{t+h\mid t}
=\sum_{j=0}^{h-1}\phi^j\varepsilon_{t+h-j}
$$
なので、白色雑音が独立なら
$$
\operatorname{Var}(X_{t+h}-\hat X_{t+h\mid t})
=\sigma_\varepsilon^2\sum_{j=0}^{h-1}\phi^{2j}.
$$

---

## 8. 演習：問題の直後に解答

### Level A：基礎部品

#### E2-03-A01 標本自己相関
- Level: A
- 目安時間: 8分
- 主題: 標本自己相関
- 使用技術: 平均、積和
- calculation_load: low

観測値が $(1,2,3,4)$ である。本章の定義
$$
\hat\gamma(h)=\frac14\sum_{t=h+1}^4(x_t-\bar x)(x_{t-h}-\bar x)
$$
を用いて、$\hat\gamma(0)$、$\hat\gamma(1)$、$\hat\rho(1)$ を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

平均は $\bar x=2.5$。したがって
$$
\hat\gamma(0)=\frac{(-1.5)^2+(-0.5)^2+0.5^2+1.5^2}{4}=\frac54.
$$
ラグ1では
$$
\begin{aligned}
\hat\gamma(1)
&=\frac{(-0.5)(-1.5)+(0.5)(-0.5)+(1.5)(0.5)}4\\
&=\frac{5}{16}.
\end{aligned}
$$
よって
$$
\hat\rho(1)=\frac{5/16}{5/4}=\frac14.
$$

###### 本番答案

$\bar x=2.5$、$\hat\gamma(0)=5/4$、$\hat\gamma(1)=5/16$ より $\hat\rho(1)=1/4$。

###### 採点基準

平均4点、$\hat\gamma(0)$6点、$\hat\gamma(1)$6点、自己相関4点。合計20点。

<!-- solution-end -->

#### E2-03-A02 AR(1)の平均・分散
- Level: A
- 目安時間: 8分
- 主題: AR(1)
- 使用技術: 期待値、分散
- calculation_load: low

白色雑音 $\{\varepsilon_t\}$ は平均0、分散3とする。弱定常な過程
$$
X_t=2+0.5X_{t-1}+\varepsilon_t
$$
の平均と分散を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

平均を $\mu$ とすると
$$
\mu=2+0.5\mu
$$
なので $\mu=4$。中心化した $Y_t=X_t-4$ は
$$Y_t=0.5Y_{t-1}+\varepsilon_t.$$
よって分散 $\gamma(0)$ は
$$
\gamma(0)=0.5^2\gamma(0)+3
$$
を満たし、
$$
\gamma(0)=\frac3{1-0.25}=4.
$$

###### 本番答案

$\mu=2+0.5\mu$ より $\mu=4$。中心化して $\gamma(0)=0.25\gamma(0)+3$ より $\gamma(0)=4$。

###### 採点基準

平均8点、中心化4点、分散方程式4点、分散4点。合計20点。

<!-- solution-end -->

#### E2-03-A03 MA(1)の自己共分散
- Level: A
- 目安時間: 8分
- 主題: MA(1)
- 使用技術: 共分散
- calculation_load: low

独立な白色雑音の分散を4とし、
$$
X_t=\varepsilon_t+0.5\varepsilon_{t-1}
$$
とする。$\gamma(0),\gamma(1),\gamma(2),\rho(1)$ を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

独立性から交差共分散は0なので
$$
\gamma(0)=4+0.5^2\cdot4=5.
$$
$X_t$ と $X_{t-1}$ に共通するのは $\varepsilon_{t-1}$ で、係数はそれぞれ $0.5,1$ だから
$$
\gamma(1)=0.5\cdot4=2.
$$
ラグ2では共通する白色雑音がないため $\gamma(2)=0$。したがって
$$
\rho(1)=\frac25.
$$

###### 本番答案

$\gamma(0)=5$、$\gamma(1)=2$、$\gamma(2)=0$、$\rho(1)=2/5$。

###### 採点基準

分散6点、ラグ1共分散6点、ラグ2共分散4点、相関4点。合計20点。

<!-- solution-end -->

#### E2-03-A04 差分とARIMA
- Level: A
- 目安時間: 7分
- 主題: 差分
- 使用技術: 後退作用素
- calculation_load: low

$X_t=X_{t-1}+\varepsilon_t$ とする。ただし $\{\varepsilon_t\}$ は白色雑音である。$\Delta X_t$ を求め、この過程のARIMA次数を答えよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

$$
\Delta X_t=X_t-X_{t-1}=\varepsilon_t.
$$
1階差分するとARMA(0,0)、すなわち白色雑音になるので、元系列はARIMA(0,1,0)である。

###### 本番答案

$\Delta X_t=\varepsilon_t$。したがってARIMA(0,1,0)。

###### 採点基準

差分10点、次数10点。合計20点。

<!-- solution-end -->

### Level B：標準技能

#### E2-03-B01 AR(1)の自己相関を導く
- Level: B
- 目安時間: 12分
- 主題: AR(1)
- 使用技術: 共分散漸化式
- calculation_load: medium

平均0の弱定常過程
$$
X_t=\phi X_{t-1}+\varepsilon_t,\qquad |\phi|<1
$$
を考える。白色雑音 $\varepsilon_t$ は過去の $X_{t-h}$ と無相関とする。$\rho(h)=\phi^{|h|}$ を導け。

<!-- solution-start -->

##### 解答

###### 詳細解答

$h\ge1$ について
$$
\begin{aligned}
\gamma(h)
&=\operatorname{Cov}(X_t,X_{t-h})\\
&=\operatorname{Cov}(\phi X_{t-1}+\varepsilon_t,X_{t-h})\\
&=\phi\operatorname{Cov}(X_{t-1},X_{t-h})\\
&=\phi\gamma(h-1).
\end{aligned}
$$
最後から2行目では $\operatorname{Cov}(\varepsilon_t,X_{t-h})=0$ を使った。反復すると
$$
\gamma(h)=\phi^h\gamma(0).
$$
したがって
$$
\rho(h)=\frac{\gamma(h)}{\gamma(0)}=\phi^h
$$
であり、対称性 $\rho(-h)=\rho(h)$ から $\rho(h)=\phi^{|h|}$。

###### 本番答案

$\gamma(h)=\operatorname{Cov}(\phi X_{t-1}+\varepsilon_t,X_{t-h})=\phi\gamma(h-1)$。反復して $\gamma(h)=\phi^h\gamma(0)$、よって $\rho(h)=\phi^{|h|}$。

###### 採点基準

共分散の出発式5点、白色雑音項が消える理由5点、漸化式5点、結論5点。合計20点。

<!-- solution-end -->

#### E2-03-B02 AR(2)のYule--Walker方程式とPACF
- Level: B
- 目安時間: 15分
- 主題: AR(2)、偏自己相関
- 使用技術: Yule--Walker方程式
- calculation_load: medium

平均0の弱定常AR(2)
$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t
$$
を考える。

1. $k=1,2$ のYule--Walker方程式を書け。
2. $\rho(1),\rho(2)$ を求めよ。
3. ラグ2の偏自己相関 $\alpha(2)$ を求め、AR(2)の第2係数との関係を確認せよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

一般式
$$
\gamma(k)=0.5\gamma(k-1)+0.2\gamma(k-2)
$$
に $k=1$ を入れ、$\gamma(-1)=\gamma(1)$ を使うと
$$
\gamma(1)=0.5\gamma(0)+0.2\gamma(1).
$$
$\gamma(0)$ で割って
$$
\rho(1)=0.5+0.2\rho(1),
$$
したがって
$$
\rho(1)=\frac58=0.625.
$$

$k=2$ では
$$
\rho(2)=0.5\rho(1)+0.2
=0.5\cdot0.625+0.2=0.5125.
$$

ラグ2の偏自己相関は
$$
\alpha(2)=\frac{\rho(2)-\rho(1)^2}{1-\rho(1)^2}.
$$
ここに数値を代入すると
$$
\alpha(2)
=\frac{0.5125-0.625^2}{1-0.625^2}
=\frac{0.121875}{0.609375}
=0.2.
$$
真のAR(2)の最後の係数 $\phi_2=0.2$ と一致する。これはPACFがAR(h)のYule--Walker方程式を解いたときの最後の係数であることの具体例である。

###### 本番答案

$\rho(1)=0.5+0.2\rho(1)$ より $\rho(1)=0.625$、$\rho(2)=0.5\rho(1)+0.2=0.5125$。さらに $\alpha(2)=(\rho(2)-\rho(1)^2)/(1-\rho(1)^2)=0.2=\phi_2$。

###### 採点基準

Yule--Walker方程式6点、$\rho(1)$4点、$\rho(2)$4点、PACF計算4点、係数との関係2点。合計20点。

<!-- solution-end -->

#### E2-03-B03 MA(1)の反転可能性
- Level: B
- 目安時間: 16分
- 主題: MA(1)
- 使用技術: 自己共分散比較、反復代入
- calculation_load: medium

白色雑音の分散を $\sigma^2$ とし、
$$X_t=\varepsilon_t+2\varepsilon_{t-1}$$
とする。

1. $\rho(1)$ を求めよ。
2. $\tilde X_t=\tilde\varepsilon_t+0.5\tilde\varepsilon_{t-1}$ とし、$\operatorname{Var}(\tilde\varepsilon_t)=4\sigma^2$ とすると、$X_t$ と $\tilde X_t$ の自己共分散が一致することを示せ。
3. 一般のMA(1) $X_t=\varepsilon_t+\theta\varepsilon_{t-1}$ について、反復代入により
$$
\varepsilon_t=X_t-\theta X_{t-1}+\theta^2X_{t-2}-\cdots
$$
を導き、この展開が安定する条件を述べよ。
4. 反転可能な表現として係数2と0.5のどちらを選ぶか、その理由とともに答えよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

$X_t$ では
$$
\gamma(0)=5\sigma^2,\qquad \gamma(1)=2\sigma^2,
$$
したがって
$$
\rho(1)=\frac25.
$$

一方、$\tilde X_t$ では
$$
\tilde\gamma(0)=4\sigma^2(1+0.5^2)=5\sigma^2,
$$
$$
\tilde\gamma(1)=0.5\cdot4\sigma^2=2\sigma^2,
$$
ラグ2以上はいずれも0なので自己共分散関数は一致する。

一般のMA(1)について
$$
\varepsilon_t=X_t-\theta\varepsilon_{t-1}
$$
であり、1期前の式を順に代入すると、任意の $m\ge0$ について
$$
\varepsilon_t
=\sum_{j=0}^{m}(-\theta)^jX_{t-j}
+(-\theta)^{m+1}\varepsilon_{t-m-1}.
$$
$|\theta|<1$ なら最後の項が $m\to\infty$ で消え、
$$
\varepsilon_t=\sum_{j=0}^{\infty}(-\theta)^jX_{t-j}
$$
と過去観測からinnovationを安定に復元できる。

したがって係数2の表現は反転可能でなく、係数0.5の表現を選ぶ。

###### 本番答案

$\rho(1)=2/5$。係数0.5、雑音分散 $4\sigma^2$ の表現でも $(\gamma(0),\gamma(1))=(5\sigma^2,2\sigma^2)$。また $\varepsilon_t=\sum_{j\ge0}(-\theta)^jX_{t-j}$ は $|\theta|<1$ で安定するため、反転可能な表現は $\theta=0.5$。

###### 採点基準

元表現4点、代替表現5点、反復展開6点、反転可能性の判定と意味5点。合計20点。

<!-- solution-end -->

#### E2-03-B04 AR(1)の予測誤差分散
- Level: B
- 目安時間: 12分
- 主題: 予測
- 使用技術: 独立和の分散
- calculation_load: medium

平均0のAR(1)
$$
X_t=0.5X_{t-1}+\varepsilon_t,\qquad \operatorname{Var}(\varepsilon_t)=4
$$
について、2期先予測 $\hat X_{t+2\mid t}$ と予測誤差分散を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

1期先は $\hat X_{t+1\mid t}=0.5X_t$、2期先は
$$
\hat X_{t+2\mid t}=0.5^2X_t=0.25X_t.
$$
実際には
$$
X_{t+2}=0.25X_t+0.5\varepsilon_{t+1}+\varepsilon_{t+2}.
$$
よって予測誤差は
$$
0.5\varepsilon_{t+1}+\varepsilon_{t+2}.
$$
独立性から
$$
\operatorname{Var}=0.5^2\cdot4+4=5.
$$

###### 本番答案

$\hat X_{t+2\mid t}=0.25X_t$。誤差は $0.5\varepsilon_{t+1}+\varepsilon_{t+2}$ なので分散は5。

###### 採点基準

予測8点、誤差表示6点、分散6点。合計20点。

<!-- solution-end -->

### Level C：本番標準

#### E2-03-C01 AR(2)係数を自己相関から求める
- Level: C
- 目安時間: 20分
- 主題: AR(2)
- 使用技術: Yule--Walker連立方程式
- calculation_load: medium

平均0の弱定常AR(2)
$$
X_t=\phi_1X_{t-1}+\phi_2X_{t-2}+\varepsilon_t
$$
について、$\rho(1)=0.6,\rho(2)=0.4$ が与えられた。$\phi_1,\phi_2$ を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

Yule--Walker方程式から
$$
\rho(1)=\phi_1+\phi_2\rho(1),
$$
$$
\rho(2)=\phi_1\rho(1)+\phi_2.
$$
数値を代入すると
$$
0.6=\phi_1+0.6\phi_2,
$$
$$
0.4=0.6\phi_1+\phi_2.
$$
第一式から $\phi_1=0.6-0.6\phi_2$。第二式へ代入して
$$
0.4=0.36-0.36\phi_2+\phi_2
=0.36+0.64\phi_2.
$$
よって
$$
\phi_2=0.0625,\qquad \phi_1=0.5625.
$$

###### 本番答案

$0.6=\phi_1+0.6\phi_2$、$0.4=0.6\phi_1+\phi_2$ を解き、$(\phi_1,\phi_2)=(0.5625,0.0625)$。

###### 採点基準

方程式2本10点、代入計算6点、係数4点。合計20点。

<!-- solution-end -->

#### E2-03-C02 コレログラムからモデル候補を選ぶ
- Level: C
- 目安時間: 22分
- 主題: モデル識別
- 使用技術: ACF・PACF、コレログラム
- calculation_load: low

弱定常とみなせる3系列A,B,Cについて、十分大きい標本から次のコレログラムが得られた。本文5.3と同様に、棒の長さは相関の絶対値、`+` と `-` は符号を表す。0付近の短い棒は標本変動の範囲内と考えてよい。

**系列A**

```text
ACF
lag 1 | +██████████████  0.70
lag 2 | +██████████      0.49
lag 3 | +███████         0.34
lag 4 | +█████           0.24
lag 5 | +███             0.17

PACF
lag 1 | +██████████████  0.70
lag 2 | +                0.02
lag 3 | -               -0.01
lag 4 | +                0.01
lag 5 |                  0.00
```

**系列B**

```text
ACF
lag 1 | +█████████       0.47
lag 2 | +                0.02
lag 3 | -               -0.01
lag 4 | +                0.01
lag 5 |                  0.00

PACF
lag 1 | +█████████       0.47
lag 2 | -██████         -0.28
lag 3 | +████            0.19
lag 4 | -███            -0.13
lag 5 | +██              0.09
```

**系列C**

```text
ACF
lag 1 | +█████████████   0.65
lag 2 | +████████        0.38
lag 3 | +█████           0.22
lag 4 | +███             0.13
lag 5 | +██              0.08

PACF
lag 1 | +███████████     0.55
lag 2 | -████           -0.22
lag 3 | +██              0.12
lag 4 | -█              -0.06
lag 5 | +█               0.03
```

1. A,B,Cそれぞれについて、第一候補を AR(1)、MA(1)、ARMA(1,1) から選べ。
2. AとBについて、どのコレログラムが「打ち切られている」かを述べ、その理由をモデル構造から説明せよ。
3. 標本サイズが $n=400$ のとき、白色雑音を基準にした $\pm1.96/\sqrt n$ の目安を数値で求めよ。この線を超えた棒だけでモデル次数を機械的に確定してよいか、簡潔に答えよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

AではACFが尾を引き、PACFがラグ1で打ち切られているのでAR(1)が第一候補である。AR(1)ではラグ2以降の相関は $X_{t-1}$ を介した間接効果で説明できるため、途中のラグを調整したPACFはラグ1より先で0になる。

BではACFがラグ1で打ち切られ、PACFが減衰しているためMA(1)が第一候補である。MA(1)では $X_t$ と $X_{t-h}$ が共有するinnovationは $h=1$ までで、$h\ge2$ では共通ショックがないため理論ACFが0になる。

CではACF・PACFとも尾を引いているのでARMA(1,1)が第一候補である。

$n=400$ なら
$$
\frac{1.96}{\sqrt{400}}=\frac{1.96}{20}=0.098\approx0.10.
$$
したがって概算の目安は約 $\pm0.10$。ただしこれは各ラグを独立に厳密検定する線ではなく、複数ラグを眺める診断の目安である。短標本、係数の相殺、ARMA、季節性などで形が曖昧になるため、残差診断や情報量規準などと合わせて判断する。

###### 本番答案

A: AR(1)、B: MA(1)、C: ARMA(1,1)。AはPACFがラグ1で、BはACFがラグ1で打ち切られる。$n=400$ の目安は $\pm0.098\approx\pm0.10$ であり、この線だけで次数を機械的に確定してはいけない。

###### 採点基準

モデル識別9点、Aの理由3点、Bの理由3点、目安の計算3点、診断上の注意2点。合計20点。

<!-- solution-end -->

#### E2-03-C03 ARIMAの次数と予測
- Level: C
- 目安時間: 22分
- 主題: ARIMA
- 使用技術: 差分、AR予測
- calculation_load: medium

$$
X_t=X_{t-1}+Y_t,\qquad
Y_t=0.6Y_{t-1}+\varepsilon_t
$$
とする。$\{\varepsilon_t\}$ は平均0の白色雑音である。

1. $X_t$ のARIMA次数を答えよ。
2. $Y_t$ の自己相関関数を求めよ。
3. 現在 $Y_t=5$ のとき、$Y_{t+1},Y_{t+2}$ の条件付き平均を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

$\Delta X_t=X_t-X_{t-1}=Y_t$ であり、$Y_t$ はAR(1)だから
$$X_t\text{ は ARIMA}(1,1,0).$$
AR(1)より
$$
\rho_Y(h)=0.6^{|h|}.
$$
予測では将来の白色雑音の条件付き平均は0なので
$$
E[Y_{t+1}\mid\mathcal F_t]=0.6\cdot5=3,
$$
$$
E[Y_{t+2}\mid\mathcal F_t]=0.6^2\cdot5=1.8.
$$

###### 本番答案

$\Delta X_t=Y_t$ がAR(1)なのでARIMA(1,1,0)。$\rho_Y(h)=0.6^{|h|}$。1期先3、2期先1.8。

###### 採点基準

次数7点、自己相関6点、予測7点。合計20点。

<!-- solution-end -->

#### E2-03-C04 AR(1)の予測区間の幅
- Level: C
- 目安時間: 22分
- 主題: 予測誤差
- 使用技術: 幾何級数
- calculation_load: medium

正規白色雑音をもつ平均0のAR(1)
$$
X_t=\phi X_{t-1}+\varepsilon_t,\qquad |\phi|<1,\qquad
\varepsilon_t\sim N(0,\sigma^2)
$$
を考える。

1. $h$期先の予測誤差分散を導け。
2. $h\to\infty$ でその分散が定常分散へ近づくことを示せ。

<!-- solution-start -->

##### 解答

###### 詳細解答

反復すると
$$
X_{t+h}=\phi^hX_t+\sum_{j=0}^{h-1}\phi^j\varepsilon_{t+h-j}.
$$
予測値は $\phi^hX_t$ なので誤差は和の部分。独立性から
$$
V_h=\sigma^2\sum_{j=0}^{h-1}\phi^{2j}
=\sigma^2\frac{1-\phi^{2h}}{1-\phi^2}.
$$
$|\phi|<1$ だから $\phi^{2h}\to0$。したがって
$$
V_h\to\frac{\sigma^2}{1-\phi^2},
$$
これはAR(1)の定常分散である。

###### 本番答案

$X_{t+h}-\hat X_{t+h\mid t}=\sum_{j=0}^{h-1}\phi^j\varepsilon_{t+h-j}$ より $V_h=\sigma^2(1-\phi^{2h})/(1-\phi^2)$。極限は $\sigma^2/(1-\phi^2)$。

###### 採点基準

反復表示6点、分散6点、幾何級数4点、極限4点。合計20点。

<!-- solution-end -->

#### E2-03-C05 AR(2)の定常性判定
- Level: C
- 目安時間: 20分
- 主題: AR(2)
- 使用技術: 特性方程式
- calculation_load: medium

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t
$$
のAR多項式 $1-0.5z-0.2z^2$ の零点を求め、因果的弱定常解を持つための条件を満たすか判定せよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

$$
1-0.5z-0.2z^2=0
$$
は
$$
0.2z^2+0.5z-1=0
$$
と同値。二次方程式より
$$
z=\frac{-0.5\pm\sqrt{0.25+0.8}}{0.4}
=\frac{-0.5\pm\sqrt{1.05}}{0.4}.
$$
数値的には約
$$
1.31,\qquad -3.81.
$$
両方とも絶対値が1より大きいので、零点は単位円の外側にあり、因果的弱定常解を持つ条件を満たす。

###### 本番答案

零点は $(-0.5\pm\sqrt{1.05})/0.4\approx1.31,-3.81$。ともに絶対値1超なので定常条件を満たす。

###### 採点基準

方程式変形4点、零点8点、絶対値判定4点、結論4点。合計20点。

<!-- solution-end -->

### Level D：発展

#### E2-03-D01 ARMA(1,1)の自己共分散
- Level: D
- 目安時間: 35分
- 主題: ARMA
- 使用技術: 無限MA表示、共分散
- calculation_load: high

平均0の過程
$$
X_t=\phi X_{t-1}+\varepsilon_t+\theta\varepsilon_{t-1},
\qquad |\phi|<1
$$
を考える。$\{\varepsilon_t\}$ は独立で平均0、分散 $\sigma^2$ とする。

1. $X_t$ を現在と過去の白色雑音の和として表せ。
2. $\gamma(0)$ を求めよ。
3. $\gamma(1)=\phi\gamma(0)+\theta\sigma^2$ を示せ。
4. $h\ge2$ で $\gamma(h)=\phi\gamma(h-1)$ を示せ。

<!-- solution-start -->

##### 解答

###### 詳細解答

反復代入すると
$$
X_t=\varepsilon_t+(\phi+\theta)\varepsilon_{t-1}
+\phi(\phi+\theta)\varepsilon_{t-2}+\cdots.
$$
したがって係数は、ラグ0で1、ラグ $j\ge1$ で $\phi^{j-1}(\phi+\theta)$。

独立性から分散は係数二乗和なので
$$
\begin{aligned}
\gamma(0)
&=\sigma^2\left[1+(\phi+\theta)^2\sum_{j=0}^{\infty}\phi^{2j}\right]\\
&=\sigma^2\left[1+\frac{(\phi+\theta)^2}{1-\phi^2}\right]\\
&=\sigma^2\frac{1+\theta^2+2\phi\theta}{1-\phi^2}.
\end{aligned}
$$

元のモデルと $X_{t-1}$ の共分散を取ると
$$
\gamma(1)
=\phi\gamma(0)
+\operatorname{Cov}(\varepsilon_t,X_{t-1})
+\theta\operatorname{Cov}(\varepsilon_{t-1},X_{t-1}).
$$
第一の共分散は0。$X_{t-1}$ には $\varepsilon_{t-1}$ が係数1で含まれるので第二は $\sigma^2$。よって
$$
\gamma(1)=\phi\gamma(0)+\theta\sigma^2.
$$
$h\ge2$ では $X_{t-h}$ は $\varepsilon_t,\varepsilon_{t-1}$ のどちらとも無相関なので
$$
\gamma(h)=\phi\gamma(h-1).
$$

###### 本番答案

$X_t=\varepsilon_t+(\phi+\theta)\sum_{j\ge1}\phi^{j-1}\varepsilon_{t-j}$。係数二乗和より $\gamma(0)=\sigma^2(1+\theta^2+2\phi\theta)/(1-\phi^2)$。共分散を取れば $\gamma(1)=\phi\gamma(0)+\theta\sigma^2$、$h\ge2$ では $\gamma(h)=\phi\gamma(h-1)$。

###### 採点基準

無限表示5点、$\gamma(0)$7点、$\gamma(1)$5点、高ラグ漸化式3点。合計20点。

<!-- solution-end -->

## 9. 30分ドリル

### E2-03-DRILL-01 差分・自己相関・予測をつなぐ

平均0の白色雑音 $\varepsilon_t$ の分散を4とし、
$$
(1-0.5B)(1-B)X_t=\varepsilon_t
$$
とする。

1. $Y_t=\Delta X_t$ とおき、$Y_t$ のモデルを書け。
2. $X_t$ のARIMA次数を答えよ。
3. $Y_t$ の定常分散と $\rho_Y(1),\rho_Y(2)$ を求めよ。
4. 現在 $Y_t=6$ のとき、1期先・2期先の条件付き平均を求めよ。
5. 2期先予測誤差分散を求めよ。

<!-- solution-start -->

##### 解答

###### 詳細解答

$(1-B)X_t=Y_t$ なので
$$
(1-0.5B)Y_t=\varepsilon_t,
$$
すなわち
$$
Y_t=0.5Y_{t-1}+\varepsilon_t.
$$
したがって $X_t$ はARIMA(1,1,0)。

AR(1)の定常分散は
$$
\operatorname{Var}(Y_t)=\frac4{1-0.5^2}=\frac{16}{3}.
$$
自己相関は
$$
\rho_Y(1)=0.5,\qquad \rho_Y(2)=0.25.
$$
予測は
$$
\hat Y_{t+1\mid t}=0.5\cdot6=3,
$$
$$
\hat Y_{t+2\mid t}=0.5^2\cdot6=1.5.
$$
2期先誤差は $0.5\varepsilon_{t+1}+\varepsilon_{t+2}$ なので
$$
\operatorname{Var}=0.25\cdot4+4=5.
$$

###### 本番答案

$Y_t=0.5Y_{t-1}+\varepsilon_t$、したがってARIMA(1,1,0)。$\operatorname{Var}(Y_t)=16/3$、$(\rho(1),\rho(2))=(0.5,0.25)$。予測は3、1.5、2期先誤差分散は5。

###### 採点基準

全100点。モデル化20点、次数15点、定常分散・自己相関25点、予測20点、予測誤差分散20点。

<!-- solution-end -->

## 10. 過去問との対応

統計応用（理工学）の「時系列解析・自己回帰過程・移動平均過程・ARIMA過程」を担当する。単なるモデル名の識別ではなく、自己共分散を定義から計算し、差分・Yule--Walker方程式・反転可能性・コレログラム・予測へ接続できることを重視する。

## 11. 章末チェック

- 弱定常性の2条件を説明できる。
- 標本自己相関と理論自己相関を区別できる。
- AR(1)の平均・分散・自己相関を導ける。
- AR(1)の共分散漸化式からAR(p)のYule--Walker方程式を導ける。
- Yule--Walker方程式を行列で書き、自己相関からAR係数を求められる。
- MA(1)で自己相関がラグ1で打ち切られる理由を説明できる。
- MA(1)の反転可能性を、観測値からinnovationを復元する無限級数で説明できる。
- ARの定常性条件とMAの反転可能性条件の役割の違いを説明できる。
- PACFを「中間ラグの影響を除いた相関」と説明し、Yule--Walkerとの関係を述べられる。
- ACF・PACFのコレログラムを見てAR・MA・ARMAの第一候補を判断できる。
- 差分からARIMA次数を判断できる。
- 多段階予測と予測誤差分散を計算できる。