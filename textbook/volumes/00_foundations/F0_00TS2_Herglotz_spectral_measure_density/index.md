# F0-00TS2 Encore IV：Herglotz定理・spectral measure・spectral density

TS1では、自己共分散

$$
\gamma(h)
=E[X_{t+h}X_t]
$$

をHilbert空間の内積として読みました。

ここでは同じ情報を周波数領域へ移します。

---

## 1. 自己共分散列は何でもよいわけではない

任意の複素数 $c_1,\dots,c_n$ と整数 $t_1,\dots,t_n$ に対して

$$
E\left|
\sum_{j=1}^n c_jX_{t_j}
\right|^2
\ge0.
$$

展開すると

$$
\boxed{
\sum_{j,k}
c_j\overline{c_k}
\gamma(t_j-t_k)
\ge0
}
$$

です。

したがって自己共分散列は正定値列です。

---

## 2. Herglotz定理

正定値列 $\gamma(h)$ には、一意な有限非負測度 $F$ が $[-\pi,\pi]$ 上に存在して

$$
\boxed{
\gamma(h)
=
\int_{-\pi}^{\pi}
e^{ih\lambda}\,dF(\lambda)
}
$$

と表せます。

逆に有限非負測度からこの式で作った列は正定値です。

これがHerglotz定理です。

完全証明には調和解析とRiesz表現の議論が必要なので、Encore IVでは定理として使い、正定値性とFourier表現の対応を理解することを主眼にします。

---

## 3. spectral measure

Herglotz定理で得られる $F$ をspectral measureと呼びます。

$$
F([a,b])
$$

は概念的に

> 周波数区間 $[a,b]$ にどれだけ分散が含まれているか

を表します。

全質量は

$$
F([ -\pi,\pi])
=\gamma(0)
=\operatorname{Var}(X_t)
$$

です。

---

## 4. spectral density

spectral measureがLebesgue測度に絶対連続なら

$$
dF(\lambda)
=f(\lambda)d\lambda
$$

と書けます。

このRadon--Nikodym密度 $f$ をspectral densityと呼びます。

すると

$$
\boxed{
\gamma(h)
=
\int_{-\pi}^{\pi}
e^{ih\lambda}f(\lambda)d\lambda
}
$$

です。

ここでP2のRadon--Nikodym密度とFourier解析が合流します。

---

## 5. 逆Fourier級数

自己共分散が絶対可算和可能

$$
\sum_{h=-\infty}^{\infty}|\gamma(h)|<\infty
$$

なら、典型的には

$$
\boxed{
f(\lambda)
=
\frac1{2\pi}
\sum_{h=-\infty}^{\infty}
\gamma(h)e^{-ih\lambda}
}
$$

と書けます。

したがって

$$
\boxed{
\gamma(h)
\longleftrightarrow
f(\lambda)
}
$$

はFourier pairです。

E2-03の自己相関解析が、そのまま周波数解析へ変わります。

---

## 6. white noiseはflat spectrum

white noise $\varepsilon_t$ の分散を $\sigma^2$ とします。

自己共分散は

$$
\gamma(h)
=
\begin{cases}
\sigma^2,&h=0,\\
0,&h\ne0.
\end{cases}
$$

したがって

$$
\boxed{
f_\varepsilon(\lambda)
=\frac{\sigma^2}{2\pi}}
$$

です。

全ての周波数に同じ強さを持つためwhiteと呼ばれます。

---

## 7. deterministic sinusoidはdensityを持たない場合がある

例えばrandom phaseを持つ定常な正弦波

$$
X_t=A\cos(\omega_0t+\Phi)
$$

を考えます。

自己共分散は $\cos(\omega_0h)$ 型になり、spectral measureは

$$
\lambda=\pm\omega_0
$$

に点質量を持ちます。

したがって通常の関数としてのspectral densityを持たず、line spectrumになります。

重要なのは

$$
\boxed{
\text{spectral measureは常にある}
\not\Rightarrow
\text{spectral densityが常にある}
}
$$

ことです。

---

## 8. Wold分解との対応

purely nondeterministicな過程はWold分解で

$$
X_t
=
\sum_{j=0}^\infty
\psi_j\varepsilon_{t-j}
$$

と表されます。

innovationがflat spectrumを持ち、線形filterが周波数ごとの強さを変えることで一般の連続スペクトルが作られます。

次章で

$$
\Psi(e^{-i\lambda})
=
\sum_{j=0}^\infty
\psi_je^{-ij\lambda}
$$

を使ってこの関係を明示します。

---

## 9. spectral representation

二次定常過程は適切な直交増分過程 $Z(\lambda)$ を使って

$$
\boxed{
X_t
=
\int_{-\pi}^{\pi}
e^{it\lambda}\,dZ(\lambda)
}
$$

と表せます。

互いに素な周波数区間 $A,B$ について

$$
E[Z(A)\overline{Z(B)}]=0
$$

という直交性を持ち、

$$
E|dZ(\lambda)|^2
$$

を支配する測度がspectral measureです。

これはFourier級数を「ランダムな直交係数」へ拡張した姿と見られます。

---

## 10. 時間領域と周波数領域

時間領域では

$$
X_t,
\qquad
\gamma(h)
$$

を見ます。

周波数領域では

$$
dZ(\lambda),
\qquad
F(d\lambda)
$$

を見ます。

同じ二次構造を異なる座標で表しています。

$$
\boxed{
\text{lag }h
\longleftrightarrow
\text{frequency }\lambda
}
$$

です。

---

## 11. periodogram

有限標本 $X_0,\dots,X_{n-1}$ から離散Fourier変換

$$
D_n(\lambda)
=
\sum_{t=0}^{n-1}X_te^{-it\lambda}
$$

を作り

$$
\boxed{
I_n(\lambda)
=
\frac1{2\pi n}
|D_n(\lambda)|^2
}
$$

をperiodogramと呼びます。

これはspectral densityの生の推定量ですが、各周波数でそのまま一致推定量になるわけではありません。

実際のスペクトル推定では平滑化などが必要です。

---

## 12. periodogramとspectral densityを混同しない

- spectral density：母過程の二次構造を表す理論量
- periodogram：有限標本から計算するランダムな統計量

です。

これは

- 母自己共分散 $\gamma(h)$
- 標本自己共分散

を区別するのと同じです。

---

## 13. 次はARMAを周波数領域で読む

E2-03では

$$
\phi(B)X_t
=
\theta(B)\varepsilon_t
$$

と書きました。

周波数領域ではbackshift $B$ が

$$
e^{-i\lambda}
$$

へ変わり、

$$
H(\lambda)
=
\frac{\theta(e^{-i\lambda})}
{\phi(e^{-i\lambda})}
$$

というtransfer functionになります。

次章で

$$
f_X(\lambda)
=|H(\lambda)|^2f_\varepsilon(\lambda)
$$

を導きます。

---

## 章末チェック

- 自己共分散列の正定値性を示せる。
- Herglotz定理の主張を説明できる。
- spectral measureとspectral densityを区別できる。
- 自己共分散とspectral densityのFourier pairを書ける。
- white noiseのflat spectrumを導ける。
- sinusoidのline spectrumを説明できる。
- spectral representationの意味を説明できる。
- periodogramと母spectral densityを区別できる。
