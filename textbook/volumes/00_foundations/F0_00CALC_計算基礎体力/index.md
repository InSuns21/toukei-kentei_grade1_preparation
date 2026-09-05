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

1. 積の微分より
   $$
   \frac{d}{dx}(x^3e^{-2x})
   =3x^2e^{-2x}-2x^3e^{-2x}
   =\boxed{x^2(3-2x)e^{-2x}}.
   $$
2. 合成関数の微分より
   $$
   \boxed{\frac{6x}{1+3x^2}}.
   $$
3. べきの微分と合成関数の微分より
   $$
   \boxed{-3x(1+x^2)^{-5/2}}.
   $$
4. 商の微分より
   $$
   \frac{(1+x)-x}{(1+x)^2}
   =\boxed{\frac1{(1+x)^2}}.
   $$
5. 指数部を微分して
   $$
   \boxed{2(x+1)e^{x^2+2x}}.
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

1. $u=1+x^2$ と置くと
   $$
   \int_1^2u^3du
   =\left[\frac{u^4}{4}\right]_1^2
   =\boxed{\frac{15}{4}}.
   $$
2. $\int_0^\infty xe^{-ax}dx=1/a^2$、または部分積分より
   $$
   \boxed{\frac19}.
   $$
3. $t=2x$ と置けば
   $$
   \int_0^\infty x^2e^{-2x}dx
   =\frac1{2^3}\Gamma(3)
   =\frac18\cdot2
   =\boxed{\frac14}.
   $$
4. 部分積分で $u=\log x,dv=x\,dx$ とすると
   $$
   \int_0^1x\log x\,dx
   =\left[\frac{x^2}{2}\log x\right]_0^1
   -\frac12\int_0^1x\,dx
   =\boxed{-\frac14}.
   $$
5. 係数付きガウス積分より
   $$
   \boxed{\sqrt{\frac\pi2}}.
   $$

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

1. 内側の次元を消して
   $$
   \boxed{AB:2\times2,\qquad BA:3\times3}.
   $$
2. 行と列の内積を取って
   $$
   \boxed{\begin{pmatrix}0&6\\-1&3\end{pmatrix}}.
   $$
3. $3\cdot4-1\cdot2$ より
   $$
   \boxed{10}.
   $$
4. 行列式は1なので
   $$
   \boxed{\begin{pmatrix}1&-1\\-1&2\end{pmatrix}}.
   $$
5. 
   $$
   C^{\mathsf T}C
   =\begin{pmatrix}1&3\\2&4\end{pmatrix}
    \begin{pmatrix}1&2\\3&4\end{pmatrix}
   =\boxed{\begin{pmatrix}10&14\\14&20\end{pmatrix}}.
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

1. 第2式から $y=2x$。第1式へ代入して
   $$
   \boxed{(x,y)=(1,2)}.
   $$
2. 第2行は第1行の2倍で、第1行と第3行は独立なので
   $$
   \boxed{\operatorname{rank}=2}.
   $$
3. $[T\mid I]$ を掃き出すと
   $$
   \boxed{T^{-1}=\begin{pmatrix}1&-1&1\\0&1&-1\\0&0&1\end{pmatrix}}.
   $$
4. $x=y=t$ と置けば $z=1-2t$ なので
   $$
   \boxed{(x,y,z)=(t,t,1-2t),\quad t\in\mathbb R}.
   $$
5. 上三角行列なので対角積を取り
   $$
   \boxed{-6}.
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

1. 
   $$
   \det(E-\lambda I)
   =(4-\lambda)(3-\lambda)-2
   =(\lambda-5)(\lambda-2),
   $$
   よって
   $$
   \boxed{\lambda=5,2}.
   $$
2. $\lambda=5$ では $-v_1+v_2=0$、$\lambda=2$ では $2v_1+v_2=0$ なので
   $$
   \boxed{v_5=(1,1)^{\mathsf T},\qquad v_2=(1,-2)^{\mathsf T}}.
   $$
3. $3>0$ かつ $\det Q=5>0$ より
   $$
   \boxed{Q\text{ は正定値}}.
   $$
4. 固有値は $3,-1$ なので符号が混在し
   $$
   \boxed{R\text{ は不定値}}.
   $$
5. 単位ベクトル上の最大値は最大固有値なので
   $$
   \boxed{4}.
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

1. 成分ごとに偏微分して
   $$
   \boxed{\nabla f=(2x+y,\ x+4y)^{\mathsf T}}.
   $$
2. さらに偏微分して
   $$
   \boxed{H_f=\begin{pmatrix}2&1\\1&4\end{pmatrix}}.
   $$
3. 
   $$
   2x+y-3=0,\qquad x+2y=0
   $$
   を解いて
   $$
   \boxed{(x,y)=(2,-1)}.
   $$
4. $2x=\lambda,2y=\lambda$ より $x=y$。制約から
   $$
   \boxed{(x,y)=(2,2),\qquad \min(x^2+y^2)=8}.
   $$
5. $A$ は対称なので
   $$
   \nabla_z(z^{\mathsf T}Az)=2Az
   =\boxed{(4x+2y,\ 2x+6y)^{\mathsf T}}.
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
   \boxed{X^{\mathsf T}X=\begin{pmatrix}3&3\\3&5\end{pmatrix}}.
   $$
2. 
   $$
   \boxed{X^{\mathsf T}y=\begin{pmatrix}5\\6\end{pmatrix}}.
   $$
3. 
   $$
   \begin{pmatrix}3&3\\3&5\end{pmatrix}\widehat\beta
   =\begin{pmatrix}5\\6\end{pmatrix}
   $$
   を解き
   $$
   \boxed{\widehat\beta=(7/6,1/2)^{\mathsf T}}.
   $$
4. 
   $$
   \boxed{r=(-1/6,1/3,-1/6)^{\mathsf T}},
   $$
   したがって
   $$
   X^{\mathsf T}r
   =\begin{pmatrix}-1/6+1/3-1/6\\1/3-2/6\end{pmatrix}
   =\boxed{0}.
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

1. 
   $$
   \Delta_1=4>0,\qquad \Delta_2=20-4=16>0,
   $$
   よって
   $$
   \boxed{A\text{ は正定値}}.
   $$
2. 
   $$
   L=\begin{pmatrix}\ell_{11}&0\\\ell_{21}&\ell_{22}\end{pmatrix}
   $$
   と置くと $\ell_{11}=2,\ell_{21}=1,\ell_{22}=2$ なので
   $$
   \boxed{L=\begin{pmatrix}2&0\\1&2\end{pmatrix}}.
   $$
3. 
   $$
   4x+2y=6,\qquad2x+5y=7
   $$
   より
   $$
   \boxed{z=(1,1)^{\mathsf T}}.
   $$
4. 
   $$
   Au=(2,-3)^{\mathsf T}
   $$
   なので
   $$
   \boxed{u^{\mathsf T}Au=5}.
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