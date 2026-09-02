# F0-02B1 SVM・凸包・最大マージン

F0-02Bで分離超平面定理とFarkasの補題を準備しました。この講義では同じ凸幾何をSVMの**データ側**へ適用します。

$$
\boxed{
\text{正負クラスの凸包}
\to\text{非交差}
\to\text{最近点対}
\to\text{最大マージン}
\to\text{双対変数の凸結合解釈}
}
$$

---

## 15. SVMの表側：線形分離と凸包

正例と負例の訓練点を

$$
X_+=\{x_i:y_i=+1\},
\qquad
X_-=\{x_i:y_i=-1\}
$$

とします。

それぞれの凸包を

$$
C_+=\operatorname{conv}(X_+),
\qquad
C_-=\operatorname{conv}(X_-)
$$

とします。

有限点集合の凸包はコンパクトです。

実際、係数単体

$$
\Delta
=\left\{
\theta:\theta_i\ge0,\ \sum_i\theta_i=1
\right\}
$$

は閉有界なのでコンパクトであり、連続写像

$$
\theta\mapsto\sum_i\theta_i x_i
$$

の像が凸包です。

したがって [F0-00C](../F0_00C_連続写像_コンパクト性_最大最小/index.md) の「連続像はコンパクト」が使えます。

---

## 16. 線形分離可能性と凸包の非交差

$$
\boxed{
X_+,X_-
\text{ が厳密に線形分離可能}
\Longleftrightarrow
C_+\cap C_-=\varnothing
}
$$

です。

### 16.1 線形分離可能なら凸包も交わらない

ある $w,b$ が存在して

$$
w^{\mathsf T}x_i+b>0
\qquad(y_i=+1),
$$

$$
w^{\mathsf T}x_i+b<0
\qquad(y_i=-1)
$$

とします。

正例凸包の任意の点

$$
p=\sum_{i:y_i=+1}\theta_i x_i
$$

について

$$
w^{\mathsf T}p+b
=\sum_i\theta_i(w^{\mathsf T}x_i+b)>0.
$$

負例凸包では同様に負です。

したがって二つの凸包は交わりません。

### 16.2 凸包が交わらないなら分離可能

逆に

$$
C_+\cap C_-=\varnothing
$$

とします。

$C_+\times C_-$ はコンパクトで、距離関数

$$
(p,q)\mapsto\|p-q\|
$$

は連続なので、最近点対

$$
p^*\in C_+,
\qquad
q^*\in C_-
$$

が存在します。

二集合は交わらないので

$$
\delta=\|p^*-q^*\|>0.
$$

次節で、この最近点対の中間超平面が二集合を分離することを示します。

---

## 17. 最大マージンは二つの凸包の最短距離

$$
r=p^*-q^*,
\qquad
\delta=\|r\|>0
$$

とします。

$q^*$ を固定すると $p^*$ は $C_+$ 上で $q^*$ に最も近い点なので、射影条件から任意の $p\in C_+$ について

$$
(q^*-p^*)^{\mathsf T}(p-p^*)\le0.
$$

したがって

$$
\boxed{r^{\mathsf T}p\ge r^{\mathsf T}p^*}.
$$

同様に任意の $q\in C_-$ について

$$
\boxed{r^{\mathsf T}q\le r^{\mathsf T}q^*}.
$$

しかも

$$
r^{\mathsf T}p^*
-r^{\mathsf T}q^*
=\|r\|^2
=\delta^2>0.
$$

よって中間超平面

$$
r^{\mathsf T}x
=
\frac{r^{\mathsf T}p^*+r^{\mathsf T}q^*}{2}
$$

が二つの凸包を厳密に分離します。

単位法線

$$
u=\frac r\delta
$$

を使えば、二つの支持超平面間距離は $\delta$、中央境界から各支持超平面までの距離は $\delta/2$ です。

ハードマージンSVMでは支持超平面間距離が

$$
\frac{2}{\|w\|}
$$

なので最適解で

$$
\boxed{
\frac{2}{\|w^*\|}
=\delta
}
$$

です。

したがってハードマージンSVMは

$$
\boxed{
\text{正例凸包と負例凸包の最近点対を見つけ、
その中間超平面を取る}
}
$$

問題とみなせます。

---

## 18. 双対変数 $\alpha_i$ は凸包上の点を作る

ハードマージンSVMの双対制約は

$$
\alpha_i\ge0,
\qquad
\sum_i\alpha_i y_i=0.
$$

正例側と負例側の係数和を

$$
\rho
=\sum_{i:y_i=+1}\alpha_i
=\sum_{i:y_i=-1}\alpha_i
$$

と置きます。

$\rho>0$ のとき

$$
p
=\sum_{i:y_i=+1}
\frac{\alpha_i}{\rho}x_i,
$$

$$
q
=\sum_{i:y_i=-1}
\frac{\alpha_i}{\rho}x_i
$$

とすれば

$$
p\in C_+,
\qquad
q\in C_-.
$$

さらに

$$
w
=\sum_i\alpha_i y_i x_i
=\rho(p-q).
$$

つまりSVMの法線は、二つの凸包上の点を結ぶ方向です。

---

## 19. 双対目的関数も凸包間距離になる

双対目的関数

$$
\sum_i\alpha_i
-\frac12\|w\|^2
$$

は

$$
2\rho
-\frac12\rho^2\|p-q\|^2
$$

と書けます。

$p,q$ を固定して $\rho$ について最大化すると

