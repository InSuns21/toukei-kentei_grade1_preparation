# E1-04 プロビット・非線形回帰・SVM

本章では、統計検定1級の共通応用範囲に含まれる **プロビット分析・非線形回帰モデル・サポートベクターマシン** を扱います。

- プロビット回帰: 2値応答の確率を標準正規分布の累積分布関数で線形予測子へ結ぶ。
- 非線形回帰: 条件付き平均を未知母数の非線形関数として表す。
- SVM: 確率モデルを直接置かず、分類境界とデータの幾何学的な余裕を最大化する。

本章では **潜在変数 → プロビット、一次近似 → Gauss--Newton、距離 → マージン → SVM** の順で式を導きます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md) に従います。

関連章:

- [L2-01 一般化線形モデル](../../04_linear_models/L2_01_一般化線形モデル/index.md): ロジスティック回帰、Bernoulli尤度、リンク関数。
- [L1-01 単回帰と最小二乗法](../../04_linear_models/L1_01_単回帰と最小二乗法/index.md): 最小二乗法、残差平方和。
- [E1-03 因子分析・クラスター分析](../E1_03_因子分析_クラスター分析/index.md): 教師なし学習との対比。

## この章で解けるようになる問題

- 潜在正規変数からプロビット回帰を導く。
- プロビットリンクとロジットリンクを区別する。
- プロビット回帰の尤度・スコア・限界効果を導く。
- 「説明変数に非線形」と「未知母数に非線形」を区別する。
- 正規誤差の非線形回帰で最小二乗法と最尤法が一致することを示す。
- Jacobianによる一次近似からGauss--Newton法を導く。
- 分離超平面からSVMのマージン幅を導く。
- ハードマージンSVMの双対問題を導く。
- KKT条件からサポートベクトルの意味を説明する。
- ソフトマージン・hinge損失・カーネル法の位置付けを説明する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| プロビット分析 | 潜在変数、プロビットリンク、尤度、スコア、限界効果 |
| 非線形回帰モデル | 非線形最小二乗、Jacobian、Gauss--Newton、局所識別 |
| サポートベクターマシン | マージン、主問題、双対問題、KKT、ソフトマージン、カーネル |

## 前提知識チェック

1. L2-01: Bernoulli分布、2値回帰、尤度、リンク関数。
2. L1-01: 最小二乗法、残差平方和。
3. F0-00: 内積、偏微分、Lagrange未定乗数法、一次近似。

---

# Part I プロビット分析

## 1. 2値回帰とプロビットリンク

応答を $Y_i\in\{0,1\}$ とし、

$$
p_i=P(Y_i=1\mid\boldsymbol x_i),
\qquad
\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$

とします。$p_i=\eta_i$ と直接置くと0未満や1超になり得るため、プロビット回帰では

$$
\boxed{p_i=\Phi(\eta_i)}
$$

とします。したがってリンク関数は

$$
\boxed{\Phi^{-1}(p_i)=\eta_i}.
$$

## 2. 潜在変数から導く

観測されない連続変数

$$
Y_i^*=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta+\varepsilon_i,
\qquad
\varepsilon_i\sim N(0,1)
$$

を考え、

$$
Y_i=
\begin{cases}
1,&Y_i^*>0,\\
0,&Y_i^*\le0
\end{cases}
$$

とします。すると

$$
\begin{aligned}
P(Y_i=1\mid\boldsymbol x_i)
&=P(\eta_i+\varepsilon_i>0)\\
&=P(\varepsilon_i>-\eta_i)\\
&=\Phi(\eta_i).
\end{aligned}
$$

これがプロビット回帰です。

### 2.1 なぜ誤差分散を1に固定するのか

もし $\varepsilon_i\sim N(0,\sigma^2)$ なら

$$
P(Y_i=1)=
\Phi\left(
\frac{\boldsymbol x_i^{\mathsf T}\boldsymbol\beta}{\sigma}
\right).
$$

