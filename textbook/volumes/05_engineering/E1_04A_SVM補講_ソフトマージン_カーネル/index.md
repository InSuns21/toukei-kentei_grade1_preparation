# E1-04A SVM補講：ソフトマージン・hinge損失・カーネル法

この補講では、E1-04本編のSVM節で扱う **ソフトマージン、hinge損失、カーネル法** を一段深く掘り下げます。

本編で最低限つかみたい流れは次です。

1. ハードマージンでは「全点をマージンの外側へ置く」ことを要求する。
2. 現実には外れ値や重なりがあるので、その要求を少し破ってよいことにする。
3. 破った量をスラック変数 $\xi_i$ で測る。
4. 最適な $\xi_i$ を消去すると hinge損失 $\max\{0,1-y_if(\boldsymbol x_i)\}$ が現れる。
5. 線形境界では分けにくいときは特徴写像 $\varphi(\boldsymbol x)$ で別の空間へ移す。
6. 双対問題には特徴ベクトル同士の内積しか現れないので、その内積をカーネル $K$ で直接計算できる。

このページでは、その「なぜ」を式で確認します。

関連ページ:

- [E1-04 プロビット・非線形回帰・SVM](../E1_04_プロビット_非線形回帰_SVM/index.md)
- [F0-02 制約付き最適化・双対問題・KKT条件](../../00_foundations/F0_02_制約付き最適化_双対_KKT/index.md)

---

## 1. ハードマージンの何が困るのか

ハードマージンSVMは

$$
\min_{\boldsymbol w,b}
\frac12\|\boldsymbol w\|^2
$$

subject to

$$
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\ge1
\qquad(i=1,\dots,n)
$$

でした。

この制約は、全訓練点に対して

$$
y_if(\boldsymbol x_i)\ge1
$$

を要求します。

ここで

$$
m_i=y_if(\boldsymbol x_i)
$$

と置きます。$m_i$ は符号付きの関数マージンです。

- $m_i\ge1$: 正しく分類され、しかも支持超平面の外側にいる。
- $0<m_i<1$: 正しく分類はされているが、マージンの内側へ入り込んでいる。
- $m_i\le0$: 分類を誤っている。

ハードマージンは最初の状態しか許しません。

したがって、1点でもどうしても条件を満たせない点があると、問題自体が実行不可能になります。また、たった1個の外れ値を無理に正しく分類するために、境界が大きく曲げられるような挙動も望ましくありません。

そこで、

> 全点を完全に守るのではなく、違反には罰金を払って許す

という考え方へ変えます。

---

## 2. スラック変数は「どれだけ1に届かなかったか」

各点に $\xi_i\ge0$ を導入して

$$
\boxed{
y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)
\ge1-\xi_i
}
$$

とします。

$m_i=y_if(\boldsymbol x_i)$ と書けば

$$
m_i\ge1-\xi_i
$$

なので

$$
\xi_i\ge1-m_i.
$$

同時に

$$
\xi_i\ge0
$$

です。

したがって、与えられた $\boldsymbol w,b$ に対して許される最小のスラックは

$$
\boxed{
\xi_i=\max\{0,1-m_i\}
}
$$

です。

なぜ「最小」を選ぶのでしょうか。目的関数では $\xi_i$ に正の罰金を掛けるので、必要以上に大きな $\xi_i$ を選ぶ理由がないからです。

### 2.1 数値で見る

#### $m_i=1.4$

$$
\xi_i=\max\{0,1-1.4\}=0.
$$

十分余裕をもって正しく分類されています。

#### $m_i=0.6$

$$
\xi_i=\max\{0,1-0.6\}=0.4.
$$

分類は正しいですが、マージン内へ0.4だけ侵入しています。

#### $m_i=-0.3$

$$
\xi_i=\max\{0,1+0.3\}=1.3.
$$

符号まで間違えているので、1を超える違反になります。

この三つの例を頭に置くと、hinge損失の形が見やすくなります。

---

## 3. ソフトマージンの目的関数

ソフトマージンSVMは

$$
\boxed{
\min_{\boldsymbol w,b,\boldsymbol\xi}
\frac12\|\boldsymbol w\|^2
+C\sum_{i=1}^n\xi_i
}
$$

