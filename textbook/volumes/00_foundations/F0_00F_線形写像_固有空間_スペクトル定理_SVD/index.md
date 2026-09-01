# F0-00F 線形写像・固有空間・スペクトル定理・SVD

前の [F0-00E](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md) では、ベクトル空間・基底・直交化・射影を有限次元で組み立てました。

この補講では、行列を

> 基底を選んだ線形写像の座標表示

として読み直し、

$$
\boxed{
\text{線形写像}
\to
\text{核・像}
\to
\text{固有空間}
\to
\text{スペクトル定理}
\to
\text{SVD}
\to
\text{作用素ノルム}
}
$$

へ進みます。

F0-00では「実対称行列は直交対角化できる」を使いましたが、ここでは **なぜ正規直交固有基底を取れるのか** まで戻ります。

---

## 1. 線形写像と行列

ベクトル空間 $V,W$ の間の写像

$$
T:V\to W
$$

が

$$
T(ax+by)=aT(x)+bT(y)
$$

を満たすとき、$T$ を **線形写像** といいます。

$V=\mathbb R^n$、$W=\mathbb R^m$ で標準基底を使えば

$$
T(x)=Ax
$$

と行列で表せます。

行列 $A$ の第 $j$ 列は

$$
T(e_j)
$$

です。

したがって行列は、「基底ベクトルをどこへ送るか」を並べたものです。

---

## 2. 基底を変えると行列は変わるが、写像そのものは変わらない

同じ線形写像でも、基底を変えると行列表現は変わります。

$V$ の基底変換行列を $S$ とし、新しい座標を $z$、古い座標を $x$ として

$$
x=Sz
$$

とします。

$T(x)=Ax$ なら

$$
T(Sz)=ASz.
$$

出力側も同じ基底変換で表す場合、

$$
Sz'=ASz
$$

なので

