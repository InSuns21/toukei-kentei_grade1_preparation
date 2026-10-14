# LORG11 因果階層 III：continuityとsimplicity

<!-- definition-example-audit: strict -->

## 1. 未来集合が連続的に動くことと、因果的到達が閉じていること

[LORG10の安定因果性](../LORG10/index.md#def-lorg10-stable-causality)により、光円錐を少し広げても閉因果曲線を作らない時空を扱えるようになりました。しかし閉曲線がなくても、点を少し動かしたときに到達可能領域が突然増減したり、到達可能な点列の極限だけが到達不能になったりします。

ここで区別したいのは、(1) 時間的未来・過去の変化に飛躍がないこと、(2) 因果的未来・過去が極限点を含むこと、の二つです。前者から後者は従いません。最後にMinkowski時空から一点だけ抜いて、実際にその差を計算します。

以下、$(M,g)$ は滑らかな連結・Hausdorff・第二可算・境界なしの時間向き付きLorentz多様体、次元 $n+1$（$n\ge1$）、符号 $(-,+,\ldots,+)$ とします。曲線は[LORG3の区分的 $C^1$ 因果曲線](../LORG3/index.md#def-lorg3-causal-curve)を用います。$I^\pm(p),J^\pm(p)$ は[LORG6の因果集合](../LORG6/index.md#def-lorg6-chronological-causal-future)です。上線は常に **$M$ の位相での閉包**を表し、別の大きな時空の閉包と取り違えません。

## 2. 時間的集合の境界を扱う二つの補助事実

未来集合 $I^+(p)$ は[LORG7の開性](../LORG7/index.md#thm-lorg7-chronological-open)によって開です。閉包を取ると光的境界の候補が加わりますが、その内部は元の時間的未来に一致します。

<a id="lem-lorg11-regular-open"></a>

<!-- formal-statement-start -->
> **補題（時間的未来・過去の正則開性）**  
> 任意の $p\in M$ について
>
> $\operatorname{Int}_M\overline{I^\pm(p)}=I^\pm(p)$
>
> が成り立つ。また、$\overline{I^\pm(p)}=\overline{J^\pm(p)}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

開性から一方の包含は直ちに従います。閉包の内部に入る点を少し時間的過去へずらすと、その点を近似する時間的未来の点と結べます。そこで[LORG7のpush-up補題](../LORG7/index.md#thm-lorg7-push-up)を使います。

<!-- proof-start -->
### 証明

未来側を証明します。$I^+(p)$ は開なので $I^+(p)\subset\operatorname{Int}\overline{I^+(p)}$ です。逆に $q\in\operatorname{Int}\overline{I^+(p)}$ とします。$q$ の十分小さな時間的過去に $r\ll q$ を取り、しかも $r$ がこの閉包の内部に属するようにします。$r\in\overline{I^+(p)}$ だから、$r_k\in I^+(p)$ で $r_k\to r$ を取れます。時間的関係の端点に関する開性により、十分大きな $k$ で $r_k\ll q$ です。$p\ll r_k\ll q$ を推移させれば $p\ll q$ となり、$q\in I^+(p)$ です。

また $I^+(p)\subset J^+(p)$ であり、任意の $q\in J^+(p)$ の直後には $q\ll q_k$ かつ $q_k\to q$ となる点列があります。[push-up補題](../LORG7/index.md#thm-lorg7-push-up)から $p\ll q_k$ なので $q\in\overline{I^+(p)}$ です。従って
$$
I^+(p)\subset J^+(p)\subset\overline{I^+(p)}
$$
であり、両端の閉包を取れば等号が従います。過去側は時間向きを逆にした同じ証明です。$\square$
<!-- proof-end -->

**Minkowskiで確認**。$p=(0,0)$、$g=-dt^2+dx^2$ なら
$$
I^+(p)=\{(t,x):t>|x|\},\qquad
\overline{I^+(p)}=\{(t,x):t\ge|x|\}.
$$
後者の内部は前者です。ただし、これだけから一般時空の $J^+(p)$ が閉じているとはいえません。閉包と因果的到達は別の操作だからです。

## 3. 反映性：点を動かす方向によらない近づき方

$q$ が $p$ の時間的未来の閉包にあるとき、時間向きを逆から見て $p$ が $q$ の時間的過去の閉包に入るでしょうか。Minkowski時空ではどちらも同じ非厳密な光円錐不等式になります。一般時空では障害物により非対称になることがあります。

<a id="def-lorg11-reflecting"></a>

<!-- formal-statement-start -->
> **定義（未来・過去反映性と反映的時空）**  
> 時間向き付きLorentz多様体 $(M,g)$ が **反映的（reflecting）** であるとは、任意の $p,q\in M$ について
$$
q\in\overline{I^+(p)}
\quad\Longleftrightarrow\quad
p\in\overline{I^-(q)}
$$
> が成り立つことをいう。左から右への含意を未来側の反映性、右から左への含意を過去側の反映性と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg11-reflecting -->

**定義の確認**（二次元Minkowski時空）。$p=(t_p,x_p)$、$q=(t_q,x_q)$ に対し、両辺はそれぞれ
$$
t_q-t_p\ge |x_q-x_p|
$$
に同値です。実際 $I^+(p)$ は厳密不等号で定まる開錐、その閉包は非厳密不等号で定まる閉錐です。$I^-(q)$ も同じ不等式を $(t_p,x_p)$ に関して満たすので、両側の条件を直接確認できました。

<!-- definition-example-end -->

この定義は固定された二点での閉包を比べます。点そのものを動かす極限 $(p_k,q_k)\to(p,q)$ も扱うには、次の補題が必要です。

<a id="lem-lorg11-pair-reflection"></a>

<!-- formal-statement-start -->
> **補題（反映性と到達関係の極限）**  
> 反映的な滑らかな時間向き付きLorentz多様体で $p_k\ll q_k$、$p_k\to p$、$q_k\to q$ ならば、$q\in\overline{I^+(p)}$ かつ $p\in\overline{I^-(q)}$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$q$ の少し未来の点 $r$ を固定すれば、十分大きな $k$ で $q_k\ll r$ です。$p_k\ll r$ の極限を固定点 $r$ について取り、反映性を適用します。

<!-- proof-start -->
### 証明

任意に $r\in I^+(q)$ を取ります。時間的関係の開性から $q_k\ll r$ が十分大きな $k$ で成立し、$p_k\ll q_k\ll r$ となります。従って $p_k\in I^-(r)$、極限を取ると $p\in\overline{I^-(r)}$ です。反映性から $r\in\overline{I^+(p)}$ です。$q\ll r_j$ かつ $r_j\to q$ と選ぶと、各 $r_j$ はこの閉集合に属するため $q\in\overline{I^+(p)}$ です。再度反映性を適用して $p\in\overline{I^-(q)}$ となります。$\square$
<!-- proof-end -->

### 3.1 未来・過去集合の外側連続性

集合 $I^+(p)$ の「外側への飛び出し」を精密に言うには、$p$ の未来に入らない**コンパクト集合**を使います。非コンパクトな集合全体について一様な排除を要求する必要はありません。

<a id="def-lorg11-outer-continuity"></a>

<!-- formal-statement-start -->
> **定義（時間的未来・過去の外側連続性）**  
> 写像 $p\mapsto I^+(p)$ が点 $p$ で**外側連続**であるとは、任意のコンパクト集合 $K\subset M\setminus\overline{I^+(p)}$ に対して、$p$ の開近傍 $U$ が存在し、すべての $p'\in U$ で $K\cap I^+(p')=\varnothing$ となることをいう。$I^-$ についても未来と過去を交換して定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg11-outer-continuity -->

**定義の確認**（Minkowski時空）。$K$ が閉錐 $\{(t,x):t-t_p\ge|x-x_p|\}$ と交わらないとき、連続関数
$$
F(p',q)=t_q-t_{p'}-|x_q-x_{p'}|
$$
は $\{p\}\times K$ 上で厳密に負です。$K$ のコンパクト性から $\max_{q\in K}F(p,q)<0$ となります。$p'$ を十分 $p$ に近づければこの最大値は依然負なので、$K\cap I^+(p')=\varnothing$ です。過去側も同じ不等式の向きを変えます。

<!-- definition-example-end -->

<a id="thm-lorg11-reflecting-outer"></a>

<!-- formal-statement-start -->
> **定理（反映性と両側外側連続性）**  
> 滑らかな時間向き付きLorentz多様体が反映的であることと、$p\mapsto I^+(p)$ および $p\mapsto I^-(p)$ の両方がすべての点で外側連続であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

外側連続性が破れれば、$p_k\to p$ とコンパクトな $K$ の点 $q_k\in I^+(p_k)$ を作れます。部分列極限 $q\in K$ に先ほどの補題を適用すると矛盾します。逆方向では、閉包の片側にある点を他方の閉包から切り離して、外側連続性と時間的関係の開性を衝突させます。

<!-- proof-start -->
### 証明

反映性を仮定します。未来側の外側連続性が失敗したとすれば、ある $p$ とコンパクト $K\subset M\setminus\overline{I^+(p)}$、列 $p_k\to p$、$q_k\in K\cap I^+(p_k)$ が存在します。$K$ のコンパクト性から部分列 $q_k\to q\in K$ を取れます。[極限補題](#lem-lorg11-pair-reflection)より $q\in\overline{I^+(p)}$ となり矛盾します。過去側も同様に従います。

逆に両側外側連続性を仮定します。$q\in\overline{I^+(p)}$ を取り、$p\notin\overline{I^-(q)}$ と仮定します。点 $p$ を含み $\overline{I^-(q)}$ と交わらない相対コンパクトな小閉近傍 $K$ を選べます。過去側の外側連続性を $q$ で適用すると、$q$ の近傍 $U$ に対してすべての $q'\in U$ で $K\cap I^-(q')=\varnothing$ です。しかし $q\in\overline{I^+(p)}$ なので $q_k\in I^+(p)\cap U$ と選べます。このとき $p\ll q_k$、すなわち $p\in K\cap I^-(q_k)$ となり矛盾します。よって $p\in\overline{I^-(q)}$ です。逆の含意は未来側の外側連続性を使って同じように証明できます。$\square$
<!-- proof-end -->

## 4. 因果連続性：識別性と反映性の両立

外側連続性だけでは異なる点の未来・過去が同一になる問題は排除できません。そのため[LORG9の未来・過去識別性](../LORG9/index.md#def-lorg9-distinguishing)を併せて要求します。

<a id="def-lorg11-causal-continuity"></a>

<!-- formal-statement-start -->
> **定義（因果連続性）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ が **因果連続的（causally continuous）** であるとは、未来・過去識別的であり、かつ反映的であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg11-causal-continuity -->

**定義の確認**（Minkowski時空）。[LORG10のMinkowskiでのtemporal functionの構成](../LORG10/index.md#thm-lorg10-temporal-implies-strong)によって時刻 $t$ から強因果性、さらに[LORG10の強因果性から識別性への定理](../LORG10/index.md#thm-lorg10-strong-implies-distinguishing)によって未来・過去識別性が従います。反映性は前節で同じ閉錐不等式の左右を直接計算しました。二つの条件をそれぞれ確認したのでMinkowski時空は因果連続的です。

<!-- definition-example-end -->

因果連続性は「点による未来集合の識別」と「集合の外側連続性」の組み合わせです。時間関数への橋渡しを、測度を使ってもう一段具体化しましょう。

<a id="lem-lorg11-volume-continuity"></a>

<!-- formal-statement-start -->
> **補題（因果連続時空の未来・過去体積関数）**  
> 因果連続的な滑らかな時間向き付きLorentz多様体 $M$ に、全体の質量が有限で、任意の非空開集合へ正の測度を与える滑らかな正密度 $\mu$ を固定する。このとき
$$
v^\pm(p)=\mu(I^\pm(p))
$$
> は連続である。
<!-- formal-statement-end -->

ここでの $\mu$ はLorentz計量の固有時長ではなく、可積分な滑らかな正密度による通常の体積測度です。第二可算性と分割の一により、各座標小領域の正密度を十分小さい正の係数で足して $\mu(M)<\infty$ となるよう構成できます。

### 証明の見取り図

$I^\pm(p)$ の内部にあるコンパクト集合は $p$ を少し動かしても残ります（内側連続性）。閉包の外にあるコンパクト集合は[外側連続性](#thm-lorg11-reflecting-outer)により新しく入りません。境界が体積零であることを局所時間座標で確認すれば、二つの評価は一致します。

<!-- proof-start -->
### 証明

未来側だけ示します。$p_k\to p$ とします。$L\subset I^+(p)$ をコンパクトとします。すべての $q\in L$ について $p\ll q$ であり、時間的関係の両端点に関する開性と $L$ の有限部分被覆により、十分大きな $k$ で $L\subset I^+(p_k)$ です。測度の内側正則性を用いると
$$
\liminf_k \mu(I^+(p_k))\ge \sup_{L\Subset I^+(p)}\mu(L)=\mu(I^+(p)).
$$

次に $K\subset M\setminus\overline{I^+(p)}$ をコンパクトとします。[反映性からの外側連続性](#thm-lorg11-reflecting-outer)により、十分大きな $k$ で $I^+(p_k)\cap K=\varnothing$ です。従って
$$
\limsup_k\mu(I^+(p_k))\le\mu(M\setminus K).
$$
補集合のコンパクト集合 $K$ を増やし、測度の正則性を使えば右辺の下限は $\mu(\overline{I^+(p)})$ になります。

最後に $\partial I^+(p)$ が $\mu$-零集合であると確認します。境界上の二点 $a,b$ が $a\ll b$ を満たすことはありません。実際 $a_j\in I^+(p)$、$a_j\to a$ とすれば、十分大きな $j$ で $a_j\ll b$、ゆえに $p\ll b$ となって境界点 $b$ と矛盾します。各点の近くで $\partial_t$ が時間的な座標を選ぶと、一本の縦線上の異なる二点は時間的に比較可能です。従って境界と各縦線の交わりは高々一点であり、Fubiniの定理から座標Lebesgue測度は零です。第二可算性で可算個の座標領域を選べるので $\mu(\partial I^+(p))=0$ です。

従って $\mu(\overline{I^+(p)})=\mu(I^+(p))$ となり、下極限と上極限が一致します。過去側も同じ議論です。$\square$
<!-- proof-end -->

<a id="thm-lorg11-continuity-time"></a>

<!-- formal-statement-start -->
> **定理（因果連続性から時間関数へ）**  
> 因果連続的な滑らかな時間向き付きLorentz多様体には、任意の非定数未来因果曲線に沿って厳密に増加する連続時間関数が存在する。従って[LORG10の時間関数による特徴付け](../LORG10/index.md#thm-lorg10-stable-time-equivalence)により安定因果的である。
<!-- formal-statement-end -->

### 証明の見取り図

未来へ進めば過去集合は増え、未来集合は減ります。未来・過去識別性は、端点が異なると少なくとも集合の包含が真になることを保証します。差の体積が正になる点を確認して、二つの体積関数の差を時計にします。

<!-- proof-start -->
### 証明

[体積関数の補題](#lem-lorg11-volume-continuity)の測度を使い、
$$
T(p)=v^-(p)-v^+(p)
$$
と置けば $T$ は連続です。未来因果曲線に沿う異なる二点 $p,q$ を順に取ると $q\in J^+(p)$ です。[push-up補題](../LORG7/index.md#thm-lorg7-push-up)から
$$
I^-(p)\subset I^-(q),\qquad I^+(q)\subset I^+(p).
$$
さらに因果連続性には両側の識別性が含まれるので、これらの包含は真です。

真の包含から体積の厳密不等式が従うことを説明します。例えば $I^+(q)\subsetneq I^+(p)$ なのに $\mu(I^+(p)\setminus I^+(q))=0$ と仮定します。開集合 $I^+(p)$ が $\overline{I^+(q)}$ に含まれないなら、両者の差には非空開集合があり、$\mu$ が正なので矛盾します。従って $I^+(p)\subset\overline{I^+(q)}$ ですが、[正則開性](#lem-lorg11-regular-open)により
$$
I^+(p)\subset\operatorname{Int}\overline{I^+(q)}
=I^+(q),
$$
となり、真の包含に矛盾します。よって $v^+(q)<v^+(p)$ です。過去側について同じ議論から $v^-(p)<v^-(q)$ を得ます。従って
$$
T(q)-T(p)
=[v^-(q)-v^-(p)]+[v^+(p)-v^+(q)]>0.
$$
これは[LORG10の時間関数の定義](../LORG10/index.md#def-lorg10-time-function)そのものです。安定因果性への最後の含意は、同章で正確に区別した**時間関数から滑らかなtemporal functionを得る一般定理**を援用しています。この滑らか化自体を上の体積計算だけで証明したわけではありません。$\square$
<!-- proof-end -->

## 5. 因果単純性：因果的未来・過去が閉じていること

ここまでの連続性は $I^\pm$ の変化を支配します。ところが、時間的到達の境界にある点は、時間的曲線では到達できなくても、因果的曲線なら到達できるかもしれません。そこで今度は $J^\pm(p)$ 自身の閉性を要求します。

<a id="def-lorg11-causal-simplicity"></a>

<!-- formal-statement-start -->
> **定義（因果単純性）**  
> 滑らかな時間向き付きLorentz多様体 $(M,g)$ が **因果単純（causally simple）** であるとは、[causal](../LORG9/index.md#def-lorg9-causal)であり、かつすべての $p\in M$ に対して $J^+(p)$ と $J^-(p)$ が $M$ の閉集合であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg11-causal-simplicity -->

**定義の確認**（Minkowski時空）。時刻座標 $t$ は未来因果曲線に沿って増加するので閉因果曲線はありません。さらに
$$
J^+(p)=\{(t,x):t-t_p\ge|x-x_p|\}
$$
は連続関数 $t-t_p-|x-x_p|$ の非負集合として閉です。$J^-(p)$ も同様です。causality・未来閉性・過去閉性を別々に確認したので因果単純です。

<!-- definition-example-end -->

各 $p$ についての閉性と、二点組 $(p,q)$ の**関係全体**の閉性は表面上異なります。ここは極限の順序を省略せず証明します。

<a id="thm-lorg11-closed-relation"></a>

<!-- formal-statement-start -->
> **定理（因果関係の閉性の特徴付け）**  
> 滑らかな時間向き付きLorentz多様体で、すべての $p$ に対して $J^+(p),J^-(p)$ が閉であることと、
$$
\mathcal J=\{(p,q)\in M\times M:q\in J^+(p)\}
$$
> が積位相で閉であることは同値である。
<!-- formal-statement-end -->

### 証明の見取り図

難しいのは点ごとの閉性から関係全体の閉性を出す向きです。$p_k\le q_k$ の極限について、まず $r\ll p$ を固定して $r\ll q_k$ にし、未来閉性で $r\le q$ を得ます。その後 $r\to p$ を過去閉性に通します。

<!-- proof-start -->
### 証明

関係 $\mathcal J$ が閉なら、$\{q:(p,q)\in\mathcal J\}=J^+(p)$ と $\{q:(q,p)\in\mathcal J\}=J^-(p)$ は、連続写像による閉集合の逆像として閉です。

逆に各 $J^\pm(p)$ が閉と仮定し、$(p_k,q_k)\in\mathcal J$、$(p_k,q_k)\to(p,q)$ とします。任意の $r\ll p$ を固定すると、時間的関係の開性から十分大きな $k$ で $r\ll p_k$ です。$p_k\le q_k$ に[push-up補題](../LORG7/index.md#thm-lorg7-push-up)を適用して $r\ll q_k$ を得ます。従って $q_k\in J^+(r)$ であり、未来閉性から $q\in J^+(r)$、すなわち $r\in J^-(q)$ です。$r_j\ll p$ で $r_j\to p$ となる列を取れば、すべての $r_j$ が閉集合 $J^-(q)$ に属するので $p\in J^-(q)$ です。よって $(p,q)\in\mathcal J$ です。多様体は第二可算なので距離化可能であり、列による閉性確認で十分です。$\square$
<!-- proof-end -->

<a id="thm-lorg11-simple-continuous"></a>

<!-- formal-statement-start -->
> **定理（因果単純性は因果連続性を含意する）**  
> 滑らかな時間向き付きLorentz多様体が因果単純なら、未来・過去識別的かつ反映的、従って因果連続的である。
<!-- formal-statement-end -->

### 証明の見取り図

$\overline{I^\pm(p)}=\overline{J^\pm(p)}$ と $J^\pm(p)$ の閉性を合わせると、両者の閉包が $J^\pm(p)$ そのものになります。そこから反映性を直ちに検算できます。識別性にはcausalityによる反対称性が効きます。

<!-- proof-start -->
### 証明

[正則開性の補題](#lem-lorg11-regular-open)の二番目の主張と $J^\pm(p)$ の閉性から
$$
\overline{I^+(p)}=J^+(p),\qquad
\overline{I^-(q)}=J^-(q)
$$
です。従って任意の $p,q$ について
$$
q\in\overline{I^+(p)}
\Longleftrightarrow q\in J^+(p)
\Longleftrightarrow p\in J^-(q)
\Longleftrightarrow p\in\overline{I^-(q)}.
$$
これは[反映性の定義](#def-lorg11-reflecting)です。

次に未来識別性を示します。$I^+(p)=I^+(q)$ と仮定します。任意の点 $q$ は自身の時間的未来の閉包に属するので
$$
q\in\overline{I^+(q)}
=\overline{I^+(p)}=J^+(p).
$$
同じ理由で $p\in J^+(q)$ です。[LORG9の反対称性とcausalityの同値](../LORG9/index.md#prop-lorg9-causal-equivalence)を使うと $p=q$ です。過去についても未来と過去を交換すれば $I^-(p)=I^-(q)$ から $p=q$ です。以上で両側識別性と反映性が証明されました。$\square$
<!-- proof-end -->

## 6. 一点除去で破れるのは「連続性」ではなく「閉性」

二次元Minkowski時空から原点を除いた
$$
M^\ast=\mathbb R^{1,1}\setminus\{o\},\qquad
o=(0,0),\quad g=-dt^2+dx^2
$$
を考えます。座標時刻 $t$ は依然としてtemporal functionです。それでも、光的線分が唯一の因果曲線だった場合には、その線分の中間点を除くだけで到達不可能になります。

<a id="prop-lorg11-punctured-minkowski"></a>

<!-- formal-statement-start -->
> **命題（一点除去Minkowski時空は因果連続的だが因果単純でない）**  
> 上の $M^\ast$ は因果連続的で安定因果的であるが、因果単純ではない。
<!-- formal-statement-end -->

### 証明の見取り図

時間的に到達できる二点の曲線は少し曲げて除去点を避けられます。したがって $I^\pm$ は元のMinkowski時空の開錐を $M^\ast$ に制限したままです。一方、光的にしか到達できない二点の間の唯一の線分が除去点を通れば、$J^\pm$ の閉性が破れます。

<!-- proof-start -->
### 証明

まず $p\ll_{\mathbb R^{1,1}}q$ とします。Minkowski時空の直線線分 $[p,q]$ は時間的です。線分が $o$ を通らなければ、そのまま $M^\ast$ の時間的曲線です。通る場合には、$o$ のごく小さい近傍で線分を二本の短い時間的線分に置き換え、中間点を少し空間方向へ動かして $o$ を回避します。時間的錐は開なので、この変形を十分小さくすれば両線分は時間的です。逆に $M^\ast$ の時間的曲線は元のMinkowskiでも時間的です。よって
$$
I^\pm_{M^\ast}(p)=I^\pm_{\mathbb R^{1,1}}(p)\cap M^\ast.
$$

右辺の閉包を **$M^\ast$ 内で**取れば、対応するMinkowski閉錐と $M^\ast$ の共通部分になります。従って任意の $p,q\in M^\ast$ に対する反映性は
$$
q\in\overline{I^+_{M^\ast}(p)}
\Longleftrightarrow t_q-t_p\ge|x_q-x_p|
\Longleftrightarrow p\in\overline{I^-_{M^\ast}(q)}
$$
と計算できます。座標時刻 $t$ はtemporal functionであり、[temporal functionから強因果性](../LORG10/index.md#thm-lorg10-temporal-implies-strong)、さらに[強因果性から識別性](../LORG10/index.md#thm-lorg10-strong-implies-distinguishing)が従います。よって反映性と両側識別性を満たし、因果連続的です。[temporal functionから安定因果性](../LORG10/index.md#thm-lorg10-temporal-implies-stable)も従います。

ところが $p=(-1,-1)$ と $q=(1,1)$ は $M^\ast$ に属し、
$$
t_q-t_p=2=|x_q-x_p|
$$
です。元のMinkowski時空で $p$ から $q$ へ進む未来因果曲線 $\gamma=(t,x(t))$ は、区分的 $C^1$ の各片で $|dx/dt|\le1$ を満たし、
$$
2=x(q)-x(p)=\int_{-1}^{1}x'(t)\,dt
\le\int_{-1}^{1}|x'(t)|\,dt\le2
$$
となります。等号成立から $x'(t)=1$ が各滑らかな片で成り立ち、連続性より $x(t)=t$ です。従ってすべての因果曲線は $(0,0)$ を通り、$M^\ast$ では $q\notin J^+(p)$ です。

一方 $q_k=(1,1-1/k)$（$k\ge2$）は
$$
2>2-1/k=|x(q_k)-x(p)|
$$
を満たすので $q_k\in I^+_{M^\ast}(p)\subset J^+_{M^\ast}(p)$ かつ $q_k\to q$ です。従って $J^+_{M^\ast}(p)$ は閉でありません。causalityが保たれていても因果単純性は失敗します。$\square$
<!-- proof-end -->

この反例では、**失ったものは閉因果曲線の不存在ではなく、光的到達関係の極限を実現する曲線**です。時間的曲線の余裕は迂回を許しますが、光的端点の等号条件は迂回の余裕を消します。これをさらに一般化するには、後のLORG14で扱う限界曲線に相当する議論が必要になります。

## 7. 因果階層の位置と次章への接続

本章で証明した部分と既習の結果を合わせると、次の向きになります。
$$
\text{因果単純性}\ \Longrightarrow\
\text{因果連続性}\ \Longrightarrow\
\text{安定因果性}\ \Longrightarrow\
\text{強因果性}.
$$
最初の矢印は[因果単純性からの定理](#thm-lorg11-simple-continuous)、二番目は[体積関数からの時間関数構成](#thm-lorg11-continuity-time)と[LORG10の一般特徴付け](../LORG10/index.md#thm-lorg10-stable-time-equivalence)、三番目は[LORG10の安定因果性の結果](../LORG10/index.md#thm-lorg10-causal-ladder)によります。**反対向きは自動的には成立しません**。少なくとも因果連続性から因果単純性への逆矢印は、前節の一点除去時空が具体的に否定します。

この先、初期値を与える面や因果曲線の極限を論じるには、因果的な到達集合が閉じるだけでなく、曲線が遠方へ逃げないようなコンパクト性の議論も必要になります。LORG12ではachronal集合を定義し、境界面の議論へ進みます。

## 8. 演習

<a id="ex-lorg11-a01"></a>
### LORG11-A01 閉錐と時間的未来の内部
- Level: A

二次元Minkowski時空で $p=(2,-1)$ とする。$I^+(p)$、$\overline{I^+(p)}$、その内部を不等式で表せ。

<!-- solution-start -->
**詳細解答**。未来時間的な変位は $\Delta t>|\Delta x|$ を満たすので
$$
I^+(p)=\{(t,x):t-2>|x+1|\}.
$$
連続関数 $F(t,x)=t-2-|x+1|$ により定まる集合で、$F=0$ の各点は $F>0$ の点で近似できるため
$$
\overline{I^+(p)}=\{(t,x):t-2\ge|x+1|\}.
$$
等号を満たす点は任意の近傍に $F<0$ の点を持つので閉錐の内部に入らず、内部は $F>0$ に戻ります。
<!-- solution-end -->

<a id="ex-lorg11-a02"></a>
### LORG11-A02 反映性の両方向
- Level: A

Minkowski時空で $p=(1,2)$、$q=(4,5)$、$r=(3,6)$ とする。$q,r\in\overline{I^+(p)}$ かを判定し、過去側の閉包条件も確認せよ。

<!-- solution-start -->
**詳細解答**。$q-p=(3,3)$ では $\Delta t=3=|\Delta x|$ なので $q$ は未来閉錐の境界にあります。同時に $p$ は $q$ の過去閉錐の境界です。$r-p=(2,4)$ では $2<4$ なので $r$ は未来閉錐の外側、$p$ も $r$ の過去閉錐の外側です。二組とも定義の左右で真偽が一致します。
<!-- solution-end -->

<a id="ex-lorg11-a03"></a>
### LORG11-A03 因果単純性の三条件
- Level: A

$M=\mathbb R^{1,1}$ に $-dt^2+dx^2$ を入れる。causality、$J^+(p)$ の閉性、$J^-(p)$ の閉性を別々に検証せよ。

<!-- solution-start -->
**詳細解答**。非定数未来因果曲線では $t$ は厳密に増すから閉曲線はありません。また
$$
J^+(p)=\{q:t_q-t_p\ge|x_q-x_p|\},
\quad
J^-(p)=\{q:t_p-t_q\ge|x_q-x_p|\}
$$
はいずれも連続関数の非負集合なので閉です。三条件の確認により[因果単純性の定義](#def-lorg11-causal-simplicity)を満たします。
<!-- solution-end -->

<a id="ex-lorg11-a04"></a>
### LORG11-A04 時刻関数と集合の包含
- Level: A

$p\le q$ のとき $I^+(q)\subset I^+(p)$ と $I^-(p)\subset I^-(q)$ を示せ。ただし $p\le q$ は $q\in J^+(p)$ を意味する。

<!-- solution-start -->
**詳細解答**。$r\in I^+(q)$ なら $q\ll r$ です。$p\le q$ と[LORG7のpush-up補題](../LORG7/index.md#thm-lorg7-push-up)から $p\ll r$ となり $r\in I^+(p)$ です。後者も $s\in I^-(p)$ なら $s\ll p\le q$ として $s\ll q$ を得ます。この段階では真の包含を示していません。真になるには識別性など追加条件が必要です。
<!-- solution-end -->

<a id="ex-lorg11-b01"></a>
### LORG11-B01 外側連続性の背理法
- Level: B

反映的時空で $I^+$ の外側連続性が破れると仮定し、コンパクト集合と部分列を用いて矛盾を導け。

<!-- solution-start -->
**詳細解答**。定義の否定により、ある $p$ とコンパクトな $K\subset M\setminus\overline{I^+(p)}$ があり、$p_k\to p$ に対して $q_k\in K\cap I^+(p_k)$ を取れます。$K$ のコンパクト性で $q_k\to q\in K$ となる部分列を選びます。[反映性と二点関係の極限補題](#lem-lorg11-pair-reflection)を $p_k\ll q_k$ に適用すると $q\in\overline{I^+(p)}$ です。一方 $q\in K$ はその閉包の外側であることを意味し矛盾します。従って外側連続性を得ます。
<!-- solution-end -->

<a id="ex-lorg11-b02"></a>
### LORG11-B02 片側閉性だけでは関係閉性の証明は閉じない
- Level: B

$p_k\le q_k$、$(p_k,q_k)\to(p,q)$ とし、すべての $r$ で $J^+(r)$ が閉じていると仮定する。まず $r\ll p$ なら $r\le q$ を示せ。最後に $p\le q$ を導くための追加の閉性を特定せよ。

<!-- solution-start -->
**詳細解答**。固定した $r\ll p$ について、時間的関係の開性から大きな $k$ で $r\ll p_k$、[push-up補題](../LORG7/index.md#thm-lorg7-push-up)で $r\ll q_k$ です。$q_k\in J^+(r)$ の極限を未来側の閉性に通し、$q\in J^+(r)$ を得ます。よって $r\in J^-(q)$ です。$r_j\ll p$、$r_j\to p$ とすれば $r_j\in J^-(q)$ なので、最後の極限には **$J^-(q)$ の閉性**が必要です。これを追加すれば $p\in J^-(q)$、つまり $p\le q$ となります。
<!-- solution-end -->

<a id="ex-lorg11-b03"></a>
### LORG11-B03 時間関数を体積の差から作る
- Level: B

因果連続的時空の有限で正な滑らか測度 $\mu$ を固定する。$p\le q$、$p\ne q$ なら $\mu(I^+(q))<\mu(I^+(p))$ を示し、$T(p)=\mu(I^-(p))-\mu(I^+(p))$ が時間関数になる理由を述べよ。

<!-- solution-start -->
**詳細解答**。[push-up補題](../LORG7/index.md#thm-lorg7-push-up)で $I^+(q)\subset I^+(p)$ です。[未来識別性](../LORG9/index.md#def-lorg9-distinguishing)と $p\ne q$ から等号はありません。もし差の測度が零なら、$I^+(p)\setminus\overline{I^+(q)}$ に非空開集合は存在できません。存在すれば正な密度からその測度が正になってしまうためです。従って
$$
I^+(p)\subset \operatorname{Int}\overline{I^+(q)}
=I^+(q)
$$
となりますが、これは真の包含に矛盾します。同様に過去側は $\mu(I^-(p))<\mu(I^-(q))$ です。[体積関数の連続性](#lem-lorg11-volume-continuity)から $T$ は連続、差を取れば
$$
T(q)-T(p)
=\mu(I^-(q))-\mu(I^-(p))
+\mu(I^+(p))-\mu(I^+(q))>0.
$$
従って任意の非定数未来因果曲線に沿って厳密増加し、時間関数です。
<!-- solution-end -->

<a id="ex-lorg11-b04"></a>
### LORG11-B04 光的到達の等号と除去点
- Level: B

$M^\ast=\mathbb R^{1,1}\setminus\{(0,0)\}$ で $p=(-a,-a)$、$q=(b,b)$（$a,b>0$）とする。$q\notin J^+_{M^\ast}(p)$ と $q\in\overline{J^+_{M^\ast}(p)}$ を示せ。

<!-- solution-start -->
**詳細解答**。元の時空で因果曲線を時刻でパラメータ化すると $|x'(t)|\le1$ です。端点間で
$$
a+b=x(b)-x(-a)=\int_{-a}^{b}x'(t)\,dt
\le\int_{-a}^{b}|x'(t)|\,dt\le a+b.
$$
等号成立から各滑らかな片で $x'(t)=1$、従って $x(t)=t$ です。この曲線は $(0,0)$ を通るので $M^\ast$ では到達できません。他方 $q_k=(b,b-1/k)$ を十分大きい $k$ で取ると
$$
(b-(-a))>|(b-1/k)-(-a)|
$$
であり、時間的経路は除去点を迂回できます。ゆえに $q_k\in I^+_{M^\ast}(p)\subset J^+_{M^\ast}(p)$ かつ $q_k\to q$ です。
<!-- solution-end -->

<a id="ex-lorg11-c01"></a>
### LORG11-C01 閉性、反映性、時間関数を接続する
- Level: C

滑らかな時間向き付きLorentz多様体 $(M,g)$ がcausalで、任意の $p$ で $J^\pm(p)$ が閉じているとする。(1) 反映性、(2) 両側識別性、(3) 因果連続性、(4) 連続時間関数の存在を順に示し、各段階で必要な仮定を述べよ。最後に一点除去Minkowski時空がどの逆含意を否定するか説明せよ。

<!-- solution-start -->
**詳細解答**。

(1) [時間的集合の閉包補題](#lem-lorg11-regular-open)と仮定から $\overline{I^\pm(p)}=J^\pm(p)$ です。従って
$$
q\in\overline{I^+(p)}
\iff q\in J^+(p)
\iff p\in J^-(q)
\iff p\in\overline{I^-(q)}.
$$
ここでは両側の $J$ の閉性を使います。

(2) $I^+(p)=I^+(q)$ と仮定すれば $q\in\overline{I^+(q)}=\overline{I^+(p)}=J^+(p)$、また $p\in J^+(q)$ です。[causalityと反対称性の同値](../LORG9/index.md#prop-lorg9-causal-equivalence)から $p=q$ です。過去も同じです。**causality** はこの段階で使います。

(3) (1) の反映性と (2) の両側識別性を[因果連続性の定義](#def-lorg11-causal-continuity)に代入すれば従います。

(4) 反映性は[外側連続性の定理](#thm-lorg11-reflecting-outer)を通じて[体積関数の連続性](#lem-lorg11-volume-continuity)を与えます。識別性は $p<q$ のとき $I^+(q)\subsetneq I^+(p)$、$I^-(p)\subsetneq I^-(q)$ を与え、[体積差の定理](#thm-lorg11-continuity-time)から $T=\mu(I^-)-\mu(I^+)$ が連続で厳密増加する時間関数です。

一点除去Minkowski時空では反映性・識別性が成立し、時間関数も存在しますが、光的対 $p=(-1,-1)$、$q=(1,1)$ の間の唯一の因果線分が除去点を通ります。$q\in\overline{J^+(p)}\setminus J^+(p)$ なので、**因果連続性から因果単純性への逆含意**は不成立です。閉曲線の問題ではなく到達曲線の極限の問題であることにも注意します。
<!-- solution-end -->

## 参考文献

- E. Minguzzi, [Lorentzian causality theory](https://link.springer.com/article/10.1007/s41114-019-0019-x), *Living Reviews in Relativity* **22** (2019). 因果階層、reflectivity、causal continuity、causal simplicity の一般理論。
- M. Sánchez, [Causal hierarchy of spacetimes, temporal functions and smoothness of Geroch's splitting](https://arxiv.org/abs/gr-qc/0411143). 外側連続性・体積関数・時間関数の構成についての照合先。
