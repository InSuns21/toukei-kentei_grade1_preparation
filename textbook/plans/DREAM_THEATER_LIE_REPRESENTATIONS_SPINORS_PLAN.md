# DREAM THEATER Lie群の表現・スピノルと相対論的粒子（LREP系列・全28講）

設計: 2026-10-13  
再設計: 2026-11-11（標準教科書・公開講義ノートによる範囲校正、全28講を確定）  
状態: planned（設計のみ。LREP章本文・系列manifest・公開導線は未着手）

## 1. 中心問いと到達点

**回転やLorentz変換という対称性から、なぜ整数・半整数スピンが現れ、場の成分と1粒子状態はそれぞれどのように変換するのか。**

既存のLie群・Lie環の定義と作用だけでは、表現の既約分解、Spin被覆、Weyl・Diracスピノル、運動量ごとのlittle groupは説明できない。一方、これらをQFTの個別の場の計算だけで学ぶと、有限次元のLorentz場表現と1粒子Hilbert空間上のユニタリ表現を混同しやすい。

本系列では、一般の有限次元表現論を手で追えるSU(2)から導入し、$SL(2,\mathbb C)$によるLorentz群の二重被覆、Clifford代数とスピノル、正エネルギーPoincaré表現へ進む。最終的に、**場のLorentz添字と粒子のスピン・ヘリシティを結び付ける共変性条件を自力で検算できる**状態を目指す。

- **数学の正本**：有限次元Lie群・Lie環表現の基礎、SU(2)の既約表現とテンソル積、Lorentz群の有限次元表現、平坦Minkowski時空のSpin被覆・Clifford表現、Poincaré群の物理的な正エネルギー1粒子表現の構成。
- **適用の正本**：既存[QFT7](../volumes/dream_thater/物理系/QFT/QFT7/index.md)は自由Dirac場の具体計算、[QFT15](../volumes/dream_thater/物理系/QFT/QFT15/index.md)はMaxwell場のゲージ自由度、[QFT32](../volumes/dream_thater/物理系/QFT/QFT32/index.md)はPoincaré粒子・Weyl／Majorana場のQFT内での適用。LREPはこれらを既存の完成章として扱い、量子化・散乱・場の統計を再執筆しない。既存章のprerequisiteを遡ってLREP全体へ付け替えない。
- **大域幾何の正本**：一般Lorentz多様体上のspin構造・spinor束・存在障害は[主束・ゲージ幾何](DREAM_THEATER_PRINCIPAL_BUNDLES_GAUGE_GEOMETRY_PLAN.md)および[LORG](../plan_done/DREAM_THEATER_LORENTZIAN_GEOMETRY_CAUSALITY_PLAN.md)の必要箇所と分担する。平坦時空でSpin被覆があることから任意の多様体のspin構造の存在を結論しない。

## 2. 前提・記法・理論的な停止線

### 直接の既習事項

- LIE1〜LIE4：Lie群、Lie環、指数写像、作用、随伴作用とMaurer–Cartanの入口。GRP：群・商群・群作用。LA：複素ベクトル空間、固有値、双対・テンソル積。必要なら各章の実在するcanonical結果へ接続する。
- FA／QM：Hilbert空間、ユニタリ作用素、自己共役作用素、スペクトル測度。**無限次元の群作用を導入するLREP21以降**に必要な完成章を章単位で選定する。有限次元表現を扱うLREP1〜20に一般の作用素論を一律必修としない。
- [SREL2](../volumes/dream_thater/物理系/SREL/SREL2/index.md)・[SREL3](../volumes/dream_thater/物理系/SREL/SREL3/index.md)：Minkowski計量、Lorentz変換、四元運動量と質量殻。後続LREPの章ごとに直接必要なSREL章を指定する。

### 固定規約

