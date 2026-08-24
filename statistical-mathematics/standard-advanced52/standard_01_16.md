# Standard 01–16

---

# Standard 01 二変量一様分布・条件付き分布・幾何確率

- 旧No.: 11
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$(U,V)$ は正方形 $[-1,1]^2$ 上の一様分布に従う。$D=\{|U-V|\le1\}$ とする。

1. $P(U^2+V^2\le1)$ と $P(D)$ を求めよ。
2. $D$ の下での条件付き同時密度を求めよ。
3. $V\mid D$ の密度と分散を求めよ。
4. $\operatorname{Corr}(U,V\mid D)$ を求めよ。

## 詳細解答

同時密度は正方形上で $1/4$。円の面積比から

$$
P(U^2+V^2\le1)=\frac{\pi}{4}.
$$

$D$ は正方形から脚長1の三角形2個を除いた領域なので面積は3、従って

$$
P(D)=\frac34,
\qquad
f_{U,V\mid D}(u,v)=\frac13
$$

ただし $-1\le u,v\le1$, $|u-v|\le1$。

周辺化すると

$$
f_{V\mid D}(v)=
\begin{cases}
(2+v)/3,&-1<v<0,\\
(2-v)/3,&0<v<1.
\end{cases}
$$

対称性から $E[V\mid D]=0$。積分より

$$
E[V^2\mid D]=\frac{5}{18},
\qquad
E[UV\mid D]=\frac{5}{36}.
$$

従って

$$
\operatorname{Corr}(U,V\mid D)
=\frac{5/36}{5/18}
=\frac12.
$$

独立な変数でも、選択条件で条件付けると依存が生じうる。

## 本番答案

$[-1,1]^2$ 上で一様なので確率は面積比。円内確率は $\pi/4$。$D$ の面積は $4-1/2-1/2=3$ だから $P(D)=3/4$、条件付き密度は $1/3$。

$$
f_{V\mid D}(v)=
\begin{cases}(2+v)/3,&-1<v<0,\\(2-v)/3,&0<v<1,
\end{cases}
$$

より $E[V\mid D]=0$, $\operatorname{Var}(V\mid D)=5/18$。また $E[UV\mid D]=5/36$ なので相関係数は $1/2$。

## 採点基準

- 幾何確率2個: 5点
- 条件付き同時密度: 4点
- 周辺密度・分散: 6点
- 条件付き相関: 5点

---

# Standard 02 カイ二乗・Cauchy・逆関数法

- 旧No.: 12
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（逆三角関数の数値評価不要）

## 問題

独立な $Z_1,Z_2\sim N(0,1)$ に対し $X=Z_1/Z_2$ とする。

1. $X$ の分布を求めよ。
2. $W=\arctan X$ の分布を求めよ。
3. $U\sim U(0,1)$ から標準Cauchy乱数を生成する式を求めよ。
4. $Z^2\sim\chi_1^2$ を用いて $t_1$ とCauchyの関係を説明せよ。

## 詳細解答

$X=Z_1/Z_2$ は標準Cauchy分布で

$$
f_X(x)=\frac{1}{\pi(1+x^2)}.
$$

$W=\arctan X$ では $X=\tan W$, $dx/dw=\sec^2w$。従って

$$
f_W(w)=\frac{1}{\pi(1+\tan^2w)}\sec^2w=\frac1\pi,
\qquad -\frac\pi2<w<\frac\pi2.
$$

よって $W\sim U(-\pi/2,\pi/2)$。逆に

$$
\boxed{X=\tan\{\pi(U-1/2)\}}
$$

で標準Cauchy乱数を生成できる。数値的な $\tan$ 評価は設問対象でない。

また $V=Z_2^2\sim\chi_1^2$ とすれば

$$
\frac{Z_1}{\sqrt{V}}
$$

は $t_1$。符号対称性により $Z_1/|Z_2|$ と $Z_1/Z_2$ は同分布なので $t_1$ はCauchy分布である。

## 本番答案

独立標準正規の比は標準Cauchy。$W=\arctan X$ と置けばJacobianにより $f_W(w)=1/\pi$ だから一様分布。従って

$$
X=\tan\{\pi(U-1/2)\}.
$$

