# CATB6-08 依存型の圏論的意味

## 1. 変数の値によって型が変わる

前講まで、文脈の上で命題を部分対象として解釈し、置換と量化を扱ってきた。今回は命題の真偽だけでなく、選べる値の集合自体が変数によって変わる場合を扱う。例えば、道路の種類によって許される速度の集合が違うとする。道路を表す変数を選んだ後で、その道路で使える速度を選ぶ。この順序を一つの直積で表すと、許されない組まで含めてしまう。

[集合族のファイブレーション](../CATB4-01/index.md#thm-catb4-01-families) は添字ごとに異なる集合を扱う道具だった。添字を文脈、集合族を型と読めば、この問題を解ける。以下では固定した集合の宇宙内で集合族を扱い、最後に一般の圏で何が必要かを整理する。

## 2. 文脈・型・項

文脈とは既に選んだ変数の値の組が走る対象である。型は各値の組に対して次に選べる値を指定する。項はその選択を全ての文脈の値に対して実際に行う。

<a id="def-catb6-08-family-types"></a>

<!-- formal-statement-start -->
> **定義（集合族による依存型と項）**
>
> 集合 $\Gamma$ を文脈とし、各 $\gamma\in\Gamma$ に集合 $A_\gamma$ を対応させた族を $\Gamma$ 上の依存型 $A$ とする。記号 $\Gamma\vdash A\ \mathrm{type}$ で表す。
>
> 項 $\Gamma\vdash a:A$ は、各 $\gamma\in\Gamma$ に元 $a_\gamma\in A_\gamma$ を指定する族である。
>
> 文脈拡張 $\Gamma.A$ とその射影 $p_A$ は次で与える。

$$
\Gamma.A=\{(\gamma,x)\mid \gamma\in\Gamma,\ x\in A_\gamma\},
\qquad p_A(\gamma,x)=\gamma.
$$

> 空文脈の解釈には一元集合を使う。文脈間の置換は集合間の写像 $\sigma:\Delta\to\Gamma$ で表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-08-family-types -->
**定義の確認**。$\Gamma=\{r,s\}$ とし、$A_r=\{20,40\}$、$A_s=\{10\}$ とする。

$$
\Gamma.A=\{(r,20),(r,40),(s,10)\}.
$$

射影は最初の二元を $r$ に、最後の元を $s$ に送る。$a_r=40$、$a_s=10$ はそれぞれ指定された集合の元だから項である。一方、$a_r=10$ は型を満たさない。どちらの値を取ってもよい一つの集合を使うと、この違いが消えてしまう。

空文脈 $\{*\}$ 上の型は集合一つ、項はその集合の元一つに対応する。空文脈と空集合の文脈は異なり、後者の上では空の項の族が一意に存在する。
<!-- definition-example-end -->

一般の圏で項を表すため、射 $p:X\to\Gamma$ に対する切断とは $s:\Gamma\to X$ で $ps=1_\Gamma$ を満たすものとする。集合族の項 $a$ は切断 $s_a(\gamma)=(\gamma,a_\gamma)$ を与える。逆に切断の値の第一成分は $\gamma$ でなければならないので第二成分を取り出せば項になる。二つの操作は互いに逆である。

## 3. 置換は引き戻しで表す

例えば道路を地図上の地点から指定する写像 $\sigma:\Delta\to\Gamma$ があれば、地点ごとに利用できる速度の集合が決まる。型と項を一緒に移すには次の規則を使う。

<a id="thm-catb6-08-substitution"></a>

<!-- formal-statement-start -->
> **定理（集合族の置換と文脈拡張）**
>
> 集合の文脈 $\Gamma$ 上の型 $A$、その項 $a$、置換 $\sigma:\Delta\to\Gamma$ を取る。置換後の型と項は

$$
(A[\sigma])_\delta=A_{\sigma(\delta)},
\qquad (a[\sigma])_\delta=a_{\sigma(\delta)}
$$

> である。写像

$$
\sigma^+:\Delta.A[\sigma]\to\Gamma.A,\qquad
(\delta,x)\mapsto(\sigma(\delta),x)
$$

> と二つの射影は引き戻しをなす。さらに任意の $\tau:\Theta\to\Delta$ について

$$
A[1_\Gamma]=A,\quad A[\sigma][\tau]=A[\sigma\tau]
$$

> が成立し、項についても同じ置換律が成り立つ。
<!-- formal-statement-end -->

見取り図：置換は添字を読み替える操作である。拡張した文脈の元には古い文脈の値だけでなく新しい値もあるので、後者を変えずに送る。これが引き戻しの普遍性を満たす。

<!-- proof-start -->
### 証明

各 $\delta$ で項の値は $A_{\sigma(\delta)}$ に属するので置換後も型が合う。二つの射影の可換性は

$$
p_A\sigma^+(\delta,x)=\sigma(\delta)
=\sigma p_{A[\sigma]}(\delta,x)
$$

で確認できる。

[引き戻しの定義](../../CAT/CAT2-03/index.md#def-cat2-03-pullback) に従い、集合 $T$ と写像 $h:T\to\Delta$、$k:T\to\Gamma.A$ が $p_Ak=\sigma h$ を満たすとする。各 $t$ について $k(t)=(\sigma(h(t)),x_t)$ と書ける。第二成分は $x_t\in A_{\sigma(h(t))}$ である。

そこで $m(t)=(h(t),x_t)$ と定めると、これは $\Delta.A[\sigma]$ の元であり、

$$
p_{A[\sigma]}m=h,\qquad \sigma^+m=k
$$

を満たす。第一の式は $m$ の第一成分、第二の式は第二成分を固定するので、別の候補は存在しない。よって引き戻しである。

置換の合成は各 $\theta\in\Theta$ で確認できる。

$$
(A[\sigma][\tau])_\theta
=(A[\sigma])_{\tau(\theta)}
=A_{\sigma(\tau(\theta))}
=(A[\sigma\tau])_\theta.
$$

項についても同じ計算を $a$ に適用する。恒等置換は各成分をそのまま返す。したがって二つの置換律は族の等号として成り立つ。
<!-- proof-end -->

例えば $\Delta=\{u,v,w\}$ とし $\sigma(u)=\sigma(w)=r$、$\sigma(v)=s$ とすると、置換された拡張の元は

$$
(u,20),(u,40),(v,10),(w,20),(w,40)
$$

である。$\sigma^+$ は最初と四番目を $(r,20)$ に送るが、置換後の文脈では別の元である。

## 4. 一般の圏で型を射に対応させる

集合でなくても文脈を対象、置換を射とし、文脈ごとの型を圏にまとめられる。[ファイブレーション](../CATB4-01/index.md#def-catb4-01-fibration) は置換ごとの型の持ち上げを保証する。しかし、それだけでは型から拡張文脈を取り出す方法は指定されていない。

基底圏 $\mathcal C$ の射を対象、可換四角形を射とする圏を $\mathcal C^\to$ とする。この圏と終域関手は [終域関手と引き戻し](../CATB4-01/index.md#thm-catb4-01-codomain) で扱った。型をこの圏の対象に対応させれば、型の射が文脈拡張の間の可換四角形になる。

<a id="def-catb6-08-comprehension"></a>

<!-- formal-statement-start -->
> **定義（理解圏）**
>
> 引き戻しを持つ局所小圏 $\mathcal C$ とファイブレーション $p:\mathcal E\to\mathcal C$ を取る。関手 $\chi:\mathcal E\to\mathcal C^\to$ が次を満たすとき、この組を理解圏（comprehension category）とする。
>
> 1. $\operatorname{cod}\chi=p$ が成立する。
> 2. $\chi$ は $p$ に関するCartesian射を引き戻し四角形に送る。
>
> ここで $p(A)=\Gamma$ である型 $A$ の像を、射 $p_A:\Gamma.A\to\Gamma$ と書く。$\Gamma.A$ は文脈拡張であり、項の解釈は $p_A$ の切断である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-08-comprehension -->
**定義の確認**。基底を集合の圏、全圏を [集合族のファイブレーション](../CATB4-01/index.md#thm-catb4-01-families) の全圏とする。$\chi$ は族 $A$ をその射影 $p_A$ に送る。

基底写像 $\sigma:\Delta\to\Gamma$ 上の族の射を、成分写像 $\phi_\delta:B_\delta\to A_{\sigma(\delta)}$ で表す。その像は上辺の写像

$$
\Delta.B\to\Gamma.A,\qquad
(\delta,y)\mapsto(\sigma(\delta),\phi_\delta(y))
$$

と下辺の $\sigma$ からなる四角形である。両経路とも $(\delta,y)$ を $\sigma(\delta)$ に送るので可換である。終域は $\Gamma$ であり、条件1が成立する。

恒等射では上辺は恒等写像となる。もう一つの族の射 $(\tau,\psi)$ を前から合成すると上辺の値は

$$
(\theta,z)\mapsto
(\sigma(\tau(\theta)),\phi_{\tau(\theta)}(\psi_\theta(z))).
$$

これは合成された族の射の像に等しいので $\chi$ は関手である。

[集合族のCartesian射の判定](../CATB4-01/index.md#thm-catb4-01-families) より、Cartesian射では全ての $\phi_\delta$ が全単射である。そこで引き戻しの任意の入力 $h:T\to\Delta$ と $k(t)=(\sigma(h(t)),x_t)$ に対して

$$
m(t)=(h(t),\phi_{h(t)}^{-1}(x_t))
$$

を取る。射影と上辺との合成はそれぞれ $h,k$ になる。第一成分が $h(t)$ に固定され、第二成分が全単射で一意に決まるので唯一の媒介射である。よって条件2も成立する。
<!-- definition-example-end -->

この例では $\chi$ は充満忠実である。可換四角形の上辺は、射影との可換性によって必ず $(\delta,y)\mapsto(\sigma(\delta),z)$ の形を持つ。その第二成分 $z$ が一意の成分写像 $\phi_\delta$ を定めるからである。理解圏の定義そのものには充満忠実性を要求していない。これを要求する場合を充満な理解圏という。

一般の理解圏では型を移すCartesian持ち上げを選ぶ。移された項は引き戻しの普遍性を使って得る。具体的に $s:\Gamma\to\Gamma.A$ が切断なら、$\sigma$ と $s\sigma$ は

$$
p_A s\sigma=\sigma
$$

を満たすので、引き戻し四角形に対する唯一の媒介射 $\Delta\to\Delta.A[\sigma]$ がある。第一射影との合成が $1_\Delta$ だから切断である。持ち上げを任意に選ぶ場合、合成置換との整合は一般に標準同型を通じて成立する。集合族では添字を直接読み替える選択をしているので前節の厳密な等式が得られる。

## 5. 依存和と依存積

道路ごとに利用できる速度を選び、その速度ごとに使用できる走行モードを選ぶとする。二つの選択をまとめた型と、全ての速度に対して走行モードを返す関数の型を作りたい。前者は対、後者は関数であり、論理の存在量化と全称量化に似ているが、証人や関数そのものを保持する。

<a id="def-catb6-08-dependent-sum-product"></a>

<!-- formal-statement-start -->
> **定義（依存和と依存積）**
>
> 集合の文脈 $\Gamma$ 上の型 $A$ と、拡張文脈 $\Gamma.A$ 上の型 $B$ を取る。$\Gamma$ 上の依存和（$\Sigma$型）および依存積（$\Pi$型）を次で定める。

$$
(\Sigma_A B)_\gamma
=\{(x,y)\mid x\in A_\gamma,\ y\in B_{(\gamma,x)}\},
$$

$$
(\Pi_A B)_\gamma
=\prod_{x\in A_\gamma} B_{(\gamma,x)}.
$$

> 右辺の積の元は、各 $x\in A_\gamma$ に値 $y_x\in B_{(\gamma,x)}$ を割り当てる関数である。空の和は空集合、空の積は空関数一つからなる集合とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-catb6-08-dependent-sum-product -->
**定義の確認**。文脈を $\Gamma=\{r,s,t\}$ とし、$A_r=\{0,1\}$、$A_s=\{0\}$、$A_t=\varnothing$ とする。$B_{(r,0)}=\{a,b\}$、$B_{(r,1)}=\{c\}$、$B_{(s,0)}=\varnothing$ とする。

$$
\begin{aligned}
(\Sigma_A B)_r&=\{(0,a),(0,b),(1,c)\},\\
(\Sigma_A B)_s&=(\Sigma_A B)_t=\varnothing.
\end{aligned}
$$

積については $r$ の場合、添字0と1でそれぞれ一つずつ選ぶので

$$
(\Pi_A B)_r=\{(a,c),(b,c)\}.
$$

ここで組は添字の順序 $0,1$ で書いている。$s$ では唯一の添字0に値を選べないので $(\Pi_A B)_s=\varnothing$ である。$t$ では添字がないので $(\Pi_A B)_t=\{()\}$ となる。選ぶ先が空である場合と選ぶ必要のある添字がない場合を区別する。
<!-- definition-example-end -->

### 項の作り方と取り出し方

文脈 $\Gamma$ で $a:A$ があり、各 $\gamma$ に対し $b_\gamma\in B_{(\gamma,a_\gamma)}$ が指定されていれば、$(a_\gamma,b_\gamma)$ は依存和の項である。逆に依存和の項 $c_\gamma=(x_\gamma,y_\gamma)$ から第一成分 $x_\gamma\in A_\gamma$ を得ると、第二成分は $B_{(\gamma,x_\gamma)}$ の元である。第二成分の型は第一成分に依存する。

拡張文脈上の項 $b$ は、全ての $(\gamma,x)$ で値 $b_{(\gamma,x)}$ を持つ。そこで $\lambda b$ を

$$
(\lambda b)_\gamma(x)=b_{(\gamma,x)}
$$

と定めれば依存積の項となる。逆に依存積の項 $f$ から、拡張文脈上の項を $b_{(\gamma,x)}=f_\gamma(x)$ として得る。特に $a:A$ があれば $f_\gamma(a_\gamma)$ は $B_{(\gamma,a_\gamma)}$ の元である。関数を作って適用すれば元の値が戻り、適用で得た全値から関数を作れば元の関数が戻る。

### 随伴として読む

$\Gamma$ 上の集合族の圏を $\mathcal F_\Gamma$ とする。射は同一添字上の成分写像の族である。[集合族の再添字付けの両随伴](../CATB4-06/index.md#thm-catb4-06-family-adjoints) を射影 $p_A:\Gamma.A\to\Gamma$ に適用する。$\gamma$ の逆像は $\{(\gamma,x)\mid x\in A_\gamma\}$ であるから、左随伴の非交和の添字 $(\gamma,x)$ を $x$ に読み替えると依存和、右随伴の積の添字を $x$ に読み替えると依存積になる。

$$
\Sigma_A\dashv p_A^*\dashv\Pi_A.
$$

左の全単射は、$g:\Sigma_A B\to C$ から $h:B\to p_A^*C$ を

$$
h_{(\gamma,x)}(y)=g_\gamma(x,y)
$$

で作り、逆に同じ式の右辺を左辺から定める。右の全単射は $k:p_A^*C\to B$ から $\ell:C\to\Pi_A B$ を

$$
\ell_\gamma(c)(x)=k_{(\gamma,x)}(c)
$$

で作り、逆に評価で $k$ を戻す。自然性は引用した随伴定理で保証される。特に $C$ が各成分一元集合の族なら、右の全単射は直前の関数抽象と評価に一致する。

一般の理解圏で同じ解釈を行うには、型の射影 $p_A$ に沿う再添字付けがこれらの随伴を持つことが追加条件となる。また依存和を二段の文脈拡張そのものと同一視するには、その表示射が合成 $p_Ap_B$ と文脈上で同型になるという整合条件も必要になる。集合族では $((\gamma,x),y)\leftrightarrow(\gamma,(x,y))$ がその同型である。随伴の存在だけから一般の型理論の全ての規則が従うわけではない。

## 6. 置換しても型の構成が変わらない条件

依存和や依存積を先に作って置換する場合と、型を置換してから依存和や依存積を作る場合を比べる。命題の場合には [全称量化のBeck–Chevalley等式](../CATB6-03/index.md#thm-catb6-03-universal-beck-chevalley) がこの整合性を表していた。今回は部分対象の包含ではなく、値を持つ集合族の同型を確認する。

<a id="thm-catb6-08-type-beck-chevalley"></a>

<!-- formal-statement-start -->
> **定理（集合族の依存和・依存積のBeck–Chevalley同型）**
>
> 集合の文脈 $\Gamma$ 上の型 $A$、$\Gamma.A$ 上の型 $B$、置換 $\sigma:\Delta\to\Gamma$ を取る。$A'=A[\sigma]$、$\sigma^+:\Delta.A'\to\Gamma.A$ を第3節の写像とし、$B'=B[\sigma^+]$ とする。このとき集合族の自然な同型

$$
(\Sigma_A B)[\sigma]\cong\Sigma_{A'}B',
\qquad
(\Pi_A B)[\sigma]\cong\Pi_{A'}B'
$$

> が存在する。
<!-- formal-statement-end -->

見取り図：先に置換すると、元の添字 $(\gamma,x)$ の $\gamma$ だけが $\sigma(\delta)$ に変わる。和の対と積の関数の中身はどちらの経路でも同じになる。

<!-- proof-start -->
### 証明

[集合族の置換と文脈拡張](#thm-catb6-08-substitution) により、$A'_\delta=A_{\sigma(\delta)}$ である。また

$$
B'_{(\delta,x)}
=B_{\sigma^+(\delta,x)}
=B_{(\sigma(\delta),x)}.
$$

[依存和と依存積の定義](#def-catb6-08-dependent-sum-product) にこの二式を代入する。和について左側の成分は

$$
((\Sigma_A B)[\sigma])_\delta
=\{(x,y)\mid x\in A_{\sigma(\delta)},\
y\in B_{(\sigma(\delta),x)}\}.
$$

右側の成分も

$$
\begin{aligned}
(\Sigma_{A'}B')_\delta
&=\{(x,y)\mid x\in A'_\delta,\ y\in B'_{(\delta,x)}\}\\
&=\{(x,y)\mid x\in A_{\sigma(\delta)},\
y\in B_{(\sigma(\delta),x)}\}.
\end{aligned}
$$

従って成分の対応 $(x,y)\mapsto(x,y)$ とその逆が得られる。積についても

$$
\begin{aligned}
(\Pi_{A'}B')_\delta
&=\prod_{x\in A'_\delta} B'_{(\delta,x)}\\
&=\prod_{x\in A_{\sigma(\delta)}} B_{(\sigma(\delta),x)}\\
&=((\Pi_A B)[\sigma])_\delta.
\end{aligned}
$$

関数の全ての成分をそのまま移す写像とその逆が得られる。$B\to D$ の成分写像を $v_{(\gamma,x)}$ とすると、和の二経路はともに $(x,y)\mapsto(x,v_{(\sigma(\delta),x)}(y))$ となる。積の二経路はともに各 $x$ で $v_{(\sigma(\delta),x)}(y_x)$ を返す。よって $B$ について自然である。空の添字でもこの対応は成立する。

今回の集合族の表示では成分を同じ集合として構成しているため、同型を等号で実現できる。別の引き戻しの表示を選ぶ場合は添字の標準全単射を通じた同型になる。
<!-- proof-end -->

一般の理解圏でも、Cartesian持ち上げから生じる引き戻し四角形を考える。$q=p_{A'}$、$p=p_A$、$v=\sigma^+$ と書けば $pv=\sigma q$ であり、再添字付けの比較 $v^*p^*\cong q^*\sigma^*$ が得られる。随伴を選んでいるとき、左随伴については単位 $B\to p^*\Sigma_p B$ を $v^*$ で移して

$$
v^*B\to v^*p^*\Sigma_p B
\cong q^*\sigma^*\Sigma_p B
$$

とし、$\Sigma_q\dashv q^*$ で転置すれば $\Sigma_qv^*B\to\sigma^*\Sigma_p B$ を得る。右随伴については余単位 $p^*\Pi_p B\to B$ を移して

$$
q^*\sigma^*\Pi_p B\cong v^*p^*\Pi_p B\to v^*B
$$

とし、$q^*\dashv\Pi_q$ で転置すれば $\sigma^*\Pi_p B\to\Pi_qv^*B$ を得る。これらの比較が同型であるという要請が、型に対するBeck–Chevalley条件である。集合族では上の定理の対と関数の対応がこれらの転置に一致する。実際、和の単位は $y\mapsto(x,y)$、積の余単位は関数の $x$ での評価である。

四角形が単に可換なだけでは足りない。$\Gamma=\Delta=\{*\}$、$p:\{0,1\}\to\Gamma$、$q:\{0\}\to\Delta$ とし、$\sigma$ は恒等写像、$v:\{0\}\to\{0,1\}$ は包含とする。可換だが、$1$ が欠けているので引き戻しではない。$B_0=B_1=\{*\}$ なら、和の比較は一元集合から二元集合への写像であり全射でない。$B_0=\{*\}$、$B_1=\{a,b\}$ なら積の比較は二元集合から一元集合への写像であり単射でない。失われた添字が和の証人と積の関数の情報を失わせる。

命題を各ファイバーが空か一元集合の型として見る場合、積の非空性は全ての添字で真であることに一致する。和は証人の添字を保持するので複数の元を持ち得る。その射影の像が存在命題の部分対象になる。これが量化と依存型の違いである。

ここまでの意味論は文脈・置換・依存和・依存積を扱う。型の間の同一視を別の型として扱う理論や高次の同一視はここでは導入しない。

## 7. 演習

### CATB6-08-A01 文脈拡張と項

- Level: A

$\Gamma=\{u,v\}$、$A_u=\{1,2\}$、$A_v=\{3\}$ とする。拡張文脈と全ての項を列挙し、各項が与える切断を確認せよ。

<!-- solution-start -->
拡張文脈は [集合族による依存型と項](#def-catb6-08-family-types) の定義から

$$
\Gamma.A=\{(u,1),(u,2),(v,3)\}.
$$

項は $u$ の成分を1または2、$v$ の成分を3とする二通りである。対応する切断は

$$
s_1:u\mapsto(u,1),\ v\mapsto(v,3),
\qquad s_2:u\mapsto(u,2),\ v\mapsto(v,3).
$$

どちらも射影との合成は $u\mapsto u,\ v\mapsto v$ なので切断である。逆に切断は第一成分を固定されるのでこの二つしかない。
<!-- solution-end -->

### CATB6-08-A02 置換された型と項

- Level: A

$\Gamma,A$ をA01と同じとし、$\Delta=\{d,e,f\}$、$\sigma(d)=\sigma(f)=u$、$\sigma(e)=v$ とする。$a_u=2,a_v=3$ を置換し、拡張文脈の写像 $\sigma^+$ を全ての元で求めよ。

<!-- solution-start -->
[集合族の置換と文脈拡張](#thm-catb6-08-substitution) に代入すると

$$
A[\sigma]_d=A[\sigma]_f=\{1,2\},\qquad
A[\sigma]_e=\{3\}.
$$

項の成分は $d,f$ で2、$e$ で3である。拡張文脈の五つの元の像は次の通り。

| 元 | 像 |
|---|---|
| $(d,1)$ | $(u,1)$ |
| $(d,2)$ | $(u,2)$ |
| $(e,3)$ | $(v,3)$ |
| $(f,1)$ | $(u,1)$ |
| $(f,2)$ | $(u,2)$ |

いずれも第二成分を保つ。例えば $(f,2)$ の射影は $f$、さらに $\sigma$ で $u$ になり、上辺の像の射影も $u$ である。他の四元も表から同じ可換性を確認できる。
<!-- solution-end -->

### CATB6-08-A03 空のファイバー

- Level: A

文脈を一点とする。型 $A$ が空の場合と、$A=\{0\}$ で $B_0=\varnothing$ の場合について、依存和と依存積を求めよ。

<!-- solution-start -->
[依存和と依存積の定義](#def-catb6-08-dependent-sum-product) を使う。前者では対の第一成分が存在しないので和は空集合である。積は空集合を定義域とする空関数のみを持つため一元集合である。

後者では第一成分0はあるが第二成分がないので和は空集合である。積の関数には0での値が必要だが $B_0$ は空なので積も空集合である。従って二場合の結果は順に $(\varnothing,\{()\})$ と $(\varnothing,\varnothing)$ である。
<!-- solution-end -->

### CATB6-08-A04 関数抽象と適用

- Level: A

文脈を一点、$A=\{1,2\}$、$B_1=\{a,b\}$、$B_2=\{c,d\}$ とする。拡張文脈での項 $b_1=b,b_2=c$ を依存積の項に変換し、$A$ の各元に適用せよ。逆変換も確認せよ。

<!-- solution-start -->
[依存和と依存積](#def-catb6-08-dependent-sum-product) の積の元として、関数 $f$ を

$$
f(1)=b,\qquad f(2)=c
$$

で定める。値 $b$ は $B_1$ に、$c$ は $B_2$ に属する。したがって積の元 $(b,c)$ である。評価で得る値は1で $b$、2で $c$ だから出発点の項に戻る。逆に評価値から関数を組み立てれば定義域の二元で元の $f$ と一致する。
<!-- solution-end -->

### CATB6-08-B01 理解圏の四角形の判定

- Level: B

一点文脈上の集合族の射 $B\to A$ が $B=\{0,1\}$、$A=\{*\}$ の唯一の写像である。対応する拡張文脈の四角形が引き戻しではないことを、媒介射の一意性が壊れることから示せ。

<!-- solution-start -->
基底写像は一点集合上の恒等写像であり、上辺は二元集合から一元集合への写像である。[引き戻しの定義](../../CAT/CAT2-03/index.md#def-cat2-03-pullback) における入力 $T$ を一点とし、$T$ から基底と右上の拡張文脈への写像をそれぞれ唯一の写像にする。両者の右下への合成は一致する。

左上の拡張文脈への媒介射として、唯一の元を $(*,0)$ に送るものと $(*,1)$ に送るものがある。どちらも下辺への射影と上辺への合成が指定した写像に一致する。しかし二写像は異なる。従って引き戻しの一意性が成立しない。[理解圏](#def-catb6-08-comprehension) が引き戻しへ送るのは全ての射ではなくCartesian射であることが分かる。
<!-- solution-end -->

### CATB6-08-B02 随伴の転置を具体的に作る

- Level: B

文脈を一点、$A=\{0,1\}$、$B_0=\{a,b\}$、$B_1=\{c\}$、$C=\{r,s\}$ とする。$h_0(a)=r,h_0(b)=s,h_1(c)=s$ という $B\to p_A^*C$ の射を依存和からの射に転置せよ。また $k_0(r)=a,k_0(s)=b,k_1(r)=k_1(s)=c$ という $p_A^*C\to B$ の射を依存積への射に転置せよ。

<!-- solution-start -->
[集合族の再添字付けの両随伴](../CATB4-06/index.md#thm-catb4-06-family-adjoints) によれば和側では $g(x,y)=h_x(y)$ で転置する。よって

$$
g(0,a)=r,\quad g(0,b)=s,\quad g(1,c)=s.
$$

これで和の三元の像を全て指定した。逆転置で各 $x$ の値を取り出せば元の $h_0,h_1$ になる。

積側では $\ell(z)(x)=k_x(z)$ で転置するので

$$
\ell(r)=(a,c),\qquad \ell(s)=(b,c).
$$

二つの組はともに $B_0\times B_1$ に属する。第一成分と第二成分を取り出すとそれぞれ元の $k_0,k_1$ の四つの値が戻る。
<!-- solution-end -->

### CATB6-08-B03 引き戻しでない四角形と比較射

- Level: B

一点集合への写像 $p:\{0\}\to\{*\}$、$q:\{0,1\}\to\{*\}$ と恒等置換を取る。$v:\{0,1\}\to\{0\}$ は定値とする。$B_0=\{a,b\}$ のとき和と積の比較射が同型か調べよ。

<!-- solution-start -->
可換四角形ではあるが、$q$ の二つの元は $v$ で同じ元になるので引き戻しではない。実際、恒等置換に沿う $p$ の引き戻しには元が一つしかない。

$v^*B$ は二成分とも $\{a,b\}$ である。[依存和と依存積](#def-catb6-08-dependent-sum-product) から和の比較の始域は

$$
\{(0,a),(0,b),(1,a),(1,b)\}
$$

で、終域は $\{(0,a),(0,b)\}$ である。比較は $(i,y)\mapsto(0,y)$ となり、例えば $(0,a),(1,a)$ が同じ元に移るため単射ではない。

積の比較は元の一成分の選択 $y$ を二成分に複製する写像 $y\mapsto(y,y)$ である。終域は $\{(a,a),(a,b),(b,a),(b,b)\}$ だが、$(a,b)$ は像に入らない。よって全射でない。両方の比較が同型でない理由は、同一の元の添字を二つに複製したためである。
<!-- solution-end -->

### CATB6-08-B04 依存和と存在命題

- Level: B

一点文脈で $A=\{0,1,2\}$、$B_0=B_2=\{*\}$、$B_1=\varnothing$ とする。依存和、依存積、および和から一点への射の像を求めよ。存在命題との違いを説明せよ。

<!-- solution-start -->
[依存和と依存積](#def-catb6-08-dependent-sum-product) の定義に代入する。

$$
\Sigma_A B=\{(0,*),(2,*)\},\qquad
\Pi_A B=\varnothing.
$$

積は添字1で値を選べないので元を持たない。和は二つの異なる証人を保持している。和から一点への射は両元をその一点に送るため像は一点集合全体である。従って存在命題は真だが、その真理値には証人が0か2かという情報はない。一方、依存和の元はその情報を持っている。
<!-- solution-end -->

### CATB6-08-C01 文脈拡張・置換・依存型を接続する

- Level: C

$\Gamma=\{r,s\}$、$A_r=\{0,1\}$、$A_s=\varnothing$ とする。$B_{(r,0)}=\{a\}$、$B_{(r,1)}=\{b,c\}$ とし、$\Delta=\{u,v,w\}$、$\sigma(u)=\sigma(w)=r,\sigma(v)=s$ とする。

1. 置換した型と拡張文脈、さらに $B[\sigma^+]$ を求めよ。
2. 依存和と依存積について、先に構成して置換する経路と先に置換して構成する経路を比較せよ。
3. 置換後の依存積の項を全て列挙し、元の依存積の項の置換だけで全てが得られるか判定せよ。

<!-- solution-start -->
第1問。[集合族の置換と文脈拡張](#thm-catb6-08-substitution) により

$$
A'_u=A'_w=\{0,1\},\qquad A'_v=\varnothing.
$$

よって

$$
\Delta.A'=\{(u,0),(u,1),(w,0),(w,1)\}.
$$

$\sigma^+$ は $u,w$ を $r$ に移し第二成分を保つから、$B'_{(u,0)}=B'_{(w,0)}=\{a\}$、$B'_{(u,1)}=B'_{(w,1)}=\{b,c\}$ である。$v$ に属する拡張文脈の元はない。

第2問。[依存和と依存積](#def-catb6-08-dependent-sum-product) より元の族は

$$
\begin{aligned}
(\Sigma_A B)_r&=\{(0,a),(1,b),(1,c)\},\\
(\Sigma_A B)_s&=\varnothing,\\
(\Pi_A B)_r&=\{(a,b),(a,c)\},\\
(\Pi_A B)_s&=\{()\}.
\end{aligned}
$$

これを置換すると $u,w$ が $r$ の成分、$v$ が $s$ の成分を持つ。別経路では第1問の $B'$ から $u,w$ で三つの対および二つの関数を得る。$v$ で和は空、積は空関数一つとなる。従って両経路の成分は一致する。これは [集合族の依存和・依存積のBeck–Chevalley同型](#thm-catb6-08-type-beck-chevalley) の具体例である。

第3問。$P=(a,b)$、$Q=(a,c)$ と略記する。$u,v,w$ の順で項を書くと、置換後の積の項は

$$
(P,(),P),\quad(P,(),Q),\quad
(Q,(),P),\quad(Q,(),Q)
$$

の四つである。元の文脈上では $(P,())$ と $(Q,())$ の二項しかない。それぞれを置換すると第一と第四の項になり、第二と第三は得られない。元の項では $u,w$ に対応する成分がともに $r$ の値に固定されるからである。

型を作る操作と置換が可換であっても、置換された文脈上の全ての項が元の項から来るとは限らない。
<!-- solution-end -->

## 8. まとめ

文脈の上の型を集合族として読むと、項は各成分の選択、文脈拡張は添字付きの対、置換は添字の読み替えになる。理解圏はこの構造を一般の圏で射影と引き戻しを用いて表す。依存和は二段の選択を対にまとめ、依存積は各入力に対する出力の関数を作る。随伴によってこれらの普遍性が与えられ、Beck–Chevalley条件によって置換との整合が保証される。
