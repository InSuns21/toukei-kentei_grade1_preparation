# QINF2 密度演算子とアンサンブル

[QM2の純粋状態](../../../解析系/QM/QM2/index.md#def-qm2-normalized-pure-state)と[Born則](../../../解析系/QM/QM2/index.md#axiom-qm2-born-rule)では、一回ごとの準備を単位ベクトルで表し、射影測定の確率を求めました。しかし実験者が確率半々で $|0\rangle$ と $|1\rangle$ を準備し、どちらを選んだかの記録を渡さない場合、受け手は一本の状態ベクトルを指定できません。これは $|0\rangle$ と $|1\rangle$ を**重ね合わせて** $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を準備する操作と異なります。

両方とも $|0\rangle,|1\rangle$ 基底では半々ですが、$|+\rangle,|-\rangle$ 基底での測定結果は違います。必要なのは、準備の確率と量子振幅の干渉を混同せず、**すべての測定確率を一つの対象に記録すること**です。本章では有限次元複素Hilbert空間だけを考え、その対象を密度演算子として導入します。複合系の一部を捨てる数学的操作はQINF3で扱います。

## 1. 確率的な準備を一つの作用素で表す

まず純粋状態 $\psi$ はノルム1の列ベクトルとし、$\langle\phi,\psi\rangle=\phi^\dagger\psi$（第二変数で線形）とします。射影 $|\psi\rangle\langle\psi|$ は、入力ベクトル $v$ を $\psi\langle\psi,v\rangle$ に写す作用素です。$v$ と $\psi$ を正規直交基底で成分表示すれば、その行列は列 $\psi$ と行 $\psi^\dagger$ の積になります。これにより内積を使う測定式を、行列の対角成分の総和で扱えるようになります。

準備の選択を表す番号 $j=1,\ldots,m$ と、その選択確率 $p_j$ を考えます。番号を知っていれば状態は $\psi_j$、知らなければ測定確率を $p_j$ で平均する必要があります。各純粋状態の射影を同じ確率で平均したものが、次の作用素です。

その条件を書く前に、作用素の**トレース**を定めます。正規直交基底 $(e_k)_{k=1}^d$ を一つ選び、作用素 $T$ の対角成分を足した

$$
\operatorname{Tr}T:=\sum_{k=1}^d\langle e_k,Te_k\rangle
$$

がトレースです。この値は基底の選び方に依りません。実際、別の正規直交基底への変換行列 $U$ は[ユニタリ](../../../基礎科目/LA/LA5/index.md#def-la5-unitary)で、そこでは $T$ の行列が $U^\dagger T U$ になります。有限行列の積について

$$
\operatorname{Tr}(AB)=\sum_{i,j}A_{ij}B_{ji}
=\sum_{i,j}B_{ji}A_{ij}=\operatorname{Tr}(BA)
$$

したがって基底を変えても

$$
\operatorname{Tr}(U^\dagger T U)
=\operatorname{Tr}(TUU^\dagger)=\operatorname{Tr}T
$$

です。また、以下でいう**自己共役**とは[LA5のHermitian作用素](../../../基礎科目/LA/LA5/index.md#def-la5-hermitian)と同じ $T^\dagger=T$ という条件です。

<a id="def-qinf2-ensemble-density"></a>

<!-- formal-statement-start -->
> **定義（有限量子アンサンブルと密度演算子）**  
> $H$ を次元 $d\ge1$ の複素Hilbert空間とする。有限個の単位ベクトル $\psi_1,\ldots,\psi_m\in H$ と確率 $p_j\ge0$、$\sum_{j=1}^m p_j=1$ の組 $\mathcal E=\{(p_j,\psi_j)\}_{j=1}^m$ を有限量子アンサンブルと呼ぶ。その密度演算子を

$$
\rho_{\mathcal E}:=\sum_{j=1}^m p_j|\psi_j\rangle\langle\psi_j|
$$

> とする。一般に $H$ 上の作用素 $\rho$ が**密度演算子**であるとは、$\rho$ が自己共役で、任意の $v\in H$ に対して $\langle v,\rho v\rangle\ge0$（正値、ここでは半正定値）を満たし、$\operatorname{Tr}\rho=1$ であることをいう。
<!-- formal-statement-end -->

正値であるという条件は「対角成分が非負」より強く、**すべての** $v$ で二次形式が非負という条件です。$|\psi\rangle\langle\psi|$ の正値性は

$$
\langle v,|\psi\rangle\langle\psi|v\rangle
=|\langle\psi,v\rangle|^2\ge0
$$

から直接分かります。加えて、この射影のトレースは正規直交基底の完全性から

$$
\operatorname{Tr}(|\psi\rangle\langle\psi|)
=\sum_k|\langle\psi,e_k\rangle|^2=\|\psi\|^2=1
$$

です。したがってアンサンブルから作った $\rho_{\mathcal E}$ は自己共役・正値で、トレースが $\sum_jp_j=1$ です。逆方向も成り立つことが、密度演算子を独立の状態記述にする理由です。

<a id="thm-qinf2-density-ensemble"></a>

<!-- formal-statement-start -->
> **定理（密度演算子とアンサンブルの同値）**  
> 次元 $d\ge1$ の複素Hilbert空間 $H$ 上の作用素 $\rho$ は、自己共役・正値・$\operatorname{Tr}\rho=1$ を満たすことと、有限個の単位ベクトルと確率による表示

$$
\rho=\sum_{j=1}^{m}p_j|\psi_j\rangle\langle\psi_j|,
\qquad p_j\ge0,\quad \sum_jp_j=1
$$

> を持つことが同値である。後者は $m\le d$ の直交する $\psi_j$ でも実現できる。
<!-- formal-statement-end -->

### 証明の見取り図

アンサンブルから密度演算子への方向は上の二次形式とトレースの計算です。逆方向では有限次元の自己共役行列を正規直交固有基底へ分解します。正値性が固有値の非負性を、トレースが確率の総和1を保証します。

<!-- proof-start -->
### 証明

アンサンブル表示があるとき、各 $|\psi_j\rangle\langle\psi_j|$ は自己共役なので和も自己共役です。任意の $v\in H$ に対して

$$
\langle v,\rho v\rangle
=\sum_jp_j|\langle\psi_j,v\rangle|^2\ge0,
\qquad
\operatorname{Tr}\rho=\sum_jp_j\|\psi_j\|^2=\sum_jp_j=1.
$$

逆に $\rho$ が三条件を満たすとします。$\rho$ は自己共役なので正規です。[LA5の複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)をこの有限次元行列に適用し、正規直交固有基底 $e_1,\ldots,e_d$ と実固有値 $\lambda_j$ を用い

$$
\rho=\sum_{j=1}^d\lambda_j|e_j\rangle\langle e_j|
$$

と書けます。$v=e_j$ を正値条件に代入すると

$$
0\le\langle e_j,\rho e_j\rangle
=\lambda_j\langle e_j,e_j\rangle=\lambda_j.
$$

またトレースを同じ基底で取れば $\sum_{j=1}^d\lambda_j=1$ です。$\lambda_j=0$ の項を削除すれば、残る固有ベクトルは互いに直交する単位ベクトルで、その固有値は総和1の確率です。これで $m\le d$ のアンサンブル表示を得ました。
<!-- proof-end -->

<!-- definition-example-start: def-qinf2-ensemble-density -->
### 定義の確認：二つの準備を平均する

**定義の確認**：重みが確率であること、密度演算子の自己共役性・正値性・トレース 1を、それぞれ成分から確かめます。

$H=\mathbb C^2$ の基底を $|0\rangle=(1,0)^{\mathsf T}$、$|1\rangle=(0,1)^{\mathsf T}$ とし、$|0\rangle$ を確率 $1/3$、$|1\rangle$ を確率 $2/3$ で準備します。外積は列と共役転置行の積なので

$$
\begin{aligned}
|0\rangle\langle0|&=\begin{pmatrix}1&0\\0&0\end{pmatrix},\\
|1\rangle\langle1|&=\begin{pmatrix}0&0\\0&1\end{pmatrix},\\
\rho&=\frac13|0\rangle\langle0|+\frac23|1\rangle\langle1|
=\begin{pmatrix}1/3&0\\0&2/3\end{pmatrix}.
\end{aligned}
$$

この行列は実対角なので $\rho^\dagger=\rho$ です。任意の $v=(a,b)^{\mathsf T}$ について $\langle v,\rho v\rangle=|a|^2/3+2|b|^2/3\ge0$、トレースは $1/3+2/3=1$ です。各条件を確認できました。
<!-- definition-example-end -->

密度演算子は単なる「状態ベクトルの平均」ではありません。たとえば $|0\rangle$ と $-|0\rangle$ を半々で用意してベクトルを足すと0ですが、二つは[全体位相だけ異なる同じ純粋状態](../../../解析系/QM/QM2/index.md#prop-qm2-born-global-phase)であり、外積を平均すれば $|0\rangle\langle0|$ が残ります。

## 2. 測定と期待値：トレースが実験を予測する

アンサンブルの選択番号を知らない観測者にとって、測定で結果 $a$ が出る確率は、まず各 $\psi_j$ のBorn確率を求め、次に準備確率で平均したものです。この順序からトレース公式を導くと、アンサンブルの選び方に依らない統計的記述が得られます。

<a id="prop-qinf2-trace-born"></a>

<!-- formal-statement-start -->
> **命題（混合状態のBorn則と期待値）**  
> $H$ を有限次元複素Hilbert空間、$\rho=\sum_jp_j|\psi_j\rangle\langle\psi_j|$ を密度演算子とする。直交射影の族 $(P_a)_a$ が $P_aP_b=0$（$a\ne b$）、$\sum_aP_a=I$ を満たす射影測定について、結果 $a$ の確率は

$$
\Pr(a)=\operatorname{Tr}(\rho P_a).
$$

> また自己共役観測量 $M=\sum_a aP_a$（相異なる実数 $a$ を固有値とする）の期待値と分散は

$$
\mathbb E[M]=\operatorname{Tr}(\rho M),\qquad
\operatorname{Var}(M)=\operatorname{Tr}(\rho M^2)
-\bigl(\operatorname{Tr}(\rho M)\bigr)^2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[QM2のBorn則](../../../解析系/QM/QM2/index.md#axiom-qm2-born-rule)を各準備 $\psi_j$ に適用し、その後で平均します。階数1の外積を含むトレースが内積に戻るため、式をまとめられます。分散は固有値の二乗の平均から導きます。

<!-- proof-start -->
### 証明

任意の作用素 $T$ と単位ベクトル $\psi$ に対し、正規直交基底 $(e_k)$ を用いて

$$
\begin{aligned}
\operatorname{Tr}(|\psi\rangle\langle\psi|T)
&=\sum_k\langle e_k,\psi\rangle\langle\psi,Te_k\rangle\\
&=\left\langle\psi,T\sum_ke_k\langle e_k,\psi\rangle\right\rangle\\
&=\langle\psi,T\psi\rangle
\end{aligned}
$$

となります（第二等号は各項の複素共役の配置を含めた正規直交展開であり、右端からも確認できます）。[Born則](../../../解析系/QM/QM2/index.md#axiom-qm2-born-rule)による準備 $j$ の確率は $\langle\psi_j,P_a\psi_j\rangle$ なので、全確率公式とトレースの線形性から

$$
\begin{aligned}
\Pr(a)
&=\sum_jp_j\langle\psi_j,P_a\psi_j\rangle\\
&=\sum_jp_j\operatorname{Tr}(|\psi_j\rangle\langle\psi_j|P_a)\\
&=\operatorname{Tr}\left(\sum_jp_j|\psi_j\rangle\langle\psi_j|P_a\right)
=\operatorname{Tr}(\rho P_a).
\end{aligned}
$$

確率の非負性は最初の和から従い、総和は $\sum_a\operatorname{Tr}(\rho P_a)=\operatorname{Tr}(\rho I)=1$ です。[QM2の期待値の内積表示](../../../解析系/QM/QM2/index.md#prop-qm2-expectation-inner-product)を各 $\psi_j$ に適用して平均すれば

$$
\mathbb E[M]=\sum_jp_j\sum_a a\langle\psi_j,P_a\psi_j\rangle
=\sum_a a\operatorname{Tr}(\rho P_a)
=\operatorname{Tr}(\rho M).
$$

ここで $P_aP_b=\delta_{ab}P_a$ を使うと $M^2=\sum_a a^2P_a$ です。したがって $\mathbb E[M^2]=\operatorname{Tr}(\rho M^2)$ であり、分散の定義 $\mathbb E[M^2]-(\mathbb E[M])^2$ に代入して結論を得ます。
<!-- proof-end -->

### 具体例：同じZ測定、異なるX測定

$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$、$|-\rangle=(|0\rangle-|1\rangle)/\sqrt2$ とします。$|+\rangle$ を確実に準備した場合と、$|0\rangle,|1\rangle$ を半々で混合した場合の作用素は

$$
\rho_+=|+\rangle\langle+|
=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix},
\qquad
\rho_{\mathrm{mix}}=\frac12\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

両者は $(|0\rangle\langle0|,|1\rangle\langle1|)$ による測定で $(1/2,1/2)$ を与えます。一方 $P_+=|+\rangle\langle+|$ での確率は、[トレースによるBorn則](#prop-qinf2-trace-born)を使って

$$
\begin{aligned}
\operatorname{Tr}(\rho_+P_+)
&=\operatorname{Tr}(P_+^2)=\operatorname{Tr}P_+=1,\\
\operatorname{Tr}(\rho_{\mathrm{mix}}P_+)
&=\frac12\operatorname{Tr}P_+=\frac12.
\end{aligned}
$$

重ね合わせの行列にある非対角成分は、ここでは $X$ 基底での干渉を記録しています。ただし「非対角なら混合でない」という判定はできません。非対角成分は基底選択で変わるため、基底に依らない純粋性は次節で調べます。

<a id="prop-qinf2-operational-uniqueness"></a>

<!-- formal-statement-start -->
> **命題（全射影測定による密度演算子の一意性）**  
> 同じ有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho,\sigma$ について、任意の直交射影 $P$ に対し

$$
\operatorname{Tr}(\rho P)=\operatorname{Tr}(\sigma P)
$$

> ならば $\rho=\sigma$ である。逆に $\rho=\sigma$ ならば、すべての射影測定の統計が一致する。
<!-- formal-statement-end -->

### 証明の見取り図

もし二つの作用素が異なれば、その差は非零のHermitian行列です。非零固有値に属する固有ベクトル方向を測れば、その期待値の差を検出できます。

<!-- proof-start -->
### 証明

$D=\rho-\sigma$ とおくと $D^\dagger=D$ です。仮に $D\ne0$ なら、$D$ は自己共役かつ正規なので[LA5の複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)から非零実固有値 $\lambda$ と単位固有ベクトル $u$ が存在します。階数1射影 $P_u=|u\rangle\langle u|$ を選び、[混合状態のBorn則と期待値](#prop-qinf2-trace-born)の証明で示した外積のトレース計算を使うと

$$
\operatorname{Tr}(\rho P_u)-\operatorname{Tr}(\sigma P_u)
=\operatorname{Tr}(DP_u)
=\langle u,Du\rangle=\lambda\ne0.
$$

これは仮定に矛盾します。ゆえに $D=0$ です。逆方向は行列が等しければ各トレースも等しいという線形性から直ちに従います。
<!-- proof-end -->

同じ $\rho$ に複数の準備方法が対応しても、**どの射影測定でも区別できない**という意味で同じ量子状態です。これは「準備番号が同じ」ことを主張していません。

## 3. 「純粋か混合か」を固有値から判定する

一つのベクトル $\psi$ を確実に準備した場合には射影 $|\psi\rangle\langle\psi|$ が得られます。このように書けない状態は、どんな単位ベクトル一つでもすべての測定統計を表せません。アンサンブルに何個の項を書いたかではなく、最終的な密度演算子で分類します。

<a id="def-qinf2-pure-mixed"></a>

<!-- formal-statement-start -->
> **定義（純粋密度演算子と混合密度演算子）**  
> 有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho$ が、ある単位ベクトル $\psi\in H$ に対して

$$
\rho=|\psi\rangle\langle\psi|
$$

> と書けるとき、$\rho$ を**純粋密度演算子**という。そのように書けない密度演算子を**混合密度演算子**という。
<!-- formal-statement-end -->

一つの固有値が1で残りが0なら、この条件を満たします。非対角成分の有無や、元の準備レシピに書かれた項数ではこの分類は決まりません。そこで基底を選ばずに計算できる量を定めます。

<a id="def-qinf2-purity"></a>

<!-- formal-statement-start -->
> **定義（密度演算子の純粋性）**  
> 有限次元複素Hilbert空間上の密度演算子 $\rho$ について、実数

$$
\gamma(\rho):=\operatorname{Tr}(\rho^2)
$$

> を純粋性（purity）という。これは純粋状態と混合状態を判定する基底不変の数値である。
<!-- formal-statement-end -->

この量がなぜ基底に依らないかは、トレースを固有基底で書くと固有値の二乗和だけが残るためです。次の定理では純粋性だけでなく、射影性、階数、最も混合した状態の位置まで決まります。

<a id="thm-qinf2-purity-rank"></a>

<!-- formal-statement-start -->
> **定理（純粋性・rank・射影性の同値と上下界）**  
> $\dim H=d\ge1$ とし、$\rho$ を $H$ 上の密度演算子とする。次の条件は同値である。
>
> 1. $\rho$ は純粋密度演算子である。
> 2. $\operatorname{rank}\rho=1$ である。
> 3. $\rho^2=\rho$ である。
> 4. $\operatorname{Tr}(\rho^2)=1$ である。
>
> また、すべての密度演算子について

$$
\frac1d\le\operatorname{Tr}(\rho^2)\le1.
$$

> 下界の等号は $\rho=I/d$ のとき、かつそのときに限り成立する。上界の等号は上の同値な条件を満たすときに限る。
<!-- formal-statement-end -->

### 証明の見取り図

[密度演算子のスペクトル表示](#thm-qinf2-density-ensemble)では固有値は非負で和が1です。純粋性は固有値の二乗和なので、1になるには一つだけが1でなければなりません。下界は有限個の実数へのCauchy–Schwarz不等式で得ます。

<!-- proof-start -->
### 証明

$\rho$ の正規直交固有基底を $e_1,\ldots,e_d$、固有値を $\lambda_1,\ldots,\lambda_d$ とします。[密度演算子のスペクトル表示](#thm-qinf2-density-ensemble)により、$\lambda_j\ge0$、$\sum_j\lambda_j=1$ です。したがって各 $\lambda_j\le1$ で、

$$
\rho^2=\sum_j\lambda_j^2|e_j\rangle\langle e_j|,
\qquad
\operatorname{Tr}(\rho^2)=\sum_j\lambda_j^2.
$$

$\rho$ が純粋なら $\rho=|\psi\rangle\langle\psi|$ なので、$\psi$ への作用とその直交補空間への作用は

$$
\rho\psi=\psi\langle\psi,\psi\rangle=\psi,
\qquad
\rho v=\psi\langle\psi,v\rangle=0\quad(v\perp\psi).
$$

よって像は $\psi$ が張る一次元部分空間で、rankは1です。逆にrankが1なら、非零固有値は一つだけで、トレース 1からその値は1です。この固有ベクトルを $e_k$ とすれば $\rho=|e_k\rangle\langle e_k|$、従って純粋です。

$\rho^2=\rho$ は固有基底では全 $j$ における $\lambda_j^2=\lambda_j$ と同値です。$\lambda_j\in[0,1]$ だから $\lambda_j=0$ または1であり、総和1からちょうど一つが1です。さらに

$$
1-\operatorname{Tr}(\rho^2)
=\sum_j\lambda_j-\sum_j\lambda_j^2
=\sum_j\lambda_j(1-\lambda_j)\ge0.
$$

各項は非負なので、和が0となる必要十分条件は、すべての $\lambda_j$ が0または1となることです。以上で四条件の同値と上界が示せました。

下界は実数ベクトル $(\lambda_1,\ldots,\lambda_d)$ と $(1,\ldots,1)$ に[実内積空間のCauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)を使って

$$
1=\left(\sum_j\lambda_j\right)^2
\le\left(\sum_j\lambda_j^2\right)\left(\sum_j1^2\right)
=d\,\operatorname{Tr}(\rho^2)
$$

と得ます。等号条件は二つのベクトルが比例することで、$\lambda_j$ がすべて等しい場合です。トレース 1から $\lambda_j=1/d$、従って $\rho=I/d$ です。逆に $I/d$ は正値・トレース 1で、$\operatorname{Tr}((I/d)^2)=d/d^2=1/d$ を満たします。
<!-- proof-end -->

<!-- definition-example-start: def-qinf2-pure-mixed -->
### 定義の確認：射影と非射影

**定義の確認**：純粋なら確かに単位ベクトルの射影であり、混合ならその表示が不可能であることを、固有値とrankで確かめます。

先ほどの $\rho_+$ は $|+\rangle\langle+|$ なので純粋です。行列を二乗しても

$$
\rho_+^2=\frac14
\begin{pmatrix}2&2\\2&2\end{pmatrix}
=\rho_+,\qquad \operatorname{Tr}(\rho_+^2)=1.
$$

一方 $\rho_{\mathrm{mix}}=I/2$ は二つの固有値が $1/2,1/2$、rankは2で

$$
\operatorname{Tr}(\rho_{\mathrm{mix}}^2)
=\operatorname{Tr}(I/4)=\frac12.
$$

これが一つの射影に書けないのは[rankと純粋性の同値](#thm-qinf2-purity-rank)から従います。二つは共に「ある測定で半々」でも、状態の純粋性は異なります。
<!-- definition-example-end -->

<!-- definition-example-start: def-qinf2-purity -->
### 定義の確認：一方へ偏った古典的混合

**定義の確認**：トレースの二乗和を直接計算し、純粋性の値が混合比率でどう変わるか確かめます。

$0\le p\le1$ として $\rho_p=p|0\rangle\langle0|+(1-p)|1\rangle\langle1|$ を考えます。二つの固有値は $p,1-p$ なので

$$
\gamma(\rho_p)=p^2+(1-p)^2
=1-2p(1-p).
$$

$p=0,1$ なら $\gamma=1$ で純粋、$0<p<1$ なら $p(1-p)>0$ なので $\gamma<1$ で混合です。特に $p=1/2$ では $\gamma=1/2$ となり、二次元での下界を実現します。この計算は定義のトレースを固有基底で実際に評価したものです。
<!-- definition-example-end -->

さらに、アンサンブルに含まれるベクトルが互いに同じ状態かどうかも純粋性から分かります。$p_j>0$ の項だけを残したアンサンブルで、外積のトレース公式を二度使うと

$$
\begin{aligned}
\operatorname{Tr}(\rho^2)
&=\sum_{j,k}p_jp_k\operatorname{Tr}
\bigl(|\psi_j\rangle\langle\psi_j|
|\psi_k\rangle\langle\psi_k|\bigr)\\
&=\sum_{j,k}p_jp_k|\langle\psi_j,\psi_k\rangle|^2.
\end{aligned}
$$

内積の絶対値が高々1であることと等号条件は、単位ベクトル $\psi_j,\psi_k$ に対して $\psi_k=\langle\psi_j,\psi_k\rangle\psi_j+w$、$w\perp\psi_j$ と分解すれば

$$
1=\|\psi_k\|^2
=|\langle\psi_j,\psi_k\rangle|^2+\|w\|^2
$$

から直接分かります。$\sum_{j,k}p_jp_k=1$ なので、純粋性が1であるには、正の重みを持つすべての組で $w=0$、すなわちすべての $\psi_j$ が同じrayでなければなりません。逆に同じrayだけなら外積は全て一致し、$\rho$ は純粋です。**異なるアンサンブル項を複数書くだけでは混合にはなりません。**

## 4. qubitの状態をBloch球へ写す

二次元なら自己共役・トレース 1の行列は実数三つで記述できます。Pauli行列を単なる記号として置くのではなく、行列の各成分から実際の座標を読める形にしましょう。次の三行列は自己共役でトレースが0です。

$$
\sigma_x=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
\sigma_y=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\qquad
\sigma_z=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

これらと $I$ は二行二列Hermitian行列の実線形基底をなします。つまりトレース 1の行列を、$I$ の係数を $1/2$ に固定して表せます。

<a id="def-qinf2-bloch-vector"></a>

<!-- formal-statement-start -->
> **定義（qubitのBlochベクトル）**  
> $H=\mathbb C^2$ 上の密度演算子 $\rho$ に対し、実数

$$
r_k:=\operatorname{Tr}(\rho\sigma_k),\qquad k\in\{x,y,z\}
$$

> を成分とする $\boldsymbol r=(r_x,r_y,r_z)\in\mathbb R^3$ をBlochベクトルという。このとき

$$
\rho=\frac12(I+r_x\sigma_x+r_y\sigma_y+r_z\sigma_z)
$$

> と書く。各 $\sigma_k$ は上のPauli行列である。
<!-- formal-statement-end -->

なぜ上のトレースから座標を取り出せるのでしょうか。Pauli行列を直接掛けると $\operatorname{Tr}\sigma_k=0$、$\operatorname{Tr}(\sigma_j\sigma_k)=2\delta_{jk}$ です。表示の両辺に $\sigma_k$ を掛けてトレースを取れば、右辺で $r_k$ 以外が消えます。逆に任意の自己共役トレース 1行列を

$$
\rho=\begin{pmatrix}a&c\\\overline c&1-a\end{pmatrix},
\quad a\in\mathbb R,\ c\in\mathbb C
$$

と書けば、$r_z=2a-1$、$r_x=2\operatorname{Re}c$、$r_y=-2\operatorname{Im}c$ です。したがって上の表示は必要な成分を残さず記述しています。

<a id="thm-qinf2-bloch-ball"></a>

<!-- formal-statement-start -->
> **定理（Bloch球によるqubit状態の完全分類）**  
> $\boldsymbol r=(r_x,r_y,r_z)\in\mathbb R^3$ に対し、Pauli行列を用いて

$$
\rho(\boldsymbol r)=\frac12(I+r_x\sigma_x+r_y\sigma_y+r_z\sigma_z)
$$

> と置く。この行列が密度演算子であるための必要十分条件は $\|\boldsymbol r\|\le1$ である。二つの固有値および純粋性は

$$
\lambda_\pm=\frac{1\pm\|\boldsymbol r\|}{2},\qquad
\operatorname{Tr}(\rho(\boldsymbol r)^2)
=\frac{1+\|\boldsymbol r\|^2}{2}.
$$

> $\|\boldsymbol r\|=1$ は純粋状態、$\|\boldsymbol r\|<1$ は混合状態である。原点は $I/2$ を表す。
<!-- formal-statement-end -->

### 証明の見取り図

二行二列行列のトレースは1に固定されています。行列式が $(1-\|\boldsymbol r\|^2)/4$ になることを計算すると、二つの固有値が求まります。正値性は両固有値が非負であること、純粋性はその二乗和で確認できます。

<!-- proof-start -->
### 証明

各Pauli行列を成分ごとに代入すると

$$
\rho(\boldsymbol r)=\frac12
\begin{pmatrix}
1+r_z&r_x-ir_y\\
r_x+ir_y&1-r_z
\end{pmatrix}.
$$

自己共役性は上下の非対角成分が互いに共役であることから従い、トレースは $(1+r_z+1-r_z)/2=1$ です。行列式は

$$
\begin{aligned}
\det\rho(\boldsymbol r)
&=\frac14\{(1+r_z)(1-r_z)
-(r_x-ir_y)(r_x+ir_y)\}\\
&=\frac14(1-r_z^2-r_x^2-r_y^2)
=\frac{1-\|\boldsymbol r\|^2}{4}.
\end{aligned}
$$

特性多項式は $t^2-t+\det\rho$ なので、判別式は

$$
1-4\det\rho
=1-(1-\|\boldsymbol r\|^2)
=\|\boldsymbol r\|^2.
$$

従って固有値は $\lambda_\pm=(1\pm\|\boldsymbol r\|)/2$ です。自己共役行列の正値性は両固有値が非負であることと同値であり、$\lambda_+\ge0$ は常に成立、$\lambda_-\ge0$ は $\|\boldsymbol r\|\le1$ と同値です。固有値を二乗して足すと

$$
\begin{aligned}
\operatorname{Tr}(\rho^2)
&=\frac{(1+\|\boldsymbol r\|)^2+(1-\|\boldsymbol r\|)^2}{4}\\
&=\frac{1+\|\boldsymbol r\|^2}{2}.
\end{aligned}
$$

最後に[純粋性・rankの同値](#thm-qinf2-purity-rank)により、純粋性が1となる $\|\boldsymbol r\|=1$ が純粋状態で、それより内側は混合状態です。原点なら行列表示から $\rho=I/2$ です。
<!-- proof-end -->

<!-- definition-example-start: def-qinf2-bloch-vector -->
### 定義の確認：軸と球の内部

**定義の確認**：Pauli行列の期待値を直接トレースで計算し、座標が行列のどの要素を示すか確認します。

$|0\rangle\langle0|=\operatorname{diag}(1,0)$ では

$$
\operatorname{Tr}(\rho\sigma_x)=0,\quad
\operatorname{Tr}(\rho\sigma_y)=0,\quad
\operatorname{Tr}(\rho\sigma_z)=1,
$$

なので $\boldsymbol r=(0,0,1)$、球面上です。

一方 $I/2$ はすべてのPauli行列のトレースが0なので $\boldsymbol r=(0,0,0)$、球の中心です。

さらに $\rho=\operatorname{diag}(3/4,1/4)$ なら $\boldsymbol r=(0,0,1/2)$、ノルム $1/2<1$ なので混合です。[Bloch球によるqubit状態の完全分類](#thm-qinf2-bloch-ball)により固有値は $(3/4,1/4)$、純粋性は $5/8$ と検算できます。
<!-- definition-example-end -->

**基底の注意**：Bloch座標は固定した $|0\rangle,|1\rangle$ 基底に対するものです。基底を変えると座標の方向は変わりますが、固有値と球の中心からの距離は変わりません。

## 5. アンサンブルは一意ではない

密度演算子は測定可能な統計を定めますが、実験者の準備の履歴を一意に記録しません。正規直交基底を変えて同じ $I/2$ を別の混合として準備することができます。

$$
\begin{aligned}
\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|
&=\frac12 I,\\
\frac12|+\rangle\langle+|+\frac12|-\rangle\langle-|
&=\frac14
\left\{\begin{pmatrix}1&1\\1&1\end{pmatrix}
+\begin{pmatrix}1&-1\\-1&1\end{pmatrix}\right\}\\
&=\frac12 I.
\end{aligned}
$$

この二つの準備レシピでは、実際に選ばれた純粋状態は異なります。それでも最終的な $\rho$ が同じなので、[測定統計の一意性](#prop-qinf2-operational-uniqueness)により、受け手だけがどんな射影測定をしても区別できません。「混合なら必ず直交状態を混ぜたもの」という意味でもありません。[スペクトルによるアンサンブル表示](#thm-qinf2-density-ensemble)は直交する表示を**少なくとも一つ**与えるだけです。

[ユニタリ作用素](../../../基礎科目/LA/LA5/index.md#def-la5-unitary) $U$ は、準備された各純粋状態を $U\psi_j$ に写します。密度演算子に対する変換を成分から導くと、純粋性も保存されます。

<a id="prop-qinf2-unitary-invariance"></a>

<!-- formal-statement-start -->
> **命題（ユニタリ共役と純粋性の不変性）**  
> 有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho$ とユニタリ作用素 $U:H\to H$ に対し、アンサンブルの各ベクトルを $U\psi_j$ へ写した密度演算子は

$$
\rho'=U\rho U^\dagger
$$

> である。$\rho'$ は密度演算子であり、$\rho$ と同じ固有値・rank・純粋性を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

ユニタリは単位ベクトルを単位ベクトルへ写すため、確率重みはそのままです。外積への作用を開いてから、固有ベクトルとトレースを比較します。

<!-- proof-start -->
### 証明

$U^\dagger U=UU^\dagger=I$ なので $\|U\psi_j\|^2=\langle\psi_j,U^\dagger U\psi_j\rangle=1$ です。また任意の $v$ について

$$
|U\psi_j\rangle\langle U\psi_j|v
=U\psi_j\langle\psi_j,U^\dagger v\rangle
=U|\psi_j\rangle\langle\psi_j|U^\dagger v.
$$

よって変換後のアンサンブルは

$$
\sum_jp_j|U\psi_j\rangle\langle U\psi_j|
=U\left(\sum_jp_j|\psi_j\rangle\langle\psi_j|\right)U^\dagger
=U\rho U^\dagger.
$$

したがって[アンサンブルの特徴づけ](#thm-qinf2-density-ensemble)から $\rho'$ は密度演算子です。$\rho e_k=\lambda_ke_k$ なら

$$
\rho'(Ue_k)=U\rho U^\dagger Ue_k
=U\rho e_k=\lambda_k(Ue_k).
$$

$(Ue_k)$ は正規直交基底ですから、固有値は重複度ごと一致し、rankも同じです。最後に

$$
\operatorname{Tr}((\rho')^2)
=\sum_k\lambda_k^2
=\operatorname{Tr}(\rho^2)
$$

が成り立ち、純粋性も不変です。
<!-- proof-end -->

例えばHadamard作用素 $H=(1/\sqrt2)\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ は $|0\rangle,|1\rangle$ をそれぞれ $|+\rangle,|-\rangle$ に写します。$H(I/2)H^\dagger=I/2$ である一方、$H|0\rangle\langle0|H^\dagger=|+\rangle\langle+|$ です。アンサンブルの非一意性とユニタリ変換は関連しますが、どの密度演算子も任意のユニタリで不変、というわけではありません。

## 6. 演習：準備・行列・測定を往復する

全問で $H=\mathbb C^2$ の計算基底を $|0\rangle=(1,0)^{\mathsf T}$、$|1\rangle=(0,1)^{\mathsf T}$ とし、$\sigma_x,\sigma_y,\sigma_z$ は第4節のPauli行列です。問題ごとに与えた準備確率・測定・行列を使い、正値性や正規化が必要なときは確認してください。

<a id="ex-qinf2-a01"></a>
### QINF2-A01 二つの直交状態を確率的に準備する

- Level: A
- 問題: $|0\rangle$ を確率 $1/3$、$|1\rangle$ を確率 $2/3$ で準備する。密度演算子 $\rho$、その純粋性、$\sigma_z$ 測定の二つの結果の確率と期待値を求めよ。

<!-- solution-start -->
**詳細解答**。定義どおり外積を平均すると

$$
\rho=\frac13\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\frac23\begin{pmatrix}0&0\\0&1\end{pmatrix}
=\begin{pmatrix}1/3&0\\0&2/3\end{pmatrix}.
$$

固有値が $1/3,2/3$ で非負、和が1なので[密度演算子の特徴づけ](#thm-qinf2-density-ensemble)を満たします。純粋性は

$$
\operatorname{Tr}(\rho^2)=\frac19+\frac49=\frac59<1
$$

で混合です。$\sigma_z$ の固有値 $+1$ と $-1$ の射影はそれぞれ $|0\rangle\langle0|$ と $|1\rangle\langle1|$ なので、[トレースによるBorn則](#prop-qinf2-trace-born)から確率は $1/3,2/3$ です。期待値を固有値で重み付けすると

$$
\mathbb E[\sigma_z]
=(+1)\frac13+(-1)\frac23=-\frac13.
$$

行列でも $\operatorname{Tr}(\rho\sigma_z)=1/3-2/3=-1/3$ と確認できます。
<!-- solution-end -->

<a id="ex-qinf2-a02"></a>
### QINF2-A02 複素位相を持つ純粋状態

- Level: A
- 問題: $\psi=(|0\rangle+i|1\rangle)/\sqrt2$ に対して $\rho=|\psi\rangle\langle\psi|$ を求めよ。純粋性、Blochベクトル、$\sigma_x$ の固有値 $+1$ が出る確率を計算せよ。

<!-- solution-start -->
**詳細解答**。$\|\psi\|^2=(|1|^2+|i|^2)/2=1$ です。共役転置では $i$ が $-i$ になるので

$$
\rho=\frac12
\begin{pmatrix}1\\i\end{pmatrix}
\begin{pmatrix}1&-i\end{pmatrix}
=\frac12\begin{pmatrix}1&-i\\i&1\end{pmatrix}.
$$

$\rho$ は単位ベクトルの外積なので $\rho^2=\rho$、従って $\operatorname{Tr}(\rho^2)=\operatorname{Tr}\rho=1$ です。行列の非対角成分は $c=-i/2$ ですから[Blochベクトルの成分式](#def-qinf2-bloch-vector)より

$$
r_x=2\operatorname{Re}c=0,\quad
r_y=-2\operatorname{Im}c=1,\quad
r_z=2(1/2)-1=0.
$$

$\sigma_x$ の $+1$ 固有射影は $P_+=(I+\sigma_x)/2$ です。[混合状態のBorn則と期待値](#prop-qinf2-trace-born)から

$$
\Pr(+1)=\operatorname{Tr}(\rho P_+)
=\frac12\operatorname{Tr}\rho+\frac12\operatorname{Tr}(\rho\sigma_x)
=\frac12(1+r_x)=\frac12.
$$

複素位相は消えておらず $y$ 方向の成分に現れています。
<!-- solution-end -->

<a id="ex-qinf2-a03"></a>
### QINF2-A03 非対角な二行二列行列の正値性

- Level: A
- 問題: $R=\begin{pmatrix}3/4&1/4\\1/4&1/4\end{pmatrix}$ が密度演算子であることを固有値から判定せよ。Blochベクトルと純粋性も求めよ。

<!-- solution-start -->
**詳細解答**。$R^\dagger=R$、トレースは $3/4+1/4=1$ です。行列式は

$$
\det R=\frac{3}{16}-\frac{1}{16}=\frac18.
$$

特性多項式 $\lambda^2-\lambda+1/8=0$ の判別式は $1-4/8=1/2$ なので

$$
\lambda_\pm=\frac{1\pm1/\sqrt2}{2}>0.
$$

よって正値で、三条件を満たす密度演算子です。非対角成分 $c=1/4$、左上成分 $a=3/4$ から

$$
\boldsymbol r=(2\operatorname{Re}c,-2\operatorname{Im}c,2a-1)
=\left(\frac12,0,\frac12\right).
$$

ノルム二乗は $1/4+1/4=1/2$ です。[Bloch球によるqubit状態の完全分類](#thm-qinf2-bloch-ball)から

$$
\operatorname{Tr}(R^2)=\frac{1+1/2}{2}=\frac34<1.
$$

独立に $R^2$ の対角和を計算すると $9/16+1/16+1/16+1/16=3/4$ です。
<!-- solution-end -->

<a id="ex-qinf2-a04"></a>
### QINF2-A04 分散をトレースから求める

- Level: A
- 問題: $\rho=\operatorname{diag}(1/4,3/4)$、自己共役観測量 $M=\operatorname{diag}(2,-1)$ とする。測定値の確率分布、$\mathbb E[M]$、$\operatorname{Var}(M)$ を求め、トレース公式でも検算せよ。

<!-- solution-start -->
**詳細解答**。$M$ の固有射影は計算基底への二つの射影です。$\rho$ の対角成分は非負で和1なので密度演算子です。[混合状態のBorn則](#prop-qinf2-trace-born)から $M=2$ の確率は $1/4$、$M=-1$ の確率は $3/4$ です。従って

$$
\mathbb E[M]=2\cdot\frac14-1\cdot\frac34=-\frac14.
$$

二乗の期待値は

$$
\mathbb E[M^2]=2^2\cdot\frac14+(-1)^2\cdot\frac34
=1+\frac34=\frac74.
$$

分散はこれから期待値の二乗を引いて

$$
\operatorname{Var}(M)
=\frac74-\left(-\frac14\right)^2
=\frac{28-1}{16}=\frac{27}{16}.
$$

一方 $M^2=\operatorname{diag}(4,1)$ です。トレースで直接計算しても $\operatorname{Tr}(\rho M)=-1/4$、$\operatorname{Tr}(\rho M^2)=7/4$ で一致します。
<!-- solution-end -->

<a id="ex-qinf2-b01"></a>
### QINF2-B01 一母数の密度行列とそのアンサンブル

- Level: B
- 問題: 実数 $t$ と $R_t=\begin{pmatrix}1/2&t\\t&1/2\end{pmatrix}$ を考える。$R_t$ が密度演算子である $t$ の範囲を求め、$|+\rangle,|-\rangle$ を使ったアンサンブル表示を構成せよ。純粋性が1となる $t$ も答えよ。

<!-- solution-start -->
**詳細解答**。$R_t$ は実対称でトレース 1です。$|+\rangle=(1,1)^{\mathsf T}/\sqrt2$、$|-\rangle=(1,-1)^{\mathsf T}/\sqrt2$ へ作用すると

$$
\begin{aligned}
R_t|+\rangle&=(1/2+t)|+\rangle,\\
R_t|-\rangle&=(1/2-t)|-\rangle.
\end{aligned}
$$

従って固有値が非負となる条件は $1/2+t\ge0$ かつ $1/2-t\ge0$、すなわち

$$
-\frac12\le t\le\frac12.
$$

この範囲では二つの固有値の和は1であり、[スペクトルによるアンサンブル表示](#thm-qinf2-density-ensemble)を使って

$$
R_t=\left(\frac12+t\right)|+\rangle\langle+|
+\left(\frac12-t\right)|-\rangle\langle-|.
$$

実際に右辺の対角成分は $\{(1/2+t)+(1/2-t)\}/2=1/2$、非対角成分は $\{(1/2+t)-(1/2-t)\}/2=t$ で元の行列に戻ります。純粋性は

$$
\operatorname{Tr}(R_t^2)
=\left(\frac12+t\right)^2+\left(\frac12-t\right)^2
=\frac12+2t^2.
$$

これが1になるのは $t^2=1/4$、すなわち端点 $t=\pm1/2$ です。中間値では二つの固有値がともに正で混合です。
<!-- solution-end -->

<a id="ex-qinf2-b02"></a>
### QINF2-B02 異なる準備レシピの識別不可能性

- Level: B
- 問題: アンサンブル $\mathcal E_z=\{(1/2,|0\rangle),(1/2,|1\rangle)\}$ と $\mathcal E_x=\{(1/2,|+\rangle),(1/2,|-\rangle)\}$ について、任意の射影測定で区別できないことを示せ。一方、確実に $|+\rangle$ を準備した第三のレシピと $\mathcal E_z$ は、どの二値射影測定で区別できるか、一つ示せ。

<!-- solution-start -->
**詳細解答**。第5節の二つの外積を改めて成分で計算します。

$$
\begin{aligned}
\rho_z&=\frac12\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\frac12\begin{pmatrix}0&0\\0&1\end{pmatrix}
=\frac12I,\\
\rho_x&=\frac14\begin{pmatrix}1&1\\1&1\end{pmatrix}
+\frac14\begin{pmatrix}1&-1\\-1&1\end{pmatrix}
=\frac12I.
\end{aligned}
$$

両者が同じ $\rho$ なので任意の射影 $P$ に対して

$$
\operatorname{Tr}(\rho_zP)
=\frac12\operatorname{Tr}P
=\operatorname{Tr}(\rho_xP).
$$

したがって測定結果の各確率が等しく、どの射影測定でも区別できません。第三のレシピは $\rho_+=|+\rangle\langle+|$ です。二値射影測定 $(P_+,I-P_+)$、$P_+=|+\rangle\langle+|$ を選べば

$$
\Pr_{\rho_+}(P_+)=\operatorname{Tr}(P_+^2)=1,\qquad
\Pr_{\rho_z}(P_+)=\frac12\operatorname{Tr}P_+=\frac12.
$$

受け手は多数回の独立準備と測定を繰り返せば、この確率差を統計的に識別できます。計算基底の測定では両者とも半々なので、測定基底を選ぶことが重要です。
<!-- solution-end -->

<a id="ex-qinf2-b03"></a>
### QINF2-B03 非直交状態の混合はどこまで純粋か

- Level: B
- 問題: 有限次元複素Hilbert空間で単位ベクトル $u,v$ と $0<p<1$ を取り、$\rho=p|u\rangle\langle u|+(1-p)|v\rangle\langle v|$ とする。$\operatorname{Tr}(\rho^2)$ を $|\langle u,v\rangle|^2$ で表せ。$\rho$ が純粋である条件を示し、$u,v$ が一次独立のときrankが2となる理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$P_u=|u\rangle\langle u|$、$P_v=|v\rangle\langle v|$ と置きます。単位ベクトルなので $P_u^2=P_u$、$P_v^2=P_v$ です。積を展開して

$$
\rho^2=p^2P_u+p(1-p)(P_uP_v+P_vP_u)+(1-p)^2P_v.
$$

[外積のトレース計算](#prop-qinf2-trace-born)を適用すると $\operatorname{Tr}(P_uP_v)=\langle u,v\rangle\langle v,u\rangle=|\langle u,v\rangle|^2$ で、逆順の積のトレースも同じです。従って

$$
\begin{aligned}
\operatorname{Tr}(\rho^2)
&=p^2+(1-p)^2+2p(1-p)|\langle u,v\rangle|^2\\
&=1-2p(1-p)\bigl(1-|\langle u,v\rangle|^2\bigr).
\end{aligned}
$$

$0<p<1$ より $2p(1-p)>0$ です。[純粋性による判定](#thm-qinf2-purity-rank)から純粋であるのは $|\langle u,v\rangle|=1$ のとき、かつそのときに限ります。実際、$v=\langle u,v\rangle u+w$、$w\perp u$ と置けば

$$
1=\|v\|^2=|\langle u,v\rangle|^2+\|w\|^2.
$$

したがって等号成立は $w=0$ と同値であり、$u,v$ が全体位相を除いて同じベクトルであることを意味します。

一次独立の場合は $\operatorname{span}\{u,v\}$ が二次元です。任意の $w$ に対し

$$
\langle w,\rho w\rangle
=p|\langle u,w\rangle|^2+(1-p)|\langle v,w\rangle|^2
$$

です。これは $w$ が $u,v$ の両方に直交するときだけ0です。特に二次元のspan内にいる非零 $w$ は両方に直交できないため、この制限は正定値です。一方spanの直交補空間では $\rho w=0$、また $\rho$ の像はspanに含まれます。従って正の固有値がspan上に二つあり、rankは2です。
<!-- solution-end -->

<a id="ex-qinf2-b04"></a>
### QINF2-B04 三つの測定確率から状態を復元する

- Level: B
- 問題: 未知のqubit密度演算子 $\rho$ について、$\sigma_x,\sigma_y,\sigma_z$ の固有値 $+1$ の確率がそれぞれ $3/4,1/2,1/2$ と測定されたとする。$\rho$ を再構成し、正値性を確認せよ。もし三つの確率がすべて1であったら、一つの密度演算子から生じ得るかも判定せよ。

<!-- solution-start -->
**詳細解答**。各 $\sigma_k$ は固有値 $\pm1$ で、$+1$ の射影は $P_{k,+}=(I+\sigma_k)/2$ です。[混合状態のBorn則と期待値](#prop-qinf2-trace-born)をこの射影に適用します。そのトレース式へ[Blochベクトルの定義](#def-qinf2-bloch-vector)を代入すると

$$
q_k=\operatorname{Tr}(\rho P_{k,+})
=\frac12\bigl(\operatorname{Tr}\rho+\operatorname{Tr}(\rho\sigma_k)\bigr)
=\frac{1+r_k}{2}.
$$

従って $r_k=2q_k-1$ を各測定へ適用すると

$$
\boldsymbol r=(1/2,0,0),\qquad
\rho=\frac12(I+\tfrac12\sigma_x)
=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}.
$$

行列は自己共役・トレース 1で、[Bloch球の正値条件](#thm-qinf2-bloch-ball)の $\|\boldsymbol r\|=1/2\le1$ を満たします。固有値も $(1\pm1/2)/2=(3/4,1/4)$ で非負です。一方 $q_x=q_y=q_z=1$ なら $\boldsymbol r=(1,1,1)$、ノルムは $\sqrt3>1$ となります。よって[正値条件](#thm-qinf2-bloch-ball)を破り、そのようなqubit密度演算子は存在しません。
<!-- solution-end -->

<a id="ex-qinf2-c01"></a>
### QINF2-C01 非直交な準備からBloch球まで

- Level: C
- 問題: $0\le p\le1$ に対し、$|0\rangle$ を確率 $p$、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を確率 $1-p$ で準備する。

  1. 密度演算子 $\rho_p$ とBlochベクトルを求め、正値性を確認せよ。
  2. 固有値と純粋性を $p$ で表し、どの $p$ で純粋性が最小になるか求めよ。
  3. 計算基底で結果 $|0\rangle$ を得る確率と、$|+\rangle,|-\rangle$ 基底で結果 $|+\rangle$ を得る確率を求めよ。
  4. どの $p$ でも $I/2$ を得られない理由を説明し、$\rho_p$ が純粋になる場合を示せ。

<!-- solution-start -->
**詳細解答**。まず外積を作ると

$$
\begin{aligned}
\rho_p
&=p\begin{pmatrix}1&0\\0&0\end{pmatrix}
+\frac{1-p}{2}\begin{pmatrix}1&1\\1&1\end{pmatrix}\\
&=\frac12\begin{pmatrix}1+p&1-p\\1-p&1-p\end{pmatrix}.
\end{aligned}
$$

これは確率混合なので[アンサンブルの特徴づけ](#thm-qinf2-density-ensemble)により正値・トレース 1です。成分から直接も、自己共役でトレース 1、Blochベクトルが

$$
\boldsymbol r=(1-p,0,p),\qquad
\|\boldsymbol r\|^2=(1-p)^2+p^2
$$

と求まります。$0\le p\le1$ なので $p(1-p)\ge0$ で

$$
\|\boldsymbol r\|^2=1-2p(1-p)\le1.
$$

よって[Bloch球の正値条件](#thm-qinf2-bloch-ball)からも確認できました。固有値は

$$
\lambda_\pm(p)=\frac{1\pm\sqrt{(1-p)^2+p^2}}2
$$

であり、純粋性は

$$
\begin{aligned}
\operatorname{Tr}(\rho_p^2)
&=\frac{1+(1-p)^2+p^2}{2}\\
&=1-p(1-p)
=\frac34+\left(p-\frac12\right)^2.
\end{aligned}
$$

従って最小は $p=1/2$ で $3/4$ です。これは二次元における絶対的な下界 $1/2$ には届きません。二種類の準備が直交していないためです。

確率は[混合状態のBorn則と期待値](#prop-qinf2-trace-born)で求めます。$|0\rangle$ への射影は $\rho_p$ の左上成分を選ぶので

$$
\Pr(0)=\operatorname{Tr}(\rho_p|0\rangle\langle0|)
=\frac{1+p}{2}.
$$

他方 $P_+=(I+\sigma_x)/2$ に対し、Blochの $r_x=1-p$ を用い

$$
\Pr(+)=\operatorname{Tr}(\rho_pP_+)
=\frac{1+r_x}{2}
=1-\frac p2.
$$

これは準備確率から直接 $p\cdot(1/2)+(1-p)\cdot1$ としても一致します。

$I/2$ のBlochベクトルは原点ですが、$\boldsymbol r=(1-p,0,p)$ の $x,z$ 成分が同時に0になるには $p=1$ と $p=0$ が同時に必要で、不可能です。

また $\|\boldsymbol r\|^2=1-2p(1-p)$ が1になるのは $p=0$ または1だけです。[純粋性とrankの同値](#thm-qinf2-purity-rank)から、この両端だけが純粋で、$0<p<1$ では混合です。前者は $|+\rangle$、後者は $|0\rangle$ の射影に戻ります。
<!-- solution-end -->

## 7. 本章で得た記述と次に生じる問い

密度演算子は正値・トレース 1の作用素であり、有限アンサンブルと同値に記述できます。測定確率は $\operatorname{Tr}(\rho P)$、純粋性は $\operatorname{Tr}(\rho^2)$ で計算できます。二次元ではBloch球の球面が純粋状態、内部が混合状態、中心が最大混合状態です。異なる準備履歴が同じ $\rho$ を与えることも分かりました。

ここでは準備番号を忘れたときの統計的混合を扱いました。次のQINF3では、二つの系がエンタングルしているとき、一方だけにアクセスできる観測者の状態を**部分トレース**で構成します。全体系が純粋なのに部分系が混合状態になる理由を、同じトレース公式で確かめます。
