# Standard 28 対数回帰・残差診断

- 旧No.: 85
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（指数関数の数値評価不要）

## 問題

$$
\log Y=\alpha+\beta X+\varepsilon,
\qquad
\varepsilon\sim N(0,\sigma^2)
$$

とする。

1. $X=x$ における $Y$ の中央値と平均を求めよ。
2. $X$ が1増えたときの中央値の倍率を求めよ。
3. 元尺度の予測値を単純に $e^{\hat\alpha+\hat\beta x}$ とすると平均予測として偏る理由を説明せよ。
4. 残差対予測値プロットで扇形が見える場合の含意を述べよ。

## 詳細解答

$X=x$ を固定し $\eta=\alpha+\beta x$ とおくと

$$
\log Y=\eta+\varepsilon,
\qquad
Y=e^{\eta}e^{\varepsilon}.
$$

### 1. 中央値と平均

$\varepsilon$ は平均0の正規分布で0を中心に対称なので、その中央値も0である。指数関数は単調増加だから

$$
P(Y\le e^\eta)=P(\varepsilon\le0)=\frac12.
$$

従って

$$
\boxed{\operatorname{Med}(Y\mid X=x)=e^{\alpha+\beta x}}.
$$

平均は

$$
E[Y\mid X=x]=e^\eta E[e^\varepsilon]
$$

なので $E[e^\varepsilon]$ を計算する。正規密度を使うと

$$
E[e^\varepsilon]
=\frac1{\sqrt{2\pi}\sigma}\int_{-\infty}^{\infty}
\exp\left(\varepsilon-\frac{\varepsilon^2}{2\sigma^2}\right)d\varepsilon.
$$

指数部を平方完成すると

$$
\varepsilon-\frac{\varepsilon^2}{2\sigma^2}
=-\frac{(\varepsilon-\sigma^2)^2}{2\sigma^2}+\frac{\sigma^2}{2}.
$$

したがって

$$
E[e^\varepsilon]
=e^{\sigma^2/2}\frac1{\sqrt{2\pi}\sigma}
\int_{-\infty}^{\infty}
\exp\left\{-\frac{(\varepsilon-\sigma^2)^2}{2\sigma^2}\right\}d\varepsilon
=e^{\sigma^2/2},
$$

最後の積分は正規密度の全積分なので1である。よって

$$
\boxed{E[Y\mid X=x]=e^{\alpha+\beta x+\sigma^2/2}}.
$$

### 2. $X$ が1増えたときの中央値倍率

$m(x)=e^{\alpha+\beta x}$ とすると

$$
\frac{m(x+1)}{m(x)}=\frac{e^{\alpha+\beta(x+1)}}{e^{\alpha+\beta x}}=e^\beta.
$$

従って中央値は $\boxed{e^\beta\text{ 倍}}$ になる。

### 3. 単純逆変換が平均を外す理由

単純逆変換 $e^{\hat\alpha+\hat\beta x}$ が対応するのは条件付き中央値である。条件付き平均には第1問で求めた $e^{\sigma^2/2}$ が付く。これは指数関数が非線形で

$$
E[e^\varepsilon]\ne e^{E[\varepsilon]}=1
$$

だからである。

### 4. 扇形残差の意味

モデルは対数尺度で誤差分散 $\sigma^2$ が一定であることを仮定している。対数尺度の残差対予測値プロットで散らばりが予測値とともに系統的に増減するなら、等分散仮定が不適切な可能性がある。変換、分散構造、外れ値、モデル形を再検討する。

## 本番答案

$\eta=\alpha+\beta x$ とおくと $Y=e^\eta e^\varepsilon$。正規分布の対称性から中央値は $e^\eta$。また正規密度の指数部を平方完成して $E[e^\varepsilon]=e^{\sigma^2/2}$ だから

$$
E[Y\mid X=x]=e^{\alpha+\beta x+\sigma^2/2}.
$$

1単位増加の中央値倍率は $e^\beta$。単純逆変換は平均でなく中央値を返すため、平均予測には $e^{\sigma^2/2}$ の補正が必要。対数尺度の残差に扇形があれば等分散仮定を疑う。

## 採点基準

- 中央値の導出: 4点
- 平均の積分・平方完成: 6点
- 効果解釈・逆変換バイアス: 6点
- 残差診断: 4点
