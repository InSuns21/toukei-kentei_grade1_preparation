# CAG1-13 滑らかなquintic threefoldと正則3形式

[Fermat型五次超曲面の代数的な滑らかさと標準束](../../AG/AG2-12/index.md#thm-ag2-12-quintic-canonical)は既に計算した。[前々章の解析的随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)は、その結果を複素解析の言葉へ運べると主張する。ただし束の同型を一つ書いただけでは、正則3形式が**実際にどこで定義され、チャートの境界でどう一致するか**、またそのような大域形式が**何個あるか**までは見えない。

この章では、具体的な五次方程式から局所正則3形式を作り、座標変更の符号を追って貼り合わせ、最後に[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)で大域正則3形式の空間が一次元であることを証明する。多様体のRicci平坦計量やHodge数の計算は、この証明からはまだ出てこない。

以下、体は $\mathbb C$、射影座標は $[X_0:X_1:X_2:X_3:X_4]$ とし、

$$
F=X_0^5+X_1^5+X_2^5+X_3^5+X_4^5,\qquad
Q=V_+(F)\subset\mathbb P^4_{\mathbb C},\qquad M=Q^{\mathrm{an}}
$$

と固定する。$Q$ は代数的超曲面、$M$ は同じ複素点からなる解析空間である。$K_Q=\bigwedge^3\Omega_Q^1$ と $K_M=\bigwedge^3\Omega_M^1$ はそれぞれ代数的・解析的標準束を表す。

## 1. 五次式の零点が滑らかな複素三次元空間になるまで

「五次」は**方程式の次数**であり、空間の次元ではない。$Q$ の局所的な自由変数が三つになるのは、$\mathbb P^4$ の四つのアフィン座標に対して、独立な方程式が一つあるからである。独立性を保証するのは勾配の非消失である。

斉次偏微分を全部書くと、

$$
\frac{\partial F}{\partial X_i}=5X_i^4\quad(0\le i\le4).
$$

五つが同時に零なら $X_0=\cdots=X_4=0$ となるが、これは射影点ではない。

また $F$ が非定数の平方因子 $H^2$ を持つなら、$H=0$ の射影点で全偏微分が零となって矛盾する。従って $F$ は平方因子を持たず、[射影Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)の仮定を満たすので、$Q$ は滑らかである。

例えば $U_0=\{X_0\ne0\}$ では $x_j=X_j/X_0$（$1\le j\le4$）と置く。このチャート上の方程式は

$$
f_0=1+x_1^5+x_2^5+x_3^5+x_4^5=0,
\qquad df_0=\sum_{j=1}^4 5x_j^4\,dx_j.
$$

点 $p\in Q\cap U_0$ で $x_1=\cdots=x_4=0$ は $f_0(p)=1$ に反する。従ってある $x_r(p)\ne0$ があり、$\partial f_0/\partial x_r=5x_r^4$ はその点の近傍で正則単元である。

[局所余接基底](../../AG/AG2-11/index.md#prop-ag2-11-local-basis)により残る三つの $dx_j$ が余接層の局所基底となる。解析側でも[余法完全列と陰関数定理による局所座標](../CAG1-11/index.md#prop-cag1-11-analytic-conormal)により、残りの三変数を正則局所座標に選べる。こうして $M$ は複素次元 $4-1=3$ の多様体になる。

次に[代数的随伴公式](../../AG/AG2-10/index.md#thm-ag2-10-adjunction)へ周囲の次元 $n=4$ と方程式次数 $d=5$ を代入する。射影空間側の $K_{\mathbb P^4}\simeq\mathcal O(-5)$ と、超曲面の法方向に相当する $\mathcal O(5)$ が相殺され、

$$
K_Q\simeq\mathcal O_Q(5-4-1)=\mathcal O_Q.
$$

[標準束の解析化比較](../CAG1-11/index.md#thm-cag1-11-canonical-comparison)で $(K_Q)^{\mathrm{an}}\simeq K_M$、従って $K_M\simeq\mathcal O_M$ である。これが**束としての自明性**である。次はこの同型のもとで定数関数 $1$ に対応する正則3形式を、実際の座標微分で書く。

## 2. 局所的な分母は、極ではなく消去方向を示す

$U_i=\{X_i\ne0\}$ のアフィン座標を $x_a^{(i)}=X_a/X_i$（$a\ne i$）とし、添字を昇順に並べた四つを $z_1,z_2,z_3,z_4$ と略記する。局所方程式は $f_i=F/X_i^5$ である。$a_r=\partial f_i/\partial z_r\ne0$ の領域では、$df_i=0$ により $dz_r$ をほかの三つの微分で表せる。

ここで $\partial f_i/\partial z_r$ は周囲のアフィンチャートで他の $z$ を固定した偏微分である。周囲での全微分は

$$
df_i=\sum_{r=1}^4a_r\,dz_r
$$

となる。$df_i=0$ は**超曲面の余接層 $\Omega_M^1$ での関係**を意味する。一方、周囲の余接束を $M$ に制限した中では $df_i$ が非零の法方向として残る。この二つを区別する根拠は[解析的余法完全列](../CAG1-11/index.md#prop-cag1-11-analytic-conormal)である。

周囲の四形式 $\tau_i=dz_1\wedge dz_2\wedge dz_3\wedge dz_4$ から $df_i$ の方向を取り除く[局所正則随伴形式](../CAG1-11/index.md#prop-cag1-11-holomorphic-residue)を使う。以下、$\widehat{dz_r}$ は楔積から $dz_r$ を除く記号とする。すると、

$$
\eta_{i,r}=
\frac{(-1)^{r-1}\,
dz_1\wedge\cdots\wedge\widehat{dz_r}\wedge\cdots\wedge dz_4}
{a_r}.
$$

これは $a_r\ne0$ の領域でのみ書いた式である。そこでは分母は正則単元であり、残りの微分は局所基底だから、$\eta_{i,r}$ は**零にも極にもならない**。一つの分数式を分母零の点へ強引に延長する必要はない。

例えば $U_0$ で $x_4\ne0$ なら、

$$
\eta_{0,4}=-\frac{dx_1\wedge dx_2\wedge dx_3}{5x_4^4};
$$

$x_3\ne0$ なら

$$
\eta_{0,3}=\frac{dx_1\wedge dx_2\wedge dx_4}{5x_3^4}.
$$

重なりでは $\eta_{0,3}=\eta_{0,4}$ である。実際、$\Omega_M^1$ における $df_0=0$ に $dx_1\wedge dx_2$ を掛けると、

$$
5x_3^4\,dx_1\wedge dx_2\wedge dx_3
+5x_4^4\,dx_1\wedge dx_2\wedge dx_4=0.
$$

両係数が単元なので $5x_3^4\cdot5x_4^4$ で割れば上の二つの3形式が一致する。これは[代数側の局所3形式](../../AG/AG2-12/index.md#prop-ag2-12-local-three-form)を解析化しているのであり、独立した別の微分形式を発明したわけではない。

## 3. 異なる射影チャートでも一つの正則3形式にする

消去する変数を変えたときの一致だけでは足りない。$U_0$ の $x_j$ と $U_1$ の座標の間には逆数が出る。そこで「四形式のJacobian」と「五次方程式の変換」を**同じ重なり**で比較する。

<a id="prop-cag1-13-analytic-gluing"></a>

<!-- formal-statement-start -->
> **命題（Fermat quintic上の正則3形式の貼り合わせ）**  
> $Q=V_+(\sum_{i=0}^4X_i^5)\subset\mathbb P^4_{\mathbb C}$、$M=Q^{\mathrm{an}}$ とする。各標準チャート $U_i$ 上で、$\partial f_i/\partial z_r\ne0$ の領域にある前節の正則3形式 $\eta_{i,r}$ を、同一チャート内で一つの $\eta_i$ として貼り合わせる。すると

$$
\Omega|_{M\cap U_i}=(-1)^i\eta_i
$$

> はチャート間でも一致し、$M$ 上の至る所で零にならない大域正則3形式 $\Omega\in H^0(M,K_M)$ を与える。この構成は[代数的な局所3形式](../../AG/AG2-12/index.md#prop-ag2-12-local-three-form)の解析化と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

周囲の四形式はチャート変換で $(-1)^{i+k}s^{-5}$ 倍、方程式の微分は $s^{-5}$ 倍になる。分母と分子の次数5が消え、残るのは座標を除いた位置による符号だけである。$(-1)^i$ の補正でその符号も消える。

<!-- proof-start -->
### 証明

同一チャート内での $\eta_{i,r}$ の一致は[局所正則随伴形式](../CAG1-11/index.md#prop-cag1-11-holomorphic-residue)の証明を $n=4$ へ適用する。$\partial f_i/\partial z_r$ が非零な領域はJacobian判定により $M\cap U_i$ を被覆する。

$U_i\cap U_k$ では $s=X_k/X_i\ne0$ とする。$U_i$ の座標 $x_a=X_a/X_i$ と $U_k$ の座標 $y_b=X_b/X_k$ は

$$
y_i=s^{-1},\qquad y_b=x_b/s\quad(b\ne i,k)
$$

を満たす。従って

$$
dy_i=-s^{-2}ds,\qquad
dy_b=s^{-1}dx_b-x_bs^{-2}ds.
$$

四つの $dy_b$ の外積では、$dy_i$ が既に $ds=dx_k$ を含む。ほかの三因子から $ds$ を選ぶと同じ一次形式を二度楔積して零になる。生き残る項は $(-s^{-2}ds)$ と三つの $s^{-1}dx_b$ の積だけである。

添字の昇順に戻す交換回数も確認する。$i<k$ なら $dy_i$ は $U_k$ で左から $i+1$ 番目、対応する $dx_k$ は $U_i$ で左から $k$ 番目なので $k-i-1$ 回交換する。$i>k$ なら逆向きに $i-k-1$ 回交換する。どちらも $dy_i=-s^{-2}ds$ の負号を合わせると $(-1)^{i+k}$ となる。よって

$$
\tau_k:=\bigwedge_{b\ne k}dy_b
=(-1)^{i+k}s^{-5}\bigwedge_{a\ne i}dx_a
=(-1)^{i+k}s^{-5}\tau_i.
$$

一方、$F$ は次数5の斉次式だから $f_k=s^{-5}f_i$。ここでは周囲の余接束の元として微分し、$f_i|_M=0$ を代入するので、

$$
df_k|_M
=s^{-5}df_i|_M-5s^{-6}f_i\,ds|_M
=s^{-5}df_i|_M.
$$

各チャートの $\eta$ は、[余法完全列](../CAG1-11/index.md#prop-cag1-11-analytic-conormal)の中央項である周囲の余接束の行列式を通じて $df_i\wedge\eta_i=\tau_i$ に対応する。実際 $a_r\ne0$ の場所では、$df_i$ と残る三つの $dz_j$ が周囲の余接束の基底となり、$df_i\wedge(-)$ は商の最高次外冪から周囲の四次外冪への同型となる。従って

$$
df_i\wedge\eta_k=(-1)^{i+k}\tau_i
=df_i\wedge\bigl((-1)^{i+k}\eta_i\bigr)
$$

から $\eta_k=(-1)^{i+k}\eta_i$ を得る。従って $(-1)^k\eta_k=(-1)^i\eta_i$ が全重なりで成立し、局所正則3形式が貼り合う。各 $\eta_i$ は局所基底だから大域形式は至る所で非零である。

最後に各局所形式は $F$ とその偏微分からなる有理式で、対応する領域では代数的な正則形式である。[解析化と標準束の比較](../CAG1-11/index.md#thm-cag1-11-canonical-comparison)は同じ局所基底の写像なので、代数側の貼り合わせを解析化したものと一致する。$\square$
<!-- proof-end -->

### 二枚のチャートで符号を実測する

$U_0\cap U_1$ で $x_1\ne0$ とし、$u=X_0/X_1=1/x_1$、$v_j=X_j/X_1=x_j/x_1$（$j=2,3,4$）と置く。$x_4\ne0$ の部分では両チャートで最後の変数を消去できる。

$$
\begin{aligned}
f_1&=u^5+1+v_2^5+v_3^5+v_4^5=x_1^{-5}f_0,\\
\frac{\partial f_1}{\partial v_4}&=5v_4^4=5x_4^4/x_1^4,\\
du\wedge dv_2\wedge dv_3
&=-x_1^{-4}dx_1\wedge dx_2\wedge dx_3.
\end{aligned}
$$

従って

$$
\eta_{1,4}=-\frac{du\wedge dv_2\wedge dv_3}{5v_4^4}
=\frac{dx_1\wedge dx_2\wedge dx_3}{5x_4^4}
=-\eta_{0,4}.
$$

補正した $\Omega|_{U_1}=-\eta_{1,4}$ と $\Omega|_{U_0}=\eta_{0,4}$ は確かに一致する。符号差を捨てて「同じ分数だから一致」としないのが要点である。

## 4. 大域正則3形式は本当に一つだけか

前節は少なくとも一つの非消失大域形式 $\Omega$ を構成した。しかし $h(z)\Omega$ も正則3形式になるので、$h$ が自由な正則関数ならいくらでも増える。射影的な $M$ 上で大域正則関数が定数に限られることを、層コホモロジーとGAGAから示す。

<a id="thm-cag1-13-unique-volume"></a>

<!-- formal-statement-start -->
> **定理（Fermat quinticの大域正則3形式の一意性）**  
> $Q=V_+(\sum_{i=0}^4X_i^5)\subset\mathbb P^4_{\mathbb C}$、$M=Q^{\mathrm{an}}$ とする。前命題の $\Omega$ に対し、任意の $\alpha\in H^0(M,K_M)$ はただ一つの $c\in\mathbb C$ を用いて $\alpha=c\Omega$ と書ける。特に

$$
\dim_{\mathbb C}H^0(M,K_M)=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$K_M$ の非消失切断 $\Omega$ で任意の $\alpha$ を割ると、正則関数 $h=\alpha/\Omega$ が得られる。大域正則関数の数は、代数側の制限完全列とねじり層のコホモロジーを計算し、GAGAの零次比較を通じて決める。

<!-- proof-start -->
### 証明

五次多項式 $F$ は $\mathbb P^4$ 上の $\mathcal O(5)$ の切断であり、$Q$ を定める非零因子である。掛け算の単射と制限から、代数的短完全列

$$
0\longrightarrow\mathcal O_{\mathbb P^4}(-5)
\xrightarrow{\ \cdot F\ }\mathcal O_{\mathbb P^4}
\longrightarrow i_*\mathcal O_Q\longrightarrow0
$$

を得る。これに対応する[層コホモロジー長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)の最初の部分は

$$
0\longrightarrow H^0(\mathbb P^4,\mathcal O(-5))
\longrightarrow H^0(\mathbb P^4,\mathcal O)
\longrightarrow H^0(Q,\mathcal O_Q)
\longrightarrow H^1(\mathbb P^4,\mathcal O(-5))
$$

となる。[射影空間のねじり層計算](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)に $n=4,d=-5$ を入れると $H^0(\mathcal O(-5))=0$、$H^1(\mathcal O(-5))=0$。同じ公式の $d=0$ では $H^0(\mathcal O)=\mathbb C$。従って

$$
H^0(Q,\mathcal O_Q)\simeq\mathbb C.
$$

$Q$ は射影的で $\mathcal O_Q$ は連接層なので[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)へ $X=Q$、$\mathcal F=\mathcal O_Q$、$q=0$ を入力できる。構造層の解析化は $\mathcal O_M$ だから、

$$
H^0(M,\mathcal O_M)\simeq H^0(Q,\mathcal O_Q)\simeq\mathbb C.
$$

前命題の $\Omega$ は至る所で非零なので $\mathcal O_M\to K_M,\ h\mapsto h\Omega$ は局所的に正則逆写像を持つ束同型である。従って大域切断でも同型となり、

$$
H^0(M,K_M)=H^0(M,\mathcal O_M)\Omega=\mathbb C\Omega.
$$

$c\Omega=c'\Omega$ なら非消失性から $c=c'$。$\square$
<!-- proof-end -->

ここで示した一次元性は、大域正則3形式を集めたベクトル空間の次元である。Hodge分解を先取りして $h^{2,1}$ などを求めたわけではない。

## 5. Fermatという特別な式の外でも何が残るか

対角和だから偏微分を簡単に計算できたが、貼り合わせの仕組みは次数と滑らかさに依存し、係数がすべて1であることには依存しない。

<a id="prop-cag1-13-smooth-quintic-general"></a>

<!-- formal-statement-start -->
> **命題（滑らかな五次超曲面の正則体積形式）**  
> $G\in\mathbb C[X_0,\ldots,X_4]$ を次数5の斉次多項式とし、$Y=V_+(G)\subset\mathbb P^4_{\mathbb C}$ が滑らかな超曲面であるとする。$N=Y^{\mathrm{an}}$ には零にならない大域正則3形式が存在し、

$$
K_N\simeq\mathcal O_N,\qquad
\dim_{\mathbb C}H^0(N,K_N)=1
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

任意の五次式でも $g_k=s^{-5}g_i$、周囲の体積形式の変換係数も $s^{-5}$ である。偏微分が非零な局所領域で前節の形式を作ると、次数が消える仕組みは同じである。大域関数の計算も、制限完全列の最初の射を $G$ 倍へ替えるだけで済む。

<!-- proof-start -->
### 証明

滑らかさと[射影Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)により各点で $dg_i$ の一成分が非零である。[局所随伴形式](../CAG1-11/index.md#prop-cag1-11-holomorphic-residue)を $g_i=G/X_i^5$ に適用すると、各点近傍に正則かつ非消失の3形式が得られる。チャート内の消去方向の一致と、前節の証明中の $s^{-5}$ と符号の計算は $G$ が五次斉次であることだけを使う。従って $(-1)^i\eta_i$ が全体で貼り合う。

別の経路でも[解析的随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)へ周囲の次元と次数 $(n,d)=(4,5)$ を入れると

$$
K_N\simeq\mathcal O_N(5-4-1)=\mathcal O_N
$$

を得る。大域関数については先の証明の制限完全列の $F$ を $G$ に替える。$G\ne0$ なので $\mathcal O(-5)\xrightarrow{\cdot G}\mathcal O$ は単射である。

[ねじり層コホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)の零群を代入して $H^0(Y,\mathcal O_Y)=\mathbb C$ を得る。$Y$ は射影的で構造層は連接だから、[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を零次に適用できる。最後に非消失3形式で束を自明化して

$$
H^0(N,K_N)\simeq H^0(N,\mathcal O_N)=\mathbb C
$$

と分かる。$\square$
<!-- proof-end -->

**直接例。** $G=X_0^5+2X_1^5+3X_2^5+4X_3^5+5X_4^5$ では偏微分が $5a_iX_i^4$（$a_i=1,2,3,4,5$）となる。五つが同時に零なら全座標が零なので、滑らかさの仮定を実際に確認できる。$U_0$ 上の $x_4\ne0$ では正則3形式の局所表示は

$$
\eta_{0,4}=-\frac{dx_1\wedge dx_2\wedge dx_3}{25x_4^4}.
$$

係数25は $5a_4$ に由来するが、チャートの貼り合わせで比較する次数5は変わらない。

### 結論を広げすぎないための二つの比較

- **六次に替える場合。** 滑らかな六次超曲面 $Y_6\subset\mathbb P^4$ では[随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)の係数が $d-n-1=6-4-1=1$ となり、$K_{Y_6^{\mathrm{an}}}\simeq\mathcal O_{Y_6^{\mathrm{an}}}(1)$ である。同じ局所形式はチャート間で $s^{6-5}=s$ の残りを持ち、定数係数だけでは大域的に貼り合わない。次数5の相殺が本質である。
- **特異な五次に替える場合。** $G=X_0^5+X_1^5+X_2^5+X_3^5$ として $X_4$ を含まない五次超曲面を考えると、$[0:0:0:0:1]$ で全偏微分が零になる。[Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)の滑らかさを失い、その点では一つの偏微分を分母の単元として選べない。特異空間にも双対化層という別の対象はあるが、この章の「滑らかな複素三次元多様体上の零でない正則3形式」の証明をそのまま適用してはならない。

また $K_M\simeq\mathcal O_M$ は**標準束についての結論**である。Ricci平坦なKähler計量の存在には別の解析的定理が要り、ホロノミーがちょうど $SU(3)$ であること、Hodge数 $h^{1,1}$・$h^{2,1}$、変形空間の次元は、ここで示したことからは自動的に従わない。

## 6. 演習と詳細解答

### Level A

<a id="ex-cag1-13-a01"></a>
#### CAG1-13-A01 射影Jacobianから三次元性まで
- Level: A

$Q=V_+(\sum_{i=0}^4X_i^5)\subset\mathbb P^4$ の滑らかさを示し、$U_2=\{X_2\ne0\}$ で偏微分が一つも非零でない点が $Q$ 上にはない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 斉次偏微分は $F_{X_i}=5X_i^4$。標数0なので、全て零なら全座標が零となり射影点に反する。[射影Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)から $Q$ は滑らかである。

$U_2$ では $t_a=X_a/X_2$（$a\ne2$）を座標として

$$
1+\sum_{a\ne2}t_a^5=0,\qquad
\frac{\partial f_2}{\partial t_a}=5t_a^4
$$

を得る。四偏微分が全て零なら全ての $t_a=0$、従って方程式の左辺が1となり矛盾する。少なくとも一つの変数を局所的に消去でき、残る三つが自由座標となるので複素次元3である。
<!-- solution-end -->

<a id="ex-cag1-13-a02"></a>
#### CAG1-13-A02 分母が変わっても3形式は変わらない
- Level: A

$U_0$ 上で $x_3x_4\ne0$ とし、$\eta_{0,3}$ と $\eta_{0,4}$ の式をそれぞれ書き、$df_0=0$ だけで一致を示せ。

<!-- solution-start -->
**詳細解答。** 添字順の符号を含む[CAG1-11の正則形式の構成](../CAG1-11/index.md#prop-cag1-11-holomorphic-residue)から

$$
\eta_{0,3}=\frac{dx_1\wedge dx_2\wedge dx_4}{5x_3^4},
\quad
\eta_{0,4}=-\frac{dx_1\wedge dx_2\wedge dx_3}{5x_4^4}.
$$

$df_0=\sum_{j=1}^4 5x_j^4dx_j=0$ に $dx_1\wedge dx_2$ を左から掛けると $5x_3^4dx_1\wedge dx_2\wedge dx_3+5x_4^4dx_1\wedge dx_2\wedge dx_4=0$。$x_3x_4\ne0$ なので $25x_3^4x_4^4$ で割り、二つの3形式が等しいと分かる。
<!-- solution-end -->

<a id="ex-cag1-13-a03"></a>
#### CAG1-13-A03 $U_0$ と $U_1$ の負号
- Level: A

$u=1/x_1$、$v_j=x_j/x_1$（$j=2,3,4$）のとき、$du\wedge dv_2\wedge dv_3$ の係数を求め、$\eta_{1,4}=-\eta_{0,4}$ を確認せよ。

<!-- solution-start -->
**詳細解答。** $du=-x_1^{-2}dx_1$ と $dv_j=x_1^{-1}dx_j-x_jx_1^{-2}dx_1$ を代入する。$du$ が既に $dx_1$ を含むので、$dv_2,dv_3$ の $dx_1$ 項は楔積で零。従って

$$
du\wedge dv_2\wedge dv_3=-x_1^{-4}dx_1\wedge dx_2\wedge dx_3.
$$

$f_{1,v_4}=5v_4^4=5x_4^4/x_1^4$ なので $\eta_{1,4}=-du\wedge dv_2\wedge dv_3/(5v_4^4)=dx_1\wedge dx_2\wedge dx_3/(5x_4^4)=-\eta_{0,4}$。補正後は $(-1)^1\eta_{1,4}=(-1)^0\eta_{0,4}$。
<!-- solution-end -->

<a id="ex-cag1-13-a04"></a>
#### CAG1-13-A04 標準束の次数を取り違えない
- Level: A

$Y_d\subset\mathbb P^4$ を滑らかな次数 $d=4,5,6$ の超曲面とする。各 $K_{Y_d}$ を $\mathcal O_{Y_d}(m)$ の形で示し、どの場合に $m=0$ か答えよ。

<!-- solution-start -->
**詳細解答。** [随伴公式](../../AG/AG2-10/index.md#thm-ag2-10-adjunction)に入力する周囲の次元は $n=4$、超曲面の次数は $d$ である。従って $m=d-n-1=d-5$。

$$
\begin{array}{c|ccc}
d&4&5&6\\ \hline
K_{Y_d}&\mathcal O_{Y_4}(-1)&\mathcal O_{Y_5}(0)&\mathcal O_{Y_6}(1)
\end{array}
$$

この計算で $m=0$ となるのは $d=5$ だけである。$n$ を超曲面の次元3と取り違えると符号がずれる。
<!-- solution-end -->

<a id="ex-cag1-13-a05"></a>
#### CAG1-13-A05 大域関数の制限完全列
- Level: A

$Q\subset\mathbb P^4$ の五次方程式から $0\to\mathcal O(-5)\to\mathcal O\to i_*\mathcal O_Q\to0$ を書き、$H^0(Q,\mathcal O_Q)=\mathbb C$ を導け。

<!-- solution-start -->
**詳細解答。** 左の射は $F$ 倍、右は $Q$ への制限である。$F$ は整域の非零元なので掛け算は単射。制限で消える局所切断は $F$ の倍数だから完全である。

[長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)の冒頭を取り、[射影空間のねじり層計算](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)で

$$
H^0(\mathbb P^4,\mathcal O(-5))
=H^1(\mathbb P^4,\mathcal O(-5))=0
$$

を代入する。中央にある射の前後が零となり、

$$
H^0(\mathbb P^4,\mathcal O)
\xrightarrow{\simeq}H^0(Q,\mathcal O_Q).
$$

左辺は定数多項式の $\mathbb C$ であるから、右辺も $\mathbb C$ となる。
<!-- solution-end -->

### Level B

<a id="ex-cag1-13-b01"></a>
#### CAG1-13-B01 任意のチャートで次数を相殺する
- Level: B

$i\ne k$ とし、$s=X_k/X_i$ と置く。五次斉次式 $G$ の局所方程式 $g_i,g_k$ と四形式 $\tau_i,\tau_k$ がどう変換するかを示し、$(-1)^i\eta_i$ の貼り合わせを導け。

<!-- solution-start -->
**詳細解答。** $g_i=G/X_i^5$、$g_k=G/X_k^5$ より $g_k=s^{-5}g_i$。微分してから超曲面上の $g_i=0$ を使うと、

$$
dg_k=s^{-5}dg_i-5s^{-6}g_i\,ds=s^{-5}dg_i.
$$

一方 $y_i=s^{-1}$、$y_b=x_b/s$ を微分する。四形式では $dy_i$ 以外から $ds$ を選ぶ項が消える。生き残る係数は $(-s^{-2})s^{-3}=-s^{-5}$ である。

$i<k$ なら $dx_k$ を昇順の位置へ戻す交換は $k-i-1$ 回、$i>k$ なら $i-k-1$ 回である。負号と合わせて両場合とも $(-1)^{i+k}$ となるから、

$$
\tau_k=(-1)^{i+k}s^{-5}\tau_i.
$$

周囲の行列式で $dg_i\wedge\eta_i=\tau_i$ を使うと

$$
dg_i\wedge\eta_k=(-1)^{i+k}dg_i\wedge\eta_i.
$$

滑らかさから[余法完全列](../CAG1-11/index.md#prop-cag1-11-analytic-conormal)の行列式写像は単射なので、$\eta_k=(-1)^{i+k}\eta_i$。すなわち $(-1)^k\eta_k=(-1)^i\eta_i$。
<!-- solution-end -->

<a id="ex-cag1-13-b02"></a>
#### CAG1-13-B02 対角係数を変えたquintic
- Level: B

$G=X_0^5+2X_1^5+3X_2^5+4X_3^5+5X_4^5$ の滑らかさ、$U_0$ の $x_4\ne0$ における局所正則3形式、チャート間で残るべき冪を順に判定せよ。

<!-- solution-start -->
**詳細解答。** $a_i=1,2,3,4,5$ と置くと $G_{X_i}=5a_iX_i^4$ で、各 $a_i\ne0$。全偏微分が零なら全座標も零となり、[Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)から滑らかである。

$U_0$ の局所式とその微分は

$$
g_0=1+2x_1^5+3x_2^5+4x_3^5+5x_4^5,\qquad
\frac{\partial g_0}{\partial x_4}=25x_4^4.
$$

よって[CAG1-11の局所正則形式](../CAG1-11/index.md#prop-cag1-11-holomorphic-residue)は

$$
\eta_{0,4}=-\frac{dx_1\wedge dx_2\wedge dx_3}{25x_4^4}.
$$

斉次次数5は $g_k=s^{-5}g_i$ を与え、四形式の $s^{-5}$ と相殺される。残る冪は $s^0=1$、向きの符号だけが $(-1)^{i+k}$ として残る。
<!-- solution-end -->

<a id="ex-cag1-13-b03"></a>
#### CAG1-13-B03 局所正則関数を大域化できるか
- Level: B

$Q\cap U_0$ 上の $e^{x_1}$ は正則である。これが $M=Q^{\mathrm{an}}$ 全体の正則関数へ延長すると仮定して矛盾を導け。局所形式 $\eta_{0,4}$ を倍しても大域形式が自由に増えない理由も述べよ。

<!-- solution-start -->
**詳細解答。** [GAGA Iの零次比較](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)と制限完全列の計算から、

$$
H^0(M,\mathcal O_M)=\mathbb C.
$$

従って延長できた関数は定数でなければならない。しかし $Q\cap U_0$ では $x_4$ の偏微分が非零な点の近傍を取ると、方程式から $x_4$ を解けるため $x_1$ は局所自由座標になる。$e^{x_1}$ の $x_1$ 微分は $e^{x_1}\ne0$。ゆえに定数ではなく、矛盾する。

局所形式を局所関数で倍することと、重なりで一致する**大域**切断を作ることは別条件である。任意の大域3形式 $\alpha$ は非消失の $\Omega$ で割った大域正則関数を係数に持つ。その係数は上の計算で定数なので $\alpha=c\Omega$ に限られる。
<!-- solution-end -->

<a id="ex-cag1-13-b04"></a>
#### CAG1-13-B04 六次では大域3形式が五つになる
- Level: B

$Y_6\subset\mathbb P^4$ を滑らかな六次超曲面、$N_6=Y_6^{\mathrm{an}}$ とする。$K_{N_6}\simeq\mathcal O_{N_6}(1)$ と $\dim H^0(N_6,K_{N_6})=5$ を示せ。

<!-- solution-start -->
**詳細解答。** [解析的随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)に $n=4,d=6$ を入れると $K_{N_6}\simeq\mathcal O_{N_6}(6-4-1)=\mathcal O_{N_6}(1)$。六次式による制限完全列を $\mathcal O(1)$ でねじると

$$
0\to\mathcal O_{\mathbb P^4}(-5)
\xrightarrow{\cdot G}\mathcal O_{\mathbb P^4}(1)
\to i_*\mathcal O_{Y_6}(1)\to0.
$$

[ねじり層コホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)で $H^0(\mathcal O(-5))=H^1(\mathcal O(-5))=0$、$H^0(\mathcal O(1))$ は五つの斉次一次式 $X_0,\ldots,X_4$ を基底に持つ。長完全列から $H^0(Y_6,\mathcal O_{Y_6}(1))\simeq\mathbb C^5$。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)で解析側へ移せば $H^0(N_6,K_{N_6})$ の次元は5。五次の「一次元」は全次数に共通ではない。
<!-- solution-end -->

### Level C

<a id="ex-cag1-13-c01"></a>
#### CAG1-13-C01 五次三次元超曲面を両側から閉じる
- Level: C

$Q=V_+(\sum X_i^5)\subset\mathbb P^4$ と $M=Q^{\mathrm{an}}$ について、次を一続きで証明せよ。

1. 射影Jacobianから $M$ の複素次元が3である。
2. 局所式 $\eta_{i,r}$ がチャート内・間で大域非消失正則3形式 $\Omega$ に貼り合う。
3. 代数側の制限完全列とGAGAを使い $H^0(M,K_M)=\mathbb C\Omega$ である。
4. この結論がRicci平坦計量の存在証明ではない理由を述べる。

<!-- solution-start -->
**詳細解答。** $\partial F/\partial X_i=5X_i^4$ が全て零な射影点はないので[Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)から滑らか。局所方程式は四変数の一方程式で、非零偏微分により一変数を消去し、複素次元は3。

$U_i$ で $\partial f_i/\partial z_r\ne0$ の領域の $\eta_{i,r}=(-1)^{r-1}\bigwedge_{a\ne r}dz_a/(\partial f_i/\partial z_r)$ は正則単元で割った局所基底。[CAG1-11の正則形式の構成](../CAG1-11/index.md#prop-cag1-11-holomorphic-residue)から消去変数によらない。$s=X_k/X_i$ について $df_k=s^{-5}df_i$、$\tau_k=(-1)^{i+k}s^{-5}\tau_i$ なので $\eta_k=(-1)^{i+k}\eta_i$、従って $(-1)^i\eta_i$ が非消失な $\Omega$ を与える。

五次式による制限完全列は

$$
0\to\mathcal O_{\mathbb P^4}(-5)\xrightarrow{F}\mathcal O_{\mathbb P^4}\to i_*\mathcal O_Q\to0
$$

である。この列から[長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)を取る。[ねじり層の計算](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)に $n=4,d=-5$ と $d=0$ を入れると、

$$
H^0(\mathbb P^4,\mathcal O(-5))=H^1(\mathbb P^4,\mathcal O(-5))=0,
\qquad H^0(\mathbb P^4,\mathcal O)=\mathbb C.
$$

従って長完全列の完全性から $H^0(Q,\mathcal O_Q)=\mathbb C$。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)に $q=0$、$\mathcal F=\mathcal O_Q$ を代入すると $H^0(M,\mathcal O_M)=\mathbb C$。

$\Omega$ が零にならないので掛け算は $\mathcal O_M\simeq K_M$ を与え、$H^0(M,K_M)=\mathbb C\Omega$。

以上は正則微分形式・層コホモロジー・随伴公式についての代数／解析比較であり、非線形なRicci曲率方程式を解いた段階は一度もない。従ってRicci平坦なKähler計量の存在も、全ホロノミーも未証明のままである。
<!-- solution-end -->

<a id="ex-cag1-13-c02"></a>
#### CAG1-13-C02 次数と滑らかさを別々に失う
- Level: C

次の二例を比較せよ。

1. $Y=V_+(X_0^5+X_1^5+X_2^5+X_3^5)\subset\mathbb P^4$。
2. $Z=V_+(X_0^6+\cdots+X_4^6)\subset\mathbb P^4$。

Jacobianの検査、随伴公式の滑らかな多様体への適用、局所3形式の分母、$K$ の次数、大域正則3形式の次元について、成り立つ主張と失われる仮定を区別せよ。

<!-- solution-start -->
**詳細解答。**

1. $Y$ は $P=[0:0:0:0:1]$ を含む。偏微分は $5X_j^4$（$j=0,1,2,3$）および $F_{X_4}=0$ で、全て $P$ で零。[Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)の滑らかさを失う。

   $P$ では $df$ の偏微分を単元として選べず、[CAG1-11の局所正則形式](../CAG1-11/index.md#prop-cag1-11-holomorphic-residue)を滑らかな3形式として作る手順が止まる。滑らかな多様体の $K_Y=\bigwedge^3\Omega_Y^1$ に関する同型・一次元性は、このまま主張できない。特異超曲面の双対化層に別の公式があり得ることとは区別する。
2. $Z$ の斉次偏微分は $6X_i^5$。同時零の射影点がないから滑らかであり、複素次元は3。局所的には偏微分を分母とする正則3形式を作れる。

   しかし[随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)では次数の差 $6-4-1=1$ が残り、

   $$
   K_{Z^{\mathrm{an}}}\simeq\mathcal O_{Z^{\mathrm{an}}}(1).
   $$

   六次の方程式を使って $\mathcal O(1)$ を制限すると $0\to\mathcal O(-5)\to\mathcal O(1)\to i_*\mathcal O_Z(1)\to0$ を得る。[ねじり層の消滅](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)と[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を順に使えば

   $$
   \dim H^0(Z^{\mathrm{an}},K)=5.
   $$

   滑らかさは保たれたが次数5の相殺を失ったため、非消失な一定係数の大域体積形式を得る結論は成立しない。
<!-- solution-end -->

## 7. Hodge数への橋

この章で確認したのは、滑らかなquinticの複素次元3、標準束の自明性、非消失正則3形式の構成と一意性、そしてそれらの代数的・解析的な対応である。[前章の曲線の種数比較](../CAG1-12/index.md#thm-cag1-12-gaga-genus)と同じく、GAGAが保存するのは**層とそのコホモロジー**であり、Hodge数の計算を魔法のように完了させるわけではない。

$h^{1,1}$ と $h^{2,1}$ を導出するには、Hodge分解、Lefschetz型の結果、位相・Chern類・変形理論との接続など、さらに別の入力が必要となる。次章ではそれらを「この系列で証明したこと」と「後続理論へ委ねること」に分けて整理する。
