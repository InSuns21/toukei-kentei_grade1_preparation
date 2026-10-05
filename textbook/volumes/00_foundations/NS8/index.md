# NS8 ミレニアム問題の公式定式化を読む

NS7 までで、三次元 Navier--Stokes 方程式について

$$
\text{大域弱解}
\longrightarrow
\text{局所強解}
\longrightarrow
\text{延長判定}
\longrightarrow
\text{臨界量・正則性判定}
$$

という解析の流れを作りました。

しかし「Navier--Stokes のミレニアム問題」と言うとき、Clay Mathematics Institute（CMI）の公式問題は単に

> 無外力の三次元方程式で有限時間発散が起こるか。

だけを一文で問うているわけではありません。

Charles L. Fefferman による公式 problem description は、全空間 $\mathbb R^3$ と周期空間 $\mathbb R^3/\mathbb Z^3$ を分け、さらに大域存在・滑らかさ側と breakdown 側を分けて、**A / B / C / D の四つの statement のうち一つを証明すること**を問題として提示しています。

本章の目的はニュースや二次解説を読むことではなく、一次資料から

$$
\boxed{
\text{何を仮定し}
\longrightarrow
\text{どの解クラスを要求し}
\longrightarrow
\text{何を証明すれば公式問題に答えたことになるか}
}
$$

を自力で読み分けることです。

特に重要なのは、

$$
\boxed{
\text{C / D が成立すること}
\not\Rightarrow
\text{無外力 A / B が偽であること}
}
$$

です。C / D では滑らかな外力を使うことが許されているからです。

一次資料は次の三つです。

