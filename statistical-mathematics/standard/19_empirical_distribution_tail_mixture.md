# Standard 07 経験分布・tail integral・混合重尾

- 旧No.: 19
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

標本 $X_1,\ldots,X_4$ の観測値が

$$
1,1,2,4
$$

であった。経験分布関数を

$$
F_4(x)=\frac14\sum_{i=1}^4\boldsymbol1_{\{X_i\le x\}}
$$

とする。

1. $F_4(x)$ を区分的に書け。
2. 非負確率変数に対する恒等式

$$
E[X]=\int_0^\infty P(X>t)\,dt
$$

の標本版を経験分布へ適用し、標本平均を再現せよ。
3. 別の確率変数 $Y$ が、確率 $1-\varepsilon$ で率1の指数分布

$$
P(Y>x\mid\text{指数成分})=e^{-x},\qquad x\ge0,
$$

確率 $\varepsilon$ で パレート 分布

$$
P(Y>x\mid\text{Pareto成分})=x^{-\alpha},\qquad x\ge1,
$$

に従うとする。ただし $0<\varepsilon<1$, $\alpha>0$ とする。十分大きな $x$ で混合分布の tail を支配する成分を、極限を用いて説明せよ。

## 詳細解答

### 1. 経験分布関数

経験分布関数は「観測値のうち $x$ 以下のものの割合」である。

- $x<1$ では該当する観測値は0個。
- $1\le x<2$ では値1の2個が該当するので $2/4=1/2$。
- $2\le x<4$ では $1,1,2$ の3個が該当するので $3/4$。
- $x\ge4$ では4個すべてが該当する。

したがって

$$
\boxed{
F_4(x)=
\begin{cases}
0,&x<1,\\
1/2,&1\le x<2,\\
3/4,&2\le x<4,\\
1,&x\ge4.
\end{cases}}
$$

### 2. tail integral から標本平均を再現する

経験分布に対応する tail は

$$
1-F_4(t)
$$

である。区間ごとに

$$
1-F_4(t)=
\begin{cases}
1,&0\le t<1,\\
1/2,&1\le t<2,\\
1/4,&2\le t<4,\\
0,&t\ge4.
\end{cases}
$$

だから

$$
\begin{aligned}
\int_0^\infty\{1-F_4(t)\}\,dt
&=\int_0^1 1\,dt
+\int_1^2\frac12\,dt
+\int_2^4\frac14\,dt\\
&=1+\frac12+\frac12\\
&=\boxed{2}.
\end{aligned}
$$

標本平均は

$$
\bar X=\frac{1+1+2+4}{4}=2
$$

なので一致する。

なぜこの一致が一般に成り立つかも確認しておく。非負の実数 $x$ について

$$
x=\int_0^\infty\boldsymbol1_{\{x>t\}}\,dt
$$

である。したがって

$$
\begin{aligned}
\bar X
&=\frac1n\sum_{i=1}^nX_i\\
&=\frac1n\sum_{i=1}^n\int_0^\infty
\boldsymbol1_{\{X_i>t\}}\,dt\\
&=\int_0^\infty
\frac1n\sum_{i=1}^n\boldsymbol1_{\{X_i>t\}}\,dt\\
&=\int_0^\infty\{1-F_n(t)\}\,dt.
\end{aligned}
$$

つまり tail integral の恒等式は、経験分布に対しては標本平均そのものを与える。

### 3. 少量の パレート 成分が極端な tail を支配する理由

$x\ge1$ では全確率の公式から

$$
P(Y>x)
=(1-\varepsilon)e^{-x}
+\varepsilon x^{-\alpha}.
$$

指数成分が パレート 成分に比べてどの程度大きいかを見るため、比を取ると

$$
\frac{(1-\varepsilon)e^{-x}}
{\varepsilon x^{-\alpha}}
=\left(\frac{1-\varepsilon}{\varepsilon}\right)
 x^\alpha e^{-x}.
$$

任意の固定した $\alpha>0$ に対して、指数関数の減衰は多項式より速いので

$$
x^\alpha e^{-x}\longrightarrow0
\qquad(x\to\infty).
$$

したがって

$$
\frac{(1-\varepsilon)e^{-x}}
{\varepsilon x^{-\alpha}}
\longrightarrow0.
$$

よって十分大きな $x$ では

$$
P(Y>x)\sim\varepsilon x^{-\alpha},
$$

すなわち

$$
\boxed{\text{Pareto成分が tail を支配する}}.
$$

$\varepsilon$ が小さくても、極端値領域では「混合比の小ささ」より「減衰速度の遅さ」が勝つことが重要である。

## 本番答案

経験分布関数は

$$
F_4(x)=
\begin{cases}
0,&x<1,\\
1/2,&1\le x<2,\\
3/4,&2\le x<4,\\
1,&x\ge4.
\end{cases}
$$

従って

$$
\int_0^\infty(1-F_4(t))dt
=1+\frac12(2-1)+\frac14(4-2)
=2
=\bar X.
$$

また $x\ge1$ で

$$
P(Y>x)=(1-\varepsilon)e^{-x}+\varepsilon x^{-\alpha}.
$$

比を取ると

$$
\frac{(1-\varepsilon)e^{-x}}{\varepsilon x^{-\alpha}}
=\left(\frac{1-\varepsilon}{\varepsilon}\right)x^\alpha e^{-x}\to0,
$$

よって

$$
P(Y>x)\sim\varepsilon x^{-\alpha}.
$$

したがって極端な tail は パレート 成分が支配する。

## 採点基準

- 経験分布関数を定義から構成: 5点
- tail integral の区分積分: 5点
- 標本平均との一般的な一致の説明: 4点
- 混合 tail と比の極限: 6点
