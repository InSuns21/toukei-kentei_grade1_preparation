# 計算基礎体力 — 統計検定1級のための微積・線形代数ドリル

このページは、**高校数学の基本事項は使え、大学初年度の微積分・線形代数を一度履修したが、手計算の手順はかなり忘れている**読者向けの再起動ドリルです。

概念そのものが初見だったり、「なぜその式を使うのか」が分からなかったりする場合は、先に [F0-00 統計検定1級のための数学速習](../F0_00_統計検定1級のための数学速習/index.md) を読んでください。このページでは理論を講義し直すのではなく、**短い計算を何本も回して、統計問題の途中で手が止まらない状態へ戻す**ことを狙います。

## 0. このページの回し方

このページは通読教材ではありません。紙とペンを出して、次の順で回します。

1. **1周目：正確性重視** — 各小問を自力で解き、途中式も残す。
2. **2周目：時間制限** — Aドリルは1小問90秒、Bドリルは1小問2〜3分を目安にする。
3. **3周目：誤答だけ** — 間違えた小問だけ翌日もう一度解く。
4. 同じ型を3回連続で正解できたら、その型はいったん卒業する。

答えを読んで理解しただけでは終了にしません。**問題文を見て最初の一手が5〜10秒で出ること**を目標にします。

### 診断

次の8項目を紙で計算してください。開始方法が出てこなければ、右のドリルから始めます。

| 診断 | 対応ドリル |
|---|---|
| 積・合成関数を含む微分を3本続けて処理する | F0M-A18 |
| 置換積分・部分積分・ガンマ型積分を見分ける | F0M-A19 |
| 行列積・行列式・2次逆行列を処理する | F0M-A20 |
| 掃き出し・階数・連立方程式・3次逆行列を処理する | F0M-A21 |
| 2次行列の固有値・固有ベクトルを処理する | F0M-A22 |
| 二次形式・正定値・勾配・ヘッセ行列を処理する | F0M-A22, A23 |
| 正規方程式・Cholesky分解を数値で処理する | F0M-B12, B13 |
| 逆変換・領域・ヤコビアンをセットで出す | F0M-B14 |

---

## 1. 最初の一手だけ固定する

| 計算 | 最初の一手 |
|---|---|
| 積・合成関数の微分 | 「積か」「外側と内側は何か」を先に分ける |
| 置換積分 | 内側の式を $u$ と置き、$du$ が被積分関数に現れるか見る |
| 部分積分 | 微分すると簡単になる側を $u$ にする |
| 行列積 | サイズを書き、内側の次元が一致するか確認する |
| 行列式 | 2次なら公式、3次なら展開または三角化 |
| 逆行列 | 2次なら公式、3次なら $[A\mid I]$ を掃き出す |
| 連立方程式・階数 | 拡大係数行列を書き、ピボット数を見る |
| 固有値 | $\det(A-\lambda I)=0$ |
| 固有ベクトル | $(A-\lambda I)v=0$ |
| 正定値性 | 平方完成・固有値・首座小行列式のうち短いものを選ぶ |
| 勾配・ヘッセ行列 | 成分ごとに1階偏微分し、さらにもう1回偏微分する |
| 最小二乗 | $X^{\mathsf T}X\widehat\beta=X^{\mathsf T}y$ |
| Cholesky | 下三角 $L$ を置き、$LL^{\mathsf T}=A$ を左上から比較する |
| ヤコビアン | 逆変換 → 新しい範囲 → 行列式の絶対値 |

---

# 2. Aドリル：基礎計算30問

## F0M-A18 微分5連打

- Level: A
- 目安時間: 7分
- 主題: 積・商・合成関数の微分

次を微分せよ。

1. $x^3e^{-2x}$
2. $\log(1+3x^2)$
3. $(1+x^2)^{-3/2}$
4. $\dfrac{x}{1+x}$
5. $e^{x^2+2x}$

<!-- solution-start -->

### 解答

#### 詳細解答

1. 積の微分を使う。$x^3$ と $e^{-2x}$ をそれぞれ微分すると
   $$
   \frac{d}{dx}x^3=3x^2,
   \qquad
   \frac{d}{dx}e^{-2x}=-2e^{-2x}.
   $$
   したがって
   $$
   \begin{aligned}
   \frac{d}{dx}(x^3e^{-2x})
   &=3x^2e^{-2x}+x^3(-2e^{-2x})\\
   &=3x^2e^{-2x}-2x^3e^{-2x}\\
   &=\boxed{x^2(3-2x)e^{-2x}}.
   \end{aligned}
   $$
2. 外側を $\log u$、内側を $u=1+3x^2$ と見ると
   $$
   \frac{du}{dx}=6x.
   $$
   よって合成関数の微分から
   $$
   \frac{d}{dx}\log(1+3x^2)
   =\frac{1}{1+3x^2}\cdot6x
   =\boxed{\frac{6x}{1+3x^2}}.
   $$
