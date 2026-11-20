# BHI10 AMPSのエンタングルメント矛盾

<!-- definition-example-audit: strict -->

## 1. 古いブラックホールで何が衝突するのか

[BHI6のユニタリ蒸発の必要条件](../BHI6/index.md#thm-bhi6-turnover-necessary)は、純粋な初期状態から最後に放射だけが残るなら、増えた精細エントロピーがいずれ減少しなければならないことを述べます。一方、[BHI9のsmall-corrections下界](../BHI9/index.md#thm-bhi9-small-corrections)は、内外の新しい対がほぼ純粋なら、古い放射を保持する一歩で放射エントロピーが増えることを示しました。

AMPS（Almheiri–Marolf–Polchinski–Sully）の問いは、この衝突を**古いブラックホールの後期外部モード一個**に絞ると何が起こるか、というものです。純粋化を要求する早期放射との相関と、滑らかな地平線を表す内部との真空相関は、同じ後期モードに同時に存在できるでしょうか。

本講の数学的主張は有限次元模型についての条件付き定理です。実際の量子場の局所代数、重力の制約、観測者が情報を取り出す手順は、そのままこの有限次元テンソル積から結論しません。そこを区別したうえで、AMPSの矛盾を成り立たせる仮定を式で特定します。

## 2. 三つの系と二つのエントロピー要請

同一の放出段階で、$R$ を**すでに遠方へ出た早期放射**、$b$ を**今回外へ出る後期モード**、$c=\tilde b$ を**その地平線内側の相手**とします。$c$ 以外に残るブラックホール自由度を $D$ と書きます。以下では $\mathcal H_R\otimes\mathcal H_b\otimes\mathcal H_c\otimes\mathcal H_D$ を分割として仮定し、$\rho_{Rbc}$ は全状態から $D$ を[部分トレース](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)した状態です。$XY$ は部分系 $X,Y$ を合わせた系、$\rho_X$ はそれ以外の系をトレースして得た縮約密度演算子を表します。$R,b,c$ は互いに**別々の**部分系であり、同じ自由度を重複計上しません。

エントロピーは $\displaystyle S(X)=-\operatorname{Tr}\rho_X\ln\rho_X$（nat、$0\ln0=0$）。[QINF17のvon Neumannエントロピー](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)の底2表記を $\ln2$ 倍したものです。$S(X|Y)=S(XY)-S(Y)$ は[QINF18の条件付きエントロピー](../../../応用系/QINF/QINF18/index.md#def-qinf18-conditional)です。本講では $b,c$ を各qubitとし、必要な箇所で任意の有限次元へ拡張します。

考える二つの数を先に導入します。

- **放射の減少量** $\delta:=S(R)-S(Rb)=-S(b|R)$。$\delta>0$ は、この一歩で全放射の精細エントロピーが減ったことです。
- **内外の条件付きエントロピー** $S(b|c)=S(bc)-S(c)$。$bc$ が純粋Bell対なら $S(bc)=0$、$S(c)=\ln2$ なので $S(b|c)=-\ln2$ です。

ここで $\delta>0$ を「ユニタリならすべての後期モードについて自動的に成立する」とは仮定しません。実際の議論には、選んだ後期モードでの負の増分、または後述する減少区間に関する仮定が必要です。滑らかな地平線を有限模型に翻訳するときも、外部モード $b$ が単独で熱的であること**だけ**ではなく、$bc$ の共同状態がほぼ純粋であることを要求します。

<a id="def-bhi10-amps-conditions"></a>

<!-- formal-statement-start -->
> **定義（AMPS三部系の二つの要請）**
>
> 有限次元状態 $\rho_{Rbc}$ で $\dim\mathcal H_b=\dim\mathcal H_c=2$ とする。$\gamma>0$、$\varepsilon_{\rm pair},\varepsilon_{\rm in}\ge0$ を固定する。この一歩で以下の要請を課す。
>
> **（U）後期放射の減少：**

$$
S(Rb)-S(R)\le-\gamma.
$$

> **（H）内外の近真空対：**

$$
S(bc)\le\varepsilon_{\rm pair},
\qquad
S(c)\ge\ln2-\varepsilon_{\rm in}.
$$

> （U）は選んだ一歩の精細エントロピーの減少条件、（H）は内外対の共同エントロピーと内部側のエントロピーによる近真空条件である。独立な部分系 $R,b,c$ が存在し、同じ $\rho_{Rbc}$ に両条件を適用できることは、定義とは別の模型仮定とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi10-amps-conditions -->
**定義の確認**：$\lvert\Phi\rangle_{bc}=(\lvert00\rangle+\lvert11\rangle)/\sqrt2$ を規格化されたBell状態ベクトルとし、その階数1射影を $\Phi_{bc}:=\lvert\Phi\rangle\langle\Phi\rvert_{bc}$ と書きます。ここで $\Phi_{bc}$ はベクトルではなく密度演算子です。$\rho_{Rbc}=\rho_R\otimes\Phi_{bc}$ を取ると、$bc$ の固有値は $(1,0,0,0)$ で $S(bc)=0$ です。計算基底の直交性 $\langle0|1\rangle=0$ を使い、$b$ を部分トレースすると

$
\rho_c=\operatorname{Tr}_b\Phi_{bc}
=\tfrac12\bigl(\lvert0\rangle\langle0\rvert
+\lvert1\rangle\langle1\rvert\bigr)=I_2/2.
$

その固有値は $(1/2,1/2)$ で $S(c)=\ln2$。したがって（H）は両誤差0で成立します。同じ計算で $\rho_b=I_2/2$ なので $\rho_{Rb}=\rho_R\otimes I_2/2$ です。$Rb$ の固有値は $\rho_R$ の各固有値を半分ずつ二度並べたものとなり、[テンソル積状態のエントロピー加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)により

$$
S(Rb)=S(R)+\ln2,\qquad
S(b|R)=\ln2>0.
$$

（U）は任意の $\gamma>0$ に対して成立しません。これは条件を計算で判定した例であって、まだ一般不可能性の証明ではありません。
<!-- definition-example-end -->

## 3. AMPSの不等式：二つの負の条件付きエントロピーは両立しない

直感は「$b$ は早期放射と内部の両方で純粋化できない」というものです。ただし一般の混合状態では、直感だけで量的な下界を得ることはできません。[QINF19の強劣加法性](../../../応用系/QINF/QINF19/index.md#thm-qinf19-ssa)を今回の部分系へ具体的に代入します。

<a id="thm-bhi10-amps-tradeoff"></a>

<!-- formal-statement-start -->
> **定理（AMPSの三部エントロピー制約）**
>
> 有限次元三部状態 $\rho_{Rbc}$ について、部分系 $R,b,c$ が独立に因数分解されるとする。このとき

$$
S(b|R)+S(b|c)\ge0.
$$

> とくに $b,c$ がqubitで、[AMPS三部系の要請](#def-bhi10-amps-conditions)（U）と（H）をともに満たすなら、必ず

$$
\boxed{\ \gamma+\ln2\le
\varepsilon_{\rm pair}+\varepsilon_{\rm in}\ }
$$

> が成り立つ。したがって右辺が $\ln2+\gamma$ 未満なら、（U）と（H）を満たす状態は存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

三部状態を $D'$ で純粋化し、強劣加法性に $A=b,B=R,C=D'$ を代入します。純粋な全体系では $RD'$ と $bc$、$RbD'$ と $c$ のエントロピーが一致します。これによって、二つの条件付きエントロピーの和の非負性が出ます。最後に（U）（H）の数値を代入します。

<!-- proof-start -->
### 証明

$\rho_{Rbc}$ の任意の純粋化 $\lvert\Psi\rangle_{RbcD'}$ を取ります。有限次元なので、$\rho_{Rbc}$ のスペクトル分解に各固有ベクトルと直交した補助系のベクトルを対応させれば構成できます。

[QINF17の純粋二部系のエントロピー一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)を、純粋な全体の二つの分割 $RD'|bc$ と $RbD'|c$ に適用して

$$
S(RD')=S(bc),\qquad S(RbD')=S(c)
$$

を得ます。次に[強劣加法性](../../../応用系/QINF/QINF19/index.md#thm-qinf19-ssa)の $S(AB)+S(BC)\ge S(B)+S(ABC)$ に $A=b,B=R,C=D'$ を代入します。

$$
S(Rb)+S(RD')\ge S(R)+S(RbD').
$$

上の相補エントロピー一致を代入すると

$$
S(Rb)+S(bc)\ge S(R)+S(c).
$$

移項し、二つの差を条件付きエントロピーとして書けば

$$
\underbrace{S(Rb)-S(R)}_{S(b|R)}
+\underbrace{S(bc)-S(c)}_{S(b|c)}\ge0.
$$

この段階には $\rho_{Rbc}$ が純粋という仮定はありません。（U）より第1項は $-\gamma$ 以下、（H）より第2項は $\varepsilon_{\rm pair}-(\ln2-\varepsilon_{\rm in})$ 以下です。そこで

$$
0\le S(b|R)+S(b|c)
\le-\gamma+\varepsilon_{\rm pair}-\ln2+\varepsilon_{\rm in}.
$$

最後の右辺が非負である必要があるため、主張の $\gamma+\ln2\le\varepsilon_{\rm pair}+\varepsilon_{\rm in}$ が出ます。
<!-- proof-end -->

この不等式の数学的核は[BHI9の弱単調性](../BHI9/index.md#lem-bhi9-weak-monotonicity)と同じです。新しい論点は、**後期放射の負の条件付きエントロピー**と**滑らかな地平線の内外相関**を同じ一歩に要求したとき、どの仮定が衝突するかを切り分ける点にあります。

両誤差を $\varepsilon$ 以下とすれば $2\varepsilon\ge\ln2+\gamma$ が必要です。たとえば $\gamma=0.10$ nat なら $\varepsilon\ge(\ln2+0.10)/2\simeq0.3966$ nat。したがって「小さい補正で済む」という言明には、エントロピーで測った補正の大きさを指定する必要があります。

## 4. 相関を直接測ると何が見えるか

$R,b,c$ に量子相互情報量 $I(X:Y):=S(X)+S(Y)-S(XY)$ を導入します。これは[QINF18の量子相互情報量](../../../応用系/QINF/QINF18/index.md#def-qinf18-mutual)です。先ほどの条件付きエントロピーは

$$
S(b|R)=S(b)-I(R:b),\qquad
S(b|c)=S(b)-I(c:b)
$$

なので、[AMPSの三部制約](#thm-bhi10-amps-tradeoff)を代入し直すと

$$
\boxed{I(R:b)+I(c:b)\le2S(b)}
$$

となります。これは「どちらとの相関もゼロ」という意味ではなく、**相関の和に上限がある**という主張です。$b$ がqubitなら $S(b)\le\ln2$ なので上限は $2\ln2$ です。

完全なBell対 $bc$ では $S(b)=S(c)=\ln2,S(bc)=0$ より $I(c:b)=2\ln2$ です。よって $I(R:b)\le0$。相互情報量の非負性と合わせて $I(R:b)=0$ が強制されます。これに対し、（U）なら

$$
I(R:b)=S(b)-S(b|R)\ge S(b)+\gamma.
$$

$S(b)$ に近い量より大きな早期放射との相関を要求するわけです。**熱的な局所状態** $S(b)\simeq\ln2$ だけを知っても、どちらの相手と相関するかは定まりません。

### 三つの純粋状態を比較する

以下はいずれも $R,b,c$ がqubitで、同じ $S(b)=\ln2$ を持ちます。

| 状態 | $S(b|R)$ | $S(b|c)$ | 一歩の帰結 |
| --- | ---: | ---: | --- |
| $\lvert0\rangle_R\otimes\lvert\Phi\rangle_{bc}$ | $+\ln2$ | $-\ln2$ | 内外は純粋対、放射は増える |
| $\lvert\Phi\rangle_{Rb}\otimes\lvert0\rangle_c$ | $-\ln2$ | $+\ln2$ | 放射は減る、内外の純粋対は失われる |
| $(\lvert000\rangle+\lvert111\rangle)_{Rbc}/\sqrt2$ | $0$ | $0$ | いずれも厳密な負ではない |

最後のGHZ状態では $\rho_R,\rho_c,\rho_{Rb},\rho_{bc}$ はそれぞれ非零固有値 $1/2,1/2$ を持つので、二つの差はいずれも0です。局所的に最大混合な $b$ を見ただけでは、この3状態を判別できません。

## 5. 「純粋な内外対」のさらに強い帰結

<a id="prop-bhi10-exact-pair-decoupling"></a>

<!-- formal-statement-start -->
> **命題（純粋な内外対は早期放射から分離する）**
>
> 有限次元状態 $\rho_{Rbc}$ の縮約 $\rho_{bc}$ が純粋状態 $\lvert\psi\rangle\langle\psi\rvert_{bc}$ なら、ある密度演算子 $\rho_R$ について

$$
\rho_{Rbc}=\rho_R\otimes
\lvert\psi\rangle\langle\psi\rvert_{bc}.
$$

> 特に $bc$ が最大もつれの二qubit Bell対なら、$I(R:b)=0$、$S(b|R)=\ln2$ であり、一歩の放射エントロピーは減らない。
<!-- formal-statement-end -->

### 証明の見取り図

$\rho_{bc}$ の純粋性が、全状態の $bc$ 側に一つの状態しか許さないことを使います。一般の三部密度演算子にも、純粋な縮約を持つ場合の因数分解が成立します。

<!-- proof-start -->
### 証明

$P=\lvert\psi\rangle\langle\psi\rvert_{bc}$、$Q=I_{bc}-P$ と置きます。$\rho_{bc}=P$ なので

$$
\operatorname{Tr}[\rho_{Rbc}(I_R\otimes Q)]
=\operatorname{Tr}(\rho_{bc}Q)=0.
$$

$\rho_{Rbc}$ は半正定値で、$I_R\otimes Q$ は直交射影です。このため先ほどのトレースは

$
\operatorname{Tr}\!\left[(\rho_{Rbc}^{1/2}(I_R\otimes Q))^\dagger
(\rho_{Rbc}^{1/2}(I_R\otimes Q))\right]=0
$

とも書けます。左辺は非負な平方ノルムの和なので、$\rho_{Rbc}^{1/2}(I_R\otimes Q)=0$ です。随伴を取って逆順の積も0と分かり、支持が $I_R\otimes P$ 側だけにあるため、

$$
\rho_{Rbc}
=(I_R\otimes P)\rho_{Rbc}(I_R\otimes P)
$$

を意味します。$P$ は階数1ですから右辺は $\sigma_R\otimes P$ と書けます。両辺の部分トレースを取ると $\sigma_R=\rho_R$ で、因数分解が従います。

Bell対の場合には $\rho_b=I_2/2$ なので、[積状態のエントロピー加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)から $S(Rb)=S(R)+\ln2$。また $I(R:b)=S(R)+S(b)-S(Rb)=0$ です。
<!-- proof-end -->

[BHI3の純粋対の因数分解](../BHI3/index.md#prop-bhi3-pure-pair-rigidity)と同じ性質を、今回の三部系に書き直しました。近似的に純粋な場合には厳密な因数分解は使えず、第3節の誤差付き評価が必要です。

## 6. Page曲線の折り返しは、どの一歩に効くのか

[BHI7のPage曲線の解釈](../BHI7/index.md)が教えるのは、全放射の精細エントロピーが後半で減少し得るという全体像です。「すべての後期 $b$ が $R$ とBell対」という個別モードについての断定は、そこからは出ません。

<a id="prop-bhi10-negative-step"></a>

<!-- formal-statement-start -->
> **命題（放射エントロピー減少区間には負の一歩がある）**
>
> 有限回の放出で $R_k=R_{k-1}b_k$ とし、各 $k=1,\ldots,N$ の放出前後で古い放射 $R_{k-1}$ の縮約状態が一致するとする。もし

$$
S(R_N)<S(R_0)
$$

> なら、ある $k\in\{1,\ldots,N\}$ で

$$
S(b_k|R_{k-1})<0
$$

> となる。すべての一歩でこれが負になる、という結論ではない。
<!-- formal-statement-end -->

### 証明の見取り図

放射エントロピーの増分を足すと中間項が相殺されます。総和が負なら、全項が非負ということはありません。

<!-- proof-start -->
### 証明

各 $k$ で[条件付きエントロピーの定義](../../../応用系/QINF/QINF18/index.md#def-qinf18-conditional)を $X=b_k,Y=R_{k-1}$ に適用すると

$$
S(b_k|R_{k-1})=S(R_k)-S(R_{k-1}).
$$

古い放射が同じ状態として保持されるので、これらを共通の数列 $S(R_k)$ の差として比較できます。$k=1$ から $N$ まで足せば

$$
\sum_{k=1}^N S(b_k|R_{k-1})
=\sum_{k=1}^N\bigl[S(R_k)-S(R_{k-1})\bigr]
=S(R_N)-S(R_0)<0.
$$

すべての項が0以上なら左辺は0以上となり矛盾するため、少なくとも一つは負です。
<!-- proof-end -->

この一歩 $k$ について**同時に**（H）の近真空対が成立すると主張するなら、第3節の制約がかかります。例えば全放出段階で $(\varepsilon_{\rm pair}+\varepsilon_{\rm in})<\ln2$ を保つ模型では、[AMPS制約](#thm-bhi10-amps-tradeoff)から各一歩の増分が非負となり、減少区間そのものが存在できません。

## 7. 量的な境界を実際に計算する

近真空対と早期放射の相関を同時に持つ、非自明な状態を一つ作ります。$0\le p\le1$ として、直交するBell状態

$$
\lvert\Phi\rangle_{bc}
=\frac{\lvert00\rangle+\lvert11\rangle}{\sqrt2},
\qquad
\lvert\Psi^+\rangle_{bc}
=\frac{\lvert01\rangle+\lvert10\rangle}{\sqrt2}
$$

を使います。ここでも $\Psi^+_{bc}:=\lvert\Psi^+\rangle\langle\Psi^+\rvert_{bc}$ は射影密度演算子を表し、$\Phi_{bc}$ と区別します。これらの状態ベクトルを用いて

$
\lvert\Omega_p\rangle_{Rbc}
=\sqrt{1-p}\lvert0\rangle_R\lvert\Phi\rangle_{bc}
+\sqrt p\lvert1\rangle_R\lvert\Psi^+\rangle_{bc}
$$

と置きます。両項は直交するので規格化されています。$R$ をトレースすると

$$
\rho_{bc}=(1-p)\Phi_{bc}+p\Psi^+_{bc},
\qquad \rho_c=I_2/2.
$$

二つのBell射影は直交し、$\rho_{bc}$ の固有値は $(1-p,p,0,0)$。さらに両Bell状態について $\operatorname{Tr}_b\Phi_{bc}=\operatorname{Tr}_b\Psi^+_{bc}=I_2/2$ であり、重み $(1-p)+p=1$ から上記の $\rho_c$ が従います。二値エントロピー $h(p):=-p\ln p-(1-p)\ln(1-p)$（$0\ln0=0$）を使えば

$$
S(bc)=h(p),\qquad S(c)=\ln2.
$$

$Rbc$ が純粋だから、相補分割 $R|bc$ と $Rb|c$ から $S(R)=h(p)$、$S(Rb)=\ln2$ です。従って

$$
S(b|R)=\ln2-h(p),\qquad
S(b|c)=h(p)-\ln2.
$$

[AMPS制約](#thm-bhi10-amps-tradeoff)の等号例です。$p=0$ で厳密な内外Bell対、$p=1/2$ で二つの条件付きエントロピーがともに0となります。**途中で両方が負になることはありません**。$p=0.1$ なら $h(p)\simeq0.325083$、放射増分は約 $0.368064$ natと正です。

### 仮定を一つ外すとどうなるか

$\lvert\Phi\rangle_{Rb}\otimes\lvert0\rangle_c$ では $S(b|R)=-\ln2$ ですが、$S(bc)=\ln2$、$S(c)=0$ です。早期放射と後期モードがBell対である代わりに、内部側と純粋対であるという（H）が失われています。元の証明では $S(c)-S(bc)$ の正の下界がなくなり、放射減少と矛盾しません。

また、$c$ が実は $R$ の一部と**同じ量子自由度**であったと解釈するなら、そもそも $R,b,c$ を独立なテンソル因子として扱った第3節の強劣加法性の代入は、そのまま行えません。ただし、それが一貫した重力の模型として成立するかは別の問題です。因数分解自体の限界はBHI15で扱います。

## 8. AMPSの射程を物理の仮定へ戻す

数学上の不等式が矛盾を生むのは、**同じ状態・同じ一歩**で次の条件を全て採用する場合です。

1. 遠方の早期放射 $R$、後期外部モード $b$、内部相手 $c$ が独立した有限次元部分系を作る。
2. 古い放射 $R$ を保持したまま、対象の後期モード $b$ について $S(Rb)-S(R)<0$ が成立する。これは蒸発のユニタリ性だけから各モードに自動的に従うわけではない。
3. 同じ $b,c$ の共同状態が近真空対であり、$S(bc)$ は小さく、$S(c)$ は $\ln2$ に近い。
4. これらを一つの $\rho_{Rbc}$ で評価でき、近似の誤差和が放射減少量との不等式を破るほど小さい。

「滑らかな地平線」は実際の場の理論では内外の短距離相関に対応しますが、連続場の局所領域には有限なBell対一個以上の構造があります。その翻訳とcutoff依存を確認しないまま、任意の実ブラックホールで「firewallが証明された」と言うことはできません。

[AMPS原論文](https://arxiv.org/abs/1207.3123)は、ユニタリ性、地平線外の低エネルギー有効場理論、落下観測者にとって滑らかな地平線という要請の緊張を提示します。相補性や観測者が両相関を測定できるかは次講BHI11で、内部と外部の因数分解が適切かはBHI15で検討します。本講で確定したのは、**通常の三部量子状態と標準的なエントロピー不等式を共通に使う限り、二つの要請を同時には課せない**という条件付きの結論です。

## 9. 演習と詳細解答

特に指定がなければ $R,b,c$ は有限次元、対数は自然対数、$b,c$ はqubitです。各問で、数式の対象となる部分系を明示してください。

### Level A：二つの条件付きエントロピーを計算する

<a id="ex-bhi10-a01"></a>
#### BHI10-A01 内外Bell対

- Level: A

$\rho_{Rbc}=\rho_R\otimes\Phi_{bc}$ について、$S(bc)$、$S(c)$、$S(b|c)$、$S(b|R)$ と $I(R:b)$ を求めよ。$\rho_R$ は任意とする。

<!-- solution-start -->
**詳細解答**：$\Phi_{bc}$ は階数1なので $S(bc)=0$。$\rho_c=I_2/2$ なので $S(c)=\ln2$、よって $S(b|c)=0-\ln2=-\ln2$。[エントロピー加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)により $\rho_{Rb}=\rho_R\otimes I_2/2$ から $S(Rb)=S(R)+\ln2$。したがって $S(b|R)=\ln2$。$I(R:b)=S(R)+\ln2-[S(R)+\ln2]=0$。二つの条件付きエントロピーの和は0で、[AMPS制約](#thm-bhi10-amps-tradeoff)は等号です。
<!-- solution-end -->

<a id="ex-bhi10-a02"></a>
#### BHI10-A02 純粋化相手の入れ替え

- Level: A

$\lvert\Phi\rangle_{Rb}\otimes\lvert0\rangle_c$ について、二つの条件付きエントロピーと（H）の二誤差に必要な下界を求めよ。

<!-- solution-start -->
**詳細解答**：$Rb$ は純粋で $S(Rb)=0$、$\rho_R=I_2/2$ だから $S(b|R)=-\ln2$。$c$ は純粋で $S(c)=0$、$\rho_{bc}=I_2/2\otimes\lvert0\rangle\langle0\rvert$ なので $S(bc)=\ln2$、$S(b|c)=+\ln2$。条件 $S(bc)\le\varepsilon_{\rm pair}$ には $\varepsilon_{\rm pair}\ge\ln2$ が必要で、$S(c)\ge\ln2-\varepsilon_{\rm in}$ には $\varepsilon_{\rm in}\ge\ln2$ が必要。局所的に $S(b)=\ln2$ でも（H）は小誤差で満たせません。
<!-- solution-end -->

<a id="ex-bhi10-a03"></a>
#### BHI10-A03 GHZ状態は厳密な反例か

- Level: A

$\lvert G\rangle=(\lvert000\rangle+\lvert111\rangle)_{Rbc}/\sqrt2$ の $S(R),S(Rb),S(c),S(bc)$ をそれぞれ求め、（U）と（H）のうち厳密に成立するものを判定せよ。

<!-- solution-start -->
**詳細解答**：$R$ 以外の $bc$ と、$c$ 以外の $Rb$ をそれぞれ部分トレースすると、$\rho_R=\rho_c=I_2/2$ だから $S(R)=S(c)=\ln2$。$Rb$ と $bc$ の縮約はいずれも対角成分 $(1/2,0,0,1/2)$ なので $S(Rb)=S(bc)=\ln2$。従って $S(b|R)=S(b|c)=0$。$\gamma>0$ の（U）は $0\le-\gamma$ が偽なので成立しません。（H）は $\varepsilon_{\rm pair}\ge\ln2,\varepsilon_{\rm in}\ge0$ なら成立しますが、両誤差0では成立しません。$\rho_b=I_2/2$ だけでは純粋内外対の証拠になりません。
<!-- solution-end -->

<a id="ex-bhi10-a04"></a>
#### BHI10-A04 二つの誤差はどこまで許されるか

- Level: A

放射減少量が少なくとも $0.15$ nat で、内外共同エントロピーが $0.30$ nat 以下、$S(c)\ge\ln2-0.20$ nat と仮定する。この三条件は両立するか。$S(bc)$ の上界だけを $0.70$ nat に変更したら何が言えるか。

<!-- solution-start -->
**詳細解答**：[AMPS制約](#thm-bhi10-amps-tradeoff)に $\gamma=0.15$、$\varepsilon_{\rm pair}=0.30$、$\varepsilon_{\rm in}=0.20$ を代入すると必要条件は $0.15+\ln2\le0.50$。左辺は約 $0.843147$ なので矛盾します。上界を $0.70$ に緩めると誤差和は $0.90$ となり、$0.843147\le0.90$ は否定されません。しかし**必要条件を満たしただけで存在が証明されるわけではありません**。この不等式からは不可能とは言えない、が正しい結論です。
<!-- solution-end -->

<a id="ex-bhi10-a05"></a>
#### BHI10-A05 相互情報量の予算

- Level: A

$b$ が最大混合、$I(c:b)=1.2$ nat とする。[三部相関の不等式](#thm-bhi10-amps-tradeoff)から $I(R:b)$ の上界を求めよ。$I(R:b)=0.25$ nat は排除されるか。

<!-- solution-start -->
**詳細解答**：$S(b)=\ln2$ なので第4節の $I(R:b)+I(c:b)\le2S(b)$ に代入すると $I(R:b)\le2\ln2-1.2\simeq0.186294$ nat。$0.25>0.186294$ だから、その三部状態は存在しません。単に $I(c:b)\le2\ln2$ と個別に評価しても、この禁止は出ません。
<!-- solution-end -->

### Level B：不等式の中間式と近似模型

<a id="ex-bhi10-b01"></a>
#### BHI10-B01 強劣加法性からAMPSの向きを再現する

- Level: B

任意の $\rho_{Rbc}$ を補助系 $D'$ で純粋化し、[強劣加法性](../../../応用系/QINF/QINF19/index.md#thm-qinf19-ssa)への具体的な $A,B,C$ の割り当てを示して $S(b|R)+S(b|c)\ge0$ を導け。$\rho_{Rbc}$ 自身の純粋性を仮定してはならない。

<!-- solution-start -->
**詳細解答**

純粋化 $\lvert\Psi\rangle_{RbcD'}$ を選びます。[純粋二部系のエントロピー一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)を $RD'|bc$ と $RbD'|c$ に適用すると、

$$
S(RD')=S(bc),\qquad S(RbD')=S(c)
$$

です。次に[強劣加法性](../../../応用系/QINF/QINF19/index.md#thm-qinf19-ssa)の三系を $A=b,B=R,C=D'$ と選びます。

$$
S(Rb)+S(RD')\ge S(R)+S(RbD').
$$

相補エントロピーを代入して移項すれば、

$$
\begin{aligned}
0&\le S(Rb)+S(bc)-S(R)-S(c)\\
&=[S(Rb)-S(R)]+[S(bc)-S(c)]\\
&=S(b|R)+S(b|c).
\end{aligned}
$$

$D'$ は一般の混合三部状態を純粋化するために必要です。$Rbc$ 自身を純粋と仮定する必要はありません。
<!-- solution-end -->

<a id="ex-bhi10-b02"></a>
#### BHI10-B02 減少区間と各一歩の違い

- Level: B

$R_k=R_{k-1}b_k$ とする三段階の模型で、$S(R_0)=1.0,S(R_1)=1.3,S(R_2)=1.1,S(R_3)=0.8$ nat が与えられたとする。条件付きエントロピーを計算し、（U）が成立する段階だけを選べ。各段階の（H）を両誤差が $0.1$ nat 以下として同時に課せるか。

<!-- solution-start -->
**詳細解答**

[一歩の増分](../BHI9/index.md#def-bhi9-emission-increment)を $b_1,b_2,b_3$ に適用します。古い放射のエントロピーを各一歩の前後で同じ値として扱うと、

$$
\begin{aligned}
S(b_1|R_0)&=1.3-1.0=0.3,\\
S(b_2|R_1)&=1.1-1.3=-0.2,\\
S(b_3|R_2)&=0.8-1.1=-0.3
\end{aligned}
$$

（単位nat）です。（U）は第2段階で $\gamma\le0.2$、第3段階で $\gamma\le0.3$ として成立します。

第2段階で[AMPS制約](#thm-bhi10-amps-tradeoff)が要求するのは

$$
\ln2+0.2\le0.1+0.1=0.2
$$

ですが、左辺は約 $0.893147$ なので不成立です。第3段階では左辺が $\ln2+0.3\simeq0.993147$ とさらに大きくなります。したがって、この増分列とすべての段階での小誤差（H）は両立しません。

なお、与えられたエントロピーの列自体が固定された次元の放出模型で実現できるかは別の存在問題です。ここで確定したのは**増分列と（H）の両立不能性**です。
<!-- solution-end -->

<a id="ex-bhi10-b03"></a>
#### BHI10-B03 直交Bell対の重ね合わせ

- Level: B

第7節の $\lvert\Omega_p\rangle$ に $p=1/4$ を入れ、$\rho_{bc}$ と $\rho_R$ の非零固有値を求め、$S(b|R),S(b|c),I(R:b)+I(c:b)$ を導け。どの制約が等号か述べよ。

<!-- solution-start -->
**詳細解答**

$R$ の二つの基底が直交し、$\Phi_{bc}$ と $\Psi^+_{bc}$ も直交するので、$\rho_R$ と $\rho_{bc}$ の非零固有値はいずれも $(3/4,1/4)$ です。よって

$$
S(R)=S(bc)=h(1/4).
$$

各Bell状態の $b,c$ 縮約は $I_2/2$ なので、$\rho_b=\rho_c=I_2/2$ です。従って $S(b)=S(c)=\ln2$。全体 $Rbc$ は純粋なので、相補分割 $Rb|c$ により $S(Rb)=S(c)=\ln2$ を得ます。

条件付きエントロピーを定義から引き算すると、

$$
\begin{aligned}
S(b|R)&=S(Rb)-S(R)=\ln2-h(1/4),\\
S(b|c)&=S(bc)-S(c)=h(1/4)-\ln2.
\end{aligned}
$$

和は0です。従って[AMPS制約](#thm-bhi10-amps-tradeoff)は等号で、相互情報量についても

$$
I(R:b)+I(c:b)=2S(b)-0=2\ln2
$$

と上限に達します。$h(1/4)\simeq0.562335$ より、放射の一歩増分は $\ln2-h(1/4)\simeq0.130812$ natで正です。
<!-- solution-end -->

<a id="ex-bhi10-b04"></a>
#### BHI10-B04 状態を二つの純粋化相手へ分けられるか

- Level: B

$\rho_{bc}$ が純粋Bell対のとき、$\rho_{Rbc}$ の任意の拡張に対して $I(R:b)=0$ を示せ。その際「$Rbc$ も純粋だから」という理由を使わず、[純粋縮約の分離命題](#prop-bhi10-exact-pair-decoupling)の射影の議論を再構成せよ。

<!-- solution-start -->
**詳細解答**：$P=\Phi_{bc},Q=I-P$ とおくと、$\rho_{bc}=P$ から $\operatorname{Tr}[\rho_{Rbc}(I_R\otimes Q)]=0$。半正定値の $\rho_{Rbc}$ に対して、これは $Q$ 側の平方根ノルムが0であることを意味するので $\rho_{Rbc}=(I_R\otimes P)\rho_{Rbc}(I_R\otimes P)$。$P$ の階数1性により $\rho_{Rbc}=\rho_R\otimes P$。部分トレースで $\rho_{Rb}=\rho_R\otimes I_2/2$、[エントロピー加法性](../../../応用系/QINF/QINF17/index.md#prop-qinf17-tensor)によって $S(Rb)=S(R)+\ln2$ です。ゆえに $I(R:b)=S(R)+\ln2-S(Rb)=0$。$\rho_{Rbc}$ は混合であっても成立します。
<!-- solution-end -->

### Level C：多準位・多段階を統合する

<a id="ex-bhi10-c01"></a>
#### BHI10-C01 $d$ 準位AMPSと減少区間

- Level: C

$R,b,c$ を有限次元、$\dim b=\dim c=d\ge2$ とし、$R_k=R_{k-1}b_k$ の $N$ 段階模型を考える。各段階の内外対について

$$
S(b_kc_k)\le\alpha_k,\qquad
S(c_k)\ge\ln d-\beta_k
$$

が成り立つとする。古い放射の状態は一歩前後で保持され、$R_{k-1},b_k,c_k$ は独立したテンソル因子である。

1. 強劣加法性または[弱単調性](../BHI9/index.md#lem-bhi9-weak-monotonicity)を使い、一歩の放射エントロピー増分を下から評価せよ。
2. 総増分の下界を導き、$S(R_N)<S(R_0)$ のための誤差総和の必要条件を示せ。
3. 各段階 $\alpha_k+\beta_k<\ln d$ なら減少が不可能であることを示せ。
4. $\rho_{b_k}$ が各段階で $I_d/d$ という条件だけに弱めると3.が成立しないことを明示的な純粋状態で示せ。どの証明箇所を使えなくしたかも説明せよ。

<!-- solution-start -->
**詳細解答**

**1. 一歩の下界。** [弱単調性](../BHI9/index.md#lem-bhi9-weak-monotonicity)を $R=R_{k-1}$、$b=b_k$、$c=c_k$ に適用します。三部の因数分解が可能なので

$$
S(R_k)-S(R_{k-1})
\ge S(c_k)-S(b_kc_k)
\ge\ln d-\beta_k-\alpha_k.
$$

最初の不等式は$\rho_{R_{k-1}b_kc_k}$に対する強劣加法性の帰結、次は問題の二条件への代入です。

**2. 総増分。** $k$ について上の式を和すると、左辺は中間エントロピーの望遠鏡和になり

$$
S(R_N)-S(R_0)
\ge N\ln d-\sum_{k=1}^N(\alpha_k+\beta_k).
$$

左辺が負なら、右辺も負でなければならないので、必要条件は

$$
\sum_{k=1}^N(\alpha_k+\beta_k)>N\ln d
$$

です。等号の場合は左辺が0以上なので、厳密減少には足りません。

**3. 小誤差の全段階。** 各 $\alpha_k+\beta_k<\ln d$ なら一歩ずつ $\ln d-\alpha_k-\beta_k>0$。上の和も正になり、総エントロピーは厳密に増えます。

**4. 局所熱性だけの反例。** $d$ 準位の最大もつれ状態 $\lvert\Phi_d\rangle_{Rb}=d^{-1/2}\sum_{j=0}^{d-1}\lvert j\rangle_R\lvert j\rangle_b$ と、任意の固定純粋状態 $\lvert0\rangle_c$ を取ります。全体 $\lvert\Phi_d\rangle_{Rb}\otimes\lvert0\rangle_c$ は純粋で $\rho_b=I_d/d$ ですが、$S(Rb)=0,S(R)=\ln d$ より増分は $-\ln d$。さらに $S(bc)=\ln d,S(c)=0$ だから、元の $S(c_k)-S(b_kc_k)\ge\ln d-\alpha_k-\beta_k$ の正の評価が成立しません。熱的な外部縮約だけでは**内部との共同純粋性**が欠け、3.は導けません。
<!-- solution-end -->
