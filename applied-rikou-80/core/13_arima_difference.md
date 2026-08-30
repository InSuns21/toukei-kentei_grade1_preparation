# Core 13 ARIMA・差分・単位根

- 安定ID: `RIKOU-CORE-13`
- 80大問 No.: 27
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 問題

$$
(1-B)X_t=(1+0.4B)\varepsilon_t,
\qquad \varepsilon_t\overset{\mathrm{iid}}\sim(0,\sigma^2)
$$

とする。後退作用素 $B$ は

$$
BX_t=X_{t-1}
$$

で定義する。

1. このモデルを ARIMA$(p,d,q)$ で表せ。
2. $X_t$ 自体が弱定常でない理由を、差分の累積表示から説明せよ。
3. $Y_t=\Delta X_t$ の自己共分散 $\gamma_Y(0),\gamma_Y(1)$ と自己相関 $\rho_Y(1)$ を求めよ。
4. 時点 $t$ までの情報に $\varepsilon_t$ が含まれるとし、$h$ 期先予測値を求めよ。
5. $h$ 期先予測誤差を将来イノベーションで展開し、その分散を求めよ。

## 詳細解答

### 1. 後退作用素を展開してモデル次数を読む

後退作用素の定義から

$$
(1-B)X_t=X_t-X_{t-1}=\Delta X_t.
$$

また

$$
(1+0.4B)\varepsilon_t
=\varepsilon_t+0.4\varepsilon_{t-1}.
$$

したがって元の式は

$$
\boxed{
\Delta X_t
=\varepsilon_t+0.4\varepsilon_{t-1}
}
$$

である。

1回差分した系列が MA(1) なので

- AR次数 $p=0$,
- 差分次数 $d=1$,
- MA次数 $q=1$

であり

$$
\boxed{\operatorname{ARIMA}(0,1,1)}.
$$

---

### 2. なぜ $X_t$ は弱定常でないのか

差分式を

$$
X_t-X_{t-1}=Y_t
$$

と書くと

$$
X_t=X_{t-1}+Y_t.
$$

これを繰り返し代入すれば

$$
\boxed{
X_t=X_0+\sum_{j=1}^tY_j
}.
$$

つまり $X_t$ は定常な差分 $Y_j$ を累積した水準系列である。

本問では

$$
Y_j=\varepsilon_j+0.4\varepsilon_{j-1}.
$$

よって

$$
\begin{aligned}
X_t-X_0
&=\sum_{j=1}^t(\varepsilon_j+0.4\varepsilon_{j-1})\\
&=0.4\varepsilon_0
+1.4\sum_{j=1}^{t-1}\varepsilon_j
+\varepsilon_t.
\end{aligned}
$$

したがって、$X_0$ を固定値とみなせば

$$
\begin{aligned}
\operatorname{Var}(X_t)
&=\sigma^2\{0.4^2+1.4^2(t-1)+1\}.
\end{aligned}
$$

これは $t$ に依存し、$t$ とともに線形に増加する。

弱定常過程なら分散は時点によらず一定でなければならないので

$$
\boxed{X_t\text{ は弱定常ではない}}.
$$

作用素で言えば、AR側の因子

$$
1-B
$$

が $B=1$ に根を持つ。この根を **単位根** と呼ぶ。単位根があるとショックの影響が水準へ累積されて消えず、通常の定常AR過程とはならない。

---

### 3. 差分系列 $Y_t$

$$
Y_t=\varepsilon_t+0.4\varepsilon_{t-1}
$$

だから

$$
\begin{aligned}
\gamma_Y(0)
&=\operatorname{Var}(Y_t)\\
&=\sigma^2+0.4^2\sigma^2\\
&=\boxed{1.16\sigma^2}.
\end{aligned}
$$

ラグ1では

$$
Y_{t-1}=\varepsilon_{t-1}+0.4\varepsilon_{t-2}
$$

であり、$Y_t$ と共有するイノベーションは $\varepsilon_{t-1}$ だけなので

$$
\begin{aligned}
\gamma_Y(1)
&=\operatorname{Cov}(Y_t,Y_{t-1})\\
&=0.4\operatorname{Var}(\varepsilon_{t-1})\\
&=\boxed{0.4\sigma^2}.
\end{aligned}
$$

したがって

$$
\boxed{
\rho_Y(1)
=\frac{0.4}{1.16}
=\frac{10}{29}
\approx0.345
}.
$$

$|h|\ge2$ では共有イノベーションがないので

$$
\gamma_Y(h)=0.
$$

---

### 4. $h$ 期先予測

1期先は

