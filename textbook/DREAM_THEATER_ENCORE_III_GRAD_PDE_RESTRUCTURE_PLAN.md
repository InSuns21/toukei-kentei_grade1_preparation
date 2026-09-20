# DREAM THEATER：Encore III Graduate PDE 再編計画

作成日: 2026-09-19

## 0. この計画の目的

Encore II の新 ODE / FOU / PDE 系列は、ODE1--ODE7、FOU1--FOU5、PDE1--PDE7 まで一巡した。

Encore II は **古典解・Fourier / 固有関数 / Green 表現を中心とする学部標準 PDE** として閉じる。Encore III はその続編として、古典解の滑らかさを仮定できない問題を関数解析・Sobolev 空間・変分法で扱う **大学院 PDE の基礎理論** を正本化する。

新しい主線は次の一本に統一する。

~~~text
distribution
  ↓
distributional derivative / mollifier / weak derivative
  ↓
Sobolev spaces
  ↓
boundary values / Poincare / trace
  ↓
Sobolev embedding / compactness
  ↓
weak / variational formulation
  ↓
Lax--Milgram
  ↓
linear elliptic PDE
  ↓
elliptic regularity
  ↓
Galerkin / evolution weak solutions
~~~

## 1. 旧 Encore III の扱い

再編前の次の7章は削除しない。

- F0-00DS1
- F0-00DS2
- F0-00SOB1
- F0-00SOB2
- F0-00WK1
- F0-00WK2
- F0-00WK3

ただし、これらは **archive / migration source** とする。

- textbook/dream-theater-index.json の現行主線から外す。
- textbook/dream-theater.md の現行通読順から外す。
- 新 GPDE 章から prerequisite / concept owner / proof dependency / forward reference にしない。
- 旧本文の有用な証明・例・演習は、新正本へ必要なものだけ移植する。
- 新旧両方の本文を並行保守しない。
- 旧 URL を維持する場合も、将来は移行案内と新正本へのリンクだけを表示する互換ハブ化を検討する。

F0-00R3 は Encore III の入口 ID として維持し、内容を新 GPDE 系列のロードマップへ更新する。

## 2. 新系列の ID と役割

新規の主線 ID は GPDE1--GPDE10 とする。

### GPDE1 テスト関数・distribution

**役割**：古典関数を超えて PDE を等式として読むための入口。

- $\mathcal D(\Omega)=C_c^\infty(\Omega)$
- テスト関数の収束を使う理由
- distribution $\mathcal D'(\Omega)$
- $L^1_{\mathrm{loc}}$ 関数による正則 distribution
- Dirac delta
- distribution の収束
- distributional solution の定義
- PDE1 の Burgers shock、PDE6 の基本解を後続で厳密化する位置付け

**証明境界**：一般の局所凸位相空間論を独立 prerequisite にはしない。テスト関数列への連続性を、この系列で使う形に限定して明示する。

### GPDE2 distribution 微分・mollifier・弱微分

- distributional derivative
- 多重指数
- Heaviside と delta
- jump を持つ関数
- weak derivative
- 古典微分との一致
- mollifier / approximate identity
- $u_\varepsilon=\rho_\varepsilon*u$ による平滑化
- 局所近似と弱微分の交換

ここで「粗い対象を平滑化して証明し、極限へ戻る」という後続 PDE の標準技法を導入する。

### GPDE3 Sobolev 空間

- $W^{k,p}(\Omega)$
- $H^k=W^{k,2}$
- Sobolev norm
- a.e. 同値類
- 完備性
- $H^k$ の Hilbert 構造
- 絶対値関数、区分線形関数、jump 関数
- smooth approximation / density の基本形

定義を置くだけでなく、弱微分と $L^p$ 完備性から Sobolev 空間が解析の舞台になる機構を説明する。

### GPDE4 $H_0^1$・境界値・Poincare・trace

- $H_0^1(\Omega)=\overline{C_c^\infty(\Omega)}^{H^1}$
- zero Dirichlet condition の意味
- Poincare inequality
- gradient norm と $H^1$ norm の同値性
- trace operator
- bounded Lipschitz domain など、trace を述べるための領域仮定
- 境界値の a.e. 同値類問題

旧 SOB2 の Poincare 証明は移植候補だが、旧章そのものを証明依存にはしない。

