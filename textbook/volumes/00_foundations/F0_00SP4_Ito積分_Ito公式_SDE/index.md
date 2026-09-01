# F0-00SP4 Encore IV：Ito積分・Ito公式・確率微分方程式

Brown運動は二次変分

$$
[B]_t=t
$$

を持ち、通常の滑らかな関数とは違います。

そこでBrown運動に沿った積分とchain ruleを別に構成します。

---

## 1. simple predictable processから始める

分割

$$
0=t_0<t_1<\cdots<t_n=T
$$

を取り

$$
H_t
=
\sum_{k=0}^{n-1}
H_k1_{(t_k,t_{k+1}]}(t)
$$

とします。

各 $H_k$ は $\mathcal F_{t_k}$ 可測とします。

つまり次のBrown増分を見る前に係数を決めています。

---

## 2. Ito積分の定義

simple predictable processに対して

$$
\boxed{
\int_0^T H_t\,dB_t
=
\sum_{k=0}^{n-1}
H_k(B_{t_{k+1}}-B_{t_k})
}
$$

と定義します。

離散時間martingale transformの連続時間版です。

---

## 3. 平均は0

未来増分

$$
B_{t_{k+1}}-B_{t_k}
$$

は $\mathcal F_{t_k}$ と独立で平均0なので

$$
E\left[
H_k(B_{t_{k+1}}-B_{t_k})
\right]=0.
$$

したがって

$$
\boxed{
E\left[\int_0^T H_t\,dB_t\right]=0
}
$$

です。

---

## 4. Ito isometry

二乗期待値を計算します。

異なる区間のcross termはmartingale差分の直交性で消えます。

各項について

$$
E\left[
H_k^2(B_{t_{k+1}}-B_{t_k})^2
\right]
=
E[H_k^2]\,\left(t_{k+1}-t_k\right).
$$

したがって

$$
\boxed{
E\left[
\left(\int_0^T H_t\,dB_t\right)^2
\right]
=
E\left[
\int_0^T H_t^2\,dt
\right]
}
$$

です。

これがIto isometryです。

---

## 5. L2極限で一般化する

simple predictable process $H^{(n)}$ が $H$ へ

$$
E\int_0^T
|H_t^{(n)}-H_t|^2dt
\to0
$$

で近づくとします。

Ito isometryにより積分側も $L^2(\Omega)$ でCauchyになります。

そこで

$$
\boxed{
\int_0^T H_t\,dB_t
=
L^2\text{-}\lim_n
\int_0^T H_t^{(n)}\,dB_t
}
$$

と定義します。

Hilbert空間の完備性が確率積分の構成そのものに使われています。

---

## 6. Ito積分はmartingale

$$
M_t
=
\int_0^t H_s\,dB_s
$$

と置きます。

適切な平方可積分性の下で

$$
\boxed{M_t\text{ はmartingale}}
$$

です。

また二次変分は

$$
[M]_t
=
\int_0^t H_s^2ds
$$

になります。

---

## 7. 通常のchain ruleでは足りない

滑らかな関数 $f$ に対し、通常なら

$$
df(B_t)=f'(B_t)dB_t
$$

と書きたくなります。

しかしTaylor展開

$$
\Delta f
=f'(B)\Delta B
+\frac12f''(B)(\Delta B)^2
+\cdots
$$

で、Brown運動では

$$
(\Delta B)^2
$$

の和が消えず $dt$ へ残ります。

したがって二階項が必要です。

---

## 8. Ito公式

$f\in C^2$ なら

$$
\boxed{
f(B_t)
=f(B_0)
+
\int_0^t f'(B_s)\,dB_s
+
\frac12
\int_0^t f''(B_s)\,ds
}
$$

です。

形式的には

$$
\boxed{
df(B_t)
=f'(B_t)dB_t
+\frac12f''(B_t)dt}
$$

です。

---

## 9. f(x)=x^2で確認する

$f(x)=x^2$ なら

$$
f'(x)=2x,
\qquad
f''(x)=2.
$$

Ito公式から

$$
B_t^2
=
2\int_0^t B_s\,dB_s+t.
$$

したがって

$$
\boxed{B_t^2-t
=2\int_0^tB_s\,dB_s}
$$

はmartingaleです。

SP2/SP3で出てきた補正 $-t$ の正体が二次変分でした。

---

## 10. 一般のIto process

$$
\boxed{
dX_t=b_tdt+\sigma_tdB_t}
$$

という過程を考えます。

$f(t,x)$ が十分滑らかなら

$$
\boxed{
\begin{aligned}
df(t,X_t)
={}&
\left(
\partial_t f
+b_t\partial_xf
+\frac12\sigma_t^2\partial_{xx}f
\right)dt\\
&+\sigma_t\partial_xf\,dB_t.
\end{aligned}
}
$$

これが一般形のIto公式です。

---

## 11. SDEは積分方程式として読む

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t
$$

という記号の厳密な意味は

$$
\boxed{
X_t
=X_0
+
\int_0^t b(X_s)ds
+
\int_0^t\sigma(X_s)dB_s
}
$$

です。

後半がIto積分です。

---

## 12. 幾何Brown運動

$$
dX_t=\mu X_tdt+\sigma X_tdB_t
$$

を考えます。

$f(x)=\log x$ にIto公式を使うと

$$
d\log X_t
=
\left(\mu-\frac12\sigma^2\right)dt
+\sigma dB_t.
$$

したがって

$$
\boxed{
X_t
=X_0
\exp\left[
\left(\mu-\frac12\sigma^2\right)t
+\sigma B_t
\right]
}
$$

です。

$-\sigma^2/2$ がIto補正です。

---

## 13. Ornstein--Uhlenbeck過程

平均回帰型SDE

$$
\boxed{
dX_t=-\theta X_tdt+\sigma dB_t}
$$

を考えます。

積分因子 $e^{\theta t}$ を使うと

$$
\boxed{
X_t
=e^{-\theta t}X_0
+
\sigma\int_0^t
 e^{-\theta(t-s)}dB_s
}
$$

です。

これは連続時間AR(1)に相当する重要なGaussian過程です。

後半の時系列解析と直接つながります。

---

## 14. SDE解の存在一意性

典型的には $b,\sigma$ がglobal Lipschitzで線形成長条件を満たせば、与えられたBrown運動にadaptedなstrong solutionが一意に存在します。

証明はPicard反復とIto isometry、Gronwall不等式を組み合わせます。

Encore IVでは定理の使い方と証明骨格までを扱い、局所解・爆発時刻・weak solutionの一般論までは必須にしません。

---

## 15. 次はgeneratorとPDEへ

Ito公式のdrift部分

$$
b(x)f'(x)
+
\frac12\sigma^2(x)f''(x)
$$

は偶然ではありません。

これを生成作用素

$$
Lf
=b f'
+\frac12\sigma^2f''
$$

と呼びます。

次章ではSDEとKolmogorov PDE・Fokker--Planck方程式をつなぎます。

---

## 章末チェック

- simple predictable processに対するIto積分を定義できる。
- Ito isometryを導ける。
- L2極限でIto積分を拡張する理由を説明できる。
- Ito積分がmartingaleになることを説明できる。
- 二次変分からIto公式の二階項を説明できる。
- $B_t^2-t$ をIto公式から回収できる。
- SDEを積分方程式として読める。
- 幾何Brown運動とOU過程を導ける。
