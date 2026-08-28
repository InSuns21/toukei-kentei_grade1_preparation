# Standard 09 多項分布・共分散行列・多変量中心極限定理

- 旧No.: 21
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

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

1. $E[Z_r]$ と $\operatorname{Cov}(Z_r)$ を定義から求め、
   $E[\widehat p]$ と $\operatorname{Cov}(\widehat p)$ を導け。
2. 任意の固定ベクトル $a\in\mathbb{R}^k$ に対し、1変量中心極限定理を $a^TZ_r$ に適用して

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
3. $\Sigma$ が特異になる理由を、
   「標本比率の成分和が常に1である」という事実と結び付けて説明せよ。
   さらに全ての $p_i>0$ の下で

   $$
   \operatorname{Null}(\Sigma)=\operatorname{span}\{\boldsymbol{1}\}
   $$

   であり、$\operatorname{rank}(\Sigma)=k-1$ となることを示せ。
4. 第 $k$ 成分を除いた

   $$
   \widehat p^{(-k)}=(\widehat p_1,\ldots,\widehat p_{k-1})^T
   $$

   の漸近共分散行列を書き、なぜこちらは非退化になるのか説明せよ。
5. $k=3$,

   $$
   p=\left(\frac12,\frac13,\frac16\right)^T
   $$

   とする。
   $\sqrt n(\widehat p_1-p_1,\widehat p_2-p_2)^T$ の漸近共分散行列を求め、さらに

   $$
   \sqrt n\left\{(\widehat p_1-\widehat p_2)-(p_1-p_2)\right\}
   $$

   の漸近分散を求めよ。

> **使用してよい定理（Cramér--Wold）**  
> 確率ベクトル $X_n,X$ について、任意の固定ベクトル $a$ に対して
> $a^TX_n\xrightarrow{d}a^TX$ が成り立てば、$X_n\xrightarrow{d}X$ である。

---

## 詳細解答

この問題の中心は、多項分布の公式を個別に暗記することではない。

**1回のカテゴリ試行を one-hot ベクトルで表し、その独立和として多項分布を見る**

ことで、平均・共分散・多変量中心極限定理・共分散行列の特異性までを一つの流れで導ける。

### 1. one-hot ベクトルから平均・共分散を導く

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

次に共分散を求める。

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

以上より、1試行の共分散行列は

$$
\boxed{
\Sigma
=\operatorname{Cov}(Z_r)
=\operatorname{diag}(p)-pp^T
}.
$$

成分で書けば

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

したがって線形性から

$$
E[\widehat p]
=\frac1n\sum_{r=1}^nE[Z_r]
=p.
$$

また試行間は独立なので、$r\ne s$ では
$\operatorname{Cov}(Z_r,Z_s)=0$。よって

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
\operatorname{Cov}(N)=n\Sigma
$$

も同時に得られる。

---

### 2. 1変量CLTから多変量CLTを導く

ここで「多変量中心極限定理」を完成した公式として置くのではなく、1変量中心極限定理から導く。

任意の固定ベクトル

$$
a=(a_1,\ldots,a_k)^T
$$

を取る。

1回の試行について

$$
Y_r=a^TZ_r
$$

と置く。

$Z_r$ は one-hot ベクトルなので、$C_r=i$ のとき

$$
Y_r=a_i.
$$

したがって $Y_r$ は

$$
P(Y_r=a_i)=p_i
$$

という1変量確率変数である。

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

実際、直接書けば

$$
\boxed{
a^T\Sigma a
=\sum_{i=1}^kp_i a_i^2
-\left(\sum_{i=1}^kp_i a_i\right)^2
}.
$$

これは「確率 $p_i$ で値 $a_i$ を取る変数」の分散そのものである。

一方

$$
\begin{aligned}
a^T\sqrt n(\widehat p-p)
&=a^T\sqrt n\left(
\frac1n\sum_{r=1}^nZ_r-p
\right)\\
&=\frac1{\sqrt n}
\sum_{r=1}^n
\{a^TZ_r-a^Tp\}\\
&=\frac1{\sqrt n}
\sum_{r=1}^n
\{Y_r-E[Y_r]\}.
\end{aligned}
$$