subject to

$$
y_if(\boldsymbol x_i)\ge1-\xi_i,
\qquad
\xi_i\ge0
$$

です。

目的関数には二つの要求が同居しています。

$$
\frac12\|\boldsymbol w\|^2
$$

を小さくすることは、マージンを広くすることに対応します。

一方

$$
C\sum_i\xi_i
$$

を小さくすることは、マージン違反や誤分類を減らすことに対応します。

したがって、**「広いマージン」と「訓練点をきちんと合わせること」のトレードオフ**を解いています。

---

## 4. $C$ は何を調節しているのか

$C$ は違反に対する罰金の重さです。

### $C$ が大きい

違反1単位の代償が大きいため、訓練点をできるだけマージン外へ出そうとします。

その代わり、マージンを狭くしてでも個々の点へ合わせる場合があります。

### $C$ が小さい

多少の違反を許しやすくなります。

その代わり、$\|\boldsymbol w\|$ を小さくして広いマージンを選びやすくなります。

したがって、単純に

> $C$ が大きいほど良い

わけではありません。

$C$ は **境界の単純さと訓練データへの適合度の交換比率** と見る方が本質的です。

---

## 5. hinge損失はスラックを消去すると出てくる

前節で

$$
\xi_i=\max\{0,1-y_if(\boldsymbol x_i)\}
$$

でした。

これを目的関数へ代入すると

$$
\boxed{
\min_{\boldsymbol w,b}
\frac12\|\boldsymbol w\|^2
+C\sum_i
\max\{0,1-y_if(\boldsymbol x_i)\}
}
$$

となります。

そこで

$$
\boxed{
\ell_{\mathrm{hinge}}(y,f)
=\max\{0,1-yf\}
}
$$

を hinge損失と呼びます。

重要なのは、hinge損失を「SVMで使う謎の損失」と覚えないことです。

> マージン制約をどれだけ破ったかを表す最小スラックを、目的関数へ代入したもの

です。

---

## 6. hinge損失は誤分類だけを罰しているのではない

0-1損失なら、分類が正しいか間違っているかだけを見ます。

しかしhinge損失では

$$
yf=0.2
$$

のように符号は正しくても

$$
1-yf=0.8
$$

なので損失があります。

つまりSVMは

> 正解なら何でもよい

とは考えていません。

> 正解したうえで、境界から十分離れてほしい

と要求しています。

これがマージン法らしい点です。

---

## 7. 正則化付き経験損失最小化として見る

ソフトマージンSVMは

$$
\frac12\|\boldsymbol w\|^2
+C\sum_i\ell_{\mathrm{hinge},i}
$$

なので、機械学習でよく見る

$$
\boxed{
\text{モデルの複雑さへの罰則}
+
\text{データへの損失}
}
$$

という形になっています。

$\|\boldsymbol w\|^2$ が正則化項、hinge損失がデータ適合項です。

この見方を持つと、SVMがロジット回帰とまったく無関係な孤立した手法ではなく、

- ロジスティック回帰: log-lossを使う
- SVM: hinge lossを使う

という比較もできます。ただし、ロジスティック回帰は確率モデルとして尤度から出るのに対し、SVMはマージン原理から出るという起源の違いがあります。

---

## 8. 補足：ソフトマージンの双対問題

ここからは本編より一段深い内容です。

主問題を

$$
\min_{\boldsymbol w,b,\boldsymbol\xi}
\frac12\|\boldsymbol w\|^2+C\sum_i\xi_i
$$

subject to

$$
1-\xi_i-y_if(\boldsymbol x_i)\le0,
$$

$$
-\xi_i\le0
$$

と書きます。

それぞれの制約に

$$
\alpha_i\ge0,
\qquad
\mu_i\ge0
$$

を付けると

$$
\begin{aligned}
L
&=
\frac12\|\boldsymbol w\|^2
+C\sum_i\xi_i\\
&\quad+
\sum_i\alpha_i
\{1-\xi_i-y_i(\boldsymbol w^{\mathsf T}\boldsymbol x_i+b)\}
-
\sum_i\mu_i\xi_i.
\end{aligned}
$$

停留条件は

