# VNP20 J：反復cut、時間・入力・piece数の指数台帳

[一回の計算分割](../VNP19/index.md#thm-vnp19-onecut)では長い計算から短い計算のリストを作りました。しかし、一度に縮められる倍率には上限があります。非常に長い計算を同じ小さな尺度まで落とすには、各片を再び分割できること、一つの受理枝における片リストの生成費用が元の計算時間より小さいことを同時に保証する必要があります。本講ではこの二つを帰納法で確かめます。

一次資料：Claude (Anthropic), [VP ≠ VNP over every field, v1](https://hexagonmath.org/2611.00954v1), J.4, pp.54–55。記号は前講と同じです。$A$ は可換環、$\lg v=\lfloor\log_2 v\rfloor+1$、尺度 $v$ は正整数です。時間・サイズ・片数は0も許す非負整数で扱い、$\lfloor x\rfloor$ は切り捨てを表します。

## 1. 分割を連結する

[計算の分割契約](../VNP19/index.md#def-vnp19-cut)の時間は、分割器の受理枝の費用の上界です。分割器の出力した片自体を評価する時間とは異なります。[自己解釈型の重み付き木プログラム](../VNP18/index.md#def-vnp18-program)の重み名の解釈は全プログラムで共通に固定します。$|z|$ は入力木のサイズ、$|G|$ はプログラムの符号木のサイズです。[plainインスタンスと受理重み和](../VNP18/index.md#def-vnp18-plain)に従い、$z$ が $\tau$-plain であるとは全走行が停止し、各受理走行の名前列が空で費用が $\tau$ 以下であることです。以下、plain インスタンスの受理重み和を $S(z)=\operatorname{sum}(z)$ と書きます。二つの分割器を組み合わせると、最初の受理枝のリストの各出現について、次の分割器の受理枝を独立に選びます。等しい内容の片が二回出現しても一回にまとめません。

<a id="thm-vnp20-compose"></a>

<!-- formal-statement-start -->
> **補題（分割契約の合成）**
>
> 可換環 $A$ 上で重み名の解釈を固定し、時間・サイズ・片数・分割時間の各上界を非負整数とする。[計算の分割契約](../VNP19/index.md#def-vnp19-cut)に従い $G_1$ が $(\tau,s)$ を $(\tau_1,s_1)$ に、$G_2$ が $(\tau_1,s_1)$ を $(\tau_2,s_2)$ に分割し、片数・分割時間の上界をそれぞれ $(P_1,t_1),(P_2,t_2)$ とする。二つを合成する重み付き木プログラム $G$ は $(\tau,s)$ を $(\tau_2,s_2)$ に分割し、次の上界を満たす。
>
$$
P=P_1P_2,\qquad
t=t_1+P_1(t_2+62P_2+110)+100.
$$
>
$$
|G|\le |G_1|+3|G_2|+3000.
$$
<!-- formal-statement-end -->

証明の核心は、各片の値を第二分割の和へ置き換え、和の積を分配法則で展開することです。出力リストの連結は実際に命令を実行するので、片数に比例する管理費用も必要です。

<!-- proof-start -->
### 証明

[計算の分割契約](../VNP19/index.md#def-vnp19-cut)を二つのプログラムへ順に適用します。サイズ $s$ 以下の入力 $z$ を固定します。最初の受理枝 $b$ の重みを $w(b)$、出力を $(y_{b,1},\ldots,y_{b,m_b})$ とします。リスト長 $m_b$ は枝によって変わります。以下、枝 $b$ を固定している箇所では $m=m_b$、$y_i=y_{b,i}$ と略記します。第一分割器は全走行が停止し、第二分割器も各出力片のサイズ条件から全走行が停止します。有限リストに対する反復は高々 $P_1$ 回で終わります。各 $|y_i|\le s_1$ なので第二分割器の停止性は元の入力が plain であるかどうかによらず保証されます。各 $y_i$ に対して第二分割器を実行し、その出力リストを連結します。$m\le P_1$ で、各出力に高々 $P_2$ 個の要素があるため、総数は $mP_2\le P_1P_2$。名前列も空のままです。

元の入力が $\tau$-plain なら各 $y_i$ は $\tau_1$-plain です。第二分割器を $y_{b,i}$ に適用したときの受理枝を $d_i$、その出力を $L_{b,i,d_i}$、重みを $w_b(i,d_i)$ とします。$d_i$ の和はこの入力片に対する全受理枝を走ります。分割契約の値の条件を順に代入すると、

$$
S(z)=\sum_b w(b)\prod_{i=1}^{m_b}S(y_{b,i})
$$

$$
=\sum_b w(b)\prod_{i=1}^{m_b}
\left(\sum_{d_i}w_b(i,d_i)\prod_{x\in L_{b,i,d_i}}S(x)\right).
$$

各 $b$ に対して分配法則で $m_b$ 個の和の積を展開し、各和から一項ずつ選ぶと、

$$
S(z)=\sum_b\sum_{d_1,\ldots,d_{m_b}}
w(b)\left(\prod_{i=1}^{m_b} w_b(i,d_i)\right)
\prod_{i=1}^{m_b}\prod_{x\in L_{b,i,d_i}}S(x).
$$

右辺の各項は合成器の一つの受理枝と対応します。空リストの場合は空積1で、選択の組は空の組一つです。一方、ある片の第二分割に受理枝がなければ選択の組が存在せず、その寄与は空和0です。各最終片は $\tau_2$-plain です。

木プログラムでの連結費用にはリストの操作も入ります。[NS1/Compose.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/NS1/Compose.lean) の stepC は対（未処理片、生成済みリスト）から前者に $G_2$ を適用し、出力を後者の前に付けます。リスト順序が逆転しても可換環の積は不変です。thm_cut_compose 内の hstep は、適用費用 $t_2+4$ に対の構成と連結費用を加えて $t_2+62P_2+70$ を保証します。foldF_does では一回ごとに30を加え、全リストで $m(t_2+62P_2+100)+30$ 以下になります。最初の適用は $t_1+3$、全体を束ねる命令の費用も含めて同補題が与える上界は $t_1+P_1(t_2+62P_2+110)+100$ です。これら固定命令の費用は木プログラムの形式的意味論に依拠します。

compC は最初のコードと反復用コードを埋め込む構成で、size_compC の構文展開は $|G_1|+3|G_2|+3000$ 以下を与えます。片ごとにコードを複製して保存するのではなく、一つの反復用コードを実行する点が重要です。
<!-- proof-end -->

例えば最初の受理枝が重み2で二つの片を返し、片の値がそれぞれ $3+5$ と $7-1$ へ分かれる場合、元の値は $2\cdot8\cdot6=96$。合成器の四枝の寄与は $42,-6,70,-10$ で、和は96です。

## 2. 一回の切り方と丸め

ここから非負整数 $v,\Lambda,H,a_0$ に対して $v\ge1000$、$2\le\Lambda\le v$ とします。$\Lambda$ は後で固定対数べきとして選びます。$H\ge200$、$H\ge a_0$ とし、目標時間を $Q=v^H$ と置きます。

[VNP19の一回の計算分割](../VNP19/index.md#thm-vnp19-onecut)の整数版（同講の形式証明との対応を参照）を、時間範囲 $v^{a_0}\le\tau\le v^R$、$s\le\tau$、$2\le k\le v^{64}$ で利用できると仮定します。ここで $R$ は時間上限の指数、$k$ は切断倍率、$s$ は入力サイズの上界です。整数版は実数上界全体を丸めるだけではなく、VNP19末尾で説明した形式証明の各商を個別に切り捨てる評価を用います。各切断の上界は

$$
\tau_1=\left\lfloor\frac{\tau\Lambda}{k}\right\rfloor,\quad
s_1=\left(\left\lfloor\frac{s}{k}\right\rfloor+
\left\lfloor\frac{\tau}{v^{256}}\right\rfloor\right)\Lambda,
$$

$$
P_1=k\Lambda,\qquad
t_1=\left(s+\left\lfloor\frac{\tau k}{v^{256}}\right\rfloor\right)\Lambda.
$$

コードサイズは $v^{a_0}$ 以下です。$\tau\ge Q$ から始めます。もし $\tau\Lambda\ge Qv^{64}$ なら $k=v^{63}$ とし、そうでなければ最後の切断として $k=\lfloor\tau\Lambda/Q\rfloor+1$ を使います。

最後の切断では $Q\le\tau$ と $\Lambda\ge2$ から $k\ge3$。また $\tau\Lambda/Q<v^{64}$ なので $k\le v^{64}$ です。$kQ>\tau\Lambda$ より $\lfloor\tau\Lambda/k\rfloor<Q$ ですが、時間上界は緩められるので最終片の時間を $Q$ と宣言できます。

途中の切断では $k=v^{63}$ であり、

$$
\tau\Lambda\ge Qv^{64}
\ \Longrightarrow\
\tau_1\ge Qv\ge Q.
$$

$\Lambda\le v$ から $\tau_1\le\tau/v^{62}$。このように一段につき時間上界の指数が少なくとも62減少します。一方、床関数のため $\tau_1 k\le\tau\Lambda$ だけでは逆向きの評価に使えません。余り $d$ を取ると

$$
\tau\Lambda=k\tau_1+d,\qquad 0\le d<k.
$$

$\tau_1\ge1$ なので $d<k\le k\tau_1$。従って $\tau\Lambda\le2k\tau_1$ です。この係数2を捨てると次節の入力サイズの評価を保証できません。

## 3. 反復の四つの上界

入力サイズの余裕を数値化するため、$sv^{48}\le c\tau$ を保つ係数 $c\ge1$ を追跡します。初期値は $c=1$ ですが、一段の操作で最大4倍になります。反復の残り段数の上界を $r+1$ とします（途中の切断は高々 $r$ 回、最後の切断が1回）。コードサイズ、片数、分割時間、最終片サイズを別々に評価します。

<a id="thm-vnp20-iterate"></a>

<!-- formal-statement-start -->
> **定理（反復分割の指数評価）**
>
> 可換環と重み名の解釈を固定し、$v,a_0,R,H,\Lambda,r,\tau,s,c$ は非負整数とし、
>
$$
v\ge1000,\quad 2\le\Lambda\le v,\quad H\ge\max(a_0,200)
$$
>
> とする。第2節の[一回の計算分割](../VNP19/index.md#thm-vnp19-onecut)の整数版が
>
$$
v^{a_0}\le x\le v^R,\quad 0\le y\le x,\quad 2\le k\le v^{64}
$$
>
> を満たすすべての非負整数 $x,y,k$ で利用できると仮定する。さらに
>
$$
Q=v^H\le\tau\le v^R,\quad
\tau\Lambda<Qv^{64+62r},
$$
>
$$
sv^{48}\le c\tau,\quad 1\le c,\quad c4^{r+1}\le v
$$
>
> とする。このとき $(\tau,s)$ を $(Q,s')$ に分割するプログラム $G$ が存在し、片数上界 $P$、分割時間上界 $t$、最終片サイズ上界 $s'$、符号サイズ $|G|$ は
>
$$
PQ\le\tau(4\Lambda^2)^{r+1},
$$
>
$$
tv^{48}\le c\tau(100\Lambda^3)^{r+1},
$$
>
$$
s'v^{48}\le cQ(8\Lambda)^{r+1},
$$
>
$$
|G|\le4^r(v^{a_0}+3000)
$$
>
> を満たす。
<!-- formal-statement-end -->

証明では途中の切断で入力の余裕を表す係数 $c$ を4倍に更新します。片数の増加 $k\Lambda$ と時間の減少 $\Lambda/k$ を掛け合わせると、$k$ が相殺されて対数損失 $\Lambda^2$ だけが残ります。管理費用も同じ片数の評価で抑えられることが帰納法の要点です。

<!-- proof-start -->
### 証明

$r$ に関する帰納法で示します。$r$ を固定する各段で、仮定を満たすすべての $\tau,s,c$ に対して主張を証明します。

**一回の分割の適用条件。** [一回の計算分割](../VNP19/index.md#thm-vnp19-onecut)の整数版を適用するため、$c4^{r+1}\le v$ なら $c\le v\le v^{48}$。従って $sv^{48}\le c\tau\le\tau v^{48}$ から $s\le\tau$ が従います。時間下限は $Q\ge v^{a_0}$ で保証されています。

**最後の一回だけでよい場合。** $\tau\Lambda<Qv^{64}$ とします。前節の最後の切断の $k$ を使うと $kQ\le\tau\Lambda+Q\le2\tau\Lambda$ です。よって

$$
PQ=k\Lambda Q\le2\tau\Lambda^2
\le\tau(4\Lambda^2).
$$

入力の項は $s v^{48}/k\le c\tau/k\le cQ$ です。後者は $kQ>\tau\Lambda\ge\tau$ によります。追加情報の項は

$$
\left\lfloor\frac{\tau}{v^{256}}\right\rfloor v^{48}
\le\frac{\tau}{v^{208}}
< Qv^{64-208}\le Q.
$$

よって $s'v^{48}\le(cQ+Q)\Lambda\le cQ(8\Lambda)$。また $k\le v^{64}$ だから

$$
\left\lfloor\frac{\tau k}{v^{256}}\right\rfloor v^{48}
\le\frac{\tau k}{v^{208}}\le\tau v^{-144}\le\tau.
$$

したがって $tv^{48}\le(c\tau+\tau)\Lambda\le c\tau(100\Lambda^3)$。コードは $v^{a_0}$ 以下です。$r=0$ のときは仮定により必ずこの場合です。$r>0$ でも各係数の底は1以上なので目標のべきへ緩められます。

**途中の一回。** $r\ge1$ で $\tau\Lambda\ge Qv^{64}$ とします。$k=v^{63}$ を選びます。前節より $Q\le\tau_1\le\tau\le v^R$ です。また

$$
\tau_1\Lambda
\le \frac{\tau\Lambda}{v^{63}}\cdot v
< Qv^{64+62r-62}
=Qv^{64+62(r-1)}.
$$

入力について、$63+48=111\le256$ なので

$$
\begin{aligned}
s_1 v^{48}k
&\le (sv^{48}+\tau k v^{48}/v^{256})\Lambda\\
&\le (c\tau+\tau)\Lambda\\
&\le 2c\tau\Lambda
\le 4c k\tau_1.
\end{aligned}
$$

正の $k$ で割ると $s_1v^{48}\le4c\tau_1$。新しい係数 $c_1=4c$ は $c_1 4^r=c4^{r+1}\le v$ を満たすので、帰納法の仮定を $r-1,\tau_1,s_1,4c$ に適用できます。得られた第二プログラムの片数・時間・最終片サイズ・コードを $P_2,t_2,s',G_2$ とします。$B=4\Lambda^2,\ D=100\Lambda^3,\ E=8\Lambda$ とおくと、

$$
P_2 Q\le\tau_1 B^r,\quad
t_2v^{48}\le4c\tau_1 D^r,
$$

$$
s'v^{48}\le4cQ E^r,\quad
|G_2|\le4^{r-1}(v^{a_0}+3000)
$$

です。

**片数。** [分割契約の合成](#thm-vnp20-compose)により $P=k\Lambda P_2$ であり、$\tau_1k\le\tau\Lambda$ を使うと

$$
PQ\le k\Lambda\tau_1 B^r
\le\tau\Lambda^2 B^r
\le\tau B^{r+1}.
$$

**最終片サイズ。** $4\le E$ より $s'v^{48}\le4cQE^r\le cQE^{r+1}$。

**分割時間。** 一回の時間は最後の切断と同じ計算で $t_1v^{48}\le2c\tau\Lambda$。[分割契約の合成](#thm-vnp20-compose)の費用式の残りを三つに分けます。

$$
k\Lambda t_2v^{48}
\le k\Lambda(4c\tau_1D^r)
\le4c\tau\Lambda^2D^r.
$$

$62v^{48}\le v^{49}\le Q$ より

$$
k\Lambda(62P_2)v^{48}
\le k\Lambda P_2 Q\le\tau B^{r+1}.
$$

$110,100\le v$、$\Lambda\le v$、$H\ge200$ より

$$
110k\Lambda v^{48}\le v^{113}\le Q\le\tau,\qquad
100v^{48}\le v^{49}\le\tau.
$$

従って合計は

$$
tv^{48}\le c\tau
(2\Lambda+4\Lambda^2D^r+B^{r+1}+2).
$$

$B\le D$ なので $B^{r+1}\le4\Lambda^2D^r$。また $D^r\ge1$、$\Lambda\ge1$ であるため括弧内は

$$
(2+4+4+2)\Lambda^3D^r
\le100\Lambda^3D^r=D^{r+1}.
$$

**コードサイズ。** $U=v^{a_0}+3000$ とすると、[分割契約の合成](#thm-vnp20-compose)から

$$
|G|\le v^{a_0}+3\cdot4^{r-1}U+3000
=U+3\cdot4^{r-1}U
\le4^r U.
$$

これで四つの上界がすべて成立します。
<!-- proof-end -->

## 4. 対数損失を一つの v に収める

$\alpha$ は時間尺度の倍率を表す自然数とします。元の時間が $v^{H\alpha}$ 以下であれば、上の帰納法で使う $r$ は $H\alpha$ と安全側に選べます。固定の $\alpha$ なら十分大きい $v$ で対数べきは $v$ より小さくなります。しかし $\alpha$ を変動させる場合もあるので、明示的な条件を設けます。

<a id="thm-vnp20-allscales"></a>

<!-- formal-statement-start -->
> **定理（全尺度での計算分割）**
>
> [一回の計算分割](../VNP19/index.md#thm-vnp19-onecut)の有限生成係数環・再配線則の仮定を満たすとする。ある自然数 $H,C_{\rm cut},v_0$ が存在し、$H\ge272$、$16\mid H$ である。任意の非負整数 $v,\alpha,\tau,s$ が
>
$$
v\ge v_0,\qquad (\lg v)^{C_{\rm cut}\alpha}\le v,
$$
>
$$
v^H\le\tau\le v^{H\alpha},\qquad sv^{48}\le\tau
$$
>
> を満たすなら、サイズ $v^H$ 以下の木プログラムが $(\tau,s)$ を $(v^H,v^{H-32})$ に分割する。片数は $\lfloor\tau v^2/v^H\rfloor$ 以下、分割時間は $\lfloor\tau/v^{24}\rfloor$ 以下である（原論文 J.4）。
<!-- formal-statement-end -->

ここで必要なのは対数損失を小さくすることだけではなく、反復回数を含めた積が $v$ 以下に収まることです。そのとき入力・時間・片数それぞれの指数にまだ余裕が残ります。

<!-- proof-start -->
### 証明

[一回の計算分割](../VNP19/index.md#thm-vnp19-onecut)の整数版の定数を $a_0,C,v_*$ とします。$v_0\ge v_*$ を必要なだけ大きくし、$v\ge4000$ かつ $\lg v\ge100$ とします。$h=a_0+217$、$H=16h$、$C_{\rm cut}=(3C+4)(2H+2)$、$\Lambda=(\lg v)^{C+1}$、$r=H\alpha$ と選びます。$H\ge272$、$H\ge a_0+3$、$H\ge200$ はこれらの選択から成立します。

$v>1$ と $v^H\le\tau\le v^{H\alpha}$ から $\alpha\ge1$ です。$L=\lg v$ と置くと $v<2^L$。$L\ge2$ なので $2^{C_{\rm cut}\alpha}\le L^{C_{\rm cut}\alpha}\le v<2^L$。従って $C_{\rm cut}\alpha<L$ であり、$C_{\rm cut}\ge4H$ から $4H\alpha\le L$ が従います。任意の $1\le x\le v^{H\alpha}$ に対して $x<2^{LH\alpha}$ なので $\lg x\le LH\alpha$。従って

$$
4\lg x\le4LH\alpha\le L^2.
$$

これが一回の分割の対数条件です。元の対数損失 $L^C$ を $\Lambda$ へ緩めても分割契約は維持されます（出力・時間の上界を増やすだけだからです）。

$100\le L$ なので

$$
(100\Lambda^3)^{r+1}
\le L^{(3C+4)(H\alpha+1)}
\le L^{C_{\rm cut}\alpha}\le v.
$$

第二の不等式は $H\alpha+1\le(2H+2)\alpha$ によります。この一つの評価から、$4,8\Lambda,4\Lambda^2\le100\Lambda^3$ により

$$
4^{r+1},\ (8\Lambda)^{r+1},\
(4\Lambda^2)^{r+1}\le v.
$$

また $\Lambda=L^{C+1}\ge2$ で、$r+1\ge1$ より

$$
\Lambda<100\Lambda^3
\le(100\Lambda^3)^{r+1}\le v.
$$

$\tau\Lambda<v^{r+1}$ であり $r+1\le H+64+62r$ なので、[反復分割の指数評価](#thm-vnp20-iterate)の時間上限条件 $\tau\Lambda<Qv^{64+62r}$ が成立します。初期 $c=1$、$R=H\alpha$ とすると $c4^{r+1}\le v$ は上の損失評価、$sv^{48}\le c\tau$ と $Q\le\tau\le v^R$ は本定理の仮定そのものです。

四つの結論に対数損失の評価を代入します。

$$
PQ\le\tau v\le\tau v^2,\qquad
tv^{48}\le\tau v\le\tau v^{24}.
$$

正の $Q,v^{48}$ で割ると $P\le\tau v^2/Q$、$t\le\tau/v^{24}$。整数なので切り捨てた上界も成立します。入力サイズは

$$
s'v^{48}\le Qv=v^{H+1}\le v^{H+16}
=v^{H-32}v^{48},
$$

よって $s'\le v^{H-32}$。コードサイズについては $3000\le v$ と $4^r\le v$ を用いて

$$
|G|\le v(v^{a_0}+v)
\le2v^{a_0+2}\le v^{a_0+3}\le v^H.
$$

以上の上界で分割契約を緩めれば定理が成立します。
<!-- proof-end -->

### 指数の意味と形式証明

- 63：途中の切断倍率の指数。対数損失を $v$ で覆うと時間指数は少なくとも62減少します。
- 256：一回の分割で発生する追加情報を抑える指数。$48+64=112\le256$ が入力と時間の余裕を支えます。
- 48：反復中の入力と時間の比を抑える指数。
- 32、24：最終入力と分割時間に残す余裕。次講では短い片の評価器を接続するために利用します。

[NS1/OneCut.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/NS1/OneCut.lean) の OneCutAt は整数版の一回分割の仮定、thm_cut_iterate は上の四つの上界、polylog_loss_le は対数べきの吸収です。[Paper/Cuts.lean](https://github.com/anthropics/formal-math/blob/db8472ee0fe3ebea21765160a6e3a04f5eaba4c5/vp-vnp/Paper/Cuts.lean) の thm_cut が J.4 に対応し、cutHyp_of_laws は次段で利用する不等式を分母を払った形で渡します。exists_setting は contracting の仮定から有限再配線則と有限生成係数環を取り出して適用します。

論文の紙面の帰納法と違い、ここでは自然数除算、合成の管理費用、反復上界 $r+1$ を明記しました。固定の $\alpha$ では $L^{C_{\rm cut}\alpha}/v\to0$ です。実際 $v\ge2^{L-1}$ なので、固定整数 $d=C_{\rm cut}\alpha$ に対して $L^d/v\le2L^d/2^L$。数列 $u_L=2L^d/2^L$ の隣接項比は

$$
\frac{u_{L+1}}{u_L}=\frac{(1+1/L)^d}{2}\longrightarrow\frac12.
$$

したがって十分大きい整数 $L_0$ 以降は比が $3/4$ 以下となり、$0\le u_L\le u_{L_0}(3/4)^{L-L_0}\to0$ です。$\alpha$ が変動する場合はこの固定指数の議論だけでは足りず、定理の条件を確認します。

## 5. 演習

<a id="exercise-vnp20-a1"></a>

### A1. 片数と管理費用

- Level: A

中間時間・サイズが一致する二つの分割契約で $(P_1,t_1)=(3,20)$、$(P_2,t_2)=(2,50)$ とする。合成器の片数・時間上界を求めよ。

<!-- solution-start -->
**詳細解答**：[分割契約の合成](#thm-vnp20-compose)を適用する。片数は $3\cdot2=6$。一片あたりの第二分割と管理費用を計算します。

$$
50+62\cdot2+110=284.
$$

従って合計時間の上界は

$$
20+3\cdot284+100=972.
$$

$20+3\cdot50=170$ だけではリスト操作を数えていません。
<!-- solution-end -->

<a id="exercise-vnp20-a2"></a>

### A2. 最後の切断の丸め

- Level: A

丸めだけの模型として $Q=100,\tau=250,\Lambda=4$ とする。最後の切断の公式で $k$ と新時間上界を求めよ。

<!-- solution-start -->
**詳細解答**：$\tau\Lambda=1000$ なので $k=\lfloor1000/100\rfloor+1=11$。新時間の整数上界は $\lfloor1000/11\rfloor=90$ です。$90\le100$ なので目標時間に緩められます。$kQ=1100>1000$ も確認できます。この小さな数値模型では J.3 の尺度条件まで満たすとは主張していません。
<!-- solution-end -->

<a id="exercise-vnp20-a3"></a>

### A3. 余りと逆向き評価

- Level: A

$N=59,k=20,q=\lfloor N/k\rfloor$ とする。$qk\le N\le2qk$ を確かめ、$q=0$ の場合に上の評価が壊れる例を挙げよ。

<!-- solution-start -->
**詳細解答**：$q=2$、余り19より $59=40+19$、従って $40\le59\le80$。一方 $N=19,k=20$ なら $q=0$ で $19\le0$ は偽です。途中の切断では $\tau_1\ge Q\ge1$ があるので、余りを $k\tau_1$ で覆えます。
<!-- solution-end -->

<a id="exercise-vnp20-a4"></a>

### A4. 指数の余裕

- Level: A

$v>1,\ k\le v^{64}$ のもとで $\tau k v^{48}/v^{256}$ を $\tau$ の何倍で抑えられるか。

<!-- solution-start -->
**詳細解答**：$k$ を上界で置き換え、$\tau v^{64+48-256}=\tau v^{-144}$。$v^{-144}<1$ なので $\tau$ 以下です。これが時間評価で入力項と追加情報項を合わせられる理由です。
<!-- solution-end -->

<a id="exercise-vnp20-b1"></a>

### B1. 入力の余裕を再計算する

- Level: B

第2節の途中の切断（$v\ge1000,\ 2\le\Lambda\le v,\ \tau\Lambda\ge Qv^{64}$、$k=v^{63}$）で $sv^{48}\le c\tau$、$c\ge1$ とする。整数版の $s_1,\tau_1$ から $s_1v^{48}\le4c\tau_1$ を導け。

<!-- solution-start -->
**詳細解答**：$k=v^{63}$ とし、床を上から実数商で覆います。

$$
\begin{aligned}
s_1v^{48}k
&\le (sv^{48}+\tau v^{111-256})\Lambda\\
&\le(c\tau+\tau)\Lambda\\
&\le2c\tau\Lambda.
\end{aligned}
$$

途中の切断の条件から $\tau_1\ge Qv\ge1$ です。[A3](#exercise-vnp20-a3) と同じ余りの評価を $\tau\Lambda$ に適用できます。

$$
\tau\Lambda\le2k\tau_1,\qquad
s_1v^{48}k\le4ck\tau_1.
$$

正の $k$ で割ると $s_1v^{48}\le4c\tau_1$ です。二段階の係数2は、追加情報と入力項の和、および整数除算の余りからそれぞれ生じます。
<!-- solution-end -->

<a id="exercise-vnp20-b2"></a>

### B2. 管理費用の指数

- Level: B

途中の切断で $v\ge1000,\Lambda\le v,H\ge200,\tau\ge v^H$ とする。固定費用 $110k\Lambda+100$ を $v^{48}$ 倍して $2\tau$ 以下となることを示せ。

<!-- solution-start -->
**詳細解答**：$k=v^{63}$、$110\le v$ だから $110k\Lambda v^{48}\le v^{1+63+1+48}=v^{113}\le v^H\le\tau$。同様に $100v^{48}\le v^{49}\le\tau$。足して $2\tau$ 以下です。片数依存の $62P_2$ は別に [反復分割の指数評価](#thm-vnp20-iterate) の片数上界で処理する必要があります。
<!-- solution-end -->

<a id="exercise-vnp20-b3"></a>

### B3. 対数条件

- Level: B

$L=\lg v\ge100,\alpha\ge1$、$r=H\alpha$、$\Lambda=L^{C+1}$ とする。$L^{(3C+4)(2H+2)\alpha}\le v$ から $(100\Lambda^3)^{r+1}\le v$ を示せ。

<!-- solution-start -->
**詳細解答**：$100\le L$ より

$$
100\Lambda^3\le L\cdot L^{3(C+1)}=L^{3C+4}.
$$

$r+1=H\alpha+1\le(2H+2)\alpha$ であり、$L>1$ なのでべき乗の単調性から

$$
\begin{aligned}
(100\Lambda^3)^{r+1}
&\le L^{(3C+4)(r+1)}\\
&\le L^{(3C+4)(2H+2)\alpha}\\
&\le v.
\end{aligned}
$$

底の違う三つの損失もこの評価で一括して覆えます。
<!-- solution-end -->

<a id="exercise-vnp20-c1"></a>

### C1. 分割契約から次の尺度への準備

- Level: C

[全尺度での計算分割](#thm-vnp20-allscales)の条件を満たすとする。さらに最終片の評価器が各片の受理重み和を $v^{H-16}$ 以下の費用で返せると仮定する。

1. 分割後の片の評価に必要な受理枝あたりの合計評価費用の上界を求めよ。
2. 分割器自体の費用と合わせ、$v\ge2$ のとき $\tau/v^{13}$ 以下であることを示せ（合成の追加管理費用はこの問いでは含めない）。
3. なぜ入力が plain であることを確認する必要があるか。片数の上界を全受理枝の総数と読むのは正しいか。

<!-- solution-start -->
**詳細解答**

**（1）片の評価費用。** [全尺度での計算分割](#thm-vnp20-allscales)により一つの受理枝の出力リスト長は $P\le\tau v^2/v^H$ です。各片を一度ずつ評価する費用の合計は

$$
Pv^{H-16}\le\frac{\tau v^2}{v^H}v^{H-16}
=\frac{\tau}{v^{14}}.
$$

**（2）分割と評価の合計。** 同定理の分割費用 $t\le\tau/v^{24}$ を足すと、

$$
\frac{\tau}{v^{24}}+\frac{\tau}{v^{14}}
\le\frac{2\tau}{v^{14}}\le\frac{\tau}{v^{13}}.
$$

最後の不等式は $2\le v$ によります。実際の木プログラムの合成ではリスト操作・積を構成する命令等の費用も評価しなければなりません。

**（3）契約の適用条件。** [計算の分割契約](../VNP19/index.md#def-vnp19-cut)で値の恒等式と各片の plain 性は、元の入力が plain であるときにだけ保証されています。そうでなければ分割器が停止しても評価結果が元の値に一致するとは限りません。また $P$ は一つの受理枝のリスト長であり、受理枝の総数を制限しません。受理枝の選択は重み付き有限和を実現する非決定的な操作であり、全枝を逐一列挙する決定的な時間の上界ではありません。
<!-- solution-end -->

## 6. 次講へ

時間 $v^H$ の片を、サイズ $v^{H-32}$ の入力として扱えるようになりました。次講では小さな算術回路を仮定して各片を高速に評価する仕組みを構成し、それを大きな尺度へ移すと何が起きるかを調べます。
