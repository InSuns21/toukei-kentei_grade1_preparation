# QM1 実験事実から Hilbert 空間形式へ

<!-- definition-example-audit: strict -->

> **既出概念への参照**：[LA5 の複素内積](../LA5/index.md#def-la5-complex-inner-product)と、関数解析で学んだ Hilbert 空間・自己共役作用素の流れを出発点にします。本章ではそれらを量子実験のモデル化へ接続します。

関数解析では、Hilbert 空間を「内積があり、極限を取っても空間の外へ逃げない完備な空間」として学びました。ところが量子力学へ進むと、最初に出会う問いは逆向きです。

> なぜ物理状態を、そもそも Hilbert 空間のベクトルで表そうとするのでしょうか。

この問いに「量子力学の公理だから」とだけ答えると、数学は始められても、なぜその公理が選ばれたのかが見えません。一方で、二重スリットや Stern--Gerlach 型実験だけから Hilbert 空間が論理的に一意に導かれる、と言うのも強すぎます。

本章では、次の三層を分けて進みます。

| 層 | この章での意味 | 例 |
|---|---|---|
| 実験事実 | 装置を用いて再現可能に観測される現象 | 二重スリットの干渉縞、二準位への分離 |
| 理論のモデル化 | 実験を統一的に表すために採用する数学的表現 | 複素振幅、ベクトルの重ね合わせ、Hilbert 空間 |
| 数学的帰結 | モデルの定義や公理から計算・証明できること | 干渉項、全体に同じ位相を掛けたときの不変量 |

したがって本章の目標は「実験から公理を証明する」ことではありません。

$$
\boxed{
\text{実験で何が起きるか}
\longrightarrow
\text{何を表現したいか}
\longrightarrow
\text{どの数学構造が自然か}
}
$$

という橋を架けます。Born 則、観測量、自己共役作用素、射影測定は次章 QM2 で正式に公理化します。

---

## 1. 二重スリット：確率を先に足すだけでは干渉項が出ない

単一粒子を一個ずつ二重スリットへ送る実験を考えます。各回の検出はスクリーン上の一点で起きますが、同じ条件で多数回繰り返すと、二つの開口がともにコヒーレントに寄与する配置では干渉縞が現れます。

ここで重要なのは、個々の粒子がスクリーン上で「半分ずつ検出される」ということではありません。各回は一点で検出される一方、**多数回の統計分布に縞が現れる**ことです。

古典的な排反事象の確率だけで考えると、経路1を通る確率密度を $p_1(x)$、経路2を通る確率密度を $p_2(x)$ として

$$
p(x)=p_1(x)+p_2(x)
$$

と足すのが自然です。しかしこの式には、二つの経路の相対的な位相を記録する場所がありません。

そこで量子理論では、確率そのものを最初から足すのではなく、各経路へ複素数値の**振幅**

$$
\psi_1(x),
\qquad
\psi_2(x)
$$

を対応させ、両経路が区別されないときは振幅を先に

$$
\psi(x)=\psi_1(x)+\psi_2(x)
$$

と重ね合わせる、というモデルを採用します。

このとき何が起きるかは純粋な複素数の計算です。

<a id="prop-qm1-two-path-interference"></a>

<!-- formal-statement-start -->
### 命題（二経路振幅の干渉恒等式）

任意の複素数 $a,b\in\mathbb C$ に対して

$$
|a+b|^2
=
|a|^2+|b|^2
+
2\operatorname{Re}(a\overline b)
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

絶対値二乗を

$$
|z|^2=z\overline z
$$

と書き、積を展開します。交差項二つが互いに複素共役になり、その和が実部の2倍になります。

<!-- proof-start -->
### 証明

$$
\begin{aligned}
|a+b|^2
&=(a+b)(\overline a+\overline b)\\
&=a\overline a+b\overline b
+a\overline b+b\overline a\\
&=|a|^2+|b|^2
+a\overline b+\overline{a\overline b}\\
&=|a|^2+|b|^2
+2\operatorname{Re}(a\overline b).
\end{aligned}
$$

以上で示されました。
<!-- proof-end -->

この最後の項

$$
2\operatorname{Re}(a\overline b)
$$

が干渉項です。

たとえば

$$
a=A,
\qquad
b=Ae^{i\varphi}
$$

なら

$$
\begin{aligned}
|a+b|^2
&=
A^2|1+e^{i\varphi}|^2\\
&=
2A^2(1+\cos\varphi).
\end{aligned}
$$

$\varphi=0$ なら強め合い、

$$
|a+b|^2=4A^2,
$$

$\varphi=\pi$ なら打ち消し合い、

$$
|a+b|^2=0
$$

です。

ここで区別すべきことがあります。**この恒等式自体は数学的定理**です。一方、「物理的な検出統計を振幅の絶対値二乗へ結び付ける」という部分は量子理論のモデル化であり、次章で Born 則として明示します。

---

## 2. なぜ複素数なのか：位相差を連続的に持ち運ぶ

重ね合わせだけなら実ベクトルでも書けます。しかし干渉では、二つの寄与の位相差が連続的に変わります。

実数係数だけなら、符号の違い

$$
+1,
\qquad
-1
$$

によって「同位相」と「反対位相」は表せますが、その中間の連続的な位相差を同じ代数で扱うには窮屈です。

この「二つの寄与がどれだけ位相方向にずれているか」を、後で繰り返し使える量として名前を付けます。

<a id="def-qm1-relative-phase"></a>

<!-- formal-statement-start -->
### 定義（相対位相）

非零の複素振幅

$$
a=r_a e^{i\theta_a},
\qquad
b=r_b e^{i\theta_b},
\qquad
r_a,r_b>0
$$

に対し、

$$
\theta_b-\theta_a
\pmod{2\pi}
$$

を $a$ に対する $b$ の **相対位相** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm1-relative-phase -->
### 直接例：共通回転では相対位相は変わらない

$$
a=A,
\qquad
b=Ae^{i\varphi},
\qquad
A>0
$$

なら、$a$ に対する $b$ の相対位相は $\varphi$ です。

両方へ同じ $e^{i\alpha}$ を掛けると

$$
a'=Ae^{i\alpha},
\qquad
b'=Ae^{i(\alpha+\varphi)}
$$

となるため、位相差は

$$
(\alpha+\varphi)-\alpha
=
\varphi
$$

のままです。共通の位相回転と、二つの成分の相対位相は別物です。
<!-- definition-example-end -->

複素数なら

$$
e^{i\varphi}
=
\cos\varphi+i\sin\varphi
$$

によって、位相差 $\varphi$ を一つのスカラーとして扱えます。

$$
a
\quad\text{と}\quad
ae^{i\varphi}
$$

を足し、その絶対値二乗を取れば、前節の $\cos\varphi$ が自動的に現れます。

これは「実験が複素数を論理的に強制する」という主張ではありません。少なくとも本章では、**重ね合わせと連続的な位相を一つの線形構造で記述するのに複素ベクトル空間が自然である**、というところまでを採用します。

そして量子状態をベクトルとして扱うなら、長さだけでなく二つの状態の「重なり」を測る構造が必要です。そこで内積が再登場します。

---

## 3. 実 Hilbert 空間から複素 Hilbert 空間へ

F0-02C1 では Hilbert 空間の完備性を学び、LA5 では有限次元の複素ベクトル空間上で[複素内積](../LA5/index.md#def-la5-complex-inner-product)を定義しました。量子力学では、この二つを同時に使います。

ここで複素内積を作り直す必要はありません。LA5 の規約をそのまま引き継ぎます。すなわち本教材では **第1変数で共役線形、第2変数で線形** とし、

$$
\langle x,\alpha y+\beta z\rangle
=
\alpha\langle x,y\rangle
+
\beta\langle x,z\rangle,
$$

$$
\langle x,y\rangle
=
\overline{\langle y,x\rangle}
$$

を使います。

たとえば $\mathbb C^2$ の標準内積は

$$
\langle z,w\rangle
=
\overline{z_1}w_1+\overline{z_2}w_2
$$

です。このとき

$$
\langle z,z\rangle
=
|z_1|^2+|z_2|^2
$$

なので、複素係数の位相を保ったまま長さを正の実数として測れます。

有限次元だけでなく $L^2$ のような無限次元空間でも極限操作を安定して行いたいので、ここへ完備性を加えます。

<a id="def-qm1-complex-hilbert-space"></a>

<!-- formal-statement-start -->
### 定義（複素 Hilbert 空間）

複素内積から定まるノルム

$$
\|x\|=\sqrt{\langle x,x\rangle}
$$

について完備な複素内積空間を **複素 Hilbert 空間** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm1-complex-hilbert-space -->
### 直接例：$\mathbb C^2$ は複素 Hilbert 空間

LA5 の標準複素内積

$$
\langle z,w\rangle
=
\overline{z_1}w_1+\overline{z_2}w_2
$$

から

$$
\|z\|^2
=
|z_1|^2+|z_2|^2
$$

が得られます。

$\mathbb C^2$ を実ベクトル空間として見れば $\mathbb R^4$ と同じ有限次元 Euclid 空間です。従って Cauchy 列は各実座標・虚座標ごとに収束し、その極限は再び $\mathbb C^2$ に属します。よって $\mathbb C^2$ はこのノルムで完備です。

したがって $\mathbb C^2$ は複素 Hilbert 空間です。
<!-- definition-example-end -->

量子力学の最小例で $\mathbb C^2$ が繰り返し現れるのは偶然ではありません。二つの区別可能な出力を、二つの直交方向を持つ複素ベクトル空間として表す最小モデルだからです。

---

## 4. 重ね合わせを $\mathbb C^2$ のベクトルとして読む

二つの直交する基底ベクトルを

$$
|1\rangle,
\qquad
|2\rangle
$$

と書きます。ket 記号は、この章では単に Hilbert 空間のベクトルを表す記法です。

一般のベクトル

$$
|\psi\rangle
=
a|1\rangle+b|2\rangle
$$

を考えます。基底が正規直交なら

$$
\langle 1,1\rangle
=
\langle 2,2\rangle
=
1,
\qquad
\langle 1,2\rangle=0.
$$

従って

$$
\begin{aligned}
\|\psi\|^2
&=
\langle
a|1\rangle+b|2\rangle,
a|1\rangle+b|2\rangle
\rangle\\
&=
|a|^2+|b|^2.
\end{aligned}
$$

ここで交差項が消えるのは、二つの基底方向が直交しているからです。

正規化

$$
\|\psi\|=1
$$

を課すと

$$
|a|^2+|b|^2=1
$$

になります。

次章では、この二つの値を測定確率へ結び付ける Born 則を公理として置きます。本章ではその手前として、**正規化されたベクトルの座標係数が、確率へ変換できる形を持っている**ことだけを確認します。

相対位相はベクトルの中に残ります。たとえば

$$
|\psi_\varphi\rangle
=
\frac1{\sqrt2}|1\rangle
+
\frac{e^{i\varphi}}{\sqrt2}|2\rangle
$$

なら、どの $\varphi$ でも

$$
\|\psi_\varphi\|^2
=
\frac12+\frac12
=
1
$$

です。

それでも $\varphi$ は無意味ではありません。別の基底へ取り直したり二つの成分を再び重ね合わせたりすると、前節と同じ干渉項として効いてきます。

---

## 5. Stern--Gerlach 型実験：二つの出力を二次元空間で表す

次に、離散的な出力が現れる実験を見ます。

理想化した spin $1/2$ の Stern--Gerlach 型装置を考えます。ある軸、たとえば $z$ 軸に沿う装置へ同じ準備をした粒子を送ると、出力は連続的な帯ではなく二つのチャネルへ分かれます。これを

$$
z+,
\qquad
z-
$$

と呼びます。

さらに $z+$ のチャネルだけを選び、同じ向きの装置へもう一度送れば、理想化したモデルでは再び $z+$ 側へ出ます。

ところが途中に異なる軸、たとえば $x$ 軸の装置を入れて $x+$ だけを選び、その後に再び $z$ 軸で分けると、今度は $z+$ と $z-$ の両方が現れます。

ここで観測される事実は「装置の並べ方で出力統計が変わる」ということです。これを表す最小の数学モデルとして $\mathbb C^2$ を使います。

$z$ 軸の二つの出力へ

$$
|z+\rangle
=
\begin{pmatrix}
1\\
0
\end{pmatrix},
\qquad
|z-\rangle
=
\begin{pmatrix}
0\\
1
\end{pmatrix}
$$

を対応させます。

$x$ 軸の二つの出力は

$$
|x+\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle+|z-\rangle
\right),
$$

$$
|x-\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle-|z-\rangle
\right)
$$

