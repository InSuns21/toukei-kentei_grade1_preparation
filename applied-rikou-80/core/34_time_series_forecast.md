# Core 34 線形時系列の多期先予測・予測誤差分散

- 安定ID: `RIKOU-CORE-34`
- 80大問 No.: 28
- 演習価値: A
- 難度: A
- 目安時間: 20〜25分
- 電卓: 四則演算のみで完結

## 問題

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t,
\qquad \varepsilon_t\overset{\mathrm{iid}}\sim(0,1)
$$

とする。$X_t=2$, $X_{t-1}=1$ が観測されている。

1. 1期先予測 $\hat X_{t+1|t}$ を求めよ。
2. 2期先予測 $\hat X_{t+2|t}$ を求めよ。
3. 1期先、2期先の予測誤差を将来イノベーションで表し、それぞれの分散を求めよ。
4. 3期先予測 $\hat X_{t+3|t}$ を求めよ。
5. 3期先予測誤差を将来イノベーションで表し、その分散を求めよ。
6. このAR(2)過程を

$$
X_t=\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}
$$

と表すとき、$\psi_j$ の漸化式を元のAR式から導け。それを用いて一般の $h$ 期先予測誤差分散を表し、多期先予測が平均0へ収束する理由も説明せよ。

## 詳細解答

### 1. 1期先予測

時刻 $t$ までの情報を $\mathcal F_t$ とする。未来のイノベーションは平均0なので

$$
E(\varepsilon_{t+1}\mid\mathcal F_t)=0.
$$

したがってAR式の条件付き期待値を取れば

$$
\begin{aligned}
\hat X_{t+1|t}
&=E(X_{t+1}\mid\mathcal F_t)\\
&=0.5X_t+0.2X_{t-1}\\
&=0.5(2)+0.2(1)\\
&=\boxed{1.2}.
\end{aligned}
$$

---

### 2. 2期先予測

$$
X_{t+2}=0.5X_{t+1}+0.2X_t+\varepsilon_{t+2}.
$$

時刻 $t$ では $X_{t+1}$ は未知なので、その条件付き平均 $\hat X_{t+1|t}$ で置き換える。

$$
\begin{aligned}
\hat X_{t+2|t}
&=0.5\hat X_{t+1|t}+0.2X_t\\
&=0.5(1.2)+0.2(2)\\
&=\boxed{1.0}.
\end{aligned}
$$

つまり多期先予測では、未知の未来値をさらにその予測値で再帰的に置き換える。

---

### 3. 1期先・2期先の予測誤差

1期先では

$$
X_{t+1}
=0.5X_t+0.2X_{t-1}+\varepsilon_{t+1}
$$

だから

$$
\boxed{
e_1=X_{t+1}-\hat X_{t+1|t}=\varepsilon_{t+1}
}.
$$

したがって

$$
\boxed{V_1=\operatorname{Var}(e_1)=1}.
$$

2期先では

$$
\begin{aligned}
X_{t+2}
&=0.5X_{t+1}+0.2X_t+\varepsilon_{t+2}\\
&=0.5\{\hat X_{t+1|t}+\varepsilon_{t+1}\}
 +0.2X_t+\varepsilon_{t+2}.
\end{aligned}
$$

予測値

$$
\hat X_{t+2|t}
=0.5\hat X_{t+1|t}+0.2X_t
$$

を引けば

$$
\boxed{
e_2=0.5\varepsilon_{t+1}+\varepsilon_{t+2}
}.
$$

未来イノベーションは互いに独立で分散1なので

$$
\boxed{
V_2=0.5^2+1=1.25
}.
$$

---

### 4. 3期先予測

予測値も未来のイノベーションを0に置いた同じ自己回帰漸化式に従う。

$$
\begin{aligned}
\hat X_{t+3|t}
&=0.5\hat X_{t+2|t}+0.2\hat X_{t+1|t}\\
&=0.5(1.0)+0.2(1.2)\\
&=0.5+0.24\\
&=\boxed{0.74}.
\end{aligned}
$$

---

### 5. 3期先予測誤差

$$
X_{t+3}=0.5X_{t+2}+0.2X_{t+1}+\varepsilon_{t+3}.
$$

予測値との差を取ると

$$
e_3=0.5e_2+0.2e_1+\varepsilon_{t+3}.
$$

第3問の式を代入して

$$
\begin{aligned}
e_3
&=0.5(0.5\varepsilon_{t+1}+\varepsilon_{t+2})
 +0.2\varepsilon_{t+1}
 +\varepsilon_{t+3}\\
&=(0.25+0.2)\varepsilon_{t+1}
 +0.5\varepsilon_{t+2}
 +\varepsilon_{t+3}.
\end{aligned}
$$

したがって

$$
\boxed{
e_3=0.45\varepsilon_{t+1}
+0.5\varepsilon_{t+2}
+\varepsilon_{t+3}
}.
$$

独立性から交差共分散は0なので

$$
\begin{aligned}
V_3
&=0.45^2+0.5^2+1\\
&=\boxed{1.4525}.
\end{aligned}
$$

ここで現れた

$$
1,\ 0.5,\ 0.45
$$

が、次問の移動平均係数 $\psi_0,\psi_1,\psi_2$ である。

---

### 6. 移動平均係数をAR式から導く

定常かつ因果的なAR過程では、現在値を現在・過去のイノベーションの線形結合として

$$
X_t
=\psi_0\varepsilon_t
+\psi_1\varepsilon_{t-1}
+\psi_2\varepsilon_{t-2}
+\cdots
$$

と表せる。

