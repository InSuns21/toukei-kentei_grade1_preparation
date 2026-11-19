# BHI5 粗視化と精細エントロピー

<!-- definition-example-audit: strict -->

## 1. 「熱的な放射」と「情報が失われた」は同じ主張か

[BHI3の独立逐次対生成の定理](../BHI3/index.md#thm-bhi3-entropy-growth)では、各回の内外対が独立であると、放射の精細エントロピーが加算されました。一方、[BHI4のエネルギー収支](../BHI4/index.md#prop-bhi4-integrated-energy)は放出されたエネルギー量を与えますが、放射の全密度行列を決めません。エネルギーを失ったこと、各モードが熱的に見えること、全放射が混合状態であることは、それぞれ別の主張です。

本講では次の問いを分離します。

1. **精細エントロピー**：放射全体の密度行列を知っているとき、相関も含めてどれだけ混合しているか。
2. **局所情報による粗視化エントロピー**：各モードの縮約だけを残して、モード間の相関を忘れると、どれだけのエントロピーを割り当てるか。
3. **熱的基準エントロピー**：各モードについて平均エネルギーだけを指定し、Gibbs状態で置き換えると、どれだけのエントロピーになるか。

本講の数式は、有限個の有限次元モードの Hilbert 空間

$$
\mathcal H_R=\bigotimes_{i=1}^{n}\mathcal H_{R_i},
\qquad n\ge2,\qquad \dim\mathcal H_{R_i}<\infty
$$

で計算します。状態 $\rho_R$ は正半定値・跡1、$\rho_{R_i}=\operatorname{Tr}_{R\setminus R_i}\rho_R$ とします。エントロピーは自然対数で測り、$0\log0=0$ とします。[QINF17のvon Neumannエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)を $S(\rho)=-\operatorname{Tr}\rho\log\rho$ と書き、$S(R)=S(\rho_R)$ と略記します。局所状態と全体状態を取り違えないため、添字は「実際に残している系」を表します。

実際の場の連続モードをこの直積に正確に分けられるか、またエネルギーや紫外発散をどう正則化するかは別の問題です。以下の有限模型は「局所熱性から全体が混合状態かどうかを結論できるか」という論理を検査するためのものです。

## 2. 同じ二つの熱的モードから、三つの異なる全体状態ができる

エネルギーが $0,\varepsilon$（$\varepsilon>0$）の二準位モードを二つ取ります。逆温度 $\beta>0$ に対し、[BHI2の二準位Gibbs表示](../BHI2/index.md#prop-bhi2-gibbs)の重みを

$$
q=\frac{1}{1+e^{\beta\varepsilon}},\qquad
\gamma=\begin{pmatrix}1-q&0\\0&q\end{pmatrix},
\qquad 0<q<\frac12
$$

とします。$q$ は励起状態の確率です。二値エントロピーを

$$
h(q)=-(1-q)\log(1-q)-q\log q
$$

と書きます。全体を同じ周辺状態 $\gamma$ にする三つの方法を比較します。

$$
\begin{aligned}
|\Psi_q\rangle&=\sqrt{1-q}\,|00\rangle+\sqrt q\,|11\rangle,\\
\rho_{\rm pure}&=|\Psi_q\rangle\langle\Psi_q|,\\
\rho_{\rm class}&=(1-q)|00\rangle\langle00|+q|11\rangle\langle11|,\\
\rho_{\rm prod}&=\gamma\otimes\gamma.
\end{aligned}
$$

$\rho_{\rm pure}$ は位相のそろった純粋な重ね合わせ、$\rho_{\rm class}$ はその非対角成分を消した古典的相関、$\rho_{\rm prod}$ は相関のない積状態です。例えば純粋状態を行列にすれば、基底を $|00\rangle,|01\rangle,|10\rangle,|11\rangle$ の順にして

$$
\rho_{\rm pure}=
\begin{pmatrix}
1-q&0&0&\sqrt{q(1-q)}\\
0&0&0&0\\
0&0&0&0\\
\sqrt{q(1-q)}&0&0&q
\end{pmatrix}.
$$

ここで部分トレースの定義を成分で確認します。$A$ 側の行列要素は $(\rho_A)_{aa'}=\sum_{b=0}^1\langle ab|\rho_{AB}|a'b\rangle$ です。$\rho_{\rm pure}$ の $|00\rangle\langle11|$ は $b=0$ と $b=1$ を同時には満たさないため、$A$ 側へ縮約すると消えます。従って

$$
\operatorname{Tr}_B\rho_{\rm pure}
=\operatorname{Tr}_B\rho_{\rm class}
=\operatorname{Tr}_B\rho_{\rm prod}=\gamma.
$$

$B$ 側でも同じ結果です。しかし全体の非零固有値は順に $1$、$(1-q,q)$、$((1-q)^2,q(1-q),q(1-q),q^2)$ であり、

| 全体状態 | $S(A)$ | $S(B)$ | $S(AB)$ |
|---|---:|---:|---:|
| $\rho_{\rm pure}$ | $h(q)$ | $h(q)$ | $0$ |
| $\rho_{\rm class}$ | $h(q)$ | $h(q)$ | $h(q)$ |
| $\rho_{\rm prod}$ | $h(q)$ | $h(q)$ | $2h(q)$ |

となります。積状態の最後の値は[エントロピーのテンソル積加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)からも従います。

「各モードを単独で測ると同じ熱的状態」という事実だけでは、これら三行を区別できません。反例は $\beta=0$ という無限温度に限らず、**任意の有限の正の逆温度**で成立しています。ただし、この二モード純粋状態が現実の蒸発ダイナミクスによって生成されることを証明したわけではありません。

## 3. 相関を捨てたときに増えるエントロピー

各 $\rho_{R_i}$ が分かっていても、モード間の結合状態は一意には復元できません。そこで、既知の周辺状態を保ちながら相関を一切指定しない基準として、その**積状態を組み立てる**ことにします。この積を作る理由は、[テンソル積のエントロピー加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)を利用して、局所情報のみから算出できる量を得るためです。

<a id="def-bhi5-local-coarse"></a>

<!-- formal-statement-start -->
> **定義（局所周辺状態に基づく粗視化エントロピー）**
>
> 有限次元の $n\ge2$ 個の系 $R_i$ の全状態 $\rho_R$ とその各周辺状態 $\rho_{R_i}$ に対し、**局所積基準状態** $\sigma_{\rm loc}$ と**局所粗視化エントロピー** $S_{\rm loc}^{\rm coarse}(R)$ を

$$
\sigma_{\rm loc}:=\bigotimes_{i=1}^{n}\rho_{R_i},
\qquad
S_{\rm loc}^{\rm coarse}(R):=S(\sigma_{\rm loc})
=\sum_{i=1}^{n}S(\rho_{R_i})
$$

> と定める。**精細エントロピー**と、二つのエントロピーの差は

$$
S_{\rm fine}(R):=S(\rho_R),\qquad
\Delta_{\rm corr}(R):=S_{\rm loc}^{\rm coarse}(R)-S_{\rm fine}(R)
$$

> と書く。
>
> $\rho_R\mapsto\sigma_{\rm loc}$ は一般には非線形な**状態の割当て**であり、線形な量子チャネルと主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi5-local-coarse -->
**定義の確認**： 第2節で $q=1/4$、$\beta\varepsilon=\log3$ とすれば、三つの全体状態のいずれも周辺状態は $\gamma=\operatorname{diag}(3/4,1/4)$ です。したがって $\sigma_{\rm loc}=\gamma\otimes\gamma$ であり、非零固有値は $9/16,3/16,3/16,1/16$、正規化の和は $16/16=1$。よって $S_{\rm loc}^{\rm coarse}=2h(1/4)$ です。他方、$\rho_{\rm pure}$ では $S_{\rm fine}=0$、$\rho_{\rm class}$ では $S_{\rm fine}=h(1/4)$、$\rho_{\rm prod}$ では $S_{\rm fine}=2h(1/4)$。この例は同じ局所値から粗視化値は同じでも、精細値は変わることを実際に示しています。
<!-- definition-example-end -->

どの縮約情報を残すかを変更すると、粗視化の定義自体が変わります。例えば対 $(R_1R_2)$ の**共同**密度行列まで保持する場合は、単一モードだけの積基準とは異なる条件になります。この意味で「粗視化エントロピー」は、何を捨てたかの指定なしには一意の量ではありません。

<a id="thm-bhi5-correlation-gap"></a>

<!-- formal-statement-start -->
> **定理（局所粗視化と相関欠損の恒等式）**
>
> $n\ge2$ 個の有限次元系の任意の密度演算子 $\rho_R$ に対し、上の[局所粗視化エントロピー](#def-bhi5-local-coarse)は

$$
\boxed{\Delta_{\rm corr}(R)
=\sum_{j=2}^{n}I(R_1\cdots R_{j-1}:R_j)\ge0}
$$

> を満たす。ここで $I(A:B)=S(A)+S(B)-S(AB)$ は[QINF18の量子相互情報量](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)である。特に $\Delta_{\rm corr}(R)=0$ と $\rho_R=\bigotimes_i\rho_{R_i}$ は同値である。二モードの場合は $\Delta_{\rm corr}(AB)=I(A:B)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

一モードを加えるたびに $S(R_1\cdots R_{j-1})+S(R_j)-S(R_1\cdots R_j)$ を差し引きます。中間の共同エントロピーが望ましい形で相殺され、各差は部分加法性によって非負です。等号の議論では、二部状態が積状態となるための条件を各段階で使います。

<!-- proof-start -->
### 証明

$R_{1:j}=R_1\cdots R_j$ とし、$S_j=S(R_{1:j})$、$s_j=S(R_j)$ とおきます。$S_1=s_1$ です。[QINF18の相互情報量の定義](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)を $A=R_{1:j-1}, B=R_j$ に適用すると

$$
I(R_{1:j-1}:R_j)=S_{j-1}+s_j-S_j.
$$

$j=2$ から $n$ まで足せば、共同エントロピーについて

$$
\begin{aligned}
\sum_{j=2}^{n}I(R_{1:j-1}:R_j)
&=\sum_{j=2}^{n}(S_{j-1}-S_j)+\sum_{j=2}^{n}s_j\\
&=S_1-S_n+\sum_{j=2}^{n}s_j\\
&=\sum_{j=1}^{n}s_j-S(\rho_R)=\Delta_{\rm corr}(R).
\end{aligned}
$$

各項は[部分加法性と等号条件](../../../応用系/QINF/QINF18/index.md#thm-qinf18-subadditivity)を、まさに二部系 $(R_{1:j-1},R_j)$ に適用して非負です。

和が零なら非負な各項が零なので、同じ等号条件から $\rho_{R_{1:j}}=\rho_{R_{1:j-1}}\otimes\rho_{R_j}$ が各 $j=2,\ldots,n$ で成立します。$j=2$ から順に代入すると $\rho_{R_{1:j}}=\bigotimes_{i=1}^{j}\rho_{R_i}$ となり、$j=n$ で積状態です。逆に初めから積状態なら[テンソル積加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)より $S(\rho_R)=\sum_i S(\rho_{R_i})$ で差は零です。
<!-- proof-end -->

第2節へ適用すると、純粋状態の相互情報量は $2h(q)$、古典相関状態は $h(q)$、積状態は零です。「粗視化したらエントロピーが増えた」は、**相関を忘れたことによる情報量の差**であって、実状態が時間とともに不可逆に変化した証拠ではありません。

## 4. 「各モードが熱的」という仮定をさらに弱める

局所モードの全密度行列さえ知らず、各モードの平均エネルギーだけ分かる場合があります。有限次元自己共役 Hamiltonian $H_i$ と有限の実数 $\beta_i$ に対し、$Z_i=\operatorname{Tr}e^{-\beta_iH_i}>0$、$\gamma_i=e^{-\beta_iH_i}/Z_i$ とします。有限次元なので $\gamma_i$ は正定値です。

次に、局所粗視化と**異なる**基準を定義します。$\beta_i$ は参照用 Gibbs 状態を指定する入力であり、全放射が実際に熱平衡にあることを意味しません。

<a id="def-bhi5-thermal-reference"></a>

<!-- formal-statement-start -->
> **定義（局所Gibbs基準の熱的エントロピー）**
>
> $R=\bigotimes_{i=1}^nR_i$ が有限次元で、各モードの自己共役 Hamiltonian $H_i$ と有限の実数 $\beta_i$ を指定する。$Z_i=\operatorname{Tr}e^{-\beta_iH_i}$ および $\gamma_i=Z_i^{-1}e^{-\beta_iH_i}$ に対し、

$$
S_{\rm thermal}^{\rm ref}(R)
:=\sum_{i=1}^{n}S(\gamma_i)
=\sum_{i=1}^{n}\left(\beta_i\operatorname{Tr}(\gamma_iH_i)+\log Z_i\right)
$$

> と定める。これは指定した局所 Hamiltonian・逆温度に関する**参照量**であり、実状態の $S_{\rm fine}(R)$ とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi5-thermal-reference -->
**定義の確認**： $H_i=\varepsilon|1\rangle\langle1|$、$\beta_i\varepsilon=\log3$ の場合、$Z_i=1+e^{-\log3}=4/3>0$、$\gamma_i=\operatorname{diag}(3/4,1/4)$ です。$\operatorname{Tr}(\gamma_iH_i)=\varepsilon/4$ なので

$$
S(\gamma_i)=\frac14\log3+\log\frac43
=-\frac34\log\frac34-\frac14\log\frac14=h(1/4).
$$

二モードなら $S_{\rm thermal}^{\rm ref}=2h(1/4)$。第2節の三状態はすべてこの値を共有します。
<!-- definition-example-end -->

局所状態 $\rho_{R_i}$ が $\gamma_i$ と一致する場合は $S_{\rm thermal}^{\rm ref}=S_{\rm loc}^{\rm coarse}$ です。しかし平均エネルギーだけが等しい場合、局所状態そのものが Gibbs とは限りません。ここで必要になるのは、[QINF20の相対エントロピーの非負性](../../../応用系/QINF/QINF20/index.md#prop-qinf20-nonnegative)です。

<a id="prop-bhi5-entropy-hierarchy"></a>

<!-- formal-statement-start -->
> **命題（精細・局所粗視化・熱的基準の階層）**
>
> 上の有限次元系で、各 $i$ について実状態と参照 Gibbs 状態の平均エネルギーが一致すると仮定する。

$$
\operatorname{Tr}(\rho_{R_i}H_i)
=\operatorname{Tr}(\gamma_iH_i).
$$

> このとき

$$
\boxed{
S_{\rm fine}(R)\le S_{\rm loc}^{\rm coarse}(R)
\le S_{\rm thermal}^{\rm ref}(R)
}
$$

> であり、全体の差には次の正確な分解がある。

$$
\boxed{
S_{\rm thermal}^{\rm ref}(R)-S_{\rm fine}(R)
=\Delta_{\rm corr}(R)
+\sum_{i=1}^{n}D(\rho_{R_i}\Vert\gamma_i).
}
$$

> $D$ は[量子相対エントロピー](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)。左側の等号成立には、実状態が $\rho_R=\bigotimes_i\gamma_i$ であることが必要十分である。
<!-- formal-statement-end -->

### 証明の見取り図

最初の不等式は第3節で証明済みです。次は「Gibbs状態が、同じエネルギーの状態の中でエントロピーを最大化する」を相対エントロピーから式で確かめます。差を二つに分けると、相関を忘れた分と局所状態を熱平衡へ置き換えた分が明瞭になります。

<!-- proof-start -->
### 証明

各 $\gamma_i$ は正定値なので、$\rho_{R_i}$ に零固有値があっても相対エントロピーは有限です。$\log\gamma_i=-\beta_iH_i-\log Z_i\,\mathbf 1$ を[相対エントロピーの定義](../../../応用系/QINF/QINF20/index.md#def-qinf20-relative-entropy)へ代入すると

$$
\begin{aligned}
D(\rho_{R_i}\Vert\gamma_i)
&=\operatorname{Tr}\rho_{R_i}\log\rho_{R_i}
-\operatorname{Tr}\rho_{R_i}\log\gamma_i\\
&=-S(\rho_{R_i})
+\beta_i\operatorname{Tr}(\rho_{R_i}H_i)
+\log Z_i.
\end{aligned}
$$

平均エネルギー一致の仮定と $S(\gamma_i)=\beta_i\operatorname{Tr}(\gamma_iH_i)+\log Z_i$ により

$$
D(\rho_{R_i}\Vert\gamma_i)=S(\gamma_i)-S(\rho_{R_i})\ge0.
$$

最後の非負性および $D=0\iff\rho_{R_i}=\gamma_i$ は[QINF20の非負性と等号条件](../../../応用系/QINF/QINF20/index.md#prop-qinf20-nonnegative)です。これを $i$ で足して

$$
S_{\rm thermal}^{\rm ref}-S_{\rm loc}^{\rm coarse}
=\sum_iD(\rho_{R_i}\Vert\gamma_i)\ge0
$$

を得ます。第3節の[相関欠損の定理](#thm-bhi5-correlation-gap)を加えると二つの不等式と差の分解が成立します。左端と右端が等しいなら、非負な二項 $\Delta_{\rm corr}$ と $\sum_iD$ がともに零です。前者の等号条件より $\rho_R=\bigotimes_i\rho_{R_i}$、後者よりすべて $\rho_{R_i}=\gamma_i$ です。逆向きは直接代入で確認できます。
<!-- proof-end -->

**重要な停止条件。** エネルギー一致を外すと $\sum_iD$ は依然として非負ですが、$D(\rho_i\Vert\gamma_i)=S(\gamma_i)-S(\rho_i)+\beta_i(E_{\rho_i}-E_{\gamma_i})$ です。従って指定した別の温度の Gibbs 状態のエントロピーが、無条件に実状態のエントロピーを上から抑えるとは言えません。

## 5. 熱的スペクトルだけでは測れない相関

第2節の純粋状態と古典混合状態は、単一モードの密度行列どころか、各局所エネルギー $H=\varepsilon|1\rangle\langle1|$ の確率分布まで一致します。それでも**二モードを同時に測る**と区別できます。

例えば $X=|0\rangle\langle1|+|1\rangle\langle0|$ とすると、$X\otimes X$ は $|00\rangle$ と $|11\rangle$ を交換します。そのため

$$
\langle\Psi_q|X\otimes X|\Psi_q\rangle
=2\sqrt{q(1-q)},\qquad
\operatorname{Tr}\rho_{\rm class}(X\otimes X)
=\operatorname{Tr}\rho_{\rm prod}(X\otimes X)=0.
$$

最初の式は、$X\otimes X|\Psi_q\rangle=\sqrt{1-q}|11\rangle+\sqrt q|00\rangle$ を左の状態に内積させれば得られます。他の二状態は計算基底で対角的であり、$X\otimes X$ の対角成分は零です。**単一モードの熱スペクトルから、多モード相関を復元することはできません。**

また、各周辺状態を掛け合わせる割当ては、時間発展でも物理的雑音でもありません。例えば $\rho_0=|00\rangle\langle00|$ と $\rho_1=|11\rangle\langle11|$ はどちらも積状態なので、それぞれの局所積基準は元の状態です。しかし $\rho=(\rho_0+\rho_1)/2$ の局所積基準は $I_4/4$ となり、$\rho$ とは異なります。これは割当ての非線形性を直接示します。

この区別は[BHI3の局所混合と非単調性の命題](../BHI3/index.md#prop-bhi3-local-global-nonmonotone)に現れた論理を、相互情報量で定量化するものです。**相関は観測対象を増やしたときに初めて見える**のであって、局所スペクトルの熱性が崩れる必要はありません。

## 6. ブラックホールの面積エントロピーとの違い

[BHI4の準静的面積エントロピーの減少率](../BHI4/index.md#prop-bhi4-horizon-entropy-rate)は、Schwarzschild近似の下で $S_{\rm BH}(M)=4\pi M^2$ の時間変化を与えます。しかし上で定義した三種類の放射エントロピーと $S_{\rm BH}$ は、**数えている対象が異なります**。

| 記号 | 入力として要るもの | 何を測るか |
|---|---|---|
| $S_{\rm fine}(R)$ | 放射領域全体の $\rho_R$ | 放射全体がどの程度混合状態にあるか |
| $S_{\rm loc}^{\rm coarse}(R)$ | 各モードの $\rho_{R_i}$、分割の選択 | 相関を捨てた基準エントロピー |
| $S_{\rm thermal}^{\rm ref}(R)$ | $H_i,\beta_i$ と必要なら平均エネルギー一致 | 局所熱平衡を仮定した参照値 |
| $S_{\rm BH}(M)$ | 定常Schwarzschild幾何の質量と面積則 | 地平線の熱力学的エントロピー |

放射を理想黒体として扱ったエントロピー流も、追加した熱力学的近似に依存します。それを積分した量を、全放射の $S_{\rm fine}(R)$ と同一視できません。灰色体因子・放出種・相関・時刻ごとの領域分割・紫外正則化が必要です。

特に本講の二モード反例だけで、蒸発後の放射が純粋になるという実際の力学的結論は出ません。一方、「各放出モードが熱的に見えるから、終期の放射全体も混合でなければならない」という推論は、この反例によって否定されます。次講では残存ブラックホール $B$ と放射 $R$ の全体系を固定し、**ユニタリな蒸発**を仮定したときにエントロピーへどのような制約が生じるかを検討します。

## 7. 演習と詳細解答

### Level A：周辺状態と全体エントロピーの違い

<a id="ex-bhi5-a01"></a>
#### BHI5-A01 二つの独立な熱的モード
- Level: A

$q=1/4$、$\gamma=\operatorname{diag}(1-q,q)$、$\rho=\gamma\otimes\gamma$ とする。$\rho$ の固有値、$S_{\rm fine}(AB)$、$S_{\rm loc}^{\rm coarse}(AB)$、$I(A:B)$ を求めよ。

<!-- solution-start -->
**詳細解答**

積の計算基底では $\rho$ は対角行列で、固有値は $(1-q)^2=9/16$、$q(1-q)=3/16$ が二回、$q^2=1/16$ です。各局所縮約は $\gamma$ なので $S(A)=S(B)=h(1/4)$。[テンソル積加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)により

$$
S_{\rm fine}(AB)=S(\gamma\otimes\gamma)
=S(\gamma)+S(\gamma)=2h(1/4).
$$

[局所粗視化の定義](#def-bhi5-local-coarse)でも $S_{\rm loc}^{\rm coarse}=S(A)+S(B)=2h(1/4)$。従って[相互情報量](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)は $I(A:B)=h(1/4)+h(1/4)-2h(1/4)=0$ です。
<!-- solution-end -->

<a id="ex-bhi5-a02"></a>
#### BHI5-A02 熱的な周辺状態を持つ純粋対
- Level: A

$q=1/4$、$|\Psi\rangle=\sqrt{3/4}|00\rangle+\sqrt{1/4}|11\rangle$ とする。部分トレースを成分で行い、$S_{\rm fine}(AB)$、$S_{\rm loc}^{\rm coarse}(AB)$、$I(A:B)$ を求めよ。

<!-- solution-start -->
**詳細解答**

$\rho=|\Psi\rangle\langle\Psi|$ の $|00\rangle\langle11|$ と $|11\rangle\langle00|$ は、$B$ でトレースすると $\langle1|0\rangle=\langle0|1\rangle=0$ で消えます。残る対角項から

$$
\rho_A=\rho_B=\frac34|0\rangle\langle0|+\frac14|1\rangle\langle1|.
$$

$\rho$ 自身は階数1の射影で、固有値は $(1,0,0,0)$ です。従って $S_{\rm fine}(AB)=0$、各周辺の固有値は $(3/4,1/4)$ で $S(A)=S(B)=h(1/4)$。よって $S_{\rm loc}^{\rm coarse}=2h(1/4)$、$I(A:B)=2h(1/4)$。局所的な熱性と全体純粋性は両立します。
<!-- solution-end -->

<a id="ex-bhi5-a03"></a>
#### BHI5-A03 古典相関はどれだけの情報を持つか
- Level: A

$q=1/4$、$\rho_{\rm class}=(1-q)|00\rangle\langle00|+q|11\rangle\langle11|$ とする。全体と周辺の固有値を挙げ、相関欠損を計算せよ。

<!-- solution-start -->
**詳細解答**

全体の固有値は $(3/4,1/4,0,0)$、どちらの周辺も $(3/4,1/4)$ です。[von Neumannエントロピーの定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)より $S_{\rm fine}(AB)=h(1/4)$、$S(A)=S(B)=h(1/4)$。従って

$$
\Delta_{\rm corr}=S(A)+S(B)-S(AB)
=2h(1/4)-h(1/4)=h(1/4)>0.
$$

これは第2節の純粋対における $2h(1/4)$ より小さく、同じ周辺状態でも共同の相関が異なることを表します。
<!-- solution-end -->

<a id="ex-bhi5-a04"></a>
#### BHI5-A04 Gibbs状態の温度とエントロピー
- Level: A

$H=\varepsilon|1\rangle\langle1|$、$\varepsilon>0$、$\beta\varepsilon=\log3$ とする。$Z$、$\gamma$、$E=\operatorname{Tr}(\gamma H)$、$S(\gamma)$ を求め、$S(\gamma)=\beta E+\log Z$ を両側から確認せよ。

<!-- solution-start -->
**詳細解答**

エネルギー固有値 $0,\varepsilon$ から

$$
Z=e^0+e^{-\beta\varepsilon}=1+\frac13=\frac43,\qquad
\gamma=\frac1Z\operatorname{diag}(1,1/3)
=\operatorname{diag}(3/4,1/4).
$$

従って $E=0\cdot3/4+\varepsilon\cdot1/4=\varepsilon/4$。固有値から $S(\gamma)=-(3/4)\log(3/4)-(1/4)\log(1/4)$、すなわち $h(1/4)$。一方

$$
\beta E+\log Z=\frac{\log3}{4}+\log\frac43
=\log4-\frac34\log3=h(1/4).
$$

両者は一致します。$S(\gamma)$ は指定した一モードの Gibbs エントロピーであり、二モードの全体状態はまだ決めていません。
<!-- solution-end -->

<a id="ex-bhi5-a05"></a>
#### BHI5-A05 積基準への割当ては線形か
- Level: A

$\rho_0=|00\rangle\langle00|$、$\rho_1=|11\rangle\langle11|$、$\rho=(\rho_0+\rho_1)/2$ とする。局所積基準を作る割当てを $\mathcal C$ と記し、$\mathcal C(\rho)$ と $(\mathcal C(\rho_0)+\mathcal C(\rho_1))/2$ を比較せよ。

<!-- solution-start -->
**詳細解答**

$\rho_0,\rho_1$ はともに積状態なので $\mathcal C(\rho_0)=\rho_0$、$\mathcal C(\rho_1)=\rho_1$ です。他方

$$
\operatorname{Tr}_B\rho=\operatorname{Tr}_A\rho
=\frac12(|0\rangle\langle0|+|1\rangle\langle1|)
=\frac{I_2}{2}.
$$

従って $\mathcal C(\rho)=(I_2/2)\otimes(I_2/2)=I_4/4$ ですが、$(\mathcal C(\rho_0)+\mathcal C(\rho_1))/2=\rho$ で、これは $|01\rangle,|10\rangle$ 成分が零です。例えば $\langle01|I_4/4|01\rangle=1/4$ と $\langle01|\rho|01\rangle=0$ は異なります。よって $\mathcal C$ は線形でなく、量子チャネルとは言えません。
<!-- solution-end -->

### Level B：相関欠損と熱的上界を自力で再構成する

<a id="ex-bhi5-b01"></a>
#### BHI5-B01 三モードGHZの二種類の相関
- Level: B

$|G\rangle=(|000\rangle+|111\rangle)/\sqrt2$、$\rho_G=|G\rangle\langle G|$、$\rho_C=(|000\rangle\langle000|+|111\rangle\langle111|)/2$ を考える。それぞれについて $S(R_i)$、$S(R_1R_2)$、$S(R_1R_2R_3)$ を求め、$\Delta_{\rm corr}$ と $I(R_1:R_2)+I(R_1R_2:R_3)$ が一致することを確かめよ。

<!-- solution-start -->
**詳細解答**

両状態を任意の一系で部分トレースすると、オフ対角成分は他の系の直交性で消え、$\rho_{R_i}=I_2/2$ となります。従って $S(R_i)=\log2$ が三つあります。また $R_3$ をトレースすると、どちらの状態も

$$
\rho_{R_1R_2}=\frac12|00\rangle\langle00|
+\frac12|11\rangle\langle11|
$$

で固有値 $(1/2,1/2,0,0)$、$S(R_1R_2)=\log2$ です。全体は $\rho_G$ が純粋なので $S(R_1R_2R_3)=0$、$\rho_C$ は二つの直交状態の等確率混合なので $\log2$。

従って $\Delta_{\rm corr}(\rho_G)=3\log2-0=3\log2$、$\Delta_{\rm corr}(\rho_C)=3\log2-\log2=2\log2$。連鎖の各項を[相互情報量の定義](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)から計算すると、共通して $I(R_1:R_2)=\log2+\log2-\log2=\log2$ です。第2項は $\rho_G$ で $\log2+\log2-0=2\log2$、$\rho_C$ で $\log2+\log2-\log2=\log2$。それぞれの和は上の欠損と一致します。
<!-- solution-end -->

<a id="ex-bhi5-b02"></a>
#### BHI5-B02 位相相関を連続的に失わせる
- Level: B

$0<q<1/2$、$0\le\lambda\le1$ とし、第2節の $\rho_{\rm pure}$、$\rho_{\rm class}$ から $\rho_\lambda=\lambda\rho_{\rm pure}+(1-\lambda)\rho_{\rm class}$ を作る。局所粗視化値が $\lambda$ に依存しないこと、全体の非零固有値、$\lambda=0,1$ のエントロピーを示せ。

<!-- solution-start -->
**詳細解答**

両状態の縮約はともに $\gamma$ であり、部分トレースは線形なので $\rho_{\lambda,A}=\rho_{\lambda,B}=\gamma$ です。従って局所粗視化値は常に $2h(q)$。

$\rho_\lambda$ は $|00\rangle,|11\rangle$ の張る二次元部分空間に台を持ち、その基底での行列は

$$
K_\lambda=
\begin{pmatrix}
1-q&\lambda\sqrt{q(1-q)}\\
\lambda\sqrt{q(1-q)}&q
\end{pmatrix}.
$$

跡は1、行列式は $q(1-q)-\lambda^2q(1-q)=q(1-q)(1-\lambda^2)$。固有方程式 $x^2-x+q(1-q)(1-\lambda^2)=0$ を解くと

$$
x_\pm=\frac{1\pm\sqrt{(1-2q)^2+4\lambda^2q(1-q)}}2.
$$

残り二つの固有値は零です。$\lambda=0$ なら $x_+=1-q,x_-=q$ なので $S_{\rm fine}=h(q)$、$\lambda=1$ なら平方根は1となり $x_+=1,x_-=0$ なので $S_{\rm fine}=0$。$\lambda$ を変えても局所の熱性は変わらず、共同の位相相関に関する情報だけが変わります。
<!-- solution-end -->

<a id="ex-bhi5-b03"></a>
#### BHI5-B03 平均エネルギーが一致しても Gibbs 状態とは限らない
- Level: B

三準位系 $H=\operatorname{diag}(0,\varepsilon,2\varepsilon)$、$\varepsilon>0$、$\beta=0$ を考える。参照状態 $\gamma=I_3/3$ と $\rho=\operatorname{diag}(1/2,0,1/2)$ の平均エネルギーを比べ、エントロピー差と $D(\rho\Vert\gamma)$ を直接求めよ。

<!-- solution-start -->
**詳細解答**

$\gamma$ の平均エネルギーは $(0+\varepsilon+2\varepsilon)/3=\varepsilon$。$\rho$ では $0\cdot1/2+\varepsilon\cdot0+2\varepsilon\cdot1/2=\varepsilon$ で一致します。$\gamma$ は三つの固有値が $1/3$ なので $S(\gamma)=\log3$、$\rho$ の非零固有値は $1/2$ が二つなので $S(\rho)=\log2$。

$\gamma$ は正定値、$\log\gamma=-(\log3)I_3$ ですから

$$
D(\rho\Vert\gamma)
=\operatorname{Tr}\rho\log\rho-\operatorname{Tr}\rho\log\gamma
=-\log2+\log3=\log\frac32.
$$

これは $S(\gamma)-S(\rho)$ と一致し、正です。平均エネルギーが同じでも局所状態が Gibbs に等しいとは限りません。
<!-- solution-end -->

<a id="ex-bhi5-b04"></a>
#### BHI5-B04 相関欠損と局所的な非熱性を分離する
- Level: B

$A$ は三準位、$B$ は二準位とする。$H_A=\operatorname{diag}(0,\varepsilon,2\varepsilon)$、$H_B=\operatorname{diag}(0,\varepsilon)$、$\varepsilon>0$、両方の参照逆温度を零とする。$\rho_A=\operatorname{diag}(1/2,0,1/2)$、$\rho_B=I_2/2$、$\rho_{AB}=\rho_A\otimes\rho_B$ のとき、三種類のエントロピー、$\Delta_{\rm corr}$、局所相対エントロピーの和を求めよ。

<!-- solution-start -->
**詳細解答**

参照状態は $\gamma_A=I_3/3$、$\gamma_B=I_2/2$。$A$ の平均エネルギーは実状態も参照状態も $\varepsilon$、$B$ はどちらも $\varepsilon/2$ です。固有値から $S(\rho_A)=\log2$、$S(\rho_B)=\log2$、$S(\gamma_A)=\log3$、$S(\gamma_B)=\log2$ と求まります。

実状態は積なので[テンソル積加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)から $S_{\rm fine}(AB)=2\log2$、定義から $S_{\rm loc}^{\rm coarse}(AB)=2\log2$、熱的参照値は $S_{\rm thermal}^{\rm ref}=\log3+\log2$ です。

従って $\Delta_{\rm corr}=0$。一方 $D(\rho_A\Vert\gamma_A)=\log(3/2)$ は前問の計算、$D(\rho_B\Vert\gamma_B)=0$ なので和は $\log(3/2)$。実際

$$
(\log3+\log2)-2\log2
=\log\frac32=0+\log\frac32.
$$

熱的参照値との差はこの例では相関ではなく、$A$ の局所非熱性だけから来ます。
<!-- solution-end -->

### Level C：蒸発模型へ移す際の論理を検査する

<a id="ex-bhi5-c01"></a>
#### BHI5-C01 最後の一モードを放射に加えたら何が変わるか
- Level: C

三量子ビット $R_1,R_2,B$ の閉じた状態を $|\Omega\rangle=(|000\rangle+|111\rangle)/\sqrt2$ とする。時刻 $u_1$ では $R=R_1R_2$ を放射、$B$ を残存系と呼ぶ。時刻 $u_2$ には第三の系を放射 $R_3$ として回収したとし、三系全体の状態は同じ純粋状態であると仮定する（移送以外の力学的主張はしない）。

(a) $u_1$ における $\rho_R$、$S_{\rm fine}(R)$、$S_{\rm loc}^{\rm coarse}(R)$ と、残存系の $S(B)$ を求めよ。(b) $u_2$ における全放射の精細・局所粗視化エントロピーを求めよ。(c) 各モードが両時刻とも最大混合に見えるのに、(a)(b) が両立する理由を、実際の縮約と相関を使って説明せよ。(d) この計算だけでは一般のブラックホール蒸発について何が証明できないか二点挙げよ。

<!-- solution-start -->
**詳細解答**

(a) $u_1$ では $B$ を部分トレースします。$|00\rangle_{R_1R_2}|0\rangle_B$ と $|11\rangle_{R_1R_2}|1\rangle_B$ の交差項には $\langle0|1\rangle_B=0$ が掛かるため

$$
\rho_R(u_1)
=\frac12|00\rangle\langle00|
+\frac12|11\rangle\langle11|.
$$

固有値は $(1/2,1/2,0,0)$ なので $S_{\rm fine}(R;u_1)=\log2$。各放射モードは $I_2/2$ なので $S_{\rm loc}^{\rm coarse}(R;u_1)=2\log2$、相関欠損は $\log2$。$R_1R_2$ をトレースした残存系も $I_2/2$ だから $S(B;u_1)=\log2$ です。この一致は[純粋二部状態の縮約エントロピー一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)にも合います。

(b) $u_2$ に全放射として $R_1R_2R_3$ を保持すると、全状態は $|\Omega\rangle\langle\Omega|$ で固有値が $(1,0,\ldots,0)$ となり $S_{\rm fine}(R;u_2)=0$ です。任意の一モードの縮約は依然として $I_2/2$ だから $S_{\rm loc}^{\rm coarse}(R;u_2)=3\log2$、相関欠損は $3\log2$。

(c) 局所縮約は全時刻を通じて $I_2/2$ ですが、保持する全体系が $R_1R_2$ から $R_1R_2R_3$ に変わりました。$u_1$ で捨てた第三系との交差項は全放射を保持する $u_2$ では消えません。$u_1$ の放射内相互情報量は $I(R_1:R_2)=\log2$、$u_2$ の三系の相関欠損は $3\log2$ です。どの系のエントロピーを測るかが計算結果を変えます。

(d) この状態は仮定として与えられた有限次元純粋状態であり、Hawking過程がその状態を生成することも、地平線内部と外部がいつどのように対応することも証明していません。また質量・エネルギー収支、灰色体因子、連続場の正則化、蒸発終期での量子重力の妥当性も計算していません。局所熱性から最終混合性を**論理的に推論できない**ことと、具体的な蒸発がユニタリであることを証明したことは別です。
<!-- solution-end -->

## 8. まとめと次の問い

本講で計算した有限模型では、各モードが厳密な Gibbs 状態でも、全体は純粋、古典相関を持つ混合、無相関な混合のいずれにもなれます。局所粗視化と精細エントロピーの差は相互情報量の連鎖で測れ、平均エネルギーのみの Gibbs 基準を使うなら、差に局所相対エントロピーが追加されます。

次のBHI6「ユニタリ蒸発のエントロピー制約」では、残存系 $B$ と放射 $R$ の共同状態の純粋性を時刻ごとに仮定し、$S(R)=S(B)$ と次元上界からどこまでを論理的に導けるかを検討します。現段階では Page 曲線を結論しません。
