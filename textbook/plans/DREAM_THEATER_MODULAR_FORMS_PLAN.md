# DREAM THEATER モジュラー形式（MF1〜MF8、章割り暫定）

設計改訂: 2026-10-16（標準教科書・公開講義との照合）  
状態: planned（PLAN設計のみ。MFの章本文・series manifest・公開は未着手）

## 0. 中心問い・到達点・停止線

**中心問い：** 複素格子の基底変更に整合する正則関数をどう定義し、その Fourier 係数を Hecke 作用素で制御し、楕円曲線の素数ごとの点数とどう結び付けるか。

本科目を終えた学習者は、次を条件・計算・主要証明付きで再現できる。

1. 上半平面への $SL_2(\mathbb Z)$ 作用、基本領域、カスプを格子の基底変更から導く。
2. 重さ $k$ の変換則と**各カスプ**での正則性を区別して、$q$ 展開から具体例を判定する。
3. $E_4,E_6,\Delta,j$、valence formula、次元公式、$M_*(SL_2(\mathbb Z))=\mathbb C[E_4,E_6]$ を証明する。
4. 合同部分群とモジュラー曲線の複素解析的構成を説明し、重さ2のカスプ形式と正則微分を対応させる。
5. Hecke作用素の二重剰余類と$q$係数公式から、正規化固有形式の係数の乗法性を証明する。
6. oldform / newform とレベルを割る素数の局所因子を区別する。
7. カスプ形式の$L$関数の Mellin 表現・解析接続・関数等式と、固有形式の Euler 積を適切な仮定で導く。
8. $E/\mathbb Q$の導手と重さ2・自明指標・有理係数newformのレベル・局所係数を照合し、Modularity Theorem と Frey–Ribet–FLT の論理を説明する。

**canonical ownership：** modular group／正則モジュラー形式／レベル1の構造／合同部分群・複素モジュラー曲線／Hecke／newform／modular $L$／modularity・FLTへの橋。楕円関数の基礎はCA8/CA9、Dirichlet級数の一般論はANT2、楕円曲線の還元と局所Euler因子はEC9/EC10、曲線側の係数比較はEC11が正本。これらを重複証明しない。

**停止線：** 一般の代数曲線・スキーム・Jacobian／Abelian varietyの一般理論・Galois表現・Ribetのlevel lowering・Wiles–Taylor–Wilesのmodularity liftingは本系列で完全証明しない。MF8では必要な**外部大定理**を対象・仮定・結論とともに明示し、証明済み扱いにしない。

**章数：** MF1〜MF8は後続参照のため当面保つ**仮ID**であり、8講の上限・ノルマではない。MF3（零点と環構造）、MF4（モジュラー曲線）、MF5（Hecke）、MF7（newform）が独立した学習サイクルを複数要する場合は実装前に分割し、直接参照を同期する。既存のMF8の役割は維持する。

## 1. 教科書・講義資料との比較

| 照合先 | 確認できる構成・特色 | 採用・境界 |
|---|---|---|
| Diamond–Shurman, A First Course in Modular Forms | モジュラー曲線（Riemann面）、次元公式、Eisenstein級数、Hecke、Jacobian、Eichler–Shimura、Galois表現。 | MF1〜5の標準理論の校正、MF8の入口。Jacobian／Galoisの証明は無理に8章へ詰めない。 |
| J. S. Milne, Modular Functions and Modular Forms | 幾何寄り。複素モジュラー曲線、モジュラー関数／形式、Hecke、$\Gamma_0(N)$、$\mathbb Q$上のモデル、L関数と関数等式。 | 複素解析的構成と$\mathbb Q$上のモデルを分離。MF4／MF6／MF8の証明の境界を校正。 |
| T. Miyake, Modular Forms | 上半平面・Fuchs群、保型形式、$L$関数、合同部分群・Hecke。 | カスプ・Petersson内積・Heckeの定義域や規約の点検。 |
| W. Stein, Modular Forms, a Computational Approach | レベル1、重さ2、Dirichlet文字、次元、modular symbols、newform計算。 | 低レベルの$q$展開・有限係数照合・レベル11の算術例を導入。modular symbols一般論は選択発展とする。 |
| T. M. Apostol, Modular Functions and Dirichlet Series in Number Theory, 2nd ed. | 楕円関数からモジュラー群・関数、$\eta$・$j$、乗法的係数へ。 | CA9からの導入、$\Delta$と$j$の展開、MF5への橋。分割関数・Rademacher級数は主線外。 |
| MIT 18.786（Spring 2024） | 上半平面・カスプ→保型形式・次元→Hecke→合同部分群→Mellin／L→newform→Jacobian・Galois。 | MF6のMellin証明とMF7のold/newを強化。後半理論を暗黙前提にしない。 |

