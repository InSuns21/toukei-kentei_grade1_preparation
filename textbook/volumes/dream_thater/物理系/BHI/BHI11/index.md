# BHI11 相補性・no-cloning・観測者

<!-- definition-example-audit: strict -->

## 1. 矛盾が観測できないなら、矛盾は消えるのか

[BHI10のAMPSの三部エントロピー制約](../BHI10/index.md#thm-bhi10-amps-tradeoff)では、早期放射 $R$、後期外部モード $b$、内部相手 $c$ が独立の量子部分系なら、放射の精細エントロピーの減少とほぼ純粋な地平線内外対を同時に要求できないことを確かめました。では、内部に落ちる観測者と外部の放射を回収する観測者が、決して同じ実験結果を突き合わせられなければどうでしょうか。

**ブラックホール相補性**は、外部からのユニタリな情報回収と、落下者にとっての滑らかな地平線を、一つの観測者が同時にアクセスする二つの独立コピーとして扱う必要はない、という考え方です。単に「見る人が違うから量子状態を二つ複製してよい」と主張するものではありません。ここには区別すべき二問があります。

1. **数学的な複製の可否**：未知の量子状態を、共通のHilbert空間の独立な二因子へ同時に複製できるか。
2. **操作的な比較の可否**：外部で情報を回収したBobが落下したAliceの内部情報を、特異点へ達する前に確かめられるか。

第1問には[QINF12の複製不能定理](../../../応用系/QINF/QINF12/index.md#thm-qinf12-pure-no-cloning)が答えます。第2問には時空の因果構造、放射の待ち時間、復号時間、送信できる信号のエネルギーが必要です。本講ではまず両者の違いを有限次元模型で確認し、その後、固定Schwarzschild背景を使って第2問の必要条件を計算します。

## 2. 「二つのコピー」と「一人が比較できる」は別の条件

[厳密な量子状態複製の定義](../../../応用系/QINF/QINF12/index.md#def-qinf12-cloning)では、入力に依存しない一つの量子チャネルが、非直交な未知状態から二つの独立な積出力を作ることを要求します。対して、複数の観測者がそれぞれ異なる記述を持つこと自体は、独立な二量子レジスタの存在を意味しません。

ここで「比較実験」を定める目的は、複製の代わりに弱い仮定をこっそり置くことではありません。Bobが外部で回収した量子情報と、Aliceの内部で保持された量子情報の双方を**同じ実験手順**で検査するなら何が必要かを明示するためです。

<a id="def-bhi11-comparison-protocol"></a>

<!-- formal-statement-start -->
> **定義（内外情報の比較プロトコル）**
>
> 入力として有限次元Hilbert空間 $H$ の未知の純粋状態を一個用いる。その密度演算子を次のように書く。
>
$$
\rho_\psi=\lvert\psi\rangle\langle\psi\rvert
$$
>
> Aliceは地平線を通過し、内部側の記録 $A$ を保持する。Bobは外部放射から量子レジスタ $B$ を回収する。
> その後Bobが落下し、$A$ と $B$ に共同で操作できる手順を**内外情報の比較プロトコル**とする。
>
> さらに $A,B$ が独立な二因子で、同一の入力非依存量子チャネルにより、許されたすべての入力について
>
$$
\rho_{AB}(\psi)=\rho_\psi^A\otimes\rho_\psi^B
$$
>
> となる要求を、**二コピーの厳密な回収**と呼ぶ。比較プロトコルが時空上で実行可能かと、この二コピー条件が量子力学的に実現可能かは異なる問いである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi11-comparison-protocol -->
**定義の確認**：二量子ビットに空白 $\lvert0\rangle_B$ を付け、CNOTで $\lvert0\rangle_A\lvert0\rangle_B\mapsto\lvert00\rangle$、$\lvert1\rangle_A\lvert0\rangle_B\mapsto\lvert11\rangle$ とします。二つの直交基底入力については二コピー条件を満たします。しかし $\lvert+\rangle=(\lvert0\rangle+\lvert1\rangle)/\sqrt2$ なら、線形性から同じ操作の出力は

$$
\lvert\Phi\rangle_{AB}=\frac{\lvert00\rangle+\lvert11\rangle}{\sqrt2},
\qquad
\operatorname{Tr}_B\lvert\Phi\rangle\langle\Phi\rvert=\frac{I_2}{2}
$$

となります。必要な $\lvert+\rangle\lvert+\rangle$ ではなく、$A$ 単独の状態さえ $\lvert+\rangle\langle+\rvert$ ではありません。ゆえに**二つの直交記録を複写すること**と**任意の未知の量子状態を複製すること**は違います。これは二コピー条件の全入力に対する検査です。
<!-- definition-example-end -->

非直交な $\lvert\psi\rangle,\lvert\phi\rangle$ の内積を $q=\langle\psi\vert\phi\rangle$ とすると、環境を含む等長発展で厳密二コピーを作れれば、[QINF12の複製不能定理の証明](../../../応用系/QINF/QINF12/index.md#thm-qinf12-pure-no-cloning)と同様に

$$
|q|\le |q|^2
$$

が必要です。$0<|q|<1$ では不可能です。この結論はBobが内部へ入るかどうかに依存しません。**もし**共通状態の二つの独立因子に未知状態の厳密コピーがあると宣言すれば、その時点で量子力学と衝突します。

### 相補的な作用素表示と本当の二コピー

反対に、一つの論理情報に関わる作用素の一部分が複数の場所で表せることは、未知状態を複製することではありません。三量子ビットの二次元部分空間

$$
H_{\rm code}=\operatorname{span}\{\lvert000\rangle,\lvert111\rangle\},
\quad
\lvert0_L\rangle=\lvert000\rangle,\quad
\lvert1_L\rangle=\lvert111\rangle
$$

を考えます。$Z\lvert0\rangle=\lvert0\rangle$、$Z\lvert1\rangle=-\lvert1\rangle$ と定め、$Z_j$ を第 $j$ 因子だけに作用する演算子とします。$Z_1,Z_2,Z_3$ はいずれも符号空間上で同じ論理 $Z_L$ として働きます。しかし $X\lvert0\rangle=\lvert1\rangle$、$X\lvert1\rangle=\lvert0\rangle$ に対し、単独の $X_1$ は $\lvert000\rangle$ を $\lvert100\rangle\notin H_{\rm code}$ へ移し、論理反転は $X_L=X_1X_2X_3$ で実装されます。

一般の $\lvert\psi_L\rangle=\alpha\lvert000\rangle+\beta\lvert111\rangle$（$|\alpha|^2+|\beta|^2=1$）を第一因子へ縮約すると

$$
\rho_1=|\alpha|^2\lvert0\rangle\langle0\rvert+
|\beta|^2\lvert1\rangle\langle1\rvert
$$

です。$\alpha\beta\ne0$ なら混合状態であり、各因子に $\lvert\psi\rangle$ の独立コピーが存在するわけではありません。これは論理情報を三つの物理因子へ分散して表す最小の例です。**同じ一部の観測量を表せること**と**全論理量子状態を二つ複製できること**を区別しましょう。実際の重力内外作用素の同一視が成立するかは、この符号例だけからは導けません。

## 3. AliceとBobの因果図：いつ信号が届くか

外部のBobが放射を収集・復号してから地平線を越え、先に落ちたAliceから信号を受け取る状況を考えます。時間を比較するため、非回転・無電荷で質量 $M\gg1$ のSchwarzschildブラックホールを、蒸発を無視できる時間帯の**固定背景**とします。以下、$G=c=\hbar=1$、Killing時間は遠方静止観測者の時間です。

半径 $r>2M$ で、光が遠方へ向かう遅延座標 $u=t-r_*$ と、内向き光に沿う進行座標 $v=t+r_*$ を置きます。ここで

$$
r_*=r+2M\ln\left|\frac r{2M}-1\right|,
\quad
U=-\exp\left(-\frac{u}{4M}\right),
\quad
V=\exp\left(\frac{v}{4M}\right).
$$

地平線を越えて解析的に延長したKruskal座標では、未来地平線が $U=0,V>0$、ブラックホール内部が $U>0,V>0$ となり、未来の曲率特異点は $UV=1$ です。将来向きの内部光線では $U$ または $V$ が一定になります。これらの座標と特異点の位置は以下で式から検算します。

**因果図（$U,V$ 座標の関係を示す模式図・距離と傾きは非縮尺）**：

    V（未来）↑       内部：U>0, V>0
             │        特異点 UV=1（到達限界）
       V_B   ● Bobの入射 ────╲
             │      ↑  信号 U=U_s 一定
             │      │         ╲
       V_A   ● Aliceの入射 →送信点
             │
             └───────────────→ U
             U=0（未来地平線）

この模式図の矢印は位置関係の説明であり、時間的軌道やヌル線の正確な傾きを表しません。矢印の傾きから到達可能性は決められません。以下では座標の積 $UV$ を使い、信号の進める範囲を調べます。Bobの地平線交点を $(0,V_B)$、Aliceが内側で外向き光信号を送る点を $(U_s,V_s)$（$U_s>0$）とします。外向き光線は $U=U_s$ に沿って $V$ を増やし、$U_sV=1$ で特異点に達します。

<a id="def-bhi11-causal-window"></a>

<!-- formal-statement-start -->
> **定義（地平線内信号の因果的到達窓）**
>
> Schwarzschild内部領域を $U>0$、$V>0$、$UV<1$ とする。Aliceの発信点を $(U_s,V_s)$ とする。
> Bobの未来地平線通過点を $(0,V_B)$ とし、$V_s<V_B$ を仮定する。Aliceの外向き動径ヌル信号は $U=U_s$ に沿う。
> この信号が少なくとも $V=V_B$ の断面まで特異点に達せず進むために要求する条件を
>
$$
U_sV_B<1
$$
>
> とする。この条件を満たす $U_s$ の範囲を**因果的到達窓**という。Bob本人の世界線と光線が交差することは、この必要条件とは別に判定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi11-causal-window -->
**定義の確認**：$V_A=1$、$V_B=8$ を選び、Aliceが $V_s=3/2$ で発信したとします。$U_s=1/16$ なら $U_sV_s=3/32<1$ で発信点は内部、$U_sV_B=1/2<1$ で光線はBobの入射断面まで延長できます。一方 $U_s=1/4$ なら発信点は内部（$U_sV_s=3/8<1$）ですが、$U_sV_B=2>1$ なので光線はその断面より前に特異点へ達します。前者も、Bobが実際に受信することまでは保証しません。
<!-- definition-example-end -->

## 4. 待ち時間が信号の送信窓を指数的に狭める

Kruskal変換を単なる公式として使わず、Schwarzschild計量から確認します。動径方向の部分は

$$
ds_{\rm radial}^2=
-\left(1-\frac{2M}{r}\right)du\,dv
=-\frac{32M^3}{r}e^{-r/(2M)}dU\,dV.
$$

また座標の積は

$$
UV=\left(1-\frac r{2M}\right)e^{r/(2M)}.
$$

したがって $r=2M$ で $UV=0$、$r=0$ で $UV=1$ です。AliceとBobの入射を同じKilling時間変換でずらすと、地平線上の $V$ は指数的に伸びます。ここで $\Delta t\ge0$ はBobの入射がAliceより遅れる**遠方基準の時間移動量**であり、地平線上の発散するSchwarzschild座標 $t$ を直接差し引く操作ではありません。

$$
\frac{V_B}{V_A}=\exp\left(\frac{\Delta t}{4M}\right).
$$

Aliceが地平線を横切る際の、単位質量当たりの保存Killingエネルギーを $E_0>0$ とし、同じ動径測地線を考えます。地平線で $g_{UV}=-8M^2/e$、$\partial_t=(V\partial_V-U\partial_U)/(4M)$ ですから、Aliceの四速度 $w^a=dx^a/d\tau$ について

$$
E_0=-g(\partial_t,w)
=\frac{2M}{e}V_A\left.\frac{dU}{d\tau}\right|_{U=0}.
$$

この一行の確認には、地平線で $U=0$ なので $\partial_t^U=0$ となり、計量の非零交差成分 $g_{UV}$ だけが残ることを使いました。したがって

$$
\left.\frac{dU}{d\tau}\right|_{U=0}
=\frac{eE_0}{2MV_A}.
$$

<a id="thm-bhi11-causal-waiting"></a>

<!-- formal-statement-start -->
> **定理（Schwarzschild模型の待ち時間と送信窓）**
>
> 質量 $M>0$ の固定Schwarzschild時空を考える。Aliceは保存Killingエネルギー $E_0>0$ の滑らかな動径自由落下で未来地平線を横切る。
> Aliceの地平線交点の進行座標を $V_A>0$ とする。その後、固有時間 $\Delta\tau>0$ で外向き動径光信号を送る。
> Bobは遠方基準の時間移動量 $\Delta t>0$ だけ遅れて地平線を横切る。その交点の座標 $V_B>0$ は
>
$$
\frac{V_B}{V_A}=\exp\left(\frac{\Delta t}{4M}\right)
$$
>
> を満たす。
>
> $\Delta\tau/M\to0$ の近地平線極限で、信号がBobの入射断面より前に特異点へ達しないためには、先頭次数で
>
$$
\boxed{\quad
\Delta\tau\ \lesssim\
\frac{2M}{eE_0}\exp\left(-\frac{\Delta t}{4M}\right)
\quad}
$$
>
> が必要である。$\lesssim$ はここでは比の先頭次数による上界を表す。この必要条件はBobの実際の受信、復号の成功、蒸発時空での同じ評価を保証しない。
<!-- formal-statement-end -->

### 証明の見取り図

Kruskal座標上で自由落下の $U$ の増分を固有時間で一次展開し、[到達窓の条件](#def-bhi11-causal-window) $U_sV_B<1$ へ入れます。AliceとBobの地平線交点の $V$ の比は、外部待ち時間を指数関数へ変換します。

<!-- proof-start -->
### 証明

Aliceが地平線を越えた瞬間を $\tau=0$ とします。未来地平線上のKruskal座標は正則で、動径測地線の四速度は有限です。前節で導いた $dU/d\tau$ の値をTaylor展開へ代入すると

$$
U_s=\frac{eE_0}{2MV_A}\Delta\tau
+O\left(\frac{1}{V_A}\left(\frac{\Delta\tau}{M}\right)^2\right).
$$

大きい $M$ の族でこの $O$ 項を一様に扱うときには、$E_0$ と無次元の落下条件を固定します。光信号は発信後 $U=U_s$ に沿って進むため、[因果的到達窓](#def-bhi11-causal-window)を満たすなら

$$
1>U_sV_B
=\frac{eE_0}{2M}\Delta\tau\frac{V_B}{V_A}
+O\left(\left(\frac{\Delta\tau}{M}\right)^2\frac{V_B}{V_A}\right).
$$

地平線上では $\partial_t$ による時間移動 $\Delta t$ が $V\mapsto e^{\Delta t/(4M)}V$ を与えるので、$V_B/V_A=e^{\Delta t/(4M)}$ です。一次項を使って整理すれば

$$
\frac{eE_0}{2M}\Delta\tau\,e^{\Delta t/(4M)}
\ \lesssim\ 1,
\qquad
\Delta\tau\ \lesssim\
\frac{2M}{eE_0}e^{-\Delta t/(4M)}.
$$

誤差項の相対比は $\Delta\tau/M$ の次数なので、指定した近地平線極限で先頭評価が成立します。ここで使ったのは特異点へ到達する前の**必要条件だけ**であり、Bobの世界線と信号が交わることの十分条件は導いていません。
<!-- proof-end -->

### 信号のエネルギーまで評価する

Aliceの局所慣性系で、長さ $\Delta\tau$ 以下の時間幅に収まる**典型的な一周波数尺度の波束**を送るとします。その波束の特性エネルギーに $\omega_{\rm loc}\ge\eta/\Delta\tau$（$\eta>0$ は固定の無次元係数）を要求するプロトコルなら、[待ち時間の必要条件](#thm-bhi11-causal-waiting)から

$$
\omega_{\rm loc}\ \gtrsim\
\frac{\eta eE_0}{2M}\exp\left(\frac{\Delta t}{4M}\right)
$$

を得ます。波束の時間周波数集中に関する**追加仮定**を明示しており、一般の信号すべてに対する「エネルギー時間不確定性の厳密な普遍定理」としては使いません。

$M\gg1$ で $\Delta t=4\alpha M\ln M$（$\alpha>0$ は固定）なら

$$
\omega_{\rm loc}\ \gtrsim\
\frac{\eta eE_0}{2}\,M^{\alpha-1}.
$$

特に $\alpha>2$ では $\omega_{\rm loc}/M\to\infty$ となり、信号のエネルギーを背景ブラックホールの質量より小さい摂動として扱う条件と両立しなくなります。$\alpha=2$ では同じ次数に過ぎず、係数、軌道、復号・操作の詳細が重要です。

[BHI8のPage時刻の準静的推定](../BHI8/index.md)で想定したように回収までの時間が $M^3$ の次数なら、指数因子は $\exp(\text{定数}\,M^2)$ の次数になります。ただし、早く回収できるとする模型で $\Delta t\sim M\ln M$ にまで短縮できるとき、この質量比較だけでは複製検証の不可能性を一般に結論できません。次講BHI12ではそのような情報回収模型を具体化します。

## 5. 復号と入射の順序を記録する

Bobが同じ量子情報を外部で得るには、放射が十分に届くまでの待機 $t_{\rm collect}$、回収チャネルの復号 $t_{\rm decode}$、さらに落下のための準備・移動 $t_{\rm travel}$ が必要です。これらを外部Killing時間の非負量で見積もれる設定なら

$$
\Delta t\ge
t_{\rm collect}+t_{\rm decode}+t_{\rm travel}.
$$

これはどの時間も自動的に既知という式ではなく、プロトコルで実際に採用した各下界を足すための帳簿です。「放射に情報が符号化されている」と「Bobが量子レジスタへ復号できた」と「その後に内部で比較できる」は別々の段階です。

[QINF12の複製不能定理](../../../応用系/QINF/QINF12/index.md#thm-qinf12-pure-no-cloning)は復号計算の難しさとは無関係に成立します。他方、前節の指数的な送信エネルギーは**固定背景の外部待ち時間**に依存します。Harlow–Haydenが論じる復号計算量の障壁も、さらに別の動力学的・計算量的仮定を要します。ここで有限の実行時間の厳密な下界を証明したことにはなりません。

| 主張 | 前提と必要な検査 | 本講での結論 |
| --- | --- | --- |
| 厳密二コピーの不存在 | 独立な二出力、共通CPTP写像、非直交な未知入力 | QINF12により不可能 |
| 特異点前の送信窓 | 固定Schwarzschild、動径信号、$U_sV_B<1$ | 待機時間に対し指数的に縮小 |
| 大エネルギーによる操作障壁 | 固定の波束周波数条件と十分長い待機 | 条件付きで $\omega_{\rm loc}\gg M$ |
| 復号計算量の障壁 | 特定の符号化・計算モデルと実装資源 | 本講では一般下界を仮定しない |
| AMPS三部不等式 | 同一状態の独立 $R,b,c$ と二つのエントロピー要請 | 一観測者の可否と無関係に成立 |

## 6. 相補性だけでAMPSは解けたか

ここが本講の重要な限界です。[BHI10のAMPS制約](../BHI10/index.md#thm-bhi10-amps-tradeoff)は、三部系が同一の状態 $\rho_{Rbc}$ の独立な部分系であると仮定した数学的不等式でした。具体的には

$$
S(b|R)+S(b|c)\ge0.
$$

一方、「BobがAliceから信号を受け取るのは難しい」という結論は、観測者の操作手順と時空に関する条件です。どれほど実験が難しくても、**同じ独立三部状態の上で** $S(b|R)<0$ と $S(b|c)<0$ を同時に成立させることはできません。

対照的な二状態を検算すると分かります。$\rho_R\otimes\lvert\Phi\rangle\langle\Phi\rvert_{bc}$ では

$$
S(b|R)=+\ln2,\qquad S(b|c)=-\ln2,
$$

$\lvert\Phi\rangle\langle\Phi\rvert_{Rb}\otimes\lvert0\rangle\langle0\rvert_c$ では

$$
S(b|R)=-\ln2,\qquad S(b|c)=+\ln2.
$$

どちらも不等式を満たしますが、どちらも二つの条件を同時に負にはできません。観測者の到達不能性を追加しても、この代数計算は変わりません。

相補性で矛盾を回避するなら、**どの記述が同じ物理自由度に対応し、どの演算子を一つの状態に同時に割り当ててよいのか**を明らかにする必要があります。第2節の符号空間は「同じ論理作用素の別表示」と「独立コピー」の違いを示す模型ですが、地平線の物理で成立するという証明ではありません。重力における分割と局所代数の課題はBHI15で改めて扱います。

相補性の提案と議論の射程については、[Harlowの総説](https://arxiv.org/abs/1409.1231)、[Hayden–Preskillの原論文](https://arxiv.org/abs/0708.4025)、[AMPS原論文](https://arxiv.org/abs/1207.3123)を参照できます。

## 7. 演習と詳細解答

特に断らなければ有限次元の複合量子系、自然対数、$G=c=\hbar=1$ とします。$M\gg1$ を含む漸近評価では $E_0,\eta$ は正の固定定数です。

### Level A：条件を計算して判定する

<a id="ex-bhi11-a01"></a>
#### BHI11-A01 非直交入力を複製できるか

- Level: A

入力を $\lvert0\rangle$ と $\lvert+\rangle=(\lvert0\rangle+\lvert1\rangle)/\sqrt2$ に限る。両者を一つの決定論的等長発展で二コピーにできると仮定し、入力の内積の絶対値と二コピー出力の内積の絶対値を比べよ。環境を含めた場合の不等式も記せ。

<!-- solution-start -->
**詳細解答**：入力内積は $q=\langle0|+\rangle=1/\sqrt2$。二コピーの積状態の内積は $q^2=1/2$ です。環境なしの等長写像なら内積を保存するため $1/\sqrt2=1/2$ を要求して矛盾します。環境込みの等長写像なら、純粋な二コピー出力を得るとき環境は積状態になり、環境内積の絶対値が1以下なので $|q|=|q|^2|\langle e_0|e_+\rangle|\le|q|^2$。$1/\sqrt2>1/2$ なので同様に矛盾します。[QINF12の複製不能定理](../../../応用系/QINF/QINF12/index.md#thm-qinf12-pure-no-cloning)の具体例です。
<!-- solution-end -->

<a id="ex-bhi11-a02"></a>
#### BHI11-A02 論理情報の三つの表示

- Level: A

$H_{\rm code}=\operatorname{span}\{\lvert000\rangle,\lvert111\rangle\}$ で $Z_1,Z_3$ の作用が同じであることを基底に作用させて確認せよ。$\lvert\psi_L\rangle=\sqrt3\,\lvert000\rangle/2+\lvert111\rangle/2$ の第一因子の縮約状態と純粋性を判定し、この三因子が三コピーではない理由を説明せよ。

<!-- solution-start -->
**詳細解答**：$Z_1\lvert000\rangle=Z_3\lvert000\rangle=\lvert000\rangle$、$Z_1\lvert111\rangle=Z_3\lvert111\rangle=-\lvert111\rangle$ です。符号空間の基底で一致するので任意の線形結合に対して一致します。全状態の密度演算子を展開すると非対角項 $\sqrt3\,\lvert000\rangle\langle111\rvert/4$ とその随伴が出ますが、残る二因子の部分トレースには $\langle11|00\rangle=0$ が掛かり消えます。ゆえに $\rho_1=\operatorname{diag}(3/4,1/4)$、$\operatorname{Tr}\rho_1^2=9/16+1/16=5/8<1$ です。局所状態は混合で未知の論理純粋状態を各因子に複製していません。
<!-- solution-end -->

<a id="ex-bhi11-a03"></a>
#### BHI11-A03 地平線内での発信点

- Level: A

$V_s=3/2,V_B=8$ とする。$U_s=1/16$ と $U_s=1/4$ の発信点がそれぞれ $UV<1$ の内部領域にあることを調べ、[因果的到達窓](#def-bhi11-causal-window)の必要条件が成立する方を選べ。

<!-- solution-start -->
**詳細解答**：$U_s=1/16$ のとき発信点では $U_sV_s=3/32<1$、Bobの入射断面では $U_sV_B=8/16=1/2<1$ なので必要条件が成立します。$U_s=1/4$ のとき発信点は $U_sV_s=3/8<1$ ですが、入射断面では $U_sV_B=2>1$ なので途中で $UV=1$ に達します。最初の信号でもBobの世界線との交差まで証明したわけではありません。
<!-- solution-end -->

<a id="ex-bhi11-a04"></a>
#### BHI11-A04 Killing時間の移動

- Level: A

Aliceの地平線交点を $V_A=1$ とし、Bobの入射までの時間移動量を $\Delta t=4M\ln 8$ とする。$V_B$ と、因果的到達窓にある $U_s$ の上界を計算せよ。

<!-- solution-start -->
**詳細解答**：Kruskalの定義では時間移動 $\Delta t$ により $V$ が $e^{\Delta t/(4M)}$ 倍になります。$e^{(4M\ln8)/(4M)}=8$ なので $V_B=8V_A=8$。[到達窓](#def-bhi11-causal-window)の必要条件 $U_sV_B<1$ に代入すると $U_s<1/8$ です。$U_s=1/8$ は $UV=1$ 上であり、許された内部光路には含めません。
<!-- solution-end -->

### Level B：時空と情報の仮定を連結する

<a id="ex-bhi11-b01"></a>
#### BHI11-B01 計量と落下者の四速度

- Level: B

$u=t-r_*$、$v=t+r_*$、$U=-e^{-u/(4M)}$、$V=e^{v/(4M)}$ を用いてSchwarzschild動径計量をKruskal形へ変換せよ。$r=2M$ の $g_{UV}$ を求め、保存Killingエネルギー $E_0=-g(\partial_t,w)$ から $(dU/d\tau)_{U=0}$ を導け。

<!-- solution-start -->
**詳細解答**：$du=-4M\,dU/U$、$dv=4M\,dV/V$ です。また $UV=(1-r/(2M))e^{r/(2M)}$ なので

$$
-\left(1-\frac{2M}{r}\right)du\,dv
=16M^2\frac{1-2M/r}{UV}\,dU\,dV
=-\frac{32M^3}{r}e^{-r/(2M)}dU\,dV.
$$

混合微分の係数は $2g_{UV}$ なので $g_{UV}=-16M^3e^{-r/(2M)}/r$、$r=2M$ では $g_{UV}=-8M^2/e$ です。$\partial_t=(V\partial_V-U\partial_U)/(4M)$ を地平線 $U=0$ で使い、

$$
E_0=-g_{UV}\frac{V_A}{4M}\frac{dU}{d\tau}
=\frac{2M}{e}V_A\frac{dU}{d\tau}
$$

を得ます。よって $(dU/d\tau)_{U=0}=eE_0/(2MV_A)$。係数2は $ds^2=2g_{UV}dU\,dV$ に由来します。
<!-- solution-end -->

<a id="ex-bhi11-b02"></a>
#### BHI11-B02 待機時間とエネルギーの次数

- Level: B

固定 $E_0,\eta>0$ に対し $\Delta t=4\alpha M\ln M$（$M\gg1$、$\alpha>0$）を仮定する。[待ち時間と送信窓](#thm-bhi11-causal-waiting)から $\Delta\tau$ と $\omega_{\rm loc}$ の次数を求め、$\alpha>2,\alpha=2,0<\alpha<2$ を比較せよ。

<!-- solution-start -->
**詳細解答**：まず $e^{\Delta t/(4M)}=e^{\alpha\ln M}=M^\alpha$。定理に代入して $\Delta\tau\lesssim 2M^{1-\alpha}/(eE_0)$。波束条件 $\omega_{\rm loc}\ge\eta/\Delta\tau$ を合わせると $\omega_{\rm loc}\gtrsim(\eta eE_0/2)M^{\alpha-1}$。質量で割れば $\omega_{\rm loc}/M\gtrsim(\eta eE_0/2)M^{\alpha-2}$ です。$\alpha>2$ なら比は発散、$\alpha=2$ なら定数次数、$0<\alpha<2$ ではこの下界の比は0へ行き、**低エネルギー信号の存在を保証はしません**。比較はあくまで必要下界からの判定です。
<!-- solution-end -->

<a id="ex-bhi11-b03"></a>
#### BHI11-B03 観測できなければAMPS不等式も消えるか

- Level: B

$R,b,c$ が各二準位で、状態 (i) $\lvert0\rangle_R\otimes\lvert\Phi\rangle_{bc}$ と (ii) $\lvert\Phi\rangle_{Rb}\otimes\lvert0\rangle_c$ を考える。各状態の $S(b|R),S(b|c)$ を求め、Bobが内部へ入れないと仮定しただけで両条件付きエントロピーを負にできるか判定せよ。

<!-- solution-start -->
**詳細解答**：(i) では $R$ が純粋、$bc$ がBell対です。したがって縮約エントロピーは

$$
S(R)=0,\quad S(Rb)=\ln2,\quad
S(bc)=0,\quad S(c)=\ln2.
$$

条件付きエントロピーの定義に代入すると

$$
S(b|R)=S(Rb)-S(R)=\ln2,\qquad
S(b|c)=S(bc)-S(c)=-\ln2.
$$

(ii) では $Rb$ がBell対、$c$ が純粋です。そのため

$$
S(R)=\ln2,\quad S(Rb)=0,\quad
S(bc)=\ln2,\quad S(c)=0,
$$

から

$$
S(b|R)=-\ln2,\qquad S(b|c)=\ln2
$$

となります。どちらも和は0で[AMPS制約](../BHI10/index.md#thm-bhi10-amps-tradeoff)を満たします。Bobの入射禁止は状態の固有値を変えません。同じ独立三部状態に二つの負の条件付きエントロピーは作れないため、AMPSの仮定を変更するなら、同時適用する部分系・状態・近真空条件を具体的に見直す必要があります。
<!-- solution-end -->

<a id="ex-bhi11-b04"></a>
#### BHI11-B04 回収・復号・移動の時間予算

- Level: B

$V_A=1,E_0=1$ とし、$t_{\rm collect}=4M\ln M$、$t_{\rm decode}=4M\ln M$、$t_{\rm travel}=M$ がいずれも外部時間の必要下界とする。Bobがすべて実施してから入射するなら、$V_B$ の下界とAliceの送信固有時間の上界の先頭次数を求めよ。$\eta$ 固定の波束のエネルギーを $M$ と比較せよ。

<!-- solution-start -->
**詳細解答**：合計から $\Delta t\ge8M\ln M+M$。したがって $V_B/V_A=e^{\Delta t/(4M)}\ge M^2e^{1/4}$、$V_B\ge M^2e^{1/4}$ です。[待ち時間の定理](#thm-bhi11-causal-waiting)より $\Delta\tau\lesssim(2/e)M\cdot(M^2e^{1/4})^{-1}=2e^{-1/4}/(eM)$。波束条件を課すと $\omega_{\rm loc}\gtrsim(\eta e/2)e^{1/4}M$。$M$ と同じ次数なので、**この下界だけでは** $\omega_{\rm loc}\gg M$ は言えません。復号時間を無視すれば $\Delta t$ の下界が弱くなり、同じ強さの結論も得られません。
<!-- solution-end -->

### Level C：no-cloning・因果条件・AMPSを同時に区別する

<a id="ex-bhi11-c01"></a>
#### BHI11-C01 二コピーを検証する思考実験の監査

- Level: C

$M\to\infty$ の固定Schwarzschild模型で $E_0,\eta$ を固定する。Aliceが未知の非直交二状態から一つの量子状態を持って落下し、Bobが外部回収・復号後 $\Delta t=4\alpha M\ln M$ で落下するとする（$\alpha>0$）。BobのためAliceが局所波束を送るプロトコルについて次を解け。

1. $V_B/V_A$、$U_s$ の因果的必要上界、Aliceの $\Delta\tau$ の先頭上界を求めよ。
2. $\omega_{\rm loc}/M$ の下界を示し、$\alpha>2$ の意味と $\alpha=2$ の停止線を述べよ。
3. 情報の二重記述を独立な厳密二コピーと仮定した場合、非直交な入力について何が矛盾するか説明せよ。
4. Bobが受信不能だと示せた場合、それだけで[BHI10のAMPS矛盾](../BHI10/index.md#thm-bhi10-amps-tradeoff)は解消したと言えるか。数学上の仮定と操作上の仮定を分けて答えよ。

<!-- solution-start -->
**詳細解答**

**1. 幾何と時間窓。** $V_B/V_A=e^{\Delta t/(4M)}=M^\alpha$。$U_sV_B<1$ から $U_s<1/(V_AM^\alpha)$。動径落下の地平線速度は $dU/d\tau=eE_0/(2MV_A)$ であるため、近地平線では $U_s=(eE_0/(2MV_A))\Delta\tau+O((\Delta\tau/M)^2/V_A)$。代入して

$$
\Delta\tau\lesssim\frac{2}{eE_0}M^{1-\alpha}.
$$

これらはBobの実際の受信までの十分条件ではありません。

**2. 波束条件。** $\omega_{\rm loc}\ge\eta/\Delta\tau$ を使うと

$$
\frac{\omega_{\rm loc}}M
\gtrsim\frac{\eta eE_0}{2}M^{\alpha-2}.
$$

$\alpha>2$ では背景質量に対する必要エネルギー比が発散し、固定背景の弱い信号としての操作が破綻します。$\alpha=2$ なら比は定数次数なので、係数と復号等の詳細なしに破綻とは断定できません。

**3. 複製不能性。** 独立な $A,B$ にすべての入力 $\rho_\psi^A\otimes\rho_\psi^B$ を作る一つのCPTP写像を仮定すれば、内積 $0<|q|<1$ に対し $|q|\le|q|^2$ が必要となり矛盾します。[QINF12の複製不能定理](../../../応用系/QINF/QINF12/index.md#thm-qinf12-pure-no-cloning)が直接適用され、Bobの動線には依存しません。

**4. 不等式と操作。** 受信不能性は「一観測者が二つを共同測定できない」という操作上の結論です。しかし $R,b,c$ を独立三因子とした同一量子状態には $S(b|R)+S(b|c)\ge0$ が成立し、両方を厳密に負とする要請は残ります。従って受信不能だけではAMPSの数学的不整合を取り消せません。内部と外部を相補的に記述するなら、同時に使う作用素・部分系の対応を具体的に与える追加の仕事が必要です。
<!-- solution-end -->

## 8. まとめと次講

量子複製不能は、未知の非直交状態を独立な二コピーへ作れないという**状態とチャネルの定理**です。一方、Schwarzschild背景での送信窓は、外部で待つBobが内部のAliceから情報を受け取ることに課される**時空と資源の条件**です。外部の待ち時間が長いほど必要な内部信号は短時間・高周波となりますが、その評価をそのまま任意の蒸発模型へ移してはいけません。

相補性が目指すのは、内外を「一つの物理系の矛盾しない記述」として扱うことです。操作的な複製検証を妨げるだけでは、[AMPSの三部不等式](../BHI10/index.md#thm-bhi10-amps-tradeoff)を消すことにはなりません。

**次講BHI12** では、すでに古いブラックホールへ新たな量子情報を投入するHayden–Preskill模型を定式化し、外部回収を「期待」ではなく具体的な系・写像・条件として扱います。
