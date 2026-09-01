# F0-00SP5 Encore IV：生成作用素・Kolmogorov方程式・Fokker--Planck

SDE

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t
$$

をItô公式へ入れると

$$
bf'+\frac12\sigma^2f''
$$

という微分作用素が自然に現れます。

この作用素は、確率過程とPDEを結ぶ中心です。

---

## 1. Markov semigroup

初期値 $X_0=x$ から始まるMarkov過程について

$$
\boxed{
P_tf(x)
=E_x[f(X_t)]
}
$$

と定義します。

Markov性から

$$
\boxed{P_{s+t}=P_sP_t}
$$

が成り立ちます。

これはPDE1で熱方程式の時間発展が半群を作ったことと同じ構造です。

---

## 2. generator

semigroupの時刻0での微分を

$$
\boxed{
Lf
=
\lim_{t\downarrow0}
\frac{P_tf-f}{t}
}
$$

と定義します。

もちろん全ての関数で極限が存在するわけではなく、generatorには適切なdomainがあります。

---

## 3. SDEからgeneratorを導く

$f\in C^2$ にItô公式を使います。

$$
\begin{aligned}
f(X_t)-f(X_0)
={}&
\int_0^t
\left[
b(X_s)f'(X_s)
+\frac12\sigma^2(X_s)f''(X_s)
\right]ds\\
&+
\int_0^t
\sigma(X_s)f'(X_s)dB_s.
\end{aligned}
$$

最後のItô積分は平均0です。

したがってgeneratorは

$$
\boxed{
Lf(x)
=b(x)f'(x)
+\frac12\sigma^2(x)f''(x)
}
$$

です。

---

## 4. Brown運動ならLaplace作用素

標準Brown運動では

$$
b=0,
\qquad
\sigma=1.
$$

したがって

$$
\boxed{L=\frac12\frac{d^2}{dx^2}}.
$$

多次元Brown運動では

$$
\boxed{L=\frac12\Delta}.
$$

Encore IIで熱方程式にLaplace作用素が出た理由が、確率過程側から見えます。

---

## 5. backward Kolmogorov equation

$$
u(t,x)=P_tf(x)=E_x[f(X_t)]
$$

と置きます。

形式的にsemigroupを微分すると

$$
\boxed{
\partial_tu=Lu,
\qquad
u(0,x)=f(x)
}
$$

です。

これがbackward Kolmogorov equationの初期値形式です。

初期状態 $x$ を変数として、将来の期待値がどう変化するかを記述します。

---

## 6. terminal value形式

固定された終端時刻 $T$ に対し

$$
u(t,x)
=E[g(X_T)\mid X_t=x]
$$

と置くと

$$
\boxed{
\partial_tu+Lu=0,
\qquad
u(T,x)=g(x)
}
$$

という後ろ向きのPDEになります。

金融数学などで頻繁に使われる形です。

---

## 7. forward equationは分布を動かす

今度は初期状態を固定し、$X_t$ の分布そのものがどう動くかを考えます。

密度 $p(t,x)$ が存在する場合、形式的には

$$
\boxed{
\partial_t p=L^*p
}
$$

です。

ここで $L^*$ はgeneratorの形式随伴です。

これがforward Kolmogorov equation、拡散過程ではFokker--Planck方程式です。

---

## 8. 一次元Fokker--Planck

$$
Lf
=b f'
+\frac12\sigma^2 f''
$$

の形式随伴は

$$
\boxed{
L^*p
=-\frac{\partial}{\partial x}(bp)
+
\frac12
\frac{\partial^2}{\partial x^2}(\sigma^2p)
}
$$

です。

したがって

$$
\boxed{
\partial_t p
=-\partial_x(bp)
+rac12\partial_{xx}(\sigma^2p)
}
$$

となります。

第一項がdriftによる輸送、第二項がdiffusionです。

---

## 9. Brown運動から熱方程式を回収する

Brown運動では

$$
b=0,
\qquad
\sigma=1.
$$

したがって

$$
\partial_t p
=rac12\partial_{xx}p.
$$

これは熱方程式です。

基本解は

$$
p(t,x)
=
\frac1{\sqrt{2\pi t}}
\exp\left(-\frac{x^2}{2t}\right),
$$

つまり $N(0,t)$ の密度です。

$$
\boxed{
\text{Brown運動の遷移密度}
=
\text{熱方程式のheat kernel}
}
$$

が完全に回収されました。

---

## 10. OU過程のgenerator

$$
dX_t=-\theta X_tdt+\sigma dB_t
$$

なら

$$
\boxed{
Lf
=-\theta x f'(x)
+\frac12\sigma^2f''(x)
}
$$

です。

Fokker--Planck方程式は

$$
\partial_t p
=
\theta\partial_x(xp)
+
\frac12\sigma^2\partial_{xx}p.
$$

---

## 11. OUの定常分布

定常状態では

$$
\partial_t p=0.
$$

適切な正規化の下で解くと

$$
\boxed{
X_\infty
\sim
N\left(0,\frac{\sigma^2}{2\theta}\right)
}
$$

が得られます。

SP4の明示解から長時間極限を取っても同じ結果です。

OU過程は連続時間AR(1)の代表例であり、時系列解析への橋になります。

---

## 12. 随伴が再登場する

F0-02C3では作用素の随伴を学びました。

ここでは

- $L$：観測関数 $f$ の期待値を動かす
- $L^*$：確率密度 $p$ を動かす

という双対な役割で現れます。

$$
\boxed{
\text{backward：observableを動かす}
\qquad
\text{forward：distributionを動かす}
}
$$

です。

---

## 13. Feynman--Kacへの入口

PDE

$$
\partial_tu+Lu-V(x)u=0
$$

の解は、適切な条件の下で

$$
\boxed{
\nu(t,x)
=E_{t,x}\left[
\exp\left(-\int_t^T V(X_s)ds\right)
g(X_T)
\right]
}
$$

という期待値で表せます。

これがFeynman--Kac公式です。

PDEを確率過程で解き、確率過程の期待値をPDEで特徴付ける双方向の橋です。

Encore IVでは公式の構造までを扱い、完全証明は発展とします。

---

## 14. Encore IIIとの接続

Kolmogorov方程式やFokker--Planck方程式の解が十分滑らかでない場合、Encore IIIの

- Schwartz超関数
- Sobolev空間
- 弱解

が必要になります。

つまり

$$
\boxed{
\text{確率過程}
\to
\text{generator}
\to
\text{PDE}
\to
\text{弱解理論}
}
$$

とEncore IIIへ合流します。

---

## 15. 後半は時系列へ

ここまでが連続時間確率過程側です。

次章から離散時間の弱定常過程へ移り、

- Hilbert空間としての線形予測
- innovation
- Wold decomposition
- spectral measure
- ARMAの周波数応答

を扱います。

---

## 章末チェック

- Markov semigroupを定義できる。
- generatorをsemigroupの微分として説明できる。
- SDEから $Lf=bf'+\sigma^2f''/2$ を導ける。
- backwardとforward Kolmogorov equationを区別できる。
- Fokker--Planck方程式を導ける。
- Brown運動から熱方程式を回収できる。
- OU過程の定常Gaussian分布を説明できる。
- generatorの随伴と確率密度の時間発展を結び付けられる。