本問ではこの係数を公式として置くのではなく、元のAR式と係数比較して求める。

まず

$$
X_{t-1}
=\psi_0\varepsilon_{t-1}
+\psi_1\varepsilon_{t-2}
+\psi_2\varepsilon_{t-3}+\cdots,
$$

$$
X_{t-2}
=\psi_0\varepsilon_{t-2}
+\psi_1\varepsilon_{t-3}+\cdots.
$$

これを

$$
X_t=0.5X_{t-1}+0.2X_{t-2}+\varepsilon_t
$$

へ代入する。

右辺で $\varepsilon_t$ の係数は1なので

$$
\boxed{\psi_0=1}.
$$

$\varepsilon_{t-1}$ の係数を比較すると

$$
\psi_1=0.5\psi_0=0.5.
$$

$\varepsilon_{t-2}$ では

$$
\psi_2=0.5\psi_1+0.2\psi_0
=0.25+0.2
=0.45.
$$

一般に $j\ge2$ について

$$
\boxed{
\psi_j=0.5\psi_{j-1}+0.2\psi_{j-2}
}
$$

となる。

したがって

$$
X_{t+h}
=\sum_{j=0}^{\infty}\psi_j\varepsilon_{t+h-j}
$$

のうち、時刻 $t$ から見て未知なのは

$$
\varepsilon_{t+1},\ldots,\varepsilon_{t+h}
$$

を含む項である。条件付き期待値ではこれらの平均を0と置くため、予測誤差にはちょうど

$$
\boxed{
X_{t+h}-\hat X_{t+h|t}
=\sum_{j=0}^{h-1}\psi_j\varepsilon_{t+h-j}
}
$$

が残る。

イノベーション分散を一般に $\sigma_\varepsilon^2$ とすれば、独立性から

$$
\boxed{
V_h
=\sigma_\varepsilon^2
\sum_{j=0}^{h-1}\psi_j^2
}.
$$

本問では $\sigma_\varepsilon^2=1$ であり、$h=3$ とすれば

$$
1^2+0.5^2+0.45^2=1.4525
$$

となって第5問と一致する。

#### なぜ長期予測は0へ戻るか

未来イノベーションの条件付き平均は0なので、$h$ 期先予測値そのものは

$$
m_h=\hat X_{t+h|t}
$$

とおけば

$$
m_h=0.5m_{h-1}+0.2m_{h-2}
$$

という同次漸化式に従う。

解を $m_h=r^h$ の形で考えると

$$
r^2=0.5r+0.2,
$$

すなわち

$$
r^2-0.5r-0.2=0.
$$

根は

$$
r_{1,2}
=\frac{0.5\pm\sqrt{1.05}}{2}.
$$

どちらも絶対値が1未満なので

$$
r_1^h\to0,
\qquad
r_2^h\to0.
$$

従って初期観測 $X_t,X_{t-1}$ の影響は時間とともに消え

$$
\boxed{
\hat X_{t+h|t}\to0
}
$$

となる。0は本問の無条件平均である。

つまり長期予測が平均へ戻るのは、「定常だから」とだけ暗記するのではなく、**予測値の同次漸化式の根が単位円内にあるため初期条件の影響が減衰する**からである。

## 何を覚えるか

多期先予測は

$$
\boxed{
\text{未来イノベーションを0にして予測値を再帰計算}
}
$$

し、予測誤差は

$$
\boxed{
\text{未知の未来イノベーションだけを残して展開}
}
$$

する。

さらにAR過程では

$$
\boxed{
\text{AR式へ移動平均展開を代入して係数比較}
\Longrightarrow
\psi_j\text{ の漸化式}
}
$$

と考えれば、一般の予測誤差分散へ自然につながる。

## 本番答案

$$
\hat X_{t+1|t}=1.2,
\qquad
\hat X_{t+2|t}=1.0,
\qquad
\hat X_{t+3|t}=0.74.
$$

予測誤差は

$$
e_1=\varepsilon_{t+1},
$$

$$
e_2=0.5\varepsilon_{t+1}+\varepsilon_{t+2},
$$

$$
e_3=0.45\varepsilon_{t+1}+0.5\varepsilon_{t+2}+\varepsilon_{t+3},
$$

だから

$$
V_1=1,
\quad
V_2=1.25,
\quad
V_3=1.4525.
$$

また

$$
X_t=\sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}
$$

をAR式へ代入して係数比較すると

$$
\psi_0=1,
\qquad
\psi_1=0.5,
\qquad
\psi_j=0.5\psi_{j-1}+0.2\psi_{j-2}\quad(j\ge2).
$$

したがって

$$
X_{t+h}-\hat X_{t+h|t}
=\sum_{j=0}^{h-1}\psi_j\varepsilon_{t+h-j},
$$

$$
V_h
=\sigma_\varepsilon^2\sum_{j=0}^{h-1}\psi_j^2.
$$

予測値は $m_h=0.5m_{h-1}+0.2m_{h-2}$ に従い、その特性根の絶対値がともに1未満なので $m_h\to0$。

## 採点基準

- (1)(2) 条件付き期待値から1・2期予測: 4点
- (3) 1・2期誤差をイノベーションへ展開して分散: 4点
- (4) 3期予測: 2点
- (5) 3期誤差・分散: 4点
- (6) AR式から $\psi_j$ の漸化式を導出: 3点
- (6) 一般予測誤差分散と長期予測の収束理由: 3点

20分経過時は、予測値の数値より

$$
e_h=\sum_{j=0}^{h-1}\psi_j\varepsilon_{t+h-j}
$$

へ至る係数比較を優先する。