と表します。

まず内積を直接計算すると

$$
\langle x+,x+\rangle
=
\frac12+\frac12
=
1,
$$

$$
\langle x-,x-\rangle
=
1,
$$

$$
\langle x+,x-\rangle
=
\frac12-\frac12
=
0.
$$

従って $|x+\rangle,|x-\rangle$ も正規直交基底です。

逆に

$$
|z+\rangle
=
\frac1{\sqrt2}
\left(
|x+\rangle+|x-\rangle
\right),
$$

$$
|z-\rangle
=
\frac1{\sqrt2}
\left(
|x+\rangle-|x-\rangle
\right)
$$

です。

この式が逐次実験の中心です。$z+$ を準備した状態は、$x$ 基底から見ると二つの方向を同じ大きさで含みます。次章の Born 則を先取りする有限次元モデルとして振幅二乗を読むと、$x+$ と $x-$ はそれぞれ

$$
\left|\frac1{\sqrt2}\right|^2
=
\frac12
$$

の比率になります。

さらに $x+$ だけを選別した後のベクトルを $|x+\rangle$ として $z$ 基底へ戻すと

$$
|x+\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle+|z-\rangle
\right)
$$

なので、再び $z+$ と $z-$ が半々になります。

ここで「測定したから粒子を物理的に乱した」という言葉だけで済ませると、本質を見失います。本系列では、次章以降で**状態、測定、射影、非可換な観測量**を数学的に定義し、この逐次実験をその形式の中で説明します。

