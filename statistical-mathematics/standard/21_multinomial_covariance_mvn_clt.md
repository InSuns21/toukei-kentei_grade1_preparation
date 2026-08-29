# Standard 09 多項分布・分散共分散行列・多変量中心極限定理

- 旧No.: 21
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## この問題の前に：線形代数の用語

この問題では、多項分布の分散共分散行列が **特異**になる理由まで扱う。そのため、次の線形代数の用語を使う。

- **特異行列**：逆行列を持たない正方行列。$A$ が特異であることは、$A\boldsymbol x=\boldsymbol0$ を満たす非零ベクトル $\boldsymbol x$ が存在することと同値。
- **零空間**：

  $$
  \operatorname{Null}(A)
  =\{\boldsymbol x:A\boldsymbol x=\boldsymbol0\}.
  $$

- **線形包（span）**：

  $$
  \operatorname{span}\{\boldsymbol v\}
  =\{c\boldsymbol v:c\in\mathbb R\}.
  $$

  つまり、$\boldsymbol v$ と同じ方向のベクトル全部。

- **階数・退化次数の定理**：$A$ が $m\times n$ 行列なら

  $$
  \operatorname{rank}(A)
  +\dim\operatorname{Null}(A)=n.
  $$

詳しくは [F0-00 線形代数補足：span・零空間・特異行列](../../textbook/volumes/00_foundations/F0_00_統計検定1級のための数学速習/linear_algebra_singular_null_span.md) を参照。

この問題では、用語そのものを暗記しているかよりも、**「成分和が1に固定されているので、1方向にはまったく変動できない」**ことを式で説明できることが重要である。

---

## 問題

各試行 $r=1,\ldots,n$ で、カテゴリ変数 $C_r$ が

$$
P(C_r=i)=p_i,\qquad i=1,\ldots,k,
$$

に従うとする。ただし $C_1,\ldots,C_n$ は独立同分布で、

$$
p_i>0,\qquad \sum_{i=1}^k p_i=1
$$

とする。第 $r$ 試行の one-hot ベクトルを

$$
Z_r=
\begin{pmatrix}
\boldsymbol{1}_{\{C_r=1\}}\\
\vdots\\
\boldsymbol{1}_{\{C_r=k\}}
\end{pmatrix},
$$

カテゴリ別度数と標本比率を

$$
N=\sum_{r=1}^n Z_r,
\qquad
\widehat p=\frac{N}{n}
$$

と定める。このとき $N=(N_1,\ldots,N_k)^T$ は多項分布
$\operatorname{Multinomial}(n;p_1,\ldots,p_k)$ に従う。

1. $E[Z_r]$ と $\operatorname{Cov}(Z_r)$ を定義から求め、$E[\widehat p]$ と $\operatorname{Cov}(\widehat p)$ を導け。
2. 任意の固定ベクトル $a\in\mathbb R^k$ に対し、1変量中心極限定理を $a^TZ_r$ に適用して

   $$
   a^T\sqrt n(\widehat p-p)
   \xrightarrow{d}
   N(0,a^T\Sigma a)
   $$

   を示せ。さらに Cramér--Wold の定理を用いて

   $$
   \sqrt n(\widehat p-p)
   \xrightarrow{d}
   N_k(0,\Sigma)
   $$

   を導け。
3. $\Sigma$ が特異になる理由を、「標本比率の成分和が常に1である」という事実と結び付けて説明せよ。さらに全ての $p_i>0$ の下で

   $$
   \operatorname{Null}(\Sigma)
   =\operatorname{span}\{\boldsymbol1\}
   $$

   であり、$\operatorname{rank}(\Sigma)=k-1$ となることを示せ。ただし $\boldsymbol1=(1,\ldots,1)^T$ とする。
4. 第 $k$ 成分を除いた

   $$
   \widehat p^{(-k)}
   =(\widehat p_1,\ldots,\widehat p_{k-1})^T
   $$

   の漸近分散共分散行列を書き、なぜこちらは非退化になるのか説明せよ。
5. $k=3$,

   $$
   p=\left(\frac12,\frac13,\frac16\right)^T
   $$

   とする。$\sqrt n(\widehat p_1-p_1,\widehat p_2-p_2)^T$ の漸近分散共分散行列を求め、さらに

   $$
   \sqrt n\left\{(\widehat p_1-\widehat p_2)-(p_1-p_2)\right\}
   $$

   の漸近分散を求めよ。

