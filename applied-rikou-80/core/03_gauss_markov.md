# Core 03 ガウス・マルコフ定理と最良線形不偏推定量

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

1. 通常最小二乗法推定量 $\hat\beta=(X^\top X)^{-1}X^\top y$ が線形不偏であることを示せ。
2. 任意の線形不偏推定量 $\tilde\beta=Ay$ に対して $AX=I_p$ が必要十分であることを示せ。
3. $A=A_0+D$, $A_0=(X^\top X)^{-1}X^\top$ とおき、$DX=0$ を示せ。
4. $\operatorname{Var}(\tilde\beta)-\operatorname{Var}(\hat\beta)$ が半正定値であることを、任意のベクトル $c$ に対する分散比較まで書いて示せ。その結果としてガウス・マルコフ定理を述べよ。
5. $c^\top\beta$ の線形不偏推定について何が言えるか。

## 詳細解答

### 1. 通常最小二乗法の不偏性

$$
A_0=(X^\top X)^{-1}X^\top
$$

とおけば

$$
\hat\beta=A_0y
$$

なので、$\hat\beta$ は観測ベクトル $y$ の線形関数である。

また

$$
\begin{aligned}
E[\hat\beta]
&=A_0E[y]\\
&=A_0X\beta\\
&=(X^\top X)^{-1}X^\top X\beta\\
&=\beta.
\end{aligned}
$$

したがって

$$
\boxed{\hat\beta\text{ は線形不偏推定量}}
$$

である。

ここで $X$ が列フルランクなので $X^\top X$ は可逆であることを使った。

---

### 2. 一般の線形不偏推定量の条件

任意の行列 $A$ に対して

$$
\tilde\beta=Ay
$$

とする。

その期待値は

$$
E[\tilde\beta]
=AE[y]
=AX\beta.
$$

これが**すべての** $\beta$ について $\beta$ に等しいためには

$$
AX\beta=\beta
$$

が全ての $\beta$ で成り立たなければならない。

これは

$$
\boxed{AX=I_p}
$$

と同値である。

逆に $AX=I_p$ なら

$$
E[Ay]=AX\beta=\beta
$$

なので不偏である。従って $AX=I_p$ は必要十分条件である。

---

### 3. 通常最小二乗法との差を書く

通常最小二乗法に対応する行列は

$$
A_0=(X^\top X)^{-1}X^\top.
$$

第1問より

$$
A_0X=I_p.
$$

任意の線形不偏推定量 $Ay$ も第2問より

$$
AX=I_p.
$$

そこで

$$
D=A-A_0
$$

とおくと

$$
\begin{aligned}
DX
&=(A-A_0)X\\
&=AX-A_0X\\
&=I_p-I_p\\
&=0.
\end{aligned}
$$

従って

$$
\boxed{DX=0}.
$$

さらに転置して

$$
X^\top D^\top=0.
$$

したがって

$$
\begin{aligned}
A_0D^\top
&=(X^\top X)^{-1}X^\top D^\top\\
&=0.
\end{aligned}
$$

同様に

$$
DA_0^\top=0.
$$

この交差項の消失がガウス・マルコフ証明の核心である。

---

### 4. 分散共分散行列を比較する

誤差共分散が

$$
\operatorname{Var}(\varepsilon)=\sigma^2I_n
$$

なので

$$
\operatorname{Var}(y)=\sigma^2I_n.
$$

したがって

$$
\begin{aligned}
\operatorname{Var}(\tilde\beta)
&=A\operatorname{Var}(y)A^\top\\
&=\sigma^2AA^\top.
\end{aligned}
$$

$A=A_0+D$ を代入すると

$$
\begin{aligned}
AA^\top
&=(A_0+D)(A_0+D)^\top\\
&=A_0A_0^\top
+A_0D^\top
+DA_0^\top
+DD^\top.
\end{aligned}
$$

第3問で交差項は0と示したので

$$
\operatorname{Var}(\tilde\beta)
=\sigma^2A_0A_0^\top+\sigma^2DD^\top.
$$

一方

$$
\begin{aligned}
\operatorname{Var}(\hat\beta)
&=\sigma^2A_0A_0^\top\\
&=\sigma^2(X^\top X)^{-1}.
\end{aligned}
$$

従って

$$
\boxed{
\operatorname{Var}(\tilde\beta)
-
\operatorname{Var}(\hat\beta)
=\sigma^2DD^\top
}.
$$

