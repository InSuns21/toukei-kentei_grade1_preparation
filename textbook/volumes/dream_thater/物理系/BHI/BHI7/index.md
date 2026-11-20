# BHI7 Page曲線の物理的意味

<!-- definition-example-audit: strict -->

## 1. エントロピーが折り返す必要条件から、どんな形を期待するかへ

[BHI6の終期に向けた減少の必要性](../BHI6/index.md#thm-bhi6-turnover-necessary)は、初期の放射が正の精細エントロピーを持ち、終期には放射以外の系が残らず、全系が純粋なら、どこかで放射エントロピーが減ることを保証しました。しかし、何段目で、どれくらい大きくなってから減るかは決めていません。

一方、[QINF31のHaarランダム純粋状態](../../../応用系/QINF/QINF31/index.md#def-qinf31-haar)および[QINF32のPage型平均評価](../../../応用系/QINF/QINF32/index.md#thm-qinf32-page-type-mean)では、**一つの時点での**純粋な二部系をランダムに選ぶと、小さい側のエントロピーがその次元の許す最大値に近くなることを学びました。これを各段階の放射 $R_k$ と残存系 $B_k$ に当てはめると、Page曲線の基本的な山の形が現れます。

ただし以下は、重力理論から蒸発の時間発展を厳密導出する講義ではありません。まず有限次元で「典型的な分割ごとのエントロピー」を正確に計算し、その値を物理的な蒸発履歴と比較するために何を仮定したかを明示します。対数は自然対数、エントロピーの単位は nat、$0\ln0=0$ とします。

## 2. 「各時点で典型的」とは何をランダムにすることか

段階 $k$ では、放射の自由度が増え、残存側の自由度が減ることを期待します。そこで放射・残存それぞれに有限次元Hilbert空間を与え、その**分割を固定した後**に全系の純粋状態をHaar分布で選びます。Haar分布は、すべての規格化状態が等確率という曖昧な表現ではなく、任意のユニタリ変換に対し分布が不変であるという意味です。

<a id="def-bhi7-page-snapshot"></a>

<!-- formal-statement-start -->
> **定義（時点別Haar比較模型）**
>
> 整数 $N\ge1$ と各 $k=0,\ldots,N$ について整数 $r_k,b_k\ge1$ を固定し、$R_k\simeq\mathbb C^{r_k}$、$B_k\simeq\mathbb C^{b_k}$ とする。各時点で正規化された純粋状態 $|\Psi_k\rangle\in R_k\otimes B_k$ を、[Haarランダム純粋状態](../../../応用系/QINF/QINF31/index.md#def-qinf31-haar)の分布から選び、

$$
\rho_{R_k}=\operatorname{Tr}_{B_k}|\Psi_k\rangle\langle\Psi_k|,
\qquad
\overline S_k=\mathbb E_{\mathrm{Haar}}[-\operatorname{Tr}(\rho_{R_k}\ln\rho_{R_k})]
$$

> とおく。この数列 $(\overline S_k)$ を**時点別Page平均の比較曲線**とする。添字 $k$ は時点を示すが、異なる $k$ の状態が一つの物理的時間発展で結ばれているとは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi7-page-snapshot -->
**定義の直接例**：$N=4$、$r_k=2^k$、$b_k=2^{4-k}$ とします。例えば $k=1$ では $R_1=\mathbb C^2$、$B_1=\mathbb C^8$、全系は16次元です。複素Gaussian係数 $z_{i\alpha}$（$i=0,1$、$\alpha=0,\ldots,7$）を独立に取り、

$$
|\Psi_1\rangle=
\frac{\sum_{i=0}^{1}\sum_{\alpha=0}^{7}z_{i\alpha}|i\rangle_R|\alpha\rangle_B}
{\sqrt{\sum_{i=0}^{1}\sum_{\alpha=0}^{7}|z_{i\alpha}|^2}}
$$

と構成します。分母は確率1で正、分子の二乗ノルムは分母の二乗なので規格化されています。独立な複素Gaussianベクトルのユニタリ不変性と規格化によるHaar性は[QINF31の構成定理](../../../応用系/QINF/QINF31/index.md#thm-qinf31-gaussian-haar)で確認済みです。部分トレースは $2\times2$ の密度行列を与えます。他の $k$ にも同じ手順をそれぞれの次元で行えば定義の条件を満たします。ただし、これだけでは $|\Psi_{k+1}\rangle$ が前段階の $|\Psi_k\rangle$ から生じるという**逐次等長写像の条件**は確認していません。
<!-- definition-example-end -->

[BHI6の段階的純粋蒸発模型](../BHI6/index.md#def-bhi6-pure-evaporation)では、一つの初期状態と写像 $W_k$ を指定し、全時点の状態をつなぎました。今回の比較模型は、各時点の**分布**を別々に指定したものです。これが両者の決定的な違いです。

## 3. Page平均の式と、それが意味する上限への接近

次元の小さい側を $m_k=\min(r_k,b_k)$、大きい側を $n_k=\max(r_k,b_k)$ と書きます。全系が純粋なので、[縮約エントロピーの一致](../BHI6/index.md#thm-bhi6-entropy-budget)から、放射と残存系のどちらを小さい側と呼んでもエントロピーの値は同じです。

<a id="def-bhi7-page-envelope"></a>

<!-- formal-statement-start -->
> **定義（Page比較の次元包絡線と欠損）**
>
> [時点別Haar比較模型](#def-bhi7-page-snapshot)に対して

$$
L_k=\ln m_k=\ln\min(r_k,b_k),
\qquad
D_k=L_k-\overline S_k
$$

> と定める。$L_k$ を**次元包絡線**、$D_k$ を**平均エントロピー欠損**とする。$L_k$ は各時点の厳密な上界であって、平均エントロピーそのものではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi7-page-envelope -->
**定義の直接例**：第2節の $k=1$ では $(r_1,b_1)=(2,8)$、従って $m_1=2$、$n_1=8$、$L_1=\ln2$ です。後述のPage平均 $\overline S_1\simeq0.600372$ natを代入すれば、$D_1\simeq0.693147-0.600372=0.092775$ natで非負です。$k=0$ では $m_0=1$ なので $L_0=0$、純粋性から $\overline S_0=0$、$D_0=0$ です。両例とも定義の非自明な減算と境界値を確認しました。
<!-- definition-example-end -->

<a id="prop-bhi7-mean-bounds"></a>

<!-- formal-statement-start -->
> **命題（時点別Page平均の上下界）**
>
> 有限次元の[時点別Haar比較模型](#def-bhi7-page-snapshot)では、各 $k$ について $1\le m_k\le n_k$ とすると、

$$
\ln\frac{m_kn_k+1}{m_k+n_k}
\le\overline S_k\le\ln m_k
$$

> および

$$
0\le D_k
\le\ln\frac{m_k(m_k+n_k)}{m_kn_k+1}
\le\frac{m_k^2-1}{m_kn_k+1}
$$

> が成り立つ。特に $m_k=m$ を固定して $n_k\to\infty$ とする模型族では $D_k\to0$。
<!-- formal-statement-end -->

### 証明の見取り図

[QINF32の平均評価](../../../応用系/QINF/QINF32/index.md#thm-qinf32-page-type-mean)は bit 単位なので、両辺に $\ln2$ を掛けて nat に変換します。最後の界は $\ln(1+x)\le x$ を使うだけですが、何を $x$ と置いたかを追います。新たな量子情報定理を無証明で作り直しているわけではありません。

<!-- proof-start -->
### 証明

固定した $k$ について $m=m_k,n=n_k$ と置きます。全系は有限次元のHaarランダム純粋状態、かつ $m\le n$ なので、[Page型平均評価](../../../応用系/QINF/QINF32/index.md#thm-qinf32-page-type-mean)の仮定を満たします。bit 単位のエントロピーを $S_{\rm bit}$ とすれば $S_{\rm nat}=(\ln2)S_{\rm bit}$ です。同定 $A=\mathbb C^m,B=\mathbb C^n$ によって

$$
(\ln2)\log_2\frac{mn+1}{m+n}
\le\overline S_k
\le(\ln2)\log_2m
$$

となり、左辺・右辺の $\ln2$ が対数の底を変換して第一式を与えます。次に $D_k=\ln m-\overline S_k$ より

$$
0\le D_k
\le\ln m-\ln\frac{mn+1}{m+n}
=\ln\frac{m(m+n)}{mn+1}.
$$

ここで分子を展開すると $m(m+n)=mn+m^2=(mn+1)+(m^2-1)$ なので

$$
D_k\le\ln\left(1+\frac{m^2-1}{mn+1}\right)
\le\frac{m^2-1}{mn+1}.
$$

最後の不等号は $x=(m^2-1)/(mn+1)\ge0$ に対する $\ln(1+x)\le x$ です。$m$ を固定して $n\to\infty$ とすれば右辺は0へ収束し、$D_k\ge0$ と挟み撃ちして結論します。
<!-- proof-end -->

より精密な**厳密なHaar平均**は、調和数 $H_j=\sum_{i=1}^{j}1/i$ を使って

$$
\boxed{\overline S_k
=H_{m_kn_k}-H_{n_k}-\frac{m_k-1}{2n_k}}
\quad\text{（nat）}
$$

です。これは[QINF32で出典・証明範囲を区別したPage平均式](../../../応用系/QINF/QINF32/index.md#thm-qinf32-page-type-mean)に対応する文献上の厳密結果であり、この講義の命題から導いた等式ではありません。原論文の[Page (1993)](https://arxiv.org/abs/gr-qc/9305007)はこの式を予想し、[Sen (1996)](https://arxiv.org/abs/hep-th/9601132)が証明しました。今回の主な計算は、**その厳密平均を時間発展の予測と混同しないためのもの**です。

第2節の4量子ビット分割で具体的に比較すると次のようになります。

| 段階 $k$ | $r_k$ | $b_k$ | $(m_k,n_k)$ | 包絡線 $L_k$ (nat) | Haar平均 $\overline S_k$ (nat) |
|---|---:|---:|---:|---:|---:|
| 0 | 1 | 16 | (1,16) | 0 | 0 |
| 1 | 2 | 8 | (2,8) | 0.693147 | 0.600372 |
| 2 | 4 | 4 | (4,4) | 1.386294 | 0.922396 |
| 3 | 8 | 2 | (2,8) | 0.693147 | 0.600372 |
| 4 | 16 | 1 | (1,16) | 0 | 0 |

例えば $k=1$ では

$$
\overline S_1
=H_{16}-H_8-\frac1{16}
=\sum_{j=9}^{16}\frac1j-\frac1{16}
=\sum_{j=9}^{15}\frac1j
\simeq0.600372.
$$

$k=2$ では

$$
\overline S_2=H_{16}-H_4-\frac38
=\sum_{j=5}^{16}\frac1j-\frac38
\simeq0.922396.
$$

包絡線は山型で、平均もこの例では山型です。ただし $m=n=4$ でも平均と上限の差は約 $0.463899$ nat あります。「典型的」は「常に最大混合」の意味ではありません。

## 4. 次元が時間とともに変わると何が言えるか

包絡線の山型は、純粋性だけではなく、**放射の有効状態数は増える／残存側は減る**という別の仮定から来ます。連続した補助的な時刻変数 $t$ と正の関数 $r(t),b(t)$ を導入し、数式上の交点を調べます。連続関数は実数値でもよいですが、そのままHilbert空間の次元として使うのではなく、$\ln r(t)$ と $\ln b(t)$ を状態数の近似的な対数として読むための補間です。

<a id="prop-bhi7-envelope-turning"></a>

<!-- formal-statement-start -->
> **命題（次元包絡線の折返し条件）**
>
> 区間 $[t_0,t_f]$ 上で正の連続関数 $r(t),b(t)$ があり、$r$ は狭義単調増加、$b$ は狭義単調減少とする。さらに $r(t_0)<b(t_0)$、$r(t_f)>b(t_f)$ と仮定する。このとき一意の $t_*$ が存在して $r(t_*)=b(t_*)$ となり、

$$
L(t)=\ln\min\{r(t),b(t)\}
$$

> は $t_0\le t\le t_*$ で狭義単調増加、$t_*\le t\le t_f$ で狭義単調減少となる。これは包絡線についての命題であり、各時点でのHaar平均や個々の蒸発履歴が同じ単調性を持つとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

差 $f(t)=r(t)-b(t)$ は連続かつ狭義単調増加です。端点の符号が異なるので交点は一つだけです。交点の前では小さい側は $r$、後では $b$ となるため、対数の単調性を使えます。

<!-- proof-start -->
### 証明

$t_1<t_2$ なら $r(t_1)<r(t_2)$ かつ $b(t_1)>b(t_2)$ なので

$$
f(t_2)-f(t_1)
=[r(t_2)-r(t_1)]+[b(t_1)-b(t_2)]>0.
$$

従って $f$ は狭義単調増加です。$f(t_0)<0<f(t_f)$ と連続性から中間値の定理を適用して $f(t_*)=0$ が存在し、狭義単調性から一意です。$t<t_*$ では $f(t)<0$ より $r(t)<b(t)$ なので $L(t)=\ln r(t)$、$t>t_*$ では $L(t)=\ln b(t)$ です。$\ln x$ は $x>0$ で狭義単調増加であるため前半は増加、後半は減少です。交点では両表示が一致し、連続です。
<!-- proof-end -->

有限段階 $k$ では交点が整数段階と一致するとは限らず、頂点は隣接する二段階に分散することもあります。さらに**包絡線の山型と平均の山型は論理的に別物**です。平均の増減を確かめるには第3節の厳密平均式などが必要です。

物理学でよく描くPage曲線では、初期の放射エントロピーが粗視化した放射の熱的エントロピーに近づいて増加し、後期には残存側の量子状態数に制限されて減少する、という直観を用います。この説明を計算へするには、少なくとも各時刻の分割、状態数の時間依存、典型的な相関が実現するという力学的条件が必要です。これらが失われると、上の図式をそのまま実在ブラックホールの予測にはできません。

## 5. 「典型的」を確率で読み直す

Page平均は多数の状態にわたる平均値です。平均値が最大値に近いだけでは、実際に取り出した一つの状態がそこへ近いとは限りません。ここでは[QINF32のエントロピー欠損の確率評価](../../../応用系/QINF/QINF32/index.md#thm-qinf32-entropy-tail)を、時間の添字付きの分割へ適用します。

<a id="thm-bhi7-snapshot-typicality"></a>

<!-- formal-statement-start -->
> **定理（固定時点でのPage型典型性の確率上界）**
>
> [時点別Haar比較模型](#def-bhi7-page-snapshot)の任意の固定した $k$ において、$m=m_k\le n=n_k$ とし、標本ごとの小さい側のエントロピーを $S_k$ (nat) とおく。任意の $\varepsilon>0$ に対し、

$$
\Pr\{\ln m-S_k\ge\varepsilon\}
\le\min\left\{1,
\frac{m^2-1}{(mn+1)(e^\varepsilon-1)}\right\}.
$$

> とくに $m$ と $\varepsilon$ を固定して $n\to\infty$ とすると、この確率上界は0へ収束する。これは固定時点のHaar分布についての主張であり、一つの蒸発過程の時間平均や全時点の同時確率ではない。
<!-- formal-statement-end -->

### 証明の見取り図

[QINF32の確率界](../../../応用系/QINF/QINF32/index.md#thm-qinf32-entropy-tail)は欠損を bit で測ります。しきい値 $\varepsilon$ natを $\varepsilon/\ln2$ bitに変えれば $2^{\varepsilon/\ln2}=e^\varepsilon$ となります。

<!-- proof-start -->
### 証明

$S_{{\rm bit},k}=S_k/\ln2$ とします。$m,n$ は固定された正整数であり、Haar純粋状態という分布の仮定を満たすので、[QINF32の確率評価](../../../応用系/QINF/QINF32/index.md#thm-qinf32-entropy-tail)に $\delta=\varepsilon/\ln2>0$ を代入できます。欠損事象は

$$
\ln m-S_k\ge\varepsilon
\ \Longleftrightarrow\
\log_2m-S_{{\rm bit},k}\ge\frac{\varepsilon}{\ln2}.
$$

従って既習結果の分母の $2^\delta-1$ を

$$
2^\delta-1=2^{\varepsilon/\ln2}-1
=e^\varepsilon-1
$$

と書き換えて表示した確率界を得ます。固定 $m,\varepsilon$ では分子は一定で、$mn+1\to\infty$ なので右辺は0へ収束します。
<!-- proof-end -->

例えば $m=2,n=8$、$\varepsilon=\ln(4/3)$ nat とすると

$$
\Pr\{\ln2-S_k\ge\ln(4/3)\}
\le\frac{2^2-1}{(2\cdot8+1)(4/3-1)}
=\frac9{17}\simeq0.5294.
$$

同じしきい値で $n=32$ なら上界は $9/65\simeq0.1385$ へ下がります。ただしこれは緩い**上界**で、実際の確率がこの値であるとも、各時点のHaar状態が同じ物理系のユニタリ運動として実現するとも述べていません。

## 6. 典型性の「状態」を、蒸発の「時間」に移す追加仮定

次の表では、数学的に確定したことと、物理的にまだ要ることを区別します。

| 数学的な入力・主張 | どの仮定が必要か | 重力物理へ持ち込む際に未確定な点 |
|---|---|---|
| $S(R_k)=S(B_k)$ | [純粋な全系と正しい分割](../BHI6/index.md#thm-bhi6-entropy-budget) | 未観測環境、参照系、残存系を漏らしていないか |
| $S(R_k)\le\ln\min(r_k,b_k)$ | 有限次元のテンソル積模型 | そもそも重力の物理的Hilbert空間を内外に因数分解できるか |
| ほぼ最大の小側エントロピー | [Haar平均と典型性](#thm-bhi7-snapshot-typicality) | 実際のハミルトニアンがHaar分布に近い性質を作るか |
| 時刻による包絡線の山型 | [二つの状態数の単調変化と交点](#prop-bhi7-envelope-turning) | 状態数と質量・地平線面積・放射粗視化量をどう結ぶか |
| 初期増加と後期減少を持つ実際の放射履歴 | 初期状態、逐次写像、相関形成・放出の力学 | 折返しの位置、補正、蒸発終期、情報への操作的アクセス |

[BHI4の地平線エントロピー変化](../BHI4/index.md#prop-bhi4-horizon-entropy-rate)で扱った $S_{\rm BH}(M)$ は幾何学的・熱力学的な量です。これに対し $\ln b_k$ は**この模型が置いた**残存側Hilbert空間の対数次元です。$\ln b_k\simeq S_{\rm BH}(M_k)$ とするなら、それは物理的な状態数の同定という**追加仮定**です。同様に $\ln r_k$ を放射の粗視化エントロピーとみなすのも、扱う有効状態空間をどう選ぶかに依存します。熱力学的エントロピー、局所粗視化エントロピー、全放射の精細エントロピーの区別は[BHI5の恒等式](../BHI5/index.md#thm-bhi5-correlation-gap)で検査できます。

極端な誤用は「各時点でランダムなHaar状態を独立に再抽選すれば、ユニタリ蒸発を構成できた」という推論です。[BHI6の逐次等長性](../BHI6/index.md#def-bhi6-pure-evaporation)は一つの初期状態から**すべての時点**を相互に結びます。時点別の周辺分布だけでは、状態間の整合、エネルギー収支、局所性、量子重力的拘束のどれも導けません。

## 7. 同じ次元でも実際の曲線は違う

Page比較は「典型的な状態の平均」であり、すべての純粋蒸発に当てはまる定理ではありません。これを反例ではっきりさせます。

<a id="prop-bhi7-same-dim-counterexample"></a>

<!-- formal-statement-start -->
> **命題（同一次元系列でも放射エントロピー履歴は一意でない）**
>
> 四つの量子ビット $1,2,3,4$ を順番に放射へ移す等長写像を考え、段階 $k$ の放射を $R_k=1\cdots k$、残存系を $B_k=(k+1)\cdots4$ とする。いずれも次元系列は $r_k=2^k,b_k=2^{4-k}$ である。それでも、初期状態として
>
> (a) $|0000\rangle$ を選んだ場合と、(b) $|\Phi^+\rangle_{14}\otimes|\Phi^+\rangle_{23}$ を選んだ場合の放射エントロピー履歴はそれぞれ

$$
(S(R_0),\ldots,S(R_4))=(0,0,0,0,0)
$$

> および

$$
(S(R_0),\ldots,S(R_4))
=(0,\ln2,2\ln2,\ln2,0)
$$

> となる。ここで $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

単純なSWAP放出では、元の状態のうち先頭 $k$ 個を放射側と読み替えるだけです。積状態ならどの縮約も純粋です。二つのBell対なら、切断線をまたぐBell対の本数がエントロピーを決めます。

<!-- proof-start -->
### 証明

各段階で「残存の先頭量子ビットを放射として取り出し、残りを残存とする」写像を計算基底上で $|a_1\cdots a_\ell\rangle\mapsto|a_1\rangle\otimes|a_2\cdots a_\ell\rangle$ と定めます。像は正規直交基底なので、[等長写像の条件](../BHI6/index.md#def-bhi6-pure-evaporation) $W^\dagger W=I$ を満たし、全状態は純粋なままです。

(a) ではどの $k$ でも $|0\rangle^{\otimes k}$ が放射の純粋状態なので $S(R_k)=0$ です。(b) は $\rho_{R_k}$ を明示して計算します。

- $k=0,4$ では放射は自明系または全純粋系であり $S=0$。
- $k=1$ では量子ビット1の相手4をトレースするため $\rho_{R_1}=I_2/2$、$S(R_1)=\ln2$。
- $k=2$ では相手4および3をトレースするため $\rho_{R_2}=(I_2/2)_1\otimes(I_2/2)_2=I_4/4$、$S(R_2)=\ln4=2\ln2$。
- $k=3$ では量子ビット2,3が純粋Bell対として放射内で完結し、量子ビット1のみ相手4を残すので $\rho_{R_3}=(I_2/2)_1\otimes|\Phi^+\rangle_{23}\langle\Phi^+|$。非零固有値は $(1/2,1/2)$、よって $S(R_3)=\ln2$。

従って両履歴は表示の通りです。すべての $k$ で $(r_k,b_k)$ は一致するのに結果は異なります。
<!-- proof-end -->

このBell対構成は[QINF33の山型履歴](../../../応用系/QINF/QINF33/index.md#thm-qinf33-bell-tent)と同じ系の切断を、Page比較の反例として使ったものです。**積状態の例で失ったのは全系の純粋性ではなく、典型的に強いもつれを持つという仮定**です。どちらの履歴もユニタリな放出と両立し、同じ次元包絡線を満たします。

減少が起きる段階では、[BHI6の相関条件](../BHI6/index.md#prop-bhi6-emission-increment)によって新しい放射 $b$ と古い放射 $R$ の相互情報量 $I(R:b)$ が $S(b)$ を上回る必要があります。Bell対模型の $k=3$ なら $S(R_2)=2\ln2$、$S(b_3)=\ln2$、$S(R_3)=\ln2$ なので

$$
I(R_2:b_3)=S(R_2)+S(b_3)-S(R_3)=2\ln2>\ln2,
\qquad
\Delta_3=-\ln2.
$$

Page曲線が下がることは、単に「放射が冷える」という意味ではなく、**新たな放射が古い放射との相関を運び出す**ことと結びつきます。

## 8. 参照計算：理論平均と包絡線を再現する

第3節の表は整数次元と調和数だけから再計算できます。以下のPythonは乱数を使わず、**文献によるHaar平均の厳密式**と次元包絡線を表示します。乱数状態の実際の蒸発をシミュレートしたコードではありません。

    from math import log

    def harmonic(n):
        assert isinstance(n, int) and n >= 1
        return sum(1.0 / j for j in range(1, n + 1))

    def page_mean_nat(r, b):
        assert isinstance(r, int) and isinstance(b, int)
        assert r >= 1 and b >= 1
        m, n = min(r, b), max(r, b)
        return harmonic(m * n) - harmonic(n) - (m - 1) / (2 * n)

    for k in range(5):
        r, b = 2 ** k, 2 ** (4 - k)
        mean = page_mean_nat(r, b)
        envelope = log(min(r, b))
        assert -1e-12 <= mean <= envelope + 1e-12
        print(k, r, b, f"{mean:.6f}", f"{envelope:.6f}")

調和数の計算は小次元での検算を目的にしています。大次元では二つの大きな調和数の差を直接引くと桁落ちするので、和 $\sum_{j=n+1}^{mn}1/j$ や漸近評価を使います。物理的な時刻への変換と Page 時刻の模型依存推定は次の BHI8 で扱います。

## 9. 演習と詳細解答

### Level A：Page比較の定義・平均・単位を確かめる

<a id="ex-bhi7-a01"></a>
#### BHI7-A01 小さい側の同定
- Level: A

$(r,b)=(2,8)$ と $(8,2)$ について (i) $m,n$、(ii) $L$、(iii) Haar平均purityを求め、なぜ両方の平均エントロピーが等しいか説明せよ。

<!-- solution-start -->
**詳細解答**

(i) どちらも $m=\min(r,b)=2$、$n=\max(r,b)=8$ です。(ii) [次元包絡線](#def-bhi7-page-envelope)は $L=\ln m=\ln2$ です。(iii) [QINF31の平均purity](../../../応用系/QINF/QINF31/index.md#thm-qinf31-average-purity)に $d_A=r,d_B=b$ を代入すると

$$
\mathbb E\operatorname{Tr}\rho_R^2
=\frac{r+b}{rb+1}
=\frac{2+8}{2\cdot8+1}
=\frac{10}{17}.
$$

平均purityの一致だけから平均エントロピーの一致を**推論してはいけません**。正しい理由は、各純粋二部状態で[Schmidtの非零固有値が共通](../BHI6/index.md#thm-bhi6-entropy-budget)なので $S(R)=S(B)$ が標本ごとに成り立つことです。さらにHaar測度の因子交換対称性によって両分割の平均も一致します。
<!-- solution-end -->

<a id="ex-bhi7-a02"></a>
#### BHI7-A02 調和数から平均を求める
- Level: A

$(m,n)=(2,2)$ のPage厳密平均をnatで求め、次元上界と比較せよ。

<!-- solution-start -->
**詳細解答**

第3節の文献式に $m=n=2$ を代入します。

$$
\overline S
=H_4-H_2-\frac{1}{4}
=\left(\frac13+\frac14\right)-\frac14
=\frac13\quad\text{nat}.
$$

次元上界は $\ln2\simeq0.693147$ nat、平均は $1/3\simeq0.333333$ natなので $\overline S<\ln2$ です。bitに直すなら $(1/3)/\ln2\simeq0.480898$ bitです。
<!-- solution-end -->

<a id="ex-bhi7-a03"></a>
#### BHI7-A03 平均と一つの状態
- Level: A

$R,B$ がそれぞれ量子ビットであるとき、積状態 $|00\rangle$ とBell状態 $|\Phi^+\rangle$ の $S(R)$ を求め、A02のHaar平均と比べよ。

<!-- solution-start -->
**詳細解答**

積状態では $\rho_R=|0\rangle\langle0|$ の固有値は $(1,0)$ なので $S(R)=0$ です。Bell状態では $B$ をトレースすると $\rho_R=I_2/2$、固有値は $(1/2,1/2)$ なので

$$
S(R)=-2\left(\frac12\ln\frac12\right)=\ln2.
$$

A02のHaar平均は $1/3$ natであり $0<1/3<\ln2$ です。個々の標本の値が平均に等しい必要はなく、最大値である必要もありません。
<!-- solution-end -->

<a id="ex-bhi7-a04"></a>
#### BHI7-A04 natとbit、確率しきい値
- Level: A

欠損が $\varepsilon=\ln2$ nat以上という条件をbitに直せ。固定 $m=2,n=8$ の[典型性の確率界](#thm-bhi7-snapshot-typicality)へ代入せよ。

<!-- solution-start -->
**詳細解答**

$S_{\rm nat}=(\ln2)S_{\rm bit}$ なので欠損 $\ln2$ natは1 bitです。$e^\varepsilon=e^{\ln2}=2$ を確率界へ代入すると

$$
\Pr\{\ln2-S\ge\ln2\}
\le\min\left\{1,\frac{2^2-1}{(2\cdot8+1)(2-1)}\right\}
=\frac3{17}.
$$

実際、条件は $S\le0$ なので $S=0$ の状態に限られ、Haar分布では確率0です。$\frac3{17}$ は厳密な確率ではなく緩い上界として整合します。
<!-- solution-end -->

<a id="ex-bhi7-a05"></a>
#### BHI7-A05 未観測系を含めた正しい上界
- Level: A

放射 $R$、残存系 $B$、未観測系 $C$ からなる全純粋状態について $d_B=1,d_C=2$ とする。$S(R)\le\ln d_B$ と言えるか。正しい上界と反例を示せ。

<!-- solution-start -->
**詳細解答**

[BHI6の未観測純粋化系の命題](../BHI6/index.md#prop-bhi6-hidden-purifier)を $R|BC$ に適用すると

$$
S(R)=S(BC)\le\ln(d_Bd_C)=\ln2.
$$

$S(R)\le\ln d_B=0$ とは一般に言えません。実際、$R,C$ がBell状態で $B$ が一次元真空なら $\rho_R=I_2/2$、$S(R)=\ln2$ です。上界が変わる理由は放射の純粋化相手が $B$ ではなく $BC$ になったためであり、Page比較の次元を $d_B$ だけから決めてはいけません。
<!-- solution-end -->

### Level B：形状・典型性・相関の仮定を検査する

<a id="ex-bhi7-b01"></a>
#### BHI7-B01 六量子ビット模型の交差
- Level: B

$k=0,\ldots,6$ として $(r_k,b_k)=(2^k,2^{6-k})$ とする。全段階の $m_k$ と $L_k$ を列挙し、交点と包絡線の頂点を求めよ。$k=3$ のHaar平均を調和数で書け。

<!-- solution-start -->
**詳細解答**

$k=0,1,2,3,4,5,6$ に対し

$$
m_k=\min(2^k,2^{6-k})=(1,2,4,8,4,2,1)
$$

なので

$$
L_k=\ln m_k=(0,\ln2,\ln4,\ln8,\ln4,\ln2,0).
$$

$2^k=2^{6-k}$ の両辺の底2対数を取ると $k=6-k$、従って $k=3$ です。包絡線はそこで最大値 $\ln8$ を取ります。厳密Haar平均は $m=n=8$ を代入して

$$
\overline S_3=H_{64}-H_8-\frac{7}{16}
=\sum_{j=9}^{64}\frac1j-\frac7{16}\quad\text{nat}
$$

です。この式は**平均値**であり、頂点が個々の放射履歴でも必ず $k=3$ になることは示していません。
<!-- solution-end -->

<a id="ex-bhi7-b02"></a>
#### BHI7-B02 典型性上界の改善
- Level: B

$m=2$、欠損しきい値 $\varepsilon=\ln(4/3)$ nat を固定する。$n=8$ と $n=32$ について確率の上界を求め、その変化の意味を説明せよ。

<!-- solution-start -->
**詳細解答**

$e^\varepsilon-1=4/3-1=1/3$、$m^2-1=3$ なので[確率界](#thm-bhi7-snapshot-typicality)は

$$
\Pr\{\ln2-S\ge\ln(4/3)\}
\le\min\left\{1,\frac{3}{(2n+1)(1/3)}\right\}
=\min\left\{1,\frac9{2n+1}\right\}.
$$

$n=8$ なら $9/17\simeq0.5294$、$n=32$ なら $9/65\simeq0.1385$ です。環境次元を大きくすると、大きな欠損を持つ状態の確率上界は下がります。ただし「大きな環境を持つ時刻ほど必ずエントロピーが増す」という単一の時間履歴の単調性は、ここからは出ません。
<!-- solution-end -->

<a id="ex-bhi7-b03"></a>
#### BHI7-B03 新放射の相関と減少
- Level: B

古い放射 $R$ と新しい量子ビット $b$ について、(i) $|\Phi^+\rangle_{Rb}$、(ii) $\rho_{Rb}=(|00\rangle\langle00|+|11\rangle\langle11|)/2$ を考える。$S(R),S(b),S(Rb)$、増分 $\Delta=S(Rb)-S(R)$、相互情報量 $I(R:b)$ を求めよ。

<!-- solution-start -->
**詳細解答**

いずれも部分トレースは $\rho_R=\rho_b=I_2/2$ なので $S(R)=S(b)=\ln2$ です。

(i) Bell純粋状態の全体には固有値1が一つ、残りは0なので $S(Rb)=0$ です。従って

$$
\Delta=0-\ln2=-\ln2,\quad
I(R:b)=\ln2+\ln2-0=2\ln2.
$$

(ii) 古典相関状態の全体には非零固有値 $1/2,1/2$ があり $S(Rb)=\ln2$ です。従って

$$
\Delta=\ln2-\ln2=0,\quad
I(R:b)=\ln2+\ln2-\ln2=\ln2.
$$

[BHI6の増分恒等式](../BHI6/index.md#prop-bhi6-emission-increment) $\Delta=S(b)-I(R:b)$ へ代入しても一致します。非零の相関があるだけでは減少は起きず、$I(R:b)>S(b)$ が必要です。
<!-- solution-end -->

<a id="ex-bhi7-b04"></a>
#### BHI7-B04 交点が二つの段階の間にある場合
- Level: B

$k=0,\ldots,5$ について $(r_k,b_k)=(2^k,2^{5-k})$ とする。包絡線の最大値を持つ段階をすべて求め、連続補間の交点との違いを述べよ。

<!-- solution-start -->
**詳細解答**

$m_k=\min(2^k,2^{5-k})$ を列挙すると

$$
(m_0,\ldots,m_5)=(1,2,4,4,2,1),
$$

従って包絡線は $(0,\ln2,\ln4,\ln4,\ln2,0)$ です。最大値 $\ln4$ は $k=2$ と $k=3$ の**二段階**で達成します。連続補間で $2^t=2^{5-t}$ とすると $t=5/2$ にただ一つの交点があります。整数段階の系列にはその時刻が含まれないため、連続補間の「一意の交点」を「離散時刻の一意の最大」と言い換えるのは誤りです。なおHaar平均の最大位置を決めるには平均式へ各分割を代入して比較する必要があります。
<!-- solution-end -->

### Level C：純粋蒸発・Page平均・相関の統合

<a id="ex-bhi7-c01"></a>
#### BHI7-C01 同じ四量子ビットから三種類の「曲線」を比較する
- Level: C

四量子ビットを順次放射する模型で、次の三種類を比較する。

- (a) 初期状態が $|0000\rangle$ の逐次放射
- (b) 初期状態が $|\Phi^+\rangle_{14}\otimes|\Phi^+\rangle_{23}$ の逐次放射
- (c) 各段階で同じ次元分割に対するHaar平均

次を求めよ。

1. 各段階の放射エントロピー。
2. (b)の第3放射に対する $I(R_2:b_3)$。
3. (a)〜(c)のどれが実際の逐次等長発展で、どれが比較平均か。Page曲線を物理的予測にするための追加条件も述べよ。

<!-- solution-start -->
**詳細解答**

(1) 次元はすべての模型で $r_k=2^k,b_k=2^{4-k}$、$k=0,\ldots,4$ です。(a) の初期積状態はどの放射部分系でも純粋なので

$$
S_a(R_k)=(0,0,0,0,0).
$$

(b) の初期Bell対は、切断線をまたぐBell対の数が $k=0,1,2,3,4$ で $0,1,2,1,0$ です。例えば $k=2$ の縮約は $I_4/4$ で

$$
S_b(R_2)=-4\left(\frac14\ln\frac14\right)=\ln4=2\ln2.
$$

$k=3$ では $\rho_{R_3}=(I_2/2)_1\otimes|\Phi^+\rangle_{23}\langle\Phi^+|$ なので非零固有値は二つの $1/2$ であり

$$
S_b(R_k)=(0,\ln2,2\ln2,\ln2,0).
$$

(c) では $m_k=(1,2,4,2,1)$、$n_k=(16,8,4,8,16)$ を[文献Page平均式](#prop-bhi7-mean-bounds)の後の調和数表示へ代入して

$$
\overline S_k=(0,\ H_{16}-H_8-1/16,\ H_{16}-H_4-3/8,\
H_{16}-H_8-1/16,\ 0)
$$

となり、約 $(0,0.600372,0.922396,0.600372,0)$ natです。三者は同じ次元系列でも一致しません。

(2) $R_2$ は二量子ビット最大混合で $S(R_2)=2\ln2$。新放射 $b_3$ は一量子ビット最大混合で $S(b_3)=\ln2$。$R_3$ の固有値は $(1/2,1/2,0,\ldots,0)$ なので $S(R_3)=\ln2$ です。[相互情報量の定義](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)より

$$
I(R_2:b_3)=S(R_2)+S(b_3)-S(R_3)
=2\ln2+\ln2-\ln2=2\ln2.
$$

[BHI6の増分恒等式](../BHI6/index.md#prop-bhi6-emission-increment)から $\Delta_3=\ln2-2\ln2=-\ln2$ と確認できます。

(3) (a)(b) は同一の種類の等長SWAP放出写像を各段階に適用した、**個々の整合した純粋発展**です。初期状態のもつれの配置だけが異なります。(c) は各分割ごとにHaar分布で平均した**比較値**で、各時点を一本の発展としてつなぐ写像は与えられていません。従って実際のPage曲線を予測するには、(i) 放射／残存／未観測系の正しい分割、(ii) 放射と残存系の有効次元と時刻・エネルギーの関係、(iii) 典型的なもつれを生む力学、(iv) 終期と外部への情報流出の扱いが別途必要です。これは[純粋性だけの収支](../BHI6/index.md#thm-bhi6-entropy-budget)と[Haar平均](../../../応用系/QINF/QINF32/index.md#thm-qinf32-page-type-mean)の適用条件の違いです。
<!-- solution-end -->

## 10. 次に解く問い

Page型比較からは、典型的な純粋二部状態が小さい側の次元でエントロピーを制限されること、またその上限の大小関係が入れ替わると山型の**基準**が現れることが分かりました。一方、この議論は質量の減り方から交点の物理的時刻を決めていません。次のBHI8では、放射の粗視化エントロピーと残存側の熱力学的エントロピーの時間依存を**模型として明示してから**交点を見積もります。