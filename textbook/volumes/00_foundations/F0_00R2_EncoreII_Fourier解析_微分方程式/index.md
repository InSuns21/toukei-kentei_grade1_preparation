# F0-00R2 Encore II：Fourier Analysis & Differential Equations

このページは、F0系列からさらにFourier解析・微分方程式へ進む任意の発展補講ルートです。

通常カリキュラム、確率論「それどこから来た？」系列、関数解析・RKHS系列のどれにも **必須ではありません**。ただし一度入場した場合は、未定義の主要概念を外部教科書へ取りに行かず、次の順で最後まで進むことを設計基準にします。

---

## 1. 推奨通読ルート

```text
F0-00F   線形写像・スペクトル定理・SVD
F0-00D2  Lebesgue積分・Lp
F0-00E2  Cauchy--Schwarz・Bessel・Parseval
F0-02C1  Banach / Hilbert
   │
   └── Encore II START
          ↓
F0-00H1   常微分方程式・線形系・行列指数
          ↓
F0-00FA1  Fourier級数・直交展開
          ↓
F0-00FA2  Fourier変換・畳み込み・反転
          ↓
F0-00FA3  Plancherel・L2 Fourier変換・特性関数
          ↓
F0-00PDE1 熱方程式・Gaussian heat kernel
          ↓
F0-00PDE2 波動方程式・Laplace方程式・変数分離
          ↓
F0-00PDE3 Sturm--Liouville・自己共役性・スペクトル展開
```

---

## 2. ODEを先に置く理由

Fourier変換でPDEを解くと、空間微分が周波数の掛け算へ変わり、時間だけのODEが残ります。

熱方程式なら

$$
\partial_t\widehat u=-\kappa\xi^2\widehat u,
$$

波動方程式なら

$$
\partial_{tt}\widehat u+c^2\xi^2\widehat u=0.
$$

そこでH1で指数成長・減衰、調和振動子、行列指数、固有値と安定性を先に準備します。

---

## 3. Fourier級数はHilbert空間の具体例

FA1では三角関数系を $L^2(-\pi,\pi)$ の正規直交系として扱います。Fourier係数は正規直交方向への内積係数であり、Bessel・ParsevalはF0-00E2の抽象論をそのまま使います。

---

## 4. Fourier変換は連続スペクトル版

FA2では

$$
\widehat f(\xi)=\int_{\mathbb R}f(x)e^{-i\xi x}\,dx
$$

を導入し、

$$
\boxed{\widehat{f*g}=\widehat f\,\widehat g},
\qquad
\boxed{\widehat{f'}=i\xi\widehat f}
$$

を扱います。

一方は確率論の独立和、もう一方は微分方程式へつながります。

---

## 5. Plancherelで関数解析と合流する

FA3ではFourier変換を $L^2(\mathbb R)$ へ拡張し、正規化すれば

$$
\|\mathcal Ff\|_2=\|f\|_2
$$

となることを扱います。Fourier変換はHilbert空間上のunitary operatorとして読めます。

---

## 6. 特性関数へ戻る

確率論補講P6の

$$
\varphi_X(t)=E[e^{itX}]
$$

は確率測度のFourier変換です。

したがって独立和で特性関数が積になることは畳み込み定理そのものです。CLTは大量の畳み込みと再尺度化をFourier空間で解析する定理として読めます。

---

## 7. 熱方程式でGaussianが再登場する

PDE1では

$$
\partial_tu=\kappa\partial_{xx}u
$$

をFourier変換して

$$
\widehat u(t,\xi)=e^{-\kappa t\xi^2}\widehat u_0(\xi)
$$

を得ます。逆変換するとGaussian heat kernel

$$
G_t(x)=\frac1{\sqrt{4\pi\kappa t}}\exp\left(-\frac{x^2}{4\kappa t}\right)
$$

が現れ、正規分布・特性関数・CLT・Brown運動が同じFourier構造へ集まります。

---

## 8. 波動・Laplaceで変数分離を学ぶ

PDE2では $u(t,x)=T(t)X(x)$ と置き、固定端境界条件から

$$
-X''=\lambda X
$$

という固有値問題を導きます。Fourier正弦級数がPDEの固有モード展開として再登場します。

---

## 9. Sturm--Liouvilleでまとめる

PDE3では

$$
-\frac d{dx}(py')+qy=\lambda wy
$$

を扱い、重み付きL2内積、自己共役性、固有関数の直交性、固有関数展開を整理します。Fourier正弦・余弦級数はその特殊例です。

---

## 10. Encore IIの停止線

Encore IIは古典的Fourier法・古典解・Sturm--Liouvilleまでで閉じます。

従来ここで将来候補としていた

- Schwartz超関数
- 弱微分
- Sobolev空間
- 弱解
- Lax--Milgram

は、現在 **Encore III** として独立系列化しました。Encore IIの必須前提には逆流させません。

Encore IIIへ進む場合は [F0-00R3 Encore III：Distributions, Sobolev Spaces & Weak Solutions](../F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md) を入口にしてください。

---

## 11. 所要時間

Encore II本編は読解・小演習・復習込みで概ね

$$
\boxed{30\text{ 時間前後}}
$$

です。統計検定1級の必須学習時間には含めません。

---

## 12. 最終的な景色

```text
線形代数
   ↓
Hilbert空間
   ↓
Fourier解析 ───→ 特性関数 ───→ CLT
   ↓
微分作用素
   ↓
熱・波動・Laplace方程式
   ↓
Sturm--Liouville
   │
   └──→ Encore III：超関数・Sobolev・弱解
```

**Encore II: Fourier Analysis & Differential Equations** はここまでです。