$$
X_{t+1}=X_t+\varepsilon_{t+1}+0.4\varepsilon_t.
$$

時点 $t$ までの情報で $X_t,\varepsilon_t$ は既知、将来イノベーションは平均0だから

$$
\boxed{
\hat X_{t+1|t}
=E[X_{t+1}\mid\mathcal F_t]
=X_t+0.4\varepsilon_t
}.
$$

2期先を実際に展開すると

$$
\begin{aligned}
X_{t+2}
&=X_{t+1}+\varepsilon_{t+2}+0.4\varepsilon_{t+1}\\
&=X_t+0.4\varepsilon_t
+1.4\varepsilon_{t+1}
+\varepsilon_{t+2}.
\end{aligned}
$$

条件付き期待値を取れば将来イノベーション項は消えるので

$$
\hat X_{t+2|t}=X_t+0.4\varepsilon_t.
$$

同様に、$h\ge1$ について

$$
\boxed{
\hat X_{t+h|t}=X_t+0.4\varepsilon_t
}.
$$

差分系列の将来平均が0なので、水準予測は現在の水準に最後の既知MA項だけを加えた値に固定される。

---

### 5. 予測誤差分散

$h=1$ では

$$
X_{t+1}-\hat X_{t+1|t}
=\varepsilon_{t+1},
$$

したがって

$$
\boxed{V_1=\sigma^2}.
$$

$h=2$ では上の展開から

$$
X_{t+2}-\hat X_{t+2|t}
=1.4\varepsilon_{t+1}+\varepsilon_{t+2}.
$$

さらに1期進めると、新しい差分

$$
\varepsilon_{t+j}+0.4\varepsilon_{t+j-1}
$$

が加わるため、中間の将来イノベーション $\varepsilon_{t+1},\ldots,\varepsilon_{t+h-1}$ は係数 $1+0.4=1.4$ で現れ、最後の $\varepsilon_{t+h}$ だけ係数1で現れる。

したがって $h\ge2$ では

$$
\boxed{
X_{t+h}-\hat X_{t+h|t}
=1.4\sum_{j=1}^{h-1}\varepsilon_{t+j}
+\varepsilon_{t+h}
}.
$$

将来イノベーションは互いに独立で分散 $\sigma^2$ なので

$$
\begin{aligned}
V_h
&=1.4^2(h-1)\sigma^2+\sigma^2\\
&=\boxed{\{1+1.4^2(h-1)\}\sigma^2},
\qquad h\ge2.
\end{aligned}
$$

予測期間 $h$ が長いほど分散が線形に増えるのも、単位根過程では将来ショックが水準に累積されるためである。

## 何を覚えるか

ARIMA では記号だけで次数を読むのではなく、まず

$$
BX_t=X_{t-1}
$$

を使って作用素式を通常の時系列式へ展開する。その後

- 差分後に何型の定常系列になるか、
- 水準系列はショックをどう累積するか、
- 予測誤差にどの将来イノベーションが残るか

を追えばよい。

## 本番答案

$$
(1-B)X_t=X_t-X_{t-1}=\Delta X_t,
$$

したがって

$$
\Delta X_t=\varepsilon_t+0.4\varepsilon_{t-1}
$$

より ARIMA$(0,1,1)$。

また

$$
X_t=X_0+\sum_{j=1}^t\Delta X_j
$$

であり、本問では

$$
\operatorname{Var}(X_t-X_0)
=\sigma^2\{0.4^2+1.4^2(t-1)+1\}
$$

と時点依存になるので $X_t$ は非定常。

$$
\gamma_Y(0)=1.16\sigma^2,
\quad
\gamma_Y(1)=0.4\sigma^2,
\quad
\rho_Y(1)=10/29.
$$

予測は

$$
\hat X_{t+h|t}=X_t+0.4\varepsilon_t.
$$

予測誤差は

$$
V_1=\sigma^2,
$$

$$
X_{t+h}-\hat X_{t+h|t}
=1.4\sum_{j=1}^{h-1}\varepsilon_{t+j}+\varepsilon_{t+h}
$$

より

$$
V_h=\{1+1.96(h-1)\}\sigma^2
\quad(h\ge2).
$$

## 採点基準

- 後退作用素を展開し ARIMA 次数を同定: 4点
- 累積表示と分散計算から非定常性を説明: 5点
- 差分系列自己相関関数: 4点
- 条件付き期待値から予測値: 3点
- 将来イノベーション展開から予測誤差分散: 4点

25分経過時は「$B$ の定義→差分式→予測誤差のイノベーション展開」を優先する。
