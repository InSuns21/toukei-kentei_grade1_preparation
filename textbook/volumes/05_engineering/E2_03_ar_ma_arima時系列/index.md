# E2-03 AR・MA・ARIMA時系列

時系列では観測の順序そのものが情報を持ちます。昨日と今日の値が似る、ショックの影響が数期残る、トレンドがある、といった時間依存を無視して独立標本として扱うことはできません。本章ではまず定常性・自己共分散・自己相関を定義し、その後AR、MA、ARMA、ARIMAを「どの過去情報が現在へ残るか」という観点から組み立てます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 弱定常性を平均・自己共分散で判定する。
- AR(1)の平均、分散、自己相関を導く。
- MA(1)の自己共分散を導く。
- AR(p)のYule--Walker方程式を立てる。
- ARとMAをACF/PACFの形から区別する。
- 差分を用いてARIMAモデルを定義する。
- AR(1)の多段階予測を求める。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 時系列解析 | 定常性、自己共分散、自己相関 |
| 自己回帰過程 | AR(p)、Yule--Walker |
| 移動平均過程 | MA(q)、反転可能性 |
| ARIMA過程 | 差分、ARMAとの関係 |

## 前提知識チェック

1. P2-02: 期待値、分散、共分散。
2. P3-03: 正規ベクトルと共分散行列。
3. E2-01: 時間依存を条件付き分布で捉える考え方。
4. F0-00: 多項式の根、漸化式。

---

## 1. 導入

独立標本では $\operatorname{Cov}(X_t,X_{t-h})=0$ を期待するが、時系列ではむしろこの共分散が中心となる。例えば
$$X_t=0.8X_{t-1}+\varepsilon_t$$
なら、前期の値の80%が次期へ残る。一方
$$X_t=\varepsilon_t+0.8\varepsilon_{t-1}$$
なら、ショック $\varepsilon_{t-1}$ は1期だけ残る。前者がAR、後者がMAである。

## 2. 定義と記号

時系列 $\{X_t\}$ が弱定常であるとは
$$
E[X_t]=\mu\quad\text{が }t\text{ に依存せず},
$$
$$
\operatorname{Cov}(X_t,X_{t-h})=\gamma(h)\quad\text{が }t\text{ ではなくラグ }h\text{ のみで決まる}
$$
ことをいう。

自己相関関数は
$$
\rho(h)=\frac{\gamma(h)}{\gamma(0)}.
$$
白色雑音 $\{\varepsilon_t\}$ は
$$E[\varepsilon_t]=0,\quad \operatorname{Var}(\varepsilon_t)=\sigma_\varepsilon^2,\quad
\operatorname{Cov}(\varepsilon_t,\varepsilon_s)=0\ (t\ne s)$$
を満たす。

## 3. 定理・公式と導出

### 3.1 AR(1)

$$X_t=c+\phi X_{t-1}+\varepsilon_t.$$
弱定常を仮定して平均を取ると
$$
\mu=c+\phi\mu,
$$
したがって $|\phi|<1$ の定常解では
$$
\mu=\frac{c}{1-\phi}.
$$
中心化 $Y_t=X_t-\mu$ とすれば
$$Y_t=\phi Y_{t-1}+\varepsilon_t.$$
分散を取ると
$$
\gamma(0)=\phi^2\gamma(0)+\sigma_\varepsilon^2,
$$
よって
$$
\gamma(0)=\frac{\sigma_\varepsilon^2}{1-\phi^2}.
$$
さらに $h\ge1$ で
$$
\gamma(h)=\operatorname{Cov}(Y_t,Y_{t-h})=\phi\gamma(h-1)
$$
なので
$$
\gamma(h)=\phi^{|h|}\gamma(0),\qquad
\rho(h)=\phi^{|h|}.
$$
$\phi<0$ なら符号を交互に変えながら減衰する。

### 3.2 AR(p)とYule--Walker

$$
X_t=c+\phi_1X_{t-1}+\cdots+\phi_pX_{t-p}+\varepsilon_t.
$$
中心化後、両辺と $X_{t-k}$ の共分散を取ると $k\ge1$ で
$$
\gamma(k)=\phi_1\gamma(k-1)+\cdots+\phi_p\gamma(k-p).
$$
これがYule--Walker方程式である。定常性はAR多項式
$$
1-\phi_1z-\cdots-\phi_pz^p=0
$$
の根が全て単位円の外側にあることで判定できる。

### 3.3 MA(1)

$$X_t=\mu+\varepsilon_t+\theta\varepsilon_{t-1}.$$
白色雑音の無相関性から
$$
\gamma(0)=\sigma_\varepsilon^2(1+\theta^2),
$$
$$
\gamma(1)=\theta\sigma_\varepsilon^2,
$$
$$
\gamma(h)=0\qquad(|h|\ge2).
$$
したがってMA(1)のACFはラグ1で打ち切られる。MA(q)ではラグqより先のACFが0になる。