3. 外側を $u^{-3/2}$、内側を $u=1+x^2$ と見ると
   $$
   \frac{d}{du}u^{-3/2}
   =-\frac32u^{-5/2},
   \qquad
   \frac{du}{dx}=2x.
   $$
   したがって
   $$
   \frac{d}{dx}(1+x^2)^{-3/2}
   =-\frac32(1+x^2)^{-5/2}\cdot2x
   =\boxed{-3x(1+x^2)^{-5/2}}.
   $$
4. 商の微分
   $$
   \left(\frac{f}{g}\right)'
   =\frac{f'g-fg'}{g^2}
   $$
   に $f=x$, $g=1+x$ を代入すると
   $$
   \frac{d}{dx}\frac{x}{1+x}
   =\frac{1\cdot(1+x)-x\cdot1}{(1+x)^2}
   =\boxed{\frac1{(1+x)^2}}.
   $$
5. 指数部を $u=x^2+2x$ と置くと
   $$
   \frac{du}{dx}=2x+2.
   $$
   よって
   $$
   \frac{d}{dx}e^{x^2+2x}
   =e^{x^2+2x}(2x+2)
   =\boxed{2(x+1)e^{x^2+2x}}.
   $$

#### 本番答案

$$
\boxed{x^2(3-2x)e^{-2x}},\quad
\boxed{\frac{6x}{1+3x^2}},\quad
\boxed{-3x(1+x^2)^{-5/2}},
$$

$$
\boxed{\frac1{(1+x)^2}},\quad
\boxed{2(x+1)e^{x^2+2x}}.
$$

#### 採点基準

各小問4点。計20点。

<!-- solution-end -->

## F0M-A19 積分5連打

- Level: A
- 目安時間: 9分
- 主題: 置換積分・部分積分・ガンマ型積分・ガウス積分

次を求めよ。

1. $\displaystyle \int_0^1 2x(1+x^2)^3\,dx$
2. $\displaystyle \int_0^\infty xe^{-3x}\,dx$
3. $\displaystyle \int_0^\infty x^2e^{-2x}\,dx$
4. $\displaystyle \int_0^1 x\log x\,dx$
5. $\displaystyle \int_{-\infty}^{\infty}e^{-2x^2}\,dx$

<!-- solution-start -->

### 解答

#### 詳細解答

1. $u=1+x^2$ と置く。すると
   $$
   du=2x\,dx,
   \qquad
   x=0\Rightarrow u=1,
   \qquad
   x=1\Rightarrow u=2.
   $$
   よって
   $$
   \begin{aligned}
   \int_0^1 2x(1+x^2)^3\,dx
   &=\int_1^2u^3\,du\\
   &=\left[\frac{u^4}{4}\right]_1^2\\
   &=\frac{16-1}{4}
   =\boxed{\frac{15}{4}}.
   \end{aligned}
   $$
2. 部分積分を使う。$u=x$, $dv=e^{-3x}dx$ と置けば
   $$
   du=dx,
   \qquad
   v=-\frac13e^{-3x}.
   $$
   したがって
   $$
   \begin{aligned}
   \int_0^\infty xe^{-3x}\,dx
   &=\left[-\frac{x}{3}e^{-3x}\right]_0^\infty
     +\frac13\int_0^\infty e^{-3x}\,dx.
   \end{aligned}
   $$
   $x e^{-3x}\to0$ より境界項は0であり、
   $$
   \frac13\int_0^\infty e^{-3x}\,dx
   =\frac13\left[-\frac13e^{-3x}\right]_0^\infty
   =\boxed{\frac19}.
   $$
3. $t=2x$ と置くと
   $$
   x=\frac t2,
   \qquad
   dx=\frac12dt.
   $$
   よって
   $$
   \begin{aligned}
   \int_0^\infty x^2e^{-2x}\,dx
   &=\frac18\int_0^\infty t^2e^{-t}\,dt\\
   &=\frac18\Gamma(3)\\
   &=\frac18\cdot2!
   =\boxed{\frac14}.
   \end{aligned}
   $$
4. 部分積分で
   $$
   u=\log x,
   \qquad
   dv=x\,dx,
   \qquad
   du=\frac1x dx,
   \qquad
   v=\frac{x^2}{2}
   $$
   とする。すると
   $$
   \begin{aligned}
   \int_0^1x\log x\,dx
   &=\left[\frac{x^2}{2}\log x\right]_0^1
     -\frac12\int_0^1x\,dx.
   \end{aligned}
   $$
   $x^2\log x\to0\ (x\downarrow0)$ なので境界項は0であり、
   $$
   -\frac12\int_0^1x\,dx
   =-\frac12\left[\frac{x^2}{2}\right]_0^1
   =\boxed{-\frac14}.
   $$
