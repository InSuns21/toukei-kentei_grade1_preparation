# BHI1 情報損失の論理と観測可能量

## 1. 熱的な放射を見たとき、何がまだ分からないのか

[QCURV21でのHawking放射の再導出](../../QCURV/QCURV21/index.md#prop-qcurv21-hawking-chain)は、選んだ時空・量子状態・遠方観測者に対し、後期放射モードの熱因子を説明しました。一方、[BHT24の放射の精細エントロピー](../../BHT/BHT24/index.md#def-bht24-radiation-entropy)は、熱力学的な面積エントロピーとは別に、放射の縮約状態から計算する量です。[QINF33の可逆な放出模型](../../../応用系/QINF/QINF33/index.md#def-qinf33-swap-emission)では、全系が純粋でも放射の一部が混合してよいことを確かめました。

ここで足りないのは計算技法ではなく、**「蒸発の前」と「蒸発の後」に何を全系と数えるか**という条件です。「放射が熱的である」から「全情報が失われた」へは飛べません。反対に、終期に放射以外の自由度が本当に一切残らず、純粋な入力から放射全体が混合しているなら、可逆性と衝突します。どちらを論じているかを、状態と観測可能量を指定して判定しましょう。

以下はまず**有限次元の条件付き模型**です。Hilbert空間は複素有限次元、状態は正の跡1の密度演算子、エントロピーの対数は自然対数（単位 nat）とします。QINFのbit表示とは $S_{\rm nat}=(\ln2)S_{\rm bit}$ の関係にあります。物理的なブラックホール時空のHilbert空間が常に素直なテンソル積に分かれるとは仮定できず、その問題はBHI15で扱います。

## 2. 初期状態、放射、残存物を固定する

崩壊前の初期状態を含む空間を $\mathcal H_{\rm in}$、選んだ終期までに外へ到達して回収可能な全放射を $\mathcal H_R$ と書きます。まだ残るブラックホールや残存物を $\mathcal H_B$、それ以外の未観測の自由度を $\mathcal H_E$ と区別します。$E$ は自由度が実在すると断言する記号ではなく、**それがないとする仮定を明示するための余地**です。

全体系の可逆発展を仮定すると、初期補助系を固定した有効記述は内積保存写像 $V$ になります。$V^\dagger V=I_{\rm in}$ という式は、すべての初期ベクトルの内積が保存されることを表します。入力と出力の次元が等しいとき、この写像はユニタリです。次元が異なるときは、画像部分空間への等長埋め込みであって、出力空間全体のユニタリとは呼びません。

<a id="def-bhi1-endpoint-split"></a>

<!-- formal-statement-start -->
> **定義（蒸発終期の系の分割）**
>
> 有限次元複素Hilbert空間 $\mathcal H_{\rm in},\mathcal H_R,\mathcal H_B,\mathcal H_E$ と線形写像
>
$$
V:\mathcal H_{\rm in}\longrightarrow
\mathcal H_R\otimes\mathcal H_B\otimes\mathcal H_E,\qquad
V^\dagger V=I_{\rm in}
$$
>
> を固定する。$R$ は観測対象とする全放射、$B$ は残存物、$E$ はそれ以外の非観測自由度とする。**放射だけで完結した終期**では、$R$ が全出力を含み、さらに

$$
\dim\mathcal H_B=\dim\mathcal H_E=1
$$

> と仮定する。外部放射の熱性とは異なり、終期の自由度についての仮定である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi1-endpoint-split -->
**定義の確認** $\mathcal H_{\rm in}=\mathbb C^2$、$\mathcal H_R=\mathcal H_B=\mathbb C^2$、$\mathcal H_E=\mathbb C$ とし、計算基底で
$$
V|0\rangle=|0\rangle_R|0\rangle_B,\qquad
V|1\rangle=|1\rangle_R|1\rangle_B
$$
と定めます。二つの像の内積は $\langle00|11\rangle=0$、各ノルムは1なので、基底上で $V^\dagger V=I_2$ が確かめられます。$V$ は2次元から4次元への等長写像で、出力全体のユニタリ作用素ではありません。$B$ が2次元のため、**放射だけで完結した終期**には該当しません。任意の $\alpha|0\rangle+\beta|1\rangle$（$|\alpha|^2+|\beta|^2=1$）は $\alpha|00\rangle+\beta|11\rangle$ となり、一般の入力を二つ複製する操作でもありません。
<!-- definition-example-end -->

ブラックホールの「完全蒸発」は、単に古典的な地平線が消えたという幾何学的叙述だけでは上の定義を保証しません。残存物、相関した別領域、あるいは終期の量子重力記述の適用限界を排除する**別の物理的判断**が必要です。

## 3. 放射の観測可能量とは何か

有限次元では、放射だけを測る観測者の作用素は $R$ 上の演算子 $O_R$ を全体系に恒等作用素で延長した $O_R\otimes I_B\otimes I_E$ です。このような作用素の集まりを放射の**観測代数**と呼びます。ここで「代数」とは和・積・複素定数倍・随伴を取っても閉じている作用素の集合です。実際に用意できる検出器がその全作用素を測れる、と主張しているわけではありません。

[部分トレースの定義](../../../応用系/QINF/QINF3/index.md#def-qinf3-partial-trace)は、観測代数のすべての期待値を放射上の一つの密度演算子で計算できるようにします。

<a id="def-bhi1-radiation-channel"></a>

<!-- formal-statement-start -->
> **定義（放射観測代数と縮約チャネル）**
>
> [蒸発終期の系の分割](#def-bhi1-endpoint-split)に対し、
>
$$
\mathcal A_R=\{O_R\otimes I_B\otimes I_E:
O_R\in\mathcal B(\mathcal H_R)\},
\qquad
\mathcal N_R(\rho)=\operatorname{Tr}_{BE}(V\rho V^\dagger)
$$
>
> とする。$\mathcal B(\mathcal H_R)$ は $\mathcal H_R$ 上の全線形作用素の集合である。$\mathcal A_R$ を**放射観測代数**、$\mathcal N_R$ を**放射への縮約チャネル**という。任意の入力密度演算子 $\rho$ と放射作用素 $O_R$ に対し、
>
$$
\operatorname{Tr}\bigl(V\rho V^\dagger
(O_R\otimes I_B\otimes I_E)\bigr)
=\operatorname{Tr}\bigl(\mathcal N_R(\rho)O_R\bigr)
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi1-radiation-channel -->
**定義の確認** 前節の $V$ に $|+\rangle=(|0\rangle+|1\rangle)/\sqrt2$ を入力すると、全出力は $|\Phi^+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ です。$B$ の基底 $\{|0\rangle,|1\rangle\}$ で部分トレースを取ると、交差項 $|0_B\rangle\langle1_B|$ と随伴の跡は0なので
$$
\mathcal N_R(|+\rangle\langle+|)
=\tfrac12|0\rangle\langle0|+\tfrac12|1\rangle\langle1|
=I_2/2.
$$
$O_R=|0\rangle\langle0|$ なら両辺の期待値は $1/2$。$O_R=X=|0\rangle\langle1|+|1\rangle\langle0|$ なら両辺は0です。しかし放射と残存物を**共同で**測る $X_R\otimes X_B$ は $\mathcal A_R$ に属さず、$|\Phi^+\rangle$ における期待値は1です。この違いがアクセス可能範囲の意味です。
<!-- definition-example-end -->

$\mathcal N_R$ は[量子チャネルの定義](../../../応用系/QINF/QINF7/index.md#def-qinf7-channel)に沿って完全正値・跡保存です。等長写像による共役 $V\rho V^\dagger$ と部分トレースを連続して行うためであり、放射上で逆操作が存在するとは限りません。

## 4. 混合した放射と可逆な全体は両立する

<a id="prop-bhi1-mixed-radiation"></a>

<!-- formal-statement-start -->
> **命題（可逆な全体と混合放射の両立）**
>
> [蒸発終期の系の分割](#def-bhi1-endpoint-split)の等長写像 $V$ と単位ベクトル $|\psi\rangle\in\mathcal H_{\rm in}$ を取る。全出力 $V|\psi\rangle$ は純粋で、そのエントロピーは0である。一方、その放射縮約 $\mathcal N_R(|\psi\rangle\langle\psi|)$ は混合し得る。特に前節の2量子ビット例の $|+\rangle$ 入力では
>
$$
S(V|+\rangle\langle+|V^\dagger)=0,\qquad
S\bigl(\mathcal N_R(|+\rangle\langle+|)\bigr)=\ln2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$V^\dagger V=I$ から出力ノルムを1と示し、全状態が階数1の射影になることを確かめます。縮約はその射影を別の状態へ移す操作です。実例の固有値を計算して区別します。

<!-- proof-start -->
### 証明

$V^\dagger V=I$ と $\langle\psi|\psi\rangle=1$ から $\|V|\psi\rangle\|^2=\langle\psi|V^\dagger V|\psi\rangle=1$ です。したがって $V|\psi\rangle\langle\psi|V^\dagger$ は階数1の射影で固有値は1と残りの0です。[von Neumannエントロピーの定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)より全出力のエントロピーは $-1\ln1=0$。

上記の $|+\rangle$ では縮約状態が $I_2/2$ なので固有値は $1/2,1/2$ です。従って
$$
S(\rho_R)=-2\left(\frac12\ln\frac12\right)=\ln2>0.
$$
この局所状態の混合は $B$ と $R$ の相関を局所観測から捨てたために現れ、等長性と矛盾しません。$\square$
<!-- proof-end -->

より一般には[QINF33の純粋全系の縮約エントロピー等式](../../../応用系/QINF/QINF33/index.md#prop-qinf33-pure-budget)を使えば、全出力が純粋で $R$ と $BE$ の二部に分けられるとき $S(R)=S(BE)$ と分かります。ただし途中の放射を観測する場合と、終期の全放射を測る場合を取り違えないようにします。

## 5. 完全な蒸発の仮定を置くと何が矛盾するのか

<a id="thm-bhi1-endpoint-purity"></a>

<!-- formal-statement-start -->
> **定理（放射だけで完結する等長発展の純粋性制約）**
>
> 有限次元の[蒸発終期の系の分割](#def-bhi1-endpoint-split)で $V^\dagger V=I_{\rm in}$ とする。終期に $\dim\mathcal H_B=\dim\mathcal H_E=1$ で、$R$ が全出力の自由度を含むと仮定する。このとき、どの単位入力 $|\psi\rangle\in\mathcal H_{\rm in}$ についても
>
$$
\rho_R=\mathcal N_R(|\psi\rangle\langle\psi|)
=V|\psi\rangle\langle\psi|V^\dagger,\qquad S(\rho_R)=0
$$
>
> であり、入力状態は $V^\dagger$ によって像部分空間上で回復できる。従って、**同じ純粋入力から得られる終期の全放射**が $S(\rho_R)>0$ と確定したなら、これらの仮定の少なくとも一つは成り立たない。
<!-- formal-statement-end -->

### 証明の見取り図

残存物と環境がともに1次元なら部分トレースは何も捨てません。等長性による純粋性をそのまま放射へ移し、逆向きの作用も計算します。

<!-- proof-start -->
### 証明

$\dim\mathcal H_B=\dim\mathcal H_E=1$ なら $\mathcal H_R\otimes\mathcal H_B\otimes\mathcal H_E$ を $\mathcal H_R$ と同一視できます。従って $\operatorname{Tr}_{BE}$ は1次元因子を取り除くだけで、$\rho_R=V|\psi\rangle\langle\psi|V^\dagger$ です。

[可逆な全体と混合放射の両立の証明](#prop-bhi1-mixed-radiation)の最初の段階と同じく、これは規格化された階数1の射影なので $S(\rho_R)=0$ です。さらに任意の像ベクトル $V|\psi\rangle$ へ $V^\dagger$ を適用すれば
$$
V^\dagger V|\psi\rangle=I_{\rm in}|\psi\rangle=|\psi\rangle.
$$
これは像部分空間における回復を示します。$S(\rho_R)>0$ は $S(\rho_R)=0$ と両立しないので、最後の主張は対偶です。$\square$
<!-- proof-end -->

**適用の停止線。** これはHawkingの実際の蒸発終期で混合放射が既に観測・証明された、という定理ではありません。[QCURV21の外部状態が同じでも全体が異なる例](../../QCURV/QCURV21/index.md#prop-qcurv21-same-marginal)が示すように、後期の熱的スペクトルから終期全放射の密度演算子を特定できません。半古典近似が終期にまで成立するかどうかも、別の問題です。

## 6. 「混合」と「復号不能」は別の判定である

情報が失われたという言葉には、「入力を識別する実験を放射だけで実施できるか」という操作的な意味もあります。そのためには入力状態の集合と、許される操作を指定しなくてはなりません。

<a id="prop-bhi1-indistinguishable-inputs"></a>

<!-- formal-statement-start -->
> **命題（放射で区別できない二入力と回復の不可能性）**
>
> [放射への縮約チャネル](#def-bhi1-radiation-channel)と相異なる二入力状態について、次を仮定する。

$$
\rho_1\ne\rho_2,\qquad
\mathcal N_R(\rho_1)=\mathcal N_R(\rho_2).
$$

> このとき、放射だけを入力として**すべての入力状態を厳密に回復する**一つの写像は存在しない。第2節の等長写像において直交する入力 $|\pm\rangle=(|0\rangle\pm|1\rangle)/\sqrt2$ は、次のように同じ放射状態を与える。

$$
\mathcal N_R(|+\rangle\langle+|)
=\mathcal N_R(|-\rangle\langle-|)=I_2/2.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二つの出力密度演算子が同じなら、後段にどの写像を施しても同じ結果です。具体例では、全出力の異なる位相情報が共同相関に残ることを確かめます。

<!-- proof-start -->
### 証明

もし $\mathcal D(\mathcal N_R(\rho))=\rho$ が全入力状態 $\rho$ で成り立つとします。同じ出力 $\sigma_R=\mathcal N_R(\rho_1)=\mathcal N_R(\rho_2)$ に適用すれば
$$
\rho_1=\mathcal D(\sigma_R)=\rho_2
$$
となり、仮定 $\rho_1\ne\rho_2$ に矛盾します。ここでは $\mathcal D$ を物理的量子チャネルより広い一般の一価写像としても、回復はできません。

具体例では $V|\pm\rangle=(|00\rangle\pm|11\rangle)/\sqrt2$ であり、$B$ の基底で部分トレースを取ると、位相を含む交差項が消えて
$$
\mathcal N_R(|+\rangle\langle+|)=\mathcal N_R(|-\rangle\langle-|)=I_2/2.
$$
それでも全出力では $X_R\otimes X_B$ の期待値がそれぞれ $+1,-1$ なので区別できます。$\square$
<!-- proof-end -->

**逆は一般に言えません。** 出力状態から入力を数学的に一意に推定できる（写像が単射）ことだけでは、雑音のあるチャネルを**物理的な量子チャネルで完全復号できる**と保証しません。完全正値性や補助系との相関を保存する条件が別に必要です。この点は[QINF29の参照系付きチャネル状態](../../../応用系/QINF/QINF29/index.md#def-qinf29-reference)と完全復号条件でさらに詳しく学べます。

また、全放射が純粋であること**だけ**からも、可逆な状態写像は保証されません。例えば、$|0\rangle,|1\rangle$ を持つ2次元入力・出力に対し
$$
K_0=|0\rangle\langle0|,\qquad K_1=|0\rangle\langle1|,
\qquad \mathcal T(\rho)=\sum_{j=0}^1K_j\rho K_j^\dagger
$$
とすると、$K_0^\dagger K_0+K_1^\dagger K_1=I$ ですが、$\mathcal T(\rho)=|0\rangle\langle0|$ がすべての入力で成立します。出力はいつも純粋でも、区別可能だった二入力が区別不能になるため、これは可逆な放射時間発展ではありません。

## 7. 何を仮定するとどの結論が得られるか

| 前提 | 計算・観測できるもの | 言えること | まだ言えないこと |
| --- | --- | --- | --- |
| 半古典の出射場・状態を指定 | 後期の占有数・熱因子・流束 | 選んだモードの分布 | 終期全放射が混合状態かどうか、全発展の非ユニタリ性 |
| 純粋入力と等長な全発展、$R$ と $BE$ の分割 | $\rho_R$ と $S(R)$ | $R$ は混合でもよい | 放射だけで全情報が失われたとは限らない |
| 上に加えて $B,E$ が1次元、$R$ が全出力 | 全放射の状態 | $S(R)=0$ が必要 | 実際の蒸発にこの仮定が成立するとは限らない |
| $\mathcal N_R(\rho_1)=\mathcal N_R(\rho_2)$ となる二入力 | 放射観測代数での全期待値 | 放射だけではその二入力を識別・厳密回復できない | 全体の非ユニタリ性は従わない |
| 放射の一つの出力が純粋 | その入力についての $S(R)=0$ | その出力には混合がない | 任意入力に対するユニタリ性・復号可能性 |

ブラックホールに対する情報損失問題は、半古典場の局所的な熱性と、「終期は放射以外何も残らない」という強い仮定を、**同一の量子状態と時間領域で結び付けられるか**という問いです。[BHT24の微視状態と放射の区別](../../BHT/BHT24/index.md#prop-bht24-global-pure-local-mixed)を思い出してください。面積エントロピーの値だけでも答えは決まりません。

## 8. 演習と詳細解答

### Level A：定義と反例を直接判定する

<a id="ex-bhi1-a01"></a>

#### BHI1-A01 等長埋め込みと終期の違い

- Level: A
- 問題: $\mathcal H_{\rm in}=\mathbb C^2$、$\mathcal H_R=\mathcal H_B=\mathbb C^2$ で $V|0\rangle=|00\rangle,V|1\rangle=|11\rangle$ とする。$V^\dagger V$ を計算し、$|+\rangle$ の全出力のノルムと $B$ の次元を確かめ、「放射だけで完結した終期」か判定せよ。

<!-- solution-start -->
**詳細解答**　入力基底 $|i\rangle$ に対する行列要素は $\langle i|V^\dagger V|j\rangle=\langle Vi|Vj\rangle$ です。$V|0\rangle, V|1\rangle$ は互いに直交し長さ1なので $\langle Vi|Vj\rangle=\delta_{ij}$、従って $V^\dagger V=I_2$ です。$V|+\rangle=(|00\rangle+|11\rangle)/\sqrt2$ のノルムの二乗は $(1+1+2\operatorname{Re}\langle00|11\rangle)/2=1$。しかし $\dim\mathcal H_B=2$ であり、[終期の定義](#def-bhi1-endpoint-split)に必要な1次元の条件を満たしません。
<!-- solution-end -->

<a id="ex-bhi1-a02"></a>

#### BHI1-A02 局所作用素と共同作用素

- Level: A
- 問題: $|\Phi^\pm\rangle=(|00\rangle\pm|11\rangle)/\sqrt2$ に対し、$Z_R\otimes I_B$ と $X_R\otimes X_B$ の期待値をそれぞれ求めよ。$Z=|0\rangle\langle0|-|1\rangle\langle1|$、$X|0\rangle=|1\rangle,X|1\rangle=|0\rangle$ とする。

<!-- solution-start -->
**詳細解答**　$Z_R\otimes I_B$ は $|00\rangle$ で $+1$、$|11\rangle$ で $-1$ を返し、交差項は直交性で0です。したがって両状態で期待値は $(1-1)/2=0$。一方、$(X_R\otimes X_B)|00\rangle=|11\rangle$ と $(X_R\otimes X_B)|11\rangle=|00\rangle$ なので、$|\Phi^+\rangle$ は固有値 $+1$、$|\Phi^-\rangle$ は固有値 $-1$ の固有ベクトルです。後者の共同作用素は[放射観測代数](#def-bhi1-radiation-channel)に属しません。
<!-- solution-end -->

<a id="ex-bhi1-a03"></a>

#### BHI1-A03 エントロピーの単位

- Level: A
- 問題: $\rho=\operatorname{diag}(1/2,1/2)$ のエントロピーをnatで求めよ。QINFのbit表示と比較し、純粋な二量子ビット全体の部分系としてこの $\rho$ が現れ得るか述べよ。

<!-- solution-start -->
**詳細解答**　[エントロピーの定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)に二つの固有値を代入すると $S(\rho)=-2(1/2)\ln(1/2)=\ln2$ nat。$\log_2(1/2)=-1$ を用いると1 bitで、$1\ {\rm bit}=\ln2\ {\rm nat}$ と一致します。例えば $|\Phi^+\rangle$ から $B$ を部分トレースした状態が $\rho$ なので、混合した部分系と純粋な全体系は両立します。
<!-- solution-end -->

<a id="ex-bhi1-a04"></a>

#### BHI1-A04 一モードの熱性と全体の混合性

- Level: A
- 問題: 二量子ビット上の $\rho_{\rm pure}=|\Phi^+\rangle\langle\Phi^+|$ と $\rho_{\rm mix}=I_4/4$ を比べる。第一量子ビットだけの縮約と、全体系のエントロピーをそれぞれ計算し、縮約だけで全体を判定できるか述べよ。

<!-- solution-start -->
**詳細解答**　$\rho_{\rm pure}$ の部分トレースは $I_2/2$ です。$\rho_{\rm mix}=(I_2/2)\otimes(I_2/2)$ なので、第二因子の跡は1、第一因子は $I_2/2$ のままです。しかし全体系の固有値は前者で $(1,0,0,0)$、後者で $(1/4,1/4,1/4,1/4)$ なので、エントロピーはそれぞれ $0$、$-4(1/4)\ln(1/4)=2\ln2$ です。局所状態の一致から全体系の純粋性・混合性を判定する推論は失敗します。
<!-- solution-end -->

### Level B：可逆性と観測範囲を接続する

<a id="ex-bhi1-b01"></a>

#### BHI1-B01 終期仮定を一つずつ変更する

- Level: B
- 問題: 純粋な入力と等長発展を仮定する。次の各条件で $S(R)>0$ が可能か判定し、可能なら具体的な等長写像を示せ。
  1. 終期の $B,E$ がともに1次元
  2. $B$ が2次元、$E$ は1次元
  3. $B$ が1次元、$E$ は2次元

<!-- solution-start -->
**詳細解答**

1. [放射だけで完結する等長発展の純粋性制約](#thm-bhi1-endpoint-purity)から、どの純粋入力でも $\rho_R$ は純粋であり、$S(R)=0$。正の放射エントロピーは不可能です。
2. 入力を2次元、$R,B$ を2次元に取り、次のように定義します。

   $$
   V|0\rangle=|00\rangle,\qquad V|1\rangle=|11\rangle.
   $$

   像は正規直交しているため等長です。$|+\rangle$ 入力の放射縮約は $I_2/2$ であり、$S(R)=\ln2$ となります。
3. 前項の写像で第二因子を $B$ でなく $E$ と呼び直せば、$\dim B=1,\dim E=2$ で同じ結論です。

したがって、幾何学的な地平線が残らない場合でも、未観測の $E$ が存在する可能性を追加仮定なしには排除できません。
<!-- solution-end -->

<a id="ex-bhi1-b02"></a>

#### BHI1-B02 純粋出力でも情報が消えるチャネル

- Level: B
- 問題: $K_0=|0\rangle\langle0|,K_1=|0\rangle\langle1|$ と $\mathcal T(\rho)=K_0\rho K_0^\dagger+K_1\rho K_1^\dagger$ を考える。跡保存性、任意の入力で出力が純粋であること、完全回復の不可能性を証明せよ。

<!-- solution-start -->
**詳細解答**　$K_0^\dagger K_0=|0\rangle\langle0|$、$K_1^\dagger K_1=|1\rangle\langle1|$ なので和は $I_2$。したがってKraus表示のチャネルは跡を保存します。一般の密度演算子を $\rho=\sum_{i,j=0}^1\rho_{ij}|i\rangle\langle j|$ と書くと $K_0\rho K_0^\dagger=\rho_{00}|0\rangle\langle0|$、$K_1\rho K_1^\dagger=\rho_{11}|0\rangle\langle0|$。$\rho_{00}+\rho_{11}=\operatorname{Tr}\rho=1$ より $\mathcal T(\rho)=|0\rangle\langle0|$ となり、出力は階数1の純粋状態です。しかし $\mathcal T(|0\rangle\langle0|)=\mathcal T(|1\rangle\langle1|)$ なので、[放射で区別できない二入力と回復の不可能性](#prop-bhi1-indistinguishable-inputs)を適用すると両方を完全復元する写像は存在しません。
<!-- solution-end -->

<a id="ex-bhi1-b03"></a>

#### BHI1-B03 放射に完全移送するSWAP模型

- Level: B
- 問題: 記憶系 $M$ と放射系 $R$ を各2次元とし、初期状態 $|\psi\rangle_M|0\rangle_R$ へSWAPを作用させる。任意の $|\psi\rangle=\alpha|0\rangle+\beta|1\rangle$ の出力、$\rho_R$、逆操作を求めよ。終期の記憶レジスタは2次元であることと、情報が記憶側に残らないことを区別せよ。

<!-- solution-start -->
**詳細解答**　SWAPは基底上で $|i\rangle_M|0\rangle_R\mapsto|0\rangle_M|i\rangle_R$ と作用するため、線形性から
$$
\operatorname{SWAP}\bigl[(\alpha|0\rangle+\beta|1\rangle)_M|0\rangle_R\bigr]
=|0\rangle_M(\alpha|0\rangle+\beta|1\rangle)_R.
$$
$M$ を部分トレースしても $\rho_R=|\psi\rangle\langle\psi|$ で純粋なので、$S(R)=0$ です。
$R$ の状態を元の $M$ に戻す逆操作もSWAPで、$\operatorname{SWAP}^2=I$ が成立します。

終期の $\mathcal H_M$ の次元自体は2ですが、**到達可能な出力部分空間では常に $M=|0\rangle$** であり、残存系の状態は初期入力に依存しません。
この「固定された残存状態」と、残存Hilbert空間が文字どおり1次元であるという[終期の定義](#def-bhi1-endpoint-split)の強いモデル仮定は区別します。
<!-- solution-end -->

### Level C：同じ局所データから異なる結論を見分ける

<a id="ex-bhi1-c01"></a>

#### BHI1-C01 二つの等長写像と情報損失の論理表

- Level: C
- 問題: 入力 $\mathbb C^2$、出力 $R\otimes B=\mathbb C^2\otimes\mathbb C^2$ とし、次の二模型を比較する。出力因子の順は $R,B$ とする。

  **模型A：** $V_A|0\rangle=|00\rangle$、$V_A|1\rangle=|11\rangle$

  **模型B：** $V_B|0\rangle=|00\rangle$、$V_B|1\rangle=|10\rangle$

  1. 両模型の等長性を確かめよ。
  2. 入力 $|\pm\rangle$ の全出力と放射縮約をそれぞれ求めよ。
  3. 放射だけから両入力を厳密に回復できるか判定せよ。
  4. 入力 $|+\rangle$ の $Z_R$ の期待値を比較し、同じ値から全放射の混合状態や情報損失を断定できない理由を説明せよ。
  5. 終期が放射だけで完結すると追加仮定したとき、どちらの模型がその条件と両立するか述べよ。

<!-- solution-start -->
**詳細解答**

1. (A) の二つの像は $|00\rangle,|11\rangle$、(B) の二つの像は $|00\rangle,|10\rangle$ です。各組は正規直交しているので、どちらも $\langle V_\bullet i|V_\bullet j\rangle=\delta_{ij}$ を満たし、$V_\bullet^\dagger V_\bullet=I_{\rm in}$ です。
2. (A) では $V_A|\pm\rangle=(|00\rangle\pm|11\rangle)/\sqrt2=|\Phi^\pm\rangle$。$B$ の正規直交基底で部分トレースすると交差項が消え、いずれも $\rho_R^{A,\pm}=I_2/2$ です。(B) では $V_B|\pm\rangle=(|00\rangle\pm|10\rangle)/\sqrt2=|\pm\rangle_R|0\rangle_B$、従って $\rho_R^{B,\pm}=|\pm\rangle\langle\pm|$ です。前者の放射エントロピーは $\ln2$、後者は0となります。
3. (A) では二つの直交入力が同じ放射状態へ移るので、[放射で区別できない二入力と回復の不可能性](#prop-bhi1-indistinguishable-inputs)より放射だけからの同時回復は不可能です。(B) では放射に入力状態がそのまま格納されているので、入力と放射を対応させる同一視によって全入力を回復できます。
4. 模型Aでは $\rho_R^{A,+}=I_2/2$ だから、$\operatorname{Tr}(\rho_R^{A,+}Z)=1/2-1/2=0$ です。
   模型Bでも $\rho_R^{B,+}=|+\rangle\langle+|$ なので、$\langle+|Z|+\rangle=(1-1)/2=0$ です。

   しかし一種類の期待値が一致しても、全観測代数の期待値は決まりません。例えば $X_R$ の期待値は模型Aで0、模型Bで1です。
5. 模型Aの $|+\rangle$ 出力は $R$ と $B$ の相関を持ち、$S(R)=\ln2$ です。したがって $B$ の情報を取り除いて、放射だけを全出力だと見なすことはできません。

   模型Bでは $B$ は常に $|0\rangle$ に固定され、到達可能な情報はすべて $R$ に移ります。この固定補助系を実効的に1次元と見なす出力模型は、[放射だけで完結する等長発展の純粋性制約](#thm-bhi1-endpoint-purity)と両立します。

   ただし、この構成は実際の蒸発が模型Bに従うことの証明ではありません。
<!-- solution-end -->

## 9. これから調べるべき物理的な追加仮定

本講の結論は、等長写像と部分トレースの関係として**有限模型内では厳密**です。しかしHawking対生成が各時刻でどの領域を純化し、逐次放出を何回繰り返すかは、まだ固定していません。それをBHI2とBHI3で扱います。その後、熱的な一モード分布と全放射エントロピーを区別したうえで、ユニタリ蒸発のPage曲線との衝突がどの仮定で起きるかを問い直します。

**次講 BHI2：地平線内外の分割とHawking対の玩具模型。**