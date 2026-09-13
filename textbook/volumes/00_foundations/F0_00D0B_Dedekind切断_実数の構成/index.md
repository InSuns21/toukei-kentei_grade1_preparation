# F0-00D0B Dedekind切断：順序の穴から実数を作る

Cauchy 完備化は「近似列が着地できる場所を追加する」構成でした。Dedekind 切断は別の方向から、**有理数の順序にある境界を一つの数として採用する**構成です。

例えば $\sqrt2$ 自体をまだ持っていなくても、

$$
\{q\in\mathbb Q:q<0\text{ または }q^2<2\}
$$

という「$\sqrt2$ より左にあるはずの有理数全部」は定義できます。この左側集合を新しい数そのものと考えます。

---

## 1. Dedekind切断

<a id="def-f0-00d0b-cut"></a>
<!-- formal-statement-start -->
> **定義（Dedekind切断）**  
> 部分集合 $A\subset\mathbb Q$ が次の4条件を満たすとき、$A$ を **Dedekind切断** という。
>
> 1. $A\ne\varnothing$。
> 2. $A\ne\mathbb Q$。
> 3. $q\in A$ かつ $p<q$ なら $p\in A$。
> 4. $A$ は最大元を持たない。すなわち任意の $q\in A$ に対し、$q<r$ となる $r\in A$ が存在する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0b-cut -->
### 1.1 例：$\sqrt2$ に対応する切断

$$
A_{\sqrt2}
:=\{q\in\mathbb Q:q<0\text{ または }q^2<2\}
$$

とします。

- $0\in A_{\sqrt2}$ なので空でない。
- $2\notin A_{\sqrt2}$ なので $\mathbb Q$ 全体ではない。
- $q\in A_{\sqrt2}$ で $p<q$ なら、$q\le0$ の場合は $p<0$。$q>0$ なら $0<p<q$ の場合に $p^2<q^2<2$。したがって下方閉。
- $q\in A_{\sqrt2}$ に対して、$q$ より少し大きくてもまだ二乗が2未満となる有理数を取れるので最大元を持たない。

したがってこれは切断です。
<!-- definition-example-end -->

4番目の「最大元なし」が重要です。もし

$$
\{q\in\mathbb Q:q\le1\}
$$

を許すと、同じ境界1に対して

$$
\{q:q<1\}
$$

との二重表現が生じます。最大元を禁止することで表現を一意にします。

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
### 1.2 一つの実数は「左側全部」

$1$ に対応する Dedekind 実数は

$$
\{q\in\mathbb Q:q<1\}
$$

であり、$\sqrt2$ に対応するものは前節の $A_{\sqrt2}$ です。どちらも境界点そのものではなく、境界より左の有理数全体で表現されます。
<!-- definition-example-end -->

---

## 2. 有理数はそのまま埋め込める

各 $r\in\mathbb Q$ に対して

$$
r^*:=\{q\in\mathbb Q:q<r\}
$$

と置きます。

<a id="thm-f0-00d0b-rational-embedding"></a>
<!-- formal-statement-start -->
> **定理（有理数の標準切断）**  
> 各 $r\in\mathbb Q$ に対して $r^*=\{q\in\mathbb Q:q<r\}$ は Dedekind切断であり、写像
$$
\jmath:\mathbb Q\to\mathbb R_D,
\qquad
r\mapsto r^*
$$
> は単射である。
<!-- formal-statement-end -->

### 証明の見取り図

$r^*$ は明らかに $r$ より小さい有理数全部です。最大元がないことだけは、有理数の稠密性を使って $q<q'<r$ を取ります。

<!-- proof-start -->
### 証明

$r-1\in r^*$ なので空でなく、$r\notin r^*$ なので $\mathbb Q$ 全体ではありません。$q<r$ かつ $p<q$ なら $p<r$ なので下方閉です。

$q\in r^*$ なら $q<r$。例えば

$$
q'=rac{q+r}{2}
$$

とすれば $q<q'<r$ なので $q'\in r^*$。したがって最大元を持ちません。

また $r<s$ なら $r\in s^*$ ですが $r\notin r^*$ なので $r^*\ne s^*$。よって $\jmath$ は単射です。$\square$
<!-- proof-end -->

以後、必要に応じて $r$ と $r^*$ を同一視します。

---

## 3. 順序は集合の包含関係になる

<a id="def-f0-00d0b-order"></a>
<!-- formal-statement-start -->
> **定義（Dedekind実数の順序）**  
> $A,B\in\mathbb R_D$ に対して
$$
A\le B\iff A\subseteq B
$$
> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00d0b-order -->
### 3.1 定義の確認

$r<s$ なら

$$
\{q:q<r\}\subsetneq\{q:q<s\},
$$

