# F0-00TS1 Encore IV：定常過程・Hilbert予測・innovation・Wold分解

ここから離散時間の時系列へ戻ります。

E2-03では AR・MA・ARIMA の計算を扱います。この補講では、その下にある予測理論を **Hilbert空間の直交分解**として証明します。

中心線は

```text
二次定常過程
  ↓
過去の線形予測空間 H_t
  ↓
innovation = H_t に新しく増えた直交方向
  ↓
H_t = H_{t-1} ⊕ innovation space
  ↓ 時間を遡って反復
remote past ⊕ 全innovation
  ↓
Wold decomposition
```

です。

以下では平均を引いて

$$
E[X_t]=0
$$

とします。平均が非零なら最後に定数平均を戻せば十分です。

---

## 1. 二次定常過程

<a id="def-f0-00ts1-second-order-stationary"></a>

<!-- formal-statement-start -->
> **定義（二次定常過程）**  
> $t\in\mathbb Z$ で添字付けられた実確率過程 $(X_t)$ が二次定常であるとは、各 $X_t\in L^2$ で、ある定数 $\mu$ と関数 $\gamma:\mathbb Z\to\mathbb R$ が存在して

$$
E[X_t]=\mu,
\qquad
\operatorname{Cov}(X_t,X_s)=\gamma(t-s)
$$

> が全ての $s,t\in\mathbb Z$ で成り立つことです。
<!-- formal-statement-end -->

### 1.1 例：white noise

互いに無相関で

$$
E[\varepsilon_t]=0,
\qquad
E[\varepsilon_t^2]=\sigma^2
$$

が全時刻で成り立つ列を考えます。

<!-- definition-example-start: def-f0-00ts1-second-order-stationary -->
**定義の確認**  
平均は時刻によらず0です。また

$$
\operatorname{Cov}(\varepsilon_t,\varepsilon_s)
=
\begin{cases}
\sigma^2,&t=s,\\
0,&t\ne s,
\end{cases}
$$

は $t-s$ だけで決まります。従ってwhite noiseは二次定常です。
<!-- definition-example-end -->

平均0なら $L^2$ 内積

$$
\langle Y,Z\rangle:=E[YZ]
$$

に対して

$$
\langle X_t,X_s\rangle=\gamma(t-s).
$$

つまり自己共分散は確率変数ベクトル同士の内積です。

---

## 2. 過去の線形予測空間

<a id="def-f0-00ts1-past-space"></a>

<!-- formal-statement-start -->
> **定義（過去の線形予測空間）**  
> 平均0の二次定常過程 $(X_t)$ に対し

$$
\boxed{
\mathcal H_t
:=
\overline{\operatorname{span}}
\{X_s:s\le t\}^{L^2}
}
$$

> と定めます。$\mathcal H_t$ は時刻 $t$ までの観測から $L^2$ 極限を含む線形操作で作れる全ての確率変数の空間です。
<!-- formal-statement-end -->

### 2.1 例：white noiseの過去空間

<!-- definition-example-start: def-f0-00ts1-past-space -->
**定義の確認**  
$X_t=\varepsilon_t$ がwhite noiseなら

$$
\mathcal H_t
=
\overline{\operatorname{span}}
\{\varepsilon_t,\varepsilon_{t-1},\dots\}.
$$

有限線形結合だけでなく、その $L^2$ 極限まで含めるため定義どおり閉部分空間です。また生成集合が増えるので

$$
\mathcal H_{t-1}\subset\mathcal H_t.
$$
<!-- definition-example-end -->

---

## 3. 最良線形予測は直交射影

<a id="thm-f0-00ts1-linear-prediction"></a>

<!-- formal-statement-start -->
> **定理（最良線形予測）**  
> 平均0の二次定常過程 $(X_t)$ に対し、$X_t$ を時刻 $t-1$ までから線形予測する問題

$$
\inf_{Y\in\mathcal H_{t-1}}E[(X_t-Y)^2]
$$

> は一意な解を持ち、その解は

$$
\boxed{
\widehat X_t=P_{\mathcal H_{t-1}}X_t
}
$$

> です。さらに残差 $X_t-\widehat X_t$ は $\mathcal H_{t-1}$ の全ての元に直交します。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Hilbert射影定理をそのまま適用する

