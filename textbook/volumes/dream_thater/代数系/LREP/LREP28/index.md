# LREP28 離散対称性と総合演習

<!-- definition-example-audit: strict -->

前講までに、連続な回転・boost・並進から場の変換と粒子の状態を組み立てました。しかし鏡に映す操作や、映画を逆再生する操作は、恒等変換から連続的に到達するLorentz変換ではありません。電荷を逆にする操作は時空座標さえ変えません。これら三つの操作を区別すれば、なぜ鏡映は光子のヘリシティを逆にし、時間反転は同じヘリシティを保つのかが分かります。

直接の前提講座：[LREP27 光子の偏極とゲージ](../LREP27/index.md)、[LREP8 二つのスピンの合成](../LREP8/index.md)。以下ではその前提に含まれる結果を順次使います。

[共通符号規約](../../../../../dream-theater-lorentz-conventions.md)に従い、$c=\hbar=1$、$\eta=\operatorname{diag}(-1,1,1,1)$ とします。時空点は $x=(t,\boldsymbol x)$、未来向きの非零運動量は $p=(E,\boldsymbol p)$、$E>0$ です。$I_n$ は $n$ 次単位行列、$\dagger$ は複素共役転置、星は成分ごとの複素共役です。

## 1. 鏡映で左右の場を交換する

