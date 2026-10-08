# AUT3 非決定性有限オートマトン・正規表現

[AUT2](../AUT2/index.md)のDFAでは、どの状態からも次の一文字に対する行き先がただ一つでした。しかし「最後の2文字が01である」を調べるには、入力を読んでいる途中で「今見た0が最後から2文字目かもしれない」と仮定し、外れたらその候補を捨てる方法も考えられます。どの0が最後から2文字目になるか、読んだ時点ではまだ分かりません。

そこで一つの文字から**複数の行き先を同時に候補にできる**機械を考えます。入力を読まずに移る操作も許せば、複数の機械を接ぎ合わせやすくなります。候補をすべて追跡すれば普通のDFAで再現できること、その機械と言語の「式による書き方」が一致することまで証明します。

## 1. 一つに決めなくてもよい遷移

まず $\Sigma=\{0,1\}$、$Q=\{p,r,f\}$ とします。初期状態 $p$ では0と1のどちらでも $p$ に留まれますが、0を読んだときには $r$ にも進めるようにします。$r$ から1を読んだときだけ $f$ に進め、$f$ を受理状態とします。

| 状態 | 0を読む行き先の集合 | 1を読む行き先の集合 |
|---|---|---|
| $p$ | $\{p,r\}$ | $\{p\}$ |
| $r$ | $\varnothing$ | $\{f\}$ |
| $f$ | $\varnothing$ | $\varnothing$ |

入力001では、最初の0で $p$ に留まる道を選び、次の0で $r$ へ進み、最後の1で $f$ に到達できます。一方で、最初の0で $r$ へ進んだ候補は次の0で行き止まりです。**一つでも受理に至る道があれば受理**します。選択が「運よく当たった」かを予測する計算手順ではなく、可能な道が存在するかという数学的条件です。

$\mathcal P(Q)$ は集合 $Q$ の部分集合全体（べき集合）です。DFAの遷移が $Q$ に値を取るのに対し、ここでは $\mathcal P(Q)$ に値を取ります。

<a id="def-aut3-nfa"></a>

<!-- formal-statement-start -->
### 定義（ε-遷移を許す非決定性有限オートマトン）

**非決定性有限オートマトン**（NFA）は五つ組 $N=(Q,\Sigma,\Delta,q_0,F)$ である。ただし $Q$ は空でない有限状態集合、$\Sigma$ は空でない有限アルファベット、$q_0\in Q$、$F\subseteq Q$ である。記号 $\varepsilon$ は $\Sigma$ の文字ではない「入力を消費しない遷移」のラベルとし、遷移写像は

$$
\Delta:Q\times(\Sigma\cup\{\varepsilon\})\longrightarrow\mathcal P(Q)
$$

とする。$\Delta(q,a)$ は $q$ からラベル $a$ で進める行き先すべての集合であり、空集合も許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aut3-nfa -->

**定義の確認**　上の表では $Q$ は3元で、初期状態は $p$、受理集合は $\{f\}$ です。表の各欄は $Q$ の部分集合です。さらにすべての $q\in Q$ について $\Delta(q,\varepsilon)=\varnothing$ と指定すれば定義域の全組で値が決まり、NFAの五つ組になります。例えば $\Delta(p,0)=\{p,r\}$ は二つの候補、$\Delta(f,1)=\varnothing$ は候補なしを表します。
<!-- definition-example-end -->

この定義では $\varepsilon$ を含む遷移も許します。これを使わない機械もNFAに含めます。ある入力に対する候補が空集合になれば、その道はそれ以上続きません。

## 2. ε-閉包と文字列全体の読み方

入力を一文字も読まないうちに、状態 $s$ から $\varepsilon$ で $p$ へ移れるとします。さらに $p$ から $\varepsilon$ で $r$ に移れるなら、開始時に $s,p,r$ のどこにもいられるはずです。これを一度の移動だけで切り捨てないため、到達可能な状態をまとめます。

<a id="def-aut3-epsilon-closure"></a>

<!-- formal-statement-start -->
### 定義（ε-閉包）

NFA $N=(Q,\Sigma,\Delta,q_0,F)$ と $S\subseteq Q$ に対し、$\varepsilon$-閉包 $E(S)$ は、ある $s\in S$ からラベル $\varepsilon$ の遷移を有限回（0回も可）たどって到達できる状態全体とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aut3-epsilon-closure -->

**定義の確認**　$Q=\{s,p,r,f\}$ で $\Delta(s,\varepsilon)=\{p\}$、$\Delta(p,\varepsilon)=\{r\}$、$\Delta(r,\varepsilon)=\{p\}$、$\Delta(f,\varepsilon)=\varnothing$ とします。$s$ から0回で $s$、1回で $p$、2回で $r$ に到達し、その後 $p$ と $r$ の間を巡回しても新しい状態は増えません。したがって $E(\{s\})=\{s,p,r\}$、$E(\{r\})=\{p,r\}$、$E(\varnothing)=\varnothing$ です。
<!-- definition-example-end -->

$\varepsilon$ の巡回があっても、$Q$ は有限なので、閉包を求めるときは新たに見つけた状態を追加し、同じ状態を再探索しなければ必ず停止します。0回の移動を許すため、常に $S\subseteq E(S)$ です。

一文字 $a\in\Sigma$ を消費した直後の行き先を、集合 $S$ に対して

$$
T_a(S)=\bigcup_{q\in S}\Delta(q,a)
$$

