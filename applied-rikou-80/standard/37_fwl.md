# Standard 37 Frisch–Waugh–Lovell定理

- 安定ID: `RIKOU-STANDARD-37`
- 80大問 No.: 37
- 演習価値: S
- 難度: A
- 目安時間: 25〜30分

## 問題

重回帰

$$
y=X_1\beta_1+x_2\beta_2+\varepsilon
$$

を考える。$X_1$ は列フルランクとし、

$$
P_1=X_1(X_1^\top X_1)^{-1}X_1^\top,
\qquad
M_1=I-P_1
$$

とする。

1. 残差平方和から正規方程式を導き、ブロック消去によって $\widehat\beta_2$ を求めよ。
2. $M_1y$ を $M_1x_2$ に切片なしで単回帰した係数が $\widehat\beta_2$ に等しいことを示せ。
3. 「他の説明変数を固定した効果」の意味を残差化で説明せよ。
4. $x_2$ が $X_1$ の列空間に近いと標準誤差が増える理由を説明せよ。ただし $\operatorname{Var}(\varepsilon)=\sigma^2I$ とする。

## 詳細解答

### 1. 残差平方和から正規方程式を作り、ブロック消去する

最小二乗法では

$$
Q(\beta_1,\beta_2)
=(y-X_1\beta_1-x_2\beta_2)^\top
(y-X_1\beta_1-x_2\beta_2)
$$

を最小化する。残差を

$$
r=y-X_1\beta_1-x_2\beta_2
$$

と置く。

まず $\beta_1$ を微小ベクトル $h$ だけ動かすと残差は $r-X_1h$ になるので

$$
\begin{aligned}
Q(\beta_1+h,\beta_2)-Q(\beta_1,\beta_2)
&=(r-X_1h)^\top(r-X_1h)-r^\top r\\
&=-2h^\top X_1^\top r+h^\top X_1^\top X_1h.
\end{aligned}
$$

最小点では任意の $h$ に対して1次の項が0だから

$$
X_1^\top r=0.
$$

すなわち

$$
X_1^\top X_1\widehat\beta_1
+X_1^\top x_2\widehat\beta_2
=X_1^\top y.
$$

同様に $\beta_2$ をスカラー $t$ だけ動かすと

$$
Q(\beta_1,\beta_2+t)-Q(\beta_1,\beta_2)
=-2t x_2^\top r+t^2x_2^\top x_2,
$$

よって1次条件は

$$
x_2^\top r=0,
$$

すなわち

$$
x_2^\top X_1\widehat\beta_1
+x_2^\top x_2\widehat\beta_2
=x_2^\top y.
$$

以上をまとめると正規方程式は

$$
\begin{pmatrix}
X_1^\top X_1&X_1^\top x_2\\
x_2^\top X_1&x_2^\top x_2
\end{pmatrix}
\begin{pmatrix}\widehat\beta_1\\\widehat\beta_2\end{pmatrix}
=
\begin{pmatrix}X_1^\top y\\x_2^\top y\end{pmatrix}.
$$

ここからブロック消去する。第1行を $\widehat\beta_1$ について解くと

$$
\begin{aligned}
X_1^\top X_1\widehat\beta_1
&=X_1^\top y-X_1^\top x_2\widehat\beta_2,\\
\widehat\beta_1
&=(X_1^\top X_1)^{-1}X_1^\top
(y-x_2\widehat\beta_2).
\end{aligned}
$$

これを第2行へ代入する。

$$
\begin{aligned}
x_2^\top X_1\widehat\beta_1+x_2^\top x_2\widehat\beta_2
&=x_2^\top y,\\
x_2^\top X_1(X_1^\top X_1)^{-1}X_1^\top
(y-x_2\widehat\beta_2)
+x_2^\top x_2\widehat\beta_2
&=x_2^\top y.
\end{aligned}
$$

$P_1=X_1(X_1^\top X_1)^{-1}X_1^\top$ を使うと

$$
x_2^\top P_1y
-x_2^\top P_1x_2\widehat\beta_2
+x_2^\top x_2\widehat\beta_2
=x_2^\top y.
$$

$\widehat\beta_2$ の項とそれ以外をそれぞれまとめて

$$
x_2^\top(I-P_1)x_2\widehat\beta_2
=x_2^\top(I-P_1)y.
$$

$M_1=I-P_1$ だから

$$
\boxed{
\widehat\beta_2
=(x_2^\top M_1x_2)^{-1}x_2^\top M_1y
}.
$$

### 2. 残差回帰

$$
\widetilde y=M_1y,
\qquad
\widetilde x_2=M_1x_2
$$

とする。切片なし単回帰の残差平方和