- [Lorentz計量の共通規約](../dream-theater-lorentz-conventions.md)に従い、$\eta=\operatorname{diag}(-1,+1,+1,+1)$、$x^\mu=(ct,x,y,z)$、$p_\mu p^\mu=-m^2c^2$。場・スピノル計算では適宜$c=\hbar=1$と宣言してよいが、符号と物理次元を一貫して検算する。
- $SL(2,\mathbb C)$は**実6次元のLie群**として$SO^+(1,3)$を二重被覆する。そのLie環$\mathfrak{sl}(2,\mathbb C)$（実Lie環）と、複素化で現れる$\mathfrak{sl}_2(\mathbb C)\oplus\mathfrak{sl}_2(\mathbb C)$を区別する。後者の二因子を「$SL(2,\mathbb C)$が二つある実Lie群」と同一視しない。
- Clifford代数はまず$\mathrm{Cl}(V,\eta)$を**$v^2=\eta(v,v)\mathbf1$**で定義し、使う場合は複素化$\mathrm{Cl}(V,\eta)\otimes_{\mathbb R}\mathbb C$を明記する。$\mathrm{Cl}_{1,3}$／$\mathrm{Cl}_{3,1}$は正負の数え方が文献により異なるため、記号だけで同定しない。$\{\gamma^\mu,\gamma^\nu\}=2\eta^{\mu\nu}I$を採るなら、Dirac作用素、随伴、平面波、スピン和の$i$と符号を同じ規約から導く。
- 有限次元場表現$D(\Lambda)$は一般に正定値内積についてユニタリではない。正エネルギー1粒子状態の$U(a,\Lambda)$はHilbert空間上でユニタリ（時間反転等の反ユニタリは別扱い）。スピンの半整数値を扱うときは、必要に応じてPoincaré群の**被覆群**または射影表現を用いる。

### 証明範囲

具体群に関する被覆・既約表現・低次元テンソル積・little groupの同定・誘導表現のユニタリ性は**核心を本文で証明する**。一般の非コンパクトLie群のユニタリ双対分類、無限次元誘導表現の一般的既約性・完全性定理は適用仮定と限界を正確に述べ、特殊模型の構成と取り違えない。Wigner分類では正エネルギー・非負質量・有限ヘリシティの物理的対象を中心とし、零運動量軌道・負エネルギー軌道・連続スピン・tachyonic軌道を「数学的に存在しない」とは言わない。

spin–statisticsおよびCPTは局所量子場理論の追加仮定を要するため、**群表現論だけから証明したとは主張しない**。一般の曲がった時空のspin構造・Dirac作用素、大域的障害、ゲージ固定・BRST・Fock量子化は担当外とする。

## 3. 講義数の確定と構成

**全28講。** 科目名や「15週」ではなく、各講で一つの中心問い、導入する定義の直接例、主結果の証明、A4／B3／C1以上の詳細解答付き演習を閉じられる単位で設計した。以下のLREP1〜LREP28は**計画上の通算ID**であり、章実装時に系列manifestおよび既存IDとの衝突を検査して実在IDを確定する。講数を水増しするための追加章は作らず、境界変更が必要ならPLAN・manifest・直接参照を同一作業で改訂する。

### I. 表現論の基本構文（LREP1〜LREP4・4講）

| 講 | 学習者の中心問い・講義題 | 本文で閉じる主要定義・証明・計算 |
| --- | --- | --- |
| **LREP1** | 表現とは何か――作用、表現、部分表現、同値 | $D:G\to GL(V)$、不変部分空間、既約・可約、絡作用素を定義。自明表現・標準表現・1次元指標と可約な2次元模型で定義条件を検算。群作用と線形表現の違いを確認。 |
| **LREP2** | どのように既約成分へ分けられるか | Schurの補題を体$\mathbb C$・有限次元等の仮定付きで証明。正規化Haar測度の存在・使用条件を明記して、コンパクト群の平均による不変正定値内積と直交補空間から完全可約性を導出。SU(2)では具体的な不変測度模型を示し、非コンパクト群への無条件の転用を反例で止める。 |
| **LREP3** | Lie環表現から群表現へ戻れるか | $dD([X,Y])=[dD(X),dD(Y)]$と$D(\exp X)=\exp(dD(X))$を導出。局所表現と大域的積分の区別、単連結被覆と核への作用条件をSU(2)／SO(3)で予告。 |
| **LREP4** | 複数の表現をどう組み合わせるか | 直和、テンソル積、双対・複素共役表現、同変写像と不変双線形形式を定義。$V\otimes V^*$の自然な対応、$\epsilon$の不変性を低次元行列で検算。 |