と書きます。先に $\varepsilon$ で移動できるだけ動き、次に $a$ を一回読み、その後も $\varepsilon$ で移動できるだけ動きます。最初に閉包を取った状態集合から始めれば、次の再帰式でこれを繰り返せます。

<a id="def-aut3-reachable-set"></a>

<!-- formal-statement-start -->
### 定義（NFAの到達状態集合と認識言語）

NFA $N=(Q,\Sigma,\Delta,q_0,F)$ と $S\subseteq Q$ に対し、$w\in\Sigma^*$ を読んだ後に可能な状態全体 $R(S,w)$ を、以下で定める。

$$
\begin{aligned}
R(S,\varepsilon)&=E(S),\\
R(S,wa)&=E(T_a(R(S,w)))\qquad(a\in\Sigma).
\end{aligned}
$$

$N$ が認識する言語は

$$
L(N)=\{w\in\Sigma^*:R(\{q_0\},w)\cap F\ne\varnothing\}
$$

である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aut3-reachable-set -->

**定義の確認**　前節の3状態NFAでは $\varepsilon$-遷移がなく、$E(S)=S$ です。文字列001では

$$
\begin{aligned}
R(\{p\},\varepsilon)&=\{p\},\\
R(\{p\},0)&=\{p,r\},\\
R(\{p\},00)&=\Delta(p,0)\cup\Delta(r,0)=\{p,r\},\\
R(\{p\},001)&=\Delta(p,1)\cup\Delta(r,1)=\{p,f\}.
\end{aligned}
$$

最後の集合が $\{f\}$ と交わるので受理します。010については0の後が $\{p,r\}$、01の後が $\{p,f\}$、010の後は $\Delta(p,0)\cup\Delta(f,0)=\{p,r\}$ で、受理状態と交わらず非受理です。
<!-- definition-example-end -->

<a id="lem-aut3-reachable-paths"></a>

<!-- formal-statement-start -->
### 補題（再帰式と受理経路）

任意のNFA、$S\subseteq Q$、$w\in\Sigma^*$ に対し、$q\in R(S,w)$ であることと、ある $s\in S$ から $q$ へ至り、辺のラベルから $\varepsilon$ を取り除くとちょうど $w$ になる有限経路が存在することは同値である。
<!-- formal-statement-end -->

**証明の見取り図**　空文字列の経路は $\varepsilon$ 辺だけです。末尾一文字 $a$ を付け加えた経路では、最後に消費した $a$ の辺を特定し、その前後の $\varepsilon$ 辺を分離します。

<!-- proof-start -->
### 証明

$|w|$ に関して帰納法を使います。$w=\varepsilon$ なら、入力を消費しない辺だけを通る経路が存在することは $E(S)$ の定義そのものです。

長さ $n$ のすべての $w$ で成立すると仮定し、$wa$（$a\in\Sigma$）を考えます。$q\in R(S,wa)=E(T_a(R(S,w)))$ なら、ある $u\in R(S,w)$、$v\in\Delta(u,a)$ があって $v$ から $q$ へ $\varepsilon$ 辺だけで進めます。帰納法から $S$ のある状態から $u$ へ、消費した文字列が $w$ となる経路が存在します。それへ $u\xrightarrow{a}v$ と $v$ から $q$ への $\varepsilon$ 経路を連結すれば、消費した文字列は $wa$ です。

逆に消費列 $wa$ を持つ有限経路があれば、最後に文字を消費した辺は $u\xrightarrow{a}v$ です。その直前までの消費列は $w$、その後の辺はすべて $\varepsilon$ です。帰納法から $u\in R(S,w)$、よって $v\in T_a(R(S,w))$、最後に $q\in E(T_a(R(S,w)))=R(S,wa)$ となります。両向きが成立し、帰納法が閉じます。
<!-- proof-end -->

ここで「経路が存在する」という見方と「集合を再帰計算する」という見方が一致しました。実際に判定する際は、経路を勘で選ばず、状態集合を更新すればよいわけです。

## 3. 部分集合構成：非決定性を一つの状態に詰める

NFAの状態集合 $S$ を、DFAの**一つの状態**だと思うことにします。集合の各要素は並列に残っている候補です。候補をまとめて更新すれば行き先はただ一つの集合になるので、DFAの全域遷移を作れます。

<a id="def-aut3-subset-construction"></a>

<!-- formal-statement-start -->
### 定義（ε-閉包を含む部分集合構成）

NFA $N=(Q,\Sigma,\Delta,q_0,F)$ に対して、DFA $D=(Q_D,\Sigma,\delta_D,s_D,F_D)$ を次で構成する。

$$
\begin{aligned}
Q_D&=\mathcal P(Q),\\
s_D&=E(\{q_0\}),\\
\delta_D(S,a)&=E(T_a(S)),\\
F_D&=\{S\subseteq Q:S\cap F\ne\varnothing\}.
\end{aligned}
$$

$\delta_D$ は $Q_D\times\Sigma$ のすべての組で定義される。空集合も一つのDFA状態として含む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aut3-subset-construction -->

**定義の確認**　前節の3状態NFAでは、初期集合は $\{p\}$ です。到達する集合は $\{p\},\{p,r\},\{p,f\}$ の三つで、その遷移表は次のようになります。