---

## 6. 全体位相は何を変えず、相対位相は何を変えるか

二状態のベクトル

$$
|\psi\rangle
=
a|1\rangle+b|2\rangle
$$

に対し、絶対値1の複素数 $e^{i\theta}$ を全体へ掛けます。

$$
|\psi'\rangle
=
e^{i\theta}|\psi\rangle.
$$

すると係数は

$$
a\mapsto e^{i\theta}a,
\qquad
b\mapsto e^{i\theta}b
$$

と同じだけ回転します。二つの係数の**相対位相**は変わりません。

量子理論で測定確率へ現れるのは、最終的に内積の絶対値二乗です。そこで、全体位相がこの量を変えないことを確認します。

その前に、同じ方向を表すベクトルをまとめる数学的対象を定義します。

<a id="def-qm1-hilbert-ray"></a>

<!-- formal-statement-start -->
### 定義（Hilbert 空間の ray）

複素 Hilbert 空間 $H$ の非零ベクトル $\psi\in H$ に対して

$$
[\psi]
=
\{c\psi:c\in\mathbb C,\ c\ne0\}
$$

を $\psi$ が生成する **ray** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qm1-hilbert-ray -->
### 直接例：全体位相だけ違う二つのベクトル

$$
\psi
=
\frac1{\sqrt2}
\begin{pmatrix}
1\\
i
\end{pmatrix},
\qquad
\psi'
=
e^{i\pi/3}\psi
$$