### GPDE5 Sobolev embedding・compactness

- Sobolev inequality / embedding
- 次元と指数の役割
- Morrey 型連続性への入口
- compact embedding
- Rellich--Kondrachov
- weak convergence と strong convergence の違い
- bounded sequence から subsequence を取り出す論法

**教育上の中心**：

$$
u_n\rightharpoonup u
$$

だけでは十分でない極限操作と、

$$
u_{n_k}\to u
$$

という強収束を compactness が回収する機構を理解する。

一般定理の証明は、領域仮定と extension / translation / mollification の依存を明示し、証明可能な標準形を正本化する。一般性だけを広げて証明を黒箱化しない。

### GPDE6 弱形式・変分形式

Poisson の零 Dirichlet 問題

$$
-\Delta u=f
$$

を

$$
\int_\Omega \nabla u\cdot\nabla v
=
\langle f,v\rangle
$$

へ変換する。

- classical solution / distributional solution / variational weak solution の比較
- integration by parts により階数が下がる機構
- $a(u,v)=F(v)$
- bounded bilinear form
- coercivity
- symmetric problem と energy minimization
- Dirichlet 条件を空間 $H_0^1$ に組み込む意味

Encore II の接続元は **PDE5 Laplace / Poisson** を正本とする。

### GPDE7 Lax--Milgram

- bounded coercive bilinear form
- Riesz representation から作用素 $A$ を構成
- coercivity から下からの評価
- injectivity
- closed range
- dense range
- surjectivity
- existence / uniqueness
- stability estimate
- Poisson / reaction-diffusion への適用

旧 WK2 の「単射 → closed range → dense range → surjective」という証明骨格は有力な移植元とする。

### GPDE8 二階線形楕円型 PDE

代表形

$$
-\operatorname{div}(A(x)\nabla u)
+b(x)\cdot\nabla u
+c(x)u=f
$$

を扱う。

- divergence form
- uniform ellipticity
- coefficient assumptions
- lower-order terms
- bilinear form の boundedness / coercivity
- energy estimate
- weak existence / uniqueness
- data perturbation に対する安定性
- Neumann 型問題と kernel / compatibility の位置付け

一般係数を「適切な条件の下で」で済ませず、どの仮定がどの評価に必要か局所的に示す。

### GPDE9 楕円型正則性

弱解を得た後に「どこまで滑らかさを回復できるか」を扱う。

- interior regularity の考え方
- difference quotient
- cutoff function
- Caccioppoli 型 energy estimate
- Poisson 方程式の局所 $H^2$ 正則性
- data / coefficient / boundary regularity と解の regularity の関係
- weak solution から classical solution へ戻れる条件

**停止線**：Schauder 理論、一般 Calderon--Zygmund 理論、De Giorgi--Nash--Moser は後続拡張へ送る。

### GPDE10 Galerkin・時間発展 PDE の弱解

Galerkin を FEM 専用技法としてではなく、有限次元近似から無限次元解を構成する方法として扱う。

- finite-dimensional Galerkin approximation
- a priori energy estimate
- weak compactness
- limit passage
- $H_0^1\subset L^2\subset H^{-1}$ の Gelfand triple
- heat equation の evolution weak / energy solution
- wave equation の energy space の位置付け
- uniqueness via energy estimate
- mild solution / semigroup formulation は bridge として位置付ける
- FEM への数値的実装は Encore V へ送る

Encore II の PDE3 / PDE4 を、明示解ではなく弱解の立場から再訪する章とする。

## 3. 弱解概念の範囲

Encore III 本線で正本化する解概念は次とする。

1. **distributional solution**：GPDE1--GPDE2
2. **Sobolev / variational weak solution**：GPDE6--GPDE8 の主役
3. **energy solution**：GPDE10 の時間発展問題
4. **mild solution**：GPDE10 の bridge。定義と Duhamel / semigroup との関係までに留める

以下は Encore III 本線へ入れない。

- entropy solution
- viscosity solution
- renormalized solution
- measure-valued solution
- Leray--Hopf 型 Navier--Stokes weak solution の本格理論

これらは DREAM_THEATER_POST_GPDE_PDE_EXTENSIONS_PLAN.md の別系列で計画する。

## 4. 依存 DAG

基本骨格は次とする。