$$
\frac{\partial L}{\partial\boldsymbol w}=0
$$

より

$$
\boxed{
\boldsymbol w
=
\sum_i\alpha_i y_i\boldsymbol x_i
},
$$

$$
\frac{\partial L}{\partial b}=0
$$

より

$$
\boxed{
\sum_i\alpha_i y_i=0
},
$$

さらに

$$
\frac{\partial L}{\partial\xi_i}=0
$$

より

$$
C-\alpha_i-\mu_i=0.
$$

$\mu_i\ge0$ なので

$$
\alpha_i\le C.
$$

また $\alpha_i\ge0$ ですから

$$
\boxed{0\le\alpha_i\le C}
$$

が現れます。

ハードマージンでは $\alpha_i\ge0$ しかなかったのに、ソフトマージンでは上限 $C$ が付くのはこのためです。

双対目的関数の形はハードマージンと同じで

$$
\boxed{
\max_{\boldsymbol\alpha}
\left[
\sum_i\alpha_i
-
\frac12
\sum_{i,j}
\alpha_i\alpha_jy_iy_j
\boldsymbol x_i^{\mathsf T}\boldsymbol x_j
\right]
}
$$

ただし

$$
\boxed{
0\le\alpha_i\le C,
\qquad
\sum_i\alpha_i y_i=0
}
$$

となります。

---

## 9. 補足：KKTから点を三種類に読む

退化していない典型的な場合、KKT条件からおおよそ次の読み方ができます。

### $\alpha_i=0$

通常はマージンより十分外側にあり、その点は境界を直接支えません。

### $0<\alpha_i<C$

このとき $\mu_i=C-\alpha_i>0$ なので相補性から

$$
\xi_i=0.
$$

また $\alpha_i>0$ なので

$$
y_if(\boldsymbol x_i)=1.
$$

したがって、支持超平面上の典型的なサポートベクトルです。

### $\alpha_i=C$

マージン内にある点や誤分類点がここへ現れ得ます。

この整理は便利ですが、退化した解では単純な逆向きの含意が崩れる場合があるので、試験答案ではKKTから確実に言える向きを使うのが安全です。

---

## 10. なぜカーネル法が必要になるのか

ここまでのSVMは

$$
f(\boldsymbol x)=\boldsymbol w^{\mathsf T}\boldsymbol x+b
$$

という線形境界でした。

しかし、元の空間で一本の直線や超平面では分けられない分類もあります。

例えば1次元で

- $|x|<1$ をクラス $-1$
- $|x|>1$ をクラス $+1$

としたいとします。

$x$ 軸上では、正の大きな値と負の大きな値が同じクラスなので、1個の閾値

$$
wx+b=0
$$

では両側を同時に $+1$ にできません。

ところが

$$
\boxed{z=x^2}
$$

と変換すると

- $|x|<1 \Longleftrightarrow z<1$
- $|x|>1 \Longleftrightarrow z>1$

なので、$z$ 空間では

$$
z-1=0
$$

という直線的な閾値で分けられます。

元の $x$ 空間へ戻せば境界は

$$
\boxed{x^2=1}
$$

で非線形です。

これが特徴写像の基本発想です。

---

## 11. 特徴空間で線形SVMをする

一般に

$$
\boldsymbol x
\mapsto
\varphi(\boldsymbol x)
$$

という特徴写像を考えます。

特徴空間では

$$
f(\boldsymbol x)
=
\boldsymbol w^{\mathsf T}\varphi(\boldsymbol x)+b
$$

という線形SVMを行います。

元の $\boldsymbol x$ に対しては $\varphi$ が非線形なので、元空間では非線形な分類境界を作れます。

ここまでは単なる「特徴量を増やして線形分類する」話です。

カーネル法の本質は、その次にあります。

---

## 12. 双対問題には特徴ベクトルの内積しか出てこない

特徴空間でハードマージンSVMの双対を書くと

$$
\max_{\boldsymbol\alpha}
\left[
\sum_i\alpha_i
-
\frac12
\sum_{i,j}
\alpha_i\alpha_jy_iy_j
\varphi(\boldsymbol x_i)^{\mathsf T}
\varphi(\boldsymbol x_j)
\right].
$$

ここで訓練データは