とします。

$e^{i\pi/3}\ne0$ なので

$$
\psi'\in[\psi].
$$

逆に

$$
\psi
=
e^{-i\pi/3}\psi'
$$

でもあるため

$$
[\psi']=[\psi].
$$

二つはベクトルとしては異なりますが、同じ ray を生成します。
<!-- definition-example-end -->

<a id="prop-qm1-global-phase-invariance"></a>

<!-- formal-statement-start -->
### 命題（全体位相不変性）

複素 Hilbert 空間 $H$ で $\|\psi\|=1$ とし、

$$
\psi'
=
e^{i\theta}\psi
$$

とする。このとき任意の $\phi\in H$ に対して

$$
|\langle \psi',\phi\rangle|^2
=
|\langle \psi,\phi\rangle|^2
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

LA5 の規約では内積は第1変数について共役線形なので、全体位相は複素共役されて内積の外へ出ます。しかしその絶対値は1のままです。

<!-- proof-start -->
### 証明

第1変数の共役線形性から

$$
\langle \psi',\phi\rangle
=
\langle e^{i\theta}\psi,\phi\rangle
=
e^{-i\theta}\langle\psi,\phi\rangle.
$$

従って

$$
\begin{aligned}
|\langle \psi',\phi\rangle|^2
&=
|e^{-i\theta}|^2
|\langle\psi,\phi\rangle|^2\\
&=
|\langle\psi,\phi\rangle|^2.
\end{aligned}
$$

ここで

$$
|e^{-i\theta}|=1
$$

を使いました。
<!-- proof-end -->

この命題が、純粋状態を「単位ベクトルそのもの」ではなく「全体位相を同一視した ray」で表す動機です。

ただし相対位相は消えません。たとえば

$$
\frac1{\sqrt2}
\left(
|1\rangle+|2\rangle
\right)
$$

と

$$
\frac1{\sqrt2}
\left(
|1\rangle-|2\rangle
\right)
$$

は、全体に同じ複素数を掛けても互いへ移りません。実際、前者は $x+$ 型、後者は $x-$ 型の別の ray です。

**全体位相は同一視されるが、相対位相は物理的予測へ残り得る。** この区別が重要です。

---

## 7. なぜ Hilbert 空間なのかを、要請ごとに対応させる

ここまでの話を「Hilbert 空間だからそうなる」と逆向きに覚えないため、必要になった構造を一つずつ対応させます。

### 7.1 重ね合わせたい → ベクトル空間

二つの候補の寄与を

$$
\psi_1+\psi_2
$$

として一つの対象に戻したいので、加法に閉じた線形空間が自然です。

### 7.2 連続的な相対位相を持ちたい → 複素スカラー

$$
e^{i\varphi}
$$

を係数として使えば、振幅の大きさと位相を同じスカラーの中に持てます。

### 7.3 状態どうしの重なりを数にしたい → 内積

基底方向の係数を

$$
\langle e_j,\psi\rangle
$$

のように抽出でき、直交も定義できます。次章では、この重なりの絶対値二乗を測定確率へ結び付けます。

### 7.4 無限和・極限でも状態空間から出たくない → 完備性

粒子の位置のような自由度へ進むと、状態空間は $\mathbb C^2$ ではなく $L^2(\mathbb R)$ のような無限次元空間になります。近似列や直交展開の極限を取るたびに空間の外へ逃げないため、Hilbert 空間の完備性が効きます。

この四つをまとめると、

$$
\boxed{
\text{重ね合わせ}
+
\text{複素位相}
+
\text{内積}
+
\text{完備性}
}
$$

という構造が見えてきます。

ここから「したがって自然界は必ず複素 Hilbert 空間でなければならない」とは結論しません。量子理論の公理系を特徴付ける再構成定理は、さらに実験操作や確率構造に関する仮定を必要とする別の理論です。

本章で押さえるべきことは、**Hilbert 空間形式が、量子実験で必要になる重ね合わせ・位相・確率振幅・極限を一つの数学にまとめる**ということです。

---

## 8. 実験事実・公理・定理を混ぜない

最後に、ここまでの主張を三層へ戻します。

### 実験事実として扱ったもの

- 単一粒子を繰り返し検出すると統計分布が作られ、二重スリットではコヒーレントな条件で干渉縞が現れる。
- Stern--Gerlach 型装置では、spin $1/2$ の理想化で二つの出力へ分かれる。
- 軸を変えた逐次選別では、出力統計が装置順序に依存する。

### 理論のモデル化として採用したもの

- 候補の寄与を複素振幅で表す。
- 区別されない候補の振幅を線形に重ね合わせる。
- 状態を複素 Hilbert 空間のベクトルで表す。
- 全体位相だけ違うベクトルを同じ物理状態の候補とみなす。
- 振幅の絶対値二乗を測定統計へ結び付ける。これは次章で Born 則として正式に置く。

### 数学的に導いたもの

- 二経路の絶対値二乗には干渉項が現れる。
- 正規直交基底でのベクトルのノルム二乗は係数の絶対値二乗和になる。
- $z$ 基底と $x$ 基底の変換式。
- 全体位相は内積の絶対値二乗を変えない。

この整理を保つと、「実験で見えたこと」と「理論がそう表すと決めたこと」と「その決め方から証明できること」が混線しません。

---

## 9. 次章で何を公理として固定するか

本章では Hilbert 空間形式へ入る理由を作りました。しかし、まだ量子力学の測定理論は完成していません。

次章 QM2 では、少なくとも次を正式に定めます。

- 純粋状態をどう表すか。
- 観測量をどの作用素で表すか。
- 固有値と測定結果をどう結ぶか。
- Born 則で測定確率をどう計算するか。
- 測定統計をどのような量で要約するか。

つまり本章の役割は

$$
\boxed{
\text{実験的な困りごと}
\longrightarrow
\text{複素 Hilbert 空間という器}
}
$$

までです。QM2 では、その器の中に「状態・観測量・測定確率」を正式に配置します。

---

# 演習

## Level A

### QM1-A01 三層の分類
- Level: A

次の主張を「実験事実」「理論のモデル化」「数学的帰結」のいずれかに分類せよ。

1. 二重スリットで多数回の検出から干渉縞が形成される。
2. 二経路の寄与を複素振幅 $a,b$ で表し、$a+b$ と重ねる。
3. $|a+b|^2$ に $2\operatorname{Re}(a\overline b)$ が現れる。
4. 全体位相だけ違う単位ベクトルを同じ純粋状態として扱う。
5. Stern--Gerlach 型装置で二つの出力が観測される。

<!-- solution-start -->
### 詳細解答

1 は**実験事実**です。実験装置と条件を定めて観測される現象だからです。

2 は**理論のモデル化**です。実験結果そのものが「複素数を足せ」と発言しているわけではなく、量子理論が採用する表現です。

3 は**数学的帰結**です。複素共役を使って積を展開すれば、この章の干渉恒等式として証明できます。

4 は**理論のモデル化**です。本章の全体位相不変性はこの同一視を強く動機付けますが、「同じ物理状態として扱う」は理論側の採用事項です。

5 は**実験事実**です。

したがって

$$
\boxed{
1,5:\text{実験事実},
\quad
2,4:\text{モデル化},
\quad
3:\text{数学的帰結}
}
$$

です。
<!-- solution-end -->

### QM1-A02 位相差と干渉項
- Level: A

$$
a=A,
\qquad
b=Ae^{i\varphi},
\qquad
A>0
$$

とする。$|a+b|^2$ を求め、$\varphi=0,\pi/2,\pi$ の場合を比較せよ。

<!-- solution-start -->
### 詳細解答

干渉恒等式より

$$
|a+b|^2
=
|a|^2+|b|^2
+
2\operatorname{Re}(a\overline b).
$$

ここで

$$
a\overline b
=
A\cdot Ae^{-i\varphi}
=
A^2e^{-i\varphi},
$$

したがって

$$
\operatorname{Re}(a\overline b)
=
A^2\cos\varphi.
$$

よって

$$
\boxed{
|a+b|^2
=
2A^2(1+\cos\varphi)
}.
$$

各位相では

$$
\varphi=0
\Rightarrow
|a+b|^2=4A^2,
$$

$$
\varphi=\frac\pi2
\Rightarrow
|a+b|^2=2A^2,
$$

$$
\varphi=\pi
\Rightarrow
|a+b|^2=0.
$$

振幅の大きさが同じでも、相対位相によって合成後の絶対値二乗が変わります。
<!-- solution-end -->

### QM1-A03 $\mathbb C^2$ の複素内積
- Level: A

$$
z=
\begin{pmatrix}
1+i\\
2
\end{pmatrix},
\qquad
w=
\begin{pmatrix}
i\\
1-i
\end{pmatrix}
$$

に対して、標準複素内積 $\langle z,w\rangle$、$\langle w,z\rangle$、$\|z\|^2$ を求め、共役対称性を確認せよ。

<!-- solution-start -->
### 詳細解答

LA5 から引き継いだ規約では

$$
\langle z,w\rangle
=
\overline{z_1}w_1
+
\overline{z_2}w_2.
$$

まず

$$
\overline{z_1}=1-i,
\qquad
\overline{z_2}=2
$$

なので

$$
\begin{aligned}
\langle z,w\rangle
&=
(1-i)i+2(1-i)\\
&=
(1+i)+(2-2i)\\
&=
3-i.
\end{aligned}
$$

一方、

$$
\overline{w_1}=-i,
\qquad
\overline{w_2}=1+i
$$

より

$$
\begin{aligned}
\langle w,z\rangle
&=
(-i)(1+i)+(1+i)2\\
&=
(1-i)+(2+2i)\\
&=
3+i.
\end{aligned}
$$

従って

$$
\langle z,w\rangle
=
\overline{\langle w,z\rangle}
$$

です。

また

$$
\begin{aligned}
\|z\|^2
&=
|1+i|^2+|2|^2\\
&=
2+4\\
&=
6.
\end{aligned}
$$
<!-- solution-end -->

### QM1-A04 ray の判定
- Level: A

次のベクトルの組が同じ ray を生成するか判定せよ。

1.

$$
\psi=
\begin{pmatrix}
1\\
i
\end{pmatrix},
\qquad
\phi=
\begin{pmatrix}
i\\
-1
\end{pmatrix}.
$$

2.

$$
\psi=
\begin{pmatrix}
1\\
i
\end{pmatrix},
\qquad
\chi=
\begin{pmatrix}
1\\
-i
\end{pmatrix}.
$$

<!-- solution-start -->
### 詳細解答

1 では

$$
i\psi
=
\begin{pmatrix}
i\\
i^2
\end{pmatrix}
=
\begin{pmatrix}
i\\
-1
\end{pmatrix}
=
\phi.
$$

$i\ne0$ なので $\phi\in[\psi]$ です。従って同じ ray です。

2 で同じ ray だと仮定すると、ある $c\ne0$ が存在して

$$
\chi=c\psi
$$

となります。第1成分から $c=1$ です。しかし第2成分では

$$
-i=ci=i
$$

が必要になり矛盾します。

従って $\psi$ と $\chi$ は異なる ray を生成します。
<!-- solution-end -->

### QM1-A05 $z$ 基底と $x$ 基底
- Level: A

$$
|x+\rangle
=
\frac{|z+\rangle+|z-\rangle}{\sqrt2},
\qquad
|x-\rangle
=
\frac{|z+\rangle-|z-\rangle}{\sqrt2}
$$

とする。

1. $\langle x+,x-\rangle=0$ を示せ。
2. $|z+\rangle$ を $x$ 基底で表せ。

<!-- solution-start -->
### 詳細解答

$|z+\rangle,|z-\rangle$ は正規直交なので

$$
\langle z+,z+\rangle
=
\langle z-,z-\rangle
=
1,
$$

$$
\langle z+,z-\rangle
=
\langle z-,z+\rangle
=
0.
$$

したがって

$$
\begin{aligned}
\langle x+,x-\rangle
&=
\frac12
\langle
z++z-,
z+-z-
\rangle\\
&=
\frac12
\left(
1-0+0-1
\right)\\
&=0.
\end{aligned}
$$

次に二式を加えると

$$
|x+\rangle+|x-\rangle
=
\sqrt2\,|z+\rangle.
$$

従って

$$
\boxed{
|z+\rangle
=
\frac{|x+\rangle+|x-\rangle}{\sqrt2}
}.
$$
<!-- solution-end -->

## Level B

### QM1-B01 正規化と相対位相
- Level: B

正規直交ベクトル $|1\rangle,|2\rangle$ に対し

$$
|\psi\rangle
=
a|1\rangle+b|2\rangle
$$

とする。

1. $\|\psi\|^2=|a|^2+|b|^2$ を内積から導け。
2. $a=\cos\alpha$、$b=e^{i\varphi}\sin\alpha$ なら $\|\psi\|=1$ であることを示せ。
3. $\varphi$ を変えてもこの基底での係数の絶対値は変わらない一方、別基底では予測が変わり得る理由を説明せよ。

<!-- solution-start -->
### 詳細解答

第1問。LA5 の規約では第1変数が共役線形、第2変数が線形なので、

$$
\begin{aligned}
\|\psi\|^2
&=
\langle a1+b2,a1+b2\rangle\\
&=
\overline a a\langle1,1\rangle
+\overline a b\langle1,2\rangle\\
&\quad
+\overline b a\langle2,1\rangle
+\overline b b\langle2,2\rangle.
\end{aligned}
$$

正規直交性により交差項は0、対角項は1なので

$$
\boxed{
\|\psi\|^2
=
|a|^2+|b|^2
}.
$$

第2問では

$$
|a|^2
=
\cos^2\alpha,
$$

$$
|b|^2
=
|e^{i\varphi}|^2\sin^2\alpha
=
\sin^2\alpha.
$$

従って

$$
\|\psi\|^2
=
\cos^2\alpha+\sin^2\alpha
=
1.
$$

第3問。元の基底での係数絶対値は $|a|,|b|$ なので $\varphi$ を変えても変わりません。しかし別基底の係数は $a$ と $b$ の**和や差**になります。その絶対値二乗には

$$
2\operatorname{Re}(a\overline b)
$$

が現れるため、相対位相 $\varphi$ が効きます。
<!-- solution-end -->

### QM1-B02 逐次 Stern--Gerlach 型選別
- Level: B

最初に $|z+\rangle$ を準備する。QM1 の有限二準位モデルとして、ある正規直交基底での係数の絶対値二乗を各出力の比率と読む。

1. 直ちに $z$ 基底で測るとどうなるか。
2. $x$ 基底で測ると $x+$、$x-$ の比率はいくらか。
3. $x+$ だけを選別した後、再び $z$ 基底で測ると $z+$、$z-$ の比率はいくらか。

<!-- solution-start -->
### 詳細解答

第1問。

$$
|z+\rangle
=
1\cdot|z+\rangle
+
0\cdot|z-\rangle
$$

なので係数絶対値二乗は

$$
1,
\qquad
0.
$$

従って $z+$ が100%、$z-$ が0%です。

第2問。$x$ 基底では

$$
|z+\rangle
=
\frac1{\sqrt2}|x+\rangle
+
\frac1{\sqrt2}|x-\rangle.
$$

したがって

$$
\left|\frac1{\sqrt2}\right|^2
=
\frac12
$$

が両方に現れ、$x+$、$x-$ は1/2ずつです。

第3問。$x+$ を選別した後のベクトルを $|x+\rangle$ とすると

$$
|x+\rangle
=
\frac1{\sqrt2}|z+\rangle
+
\frac1{\sqrt2}|z-\rangle.
$$

従って再び

$$
z+:\frac12,
\qquad
z-:\frac12
$$

です。

つまり途中の $x$ 選別を入れると、最初は確定していた $z$ 出力が再び二つへ分かれます。この現象を次章以降では測定と状態更新、さらに非可換観測量の言葉で整理します。
<!-- solution-end -->

### QM1-B03 全体位相と相対位相を分離する
- Level: B

$$
|\psi_\varphi\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle
+
e^{i\varphi}|z-\rangle
\right)
$$