観測確率から分かるのは $\boldsymbol\beta/\sigma$ だけで、$\boldsymbol\beta$ と $\sigma$ を別々には識別できません。そこで尺度を固定するため $\sigma=1$ とします。

## 3. ロジットとの違い

ロジスティック回帰では

$$
p_i=\frac{1}{1+e^{-\eta_i}}
$$

を使います。両者ともS字型ですが、プロビットは標準正規CDF、ロジットはロジスティックCDFを使います。ロジット係数はオッズ比へ直接つながりますが、プロビット係数の確率への効果は位置に依存します。

## 4. 尤度とスコア

Bernoulli尤度より

$$
L(\boldsymbol\beta)
=\prod_{i=1}^n
\Phi(\eta_i)^{y_i}
\{1-\Phi(\eta_i)\}^{1-y_i}.
$$

対数尤度は

$$
\ell(\boldsymbol\beta)
=\sum_i
\left[
y_i\log\Phi(\eta_i)
+(1-y_i)\log\{1-\Phi(\eta_i)\}
\right].
$$

$p_i=\Phi(\eta_i)$ とおけば

$$
\frac{\partial\ell_i}{\partial p_i}
=\frac{y_i-p_i}{p_i(1-p_i)},
$$

$$
\frac{dp_i}{d\eta_i}=\phi(\eta_i),
\qquad
\frac{\partial\eta_i}{\partial\boldsymbol\beta}=\boldsymbol x_i.
$$

したがって

$$
\boxed{
\frac{\partial\ell}{\partial\boldsymbol\beta}
=\sum_i
\boldsymbol x_i
\frac{\phi(\eta_i)(y_i-p_i)}{p_i(1-p_i)}
}.
$$

ロジスティック回帰では $dp/d\eta=p(1-p)$ が分母と相殺しますが、プロビットでは相殺しません。

## 5. 限界効果

連続説明変数 $x_j$ に対して

$$
\boxed{
\frac{\partial p}{\partial x_j}
=\phi(\eta)\beta_j
}.
$$

したがって $\beta_j$ 自体は確率の一定増分ではありません。

例えば $\beta_j=0.8$、$\eta=0$、$\phi(0)\approx0.3989$ なら

$$
\frac{\partial p}{\partial x_j}
\approx0.3989\times0.8
\approx0.319.
$$

---

# Part II 非線形回帰

## 6. 「非線形」の意味

$$
y=\beta_0+\beta_1x+\beta_2x^2+\varepsilon
$$

は曲線ですが、未知母数 $\beta_0,\beta_1,\beta_2$ について線形なので通常の線形回帰です。

一方

$$
y=\alpha e^{-\beta x}+\varepsilon
$$

は未知母数 $\beta$ が指数関数の内部に入るため、未知母数に対して非線形です。本章ではこの意味での非線形回帰を扱います。

## 7. 非線形最小二乗法

一般に

$$
y_i=f(\boldsymbol x_i;\boldsymbol\theta)+\varepsilon_i
$$

とし、

$$
r_i(\boldsymbol\theta)=y_i-f(\boldsymbol x_i;\boldsymbol\theta)
$$

とします。非線形最小二乗推定量は

$$
\boxed{
\widehat{\boldsymbol\theta}
=\arg\min_{\boldsymbol\theta}
\sum_i r_i(\boldsymbol\theta)^2
}.
$$

## 8. 正規誤差なら最尤法と一致

$$
\varepsilon_i\sim N(0,\sigma^2)
$$

を独立に仮定すると

$$
\ell(\boldsymbol\theta,\sigma^2)
=-\frac n2\log(2\pi\sigma^2)
-\frac{1}{2\sigma^2}
RSS(\boldsymbol\theta).
$$

したがって $\boldsymbol\theta$ について対数尤度を最大化することは $RSS$ を最小化することと同値です。