5. $u=\sqrt2\,x$ と置くと $dx=du/\sqrt2$ なので
   $$
   \begin{aligned}
   \int_{-\infty}^{\infty}e^{-2x^2}\,dx
   &=\frac1{\sqrt2}
     \int_{-\infty}^{\infty}e^{-u^2}\,du\\
   &=\frac1{\sqrt2}\sqrt\pi
   =\boxed{\sqrt{\frac\pi2}}.
   \end{aligned}
   $$
   最後に標準ガウス積分
   $\int_{-\infty}^{\infty}e^{-u^2}du=\sqrt\pi$
   を使った。

#### 本番答案

$$
\boxed{\frac{15}{4}},\quad
\boxed{\frac19},\quad
\boxed{\frac14},\quad
\boxed{-\frac14},\quad
\boxed{\sqrt{\frac\pi2}}.
$$

#### 採点基準

各小問4点。計20点。

<!-- solution-end -->

## F0M-A20 行列の基本5連打

- Level: A
- 目安時間: 8分
- 主題: 行列積・転置・行列式・2次逆行列

次を求めよ。

1. $A\in\mathbb R^{2\times3},B\in\mathbb R^{3\times2}$ のとき、$AB,BA$ のサイズ。
2. $\begin{pmatrix}1&2\\0&1\end{pmatrix}\begin{pmatrix}2&0\\-1&3\end{pmatrix}$。
3. $\det\begin{pmatrix}3&1\\2&4\end{pmatrix}$。
4. $\begin{pmatrix}2&1\\1&1\end{pmatrix}^{-1}$。
5. $C=\begin{pmatrix}1&2\\3&4\end{pmatrix}$ に対して $C^{\mathsf T}C$。

<!-- solution-start -->

### 解答

#### 詳細解答

1. 行列積では内側の次元が一致し、外側の次元が積のサイズとして残る。
   $$
   (2\times3)(3\times2)\Rightarrow AB:2\times2,
   $$
   $$
   (3\times2)(2\times3)\Rightarrow BA:3\times3.
   $$
   よって
   $$
   \boxed{AB:2\times2,\qquad BA:3\times3}.
   $$
2. 各成分は「左の行」と「右の列」の内積で求める。
   $$
   \begin{aligned}
   \begin{pmatrix}1&2\\0&1\end{pmatrix}
   \begin{pmatrix}2&0\\-1&3\end{pmatrix}
   &=
   \begin{pmatrix}
   1\cdot2+2(-1) & 1\cdot0+2\cdot3\\
   0\cdot2+1(-1) & 0\cdot0+1\cdot3
   \end{pmatrix}\\
   &=\boxed{\begin{pmatrix}0&6\\-1&3\end{pmatrix}}.
   \end{aligned}
   $$
3. $2\times2$ 行列の行列式より
   $$
   \det\begin{pmatrix}3&1\\2&4\end{pmatrix}
   =3\cdot4-1\cdot2
   =\boxed{10}.
   $$
4. 
   $$
   A=\begin{pmatrix}2&1\\1&1\end{pmatrix}
   $$
   とすると
   $$
   \det A=2\cdot1-1\cdot1=1.
   $$
   したがって $2\times2$ 逆行列の公式から
   $$
   A^{-1}
   =\frac1{\det A}
   \begin{pmatrix}1&-1\\-1&2\end{pmatrix}
   =\boxed{\begin{pmatrix}1&-1\\-1&2\end{pmatrix}}.
   $$
5. まず
   $$
   C^{\mathsf T}
   =\begin{pmatrix}1&3\\2&4\end{pmatrix}.
   $$
   よって
   $$
   \begin{aligned}
   C^{\mathsf T}C
   &=
   \begin{pmatrix}1&3\\2&4\end{pmatrix}
   \begin{pmatrix}1&2\\3&4\end{pmatrix}\\
   &=
   \begin{pmatrix}
   1^2+3^2 & 1\cdot2+3\cdot4\\
   2\cdot1+4\cdot3 & 2^2+4^2
   \end{pmatrix}\\
   &=\boxed{\begin{pmatrix}10&14\\14&20\end{pmatrix}}.
   \end{aligned}
   $$

#### 本番答案

$$
\boxed{2\times2,\ 3\times3},\quad
\boxed{\begin{pmatrix}0&6\\-1&3\end{pmatrix}},\quad
\boxed{10},
$$

$$
\boxed{\begin{pmatrix}1&-1\\-1&2\end{pmatrix}},\quad
\boxed{\begin{pmatrix}10&14\\14&20\end{pmatrix}}.
$$

#### 採点基準

各小問4点。計20点。

<!-- solution-end -->

## F0M-A21 掃き出し・階数5連打

- Level: A
- 目安時間: 12分
- 主題: 連立方程式・階数・逆行列・行列式

次を求めよ。