とする。

1. $e^{i\theta}|\psi_\varphi\rangle$ は $|\psi_\varphi\rangle$ と同じ ray を生成することを示せ。
2. $|\psi_0\rangle$ と $|\psi_\pi\rangle$ は同じ ray ではないことを示せ。
3. $|\psi_0\rangle=|x+\rangle$、$|\psi_\pi\rangle=|x-\rangle$ を確認せよ。

<!-- solution-start -->
### 詳細解答

第1問。$e^{i\theta}\ne0$ なので ray の定義から

$$
e^{i\theta}|\psi_\varphi\rangle
\in
[\,|\psi_\varphi\rangle\,].
$$

逆向きも $e^{-i\theta}$ を掛ければ戻るため、生成する ray は同じです。

第2問。

$$
|\psi_0\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle+|z-\rangle
\right),
$$

$$
|\psi_\pi\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle-|z-\rangle
\right).
$$

同じ ray なら

$$
|\psi_\pi\rangle=c|\psi_0\rangle
$$

となる $c\ne0$ が必要です。$|z+\rangle$ の係数比較から $c=1$、$|z-\rangle$ の係数比較から $c=-1$ が必要になり矛盾します。

従って異なる ray です。

第3問は $x$ 基底の定義そのものから

$$
\boxed{
|\psi_0\rangle=|x+\rangle,
\qquad
|\psi_\pi\rangle=|x-\rangle
}
$$