## 9. Jacobianと停留条件

平均ベクトルを $\boldsymbol f(\boldsymbol\theta)$、残差を

$$
\boldsymbol r=\boldsymbol y-\boldsymbol f(\boldsymbol\theta)
$$

とします。Jacobianを

$$
J(\boldsymbol\theta)
=
\left[
\frac{\partial f_i}{\partial\theta_j}
\right]
$$

とすると

$$
RSS=\boldsymbol r^{\mathsf T}\boldsymbol r
$$

より

$$
\nabla_{\boldsymbol\theta}RSS
=-2J^{\mathsf T}\boldsymbol r.
$$

したがって停留条件は

$$
\boxed{J^{\mathsf T}\boldsymbol r=\boldsymbol0}.
$$

## 10. Gauss--Newton法

現在値 $\boldsymbol\theta^{(t)}$ の近くで

$$
\boldsymbol f(\boldsymbol\theta^{(t)}+\boldsymbol\delta)
\approx
\boldsymbol f(\boldsymbol\theta^{(t)})+J_t\boldsymbol\delta
$$

と一次近似します。新しい残差は

$$
\boldsymbol r_{new}
\approx
\boldsymbol r_t-J_t\boldsymbol\delta.
$$

したがって

$$
\|\boldsymbol r_t-J_t\boldsymbol\delta\|^2
$$

を最小化すればよく、正規方程式は

$$
J_t^{\mathsf T}J_t\boldsymbol\delta
=J_t^{\mathsf T}\boldsymbol r_t.
$$

よって

$$
\boxed{
\boldsymbol\delta
=(J_t^{\mathsf T}J_t)^{-1}J_t^{\mathsf T}\boldsymbol r_t
}
$$

および

$$
\boxed{
\boldsymbol\theta^{(t+1)}
=\boldsymbol\theta^{(t)}+\boldsymbol\delta
}.
$$

指数減衰

$$
f(x;\alpha,\beta)=\alpha e^{-\beta x}
$$

では

$$
\frac{\partial f}{\partial\alpha}=e^{-\beta x},
\qquad
\frac{\partial f}{\partial\beta}
=-\alpha x e^{-\beta x}.
$$

## 11. 初期値・識別・変換

非線形 $RSS$ は単純な二次関数とは限らず、初期値によって局所解や数値不安定性が生じ得ます。また $J^{\mathsf T}J$ がほぼ特異なら、異なる母数変化がほぼ同じ平均曲線を作り、局所的に母数を区別しにくくなります。

局所線形化が妥当なら

$$
\operatorname{Var}(\widehat{\boldsymbol\theta})
\approx
\sigma^2(J^{\mathsf T}J)^{-1}
$$

と近似できます。

また加法誤差モデル

$$
y=f(x)+\varepsilon
$$

で対数を取っても

$$
\log y=\log\{f(x)+\varepsilon\}
$$

なので、単純な加法誤差の線形回帰にはなりません。対数変換は誤差モデルも変える操作です。

---

# Part III サポートベクターマシン

## 12. 超平面と距離

2値ラベルを $y_i\in\{-1,+1\}$ とし、分類関数を

$$
f(\boldsymbol x)
=\boldsymbol w^{\mathsf T}\boldsymbol x+b
$$

とします。分類境界は

$$
\boldsymbol w^{\mathsf T}\boldsymbol x+b=0.
$$

点 $\boldsymbol x_i$ の符号付き幾何学的マージンは

$$
\frac{y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)}{\|\boldsymbol w\|}.
$$

$f$ を正の定数倍しても境界は変わらないため、最近傍点で

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)=1
$$

となるよう尺度を正規化できます。

すると支持超平面

$$
\boldsymbol w^{\mathsf T}\boldsymbol x+b=\pm1
$$

は境界から各 $1/\|\boldsymbol w\|$ の距離にあるため、マージン幅は