1. $x+y=3,\ 2x-y=0$ の解。
2. $\operatorname{rank}\begin{pmatrix}1&2&3\\2&4&6\\0&1&1\end{pmatrix}$。
3. $T=\begin{pmatrix}1&1&0\\0&1&1\\0&0&1\end{pmatrix}$ の逆行列。
4. $x+y+z=1,\ 2x+2y+2z=2,\ x-y=0$ の一般解。
5. $\det\begin{pmatrix}1&2&0\\0&3&1\\0&0&-2\end{pmatrix}$。

<!-- solution-start -->

### 解答

#### 詳細解答

1. 第2式
   $$
   2x-y=0
   $$
   から $y=2x$。これを第1式 $x+y=3$ へ代入すると
   $$
   x+2x=3,
   $$
   したがって $x=1$, $y=2$ である。
   $$
   \boxed{(x,y)=(1,2)}.
   $$
2. 行基本変形で
   $$
   \begin{pmatrix}
   1&2&3\\
   2&4&6\\
   0&1&1
   \end{pmatrix}
   \xrightarrow{R_2\leftarrow R_2-2R_1}
   \begin{pmatrix}
   1&2&3\\
   0&0&0\\
   0&1&1
   \end{pmatrix}.
   $$
   非零行は2本で、第1行と第3行は独立なので
   $$
   \boxed{\operatorname{rank}=2}.
   $$
3. 拡大行列 $[T\mid I]$ から始める。
   $$
   \left(
   \begin{array}{ccc|ccc}
   1&1&0&1&0&0\\
   0&1&1&0&1&0\\
   0&0&1&0&0&1
   \end{array}
   \right).
   $$
   まず $R_2\leftarrow R_2-R_3$ とすると
   $$
   \left(
   \begin{array}{ccc|ccc}
   1&1&0&1&0&0\\
   0&1&0&0&1&-1\\
   0&0&1&0&0&1
   \end{array}
   \right).
   $$
   次に $R_1\leftarrow R_1-R_2$ とすると
   $$
   \left(
   \begin{array}{ccc|ccc}
   1&0&0&1&-1&1\\
   0&1&0&0&1&-1\\
   0&0&1&0&0&1
   \end{array}
   \right).
   $$
   左側が $I$ になったので
   $$
   \boxed{
   T^{-1}=
   \begin{pmatrix}
   1&-1&1\\
   0&1&-1\\
   0&0&1
   \end{pmatrix}}.
   $$
4. 第3式 $x-y=0$ から $x=y$。そこで
   $$
   x=y=t
   $$
   と置く。第1式へ代入すると
   $$
   t+t+z=1,
   $$
   したがって
   $$
   z=1-2t.
   $$
   第2式は第1式の2倍なので新しい条件を与えない。よって
   $$
   \boxed{(x,y,z)=(t,t,1-2t),\quad t\in\mathbb R}.
   $$
5. 上三角行列の行列式は対角成分の積なので
   $$
   \det\begin{pmatrix}1&2&0\\0&3&1\\0&0&-2\end{pmatrix}
   =1\cdot3\cdot(-2)
   =\boxed{-6}.
   $$

#### 本番答案

$$
\boxed{(1,2)},\quad
\boxed{2},\quad
\boxed{\begin{pmatrix}1&-1&1\\0&1&-1\\0&0&1\end{pmatrix}},
$$

$$
\boxed{(t,t,1-2t)},\quad
\boxed{-6}.
$$

#### 採点基準

各小問4点。計20点。

<!-- solution-end -->

## F0M-A22 固有値・二次形式5連打

- Level: A
- 目安時間: 10分
- 主題: 固有値・固有ベクトル・正定値・二次形式

次を求めよ。

1. $E=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ の固有値。
2. 第1問の各固有値に対応する固有ベクトルを1本ずつ。
3. $Q=\begin{pmatrix}3&-1\\-1&2\end{pmatrix}$ が正定値か判定する。
4. $R=\begin{pmatrix}1&2\\2&1\end{pmatrix}$ が正定値・半正定値・不定値のどれか判定する。
5. $A=\operatorname{diag}(4,1)$ に対し、$\|x\|=1$ の下で $x^{\mathsf T}Ax$ の最大値。

<!-- solution-start -->

### 解答

#### 詳細解答

1. 特性方程式を作る。
   $$
   \begin{aligned}
   \det(E-\lambda I)
   &=
   \det\begin{pmatrix}
   4-\lambda&1\\
   2&3-\lambda
   \end{pmatrix}\\
   &=(4-\lambda)(3-\lambda)-2\\
   &=\lambda^2-7\lambda+10\\
   &=(\lambda-5)(\lambda-2).
   \end{aligned}
   $$
   よって
   $$
   \boxed{\lambda=5,2}.
   $$