$Y_1,\ldots,Y_n$ は独立同分布であり、取り得る値は有限個なので分散も有限である。

したがって Lindeberg--Lévy の1変量中心極限定理より

$$
\boxed{
a^T\sqrt n(\widehat p-p)
\xrightarrow{d}
N(0,a^T\Sigma a)
}.
$$

これは任意の固定 $a$ について成り立つ。

ここで Cramér--Wold の定理を用いると、全ての線形結合の極限分布が一致することから

$$
\boxed{
\sqrt n(\widehat p-p)
\xrightarrow{d}
N_k(0,\Sigma)
}
$$

を得る。

つまり多項比率の多変量CLTは、one-hot ベクトルに対する通常の標本平均CLTである。

---

### 3. なぜ共分散行列は特異なのか

one-hot ベクトルは各試行で必ず成分のどれか1個だけが1になる。従って

$$
\boldsymbol{1}^TZ_r=1
$$

が恒等的に成り立つ。

標本平均を取っても

$$
\boxed{
\boldsymbol{1}^T\widehat p=1
}
$$

である。

母比率についても

$$
\boldsymbol{1}^Tp=1
$$

なので

$$
\boxed{
\boldsymbol{1}^T(\widehat p-p)=0
}
$$

が標本サイズ $n$ に関係なく常に成り立つ。

したがって

$$
\sqrt n(\widehat p-p)
$$

は $\mathbb R^k$ 全体を動くのではなく、

$$
\boxed{
\mathcal H
=\{x\in\mathbb R^k:\boldsymbol{1}^Tx=0\}
}
$$

という $(k-1)$ 次元超平面の上だけを動く。

これが特異性の幾何学的な理由である。

行列計算でも

$$
\begin{aligned}
\Sigma\boldsymbol{1}
&=\{\operatorname{diag}(p)-pp^T\}\boldsymbol{1}\\
&=p-p(\boldsymbol{1}^Tp)\\
&=p-p\\
&=0.
\end{aligned}
$$

従って

$$
\boldsymbol{1}\in\operatorname{Null}(\Sigma).
$$

さらに任意の $a$ について

$$
a^T\Sigma a
=\operatorname{Var}(a_{C_r})\ge0.
$$

$a^T\Sigma a=0$ となるのは、$a_{C_r}$ が確率1で定数となるときである。

全ての $p_i>0$ だから全カテゴリが正の確率で起こり得る。従って

$$
a_1=a_2=\cdots=a_k
$$

でなければ分散0にはならない。

すなわち

$$
\boxed{
\operatorname{Null}(\Sigma)
=\operatorname{span}\{\boldsymbol{1}\}
}.
$$

零空間の次元が1なので、階数・退化次数の定理から

$$
\boxed{
\operatorname{rank}(\Sigma)=k-1
}.
$$

ここで重要なのは、

$$
N_k(0,\Sigma)
$$

と書いても誤りではないことである。

$\Sigma$ が特異なら、これは $\mathbb R^k$ に通常の密度を持つ非退化正規分布ではなく、超平面 $\mathcal H$ 上に集中する **退化多変量正規分布** を表す。

この「自由に動ける方向が $k-1$ 個しかない」という事実は、多項分布に基づく適合度検定で自由度 $k-1$ が現れる背景でもある。

---

### 4. 1成分を落とすと非退化になる

第 $k$ 成分は

$$
\widehat p_k
=1-\sum_{i=1}^{k-1}\widehat p_i
$$

で完全に決まる。

従って独立な情報を表すには、最初の $k-1$ 成分だけを残せばよい。

$$
q=(p_1,\ldots,p_{k-1})^T
$$

と置くと、$\widehat p^{(-k)}$ の漸近共分散行列は $\Sigma$ の左上 $(k-1)\times(k-1)$ ブロックだから

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

これが非退化であることを確認する。

任意の $b\in\mathbb R^{k-1}$ に対し、

$$
\begin{aligned}
b^T\Sigma_{-k}b
&=\sum_{i=1}^{k-1}p_i b_i^2
-\left(\sum_{i=1}^{k-1}p_i b_i\right)^2.
\end{aligned}
$$

