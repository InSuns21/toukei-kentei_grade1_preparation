# CATB6-01 部分対象のHeyting演算

<!-- definition-example-audit: strict -->

## 1. 述語を部分対象として計算する

集合 $X$ の部分集合 $A$ は「入力が $A$ に属する」という述語を表す。二つの述語がともに成立する領域は共通部分、少なくとも一方が成立する領域は和集合である。否定は補集合であり、含意「$A$ ならば $B$」は $(X\setminus A)\cup B$ で表せる。

[部分対象分類子](../CATB5-06/index.md#def-catb5-06-classifier)により、集合以外の[初等トポス](../CATB5-06/index.md#def-catb5-06-elementary-topos)でも述語を部分対象として扱える。しかし、補集合に相当する部分対象が存在するとは限らない。前層では、一つの段階での真偽が別の段階への制限と両立しなければならないからである。そこで否定や含意を、補集合ではなく包含についての普遍性から作る。

以下、局所小な初等トポス $\mathcal E$ を固定する。[部分対象](../CATB4-07/index.md#def-catb4-07-subobject)の集合を $\operatorname{Sub}(X)$ とする。分類射との[自然な対応](../CATB5-06/index.md#thm-catb5-06-classifier-bijection)により、これは射の集合 $\operatorname{Hom}(X,\Omega)$ と全単射なので集合である。

部分対象 $A$ の代表となるモノ射を $a:A_0\to X$ とし、同様に $B$ の代表を $b:B_0\to X$ とする。$A\le B$ は $a$ が $b$ を経由することを意味する。合成は右から左に書く。終対象を $1$、分類子の真を $t:1\to\Omega$、対象 $Z$ からの唯一の終対象への射を $!_Z$ と書く。$t_Z=t!_Z$ は $Z$ 上で常に真を表す射である。

## 2. 連言を引き戻しで作る

二つの部分集合の共通部分は、それら両方に含まれる最大の部分集合である。順序集合でも、二元の共通の下界の中で最大のものを最大下界といい、$A\wedge B$ と書く。共通の上界の中で最小のものを最小上界といい、$A\vee B$ と書く。順序全体の最大元を $\top_X$、最小元を $\bot_X$ と書く。$1_X:X\to X$ は恒等射である。

<a id="prop-catb6-01-subobject-meet"></a>

<!-- formal-statement-start -->
> **命題（部分対象の最大元と共通部分）**
>
> 初等トポスの対象 $X$ の部分対象順序には最大元 $\top_X=[1_X]$ が存在する。二つの部分対象の最大下界は、その代表モノ射の引き戻しの $X$ への合成で表される。
<!-- formal-statement-end -->

見取り図：両方のモノ射を経由する射は、ちょうど両者の引き戻しを経由する射である。

<!-- proof-start -->
### 証明

任意の代表射 $a:A_0\to X$ は $1_Xa=a$ を満たすので $A\le[1_X]$ である。

[引き戻し](../../CAT/CAT2-03/index.md#def-cat2-03-pullback)を $P=A_0\times_X B_0$ とし、射影を $p:P\to A_0$、$q:P\to B_0$ と置く。

$$
c=ap=bq:P\to X.
$$

[モノ射の引き戻し](../../CAT/CAT2-03/index.md#prop-cat2-03-pullback-mono)により $p$ はモノ射であり、モノ射の合成もモノ射なので $c$ は部分対象を表す。二つの因子分解から $[c]\le A,B$ である。

任意の共通下界 $D=[d:D_0\to X]$ に対して、$d=au=bv$ を満たす射 $u,v$ が存在する。引き戻しの普遍性により $pw=u,\ qw=v$ となる $w:D_0\to P$ が存在する。

$$
cw=apw=au=d.
$$

従って $D\le[c]$。最大下界の一意性により、代表元や引き戻しの選び方に依存しない。
<!-- proof-end -->

例えば集合 $X=\{1,2,3\}$ の部分集合 $\{1,2\}$ と $\{2,3\}$ の引き戻しは一対 $(2,2)$ だけを持ち、$X$ への像は $\{2\}$ である。これが連言である。

## 3. 選言と偽を、上界の集まりから作る

一般の初等トポスで選言を構成するため、すべての候補となる上界を一つの対象にまとめる。[冪対象](../CATB5-08/index.md#def-catb5-08-power-object) $P(X)=\Omega^X$ は、試験対象 $T$ 上で変化する部分対象を表す。評価射を $e_X:P(X)\times X\to\Omega$ とする。

集合で $A\cup B$ を「$A$ と $B$ の両方を含む部分集合すべての共通部分」として作る操作を、この評価射と有限極限で実行する。

<a id="thm-catb6-01-subobject-join"></a>

<!-- formal-statement-start -->
> **定理（部分対象の最小元と有限和）**
>
> 初等トポスの任意の対象 $X$ に対し、$\operatorname{Sub}(X)$ には最小元 $\bot_X$ および任意の二元の最小上界 $A\vee B$ が存在する。
<!-- formal-statement-end -->

見取り図：候補上界を冪対象の部分対象 $K$ として切り出す。$K$ の全候補で真となる領域を別の等化子で作れば、それが最小上界になる。候補を絞らない場合は最小元になる。

<!-- proof-start -->
### 証明

ここで転置とは、[指数対象の普遍性](../../CAT/CAT4-05/index.md#def-cat4-05-exponential)によるカリー化である。射 $w:T\times Z\to\Omega$ の転置を $\widehat w:T\to\Omega^Z$ と書く。評価射 $e_Z:\Omega^Z\times Z\to\Omega$ に対し、転置は次の等式を満たす一意な射である。

$$
e_Z(\widehat w\times1_Z)=w.
$$

積の射に現れる $1_Z$ は $Z$ の恒等射を表す。

まず $a:A_0\to X$ に沿う制限射 $r_a:P(X)\to\Omega^{A_0}$ を、次の合成の転置として定める。

$$
P(X)\times A_0\xrightarrow{1\times a}P(X)\times X
\xrightarrow{e_X}\Omega.
$$

$1\times A_0\cong A_0$ を通して $t_{A_0}$ を転置した射を $\tau_a:1\to\Omega^{A_0}$ とする。$r_b,\tau_b$ も $b:B_0\to X$ に対し同じ構成で定める。

[等化子](../../CAT/CAT2-03/index.md#def-cat2-03-equalizer)を用いて、次の二組の平行射をそれぞれ等化する。

$$
\begin{array}{ll}
k_a:K_a\to P(X), & r_a,\ \tau_a!_{P(X)},\\
k_b:K_b\to P(X), & r_b,\ \tau_b!_{P(X)}.
\end{array}
$$

[等化子のモノ射性](../../CAT/CAT2-03/index.md#prop-cat2-03-equalizer-unique-mono)により、$k_a,k_b$ は部分対象を表す。

$k:K\to P(X)$ を二つの等化子の共通部分として[前節の命題](#prop-catb6-01-subobject-meet)で作る。これは両方の部分対象を含む候補を表す。

$$
v=e_X(k\times1_X):K\times X\to\Omega.
$$

$k$ は $k_a$ を経由するので $r_a k=\tau_a!_K$ である。これを $K\times A_0$ 上で評価すると

$$
\begin{aligned}
v(1_K\times a)&=e_{A_0}((r_a k)\times1_{A_0})\\
&=e_{A_0}((\tau_a!_K)\times1_{A_0})\\
&=t_{K\times A_0}.
\end{aligned}
$$

$b$ についても $r_b k=\tau_b!_K$ を評価する。したがって

$$
v(1_K\times a)=t_{K\times A_0},
\qquad v(1_K\times b)=t_{K\times B_0}.
$$

次に因子を交換して $v$ を $X\times K\to\Omega$ とみなし、その転置を $h:X\to\Omega^K$ とする。$t_K$ の転置を $\tau:1\to\Omega^K$ と書く。

$h$ と $\tau!_X$ の等化子を $j:J\to X$ とする。これは[等化子のモノ射性](../../CAT/CAT2-03/index.md#prop-cat2-03-equalizer-unique-mono)により部分対象を表す。任意の $u:T\to X$ について

$$
u\text{ が }j\text{ を経由する}
\iff v(1_K\times u)=t_{K\times T}.
$$

これは等化子の普遍性で $hu=\tau!_T$ と書き、両辺を評価して得られる条件である。特に上の二つの等式を代入すると $a,b$ はともに $j$ を経由する。従って $A,B\le[J\to X]$ である。

逆に $m:M\to X$ が任意の共通上界を表すとする。その分類射 $\chi_m:X\to\Omega$ の転置を $s:1\to P(X)$ とする。

$$
\chi_m a=t_{A_0},\qquad \chi_m b=t_{B_0}.
$$

よって $s$ は $k_a,k_b$ を経由し、引き戻しの普遍性から $s=k\bar s$ となる $\bar s:1\to K$ が得られる。

$j$ の等化子条件を評価した式 $v(1_K\times j)=t_{K\times J}$ に、$1\times J\cong J$ と $\bar s\times1_J$ を前合成する。$k\bar s=s$ なので左辺は

$$
e_X((k\bar s)\times j)=e_X(s\times j)=\chi_m j
$$

となり、右辺は $t_J$ となる。従って

$$
\chi_m j=t_J
$$

となる。[部分対象分類子](../CATB5-06/index.md#def-catb5-06-classifier)の引き戻しの普遍性により $j$ は $m$ を経由する。従って $[j]\le[m]$ であり、$[j]$ が最小上界である。

最小元は同じ構成で $K=P(X), k=1_{P(X)}$ として得る。$A,B$ による制限条件を課さないので、任意の部分対象 $m$ の分類射の転置 $s$ がそのまま $K$ への射になる。$j$ の等化子条件を評価した式に $s\times1_J$ を前合成すれば $\chi_m j=t_J$ となり、$[j]\le[m]$ が従う。任意の $m$ に対して成立するので、これが $\bot_X$ である。
<!-- proof-end -->

集合 $X=\{1,2,3\}$ で $A=\{1\}, B=\{2\}$ なら候補上界は $\{1,2\}$ と $X$ だけであり、共通部分は $\{1,2\}$ である。制限なしの候補には空集合も含まれるので、最小元は空集合である。

最大元・最小元があり、二元ごとの最大下界と最小上界がある順序を有界束という。ここまでで部分対象順序は有界束になった。元 $A$ の補元とは、$A\wedge B=\bot_X$ かつ $A\vee B=\top_X$ を満たす元 $B$ のことである。一般には補元が存在するとは限らないので、補元を用いて含意を作ることはできない。

## 4. 含意は「連言すると結論に入る」最大の領域

含意 $A\Rightarrow B$ に欲しい性質は、仮定 $A$ を追加したとき結論 $B$ が成立することである。すなわち、領域 $C$ が含意を満たすことと、$C$ と $A$ の共通部分が $B$ に入ることを同値にしたい。

<a id="thm-catb6-01-subobject-implication"></a>

<!-- formal-statement-start -->
> **定理（部分対象の含意）**
>
> 初等トポスの任意の対象 $X$ とその部分対象 $A,B$ に対し、次の条件を満たす部分対象 $A\Rightarrow B$ が一意に存在する。任意の部分対象 $C$ について
>
$$
C\le A\Rightarrow B\quad\Longleftrightarrow\quad
C\wedge A\le B.
$$
<!-- formal-statement-end -->

見取り図：$A$ の代表射を基底への射とし、$B$ を $A$ へ引き戻す。基底上の各ファイバーがその引き戻しに収まる領域を構成する。

<!-- proof-start -->
### 証明

$a:A_0\to X$ に沿った $B$ の[逆像](../CATB4-07/index.md#thm-catb4-07-inverse-image)を代表するモノ射を $s:S\to A_0$ とする。つまり $S=A_0\times_X B_0$ である。

[ファイバー包含条件の表現](../CATB5-08/index.md#lem-catb5-08-fiber-condition)を $g=a,\ m=s$ に適用する。初等トポスなので補題の仮定を満たし、モノ射 $n:N\to X$ が存在する。任意の射 $u:T\to X$ について

$$
u\text{ が }n\text{ を経由する}
\iff (T\times_X A_0\to A_0)
\text{ が }s\text{ を経由する}.
$$

$u=c:C_0\to X$ を部分対象 $C$ の代表とする。右辺の射影を $p:C_0\times_X A_0\to A_0$ と置く。$s$ が $B$ の引き戻しであることから、$p$ が $s$ を経由することは $ap$ が $b$ を経由することと同値である。実際、後者なら $ap=bq$ となる $q$ が存在し、引き戻しの普遍性から $sw=p$ が得られる。逆に $sw=p$ なら $asw$ は $b$ を経由する。

[部分対象の最大元と共通部分](#prop-catb6-01-subobject-meet)より $ap$ は $C\wedge A$ の代表射である。従って

$$
C\le[n]\iff C\wedge A\le B.
$$

これで存在を示した。別の $N'$ が同じ性質を満たすなら $C=[n]$ と $C=N'$ をそれぞれ代入すると双方が互いに以下となる。反対称性により等しい。
<!-- proof-end -->

集合では $A\Rightarrow B=(X\setminus A)\cup B$ である。実際、任意の部分集合 $C\subseteq X$ について、$C\subseteq (X\setminus A)\cup B$ と仮定する。$x\in C\cap A$ なら $x\notin X\setminus A$ なので $x\in B$ である。逆に $C\cap A\subseteq B$ と仮定し、$x\in C$ を取る。$x\notin A$ なら $x\in X\setminus A$、$x\in A$ なら $x\in C\cap A\subseteq B$ である。従って

$$
C\subseteq(X\setminus A)\cup B
\iff C\cap A\subseteq B.
$$

この両方向が含意の普遍性に対応している。

## 5. Heyting代数と否定

連言、選言、偽、真に加え、含意が順序の普遍性で定まる構造をまとめて扱う。ここで有界束とは第3節の四つの演算を持つ順序集合である。有界分配束は、さらに任意の三元について次の二つの分配律を満たす。

$$
a\wedge(b\vee c)=(a\wedge b)\vee(a\wedge c),
$$

$$
a\vee(b\wedge c)=(a\vee b)\wedge(a\vee c).
$$

<a id="def-catb6-01-heyting-algebra"></a>

<!-- formal-statement-start -->
> **定義（Heyting代数）**
>
> 有界分配束 $H$ で、各二元 $a,b$ に対し、任意の $c\in H$ について次を満たす元 $a\Rightarrow b$ が存在するものを Heyting代数という。
>
$$
c\le a\Rightarrow b\iff c\wedge a\le b.
$$
>
> 最小元を $\bot$、最大元を $\top$ とし、否定を $\neg a=a\Rightarrow\bot$ で定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-01-heyting-algebra -->
**定義の確認**。任意の集合 $X$ の冪集合を包含で順序づけると、共通部分・和集合が最大下界・最小上界であり、空集合・全体集合が最小元・最大元である。分配律は、各 $x\in X$ に対して $x$ が $A$ に属し、かつ $B,C$ の少なくとも一方に属することが、$A\cap B,A\cap C$ の少なくとも一方に属することと同値であるため成立する。双対も、$x\in A$ のとき両辺が真となり、$x\notin A$ のとき両辺が $x\in B\cap C$ と同値になる。

第4節の[含意の普遍性](#thm-catb6-01-subobject-implication)の集合の場合の計算により、$(X\setminus A)\cup B$ は要求された元である。特に $B=\varnothing$ を代入すると否定は $X\setminus A$ となる。このように全条件が実際に成立する。
<!-- definition-example-end -->

<a id="thm-catb6-01-subobject-heyting"></a>

<!-- formal-statement-start -->
> **定理（初等トポスの部分対象のHeyting代数性）**
>
> 初等トポスの任意の対象 $X$ の部分対象順序は Heyting代数である。否定 $\neg A$ は $A$ との最大下界が $\bot_X$ となる最大の部分対象である。
<!-- formal-statement-end -->

見取り図：有界束と含意はすでに構成した。分配律を含意の普遍性から導き、否定に最小元を代入する。

<!-- proof-start -->
### 証明

[最大元と共通部分](#prop-catb6-01-subobject-meet)および[最小元と有限和](#thm-catb6-01-subobject-join)から有界束であり、[部分対象の含意](#thm-catb6-01-subobject-implication)から任意の $A,B$ に対して含意が存在する。

分配律を示す。任意の部分対象 $D$ に対し、最小上界と含意の普遍性を順番に使う。

$$
\begin{aligned}
(A\wedge B)\vee(A\wedge C)\le D
&\iff A\wedge B\le D,\ A\wedge C\le D\\
&\iff B\le A\Rightarrow D,\ C\le A\Rightarrow D\\
&\iff B\vee C\le A\Rightarrow D\\
&\iff A\wedge(B\vee C)\le D.
\end{aligned}
$$

両辺それぞれを $D$ に選べば相互の不等式が得られ、反対称性により分配律が成立する。双対についても、今示した分配律を二回適用して

$$
\begin{aligned}
(A\vee B)\wedge(A\vee C)
&=((A\vee B)\wedge A)\vee((A\vee B)\wedge C)\\
&=A\vee((A\wedge C)\vee(B\wedge C))\\
&=A\vee(B\wedge C)
\end{aligned}
$$

となる。第二の等号では最大下界・最小上界の定義から $(A\vee B)\wedge A=A$ とし、もう一方の項に分配律を用いた。最後は $A\wedge C\le A$ と結合律を用いた。従って有界分配束であり、定義の全条件を満たす。

否定については含意の普遍性に $B=\bot_X$ を代入する。

$$
C\le\neg A\iff C\wedge A\le\bot_X
\iff C\wedge A=\bot_X.
$$

特に $C=\neg A$ が条件を満たし、条件を満たす全ての $C$ は $\neg A$ 以下である。
<!-- proof-end -->

$A\wedge\neg A=\bot_X$ は成立するが、$A\vee\neg A=\top_X$ という排中律が成立するとは限らない。また $A\le\neg\neg A$ は、$A\wedge\neg A=\bot_X$ を上の普遍性で読み直せば得られる。逆の不等式は一般には成立しない。

## 6. 観察対象を変えても論理演算が一致する

述語を別の対象上へ移す操作は引き戻しである。射 $f:Y\to X$ に沿う[部分対象の逆像](../CATB4-07/index.md#thm-catb4-07-inverse-image)を $f^*:\operatorname{Sub}(X)\to\operatorname{Sub}(Y)$ と書く。論理演算を先に行ってから逆像を取るのか、逆像を取ってから演算するのかで結果が変わるなら、述語の置換として扱うことは難しい。

<a id="thm-catb6-01-heyting-reindexing"></a>

<!-- formal-statement-start -->
> **定理（部分対象のHeyting演算の逆像保存）**
>
> 初等トポスの射 $f:Y\to X$ に沿う部分対象の逆像は、最大元、最小元、二元の最大下界・最小上界、含意および否定を保つ。
<!-- formal-statement-end -->

見取り図：連言は引き戻しの普遍性で保存される。選言と偽はファイバー包含条件で上界を比較する。含意は任意の試験射に対するファイバーの包含条件が基底変更で同じになることから従う。

<!-- proof-start -->
### 証明

[部分対象の逆像](../CATB4-07/index.md#thm-catb4-07-inverse-image)は順序を保つ。恒等射の引き戻しは恒等射で表せるので最大元を保つ。

最大下界について、任意の $u:T\to Y$ が $f^*(A\wedge B)$ を経由することは、$fu$ が $A,B$ の両代表を経由することと同値である。これは $u$ が $f^*A,f^*B$ の両代表を経由することと同値である。[部分対象の最大元と共通部分](#prop-catb6-01-subobject-meet)を再度使うと

$$
f^*(A\wedge B)=f^*A\wedge f^*B
$$

を得る。

次に任意の $D\in\operatorname{Sub}(Y)$ を固定する。[ファイバー包含条件の表現](../CATB5-08/index.md#lem-catb5-08-fiber-condition)を $g=f$ と $D$ の代表モノ射に適用し、部分対象 $N\in\operatorname{Sub}(X)$ を得る。任意の $C\in\operatorname{Sub}(X)$ の代表を試験射に選ぶと、ファイバー積から $Y$ への射影が $f^*C$ を表すため

$$
f^*C\le D\iff C\le N
$$

が成立する。ここではこの比較条件だけを使う。

$$
\begin{aligned}
f^*(A\vee B)\le D
&\iff A\vee B\le N\\
&\iff A\le N,\ B\le N\\
&\iff f^*A\le D,\ f^*B\le D\\
&\iff f^*A\vee f^*B\le D.
\end{aligned}
$$

任意の $D$ で成立するので、$D=f^*(A\vee B)$ と $D=f^*A\vee f^*B$ をそれぞれ選べば相互の不等式が得られ、選言が保存される。また $\bot_X\le N$ は任意の $N$ について成立するので $f^*\bot_X\le D$ は任意の $D$ について成立する。従って $f^*\bot_X=\bot_Y$ である。

含意については[部分対象の含意](#thm-catb6-01-subobject-implication)の構成で用いたモノ射

$$
s:S=A_0\times_X B_0\to A_0
$$

を再利用する。任意の試験射 $u:T\to Y$ を取る。引き戻しの普遍性により、$u$ が含意の逆像を経由することは、合成 $fu$ が元の含意を経由することと同値である。

さらに[含意の構成](#thm-catb6-01-subobject-implication)により、これは $T\times_X A_0$ から $A_0$ への射影が $s$ を経由する条件と同値になる。

一方、$f^*A$ の代表の始域は $Y\times_X A_0$ である。その $u$ による引き戻しについて

$$
T\times_Y(Y\times_X A_0)\cong T\times_X A_0
$$

が成立する。実際、任意の試験対象から $T$ と $A_0$ への二射が $X$ 上で一致すれば、前者と $u$ の合成を $Y$ への成分として、引き戻しの普遍性から左辺への射が一意に定まる。逆方向は $T$ と $A_0$ への射影を取ればよい。二つの構成が射影を変えないため互いに逆である。

この同型の右辺を $L=T\times_X A_0$ と置き、射影を $p_T:L\to T$、$p_A:L\to A_0$ とする。$fu p_T=a p_A$ が成り立つ。$f^*B$ の代表 $Y\times_X B_0\to Y$ へ $u p_T$ が因子分解する条件は、引き戻しの普遍性により、ある $q:L\to B_0$ が存在して

$$
bq=fu p_T=a p_A
$$

となることである。一方、$s:S\to A_0$ は $b$ の $a$ に沿う引き戻しだから、この等式は $p_A=sw$ となる射 $w:L\to S$ が存在することと同値である。これは $f^*A,f^*B$ に対する[含意の構成](#thm-catb6-01-subobject-implication)のファイバー包含条件そのものである。

よって $u$ が $f^*(A\Rightarrow B)$ を経由することと、$u$ が $f^*A\Rightarrow f^*B$ を経由することは同値である。各部分対象の包含射自身を試験射にすれば互いに以下となり、

$$
f^*(A\Rightarrow B)=f^*A\Rightarrow f^*B.
$$

否定は含意と最小元の組合せなので、両者の保存から $f^*(\neg A)=\neg(f^*A)$ も従う。
<!-- proof-end -->

この性質により、後で自由変数に関する置換を引き戻しで表すとき、有限論理演算と置換を交換できる。

## 7. 真偽が二値でない具体例

小圏 $\mathcal C$ を二対象 $d,c$ と非恒等射 $u:d\to c$ だけを持つ圏とする。[前層圏の初等トポス性](../CATB5-06/index.md#thm-catb5-06-presheaf-topos)により、集合値前層の圏は初等トポスである。ここで終対象 $1$ は両対象に一元集合を割り当て、制限を唯一の写像とする前層である。任意の前層から各一元集合への写像は一意で、制限との可換性も終域の一元性から従う。

[前層のモノ射の成分判定](../CATB5-06/index.md#prop-catb5-06-pointwise-mono)により、$1$ の部分対象は各段階で一元集合または空集合を選ぶ部分前層とみなせる。$c$ で一元集合を選べば、$d$ に制限したときも一元集合を選ばなければならない。非空集合から空集合への写像は存在しないからである。

従って部分対象は次の三つだけである。

| 部分対象 | $d$ での値 | $c$ での値 |
| --- | --- | --- |
| $0$ | $\varnothing$ | $\varnothing$ |
| $p$ | $\{*\}$ | $\varnothing$ |
| $1$ | $\{*\}$ | $\{*\}$ |

順序は $0<p<1$ である。ここで記号 $1$ は終対象の恒等射が表す最大の部分対象、$0$ は最小の部分対象を表す。連言は二元の小さい方、選言は大きい方である。

[部分対象の含意](#thm-catb6-01-subobject-implication)の普遍性を使う。$a\le b$ なら最大元が条件を満たすため、

$$
a\Rightarrow b=1.
$$

一方、$a>b$ なら、任意の候補 $z$ に対して

$$
z\wedge a\le b\iff z\le b.
$$

左から右へは、もし $z>b$ なら $z,a$ がともに $b$ より大きく、その小さい方も $b$ より大きいことを使う。右から左へは $z\wedge a\le z$ を使う。従って、この条件を満たす最大の候補は $b$ であり、

$$
a\Rightarrow b=b.
$$

含意の表を行を仮定、列を結論として書く。

| $\Rightarrow$ | $0$ | $p$ | $1$ |
| --- | --- | --- | --- |
| $0$ | $1$ | $1$ | $1$ |
| $p$ | $0$ | $1$ | $1$ |
| $1$ | $0$ | $p$ | $1$ |

特に $\neg p=p\Rightarrow0=0$ である。

$$
p\vee\neg p=p\vee0=p<1.
$$

排中律は失敗する。また $\neg\neg p=\neg0=1>p$ だから二重否定の除去も失敗する。集合で補集合を作る手順がここで働かない理由は、$p$ を段階ごとに補集合にすると $c$ で一元集合、$d$ で空集合となり、必要な制限写像が存在しないためである。前層の構造を尊重する最大の否定領域は空の前層に限られる。

## 8. 演習

### CATB6-01-A01 集合上の論理演算

- Level: A

$X=\{1,2,3,4\}$、$A=\{1,2\}$、$B=\{2,3\}$ とする。共通部分、有限和、含意、否定 $\neg A$ を計算せよ。

<!-- solution-start -->
**詳細解答**

共通部分には両方に属する $2$ だけが入り、有限和には $1,2,3$ が入る。

$$
A\wedge B=\{2\},\qquad A\vee B=\{1,2,3\}.
$$

集合の場合の[含意の普遍性](#thm-catb6-01-subobject-implication)から、$A$ の外にいる点 $3,4$ と $B$ にいる点 $2,3$ を合わせる。

$$
A\Rightarrow B=\{2,3,4\}.
$$

結論を空集合に置き換えると $\neg A=\{3,4\}$ となる。
<!-- solution-end -->

### CATB6-01-A02 含意を最大下界から判定する

- Level: A

三元鎖 $0<p<1$ で、$1\Rightarrow p$ と $p\Rightarrow0$ を、候補 $0,p,1$ を一つずつ検査して求めよ。

<!-- solution-start -->
**詳細解答**

[Heyting代数の定義](#def-catb6-01-heyting-algebra)の含意条件では $c\wedge a\le b$ を満たす最大の $c$ を選ぶ。$a=1,b=p$ のとき $c\wedge1=c$ だから $0,p$ が条件を満たし、$1$ は満たさない。最大は $p$ である。

$a=p,b=0$ の場合、$0\wedge p=0$、$p\wedge p=p$、$1\wedge p=p$。従って $0$ だけが条件を満たす。

$$
1\Rightarrow p=p,\qquad p\Rightarrow0=0.
$$
<!-- solution-end -->

### CATB6-01-A03 上界を集めて有限和を作る

- Level: A

$X=\{a,b,c,d\}$、$A=\{a,b\}$、$B=\{b,c\}$ とする。第3節の候補 $K$ を全て列挙し、評価条件で得る部分集合を求めよ。

<!-- solution-start -->
**詳細解答**

[部分対象の最小元と有限和](#thm-catb6-01-subobject-join)の構成では $A,B$ の全ての元で評価が真となる部分集合を選ぶ。従って $a,b,c$ が必須で、$d$ だけが任意である。

$$
K=\{\{a,b,c\},\{a,b,c,d\}\}.
$$

全候補で真となる点は $a,b,c$ である。$d$ は第一の候補で偽なので含まれない。従って有限和は $\{a,b,c\}$ である。
<!-- solution-end -->

### CATB6-01-A04 含意が真となる条件

- Level: A

任意の Heyting代数で、$a\Rightarrow b=\top$ と $a\le b$ が同値であることを示せ。

<!-- solution-start -->
**詳細解答**

[Heyting代数](#def-catb6-01-heyting-algebra)の含意条件で $c=\top$ と置く。

$$
\top\le a\Rightarrow b\iff\top\wedge a\le b
\iff a\le b.
$$

任意の元は最大元以下なので、左辺の不等式は $a\Rightarrow b=\top$ と同値である。
<!-- solution-end -->

### CATB6-01-B01 連言と含意を二段で扱う

- Level: B

任意の Heyting代数で次を示せ。

$$
(a\wedge b)\Rightarrow d=a\Rightarrow(b\Rightarrow d).
$$

<!-- solution-start -->
**詳細解答**

任意の元 $c$ を取り、[Heyting代数](#def-catb6-01-heyting-algebra)の含意条件を二段で適用する。

$$
\begin{aligned}
c\le (a\wedge b)\Rightarrow d
&\iff c\wedge(a\wedge b)\le d\\
&\iff (c\wedge a)\wedge b\le d\\
&\iff c\wedge a\le b\Rightarrow d\\
&\iff c\le a\Rightarrow(b\Rightarrow d).
\end{aligned}
$$

第二の同値には最大下界の結合律を用いた。両辺の候補をそれぞれ $c$ に取ると双方の不等式が成立するため、反対称性から等しい。
<!-- solution-end -->

### CATB6-01-B02 否定は補元とどう違うか

- Level: B

任意の Heyting代数で $a\wedge\neg a=\bot$ と $a\le\neg\neg a$ を示せ。また補元 $b$ が存在し、$a\wedge b=\bot,\ a\vee b=\top$ を満たすなら $b=\neg a$ を示せ。

<!-- solution-start -->
**詳細解答**

[Heyting代数](#def-catb6-01-heyting-algebra)の含意条件に $c=\neg a$ と結論 $\bot$ を代入すれば $\neg a\wedge a\le\bot$ が得られる。$\bot$ は最小元なので等号である。

次に $a\wedge\neg a=\bot$ を仮定 $\neg a$、結論 $\bot$ の含意条件で読み直すと

$$
a\le(\neg a\Rightarrow\bot)=\neg\neg a.
$$

補元 $b$ が存在する場合、$b\wedge a=\bot$ によって $b\le\neg a$ である。他方、分配律を使うと

$$
\begin{aligned}
\neg a&=\neg a\wedge\top\\
&=\neg a\wedge(a\vee b)\\
&=(\neg a\wedge a)\vee(\neg a\wedge b)\\
&=\bot\vee(\neg a\wedge b)\le b.
\end{aligned}
$$

双方の不等式から $b=\neg a$ が従う。従って補元が存在する場合は否定に一致するが、否定の存在だけでは補元の存在を保証しない。
<!-- solution-end -->

### CATB6-01-B03 逆像と含意を計算で確認する

- Level: B

$f:\{x,y,z\}\to\{1,2,3\}$ を $f(x)=f(y)=1,\ f(z)=3$ とする。$A=\{1,2\}$、$B=\{2\}$ に対して、含意とその逆像を計算し、逆像を先に取る計算と比較せよ。否定でも確認せよ。

<!-- solution-start -->
**詳細解答**

第4節の[集合における含意の計算](#thm-catb6-01-subobject-implication)を使う。終域で $A$ の外は $\{3\}$ なので

$$
A\Rightarrow B=\{2,3\},\qquad \neg A=\{3\}.
$$

どちらの逆像も $\{z\}$ となる。値 $2$ を取る入力が存在しないことに注意する。

逆像を先に取ると $f^*A=\{x,y\}$、$f^*B=\varnothing$ である。始域で $\{x,y\}$ の補集合は $\{z\}$ なので

$$
f^*A\Rightarrow f^*B=\{z\},\qquad
\neg(f^*A)=\{z\}.
$$

よって[部分対象のHeyting演算の逆像保存](#thm-catb6-01-heyting-reindexing)の二つの等式を確認した。
<!-- solution-end -->

### CATB6-01-C01 分岐する観察段階の論理

- Level: C

三対象 $d,e,c$ と非恒等射 $d\to c,e\to c$ を持ち、これ以外に非恒等射を持たない小圏を考える。その集合値前層圏の終対象の部分対象を調べよ。

1. 終対象の全ての部分対象を列挙し、包含順序を求めよ。
2. $P$ を $d$ でのみ一元集合を持つ部分対象、$Q$ を $e$ でのみ一元集合を持つ部分対象として、$P\wedge Q,P\vee Q$ を計算せよ。
3. $R=P\vee Q$ とし、$\neg P,\neg R,\neg\neg R,R\Rightarrow P$ を計算せよ。排中律と二重否定の除去が $R$ で成り立つか判定せよ。

<!-- solution-start -->
**詳細解答**

(1) [前層のモノ射の成分判定](../CATB5-06/index.md#prop-catb5-06-pointwise-mono)により、各段階で空集合または一元集合を選べばよい。ただし $c$ で一元集合を選んだ場合は、両方の制限先 $d,e$ でも一元集合を選ぶ必要がある。

一元集合を持つ段階の集合で表すと、候補は

$$
0=\varnothing,\quad P=\{d\},\quad Q=\{e\},
\quad R=\{d,e\},\quad 1=\{d,e,c\}.
$$

これらでは非空から空への制限が要求されないため、全て前層になる。包含の因子射は各成分の包含で与えられ、制限との自然性は終域の部分集合が高々一元であることから従う。よって順序は集合の包含であり、$0<P<R<1,\ 0<Q<R<1$ で $P,Q$ は比較不能である。

(2) $P,Q$ の共通下界は $0$ のみ、共通上界は $R,1$ である。従って

$$
P\wedge Q=0,\qquad P\vee Q=R.
$$

(3) [部分対象の含意](#thm-catb6-01-subobject-implication)により、$\neg P$ は $P$ との最大下界が $0$ となる最大の候補である。$0,Q$ が条件を満たし、$P,R,1$ は満たさないので $\neg P=Q$。

$R$ との最大下界は、候補 $0,P,Q,R,1$ に対しそれぞれ $0,P,Q,R,R$ である。従って $\neg R=0$。さらに $0$ との最大下界は常に $0$ なので $\neg0=1$。よって $\neg\neg R=1$ である。

$R\Rightarrow P$ は $C\wedge R\le P$ を満たす最大の $C$ である。上の五候補の最大下界を使うと $0,P$ が条件を満たし、$Q,R,1$ は満たさない。従って $R\Rightarrow P=P$ である。

$$
R\vee\neg R=R<1,\qquad \neg\neg R=1>R.
$$

排中律と二重否定の除去はどちらも $R$ で失敗する。$R$ の点ごとの補集合は $c$ だけで非空になるが、二つの制限写像を持てない。これが集合の補集合をそのまま使えない理由である。
<!-- solution-end -->

## 9. まとめ

- 部分対象の共通部分は引き戻しで作れ、有限和と偽は冪対象と等化子で構成できる。
- 含意は、仮定との共通部分が結論以下になる最大の部分対象である。
- 初等トポスの部分対象順序は Heyting代数になり、逆像はその演算を保つ。
- 前層の具体例では排中律と二重否定の除去が失敗する。否定は点ごとの補集合と区別する。

次は基底の射に沿った部分対象の移動を用いて、変数についての存在・全称という操作を調べる。