> **使用してよい定理（Cramér--Wold）**  
> 確率ベクトル $X_n,X$ について、任意の固定ベクトル $a$ に対して $a^TX_n\xrightarrow{d}a^TX$ が成り立てば、$X_n\xrightarrow{d}X$ である。

---

## 詳細解答

この問題の中心は、多項分布の公式を個別に暗記することではない。

**1回のカテゴリ試行を one-hot ベクトルで表し、その独立和として多項分布を見る**ことで、平均・分散共分散・多変量中心極限定理・特異性までを一つの流れで導ける。

### 1. one-hot ベクトルから平均・分散共分散を導く

$p=(p_1,\ldots,p_k)^T$ とする。

第 $i$ 成分は

$$
Z_{ri}=\boldsymbol{1}_{\{C_r=i\}}
$$

だから、指示変数の期待値より

$$
E[Z_{ri}]=P(C_r=i)=p_i.
$$

従って

$$
\boxed{E[Z_r]=p}.
$$

#### 対角成分

$Z_{ri}\in\{0,1\}$ なので $Z_{ri}^2=Z_{ri}$。したがって

$$
E[Z_{ri}^2]=p_i
$$

であり、

$$
\begin{aligned}
\operatorname{Var}(Z_{ri})
&=E[Z_{ri}^2]-E[Z_{ri}]^2\\
&=p_i-p_i^2\\
&=p_i(1-p_i).
\end{aligned}
$$

#### 非対角成分

$i\ne j$ なら、1回の試行でカテゴリ $i$ と $j$ が同時に起こることはない。したがって

$$
Z_{ri}Z_{rj}=0
$$

が恒等的に成り立つので

$$
E[Z_{ri}Z_{rj}]=0.
$$

よって

$$
\begin{aligned}
\operatorname{Cov}(Z_{ri},Z_{rj})
&=E[Z_{ri}Z_{rj}]-E[Z_{ri}]E[Z_{rj}]\\
&=-p_ip_j.
\end{aligned}
$$

以上より、1試行の分散共分散行列は

$$
\boxed{
\Sigma
=\operatorname{Cov}(Z_r)
=\operatorname{diag}(p)-pp^T
}.
$$

成分表示では

$$
\Sigma_{ij}
=
\begin{cases}
p_i(1-p_i),&i=j,\\
-p_ip_j,&i\ne j.
\end{cases}
$$

である。

ここで

$$
\widehat p
=\frac1n\sum_{r=1}^n Z_r.
$$

したがって

$$
E[\widehat p]
=\frac1n\sum_{r=1}^nE[Z_r]
=p.
$$

また試行間は独立だから $r\ne s$ では $\operatorname{Cov}(Z_r,Z_s)=0$。よって

$$
\begin{aligned}
\operatorname{Cov}(\widehat p)
&=\operatorname{Cov}\left(\frac1n\sum_{r=1}^nZ_r\right)\\
&=\frac1{n^2}\sum_{r=1}^n\operatorname{Cov}(Z_r)\\
&=\boxed{\frac1n\Sigma}.
\end{aligned}
$$

従って度数ベクトル $N=n\widehat p$ については

$$
E[N]=np,
\qquad
\operatorname{Cov}(N)=n\Sigma.
$$

---

### 2. 1変量中心極限定理から多変量中心極限定理を導く

任意の固定ベクトル

$$
a=(a_1,\ldots,a_k)^T
$$

を取り、

$$
Y_r=a^TZ_r
$$

と置く。

$Z_r$ は one-hot ベクトルなので、$C_r=i$ のとき $Y_r=a_i$ である。したがって

$$
P(Y_r=a_i)=p_i.
$$

その平均は

$$
E[Y_r]
=a^TE[Z_r]
=a^Tp,
$$

分散は

$$
\operatorname{Var}(Y_r)
=a^T\Sigma a.
$$

直接書けば

$$
\boxed{
a^T\Sigma a
=\sum_{i=1}^kp_i a_i^2
-\left(\sum_{i=1}^kp_i a_i\right)^2
}.
$$

これは「確率 $p_i$ で値 $a_i$ を取る確率変数」の分散そのものである。

一方、

