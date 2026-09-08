# CA1 複素微分・Cauchy–Riemann・初等正則関数

> **実装状態**：定義・定理文・例・演習を先に固定した draft です。**定理の証明は TODO**。証明完成までは標準コア上も `planned` とします。

## 1. 複素微分と正則性

開集合 $\Omega\subset\mathbb C$ と $f:\Omega\to\mathbb C$ に対し
$$f'(z_0)=\lim_{h\to0}\frac{f(z_0+h)-f(z_0)}{h}$$
が存在するとき複素微分可能という。各点で複素微分可能なら **正則**、$\mathbb C$ 全体で正則なら **整関数** という。

### 定理 CA1-THM-01：複素微分の微分法則
和・積・商・合成について実変数と同じ微分法則が成り立つ。
**証明 TODO**：差商の分解と極限を直接追う。

## 2. Cauchy–Riemann 方程式
$f(x+iy)=u(x,y)+iv(x,y)$ とする。

### 定理 CA1-THM-02：必要条件
$f$ が $z_0$ で複素微分可能なら
$$u_x=v_y,\qquad u_y=-v_x$$
かつ $f'=u_x+iv_x=v_y-iu_y$。
**証明 TODO**：実方向と純虚方向から同じ差商極限を見る。

### 定理 CA1-THM-03：$C^1$ 十分条件
$u,v$ の一階偏導関数が近傍で存在し $z_0$ で連続、かつ Cauchy–Riemann を満たせば $f$ は $z_0$ で複素微分可能。
**証明 TODO**：二変数の増分を一次部分と $o(|h|)$ に分解する。

$\partial_z=(\partial_x-i\partial_y)/2$, $\partial_{\bar z}=(\partial_x+i\partial_y)/2$ とすると、$C^1$ 級では正則性は $\partial_{\bar z}f=0$ と同値になる。

### 例
$z^n$ は正則、$\bar z$ はどこでも正則でない。$|z|^2$ は $0$ では複素微分可能だが、どの近傍でも正則でない。

## 3. 複素指数・三角関数
$$e^{x+iy}=e^x(\cos y+i\sin y).$$

### 定理 CA1-THM-04：複素指数関数
$e^z$ は整関数で $(e^z)'=e^z$, $e^{z+w}=e^ze^w$, $e^{z+2\pi i}=e^z$、かつ零点を持たない。
**証明 TODO**：実指数・三角関数と Cauchy–Riemann から閉じる。

$\cos z=(e^{iz}+e^{-iz})/2$, $\sin z=(e^{iz}-e^{-iz})/(2i)$ と定義する。これは Fourier 解析の $e^{inx}$ の正本となる。

## 演習
- Level: A — $z^3-2z+1$ の導関数を定義から確認せよ。
- Level: A — $\bar z$ の差商を実方向・虚方向から計算せよ。
- Level: A — $|z|^2$ が $0$ でのみ複素微分可能であることを示せ。
- Level: A — $e^{z+2\pi i}=e^z$ を示せ。
- Level: B — $C^1$ 級の $f=u+iv$ について Cauchy–Riemann から $f'$ の式を導け。
- Level: B — $1/z$ が $\mathbb C\setminus\{0\}$ で正則であることを示せ。
- Level: B — $\sin z,\cos z$ の導関数を複素指数から導け。
- Level: C — $f$ と $\bar f$ が連結開集合上でともに正則なら $f$ は定数であることを示せ。
