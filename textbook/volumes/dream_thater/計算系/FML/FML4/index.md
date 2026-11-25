# FML4 距離・完備性・極限・Laurent級数の形式化

前提：[FML2](../FML2/index.md)、[FML3](../FML3/index.md)、[距離空間](../../../基礎科目/F0/F0-00B/index.md)、[距離位相](../../../基礎科目/F0/F0-00B1/index.md)、[RA1](../../../基礎科目/RA/RA1/index.md)、[TOP6](../../../基礎科目/TOP/TOP6/index.md)、[TOP7](../../../基礎科目/TOP/TOP7/index.md)、[ACOMP21](../../ACOMP/ACOMP21/index.md)、[ACOMP22](../../ACOMP/ACOMP22/index.md)。

前講では形式多項式の等式と、数値を代入して得る等式を区別しました。今回は近似に関する主張を型と量化で区別します。例えば実数列 $1/(n+1)$ は0に近づきます。一方、形式級数の $t^n$ が0に近づくという主張は、$t$ に数値を代入することではありません。どの空間で、どの近さを使い、何を極限とするのかをLeanの定理にも明示しましょう。

## 1. 距離と収束を型で指定する

[距離空間の定義](../../../基礎科目/F0/F0-00B/index.md#def-f0-00b-01)では距離関数が非負性、零点の分離、対称性、三角不等式を満たします。Leanの MetricSpace X は型 X にその距離と整合する位相と[一様構造](../../../基礎科目/TOP/TOP7/index.md#thm-top7-metric-uniformity)（点同士の近さの情報）を与えます。実数の絶対値距離はその一例です。点列 u は自然数から X への関数です。

Leanで Filter.atTop は自然数の十分大きい添字を含む集合族、𝓝 a は点 a の近傍からなる[filter](../../../基礎科目/TOP/TOP6/index.md#def-top6-filter)を表します。Lean の Filter 型は空集合を含む退化した場合も許しますが、この二つは空集合を含まない filter です。Filter.Tendsto u atTop (𝓝 a) が意味することは、a の任意の近傍に u の十分後ろの項が入ることです。[距離収束と位相収束の一致](../../../基礎科目/F0/F0-00B1/index.md#thm-f0-00b1-metric-convergence)により、距離の不等式へ変換できます。Mathlib の Metric.tendsto_atTop がこの変換を担当します。

極限点を先に指定しなくても、列の後半同士が近いことを判定できます。[実数列の Cauchy 条件](../../../基礎科目/RA/RA1/index.md#def-ra1-cauchy)を任意の距離空間へ拡張したものを CauchySeq u で表します。[距離Cauchy列とCauchy filter](../../../基礎科目/TOP/TOP7/index.md#prop-top7-sequence-cauchy-filter)の対応によって、一様構造の上でも同じ型の命題を使えます。

<a id="def-fml4-cauchy-interface"></a>

<!-- formal-statement-start -->
### 定義（Leanでの距離とCauchy条件の記述）

距離空間 X と点列 $u:\mathbb N\to X$ を取る。Leanでは距離空間を [MetricSpace X]、点 a への収束を Tendsto u atTop (𝓝 a)、Cauchy列であることを CauchySeq u と記述する。後二者は距離空間ではそれぞれ次の条件と同値である。

$$
\forall\varepsilon>0,\ \exists N,\ \forall n\ge N,\ d(u_n,a)<\varepsilon,
$$

$$
\forall\varepsilon>0,\ \exists N,\ \forall m,n\ge N,\ d(u_m,u_n)<\varepsilon.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml4-cauchy-interface -->
**定義の確認**：通常の実数直線を使い、$u_n=2$ とします。距離は $d(x,y)=|x-y|$ です。任意の正の ε に対して N=0 を取れば $d(u_n,2)=0<\varepsilon$、さらに $d(u_m,u_n)=0<\varepsilon$ が全添字で成立します。従ってこの列は2に収束し、Cauchy列でもあります。自然数から実数への関数という型も確定しています。
<!-- definition-example-end -->

二番目の条件では N が ε に依存してよい一方、m,n ごとに N を選び直してはいけません。Leanで条件を導入するときの順序もこれに合わせます。

## 2. 収束からCauchy条件へ

極限が存在する場合は、完備性を仮定しなくても後半の項が近づくことを証明できます。各項から極限までの距離を半分の許容誤差に抑えます。

<a id="thm-fml4-convergence-cauchy"></a>

<!-- formal-statement-start -->
### 定理（収束からCauchy条件への形式化）

距離空間 X の点列 u と点 a を取る。Tendsto u atTop (𝓝 a) が成立するなら CauchySeq u が成立する。
<!-- formal-statement-end -->

見取り図：ε を正に固定し、収束の条件で ε/2 を選択します。m,n に同じ N を使うことが要点です。

<!-- proof-start -->
### 証明

[距離による収束の条件](#def-fml4-cauchy-interface)を ε/2 に適用する。ε>0 なので ε/2>0 であり、ある N についてすべての $n\ge N$ で $d(u_n,a)<\varepsilon/2$ となる。任意の $m,n\ge N$ に対して [距離の三角不等式と対称性](../../../基礎科目/F0/F0-00B/index.md#def-f0-00b-01)を用いると

$$
\begin{aligned}
d(u_m,u_n)
&\le d(u_m,a)+d(a,u_n)\\
&=d(u_m,a)+d(u_n,a)\\
&<\varepsilon/2+\varepsilon/2=\varepsilon.
\end{aligned}
$$

よって [Cauchy条件](#def-fml4-cauchy-interface)が成り立つ。
<!-- proof-end -->

Leanでは次のように論証の各段階を表します。

~~~lean
theorem convergence_cauchy {X : Type*} [MetricSpace X]
    {u : Nat → X} {a : X}
    (h : Tendsto u atTop (𝓝 a)) : CauchySeq u := by
  rw [Metric.cauchySeq_iff]
  intro ε hε
  obtain ⟨N, hN⟩ :=
    Metric.tendsto_atTop.mp h (ε / 2) (by linarith)
  refine ⟨N, ?_⟩
  intro m hm n hn
  have h1 := hN m hm
  have h2 := hN n hn
  calc
    dist (u m) (u n) ≤ dist (u m) a + dist a (u n) :=
      dist_triangle _ _ _
    _ < ε := by
      rw [dist_comm a (u n)]
      linarith
~~~

rw は結論を距離条件へ置き換えます。obtain で N と、その N が満たす条件 hN を取り出します。hm,hn はそれぞれ N≤m,N≤n の証明です。最後の linarith は二つの厳密不等式を足す計算を行います。距離の三角不等式自体はその前に渡してあります。

## 3. 完備性は極限の存在を保証する

収束からCauchy条件への向きと、その逆向きでは必要な仮定が異なります。実数の完備性は[実数列のCauchy判定](../../../基礎科目/RA/RA1/index.md#thm-ra1-real-completeness)で学びました。一般の距離空間でも、すべてのCauchy列の極限がその空間に存在するという性質が重要です。[完備一様空間](../../../基礎科目/TOP/TOP7/index.md#def-top7-complete-uniform-space)では点列に限らず Cauchy filter の収束を要求します。距離空間では両条件が一致し、Mathlib の Metric.complete_of_cauchySeq_tendsto は点列から完備性へ戻す向きの定理です。

<a id="def-fml4-completeness-interface"></a>

<!-- formal-statement-start -->
### 定義（Leanでの完備性の指定）

距離空間 X が完備であるとは、任意のCauchy列が X の点に収束することである。Leanの CompleteSpace X は一様構造の完備性を表す型クラスであり、距離空間ではこの点列による条件と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml4-completeness-interface -->
**定義の確認**：X を通常の距離を持つ実数全体とする。任意の CauchySeq u に対して距離条件に直し、[実数の完備性](../../../基礎科目/RA/RA1/index.md#thm-ra1-real-completeness)を適用すると実数 a が存在し、任意の ε>0 に対し十分大きい n で $|u_n-a|<\varepsilon$ となる。距離収束を位相収束へ戻せば Tendsto u atTop (𝓝 a) となる。この全称量化された性質を利用できる実数の CompleteSpace インスタンスがMathlibにある。
<!-- definition-example-end -->

点列による条件から一様構造の完備性へ戻す理由を確認します。[Cauchy filter](../../../基礎科目/TOP/TOP7/index.md#def-top7-cauchy-filter)を一つ取ります。各自然数 j についてその filter に属する集合 $A_j$ で、$x,y\in A_j$ なら $d(x,y)<2^{-j}$ となるものを選びます。有限交差

$
B_n=A_0\cap\cdots\cap A_n
$

は filter に属し、空でないので $x_n\in B_n$ を選べます。$m,n\ge N$ なら $x_m,x_n\in B_N\subset A_N$ なので $d(x_m,x_n)<2^{-N}$。任意の ε>0 に対し $2^{-N}<\varepsilon$ とできるため、この列はCauchy列です。

点列の完備性を仮定すれば、ある a に $x_n$ が収束します。任意の ε>0 に対して、$2^{-n}<\varepsilon/2$ かつ $d(x_n,a)<\varepsilon/2$ となる n を取ります。任意の $y\in B_n$ について $x_n,y\in A_n$ なので

$
d(y,a)\le d(y,x_n)+d(x_n,a)
<2^{-n}+\varepsilon/2<\varepsilon.
$

したがって a の ε 近傍は $B_n$ を含むため filter に属します。[filter の収束](../../../基礎科目/TOP/TOP6/index.md#def-top6-filter-convergence)の定義から a に収束します。逆向きは点列の tail が作る Cauchy filter に完備性を適用し、[距離Cauchy列とCauchy filter](../../../基礎科目/TOP/TOP7/index.md#prop-top7-sequence-cauchy-filter)および [netとfilterの収束対応](../../../基礎科目/TOP/TOP6/index.md#thm-top6-net-filter-correspondence)を使えば従います。ラボの complete_characterization は Mathlib の両方向の定理を使って、この同値を証明します。

<a id="thm-fml4-complete-limit"></a>

<!-- formal-statement-start -->
### 定理（完備性を仮定した極限の存在）

距離空間 X が完備であり、点列 u が CauchySeq u を満たすとする。このとき X に u の極限が存在し、その極限は一意である。
<!-- formal-statement-end -->

見取り図：存在には完備性を、極限の一意性には距離の分離性を使います。Leanで存在だけを取り出す命題と一意性の主張は別々に書くことができます。

<!-- proof-start -->
### 証明

[完備性の条件](#def-fml4-completeness-interface)を u に適用して極限 a を得る。もう一つの極限 b があると仮定する。[距離空間における極限の一意性](../../../基礎科目/F0/F0-00B/index.md#prop-f0-00b-01)により a=b である。ここでは距離空間の仮定があるためこの結果を適用できる。
<!-- proof-end -->

~~~lean
theorem complete_limit {X : Type*} [MetricSpace X]
    [CompleteSpace X] {u : Nat → X}
    (h : CauchySeq u) : ∃ a, Tendsto u atTop (𝓝 a) :=
  cauchySeq_tendsto_of_complete h
~~~

このコードの結論は存在だけです。一意性まで含めるなら ExistsUnique を使い、complete_limit で得た a に対して、別の極限 b の収束証明 hb と a の収束証明 ha を tendsto_nhds_unique に渡します。ラボの complete_limit_unique はこの追加の主張を証明します。

反例として X=(0,1) に通常の実数距離を制限し、$u_n=1/(n+2)$ とします。各項は正で1未満です。任意の ε>0 に対し $N+2>2/\varepsilon$ となる N を選ぶと

$$
|u_m-u_n|\le u_m+u_n\le 2/(N+2)<\varepsilon
$$

です。しかし実数内での極限は0であり、X に0はありません。X 内の極限があれば同じ距離で実数内でも極限となり、一意性により0と一致しなければなりません。この矛盾から X は完備ではありません。逆向きに必要だったのは、列の極限を同じ空間にとどめる仮定です。

## 4. Laurent級数を係数で読む

[形式 Laurent 級数](../../ACOMP/ACOMP21/index.md#def-acomp21-formal-laurent)では係数の添字は整数で、非零係数の添字に下限があります。Mathlib の LaurentSeries K は HahnSeries ℤ K の略記です。Hahn級数は非零係数の添字集合が整礎な順序集合となる形式級数であり、整数添字の場合は下に有界という条件に対応します。ここで整礎とは非空部分集合が最小元を持つことです。複素解析で後に学ぶ[Laurent級数](../../../解析系/CA/CA4/index.md#def-ca4-laurent-series)とは異なり、ここでは負の指数に下限があり、数値を代入した級数の収束は要求しません。整数の下に有界な集合の各非空部分集合は、下限を引いて自然数の部分集合へ移せば最小元を持ちます。逆に非空の整礎な整数集合はそれ自身が最小元を持ちます。空の台は下に有界です。

<a id="def-fml4-laurent-interface"></a>

<!-- formal-statement-start -->
### 定義（LeanでのLaurent級数の係数表示）

体 K 上の形式 Laurent 級数を Lean では LaurentSeries K と表す。整数 i に対する f.coeff i は i 次の係数であり、HahnSeries.single i a は i 次の係数だけが a で他の係数が零である単項式を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml4-laurent-interface -->
**定義の確認**：K を有理数体とし、$f=3t^{-2}+2t$ とする。非零係数の添字は -2 と1で、下限 -2 が存在する。single (-2) 3 と single 1 2 の和として表せる。f.coeff (-2)=3、f.coeff 0=0、f.coeff 1=2 であり、残りの係数も零である。
<!-- definition-example-end -->

単項式同士の積の指数は足されます。[形式 Laurent 級数の積](../../ACOMP/ACOMP21/index.md#def-acomp21-formal-laurent)に $f=at^i$、$g=bt^j$ を入れると、k 次の係数が非零になり得るのは和の添字が i+j=k のときだけで、その係数は ab です。Mathlib の HahnSeries.single_mul_single はこの係数計算を等式にしています。

## 5. 近似の精度は一致する係数の範囲で測る

実数の距離の代わりに、どこまでの低い指数の係数が一致するかを考えます。[t 進付値](../../ACOMP/ACOMP21/index.md#def-acomp21-t-adic-order)を用い、差が零なら距離を0、そうでなければ $d_t(f,g)=2^{-v_t(f-g)}$ とすると、近似精度が数値になります。ここで2は距離を定める実数であり、係数体の標数とは無関係です。Mathlibではこれと同じ近さを与える乗法的な付値を使います。値 exp(-D) は整数指数 -D に対応する順序付き乗法群に零を加えた値で、実数の自然指数関数ではありません。零級数の値は0です。

<a id="thm-fml4-coeff-agreement"></a>

<!-- formal-statement-start -->
### 定理（付値による係数一致の形式化）

体 K 上の Laurent 級数 f,g と整数 D を取る。次の二条件は同値である。

$$
v_t(f-g)\ge D,
$$

$$
\forall i<D,\quad [t^i]f=[t^i]g.
$$

Mathlibの乗法的な付値では第一条件を Valued.v (f-g) ≤ exp (-D) と表す。
<!-- formal-statement-end -->

見取り図：差の各係数が零になることと、二つの級数の係数が等しいことを対応させます。付値の不等号が逆向きになる点に注意します。

<!-- proof-start -->
### 証明

差 h=f-g を取る。[t 進付値の定義](../../ACOMP/ACOMP21/index.md#def-acomp21-t-adic-order)より h=0 なら付値は無限大で、全係数が零である。h が非零なら、最小非零指数が D 以上であることは D 未満のすべての係数が零であることと同値である。従っていずれの場合も

$$
v_t(h)\ge D
\quad\Longleftrightarrow\quad
\forall i<D,\ [t^i]h=0.
$$

[形式 Laurent 級数の係数演算](../../ACOMP/ACOMP21/index.md#def-acomp21-formal-laurent)より $[t^i]h=[t^i]f-[t^i]g$ であり、体の加法群で差が零なら、かつそのときに限り二係数は等しい。これを各 i に適用して主張を得る。
<!-- proof-end -->

例えば $f=t^{-1}+1+2t^3$、$g=t^{-1}+1$ なら差は $2t^3$ です（係数体は有理数体）。D=3 までは条件を満たし、D=4 では指数3の係数が異なるため失敗します。有限精度で一致しても級数の等式とは限りません。

Leanでは LaurentSeries.valuation_le_iff_coeff_lt_eq_zero で差の付値条件を係数の条件へ置き換え、HahnSeries.coeff_sub と sub_eq_zero で係数の一致へ進みます。

~~~lean
theorem coeff_agreement {K : Type*} [Field K]
    (f g : LaurentSeries K) (D : ℤ) :
    Valued.v (f - g) ≤ exp (-D : ℤ) ↔
      ∀ i : ℤ, i < D → f.coeff i = g.coeff i := by
  rw [LaurentSeries.valuation_le_iff_coeff_lt_eq_zero K]
  constructor
  · intro h i hi
    exact sub_eq_zero.mp (by simpa only [HahnSeries.coeff_sub] using h i hi)
  · intro h i hi
    rw [HahnSeries.coeff_sub, h i hi, sub_self]
~~~

constructor で同値の二方向を分けます。第一の h は差の係数が零という条件、第二の h は係数が等しいという条件です。どちらも hi が i<D の証明なので、その指数についてだけ条件を使っています。

## 6. Laurent級数の完備性

$t$ 進距離が本当に距離であることも確認できます。非零の差の付値は整数なので距離は正です。符号を反転しても非零係数の添字は変わらないため対称性が成立します。[付値の和の演算則](../../ACOMP/ACOMP21/index.md#thm-acomp21-valuation-rules)により

$$
d_t(f,h)\le\max\{d_t(f,g),d_t(g,h)\}
$$

となります。これは差 $f-h=(f-g)+(g-h)$ に和の演算則を適用し、指数関数 $2^{-x}$ が減少することを使ったものです。差が零の場合も定義通り成立します。右辺は二距離の和以下なので三角不等式が従います。

<a id="thm-fml4-laurent-complete"></a>

<!-- formal-statement-start -->
### 定理（Laurent級数の完備性と係数安定化）

任意の体 K に対し、形式 Laurent 級数体 $K((t))$ は上で定めた $t$ 進距離に関して完備である。そのCauchy列の極限の各係数は、列の同じ指数の係数の最終的な一定値である。
<!-- formal-statement-end -->

見取り図：Cauchy条件によって、低次の係数がまとめて変化しなくなります。ただし、各係数の最終値を並べるだけでは Laurent 級数になるとは限りません。負の指数に共通の下限を作るのが核心です。

<!-- proof-start -->
### 証明

Cauchy列を $(f_n)$ とする。各整数 D に対して ε=$2^{-D}$ を選ぶと、ある N(D) が存在して $m,n\ge N(D)$ なら $d_t(f_m,f_n)<2^{-D}$ である。差が非零なら $v_t(f_m-f_n)>D$、差が零なら付値は無限大である。従って [付値による係数一致](#thm-fml4-coeff-agreement)より D 未満の全係数が同時に一致する。

整数 i を固定し D=i+1 とすれば、$n\ge N(i+1)$ に対して i 次の係数が一定である。その値を $a_i$ とする。

次に D=0 の N(0) を取る。$f_{N(0)}$ の非零係数の添字には整数の下限 L がある。$i<\min(L,0)$ なら $[t^i]f_{N(0)}=0$ であり、$n\ge N(0)$ の全項で i 次係数はこの値に等しい。さらに $n\ge N(i+1)$ も満たす n を取れば $a_i=0$ である。よって $a_i$ の非零添字には下限 $\min(L,0)$ がある。[形式 Laurent 級数の定義](../../ACOMP/ACOMP21/index.md#def-acomp21-formal-laurent)を満たすので $f=\sum_i a_it^i$ が存在する。

任意の ε>0 に対し $2^{-D}<\varepsilon$ となる正整数 D を取る。$n\ge N(D)$ であれば各 $i<D$ について、$m\ge\max(N(D),N(i+1))$ と選べば

$$
[t^i]f_n=[t^i]f_m=a_i=[t^i]f
$$

である。従って [係数一致の定理](#thm-fml4-coeff-agreement)により $v_t(f_n-f)\ge D$ である。距離は $d_t(f_n,f)\le 2^{-D}<\varepsilon$ となり、f への収束が示された。極限は距離空間で一意である。
<!-- proof-end -->

例えば $f_n=1+t+\cdots+t^n$ では、任意の固定した指数以下の係数が十分後ろで固定されます。負の係数は常に零なので極限は $1+t+t^2+\cdots$ です。逆に $g_n=1+t^{-1}+\cdots+t^{-n}$ も個々の係数は最終的に一定ですが、m>n なら差の最小非零指数は -m で、距離は $2^m$ になります。Cauchy列ではなく、係数の最終値には下限がありません。

Mathlibの LaurentSeries.instLaurentSeriesComplete は、この種の議論を点列だけでなくフィルターに対して行う完備性のインスタンスです。係数体 K に通常の実数距離や完備性を別途要求しません。非零の差に対して Mathlib の乗法的付値が exp(-D) 未満という近さは、ここでの距離が $2^{-D}$ 未満という近さに対応し、零の差では両方の不等式が成立します。これらの近さが整数 D を増やすごとに狭まるため、同じ一様構造を定めます。Laurent級数上の一様構造に対する CompleteSpace を使うと、CauchySeq u から Tendsto u atTop (𝓝 a) の存在を得られます。単なる係数ごとの一致の列と、付値に関するCauchy列とを混同しないようにしましょう。

## 7. 定数項への特殊化と極の打消し

[定数項への特殊化](../../ACOMP/ACOMP21/index.md#thm-acomp21-specialization)では負の指数のない級数に対して定数項を取り出す写像が環準同型になります。Leanでは PowerSeries.constantCoeff がその写像であり、定義域は PowerSeries K です。LaurentSeries の係数抽出は任意の整数指数で可能ですが、その定数項抽出は一般には乗法を保存しません。

<a id="prop-fml4-constant-coeff"></a>

<!-- formal-statement-start -->
### 命題（定数項抽出の定義域による乗法保存の差）

任意の体 K に対し、PowerSeries K 上の PowerSeries.constantCoeff は積を保存する。一方、LaurentSeries K 上の写像 f ↦ f.coeff 0 は積を保存しない。
<!-- formal-statement-end -->

見取り図：非負指数の和が0になるのは両指数が0の場合だけですが、負の指数を許すと別の組が現れます。

<!-- proof-start -->
### 証明

形式冪級数の積の定数項では添字 i,j が非負で i+j=0 を満たすので i=j=0 である。従って [定数項への特殊化](../../ACOMP/ACOMP21/index.md#thm-acomp21-specialization)が与える通り積の定数項は各定数項の積になる。

Laurent級数で f=t、g=t^{-1} を取る。どちらの定数項も零であるが、積は $t^{1+(-1)}=1$ で定数項は1である。体では1≠0なので積を保存しない。
<!-- proof-end -->

Leanでは環準同型の map_mul を PowerSeries.constantCoeff に適用できます。対して単項式を二つ掛けた例は HahnSeries.single_mul_single で確認します。

[回路の形式的退化](../../ACOMP/ACOMP22/index.md#def-acomp22-degeneration)で $a=t,b=t^{-1}$ とし、出力 $a(bx+y)$ を計算すると

$$
t(t^{-1}x+y)=x+ty
$$

です。係数 x の部分は $tt^{-1}=1$、y の部分は t なので負の指数は残りません。ここで初めて定数項を取り出して x が得られます。入力の定数項を先に取り出すと積の1が失われます。またこの出力は x と形式的に等しいわけではなく、差 ty の係数は正の付値を持ちます。

## 8. Leanの実行

前講と同じ固定版 Lean 4.35.0 と Mathlib コミットを使用します。

~~~bash
cd "textbook/volumes/dream_thater/計算系/FML/FML4/lab"
lean --version
lake exe cache get
lake build
lake env lean Inspect.lean
lake env lean Failure.lean
~~~

[FmlMetric.lean](lab/FmlMetric.lean) では距離による収束からCauchy条件、完備性から極限の存在、Laurent級数の係数一致と完備性、特殊化の積と反例を検査します。[Inspect.lean](lab/Inspect.lean) では命題の依存公理を表示します。[Failure.lean](lab/Failure.lean) は Laurent級数全体の定数項抽出を乗法的と誤認した場合の失敗例です。最後のコマンドは失敗することが期待されます。定理の型、仮定、結論とエラーの箇所を読み比べてください。ソースの complete_characterization は完備性の同値を、complete_limit_unique は一意性を含む極限の存在を検査します。

## 9. 演習と詳細解答

### Level A

### FML4-A01 量化の順序

通常の実数距離を持つ列 $u_n=3$ に対して CauchySeq u の距離条件を確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Cauchy条件](#def-fml4-cauchy-interface)より、任意の ε>0 を先に固定する。N=0 とすればすべての $m,n\ge0$ で $|3-3|=0<\varepsilon$ となる。一つの N ですべての後続の添字を扱えるので条件を満たす。
<!-- solution-end -->

### FML4-A02 収束をCauchy条件へ変換する

点列 u が距離空間の点 a に収束するとする。ε=0.1 に対する Cauchy 条件を示すため、収束条件にどの値を入れるか。三角不等式の右辺まで書け。

- Level: A

<!-- solution-start -->
#### 詳細解答

[収束からCauchy条件への形式化](#thm-fml4-convergence-cauchy)と同じく ε/2=0.05 を入れる。収束条件により N が存在し、$m,n\ge N$ なら $d(u_m,a)<0.05$、$d(u_n,a)<0.05$ である。距離の対称性から $d(a,u_n)=d(u_n,a)$ なので、三角不等式により

$$
d(u_m,u_n)\le d(u_m,a)+d(u_n,a)<0.05+0.05=0.1.
$$
<!-- solution-end -->

### FML4-A03 Laurent級数の添字

有理数体上の $f=4t^{-3}-2t^2$ を単項式の和で表し、指数 -3,0,2 の係数を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[LeanでのLaurent級数の係数表示](#def-fml4-laurent-interface)より HahnSeries.single (-3) 4 と HahnSeries.single 2 (-2) の和である。指数の下限は -3 で、指定した三係数は順に4,0,-2 となる。
<!-- solution-end -->

### FML4-A04 一致する範囲

有理数体上で $f=1+t^2$、$g=1+3t^2$ とする。すべての i<D に対して係数が一致する最大の整数 D を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

差は $f-g=-2t^2$ である。指数2の係数 -2 は有理数体で非零であり、それより低い係数はすべて零である。従って [係数一致の定理](#thm-fml4-coeff-agreement)で付値が2なので D=2 は成立し、D=3 は i=2 を含むため失敗する。最大値は2である。
<!-- solution-end -->

### FML4-A05 定数項

有理数体上で $f=2t^{-2}$、$g=3t^2$ とする。積の定数項と定数項の積を求め、Leanでの型の選択を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[形式 Laurent 級数の積](../../ACOMP/ACOMP21/index.md#def-acomp21-formal-laurent)より単項式の指数は -2+2=0、係数の積は6なので fg=6 であり定数項は6である。f と g の定数項は0なので積は0である。[定数項抽出の定義域による差](#prop-fml4-constant-coeff)より LaurentSeries K の一般の係数抽出には map_mul を適用できない。f が負の指数を持つため、PowerSeries K を二入力の型として使うこともできない。
<!-- solution-end -->

### Level B

### FML4-B01 完備性を外す

通常の実数距離を持つ部分空間 X=(0,2) の列 $u_n=2-1/(n+1)$ が Cauchy列であるが X で収束しないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$n\ge0$ で $0<1/(n+1)\le1$ なので $1\le u_n<2$ であり全項は X に属する。任意の ε>0 に対して $N+1>2/\varepsilon$ となる自然数 N を選ぶ。$m,n\ge N$ なら

$$
|u_m-u_n|\le 1/(m+1)+1/(n+1)\le 2/(N+1)<\varepsilon.
$$

従って Cauchy列である。実数直線では $|u_n-2|=1/(n+1)$ が零に収束するので極限は2である。もし X で極限 a が存在すれば、距離は同じなので実数直線でも極限 a を持つ。[距離空間における極限の一意性](../../../基礎科目/F0/F0-00B/index.md#prop-f0-00b-01)から a=2 となるが2は X の元ではない。従って [完備性を仮定した極限の存在](#thm-fml4-complete-limit)で使う CompleteSpace X は仮定できない。
<!-- solution-end -->

### FML4-B02 一様な精度と個別の係数

$f_n=t^{-n}$ を有理数体上の Laurent級数とする。各固定指数 i の係数が最終的に零になることと、この列が $t$ 進距離では Cauchy列でないことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

i を固定すると、$[t^i]f_n$ が1となるのは i=-n の場合だけであり、そのような n は高々一つである。以後の値は零になる。一方、m>n なら差 $f_m-f_n=t^{-m}-t^{-n}$ の最小非零指数は -m である。従って距離は $2^m$ となる。ε=1 としたとき任意の N について n=N,m=N+1 を選ぶと距離は1以上であり、[Cauchy条件](#def-fml4-cauchy-interface)が失敗する。指数ごとに別の N を選ぶ条件は、[係数一致の定理](#thm-fml4-coeff-agreement)に現れる低次の全係数を同時に一致させる条件より弱い。
<!-- solution-end -->

### FML4-B03 係数で完備性を使う

有理数体上で $s_n=\sum_{k=0}^n t^{2k}$ とする。この列がCauchy列であり、その極限 s が $(1-t^2)s=1$ を満たすことを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

m>n なら $s_m-s_n=\sum_{k=n+1}^{m}t^{2k}$ で、最小非零指数は2(n+1)である。距離は $2^{-2(n+1)}$。任意の ε>0 に対して $2^{-2(N+1)}<\varepsilon$ となる N を取れば m,n≥N の異なる添字の距離は ε 未満であり、同じ添字なら零である。従ってCauchy列となる。[Laurent級数の完備性と係数安定化](#thm-fml4-laurent-complete)より極限の偶数非負指数の係数は1、それ以外は0である。従って $s=\sum_{k\ge0}t^{2k}$ となる。[形式 Laurent 級数の積](../../ACOMP/ACOMP21/index.md#def-acomp21-formal-laurent)から、積 $(1-t^2)s$ の指数 i の係数は $[t^i]s-[t^{i-2}]s$ である。i=0 では1-0=1、正の偶数では1-1=0、奇数と負の整数では0-0=0である。すべての指数で定数級数1の対応する係数と一致するので $(1-t^2)s=1$ である。
<!-- solution-end -->

### FML4-B04 Leanの仮定と結論

complete_limit の [CompleteSpace X] を消しても証明できるか。また結論が ∃ a であるだけで極限を数値として計算したことになるか。

- Level: B

<!-- solution-start -->
#### 詳細解答

[完備性を仮定した極限の存在](#thm-fml4-complete-limit)で用いた cauchySeq_tendsto_of_complete は CompleteSpace X を要求する。仮定を消すと一般には偽であり、B01の X と u が反例になる。また ∃ a はある a の存在を述べるだけで、具体的な数値や計算方法の仕様を含まない。極限値を求めたいなら別途その候補を指定し、Tendsto の証明を構成する必要がある。
<!-- solution-end -->

### Level C

### FML4-C01 回路の形式的退化と誤差

有理数体上で、Laurent級数を定数とする回路の出力を

$$
P(t,x,y)=t^{-2}((x+t^2 y)^2-x^2)
$$

とする。全係数が形式冪級数に入ること、定数項への特殊化、差の係数が精度 D=2 を満たすことを示せ。最後に入力定数の定数項だけを使う方法が失敗する理由を説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

展開を順に行うと

$$
\begin{aligned}
P&=t^{-2}(x^2+2t^2xy+t^4y^2-x^2)\\
 &=t^{-2}(2t^2xy+t^4y^2)\\
 &=2xy+t^2y^2.
\end{aligned}
$$

よって xy の係数は2、y²の係数は $t^2$、残りは零であり、負の指数の係数は存在しない。[定数項への特殊化](../../ACOMP/ACOMP21/index.md#thm-acomp21-specialization)の定義域に入るので、xy の係数は2へ、y²の係数は0へ写って $F=2xy$ を得る。

差は $P-F=t^2y^2$ である。xy などの係数は零で付値は無限大、y²の係数の付値は2である。全係数で付値は2以上なので [係数一致の定理](#thm-fml4-coeff-agreement)により D=2 未満の添字の係数が一致する。しかし y² の係数は指数2で異なり、P と F は形式的な等式ではない。

最後に $t^{-2}$ の定数項は0であり、$t^2$ の定数項も0である。入力で先にこれらを零に置換すると出力は $0\cdot(x^2-x^2)=0$ となり、2xy を失う。[定数項抽出の定義域による乗法保存の差](#prop-fml4-constant-coeff)の通り、負の指数を許す定数の体全体で定数項抽出は環準同型ではない。出力が正則であることを確認してから特殊化する必要がある。
<!-- solution-end -->

次講では、これらのLeanの定理がどの公理・定義・外部の結果に依存しているかを調べます。