$$
R(b)=(\widetilde y-\widetilde x_2b)^\top
(\widetilde y-\widetilde x_2b)
$$

を展開すると

$$
R(b)
=\widetilde y^\top\widetilde y
-2b\widetilde x_2^\top\widetilde y
+b^2\widetilde x_2^\top\widetilde x_2.
$$

$b$ で微分して0と置けば

$$
-2\widetilde x_2^\top\widetilde y
+2b\widetilde x_2^\top\widetilde x_2=0,
$$

したがって

$$
b=\frac{\widetilde x_2^\top\widetilde y}
{\widetilde x_2^\top\widetilde x_2}.
$$

$P_1$ は対称冪等なので $M_1=I-P_1$ も対称冪等であり、$M_1^\top M_1=M_1$。よって

$$
\widetilde x_2^\top\widetilde y
=x_2^\top M_1^\top M_1y
=x_2^\top M_1y,
$$

$$
\widetilde x_2^\top\widetilde x_2
=x_2^\top M_1x_2.
$$

したがって

$$
\boxed{
b
=\frac{x_2^\top M_1y}{x_2^\top M_1x_2}
=\widehat\beta_2
}.
$$

### 3. 「他の説明変数を固定する」の意味

$P_1y$ は $y$ のうち $X_1$ の列空間で説明される成分なので、

$$
M_1y=y-P_1y
$$

は $X_1$ で説明できる部分を除いた残差である。同様に

$$
M_1x_2=x_2-P_1x_2
$$

は $x_2$ から $X_1$ と重なる部分を除いた残差である。

したがって $\widehat\beta_2$ は、「$X_1$ では説明できない $x_2$ の変動」と「$X_1$ では説明できない $y$ の変動」の関係を測っている。これが線形回帰における「他の説明変数を固定した $x_2$ の効果」の意味である。

### 4. 共線性と標準誤差

真のモデルを推定式へ代入する。

$$
\begin{aligned}
\widehat\beta_2
&=(x_2^\top M_1x_2)^{-1}x_2^\top M_1
(X_1\beta_1+x_2\beta_2+\varepsilon).
\end{aligned}
$$

$M_1X_1=0$ なので

$$
\widehat\beta_2
=\beta_2
+(x_2^\top M_1x_2)^{-1}x_2^\top M_1\varepsilon.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(\widehat\beta_2)
&=(x_2^\top M_1x_2)^{-2}
 x_2^\top M_1(\sigma^2I)M_1x_2\\
&=\sigma^2(x_2^\top M_1x_2)^{-2}
 x_2^\top M_1^2x_2\\
&=\boxed{\frac{\sigma^2}{x_2^\top M_1x_2}}.
\end{aligned}
$$

また

$$
x_2^\top M_1x_2
=x_2^\top M_1^\top M_1x_2
=\|M_1x_2\|^2.
$$

$x_2$ が $X_1$ の列空間に近いほど $M_1x_2$ は小さくなり、分母が小さくなる。そのため $\widehat\beta_2$ の分散、したがって標準誤差が大きくなる。

## 本番答案

残差平方和

$$
Q=(y-X_1\beta_1-x_2\beta_2)^\top
(y-X_1\beta_1-x_2\beta_2)
$$

の1次条件から

$$
X_1^\top(y-X_1\widehat\beta_1-x_2\widehat\beta_2)=0,
$$

$$
x_2^\top(y-X_1\widehat\beta_1-x_2\widehat\beta_2)=0.
$$

第1式から

$$
\widehat\beta_1
=(X_1^\top X_1)^{-1}X_1^\top(y-x_2\widehat\beta_2)
$$

を得て第2式へ代入すると

$$
x_2^\top M_1x_2\widehat\beta_2=x_2^\top M_1y,
$$

したがって

$$
\widehat\beta_2=(x_2^\top M_1x_2)^{-1}x_2^\top M_1y.
$$

$M_1^\top M_1=M_1$ なので、これは $M_1y$ を $M_1x_2$ に切片なしで回帰した係数に等しい。また

$$
\operatorname{Var}(\widehat\beta_2)
=\frac{\sigma^2}{x_2^\top M_1x_2}
=\frac{\sigma^2}{\|M_1x_2\|^2},
$$

だから $x_2$ が $X_1$ の列空間に近いほど標準誤差が大きくなる。

## 採点基準

- 残差平方和から正規方程式を導く: 4点
- ブロック消去と $\widehat\beta_2$: 5点
- 残差回帰との一致: 5点
- 残差化の解釈: 3点
- 共線性と分散: 3点

25分経過時も、正規方程式を結果だけ置かず、残差平方和の1次条件を少なくとも1行残す。