### II. 回転群と半整数スピン（LREP5〜LREP8・4講）

| 講 | 学習者の中心問い・講義題 | 本文で閉じる主要定義・証明・計算 |
| --- | --- | --- |
| **LREP5** | なぜ回転に二重被覆があるか | Pauli行列と$X=\boldsymbol x\cdot\boldsymbol\sigma$への$UXU^\dagger$作用から$SU(2)\to SO(3)$を構成。長さ保存・準同型・像・核$\{\pm I\}$を検証し、$2\pi$回転を計算。 |
| **LREP6** | SU(2)の既約表現をどう列挙するか | $\mathfrak{sl}_2(\mathbb C)$の$H,E,F$関係、最高ウェイトと昇降演算子から有限次元複素既約表現$V_n$（次元$n+1$）を構成・分類。群への積分と$n$の整数条件を結ぶ。 |
| **LREP7** | スピンと角運動量演算子はどう対応するか | $J_i$の交換関係とCasimir、$j=0,\tfrac12,1,\dots$、磁気量子数$m=-j,\dots,j$を計算。整数スピンだけが通常の$SO(3)$表現へ降り、半整数は被覆／射影表現となる理由を示す。 |
| **LREP8** | 二つのスピンを合成すると何が出るか | $V_j\otimes V_k=\bigoplus_{\ell=\lvert j-k\rvert}^{j+k}V_\ell$を最高ウェイト・次元検算で導出。特に$\tfrac12\otimes\tfrac12=0\oplus1$の対称／反対称基底、Clebsch–Gordan係数を具体計算。 |

### III. Lorentz群の有限次元表現（LREP9〜LREP13・5講）

| 講 | 学習者の中心問い・講義題 | 本文で閉じる主要定義・証明・計算 |
| --- | --- | --- |
| **LREP9** | 回転とboostはどのLie環を作るか | $J_i,K_i$の交換関係を$\eta=(-+++)$と生成子の符号を明記して導出。複素線形結合の二組の$\mathfrak{sl}_2$を求め、元の実Lie環の実構造を説明。 |
| **LREP10** | なぜ$SL(2,\mathbb C)$がLorentz変換を被覆するか | $X=x^0I+x^i\sigma_i$の行列式$-\eta(x,x)$を計算し、$X\mapsto AXA^\dagger$の時空作用・核$\{\pm I\}$を導く。連結成分が$SO^+(1,3)$全体になる根拠を極分解／Lie環・連結性で示す。 |
| **LREP11** | 有限次元Lorentz既約表現はどう分類されるか | 複素化した二つの$\mathfrak{sl}_2$から$(j_L,j_R)$を構成・分類。次元$(2j_L+1)(2j_R+1)$、$(0,0)$、$(\tfrac12,0)$、$(0,\tfrac12)$、$(\tfrac12,\tfrac12)$を検算。非自明な有限次元正定値ユニタリ表現が存在しない理由を示す。 |
| **LREP12** | 左右Weylスピノルは四元ベクトルとどう結び付くか | 左右二成分スピノル、複素共役と双対の違い、$\epsilon_{ab}$による添字上げ下げ、$\sigma^\mu_{a\dot b}$による$(\tfrac12,\tfrac12)$への対応を実例で導出。 |
| **LREP13** | Lorentz不変な収縮はどう作るか | スピノルの不変交代形式、ベクトル・二階テンソルへの写像、左／右の交換と空間反転（parity）の作用を説明。単一Weyl表現が一般にはparityで閉じないことを確かめる。 |

### IV. Clifford代数と自由スピノルの構成（LREP14〜LREP20・7講）