| DFA状態 | 0 | 1 | 受理 |
|---|---|---|---|
| $\{p\}$ | $\{p,r\}$ | $\{p\}$ | いいえ |
| $\{p,r\}$ | $\{p,r\}$ | $\{p,f\}$ | いいえ |
| $\{p,f\}$ | $\{p,r\}$ | $\{p\}$ | はい |

例えば $\delta_D(\{p,r\},1)=\Delta(p,1)\cup\Delta(r,1)=\{p,f\}$ です。$\{p,f\}$ は $f$ を含むので受理状態です。定義上の $Q_D$ は8状態ですが、初期状態から到達しない残り5状態を削除しても認識言語は変わりません。この表は到達可能部分だけを示しています。
<!-- definition-example-end -->

<a id="thm-aut3-subset-equivalence"></a>

<!-- formal-statement-start -->
### 定理（NFAのDFAへの変換）

任意の $\varepsilon$-遷移を許すNFA $N$ に対し、上の部分集合構成で得られるDFA $D$ は

$$
L(D)=L(N)
$$

を満たす。特に状態数が $m=|Q|$ のNFAが認識する言語は、状態数が高々 $2^m$ のDFAでも認識できる。
<!-- formal-statement-end -->

**証明の見取り図**　DFAの現在状態（部分集合）をNFAの到達状態集合と同一視します。空文字列から開始して一文字ずつ計算すると常に同じ集合になり、最後の集合が受理状態を含むかどうかも一致します。

<!-- proof-start -->
### 証明

$\widehat{\delta_D}$ をAUT2で定義したDFAの拡張遷移関数とします。任意の $w\in\Sigma^*$ に対して

$$
\widehat{\delta_D}(s_D,w)=R(\{q_0\},w)
$$

を長さによる帰納法で示します。$w=\varepsilon$ なら、左辺は $s_D=E(\{q_0\})$、右辺は $R(\{q_0\},\varepsilon)=E(\{q_0\})$ です。

長さ $n$ の $w$ で等式が成立するとし、$a\in\Sigma$ を一文字付け加えます。AUT2の拡張遷移の定義、$\delta_D$ の定義、帰納法の仮定の順に用いると

$$
\begin{aligned}
\widehat{\delta_D}(s_D,wa)
&=\delta_D(\widehat{\delta_D}(s_D,w),a)\\
&=\delta_D(R(\{q_0\},w),a)\\
&=E(T_a(R(\{q_0\},w)))\\
&=R(\{q_0\},wa).
\end{aligned}
$$

受理集合の定義を代入すれば、

$$
\begin{aligned}
w\in L(D)
&\iff\widehat{\delta_D}(s_D,w)\in F_D\\
&\iff R(\{q_0\},w)\cap F\ne\varnothing\\
&\iff w\in L(N).
\end{aligned}
$$

$|Q_D|=|\mathcal P(Q)|=2^m$ であり、到達可能部分だけを残せばその数を超えません。また $\delta_D(\varnothing,a)=E(\varnothing)=\varnothing$ なので、空集合でも遷移は全域です。
<!-- proof-end -->

逆にDFAは、行き先を一要素の集合にしたNFAとして見られます。

<a id="prop-aut3-dfa-to-nfa"></a>

<!-- formal-statement-start -->
### 命題（DFAはNFAの特別な場合）

DFA $M=(Q,\Sigma,\delta,q_0,F)$ に対し、$\Delta(q,a)=\{\delta(q,a)\}$、$\Delta(q,\varepsilon)=\varnothing$ と定めたNFA $N$ は $L(N)=L(M)$ を満たす。
<!-- formal-statement-end -->

**証明の見取り図**　一文字を読むたび候補が一つのまま保たれるので、最後の受理判定までDFAと同じです。

<!-- proof-start -->
### 証明

$\varepsilon$-遷移がないので $E(S)=S$ です。$R(\{q_0\},\varepsilon)=\{q_0\}=\{\widehat\delta(q_0,\varepsilon)\}$ です。$R(\{q_0\},w)=\{\widehat\delta(q_0,w)\}$ と仮定すると、

$$
\begin{aligned}
R(\{q_0\},wa)
&=\bigcup_{q\in\{\widehat\delta(q_0,w)\}}\Delta(q,a)\\
&=\{\delta(\widehat\delta(q_0,w),a)\}\\
&=\{\widehat\delta(q_0,wa)\}.
\end{aligned}
$$

これで任意の文字列に対して集合が一要素となることが分かります。この集合が $F$ と交わる条件は、唯一の要素が $F$ に属する条件に等しいため、両機械は同じ言語を認識します。
<!-- proof-end -->

ここまでで、「ある受理経路が存在する」という非決定性は**認識できる言語の種類を増やさない**と分かりました。ただし状態数の上界 $2^m$ は、より少ない状態で常に済むという保証ではありません。

## 4. 正規表現を集合として読む

機械を一台ずつ描く代わりに、「0または1を好きな回数だけ読んで、その後に01が来る」という条件を式で書きたいところです。正規表現では、和・連結・繰返しを言語の演算として扱います。ここでの $+$ は数の加法ではなく**言語の和集合**です。

<a id="def-aut3-regex"></a>

<!-- formal-statement-start -->
### 定義（正規表現とその表す言語）

有限アルファベット $\Sigma$ 上の**正規表現**は、基本式 $\emptyset,\varepsilon,a$（$a\in\Sigma$）から、式 $r,s$ に対する和 $(r+s)$、連結 $(rs)$、反復 $(r^*)$ を有限回用いて作られる式である。表現する言語 $\mathcal L(r)$ は