2. $\lambda=5$ のとき
   $$
   (E-5I)v
   =
   \begin{pmatrix}-1&1\\2&-2\end{pmatrix}
   \begin{pmatrix}v_1\\v_2\end{pmatrix}
   =0.
   $$
   したがって $-v_1+v_2=0$、すなわち $v_2=v_1$ なので、例えば
   $$
   v_5=\begin{pmatrix}1\\1\end{pmatrix}.
   $$
   $\lambda=2$ のとき
   $$
   (E-2I)v
   =
   \begin{pmatrix}2&1\\2&1\end{pmatrix}
   \begin{pmatrix}v_1\\v_2\end{pmatrix}
   =0.
   $$
   したがって $2v_1+v_2=0$ なので、例えば
   $$
   v_2=\begin{pmatrix}1\\-2\end{pmatrix}.
   $$
   よって
   $$
   \boxed{
   v_5=(1,1)^{\mathsf T},
   \qquad
   v_2=(1,-2)^{\mathsf T}}.
   $$
3. 対称 $2\times2$ 行列について首座小行列式を調べる。
   $$
   \Delta_1=3>0,
   \qquad
   \Delta_2=\det Q=3\cdot2-(-1)^2=5>0.
   $$
   Sylvester の判定法より
   $$
   \boxed{Q\text{ は正定値}}.
   $$
4. 特性方程式は
   $$
   \begin{aligned}
   \det(R-\lambda I)
   &=(1-\lambda)^2-4\\
   &=\lambda^2-2\lambda-3\\
   &=(\lambda-3)(\lambda+1).
   \end{aligned}
   $$
   固有値は $3$ と $-1$ で正負が混在する。したがって
   $$
   \boxed{R\text{ は不定値}}.
   $$
5. $x=(x_1,x_2)^{\mathsf T}$ とすると
   $$
   x^{\mathsf T}Ax=4x_1^2+x_2^2.
   $$
   制約 $\|x\|=1$ は $x_1^2+x_2^2=1$ なので
   $$
   4x_1^2+x_2^2
   =1+3x_1^2
   \le 4.
   $$
   $x_1=\pm1$, $x_2=0$ で等号が成り立つから
   $$
   \boxed{\max_{\|x\|=1}x^{\mathsf T}Ax=4}.
   $$

#### 本番答案

$$
\boxed{5,2},\quad
\boxed{(1,1)^{\mathsf T},(1,-2)^{\mathsf T}},\quad
\boxed{Q\text{ は正定値}},
$$

$$
\boxed{R\text{ は不定値}},\quad
\boxed{4}.
$$

#### 採点基準

各小問4点。計20点。

<!-- solution-end -->

## F0M-A23 多変数微分5連打

- Level: A
- 目安時間: 10分
- 主題: 勾配・ヘッセ行列・停留点・ラグランジュ未定乗数法

次を求めよ。

1. $f(x,y)=x^2+xy+2y^2$ の勾配。
2. 第1問のヘッセ行列。
3. $g(x,y)=x^2+xy+y^2-3x$ の停留点。
4. 制約 $x+y=4$ の下で $x^2+y^2$ を最小にする点と最小値。
5. $A=\begin{pmatrix}2&1\\1&3\end{pmatrix}$、$z=(x,y)^{\mathsf T}$ とするとき $\nabla_z(z^{\mathsf T}Az)$。

<!-- solution-start -->

### 解答

#### 詳細解答

1. $x$ と $y$ でそれぞれ偏微分する。
   $$
   \frac{\partial f}{\partial x}
   =2x+y,
   \qquad
   \frac{\partial f}{\partial y}
   =x+4y.
   $$
   よって
   $$
   \boxed{\nabla f=(2x+y, x+4y)^{\mathsf T}}.
   $$
2. 1階偏微分をさらに偏微分する。
   $$
   \frac{\partial^2f}{\partial x^2}=2,
   \qquad
   \frac{\partial^2f}{\partial x\partial y}=1,
   $$
   $$
   \frac{\partial^2f}{\partial y\partial x}=1,
   \qquad
   \frac{\partial^2f}{\partial y^2}=4.
   $$
   したがって
   $$
   \boxed{H_f=\begin{pmatrix}2&1\\1&4\end{pmatrix}}.
   $$
3. 停留点では $\nabla g=0$ なので
   $$
   2x+y-3=0,
   \qquad
   x+2y=0.
   $$
   第2式から $x=-2y$。これを第1式へ代入すると
   $$
   -4y+y-3=0,
   $$
   よって $y=-1$, $x=2$。したがって
   $$
   \boxed{(x,y)=(2,-1)}.
   $$
4. 制約を
   $$
   h(x,y)=x+y-4=0
   $$
   とし、
   $$
   L(x,y,\lambda)
   =x^2+y^2-\lambda(x+y-4)
   $$
   を置く。停留条件は
   $$
   \frac{\partial L}{\partial x}=2x-\lambda=0,
   \qquad
   \frac{\partial L}{\partial y}=2y-\lambda=0,
   $$
   $$
   \frac{\partial L}{\partial\lambda}=-(x+y-4)=0.
   $$
   最初の2式から $x=y$、制約から $2x=4$ なので
   $$
   x=y=2.
   $$
   また制約上では
   $$
   x^2+y^2
   =\frac{(x+y)^2+(x-y)^2}{2}
   =8+\frac{(x-y)^2}{2}\ge8,
   $$
   なのでこの点が確かに最小点である。よって
   $$
   \boxed{(x,y)=(2,2),\qquad \min(x^2+y^2)=8}.
   $$