$$
\begin{aligned}
a^T\sqrt n(\widehat p-p)
&=\frac1{\sqrt n}
\sum_{r=1}^n\{a^TZ_r-a^Tp\}\\
&=\frac1{\sqrt n}
\sum_{r=1}^n\{Y_r-E[Y_r]\}.
\end{aligned}
$$

$Y_1,\ldots,Y_n$ は独立同分布で有限分散を持つから、1変量中心極限定理より

$$
\boxed{
a^T\sqrt n(\widehat p-p)
\xrightarrow{d}
N(0,a^T\Sigma a)
}.
$$

これは任意の固定 $a$ について成り立つ。したがって Cramér--Wold の定理より

$$
\boxed{
\sqrt n(\widehat p-p)
\xrightarrow{d}
N_k(0,\Sigma)
}.
$$

---

### 3. なぜ分散共分散行列は特異なのか

ここがこの問題の線形代数上の核心である。

#### 3.1 まず「特異」を確率的に読む

one-hot ベクトルは各試行で必ず成分のどれか1個だけが1になるため、

$$
\boldsymbol1^TZ_r=1
$$

が恒等的に成り立つ。

従って標本平均についても

$$
\boxed{\boldsymbol1^T\widehat p=1}.
$$

母比率も

$$
\boldsymbol1^Tp=1
$$

だから、差を取れば

$$
\boxed{
\boldsymbol1^T(\widehat p-p)=0
}.
$$

つまり $\widehat p-p$ は $\mathbb R^k$ の全方向へ自由に動けない。

たとえば $k=3$ なら

$$
x_1+x_2+x_3=0
$$

という平面上だけを動く。一般には

$$
\mathcal H
=\{x\in\mathbb R^k:\boldsymbol1^Tx=0\}
$$

という $(k-1)$ 次元超平面上に拘束される。

この **1本の完全な線形制約** が、分散共分散行列が特異になる確率的・幾何学的理由である。

#### 3.2 行列計算で確認する

$$
\Sigma
=\operatorname{diag}(p)-pp^T
$$

だから

$$
\begin{aligned}
\Sigma\boldsymbol1
&=\{\operatorname{diag}(p)-pp^T\}\boldsymbol1\\
&=p-p(\boldsymbol1^Tp)\\
&=p-p\\
&=\boldsymbol0.
\end{aligned}
$$

ここで $\boldsymbol1\neq\boldsymbol0$ である。

したがって、非零ベクトル $\boldsymbol1$ が $\Sigma$ によって0へ写されるので

$$
\boxed{\Sigma\text{ は特異}}.
$$

零空間の記号を使えば

$$
\boxed{
\boldsymbol1\in\operatorname{Null}(\Sigma)
}.
$$

「特異だから何なのか」を行列式だけで覚えるより、**0へつぶされる方向がある**と理解するほうが、この問題では本質に近い。

#### 3.3 零空間が本当に $\boldsymbol1$ 方向だけであることを示す

$\operatorname{Null}(\Sigma)$ に入る任意のベクトル $a$ を取る。すなわち

$$
\Sigma a=0.
$$

すると

$$
a^T\Sigma a=0.
$$

一方、第2問で

$$
a^T\Sigma a
=\operatorname{Var}(a_{C_r})
$$

と分かった。

したがって

$$
\operatorname{Var}(a_{C_r})=0.
$$

分散が0ということは $a_{C_r}$ が確率1で定数であることを意味する。しかも全ての $p_i>0$ なので、各カテゴリ $i$ は正の確率で起こる。従って

$$
a_1=a_2=\cdots=a_k=c
$$

でなければならない。

すなわち

$$
a=c\boldsymbol1.
$$

よって

$$
\operatorname{Null}(\Sigma)
\subset
\operatorname{span}\{\boldsymbol1\}.
$$

逆にすでに $\Sigma\boldsymbol1=0$ を示しているので、任意の $c$ について

$$
\Sigma(c\boldsymbol1)=0.
$$

したがって逆向きの包含も成り立ち、

$$
\boxed{
\operatorname{Null}(\Sigma)
=\operatorname{span}\{\boldsymbol1\}
}.
$$

ここで $\operatorname{span}\{\boldsymbol1\}$ は

$$
\{c\boldsymbol1:c\in\mathbb R\}
$$

という1次元の部分空間である。したがって

$$
\dim\operatorname{Null}(\Sigma)=1.
$$

