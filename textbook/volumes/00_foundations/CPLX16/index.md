# CPLX16 多項式階層

[CPLX15の階層定理](../CPLX15/index.md#thm-cplx15-time-hierarchy)は、計算時間や空間を十分に増やせば判定できる言語が厳密に増えると示しました。しかし、[CPLX3のNP](../CPLX3/index.md)の「答えを肯定する短い証明書」と、その否定側の「反例を提示する」という二種類の力は、単に時間を増やすだけでは比べられません。

[CPLX14の量化Boolean論理式](../CPLX14/index.md#def-cplx14-qbf)では、存在側が選んだ後で全称側が応じるゲームを考えました。その発想を、**入力長の多項式で長さを制限した選択**へ適用します。「私が選ぶ」「どんな反論に対しても」「さらに応答を選べる」という交代を何段認めるか。これが**多項式階層**です。量化の交代段数を固定する点が、交代段数自体を入力長に応じて増やせるTQBFと決定的に違います。

この章では、量化による定義、補集合との関係、oracleによる同じ階層の表現、階層が崩壊する条件を順に確かめます。各段が本当に異なるかは、現在も分かっていません。

## 1. 多項式長の選択を交互に許す

最初に小さなゲームを見ましょう。真偽値を選ぶ変数を $u,v$ とし、「$u$ を選び、その後どちらの $v$ に対しても $u\lor v$ が真か」を問います。$u=1$ で勝てるため、次の文は真です。

$$
\exists u\in\{0,1\}\ \forall v\in\{0,1\}:\ u\lor v=1.
$$

一方、選ぶ順序を逆にした「どの $u$ に対しても、適切な $v$ がある」は別の主張です。選択できる値が過去の選択に依存することが、量化の順序を区別する理由です。

任意の判定問題を二進文字列の集合 $L\subseteq\{0,1\}^*$ と考えます。入力を $x$、長さを $n=|x|$ とします。多項式 $p$ は非負整数値で、十分大きい $n$ で各選択文字列の長さを制限します。空きビットは無視できるので、長さが高々 $p(n)$ の選択は $p(n)$ ビットに統一できます。$R$ は、入力と全ての選択文字列を受け取って多項式時間で真偽を判定する述語です。

<a id="def-cplx16-alternating-levels"></a>

<!-- formal-statement-start -->
> **定義（多項式階層の量化子による各層）**  
> $\Sigma_0^P=\Pi_0^P=P$ とする。固定整数 $k\ge1$ に対し、言語 $L\subseteq\{0,1\}^*$ が $\Sigma_k^P$ に属するとは、多項式 $p$ と決定性多項式時間述語 $R$ が存在し、すべての入力 $x$ について、次の $k$ 個の量化ブロックによる同値が成り立つことである。

$$
x\in L\ \Longleftrightarrow\
\exists y_1\in\{0,1\}^{p(n)}
\ \forall y_2\in\{0,1\}^{p(n)}
\ \cdots\ Q_k y_k\in\{0,1\}^{p(n)}
:\ R(x,y_1,\ldots,y_k)=1.
$$

> ここで量化子は存在・全称を交互に並べ、$Q_k$ はその最後の量化子である。$\Pi_k^P$ は同じ条件の先頭を $\forall y_1$ に替え、その後を交互に並べた言語のクラスとする。各層で $k$ は入力長に依存しない**定数**である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cplx16-alternating-levels -->
**定義の確認**　$L_{\exists\forall}$ を、二変数の式 $F(u,v)$ の符号で、ある $u$ を選ぶとすべての $v$ で $F(u,v)$ が真となるものの集合とします。述語 $R(\langle F\rangle,u,v)$ を「$F(u,v)$ の評価が1」とすれば、$u,v$ はそれぞれ1ビット、評価は式の長さに比例する時間でできます。したがって $L_{\exists\forall}\in\Sigma_2^P$ です。例の $F(u,v)=u\lor v$ なら $u=1$ により真、$F(u,v)=u\land v$ なら $v=0$ を選ぶ反例が常に存在するので偽です。単に記号を貼るのではなく、述語の実行時間と選択の長さまで確認しました。
<!-- definition-example-end -->

例えば存在量化が二つ続く場合は、選択を連結して一つのブロックにできます。

$$
\exists a\in\{0,1\}^r\ \exists b\in\{0,1\}^s\ R(x,a,b)
\ \Longleftrightarrow\
\exists w\in\{0,1\}^{r+s}\ R(x,w_{1:r},w_{r+1:r+s}).
$$

全称同士も同じです。**交代した回数ではなく、連続する同種の量化子をまとめたブロック数**を使います。量化ブロックの長さが互いに異なっても最大の長さにパディングできます。多項式個のビットを一つずつ量化しても、連続した同種の量化をまとめれば一つのブロックです。

## 2. NPとcoNPは最初の二方向

最初の層には、既習のNPがそのまま現れます。また、肯定を短く検証できる言語を裏返した「否定を短く検証できる言語」のクラスを考える必要があります。

<a id="def-cplx16-conp"></a>

<!-- formal-statement-start -->
> **定義（補クラスcoNP）**  
> 言語 $L\subseteq\{0,1\}^*$ の補言語を $\overline L=\{0,1\}^*\setminus L$ とする。$coNP$ は $\overline L\in NP$ を満たす言語 $L$ の全体である。$coNP$ は「NPの外側」という集合差の名称ではなく、NPに属する言語の**補言語全体**を意味する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cplx16-conp -->
**定義の確認**　充足可能な命題論理式の符号を集めたSATは、[CPLX7のCook–Levinの定理](../CPLX7/index.md)の前提にあるようにNPに属します。全く充足割当てが存在しない式の符号全体をUNSATとすれば、不正符号を所定の規則で判定するよう言語を整えた上で、UNSATはSATの補言語として$coNP$に属します。UNSATがNPにも属するかはここからは分かりません。
<!-- definition-example-end -->

<a id="prop-cplx16-first-level"></a>

<!-- formal-statement-start -->
> **命題（最初の量化層）**  
> 二進文字列上の多項式時間決定性計算を基礎に定義したクラスについて、次が成り立つ。

$$
\Sigma_1^P=NP,\qquad \Pi_1^P=coNP.
$$
<!-- formal-statement-end -->

### 証明の見取り図

存在ブロックがNPの証明書です。全称ブロックで条件が真という主張は、反対側に存在する反例を短く検証できないという主張に相当します。

<!-- proof-start -->
### 証明

$\Sigma_1^P$ の言語は、$x\in L\Longleftrightarrow\exists y\,R(x,y)$ の形を持ち、$|y|=p(|x|)$、$R$ は決定性多項式時間です。これは[CPLX3の証明書・検証器によるNPの定義](../CPLX3/index.md)そのものです。逆にNPの「長さが高々 $p(n)$ の証明書」をパディングすれば、等長の存在ブロックになるため等号です。

$\Pi_1^P$ の言語は $x\in L\Longleftrightarrow\forall y\,R(x,y)$ と書けます。否定すると

$$
x\in\overline L
\ \Longleftrightarrow\
\neg\bigl(\forall y\,R(x,y)\bigr)
\ \Longleftrightarrow\
\exists y\,\neg R(x,y).
$$

$R$ の真偽を反転する述語も多項式時間であり、よって $\overline L\in NP$、つまり $L\in coNP$ です。逆向きも $\overline L\in NP$ の証明書表現を否定して同じ二つの同値式を逆にたどれば成立します。$\square$
<!-- proof-end -->

## 3. 補集合、包含、そして階層の全体

量化を一段増やせば、使わないダミー変数を付けるだけで既存の言語を表せます。また、全ての量化子を入れ替えて検査述語を否定すると、元の言語の補集合になります。

<a id="prop-cplx16-duality-inclusions"></a>

<!-- formal-statement-start -->
> **命題（量化層の双対性と包含）**  
> すべての整数 $k\ge0$ について、次が成り立つ。ただし $k=0$ では $\Sigma_0^P=\Pi_0^P=P$ とする。

$$
co\Sigma_k^P=\Pi_k^P,\qquad
co\Pi_k^P=\Sigma_k^P.
$$

$$
\Sigma_k^P\cup\Pi_k^P
\ \subseteq\
\Sigma_{k+1}^P\cap\Pi_{k+1}^P.
$$

> 記号 $co\mathcal C$ は言語クラス $\mathcal C$ に属する言語の補言語全体を表す。
<!-- formal-statement-end -->

### 証明の見取り図

量化の否定規則 $\neg\exists=\forall\neg$、$\neg\forall=\exists\neg$ を選択文字列に繰り返し適用します。包含では、先頭に**実際には参照しない**ダミーブロックを足します。

<!-- proof-start -->
### 証明

$k\ge1$ とし、$L\in\Sigma_k^P$ の表現を一つ固定します。命題論理の否定法則を一番外側から $k$ 回適用すると、

$$
\begin{aligned}
x\in\overline L
&\Longleftrightarrow\neg\bigl(\exists y_1\forall y_2\cdots Q_k y_k:R(x,\boldsymbol y)\bigr)\\
&\Longleftrightarrow\forall y_1\exists y_2\cdots\overline{Q}_k y_k:
\neg R(x,\boldsymbol y)
\end{aligned}
$$

を得ます。$\overline{Q}_k$ は $Q_k$ と反対の量化子です。否定した $R$ も多項式時間なので $\overline L\in\Pi_k^P$ です。$\Pi_k^P$ 側から逆向きに同じ操作をすれば等号となり、二つ目の等号も得られます。$k=0$ は$P$の補集合閉性です。

$L\in\Pi_k^P$ とすると、検査述語に現れない新しい文字列 $z$ を先頭に置いた

$$
\exists z\ \forall y_1\exists y_2\cdots:R(x,\boldsymbol y)
$$

も、$z$ の選択と関係なく元と同じ真偽です。よって $L\in\Sigma_{k+1}^P$ です。$L\in\Sigma_k^P$ の場合も、元の先頭に同じ種類の存在ブロックをダミーとして付けるか、既存のブロックにまとめれば $\Sigma_{k+1}^P$ に入ります。いずれも補言語をとって対称的な包含を得られます。これにより和集合が両側のクラスの共通部分へ入ります。$\square$
<!-- proof-end -->

この包含は階層が真に広がるという意味ではありません。例えば $\Sigma_1^P=NP$ と $\Pi_1^P=coNP$ が等しいかどうかは未解決です。

<a id="def-cplx16-ph"></a>

<!-- formal-statement-start -->
> **定義（多項式階層PH）**  
> 各自然数 $k\ge0$ の量化子によるクラス $\Sigma_k^P,\Pi_k^P$ を使い、多項式階層全体を次の言語クラスと定義する。

$$
PH=\bigcup_{k\ge0}\Sigma_k^P
=\bigcup_{k\ge0}\Pi_k^P.
$$

> 各言語に許される量化ブロック数 $k$ は固定定数であり、入力長に応じて交代回数が増えることはこの定義では認めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cplx16-ph -->
**定義の確認**　先ほどの $L_{\exists\forall}$ は $\Sigma_2^P$ に属するので、和集合の定義から $PH$ に属します。$P$ の言語は $k=0$ で入り、SATは$k=1$で入ります。また $\Pi_k^P\subseteq\Sigma_{k+1}^P$ だから、$\Pi$ 側の全ての言語も $\Sigma$ 側の和集合に入ります。逆も同じなので、二つの和集合は一致します。
<!-- definition-example-end -->

どこまで大きなクラスに入るでしょうか。[CPLX14のTQBFのPSPACE所属](../CPLX14/index.md#thm-cplx14-membership)と同じ深さ優先評価を使います。

<a id="prop-cplx16-ph-pspace"></a>

<!-- formal-statement-start -->
> **命題（多項式階層は多項式空間に含まれる）**  
> 二進言語のクラス $PH$ と、決定性多項式空間クラス$PSPACE$について、

$$
PH\subseteq PSPACE
$$

> が成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の固定した $k$ と $L\in\Sigma_k^P$ を取り、各ブロックの長さを $p(n)$、述語の入力長に関する決定性時間上界を $q(n+kp(n))$ とします。量化を外側から評価するときは各 $y_i$ を1本ずつ記憶し、存在量化なら1件の真を見つけた時点で真、全称量化なら1件の偽を見つけた時点で偽を返します。

再帰の深さは $k$、現在の選択文字列の保存が $kp(n)$ ビット、各選択を二進カウンタで列挙する領域も $O(kp(n))$ です。末端で実行する $R$ は多項式時間なので、同じ多項式を超える作業空間を使えません。スタック管理を含めて

$$
O\bigl(kp(n)+q(n+kp(n))\bigr)
$$

空間で真偽を決定できます。$k$ は固定なので、この上界は $n$ の多項式です。$\Pi_k^P$ でも同じ評価法が使えます。任意の固定 $k$ に対して成立したので $PH\subseteq PSPACE$ です。$\square$
<!-- proof-end -->

## 4. Oracleという別の見方

毎回「ある証明書が存在するか」を調べる検証器の中で、別の難しい判定問題の答えを**一回の問い合わせ**で受け取れれば、上の交代を別の形で表せます。

ここでいうoracleは、機械がある固定言語$A$の所属を問い合わせると必ず正しいyes/noを返す、理論的な装置です。実際に高速実装できるという主張ではありません。機械は問い合わせ文字列を自分で書くため、その長さと問い合わせの個数には通常の計算費用が掛かります。詳しい相対化の議論は次のCPLX17で扱います。

<a id="def-cplx16-oracle-classes"></a>

<!-- formal-statement-start -->
> **定義（oracle付きの計算クラス）**  
> 固定言語 $A\subseteq\{0,1\}^*$ に対して、所属問い $w\in A$ の正しい1ビットの答えを1回の問い合わせで受け取れる決定性・非決定性Turing機械を考える。問い合わせ文字列を作る時間は計上し、問い合わせ自体の返答は1ステップとする。多項式時間で判定する言語クラスをそれぞれ $P^A,NP^A$ と書く。クラス $\mathcal C$ に対して $P^{\mathcal C}$ は $A\in\mathcal C$ を満たすある一つのoracleを使うクラスの和集合、$NP^{\mathcal C}$ も同様と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cplx16-oracle-classes -->
**定義の確認**　oracleをSATとします。入力式$F$について「$F$は充足可能か」とそのまま問い合わせる機械は、$F$の符号を問い合わせテープにコピーする多項式時間と1回の問い合わせでSATを判定します。さらに「$F$は充足不能か」も、同じ答えを反転して$P^{SAT}$で判定できます。これはSATやUNSATが無条件に$P$で解けることを示すものではありません。
<!-- definition-example-end -->

<a id="thm-cplx16-oracle-characterization"></a>

<!-- formal-statement-start -->
> **定理（多項式階層のoracleによる特徴付け）**  
> 任意の整数 $k\ge0$ について、前節で定義した交代量化クラスは次を満たす。

$$
\Sigma_{k+1}^P=NP^{\Sigma_k^P},
\qquad
\Pi_{k+1}^P=coNP^{\Sigma_k^P}.
$$

> また、$\Delta_{k+1}^P=P^{\Sigma_k^P}$ と置くと、

$$
\Delta_{k+1}^P\subseteq
\Sigma_{k+1}^P\cap\Pi_{k+1}^P.
$$
<!-- formal-statement-end -->

### 証明の見取り図

左から右は簡単です。先頭の存在選択を非決定的に選んで、残りの全称から始まる条件をoracleに判定してもらいます。難しいのは右から左です。oracle機械は**以前の答えを見て次の問い合わせを決める**かもしれません。全問い合わせを先に固定してしまうのではなく、実行の全記録を外側の存在ブロックで推測し、yesとnoの答えが本当に正しいかを量化で同時に検査します。

<!-- proof-start -->
### 証明

**(1) $\Sigma_{k+1}^P\subseteq NP^{\Sigma_k^P}$。** $k=0$ の場合は $\Sigma_1^P=NP=NP^P$ です。$k\ge1$ なら、$L\in\Sigma_{k+1}^P$ の条件を

$$
x\in L
\Longleftrightarrow
\exists y_1\ \bigl[\forall y_2\exists y_3\cdots Q_{k+1}y_{k+1}:R(x,\boldsymbol y)\bigr]
$$

と書けます。機械は長さ$p(n)$の$y_1$を非決定的に選びます。角括弧内は$\Pi_k^P$に属する判定条件です。その**補条件**は$\Sigma_k^P$に属します。$\Sigma_k^P$のoracleに補条件を問い合わせ、答えがnoなら受理します。問い合わせは1回で、文字列$(x,y_1)$の長さも多項式なので、全体は$NP^{\Sigma_k^P}$です。

**(2) $NP^{\Sigma_k^P}\subseteq\Sigma_{k+1}^P$。** $k=0$ は同じく$NP^P=NP$です。$k\ge1$とし、ある言語$A\in\Sigma_k^P$への問い合わせで多項式時間動く非決定性機械$M$を固定します。入力$x$に対して一つの受理枝があればよいので、枝の選択ビット、問い合わせ文字列と答え、各時点の計算状態を含む**実行記録**$t$を存在量化で選びます。実行時間が多項式なので$|t|$も多項式です。$t$が指定した各答えの下で首尾一貫した受理実行かどうかは決定性多項式時間で検査できます。

ただし、記録の中で問い合わせ$w$にyesと答えた部分は$w\in A$、noと答えた部分は$w\notin A$でなければなりません。$A$の定義は$k$ブロックの式

$$
w\in A\Longleftrightarrow
\exists a_1\forall a_2\cdots Q_ka_k:S(w,\boldsymbol a)
$$

です。従ってnoの答えはその否定

$$
w\notin A\Longleftrightarrow
\forall b_1\exists b_2\cdots\overline Q_kb_k:\neg S(w,\boldsymbol b)
$$

で検証できます。**yes問い合わせ**は先頭に存在する$a_1$を必要とし、**no問い合わせ**は先頭に全称の$b_1$を必要とします。$t$と全yes用$a_1$を最初の存在ブロックに置き、次の全称ブロックにyes用$a_2$とno用$b_1$をまとめ、次の存在ブロックにyes用$a_3$とno用$b_2$をまとめます。その後も交互に進め、最後のブロックにはno用$b_k$を置きます。

例えば$k=2$では、yes条件は$\exists a_1\forall a_2\,S$、no条件は$\forall b_1\exists b_2\,\neg S$です。全体の量化順序は

$$
\exists(t,a_1)\ \forall(a_2,b_1)\ \exists b_2
$$

となり、3ブロックです。一般の$k$でも、yes条件の第$j$ブロックとno条件の第$j-1$ブロックは$j\ge2$で同じ種類の量化子なので統合できます。複数の問い合わせについて各段の文字列を全て連結しても、問い合わせ個数も長さも多項式のため、各ブロックは多項式長です。末端では実行記録の整合性と全yes/no条件の連言を多項式時間で検査します。

各問い合わせ文字列は$t$から決定的に復元でき、記録に指定された答えに応じて次の問い合わせを作るので、問い合わせの**適応性**も失われません。この$k+1$ブロックの式が真なら、全問い合わせが正しい受理実行が存在します。逆に本当に受理枝が存在するなら、その実行記録を選べば式が真になります。これで包含を得ました。

**(3) 残る主張。** $coNP^{\Sigma_k^P}$は、$NP^{\Sigma_k^P}$で受理する言語の補言語全体です。補言語をとって(1)(2)と前節の双対性を使うと$\Pi_{k+1}^P=coNP^{\Sigma_k^P}$です。さらに決定性oracle機械は非決定性oracle機械の特別な場合であり、判定結果を反転しても同じ決定性oracle機械で計算できます。よって

$$
P^{\Sigma_k^P}
\subseteq NP^{\Sigma_k^P},
\qquad
P^{\Sigma_k^P}
\subseteq coNP^{\Sigma_k^P}
$$

から$\Delta_{k+1}^P$の包含が得られます。$\square$
<!-- proof-end -->

ここでは$NP^{\Sigma_k^P}$の機械が利用するoracleは、**一つの固定された言語**です。yesとnoの検証で異なるoracleを自由に取り替えているわけではありません。なお、$k=0$では$\Delta_1^P=P^P=P$です。特に

$$
\Sigma_2^P=NP^{NP},\qquad
\Delta_2^P=P^{NP}.
$$

と書けます。これは「$NP$の問題を高速に解く道具があれば、NP機械が何をできるか」を表す同値です。

## 5. 階層が崩壊する条件

交代ブロックを増やせば形式上は上のクラスを定義できますが、新しい言語が本当に増えるとは限りません。存在と全称の区別が**ある段で消える**と、さらに上も消えることを証明できます。

<a id="thm-cplx16-collapse"></a>

<!-- formal-statement-start -->
> **定理（多項式階層の崩壊）**  
> ある整数 $k\ge1$ について $\Sigma_k^P=\Pi_k^P$ が成り立つなら、全ての整数 $j\ge k$ について

$$
\Sigma_j^P=\Pi_j^P=\Sigma_k^P,
\qquad PH=\Sigma_k^P
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

次の$\Sigma_{k+1}^P$の一番外側の存在ブロックを取り除くと、残りは$\Pi_k^P$の条件です。仮定によってこれを$\Sigma_k^P$の条件へ**言い換え**られれば、先頭の存在ブロックが次の存在ブロックと連結され、交代段数は増えません。

<!-- proof-start -->
### 証明

$L\in\Sigma_{k+1}^P$ とします。定義から、ある多項式長の$y$と$\Pi_k^P$の述語言語$B$が存在し、

$$
x\in L\Longleftrightarrow
\exists y\ (x,y)\in B
$$

となります。仮定$\Pi_k^P=\Sigma_k^P$により、同じ$B$は存在から始まる$k$ブロックで表せます。具体的に多項式$q$と多項式時間述語$S$をとって

$$
(x,y)\in B
\Longleftrightarrow
\exists z_1\forall z_2\cdots Q_kz_k:
S(x,y,z_1,\ldots,z_k)=1
$$

と書けます。元の$x$と$y$を組にした入力長は$n+p(n)$なので、$q(n+p(n))$も$n$の多項式です。式を代入して

$$
\begin{aligned}
x\in L
&\Longleftrightarrow
\exists y\ \exists z_1\ \forall z_2\cdots Q_kz_k:S(x,y,\boldsymbol z)\\
&\Longleftrightarrow
\exists(y,z_1)\ \forall z_2\cdots Q_kz_k:S(x,y,\boldsymbol z)
\end{aligned}
$$

を得ます。最初の二つの存在ブロックをまとめると$k$ブロックなので、$L\in\Sigma_k^P$です。逆向きの包含$\Sigma_k^P\subseteq\Sigma_{k+1}^P$は既に証明済みであり、$\Sigma_{k+1}^P=\Sigma_k^P$です。双方の補クラスをとると$\Pi_{k+1}^P=\Pi_k^P=\Sigma_k^P$でもあります。今度は$k+1$で同じ仮定が成立したので、この議論を繰り返す帰納法により全ての$j\ge k$で等号が成立します。

$j<k$の各層は包含関係から$\Sigma_k^P$へ含まれます。従って全層の和集合も$\Sigma_k^P$であり、$PH=\Sigma_k^P$です。$\square$
<!-- proof-end -->

<a id="cor-cplx16-pnp-collapse"></a>

<!-- formal-statement-start -->
> **系（P=NPなら多項式階層はPへ崩壊する）**  
> $P=NP$ なら、$PH=P$ が成り立つ。また $NP=coNP$ なら、$PH=NP$ が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$P=NP$と仮定すると、$P$は補集合について閉じているので

$$
coNP=coP=P=NP.
$$

つまり$\Sigma_1^P=\Pi_1^P=P$です。崩壊定理を$k=1$へ適用して$PH=P$を得ます。次に$NP=coNP$と仮定した場合も$\Sigma_1^P=\Pi_1^P$ですから、同じ定理により$PH=\Sigma_1^P=NP$となります。ここから$NP=P$は導けません。$\square$
<!-- proof-end -->

**重要な非含意**　$P\ne NP$を仮定しても「$\Sigma_2^P$は$NP$より真に大きい」は従いません。$P\ne NP$でも$NP=coNP$が成り立つ可能性は、既知の定理だけでは排除されていないからです。また$PH\subseteq PSPACE$は証明できましたが、$PH=PSPACE$かどうかも未解決です。階層の**定義、包含、崩壊の十分条件**と、各包含の**厳密性**を混同しないでください。

## 6. 演習：量化の形から機械の強さへ

以下の問題では量化変数はいずれも$\{0,1\}$または明示した多項式長の二進文字列を動きます。各問題は条件を読み、解答を見ずにまず自分で真偽や変換を求めてください。

### Level A

### A1. 選択順序の違い

命題$F=\exists u\,\forall v\,(u\lor v)$と$G=\forall u\,\exists v\,(u\land v)$の真偽を、具体的な選択または反例で示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$F$では$u=1$を選びます。$v=0$でも$1\lor0=1$、$v=1$でも$1\lor1=1$です。従って$\forall v$の条件が成り立ち、$F$は真です。$G$では全称側が$u=0$を選べます。$v=0$なら$0\land0=0$、$v=1$でも$0\land1=0$です。どの存在側の応答でも偽なので$G$は偽です。
<!-- solution-end -->

### A2. ブロックをまとめる

文字列$y_1,y_2,y_3,y_4,y_5$がそれぞれ長さ$n^2$以下とする。$\exists y_1\,\exists y_2\,\forall y_3\,\forall y_4\,\exists y_5\,R(x,\boldsymbol y)$を交代ブロックの正規形へ変換し、何層の上界を得るか示せ。$R$は決定性多項式時間である。

- Level: A

<!-- solution-start -->
#### 詳細解答

先頭の$y_1,y_2$を連結した文字列$z_1=(y_1,y_2)$は長さ高々$2n^2$です。次の$y_3,y_4$も$z_2=(y_3,y_4)$へ連結して長さ高々$2n^2$です。最後は$z_3=y_5$とします。連結文字列から各$y_i$を取り出す位置は固定した長さへパディングすれば多項式時間で分かります。よって

$$
\exists z_1\ \forall z_2\ \exists z_3\
R'(x,z_1,z_2,z_3)
$$

となり、3ブロックで先頭が存在なので$\Sigma_3^P$への所属が分かります。変数が5個あることは第5層への所属を意味しません。
<!-- solution-end -->

### A3. 補集合の量化

言語$L$が$x\in L\Longleftrightarrow\exists u\,\forall v\,R(x,u,v)$で表され、各変数は多項式長、$R$は多項式時間とする。$\overline L$の表現と所属クラスを求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

否定を外から順に入れると

$$
\begin{aligned}
x\in\overline L
&\Longleftrightarrow
\neg\exists u\,\forall v\,R(x,u,v)\\
&\Longleftrightarrow
\forall u\,\neg\forall v\,R(x,u,v)\\
&\Longleftrightarrow
\forall u\,\exists v\,\neg R(x,u,v).
\end{aligned}
$$

$\neg R$も多項式時間で計算でき、先頭が全称で2ブロックなので$\overline L\in\Pi_2^P$です。
<!-- solution-end -->

### A4. ダミー変数を付ける

$L\in coNP$とする。$\Sigma_2^P$の量化子表現を一つ構成し、ダミー変数を付けても真偽が変わらない理由を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$L\in coNP=\Pi_1^P$なので、ある多項式時間述語$R$について$x\in L\Longleftrightarrow\forall y\,R(x,y)$と書けます。新しい1ビット$z$を導入して

$$
x\in L\Longleftrightarrow
\exists z\in\{0,1\}\ \forall y\,R(x,y)
$$

と書きます。$R$は$z$を参照しないため、元が真なら$z=0$を選んでも真、元が偽ならどの$z$でも偽です。従って$L\in\Sigma_2^P$です。
<!-- solution-end -->

### A5. 一段増やしたゲーム

$H=\exists u\,\forall v\,\exists w\,((u\lor v)\land(w\leftrightarrow v))$の真偽を求め、存在側の戦略をすべて示せ。$\leftrightarrow$は真偽が一致するという意味とする。

- Level: A

<!-- solution-start -->
#### 詳細解答

最初に$u=1$を選びます。すると$(1\lor v)=1$なので、残る条件は$w\leftrightarrow v$です。全称側が$v=0$なら$w=0$、$v=1$なら$w=1$を選べば両方真です。内側の$w$は$v$を見た後に選べるため、この戦略が可能です。よって$H$は真です。もし$w$を$v$より前に固定しなければならなければ、$v$が逆の値を選ぶため同じ戦略は成立しません。
<!-- solution-end -->

### Level B

### B1. NPとcoNPの定義を量化で復元

証明書・検証器によるNPの定義から$\Sigma_1^P=NP$を導き、補集合の定義と否定規則から$\Pi_1^P=coNP$を導け。証明書の長さが入力長の多項式で抑えられる条件を明記せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$L\in NP$なら多項式$p$と多項式時間検証器$V$があり、すべての入力$x$について

$$
x\in L\Longleftrightarrow
\exists y\ (|y|\le p(|x|)\ \land\ V(x,y)=1)
$$

です。長さ情報を符号化して不足部分を0で埋めれば、長さ$p(|x|)+O(\log p(|x|))$の一つの選択文字列にできます。検証時に長さ情報と元の$y$を取り出せるので$\Sigma_1^P$に入ります。逆に$\Sigma_1^P$の$y$を証明書とし、$R$を検証器にすればNPに入ります。

$L\in\Pi_1^P$なら$x\in L\Longleftrightarrow\forall y\,R(x,y)$です。両辺を否定して

$$
x\in\overline L\Longleftrightarrow\exists y\,\neg R(x,y)
$$

を得るので$\overline L\in NP$、従って$L\in coNP$です。$\overline L\in NP$から始めれば、同じ式を逆向きに用いて$L\in\Pi_1^P$となります。
<!-- solution-end -->

### B2. 適応的なSAT問い合わせの検証

非決定性多項式時間機械が、ある実行枝でSATに2回問い合わせ、1回目の答えを見て2回目の式を作るとする。受理枝の記録$t$を推測し、両問い合わせの答えの正しさを$\exists\forall$の形で検査できる理由を説明せよ。SATについてはNP検証器$V(F,a)$を使い、$a$は式の全変数への割当てとする。

- Level: B

<!-- solution-start -->
#### 詳細解答

まず枝で使った非決定的選択、2回の問い合わせ式$F_1,F_2$、それぞれの答え$b_1,b_2$、停止までの配置を記録$t$として推測します。$t$を固定すれば$F_2$が$b_1$に依存することも、記録を順に再生して多項式時間で確かめられます。

$b_i=1$と記録した問い合わせでは充足割当て$a_i$を存在側が選び、$V(F_i,a_i)=1$を確認します。$b_i=0$と記録した問い合わせでは、**どの**割当て$a_i$でも$V(F_i,a_i)=0$であることが必要です。従って外側の存在ブロックで$t$と全yes側の割当てを推測し、内側の全称ブロックで全no側の割当てを走査します。末端の述語は、記録の整合性、yes側の全検証、no側の全否定を論理積で検査します。

$$
\exists(t,\boldsymbol a_{\rm yes})\
\forall\boldsymbol a_{\rm no}:
\operatorname{ValidTrace}(t)\land
\bigwedge_{b_i=1}V(F_i,a_i)\land
\bigwedge_{b_i=0}\neg V(F_i,a_i).
$$

式・記録・割当ての長さはいずれも多項式です。存在側は全称側の割当てを知らずにyes証明書を選び、全称側はnoと宣言された式の任意の反例候補を検査します。結果は$\Sigma_2^P$型の表現です。2回目の式を答えより前に固定する必要はありません。
<!-- solution-end -->

### B3. 等号からの階層崩壊

$\Sigma_2^P=\Pi_2^P$を仮定し、$\Sigma_3^P\subseteq\Sigma_2^P$を具体的な量化ブロックの結合で示せ。$\Pi_3^P$と$PH$についても結論を述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

任意の$L\in\Sigma_3^P$は$x\in L\Longleftrightarrow\exists u\,\forall v\,\exists w\,R(x,u,v,w)$です。内側の$\forall v\exists w$という条件は、固定した$(x,u)$について$\Pi_2^P$の言語$B$を与えます。仮定から$B\in\Sigma_2^P$でもあるため、多項式時間述語$S$と多項式長の$a,b$を用いて$(x,u)\in B\Longleftrightarrow\exists a\forall b\,S(x,u,a,b)$と書き直せます。よって

$$
x\in L\Longleftrightarrow
\exists u\exists a\forall b\,S(x,u,a,b)
\Longleftrightarrow
\exists(u,a)\forall b\,S(x,u,a,b).
$$

これは$\Sigma_2^P$です。逆の包含は一般の包含関係で成立します。補集合をとると$\Pi_3^P=\Pi_2^P=\Sigma_2^P$であり、帰納的に$PH=\Sigma_2^P$です。
<!-- solution-end -->

### B4. 時間と空間の区別

$L\in\Sigma_4^P$が多項式時間述語$R$とそれぞれ長さ$n^3$の4ブロックで表されるとする。$PSPACE$所属を示す深さ優先アルゴリズムの記憶量を評価せよ。また、これだけで$L\in P$または$PH\subsetneq PSPACE$と分かるか述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

4本の選択文字列を順に保存すると必要な領域は$4n^3$ビットです。各ブロックの候補を0から$2^{n^3}-1$まで列挙するカウンタも各$n^3$ビットであり、4本で$4n^3$ビットです。述語$R$が入力長$n+4n^3$の多項式時間$q(n+4n^3)$で動くなら、評価時の作業領域は高々その時間です。再帰深さ4の管理領域を加えても

$$
O(8n^3+q(n+4n^3))
$$

ビットで判定できます。候補数は指数的なので、多項式**時間**は示せていません。まして、任意の$PSPACE$言語が$PH$に入らないという反例も得られないため、真の包含$PH\subsetneq PSPACE$は証明できません。
<!-- solution-end -->

### Level C

### C1. 量化、oracle、崩壊を一つの言語でつなぐ

二進文字列の集合$L$が、ある多項式$p$と決定性多項式時間述語$R$により

$$
x\in L\Longleftrightarrow
\exists u\in\{0,1\}^{p(n)}
\ \forall v\in\{0,1\}^{p(n)}
:\ R(x,u,v)=1
$$

と表されるとする。(i) $L$と$\overline L$の所属層を示せ。(ii) $L$を$NP^{NP}$の機械で判定する具体的な手順を示せ。(iii) もし$NP=coNP$なら$L\in NP$を示し、そこから$L\in P$まで結論してよいか論じよ。(iv) $R$が多項式時間でも、全候補を列挙する素朴な手順が必ず多項式時間になるとは限らない理由を説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(i) 先頭が存在で2ブロックなので定義から$L\in\Sigma_2^P$です。否定を量化の外から入れると

$$
x\in\overline L
\Longleftrightarrow
\forall u\ \exists v:\neg R(x,u,v).
$$

$\neg R$も多項式時間なので$\overline L\in\Pi_2^P$です。

(ii) 非決定性機械はまず長さ$p(n)$の$u$を一つ選びます。$u$を固定したとき「ある$v$について$R(x,u,v)=0$」という言語

$$
A=\{(x,u):\exists v\in\{0,1\}^{p(|x|)}\ \neg R(x,u,v)\}
$$

は、証明書を$v$、検証器を$\neg R$とするNP言語です。$A$のoracleへ$(x,u)$を1回問い合わせ、**no**ならこの枝で受理します。この受理条件は$\forall v\,R(x,u,v)$と同値なので、ある受理枝が存在することと$x\in L$が同値です。従って$L\in NP^{NP}$です。

(iii) $NP=coNP$なら$\Sigma_1^P=\Pi_1^P$です。崩壊定理を$k=1$へ適用して$PH=NP$です。(i)から$L\in PH$なので$L\in NP$を得ます。しかし仮定は$P=NP$を与えません。従って$L\in P$と結論することはできません。

(iv) $u$の候補は$2^{p(n)}$本、固定した各$u$に対する$v$の候補も$2^{p(n)}$本あります。素朴な二重列挙では最悪$2^{2p(n)}$回の$R$評価が必要です。$p(n)=n$の場合だけでも$2^{2n}$回であり、多項式時間上界はこの方法からは得られません。$R$の各回が多項式時間であることと、回数が多項式であることは別条件です。
<!-- solution-end -->

## 7. 次への橋

量化子を有限段だけ交代させることと、難しい言語へ問い合わせることは、同じ計算能力を二通りに記述しています。$P=NP$あるいは$NP=coNP$という等号を**仮定すれば**階層全体が崩壊しますが、その等号の真偽自体は未解決です。

次のCPLX17「Oracleと相対化」では、oracleを別の言語へ置き換えると$P$と$NP$の関係がどのように変わり得るかを調べます。ここで使ったoracleは計算の力を比較する数学的な装置であり、万能の高速アルゴリズムではありません。