| 講 | 学習者の中心問い・講義題 | 本文で閉じる主要定義・証明・計算 |
| --- | --- | --- |
| **LREP14** | Clifford積は時空計量をどう符号化するか | テンソル代数の商として$\mathrm{Cl}(V,\eta)$を定義し、普遍性と反交換関係を説明。実4次元Minkowski空間の複素化Clifford代数（複素次元16）と$4\times4$行列表現を構成して次元・符号を検算（実Clifford代数の全分類はしない）。 |
| **LREP15** | Spin変換は$\gamma$行列にどう作用するか | 具体的なWeyl基底で$\{\gamma^\mu,\gamma^\nu\}=2\eta^{\mu\nu}I$を逐次確認。偶Clifford積と$Spin^+(1,3)$、$\gamma$の共変変換則を構成し、回転とboostで検算。 |
| **LREP16** | Diracスピノルとchiralityはどう現れるか | $(\tfrac12,0)\oplus(0,\tfrac12)$、chirality演算子と射影子、$\gamma^5$相当の演算子を符号と$i$を指定して構成。有限質量と質量零の表示、chiralityとhelicityの違いを予告。 |
| **LREP17** | どの双線形量がLorentz共変になるか | 不変Hermite形式が不定となる理由、Dirac随伴、スカラー・擬スカラー・ベクトル・軸性ベクトル・二階反対称テンソルの共変性を行列恒等式で検証。複素共役と随伴を混同しない。 |
| **LREP18** | charge conjugationとMajorana条件はいつ定義できるか | 電荷共役行列の変換性、$C$の基底・位相依存、Weyl／Dirac／Majoranaの現実条件を4次元Minkowski模型で整理。外部$U(1)$荷電がある場合の制約と、粒子空間上の対称作用$C$との区別を示す。 |
| **LREP19** | なぜDirac方程式はLorentz共変な一次方程式か | $\gamma$の共変性から一次Dirac作用素を構成し、二乗からKlein–Gordon作用素を得る。質量項、共変な随伴方程式、保存電流、時間成分の正値性を指定した規約で計算。場のFock量子化には進まない。 |
| **LREP20** | 平面波解・スピン和とhelicityはどう計算するか | $m>0$の静止系から一般運動量の$u_s,v_s$を構成し、規格化・完全性・スピン和を行列積で検算。$m=0$のWeyl方程式とhelicity/chiralityの関係は運動量・粒子／反粒子・符号条件を明記して導出。 |

### V. Poincaré群とWignerの1粒子表現（LREP21〜LREP25・5講）

| 講 | 学習者の中心問い・講義題 | 本文で閉じる主要定義・証明・計算 |
| --- | --- | --- |
| **LREP21** | 時空の平行移動とLorentz変換はどう合成するか | $\mathbb R^{1,3}\rtimes SO^+(1,3)$と被覆群の群法則を検算。強連続ユニタリ表現の平行移動生成子、共同スペクトル、正エネルギー条件をスペクトル定理の仮定とともに導入。 |
| **LREP22** | 質量とスピンはなぜ群の不変量か | 運動量の時間的／光的軌道、標準運動量、質量殻測度$d^3p/(2E_{\boldsymbol p})$の不変性を計算。$P^2$とPauli–Lubanskiベクトルの共変性・Casimir、および$\eta=(-+++)$、$c=\hbar=1$で質量正の場合の$W_\mu W^\mu=m^2s(s+1)$を生成子規約とともに検算。 |
| **LREP23** | 質量正のlittle groupがスピンを決めるのはなぜか | 静止運動量を固定する回転安定群とその被覆$SU(2)$を同定。標準boostとWigner回転$W(\Lambda,p)=L(\Lambda p)^{-1}\Lambda L(p)$のcocycleを計算し、$2j+1$の内部自由度を得る。 |
| **LREP24** | 質量零では何がhelicityを決めるか | 光的標準運動量のlittle groupが$ISO(2)$型（被覆を区別）になることを行列で示す。並進部分が**物理状態上で自明に作用する表現を選ぶ**とhelicity表現となることを導出。非自明な並進作用が連続スピン表現へつながる境界を説明。 |
| **LREP25** | little groupからHilbert空間表現をどう作るか | 運動量軌道上の波束と不変測度、断面$L(p)$の選択、little-group行列を使って正エネルギー$U(a,\Lambda)$を明示。cocycleと測度の不変性から群法則・ノルム保存を検算。一般誘導表現の完全分類を証明したとは言わない。 |