5. まず二次形式を成分で展開する。
   $$
   \begin{aligned}
   z^{\mathsf T}Az
   &=
   \begin{pmatrix}x&y\end{pmatrix}
   \begin{pmatrix}2&1\\1&3\end{pmatrix}
   \begin{pmatrix}x\\y\end{pmatrix}\\
   &=
   \begin{pmatrix}x&y\end{pmatrix}
   \begin{pmatrix}2x+y\\x+3y\end{pmatrix}\\
   &=2x^2+2xy+3y^2.
   \end{aligned}
   $$
   したがって
   $$
   \frac{\partial}{\partial x}(z^{\mathsf T}Az)=4x+2y,
   \qquad
   \frac{\partial}{\partial y}(z^{\mathsf T}Az)=2x+6y.
   $$
   よって
   $$
   \boxed{\nabla_z(z^{\mathsf T}Az)
   =(4x+2y, 2x+6y)^{\mathsf T}}.
   $$

#### 本番答案

$$
\boxed{(2x+y,x+4y)^{\mathsf T}},\quad
\boxed{\begin{pmatrix}2&1\\1&4\end{pmatrix}},\quad
\boxed{(2,-1)},
$$

$$
\boxed{(2,2),\ 8},\quad
\boxed{(4x+2y,2x+6y)^{\mathsf T}}.
$$

#### 採点基準

各小問4点。計20点。

<!-- solution-end -->

---

# 3. Bドリル：統計へつなぐ12問

## F0M-B12 正規方程式4連打

- Level: B
- 目安時間: 12分
- 主題: 最小二乗法・残差直交性

$$
X=\begin{pmatrix}1&0\\1&1\\1&2\end{pmatrix},
\qquad
y=\begin{pmatrix}1\\2\\2\end{pmatrix}
$$

とする。

1. $X^{\mathsf T}X$ を求めよ。
2. $X^{\mathsf T}y$ を求めよ。
3. 正規方程式から $\widehat\beta$ を求めよ。
4. $r=y-X\widehat\beta$ を求め、$X^{\mathsf T}r=0$ を確認せよ。

<!-- solution-start -->

### 解答

#### 詳細解答

1. 
   $$
   X^{\mathsf T}
   =
   \begin{pmatrix}
   1&1&1\\
   0&1&2
   \end{pmatrix}.
   $$
   したがって
   $$
   \begin{aligned}
   X^{\mathsf T}X
   &=
   \begin{pmatrix}
   1&1&1\\
   0&1&2
   \end{pmatrix}
   \begin{pmatrix}
   1&0\\
   1&1\\
   1&2
   \end{pmatrix}\\
   &=
   \begin{pmatrix}
   1+1+1 & 0+1+2\\
   0+1+2 & 0^2+1^2+2^2
   \end{pmatrix}\\
   &=\boxed{\begin{pmatrix}3&3\\3&5\end{pmatrix}}.
   \end{aligned}
   $$
2. 同様に
   $$
   \begin{aligned}
   X^{\mathsf T}y
   &=
   \begin{pmatrix}
   1&1&1\\
   0&1&2
   \end{pmatrix}
   \begin{pmatrix}1\\2\\2\end{pmatrix}\\
   &=
   \begin{pmatrix}
   1+2+2\\
   0\cdot1+1\cdot2+2\cdot2
   \end{pmatrix}
   =\boxed{\begin{pmatrix}5\\6\end{pmatrix}}.
   \end{aligned}
   $$
3. $\widehat\beta=(\widehat\beta_0,\widehat\beta_1)^{\mathsf T}$ と書くと、正規方程式は
   $$
   \begin{pmatrix}3&3\\3&5\end{pmatrix}
   \begin{pmatrix}\widehat\beta_0\\\widehat\beta_1\end{pmatrix}
   =
   \begin{pmatrix}5\\6\end{pmatrix},
   $$
   すなわち
   $$
   3\widehat\beta_0+3\widehat\beta_1=5,
   \qquad
   3\widehat\beta_0+5\widehat\beta_1=6.
   $$
   第2式から第1式を引くと
   $$
   2\widehat\beta_1=1,
   $$
   よって
   $$
   \widehat\beta_1=\frac12.
   $$
   これを第1式へ戻すと
   $$
   3\widehat\beta_0+\frac32=5,
   \qquad
   3\widehat\beta_0=\frac72,
   $$
   したがって
   $$
   \boxed{
   \widehat\beta=
   \left(\frac76,\frac12\right)^{\mathsf T}}.
   $$