これは、第 $k$ カテゴリに値0を割り当てた確率変数

$$
W=
\begin{cases}
b_i,&C_r=i,\quad i=1,\ldots,k-1,\\
0,&C_r=k
\end{cases}
$$

の分散である。

$p_k>0$ であり、さらに全ての $p_i>0$ だから、$\operatorname{Var}(W)=0$ なら $W$ は全カテゴリで同じ定数でなければならない。第 $k$ カテゴリで値0なので、その定数は0であり

$$
b_1=\cdots=b_{k-1}=0.
$$

従って $b\ne0$ なら

$$
b^T\Sigma_{-k}b>0.
$$

すなわち

$$
\boxed{
\Sigma_{-k}\text{ は正定値}
}
$$

であり、$(k-1)$ 次元では通常の非退化多変量正規分布になる。

---

### 5. $k=3$ の具体例

$$
p_1=\frac12,
\qquad
p_2=\frac13,
\qquad
p_3=\frac16.
$$

最初の2成分の漸近共分散行列は

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
p_1(1-p_1)
=\frac12\cdot\frac12
=\frac14,
$$

$$
p_2(1-p_2)
=\frac13\cdot\frac23
=\frac29,
$$

$$
-p_1p_2
=-\frac12\cdot\frac13
=-\frac16.
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
=\frac1{18}-\frac1{36}
=\frac1{36}>0
$$

なので、実際にこの2次元共分散行列は非退化である。

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
&=\frac12+\frac13
-\left(\frac12-\frac13\right)^2\\
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

同じ結果は2次元共分散行列から

$$
\operatorname{Var}(X-Y)
=\operatorname{Var}(X)+\operatorname{Var}(Y)-2\operatorname{Cov}(X,Y)
$$

として

$$
\frac14+\frac29-2\left(-\frac16\right)
=\frac{29}{36}
$$

と求めてもよい。

---

## この問題で押さえる構造

多項分布では次の流れを一つのまとまりとして理解する。

$$
\boxed{
\text{カテゴリ試行}
\to
\text{one-hot ベクトル}
\to
\Sigma=\operatorname{diag}(p)-pp^T
\to
\text{1変量CLT}
\to
\text{Cramér--Wold}
\to
\text{退化多変量正規}
}
$$

また

$$
\sum_{i=1}^k\widehat p_i=1
$$

という1本の線形制約があるため、自由に変動できる方向は $k$ 個ではなく $k-1$ 個である。

これが

- 共分散行列の階数が $k-1$
- 1カテゴリを落とすと非退化になる
- 多項分布の適合度検定で $k-1$ が基準になる

という複数の事実の共通原因である。

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

1変量CLTより

$$
a^T\sqrt n(\widehat p-p)
\xrightarrow{d}N(0,a^T\Sigma a).
$$

任意の $a$ で成立するので Cramér--Wold より

$$
\sqrt n(\widehat p-p)
\xrightarrow{d}N_k(0,\Sigma).
$$

一方

$$
\boldsymbol{1}^T(\widehat p-p)=0
$$

が恒等的に成り立ち、

$$
\Sigma\boldsymbol{1}=0.
$$

また

$$
a^T\Sigma a
=\operatorname{Var}(a_{C_r})
$$

だから、全ての $p_i>0$ の下では分散0となるのは $a$ が定数ベクトルのときだけ。従って

$$
\operatorname{Null}(\Sigma)=\operatorname{span}\{\boldsymbol1\},
\qquad
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
\end{pmatrix}.
$$

$a=(1,-1,0)^T$ とすれば

$$
a^T\Sigma a
=p_1+p_2-(p_1-p_2)^2
=\boxed{\frac{29}{36}}.
$$

---

## 採点基準

- one-hot 表現から平均・共分散行列を定義通り導出: 5点
- 任意の線形結合に1変量CLTを適用し、Cramér--Wold で多変量CLTを導出: 5点
- 成分和制約、零空間、階数 $k-1$、退化正規の説明: 4点
- 1成分を落とした共分散行列と正定値性: 3点
- $k=3$ の具体的共分散行列・コントラスト分散: 3点
