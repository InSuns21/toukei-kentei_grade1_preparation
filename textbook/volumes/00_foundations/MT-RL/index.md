# MT-RL 標準測度論ブリッジ：Riemann積分とLebesgue積分

[RA4](../RA4/index.md) ではDarboux上和・下和からRiemann積分を作り、[Lebesgue積分の構成](../F0_00D2A_単関数_Lebesgue積分_構成/index.md) では単関数からLebesgue積分を作りました。

見た目は別物ですが、重なる範囲では同じ面積を計算しています。この章の目的は、その「同じになる理由」と「同じにならない境界」を明示することです。

```text
Darboux下和・上和
       │
       │  階段関数として読む
       ↓
Lebesgue単関数の積分
       │
       ├─ Riemann可積分 ⇒ Lebesgue可積分・値一致
       │
       ├─ 不連続点集合が測度0 ⇔ Riemann可積分
       │
       └─ 広義積分では「条件収束」に注意
```

---

## 1. Darboux和は単関数の積分そのもの

$[a,b]$ の分割

$$
P:a=x_0<x_1<\cdots<x_n=b
$$

を取り、各 $I_i=[x_{i-1},x_i]$ で

$$
m_i=\inf_{I_i}f,\qquad M_i=\sup_{I_i}f
$$

とします。

小区間の内部では高さ $m_i$ の下側階段関数 $\ell_P$、高さ $M_i$ の上側階段関数 $u_P$ を置き、分割点では $\ell_P=u_P=f$ とします。分割点は有限個なので積分値には影響しません。

<a id="prop-mt-rl-darboux-simple"></a>
<!-- formal-statement-start -->
> **命題（Darboux和と単関数積分の一致）**  
> 有界関数 $f:[a,b]\to\mathbb R$ と分割 $P$ に対し、上の $\ell_P,u_P$ はLebesgue単関数で
$$
\ell_P\le f\le u_P,
$$
かつ
$$
\int_a^b\ell_P\,dm=L(f,P),\qquad
\int_a^bu_P\,dm=U(f,P)
$$
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