したがって $r^*<s^*$ です。元の有理数の大小関係がそのまま保存されています。
<!-- definition-example-end -->

Dedekind切断はどれも下方閉なので、二つの切断は包含関係で必ず比較できます。実際 $A\not\subseteq B$ なら $a\in A\setminus B$ があり、$B$ の任意の $b$ は $b<a$ でなければなりません。そうでなければ $a<b\in B$ と下方閉性から $a\in B$ になって矛盾します。したがって $B\subset A$ です。

---

## 4. 加法は「左側どうしを足す」

二つの境界 $x,y$ より左にある有理数を足せば、$x+y$ より左の有理数が得られるはずです。

<a id="thm-f0-00d0b-addition"></a>
<!-- formal-statement-start -->
> **定理（切断の加法）**  
> $A,B\in\mathbb R_D$ に対し
$$
A+B:=\{a+b:a\in A,\ b\in B\}
$$
> と定めると、$A+B$ は Dedekind切断である。この演算は有理数の標準埋め込みと両立し
$$
r^*+s^*=(r+s)^*
$$
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

空でないことは一組 $a\in A,b\in B$ を取ればよいです。下方閉性では、$p<a+b$ なら差

$$
\delta=(a+b)-p>0
$$

を一方の項から少し引いて $p=(a-\delta)+b$ と表します。最大元なしは $a$ を少し大きい $a'\in A$ に取り替えます。

<!-- proof-start -->
### 証明

$A,B$ は空でないので $a\in A,b\in B$ を取れば $a+b\in A+B$。よって空でありません。

また $A\ne\mathbb Q$, $B\ne\mathbb Q$ なので、それぞれ上界となる有理数 $u\notin A$, $v\notin B$ を取れます。下方閉性から $a<u$, $b<v$ が全ての $a\in A,b\in B$ で成り立つので、$a+b<u+v$。したがって $u+v\notin A+B$ で、$A+B\ne\mathbb Q$。

$c=a+b\in A+B$ とし $p<c$ とします。$\delta=c-p>0$ と置けば

$$
a-\delta<a,
$$

なので下方閉性から $a-\delta\in A$。そして

$$
p=(a-\delta)+b\in A+B.
$$

よって下方閉です。

最後に $c=a+b\in A+B$ とします。$A$ は最大元を持たないので $a<a'$ となる $a'\in A$ を取れます。すると

$$
c=a+b<a'+b\in A+B,
$$

よって最大元を持ちません。

$r^*+s^*=(r+s)^*$ は、$a<r,b<s$ なら $a+b<r+s$ で一方向が従い、逆に $q<r+s$ なら十分小さい正有理数 $\varepsilon$ を取り

$$
a=r-\varepsilon,
\qquad b=q-a<s
$$

と分解できることから従います。$\square$
<!-- proof-end -->

零元は $0^*=\{q:q<0\}$ です。加法逆元は境界を反転させるように定義できます。具体的には

$$
-A:=\{q\in\mathbb Q:\exists r\notin A\text{ with }q<-r\}
$$

とすれば再び切断になります。

正の切断 $A,B>0^*$ に対しては

$$
A\cdot B
:=\{q\le0\}
\cup
\{q>0:\exists a\in A,\exists b\in B,
\ 0<a,0<b,\ q<ab\}
$$

と定義し、符号を使って一般の場合へ拡張します。この定義は有理数の積と両立し、逆数も構成できます。

---

## 5. 上限が「和集合」で作れる

Dedekind構成の最大の利点は、実数の上限性質が構成からほとんど直接出ることです。

<a id="thm-f0-00d0b-supremum"></a>
<!-- formal-statement-start -->
> **定理（Dedekind実数の上限性質）**  
> $\mathcal A\subseteq\mathbb R_D$ が空でなく、ある $U\in\mathbb R_D$ によって上に有界、すなわち
$$
A\subseteq U\qquad(A\in\mathcal A)
$$
> とする。このとき
$$
S:=\bigcup_{A\in\mathcal A}A
$$
> は Dedekind切断であり
$$
S=\sup\mathcal A
$$
> である。
<!-- formal-statement-end -->

### 証明の見取り図

各切断が「左側全部」なので、切断族全部を合わせた和集合が「どれかの切断より左にある有理数全部」になります。上界 $U$ があるので和集合が $\mathbb Q$ 全体へ膨張することはありません。

<!-- proof-start -->
### 証明

$\mathcal A$ は空でなく、各 $A\in\mathcal A$ も空でないので $S$ は空でありません。

全ての $A\in\mathcal A$ が $U$ に含まれるので

$$
S\subseteq U\ne\mathbb Q.
$$