さらに $Z_2^2\sim\chi_1^2$ より $t_1=\text{Cauchy}(0,1)$。

## 採点基準

- Cauchy分布: 5点
- $\arctan$ 変換: 6点
- 逆関数法: 5点
- $t_1$ との接続: 4点

---

# Standard 03 指数分布MGF・指数傾斜

- 旧No.: 13
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X\sim\operatorname{Exp}(\lambda)$, $\lambda>0$ とする。

1. MGF $M_X(t)$ を求めよ。
2. $t<\lambda$ に対し

$$
f_t(x)=\frac{e^{tx}f(x)}{M_X(t)}
$$

で定める指数傾斜分布を求めよ。
3. $f_t$ の平均・分散を求めよ。
4. $d\log M_X(t)/dt$ の確率的意味を述べよ。

## 詳細解答

$$
M_X(t)=\int_0^\infty \lambda e^{-(\lambda-t)x}dx
=\frac{\lambda}{\lambda-t},
\qquad t<\lambda.
$$

従って

$$
f_t(x)=e^{tx}\lambda e^{-\lambda x}\frac{\lambda-t}{\lambda}
=(\lambda-t)e^{-(\lambda-t)x}.
$$

つまり $f_t$ は率 $\lambda-t$ の指数分布。よって

$$
E_t[X]=\frac1{\lambda-t},
\qquad
\operatorname{Var}_t(X)=\frac1{(\lambda-t)^2}.
$$

また一般に

$$
\frac{d}{dt}\log M_X(t)=E_t[X],
\qquad
\frac{d^2}{dt^2}\log M_X(t)=\operatorname{Var}_t(X).
$$

## 本番答案

$M_X(t)=\lambda/(\lambda-t)$。指数傾斜後は

$$
f_t(x)=(\lambda-t)e^{-(\lambda-t)x},
$$

従って $E_tX=(\lambda-t)^{-1}$, $\operatorname{Var}_tX=(\lambda-t)^{-2}$。$\log M$ の1階・2階微分は傾斜分布下の平均・分散を与える。

## 採点基準

- MGF: 5点
- 傾斜分布: 6点
- 平均・分散: 5点
- 対数MGFの解釈: 4点

---

# Standard 04 標本中心モーメント・不偏補正

- 旧No.: 14
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$i.i.d.$ 標本 $X_1,\ldots,X_n$ の母平均を $\mu$、母分散を $\sigma^2$、三次中心モーメントを $\mu_3$ とする。

$$
m_2=\frac1n\sum_{i=1}^n(X_i-\bar X)^2,
\qquad
m_3=\frac1n\sum_{i=1}^n(X_i-\bar X)^3
$$

とする。

1. $E[m_2]$ を求めよ。
2. $E[m_3]$ を求めよ。
3. $\sigma^2,\mu_3$ の不偏推定量を作れ。

## 詳細解答

既知の分解

$$
\sum(X_i-\bar X)^2
=\sum(X_i-\mu)^2-n(\bar X-\mu)^2
$$

より

$$
E[m_2]=\frac{n-1}{n}\sigma^2.
$$

三次について $Y_i=X_i-\mu$, $\bar Y=\bar X-\mu$ と置き

$$
\sum(Y_i-\bar Y)^3
=\sum Y_i^3-3\bar Y\sum Y_i^2+2n\bar Y^3.
$$

独立性を用いて期待値を取ると

$$
E[m_3]=\frac{(n-1)(n-2)}{n^2}\mu_3.
$$

従って

$$
\boxed{S^2=\frac{n}{n-1}m_2},
\qquad
\boxed{\widehat\mu_3=\frac{n^2}{(n-1)(n-2)}m_3}
$$

が不偏。ただし三次は $n\ge3$。

## 本番答案

$$
E[m_2]=\frac{n-1}{n}\sigma^2,
\qquad
E[m_3]=\frac{(n-1)(n-2)}{n^2}\mu_3.
$$

従って不偏化は

$$
\frac{n}{n-1}m_2,
\qquad
\frac{n^2}{(n-1)(n-2)}m_3.
$$

## 採点基準

- 二次中心モーメント: 5点
- 三次の展開: 6点
- 三次の期待値: 5点
- 不偏化: 4点

