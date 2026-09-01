# F0-00DS1 Encore III：Schwartz超関数・テスト関数・Dirac delta

Encore IIでは古典解とFourier法を扱いました。しかしPDEや確率過程を少し進めるだけで、通常の関数としては微分できない対象が現れます。

代表例はDirac deltaとwhite noiseです。

ここでは「関数でないものをどう微分するか」の前段として、Schwartz超関数を導入します。

> 注意：英語ではどちらも distribution と呼ばれますが、**確率分布 probability distribution とSchwartz超関数 distribution は別物**です。本教材では後者を原則としてSchwartz超関数と呼びます。

---

## 1. なぜ普通の関数だけでは足りないのか

Heaviside関数

$$
H(x)=
\begin{cases}
0,&x<0,\\
1,&x>0
\end{cases}
$$

を考えます。

$x=0$ で跳びがあるので古典的には微分できません。しかし形式的には

$$
H'=\delta_0
$$

と書きたくなります。

ここで $\delta_0$ は「0に全ての質量が集中したもの」です。しかし通常の関数として

$$
\int_{\mathbb R}\delta_0(x)\varphi(x)\,dx=\varphi(0)
$$

を満たすものはありません。

そこで、対象そのものの値ではなく、**滑らかな関数へ作用させた結果**で対象を定義します。

---

## 2. テスト関数

開集合 $\Omega\subset\mathbb R^d$ 上で

$$
C_c^\infty(\Omega)
$$

を考えます。

これは無限回微分可能で、台がコンパクトな関数全体です。この元をテスト関数と呼びます。

直感的には、局所的に対象を探査する非常に滑らかなプローブです。

---

## 3. Schwartz超関数

Schwartz超関数 $T$ とは、テスト関数 $\varphi$ に数を対応させる線形汎関数

$$
\boxed{T:C_c^\infty(\Omega)\to\mathbb R}
$$

または複素数値版で、適切な意味で連続なものです。

記号では

$$
\langle T,\varphi\rangle
$$

と書きます。

F0-02C2で学んだ「関数を入力して数を返す線形汎関数」が、ここで具体的に再登場します。

---

## 4. 普通の関数も超関数になる

局所可積分関数 $f\in L^1_{\mathrm{loc}}(\Omega)$ に対し

$$
\boxed{
\langle T_f,\varphi\rangle
=
\int_\Omega f(x)\varphi(x)\,dx
}
$$

と置きます。

この $T_f$ を $f$ が作る正則超関数と呼びます。したがって

$$
\boxed{
\text{普通の局所可積分関数}
\subset
\text{Schwartz超関数}
}
$$

です。

---

## 5. Dirac delta

0におけるDirac deltaを

$$
\boxed{
\langle\delta_0,\varphi\rangle
=
\varphi(0)
}
$$

と定義します。

これはテスト関数に対する点評価です。一般に点 $a$ では

$$
\langle\delta_a,\varphi\rangle=\varphi(a).
$$

---

## 6. deltaはGaussianの極限として見える

$$
\rho_\varepsilon(x)
=
\frac1{\sqrt{2\pi}\varepsilon}
\exp\left(-\frac{x^2}{2\varepsilon^2}\right)
$$

を考えます。

各 $\varepsilon>0$ では普通の確率密度ですが、$\varepsilon\to0$ とすると一点へ集中し、任意のテスト関数 $\varphi$ に対して

$$
\int_{\mathbb R}
\rho_\varepsilon(x)\varphi(x)\,dx
\to
\varphi(0).
$$

つまり

$$
\boxed{
T_{\rho_\varepsilon}\to\delta_0
}
$$

という意味で超関数収束します。

---

## 7. 超関数の収束

$T_n$ が $T$ へ超関数の意味で収束するとは、全てのテスト関数 $\varphi$ について

$$
\boxed{
\langle T_n,\varphi\rangle
\to
\langle T,\varphi\rangle
}
$$

となることです。

点ごとの値ではなく、テスト関数への作用を観察します。これは確率論の弱収束と雰囲気が似ていますが、対象とテスト関数のクラスは別物です。

---

## 8. なぜテスト関数を滑らかにするのか

次章では超関数を微分します。

古典的に

$$
\int f'(x)\varphi(x)\,dx
=-\int f(x)\varphi'(x)\,dx
$$

でした。

右辺なら $f$ 自身が微分可能でなくても意味を持つ場合があります。これが弱微分の出発点です。

---

## 9. Heaviside関数を予告する

Heaviside関数 $H$ が作る正則超関数について、次章で

$$
\boxed{H'=\delta_0}
$$

を厳密に示します。

古典微分では存在しなかった導関数が、超関数の世界では存在します。

---

## 10. Fourier解析との接続

Fourier変換は超関数へ拡張できます。その結果、Dirac deltaと定数関数、微分と周波数の掛け算などが自然に整理されます。

Encore IIIではFourier変換の超関数論を全面展開せず、弱微分とPDEに必要な範囲へ絞ります。

---

## 章末チェック

- probability distributionとSchwartz超関数を区別できる。
- テスト関数 $C_c^\infty$ を使う理由を説明できる。
- 局所可積分関数を正則超関数へ埋め込める。
- Dirac deltaを点評価汎関数として定義できる。
- Gaussian近似からdeltaへの超関数収束を説明できる。
- 超関数微分が部分積分から生まれることを予告できる。