です。

全体位相は ray を変えませんが、二成分の相対位相 $0$ と $\pi$ は別の状態方向を作ります。
<!-- solution-end -->

## Level C

### QM1-C01 位相を変えた二準位状態を別基底で読む
- Level: C

$$
|\psi_\varphi\rangle
=
\frac1{\sqrt2}
\left(
|z+\rangle
+
e^{i\varphi}|z-\rangle
\right)
$$

を考える。

$x$ 基底

$$
|x+\rangle
=
\frac{|z+\rangle+|z-\rangle}{\sqrt2},
\qquad
|x-\rangle
=
\frac{|z+\rangle-|z-\rangle}{\sqrt2}
$$

を用いて次を行え。

1. $|\psi_\varphi\rangle$ を $|x+\rangle,|x-\rangle$ の線形結合として表せ。
2. QM1 の有限二準位モデルとして係数絶対値二乗を出力比率と読み、$x+$、$x-$ の比率を求めよ。
3. $\varphi=0,\pi/2,\pi$ を比較せよ。
4. この計算のうち「モデル化」と「数学的帰結」に当たる部分を分けて説明せよ。

<!-- solution-start -->
### 詳細解答

まず $z$ 基底を $x$ 基底で表す式

$$
|z+\rangle
=
\frac{|x+\rangle+|x-\rangle}{\sqrt2},
$$

