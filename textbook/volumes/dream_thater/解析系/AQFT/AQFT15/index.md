# AQFT15 Type I/II/III因子

[AQFT14の因子性](../AQFT14/index.md#prop-aqft14-relative-commutant-and-factor)は、局所von Neumann環の中心が自明であるという条件でした。しかし中心が自明でも、有限次元行列環と連続体の局所von Neumann環を同一視できません。例えば行列環では密度行列を使った[部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)が自然ですが、**局所von Neumann環がType III因子なら、正の元を有限な断片から忠実に測るトレースは存在しません**。

この講義は、[VN7の射影同値と型分類](../../VN/VN7/index.md#def-vn7-factor-type-classification)を出発点として、なぜ「周囲のHilbert空間には密度作用素がある」と「局所von Neumann環にトレース密度がある」が別物なのかを証明します。Type IIIの存在は公理だけから導きません。具体的な自由場の局所Type III$_1$性の適用条件はAQFT28で検討します。

前提となるのは、固定した表現のHilbert空間 $\mathcal H$ 上の[AQFT9の局所von Neumann環](../AQFT9/index.md#def-aqft9-local-vn-net)

$$
\mathcal M(O)=\pi_\omega(\mathfrak A(O))''
\subset B(\mathcal H)
$$

です。[AQFT13の巡回・分離性](../AQFT13/index.md#cor-aqft13-vacuum-local-standard)が成立する場合にも、以下の型判定は別途必要です。

## 1. 因子と射影比較から型を再判定する

[von Neumann環の中心](../../VN/VN7/index.md#def-vn7-center)は $Z(M)=M\cap M'$ であり、これが $\mathbb CI$ の環を因子といいます。因子の「型」は、代数 $M$ **の内部**の部分等長作用素 $v$ による射影同値

$$
p\sim_M q
\iff
v^*v=p,\quad vv^*=q
$$

で定まります。これは[VN7のMurray–von Neumann同値](../../VN/VN7/index.md#def-vn7-murray-von-neumann-equivalence)です。$q\le p$ で $q\sim_M p$ なのに $q\ne p$ となる射影 $p$ は無限、そうした $q$ がなければ有限です。非零の真部分射影を持たない射影は最小射影です。

[VN7のI/II/III型の定義](../../VN/VN7/index.md#def-vn7-factor-type-classification)を、その判定順序に並べると次のようになります。

| 因子の型 | 非零最小射影 | 非零有限射影 | 代表的な振る舞い |
|---|---|---|---|
| I | 存在する | 存在する | $M_n(\mathbb C)$、$B(\ell^2)$ |
| II | 存在しない | 存在する | II$_1$ は単位射影が有限、II$_\infty$ は無限 |
| III | 存在しない | 存在しない | **全ての非零射影が無限** |

「無限次元だからType III」ではありません。$B(\ell^2)$ は無限次元ですが、階数1の最小射影を持つType I$_\infty$因子です。

### 直接例：行列因子と片側シフト

$M=M_3(\mathbb C)$ における $p=E_{11}+E_{22}$ は有限射影です。[行列環の射影同値とrankの一致](../../VN/VN7/index.md#thm-vn7-matrix-equivalence-rank)によって、$q\le p$、$q\sim_Mp$ なら $\operatorname{rank}q=\operatorname{rank}p=2$。包含する二つの2次元部分空間は等しいので $q=p$。一方 $E_{11}$ は最小射影なので $M$ はType I$_3$です。

$N=B(\ell^2(\mathbb N))$ では $Se_k=e_{k+1}$ とすると $S^*S=I$、$SS^*=I-E_{11}$ です。[片側シフトが示す単位射影の無限性](../../VN/VN7/index.md#prop-vn7-shift-infinite-identity)から単位射影は無限です。しかし $E_{11}$ は依然として最小射影なので、$N$ はType I$_\infty$でありType IIIではありません。

## 2. トレースがある、とは何を要求するか

[VN5の正規状態と密度作用素](../../VN/VN5/index.md#thm-vn5-density-state-correspondence)は $B(H)$ 上での理論です。一般のvon Neumann環 $M$ では、$\operatorname{Tr}_H$ をそのまま使っても、有限値かつ適切なトレースが局所von Neumann環の中にあるとは限りません。

正の元 $M_+=\{a\in M:a\ge0\}$ に対し、値が $+\infty$ となることも許す「重み」を考えます。正の元について加法的・正斉次な関数 $\tau:M_+\to[0,+\infty]$ のうち、$\tau(x^*x)=\tau(xx^*)$ を満たすものがトレースです。普通の有限値の線形トレースをこの枠に含めます。

<a id="def-aqft15-nsf-trace"></a>

<!-- formal-statement-start -->
> **定義（忠実・正規・半有限トレース）**  
> 単位的von Neumann環 $M\subset B(H)$ のトレース $\tau:M_+\to[0,+\infty]$ について、次を定める。
>
> 1. **忠実**：$\tau(a)=0$ かつ $a\ge0$ なら $a=0$。
> 2. **正規**：正の元の増大ネット $a_i\uparrow a$ に対して $\tau(a)=\sup_i\tau(a_i)$。
> 3. **半有限**：全ての非零 $a\in M_+$ に対し、$0\ne b\in M_+$、$b\le a$、$\tau(b)<+\infty$ を満たす $b$ が存在する。
>
> この三条件を全て満たすトレースを**忠実正規半有限トレース**と呼ぶ。ここで増大ネットの上限は作用素の順序で取る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft15-nsf-trace -->
### 直接例：通常の行列トレース

**定義の確認**：三条件を行列の性質から一つずつ検算します。

$M=M_2(\mathbb C)$、$\tau(a)=a_{11}+a_{22}$ とします。任意の $x$ に対して

$$
\tau(x^*x)=\sum_{i,j=1}^2|x_{ij}|^2=\tau(xx^*)
$$

でトレース性が成立します。$a\ge0$ で $\tau(a)=0$ なら、固有値は非負で和が零なので全て零、従って $a=0$ で忠実です。有限次元では増大ネットの各行列成分の極限でトレースの極限を取れるため正規です。非零の正作用素 $a$ に対し $b=a$ とすれば $0<\tau(b)<\infty$ で半有限性も成り立ちます。各条件を個別に確かめました。
<!-- definition-example-end -->

ここで「正規」は極限を保つ性質であり、「半有限」は**どの非零の正の元の下にも、有限トレースの非零の正の元を見つけられる**という性質です。単に $\tau(I)=+\infty$ であることは半有限性の失敗を意味しません。例えば $B(\ell^2)$ の通常の作用素トレースは $\operatorname{Tr}(I)=+\infty$ ですが、有限階数の正作用素を下から探せるので忠実正規半有限です。

## 3. Type III因子には半有限トレースが存在しない

重要なのは「射影の有限性」と「トレースが有限であること」が結び付く点です。

<a id="prop-aqft15-finite-trace-projection"></a>

<!-- formal-statement-start -->
> **命題（有限トレース射影は有限射影）**  
> $M$ をvon Neumann環、$\tau$ を $M$ 上の忠実なトレースとする。射影 $p\in M$ に対して $\tau(p)<\infty$ なら、$p$ は $M$ 内でMurray–von Neumann有限である。
<!-- formal-statement-end -->

### 証明の見取り図

部分等長作用素で同値な二つの射影のトレースは等しいため、真の差があればその差のトレースは零になります。忠実性がこれを禁じます。

<!-- proof-start -->
### 証明

$q\le p$、$q\sim_Mp$ とします。同値の定義から $v^*v=p$、$vv^*=q$ となる $v\in M$ があり、トレース性から

$$
\tau(p)=\tau(v^*v)=\tau(vv^*)=\tau(q).
$$

$q\le p$ のため $p-q$ は射影で、$p=q+(p-q)$ です。$\tau(p)<\infty$ なので加法性により

$$
0\le\tau(p-q)=\tau(p)-\tau(q)=0.
$$

忠実性から $p-q=0$、従って $p=q$ です。[有限射影の定義](../../VN/VN7/index.md#def-vn7-finite-projection)により $p$ は有限です。$\square$
<!-- proof-end -->

<a id="thm-aqft15-typeiii-no-nsf-trace"></a>

<!-- formal-statement-start -->
> **定理（Type III因子のトレース障害）**  
> $M$ をType III因子とする。このとき $M$ 上に忠実正規半有限トレースは存在しない。実際、忠実**半有限**トレースだけでも存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

非零の射影 $p$ に半有限性を適用して正の元 $b$ を取り、その正のスペクトル部分を射影へ切り出します。有限トレースの非零射影が生じ、Type IIIの定義と矛盾します。正規性はこの矛盾には使いません。

<!-- proof-start -->
### 証明

$M$ は単位的なので $p=I\ne0$ を取れます（実際には任意の非零射影でよい）。半有限性を正の元 $p$ に適用すると

$$
0\ne b\in M_+,\qquad b\le p,\qquad \tau(b)<\infty
$$

を得ます。$b\le p$ なら $b=pbp$ です。よって $b$ の正のスペクトル部分への射影は $p$ の下にあります。

$b\ne0$ かつ $b\ge0$ なので、ある $\varepsilon>0$ に対してスペクトル射影

$$
q=\mathbf 1_{[\varepsilon,\infty)}(b)\in M
$$

が非零です。スペクトル計算により $b\ge\varepsilon q$、$0<q\le p$ が成り立ちます。トレースの単調性を使うと

$$
0<\varepsilon\tau(q)\le\tau(b)<\infty.
$$

従って $q$ は非零で有限トレースの射影です。[有限トレース射影の命題](#prop-aqft15-finite-trace-projection)から $q$ は有限射影。しかし[Type IIIの定義](../../VN/VN7/index.md#def-vn7-factor-type-classification)では非零射影は全て無限であり、矛盾します。$\square$
<!-- proof-end -->

この証明は、Type IIIの局所von Neumann環が「どの状態も正規でない」「周囲のHilbert空間に密度作用素がない」とは言っていません。また「正規でないトレース」について無条件に何でも排除したわけでもありません。示したのは忠実かつ半有限なトレースの不在です。

## 4. Type IIの実例：有限トレースがあり、最小射影がない

Type IIは、Type IIIと同じ「最小射影がない」側にありながら、有限射影が残ることを確かめる必要があります。ここでは群の左平行移動からII$_1$因子を一つ構成します。一般の群von Neumann環の理論を使うのではなく、この例に必要な計算を行います。

$\Gamma$ を自然数の有限個だけを動かす置換全体の群とします。これは可算無限群です。任意の非単位置換 $g$ は有限の台を持ち、その台を互いに重ならない場所へ運ぶ置換 $h$ が無限に選べます。従って共役元 $hgh^{-1}$ は無限個あり、**非単位元の共役類は全て無限**です。

$H=\ell^2(\Gamma)$ に正規直交基底 $\delta_g$ を取り、

$$
\lambda(h)\delta_g=\delta_{hg},\qquad
\rho(h)\delta_g=\delta_{gh^{-1}},\qquad
M=\{\lambda(h):h\in\Gamma\}'' 
$$

とします。各 $\lambda(h)$ と $\rho(k)$ は可換です。また $\tau(T)=\langle T\delta_e,\delta_e\rangle$ とします。

<a id="prop-aqft15-icc-factor-ii1"></a>

<!-- formal-statement-start -->
> **命題（有限台置換群が作るII₁因子）**  
> 上記の $\Gamma$ と $M\subset B(\ell^2(\Gamma))$ について、$M$ は無限次元の因子であり、$\tau$ は忠実・正規・有限のトレースで $\tau(I)=1$ を満たす。$M$ に非零最小射影は存在せず、従って $M$ はII$_1$因子である。
<!-- formal-statement-end -->

### 証明の見取り図

まず基底でトレースと忠実性を確かめます。次に中心の元が作るベクトルの係数は共役類上で一定となり、$\ell^2$ 条件で単位元以外の係数が消えます。最後に「有限因子に最小射影があれば有限次元行列環になる」を小補題として示します。

<!-- proof-start -->
### 証明

**(1) トレース。** 群元について

$$
\tau(\lambda(g))=
\begin{cases}
1&g=e,\\
0&g\ne e.
\end{cases}
$$

従って $\tau(\lambda(g)\lambda(h))=\mathbf1_{gh=e}=\mathbf1_{hg=e}=\tau(\lambda(h)\lambda(g))$ です。群元の有限線形結合にも双線形性で拡張できます。[von Neumannの二重可換子定理](../../VN/VN2/index.md#thm-vn2-bicommutant)によりその *-代数は $M$ に弱作用素位相で稠密です。固定した $A$ について $T\mapsto\tau(AT)$ と $T\mapsto\tau(TA)$ はどちらもベクトル内積で表され弱作用素連続なので、片方ずつ極限を取れば $\tau(AB)=\tau(BA)$ は全ての $A,B\in M$ に拡張されます。

$\tau$ は単位ベクトル $\delta_e$ のベクトル汎関数なので正で正規、$\tau(I)=1$ です。$\tau(T^*T)=0$ なら $T\delta_e=0$。$T\in M$ は全ての $\rho(h)$ と可換し、$\delta_g=\rho(g^{-1})\delta_e$ だから

$$
T\delta_g=T\rho(g^{-1})\delta_e
=\rho(g^{-1})T\delta_e=0
$$

となります。基底全体で零なので $T=0$、よって忠実です。

**(2) 因子性。** $T\in Z(M)$ とし、$\xi=T\delta_e=\sum_g c_g\delta_g$ と書きます。中心性から任意の $h$ について $\lambda(h)T\lambda(h)^*=T$。また $\lambda(h)^*\delta_e=\delta_{h^{-1}}=\rho(h)\delta_e$ なので

$$
\xi=\lambda(h)\rho(h)\xi
=\sum_g c_g\delta_{hgh^{-1}}.
$$

従って係数 $c_g$ は共役類ごとに一定です。非単位元の共役類は全て無限なので、$\sum_g|c_g|^2<\infty$ であるためには $c_g=0$（$g\ne e$）でなければなりません。ゆえに $\xi=c_e\delta_e$。$T$ と $\rho$ の可換性により $T\delta_g=c_e\delta_g$ が全ての $g$ で成立し、$T=c_eI$。従って $Z(M)=\mathbb CI$ です。

**(3) 最小射影の不在。** まず有限トレースを持つ因子 $N$ が最小射影 $p\ne0$ を持てば、$N$ は有限次元行列環であることを示します。$\overline{NpH}$ への射影を $z$ とすると、この部分空間は $N$ と $N'$ の双方の作用で不変なので $z\in N\cap N'=Z(N)$。$p\ne0$ ゆえ $z=I$。従って任意の非零射影 $r$ に対して $rNp\ne0$ です（そうでなければ $rNpH=0$ から $rz=0$）。

$rXp\ne0$ の極分解の部分等長作用素 $v\in N$ について $v^*v\le p$、$vv^*\le r$ です。$p$ は最小だから $v^*v=p$、従って $r$ は $p$ と同値な部分射影を含みます。$p_1=p$ に始め、残り $I-\sum_{j=1}^kp_j$ が非零なら、この議論でそれと直交する $p_{k+1}\sim p$ を追加します。忠実有限トレースの下で各 $\tau(p_j)=\tau(p)>0$ なので、$\sum_j\tau(p_j)\le\tau(I)<\infty$ により有限回で残りが零となります。つまり $I=p_1+\cdots+p_n$。

$p_j$ と $p$ を結ぶ部分等長作用素 $v_j$ を用い $e_{ij}=v_iv_j^*$ と置くと、$e_{ij}e_{k\ell}=\delta_{jk}e_{i\ell}$ となります。最小性から $pNp=\mathbb Cp$ です（もし $pNp$ に非スカラー自己共役元があれば、そのスペクトル射影が非自明な部分射影を与える）。各 $p_iNp_j$ は $\mathbb Ce_{ij}$ となるので $N=\operatorname{span}\{e_{ij}\}\cong M_n(\mathbb C)$ です。

元の $M$ は無限次元です。実際、相異なる群元 $g_1,\ldots,g_k$ に対して

$$
\sum_{j=1}^{k}a_j\lambda(g_j)=0
\ \Longrightarrow\
\sum_{j=1}^{k}a_j\delta_{g_j}=0
\ \Longrightarrow\
a_1=\cdots=a_k=0.
$$

従って無限個の $\lambda(g)$ は線形独立であり、上の結論から $M$ は最小射影を持ちません。

一方 $\tau(I)=1$ で $\tau$ は忠実です。[有限トレース射影は有限射影](#prop-aqft15-finite-trace-projection)を $p=I$ に適用すると $I$ は有限射影。[VN7の型分類](../../VN/VN7/index.md#def-vn7-factor-type-classification)から $M$ はII$_1$です。$\square$
<!-- proof-end -->

この具体例は、Type IIを「あるらしい型」として済ませないためのものです。有限トレースと最小射影の不在を別々に確かめると、Type IIIとの差が見えます。

## 5. 外側の密度作用素と内側のトレースは別物

いま $M\subset B(\mathcal H)$ がType III因子であり、$\Omega\in\mathcal H$ が単位ベクトルであるとします。$\omega(A)=\langle\Omega,A\Omega\rangle$ は $M$ 上の正規状態です。しかし $B(\mathcal H)$ では階数1作用素 $D=|\Omega\rangle\langle\Omega|$ を使って

$$
\omega(A)=\operatorname{Tr}_{\mathcal H}(DA),\qquad A\in M
$$

とも表せます。右辺のトレースはあくまで**周囲の $B(\mathcal H)$ のトレース**です。Type IIIの $M$ 自身に半有限トレースを与えたわけではありません。

<a id="prop-aqft15-ambient-density"></a>

<!-- formal-statement-start -->
> **命題（Type III局所von Neumann環と周囲の階数1密度作用素）**  
> $M\subset B(\mathcal H)$ が単位的Type III因子、$\|\Omega\|=1$ とする。$D=|\Omega\rangle\langle\Omega|$ は周囲の $B(\mathcal H)$ の正のtrace class作用素で $\operatorname{Tr}_{\mathcal H}D=1$ を満たし、$M$ のベクトル状態を上式で表示する。ただし $D\notin M$ であり、この表示から $M$ の忠実正規半有限トレースの存在は導けない。
<!-- formal-statement-end -->

### 証明の見取り図

階数1作用素はHilbert空間上では普通の密度作用素ですが、もしType III環の元なら、その中で最小射影になってしまいます。

<!-- proof-start -->
### 証明

$D^*=D$、$D^2=D$、$D\ge0$、$\operatorname{Tr}_{\mathcal H}D=1$ は、$\Omega$ を含む正規直交基底に関する行列表示 $\operatorname{diag}(1,0,\ldots)$ から従います。任意の $A\in B(\mathcal H)$ について $\operatorname{Tr}_{\mathcal H}(DA)=\langle\Omega,A\Omega\rangle$ です。

もし $D\in M$ なら、$M$ 内の射影 $q\le D$ の像は周囲の $B(\mathcal H)$ 上でも $\mathbb C\Omega$ の部分空間です。従って

$$
0\le q\le D
\quad\Longrightarrow\quad
q=0\ \text{または}\ q=D.
$$

これは $D$ が $M$ の非零最小射影であることを意味し、[Type IIIの定義](../../VN/VN7/index.md#def-vn7-factor-type-classification)と矛盾します。従って $D\notin M$ です。また、[Type III因子のトレース障害](#thm-aqft15-typeiii-no-nsf-trace)により局所von Neumann環内の忠実半有限トレースも存在しません。$\square$
<!-- proof-end -->

[AQFT13の分離ベクトルによる忠実性](../AQFT13/index.md#prop-aqft13-local-state-faithful)が使える場合、$\Omega$ の制限状態 $\omega|_M$ は忠実です。しかしその場合でさえ $D$ の $B(\mathcal H)$ 上の表現と、$M$ に内在するトレース密度の表現を混同できません。

<a id="prop-aqft15-typei-tensor-obstruction"></a>

<!-- formal-statement-start -->
> **命題（Type III因子に対するType Iテンソル分解の障害）**  
> $M\subset B(\mathcal H)$ をType III因子とする。Hilbert空間 $\mathcal K,\mathcal L$ とユニタリ $U:\mathcal H\to\mathcal K\otimes\mathcal L$ を使って
>
$$
UMU^*=B(\mathcal K)\otimes I_{\mathcal L}
$$
>
> とすることはできない。ここで両Hilbert空間は非零とする。
<!-- formal-statement-end -->

### 証明の見取り図

右辺には $\mathcal K$ の階数1射影を入れられるため、最小射影を持ちます。Type IIIの最小射影不在と衝突します。

<!-- proof-start -->
### 証明

$\xi\in\mathcal K$ を単位ベクトルとし、$P_\xi=|\xi\rangle\langle\xi|$ とします。$P_\xi\otimes I_{\mathcal L}$ は $B(\mathcal K)\otimes I_{\mathcal L}$ の非零射影です。この環内の射影 $Q\le P_\xi\otimes I$ は $Q=R\otimes I$ という形で、$R$ は $B(\mathcal K)$ の射影かつ $R\le P_\xi$ です。従って $R=0$ または $P_\xi$。これは右辺が最小射影を持つことを意味します。

ユニタリ共役は射影の包含と最小性を保存します。仮定の等号が成立すると $M$ にも非零最小射影が存在し、Type IIIの定義に矛盾します。$\square$
<!-- proof-end -->

「Type IIIの局所von Neumann環には部分トレースが**一切定義不能**」という表現は強すぎます。Type Iのtensor分解を使った**標準的な局所部分系の密度行列**が無条件には得られない、という意味です。緩衝領域を入れたType I中間因子の可能性は次講AQFT16で扱います。鋭い境界と緩衝領域を混同しないことが重要です。

## 6. 物理的な読み方と論理的な境界

[Haag双対性](../AQFT14/index.md#def-aqft14-haag-duality)、因子性、Reeh–Schlieder性は、いずれも「局所Type III」の定義ではありません。例えば1次元Hilbert空間上のスカラーnet $\mathcal M(O)=\mathbb C$ は局所性・因子性を満たしますがType I$_1$です。**局所性だけでType IIIを結論してはいけません。**

Type IIIが追加の模型・条件の下で証明できたとき、本講から確実に言えるのは次のことです。第一に局所von Neumann環には忠実正規半有限トレースがありません。第二に、局所von Neumann環を $B(\mathcal K)\otimes I$ とする鋭いType Iテンソル因子分解はありません。第三に、それでも真空ベクトルがあれば周囲の $B(\mathcal H)$ 上の階数1密度作用素は存在します。**トレース不在と状態不在は違います。**

さらにType IIIをType III$_\lambda$（$\lambda\in[0,1]$）へ細分する理論や、具体的自由場のdouble coneがどの型を持つかの判定は、この射影比較だけでは完結しません。それは後続章の課題です。

## 7. 演習と詳細解答

### Level A：射影とトレースを手で判定する

<a id="ex-aqft15-a01"></a>
#### AQFT15-A01 行列射影の有限性

$M=M_4(\mathbb C)$、$p=\operatorname{diag}(1,1,0,0)$ とする。$p$ が有限射影であることを示し、$M$ の型を判定せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $q\le p$ かつ $q\sim_Mp$ と仮定する。[射影同値とrankの一致](../../VN/VN7/index.md#thm-vn7-matrix-equivalence-rank)から $\operatorname{rank}q=2$。また $\operatorname{ran}q\subset\operatorname{ran}p=\operatorname{span}\{e_1,e_2\}$ で右辺も2次元なので両像は一致する。直交射影は像で一意なので $q=p$。ゆえに $p$ は有限。$E_{11}$ は非零最小射影、中心はスカラーなので $M$ はType I$_4$である。
<!-- solution-end -->

<a id="ex-aqft15-a02"></a>
#### AQFT15-A02 シフトと最小射影

$H=\ell^2(\mathbb N)$、$Se_k=e_{k+1}$ とする。$I$ の無限性と $E_{11}$ の最小性をそれぞれ示し、型を決定せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $S^*S e_k=e_k$ より $S^*S=I$。$SS^*$ は $S$ の像 $\overline{\operatorname{span}}\{e_2,e_3,\ldots\}$ への射影なので $SS^*=I-E_{11}<I$。従って $I\sim I-E_{11}$、$I$ は無限。$0\le q\le E_{11}$ なら $\operatorname{ran}q\subset\mathbb Ce_1$ だから $q=0$ または $E_{11}$、よって最小。中心がスカラーであることは[VN7の全有界作用素環の因子性](../../VN/VN7/index.md#thm-vn7-bh-factor)から分かる。型はI$_\infty$でありIIIではない。
<!-- solution-end -->

<a id="ex-aqft15-a03"></a>
#### AQFT15-A03 行列トレースの三条件

$M=M_2(\mathbb C)$、$\tau(a)=\operatorname{Tr}(a)$ とする。忠実・正規・半有限をそれぞれ確認せよ。また $\tau(I)$ を計算せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $a\ge0$ の固有値を $\lambda_1,\lambda_2\ge0$ とすれば $\tau(a)=\lambda_1+\lambda_2$。零なら両固有値が零で $a=0$、よって忠実。有限次元の増大ネットは各行列要素（従ってトレース）で上限へ収束するので正規。非零 $a\ge0$ に $b=a$ を選ぶと $0<\tau(b)<\infty$ で半有限。$\tau(I)=1+1=2$。正規性と半有限性は異なる判定である。
<!-- solution-end -->

<a id="ex-aqft15-a04"></a>
#### AQFT15-A04 Type IIIと最小射影

$M$ がType III因子であるとする。非零最小射影を持てない理由を、[有限射影の定義](../../VN/VN7/index.md#def-vn7-finite-projection)から説明せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 非零最小射影 $p$ があると仮定する。$q\le p$ で $q\sim_Mp$ なら、$v^*v=p$ を満たす部分等長作用素があるから $q=vv^*\ne0$。最小性から $q=p$ となる。つまり $p$ は有限射影である。しかしType IIIでは非零射影は全て無限なので矛盾。従って非零最小射影は存在しない。
<!-- solution-end -->

### Level B：障害の証明を再構成する

<a id="ex-aqft15-b01"></a>
#### AQFT15-B01 半有限性から有限射影へ

$M$ に忠実半有限トレース $\tau$ があり、$p\in M$ は非零射影とする。$\tau(p)$ は無限でもよい。$p$ の下に非零有限射影が存在することを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** 半有限性より $0<b\le p$、$\tau(b)<\infty$ となる $b\in M_+$ を取る。$b\ne0$ なので、ある $\varepsilon>0$ で $q=\mathbf1_{[\varepsilon,\infty)}(b)\ne0$ となる。$b\le p$ から $q\le p$、スペクトル計算から $\varepsilon q\le b$。従って $\varepsilon\tau(q)\le\tau(b)<\infty$。$\varepsilon>0$ なので $\tau(q)<\infty$。[有限トレース射影命題](#prop-aqft15-finite-trace-projection)の仮定（忠実性と有限トレース）を $q$ が満たし、$q$ は有限射影。$\tau(p)$ が有限である必要はない。
<!-- solution-end -->

<a id="ex-aqft15-b02"></a>
#### AQFT15-B02 外部の密度作用素はなぜ局所射影にならないか

$M\subset B(H)$ をType III因子、$\|\Omega\|=1$ とし $D=|\Omega\rangle\langle\Omega|$ とする。$\operatorname{Tr}_H(D)=1$ と $\operatorname{Tr}_H(DA)=\langle\Omega,A\Omega\rangle$ を示し、$D\notin M$ を示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\Omega=e_1$ で始まる正規直交基底を取ると $D e_1=e_1$、$D e_j=0$（$j\ge2$）。従って階数1で $\operatorname{Tr}_H(D)=1$。$DA$ の対角和は $\langle e_1,Ae_1\rangle$ のみだから状態の式が成立。もし $D\in M$ なら、$M$ の任意の射影 $q\le D$ は像が1次元以下なので $q=0$ または $D$。これは $D$ が非零最小射影であることを意味し、Type IIIで最小射影が存在しないことと矛盾する。よって $D\notin M$。トレース表示は周囲の $B(H)$ のものだけである。
<!-- solution-end -->

<a id="ex-aqft15-b03"></a>
#### AQFT15-B03 群因子で中心が消える理由

本講第4節の $\Gamma$、$M$ を用いる。$T\in Z(M)$ に対し $T\delta_e=\sum_g c_g\delta_g$ と書く。共役類の無限性と平方可 summability から $T$ がスカラーになることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $T$ は各 $\lambda(h)$ と可換し、また $M\subset\rho(\Gamma)'$ なので $\rho(h)$ とも可換する。$\lambda(h)T\lambda(h)^*=T$ を $\delta_e$ に作用させると、$\lambda(h)^*\delta_e=\rho(h)\delta_e$ より $\sum_g c_g\delta_{hgh^{-1}}=\sum_g c_g\delta_g$。従って $c_g$ は共役類上で一定。$g\ne e$ の共役類は無限なので、もしそこで係数が非零なら $\sum_g|c_g|^2$ が発散する。よって $T\delta_e=c_e\delta_e$。各 $\delta_g=\rho(g^{-1})\delta_e$ に対し $T\delta_g=\rho(g^{-1})T\delta_e=c_e\delta_g$、従って $T=c_eI$ である。
<!-- solution-end -->

### Level C：局所von Neumann環の型と部分系の論理

<a id="ex-aqft15-c01"></a>
#### AQFT15-C01 「局所状態には密度行列があるから部分トレースできる」の検証

ある局所netの表現で $\mathcal M(O)$ がType III因子であり、正規化ベクトル $\Omega$ が局所von Neumann環に対して分離的であると仮定する。次の主張を一つずつ証明または反駁せよ。

1. $\omega(A)=\langle\Omega,A\Omega\rangle$ は局所von Neumann環上の忠実正規状態である。
2. 周囲の $B(\mathcal H)$ には $\omega$ の密度作用素が存在する。
3. その密度作用素は局所von Neumann環に属し、局所von Neumann環には忠実正規半有限トレースが存在する。
4. $\mathcal H\simeq\mathcal H_O\otimes\mathcal H_{O^c}$ と空間的に分解して、$\mathcal M(O)=B(\mathcal H_O)\otimes I$ とできる。

- Level: C

<!-- solution-start -->
**詳細解答。** (1) ベクトル状態は正規である。[分離ベクトルとベクトル状態の忠実性](../AQFT13/index.md#prop-aqft13-local-state-faithful)を適用する。分離性の仮定により $A\Omega=0$ なら $A=0$。$A\ge0$ で $\omega(A)=0$ なら $\|A^{1/2}\Omega\|^2=0$、ゆえに $A^{1/2}=0$、$A=0$ なので忠実。

(2) $D=|\Omega\rangle\langle\Omega|$ とすれば、$\Omega$ を最初の基底に選んだとき $D=\operatorname{diag}(1,0,\ldots)$。従って $D\ge0$、$\operatorname{Tr}_{\mathcal H}D=1$、さらに任意の $A\in B(\mathcal H)$ について $\operatorname{Tr}_{\mathcal H}(DA)=\langle\Omega,A\Omega\rangle$。これは周囲の環での密度作用素である。

(3) 偽。$D$ がType III局所von Neumann環に属すると、$D$ はその環内で非零最小射影になる（$q\le D$ の像は $\mathbb C\Omega$ 以下）。非零最小射影は有限だからType IIIの定義に反する。さらに[Type III因子のトレース障害](#thm-aqft15-typeiii-no-nsf-trace)から忠実正規半有限トレースは存在しない。外部の $\operatorname{Tr}_{\mathcal H}$ の存在はこの障害を解消しない。

(4) 偽。仮定されたテンソル分解の右辺は $P_\xi\otimes I$（$\xi\in\mathcal H_O$ は単位ベクトル）という非零最小射影を持つ。ユニタリ同値は最小性を保存するので、左辺のType III因子にも最小射影が必要となり矛盾する。従って局所性だけからの鋭いType I分解や密度行列部分トレースは許されない。ただし緩衝領域のsplit性の可能性を否定してはいない。
<!-- solution-end -->