$$
\rho^*
=\frac{2}{\|p-q\|^2},
$$

最大値は

$$
\frac{2}{\|p-q\|^2}.
$$

したがって双対問題全体を最大化するには

$$
\|p-q\|
$$

を最小にすればよいことになります。

双対側からも **二つの凸包の最近点対** が現れます。

非零の $\alpha_i$ を持つ訓練点だけが、これらの凸結合と法線ベクトルに寄与します。これがsupport vectorの幾何学的な意味の一つです。

---

## 20. SVMには二種類の「分離」がある

### 表側：分類境界

$$
C_+\cap C_-=\varnothing
$$

なら、正負クラスを分離する超平面が存在します。

これはSVMが実際に求める分類境界です。

### 裏側：最適性理論

KKT条件の背後では

$$
v\notin K
$$

なら $K$ と $v$ を分離する方向が存在する、という凸錐分離からFarkasを導きます。

したがってSVMは

$$
\boxed{
\text{データを超平面で分離する問題であり、
その最適性理論も超平面分離に支えられる}
}
$$

という二重構造を持ちます。

---

## 21. soft marginとkernelへ

もし

$$
C_+\cap C_-\ne\varnothing
$$

なら、二つの凸包を厳密分離するhard marginは不可能です。

そこで [E1-04](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) で扱うスラック変数を導入し、違反を許すsoft marginへ進みます。

kernel SVMでは

$$
x\mapsto\varphi(x)
$$

と特徴空間へ移し、そこで同じ凸幾何を考えます。

有限個の訓練標本については、$\varphi(x_i)$ は高々 $n$ 次元の部分空間を張ります。このため特徴空間全体が無限次元でも、訓練標本の分離幾何は有限次元部分空間に落ちます。

ただし「Hilbert空間」「RKHS」「なぜkernelが内積になるのか」を数学的に理解するには、[F0-02C 関数解析補講ロードマップ](../F0_02C_関数解析_制約想定_RKHS/index.md) からC1〜C7へ進んでください。

---

## 22. 全体像

最適化理論側は

$$
\boxed{
\text{閉凸集合への射影}
\to
\text{分離超平面定理}
\to
\text{Farkas}
\to
\text{polar cone}
\to
\text{KKT}
}
$$

です。

SVM側は

$$
\boxed{
\text{正負クラスの凸包}
\to
\text{非交差}
\to
\text{最近点対}
\to
\text{分離超平面}
\to
\text{最大マージン}
\to
\text{双対変数・support vector}
}
$$

です。

この二つは別の理論ではなく、どちらも **凸集合と超平面の幾何** に根を持っています。


---

## 演習

### F0-02B1-A01 1次元SVMを凸包距離で解く

- Level: A
- 目安時間: 12分

正例を $\{2,3\}$、負例を $\{-1,0\}$ とする。二つの凸包間距離 $\delta$、最大マージン境界、canonical scaling $y_i(wx_i+b)\ge1$ における $w,b$ を求めよ。

<!-- solution-start -->
#### 詳細解答
凸包は $C_+=[2,3]$, $C_-=[-1,0]$。最近点対は $2,0$ なので $\delta=2$、中間境界は $x=1$。$w=1,b=-1$ とすれば正例 $x=2$ と負例 $x=0$ で等号となり、支持超平面間距離 $2/|w|=2=\delta$。
#### 本番答案
$C_+=[2,3], C_-=[-1,0]$ より $\delta=2$。境界は $x=1$、canonical scalingでは $w=1,b=-1$。
#### 採点基準（20点）
- 凸包: 5点
- 最近点距離: 5点
- 境界: 5点
- $w,b$ と距離確認: 5点
<!-- solution-end -->

### F0-02B1-B01 双対変数を凸包上の点へ直す

- Level: B
- 目安時間: 15分

hard-margin SVMで $\alpha_i\ge0$、$\sum_i\alpha_i y_i=0$ とする。

$$
\rho=\sum_{y_i=+1}\alpha_i=\sum_{y_i=-1}\alpha_i>0
$$

と置き、$w=\sum_i\alpha_i y_i x_i$ を二つの凸包上の点 $p,q$ を用いて $w=\rho(p-q)$ と書け。

<!-- solution-start -->
#### 詳細解答
$p=\sum_{y_i=+1}(\alpha_i/\rho)x_i$, $q=\sum_{y_i=-1}(\alpha_i/\rho)x_i$ と置く。係数は非負で各側の和が1なので $p\in C_+,q\in C_-$。差を取れば $\rho(p-q)=\sum_{+}\alpha_ix_i-\sum_-\alpha_ix_i=\sum_i\alpha_i y_i x_i=w$。
#### 本番答案
$p=\sum_+(\alpha_i/\rho)x_i$, $q=\sum_-(\alpha_i/\rho)x_i$ とすれば $p\in C_+,q\in C_-$ で、$w=\rho(p-q)$。
#### 採点基準（20点）
- $\rho$ の利用: 4点
- $p,q$ の構成: 6点
- 凸包所属: 5点
- $w=\rho(p-q)$: 5点
<!-- solution-end -->

---

## 章末チェック

- 線形分離可能性と正負クラスの凸包の非交差を結び付けられる。
- ハードマージンと凸包間最短距離の関係を説明できる。
- 双対変数 $\alpha_i$ を凸包上の点を作る係数として解釈できる。
- SVMの分類側の分離と、Farkas/KKT側の分離を区別できる。
