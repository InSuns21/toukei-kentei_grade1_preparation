# BHI6 ユニタリ蒸発のエントロピー制約

<!-- definition-example-audit: strict -->

## 1. 放射が熱的に見えても、全体は純粋なままであり得る

[BHI5の局所粗視化と精細エントロピーの区別](../BHI5/index.md#def-bhi5-local-coarse)によれば、個別の放射モードが熱的であることと、全放射の精細エントロピーが大きいことは同義ではありません。[BHI3の独立対生成](../BHI3/index.md#thm-bhi3-entropy-growth)では放射エントロピーは増え続けました。しかしこれは、**新しい外部モードが過去の放射から独立している**という特別な仮定を加えた結果です。

今回は、閉じた初期状態が純粋で、途中の時間発展が情報を失わないと仮定した場合、放射 $R_k$ と残存側 $B_k$ の精細エントロピーに何が必ず成り立つかを調べます。目的は後続の Page 曲線を「証明してしまう」ことではなく、その前に全体の純粋性だけから得られる制約を取り出すことです。

以下では有限次元 Hilbert 空間を使い、$S(X)=-\operatorname{Tr}(\rho_X\ln\rho_X)$ を自然対数（単位 nat）で計算し、$0\ln0=0$ とします。[QINF17のエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)の bit 単位での値に $\ln2$ を掛けたものです。実在ブラックホールの時空を有限個の量子ビットへ厳密に同定したという意味ではありません。

## 2. どの系に純粋性を要求するのか

一回目までの放射を $R_1$、二回目に新たに加わる放射を $b_2$ とすれば、$R_2=R_1b_2$ です。ここで $XY$ は二つの系をまとめた表記で、Hilbert 空間では

$$
\mathcal H_{XY}=\mathcal H_X\otimes\mathcal H_Y
$$

を意味します。放出後の残存側を $B_2$ とし、**外に捨てた未知の環境を別に置かない**模型を考えます。

各放出では、直前の残存系のベクトルを「新しい放射＋次の残存系」へ移します。その際、異なる入力の内積が変わらないようにするのが[BHI1で導入した等長写像の条件](../BHI1/index.md#def-bhi1-endpoint-split)です。任意の入力ベクトル $u,v$ と線形写像 $W$ について、等長性は

$$
W^\dagger W=I
\quad\Longleftrightarrow\quad
\langle Wu,Wv\rangle=\langle u,v\rangle
$$

という条件で判定できます。$W^\dagger$ は随伴、$I_X$ は系 $X$ 上の恒等作用素を表します。この条件は出力空間の次元が入力より大きくても使え、全出力空間上のユニタリ作用素であることまでは要求しません。[QINF33の段階的SWAP放出模型](../../../応用系/QINF/QINF33/index.md#def-qinf33-swap-emission)も、この考え方を固定された全系のユニタリ交換で実現した例です。

<a id="def-bhi6-pure-evaporation"></a>

<!-- formal-statement-start -->
> **定義（段階的純粋蒸発の有限模型）**
>
> 整数 $N\ge1$ と有限次元 Hilbert 空間 $\mathcal H_{B_0},\mathcal H_{b_1},\ldots,\mathcal H_{b_N},\mathcal H_{B_1},\ldots,\mathcal H_{B_N}$ を固定する。初期状態 $|\chi\rangle\in\mathcal H_{B_0}$ は規格化された純粋状態とする。各段階に**等長写像** $W_k$ を用い、

$$
W_k:\mathcal H_{B_{k-1}}\longrightarrow
\mathcal H_{b_k}\otimes\mathcal H_{B_k},
\qquad W_k^\dagger W_k=I_{B_{k-1}}
$$

> とする。$R_0$ は一次元の自明系、$R_k=b_1\cdots b_k$ とし、状態を次で逐次定める。

$$
|\Omega_0\rangle=|\chi\rangle,\qquad
|\Omega_k\rangle=(I_{R_{k-1}}\otimes W_k)|\Omega_{k-1}\rangle
\in\mathcal H_{R_k}\otimes\mathcal H_{B_k}.
$$

> $B_k$ は放射以外の全自由度を集めた系とする。$\rho_{R_k}=\operatorname{Tr}_{B_k}|\Omega_k\rangle\langle\Omega_k|$、$\rho_{B_k}=\operatorname{Tr}_{R_k}|\Omega_k\rangle\langle\Omega_k|$ とし、それぞれのエントロピーを $S(R_k)$、$S(B_k)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi6-pure-evaporation -->
**定義の確認**：初期残存系を二量子ビット $B_0=AC$、初期状態を

$$
|\chi\rangle_{AC}=\frac{|00\rangle+|11\rangle}{\sqrt2}
$$

とします。計算基底 $|ac\rangle_{AC}$（$a,c\in\{0,1\}$）は正規直交で、初期状態のノルムの二乗は $(1/2)+(1/2)=1$ なので、ノルムも $1$ です。一回目は $A$ を放射 $b_1$ として取り出し、$C$ を残存側 $B_1$ とする線形写像を、基底上で

$$
W_1|ac\rangle_{AC}=|a\rangle_{b_1}|c\rangle_{B_1}
$$

と定めます。入力と出力はどちらも四次元です。**なぜ基底の像を見るだけで等長性を判定できるのでしょうか。** 任意の入力を $x=\sum_{a,c}x_{ac}|ac\rangle$、$y=\sum_{a,c}y_{ac}|ac\rangle$ と展開し、線形性と出力基底の正規直交性を使うと

$$
\begin{aligned}
\langle W_1x,W_1y\rangle
&=\sum_{a,c}\sum_{a',c'}\overline{x_{ac}}y_{a'c'}
  \langle a|a'\rangle\langle c|c'\rangle\\
&=\sum_{a,c}\overline{x_{ac}}y_{ac}
=\langle x,y\rangle.
\end{aligned}
$$

したがって $W_1^\dagger W_1=I_{B_0}$ です。二回目も $B_1$ の基底 $|c\rangle$ に対して

$$
W_2|c\rangle_{B_1}=|c\rangle_{b_2}|{\rm vac}\rangle_{B_2},
\qquad c\in\{0,1\},
$$

と定めます。$|{\rm vac}\rangle$ は一次元の $B_2$ の規格化基底で、$\dim B_2=1$ です。二つの像は正規直交なので、同じ基底展開の議論から $W_2^\dagger W_2=I_{B_1}$ です。各段階の出力は

$$
|\Omega_1\rangle
=\frac{|0\rangle_{b_1}|0\rangle_{B_1}+|1\rangle_{b_1}|1\rangle_{B_1}}{\sqrt2},
$$

$$
|\Omega_2\rangle
=\frac{|00\rangle_{b_1b_2}+|11\rangle_{b_1b_2}}{\sqrt2}
\otimes|{\rm vac}\rangle_{B_2}.
$$

この二つの状態は直交する二項の係数がいずれも $1/\sqrt2$ なので規格化されています。また、$B_0$・$B_1$・$B_2$ の次元は順に $4,2,1$ であり、**純粋な初期状態・各段階の等長性・放射と残存側への分割**という定義の条件をすべて確認できました。この模型にはエネルギー・曲がった時空・重力的拘束はまだ入っていません。
<!-- definition-example-end -->

等長性は任意の入力の内積を保存します。例えば各 $W_k$ について $\|W_kv\|^2=\langle v,W_k^\dagger W_kv\rangle=\|v\|^2$ です。したがって純粋初期状態から出発した $|\Omega_k\rangle$ は全段階で規格化された純粋状態です。ただし **初期状態が混合なら、等長性だけでは各段階の $R_kB_k$ の純粋性は得られません**。また、実在の重力系をこのテンソル積へ分割できるかは BHI15 で改めて吟味します。

## 3. 全体の純粋性が決めること：等エントロピーと次元上界

放射を単独で見た密度行列が混合状態になることがあります。その混合の度合いを全系のどこが担っているかを調べるには、[Schmidt分解に基づく純粋二部系の縮約エントロピーの一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)を $R_k|B_k$ の分割へ適用します。ここでいう残存側は、物理的な地平線内部だけではなく、放射以外に存在する全自由度を含める必要があります。

<a id="thm-bhi6-entropy-budget"></a>

<!-- formal-statement-start -->
> **定理（純粋蒸発模型のエントロピー収支と残存次元上界）**
>
> [段階的純粋蒸発の有限模型](#def-bhi6-pure-evaporation)の任意の段階 $0\le k\le N$ で、$d_R(k)=\dim\mathcal H_{R_k}$、$d_B(k)=\dim\mathcal H_{B_k}$ とおく。すると

$$
\boxed{S(R_k)=S(B_k)\le\ln\min\{d_R(k),d_B(k)\}.}
$$

> 特に $d_B(N)=1$ なら $S(R_N)=0$ であり、終期の全放射は純粋状態である。上界の等号成立は一般には保証されない。
<!-- formal-statement-end -->

### 証明の見取り図

初期純粋性と等長性により、各段階の $R_kB_k$ は純粋です。その状態の Schmidt 係数の二乗が双方の縮約の**同じ非零固有値**になります。非零固有値の個数を $r$ とすると $r\le\min(d_R,d_B)$ であり、有限確率分布のエントロピー上界 $S\le\ln r$ を適用します。残存系が一次元になれば $r=1$ です。

<!-- proof-start -->
### 証明

定義で確認した $W_k^\dagger W_k=I$ から、$|\Omega_0\rangle$ を出発点とする帰納法により $\langle\Omega_k|\Omega_k\rangle=1$ です。従って $R_kB_k$ 全体の状態は $|\Omega_k\rangle\langle\Omega_k|$ という階数1の射影です。

固定した $k$ について、[QINF17の純粋二部状態の結果](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)を $A=R_k,C=B_k$ に適用します。正規直交 Schmidt ベクトルをそれぞれ $|u_i\rangle_R,|v_i\rangle_B$ とすると、ある $p_i>0$ に対し

$$
|\Omega_k\rangle=\sum_{i=1}^{r}\sqrt{p_i}\,|u_i\rangle_R|v_i\rangle_B,
\qquad
\sum_{i=1}^{r}p_i=1,
\qquad r\le\min\{d_R(k),d_B(k)\}.
$$

$B_k$ の部分トレースでは $\langle v_j|v_i\rangle=\delta_{ij}$ が使えるため

$$
\rho_{R_k}=\sum_{i=1}^{r}p_i|u_i\rangle\langle u_i|,
\qquad
\rho_{B_k}=\sum_{i=1}^{r}p_i|v_i\rangle\langle v_i|.
$$

双方の非零固有値は $p_1,\ldots,p_r$ なので

$$
S(R_k)=S(B_k)=-\sum_{i=1}^{r}p_i\ln p_i.
$$

[QINF17のエントロピー上界](../../../応用系/QINF/QINF17/index.md#thm-qinf17-entropy-bounds)を階数 $r$ の縮約状態に適用すると $-\sum_i p_i\ln p_i\le\ln r$ であり、さらに $r\le\min(d_R,d_B)$ より結論が従います。$d_B(N)=1$ なら $r=1$、$p_1=1$ なので $S(R_N)=0$ です。
<!-- proof-end -->

この式は、[QINF33の可逆全系と縮約エントロピー](../../../応用系/QINF/QINF33/index.md#prop-qinf33-pure-budget)を**ブラックホール情報問題の「放射／残存」の帳簿に適用したもの**です。一般的な Schmidt 理論の別名定理を作ることが目的ではありません。

例えば $d_R=4,d_B=2$ なら $S(R)\le\ln2$ です。しかし $|0\rangle_R|0\rangle_B$ なら $S(R)=0$、$|\Psi\rangle=(|0\rangle_R|0\rangle_B+|1\rangle_R|1\rangle_B)/\sqrt2$ なら $S(R)=\ln2$ です。**次元を与えただけでは曲線上の値も折返し時刻も決まりません。**

なお、[BHI4の地平線エントロピー減少率](../BHI4/index.md#prop-bhi4-horizon-entropy-rate)で扱った $S_{\rm BH}(M)$ は質量と面積から定まる熱力学的量です。今回の $S(B_k)$ は密度行列の精細エントロピー、$\ln d_B(k)$ は状態空間の対数次元です。三者は定義が違います。例えば追加の**有効状態数の仮定** $d_B(k)\le e^{S_{\rm BH}(M_k)}$ を置く模型なら $S(R_k)\le S_{\rm BH}(M_k)$ という上界が導けますが、その次元仮定は本定理や半古典的エネルギー収支から自動的には出ません。

## 4. 新しい放射が出るとき、エントロピーは減ってもよいか

一度放出された古い放射を $R=R_{k-1}$、今回の放射を $b=b_k$ とします。全放射のエントロピーの変化は $S(Rb)-S(R)$ です。古典的な独立標本を追加すればエントロピーは増えますが、量子系では古い放射と新しい放射に**量子相関**があると、増分が負にもなります。

<a id="prop-bhi6-emission-increment"></a>

<!-- formal-statement-start -->
> **命題（放出一歩のエントロピー増分と相関条件）**
>
> 任意の有限次元二部状態 $\rho_{Rb}$ について、[QINF18の量子条件付きエントロピー](../../../応用系/QINF/QINF18/index.md#def-qinf18-conditional)と[量子相互情報量](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)を用いると、増分 $\Delta=S(Rb)-S(R)$ は

$$
\boxed{\Delta=S(b|R)=S(b)-I(R:b)}
$$

> を満たし、必ず

$$
-S(b)\le\Delta\le S(b)\le\ln d_b,\qquad d_b=\dim\mathcal H_b
$$

> である。特に $\Delta<0$ であることと $I(R:b)>S(b)$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

$\Delta$ の二通りの表示は定義式の引き算です。上側はエントロピーの部分加法性、下側は Araki–Lieb 不等式で評価します。**新たな放射に古い放射との相関がある**だけでは減少は決まらず、その相互情報量が $S(b)$ を超える必要があります。

<!-- proof-start -->
### 証明

[量子相互情報量の定義](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)を系 $R,b$ に当てはめると $I(R:b)=S(R)+S(b)-S(Rb)$ です。従って

$$
S(Rb)-S(R)=S(b)-I(R:b)=S(b|R).
$$

[QINF18の部分加法性](../../../応用系/QINF/QINF18/index.md#thm-qinf18-subadditivity)の $S(Rb)\le S(R)+S(b)$ から $\Delta\le S(b)$ が従います。一方、[Araki–Lieb不等式](../../../応用系/QINF/QINF18/index.md#thm-qinf18-araki-lieb)は $S(Rb)\ge|S(R)-S(b)|\ge S(R)-S(b)$ を与えるので $\Delta\ge-S(b)$ です。最後に[QINF17の次元上界](../../../応用系/QINF/QINF17/index.md#thm-qinf17-entropy-bounds)より $S(b)\le\ln d_b$。最初の等式を移項すれば $\Delta<0\iff I(R:b)>S(b)$ です。
<!-- proof-end -->

第2節の二段階放出では、一回目の $b_1$ の縮約は $I_2/2$ で $S(R_1)=\ln2$、二回目の $R_2=b_1b_2$ は Bell 純粋状態で $S(R_2)=0$ です。二回目の放射単独は再び $I_2/2$ なので $S(b_2)=\ln2$。[量子相互情報量](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)は

$$
I(b_1:b_2)=S(b_1)+S(b_2)-S(b_1b_2)=2\ln2,
\quad \Delta_2=\ln2-2\ln2=-\ln2.
$$

これは下限の等号例です。対照的に、確率 $1/2$ で $00$ と $11$ を取る古典相関混合では $S(R)=S(b)=S(Rb)=\ln2$、$I(R:b)=\ln2$ なので $\Delta=0$ です。相関の有無だけでは符号を判断できません。

## 5. 終期まで放射だけで完結するなら、いつか減少が必要

純粋性から $S(R_k)=S(B_k)$ が各時点で成り立つだけでは、エントロピーが単調増加か減少かは決まりません。しかし初期に放射がなく、**終期に残存側が本当に一次元になる**ことまで要求すると、途中で正のエントロピーを持った放射には、後のどこかで減少が必要です。

<a id="thm-bhi6-turnover-necessary"></a>

<!-- formal-statement-start -->
> **定理（残存系消滅の下でのエントロピー減少の必要性）**
>
> [段階的純粋蒸発の有限模型](#def-bhi6-pure-evaporation)で $d_B(N)=1$ とする。ある $1\le j<N$ で $S(R_j)>0$ なら、ある $j<k\le N$ について

$$
S(R_k)-S(R_{k-1})<0
$$

> が成立する。さらに任意の $j<\ell\le N$ に対して $S(R_j)>\ln d_B(\ell)$ なら、段階 $j+1,\ldots,\ell$ のうち少なくとも一段階で放射エントロピーは減少する。
<!-- formal-statement-end -->

### 証明の見取り図

最終値は第3節の定理でゼロと確定しています。ある時点の正の値からゼロへ向かう増分の**総和**が負なら、増分すべてが非負ということはあり得ません。残存次元の上界が途中で小さくなった場合も同じ理屈です。

<!-- proof-start -->
### 証明

[純粋蒸発のエントロピー収支](#thm-bhi6-entropy-budget)に $k=N$、$d_B(N)=1$ を代入すると $S(R_N)=0$ です。各増分 $\Delta_k=S(R_k)-S(R_{k-1})$ の和は途中の項が消えるため

$$
\sum_{k=j+1}^{N}\Delta_k=S(R_N)-S(R_j)=-S(R_j)<0.
$$

全項が非負なら左辺は非負となり矛盾します。よって少なくとも一つの $\Delta_k<0$ が存在します。後半も[次元上界](#thm-bhi6-entropy-budget)から $S(R_\ell)\le\ln d_B(\ell)<S(R_j)$ なので

$$
\sum_{k=j+1}^{\ell}\Delta_k=S(R_\ell)-S(R_j)<0
$$

となり、同じ議論が適用できます。
<!-- proof-end -->

この定理は**折返し点の存在を条件付きで保証するだけ**です。いつ減少が始まるか、曲線が一度だけ頂点を持つか、初期放射が特定の熱状態かは決めません。例えば最初から全放射が純粋な積状態なら $S(R_k)=0$ が全段階で成り立ち、そもそも正の山がありません。ここで Page 曲線という滑らかな形状を仮定するのは早すぎます。後続の BHI7 では典型性と時間依存の有効次元という追加仮定を検討します。

一方、[BHI3の独立対生成](../BHI3/index.md#thm-bhi3-entropy-growth)では、$0<p_j<1$ の各放出について $S(R_k)=\sum_{i=1}^{k}h(p_i)$ と増え続けます。この模型で対の内部相手をすべて残存側に蓄えたまま、しかも終期に $d_B(N)=1$ と要求することはできません。後期に相関を運び出す別の仕組み、残存系の存続、あるいは他の仮定の変更が必要です。**必要条件と物理的機構の導出を混同しない**ことが重要です。

## 6. 何を「全系」と呼んだかで結論は変わる

前節の結論は、初期 $R_0B_0$ が純粋で、各段階で情報が未記録の外部系へ抜けず、終期に放射以外の量子系が残らない場合のものです。[BHI1の蒸発終期の系の分割](../BHI1/index.md#def-bhi1-endpoint-split)では、観測されない系を残す場合と放射だけで完結する場合を分けました。その違いをエントロピー式にします。

<a id="prop-bhi6-hidden-purifier"></a>

<!-- formal-statement-start -->
> **命題（未観測の純粋化系が残る場合の上界の限界）**
>
> 有限次元の $R,B,C$ に純粋状態 $|\Psi\rangle_{RBC}$ があり、$C$ を未観測の系とすると、

$$
S(R)=S(BC)\le\ln(d_Bd_C)
$$

> が成り立つ。しかし一般には $S(R)=S(B)$ や $S(R)\le\ln d_B$ は従わない。特に $d_B=1$ だけでは放射 $R$ の純粋性を結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

[純粋二部系の縮約エントロピーの一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)において、放射の相手は $B$ 単独ではなく $BC$ 全体です。等式と次元上界をこの正しい分割に適用します。

<!-- proof-start -->
### 証明

$R|BC$ は純粋な二部系なので[QINF17の純粋二部状態の結果](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)を適用し、$S(R)=S(BC)$ を得ます。[QINF17の次元上界](../../../応用系/QINF/QINF17/index.md#thm-qinf17-entropy-bounds)と $\dim(\mathcal H_B\otimes\mathcal H_C)=d_Bd_C$ より $S(BC)\le\ln(d_Bd_C)$ です。$S(R)=S(B)$ が一般に成立しないことは、以下の直接例で検証します。
<!-- proof-end -->

**直接例**：$R$ と $C$ を量子ビット、$B$ を一次元として

$$
|\Psi\rangle_{RBC}
=\frac{|0\rangle_R|0\rangle_C+|1\rangle_R|1\rangle_C}{\sqrt2}
\otimes|{\rm vac}\rangle_B
$$

を取ります。部分トレースから $\rho_R=I_2/2$、$\rho_B=|{\rm vac}\rangle\langle{\rm vac}|$、$\rho_C=I_2/2$ なので、$S(R)=\ln2$、$S(B)=0$、$S(BC)=\ln2$ です。**残存ブラックホールを一次元にしただけでは純粋な放射とは限らない**ことが分かります。

また、初期状態が混合なら、初期状態を純粋化する参照系 $C$ を導入し、全純粋系 $CR_kB_k$ について $S(R_k)=S(CB_k)$ と書く必要があります。初期混合性を隠したまま $S(R_k)=S(B_k)$ とすることも許されません。物理的な孤立・残骸・参照系の意味は、有限次元の計算だけでは確定しません。

## 7. 三つのエントロピーを同じ記号にしない

| 量 | 何を入力として計算するか | 本講で証明したこと |
|---|---|---|
| 放射の精細エントロピー $S(R_k)$ | 放射全体の $\rho_{R_k}$ | 全系が純粋なら $S(B_k)$ と一致。残存次元で上から抑えられる |
| 残存系の精細エントロピー $S(B_k)$ | 残存全自由度の $\rho_{B_k}$ | $R_kB_k$ が純粋のときだけ $S(R_k)$ と一致 |
| 局所粗視化エントロピー $S_{\rm loc}^{\rm coarse}(R_k)$ | 各放射モードの周辺密度行列 | [局所粗視化と相関欠損の恒等式](../BHI5/index.md#thm-bhi5-correlation-gap)から $S_{\rm loc}^{\rm coarse}(R_k)\ge S(R_k)$ |
| 地平線の熱力学的エントロピー $S_{\rm BH}$ | 幾何学的な面積・質量 | [BHI4の質量変化に伴う減少](../BHI4/index.md#prop-bhi4-horizon-entropy-rate)は使えるが、$S(B_k)$ と自動的に同じではない |

たとえば第2節の Bell 放出が終わると、**各放射モード**は依然として最大混合で、$S_{\rm loc}^{\rm coarse}(R_2)=2\ln2$ です。しかし二モードの**全放射**は純粋で $S(R_2)=0$ です。「熱的な局所観測」と「ユニタリな全体」は矛盾しません。何が相関として隠れているかを追う必要があります。

## 8. 演習と詳細解答

### Level A：縮約・次元上界・減少判定

<a id="ex-bhi6-a01"></a>
#### BHI6-A01 非等重みの純粋二部状態
- Level: A

$\mathcal H_R=\mathbb C^2$、$\mathcal H_B=\mathbb C^3$ とし、$|\psi\rangle=\sqrt{3/4}|0\rangle_R|0\rangle_B+\sqrt{1/4}|1\rangle_R|1\rangle_B$ とする。$\rho_R,\rho_B$ の非零固有値、両エントロピー、上界の成立を確認せよ。

<!-- solution-start -->
**詳細解答**

$R$ の計算基底を $|0\rangle,|1\rangle$、$B$ の正規直交基底を $|0\rangle,|1\rangle,|2\rangle$ とします。[部分トレースの定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)で $B$ の交差項を取ると $\langle0|1\rangle_B=0$ のため消えます。$R$ についても同様に縮約して

$$
\begin{aligned}
\rho_R&=\frac34|0\rangle\langle0|+\frac14|1\rangle\langle1|
      =\operatorname{diag}(3/4,1/4),\\
\rho_B&=\frac34|0\rangle\langle0|+\frac14|1\rangle\langle1|
      =\operatorname{diag}(3/4,1/4,0)
\end{aligned}
$$

を得ます。右端の対角行列はそれぞれ指定した基底での表示であり、対角成分がそのまま固有値です。[純粋二部系のエントロピー一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)に従い

$$
S(R)=S(B)=-\frac34\ln\frac34-\frac14\ln\frac14=:h(1/4).
$$

[本講の上界](#thm-bhi6-entropy-budget)は $\ln\min(2,3)=\ln2$。重み $(3/4,1/4)$ は均等でないため、[エントロピー上界の等号条件](../../../応用系/QINF/QINF17/index.md#thm-qinf17-entropy-bounds)より $h(1/4)<\ln2$ です。
<!-- solution-end -->

<a id="ex-bhi6-a02"></a>
#### BHI6-A02 終期に必要な条件
- Level: A

全系 $RB$ が純粋で $\dim B=1$ のとき、$\rho_R$ が純粋であることを示せ。逆に $\dim B=2$ であっても $\rho_R$ が純粋である例を作れ。

<!-- solution-start -->
**詳細解答**

[次元上界](#thm-bhi6-entropy-budget)を純粋二部系 $R|B$ に適用すると、$d_B=1$ なので

$$
0\le S(R)\le\ln\min(d_R,1)=0
$$

です。従って $S(R)=0$ であり、[エントロピーの等号条件](../../../応用系/QINF/QINF17/index.md#thm-qinf17-entropy-bounds)から $\rho_R$ の非零固有値は $1$ だけ、すなわち純粋です。

逆向きは成り立ちません。$R,B$ をともに量子ビットとして

$$
|\psi\rangle
=|0\rangle_R\otimes
\frac{|0\rangle_B+|1\rangle_B}{\sqrt2}
$$

と取ると、$B$ は二次元でも積状態の部分トレースにより $\rho_R=|0\rangle\langle0|$、$S(R)=0$ です。
<!-- solution-end -->

<a id="ex-bhi6-a03"></a>
#### BHI6-A03 Bell対の情報移送
- Level: A

第2節の二段階放出で、各時点 $k=0,1,2$ の $S(R_k)$ と $S(B_k)$ を求め、$k=2$ の増分を計算せよ。

<!-- solution-start -->
**詳細解答**

$R_0$ は一次元のため $S(R_0)=0$、純粋初期状態なので $S(B_0)=0$ です。一回目は Bell 対の片側がそれぞれ $\rho_{R_1}=\rho_{B_1}=I_2/2$ となり、各固有値は $(1/2,1/2)$、従って $S(R_1)=S(B_1)=\ln2$。二回目は $R_2$ が Bell 純粋状態、$B_2$ は一次元なので両エントロピーは $0$ です。ゆえに

$$
\Delta_2=S(R_2)-S(R_1)=0-\ln2=-\ln2.
$$

これは[放出一歩の増分公式](#prop-bhi6-emission-increment)の量子相関による減少の直接例です。
<!-- solution-end -->

<a id="ex-bhi6-a04"></a>
#### BHI6-A04 片側の次元による上限
- Level: A

$d_R=8,d_B=3$ の純粋二部状態について $S(R)$ の最大値を求め、達成する具体的な状態を書け。

<!-- solution-start -->
**詳細解答**

[エントロピー次元上界](#thm-bhi6-entropy-budget)より $S(R)\le\ln\min(8,3)=\ln3$ です。三つずつの正規直交基底を選び $|\psi\rangle=(|0,0\rangle+|1,1\rangle+|2,2\rangle)/\sqrt3$ とすると、部分トレースで $\rho_R=\frac13\sum_{i=0}^{2}|i\rangle\langle i|$ が得られます。非零固有値三個はすべて $1/3$ なので $S(R)=-3(1/3)\ln(1/3)=\ln3$ となり、上界が達成されます。
<!-- solution-end -->

<a id="ex-bhi6-a05"></a>
#### BHI6-A05 相関があっても減少しない例
- Level: A

$\rho_{Rb}=(|00\rangle\langle00|+|11\rangle\langle11|)/2$ とする。$S(R),S(b),S(Rb),I(R:b)$ および $\Delta$ を計算せよ。

<!-- solution-start -->
**詳細解答**

$\rho_R=\rho_b=I_2/2$ なので $S(R)=S(b)=\ln2$。$\rho_{Rb}$ の固有値は $(1/2,1/2,0,0)$ なので $S(Rb)=\ln2$ です。[量子相互情報量の定義](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)から $I(R:b)=\ln2+\ln2-\ln2=\ln2$、従って[増分公式](#prop-bhi6-emission-increment)より $\Delta=S(b)-I(R:b)=0$。相互情報量が正でも $I(R:b)>S(b)$ でなければ減少しません。
<!-- solution-end -->

### Level B：不等式と仮定の限界

<a id="ex-bhi6-b01"></a>
#### BHI6-B01 一放出の増分の両側評価
- Level: B

任意の有限次元 $\rho_{Rb}$ について $-S(b)\le S(Rb)-S(R)\le S(b)$ を示せ。$b$ が量子ビットの場合の絶対値上界を与え、上下端それぞれの等号例を書け。

<!-- solution-start -->
**詳細解答**

[部分加法性](../../../応用系/QINF/QINF18/index.md#thm-qinf18-subadditivity)を $R,b$ に適用すると、$S(Rb)\le S(R)+S(b)$ です。$S(R)$ を右辺から引くと $\Delta\le S(b)$ を得ます。

一方、[Araki–Lieb不等式](../../../応用系/QINF/QINF18/index.md#thm-qinf18-araki-lieb)は $S(Rb)\ge|S(R)-S(b)|\ge S(R)-S(b)$ を与えるので、$\Delta\ge-S(b)$ です。量子ビットの[次元上界](../../../応用系/QINF/QINF17/index.md#thm-qinf17-entropy-bounds)から $S(b)\le\ln2$、従って $|\Delta|\le\ln2$。

上端の等号例には $\rho_{Rb}=\rho_R\otimes I_2/2$ を取ります。[テンソル積加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)より $\Delta=\ln2=S(b)$ です。下端の等号例は Bell 純粋状態です。この場合、$S(R)=S(b)=\ln2$ かつ $S(Rb)=0$ なので $\Delta=-\ln2=-S(b)$ です。
<!-- solution-end -->

<a id="ex-bhi6-b02"></a>
#### BHI6-B02 二種類の次元上界を折れ線で比較
- Level: B

$N=4$、$d_R(k)=2^k$、$d_B(k)=2^{4-k}$（$k=0,\ldots,4$）とする。$S(R_k)$ の上界を各段階で列挙せよ。$k=2$ でその上界を達成する状態を構成し、この上界から実際の全履歴が一意に決まるか論じよ。

<!-- solution-start -->
**詳細解答**

[本講の次元上界](#thm-bhi6-entropy-budget)に代入すると

$$
S(R_k)\le\ln\min(2^k,2^{4-k})=\min(k,4-k)\ln2.
$$

$k=0,1,2,3,4$ の順に上界は

$$
(0,\ln2,2\ln2,\ln2,0)
$$

です。$k=2$ では $R_2=r_1r_2$、$B_2=c_1c_2$ として、二つの Bell 対の積

$$
|\psi\rangle
=|\Phi^+\rangle_{r_1c_1}\otimes|\Phi^+\rangle_{r_2c_2}
$$

を取ります。各 Bell 対の残存側を部分トレースすると放射側は $I_2/2$ となり、[テンソル積状態の縮約](../../../応用系/QINF/QINF3/index.md#prop-qinf3-state-product)から

$$
\rho_{R_2}=(I_2/2)\otimes(I_2/2)=I_4/4,
\qquad S(R_2)=\ln4=2\ln2
$$

です。一方、すべての量子ビットを純粋な積状態で順次取り出す等長過程では、全段階で $S(R_k)=0$ となります。上界の列は同じでも、実際の履歴は一意ではありません。上界の折れ線をそのまま予言された Page 曲線とは呼べません。
<!-- solution-end -->

<a id="ex-bhi6-b03"></a>
#### BHI6-B03 混合初期状態と参照系
- Level: B

初期系 $B_0$ が $\rho_{B_0}=I_2/2$ であり、等長写像が $|0\rangle_{B_0}\mapsto|0\rangle_R|0\rangle_B$、$|1\rangle_{B_0}\mapsto|1\rangle_R|0\rangle_B$ と作用するとする。出力の $S(R)$ と $S(B)$ を求めよ。参照量子ビット $C$ で初期状態を純粋化して正しい等エントロピー式を示せ。

<!-- solution-start -->
**詳細解答**

指定された二つの像は正規直交なので写像 $W$ は等長です。密度演算子の発展は $W\rho_{B_0}W^\dagger$ であり、基底表示 $\rho_{B_0}=(|0\rangle\langle0|+|1\rangle\langle1|)/2$ を代入すると

$$
\begin{aligned}
\rho_{RB}
&=W\rho_{B_0}W^\dagger\\
&=\frac12|00\rangle\langle00|+\frac12|10\rangle\langle10|\\
&=(I_2/2)_R\otimes|0\rangle\langle0|_B.
\end{aligned}
$$

部分トレースで $R$ 側の固有値は $(1/2,1/2)$、$B$ 側は $(1,0)$ と分かるので $S(R)=\ln2$、$S(B)=0$ です。純粋二部系だけに適用できる $S(R)=S(B)$ を使うと誤ります。

初期 $CB_0$ を $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ に純粋化します。$B_0$ だけに写像を作用させると

$$
|\Psi\rangle_{CRB}=\frac{|0\rangle_C|0\rangle_R+|1\rangle_C|1\rangle_R}{\sqrt2}\otimes|0\rangle_B.
$$

$\rho_{CB}=(I_2/2)_C\otimes|0\rangle\langle0|_B$ より $S(CB)=\ln2$、[未観測系を含む命題](#prop-bhi6-hidden-purifier)の正しい式 $S(R)=S(CB)$ が成り立ちます。
<!-- solution-end -->

<a id="ex-bhi6-b04"></a>
#### BHI6-B04 独立対生成を終期まで続けると
- Level: B

二回の独立対生成で $p_1=p_2=1/2$ とする。外部モード $O_1,O_2$ の精細エントロピーと局所粗視化エントロピーを求めよ。終期に放射だけが残る純粋蒸発の仮定と何が衝突するか述べよ。

<!-- solution-start -->
**詳細解答**

[独立対生成の結果](../BHI3/index.md#thm-bhi3-entropy-growth)より $\rho_{O_1O_2}=(I_2/2)\otimes(I_2/2)=I_4/4$ です。従って精細エントロピーは $\ln4=2\ln2$。[局所周辺状態に基づく粗視化エントロピーの定義](../BHI5/index.md#def-bhi5-local-coarse)から粗視化エントロピーも $S(O_1)+S(O_2)=2\ln2$ です。

一方、[終期の純粋性制約](#thm-bhi6-entropy-budget)は放射以外の残存系が一次元なら $S(R_N)=0$ と要求します。$2\ln2>0$ なのでこの二つは両立しません。独立対生成を行った時点では内部相手 $I_1I_2$ にエントロピーが残り、それを**どこにも運び出さないまま残存系を消してしまう**という操作が追加の非等長な情報消去です。終期の仮定を捨てるか、後期放射に相関を載せるなど対生成の独立性を変える必要があります。
<!-- solution-end -->

### Level C：三段階の放出を一つの状態で追う

<a id="ex-bhi6-c01"></a>
#### BHI6-C01 過去の放射との相関が作る減少と粗視化の差
- Level: C

初期残存系 $B_0=ABC$ を三量子ビットとし、$|\chi\rangle_{ABC}=(|00\rangle_{AB}+|11\rangle_{AB})|0\rangle_C/\sqrt2$ とする。段階 $1,2,3$ で $A,B,C$ を順に新しい放射 $b_1,b_2,b_3$ として取り出し、残存系はそれ以外の未放出量子ビットとする。

- (1) 各放出写像が等長であることを説明し、$d_B(k)$ と $S(R_k)$ を $k=0,1,2,3$ で求めよ。
- (2) $k=2$ の増分と $I(b_1:b_2)$ を計算せよ。
- (3) $R_2$ の精細エントロピーと単一モード周辺に基づく局所粗視化エントロピーの差を計算し、終期の純粋性と矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答**

(1) $a,b,c\in\{0,1\}$ とすると、各放出は未放出量子ビットの計算基底を次のように写す線形写像です。最後の $|{\rm vac}\rangle$ は一次元残存系の規格化基底です。

$$
\begin{aligned}
W_1|abc\rangle_{ABC}&=|a\rangle_{b_1}|bc\rangle_{B_1},\\
W_2|bc\rangle_{B_1}&=|b\rangle_{b_2}|c\rangle_{B_2},\\
W_3|c\rangle_{B_2}&=|c\rangle_{b_3}|{\rm vac}\rangle_{B_3}.
\end{aligned}
$$

各写像では異なる計算基底ベクトルの像が正規直交し、同じ像のノルムは1です。第2節の基底展開と同じ計算で任意の入力 $x,y$ に対し $\langle W_kx,W_ky\rangle=\langle x,y\rangle$ となり、各 $W_k^\dagger W_k=I_{B_{k-1}}$ です。$B_k$ は未放出量子ビット $3-k$ 個なので、$k=0,1,2,3$ に対応する次元は $d_B(k)=(8,4,2,1)$ です。

$k=0$ では放射 $R_0$ は一次元の自明系なので $S(R_0)=0$ です。

$k=1$ では $R_1=A$ です。初期の Bell 対から $BC$ を部分トレースすると、$\langle0|1\rangle_B=0$ により交差項が消え、

$$
\rho_{R_1}=\frac12|0\rangle\langle0|+\frac12|1\rangle\langle1|
=I_2/2,\qquad S(R_1)=\ln2
$$

となります。$k=2$ では $R_2=AB$ が規格化された Bell 純粋状態なので $S(R_2)=0$、$k=3$ では $R_3=ABC$ が初期と同じ純粋状態の全量子ビットなので $S(R_3)=0$ です。従って系列は

$$
(S(R_0),S(R_1),S(R_2),S(R_3))=(0,\ln2,0,0).
$$

[純粋蒸発模型のエントロピー収支と残存次元上界](#thm-bhi6-entropy-budget)により各 $S(B_k)$ も同じ系列です。特に途中の $B_2=C$ は一次元ではありませんが、純粋な $|0\rangle_C$ なので $S(B_2)=0$ です。

(2) 二回目の増分は $\Delta_2=0-\ln2=-\ln2$。$\rho_{b_1}=\rho_{b_2}=I_2/2$ で $S(b_1b_2)=0$ なので、[相互情報量の定義](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)から

$$
I(b_1:b_2)=\ln2+\ln2-0=2\ln2.
$$

[増分恒等式](#prop-bhi6-emission-increment)を直接確かめると $S(b_2)-I(b_1:b_2)=\ln2-2\ln2=-\ln2$ です。

(3) $R_2=b_1b_2$ の精細エントロピーは $0$、各周辺状態は $I_2/2$ です。[局所周辺状態に基づく粗視化エントロピーの定義](../BHI5/index.md#def-bhi5-local-coarse)から

$$
S_{\rm loc}^{\rm coarse}(R_2)
=S(b_1)+S(b_2)=2\ln2
$$

となります。[局所粗視化と相関欠損の恒等式](../BHI5/index.md#thm-bhi5-correlation-gap)を二モードの場合に適用すると、

$$
\Delta_{\rm corr}
=S_{\rm loc}^{\rm coarse}(R_2)-S(R_2)
=2\ln2=I(b_1:b_2).
$$

各モードは単独では混合状態ですが、二モード全体は量子相関を持つ純粋状態なので、終期の全放射の純粋性と矛盾しません。
<!-- solution-end -->

## 9. まとめと次の問い

- 純粋初期状態、等長な全発展、放射／残存以外の系がないという有限模型では、**どの時点でも** $S(R_k)=S(B_k)\le\ln d_B(k)$ です。
- 終期に残存系が一次元になり、途中の放射に正の精細エントロピーがあれば、放射エントロピーはその後の少なくとも一段階で減らなければなりません。
- 減少の条件は $I(R_{k-1}:b_k)>S(b_k)$ です。局所的に熱的な放射と全体の純粋性は両立します。
- ただし、**ユニタリ性だけでは Page 曲線の形・最大位置・物理的な放出速度は定まりません**。初期混合性、残骸、未観測系、実在の重力分割は前提を変えます。

次の **BHI7「Page曲線の物理的意味」** では、有限次元の典型状態に対する結果を蒸発の時間履歴へどう翻訳するかを、ランダム性と有効次元の追加仮定を明示して扱います。
