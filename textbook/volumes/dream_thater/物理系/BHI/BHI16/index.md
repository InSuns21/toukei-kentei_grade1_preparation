# BHI16 前半総合：矛盾を構成する仮定と選択肢

<!-- definition-example-audit: strict -->

## 1. 情報問題を一つの「矛盾」に縮めない

ここまでで、[Hawking対を逐次追加する計算](../BHI3/index.md#thm-bhi3-entropy-growth)、[ユニタリ蒸発の終期制約](../BHI6/index.md#thm-bhi6-turnover-necessary)、[Page型の時点別包絡線](../BHI7/index.md#def-bhi7-page-envelope)、[Mathur型の小補正下界](../BHI9/index.md#thm-bhi9-small-corrections)、[AMPSの三部不等式](../BHI10/index.md#thm-bhi10-amps-tradeoff)、[Hayden–Preskillの条件付き回収](../BHI13/index.md#thm-bhi13-recovery-threshold)を学びました。

これらは同じ主張ではありません。Hawking対の計算は**新しい二モードの状態**、Page曲線は**全放射の精細エントロピーの時点別期待**、AMPSは**同一時点の三部状態に課す両立条件**、Hayden–Preskillは**参照系を使った受信者の回収課題**を扱います。どの定理も適用範囲を外して一般の蒸発の解決・不可能性を断定する道具ではありません。

本講では有限次元の量子情報模型を共通の物差しにし、物理的仮定と数学的帰結を一本ずつ接続します。対数は自然対数、エントロピーは nat、$S(X)=-\operatorname{Tr}(\rho_X\ln\rho_X)$、$0\ln0=0$ です。[von Neumannエントロピーの定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)を用います。重力場の局所領域にこのテンソル積を移す場合には、[前講の局所代数と因数分解障害](../BHI15/index.md#prop-bhi15-factorization-obstruction)を別途検査します。

## 2. 同じ状態・同じ時計・同じエントロピーを比較する

蒸発のある一段の直後を選び、$R$ は**その直前までの早期放射**、$b$ は**新たな外部モード**、$c$ は**その内部相手**、$D$ は**その他の残存自由度**とします。これらが独立した有限次元Hilbert因子として使える模型では

$$
\mathcal H_{\mathrm{tot}}
=\mathcal H_R\otimes\mathcal H_b\otimes\mathcal H_c\otimes\mathcal H_D,
\qquad
\rho_{Rbc}=\operatorname{Tr}_D\rho_{\mathrm{tot}}
$$

です。放出前後で同じ遠方自由度 $R$ を保持し、放出後の放射は $Rb$ とします。これが揺らぐと差 $S(Rb)-S(R)$ は同一の物理過程の増分でなくなります。

比較で使用する「仮定の台帳」は、対象を混ぜないための記録です。各行には、(i) 量子状態と領域、(ii) どの分割・観測量代数が使えるか、(iii) どの時計と近似か、(iv) 精細・粗視化のどのエントロピーか、(v) 数学的帰結か物理的提案か、を一緒に記します。

<a id="def-bhi16-consistent-ledger"></a>

<!-- formal-statement-start -->
> **定義（放出一段の整合した仮定台帳）**
>
> 有限次元の四因子 $R,b,c,D$ と状態 $\rho_{Rb c D}$、直前の放射状態 $\rho_R=\operatorname{Tr}_{bcD}\rho_{Rb c D}$ を固定する。この状態から計算する量
>
$$
\Delta=S(Rb)-S(R),\qquad
h=S(c),\qquad
q=S(bc)
$$
>
> を**同一段階の三つ組**とする。三つのエントロピーはいずれも同じ $\rho_{Rbc}$ から部分トレースして得るものとし、別の時間・別の状態の値を組み合わせない。$b,c$ を量子ビットとする場合には $0\le h\le\ln2$ である。
<!-- formal-statement-end -->

この台帳は新しい物理法則ではなく、既習の不等式の前提を落とさず使うための記法です。定義の条件を二つの四量子ビット例で直接確かめます。

<!-- definition-example-start: def-bhi16-consistent-ledger -->
**定義の確認**： $R,b,c,D$ をそれぞれ量子ビットとし、$|\Phi\rangle=(|00\rangle+|11\rangle)/\sqrt2$ とします。以下の密度演算子は、計算基底 $|0\rangle,|1\rangle$ で書いた状態ベクトルの外積から作り、観測しない因子を部分トレースして得ます。例えばBell対では $\langle0|1\rangle=0$ により交差項が消えて

$$
\operatorname{Tr}_c|\Phi\rangle\langle\Phi|_{bc}
=\tfrac12\bigl(|0\rangle\langle0|_b+|1\rangle\langle1|_b\bigr)=I_b/2,
\qquad
\operatorname{Tr}_b|\Phi\rangle\langle\Phi|_{bc}=I_c/2
$$

となります。ここで $I_X$ は量子ビット $X$ 上の恒等作用素です。この縮約の非零固有値は $1/2,1/2$、Bell対自身の射影の非零固有値は $1$ です。[エントロピーの固有値による定義](../../../応用系/QINF/QINF17/index.md#def-qinf17-entropy)を自然対数へ換算すれば、それぞれ $\ln2$ と $0$ を得ます。以下の二例は規格化した同一の四因子上で状態を別々に指定し、台帳の三つ組をすべてその状態から算出します。

- **内外対が純粋**：$|\Psi_H\rangle=|0\rangle_R|\Phi\rangle_{bc}|0\rangle_D$。$\rho_R$ は純粋、$\rho_{Rb}=|0\rangle\langle0|_R\otimes I_b/2$、$\rho_{bc}=|\Phi\rangle\langle\Phi|$、$\rho_c=I_c/2$。したがって $(\Delta,h,q)=(\ln2,\ln2,0)$。
- **後期モードが早期放射と純粋対**：$|\Psi_U\rangle=|\Phi\rangle_{Rb}|0\rangle_c|0\rangle_D$。$\rho_R=I_R/2$、$\rho_{Rb}$ は純粋、$\rho_{bc}=I_b/2\otimes|0\rangle\langle0|_c$。したがって $(\Delta,h,q)=(-\ln2,0,\ln2)$。

両方とも規格化された同じ四因子上の純粋状態ですが、**異なる状態**です。前者の $h,q$ と後者の $\Delta$ を一つの状態に属するかのように並べることはできません。
<!-- definition-example-end -->

## 3. Mathur・AMPS・Pageを不等式で接続する

ここで[条件付きエントロピー](../../../応用系/QINF/QINF18/index.md#def-qinf18-conditional)は、自然対数の本章では $S(X|Y)=S(XY)-S(Y)$ です。前節の $\Delta,h,q$ を使うと、[AMPSの三部エントロピー制約](../BHI10/index.md#thm-bhi10-amps-tradeoff)は

$$
S(b|R)+S(b|c)=
\underbrace{S(Rb)-S(R)}_{\Delta}
+\underbrace{S(bc)-S(c)}_{q-h}
\ge0
$$

すなわち $\Delta\ge h-q$ です。右辺の $h$ と $q$ にそれぞれ $h\ge\ln2-\varepsilon_{\rm in}$、$q\le\varepsilon_{\rm pair}$ を入れると

$$
\boxed{\Delta\ge\ln2-\varepsilon_{\rm in}-\varepsilon_{\rm pair}}.
$$

同じ増分へ Page曲線の下降局面を翻訳して $\Delta\le-\gamma$（$\gamma>0$）と要求するなら

$$
\gamma+\ln2\le\varepsilon_{\rm in}+\varepsilon_{\rm pair}.
$$

これは[BHI9のsmall-corrections下界](../BHI9/index.md#thm-bhi9-small-corrections)と[BHI10のAMPS制約](../BHI10/index.md#thm-bhi10-amps-tradeoff)を同じ台帳で読んだものです。前者で $\varepsilon_{\rm in}=\varepsilon_{\rm pair}=\varepsilon$ とすれば $\Delta\ge\ln2-2\varepsilon$ に一致します。**局所的に混合している**という条件 $S(b)\approx\ln2$ だけから $q\approx0$ は出ません。例えば前節の $|\Psi_U\rangle$ は $S(b)=\ln2$ ですが $q=\ln2$ です。

局所的不等式と、蒸発が終わるまでの全段階にわたる主張は、さらに区別する必要があります。

<a id="prop-bhi16-aggregate-error-budget"></a>

<!-- formal-statement-start -->
> **命題（放出列の累積小補正の必要条件）**
>
> $k=1,\ldots,K$ の各段階で、古い放射 $R_{k-1}$ が保存され、新放射量子ビット $b_k$ と内部相手量子ビット $c_k$ が有限次元三部状態を作り、$R_k=R_{k-1}b_k$ とする。各段で
>
$$
S(c_k)\ge\ln2-\varepsilon_{{\rm in},k},
\qquad S(b_kc_k)\le\varepsilon_{{\rm pair},k},
\qquad \varepsilon_{{\rm in},k},\varepsilon_{{\rm pair},k}\ge0
$$
>
> が成立するとき、$s_0=S(R_0)$、$s_K=S(R_K)$ は
>
$$
s_K-s_0\ge K\ln2-
\sum_{k=1}^{K}(\varepsilon_{{\rm in},k}+\varepsilon_{{\rm pair},k})
$$
>
> を満たす。特に、$s_0=s_K=0$ なら
>
$$
\boxed{\sum_{k=1}^{K}
(\varepsilon_{{\rm in},k}+\varepsilon_{{\rm pair},k})\ge K\ln2}.
$$
>
> この不等式は終期の純粋性を実現するために満たすべき下界であり、満たしただけで実現が保証されるものではない。
<!-- formal-statement-end -->

### 証明の見取り図

各段の古い放射を次の段でも同じ系として使い、増分を足すと中間のエントロピーが消えます。各段で別々の小補正条件を代入した後、始点と終点を固定します。

<!-- proof-start -->
### 証明

[BHI10の三部不等式](../BHI10/index.md#thm-bhi10-amps-tradeoff)へ各段階で $R=R_{k-1}$、$b=b_k$、$c=c_k$ を代入します。$R_{k-1},b_k,c_k$ が独立因子で同一状態の縮約であるので

$$
\begin{aligned}
S(R_k)-S(R_{k-1})
&=S(R_{k-1}b_k)-S(R_{k-1})\\
&\ge S(c_k)-S(b_kc_k)\\
&\ge(\ln2-\varepsilon_{{\rm in},k})
-\varepsilon_{{\rm pair},k}.
\end{aligned}
$$

$k=1$ から $K$ まで足すと左辺は

$$
\sum_{k=1}^{K}[S(R_k)-S(R_{k-1})]
=S(R_K)-S(R_0)=s_K-s_0
$$

です。右辺を足すと最初の不等式になります。$s_K=s_0=0$ のとき移項すると二つ目の不等式です。各段の内部・外部が独立に因数分解されない場合、最初の三部不等式を同じ形で適用できるとは限りません。$\square$
<!-- proof-end -->

**数値での読み方。** $K=10$ 段、各段で $\varepsilon_{{\rm in},k}=\varepsilon_{{\rm pair},k}=0.1\ln2$ なら総補正量は $2\ln2$ です。終期純粋性が要求する $10\ln2$ に届かず、実際 $s_{10}-s_0\ge8\ln2$ になります。逆に補正量が必要下界を超えたからといって、純粋な終期状態の存在・ユニタリな物理時間発展が構成されたわけではありません。

ここで言う「Page曲線」は、実際の蒸発時刻ごとの状態についての追加仮定を含みます。[Page型包絡線](../BHI7/index.md#def-bhi7-page-envelope)は各時点の有効次元とHaar典型性を入力した**期待の形**です。[Page時刻の収支推定](../BHI8/index.md#thm-bhi8-constant-page-time)も粗視化した放射エントロピーと面積エントロピーの交点であり、それ自体は $\Delta<0$ の物理的導出ではありません。

## 4. 「局所的に熱的」と「全体の情報」は別々の列

一つの放射量子ビット $b$ の $\rho_b=I_2/2$ は、二つの異なる純粋化を許します。

$$
|\Phi\rangle_{bc}|0\rangle_R
\quad\text{と}\quad
|\Phi\rangle_{Rb}|0\rangle_c.
$$

前者は $b$ と内部 $c$ の相関が最大で、後者は $b$ と早期放射 $R$ の相関が最大です。どちらも遠方で $b$ だけを測ると同じ確率 $1/2,1/2$ を与えます。したがって、Hawkingスペクトルをよく近似できるという事実だけでは、**放射全体の微視的純粋性**を決められません。[粗視化と精細エントロピーの区別](../BHI5/index.md#prop-bhi5-entropy-hierarchy)がここで必要になります。

| 知りたいこと | 状態・領域 | 確認する量 | 言える範囲 |
| --- | --- | --- | --- |
| 外部モードは熱的か | $\rho_b$ | $S(b)$ と局所観測量 | 全放射の純粋性は決まらない |
| 近地平線の対は純粋に近いか | $\rho_{bc}$ | $S(bc)$ と $S(c)$ | 台帳が満たせば増分下界が出る |
| Page下降があるか | $\rho_{R_k}$ | $S(R_k)-S(R_{k-1})$ | 実際の時刻発展で別途確認する |
| 完全蒸発後に情報が残るか | 終期の全観測可能系 | 終期の純粋性・未観測系 | remnant・参照系の有無が重要 |
| 日記を復号できるか | 新旧放射を持つ受信者と、成否判定用の参照系 | 回復写像の忠実度 | 存在・所要時間・計算量は別 |

最後の行では、第6節で定義する別の投入・受信実験を先取りしました。そこでは系と記号を改めて定め、**AMPSでの残存系 $D$ を無条件に使い回しません**。

## 5. どの仮定を緩めると、何が未解決として残るか

解決案は「何を取り替える案なのか」を述べたとき初めて比較できます。以下は物理的可能性の台帳であり、どれかを証明済みの一般解とする表ではありません。

| 提案・選択肢 | 変更を狙う仮定 | まず再計算すべきこと | 残る課題 |
| --- | --- | --- | --- |
| 地平線近傍の状態の大きな修正（fuzzball等） | 各段で $bc$ がほぼ純粋なHawking対という仮定 | $S(bc)$、$S(c)$、実際の放射相関 | 幾何・低エネルギーの観測・時間発展を同時に再現する必要 |
| ブラックホール相補性 | 内外の記述を一つの観測者が持つ独立コピーとみなす仮定 | 一つの代数と具体的な回収・比較プロトコル | [AMPSの同一三部状態の要請](../BHI10/index.md#def-bhi10-amps-conditions)がどこで変わるかを具体化する必要 |
| remnant／長寿命の残存自由度 | 放射だけで終期の純粋性を完結する仮定 | $S(R_{\rm final})$ と残存系の次元・エネルギー | 残存状態の物理的安定性、容量、観測可能性 |
| 非局所的な情報移送・新しい符号化 | 独立な近地平線モード・局所性・有効場理論の適用域 | $\rho_{Rbc}$ と採用する観測量代数 | 因果性・半古典極限・情報回収を整合的に実現する動力学 |
| 重力制約と作用素代数による再定式化 | 領域の鋭い全行列因子分解 | セクター・中心・状態制限・適用できる不等式 | 代数版の議論を構成し、単に「因数分解できない」で終えない |
| island・重力レプリカを用いる計算 | 重力系で放射のエントロピーをどの処方で計算するか | $S_{\rm gen}$ の候補・極値・支配鞍点 | 模型の仮定、単一理論の解釈、具体的な復号操作 |

最後の方法は第II部の対象です。まず次講から、重力領域と非重力浴を**同じ計算模型**として固定していきます。「エントロピーがPage形になる」「内側の情報が浴の記述に現れる」「手元の装置で効率的に復号できる」は別の主張です。

前講の[共有中心定理](../BHI15/index.md#thm-bhi15-shared-center)は、Gauss制約を持つ有限模型で二つの局所代数が可換でも、鋭い独立全行列因子と一致しないことを証明しました。これはAMPSの三部因数分解を**点検する理由**にはなりますが、AMPSの矛盾が実際の量子重力で解けたという証明にはなりません。

## 6. Hayden–Preskillの「回収できる」は何を保証するか

ここからは別の投入・受信実験です。[Hayden–Preskillの投入模型](../BHI12/index.md#def-bhi12-old-input)では、日記 $A$ と参照系 $M$、古いブラックホール $B$ と早期放射 $E$ がそれぞれ最大エンタングル対を作ります。

$AB$ だけにユニタリ $U$ を作用させ、出力を残存系 $C$ と新放射 $D$ に分けます。系 $X$ のHilbert空間の次元を $d_X=\dim\mathcal H_X$ と書きます。

**この節の新放射 $D$ は、第2節のその他の残存自由度 $D$ と別の役割**です。

$$
AB\xrightarrow{\,U\,}CD,\qquad
M,E\text{ は操作されない},\qquad
a=d_A=d_M,\ d=d_D,\ d_Ad_B=d_Cd_D.
$$

受信者は $ED$ にアクセスし、参照系 $M$ は成否判定のために保持します。$F_{\rm e,opt}(U)$ は、選んだ $U$ に対して回復写像を最適化したエンタングルメント忠実度です。$\Pr_U$ は $U$ のHaar選択についての確率を表します。

出力次元は $d\le d_Ad_B$ で、$d_C=d_Ad_B/d$ が正整数となる必要があります。この条件と $0<\epsilon<1$（目標不忠実度）、$0<\eta<1$（失敗確率）を固定すると、[BHI13のHaar回収閾値](../BHI13/index.md#thm-bhi13-recovery-threshold)から

$$
d\ge\frac{a}{\epsilon\sqrt\eta}
\quad\Longrightarrow\quad
\Pr_U\{1-F_{\rm e,opt}(U)\ge\epsilon\}\le\eta.
$$

これはランダムなユニタリを選ぶ実験での**回復写像の存在**の高確率評価です。実際のブラックホールがHaarユニタリになる時刻、復号回路を見つける計算量、回復操作を実行する時間は含まれていません。

その違いを[BHI14の二段階収集模型](../BHI14/index.md#def-bhi14-staged-clock)に沿って分けます。放射を集め始められる時刻 $u_{\rm ready}$、必要な放射量子ビット数 $n_{\rm need}$、収集速度 $r$（量子ビット／遠方時間）、回復演算の時間 $t_{\rm dec}$ を使えば、逐次実行を仮定した完了時刻は

$$
u_{\rm finish}\ge u_{\rm ready}+\frac{n_{\rm need}}r+t_{\rm dec}.
$$

有効収集率（時間の下界を考えるなら収集率の上界）や復号アルゴリズムが指定されない限り、この式は数値的な予報にはなりません。**scramblingで作用素が広がること**と**参照系への相関を受信者が回復できること**も[BHI14の反例](../BHI14/index.md#prop-bhi14-fanout-counterexample)によって異なります。

## 7. 仮定監査を実行する三つの判定

研究論文や新しい模型の主張を読むとき、まず次の三問を順に使います。

1. **対象は同じか。** $R,b,c,D$ の因数分解、状態、時刻は固定されているか。ゲージ制約下なら何の作用素代数を使うか。
2. **矛盾する数値は実際に同時要求されているか。** 同一状態の $\Delta<0$ と $S(c)\approx\ln2,S(bc)\approx0$ を見積もっているか。単一モードの熱性からの飛躍はないか。
3. **変更案は何を再計算したか。** 近地平線対の修正、放射以外の純粋化系、局所代数の変更、受信者の復号操作のどれを示したか。主張の種類に合う証拠はあるか。

手計算で可能な最小の反証テストは前節までの二つのBell配置です。$\rho_b$ だけは同じでも、AMPSの両条件を同時に満たす配置はありません。この不可能性を回避するために、物理理論が何を変えているのかを具体的に説明できることが、第I部の到達点です。

## 8. 演習と詳細解答

### Level A：同一状態でエントロピーを数える

<a id="ex-bhi16-a01"></a>

#### BHI16-A01 二つの純粋化の比較

- Level: A
- 問題: 第2節の $|\Psi_H\rangle,|\Psi_U\rangle$ について、$\rho_b,\rho_{bc},\rho_{Rb}$ の非零固有値と $\Delta,h,q$ をそれぞれ求めよ。$S(b)$ だけでは二つを区別できないことを示せ。

<!-- solution-start -->
**詳細解答。** $|\Psi_H\rangle$ では $R$ は純粋、$bc$ はBell対なので $\rho_b=I_2/2$ の固有値は $(1/2,1/2)$、$\rho_{bc}$ の非零固有値は $(1)$、$\rho_{Rb}=|0\rangle\langle0|\otimes I_2/2$ は非零固有値 $(1/2,1/2)$ です。よって $S(b)=\ln2$、$S(bc)=0$、$S(c)=\ln2$、$S(Rb)=\ln2$、$S(R)=0$。$(\Delta,h,q)=(\ln2,\ln2,0)$。

$|\Psi_U\rangle$ では $Rb$ がBell対だから $\rho_{Rb}$ の非零固有値は $(1)$、$\rho_R=\rho_b=I_2/2$、$\rho_{bc}=I_2/2\otimes|0\rangle\langle0|$ は非零固有値 $(1/2,1/2)$ です。$\rho_c$ は純粋なので $(\Delta,h,q)=(-\ln2,0,\ln2)$。いずれも $\rho_b=I_2/2$ ですが相関の相手が異なります。
<!-- solution-end -->

<a id="ex-bhi16-a02"></a>

#### BHI16-A02 一段の誤差予算

- Level: A
- 問題: $b,c$ は量子ビットで $S(c)\ge0.9\ln2$、$S(bc)\le0.1\ln2$ とする。(i) 増分 $\Delta$ の下界、(ii) $\Delta\le-0.2\ln2$ を同じ状態に要求した場合の可否を判定せよ。

<!-- solution-start -->
**詳細解答。** [三部不等式](../BHI10/index.md#thm-bhi10-amps-tradeoff)を $R,b,c$ に適用して $\Delta\ge S(c)-S(bc)$。仮定から

$$
\Delta\ge0.9\ln2-0.1\ln2=0.8\ln2.
$$

(ii) は $\Delta\le-0.2\ln2$ であり、$0.8\ln2> -0.2\ln2$ なので同時に成立しません。同じ状態・同じ三部因子という仮定を変えない限り矛盾です。
<!-- solution-end -->

<a id="ex-bhi16-a03"></a>

#### BHI16-A03 条件付きエントロピーの符号

- Level: A
- 問題: $|\Psi_H\rangle,|\Psi_U\rangle$ について $S(b|R)=S(Rb)-S(R)$ と $S(b|c)=S(bc)-S(c)$ を計算し、その和を求めよ。

<!-- solution-start -->
**詳細解答。** $|\Psi_H\rangle$ では $S(Rb)=\ln2,S(R)=0,S(bc)=0,S(c)=\ln2$ なので、二条件付きエントロピーは $\ln2,-\ln2$ で和0です。$|\Psi_U\rangle$ では $S(Rb)=0,S(R)=\ln2,S(bc)=\ln2,S(c)=0$ なので、$-\ln2,\ln2$ で和0です。いずれも[AMPS三部不等式](../BHI10/index.md#thm-bhi10-amps-tradeoff)を等号で満たし、一方だけを負にできます。
<!-- solution-end -->

<a id="ex-bhi16-a04"></a>

#### BHI16-A04 累積下界の数値検算

- Level: A
- 問題: $K=8$ 段で全て $\varepsilon_{{\rm in},k}=\varepsilon_{{\rm pair},k}=0.15\ln2$ とする。$S(R_0)=0$ のとき $S(R_8)$ の下界を求め、$S(R_8)=0$ の可否を判定せよ。

<!-- solution-start -->
**詳細解答。** 一段の和は $0.3\ln2$ なので[累積必要条件](#prop-bhi16-aggregate-error-budget)に代入すると

$$
S(R_8)-0\ge8\ln2-8(0.3\ln2)=5.6\ln2.
$$

従って $S(R_8)=0$ は不可能です。各段で古い放射が保存されていることと、二つの補正条件が毎段成立することを使いました。
<!-- solution-end -->

<a id="ex-bhi16-a05"></a>

#### BHI16-A05 量子ビット閾値と成功確率

- Level: A
- 問題: Hayden–Preskill模型で日記が $a=4$ 次元、$\epsilon=1/4$、$\eta=1/16$ とする。[回収閾値](../BHI13/index.md#thm-bhi13-recovery-threshold)が保証する新放射次元の下界と、必要な量子ビット数の下界を求めよ。

<!-- solution-start -->
**詳細解答。** 閾値条件は $d\ge a/(\epsilon\sqrt\eta)$ です。$\sqrt\eta=1/4$ だから

$$
d\ge\frac4{(1/4)(1/4)}=64=2^6.
$$

従って新放射を6量子ビット集める次元条件で、Haar実験において最適不忠実度が $1/4$ 以上となる確率を高々 $1/16$ に抑える保証を利用できます。ただし実験が実在するには $d_C=ad_B/d$ が正整数である必要があります。例えば $a=4,d=64,d_B=16,d_C=1$ なら $4\cdot16=1\cdot64$ です。6量子ビット未満では回復不能という意味ではありません。また物理的な収集時間をこの計算から導くことはできません。
<!-- solution-end -->

### Level B：仮定の変更を定量化する

<a id="ex-bhi16-b01"></a>

#### BHI16-B01 非一様な補正予算

- Level: B
- 問題: $K=4$ 段、$s_0=0,s_4=0$ とし、最初の3段でそれぞれ $\varepsilon_{{\rm in},k}=\varepsilon_{{\rm pair},k}=0.1\ln2$ とする。最後の段で二つの誤差の**和**に課される必要下界を求め、最後の段だけ大きな修正を許す意味を述べよ。

<!-- solution-start -->
**詳細解答。** [累積必要条件](#prop-bhi16-aggregate-error-budget)は四段合計の誤差和に少なくとも $4\ln2$ を要求します。前3段の誤差和は $3(0.2\ln2)=0.6\ln2$ です。従って最後の段について

$$
\varepsilon_{{\rm in},4}+\varepsilon_{{\rm pair},4}
\ge4\ln2-0.6\ln2=3.4\ln2.
$$

ただしこの不等式は選んだ誤差上界に課す**数値的な制約**です。大きな誤差パラメータを宣言しても、最終状態を構成したことにはなりません。最終段の実際のずれを $\delta_{{\rm in},4}=\ln2-S(c_4)$、$\delta_{{\rm pair},4}=S(b_4c_4)$ と書くと、$b_4,c_4$ は量子ビットなので $0\le\delta_{{\rm in},4}\le\ln2$、$0\le\delta_{{\rm pair},4}\le2\ln2$。したがって実際のずれの和は高々 $3\ln2<3.4\ln2$ です。

さらに誤差パラメータの選び方に依存しない検算もできます。最初の3段の下界から $S(R_3)\ge3(0.8\ln2)=2.4\ln2$。最終段で[Araki–Lieb不等式](../../../応用系/QINF/QINF18/index.md#thm-qinf18-araki-lieb)を二部系 $R_3,b_4$ に使うと

$$
S(R_4)\ge S(R_3)-S(b_4)\ge2.4\ln2-\ln2=1.4\ln2>0.
$$

従って $s_4=0$ は不可能です。物理模型を変えるなら、最初の三段の小補正条件、最後の段の一量子ビット放出、または古い放射保存・因数分解のいずれかを見直す必要があります。
<!-- solution-end -->

<a id="ex-bhi16-b02"></a>

#### BHI16-B02 remnantを残す場合

- Level: B
- 問題: 全系 $R_{\rm f}B_{\rm f}$ が純粋で、残存系の次元が $d_{B_{\rm f}}=4$ とする。(i) 終期放射エントロピーの上界を求めよ。(ii) 初期から $K=6$ 段、各段で二つの補正誤差がともに $0.1\ln2$ 以下、初期放射は純粋とする。この同時仮定は可能か。

<!-- solution-start -->
**詳細解答。** (i) 純粋二部状態では[純粋二部系のエントロピー一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)により $S(R_{\rm f})=S(B_{\rm f})$。密度行列の非零固有値は高々4個なので $S(B_{\rm f})\le\ln4=2\ln2$ です。

(ii) 一段の増分下界は $\ln2-0.2\ln2=0.8\ln2$ なので6段で $S(R_{\rm f})\ge4.8\ln2$。これは $2\ln2$ の上界に反します。remnantを**持つだけ**では両立せず、少なくとも残存次元を増やす、近地平線対を大きく修正する、または古い放射保存・因数分解の仮定を変える必要があります。
<!-- solution-end -->

<a id="ex-bhi16-b03"></a>

#### BHI16-B03 共有中心と三部不等式

- Level: B
- 問題: [BHI15の左右局所代数](../BHI15/index.md#def-bhi15-local-algebras)が非自明中心射影 $P_+$ を共有することを使い、$\mathcal A_L=B(H_L)\otimes I$、$\mathcal A_R=I\otimes B(H_R)$ を同時に満たす鋭い局所分解が存在しない理由を説明せよ。それでもAMPSが「自動的に偽」と結論できない理由を述べよ。

<!-- solution-start -->
**詳細解答。** [共有中心定理](../BHI15/index.md#thm-bhi15-shared-center)から $P_+\in Z(\mathcal A_L)$ は階数4の非自明射影です。他方、全行列因子 $B(H_L)\otimes I$ の中心はスカラー倍の恒等のみです。もし左右の局所代数を指定したユニタリ分解が存在すれば中心を保存するので $UP_+U^*$ はスカラー恒等となりますが、階数4の非自明射影を保つユニタリ共役では不可能です。

ただしAMPSが使うのは実際の放射 $R$・外部 $b$・内部 $c$ の状態と不等式です。この有限Gauss模型の左右局所代数を現実の $R,b,c$ に同定した証明はなく、必要なら局所代数に対するエントロピー・不等式・状態制限を新たに確定しなければなりません。「一例で鋭い因数分解がない」と「任意の状態で矛盾が解けた」は別です。
<!-- solution-end -->

<a id="ex-bhi16-b04"></a>

#### BHI16-B04 回収の三つの時計

- Level: B
- 問題: 日記の次元 $a=2^3$、$\epsilon=1/4$、$\eta=1/4$、放射収集率 $r=2$ 量子ビット／時間、準備完了時刻 $u_{\rm ready}=10$、逐次復号時間 $t_{\rm dec}=7$ とする。閾値が保証する必要放射量子ビット数の**十分な選択**と完了時刻の下界を計算せよ。$t_{\rm scr}$ の値をこの条件から求められるか。

<!-- solution-start -->
**詳細解答。** $\sqrt\eta=1/2$ より[Haar回収閾値](../BHI13/index.md#thm-bhi13-recovery-threshold)で

$$
d\ge\frac{2^3}{(1/4)(1/2)}=2^6.
$$

新放射を量子ビット単位で集めるなら $n_{\rm need}=6$ で十分な次元条件となります。ただし入力日記が $a=8$ 次元なので、$d=64$ を出力できる古い内部は $d_B\ge8$ が必要です。例えば $d_B=8,d_C=1$ なら $ad_B=d_Cd=64$ です。収集所要時間は $n_{\rm need}/r=6/2=3$。逐次実行なので

$$
u_{\rm finish}\ge10+3+7=20.
$$

$t_{\rm scr}$ は内部の実際の時間発展とscrambling判定から別に求める量です。Haarの空間的な分布に時間パラメータがないため、ここから値を決められません。
<!-- solution-end -->

### Level C：一つの物理的結論を作るまで監査する

<a id="ex-bhi16-c01"></a>

#### BHI16-C01 四段模型の仮定監査と選択肢

- Level: C
- 問題: 初期純粋な放射 $R_0$ から始まる4段の模型を考える。毎段で古い放射を保存し、$R_k=R_{k-1}b_k$、$b_k,c_k$ は量子ビット、$S(c_k)\ge0.9\ln2$、$S(b_kc_k)\le0.1\ln2$ とする。次を順に調べよ。
  1. $S(R_4)$ の下界を計算せよ。
  2. 終期の放射以外に次元 $d_B=8$ の残存純粋化系だけが存在し、全系が純粋であると仮定するとどうなるか。
  3. 地平線付近の大きな修正、remnantの大型化、局所代数の再定式化の各案で、どの仮定・計算を再確認すべきか示せ。
  4. この問題からHayden–Preskillの効率的復号を証明できるか。

<!-- solution-start -->
**詳細解答。**

(1) $\Delta_k:=S(R_k)-S(R_{k-1})$ と置き、[累積必要条件](#prop-bhi16-aggregate-error-budget)の一段の評価を使います。各段で $\Delta_k\ge\ln2-0.1\ln2-0.1\ln2=0.8\ln2$ ですから

$$
S(R_4)=S(R_0)+\sum_{k=1}^4\Delta_k
\ge0+4(0.8\ln2)=3.2\ln2.
$$

(2) 全系 $R_4B$ が純粋なら[純粋二部系のエントロピー一致](../../../応用系/QINF/QINF17/index.md#prop-qinf17-bipartite)で $S(R_4)=S(B)$。残存系の次元が8なら $S(B)\le\ln8=3\ln2$ なので

$$
3.2\ln2\le S(R_4)=S(B)\le3\ln2
$$

となり矛盾します。

(3) **大きな近地平線修正**では $S(c_k)\ge0.9\ln2$ または $S(b_kc_k)\le0.1\ln2$ が壊れる段を状態から計算し、増分下界を再評価します。**remnantの大型化**では純粋化の容量上界 $\ln d_B$ を変え、少なくとも $\ln d_B\ge3.2\ln2$、すなわち整数次元 $d_B\ge10$ が必要です（$2^{3.2}\approx9.19$）。これも実現の十分条件ではありません。**局所代数の再定式化**では $R_k,b_k,c_k$ の独立因子が存在するか、部分トレース・条件付きエントロピーの意味、適用できる三部不等式を再構成する必要があります。因数分解を外しただけでは新しいエントロピー曲線が計算されたことになりません。

(4) 効率的復号は証明できません。この模型は回収すべき日記 $A$、受信系 $ED$、参照系 $M$、内部ユニタリ $U$、回復写像を定義していません。定義したとしても[Haar回収閾値](../BHI13/index.md#thm-bhi13-recovery-threshold)が保証するのは指定したランダム模型での**回復の存在**であって、回路計算量や実行時間ではありません。
<!-- solution-end -->

## 9. 第I部の結論と第II部への橋

第I部が確定したのは、独立三部因子の同一状態について「近地平線のほぼ純粋な対」と「後期放射の負のエントロピー増分」が同時には成立しない、という**条件付きの数学的障害**です。逐次対生成・Page典型性・scrambling・回収は、それぞれ異なる物理的追加仮定を使います。

第II部では、**放射を非重力浴の明確な領域として定義すること**から始め、JT重力の幾何・物質エントロピー・island候補・鞍点選択を順に計算します。新しい処方が得るのは何の状態の何のエントロピーであり、どの意味の情報回復まで示すのかを、本講の台帳へ戻して検証します。