参照元（出版社・著者・大学の公開ページ）：

- Diamond–Shurman: https://link.springer.com/book/10.1007/978-0-387-27226-9
- Milne: https://www.jmilne.org/math/CourseNotes/mf.html
- Miyake: https://link.springer.com/book/10.1007/3-540-29593-3
- Stein: https://wstein.org/books/modform/modform/
- Apostol: https://link.springer.com/book/10.1007/978-1-4612-0999-7
- MIT 18.786: https://math.mit.edu/classes/18.786/2024/lectures.html

比較は書誌・公開目次・講義シラバス・アクセス可能な公開解説に基づく。全著書の全文を通読したとは主張しない。文章・演習・証明の転載はしない。

## 2. 前提の最小化と非循環DAG

- **MF1〜3：** CA8（Riemann面・複素トーラス）、CA9（格子・楕円関数）、GRP2/GRP3（群・剰余類・群作用）、必要な複素解析。NT2〜4の必要部分を個別に接続。
- **MF4：** MF1〜3、CA8のRiemann面の局所座標と正則微分の既習箇所。一般の代数幾何は黙って仮定しない。
- **MF5：** MF2〜4、群論と線形代数。非自明なDirichlet文字を用いる節を置く場合、ANT3の実在結果を直接前提に追加する。
- **MF6：** MF2/5、ANT2（Dirichlet級数・Euler積）、CA12（theta–Mellin）、必要ならANT3。CA12のtheta関数には半整数重さ／multiplierがあるため、レベル1の整数重さ形式だと混同しない。
- **MF7：** MF4〜6（特にHeckeとMellin）。**EC11を要求しない**。
- **MF8：** MF7と**EC10／EC11**を合流。EC11はMF1〜MF7までの成立済み結果を使って曲線側の係数比較を行う。EC11の先行原稿はMF7の既習結果の代わりにならない。

~~~text
CA8/CA9 + GRP + 必要な複素解析 → MF1 → MF2 → MF3
                                              └→ MF4 → MF5 → MF6 → MF7
CA12/ANT2（＋必要ならANT3） ─────────────────────→ MF6
EC1〜EC10 ────────────────────────────┐
MF7 ────────────────────────────────┴→ EC11 → MF8
MF7 ─────────────────────────────────────────→ MF8
~~~

現行EC PLANは ../plans_progress/DREAM_THEATER_ELLIPTIC_CURVES_PLAN.md （EC11は準備原稿のみ・未公開）。元の整数論横断ルート ../plans/DREAM_THEATER_NUMBER_THEORY_MODULARITY_ROUTE_PLAN.md のMF8接続と整合させる。各章の正式な直接prerequisite、章ID、concept owner、実在stable anchorは着手時に個別確認し、系列を丸ごと機械的に前提へ加えない。

## 3. 記号の統一と共通注意点

- $\mathbb H=\{\tau\in\mathbb C:\operatorname{Im}\tau>0\}$、$\Gamma(1)=SL_2(\mathbb Z)$、$\Gamma_0(N)=\{\small\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL_2(\mathbb Z):c\equiv0\pmod N\}$。
- $\gamma\tau=(a\tau+b)/(c\tau+d)$、$(f|_k\gamma)(\tau)=(c\tau+d)^{-k}f(\gamma\tau)$（$\det\gamma=1$）。正の行列式のHecke作用は**行列式因子の正規化をMF5で別途固定**。
- レベル1は $q=e^{2\pi i\tau}$。幅 $h$ のカスプではscaling matrix $\sigma$ を選び、$(f|_k\sigma)$を $q_h=e^{2\pi i\tau/h}$で展開。非自明指標では平行移動のmultiplierを確認。**$\infty$での正則性と全カスプの正則性は異なる**。
- $M_k$と$S_k$は全カスプで正則な形式とカスプ形式。極を許す$j$は正則モジュラー形式ではなくモジュラー**関数**。$\Delta(\tau)$（重さ12）とECの判別式$\Delta_E$は記号を分ける。
- 主線は整数重さ・$\Gamma_0(N)$の**自明指標**とし、$\chi$を扱う節では$\chi(-1)=(-1)^k$、Hecke係数公式と関数等式の変更を明示。
- 正規化固有形式は$a_1=1$。MF8の楕円曲線に対応するものは**重さ2・自明指標・有理Fourier係数・レベル$N_E$**。