### VI. 場と粒子の橋・総合演習（LREP26〜LREP28・3講）

| 講 | 学習者の中心問い・講義題 | 本文で閉じる主要定義・証明・計算 |
| --- | --- | --- |
| **LREP26** | 場の有限次元表現と粒子のユニタリ表現をどう接続するか | 場の共変性行列$D(\Lambda)$と1粒子$U(\Lambda)$を別記号で定義。スピン$\tfrac12$のモード係数が満たす絡作用条件を静止系と一般運動量で導出し、LREP20のスピノルと接続。 |
| **LREP27** | 光子の偏極ベクトルに何が余分に含まれるか | 質量正スピン1の三偏極と質量零helicity $+1$・$-1$の二つ（個別の既約粒子表現と、その直和）を区別。四元偏極のlittle-group並進が$\epsilon^\mu\mapsto\epsilon^\mu+\alpha p^\mu$型のゲージ変更を生む模型を計算し、物理状態における作用との違いを確認。QFT15の量子化は繰り返さない。 |
| **LREP28** | 離散対称性と全体系をどう整合させるか | parity・時間反転・電荷共役を区別し、時間反転の反ユニタリ性に必要な量子力学上の条件、parityでの左右Weyl表現交換・helicity反転、通常の時間反転でのhelicity保存を確認。spin–statistics・CPTの**成立仮定と未証明の部分**を記した後、$SU(2)\to SL(2,\mathbb C)$→Clifford→Wigner→場・粒子の総合計算で閉じる。 |

### 分割理由と履修ルート

- **4 + 4 + 5 + 7 + 5 + 3 = 28講**。SU(2)の分類、Lorentz二重被覆、Clifford構成、massive/massless little group、誘導表現の群法則という異なる核心証明を一講に押し込まない。
- 数学中心の読順はLREP1〜15、LREP21〜25、LREP26〜28。スピノルを詳しく扱う読順はLREP1〜20、LREP26〜28。いずれも必要な内部依存は飛ばさない。
- QFTの既習者向けにはQFT7／QFT32の具体式をLREP10〜12・14〜20・21〜26の一般理論へ逆照合する。**未完成のLREPを既存の完成QFT章の必須prerequisiteにはしない。**

## 4. 必須の証明・演習・誤解防止ゲート

講義単位の演習最低数はLevel A 4題、B 3題、C 1題。これは**最低数であり上限ではない**。各問の詳細解答には定義域、仮定、基底・添字、主要中間式、結論を記す。以下を系列横断の最終査読ゲートとする。

