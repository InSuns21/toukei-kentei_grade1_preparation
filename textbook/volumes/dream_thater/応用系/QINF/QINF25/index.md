# QINF25 ビット反転・位相反転符号

## 1. 量子情報を測らずに、誤りだけを知りたい

[QINF24の量子通信符号](../QINF24/index.md#def-qinf24-entanglement-code)は、未知の重ね合わせを等長写像で物理系へ埋め込み、雑音のあとで復号するものでした。しかし、単に量子ビットを三つに増やすだけでは、雑音がどこに起きたか分かりません。誤りを見つけるために論理状態の $0,1$ を直接測れば、保存したかった相対位相を失います。

ここでは **論理情報は測らず、誤りの位置を知らせるパリティだけ測る** 方法を作ります。物理量子ビットを左から $1,2,3$ と番号付けし、[計算基底](../QINF1/index.md#def-qinf1-qubit)を $|b_1b_2b_3\rangle$（$b_j\in\{0,1\}$）と書きます。一量子ビットのPauli作用素 $X,Z$ は、計算基底で

$$
X|b\rangle=|1-b\rangle,\qquad
Z|b\rangle=(-1)^b|b\rangle\quad(b=0,1)
$$

と作用します。$X_j,Z_j$ は[局所作用素](../QINF1/index.md#def-qinf1-local-operator)として第 $j$ 量子ビットにだけ $X,Z$ を、ほかの二つには恒等作用素 $I$ を作用させます。

この章でいう「一つのビット反転」は $X_1,X_2,X_3$ のいずれか一つが生じるという意味です。同時に二つ以上の反転が起きる模型や、位相反転 $Z_j$ は別に検討します。「任意の一量子ビット雑音」を訂正できるという意味ではありません。

## 2. 三つの物理量子ビットに一つの論理量子ビットを入れる

古典的には $0\mapsto000$、$1\mapsto111$ とすれば、多数決で一か所のビット反転を直せます。量子ではこれを二つの入力 $|0\rangle,|1\rangle$ だけで終わらせず、重ね合わせ全体に**線形に**作用させます。

<a id="def-qinf25-bit-code"></a>

<!-- formal-statement-start -->
> **定義（3量子ビット反復符号と符号空間）**
> 論理空間 $L\simeq\mathbb C^2$ から物理空間 $A=(\mathbb C^2)^{\otimes3}$ への写像 $V$ を

$$
V|0\rangle=|0_L\rangle:=|000\rangle,\qquad
V|1\rangle=|1_L\rangle:=|111\rangle
$$

> から線形に定める。この等長写像 $V$ をビット反転反復符号の符号化、二次元部分空間

$$
\mathcal C=\operatorname{span}\{|000\rangle,|111\rangle\},
\qquad
P=VV^\dagger=|000\rangle\langle000|+|111\rangle\langle111|
$$

> を符号空間とその射影とする。$X_L:=X_1X_2X_3$ は $\mathcal C$ 上で論理 $X$ として作用する。
<!-- formal-statement-end -->

まず $|000\rangle,|111\rangle$ は直交し、それぞれ長さ1です。任意の $|\psi\rangle=\alpha|0\rangle+\beta|1\rangle$ に対し、符号語を $|\psi_L\rangle:=V|\psi\rangle$ と略記すると

$$
V|\psi\rangle=\alpha|000\rangle+\beta|111\rangle,\qquad
\|V|\psi\rangle\|^2=|\alpha|^2+|\beta|^2=\|\psi\|^2.
$$

したがって $V^\dagger V=I_L$、$P^2=P=P^\dagger$ が成り立ちます。論理作用の確認も

$$
X_1X_2X_3|000\rangle=|111\rangle,\qquad
X_1X_2X_3|111\rangle=|000\rangle
$$

と両基底で直接できます。

<!-- definition-example-start: def-qinf25-bit-code -->
**定義の確認**。入力 $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を入れると、$V|+\rangle=(|000\rangle+|111\rangle)/\sqrt2$ は正規化され、$P$ を作用させても変わりません。一方 $P|001\rangle=0$ です。従って符号空間は八次元空間の全体ではなく、二次元の部分空間です。
<!-- definition-example-end -->

### CNOTでの符号化と復号

最初の量子ビットに未知状態 $\alpha|0\rangle+\beta|1\rangle$、残り二つに $|00\rangle$ を準備します。CNOTは制御ビットが1のときだけ標的ビットを反転するゲートで、$\mathrm{CNOT}_{1\to j}$ は計算基底の $b_j$ を $b_j\oplus b_1$ に変えます（$\oplus$ は2を法とする加算）。制御を1番、標的を2番・3番とする二つのCNOTを順に施すと

$$
\begin{aligned}
(\alpha|0\rangle+\beta|1\rangle)|00\rangle
&\xrightarrow{\mathrm{CNOT}_{1\to2}}
\alpha|000\rangle+\beta|110\rangle\\
&\xrightarrow{\mathrm{CNOT}_{1\to3}}
\alpha|000\rangle+\beta|111\rangle.
\end{aligned}
$$

二つのCNOTはそれぞれ自分自身が逆演算で、互いに可換です。誤りを訂正した後、同じ二つを逆順に作用させれば $|\psi\rangle|00\rangle$ に戻ります。

これは未知状態を三つ複製することではありません。例えば符号化された $|+\rangle$ の最初の量子ビットだけを [部分トレース](../QINF3/index.md#def-qinf3-partial-trace) すると

$$
\operatorname{Tr}_{23}(|+_L\rangle\langle+_L|)
=\tfrac12|0\rangle\langle0|+\tfrac12|1\rangle\langle1|
\ne|+\rangle\langle+|
$$

です。[純粋状態の複製不能定理](../QINF12/index.md#thm-qinf12-pure-no-cloning)とも矛盾しません。位相情報は三つの量子ビットの間の相関に保存されます。

## 3. パリティを測れば論理振幅を読まずに済む

$|000\rangle$ と $|111\rangle$ では、隣同士のビットが一致しています。片方のビットが反転すると「1番と2番が一致するか」「2番と3番が一致するか」のどこかが変わります。両者に共通な性質を測れば、$\alpha,\beta$ を区別せずに位置を特定できそうです。

この一致・不一致を、先ほど導入した $Z$ を使って固有値 $\pm1$ として表示します。計算基底では

$$
Z_1Z_2|b_1b_2b_3\rangle
=(-1)^{b_1+b_2}|b_1b_2b_3\rangle
$$

であり、$b_1=b_2$ のとき $+1$、異なるとき $-1$ です。$Z_2Z_3$ でも同じ判定を2番と3番のビットへ行います。二つの作用素は同じ計算基底で対角的なので可換です。

また、$T=T^\dagger$、$T^2=I$ を満たす検査作用素では、固有値 $u=\pm1$ を持つ固有ベクトル $|v_u\rangle$ について

$$
\frac{I+sT}{2}|v_u\rangle=\frac{1+su}{2}|v_u\rangle
=\begin{cases}|v_u\rangle,&u=s,\\0,&u=-s\end{cases}
$$

が成り立ちます（$s=\pm1$）。従って二つのこの射影を掛ければ、両方のパリティに一致する成分だけが残ります。

<a id="def-qinf25-syndrome"></a>

<!-- formal-statement-start -->
> **定義（パリティsyndromeと回復操作）**
> $T_1=Z_1Z_2$、$T_2=Z_2Z_3$ とする。二つの可換な検査作用素の測定結果 $(s,t)\in\{+1,-1\}^2$ をパリティsyndromeと呼び、その同時固有空間への射影を

$$
\Pi_{s,t}=\frac{I+sT_1}{2}\frac{I+tT_2}{2}
$$

> とする。$F_{+,+}=I$、$F_{-,+}=X_1$、$F_{-,-}=X_2$、$F_{+,-}=X_3$ と置き、syndromeごとの補正を

$$
\mathcal R(\sigma)
=\sum_{s,t=\pm1}
F_{s,t}\Pi_{s,t}\sigma\Pi_{s,t}F_{s,t}^\dagger
$$

> と定める。$\sigma$ は物理三量子ビットの任意の密度演算子とする。
<!-- formal-statement-end -->

この定義では測定の結果 $(s,t)$ と補正作用 $F_{s,t}$ を古典的に結び付けています。実際に物理系での確率と測定後状態を決めるのは、[射影測定のBorn則](../QINF1/index.md#prop-qinf1-joint-born)と[測定後状態](../QINF5/index.md#prop-qinf5-state-update)です。

<!-- definition-example-start: def-qinf25-syndrome -->
**定義の確認**。$X_2|\psi_L\rangle=\alpha|010\rangle+\beta|101\rangle$ とします。両基底ベクトルは $T_1,T_2$ の固有値がともに $-1$ なので、$\Pi_{-,-}X_2|\psi_L\rangle=X_2|\psi_L\rangle$、他の三射影の作用は0です。従って測定は確率1で $(-,-)$ を返し、$F_{-,-}=X_2$ をかけると $X_2^2|\psi_L\rangle=|\psi_L\rangle$ に戻ります。確率は $\alpha,\beta$ に依存しません。
<!-- definition-example-end -->

どの反転がどのsyndromeを作るかを、$T_j$ の固有値を基底ごとに代入して求めると次の通りです。「−」は不一致、「＋」は一致を表します。

| 誤り | $T_1=Z_1Z_2$ | $T_2=Z_2Z_3$ | 補正 |
|---|:---:|:---:|---|
| $I$ | $+$ | $+$ | $I$ |
| $X_1$ | $-$ | $+$ | $X_1$ |
| $X_2$ | $-$ | $-$ | $X_2$ |
| $X_3$ | $+$ | $-$ | $X_3$ |

例えば $X_1|000\rangle=|100\rangle$ では $Z_1Z_2$ の固有値が $(-1)(+1)=-1$、$Z_2Z_3$ は $(+1)(+1)=+1$ です。$X_1|111\rangle=|011\rangle$ でも同じ二つの固有値なので、任意の重ね合わせのまま測定できます。

<a id="prop-qinf25-projectors"></a>

<!-- formal-statement-start -->
> **命題（パリティsyndrome射影の分解）**
> $T_1=Z_1Z_2,T_2=Z_2Z_3$ に対する四つの $\Pi_{s,t}$ は、互いに直交する階数2の射影であり、

$$
\Pi_{s,t}\Pi_{u,v}=\delta_{s,u}\delta_{t,v}\Pi_{s,t},
\qquad
\sum_{s,t=\pm1}\Pi_{s,t}=I.
$$

> 従って上の $\mathcal R$ は全物理空間上のCPTP写像である。
<!-- formal-statement-end -->

### 証明の見取り図

$T_1^2=T_2^2=I$、$T_1T_2=T_2T_1$ なので、$(I\pm T_j)/2$ は互いに直交する二値射影です。四つを掛け合わせれば同時固有空間へ分解でき、補正 $F_{s,t}$ はユニタリです。

<!-- proof-start -->
### 証明

同じ量子ビット上の $Z$ は二乗が $I$ なので $T_1^2=T_2^2=I$、また $T_1T_2=Z_1Z_3=T_2T_1$ です。$s,u\in\{\pm1\}$ に対して

$$
\frac{I+sT_1}{2}\frac{I+uT_1}{2}
=\begin{cases}
(I+sT_1)/2,&s=u,\\
0,&s\ne u,
\end{cases}
$$

となり、$T_2$ についても同じです。二つの組が可換なので積を組み替えると、命題の直交性が得られます。また

$$
\sum_{s,t}\Pi_{s,t}
=\left(\sum_s\frac{I+sT_1}{2}\right)
\left(\sum_t\frac{I+tT_2}{2}\right)=I.
$$

各 $\Pi_{s,t}$ の像は、ビット列 $b_1b_2b_3$ とその全ビット反転 $\overline b_1\overline b_2\overline b_3$ が共有するパリティによって張られます。どの $(s,t)$ にもこの一組の計算基底ベクトルが二つ存在し、階数は2です。

最後に $K_{s,t}=F_{s,t}\Pi_{s,t}$ と置くと、$F_{s,t}^\dagger F_{s,t}=I$ だから

$$
\sum_{s,t}K_{s,t}^\dagger K_{s,t}
=\sum_{s,t}\Pi_{s,t}F_{s,t}^\dagger F_{s,t}\Pi_{s,t}
=\sum_{s,t}\Pi_{s,t}=I.
$$

[Kraus表示の完全正値・トレース保存条件](../QINF7/index.md#thm-qinf7-kraus-cptp)により $\mathcal R$ はCPTP写像です。
<!-- proof-end -->

### 二つの補助量子ビットでsyndromeを読む

データ三量子ビットに補助量子ビット $a,b$ を $|00\rangle_{ab}$ で添えます。$1\to a$ と $2\to a$ のCNOTで $b_1\oplus b_2$、$2\to b$ と $3\to b$ のCNOTで $b_2\oplus b_3$ を書き込みます（$\oplus$ は2を法とする加算）。計算基底では

$$
|b_1b_2b_3\rangle|00\rangle_{ab}
\longmapsto
|b_1b_2b_3\rangle
|b_1\oplus b_2,\ b_2\oplus b_3\rangle_{ab}.
$$

一般のデータ状態 $|\phi\rangle$ には線形性から

$$
|\phi\rangle|00\rangle_{ab}
\longmapsto
\sum_{u,v\in\{0,1\}}
\Pi_{(-1)^u,(-1)^v}|\phi\rangle|uv\rangle_{ab}.
$$

右辺の四枝はデータ側も直交しています。補助量子ビットを計算基底で測ると、結果 $uv$ の確率は $\|\Pi_{(-1)^u,(-1)^v}|\phi\rangle\|^2$、条件付きデータ状態は対応する射影で規格化した状態です。[一般化測定の状態更新](../QINF5/index.md#prop-qinf5-state-update)とも一致します。

とりわけ $\alpha|000\rangle+\beta|111\rangle$ では、両基底のパリティが $00$ なので出力は

$$
(\alpha|000\rangle+\beta|111\rangle)|00\rangle_{ab}.
$$

補助量子ビットには $\alpha,\beta$ の情報が書き込まれません。$X_i$ が一つ入った場合も、上表に対応する**同一の**補助ビット列が二つの論理基底に付くので、論理重ね合わせは保たれます。

## 4. 一か所までのビット反転を完全に訂正する

syndromeを読んだ後の補正は、観測された枝に対応する $X_i$ をもう一度作用させるだけです。重要なのは基底 $|0_L\rangle,|1_L\rangle$ だけでなく、任意の密度行列にも同じ回復写像が効くことです。

<a id="thm-qinf25-single-correction"></a>

<!-- formal-statement-start -->
> **定理（単一ビット反転の完全訂正）**
> $V:L\to A$ を[本章の3量子ビット反復符号](#def-qinf25-bit-code)、$\mathcal R$ を[パリティsyndrome回復](#def-qinf25-syndrome)とする。$E_0=I,E_i=X_i$（$i=1,2,3$）とおく。任意の論理密度行列 $\rho$ と $i\in\{0,1,2,3\}$ に対し

$$
\mathcal R(E_iV\rho V^\dagger E_i^\dagger)
=V\rho V^\dagger.
$$

> さらに、CPTP雑音 $\mathcal N(\sigma)=\sum_kA_k\sigma A_k^\dagger$ の各Kraus作用素が $A_k=\sum_{i=0}^3a_{ki}E_i$ と書けるなら

$$
\mathcal R\circ\mathcal N(V\rho V^\dagger)
=V\rho V^\dagger
$$

> が成立する。右辺をCNOT復号すれば $\rho$ と補助状態 $|00\rangle\langle00|$ を得る。
<!-- formal-statement-end -->

### 証明の見取り図

四つの誤り $E_i$ は符号空間を**互いに直交する四つの二次元空間**へ写します。各枝を射影で分け、対応する $X_i$ を戻せばよいのです。誤りが振幅として重ね合わされていても、測定と補正の結果を足すと元の論理密度行列になります。

<!-- proof-start -->
### 証明

$\mathcal C$ は $\Pi_{+,+}$ の像です。syndrome表より $E_i\mathcal C$ は、それぞれ異なる $\Pi_{s,t}$ の像と一致します。$s_i,t_i$ を $E_i$ のsyndromeと書くと、任意の $|\psi_L\rangle\in\mathcal C$ に対して

$$
\Pi_{s,t}E_i|\psi_L\rangle
=\delta_{s,s_i}\delta_{t,t_i}E_i|\psi_L\rangle.
$$

補正は $F_{s_i,t_i}=E_i=E_i^\dagger$、$E_i^2=I$ です。純粋状態の外積に上式を左右から作用させると

$$
\mathcal R(E_i|\psi_L\rangle\langle\psi_L|E_i)
=E_iE_i|\psi_L\rangle\langle\psi_L|E_iE_i
=|\psi_L\rangle\langle\psi_L|.
$$

論理密度行列は[スペクトル分解](../QINF2/index.md#thm-qinf2-density-ensemble)によって純粋状態射影の非負和なので、線形性から第一の結論が従います。

次に $A_k=\sum_i a_{ki}E_i$ とし、$\sigma=V\rho V^\dagger=P\sigma P$ と置きます。$\Pi_{s,t}E_iP$ は、$(s,t)=(s_i,t_i)$ のときだけ $E_iP$ となり、それ以外では0です。四つの $i$ は異なるsyndromeを持つため、一つの枝 $(s,t)$ に対応する一意の $i$ を選ぶと

$$
\Pi_{s,t}A_k\sigma A_k^\dagger\Pi_{s,t}
=|a_{ki}|^2E_i\sigma E_i^\dagger
\quad\bigl((s,t)=(s_i,t_i)\bigr)
$$

となります。これは左右の射影が同じ $i$ だけを選び、$E_i\sigma E_j^\dagger$（$i\ne j$）の交差項を消すということです。枝ごとに $F_{s_i,t_i}=E_i$ を掛けて足すと

$$
\mathcal R(A_k\sigma A_k^\dagger)
=\sum_{i=0}^3|a_{ki}|^2\sigma.
$$

また $i\ne j$ なら $E_i^\dagger E_j\mathcal C$ は $\mathcal C$ と直交します。したがって

$$
PE_i^\dagger E_jP=\delta_{ij}P.
$$

雑音がCPTPなので [Krausの完全性](../QINF7/index.md#thm-qinf7-kraus-cptp) $\sum_kA_k^\dagger A_k=I$ を $P$ ではさみ、

$$
P=P\sum_kA_k^\dagger A_kP
=\left(\sum_{k,i}|a_{ki}|^2\right)P
$$

を得ます。$P\ne0$ なので係数和は1です。上の枝ごとの等式を $k$ について足せば第二の結論も得られます。

復号は、符号化に使ったCNOT二つの逆作用です。すなわち $U_{\mathrm{enc}}^\dagger V|\psi\rangle=|\psi\rangle|00\rangle$ が任意の $|\psi\rangle$ で成り立つため、密度行列でも $\rho\otimes|00\rangle\langle00|$ になります。
<!-- proof-end -->

これは四つの**誤り作用素の線形結合**に対する訂正を含みますが、$Z_i$ や $Y_i$ を含む任意の一量子ビット雑音を訂正するとは言っていません。何が訂正可能な誤り集合なのかを一般に判定する方法は次の講義で扱います。

## 5. 二重誤りは「一重誤りに見える」

独立に確率 $p$ で各ビットが反転する雑音では、三箇所の誤り列が $2^3=8$ 通りあります。単一誤りのsyndrome表だけを見ると二重誤りの扱いを見落としやすいので、例えば $X_1X_2$ を計算します。

$$
X_1X_2|000\rangle=|110\rangle,\qquad
X_1X_2|111\rangle=|001\rangle.
$$

パリティはどちらも $(+,-)$、つまり**単一の $X_3$ と同じsyndrome**です。補正 $X_3$ をかけると $X_1X_2X_3=X_L$ が残ります。三重誤り $X_1X_2X_3$ はsyndrome $(+,+)$ で見逃され、やはり $X_L$ を残します。

<a id="prop-qinf25-logical-noise"></a>

<!-- formal-statement-start -->
> **命題（独立ビット反転雑音による論理チャネル）**
> 各物理ビットが他と独立に確率 $p\in[0,1]$ で $X$ を受けるとする。符号化 $V$、[本章の回復](#def-qinf25-syndrome)、CNOT復号の後、論理密度行列には

$$
\rho\longmapsto(1-q)\rho+qX\rho X,
\qquad q=3p^2(1-p)+p^3=3p^2-2p^3
$$

> が作用する。従って訂正操作後にも論理 $X$ が残る確率は $q$ であり、$p$ が小さいとき $q$ は二次の大きさである。
<!-- formal-statement-end -->

### 証明の見取り図

誤り個数が0または1なら[完全訂正定理](#thm-qinf25-single-correction)で元の状態に戻ります。2ならsyndromeに従う補正後に $X_L$ が残り、3でも $X_L$ が残ります。確率を二項係数で数えます。

<!-- proof-start -->
### 証明

誤りが特定の $w$ 箇所に生じる確率は $p^w(1-p)^{3-w}$ です。$w=0$ は1通り、$w=1$ は3通りあり、いずれも回復後の物理作用は $\mathcal C$ 上で $I$ です。

$w=2$ は三組あり、例えば $X_1X_3$ のsyndromeは $X_2$ と同じなので、補正後は $X_2X_1X_3=X_L$ です。他の二組でも同じ結論です。$w=3$ は1通りで、$X_L$ は符号語を入れ替えるだけなのでsyndrome $(+,+)$ となり、補正なしで $X_L$ が残ります。

よって論理 $I$ 枝の確率は

$$
(1-p)^3+3p(1-p)^2=1-\{3p^2(1-p)+p^3\},
$$

論理 $X$ 枝の確率は $q=3p^2(1-p)+p^3$ です。両枝のKraus表示を合計し、$V^\dagger X_LV=X$ を用いれば、命題の論理チャネルが得られます。
<!-- proof-end -->

例えば $p=0.1$ では $q=3(0.01)-2(0.001)=0.028$ です。一方、$p=0.8$ では $q=0.896$ であり、繰り返し符号が有利というのは「物理誤りが十分少ない」という条件付きの主張です。訂正成功・失敗の確率と、任意の入力状態に対する忠実度を混同しないでください。論理 $X$ の固有状態 $|+\rangle$ なら、$X$ が残っても状態自体は変わりません。

### 位相反転を見逃す反例

$Z_1|000\rangle=|000\rangle$、$Z_1|111\rangle=-|111\rangle$ なので

$$
Z_1(\alpha|000\rangle+\beta|111\rangle)
=\alpha|000\rangle-\beta|111\rangle.
$$

元の状態もこの状態も $T_1=T_2=+1$ のままです。従ってパリティ測定はどちらも $(+,+)$ を返し、回復 $\mathcal R$ は $Z_1$ を打ち消せません。

単なる回復方法の失敗ではありません。次の二つの論理状態を考えます。

$$
|+_L\rangle=\frac{|000\rangle+|111\rangle}{\sqrt2},
\qquad
|-_L\rangle=\frac{|000\rangle-|111\rangle}{\sqrt2}.
$$

$Z_1|+_L\rangle=|-_L\rangle$ です。未知の $I$ と $Z_1$ の**双方**を完全訂正する復号があると仮定しましょう。入力 $|-_L\rangle$ の無誤り枝は $|-\rangle$ に、入力 $|+_L\rangle$ の $Z_1$ 枝は $|+\rangle$ に復号しなければなりません。

しかし復号器へ入る物理状態はどちらも同じ $|-_L\rangle$ です。一つのCPTP写像が同一の入力に異なる二つの出力を返すことはできません。**論理位相と区別できない誤り**が、この符号の限界です。

## 6. Hadamard基底に取り替えれば位相反転を訂正できる

ここまでの符号は $X$ を検出し、$Z$ を見逃しました。Hadamard作用素

$$
H=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\qquad H^2=I,\quad HXH=Z,\quad HZH=X
$$

を各量子ビットに作用させると、$X$ と $Z$ の役割が交換されます。$|+\rangle=H|0\rangle$、$|-\rangle=H|1\rangle$ と書きます。

<a id="def-qinf25-phase-code"></a>

<!-- formal-statement-start -->
> **定義（3量子ビット位相反転符号）**
> ビット反転符号の等長写像 $V$ に $H^{\otimes3}$ を作用させた

$$
W=H^{\otimes3}V,\qquad
W|0\rangle=|+++\rangle,\quad
W|1\rangle=|---\rangle
$$

> を位相反転反復符号とする。符号空間は $\mathcal C_{\mathrm{ph}}=W L$、その射影は $P_{\mathrm{ph}}=WW^\dagger$ である。検査作用素は $S_1=X_1X_2$、$S_2=X_2X_3$ とする。
<!-- formal-statement-end -->

元のビット符号の各物理量子ビットに $H$ を施しただけなので、$W^\dagger W=V^\dagger(H^\dagger H)^{\otimes3}V=I$ であり、二つの論理基底は直交・正規化されています。$U=H^{\otimes3}$ と置けば、符号空間の射影と検査作用素は次のように移ります。

$$
P_{\mathrm{ph}}=UPU,\qquad
UT_1U=S_1,\qquad UT_2U=S_2.
$$

[パリティ射影の分解](#prop-qinf25-projectors)より、元の $T_1=T_2=+1$ の同時固有空間は階数2で、$\mathcal C$ を張る $|000\rangle,|111\rangle$ で尽くされます。従って $U$ で移した $S_1=S_2=+1$ の同時固有空間も階数2で、$\mathcal C_{\mathrm{ph}}$ と一致します。

<!-- definition-example-start: def-qinf25-phase-code -->
**定義の確認**。$S_1|+++\rangle=|+++\rangle$ であり、$X|-\rangle=-|-\rangle$ を二箇所に掛けた符号は $(-1)^2=+1$ なので $S_1|---\rangle=|---\rangle$ です。$S_2$ についても同じです。従って $P_{\mathrm{ph}}$ は $S_1=S_2=+1$ の同時固有空間への射影であり、$Z_2|+++\rangle=|+-+\rangle$ は両検査で $-1$ を出します。
<!-- definition-example-end -->

<a id="thm-qinf25-phase-recovery"></a>

<!-- formal-statement-start -->
> **定理（Hadamard共役による位相反転訂正）**
> 位相反転符号 $W=H^{\otimes3}V$ に対し、二つの $X$ パリティ検査の射影

$$
\Pi^{\mathrm{ph}}_{s,t}
=\frac{I+sX_1X_2}{2}\frac{I+tX_2X_3}{2}
$$

> を測定し、syndrome $(+,+),(-,+),(-,-),(+,-)$ に応じてそれぞれ $I,Z_1,Z_2,Z_3$ を作用させる回復を $\mathcal R_{\mathrm{ph}}$ とする。任意の論理密度行列 $\rho$ と $j=0,1,2,3$（$Z_0=I$）について

$$
\mathcal R_{\mathrm{ph}}(Z_jW\rho W^\dagger Z_j^\dagger)
=W\rho W^\dagger.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$H^{\otimes3}$ で物理系全体の基底を変えると、$Z_j$ は $X_j$ に、$X$ パリティは $Z$ パリティに変わります。そのため[ビット反転の完全訂正定理](#thm-qinf25-single-correction)をHadamardで共役して適用できます。

<!-- proof-start -->
### 証明

$U=H^{\otimes3}=U^\dagger=U^{-1}$ とし、$X_0=I$ と約束します。$UZ_jU=X_j$（$j=0,1,2,3$）、$U(X_1X_2)U=Z_1Z_2$、$U(X_2X_3)U=Z_2Z_3$ です。従って $\Pi^{\mathrm{ph}}_{s,t}=U\Pi_{s,t}U$、syndromeごとの位相補正は $UF_{s,t}U$ です。全回復は

$$
\mathcal R_{\mathrm{ph}}(\sigma)
=U\,\mathcal R(U\sigma U)\,U.
$$

位相符号への雑音出力 $\sigma=Z_jU V\rho V^\dagger UZ_j$ を代入すると

$$
\begin{aligned}
\mathcal R_{\mathrm{ph}}(\sigma)
&=U\,\mathcal R(X_jV\rho V^\dagger X_j)\,U\\
&=UV\rho V^\dagger U
=W\rho W^\dagger.
\end{aligned}
$$

二つ目の等号に[単一ビット反転の完全訂正](#thm-qinf25-single-correction)を用いました。$j=0$ も同様です。
<!-- proof-end -->

位相符号の回路は「ビット符号のCNOT符号化 → 三箇所に $H$」です。復号ではまず三箇所に $H$ を施し、元のCNOT符号化を逆にします。syndrome測定の実装も、測定前後にデータへ $H^{\otimes3}$ を挟んで $Z$ パリティ抽出回路を使えます。

ただし今度は $X_j|+++\rangle=|+++\rangle$、$X_j|---\rangle=-|---\rangle$ となり、$X_j$ は論理位相反転です。検査 $X_1X_2,X_2X_3$ はこれを検出しません。**どちらの反復符号も単独では任意の $X$ と $Z$ の両方を訂正できない**ことを確認しておきましょう。

## 7. 演習

<a id="ex-qinf25-a01"></a>

### 演習 A1：符号化してから戻す

- Level: A
- 問題: 入力 $|\psi\rangle=(\sqrt3|0\rangle+i|1\rangle)/2$ と補助 $|00\rangle$ に、$\mathrm{CNOT}_{1\to2}$、$\mathrm{CNOT}_{1\to3}$ を順に作用させよ。符号語の正規化を確かめ、逆回路後の状態を求めよ。

<!-- solution-start -->
**詳細解答。** 入力のノルム二乗は $3/4+1/4=1$ です。一つ目のCNOTで

$$
\frac{\sqrt3}{2}|000\rangle+\frac i2|110\rangle
$$

となり、二つ目で

$$
|\psi_L\rangle=\frac{\sqrt3}{2}|000\rangle+\frac i2|111\rangle
$$

となります。二つの基底が直交するためノルム二乗はやはり1です。逆順に $\mathrm{CNOT}_{1\to3}$ をかけて $|110\rangle$ を戻し、$\mathrm{CNOT}_{1\to2}$ をかけると

$$
\left(\frac{\sqrt3}{2}|0\rangle+\frac i2|1\rangle\right)|00\rangle
$$

です。重ね合わせの係数 $i$ を含めて保存されています。
<!-- solution-end -->

<a id="ex-qinf25-a02"></a>

### 演習 A2：第2量子ビットが反転したとき

- Level: A
- 問題: 正規化された $|\psi_L\rangle=\alpha|000\rangle+\beta|111\rangle$ に $X_2$ が作用した。誤り後の状態、$T_1,T_2$ の固有値、syndromeの測定確率と補正後の状態を求めよ。

<!-- solution-start -->
**詳細解答。** $X_2$ は中央のビットだけを反転するので、誤り後は

$$
\alpha|010\rangle+\beta|101\rangle.
$$

$|010\rangle$ では二つの隣接ビットがともに不一致であり、$T_1,T_2$ の固有値は $(-,-)$ です。$|101\rangle$ でも同じなので、$\Pi_{-,-}$ が状態全体を保存し、他の射影は0を返します。確率は $|\alpha|^2+|\beta|^2=1$。補正 $X_2$ をもう一度かけると $\alpha|000\rangle+\beta|111\rangle$ に戻ります。
<!-- solution-end -->

<a id="ex-qinf25-a03"></a>

### 演習 A3：syndrome部分空間の階数

- Level: A
- 問題: 射影 $\Pi_{-,+}$ の像を計算基底で求めよ。また $\Pi_{-,+}\Pi_{+,-}=0$ と $\operatorname{Tr}\Pi_{-,+}=2$ を確かめよ。

<!-- solution-start -->
**詳細解答。** $(s,t)=(-,+)$ は $b_1\ne b_2$ かつ $b_2=b_3$ に対応します。条件を満たすビット列は $100,011$ のみであるため

$$
\Pi_{-,+}=|100\rangle\langle100|+|011\rangle\langle011|.
$$

一方 $(+,-)$ の基底列は $001,110$ であり、これら四つはすべて異なる直交ベクトルです。従って射影の積は0です。階数2の直交射影なので、基底に沿ったトレースは $1+1=2$ となります。
<!-- solution-end -->

<a id="ex-qinf25-a04"></a>

### 演習 A4：確率混合の完全回復

- Level: A
- 問題: 確率 $1-r$ で $I$、確率 $r$ で $X_1$ が作用するチャネル（$0\le r\le1$）に符号語 $V\rho V^\dagger$ を通す。二つの可能なsyndromeの確率と、回復後の密度行列を求めよ。

<!-- solution-start -->
**詳細解答。** 雑音後は

$$
\sigma=(1-r)V\rho V^\dagger+rX_1V\rho V^\dagger X_1.
$$

第一項は $\Pi_{+,+}$ の像に、第二項は $\Pi_{-,+}$ の像に支持を持ちます。$\operatorname{Tr}\rho=1$ なのでsyndrome $(+,+),(-,+)$ の確率はそれぞれ $1-r,r$、ほかは0です。第一枝の補正は $I$、第二枝は $X_1$ であり、

$$
\mathcal R(\sigma)
=(1-r)V\rho V^\dagger+rX_1^2V\rho V^\dagger X_1^2
=V\rho V^\dagger.
$$

位相を含む非対角成分も保存されます。
<!-- solution-end -->

<a id="ex-qinf25-b01"></a>

### 演習 B1：何を測ると論理情報が壊れるか

- Level: B
- 問題: $|+_L\rangle=(|000\rangle+|111\rangle)/\sqrt2$ について、(i) $T_1,T_2$ のsyndrome測定後の状態、(ii) 代わりに第1量子ビットの $Z_1$ を測定して結果を忘れた後の状態を求めよ。(iii) 両者の論理 $X_L=X_1X_2X_3$ の期待値を比較せよ。

<!-- solution-start -->
**詳細解答。** (i) $|000\rangle,|111\rangle$ とも $T_1=T_2=+1$ の同時固有ベクトルです。従ってsyndromeは必ず $(+,+)$ で、測定後も $|+_L\rangle\langle+_L|$ のままです。$X_L|+_L\rangle=|+_L\rangle$ より期待値は1です。

(ii) $Z_1$ の固有値 $+1$ は $|000\rangle$、$-1$ は $|111\rangle$ に対応し、各確率は $1/2$ です。結果を忘れると

$$
\sigma_Z=\tfrac12|000\rangle\langle000|
+\tfrac12|111\rangle\langle111|.
$$

(iii) $X_L$ は二つの基底を交換するため、その対角成分は0です。よって $\operatorname{Tr}(\sigma_ZX_L)=0$ です。パリティ測定は二つの論理基底の区別をつけず、$Z_1$ 測定は区別して相対位相を消します。
<!-- solution-end -->

<a id="ex-qinf25-b02"></a>

### 演習 B2：位相反転の訂正が不可能な理由

- Level: B
- 問題: ビット反転符号で $Z_3$ を作用させた $|+_L\rangle$ のsyndromeを求めよ。さらに、一つの復号器が $I$ と $Z_3$ の双方をすべての論理状態について完全訂正することが不可能であることを示せ。

<!-- solution-start -->
**詳細解答。** $Z_3|000\rangle=|000\rangle$、$Z_3|111\rangle=-|111\rangle$ なので

$$
Z_3|+_L\rangle=|-_L\rangle
=\frac{|000\rangle-|111\rangle}{\sqrt2}.
$$

どちらの状態も $T_1=T_2=+1$ の同時固有状態で、syndromeは $(+,+)$ です。

完全訂正を仮定し、復号器を $\mathcal D$ とします。無誤り枝で論理入力 $|-\rangle$ を正しく戻すためには

$$
\mathcal D(|-_L\rangle\langle-_L|)=|-\rangle\langle-|
$$

が必要です。一方、入力 $|+\rangle$ の $Z_3$ 枝も同じ物理密度行列 $|-_L\rangle\langle-_L|$ を与えるのに、完全訂正には出力 $|+\rangle\langle+|$ が必要です。異なる二つの出力を同じ入力に要求する矛盾です。これはsyndrome回復以外の復号器にも当てはまります。
<!-- solution-end -->

<a id="ex-qinf25-b03"></a>

### 演習 B3：誤りのコヒーレントな重ね合わせ

- Level: B
- 問題: $U_\theta=\cos\theta\,I+i\sin\theta\,X_1$（$\theta\in\mathbb R$）を物理三量子ビットへ作用させる。(i) $U_\theta$ がユニタリであることを示せ。(ii) 任意の符号語 $|\psi_L\rangle$ のsyndrome確率を求めよ。(iii) syndromeを測って補正した後の密度行列を求めよ。

<!-- solution-start -->
**詳細解答。** (i) $X_1^\dagger=X_1$、$X_1^2=I$ に注意すると

$$
U_\theta^\dagger U_\theta
=(\cos\theta\,I-i\sin\theta\,X_1)
(\cos\theta\,I+i\sin\theta\,X_1)
=(\cos^2\theta+\sin^2\theta)I=I.
$$

(ii) 誤り後の状態は

$$
\cos\theta|\psi_L\rangle+i\sin\theta X_1|\psi_L\rangle.
$$

両項は直交するsyndrome空間に属します。$\Pi_{+,+}$ の枝のノルム二乗は $\cos^2\theta$、$\Pi_{-,+}$ の枝は $\sin^2\theta$ で、他は0です。

(iii) 各枝の補正後、非規格化密度行列はそれぞれ $\cos^2\theta|\psi_L\rangle\langle\psi_L|$ と $\sin^2\theta|\psi_L\rangle\langle\psi_L|$ です。結果を忘れて足すと

$$
\mathcal R(U_\theta|\psi_L\rangle\langle\psi_L|U_\theta^\dagger)
=(\cos^2\theta+\sin^2\theta)|\psi_L\rangle\langle\psi_L|
=|\psi_L\rangle\langle\psi_L|.
$$

雑音が古典的混合でなくても、syndrome枝を分離して完全に回復できます。
<!-- solution-end -->

<a id="ex-qinf25-b04"></a>

### 演習 B4：位相符号の検査と残る弱点

- Level: B
- 問題: 位相反転符号 $W|0\rangle=|+++\rangle,W|1\rangle=|---\rangle$ に対して、(i) $Z_2$ 誤り後のsyndromeと補正、(ii) $X_1$ 誤り後のsyndromeと論理作用を求めよ。

<!-- solution-start -->
**詳細解答。** (i) $Z|+\rangle=|-\rangle$、$Z|-\rangle=|+\rangle$ なので

$$
Z_2(\alpha|+++\rangle+\beta|---\rangle)
=\alpha|+-+\rangle+\beta|-+-\rangle.
$$

$X|+\rangle=|+\rangle$、$X|-\rangle=-|-\rangle$ を使うと、この二つの状態で $X_1X_2$ と $X_2X_3$ の固有値がともに $-1$ です。syndromeは $(-,-)$、補正 $Z_2$ で元へ戻ります。

(ii) $X_1|+++\rangle=|+++\rangle$、$X_1|---\rangle=-|---\rangle$ なので、誤り後は $\alpha|+++\rangle-\beta|---\rangle$ です。どちらも検査固有値 $(+,+)$ のままであり、$X_1$ は位相符号上の論理 $Z$ として未検出です。
<!-- solution-end -->

<a id="ex-qinf25-c01"></a>

### 演習 C1：確率誤り・参照系・符号の選択

- Level: C
- 問題: 論理量子ビット $L$ と参照 $R$ を $|\Phi_2\rangle_{RL}=(|00\rangle+|11\rangle)/\sqrt2$ に準備し、$L$ をビット反転符号 $V$ で三つの物理量子ビットへ符号化する。次を順に考えよ。
  1. 各物理ビットが独立に確率 $p$ で $X$ を受けるとき、回復後の論理チャネルと論理反転確率 $q$ を求めよ。
  2. 復号後の $R,L$ の状態と、[QINF24のエンタングルメント忠実度](../QINF24/index.md#def-qinf24-entanglement-code) $F_e$ を求めよ。
  3. $p=1/10$ の値を、符号化しない一量子ビットの $X$ 雑音の忠実度と比較せよ。
  4. 今度は各物理ビットが独立に確率 $r$ で $Z$ を受けるとする。同じビット反転符号と回復ではsyndromeが何を返すか、論理 $Z$ が残る確率を求めよ。また位相反転符号へ変更すると、同じ $Z$ 雑音の論理誤り確率がどうなるか述べよ。

<!-- solution-start -->
**詳細解答。** 1. 誤りの個数が0または1なら[完全訂正定理](#thm-qinf25-single-correction)で戻ります。2個の場合は残り1個の反転と同じsyndromeになり、補正後に $X_L$ が残ります。3個もsyndrome $(+,+)$ で $X_L$ が残るため

$$
q=\binom32 p^2(1-p)+\binom33 p^3
=3p^2-2p^3.
$$

復号すれば論理チャネルは $\mathcal L_p(\rho)=(1-q)\rho+qX\rho X$ です。

2. 参照 $R$ には操作しないので、$R,L$ の出力は

$$
\omega_{RL}=(1-q)|\Phi_2\rangle\langle\Phi_2|
+q|\Psi_2\rangle\langle\Psi_2|,
\quad
|\Psi_2\rangle=\frac{|01\rangle+|10\rangle}{\sqrt2}.
$$

ここで $(I_R\otimes X_L)|\Phi_2\rangle=|\Psi_2\rangle$ で、$\langle\Phi_2|\Psi_2\rangle=(0+0)/2=0$ です。したがって

$$
F_e=\langle\Phi_2|\omega_{RL}|\Phi_2\rangle
=(1-q)\cdot1+q\cdot0=1-q.
$$

3. $p=1/10$ のとき $q=3/100-2/1000=28/1000$、従って $F_e=0.972$。符号化なしの単一量子ビット $X$ 雑音では、同じBell入力に対する忠実度は $1-p=0.9$ です。比較しているのは単一回の雑音、理想的な符号化・復号・syndrome回路という条件の下の忠実度です。

4. $Z_j$ は計算基底ビット列を変えないので、いくつ作用しても二つのパリティsyndromeは $(+,+)$ のままで、補正は $I$ です。

   $|000\rangle$ には常に符号 $+1$、$|111\rangle$ には $(-1)^w$ が付いています。ここで $w$ は位相反転箇所数です。奇数個の反転は論理 $Z$、偶数個なら論理 $I$ です。従って論理位相反転確率は

$$
r_{\mathrm{odd}}
=\binom31r(1-r)^2+\binom33r^3
=3r-6r^2+4r^3.
$$

符号を位相反転符号 $W=H^{\otimes3}V$ に変えると、[Hadamard共役による訂正定理](#thm-qinf25-phase-recovery)によって0個・1個の $Z$ 誤りが訂正され、2個・3個で論理反転が残ります。誤り確率は $3r^2(1-r)+r^3=3r^2-2r^3$ です。物理雑音の型に合う符号を選ぶ必要があります。
<!-- solution-end -->

## 8. まとめと次への問い

- 二つのCNOTによる等長符号化は、$\alpha|0\rangle+\beta|1\rangle$ を $\alpha|000\rangle+\beta|111\rangle$ に写し、相対位相を三量子ビットの相関に保存する。
- 二つのパリティを測れば、論理振幅を区別せずに一か所の $X$ 誤りの位置を特定できる。四つの射影と補正から全空間上のCPTP回復が作れる。
- 独立ビット反転では二重・三重誤りが論理 $X$ となるため、その確率は $3p^2-2p^3$。これは無条件の誤り訂正ではない。
- $Z$ 誤りはビット符号では論理位相と区別できない。全物理量子ビットのHadamard変換で位相反転符号を作れば、今度は一か所の $Z$ を訂正できる。

次は、**どの誤り作用素の集合を、どの符号空間が完全に訂正できるのか**を一般的に判定します。この章の四つの直交syndrome空間が、より一般の訂正条件を考える具体的な出発点になります。
