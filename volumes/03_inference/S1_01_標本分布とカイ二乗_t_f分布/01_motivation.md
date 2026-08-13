# なぜ三つの分布が必要か

正規母集団 $N(\mu,\sigma^2)$ から標本を取ると、$\sigma$ が既知なら
$$
Z=\frac{\sqrt n(\overline X-\mu)}{\sigma}\sim N(0,1)
$$
である。しかし実際には $\sigma$ も未知であることが多い。$\sigma$ を標本標準偏差 $S$ に置き換えると、分母も確率変数になるため標準正規分布ではなくt分布が現れる。

また、標本分散の変動は正規残差の平方和なのでカイ二乗分布で表される。独立な二つの標本分散を比べると、二つのカイ二乗変数の比であるF分布が現れる。

$$
\text{正規標本}
\longrightarrow
\begin{cases}
\text{残差平方和} &\longrightarrow \chi^2,\\
\text{平均}/\sqrt{\text{残差平方和}} &\longrightarrow t,\\
\text{二つの残差平方和の比} &\longrightarrow F.
\end{cases}
$$

この一本の構造を理解すれば、後続の信頼区間・検定で公式を取り違えにくくなる。
