# QINF4 精製とアンサンブル

[QINF2の密度演算子](../QINF2/index.md#def-qinf2-ensemble-density)は、異なる確率的準備を一つの状態として扱えます。[QINF3の部分トレース](../QINF3/index.md#def-qinf3-partial-trace)では、純粋なBell対を片側から見た状態が混合になることも確かめました。では向きを逆にして、**与えられた混合状態を、より大きな系の純粋状態の一部として必ず表せるでしょうか**。

答えは有限次元では「はい」です。さらに、同じ混合状態を与える大きな純粋状態は互いにどう関係し、なぜ異なるアンサンブルが同じ密度演算子を表すのかも分かります。以下、複素Hilbert空間はすべて有限次元で、内積は第二変数に線形とします。$A$ を手元の系、$R$ を補助系とし、テンソル積の順序を $A\otimes R$ に固定します。

## 1. 混合状態を純粋な全系に埋め込む

まず $A$ の正規直交基底 $|0\rangle,|1\rangle$ について、$\rho_A=p|0\rangle\langle0|+(1-p)|1\rangle\langle1|$（$0<p<1$）を考えます。$A$ にだけ $\sqrt p|0\rangle+\sqrt{1-p}|1\rangle$ を作ると、密度演算子には交差項が残り、$\rho_A$ とは一致しません。そこで補助系 $R$ に互いに直交する記録 $|0\rangle_R,|1\rangle_R$ を持たせ、

$$
|\Psi\rangle_{AR}
=\sqrt p|0\rangle_A|0\rangle_R+\sqrt{1-p}|1\rangle_A|1\rangle_R
$$

とすれば、[部分トレースの積への作用](../QINF3/index.md#prop-qinf3-state-product)で $R$ 側の交差項のトレースは0となり、望む $\rho_A$ が残ります。このように**全系は純粋で、一部を捨てると指定した密度演算子になる**表現を考えます。

<a id="def-qinf4-purification"></a>

<!-- formal-statement-start -->
> **定義（精製と精製補助系）**  
> 有限次元複素Hilbert空間 $H_A$ 上の密度演算子 $\rho_A$ に対し、別の有限次元複素Hilbert空間 $H_R$ と単位ベクトル $|\Psi\rangle\in H_A\otimes H_R$ が

$$
\operatorname{Tr}_R(|\Psi\rangle\langle\Psi|)=\rho_A
$$

> を満たすとき、$|\Psi\rangle$ を $\rho_A$ の**精製**、$R$ を**精製補助系**と呼ぶ。精製は純粋状態のベクトルを用いるが、その全体位相の違いは同じ物理状態を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf4-purification -->
### 定義の確認：非一様な二値混合

**定義の確認**：全系が単位ベクトルであり、縮約が指定した密度演算子になることを順に調べます。

$p=3/4$ とすると、

$$
|\Psi\rangle=\frac{\sqrt3}{2}|00\rangle+\frac12|11\rangle
$$

は正規化されています。実際、二つの積基底ベクトルは直交し、$\langle\Psi,\Psi\rangle=3/4+1/4=1$ です。外積を四項に展開し、[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)で $R$ の基底 $|0\rangle,|1\rangle$ に沿って対角成分を足すと、

$$
\begin{aligned}
|\Psi\rangle\langle\Psi|
&=\frac34|00\rangle\langle00|
+\frac{\sqrt3}{4}|00\rangle\langle11|\\
&\quad+\frac{\sqrt3}{4}|11\rangle\langle00|
+\frac14|11\rangle\langle11|,\\
\operatorname{Tr}_R(|\Psi\rangle\langle\Psi|)
&=\frac34|0\rangle\langle0|+\frac14|1\rangle\langle1|.
\end{aligned}
$$

交差項に付く $\operatorname{Tr}(|0\rangle\langle1|)=\langle1,0\rangle=0$ が鍵です。残った行列は自己共役、正値、トレース1であり、指定した混合状態です。
<!-- definition-example-end -->

任意の密度演算子でも同じ構成ができます。[密度演算子のスペクトル分解](../QINF2/index.md#thm-qinf2-density-ensemble)から、$\rho_A$ の**正の固有値だけ**を $\lambda_1,\ldots,\lambda_r>0$、対応する正規直交固有ベクトルを $|e_1\rangle,\ldots,|e_r\rangle$ と書きます。$r=\operatorname{rank}\rho_A\ge1$ です。零固有値の固有ベクトルには係数を付ける必要がありません。

<a id="thm-qinf4-existence"></a>

<!-- formal-statement-start -->
> **定理（有限次元状態の精製の存在）**  
> $H_A$ を有限次元複素Hilbert空間、$\rho_A$ をその密度演算子とする。$\rho_A$ の正の固有値と正規直交固有ベクトルを $\{(\lambda_j,e_j)\}_{j=1}^r$ と書く。$\dim H_R\ge r$ である任意の有限次元複素Hilbert空間 $H_R$ の正規直交系 $f_1,\ldots,f_r$ に対し、

$$
|\Omega_\rho\rangle
:=\sum_{j=1}^{r}\sqrt{\lambda_j}\,|e_j\rangle_A\otimes|f_j\rangle_R
$$

> は $\rho_A$ の精製である。特に $\dim H_R=r$ で常に精製を構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

スペクトル分解の確率 $\lambda_j$ を全系の**振幅の平方根**に変え、補助系の直交ラベルで互いの交差項を消します。正規化には $\sum_j\lambda_j=1$ を、縮約には $\langle f_k,f_j\rangle=\delta_{jk}$ を使います。

<!-- proof-start -->
### 証明

$\rho_A$ の三条件と[スペクトル分解](../QINF2/index.md#thm-qinf2-density-ensemble)により、正の固有値は総和1です。[積基底の内積](../QINF1/index.md#thm-qinf1-product-basis)を使うと

$$
\begin{aligned}
\langle\Omega_\rho,\Omega_\rho\rangle
&=\sum_{j,k=1}^r\sqrt{\lambda_j\lambda_k}
  \langle e_k,e_j\rangle\langle f_k,f_j\rangle\\
&=\sum_{j=1}^r\lambda_j=1.
\end{aligned}
$$

全系の外積を展開すると

$$
|\Omega_\rho\rangle\langle\Omega_\rho|
=\sum_{j,k=1}^r\sqrt{\lambda_j\lambda_k}\,
|e_j\rangle\langle e_k|\otimes|f_j\rangle\langle f_k|.
$$

[積作用素の部分トレース公式](../QINF3/index.md#prop-qinf3-state-product)を各項に適用します。$R$ の項のトレースは $\langle f_k,f_j\rangle=\delta_{kj}$ なので、

$$
\begin{aligned}
\operatorname{Tr}_R(|\Omega_\rho\rangle\langle\Omega_\rho|)
&=\sum_{j,k=1}^r\sqrt{\lambda_j\lambda_k}\,
|e_j\rangle\langle e_k|\delta_{kj}\\
&=\sum_{j=1}^r\lambda_j|e_j\rangle\langle e_j|
=\rho_A.
\end{aligned}
$$

従って正規化と精製の条件をともに満たします。$\dim H_R\ge r$ なら正規直交系を選べることから、同じ証明が通ります。
<!-- proof-end -->

純粋な $\rho_A=|a\rangle\langle a|$ なら $r=1$ なので、補助系の任意の単位ベクトル $|f\rangle$ に対する $|a\rangle\otimes|f\rangle$ が精製です。[純粋性とrankの同値](../QINF2/index.md#thm-qinf2-purity-rank)を使えば、rankが1を超える混合状態には、補助系と積に分かれた精製はあり得ません。

## 2. 補助系の最小次元はなぜrankなのか

精製を作るだけなら大きな補助系を持ち込めます。しかし、指定した状態の情報を「何本の直交ラベル」で担うかという問いには下限があります。全系の純粋ベクトルを $R$ の正規直交基底 $(f_\alpha)_{\alpha=1}^{d_R}$ で展開してみます。

<a id="prop-qinf4-minimal-rank"></a>

<!-- formal-statement-start -->
> **命題（精製補助系の最小次元）**  
> 有限次元複素Hilbert空間 $H_A$ 上の密度演算子 $\rho_A$ が $H_A\otimes H_R$ の単位ベクトルで精製できるなら、

$$
\operatorname{rank}\rho_A\le\dim H_R.
$$

> 等号を満たす補助系は必ず存在する。従って精製補助系の可能な最小次元は $\operatorname{rank}\rho_A$ である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の純粋ベクトルは $R$ の基底成分の和で書けます。部分トレースすると、その $d_R$ 個の成分ベクトルの外積の和となります。従って縮約作用素の像は高々 $d_R$ 次元です。

<!-- proof-start -->
### 証明

精製 $|\Psi\rangle$ を $R$ の正規直交基底で

$$
|\Psi\rangle=\sum_{\alpha=1}^{d_R}|u_\alpha\rangle_A\otimes|f_\alpha\rangle_R,
\qquad
|u_\alpha\rangle=(I_A\otimes\langle f_\alpha|)|\Psi\rangle
$$

と展開します。[部分トレースの定義](../QINF3/index.md#def-qinf3-partial-trace)と正規直交性から

$$
\rho_A=\operatorname{Tr}_R(|\Psi\rangle\langle\Psi|)
=\sum_{\alpha=1}^{d_R}|u_\alpha\rangle\langle u_\alpha|.
$$

任意の $v\in H_A$ について $\rho_Av=\sum_\alpha u_\alpha\langle u_\alpha,v\rangle$ であり、$\operatorname{im}\rho_A$ は $\operatorname{span}\{u_1,\ldots,u_{d_R}\}$ に含まれます。従ってrankは $d_R$ 以下です。逆に[存在定理](#thm-qinf4-existence)は $d_R=r=\operatorname{rank}\rho_A$ で精製を構成するため、下限が達成されます。
<!-- proof-end -->

例えば $\rho_A=I_2/2$ はrank 2なので、**一次元の補助系では精製できません**。一次元なら全系が積状態となって $A$ の縮約がrank 1となり、矛盾します。これは単なる「計算するのにラベルが足りない」ではなく、精製可能性を厳密に制限する条件です。

## 3. 同じ状態の精製は補助系側で結ばれる

異なる固有基底、異なる補助系でも精製を作れました。しかし「異なる精製を作る自由」は $A$ 側の測定結果を変えません。二つの精製を結ぶには、ベクトルの内積を保つ線形写像、すなわち $V^\dagger V=I_R$ を満たす**等長写像** $V:H_R\to H_{R'}$ を使います。これが存在するには $\dim H_R\le\dim H_{R'}$ が必要です。次元が等しければ等長写像はユニタリになります。

<a id="thm-qinf4-isometric-freedom"></a>

<!-- formal-statement-start -->
> **定理（同一縮約を持つ精製の等長写像による関係）**  
> 有限次元複素Hilbert空間 $H_A$ 上の同じ密度演算子 $\rho_A$ の精製を $|\Psi\rangle\in H_A\otimes H_R$、$|\Phi\rangle\in H_A\otimes H_{R'}$ とする。$\dim H_R\le\dim H_{R'}$ なら、等長写像 $V:H_R\to H_{R'}$ が存在して

$$
|\Phi\rangle=(I_A\otimes V)|\Psi\rangle
$$

> となる。特に補助系が同次元なら $V$ をユニタリに取れる。次元条件を置かない場合にも、両精製が使う $R,R'$ の部分空間（それぞれ次元 $\operatorname{rank}\rho_A$）の間には内積を保つ一対一の写像が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

同じ $\rho_A$ の固有ベクトル $e_j$ を両精製の $A$ 側で取り出します。各 $e_j$ に対応する $R$ 側の係数ベクトルを $\sqrt{\lambda_j}$ で割ると、それらは**それぞれ正規直交系**になります。対応する二組の正規直交系を写し、余った基底へ拡張すれば等長写像です。この計算は次章以降の分解定理を使いません。

<!-- proof-start -->
### 証明

$\rho_A$ の正の固有値を $\lambda_1,\ldots,\lambda_r$、対応する正規直交固有ベクトルを $e_1,\ldots,e_r$ とします。$R$ 側のベクトルを

$$
|a_j\rangle:=\lambda_j^{-1/2}
(\langle e_j|\otimes I_R)|\Psi\rangle
\quad(1\le j\le r)
$$

と定めます。分母が正なので定義できます。[部分トレースの期待値による特徴づけ](../QINF3/index.md#thm-qinf3-expectation-uniqueness)で $M=|e_k\rangle\langle e_j|$ を代入すると

$$
\begin{aligned}
\sqrt{\lambda_j\lambda_k}\,\langle a_j,a_k\rangle
&=\langle\Psi|(|e_j\rangle\langle e_k|\otimes I_R)|\Psi\rangle\\
&=\langle e_k,\rho_A e_j\rangle
=\lambda_j\delta_{jk}.
\end{aligned}
$$

従って $\langle a_j,a_k\rangle=\delta_{jk}$ です。$\rho_A$ の零固有値に属するベクトル $e$ については

$$
\|(\langle e|\otimes I_R)|\Psi\rangle\|^2
=\langle e,\rho_Ae\rangle=0
$$

なのでその係数は0です。よって

$$
|\Psi\rangle=\sum_{j=1}^r\sqrt{\lambda_j}\,|e_j\rangle\otimes|a_j\rangle.
$$

同じ計算を $|\Phi\rangle$ に行い、$R'$ の正規直交系 $(b_j)_{j=1}^r$ を得ます。$V a_j=b_j$ と指定すれば、$\operatorname{span}\{a_j\}$ 上の内積を保存します。$\dim R\le\dim R'$ なら、$R$ 側の $(a_j)$ を長さ $d_R$ の正規直交基底へ、$R'$ 側の $(b_j)$ を少なくとも長さ $d_R$ の正規直交系へそれぞれ拡張できます。残りの基底を順に対応させて線形に $V$ を定めると $V^\dagger V=I_R$ です。

この $V$ で $(I_A\otimes V)|\Psi\rangle=\sum_j\sqrt{\lambda_j}e_j\otimes b_j=|\Phi\rangle$ となります。次元が等しければ像が $H_{R'}$ 全体なので $VV^\dagger=I_{R'}$ も成り立ちます。次元が逆向きで等長写像全体を作れない場合でも、上記の $a_j\mapsto b_j$ は両側の $r$ 次元部分空間の間の一対一の等長写像です。
<!-- proof-end -->

注意点は「**等長写像が一意**」とは言っていないことです。正の固有値に対応する $r$ 本のベクトルの像は固定されますが、それ以外の補助系の未使用空間では拡張の自由が残ります。また $\dim R>\dim R'$ なら、$V^\dagger V=I_R$ を満たす全空間上の $V$ は存在しません。例えば $R=\mathbb C^3$ から $R'=\mathbb C^2$ への等長写像は、正規直交な3本を2次元へ写せないため不可能です。**同じ縮約**という仮定が崩れれば、上の内積の等式も使えません。

### 例：最小の精製から三次元補助系への埋め込み

$\rho_A=I_2/2$ に対し

$$
|\Omega\rangle=\frac{|0\rangle|0\rangle+|1\rangle|1\rangle}{\sqrt2}
\in\mathbb C^2\otimes\mathbb C^2
$$

とします。$R'=\mathbb C^3$ へ $V|0\rangle=|0\rangle$、$V|1\rangle=|2\rangle$ と定めると、$V$ は正規直交基底を正規直交系へ写すので $V^\dagger V=I_2$ です。

$$
(I\otimes V)|\Omega\rangle
=\frac{|0\rangle|0\rangle+|1\rangle|2\rangle}{\sqrt2}
\in\mathbb C^2\otimes\mathbb C^3
$$

は同じ $I_2/2$ を縮約として持ちます。一方、三次元全体を二次元へ等長に戻すことはできません。使われている二次元の部分空間だけを元へ戻せます。

## 4. アンサンブルの非一意性は補助系の測定から生まれる

[QINF2](../QINF2/index.md#thm-qinf2-density-ensemble)では一つの密度演算子が異なる純粋状態のアンサンブルで表せると学びました。では、各準備の番号はどこへ行ったのでしょうか。補助系に番号を保持する精製を作り、$R$ 側を基底測定すれば、どの純粋状態が条件付きで $A$ に現れるかを追えます。

まず $\rho_A=\sum_{i=1}^m p_i|\psi_i\rangle\langle\psi_i|$ というアンサンブルを考えます。ここでは $p_i>0$、$\|\psi_i\|=1$ とし、零確率の項があれば除きます。記録用の $m$ 次元補助系に正規直交基底 $|i\rangle$ を用意して

$$
|\Phi_{\mathcal E}\rangle
=\sum_{i=1}^m\sqrt{p_i}\,|\psi_i\rangle_A\otimes|i\rangle_R
$$

と置きます。$\psi_i$ 同士は直交していなくても、$|i\rangle$ が直交するので全体のノルムは $\sum_ip_i=1$ です。部分トレースでは $i\ne k$ の交差項が消え、$\rho_A$ が得られます。[局所射影測定](../QINF1/index.md#def-qinf1-local-projective)で $R$ の $|i\rangle\langle i|$ を測ると、結果 $i$ の前の非正規化された $A$ のベクトルは $\sqrt{p_i}\psi_i$、結果の確率は $p_i$、条件付き状態は $\psi_i$ です。

この構成は任意のアンサンブルを精製する方法です。さらに**一つの最小精製からすべての有限アンサンブルが得られる**ことを、係数の等長性として確かめます。これは次章で導入する一般化測定を仮定せず、補助系を必要な次元へ広げた後の通常の基底測定だけで済みます。

<a id="thm-qinf4-ensemble-measurement"></a>

<!-- formal-statement-start -->
> **定理（有限アンサンブルの精製測定による実現）**  
> 有限次元複素Hilbert空間 $H_A$ の密度演算子 $\rho_A$ がrank $r$ を持ち、正の固有値分解が $\rho_A=\sum_{j=1}^r\lambda_j|e_j\rangle\langle e_j|$ であるとする。$\rho_A$ の任意の有限アンサンブル表示

$$
\rho_A=\sum_{i=1}^m p_i|\psi_i\rangle\langle\psi_i|,
\qquad
p_i>0,\quad \sum_ip_i=1,\quad \|\psi_i\|=1
$$

> に対して $m\ge r$ であり、等長写像 $V:\mathbb C^r\to\mathbb C^m$ が存在して、標準基底 $(|j\rangle)$ を用いた最小精製

$$
|\Omega_\rho\rangle=\sum_{j=1}^r\sqrt{\lambda_j}|e_j\rangle|j\rangle
$$

> から次の等式でアンサンブル精製が得られる。

$$
(I_A\otimes V)|\Omega_\rho\rangle
=\sum_{i=1}^m\sqrt{p_i}|\psi_i\rangle|i\rangle.
$$

> 右辺の補助系を標準基底で射影測定すると結果 $i$ の確率は $p_i$、そのときの $A$ の条件付き純粋状態は $|\psi_i\rangle\langle\psi_i|$ となる。測定結果を捨てた $A$ の状態は $\rho_A$ のままである。
<!-- formal-statement-end -->

### 証明の見取り図

スペクトル分解の直交する $e_j$ と、アンサンブルの一般には非直交な $\psi_i$ をつなぐ係数行列を作ります。密度演算子が同じであることは、その行列の**列が正規直交する**という条件に一致します。列を補助系のベクトルと見れば等長写像が完成します。

<!-- proof-start -->
### 証明

$\rho_A$ は $\sum_i p_i|\psi_i\rangle\langle\psi_i|$ なので、$\operatorname{im}\rho_A\subseteq\operatorname{span}\{\psi_i\}$ です。よって $r\le m$ です。$\rho_A$ の零固有値に属する単位ベクトル $z$ について

$$
0=\langle z,\rho_Az\rangle
=\sum_{i=1}^m p_i|\langle\psi_i,z\rangle|^2
$$

です。すべての項が非負で $p_i>0$ なので、すべての $\psi_i$ は $\rho_A$ の正の固有値に対応する部分空間 $\operatorname{span}\{e_j\}_{j=1}^r$ に入ります。

$m\times r$ 行列 $W$ を、その行 $i$ がアンサンブルの準備番号、列 $j$ が $\rho_A$ の固有ベクトル番号となるように

$$
W_{ij}:=\frac{\sqrt{p_i}}{\sqrt{\lambda_j}}\langle e_j,\psi_i\rangle
$$

と定めます。$j,k\in\{1,\ldots,r\}$ について、内積の複素共役の向きに注意して

$$
\begin{aligned}
(W^\dagger W)_{jk}
&=\sum_{i=1}^m\overline{W_{ij}}W_{ik}\\
&=\frac1{\sqrt{\lambda_j\lambda_k}}
  \sum_i p_i\langle\psi_i,e_j\rangle\langle e_k,\psi_i\rangle\\
&=\frac{\langle e_k,\rho_Ae_j\rangle}{\sqrt{\lambda_j\lambda_k}}\\
&=\frac{\lambda_j\delta_{kj}}{\sqrt{\lambda_j\lambda_k}}
=\delta_{jk}.
\end{aligned}
$$

従って $W^\dagger W=I_r$ で、$V|j\rangle:=\sum_iW_{ij}|i\rangle$ と定めれば $V$ は等長写像です。ここで

$$
\begin{aligned}
(I_A\otimes V)|\Omega_\rho\rangle
&=\sum_{j=1}^r\sum_{i=1}^m
 \sqrt{\lambda_j}W_{ij}|e_j\rangle|i\rangle\\
&=\sum_{i=1}^m\sqrt{p_i}
 \left(\sum_{j=1}^r\langle e_j,\psi_i\rangle|e_j\rangle\right)|i\rangle\\
&=\sum_{i=1}^m\sqrt{p_i}|\psi_i\rangle|i\rangle
\end{aligned}
$$

となります。最後の等号は $\psi_i$ が正の固有値の部分空間に入ることから従います。[局所射影測定のBorn則](../QINF1/index.md#prop-qinf1-joint-born)で測定射影 $I_A\otimes|i\rangle\langle i|$ を右辺に作用させれば、非正規化された射影後ベクトルは $\sqrt{p_i}\psi_i\otimes|i\rangle$ です。そのノルム二乗は $p_i$ であり、$p_i>0$ を使って正規化すると $\psi_i\otimes|i\rangle$ になります。

結果を読まなければ、[非選択射影測定で相手の縮約が不変](../QINF3/index.md#prop-qinf3-no-signalling)であることから $A$ の状態は $\rho_A$ です。直接にも、結果について和を取ると $\sum_i p_i|\psi_i\rangle\langle\psi_i|=\rho_A$ です。
<!-- proof-end -->

### 例：同じ最大混合状態が二つの測定基底から現れる

最小精製のBell状態

$$
|\Phi^+\rangle=\frac{|00\rangle+|11\rangle}{\sqrt2}
$$

の $R$ を $|0\rangle,|1\rangle$ で測れば、$A$ は確率半々で $|0\rangle,|1\rangle$ に条件付けられます。一方

$$
|+\rangle=\frac{|0\rangle+|1\rangle}{\sqrt2},
\qquad
|-\rangle=\frac{|0\rangle-|1\rangle}{\sqrt2}
$$

と置くと、積を展開することにより

$$
|\Phi^+\rangle
=\frac{|+\rangle_A|+\rangle_R+|-\rangle_A|-\rangle_R}{\sqrt2}.
$$

従って $R$ を $|+\rangle,|-\rangle$ で測れば、$A$ は確率半々で $|+\rangle,|-\rangle$ になります。二つのアンサンブルの密度演算子はどちらも $I_2/2$ です。$A$ だけで行う測定では、$R$ のどの基底を選んだか区別できません。

この実数係数の例を、一般の複素基底で単純に「両側同じ基底」と読み替えてはいけません。例えば $|+i\rangle=(|0\rangle+i|1\rangle)/\sqrt2$ と $|-i\rangle=(|0\rangle-i|1\rangle)/\sqrt2$ では、

$$
|\Phi^+\rangle
=\frac{|+i\rangle_A|-i\rangle_R+|-i\rangle_A|+i\rangle_R}{\sqrt2}.
$$

補助系側の係数が複素共役になるのは、$|00\rangle+|11\rangle$ の交差項を正確に打ち消すためです。測定基底の選択とアンサンブルの対応では、この位相を取り違えないことが重要です。

## 5. 精製が教えること・教えないこと

精製は密度演算子を「純粋状態の部分系」として扱う道具です。しかし**同じ密度演算子から、準備時に実際どのアンサンブルが使われたかは復元できません**。その区別には $R$ 側の記録や測定結果を知る追加情報が要ります。[縮約の局所測定確率](../QINF3/index.md#prop-qinf3-local-born)は $\rho_A$ のみで決まり、遠方の記録の選び方では変わりません。

ここで用いた操作は有限次元でのスペクトル分解、部分トレース、補助系の射影測定です。一般化量子測定・量子チャネルやSchmidt分解はまだ使っていません。後続では精製と測定の対応を、より一般の量子操作へ広げます。

## 6. 演習：混合・純粋・測定を往復する

全問で有限次元複素Hilbert空間を考え、指定がなければ $|0\rangle,|1\rangle$ はqubitの計算基底、テンソル積の順序は $A\otimes R$ です。各解答では補助系の次元、正規化、部分トレースの対象を確認してください。

<a id="ex-qinf4-a01"></a>
### QINF4-A01 対角状態の精製

- Level: A
- 問題: $\rho_A=\operatorname{diag}(2/5,3/5)$ の最小次元補助系への精製を一つ構成せよ。全系のノルムと $R$ の部分トレースを計算せよ。

<!-- solution-start -->
**詳細解答**。正の固有値は $2/5,3/5$、固有ベクトルは $|0\rangle,|1\rangle$ でrankは2です。[精製の存在定理](#thm-qinf4-existence)で $H_R=\mathbb C^2$ と取ると

$$
|\Psi\rangle=\sqrt{\frac25}|00\rangle+\sqrt{\frac35}|11\rangle.
$$

$\langle00,11\rangle=0$ なので $\|\Psi\|^2=2/5+3/5=1$ です。外積を分配して

$$
|\Psi\rangle\langle\Psi|
=\frac25|00\rangle\langle00|
+\frac{\sqrt6}{5}\bigl(|00\rangle\langle11|+|11\rangle\langle00|\bigr)
+\frac35|11\rangle\langle11|.
$$

[積の部分トレース公式](../QINF3/index.md#prop-qinf3-state-product)で交差項の $R$ 側のトレースが0となり、$\operatorname{Tr}_R|\Psi\rangle\langle\Psi|=(2/5)|0\rangle\langle0|+(3/5)|1\rangle\langle1|=\rho_A$ です。rankが2なので[最小次元命題](#prop-qinf4-minimal-rank)により一次元にはできません。
<!-- solution-end -->

<a id="ex-qinf4-a02"></a>
### QINF4-A02 非対角状態を固有基底から精製する

- Level: A
- 問題: $0<t<1$ とし、$\rho_A=\frac12\begin{pmatrix}1&t\\t&1\end{pmatrix}$ とする。固有値と固有ベクトルを求め、最小精製を書け。得られる縮約行列を計算せよ。

<!-- solution-start -->
**詳細解答**。$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ と $|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ は正規直交します。直接行列を掛けると

$$
\rho_A|+\rangle=\frac{1+t}{2}|+\rangle,
\qquad
\rho_A|-\rangle=\frac{1-t}{2}|-\rangle.
$$

どちらの固有値も正なのでrank 2です。$R$ の基底を $|0\rangle,|1\rangle$ として

$$
|\Psi\rangle
=\sqrt{\frac{1+t}{2}}|+\rangle|0\rangle
+\sqrt{\frac{1-t}{2}}|-\rangle|1\rangle
$$

とします。係数の平方和は $(1+t)/2+(1-t)/2=1$ です。部分トレースでは $R$ の異なる基底間の交差項が消え、

$$
\begin{aligned}
\operatorname{Tr}_R|\Psi\rangle\langle\Psi|
&=\frac{1+t}{2}|+\rangle\langle+|
+\frac{1-t}{2}|-\rangle\langle-|\\
&=\frac14\begin{pmatrix}1+t&1+t\\1+t&1+t\end{pmatrix}
+\frac14\begin{pmatrix}1-t&-(1-t)\\-(1-t)&1-t\end{pmatrix}\\
&=\frac12\begin{pmatrix}1&t\\t&1\end{pmatrix}.
\end{aligned}
$$

対角項だけでなく非対角項も再現されました。
<!-- solution-end -->

<a id="ex-qinf4-a03"></a>
### QINF4-A03 純粋状態と最小補助系

- Level: A
- 問題: $H_A=\mathbb C^3$ とし、$|a\rangle=(|0\rangle+|1\rangle)/\sqrt2$ とする。$\rho_A=|a\rangle\langle a|$ の一次元補助系による精製を作れ。一方 $\sigma_A=I_3/3$ を二次元補助系で精製できるか、rankから判定せよ。

<!-- solution-start -->
**詳細解答**。$|a\rangle$ は $\|a\|^2=1/2+1/2=1$ です。一次元の補助系の単位ベクトルを $|f\rangle$ とすれば $|\Psi\rangle=|a\rangle|f\rangle$ は単位ベクトルです。[積作用素の部分トレース](../QINF3/index.md#prop-qinf3-state-product)から

$$
\operatorname{Tr}_R|\Psi\rangle\langle\Psi|
=|a\rangle\langle a|\,\operatorname{Tr}(|f\rangle\langle f|)
=|a\rangle\langle a|.
$$

$\rho_A$ のrankは1で最小次元と一致します。他方 $\sigma_A$ は3本の基底方向に固有値 $1/3$ を持ち、rank 3です。[最小次元命題](#prop-qinf4-minimal-rank)より精製には少なくとも三次元の補助系が必要です。二次元ではできません。
<!-- solution-end -->

<a id="ex-qinf4-a04"></a>
### QINF4-A04 補助系を測ってアンサンブルを得る

- Level: A
- 問題: $|\Psi\rangle=\frac12|00\rangle+\frac{\sqrt3}{2}|11\rangle$ について、$R$ を計算基底で測定した各結果の確率・条件付き $A$ の状態・結果を無視した密度演算子を求めよ。

<!-- solution-start -->
**詳細解答**。全体のノルム二乗は $1/4+3/4=1$ です。$R$ の射影 $P_0=|0\rangle\langle0|$、$P_1=|1\rangle\langle1|$ を適用すると、

$$
\begin{aligned}
(I\otimes P_0)|\Psi\rangle&=\frac12|00\rangle,
&\quad p_0&=\left\|\frac12|00\rangle\right\|^2=\frac14,\\
(I\otimes P_1)|\Psi\rangle&=\frac{\sqrt3}{2}|11\rangle,
&\quad p_1&=\left\|\frac{\sqrt3}{2}|11\rangle\right\|^2=\frac34.
\end{aligned}
$$

それぞれ $\sqrt{p_i}$ で割って正規化すると、$A$ の条件付き状態は結果0で $|0\rangle$、結果1で $|1\rangle$ です。結果を無視すれば

$$
\rho_A=p_0|0\rangle\langle0|+p_1|1\rangle\langle1|
=\begin{pmatrix}1/4&0\\0&3/4\end{pmatrix}.
$$

この行列は元の純粋全系からの部分トレースとも一致します。
<!-- solution-end -->

<a id="ex-qinf4-b01"></a>
### QINF4-B01 補助系の位相は縮約に現れない

- Level: B
- 問題: $0<p<1$ と $\theta\in\mathbb R$ に対し、$|\Psi_\theta\rangle=\sqrt p|00\rangle+e^{i\theta}\sqrt{1-p}|11\rangle$ を考える。(1) 全体を正規化せよ。(2) $R$ の部分トレースが $\theta$ に依らないことを確かめよ。(3) $|\Psi_0\rangle$ から局所ユニタリを明示して $|\Psi_\theta\rangle$ を得よ。

<!-- solution-start -->
**詳細解答**。積基底の直交性より

$$
\|\Psi_\theta\|^2
=p+|e^{i\theta}|^2(1-p)=p+(1-p)=1.
$$

外積では対角項 $p|00\rangle\langle00|$、$(1-p)|11\rangle\langle11|$ に加えて、$\sqrt{p(1-p)}e^{-i\theta}|00\rangle\langle11|$ とその随伴が現れます。[部分トレースの積公式](../QINF3/index.md#prop-qinf3-state-product)で交差項は $\langle1,0\rangle=0$ のため消え、

$$
\operatorname{Tr}_R|\Psi_\theta\rangle\langle\Psi_\theta|
=p|0\rangle\langle0|+(1-p)|1\rangle\langle1|.
$$

$R$ 上に $U_\theta=\operatorname{diag}(1,e^{i\theta})$ と置きます。$U_\theta^\dagger U_\theta=I_2$ なのでユニタリで、

$$
(I_A\otimes U_\theta)|\Psi_0\rangle
=\sqrt p|00\rangle+e^{i\theta}\sqrt{1-p}|11\rangle
=|\Psi_\theta\rangle.
$$

二つの精製は[等長写像による関係](#thm-qinf4-isometric-freedom)の具体例です。位相を変えると全系の相関には変化が起こり得ますが、$A$ 単独の縮約は変わりません。
<!-- solution-end -->

<a id="ex-qinf4-b02"></a>
### QINF4-B02 異なる次元の二つの精製

- Level: B
- 問題: $\rho_A=I_2/2$、$|\Psi\rangle=(|00\rangle+|11\rangle)/\sqrt2\in\mathbb C^2\otimes\mathbb C^2$、$|\Phi\rangle=(|0\rangle|0\rangle+|1\rangle|2\rangle)/\sqrt2\in\mathbb C^2\otimes\mathbb C^3$ とする。(1) 両者が $\rho_A$ の精製であることを確認せよ。(2) $V:\mathbb C^2\to\mathbb C^3$ の行列を作れ。(3) 逆方向に全空間上の等長写像がない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。どちらも直交する二項で、ノルム二乗は $1/2+1/2=1$ です。各外積の交差項は $R$ 側の基底が異なるので部分トレースで消えます。従って両者の縮約は $(|0\rangle\langle0|+|1\rangle\langle1|)/2=I_2/2$ です。

$V$ の列は、入力基底 $|0\rangle,|1\rangle$ の像を三次元の座標で表示したものです。$V|0\rangle=|0\rangle$、$V|1\rangle=|2\rangle$ として

$$
V=\begin{pmatrix}1&0\\0&0\\0&1\end{pmatrix},
\qquad
V^\dagger V=\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

従って $(I_A\otimes V)|\Psi\rangle=|\Phi\rangle$ です。逆の線形写像 $T:\mathbb C^3\to\mathbb C^2$ が等長なら、3本の互いに直交する単位ベクトルを $\mathbb C^2$ の3本の正規直交ベクトルへ写す必要があり、次元に矛盾します。$\operatorname{span}\{|0\rangle,|2\rangle\}$ の中だけなら $|0\rangle\mapsto|0\rangle$、$|2\rangle\mapsto|1\rangle$ と内積を保つ対応を作れます。
<!-- solution-end -->

<a id="ex-qinf4-b03"></a>
### QINF4-B03 三つの非直交状態から同じ最大混合を作る

- Level: B
- 問題: $\omega=e^{2\pi i/3}$、$|\psi_k\rangle=(|0\rangle+\omega^k|1\rangle)/\sqrt2$（$k=0,1,2$）とする。(1) 各状態を確率 $1/3$ で混合すると $\rho_A=I_2/2$ となることを示せ。(2) [アンサンブル実現定理](#thm-qinf4-ensemble-measurement)の係数行列 $W$ を求め、$W^\dagger W=I_2$ を検算せよ。(3) 最小精製から三次元補助系を用いるアンサンブル精製を与えよ。

<!-- solution-start -->
**詳細解答**。$|\omega|=1$ なので各 $\psi_k$ は単位ベクトルです。外積は

$$
|\psi_k\rangle\langle\psi_k|
=\frac12\begin{pmatrix}1&\overline{\omega}^k\\\omega^k&1\end{pmatrix}.
$$

$1+\omega+\omega^2=0$ とその複素共役を使い、三つを確率 $1/3$ で平均すると

$$
\rho_A=\frac16
\begin{pmatrix}3&\sum_k\overline{\omega}^k\\\sum_k\omega^k&3\end{pmatrix}
=\frac12I_2.
$$

固有値は $\lambda_0=\lambda_1=1/2$、固有基底は $|0\rangle,|1\rangle$ と選べます。定理の式へ $p_k=1/3$ と $\langle0,\psi_k\rangle=1/\sqrt2$、$\langle1,\psi_k\rangle=\omega^k/\sqrt2$ を入れると

$$
W=\frac1{\sqrt3}
\begin{pmatrix}1&1\\1&\omega\\1&\omega^2\end{pmatrix}.
$$

列ノルムはどちらも $\frac13(1+1+1)=1$、列間内積は $(1+\omega+\omega^2)/3=0$ です。よって $W^\dagger W=I_2$。最小精製 $|\Omega\rangle=(|00\rangle+|11\rangle)/\sqrt2$ へ $I\otimes V$（$V$ の行列が $W$）を作用させると

$$
\begin{aligned}
(I\otimes V)|\Omega\rangle
&=\frac1{\sqrt6}\sum_{k=0}^2
 (|0\rangle+\omega^k|1\rangle)|k\rangle\\
&=\frac1{\sqrt3}\sum_{k=0}^2|\psi_k\rangle|k\rangle.
\end{aligned}
$$

補助系を $|0\rangle,|1\rangle,|2\rangle$ で測ると結果 $k$ の確率は $1/3$、条件付き $A$ は $\psi_k$ となります。互いに非直交な3状態を含むアンサンブルでも、二次元の密度演算子に対応しています。
<!-- solution-end -->

<a id="ex-qinf4-b04"></a>
### QINF4-B04 複素測定基底の共役を落とさない

- Level: B
- 問題: $|+i\rangle=(|0\rangle+i|1\rangle)/\sqrt2$、$|-i\rangle=(|0\rangle-i|1\rangle)/\sqrt2$ とする。Bell精製 $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ の $R$ を基底 $\{|+i\rangle,|-i\rangle\}$ で測定するとき、結果ごとの $A$ の状態を求めよ。また $|\Phi^+\rangle=(|+i,+i\rangle+|-i,-i\rangle)/\sqrt2$ という誤った展開の失敗を計算で示せ。

<!-- solution-start -->
**詳細解答**。$R$ に $\langle+i|=(\langle0|-i\langle1|)/\sqrt2$ を作用させると、

$$
\begin{aligned}
(I\otimes\langle+i|)|\Phi^+\rangle
&=\frac12(|0\rangle-i|1\rangle)
=\frac1{\sqrt2}|-i\rangle,\\
(I\otimes\langle-i|)|\Phi^+\rangle
&=\frac12(|0\rangle+i|1\rangle)
=\frac1{\sqrt2}|+i\rangle.
\end{aligned}
$$

それぞれのノルム二乗は $1/2$ なので、結果 $+i$ なら $A$ は $|-i\rangle$、結果 $-i$ なら $A$ は $|+i\rangle$ です。誤った展開の分子を直接足すと

$$
|+i,+i\rangle+|-i,-i\rangle
=|00\rangle-|11\rangle
$$

で、これは $|00\rangle+|11\rangle$ とは異なります。補助系側を複素共役の基底にすれば

$$
|+i,-i\rangle+|-i,+i\rangle=|00\rangle+|11\rangle
$$

となって正しく一致します。共役を落とすと、相関の相対位相が変わり、同じBellベクトルの展開にはなりません。
<!-- solution-end -->

<a id="ex-qinf4-c01"></a>
### QINF4-C01 非対角状態の精製と非直交アンサンブルの統合

- Level: C
- 問題: $H_A=\mathbb C^2$ 上の $\rho_A=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}$ を考える。(1) 固有値と正規直交固有ベクトルを求め、最小精製 $|\Omega\rangle$ を構成せよ。(2) 次の二つの状態の等確率混合が $\rho_A$ を与えることを示せ。

$$
|\psi_\pm\rangle=\frac{\sqrt3}{2}|+\rangle\pm\frac12|-\rangle,
\quad
|+\rangle=\frac{|0\rangle+|1\rangle}{\sqrt2},
\quad
|-\rangle=\frac{|0\rangle-|1\rangle}{\sqrt2}.
$$

- 問題（続き）: (3) 定理の係数行列 $W$ を作り $W^\dagger W=I_2$ を確かめよ。(4) $|\Omega\rangle$ の補助系に適切な射影測定を行い、二つの条件付き状態とその確率を導け。(5) 補助系が一次元では不可能な理由と、二つの状態が直交しない理由を述べよ。

<!-- solution-start -->
**詳細解答**。行列を $|+\rangle,|-\rangle$ に作用させると

$$
\rho_A|+\rangle=\frac34|+\rangle,
\qquad
\rho_A|-\rangle=\frac14|-\rangle.
$$

どちらも正なのでrankは2です。[精製の存在定理](#thm-qinf4-existence)に従い $R=\mathbb C^2$ とすると

$$
|\Omega\rangle=\frac{\sqrt3}{2}|+\rangle_A|0\rangle_R
+\frac12|-\rangle_A|1\rangle_R.
$$

これは直交する二項なのでノルム1であり、部分トレースを取れば $(3/4)|+\rangle\langle+|+(1/4)|-\rangle\langle-|=\rho_A$ です。

次に $\|\psi_\pm\|^2=3/4+1/4=1$ です。外積を展開すると

$$
|\psi_\pm\rangle\langle\psi_\pm|
=\frac34|+\rangle\langle+|
+\frac14|-\rangle\langle-|
\pm\frac{\sqrt3}{4}
\bigl(|+\rangle\langle-|+|-\rangle\langle+|\bigr).
$$

符号が逆の二つを平均すると交差項が打ち消し合い、

$$
\frac12|\psi_+\rangle\langle\psi_+|
+\frac12|\psi_-\rangle\langle\psi_-|
=\frac34|+\rangle\langle+|+\frac14|-\rangle\langle-|=\rho_A.
$$

定理の固有基底を $(e_1,e_2)=(|+\rangle,|-\rangle)$ とし、アンサンブルの番号を $(\psi_+,\psi_-)$ とします。$p_\pm=1/2$、$\lambda_1=3/4$、$\lambda_2=1/4$ を[係数行列の式](#thm-qinf4-ensemble-measurement)へ入れると

$$
W=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\qquad
W^\dagger W=\frac12\begin{pmatrix}2&0\\0&2\end{pmatrix}=I_2.
$$

従って $V$ は補助系のHadamardユニタリ $H$ です。$H|0\rangle=(|0\rangle+|1\rangle)/\sqrt2$、$H|1\rangle=(|0\rangle-|1\rangle)/\sqrt2$ を精製へ代入し、

$$
\begin{aligned}
(I\otimes H)|\Omega\rangle
&=\frac1{\sqrt2}
 \left[\left(\frac{\sqrt3}{2}|+\rangle+\frac12|-\rangle\right)|0\rangle
 +\left(\frac{\sqrt3}{2}|+\rangle-\frac12|-\rangle\right)|1\rangle\right]\\
&=\frac1{\sqrt2}\bigl(|\psi_+\rangle|0\rangle+|\psi_-\rangle|1\rangle\bigr).
\end{aligned}
$$

この補助系を $|0\rangle,|1\rangle$ で測定すると結果は各確率 $1/2$、条件付き $A$ はそれぞれ $\psi_+,\psi_-$ です。これは元の $|\Omega\rangle$ の補助系を $|+\rangle,|-\rangle$ 基底で測ることと同じ予測を与えます。

最後に $\rho_A$ のrankは2であるため[最小次元命題](#prop-qinf4-minimal-rank)から一次元補助系では精製不可能です。また

$$
\langle\psi_+,\psi_-\rangle
=\frac34-\frac14=\frac12\ne0
$$

なので二つの準備状態は非直交です。それでも、補助系に直交する結果番号を保存すれば等確率混合として実現できます。「準備番号が直交」と「準備される状態が直交」は別の条件です。
<!-- solution-end -->

## 7. 本章で獲得した道具

- 任意の有限次元密度演算子には、正の固有値の平方根と直交する補助系ラベルから精製を構成できる。
- 補助系の最小次元は密度演算子のrankに一致する。同じ縮約を与える精製は、次元条件を満たす向きでは補助系の等長写像で結ばれる。
- 任意の有限アンサンブルは、補助系の基底測定で条件付き状態として実現できる。アンサンブルが違っても、結果を捨てた $A$ の密度演算子は同じである。

次章では、測定結果ごとに異なる状態変化を含むより一般の測定を扱い、補助系の構成との関係を調べます。