$\Sigma$ は $k\times k$ 行列なので、階数・退化次数の定理より

$$
\operatorname{rank}(\Sigma)
+\dim\operatorname{Null}(\Sigma)=k.
$$

ゆえに

$$
\boxed{
\operatorname{rank}(\Sigma)=k-1
}.
$$

#### 3.4 特異な正規分布を書いてよいのか

$$
N_k(0,\Sigma)
$$

と書くこと自体は誤りではない。

ただし $\Sigma$ が特異なので、これは $\mathbb R^k$ 全体に通常の $k$ 次元密度を持つ非退化正規分布ではない。確率質量は

$$
\mathcal H
=\{x:\boldsymbol1^Tx=0\}
$$

という $(k-1)$ 次元超平面上に集中する。

これを **退化多変量正規分布**という。

---

### 4. 1成分を落とすと非退化になる

第 $k$ 成分は

$$
\widehat p_k
=1-\sum_{i=1}^{k-1}\widehat p_i
$$

で完全に決まる。したがって、最初の $k-1$ 成分だけ残せば線形制約による冗長性が消える。

$$
q=(p_1,\ldots,p_{k-1})^T
$$

と置くと、$\widehat p^{(-k)}$ の漸近分散共分散行列は $\Sigma$ の左上 $(k-1)\times(k-1)$ ブロックであり、

$$
\boxed{
\Sigma_{-k}
=\operatorname{diag}(q)-qq^T
}.
$$

従って

$$
\boxed{
\sqrt n\{\widehat p^{(-k)}-q\}
\xrightarrow{d}
N_{k-1}(0,\Sigma_{-k})
}.
$$

これが正定値であることを確認する。

任意の $b\in\mathbb R^{k-1}$ に対して

$$
b^T\Sigma_{-k}b
=
\sum_{i=1}^{k-1}p_i b_i^2
-\left(\sum_{i=1}^{k-1}p_i b_i\right)^2.
$$

これは確率変数

$$
W=
\begin{cases}
b_i,&C_r=i,\quad i=1,\ldots,k-1,\\
0,&C_r=k
\end{cases}
$$

の分散である。

もし $\operatorname{Var}(W)=0$ なら $W$ は全カテゴリで同じ定数である。第 $k$ カテゴリでは値0であり $p_k>0$ だから、その定数は0。さらに各 $p_i>0$ より

$$
b_1=\cdots=b_{k-1}=0.
$$

したがって $b\neq0$ なら

$$
b^T\Sigma_{-k}b>0.
$$

よって

$$
\boxed{\Sigma_{-k}\text{ は正定値}}
$$

であり、$(k-1)$ 次元では非退化な多変量正規分布になる。

---

### 5. $k=3$ の具体例

$$
p_1=\frac12,
\qquad
p_2=\frac13,
\qquad
p_3=\frac16.
$$

最初の2成分の漸近分散共分散行列は

$$
\Sigma_{-3}
=
\begin{pmatrix}
p_1(1-p_1)&-p_1p_2\\
-p_1p_2&p_2(1-p_2)
\end{pmatrix}.
$$

各成分を計算すると

$$
p_1(1-p_1)=\frac14,
\qquad
p_2(1-p_2)=\frac29,
\qquad
-p_1p_2=-\frac16.
$$

従って

$$
\boxed{
\sqrt n
\begin{pmatrix}
\widehat p_1-1/2\\
\widehat p_2-1/3
\end{pmatrix}
\xrightarrow{d}
N_2\left(
\begin{pmatrix}0\\0\end{pmatrix},
\begin{pmatrix}
1/4&-1/6\\
-1/6&2/9
\end{pmatrix}
\right)
}.
$$

行列式は

$$
\frac14\cdot\frac29-\left(\frac16\right)^2
=\frac1{36}>0
$$

なので、この2次元の分散共分散行列は実際に非特異である。

次に

$$
\widehat p_1-\widehat p_2
$$

を考える。

$$
a=(1,-1,0)^T
$$

と置けば、求める漸近分散は

$$
a^T\Sigma a.
$$

第2問の一般式から

$$
\begin{aligned}
a^T\Sigma a
&=\sum_{i=1}^3p_i a_i^2
-\left(\sum_{i=1}^3p_i a_i\right)^2\\
&=p_1+p_2-(p_1-p_2)^2\\
&=\frac12+\frac13-\left(\frac12-\frac13\right)^2\\
&=\frac56-\frac1{36}\\
&=\boxed{\frac{29}{36}}.
\end{aligned}
$$