1. **表現の大域性**：$dD$の交換関係から群表現への積分では被覆と核の作用を確認する。$SU(2)$の半整数表現を無条件に$SO(3)$の通常表現と呼ばない。
2. **SU(2)・Lie環**：被覆の核と像、$2\pi$回転、最高ウェイト構成、Schurの補題の仮定、Clebsch–Gordan分解の次元と明示基底を全件検算。
3. **Lorentz実構造**：$SL(2,\mathbb C)$の実Lie群としての被覆、$\det X=-\eta(x,x)$、左右表現の複素共役・parityの交換を区別。有限次元非自明Lorentz表現に正定値な不変内積がない理由を提示。
4. **Clifford・スピノル**：$\eta=(-+++)$から$\gamma$行列・$\gamma^5$・Dirac随伴・電荷共役・平面波・スピン和を**同一の符号規約で再導出**。$m=0$のhelicityとchirality、Majorana条件と荷電条件には例外・粒子／反粒子の違いを添える。
5. **1粒子状態**：平行移動の自己共役生成子を語る前に強連続性とスペクトル定理の入口を置く。質量殻の不変測度、Wigner回転のcocycle、誘導$U$の群法則とノルム保存を波束で検算。
6. **質量零**：$ISO(2)$型little groupの並進生成子を消去したと決めつけず、**自明に作用する表現を選択**した場合に限って有限helicityが出ることを示す。偏極四元ベクトルのゲージ変化と物理粒子空間のlittle-group表現を区別。
7. **定理の限界**：CPT・spin–statisticsを一般の群表現だけの帰結にせず、局所性・正エネルギー・適切なLorentz共変性等の追加仮定と参照先を明示する。一般Wigner–Mackey理論の完全性や全実Clifford代数の分類を未証明のまま完成定理として掲載しない。
8. **総合演習**：少なくとも$(j_L,j_R)$のテンソル積とWeyl双線形、massive $j=\tfrac12$のWigner回転とスピン和、massless $h=\pm1$の物理偏極とゲージ等価を、異なる表現空間を明記して往復する。

## 5. 図の配置計画（本文実装時に制作・検証）

図は学習上の必要箇所に限り、SVGを第一候補とする。**このPLAN改稿では図を生成・公開しない。** 実装時は[DREAM THEATER執筆規約](../DREAM_THEATER_AUTHORING_STANDARD.md)とSVG品質規約に従い、数式との一致、ラベル近接、色以外の区別、スマートフォン表示、実レンダリングを確認する。

| 講 | 図の学習目的・内容 | 表現 |
| --- | --- | --- |
| LREP5・7 | $SU(2)\to SO(3)$で$\pm U$が同じ三次元回転に写ること、$2\pi$で符号が反転し$4\pi$で戻ること | 球面上の回転軸・角度と被覆の対応を、別パネルの静的SVG。任意の回転角スライダーは教材本文に直接組み込める場合のみ。 |
| LREP8 | $\tfrac12\otimes\tfrac12$の三重項・一重項と対称／反対称基底 | 二つのスピンの基底対応と重みの表（図にしなくてよければ表を優先）。 |
| LREP10・12 | Hermite $2\times2$行列と光円錐、左右Weyl添字から四元ベクトルへの写像 | Minkowskiの二次元断面と、写像の入出力・添字を示す概念SVGを分割。 |
| LREP15・16 | chiral基底の$\gamma$行列のブロック作用と左右成分の交換 | ブロック行列はKaTeX本文、必要な場合のみ左右成分の作用矢印をSVG。 |
| LREP22〜24 | 質量正双曲面・未来光円錐・標準運動量・little groupの安定化 | 同一符号規約の運動量空間断面を別パネルで描写。光円錐と群軌道を一つの線として重ねない。 |
| LREP25〜27 | 標準boostの選択とWigner回転、場の共変添字と粒子helicity、偏極のゲージ方向 | 遷移の可換関係と物理偏極／$p^\mu$方向を区別するSVG。作用点・矢印と変換対象を明示。 |

## 6. 文献による範囲校正と出典の使い分け

以下は構成・前提・証明責務の校正に使う標準教科書・大学講義ノートである。内容・演習の転載はしない。版や計量の符号が違う文献から式をそのまま混ぜず、本文の共通規約へ再計算する。