~~~text
Encore II: PDE7
   │
   ├──────────────┐
   │              │
F0-00D2/Lp    F0-02C1/C2
   │              │
   └──────┬───────┘
          ↓
        GPDE1
          ↓
        GPDE2
          ↓
        GPDE3
          ↓
        GPDE4
          ↓
        GPDE5
          ↓
PDE5 ──→ GPDE6
          ↓
        GPDE7
          ↓
        GPDE8
          ↓
        GPDE9
          ↓
PDE3/PDE4 → GPDE10
          ↓
    ┌─────┴─────────┐
    ↓               ↓
Encore V       後続 PDE 拡張
FEM/数値       semigroup / nonlinear /
               entropy / viscosity / geometry
~~~

実装時の chapter.yaml では「読順」と「証明に本当に必要な直接 prerequisite」を混同せず、必要最小限の direct prerequisite を設定する。

## 5. Encore II との責務分担

| 対象 | 正本 |
|---|---|
| PDE分類・特性曲線・熱・波動・Laplace/Poisson の古典解 | Encore II PDE1--PDE7 |
| Green 恒等式・古典 Green 関数 | PDE6 |
| Fourier / 固有関数による古典解 | PDE3--PDE7 |
| distribution / weak derivative | GPDE1--GPDE2 |
| Sobolev spaces / trace / embedding / compactness | GPDE3--GPDE5 |
| variational weak solution | GPDE6 |
| Lax--Milgram | GPDE7 |
| 一般線形楕円型 PDE の弱解 | GPDE8 |
| elliptic regularity | GPDE9 |
| evolution weak solution / Galerkin existence | GPDE10 |
| mesh / element matrix / assembly / solver | Encore V |

## 6. 演習・証明品質

ロードマップを除く各 GPDE 章は、理由付き例外がない限り

- Level A: 4題以上
- Level B: 3題以上
- Level C: 1題以上

を実本文に置き、全問へ詳細解答を付ける。

新規章には旧 DREAM THEATER の「本番答案」「20点採点基準」を持ち込まない。

特に次を演習で実際に使わせる。

- distribution の作用計算
- weak derivative の直接検証
- mollifier の尺度変換
- Sobolev membership / non-membership
- Poincare / trace / embedding の仮定確認
- weak / strong convergence の区別
- Poisson の weak formulation
- coercivity と Lax--Milgram の適用条件
- ellipticity から energy estimate
- difference quotient
- Galerkin の a priori bound と limit passage

## 7. 実装フェーズ

### Phase 0：ルーティングと設計台帳

- 本再編計画を正本化する。
- F0-00R3 を新 GPDE ロードマップへ更新する。
- dream-theater-index.json から旧7章を外す。
- dream-theater.md から旧7章の現行導線を外す。
- 新 GPDE DAG と停止線を固定する。
- 後続 PDE 拡張は別計画へ分離する。

### Phase 1：distribution / Sobolev 基盤

~~~text
GPDE1 → GPDE2 → GPDE3 → GPDE4 → GPDE5
~~~

各章を1章ずつ本文・証明・例・演習・詳細解答まで閉じ、完成した章だけ reader-facing index に追加する。

### Phase 2：変分法・楕円型 PDE

~~~text
GPDE6 → GPDE7 → GPDE8
~~~

Poisson の weak formulation から一般線形楕円型の存在一意性まで閉じる。

### Phase 3：正則性・時間発展

~~~text
GPDE9 → GPDE10
~~~

弱解の regularity 回復と、Galerkin / energy method による時間発展 PDE への接続を閉じる。

## 8. 公開ルール

未完成 GPDE 章は dream-theater-index.json に先行登録しない。

- 設計上は本計画に ID・役割・依存を固定する。
- 実装完了・検証完了した章から順に reader-facing index へ追加する。
- metadata や marker だけを置いた空ページを「implemented」と扱わない。

これにより、主線には常に読める正本だけが表示される。

## 9. 検証

各章の実装では変更内容に応じて少なくとも次を実行する。

~~~bash
npm run validate
npm run validate:pages
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
~~~

concept / knowledge / standard math core を変更した場合は対応する strict validation も実行する。

## 10. 完成時の位置付け

~~~text
Encore II
古典 PDE
Fourier / eigenfunction / Green representation
        ↓