$$
\boxed{
\varphi(\boldsymbol x_i)^{\mathsf T}
\varphi(\boldsymbol x_j)
}
$$

という内積の形でしか現れません。

ならば、この内積の値だけを直接計算する関数

$$
\boxed{
K(\boldsymbol x,\boldsymbol z)
=
\varphi(\boldsymbol x)^{\mathsf T}
\varphi(\boldsymbol z)
}
$$

が分かれば、$\varphi(\boldsymbol x)$ の全成分を実際に作る必要がありません。

これが **kernel trick** です。

---

## 13. 多項式カーネルを本当に展開してみる

1次元で

$$
K(x,z)=(1+xz)^2
$$

を考えます。

展開すると

$$
(1+xz)^2
=1+2xz+x^2z^2.
$$

ここで

$$
\boxed{
\varphi(x)
=
\begin{pmatrix}
1\\
\sqrt2x\\
x^2
\end{pmatrix}
}
$$

と置けば

$$
\begin{aligned}
\varphi(x)^{\mathsf T}\varphi(z)
&=1+(\sqrt2x)(\sqrt2z)+x^2z^2\\
&=1+2xz+x^2z^2\\
&=(1+xz)^2.
\end{aligned}
$$

つまり

$$
K(x,z)=(1+xz)^2
$$

を計算するだけで、暗黙に

$$
1,\quad x,\quad x^2
$$

を持つ特徴空間で内積したことになります。

この具体例が、カーネル法を理解する最短ルートです。

---

## 14. 予測時にも $\varphi$ を作らなくてよい

停留条件から

$$
\boldsymbol w
=
\sum_i\alpha_i y_i\varphi(\boldsymbol x_i)
$$

です。

したがって新しい点 $\boldsymbol x$ の判別関数は

$$
\begin{aligned}
f(\boldsymbol x)
&=\boldsymbol w^{\mathsf T}\varphi(\boldsymbol x)+b\\
&=
\sum_i\alpha_i y_i
\varphi(\boldsymbol x_i)^{\mathsf T}
\varphi(\boldsymbol x)+b\\
&=
\boxed{
\sum_i\alpha_i y_i
K(\boldsymbol x_i,\boldsymbol x)+b
}.
\end{aligned}
$$

したがって学習時だけでなく予測時にも、特徴写像を陽に計算しなくて済みます。

さらに $\alpha_i=0$ の点は和から消えるので、実際にはサポートベクトルとのカーネル値が中心になります。

---

## 15. 「好きな類似度」をカーネルにしてよいわけではない

ここは重要です。

SVMのカーネルとして使うには、少なくとも任意の点

$$
\boldsymbol x_1,\dots,\boldsymbol x_n
$$

についてGram行列

$$
G_{ij}=K(\boldsymbol x_i,\boldsymbol x_j)
$$

が対称半正定値になるような関数を使います。

すなわち任意の $\boldsymbol c\in\mathbb R^n$ に対して

$$
\boxed{
\boldsymbol c^{\mathsf T}G\boldsymbol c\ge0
}
$$

が必要です。

もし

$$
K(\boldsymbol x,\boldsymbol z)
=
\varphi(\boldsymbol x)^{\mathsf T}\varphi(\boldsymbol z)
$$

と書けるなら

$$
\begin{aligned}
\boldsymbol c^{\mathsf T}G\boldsymbol c
&=
\sum_{i,j}c_ic_j
\varphi(\boldsymbol x_i)^{\mathsf T}\varphi(\boldsymbol x_j)\\
&=
\left\|
\sum_i c_i\varphi(\boldsymbol x_i)
\right\|^2\\
&\ge0.
\end{aligned}
$$

なので半正定値性は自然に出ます。

Mercerの定理などを厳密に追うのは統計検定1級のSVM理解としては深入りですが、

> カーネルは単なる任意の類似度ではなく、内積として整合的なものである

ことは押さえておくとよいです。

---

## 16. 代表的なカーネル

### 線形カーネル

$$
K(\boldsymbol x,\boldsymbol z)
=\boldsymbol x^{\mathsf T}\boldsymbol z.
$$

特徴写像を変えない通常の線形SVMです。

### 多項式カーネル

