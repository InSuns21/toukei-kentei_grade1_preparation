# Core 03 Gauss–Markov定理とBLUE

- 安定ID: `RIKOU-CORE-03`
- 80大問 No.: 32
- 演習価値: S
- 難度: A
- 目安時間: 25分

## 問題

線形モデル

$$
y=X\beta+\varepsilon,\qquad E[\varepsilon]=0,\qquad \operatorname{Var}(\varepsilon)=\sigma^2I_n
$$

を考える。正規性は仮定しない。$X$ は列フルランクとする。

1. OLS推定量 $\hat\beta=(X^\top X)^{-1}X^\top y$ が線形不偏であることを示せ。
2. 任意の線形不偏推定量 $\tilde\beta=Ay$ に対して $AX=I_p$ が必要十分であることを示せ。
3. $A=A_0+D$, $A_0=(X^\top X)^{-1}X^\top$ とおき、$DX=0$ を示せ。
4. $\operatorname{Var}(\tilde\beta)-\operatorname{Var}(\hat\beta)$ が半正定値であることを示し、Gauss–Markov定理を述べよ。
5. $c^\top\beta$ の線形不偏推定について何が言えるか。

## 詳細解答

### 1. OLSの不偏性

$\hat\beta=A_0y$ は $y$ の線形関数である。また

$$
E[\hat\beta]=A_0X\beta=(X^\top X)^{-1}X^\top X\beta=\beta.
$$

### 2. 線形不偏の条件

$E[Ay]=AX\beta$。これがすべての $\beta$ について $\beta$ に等しいための必要十分条件は

$$
\boxed{AX=I_p}.
$$

### 3. 差の構造

$A_0X=I_p$ なので

$$
DX=(A-A_0)X=I_p-I_p=0.
$$

さらに $A_0D^\top=(X^\top X)^{-1}X^\top D^\top=0$。これは $DX=0$ の転置から $X^\top D^\top=0$ だからである。

### 4. 分散比較

$$
\operatorname{Var}(\tilde\beta)=\sigma^2AA^\top
=\sigma^2(A_0+D)(A_0+D)^\top.
$$

交差項は0だから

$$
\operatorname{Var}(\tilde\beta)
=\sigma^2A_0A_0^\top+\sigma^2DD^\top.
$$

一方

$$
\operatorname{Var}(\hat\beta)=\sigma^2A_0A_0^\top=\sigma^2(X^\top X)^{-1}.
$$

よって

$$
\boxed{\operatorname{Var}(\tilde\beta)-\operatorname{Var}(\hat\beta)=\sigma^2DD^\top\succeq0}.
$$

したがって OLS はすべての線形不偏推定量の中で分散共分散行列が最小、すなわち BLUE である。

### 5. 線形関数

$c^\top\hat\beta$ は $c^\top\beta$ の線形不偏推定量であり、任意の線形不偏推定量の中で分散最小である。

## 本番答案

$A_0=(X^\top X)^{-1}X^\top$ とすると $A_0X=I$ なので OLS は線形不偏。任意の線形不偏推定量 $Ay$ は $AX=I$ を満たす。$D=A-A_0$ とおけば $DX=0$ であり、したがって $A_0D^\top=0$。よって

$$
\operatorname{Var}(Ay)-\operatorname{Var}(A_0y)
=\sigma^2DD^\top\succeq0.
$$

ゆえに OLS は BLUE。特に $c^\top\hat\beta$ は $c^\top\beta$ の最良線形不偏推定量である。

## 採点基準

- (1)(2) 線形不偏条件: 5点
- (3) $DX=0$ と交差項消失: 5点
- (4) 半正定値差とBLUE: 8点
- (5) 線形関数への帰結: 2点

25分経過時は「$D=A-A_0$, $DX=0$, 分散差 $=\sigma^2DD^\top$」の3行を必ず残す。