$$
\boxed{\frac{2}{\|\boldsymbol w\|}}.
$$

## 13. ハードマージン主問題

マージン最大化は $\|\boldsymbol w\|$ の最小化と同値なので

$$
\boxed{
\min_{\boldsymbol w,b}
\frac12\|\boldsymbol w\|^2
}
$$

ただし

$$
\boxed{
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1
}
$$

を解きます。

## 14. 双対問題

Lagrangianを

$$
L
=\frac12\|\boldsymbol w\|^2
+\sum_i\alpha_i
\{1-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\},
\qquad
\alpha_i\ge0
$$

とします。停留条件は

$$
\boldsymbol w
=\sum_i\alpha_i y_i\boldsymbol x_i,
$$

$$
\sum_i\alpha_i y_i=0.
$$

これを代入すると

$$
\boxed{
\max_{\boldsymbol\alpha}
\left[
\sum_i\alpha_i
-\frac12
\sum_i\sum_j
\alpha_i\alpha_j y_i y_j
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j
\right]
}
$$

ただし

$$
\alpha_i\ge0,
\qquad
\sum_i\alpha_i y_i=0.
$$

## 15. KKT条件とサポートベクトル

相補性より

$$
\boxed{
\alpha_i
\{y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)-1\}=0
}.
$$

したがって $\alpha_i>0$ の点は通常

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)=1
$$

を満たす境界近傍の点で、これがサポートベクトルです。

### 15.1 1次元2点例

$$
(x_1,y_1)=(-1,-1),
\qquad
(x_2,y_2)=(1,+1)
$$

では対称性から $b=0$。制約は $w\ge1$ なので

$$
\boxed{w=1,b=0}.
$$

マージン幅は2です。双対では $\alpha_1=\alpha_2=\alpha$ となり、目的関数

$$
2\alpha-2\alpha^2
$$

は $\alpha=1/2$ で最大になります。

## 16. ソフトマージンとhinge損失

線形分離できない場合は

$$
\xi_i\ge0
$$

を導入して

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
\ge1-\xi_i
$$

とします。目的関数は

$$
\boxed{
\min
\frac12\|\boldsymbol w\|^2
+C\sum_i\xi_i
}.
$$

各点の最小スラックは

$$
\xi_i
=\max\{0,1-y_if(\boldsymbol x_i)\}
$$

なので

$$
\max\{0,1-yf(\boldsymbol x)\}
$$

がhinge損失です。

## 17. カーネル法

SVMの双対問題ではデータは内積

$$
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j
$$

だけを通じて現れます。特徴写像 $\varphi$ の高次元空間での内積を

$$
K(\boldsymbol x_i,\boldsymbol x_j)
=\varphi(\boldsymbol x_i)^{\mathsf T}
\varphi(\boldsymbol x_j)
$$

として直接計算できれば、特徴写像を明示せず非線形境界を扱えます。

---

# 演習

## Level A

### E1-04-A01 プロビット確率

- Level: A
- 目安時間: 6分
- 主題: プロビットリンク
- 使用技術: 標準正規分布表

$\Phi(0)=0.5000$、$\Phi(1)=0.8413$ とする。$\eta=0,1$ のときの成功確率を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
p=\Phi(\eta)
$$

なので

$$
\boxed{p(0)=0.5000},
\qquad
\boxed{p(1)=0.8413}.
$$

##### 本番答案

$$
0.5000,\quad0.8413.
$$

##### 採点基準

- $p=\Phi(\eta)$: 8点
- 各数値: 各6点

<!-- solution-end -->

### E1-04-A02 プロビットの限界効果

- Level: A
- 目安時間: 7分
- 主題: 限界効果
- 使用技術: 連鎖律

$\beta_1=0.8$、$\eta=0$、$\phi(0)=0.3989$ とする。$x$ に関する限界効果を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\frac{\partial p}{\partial x}
=\phi(\eta)\beta_1
=0.3989\times0.8
=0.31912.
$$

