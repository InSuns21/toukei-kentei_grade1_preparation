# DREAM THEATER ランダム行列理論 — 全30講・独立科目PLAN

作成日: 2026-10-10  
改訂日: 2026-11-11（標準教科書・講義資料との照合により全30講を確定）  
状態: planned（設計のみ。本文・系列manifest・章固有実装は未着手）  
配置候補: DREAM THEATER「確率・統計系」／系列ID候補 RMT

## 0. 中心問いと射程

行列のサイズと標本数を同時に大きくすると、**固有値の全体分布（global law）・スペクトル端（edge）・局所間隔（local statistics）・特異値**は、どの仮定の下でどの異なる法則へ収束するのか。何を観測するかによって必要な道具も証明の難しさも変わることを、代表模型の具体的な計算から理解する。

このPLANは、Wigner半円則とMarčenko–Pastur（MP）則だけをSLTへ供給する補講ではなく、Gaussian ensemble・自由確率・非Hermitian行列を含む**ランダム行列理論の独立した入門〜発展科目**とする。一方、研究最前線の局所普遍性・Tracy–Widom分布・BBP揺らぎ・一般円則の完全証明までを、初学者向け30講の「証明済み」と偽装しない。

柱は次の4つ。

1. **計算可能な模型**：正規化・次元比・対称性を固定し、数値実験から極限分布を予測する。
2. **核心証明を再現する**：moment / walk counting、Stieltjes transform、resolvent、leave-one-out、Gaussian determinantal structure を手で導出する。
3. **観測尺度を分離する**：global ESD、最大・最小固有値、固有値間隔、低ランク外れ値を混同しない。
4. **応用を限定する**：ridge・最小ノルム回帰は明示した確率設計に限って扱い、深層学習一般へ外挿しない。

## 1. 参照する標準教科書・テキストと設計判断

