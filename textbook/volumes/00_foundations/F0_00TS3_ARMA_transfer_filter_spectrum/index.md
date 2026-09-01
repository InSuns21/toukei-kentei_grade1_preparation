# F0-00TS3 Encore IV：線形filter・ARMA transfer function・周波数領域

Encore IVの最後に、E2-03のAR・MA・ARIMAをFourier解析の言葉で読み直します。

時間領域ではbackshift operator

$$
BX_t=X_{t-1}
$$

を使いました。

周波数領域ではこのshiftが単なる複素数の掛け算へ変わります。

---

## 1. 線形filter

入力系列 $X_t$ から

$$
\boxed{
Y_t
=
\sum_{j=-\infty}^{\infty}
a_jX_{t-j}
}
$$

を作る操作を線形filterと呼びます。

一側filterなら通常 $j\ge0$ だけを使います。

backshift operatorを使えば

$$
Y_t=A(B)X_t,
$$

$$
A(B)=\sum_j a_jB^j
$$

です。

---

## 2. 複素指数はshiftの固有関数

周波数 $\lambda$ の複素指数

$$
x_t=e^{it\lambda}
$$

へbackshiftを作用させると

$$
Bx_t
=x_{t-1}
=e^{-i\lambda}x_t.
$$

したがって

$$
\boxed{
B
\longleftrightarrow
e^{-i\lambda}
}
$$

です。

微分作用素がFourier変換で $i\xi$ の掛け算になったのと同じ、作用素の対角化です。

---

## 3. transfer function

filter $A(B)$ へ

$$
B=e^{-i\lambda}
$$

を代入して

$$
\boxed{
A(e^{-i\lambda})
=
\sum_j a_je^{-ij\lambda}
}
$$

を得ます。

これをtransfer functionまたはfrequency responseと呼びます。

振幅倍率は

$$
|A(e^{-i\lambda})|
$$

です。

---

## 4. スペクトルは絶対値二乗倍される

定常入力 $X_t$ のspectral densityを $f_X(\lambda)$ とします。

出力

$$
Y_t=A(B)X_t
$$

のspectral densityは、適切なsummability条件の下で

$$
\boxed{
f_Y(\lambda)
=
|A(e^{-i\lambda})|^2f_X(\lambda)
}
$$

です。

filterが各周波数の振幅を $|A|$ 倍するため、powerは $|A|^2$ 倍されます。

---

## 5. MA(q)のspectral density

$$
X_t
=
\theta(B)\varepsilon_t,
$$

$$
\theta(B)
=1+\theta_1B+\cdots+\theta_qB^q
$$

とします。

innovation white noiseのスペクトルは

$$
f_\varepsilon(\lambda)
=\frac{\sigma^2}{2\pi}.
$$

したがって

$$
\boxed{
f_X(\lambda)
=
\frac{\sigma^2}{2\pi}
|\theta(e^{-i\lambda})|^2
}
$$

です。

---

## 6. AR(p)は逆filter

$$
\phi(B)X_t
=
\varepsilon_t,
$$

$$
\phi(B)
=1-\phi_1B-\cdots-\phi_pB^p
$$

とします。

因果的な安定解が存在すれば

$$
X_t
=
\frac1{\phi(B)}\varepsilon_t
$$

と読めます。

周波数領域では

$$
H(\lambda)
=
\frac1{\phi(e^{-i\lambda})}.
$$

したがって

$$
\boxed{
f_X(\lambda)
=
\frac{\sigma^2}{2\pi}
\frac1{|\phi(e^{-i\lambda})|^2}
}
$$

です。

---

## 7. ARMA(p,q)

$$
\phi(B)X_t
=
\theta(B)\varepsilon_t
$$

なら

$$
\boxed{
H(\lambda)
=
\frac{\theta(e^{-i\lambda})}
{\phi(e^{-i\lambda})}
}
$$

で、

$$
\boxed{
f_X(\lambda)
=
\frac{\sigma^2}{2\pi}
\frac{|\theta(e^{-i\lambda})|^2}
{|\phi(e^{-i\lambda})|^2}
}
$$

です。

ARMAモデルがwhite noiseをfilterして作る過程であることが周波数領域ではそのまま式になります。

---

## 8. AR(1)のスペクトル

$$
X_t=\phi X_{t-1}+\varepsilon_t,
\qquad |\phi|<1
$$

なら

$$
\boxed{
f_X(\lambda)
=
\frac{\sigma^2}{2\pi}
\frac1{|1-\phi e^{-i\lambda}|^2}
}
$$