##### 本番答案

$$
\boxed{0.319\text{程度}}
$$

##### 採点基準

- 式: 10点
- 代入: 6点
- 結論: 4点

<!-- solution-end -->

### E1-04-A03 非線形回帰の判定

- Level: A
- 目安時間: 7分
- 主題: 非線形回帰
- 使用技術: 母数に関する線形性

次のうち未知母数に対して非線形なものを選べ。

1. $y=\beta_0+\beta_1x+\beta_2x^2+\varepsilon$
2. $y=\alpha e^{-\beta x}+\varepsilon$
3. $y=\beta_0+\beta_1\log x+\varepsilon$

<!-- solution-start -->

#### 解答

##### 詳細解答

1と3は変換した説明変数を使った未知母数の線形結合である。2は未知母数 $\beta$ が指数関数の中に入り、母数に対して非線形である。

##### 本番答案

**2のみ**。

##### 採点基準

- 2を選ぶ: 8点
- 1の説明: 4点
- 2の説明: 4点
- 3の説明: 4点

<!-- solution-end -->

### E1-04-A04 SVMのマージン

- Level: A
- 目安時間: 7分
- 主題: SVM
- 使用技術: 距離

1次元SVMで $w=2,b=0$ とする。支持超平面間のマージン幅を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
\frac{2}{\|w\|}
=\frac22=1.
$$

##### 本番答案

$$
\boxed{1}
$$

##### 採点基準

- 式: 10点
- 計算: 10点

<!-- solution-end -->

## Level B

### E1-04-B01 潜在変数からプロビット

- Level: B
- 目安時間: 12分
- 主題: 潜在変数
- 使用技術: 正規分布の対称性

$$
Y^*=\boldsymbol x^{\mathsf T}\boldsymbol\beta+\varepsilon,
\qquad
\varepsilon\sim N(0,1)
$$

とし、$Y=1\Leftrightarrow Y^*>0$ とする。

1. $P(Y=1\mid\boldsymbol x)=\Phi(\boldsymbol x^{\mathsf T}\boldsymbol\beta)$ を示せ。
2. 誤差標準偏差を未知の $\sigma$ とすると識別上何が起こるか説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\eta=\boldsymbol x^{\mathsf T}\boldsymbol\beta$ とすると

$$
P(Y=1\mid x)
=P(\varepsilon>-\eta)
=\Phi(\eta).
$$

一般の $\sigma$ では

$$
P(Y=1\mid x)
=\Phi\left(\frac{x^{\mathsf T}\beta}{\sigma}\right)
$$

となり、$\beta$ と $\sigma$ は比でしか識別されない。そこで通常 $\sigma=1$ と固定する。

##### 本番答案

$$
P(Y=1\mid x)=\Phi(x^{\mathsf T}\beta).
$$

一般の $\sigma$ では $\Phi(x^{\mathsf T}\beta/\sigma)$ となるため、尺度を固定する必要がある。

##### 採点基準

- 確率の変形: 8点
- 対称性: 4点
- 一般の $\sigma$: 4点
- 識別の説明: 4点

<!-- solution-end -->

### E1-04-B02 プロビットのスコア

- Level: B
- 目安時間: 15分
- 主題: 最尤推定
- 使用技術: 連鎖律

$$
p_i=\Phi(\eta_i),
\qquad
\eta_i=\boldsymbol x_i^{\mathsf T}\boldsymbol\beta
$$

についてスコアを導け。

<!-- solution-start -->

#### 解答

##### 詳細解答

1観測分の対数尤度は

$$
\ell_i
=y_i\log p_i+(1-y_i)\log(1-p_i).
$$

$$
\frac{\partial\ell_i}{\partial p_i}
=\frac{y_i-p_i}{p_i(1-p_i)},
$$