---

# Standard 05 標本平均の歪度・尖度

- 旧No.: 15
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_i$ はi.i.d.で平均 $\mu$、分散 $\sigma^2>0$、歪度 $\gamma_1$、超過尖度 $\gamma_2$ を持つ。$\bar X_n$ の歪度と超過尖度を求め、CLTとの関係を説明せよ。

## 詳細解答

$S_n=\sum(X_i-\mu)$ とすると独立性から

$$
E[S_n^3]=n\mu_3,
\qquad
\operatorname{Var}(S_n)=n\sigma^2.
$$

従って標準化三次モーメントは

$$
\gamma_1(\bar X_n)=\frac{n\mu_3}{(n\sigma^2)^{3/2}}
=\frac{\gamma_1}{\sqrt n}.
$$

四次中心モーメントは

$$
E[S_n^4]=n\mu_4+3n(n-1)\sigma^4.
$$

従って尖度は

$$
3+\frac{\gamma_2}{n},
$$

すなわち超過尖度は $\gamma_2/n$。両者とも0へ行き、標準化標本平均の形が正規に近づくことと整合する。

## 本番答案

$$
\boxed{\gamma_1(\bar X_n)=\gamma_1/\sqrt n},
\qquad
\boxed{\gamma_2(\bar X_n)=\gamma_2/n}.
$$

従って標本平均の非対称性・裾の非正規性は標本サイズとともに減衰し、CLTと整合する。

## 採点基準

- 三次モーメント: 6点
- 歪度: 4点
- 四次モーメント: 6点
- 尖度・CLT解釈: 4点

---

# Standard 06 依存する一様分布・無相関

- 旧No.: 16
- 層: Standard
- 演習価値: B
- 難度: B
- 目安時間: 15分
- 手計算監査: ◎

## 問題

$U\sim U(-1,1)$ とし

$$
V=2|U|-1
$$

と定める。

1. $V$ の分布を求めよ。
2. $\operatorname{Corr}(U,V)$ を求めよ。
3. $U,V$ が独立でないことを示せ。

## 詳細解答

$|U|\sim U(0,1)$ だから線形変換により

$$
V\sim U(-1,1).
$$

対称性から $E[U]=E[V]=0$。また $U|U|$ は奇関数なので

$$
E[UV]=E[U(2|U|-1)]=0.
$$

従って相関係数は0。

しかし $V$ は $U$ の決定論的関数である。例えば $V>0$ なら $|U|>1/2$ が必ず成り立つので独立ではない。

## 本番答案

$|U|\sim U(0,1)$ より $V\sim U(-1,1)$。対称性から $E[UV]=0$ なので無相関。一方 $V=2|U|-1$ は $U$ の関数であり独立ではない。

## 採点基準

- $V$ の分布: 6点
- 共分散0: 6点
- 非独立の証明: 6点
- 解釈: 2点

---

# Standard 07 経験分布・tail integral・混合重尾

- 旧No.: 19
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

観測値が $1,1,2,4$ であった。

1. 経験分布関数 $F_4(x)$ を書け。
2. 非負変数に対する恒等式 $E[X]=\int_0^\infty P(X>t)dt$ を経験分布に適用し、標本平均を再現せよ。
3. $X$ が確率 $1-\varepsilon$ で指数分布、確率 $\varepsilon$ でPareto分布 $P(X>x)=x^{-\alpha}$, $x\ge1$ に従うとき、十分大きな $x$ でtailを支配する成分を述べよ。

## 詳細解答

経験CDFは

$$
F_4(x)=
\begin{cases}
0,&x<1,\\
1/2,&1\le x<2,\\
3/4,&2\le x<4,\\
1,&x\ge4.
\end{cases}
$$

従って経験tailは区間ごとに $1,1/2,1/4,0$ となり

$$
\int_0^\infty(1-F_4(t))dt
=1+\frac12(2-1)+\frac14(4-2)=2.
$$

これは標本平均 $(1+1+2+4)/4=2$ と一致。

混合tailは

$$
P(X>x)=(1-\varepsilon)e^{-x}+\varepsilon x^{-\alpha}
$$

の形で、指数減衰より多項式減衰の方が遅いので大きな $x$ ではPareto成分が支配する。