$$
K(\boldsymbol x,\boldsymbol z)
=(c+\boldsymbol x^{\mathsf T}\boldsymbol z)^d.
$$

多項式特徴を暗黙に導入します。

### Gaussian RBFカーネル

$$
\boxed{
K(\boldsymbol x,\boldsymbol z)
=
\exp\{-\gamma\|\boldsymbol x-\boldsymbol z\|^2\}
}.
$$

近い点同士では1に近く、遠い点同士では0に近くなります。

RBFは無限次元の特徴空間と対応すると説明されることがありますが、試験対策としてまず重要なのは

> 距離に基づくカーネルを使って、元空間では曲がった境界を作れる

という理解です。

---

## 17. $C$ とカーネルパラメータを混同しない

RBFカーネルなら $C$ に加えて $\gamma$ が出てきます。

- $C$: マージン違反をどれだけ重く罰するか
- $\gamma$: どれくらい近い点まで強く似ているとみなすか

です。

大まかには $\gamma$ が大きいほど局所的な境界を作りやすくなり、小さいほど滑らかで大域的な境界になりやすくなります。

両方とも複雑さへ影響しますが、意味は別物です。

---

## 18. カーネル法は「高次元なら必ず得」ではない

カーネル法には代償もあります。

訓練点が $n$ 個あればGram行列は $n\times n$ なので、単純には

$$
O(n^2)
$$

個のカーネル値を扱います。

またRBFのように距離に依存するカーネルでは、変数の尺度が大きく違うと距離が一部の変数に支配されるため、標準化が重要になります。

したがって

> カーネル法 = 無料で無限次元へ行ける魔法

ではありません。

「陽に特徴を全部作らず内積だけ計算できる」という計算上・表現上の利点と、標本数に対する計算量の問題は分けて考えます。

---

## 19. 本編でどこまで覚えるか

統計検定1級のSVM理解として、まず本編で次を押さえます。

1. ハードマージンが厳しすぎるためスラック $\xi_i$ を導入する。
2. 最小スラックを代入すると hinge損失になる。
3. $C$ はマージンの広さと違反の少なさの交換比率である。
4. 特徴写像で、元空間の非線形境界を特徴空間の線形境界として扱える。
5. 双対問題では特徴ベクトルは内積でしか現れない。
6. その内積を $K$ で直接計算するのがkernel trickである。
7. 判別関数は
   $$
   f(\boldsymbol x)
   =\sum_i\alpha_i y_iK(\boldsymbol x_i,\boldsymbol x)+b
   $$
   と書ける。

一方、次は補講レベルです。

- ソフトマージン双対で $0\le\alpha_i\le C$ が出る完全導出
- KKTによる $\alpha_i$ の細かな場合分け
- Mercer条件の関数解析的な証明
- RBFカーネルが無限次元特徴空間に対応する完全展開
- SMOなど具体的な数値最適化アルゴリズム

---

## 20. 確認問題

### 問1 スラックとhinge損失

$m=yf(\boldsymbol x)$ がそれぞれ

$$
1.5,\qquad0.3,\qquad-0.4
$$

のとき、最小スラックとhinge損失を求めよ。

#### 解答

$$
\max\{0,1-m\}
$$

より

$$
0,\qquad0.7,\qquad1.4.
$$

### 問2 $C$ の意味

$C$ を非常に大きくしたとき、訓練点の違反とマージン幅のどちらを相対的に重視するか答えよ。

#### 解答

違反を避けることを強く重視する。そのため、より狭いマージンを受け入れてでも訓練点へ合わせる場合がある。

### 問3 多項式カーネル

$$
K(x,z)=(1+xz)^2
$$

に対応する特徴写像を一つ示せ。

#### 解答

$$
\boxed{
\varphi(x)=(1,\sqrt2x,x^2)^{\mathsf T}
}.
$$

### 問4 判別関数

カーネルSVMで学習後の係数が $\alpha_i$ のとき、新しい点 $\boldsymbol x$ の判別関数を書け。

#### 解答

$$
\boxed{
f(\boldsymbol x)
=
\sum_i\alpha_i y_iK(\boldsymbol x_i,\boldsymbol x)+b
}.
$$

その符号でクラスを決める。
