# 9.9 正定値・半正定値

実対称行列 $A$ に対して

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x>0
\qquad(\boldsymbol x\ne\boldsymbol0)
$$

が常に成り立つとき、$A$ を **正定値** といいます。また

$$
\boldsymbol x^{\mathsf T}A\boldsymbol x\ge0
$$

が常に成り立つとき、$A$ を **半正定値** といいます。

統計では、分散共分散行列は半正定値、回帰や最適化で現れる $X^{\mathsf T}X$ やヘッセ行列は条件の下で正定値、という形で頻出します。

## 1. 判定法は目的に応じて選ぶ

手計算では、次の3通りを使い分けます。

### 方法A：二次形式を直接展開・平方完成する

2変数なら最も意味が見えやすい方法です。例えば

$$
A=\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$

なら

$$
\begin{aligned}
\boldsymbol x^{\mathsf T}A\boldsymbol x
&=2x^2+2xy+2y^2\\
&=(x+y)^2+x^2+y^2.
\end{aligned}
$$

$(x,y)\ne(0,0)$ なら右辺は正なので、$A$ は正定値です。

### 方法B：固有値を見る

実対称行列では

$$
\boxed{
A\text{ が正定値}
\Longleftrightarrow
\text{全固有値が正}
}
$$

であり、また

$$
\boxed{
A\text{ が半正定値}
\Longleftrightarrow
\text{全固有値が0以上}
}
$$

です。

すでに固有値を求めている問題では、この方法が最短です。特に分散共分散行列のように「半正定値か」を見る場合は、固有値か二次形式を使うと安全です。

### 方法C：首座小行列式を見る

$A$ の左上から取った $k\times k$ 部分行列を $A_k$ とし

$$
\Delta_k=\det A_k
$$

とします。実対称行列では

$$
\boxed{
A\text{ が正定値}
\Longleftrightarrow
\Delta_1>0,\ldots,\Delta_p>0
}
$$

が成り立ちます。これがシルベスターの判定法です。

特に

$$
A=\begin{pmatrix}a&b\\b&c\end{pmatrix}
$$

なら

$$
\boxed{a>0,\qquad ac-b^2>0}
$$

だけで正定値と判定できます。2変数のヘッセ行列の判定ではこれが最速です。

## 2. 半正定値では「$>$ を $\ge$ に変えるだけ」は不可

正定値のシルベスター判定

$$
\Delta_1>0,\ldots,\Delta_p>0
$$

を見て、半正定値なら単純に

$$
\Delta_1\ge0,\ldots,\Delta_p\ge0
$$

とすればよい、と覚えるのは危険です。

例えば

$$
A=\begin{pmatrix}0&0\\0&-1\end{pmatrix}
$$

では

$$
\Delta_1=0,
\qquad
\Delta_2=0
$$

ですが

$$
\begin{pmatrix}0&1\end{pmatrix}
A
\begin{pmatrix}0\\1\end{pmatrix}
=-1<0
$$

なので半正定値ではありません。

したがって半正定値の判定では、**固有値がすべて0以上か、二次形式が常に0以上か**を確認する方が安全です。

## 3. $A^{\mathsf T}A$ が正定値になる条件

任意の行列 $A$ に対して

$$
\boldsymbol z^{\mathsf T}A^{\mathsf T}A\boldsymbol z
=\|A\boldsymbol z\|^2\ge0
$$

なので $A^{\mathsf T}A$ は必ず半正定値です。

さらに $A$ が列フルランクなら、$\boldsymbol z\ne\boldsymbol0$ に対して $A\boldsymbol z\ne\boldsymbol0$ なので

$$
\|A\boldsymbol z\|^2>0.
$$

従って

$$
\boxed{
A\text{ が列フルランク}
\Longrightarrow
A^{\mathsf T}A\text{ は正定値}
}
$$

です。最小二乗法で $(X^{\mathsf T}X)^{-1}$ が現れる理由につながります。

## 4. Cholesky分解は正定値行列の計算形

実対称正定値行列 $A$ は、対角成分が正の下三角行列 $L$ を用いて

$$
\boxed{A=LL^{\mathsf T}}
$$

と書けます。これを Cholesky（コレスキー）分解といいます。

この速習では一般の成分公式を暗記対象にはしません。小さい行列なら

$$
L=
\begin{pmatrix}
\ell_{11}&0&0\\
\ell_{21}&\ell_{22}&0\\
\ell_{31}&\ell_{32}&\ell_{33}
\end{pmatrix}
$$

と置き、$LL^{\mathsf T}$ の成分を左上から比較して求めれば十分です。後ろの計算基礎体力ドリルで3次行列を実際に分解します。

## 5. 手計算の選択基準

- 2変数で式の意味も見たい → 平方完成。
- 2次対称行列を素早く判定したい → $a>0$ と $\det A>0$。
- すでに固有値が出ている → 固有値の符号を見る。
- 半正定値かを判定したい → 固有値または二次形式。
- 正定値行列を数値計算に使いたい → Cholesky分解。

判定公式を全部同じ重さで暗記するのではなく、**どの問題ならどの判定が一番短いか**を選べることを目標にします。