## 4. 暫定章別の学習サイクル・主要証明・演習

### MF1 上半平面・格子・modular group・基本領域

**問い：** 同じ格子の基底変更がなぜMöbius変換になるのか。

- 向き付き格子基底と$\tau=\omega_2/\omega_1\in\mathbb H$、スケーリング・基底変更行列と変換式を中間式から導く。$SL_2(\mathbb Z)$と有効作用$PSL_2(\mathbb Z)$の違いを具体例で確認。
- $S(\tau)=-1/\tau$、$T(\tau)=\tau+1$による生成、基本領域$|\operatorname{Re}\tau|\le1/2,\ |\tau|\ge1$、境界の同一視と代表性・内部一意性を証明。減少アルゴリズムの停止も説明。
- 固定点$i,\rho=e^{2\pi i/3}$とカスプ$\mathbb P^1(\mathbb Q)$を区別。安定化群・カスプの同値を手計算。
- 直接例：$\tau=2+i$と$\tau=i/2$の軌道、基底の行列計算。演習：作用A、領域・安定化群B、格子同値の証明C。
- **証明ゲート：** 基底の向き、$S,T$生成、基本領域、レベル1のカスプが1つ。

### MF2 モジュラー形式・$q$展開・Eisenstein級数

**問い：** 変換則を満たす正則関数をどう$q$で判定するか。

- 変換則とカスプ正則性を定義前に動機付け、周期性から$q$局所座標・Fourier展開を証明。定数項とカスプ形式を区別。
- $-I$よりレベル1の奇数重さは零。$M_0=\mathbb C$、$M_2=0$。$E_2$は変換に異常項を持つ準モジュラー形式であり、通常の重さ2形式ではない。
- 偶数$k>2$での格子和から$E_k$を構成。局所一様／絶対収束、変換則、正規化、Bernoulli数と約数和の$q$係数を導出。$k=2$へ絶対収束証明を流用しない。
- $E_4=1+240q+2160q^2+\cdots$、$E_6=1-504q-16632q^2+\cdots$。$\Delta=(E_4^3-E_6^2)/1728=q-24q^2+252q^3+\cdots$を実際に展開する。$\Delta$の上半平面での非消失はMF3で証明。
- CA9の$g_2,g_3$との対応を格子スケーリングから説明。
- **証明ゲート：** $q$局所座標、和の交換・収束、変換則、$\Delta$のカスプでの位数。演習：係数A、$E_2$の反例B、$\Delta$展開C。

### MF3 valence formula・次元・レベル1の環構造

**問い：** 形式は$E_4,E_6$で尽くされるか。

- 非零の正則な重さ$k$の形式について
  $$
  v_\infty(f)+\frac{v_i(f)}2+\frac{v_\rho(f)}3+
  \sum_{\Gamma(1)\backslash(\mathbb H\setminus\Gamma(1)\{i,\rho\})}v_z(f)=\frac{k}{12}
  $$
  を境界積分・同一視・楕円固定点の寄与から証明。meromorphic版は極を負に数えることを明記。
- $E_4$の$\rho$、$E_6$の$i$の零点、$\Delta$の上半平面での非消失と$S_k=\Delta M_{k-12}$。重さ別の次元公式と$M_*(\Gamma(1))\cong\mathbb C[E_4,E_6]$の**生成と代数的独立性**を証明。
- $j=E_4^3/\Delta=q^{-1}+744+196884q+\cdots$は極を持つモジュラー関数。$\mathbb C(j)$の関数体の議論を「形式の環」と混同しない。
- valenceからレベル1の有限$q$係数による同一性判定を導き、一般レベルのSturm境界は仮定・指数を検査して導入する。
- **証明ゲート：** 楕円点寄与、$k=0,2,4,6,12$の次元、$\Delta$による除算、環の独立性。演習：零点A、次元・係数判定B、$M_{12},S_{12}$から環構造C。