同じ自己共分散を与える別のMA表現を避けるため、MA多項式の根を単位円外に置く反転可能性を課す。

### 3.4 ACFとPACFの見分け

- AR(p): ACFは徐々に減衰し、PACFはラグpで打ち切られる。
- MA(q): ACFはラグqで打ち切られ、PACFは徐々に減衰する。
- ARMA: 多くの場合どちらも徐々に減衰する。

PACFは「途中のラグ1からh-1の線形な影響を取り除いた後の、$X_t$ と $X_{t-h}$ の相関」と考える。

### 3.5 ARIMA

後退作用素 $B$ を
$$BX_t=X_{t-1}$$
と定義する。1階差分は
$$
\Delta X_t=X_t-X_{t-1}=(1-B)X_t.
$$
$d$ 回差分した系列 $(1-B)^dX_t$ がARMA(p,q)に従うとき、元系列をARIMA(p,d,q)と呼ぶ。

例えばランダムウォーク
$$X_t=X_{t-1}+\varepsilon_t$$
は非定常だが
$$\Delta X_t=\varepsilon_t$$
なのでARIMA(0,1,0)である。

### 3.6 AR(1)の予測

定常AR(1)
$$X_t-\mu=\phi(X_{t-1}-\mu)+\varepsilon_t$$
で時点tまで観測したとき
$$
\hat X_{t+h\mid t}=\mu+\phi^h(X_t-\mu).
$$
$|\phi|<1$ なら遠い将来の予測は平均 $\mu$ へ戻る。

## 4. 典型例題

$X_t=0.5X_{t-1}+\varepsilon_t$、$\operatorname{Var}(\varepsilon_t)=3$ とする。
$$
\operatorname{Var}(X_t)=\frac3{1-0.25}=4,
$$
$$
\rho(1)=0.5,\quad \rho(2)=0.25.
$$
AR係数と自己相関を混同せず、AR(1)だからこそ $\rho(h)=\phi^{|h|}$ となる。

## 5. 演習

### E2-03-A01 MA(1)のACF

- Level: A
- 目安時間: 8分
- 主題: MA過程
- 使用技術: 共分散

$X_t=\varepsilon_t+0.5\varepsilon_{t-1}$、$\operatorname{Var}(\varepsilon_t)=4$ とする。$\gamma(0),\gamma(1),\rho(1)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$\gamma(0)=4(1+0.5^2)=5,$$
$$\gamma(1)=0.5\times4=2,$$
したがって
$$\rho(1)=2/5=0.4.$$

##### 本番答案

$\gamma(0)=5,\gamma(1)=2,\rho(1)=0.4$。

##### 採点基準

- 分散: 8点
- 共分散: 8点
- ACF: 4点

<!-- solution-end -->

### E2-03-B01 AR(1)の定常分散

- Level: B
- 目安時間: 10分
- 主題: AR過程
- 使用技術: 分散方程式

$X_t=2+0.8X_{t-1}+\varepsilon_t$、$\operatorname{Var}(\varepsilon_t)=9$ とする。定常平均と定常分散を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$\mu=2/(1-0.8)=10.$$
中心化するとAR係数0.8なので
$$\gamma(0)=9/(1-0.8^2)=9/0.36=25.$$

##### 本番答案

$\mu=10,\operatorname{Var}(X_t)=25$。

##### 採点基準

- 平均: 8点
- 中心化の理解: 4点
- 分散: 8点

<!-- solution-end -->

## 6. 本番ドリル

### E2-03-C01 ARIMAの識別と予測

$X_t=X_{t-1}+Y_t$、$Y_t=0.6Y_{t-1}+\varepsilon_t$ とする。(1) $X_t$ のARIMA次数を答えよ。(2) $Y_t$ のACFを求めよ。(3) $Y_t=5$ のとき1期先・2期先の条件付き平均を、平均0として求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\Delta X_t=Y_t$ がAR(1)なので $X_t$ はARIMA(1,1,0)。AR(1)のACFは
$$\rho(h)=0.6^{|h|}.$$
予測は
$$\hat Y_{t+1\mid t}=0.6\times5=3,$$
$$\hat Y_{t+2\mid t}=0.6^2\times5=1.8.$$

##### 本番答案

ARIMA(1,1,0)、$\rho(h)=0.6^{|h|}$、予測は3と1.8。

##### 採点基準

- 次数: 6点
- ACF: 6点
- 予測: 8点

<!-- solution-end -->

## 7. 過去問との対応

理工学の時系列解析、自己回帰過程、移動平均過程、ARIMA過程を担当する。AR/MAの公式を個別暗記するのではなく、白色雑音との共分散を取って自己共分散を導けることを重視する。

## 8. 章末チェック

- 弱定常性を平均一定・自己共分散がラグだけの関数として書ける。
- AR(1)の分散とACFを再帰式から導ける。
- MA(q)のACFがqで打ち切られる理由を説明できる。
- 差分して定常化する意味を説明できる。
- ARとMAの定常性・反転可能性を混同しない。
