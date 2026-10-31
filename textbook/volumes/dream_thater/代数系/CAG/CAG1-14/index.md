# CAG1-14 GAGAの総合演習とHodge数への橋

アフィン直線には多項式でない正則関数がある。それなのに、射影多様体上の正則な線束・層の射・コホモロジーは代数的な対象から復元できた。何が変わったのだろうか。そして、滑らかな五次三次元超曲面で正則3形式まで構成できたあと、Hodge数を求めるには何が足りないのだろうか。

この最終章では、**射影性の役割**を同じ論理で振り返り、代数的層から実際に計算できる数を増やす。一方、Hodge分解そのものをこの比較定理から導いたかのようには扱わない。

以下、基礎体は $\mathbb C$。$X^{\mathrm{an}}$ は有限型 $\mathbb C$-スキーム $X$ の[解析化](../CAG1-02/index.md#thm-cag1-02-analytification-functor)、$\mathcal F^{\mathrm{an}}$ は[連接層の解析化](../CAG1-03/index.md#def-cag1-03-sheaf-analytification)を表す。

## 1. 比較が失敗する場所、成功する場所

$\mathbb A^1_{\mathbb C}$ では、大域代数的関数の環は $\mathbb C[z]$ であり、解析化した複素平面では $e^z$ も大域正則関数である。これは「代数的関数を解析化する」写像が全射でないことを示す。[アフィン直線の反例](../CAG1-01/index.md#prop-cag1-01-affine-mismatch)の核心である。

一方、射影的な $X$ では、[GAGAの圏同値](../CAG1-08/index.md#thm-cag1-08-projective-equivalence)が成り立つ。ここで比較の対象を二段階に分ける。

1. **層と射の段階**：代数的連接層と解析的連接層が同型を除いて対応し、両者の間の層準同型も一致する。
2. **コホモロジーの段階**：代数的連接層 $\mathcal F$ と各整数 $q\ge0$ に対し、自然な比較写像が同型になる。

$$
\operatorname{Hom}_{\mathcal O_X}(\mathcal F,\mathcal G)
\simeq
\operatorname{Hom}_{\mathcal O_{X^{\mathrm{an}}}}
(\mathcal F^{\mathrm{an}},\mathcal G^{\mathrm{an}}),
$$

$$
H^q(X,\mathcal F)\simeq
H^q(X^{\mathrm{an}},\mathcal F^{\mathrm{an}}).
$$

**直接例：射影直線の切断。** $X=\mathbb P^1$、$\mathcal F=\mathcal O_X(d)$ とする。[射影空間のねじり層コホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)から、$d\ge0$ では大域切断は次数 $d$ の斉次二変数多項式全体であり、次の基底を持つ。

$$
X_0^d,\ X_0^{d-1}X_1,\ \ldots,\ X_1^d
\qquad(d+1\text{ 個}).
$$

$d<0$ では大域切断は零。コホモロジー比較を $q=0$ に適用すれば、解析側にも**同じ数の切断**がある。たとえば $d=2$ では

$$
aX_0^2+bX_0X_1+cX_1^2
$$

の3係数が正則切断の自由度を尽くす。

「射影的」は単なる技術的条件ではない。大域切断を局所的に見ればアフィンチャート上の正則関数を使えるが、**全チャートで正則に貼り合わせる条件**が自由度を抑えている。なお、[固有版GAGA](../CAG1-08/index.md#thm-cag1-08-proper-gaga)は射影的でない固有スキームにも成立する。ただし射影版の証明で使った $\mathcal O(1)$ の構成を、そのまま任意の固有スキームに移すことはできない。

## 2. 線束・曲線・正則射を同じ比較へ戻す

三本柱が互いに無関係な公式ではないことを確かめよう。

<a id="prop-cag1-14-three-applications"></a>

<!-- formal-statement-start -->
> **命題（射影GAGAから得られる三つの帰結）**  
> $X,Y$ を複素数体上の有限型射影スキームとする。
>
> **（1）線束**：$X$ の代数的線束の同型類と $X^{\mathrm{an}}$ の正則線束の同型類は自然に一対一対応する。
>
> **（2）曲線**：$X=C$ が滑らかな射影曲線なら、代数的種数 $g(C)=\dim_{\mathbb C}H^1(C,\mathcal O_C)$ と解析側の $\dim_{\mathbb C}H^1(C^{\mathrm{an}},\mathcal O_{C^{\mathrm{an}}})$ は等しい。
>
> **（3）射**：$X^{\mathrm{an}}\to Y^{\mathrm{an}}$ の任意の正則写像は、唯一の代数的射 $X\to Y$ の解析化である。
<!-- formal-statement-end -->

### 証明の見取り図

線束には層の代数化と射の比較、種数には一次コホモロジーの比較を使う。写像の代数性は、グラフが射影的な積の閉解析部分集合となることと、その代数化を使う。どの段階で射影性を使うかが異なる点に注意する。

<!-- proof-start -->
### 証明

（1）[Picard群のGAGA同型](../CAG1-10/index.md#thm-cag1-10-picard-gaga)は、[層の代数化](../CAG1-07/index.md#thm-cag1-07-gaga-algebraization)で正則線束を連接層として戻し、[層の射の比較](../CAG1-06/index.md#thm-cag1-06-gaga-hom)で正則な逆写像も戻す。解析側で $\mathcal L^{\mathrm{an}}\otimes (\mathcal L^{\mathrm{an}})^{-1}\simeq\mathcal O_{X^{\mathrm{an}}}$ となる可逆性が代数側でも保たれるので、対応先は単なる連接層でなく線束である。

（2）$C$ は射影的で $\mathcal O_C$ は連接だから、[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を $q=1$、$\mathcal F=\mathcal O_C$ に適用できる。構造層の解析化は $\mathcal O_{C^{\mathrm{an}}}$ である。従って

$$
H^1(C,\mathcal O_C)\simeq
H^1(C^{\mathrm{an}},\mathcal O_{C^{\mathrm{an}}}),
$$

となり有限次元複素ベクトル空間の次元が等しい。これは[曲線の種数比較](../CAG1-12/index.md#thm-cag1-12-gaga-genus)の適用である。

（3）正則写像 $f:X^{\mathrm{an}}\to Y^{\mathrm{an}}$ のグラフは、積 $(X\times Y)^{\mathrm{an}}$ 内の閉解析部分空間として扱える。$X\times Y$ も射影的であるから、[グラフの代数化](../CAG1-09/index.md#prop-cag1-09-graph-algebraization)により代数的閉部分スキーム $\Gamma$ を得る。第一射影 $\Gamma\to X$ の解析化はグラフからの同型であり、[GAGAによる射の代数性](../CAG1-09/index.md#thm-cag1-09-morphism-algebraic)の同型判定により $\Gamma\simeq X$。第二射影とその逆の合成が求める代数的射となる。一意性も同じ定理の射の比較から従う。$\square$
<!-- proof-end -->

**何が保存されて、何を主張していないか。** 線束は「正則」な線束の話であり、任意の位相的複素線束を正則線束へ持ち上げる定理ではない。種数は**層コホモロジー**の次元の比較であり、任意次元の微分形式のHodge分解を証明したことにはならない。写像は**射影的な代数多様体間**の正則写像の話であり、任意の複素多様体からの写像には適用できない。

**直接例：二次Veronese写像。** $[s:t]\in\mathbb P^1$ に対して

$$
v([s:t])=[s^2:st:t^2]\in\mathbb P^2
$$

と置く。三つの斉次二次式は $s=t=0$ 以外では同時に零とならず、射影点上で定義される代数的射である。像の座標を $[U:V:W]$ とすれば $UW=V^2$ を満たし、代数的な二次曲線が得られる。この射を解析化すれば正則写像になる。逆向きに射影多様体間の任意の正則写像も（3）により代数的であるが、その帰結はここで**既に構成した射だけ**を根拠にしたわけではない。

## 3. 五次三次元超曲面で、層コホモロジーをもう一段計算する

$P=\mathbb P^4_{\mathbb C}$ とし、$F=X_0^5+X_1^5+X_2^5+X_3^5+X_4^5$ の零点集合を $Q\subset P$、$M=Q^{\mathrm{an}}$ と書く。[射影Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)で、ほかの斉次座標を固定した偏微分 $\partial F/\partial X_j=5X_j^4$（$0\le j\le4$）が射影点で同時に零にならないことから、$Q$ は滑らかな複素次元3の射影超曲面である。また前章の[正則3形式の貼り合わせ](../CAG1-13/index.md#prop-cag1-13-analytic-gluing)と[正則3形式の一意性](../CAG1-13/index.md#thm-cag1-13-unique-volume)から $K_M\simeq\mathcal O_M$ かつ $\dim H^0(M,K_M)=1$ である。

一つの非消失正則3形式があるという事実は、すべての微分形式のコホモロジーを求めたという意味ではない。しかし $\mathcal O_Q$ のコホモロジーなら、これまでの代数的な計算だけで全次数を決められる。

<a id="prop-cag1-14-quintic-structure-cohomology"></a>

<!-- formal-statement-start -->
> **命題（滑らかな五次超曲面の構造層コホモロジー）**  
> $Q\subset\mathbb P^4_{\mathbb C}$ を非零の斉次五次式 $F$ で定まる滑らかな超曲面とし、$M=Q^{\mathrm{an}}$ とする。代数側・解析側ともに

$$
\dim_{\mathbb C}H^q(Q,\mathcal O_Q)
=\dim_{\mathbb C}H^q(M,\mathcal O_M)
=\begin{cases}
1,&q=0,3,\\
0,&q=1,2\text{ または }q>3
\end{cases}
$$

> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

五次式を掛ける写像から $\mathcal O_P(-5)$ と $\mathcal O_P$ の短完全列を作る。射影空間のねじり層コホモロジーでは $\mathcal O_P(-5)$ の**最上次 $q=4$ の群だけが非零**になる。この群が長完全列で $Q$ の三次コホモロジーへ一段下がる。

<!-- proof-start -->
### 証明

$i:Q\hookrightarrow P$ を閉埋め込みとする。$F$ は非零で $P$ の局所環に零因子でない。局所的に $F$ を掛ける写像の核は零で、その余核は $Q$ の構造層になるため、

$$
0\longrightarrow\mathcal O_P(-5)
\xrightarrow{\ \cdot F\ }\mathcal O_P
\longrightarrow i_*\mathcal O_Q\longrightarrow0
$$

が完全である。右端の核は局所的に $F$ の倍数である。ここから $Q$ 上のコホモロジーを読むには、[閉埋込みの直像とコホモロジー](../CAG1-05/index.md#prop-cag1-05-closed-pushforward)を使う。すなわち各 $q\ge0$ について

$$
H^q(P,i_*\mathcal O_Q)\simeq H^q(Q,\mathcal O_Q)
$$

である。この同型の下で長完全列を読み替える。射影空間の[ねじり層コホモロジーの公式](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)に $(n,d)=(4,-5)$ と $(4,0)$ を代入すると、

$$
H^q(P,\mathcal O_P(-5))=
\begin{cases}\mathbb C,&q=4,\\0,&q\ne4,\end{cases}
\qquad
H^q(P,\mathcal O_P)=
\begin{cases}\mathbb C,&q=0,\\0,&q>0.\end{cases}
$$

ここで $H^4(P,\mathcal O_P(-5))$ は、四次Čechコホモロジーで指数 $(-1,-1,-1,-1,-1)$ のLaurent単項式が張る一次元空間としても求められる。係数が $-5$ であるため、五指数がすべて負で総和 $-5$ となるのはこの組だけである。

[長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)の冒頭 $H^0(P,\mathcal O(-5))\to H^0(P,\mathcal O)\to H^0(Q,\mathcal O_Q)\to H^1(P,\mathcal O(-5))$ では両端が零なので $H^0(Q,\mathcal O_Q)\simeq\mathbb C$。

次の次数については、$q=1,2$ に対して長完全列の部分

$$
H^q(P,\mathcal O_P)\longrightarrow
H^q(Q,\mathcal O_Q)\longrightarrow
H^{q+1}(P,\mathcal O_P(-5))
$$

の両端が零だから $H^1(Q,\mathcal O_Q)=H^2(Q,\mathcal O_Q)=0$。一方、$q=3$ の部分は

$$
0=H^3(P,\mathcal O_P)\longrightarrow
H^3(Q,\mathcal O_Q)\longrightarrow
H^4(P,\mathcal O_P(-5))\longrightarrow
H^4(P,\mathcal O_P)=0
$$

となる。従って中央の射は同型で、$H^3(Q,\mathcal O_Q)\simeq\mathbb C$。$q>3$ は同じ長完全列と両方のねじり層の高次消滅から零になる。

最後に $Q$ は射影的で $\mathcal O_Q$ は連接だから、[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を各次数へ適用し、$H^q(Q,\mathcal O_Q)\simeq H^q(M,\mathcal O_M)$ を得る。$\square$
<!-- proof-end -->

**直接例：前章との接続。** $Q$ がFermat五次である場合、[非消失正則3形式の構成](../CAG1-13/index.md#prop-cag1-13-analytic-gluing)は $H^0(M,K_M)\simeq\mathbb C$ を与えた。この節の計算は、異なる群である $H^3(M,\mathcal O_M)\simeq\mathbb C$ を与えた。**次数0の標準束の切断**と**次数3の構造層コホモロジー**を同一視してはいない。二つが後にHodgeの対称性の両端として現れるには、さらに別の理論が要る。

## 4. Hodge数を読むには何が追加で要るか

滑らかな複素多様体 $M$ の正則 $p$-形式の層を $\Omega_M^p$ と書く。$\Omega_M^0=\mathcal O_M$、三次元では $\Omega_M^3=K_M$ である。この記号は[標準束の解析化比較](../CAG1-11/index.md#thm-cag1-11-canonical-comparison)と同じ意味で使う。

複素多様体上の微分形式を複素型 $(p,q)$ に分け、$\bar\partial$ で作る[Dolbeaultコホモロジー](../../../幾何系/CM/CM2-04/index.md#def-cm2-04-dolbeault-cohomology)の次元を $h^{p,q}$ と呼ぶ。ここで $p$ は正則方向、$q$ は反正則方向の次数である。すなわち

$$
h^{p,q}(M):=\dim_{\mathbb C}H_{\bar\partial}^{p,q}(M).
$$

これは**数の定義**であり、全特異コホモロジーが $(p,q)$ 型の直和へ分かれるという **Hodge分解定理**の証明ではない。また $H_{\bar\partial}^{p,q}(M)\simeq H^q(M,\Omega_M^p)$ と結ぶ高次元のDolbeault定理も、これまでの曲線上の[Dolbeault同型](../CAG1-12/index.md#thm-cag1-12-dolbeault-isomorphism)だけからは一般に言えない。以下の表は、その追加の入力を明示してから読む。

| この系列で計算済みの量 | 計算結果 | Hodge数へ結ぶ追加の入力 |
| --- | --- | --- |
| $H^0(M,\mathcal O_M)$ | 次元1 | $p=q=0$ のDolbeaultとの同一視 |
| $H^1(M,\mathcal O_M)$ と $H^2(M,\mathcal O_M)$ | ともに零 | 高次元のDolbeault定理 |
| $H^3(M,\mathcal O_M)$ | 次元1 | 高次元のDolbeault定理 |
| $H^0(M,K_M)$ | 次元1 | $K_M=\Omega_M^3$ とDolbeaultの次数0の同一視 |
| $H^q(M,\Omega_M^p)$（$p=1,2$） | この章では未計算 | 余接層のコホモロジー計算・Hodge理論 |

特に $h^{1,1}$ と $h^{2,1}$ は、上の既知の四つの群の次元からは直接決まらない。前者に現れるのは $\Omega_M^1$ の**一次**コホモロジーであり、後者は $\Omega_M^2$ の**一次**コホモロジーである。$\mathcal O_M$ と $K_M$ の計算だけでは、その途中の列を埋められない。

滑らかな射影多様体はKähler多様体になるので、後続のKähler–Hodge理論では、次の追加結果を学ぶ。

1. **Hodge分解**：de Rham／特異コホモロジーと $(p,q)$ 型の関係を定める。各群を直和の成分とみなす論証はまだ使わない。
2. **Lefschetz型定理**：Kähler類によるコホモロジー上の作用を制御する。これを使わず $h^{1,1}$ の値を宣言しない。
3. **Chern類・Euler標数と変形理論**：複素三次元の交代和や複素構造の変形を、必要な次数の計算へ結び付ける。quintic の具体的な Hodge 数の導出にはさらに具体的な計算が要る。

この系列で習得したのは**解析化しても層とそのコホモロジーが保たれる**こと。Hodge理論で新たに問うのは、**これらの層コホモロジーが滑らかな多様体の位相や計量の構造とどう結び付くか**である。GAGA、Hodge分解、Ricci平坦計量の存在を同じ定理として扱わない。

## 5. 総合演習と詳細解答

### Level A：各比較を単独で再構成する

<a id="ex-cag1-14-a01"></a>
#### CAG1-14-A01 アフィンで失敗する射を特定する
- Level: A

$X=\mathbb A^1_{\mathbb C}$ において $H^0(X,\mathcal O_X)\to H^0(X^{\mathrm{an}},\mathcal O_{X^{\mathrm{an}}})$ が全射でないことを示し、これがGAGAのどの仮定を失った反例か述べよ。

<!-- solution-start -->
**詳細解答。** $X=\operatorname{Spec}\mathbb C[z]$ なので左辺は $\mathbb C[z]$。解析化は複素平面であり、$e^z$ は全平面で正則である。

もし $e^z$ が次数 $m$ の多項式 $p(z)$ に等しければ、$(m+1)$ 階微分を比較すると

$$
0=p^{(m+1)}(z)=(e^z)^{(m+1)}=e^z\ne0
$$

となり矛盾する。従って全射でない。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の仮定は射影性であり、アフィン直線は射影的でない。この反例は**零次コホモロジー比較**の全射性の破綻を示す。
<!-- solution-end -->

<a id="ex-cag1-14-a02"></a>
#### CAG1-14-A02 射影直線の切断の個数
- Level: A

$d=-2,0,2$ に対し $\dim H^0(\mathbb P^1,\mathcal O(d))$ を求め、解析化後にも同じ値である理由を述べよ。

<!-- solution-start -->
**詳細解答。** [ねじり層コホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)の零次公式は $d<0$ なら零、$d\ge0$ なら次数 $d$ の斉次多項式の空間を与える。各次数へ代入すると

$$
\begin{array}{c|ccc}
d&-2&0&2\\ \hline
\dim H^0(\mathbb P^1,\mathcal O(d))&0&1&3
\end{array}
$$

となる。$d=0$ の基底は定数1、$d=2$ の基底は $X_0^2,X_0X_1,X_1^2$ である。$\mathbb P^1$ は射影的で $\mathcal O(d)$ は連接だから、[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を $q=0$ に適用できる。解析側の次元も順に $0,1,3$ となる。
<!-- solution-end -->

<a id="ex-cag1-14-a03"></a>
#### CAG1-14-A03 正則線束の代数化と位相的線束
- Level: A

$X=\mathbb P^1$ とし、$\mathcal O_{X^{\mathrm{an}}}(2)$ が代数的線束の解析化として得られる理由を説明せよ。また、同じ論証だけで任意の位相的複素線束が正則線束だと言えるか。

<!-- solution-start -->
**詳細解答。** $\mathcal O_X(2)$ は代数的線束なので解析化は正則線束 $\mathcal O_{X^{\mathrm{an}}}(2)$ である。[Picard群のGAGA同型](../CAG1-10/index.md#thm-cag1-10-picard-gaga)は逆に任意の**正則**線束も代数化できることを保証する。証明対象は $\operatorname{Pic}(X^{\mathrm{an}})$、すなわち正則束の同型類であり、正則構造を持つことを仮定しない位相的束の分類・正則化は主張していない。従って後半はこの論証だけでは言えない。
<!-- solution-end -->

<a id="ex-cag1-14-a04"></a>
#### CAG1-14-A04 平面曲線の種数を比較する
- Level: A

$C_d\subset\mathbb P^2$ を滑らかな $d$ 次平面曲線とする。$d=3$ と $d=5$ の代数的種数を求め、解析側で同じになる比較写像の次数を書け。

<!-- solution-start -->
**詳細解答。** [平面曲線の種数公式](../CAG1-12/index.md#prop-cag1-12-plane-genus)で

$$
g(C_d)=\frac{(d-1)(d-2)}2.
$$

$d=3$ なら $(2\cdot1)/2=1$、$d=5$ なら $(4\cdot3)/2=6$。ここで用いたのは滑らかな射影曲線という仮定である。解析側との対応は $q=1$ の[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)、すなわち $H^1(C_d,\mathcal O_{C_d})\simeq H^1(C_d^{\mathrm{an}},\mathcal O_{C_d^{\mathrm{an}}})$ であり、どちらも次元はそれぞれ $1,6$ となる。
<!-- solution-end -->

<a id="ex-cag1-14-a05"></a>
#### CAG1-14-A05 五次三次元超曲面の滑らかさと標準束
- Level: A

$F=\sum_{j=0}^4X_j^5$ の超曲面 $Q\subset\mathbb P^4$ について、Jacobian判定、複素次元、標準束の次数の三つを確認せよ。

<!-- solution-start -->
**詳細解答。** 斉次偏微分は

$$
\frac{\partial F}{\partial X_j}=5X_j^4
\qquad(j=0,\ldots,4)
$$

であり、全偏微分が零なら全ての射影座標が零となって矛盾する。[射影Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)より滑らか。一つの独立な方程式で $\mathbb P^4$ を切るから複素次元は $4-1=3$ である。

[随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)へ**周囲の次元** $n=4$、次数 $d=5$ を代入すると

$$
K_{Q^{\mathrm{an}}}\simeq
\mathcal O_{Q^{\mathrm{an}}}(5-4-1)
=\mathcal O_{Q^{\mathrm{an}}}.
$$

超曲面自身の次元 $3$ を $n$ に代入しない。
<!-- solution-end -->

### Level B：複数の比較を接続する

<a id="ex-cag1-14-b01"></a>
#### CAG1-14-B01 正則射を多項式で説明する
- Level: B

$v:\mathbb P^1\to\mathbb P^2$ を $[s:t]\mapsto[s^2:st:t^2]$ で定める。定義可能性・像の方程式・解析化の正則性を順に確かめ、逆に射影多様体間の正則写像が代数的になるための一般的な根拠を答えよ。

<!-- solution-start -->
**詳細解答。** 三つの斉次式はどれも二次で、$s^2=t^2=0$ なら $s=t=0$ だから射影点上で同時零にならない。従って $v$ は代数的射である。

像を $[U:V:W]$ と書くと、

$$
UW=s^2t^2=(st)^2=V^2.
$$

逆に $U\ne0$ の二次曲線上では $z=V/U$ と置いて $[U:V:W]=[1:z:z^2]$ と書ける。これは $[1:z]$ の像である。$U=0$ の場合は $V=0$ で点 $[0:0:1]$ となり、$[0:1]$ の像である。

従って像は二次曲線 $UW=V^2$ 全体である。各射影チャートの座標表示が分母の非零域で正則だから、解析化後は正則写像となる。

逆方向では一般の正則写像のグラフを射影的な積内で扱い、[正則写像の代数性](../CAG1-09/index.md#thm-cag1-09-morphism-algebraic)を使う。具体例の多項式表示だけでは**すべての**正則写像に対する逆方向を証明したことにならない。
<!-- solution-end -->

<a id="ex-cag1-14-b02"></a>
#### CAG1-14-B02 五次の四次コホモロジーから三次へ
- Level: B

滑らかな五次超曲面 $Q\subset\mathbb P^4$ に対し、制限完全列から $H^1(Q,\mathcal O_Q)$、$H^2(Q,\mathcal O_Q)$、$H^3(Q,\mathcal O_Q)$ を一続きで計算し、解析化後の結果を示せ。

<!-- solution-start -->
**詳細解答。** $P=\mathbb P^4$、$i:Q\hookrightarrow P$ と置く。斉次五次式 $F$ を掛ける短完全列は

$$
0\to\mathcal O_P(-5)\xrightarrow{\cdot F}\mathcal O_P
\to i_*\mathcal O_Q\to0
$$

である。[閉埋込みの直像のコホモロジー](../CAG1-05/index.md#prop-cag1-05-closed-pushforward)から $H^q(P,i_*\mathcal O_Q)\simeq H^q(Q,\mathcal O_Q)$ である。[ねじり層コホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)で $H^q(P,\mathcal O_P)=0$（$q>0$）、$H^q(P,\mathcal O_P(-5))=0$（$q\ne4$）、$H^4(P,\mathcal O_P(-5))\simeq\mathbb C$。

[長完全列](../../AG/AG3-08/index.md#thm-ag3-08-long-exact)により、$q=1$ と $q=2$ では $0\to H^q(Q,\mathcal O_Q)\to0$ を得る。$q=3$ では $0\to H^3(Q,\mathcal O_Q)\to H^4(P,\mathcal O_P(-5))\to0$ なので $H^3(Q,\mathcal O_Q)\simeq\mathbb C$。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の適用条件（射影・連接）を満たすから、解析側でも順に $0,0,\mathbb C$ となる。
<!-- solution-end -->

<a id="ex-cag1-14-b03"></a>
#### CAG1-14-B03 五次から六次へ動かす
- Level: B

$Y_d\subset\mathbb P^4$ が滑らかな超曲面で、$d=5$ または $6$ とする。$K_{Y_d}$ と $\dim H^0(Y_d,K_{Y_d})$ を両方求めよ。GAGAで解析側も一致することを確認せよ。

<!-- solution-start -->
**詳細解答。** $P=\mathbb P^4$、各 $d$ に対する閉埋込みを $i_d:Y_d\hookrightarrow P$ と置く。[代数的随伴公式](../../AG/AG2-10/index.md#thm-ag2-10-adjunction)に周囲の次元 $n=4$ を代入すると、

$$
K_{Y_d}\simeq\mathcal O_{Y_d}(d-4-1)
=\mathcal O_{Y_d}(d-5)
$$

を得る。$d=5$ では $K_{Y_5}\simeq\mathcal O_{Y_5}$。五次式を掛ける制限列は

$$
0\to\mathcal O_P(-5)\to\mathcal O_P
\to(i_5)_*\mathcal O_{Y_5}\to0
$$

である。$d=6$ では $K_{Y_6}\simeq\mathcal O_{Y_6}(1)$。六次式の制限列を1だけねじると

$$
0\to\mathcal O_P(-5)\to\mathcal O_P(1)
\to(i_6)_*\mathcal O_{Y_6}(1)\to0
$$

となる。[閉埋込みの直像のコホモロジー](../CAG1-05/index.md#prop-cag1-05-closed-pushforward)により $P$ 上の長完全列を各 $Y_d$ 上の群へ読み替える。[ねじり層コホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)から $H^0(P,\mathcal O_P(-5))=H^1(P,\mathcal O_P(-5))=0$ なので、いずれの列でも中央の大域切断から右端への写像が同型になる。従って

$$
H^0(Y_5,K_{Y_5})\simeq H^0(P,\mathcal O_P)\simeq\mathbb C,
\qquad
H^0(Y_6,K_{Y_6})\simeq H^0(P,\mathcal O_P(1))\simeq\mathbb C^5.
$$

次元は順に $1,5$。[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)は両者が射影的で標準束が連接であるため適用でき、解析側の大域正則3形式の次元も $1,5$ である。
<!-- solution-end -->

<a id="ex-cag1-14-b04"></a>
#### CAG1-14-B04 既知の群から分からない数を区別する
- Level: B

滑らかな五次三次元超曲面 $Q$ で、$H^0(Q,\mathcal O_Q)$、$H^3(Q,\mathcal O_Q)$、$H^0(Q,K_Q)$ の次元を求めよ。これらの数だけで $h^{1,1}$ と $h^{2,1}$ の値を決定したことにならない理由を、求めるべき層の名称を挙げて説明せよ。

<!-- solution-start -->
**詳細解答。** [本章の構造層の計算](#prop-cag1-14-quintic-structure-cohomology)より最初の二群はどちらも一次元である。$K_Q\simeq\mathcal O_Q$ は[代数的随伴公式](../../AG/AG2-10/index.md#thm-ag2-10-adjunction)の $(n,d)=(4,5)$ から分かるので、三番目も $H^0(Q,\mathcal O_Q)\simeq\mathbb C$ と同じく一次元。

一方 $h^{1,1}$ を層の言葉で読むには $H^1(Q,\Omega_Q^1)$、$h^{2,1}$ には $H^1(Q,\Omega_Q^2)$ が必要であり、さらに高次元のDolbeault同型・Hodge分解に関する正当化が要る。計算済みの $\mathcal O_Q=\Omega_Q^0$ と $K_Q=\Omega_Q^3$ だけでは $\Omega_Q^1$ と $\Omega_Q^2$ の一次群の次元は得られない。
<!-- solution-end -->

### Level C：比較の全体を自力で組み直す

<a id="ex-cag1-14-c01"></a>
#### CAG1-14-C01 解析化からHodge理論の手前まで
- Level: C

次を順序立てて論じよ。

1. $\mathbb A^1$ に射影版GAGAを適用できない理由と具体的な零次反例。
2. 滑らかな射影曲線 $C$ で $g=\dim H^1(C,\mathcal O_C)$ が解析化で保存される理由。
3. Fermat五次 $Q\subset\mathbb P^4$ における滑らかさ、$K_{Q^{\mathrm{an}}}$、$H^3(Q^{\mathrm{an}},\mathcal O)$ の次元。
4. $h^{1,1},h^{2,1}$ の数値を出す前に何が必要か。

<!-- solution-start -->
**詳細解答。**

1. $\mathbb A^1$ は射影的でなく、代数側の大域関数は $\mathbb C[z]$、解析側には $e^z$ がある。もし $e^z$ が次数 $m$ の多項式なら $(m+1)$ 階微分で矛盾する。従って零次比較は全射でなく、射影版の[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)の仮定を満たしていない。
2. $C$ は射影的、$\mathcal O_C$ は連接だから同じ[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)を $q=1$ に適用できる。$H^1(C,\mathcal O_C)\simeq H^1(C^{\mathrm{an}},\mathcal O_{C^{\mathrm{an}}})$ なので次元が一致する。曲線の滑らかさはここでは種数を幾何種数として解釈するためにも使う。
3. 偏微分 $\partial F/\partial X_i=5X_i^4$ は射影点で全て零にならないから[Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)で滑らか。複素次元は3。[解析的随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)の $5-4-1=0$ より $K_{Q^{\mathrm{an}}}\simeq\mathcal O_{Q^{\mathrm{an}}}$。[本章の構造層コホモロジー](#prop-cag1-14-quintic-structure-cohomology)は制限列から $H^3(Q,\mathcal O_Q)\simeq H^4(\mathbb P^4,\mathcal O(-5))\simeq\mathbb C$ を与え、[GAGA I](../CAG1-05/index.md#thm-cag1-05-gaga-cohomology)で解析側も一次元である。
4. $\Omega^1$ と $\Omega^2$ の一次層コホモロジーが未計算である。さらにそれらをDolbeault群・Hodge分解の成分へ結ぶ高次元Dolbeault同型・Hodge分解と、Lefschetz型定理やChern類・Euler標数／変形の計算が必要である。構造層と標準束の結果だけで数値を宣言することはできない。
<!-- solution-end -->

<a id="ex-cag1-14-c02"></a>
#### CAG1-14-C02 仮定を一つずつ外したときの境界
- Level: C

次の三例について、使える結果と使えない論証を区別せよ。

1. アフィン直線 $\mathbb A^1$ の大域正則関数。
2. $Y=V_+(X_0^5+X_1^5+X_2^5+X_3^5)\subset\mathbb P^4$ の特異点における正則3形式。
3. 滑らかな六次超曲面 $Z\subset\mathbb P^4$ の標準束。

最後に、これらを理由に射影版GAGA自体が「滑らかなものにしか使えない」と結論してよいか答えよ。

<!-- solution-start -->
**詳細解答。**

1. $\mathbb A^1$ は非射影で、大域代数的関数は多項式に限るが $e^z$ は正則で多項式でない。したがって射影版GAGAの仮定を外すと $H^0$ の比較が破綻し得る。
2. $P=[0:0:0:0:1]$ は $Y$ に属する。定義式は $X_4$ に依存せず、残りの偏微分も $P$ で零だから、[Jacobian判定](../../AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)により特異点である。$P$ では局所方程式のどの偏微分も単元として割れず、[滑らかな超曲面の正則余形式](../CAG1-11/index.md#prop-cag1-11-holomorphic-residue)を局所基底にする手順が止まる。一方 $Y$ 自体は射影スキームなので、**その連接層についてのGAGA**は依然適用できる。滑らかな三次元多様体の標準束と特異スキームの双対化層を同一視しない。
3. $Z$ が滑らかであるから[随伴公式](../CAG1-11/index.md#thm-cag1-11-analytic-adjunction)を適用できるが、$d-n-1=6-4-1=1$ となり $K_{Z^{\mathrm{an}}}\simeq\mathcal O_{Z^{\mathrm{an}}}(1)$。五次の非消失定数係数3形式と同じ貼り合わせは成立しない。一方、射影性を保つので連接層GAGAは使える。六次式を $F_6$、閉埋込みを $i:Z\hookrightarrow\mathbb P^4$ と書けば、制限列を1だけねじった

$$
0\to\mathcal O_{\mathbb P^4}(-5)
\xrightarrow{\cdot F_6}\mathcal O_{\mathbb P^4}(1)
\to i_*\mathcal O_Z(1)\to0
$$

に[ねじり層コホモロジー](../../AG/AG3-10/index.md#thm-ag3-10-projective-twist-cohomology)と[閉埋込みの直像の比較](../CAG1-05/index.md#prop-cag1-05-closed-pushforward)を適用する。両端の $H^0(\mathbb P^4,\mathcal O(-5))$、$H^1(\mathbb P^4,\mathcal O(-5))$ が零だから、

$$
H^0(Z,K_Z)\simeq H^0(\mathbb P^4,\mathcal O(1))\simeq\mathbb C^5
$$

と計算できる。

従って「GAGAは滑らかなものにしか使えない」は誤り。GAGAの射影性という仮定、随伴公式の滑らかさという仮定、五次で指数が消えるという算術的条件は別々に検査する。
<!-- solution-end -->

## 6. ここから先の問い

射影的な幾何では、解析側に現れる連接層とその射・コホモロジーを代数的に復元できる。曲線の種数も、quinticの構造層の全次数も、この道具で計算できた。

次に必要なのは、微分形式の層 $\Omega_M^p$ のコホモロジーを**どのような位相的・幾何的構造として読むのか**という別の問いである。Hodge分解とLefschetz型の結果を学び、Chern類や変形の情報を合わせたとき、初めて $h^{1,1}$ と $h^{2,1}$ の具体的な計算へ進める。その区別を手元の公式へ明記できれば、GAGAからHodge理論への橋は架かっている。