### MF4 合同部分群・全カスプ・モジュラー曲線

**問い：** レベル$N$で何が変わり、重さ2形式はどの微分になるか。

- $\Gamma(N),\Gamma_1(N),\Gamma_0(N)$、指数、カスプ軌道、scaling matrixと幅。幅$h$のカスプの$q_h$変数と正則・カスプ条件を**全カスプで**検証。
- $Y_0(N)=\Gamma_0(N)\backslash\mathbb H$からカスプを加えたコンパクトRiemann面$X_0(N)(\mathbb C)$を構成。楕円固定点の局所座標・分岐を説明。一般の次元／種数公式を掲げる場合は、Riemann–Hurwitzなど必要な補題の証明経路を閉じる。
- $f(\tau)\,d\tau$の不変性を直接計算。重さ2**カスプ形式**でカスプに正則に延長することを $d\tau=h\,dq_h/(2\pi iq_h)$で確かめ、正則微分との**双方向**の同型と種数との関係を証明。
- 複素moduli解釈として$(E,C)$（複素楕円曲線と位数$N$の巡回部分群）・巡回isogenyを格子から説明。$\mathbb Q$上のcanonical modelはMF8で必要な**別入力**とし、複素の商空間だけから自動的には結論しない。
- 直接例：$\Gamma_0(2)$と$\Gamma_0(11)$のカスプ幅、レベル11の種数・重さ2への入口。
- **証明ゲート：** 幅と各カスプでの正則性、固定点、重さ2／微分の両方向、代数モデルとの区別。演習：合同条件A、カスプ幅・微分B、$X_0(N)$の例C。

### MF5 Hecke作用素・固有形式・乗法的Fourier係数

**問い：** $q$係数から素数ごとの演算をどう作るか。

- 二重剰余類と行列式を含むslash正規化を定義・例から導き、レベル1の$T_n$、$p\nmid N$の$T_p$、**$p\mid N$の$U_p$**を明示的に分岐。
- レベル1で $f=\sum a_nq^n$なら
  $$
  T_pf=\sum_{n\ge0}(a_{pn}+p^{k-1}a_{n/p})q^n,\qquad
  a_{n/p}=0\quad(p\nmid n)
  $$
  を剰余類代表から導く。指標$\chi$を導入した場合、$p\nmid N$の第二項は$\chi(p)p^{k-1}a_{n/p}$。$p\mid N$の$U_p$は$a_{pn}$。
- $T_mT_n$の可換性、互いに素な場合の積、素数冪の漸化式を条件付きで証明。Petersson内積は**カスプ形式**について収束と随伴関係を扱い、全ての$U_p$が自己随伴だとは言わない。
- 正規化同時固有カスプ形式$a_1=1$で$T_nf=a_nf$、$a_{mn}=a_ma_n$（互いに素）、レベル1の$a_{p^{r+1}}=a_pa_{p^r}-p^{k-1}a_{p^{r-1}}$を導く。
- **証明ゲート：** 行列式因子、二重剰余類→係数、$p\mid N$、固有値と$a_n$の一致、内積の適用空間。演習：$T_p/U_p$の計算A、乗法・漸化式B、固有形式の判定C。

### MF6 modular $L$関数・Mellin・関数等式

**問い：** Fourier係数のDirichlet級数の解析は変換則からどう拡張できるか。

- カスプ形式$f=\sum_{n\ge1}a_nq^n$の $L(f,s)=\sum a_n n^{-s}$ をまず絶対収束領域で定義。係数評価と項別積分の根拠を示す。
- その領域で
  $$
  \int_0^\infty f(iy)y^{s-1}\,dy=(2\pi)^{-s}\Gamma(s)L(f,s)
  $$
  を計算。$y\leftrightarrow 1/(Ny)$とFricke作用で積分を分割し、completed $L$の解析接続・関数等式を証明。$\Lambda(f,s)=N^{s/2}(2\pi)^{-s}\Gamma(s)L(f,s)$の式には**Fricke固有性・指標・双対形式**の規約を明記。