## 本番答案

経験CDFを段階関数として書き、$\int(1-F_4)=2=\bar X$ を確認する。混合分布では $e^{-x}$ より $x^{-\alpha}$ が遅く減衰するので、少量混合でも極端なtailはPareto成分が支配する。

## 採点基準

- 経験CDF: 6点
- tail integral: 6点
- 標本平均との一致: 3点
- 重尾の判定: 5点

---

# Standard 08 最大順序統計量・極値極限

- 旧No.: 20
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 15分
- 手計算監査: ◎

## 問題

$U_1,\ldots,U_n\overset{iid}\sim U(0,1)$ とし $M_n=\max_iU_i$ とする。

1. $M_n$ のCDFを求めよ。
2. $n(1-M_n)$ の極限分布を求めよ。
3. $E[M_n]$ を求めよ。

## 詳細解答

$0<m<1$ で

$$
P(M_n\le m)=m^n.
$$

$x\ge0$ に対し

$$
P\{n(1-M_n)>x\}
=P(M_n<1-x/n)
=(1-x/n)^n\to e^{-x}.
$$

従って

$$
\boxed{n(1-M_n)\Rightarrow\operatorname{Exp}(1)}.
$$

また $M_n\sim\operatorname{Beta}(n,1)$ より

$$
E[M_n]=\frac{n}{n+1}.
$$

## 本番答案

$F_{M_n}(m)=m^n$。従って

$$
P\{n(1-M_n)>x\}=(1-x/n)^n\to e^{-x},
$$

ゆえに $n(1-M_n)\Rightarrow Exp(1)$。また $E[M_n]=n/(n+1)$。

## 採点基準

- 最大値CDF: 6点
- 極限計算: 8点
- 極限分布の同定: 3点
- 期待値: 3点

---

# Standard 09 多項分布・共分散行列・多変量CLT

- 旧No.: 21
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$(N_1,\ldots,N_k)\sim\operatorname{Multinomial}(n;p_1,\ldots,p_k)$, $\hat p_i=N_i/n$ とする。

1. $\hat p$ の共分散行列を求めよ。
2. 多変量CLTを書け。
3. 共分散行列が特異になる理由を説明せよ。
4. $k=3$, $p=(1/2,1/3,1/6)$ のとき $\sqrt n(\hat p_1-\hat p_2-(p_1-p_2))$ の漸近分散を求めよ。

## 詳細解答

1試行のone-hotベクトルの共分散は

$$
\Sigma=\operatorname{diag}(p)-pp^T.
$$

従って

$$
\operatorname{Cov}(\hat p)=\frac1n\Sigma,
\qquad
\sqrt n(\hat p-p)\Rightarrow N_k(0,\Sigma).
$$

$\sum\hat p_i=1$ が恒等的に成り立つため $\Sigma\mathbf 1=0$、ランクは高々 $k-1$。

$a=(1,-1,0)^T$ とすると漸近分散は

$$
a^T\Sigma a=p_1+p_2-(p_1-p_2)^2
=\frac56-\frac1{36}=\frac{29}{36}.
$$

## 本番答案

$$
\Sigma=\operatorname{diag}(p)-pp^T,
\qquad
\sqrt n(\hat p-p)\Rightarrow N(0,\Sigma).
$$

確率和が1なので $\Sigma\mathbf1=0$ で特異。指定コントラストの分散は $29/36$。

## 採点基準

- 共分散行列: 6点
- 多変量CLT: 5点
- 特異性: 4点
- コントラスト分散: 5点

---

# Standard 10 階層Bernoulli・全分散・級内相関

- 旧No.: 22
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$P\sim\operatorname{Beta}(a,b)$ とし、$P$ を与えた下で $X_1,\ldots,X_m$ は独立な $\operatorname{Bernoulli}(P)$ とする。

1. $E[X_i]$, $\operatorname{Var}(X_i)$ を求めよ。
2. $i\ne j$ に対し $\operatorname{Cov}(X_i,X_j)$ を求めよ。
3. 級内相関を求めよ。

## 詳細解答

$$
E[X_i]=E[E(X_i\mid P)]=E[P]=\frac{a}{a+b}.
$$