$$
\frac{dp_i}{d\eta_i}=\phi(\eta_i),
\qquad
\frac{\partial\eta_i}{\partial\beta}=x_i.
$$

したがって

$$
\boxed{
\frac{\partial\ell}{\partial\beta}
=\sum_i x_i
\frac{\phi(\eta_i)(y_i-p_i)}{p_i(1-p_i)}
}.
$$

##### 本番答案

上式。

##### 採点基準

- Bernoulli対数尤度: 4点
- $p$ 微分: 6点
- $\Phi'=\phi$: 4点
- 最終式: 6点

<!-- solution-end -->

### E1-04-B03 Gauss--Newton更新式

- Level: B
- 目安時間: 15分
- 主題: 非線形最小二乗
- 使用技術: Taylor一次近似

Gauss--Newton更新式を一次近似から導け。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
f(\theta+\delta)
\approx f(\theta)+J\delta
$$

より

$$
r_{new}\approx r-J\delta.
$$

したがって $\|r-J\delta\|^2$ を最小化し

$$
J^{\mathsf T}J\delta=J^{\mathsf T}r.
$$

よって

$$
\boxed{
\theta^{(t+1)}
=\theta^{(t)}+(J^{\mathsf T}J)^{-1}J^{\mathsf T}r
}.
$$

##### 本番答案

上式。

##### 採点基準

- 一次近似: 5点
- 残差近似: 5点
- 正規方程式: 5点
- 更新式: 5点

<!-- solution-end -->

### E1-04-B04 ハードマージンSVMの双対

- Level: B
- 目安時間: 18分
- 主題: SVM双対
- 使用技術: Lagrange未定乗数法

主問題

$$
\min_{w,b}\frac12\|w\|^2
$$

subject to

$$
y_i(w^{\mathsf T}x_i+b)\ge1
$$

から双対問題を導け。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
L
=\frac12\|w\|^2
+\sum_i\alpha_i\{1-y_i(w^{\mathsf T}x_i+b)\}.
$$

停留条件から

$$
w=\sum_i\alpha_i y_i x_i,
\qquad
\sum_i\alpha_i y_i=0.
$$

したがって

$$
\boxed{
\max_{\alpha}
\left(
\sum_i\alpha_i
-\frac12\sum_{i,j}
\alpha_i\alpha_jy_iy_jx_i^{\mathsf T}x_j
\right)
}
$$

ただし $\alpha_i\ge0$、$\sum_i\alpha_i y_i=0$。

##### 本番答案

上式。

##### 採点基準

- Lagrangian: 5点
- $w$ の停留条件: 5点
- $b$ の停留条件: 4点
- 双対問題: 6点

<!-- solution-end -->

## Level C

### E1-04-C01 プロビット尤度の数値計算

- Level: C
- 目安時間: 15分
- 主題: 尤度
- 使用技術: Bernoulli尤度

$$
(\eta_1,y_1)=(0,0),
\qquad
(\eta_2,y_2)=(1,1)
$$

とし、$\Phi(0)=0.5000$、$\Phi(1)=0.8413$ とする。尤度と対数尤度を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
L=(1-0.5)\times0.8413
=0.42065.
$$

$$
\ell=\log(0.42065)\approx-0.866.
$$

##### 本番答案

$$
\boxed{L=0.42065},
\qquad
\boxed{\ell\approx-0.866}.
$$

##### 採点基準

- 各観測の寄与: 8点
- 尤度: 6点
- 対数尤度: 6点

<!-- solution-end -->

### E1-04-C02 Gauss--Newton 1回更新

- Level: C
- 目安時間: 22分
- 主題: 非線形最小二乗
- 使用技術: 2元連立方程式

$$
f(x;\alpha,\beta)=\alpha e^{-\beta x}
$$

をデータ $(0,2.0),(1,1.2),(2,0.7)$ に当てはめ、初期値を

$$
(\alpha^{(0)},\beta^{(0)})=(1.5,0.4)
$$