- [CMI Navier--Stokes Equation](https://www.claymath.org/millennium/Navier-Stokes-Equation/)
- [Charles L. Fefferman, Existence and Smoothness of the Navier--Stokes Equation](https://www.claymath.org/wp-content/uploads/2022/06/navierstokes.pdf)
- [CMI, Rules for the Millennium Prize Problems](https://www.claymath.org/millennium-problems/rules/)

以下では公式文を長く引用せず、数式条件を保ったまま日本語で整理します。

---

## 1. まず共通の方程式を固定する

公式 problem description は、三次元で速度 $u=(u_1,u_2,u_3)$、圧力 $p$、外力 $f=(f_1,f_2,f_3)$ に対して

$$
\partial_t u_i
+
\sum_{j=1}^3
u_j\partial_j u_i
=
\nu\Delta u_i
-
\partial_i p
+
f_i,
$$

$$
\nabla\cdot u=0,
$$

$$
u(x,0)=u^0(x)
$$

を考えます。粘性係数は

$$
\nu>0
$$

です。

ベクトル表示では

$$
\partial_tu+(u\cdot\nabla)u
=
\nu\Delta u-\nabla p+f,
\qquad
\nabla\cdot u=0.
$$

NS1--NS7 で使ってきた方程式と同じです。

ただし NS8 で新しいのは PDE の形ではなく、

- 空間領域
- 初期値の滑らかさと無限遠での減衰
- 外力の有無と正則性
- 解に要求する滑らかさ
- エネルギー条件

を**公式問題がどこまで固定しているか**です。

---

## 2. 全空間 $\mathbb R^3$ 版の admissible data

全空間では、無限遠で不自然な成長を許さないために、初期速度と外力へ強い減衰条件を課します。

<a id="def-ns8-whole-space-data"></a>

<!-- formal-statement-start -->
> **定義（CMI 公式問題の全空間データ条件）**  
> 初期速度 $u^0\in C^\infty(\mathbb R^3;\mathbb R^3)$ は
>
> $$
> \nabla\cdot u^0=0
> $$
>
> を満たし、任意の多重指数 $\alpha$ と任意の整数 $K\ge0$ に対して、ある定数 $C_{\alpha,K}$ が存在して
>
> $$
> |\partial_x^\alpha u^0(x)|
> \le
> C_{\alpha,K}(1+|x|)^{-K}
> $$
>
> を満たすものとする。
>
> 外力 $f\in C^\infty(\mathbb R^3\times[0,\infty);\mathbb R^3)$ を使う場合は、任意の $\alpha,m,K$ に対して
>
> $$
> |\partial_x^\alpha\partial_t^m f(x,t)|
> \le
> C_{\alpha,m,K}(1+|x|+t)^{-K}
> $$
>
> を満たすものとする。
<!-- formal-statement-end -->

この初期値条件は「$u^0$ 自身が小さい」という仮定ではありません。大きさではなく、**滑らかで、すべての空間微分が任意次数の多項式より速く減衰する**ことを要求しています。

<!-- definition-example-start: def-ns8-whole-space-data -->
**定義の確認**

たとえば

$$
u^0(x)
=
\nabla\times
\left(
0,0,e^{-|x|^2}
\right)
$$

と置くと

$$
u^0
=
\left(
-2x_2e^{-|x|^2},
2x_1e^{-|x|^2},
0
\right).
$$

curl で作っているので

$$
\nabla\cdot u^0=0.
$$

また各偏微分は「多項式 $\times e^{-|x|^2}$」の形です。任意の $K$ に対して

$$
(1+|x|)^K
|\partial_x^\alpha u^0(x)|
$$

は有界なので、上の減衰条件を満たします。
<!-- definition-example-end -->

この条件を「Schwartz 型の急減少条件」と呼ぶことはできますが、本章では必要な不等式をそのまま書いて、何が要求されているかを曖昧にしません。

---

## 3. 全空間で解に要求されるもの

全空間版の公式問題が要求する解は、単に分布解やエネルギー弱解ではありません。

少なくとも

$$
p,u\in C^\infty(\mathbb R^3\times[0,\infty))
$$

であり、さらに速度は全時間で有限エネルギーを保つことが要求されます。

<a id="def-ns8-whole-space-solution"></a>

<!-- formal-statement-start -->
> **定義（公式問題での全空間 smooth finite-energy solution）**  
> 全空間データ $(u^0,f)$ に対して、$(p,u)$ が公式問題の全空間版で要求される解であるとは、
>
> 1. Navier--Stokes 方程式、発散零条件、初期条件を満たす。
> 2. $p,u$ が $\mathbb R^3\times[0,\infty)$ 上で $C^\infty$ である。
> 3. ある有限定数 $C$ が存在して、すべての $t\ge0$ について
>
> $$
> \int_{\mathbb R^3}|u(x,t)|^2\,dx<C
> $$
>
> が成り立つ。
>
> こととする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns8-whole-space-solution -->
**定義の確認**

NS3 の Leray--Hopf 弱解は、概念的には

$$
u\in
L^\infty_{\mathrm{loc}}(0,\infty;L^2)
\cap
L^2_{\mathrm{loc}}(0,\infty;H^1)
$$

という有限エネルギー制御を持ちます。

しかし、これだけから

$$
u\in C^\infty
$$

は出ません。

したがって「有限エネルギーで大域的に存在する」という部分が似ていても、**弱解存在定理だけでは公式 A を証明したことになりません**。
<!-- definition-example-end -->

---

## 4. 周期版では何が変わるか

周期版では空間を

$$
\mathbb T^3
=
\mathbb R^3/\mathbb Z^3
$$

とみなします。各座標方向の周期を1とすると、

$$
u^0(x+e_j)=u^0(x),
$$

$$
f(x+e_j,t)=f(x,t)
\qquad
(j=1,2,3)
$$

です。

空間がコンパクトなので、全空間のような $|x|\to\infty$ の減衰条件は不要です。

<a id="def-ns8-periodic-data"></a>

<!-- formal-statement-start -->
> **定義（CMI 公式問題の周期データ条件）**  
> 初期速度 $u^0$ は滑らか、発散零、各座標方向に周期1とする。  
> 外力を使う場合、$f$ も空間周期的かつ滑らかであり、任意の多重指数 $\alpha$、時間微分次数 $m$、整数 $K\ge0$ に対して
>
> $$
> |\partial_x^\alpha\partial_t^m f(x,t)|
> \le
> C_{\alpha,m,K}(1+t)^{-K}
> $$
>
> を満たすものとする。
>
> 解については、速度 $u$ が空間周期的であり、$p,u$ が全時間で滑らかであることを要求する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ns8-periodic-data -->
**定義の確認**

$$
u^0(x)
=
(\sin 2\pi x_2,0,0)
$$

なら

$$
\nabla\cdot u^0=0
$$

で、各座標方向に周期1です。

外力

$$
f(x,t)
=
e^{-t^2}
(\sin 2\pi x_2,0,0)
$$

も空間周期的で、任意の $m,K$ に対して

$$
(1+t)^K|\partial_t^m e^{-t^2}|
$$

は有界です。したがって周期版で許される滑らかな急減少外力の具体例になります。
<!-- definition-example-end -->

---

## 5. 公式 statement A：全空間・無外力・大域滑らかさ

<a id="stmt-ns8-a"></a>

<!-- formal-statement-start -->
> **公式問題の Statement A（$\mathbb R^3$ での存在と滑らかさ）**  
> $\nu>0$ とする。全空間データ条件を満たす任意の滑らかな発散零初期速度 $u^0$ に対し、
>
> $$
> f\equiv0
> $$
>
> とする。このとき $\mathbb R^3\times[0,\infty)$ 上に、全空間 smooth finite-energy solution $(p,u)$ が存在することを示せ。
<!-- formal-statement-end -->

量化記号だけを抜き出すと

$$
\boxed{
\forall u^0
\quad
[f=0]
\quad
\exists\text{ global smooth finite-energy solution}.
}
$$

です。

ここで重要なのは

- 初期値は「小さい初期値」に限定されない。
- 任意の admissible $u^0$ を扱う。
- 外力はゼロ。
- 有限時間ではなく $t\ge0$ 全体。
- 弱解ではなく滑らかな解。

という5点です。

NS5 で証明した局所強解は「短時間なら存在する」までです。Statement A は、その最大存在時間が必ず無限大になることを全データについて要求します。

---

## 6. 公式 statement B：周期・無外力・大域滑らかさ

<a id="stmt-ns8-b"></a>

<!-- formal-statement-start -->
> **公式問題の Statement B（$\mathbb R^3/\mathbb Z^3$ での存在と滑らかさ）**  
> $\nu>0$ とする。任意の滑らかな発散零・周期初期速度 $u^0$ に対し、
>
> $$
> f\equiv0
> $$
>
> とする。このとき全時間で滑らかな周期速度 $u$ と滑らかな圧力 $p$ が存在することを示せ。
<!-- formal-statement-end -->

論理形は

$$
\boxed{
\forall u^0_{\mathrm{per}}
\quad
[f=0]
\quad
\exists\text{ global smooth periodic solution}.
}
$$

です。

NS1--NS5 で主舞台にした $\mathbb T^3$ は、この Statement B を読むための準備になっています。

ただし NS3 で得たものは

$$
\text{global weak solution}
$$

であり、Statement B が要求する

$$
\text{global smooth solution}
$$

ではありません。

---

## 7. 公式 statement C：全空間・滑らかな外力付き breakdown

<a id="stmt-ns8-c"></a>

<!-- formal-statement-start -->
> **公式問題の Statement C（$\mathbb R^3$ での breakdown）**  
> $\nu>0$ とする。全空間データ条件を満たす滑らかな発散零初期速度 $u^0$ と、全空間外力条件を満たす滑らかな外力 $f$ が少なくとも一組存在して、そのデータに対して全時間の smooth finite-energy solution が存在しないことを示せ。
<!-- formal-statement-end -->

量化記号で書くと

$$
\boxed{
\exists(u^0,f)
\quad
\text{such that no global smooth finite-energy solution exists}.
}
$$

ここで

$$
f\not\equiv0
$$

でもよいことが決定的です。

Statement C は

> 無外力で必ず有限時間発散する初期値を作れ

とは言っていません。

外力は十分滑らかで、しかも空間・時間の両方で急減少する必要がありますが、**ゼロである必要はありません**。

---

## 8. 公式 statement D：周期・滑らかな外力付き breakdown

<a id="stmt-ns8-d"></a>

<!-- formal-statement-start -->
> **公式問題の Statement D（$\mathbb R^3/\mathbb Z^3$ での breakdown）**  
> $\nu>0$ とする。滑らかな発散零・周期初期速度 $u^0$ と、周期データ条件を満たす滑らかな外力 $f$ が少なくとも一組存在して、そのデータに対して全時間の滑らかな周期解が存在しないことを示せ。
<!-- formal-statement-end -->

論理形は

$$
\boxed{
\exists(u^0_{\mathrm{per}},f_{\mathrm{per}})
\quad
\text{such that no global smooth periodic solution exists}.
}
$$

です。

C と D の違いは主に領域です。

- C: $\mathbb R^3$、無限遠での急減少条件、有限エネルギー条件。
- D: $\mathbb T^3$、空間周期性、外力の時間急減少条件。

---

## 9. A / B / C / D を一枚の表にする

| Statement | 空間 | 初期値 | 外力 | 結論 |
| --- | --- | --- | --- | --- |
| A | $\mathbb R^3$ | 任意の滑らかな発散零・急減少データ | $f=0$ | 大域 smooth finite-energy solution が存在 |
| B | $\mathbb T^3$ | 任意の滑らかな発散零・周期データ | $f=0$ | 大域 smooth periodic solution が存在 |
| C | $\mathbb R^3$ | ある滑らかな発散零・急減少データ | 滑らか・急減少、非零でもよい | 大域 smooth finite-energy solution が存在しない |
| D | $\mathbb T^3$ | ある滑らかな発散零・周期データ | 滑らか・周期的・時間急減少、非零でもよい | 大域 smooth periodic solution が存在しない |

Fefferman の公式 problem description は、**この四つの statement のうち一つを証明すること**を求めています。

<a id="prop-ns8-four-alternatives"></a>

<!-- formal-statement-start -->
> **命題（公式 A / B / C / D の論理構造）**  
> 公式問題への数学的回答としては、A、B、C、D のいずれか一つの証明が対象になる。  
> ただし A と C、B と D はそれぞれ単純な論理否定の組ではない。
>
> 特に
>
> $$
> \neg A\Longrightarrow C,
> \qquad
> \neg B\Longrightarrow D
> $$
>
> は成り立つが、逆向き
>
> $$
> C\Longrightarrow\neg A,
> \qquad
> D\Longrightarrow\neg B
> $$
>
> は一般には成り立たない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $\neg A$ を考えます。

A は

$$
\forall u^0
\quad
[f=0]
\quad
\exists\text{ global smooth finite-energy solution}
$$

という形でした。

従って $\neg A$ なら、ある admissible な $u^0$ が存在して、外力を

$$
f=0
$$

としても global smooth finite-energy solution が存在しません。

ところが

$$
f=0
$$

は当然

$$
|\partial_x^\alpha\partial_t^m f(x,t)|
=
0
\le
C_{\alpha,m,K}(1+|x|+t)^{-K}
$$

を満たすので、C で許される外力です。

したがって

$$
\neg A\Longrightarrow C.
$$

同様に、周期版でも

$$
\neg B\Longrightarrow D.
$$

一方 C は

$$
\exists(u^0,f)
$$

を主張し、その $f$ は非零でもよいです。

仮に「無外力ではすべての admissible 初期値が大域滑らか」で A が真だったとしても、別の非零外力によって breakdown が起こる可能性は論理的には残ります。

従って

$$
C\Longrightarrow\neg A
$$

は出ません。同様に

$$
D\Longrightarrow\neg B
$$

も出ません。
<!-- proof-end -->

ここが、後続 NS8A を読むうえで最も重要な論理上の注意です。

---

## 10. 「弱解が大域的に存在する」と公式問題は何が違うのか

NS3 では Leray--Hopf 弱解を構成しました。

周期版なら概略

$$
u\in
L^\infty(0,T;L^2)
\cap
L^2(0,T;H^1)
$$

で、任意の有限 $T$ に対して構成を延ばせます。

これは非常に強い存在定理ですが、公式 A / B が要求する

$$
p,u\in C^\infty
$$

とは別です。

<a id="prop-ns8-weak-not-enough"></a>

<!-- formal-statement-start -->
> **命題（Leray--Hopf 大域存在だけでは A / B は終わらない）**  
> Leray--Hopf 型大域弱解の存在定理だけから、公式 Statement A または B は従わない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

A / B の結論には、全時間にわたる滑らかさが含まれます。

一方、Leray--Hopf 存在定理の結論はエネルギー空間での弱解存在です。

したがって論理的には

$$
\text{global weak existence}
$$

から

$$
\text{global }C^\infty\text{ regularity}
$$

を追加で示す必要があります。

NS5--NS7 の局所強解、弱--強一意性、Prodi--Serrin 型判定は、まさにこの欠けた橋をどこまで埋められるかを調べる結果です。

よって弱解存在定理だけでは A / B の必要条件の一部しか満たしておらず、A / B の証明にはなりません。
<!-- proof-end -->

同じ理由で、C / D が成立して「全時間の滑らかな解が存在しない」と分かっても、

$$
\text{大域弱解まで存在しない}
$$

とは限りません。

古典解・強解の breakdown と、Leray--Hopf 弱解の存在は両立し得ます。

---

## 11. NS5--NS7 の結果を公式 statement へ翻訳する

これまでの章を、公式問題の言葉へ戻してみます。

### 11.1 NS5 の局所強解

NS5 は十分滑らかな初期値に対して、ある短時間

$$
[0,T)
$$

では強解を作れることを示しました。

A / B が必要とするのは

$$
T=\infty
$$

です。

したがって問題は

> 局所存在を作れるか

ではなく

> 最大存在時間が有限で止まることを排除できるか

へ移ります。

### 11.2 NS5 の blow-up alternative

有限最大時刻なら

$$
\sup_{t<T_{\max}}
\|\nabla u(t)\|_2
=
\infty
$$

が必要でした。

従って A / B を証明する一つの道は、任意の admissible 無外力初期値に対してこの発散を排除する大域評価を作ることです。

### 11.3 NS7 の Prodi--Serrin 型判定

NS7 では

$$
u\in L^q_tL^p_x,
\qquad
\frac2q+\frac3p\le1,
\qquad
p>3
$$

が有限なら延長できることを示しました。

従って A / B の大域正則性側へ進むには、すべての admissible 初期値について、適切な臨界・劣臨界量が有限であることを示せればよいことになります。

しかし NS7 の判定は

> その量が有限なら正則

という**条件付き定理**です。

> その量が必ず有限

までは証明していません。

この最後の一段が大きな壁でした。

---

## 12. 「一つ証明すればよい」と「賞が直ちに授与される」は別

公式 problem description は数学上の課題を定めます。

一方、CMI の Prize Rules は

> 数学的にどの statement を解いたか

とは別に、

> その解決がどの手続きを経て賞の対象として評価されるか

を定めます。

2026年時点で公開されている rules では、少なくとも

- qualifying outlet で公表されること。
- 公表後に最低2年が経過すること。
- 世界の数学コミュニティで一般的受容を得ること。
- official problem description の問いへ十分に答えていると CMI が判断すること。

などが別途要求されています。

また Navier--Stokes については「どちら向きの解決」も標準の評価手続きで扱うとされています。

したがって

$$
\boxed{
\text{公式 statement の数学的証明}
\neq
\text{その瞬間の prize award}
}
$$

です。

この区別は数学の正否を曖昧にするものではありません。

- theorem statement が正しく証明されたか。
- 公式 Millennium Problem の statement に対応しているか。
- prize rules 上の評価・認定が完了したか。

は三つの異なる問いです。

---

## 13. よくある四つの読み違い

### 13.1 「弱解があるから存在問題は解決済み」

誤りです。

公式 A / B は全時間の滑らかな解を要求します。

### 13.2 「C が証明されたら無外力 A は偽」

一般には誤りです。

C は非零の滑らかな外力を使ってよいので、

$$
A\land C
$$

は論理的に両立し得ます。

### 13.3 「A と B は同じ問題を座標変換しただけ」

誤りです。

$\mathbb R^3$ と $\mathbb T^3$ では、無限遠の減衰、Fourier スペクトル、平均モード、エネルギー条件などが異なります。

公式問題が A と B を別 statement にしているのはこのためです。

### 13.4 「breakdown は弱解そのものが消えること」

誤りです。

C / D が否定するのは、公式 problem description が要求する**全時間の滑らかな解**です。エネルギー弱解が別の意味で存在し続けることとは矛盾しません。

---

## 14. A / B / C / D の関係を図で固定する

無外力側は

$$
\boxed{
A:
\forall u^0_{\mathbb R^3},
\ \text{global smooth}
}
$$

$$
\boxed{
B:
\forall u^0_{\mathbb T^3},
\ \text{global smooth}
}
$$

です。

breakdown 側は

$$
\boxed{
C:
\exists(u^0_{\mathbb R^3},f_{\mathbb R^3}),
\ \text{no global smooth}
}
$$

$$
\boxed{
D:
\exists(u^0_{\mathbb T^3},f_{\mathbb T^3}),
\ \text{no global smooth}
}
$$

です。

ここから

$$
\neg A\Rightarrow C,
\qquad
\neg B\Rightarrow D
$$

は分かります。

しかし

$$
A\Rightarrow\neg C
$$

でも

$$
B\Rightarrow\neg D
$$

でもありません。

したがって四 statement を

~~~text
A vs C
B vs D
~~~

という単純な二択2組として理解すると誤ります。

公式問題は、問題の核心を残しつつ解答者へ一定の「leeway」を与えるため、四つの accepted targets を置いています。

---

## 15. 本章の到達点

ここまでで、「Navier--Stokes ミレニアム問題を解く」という表現を、少なくとも次の三段階へ分けられます。

### 数学的 statement

A / B / C / D のどれを証明したのか。

### 既存理論との関係

その証明は

- Leray--Hopf 弱解
- 局所強解
- blow-up alternative
- 臨界性
- 正則性判定

のどこを越えたのか。

### prize status

CMI の rules に基づく評価・認定がどこまで進んでいるのか。

NS8A では、この読み方をそのまま使って、2026年に公表された有限時間特異点構成を

$$
\text{どの statement を対象にする結果か}
$$

という形で読みます。

---

# 演習

## Level A

<a id="ex-ns8-a01"></a>
### A1. 四 statement の条件を分類する

A / B / C / D について、次を埋めよ。

1. 空間が $\mathbb R^3$ か $\mathbb T^3$ か。
2. 外力が必ず $0$ か、滑らかな非零外力を許すか。
3. 初期値が「任意」か「ある一例」か。
4. 結論が global smooth existence か breakdown か。

- Level: A

<!-- solution-start -->
### 詳細解答

A は

$$
\mathbb R^3,\qquad f=0,
$$

任意の admissible 初期値に対する global smooth finite-energy existence です。

B は

$$
\mathbb T^3,\qquad f=0,
$$

任意の滑らかな発散零周期初期値に対する global smooth periodic existence です。

C は

$$
\mathbb R^3
$$

で、ある初期値とある滑らかな急減少外力を選び、global smooth finite-energy solution が存在しないことを示す statement です。

D は

$$
\mathbb T^3
$$

で、ある周期初期値とある滑らかな周期外力を選び、global smooth periodic solution が存在しないことを示す statement です。

したがって

| Statement | 領域 | 外力 | 量化 | 結論 |
| --- | --- | --- | --- | --- |
| A | $\mathbb R^3$ | $0$ | 任意の $u^0$ | global smooth existence |
| B | $\mathbb T^3$ | $0$ | 任意の $u^0$ | global smooth existence |
| C | $\mathbb R^3$ | 非零可 | ある $(u^0,f)$ | breakdown |
| D | $\mathbb T^3$ | 非零可 | ある $(u^0,f)$ | breakdown |

となります。
<!-- solution-end -->

<a id="ex-ns8-a02"></a>
### A2. 急減少条件を確認する

$$
g(x)=e^{-|x|^2}
$$

について、任意の多重指数 $\alpha$ と任意の $K\ge0$ に対して

$$
(1+|x|)^K|\partial^\alpha g(x)|
$$

が有界になる理由を説明せよ。

- Level: A

<!-- solution-start -->
### 詳細解答

Gauss 関数を微分すると、各多重指数 $\alpha$ に対してある多項式 $P_\alpha$ が存在し、

$$
\partial^\alpha g(x)
=
P_\alpha(x)e^{-|x|^2}
$$

となります。

$P_\alpha$ の次数を $d$ とすると、ある定数 $C_\alpha$ が存在して

$$
|P_\alpha(x)|
\le
C_\alpha(1+|x|)^d.
$$

従って

$$
(1+|x|)^K|\partial^\alpha g(x)|
\le
C_\alpha
(1+|x|)^{K+d}
e^{-|x|^2}.
$$

指数関数 $e^{-|x|^2}$ は任意次数の多項式より速く減衰するので、右辺は $\mathbb R^3$ 上で有界です。

よって

$$
|\partial^\alpha g(x)|
\le
C_{\alpha,K}(1+|x|)^{-K}
$$

となります。
<!-- solution-end -->

<a id="ex-ns8-a03"></a>
### A3. 弱解と公式 B の差を一行ずつ列挙する

周期三次元 Navier--Stokes について、Leray--Hopf 弱解の存在から Statement B へ進む際に不足しているものを、少なくとも二つ挙げよ。

- Level: A

<!-- solution-start -->
### 詳細解答

第一に正則性が不足しています。

Leray--Hopf 弱解は概略

$$
u\in L^\infty_tL^2_x\cap L^2_tH^1_x
$$

ですが、B は全時間の

$$
p,u\in C^\infty
$$

を要求します。

第二に、三次元では弱解の一般的一意性も自動ではありません。

NS5 の弱--強一意性は「比較相手として強解が存在する間」に限って一致を保証する結果です。

したがって

$$
\text{global weak existence}
$$

だけから

$$
\text{global smooth existence}
$$

へは進めません。
<!-- solution-end -->

<a id="ex-ns8-a04"></a>
### A4. C と $\neg A$ を区別する

次の主張の真偽を判定し、理由を述べよ。

> Statement C が真なら Statement A は偽である。

- Level: A

<!-- solution-start -->
### 詳細解答

一般には偽です。

A は

$$
f=0
$$

の無外力問題について、すべての admissible 初期値が大域滑らかであると主張します。

一方 C は、ある

$$
(u^0,f)
$$

について breakdown が起こればよく、$f$ は非零でも構いません。

従って論理的には

$$
A
$$

が真で、同時に

$$
C
$$

も真である可能性があります。

C から分かるのは「ある滑らかな外力付きデータで global smooth solution が存在しない」ということまでです。
<!-- solution-end -->

<a id="ex-ns8-a05"></a>
### A5. prize rule と数学的解決を区別する

ある論文が Statement D を完全に証明したと仮定する。この瞬間に「CMI の賞が授与済み」と結論してよいか。

- Level: A

<!-- solution-start -->
### 詳細解答

結論してはいけません。

Statement D の完全証明は、公式 problem description が提示した数学的 target の一つへ答えることです。

一方 Prize Rules では、賞の評価に

- qualifying outlet での公表。
- 公表後の最低2年間。
- 世界の数学コミュニティでの一般的受容。
- official description へ十分答えたという CMI の判断。

などが別途要求されます。

従って

$$
\text{mathematical solution}
$$

と

$$
\text{prize awarded}
$$

は別の状態です。
<!-- solution-end -->

---

## Level B

<a id="ex-ns8-b01"></a>
### B1. $\neg A\Rightarrow C$ を量化記号から証明する

Statement A の否定から Statement C が従うことを、$f=0$ が C の外力条件を満たすことまで書いて証明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

A は概略

$$
\forall u^0\in\mathcal D_{\mathbb R^3},
\quad
\exists(p,u)\in\mathcal S_{\mathbb R^3}
$$

です。ここで $\mathcal D_{\mathbb R^3}$ は admissible な無外力初期値、$\mathcal S_{\mathbb R^3}$ は global smooth finite-energy solution を表すとします。

その否定は

$$
\exists u^0\in\mathcal D_{\mathbb R^3}
\quad
\text{such that no }(p,u)\in\mathcal S_{\mathbb R^3}\text{ exists}
$$

です。

この $u^0$ を C で使い、外力を

$$
f(x,t)\equiv0
$$

と選びます。

任意の $\alpha,m,K$ に対して

$$
|\partial_x^\alpha\partial_t^m f(x,t)|
=
0,
$$

したがって

$$
0
\le
C_{\alpha,m,K}(1+|x|+t)^{-K}
$$

であり、$f=0$ は C が要求する滑らかな急減少外力条件を満たします。

しかも A の否定で選んだ $u^0$ について global smooth finite-energy solution は存在しません。

従って C の存在主張が満たされ、

$$
\boxed{\neg A\Rightarrow C}
$$

です。
<!-- solution-end -->

<a id="ex-ns8-b02"></a>
### B2. C から $\neg A$ が出ない論理モデルを作る

A と C が同時に真であることと矛盾しない仮想的状況を、無外力データと外力付きデータを分けて説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

次の仮想的状況を考えます。

まず、すべての admissible 初期値 $u^0$ について

$$
f=0
$$

なら global smooth finite-energy solution が存在すると仮定します。

これは Statement A が真という状況です。

次に、ある admissible 初期値 $u_*^0$ と、ある非零の滑らかな急減少外力 $f_*$ が存在して、

$$
(u_*^0,f_*)
$$

に対しては global smooth finite-energy solution が存在しないと仮定します。

これは Statement C が真です。

A の量化範囲は「$f=0$ の問題」に限定されているので、非零 $f_*$ の失敗例は A と衝突しません。

従って

$$
A\land C
$$

は論理的に両立します。

この例から、C は A の単純否定ではないことが分かります。
<!-- solution-end -->

<a id="ex-ns8-b03"></a>
### B3. NS7 の正則性判定を Statement B へ接続する

周期無外力解について、仮に任意の滑らかな周期初期値から生じる最大強解が

$$
u\in L^4(0,T_{\max};L^6(\mathbb T^3))
$$

を満たすことを全初期値について証明できたとする。NS7 を使うと Statement B へどのように進めるか。

- Level: B

<!-- solution-start -->
### 詳細解答

指数

$$
(p,q)=(6,4)
$$

について

$$
\frac2q+\frac3p
=
\frac24+\frac36
=
\frac12+\frac12
=
1.
$$

従って $(6,4)$ は NS7 の Prodi--Serrin 臨界指数対です。

NS7 の延長判定によれば、有限最大存在時間 $T_{\max}<\infty$ なら

$$
\|u\|_{L^4(0,T_{\max};L^6)}
=
\infty
$$

でなければなりません。

ところが仮定では、任意の滑らかな周期初期値についてこのノルムが有限です。

したがって

$$
T_{\max}<\infty
$$

は排除され、

$$
T_{\max}=\infty
$$

となります。

初期値が滑らかなら局所強解の高階正則性を繰り返し延長できるので、全時間の滑らかな周期解へ進めます。

よって、その $L^4_tL^6_x$ 有界性を**全 admissible 初期値について証明できれば**、Statement B の大域正則性側を閉じる道筋になります。

重要なのは NS7 がその有界性自体を証明しているわけではないことです。
<!-- solution-end -->

<a id="ex-ns8-b04"></a>
### B4. breakdown と Leray--Hopf 弱解の両立を説明する

ある周期データで Statement D 型の breakdown が起きると仮定する。一方、そのデータに対して Leray--Hopf 弱解が全時間存在するとする。この二つが矛盾しない理由を、解クラスを明示して説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

Statement D が否定するのは

$$
p,u\in C^\infty
$$

である全時間の滑らかな周期解です。

一方 Leray--Hopf 弱解は概略

$$
u\in
L^\infty_{\mathrm{loc}}(0,\infty;L^2)
\cap
L^2_{\mathrm{loc}}(0,\infty;H^1)
$$

というエネルギー空間に属し、方程式を弱い意味で満たします。

したがって有限時刻 $T_*$ までは強解と弱解が一致し、$T_*$ で古典的正則性が壊れた後も、弱解というより広い解クラスで continuation が存在することは論理的に可能です。

つまり

$$
\text{no global smooth solution}
$$

と

$$
\text{global weak solution exists}
$$

は異なる命題です。

よって両者は矛盾しません。
<!-- solution-end -->

---

## Level C

<a id="ex-ns8-c01"></a>
### C1. 仮想的研究結果を公式問題へ照合する

次の仮想的研究結果が得られたとする。

- 領域は $\mathbb T^3$。
- 初期速度は滑らか、発散零、周期的。
- 外力 $f$ は滑らか、周期的で、すべての空間・時間微分が $t\to\infty$ で任意次数より速く減衰する。
- ある有限時刻 $T_*$ までは古典解が存在する。
- $T_*$ で速度勾配が発散し、それ以後へ $C^\infty$ 解として延長できない。
- エネルギー弱解は全時間存在する。
- 外力は非零である。

次を判定せよ。

1. A / B / C / D のどの statement に直接対応するか。
2. この結果だけから無外力 Statement B が偽といえるか。
3. Leray--Hopf 弱解が全時間存在することは結果と矛盾するか。
4. 数学的証明が完成した瞬間に CMI prize award まで完了したといえるか。

- Level: C

<!-- solution-start -->
### 詳細解答

#### 1. 対応する statement

領域は

$$
\mathbb T^3
$$

です。

初期値は滑らか・発散零・周期的で、外力も滑らか・周期的です。さらに外力の各微分が時間方向に急減少するので、周期版の外力条件に合っています。

そして有限時刻 $T_*$ で古典解が壊れ、全時間の smooth periodic solution が存在しません。

従って直接対応するのは

$$
\boxed{\text{Statement D}}
$$

です。

#### 2. Statement B は偽か

この結果だけでは言えません。

B は

$$
f=0
$$

の無外力問題です。

仮想結果は

$$
f\ne0
$$

を使っています。

したがって D 型の breakdown が成立しても

$$
B
$$

が同時に真である可能性は論理的に残ります。

つまり

$$
D\not\Rightarrow\neg B.
$$

#### 3. 大域弱解との矛盾

矛盾しません。

D が排除するのは

$$
C^\infty
$$

の全時間解です。

Leray--Hopf 弱解はより広いエネルギー解クラスに属するため、

$$
\text{smooth breakdown}
$$

の後も弱解として存在し続けることがあり得ます。

#### 4. prize award まで完了したか

完了したとは言えません。

数学的には Statement D へ答える結果でも、Prize Rules の評価には別途

- qualifying outlet での公表。
- 最低2年の経過。
- 数学コミュニティでの一般的受容。
- CMI による official description との照合・判断。

などがあります。

従って最終的な整理は

$$
\boxed{
\text{D の数学的解決}
\not\equiv
\text{即時の prize award}
}
$$

です。

この問題は、公式 statement、既存弱解理論、無外力問題、prize recognition を混同しないことを一度に確認する問題です。
<!-- solution-end -->

---

## 参考一次資料

- Clay Mathematics Institute, [Navier--Stokes Equation](https://www.claymath.org/millennium/Navier-Stokes-Equation/)
- Charles L. Fefferman, [Existence and Smoothness of the Navier--Stokes Equation](https://www.claymath.org/wp-content/uploads/2022/06/navierstokes.pdf)
- Clay Mathematics Institute, [Rules for the Millennium Prize Problems](https://www.claymath.org/millennium-problems/rules/)

本章では公式 problem description の数式条件と論理構造を整理しました。研究状況そのものは時点依存なので、NS8A で基準日付きで扱います。
