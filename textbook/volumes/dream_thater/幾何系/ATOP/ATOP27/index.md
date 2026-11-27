# ATOP27 Lefschetz不動点定理

円周を少し回転すると元の位置に留まる点はありませんが、円周を鏡映すると二点が留まります。どちらも円周から円周への連続写像です。空間のホモロジー群だけでは両者を区別できませんが、写像がその群に及ぼす作用なら区別できます。今回は各次数の作用を一つの数にまとめ、不動点の存在を判定します。

## 1. 有理数係数とトレース

有限単体複体の整数係数の[単体鎖群](../ATOP13/index.md#def-atop13-simplicial-chains)は、向きを選んだ単体を基底とする自由アーベル群です。これまでの境界行列は整数行列でしたが、今回は同じ行列を有理数上で扱います。核や商がベクトル空間になるため、誘導写像の対角成分の和を使えます。

特異鎖についても基底を特異単体として、有限個の有理係数の和を許します。境界の公式は変更しません。各次数の鎖群を $C_q(-;\mathbb Q)$ と書き、負次数は零とします。サイクルと境界はそれぞれ $Z_q=\ker\partial_q$、$B_q=\operatorname{im}\partial_{q+1}$ です。[特異ホモロジー群](../ATOP16/index.md#def-atop16-singular-homology) と同じ商 $H_q=Z_q/B_q$ を有理数上で取ります。例えば $2z=\partial w$ なら $z=\partial(w/2)$ となります。整数係数で残っていた有限位数の類は、この計算では消えます。

整数係数で得た比較結果を使える理由を確認します。

<a id="lem-atop27-rational-comparison"></a>

<!-- formal-statement-start -->
> **補題（有理数係数への比較の移行）**
> 整数係数の自由アーベル群からなる二つの鎖複体の間の鎖写像 $J$ が、全次数の整数係数ホモロジー上で同型を誘導するとする。同じ基底で有理係数を許して線形に延長した鎖写像も、全次数のホモロジー上で同型を誘導する。
<!-- formal-statement-end -->

鍵は、一つの鎖に現れる項数が有限なので分母を一度に払えることです。

<!-- proof-start -->
### 証明

有理係数の対象側サイクル $z$ を取ります。正整数 $m$ を選んで $mz$ を整数鎖にします。$\partial(mz)=m\partial z=0$ です。整数係数での全射性により、整数サイクル $u$ と整数鎖 $v$ が存在して $mz-Ju=\partial v$ となります。従って

$$
z-J(u/m)=\partial(v/m).
$$

これで有理係数での全射性が示されました。

次に有理係数の始域側サイクル $u$ に対して $Ju=\partial v$ とします。$u,v$ の全係数の分母を払う正整数 $m$ を取れば $mu,mv$ は整数鎖で、$J(mu)=\partial(mv)$ です。整数係数での単射性から整数鎖 $w$ が存在して $mu=\partial w$ となります。よって $u=\partial(w/m)$ であり、単射性も示されました。
<!-- proof-end -->

[単体ホモロジーと特異ホモロジーの比較定理](../ATOP21/index.md#thm-atop21-comparison) にこの補題を適用できます。従って有限単体複体の実現の有理係数特異ホモロジーは有限次元で、複体の次元を超える次数では零です。[比較同型の自然性と頂点順序への非依存性](../ATOP21/index.md#thm-atop21-naturality) の証明で使う鎖ホモトピーの等式は整数線形写像の等式なので有理数上にも延長されます。[特異ホモロジーのホモトピー不変性](../ATOP17/index.md#thm-atop17-homotopy-invariance) のプリズム恒等式も同じ理由で有効です。

有限次元ベクトル空間の自己線形写像 $T$ の行列を $A=(a_{ij})$ とし、対角成分の和を $\operatorname{tr}T=\sum_i a_{ii}$ と書きます。零次元空間では零とします。基底を変える行列 $P$ は可逆で、新しい行列は $P^{-1}AP$ です。正方行列 $U,V$ に対して

$$
\operatorname{tr}(UV)=\sum_{i,j}u_{ij}v_{ji}
=\operatorname{tr}(VU)
$$

なので $\operatorname{tr}(P^{-1}AP)=\operatorname{tr}(APP^{-1})=\operatorname{tr}A$ です。従って基底の選び方に依存しません。例えば行列 $\begin{pmatrix}2&3\\0&-1\end{pmatrix}$ のトレースは1です。非対角成分3は数えません。

## 2. Lefschetz数

有限単体複体の実現と同相な空間を有限多面体とします。以下、空でない有限多面体 $X$ と連続自己写像 $f:X\to X$ を考えます。[特異ホモロジーの誘導準同型](../ATOP16/index.md#thm-atop16-induced-homology) によって各次数に自己線形写像 $H_q(f;\mathbb Q)$ が得られます。これらを交代符号で足します。

<a id="def-atop27-lefschetz-number"></a>

<!-- formal-statement-start -->
> **定義（Lefschetz数）**
> 空でない有限多面体 $X$ の連続自己写像 $f$ に対し、その Lefschetz数を

$$
L(f)=\sum_{q\ge0}(-1)^q
\operatorname{tr}(H_q(f;\mathbb Q))
$$

> とする。和は有限個の非零項しか持たない。
<!-- formal-statement-end -->

具体例として円周を考えます。[胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison) で一点と一つの1胞体の鎖群を使うと、1胞体の両端が同じ点なので境界は零です。従って整数係数では $H_0,H_1$ がともに $\mathbb Z$、他は零で、有理係数では $\mathbb Q,\mathbb Q$ になります。実際、比較写像に[有理数係数への比較の移行](#lem-atop27-rational-comparison) と同じ分母を払う議論が適用できます。

円周の反射 $r(z)=\bar z$ を取ります。円周は道連結なので [0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) より $H_0(r)$ は一点の類を一点の類に送る恒等写像です。[反射と対蹠写像の写像度](../ATOP23/index.md#thm-atop23-reflection-antipodal) により $H_1(r)$ は $-1$ 倍です。以上から

$$
L(r)=1-(-1)=2.
$$

このように定義の各次数の作用を確認して数を求めます。

[特異ホモロジーのホモトピー不変性](../ATOP17/index.md#thm-atop17-homotopy-invariance) によってホモトピックな自己写像は全次数の誘導写像が一致するので、Lefschetz数も一致します。恒等写像の場合、各トレースはホモロジーの次元であり、交代和は Euler 標数です。

## 3. 鎖上のトレースから計算する

特異鎖群は普通は無限次元で、そのトレースを取ることはできません。しかし有限単体複体の単体鎖群なら可能です。鎖写像の行列からホモロジー上の作用を計算する際、核と像の基底を毎回求めずに済む公式を証明します。

<a id="thm-atop27-hopf-trace"></a>

<!-- formal-statement-start -->
> **定理（Hopfのトレース公式）**
> $C_*$ を有限個の次数にのみ非零項を持つ有限次元有理ベクトル空間の鎖複体とし、$T:C_*\to C_*$ を鎖自己写像とする。各次数の誘導写像を $H_q(T)$ とすると

$$
\sum_q(-1)^q\operatorname{tr}T_q
=\sum_q(-1)^q\operatorname{tr}H_q(T).
$$
<!-- formal-statement-end -->

見取り図：各鎖空間の基底を境界、サイクルの残り、サイクルでない部分に分けます。境界は一つ上の次数から来るので、交代和では同じトレースが逆符号で相殺します。

<!-- proof-start -->
### 証明

鎖写像の等式 $\partial T=T\partial$ により、$z\in Z_q$ なら $\partial Tz=T\partial z=0$、$b=\partial c\in B_q$ なら $Tb=\partial Tc\in B_q$ です。従って $B_q\subseteq Z_q\subseteq C_q$ は $T_q$ で保たれます。

$B_q$ の基底を選び、これを $Z_q$ の基底に拡張し、さらに $C_q$ の基底に拡張します。追加した二群のベクトルの張る空間をそれぞれ $U_q,V_q$ とすれば

$$
C_q=B_q\oplus U_q\oplus V_q,\qquad Z_q=B_q\oplus U_q.
$$

この基底の順で $T_q$ の行列は

$$
\begin{pmatrix}
A_q & * & *\\
0 & D_q & *\\
0 & 0 & E_q
\end{pmatrix}
$$

となります。星印は値を特定しない部分です。$D_q$ は $Z_q/B_q$ 上の誘導写像の行列です。$E_q$ は $C_q/Z_q$ 上の作用の行列です。

境界作用素は $C_q/Z_q\to B_{q-1}$ の同型を誘導します。核が $Z_q$ で、像が $B_{q-1}$ だからです。さらに

$$
\partial_q T_q[c]=T_{q-1}\partial_q[c]
$$

と、商からの境界写像を通じて両作用が可換になります。従って $E_q$ は $B_{q-1}$ 上の作用と基底変換で結ばれ、$\operatorname{tr}E_q=\operatorname{tr}A_{q-1}$ です。ここで複体の外側では $A_q=0$ とします。

対角ブロックの和を取ると

$$
\operatorname{tr}T_q
=\operatorname{tr}A_q+\operatorname{tr}H_q(T)
+\operatorname{tr}A_{q-1}.
$$

交代和における $\operatorname{tr}A_j$ の係数は、$q=j$ の項の $(-1)^j$ と $q=j+1$ の項の $(-1)^{j+1}$ の和で零です。残るのはホモロジー上の交代トレースだけです。
<!-- proof-end -->

例として線分の恒等写像を取ると $C_0=\mathbb Q^2,C_1=\mathbb Q$ で、鎖上のトレースは2と1です。交代和は1です。辺の境界 $[b]-[a]$ が $C_0$ の一次元を占めており、$C_1$ の一次元と相殺します。ホモロジー上に残るのは一点の類だけです。

## 4. 不動点がないと対角係数が消える

単体写像では、基底単体が自分自身へ送られると対角係数が現れます。連続写像でも、単体近似と細分を組み合わせれば、元の複体と同じ鎖空間上の自己写像を作れます。値域を先に十分細かくすることが重要です。

<a id="thm-atop27-lefschetz"></a>

<!-- formal-statement-start -->
> **定理（Lefschetz不動点定理）**
> 空でない有限多面体 $X$ と連続自己写像 $f:X\to X$ に対して、$L(f)\ne0$ なら $f(x)=x$ を満たす点 $x\in X$ が存在する。
<!-- formal-statement-end -->

証明の見取り図：不動点がなければ、全点の移動距離に正の下限があります。値域の単体の直径をその下限より小さくすると、細分して近似した像は元の単体へ戻れません。したがって鎖上の対角係数はすべて零になります。[Hopfのトレース公式](#thm-atop27-hopf-trace) がこれをホモロジー上の情報へ変換します。

<!-- proof-start -->
### 証明

有限多面体の同相によって $X$ を有限単体複体 $K$ の実現とみなします。誘導写像は同相によって共役になるのでトレースは変わりません。実現の Euclid 距離を $d$ とし、不動点がないと仮定します。有限個の閉単体の合併はコンパクトであり、連続関数 $x\mapsto d(x,f(x))$ は最小値を取ります。各値が正なので

$$
\delta=\min_{x\in X}d(x,f(x))>0.
$$

[重心細分複体の実現](../ATOP15/index.md#prop-atop15-realization) によって反復細分を同じ空間内で扱います。[重心細分によるメッシュ縮小](../../../応用系/FIX/FIX1/index.md#prop-fix1-barycentric-mesh) の評価から、値域の複体 $M$ を十分細分して

$$
h=\operatorname{mesh}(M)<\delta/3
$$

とできます。次元0ならメッシュは初めから零です。

[単体近似定理](../ATOP15/index.md#thm-atop15-simplicial-approximation) を $f:|M|\to|M|$ に適用します。定義域をさらに $r$ 回細分した $N=\operatorname{sd}^rM$ と、単体近似 $g:N\to M$ が得られます。スター条件により各 $x$ に対し $|g|(x)$ と $f(x)$ は $M$ の同じ閉単体に属します。従って

$$
d(|g|(x),f(x))\le h.
$$

[細分鎖写像と境界の可換性](../ATOP15/index.md#thm-atop15-subdivision-chain-map) を反復して $S:C_*(M;\mathbb Q)\to C_*(N;\mathbb Q)$ を得ます。$r=0$ なら恒等写像です。[単体写像は境界と可換](../ATOP13/index.md#thm-atop13-chain-map) により $g_\#$ も鎖写像です。したがって

$$
T=g_\# S:C_*(M;\mathbb Q)\to C_*(M;\mathbb Q)
$$

は同じ複体上の鎖自己写像です。

この $T$ のホモロジー上の作用が $f$ と一致することを確認します。各細分における最大頂点写像 $p$ の実現は、細分前の同一視写像とホモトピックです。実際、細分単体に含まれる点とその像は、その細分単体を含む元の閉単体に属するため、直線補間がその中に留まります。反復の場合は各段階の最大頂点写像を合成します。

[細分の鎖ホモトピー](../ATOP15/index.md#thm-atop15-subdivision-homotopy) より $H(S)$ は最大頂点写像の誘導写像の逆です。この等式は有理数上でも成立します。従って [比較同型の自然性](../ATOP21/index.md#thm-atop21-naturality) と [特異ホモロジーのホモトピー不変性](../ATOP17/index.md#thm-atop17-homotopy-invariance) により、$H(S)$ は同じ空間への恒等写像に対応します。また $|g|\simeq f$ です。比較同型を $J_M,J_N$ と記せば

$$
J_M H(T)=H(|g|)J_N H(S)
=H(f)J_M.
$$

よって各次数のトレースが一致します。

最後に $M$ の向き付き基底 $q$ 単体 $\sigma$ を取ります。$S\sigma$ の各項 $\tau$ は $\sigma$ の内部または境界に含まれる細分単体です。もし $T\sigma$ に $\sigma$ の非零係数が現れるなら、少なくとも一つのそのような $\tau$ が $g_\#\tau=\pm\sigma$ を満たします。頂点の像が重複すると誘導鎖は零なので、この場合は $\tau$ の頂点が $\sigma$ の頂点へ一対一に写ります。

$\tau$ の頂点 $v$ を一つ取ります。$v,|g|(v)$ はともに $\sigma$ に属し、従って $d(v,|g|(v))\le h$ です。先ほどの近似誤差の評価と合わせれば

$$
\begin{aligned}
d(v,f(v))
&\le d(v,|g|(v))+d(|g|(v),f(v))\\
&\le 2h<\delta.
\end{aligned}
$$

これは $\delta$ の定義に反します。よってすべての基底単体の対角係数が零であり $\operatorname{tr}T_q=0$ です。[Hopfのトレース公式](#thm-atop27-hopf-trace) により

$$
L(f)=\sum_q(-1)^q\operatorname{tr}T_q=0.
$$

対偶を取れば定理が従います。
<!-- proof-end -->

二つの細分を区別する理由を整理します。

| 操作 | 役割 |
| --- | --- |
| $K$ から $M$ への細分 | 値域の単体直径を移動距離より小さくする |
| $M$ から $N$ への細分 | スター条件を満たす単体近似を得る |
| $g_\#S$ | 同じ基底で対角係数を読み取れるようにする |

不動点の個数を数えたのではなく、存在しない場合に交代トレースが消えることを示しました。

## 5. 定理の使い方と限界

円周上の回転 $f(z)=e^{i\theta}z$ は $\theta\notin2\pi\mathbb Z$ なら不動点を持ちません。$e^{it\theta}z$ は恒等写像からのホモトピーです。従って $H_0,H_1$ の作用はともに恒等写像で $L(f)=1-1=0$ です。恒等写像も同じ数ですが全点が不動点です。零という値だけでは存在も不存在も判定できません。

球面 $S^n$（$n\ge1$）について [球面の写像度](../ATOP23/index.md#def-atop23-degree) の定義で使うホモロジー計算から、非零の有理係数群は $H_0,H_n$ のみで、どちらも一次元です。道連結性から0次の作用は恒等写像で、$n$ 次の作用は写像度 $d_f$ 倍です。従って

$$
L(f)=1+(-1)^n d_f.
$$

例えば $S^2$ の恒等写像は $L=2$、対蹠写像は [反射と対蹠写像の写像度](../ATOP23/index.md#thm-atop23-reflection-antipodal) により $d_f=(-1)^3=-1$ なので $L=0$ です。

有限多面体という仮定も重要です。実直線の平行移動 $x\mapsto x+1$ は不動点を持たず、実直線は可縮なので0次群は $\mathbb Q$、高次群は零です。交代トレースだけなら1ですが、移動距離が正でも有限個の単体からなるコンパクトな空間ではありません。有限次元のホモロジーを持つだけでは、有限な鎖群上の公式を適用できるとは限りません。

## 6. 演習

### 演習 ATOP27-A1：対角成分

- Level: A

ある自己写像の有理係数ホモロジー上の行列が0次で $(1)$、1次で $\begin{pmatrix}2&3\\-1&-2\end{pmatrix}$、2次で $(4)$ であり、他の次数は零とする。Lefschetz数を計算せよ。

<!-- solution-start -->
**詳細解答**

[Lefschetz数](#def-atop27-lefschetz-number) の各トレースは順に1、$2-2=0$、4です。交代符号を付けると $L=1-0+4=5$ です。空でない有限多面体なら [Lefschetz不動点定理](#thm-atop27-lefschetz) により不動点を持ちます。
<!-- solution-end -->

### 演習 ATOP27-A2：有限集合

- Level: A

離散的な四点 $a,b,c,d$ 上で $f(a)=b,f(b)=a,f(c)=c,f(d)=c$ とする。鎖上の行列と Lefschetz数を求めよ。

<!-- solution-start -->
**詳細解答**

0次の基底を順に $a,b,c,d$ とすると、像の係数を列に並べた行列は

$$
\begin{pmatrix}
0&1&0&0\\
1&0&0&0\\
0&0&1&1\\
0&0&0&0
\end{pmatrix}.
$$

正次数の単体鎖は零で、0次の境界群も零です。従って [Hopfのトレース公式](#thm-atop27-hopf-trace) による数は $0+0+1+0=1$ です。実際に $c$ が唯一の不動点です。
<!-- solution-end -->

### 演習 ATOP27-A3：円周の二つの写像

- Level: A

$S^1$ 上の $f(z)=z^2$ と $g(z)=-z$ の Lefschetz数を計算し、零でない場合は不動点を一つ確認せよ。

<!-- solution-start -->
**詳細解答**

円周は道連結なので0次の作用は1倍です。ループ $t\mapsto e^{2\pi it}$ に $f$ を合成すると $e^{4\pi it}$ となり、[円周の基本群と巻き数](../ATOP6/index.md#thm-atop6-fundamental-group-circle) の生成元の二倍です。[次数1の Hurewicz 同型の自然性](../ATOP26/index.md#prop-atop26-naturality) により1次ホモロジー上も2倍です。従って $L(f)=1-2=-1$ です。$f(1)=1$ が確認できます。

$g$ は $e^{i\pi t}z$ によって恒等写像とホモトピックです。[特異ホモロジーのホモトピー不変性](../ATOP17/index.md#thm-atop17-homotopy-invariance) から $L(g)=1-1=0$ です。$-z=z$ は $z=0$ を要求しますが円周に属しません。
<!-- solution-end -->

### 演習 ATOP27-A4：球面の写像度

- Level: A

$S^3$ の自己写像の写像度が $-2$ であるとする。Lefschetz数と不動点の存在を判定せよ。

<!-- solution-start -->
**詳細解答**

0次の作用は恒等写像、3次は [球面の写像度](../ATOP23/index.md#def-atop23-degree) により $-2$ 倍であり、1次、2次と4次以上は零です。従って

$$
L=1+(-1)^3(-2)=3.
$$

$S^3$ は有限多面体（4単体の境界と同相）なので [Lefschetz不動点定理](#thm-atop27-lefschetz) により不動点を持ちます。
<!-- solution-end -->

### 演習 ATOP27-B1：鎖上の相殺

- Level: B

$C_1=\mathbb Q^2,C_0=\mathbb Q^2$、他は零で、境界行列を $D=\begin{pmatrix}1&0\\0&0\end{pmatrix}$ とする。自己線形写像の行列が

$$
T_1=\begin{pmatrix}3&0\\2&5\end{pmatrix},
\qquad
T_0=\begin{pmatrix}3&7\\0&-1\end{pmatrix}
$$

であるとき、鎖写像の条件と [Hopfのトレース公式](#thm-atop27-hopf-trace) を両辺の計算で確認せよ。

<!-- solution-start -->
**詳細解答**

$DT_1=\begin{pmatrix}3&0\\0&0\end{pmatrix}=T_0D$ なので鎖写像です。$C_1$ の標準基底を $e_1,e_2$、$C_0$ を $v_1,v_2$ とします。$De_1=v_1,De_2=0$ より $H_1$ は $e_2$ の類で生成されます。$T_1e_2=5e_2$ なので作用は5倍です。

$H_0=C_0/\mathbb Qv_1$ は $[v_2]$ を基底とし、$T_0v_2=7v_1-v_2$ なので作用は $-1$ 倍です。ホモロジー側の交代和は $-1-5=-6$ です。一方鎖側は

$$
(3-1)-(3+5)=-6.
$$

境界に対応する3が0次と1次から相殺されました。
<!-- solution-end -->

### 演習 ATOP27-B2：二段階の細分

- Level: B

有限多面体上の自己写像に対し全点で $d(x,f(x))\ge1$ とする。値域の複体 $M$ のメッシュは $h<1/2$、$g:N\to M$ は細分 $N$ 上の単体近似とする。$g_\#S$ の対角成分が零となることを、頂点の距離評価から説明せよ。

<!-- solution-start -->
**詳細解答**

[細分鎖写像と境界の可換性](../ATOP15/index.md#thm-atop15-subdivision-chain-map) の支持条件から、基底単体 $\sigma$ の細分鎖の各単体 $\tau$ は $\sigma$ 内にあります。もし対角成分が零でなければ、ある $\tau$ が $\pm\sigma$ に写る必要があります。その頂点 $v$ と $g(v)$ は同じ $\sigma$ にあるので $d(v,g(v))\le h$ です。

[単体近似定理](../ATOP15/index.md#thm-atop15-simplicial-approximation) のスター条件により $g(v)$ と $f(v)$ は $M$ の同じ単体にあるので $d(g(v),f(v))\le h$ です。従って

$$
d(v,f(v))\le h+h<1.
$$

仮定と矛盾します。定義域だけを細分するのでは値域の誤差 $h$ をこのように抑えられないため、値域の細分も必要です。
<!-- solution-end -->

### 演習 ATOP27-B3：零の判定と仮定

- Level: B

円周の恒等写像と非自明な回転が同じ Lefschetz数になることを示せ。さらに実直線の平行移動について、交代トレースが非零でも定理と矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答**

円周の恒等写像の0次と1次の作用はともに1倍です。回転は連続な回転角の変化によって恒等写像とホモトピックです。[特異ホモロジーのホモトピー不変性](../ATOP17/index.md#thm-atop17-homotopy-invariance) によって同じ作用を持ち、いずれも $1-1=0$ です。恒等写像には全点、非自明な回転には零個の不動点があります。

実直線は一点へ変形できるので [可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) と道連結性より0次群だけが一次元です。平行移動も0次では恒等写像で交代トレースは1です。しかし実直線は非コンパクトで有限多面体ではなく、証明の有限な鎖空間がありません。よって [Lefschetz不動点定理](#thm-atop27-lefschetz) を適用できません。
<!-- solution-end -->

### 演習 ATOP27-C1：グラフ上の自己写像

- Level: C

二つの円周を一点で合わせたグラフ $X$ を考える。ループ $a,b$ をそれぞれの円周の生成元とする。基点を固定する連続写像 $f:X\to X$ がループを $a\mapsto ab^2$、$b\mapsto a^{-1}b^{-1}$ に送るとする。

1. 有理係数1次ホモロジーの行列と Lefschetz数を求めよ。
2. $f^2$ についても求めよ。
3. 不動点の存在と、周期がちょうど2の点の存在を区別せよ。

<!-- solution-start -->
**詳細解答**

[花束の基本群](../ATOP8/index.md#thm-atop8-bouquet-group) は二生成元の自由群です。[次数1の Hurewicz 定理](../ATOP26/index.md#thm-atop26-hurewicz-one) と [次数1の Hurewicz 同型の自然性](../ATOP26/index.md#prop-atop26-naturality) により1次ホモロジーではループの指数和を列に並べればよいです。係数を有理数へ拡張すると行列は

$$
A=\begin{pmatrix}1&-1\\2&-1\end{pmatrix}.
$$

0次は道連結性から恒等写像です。グラフは1次元の有限単体複体として実現できるので比較定理より高次ホモロジーは零です。従って $L(f)=1-(1-1)=1$ です。

[特異ホモロジーの誘導準同型](../ATOP16/index.md#thm-atop16-induced-homology) の合成則から $f^2$ の作用は

$$
A^2=
\begin{pmatrix}
1-2&-1+1\\
2-2&-2+1
\end{pmatrix}
=\begin{pmatrix}-1&0\\0&-1\end{pmatrix}.
$$

よって $L(f^2)=1-(-2)=3$ です。

[Lefschetz不動点定理](#thm-atop27-lefschetz) は両写像の不動点を保証します。ただし $f(x)=x$ なら $f^2(x)=f(x)=x$ です。従って $f^2$ の不動点が存在するだけでは、その点の最小周期が2とは結論できません。基点自身が両方の不動点でもあります。Lefschetz数の差を個数の差として読むこともできません。
<!-- solution-end -->

## 7. まとめ

Lefschetz数はホモロジー上の作用の交代トレースです。鎖の境界に由来するトレースは隣接次数で相殺します。有限多面体において不動点がないと、十分小さな単体の像は元の単体に戻れないため鎖上のトレースは零です。この二つの議論が大域的な線形代数と不動点の存在を結びます。次講からは鎖に対して値を割り当てるコチェインを考えます。