$L^2$ はHilbert空間で、$\mathcal H_{t-1}$ は定義により閉部分空間です。[Hilbert射影定理](../F0_02C1_Banach_Hilbert_射影/index.md#thm-hilbert-projection)から一意な直交射影

$$
P_{\mathcal H_{t-1}}X_t
$$

が存在し、任意の $Y\in\mathcal H_{t-1}$ について

$$
\|X_t-Y\|_2^2
=
\|X_t-P_{\mathcal H_{t-1}}X_t\|_2^2
+\|P_{\mathcal H_{t-1}}X_t-Y\|_2^2.
$$

従って射影が一意な最小化解であり、射影残差は $\mathcal H_{t-1}$ に直交します。
<!-- proof-end -->

条件付き期待値

$$
E[X_t\mid\mathcal F_{t-1}]
$$

は過去情報の**任意の可測関数**を許した最良 $L^2$ 予測です。一方ここでの射影は過去変数の**線形閉包**に制限した最良線形予測です。Gaussian過程では両者が一致する重要な場合があります。

---

## 4. innovation

<a id="def-f0-00ts1-innovation"></a>

<!-- formal-statement-start -->
> **定義（innovation）**  
> 平均0の二次定常過程 $(X_t)$ に対し、一段先線形予測誤差

$$
\boxed{
\varepsilon_t
:=X_t-P_{\mathcal H_{t-1}}X_t
}
$$

> を時刻 $t$ のinnovationと呼びます。
<!-- formal-statement-end -->

### 4.1 例：white noiseは自分自身がinnovation

$X_t=\varepsilon_t$ を分散 $\sigma^2>0$ のwhite noiseとします。

<!-- definition-example-start: def-f0-00ts1-innovation -->
**定義の確認**  
$X_t$ は全ての $X_s$ $(s<t)$ と直交するため

$$
P_{\mathcal H_{t-1}}X_t=0.
$$

従ってinnovationの定義から

$$
X_t-P_{\mathcal H_{t-1}}X_t=X_t.
$$

つまりwhite noiseでは各観測全体がその時点の新情報です。
<!-- definition-example-end -->

射影の特徴付けから

$$
\varepsilon_t\perp\mathcal H_{t-1}.
$$

$s<t$ なら $\varepsilon_s\in\mathcal H_s\subset\mathcal H_{t-1}$ なので

$$
E[\varepsilon_t\varepsilon_s]=0.
$$

したがってinnovation列は異時点で無相関です。

---

## 5. 定常性は時間shiftをunitaryにする

Wold分解で係数が時刻 $t$ に依存しない理由を先に証明します。

<a id="lem-f0-00ts1-unitary-shift"></a>

<!-- formal-statement-start -->
> **補題（定常shift作用素）**  
> $\mathcal H:=\overline{\operatorname{span}}\{X_t:t\in\mathbb Z\}$ とします。二次定常性の下で

$$
U X_t:=X_{t+1}
$$

> は有限線形結合上の等長写像としてwell-definedであり、一意にunitary operator $U:\mathcal H\to\mathcal H$ へ延長されます。さらに

$$
U\mathcal H_t=\mathcal H_{t+1}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Gram行列が時間平行移動で変わらない

有限線形結合 $Y=\sum_{j=1}^ma_jX_{t_j}$ に対して

$$
\begin{aligned}
\left\|\sum_ja_jX_{t_j+1}\right\|_2^2
&=\sum_{i,j}a_ia_j\gamma(t_i-t_j)\\
&=\left\|\sum_ja_jX_{t_j}\right\|_2^2.
\end{aligned}
$$

従って元の線形結合が0ならshift後も0であり、$U$ はwell-definedな等長写像です。逆向きshift $X_t\mapsto X_{t-1}$ も同様に等長なので、稠密部分空間上で $U$ は全単射です。よって完備化へunitaryに延長されます。

生成元を一つ進めるので

$$
U\mathcal H_t
=
\overline{\operatorname{span}}\{X_{s+1}:s\le t\}
=
\mathcal H_{t+1}.
$$
<!-- proof-end -->

直交射影の一意性から

$$
P_{\mathcal H_t}U=UP_{\mathcal H_{t-1}}
$$

です。従って

$$
\varepsilon_t=U^t\varepsilon_0,
$$

特に

$$
E[\varepsilon_t^2]=\sigma_\varepsilon^2
$$

は時刻によらず一定です。

---

## 6. 1時刻で増える空間はinnovation 1方向だけ

<a id="lem-f0-00ts1-one-step-orthogonal"></a>

<!-- formal-statement-start -->
> **補題（one-step orthogonal decomposition）**  
> innovation $\varepsilon_t$ に対し

$$
\boxed{
\mathcal H_t
=
\mathcal H_{t-1}
\oplus
\mathcal E_t,
\qquad
\mathcal E_t:=\operatorname{span}\{\varepsilon_t\}
}
$$

> が成り立ちます。$\varepsilon_t=0$ の場合は $\mathcal E_t=\{0\}$ と解釈します。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：$X_t$ を予測部分と残差へ分ける

定義から

$$
X_t=P_{\mathcal H_{t-1}}X_t+\varepsilon_t,
\qquad
\varepsilon_t\perp\mathcal H_{t-1}.
$$

また

$$
\mathcal H_t
=
\overline{\operatorname{span}}(\mathcal H_{t-1}\cup\{X_t\}).
$$

$X_t$ の代わりに $P_{\mathcal H_{t-1}}X_t+\varepsilon_t$ を入れれば、追加される新しい方向は $\varepsilon_t$ だけです。有限次元空間 $\operatorname{span}\{\varepsilon_t\}$ は閉なので主張が従います。
<!-- proof-end -->

これを反復すると任意の $n\ge1$ に対して

$$
\boxed{
\mathcal H_t
=
\mathcal H_{t-n}
\oplus
\mathcal E_{t-n+1}
\oplus\cdots\oplus
\mathcal E_t.
}
$$

---

## 7. remote past と purely nondeterministic

<a id="def-f0-00ts1-remote-past"></a>

<!-- formal-statement-start -->
> **定義（remote past）**  
> 過去空間の共通部分

$$
\boxed{
\mathcal H_{-\infty}
:=\bigcap_{t\in\mathbb Z}\mathcal H_t
}
$$

> をremote pastと呼びます。
<!-- formal-statement-end -->

<a id="def-f0-00ts1-purely-nondeterministic"></a>

<!-- formal-statement-start -->
> **定義（purely nondeterministic）**  
> 二次定常過程が

$$
\boxed{
\mathcal H_{-\infty}=\{0\}
}
$$

> を満たすときpurely nondeterministicであるといいます。
<!-- formal-statement-end -->

### 7.1 例：white noiseのremote pastは0

<!-- definition-example-start: def-f0-00ts1-remote-past, def-f0-00ts1-purely-nondeterministic -->
**定義の確認**  
white noise $(\varepsilon_t)$ に対し $Y\in\mathcal H_{-\infty}$ とします。任意の $s$ について

$$
Y\in\mathcal H_{s-1},
$$

一方 $\varepsilon_s\perp\mathcal H_{s-1}$ なので

$$
\langle Y,\varepsilon_s\rangle=0.
$$

これは全ての $s\in\mathbb Z$ で成り立ちます。しかし $Y$ 自身はwhite noise全体の閉線形包に属するので、生成元全てに直交する $Y$ は0しかありません。従って

$$
\mathcal H_{-\infty}=\{0\},
$$

すなわちwhite noiseはpurely nondeterministicです。
<!-- definition-example-end -->

---

## 8. 減少する閉部分空間への射影

Wold分解の唯一のHilbert空間的な極限補題です。

<a id="lem-f0-00ts1-decreasing-projections"></a>

<!-- formal-statement-start -->
> **補題（減少閉部分空間への射影収束）**  
> Hilbert空間 $H$ の閉部分空間列

$$
M_1\supset M_2\supset\cdots,
\qquad
M_\infty:=\bigcap_{n=1}^\infty M_n
$$

> に対し、任意の $x\in H$ で

$$
\boxed{
P_{M_n}x\longrightarrow P_{M_\infty}x
}
$$

> がノルム収束で成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：射影ノルムの単調性からCauchyにする

$y_n:=P_{M_n}x$ と置きます。$m>n$ なら $M_m\subset M_n$ です。$x-y_n\perp M_n$ なので $M_m$ にも直交し

$$
y_m=P_{M_m}x=P_{M_m}y_n.
$$

従って

$$
y_n-y_m\perp y_m
$$

であり

$$
\|y_n-y_m\|^2
=\|y_n\|^2-\|y_m\|^2.
$$

よって $\|y_n\|$ は単調減少し極限を持つため $(y_n)$ はCauchyです。完備性から $y_n\to y$ とします。

固定した $n$ に対し $m\ge n$ なら $y_m\in M_n$ なので、閉性から $y\in M_n$。従って $y\in M_\infty$ です。また $z\in M_\infty$ なら全ての $n$ で

$$
\langle x-y_n,z\rangle=0.
$$

極限を取って $x-y\perp M_\infty$。従って射影の特徴付けから

$$
y=P_{M_\infty}x.
$$
<!-- proof-end -->

---

## 9. deterministic component

<a id="def-f0-00ts1-deterministic-component"></a>

<!-- formal-statement-start -->
> **定義（Woldのdeterministic component）**  
> remote pastを $\mathcal K:=\mathcal H_{-\infty}$ と書き、

$$
\boxed{
X_t^{(d)}:=P_{\mathcal K}X_t
}
$$

> と定めます。
<!-- formal-statement-end -->

### 9.1 例：完全な正弦波

$A,B\in L^2$ を平均0とし、$0<\omega<\pi$ について

$$
X_t=A\cos(\omega t)+B\sin(\omega t)
$$

とします。$A,B$ の共分散を適切に選べば二次定常になります。

<!-- definition-example-start: def-f0-00ts1-deterministic-component -->
**定義の確認**  
$\sin\omega\ne0$ なので連続する2時点 $(X_t,X_{t-1})$ から線形方程式を解いて $A,B$ を復元できます。従って全ての $t$ で

$$
\mathcal H_t=\operatorname{span}\{A,B\}.
$$

よってremote pastも同じ空間で、$X_t\in\mathcal K$ です。したがって

$$
P_{\mathcal K}X_t=X_t,
$$

つまりこの過程はdeterministic componentだけから成ります。
<!-- definition-example-end -->

shift作用素 $U$ は全ての $\mathcal H_t$ を一つ進めるため、その共通部分 $\mathcal K$ も不変にします。従って

$$
X_t^{(d)}=U^tX_0^{(d)}
$$

で、deterministic component自身も二次定常です。

さらに各 $r$ について

$$
\boxed{
\mathcal K
=
\overline{\operatorname{span}}\{X_s^{(d)}:s\le r\}.
}
$$

実際 $\mathcal K\subset\mathcal H_r$ なので $P_{\mathcal K}(\mathcal H_r)=\mathcal K$。$\mathcal H_r$ を生成する $X_s$ $(s\le r)$ を射影すれば $X_s^{(d)}$ だからです。従って $X_t^{(d)}$ は自分自身のどれだけ古い過去からも $L^2$ 的に完全予測できます。

---

## 10. Wold decomposition

<a id="thm-f0-00ts1-wold"></a>

<!-- formal-statement-start -->
> **定理（Wold decomposition）**  
> $(X_t)_{t\in\mathbb Z}$ を平均0の実二次定常過程とし、innovationを

$$
\varepsilon_t=X_t-P_{\mathcal H_{t-1}}X_t
$$

> とします。innovation分散を

$$
\sigma_\varepsilon^2:=E[\varepsilon_t^2]
$$

> とします。
>
> **(i)** $\sigma_\varepsilon^2=0$ なら $X_t=X_t^{(d)}$ で、過程は完全にdeterministicです。
>
> **(ii)** $\sigma_\varepsilon^2>0$ なら、時刻に依存しない係数列 $(\psi_j)_{j\ge0}$ が一意に存在して

$$
\boxed{
X_t
=X_t^{(d)}
+
\sum_{j=0}^\infty\psi_j\varepsilon_{t-j}
}
$$

> が $L^2$ で成り立ちます。ここで

$$
\psi_0=1,
\qquad
\sum_{j=0}^\infty\psi_j^2<\infty,
$$

> deterministic componentは全innovationと直交し、innovation列は平均0・一定分散・異時点無相関です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：有限直交分解を無限過去まで送る

#### Step 1：innovation空間を有限個だけ分離する

[one-step orthogonal decomposition](#lem-f0-00ts1-one-step-orthogonal)を $n$ 回繰り返すと

$$
\mathcal H_t
=
\mathcal H_{t-n}
\oplus\mathcal E_{t-n+1}
\oplus\cdots\oplus\mathcal E_t.
$$

従って $X_t\in\mathcal H_t$ は直交射影によって

$$
X_t
=P_{\mathcal H_{t-n}}X_t
+
\sum_{j=0}^{n-1}P_{\mathcal E_{t-j}}X_t
$$

と一意に分かれます。

#### Step 2：遠い過去の射影をdeterministic componentへ収束させる

$\mathcal H_{t-n}$ は $n$ とともに減少し

$$
\bigcap_{n\ge1}\mathcal H_{t-n}
=\mathcal H_{-\infty}=\mathcal K.
$$

[減少閉部分空間への射影収束](#lem-f0-00ts1-decreasing-projections)から

$$
P_{\mathcal H_{t-n}}X_t
\longrightarrow
P_{\mathcal K}X_t
=X_t^{(d)}
$$

in $L^2$ です。

#### Step 3：各innovation空間への射影係数を求める

$\sigma_\varepsilon^2>0$ とします。$\mathcal E_{t-j}=\operatorname{span}\{\varepsilon_{t-j}\}$ なので

$$
P_{\mathcal E_{t-j}}X_t
=
\frac{E[X_t\varepsilon_{t-j}]}{\sigma_\varepsilon^2}
\varepsilon_{t-j}.
$$

shift unitaryを使うと

$$
E[X_t\varepsilon_{t-j}]
=E[X_0\,U^{-j}\varepsilon_0]
$$

で、これは $t$ に依存しません。そこで

$$
\psi_j
:=
\frac{E[X_t\varepsilon_{t-j}]}{\sigma_\varepsilon^2}
$$

と置けます。

$j=0$ では

$$
X_t=P_{\mathcal H_{t-1}}X_t+\varepsilon_t,
\qquad
\varepsilon_t\perp\mathcal H_{t-1}
$$

なので

$$
E[X_t\varepsilon_t]=E[\varepsilon_t^2]=\sigma_\varepsilon^2,
$$

従って

$$
\psi_0=1.
$$

#### Step 4：$n\to\infty$ でWold表現を得る

Step 1の式へStep 2とStep 3を入れると

$$
X_t
=P_{\mathcal H_{t-n}}X_t
+
\sum_{j=0}^{n-1}\psi_j\varepsilon_{t-j}.
$$

$n\to\infty$ とすると第1項は $X_t^{(d)}$ へ $L^2$ 収束するため

$$
X_t-X_t^{(d)}
=
L^2\text{-}\sum_{j=0}^\infty\psi_j\varepsilon_{t-j}.
$$

#### Step 5：係数はsquare summable

innovationは互いに直交し分散 $\sigma_\varepsilon^2$ が一定なので、有限和について

$$
\left\|
\sum_{j=0}^{n-1}\psi_j\varepsilon_{t-j}
\right\|_2^2
=
\sigma_\varepsilon^2
\sum_{j=0}^{n-1}\psi_j^2.
$$

左辺は $\|X_t-X_t^{(d)}\|_2^2$ へ収束するから

$$
\sigma_\varepsilon^2\sum_{j=0}^\infty\psi_j^2
=
\|X_t-X_t^{(d)}\|_2^2
<\infty.
$$

従って $\sum_j\psi_j^2<\infty$ です。

#### Step 6：deterministic componentとの直交性

$X_t^{(d)}\in\mathcal K\subset\mathcal H_{s-1}$ は全ての $s$ で成り立ちます。一方 $\varepsilon_s\perp\mathcal H_{s-1}$ なので

$$
X_t^{(d)}\perp\varepsilon_s
\qquad(\forall s,t).
$$

#### Step 7：innovation分散0の場合

$\sigma_\varepsilon^2=0$ なら $\varepsilon_t=0$ a.s. for all $t$ です。[one-step decomposition](#lem-f0-00ts1-one-step-orthogonal)から

$$
\mathcal H_t=\mathcal H_{t-1}
$$

が全ての $t$ で成り立ちます。従って全ての過去空間が同じで

$$
\mathcal H_t=\mathcal H_{-\infty}=\mathcal K.
$$

特に $X_t\in\mathcal K$ なので

$$
X_t^{(d)}=X_t.
$$

#### Step 8：一意性

$X_t^{(d)}$ は固定された閉部分空間 $\mathcal K$ への直交射影なので一意です。残差は互いに直交する1次元空間 $\mathcal E_{t-j}$ への射影の和なので各係数 $\psi_j$ も一意です。
<!-- proof-end -->

---

## 11. purely nondeterministicなら無限MAになる

<a id="cor-f0-00ts1-pnd-wold"></a>

<!-- formal-statement-start -->
> **系（purely nondeterministic Wold表現）**  
> Wold定理の仮定に加えて

$$
\mathcal H_{-\infty}=\{0\}
$$

> なら $X_t^{(d)}=0$ で

$$
\boxed{
X_t=\sum_{j=0}^\infty\psi_j\varepsilon_{t-j}
}
$$

> が $L^2$ で成り立ちます。
<!-- formal-statement-end -->

これは「非常に広い定常過程がinnovationの無限MAになる」というWoldの実務的な意味です。

---

## 12. 例：AR(1)はpurely nondeterministic

$$
X_t=\phi X_{t-1}+\varepsilon_t,
\qquad |\phi|<1
$$

とし、$\varepsilon_t$ を分散 $\sigma_\varepsilon^2>0$ のwhite noiseで過去と直交するinnovationとします。

反復すると

$$
X_t
=
\sum_{j=0}^{N-1}\phi^j\varepsilon_{t-j}
+\phi^N X_{t-N}.
$$

定常性から $\|X_{t-N}\|_2=\|X_t\|_2$ なので

$$
\|\phi^NX_{t-N}\|_2
=|\phi|^N\|X_t\|_2\to0.
$$

従って

$$
\boxed{
X_t
=
L^2\text{-}\sum_{j=0}^\infty\phi^j\varepsilon_{t-j}.
}
$$

さらに $Y\in\mathcal H_{-\infty}$ なら任意の $s$ で $Y\in\mathcal H_{s-1}$ だから $Y\perp\varepsilon_s$。一方全ての $X_t$ はinnovation全体の閉線形包に入るため、$Y$ は $\mathcal H$ 全体に直交し $Y=0$ です。従ってAR(1)はpurely nondeterministicで、Wold係数は

$$
\psi_j=\phi^j.
$$

---

## 13. 有限過去予測とYule--Walker

有限個

$$
X_{t-1},\dots,X_{t-p}
$$

だけを使い

$$
\widehat X_t
=a_1X_{t-1}+\cdots+a_pX_{t-p}
$$

とします。射影残差を各説明変数へ直交させると

$$
E[(X_t-\widehat X_t)X_{t-k}]=0
\qquad(k=1,\dots,p).
$$

従って

$$
\boxed{
\gamma(k)=\sum_{j=1}^pa_j\gamma(k-j),
\qquad k=1,\dots,p.
}
$$

ARモデルではこれがYule--Walker方程式になります。

---

## 14. E2-03への接続

Woldは「全ての定常過程が有限MA」という定理ではありません。

- 一般にはinnovationの **無限** MA
- deterministic componentを持つ場合はそれを別に足す
- ARMAはその中で有限個のパラメータに圧縮できる特別な構造

です。

したがってE2-03で扱う因果ARMA表現は、Woldの一般構造をさらに有限次元パラメータで記述できる場合だと理解できます。

---

# 15. 演習

## F0-00TS1-A01 white noiseのinnovationを確認する

- Level: A
- 目安時間: 10分

平均0・分散 $\sigma^2$ のwhite noise $X_t$ について

$$
P_{\mathcal H_{t-1}}X_t=0
$$

を示し、innovationを求めよ。

<!-- solution-start -->
### 詳細解答

$X_t$ は全ての $X_s$ $(s<t)$ と直交するので、その有限線形結合および $L^2$ 極限である $\mathcal H_{t-1}$ 全体と直交する。従って射影は0で

$$
\varepsilon_t=X_t.
$$

### 本番答案

white noiseの異時点無相関性から $X_t\perp\mathcal H_{t-1}$。よって射影0、innovationは $X_t$。

### 採点基準（20点）
- 過去との直交性：8点
- 閉包へ拡張：6点
- innovation：6点
<!-- solution-end -->

## F0-00TS1-A02 AR(1)の一段予測

- Level: A
- 目安時間: 12分

$$
X_t=\phi X_{t-1}+\varepsilon_t
$$

で $\varepsilon_t\perp\mathcal H_{t-1}$ とする。最良線形予測とinnovationを求めよ。

<!-- solution-start -->
### 詳細解答

$\phi X_{t-1}\in\mathcal H_{t-1}$ で残差 $\varepsilon_t$ は同空間に直交する。射影の一意性から

$$
P_{\mathcal H_{t-1}}X_t=\phi X_{t-1},
\qquad
X_t-P_{\mathcal H_{t-1}}X_t=\varepsilon_t.
$$

### 本番答案

モデル式自体が「過去空間の元＋過去に直交する残差」になっているため、射影は $\phi X_{t-1}$。

### 採点基準（20点）
- 過去空間への所属：6点
- 直交性：6点
- 射影とinnovation：8点
<!-- solution-end -->

## F0-00TS1-B01 減少射影補題を再現する

- Level: B
- 目安時間: 18分

$M_1\supset M_2\supset\cdots$ をHilbert空間の閉部分空間とし、$y_n=P_{M_n}x$ とする。$m>n$ に対して

$$
\|y_n-y_m\|^2=\|y_n\|^2-\|y_m\|^2
$$

を示し、$y_n\to P_{\cap M_n}x$ を導け。

<!-- solution-start -->
### 詳細解答

$M_m\subset M_n$ かつ $x-y_n\perp M_n$ なので $P_{M_m}x=P_{M_m}y_n=y_m$。従って $y_n-y_m\perp y_m$ でPythagorasから等式。$\|y_n\|$ は単調減少するためCauchy。極限が全 $M_n$ に属し、残差が共通部分へ直交することを確認すれば共通部分への射影となる。

### 本番答案

nested projectionのPythagorasでCauchyを示し、閉性と直交性で極限を同定する。

### 採点基準（20点）
- nested projection：7点
- Pythagoras：5点
- Cauchy：4点
- 極限同定：4点
<!-- solution-end -->

## F0-00TS1-B02 Wold係数のsquare summability

- Level: B
- 目安時間: 15分

Wold表現の有限部分和

$$
S_n=\sum_{j=0}^{n-1}\psi_j\varepsilon_{t-j}
$$

についてinnovationの直交性から

$$
\|S_n\|_2^2
=\sigma_\varepsilon^2\sum_{j=0}^{n-1}\psi_j^2
$$

を示し、$S_n\to X_t-X_t^{(d)}$ in $L^2$ なら $\sum_j\psi_j^2<\infty$ を導け。

<!-- solution-start -->
### 詳細解答

異なるinnovationの内積が0なので二乗ノルムのcross termは全て消える。各innovationの二乗ノルムは $\sigma_\varepsilon^2$ で一定。従って式を得る。左辺は有限値 $\|X_t-X_t^{(d)}\|_2^2$ へ収束し、$\sigma_\varepsilon^2>0$ なので係数二乗和は有限。

### 本番答案

直交級数のParseval型計算を有限和で行い、$L^2$ 極限のノルムへ移る。

### 採点基準（20点）
- cross term消失：7点
- 一定分散：5点
- 極限：4点
- square summability：4点
<!-- solution-end -->

## F0-00TS1-B03 AR(1)のWold表現

- Level: B
- 目安時間: 18分

$|\phi|<1$ の定常AR(1)

$$
X_t=\phi X_{t-1}+\varepsilon_t
$$

について

$$
X_t=\sum_{j=0}^\infty\phi^j\varepsilon_{t-j}
$$

が $L^2$ で成り立つことを示し、Wold係数を答えよ。

<!-- solution-start -->
### 詳細解答

$N$ 回反復して

$$
X_t=\sum_{j=0}^{N-1}\phi^j\varepsilon_{t-j}+\phi^NX_{t-N}.
$$

定常性から

$$
\|\phi^NX_{t-N}\|_2=|\phi|^N\|X_t\|_2\to0.
$$

従って $L^2$ 表現が得られ、$\psi_j=\phi^j$。

### 本番答案

再帰式を反復し、残差 $\phi^NX_{t-N}$ を $L^2$ ノルムで0へ送る。

### 採点基準（20点）
- 反復式：8点
- $L^2$ 残差評価：7点
- 係数：5点
<!-- solution-end -->

---

## 章末チェック

- 二次定常性を平均とlag共分散で定義できる。
- 過去の線形予測空間を閉部分空間として定義できる。
- 最良線形予測をHilbert射影として証明できる。
- innovationが一段で新しく加わる直交方向であることを示せる。
- stationarityから時間shiftがunitaryになることを証明できる。
- remote pastとpurely nondeterministicを定義・判定できる。
- 減少閉部分空間への射影収束を証明できる。
- Wold decompositionを有限直交分解の極限として証明できる。
- $\psi_0=1$ と $\sum_j\psi_j^2<\infty$ を導ける。
- AR(1)のWold係数を求められる。
- 条件付き期待値による予測と線形予測を区別できる。