$$
\boxed{
z'=S^{-1}ASz}.
$$

したがって新しい行列は

$$
\boxed{S^{-1}AS}.
$$

対角化とは、写像そのものを変えるのではなく、**その写像が最も単純に見える基底を探すこと**です。

---

## 3. 核と像

線形写像 $T:V\to W$ に対して

$$
\boxed{
\ker T
=\{x\in V:T(x)=0\}
}
$$

を **核** といいます。

また

$$
\boxed{
\operatorname{Im}T
=\{T(x):x\in V\}
}
$$

を **像** といいます。

行列 $A$ なら

$$
\ker A
=\{x:Ax=0\},
$$

$$
\operatorname{Im}A
=\operatorname{Col}(A)
$$

です。

核は「消えてしまう方向」、像は「出力として到達できる方向」です。

---

## 4. rank-nullity theoremを基底から見る

$V$ を有限次元とし、

$$
\dim V=n
$$

とします。

まず $\ker T$ の基底を

$$
u_1,\dots,u_r
$$

と取ります。

これを $V$ の基底へ延長して

$$
u_1,\dots,u_r,v_1,\dots,v_{n-r}
$$

とします。

$T(u_i)=0$ なので、任意の $x\in V$ の像は

$$
T(x)
\in
\operatorname{span}(T(v_1),\dots,T(v_{n-r})).
$$

さらに $T(v_1),\dots,T(v_{n-r})$ は一次独立です。

もし

$$
\sum_j a_j T(v_j)=0
$$

なら

$$
T\left(\sum_j a_jv_j\right)=0.
$$

したがって

$$
\sum_j a_jv_j\in\ker T.
$$

一方、$u_i$ と $v_j$ を合わせたものは基底なので、$v_j$ の非自明な線形結合が $\ker T$ に入ることはありません。

よって全ての $a_j=0$ です。

したがって

$$
\dim\operatorname{Im}T=n-r.
$$

つまり

$$
\boxed{
\dim V
=
\dim\ker T
+
\dim\operatorname{Im}T
}
$$

です。

行列で書けば

$$
\boxed{
\text{列数}
=
\operatorname{nullity}(A)
+
\operatorname{rank}(A)
}
$$

です。

---

## 5. 固有値と固有空間

$T:V\to V$ に対して、$v\ne0$ が

$$
T(v)=\lambda v
$$

を満たすとき、$\lambda$ を固有値、$v$ を固有ベクトルといいます。

固有値 $\lambda$ に対応する

$$
\boxed{
E_\lambda
=\ker(T-\lambda I)
}
$$

を **固有空間** といいます。

重要なのは、固有空間は1本のベクトルではなく部分空間だということです。

行列 $A$ なら

$$
(A-\lambda I)v=0
$$

が非零解を持つ必要があるので

$$
\boxed{
\det(A-\lambda I)=0
}
$$

が固有値方程式になります。

---

## 6. 不変部分空間

部分空間 $M\subset V$ が

$$
T(M)\subset M
$$

を満たすとき、$M$ を **不変部分空間** といいます。

固有空間 $E_\lambda$ は不変部分空間です。

不変部分空間があると、写像を小さな空間に制限して考えられます。

スペクトル定理の証明では、1本の固有ベクトルを見つけた後、その直交補空間が再び不変になることを使って次の固有ベクトルを探します。

---

## 7. 対称行列は内積と相性がよい

実対称行列

$$
A^{\mathsf T}=A
$$

では

$$
\boxed{
\langle Ax,y\rangle
=
\langle x,Ay\rangle
}
$$

が成り立ちます。

実際

$$
\langle Ax,y\rangle
=(Ax)^{\mathsf T}y
=x^{\mathsf T}A^{\mathsf T}y
=x^{\mathsf T}Ay.
$$

この性質が、関数解析における **自己共役作用素** の有限次元版です。

---

## 8. 異なる固有値の固有ベクトルは直交する

$A$ を実対称とし、

$$
Au=\lambda u,
\qquad
Av=\mu v,
\qquad
\lambda\ne\mu
$$

とします。

対称性から

$$
\langle Au,v\rangle
=
\langle u,Av\rangle.
$$

したがって

$$
\lambda\langle u,v\rangle
=
\mu\langle u,v\rangle.
$$

よって

$$
(\lambda-\mu)\langle u,v\rangle=0.
$$

$\lambda\ne\mu$ なので

$$
\boxed{
\langle u,v\rangle=0
}.
$$

つまり異なる固有空間は互いに直交します。

同じ固有値の固有空間の中では、F0-00EのGram--Schmidtを使えば正規直交基底を作れます。

---

## 9. Rayleigh商

対称行列 $A$ と非零ベクトル $x$ に対して

$$
\boxed{
R_A(x)
=
\frac{x^{\mathsf T}Ax}{x^{\mathsf T}x}
}
$$

を **Rayleigh商** といいます。

$x$ が固有ベクトルで

$$
Ax=\lambda x
$$

なら

$$
R_A(x)=\lambda.
$$

Rayleigh商は、「方向 $x$ に沿って二次形式がどれだけ伸びるか」を表します。

単位ベクトル $\|x\|=1$ なら

$$
R_A(x)=x^{\mathsf T}Ax.
$$

---

## 10. 対称行列には少なくとも1本の実固有ベクトルがある

単位球面

$$
S^{n-1}
=
\{x\in\mathbb R^n:\|x\|=1\}
$$

を考えます。

これは閉かつ有界なので、F0-00CのHeine--Borelによりコンパクトです。

連続関数

$$
f(x)=x^{\mathsf T}Ax
$$

は、コンパクト集合上で最大値を取ります。

最大点を $q_1$ とし

$$
\|q_1\|=1
$$

とします。

制約

$$
g(x)=x^{\mathsf T}x-1=0
$$

の下で $f$ を最大化しているので、ラグランジュ未定乗数法から

$$
\nabla f(q_1)
=\lambda\nabla g(q_1).
$$

$A$ は対称なので

$$
\nabla f(x)=2Ax,
\qquad
\nabla g(x)=2x.
$$

したがって

$$
2Aq_1=2\lambda q_1
$$

より

$$
\boxed{
Aq_1=\lambda q_1
}.
$$

つまり最大点は固有ベクトルです。

さらに

$$
\lambda=q_1^{\mathsf T}Aq_1
$$

なので、この固有値はRayleigh商の最大値です。

---

## 11. 固有ベクトルの直交補空間は不変になる

$Aq_1=\lambda_1q_1$ とし、

$$
M=q_1^\perp
$$

とします。

$x\in M$ なら

$$
\langle x,q_1\rangle=0.
$$

対称性より

$$
\langle Ax,q_1\rangle
=
\langle x,Aq_1\rangle
=
\lambda_1\langle x,q_1\rangle
=0.
$$

したがって

$$
Ax\in q_1^\perp=M.
$$

よって $M$ は $A$ の不変部分空間です。

ここがスペクトル定理の帰納法の鍵です。

---

## 12. 実対称行列のスペクトル定理

まず単位固有ベクトル $q_1$ を1本取ります。

その直交補空間

$$
q_1^\perp
$$

は $A$ に対して不変です。

この空間の次元は $n-1$ なので、同じ議論を制限写像へ繰り返します。

すると互いに直交する単位固有ベクトル

$$
q_1,\dots,q_n
$$

を得ます。

これらは $\mathbb R^n$ の正規直交基底です。

列に並べて

$$
Q
=
\begin{pmatrix}
q_1&\cdots&q_n
\end{pmatrix}
$$

とすると

$$
Q^{\mathsf T}Q=QQ^{\mathsf T}=I.
$$

また

$$
Aq_i=\lambda_iq_i
$$

なので

$$
AQ=Q\Lambda,
$$

$$
\Lambda
=\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$

右から $Q^{\mathsf T}$ を掛けて

$$
\boxed{
A=Q\Lambda Q^{\mathsf T}
}.
$$

これが **実対称行列のスペクトル定理** です。

つまり

> 実対称行列には正規直交固有基底が存在する。

F0-00で使った「直交対角化できる」は、この定理の結論です。

---

## 13. 二次形式が固有値だけで読める理由

$$
A=Q\Lambda Q^{\mathsf T}
$$

とし、

$$
z=Q^{\mathsf T}x
$$

と置きます。

$Q$ は直交行列なので

$$
\|z\|=\|x\|.
$$

二次形式は

$$
\begin{aligned}
x^{\mathsf T}Ax
&=x^{\mathsf T}Q\Lambda Q^{\mathsf T}x\\
&=z^{\mathsf T}\Lambda z\\
&=\boxed{\sum_{i=1}^n\lambda_i z_i^2}.
\end{aligned}
$$

したがって

$$
\lambda_{\min}\|x\|^2
\le
x^{\mathsf T}Ax
\le
\lambda_{\max}\|x\|^2.
$$

特に $\|x\|=1$ なら

$$
\boxed{
\lambda_{\min}
\le
x^{\mathsf T}Ax
\le
\lambda_{\max}
}.
$$

---

## 14. 正定値・半正定値

対称行列 $A$ が **正定値** であるとは

$$
x^{\mathsf T}Ax>0
\qquad(x\ne0)
$$

です。

スペクトル分解から

$$
x^{\mathsf T}Ax
=\sum_i\lambda_i z_i^2
$$

なので

$$
\boxed{
A\succ0
\Longleftrightarrow
\lambda_i>0\quad\forall i
}.
$$

同様に

$$
\boxed{
A\succeq0
\Longleftrightarrow
\lambda_i\ge0\quad\forall i
}.
$$

です。

共分散行列、Gram行列、Hessianなどで半正定値性が頻出する理由がここで統一されます。

---

## 15. PSD行列の平方根を構成する

$A\succeq0$ なら

$$
A=Q\Lambda Q^{\mathsf T},
\qquad
\lambda_i\ge0.
$$

そこで

$$
\Lambda^{1/2}
=\operatorname{diag}(\sqrt{\lambda_1},\dots,\sqrt{\lambda_n})
$$

とし

$$
\boxed{
A^{1/2}
=Q\Lambda^{1/2}Q^{\mathsf T}
}
$$

と定めます。

すると

$$
A^{1/2}A^{1/2}=A.
$$

多変量正規乱数の構成や共分散作用素の理解では、この平方根が重要です。

---

## 16. 一般の行列は固有値だけでは足りない

対称でない行列は、実数上で固有値を持たないことも、十分な本数の固有ベクトルを持たないこともあります。

また長方形行列

$$
A\in\mathbb R^{m\times n}
$$

には通常の意味で固有値を定義できません。

しかし

$$
A^{\mathsf T}A
$$

は必ず

- $n\times n$ の実対称行列
- 半正定値

です。

そこでスペクトル定理を $A^{\mathsf T}A$ に適用します。

---

## 17. 特異値

$$
A^{\mathsf T}A v_i
=\lambda_i v_i,
\qquad
\lambda_i\ge0
$$

とします。

$$
\boxed{
\sigma_i=\sqrt{\lambda_i}
}
$$

を $A$ の **特異値** といいます。

$\sigma_i>0$ なら

$$
\boxed{
u_i
=\frac{Av_i}{\sigma_i}
}
$$

と置けます。

この $u_i$ が互いに正規直交することを確認します。

$i\ne j$ なら

$$
\begin{aligned}
\langle u_i,u_j\rangle
&=\frac1{\sigma_i\sigma_j}
\langle Av_i,Av_j\rangle\\
&=\frac1{\sigma_i\sigma_j}
v_i^{\mathsf T}A^{\mathsf T}Av_j\\
&=\frac{\lambda_j}{\sigma_i\sigma_j}
v_i^{\mathsf T}v_j\\
&=0.
\end{aligned}
$$

また

$$
\|u_i\|^2
=\frac{\lambda_i}{\sigma_i^2}=1.
$$

したがって $u_i$ も正規直交系です。

---

## 18. SVDを構成する

正の特異値を

$$
\sigma_1\ge\cdots\ge\sigma_r>0
$$

とします。

対応する右特異ベクトルを

$$
v_1,\dots,v_r
$$

左特異ベクトルを

$$
u_1,\dots,u_r
$$

とします。

すると

$$
Av_i=\sigma_i u_i.
$$

これを行列でまとめると

$$
\boxed{
A=U\Sigma V^{\mathsf T}
}
$$

と表せます。

これが **特異値分解（SVD）** です。

完全形では $U,V$ をそれぞれ直交行列へ補い、$\Sigma$ を長方形対角行列にします。

薄いSVDでは非零特異値に対応する部分だけを残して

$$
A=U_r\Sigma_rV_r^{\mathsf T}
$$

と書きます。

---

## 19. SVDは「入力方向 → 伸縮 → 出力方向」

$$
A=U\Sigma V^{\mathsf T}
$$

は、線形写像を3段階へ分解しています。

1. $V^{\mathsf T}$：入力を右特異ベクトル基底へ回転
2. $\Sigma$：各方向を $\sigma_i$ 倍
3. $U$：出力側の基底へ回転

したがって特異値は、線形写像が各主方向をどれだけ伸ばすかを表します。

固有値が「同じ空間の中で向きを保つ倍率」なのに対し、特異値は **入力空間と出力空間が違っても使える伸縮率** です。

---

## 20. rankと特異値

非零特異値の本数を $r$ とすると

$$
\boxed{
\operatorname{rank}(A)=r
}.
$$

なぜなら

$$
A=U_r\Sigma_rV_r^{\mathsf T}
$$

で $\Sigma_r$ が正則な $r\times r$ 対角行列だからです。

また

$$
\ker A
$$

は特異値0に対応する右特異ベクトルで張られます。

したがってSVDは

- 像
- 核
- rank

を同時に可視化します。

---

## 21. 作用素ノルム

線形写像 $A:\mathbb R^n\to\mathbb R^m$ のEuclidノルムに関する作用素ノルムを

$$
\boxed{
\|A\|_{\mathrm{op}}
=\sup_{x\ne0}
\frac{\|Ax\|}{\|x\|}
=\sup_{\|x\|=1}\|Ax\|
}
$$

と定義します。

これは

> 単位ベクトルを最大で何倍まで伸ばすか

という量です。

SVDを使うと

$$
\|Ax\|^2
=x^{\mathsf T}A^{\mathsf T}Ax.
$$

単位ベクトルについて最大化すると、$A^{\mathsf T}A$ の最大固有値です。

したがって

$$
\boxed{
\|A\|_{\mathrm{op}}
=\sqrt{\lambda_{\max}(A^{\mathsf T}A)}
=\sigma_{\max}(A)
}.
$$

この「写像の大きさ」が、後の関数解析では有界線形作用素のノルムへ一般化されます。

---

## 22. Cauchy--Schwarzを作用素の言葉で見る

固定した $a\in\mathbb R^n$ に対して

$$
\ell_a(x)=a^{\mathsf T}x
$$

という線形汎関数を考えます。

Cauchy--Schwarzより

$$
|a^{\mathsf T}x|
\le\|a\|\|x\|.
$$

よって

$$
\|\ell_a\|_{\mathrm{op}}
\le\|a\|.
$$

$x=a/\|a\|$ を取れば等号が達成されるので

$$
\boxed{
\|\ell_a\|_{\mathrm{op}}=\|a\|
}.
$$

後のRiesz表現定理では、「Hilbert空間上の全ての連続線形汎関数がこの形で表せる」ことを示します。

有限次元ではあまりに自然なので見落としやすい構造です。

---

## 23. スペクトル定理とSVDの違い

混同しやすいので整理します。

| | スペクトル定理 | SVD |
|---|---|---|
| 対象 | 実対称 $n\times n$ 行列 | 任意の $m\times n$ 行列 |
| 分解 | $A=Q\Lambda Q^{\mathsf T}$ | $A=U\Sigma V^{\mathsf T}$ |
| 対角成分 | 固有値、符号あり | 特異値、非負 |
| 基底 | 入出力で同じ固有基底 | 入力と出力で別の特異ベクトル基底 |
| 主な意味 | 自己共役写像の方向別倍率 | 一般線形写像の方向別伸縮率 |

対称PSD行列なら、固有値が全て非負なのでSVDとスペクトル分解はほぼ同じ形になります。

---

## 24. 関数解析への橋

ここまでで有限次元では

- 線形写像は行列で表せる
- 線形汎関数は $a^{\mathsf T}x$ と表せる
- 部分空間へ直交射影できる
- 実対称行列は正規直交固有基底を持つ
- 線形写像の大きさは作用素ノルムで測れる

ことを確認しました。

関数解析では次のように一般化されます。

| 有限次元 | 関数解析 |
|---|---|
| 行列 $A$ | 線形作用素 $T$ |
| $A^{\mathsf T}$ | 随伴作用素 $T^*$ |
| $a^{\mathsf T}x$ | 連続線形汎関数 $\ell(x)$ |
| Euclid空間 | Banach / Hilbert空間 |
| 正規直交基底 | 正規直交系・完全性 |
| 対称行列 | 自己共役作用素 |
| 最大特異値 | 作用素ノルム |
| 有限次元スペクトル分解 | 無限次元スペクトル理論 |

ただし無限次元では、有限次元で当然だったことのいくつかが壊れます。

たとえば一般の有界自己共役作用素でも、有限次元行列のように固有ベクトルだけで数え上げられるとは限りません。

この補講系列では、そこまでの完全なスペクトル理論には進まず、まず [F0-02C1 ノルム空間・Banach空間・Hilbert空間](../F0_02C1_ノルム空間_Banach_Hilbert/index.md) へ進みます。

---

## 25. 通読ルートでの位置

F0-00を理解できている読者が、関数解析系列を頭から読む場合は

$$
\boxed{
\text{F0-00}
\to
\text{F0-00A}
\to
\text{F0-00B}
\to
\text{F0-00C}
\to
\text{F0-00D}
\to
\text{F0-00E}
\to
\text{F0-00F}
\to
\text{F0-02C1}
}
$$

の順を推奨します。

A〜Dで極限・位相側の語彙、E〜Fで線形代数側の語彙を補ってから、Banach/Hilbert空間へ入る構成です。

---

## 章末チェック

- 行列を基底に依存する線形写像の表現として説明できる。
- kernelとimageを求め、その意味を説明できる。
- rank-nullity theoremを基底の延長から説明できる。
- 固有値、固有ベクトル、固有空間を区別できる。
- 対称行列の異なる固有値に属する固有ベクトルが直交することを証明できる。
- Rayleigh商の最大化から固有ベクトルが現れる流れを説明できる。
- 実対称行列のスペクトル定理を「1本の固有ベクトル→直交補空間へ帰納」で説明できる。
- PSD行列の平方根を構成できる。
- $A^{\mathsf T}A$ から特異値とSVDを構成できる。
- $\|A\|_{\mathrm{op}}=\sigma_{\max}(A)$ を説明できる。