4. まず当てはめ値を計算する。
   $$
   X\widehat\beta
   =
   \begin{pmatrix}
   1&0\\
   1&1\\
   1&2
   \end{pmatrix}
   \begin{pmatrix}7/6\\1/2\end{pmatrix}
   =
   \begin{pmatrix}
   7/6\\
   5/3\\
   13/6
   \end{pmatrix}.
   $$
   よって残差は
   $$
   r
   =y-X\widehat\beta
   =
   \begin{pmatrix}
   1-7/6\\
   2-5/3\\
   2-13/6
   \end{pmatrix}
   =
   \boxed{
   \begin{pmatrix}
   -1/6\\1/3\\-1/6
   \end{pmatrix}}.
   $$
   最後に
   $$
   \begin{aligned}
   X^{\mathsf T}r
   &=
   \begin{pmatrix}
   1&1&1\\
   0&1&2
   \end{pmatrix}
   \begin{pmatrix}-1/6\\1/3\\-1/6\end{pmatrix}\\
   &=
   \begin{pmatrix}
   -1/6+1/3-1/6\\
   1/3-2/6
   \end{pmatrix}
   =\boxed{\begin{pmatrix}0\\0\end{pmatrix}}.
   \end{aligned}
   $$

#### 本番答案

$$
\boxed{X^{\mathsf T}X=\begin{pmatrix}3&3\\3&5\end{pmatrix}},\quad
\boxed{X^{\mathsf T}y=(5,6)^{\mathsf T}},
$$

$$
\boxed{\widehat\beta=(7/6,1/2)^{\mathsf T}},\quad
\boxed{r=(-1/6,1/3,-1/6)^{\mathsf T}},\quad X^{\mathsf T}r=0.
$$

#### 採点基準

各小問5点。計20点。

<!-- solution-end -->

## F0M-B13 正定値・Cholesky4連打

- Level: B
- 目安時間: 12分
- 主題: 正定値・Cholesky分解・連立方程式

$$
A=\begin{pmatrix}4&2\\2&5\end{pmatrix}
$$

とする。

1. $A$ が正定値であることを首座小行列式で確認せよ。
2. $A=LL^{\mathsf T}$ を満たす対角成分が正の下三角行列 $L$ を求めよ。
3. $Az=(6,7)^{\mathsf T}$ を解け。
4. $u=(1,-1)^{\mathsf T}$ に対して $u^{\mathsf T}Au$ を求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

1. $A$ は対称行列である。首座小行列式は
   $$
   \Delta_1=4>0,
   \qquad
   \Delta_2=\det A=4\cdot5-2\cdot2=16>0.
   $$
   Sylvester の判定法より
   $$
   \boxed{A\text{ は正定値}}.
   $$
2. 
   $$
   L=
   \begin{pmatrix}
   \ell_{11}&0\\
   \ell_{21}&\ell_{22}
   \end{pmatrix},
   \qquad
   \ell_{11},\ell_{22}>0
   $$
   と置く。すると
   $$
   LL^{\mathsf T}
   =
   \begin{pmatrix}
   \ell_{11}^2 & \ell_{11}\ell_{21}\\
   \ell_{11}\ell_{21} & \ell_{21}^2+\ell_{22}^2
   \end{pmatrix}.
   $$
   これを
   $$
   \begin{pmatrix}4&2\\2&5\end{pmatrix}
   $$
   と成分ごとに比較する。まず
   $$
   \ell_{11}^2=4
   $$
   で、対角成分を正に取るので $\ell_{11}=2$。次に
   $$
   \ell_{11}\ell_{21}=2
   $$
   から $\ell_{21}=1$。最後に
   $$
   \ell_{21}^2+\ell_{22}^2=5
   $$
   へ $\ell_{21}=1$ を代入すると
   $$
   1+\ell_{22}^2=5,
   $$
   よって $\ell_{22}=2$。したがって
   $$
   \boxed{
   L=\begin{pmatrix}2&0\\1&2\end{pmatrix}}.
   $$
3. 第2問の分解 $A=LL^{\mathsf T}$ を使い、
   $$
   Lw=
   \begin{pmatrix}6\\7\end{pmatrix}
   $$
   を先に解く。
   $$
   \begin{pmatrix}2&0\\1&2\end{pmatrix}
   \begin{pmatrix}w_1\\w_2\end{pmatrix}
   =
   \begin{pmatrix}6\\7\end{pmatrix}.
   $$
   したがって
   $$
   2w_1=6,
   \qquad
   w_1+2w_2=7,
   $$
   なので $w_1=3$, $w_2=2$。次に
   $$
   L^{\mathsf T}z=w
   $$
   を解く。
   $$
   \begin{pmatrix}2&1\\0&2\end{pmatrix}
   \begin{pmatrix}x\\y\end{pmatrix}
   =
   \begin{pmatrix}3\\2\end{pmatrix}.
   $$
   下の式から $2y=2$ なので $y=1$、上の式から
   $$
   2x+y=3
   $$
   なので $x=1$。よって
   $$
   \boxed{z=(1,1)^{\mathsf T}}.
   $$