各小区間上で $\ell_P,u_P$ は定数なので、[非負単関数の積分](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#def-f0-00d2a-02) と同じ「高さ×区間長」の有限和になります。符号がある場合は正負に分ければよく、分割点はLebesgue測度0なので寄与しません。したがってそれぞれDarboux下和・上和に一致します。$\square$
<!-- proof-end -->

つまりRiemann積分とLebesgue積分は、少なくとも階段近似の段階ではすでに同じ量を見ています。

---

## 2. Riemann可積分ならLebesgue可積分で、値も同じ

<a id="thm-mt-rl-agreement"></a>
<!-- formal-statement-start -->
> **定理（Riemann積分とLebesgue積分の一致）**  
> 有界関数 $f:[a,b]\to\mathbb R$ がRiemann可積分なら、$f$ はLebesgue可測かつLebesgue可積分であり、
$$
\int_a^b f(x)\,dx\Big|_{\mathrm{Riemann}}
=
\int_{[a,b]} f\,dm\Big|_{\mathrm{Lebesgue}}
$$
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

Riemann積分値を $I$ とします。[Darboux可積分性判定](../RA4/index.md#thm-ra4-darboux-criterion) により、分割を共通細分で取り直しながら

$$
P_1\prec P_2\prec\cdots,
\qquad
U(f,P_n)-L(f,P_n)<2^{-n}
$$

となる分割列を取れます。対応する下側・上側単関数を $\ell_n,u_n$ とすると、細分によって

$$
\ell_n\uparrow \ell,
\qquad
u_n:=u_n\downarrow u,
\qquad
\ell_n\le f\le u_n
$$

です。$|f|\le M$ とすれば $|\ell_n|,|u_n|\le M$ なので、[Lebesgueの優収束定理（DCT）](../F0_00D2B_単調収束_Fatou_優収束/index.md#thm-f0-00d2b-01) により

$$
\int\ell\,dm
=
\lim_nL(f,P_n)=I,
\qquad
\int u\,dm
=
\lim_nU(f,P_n)=I.
$$

したがって

$$
\int(u-\ell)\,dm=0.
$$

$u-\ell\ge0$ なので $u=\ell$ a.e.（almost everywhere; ほとんど至る所）です。さらに

$$
\ell\le f\le u
$$

なので $f=\ell$ a.e. です。Lebesgue測度では零集合の部分集合も可測であるため、$f$ もLebesgue可測です。有限区間上で $|f|\le M$ だからLebesgue可積分でもあります。

最後に [零集合上の変更は積分を変えない](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-f0-00d2a-01) ことから

$$
\int f\,dm=\int\ell\,dm=I.
$$

$\square$
<!-- proof-end -->

この定理の向きは一方向です。**Lebesgue可積分だからRiemann可積分、とは限りません。**

代表例はDirichlet関数

$$
1_{\mathbb Q\cap[0,1]}.
$$

Lebesgue積分は0ですが、どの小区間にも有理数と無理数があるためRiemann積分は存在しません。

---

## 3. どの程度の不連続までRiemann積分は許すか

Riemann可積分性は「連続か不連続か」だけではなく、**不連続点がどれだけ大きな集合を作るか**で決まります。その量を測るため局所振動を入れます。

<a id="def-mt-rl-local-oscillation"></a>
<!-- formal-statement-start -->
> **定義（局所振動）**  
> 有界関数 $f:[a,b]\to\mathbb R$ と $x\in[a,b]$ に対し
$$
\omega_f(x)
:=
\inf_{\delta>0}
\sup\left\{
|f(s)-f(t)|:
s,t\in[a,b]\cap(x-\delta,x+\delta)
\right\}
$$
> を $x$ における局所振動という。
<!-- formal-statement-end -->

$\omega_f(x)=0$ であることと、$f$ が $x$ で連続であることは同値です。

<!-- definition-example-start: def-mt-rl-local-oscillation -->
**定義の確認**：$f(x)=x$ なら半径 $\delta$ の近傍での値の振れ幅は高々 $2\delta$ なので $\omega_f(x)=0$ です。一方 $f=1_{\mathbb Q}$ ではどの近傍にも値0と1が現れるので、全ての $x$ で $\omega_f(x)=1$ です。
<!-- definition-example-end -->

<a id="thm-mt-rl-lebesgue-criterion"></a>
<!-- formal-statement-start -->
> **定理（LebesgueのRiemann可積分性判定）**  
> 有界関数 $f:[a,b]\to\mathbb R$ がRiemann可積分であることと、不連続点集合
$$
D(f)=\{x\in[a,b]:f\text{ は }x\text{ で不連続}\}
$$
> がLebesgue測度0であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まずRiemann可積分とします。$\eta>0$ に対し

$$
D_\eta=\{x:\omega_f(x)\ge\eta\}
$$

と置きます。任意の $\varepsilon>0$ に対し

$$
U(f,P)-L(f,P)<\eta\varepsilon
$$

となる分割 $P$ を取ります。$D_\eta$ と交わる小区間では、分割点を除けばその区間内の振動幅が少なくとも $\eta$ です。したがって、そのような小区間の長さの総和は

$$
\eta\times(\text{総延長})
\le U(f,P)-L(f,P)
<\eta\varepsilon.
$$

よって $D_\eta$ は任意に小さい総延長の有限区間族で覆え、測度0です。さらに

$$
D(f)=\bigcup_{m=1}^{\infty}D_{1/m}
$$

なので $D(f)$ も測度0です。

逆に $D(f)$ が測度0とします。$M=\sup|f|$ とします。$\eta>0$ に対し $D_\eta$ は閉集合で、$D(f)$ の部分集合なので測度0です。したがって $D_\eta$ を総延長が任意に小さい有限個の開区間で覆えます。その外側では各点の局所振動が $\eta$ 未満であり、コンパクト性から有限個の「振動幅 $<\eta$ の近傍」で覆えます。

これらの端点をまとめて分割を作ると、悪い区間では振動幅を $2M$ で、良い区間では $\eta$ で抑えられます。悪い区間の総延長を十分小さくし、さらに $\eta$ を十分小さく取れば

$$
U(f,P)-L(f,P)<\varepsilon
$$

とできます。[Darboux可積分性判定](../RA4/index.md#thm-ra4-darboux-criterion) より $f$ はRiemann可積分です。$\square$
<!-- proof-end -->

この判定は「不連続点があるとRiemann積分できない」という誤解を壊します。許されないのは不連続点の**個数**ではなく、その集合のLebesgue測度です。

### 例1：Thomae関数

$[0,1]$ 上で

$$
t(x)=
\begin{cases}
1/q,&x=p/q\text{ を既約分数で表せるとき},\\
0,&x\notin\mathbb Q
\end{cases}
$$

とします。$t$ は全ての無理数で連続、全ての有理数で不連続です。不連続点集合は可算なので測度0。したがってRiemann可積分で、Lebesgue積分もRiemann積分も0です。

### 例2：Cantor集合の指示関数

標準Cantor集合 $C\subset[0,1]$ は非可算ですが測度0です。$1_C$ の不連続点はちょうど $C$ なので、[LebesgueのRiemann可積分性判定](#thm-mt-rl-lebesgue-criterion) によりRiemann可積分で積分値は0です。

**非可算個の不連続点があってもRiemann可積分になり得ます。**

---

## 4. a.e.で同じでもRiemann可積分性は保存されない

Lebesgue積分では零集合上の変更は見えません。しかしRiemann積分は局所的な振動を見るため、零集合上の変更でも、その集合が稠密なら壊れることがあります。

$$
0
\quad\text{と}\quad
1_{\mathbb Q\cap[0,1]}
$$

はa.e.で等しく、Lebesgue積分も同じ0です。それでも前者はRiemann可積分、後者はRiemann非可積分です。

ここが両積分の哲学の差です。

- Lebesgue積分：測度0の集合は無視する。
- Riemann積分：各小区間内の最大・最小の振れを観察する。

---

## 5. 広義Riemann積分との関係

通常のRiemann積分は有界閉区間上の有界関数を扱います。無限区間や特異点では、Riemann側は別の極限を追加して**広義積分**を定義します。

非負関数では、この極限とLebesgue積分は非常にきれいに一致します。

<a id="thm-mt-rl-improper-nonnegative"></a>
<!-- formal-statement-start -->
> **定理（非負広義Riemann積分とLebesgue積分の一致）**  
> $f:(a,b]\to[0,\infty)$ が連続とする。このとき
$$
\int_{(a,b]}f\,dm
=
\lim_{c\downarrow a}\int_c^bf(x)\,dx
$$
> が $[0,\infty]$ の値として成り立つ。右辺は広義Riemann積分である。無限区間でも同様に、切断区間を単調に広げれば一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$a_n\downarrow a$ とし

$$
f_n=f\,1_{[a_n,b]}
$$

と置くと $0\le f_n\uparrow f$ です。各 $f_n$ は有界閉区間上でRiemann可積分なので、[Riemann積分とLebesgue積分の一致](#thm-mt-rl-agreement) から

$$
\int f_n\,dm
=
\int_{a_n}^bf(x)\,dx.
$$

[単調収束定理（MCT）](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange) により

$$
\int f\,dm
=
\lim_n\int f_n\,dm
=
\lim_n\int_{a_n}^bf(x)\,dx.
$$

$\square$
<!-- proof-end -->

符号を持つ関数では注意が必要です。絶対値の広義積分まで有限ならLebesgue可積分で値も一致しますが、**条件収束する広義積分**はLebesgue可積分とは限りません。

典型例は

$$
\int_1^\infty\frac{\sin x}{x}\,dx.
$$

これは広義Riemann積分としては収束しますが、

$$
\int_1^\infty\frac{|\sin x|}{x}\,dx=\infty
$$

なのでLebesgue可積分関数ではありません。

したがって無限区間まで含めると、単純に「Lebesgue積分がRiemann積分を全部包含する」と言うのは不正確です。正しくは、**通常のRiemann積分はLebesgue積分に含まれ、非負・絶対収束の広義積分も自然に接続するが、条件収束は別物**です。

---

## 6. 演習

### Level A

<a id="ex-mt-rl-a01"></a>
#### MT-RL-A01 Dirichlet関数
- Level: A

$f=1_{\mathbb Q\cap[0,1]}$ について、Riemann可積分性とLebesgue可積分性をそれぞれ判定し、Lebesgue積分値を求めよ。

<!-- solution-start -->
**解答**：任意の小区間で上限1・下限0なのでRiemann非可積分。有理数集合は測度0なので $f=0$ a.e. で、Lebesgue可積分かつ積分値0。
<!-- solution-end -->

<a id="ex-mt-rl-a02"></a>
#### MT-RL-A02 Thomae関数
- Level: A

本文のThomae関数 $t$ の不連続点集合を答え、Riemann積分値を求めよ。

<!-- solution-start -->
**解答**：不連続点は $\mathbb Q\cap[0,1]$ で測度0。[LebesgueのRiemann可積分性判定](#thm-mt-rl-lebesgue-criterion) よりRiemann可積分。$t=0$ a.e. なので [Riemann積分とLebesgue積分の一致](#thm-mt-rl-agreement) から積分値0。
<!-- solution-end -->

<a id="ex-mt-rl-a03"></a>
#### MT-RL-A03 Cantor集合
- Level: A

標準Cantor集合 $C$ の指示関数 $1_C$ がRiemann可積分であることを示し、積分値を求めよ。

<!-- solution-start -->
**解答**：$C$ は閉集合で内部を持たないため、$1_C$ は $C$ 上で不連続、$C^c$ 上で連続。$m(C)=0$ なので可積分性判定からRiemann可積分。$1_C=0$ a.e. なので積分値0。
<!-- solution-end -->

<a id="ex-mt-rl-a04"></a>
#### MT-RL-A04 $x^{-p}$ の特異積分
- Level: A

$p>0$ とする。$(0,1]$ 上の $f(x)=x^{-p}$ について、広義Riemann積分およびLebesgue積分が有限となる $p$ の範囲を求めよ。

<!-- solution-start -->
**解答**：
$$
\int_\varepsilon^1x^{-p}dx
=
\begin{cases}
\dfrac{1-\varepsilon^{1-p}}{1-p},&p\ne1,\\
-\log\varepsilon,&p=1.
\end{cases}
$$
よって有限なのは $0<p<1$。非負なので [非負広義Riemann積分とLebesgue積分の一致](#thm-mt-rl-improper-nonnegative) によりLebesgue積分も同じ範囲で有限。
<!-- solution-end -->

### Level B

<a id="ex-mt-rl-b01"></a>
#### MT-RL-B01 分割の細分と階段近似
- Level: B

分割 $Q$ が $P$ の細分なら

$$
\ell_P\le\ell_Q\le f\le u_Q\le u_P
$$

となることを示せ。

<!-- solution-start -->
**解答**：小区間を細かくすると、その上での下限は元の大区間の下限以上になり、上限は元の大区間の上限以下になる。各点でこの関係を適用すればよい。分割点では全て $f$ の値に合わせているので同じ不等式が成り立つ。
<!-- solution-end -->

<a id="ex-mt-rl-b02"></a>
#### MT-RL-B02 a.e.同値でもRiemann性は変わる
- Level: B

$f(x)=0$ と $g(x)=1_{\mathbb Q\cap[0,1]}(x)$ はa.e.で等しい。それでもRiemann可積分性が一致しない理由を、局所振動で説明せよ。

<!-- solution-start -->
**解答**：$f$ は全点で局所振動0。一方 $g$ はどの近傍にも有理数と無理数があるため全点で局所振動1。したがって $g$ の不連続点集合は $[0,1]$ 全体で正の測度を持ち、Riemann非可積分。Lebesgue積分は零集合上の変更を無視するが、Riemann積分は各小区間の振動を無視しない。
<!-- solution-end -->

<a id="ex-mt-rl-b03"></a>
#### MT-RL-B03 条件収束する広義積分
- Level: B

$\int_1^\infty \sin x/x\,dx$ が広義積分として収束しても、$\sin x/x$ がLebesgue可積分ではない理由を説明せよ。

<!-- solution-start -->
**解答**：広義積分の収束は正負の打ち消しを許す。一方Lebesgue可積分には $\int|f|<\infty$ が必要。各 $k$ について $[k\pi+\pi/6,k\pi+5\pi/6]$ では $|\sin x|\ge1/2$ なので、これらの区間で $|\sin x|/x$ を積分すると調和級数型の下界が得られ、絶対積分は発散する。
<!-- solution-end -->

### Level C

<a id="ex-mt-rl-c01"></a>
#### MT-RL-C01 可積分なら不連続点は測度0
- Level: C

有界関数 $f:[a,b]\to\mathbb R$ がRiemann可積分とする。$D_\eta=\{x:\omega_f(x)\ge\eta\}$ と置き、各 $\eta>0$ で $m(D_\eta)=0$ をDarboux和から示せ。

<!-- solution-start -->
**解答**：任意の $\varepsilon>0$ に対し $U(f,P)-L(f,P)<\eta\varepsilon$ となる分割 $P$ を取る。$D_\eta$ を含む小区間（分割点は有限なので別扱い）では振動幅が少なくとも $\eta$ だから、該当区間の総延長を $S$ とすると
$$
\eta S\le U(f,P)-L(f,P)<\eta\varepsilon.
$$
よって $S<\varepsilon$。任意の $\varepsilon$ で覆えるので $m(D_\eta)=0$。最後に $D(f)=\bigcup_{m\ge1}D_{1/m}$ だから不連続点集合も測度0。
<!-- solution-end -->

---

## 7. この章で何がつながったか

ここまでで、Riemann積分とLebesgue積分の関係は次のように整理できます。

```text
有界閉区間
Riemann可積分
   ↓ 必ず
Lebesgue可積分
   ↓
積分値は一致

Lebesgue可積分
   ⇏ Riemann可積分
   反例: Dirichlet関数

Riemann可積分
   ⇔ 不連続点集合のLebesgue測度が0

非負・絶対収束の広義積分
   ↔ Lebesgue積分へ自然に接続

条件収束する広義積分
   ↛ Lebesgue可積分とは限らない
```

これでRA4のRiemann積分と、測度論側のLebesgue積分・MCT/DCTが一つの体系として接続しました。次の標準数学コアは **Batch 3：線形代数コア** です。
