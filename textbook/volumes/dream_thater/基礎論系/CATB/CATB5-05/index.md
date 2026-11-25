# CATB5-05 層化の随伴と左完全性

<!-- definition-example-audit: strict -->

## 1. 局所データから作った層は何を特徴付けるか

前講の[二重plusによる層の構成](../CATB5-04/index.md#thm-catb5-04-double-plus)で、どの前層からも層を作れた。しかし単に層を一つ作るだけなら、元の情報を全て捨てて一元集合の層にすることもできる。求めたいのは、層への写像に必要な情報を全て残す構成である。

例えば離散二点空間で、空でない開集合上の定数値だけを許す前層を考える。空集合には唯一の空写像を置き、二点の値が異なる切断も許すと層になる。元の定数値の写像をある層へ送る方法が決まれば、新しく作った切断の像は二つの局所像の貼り合わせで決まる。この一意性が層化の普遍性である。

以下、$(\mathcal C,J)$ は[小site](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)、$F,G$ は[集合値前層](../../CAT/CAT1-12/index.md#def-cat1-12-presheaf)とする。

$\operatorname{PSh}(\mathcal C)$ は前層圏、$\operatorname{Sh}(\mathcal C,J)$ は[site上の層](../CATB5-03/index.md#def-catb5-03-site-sheaf)を対象とし、層の間の全ての自然変換を射とする圏である。包含関手を $i:\operatorname{Sh}(\mathcal C,J)\to\operatorname{PSh}(\mathcal C)$ と書く。層を前層として扱うときは $iH$ を単に $H$ と略すことがある。射についても同様で、層の間の自然変換は前層の間の自然変換と同じである。

合成 $fg$ は $f\circ g$ を表し、$M_U$ は最大篩である。

射 $f:V\to U$ に対して $\operatorname{dom}f=V$ は始域を表す。前層の制限は逆向きの写像

$$
F(f):F(U)\to F(V)
$$

である。[自然変換](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation) $\alpha:F\Rightarrow G$ の成分は $\alpha_V:F(V)\to G(V)$ であり、制限と交換する。

## 2. 前層の写像をplusに延長する

前講の[plus構成](../CATB5-04/index.md#def-catb5-04-plus)では $F^+(U)$ の元は被覆篩 $S$ と[整合族](../CATB5-03/index.md#def-catb5-03-sieve-matching) $s$ の[局所同値](../CATB5-04/index.md#def-catb5-04-local-equivalence)類 $[S,s]$ であった。$s_f\in F(V)$ は射 $f:V\to U$ に対応する成分である。

[標準写像](../CATB5-04/index.md#prop-catb5-04-plus-presheaf)を $\eta_F:F\Rightarrow F^+$ と書き、その $U$ での成分を $\eta_{F,U}$ とする。自然変換 $\alpha:F\Rightarrow G$ が与えられると、各局所切断に $\alpha$ を作用させれば、新しい整合族が得られる。

<a id="prop-catb5-05-plus-functor"></a>

<!-- formal-statement-start -->
> **命題（plus構成の関手性）**
>
> 小site上の集合値前層の圏で、対象を $F^+$ に、自然変換 $\alpha:F\Rightarrow G$ を次の自然変換に送る操作は関手となる。

$$
\alpha_U^+[S,s]=[S,(\alpha_{\operatorname{dom}f}(s_f))_{f\in S}].
$$

> 標準写像はこの関手に関して自然である。すなわち

$$
\alpha^+\eta_F=\eta_G\alpha.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f:V\to U$ が $S$ に属し、$g:W\to V$ とする。[自然変換](../../CAT/CAT1-07/index.md#def-cat1-07-natural-transformation)の自然性と整合条件より

$$
G(g)\alpha_V(s_f)=\alpha_W(F(g)(s_f))
=\alpha_W(s_{fg}).
$$

従って像の族は整合する。二つの代表元が被覆篩 $R$ 上で一致するなら、各成分に同じ写像を作用させた後も $R$ 上で一致する。[局所同値](../CATB5-04/index.md#def-catb5-04-local-equivalence)により商上の写像が定まる。

$u:V\to U$ に沿う制限の前後で比較すると、両経路の篩は $u^*S$ であり、$g:W\to V$ の成分はともに $\alpha_W(s_{ug})$ である。従って $\alpha^+$ は自然変換である。恒等変換は全成分を変えず、$\beta:G\Rightarrow H$ との合成については各成分が $\beta_V(\alpha_V(s_f))$ になる。従って $(\beta\alpha)^+=\beta^+\alpha^+$ である。

最後に[標準写像の式](../CATB5-04/index.md#prop-catb5-04-plus-presheaf)を用いる。最大篩上の $f:V\to U$ 成分は

$$
\alpha_V(F(f)(x))=G(f)(\alpha_U(x)).
$$

これは $\alpha_U^+\eta_{F,U}(x)$ と $\eta_{G,U}\alpha_U(x)$ の代表元が一致することを示す。
<!-- proof-end -->

## 3. 層への写像は一意に延長できる

像の値が層 $H$ に入る場合、整合族の像は必ず一意に貼り合わさる。このためplusの像を作る際に $H^+$ へ移る必要はない。

<a id="thm-catb5-05-plus-extension"></a>

<!-- formal-statement-start -->
> **定理（plusから層への一意延長）**
>
> 小site上の集合値前層 $F$、層 $H$、自然変換 $\phi:F\Rightarrow iH$ に対し、次式を満たす自然変換 $\bar\phi:F^+\Rightarrow iH$ が唯一存在する。

$$
\bar\phi\eta_F=\phi.
$$
<!-- formal-statement-end -->

証明の核心は、代表元の各局所成分を $H$ に送り貼り合わせること、そして代表元を変えても貼り合わせが変わらないことにある。

<!-- proof-start -->
### 証明

$a=[S,s]\in F^+(U)$ を取る。各 $f:V\to U$ が $S$ に属するとき、$t_f=\phi_V(s_f)$ と置く。$g:W\to V$ に対して自然性から

$$
H(g)t_f=\phi_W(F(g)s_f)=\phi_W(s_{fg})=t_{fg}.
$$

[層条件](../CATB5-03/index.md#def-catb5-03-site-sheaf)により唯一の $h\in H(U)$ が存在して、全ての $f\in S$ で $H(f)h=t_f$ となる。これを $\bar\phi_U(a)$ とする。

別の代表元 $[T,v]$ を選ぶと、ある共通の被覆篩 $R$ 上で $s_f=v_f$ である。二つの貼り合わせ $h,h'$ について $H(f)h=H(f)h'$ が全ての $f\in R$ で成立する。層条件の一意性より $h=h'$ となり、写像は代表元に依存しない。

$u:V\to U$ に沿う自然性を確認する。任意の $g:W\to V$ が $u^*S$ に属するなら

$$
H(g)H(u)h=H(ug)h=\phi_W(s_{ug}).
$$

右辺は $F^+(u)a$ の代表元を $\phi$ で送った成分である。引き戻した篩は被覆なので貼り合わせの一意性から

$$
H(u)\bar\phi_U(a)=\bar\phi_V(F^+(u)a).
$$

標準写像 $\eta_{F,U}(x)$ の像は最大篩上で $\phi_V(F(f)x)=H(f)\phi_U(x)$ を成分に持つ。従って貼り合わせは $\phi_U(x)$ であり、$\bar\phi\eta_F=\phi$ を得る。

最後に別の自然変換 $\psi:F^+\Rightarrow iH$ が $\psi\eta_F=\phi$ を満たすとする。[標準写像の局所表示](../CATB5-04/index.md#prop-catb5-04-local-representation)により $f\in S$ では

$$
H(f)\psi_U(a)=\psi_V(F^+(f)a)
=\psi_V(\eta_{F,V}s_f)=\phi_V(s_f).
$$

これは $\bar\phi_U(a)$ と同じ整合族の貼り合わせである。一意性から $\psi_U(a)=\bar\phi_U(a)$ となる。空篩が被覆の場合も、層条件が一意の空族の貼り合わせを与えるため全議論が成立する。
<!-- proof-end -->

この定理を二度使う。前層から層への写像は一度目のplusへ延長でき、さらに二度目へ延長できる。そこで[二重plusによる層の構成](../CATB5-04/index.md#thm-catb5-04-double-plus)と[plus構成の関手性](#prop-catb5-05-plus-functor)を使い、二重plusそのものを前層圏から層の圏への関手として扱う。$F^{++}=(F^+)^+$ であり、標準写像も二度合成する。

<a id="def-catb5-05-sheafification"></a>

<!-- formal-statement-start -->
> **定義（層化関手）**
>
> 小site $(\mathcal C,J)$ の集合値前層から層への関手 $a$ を次のように定める。自然変換 $\alpha:F\Rightarrow G$ に対して

$$
aF=F^{++},\qquad a\alpha=(\alpha^+)^+.
$$

> 前層からその層化への標準自然変換の成分を $j_F:F\Rightarrow iaF$ とし、

$$
j_F=\eta_{F^+}\eta_F
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-05-sheafification -->
**定義の確認**。離散二点空間 $X=\{p,q\}$ で全開集合に $E=\{0,1\}$ を置き、制限を恒等写像とする前層 $K$ を取る。[plus構成](../CATB5-04/index.md#def-catb5-04-plus)を二度使って計算する。空でない $V$ 上の最小被覆篩 $S_V$ は一点集合と空集合の包含からなる。実際、離散空間の開被覆は各点を含む開集合を持つため、被覆篩は各一点集合の包含を含む。前合成閉性から空集合の包含も含む。

任意の代表元を $S_V$ に制限できる。$S_V$ 上の整合族は空集合への恒等制限によって、各点の値 $e_x$ と空集合の値 $e_\varnothing$ が

$$
e_x=e_\varnothing\qquad(x\in V)
$$

を満たす。逆に任意の $e\in E$ を全成分に置けば整合する。二つの族が局所同値なら、共通被覆も $S_V$ を含むため各成分は一致する。従って一度目は $K^+(V)\cong E$ である。空集合上は空篩が被覆なので空族が全ての代表元と局所同値となり、$K^+(\varnothing)$ は一元集合となる。

二度目は空集合への制限が唯一であるため、各点の値を独立に選べる。$E^V$ は $V$ から $E$ への写像の集合であり、各整合族を点の値の写像に対応させると

$$
aK(V)\cong E^V
$$

となる。逆対応は各点に写像の値を置き、空集合に唯一の元を置くことで得られる。空でない $W\subseteq V$ への制限では $S_V$ の引き戻しが $S_W$ となり、対応する写像の $W$ への制限になる。$W=\varnothing$ の場合は唯一の空写像に送られる。[開集合圏の層条件](../CATB5-03/index.md#thm-catb5-03-open-equivalence)で確かめると、任意の開被覆で一致する写像は点ごとに一意に貼り合わさる。空被覆では空写像が唯一である。従ってこれは層である。

写像 $b:E\to E$ を $b(0)=1,\ b(1)=0$ とする。全開集合で $b$ を成分とする自然変換 $\alpha:K\Rightarrow K$ は制限が恒等なので自然である。

[plus構成の関手性](#prop-catb5-05-plus-functor)の成分への作用を二度使うと、$x:V\to E$ に対して

$$
(a\alpha)_V(x)=b\circ x
$$

となる。制限との交換は任意の $W\subseteq V$ で $(b\circ x)|_W=b\circ(x|_W)$ となることから確認できる。任意の写像 $c:E\to E$ による自然変換を続けて作用させると $c\circ(b\circ x)=(c\circ b)\circ x$ となり、恒等写像なら $1_E\circ x=x$ となる。

$j_{K,V}(e)$ は値 $e$ の定数写像であり、空集合上では空写像である。各包含で定数写像を制限すると同じ定数写像になるため自然である。

また $a\alpha$ と $j_K$ の交換はどちらの経路も値 $b(e)$ の定数写像を与えることで確かめられる。
<!-- definition-example-end -->

一般に $aF$ が層であることは[二重plusの定理](../CATB5-04/index.md#thm-catb5-04-double-plus)から、関手性と $j$ の自然性は[plus構成の関手性](#prop-catb5-05-plus-functor)を二度適用して従う。

<a id="thm-catb5-05-adjunction"></a>

<!-- formal-statement-start -->
> **定理（層化と包含の随伴）**
>
> 小site上の層化関手 $a:\operatorname{PSh}(\mathcal C)\to\operatorname{Sh}(\mathcal C,J)$ は包含関手 $i$ の左随伴である。任意の前層 $F$ と層 $H$ について自然な全単射

$$
\operatorname{Hom}_{\operatorname{Sh}}(aF,H)
\longrightarrow
\operatorname{Hom}_{\operatorname{PSh}}(F,iH),
\qquad h\longmapsto i(h)j_F
$$

> が成立する。また $H$ が層なら $j_{iH}$ は自然同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\phi:F\Rightarrow iH$ に[plusから層への一意延長](#thm-catb5-05-plus-extension)を適用して $\bar\phi:F^+\Rightarrow iH$ を得る。さらに同定理を $\bar\phi$ に適用すると $h:F^{++}\Rightarrow iH$ が得られ、

$$
h\eta_{F^+}\eta_F=\bar\phi\eta_F=\phi.
$$

始域 $F^{++}$ と終域 $H$ は層なので $h$ は層の圏の射でもある。以下、包含による同一視のもとでこの射と前層の自然変換 $i(h)$ を同じ記号で表す。別の $k$ が $kj_F=\phi$ を満たすなら、第一の延長の一意性で $k\eta_{F^+}=\bar\phi$、第二の一意性で $k=h$ となる。従って表示した写像は全単射である。

前層の射 $u:F'\Rightarrow F$ については[plus構成の関手性](#prop-catb5-05-plus-functor)から得た $j$ の自然性 $i(au)j_{F'}=j_Fu$ より

$$
i(h\,a u)j_{F'}=i(h)j_Fu.
$$

層の射 $v:H\Rightarrow H'$ については

$$
i(vh)j_F=i(v)i(h)j_F.
$$

従って両変数で自然であり、[随伴の定義](../../CAT/CAT2-08/index.md#def-cat2-08-adjunction)を満たす。

$H$ が層なら[二重plusの定理](../CATB5-04/index.md#thm-catb5-04-double-plus)により $\eta_{iH}$ は自然同型であり、$(iH)^+$ も層であるから $\eta_{(iH)^+}$ も自然同型となる。その合成 $j_{iH}$ も自然同型である。
<!-- proof-end -->

層化は単に局所データを追加する操作ではなく、層への射を変えない操作である。さらに層の層化は元の層に戻る。

## 4. 層の極限は前層として計算できる

次の問いは、層化の前後で積や等化子を取る順序を交換できるかである。まず層の圏における極限の計算法を確定する。[極限](../../CAT/CAT2-01/index.md#def-cat2-01-limit)は、図式と両立する全ての射の族を一つの普遍的な対象からの射にまとめる。層の場合には各開集合やsiteの各対象でこの操作を実行できる。

<a id="thm-catb5-05-sheaf-limits"></a>

<!-- formal-statement-start -->
> **定理（層の極限の点ごとの構成）**
>
> 小site上の集合値層の任意の小図式 $D:I\to\operatorname{Sh}(\mathcal C,J)$ は極限を持つ。前層圏で包含した図式 $iD$ の極限を取れば、その極限前層は層であり、極限錐は層の圏でも極限錐となる。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[関手圏の極限の点ごとの構成](../../CAT/CAT2-07/index.md#thm-cat2-07-pointwise-limit)を集合値前層に適用する。ここで $D_k=D(k)$ は層、$D_\gamma=D(\gamma)$ は層の間の自然変換、$D_\gamma(U)$ はその $U$ での成分である。前層 $L$ は各対象 $U$ で集合の極限

$$
L(U)=\lim_{k\in I}D_k(U)
$$

を取る。制限は各成分の制限で与えられる。元は全ての図式の射 $\gamma:k\to l$ について $D_\gamma(U)(x_k)=x_l$ を満たす族 $(x_k)$ である。

被覆篩 $S$ 上の $L$ の整合族 $(s_f)_{f\in S}$ を取る。各 $k$ の成分 $(s_{f,k})_{f\in S}$ は $D_k$ の整合族だから、層条件より唯一の貼り合わせ $x_k\in D_k(U)$ が存在する。任意の $\gamma:k\to l$ と $f:V\to U$ に対し

$$
D_l(f)D_\gamma(U)x_k
=D_\gamma(V)D_k(f)x_k
=D_\gamma(V)s_{f,k}=s_{f,l}.
$$

従って $D_\gamma(U)x_k$ と $x_l$ は同じ整合族を貼り合わせる。$D_l$ の層条件の一意性から両者は等しく、$(x_k)$ は $L(U)$ に属する。その制限は成分ごとに $s_{f,k}$ と一致するため整合族を貼り合わせる。一意性も各成分の一意性から従う。空図式の場合は全ての対象で空の族一つとなり、同じ議論が成立する。

最後に任意の層からの錐に前層圏の[極限の普遍性](../../CAT/CAT2-01/index.md#def-cat2-01-limit)を適用する。得られる唯一の自然変換の始域と終域はともに層であり、層の圏の射である。従って極限は層の圏でも成立する。
<!-- proof-end -->

## 5. 有限個の局所条件を同じ被覆で満たす

積を取ってから局所化する場合、全成分が同じ被覆上に載る必要がある。先に各成分を局所化すると、異なる被覆が使われる。しかし成分が有限個なら被覆篩の有限交差を取り、全成分を一つの被覆へ揃えられる。等化条件も有限個なら同じ方法で揃えられる。[比較射による保存判定](../../CAT/CAT2-11/index.md#prop-cat2-11-comparison)に従い、極限の射影に関手を作用させて得られる錐から誘導される射が同型になることを示そう。

<a id="thm-catb5-05-plus-finite-limits"></a>

<!-- formal-statement-start -->
> **定理（plus構成の有限極限保存）**
>
> 小site上の集合値前層の有限図式 $D:I\to\operatorname{PSh}(\mathcal C)$（対象と射がともに有限個）について、$L=\lim_I D$ と置く。射影 $\pi_k:L\Rightarrow D_k$ が誘導する比較射

$$
\kappa:L^+\longrightarrow\lim_I D_k^+
$$

> は自然同型である。
<!-- formal-statement-end -->

[比較射による保存判定](../../CAT/CAT2-11/index.md#prop-cat2-11-comparison)では、射影への合成が $\pi_k^+$ となる唯一の射 $\kappa$ が同型かを調べればよい。ここではその比較射が同じ篩上の整合族を図式の各成分へ射影する。逆向きには共通被覆を二度細かくする。最初は代表元の篩を揃え、次は図式の各射について必要な等式を同じ篩で成立させる。

<!-- proof-start -->
### 証明

[点ごとの極限の構成](../../CAT/CAT2-07/index.md#thm-cat2-07-pointwise-limit)と[plus構成の関手性](#prop-catb5-05-plus-functor)により、各対象 $U$ で比較射は

$$
[S,s]\longmapsto
\bigl([S,(\pi_{k,V}s_f)_{f:V\to U\ \in S}]\bigr)_{k\in I}
$$

となる。射影の錐の等式にplusを作用させれば像が極限の元になる。射影の自然性と極限の普遍性から比較射も自然である。

まず全射性を示す。右辺の元を $(a_k)$ とし、代表元 $a_k=[S_k,s^k]$ を選ぶ。[被覆篩の有限交差](../CATB5-02/index.md#prop-catb5-02-cover-closure)を使って

$$
S=\bigcap_{k\in\operatorname{Ob}I}S_k
$$

を取る。空交差は $M_U$ とする。$S$ は被覆であり、各代表元を $S$ に制限できる。

図式の射 $\gamma:k\to l$ に対して $D_\gamma^+(U)a_k=a_l$ が成立する。[局所同値](../CATB5-04/index.md#def-catb5-04-local-equivalence)により $S$ に含まれる被覆篩 $R_\gamma$ を選び、各 $f:V\to U$ が $R_\gamma$ に属するとき

$$
D_\gamma(V)s^k_f=s^l_f
$$

とできる。射全体も有限なので

$$
R=S\cap\bigcap_{\gamma\in\operatorname{Mor}I}R_\gamma
$$

は被覆である。任意の $f:V\to U$ が $R$ に属するとき、全ての図式の等式が成立するから $t_f=(s_f^k)_k$ は $L(V)$ の元である。$g:W\to V$ について

$$
L(g)t_f=(D_k(g)s_f^k)_k=(s_{fg}^k)_k=t_{fg}.
$$

従って $t$ は $R$ 上の整合族であり、$[R,t]$ は全ての成分で $a_k$ と同じ局所同値類を与える。空図式では $R=M_U$ と空の成分族を選ぶことになり、全射性は同じ手順で成立する。

次に単射性を示す。$[S,s],[T,t]$ の像が等しいとする。各 $k$ について被覆篩 $Q_k\subseteq S\cap T$ が存在し、各 $f:V\to U$ が $Q_k$ に属するとき

$$
\pi_{k,V}s_f=\pi_{k,V}t_f
$$

となる。$Q=S\cap T\cap\bigcap_k Q_k$ は被覆である。$f\in Q$ なら全ての成分が一致し、$L(V)$ は成分族の集合なので $s_f=t_f$ である。空図式でも空の成分族は唯一だから一致する。よって $Q$ は二つの代表元の局所同値の証人である。

各 $\kappa_U$ が全単射である。自然性の等式の両側に逆写像を合成すれば逆の自然性も得られ、$\kappa$ は自然同型である。[比較射による保存判定](../../CAT/CAT2-11/index.md#prop-cat2-11-comparison)から極限を保存する。
<!-- proof-end -->

この議論で必要なのは被覆篩の有限交差である。無限個の被覆篩の交差が被覆であるとは一般に仮定できない。従って証明をそのまま任意の無限図式へ拡張することはできない。

有限極限を保存する関手を左完全と表現する。これは[極限の保存](../../CAT/CAT2-11/index.md#def-cat2-11-preserve-limit)を有限図式に限った条件である。前層圏には[点ごとの極限](../../CAT/CAT2-07/index.md#cor-cat2-07-presheaf-bicomplete)があり、層の圏にも[層の極限の点ごとの構成](#thm-catb5-05-sheaf-limits)によって有限極限がある。例えば集合の圏の恒等関手は、任意の有限図式の極限錐をそのまま同じ錐に送るので左完全である。一方、[自由モノイド関手](../../CAT/CAT2-08/index.md#thm-cat2-08-free-monoid)は一元集合を一文字からなる任意の長さの語のモノイドへ送る。このモノイドには空語と長さ1の語があり、一元モノイドではない。モノイドの圏の終対象は一元モノイドであるから、終対象を保存しない。左随伴であることだけでは左完全性は保証されない（[随伴の逆向きの保存の失敗](../../CAT/CAT2-11/index.md#prop-cat2-11-opposite-fails)）。

<a id="def-catb5-05-left-exact"></a>

<!-- formal-statement-start -->
> **定義（左完全関手）**
>
> 有限極限を持つ圏 $\mathcal A,\mathcal B$ の間の関手 $T:\mathcal A\to\mathcal B$ が左完全であるとは、任意の有限図式の極限錐を極限錐へ送ることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb5-05-left-exact -->
**定義の確認**。集合の圏で二元集合 $E$ を固定する。$T(X)=X^E$ は写像 $x:E\to X$ の集合であり、射 $f:X\to Y$ に対して $T(f):X^E\to Y^E$ を $T(f)(x)=f\circ x$ で定める。$T(1_X)(x)=x$ であり、$g:Y\to Z$ に対し

$$
T(gf)(x)=(gf)\circ x=g\circ(f\circ x)=T(g)(T(f)(x))
$$

なので関手である。

任意の有限図式 $D$ の極限 $L$ と射影 $p_k:L\to D_k$ について、極限の元は図式の射と両立する成分族で表される。写像 $x:E\to L$ から各 $k$ への写像 $x_k=p_k\circ x:E\to D_k$ を作る。ただし任意の $e\in E$ と図式の射 $\gamma:k\to l$ で

$$
D_\gamma(x_k(e))=x_l(e)
$$

を満たすことが条件である。逆向きにはこの条件を満たす族から $x(e)=(x_k(e))_k$ を作れる。各 $e$ で全成分が一致するため両方向の合成は恒等となる。この全単射の第 $k$ 成分は $T(p_k)(x)=p_k\circ x$ であるから、比較射そのものである。従って[比較射による保存判定](../../CAT/CAT2-11/index.md#prop-cat2-11-comparison)により左完全である。

空図式では $E$ から一元集合への写像が唯一であることが終対象の保存を確認する。
<!-- definition-example-end -->

<a id="thm-catb5-05-sheafification-left-exact"></a>

<!-- formal-statement-start -->
> **定理（層化の左完全性）**
>
> 小site $(\mathcal C,J)$ の集合値前層の層化関手 $a$ は左完全である。任意の有限図式 $D$ について射影の層化が誘導する比較射は自然同型となる。

$$
a(\lim_I D)\cong\lim_I aD.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[plus構成の有限極限保存](#thm-catb5-05-plus-finite-limits)を $D$ に適用して $(\lim D)^+\cong\lim D_k^+$ を得る。これにplus関手を適用する。関手は同型の逆射も同時に送るので同型を保存する。次いで有限図式 $D^+$ に同定理を適用すれば

$$
(\lim D)^{++}\cong(\lim D_k^+)^+
\cong\lim D_k^{++}
$$

を得る。最初の比較射を $\kappa_D$、次の比較射を $\kappa_{D^+}$ と書き、$\lim D^+$ の射影を $q_k$、$\lim D^{++}$ の射影を $r_k$ とする。比較射の定義から $q_k\kappa_D=\pi_k^+$、$r_k\kappa_{D^+}=q_k^+$ なので、

$$
r_k\kappa_{D^+}(\kappa_D)^+
=q_k^+(\kappa_D)^+
=(q_k\kappa_D)^+
=(\pi_k^+)^+.
$$

[極限の普遍性](../../CAT/CAT2-01/index.md#def-cat2-01-limit)によりこの合成は層化の比較射そのものである。

右辺の極限は前層圏で取ったものであるが、各 $D_k^{++}$ は層である。[層の極限の点ごとの構成](#thm-catb5-05-sheaf-limits)により層の圏でも極限となる。左辺も層なのでこの自然同型は層の圏の同型である。
<!-- proof-end -->

例えば二つの前層の積を層化しても、各前層を層化してから積を取っても同じ結果になる。等化子についても成立するので、二つの射の局所的な一致条件を層化の前後で比較できる。これは後にトポスの構造を調べる基礎となる。

## 6. 演習

### CATB5-05-A01 標準写像と恒等変換

- Level: A

任意の前層 $F$ について $(1_F)^+=1_{F^+}$ と $a(1_F)=1_{aF}$ を代表元を使って確認せよ。

<!-- solution-start -->
**詳細解答**

[plus構成の関手性](#prop-catb5-05-plus-functor)の式に $\alpha=1_F$ を代入すると

$$
(1_F)^+_U[S,s]=[S,(1_{F(V)}s_f)_{f:V\to U\ \in S}]
=[S,s].
$$

全対象と全ての代表元で恒等写像となる。これを前層 $F^+$ に適用すると $(1_{F^+})^+=1_{F^{++}}$ なので $a(1_F)=1_{aF}$ である。
<!-- solution-end -->

### CATB5-05-A02 層への延長の値

- Level: A

離散二点空間 $X=\{p,q\}$ 上で空でない開集合には定数値 $0,1$、空集合には空写像だけを許す前層 $K$ を取る。層 $H(V)=\{0,1,2\}^V$ への自然変換 $\phi$ が各定数値 $e$ を値 $2e$ の定数写像へ送るとする。$K^+(X)$ の元 $(1,0)$ の延長像を求めよ。

<!-- solution-start -->
**詳細解答**

一点集合への制限は $p$ で $1$、$q$ で $0$ であり、$\phi$ による像はそれぞれ $2,0$ となる。交差の空集合では空写像が一致する。[plusから層への一意延長](#thm-catb5-05-plus-extension)の構成ではこの局所像を貼り合わせるので、答えは $h(p)=2,\ h(q)=0$ を満たす写像 $h$ である。各点の値が指定されているため他の貼り合わせはない。
<!-- solution-end -->

### CATB5-05-A03 終対象のplus

- Level: A

全対象で一元集合、全射で唯一の写像を取る前層 $1$ について $1^+(U)$ を求め、$a1$ が終対象であることを示せ。

<!-- solution-start -->
**詳細解答**

全ての被覆篩上で整合族は唯一であり、空篩でも空族が唯一存在する。任意の制限は一元集合間の唯一の写像だから整合条件を満たす。任意の二つの代表元の篩 $S,T$ の交差は[被覆篩の有限交差](../CATB5-02/index.md#prop-catb5-02-cover-closure)より被覆である。その上で成分は全て一致するので局所同値である。最大篩上の代表元があるため $1^+(U)$ は一元集合であり、制限も唯一である。さらにplusを取っても同じである。任意の層から $a1$ への写像は各対象で唯一であり、自然性の両辺も唯一の写像だから終対象となる。
<!-- solution-end -->

### CATB5-05-A04 既に層である場合

- Level: A

層 $H$ と層 $K$ の射 $\phi:H\Rightarrow K$ に対し、$iH$ から $a(iH)$ への標準写像に沿う一意延長を $j_{iH}^{-1}$ を用いて表せ。

<!-- solution-start -->
**詳細解答**

[層化と包含の随伴](#thm-catb5-05-adjunction)で $j_{iH}$ は自然同型である。従って $h=\phi j_{iH}^{-1}$ と置けば

$$
h j_{iH}=\phi j_{iH}^{-1}j_{iH}=\phi.
$$

別の延長 $h'$ も $h'j_{iH}=\phi$ を満たすので、右から $j_{iH}^{-1}$ を合成すると $h'=\phi j_{iH}^{-1}$。これが唯一の延長である。
<!-- solution-end -->

### CATB5-05-B01 積の比較射の逆

- Level: B

前層 $F,G$ と対象 $U$ を取る。$[S,s]\in F^+(U)$ と $[T,t]\in G^+(U)$ から $(F\times G)^+(U)$ の元を構成し、積の比較射の逆であることを確認せよ。

<!-- solution-start -->
**詳細解答**

[被覆篩の有限交差](../CATB5-02/index.md#prop-catb5-02-cover-closure)より $R=S\cap T$ は被覆である。各 $f\in R$ で $v_f=(s_f,t_f)$ と置く。$g:W\to\operatorname{dom}f$ に対して

$$
(F\times G)(g)v_f=(F(g)s_f,G(g)t_f)
=(s_{fg},t_{fg})=v_{fg}.
$$

よって $[R,v]$ が構成できる。元の代表元を変えた場合、$F$ 側と $G$ 側で一致を保証する被覆篩を一つずつ取り、その交差では組の両成分が一致する。従って結果は代表元に依存しない。

比較射で射影すると $[R,s|_R],[R,t|_R]$ となり元の二つの類に等しい。逆に初めから $[P,w]$ を射影した場合、二つの篩はともに $P$ なので交差も $P$ であり、成分を組に戻せば $w_f$ そのものになる。従って両方向の合成が恒等である。
<!-- solution-end -->

### CATB5-05-B02 等化条件を局所的に満たす元

- Level: B

自然変換 $\alpha,\beta:F\Rightarrow G$ の等化子前層を $E$ とする。$z=[S,s]\in F^+(U)$ が $\alpha^+_U(z)=\beta^+_U(z)$ を満たすとき、$z$ を $E^+(U)$ の元から得られることを示せ。

<!-- solution-start -->
**詳細解答**

[plus構成の関手性](#prop-catb5-05-plus-functor)により両像の代表元は篩 $S$ を共有し、成分はそれぞれ $\alpha_V(s_f),\beta_V(s_f)$ である。[局所同値](../CATB5-04/index.md#def-catb5-04-local-equivalence)からある被覆篩 $R\subseteq S$ が存在して全ての $f:V\to U$ が $R$ に属するとき

$$
\alpha_V(s_f)=\beta_V(s_f)
$$

となる。[点ごとの極限の構成](../../CAT/CAT2-07/index.md#thm-cat2-07-pointwise-limit)により等化子は $E(V)=\{x\in F(V)\mid\alpha_V(x)=\beta_V(x)\}$ である。$g:W\to V$ に対して

$$
\alpha_W(F(g)s_f)=G(g)\alpha_V(s_f)
=G(g)\beta_V(s_f)=\beta_W(F(g)s_f).
$$

従って制限も $E$ に入る。$s|_R$ は $E$ の整合族であり、$[R,s|_R]\in E^+(U)$ は包含射のplusによって $[S,s]$ に送られる。これが等化子の比較射の全射性の機構である。
<!-- solution-end -->

### CATB5-05-B03 層化された余積の計算法

- Level: B

二つの層 $H,K$ の前層としての余積を $P=iH\amalg iK$ とする。$aP$ が層の圏における余積であることを、随伴の全単射を使って示せ。

<!-- solution-start -->
**詳細解答**

前層の余積の包含射を $u:iH\Rightarrow P,\ v:iK\Rightarrow P$ とする。これらに標準写像を合成して、前層の射

$$
j_Pu:iH\Rightarrow i(aP),\qquad
j_Pv:iK\Rightarrow i(aP)
$$

を得る。始域・終域がいずれも層の包含像なので、それぞれを層の射 $u_a:H\Rightarrow aP$、$v_a:K\Rightarrow aP$ と見なせる。すなわち

$$
i(u_a)=j_Pu,\qquad i(v_a)=j_Pv
$$

である。

任意の層 $L$ と射 $h:H\Rightarrow L,\ k:K\Rightarrow L$ に対し、前層圏の[点ごとの余極限の構成](../../CAT/CAT2-07/index.md#thm-cat2-07-pointwise-colimit)で得られる余積の普遍性から唯一の $\phi:P\Rightarrow iL$ が存在して

$$
\phi u=i(h),\qquad \phi v=i(k)
$$

となる。

[層化と包含の随伴](#thm-catb5-05-adjunction)から唯一の $\bar\phi:aP\Rightarrow L$ が $i(\bar\phi)j_P=\phi$ を満たす。従って

$$
i(\bar\phi)j_Pu=i(h),\qquad
i(\bar\phi)j_Pv=i(k).
$$

包含は層の射をその自然変換に送るので、これは

$$
\bar\phi u_a=h,\qquad \bar\phi v_a=k
$$

を意味する。

別の層の射 $\psi:aP\Rightarrow L$ が同じ二条件を満たせば、$i(\psi)j_P$ は $u,v$ との合成がそれぞれ $i(h),i(k)$ となる。前層の余積の一意性で $i(\psi)j_P=\phi$ となる。随伴の一意性で $\psi=\bar\phi$ である。従って $(aP,u_a,v_a)$ は求める余積である。層の極限とは異なり、前層としての余積の後に層化が必要になる場合がある。
<!-- solution-end -->

### CATB5-05-C01 無限積では何が壊れるか

- Level: C

非負整数 $n\in\mathbb N_0$ を対象とし、$m\to n$ が存在することと $m\geq n$ が同値である小圏を考える。各対象 $n$ では空でない篩を全て被覆とする。

1. Grothendieck位相の公理を確かめよ。
2. 各 $k\geq0$ について、$n\geq k$ なら一元集合、$n<k$ なら空集合を取る前層 $F_k$ の層化を求めよ。
3. 層化がこの可算積を保存するか判定せよ。

<!-- solution-start -->
**詳細解答**

(1) 対象 $n$ 上の空でない篩には最小の始域番号 $r\geq n$ が存在する。篩の前合成閉性からそれは全ての $m\geq r$ の射を含み、それ以外を含まない。これを $S_r$ と書く。

最大篩は $S_n$ なので被覆である。射 $p\to n$ による引き戻しは、$m\geq p$ かつ $m\geq r$ となる射の篩である。従って

$$
(p\to n)^*S_r=S_{\max(p,r)}
$$

となり、被覆である。

推移律では被覆篩 $S$ を取り、篩 $T$ の引き戻しが $S$ の全ての射に沿って被覆と仮定する。$S$ は空でないので射 $p\to n$ を一つ取れる。

仮定により $p\to n$ に沿う $T$ の引き戻しは空でないので、そこから射 $m\to p$ を一つ選べる。引き戻しの定義から合成 $m\to n$ は $T$ に属し、$T$ は空でない。従って $T$ は被覆である。これで[Grothendieck位相の公理](../CATB5-02/index.md#def-catb5-02-grothendieck-topology)を全て確認した。

(2) 射 $m\to n$ に対する制限は $F_k(n)\to F_k(m)$ である。$n\geq k$ なら $m\geq n\geq k$ なので一元集合から一元集合への写像が存在する。

$n<k$ なら空集合からの唯一の写像が存在する。全ての写像が唯一だから前層の恒等則・合成則を満たす。

$S_{\max(n,k)}$ 上では全成分が一元集合なので整合族が唯一存在する。任意の二つの代表元は共通の被覆篩（より大きい始域番号の尾部）上で全ての成分が一致する。

従って $F_k^+(n)$ は一元集合である。制限は唯一で、この前層は層である。ゆえに $aF_k$ も一元集合の層となる。

(3) [点ごとの極限の構成](../../CAT/CAT2-07/index.md#thm-cat2-07-pointwise-limit)により前層としての積 $P=\prod_{k\geq0}F_k$ を取る。任意の有限の $n$ に対して $k=n+1$ を選ぶと $F_k(n)=\varnothing$ だから

$$
P(n)=\prod_{k\geq0}F_k(n)=\varnothing.
$$

被覆篩は常に空でないので、$P$ にはどの被覆篩上にも整合族がない。従って $P^+(n)=\varnothing$ かつ $aP(n)=\varnothing$ である。一方、[層の極限の点ごとの構成](#thm-catb5-05-sheaf-limits)により各 $aF_k$ の積は全対象で一元集合となる。比較射は空集合から一元集合への写像であり全射でない。

この例では各 $F_k$ の元を表示できる被覆篩は始域番号 $k$ 以上の尾部に取れるが、全ての尾部の交差は空篩である。空篩は被覆ではないため、[plus構成の有限極限保存](#thm-catb5-05-plus-finite-limits)の共通被覆の手順は無限個の成分に対して失敗する。
<!-- solution-end -->

## 7. まとめ

層化は層への射を一意に延長する左随伴である。さらに、被覆篩の有限交差を使って有限個の局所データと等式を同時に成立させられるため左完全でもある。無限積ではその交差が被覆でなくなることがあり、左完全性を全極限保存と混同してはならない。次講では有限極限に加えて指数対象と部分対象分類子を備える圏を調べる。