周辺では $X_i$ は成功確率 $a/(a+b)$ のBernoulliなので

$$
\operatorname{Var}(X_i)=\frac{ab}{(a+b)^2}.
$$

条件付き独立性より

$$
\operatorname{Cov}(X_i,X_j)
=\operatorname{Cov}(E[X_i\mid P],E[X_j\mid P])
=\operatorname{Var}(P)
=\frac{ab}{(a+b)^2(a+b+1)}.
$$

従って級内相関は

$$
\boxed{\rho=\frac1{a+b+1}}.
$$

条件付きでは独立でも、共通のランダム効果 $P$ を積分消去すると正の相関が生じる。

## 本番答案

全期待値・全共分散を使うと

$$
E[X_i]=\frac a{a+b},
\quad
\operatorname{Var}(X_i)=\frac{ab}{(a+b)^2},
$$

$$
\operatorname{Cov}(X_i,X_j)=\operatorname{Var}(P)
=\frac{ab}{(a+b)^2(a+b+1)}.
$$

よって $\rho=1/(a+b+1)$。

## 採点基準

- 平均: 4点
- 分散: 5点
- 共分散: 7点
- 級内相関・解釈: 4点

---

# Standard 11 二値化正規・相関減衰

- 旧No.: 29
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$(X,Y)$ は平均0、分散1、相関 $\rho$ の2変量正規分布とする。$A=1\{X>0\}$, $B=1\{Y>0\}$ とする。

1. $E[A],\operatorname{Var}(A)$ を求めよ。
2. 公式

$$
P(X>0,Y>0)=\frac14+\frac{1}{2\pi}\arcsin\rho
$$

を用いて $\operatorname{Corr}(A,B)$ を求めよ。
3. $\rho=1/2$ の場合を求め、二値化による相関の変化を述べよ。

## 詳細解答

対称性から $E[A]=1/2$, $\operatorname{Var}(A)=1/4$。また

$$
\operatorname{Cov}(A,B)
=P(X>0,Y>0)-\frac14
=\frac{1}{2\pi}\arcsin\rho.
$$

従って

$$
\boxed{\operatorname{Corr}(A,B)=\frac{2}{\pi}\arcsin\rho}.
$$

$\rho=1/2$ なら $\arcsin(1/2)=\pi/6$ なので

$$
\operatorname{Corr}(A,B)=\frac13.
$$

元の相関 $1/2$ より小さく、粗い二値化で線形関係の情報が失われている。

## 本番答案

$A,B$ は成功確率 $1/2$ のBernoulli。四分円確率公式より

$$
\operatorname{Corr}(A,B)=4\left(P(X>0,Y>0)-\frac14\right)
=\frac2\pi\arcsin\rho.
$$

$\rho=1/2$ では $1/3$。

## 採点基準

- Bernoulliモーメント: 4点
- 共分散: 6点
- 相関公式: 6点
- 特殊値・解釈: 4点

---

# Standard 12 不均一分散Gaussian bridge

- 旧No.: 32
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

独立に $X_i\sim N(\mu_i,\sigma_i^2)$, $i=1,\ldots,n$ とし $T=\sum_iX_i$ とする。$M=\sum_i\mu_i$, $V=\sum_i\sigma_i^2$ と置く。

1. $X_i\mid T=t$ の平均と分散を求めよ。
2. $i\ne j$ の条件付き共分散を求めよ。
3. 等分散の場合に通常のGaussian bridge公式へ戻ることを確認せよ。

## 詳細解答

$(X_i,T)$ は2変量正規で

$$
\operatorname{Cov}(X_i,T)=\sigma_i^2,
\qquad
\operatorname{Var}(T)=V.
$$

条件付き正規公式より

$$
E[X_i\mid T=t]
=\mu_i+\frac{\sigma_i^2}{V}(t-M),
$$

$$
\operatorname{Var}(X_i\mid T)
=\sigma_i^2-\frac{\sigma_i^4}{V}.
$$

$i\ne j$ では元の共分散が0なので

$$
\operatorname{Cov}(X_i,X_j\mid T)
=-\frac{\sigma_i^2\sigma_j^2}{V}.
$$