$$
\begin{aligned}
\mathcal L(\emptyset)&=\varnothing,&
\mathcal L(\varepsilon)&=\{\varepsilon\},&
\mathcal L(a)&=\{a\},\\
\mathcal L(r+s)&=\mathcal L(r)\cup\mathcal L(s),\\
\mathcal L(rs)&=\{uv:u\in\mathcal L(r),\ v\in\mathcal L(s)\},\\
\mathcal L(r^*)&=\bigcup_{n=0}^\infty\mathcal L(r)^n
\end{aligned}
$$

で定まる。ただし $A^0=\{\varepsilon\}$、$A^{n+1}=A^nA$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aut3-regex -->

**定義の確認**　$\Sigma=\{0,1\}$ とし、$r=(0+1)^*01$ とします。$\mathcal L(0+1)=\{0,1\}$、$\mathcal L((0+1)^*)=\{0,1\}^*$ です。最後に $\{0\}$、$\{1\}$ を連結するので、$\mathcal L(r)$ は01で終わる二進文字列全体です。001は $0\cdot0\cdot1$ と分けて含まれますが、010は最後が10なので含まれません。$\mathcal L(\emptyset)=\varnothing$ と $\mathcal L(\varepsilon)=\{\varepsilon\}$ は異なります。
<!-- definition-example-end -->

反復の $n=0$ の項は必ず $\{\varepsilon\}$ です。従って $\mathcal L(r^*)$ は $r$ が空文字列を表さなくても空文字列を含みます。一方 $\emptyset r$ の言語は空であり、$\varepsilon r$ の言語は $\mathcal L(r)$ です。いずれも表現の「見た目」ではなく集合演算で確認できます。

## 5. 正規表現からNFAを作る

表現 $r$ ごとに、開始点 $s$ と唯一の受理点 $t$ を持つNFAを作ります。部分構成の状態は互いに別名にして使い、$s\ne t$、$s$ へ入る辺と $t$ から出る辺はないように保ちます。この作り方なら言語の演算に合わせて部品を接続できます。

<a id="lem-aut3-regex-to-nfa"></a>

<!-- formal-statement-start -->
### 補題（正規表現からε-NFAへの構成）

任意の有限アルファベット $\Sigma$ 上の正規表現 $r$ に対し、開始状態 $s$、唯一の受理状態 $t$ を持ち、$s\ne t$、$s$ に入る辺と $t$ から出る辺を持たない有限 $\varepsilon$-NFA $N_r$ を構成でき、しかも

$$
L(N_r)=\mathcal L(r)
$$

が成立する。
<!-- formal-statement-end -->

**証明の見取り図**　基本式は2状態だけで表します。和は新しい開始点から二つの部品に分岐し、連結は前の部品の終点から後の始点へ進み、反復は終点から始点へ戻します。すべて $\varepsilon$ 辺で接ぎ、文字を消費しません。

<!-- proof-start -->
### 証明

正規表現の作り方（構造）について帰納法を用います。以下の各構成で、指定しない遷移集合は空とします。

**基本式**：新しい異なる状態 $s,t$ を用意します。$\emptyset$ には辺を置かないので受理経路は存在せず、言語は $\varnothing$ です。$\varepsilon$ では $s\xrightarrow{\varepsilon}t$ のみを、$a\in\Sigma$ では $s\xrightarrow{a}t$ のみを置きます。受理までに消費する文字列はそれぞれ $\varepsilon$、$a$ だけです。

**和 $r+s$**：帰納法で得た二つの部品の状態集合を互いに素にし、新たな開始点 $u$ と受理点 $v$ を追加します。$u$ から各部品の開始点へ $\varepsilon$ 辺を張り、各部品の受理点から $v$ へ $\varepsilon$ 辺を張ります。$u$ から $v$ への受理経路は最初の分岐で片方の部品を選び、内部で消費する語が $\mathcal L(r)$ または $\mathcal L(s)$ に属する場合に限り存在します。従って言語は $\mathcal L(r)\cup\mathcal L(s)$ です。

**連結 $rs$**：二つの部品を別々の状態にし、$r$ 部品の受理点から $s$ 部品の開始点へ $\varepsilon$ 辺を張ります。開始点は $r$ 側、唯一の受理点は $s$ 側とします。部品の境界を逆行する辺がないので受理経路は必ず前半を通ってから後半へ進みます。前半と後半の消費語を $u,v$ とすれば全体は $uv$ です。逆に任意の $u\in\mathcal L(r)$、$v\in\mathcal L(s)$ の受理経路を接続できます。従って言語は $\mathcal L(r)\mathcal L(s)$ です。

**反復 $r^*$**：$r$ の部品に新しい開始点 $u$ と受理点 $v$ を加え、$u\to v$、$u\to s$、$t\to s$、$t\to v$ の四つの $\varepsilon$ 辺を追加します（$s,t$ は元の部品の両端）。$u\to v$ を選べば0回反復、$u\to s$ から部品を一回通り $t\to v$ へ進めば1回です。さらに $t\to s$ を有限回使えば任意の有限回反復になります。受理経路は有限なので、消費語はある $n\ge0$ に対する $n$ 個の $\mathcal L(r)$ の語の連結です。逆にそのような連結が与えられれば部品の受理経路を順に接続できます。従って言語は $\bigcup_{n\ge0}\mathcal L(r)^n$ です。

