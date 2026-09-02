# F0-00SP3 Encore IV：Brown運動・Gaussian過程・二次変分

Brown運動は連続時間確率過程の中心例です。

熱方程式では既にGaussian heat kernelとして姿を見せました。ここでは確率過程として定義し、Itô積分が必要になる原因である二次変分まで進みます。

---

## 1. Brown運動の定義

確率過程 $(B_t)_{t\ge0}$ が標準Brown運動であるとは、

1. $B_0=0$ a.s.
2. sample path $t\mapsto B_t$ はa.s.連続
3. disjointな時間区間の増分は独立
4. $0\le s<t$ に対し

$$
\boxed{
B_t-B_s\sim N(0,t-s)
}
$$

を満たすことです。

つまり増分は時間差だけで分布が決まり、Gaussianです。

---

## 2. 各時刻の分布

$s=0$ とすれば

$$
\boxed{B_t\sim N(0,t)}.
$$

したがって

$$
E[B_t]=0,
\qquad
E[B_t^2]=t.
$$

時間とともに分散が線形に増えます。

これは熱方程式のheat kernelの分散が時間に比例したことと対応します。

---

## 3. 共分散を導く

$s\le t$ とします。

$$
B_t=B_s+(B_t-B_s)
$$

で、増分 $B_t-B_s$ は $B_s$ と独立、平均0です。

したがって

$$
\begin{aligned}
E[B_sB_t]
&=E[B_s^2]+E[B_s(B_t-B_s)]\\
&=s.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Cov}(B_s,B_t)=\min(s,t)
}
$$

です。

---

## 4. Brown運動はGaussian過程

任意の

$$
0\le t_1<\cdots<t_n
$$

について

$$
(B_{t_1},\dots,B_{t_n})
$$

はGaussian増分の線形結合として表せるので、多変量正規分布に従います。

したがってBrown運動はGaussian過程です。

平均関数0と共分散核

$$
K(s,t)=\min(s,t)
$$

が有限次元分布を決めます。

---

## 5. 存在はどこから来るか

有限個の時刻に対して、平均0・共分散 $\min(s,t)$ の多変量正規分布を指定できます。

これらが整合的であることを確認し、Kolmogorov拡張定理を使えば確率過程自体を構成できます。

さらにKolmogorov continuity theoremにより、適切な連続修正版が存在することを示せます。

この二つの定理の完全証明はEncore IVの必須にはせず、

$$
\boxed{
\text{有限次元Gaussian分布}
\to
\text{過程の存在}
\to
\text{連続path版}
}
$$

という構成経路を押さえます。

---

## 6. martingale性

Brown運動のnatural filtrationを $\mathcal F_t$ とします。

$s<t$ なら

$$
B_t=B_s+(B_t-B_s)
$$

で、未来増分は $\mathcal F_s$ と独立で平均0です。

したがって

$$
\boxed{
E[B_t\mid\mathcal F_s]=B_s
}
$$

です。

よってBrown運動は連続時間martingaleです。

---

## 7. B_t^2-tもmartingale

$s<t$ について

$$
B_t=B_s+\Delta B
$$

と書くと

$$
B_t^2
=B_s^2+2B_s\Delta B+(\Delta B)^2.
$$

条件付き期待値を取れば

$$
E[\Delta B\mid\mathcal F_s]=0,
$$

$$
E[(\Delta B)^2\mid\mathcal F_s]=t-s.
$$

したがって

$$
E[B_t^2-t\mid\mathcal F_s]
=B_s^2-s.
$$

よって

$$
\boxed{B_t^2-t\text{ はmartingale}}
$$

です。

---

## 8. scaling property

$c>0$ とし

$$
\widetilde B_t
=\frac1{\sqrt c}B_{ct}
$$

と置きます。

増分は

$$
\widetilde B_t-\widetilde B_s
\sim
N(0,t-s)
$$

となり、独立性・連続性も保たれます。

したがって

$$
\boxed{
\left\{\frac1{\sqrt c}B_{ct}\right\}_{t\ge0}
\stackrel d=
\{B_t\}_{t\ge0}
}
$$

です。

空間尺度が時間の平方根で伸びることを表します。

---

## 9. 二次変分

区間 $[0,t]$ の分割

$$
0=t_0<t_1<\cdots<t_n=t
$$

を取り

$$
Q_n
=
\sum_{k=1}^n
(B_{t_k}-B_{t_{k-1}})^2
$$

を考えます。

分割幅を0へ近づけると

$$
\boxed{Q_n\to t}
$$

が適切な意味で成り立ちます。

これを

$$
\boxed{[B]_t=t}
$$

と書きます。

---

## 10. 一様分割で平均と分散を見る

$t_k=kt/n$ とします。

各増分は

$$
\Delta B_k\sim N(0,t/n).
$$

したがって

$$
E[(\Delta B_k)^2]=t/n
$$

なので

$$
E[Q_n]=t.
$$

Gaussianの四次モーメント

$$
E[(\Delta B_k)^4]=3(t/n)^2
$$

を使うと

$$
\operatorname{Var}((\Delta B_k)^2)
=2(t/n)^2.
$$

独立性から

$$
\operatorname{Var}(Q_n)
=\frac{2t^2}{n}
\to0.
$$