4. まず
   $$
   Au
   =
   \begin{pmatrix}4&2\\2&5\end{pmatrix}
   \begin{pmatrix}1\\-1\end{pmatrix}
   =
   \begin{pmatrix}2\\-3\end{pmatrix}.
   $$
   したがって
   $$
   u^{\mathsf T}Au
   =
   \begin{pmatrix}1&-1\end{pmatrix}
   \begin{pmatrix}2\\-3\end{pmatrix}
   =2+3
   =\boxed{5}.
   $$

#### 本番答案

$$
\boxed{A\text{ は正定値}},\quad
\boxed{L=\begin{pmatrix}2&0\\1&2\end{pmatrix}},\quad
\boxed{z=(1,1)^{\mathsf T}},\quad
\boxed{5}.
$$

#### 採点基準

各小問5点。計20点。

<!-- solution-end -->

## F0M-B14 ヤコビアン4連打

- Level: B
- 目安時間: 12分
- 主題: 逆変換・領域・ヤコビアン・重積分

$$
u=x+y,
\qquad
v=x-y
$$

とし、

$$
R=\{(x,y):0\le x+y\le2,\ -1\le x-y\le1\}
$$

とする。

1. $x,y$ を $u,v$ で表せ。
2. $\left|\partial(x,y)/\partial(u,v)\right|$ を求めよ。
3. $R$ を $uv$ 平面上の領域として表せ。
4. $\displaystyle\iint_R(x+y)\,dx\,dy$ を求めよ。

<!-- solution-start -->

### 解答

#### 詳細解答

1. 加減して
   $$
   \boxed{x=\frac{u+v}{2},\qquad y=\frac{u-v}{2}}.
   $$
2. 
   $$
   \frac{\partial(x,y)}{\partial(u,v)}
   =\det\begin{pmatrix}1/2&1/2\\1/2&-1/2\end{pmatrix}
   =-\frac12,
   $$
   よって
   $$
   \boxed{\left|\frac{\partial(x,y)}{\partial(u,v)}\right|=\frac12}.
   $$
3. 定義そのものから
   $$
   \boxed{0\le u\le2,\qquad-1\le v\le1}.
   $$
4. 被積分関数は $u$ なので
   $$
   \int_0^2\int_{-1}^1u\cdot\frac12\,dv\,du
   =\int_0^2u\,du
   =\boxed{2}.
   $$

#### 本番答案

$$
\boxed{x=(u+v)/2,\ y=(u-v)/2},\quad
\boxed{|J|=1/2},
$$

$$
\boxed{0\le u\le2,\ -1\le v\le1},\quad
\boxed{\iint_R(x+y)dxdy=2}.
$$

#### 採点基準

各小問5点。計20点。

<!-- solution-end -->

---

# 4. タイムアタック用の再走表

問題を増やす目的は「一度解いた種類を増やす」ことではなく、**同じ基本操作を見た瞬間に起動できるようにすること**です。1周目を終えたら、次の時間で再走します。

| セット | 小問数 | 2周目の目標 |
|---|---:|---:|
| F0M-A18 微分 | 5 | 5分 |
| F0M-A19 積分 | 5 | 7分 |
| F0M-A20 行列基礎 | 5 | 6分 |
| F0M-A21 掃き出し・階数 | 5 | 9分 |
| F0M-A22 固有値・二次形式 | 5 | 8分 |
| F0M-A23 多変数微分 | 5 | 8分 |
| F0M-B12 正規方程式 | 4 | 9分 |
| F0M-B13 Cholesky | 4 | 9分 |
| F0M-B14 ヤコビアン | 4 | 9分 |

合計 **42小問** です。

ミスした問題には印を付け、翌日は印の付いた問題だけ解きます。3回連続で自力正解できた問題は外し、苦手型だけ残します。

# 5. 終了チェック

次が止まらなければ、大学初年度の計算技能は統計検定1級の学習を進めるには十分に再起動しています。

- [ ] 積・商・合成関数を含む基本微分を5問連続で処理できる。
- [ ] 置換積分・部分積分・ガンマ型積分を見分けられる。
- [ ] 行列積のサイズを先に確認できる。
- [ ] 2次逆行列は公式、3次程度は掃き出しで処理できる。
- [ ] 掃き出しから階数と連立方程式の解を読める。
- [ ] $2\times2$ 行列なら固有値から固有ベクトルまで計算できる。
- [ ] 二次形式を展開し、正定値・不定値を判定できる。
- [ ] 勾配・ヘッセ行列・停留点を成分から作れる。
- [ ] 正規方程式を数値で最後まで解ける。
- [ ] Cholesky分解を小さい行列で手計算できる。
- [ ] 変数変換で「逆変換・領域・ヤコビアン」をセットで出せる。

ここまでできたら [F0-00 数学速習](../F0_00_統計検定1級のための数学速習/index.md) または通常の確率・推測の章へ戻ります。