Encore III
distribution / Sobolev / compactness
variational weak solution / Lax--Milgram
elliptic PDE / regularity / evolution weak solution
        ↓
        ├── Encore V：FEM / numerical PDE
        ├── semigroup / nonlinear PDE
        ├── conservation law / entropy solution
        ├── Hamilton--Jacobi / viscosity solution
        └── geometry 完成後：geometric analysis
~~~

Encore III は「弱解という用語集」ではなく、**低正則な PDE に対して、適切な関数空間を選び、a priori estimate と compactness を使って存在・一意性・正則性を論じる方法を身につける系列**とする。


## 11. 実装進捗

最終更新: 2026-09-20

- Phase 0「ルーティングと設計台帳」: 完了（PR #302）。
- GPDE1「テスト関数・distribution」: 本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答・chapter / knowledge / glossary を実装（PR #303）。
- GPDE2「distribution 微分・mollifier・弱微分」: distribution 微分、jump の delta 項、弱微分、mollifier、局所 $L^1$ 近似、弱微分との交換を本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装（PR #304）。
- GPDE3「Sobolev 空間」: $W^{k,p}$、$H^k$、弱微分作用素の閉性、Banach / Hilbert 構造、絶対値・べき・jump・tent の membership 判定、smooth multiplier、局所 mollification、$\mathbb R^d$ 上の $C_c^\infty$ 密度を本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装（PR #306）。
- GPDE4「$H_0^1$・境界値・Poincare・trace」: $H_0^1$ の閉包定義、有界開集合上の Poincare 不等式、勾配 norm の同値性、一変数 $W^{1,1}$ の絶対連続代表元、区間 trace と $H_0^1=\ker\operatorname{Tr}$ の完全証明、bounded Lipschitz domain 上の trace と zero-trace 特徴付けを本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装（PR #307）。
- GPDE5「Sobolev embedding・compactness」: Sobolev 共役指数の scaling、$W^{1,1}$ Sobolev 不等式、power trick による $W^{1,p}$ embedding、bounded Lipschitz extension の依存境界、Hilbert 有界列の弱部分列、$H_0^1$ translation estimate、有限次元近似による Rellich--Kondrachov、subcritical compact embedding、critical concentration による非compact性を本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装（PR #308）。
- GPDE6「弱形式・変分形式」: Poisson 零 Dirichlet 問題の弱形式、$H^{-1}=(H_0^1)^*$、$L^2$ forcing の双対評価、distributional / variational weak solution の同値、bounded / coercive bilinear form、energy minimization、Hilbert norm の弱収束時の norm 評価、minimizing sequence と弱コンパクト性による Poisson 弱解の直接法、安定性評価を本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装（PR #309）。
- GPDE7「Lax--Milgram」: bounded bilinear form の Riesz 作用素表示、coercivity からの下側評価、単射性、closed range、直交補空間を用いた dense range、全射性、存在一意性・安定性までを完全証明し、非対称 coercive form、coercivity 欠落時の失敗例、Poisson / reaction--diffusion への適用を本文・直接例・A4/B3/C1 演習・全問詳細解答まで実装（PR #310）。
- GPDE8「二階線形楕円型 PDE」: divergence form、uniform ellipticity、一般係数 form の boundedness、lower-order term の小ささ・divergence 構造による coercivity、Lax--Milgram による零 Dirichlet 弱解、energy estimate、係数・外力摂動安定性、負 reaction 項の失敗例、Poincare--Wirtinger、純 Neumann 問題の compatibility / 定数 kernel / 平均ゼロ正規化を本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装（PR #311）。
- GPDE9「楕円型正則性」: difference quotient、discrete integration by parts、一様差分 bound から弱微分を回収する criterion、Poisson の Caccioppoli 型 estimate と interior H^2 regularity、局所 Lipschitz 係数を持つ divergence form への拡張、jump coefficient / reentrant corner による regularity failure を本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装。
- reader-facing index には完成済みの GPDE9 までを公開し、旧 Encore III 7章は引き続き隔離する。
- 現在地: **GPDE1 → GPDE2 → GPDE3 → GPDE4 → GPDE5 → GPDE6 → GPDE7 → GPDE8 → GPDE9 完了 → 次は GPDE10「Galerkin・時間発展 PDE の弱解」**。