です。

分母を展開すると

$$
|1-\phi e^{-i\lambda}|^2
=1+\phi^2-2\phi\cos\lambda.
$$

したがって

$$
\boxed{
f_X(\lambda)
=
\frac{\sigma^2}{2\pi}
\frac1{1+\phi^2-2\phi\cos\lambda}}
$$

です。

---

## 9. phi>0なら低周波が強い

$\phi>0$ で1に近いと、$\lambda=0$ 付近で

$$
1+\phi^2-2\phi\cos\lambda
$$

が小さくなります。

したがって低周波にpowerが集中します。

時間領域では

> 隣り合う値が似ていてゆっくり変化する

という挙動です。

逆に $\phi<0$ なら高周波側が強くなり、符号を交互に変えやすい系列になります。

---

## 10. 一階差分はhigh-pass filter

ARIMAで使う一階差分

$$
\nabla X_t
=(1-B)X_t
$$

を考えます。

frequency responseは

$$
1-e^{-i\lambda}.
$$

絶対値二乗は

$$
\boxed{
|1-e^{-i\lambda}|^2
=4\sin^2\left(\frac\lambda2\right)
}
$$

です。

$\lambda=0$ では0なので、低周波成分を強く抑えます。

つまり差分はトレンド・低周波を除去するhigh-pass filterです。

---

## 11. d階差分

$$
(1-B)^d
$$

なら

$$
|1-e^{-i\lambda}|^{2d}
$$

がspectral densityへ掛かります。

原系列が0周波数付近に強いpowerを持つ非定常系列でも、適切な差分で低周波の発散的成分を抑え、定常化するというARIMAの操作を周波数的に理解できます。

---

## 12. seasonal differencing

周期 $s$ の季節差分

$$
(1-B^s)X_t
$$

のfrequency responseは

$$
1-e^{-is\lambda}.
$$

したがって

$$
\boxed{
|1-e^{-is\lambda}|^2
=4\sin^2\left(\frac{s\lambda}{2}\right)
}
$$

です。

これは

$$
\lambda=\frac{2\pi k}{s}
$$

で0になり、季節周期に対応する周波数を除去します。

---

## 13. causalityをfilter安定性として読む

AR多項式

$$
\phi(z)=0
$$

の根が単位円の外側にあれば、典型的には

$$
\frac1{\phi(B)}
=
\sum_{j=0}^{\infty}\psi_jB^j
$$

という収束する一側filterを構成できます。

したがって現在値を過去のinnovationから作れます。

これが因果性です。

E2-03の「根が単位円外」という条件がfilterの安定性として見えます。

---

## 14. invertibility

MA多項式

$$
\theta(B)
$$

について適切な根条件があれば

$$
\varepsilon_t
=
\frac1{\theta(B)}X_t
$$

という安定なfilterでinnovationを観測系列から復元できます。

これが反転可能性です。

時間領域でのinnovation復元と周波数領域のfilter逆変換が同じ話になります。

---

## 15. ACF/PACFとスペクトルは競合しない

時間領域では

- ACF
- PACF
- Yule--Walker
- prediction

が便利です。

周波数領域では

- 周期性
- filter特性
- 長周期・短周期のpower
- seasonal structure

が見やすくなります。

同じ二次構造をFourier変換で見方を変えているだけです。

---

## 16. Encore IVの回収

ここまでで

$$
\boxed{
\text{条件付き期待値}
\to
\text{filtration}
\to
\text{martingale}
\to
\text{Brown運動}
\to
\text{Ito/SDE}
\to
\text{generator/PDE}
}
$$

と

$$
\boxed{
\text{定常過程}
\to
\text{Hilbert予測}
\to
\text{innovation/Wold}
\to
\text{spectral measure}
\to
\text{ARMA filter}
}
$$

の二本を通しました。

後者はE2-03のARMA/ARIMA本編へ戻ります。

---

## 章末チェック

- backshiftが周波数領域で $e^{-i\lambda}$ になることを示せる。
- transfer functionを定義できる。
- filter後のスペクトルが $|A|^2$ 倍になることを説明できる。
- ARMAのspectral densityを導ける。
- AR(1)のスペクトル形状を $\phi$ から説明できる。
- 一階差分をhigh-pass filterとして説明できる。
- seasonal differencingのzero周波数を求められる。
- causalityとinvertibilityを安定filterとして説明できる。
- 時間領域と周波数領域を使い分けられる。
