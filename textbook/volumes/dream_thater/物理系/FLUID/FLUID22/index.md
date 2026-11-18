# FLUID22 平板境界層の自己相似解はどう出るか

**前提講座（直接）**：[FLUID21 高Reの壁近傍だけ粘性が残る理由は何か](../FLUID21/index.md)

## この講義で解決すること

[前講のPrandtl境界層方程式](../FLUID21/index.md#thm-fluid21-prandtl)は、高Reynolds数の壁近くで粘性を残す理由を説明した。しかし厚さの**次数**しか分からず、壁面せん断の**係数**は決まらなかった。ここでは一様な外部速度をもつ平板に限り、二変数の方程式を一変数の常微分方程式へ減らす。これが Blasius の自己相似法である。

到達目標は、相似変数の意味、流れ関数による連続条件、三階の境界値問題への変換、壁応力と摩擦係数、そして数値射撃法の精度・適用限界を、それぞれ独立に再現できることである。

## 1. どんな平板を考えるか

流れ方向の座標を $x>0$、壁から流体側へ向かう座標を $y\ge0$ とし、壁は $y=0$ に固定する。密度 $\rho>0$、動粘性係数 $\nu>0$、粘性係数 $\mu=\rho\nu$ は一定で、外側の接線速度 $U>0$ は $x$ に依らないとする。定常・二次元・非圧縮性・Newton流体、平滑平板上の付着層流・無滑り・非貫通を仮定する。重力等による流れ方向の体積力はなく、外側の圧力勾配は零である。

このとき [前講の外部圧力と加速の関係](../FLUID21/index.md#prop-fluid21-edge-pressure)より $p_e'(x)=0$ であり、[Prandtl方程式](../FLUID21/index.md#thm-fluid21-prandtl)は

$$
u_x+v_y=0,\qquad
u u_x+v u_y=\nu u_{yy}
$$

となる。壁では $u(x,0)=v(x,0)=0$、外縁では $u(x,y)\to U$（$y\to\infty$、$x>0$ を固定）である。$u$ と $v$ はそれぞれ流れ方向・壁法線方向の速度である。

[局所Reynolds数](../FLUID21/index.md#def-fluid21-local-re)は $\mathrm{Re}_x=Ux/\nu$ で、[厚さの尺度](../FLUID21/index.md#prop-fluid21-thickness)は

$$
d(x)=\sqrt{\frac{\nu x}{U}}
=\frac{x}{\sqrt{\mathrm{Re}_x}}.
$$

$d(x)$ は比例係数を1とした**代表尺度**であり、速度が外側の99%に達する「99%厚さ」そのものではない。近似は $\mathrm{Re}_x\gg1$ で前縁から十分離れ、境界層が付着層流である範囲に限る。

## 2. 厚さで縦座標を測り直す

位置 $x$ が変わっても、縦座標を $d(x)$ で割れば速度分布が同じ曲線に重なると期待する。この「各断面の形が無次元座標だけで決まる」という考えが**自己相似**である。

さらに非圧縮性の条件を最初から満たしたい。そこで既習の[二次元の流れ関数](../../../幾何系/VC/VC9/index.md#def-vc9-stream-function) $\psi(x,y)$ により $u=\psi_y$、$v=-\psi_x$ とおく。混合偏導関数が交換できる滑らかさがあれば $u_x+v_y=\psi_{yx}-\psi_{xy}=0$ になる。

<a id="def-fluid22-blasius-similarity"></a>

<!-- formal-statement-start -->
> **定義（平板境界層のBlasius自己相似表示）**  
> 定数 $U,\nu>0$、$x>0$、$y\ge0$ とし、三階まで連続微分可能な無次元関数 $f:[0,\infty)\to\mathbb R$ をとる。相似座標 $\eta$ と流れ関数 $\psi$ を次で定める。

$$
\eta=y\sqrt{\frac{U}{\nu x}},
\qquad
\psi(x,y)=\sqrt{\nu Ux}\,f(\eta).
$$

> この流れ関数から $u=\partial_y\psi$、$v=-\partial_x\psi$ により構成した速度場を、ここでの自己相似表示と呼ぶ。$f'$, $f''$, $f'''$ はいずれも $\eta$ による常微分を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid22-blasius-similarity -->
**定義の確認**：単位と直接例。 $\nu$ の単位は m$^2$/s、$U$ は m/s なので $\nu x/U$ は m$^2$、$\eta=y/d(x)$ は無次元である。一方 $\sqrt{\nu Ux}$ の単位は m$^2$/s で、$\psi_y$ と $-\psi_x$ はともに m/s になる。

**直接例（境界条件と方程式は別）。** まず $f_{\mathrm{trial}}(\eta)=\eta+e^{-\eta}-1$ を試す。$f_{\mathrm{trial}}(0)=0$、$f_{\mathrm{trial}}'(0)=0$、$f_{\mathrm{trial}}'(\eta)=1-e^{-\eta}\to1$ なので壁と外縁の条件は満たせる。しかし後述の運動量式を満たすとは限らない。相似表示を採っただけでは解にはならず、残された常微分方程式を求める必要がある。
<!-- definition-example-end -->

<a id="prop-fluid22-velocity-reconstruction"></a>

<!-- formal-statement-start -->
> **命題（相似流れ関数がつくる速度場）**  
> 上の自己相似表示で $f\in C^3([0,\infty))$ とする。$\eta=y\sqrt{U/(\nu x)}$ において、連続の式を恒等的に満たす速度は

$$
u(x,y)=U f'(\eta),\qquad
v(x,y)=\frac12\sqrt{\frac{\nu U}{x}}\,[\eta f'(\eta)-f(\eta)].
$$

> である。壁の無滑り・非貫通と外縁の接線速度条件は、それぞれ $f'(0)=0$、$f(0)=0$、$\lim_{\eta\to\infty}f'(\eta)=1$ に対応する。
<!-- formal-statement-end -->

### なぜこの式か

$\eta_y=1/d(x)$、$d'(x)=d(x)/(2x)$ だから、$y$ を固定したとき

$$
\eta_x=-\frac{\eta}{2x},\qquad
\frac{d}{dx}\sqrt{\nu Ux}
=\frac{1}{2x}\sqrt{\nu Ux}.
$$

これを $\psi_y$ と $\psi_x$ に代入する。特に $v$ の式の**二つの項**は、流れ関数の前の平方根を微分した項と、$\eta_x$ を通じた項の差から生まれる。

<!-- proof-start -->
### 証明

$\sqrt{\nu Ux}=Ud(x)$ を使うと、

$$
u=\psi_y=Ud(x)f'(\eta)\eta_y
=Ud(x)f'(\eta)\frac1{d(x)}=Uf'(\eta).
$$

次に $y$ を固定して偏微分する。

$$
\begin{aligned}
\psi_x
&=U d'(x)f(\eta)+Ud(x)f'(\eta)\eta_x\\
&=\frac{Ud(x)}{2x}\,f(\eta)
-\frac{Ud(x)}{2x}\,\eta f'(\eta).
\end{aligned}
$$

従って

$$
v=-\psi_x=\frac{Ud(x)}{2x}[\eta f'-f]
=\frac12\sqrt{\frac{\nu U}{x}}[\eta f'-f].
$$

また $\partial_xu+\partial_yv=\psi_{yx}-\psi_{xy}=0$。$x>0$ では $Ud(x)/(2x)>0$ なので、$v(x,0)=0$ は $f(0)=0$ と同値、$u(x,0)=0$ は $f'(0)=0$ と同値である。$x$ を固定した $y\to\infty$ は $\eta\to\infty$ に対応し、外縁条件も述べた極限になる。
<!-- proof-end -->

## 3. 偏微分方程式が三階の境界値問題になる

二変数の $u,v$ を別々に近似する代わりに、形を決める $f$ 一つを求めたい。自己相似表示を運動量式へ代入すると、$x$ に依る因子がすべて消える。

<a id="thm-fluid22-blasius-equation"></a>

<!-- formal-statement-start -->
> **定理（零圧力勾配平板境界層のBlasius方程式）**  
> $U,\nu>0$ とし、$x>0,y\ge0$ に定常二次元Prandtl模型 $u_x+v_y=0$, $u u_x+v u_y=\nu u_{yy}$ を課す。$f\in C^3([0,\infty))$ から[自己相似表示](#def-fluid22-blasius-similarity)で $u,v$ を構成すると、この速度場が運動量式を満たすことと、$f$ が次を満たすことは同値である。

$$
\boxed{f'''+\frac12 f f''=0\qquad(\eta\ge0).}
$$

> さらに固定壁の $u=v=0$ と外縁の $u\to U$ を課すと、境界条件は次になる。

$$
\boxed{f(0)=0,\qquad f'(0)=0,\qquad f'(\infty)=1.}
$$

> ここで $f'(\infty)=1$ は $\lim_{\eta\to\infty}f'(\eta)=1$ を意味する。これはPrandtl模型**内**の正確な変換であり、元のNavier–Stokes方程式の任意のReynolds数で厳密解を与えるという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

[速度の再構成](#prop-fluid22-velocity-reconstruction)によって連続の式はすでに満たされる。残りは $u u_x+v u_y$ と $\nu u_{yy}$ を別々に微分して比べるだけだが、$\eta$ が $x$ と $y$ の両方に依存するため、連鎖律の係数を一つずつ追う。

<!-- proof-start -->
### 証明

$d(x)=\sqrt{\nu x/U}$ と書き、[速度表示](#prop-fluid22-velocity-reconstruction) $u=Uf'(\eta)$、$v=Ud(x)(\eta f'-f)/(2x)$ を用いる。$\eta_x=-\eta/(2x)$ と $\eta_y=1/d(x)$ から

$$
u_x=Uf''\eta_x=-\frac{U\eta}{2x}f'',
\qquad
u_y=Uf''\eta_y=\frac{U}{d(x)}f''.
$$

$y$ でさらに微分すると $d(x)$ は $y$ に依らないので

$$
u_{yy}=\frac{U}{d(x)}f'''\eta_y
=\frac{U}{d(x)^2}f'''
=\frac{U^2}{\nu x}f'''.
$$

二つの移流項は

$$
u u_x=-\frac{U^2}{2x}\eta f'f'',
$$

$$
v u_y
=\frac{Ud(x)}{2x}(\eta f'-f)
\frac{U}{d(x)}f''
=\frac{U^2}{2x}(\eta f'-f)f''.
$$

和をとると $\eta f'f''$ が消え、

$$
u u_x+v u_y
=-\frac{U^2}{2x}f f''.
$$

一方 $\nu u_{yy}=U^2f'''/x$ であり、$U^2/x>0$ を消去して

$$
-\frac12 ff''=f'''
$$

を得る。計算の各行は逆向きにも使えるので、自己相似形に制限した運動量式と常微分方程式は同値である。連続の式は流れ関数から恒等的に成立する。壁と外縁条件の対応は[速度再構成命題](#prop-fluid22-velocity-reconstruction)で確認したとおりである。
<!-- proof-end -->

**前節の試行関数が失敗する理由。** $f_{\mathrm{trial}}=\eta+e^{-\eta}-1$ では $f_{\mathrm{trial}}''=e^{-\eta}$、$f_{\mathrm{trial}}'''=-e^{-\eta}$ だから

$$
f_{\mathrm{trial}}'''+\frac12f_{\mathrm{trial}}f_{\mathrm{trial}}''
=e^{-\eta}\left(-1+\frac12[\eta+e^{-\eta}-1]\right).
$$

例えば $\eta=0$ で残差は $-1$。**境界条件だけ満たしても、方程式の解ではない**。前講の指数型候補と同じ注意点である。

## 4. 壁面の曲率を射撃法で選ぶ

Blasius方程式は三階で、$\eta=0$ の条件は二つしかない。残りの初期値を $a=f''(0)$ と置き、遠方の速度が1になるよう調整する。これを**射撃法**と呼ぶ。解の存在と一意性を数値的な結果だけから証明することはできないが、近似値と残差は再現可能である。

<a id="def-fluid22-shooting"></a>

<!-- formal-statement-start -->
> **定義（Blasius境界値問題の有限区間射撃法）**  
> $\eta_{\max}>0$ を固定する。未知の初期曲率 $a>0$ について、$f(0)=0$, $f'(0)=0$, $f''(0)=a$ から

$$
f'''=-\frac12ff''
$$

> を初期値問題として解き、終端誤差 $R_{\eta_{\max}}(a)=f_a'(\eta_{\max})-1$ を計算する。$R_{\eta_{\max}}(a)\approx0$ となる $a$ を選んで、無限遠の条件を有限区間で近似する方法をここでの射撃法とする。$f_a$ は与えた $a$ から得た初期値解であり、$\eta_{\max}$ と数値刻みを変えた収束確認を要する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fluid22-shooting -->
### 定義の確認：何を二分探索するか

**定義の確認**：射撃により変えるのは初期曲率であり、他の壁条件は保持する。

三成分 $z=(f,g,h)=(f,f',f'')$ を追うと、初期値は $(0,0,a)$ で、右辺は

$$
z'=(g,h,-fh/2).
$$

例えば終端を $\eta_{\max}=12$ として十分細かく積分する。初期曲率を二つ選んだときの終端速度は

$$
f_{0.2}'(12)\simeq0.7132<1,\qquad
f_{0.5}'(12)\simeq1.3137>1.
$$

有限区間・固定数値条件で計算された終端誤差の符号が異なる。初期値解の連続依存性が成り立つ範囲で、この間を二分して目標値へ近づける。最初の中点の終端速度を計算すると

$$
f_{0.35}'(12)\simeq1.035706>1.
$$

従って次の探索区間は $[0.2,0.35]$ となる。これは射撃法の各条件と更新規則を直接確かめる例である。有限な終端位置による切断誤差と、積分刻みによる離散化誤差は別々に残る。
<!-- definition-example-end -->

ここで使う四次Runge–Kutta法は刻み $h>0$ に対し、$z'=F(z)$、$F(f,g,h_2)=(g,h_2,-fh_2/2)$ を

$$
\begin{aligned}
k_1&=F(z_n),\\
k_2&=F(z_n+\tfrac h2k_1),\\
k_3&=F(z_n+\tfrac h2k_2),\\
k_4&=F(z_n+hk_3),\\
z_{n+1}&=z_n+\tfrac h6(k_1+2k_2+2k_3+k_4)
\end{aligned}
$$

で更新する。最後の $h_2$ は状態の第三成分を表し、刻み $h$ と区別した。

<a id="prop-fluid22-curvature-sign"></a>

<!-- formal-statement-start -->
> **命題（正の初期曲率と速度の単調性）**  
> $f\in C^3([0,T])$ が $f'''+ff''/2=0$、$f(0)=f'(0)=0$、$f''(0)=a>0$ を満たすとする。この有限区間では

$$
f''(\eta)=a\exp\left(-\frac12\int_0^\eta f(s)\,ds\right)>0.
$$

> 特に $f'(\eta)$ は狭義単調増加し、$f'(\eta)>0$ は $\eta>0$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$f''$ を一つの未知関数と見れば一次の線形常微分方程式になる。正の初期値に指数因子を掛けるだけなので、曲率の符号は変わらない。

<!-- proof-start -->
### 証明

$q(\eta)=f''(\eta)$ と置くと、方程式は $q'=-(f/2)q$ となる。積分因子

$$
I(\eta)=\exp\left(\frac12\int_0^\eta f(s)\,ds\right)>0
$$

を考える。微分の積の規則を用いると

$$
\frac{d}{d\eta}(Iq)
=I\left(q'+\frac12fq\right)=0.
$$

従って $I(\eta)q(\eta)=I(0)q(0)=a$ であり、表示式が得られる。$a>0$ だから $q>0$。よって $f'$ は狭義単調増加し、$f'(\eta)=f'(0)+\int_0^\eta q(s)ds>0$（$\eta>0$）である。
<!-- proof-end -->

この命題により、計算した解の接線速度が壁から離れるほど上昇する機構が理解できる。ただし**単調性だけで**無限遠の条件を満たす解の存在・一意性や、数値二分法の全域的成功まで証明したわけではない。

## 5. 数値実験：速度曲線を実際に求める

次のPython実験は、同じファイル内で射撃・数値積分・刻み半減検算・速度曲線描画を行う。標準ライブラリのみを用い、出力のグラフはブラウザ内で表示する。

```python-file-lab
# lab-id: FLUID22-BLASIUS-SHOOTING
# lab-title: Blasius境界値問題の射撃法・速度曲線・刻み検証
# lab-file: textbook/volumes/dream_thater/物理系/FLUID/FLUID22/blasius_lab.py
# timeout-ms: 20000
# lab-preset: 粗い刻み | --step 0.2 --eta-max 12
# lab-preset: 標準刻み | --step 0.05 --eta-max 12
# lab-preset: 細かい刻み | --step 0.02 --eta-max 12
# lab-preset: 遠方を短く切る影響 | --step 0.05 --eta-max 8
```

[Pythonソースを閲覧](blasius_lab.py)して、最初の条件 $f(0)=f'(0)=0$、試した $a$、終端誤差、刻み半減での値の変化を対応付けよう。同じ速度を無次元化した $f'(\eta)$ は外部流と重なる。もう一つの曲線 $f''(\eta)$ は正で、壁から離れると小さくなる。

標準的な十分長い区間・細かい刻みでは次の**近似値**を得る。

$$
f''(0)\simeq0.3320573362,\qquad
\eta_{99}\simeq4.90999.
$$

$\eta_{99}$ は $f'(\eta_{99})=0.99$ となる位置であり、数値で求める値である。$f'(1)\simeq0.32978$、$f'(2)\simeq0.62977$、$f'(5)\simeq0.99154$ も曲線の読み取りの検算に使える。

$\eta_{\max}$ を短くするほど外縁条件を有限の位置へ押し付ける誤差が増える可能性がある。刻みだけ半減してもこの**切断誤差**は消えない。反対に十分大きい $\eta_{\max}$ を選んでも、刻みが粗ければ**離散化誤差**が残る。

## 6. 厚さと壁面抵抗の係数

速度の形が分かれば、尺度だけでは決まらなかった壁面の勾配を計算できる。[前講のNewton粘性応力と摩擦係数](../FLUID21/index.md#prop-fluid21-wall-shear)では、流体側の壁面せん断の大きさを $\tau_w=\mu u_y(x,0)$、局所摩擦係数を $C_{f,x}=\tau_w/(\rho U^2/2)$ とした。向きのある壁が流体へ及ぼす力と、正のせん断応力の大きさは区別する。

<a id="prop-fluid22-wall-friction"></a>

<!-- formal-statement-start -->
> **命題（Blasius平板の99%厚さと局所摩擦係数）**  
> $U,\nu,\rho>0$、$x>0$ で、[Blasius境界値問題](#thm-fluid22-blasius-equation)の滑らかな付着解 $f$ があり、$f''(0)=a>0$、$f'$ は0から1へ単調に増えると仮定する。$f'(\eta_{99})=0.99$ を満たす位置 $\eta_{99}$ を定めれば

$$
\delta_{99}(x)=\eta_{99}\sqrt{\frac{\nu x}{U}}.
$$

> また壁面のせん断応力と局所摩擦係数は

$$
\tau_w(x)=\mu U\sqrt{\frac{U}{\nu x}}\,a,
\qquad
C_{f,x}=\frac{2a}{\sqrt{\mathrm{Re}_x}}.
$$

> 数値射撃で得た $a\simeq0.3320573362$, $\eta_{99}\simeq4.90999$ を使うと、$\delta_{99}\simeq4.91\sqrt{\nu x/U}$、$C_{f,x}\simeq0.664115/\sqrt{\mathrm{Re}_x}$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

相似座標 $\eta=y/d(x)$ により、99%位置は単に $y=\eta_{99}d(x)$ へ戻せばよい。摩擦係数では $u_y=Uf''/d(x)$ を**壁で**評価し、$\nu=\mu/\rho$ と局所Reynolds数で整理する。

<!-- proof-start -->
### 証明

[速度の再構成](#prop-fluid22-velocity-reconstruction)から $u=Uf'(\eta)$ である。$u/U=0.99$ は $f'(\eta)=0.99$ なので $\eta_{99}$ を取り、$y=\eta d(x)$ を代入すれば厚さの式を得る。

[Blasius方程式の証明](#thm-fluid22-blasius-equation)で計算した $u_y=(U/d(x))f''(\eta)$ を壁 $y=0$（$\eta=0$）に適用すると

$$
u_y(x,0)=\frac U{d(x)}f''(0)
=U\sqrt{\frac{U}{\nu x}}\,a.
$$

[境界層における壁面せん断](../FLUID21/index.md#prop-fluid21-wall-shear)を使い、

$$
\tau_w=\mu u_y(x,0)
=\mu U\sqrt{\frac{U}{\nu x}}\,a.
$$

次に $\mu=\rho\nu$ を代入して

$$
\begin{aligned}
C_{f,x}
&=\frac{\mu U a/d(x)}{\rho U^2/2}\\
&=\frac{2\nu a}{U d(x)}
=2a\sqrt{\frac{\nu}{Ux}}\\
&=\frac{2a}{\sqrt{\mathrm{Re}_x}}.
\end{aligned}
$$

すべての量は $x>0$ で定義され、仮定 $a>0$ から $\tau_w>0$、$C_{f,x}>0$ である。
<!-- proof-end -->

**数値例。** 水の代表値として $\rho=1000$ kg/m$^3$、$\nu=10^{-6}$ m$^2$/s、$U=2$ m/s、$x=0.5$ m を模型の入力とする。$\mathrm{Re}_x=10^6$、$d(x)=5\times10^{-4}$ m なので

$$
\delta_{99}\simeq2.455\times10^{-3}\ {\rm m},
\qquad
C_{f,x}\simeq6.64115\times10^{-4}.
$$

$\rho U^2/2=2000$ Pa だから $\tau_w\simeq1.32823$ Pa である。これは指定した**層流境界層模型**の値であって、実験した平板がこの場所で必ず層流だとの保証ではない。

また $x$ を4倍にすると $\delta_{99}$ は2倍、$C_{f,x}$ と $\tau_w$ は半分になる。$x\downarrow0$ で式が形式的に発散しても、前縁では $\mathrm{Re}_x\gg1$ の仮定が崩れるので無限応力を予測したことにはならない。

## 7. 演習

特記しない限り、$x>0$, $y\ge0$, $U,\nu,\rho>0$、$\mu=\rho\nu$ とし、前節までの零圧力勾配・定常二次元・付着層流の平板模型を使う。詳細解答では何を固定して偏微分したか、どの境界条件を使ったかも確認する。

### Level A

### A1. 相似座標と無次元性

$\nu=10^{-5}$ m$^2$/s、$U=2$ m/s、$x=0.5$ m、$y=1$ mm のとき $d(x)$ と $\eta$ を求めよ。同じ $y/d(x)$ を保ったまま $x$ を4倍にすると、$y$ は何倍になるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

[代表尺度](#def-fluid22-blasius-similarity)により

$$
d(x)=\sqrt{\frac{10^{-5}\times0.5}{2}}
=\sqrt{2.5\times10^{-6}}
\simeq1.58114\times10^{-3}\ {\rm m}.
$$

$y=10^{-3}$ m なので $\eta=y/d\simeq0.632456$。$\eta$ は無次元である。$d(x)\propto\sqrt{x}$ なので $x$ を4倍にすると $d$ は2倍、$\eta=y/d$ を固定するには $y$ も2倍にする。
<!-- solution-end -->

### A2. 流れ関数から速度を戻す

$\psi(x,y)=\sqrt{\nu Ux}f(\eta)$、$\eta=y\sqrt{U/(\nu x)}$ とする。$u=\psi_y$ と $v=-\psi_x$ を求め、$f(0)=f'(0)=0$ なら壁で両方零になることを確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\eta_y=\sqrt{U/(\nu x)}$ を使って

$$
u=\sqrt{\nu Ux}f'(\eta)\sqrt{\frac{U}{\nu x}}=Uf'(\eta).
$$

$x$ 偏微分は $y$ を固定する。$\eta_x=-\eta/(2x)$ だから

$$
\begin{aligned}
v&=-\left[\frac{\sqrt{\nu Ux}}{2x}f
+\sqrt{\nu Ux}f'\left(-\frac{\eta}{2x}\right)\right]\\
&=\frac12\sqrt{\frac{\nu U}{x}}(\eta f'-f).
\end{aligned}
$$

$y=0$ なら $\eta=0$、従って $u(x,0)=Uf'(0)=0$ と $v(x,0)=-\sqrt{\nu U/x}\,f(0)/2=0$。
<!-- solution-end -->

### A3. 境界条件だけでは足りない

$f(\eta)=\eta+e^{-\eta}-1$ とする。壁・外縁の三つの境界条件を確認し、$f'''+ff''/2$ を $\eta=0$ で評価せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$f(0)=0$。$f'=1-e^{-\eta}$ なので $f'(0)=0$、$\eta\to\infty$ で $f'\to1$。一方 $f''=e^{-\eta}$、$f'''=-e^{-\eta}$ だから

$$
\left(f'''+\frac12ff''\right)_{\eta=0}
=-1+\frac12\cdot0\cdot1=-1\ne0.
$$

従って[Blasius方程式](#thm-fluid22-blasius-equation)を満たさない。失われたのは運動量保存であり、境界条件の不足ではない。
<!-- solution-end -->

### A4. 摩擦係数の数値と次元

$\rho=1000$ kg/m$^3$、$\nu=10^{-6}$ m$^2$/s、$U=2$ m/s、$x=0.5$ m、$a=0.3320573$ とする。$\mathrm{Re}_x$、$C_{f,x}$、$\tau_w$ を求め、二つの単位を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\mathrm{Re}_x=Ux/\nu=(2)(0.5)/10^{-6}=10^6$。[壁面摩擦の命題](#prop-fluid22-wall-friction)から

$$
C_{f,x}=\frac{2(0.3320573)}{\sqrt{10^6}}
=0.0006641146.
$$

$\rho U^2/2=1000\cdot4/2=2000$ Pa を用い、

$$
\tau_w=2000\cdot0.0006641146
=1.3282292\ {\rm Pa}.
$$

$\tau_w$ は圧力と同じ Pa、$C_{f,x}$ は応力を動圧で割った無次元量であり、どちらも正である。
<!-- solution-end -->

### A5. 曲率の符号

$0\le\eta\le T$ で $f'''+ff''/2=0$、$f(0)=f'(0)=0$、$f''(0)=a>0$ とする。$f''(\eta)$ の符号と $f'(\eta)$ の増減を判定せよ。$a=0$ の場合も比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$q=f''$ と置くと $q'+fq/2=0$。[曲率の符号の命題](#prop-fluid22-curvature-sign)の積分因子計算より

$$
q(\eta)=a\exp\left(-\frac12\int_0^\eta f(s)ds\right).
$$

$a>0$ では $q>0$ だから $f'$ は狭義単調増加する。$a=0$ では同じ一次方程式の解は $q\equiv0$、$f'(0)=0$ より $f'\equiv0$。この場合は外縁条件 $f'(\infty)=1$ に達しない。
<!-- solution-end -->

### Level B

### B1. 係数 $1/2$ を導き直す

$u=Uf'(\eta)$、$v=(1/2)\sqrt{\nu U/x}(\eta f'-f)$ を使って、$u_x,u_y,u_{yy}$ を求め、運動量式から $f'''+ff''/2=0$ を導け。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\eta_x=-\eta/(2x)$、$\eta_y=\sqrt{U/(\nu x)}$ を使うと

$$
u_x=-\frac{U\eta}{2x}f'',
\qquad
u_y=U\sqrt{\frac{U}{\nu x}}f'',
\qquad
u_{yy}=\frac{U^2}{\nu x}f'''.
$$

さらに

$$
\begin{aligned}
u u_x&=-\frac{U^2}{2x}\eta f'f'',\\
v u_y&=\frac{U^2}{2x}(\eta f'-f)f'',\\
u u_x+v u_y&=-\frac{U^2}{2x}ff''.
\end{aligned}
$$

[Prandtl運動量式](../FLUID21/index.md#thm-fluid21-prandtl)の右辺は $\nu u_{yy}=U^2f'''/x$。$U^2/x>0$ を約して $-ff''/2=f'''$ を得る。$\eta f'f''$ が二つの移流項で打ち消される点が係数の決め手となる。
<!-- solution-end -->

### B2. 射撃法で変える量・変えない量

$\eta_{\max}=12$ で $g=f'$、$h=f''$ と置き、初期値 $(f,g,h)(0)=(0,0,a)$ を積分して $g(12)=1$ を目標にする。$a=0.2$ で $g(12)\simeq0.7132$、$a=0.5$ で $g(12)\simeq1.3137$ が得られた。二分法の最初の試行 $a$ と次に残す区間を求めよ。また刻みを半減する検査と $\eta_{\max}$ を大きくする検査が区別する誤差を説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[射撃法の定義](#def-fluid22-shooting)では $a=f''(0)$ を変え、$f(0)=g(0)=0$ は変えない。終端残差は両端で負・正だから、最初の中点は

$$
a_{\rm mid}=\frac{0.2+0.5}{2}=0.35.
$$

中点の初期値 $(f,g,h)(0)=(0,0,0.35)$ を同じ方程式 $f'=g$, $g'=h$, $h'=-fh/2$ で数値積分すると、$g_{0.35}(12)\simeq1.035706$ となる。従って終端残差は

$$
R_{12}(0.35)=g_{0.35}(12)-1\simeq0.035706>0.
$$

$R_{12}(0.2)\simeq-0.2868<0$ なので、次に残す区間は **$[0.2,0.35]$** である。残差を実際に計算せずに符号を推測して区間を決めてはいけない。刻み半減は常微分方程式の離散化誤差を、$\eta_{\max}$ の増大は無限遠条件を有限位置へ置いた切断誤差を調べる。両方を確認しなければ $f''(0)$ の桁は保証できない。
<!-- solution-end -->

### B3. 下流へ進んだときの厚さと応力

同じ $U,\nu,\rho$ で $x_2=4x_1>0$ とする。$\delta_{99}(x_2)/\delta_{99}(x_1)$、$\tau_w(x_2)/\tau_w(x_1)$、$C_{f,x_2}/C_{f,x_1}$ を求め、$x\to0$ の極限を物理予測として用いてよいか判定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[99%厚さと摩擦係数](#prop-fluid22-wall-friction)より、共通な $\eta_{99},a$ を消すと

$$
\frac{\delta_{99}(4x_1)}{\delta_{99}(x_1)}
=\sqrt{\frac{4x_1}{x_1}}=2.
$$

$\tau_w$ と $C_{f,x}$ はともに $x^{-1/2}$ に比例するので

$$
\frac{\tau_w(4x_1)}{\tau_w(x_1)}
=\frac{C_{f,4x_1}}{C_{f,x_1}}
=\frac{1}{\sqrt4}=\frac12.
$$

形式的には $x\to0$ で応力が発散するが、同時に $\mathrm{Re}_x=Ux/\nu\to0$。[境界層尺度の成立条件](../FLUID21/index.md#prop-fluid21-thickness)を失うため、この極限を元の流体の真の無限応力と解釈しない。
<!-- solution-end -->

### B4. 相似座標を半分にしたら係数はどう変わるか

$\zeta=\eta/2$、$F(\zeta)=f(2\zeta)$ とする。$F$ が満たす常微分方程式、$F'(0)$、$F'(\infty)$、$F''(0)$ を $f$ の量で表せ。さらに $C_{f,x}$ の値が変わらないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

連鎖律を一段ずつ使うと

$$
F'(\zeta)=2f'(2\zeta),\quad
F''(\zeta)=4f''(2\zeta),\quad
F'''(\zeta)=8f'''(2\zeta).
$$

[Blasius方程式](#thm-fluid22-blasius-equation) $f'''+ff''/2=0$ を $\eta=2\zeta$ で適用し8倍すれば

$$
\begin{aligned}
0&=8\left[f'''(2\zeta)+\frac12 f(2\zeta)f''(2\zeta)\right]\\
&=F'''(\zeta)+4F(\zeta)\frac{F''(\zeta)}4\\
&=F'''(\zeta)+F(\zeta)F''(\zeta).
\end{aligned}
$$

また $F'(0)=2f'(0)=0$、$F'(\infty)=2$、$F''(0)=4a$。元の速度は $u=Uf'(\eta)=(U/2)F'(\zeta)$ なので、$\zeta_y=1/(2d)$ を使い

$$
u_y(x,0)=\frac U2 F''(0)\frac1{2d}
=\frac{U}{4d}(4a)=\frac{Ua}{d}.
$$

したがって $C_{f,x}=2\nu a/(Ud)=2a/\sqrt{\mathrm{Re}_x}$ で不変である。係数 $1/2$ や遠方条件の数値だけを暗記し、**相似座標の正規化**を無視してはいけない。
<!-- solution-end -->

### Level C

### C1. 平板のBlasius解を一連の計算で使う

$\rho=1000$ kg/m$^3$、$\nu=10^{-6}$ m$^2$/s、$U=2$ m/s、$x=0.5$ m の一様外部流平板を考える。定常二次元・零圧力勾配・付着層流を仮定し、射撃法による $a=0.3320573362$、$\eta_{99}=4.90999$ の近似値を用いてよい。

1. 流れ関数から $u,v$ を求め、壁と外縁の条件を三つの $f$ の条件に直せ。
2. 運動量式へ代入するための $u_x,u_y,u_{yy}$ を計算し、$f$ の境界値問題を導け。
3. $\mathrm{Re}_x,d(x),\delta_{99},C_{f,x},\tau_w$ を求め、単位と正負を記せ。
4. 同じ外側条件を満たす $f_{\mathrm{trial}}(\eta)=\eta+e^{-\eta}-1$ を使って同じ摩擦係数を出してよいか、方程式の残差から判定せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**1. 速度と条件。** $d=\sqrt{\nu x/U}$、$\eta=y/d$ を用いて $\psi=Ud f(\eta)$ と置く。$\eta_y=1/d$、$\eta_x=-\eta/(2x)$、$d'=d/(2x)$ だから

$$
u=\psi_y=Uf',\qquad
v=-\psi_x=\frac{Ud}{2x}(\eta f'-f).
$$

よって壁の $u=v=0$ は $f'(0)=f(0)=0$、外側の $u\to U$ は $f'(\infty)=1$ と対応する。

**2. 方程式。** $u=Uf'(\eta)$ を偏微分して

$$
u_x=-\frac{U\eta}{2x}f'',\quad
u_y=\frac U d f'',\quad
u_{yy}=\frac U{d^2}f'''.
$$

移流項の和を展開すると

$$
\begin{aligned}
u u_x+v u_y
&=-\frac{U^2}{2x}\eta f'f''
+\frac{U^2}{2x}(\eta f'-f)f''\\
&=-\frac{U^2}{2x}ff''.
\end{aligned}
$$

右辺は $\nu u_{yy}=(\nu U/d^2)f'''=(U^2/x)f'''$。[前講の運動量式](../FLUID21/index.md#thm-fluid21-prandtl)から

$$
f'''+\frac12ff''=0,\qquad
f(0)=f'(0)=0,\quad f'(\infty)=1.
$$

**3. 係数を含む予測。** $\mathrm{Re}_x=Ux/\nu=10^6$、$d=\sqrt{10^{-6}(0.5)/2}=5\times10^{-4}$ m。[Blasius平板の99%厚さと局所摩擦係数](#prop-fluid22-wall-friction)より

$$
\delta_{99}=\eta_{99}d
=4.90999(5\times10^{-4})
\simeq2.454995\times10^{-3}\ {\rm m}.
$$

$$
C_{f,x}=\frac{2(0.3320573362)}{1000}
\simeq6.641147\times10^{-4}.
$$

動圧は $\rho U^2/2=2000$ Pa なので

$$
\tau_w=\frac{\rho U^2}{2}C_{f,x}
\simeq1.3282293\ {\rm Pa}.
$$

摩擦係数は無次元、せん断応力はPa。どちらも正で、壁が流体を減速させる方向の力を及ぼすことと矛盾しない。

**4. 試行関数との区別。** この候補では $f_{\mathrm{trial}}''(0)=1$ なので、勾配の式だけ使えば別の摩擦値が出てしまう。しかし

$$
\left(f_{\mathrm{trial}}'''+\frac12f_{\mathrm{trial}}f_{\mathrm{trial}}''\right)_{\eta=0}
=-1\ne0.
$$

運動量式を満たす[Blasius解の条件](#thm-fluid22-blasius-equation)に反するため、この候補から得た値を平板層流の係数と呼べない。さらに数値がいかに整っていても、$\mathrm{Re}_x\gg1$・付着層流等の模型条件を実際の流れで検査しなければ適用可否は決められない。
<!-- solution-end -->

## 8. まとめと次への接続

[Prandtl方程式](../FLUID21/index.md#thm-fluid21-prandtl)と $\sqrt{x}$ の厚さ尺度から自己相似座標を作り、流れ関数で連続条件を処理すると、平板境界層は $f'''+ff''/2=0$ の三階境界値問題になる。数値射撃により壁の初期曲率 $a$ を定めると、99%厚さの係数は約4.91、局所摩擦係数の係数は約0.664となる。

これは定常・零圧力勾配・付着層流・高局所Reynolds数という仮定の下での結論である。次のFLUID23では速度の欠損を積分し、変位厚さ・運動量厚さと平板全体の抗力へ進む。