- レベル1の重さ$k$の形式なら$\Lambda(f,s)=i^k\Lambda(f,k-s)$。一般のレベル・指標では符号や関数等式の相手が変わるので一律に適用しない。重さ2の中心は$s=1$。
- 固有係数の乗法性からEuler積を導出。$p\nmid N$の自明指標では $(1-a_pp^{-s}+p^{k-1-2s})^{-1}$。**$p\mid N$の局所因子はMF7**でnewformの条件に沿って別に説明する。
- CA12のtheta–MellinとANT2を使用箇所の実在anchorへリンクし、Euler積／絶対収束／解析接続／関数等式が別々の議論であることを可視化。
- **証明ゲート：** 積分と和の交換、Fricke正規化、$\Gamma$因子、関数等式の相手、悪い素数。演習：Mellin計算A、Euler積B、関数等式の再導出C。

### MF7 oldform・newform・レベルと局所Euler因子

**問い：** 低いレベルから来た形式とレベル$N$固有の形式をどう分離するか。

- 退化写像$f(\tau)\mapsto f(d\tau)$によるoldspace、Petersson直交補でnewspaceを構成。まず自明指標・整数重さ$k\ge2$のカスプ形式に限定し、必要なら文字分解を別途導入。
- Atkin–Lehner–Li理論のold/new分解、newspaceのHecke同時固有ベクトル、正規化newformと一意性を**適切な仮定**で示す。完全証明を主張する場合は退化写像・内積・直交性の主要補題まで閉じ、根拠不足なら未証明の引用定理として区別する。
- $p\nmid N$の二次Euler因子に対し、$p\mid N$の$U_p$／newformに対応する一次因子や自明因子を説明。$p^2\mid N$やwildな素数、非自明$\chi$の一般公式を無条件に流用しない。
- レベル11の形式 $f_{11}=q-2q^2-q^3+2q^4+q^5+\cdots$ を例とする。$\eta(\tau)^2\eta(11\tau)^2$による構成を使うなら$\eta$の変換則と全カスプ正則性を証明・参照してからnewform性を検査。係数の数値一致だけを完全証明としない。
- 有理係数の重さ2newformと係数体が$\mathbb Q$より大きいnewformを対比。**全ての重さ2newformが$\mathbb Q$上の楕円曲線を与えるとは言わない。**
- **証明ゲート：** old/new直和、固有性・正規化、$p\mid N$のEuler因子、例のレベル検証。演習：退化写像A、$U_p$・new判定B、レベル11の係数／因子C。

### MF8 Modularity Theorem・Frey–Ribet・FLT

**問い：** 楕円曲線の有限体上の点数が重さ2newformの係数と一致するとは何か。

- **外部大定理としての正確なstatement：** 任意の楕円曲線$E/\mathbb Q$に対し、導手$N_E$と同じレベルの重さ2・自明指標・正規化・有理係数newform$f$が存在し、全ての素数の適切な局所因子を揃えて $L(E,s)=L(f,s)$。良い素数では $a_p(f)=p+1-\#E(\mathbb F_p)$。
- 「ほとんど全ての素数で係数一致」と「**悪い素数まで含む**Euler因子一致」は同じ形の主張として省略しない。それらの関係の厳密な根拠は別の深い定理を要することを表示。
- $\mathbb Q$上のcanonical modelを持つ$X_0(N_E)$から$E$への非定数$\mathbb Q$-射（modular parametrization）という幾何学的表現を、複素Riemann面と区別して導入。必要なJacobian／Abelian varietyの結果は**外部入力**として根拠の所在と役割を明示する。$\mathbb Q$上の同種類の曲線との区別も示す。
- 奇素数指数$p>2$の仮想的Fermat解→Frey曲線→半安定性と判別式→Ribetのlevel lowering→存在し得ない低レベルの形式→modularityと矛盾、という論理を**各大定理の適用条件付き**で示す。Freyの構成もRibetの証明そのものではないと区別する。
- **停止線：** Tate module、$\ell$進／残余Galois表現、変形環、Hecke環、$R=T$、patching、Ribetのlevel loweringの証明、Modularity Theoremの完全証明は後続の独立PLANへ。MF8では完成したと称しない。
- **証明ゲート：** 導手とレベル、重さ・指標・係数体、悪い素数の規約、$\mathbb Q$上の射、Ribetとmodularityの論理方向。演習：$a_p$の計算A、局所因子の比較B、仮定を列挙したFLT反証法C。