各操作で有限個の状態と辺しか増やさず、新しい開始点へ入る辺も新しい受理点から出る辺もありません。帰納法により主張が成り立ちます。
<!-- proof-end -->

例えば $01$ は $0$ 部品の終点から $1$ 部品の始点へ $\varepsilon$ 辺を張れば表せます。表現が長くても、どの部分が「和」「連結」「反復」を担当するかを追えば、機械を順序立てて組み立てられます。

## 6. NFAから正規表現を取り出す

逆向きは少し難しくなります。機械が状態を何度も訪れるため、すべての受理経路を列挙することはできません。そこで「途中で通ってよい状態」を一つずつ増やし、途中の状態を通る場合と通らない場合に経路を分けます。

$Q=\{1,\ldots,m\}$ と番号を付けます。正規表現 $r_{ij}^{(k)}$ を、状態 $i$ から $j$ へ行く経路のうち、**始点と終点を除く中間状態**に使える番号が $\{1,\ldots,k\}$ に限られるものの消費語を表す式として構成します。経路は長さ0でもよく、同じ状態を繰返し通ってよいものとします。

<a id="lem-aut3-state-elimination"></a>

<!-- formal-statement-start -->
### 補題（中間状態を一つずつ許す正規表現）

有限 $\varepsilon$-NFA $N$ の状態を $1,\ldots,m$ と番号付けする。$r_{ij}^{(0)}$ を、$i\to j$ の直接の辺のラベルの和に、$i=j$ なら $\varepsilon$ を加えた正規表現とする（該当するものがなければ $\emptyset$）。$k=1,\ldots,m$ に対し

$$
r_{ij}^{(k)}
=
r_{ij}^{(k-1)}
+
r_{ik}^{(k-1)}
(r_{kk}^{(k-1)})^*
r_{kj}^{(k-1)}
$$

と定める。このとき $\mathcal L(r_{ij}^{(k)})$ は、$i$ から $j$ への有限経路のうち、中間状態がすべて $\{1,\ldots,k\}$ に属するものが消費する語の集合に等しい。
<!-- formal-statement-end -->

**証明の見取り図**　新たに許す状態 $k$ を経路が中間に通らない場合と、通る場合に分けます。通る場合は、最初に $k$ に着く部分、$k$ に戻る周回を0回以上、最後に $k$ から出る部分へ分解します。

<!-- proof-start -->
### 証明

$k$ について帰納法を行います。$k=0$ では中間状態を許さないので、経路は1本の直接辺か、$i=j$ のときの長さ0の経路です。直接辺が複数ある場合、そのラベルの和が表す集合はその辺の消費語の和集合です。ゆえに $r_{ij}^{(0)}$ の定義が正確です。$\varepsilon$ 辺がある場合も消費する文字列は $\varepsilon$ です。

$k-1$ で成立すると仮定します。中間状態として $k$ を訪れない経路の語は $\mathcal L(r_{ij}^{(k-1)})$ です。$k$ を中間に訪れる経路を考えます。その最初の $k$ への到達で切り、最後の $k$ からの出発で切ります。始点 $i$ から最初の $k$ までと、最後の $k$ から終点 $j$ までの間の中間状態は $k$ 以外の $\{1,\ldots,k-1\}$ に属します。二つの訪問の間を、続けて現れる $k$ の訪問ごとの周回に分解すれば、各周回の中間状態にも $k$ は現れません。

帰納法から三種類の部分経路の語はそれぞれ $\mathcal L(r_{ik}^{(k-1)})$、$\mathcal L(r_{kk}^{(k-1)})$、$\mathcal L(r_{kj}^{(k-1)})$ に属します。周回の回数は0を含む任意の有限回なので、消費語は

$$
\mathcal L(r_{ik}^{(k-1)})
\mathcal L((r_{kk}^{(k-1)})^*)
\mathcal L(r_{kj}^{(k-1)})
$$

に属します。逆にこの連結言語の任意の語には帰納法で三種類の経路を選べ、$k$ で接ぎ合わせた経路は許された中間状態だけを通ります（$i=k$ や $j=k$ の場合も長さ0の部分経路を使えます）。よってこの積は「$k$ を通る経路」の語をちょうど表します。通らない場合との和を取った再帰式がすべての経路を覆い、帰納法が閉じます。
<!-- proof-end -->

ここで中間状態をすべて許せば、どの有限経路も含まれます。受理点は複数あって構いません。

<a id="thm-aut3-kleene"></a>

<!-- formal-statement-start -->
### 定理（Kleeneの定理）

有限アルファベット $\Sigma$ 上の言語 $L\subseteq\Sigma^*$ について、次の3条件は同値である。

1. $L$ はあるDFAで認識される。
2. $L$ はある（$\varepsilon$-遷移を許す）NFAで認識される。
3. $L=\mathcal L(r)$ となる正規表現 $r$ が存在する。
<!-- formal-statement-end -->

**証明の見取り図**　(1)から(2)へはDFAを一要素遷移のNFAと見ます。(2)から(1)へは部分集合構成、(3)から(2)へは式の構造に沿った接続、(2)から(3)へは中間状態の消去です。四つの構成の両向きを合わせるのが定理の中身です。

<!-- proof-start -->
### 証明

