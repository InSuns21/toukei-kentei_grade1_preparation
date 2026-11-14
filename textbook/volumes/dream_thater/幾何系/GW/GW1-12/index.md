# GW1-12 境界の分裂と貼り合わせ

## 1. 二つに割れた写像を、どうやって数え直すか

[前講の評価写像](../GW1-11/index.md#def-gw1-11-evaluation)は、標点が標的のどこへ写るかを記録した。しかし曲線が二成分へ退化すると、今度は**節点の二つの枝の像が等しい**ことを記録しなければならない。二つの独立な写像を勝手な点で接続しても、標的への連続写像にはならないからである。

例えば $X=\mathbb P^1$ への次数2の写像が二本の次数1の写像へ割れたとしよう。節点の左枝が $p$、右枝が $q$ に写るなら、貼り合わせ可能なのは $p=q$ の場合だけである。その一致条件をモジュライ上で表し、さらに節点を平滑化したときの**余次元1**を説明するのが本講の中心課題である。

本講では $X$ を複素次元 $m$ の**滑らかな凸射影多様体**、$\beta$ を有効な曲線類とする。凸性は [凸な標的の定義](../GW1-09/index.md#def-gw1-09-convex) に従う。記号

$$
M_{k,\beta}:=\overline{\mathcal M}_{0,k}(X,\beta),\qquad
D(k,\beta):=m-3+c_1(TX)\cdot\beta+k
$$

を使う。$M_{k,\beta}$ は [モジュライの存在・固有性](../GW1-10/index.md#thm-gw1-10-moduli-existence) と [凸標的の滑らかさ・次元](../GW1-10/index.md#thm-gw1-10-smooth-dimension) による滑らかな固有 Deligne–Mumford（DM）スタックとして扱う。積分は有理係数の基本類に対する積分である。非凸標的へ通常基本類の公式を無条件に拡張しない。

## 2. 分裂のデータと安定条件

標点集合を $S=\{1,\ldots,k\}$ とする。一つの節点を取り除くと、種数0の双対木は二つの部分木へ分かれ、標点集合は互いに交わらない $A,B$ に分かれる。曲線類も $\beta=\beta_1+\beta_2$ と分かれる。各側に、元の節点を表す新しい標点 $*$ を一つ加える。

各側を安定写像として扱えるかを確認する。次数が正なら標点が少なくても非定数写像は安定になり得る。他方、$\beta_i=0$ なら、その側が全て定数写像なので $|A_i|+1\ge3$、すなわち $|A_i|\ge2$ が必要である。これは [安定写像と次数0の例外](../GW1-08/index.md#prop-gw1-08-zero-class) に基づく。

<a id="def-gw1-12-admissible-splitting"></a>

<!-- formal-statement-start -->
> **定義（許容される一節点分裂）**  
> 滑らかな凸射影多様体 $X$、有効曲線類 $\beta$、番号付き標点集合 $S$ を固定する。$S=A\sqcup B$、$\beta=\beta_1+\beta_2$ が**許容される一節点分裂**であるとは、二つの種数0安定写像モジュライ $M_{A\cup\{*\},\beta_1}$ と $M_{B\cup\{*\},\beta_2}$ が定義され、非空となり得ることをいう。特に $\beta_i=0$ の側には、節点を含めて三つ以上の特殊点が必要である。ここで $M_{A\cup\{*\},\beta_i}$ は番号付き標点集合が $A\cup\{*\}$ のモジュライを表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-12-admissible-splitting -->
**定義の確認**。$X=\mathbb P^1$、$S=\{1,2,3,4\}$ とし、$A=\{1,2\}$、$B=\{3,4\}$、$\beta_1=0$、$\beta_2=1$ とする。曲線類は $0+1=1$ で、各側の標点集合は節点用の $*$ を加えて $\{1,2,*\}$ と $\{3,4,*\}$ となる。左の定数写像は三特殊点を持つので安定であり、右には次数1の同型写像が存在して安定である。したがって両因子は実際に非空で、許容分裂である。

一方 $A=\{1\}$、$B=\{2,3,4\}$、$\beta_1=0$ とすると、左には $1,*$ の二特殊点しかない。その球面の自己同型には二点を固定する $z\mapsto az$（$a\in\mathbb C^\times$）が残るため安定ではない。右の次数1因子が非空でも、この分裂は許容されない。
<!-- definition-example-end -->

二つの順序付きデータ $(A,\beta_1;B,\beta_2)$ を交換すると、節点付き写像の**同じ幾何学的境界**を記述することがある。境界を後で数えるときは、この順序と枝の交換を区別する。

## 3. 節点の値を一致させるファイバー積

それぞれの成分の節点標点を標的 $X$ へ送る [評価写像](../GW1-11/index.md#def-gw1-11-evaluation) を $\operatorname{ev}_*^A,\operatorname{ev}_*^B$ とする。二本を接ぐ条件は $\operatorname{ev}_*^A(f_1)=\operatorname{ev}_*^B(f_2)$ である。

<a id="def-gw1-12-node-fiber-product"></a>

<!-- formal-statement-start -->
> **定義（節点一致のファイバー積）**  
> 許容される一節点分裂 $(A,\beta_1;B,\beta_2)$ に対し、節点値一致を満たす対象のスタックを

$$
F_{A,\beta_1\mid B,\beta_2}
:=M_{A\cup\{*\},\beta_1}\times_X M_{B\cup\{*\},\beta_2}
$$

> と定める。$X$ への二つの射は、どちらも節点標点 $*$ での評価射である。対象は二つの安定写像および両節点像の一致を表すデータであり、射はそれらの同型である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-12-node-fiber-product -->
**定義の確認**。$X=\mathbb P^1,\ k=0,\ \beta_1=\beta_2=1$ とする。次数1の写像 $f:\mathbb P^1\to\mathbb P^1$ は同型なので、一標点付き同型類はその像 $p=f(z_*)$ のみで決まる。したがって $M_{\{*\},1}\simeq\mathbb P^1$、節点評価射は恒等写像であり、

$$
F_{\varnothing,1\mid\varnothing,1}
\simeq\mathbb P^1\times_{\mathbb P^1}\mathbb P^1
\simeq\mathbb P^1.
$$

二つの標点像 $(p,q)$ を勝手に選ぶのではなく $p=q$ を課したため、二次元の直積から一次元のファイバー積になった。双方とも非定数なので、節点が各成分に一つしかなくても安定である。
<!-- definition-example-end -->

<a id="prop-gw1-12-clutching"></a>

<!-- formal-statement-start -->
> **命題（節点での貼り合わせ射）**  
> $X$ を滑らかな凸射影多様体、$(A,\beta_1;B,\beta_2)$ を許容分裂とする。$F_{A,\beta_1\mid B,\beta_2}$ の二つの写像の節点標点を同一視すると、節点を一つ指定した種数0安定写像が得られる。この操作は家族・同型に両立する固有射

$$
\xi_{A,\beta_1\mid B,\beta_2}:
F_{A,\beta_1\mid B,\beta_2}\longrightarrow M_{k,\beta}
$$

> を定め、その像はこの分裂型の一節点境界の閉包に含まれる。元の標点 $i\in A$（または $i\in B$）の評価は、対応する因子の評価と $\xi$ による引き戻しの下で一致する。
<!-- formal-statement-end -->

### 証明の見取り図

二枝の像一致が貼り合わせた写像の well-defined 性を保証し、成分の安定性が有限自己同型を保証する。標点は元のラベルを保ち、節点用の $*$ のラベルだけを消す。

<!-- proof-start -->
### 証明

$F$ の幾何学的点を $(C_A,(z_i)_{i\in A},z_*^A,f_A)$ と $(C_B,(z_j)_{j\in B},z_*^B,f_B)$ とする。節点標点を一つずつ同一視した曲線を $C=C_A\cup_{z_*^A\sim z_*^B}C_B$ と置く。節点において $f_A(z_*^A)=f_B(z_*^B)$ なので、$f_A,f_B$ を組み合わせた写像 $f:C\to X$ が得られる。これは各成分上で正則であり、[安定写像の定義](../GW1-08/index.md#def-gw1-08-stable-map)を満たす。

元の曲線の各成分の特殊点は貼り合わせの前後で変わらない。非定数成分は安定のままで、定数成分は各側の安定性により三特殊点以上である。したがって全体が安定であり、曲線類は [成分加法性](../GW1-08/index.md#prop-gw1-08-degree-splitting)から $\beta_1+\beta_2=\beta$ となる。

二つの家族を節点の切断に沿って押し出す操作は基底変換と同型に両立し、スタックの射を与える。因子は [固有なモジュライ](../GW1-10/index.md#thm-gw1-10-moduli-existence) で、$X$ が分離的なので対角 $X\to X\times X$ は閉埋め込みである。$F$ は二因子の積の閉部分スタックゆえ固有であり、$\xi$ も固有となる。標点 $i\in A$ の像は貼り合わせによって変わらず、$\operatorname{ev}_i\circ\xi=\operatorname{ev}_i^A\circ\operatorname{pr}_A$ が成り立つ。$B$ 側も同じ論法である。
<!-- proof-end -->

**注意**。固有性は像が閉じることを示すが、$\xi$ が一対一という意味ではない。無標点で同じ次数の二成分を入れ替えられる場合、**粗空間では一点に見えてもスタック上の二つの枝の順序は重複を持つ**。

## 4. なぜ境界は余次元1か

節点値の一致は標的の複素次元 $m$ 個分の条件である。しかし各因子には、節点を置く自由度が既に一個ずつ追加されている。そのため境界余次元を $m$ としてはいけない。

<a id="prop-gw1-12-boundary-dimension"></a>

<!-- formal-statement-start -->
> **命題（節点一致と境界の次元）**  
> $X$ を複素次元 $m$ の滑らかな凸射影多様体とし、許容分裂について $F=F_{A,\beta_1\mid B,\beta_2}$ が非空とする。節点での評価射は横断的に一致させられ、$F$ は滑らかな DM スタックで、その複素次元は

$$
\dim_{\mathbb C}F
=D(|A|+1,\beta_1)+D(|B|+1,\beta_2)-m
=D(k,\beta)-1.
$$

> したがって一節点型の境界は、貼り合わせ射の一般的に有限な部分で複素余次元1となる。
<!-- formal-statement-end -->

### 証明の見取り図

各節点評価の微分の差が $T_xX$ へ全射であれば、標的値を一致させる条件がちょうど $m$ 個独立に課される。[凸性による評価全射](../GW1-10/index.md#lem-gw1-10-evaluation-surjective) がその根拠である。残りは次元式の代入である。

<!-- proof-start -->
### 証明

二つの因子の点で節点像が同じ $x\in X$ とする。積評価写像から対角への横断性の判定には、接空間上の線形写像

$$
T_{f_A}M_{A\cup\{*\},\beta_1}
\oplus T_{f_B}M_{B\cup\{*\},\beta_2}
\longrightarrow T_xX,\qquad
(v_A,v_B)\longmapsto d\operatorname{ev}_*^A(v_A)-d\operatorname{ev}_*^B(v_B)
$$

が全射であることを使う。[凸性による球面評価全射](../GW1-10/index.md#lem-gw1-10-evaluation-surjective)と[節点上の障害消滅](../GW1-10/index.md#prop-gw1-10-nodal-vanishing)は、節点付き成分を含めて標点評価を全射にする。一方の評価だけでも全射なので、上の差写像は全射である。従って $F$ は $m$ 個の独立な方程式による滑らかなファイバー積である。

各因子の次元を[既習の次元定理](../GW1-10/index.md#thm-gw1-10-smooth-dimension)へ代入すると

$$
\begin{aligned}
D_A&=m-3+c_1(TX)\cdot\beta_1+|A|+1,\\
D_B&=m-3+c_1(TX)\cdot\beta_2+|B|+1,\\
D_A+D_B-m
&=m-4+c_1(TX)\cdot(\beta_1+\beta_2)+|A|+|B|\\
&=D(k,\beta)-1.
\end{aligned}
$$

一般点の貼り合わせデータは、指定した節点を切り開けば回復できるので有限個であり、像も同次元である。複数節点の部分はさらに低い次元にある。
<!-- proof-end -->

**具体例**。$X=\mathbb P^1,\ \beta=2,\ k=0$ なら $D(0,2)=1-3+4=2$。次数 $1+1$ の境界は各因子が $\dim M_{\{*\},1}=1$ で、ファイバー積は $1+1-1=1$ 次元。境界の複素余次元は $2-1=1$ である。

## 5. 節点を平滑化する座標と障害消滅

節点は局所的に $xy=0$ という二本の枝の交差である。これを $xy=t$ へ変えると、$t\ne0$ の近傍では $x,y$ が同時に0にならず、滑らかな曲線になる。[四標点での平滑化](../GW1-07/index.md#thm-gw1-07-four-point-compactification)で見た操作を、今回は写像も伴う変形として使う。

ただし定義域だけ平滑化しても、写像が新しい首の部分へ延長できるとは限らない。凸性による $H^1(C,f^*TX)=0$ が、この延長の障害を消す役割を持つ。

<a id="prop-gw1-12-gluing-local"></a>

<!-- formal-statement-start -->
> **命題（凸標的の局所貼り合わせと平滑化）**  
> $X$ を滑らかな凸射影多様体とし、$[f:C\to X]$ を種数0安定写像とする。$C$ が $e$ 個の節点を持つとき、各節点の平滑化パラメータをエタール局所変形空間の独立な座標の一部に取れる。その座標と、対応する定義域の局所方程式を次のように書く。
 
$$
x_ay_a=t_a\qquad(a=1,\ldots,e).
$$
 
> $t_a=0$ なら第 $a$ 節点が残り、零でなければ平滑化される。特に一節点境界は $t=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

変形の自由度を「二枝の写像と節点値の一致」と「節点の平滑化方向」に分ける。正規化完全列と凸性で写像の変形障害が消え、各 $t_a$ を自由に動かせる。[前講の境界余次元定理](../GW1-10/index.md#prop-gw1-10-boundary)の座標構成を、節点一致のファイバー積と結び付ける。

<!-- proof-start -->
### 証明

固定した節点付き曲線 $C$ の正規化を $\nu:\coprod_v C_v\to C$ とし、$E=f^*TX$ と置く。節点の二枝上の切断値の差を取る正規化完全列は

$$
0\longrightarrow E\longrightarrow
\nu_*\bigoplus_vE|_{C_v}
\longrightarrow\bigoplus_{a=1}^eT_{f(q_a)}X
\longrightarrow0
$$

である。右端の写像は節点 $q_a$ の両枝の値の差を返す。長完全列の該当部分は

$$
\bigoplus_vH^0(C_v,E|_{C_v})
\longrightarrow\bigoplus_aT_{f(q_a)}X
\longrightarrow H^1(C,E)
\longrightarrow\bigoplus_vH^1(C_v,E|_{C_v}) .
$$

[凸標的の節点付き障害消滅](../GW1-10/index.md#prop-gw1-10-nodal-vanishing)によって、右端の $H^1$ は零であり、節点値の差も大域切断で補正できる。したがって $H^1(C,E)=0$ である。これは、定義域を微小変形したときの写像の延長問題の一次障害がないことを表す。

各節点の定義域自体の変形は、[節点の局所モデル](../GW1-07/index.md#thm-gw1-07-four-point-compactification)により $x_ay_a=t_a$ で与えられる。[モジュライの滑らかさと次元](../GW1-10/index.md#thm-gw1-10-smooth-dimension)の変形構成では、この $H^1$ 消滅のもとで節点平滑化への写像が滑らかであり、$t_1,\ldots,t_e$ が局所座標の一部となる。よって一節点保存の条件は $t=0$、複数節点の全境界は $t_1\cdots t_e=0$ である。有限自己同型は座標や節点を置換し得るため、粗空間上で同じ方程式をそのまま主張するわけではない。
<!-- proof-end -->

**座標の確認**。$x'=ax,\ y'=by$（$a,b\ne0$）と変えれば $x'y'=ab\,t$ となるので新しい平滑化パラメータは $t'=ab\,t$。$t=0$ と $t\ne0$ の区別は座標選択に依存しない。単なる $xy=t$ の記号だけでは写像の延長は示せず、上の障害消滅が必要な箇所である。

## 6. 対角類が節点一致を計算へ変える

ファイバー積の条件 $f_A(*)=f_B(*)$ をコホモロジーで表すには、$X\times X$ の対角 $\Delta_X=\{(x,x):x\in X\}$ を使う。$X$ が複素次元 $m$ なら $\Delta_X$ は複素余次元 $m$ で、Poincaré双対類 $[\Delta_X]\in H^{2m}(X\times X;\mathbb Q)$ を持つ。[評価挿入の定義](../GW1-11/index.md#def-gw1-11-insertion)と同様、これを二つの節点評価で引き戻す。

<a id="def-gw1-12-diagonal-matching"></a>

<!-- formal-statement-start -->
> **定義（対角類による節点一致の交叉類）**  
> $X$ を滑らかな凸射影多様体、$(A,\beta_1;B,\beta_2)$ を許容分裂とする。二因子の直積における節点一致の交叉類を

$$
(\operatorname{ev}_*^A,\operatorname{ev}_*^B)^*[\Delta_X]
\in H^{2m}(M_{A\cup\{*\},\beta_1}\times M_{B\cup\{*\},\beta_2};\mathbb Q)
$$

> と定める。対角との横断性のもとで、これはファイバー積 $F_{A,\beta_1\mid B,\beta_2}$ の基本類の Poincaré 双対である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gw1-12-diagonal-matching -->
**定義の確認**。$X=\mathbb P^1$ の点類を $h\in H^2(X;\mathbb Q)$、$\int_X h=1$ とする。対角は $\mathbb P^1\times\mathbb P^1$ 内の二因子の和と同じ divisor class を持ち、

$$
[\Delta_{\mathbb P^1}]
=\operatorname{pr}_1^*h+\operatorname{pr}_2^*h
= h\boxtimes1+1\boxtimes h.
$$

まず第3節の次数 $1+1$ の例では、両因子の評価写像を節点像 $p,q\in\mathbb P^1$ で同定すると、ともに恒等写像である。したがって直積上の積評価は $(p,q)\mapsto(p,q)$ であり、対角の逆像はちょうど $p=q$ を満たすファイバー積 $F$ になる。その Poincaré 双対は定義どおり

$$
(\operatorname{ev}_*^A,\operatorname{ev}_*^B)^*[\Delta_X]
=[\Delta_{\mathbb P^1}]=h\boxtimes1+1\boxtimes h.
$$

独立の交叉数でも確かめる。$\Delta$ と $X\times\{q\}$ の交点は $(q,q)$ の一つで横断的なので

$$
\int_{X\times X}[\Delta]\smile(1\boxtimes h)
=\int_{X\times X}(h\boxtimes1)(1\boxtimes h)=1.
$$

ここで $(1\boxtimes h)^2=0$、$\int_Xh=1$ を使った。逆の因子と交わらせても1となる。対角の複素余次元は $m=1$ で、ファイバー積の次元が直積より1小さいこととも一致する。
<!-- definition-example-end -->

偶数次数のコホモロジーを計算するため、$X$ 上の積分による Poincaré pairing を

$$
\langle u,v\rangle_X:=\int_Xu\smile v
$$

と書く。$H^{\mathrm{even}}(X;\mathbb Q)$ の同次基底 $e_a$ に対し、$\langle e_a,e^b\rangle_X=\delta_a^b$ となる双対基底 $e^a$ を選ぶ。この基底が節点一致の判定へ使える理由は、[Poincaré 双対類による交叉の解釈](../GW1-11/index.md#def-gw1-11-insertion)を直積へ適用すると、対角の交叉が $X$ 上での交叉へ戻るからである。実際、偶数次数の $u,v$ に対して

$$
\begin{aligned}
\int_{X\times X}[\Delta_X]\smile(u\boxtimes v)
&=\int_Xu\smile v,\\
\int_{X\times X}\left(\sum_a e_a\boxtimes e^a\right)\smile(u\boxtimes v)
&=\sum_a\langle e_a,u\rangle_X\langle e^a,v\rangle_X
=\langle u,v\rangle_X.
\end{aligned}
$$

第二式の末尾は双対基底による $u$ の展開から従う。したがって偶数・偶数成分は

$$
[\Delta_X]_{\mathrm{even,even}}=\sum_a e_a\boxtimes e^a.
$$

奇数次数の類まで含めた一般式には graded（Koszul）符号が必要である。本講の明示的な**基底展開の分裂公式は全挿入を偶数次数とする**。対角の幾何学的な引き戻しそのものは奇数次数も含めて成り立つ。

**例：$\mathbb P^2$**。$H$ を超平面類とすると $H^3=0$、$\int_{\mathbb P^2}H^2=1$ である。実次数の和が4となる組だけ pairing が非零なので、基底 $1,H,H^2$ に対し

$$
\langle1,H^2\rangle=\langle H,H\rangle=\langle H^2,1\rangle=1
$$

であり、これ以外の基底の組の pairing は零。従って双対基底は順に $H^2,H,1$ となる。これを直前の式に代入すれば

$$
[\Delta_{\mathbb P^2}]=1\boxtimes H^2+H\boxtimes H+H^2\boxtimes1 .
$$

三項とも複素余次元2で、節点一致は複素次元2個の条件である。

## 7. 境界の積分を二つの因子へ分裂させる

[GW1-11の評価挿入と積分](../GW1-11/index.md#prop-gw1-11-degree-rule)を使う。記法を確認すると、安定な $r$ 標点・曲線類 $\gamma$ の因子に対し

$$
I_{0,\gamma}(\eta_1,\ldots,\eta_r)
:=\int_{[M_{r,\gamma}]}\prod_{j=1}^r\operatorname{ev}_j^*\eta_j
$$

である。$r$ はこの因子の標点数で、節点用の $*$ も一標点として数える。以下の分裂公式では、各因子の挿入列の最後に節点挿入 $e_a$ または $e^a$ を置く。次数が基本類の実次元に届かない項は零とする。

二因子の評価挿入は、貼り合わせ後の元の標点の挿入と一致する。節点一致は対角類による交叉と等しいので、積分を二つの因子へ分離できる。

一節点境界の像を $D_{A,\beta_1\mid B,\beta_2}$ と呼ぶ。ただし同じ境界を交換した表記で二重に足さない。$(A,\beta_1;B,\beta_2)$ の交換がこのデータを保つ**無標点・同曲線類の対称な場合**は、順序付き貼り合わせ射の一般次数を $\delta=2$ とする。それ以外（特にラベル付き標点が少なくとも一つある場合）は $\delta=1$ である。ここで次数はスタックの有理基本類の pushforward の係数を意味し、粗空間での見かけの点数とは異なる。

<a id="thm-gw1-12-boundary-splitting"></a>

<!-- formal-statement-start -->
> **定理（凸標的の一節点境界の分裂公式）**  
> $X$ を複素次元 $m$ の滑らかな凸射影多様体とし、許容分裂 $(A,\beta_1;B,\beta_2)$ を固定する。$M_{k,\beta}$ の分裂境界の有理基本類を $[D_{A,\beta_1\mid B,\beta_2}]$ とし、順序付き貼り合わせ射の一般次数を $\delta\in\{1,2\}$ とする。任意の偶数次数の挿入 $\alpha_i\in H^{\mathrm{even}}(X;\mathbb Q)$ について、積分の次数が合うとき、

$$
\begin{aligned}
&\int_{[D_{A,\beta_1\mid B,\beta_2}]}
\prod_{i=1}^k\operatorname{ev}_i^*\alpha_i\\
&\quad=\frac1\delta\sum_a
I_{0,\beta_1}\bigl((\alpha_i)_{i\in A},e_a\bigr)
I_{0,\beta_2}\bigl((\alpha_j)_{j\in B},e^a\bigr).
\end{aligned}
$$

> ここで右辺の各因子は節点標点 $*$ を最後の挿入とした、対応する安定写像モジュライ上の評価積分である。各因子が安定でない分裂は和に入れない。次数不一致の積分は0とする。奇数次数の挿入を扱うときは符号付き対角分解と graded な挿入順序を用いる。
<!-- formal-statement-end -->

### 証明の見取り図

まず貼り合わせ空間 $F$ で積分し、境界との一般次数 $\delta$ で割る。次に $F$ の基本類を対角交叉として表す。最後に対角類を双対基底で展開し、左右の積分の積へ分離する。$\delta$ は枝の順序を忘れる際の重複補正である。

<!-- proof-start -->
### 証明

貼り合わせ射 $\xi:F\to D$ は固有で、一般点における次数が $\delta$ なので、有理スタックサイクルとして $\xi_*[F]=\delta[D]$ である。従って射影公式から、$\Theta=\prod_{i=1}^k\operatorname{ev}_i^*\alpha_i$ とすると

$$
\int_{[D]}\Theta
=\frac1\delta\int_{[F]}\xi^*\Theta.
$$

[貼り合わせ射と評価の可換性](#prop-gw1-12-clutching)により、$\xi^*\Theta$ は $A$ 側と $B$ 側の評価挿入の積である。[節点一致と境界の次元](#prop-gw1-12-boundary-dimension)から、ファイバー積の基本類は直積の中で対角の引き戻しと交叉して得られる。そこで

$$
\int_{[F]}\xi^*\Theta
=\int_{[M_A\times M_B]}
\left(\prod_{i\in A}(\operatorname{ev}_i^A)^*\alpha_i\right)
\left(\prod_{j\in B}(\operatorname{ev}_j^B)^*\alpha_j\right)
(\operatorname{ev}_*^A,\operatorname{ev}_*^B)^*[\Delta_X].
$$

両側の積の記号は、それぞれの射影による引き戻しを省略している。挿入が偶数次数なので因子の交換で符号は出ない。前節の双対基底展開を代入すると、和の各項は

$$
\left[\prod_{i\in A}(\operatorname{ev}_i^A)^*\alpha_i
(\operatorname{ev}_*^A)^*e_a\right]
\boxtimes
\left[\prod_{j\in B}(\operatorname{ev}_j^B)^*\alpha_j
(\operatorname{ev}_*^B)^*e^a\right].
$$

直積の基本類で評価すると左右の積分の積になる。$\delta$ で割れば主張の式が得られる。右辺で非零になるのは、左右それぞれの実次数が各因子の複素次元の2倍に達する項だけである。両因子の次元の和から対角余次元 $m$ を引いた値が境界次元 $D(k,\beta)-1$ となることは前の命題で確認済みであり、全体の次数条件とも一致する。
<!-- proof-end -->

**係数の注意**。$X=\mathbb P^1,\ k=0,\ \beta=2$ の $1+1$ 分裂では $F\simeq\mathbb P^1$ である。一般的な節点付き写像は二本の次数1成分を交換する自己同型を持つ。この場合 $\delta=2$ であり、順序付きの $F$ の基本類をそのまま境界の基本類と同一視すると、スタックの重みを2倍に誤る。標点が左右を識別する場合にはこの補正を重ねて掛けない。

## 8. 四標点の境界を比べる準備

$k=4$ なら、正次数写像の定義域も含めて、標的への写像を忘れて、[安定化の定義](../GW1-07/index.md#def-gw1-07-stabilization)に従い特殊点が足りない成分を収縮する射

$$
\mathrm{st}:M_{4,\beta}\longrightarrow\overline{\mathcal M}_{0,4}\simeq\mathbb P^1
$$

がある。定義域の [四標点の境界三点](../GW1-07/index.md#thm-gw1-07-four-point-compactification)は、分割 $12\mid34$、$13\mid24$、$14\mid23$ に対応する。射影直線上の異なる二点は同じコホモロジー類を持つので、その引き戻しの境界因子類も等しい。

<a id="prop-gw1-12-four-point-boundary"></a>

<!-- formal-statement-start -->
> **命題（四標点境界の二通りの分裂）**  
> $X$ を滑らかな凸射影多様体、$\beta$ を有効曲線類とする。$M_{4,\beta}$ で、$\mathrm{st}$ による分割 $12\mid34$ と $13\mid24$ の境界因子類は等しい。したがって、偶数次数の四挿入の積をこれらの因子類と積分すると、許容される曲線類の分裂 $\beta_1+\beta_2=\beta$ に関する [一節点分裂公式](#thm-gw1-12-boundary-splitting)の二つの和が等しくなる。
<!-- formal-statement-end -->

### 証明の見取り図

$\overline{\mathcal M}_{0,4}\simeq\mathbb P^1$ の二境界は点であり、点の Poincaré 双対はともに $h$ である。$\mathrm{st}^*$ により同じ類を得る。それぞれの逆像に現れる一節点因子は分裂した曲線類ごとに分かれる。

<!-- proof-start -->
### 証明

$\overline{\mathcal M}_{0,4}$ の境界点を $p_{12|34},p_{13|24}$ と書く。[交比のコンパクト化](../GW1-07/index.md#thm-gw1-07-four-point-compactification)によって両者は $\mathbb P^1$ 上の点である。点類が等しいので

$$
\mathrm{st}^*\operatorname{PD}[p_{12|34}]
=\mathrm{st}^*h
=\mathrm{st}^*\operatorname{PD}[p_{13|24}].
$$

一節点の一般点について、標点を忘れた安定化後の二枝の分割は、それぞれ $12|34$ または $13|24$ になる。局所座標 $xy=t$ では対応する境界点の引き戻しが $t=0$ で、各境界成分の重複度は1である。二節点以上の部分は [余次元計算](../GW1-10/index.md#prop-gw1-10-boundary) により余次元2以上で、因子類には追加されない。各分割の境界因子類を足し、同じ評価挿入を掛けて積分すると、両辺が一致する。それぞれの境界成分には前定理を適用できる。
<!-- proof-end -->

これは後の第15講で扱うGW基本公理・分裂公式と、量子積の結合律へ向かう幾何学的な入口である。後続講義の未構成の理論をここで前提としたわけではない。

## 9. 演習と詳細解答

### Level A

<a id="ex-gw1-12-a01"></a>
#### GW1-12-A01 安定な分裂を判定する
- Level: A

$S=\{1,2,3,4\}$、$X=\mathbb P^1$ とする。$\beta_1=0,\beta_2=1$ のとき、(i) $A=\{1,2\}$、(ii) $A=\{1\}$、(iii) $A=\{1,2,3\}$ が許容分裂か判定せよ。

<!-- solution-start -->
**詳細解答**。[許容分裂の定義](#def-gw1-12-admissible-splitting)で定数側に $|A|+1\ge3$ が必要。(i) は $2+1=3$ なので安定で、$B=\{3,4\}$ の正次数側も安定。(ii) は $1+1=2$ で定数側が不安定。(iii) は $3+1=4$ で定数側が安定、$B=\{4\}$ の次数1側も非定数なので安定。従って (i),(iii) が許容される。
<!-- solution-end -->

<a id="ex-gw1-12-a02"></a>
#### GW1-12-A02 二因子の次元から境界余次元を導く
- Level: A

$X=\mathbb P^2$、総次数1、四標点、$|A|=|B|=2$、$\beta_1=0,\beta_2=1$ とする。全体・左右のモジュライ・ファイバー積の複素次元を計算せよ。

<!-- solution-start -->
**詳細解答**。[Chern類の計算](../GW1-09/index.md#thm-gw1-09-projective-convex)から $m=2,c_1(TX)\cdot\beta=3$。全体は $D(4,1)=2-3+3+4=6$。左因子は節点標点を含めて3標点、次数0なので $D_A=2-3+0+3=2$。右因子は三標点、次数1なので $D_B=2-3+3+3=5$。二つの節点評価値を一致させると標的の次元2を引くから $\dim F=2+5-2=5=6-1$。定数側の三特殊点も確かめた。
<!-- solution-end -->

<a id="ex-gw1-12-a03"></a>
#### GW1-12-A03 射影直線の対角を検算する
- Level: A

$X=\mathbb P^1$ で $h$ を点類とする。$[\Delta_X]=1\boxtimes h+h\boxtimes1$ が、$\int_{X\times X}[\Delta_X]\smile(h\boxtimes1)=1$ と $\int_{X\times X}[\Delta_X]\smile(1\boxtimes h)=1$ を満たすことを示せ。

<!-- solution-start -->
**詳細解答**。$h^2=0$ かつ $\int_Xh=1$。第一の積は $(1\boxtimes h)(h\boxtimes1)+(h\boxtimes1)^2=h\boxtimes h$。第二の積も $(1\boxtimes h)^2+(h\boxtimes1)(1\boxtimes h)=h\boxtimes h$。どちらも直積積分は $(\int_Xh)^2=1$。偶数次数なので積の交換符号はない。
<!-- solution-end -->

<a id="ex-gw1-12-a04"></a>
#### GW1-12-A04 局所平滑化の意味を確かめる
- Level: A

複素数 $t$ に対する局所曲線 $xy=t$ の $t=0$ と $t\ne0$ の違いを述べよ。座標 $x'=2x,y'=3y$ による $t$ の変化を求め、写像の延長には別の条件が必要な理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$t=0$ なら $xy=0$ は二つの座標軸が原点で交わる節点である。$t\ne0$ なら二座標とも零でなく、曲線は滑らかなグラフとなる。

座標変更の式を代入すると

$$
x'y'=(2x)(3y)=6t,\qquad t'=6t.
$$

よって節点であることは座標変更で不変。ただし $xy=t$ が表すのは定義域の変形だけである。写像を平滑化した曲線へ延長する際の障害は $H^1(C,f^*TX)$ に現れ、[凸標的の障害消滅](../GW1-10/index.md#prop-gw1-10-nodal-vanishing)がその解消を保証する。
<!-- solution-end -->

<a id="ex-gw1-12-a05"></a>
#### GW1-12-A05 同次数無標点分裂の重複
- Level: A

$X=\mathbb P^1,\ \beta=2,\ k=0$ で次数 $1+1$ に分裂する。ファイバー積を同定し、貼り合わせ射の一般次数 $\delta$ を求めよ。粗空間の点数だけから $\delta$ を読んでよいか。

<!-- solution-start -->
**詳細解答**。各因子 $M_{\{*\},1}\simeq\mathbb P^1$ で評価が恒等だから、$F\simeq\mathbb P^1\times_{\mathbb P^1}\mathbb P^1\simeq\mathbb P^1$。左右とも無標点かつ次数1なので、貼り合わせ後に二成分を交換しても同じ安定写像を得る。したがって順序付き貼り合わせのスタック次数は $\delta=2$。粗空間では $F$ の点 $p$ と境界の点 $p$ が一対一に見えるが、節点付き写像の[有限自己同型](../GW1-08/index.md#thm-gw1-08-finite-aut)に二成分の交換が含まれるため、スタックの pushforward 係数を粗空間の点数から決めてはいけない。
<!-- solution-end -->

### Level B

<a id="ex-gw1-12-b01"></a>
#### GW1-12-B01 ファイバー積の横断性を自力で再構成する
- Level: B

凸標的 $X$ の一節点分裂について、評価写像の微分から一致条件の接線形写像を書き、その全射性と次元の公式を証明せよ。なぜ節点一致の余次元を最終的な境界余次元と混同できないかも答えよ。

<!-- solution-start -->
**詳細解答**。二因子の節点像が $x$ なら接線形写像は $(v_A,v_B)\mapsto d\operatorname{ev}_*^A(v_A)-d\operatorname{ev}_*^B(v_B)\in T_xX$。凸性による [評価全射](../GW1-10/index.md#lem-gw1-10-evaluation-surjective) と [節点障害の消滅](../GW1-10/index.md#prop-gw1-10-nodal-vanishing) から、片側の節点評価微分を全射にできる。従って差も全射。節点像一致は複素余次元 $m$ の条件になる。

節点標点を一つずつ追加した左右の次元を $D_A=m-2+c_1\beta_1+|A|$、$D_B=m-2+c_1\beta_2+|B|$ と書く。したがって

$$
D_A+D_B-m=m-4+c_1(\beta_1+\beta_2)+k=D(k,\beta)-1.
$$

左右のモジュライを作る段階で節点位置の自由度が各一つ加算済みである。$m$ だけを引くことと、全モジュライから境界へ移る余次元1とは別の差分である。
<!-- solution-end -->

<a id="ex-gw1-12-b02"></a>
#### GW1-12-B02 定数写像の境界積分
- Level: B

$X=\mathbb P^1,\ \beta=0,\ k=4$、分割 $12\mid34$ とする。挿入 $(h,1,1,1)$ に対する境界積分を、ファイバー積・対角展開・左右の積分から求めよ。

<!-- solution-start -->
**詳細解答**。両側とも $\beta_i=0$ で、各側には元の二標点と節点標点の三つがあるので安定。各因子は $M_{3,0}\simeq X$、節点評価は恒等写像だから $F=X\times_X X\simeq X$、$\delta=1$ である。

対角類は $1\boxtimes h+h\boxtimes1$。[次数0の三点積分](../GW1-11/index.md#prop-gw1-11-constant-formula)により、節点へ $1$ を挿入する項は左側 $\int_Xh=1$ だが、右側は節点に $h$ を挿入して $\int_Xh=1$ なので積は1。逆に左の節点へ $h$、右へ $1$ を挿入する項は左が $\int_Xh^2=0$ で消える。和は $1+0=1$。境界 $F\simeq X$ は複素次元1で、点類 $h$ の複素余次元1とも一致する。
<!-- solution-end -->

<a id="ex-gw1-12-b03"></a>
#### GW1-12-B03 四標点の二分割が等しいことを検算する
- Level: B

$X=\mathbb P^1,\ \beta=0,\ k=4$、挿入 $(h,1,1,1)$ とする。$12\mid34$ と $13\mid24$ に対する分裂公式の両辺を独立に計算せよ。

<!-- solution-start -->
**詳細解答**。$12\mid34$ の境界積分は前問で1と分かった。$13\mid24$ では左の挿入が $(h,1)$、右の挿入が $(1,1)$ となる。両側とも次数0であり、二標点と節点を合わせた三特殊点で安定する。

対角類の二項を別々に評価する。第一項 $1\boxtimes h$ の寄与は

$$
\left(\int_Xh\right)\left(\int_Xh\right)=1.
$$

第二項 $h\boxtimes1$ の左側には $h^2=0$ が現れるので寄与は0である。よって $13\mid24$ も1となり、[四標点境界の等式](#prop-gw1-12-four-point-boundary)と一致する。なお挿入の複素余次元は1、境界の複素次元も $D(4,0)-1=1$ である。
<!-- solution-end -->

<a id="ex-gw1-12-b04"></a>
#### GW1-12-B04 非定数写像の四標点分裂
- Level: B

$X=\mathbb P^1,\ \beta=1,\ k=4$、挿入 $(h,1,h,h)$ とする。$12\mid34$ と $13\mid24$ の各分割で、$\beta_1+\beta_2=1$ の許容な $0+1$ と $1+0$ を列挙し、境界積分を求めよ。次数1の三標点に三点条件を課した積分が1であることは直接説明せよ。

<!-- solution-start -->
**詳細解答**。全モジュライは $D(4,1)=1-3+2+4=4$、境界次元3。三つの $h$ の複素余次元も3である。各分割の左右には二つの元の標点と節点があり、$0+1$ も $1+0$ も安定である。

次数0の三点積分は $\int_{\mathbb P^1}$ のカップ積。[次数1の正則写像](../GW1-11/index.md#prop-gw1-11-line-two-points)と同じ考え方で、三標点付き次数1写像に相異なる三つの一般の標的点を指定すれば、次数1写像は同型、三標点はその逆像として一意、自己同型は自明である。積評価は三点が相異なる開集合上で同型となるので、$\int_{M_{3,1}}\operatorname{ev}_1^*h\operatorname{ev}_2^*h\operatorname{ev}_3^*h=1$ である。

$12\mid34$ では左挿入は $(h,1)$、右は $(h,h)$。左次数0・右次数1のとき、左の節点には $1$、右には $h$ が必要で、値は $\int_Xh\cdot I_{0,1}(h,h,h)=1$。左次数1・右次数0では、右の $h^2$ が零なので0。従って合計1。

$13\mid24$ では左挿入が $(h,h)$、右が $(1,h)$。左次数0・右次数1では左に $h^2$ が現れ0。左次数1・右次数0では左の節点に $h$、右の節点に $1$ を入れた項が $I_{0,1}(h,h,h)\int_Xh=1$ となる。従ってこちらも1。ラベル付き標点が左右を区別するため、どの寄与にも $1/2$ を掛けない。
<!-- solution-end -->

### Level C

<a id="ex-gw1-12-c01"></a>
#### GW1-12-C01 分裂公式の導出と自己同型の検査
- Level: C

$X$ を滑らかな凸射影多様体とし、$\beta=\beta_1+\beta_2,\ S=A\sqcup B$ を許容分裂とする。偶数次数の評価挿入を取る。

1. ファイバー積の次元が $D(k,\beta)-1$ であることを証明せよ。
2. 対角の双対基底展開から、分裂境界上の挿入の積分を二因子の積分の和へ変換せよ。射の一般次数 $\delta$ を残すこと。
3. $X=\mathbb P^1,\ k=0,\ \beta=2$ の $1+1$ 分裂について、$\delta$ とその理由を求めよ。$k=4$ で $12|34$ のように標点が枝を識別する場合と比較せよ。

<!-- solution-start -->
**詳細解答**。

**(1) 次元と横断性。** 左右に節点標点を加えるので、各因子の複素次元は

$$
D_A=m-2+c_1(TX)\cdot\beta_1+|A|,\quad
D_B=m-2+c_1(TX)\cdot\beta_2+|B|.
$$

節点評価の微分差は $T_xX$ への全射である。根拠は [凸性による評価全射](../GW1-10/index.md#lem-gw1-10-evaluation-surjective)と[節点障害消滅](../GW1-10/index.md#prop-gw1-10-nodal-vanishing)である。従ってファイバー積の次元は $D_A+D_B-m=m-4+c_1(TX)\cdot\beta+k=D(k,\beta)-1$。

**(2) 分裂積分。** $\Theta=\prod_{i\in S}\operatorname{ev}_i^*\alpha_i$ とする。境界への貼り合わせ射の pushforward は $\xi_*[F]=\delta[D]$。射影公式を適用して

$$
\int_{[D]}\Theta=\frac1\delta\int_{[F]}\xi^*\Theta.
$$

ファイバー積の基本類は、直積上の対角類の引き戻しとの交叉である。偶数次数の双対基底を $(e_a),(e^a)$ とすると、挿入が偶数次数の場合に寄与する対角成分は $\sum_a e_a\boxtimes e^a$。これを展開し、直積上の積分を左右へ分解すれば

$$
\frac1\delta\sum_a
\left(\int_{[M_A]}\prod_{i\in A}(\operatorname{ev}_i^A)^*\alpha_i\,
(\operatorname{ev}_*^A)^*e_a\right)
\left(\int_{[M_B]}\prod_{j\in B}(\operatorname{ev}_j^B)^*\alpha_j\,
(\operatorname{ev}_*^B)^*e^a\right)
$$

となる。これは [境界分裂定理](#thm-gw1-12-boundary-splitting)の式である。非零項では、左右それぞれの挿入次数が $2D_A,2D_B$ に一致することも必須である。

**(3) 対称性。** 各次数1因子は節点の像で分類されるので、

$$
M_{\{*\},1}(\mathbb P^1)\simeq\mathbb P^1,
\qquad F\simeq\mathbb P^1.
$$

無標点・同次数の二成分は交換で区別できず、この交換は貼り合わせ後の自己同型になる。そのためスタックの pushforward では $\delta=2$ である。

これは次数2・無標点の境界の**基本類の係数**であり、挿入なしの積分が非零という意味ではない。境界は複素次元1だから、単位類の積分は次数不足で0となる。

一方、四標点を $12\mid34$ に分割すると、標点ラベルが枝を区別し $\delta=1$ である。順序を交換した同じ境界を二度足さないことと、スタック次数で割ることは別々の補正である。
<!-- solution-end -->

---

参考：Fulton–Pandharipande, *Notes on Stable Maps and Quantum Cohomology*（https://arxiv.org/abs/alg-geom/9608011）。本講の分裂は凸な射影標的の種数0・通常の有理基本類に限る。一般非凸標的の仮想基本類をこの節で構成したものではない。