とする。以下を用いてよい。

$$
J^{\mathsf T}J
\approx
\begin{pmatrix}
1.6512&-1.2797\\
-1.2797&2.8281
\end{pmatrix},
$$

$$
J^{\mathsf T}r
\approx
\begin{pmatrix}
0.6421\\
-0.2306
\end{pmatrix}.
$$

更新量と更新後の $(\alpha,\beta)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
(J^{\mathsf T}J)\delta=J^{\mathsf T}r
$$

を解くと

$$
\delta
\approx
\begin{pmatrix}
0.5015\\
0.1454
\end{pmatrix}.
$$

したがって

$$
\boxed{
(\alpha^{(1)},\beta^{(1)})
\approx(2.0015,0.5454)
}.
$$

##### 本番答案

$$
\delta\approx(0.5015,0.1454)^{\mathsf T},
$$

$$
(\alpha^{(1)},\beta^{(1)})
\approx(2.0015,0.5454).
$$

##### 採点基準

- 正規方程式: 6点
- 更新量: 8点
- 更新後母数: 6点

<!-- solution-end -->

### E1-04-C03 hinge損失

- Level: C
- 目安時間: 15分
- 主題: ソフトマージンSVM
- 使用技術: hinge損失

$f(x)=x$ とし、訓練点を

$$
(-2,-1),\quad(-0.2,-1),\quad(0.4,+1),\quad(2,+1)
$$

とする。各hinge損失と、$C=1,w=1$ の目的関数値を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$y_if(x_i)$ は

$$
2,\quad0.2,\quad0.4,\quad2.
$$

したがってhinge損失は

$$
0,\quad0.8,\quad0.6,\quad0.
$$

和は1.4。よって

$$
\frac12w^2+1.4
=0.5+1.4
=1.9.
$$

##### 本番答案

$$
\boxed{(0,0.8,0.6,0)},
\qquad
\boxed{1.9}.
$$

##### 採点基準

- $yf$ の計算: 5点
- hinge損失: 7点
- 和: 3点
- 目的関数: 5点

<!-- solution-end -->

### E1-04-C04 2点SVMを双対から解く

- Level: C
- 目安時間: 18分
- 主題: SVM双対
- 使用技術: 二次関数

$$
(x_1,y_1)=(-1,-1),
\qquad
(x_2,y_2)=(1,+1)
$$

について最適な $\alpha_1,\alpha_2,w,b$ を求め、両点がサポートベクトルであることを確認せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

等式制約より

$$
\alpha_1=\alpha_2=\alpha.
$$

双対目的関数は

$$
W(\alpha)=2\alpha-2\alpha^2.
$$

したがって

$$
W'(\alpha)=2-4\alpha=0
$$

より

$$
\alpha=\frac12.
$$

また

$$
w
=\sum_i\alpha_i y_i x_i
=1,
\qquad
b=0.
$$

両点で $y_i(wx_i+b)=1$ かつ $\alpha_i>0$ なので両点ともサポートベクトルである。

##### 本番答案

$$
\boxed{\alpha_1=\alpha_2=1/2},
\qquad
\boxed{w=1,b=0}.
$$

##### 採点基準

- 等式制約: 4点
- 双対目的関数: 5点
- $\alpha$: 4点
- $w,b$: 4点
- サポートベクトル確認: 3点

<!-- solution-end -->

## Level D

### E1-04-D01 三手法の理論統合

- Level: D
- 目安時間: 30分
- 主題: 本章総合
- 使用技術: 導出・比較

