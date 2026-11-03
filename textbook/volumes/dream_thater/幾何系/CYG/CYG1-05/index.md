# CYG1-05 四次K3曲面：滑らかさからHodgeダイヤモンドまで

<!-- definition-example-audit: strict -->

## 1. トーラスとどこが違うのか

[前章の複素2次元トーラス](../CYG1-04/index.md#prop-cyg1-04-volume-form)では $K_T\simeq\mathcal O_T$ であっても、$h^{1,0}=2$、全ホロノミーは自明になり得た。標準束の自明性だけでは、複素曲面の形は決まらない。

今度は射影3空間 $\mathbb P^3$ の中で四次方程式一つを解いた曲面を調べる。具体的な方程式から、次の順で結論を作る。

1. 偏導関数で特異点がないことを確かめ、滑らかな複素曲面とする。
2. [随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)で標準束を計算する。
3. 射影空間との位相の比較を**Lefschetz超平面定理（外部入力）**から得る。
4. 接束のChern類を展開し、**Chern–Gauss–Bonnet（外部入力）**でEuler標数を得る。
5. Betti数をHodge分解で分け、$h^{1,1}$ を決定する。

特に「$K_X$ 自明だから $h^{1,1}=20$」とはならない。標準束は最高次の正則形式を教えるが、中間次数のBetti数を決めるには位相的な入力が別に要る。

## 2. K3の定義とFermat四次曲面

調べたいのは、滑らか・連結・コンパクトな**複素次元2**の複素曲面で、基本群が自明（単連結）かつ標準束 $K_X=\bigwedge^2\Omega_X^1$ が正則自明なものだ。これに特別な名前を付ける。Kähler性を要求する流儀もあるが、今回の射影例は確実にKählerである。この二条件を実際に検証するまでは、単に「四次曲面」と呼ぼう。

<a id="def-cyg1-05-k3"></a>

<!-- formal-statement-start -->
> **定義（K3曲面）**  
> 滑らかで連結・コンパクトな複素次元2の複素多様体 $X$ で、$\pi_1(X)=0$ かつ $K_X\simeq\mathcal O_X$ が**正則線束として**成り立つものをK3曲面という。
<!-- formal-statement-end -->

定義の二条件は独立に調べる。例えば $E\times E$ は前章で標準束自明と確かめたが、被覆 $\mathbb C^2\to E\times E$ の全格子は非自明な基本群を与えるためK3ではない。逆に単連結性を確かめただけでは $K_X$ の正則自明性は分からない。

**直接例の候補。** 同次座標 $[z_0:z_1:z_2:z_3]$ をもつ $\mathbb P^3$ で

$$
F=z_0^4+z_1^4+z_2^4+z_3^4,\qquad X=\{F=0\}\subset\mathbb P^3
$$

と置く（**Fermat四次曲面**）。一つの同次方程式なので、滑らかな点では複素次元が $3-1=2$。射影的な閉部分集合だからコンパクトである。射影空間への埋め込みと[射影多様体のKähler形式](../../KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)からKähler性も得る。残る滑らかさ、単連結性、標準束は以下で順に証明する。

<a id="prop-cyg1-05-fermat-smooth-canonical"></a>

<!-- formal-statement-start -->
> **命題（Fermat四次曲面の滑らかさと標準束）**  
> $F=\sum_{j=0}^3z_j^4$、$X=\{F=0\}\subset\mathbb P^3_{\mathbb C}$ とする。$X$ は滑らか・連結・コンパクトな射影複素曲面で、Kählerであり、$K_X\simeq\mathcal O_X$ が成り立つ。したがって零にならない大域正則2形式が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

すべての偏導関数が零となるのは斉次座標の零ベクトルだけで、射影空間の点ではない。随伴公式の係数は「次数4 − 周囲の射影空間の座標数4」で零になる。射影超曲面の連結性は、ここでは弱Lefschetzの $H^0$ に関する帰結（次節）からも得られるが、先に射影空間の超曲面が連結であることを初等的に確認する。

<!-- proof-start -->
### 証明

偏導関数は $\partial F/\partial z_j=4z_j^3$（$j=0,1,2,3$）。これらがすべて零なら $z_0=\cdots=z_3=0$ となるが、零ベクトルは射影点を表さない。したがって[射影超曲面のJacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)の仮定（標数0の同次多項式、共通の非零零点がない）を満たし、$X$ は滑らかである。

$X$ は射影空間の閉部分集合としてコンパクトである。連結性については、$F$ が既約であることを使う。仮に正次数の斉次多項式 $G,H$ により $F=GH$ と分解できるとする。二つの正次数射影超曲面は $\mathbb P^3$ で交わる（射影空間の交差次元に関する標準事実）。交点では

$$
G=H=0,\qquad dF=G\,dH+H\,dG=0
$$

となり、すでに示した滑らかさに反する。従って $F$ は既約で $X$ は連結である。最後に、滑らかな射影部分多様体であるため[射影多様体のKähler性](../../KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)を適用できる。

[滑らかな超曲面の随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)を次数 $d=4$、周囲 $\mathbb P^m$ の $m=3$ に代入すると

$$
K_X\simeq(K_{\mathbb P^3}\otimes\mathcal O_{\mathbb P^3}(4))|_X
\simeq\mathcal O_X(4-3-1)=\mathcal O_X.
$$

従って[正則体積形式による自明化判定](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)から零にならない大域正則2形式が存在する。$\square$
<!-- proof-end -->

**チャートでの確認。** $z_3=1$ のアフィンチャートでは $f(x,y,w)=x^4+y^4+w^4+1$。$df=0$ は $x=y=w=0$ を意味するが、その点では $f=1$。逆に $z_3=0$ の点も、上の斉次Jacobian判定により取りこぼしがない。チャート一つだけで滑らかさを結論してはいけない。

## 3. 単連結性はどこから来るか

ここで初めてK3の定義に残った基本群の条件を扱う。包含写像を $i:X\hookrightarrow\mathbb P^3$ とし、$i^*$ はコホモロジーの引戻し、$i_*$ は基本群の写像とする。複素射影空間が単連結であり、整数係数コホモロジーが偶数次数に一つずつ存在することは既習の射影空間の位相として使う。

<a id="thm-cyg1-05-lefschetz-input"></a>

<!-- formal-statement-start -->
> **定理（滑らかな射影超曲面のLefschetz定理：外部入力）**  
> $X\subset\mathbb P^3_{\mathbb C}$ が正次数の同次方程式で定まる滑らかな複素曲面とし、$i$ をその包含とする。基本群について

$$
i_*:\pi_1(X)\xrightarrow{\simeq}\pi_1(\mathbb P^3)
$$

> は同型である。また整数係数特異コホモロジーでの引戻し

$$
i^*:H^k(\mathbb P^3;\mathbb Z)\longrightarrow H^k(X;\mathbb Z)
$$

> は $k<2$ で同型、$k=2$ で単射である。
<!-- formal-statement-end -->

これは**弱Lefschetz超平面定理のコホモロジー版と、Lefschetz超平面定理のホモトピー版**を合わせた外部入力であり、本章で証明したとはしない。次数4の超曲面は超平面そのものではないが、$\mathcal O_{\mathbb P^3}(4)$ が正（ample）なためこの定理の対象になる。特に $k=2$ では**単射だけ**であって同型を主張しない。単射を同型と読み替えると $b_2=1$ という誤答になる。

<a id="prop-cyg1-05-k3"></a>

<!-- formal-statement-start -->
> **命題（Fermat四次曲面はK3曲面）**  
> 次のFermat四次曲面はK3曲面であり、$b_1(X)=0$ である。

$$
X=\{z_0^4+z_1^4+z_2^4+z_3^4=0\}\subset\mathbb P^3_{\mathbb C}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

前節で滑らか・連結・コンパクト・標準束自明を得た。外部Lefschetz定理の $\pi_1$ 同型と $H^1$ 同型をそれぞれ別に適用する。

<!-- proof-start -->
### 証明

[滑らかさと標準束の命題](#prop-cyg1-05-fermat-smooth-canonical)で$X$は外部定理の仮定を満たす。[Lefschetz定理（外部入力）](#thm-cyg1-05-lefschetz-input)により

$$
\pi_1(X)\simeq\pi_1(\mathbb P^3)=0,
\qquad H^1(X;\mathbb Z)\simeq H^1(\mathbb P^3;\mathbb Z)=0.
$$

有理係数ないし実係数に変えても一次コホモロジーは零で、$b_1(X)=\dim_{\mathbb Q}H^1(X;\mathbb Q)=0$。よって[本章のK3の定義](#def-cyg1-05-k3)の二条件を満たす。$\square$
<!-- proof-end -->

<!-- definition-example-start: def-cyg1-05-k3 -->
**定義の確認**（Fermat四次の全条件）。$X=\{\sum_{j=0}^3z_j^4=0\}\subset\mathbb P^3$ について、条件を分けて照合する。

1. **滑らか・複素次元2：** $\partial F/\partial z_j=4z_j^3$ は非零射影点で同時に零にならないのでJacobian判定を満たす。一つの方程式の余次元は1で、$\dim_{\mathbb C}X=3-1=2$。
2. **連結・コンパクト：** [滑らかな四次曲面の命題](#prop-cyg1-05-fermat-smooth-canonical)で連結性を検証し、射影閉部分集合としてコンパクト性も確認した。
3. **単連結：** [Lefschetzのホモトピー版](#thm-cyg1-05-lefschetz-input)で $\pi_1(X)=\pi_1(\mathbb P^3)=0$。
4. **標準束が正則自明：** 滑らかさを確認して[随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)を $d=4,m=3$ に適用し、$K_X\simeq\mathcal O_X(0)$ を得た。

したがって単に「標準束が自明」なのではなく、[K3の定義](#def-cyg1-05-k3)のすべての仮定を満たす実例になっている。
<!-- definition-example-end -->

## 4. Euler標数24はどの係数から出るか

曲面のEuler標数 $\chi_{\mathrm{top}}(X)$ はBetti数の交代和 $\sum_{k=0}^4(-1)^kb_k$ である。別の計算法は接束 $TX$ の**全Chern類**を使う。複素階数2の束では $c(TX)=1+c_1(TX)+c_2(TX)$ と書き、$c_j(TX)\in H^{2j}(X;\mathbb Z)$ である。第一Chern類だけでなく第二Chern類も必要になる。

$H\in H^2(X;\mathbb Z)$ を $\mathcal O_{\mathbb P^3}(1)$ の第一Chern類を $X$ に制限したものとする。$H^2$ はカップ積であり、**一つの数ではない**。その積分 $\int_XH^2$ が曲面上の次数である。

全Chern類を厳密に構成する一般理論はこの章の証明対象ではないが、短完全列に関する次の計算規則を使う。ここで短完全列とは、複素ベクトル束の写像 $A\to B\to C$ が各点のファイバーで単射・全射となり、$A$ の像が $B\to C$ の核に一致する列である。

<a id="thm-cyg1-05-whitney"></a>

<!-- formal-statement-start -->
> **定理（全Chern類のWhitney積公式：外部入力）**  
> 位相空間 $Y$ 上の有限階数複素ベクトル束の短完全列 $0\to A\to B\to C\to0$ があるとき、全Chern類は

$$
c(B)=c(A)c(C).
$$

> 特に複素線束 $L$ では $c(L)=1+c_1(L)$ である。
<!-- formal-statement-end -->

**直接例。** $B=L_1\oplus L_2$、$A=L_1$、$C=L_2$ とする。直和の包含・射影は各ファイバーで正確な短完全列を与える。$c_1(L_j)=a_j$ と記せば $c(B)=(1+a_1)(1+a_2)=1+(a_1+a_2)+a_1a_2$。従って一次の類と二次の類がそれぞれ $a_1+a_2$ と $a_1a_2$ になる。これは第二Chern類が一次の情報だけから自動的に零とはならないことを示す。

この公式と幾何的な二つの束の列を組み合わせ、超曲面の計算規則を得る。

<a id="thm-cyg1-05-chern-input"></a>

<!-- formal-statement-start -->
> **定理（超曲面の全Chern類の計算規則：外部入力）**  
> $X_d\subset\mathbb P^3_{\mathbb C}$ を滑らかな次数 $d>0$ の超曲面、$H=c_1(\mathcal O_{\mathbb P^3}(1)|_{X_d})$ とする。接束の全Chern類と超平面類の間には、$X_d$ 上の次数4までで次の関係が成り立つ。

$$
c(TX_d)=\frac{(1+H)^4}{1+dH},\qquad \int_{X_d}H^2=d.
$$

> 右辺の除算は $H^3=0$ とした形式的なべき級数の打切りを意味する。
<!-- formal-statement-end -->

**入力が式に変わる道筋。** $T\mathbb P^3$ は周囲の接束、$N_{X_d/\mathbb P^3}$ は法束（接ベクトルのうち超曲面の接空間から外れる方向）である。Euler列と法束の完全列は、それぞれ

$$
0\longrightarrow\mathcal O\longrightarrow\mathcal O(1)^{\oplus4}\longrightarrow T\mathbb P^3\longrightarrow0,
$$

$$
0\longrightarrow TX_d\longrightarrow T\mathbb P^3|_{X_d}\longrightarrow\mathcal O_{X_d}(d)\longrightarrow0
$$

となる。後者の最後の写像は接ベクトル $v$ に $dF(v)$ を対応させ、滑らかさが全射性を保証する。[Whitney積公式（外部入力）](#thm-cyg1-05-whitney)を前者へ使うと $c(T\mathbb P^3)=(1+H)^4$、後者へ使うと $c(TX_d)(1+dH)=(1+H)^4$。$c(\mathcal O(d))=1+dH$ という線束の規則も使用した。これらの列と積公式自体は**外部入力**である。

積分の式は、$X_d$ と一般の二つの超平面の交点を重複度込みに数えると $d$ 点であること（Bézout型の次数計算）から来る。交差積の厳密な構成は外部入力だが、どの数を積分しているかはここで固定した。

<a id="thm-cyg1-05-gauss-bonnet-input"></a>

<!-- formal-statement-start -->
> **定理（複素曲面のChern–Gauss–Bonnet：外部入力）**  
> $Y$ が滑らか・コンパクトな複素曲面なら、接束の最高Chern類の評価は位相的Euler標数に等しい。

$$
\chi_{\mathrm{top}}(Y)=\int_Yc_2(TY).
$$
<!-- formal-statement-end -->

<a id="prop-cyg1-05-euler-24"></a>

<!-- formal-statement-start -->
> **命題（Fermat四次曲面のChern類とEuler標数）**  
> $X=\{\sum_{j=0}^3z_j^4=0\}\subset\mathbb P^3_{\mathbb C}$ をFermat四次曲面とし、$H=c_1(\mathcal O_{\mathbb P^3}(1)|_X)$ とする。このとき

$$
c_1(TX)=0,\qquad c_2(TX)=6H^2,
\qquad\chi_{\mathrm{top}}(X)=24.
$$
<!-- formal-statement-end -->

### 証明の見取り図

分子は $1+4H+6H^2$ まで、分母の逆数は $1-4H+16H^2$ まで。一次係数が相殺し、二次係数が $16-16+6=6$ になる。交点数4を掛けて24を得る。

<!-- proof-start -->
### 証明

前節で $X$ は滑らかな次数4の超曲面だと確認したため、[全Chern類の計算規則（外部入力）](#thm-cyg1-05-chern-input)に $d=4$ を代入できる。複素次元2なので $H^3=0$ としてよい。まず

$$
(1+H)^4=1+4H+6H^2,\qquad (1+4H)^{-1}=1-4H+16H^2
$$

を次数4までで掛けると

$$
\begin{aligned}
c(TX)&=(1+4H+6H^2)(1-4H+16H^2)\\
&=1+(4-4)H+(6-16+16)H^2\\
&=1+6H^2.
\end{aligned}
$$

これより $c_1(TX)=0$、$c_2(TX)=6H^2$。さらに[曲面のChern–Gauss–Bonnet（外部入力）](#thm-cyg1-05-gauss-bonnet-input)と、次数4の式 $\int_XH^2=4$ を**別々に**適用して

$$
\chi_{\mathrm{top}}(X)=\int_Xc_2(TX)=6\int_XH^2=6\cdot4=24.
$$

複素曲面の最高Chern類は $c_2$（実コホモロジー次数4）であり、$c_3$ ではない。$\square$
<!-- proof-end -->

## 5. 24からHodgeダイヤモンドを復元する

Betti数を $b_k=\dim_{\mathbb Q}H^k(X;\mathbb Q)$ とし、Hodge数を $h^{p,q}=\dim_{\mathbb C}H_{\bar\partial}^{p,q}(X)$ とする。$X$ は射影的だからKählerであり、[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)と[Hodge数の定義](../../HOD/HOD1-07/index.md#def-hod1-07-hodge-numbers)を適用できる。共役による $h^{p,q}=h^{q,p}$ も使う。

連結なので $b_0=1$。滑らか・コンパクトで向き付けられた実4次元多様体のPoincaré双対性から $b_4=b_0=1$、$b_3=b_1$。ここで[前節の単連結性と一次Betti数](#prop-cyg1-05-k3)から $b_1=b_3=0$。Eulerの交代和は

$$
24=1-0+b_2-0+1=2+b_2,
$$

なので $b_2=22$ と分かる。

さらに $K_X\simeq\mathcal O_X$ と連結・コンパクト性から、どの正則2形式も零にならない正則体積形式 $\Omega$ の倍 $f\Omega$ である。大域正則関数 $f$ は最大値原理で定数なので

$$
h^{2,0}=\dim H^0(X,K_X)=1,
\qquad h^{0,2}=h^{2,0}=1.
$$

<a id="prop-cyg1-05-hodge"></a>

<!-- formal-statement-start -->
> **命題（Fermat四次K3のBetti数とHodge数）**  
> 滑らかなFermat四次曲面 $X\subset\mathbb P^3_{\mathbb C}$ のBetti数とHodge数は次のとおりである。

$$
(b_0,b_1,b_2,b_3,b_4)=(1,0,22,0,1).
$$

$$
(h^{p,q})_{0\le p,q\le2}=
\begin{pmatrix}1&0&1\\0&20&0\\1&0&1\end{pmatrix}.
$$

> 行は $p$、列は $q$ の順である。
<!-- formal-statement-end -->

### 証明の見取り図

$b_2=22$ のうち二つは $(2,0)$ と $(0,2)$ に由来する。残りの20が $(1,1)$ に入る。$b_1=0$ が $(1,0)$ と $(0,1)$ の消滅を強制する。

<!-- proof-start -->
### 証明

上記のEuler計算とPoincaré双対性よりBetti数列は $(1,0,22,0,1)$。Hodge分解を次数1に適用すると

$$
0=b_1=h^{1,0}+h^{0,1},
$$

各Hodge数は非負整数だから両者零。次数2は

$$
22=b_2=h^{2,0}+h^{1,1}+h^{0,2}=1+h^{1,1}+1,
$$

よって $h^{1,1}=20$。$h^{0,0}=1$ は連結コンパクト上の正則関数が定数であることから、$h^{2,2}=1$ はKähler・Poincaré双対性から得る。次数3では $b_3=h^{2,1}+h^{1,2}=0$ なのでそれぞれ零。以上を行列へ配置すると主張の値になる。$\square$
<!-- proof-end -->

ダイヤモンドとして配置すれば、上から $1$、次の段が $0,0$、中央が $1,20,1$、下側が $0,0$、最後が $1$ である。

**トーラスとの違い。** $E\times E$ は同じ $K\simeq\mathcal O$ でも、[複素トーラスのHodge数](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)から $h^{1,1}=4,b_2=6,\chi=0$。K3の $h^{1,1}=20,\chi=24$ は、単連結性と位相的Euler標数を別途計算した結果であって、「Calabi–Yau」という呼称だけから出る値ではない。

## 6. $SU(2)$ とhyperkählerはまだ同じ結論ではない

複素曲面での $SU(2)$ は、複素2次元のHermitian内積と行列式を保存する行列群であり、四元数の単位元群 $Sp(1)$ と同型である。しかし**複素構造を一つ指定したこと**と**その計量のホロノミーが$SU(2)$であること**は異なる。ここまで得たのは、$X$ が射影K3であることと位相・Hodge数であって、Ricci平坦計量の存在はまだ証明していない。

[Kähler計量の制限ホロノミーとRicci形式](../../KAH/KAH1-16/index.md#thm-kah1-16-su-restricted)により、**もし** $X$ にRicci平坦Kähler計量 $g$ があれば $\operatorname{Hol}^0(g)\subseteq SU(2)$ となる。$\pi_1(X)=0$ なので閉路の平行移動は制限群だけで尽くされ、全群もこれと一致する。だが単に包含を得ただけでは等号は証明されない。

後のYauの定理は $c_1(X)_{\mathbb R}=0$ とKähler類を固定することでRicci平坦な代表計量の**存在**を保証する（証明は後続講座）。さらに既約性・非平坦性とホロノミーの議論を組み合わせると、K3ではホロノミーが $SU(2)=Sp(1)$ となる。この最後の等号には追加の議論が必要で、ここでは未証明の予告とする。hyperkähler構造とは、この $Sp(1)$ ホロノミーに対応する平行な複素構造の組を持つ計量的な構造であり、四次式のJacobian計算だけで構成できたわけではない。

## 7. 演習：外部定理の入力と自分の計算を分ける

<a id="ex-cyg1-05-a01"></a>
#### CYG1-05-A01 斉次Jacobian判定
- Level: A

$X=\{z_0^4+z_1^4+z_2^4+z_3^4=0\}\subset\mathbb P^3_{\mathbb C}$ の特異点がないことを斉次座標で示せ。$z_3=1$ チャートだけの検査では不十分な理由も述べよ。

<!-- solution-start -->
**詳細解答。** $\partial F/\partial z_j=4z_j^3$。複素数体は標数0なので、この四つがすべて零なら $z_j=0$ が各 $j$ で従う。しかし $[0:0:0:0]$ は射影点でない。よって[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)で滑らか。$z_3=1$ は $z_3\ne0$ の点しか覆わず、$z_3=0$ の超平面上の点を検査していないから、チャート内の結果だけでは全体の滑らかさは言えない。
<!-- solution-end -->

<a id="ex-cyg1-05-a02"></a>
#### CYG1-05-A02 随伴指数の比較
- Level: A

$X_d\subset\mathbb P^3$ を滑らかな次数 $d$ の超曲面とする。$d=3,4,5$ それぞれで随伴公式が与える $K_{X_d}$ を求め、どの次数で自明束が直接得られるか述べよ。

<!-- solution-start -->
**詳細解答。** [随伴公式](../../../代数系/CAG/CAG1-11/index.md#thm-cag1-11-analytic-adjunction)を $m=3$ に適用して $K_{X_d}\simeq\mathcal O_{X_d}(d-4)$。従って $d=3$ では $\mathcal O_{X_3}(-1)$、$d=4$ では $\mathcal O_{X_4}(0)=\mathcal O_{X_4}$、$d=5$ では $\mathcal O_{X_5}(1)$。正次数の超曲面で $H$ の二乗評価 $\int_{X_d}H^2=d>0$ のため、$\mathcal O_{X_d}(\pm1)$ の第一Chern類は零でない。従ってこの三つで標準束が自明なのは $d=4$ のみである。
<!-- solution-end -->

<a id="ex-cyg1-05-a03"></a>
#### CYG1-05-A03 べき級数の逆数
- Level: A

複素曲面上で $H^3=0$ とする。$(1+4H)^{-1}$ を $H^2$ まで求め、$(1+H)^4/(1+4H)$ の一次・二次係数を計算せよ。

<!-- solution-start -->
**詳細解答。** $(1+4H)(1+aH+bH^2)=1+(4+a)H+(b+4a)H^2$。一次係数零から $a=-4$、二次係数零から $b=16$。また $(1+H)^4=1+4H+6H^2$（三次以上は零）。掛けると一次係数 $4-4=0$、二次係数 $6+4(-4)+16=6$。ゆえに $1+6H^2$。
<!-- solution-end -->

<a id="ex-cyg1-05-a04"></a>
#### CYG1-05-A04 第二Chern数
- Level: A

滑らかな次数4の超曲面 $X\subset\mathbb P^3$ で $c_2(TX)=6H^2$、$\int_XH^2=4$ とする。Chern–Gauss–Bonnetの適用条件を確認してEuler標数を求めよ。

<!-- solution-start -->
**詳細解答。** $X$ は滑らかで射影的、したがってコンパクトな複素次元2の多様体。これは[複素曲面版Chern–Gauss–Bonnet](#thm-cyg1-05-gauss-bonnet-input)の仮定に合う。$\chi_{\mathrm{top}}(X)=\int_Xc_2(TX)=\int_X6H^2=6\cdot4=24$。$H^2$ の積分値とChern類の係数6を混同しない。
<!-- solution-end -->

<a id="ex-cyg1-05-a05"></a>
#### CYG1-05-A05 弱Lefschetzの境界
- Level: A

滑らかな曲面 $X_d\subset\mathbb P^3$ について、[本章の外部Lefschetz定理](#thm-cyg1-05-lefschetz-input)が $H^1$ と $H^2$ にそれぞれ何を保証するか答えよ。「$H^2(X_d;\mathbb Z)\simeq\mathbb Z$」と即断してよいか。

<!-- solution-start -->
**詳細解答。** 次元 $2$ なので $k=1<2$ で $H^1(\mathbb P^3;\mathbb Z)\simeq H^1(X_d;\mathbb Z)$、左辺は零。$k=2$ では $\mathbb Z\simeq H^2(\mathbb P^3;\mathbb Z)$ から $H^2(X_d;\mathbb Z)$ への**単射**だけである。全射は保証されない。実際四次K3では $b_2=22$ だから、右辺の自由部分の階数は22であり同型ではない。
<!-- solution-end -->

<a id="ex-cyg1-05-b01"></a>
#### CYG1-05-B01 Eulerから第二Betti数
- Level: B

滑らか・連結・コンパクトな複素曲面 $Y$ で $\pi_1(Y)=0$、$\chi_{\mathrm{top}}(Y)=24$ とする。Poincaré双対性とEuler交代和からBetti数をすべて求めよ。

<!-- solution-start -->
**詳細解答。** 連結性から $b_0=1$。$\pi_1(Y)=0$ の一次ホモロジー（基本群の可換化）が零なので $b_1=0$。複素曲面は向き付けられた閉実4次元多様体で、Poincaré双対性により $b_4=b_0=1$、$b_3=b_1=0$。したがって $24=1-0+b_2-0+1$ から $b_2=22$。全列は $(1,0,22,0,1)$。
<!-- solution-end -->

<a id="ex-cyg1-05-b02"></a>
#### CYG1-05-B02 Hodge数の残り一枠
- Level: B

$Y$ を連結・コンパクトKähler複素曲面で $K_Y\simeq\mathcal O_Y$、$b_1=0$、$b_2=22$ とする。$h^{p,q}$ をすべて求めよ。$K_Y$ 自明から $h^{2,0}=1$ となる理由も述べよ。

<!-- solution-start -->
**詳細解答。** 正則自明化 $\Omega$ は零にならず、任意の正則2形式は $f\Omega$ と書ける。連結コンパクト上の正則関数 $f$ は定数だから $h^{2,0}=1$。複素共役により $h^{0,2}=1$ でもある。

[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)を次数1に適用すると、

$$
0=b_1=h^{1,0}+h^{0,1}.
$$

両者は非負整数なのでそれぞれ零。次数2では

$$
22=b_2=1+h^{1,1}+1,\qquad h^{1,1}=20.
$$

またPoincaré双対性から $b_3=b_1=0$。よって $h^{2,1}=h^{1,2}=0$。連結性および[Hodge数の補次数対称性](../../HOD/HOD1-07/index.md#thm-hod1-07-hodge-duality)により $h^{0,0}=h^{2,2}=1$。行を $p$、列を $q$ とする全行列は

$$
(h^{p,q})=\begin{pmatrix}1&0&1\\0&20&0\\1&0&1\end{pmatrix}.
$$
<!-- solution-end -->

<a id="ex-cyg1-05-b03"></a>
#### CYG1-05-B03 特異四次で壊れる証明
- Level: B

$Y=\{z_0^4+z_1^4+z_2^4=0\}\subset\mathbb P^3$ を考える。$[0:0:0:1]$ のJacobianを調べ、Fermat四次に対する本章のK3・Chern・Hodgeの導出をそのまま適用してよいか判定せよ。

<!-- solution-start -->
**詳細解答。** $G=z_0^4+z_1^4+z_2^4$ なので、偏導関数は $(4z_0^3,4z_1^3,4z_2^3,0)$。点 $p=[0:0:0:1]$ で $G(p)=0$ かつ全偏導関数が零。よって $p$ は特異点。したがって滑らかな複素曲面というK3の定義の仮定を失い、法束完全列の接束 $TY$ を滑らかな階数2束として扱えず、Lefschetz定理・Chern–Gauss–Bonnet・Hodge分解の**本章で述べた滑らかな対象に対する形**もそのまま適用できない。次数が4で随伴指数が零という形式計算だけではこれらの欠落を埋められない。
<!-- solution-end -->

<a id="ex-cyg1-05-b04"></a>
#### CYG1-05-B04 トーラスが同じ数字を持たない理由
- Level: B

$T=E\times E$（$E=\mathbb C/(\mathbb Z+i\mathbb Z)$）とFermat四次曲面 $X$ について、両者の $K$、$\pi_1$、$b_2$、$h^{1,1}$、$\chi_{\mathrm{top}}$ を比較し、K3の定義のどの条件が $T$ で破れるか説明せよ。

<!-- solution-start -->
**詳細解答。** 標準束については[トーラスの最高次形式](../CYG1-04/index.md#prop-cyg1-04-volume-form)と[本章の随伴計算](#prop-cyg1-05-fermat-smooth-canonical)から、それぞれ

$$
K_T\simeq\mathcal O_T,\qquad K_X\simeq\mathcal O_X.
$$

一方、$T$ の普遍被覆は $\mathbb C^2$ であり、デッキ変換群が全格子なので $\pi_1(T)\simeq\mathbb Z^4$。[Lefschetz入力を使った結論](#prop-cyg1-05-k3)より $\pi_1(X)=0$。

[複素トーラスのHodge数](../../HOD/HOD1-09/index.md#thm-hod1-09-torus-numbers)を $n=2$ に代入して

$$
b_2(T)=\binom42=6,\qquad h^{1,1}(T)=\binom21^2=4.
$$

Betti数列 $(1,4,6,4,1)$ の交代和は $1-4+6-4+1=0$。これに対して[四次K3のHodge数](#prop-cyg1-05-hodge)から $b_2(X)=22,h^{1,1}(X)=20,\chi_{\mathrm{top}}(X)=24$。両者は標準束の条件を共有するが、$T$ では**単連結性**が破れているためK3ではない。
<!-- solution-end -->

<a id="ex-cyg1-05-c01"></a>
#### CYG1-05-C01 四次曲面を端から端まで検証する
- Level: C

$X=\{z_0^4+z_1^4+z_2^4+z_3^4=0\}\subset\mathbb P^3_{\mathbb C}$ に対し、次を順に示せ。必要な外部入力は定理名と適用条件を明記すること。

1. $X$ の滑らかさ、コンパクト・Kähler性、標準束の正則自明性。
2. $\pi_1(X)$ と $b_1$。弱Lefschetzだけから $b_2=1$ としない理由。
3. $c(TX)$ を $H^2$ まで展開し、$\chi_{\mathrm{top}}$ を計算する。
4. $b_2,h^{2,0},h^{1,1}$ を導く。
5. Ricci平坦計量の存在と全ホロノミー $SU(2)$ の等号のうち、どれがこの章の計算だけでは未証明か。

<!-- solution-start -->
**詳細解答。** 1. $F=\sum z_j^4$ の四つの偏導関数 $4z_j^3$ は非零射影点で同時には零にならない。Jacobian判定から滑らかで、射影閉集合なのでコンパクト、射影埋め込みからKähler。随伴公式では $d-m-1=4-3-1=0$、よって $K_X\simeq\mathcal O_X$。

2. 滑らかな正次数射影超曲面なので[Lefschetz超平面定理（外部入力）](#thm-cyg1-05-lefschetz-input)を適用でき、$\pi_1(X)\simeq\pi_1(\mathbb P^3)=0$、$H^1(X;\mathbb Z)=0$、従って $b_1=0$。二次コホモロジーでは $H^2(\mathbb P^3;\mathbb Z)\to H^2(X;\mathbb Z)$ は単射のみで、全射を保証しない。

3. 法束列とEuler列、Whitney積公式という[外部Chern入力](#thm-cyg1-05-chern-input)を用い、$\int_XH^2=4$ とする。$H^3=0$ より

$$
\begin{aligned}
c(TX)&=(1+H)^4(1+4H)^{-1}\\
&=(1+4H+6H^2)(1-4H+16H^2)\\
&=1+(4-4)H+(6-16+16)H^2=1+6H^2.
\end{aligned}
$$

[Chern–Gauss–Bonnet（外部入力）](#thm-cyg1-05-gauss-bonnet-input)の仮定は滑らかなコンパクト複素曲面で満たし、$\chi=\int_Xc_2=6\cdot4=24$。

4. Poincaré双対性で $b_0=b_4=1,b_3=b_1=0$。$24=1+b_2+1$ から $b_2=22$。正則自明化 $\Omega$ によって大域正則2形式は $f\Omega$、コンパクト連結性より $f$ は定数なので $h^{2,0}=1$、共役で $h^{0,2}=1$。[Hodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)で $22=1+h^{1,1}+1$、よって $h^{1,1}=20$。

5. $K_X$ 自明から $c_1(X)_{\mathbb R}=0$ は分かるが、**指定した**Kähler計量のRicci形式が零とは示していない。Ricci平坦Kähler計量の存在はYauの定理という別の外部結果を必要とする。その計量での $\operatorname{Hol}(g)\subseteq SU(2)$ と、等号 $\operatorname{Hol}(g)=SU(2)$ は論理的に異なり、後者にはホロノミーの追加議論が要る。したがってこの章の初等的なJacobian・Chern・Hodge計算だけから二つの計量的結論を証明済みとはできない。
<!-- solution-end -->

## 8. 次に何を計算するか

今回、射影的な四次曲面の方程式から滑らかさと標準束を確かめ、外部定理の**使う場所を明示して** $\chi=24,b_2=22,h^{1,1}=20$ に到達した。ここで学んだ最大の注意は、随伴公式、Lefschetz超平面定理、Hodge分解、Chern–Gauss–Bonnetがそれぞれ別の役割を担うことだ。次章ではHodgeダイヤモンドの対称性と消滅条件を一般のCalabi–Yau幾何に整理する。
