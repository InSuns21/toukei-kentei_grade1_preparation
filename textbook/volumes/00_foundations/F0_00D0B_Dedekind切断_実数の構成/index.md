# F0-00D0B Dedekind切断：順序の穴から実数を作る

Cauchy 完備化は「近似列が着地できる場所を追加する」構成でした。Dedekind 切断は別の方向から、**有理数の順序にある境界そのものを一つの数として採用する**構成です。

例えば $\sqrt2$ 自体をまだ持っていなくても、

$$
\{q\in\mathbb Q:q<0\text{ または }q^2<2\}
$$

という「$\sqrt2$ より左にあるはずの有理数全部」は、有理数だけを使って定義できます。この左側集合を新しい数そのものと考えます。

---

## 1. Dedekind切断

<a id="def-f0-00d0b-cut"></a>
<!-- formal-statement-start -->
> **定義（Dedekind切断）**  
> 部分集合 $A\subset\mathbb Q$ が次の4条件を満たすとき、$A$ を **Dedekind切断** という。
>
> 1. $A\ne\varnothing$。
> 2. $A\ne\mathbb Q$。
> 3. $q\in A$ かつ $p<q$ なら $p\in A$（下方閉）。
> 4. $A$ は最大元を持たない。すなわち任意の $q\in A$ に対し、$q<r$ となる $r\in A$ が存在する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0b-cut -->
### 1.1 例：$\sqrt2$ に対応する切断

$$
A_{\sqrt2}
:=\{q\in\mathbb Q:q<0\text{ または }q^2<2\}
$$

とします。

まず $0\in A_{\sqrt2}$ なので空でなく、$2\notin A_{\sqrt2}$ なので $\mathbb Q$ 全体ではありません。

下方閉性を確認します。$q\in A_{\sqrt2}$、$p<q$ とします。

- $q<0$ なら $p<q<0$ なので $p\in A_{\sqrt2}$。
- $q\ge0$ なら $q^2<2$。$p<0$ なら定義から $p\in A_{\sqrt2}$。$p\ge0$ なら $0\le p<q$ なので $p^2<q^2<2$。

最大元がないことも、有理数だけで明示できます。$q\in A_{\sqrt2}$ とします。

$q<0$ なら

$$
r=\frac q2
$$

とすれば $q<r\le0$ で、$r<0$ または $r=0$ だから $r\in A_{\sqrt2}$ です。

$q\ge0$ なら $q^2<2$ です。正の有理数 $\delta$ を

$$
0<\delta<\min\left\{1,\frac{2-q^2}{2q+1}\right\}
$$

となるように取ります。すると $\delta<1$ なので $\delta^2<\delta$ であり、

$$
\begin{aligned}
(q+\delta)^2
&=q^2+2q\delta+\delta^2\\
&<q^2+(2q+1)\delta\\
&<2.
\end{aligned}
$$

従って $q<q+\delta\in A_{\sqrt2}$。よって最大元はありません。

以上から $A_{\sqrt2}$ は Dedekind切断です。
<!-- definition-example-end -->

4番目の「最大元なし」は表現の一意性に効きます。もし

$$
\{q\in\mathbb Q:q\le1\}
$$

も許すと、境界1を

$$
\{q:q<1\},
\qquad
\{q:q\le1\}
$$

という二通りで表せてしまいます。最大元を禁止して左側の取り方を一つに固定します。

<a id="def-f0-00d0b-dedekind-real"></a>
<!-- formal-statement-start -->
> **定義（Dedekind実数）**  
> Dedekind切断全体の集合を
$$
\mathbb R_D
$$
> と書き、その元を **Dedekind実数** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0b-dedekind-real -->
### 1.2 一つの数は「左側全部」で表す

有理数1に対応する Dedekind実数は

$$
\{q\in\mathbb Q:q<1\}
$$

です。$\sqrt2$ に対応するものは前節の $A_{\sqrt2}$ です。境界点を直接持たなくても、その境界より左の有理数全体なら作れます。
<!-- definition-example-end -->

---

## 2. 有理数を標準切断として埋め込む

$r\in\mathbb Q$ に対して

$$
r^*:=\{q\in\mathbb Q:q<r\}
$$

と置きます。

