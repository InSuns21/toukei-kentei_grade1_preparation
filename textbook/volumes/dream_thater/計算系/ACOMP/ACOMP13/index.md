# ACOMP13 VF・VBP・VP・VNP：determinantの正しい完全性範囲

[行列式族の VP 所属](../ACOMP10/index.md#thm-acomp10-det-vp)では、行列式を多項式サイズの回路で計算できることを示しました。しかし、一般の回路を行列式に変換できるかは別の問いです。今回は式の木と一般の回路の間にある経路和の計算モデルを調べ、行列式がどの範囲で万能なのかを両方向から証明します。

固定した任意の体 $K$ 上の [任意定数モデル](../ACOMP4/index.md#def-acomp4-constant-model) を使います。等式は形式多項式としての等式です。標数2も含めます。

## 1. 計算モデルの階層

[算術formula](../ACOMP3/index.md#def-acomp3-formula) は演算を二分木に配置し、途中結果を共有しないモデルです。[代数的分岐プログラム](../ACOMP3/index.md#def-acomp3-abp)（ABP）は有向非巡回グラフの始点から終点までの経路の重みの和を計算します。辺標識は一次以下の多項式で、サイズは辺数です。

[VP](../ACOMP6/index.md#def-acomp6-vp) では一般の除算なし算術回路の演算サイズを多項式で抑えました。今度は回路の代わりに上の二モデルを採用します。変数数・次数の条件を共通にすることが重要です。

[多項式族](../ACOMP6/index.md#def-acomp6-polynomial-family)では、各正整数 $n$ に指定変数数 $m(n)\ge1$ と $f_n\in K[x_1,\ldots,x_{m(n)}]$ が対応します。使わない変数も数え、零多項式は任意の非負の次数上界を満たすとします。

多項式有界とは、全 $n\ge1$ で共通の定数 $C>0$ と非負整数 $d$ による上界 $Cn^d$ があることです。式の木を使うクラスを VF、経路和を使うクラスを VBP と呼びます。

<a id="def-acomp13-vf"></a>

<!-- formal-statement-start -->
> **定義（VF）**
>
> 固定した体 $K$ 上の多項式族 $f=(f_n)_{n\ge1}$ を取る。
>
> 指定変数数、全次数、各 $f_n$ を計算する算術formulaの演算サイズが、いずれも添字の多項式で一様に有界であるとき、その族は $\mathrm{VF}_K$ に属する。
>
> 各添字でformulaを別々に選んでよく、効率的な生成は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-acomp13-vf -->
**定義の確認**：$f_n=\prod_{i=1}^n(x_i+1)$ を考えます。指定変数数は $n$、最高次の項 $x_1\cdots x_n$ の係数が1なので全次数は $n$ です。各因子に加法を1回、全因子を結合するのに乗法を $n-1$ 回使い、どの演算結果も一度しか使いません。従って式の木の演算サイズは $2n-1$、三量とも多項式有界なので VF に属します。
<!-- definition-example-end -->

<a id="def-acomp13-vbp"></a>

<!-- formal-statement-start -->
> **定義（VBP）**
>
> 固定した体 $K$ 上の多項式族 $f=(f_n)_{n\ge1}$ を取る。
>
> 指定変数数、全次数、各 $f_n$ を計算する代数的分岐プログラムの辺数が、いずれも添字の多項式で一様に有界であるとき、その族は $\mathrm{VBP}_K$ に属する。
>
> 辺標識は一次以下であり、平行辺を許す。各添字のプログラムの効率的生成は要求しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-acomp13-vbp -->
**定義の確認**：$n$ 個の移動をする頂点列 $v_0,\ldots,v_n$ を取り、各 $v_{i-1}$ から $v_i$ へ標識 $x_i$ と1の二本の辺を置きます。始点 $v_0$ には入辺がなく、終点 $v_n$ には出辺がなく、添字が増えるので閉路はありません。全標識は一次以下です。各移動で二択を独立に行うため、経路和は

$$
\sum_{S\subseteq\{1,\ldots,n\}}\prod_{i\in S}x_i
=\prod_{i=1}^n(1+x_i).
$$

指定変数数と全次数は $n$、辺数は $2n$ です。従ってこの族は VBP にも属します。経路の本数 $2^n$ とプログラムのサイズ $2n$ を混同しないようにしましょう。
<!-- definition-example-end -->

[VNP](../ACOMP7/index.md#def-acomp7-vnp) は、多項式個の補助変数に関する VP の族の Boolean 和で表される族でした。ここまでの四つのクラスの包含を確認します。

<a id="thm-acomp13-inclusions"></a>

<!-- formal-statement-start -->
> **定理（代数的計算クラスの包含）**
>
> 任意の固定した体 $K$ 上で、上記の非一様・任意定数モデルでは
>
$$
\mathrm{VF}_K\subseteq\mathrm{VBP}_K
\subseteq\mathrm{VP}_K\subseteq\mathrm{VNP}_K
$$
>
> が成立する。
<!-- formal-statement-end -->

式を経路の直列・並列接続へ変え、経路和を各頂点に到達する重みの再利用で計算すれば、モデルを大きくする方向には効率的な変換ができます。

<!-- proof-start -->
### 証明

$f\in\mathrm{VF}_K$ とし、指定変数数を $m(n)$、演算サイズを $s(n)$ とします。[formulaからABPへの変換](../ACOMP3/index.md#thm-acomp3-formula-abp)を各 $f_n$ の式の木に適用すると、辺数は $s(n)+1$ です。出力は変わらないので指定変数数も全次数もそのままで、辺数の多項式上界を合わせると $f\in\mathrm{VBP}_K$ です。

次に $f\in\mathrm{VBP}_K$ とし、辺数を $E(n)$ とします。[ABPの回路による計算](../ACOMP3/index.md#thm-acomp3-abp-circuit)に指定変数数 $m(n)$ と辺数 $E(n)$ を代入すると、演算サイズは高々 $(2m(n)+2)E(n)$ です。例えば $m(n)\le An^a$、$E(n)\le Bn^b$ なら

$$
(2m(n)+2)E(n)\le (2A+2)Bn^{a+b}.
$$

指定変数数・全次数は元の族と等しいので $f\in\mathrm{VP}_K$ です。最後の包含は [VP の VNP への包含](../ACOMP7/index.md#thm-acomp7-vp-in-vnp) です。補助変数0個の Boolean和を取れば元の多項式が得られます。
<!-- proof-end -->

この包含列だけではどの等号も否定できません。例えば [ACOMP3 の反復二乗によるサイズ差](../ACOMP3/index.md#thm-acomp3-power-gap)は、指数的な全次数を用いるため、そのまま多項式有界次数の族の分離にはなりません。

## 2. 経路和から行列式へ

[p-projection](../ACOMP8/index.md#def-acomp8-p-projection) では、各行列成分に直接入れられるものは変数一個または体の定数一個です。辺標識が $2x+y+1$ ならそれを一成分へ代入することはできません。まず辺を分け、それから経路を閉じる方法を作ります。

<a id="thm-acomp13-abp-det"></a>

<!-- formal-statement-start -->
> **定理（ABPの行列式表示）**
>
> 体 $K$ 上の $m$ 変数、辺数 $E$ の代数的分岐プログラムの出力を $f$ とする。成分が変数一個または体の定数一個である正方行列 $L$ が存在して $f=\det L$ となる。その行列サイズは高々 $2+(3m+3)E$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一次式の辺は定数倍を二辺の経路に分けます。平行辺をなくすため全辺をさらに二辺へ分割すると、始点から終点までのどの経路も長さが偶数になります。終点から始点への辺を1本追加して閉路にすると、その閉路の置換符号は正です。残った頂点は自己ループで埋めることで、置換展開の項と元の経路を対応させます。

<!-- proof-start -->
### 証明

始点 $s$ と終点 $t$ は残し、辺に接続しない他の頂点を除きます。元の頂点数は高々 $2E+2$ です。

各辺 $u\to v$ の標識を

$$
a_0+\sum_{i=1}^m a_ix_i,\qquad a_i\in K\ (0\le i\le m)
$$

とします。定数項には標識 $a_0$ の辺を置き、各 $i$ にはその辺・その $i$ 専用の頂点 $w_i$ を介した経路

$$
u\xrightarrow{a_i}w_i\xrightarrow{x_i}v
$$

を置きます。係数が0でも置いてかまいません。各元の辺を置換する経路の和は $a_0+\sum_i a_ix_i$ です。元の経路の各辺に対してこの選択を独立に行い、分配法則を使えば全経路和は保存されます。逆に新しい経路から専用頂点を縮約すると元の経路に戻ります。閉路も増えません。

新しい頂点は高々 $mE$ 個、辺は $(2m+1)E$ 本です。今度はこの全辺を、各辺に専用の中間頂点を一つ入れ、元の標識と1の二辺に分けます。辺の重みの積は変わらず、異なる辺は異なる中間頂点を経由するので平行辺はなくなります。始点と終点は元の頂点なので、全経路の長さは偶数です。最終頂点数 $N$ は

$$
N\le 2E+2+mE+(2m+1)E
=2+(3m+3)E.
$$

これが定理のサイズ上界です。

このグラフに $t\to s$ の標識1の辺を追加し、$s$ 以外の全頂点に標識1の自己ループを置きます。行列 $L$ は行を辺の出発点、列を到着点に対応させ、辺がなければ0、あればその標識を成分とします。平行辺がなく、追加辺も既存の辺と重複しません（終点にはもともと出辺がなく、閉路もありません）。全成分は変数または定数です。

[行列式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant)の置換展開を用います。ここで成分は可換環 $K[x_1,\ldots,x_m]$ の元です（[逆順固有多項式](../ACOMP10/index.md#def-acomp10-reversed-characteristic) と同じく、この環上でも有限の置換和で行列式を定めます）。

頂点を $1,\ldots,N$ と番号付けし、その集合の置換全体を $S_N$ とします。置換 $\sigma$ が各出発頂点 $i$ を到着頂点 $\sigma(i)$ に送るとします。

既習の列を固定した式で行から列への対応の逆置換 $\rho=\sigma^{-1}$ を選ぶと、添字 $i=\rho(j)$ による積の並べ替えで

$$
\prod_{j=1}^N L_{\rho(j),j}
=\prod_{i=1}^N L_{i,\sigma(i)}.
$$

また、[置換の符号の積](../../../基礎科目/LA/LA3B/index.md#lem-la3b-permutation-sign-product) により

$$
1=\operatorname{sgn}(\rho\sigma)
=\operatorname{sgn}(\rho)\operatorname{sgn}(\sigma)
$$

なので、両置換の符号は等しくなります。逆置換も全置換を一度ずつ走るため、行を固定した式が得られます。

$$
\det L=\sum_{\sigma\in S_N}\operatorname{sgn}(\sigma)
\prod_{i=1}^N L_{i,\sigma(i)}.
$$

この置換展開で、辺のない位置を使う項は0です。残る置換は頂点全体を重なりのない有向閉路で覆います。始点 $s$ には自己ループがないので、$s$ を含む閉路は必ず長さ2以上です。元のグラフは有向閉路を持たないため、その閉路には追加した $t\to s$ が必要です。これを取り除くと $s$ から $t$ への経路が得られます。

他の非自明な閉路も $t\to s$ を必要としますが、その二頂点は既に使われています。よって経路以外の頂点には自己ループしか選べません。逆に任意の経路から追加辺と残りの自己ループを使って一意の置換ができます。

元の経路長が $2k$ なら閉路長は $2k+1$ です。長さ $l$ の巡回置換 $(i_1\ i_2\ \cdots\ i_l)$ は右から順に作用させる積 $(i_1\ i_l)\cdots(i_1\ i_2)$ で表せます。従って、[置換の符号の積](../../../基礎科目/LA/LA3B/index.md#lem-la3b-permutation-sign-product)により符号は $(-1)^{l-1}$ です。ここでは $(-1)^{2k}=1$、自己ループの符号も1です。各置換項は経路の重みそのものになります。標識0の辺を使う経路と置換も共に重み0なので、和には影響しません。

従って

$$
\det L=\sum_{\pi:s\leadsto t}\prod_{e\in\pi}\ell_e=f.
$$

経路がない場合も、$s$ を覆う置換が存在せず、両辺とも0です。符号の等式は標数2でも成立し、除算は一度も用いていません。
<!-- proof-end -->

### 例：一辺の標識が $x$ の場合

$s\to t$ の一辺を $s\to u\to t$（標識 $x,1$）へ分けます。閉路用の $t\to s$ と $u,t$ の自己ループを加え、頂点順を $s,u,t$ とすると

$$
L=\begin{pmatrix}
0&x&0\\
0&1&1\\
1&0&1
\end{pmatrix}.
$$

[Leibniz 公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant) を行基準で使うと、第1行では第2列だけを選べます。残りの2行に第1列と第3列を割り当てる二つの置換は符号がそれぞれ $-1,1$ なので、

$$
\det L=-x(0\cdot1-1\cdot1)=x.
$$

ここで $-x$ という成分を使わずに符号を調整できています。負の符号を変数の係数に吸収する代わりに、経路の長さで調整したことが p-projection の条件を保つ鍵です。

## 3. 行列式を経路和で計算する

逆向きも必要です。行列式を小さな回路で計算できるだけでは、途中結果をどのように共有するかが制限された ABP で計算できるとは限りません。

ACOMP10 の [Berkowitz型係数再帰](../ACOMP10/index.md#thm-acomp10-berkowitz) を、係数の間の経路の連結として読み替えます。再帰の各係数は一つ前の係数の線形結合です。その結合係数も行列積の成分として経路和で表せます。

<a id="thm-acomp13-det-vbp"></a>

<!-- formal-statement-start -->
> **定理（行列式族の VBP 所属）**
>
> 任意の固定した体 $K$ 上で、独立変数を成分とする $n$ 次行列を $X_n$ とする。
>
> 行列式族 $\mathrm{DET}=(\det X_n)_{n\ge1}$ は $\mathrm{VBP}_K$ に属する。
>
> 辺標識を変数と定数だけとした辺数 $O(n^6)$ の代数的分岐プログラムを構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

右下の部分行列のサイズを $h$ とし、各係数を表す節点を置きます。サイズ $h-1$ の係数からサイズ $h$ の係数へ進む辺の代わりに、その二つの係数を結ぶ係数再帰の重みを計算する小グラフを置きます。小グラフの内部を互いに分離しておけば、別の係数へ意図せず経路が移ることはありません。

<!-- proof-start -->
### 証明

$X_n$ の右下 $h$ 次部分行列を $A_h$ とし、$h=0$ では空行列とします。行列成分の全変数の多項式環を $K[x]$ と書き、係数を取り出すための別の不定元を $z$ とします。

$d_j^{(h)}$ は [逆順固有多項式](../ACOMP10/index.md#def-acomp10-reversed-characteristic) $\det(I_h-zA_h)$ の $z^j$ の係数です。$d_0^{(0)}=1$、範囲外の係数は0と約束します。

$h\ge2$ では $m=h-1$ とし、

$$
A_h=\begin{pmatrix}a&r\\s&M\end{pmatrix},
\qquad M=A_{h-1}
$$

と分けます。$a$ は左上成分で、各ブロックの大きさは

$$
r\in K[x]^{1\times m},\quad s\in K[x]^{m\times1},\quad M\in K[x]^{m\times m}
$$

です。ここで $s$ は前節の始点ではなく列ベクトルです。$k$ は $M$ を掛ける回数で、$M^0=I_m$ とします。

[Berkowitz型係数再帰](../ACOMP10/index.md#thm-acomp10-berkowitz) により

$$
d_j^{(h)}
=d_j^{(h-1)}-a d_{j-1}^{(h-1)}
-\sum_{k=0}^{j-2}(rM^ks)d_{j-2-k}^{(h-1)}.
$$

和の上端が負なら空和0とします。$h=1$ では $A_1=(a)$ と書き、$d_0^{(1)}=1$、$d_1^{(1)}=-a$ です。

段 $h$ に係数節点 $v_{h,j}$（$0\le j\le h$）を置き、$v_{0,0}$ を始点とします。次の接続を、$h=1,\ldots,n$ の各段で行います。範囲外の出発係数に対応する節点は存在しないため、その接続は作りません。第三の接続の添字は $0\le k\le j-2$ です。

| 出発節点 | 到着節点 | 接続全体の経路和 |
| --- | --- | --- |
| $v_{h-1,j}$ | $v_{h,j}$ | $1$ |
| $v_{h-1,j-1}$ | $v_{h,j}$ | $-a$ |
| $v_{h-1,j-2-k}$ | $v_{h,j}$ | $-rM^ks$ |

1は一辺で、$-a$ は $-1,a$ の二辺の直列接続で表します。

第三の接続について、行列積の成分展開をまず書きます。

$$
rM^ks
=\sum_{i_0,\ldots,i_k=1}^{m}
r_{i_0}
\left(\prod_{\ell=1}^{k}M_{i_{\ell-1},i_\ell}\right)
s_{i_k}.
$$

$k=0$ では積が空積1になり、$\sum_i r_i s_i=rs$ です。$k\ge1$ では $M$ の各乗法につき添字を一つ追加して和を取るため、この式は行列積そのものです。

この展開に合わせ、接続専用の節点を $k+1$ 層置き、各層に $m$ 個の節点を置きます。出発節点から標識 $-1$ の辺を専用の入口節点へ結びます。入口から第0層の節点 $i$ へ標識 $r_i$ の辺、第 $\ell-1$ 層の節点 $i$ から第 $\ell$ 層の節点 $j$ へ標識 $M_{ij}$ の辺、最終層の節点 $i$ から到着節点へ標識 $s_i$ の辺を置きます。

すべての経路は添字列 $(i_0,\ldots,i_k)$ に対応し、重みは上の展開の各項に $-1$ を掛けたものです。従って経路和は目的の $-rM^ks$ です。辺数は

$$
1+2m+km^2
$$

です。各 $h,j,k$ に対して新しい専用節点を用いるため、接続内部から別の接続へは移れません。

全体は段の順序に従って前進し、各接続の内部も層の順に進むので有向閉路はありません。始点から $v_{h,j}$ までの経路和を $P_{h,j}$ と置きます。$P_{0,0}=1$ です（長さ0の経路の重みを空積1とするためです）。各経路の最後の段を取り除くと、その段の接続の入口までの経路と内部経路の組に一意に分解できます。従って [ABPの回路による計算](../ACOMP3/index.md#thm-acomp3-abp-circuit) と同じ経路分解により

$$
P_{h,j}=P_{h-1,j}-aP_{h-1,j-1}
-\sum_{k=0}^{j-2}(rM^ks)P_{h-1,j-2-k}.
$$

ここでも範囲外は0です。$h=1$ の二本の接続で $P_{1,0}=1,P_{1,1}=-a$ が得られ、再帰と初期値が一致するので段に関する帰納法で $P_{h,j}=d_j^{(h)}$ です。最後に $v_{n,n}$ から新しい終点へ標識 $(-1)^n$ の辺を置きます。[逆順固有多項式](../ACOMP10/index.md#def-acomp10-reversed-characteristic) の $z^n$ の係数は、置換積の全因子から $-z$ を伴う成分を選んだ和なので

$$
d_n^{(n)}=(-1)^n\det X_n.
$$

従って出力は $(-1)^n P_{n,n}=\det X_n$ です。

辺数を数えます。段 $h$ に対して到着節点は $h+1$ 個、第三の接続は各到着節点につき高々 $h$ 個です。従って全接続は高々 $(h+1)(h+2)$ 個です。第三の接続の辺数は $k\le h-2$、$m=h-1$ より $1+2h+h^3$ 以下、他の接続もこの上界以下です。$h=1$ の接続も含めると、全辺数は

$$
1+\sum_{h=1}^n(h+1)(h+2)(1+2h+h^3)
=O(n^6).
$$

全辺の標識は元の行列成分である変数か定数です。指定変数数は $n^2$、全次数は $n$（対角項の係数1は他の置換と打ち消されない）です。従って VBP の三条件がそろいます。
<!-- proof-end -->

### 例：二次行列

$A_2=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とします。第1段は $P_{1,0}=1$、$P_{1,1}=-d$ です。第2段の係数2への接続は $v_{1,1}$ から重み $-a$、$v_{1,0}$ から重み $-bc$ の二つです。後者は $k=0$ の接続で、$-1,b,c$ の直列三辺です。

$$
P_{2,2}=(-d)(-a)+1(-bc)=ad-bc.
$$

最後の標識は $(-1)^2=1$ なので、出力が行列式になります。

## 4. 完全性の範囲を決める

[ACOMP9 の VNP 困難性と VNP 完全性](../ACOMP9/index.md#def-acomp9-vnp-completeness)では、対象自身が属することと、クラスの全要素がそこへ帰着することを分けました。対象クラスを VBP に変えても同じ二条件で完全性を定めます。記号 $f\le_p g$ は [p-projection](../ACOMP8/index.md#def-acomp8-p-projection) の向きで、各 $f_n$ が多項式有界な添字 $t(n)$ の $g_{t(n)}$ の許容代入で得られることを表します。

<a id="def-acomp13-vbp-complete"></a>

<!-- formal-statement-start -->
> **定義（VBP 完全性）**
>
> 固定した体 $K$ 上の指定変数数・全次数が多項式有界な多項式族 $g$ に対し、任意の $f\in\mathrm{VBP}_K$ が $f\le_p g$ を満たすとき、$g$ は p-projection に関して VBP 困難であるとする。さらに $g\in\mathrm{VBP}_K$ のとき VBP 完全であるとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-acomp13-vbp-complete -->
**定義の確認**：$g=\mathrm{DET}$ を取ります。[行列式族の VBP 所属](#thm-acomp13-det-vbp) は所属条件を満たすことを示しています。

困難性を確かめるため、任意の $f\in\mathrm{VBP}_K$ を取り、各 $f_n$ の ABP に [ABPの行列式表示](#thm-acomp13-abp-det) を適用します。指定変数数を $m(n)$、辺数を $E(n)$ とすれば、構成した行列 $L_n$ のサイズ $t(n)$ は

$$
t(n)\le 2+(3m(n)+3)E(n).
$$

ここで VBP の指定変数数と辺数の条件により、ある正定数 $C,D$ と非負整数 $a,b$ を全添字に共通に選んで

$$
m(n)\le Cn^a,\qquad E(n)\le Dn^b
$$

と上から抑えられます。これらの不等式と $n\ge1$ を使うと

$$
t(n)\le 2+3(C+1)D n^{a+b}.
$$

行列式族の $t(n)$ 番目の多項式は $t(n)^2$ 個の独立変数を成分とする行列の行列式です。その各変数に $L_n$ の対応成分を代入すれば、

$$
\det X_{t(n)}\big|_{(X_{t(n)})_{ij}=(L_n)_{ij}}
=\det L_n=f_n.
$$

どの成分も変数一個か定数一個で、添字も多項式有界です。従って [p-projection](../ACOMP8/index.md#def-acomp8-p-projection) の条件を満たし、任意の $f$ に対する困難性条件も成立します。
<!-- definition-example-end -->

<a id="thm-acomp13-det-complete"></a>

<!-- formal-statement-start -->
> **定理（行列式族の VBP 完全性）**
>
> 任意の固定した体 $K$ 上で行列式族 $\mathrm{DET}$ は p-projection に関して $\mathrm{VBP}_K$ 完全である。さらに、指定変数数と全次数が多項式有界な多項式族 $f$ に対し
>
$$
f\in\mathrm{VBP}_K\quad\Longleftrightarrow\quad f\le_p\mathrm{DET}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

順方向と完全性は [VBP 完全性](#def-acomp13-vbp-complete) の直後の例で確認した二条件そのものです。

逆方向では $f\le_p\mathrm{DET}$ とします。添字関数を $t(n)$ とし、各行列変数を定数または目的の変数へ代入します。[行列式族の VBP 所属](#thm-acomp13-det-vbp) の構成では辺標識が変数または定数だけなので、代入した後も同じ ABP の規則に従います。代入写像を $\phi$ とします。各経路の重みは辺標識の積なので、代入後の経路和は

$$
\sum_\pi\prod_{e\in\pi}\phi(\ell_e)
=\phi\left(\sum_\pi\prod_{e\in\pi}\ell_e\right)=f_n.
$$

代入は加法と乗法を保存するため、二つの有限和が一致します。

$E(j)\le Cj^6$、$t(n)\le Dn^d$ とすれば代入後の辺数は増えず、

$$
E(t(n))\le CD^6n^{6d}
$$

です。指定変数数と全次数には仮定により多項式上界があります。従って $f\in\mathrm{VBP}_K$ です。
<!-- proof-end -->

一般の回路について何が未確定かを、必要十分条件の形にすると誤読を避けられます。VP 完全性も同じ二条件、すなわち VP への所属と、すべての VP の族からの p-projection を意味します。

<a id="thm-acomp13-vp-equivalence"></a>

<!-- formal-statement-start -->
> **定理（行列式の完全性とクラスの等号）**
>
> 固定した任意の体 $K$ 上の非一様・任意定数モデルで、次の同値が成り立つ。
>
> - 行列式族が p-projection に関して VP 完全であることと、$\mathrm{VBP}_K=\mathrm{VP}_K$ は同値。
> - 行列式族が p-projection に関して VNP 完全であることと、$\mathrm{VBP}_K=\mathrm{VNP}_K$ は同値。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

最初の順方向では、VP 完全性により任意の $f\in\mathrm{VP}_K$ が $f\le_p\mathrm{DET}$ を満たします。[行列式族の VBP 完全性](#thm-acomp13-det-complete) の逆方向によって $f\in\mathrm{VBP}_K$ です。逆包含は [代数的計算クラスの包含](#thm-acomp13-inclusions) で示したので等号です。

逆方向では $\mathrm{VBP}_K=\mathrm{VP}_K$ と仮定します。行列式族は VBP 完全であるため、所属とすべての VBP の族からの帰着が成立しています。等号によって VP に対する所属とすべての VP の族からの帰着に読み替えられるので VP 完全です。

二番目の順方向では VNP 完全性を仮定します。任意の $f\in\mathrm{VNP}_K$ に対して $f\le_p\mathrm{DET}$ となるため、[行列式族の VBP 完全性](#thm-acomp13-det-complete) の必要十分条件で $f\in\mathrm{VBP}_K$ を得ます。[代数的計算クラスの包含](#thm-acomp13-inclusions) と合わせて等号です。逆方向は VBP と VNP の等号を仮定すれば、VBP 完全性の二条件を VNP 完全性の二条件に読み替えられます。
<!-- proof-end -->

[パーマネントの VNP 完全性](../ACOMP11/index.md#thm-acomp11-permanent-complete) が成り立つ標数2以外の体では、パーマネント族が行列式族の p-projection であることは VBP と VNP の等号に同値です。実際、任意の VNP の族はパーマネントへ帰着するので、[帰着の推移性](../ACOMP8/index.md#thm-acomp8-reduction-laws) により行列式へ帰着します。逆に等号ならパーマネントは VBP に属するので行列式へ帰着します。

標数2では $1+1=0$ から $-1=1$ です。[パーマネント](../../GCT/GCT3/index.md#def-gct3-permanent) の有限置換和は、実係数に限らず任意の体上で定められます。ここでは [行列式の Leibniz 公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant) を第2節の行基準の記法で用いると、全ての置換について符号が1になるので、

$$
\det X_n
=\sum_{\sigma\in S_n}\prod_{i=1}^n x_{i,\sigma(i)}
=\operatorname{per}(X_n).
$$

従ってパーマネント族と行列式族は一致します。しかし、この一致から VNP と VBP の等号は出ません。この標数ではパーマネントの VNP 完全性を前提にできないからです。任意標数で同じ論理を使うなら [Hamilton閉路多項式の VNP 完全性](../ACOMP12/index.md#thm-acomp12-hamilton-complete) を用います。[Hamilton閉路多項式](../ACOMP12/index.md#def-acomp12-hamilton-polynomial) の族を $\mathrm{HC}$ と書きます。

## 5. 演習

### A1. 二つの計算モデル

$f_n=\prod_{i=1}^n(x_i+y_i)$ の VF と VBP への所属をそれぞれ直接確認せよ。

- Level: A
- ID: ACOMP13-A1

<!-- solution-start -->
**詳細解答**

指定変数数は $2n$、単項式 $x_1\cdots x_n$ の係数は1で、全次数は $n$ です。[VF](#def-acomp13-vf) について、$n$ 回の加法と $n-1$ 回の乗法で式の木が作れるのでサイズは $2n-1$ です。

[VBP](#def-acomp13-vbp) について、節点 $v_0,\ldots,v_n$ と、各隣接節点を結ぶ標識 $x_i,y_i$ の二本の辺を用います。閉路がなく、始点への入辺も終点からの出辺もなく、標識は一次です。分配法則で経路和が元の積となります。辺数 $2n$ なので両モデルの条件を満たします。
<!-- solution-end -->

### A2. 行列成分への代入

行列式族から $x+y$ を作るため、一次行列 $(x+y)$ を使うことは p-projection の規則を満たすか。二次行列を使って許された代入を構成せよ。

- Level: A
- ID: ACOMP13-A2

<!-- solution-start -->
**詳細解答**

[p-projection](../ACOMP8/index.md#def-acomp8-p-projection) は変数一個または体の定数一個のみを許すので、一次行列へのその代入は許されません。一方、

$$
L=\begin{pmatrix}x&y\\-1&1\end{pmatrix}
$$

なら各成分が条件を満たします。[Leibniz 公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant) の二項から

$$
\det L=x\cdot1-y(-1)=x+y
$$

です。標数2では $-1=1$ ですが、減法と加法も一致するので等式は保たれます。
<!-- solution-end -->

### A3. 経路長と符号

長さ3の経路を終点から始点への辺で閉じると、置換符号はいくらか。経路の各辺を二辺へ分けたときにはどうなるか。

- Level: A
- ID: ACOMP13-A3

<!-- solution-start -->
**詳細解答**

長さ3の経路は4頂点を通ります。閉じると長さ4の巡回置換になります。長さ $l$ の巡回置換は $l-1$ 個の互換の積なので、[置換の符号の積](../../../基礎科目/LA/LA3B/index.md#lem-la3b-permutation-sign-product) により符号は $(-1)^3=-1$ です。各辺を二辺に分けると長さ6の経路となり、閉路長は7、符号は $(-1)^6=1$ です。[ABPの行列式表示](#thm-acomp13-abp-det) では後者の構成を用いるため、経路の重みに余分な符号が掛かりません。
<!-- solution-end -->

### A4. 包含と完全性

ある族が VP に属するという事実だけから、VP 完全性は示せるか。行列式族について既に示せた完全性を答えよ。

- Level: A
- ID: ACOMP13-A4

<!-- solution-start -->
**詳細解答**

所属はその族自身に小さな回路が存在するという条件です。完全性にはさらに任意の VP の族からの帰着が必要です。[行列式族の VBP 完全性](#thm-acomp13-det-complete) により VBP 完全性は成立しますが、[行列式の完全性とクラスの等号](#thm-acomp13-vp-equivalence) により VP 完全性を得るには VBP と VP の等号まで示す必要があります。
<!-- solution-end -->

### B1. 平行辺の除去

始点 $s$ と終点 $t$ の間に標識 $x,y$ の二本の平行辺がある。各辺を二辺へ分け、閉路と自己ループを加えて四次行列を作り、その行列式を直接計算せよ。

- Level: B
- ID: ACOMP13-B1

<!-- solution-start -->
**詳細解答**

[ABPの行列式表示](#thm-acomp13-abp-det) の専用中間頂点を $u,v$ とします。頂点順 $s,u,v,t$ で

$$
L=\begin{pmatrix}
0&x&y&0\\
0&1&0&1\\
0&0&1&1\\
1&0&0&1
\end{pmatrix}.
$$

[Leibniz 公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant) を行基準で使います。第4行は第1列を選ぶ必要があります（第1列の他成分が0だからです）。第1行が第2列を選ぶ場合、第2行は第4列、第3行は第3列を選びます。第1行が第3列を選ぶ場合、第3行は第4列、第2行は第2列を選びます。

従って生き残る置換の行から列への対応は、巡回記法で $(1\ 2\ 4)(3)$ と $(1\ 3\ 4)(2)$ です。どちらも3巡回と固定点からなり、[置換の符号の積](../../../基礎科目/LA/LA3B/index.md#lem-la3b-permutation-sign-product) により符号は $(-1)^2=1$ です。

$$
\det L=x\cdot1\cdot1\cdot1+y\cdot1\cdot1\cdot1=x+y.
$$

これは平行辺二本の経路和と一致します。
<!-- solution-end -->

### B2. 係数接続の構成

行ベクトル $r$、二次行列 $M$、列ベクトル $s$ を

$$
r=(a,b),\qquad
M=\begin{pmatrix}c&d\\e&f\end{pmatrix},\qquad
s=(g,h)^{\mathsf T}
$$

とする。上付き $\mathsf T$ は転置を表す。$-rMs$ を経路和で表し、[行列式族の VBP 所属](#thm-acomp13-det-vbp) の構成で必要な辺数を求めよ。

- Level: B
- ID: ACOMP13-B2

<!-- solution-start -->
**詳細解答**

$k$ は $M$ の乗法回数、$m$ は $M$ の行数なので $k=1,m=2$ です。[行列式族の VBP 所属](#thm-acomp13-det-vbp) の接続に従い、専用の入口を一つ作り、二節点ずつの層を二つ置きます。入口への辺に $-1$、第0層への二辺に $a,b$、層間の四辺に $c,d,e,f$、第1層から終端への二辺に $g,h$ を置きます。

添字対 $(1,1),(1,2),(2,1),(2,2)$ の四経路の重みはそれぞれ $-acg,-adh,-beg,-bfh$ です。行列積で確認すると

$$
Ms=(cg+dh,eg+fh)^{\mathsf T},
$$

$$
-rMs=-a(cg+dh)-b(eg+fh).
$$

展開すれば四経路の和と一致します。辺数は $1+2+4+2=9$ で、一般式 $1+2m+km^2$ に $m=2,k=1$ を入れても9です。
<!-- solution-end -->

### B3. 添字の上界

ある多項式族の指定変数数が $n^2$、全次数が $n^3$ 以下、ABP の辺数が $3n^4$ 以下であるとする。行列式への p-projection に用いる行列サイズの多項式上界を示せ。また、行列式を計算する ABP に戻すときの辺数の上界の次数を求めよ。

- Level: B
- ID: ACOMP13-B3

<!-- solution-start -->
**詳細解答**

[ABPの行列式表示](#thm-acomp13-abp-det) に $m=n^2,E\le3n^4$ を入れると、行列サイズ $t(n)$ は

$$
t(n)\le 2+(3n^2+3)3n^4
=9n^6+9n^4+2\le20n^6
$$

です。$n\ge1$ なので最後の上界が成立します。全成分は許された代入なので p-projection です。[行列式族の VBP 所属](#thm-acomp13-det-vbp) により、ある定数 $C$ に対して $t(n)$ 次行列の ABP の辺数は高々 $Ct(n)^6$ です。成分の代入は辺数を増やさないので、得られる辺数の上界は $C20^6n^{36}$ です。これは構成の上界であって最小辺数や元の $3n^4$ より効率的な変換という主張ではありません。
<!-- solution-end -->

### B4. 標数2の論理

標数2でパーマネント族が VBP に属する理由を述べ、それだけでは VNP と VP の等号が出ない理由を説明せよ。

- Level: B
- ID: ACOMP13-B4

<!-- solution-start -->
**詳細解答**

置換の符号 $1,-1$ は標数2ではともに1です。よって第4節で確認したように、[行列式の Leibniz 公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant) の行基準表示と [パーマネント](../../GCT/GCT3/index.md#def-gct3-permanent) の置換和が項ごとに一致します。[行列式族の VBP 所属](#thm-acomp13-det-vbp) は任意標数に適用できるのでパーマネントも VBP に属します。

しかし [パーマネントの VNP 完全性](../ACOMP11/index.md#thm-acomp11-permanent-complete) の仮定は標数2以外であり、この場面では使えません。全 VNP の族からパーマネントへの p-projection が示されていないので、所属だけからクラス全体の包含を導くことはできません。
<!-- solution-end -->

### C1. 三次行列と完全性の移送

次の三次行列を任意の体 $K$ 上で考える。

$$
X=\begin{pmatrix}
a&u&0\\
v&b&w\\
0&x&c
\end{pmatrix}.
$$

1. 右下の二次部分の係数 $d_0,d_1,d_2$ を求めよ。
2. 三次段階の係数3への接続を列挙し、各経路和を求めて行列式を計算せよ。
3. 一般の行列式族が Hamilton閉路多項式族からの帰着先になると仮定する。すなわち $\mathrm{HC}\le_p\mathrm{DET}$ とする。この仮定から VBP、VP、VNP の関係を導け。逆方向も示せ。

- Level: C
- ID: ACOMP13-C1

<!-- solution-start -->
**詳細解答**

**（1）** 右下部分を $M$ とします。[逆順固有多項式](../ACOMP10/index.md#def-acomp10-reversed-characteristic) に従い、

$$
\det(I_2-zM)=(1-bz)(1-cz)-wxz^2
$$

$$
=1-(b+c)z+(bc-wx)z^2.
$$

従って $d_0=1,d_1=-b-c,d_2=bc-wx$ です。

**（2）** 三次段階では $r=(u,0),s=(v,0)^{\mathsf T}$ です。上付き $\mathsf T$ は転置で、ここでは行ベクトルを列ベクトルにします。係数再帰の重みを $q_k=rM^ks$ と書きます。従って

$$
q_0=rs=uv,\qquad Ms=(bv,xv)^{\mathsf T},
$$

$$
q_1=rMs=ubv.
$$

[行列式族の VBP 所属](#thm-acomp13-det-vbp) の係数3への接続は、出発係数2から $-a$、係数1から $-q_0$、係数0から $-q_1$ です。係数3からの接続は二次段階には存在しません。従って経路和は

$$
P_{3,3}=-(bc-wx)a+(-b-c)(-uv)-ubv.
$$

可換性から $buv=ubv$ なので

$$
P_{3,3}=-abc+awx+uvc.
$$

最後の辺の標識は $(-1)^3=-1$ であるため、出力は

$$
-P_{3,3}=abc-awx-uvc.
$$

[Leibniz 公式](../../../基礎科目/LA/LA3B/index.md#def-la3b-matrix-determinant) を行基準で直接適用しても、恒等置換の項 $abc$ と二つの互換 $(2\ 3),(1\ 2)$ の項だけが残ります。

$$
\det X=abc-awx-uvc
$$

となり一致します。

**（3）** 任意の $f\in\mathrm{VNP}_K$ を取ります。[Hamilton閉路多項式の VNP 完全性](../ACOMP12/index.md#thm-acomp12-hamilton-complete) は任意標数の体に適用できるので $f\le_p\mathrm{HC}$ です。仮定と [帰着の推移性](../ACOMP8/index.md#thm-acomp8-reduction-laws) により $f\le_p\mathrm{DET}$ となります。[行列式族の VBP 完全性](#thm-acomp13-det-complete) の逆方向から $f\in\mathrm{VBP}_K$ です。従って $\mathrm{VNP}_K\subseteq\mathrm{VBP}_K$ です。[代数的計算クラスの包含](#thm-acomp13-inclusions) と合わせて

$$
\mathrm{VBP}_K=\mathrm{VP}_K=\mathrm{VNP}_K.
$$

逆にこの等号が成立するなら、Hamilton閉路多項式族は VNP に属するので VBP に属します。[行列式族の VBP 完全性](#thm-acomp13-det-complete)により $\mathrm{HC}\le_p\mathrm{DET}$ です。ここで使ったのは仮定付きの同値であり、帰着そのものを構成したわけではありません。
<!-- solution-end -->

## 6. まとめ

- 計算モデルを式の木、経路和、一般回路、Boolean和の順に拡張すると VF、VBP、VP、VNP の包含が得られる。
- ABP の全辺を変数または定数に分解して経路長の偶奇を整えると、厳密な p-projection で行列式に変換できる。
- Berkowitz型係数再帰の重みを経路和で表せば、行列式族そのものが VBP に属する。
- 行列式族の VBP 完全性と VP 所属は成立するが、VP 完全性を一般に結論するには VBP と VP の等号が必要である。

次講では、一般の回路が与えられたとき、その全偏微分をどれだけ少ない追加演算で求められるかを調べます。

参考：P. Bürgisser, *Completeness and Reduction in Algebraic Complexity Theory* (Springer, 2000)；G. Malod and N. Portier, [Characterizing Valiant's algebraic complexity classes](https://doi.org/10.1016/j.jco.2007.09.006)；[Determinants vs. Algebraic Branching Programs](https://doi.org/10.4230/LIPIcs.ITCS.2024.27).