したがって $S\ne\mathbb Q$。

$q\in S$ なら、ある $A\in\mathcal A$ が存在して $q\in A$。$p<q$ なら $A$ の下方閉性から $p\in A\subseteq S$。よって $S$ は下方閉です。

$q\in S$ ならある $A\in\mathcal A$ で $q\in A$。$A$ は最大元を持たないので、$q<r$ となる $r\in A\subseteq S$ が存在します。したがって $S$ も最大元を持ちません。以上から $S\in\mathbb R_D$。

各 $A\in\mathcal A$ は定義から $A\subseteq S$ なので $S$ は上界です。別の上界 $V$ があれば全ての $A\in\mathcal A$ が $V$ に含まれるため

$$
S=\bigcup_{A\in\mathcal A}A\subseteq V.
$$

よって $S$ は最小上界です。$\square$
<!-- proof-end -->

この一行

$$
\boxed{\sup\mathcal A=\bigcup_{A\in\mathcal A}A}
$$

が、[F0-00A1B](../F0_00A1B_実数の上限性質_Archimedes性/index.md#thm-f0-00a1b-lub) で基本性質として置いた上限性質の「構成側からの根拠」です。

<a id="thm-f0-00d0b-complete-ordered-field"></a>
<!-- formal-statement-start -->
> **定理（Dedekind実数は完備順序体）**  
> 上で定めた順序と四則演算により $\mathbb R_D$ は順序体となり、さらに任意の空でない上に有界な部分集合が上限を持つ。したがって $\mathbb R_D$ は完備順序体である。
<!-- formal-statement-end -->

四則演算の体公理は集合演算の定義を逐一確認して得られます。解析で本質的な新事実は、前定理の上限性質です。

---

## 6. 演習

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
空でなく真部分集合。下方閉であり、$q\in A$ なら $(q+1)/2\in A$ かつ $q<(q+1)/2$。ゆえに切断。
##### 採点基準
- 非空：4点
- 真部分集合：4点
- 下方閉：6点
- 最大元なし：6点
<!-- solution-end -->

### F0-00D0B-A02 有理数の順序保存

- Level: A
- 目安時間: 7分
- 主題: 標準埋め込み
- 使用技術: 集合包含

$r,s\in\mathbb Q$ とする。$r<s$ なら $r^*\subsetneq s^*$ を示せ。

<!-- solution-start -->
#### 解答
##### 詳細解答
$q\in r^*$ なら $q<r<s$ なので $q\in s^*$。よって $r^*\subseteq s^*$。一方 $r<s$ だから $r\in s^*$ だが、$r<r$ ではないため $r\notin r^*$。従って真包含。
##### 本番答案
$q<r$ なら $q<s$。また $r\in s^*\setminus r^*$。よって $r^*\subsetneq s^*$。
##### 採点基準
- 包含：10点
- 真包含の証人 $r$：10点
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
$q<0$ なら自明。$q\ge0$ なら $q^2<2$。$p<0$ なら定義から、$p\ge0$ なら $p^2<q^2<2$ から $p\in A$。
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
$A\subseteq\bigcup\mathcal A=S$ なので $S$ は上界。任意の上界 $V$ は全ての $A$ を含むので、その和集合 $S$ も含む。従って $S=\sup\mathcal A$。
##### 採点基準
- 上界性：8点
- 任意の上界との比較：8点
- 最小上界の結論：4点
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

$A,B$ は真部分集合なので $u\notin A,v\notin B$ を取る。下方閉性から全ての $a\in A$ で $a<u$、全ての $b\in B$ で $b<v$。したがって $a+b<u+v$ なので $u+v\notin C$。よって $C\ne\mathbb Q$。

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
非空性は代表元の和でよい。$u\notin A,v\notin B$ なら全要素 $a+b<u+v$ なので真部分集合。$p<a+b$ なら $p=(a-\delta)+b$、$\delta=a+b-p>0$ として下方閉。最大元なしは $a<a'\in A$ と取り $a+b<a'+b$。
##### 採点基準
- 非空：4点
- 真部分集合：4点
- 下方閉：6点
- 最大元なし：6点
<!-- solution-end -->

---

## 7. 章末チェック

- Dedekind切断の4条件を具体例で確認できる。
- 最大元を禁止する理由を説明できる。
- 有理数の標準埋め込みと順序保存を示せる。
- 切断の加法が切断になることを証明できる。
- 上に有界な切断族の上限が和集合になることを証明できる。
- 上限性質が「公理として置かれた事実」ではなく、構成から実現できることを説明できる。

次章では Cauchy 列で作った $\mathbb R_C$ と切断で作った $\mathbb R_D$ が、表現は違っても同じ実数体系になることを示します。