<a id="thm-f0-00d0b-rational-embedding"></a>
<!-- formal-statement-start -->
> **定理（有理数の標準切断）**  
> 各 $r\in\mathbb Q$ に対して $r^*$ は Dedekind切断であり、写像
$$
\jmath:\mathbb Q\to\mathbb R_D,
\qquad
r\mapsto r^*
$$
> は単射である。
<!-- formal-statement-end -->

### 証明の見取り図

$r^*$ は「$r$ より小さい有理数全部」です。最大元がないことは、$q<r$ の中点 $(q+r)/2$ を取れば確認できます。

<!-- proof-start -->
### 証明

$r-1\in r^*$ なので空でなく、$r\notin r^*$ なので $\mathbb Q$ 全体ではありません。$q<r$ かつ $p<q$ なら $p<r$ なので下方閉です。

$q\in r^*$ なら $q<r$ なので

$$
q'=\frac{q+r}{2}
$$

と置けば $q<q'<r$。従って $q'\in r^*$ であり最大元はありません。

$r<s$ なら $r\in s^*$ ですが $r\notin r^*$ なので $r^*\ne s^*$。従って $\jmath$ は単射です。$\square$
<!-- proof-end -->

以後、必要に応じて $r$ と $r^*$ を同一視します。

---

## 3. 順序は包含関係になる

<a id="def-f0-00d0b-order"></a>
<!-- formal-statement-start -->
> **定義（Dedekind実数の順序）**  
> $A,B\in\mathbb R_D$ に対して
$$
A\le B
\iff
A\subseteq B
$$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0b-order -->
### 3.1 有理数の順序がそのまま残る

$r<s$ なら

$$
r^*=\{q:q<r\}\subsetneq\{q:q<s\}=s^*.
$$

従って有理切断埋め込みは順序を保ちます。
<!-- definition-example-end -->

この順序は全順序です。実際、$A\not\subseteq B$ とします。$a\in A\setminus B$ を一つ取ります。任意の $b\in B$ について $b\ge a$ なら、$b>a$ のとき $B$ の下方閉性から $a\in B$ となり矛盾し、$b=a$ も $a\notin B$ に反します。従って $b<a$。$a\in A$ と $A$ の下方閉性から $b\in A$ です。よって

$$
B\subset A.
$$

従って任意の二切断は包含関係で比較できます。

---

## 4. 加法は「左側どうしを足す」

境界 $x$ より左の有理数と、境界 $y$ より左の有理数を足せば、$x+y$ より左へ来ます。

<a id="thm-f0-00d0b-addition"></a>
<!-- formal-statement-start -->
> **定理（切断の加法）**  
> $A,B\in\mathbb R_D$ に対し
$$
A+B:=\{a+b:a\in A,\ b\in B\}
$$
> と定めると $A+B$ は Dedekind切断である。また
$$
r^*+s^*=(r+s)^*
$$
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

切断の4条件を一つずつ確認します。下方閉性では、$p<a+b$ の差

$$
\delta=(a+b)-p>0
$$

を一方の項から引きます。最大元なしでは、$a$ を $A$ 内で少し大きくします。

<!-- proof-start -->
### 証明

$A,B$ は空でないので $a\in A,b\in B$ を取れば $a+b\in A+B$。従って空でありません。

$A\ne\mathbb Q$, $B\ne\mathbb Q$ なので $u\notin A$, $v\notin B$ を取ります。下方閉性から全ての $a\in A$ で $a<u$、全ての $b\in B$ で $b<v$ です。従って

$$
a+b<u+v,
$$

なので $u+v\notin A+B$。よって $A+B\ne\mathbb Q$。

$c=a+b\in A+B$ とし $p<c$ とします。$\delta=c-p>0$ と置けば

$$
a-\delta<a,
$$

従って $a-\delta\in A$。しかも

$$
p=(a-\delta)+b\in A+B.
$$

よって下方閉です。

最後に $c=a+b\in A+B$ とします。$A$ は最大元を持たないので $a<a'$ となる $a'\in A$ が存在し、

$$
c=a+b<a'+b\in A+B.
$$

従って最大元を持ちません。以上から $A+B$ は Dedekind切断です。

