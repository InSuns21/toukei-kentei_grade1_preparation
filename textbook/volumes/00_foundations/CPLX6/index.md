# CPLX6 NP-hard・NP-complete

[CPLX5](../CPLX5/index.md#def-cplx5-poly-many-one)では、$A\le_p B$ を「$A$ の任意の入力を多項式時間で $B$ の入力へ変換し、yes/no を正確に保つこと」と定義しました。しかし、一つの帰着だけでは「$B$ は本当に難しいのか」が分かりません。今度は **$NP$ のどの問題からも $B$ へ帰着できる**という、問題のクラス全体に対する比較を考えます。

難しさと、答えの検証しやすさは別の性質です。前者は「全ての $NP$ 言語から帰着を受ける難しさ」、両方を兼ね備えたものは「$NP$ に属し、しかもクラス全体から帰着できる」という性質です。以下でこれらを正確に定義します。「NP完全だから解くアルゴリズムが存在しない」という意味ではありません。停止する総当たり法があるか、時間が多項式か、そもそも決定可能かを区別しながら読み進めましょう。

## 1. NP-hard は「すべての NP 問題から来られる」

ここでも言語は二進文字列全体 $\Sigma^*=\{0,1\}^*$ の部分集合とします。$NP$ は[CPLX3の定義](../CPLX3/index.md#def-cplx3-np)に従い、証明書が多項式長で、全入力対で多項式時間停止する検証器を持つ言語のクラスです。多項式時間帰着の「変換」は問題ごとに異なって構いません。

<a id="def-cplx6-np-hard"></a>

<!-- formal-statement-start -->
> **定義（NP-hard）**  
> 二進言語 $H\subseteq\Sigma^*$ が **NP-hard（NP困難）** であるとは、任意の言語 $A\in NP$ に対して、$A\le_p H$ を満たす全域・多項式時間計算可能な帰着関数 $f_A$ が存在することをいう。すなわち、各 $A$ に対して全ての二進文字列 $x$ で

$$
x\in A\quad\Longleftrightarrow\quad f_A(x)\in H
$$

> が成立する。$H\in NP$ という条件は課さない。
<!-- formal-statement-end -->

**量化の順序**は「任意の $A\in NP$ に対して、帰着関数 $f_A$ が存在する」です。あらゆる $A$ に共通の一つの変換を要求していません。一方、ある特定の $A$ から $H$ への帰着が一つ見つかっただけでは、NP-hard は証明できません。

### この定義を満たす問題をどう見つけるか

直接、無数にある $NP$ の各言語から帰着を作るのは大変です。そこで、すべての非決定性計算を**機械の記述、入力、時間上界**の三つでまとめた一つの判定言語を作ります。この言語が NP-hard であることを一度証明すれば、以後はそこからの帰着だけを考えればよくなります。

## 2. 一つの具体的な NP完全言語を作る

[CPLX4](../CPLX4/index.md#thm-cplx4-np-equivalence)で、$A\in NP$ と「$A$ を判定する非決定性 Turing 機械があり、全ての枝が一つの共通多項式時間内に停止する」は同値だと示しました。この機械を入力データとして受け取り、決められた歩数以内に受理する枝があるかを尋ねます。

機械 $M$ の有限な遷移表と入力 $x$ を自己区切りのある二進列に符号化し、時間制限 $t$ は単項表現 $1^t$ で書きます。三つ組の符号化は長さが各成分長の和の多項式以下であり、復号も多項式時間でできる固定方式を選びます。不正な符号列は常に no とします。

<a id="def-cplx6-bounded-accept"></a>

<!-- formal-statement-start -->
> **定義（有界非決定性受理言語）**  
> $\mathit{BNA}$ を次の二進言語とする。

$$
\mathit{BNA}=
\{\langle M,x,1^t\rangle :
t\ge0,\ M\text{ は非決定性 Turing 機械であり、}
M\text{ が }x\text{ を高々 }t\text{ 遷移で受理する枝を持つ}\}.
$$

> 全ての符号は有限二進文字列で表し、不正な三つ組・機械記述は $\mathit{BNA}$ に含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cplx6-np-hard, def-cplx6-bounded-accept -->
### 例：二択を行う機械の有界受理

$M_0$ は初期状態から一歩で「受理状態へ移る」または「拒否状態へ移る」の二択を行い、入力を読まない機械とします。$t=1$ とすると、$M_0$ には長さ1の受理枝があるので $\langle M_0,\varepsilon,1\rangle\in\mathit{BNA}$。$t=0$ では初期状態は受理状態でないため $\langle M_0,\varepsilon,\varepsilon\rangle\notin\mathit{BNA}$ です。ここでは単項表現 $1^0=\varepsilon$ を使います。

**定義の確認**：機械記述、入力、単項時間制限はいずれも有限二進列として符号化でき、受理する枝の存在を歩数込みで判定対象にしています。さらに次の定理で、任意の $A\in NP$ から $\mathit{BNA}$ への変換を構成し、NP-hard 定義の全称量化・全域性・多項式時間性・yes/no 同値を全て確認します。
<!-- definition-example-end -->

<a id="thm-cplx6-bna-complete"></a>

<!-- formal-statement-start -->
> **定理（有界非決定性受理言語の完全性）**  
> 上記の符号化を用いた言語 $\mathit{BNA}$ は $NP$ に属し、しかも任意の $A\in NP$ に対して $A\le_p\mathit{BNA}$ が成り立つ。したがって $\mathit{BNA}$ は NP-hard である。
<!-- formal-statement-end -->

**証明の見取り図**　$NP$ 所属については「受理枝の選択列」を証明書にします。選択は $t$ 歩分で済み、$t$ を単項で入力したことから証明書も入力長の多項式です。NP-hard については、与えられた $A\in NP$ を判定する固定機械 $M_A$ と多項式時間上界 $p_A$ を三つ組に埋め込みます。このとき機械全体を実行するのではなく、記述と時間上界を**書き出すだけ**です。

<!-- proof-start -->
### 証明

まず $\mathit{BNA}\in NP$ を示します。入力の長さを $N$ とし、不正な符号なら多項式時間で拒否します。正しい符号 $\langle M,x,1^t\rangle$ について、$M$ の遷移表にある各配置からの分岐選択肢の最大数を $d$ とします（有限であり、機械の記述長以下の数で抑えられます）。証明書には高々 $t$ 個の分岐番号を記録します。各番号を固定幅 $\lceil\log_2(d+1)\rceil$ ビットで記せば長さは

$$
|w|\le t\lceil\log_2(d+1)\rceil
\le N(N+1)
$$

です。なぜなら単項成分のため $t\le N$ であり、機械記述も入力の一部なので $d\le N$ とできるからです（$N=0$ の不正入力は別途拒否）。

検証器は符号を復号し、$M$ の開始配置を作り、証明書が指定した分岐を高々 $t$ 回追跡します。各時点で合法な遷移かを表から調べ、受理状態に到達すれば受理し、それ以外は拒否します。長すぎる証明書は初めに拒否します。シミュレーション中に使うテープの範囲は開始入力長に高々 $t$ を加えたもの、各配置・遷移表の記述長も $O(N+t)$ の多項式以下です。一歩を表検索と配置更新で実現する処理は $N$ の多項式時間で行え、反復回数は $t\le N$ です。よって検証全体も $N+|w|$ の多項式時間内に必ず停止します。

受理が $t$ 歩未満で起きた場合はその時点で検証を終え、$t=0$ の場合は初期配置が受理状態かだけを検査します。受理枝があるならその各歩の選択番号を証明書とすれば検証器が受理します。検証器が受理するなら、検査済みの各選択が合法で、最後に受理状態を確認したので、長さ高々 $t$ の受理枝が実在します。この両方向の対応から $\mathit{BNA}\in NP$ が従います。

次に任意の $A\in NP$ を固定します。非決定性機械と検証器の同値性により、$A$ を判定する機械 $M_A$ と、整数値の多項式時間上界 $p_A(n)\ge1$ を選べます。これは $A$ ごとに**固定**され、入力 $x$ に依存して機械を探す必要はありません。次の変換を定義します。

$$
f_A(x)=\langle M_A,x,1^{p_A(|x|)}\rangle.
$$

$M_A$ の記述は定数長であり、$x$ のコピーは長さ $|x|$、単項部は $p_A(|x|)$ ビットです。$n=|x|$ に対し、整数多項式 $p_A(n)$ を計算してその個数だけ $1$ を書き、固定符号化で三つ組を組み立てれば、多項式時間で必ず停止します。とくに出力全体の長さも $n+p_A(n)$ の多項式で抑えられます。$x$ の yes/no を先に判定する手順は含みません。

定義した機械の受理条件より

$$
x\in A
\iff M_A\text{ は }x\text{ を受理する枝を持つ}
\iff M_A\text{ は高々 }p_A(|x|)\text{ 歩で受理する枝を持つ}
\iff f_A(x)\in\mathit{BNA}.
$$

第2の同値で $M_A$ の**全枝に共通の時間上界**を使用しました。$A$ は任意だったので、任意の $A\in NP$ に多項式時間 many-one 帰着が存在します。従って $\mathit{BNA}$ は NP-hard です。$\square$
<!-- proof-end -->

単項の時間制限には意味があります。もし $t$ を二進で書くと、入力長 $O(\log t)$ に対し $t$ が指数的に大きくなり得ます。上の「受理枝を $t$ 歩検証する」議論だけでは多項式時間性を保証できません。速く検証できることと、実行させる歩数が大きすぎないことを分けて確認してください。

## 3. NP-complete は難しさと検証しやすさの交点

$\mathit{BNA}$ は NP-hard であり、さらに $NP$ に属するという二つの性質を満たしました。この組合せが NP完全性です。

<a id="def-cplx6-np-complete"></a>

<!-- formal-statement-start -->
> **定義（NP-complete）**  
> 二進言語 $C$ が **NP-complete（NP完全）** であるとは、次の二条件をともに満たすことである。
>
> 1. $C\in NP$ である。
> 2. 任意の $A\in NP$ について $A\le_p C$、すなわち $C$ は NP-hard である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cplx6-np-complete -->
### 例：$\mathit{BNA}$ で二条件を実際に確認する

**定義の確認**：(1) 定理の前半で、証明書を高々 $t\lceil\log_2(d+1)\rceil\le N(N+1)$ ビットに抑えて多項式時間検証器を作ったので $\mathit{BNA}\in NP$。(2) 後半で各 $A\in NP$ に対し $f_A(x)=\langle M_A,x,1^{p_A(|x|)}\rangle$ を作り、全入力で yes/no 同値と多項式時間性を示したので $A\le_p\mathit{BNA}$。従って $\mathit{BNA}$ は NP-complete です。
<!-- definition-example-end -->

**検証例と完全性の証明を混同しない**ことが重要です。[CPLX3](../CPLX3/index.md#thm-cplx3-examples-in-np)では SAT や CLIQUE が $NP$ に属すると証明しました。しかし、それだけではいずれも NP-complete だとは言えません。SAT へ全 $NP$ の問題を帰着する Cook--Levin の定理は、次章 CPLX7 で扱います。

## 4. 一つの難しい問題から別の問題へ難しさを運ぶ

NP-hard を示すとき、すべての NP 言語を直接扱う必要はありません。既に NP-hard と分かっている $H$ から帰着すれば済みます。

<a id="prop-cplx6-hardness-transfer"></a>

<!-- formal-statement-start -->
> **命題（NP-hardness の移送）**  
> 二進言語 $H,B$ に対し、$H$ が NP-hard かつ $H\le_p B$ なら、$B$ も NP-hard である。さらに $B\in NP$ なら $B$ は NP-complete である。
<!-- formal-statement-end -->

**証明の見取り図**　各 $A\in NP$ について $A\le_p H$ を選び、$H\le_p B$ を後ろにつなぎます。帰着の**推移性**を使うので、矢印は必ず $A\to H\to B$ です。

<!-- proof-start -->
### 証明

任意の $A\in NP$ を取ります。$H$ が NP-hard なので、この $A$ に対する多項式時間全域関数 $f_A$ が存在し、

$$
x\in A\iff f_A(x)\in H
$$

です。$H\le_p B$ の帰着を $g$ とすれば

$$
y\in H\iff g(y)\in B
$$

が全ての $y$ で成立します。$y=f_A(x)$ を代入して

$$
x\in A\iff f_A(x)\in H
\iff g(f_A(x))\in B
$$

を得ます。[CPLX5の推移性](../CPLX5/index.md#prop-cplx5-reflexive-transitive)により、出力長の多項式上界を含め、$g\circ f_A$ は全域・多項式時間計算可能です。$A$ は任意なので $B$ は NP-hard。加えて $B\in NP$ なら NP-complete の定義の二条件を満たします。$\square$
<!-- proof-end -->

逆に $B\le_p H$ があるだけでは $B$ が NP-hard とは分かりません。例えば空言語 $\varnothing$ から $\mathit{BNA}$ への帰着は作れます。$\mathit{BNA}$ に属さない固定の不正符号 $z$ を出す $f(x)=z$ を使えば、任意の $x$ で $x\notin\varnothing$ かつ $f(x)\notin\mathit{BNA}$ です。しかし $\varnothing$ は NP-hard ではありません。もしそうなら、$\mathit{BNA}\in NP$ より $\mathit{BNA}\le_p\varnothing$ が必要ですが、$\mathit{BNA}$ の yes 入力は空集合の yes 入力には送れないからです。

## 5. P=NP と NP完全性の厳密な接続

NP完全問題を一つでも多項式時間で決定できれば、他の全 $NP$ 言語はその問題に帰着して多項式時間で決定できます。反対向きは、その NP完全問題自身が $NP$ に含まれることを使います。

<a id="thm-cplx6-p-np-equivalence"></a>

<!-- formal-statement-start -->
> **定理（NP完全問題の多項式時間決定と P=NP）**  
> 二進言語 $C$ が NP-complete であるとする。このとき

$$
C\in P\quad\Longleftrightarrow\quad P=NP
$$

> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図**　左から右は NP-hard の条件と帰着元への $P$ 所属の移送を使用します。右から左は $C\in NP$ という、NP-hard だけでは得られない条件を使用します。

<!-- proof-start -->
### 証明

まず $C\in P$ とします。任意の $A\in NP$ を固定すると、$C$ が NP-hard であるため $A\le_p C$ です。[CPLX5の $P$ 所属移送](../CPLX5/index.md#thm-cplx5-p-downward)へ $A,B=C$ を代入すると $A\in P$ です。$A$ が任意なので $NP\subseteq P$。さらに[CPLX4の包含](../CPLX4/index.md#prop-cplx4-p-in-np)から $P\subseteq NP$、よって $P=NP$。

逆に $P=NP$ とします。NP-complete の第1条件が $C\in NP$ なので $C\in P$ です。$\square$
<!-- proof-end -->

$\mathit{BNA}$ はこの定理の仮定を実際に満たすので、$P=NP$ と $\mathit{BNA}\in P$ は同値です。これは**未解決問題を解いた**という意味ではありません。両者のどちらが真かを決める多項式時間アルゴリズムも、不可能性の証明も、ここでは与えていません。

<a id="cor-cplx6-hard-in-p"></a>

<!-- formal-statement-start -->
> **系（NP-hard 問題が P に入るなら）**  
> NP-hard な言語 $H$ が $H\in P$ を満たすなら、$P=NP$ である。ただし逆向きに「$P=NP$ なら全ての NP-hard 言語が $P$ に入る」とは言えない。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A\in NP$ を任意に取ります。$H$ は NP-hard なので $A\le_p H$。仮定 $H\in P$ と[CPLX5の移送](../CPLX5/index.md#thm-cplx5-p-downward)から $A\in P$ を得ます。したがって $NP\subseteq P$、既知の $P\subseteq NP$ と合わせて等号です。逆向きの反例として、次節に決定不能な NP-hard 言語を構成します。$\square$
<!-- proof-end -->

## 6. NP-hard なのに NP に属さない問題

NP-hard の定義には $NP$ 所属が含まれていません。単に「未確認」なだけでなく、**NP に属さないと証明できる NP-hard 言語**も作れます。

[CMP5](../CMP5/index.md)の停止問題言語 $HALT$ は決定不能でした。二進文字列 $z$ を先頭ビットで二つに振り分け、$0$ 側に既知の NP完全言語、$1$ 側に停止問題を置きます。

<a id="prop-cplx6-hard-outside-np"></a>

<!-- formal-statement-start -->
> **命題（NPに属さないNP-hard言語の存在）**  
> 次の二進言語 $H$ は NP-hard だが $NP$ に属さない。

$$
H=\{0z:z\in\mathit{BNA}\}\cup\{1z:z\in HALT\}.
$$
<!-- formal-statement-end -->

**証明の見取り図**　$z\mapsto0z$ で $\mathit{BNA}$ の難しさを $H$ に移します。$H$ が決定できると仮定すると $z\mapsto1z$ を通じて停止問題まで決定できてしまいます。

<!-- proof-start -->
### 証明

$f(z)=0z$ を考えます。任意の $z$ について、$f(z)$ は先頭が $0$ なので、$H$ の第2の部分集合 $\{1w:w\in HALT\}$ に入れません。従って

$$
z\in\mathit{BNA}\iff0z\in H.
$$

$f$ は入力の先頭に一ビット加えるだけなので全域・$O(|z|+1)$ 時間で計算でき、$\mathit{BNA}\le_p H$ です。$\mathit{BNA}$ は NP-hard だから前節の移送命題より $H$ も NP-hard。

もし $H$ が決定可能なら、任意の $z$ に対し $1z$ が $H$ に属するかをその決定器で調べられます。$1z$ は先頭が $1$ なので第1の部分集合には入れず、

$$
z\in HALT\iff1z\in H
$$

です。決定器は全入力で停止するから、これで $HALT$ の決定器が構成され、決定不能性に矛盾します。従って $H$ は決定不能です。

$NP$ に属する言語は、長さが多項式で抑えられた証明書をすべて列挙し、全域検証器にかければ決定できます。有限個の候補を列挙し終えるため、この決定手続は停止します（指数時間でも構いません）。従って $NP$ の言語は全て決定可能であり、決定不能な $H$ は $NP$ に属しません。$\square$
<!-- proof-end -->

$\mathit{BNA}$ は NP-hard かつ $NP$、$H$ は NP-hard だが $NP$ の外です。どちらも「全 $NP$ 問題から帰着できる」という難しさの条件は同じですが、後者には検証器による多項式長証明書の保証がありません。

## 7. 次章への接続：SATに必要なのは残り一条件

SAT は[CPLX3で $NP$ 所属](../CPLX3/index.md#thm-cplx3-examples-in-np)を証明済みです。ゆえに SAT の NP完全性を示すには NP-hard だけを証明すれば足ります。そのために次章で $\mathit{BNA}$ のような任意の非決定性計算を、充足可能な命題論理式へ符号化します。

具体的には $A\in NP$ ごとに $x\mapsto\varphi_{A,x}$ を多項式時間で構成し、

$$
x\in A\iff\varphi_{A,x}\text{ が充足可能}
$$

を両方向に示します。**SAT が難しいと予想されること**と**SAT が NP-hard と証明されること**は別です。後者には変換構成とその正しさが必要です。

## 8. 演習

### Level A

### A1. 二つの条件を読み分ける

$C$ が NP-hard であり、さらに $C\in NP$ と分かった。何が結論できるか。また $C\in NP$ の情報を消した場合、同じ結論は残るか。定義の二条件を挙げて答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$NP$ 完全の第1条件は $C\in NP$、第2条件は「任意の $A\in NP$ に $A\le_p C$」です。NP-hard は第2条件そのものなので、二つの仮定があれば $C$ は NP-complete です。$C\in NP$ を消すと第1条件は保証されません。実際、本文の $H=\{0z:z\in\mathit{BNA}\}\cup\{1z:z\in HALT\}$ は NP-hard ですが、決定不能なので $NP$ に属しません。
<!-- solution-end -->

### A2. 帰着の向きを判定する

$C$ は NP-complete、$C\le_p B$ であるとする。(i) $B$ は NP-hard か。(ii) $B$ は NP-complete か。(ii) を言うのに追加で必要な条件を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

(i) $C$ は NP-hard です。任意の $A\in NP$ に対して $A\le_p C$ であり、$C\le_p B$ と推移性でつなぐと $A\le_p B$。よって $B$ は NP-hard。(ii) $B$ が $NP$ に属するかは与えられていないので確定できません。追加で $B\in NP$ が分かれば、NP-hard と合わせて NP-complete です。$B=H$、$C=\mathit{BNA}$ とすれば、追加条件が無くても NP-complete と言ってしまう推論への実際の反例になります。
<!-- solution-end -->

### A3. 単項時間制限の意味

$\mathit{BNA}$ への入力で、時間制限が $1^{32}$ の場合と、32 の二進表示 $100000$ の場合について、時間制限部分のビット数を答えよ。なぜ本文の証明書長評価 $|w|\le N(N+1)$ は単項表現を使うか述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$1^{32}$ は32ビット、$100000$ は6ビットです。単項なら時間制限部分だけで $t$ ビットあるため、入力全長 $N$ に対して $t\le N$ と言えます。分岐の指定に一歩当たり $\lceil\log_2(d+1)\rceil\le N+1$ ビットを使っても、総長は $t(N+1)\le N(N+1)$。二進では一般に $t$ が入力ビット数に対し指数的に大きくなるので、この評価の第一段 $t\le N$ が壊れます。
<!-- solution-end -->

### A4. NP-hard は決定不能という意味か

「NP-hard なら決定不能である」「NP-hard なら $NP$ に属する」という二つの言明を判定し、本文中の具体的な言語をそれぞれの反例に使え。

- Level: A

<!-- solution-start -->
#### 詳細解答

どちらも偽です。$\mathit{BNA}$ は NP-hard かつ $NP$ に属します。$NP$ の言語は証明書総当たりで決定可能なので、最初の「決定不能」を否定します。一方 $H$ は NP-hard ですが停止問題の決定不能性から $NP$ に属さないので、二番目を否定します。「NP-hard」は帰着の全称条件だけであり、決定可能性や $NP$ 所属を定義に含みません。
<!-- solution-end -->

### A5. 完全性の量化順序

各 $A\in NP$ に対し機械 $M_A$ と時間上界 $p_A$ を取って $f_A(x)=\langle M_A,x,1^{p_A(|x|)}\rangle$ とする。この構成で、機械を入力ごとに探索しなくてよい理由と、変換の実行時間が多項式である理由を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

帰着の定義は「任意の $A$ に対し、それ専用の関数 $f_A$ が存在する」という順序です。$A$ を固定した時点で $M_A,p_A$ も固定できるので、入力ごとに探索しません。入力 $x$ の長さ $n$ に対し、固定機械の記述を書き、$x$ をコピーし、$p_A(n)$ 個の $1$ を生成します。$p_A(n)$ は固定された整数多項式の値なので計算にも多項式時間を要し、出力ビット数は $O(n+p_A(n))$ の多項式です。出力の yes/no を判定する処理は含みません。
<!-- solution-end -->

### Level B

### B1. 二段帰着から完全性へ

$C$ は NP-complete、$C\le_p D$、$D\le_p E$ とする。(i) $E$ が NP-hard であることを示せ。(ii) $E\in NP$ のとき何が結論できるか。(iii) $D\in P$ なら何が従うか。

- Level: B

<!-- solution-start -->
#### 詳細解答

(i) 任意の $A\in NP$ を固定します。$C$ の NP-hard 性から $A\le_p C$。推移性を一回使い $A\le_p D$、さらに一回使い $A\le_p E$ です。各変換の全域性と多項式時間性は[CPLX5の合成](../CPLX5/index.md#prop-cplx5-reflexive-transitive)から保たれます。従って $E$ は NP-hard。(ii) $E\in NP$ と (i) を合わせ、$E$ は NP-complete。(iii) $C\le_p D$ かつ $D\in P$ によって $C\in P$。$C$ は NP-complete なので本文定理から $P=NP$。$D$ が NP に属するという追加仮定は (iii) に不要です。
<!-- solution-end -->

### B2. 等号の二方向を証明する

$C$ を NP-complete とする。$C\in P\iff P=NP$ を、帰着の向きと $C\in NP$ を使う場所をそれぞれ示して証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$C\in P$ と仮定します。任意の $A\in NP$ を取ると、NP-hard 性から $A\le_p C$。右の $C$ に決定性多項式時間決定器があるので、帰着を先に計算してその決定器に渡せば $A\in P$ です。従って $NP\subseteq P$。既知の $P\subseteq NP$ から $P=NP$。逆方向では $P=NP$ を仮定し、NP-complete のもう一つの条件 $C\in NP$ により $C\in P$ と結論します。逆方向で NP-hard 性は不要です。
<!-- solution-end -->

### B3. BNA の証明書長と計算時間

正しい $\mathit{BNA}$ 入力の長さを $N$、単項の時間制限を $t\le N$、一配置で選べる最大の遷移数を $d\le N$ とする。(i) $t$ 個の分岐番号の符号長の上界を求めよ。(ii) ある正の整数 $k$ で、機械の一遷移の模倣時間が $(N+t)^k$ 以下なら、受理枝の検証時間が多項式であることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

(i) 各番号を幅 $\ell=\lceil\log_2(d+1)\rceil$ で書くと、証明書長は $t\ell$ 以下です。$d\le N$ かつ $N\ge1$ なら $2^{N+1}\ge N+1\ge d+1$、よって $\ell\le N+1$。従って $t\ell\le N(N+1)$。(ii) 各模倣ステップが $(N+t)^k$ 時間以下、ステップ数は高々 $t$ だから、模倣時間は $t(N+t)^k$ 以下です。$t\le N$ を代入すると

$$
t(N+t)^k\le N(2N)^k=2^kN^{k+1}.
$$

証明書の読取り、符号の復号、合法遷移の確認も $N+|w|$ の多項式時間で実施できるので、全体が多項式時間です。受理枝がないときも $t$ 歩で必ず検査を打ち切ります。
<!-- solution-end -->

### B4. coNP にも属する NP-hard 言語

$H$ が NP-hard かつ $H\in coNP$ であるとする。$NP=coNP$ が従うことを示せ。ただし $coNP=\{L:\overline L\in NP\}$ とし、補集合は $\Sigma^*$ 内で取る。

- Level: B

<!-- solution-start -->
#### 詳細解答

任意の $A\in NP$ を選びます。$H$ が NP-hard なので $A\le_p H$。[CPLX5の補集合保存](../CPLX5/index.md#prop-cplx5-complement)から $\overline A\le_p\overline H$ です。$H\in coNP$ は定義により $\overline H\in NP$ という意味です。[CPLX5の NP 所属移送](../CPLX5/index.md#thm-cplx5-np-downward)を $\overline A\le_p\overline H$ に適用すると $\overline A\in NP$。よって $A\in coNP$ となり $NP\subseteq coNP$。

逆包含を得るため、任意の $B\in coNP$ を取り、$\overline B\in NP$ に先ほど得た包含を適用して $\overline B\in coNP$。これは補集合の定義から $B\in NP$ と同値です。従って $coNP\subseteq NP$ も成立し $NP=coNP$ です。$P=NP$ を仮定していません。
<!-- solution-end -->

### Level C

### C1. 先頭タグで作る二つの言語

本文の NP-complete 言語 $\mathit{BNA}$、$SAT\in NP$、決定不能言語 $HALT$ を用いる。次の言語を考える。

$$
D=\{0z:z\in\mathit{BNA}\}\cup\{1z:z\in SAT\},
\qquad
E=\{0z:z\in\mathit{BNA}\}\cup\{1z:z\in HALT\}.
$$

(i) $\mathit{BNA}\le_p D$ と $\mathit{BNA}\le_p E$ を具体的な変換で示せ。(ii) $D\in NP$ を、証明書長と検証器の停止を説明して示せ。(iii) $D$ は NP-complete であることを示せ。(iv) $E$ は NP-hard だが $NP$ に属さないことを示せ。(v) $D\in P$ と $P=NP$ が同値であることを両方向に示せ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(i) $f(z)=0z$ を両方の帰着に使います。$0z$ は $1$ 側に入れないので

$$
z\in\mathit{BNA}\iff0z\in D,
\qquad
z\in\mathit{BNA}\iff0z\in E.
$$

文字を一個追加する変換は全二進文字列で定義され、$O(|z|+1)$ 時間で計算できます。よって二つの多項式時間 many-one 帰着が成立します。

(ii) 入力が空文字なら拒否し、そうでなければ先頭ビット $b$ と残り $z$ に分けます。$b=0$ なら $\mathit{BNA}$ の検証器を用い、$b=1$ なら $SAT$ の検証器を用います。各検証器の証明書長上界をそれぞれ $p_0(|z|),p_1(|z|)$、実行時間上界を多項式 $q_0,q_1$ とします。証明書長を

$$
p(n)=p_0(n)+p_1(n)+1
$$

で上から抑え、長すぎる証明書は拒否します。$|z|\le|bz|$ であるため、非負係数の多項式上界へ置き直せば証明書長は入力全長の多項式です。先頭ビットで検証器を一つ選び、入力と証明書を渡す計算も多項式時間で停止します。さらに、$b=0$ では証明書が受理されることと $z\in\mathit{BNA}$、$b=1$ では $z\in SAT$ が各検証器の正しさから同値です。従って $D\in NP$。

(iii) (i) で NP-hard な $\mathit{BNA}$ から $D$ に帰着したので、移送命題から $D$ は NP-hard です。(ii) の $D\in NP$ と合わせ、NP-complete の二条件を満たします。

(iv) (i) と同じ移送命題から $E$ は NP-hard。$E$ が決定可能なら、入力 $z$ を $1z$ にして $E$ の決定器に渡すと

$$
z\in HALT\iff1z\in E
$$

により $HALT$ が決定可能になり矛盾です。したがって $E$ は決定不能。$NP$ 言語は短い証明書の有限列挙で決定可能なので、$E\notin NP$。

(v) $D\in P$ なら、任意の $A\in NP$ について NP-hard 性から $A\le_p D$、$P$ 所属の移送で $A\in P$。よって $NP\subseteq P$、既知の逆包含で $P=NP$ です。逆に $P=NP$ なら、(ii) の $D\in NP$ を使い $D\in P$。これは帰着先が $NP$ に属する条件を逆方向で使う点まで含めた同値です。
<!-- solution-end -->

これで、**難しさの移送、検証器による所属証明、決定不能性、$P=NP$ との同値**を、互いに独立の論理条件として使い分けられるようになりました。