#### 「半正定値」とは何を意味するか

対称行列 $B$ が半正定値であるとは、任意のベクトル $c$ に対して

$$
c^\top Bc\ge0
$$

となることをいう。

本問の差行列について

$$
\begin{aligned}
c^\top(\sigma^2DD^\top)c
&=\sigma^2c^\top DD^\top c\\
&=\sigma^2(D^\top c)^\top(D^\top c)\\
&=\sigma^2\|D^\top c\|^2\\
&\ge0.
\end{aligned}
$$

従って

$$
\boxed{\sigma^2DD^\top\succeq0}.
$$

この行列不等式の統計的意味も確認する。

任意の係数ベクトル $c$ に対し

$$
\begin{aligned}
&\operatorname{Var}(c^\top\tilde\beta)
-
\operatorname{Var}(c^\top\hat\beta)\\
&\qquad
=c^\top\left\{
\operatorname{Var}(\tilde\beta)-\operatorname{Var}(\hat\beta)
\right\}c\\
&\qquad
=\sigma^2\|D^\top c\|^2\\
&\qquad\ge0.
\end{aligned}
$$

つまり「分散共分散行列が小さい」とは、各成分の分散だけを比較しているのではなく、**どんな線形結合 $c^\top\beta$ を取り出しても通常最小二乗法の分散がそれ以上大きくならない**という意味である。

これがガウス・マルコフ定理である。

> $E[\varepsilon]=0$, $\operatorname{Var}(\varepsilon)=\sigma^2I$、かつ $X$ が列フルランクなら、通常最小二乗法推定量 $\hat\beta$ は全ての線形不偏推定量の中で最良、すなわち各線形結合について分散最小である。

この結論に誤差の正規性は必要ない。

---

### 5. 線形関数 $c^\top\beta$ への帰結

$c^\top\hat\beta$ は $y$ の線形関数であり

$$
E[c^\top\hat\beta]
=c^\top E[\hat\beta]
=c^\top\beta
$$

なので $c^\top\beta$ の線形不偏推定量である。

さらに第4問で任意の $c$ に対して

$$
\operatorname{Var}(c^\top\tilde\beta)
\ge
\operatorname{Var}(c^\top\hat\beta)
$$

を示した。

従って

$$
\boxed{
c^\top\hat\beta
\text{ は }c^\top\beta\text{ の最良線形不偏推定量}
}.
$$

## 何を覚えるか

証明を丸暗記するより

$$
\boxed{
A=A_0+D,
\qquad
AX=A_0X=I
\Longrightarrow
DX=0
}
$$

から交差項が消え、

$$
\boxed{
\operatorname{Var}(Ay)-\operatorname{Var}(A_0y)
=\sigma^2DD^\top\succeq0
}
$$

になる流れを覚える。

## 本番答案

$$
A_0=(X^\top X)^{-1}X^\top
$$

とすると

$$
A_0X=I,
$$

なので $\hat\beta=A_0y$ は線形不偏。

任意の線形不偏推定量 $Ay$ は

$$
AX=I
$$

を満たす。$D=A-A_0$ とおけば

$$
DX=0,
$$

従って

$$
A_0D^\top=DA_0^\top=0.
$$

よって

$$
\operatorname{Var}(Ay)-\operatorname{Var}(A_0y)
=\sigma^2DD^\top.
$$

任意の $c$ に対して

$$
c^\top\sigma^2DD^\top c
=\sigma^2\|D^\top c\|^2\ge0
$$

なので差は半正定値。従って通常最小二乗法は最良線形不偏推定量で、特に $c^\top\hat\beta$ は $c^\top\beta$ の線形不偏推定量の中で分散最小である。正規性は不要。

## 採点基準

- (1)(2) 線形不偏条件: 5点
- (3) $DX=0$ と交差項消失: 5点
- (4) 分散差 $\sigma^2DD^\top$: 4点
- (4) 半正定値を $c^\top Bc\ge0$ で確認し分散比較へ接続: 4点
- (5) 線形関数への帰結: 2点

25分経過時は

$$
D=A-A_0,
\quad
DX=0,
\quad
\operatorname{Var}(Ay)-\operatorname{Var}(A_0y)=\sigma^2DD^\top
$$

の3行と

$$
c^\top DD^\top c=\|D^\top c\|^2\ge0
$$

を残す。