したがって

$$
Q_n\to t
$$

が $L^2$、したがって確率収束で得られます。

---

## 11. 滑らかなpathなら二次変分は0

十分滑らかな関数 $x(t)$ では

$$
\Delta x_k
\approx x'(t_k)\Delta t_k.
$$

したがって

$$
\sum(\Delta x_k)^2
$$

は分割幅とともに0へ消えます。

一方Brown運動では

$$
\sum(\Delta B_k)^2\to t.
$$

つまりBrown運動のpathは通常の滑らかな曲線とは根本的に違います。

---

## 12. 通常の微積分が壊れる

通常の微積分では二次の微小量

$$
(dx)^2
$$

は高次項として捨てます。

しかしBrown運動では形式的に

$$
\boxed{(dB_t)^2=dt}
$$

に対応する二次変分が残ります。

このためTaylor展開で二階項を捨てられません。

これがItô公式に

$$
\frac12 f''
$$

項が現れる理由です。

---

## 13. 非微分可能性

Brown運動のsample pathはa.s.至る所で通常の意味に微分可能、ではありません。実際、a.s.どの点でも微分可能でないという非常に粗いpathを持ちます。

完全証明は発展としますが、scalingと二次変分からも「速度 $dB_t/dt$ を普通の関数として持つ」ことが不可能そうだと分かります。

---

## 14. white noiseとの接続

形式的に

$$
\xi(t)=\frac{dB_t}{dt}
$$

と書く対象をwhite noiseと呼びます。

しかしBrown運動は通常微分できないので、$\xi(t)$ は普通の関数ではありません。

Encore IIIの言葉では、white noiseをSchwartz超関数値のランダム対象として扱うのが自然です。

形式的な共分散

$$
E[\xi(t)\xi(s)]
=\delta(t-s)
$$

にDirac deltaが現れます。

---

## 15. Itô積分への入口

次章では

$$
\int_0^t H_s\,dB_s
$$

を定義します。

通常のRiemann--Stieltjes積分ではBrown運動pathの粗さが問題になります。

そこで

- predictableな被積分過程
- $L^2$ 極限
- Itô isometry

を使って確率的積分を構成します。

---

## 演習

### F0-00SP3-A01 共分散と増分分布

- Level: A
- 目安時間: 12分

標準Brown運動について $s=1,t=3$ とする。

1. $\operatorname{Cov}(B_1,B_3)$ を求めよ。
2. $B_3-B_1$ の分布を求めよ。
3. $\operatorname{Corr}(B_1,B_3)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$\operatorname{Cov}(B_s,B_t)=\min(s,t)$ より共分散は1。増分は $N(0,3-1)=N(0,2)$。また $\operatorname{Var}(B_1)=1$, $\operatorname{Var}(B_3)=3$ なので

$$
\operatorname{Corr}(B_1,B_3)=\frac1{\sqrt{1\cdot3}}=\frac1{\sqrt3}.
$$

#### 本番答案

$\operatorname{Cov}(B_1,B_3)=1$、$B_3-B_1\sim N(0,2)$、$\operatorname{Corr}(B_1,B_3)=1/\sqrt3$。

#### 採点基準（20点）
- 共分散: 6点
- 増分分布: 7点
- 相関係数: 7点
<!-- solution-end -->

### F0-00SP3-B01 二次変分を $L^2$ で確認する

- Level: B
- 目安時間: 18分

$[0,t]$ を $n$ 等分し

$$
Q_n=\sum_{k=1}^n(B_{kt/n}-B_{(k-1)t/n})^2
$$

とする。$E[Q_n]$ と $\operatorname{Var}(Q_n)$ を求め、$Q_n\to t$ in $L^2$ を示せ。

<!-- solution-start -->
#### 詳細解答

各増分 $\Delta B_k\sim N(0,t/n)$ は独立。よって $E[(\Delta B_k)^2]=t/n$ から $E[Q_n]=t$。正規分布の四次モーメントより

$$
\operatorname{Var}((\Delta B_k)^2)=2(t/n)^2.
$$

独立性から

$$
\operatorname{Var}(Q_n)=n\,2(t/n)^2=\frac{2t^2}{n}.
$$

したがって $E[(Q_n-t)^2]=2t^2/n\to0$。

#### 本番答案

$E[Q_n]=t$, $\operatorname{Var}(Q_n)=2t^2/n$。従って $E[(Q_n-t)^2]\to0$ なので $Q_n\to t$ in $L^2$。

#### 採点基準（20点）
- 増分の分布・独立性: 4点
- 期待値: 5点
- 四次モーメントから分散: 7点
- $L^2$収束: 4点
<!-- solution-end -->

---

## 章末チェック

- Brown運動の定義を説明できる。
- $B_t\sim N(0,t)$ を導ける。
- 共分散 $\min(s,t)$ を導ける。
- Brown運動がGaussian過程・martingaleであることを説明できる。
- $B_t^2-t$ のmartingale性を示せる。
- scaling propertyを説明できる。
- 一様分割で二次変分が $t$ へ収束することを計算できる。
- 二次変分がItô公式の二階項につながることを説明できる。
- white noiseとSchwartz超関数の接続を説明できる。