従って

$$
\boxed{
\sqrt n\left\{
(\widehat p_1-\widehat p_2)-\frac16
\right\}
\xrightarrow{d}
N\left(0,\frac{29}{36}\right)
}.
$$

---

## この問題で押さえる構造

多項分布では

$$
\boxed{
\text{カテゴリ試行}
\to
\text{one-hot ベクトル}
\to
\Sigma=\operatorname{diag}(p)-pp^T
\to
\text{1変量中心極限定理}
\to
\text{Cramér--Wold}
\to
\text{退化多変量正規}
}
$$

という流れを一つのまとまりとして理解する。

さらに

$$
\sum_{i=1}^k\widehat p_i=1
$$

という1本の線形制約から

$$
\Sigma\boldsymbol1=0
$$

が生じる。つまり $\boldsymbol1$ 方向の変動が完全に消える。その結果として

- $\Sigma$ は特異になる。
- $\operatorname{Null}(\Sigma)=\operatorname{span}\{\boldsymbol1\}$ となる。
- $\operatorname{rank}(\Sigma)=k-1$ となる。
- 1カテゴリを落とすと非退化になる。

という事実がすべて同じ原因から出てくる。

---

## 本番答案

第 $r$ 試行の one-hot ベクトルを $Z_r$ とすると

$$
E[Z_r]=p.
$$

$Z_{ri}^2=Z_{ri}$、$i\ne j$ では $Z_{ri}Z_{rj}=0$ だから

$$
\operatorname{Var}(Z_{ri})=p_i(1-p_i),
\qquad
\operatorname{Cov}(Z_{ri},Z_{rj})=-p_ip_j.
$$

従って

$$
\Sigma=\operatorname{diag}(p)-pp^T,
\qquad
E[\widehat p]=p,
\qquad
\operatorname{Cov}(\widehat p)=\frac1n\Sigma.
$$

任意の $a\in\mathbb R^k$ に対し $Y_r=a^TZ_r$ と置けば

$$
E[Y_r]=a^Tp,
\qquad
\operatorname{Var}(Y_r)=a^T\Sigma a.
$$

1変量中心極限定理より

$$
a^T\sqrt n(\widehat p-p)
\xrightarrow{d}N(0,a^T\Sigma a).
$$

任意の $a$ で成立するので Cramér--Wold より

$$
\sqrt n(\widehat p-p)
\xrightarrow{d}N_k(0,\Sigma).
$$

一方、

$$
\boldsymbol1^T(\widehat p-p)=0,
\qquad
\Sigma\boldsymbol1=0.
$$

よって $\Sigma$ は特異で、$\boldsymbol1\in\operatorname{Null}(\Sigma)$。また

$$
a^T\Sigma a=\operatorname{Var}(a_{C_r})
$$

だから、全ての $p_i>0$ の下では分散0となるのは $a$ が定数ベクトルのときだけである。従って

$$
\operatorname{Null}(\Sigma)
=\operatorname{span}\{\boldsymbol1\}.
$$

零空間の次元は1なので、階数・退化次数の定理より

$$
\operatorname{rank}(\Sigma)=k-1.
$$

第 $k$ 成分を落とせば

$$
\Sigma_{-k}=\operatorname{diag}(q)-qq^T
$$

は正定値となる。

$p=(1/2,1/3,1/6)^T$ では

$$
\Sigma_{-3}
=
\begin{pmatrix}
1/4&-1/6\\
-1/6&2/9
\end{pmatrix},
$$

また $a=(1,-1,0)^T$ として

$$
a^T\Sigma a
=p_1+p_2-(p_1-p_2)^2
=\boxed{\frac{29}{36}}.
$$

---

## 採点基準

- one-hot 表現から平均・分散共分散行列を定義通り導出：5点
- 任意の線形結合に1変量中心極限定理を適用し、Cramér--Wold で多変量中心極限定理を導出：5点
- 成分和制約から特異性を説明し、零空間と階数 $k-1$ まで導出：4点
- 1成分を落とした分散共分散行列と正定値性：3点
- $k=3$ の具体的分散共分散行列・線形結合の分散：3点