| 文献 | 確認した主題・本PLANへの採用 | 役割 |
|---|---|---|
| Terence Tao, [*Topics in Random Matrix Theory*](https://www.ams.org/books/gsm/132/)（[著者公開草稿](https://terrytao.wordpress.com/wp-content/uploads/2011/08/matrix-book.pdf)） | 行列ノルム、半円則、自由確率、Gaussian ensemble、最小特異値、円則。著者草稿の §2.3–2.8 を中心に参照する | 基本証明の粒度・非Hermitianへの橋 |
| G. W. Anderson, A. Guionnet, O. Zeitouni, [*An Introduction to Random Matrices*](https://www.cambridge.org/core/books/an-introduction-to-random-matrices/51FCDD7E7C4C18B1D62DC6E2B774B7A0) | Wigner行列、Hermite多項式・Gaussian ensembleの間隔と極限、自由確率 | Gaussian固有値過程と局所統計の正本 |
| Z. Bai, J. W. Silverstein, [*Spectral Analysis of Large Dimensional Random Matrices*, 2nd ed.](https://link.springer.com/book/10.1007/978-1-4419-0661-8) | Wigner、MP、極値、spectrum separation、線形スペクトル統計のCLT、円則。truncation / resolvent / Stieltjesの技法 | sample covarianceとglobal spectral analysisの正本 |
| Roman Vershynin, [*High-Dimensional Probability*](https://webapps.math.uci.edu/~rvershyn/papers/HDP-book/HDP-book.html) | sub-Gaussian、標本共分散、作用素ノルム等の非漸近評価 | 既存HDPとの境界を確認する対照文献 |
| J. Baik, G. Ben Arous, S. Péché, [BBP原論文](https://doi.org/10.1214/009117905000000233) | 複素Gaussian spiked sample covarianceの最大固有値の相転移と極限分布 | 高度な主張の正確な模型・停止線 |
| E. Dobriban, S. Wager, [ridge予測リスクの比例漸近](https://doi.org/10.1214/17-AOS1549) | $p/n\to\gamma$ の予測リスクと共分散スペクトルへの依存 | RMT29の応用モデルの境界 |

**構成上の判断**：Taoの基礎的・方法論的な証明、AGZのGaussian／自由確率、Bai–Silversteinの高次元標本共分散という3つの軸を採る。元の15項目案に欠けていたGaussian固有値過程・自由確率・非Hermitian円則を加えた。一方、一般局所普遍性を証明するための完全なlocal law／Dyson Brownian motion技術は独立した上級研究科目相当なので、定理の射程と証明の仕組みを説明するところに停止線を置く。文献の章立てや演習を転載しない。

## 2. 前提講座・正本境界

- **線形代数**：実対称／複素Hermitianのスペクトル定理、SVD、トレース、行列式、Schur補元、作用素ノルム、特性多項式。必要なSchur補元・固有値のinterlacingは本系列でも例から導出する。
- **確率・測度・実解析**：独立性、条件付き期待値、モーメント、Borel–Cantelli、弱収束、tightness、優収束、積分交換。未履修の局所概念は導入してから使う。
- **複素解析**：上半平面、解析関数、Cauchy積分／Poisson核の必要部分はRMT4から導入する。後の複素解析章の結論を無断使用しない。
- **組合せ**：Catalan数と非交叉分割はRMT6–7、RMT24で構成する。既存の組合せ章に正本があれば実在する定義へリンクする。
- **HDP／SLTとの所有範囲**：[HDP7の標本共分散の非漸近界](../volumes/dream_thater/解析系/HDP/HDP7/index.md#thm-hdp7-isotropic-covariance)と[HDP8の行列Bernstein不等式](../volumes/dream_thater/解析系/HDP/HDP8/index.md#thm-hdp8-matrix-bernstein)は既存正本を援用する。SLT2-04／SLT2-05の有限標本リスク・特異値保証を再執筆せず、本系列では**比例漸近のスペクトル測度**とその変換を独立に扱う。RMTはSLT2の一律必修にしない。

各章の direct prerequisites は執筆時に必要最小限で確定し、後続章の定理を先取りしない。

### 2.1 最初に固定する記号・収束規約

- Wigner型：$H_n=n^{-1/2}W_n$ は $n\times n$ Hermitian行列。非対角の独立成分は中心化し、分散 $\sigma^2$（複素成分なら $E|W_{ij}|^2=\sigma^2$）とする。対角の仮定は別記する。
- 標本共分散：$X_{p,n}\in\mathbb F^{p\times n}$、$S_{p,n}=X_{p,n}X_{p,n}^*/n$、$\gamma_n=p/n\to\gamma\in(0,\infty)$。成分は平均0・分散1のiidを基本とし、Gaussian・非Gaussianで条件を明示して分ける。
- ESD：Hermitian $A$ の経験スペクトル測度は $\mu_A=d^{-1}\sum_{j=1}^{d}\delta_{\lambda_j(A)}$（$d$ は**対象行列の次数**）。$XX^*/n$ と $X^*X/n$ のESDは規格化母数が異なり、非零固有値の一致だけで同一視しない。
- Stieltjes変換は $m_\mu(z)=\int (x-z)^{-1}\,\mu(dx)$、$\operatorname{Im}z>0$ と定義し、$\operatorname{Im}m_\mu(z)>0$ の分枝を使う。他書の $(z-x)^{-1}$ 規約と符号を混用しない。
- 標準MP分布 $\mu_\gamma$ は $a_\gamma=(1-\sqrt{\gamma})^2$、$b_\gamma=(1+\sqrt{\gamma})^2$ として、連続部分の密度
  $\,\sqrt{(b_\gamma-x)(x-a_\gamma)}/(2\pi\gamma x)\,\mathbf 1_{(a_\gamma,b_\gamma)}(x)$ と、**$p$ 次元ESDに限り**質量 $(1-1/\gamma)_+$ の零原子を持つ。$\gamma=1$ では密度は原点で特異だが零原子はない。
- 収束主張は期待ESD、確率収束、ほとんど確実な収束を個別に宣言する。global ESDの収束から端固有値の収束・局所間隔・逆行列の収束は導けない。

## 3. 正式シラバス：全30講

以下の**30講を正式な計画講数**とする。「1セメスター」は独立科目の呼称であり15週・90分×15回ではない。予定講番号RMT1–RMT30は設計上の番号であり、現時点では実在する章IDではない。初回実装時に系列manifestと章ディレクトリの実在を照合し、正式ID・title・statusを登録する。内容を改変する場合も機械的な講数合わせはせず、この30講設計の変更理由を明示して改訂する。

| 講 | 中心問い・具体内容 | 証明・演習の核 |
|---|---|---|
| **I. 基礎模型と極限測度** | | |
| RMT1 | 何をランダムにするか：Wigner、GOE/GUE、Wishart、Ginibre、実／複素・Hermitian／非Hermitian | 2×2例、スケーリングと典型固有値 |
| RMT2 | 行列から確率測度へ：ESD、スペクトル統計、弱収束と測度の質量 | $d^{-1}\operatorname{tr}f(A)=\int f\,d\mu_A$ を証明 |
| RMT3 | モーメントはいつ測度を決めるか：tightness、moment convergence、一意性 | 有界台／Carleman条件の役割、モーメントだけでは危険な反例 |
| RMT4 | Stieltjes変換から分布を復元できるか：上半平面、Poisson核、反転・一意性 | 符号規約を固定して反転公式を導く |
| RMT5 | 1行・1列を除くと何が起こるか：resolvent identity、Schur補元、rank inequality、leave-one-out | 行列恒等式とESD摂動界の直接計算 |
| **II. Wigner半円則** | | |
| RMT6 | trace momentを閉じた歩道として数える：辺・頂点・独立性 | 消える語と残る語を$n$の次数で分類 |
| RMT7 | なぜCatalan数か：木状walk、非交叉pairing、半円分布の偶数モーメント | Catalan漸化式と$2k$次積分の照合 |
| RMT8 | 半円則の主証明：期待モーメントから確率／ほぼ確実収束へ | 仮定を固定し、分散評価・tightness・一意性まで閉じる |
| RMT9 | 別の道：resolvent自己無撞着方程式と半円Stieltjes変換 | quadratic equation、正しい分枝、誤差の制御 |
| RMT10 | global lawで最大固有値は分かるか：作用素ノルム、成長次数moment、Bai–Yin型結果 | 上界の証明例と下界／必要な尾部条件の分離 |
| **III. 標本共分散とMP則** | | |
| RMT11 | 行Gramと列Gram：SVD、非零固有値、次元比、rank欠損 | $p/n$ の両側の零原子を数える |
| RMT12 | MPモーメントの組合せ：Wishartの跡、非交叉分割、Narayana数 | 低次モーメントを全添字で計算し一般式へ |
| RMT13 | MP則の主証明：leave-one-out resolventと固定点方程式 | iidの明示的モーメント条件下で収束・一意性・密度を導く |
| RMT14 | 原点の原子とhard edge：MP変換の分枝、$\gamma=1$、最小特異値の危険 | 連続密度・零原子・rankの照合 |
| RMT15 | 母共分散が$I$でないとき：general population covarianceとSilverstein方程式 | deterministic equivalentを有限支持模型で導出・検算 |
| **IV. 端・外れ値・揺らぎ** | | |
| RMT16 | global lawからedgeへの飛躍を防ぐ：極値、Bai–Yin、soft/hard edge | 反例と仮定の棚卸し、適用可能なノルム界 |
| RMT17 | 低ランク変更で何が不変か：interlacing、rank inequality、outlier | ESDの不変性と最大固有値の変化を分離 |
| RMT18 | additive spiked Wigner：resolvent方程式と外れ値閾値 | 1次元摂動で閾値・外れ値位置を導く |
| RMT19 | spiked covarianceとBBP相転移：固有値・固有ベクトルの検出可能性 | Gaussian単一spikeの閾値を計算。Tracy–Widom型揺らぎの完全証明は停止線 |
| RMT20 | linear spectral statistics：$\operatorname{tr}f(A)$ の揺らぎとCLT | Gaussian低次多項式の分散をWick計算し、一般CLTの条件を読む |
| **V. Gaussian固有値過程と自由確率** | | |
| RMT21 | Gaussian ensembleの固有値結合密度はなぜVandermondeを持つか | 不変性、Jacobian、固有値反発の2×2例 |
| RMT22 | Hermite多項式とdeterminantal kernel：GUE相関関数 | 直交化からkernel表示を導き、1点・2点相関を検算 |
| RMT23 | 局所間隔と端の揺らぎ：sine kernel、Airy kernel、Tracy–Widom、universality | global/local/edgeの尺度を比較。一般普遍性の完全証明は停止線 |
| RMT24 | 非可換確率と自由独立：trace状態・非交叉分割・自由キュムラント | 短い交互積の消失を計算し、半円則とCatalanへ接続 |
| RMT25 | 自由加法畳み込みと$R$-transform：独立Wigner行列の和 | 自由半円変数の加法則を導出。乗法畳み込みはMPとの接続まで |
| **VI. 非Hermitian行列と統合** | | |
| RMT26 | 複素Ginibre：複素固有値の結合密度・回転対称性 | 小次元の密度から相関kernelへ |
| RMT27 | 円則をどう証明するか：Gaussian Ginibreのglobal circular law | kernelとポテンシャルの明示計算から円盤極限を証明 |
| RMT28 | 一般iid円則はなぜ難しいか：Hermitizationと最小特異値 | $\log\det$ の積分可能性・小特異値制御を検査。一般円則は仮定付き定理として参照 |
| RMT29 | ridgeの予測リスクをスペクトルから読めるか：resolvent・proportional asymptotics | isotropic Gaussian / 明示的random-effects模型でbias–varianceの極限を再構成 |
| RMT30 | 総合講義：半円則・MP・edge・BBP・円則をどう使い分けるか | シミュレーション＋総合証明＋仮定破綻例。double descentへの適用停止線を記述 |

6部×5講＝**30講**。RMT1–RMT15をglobal lawの主証明コア、RMT16–RMT28をスペクトルの異なる尺度・対称性へ広げる発展コア、RMT29–RMT30を応用・横断統合とする。各講は「中心問い→必要な定義→直接例→証明→反例／演習・詳細解答」で完結させ、研究上の大定理を一つの空疎な「紹介講」にしない。

## 4. 証明契約と高度定理の停止線

### 4.1 本文中で核心証明まで閉じる必須項目

- ESDのトレース表示、弱収束・tightness・モーメントとStieltjes変換の適用条件、Poisson核による反転、resolvent／Schur補元／rank不等式。
- Wigner半円則：**一つの明確な独立成分・モーメント仮定**の下で、walk counting→Catalan→期待値→分散→収束種類の格上げを手で追い切る。resolvent経路も誤差項と分枝選択を示し、証明不能な穴を「標準的」と略さない。
- MP則：$X\in\mathbb F^{p\times n}$ の各次元、$\gamma$、平均・分散・独立性・必要モーメントを固定し、主証明に選んだresolvent経路を最後まで導出する。moment経路は少なくとも低次から一般の非交叉計数まで示す。密度・原子は変換とrankの両方で検算する。
- 低ランク摂動のrank不等式、単純なadditive spikeの外れ値方程式、Gaussian ensembleの結合密度／GUEの決定論的kernel、自由独立の基本moment計算、Gaussian Ginibre円則の主証明。
- ridge模型では**使ったMP／Stieltjesの定理をその適用箇所から参照**し、極限交換、$z<0$ の位置、$\gamma=1$・正則化零への接近で非一様な点を明記する。

### 4.2 定理の主張・適用条件・証明の道筋までは示すが、全一般性の完全証明は要求しないもの

- 一般分布のBai–Yin端、一般母共分散のedge universality、BBPのTracy–Widom変形分布、一般linear spectral statistics CLT。
- sine/Airy kernelの全漸近解析とWigner一般局所普遍性、Dyson Brownian motion／optimal local lawを用いる一連の一般定理。
- 非Gaussian iid一般円則に必要な最小特異値・small ball確率の完全評価、任意共分散の自由乗法畳み込みの一般論。

これらには**模型、正規化、moment／tail条件、収束種類、結論の尺度**を揃えたformal statement、導出可能な特殊例、主要な証明機構のマップ、正本への出典を付ける。「証明済み」の表示はせず、後続の研究レベルの発展科目へ明示的に送り出す。各講の中心learning objectiveをその停止線の外へ置かない。

## 5. 演習・反例・数値実験の最低要件

全30講についてDREAM THEATER共通基準を適用し、理由付き例外がなければ**各講A4・B3・C1題以上と全問詳細解答**を用意する（30講合計の形式的下限はA120・B90・C30）。これは最低数であって上限・水増し目標ではない。導入の直接例では定義の**全非自明条件**を確かめる。

横断必修実験：

1. Wigner：Rademacher／Gaussian成分、$n$・シードを固定して半円密度とESDを比較し、対角のスケールを変える反例も観察する。
2. Wishart：$p/n=1/2,1,2$ を比較し、**$p$ 次元正規化**の零原子と非零固有値を同じ図表で区別する。
3. Spikes：閾値前後の最大固有値・固有ベクトル重なりを反復標本で観測し、有限$n$と漸近主張を区別する。
4. GOE/GUE：固有値反発・bulk間隔を、ESDとは別に**局所密度でunfoldingした尺度**で比較する。
5. Ginibre：複素平面固有値の分布を面積密度で確認し、実数軸の半円則のヒストグラムと混同しない。
6. Ridge：$\gamma$ と正則化係数を動かし、固定されたGaussian random-effects模型の理論式・Monte Carlo誤差・$\gamma\approx1$ の不安定性を比較する。

各図・実験は行列サイズ、サンプル数、分布、乱数シード、正規化、軸・密度の意味、比較した理論の仮定を明示する。実験が定理を証明するとは書かない。

失敗例も必修とする：global ESDは一致しても最大固有値だけ発散するrank-one摂動、$\gamma>1$ のrank欠損、有限2次momentだけから無条件に端固有値収束を導く誤推論、$z$ の虚部を先に0へ送る未正当化極限、平均零・等方性を落としたMP適用、$\gamma=1$ で正則化を急に外す計算。

## 6. 実装順・状態管理・完了判定

1. 本PLANは**設計のみ**なので \`textbook/plans/\` に保持する。PLAN本文の改訂を理由に \`plans_progress/\` へ移さない。
2. 初回の章執筆時に、\`textbook/dream-theater-series/RMT.yaml\` の有無、既存IDとsubject routing、前提章の実体・stable anchorを再検査し、30講のmanifestを作る。同じ作業単位でPLANを \`plans_progress/\` へ移動し、manifestの \`plan\` パスも更新する。現時点ではmanifestの先行作成は行わない。
3. 先行してRMT1–RMT5の定義・記号・前提と演習方針を統一し、次にglobal lawの核心証明（RMT6–RMT15）を閉じる。発展講（RMT16–RMT28）では完全証明部分と引用定理を区別し、最後にRMT29–RMT30で適用条件を突き合わせる。
4. 章ごとの実本文・\`chapter.yaml\`・\`knowledge.yaml\`・series manifestを整合させ、DREAM THEATER標準の主要結果と全演習解答を自己検算・別観点で再査読する。新規本文は区分Cとして扱い、変更スコープに合うCI、公開リンク、数式表示を確認する。
5. **30講すべて**についてlearning objectives、証明契約、詳細解答、定理引用の正確性、直接必要な前提、routing・索引、横断実験・総合監査が完了して初めて \`plan_done/\` に移す。講数だけ達成しても完了とはしない。

## 7. 既案からの変更記録

- 旧15項目の「テーマ整理」を**6部30講**の正式シラバスへ確定（2026-11-11）。短い1講への機械分割ではなく、証明上異なる問いごとに切り分けた。
- 旧案のglobal Wigner／MPとridgeだけでは、Tao／AGZ／Bai–Silversteinの標準的射程に対しGaussian固有値過程・自由確率・非Hermitianが欠けるため補完した。
- 未整理だった**端／局所／global、Gaussian／非Gaussian、$p$／$n$ 正規化、硬いedge／軟らかいedge、global law／逆行列極限**を明示的な講義境界とした。
- 原案の「高度なedge・BBPは必要なら講を増やす」を、30講内の**証明契約／引用定理の停止線**に具体化。研究級の完全証明を暗黙に約束しない。
- RMTの教材をSLT2の必修にせず、HDPの有限標本保証とRMTの比例漸近解析のcanonical ownershipを分離した。