## 5. 科目横断の数学的検証ポイント

| 対象 | 合否基準 |
|---|---|
| modular action | 基底の向き、行列式1、slashの規約、$-I$、境界同一視の計算。 |
| cusp | 代表・幅・局所変数を導入し、**全カスプ**の正則性を確認。 |
| レベル1 | valenceの楕円点寄与、$\Delta$非消失、環の生成と代数的独立性。 |
| modular curve | 複素解析的コンパクト化と$\mathbb Q$上の代数モデルを混同しない。重さ2と正則微分の両方向。 |
| Hecke | $p\mid N$、指標$\chi$、行列式因子、作用空間、随伴性の仮定。 |
| old/new | 退化写像、直交補、原始レベル、局所Euler因子の分類。 |
| $L$関数 | 収束→Mellin→解析接続→関数等式、Euler積の根拠、重さ・レベル・$\Gamma$因子。 |
| EC/FLT | $a_p$の符号、導手・レベル、悪い素数、基礎体、係数体、Ribetの結論から矛盾に至る論理。 |

**定義の使用順：** formal statementの見出しだけでなく、その仮定・結論・導入文・定義例に現れる専門語を拾い、使用前に定義・導入するか到達可能な既習定義へ実在stable anchor付きで接続する。抽象定義から「カスプ幅を行列で判定」「$q$係数から固有性を判定」へ進む際は、道具を使える理由と主要中間式を先に置く。

**反例・比較：** $E_2/E_4$、正則形式/$j$、$\infty$のみ正則/全カスプ正則、$T_p/U_p$、old/new、$p\nmid N/p\mid N$、有理係数newform/一般newform。失った仮定と壊れた証明機構まで説明する。

## 6. 演習・査読・完了判定

- 各変更章の実本文に理由付き例外がなければ **Level A 4題、B 3題、C 1題以上**と**全問の詳細解答**を置く。これは下限であって推奨上限ではない。主要定理、典型誤答、仮定の使い方、複数概念の接続に練習不足があれば追加する。係数を繰り返すだけの水増しは禁止。
- 直接例では**定義の全ての非自明条件**を実際に検証。$q$展開の数値例だけで群作用・カスプ正則性・newform性を証明したとしない。
- 詳細解答は出発点・適用定理・条件・主要中間式・結論を再現できる粒度にし、有限係数の一致から恒等性を言うときはSturm型上界の前提・根拠を明示。
- 新規本文は変更区分Cとして全主要証明・全演習と解答を棚卸し・再計算し、独習者目線で別観点の再査読を行う。同じ担当者の再読を第三者独立査読とは呼ばない。**別の完了章の追跡監査は明示依頼時のみ**。
- 使う箇所の既習結果名から実在stable anchorへリンクし、CA9・ANT2・EC10/11という章名だけで未証明の核心を飛ばさない。外部大定理は「この科目では引用する」と本文にも明示。
- 実装開始時に初めてMF系列manifestを作り、本PLANを plans_progress/ に**移動**してmanifestのplanパスと直接参照を同期する。設計推敲だけで着手・公開扱いにしない。対象章のchapter.yaml／knowledge.yaml・公開indexは本文実装時に整合させる。
- MF7の成立後にEC11を正式章として閉じ、MF8へ進む。最後にカスプ・Hecke・L関数・導手/level・EC11の係数比較・FLTの論理・公開導線の横断監査を行う。全成果物と直接必要な索引・manifest・検証が完了して初めて plan_done/ へ**移動**する。
- 通常は changed-only validationを使い、共通規約・knowledge DAG・global indexなど未変更部分へ波及する作業はfull validationへ昇格。本PLANのみの改訂では数学本文やCIの全件検証が完了したとは主張しない。