(1)$\Rightarrow$(2) は [DFAはNFAの特別な場合](#prop-aut3-dfa-to-nfa) の命題、(2)$\Rightarrow$(1) は [部分集合構成](#thm-aut3-subset-equivalence) の定理により従います。いずれも機械が認識する言語の等号まで証明しました。

(3)$\Rightarrow$(2) は [正規表現からNFAへの構成](#lem-aut3-regex-to-nfa) を $r$ に適用します。得られた $N_r$ は $L(N_r)=\mathcal L(r)=L$ を満たします。

(2)$\Rightarrow$(3) では、与えられたNFAの状態に番号 $1,\ldots,m$ を付け、[中間状態の補題](#lem-aut3-state-elimination) によって $r_{ij}^{(m)}$ を構成します。初期状態の番号を $i_0$、受理状態の番号集合を $I_F$ とします。$I_F$ が空なら $r=\emptyset$、そうでなければ

$$
r=\sum_{j\in I_F}r_{i_0j}^{(m)}
$$

と置きます。和は有限個の式の和です。補題により $\mathcal L(r)$ は初期状態から何らかの受理状態へ至る有限経路が消費する語全体であり、[受理経路の補題](#lem-aut3-reachable-paths) によってちょうど $L(N)$ です。これで四つの方向がすべて示され、3条件は同値です。
<!-- proof-end -->

**結論の使いどころ**　正規表現を思い付いたら機械にして所属判定ができ、NFAの構成が簡単ならDFAへ変換できます。逆に有限状態で認識できることを示せた言語は、どれほど長くなっても正規表現で記述可能です。次章では「それでも表せない言語」を証明します。

## 演習

### Level A

### A1. ε-閉包と巡回

$Q=\{s,p,r,t\}$、$\Delta(s,\varepsilon)=\{p\}$、$\Delta(p,\varepsilon)=\{r\}$、$\Delta(r,\varepsilon)=\{p\}$ とし、ほかの $\varepsilon$-遷移は空とする。$E(\{s\})$、$E(\{r\})$、$E(\{t\})$、$E(\varnothing)$ を求め、巡回が閉包を無限集合にしない理由を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$s$ から0回で $s$、1回で $p$、2回で $r$ に着き、次は $p$ へ戻るので $E(\{s\})=\{s,p,r\}$ です。$r$ から0回で $r$、1回で $p$、2回で $r$ なので $E(\{r\})=\{r,p\}$。$t$ からは辺がないため $E(\{t\})=\{t\}$。空集合には出発状態がなく、$E(\varnothing)=\varnothing$ です。経路の本数が無限でも、到達先は有限集合 $Q$ の元だけなので閉包は高々4状態です。
<!-- solution-end -->

### A2. NFAの候補集合を追う

§1の3状態NFAで入力101、001、010について、各接頭部を読んだ後の状態集合と受理判定を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

初期集合は $\{p\}$ です。101では $1:\{p\}$、$10:\{p,r\}$、$101:\{p,f\}$ となり受理。001では $0:\{p,r\}$、$00:\{p,r\}$、$001:\{p,f\}$ となり受理。010では $0:\{p,r\}$、$01:\Delta(p,1)\cup\Delta(r,1)=\{p,f\}$、$010:\Delta(p,0)\cup\Delta(f,0)=\{p,r\}$ なので非受理です。どの場合も最後の集合が $\{f\}$ と交わるかだけを判定しました。
<!-- solution-end -->

### A3. ε-遷移を読まずに動く

$Q=\{s,u,f\}$、$\Sigma=\{0,1\}$、$q_0=s$、$F=\{f\}$、$\Delta(s,\varepsilon)=\{u\}$、$\Delta(u,0)=\{f\}$ とし、ほかはすべて空とする。$\varepsilon,0,00$ の到達状態集合と受理を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$R(\{s\},\varepsilon)=E(\{s\})=\{s,u\}$ で、$f$ を含まないので空文字列は非受理です。$0$ では $T_0(\{s,u\})=\Delta(s,0)\cup\Delta(u,0)=\varnothing\cup\{f\}=\{f\}$、その閉包も $\{f\}$ なので受理。$00$ では $T_0(\{f\})=\varnothing$、$E(\varnothing)=\varnothing$ となり非受理です。$\varepsilon$ 辺は入力文字数を増やしていません。
<!-- solution-end -->

### A4. 正規表現の空集合と空文字

$\Sigma=\{0,1\}$ に対し、$\emptyset^*$、$\varepsilon 1$、$(0+1)^*0$ が表す言語を説明せよ。各言語が $\varepsilon$、0、10を含むかも答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\mathcal L(\emptyset)^0=\{\varepsilon\}$、$n\ge1$ では $\varnothing^n=\varnothing$ なので $\mathcal L(\emptyset^*)=\{\varepsilon\}$。従って $\varepsilon$ のみ含み、0と10は含みません。$\mathcal L(\varepsilon1)=\{\varepsilon\}\{1\}=\{1\}$ なので指定された3語はいずれも含みません。$\mathcal L((0+1)^*0)=\{u0:u\in\{0,1\}^*\}$ は0で終わる語全体です。0は $u=\varepsilon$、10は $u=1$ と分解できて含まれますが、$\varepsilon$ は末尾に0を持たないので含まれません。
<!-- solution-end -->

### A5. 部分集合構成の空集合

$Q=\{s,f\}$、$q_0=s$、$F=\{f\}$、$\Delta(s,1)=\{f\}$、それ以外（$\varepsilon$ を含む）の遷移は空とする。部分集合構成で $\{s\}$、$\{f\}$、$\varnothing$ からの0、1の行き先を求め、入力11と1を判定せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\varepsilon$-遷移がないので閉包は集合自身です。$\{s\}$ からは0で $\varnothing$、1で $\{f\}$。$\{f\}$ からは0、1ともに $\varnothing$。$\varnothing$ からはどちらでも $\varnothing$ です。これで到達可能な3状態の遷移がすべて指定され、DFAの全域性を満たします。入力1は $\{s\}\xrightarrow{1}\{f\}$ で受理、入力11は $\{s\}\xrightarrow{1}\{f\}\xrightarrow{1}\varnothing$ で非受理です。
<!-- solution-end -->

### Level B

### B1. ε-閉包を含む部分集合DFA

$Q=\{s,p,f\}$、$\Sigma=\{0,1\}$、$q_0=s$、$F=\{f\}$ とする。非空の遷移は $\Delta(s,\varepsilon)=\{p\}$、$\Delta(p,0)=\{p,f\}$、$\Delta(f,1)=\{f\}$ だけである。部分集合構成で初期集合から到達可能なDFA状態と0、1の遷移をすべて書き、入力01と001を判定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

初期集合は $E(\{s\})=\{s,p\}$ です。これを $A$ と書き、$B=\{p,f\}$、$C=\{f\}$、$Z=\varnothing$ と置きます。$A$ から0では $\Delta(s,0)\cup\Delta(p,0)=\{p,f\}=B$、1では空なので $Z$ です。$B$ から0では $\Delta(p,0)\cup\Delta(f,0)=B$、1では $\Delta(p,1)\cup\Delta(f,1)=\{f\}=C$。$C$ から0では $Z$、1では $C$。$Z$ からはどちらも $Z$ です。これらの集合には $s$ が含まれないので、その後に新しい $\varepsilon$-遷移が発生することはありません。

| 状態（集合） | 0 | 1 | 受理 |
|---|---|---|---|
| $A=\{s,p\}$ | $B$ | $Z$ | いいえ |
| $B=\{p,f\}$ | $B$ | $C$ | はい |
| $C=\{f\}$ | $Z$ | $C$ | はい |
| $Z=\varnothing$ | $Z$ | $Z$ | いいえ |

0を読むと $B$、続けて1で $C$ なので01は受理。001は $A\xrightarrow{0}B\xrightarrow{0}B\xrightarrow{1}C$ となり受理です。四状態以外は初期集合からどの文字列でも到達せず、削除しても認識言語に影響しません。
<!-- solution-end -->

### B2. 表現 $(0+1)^*01$ を部品から作る

$(0+1)^*01$ と同じ言語を受理するNFAを、状態 $p,r,f$ の3状態で構成せよ。各状態・文字の行き先を完全に指定し、入力001と010の受理を確認せよ。また、§5の構造帰納法が保証するものを説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$Q=\{p,r,f\}$、$q_0=p$、$F=\{f\}$ とし、$\Delta(p,0)=\{p,r\}$、$\Delta(p,1)=\{p\}$、$\Delta(r,1)=\{f\}$、ほかの文字遷移および $\varepsilon$-遷移は空とします。これは§1の機械です。001の集合列は $\{p\}\to\{p,r\}\to\{p,r\}\to\{p,f\}$ で受理、010の集合列は $\{p\}\to\{p,r\}\to\{p,f\}\to\{p,r\}$ で非受理です。任意の受理経路では最後に $r\xrightarrow{1}f$ を使い、その直前には $p\xrightarrow{0}r$ を使う必要があります。それ以前は $p$ の0、1のループだけなので消費語は必ず $u01$ です。逆に任意の $u\in\{0,1\}^*$ について、$u$ の間は $p$ に留まり、末尾01で $r,f$ へ進めます。従って言語は $\{0,1\}^*\{01\}$ です。§5の構造帰納法は一般にどの正規表現にも同じ言語のNFAが存在することを保証しますが、構成されたNFAの状態数が最小であるとは述べません。
<!-- solution-end -->

### B3. 状態消去の再帰を手で計算

アルファベット $\{0,1\}$ 上に状態 $1,2$ を持ち、唯一の辺 $1\xrightarrow{0}2$ と $2\xrightarrow{1}2$ を持つNFAを考える。初期状態は1、受理状態は2で、ほかの遷移は空とする。$r_{12}^{(0)},r_{22}^{(0)},r_{12}^{(1)},r_{12}^{(2)}$ を§6の式に従って求め、表す言語を確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

直接辺と長さ0の経路より、$r_{12}^{(0)}=0$、$r_{22}^{(0)}=\varepsilon+1$、$r_{11}^{(0)}=\varepsilon$、$r_{21}^{(0)}=\emptyset$ です。$k=1$ では

$$
\begin{aligned}
r_{12}^{(1)}
&=r_{12}^{(0)}+r_{11}^{(0)}(r_{11}^{(0)})^*r_{12}^{(0)}\\
&=0+\varepsilon(\varepsilon)^*0.
\end{aligned}
$$

この式の言語は $\{0\}$ です。同じ再帰で $r_{22}^{(1)}=(\varepsilon+1)+\emptyset(\varepsilon)^*0$ となるため、その言語は $\{\varepsilon,1\}$ です。$k=2$ では

$$
r_{12}^{(2)}
=
r_{12}^{(1)}
+
r_{12}^{(1)}(r_{22}^{(1)})^*r_{22}^{(1)}.
$$

したがってその言語は $\{0\}\cup\{0\}\{\varepsilon,1\}^*\{\varepsilon,1\}=\{01^n:n\ge0\}$ です。直接0を読んで状態2へ移り、その後1のループを0回以上通る経路と一致します。式を簡約すると正規表現 $01^*$ と同じ言語です。
<!-- solution-end -->

### B4. 空文字を含む反復

$\Sigma=\{a\}$ とする。正規表現 $(\varepsilon+a)^*$ と $a^*$ の表す言語が等しいことを示せ。また、$\varepsilon$-遷移に巡回があるNFAでも入力長0に対して「無限回移動してから受理」を要求する必要がないことを説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\mathcal L(\varepsilon+a)=\{\varepsilon,a\}$ です。ここから $n$ 個連結した語は、各因子から $\varepsilon$ または $a$ を選ぶので、ある $0\le k\le n$ に対する $a^k$ になります。従って $\mathcal L((\varepsilon+a)^*)\subseteq\{a^k:k\ge0\}$。逆に任意の $k\ge0$ に対して $k$ 個の因子すべてから $a$ を選べば $a^k$ が得られ、$k=0$ は0回反復で空文字列です。よって逆包含も成り立ち $\mathcal L((\varepsilon+a)^*)=\mathcal L(a^*)$ です。NFAの受理は有限経路の存在で定義しています。$\varepsilon$ の巡回を何回でもたどれることは、受理まで無限回の移動を実行する必要があるという意味ではありません。有限回で受理状態へ至る道があれば受理し、なければ巡回をいくら繰返しても受理にはなりません。
<!-- solution-end -->

### Level C

### C1. 「01で終わる」と三つの表現

$\Sigma=\{0,1\}$ 上の言語 $L=\{w\in\Sigma^*:w\text{ の末尾2文字が }01\}$ を考える。(i) 正規表現を与え、(ii) 3状態のNFAを構成し、全入力で言語が一致することを経路の形から証明せよ。(iii) そのNFAを部分集合構成し、到達可能なDFA状態を全列挙して遷移表と受理集合を与えよ。(iv) DFAとNFAが同じ言語を認識する理由を、具体例だけに依存せず説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(i) $r=(0+1)^*01$ と置きます。$(0+1)^*$ は任意の二進文字列なので、$r$ が表す語は $u01$（$u\in\Sigma^*$）に限られます。逆に末尾2文字が01の語はその直前の接頭部を $u$ と書けるので、$\mathcal L(r)=L$ です。

(ii) $Q=\{p,r,f\}$、$q_0=p$、$F=\{f\}$ とし、$\Delta(p,0)=\{p,r\}$、$\Delta(p,1)=\{p\}$、$\Delta(r,1)=\{f\}$、ほかの遷移（$\varepsilon$ を含む）は空とします。$f$ に入る唯一の辺は $r\xrightarrow{1}f$、$r$ に入る唯一の辺は $p\xrightarrow{0}r$ なので、受理経路があれば最後の2文字は01です。また $p$ には0でも1でも戻る辺があり、語 $u01$ が来たら $u$ をすべて $p$ で読み、最後に $p\xrightarrow{0}r\xrightarrow{1}f$ と選べます。従って $L(N)=L$ が両包含から従います。

(iii) $\varepsilon$-辺がないので $E(S)=S$ です。初期状態は $A=\{p\}$ とし、0で $B=\{p,r\}$、1で $A$ へ行きます。$B$ から0なら $\Delta(p,0)\cup\Delta(r,0)=B$、1なら $\Delta(p,1)\cup\Delta(r,1)=\{p,f\}=C$ です。$C$ から0なら $\Delta(p,0)\cup\Delta(f,0)=B$、1なら $\Delta(p,1)\cup\Delta(f,1)=A$ です。

| DFA状態 | 0 | 1 | 受理 |
|---|---|---|---|
| $A=\{p\}$（初期） | $B$ | $A$ | いいえ |
| $B=\{p,r\}$ | $B$ | $C$ | いいえ |
| $C=\{p,f\}$ | $B$ | $A$ | はい |

初期状態から新しい集合はこれ以上増えません。$F_D$ のうち到達可能な状態は $f$ を含む $C$ のみです。例えば001は $A\xrightarrow{0}B\xrightarrow{0}B\xrightarrow{1}C$ で受理、010は $A\xrightarrow{0}B\xrightarrow{1}C\xrightarrow{0}B$ で非受理です。

(iv) 入力 $w$ を読んだDFA状態がNFAの候補集合 $R(\{p\},w)$ と一致することを示します。空文字では両辺が $\{p\}$。$w$ で一致したと仮定すると、一文字 $a$ の追加後はDFA側で $\delta_D(R(\{p\},w),a)$、NFA側で $R(\{p\},wa)$ であり、どちらも $\bigcup_{q\in R(\{p\},w)}\Delta(q,a)$ に等しいので帰納法が閉じます。DFAの受理はその集合が $f$ を含むことと同値で、NFAの受理条件も同じです。従って任意の $w$ で $L(D)=L(N)=L=\mathcal L(r)$ が成立します。
<!-- solution-end -->