| 文献 | 主に校正する範囲 | 計画への反映 |
| --- | --- | --- |
| Brian C. Hall, [*Lie Groups, Lie Algebras, and Representations*, 2nd ed.](https://link.springer.com/book/10.1007/978-3-319-13467-3)（Springer、Basic Representation Theory、Compact Group Approach） | Lie群／Lie環の表現、コンパクト群の完全可約性、被覆と大域性 | LREP1〜5の定義・証明。一般Lie理論を冗長に再講義しない。 |
| William Fulton & Joe Harris, [*Representation Theory: A First Course*](https://link.springer.com/book/10.1007/978-1-4612-0979-9)（Springer、Representations of $\mathfrak{sl}_2(\mathbb C)$） | 最高ウェイト、既約表現、テンソル積 | LREP6〜8・11の具体計算。 |
| Pavel Etingof, [MIT OCW 18.755 Lie Groups and Lie Algebras II](https://ocw.mit.edu/courses/18-755-lie-groups-and-lie-algebras-ii-spring-2024/lists/lecture-notes/)（2024） | コンパクト群表現と証明の深さ | LREP2・6〜8の仮定確認。一般コンパクト群の高度な理論を一律必修にしない。 |
| Steven Weinberg, [*The Quantum Theory of Fields*, Vol. I, Ch. 2](https://www.cambridge.org/core/books/quantum-theory-of-fields/relativistic-quantum-mechanics/3F963D187A0ABBB757DA00B3A98E3439), [Ch. 5](https://www.cambridge.org/core/books/abs/quantum-theory-of-fields/quantum-fields-and-antiparticles/FEFAFD671BC62005298B8466DB554548)（Cambridge UP） | Poincaré表現、little group、場と粒子の共変性 | LREP21〜28。粒子表現と局所場の行列を区別する。 |
| David Tong, [*Quantum Field Theory*, §4 The Dirac Equation](https://davidtong.org/teaching/quantum-field-theory/qfthtml/S4)（Cambridge講義ノート） | Lorentzスピノル、Dirac／Weyl、平面波 | LREP12〜20。物理への接続を校正し、Fock量子化以降をQFTへ委譲。 |
| Niklas Beisert, [*Quantum Field Theory I*](https://people.phys.ethz.ch/~nbeisert/lectures/QFT1-19HS-Notes.pdf)（ETH Zürich、2019、Ch. 5） | Clifford関係・Dirac方程式と$(-+++)$の整合 | LREP14〜20の符号・行列検算。 |
| Vincent Bouchard, [*Unitary representations of the Poincaré group*](https://sites.ualberta.ca/~vbouchar/MAPH464/section-poincare.html)（University of Alberta公開ノート） | 正質量／零質量のlittle group、helicityと連続スピンの境界 | LREP22〜25の分類対象と除外範囲。 |
| H. B. Lawson & M.-L. Michelsohn, [*Spin Geometry*](https://press.princeton.edu/books/hardcover/9780691085425/spin-geometry)（Princeton UP） | Clifford／Spinの一般理論と多様体上のspin構造との境界 | LREP14〜18の対象を平坦時空に限定し、大域理論を別PLANへ渡す。 |

## 7. 実装・査読・完了条件

1. この改稿は**PLANの設計確定のみ**である。まだLREP章も系列manifestも作らず、状態はtextbook/plans/のplannedに維持する。着手時に実在章ID・章パス・直接prerequisite・概念ID・stable anchorを決め、初めてPLAN固有実装を開始したときにplans_progressへ**移動**してmanifestのplan参照を同期する。
2. 各章は「既知→困難→新概念→直接例→主定理と核心証明→詳細演習」の順を基本にする。主要概念の使用位置より前に定義、または実在する先行canonical anchorへの根拠付きリンクを置く。定義条件を行列・基底計算で確認するときは対応を示す。
3. 全主要定理・全問題と詳細解答を出発点から再計算する自己査読と、完成稿を最初から読み直す別観点査読を分離する。同一担当AIの二度読みは第三者独立査読と称さない。数学的結果の不足、用語の先取り、リンク切れ、図の意味・配置不良がある章を完成扱いしない。
4. 各章のchapter.yaml／knowledge.yaml、系列manifest、公開目次の担当ソースを実装と同じ作業単位で更新する。変更スコープのCIに加え、全系列の証明・演習・参照整合と学修目標を確認する。別完成章の追跡監査はユーザーが章IDを明示した場合のみ行う。
5. **全28講の講数だけでdoneにはしない。** 最終の数学的整合、学修導線、公開・routing、査読の残件を解消してからplan_doneへ移す。著しい分割・統合が不可避なときは、根拠を記録して講義数・manifestを同時改訂する。