$r^*+s^*\subseteq(r+s)^*$ は $a<r,b<s$ なら $a+b<r+s$ から従います。逆に $q<r+s$ とします。

$$
\varepsilon=\frac{r+s-q}{2}>0,
\qquad
a=r-\varepsilon,
\qquad b=s-\varepsilon
$$

と置けば $a<r,b<s$ かつ

$$
a+b=r+s-2\varepsilon=q.
$$

従って $q\in r^*+s^*$。よって等号が成り立ちます。$\square$
<!-- proof-end -->

零元は

$$
0^*=\{q:q<0\}
$$

です。加法逆元は

$$
-A:=\{q\in\mathbb Q:\exists r\notin A\text{ such that }q<-r\}
$$

と定めることで作れます。これは「$A$ の境界の符号を反転した左側」です。

---

## 5. 乗法と逆数

正の切断 $A,B>0^*$ については、正の有理数部分を掛けます。

$$
A\cdot B
:=\{q\in\mathbb Q:q\le0\}
\cup
\{q>0:\exists a\in A,\exists b\in B,
\ 0<a,0<b,\ q<ab\}.
$$

「$q\le0$」を最初から含めるのは、正の実数の左側には全ての非正有理数が入るからです。この集合が切断になることは、加法と同様に4条件を確認できます。

正の $A>0^*$ に対する逆数は、$A$ の**外側**の正有理数を使って

$$
A^{-1}
:=\{q\in\mathbb Q:q\le0\}
\cup
\left\{q>0:\exists r\in\mathbb Q_{>0}\setminus A,\ q<\frac1r\right\}
$$

と定めます。$A$ が境界 $\alpha>0$ を表すなら、$r\notin A$ は $r\ge\alpha$ 側にあり、$1/r$ は $1/\alpha$ の左側から近づく、という向きです。

負の元を含む積・逆数は符号規則

$$
(-A)B=-(AB),
\qquad
(-A)(-B)=AB
$$

で拡張します。

この定義が標準有理切断と両立することは、例えば正の $r,s$ について

$$
r^*s^*=(rs)^*
$$

を「$q<rs$ なら $r,s$ を少し下から有理数で近似して $q<ab<rs$ とできる」ことから示せます。

---

## 6. 上限が和集合で作れる

Dedekind構成の大きな利点は、実数の上限性質が構成からほとんど直接見えることです。

<a id="thm-f0-00d0b-supremum"></a>
<!-- formal-statement-start -->
> **定理（Dedekind実数の上限性質）**  
> $\mathcal A\subseteq\mathbb R_D$ が空でなく、ある $U\in\mathbb R_D$ により上に有界、すなわち
$$
A\subseteq U\qquad(A\in\mathcal A)
$$
> とする。このとき
$$
S:=\bigcup_{A\in\mathcal A}A
$$
> は Dedekind切断であり、
$$
S=\sup\mathcal A
$$
> である。
<!-- formal-statement-end -->

### 証明の見取り図

各切断が「境界より左側全部」なので、その族の和集合が「どれかの境界より左にある有理数全部」です。共通の上界 $U$ があるため、和集合が $\mathbb Q$ 全体まで膨張することはありません。

<!-- proof-start -->
### 証明

$\mathcal A$ は空でなく、各 $A\in\mathcal A$ も空でないので $S$ は空でありません。

全ての $A\in\mathcal A$ が $U$ に含まれるので

$$
S\subseteq U\ne\mathbb Q.
$$

従って $S\ne\mathbb Q$。

$q\in S$ なら、ある $A\in\mathcal A$ が存在して $q\in A$。$p<q$ なら $A$ の下方閉性から $p\in A\subseteq S$。従って $S$ は下方閉です。

$q\in S$ なら、ある $A\in\mathcal A$ で $q\in A$。$A$ は最大元を持たないので、$q<r$ となる $r\in A\subseteq S$ が存在します。従って $S$ も最大元を持ちません。以上から $S\in\mathbb R_D$。

各 $A\in\mathcal A$ は定義から $A\subseteq S$ なので $S$ は上界です。別の上界 $V$ があれば全ての $A\in\mathcal A$ が $V$ に含まれるため

$$
S=\bigcup_{A\in\mathcal A}A\subseteq V.
$$

