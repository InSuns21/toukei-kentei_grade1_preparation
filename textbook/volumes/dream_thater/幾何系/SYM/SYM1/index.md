# SYM1 シンプレクティック線形代数

[AMECH7の正準変換](../../../物理系/AMECH/AMECH7/index.md#def-amech7-canonical-transformation)では、座標を取り替えても位置と運動量の Poisson 括弧を保存するために、Jacobian 行列が特別な条件を満たすことを学びました。しかし、行列条件だけを見ると「なぜその条件なのか」「座標を選ばないと何も言えないのか」が残ります。

この章では一度 Hamilton 方程式を離れ、有限次元の実ベクトル空間を考えます。「二つのベクトルを組にして測る、符号が反転する面積」を線形代数の対象として捉え直すのです。

普通の内積は同じベクトルとの組から長さを測ります。一方、ここで必要なのは同じベクトルを二度入れると必ず零になる形式です。長さは測れませんが、互いに対応する二方向を見つけられます。しかも、退化がなければ**その方向を必ず対で取り出し、全空間の基底を作れる**ことが核心です。

学習の流れは、交代形式の定義と直接例、非退化性の判定、対を作る帰納的構成、標準行列への変換、形式を保存する線形写像、体積保存との違いです。微分形式や多様体に拡張するのは後続の SYM2 以降とし、まず基底構成の途中式をすべて有限次元で確かめます。

## 1. 二つの方向の向き付けられた組を測る

$V$ を有限次元の**実**ベクトル空間とします。二つのベクトル $u,v$ から実数を得る写像 $\omega(u,v)$ を、各引数について線形とします。[LA3Eの交代多重線形形式](../../../基礎科目/LA/LA3E/index.md#def-la3e-exterior-power)の二変数の場合です。

<a id="def-sym1-alternating-form"></a>

<!-- formal-statement-start -->
> **定義（交代双線形形式）**  
> 実ベクトル空間 $V$ 上の双線形写像 $\omega:V\times V\to\mathbb R$ が、すべての $v\in V$ について $\omega(v,v)=0$ を満たすとき、$\omega$ を交代双線形形式という。
<!-- formal-statement-end -->

この条件から、任意の $u,v$ について

$$
\begin{aligned}
0&=\omega(u+v,u+v)\\
 &=\omega(u,u)+\omega(u,v)+\omega(v,u)+\omega(v,v)\\
 &=\omega(u,v)+\omega(v,u)
\end{aligned}
$$

なので $\omega(v,u)=-\omega(u,v)$ です。逆向きの組では符号が反転します。

<!-- definition-example-start: def-sym1-alternating-form -->
### 例：平面の向き付き面積

**定義の確認**：以下で定義の条件を具体的に検証します。

$V=\mathbb R^2$、$u=(x,y)^{\mathsf T}$、$v=(x',y')^{\mathsf T}$ として

$$
\omega_0(u,v)=xy'-yx'
$$

と置きます。各変数に線形で、

$$
\omega_0(u,u)=xy-yx=0
$$

だから、これは定義を満たします。$\omega_0((1,0),(0,1))=1$ ですが、引数を交換すると $-1$ になります。
<!-- definition-example-end -->

**交代しているだけでは不足します。** 例えば $\mathbb R^3$ で

$$
\omega((x,y,z),(x',y',z'))=xy'-yx'
$$

とすると、$z$ 方向の非零ベクトル $(0,0,1)$ は、どのベクトルと組にしても零です。その方向は形式から検出できません。

<a id="def-sym1-nondegenerate-form"></a>

<!-- formal-statement-start -->
> **定義（非退化交代形式）**  
> 有限次元実ベクトル空間 $V$ 上の交代双線形形式 $\omega$ が、[双線形形式の非退化性](../../../基礎科目/LA/LA3E/index.md#def-la3e-nondegenerate-bilinear-form) を満たすとき、$\omega$ を **非退化交代形式** という。すなわち、任意の $v\in V$ について
>
$$
\bigl[\omega(v,w)=0\ \text{が全ての }w\in V\text{ で成立}\bigr]
\ \Longrightarrow\ v=0
$$
>
> が成立する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym1-nondegenerate-form -->
### 例：面積形式の非退化性を調べる

**定義の確認**：以下で定義の条件を具体的に検証します。

先ほどの $\mathbb R^2$ 上の面積形式 $\omega_0$ を使います。$v=(x,y)$ が全ての $w$ に対して $\omega_0(v,w)=0$ を満たすとき、$w=(1,0)$ と $w=(0,1)$ を代入すると

$$
\omega_0(v,(1,0))=-y=0,
\qquad
\omega_0(v,(0,1))=x=0.
$$

従って $v=0$ であり、$\omega_0$ は非退化です。対照的に上記の三次元の形式では非零ベクトル $(0,0,1)$ が全ての相手と組にして零になるため、非退化ではありません。
<!-- definition-example-end -->

非退化であれば「検出不能な方向」がありません。このような形式と空間をまとめた組を、以下では主役として扱います。

<a id="def-sym1-symplectic-vector-space"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティックベクトル空間）**  
> 有限次元実ベクトル空間 $V$ に非退化交代双線形形式 $\omega$ を備えた組 $(V,\omega)$ をシンプレクティックベクトル空間という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym1-symplectic-vector-space -->
### 例：平面がシンプレクティック空間になる

**定義の確認**：以下で定義の条件を具体的に検証します。

$(\mathbb R^2,\omega_0)$ では、最初の例で $\omega_0$ の双線形性と交代性を確認し、直前の例で非退化性も確認しました。よってこの組は定義を満たします。一方、三次元の退化形式を備えた組は定義を満たしません。
<!-- definition-example-end -->

各 $v$ に線形形式を対応させる写像

$$
b_\omega:V\longrightarrow V^*,
\qquad
b_\omega(v)(w)=\omega(v,w)
$$

を考えます。$b_\omega(v)=0$ は、全ての $w$ に対して $\omega(v,w)=0$ であることを意味します。

したがって、非退化性の定義を写像の核に書き換えると

$$
\omega\text{ が非退化}
\quad\Longleftrightarrow\quad
\ker b_\omega=\{0\}
$$

です。[双対基底定理](../../../基礎科目/LA/LA3A/index.md#thm-la3a-dual-basis)から

$$
\dim V^*=\dim V
$$

が成立します。非退化性を仮定すると、$\ker b_\omega=\{0\}$ です。[双対基底定理](../../../基礎科目/LA/LA3A/index.md#thm-la3a-dual-basis)より

$$
\dim V^*=\dim V=m
$$

と置けます。$V$ の基底を $v_1,\ldots,v_m$ とし、その像を考えます。これらは次の理由で一次独立です。

$$
\sum_{i=1}^m c_i b_\omega(v_i)=0
\quad\Longrightarrow\quad
b_\omega\left(\sum_{i=1}^m c_i v_i\right)=0
\quad\Longrightarrow\quad
c_1=\cdots=c_m=0.
$$

像には $m=\dim V^*$ 個の一次独立なベクトルがあるため、有限次元ベクトル空間の基底の性質から $V^*$ 全体を張ります。従って $b_\omega$ は全単射、つまり線形同型です。

## 2. 非退化なら次元が偶数になる

基底を取り、$\omega$ を行列で表します。

$$
\Omega_{ij}=\omega(v_i,v_j),
\qquad
\omega(u,v)=[u]^{\mathsf T}\Omega[v].
$$

交代性から $\Omega^{\mathsf T}=-\Omega$ です。非退化性の定義をこの行列表示に代入すると、全ての $w$ に対する零条件は

$$
[v]^{\mathsf T}\Omega[w]=0\quad(\forall w\in V)
\quad\Longleftrightarrow\quad
[v]^{\mathsf T}\Omega=0
\quad\Longleftrightarrow\quad
\Omega^{\mathsf T}[v]=0
$$

となります。これは [LA3Eの双線形形式の行列表示と非退化性](../../../基礎科目/LA/LA3E/index.md#prop-la3e-bilinear-nondegenerate-matrix) を交代形式に適用した計算です。よって非退化性は $\ker\Omega^{\mathsf T}=\{0\}$ と同値です。$\Omega$ は正方行列なので、これは $\Omega$ が可逆であることと同値です。

<a id="thm-sym1-even-dimension"></a>

<!-- formal-statement-start -->
> **定理（シンプレクティック空間の偶数次元性）**  
> $(V,\omega)$ が有限次元実シンプレクティックベクトル空間なら、$\dim V$ は偶数である。零次元の場合も含む。
<!-- formal-statement-end -->

### 証明の見取り図

奇数次の交代行列は行列式が零となり、非退化性と両立しません。この定理の次には、偶数次元であるだけでなく標準形へ必ず変換できることを構成的に示します。

<!-- proof-start -->
### 証明

$m=\dim V$ とし、上記の $m$ 次正方行列 $\Omega$ を取ります。

[転置で行列式が変わらない定理](../../../基礎科目/LA/LA3B/index.md#thm-la3b-det-transpose)を、まず $\Omega$ に適用します。続いて [行列式の基本変形の定理](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-elementary-operations)を $-\Omega$ の全 $m$ 行へのスカラー倍に適用すると

$$
\det\Omega
=\det(\Omega^{\mathsf T})
=\det(-\Omega)
=(-1)^m\det\Omega.
$$

$m$ が奇数なら $\det\Omega=-\det\Omega$ となるため、実数体では $2\det\Omega=0$、すなわち $\det\Omega=0$ です。しかし非退化性は $\det\Omega\ne0$ を要求します。よって奇数次元は不可能です。$m=0$ は偶数として含みます。
<!-- proof-end -->

この証明は「奇数次元は無理」としか言いません。偶数次元で任意の交代形式が非退化になるわけではありません。例えば $\mathbb R^4$ の零形式は退化しています。次は、実際に与えられた非退化形式を標準形にする構成です。

## 3. まず一対を作り、残りから切り離す

非零ベクトル $e$ を一つ取ります。非退化性から $\omega(e,\cdot)$ は零写像ではありません。従って $\omega(e,w)\ne0$ となる $w$ があり、

$$
f=\frac{w}{\omega(e,w)}
$$

と置けば $\omega(e,f)=1$ です。$e,f$ は一次独立です。もし $f=ce$ なら $\omega(e,f)=c\omega(e,e)=0$ となり、矛盾するからです。

その二次元部分空間 $W=\operatorname{span}\{e,f\}$ と、両方向に対して交代形式が零になるベクトルの集合を調べます。

<a id="def-sym1-symplectic-orthogonal"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティック直交補）**  
> 交代双線形形式 $\omega$ を持つ実ベクトル空間 $V$ と部分空間 $W\subset V$ に対して
>
$$
W^\omega
=\{v\in V:\omega(v,w)=0\text{ が全ての }w\in W\text{ で成立}\}
$$
>
> を $W$ のシンプレクティック直交補という。通常の内積の直交補とは異なり、長さの概念を仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym1-symplectic-orthogonal -->
### 例：四次元で一対だけ残す

**定義の確認**：以下で定義の条件を具体的に検証します。

$\mathbb R^4$ の座標を $(q_1,q_2,p_1,p_2)$ とし、

$$
\omega_0(u,v)
=\sum_{i=1}^2(u_{q_i}v_{p_i}-u_{p_i}v_{q_i})
$$

とします。$W=\operatorname{span}\{e_{q_1},e_{p_1}\}$ に対し、$v=(a,b,c,d)$ なら

$$
\omega_0(v,e_{q_1})=-c,\qquad
\omega_0(v,e_{p_1})=a.
$$

従って $W^\omega=\{(0,b,0,d):b,d\in\mathbb R\}$ です。初めの一対を切り出しても、残りには $q_2,p_2$ の対が残ります。
<!-- definition-example-end -->

<a id="lem-sym1-pair-decomposition"></a>

<!-- formal-statement-start -->
> **補題（一対の切り出し）**  
> $(V,\omega)$ を有限次元実シンプレクティック空間とし、$e,f\in V$ が $\omega(e,f)=1$ を満たすとする。$W=\operatorname{span}\{e,f\}$ と置く。このとき
>
$$
V=W\oplus W^\omega
$$
>
> であり、$\omega$ を $W^\omega$ に制限した形式も非退化である。
<!-- formal-statement-end -->

### 証明の見取り図

任意の $v$ から $e,f$ 成分を引いて、両者と組にして零になる残差を作ります。その残差への射影を具体式で書けることが、帰納法を実行可能にします。

<!-- proof-start -->
### 証明

$v\in V$ に対し

$$
a=\omega(v,f),\qquad
b=-\omega(v,e),
$$

$$
r=v-ae-bf
$$

と置きます。交代性と $\omega(e,f)=1$ から

$$
\begin{aligned}
\omega(r,e)
&=\omega(v,e)-a\omega(e,e)-b\omega(f,e)\\
&=\omega(v,e)+b=0,\\
\omega(r,f)
&=\omega(v,f)-a\omega(e,f)-b\omega(f,f)\\
&=\omega(v,f)-a=0.
\end{aligned}
$$

$r$ は $e,f$ と組にして零なので、これらが張る $W$ の任意のベクトルとも組にして零です。従って $r\in W^\omega$ であり、

$$
v=(ae+bf)+r\in W+W^\omega
$$

という分解が得られます。さらに $v$ の $W$ 成分を

$$
P_W(v)=\omega(v,f)e-\omega(v,e)f
$$

と書けば、残差は $v-P_W(v)\in W^\omega$ です。この具体式が、後の演習A3で検証する射影です。

一方、$ae+bf\in W^\omega$ なら

$$
\omega(ae+bf,f)=a=0,
\qquad
\omega(ae+bf,e)=-b=0.
$$

よって $W\cap W^\omega=\{0\}$ であり、直和分解を得ます。

残った空間での非退化性も確認します。$z\in W^\omega$ が全ての $r\in W^\omega$ に対して $\omega(z,r)=0$ とします。$z\in W^\omega$ なので $e,f$ に対しても零です。任意の $v$ を上記の通り $v=ae+bf+r$ と分解すれば

$$
\omega(z,v)
=a\omega(z,e)+b\omega(z,f)+\omega(z,r)=0.
$$

元の $V$ 上の非退化性から $z=0$ です。従って制限形式も非退化です。
<!-- proof-end -->

## 4. 標準基底を一対ずつ構成する

今の操作を $W^\omega$ に繰り返します。何度でも繰り返せるわけではなく、各回で次元がちょうど2ずつ減るため、有限回で止まります。

<a id="def-sym1-symplectic-basis"></a>

<!-- formal-statement-start -->
> **定義（シンプレクティック基底）**  
> $2n$ 次元の交代形式付き実ベクトル空間 $(V,\omega)$ における基底
>
$$
e_1,\ldots,e_n,f_1,\ldots,f_n
$$
>
> が全ての $i,j$ について
>
$$
\omega(e_i,e_j)=0,\qquad
\omega(f_i,f_j)=0,\qquad
\omega(e_i,f_j)=\delta_{ij}
$$
>
> を満たすとき、シンプレクティック基底という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym1-symplectic-basis -->
### 例：正準座標の基底

**定義の確認**：以下で定義の条件を具体的に検証します。

$\mathbb R^{2n}$ の標準基底を、最初の $n$ 個が $q$ 方向、後半の $n$ 個が $p$ 方向となるよう並べます。$\omega_0(u,v)=\sum_i(u_{q_i}v_{p_i}-u_{p_i}v_{q_i})$ では、同種の方向どうしでは零、$e_{q_i}$ と $e_{p_j}$ の組では $\delta_{ij}$ です。従って定義の三条件を全て満たします。
<!-- definition-example-end -->

<a id="thm-sym1-linear-normal-form"></a>

<!-- formal-statement-start -->
> **定理（非退化交代形式の線形標準形）**  
> 有限次元実シンプレクティックベクトル空間 $(V,\omega)$ の次元を $2n$ とする。このときシンプレクティック基底が存在する。従って $\omega$ はその基底で
>
$$
\omega(u,v)=[u]^{\mathsf T}J[v],
\qquad
J=\begin{pmatrix}0&I_n\\-I_n&0\end{pmatrix}
$$
>
> と表される。特に任意の二つの同じ次元の実シンプレクティックベクトル空間は、形式を保存する線形同型で結ばれる。
<!-- formal-statement-end -->

### 証明の見取り図

[一対の切り出し補題](#lem-sym1-pair-decomposition)で $e_1,f_1$ を確保したら、他の方向とは $\omega$ の値が零になります。残余空間で同じ操作を続け、交差する組の値を一括して管理します。

<!-- proof-start -->
### 証明

$n=0$ なら空基底で成立します。$n\ge1$ とし、非零の $e_1$ を取ります。非退化性から $\omega(e_1,w)\ne0$ となる $w$ が存在し、

$$
f_1=\frac{w}{\omega(e_1,w)}
$$

とすると $\omega(e_1,f_1)=1$ です。

補題を適用して

$$
V=W_1\oplus V_1,\qquad
W_1=\operatorname{span}\{e_1,f_1\},\quad
V_1=W_1^\omega
$$

を得ます。$e_1,f_1$ は一次独立なので $\dim W_1=2$ です。$V_1$ の基底を $g_1,\ldots,g_k$ とします。直和であることから、$e_1,f_1,g_1,\ldots,g_k$ は $V$ を張り、線形独立でもあります。実際、

$$
ae_1+bf_1+\sum_{j=1}^k c_jg_j=0
$$

なら、左辺前半は $W_1$、後半は $V_1$ にあり、$W_1\cap V_1=\{0\}$ なので両方とも零です。$W_1$ と $V_1$ の基底の一次独立性から全係数が零となります。従って基底の本数を数えると

$$
2n=\dim V=2+k=2+\dim V_1.
$$

ゆえに $\dim V_1=2n-2$ であり、[一対の切り出し補題](#lem-sym1-pair-decomposition)により制限形式は非退化です。

$n-1$ に対する帰納法の仮定により、$V_1$ には

$$
e_2,\ldots,e_n,f_2,\ldots,f_n
$$

というシンプレクティック基底があります。$V_1=W_1^\omega$ だから、$i\ge2$ の各 $e_i,f_i$ は $e_1,f_1$ と組にして零です。また $W_1$ 内には

$$
\omega(e_1,e_1)=\omega(f_1,f_1)=0,\qquad
\omega(e_1,f_1)=1
$$

が成立し、$V_1$ 内には帰納法の三条件が成立します。従って全ての添字 $i,j$ に対して基底の三条件が成立します。

任意の $u,v\in V$ を構成した基底で

$$
u=\sum_i(q_i e_i+p_i f_i),\qquad
v=\sum_j(q'_j e_j+p'_j f_j)
$$

と展開します。双線形性と三つの基底条件を順に使うと、

$$
\begin{aligned}
\omega(u,v)
&=\sum_{i,j}\bigl(q_iq'_j\omega(e_i,e_j)
+q_ip'_j\omega(e_i,f_j)\\
&\hspace{35mm}+p_iq'_j\omega(f_i,e_j)
+p_ip'_j\omega(f_i,f_j)\bigr)\\
&=\sum_{i,j}\bigl(q_ip'_j\delta_{ij}
-p_iq'_j\delta_{ij}\bigr)\\
&=\sum_i(q_ip'_i-p_iq'_i).
\end{aligned}
$$

従って基底を $(e_1,\ldots,e_n,f_1,\ldots,f_n)$ の順に並べた係数行列が $J$ です。

最後に、同じ次元の二つの空間 $(V,\omega_1)$、$(V',\omega_2)$ でそれぞれ構成した基底を $e_i\mapsto e'_i$、$f_i\mapsto f'_i$ と送る線形写像 $T:V\to V'$ を取ります。基底間の対応なので $T$ は線形同型です。上の展開式は両方の形式で同じ係数 $q_i,p_i,q'_i,p'_i$ を用いるため、

$$
\omega_2(Tu,Tv)
=\sum_i(q_ip'_i-p_iq'_i)=\omega_1(u,v)
$$

となり、形式も保存されます。
<!-- proof-end -->

**注意：これは有限次元の線形定理です。** 多様体上で局所的に同じ形へする Darboux の定理は、閉性と局所微分同相の構成が必要な別の定理であり、後続で証明します。

## 5. 標準形を保存する線形写像

標準形を見つけた後は、「どの線形写像がそれを保つか」を考えます。$A:V\to V$ が可逆であっても、一般に $\omega(Au,Av)=\omega(u,v)$ とは限りません。

<a id="def-sym1-symplectic-map"></a>

<!-- formal-statement-start -->
> **定義（線形シンプレクティック写像・シンプレクティック群）**  
> シンプレクティックベクトル空間 $(V,\omega)$ の線形同型 $A:V\to V$ が
>
$$
\omega(Au,Av)=\omega(u,v)\qquad(u,v\in V)
$$
>
> を満たすとき、$A$ を線形シンプレクティック写像という。その全体を $\operatorname{Sp}(V,\omega)$ と書く。標準空間 $(\mathbb R^{2n},\omega_0)$ の場合を $\operatorname{Sp}(2n,\mathbb R)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sym1-symplectic-map -->
### 例：位置を伸ばし運動量を縮める

**定義の確認**：以下で定義の条件を具体的に検証します。

$a\in\mathbb R\setminus\{0\}$ とし、一対の座標で

$$
A(q,p)=(aq,p/a)
$$

と置きます。$u=(q,p)$、$v=(q',p')$ に対して

$$
\begin{aligned}
\omega_0(Au,Av)
&=(aq)(p'/a)-(p/a)(aq')\\
&=qp'-pq'\\
&=\omega_0(u,v).
\end{aligned}
$$

$a\ne0$ なので $A$ は可逆で、定義の保存条件を確認できました。[AMECH7の正準 scaling](../../../物理系/AMECH/AMECH7/index.md#def-amech7-canonical-transformation)と同じ現象を、線形形式だけで述べています。
<!-- definition-example-end -->

<a id="thm-sym1-matrix-criterion"></a>

<!-- formal-statement-start -->
> **定理（線形シンプレクティック写像の行列条件）**  
> $\mathbb R^{2n}$ に標準形式 $\omega_0(u,v)=u^{\mathsf T}Jv$ を入れる。実 $2n$ 次正方行列 $A$ について次は同値である。
>
> 1. $A\in\operatorname{Sp}(2n,\mathbb R)$。
> 2. $A^{\mathsf T}JA=J$。
> 3. $A$ は可逆で、$AJA^{\mathsf T}=J$。
>
> このとき逆行列は
>
$$
A^{-1}=-JA^{\mathsf T}J
$$
>
> で与えられる。
<!-- formal-statement-end -->

### 証明の見取り図

保存条件に座標表示を代入すると、全ての $u,v$ に関する等式が一つの行列等式になります。逆行列の公式では $J^2=-I$ を明示して用います。

<!-- proof-start -->
### 証明

任意の $u,v$ に対して

$$
\begin{aligned}
\omega_0(Au,Av)
&=(Au)^{\mathsf T}J(Av)\\
&=u^{\mathsf T}A^{\mathsf T}JAv.
\end{aligned}
$$

従って形式を保存することは

$$
u^{\mathsf T}(A^{\mathsf T}JA-J)v=0
$$

が全ての $u,v$ で成立することと同値です。$u,v$ に標準基底ベクトルを代入すると行列の各成分が零なので、これは条件2に一致します。

条件2なら、行列式を取って

$$
(\det A)^2\det J=\det J
$$

です。$J^2=-I$ から $J$ は可逆なので $\det J\ne0$、よって $\det A\ne0$ です。条件2の両辺の左から $-J$ を掛けます。

$$
(-J)A^{\mathsf T}JA=(-J)J=I.
$$

左逆行列は正方行列では逆行列なので

$$
A^{-1}=-JA^{\mathsf T}J.
$$

この式を $A A^{-1}=I$ に代入すると

$$
-AJA^{\mathsf T}J=I.
$$

右から $J$ を掛けると、$J^2=-I$ により

$$
AJA^{\mathsf T}=J.
$$

逆に条件3では $A$ が可逆です。ここでは左右の掛ける順序を保つため、まず $AJA^{\mathsf T}=J$ の逆行列を取り、

$$
(A^{\mathsf T})^{-1}J^{-1}A^{-1}=J^{-1}.
$$

$J^{-1}=-J$ を代入して負号を消し、

$$
(A^{\mathsf T})^{-1}JA^{-1}=J.
$$

左から $A^{\mathsf T}$、右から $A$ を掛けると

$$
J=A^{\mathsf T}JA
$$

が得られます。従って全て同値です。
<!-- proof-end -->

[AMECH7のJacobian行列条件](../../../物理系/AMECH/AMECH7/index.md#thm-amech7-jacobian-condition)は、一般の $C^1$ 級座標変換について各点の微分 $D\Phi$ にこの条件を課したものです。ここでは一個の線形写像 $A$ の保存性だけを完全に記述しました。

<a id="prop-sym1-group"></a>

<!-- formal-statement-start -->
> **命題（シンプレクティック群の積と逆）**  
> $A,B\in\operatorname{Sp}(2n,\mathbb R)$ なら、$AB$ と $A^{-1}$ も $\operatorname{Sp}(2n,\mathbb R)$ に属する。単位行列も属する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[行列条件](#thm-sym1-matrix-criterion)を使うと、

$$
\begin{aligned}
(AB)^{\mathsf T}J(AB)
&=B^{\mathsf T}(A^{\mathsf T}JA)B\\
&=B^{\mathsf T}JB\\
&=J.
\end{aligned}
$$

また $A^{\mathsf T}JA=J$ に左から $(A^{-1})^{\mathsf T}$、右から $A^{-1}$ を掛ければ

$$
J=(A^{-1})^{\mathsf T}JA^{-1}.
$$

単位行列については $I^{\mathsf T}JI=J$ です。
<!-- proof-end -->

## 6. 一般の行列をブロックで判定する

$q$ 方向と $p$ 方向で分けて、実 $n$ 次正方行列 $P,Q,R,S$ を用い

$$
A=\begin{pmatrix}P&Q\\R&S\end{pmatrix}
$$

と書きます。$J$ を掛ける順序に注意します。

$$
JA=\begin{pmatrix}R&S\\-P&-Q\end{pmatrix},
\qquad
A^{\mathsf T}=\begin{pmatrix}P^{\mathsf T}&R^{\mathsf T}\\Q^{\mathsf T}&S^{\mathsf T}\end{pmatrix}.
$$

従って

$$
A^{\mathsf T}JA
=
\begin{pmatrix}
P^{\mathsf T}R-R^{\mathsf T}P&
P^{\mathsf T}S-R^{\mathsf T}Q\\
Q^{\mathsf T}R-S^{\mathsf T}P&
Q^{\mathsf T}S-S^{\mathsf T}Q
\end{pmatrix}.
$$

<a id="ref-sym1-block-criterion"></a>

### ブロック行列による判定条件

[線形シンプレクティック写像の行列条件](#thm-sym1-matrix-criterion)と、$J$ の四つのブロックを比較すると、次の三条件が必要十分です。

$$
P^{\mathsf T}R=R^{\mathsf T}P,\qquad
Q^{\mathsf T}S=S^{\mathsf T}Q,
$$

$$
P^{\mathsf T}S-R^{\mathsf T}Q=I_n.
$$

残る左下のブロックは、最後の式を転置して

$$
S^{\mathsf T}P-Q^{\mathsf T}R=I_n
$$

としたうえで両辺に $-1$ を掛ければ $-I_n$ と一致します。したがって左下について独立した第四条件は要りません。

### 例：二種類の shear

$B=B^{\mathsf T}$、$C=C^{\mathsf T}$ なら

$$
A_B=\begin{pmatrix}I&B\\0&I\end{pmatrix},
\qquad
A_C=\begin{pmatrix}I&0\\C&I\end{pmatrix}
$$

はシンプレクティックです。[ブロック判定条件](#ref-sym1-block-criterion)を前者に適用すると $P=S=I,Q=B,R=0$ なので、

$$
P^{\mathsf T}R=R^{\mathsf T}P=0,\qquad
Q^{\mathsf T}S=B^{\mathsf T},\quad S^{\mathsf T}Q=B,
$$

$$
P^{\mathsf T}S-R^{\mathsf T}Q=I.
$$

つまり $B=B^{\mathsf T}$ がちょうど必要十分条件です。後者は $P=S=I,Q=0,R=C$ なので、

$$
P^{\mathsf T}R=C,\quad R^{\mathsf T}P=C^{\mathsf T},\qquad
Q^{\mathsf T}S=S^{\mathsf T}Q=0,
$$

$$
P^{\mathsf T}S-R^{\mathsf T}Q=I.
$$

従ってこちらは $C=C^{\mathsf T}$ がちょうど必要十分条件です。

また任意の可逆 $D$ に対し

$$
A_D=\begin{pmatrix}D&0\\0&D^{-\mathsf T}\end{pmatrix}
$$

もシンプレクティックです。実際、

$$
P=D,\quad Q=R=0,\quad S=D^{-\mathsf T}=(D^{\mathsf T})^{-1}
$$

を[ブロック条件](#ref-sym1-block-criterion)に代入すると、二つの対称条件は $0=0$ となり、残る条件は

$$
P^{\mathsf T}S-R^{\mathsf T}Q
=D^{\mathsf T}(D^{\mathsf T})^{-1}=I
$$

です。$D$ の可逆性は逆転置を定義するためにも必要です。多自由度では、位置の線形変換に合わせる運動量の変換が逆転置になることが分かります。

## 7. 体積を保つことと形式を保つことは違う

形式の保存は体積保存を含みます。ただし二自由度以上では逆は成り立ちません。

<a id="prop-sym1-determinant-one"></a>

<!-- formal-statement-start -->
> **命題（シンプレクティック行列の行列式）**  
> $A\in\operatorname{Sp}(2n,\mathbb R)$ なら
>
$$
\det A=1.
$$
>
> 従って標準座標の向き付き $2n$ 次元体積を保存する。
<!-- formal-statement-end -->

### 証明の見取り図

[行列条件](#thm-sym1-matrix-criterion)の行列式から分かるのは $(\det A)^2=1$ までです。ここで $\det A=-1$ を除くには、交代形式を $n$ 回外積した最高次形式を使います。

<!-- proof-start -->
### 証明

$\omega_0=\sum_{i=1}^n dq_i\wedge dp_i$ と置きます。[外積の次数付き交換則](../../../基礎科目/LA/LA3E/index.md#thm-la3e-wedge-algebra-laws)を使い、次数2の項の外積は互いに可換で、同じ項を二回選んだ外積は零です。従って

$$
\omega_0^{\wedge n}
=n!\,(dq_1\wedge dp_1)\wedge\cdots\wedge(dq_n\wedge dp_n).
$$

添字の $dp_i$ を末尾に移動すると、$dp_1$ は $n-1$ 個、$dp_2$ は $n-2$ 個、…の $dq$ を横切るので、交換回数は

$$
(n-1)+(n-2)+\cdots+1=\frac{n(n-1)}2.
$$

従って

$$
\omega_0^{\wedge n}
=(-1)^{n(n-1)/2}n!\,
dq_1\wedge\cdots\wedge dq_n\wedge dp_1\wedge\cdots\wedge dp_n.
$$

右辺の基底の外積を標準基底 $(e_{q_1},\ldots,e_{q_n},e_{p_1},\ldots,e_{p_n})$ に評価すると、係数は $(-1)^{n(n-1)/2}n!$ です。$n!$ は実数として零でないため、最高次形式 $\omega_0^{\wedge n}$ は零形式ではありません。

[線形シンプレクティック写像の定義](#def-sym1-symplectic-map)に従えば、$A$ がシンプレクティックであることは $A^*\omega_0=\omega_0$ と同値です。[引き戻しと外積](../../GEO/GEO7/index.md#prop-geo7-pullback-wedge)から

$$
A^*(\omega_0^{\wedge n})
=(A^*\omega_0)^{\wedge n}
=\omega_0^{\wedge n}.
$$

一方、[最高次外積の基底変換](../../../基礎科目/LA/LA3E/index.md#thm-la3e-top-form-change-of-basis)を $A$ が標準基底に作用する場合に適用します。標準基底を $b_1,\ldots,b_{2n}$ とすると、

$$
\begin{aligned}
(A^*\omega_0^{\wedge n})(b_1,\ldots,b_{2n})
&=\omega_0^{\wedge n}(Ab_1,\ldots,Ab_{2n})\\
&=(\det A)\,\omega_0^{\wedge n}(b_1,\ldots,b_{2n}).
\end{aligned}
$$

最高次形式は一次元空間の元なので、これは $A^*(\omega_0^{\wedge n})=(\det A)\,\omega_0^{\wedge n}$ を意味します。先ほど示した $A^*(\omega_0^{\wedge n})=\omega_0^{\wedge n}$ と比べ、右辺の非零性から $\det A=1$ を得ます。
<!-- proof-end -->

$n=1$ とします。任意の $2$ 次正方行列

$$
A=\begin{pmatrix}a&b\\c&d\end{pmatrix}
$$

に対し $J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ と置き、積を順に計算します。

$$
\begin{aligned}
A^{\mathsf T}JA
&=\begin{pmatrix}a&c\\b&d\end{pmatrix}
  \begin{pmatrix}c&d\\-a&-b\end{pmatrix}\\
&=\begin{pmatrix}0&ad-bc\\bc-ad&0\end{pmatrix}\\
&=(\det A)J.
\end{aligned}
$$

[行列条件](#thm-sym1-matrix-criterion)は $A^{\mathsf T}JA=J$ なので、一自由度では $\det A=1$ とシンプレクティック性が同値です。これは[AMECH7の一自由度の条件](../../../物理系/AMECH/AMECH7/index.md#prop-amech7-one-dof)と一致します。

$n=2$ では、座標順を $(q_1,q_2,p_1,p_2)$ として

$$
A=\operatorname{diag}(2,1/2,1,1)
$$

は $\det A=1$ ですが、

$$
\begin{aligned}
\omega_0(Ae_{q_1},Ae_{p_1})&=2,\\
\omega_0(e_{q_1},e_{p_1})&=1
\end{aligned}
$$

なのでシンプレクティックではありません。体積を保っていても、特定の位置・運動量の対の面積を壊しています。

## 8. 演習：構成と判定を自分で再現する

### Level A：定義を使って判定する

#### A1. 交代性と非退化性

$\mathbb R^2$ で $\omega((x,y),(x',y'))=3(xy'-yx')$ とする。交代性と非退化性を確かめ、$\omega(e,f)=1$ を満たす $e=(1,0)$ と $f$ を一つ求めよ。

- Level: A
- ID: SYM1-A1

<!-- solution-start -->
**詳細解答**　係数3倍は双線形性を保ち、$\omega(v,v)=3(xy-yx)=0$ です。$v=(x,y)$ が全ての $w$ と組にして零なら

$$
\omega(v,(1,0))=-3y=0,\qquad
\omega(v,(0,1))=3x=0
$$

から $x=y=0$ です。$e=(1,0)$ と $f=(0,1/3)$ なら $\omega(e,f)=3\cdot(1/3)=1$ です。
<!-- solution-end -->

#### A2. 退化する方向

$\mathbb R^3$ 上の形式 $\omega(u,v)=u_1v_2-u_2v_1$ の核 $\{u:\omega(u,v)=0\text{ for all }v\}$ を求めよ。

- Level: A
- ID: SYM1-A2

<!-- solution-start -->
**詳細解答**　$v=e_1$ と $v=e_2$ を代入すると、$-u_2=0$ と $u_1=0$ が必要です。逆に $u=(0,0,t)$ なら、どの $v$ に対しても $\omega(u,v)=0$ です。従って核は $\operatorname{span}\{e_3\}$ で、非零なので退化しています。
<!-- solution-end -->

#### A3. 一対を取り出す射影

非退化形式付き空間で $\omega(e,f)=1$ とする。$v$ の $W=\operatorname{span}\{e,f\}$ 成分を $P(v)=\omega(v,f)e-\omega(v,e)f$ と定める。$P$ が線形写像であり、$P^2=P$ と $\ker P=W^\omega$ を満たすことを示せ。

- Level: A
- ID: SYM1-A3

<!-- solution-start -->
**詳細解答**　$\omega$ は各引数について線形です。任意の $v,w\in V$、$c,d\in\mathbb R$ について

$$
\begin{aligned}
P(cv+dw)
&=\omega(cv+dw,f)e-\omega(cv+dw,e)f\\
&=cP(v)+dP(w)
\end{aligned}
$$

なので $P$ は線形です。$P(e)=\omega(e,f)e-\omega(e,e)f=e$、また

$$
P(f)=\omega(f,f)e-\omega(f,e)f=f.
$$

任意の $v$ に対して $P(v)=ae+bf\in W$ と書けるため、線形性と $P(e)=e,P(f)=f$ から

$$
P(P(v))=aP(e)+bP(f)=ae+bf=P(v).
$$

よって $P^2=P$ です。さらに $P(v)=0$ は、$e,f$ の一次独立性から

$$
\omega(v,f)=0,\qquad \omega(v,e)=0
$$

と同値です。$e,f$ は $W$ を張るので、これは $v\in W^\omega$ と同値です。
<!-- solution-end -->

#### A4. scaling の判定

$n=2$ とし $A=\operatorname{diag}(2,3,1/2,1/3)$、座標順は $(q_1,q_2,p_1,p_2)$ とする。シンプレクティック性と行列式を判定せよ。

- Level: A
- ID: SYM1-A4

<!-- solution-start -->
**詳細解答**　$D=\operatorname{diag}(2,3)$ と置くと、変換は

$$
A=\operatorname{diag}(D,D^{-\mathsf T})
$$

です。[ブロック判定条件](#ref-sym1-block-criterion)に $P=D,Q=R=0,S=D^{-\mathsf T}$ を代入すると

$$
P^{\mathsf T}S=D^{\mathsf T}D^{-\mathsf T}=I,
\qquad
P^{\mathsf T}R=Q^{\mathsf T}S=0
$$

となり、[行列条件](#thm-sym1-matrix-criterion)を満たします。従ってシンプレクティックであり、行列式も

$$
\det A=2\cdot3\cdot\frac12\cdot\frac13=1
$$

です。
<!-- solution-end -->

#### A5. 二次元の面積条件

$A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ に対して $A^{\mathsf T}JA$ を実際に掛け算し、$A$ がシンプレクティックである必要十分条件を求めよ。

- Level: A
- ID: SYM1-A5

<!-- solution-start -->
**詳細解答**　$J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ なので

$$
JA=\begin{pmatrix}c&d\\-a&-b\end{pmatrix}.
$$

さらに左から $A^{\mathsf T}$ を掛けると

$$
\begin{aligned}
A^{\mathsf T}JA
&=\begin{pmatrix}a&c\\b&d\end{pmatrix}
\begin{pmatrix}c&d\\-a&-b\end{pmatrix}\\
&=\begin{pmatrix}0&ad-bc\\bc-ad&0\end{pmatrix}\\
&=(ad-bc)J.
\end{aligned}
$$

よって必要十分条件は $ad-bc=\det A=1$ です。
<!-- solution-end -->

### Level B：構成を移して使う

#### B1. 四次元の基底構成

$\mathbb R^4$ で $\omega(u,v)=2(u_1v_3-u_3v_1)+3(u_2v_4-u_4v_2)$ とする。シンプレクティック基底を構成し、標準行列になることを確かめよ。

- Level: B
- ID: SYM1-B1

<!-- solution-start -->
**詳細解答**　$e_1=(1,0,0,0)$ とし、これに対して $f_1=(0,0,1/2,0)$ と取ると

$$
\omega(e_1,f_1)=2(1\cdot1/2)=1.
$$

残る二方向は

$$
e_2=(0,1,0,0),
\qquad
f_2=(0,0,0,1/3)
$$

と取ります。すると

$$
\omega(e_2,f_2)=3\left(1\cdot\frac13\right)=1
$$

です。ただし、交代性だけでは異なるベクトルの組が零とは言えません。実際の座標で残りの組を確かめます。$\omega$ の式に代入すると

$$
\begin{aligned}
\omega(e_1,e_2)&=2(1\cdot0-0\cdot0)+3(0\cdot0-0\cdot1)=0,\\
\omega(f_1,f_2)&=2(0\cdot0-\tfrac12\cdot0)+3(0\cdot\tfrac13-0\cdot0)=0,\\
\omega(e_1,f_2)&=2(1\cdot0-0\cdot0)+3(0\cdot\tfrac13-0\cdot0)=0,\\
\omega(e_2,f_1)&=2(0\cdot\tfrac12-0\cdot0)+3(1\cdot0-0\cdot0)=0.
\end{aligned}
$$

交代性により逆順の組も零です。また $\omega(e_i,e_i)=\omega(f_i,f_i)=0$ です。従って、全ての $i,j\in\{1,2\}$ で

$$
\omega(e_i,e_j)=0,\qquad
\omega(f_i,f_j)=0,\qquad
\omega(e_i,f_j)=\delta_{ij}
$$

を確認できました。四つのベクトルの非零成分は互いに異なる座標位置にあるため一次独立で、$\mathbb R^4$ の基底です。よって

$$
(e_1,e_2,f_1,f_2)
$$

は[シンプレクティック基底](#def-sym1-symplectic-basis)であり、対応する係数行列の四ブロックは $0,I_2,-I_2,0$ です。
<!-- solution-end -->

#### B2. 逆行列公式の直接検算

$B=B^{\mathsf T}$ とする。$A=\begin{pmatrix}I&B\\0&I\end{pmatrix}$ に対して $A^{-1}$ を直接求め、$-JA^{\mathsf T}J$ に一致することを確かめよ。

- Level: B
- ID: SYM1-B2

<!-- solution-start -->
**詳細解答**　[線形シンプレクティック写像の逆行列公式](#thm-sym1-matrix-criterion)との一致を、ブロックの積から直接検算します。

$$
\begin{pmatrix}I&B\\0&I\end{pmatrix}
\begin{pmatrix}I&-B\\0&I\end{pmatrix}
=\begin{pmatrix}I&0\\0&I\end{pmatrix}
$$

なので $A^{-1}=\begin{pmatrix}I&-B\\0&I\end{pmatrix}$ です。一方

$$
A^{\mathsf T}=\begin{pmatrix}I&0\\B&I\end{pmatrix},
\quad
A^{\mathsf T}J=\begin{pmatrix}0&I\\-I&B\end{pmatrix},
$$

$$
-JA^{\mathsf T}J
=
-\begin{pmatrix}0&I\\-I&0\end{pmatrix}
\begin{pmatrix}0&I\\-I&B\end{pmatrix}
=
\begin{pmatrix}I&-B\\0&I\end{pmatrix}.
$$

両者が一致します。$B$ の対称性は $A$ がシンプレクティックであるために必要で、上記の逆行列の積そのものには不要です。
<!-- solution-end -->

#### B3. 体積保存では足りない

$A=\operatorname{diag}(2,1/2,1,1)$ を二自由度の $(q_1,q_2,p_1,p_2)$ 上の線形写像とする。行列式と $\omega_0(Ae_{q_i},Ae_{p_i})$ を比較し、非正準性を示せ。

- Level: B
- ID: SYM1-B3

<!-- solution-start -->
**詳細解答**　行列式は $2\cdot(1/2)\cdot1\cdot1=1$ です。しかし

$$
\begin{aligned}
\omega_0(Ae_{q_1},Ae_{p_1})&=2,\\
\omega_0(Ae_{q_2},Ae_{p_2})&=\frac12,
\end{aligned}
$$

であり、もとの両組の値はともに1です。[線形シンプレクティック写像の定義](#def-sym1-symplectic-map)に反します。全体積の保存から各正準対の面積保存は導けません。
<!-- solution-end -->

#### B4. 行列条件を線形化する

$A(t)$ を $t=0$ の近傍の微分可能な行列族で、$A(0)=I$、$A(t)^{\mathsf T}JA(t)=J$ とする。$X=A'(0)$ が満たす条件を求め、ブロック $X=\begin{pmatrix}K&B\\C&D\end{pmatrix}$ の制約を導け。

- Level: B
- ID: SYM1-B4

<!-- solution-start -->
**詳細解答**　積の微分を $t=0$ で評価すると

$$
\begin{aligned}
0
&=\left.\frac d{dt}(A(t)^{\mathsf T}JA(t))\right|_{t=0}\\
&=X^{\mathsf T}JI+I^{\mathsf T}JX\\
&=X^{\mathsf T}J+JX.
\end{aligned}
$$

[行列条件](#thm-sym1-matrix-criterion)を微分した式をブロックで調べます。$X=\begin{pmatrix}K&B\\C&D\end{pmatrix}$ を代入し、積を順に計算すると

$$
JX=\begin{pmatrix}C&D\\-K&-B\end{pmatrix},
\qquad
X^{\mathsf T}J=\begin{pmatrix}-C^{\mathsf T}&K^{\mathsf T}\\-D^{\mathsf T}&B^{\mathsf T}\end{pmatrix}.
$$

これらを足して零行列に等しいと置けば、

$$
X^{\mathsf T}J+JX
=\begin{pmatrix}
C-C^{\mathsf T}&D+K^{\mathsf T}\\
-D^{\mathsf T}-K&B^{\mathsf T}-B
\end{pmatrix}=0.
$$

左上から $C=C^{\mathsf T}$、右下から $B=B^{\mathsf T}$、右上から $D=-K^{\mathsf T}$ です。左下は右上の転置に負号を付けた条件なので独立ではありません。

従って $X$ は $K$ が任意、$B,C$ が対称という形です。これは必要な一次条件であり、この計算だけで任意の曲線 $A(t)$ の存在を主張したわけではありません。
<!-- solution-end -->

### Level C：標準化から対称性までの総合

#### C1. 交代形式の標準化と保存写像の移送

$V=\mathbb R^4$ で、$\lambda,\mu>0$ として

$$
\omega(u,v)=\lambda(u_1v_3-u_3v_1)+\mu(u_2v_4-u_4v_2)
$$

とする。次を示せ。

1. この形式は非退化である。
2. シンプレクティック基底を作り、旧座標から標準座標への変換を一つ与えよ。
3. $\alpha\in\mathbb R$ とする。標準座標で $Q_1=q_1+\alpha p_1,\ Q_2=q_2,\ P_1=p_1,\ P_2=p_2$ となる写像を取り、もとの $u$ 座標での線形写像を求めよ。
4. その写像が $\omega$ を保存することを、元の変数で直接確認せよ。

- Level: C
- ID: SYM1-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$u=(u_1,u_2,u_3,u_4)$ が全ての $v$ と組にして零とします。$v=e_3,e_4,e_1,e_2$ をこの順に代入すると

$$
\lambda u_1=0,\quad
\mu u_2=0,\quad
-\lambda u_3=0,\quad
-\mu u_4=0.
$$

$\lambda,\mu>0$ だから $u=0$ で、非退化です。

**(2)**　元の $\mathbb R^4$ の標準基底を $\varepsilon_1,\varepsilon_2,\varepsilon_3,\varepsilon_4$ と書き、構成したいシンプレクティック基底とは記号を区別します。次の四本を選びます。

$$
e_1=\varepsilon_1,\quad e_2=\varepsilon_2,\qquad
f_1=\frac{\varepsilon_3}{\lambda},\quad
f_2=\frac{\varepsilon_4}{\mu}.
$$

$\lambda,\mu>0$ なので分母は零ではなく、四本は一次独立です。定義式に代入すると

$$
\begin{aligned}
\omega(e_1,f_1)&=\lambda(1\cdot\lambda^{-1})=1,\\
\omega(e_2,f_2)&=\mu(1\cdot\mu^{-1})=1,\\
\omega(e_1,f_2)&=0,\quad \omega(e_2,f_1)=0,\\
\omega(e_1,e_2)&=0,\quad \omega(f_1,f_2)=0.
\end{aligned}
$$

交代性により逆順も決まるので、[シンプレクティック基底の定義](#def-sym1-symplectic-basis)の三条件が成立します。$u=q_1e_1+q_2e_2+p_1f_1+p_2f_2$ と展開すると

$$
u=q_1\varepsilon_1+q_2\varepsilon_2
+\frac{p_1}{\lambda}\varepsilon_3+\frac{p_2}{\mu}\varepsilon_4.
$$

従って旧座標から新座標への変換は

$$
(q_1,q_2,p_1,p_2)
=(u_1,u_2,\lambda u_3,\mu u_4).
$$

**(3)**　標準座標への変換を $C$、そこでの shear を $S_\alpha$ と記します。

$$
\begin{aligned}
C(u_1,u_2,u_3,u_4)&=(u_1,u_2,\lambda u_3,\mu u_4),\\
S_\alpha(q_1,q_2,p_1,p_2)&=(q_1+\alpha p_1,q_2,p_1,p_2).
\end{aligned}
$$

まず $C$ を作用させ、次に $S_\alpha$ を作用させると、

$$
S_\alpha(Cu)
=(u_1+\alpha\lambda u_3,u_2,\lambda u_3,\mu u_4).
$$

最後に $C^{-1}(q_1,q_2,p_1,p_2)=(q_1,q_2,p_1/\lambda,p_2/\mu)$ で元の座標へ戻します。よって $T=C^{-1}S_\alpha C$ は

$$
T(u_1,u_2,u_3,u_4)
=(u_1+\alpha\lambda u_3,\ u_2,\ u_3,\ u_4).
$$

ここで使った $C^{-1}$ は $\lambda,\mu\ne0$ のため確かに定義されています。

**(4)**　$T(u)$ と $T(v)$ を $\omega$ へ代入し、第一の組を展開します。

$$
\begin{aligned}
&\lambda\bigl[(u_1+\alpha\lambda u_3)v_3
-u_3(v_1+\alpha\lambda v_3)\bigr]\\
&\qquad=\lambda(u_1v_3-u_3v_1)
+\alpha\lambda^2u_3v_3-\alpha\lambda^2u_3v_3\\
&\qquad=\lambda(u_1v_3-u_3v_1).
\end{aligned}
$$

第二の組は変化しないので

$$
\omega(Tu,Tv)
=\lambda(u_1v_3-u_3v_1)+\mu(u_2v_4-u_4v_2)
=\omega(u,v).
$$

これは $\lambda=\mu=1$ に限定しない保存性の直接検証です。
<!-- solution-end -->

## 9. 次章へ：各接空間で何が起こるか

ここまでの定理は、形式を保存する線形写像がなぜ $A^{\mathsf T}JA=J$ を満たすのかを明らかにしました。非退化交代形式は偶数次元の標準基底を持ち、一対を切り出す手順も具体的です。

しかし多様体では、各点の接空間で標準基底を作れるだけでは、**点によって滑らかに変わる座標**を作れるとは限りません。次の SYM2 で閉じた非退化2形式を導入し、その後、局所座標を作る Darboux の定理に必要な仮定と流れの構成へ進みます。
