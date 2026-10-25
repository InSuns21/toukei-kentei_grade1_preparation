# QINF5 一般化量子測定

[QINF2の混合状態のBorn則](../QINF2/index.md#prop-qinf2-trace-born)では、射影作用素を測定結果に対応させました。[QINF4の精製と補助系測定](../QINF4/index.md#thm-qinf4-ensemble-measurement)では、補助系を測るだけで異なるアンサンブルが現れました。これらを組み合わせると、**手元のqubitに、互いに排反な三つの非零の結果を持つ測定を行えるか**、という問いが生じます。

二次元の射影測定では、非零で互いに直交する射影は高々二個です。しかし補助系を使う測定では、三つの結果がすべて正の確率を持てます。必要なのは、結果を表す作用素を「射影」から「正値作用素」へ広げることです。また、結果の確率だけでは測定後の状態は決まりません。この二つの違いを有限次元の行列から調べます。

以下、$H$ は有限次元の複素Hilbert空間、$\rho$ は $H$ 上の[密度演算子](../QINF2/index.md#def-qinf2-ensemble-density)です。内積は第二変数に線形、$A^\dagger$ は随伴、$\operatorname{Tr}$ は行列のトレースとします。測定結果の集合を $\Omega=\{0,\ldots,m-1\}$（$m\ge1$）と固定します。

## 1. 結果の確率だけを記述する

射影測定は直交射影 $P_i$ で $P_iP_j=\delta_{ij}P_i$、$\sum_iP_i=I_H$ を満たします。一方、確率 $p_i$ を作るには、各作用素が正値で総和が恒等作用素であることが本質です。有限次元で $E=E^\dagger$ のもとでは、$\langle v,Ev\rangle\ge0$ がすべての $v$ で成り立つことは、$E$ の固有値がすべて非負であることと同値です。そこで、各結果に非負の確率を割り当てる作用素の族を考えます。

<a id="def-qinf5-povm"></a>

<!-- formal-statement-start -->
> **定義（POVMと効果作用素）**  
> 有限次元複素Hilbert空間 $H$ と有限結果集合 $\Omega=\{0,\ldots,m-1\}$ に対し、作用素の族 $(E_i)_{i\in\Omega}$ が**正作用素値測度**（positive operator-valued measure、POVM）であるとは、すべての $i$ について $E_i=E_i^\dagger$、$\langle v,E_iv\rangle\ge0$（任意の $v\in H$）で、さらに

$$
\sum_{i\in\Omega}E_i=I_H
$$

> を満たすことをいう。各 $E_i$ を**効果作用素**という。状態 $\rho$ で結果 $i$ を得る確率を $p_i=\operatorname{Tr}(\rho E_i)$ と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf5-povm -->
### 定義の確認：ぼやけた二値測定

**定義の確認**：作用素の自己共役性・正値性・完全性を、この順に基底表示で調べます。

qubitの計算基底を $|0\rangle,|1\rangle$ とし、$0\le\eta\le1$ とします。$Z=|0\rangle\langle0|-|1\rangle\langle1|$ とおきます。$Z$ の固有値は $+1,-1$ なので

$$
E_+=\frac{I_2+\eta Z}{2}
=\begin{pmatrix}(1+\eta)/2&0\\0&(1-\eta)/2\end{pmatrix},
\quad
E_-=\frac{I_2-\eta Z}{2}.
$$

両者は実対角行列で自己共役です。固有値 $(1\pm\eta)/2$ は指定範囲で非負、和は $E_++E_-=I_2$ です。これで定義のすべての非自明な条件を確認しました。$\rho=|0\rangle\langle0|$ なら

$$
p_+=\operatorname{Tr}(\rho E_+)=\frac{1+\eta}{2},
\qquad
p_-=\frac{1-\eta}{2}.
$$

$\eta=1$ は鋭い $Z$ の射影測定、$\eta=0$ は状態によらず等確率の測定です。$0<\eta<1$ なら $E_\pm^2\ne E_\pm$ であり、射影ではありません。
<!-- definition-example-end -->

<a id="prop-qinf5-probabilities"></a>

<!-- formal-statement-start -->
> **命題（POVMの確率分布と射影測定の包含）**  
> 有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho$ と有限POVM $(E_i)_{i\in\Omega}$ に対し、次は非負で総和1の確率分布になる。

$$
p_i=\operatorname{Tr}(\rho E_i).
$$

> 特に、直交射影の族 $(P_i)$ が完全性条件を満たす射影測定は、$E_i=P_i$ としたPOVMであり、その確率は通常のBorn則と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

確率の非負性は、[密度演算子のスペクトル分解](../QINF2/index.md#thm-qinf2-density-ensemble)で正の係数を取り出して示します。総和1はPOVMの完全性と行列の対角和の線形性から従います。

<!-- proof-start -->
### 証明

正規直交固有ベクトル $e_a$ と非負固有値 $\lambda_a$ により $\rho=\sum_a\lambda_a|e_a\rangle\langle e_a|$、$\sum_a\lambda_a=1$ と書けます。[密度演算子とアンサンブルの同値](../QINF2/index.md#thm-qinf2-density-ensemble)により

$$
p_i=\sum_a\lambda_a\operatorname{Tr}(|e_a\rangle\langle e_a|E_i)
=\sum_a\lambda_a\langle e_a,E_ie_a\rangle\ge0.
$$

ここでは $\lambda_a\ge0$ と $E_i$ の正値性を別々に使いました。さらに

$$
\sum_i p_i=\operatorname{Tr}\left(\rho\sum_iE_i\right)
=\operatorname{Tr}(\rho I_H)=1.
$$

射影 $P_i$ は $P_i^\dagger=P_i$、$\langle v,P_iv\rangle=\|P_iv\|^2\ge0$ を満たします。完全性も仮定したのでPOVMであり、[混合状態の射影Born則](../QINF2/index.md#prop-qinf2-trace-born)と同じ式 $\operatorname{Tr}(\rho P_i)$ を得ます。
<!-- proof-end -->

**三結果のqubit測定**を実際に作りましょう。$\omega=e^{2\pi i/3}$ とし、$k=0,1,2$ について、正規化された三つの非直交ベクトル

$$
|\psi_k\rangle=\frac{|0\rangle+\omega^k|1\rangle}{\sqrt2},
\qquad
E_k=\frac23|\psi_k\rangle\langle\psi_k|
$$

を置きます。各 $E_k$ は正の係数を掛けたrank 1射影なので正値であり、$\sum_k\omega^k=\sum_k\overline\omega^k=0$ により

$$
\sum_{k=0}^2E_k
=\frac13\begin{pmatrix}3&\sum_k\overline\omega^k\\\sum_k\omega^k&3\end{pmatrix}
=I_2.
$$

これは三方向の**trine測定**の一例です。$\rho=|0\rangle\langle0|$ では各 $p_k=(2/3)|\langle\psi_k,0\rangle|^2=1/3$ です。対照的に二次元の射影測定で非零の射影が三つ存在すれば、それらの像は互いに直交する非零部分空間となり次元が少なくとも3になって矛盾します。POVMは、同じqubitについて射影測定より豊かな結果集合を実現します。

## 2. 測定は状態にも作用する

POVMは確率を決めますが、同じ $E_i$ から「測定後の状態」を一意に決めることはできません。まず、結果 $i$ が出るときに量子状態へ働く行列 $M_{i\alpha}:H\to H$ を有限個ずつ用意します。添字 $\alpha$ は装置内部の未観測の枝を区別し、結果として報告されるのは $i$ だけです。各枝の作用 $M_{i\alpha}\rho M_{i\alpha}^\dagger$ を足すと、結果に条件づけた非正規化状態になります。このように、**結果の確率と結果後の状態変化の両方を指定する測定模型**を有限Kraus型の測定instrumentとして定式化します。一般のinstrumentを完全正値写像として特徴づける話は、後に量子チャネルを導入してから行います。

<a id="def-qinf5-instrument"></a>

<!-- formal-statement-start -->
> **定義（有限Kraus型測定instrument）**  
> 有限次元複素Hilbert空間 $H$、結果集合 $\Omega$ に対し、各 $i\in\Omega$ に有限個の行列 $M_{i\alpha}:H\to H$（$1\le\alpha\le r_i$、$r_i\ge1$）が対応し、

$$
\sum_{i\in\Omega}\sum_{\alpha=1}^{r_i}
M_{i\alpha}^\dagger M_{i\alpha}=I_H
$$

> を満たすとする。結果 $i$ に対応する写像

$$
\mathcal I_i(\rho)=\sum_{\alpha=1}^{r_i}
M_{i\alpha}\rho M_{i\alpha}^\dagger
$$

> の族を**有限Kraus型測定instrument**と呼ぶ。$\mathcal I_i(\rho)$ は非正規化された結果後状態であり、効果作用素は $E_i=\sum_\alpha M_{i\alpha}^\dagger M_{i\alpha}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qinf5-instrument -->
### 定義の確認：確率半々でも後の状態は異なる

**定義の確認**：二乗和の完全性と、結果ごとの非正規化状態を別々に計算します。

qubitで $X|0\rangle=|1\rangle$、$X|1\rangle=|0\rangle$ とします。装置Aでは $M_0=M_1=I_2/\sqrt2$、装置Bでは $N_0=I_2/\sqrt2$、$N_1=X/\sqrt2$ とします。$X^\dagger X=I_2$ より、両装置とも

$$
\sum_i M_i^\dagger M_i=\sum_iN_i^\dagger N_i=I_2,
\qquad
E_0=E_1=\frac12I_2
$$

で、各枝の正値性と完全性を確認できます。しかし入力 $\rho=|0\rangle\langle0|$ に対し、結果1の非正規化状態は装置Aで $\rho/2$、装置Bで $X\rho X^\dagger/2=|1\rangle\langle1|/2$ です。結果1の確率は双方とも $1/2$ ですが、規格化後の状態は $|0\rangle\langle0|$ と $|1\rangle\langle1|$ で異なります。同じPOVMから測定後状態を復元できないことが直接分かります。
<!-- definition-example-end -->

<a id="prop-qinf5-state-update"></a>

<!-- formal-statement-start -->
> **命題（instrumentの確率と状態更新）**  
> 有限次元複素Hilbert空間 $H$ 上の密度演算子 $\rho$ と[有限Kraus型測定instrument](#def-qinf5-instrument) $(\mathcal I_i)_{i\in\Omega}$ をとる。その効果作用素を $E_i=\sum_\alpha M_{i\alpha}^\dagger M_{i\alpha}$ とする。このとき $(E_i)$ はPOVMであり、結果 $i$ の確率は

$$
p_i=\operatorname{Tr}(\mathcal I_i(\rho))
=\operatorname{Tr}(\rho E_i).
$$

> $p_i>0$ の場合の条件付き状態は $\rho_i=\mathcal I_i(\rho)/p_i$ である。結果を記録せずに捨てた状態は $\rho'=\sum_i\mathcal I_i(\rho)=\sum_i p_i\rho_i$（和の最後は $p_i>0$ の項だけ）であり、いずれも密度演算子となる。$p_i=0$ の結果には条件付き状態を割り当てない。
<!-- formal-statement-end -->

### 証明の見取り図

各項の正値性を内積から確かめ、行列のトレースの巡回性で $M^\dagger M$ を取り出します。結果に条件づけるときに限って確率で割ります。

<!-- proof-start -->
### 証明

任意の $v$ について $\langle v,M_{i\alpha}^\dagger M_{i\alpha}v\rangle=\|M_{i\alpha}v\|^2\ge0$ であり、完全性は定義の総和条件そのものです。従って $E_i$ は[POVMの定義](#def-qinf5-povm)を満たします。また

$$
\begin{aligned}
\operatorname{Tr}(\mathcal I_i(\rho))
&=\sum_\alpha\operatorname{Tr}(M_{i\alpha}\rho M_{i\alpha}^\dagger)\\
&=\sum_\alpha\operatorname{Tr}(\rho M_{i\alpha}^\dagger M_{i\alpha})
=\operatorname{Tr}(\rho E_i).
\end{aligned}
$$

$\rho=\sum_a\lambda_a|e_a\rangle\langle e_a|$ とスペクトル分解すれば

$$
\langle v,\mathcal I_i(\rho)v\rangle
=\sum_{\alpha,a}\lambda_a
|\langle v,M_{i\alpha}e_a\rangle|^2\ge0.
$$

従って $\mathcal I_i(\rho)$ は正値です。$p_i>0$ なら $1/p_i$ 倍で正値かつトレース1になり、$\rho_i$ は密度演算子です。$p_i=0$ なら非正規化状態は正値でトレース0なので、すべての固有値が0、すなわち $\mathcal I_i(\rho)=0$ です。総和は正値でトレース $\sum_ip_i=1$ となり、$\rho'$ も密度演算子です。
<!-- proof-end -->

どのPOVMにも一つの標準的な状態更新を与えられます。正値作用素 $E_i$ のスペクトル分解で各非負固有値の平方根を取った $\sqrt{E_i}$ は正値で、$(\sqrt{E_i})^2=E_i$ です。$M_i=\sqrt{E_i}$ と置けば $\sum_iM_i^\dagger M_i=\sum_iE_i=I$ なので、[instrumentの定義](#def-qinf5-instrument)を満たします。この構成を**平方根型の測定更新**として使います。ただし他の $M_i$ もあり得るため、POVMそのものの定義にこの更新を埋め込んではいけません。

例えば[ぼやけた二値測定](#def-qinf5-povm)で $\rho=|+\rangle\langle+|$、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ なら

$$
M_+=\begin{pmatrix}\sqrt{(1+\eta)/2}&0\\0&\sqrt{(1-\eta)/2}\end{pmatrix},
\quad
M_+|+\rangle=\frac1{\sqrt2}
\begin{pmatrix}\sqrt{(1+\eta)/2}\\\sqrt{(1-\eta)/2}\end{pmatrix}.
$$

このベクトルのノルム二乗は $1/2$ なので、$+$ の条件付き純粋状態は $\sqrt2 M_+|+\rangle$ です。結果を無視した状態の非対角成分は、各枝の積を足すと $\sqrt{1-\eta^2}/2$ になります。$\eta=0$ では元の $|+\rangle$ が保たれ、$\eta=1$ では計算基底で対角化されます。確率が $1/2$ で同じでも、測定の鋭さは擾乱を変えます。

## 3. 補助系を含めれば射影測定に戻せる

trine測定の三結果は二次元の射影だけでは表せません。しかし[QINF1の複合系](../QINF1/index.md#def-qinf1-composite)を使って補助系を足せば、直交するポインタ基底に三結果を書き込めます。鍵は $E_i$ の平方根から、内積を保つ写像を組み立てることです。有限次元でその写像を全空間のユニタリへ延長すれば、補助系を固定した初期状態から通常の射影測定で実装できます。

<a id="thm-qinf5-naimark"></a>

<!-- formal-statement-start -->
> **定理（有限POVMのNaimark拡張）**  
> 有限次元複素Hilbert空間 $H$ と $m$ 結果のPOVM $(E_i)_{i=0}^{m-1}$ をとる。$K=\mathbb C^m$ に正規直交基底 $(|i\rangle)_{i=0}^{m-1}$ を固定し、

$$
V:H\longrightarrow H\otimes K,\qquad
V|v\rangle=\sum_{i=0}^{m-1}\sqrt{E_i}|v\rangle\otimes|i\rangle,
\quad
P_i=I_H\otimes|i\rangle\langle i|
$$

> とする。すると $V^\dagger V=I_H$ で、すべての密度演算子 $\rho$ に対して

$$
\operatorname{Tr}(\rho E_i)
=\operatorname{Tr}\!\left(P_iV\rho V^\dagger\right).
$$

> さらに $K$ の任意の固定単位ベクトル $|a\rangle$ に対し、$H\otimes K$ 上のユニタリ $U$ を選んで $U(|v\rangle\otimes|a\rangle)=V|v\rangle$ とできる。従って補助系の初期状態 $|a\rangle$、ユニタリ $U$、射影測定 $(P_i)$ だけで元のPOVMの結果確率が再現される。
<!-- formal-statement-end -->

### 証明の見取り図

ポインタ基底の直交性で内積計算の交差項を消すと、$V^\dagger V$ が $\sum_iE_i=I_H$ に一致します。ユニタリは、二組の正規直交系をそれぞれ全空間の基底まで補って対応させることで作ります。

<!-- proof-start -->
### 証明

任意の $v,w\in H$ について、ポインタ基底の内積 $\langle i,j\rangle=\delta_{ij}$ から

$$
\begin{aligned}
\langle Vv,Vw\rangle
&=\sum_{i,j}\langle\sqrt{E_i}v,\sqrt{E_j}w\rangle
\langle i,j\rangle\\
&=\sum_i\langle v,E_iw\rangle
=\langle v,w\rangle.
\end{aligned}
$$

よって $V$ は等長写像です。さらに $P_iVv=\sqrt{E_i}v\otimes|i\rangle$ なので

$$
V^\dagger P_iV=E_i,\qquad
\operatorname{Tr}(P_iV\rho V^\dagger)
=\operatorname{Tr}(\rho V^\dagger P_iV)
=\operatorname{Tr}(\rho E_i).
$$

$H$ の正規直交基底を $e_1,\ldots,e_d$ とします。$e_j\otimes a$ は $H\otimes K$ 内の正規直交系であり、$Ve_j$ も上の等長性から正規直交系です。どちらも長さ $d$ の系なので、それぞれを $dm$ 個のベクトルからなる正規直交基底まで補えます。対応する基底ベクトルを線形に写す $U$ を定めれば、内積を保つ全射でありユニタリです。特に $U(e_j\otimes a)=Ve_j$ が各 $j$ で成立し、線形性から任意の $v$ に拡張されます。
<!-- proof-end -->

この構成はPOVMの確率を再現するだけでなく、ポインタ結果 $i$ に条件づけた後、補助系を[部分トレース](../QINF3/index.md#def-qinf3-partial-trace)で捨てると $\sqrt{E_i}\rho\sqrt{E_i}$ を残します。これは前節の**平方根型**更新です。Naimark拡張は測定後更新を一意に固定する定理ではない、という点に注意しましょう。

## 4. 補助系が測定装置の内部の枝も記録する

一つの結果に複数の $M_{i\alpha}$ が対応する場合も、報告されない枝 $\alpha$ を補助系の別々の直交ラベルへ記録できます。結果 $i$ のラベルだけを読み、$\alpha$ を捨てればinstrumentの状態更新に一致します。

<a id="thm-qinf5-instrument-dilation"></a>

<!-- formal-statement-start -->
> **定理（有限Kraus型instrumentの補助系実現）**  
> 有限次元複素Hilbert空間 $H$ 上の[有限Kraus型測定instrument](#def-qinf5-instrument) が行列 $M_{i\alpha}$（$i\in\Omega$、$1\le\alpha\le r_i$）で与えられたとする。$K=\mathbb C^N$、$N=\sum_i r_i$ に正規直交基底 $|i,\alpha\rangle$ を取り、

$$
V|v\rangle=\sum_{i,\alpha}M_{i\alpha}|v\rangle\otimes|i,\alpha\rangle,
\qquad
P_i=I_H\otimes\sum_{\alpha=1}^{r_i}|i,\alpha\rangle\langle i,\alpha|
$$

> と置く。このとき $V^\dagger V=I_H$ であり、任意の密度演算子 $\rho$ について

$$
\operatorname{Tr}_K\!\left(P_iV\rho V^\dagger P_i\right)
=\mathcal I_i(\rho).
$$

> さらに $H\otimes K$ の固定補助状態とユニタリの組を用い、$V$ を実現できる。
<!-- formal-statement-end -->

### 証明の見取り図

[Naimark拡張](#thm-qinf5-naimark)と同じ基底補完を使います。今度はポインタを $(i,\alpha)$ の組で区別し、射影 $P_i$ が同じ報告結果の枝をまとめることが重要です。

<!-- proof-start -->
### 証明

$v,w\in H$ について

$$
\begin{aligned}
\langle Vv,Vw\rangle
&=\sum_{i,\alpha}\langle M_{i\alpha}v,M_{i\alpha}w\rangle\\
&=\left\langle v,\left(\sum_{i,\alpha}
M_{i\alpha}^\dagger M_{i\alpha}\right)w\right\rangle
=\langle v,w\rangle.
\end{aligned}
$$

従って $V^\dagger V=I_H$ です。$\rho$ を行列成分で展開すると

$$
V\rho V^\dagger
=\sum_{i,\alpha,j,\beta}
M_{i\alpha}\rho M_{j\beta}^\dagger
\otimes|i,\alpha\rangle\langle j,\beta|.
$$

左右から $P_i$ を掛けると $i=j$ の項だけが残り、さらに[積作用素の部分トレース公式](../QINF3/index.md#prop-qinf3-state-product)で $\operatorname{Tr}(|i,\alpha\rangle\langle i,\beta|)=\delta_{\alpha\beta}$ だから

$$
\begin{aligned}
\operatorname{Tr}_K(P_iV\rho V^\dagger P_i)
&=\sum_{\alpha,\beta}
M_{i\alpha}\rho M_{i\beta}^\dagger\delta_{\alpha\beta}\\
&=\sum_\alpha M_{i\alpha}\rho M_{i\alpha}^\dagger
=\mathcal I_i(\rho).
\end{aligned}
$$

$V$ が等長なので、[Naimark拡張の証明](#thm-qinf5-naimark)と同じ正規直交基底の補完により、任意の固定 $|a\rangle\in K$ について $U(v\otimes a)=Vv$ を満たすユニタリ $U$ が存在します。
<!-- proof-end -->

ここでは、**POVMは観測された結果の確率**を、**instrumentは結果に伴う状態変化**を指定する、という役割分担がはっきりしました。任意のPOVMには平方根型のinstrumentを作れますが、異なるinstrumentが同一POVMを持ちます。射影測定・効果作用素・測定後の条件付き状態を混同しないことが、後続の量子チャネルや状態識別の議論の出発点になります。

## 5. 演習：結果の確率と擾乱を分けて計算する

<a id="ex-qinf5-a01"></a>
### QINF5-A01 二値効果作用素の三条件

- Level: A
- 問題: $H=\mathbb C^2$ で $Z=\operatorname{diag}(1,-1)$ とし、$E_\pm=(I_2\pm Z/2)/2$ とする。両者がPOVMであることを固有値・自己共役性・総和から確認せよ。$\rho=|0\rangle\langle0|$ の結果確率を求め、$E_+^2=E_+$ かを判定せよ。

<!-- solution-start -->
**詳細解答**。行列を対角成分まで書くと

$$
E_+=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},
\qquad
E_-=\begin{pmatrix}1/4&0\\0&3/4\end{pmatrix}.
$$

両者は実対角で自己共役、固有値はともに $3/4,1/4$ で非負、総和は $I_2$ です。よって[POVMの定義](#def-qinf5-povm)の全条件を満たします。$\rho=\operatorname{diag}(1,0)$ を用いて

$$
p_+=\operatorname{Tr}(\rho E_+)=\frac34,\qquad
p_-=\operatorname{Tr}(\rho E_-)=\frac14.
$$

一方 $E_+^2=\operatorname{diag}(9/16,1/16)$ で $E_+$ とは異なります。これは射影測定でなくても確率分布が得られる直接例です。
<!-- solution-end -->

<a id="ex-qinf5-a02"></a>
### QINF5-A02 平方根型更新の混合状態

- Level: A
- 問題: $H=\mathbb C^2$、$E_0=\operatorname{diag}(1/2,0)$、$E_1=\operatorname{diag}(1/2,1)$、入力 $\rho=I_2/2$ とする。平方根型の $M_i=\sqrt{E_i}$ を作り、各結果の確率と条件付き密度演算子を求めよ。

<!-- solution-start -->
**詳細解答**。$E_0,E_1$ は非負の実対角成分を持ち、和が $I_2$ なのでPOVMです。対角行列の非負平方根を取って

$$
M_0=\begin{pmatrix}1/\sqrt2&0\\0&0\end{pmatrix},
\qquad
M_1=\begin{pmatrix}1/\sqrt2&0\\0&1\end{pmatrix}.
$$

入力は $I_2/2$ なので $\mathcal I_i(\rho)=M_iM_i^\dagger/2=E_i/2$ です。従って

$$
\begin{aligned}
\mathcal I_0(\rho)&=\operatorname{diag}(1/4,0),
&p_0&=1/4,
&\rho_0&=\operatorname{diag}(1,0),\\
\mathcal I_1(\rho)&=\operatorname{diag}(1/4,1/2),
&p_1&=3/4,
&\rho_1&=\operatorname{diag}(1/3,2/3).
\end{aligned}
$$

各条件付き状態は正値でトレース1です。[状態更新命題](#prop-qinf5-state-update)に照らすと、非選択状態は $\operatorname{diag}(1/2,1/2)$ となり、この対角入力では更新前と一致します。一般の非対角入力まで不変とはいえません。
<!-- solution-end -->

<a id="ex-qinf5-a03"></a>
### QINF5-A03 非直交な三方向の確率

- Level: A
- 問題: $\omega=e^{2\pi i/3}$、$|\psi_k\rangle=(|0\rangle+\omega^k|1\rangle)/\sqrt2$、$E_k=(2/3)|\psi_k\rangle\langle\psi_k|$（$k=0,1,2$）とする。POVMの完全性を確認し、入力 $|\psi_0\rangle$ に対する三結果の確率を求めよ。

<!-- solution-start -->
**詳細解答**。各 $|\psi_k\rangle$ はノルム1で、$E_k$ は正値です。外積を表示すると

$$
\sum_{k=0}^2 E_k
=\frac13\begin{pmatrix}3&1+\overline\omega+\overline\omega^2\\
1+\omega+\omega^2&3\end{pmatrix}
=I_2.
$$

入力 $|\psi_0\rangle=(|0\rangle+|1\rangle)/\sqrt2$ に対し、[POVMのBorn確率](#prop-qinf5-probabilities)は $p_k=(2/3)|\langle\psi_k,\psi_0\rangle|^2$ です。$k=0$ の内積は1です。$k=1,2$ では

$$
\langle\psi_k,\psi_0\rangle=\frac{1+\overline\omega^k}{2},
\quad
|1+\overline\omega^k|^2
=2+2\cos(2\pi k/3)=1.
$$

よって $(p_0,p_1,p_2)=(2/3,1/6,1/6)$ で、和は1です。
<!-- solution-end -->

<a id="ex-qinf5-a04"></a>
### QINF5-A04 同じ確率、異なる擾乱

- Level: A
- 問題: $H=\mathbb C^2$、$X=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ とする。装置Aを $M_0=M_1=I_2/\sqrt2$、装置Bを $N_0=I_2/\sqrt2,\ N_1=X/\sqrt2$ とする。各instrumentの完全性、入力 $|0\rangle$ での結果確率、結果1の条件付き状態、非選択状態を比較せよ。

<!-- solution-start -->
**詳細解答**。$X^\dagger X=I_2$ より、AもBも測定演算子の二乗和は $I_2/2+I_2/2=I_2$ です。従って[有限instrumentの定義](#def-qinf5-instrument)を満たし、効果作用素はどちらも $E_0=E_1=I_2/2$。$|0\rangle$ 入力で確率は双方 $(1/2,1/2)$ です。

Aの結果後の非正規化状態は両方 $\frac12|0\rangle\langle0|$ であり、結果1の条件付き状態と非選択状態はともに $|0\rangle\langle0|$ です。Bでは

$$
\mathcal I_0(\rho)=\frac12|0\rangle\langle0|,
\qquad
\mathcal I_1(\rho)=\frac12X|0\rangle\langle0|X^\dagger
=\frac12|1\rangle\langle1|.
$$

結果1の条件付き状態は $|1\rangle\langle1|$、非選択状態は $I_2/2$ です。同じPOVMであっても装置の状態変化は異なります。
<!-- solution-end -->

<a id="ex-qinf5-b01"></a>
### QINF5-B01 正値性の境界をBloch方向で判定する

- Level: B
- 問題: 実数 $s,t$ とPauli行列 $X=\begin{pmatrix}0&1\\1&0\end{pmatrix}$、$Z=\operatorname{diag}(1,-1)$ に対し、$E_\pm=(I_2\pm(sX+tZ))/2$ とする。これがPOVMであるための必要十分条件を求めよ。また $|0\rangle$ と $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を入力したときの $+$ 確率を計算せよ。

<!-- solution-start -->
**詳細解答**。$A=sX+tZ=\begin{pmatrix}t&s\\s&-t\end{pmatrix}$ とおきます。$X^2=Z^2=I_2$、$XZ+ZX=0$ を行列積で確認すると

$$
A^2=s^2I_2+t^2I_2+st(XZ+ZX)
=(s^2+t^2)I_2.
$$

$A$ は自己共役でトレース0なので、固有値は $r,-r$、$r=\sqrt{s^2+t^2}$ です。$E_\pm$ は自己共役かつ和が $I_2$ であり、それぞれの固有値は $(1+r)/2,(1-r)/2$。従って[POVMの正値性条件](#def-qinf5-povm)は $r\le1$、すなわち

$$
s^2+t^2\le1
$$

と同値です。$|0\rangle$ では $\langle0,X0\rangle=0$、$\langle0,Z0\rangle=1$ なので $p_+(|0\rangle)=(1+t)/2$。$|+\rangle$ では $\langle+,X+\rangle=1$、$\langle+,Z+\rangle=0$ なので $p_+(|+\rangle)=(1+s)/2$ です。境界 $r=1$ なら両効果は射影、内側 $r<1$ ならどちらも二つの正固有値を持ちます。
<!-- solution-end -->

<a id="ex-qinf5-b02"></a>
### QINF5-B02 一結果に二つの内部枝を持つ装置

- Level: B
- 問題: $0<q<1$、$P_0=|0\rangle\langle0|$、$P_1=|1\rangle\langle1|$ とする。報告結果0に $M_{0,1}=\sqrt q P_0,\ M_{0,2}=\sqrt q P_1$、結果1に $M_{1,1}=\sqrt{1-q}\,I_2$ を割り当てる。完全性、効果作用素、入力 $|+\rangle$ での条件付き状態と非選択状態をすべて求めよ。

<!-- solution-start -->
**詳細解答**。内部枝の二乗和は

$$
\sum_{i,\alpha}M_{i\alpha}^\dagger M_{i\alpha}
=q(P_0+P_1)+(1-q)I_2=I_2.
$$

従って $E_0=qI_2$、$E_1=(1-q)I_2$ で、結果確率は入力によらず $p_0=q$、$p_1=1-q$ です。入力 $\rho=|+\rangle\langle+|=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ に対し

$$
\begin{aligned}
\mathcal I_0(\rho)&=q(P_0\rho P_0+P_1\rho P_1)
=\frac q2I_2,\\
\mathcal I_1(\rho)&=(1-q)\rho.
\end{aligned}
$$

$p_0,p_1$ はどちらも正なので $\rho_0=I_2/2$、$\rho_1=\rho$。結果を無視すると

$$
\rho'=\frac q2I_2+(1-q)\rho
=\frac12\begin{pmatrix}1&1-q\\1-q&1\end{pmatrix}.
$$

結果0の内部枝を区別しないため、$|0\rangle$ と $|1\rangle$ の間の非対角成分が消えます。$E_0=qI_2$ という効果作用素だけから、この擾乱は読み取れません。
<!-- solution-end -->

<a id="ex-qinf5-b03"></a>
### QINF5-B03 三結果測定の等長写像を手で作る

- Level: B
- 問題: [三結果POVM](#ex-qinf5-a03)で $\sqrt{E_k}=\sqrt{2/3}|\psi_k\rangle\langle\psi_k|$ とする。$V:H\to H\otimes\mathbb C^3$ を[Naimark構成](#thm-qinf5-naimark)で定め、$V|0\rangle,V|1\rangle$ を求めて内積を直接確認せよ。$|0\rangle$ 入力に対するポインタ測定の結果確率も求めよ。

<!-- solution-start -->
**詳細解答**。rank 1射影 $Q_k=|\psi_k\rangle\langle\psi_k|$ は $Q_k^2=Q_k$ なので $\sqrt{E_k}=\sqrt{2/3}Q_k$ です。$\langle\psi_k,0\rangle=1/\sqrt2$、$\langle\psi_k,1\rangle=\overline\omega^k/\sqrt2$ を代入して

$$
V|0\rangle=\frac1{\sqrt3}\sum_k|\psi_k\rangle|k\rangle,\qquad
V|1\rangle=\frac1{\sqrt3}\sum_k\overline\omega^k|\psi_k\rangle|k\rangle.
$$

ポインタ基底 $|k\rangle$ が直交し、各 $\|\psi_k\|=1$ なので両ベクトルのノルム二乗は $(1/3)\sum_k1=1$ です。また

$$
\langle V0,V1\rangle
=\frac13\sum_{k=0}^2\overline\omega^k
=0.
$$

従って二本は正規直交し、$V^\dagger V=I_2$ を基底で検算しました。入力 $|0\rangle$ の $k$ 番ポインタ成分のノルム二乗は $(1/3)\|\psi_k\|^2=1/3$。すなわち各結果は確率 $1/3$ で、元のPOVMのBorn確率と一致します。$V$ は次元2から6への等長写像であり、$H$ 上のユニタリと混同してはいけません。
<!-- solution-end -->

<a id="ex-qinf5-b04"></a>
### QINF5-B04 同じ三結果測定を続けたら

- Level: B
- 問題: 入力 $|0\rangle$ にtrine測定 $E_k=(2/3)|\psi_k\rangle\langle\psi_k|$ を平方根型更新で二度連続して行い、各回の報告結果を記録する。第一回の結果確率・条件付き状態、二回連続で同じ結果となる確率、第一回の結果を捨てた状態と第二回の周辺確率を求めよ。

<!-- solution-start -->
**詳細解答**。第一回の確率は[三結果の計算](#def-qinf5-povm)により $p_k=1/3$ です。$\sqrt{E_k}=\sqrt{2/3}Q_k$、$Q_k=|\psi_k\rangle\langle\psi_k|$ なので、第一回の非正規化状態は

$$
\mathcal I_k(|0\rangle\langle0|)
=\frac23|\langle\psi_k,0\rangle|^2Q_k
=\frac13Q_k.
$$

したがって第一回で $k$ を得た条件付き状態は $Q_k$ です。その状態に再び同じ測定を行うと、結果 $j$ の条件付き確率は $(2/3)|\langle\psi_j,\psi_k\rangle|^2$。$j=k$ では $2/3$ なので、二回とも同じ結果となる確率は

$$
\sum_{k=0}^2 P(K_1=k)P(K_2=k\mid K_1=k)
=3\cdot\frac13\cdot\frac23=\frac23.
$$

第一回を非選択にすれば

$$
\rho'=\sum_{k=0}^2\frac13Q_k
=\frac13\cdot\frac32I_2=\frac12I_2.
$$

第二回の周辺確率は $\operatorname{Tr}(\rho'E_j)=(1/2)\operatorname{Tr}((2/3)Q_j)=1/3$ です。二回の周辺確率が一様でも、連続結果には相関があります。
<!-- solution-end -->

<a id="ex-qinf5-c01"></a>
### QINF5-C01 POVM、instrument、Naimark拡張を統合する

- Level: C
- 問題: $H=\mathbb C^2$、$\rho=|+\rangle\langle+|$、$|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ に対し、$E_0=\operatorname{diag}(1/2,0)$、$E_1=\operatorname{diag}(1/2,1)$ とする。
  1. POVMの条件と結果確率を確認せよ。
  2. 平方根型instrumentの各条件付き状態および非選択状態を求めよ。
  3. $Vv=\sqrt{E_0}v\otimes|0\rangle+\sqrt{E_1}v\otimes|1\rangle$ について $V|0\rangle,V|1\rangle$ を与え、正規直交性とポインタ確率を確かめよ。
  4. $M'_0=\sqrt{E_0},\ M'_1=X\sqrt{E_1}$（$X|0\rangle=|1\rangle,\ X|1\rangle=|0\rangle$）でも同じPOVMであることを示し、結果1の条件付き状態および非選択状態の差を求めよ。

<!-- solution-start -->
**詳細解答**。第一に $E_0,E_1$ は自己共役で固有値がそれぞれ $(1/2,0)$ と $(1/2,1)$、いずれも非負です。$E_0+E_1=I_2$ より[POVMの定義](#def-qinf5-povm)を満たします。$\rho=\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$ なので

$$
p_0=\operatorname{Tr}(\rho E_0)=\frac14,\qquad
p_1=\operatorname{Tr}(\rho E_1)=\frac14+\frac12=\frac34.
$$

第二に平方根は $M_0=\operatorname{diag}(1/\sqrt2,0)$、$M_1=\operatorname{diag}(1/\sqrt2,1)$ です。入力ベクトルの像は

$$
M_0|+\rangle=\frac12|0\rangle,
\qquad
M_1|+\rangle=\frac12|0\rangle+\frac1{\sqrt2}|1\rangle.
$$

ノルム二乗は $1/4,3/4$ なので、[条件付き状態の式](#prop-qinf5-state-update)を使うと

$$
\rho_0=|0\rangle\langle0|,
\quad
\rho_1=|\phi\rangle\langle\phi|,
\quad
|\phi\rangle=\frac1{\sqrt3}|0\rangle+\sqrt{\frac23}|1\rangle.
$$

非選択状態は各非正規化外積の和です。対角・非対角成分を分けて計算すると

$$
\begin{aligned}
M_0\rho M_0^\dagger&=\begin{pmatrix}1/4&0\\0&0\end{pmatrix},\\
M_1\rho M_1^\dagger&=\begin{pmatrix}1/4&1/(2\sqrt2)\\1/(2\sqrt2)&1/2\end{pmatrix},\\
\rho'&=\begin{pmatrix}1/2&1/(2\sqrt2)\\1/(2\sqrt2)&1/2\end{pmatrix}.
\end{aligned}
$$

第三に[Naimarkの構成](#thm-qinf5-naimark)へ計算基底を代入すると

$$
V|0\rangle=\frac1{\sqrt2}|0\rangle|0\rangle
+\frac1{\sqrt2}|0\rangle|1\rangle,
\qquad
V|1\rangle=|1\rangle|1\rangle.
$$

第一のノルム二乗は $1/2+1/2=1$、第二は1、二つの内積は系側の $\langle0,1\rangle=0$ で消えます。よって $V$ は等長です。$V|+\rangle=(V|0\rangle+V|1\rangle)/\sqrt2$ のポインタ0成分は $(1/2)|0\rangle|0\rangle$、ポインタ1成分は $(1/2)|0\rangle|1\rangle+(1/\sqrt2)|1\rangle|1\rangle$ で、ノルム二乗は $1/4,3/4$。元のPOVM確率を再現しました。

第四に $X^\dagger X=I_2$ だから

$$
(M'_1)^\dagger M'_1
=\sqrt{E_1}X^\dagger X\sqrt{E_1}=E_1,
\qquad
(M'_0)^\dagger M'_0=E_0.
$$

POVMと確率は変わりませんが、結果1では正規化後のベクトルが $X|\phi\rangle=\sqrt{2/3}|0\rangle+(1/\sqrt3)|1\rangle$ となります。非選択状態も

$$
\begin{aligned}
\rho''&=M_0\rho M_0^\dagger+
X(M_1\rho M_1^\dagger)X^\dagger\\
&=\begin{pmatrix}1/4&0\\0&0\end{pmatrix}
+\begin{pmatrix}1/2&1/(2\sqrt2)\\1/(2\sqrt2)&1/4\end{pmatrix}\\
&=\begin{pmatrix}3/4&1/(2\sqrt2)\\1/(2\sqrt2)&1/4\end{pmatrix}.
\end{aligned}
$$

両方とも正値でトレース1です。したがって確率分布を保存したまま、条件付き状態も結果を捨てた状態も変えられることが分かります。
<!-- solution-end -->

## 6. 本章で獲得した道具

- 効果作用素は正値で総和が恒等作用素ならよく、互いに直交する射影である必要はありません。三結果trine測定はqubitでその違いを示しました。
- 同じPOVMでも異なるinstrumentを選べます。報告結果の確率 $p_i$ と条件付き状態 $\rho_i$ の両方を追うと、測定の擾乱を具体的に比較できます。
- 有限POVMの平方根から等長写像を構成し、補助系の射影測定へ拡張できます。複数の内部枝を持つ測定も、枝ラベルを含む補助系へ記録できます。

次は、二部純粋状態の縮約の固有値を系統的に比較するSchmidt分解へ進みます。その後、測定更新を含むより広い状態変換を量子チャネルとして扱います。
