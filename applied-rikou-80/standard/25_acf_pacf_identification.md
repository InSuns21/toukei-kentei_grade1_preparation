# Standard 25 ACF/PACFによるAR・MA識別

- 安定ID: `RIKOU-STANDARD-25`
- 80大問 No.: 25
- 演習価値: A
- 難度: B
- 目安時間: 20〜25分

## 問題

弱定常時系列について次の理論的特徴を考える。

- 系列A: ACFが幾何減衰し、PACFはラグ1より後で0。
- 系列B: ACFはラグ1でのみ非0、PACFは徐々に減衰。
- 系列C: ACF・PACFとも徐々に減衰。

1. A,B,Cの候補モデルをAR(1), MA(1), ARMAから選べ。
2. 因果的AR(1)

$$
X_t=\phi X_{t-1}+\varepsilon_t,
\qquad |\phi|<1
$$

で、$\varepsilon_t$ が平均0の白色雑音かつ過去と無相関とする。Yule–Walker方程式からACFが $\rho(h)=\phi^h$ となる理由を示せ。
3. MA(1)

$$
X_t=\varepsilon_t+\theta\varepsilon_{t-1}
$$

で、白色雑音 $\varepsilon_t$ を仮定する。ラグ2以降のACFが0になる理由を示せ。
4. $\rho(1)=0.4$, $\rho(h)=0$ ($h\ge2$) のMA(1)について、$\rho(1)=\theta/(1+\theta^2)$ から可逆解 $\theta$ を求める二次方程式を書け。根の数値化は不要。
5. 標本ACF/PACFだけでモデル次数を断定できない理由を述べ、赤池情報量規準と残差診断を組み合わせる流れを説明せよ。

## 詳細解答

### 1. 理論ACF/PACFによる候補識別

理論的には

- A: AR(1)
- B: MA(1)
- C: ARMA候補

である。AR($p$) の理論PACFがラグ $p$ で打ち切られ、MA($q$) の理論ACFがラグ $q$ で打ち切られる、という識別則を使っている。これは定常なAR/MAモデルの**理論**ACF/PACFに関する性質であり、有限標本の標本ACF/PACFが厳密に0になるという意味ではない。

### 2. AR(1)とYule–Walker

使うのは **Yule–Walker方程式**である。本問では $|\phi|<1$ により因果的な弱定常AR(1)が存在し、白色雑音 $\varepsilon_t$ は過去 $X_{t-h}$、$h\ge1$ と無相関である。

$h\ge1$ についてモデル式に $X_{t-h}$ を掛け期待値を取ると

$$
\begin{aligned}
\gamma(h)
&=Cov(X_t,X_{t-h})\\
&=\phi Cov(X_{t-1},X_{t-h})
+Cov(\varepsilon_t,X_{t-h})\\
&=\phi\gamma(h-1).
\end{aligned}
$$

最後の項が0になるのが「イノベーションが過去と無相関」という条件である。従って反復して

$$
\gamma(h)=\phi^h\gamma(0),
$$

$$
\boxed{\rho(h)=\phi^h}.
$$

### 3. MA(1)のACF打ち切り

$$
X_t=\varepsilon_t+\theta\varepsilon_{t-1}.
$$

白色雑音は異なる時点で無相関なので、$h\ge2$ では $X_t$ と $X_{t-h}$ に共通するイノベーションがない。実際

$$
\begin{aligned}
\gamma(h)
&=Cov(\varepsilon_t+\theta\varepsilon_{t-1},
\varepsilon_{t-h}+\theta\varepsilon_{t-h-1})\\
&=0,
\qquad h\ge2.
\end{aligned}
$$

従って

$$
\boxed{\rho(h)=0\quad(h\ge2)}.
$$

### 4. MA係数と可逆性

MA(1)では

$$
\gamma(0)=\sigma_\varepsilon^2(1+\theta^2),
\qquad
\gamma(1)=\theta\sigma_\varepsilon^2,
$$

だから

$$
\rho(1)=\frac{\theta}{1+\theta^2}.
$$

$\rho(1)=0.4$ を代入すると

$$
0.4(1+\theta^2)=\theta,
$$

すなわち

$$
2\theta^2-5\theta+2=0.
$$

根は $\theta=1/2,2$。この2根は同じACFを与えるため、係数を一意に識別するには **MA(1)の可逆条件**

$$
|\theta|<1
$$

を課す。従って

$$
\boxed{\theta=1/2}.
$$

### 5. 有限標本での注意

理論ACF/PACFの打ち切りは母集団の性質であり、標本ACF/PACFには標本変動がある。そのためグラフだけで次数を断定せず、ACF/PACFで候補を作り、赤池情報量規準等でモデル比較し、残差ACFやLjung–Box型診断などで残差が白色雑音的か確認する。

## 本番答案

A=AR(1), B=MA(1), C=ARMA候補。

AR(1)では $|\phi|<1$ の定常性と、イノベーションが過去と無相関という条件の下で **Yule–Walker方程式**

$$
\gamma(h)=\phi\gamma(h-1)
$$

を使え、$\rho(h)=\phi^h$。MA(1)は $h\ge2$ で共有イノベーションがないのでACFが0。

$\rho_1=0.4$ では

$$
2\theta^2-5\theta+2=0,
$$

根 $1/2,2$ のうち **可逆条件** $|\theta|<1$ から $\theta=1/2$。有限標本では標本ACF/PACFは厳密に打ち切れないので赤池情報量規準・残差診断を併用する。

## 採点基準

- モデル識別: 5点
- Yule–Walker名・定常性・過去との無相関条件: 6点
- MA係数同定・可逆条件: 5点
- 標本変動・選択手順: 4点

20分経過時は $|\phi|<1$、Yule–Walker、$|\theta|<1$ の3条件を必ず残す。