[LREP13の空間反転](../LREP13/index.md#def-lrep13-parity)は時刻を固定して空間座標を反転する操作です。時間座標だけを反転する時空行列も用意します。

$$
P_x=\operatorname{diag}(1,-1,-1,-1),
\qquad
T_x=\operatorname{diag}(-1,1,1,1).
$$

両方とも対角行列なので $P_x^{\mathsf T}\eta P_x=T_x^{\mathsf T}\eta T_x=\eta$ です。行列式はそれぞれ $-1$。積は $-I_4$ で行列式は1ですが、未来向き時間軸を過去向きに変えます。従って三つとも恒等変換を含むLorentz群の連結成分には属しません。

[LREP13の空間反転による左右交換](../LREP13/index.md#prop-lrep13-parity-exchange)では、被覆側の変換 $A\in SL(2,\mathbb C)$ が空間反転による共役で $Q(A)=(A^\dagger)^{-1}$ に移ります。左Weyl列 $u$ と右Weyl列 $r$ の作用はそれぞれ $A,Q(A)$ でした。従って片方だけの二次元空間で鏡映を実現するのではなく、四成分の[Diracスピノル](../LREP16/index.md#def-lrep16-dirac)を使います。

[LREP17のDirac随伴](../LREP17/index.md#def-lrep17-dirac-adjoint)で使った行列を $H$ とします。次の選択では鏡映を二回行うと元に戻ります。

$$
H=\begin{pmatrix}0&-iI_2\\iI_2&0\end{pmatrix},
\qquad
S(A)=\begin{pmatrix}A&0\\0&Q(A)\end{pmatrix}.
$$

<a id="prop-lrep28-dirac-parity"></a>

<!-- formal-statement-start -->
> **命題（Dirac空間での空間反転）**
> Weyl基底の四成分空間で任意の $A\in SL(2,\mathbb C)$ に対し $Q(A)=(A^\dagger)^{-1}$ とし、

$$
H=\begin{pmatrix}0&-iI_2\\iI_2&0\end{pmatrix},
\quad S(A)=\operatorname{diag}(A,Q(A))
$$

> とする。このとき $H^2=I_4$ であり、

$$
HS(A)H^{-1}=S(Q(A)).
$$

> また $\Gamma=\operatorname{diag}(-I_2,I_2)$ とすると $H\Gamma H^{-1}=-\Gamma$ である。
<!-- formal-statement-end -->

**計算の核心。** $H$ の非対角ブロックが上下を交換し、位相の積が1になるため、左右の変換行列が入れ替わります。

<!-- proof-start -->
### 証明

ブロック積により

$$
H^2=\begin{pmatrix}(-i)iI_2&0\\0&i(-i)I_2\end{pmatrix}=I_4.
$$

同じ計算で

$$
HS(A)H
=\begin{pmatrix}Q(A)&0\\0&A\end{pmatrix}.
$$

$Q(A)^\dagger=A^{-1}$ なので $Q(Q(A))=A$ です。右辺は $S(Q(A))$ になります。

$\Gamma$ は左列に $-1$、右列に $+1$ を掛ける行列です。$H(u,r)^{\mathsf T}=(-ir,iu)^{\mathsf T}$ より

$$
H\Gamma(u,r)^{\mathsf T}=(-ir,-iu)^{\mathsf T},
$$

$$
\Gamma H(u,r)^{\mathsf T}=(ir,iu)^{\mathsf T}.
$$

よって $H\Gamma=-\Gamma H$、右から $H$ を掛ければ結論を得ます。$\square$
<!-- proof-end -->

例えば $A=\operatorname{diag}(2,1/2)$ なら $Q(A)=\operatorname{diag}(1/2,2)$ です。左第一成分は2倍ですが、鏡映後の右第一成分には逆のboostに対する2倍の作用が現れます。場への変換を $\psi'(x)=H\psi(P_x x)$ とすれば、座標の反転と成分の交換を同時に扱えます。[chirality演算子](../LREP16/index.md#def-lrep16-chirality)の固有値 $\pm1$ の交換は成分に関する事実であって、この行列を粒子Hilbert空間の全作用とみなすわけではありません。

## 2. 時間反転と正エネルギー

量子状態は複素Hilbert空間の単位ベクトルで、全体の絶対値1の位相を変えても同じ物理状態を表します。二つの単位ベクトル $\phi,\psi$ の遷移確率は $|\langle\phi,\psi\rangle|^2$ です。内積は第二引数について線形とします。

[LREP18の電荷共役](../LREP18/index.md#def-lrep18-charge-conjugation)で反線形写像を使いました。反線形とは係数を複素共役することです。Hilbert空間では、さらに遷移確率を保つ条件を課します。

<a id="def-lrep28-antiunitary"></a>

<!-- formal-statement-start -->
> **定義（反ユニタリ作用素）**
> 複素Hilbert空間 $\mathcal H$ 上の写像 $F:\mathcal H\to\mathcal H$ が全射であり、任意の $z,w\in\mathcal H$、$\alpha,\beta\in\mathbb C$ に対して

$$
F(\alpha z+\beta w)=\alpha^*Fz+\beta^*Fw,
$$

$$
\langle Fz,Fw\rangle=\langle z,w\rangle^*
$$

> を満たすとき、反ユニタリ作用素という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep28-antiunitary -->
**定義の確認**。 $\mathbb C^2$ の通常の内積では $Kz=z^*$ がその条件を満たします。実際 $K^2=I_2$、$K(\alpha z+\beta w)=\alpha^*Kz+\beta^*Kw$ であり、

$$
\langle Kz,Kw\rangle=z^{\mathsf T}w^*
=\langle z,w\rangle^*.
$$

従ってノルムと遷移確率が保たれます。全射性は二回作用させると任意の列が元に戻ることから従います。
<!-- definition-example-end -->

この確率を保存する全単射な状態の対称変換は、[Wignerの定理（Weinberg 第2章）](https://www.cambridge.org/core/books/quantum-theory-of-fields/relativistic-quantum-mechanics/3F963D187A0ABBB757DA00B3A98E3439)によりユニタリまたは反ユニタリな作用素で実現できます。ここではこの量子力学上の定理を証明せず、その二種類の作用素のどちらかが存在すると仮定して時間反転の必要条件を求めます。

<a id="prop-lrep28-time-reversal-energy"></a>

<!-- formal-statement-start -->
> **命題（正エネルギーの時間反転条件）**
> 複素Hilbert空間上の非零の非負自己共役作用素を $E_0$ とし、$V(t)=e^{-itE_0}$ とする。ユニタリまたは[反ユニタリ作用素](#def-lrep28-antiunitary) $\Theta$ が全実数 $t$ について

$$
\Theta V(t)\Theta^{-1}=V(-t)
$$

> を満たすなら $\Theta$ は反ユニタリであり、$\Theta E_0\Theta^{-1}=E_0$ が成り立つ。逆に反ユニタリな $\Theta$ がこの作用素等式を満たせば上の時間発展の等式が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 複素線形の場合は指数の $-i$ が保存され、反線形の場合には $+i$ に変わります。この違いがエネルギーの符号を決めます。

<!-- proof-start -->
### 証明

[並進の共同スペクトル表示](../LREP21/index.md#thm-lrep21-translation-spectrum)と[Stoneの定理](../../../解析系/QM/QM7/index.md#thm-qm7-stone)で、時間並進を自己共役生成作用素で表しました。ここでもその一意性を使います。

$F=\Theta E_0\Theta^{-1}$ の定義域は $\Theta D(E_0)$ です。$\Theta$ が線形でも反線形でも、元の自己共役作用素の射影値測度 $M$ を $B\mapsto\Theta M(B)\Theta^{-1}$ と移せば、再び射影値測度になります。実関数 $\lambda$ の積分で表す $F$ は自己共役かつ非負です。

指数関数の積分では、線形なら係数 $e^{-it\lambda}$ がそのまま、反線形なら共役 $e^{it\lambda}$ になります。従って線形の場合

$$
e^{-itF}=\Theta V(t)\Theta^{-1}
=V(-t)=e^{itE_0}.
$$

全実数 $t$ で成立するのでStoneの定理の生成作用素の一意性から $F=-E_0$ です。$F\ge0$ と $E_0\ge0$ が同時に成立すれば、$E_0$ のスペクトルは0だけになり、$E_0=0$ です。仮定に反します。

反線形の場合は

$$
e^{itF}=e^{itE_0}.
$$

同じ一意性を $-t$ に適用すると $F=E_0$ です。逆向きもこの指数の共役変換に $F=E_0$ を代入すれば成立します。$\square$
<!-- proof-end -->

一成分の状態で $E_0=2$ とすると $K e^{-2it}K^{-1}=e^{2it}$ です。単に過去向きの四元運動量を粒子の運動量として採用したのではなく、複素位相も反転しています。非負条件を外せば、$E_0=\operatorname{diag}(1,-1)$ を二成分の交換行列で共役して $-E_0$ にする線形な反転も可能です。正エネルギー条件が排除したのはこの機構です。

空間並進についても確認しましょう。空間方向 $i$ の距離 $s$ の並進は $e^{isP^i}$ です。時間反転の時空行列 $T_x$ は空間並進を変えないため、時空の並進を実装する対称作用素には $\Theta e^{isP^i}\Theta^{-1}=e^{isP^i}$ を要求します。反線形性から左辺は $e^{-is\Theta P^i\Theta^{-1}}$ です。[Stoneの定理](../../../解析系/QM/QM7/index.md#thm-qm7-stone)の一意性より $\Theta P^i\Theta^{-1}=-P^i$ となります。エネルギーは保たれるので、物理的な運動量の変化は $(E,\boldsymbol p)\mapsto(E,-\boldsymbol p)$ です。空間反転 $\Pi$ がユニタリな実装を持つ場合は、空間並進が逆向きになり、$\Pi e^{isP^i}\Pi^{-1}=e^{-isP^i}$ から同じ運動量の反転を得ます。時間並進は変わらないのでエネルギーは保たれます。

## 3. ヘリシティを追跡する

空間運動量 $\boldsymbol p\ne0$ に対するヘリシティは、[角運動量の進行方向への射影](../LREP16/index.md#def-lrep16-helicity)という考え方で得られます。スピン $j$ の内部空間で角運動量行列を $J_i$ と書き、

$$
h(\boldsymbol p)=\frac{\sum_{i=1}^3p_iJ_i}{|\boldsymbol p|}
$$

とします。粒子が運動量を反転しても同じスピン空間に入る模型を考えます。空間反転で運動量が反転する一方、回転は $P_x$ と可換なのでその生成作用素 $J_i$ は保存されます。時間反転の時空操作も回転と可換ですが、状態の作用素は反ユニタリなので回転の位相 $i$ の共役により角運動量の符号が逆になります。具体的には $R_i(\theta)=e^{-i\theta J_i}$ とし、反転後の内部空間でも同じ角運動量行列を用います。空間反転が回転と可換なら

$$
e^{-i\theta\Pi J_i\Pi^{-1}}=e^{-i\theta J_i},
$$

時間反転が回転と可換なら

$$
e^{i\theta\Theta J_i\Theta^{-1}}=e^{-i\theta J_i}.
$$

有限次元なので $\theta=0$ で微分でき、前者から $\Pi J_i\Pi^{-1}=J_i$、後者から $\Theta J_i\Theta^{-1}=-J_i$ が得られます。

<a id="prop-lrep28-helicity-reflections"></a>

<!-- formal-statement-start -->
> **命題（離散操作によるヘリシティの変化）**
> $\boldsymbol p\ne0$ とする。内部空間のユニタリ写像 $\Pi$ と反ユニタリ写像 $\Theta$ が運動量を $-\boldsymbol p$ へ移し、各 $J_i$ について

$$
\Pi J_i\Pi^{-1}=J_i,
\qquad
\Theta J_i\Theta^{-1}=-J_i
$$

> を満たすとする。$h(\boldsymbol p)$ の実固有値 $h$ の状態は、空間反転後は固有値 $-h$、時間反転後は固有値 $h$ の状態になる。
<!-- formal-statement-end -->

**証明の見取り図。** 進行方向の符号と角運動量の符号を別々に数えれば、空間反転では一つ、時間反転では二つの符号が変わります。

<!-- proof-start -->
### 証明

$p_i$ と $|\boldsymbol p|$ は実数なので、反線形作用でも係数は変わりません。$\Pi h(\boldsymbol p)\Pi^{-1}=h(\boldsymbol p)=-h(-\boldsymbol p)$ です。従って $h(\boldsymbol p)v=hv$ なら

$$
h(-\boldsymbol p)\Pi v=-\Pi h(\boldsymbol p)v=-h\Pi v.
$$

時間反転の場合は $\Theta h(\boldsymbol p)\Theta^{-1}=-h(\boldsymbol p)=h(-\boldsymbol p)$ なので

$$
h(-\boldsymbol p)\Theta v=\Theta(hv)=h\Theta v.
$$

最後の等号は $h$ が実数であることを使っています。$\square$
<!-- proof-end -->

例えば $j=1/2$ の内部空間では $J_i=\sigma_i/2$ と取れます。[Pauli行列の積公式](../LREP5/index.md#lem-lrep5-pauli-product)の行列を使い、$J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とすると $J\sigma_i^*=-\sigma_i J$ が三行列の積で確かめられます。従って $\Theta=JK$ は反ユニタリで、$\Theta J_i\Theta^{-1}=-J_i$。$\Theta^2=JJ^*=-I_2$ なので時間反転を二回行うと状態ベクトルの符号が変わりますが、物理状態の位相は同値です。

質量零の一粒子表現では、[ヘリシティの内部表現](../LREP24/index.md#def-lrep24-helicity-rep)で回転の位相を $e^{-ih\theta}$ と選びました。進行方向を反転したときは回転軸も反転するため、空間反転は角度を $-\theta$ に読み替えます。回転を $R_{\boldsymbol n}(\theta)$ とし、$\boldsymbol n=\boldsymbol p/|\boldsymbol p|$ とします。$R_{-\boldsymbol n}(\theta)=R_{\boldsymbol n}(-\theta)$ であり、反転作用素 $F$ は時空回転と可換です。従って

$$
R_{-\boldsymbol n}(\theta)Fv
=F R_{\boldsymbol n}(-\theta)v=F(e^{ih\theta}v).
$$

線形の空間反転では右辺は $e^{ih\theta}Fv$ でヘリシティは $-h$、反線形の時間反転では $e^{-ih\theta}Fv$ でヘリシティは $h$ です。この議論は反転操作が当該理論に存在すると仮定した場合のものです。例えば $h\ne0$ の一種類だけを持つ正エネルギー粒子空間には、空間反転を内部の全単射として実装できません。反対のヘリシティの表現が必要です。

## 4. 電荷を反転する操作は別である

[LREP18の電荷共役の共変性と対合性](../LREP18/index.md#prop-lrep18-real-structure)の反線形写像を $\mathcal K$ とします。同じ実行列 $J$ を使えば

$$
\mathcal K\binom{u}{r}=\binom{Jr^*}{-Ju^*}.
$$

従って $\mathcal K^2=I_4$、$\mathcal KS(A)=S(A)\mathcal K$ です。例えば $\psi=(1,0,0,0)^{\mathsf T}$ は $(0,0,0,1)^{\mathsf T}$ に移り、二度で戻ります。電荷の位相 $e^{iq\alpha}$ は共役で $e^{-iq\alpha}$ に変わります。ここで $q,\alpha$ は実数です。この操作は時空を反転する操作ではありません。

一方、粒子と反粒子の状態を同時に含むHilbert空間 $\mathcal H_+\oplus\mathcal H_-$ を考えます。二空間が同じ運動量・スピン模型のコピーであると仮定し、電荷作用素を $\widehat Q=\operatorname{diag}(qI,-qI)$ とします。

$$
C(f,g)=(g,f).
$$

これは複素線形なユニタリ作用素です。内積は二空間の内積の和なので交換しても保存され、$C^2=I$ です。

$$
C\widehat Q C^{-1}(f,g)
=C(qg,-qf)=(-qf,qg).
$$

よって $C\widehat Q C^{-1}=-\widehat Q$ です。二空間上のPoincare作用が同じなら、$C$ はその作用とも可換です。場の係数への反線形写像 $\mathcal K$ と状態空間で電荷を交換する線形な $C$ は異なる空間の操作です。前者を後者の反ユニタリ性の根拠にしてはいけません。

## 5. 表現論から場の理論への境界

| 操作 | 時空・運動量への作用 | 状態の作用 |
| --- | --- | --- |
| 空間反転 | $(t,\boldsymbol x)\mapsto(t,-\boldsymbol x)$、$(E,\boldsymbol p)\mapsto(E,-\boldsymbol p)$ | 通常はユニタリ。ヘリシティの符号を交換 |
| 時間反転 | $(t,\boldsymbol x)\mapsto(-t,\boldsymbol x)$、正エネルギー状態では $(E,-\boldsymbol p)$ へ | 非零非負エネルギーの時間発展を反転するなら反ユニタリ。ヘリシティを保存 |
| 電荷共役 | 時空を変えない | 粒子と反粒子を交換するユニタリな実装が可能 |

個々の対称性が現実の相互作用で保たれるとは限りません。ここまでで構成したのは対称変換の候補とその整合条件です。

スピン統計定理は、適切な相対論的局所量子場理論で整数スピンとBose統計、半整数スピンとFermi統計を結び付けます。正エネルギー、正定値Hilbert空間、真空とLorentz共変性、空間的に離れた場の局所性などを用いる定理です。$2\pi$ 回転の符号だけでは、二粒子を交換する演算子の符号は決まりません。

CPT定理も、適切な局所相対論的量子場理論で三操作を組み合わせた対称性の存在を述べます。連結Poincare群の表現、スペクトル条件、正定値内積、真空、局所性等を備えた場の理論で証明される結果であり、上の三操作が個別に対称であることを仮定する必要はありません。ここではいずれの定理も証明しません。詳細な仮定と証明は Weinberg, *The Quantum Theory of Fields*, Vol. I（[第5章：量子場と反粒子](https://www.cambridge.org/core/books/abs/quantum-theory-of-fields/quantum-fields-and-antiparticles/FEFAFD671BC62005298B8466DB554548)）などで扱う場の理論へ進んで学びます。

## 6. 総合演習

<a id="ex-lrep28-a01"></a>

#### LREP28-A01 時空行列の成分
- Level: A
- ID: LREP28-A01

$P_x,T_x,P_xT_x$ の行列式と $x=(2,1,0,3)$ の像を求め、計量による二乗を比較せよ。

<!-- solution-start -->
**詳細解答**

行列式は対角要素の積なので $-1,-1,1$。像は $(2,-1,0,-3)$、$(-2,1,0,3)$、$(-2,-1,0,-3)$ です。元の二乗は $-4+1+9=6$。各成分の符号だけを変えたため全て6です。積は行列式1でも時間向きを保存しません。
<!-- solution-end -->

<a id="ex-lrep28-a02"></a>

#### LREP28-A02 左右の交換
- Level: A
- ID: LREP28-A02

$A=\operatorname{diag}(3,1/3)$、$v=(1,0,0,0)^{\mathsf T}$ とする。$HS(A)v$ と $S(Q(A))Hv$ を比較せよ。

<!-- solution-start -->
**詳細解答**

$S(A)v=3v$、$Hv=(0,0,i,0)^{\mathsf T}$ です。従って前者は $(0,0,3i,0)^{\mathsf T}$。$Q(A)=\operatorname{diag}(1/3,3)$ で $Q(Q(A))=A$ なので、後者も右第一成分が3倍されて $(0,0,3i,0)^{\mathsf T}$ となります。[Dirac空間での空間反転](#prop-lrep28-dirac-parity)の具体例です。
<!-- solution-end -->

<a id="ex-lrep28-a03"></a>

#### LREP28-A03 時間反転の位相
- Level: A
- ID: LREP28-A03

$E_0=\operatorname{diag}(2,5)$、$v=(1,i)^{\mathsf T}$ とする。成分共役 $K$ による $KV(t)K^{-1}v$ を計算せよ。

<!-- solution-start -->
**詳細解答**

$K^{-1}v=(1,-i)^{\mathsf T}$。次に $V(t)$ を掛けると $(e^{-2it},-ie^{-5it})^{\mathsf T}$。共役すると $(e^{2it},ie^{5it})^{\mathsf T}$ なので $V(-t)v$ に一致します。$E_0$ は正定値で非零であり、[正エネルギーの時間反転条件](#prop-lrep28-time-reversal-energy)を満たします。
<!-- solution-end -->

<a id="ex-lrep28-a04"></a>

#### LREP28-A04 電荷の二つの符号
- Level: A
- ID: LREP28-A04

$\mathcal H_+=\mathcal H_-=\mathbb C$、$q=3$ とする。$v=(1,2i)$ に $C$ と $\widehat Q$ を両順序で作用させ、ノルムも比較せよ。

<!-- solution-start -->
**詳細解答**

$Cv=(2i,1)$ なので $\widehat QCv=(6i,-3)$。逆順では $\widehat Qv=(3,-6i)$、$C\widehat Qv=(-6i,3)$。両者は互いに負です。$v$ と $Cv$ のノルム二乗はともに $1+4=5$ です。
<!-- solution-end -->

<a id="ex-lrep28-b01"></a>

#### LREP28-B01 スピン1/2の時間反転
- Level: B
- ID: LREP28-B01

$\Theta=JK$ を二成分空間で考える。三つのPauli行列について $J\sigma_i^*=-\sigma_iJ$ を検算せよ。$\boldsymbol p=(0,0,2)$、$v=(1,0)^{\mathsf T}$ の反転後のヘリシティを求めよ。

<!-- solution-start -->
**詳細解答**

$\sigma_1=\begin{pmatrix}0&1\\1&0\end{pmatrix}$、$\sigma_2=-iJ$、$\sigma_3=\operatorname{diag}(1,-1)$ です。

$$
J\sigma_1=\sigma_3,\quad \sigma_1J=-\sigma_3,
$$

$$
J\sigma_2^*=iJ^2=-iI_2,\quad \sigma_2J=iI_2,
$$

$$
J\sigma_3=-\sigma_1,\quad \sigma_3J=\sigma_1.
$$

従って三つとも条件を満たします。反転前は $h(\boldsymbol p)=\sigma_3/2$ なので固有値 $1/2$。空間反転で内部列を保つと $h(-\boldsymbol p)v=-v/2$。時間反転では $\Theta v=(0,-1)^{\mathsf T}$ なので $-\sigma_3\Theta v/2=\Theta v/2$ です。[離散操作によるヘリシティの変化](#prop-lrep28-helicity-reflections)に一致します。
<!-- solution-end -->

<a id="ex-lrep28-b02"></a>

#### LREP28-B02 左右表現のテンソル積
- Level: B
- ID: LREP28-B02

左Weyl空間 $L=\mathbb C^2$ のテンソル積 $L\otimes L$ を対称成分と交代成分に分解せよ。$A=\operatorname{diag}(2,1/2)$ の各成分での作用と、不変収縮 $u^{\mathsf T}Jv$ の値を $u=(1,2)^{\mathsf T},v=(3,4)^{\mathsf T}$ で確認せよ。

<!-- solution-start -->
**詳細解答**

[LREP11の左右の分類](../LREP11/index.md#thm-lrep11-group)と[LREP8の二つのスピン1/2の一重項と三重項](../LREP8/index.md#thm-lrep8-singlet-triplet)を参照します。標準基底を $e_1,e_2$ とすると対称成分は $e_1\otimes e_1$、$e_1\otimes e_2+e_2\otimes e_1$、$e_2\otimes e_2$ の三つ、交代成分は $e_1\otimes e_2-e_2\otimes e_1$ の一つで張られます。作用 $A\otimes A$ は対称成分と交代成分を保ち、各基底の固有値は順に4,1,1/4と1です。対称成分は回転部分群で既約なので全群でも既約、交代成分は任意の行列式1の行列で不変です。従って

$$
(\tfrac12,0)\otimes(\tfrac12,0)=(1,0)\oplus(0,0).
$$

[LREP13のWeyl収縮の保存と一意性](../LREP13/index.md#prop-lrep13-scalar)で使う $J$ により $u^{\mathsf T}Jv=1\cdot4-2\cdot3=-2$。変換後は $Au=(2,1)^{\mathsf T}$、$Av=(6,2)^{\mathsf T}$ で $2\cdot2-1\cdot6=-2$ です。鏡映後は左空間を右空間に替えるので対称成分は $(0,1)$、交代成分は $(0,0)$ になります。
<!-- solution-end -->

<a id="ex-lrep28-b03"></a>

#### LREP28-B03 光子の偏極と鏡映
- Level: B
- ID: LREP28-B03

$k=(1,0,0,1)$、$e=(0,1,i,0)/\sqrt2$ とする。$e'=e+2k$ が同じ物理偏極であることを確かめ、$P_x$ による像の類とヘリシティを求めよ。

<!-- solution-start -->
**詳細解答**

$k\cdot e=0$、$k\cdot k=0$ なので $e'$ も直交条件を満たします。[光的偏極商空間](../LREP27/index.md#def-lrep27-polarization-quotient)で差は $2k$ なので同じ類です。

$P_xk=(1,0,0,-1)=k'$、$P_xe=-e$ です。$P_xe'= -e+2k'$ なので像も同じ類 $[-e]$ になります。$z$ 軸まわり角 $\theta$ の回転で $e$ は $e^{-i\theta}e$ に移りますが、$-z$ 軸を正とする回転は角 $-\theta$ の $z$ 回転です。従って $[-e]$ の位相は $e^{i\theta}$、ヘリシティは $-1$。全体の符号は位相であり、ヘリシティの反転の理由は回転軸の反転です。
<!-- solution-end -->

<a id="ex-lrep28-c01"></a>

#### LREP28-C01 正質量の粒子とDirac場を往復する
- Level: C
- ID: LREP28-C01

$m=4$、$p=(5,0,0,3)$、$R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}\in SU(2)$ とする。標準boost $b(p)$、回転後の運動量 $p'$、Wigner回転 $b(p')^{-1}Rb(p)$ を求めよ。次に正周波数のDirac係数 $u_s(p)=\sqrt m(b(p)\chi_s,i b(p)^{-1}\chi_s)^{\mathsf T}$（$\chi_1,\chi_2$ は標準正規直交基底）の二列を求め、場の回転と内部スピンの回転を比較せよ。最後に二列のスピン和を計算せよ。

<!-- solution-start -->
**詳細解答**

[LREP23の標準boost](../LREP23/index.md#def-lrep23-standard-boost)に代入すると

$$
b(p)=\operatorname{diag}(\sqrt2,1/\sqrt2)=B.
$$

$5^2-3^2=16=m^2$ なので質量殻上です。[SU(2)からSO(3)への二重被覆](../LREP5/index.md#thm-lrep5-double-cover)と[四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)によれば

$$
R\operatorname{diag}(8,2)R^\dagger
=\operatorname{diag}(2,8).
$$

よって $p'=(5,0,0,-3)$、$b(p')=B^{-1}$ です。$RB=B^{-1}R$ を行列積で確かめると

$$
b(p')^{-1}Rb(p)=BRB=R.
$$

これが[LREP23のWigner回転](../LREP23/index.md#def-lrep23-wigner-rotation)です。内部空間は二次元で、そこで $R$ が作用します。

[LREP20の正質量のDiracモードの構成](../LREP20/index.md#prop-lrep20-boost-modes)に $B$ を代入すると

$$
u_1=(2\sqrt2,0,i\sqrt2,0)^{\mathsf T},
$$

$$
u_2=(0,\sqrt2,0,2i\sqrt2)^{\mathsf T}.
$$

$S(R)=\operatorname{diag}(R,R)$ なので $S(R)u_1=(0,2\sqrt2,0,i\sqrt2)^{\mathsf T}$、$S(R)u_2=(-\sqrt2,0,-2i\sqrt2,0)^{\mathsf T}$。一方 $B^{-1}$ で作った $u_1(p'),u_2(p')$ はそれぞれ $(\sqrt2,0,2i\sqrt2,0)^{\mathsf T}$、$(0,2\sqrt2,0,i\sqrt2)^{\mathsf T}$。$R\chi_1=\chi_2$、$R\chi_2=-\chi_1$ と一致します。これは[共変モード係数](../LREP26/index.md#def-lrep26-mode-intertwiner)の条件を四次元場と二次元内部空間の間で確認したものです。

次に $M=(u_1,u_2)$ を四行二列の行列とします。$M=2\begin{pmatrix}B\\iB^{-1}\end{pmatrix}$ とブロック列で書けるため

$$
M^\dagger H=2(B^{-1},-iB).
$$

従って

$$
MM^\dagger H
=4\begin{pmatrix}I_2&-iB^2\\iB^{-2}&I_2\end{pmatrix}.
$$

$4B^2=\operatorname{diag}(8,2)=5I_2+3\sigma_3$、$4B^{-2}=5I_2-3\sigma_3$ です。従って和は $4I_4+K_p$ で、ここで

$$
K_p=\begin{pmatrix}
0&-i(5I_2+3\sigma_3)\\
i(5I_2-3\sigma_3)&0
\end{pmatrix}.
$$

これは[LREP20のDiracモードの規格化とスピン和](../LREP20/index.md#thm-lrep20-spin-sums)の $K+mI_4$ に一致します。$K_p^2=16I_4$ は非対角ブロックの積 $(5I_2+3\sigma_3)(5I_2-3\sigma_3)=16I_2$ で確かめられます。$M^\dagger HM=8I_2$ なので二列は独立です。二次元の内部自由度を四成分の係数に埋め込む写像であり、四成分全てを独立な粒子自由度として数えません。
<!-- solution-end -->

## 7. 全系列を振り返る

回転の二重被覆から半整数スピンを得て、Lorentz変換の被覆から左右のWeyl表現を作りました。Clifford代数で計量を行列積に移し、Diracモードの方程式とスピン和を得ました。粒子側では正エネルギーの運動量軌道を選び、固定群の表現から波束全体へのユニタリ作用を作りました。最後に共変モード係数で二つの表現をつなぎ、光子の場合にはゲージ方向を商で取り除きました。

この順序を逆にたどって、粒子の質量とスピン・ヘリシティを指定したとき、どの表現空間とモード係数が必要かを説明できれば、本系列の中心問いに答えられます。局所量子場の構成と統計、相互作用、曲がった時空でのスピノル束は、それぞれ次の理論の課題です。