全て $\sigma_i^2=\sigma^2$ なら重みは $1/n$ となり、条件付き平均は $\mu_i+(t-M)/n$。同平均なら部分和bridgeの基本形に一致する。

## 本番答案

$$
E[X_i\mid T=t]=\mu_i+\frac{\sigma_i^2}{V}(t-M),
$$

$$
\operatorname{Var}(X_i\mid T)=\sigma_i^2-\frac{\sigma_i^4}{V},
\quad
\operatorname{Cov}(X_i,X_j\mid T)=-\frac{\sigma_i^2\sigma_j^2}{V}.
$$

等分散なら条件付き補正重みは $1/n$。

## 採点基準

- 共分散構造: 5点
- 条件付き平均: 6点
- 条件付き分散・共分散: 6点
- 等分散への帰着: 3点

---

# Standard 13 ノイズ付き線形観測の条件付き正規

- 旧No.: 36
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$X\sim N_p(\mu,\Sigma)$、$\varepsilon\sim N(0,\tau^2)$ は独立で、

$$
Y=a^TX+\varepsilon
$$

を観測する。

1. $(X,Y)$ の平均と共分散を求めよ。
2. $X\mid Y=y$ の分布を求めよ。
3. $\tau^2\to0$ と $\tau^2\to\infty$ の極限を解釈せよ。

## 詳細解答

$$
E[Y]=a^T\mu,
\quad
\operatorname{Var}(Y)=a^T\Sigma a+\tau^2,
\quad
\operatorname{Cov}(X,Y)=\Sigma a.
$$

よって条件付き正規公式から

$$
E[X\mid Y=y]
=\mu+\frac{\Sigma a}{a^T\Sigma a+\tau^2}(y-a^T\mu),
$$

$$
\operatorname{Cov}(X\mid Y)
=\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}.
$$

$\tau^2\to0$ では線形制約 $a^TX=y$ をほぼ正確に観測し、$\tau^2\to\infty$ では観測情報が消えて事前分布 $N_p(\mu,\Sigma)$ に戻る。

## 本番答案

$(X,Y)$ の共分散ブロックは $\operatorname{Cov}(X,Y)=\Sigma a$, $\operatorname{Var}(Y)=a^T\Sigma a+\tau^2$。従って

$$
X\mid Y=y\sim N_p\left(
\mu+\frac{\Sigma a}{a^T\Sigma a+\tau^2}(y-a^T\mu),
\Sigma-\frac{\Sigma aa^T\Sigma}{a^T\Sigma a+\tau^2}
\right).
$$

## 採点基準

- 同時モーメント: 6点
- 条件付き平均: 6点
- 条件付き共分散: 5点
- 極限解釈: 3点

---

# Standard 14 二項比率Wald区間・被覆確率

- 旧No.: 47
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（巨大な二項和の数値評価不要）

## 問題

$X\sim\operatorname{Binomial}(n,p)$, $\hat p=X/n$ とする。

1. Wald型95%信頼区間を書け。
2. 真の $p$ に対する有限標本被覆確率を二項和で表せ。
3. $X=0$ のとき何が起こるか述べ、境界付近でWald区間が不安定な理由を説明せよ。

## 詳細解答

Wald区間は

$$
I_W(X)=\left[
\hat p-1.96\sqrt{\frac{\hat p(1-\hat p)}n},
\hat p+1.96\sqrt{\frac{\hat p(1-\hat p)}n}
\right].
$$

有限標本被覆確率は

$$
C_n(p)=\sum_{x=0}^n
1\{p\in I_W(x)\}
\binom nxp^x(1-p)^{n-x}.
$$

ここで数値和の評価自体は要求しない。

$X=0$ なら $\hat p=0$ かつ推定標準誤差も0なので Wald区間は $[0,0]$ に退化する。真の $p>0$ は被覆しない。境界では正規近似とplug-in標準誤差が同時に悪化する。

## 本番答案

Wald区間は $\hat p\pm1.96\sqrt{\hat p(1-\hat p)/n}$。被覆率は

$$
\sum_x1\{p\in I_W(x)\}\binom nxp^x(1-p)^{n-x}.
$$

$X=0$ では区間が $[0,0]$ に退化し、境界近傍で被覆率が名目値から大きく外れうる。