1. 潜在変数からプロビット回帰を導き、限界効果を示せ。
2. 正規誤差の非線形回帰で最尤法がRSS最小化に一致することを示し、Gauss--Newton更新式を書け。
3. SVMのマージン幅 $2/\|w\|$ を説明し、ハードマージン主問題を書け。
4. プロビット回帰とSVMの目的の違いを説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1. $Y^*=x^{\mathsf T}\beta+\varepsilon$、$\varepsilon\sim N(0,1)$、$Y=1\Leftrightarrow Y^*>0$ とすれば
   $$
   P(Y=1\mid x)=\Phi(x^{\mathsf T}\beta).
   $$
   連続変数 $x_j$ の限界効果は
   $$
   \phi(\eta)\beta_j.
   $$
2. 正規対数尤度は定数を除き
   $$
   -\frac{RSS(\theta)}{2\sigma^2}
   $$
   なのでMLEはRSS最小化に一致する。更新式は
   $$
   \theta^{(t+1)}
   =\theta^{(t)}+(J^{\mathsf T}J)^{-1}J^{\mathsf T}r.
   $$
3. 支持超平面 $w^{\mathsf T}x+b=\pm1$ は境界から各 $1/\|w\|$ にあるため幅は $2/\|w\|$。したがって
   $$
   \min\frac12\|w\|^2
   $$
   subject to $y_i(w^{\mathsf T}x_i+b)\ge1$。
4. プロビットは $P(Y=1\mid x)$ を尤度で推定する確率モデル。SVMは分類境界のマージンを最適化する手法で、基本出力は成功確率そのものではない。

##### 本番答案

上の4点を簡潔に記せばよい。

##### 採点基準

- 第1問: 5点
- 第2問: 6点
- 第3問: 5点
- 第4問: 4点

<!-- solution-end -->

## 30分ドリル

### E1-04-DRILL-01 プロビット・Gauss--Newton・SVM

- Level: C
- 目安時間: 30分
- 主題: 本章総合
- 使用技術: 確率・一次近似・最適化

#### 問1

$$
p(x)=\Phi(-0.5+x)
$$

とする。$\Phi(0.5)=0.6915$、$\phi(0.5)=0.3521$ とする。$x=1$ の成功確率と限界効果を求めよ。

#### 問2

$$
f(x;\alpha,\beta)=\alpha e^{-\beta x}
$$

のJacobianの1行分を求め、$J^{\mathsf T}J$ がほぼ特異なとき何が起こるか説明せよ。

#### 問3

$$
(x_1,y_1)=(-1,-1),
\qquad
(x_2,y_2)=(1,+1)
$$

のハードマージンSVMについて $w,b$ とマージン幅を求め、サポートベクトルを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

問1では $\eta=0.5$ なので

$$
p=0.6915,
\qquad
\frac{\partial p}{\partial x}=0.3521.
$$

問2では

$$
\frac{\partial f}{\partial\alpha}=e^{-\beta x},
\qquad
\frac{\partial f}{\partial\beta}
=-\alpha x e^{-\beta x}.
$$

したがってJacobian行は

$$
\begin{pmatrix}
e^{-\beta x}&-\alpha x e^{-\beta x}
\end{pmatrix}.
$$

$J^{\mathsf T}J$ がほぼ特異ならGauss--Newton更新が不安定になり、母数が局所的に識別しにくい。

問3では $w=1,b=0$、マージン幅2。両点で $y_i(wx_i+b)=1$ なので両点ともサポートベクトルである。

##### 本番答案

1. $0.6915$、$0.3521$。
2. $(e^{-\beta x},-\alpha xe^{-\beta x})$。ほぼ特異なら更新と推定値が不安定。
3. $w=1,b=0$、幅2、両点がサポートベクトル。

##### 採点基準

- 問1: 6点
- 問2: 7点
- 問3: 7点

<!-- solution-end -->

---

## まとめ

1. プロビット回帰は潜在正規変数の閾値モデルから $p=\Phi(\eta)$ を導ける。
2. 非線形回帰では未知母数に対する非線形性が本質で、Gauss--Newton法は局所一次近似を反復する。
3. SVMは距離からマージン幅を導き、双対問題・KKT条件を通じてサポートベクトルとカーネル法へつながる。