$$
|z-\rangle
=
\frac{|x+\rangle-|x-\rangle}{\sqrt2}
$$

を代入します。

$$
\begin{aligned}
|\psi_\varphi\rangle
&=
\frac1{\sqrt2}
\left[
\frac{|x+\rangle+|x-\rangle}{\sqrt2}
+
e^{i\varphi}
\frac{|x+\rangle-|x-\rangle}{\sqrt2}
\right]\\
&=
\frac12
\left[
(1+e^{i\varphi})|x+\rangle
+
(1-e^{i\varphi})|x-\rangle
\right].
\end{aligned}
$$

従って $x+$ の振幅は

$$
a_+
=
\frac{1+e^{i\varphi}}2,
$$

$x-$ の振幅は

$$
a_-
=
\frac{1-e^{i\varphi}}2.
$$

絶対値二乗を計算します。

$$
\begin{aligned}
|a_+|^2
&=
\frac14
|1+e^{i\varphi}|^2\\
&=
\frac14
\left(
2+2\cos\varphi
\right)\\
&=
\frac{1+\cos\varphi}{2}.
\end{aligned}
$$

同様に

$$
\begin{aligned}
|a_-|^2
&=
\frac14
|1-e^{i\varphi}|^2\\
&=
\frac14
\left(
2-2\cos\varphi
\right)\\
&=
\frac{1-\cos\varphi}{2}.
\end{aligned}
$$

和は

$$
|a_+|^2+|a_-|^2
=
1
$$

なので正規化も保たれています。

各位相では

$$
\varphi=0
\Rightarrow
(x+,x-)=(1,0),
$$

$$
\varphi=\frac\pi2
\Rightarrow
(x+,x-)=\left(\frac12,\frac12\right),
$$

$$
\varphi=\pi
\Rightarrow
(x+,x-)=(0,1).
$$

つまり $z$ 基底では常に二成分の絶対値が $1/\sqrt2$ でも、**相対位相を変えると $x$ 基底での出力比率は連続的に変わります**。

最後に層を分けます。

- 複素 Hilbert 空間で状態をベクトル表示すること、$x$ 基底をこのように選ぶこと、係数絶対値二乗を測定比率へ結び付けることは**理論のモデル化**です。
- 基底変換後の係数
  $$
  \frac{1\pm e^{i\varphi}}2
  $$
  を得ること、その絶対値二乗が
  $$
  \frac{1\pm\cos\varphi}{2}
  $$
  になることは、採用したモデルからの**数学的帰結**です。

この二層を分けることが、QM1 の中心目的です。
<!-- solution-end -->
