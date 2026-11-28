# MQFC41 局所S行列とBogoliubov公式

前提講座：[MQFC40 Epstein–Glaser帰納構成](../MQFC40/index.md)。

時間順序積を挿入数ごとに構成できると、相互作用を加えたときの観測量を比較できる。しかし相互作用を含む時間順序積だけでは、観測より未来の相互作用まで寄与してしまう。そこで相互作用だけの時間発展を左から逆元で取り除く。この操作から、過去の相互作用に応答する場を得る。

## 1. 局所S行列を形式級数で作る

時空は Minkowski 時空 $M=\mathbb R^{1+3}$ とする。入力 $V,F,G,H$ は滑らかなコンパクト支持の試験関数で積分した局所Wick多項式の有限和である。台は構成に使う試験関数の台の和で評価する。前講で構成した対称な多重線形時間順序積 $T_n$ を固定し、$T_0=1$、$T_1(F)=F$ とする。必要な分布係数が延長され、[時間順序積の因果帰納条件](../MQFC40/index.md#def-mqfc40-causal-recursion) と [挿入数ごとのユニタリティ条件](../MQFC40/index.md#def-mqfc40-order-unitarity) を満たすと仮定する。

値は [自由場のスター積](../MQFC38/index.md#def-mqfc38-star) を備えた単位的結合代数 $\mathcal A$ の形式級数に取る。$\hbar$ はスター積に含まれる形式変数のままとし、ここでは挿入の個数を別の変数 $\lambda,t,\ldots$ で数える。指数に $i/\hbar$ を置く別規約もあるが、本講では前講と同じ $i$ の規約を使う。逆元・微分は収束を仮定せず係数ごとに計算する。

<a id="def-mqfc41-local-s"></a>

<!-- formal-statement-start -->
> **定義（局所S行列）**
> 入力 $X$ を有限個の局所挿入の線形結合とし、その係数を定数項が零の可換形式変数とする。局所S行列を

$$
S(X)=\sum_{n\ge0}\frac{i^n}{n!}T_n(X,\ldots,X)
$$

> と定める。多重線形性により各形式次数の係数は有限和であり、積は $\star$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc41-local-s -->
### 直接例：二つの局所一次挿入

$X=\lambda V+tF$、$V=L_v,F=L_f$ とする。ここで $L_f(\phi)=\int_M f\phi$、$v,f$ は滑らかなコンパクト支持関数である。定数項は1、一次項は $i\lambda V+itF$。二次項は $i^2/2!=-1/2$ と対称性から

$$
-\frac{\lambda^2}{2}T_2(V,V)
-\lambda tT_2(V,F)-\frac{t^2}{2}T_2(F,F)
$$

となる。[円筒多項式の時間順序積](../MQFC39/index.md#def-mqfc39-time-product) によると $T_2(V,F)=VF+\hbar D(v,f)$ である。$D$ は時間順序核であり、$v\otimes f$ に作用する分布である。従って各係数は自由場代数の元で、混合係数では二つの順列が $2!$ を打ち消す。これが定義の有限和の具体例である。
<!-- definition-example-end -->

$S(X)$ の定数項は1である。$Q=S(X)-1$ と置くと $Q$ は正の挿入次数のみを持つ。従って

$$
S(X)^{-1}=\sum_{k\ge0}(-1)^kQ^{\star k}
$$

が定義できる。次数 $d$ の計算には $k\le d$ しか寄与せず、左右から $1+Q$ を掛けると隣り合う項が打ち消されて1となる。これは [結合定数展開の逆元の逐次構成](../MQFC31/index.md#thm-mqfc31-formal-inverse) のスター積版である。逆元が二つあれば $A=A\star S\star B=B$ だから一意である。

例えば $X=\lambda V$ の場合、二次までの逆元は

$$
S(\lambda V)^{-1}=1-i\lambda V
+\lambda^2\left(\frac12T_2(V,V)-V\star V\right)
+O(\lambda^3).
$$

ここで $O(\lambda^k)$ は $\lambda$ の次数 $k$ 以上の項を表し、数値的な誤差評価ではない。$Q$ の一次項 $i\lambda V$ を二回掛けると $-\lambda^2 V\star V$ が出るので、通常積への置き換えはできない。

## 2. 相対S行列と因果関係

背景相互作用を $X$、追加する挿入を $Y$ とする。両者は正次数の形式変数を含むものとする。背景がある場合とない場合の時間発展を比較するため、背景だけの逆元を左から掛ける。

<a id="def-mqfc41-relative-s"></a>

<!-- formal-statement-start -->
> **定義（相対S行列）**
> 局所S行列 $S$ に対し、背景 $X$ における追加挿入 $Y$ の相対S行列は

$$
S_X(Y)=S(X)^{-1}\star S(X+Y)
$$

> である。$S_X(0)=1$ であり、各形式次数で定義される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc41-relative-s -->
### 直接例：背景一次と観測一次

$X=\lambda V,Y=tF$ とする。定数・一次および $\lambda t$ の係数を計算する。$S(\lambda V)^{-1}$ の一次は $-i\lambda V$。$S(\lambda V+tF)$ の一次の $F$ は $itF$ である。混合項は $-\lambda tT_2(V,F)$ と $(-i\lambda V)\star(itF)$ の和なので、

$$
[\lambda t]S_{\lambda V}(tF)=V\star F-T_2(V,F).
$$

角括弧は指定した単項式の係数を表す。$t=0$ とすると全次数で $S(\lambda V)^{-1}\star S(\lambda V)=1$。$\lambda=0$ とすると $S_0(tF)=S(tF)$ である。逆元を左に置いたため $V\star F$ という順番になる。
<!-- definition-example-end -->

因果順序を $x\preceq y$（$y$ が $x$ の因果的未来にある）とする。二組の台で全ての点対について左に置く組の点が右に置く組の点の因果的過去に入らないなら、[時間順序積の因果帰納条件](../MQFC40/index.md#def-mqfc40-causal-recursion) が適用できる。

<a id="thm-mqfc41-s-factorization"></a>

<!-- formal-statement-start -->
> **定理（局所S行列の因果因子化）**
> $A,B$ は正次数の形式変数を含む局所挿入とする。全ての $x\in\operatorname{supp} A,y\in\operatorname{supp} B$ に対して $x\not\preceq y$ なら、

$$
S(A+B)=S(A)\star S(B).
$$
<!-- formal-statement-end -->

### 証明の見取り図

挿入数 $n$ のうち $A$ から取る個数を $p$、$B$ から取る個数を $q$ と数える。因果条件は各混合項を二組の積に分解する。

<!-- proof-start -->
### 証明

$n=p+q$ とする。対称性と多重線形性により、$p$ 個の $A$ を選ぶ組合せ数は $n!/(p!q!)$ である。$p,q>0$ では試験関数の積の台が前講の開集合 $C_I$ に含まれる。よって [時間順序積の因果帰納条件](../MQFC40/index.md#def-mqfc40-causal-recursion) から

$$
T_{p+q}(A^p,B^q)=T_p(A^p)\star T_q(B^q).
$$

上付きの $p,q$ は同じ入力を繰り返す個数であり、代数の累乗ではない。$p=0$ または $q=0$ のときも $T_0=1$ で式が成立する。従って

$$
S(A+B)=\sum_{p,q\ge0}
\frac{i^{p+q}}{p!q!}
T_p(A^p)\star T_q(B^q).
$$

これは $S(A)\star S(B)$ の形式的な積の展開である。各次数には有限個の項しか寄与しないので、和の組み替えが許される。
<!-- proof-end -->

次は観測より未来にある追加相互作用の消去である。背景全体が観測より過去にあるとは限らないので、背景を時刻で分ける必要がある。

<a id="thm-mqfc41-relative-causality"></a>

<!-- formal-statement-start -->
> **定理（相対S行列の未来挿入の消去）**
> $X,Y,H$ を正次数の形式変数を含む局所挿入とする。ある二時刻 $a<b$ が存在し、$Y$ の台の時刻は全て $a$ 以下、$H$ の台の時刻は全て $b$ 以上とする。背景 $X$ の台には制限を加えない。このとき

$$
S_{X+H}(Y)=S_X(Y).
$$
<!-- formal-statement-end -->

### 証明の見取り図

各配置の近傍で背景の添字を観測側と未来側に分け、前後の因果因子化を使う。近傍ごとの分布係数の一致から全体での一致を得る。

<!-- proof-start -->
### 証明

前講の [挿入数ごとのユニタリティ条件](../MQFC40/index.md#def-mqfc40-order-unitarity) と同じく、各挿入に独立な可換変数 $\eta_j$ を付け、$\eta_j^2=0$ とする。全添字集合を $N$ とすると、係数の積は互いに素な部分集合の積だけを残す。このため各係数は異なる変数を持つ分布係数の積として扱える。ここでは前講の分布係数の積の存在、結合性、制限との両立を仮定する。

有限個の背景入力の位置と $Y,H$ の位置を固定する。$H$ の全点が $Y$ の全点より後なので、切断時刻を

$
a<e<b
$

と選べる。各背景位置は切断時刻の前か後に置ける。一致する位置があれば、有限個の時刻を避けるように切断時刻をずらす。

この配置の近傍で背景添字を前の組 $L$ と後の組 $U$ に分ける。すると全ての $U,H$ の点が全ての $L,Y$ の点より後になる。従って [局所S行列の因果因子化](#thm-mqfc41-s-factorization) の証明を各部分集合に適用すると、分布核の制限として

$$
S(X+H+Y)=S(X_U+H)\star S(X_L+Y),
$$

$$
S(X+H)=S(X_U+H)\star S(X_L)
$$

という係数別の因子化が成立する。ここで $X_U,X_L$ は固定した添字集合の入力を表し、式は独立な添字変数を一回ずつ取る混合係数について読む。逆元も各添字の部分集合に対する積の有限和で定義されるから、その制限と両立する。部分集合に対しても同じ分割が有効である。

従ってこの近傍では

$$
S(X+H)^{-1}\star S(X+H+Y)
=S(X_L)^{-1}\star S(X_L+Y).
$$

$H$ を外した式も右辺と一致する。右辺に $H$ の添字変数は現れないので、$H$ を一回以上含む混合係数は零となる。背景・観測・追加挿入それぞれに独立な添字変数を付けてこの議論を行い、有限個の位置に対する開近傍での一致を [有限開被覆上の分布の貼り合わせ](../MQFC36/index.md#thm-mqfc36-gluing) により、試験関数のコンパクトな台を覆う有限部分被覆で確認する。試験関数を掛けて積分し、対称性による混合係数と通常の形式係数の対応（各同種入力の階乗で割る）を使えば、主張の全係数が一致する。必要な分布係数と積の存在および制限との両立は前講と同じ仮定である。
<!-- proof-end -->

## 3. Bogoliubov公式と遅延積

相対S行列には追加挿入を何回も選んだ項がある。観測量 $F$ を一回だけ選びたいので、観測用変数 $t$ の一次係数を取り出す。形式微分は $t^k$ を $kt^{k-1}$ に写し、$t=0$ では一次係数だけが残る。

<a id="def-mqfc41-bogoliubov"></a>

<!-- formal-statement-start -->
> **定義（Bogoliubov公式）**
> 背景 $\lambda V$ における相互作用観測量を

$$
R_{\lambda V}(F)=
\left.\frac1i\frac{d}{dt}S_{\lambda V}(tF)\right|_{t=0}
$$

> と定める。その展開の係数を

$$
R_{\lambda V}(F)=
\sum_{n\ge0}\frac{\lambda^n}{n!}R_n(V^n;F)
$$

> と書き、$R_n$ を遅延積と呼ぶ。異なる背景挿入に対しては独立な形式変数の混合係数で対称多重線形に定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mqfc41-bogoliubov -->
### 直接例：局所一次の応答

$V=L_v,F=L_f$ とする。相対S行列の混合係数から、$1/i=-i$ を掛けると

$$
R_0(F)=F,\qquad
R_1(V;F)=i\bigl(T_2(V,F)-V\star F\bigr).
$$

時間順序積とスター積は通常積の部分が一致するため、差は $\hbar(D-W)(v,f)$。[時間順序核のGreen作用素表示](../MQFC39/index.md#prop-mqfc39-feynman-green) で $D-W=-iG_{\mathrm{adv}}$ だから

$$
R_1(V;F)=\hbar G_{\mathrm{adv}}(v,f)
=\hbar G_{\mathrm{ret}}(f,v).
$$

最後は [Green作用素の転置と時間方向の反転](../../../解析系/HPDE/HPDE19/index.md#thm-hpde19-green-transpose-pairing) による。観測点 $f$ から見て背景 $v$ が因果的過去にないなら、遅延核の支持から零となる。$\lambda=0$ では $F$ に戻り、一次応答は $v,f$ に線形である。
<!-- definition-example-end -->

<a id="thm-mqfc41-retarded-expansion"></a>

<!-- formal-statement-start -->
> **定理（遅延積の二次展開）**
> 対称多重線形時間順序積 $T_n$ と単位的結合スター積のもとで、Bogoliubov公式の二次までの係数は

$$
R_0(F)=F,
$$

$$
R_1(V;F)=i(T_2(V,F)-V\star F),
$$

$$
\begin{aligned}
R_2(V,V;F)={}&-T_3(V,V,F)+2V\star T_2(V,F)\\
&+T_2(V,V)\star F-2V\star V\star F.
\end{aligned}
$$

> である。$T_n$ が前述の因果帰納条件を満たすとき、$R_1(V;F)$ は背景の台が観測の台の因果的過去に入らない場合に零となる。実の入力で $S$ がユニタリティ条件を満たすなら $R_{\lambda V}(F)^*=R_{\lambda V}(F)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

観測用変数の微分を先に行い、背景の逆元との積を次数ごとに取る。未来応答は因果順序、随伴はユニタリティから調べる。

<!-- proof-start -->
### 証明

多重線形性により $n+1$ 個の入力のどの位置を $tF$ にするかは $n+1$ 通りある。対称性で同じ係数となり、$(n+1)!$ の分母は $n!$ となる。従って

$$
\left.\frac1i\frac{d}{dt}S(\lambda V+tF)\right|_{t=0}
=F+i\lambda T_2(V,F)-\frac{\lambda^2}{2}T_3(V,V,F)
+O(\lambda^3).
$$

これに第1節で求めた逆元を左から掛ける。一次は $iT_2(V,F)-iV\star F$。二次は

$$
-\frac12T_3(V,V,F)+V\star T_2(V,F)
+\left(\frac12T_2(V,V)-V\star V\right)\star F.
$$

定義では $\lambda^2/2!$ の係数が $R_2$ なので2倍して主張を得る。異なる背景 $V,G$ なら $V+G$ を代入し、純粋な二次項を引いて2で割ることにより

$$
\begin{aligned}
R_2(V,G;F)={}&-T_3(V,G,F)+V\star T_2(G,F)\\
&+G\star T_2(V,F)+T_2(V,G)\star F\\
&-(V\star G+G\star V)\star F.
\end{aligned}
$$

となる。台の全点対で $V$ の位置が $F$ の位置の因果的過去に入らなければ [時間順序積の因果帰納条件](../MQFC40/index.md#def-mqfc40-causal-recursion) で $T_2(V,F)=V\star F$、従って一次応答は零となる。

最後に実の形式変数 $\lambda,t$ と自己随伴な $V,F$ を取る。[挿入数ごとのユニタリティ条件](../MQFC40/index.md#def-mqfc40-order-unitarity) を各挿入次数に適用すると、$S(\lambda V)$ と $S(\lambda V+tF)$ はそれぞれ随伴が逆元に一致する。よってその積である相対S行列もユニタリティを満たす。$S_{\lambda V}(tF)=1+itR_{\lambda V}(F)+O(t^2)$ を代入すると、$S_{\lambda V}(tF)^*\star S_{\lambda V}(tF)$ の一次係数は

$$
-iR_{\lambda V}(F)^*+iR_{\lambda V}(F).
$$

これが零となるので自己随伴性が従う。
<!-- proof-end -->

この場は背景付きの形式的な観測量である。係数をすべて構成できても、数値の結合定数における収束や非摂動的な相互作用Hilbert空間の存在は別の問題である。次講では時間順序積の延長処方を変えたときに局所S行列がどう変わるかを調べる。

## 4. 演習

### 演習 MQFC41-A1：混合係数
- Level: A

$S(\lambda V+tF)$ の $\lambda^2t$ の係数を求めよ。

<!-- solution-start -->
**詳細解答**

総次数3なので $T_3$ だけを用いる。$F$ を選ぶ位置は3通りで、対称性によりすべて $T_3(V,V,F)$。係数は

$$
\frac{i^3}{3!}3T_3(V,V,F)
=-\frac{i}{2}T_3(V,V,F).
$$
<!-- solution-end -->

### 演習 MQFC41-A2：逆元の検算
- Level: A

$S(\lambda V)=1+i\lambda V-\lambda^2T_2(V,V)/2+O(\lambda^3)$ の逆元を二次まで求めよ。

<!-- solution-start -->
**詳細解答**

逆元を $1+\lambda a+\lambda^2 b+O(\lambda^3)$ と置く。左から掛けた一次係数は $a+iV$ だから $a=-iV$。二次係数は $b+a\star iV-T_2(V,V)/2$ である。$a\star iV=V\star V$ なので

$$
b=\frac12 T_2(V,V)-V\star V.
$$

逆順に掛けても $iV\star a=V\star V$ であり、同じ二次係数が零になる。
<!-- solution-end -->

### 演習 MQFC41-A3：相対S行列の恒等式
- Level: A

$S_X(Y)\star S_{X+Y}(Z)=S_X(Y+Z)$ を示せ。

<!-- solution-start -->
**詳細解答**

[相対S行列](#def-mqfc41-relative-s) の定義を二回適用する。積は結合的なので

$$
\begin{aligned}
&S(X)^{-1}\star S(X+Y)\star
S(X+Y)^{-1}\star S(X+Y+Z)\\
&=S(X)^{-1}\star 1\star S(X+Y+Z)
=S_X(Y+Z).
\end{aligned}
$$

逆元が隣接する順序を保つ必要がある。
<!-- solution-end -->

### 演習 MQFC41-A4：一次応答の因果性
- Level: A

$V$ の台の全点が $F$ の台の全点より厳密に未来側の時刻にあるとする。$R_1(V;F)$ を求めよ。

<!-- solution-start -->
**詳細解答**

未来側の点が過去側の点の因果的過去に入ることはない。[局所S行列の因果因子化](#thm-mqfc41-s-factorization) の混合係数から $T_2(V,F)=V\star F$。従って [遅延積の二次展開](#thm-mqfc41-retarded-expansion) の一次式に代入すれば $R_1(V;F)=i(V\star F-V\star F)=0$。
<!-- solution-end -->

### 演習 MQFC41-B1：観測が未来のとき
- Level: B

$F$ の台の全点が $V$ の台の全点より厳密に未来側の時刻にあるとする。$R_1(V;F)$ を交換子で表せ。

<!-- solution-start -->
**詳細解答**

因果帰納条件により今度は $T_2(V,F)=F\star V$。従って

$$
R_1(V;F)=i(F\star V-V\star F).
$$

$V=L_v,F=L_f$ ならスター積の一次収縮だけが残り、

$$
R_1(V;F)=i\hbar(W(f,v)-W(v,f)).
$$

$W-W^T=i(G_{\mathrm{adv}}-G_{\mathrm{ret}})$ であり、$f$ が未来側なので $G_{\mathrm{adv}}(f,v)=0$。代入すると $i\hbar(-iG_{\mathrm{ret}}(f,v))=\hbar G_{\mathrm{ret}}(f,v)$。定義例の符号と一致する。
<!-- solution-end -->

### 演習 MQFC41-B2：異なる背景の二次応答
- Level: B

$V$ が $G,F$ の両方より厳密に未来側の時刻に支持を持つとする。$R_2(V,G;F)=0$ を計算で示せ。

<!-- solution-start -->
**詳細解答**

因果帰納条件から $T_3(V,G,F)=V\star T_2(G,F)$、$T_2(V,F)=V\star F$、$T_2(V,G)=V\star G$。混合二次の公式に代入すると

$$
\begin{aligned}
R_2={}&-V\star T_2(G,F)+V\star T_2(G,F)\\
&+G\star V\star F+V\star G\star F\\
&-(V\star G+G\star V)\star F=0.
\end{aligned}
$$

最初の二項が打ち消され、残りも分配法則と結合性で零となる。
<!-- solution-end -->

### 演習 MQFC41-B3：実の入力の一次応答
- Level: B

$V,F$ が自己随伴で $T_2(V,F)+T_2(V,F)^*=V\star F+F\star V$ とする。$R_1(V;F)$ が自己随伴であることを直接示せ。

<!-- solution-start -->
**詳細解答**

随伴では $i$ の符号と積の順序が反転するので

$$
R_1(V;F)^*=-i(T_2(V,F)^*-F\star V).
$$

仮定から $T_2(V,F)^*=V\star F+F\star V-T_2(V,F)$。代入すると

$$
-i(V\star F-T_2(V,F))
=i(T_2(V,F)-V\star F)=R_1(V;F).
$$

これは [挿入数ごとのユニタリティ条件](../MQFC40/index.md#def-mqfc40-order-unitarity) の二次条件を使った確認である。
<!-- solution-end -->

### 演習 MQFC41-C1：時間順序が交錯する二次応答
- Level: C

$G,F,V$ の台は順に厳密に後の時刻にあるとする（$G$ が最も過去、$V$ が最も未来）。混合遅延積を全てスター積に直し、零となることを示せ。さらに $F$ が最も未来、$V$ が中間、$G$ が最も過去の場合を求めよ。

<!-- solution-start -->
**詳細解答**

第一の場合、因果帰納条件を二回使って $T_3(V,G,F)=V\star F\star G$ とする。二点の積は $T_2(G,F)=F\star G$、$T_2(V,F)=V\star F$、$T_2(V,G)=V\star G$ だから、

$$
\begin{aligned}
R_2={}&-V\star F\star G+V\star F\star G\\
&+G\star V\star F+V\star G\star F\\
&-V\star G\star F-G\star V\star F=0.
\end{aligned}
$$

第二の場合は $T_3(V,G,F)=F\star V\star G$、$T_2(G,F)=F\star G$、$T_2(V,F)=F\star V$、$T_2(V,G)=V\star G$。これらを代入すると

$$
\begin{aligned}
R_2={}&-F\star V\star G+V\star F\star G\\
&+G\star F\star V-G\star V\star F.
\end{aligned}
$$

スター交換子を $[A,B]_\star=A\star B-B\star A$ と書けば、右辺は

$$
-[ [F,V]_\star,G]_\star
$$

である。実際、内側の交換子を $F\star V-V\star F$ として外側を展開すると四項が一致する。未来の背景は消えるが、過去の背景に対しては入れ子の交換子が残る。
<!-- solution-end -->

## 参考文献

- K. Rejzner, *Perturbative Algebraic Quantum Field Theory*, Springer, 2016.
- H. Epstein, V. Glaser, “The role of locality in perturbation theory,” *Annales de l'Institut Henri Poincaré A*, 19 (1973), 211–295.
