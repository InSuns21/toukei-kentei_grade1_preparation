# CAT3-05 Beckのモナド性定理

## 1. 忘れた構造を、どの条件で取り戻せるか

モナド $(T,\eta,\mu)$ から作る[Eilenberg–Moore圏](../CAT3-03/index.md#def-cat3-03-em)は、単なる対象だけでなく「演算を評価する規則」を記録する。一方、随伴 $L:\mathcal C\rightleftarrows\mathcal D:R$ から得る[比較関手](../CAT3-03/index.md#def-cat3-03-comparison)

$$
K:\mathcal D\longrightarrow\mathcal C^T,
\qquad T=RL,
\qquad KD=(RD,R\varepsilon_D)
$$

は、$\mathcal D$ の構造を代数として符号化する。$K$ が圏の同値なら、元の構造はモナド代数から**同型を除いて復元**できる。

しかし、[比較関手の充満忠実性の判定](../CAT3-04/index.md#thm-cat3-04-full-faithfulness)だけでは、すべての代数が $KD$ に同型であるとは分からない。そこで次の二つの問いを分ける。

1. 代数射を元の射へ戻せるか（充満忠実性）。
2. 任意の代数 $(A,a)$ を元の対象から得られるか（本質的全射性）。

後者の鍵は、[自由代数・忘却随伴](../CAT3-03/index.md#thm-cat3-03-free-adjunction)に現れる標準平行二射

$$
T^2A\ \substack{\xrightarrow{\ \mu_A\ }\\[-2pt]\xrightarrow[\ Ta\ ]{}}\ TA\xrightarrow{\ a\ }A
$$

である。これは[分裂余等化子](../CAT3-04/index.md#def-cat3-04-split-coequalizer)であり、$s=\eta_A:A\to TA$ と $t=\eta_{TA}:TA\to T^2A$ が分裂データになる。元の圏でこれに対応する商を作れれば、任意の代数を実現する道が開ける。

以下、$\mathcal C,\mathcal D$ は局所小圏とし、合成は右から左へ読む。随伴の単位を $\eta:1_{\mathcal C}\Rightarrow RL$、余単位を $\varepsilon:LR\Rightarrow1_{\mathcal D}$ とする。「同値」は[充満忠実かつ本質的全射](../CAT1-09/index.md#thm-cat1-09-equivalence-criterion)という意味で用いる。

## 2. モナド的である、とは何を言うか

自由対象と忘却関手が随伴をなすだけなら、構造の復元はまだ保証されない。比較関手が同値である場合に特別な名前を付ける。

<a id="def-cat3-05-monadic"></a>

<!-- formal-statement-start -->
> **定義（モナド的関手）**
> 局所小圏間の右随伴 $R:\mathcal D\to\mathcal C$ と、選んだ左随伴 $L\dashv R$ に対し、誘導モナド $T=RL$ の比較関手 $K:\mathcal D\to\mathcal C^T$ が圏の同値であるとき、$R$ は**モナド的**（monadic）であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cat3-05-monadic -->
**定義の確認**（恒等随伴）。$\mathcal D=\mathcal C$、$L=R=1_{\mathcal C}$ とすれば $T=1_{\mathcal C}$、$\eta=\varepsilon=1$ である。[恒等モナドの代数](../CAT3-03/index.md#def-cat3-03-algebra)は必ず $(A,1_A)$、その射は任意の $A\to B$ である。従って $K(A)=(A,1_A)$ は対象にもHom集合にも逆対応を持つ圏同型であり、$R$ はモナド的である。
<!-- definition-example-end -->

前講で導入した二条件を思い出そう。[同型を反映する](../CAT3-04/index.md#def-cat3-04-conservative)とは、$Ru$ が同型なら $u$ 自身も同型という意味である。また平行二射 $f,g:D_1\rightrightarrows D_0$ が[$R$-分裂](../CAT3-04/index.md#def-cat3-04-u-split)とは、像 $Rf,Rg$ に分裂余等化子があるという意味であり、元の $f,g$ が分裂する必要はない。

「$R$ は $R$-分裂対の余等化子を保存する」とは、**元の圏で存在する**そのような対の余等化子 $e:D_0\to E$ を、$Re$ が $Rf,Rg$ の余等化子へ送ることをいう。「存在する」と「保存する」は別の要求である。特に $\mathcal D$ の任意の平行二射の余等化子の存在も、すべての余等化子の保存も要求しない。

## 3. Beckのモナド性定理

<a id="thm-cat3-05-beck"></a>

<!-- formal-statement-start -->
> **定理（Beckのモナド性定理、分裂余等化子版）**
> 局所小圏間に随伴 $L:\mathcal C\rightleftarrows\mathcal D:R$ があり、$T=RL$、$K:\mathcal D\to\mathcal C^T$ をその比較関手とする。次は同値である。
>
> 1. $K$ は圏の同値である（$R$ はモナド的）。
> 2. $R$ は同型を反映し、$\mathcal D$ では**すべての $R$-分裂平行二射**に余等化子が存在し、$R$ はこれらの余等化子を保存する。
> 3. $R$ は同型を反映し、$R$-分裂平行二射の余等化子を創出する（指定された像の余等化子の上に、同型を除いて一意な持ち上げがある）。
>
> 3の「創出」は[前講の定義](../CAT3-04/index.md#def-cat3-04-creates)を同型までの意味で読む。対象の字面上の等号 $R\bar Q=Q$ を、任意の同値な圏で厳密に要求するものではない。
<!-- formal-statement-end -->

### 証明の見取り図

まず2と3の関係を確認する。2の下で元の余等化子 $e$ を取ると、$Re$ と像で指定した分裂余等化子 $q$ は同じ対の余等化子だから一意同型で結ばれる。逆向きも、創出した余等化子を使えばよい。

1から2では、[Eilenberg–Moore忘却関手による創出](../CAT3-04/index.md#thm-cat3-04-em-creates)を、同値 $K$ を通じて $\mathcal D$ に移す。

2から1は二段に分ける。まず余単位の標準平行二射について余等化子 $e_D$ を作り、$Re_D$ と $R\varepsilon_D$ が同じ分裂余等化子であることから $\varepsilon_D$ 自身が余等化子であると示す。これで $K$ の充満忠実性が従う。次に任意の代数 $(A,a)$ に対し $\varepsilon_{LA},La$ の余等化子を作り、その比較像が $(A,a)$ と同型になることを直接確認する。

<!-- proof-start -->
### 証明

**2と3の同値。** 2を仮定し、$R$-分裂対 $f,g:D_1\rightrightarrows D_0$ と、像の指定された分裂余等化子 $q:RD_0\to Q$ を取る。$\mathcal D$ で余等化子 $e:D_0\to E$ が存在し、保存性により $Re$ も余等化子である。二つの普遍性から、唯一の同型

$$
\theta:RE\xrightarrow{\ \cong\ }Q,
\qquad \theta\,Re=q
$$

がある。実際、逆 $\psi:Q\to RE$ を逆向きの因子分解で作れば、$\theta\psi$ と $1_Q$ はともに $q$ の同じ因子分解、$\psi\theta$ と $1_{RE}$ はともに $Re$ の同じ因子分解になる。余等化子 $e$ 自身も同型を除いて一意だから、3の持ち上げが得られる。逆に3なら各対の余等化子が存在し、選んだ分裂余等化子にその $R$ 像を同型で合わせられる。別の余等化子も一意同型なので、$R$ はそれらを保存する。

**1から2：必要性。** $K$ が同値だとする。[代数忘却関手は同型を反映する](../CAT3-04/index.md#prop-cat3-04-forgetful-conservative)ので、$Ru=U^T(Ku)$ が同型なら $Ku$ は同型である。充満忠実な $K$ は同型を反映するから $u$ も同型である。

次に $R$-分裂対 $f,g:D_1\rightrightarrows D_0$ と分裂余等化子 $q:RD_0\to Q$ を取る。$U^TK=R$ なので $Kf,Kg$ は $U^T$-分裂対である。[代数忘却関手による創出](../CAT3-04/index.md#thm-cat3-04-em-creates)により、$\mathcal C^T$ に余等化子

$$
\widehat q:KD_0\longrightarrow (Q,c),
\qquad U^T\widehat q=q
$$

が存在する。$K$ の本質的全射性で $D_q\in\mathcal D$ と代数同型 $\alpha:KD_q\xrightarrow{\cong}(Q,c)$ を選ぶ。$\alpha^{-1}\widehat q:KD_0\to KD_q$ は代数射なので、充満性で $e:D_0\to D_q$ が存在して

$$
Ke=\alpha^{-1}\widehat q
$$

となる。$Ke$ が余等化子であることは $\alpha$ が同型であることから従う。任意の $h:D_0\to E$ が $hf=hg$ を満たせば、$Kh$ は $Kf,Kg$ を余等化するので $Ke$ を通る一意な代数射を持つ。$K$ の充満性・忠実性でその因子分解は $\mathcal D$ の一意な射に戻る。ゆえに $e$ は $\mathcal D$ で余等化子である。

さらに $R=U^TK$ と $U^T\alpha$ が同型であることから

$$
(U^T\alpha)\,Re=U^T\widehat q=q.
$$

分裂余等化子 $q$ は余等化子だから、$Re$ も余等化子となる。これで存在・保存性を証明した。ここでは $U^T\alpha$ を使っており、$RD_q=Q$ と字面上の等号を要求していない。

**2から1、前半：充満忠実性。** 2を仮定する。各 $D\in\mathcal D$ に対して[余単位の標準平行二射](../CAT3-04/index.md#lem-cat3-04-counit-pair)

$$
p_D=\varepsilon_{LRD},\qquad r_D=LR\varepsilon_D:
LRLRD\rightrightarrows LRD
$$

は $R$-分裂であり、像の分裂余等化子は $a_D=R\varepsilon_D:TRD\to RD$ である。仮定により $p_D,r_D$ には $e_D:LRD\to E_D$ という余等化子が存在し、$Re_D$ は $Rp_D,Rr_D$ の余等化子である。したがって前段の議論から唯一の同型 $\theta_D:RE_D\xrightarrow{\cong}RD$ があり

$$
\theta_D\,Re_D=a_D=R\varepsilon_D.
$$

$\varepsilon_Dp_D=\varepsilon_Dr_D$ なので、$e_D$ の普遍性から唯一の $u_D:E_D\to D$ が存在し $u_De_D=\varepsilon_D$ となる。$R$ を適用して

$$
Ru_D\,Re_D=R\varepsilon_D=\theta_D\,Re_D.
$$

$Re_D$ は余等化子ゆえエピ射であり、右消去から $Ru_D=\theta_D$。$\theta_D$ は同型で $R$ は同型を反映するから $u_D$ は同型である。従って $\varepsilon_D=u_De_D$ も $p_D,r_D$ の余等化子である。これをすべての $D$ に適用し、[比較関手の充満忠実性の判定](../CAT3-04/index.md#thm-cat3-04-full-faithfulness)から $K$ は充満忠実である。

**2から1、後半：本質的全射性。** 任意の[モナド代数](../CAT3-03/index.md#def-cat3-03-algebra) $(A,a)$ を取る。$\mathcal D$ で平行二射

$$
p=\varepsilon_{LA},\qquad r=La:
L(TA)\rightrightarrows LA
$$

を作る。$Rp=\mu_A$、$Rr=Ta$ であり、像では

$$
T^2A\ \substack{\xrightarrow{\ \mu_A\ }\\[-2pt]\xrightarrow[\ Ta\ ]{}}\ TA\xrightarrow{\ a\ }A
$$

が分裂する。四条件を省略せず書けば

$$
a\mu_A=aTa,\quad a\eta_A=1_A,\quad
\mu_A\eta_{TA}=1_{TA},\quad Ta\,\eta_{TA}=\eta_Aa.
$$

順に代数の結合律・単位律、モナドの単位律、$\eta$ の自然性である。よって $p,r$ は $R$-分裂し、仮定から余等化子 $e:LA\to E$ が存在して $Re:TA\to RE$ も余等化子となる。$a$ も同じ対の分裂余等化子なので、一意な同型 $\theta:RE\xrightarrow{\cong}A$ が存在して

$$
\theta\,Re=a.
$$

残るのは、$\theta$ が単なる $\mathcal C$ の同型ではなく**代数射**であるという確認である。比較代数 $KE=(RE,b)$ の構造射は $b=R\varepsilon_E:T(RE)\to RE$。$e:LA\to E$ の比較像 $Ke$ は、[比較関手の構成](../CAT3-03/index.md#thm-cat3-03-comparison)から自由代数 $(TA,\mu_A)$ から $(RE,b)$ への代数射である。従って

$$
b\,T(Re)=Re\,\mu_A.
$$

この等式に $\theta$ を合成し、$a$ が代数であることを用いると

$$
\begin{aligned}
\theta b\,T(Re)
&=\theta\,Re\,\mu_A
=a\mu_A\\
&=aTa
=a\,T(\theta\,Re)
=a\,T\theta\,T(Re).
\end{aligned}
$$

$Re$ は分裂余等化子 $a$ と同型を通じて一致するため、$Re$ には右逆 $\eta_A\theta:RE\to TA$ がある。実際 $Re\eta_A\theta=\theta^{-1}a\eta_A\theta=1_{RE}$。ゆえに $T(Re)$ も右逆 $T(\eta_A\theta)$ を持ってエピ射である。右消去して

$$
\theta b=a\,T\theta
$$

を得る。これは[代数射の条件](../CAT3-03/index.md#def-cat3-03-morphism)そのものである。さらに基底の $\theta$ が同型なので、[代数忘却関手の同型反映](../CAT3-04/index.md#prop-cat3-04-forgetful-conservative)により $\theta:KE\to(A,a)$ は代数同型である。任意の代数が $K$ の像と同型になり、$K$ は本質的全射。既に示した充満忠実性と合わせて圏の同値である。$\square$
<!-- proof-end -->

この証明の役割分担は明確である。同型の反映は $Ru_D$ が同型と分かった瞬間に使い、余等化子の存在は元の対象 $E_D,E$ を作るために使い、保存はそれらの像を既知の分裂余等化子と比較するために使った。三条件のどれも、「左随伴がある」という事実だけで自動的には従わない。

## 4. 自由モノイドから元の演算を復元する

上の証明を、有限語の評価が分かる具体例で読んでみる。$\mathbf{Mon}$ を単位元付きモノイドと準同型の圏、$U:\mathbf{Mon}\to\mathbf{Set}$ を台集合への忘却関手とする。有限語全体を作る自由モノイド関手 $L$ が $U$ の左随伴で、$T=UL$ は[有限語モナド](../CAT3-01/index.md#prop-cat3-01-list-monad)である。

<a id="prop-cat3-05-monoids"></a>

<!-- formal-statement-start -->
> **命題（モノイド忘却関手はモナド的）**
> 単位元付きモノイドの忘却関手 $U:\mathbf{Mon}\to\mathbf{Set}$ はモナド的である。誘導モナドが有限語モナド $T(X)=X^*$ であるとき、その比較関手 $\mathbf{Mon}\to\mathbf{Set}^T$ は圏の同値である。
<!-- formal-statement-end -->

### 証明の見取り図

有限語の代数の「空語の評価」を単位元、「二文字の評価」を積に読み換える。逆にモノイドの積を語全体の積として繰り返せば代数の評価が復元される。これで比較関手を具体的な圏同型として記述できる。

<!-- proof-start -->
### 証明

[有限語モナドの代数とモノイド](../CAT3-03/index.md#prop-cat3-03-list-monoids)の対応を、比較関手の両向きの写像として使う。モノイド $(M,\cdot,1)$ に $K(M)=(M,a)$ を対応させ、語の評価を

$$
a([m_1,\dots,m_n])=m_1\cdots m_n,\qquad a([])=1
$$

と定める。単位律は $a\eta_M(m)=a([m])=m$ から確認できる。

また語の語 $[w_1,\ldots,w_k]$ に対し、$a\mu_M$ は連結語の積を、$aTa$ は各 $w_i$ の積をさらに掛け合わせたものを返す。積の結合律と空語に対する単位元の扱いから両者は一致する。従って

$$
a\eta_M=1_M,\qquad a\mu_M=aTa
$$

の二つの代数公理を満たす。

逆に代数 $(A,a)$ から $1=a([])$ と $x\cdot y=a([x,y])$ を定める。代数の結合律を二重の語 $[[x,y],[z]]$ と $[[x],[y,z]]$ に適用すると

$$
(x\cdot y)\cdot z=a([x,y,z])=x\cdot(y\cdot z)
$$

となる。$[[],[x]]$ と $[[x],[]]$ を評価し、単位律 $a([x])=x$ を使えば $1\cdot x=x=x\cdot1$ を得る。さらに語をその長さで帰納すると、任意の語の評価はこの積の反復と一致する。代数射 $f:(A,a)\to(B,b)$ の条件 $fa=bTf$ を空語・二文字に適用すれば

$$
f(1_A)=1_B,\qquad f(x\cdot_Ay)=f(x)\cdot_Bf(y)
$$

で、逆に積と単位元を保つ写像は語の長さの帰納法で全語の評価を保つ。従って対象にも射にも互いに逆の対応があり、$K$ は圏同型、特に同値である。$\square$
<!-- proof-end -->

Beck の条件がどう見えるかも確かめる。モノイド準同型 $f:M\to N$ が集合として全単射なら、その逆写像も積を保つ。実際 $x=f(u),y=f(v)$ と置けば

$$
f^{-1}(xy)=f^{-1}(f(u)f(v))=f^{-1}(f(uv))=uv
=f^{-1}(x)f^{-1}(y),
$$

単位元も同様である。ゆえに $U$ は同型を反映する。また $U$-分裂対の集合での分裂余等化子には、[代数忘却関手による創出](../CAT3-04/index.md#thm-cat3-04-em-creates)を通じて一意の語評価が降りる。この代数をモノイドへ読み戻せば、元の圏で余等化子が存在し、$U$ が保存する。したがって[Beckの定理](#thm-cat3-05-beck)の条件2を独立に確認できる。

具体的には、非負整数の加法モノイド $(\mathbb N_0,+,0)$ で、$a:\mathbb N_0^*\to\mathbb N_0$ を語の数の和（空語の値は $0$）とする。まず二重の語 $[[2,3],[4]]$ に対して

$$
a\mu_{\mathbb N_0}([[2,3],[4]])
=a([2,3,4])=9,
\qquad
aTa([[2,3],[4]])=a([5,4])=9
$$

となる。一般に $w_i=[n_{i1},\ldots,n_{i\ell_i}]$（$1\le i\le k$）と置き、空和を $0$ とすれば

$$
a\mu_{\mathbb N_0}([w_1,\ldots,w_k])
=\sum_{i=1}^k\sum_{j=1}^{\ell_i}n_{ij}
=\sum_{i=1}^k a(w_i)
=aTa([w_1,\ldots,w_k])
$$

である。残る分裂データを $s=\eta_{\mathbb N_0}$、$t=\eta_{T\mathbb N_0}$ とすると、任意の $n\in\mathbb N_0$ と語 $w\in T\mathbb N_0$ に対して

$$
\begin{aligned}
a\eta_{\mathbb N_0}(n)&=a([n])=n,\\
\mu_{\mathbb N_0}\eta_{T\mathbb N_0}(w)&=\mu_{\mathbb N_0}([w])=w,\\
Ta\,\eta_{T\mathbb N_0}(w)&=Ta([w])=[a(w)]
=\eta_{\mathbb N_0}a(w).
\end{aligned}
$$

こうして[分裂余等化子の四条件](../CAT3-04/index.md#def-cat3-04-split-coequalizer)が成り立ち、$a$ は $\mu_{\mathbb N_0},Ta$ の分裂余等化子になる。ここで $\mu$ は語の連結、$Ta$ は各内側の語の和を取る操作であり、両者を $a$ で評価すると同じ値になることが復元の鍵である。

## 5. 失敗例：集合としての同型だけでは足りない

モノイドのような代数的構造とは異なり、位相は台集合だけから一般に一意には決まらない。

<a id="prop-cat3-05-top-failure"></a>

<!-- formal-statement-start -->
> **命題（位相空間の台集合への忘却はモナド的でない）**
> $\mathbf{Top}$ を位相空間と連続写像の圏とする。忘却関手 $U:\mathbf{Top}\to\mathbf{Set}$ は左随伴（離散位相を付ける関手）を持つが、モナド的ではない。
<!-- formal-statement-end -->

### 証明の見取り図

二点集合に異なる位相を与える。恒等写像が集合として同型でも、位相空間の同型とは限らない。Beckの必要条件が破れる。

<!-- proof-start -->
### 証明

$D:\mathbf{Set}\to\mathbf{Top}$ を集合に離散位相を付ける関手とする。任意の集合 $X$ と位相空間 $Y$ について、離散空間 $DX$ から $Y$ への写像はすべて連続だから

$$
\operatorname{Hom}_{\mathbf{Top}}(DX,Y)
\cong\operatorname{Hom}_{\mathbf{Set}}(X,UY)
$$

が自然に成り立つ。従って $D\dashv U$ である。

台集合 $S=\{0,1\}$ 上の離散空間 $S_d$ と密着空間 $S_i$（開集合は $\varnothing,S$ のみ）を考える。恒等写像 $f:S_d\to S_i$ は連続であり、$Uf=1_S$ は集合の同型である。しかし逆向きの集合恒等写像 $S_i\to S_d$ は連続ではない。なぜなら $\{0\}$ は $S_d$ で開だが、その逆像 $\{0\}$ は $S_i$ で開でないからである。よって $f$ は位相空間の同型ではなく、$U$ は同型を反映しない。[Beckの定理の必要条件](#thm-cat3-05-beck)によって $U$ はモナド的でない。$\square$
<!-- proof-end -->

なおこの随伴は $UD=1_{\mathbf{Set}}$ を誘導する。比較関手は集合を忘却するだけで、$S_d,S_i$ の違いを区別できない。前講の[第二射影の失敗](../CAT3-04/index.md#thm-cat3-04-full-faithfulness)と同様に、右随伴の存在だけでは元の構造を復元できない。

## 6. 演習：判定条件から比較関手の同値まで

### 問題1：単位から分裂データを組み立てる

- Level: A
- 問題ID: CAT3-05-SPLIT-ALGEBRA

局所小圏 $\mathcal C$ のモナド $(T,\eta,\mu)$ の代数 $(A,a)$ を取る。平行二射 $\mu_A,Ta:T^2A\rightrightarrows TA$ と $q=a:TA\to A$ に対して、$s=\eta_A$、$t=\eta_{TA}$ が[分裂余等化子の四条件](../CAT3-04/index.md#def-cat3-04-split-coequalizer)を満たすことを、型と使う公理を添えて証明せよ。

<!-- solution-start -->
**詳細解答**：$q\mu_A=qTa:T^2A\to A$ は代数結合律である。$qs=a\eta_A=1_A:A\to A$ は代数単位律である。$\mu_A t=\mu_A\eta_{TA}=1_{TA}:TA\to TA$ はモナド単位律である。最後に $Ta\,t=Ta\,\eta_{TA}=\eta_Aa=sq:TA\to TA$ は $a:TA\to A$ における $\eta$ の自然性。四式はいずれも同じ始域・終域の射を比較しており、[分裂データからの余等化子](../CAT3-04/index.md#prop-cat3-04-absolute)によって $a$ は余等化子である。
<!-- solution-end -->

### 問題2：モノイド準同型の逆

- Level: A
- 問題ID: CAT3-05-MONOID-ISO

単位元付きモノイドの準同型 $f:M\to N$ が集合として全単射である。逆写像が積と単位元を保つことを示し、忘却関手が同型を反映すると結論せよ。

<!-- solution-start -->
**詳細解答**：$x,y\in N$ に対し全射性で $u,v\in M$ を取り $x=f(u)$、$y=f(v)$ とする。$f(uv)=f(u)f(v)=xy$ より、逆写像を適用して $f^{-1}(xy)=uv=f^{-1}(x)f^{-1}(y)$。また $f(1_M)=1_N$ なので $f^{-1}(1_N)=1_M$。従って $f^{-1}$ はモノイド準同型であり、$f$ は $\mathbf{Mon}$ の同型。像 $Uf$ が同型である任意の射についてこの議論が成り立つので、$U$ は同型を反映する。
<!-- solution-end -->

### 問題3：二つの余等化子を比較する

- Level: A
- 問題ID: CAT3-05-COEQUALIZER-ISO

圏 $\mathcal C$ で $q:B\to Q$ と $q':B\to Q'$ がともに平行二射 $f,g:A\rightrightarrows B$ の余等化子であるとする。$\theta q'=q$ を満たす一意な同型 $\theta:Q'\to Q$ を、両方向の普遍性から構成せよ。

<!-- solution-start -->
**詳細解答**：$q'f=q'g$、$qf=qg$ だから、$q'$ の普遍性により一意な $\theta:Q'\to Q$ があり $\theta q'=q$。同様に $q$ の普遍性から一意な $\psi:Q\to Q'$ があり $\psi q=q'$。すると $(\theta\psi)q=\theta q'=q=1_Qq$。$q$ の一意性から $\theta\psi=1_Q$。また $(\psi\theta)q'=\psi q=q'=1_{Q'}q'$ から $\psi\theta=1_{Q'}$。従って $\theta$ は同型で、$\theta q'=q$ を満たす射として一意である。
<!-- solution-end -->

### 問題4：二点の位相が壊す条件

- Level: A
- 問題ID: CAT3-05-TOPOLOGY-FAIL

$S=\{0,1\}$ に離散位相 $\tau_d$ と密着位相 $\tau_i=\{\varnothing,S\}$ を与える。$f:(S,\tau_d)\to(S,\tau_i)$ を集合恒等写像とする。

1. $f$ が連続であることを示せ。
2. 逆集合写像が連続でないことを、開集合の逆像から示せ。
3. $\mathbf{Top}\to\mathbf{Set}$ が Beck のどの必要条件を満たさないか述べよ。

<!-- solution-start -->
**詳細解答**：

1. 終域の開集合は $\varnothing,S$ のみで、その $f$ による逆像はそれぞれ $\varnothing,S$。いずれも離散位相で開だから、$f$ は連続である。
2. 逆向きの集合恒等写像を $g$ とする。離散位相の開集合 $\{0\}$ の逆像は $g^{-1}(\{0\})=\{0\}$ であり、密着位相では開でない。よって $g$ は連続でなく、$f$ は位相同型ではない。
3. $Uf=1_S$ は集合の同型なのに $f$ は同型でない。従って $U$ は[同型を反映する条件](../CAT3-04/index.md#def-cat3-04-conservative)を破る。左随伴の有無や余等化子の条件を計算するまでもなく、[Beckの定理の必要性](#thm-cat3-05-beck)から非モナド的と判定できる。
<!-- solution-end -->

### 問題5：余単位を余等化子にする

- Level: B
- 問題ID: CAT3-05-COUNIT-QUOTIENT

随伴 $L\dashv R$ で $R$ が同型を反映し、$R$-分裂対の余等化子が $\mathcal D$ で存在して $R$ に保存されるとする。$D\in\mathcal D$ の標準対 $p_D,r_D$ に余等化子 $e:LRD\to E$ を取り、$\theta:RE\xrightarrow{\cong}RD$ を $\theta Re=R\varepsilon_D$ で定める。$\varepsilon_D$ が $p_D,r_D$ の余等化子であることを証明せよ。

<!-- solution-start -->
**詳細解答**：[標準平行二射](../CAT3-04/index.md#lem-cat3-04-counit-pair)は $\varepsilon_Dp_D=\varepsilon_Dr_D$ を満たすので、$e$ の普遍性で唯一の射 $u:E\to D$ があり $ue=\varepsilon_D$ となる。関手 $R$ を適用すると

$$
Ru\,Re=R\varepsilon_D=\theta Re.
$$

$Re$ は余等化子としてエピ射だから $Ru=\theta$。右辺が同型なので、同型反映性から $u$ も同型である。

従って $\varepsilon_D=ue$ は余等化子と同型の後合成であり、余等化子となる。実際、$h:LRD\to Z$ が $hp_D=hr_D$ なら、$e$ の普遍性で得る一意な $v:E\to Z$ を使って

$$
h=ve=(vu^{-1})\varepsilon_D
$$

と分解する。一意性は $e=u^{-1}\varepsilon_D$ のエピ性で従う。
<!-- solution-end -->

### 問題6：新しい代数構造を同定する

- Level: B
- 問題ID: CAT3-05-ALGEBRA-IDENTIFY

モナド代数 $(A,a)$ に対し、$\mathcal D$ の $\varepsilon_{LA},La$ の余等化子 $e:LA\to E$ が存在し、$Re$ が余等化子であるとする。$\theta:RE\to A$ は $\theta Re=a$ を満たす同型とする。$b=R\varepsilon_E$ と置き、$\theta b=aT\theta$ を証明せよ。$T(Re)$ を消去できる理由も示せ。

<!-- solution-start -->
**詳細解答**：$Ke$ は自由代数 $(TA,\mu_A)$ から $(RE,b)$ への代数射なので $bT(Re)=Re\mu_A$。左から $\theta$ を合成し、代数公理と $a=\theta Re$ を代入すると

$$
\theta bT(Re)=\theta Re\mu_A=a\mu_A
=aTa=aT\theta\,T(Re).
$$

一方、$a\eta_A=1_A$ と $\theta Re=a$ から、$Re$ は右逆 $\eta_A\theta$ を持つ。関手 $T$ を適用すると

$$
T(Re)\,T(\eta_A\theta)=1_{TRE}
$$

なので $T(Re)$ はエピ射である。前式の両辺からこれを右消去し $\theta b=aT\theta$ を得る。これは $\theta:KE\to(A,a)$ が代数射である条件である。
<!-- solution-end -->

### 問題7：必要性の持ち上げを再構成する

- Level: B
- 問題ID: CAT3-05-NECESSITY-LIFT

$K:\mathcal D\to\mathcal C^T$ が圏の同値とする。$R$-分裂対 $f,g:D_1\rightrightarrows D_0$ とその像の分裂余等化子 $q:RD_0\to Q$ から、$\mathcal D$ の余等化子 $e:D_0\to E$ を構成する手順を述べ、$Re$ が余等化子である理由を証明せよ。

<!-- solution-start -->
**詳細解答**：$U^TK=R$ なので $Kf,Kg$ は $U^T$-分裂対である。[代数忘却関手の創出](../CAT3-04/index.md#thm-cat3-04-em-creates)で余等化子

$$
\widehat q:KD_0\to(Q,c),\qquad U^T\widehat q=q
$$

を得る。$K$ の本質的全射性で対象 $E\in\mathcal D$ と同型 $\alpha:KE\to(Q,c)$ を選ぶ。充満性で $Ke=\alpha^{-1}\widehat q$ となる $e:D_0\to E$ を取れば、$Ke$ は $Kf,Kg$ の余等化子となる。

任意の $h:D_0\to Z$ が $hf=hg$ を満たすとき、$Kh$ は $Ke$ を一意に通って分解する。その因子分解を充満性で $\mathcal D$ へ戻し、忠実性で一意性を確認する。従って $e$ も余等化子である。

最後に $(U^T\alpha)Re=q$ であり、$U^T\alpha$ は同型だから、$Re$ は余等化子 $q$ と同型を通じて一致する。従って $Re$ も余等化子である。
<!-- solution-end -->

### 問題8：保存だけでは消せない仮定

- Level: B
- 問題ID: CAT3-05-HYPOTHESIS-ROLES

Beck の定理2の三条件（同型の反映、$R$-分裂対の余等化子の存在、それらの保存）が、十分性の証明のどの式・操作で必要か説明せよ。「余等化子が保存される」という文だけでその存在を保証できない理由も、量化の違いから述べよ。

<!-- solution-start -->
**詳細解答**：三条件の使い道を区別する。

- **存在**：元の圏 $\mathcal D$ で余等化子 $e_D:LRD\to E_D$ と $e:LA\to E$ を選ぶときに必要である。
- **保存**：$Re_D$ と $Re$ が像の余等化子となり、それぞれ $a_D$ と $a$ に同型 $\theta_D$、$\theta$ で比較できることを保証する。
- **同型の反映**：$Ru_D=\theta_D$ が同型と判明した後に $u_D$ 自身を同型とする箇所で使い、余単位の余等化子性、ひいては比較関手の充満忠実性につなぐ。

「保存」は**既に存在する余等化子**について、その $R$ 像も余等化子だとする全称条件である。他方「存在」は任意の $R$-分裂対に対して元の圏で余等化子があるという別の条件である。余等化子が一つもない対については保存性だけでは存在を導けない。
<!-- solution-end -->

### 問題9：一つの代数から圏の同値まで

- Level: C
- 問題ID: CAT3-05-BECK-RECONSTRUCT

局所小圏間の随伴 $L\dashv R$ を取り、$R$ が同型を反映し、$R$-分裂対の余等化子が存在して $R$ が保存すると仮定する。

1. 各 $D\in\mathcal D$ について $p_D=\varepsilon_{LRD}$、$r_D=LR\varepsilon_D$ とする。$\varepsilon_D$ がこれらの余等化子であることを示し、$K$ の充満忠実性を得よ。
2. 任意の $T$-代数 $(A,a)$ について $p=\varepsilon_{LA}$、$r=La$ を作り、その $R$ 像が分裂する四式を示せ。
3. $p,r$ の余等化子 $e:LA\to E$ と同型 $\theta:RE\to A$ を構成して $\theta:KE\to(A,a)$ が代数同型となることを証明せよ。最後に $K$ が同値であると結論せよ。

<!-- solution-start -->
**詳細解答**：

1. [標準平行二射](../CAT3-04/index.md#lem-cat3-04-counit-pair)は $R$-分裂する。仮定で $p_D,r_D$ の余等化子 $e_D$ があり、$Re_D$ と $a_D=R\varepsilon_D$ は同じ像の余等化子だから、一意同型 $\theta_D:RE_D\to RD$ を取れて $\theta_DRe_D=a_D$ となる。

   $\varepsilon_Dp_D=\varepsilon_Dr_D$ より $u_De_D=\varepsilon_D$ となる射 $u_D$ がある。$R$ を適用して

   $$
   Ru_DRe_D=\theta_DRe_D
   $$

   を得る。$Re_D$ のエピ性で右消去し $Ru_D=\theta_D$、同型反映で $u_D$ は同型。従って $\varepsilon_D$ は余等化子となり、[充満忠実性の判定](../CAT3-04/index.md#thm-cat3-04-full-faithfulness)により $K$ は充満忠実である。
2. $Rp=R\varepsilon_{LA}=\mu_A$、$Rr=RLa=Ta$ である。$q=a$、$s=\eta_A$、$t=\eta_{TA}$ として四式

   $$
   a\mu_A=aTa,\quad a\eta_A=1_A,\quad
   \mu_A\eta_{TA}=1_{TA},\quad Ta\eta_{TA}=\eta_Aa
   $$

   を順に代数結合律・単位律、モナド単位律、自然性で確かめる。ゆえに $p,r$ は $R$-分裂する。
3. 仮定で余等化子 $e:LA\to E$ が存在し、$Re$ と $a$ は同じ対の余等化子だから一意同型 $\theta:RE\to A$ があり $\theta Re=a$ となる。

   $b=R\varepsilon_E$ と置く。$Ke$ は代数射なので $bT(Re)=Re\mu_A$。代数結合律を使うと

   $$
   \theta bT(Re)=a\mu_A=aTa=aT\theta\,T(Re).
   $$

   $Re=\theta^{-1}a$ には右逆 $\eta_A\theta$ があるので $T(Re)$ も右逆を持つ。従って $\theta b=aT\theta$。

   $\theta$ は基底で同型の代数射だから[同型反映](../CAT3-04/index.md#prop-cat3-04-forgetful-conservative)で代数同型である。任意の代数が $KE$ と同型になり $K$ は本質的全射。1で得た充満忠実性と[圏の同値判定](../CAT1-09/index.md#thm-cat1-09-equivalence-criterion)により同値である。
<!-- solution-end -->

## 7. 何を得たか

Beck の定理は「忘却関手に左随伴があるから構造を復元できる」と言っているのではない。**同型を見落とさず、忘却した先で分裂する商を元の圏に作れて、しかもその商を忘却後も保つ**ときに限って、比較関手が圏の同値になる、という判定である。

次の CAT3-06「Kan拡張の普遍性」では、随伴を別の角度から調べる。関手を別の関手に沿って延長するとき、延長の「最も普遍的な選び方」をHom集合の自然同型として定式化する。