## 採点基準

- Wald区間: 5点
- 被覆確率の有限和: 6点
- $X=0$ の分析: 5点
- 近似不良の説明: 4点

---

# Standard 15 二項2母数モーメント法・識別

- 旧No.: 50
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n\overset{iid}\sim\operatorname{Binomial}(m,p)$ とし、$m>0$, $0<p<1$ をともに未知とする。標本平均を $\bar X$、分母 $n$ の標本分散を $s_n^2$ とする。

1. 母平均・母分散から $m,p$ を表せ。
2. モーメント推定量を求めよ。
3. 識別に必要な条件を述べよ。
4. $m$ が整数母数であることへの実務上の扱いを述べよ。

## 詳細解答

$$
\mu=mp,
\qquad
v=mp(1-p)=\mu(1-p).
$$

従って

$$
p=1-\frac v\mu,
\qquad
m=\frac\mu p=\frac{\mu^2}{\mu-v}.
$$

よって

$$
\boxed{\tilde p=1-\frac{s_n^2}{\bar X}},
\qquad
\boxed{\tilde m=\frac{\bar X^2}{\bar X-s_n^2}}.
$$

有限な正の推定値には $0<s_n^2<\bar X$ が必要。母集団では $0<v<\mu$ が $0<p<1$ に対応する。

MoMの $\tilde m$ は実数になりうる。整数制約を課すなら近傍整数を候補にして尤度で選ぶなど、別の離散最適化が必要であり、単純な丸めは理論上のMoMそのものではない。

## 本番答案

$\mu=mp$, $v=mp(1-p)$ なので

$$
p=1-v/\mu,
\qquad
m=\mu^2/(\mu-v).
$$

従って $\mu,v$ を $\bar X,s_n^2$ で置換する。識別には $0<v<\mu$。整数制約はMoM後に別途扱う。

## 採点基準

- 母モーメント: 4点
- 逆変換: 6点
- MoM推定量: 5点
- 識別・整数制約: 5点

---

# Standard 16 Pareto MLE・有限標本バイアス・効率

- 旧No.: 52
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

既知の $x_m>0$ に対し

$$
f(x;\alpha)=\alpha x_m^\alpha x^{-(\alpha+1)},
\qquad x\ge x_m,
$$

$\alpha>0$ とする。$X_1,\ldots,X_n$ はi.i.d.。

1. $\alpha$ のMLEを求めよ。
2. $Y_i=\log(X_i/x_m)$ の分布を求めよ。
3. MLEの期待値と不偏化を求めよ。
4. MLEの漸近分散を求め、Fisher情報量と比較せよ。

## 詳細解答

対数尤度は

$$
\ell(\alpha)=n\log\alpha+n\alpha\log x_m-(\alpha+1)\sum\log X_i.
$$

従って

$$
\widehat\alpha=\frac{n}{\sum_i\log(X_i/x_m)}.
$$

変換すると $Y_i\sim\operatorname{Exp}(\alpha)$。$S=\sum Y_i\sim\operatorname{Gamma}(n,\text{rate }\alpha)$ なので $n>1$ で

$$
E[1/S]=\frac{\alpha}{n-1},
$$

従って

$$
E[\widehat\alpha]=\frac{n}{n-1}\alpha.
$$

不偏推定量は

$$
\widetilde\alpha=\frac{n-1}{S}.
$$

1標本Fisher情報量は $1/\alpha^2$ なので、MLEの漸近分散は

$$
\frac{\alpha^2}{n},
$$

Cramér–Rao型の漸近下限に一致する。

## 本番答案

$Y_i=\log(X_i/x_m)\sim Exp(\alpha)$ とすれば

$$
\widehat\alpha=\frac n{\sum Y_i}.
$$

$\sum Y_i\sim Gamma(n,\text{rate }\alpha)$ より $E\widehat\alpha=n\alpha/(n-1)$、従って $(n-1)/\sum Y_i$ は不偏。Fisher情報は $n/\alpha^2$ なので MLEの漸近分散は $\alpha^2/n$。

## 採点基準

- MLE: 6点
- 指数分布への変換: 4点
- バイアス・不偏化: 6点
- Fisher情報・漸近効率: 4点
