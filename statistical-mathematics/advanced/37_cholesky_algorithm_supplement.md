# 補足：Cholesky分解はどうやって求めるのか

[← Advanced 08「逐次残差化・独立化（Cholesky分解への接続）」に戻る](#/statistical-mathematics/advanced/37_cholesky_residualization)

## 0. このページで答える疑問

元の問題では、正定値行列 $\Sigma$ を

$$
\Sigma=LL^T
$$

と分解し、独立標準正規ベクトル $U\sim N_p(0,I_p)$ に対して

$$
X=\mu+LU
$$

とすれば

$$
X\sim N_p(\mu,\Sigma)
$$

となることを扱った。

しかし、ここで当然

> **では、その $L$ は実際にどうやって求めるのか？**

という疑問が残る。

結論から言えば、特別な魔法の公式を覚える必要はない。

**$L$ を未知の下三角行列として置き、$LL^T=\Sigma$ の成分を左上から順に一致させていけばよい。**

この「左上から順に解く」手順を一般化したものがCholesky分解のアルゴリズムである。

---

## 1. まず $2\times2$ で作ってみる

例として

$$
\Sigma=
\begin{pmatrix}
4&2\\
2&3
\end{pmatrix}
$$

を考える。

Cholesky因子を、対角成分が正の下三角行列

$$
L=
\begin{pmatrix}
\ell_{11}&0\\
\ell_{21}&\ell_{22}
\end{pmatrix},
\qquad
\ell_{11}>0,\ \ell_{22}>0
$$

と置く。

すると

$$
LL^T
=
\begin{pmatrix}
\ell_{11}&0\\
\ell_{21}&\ell_{22}
\end{pmatrix}
\begin{pmatrix}
\ell_{11}&\ell_{21}\\
0&\ell_{22}
\end{pmatrix}
$$

だから

$$
LL^T
=
\begin{pmatrix}
\ell_{11}^2&\ell_{11}\ell_{21}\\
\ell_{11}\ell_{21}&\ell_{21}^2+\ell_{22}^2
\end{pmatrix}.
$$

これを $\Sigma$ と比較する。

### Step 1：左上を合わせる

$$
\ell_{11}^2=4.
$$

対角成分は正と決めているので

$$
\boxed{\ell_{11}=2}.
$$

### Step 2：第1列の下を合わせる

$$
\ell_{11}\ell_{21}=2
$$

だから

$$
2\ell_{21}=2,
$$

したがって

$$
\boxed{\ell_{21}=1}.
$$

### Step 3：次の対角成分を合わせる

$$
\ell_{21}^2+\ell_{22}^2=3.
$$

すでに $\ell_{21}=1$ が分かっているので

$$
1+\ell_{22}^2=3.
$$

よって

$$
\boxed{\ell_{22}=\sqrt2}.
$$

したがって

$$
\boxed{
L=
\begin{pmatrix}
2&0\\
1&\sqrt2
\end{pmatrix}
}
$$

である。

実際、

$$
\begin{pmatrix}
2&0\\
1&\sqrt2
\end{pmatrix}
\begin{pmatrix}
2&1\\
0&\sqrt2
\end{pmatrix}
=
\begin{pmatrix}
4&2\\
2&3
\end{pmatrix}.
$$

ここで重要なのは、連立方程式を一気に解いたわけではないことである。

$$
\ell_{11}
\to
\ell_{21}
\to
\ell_{22}
$$

の順に、**すでに求めた値だけを使って次を求められた。**

これが下三角行列を使う利点であり、一般次元でも同じことを行う。

---

## 2. $3\times3$ では何が起こるか

次に

$$
\Sigma=
\begin{pmatrix}
4&2&2\\
2&5&-1\\
2&-1&6
\end{pmatrix}
$$

を考える。

$$
L=
\begin{pmatrix}
\ell_{11}&0&0\\
\ell_{21}&\ell_{22}&0\\
\ell_{31}&\ell_{32}&\ell_{33}
\end{pmatrix}
$$

と置く。

$LL^T$ の各成分をすべて一度に展開してもよいが、必要なものだけ順に見た方が構造が分かりやすい。

### 2.1 第1列

$(1,1)$ 成分から

$$
\ell_{11}^2=4
$$

なので

$$
\boxed{\ell_{11}=2}.
$$

$(2,1)$ 成分から

$$
\ell_{21}\ell_{11}=2
$$

なので

$$
\boxed{\ell_{21}=1}.
$$

$(3,1)$ 成分から

$$
\ell_{31}\ell_{11}=2
$$

なので

$$
\boxed{\ell_{31}=1}.
$$

ここまでで第1列が決まった。

### 2.2 第2列

$(2,2)$ 成分は

$$
\ell_{21}^2+\ell_{22}^2=5.
$$

したがって

$$
1+\ell_{22}^2=5
$$

より

$$
\boxed{\ell_{22}=2}.
$$

次に $(3,2)$ 成分を見る。

$$
\ell_{31}\ell_{21}+\ell_{32}\ell_{22}=-1.
$$

既知の値を代入すると

$$
1\cdot1+2\ell_{32}=-1,
$$

よって

$$
\boxed{\ell_{32}=-1}.
$$

### 2.3 第3列

最後に $(3,3)$ 成分から

$$
\ell_{31}^2+\ell_{32}^2+\ell_{33}^2=6.
$$

したがって

$$
1^2+(-1)^2+\ell_{33}^2=6,
$$

よって

$$
\boxed{\ell_{33}=2}.
$$

以上から

$$
\boxed{
L=
\begin{pmatrix}
2&0&0\\
1&2&0\\
1&-1&2
\end{pmatrix}
}.
$$

実際、$LL^T=\Sigma$ になる。

ここでも計算順序は

$$
\boxed{
\text{第1列}
\to
\text{第2列}
\to
\text{第3列}
}
$$

である。

---

## 3. 一般の $p\times p$ 行列ではどうなるか

$\Sigma=(\sigma_{ij})$ を実対称正定値行列とし、

$$
L=(\ell_{ij})
$$

を下三角行列とする。

$$
\Sigma=LL^T
$$

なら、$(i,j)$ 成分について

$$
\sigma_{ij}
=
(LL^T)_{ij}
=
\sum_{k=1}^{\min(i,j)}\ell_{ik}\ell_{jk}.
$$

この1本の式から、Cholesky分解の計算式がすべて出る。

### 3.1 対角成分

$i=j$ とすると

$$
\sigma_{ii}
=
\sum_{k=1}^{i}\ell_{ik}^2
=
\sum_{k=1}^{i-1}\ell_{ik}^2+\ell_{ii}^2.
$$

したがって

$$
\ell_{ii}^2
=
\sigma_{ii}
-
\sum_{k=1}^{i-1}\ell_{ik}^2.
$$

対角成分を正に取るので

$$
\boxed{
\ell_{ii}
=
\sqrt{
\sigma_{ii}
-
\sum_{k=1}^{i-1}\ell_{ik}^2
}
}.
$$

### 3.2 対角より下の成分

$i>j$ とする。

このとき

$$
\sigma_{ij}
=
\sum_{k=1}^{j}\ell_{ik}\ell_{jk}.
$$

最後の項だけ分けると

$$
\sigma_{ij}
=
\sum_{k=1}^{j-1}\ell_{ik}\ell_{jk}
+
\ell_{ij}\ell_{jj}.
$$

したがって

$$
\ell_{ij}\ell_{jj}
=
\sigma_{ij}
-
\sum_{k=1}^{j-1}\ell_{ik}\ell_{jk},
$$

よって

$$
\boxed{
\ell_{ij}
=
\frac{
\sigma_{ij}
-
\displaystyle\sum_{k=1}^{j-1}\ell_{ik}\ell_{jk}
}{\ell_{jj}}
\qquad(i>j)
}.
$$

この2式がCholesky分解の基本アルゴリズムである。

ただし、**試験対策としてこの式を丸暗記する必要はない。**

忘れた場合でも

$$
\Sigma=LL^T
$$

と置き、2次元・3次元で行ったように成分比較すれば再構成できる。

---

## 4. 実際の計算順序

列 $j=1,2,\ldots,p$ について、次の順に計算する。

1. まず対角成分 $\ell_{jj}$ を求める。
2. その下にある $\ell_{j+1,j},\ldots,\ell_{p,j}$ を求める。
3. 次の列へ進む。

すなわち概念的には

$$
\boxed{
\begin{array}{cccc}
\ell_{11}\\
\downarrow\\
\ell_{21},\ell_{31},\ldots\\
\downarrow\\
\ell_{22}\\
\downarrow\\
\ell_{32},\ell_{42},\ldots\\
\downarrow\\
\ell_{33}\\
\downarrow\\
\cdots
\end{array}
}
$$

という順序である。

擬似コードで書けば次のようになる。

```text
for j = 1,...,p:
    l[j,j] = sqrt(
        sigma[j,j] - sum_{k=1}^{j-1} l[j,k]^2
    )

    for i = j+1,...,p:
        l[i,j] = (
            sigma[i,j]
            - sum_{k=1}^{j-1} l[i,k] l[j,k]
        ) / l[j,j]
```

上三角部分はすべて0である。

---

## 5. なぜ平方根の中身が負にならないのか

対角成分の計算では

$$
\sigma_{ii}-\sum_{k=1}^{i-1}\ell_{ik}^2
$$

の平方根を取っている。

「これが負になったらどうするのか？」という疑問が自然に出る。

ここで **正定値性** が効く。

$\Sigma$ が実対称正定値、すなわち任意の $x\neq0$ に対して

$$
x^T\Sigma x>0
$$

であれば、Cholesky分解の各段階で現れる対角成分の平方根の中身は正になり、

$$
\ell_{jj}>0
$$

として最後まで計算できる。

逆に、途中で理論上負の値が出たなら、その行列は正定値ではない。

統計では分散共分散行列は少なくとも半正定値だが、変数間に完全な線形従属があると特異になり、正定値ではなくなることがある。

例えば

$$
\Sigma=
\begin{pmatrix}
1&1\\
1&1
\end{pmatrix}
$$

では、第1段階で

$$
\ell_{11}=1,
\qquad
\ell_{21}=1
$$

となるが、次に

$$
\ell_{22}
=
\sqrt{1-1^2}
=0
$$

となる。

これは

$$
X_2=X_1
$$

のような完全な線形従属を許す共分散構造で、通常の「対角成分がすべて正」のCholesky分解の前提から外れる。

統計検定1級の通常の手計算問題では、まず **正定値行列に対するCholesky分解** を理解すれば十分である。

---

## 6. 元の逐次残差化と何が同じなのか

元の問題では、相関した正規ベクトル $X$ から

$$
Z=L^{-1}X
$$

に相当する変換を行い、独立標準正規ベクトルへ戻した。

一方、このページでは

$$
X=LZ
$$

を作るための $L$ 自体を計算した。

したがって関係は

$$
\boxed{
\begin{array}{ccc}
Z\sim N_p(0,I_p)
&\xrightarrow{\quad L\quad}&
X\sim N_p(0,\Sigma)\\[4pt]
&&\\[-8pt]
\text{独立}
&&
\text{相関あり}
\end{array}
}
$$

であり、逆向きには

$$
\boxed{
X\xrightarrow{\quad L^{-1}\quad}Z
}
$$

となる。

Cholesky分解は単なる行列計算の技法ではなく、統計的には

> **独立な成分を、所望の共分散構造をもつ成分へ組み合わせるための係数を作る操作**

と見ることができる。

---

## 7. 乱数生成まで通して見る

例えば

$$
\Sigma=
\begin{pmatrix}
4&2\\
2&3
\end{pmatrix}
$$

に対して先ほど

$$
L=
\begin{pmatrix}
2&0\\
1&\sqrt2
\end{pmatrix}
$$

を得た。

独立な標準正規乱数

$$
U_1,U_2\overset{\mathrm{iid}}\sim N(0,1)
$$

を生成し、

$$
\begin{pmatrix}
X_1\\
X_2
\end{pmatrix}
=
\begin{pmatrix}
2&0\\
1&\sqrt2
\end{pmatrix}
\begin{pmatrix}
U_1\\
U_2
\end{pmatrix}
$$

とすれば

$$
X_1=2U_1,
$$

$$
X_2=U_1+\sqrt2\,U_2.
$$

ここから直接

$$
\operatorname{Var}(X_1)=4,
$$

$$
\operatorname{Var}(X_2)=1+2=3,
$$

$$
\operatorname{Cov}(X_1,X_2)
=\operatorname{Cov}(2U_1,U_1+\sqrt2U_2)
=2
$$

と確認できる。

したがって

$$
\operatorname{Cov}
\begin{pmatrix}
X_1\\X_2
\end{pmatrix}
=
\begin{pmatrix}
4&2\\
2&3
\end{pmatrix}
=\Sigma.
$$

つまり実装上は

$$
\boxed{
\Sigma
\xrightarrow{\text{Cholesky分解}}
L
\xrightarrow{\;U\sim N(0,I)\;}
X=\mu+LU
}
$$

という流れになる。

---

## 8. 実務上の注意

数学としては上の手順で十分だが、数値計算では通常、自分でこのループを書くのではなく線形代数ライブラリのCholesky分解を使う。

特に注意する点は次の3つである。

- 入力行列は理論上、対称正定値である必要がある。
- 浮動小数点誤差で $\Sigma$ と $\Sigma^T$ がわずかにずれることがある。
- 「jitter」として $\Sigma+\varepsilon I$ を使う処理もあるが、これは元の分散共分散行列をわずかに変更しているので、数学的に同一の問題ではない。

また、連立方程式を解く目的なら、Cholesky分解後に明示的な逆行列 $L^{-1}$ を作る必要はない。下三角連立方程式を前進代入で解く方が通常は自然である。

このあたりは統計検定1級の手計算範囲を超えるが、実装時には重要になる。

---

## 9. 1級対策としてどこまで押さえるか

### 必須

- Cholesky分解が
  $$
  \Sigma=LL^T
  $$
  という形であること。
- $L$ は下三角行列で、正定値なら対角成分を正に取れること。
- 小さい行列なら $L$ を未知数で置き、成分比較から計算できること。
- $U\sim N_p(0,I_p)$ に対して
  $$
  X=\mu+LU
  $$
  とすれば
  $$
  X\sim N_p(\mu,\Sigma)
  $$
  となること。

### 理解しておくとよい

- 一般式
  $$
  \ell_{ii}
  =
  \sqrt{
  \sigma_{ii}-\sum_{k=1}^{i-1}\ell_{ik}^2
  }
  $$
  および
  $$
  \ell_{ij}
  =
  \frac{
  \sigma_{ij}-\sum_{k=1}^{j-1}\ell_{ik}\ell_{jk}
  }{\ell_{jj}}
  \quad(i>j)
  $$
  が、単なる $LL^T=\Sigma$ の成分比較から出ていること。

### 暗記不要

- 一般次元のアルゴリズムをコードのように丸暗記すること。
- 数値線形代数上の高速化やブロックCholesky法。
- pivoted Choleskyなど、半正定値・低ランク行列向けの発展的手法。

---

## 10. 最短まとめ

Cholesky分解を「どう実現するのか？」への答えは、実はかなり素朴である。

$$
\boxed{
L\text{ を下三角行列として置き、}
LL^T=\Sigma
\text{ を左上から順に解く}
}
$$

その結果、

$$
\boxed{
\ell_{ii}
=
\sqrt{\sigma_{ii}-\sum_{k<i}\ell_{ik}^2}
}
$$

と

$$
\boxed{
\ell_{ij}
=
\frac{\sigma_{ij}-\sum_{k<j}\ell_{ik}\ell_{jk}}
{\ell_{jj}}
\quad(i>j)
}
$$

が得られる。

そして統計では、この $L$ を使って

$$
\boxed{X=\mu+LU}
$$

とすることで、独立標準正規乱数から指定した分散共分散行列をもつ多変量正規乱数を構成できる。

[← Advanced 08「逐次残差化・独立化（Cholesky分解への接続）」に戻る](#/statistical-mathematics/advanced/37_cholesky_residualization)