よって $S$ は最小上界です。$\square$
<!-- proof-end -->

従って

$$
\boxed{\sup\mathcal A=\bigcup_{A\in\mathcal A}A}
$$

です。これは [F0-00A1B](../F0_00A1B_実数の上限性質_Archimedes性/index.md#thm-f0-00a1b-lub) で実数の基本性質として置いた上限性質を、実数構成そのものから実現しています。

<a id="thm-f0-00d0b-complete-ordered-field"></a>
<!-- formal-statement-start -->
> **定理（Dedekind実数は完備順序体）**  
> 上で定めた順序と四則演算により $\mathbb R_D$ は順序体となり、任意の空でない上に有界な部分集合は上限を持つ。従って $\mathbb R_D$ は完備順序体である。
<!-- formal-statement-end -->

### 証明の見取り図

順序体部分は、切断の等号を「同じ有理数を含むか」で判定し、各演算の定義を有理数の体法則へ還元します。完全性部分は直前の定理そのものです。

<!-- proof-start -->
### 証明

加法については前節で閉性を示しました。結合則・交換則は

$$
(a+b)+c=a+(b+c),
\qquad
a+b=b+a
$$

という有理数の恒等式から、切断を構成する元の集合が一致することにより従います。$0^*$ が加法単位元であることは、$A+0^*$ の各元が $A$ に入り、逆に任意の $a\in A$ を最大元なしで少し上の $a'\in A$ と $a=a'+(a-a')$ に分解し、$a-a'<0$ を使えば示せます。上で定義した $-A$ が加法逆元になることも、境界の左右を反転した定義を展開して確認できます。

正の元の乗法についても、有理数の積の結合則・交換則・分配則を使い、各切断への包含を両方向に示すことで体法則が従います。正の標準切断では $r^*s^*=(rs)^*$ であり、逆数の定義は $A\cdot A^{-1}=1^*$ を与えます。符号規則により一般の非零元へ拡張できます。

包含順序が全順序であることは第3節で確認しました。切断演算の定義から、$A\subseteq B$ なら

$$
A+C\subseteq B+C,
$$

また $0^*\le A,B$ なら

$$
0^*\le AB
$$

が従うため、順序と体演算は両立します。従って $\mathbb R_D$ は順序体です。

最後に、空でない上に有界な $\mathcal A\subseteq\mathbb R_D$ には直前の定理により

$$
\sup\mathcal A=\bigcup_{A\in\mathcal A}A
$$

が存在します。従って $\mathbb R_D$ は完備順序体です。$\square$
<!-- proof-end -->

---

## 7. 演習

### F0-00D0B-A01 有理数1の切断

- Level: A
- 目安時間: 8分
- 主題: Dedekind切断
- 使用技術: 定義確認

$$
A=\{q\in\mathbb Q:q<1\}
$$
が Dedekind切断であることを4条件すべてについて確認せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$0\in A$ なので空でなく、$1\notin A$ なので $A\ne\mathbb Q$。$q<1$ かつ $p<q$ なら $p<1$ なので下方閉。さらに $q<1$ なら
$$
r=\frac{q+1}{2}
$$
とすれば $q<r<1$ なので $r\in A$。よって最大元なし。

##### 本番答案
非空・真部分集合・下方閉を確認し、$q\in A$ に対し $(q+1)/2$ を取れば最大元なし。

##### 採点基準
- 非空：4点
- 真部分集合：4点
- 下方閉：6点
- 最大元なし：6点
<!-- solution-end -->

### F0-00D0B-A02 有理数の順序保存

- Level: A
- 目安時間: 7分
- 主題: 有理数埋め込み
- 使用技術: 集合包含

$r,s\in\mathbb Q$ とする。$r<s$ なら $r^*\subsetneq s^*$ を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$q\in r^*$ なら $q<r<s$ なので $q\in s^*$。よって $r^*\subseteq s^*$。一方 $r<s$ だから $r\in s^*$ だが $r\notin r^*$。従って真包含。

##### 本番答案
$q<r$ なら $q<s$。また $r\in s^*\setminus r^*$。よって $r^*\subsetneq s^*$。

##### 採点基準
- 包含：10点
- 真包含の証人 $r$：10点
<!-- solution-end -->

### F0-00D0B-A03 最大元を許すと何が壊れるか

- Level: A
- 目安時間: 8分
- 主題: Dedekind切断の定義
- 使用技術: 反例確認

$$
A=\{q\in\mathbb Q:q\le1\}
$$
について、Dedekind切断の1〜3の条件は満たすが4を満たさないことを示せ。また、条件4を削除すると境界1に二つの表現が生じることを説明せよ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$0\in A$ なので非空、$2\notin A$ なので真部分集合。$q\le1$ かつ $p<q$ なら $p<1$ なので $p\in A$。従って1〜3は満たす。しかし $1\in A$ で、$A$ のどの元も1以下だから1が最大元。従って4を満たさない。

条件4がなければ
$$
\{q:q<1\}
\quad\text{と}\quad
\{q:q\le1\}
$$
がともに同じ境界1を表す候補になり、表現が一意でなくなる。

##### 本番答案
$A$ は非空・真部分集合・下方閉だが最大元1を持つ。条件4を除くと $q<1$ 版と $q\le1$ 版が同じ境界を二重表現する。

##### 採点基準
- 条件1〜3：8点
- 最大元1の指摘：6点
- 二重表現の説明：6点
<!-- solution-end -->

### F0-00D0B-A04 $0^*$ は加法単位元

- Level: A
- 目安時間: 10分
- 主題: 切断の加法
- 使用技術: 最大元なし・下方閉性

任意の Dedekind切断 $A$ に対して
$$
A+0^*=A
$$
を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
まず $x\in A+0^*$ とする。$x=a+b$、$a\in A$, $b<0$ と書けるので $x<a$。$A$ は下方閉だから $x\in A$。よって $A+0^*\subseteq A$。

逆に $x\in A$ とする。$A$ は最大元を持たないので $x<a$ となる $a\in A$ を取れる。$b=x-a<0$ と置けば $b\in0^*$ で
$$
x=a+b\in A+0^*.
$$
従って $A\subseteq A+0^*$。以上から等号。

##### 本番答案
$a+b$ で $b<0$ なら $a+b<a$ なので一方向。逆に $x\in A$ に対し $x<a\in A$ を取り $b=x-a<0$ とすれば $x=a+b$。

##### 採点基準
- $A+0^*\subseteq A$：8点
- 最大元なしの使用：6点
- 逆包含：6点
<!-- solution-end -->

### F0-00D0B-B01 $\sqrt2$ 切断の下方閉性

- Level: B
- 目安時間: 12分
- 主題: 無理数境界の構成
- 使用技術: 場合分け

$$
A=\{q\in\mathbb Q:q<0\text{ または }q^2<2\}
$$
について、$q\in A$、$p<q$ なら $p\in A$ を丁寧に示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$q<0$ なら $p<q<0$ なので $p\in A$。

$q\ge0$ の場合、$q\in A$ だから $q^2<2$。もし $p<0$ なら定義から $p\in A$。$p\ge0$ なら $0\le p<q$ なので
$$
p^2<q^2<2,
$$
従って $p\in A$。全ての場合で下方閉。

##### 本番答案
$q<0$ なら自明。$q\ge0$ なら $q^2<2$。$p<0$ なら定義から、$p\ge0$ なら $p^2<q^2<2$ から従う。

##### 採点基準
- $q<0$ の場合：5点
- $q\ge0,p<0$：5点
- $q\ge0,p\ge0$：10点
<!-- solution-end -->

### F0-00D0B-B02 和集合が上限になる理由

- Level: B
- 目安時間: 15分
- 主題: 順序完備性
- 使用技術: 和集合と包含

空でない上に有界な切断族 $\mathcal A$ に対し
$$
S=\bigcup_{A\in\mathcal A}A
$$
が上界であり、任意の上界 $V$ に対して $S\subseteq V$ となることを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
任意の $A\in\mathcal A$ に対して $A\subseteq S$ なので、包含順序では $A\le S$。従って $S$ は上界。

$V$ が別の上界なら全ての $A\in\mathcal A$ について $A\subseteq V$。よって各 $q\in S$ はある $A\in\mathcal A$ に属し、その $A$ は $V$ に含まれるから $q\in V$。従って $S\subseteq V$。よって $S$ は最小上界。

##### 本番答案
$A\subseteq\bigcup\mathcal A=S$ なので $S$ は上界。任意の上界 $V$ は全ての $A$ を含むので和集合 $S$ も含む。

##### 採点基準
- 上界性：8点
- 任意の上界との比較：8点
- 最小上界の結論：4点
<!-- solution-end -->

### F0-00D0B-B03 $\sqrt2$ 切断に最大元がないことを数式で示す

- Level: B
- 目安時間: 18分
- 主題: Dedekind切断
- 使用技術: 有理摂動・不等式評価

$q\ge0$, $q^2<2$ とする。有理数 $\delta$ を
$$
0<\delta<\min\left\{1,\frac{2-q^2}{2q+1}\right\}
$$
と取れば $(q+\delta)^2<2$ となることを示せ。これを用いて $A_{\sqrt2}$ が最大元を持たないことを示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$\delta<1$ なので $\delta^2<\delta$。従って
$$
\begin{aligned}
(q+\delta)^2
&=q^2+2q\delta+\delta^2\\
&<q^2+(2q+1)\delta\\
&<q^2+(2-q^2)=2.
\end{aligned}
$$
よって $q<q+\delta\in A_{\sqrt2}$。

$q<0$ の場合は $q/2$ が $q$ より大きく、なお負なので $A_{\sqrt2}$ に属する。従って任意の $q\in A_{\sqrt2}$ の上にまだ同じ切断の元があり、最大元はない。

##### 本番答案
$\delta^2<\delta$ より
$$
(q+\delta)^2<q^2+(2q+1)\delta<2.
$$
負の $q$ には $q/2$ を使えばよい。

##### 採点基準
- $\delta^2<\delta$：4点
- 二乗の評価：8点
- 正の場合の結論：4点
- 負の場合と最大元なし：4点
<!-- solution-end -->

### F0-00D0B-C01 切断の和を構成する

- Level: C
- 目安時間: 25分
- 主題: Dedekind実数の加法
- 使用技術: 切断4条件

$A,B$ を Dedekind切断とし
$$
C=A+B=\{a+b:a\in A,b\in B\}
$$
とする。$C$ が Dedekind切断であることを4条件すべてについて示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
非空性は $a\in A,b\in B$ を一つ取れば $a+b\in C$。

$A,B$ は真部分集合なので $u\notin A,v\notin B$ を取る。下方閉性から全ての $a\in A$ で $a<u$、全ての $b\in B$ で $b<v$。従って $a+b<u+v$ なので $u+v\notin C$。よって $C\ne\mathbb Q$。

$c=a+b\in C$、$p<c$ とする。$\delta=c-p>0$ と置くと $a-\delta<a$ なので $a-\delta\in A$。従って
$$
p=(a-\delta)+b\in C.
$$
よって下方閉。

$c=a+b\in C$ とする。$A$ は最大元を持たないので $a<a'$ となる $a'\in A$ がある。すると
$$
c<a'+b\in C.
$$
よって $C$ は最大元を持たない。

##### 本番答案
非空性は代表元の和。$u\notin A,v\notin B$ なら全要素 $a+b<u+v$ なので真部分集合。$p<a+b$ なら $p=(a-\delta)+b$ として下方閉。最大元なしは $a<a'\in A$ と取る。

##### 採点基準
- 非空：4点
- 真部分集合：4点
- 下方閉：6点
- 最大元なし：6点
<!-- solution-end -->

---

## 8. 章末チェック

- Dedekind切断の4条件を具体例で確認できる。
- 最大元を禁止する理由を二重表現の排除として説明できる。
- $A_{\sqrt2}$ の最大元なしを「少し大きく取る」で済ませず、不等式で示せる。
- 有理数の標準切断と順序保存を示せる。
- 切断の加法が切断になることを証明できる。
- 正の積と逆数がどのように定義されるか説明できる。
- 上に有界な切断族の上限が和集合になることを証明できる。
- 上限性質が公理として置かれた事実ではなく、この構成では実際に実現されることを説明できる。

次章では Cauchy 列で作った $\mathbb R_C$ と切断で作った $\mathbb R_D$ が、内部表現は違っても同じ実数体系になることを示します。
