# 統計教材 共通用語ガイド

このファイルは `textbook/`、`statistical-mathematics/`、`applied-rikou-80/`、`anki/` に共通する用語表記の基準です。

公式出題範囲表から転記した用語例の正本は `anki/syllabus/syllabus.yaml` とし、このページにはその用語例をすべて反映します。`syllabus.yaml` に用語を追加・変更したのに本ページへ反映されていない場合は、用語CIを失敗させます。

## 基本原則

- 公式シラバスにある日本語表記を優先する。
- 学習者向け本文では日本語正式名を主表記にする。
- 非自明な英字略語だけで説明を進めない。
- 英語名・略語を教育上示す場合は初出で補助的に併記し、その後は日本語名を使う。
- ファイル名、安定ID、コード、数式記号、引用した原題、公式シラバス自体の標準英字名は例外とする。
- 公式シラバスが括弧内に同義語を示す場合、その同義語自体は禁止しない。ただし教材内の主表記はこのガイドへ寄せる。
- 同義語を無制限に併記せず、この表の「主表記」へ寄せる。
- `knowledge.yaml` の `aliases` は同じ概念・定理の別称に限る。章内で扱うだけの関連語・検索語（例：基本解系の定理に対する「重根」「複素根」）を alias として登録しない。
- 一つの見出しで複数概念を導入するとき、その複合見出しは各概念の `aliases` へ重複登録せず、本文導入位置を照合する `introduction_aliases` に置く。
- 既出概念を再掲するためのローカル concept は、canonical concept 名を alias として取り直さない。「○○の再掲」だけでも複数章で衝突するなら「L2完備性で使うBanach空間の再掲」のように文脈を付け、canonical concept を `requires` で参照する。
- stable ID・stable anchor は後方互換性を担うが、alias は同義語解決を担う。意味的に誤った alias を「古い呼び方だから」「検索できた方が便利だから」という理由だけで残さない。
- 短い標準語が別分野の概念名にも現れる場合、読者向け本文を不自然に改名しない。global alias 側を「関数列の下極限」「Markov連鎖の可逆性」のように必要な文脈で限定する。
- 短い alias に対する監査 WARN は改善候補であり、ゼロ件化が目的ではない。真の同義語なら保持してよく、関連語・構成要素なら `introduction_aliases` または本文へ移す。
- `*` を含む数学・関数解析上の名称（例：弱*位相、weak* topology）は、`*` を意味のある文字として保持する。Markdown の `**` 強調記号とは区別する。

## CIで統一する代表表記

| 主表記 | 単独主表記として避ける表記 | 備考 |
|---|---|---|
| 確率質量関数 | PMF | 初出の `確率質量関数（PMF）` は可 |
| 確率密度関数 | PDF | 初出併記は可 |
| 累積分布関数 | CDF、累積密度関数 | `累積密度関数` は意味も異なるため使用しない |
| 確率母関数 | PGF | 初出併記は可 |
| モーメント母関数 | MGF、積率母関数 | 公式用語例は `モーメント母関数（積率母関数）`。本文の主表記は前者 |
| 特性関数 | CF | 初出併記は可 |
| キュムラント母関数 | CGF | 初出併記は可 |
| 独立同分布 | iid、i.i.d. | 数式内の慣用記法は必要な場合のみ許容 |
| 分散共分散行列 | 共分散行列、covariance matrix のみ | 公式シラバスの表記へ統一 |
| P値 | p値、p 値、P 値、p-value | 数式変数としての `$p$` は別物 |
| フィッシャー情報量 | Fisher情報量 | 固有名詞も日本語表記へ統一 |
| コーシー | Cauchy、カウチー | 分布名は `コーシー分布`。`Cauchy--Schwarz` は別用語としてこのルールでは変換しない |
| ワイブル | Weibull、ウェイブル、レイブル | 分布名は `ワイブル分布`。初出の `ワイブル分布（Weibull distribution）` は可 |
| パレート | Pareto | 分布名は `パレート分布`。初出の英語併記は可 |

## 推定・検定

| 主表記 | 単独主表記として避ける表記 |
|---|---|
| 最尤法／最尤推定量 | MLE |
| 尤度比検定 | LRT |
| 尤度比 | LR |
| ワルド検定 | Wald test のみ |
| スコア検定 | Score test のみ |
| クラーメル・ラオの不等式 | CRLB |
| ネイマン・ピアソンの基本定理 | NP lemma のみ |
| 最強力検定 | MP test |
| 一様最強力検定 | UMP |
| 一様最強力不偏検定 | UMPU |
| 一様最小分散不偏推定量 | UMVU |
| 信頼区間 | CI |
| 標準誤差 | SE |
| 平均二乗誤差 | MSE |

「ネイマン・ピアソンの補題」は一般的な教科書用語として使用してよい。ただし、公式シラバスとの対応を示す箇所では `ネイマン・ピアソンの基本定理` と対応付ける。

## 漸近論・線形モデル

| 主表記 | 単独主表記として避ける表記 |
|---|---|
| 中心極限定理 | CLT |
| 大数の法則 | LLN |
| デルタ法 | Delta method のみ |
| 通常最小二乗法 | OLS |
| 一般化最小二乗法 | GLS |
| 分散分析 | ANOVA |
| 共分散分析 | ANCOVA |
| 一般化線形モデル | GLM |
| 特異値分解 | SVD |
| 主成分分析 | PCA |

## 固有名詞・表記

- Neyman–Pearson は本文では「ネイマン・ピアソン」。
- Fisher は本文では「フィッシャー」。
- Bayes は本文では「ベイズ」。
- Wald は本文では「ワルド」。
- Score test は本文では「スコア検定」。
- Lehmann–Scheffé は本文では「レーマン・シェッフェ」。
- Cramér–Rao は本文では「クラーメル・ラオ」。

## DREAM THEATER：線形代数・幾何の主表記

| 主表記 | 補助的な英語表記 | 備考 |
|---|---|---|
| テンソル積 | tensor product | 初出で英語併記可。以後は日本語主表記 |
| 反変テンソル | contravariant tensor | 型の説明では「反変次数」も使用 |
| 共変テンソル | covariant tensor | 型の説明では「共変次数」も使用 |
| 縮約 | contraction | 本文で contraction を主語彙にしない |
| 交代化 | antisymmetrization | 記号 `Alt` は数式中で使用可 |
| 外冪 | exterior power | `Λ^kV^*` は数式記号として保持 |
| 外積（ウェッジ積） | wedge product / exterior product | 微分形式・外積代数の文脈では「外積」を主表記とし、ベクトルの外積との混同があり得る初出だけ「ウェッジ積」を補助併記 |
| 分解可能形式 | decomposable form | 「単純形式」へ機械的に言い換えない |
| 内部積 | interior product | 記号 `ι_v` は数式中で使用可 |
| 位相多様体 | topological manifold | Hausdorff・第二可算・局所 Euclid を条件として明示 |
| 座標近傍 | coordinate chart | 組 $(U,\varphi)$ を指す。写像単体は「座標写像」 |
| 局所座標 | local coordinates | 座標写像の成分 |
| アトラス | atlas | 定着したカタカナ表記を主表記とする |
| 滑らかなアトラス | smooth atlas | 英語を本文主語彙にしない |
| 極大滑らかアトラス | maximal smooth atlas | 滑らかな構造の正本 |
| 滑らかな構造 | smooth structure | 極大滑らかアトラスとして定義 |
| 滑らかな多様体 | smooth manifold | 英語を本文主語彙にしない |
| 積多様体 | product manifold | 有限積の滑らかな構造 |
| 実射影空間 | real projective space | 記号 $\mathbb{RP}^n$ は保持 |
| 滑らかな写像 | smooth map | 座標表示が $C^\infty$ 級 |
| 微分同相写像 | diffeomorphism | 英語を本文主語彙にしない |
| 芽 | germ | 局所関数の同値類。初出で英語併記可 |
| 接ベクトル | tangent vector | 曲線速度または点での微分作用素として定義 |
| 接空間 | tangent space | 記号 $T_pM$ は保持 |
| 座標基底 | coordinate basis | 接空間では $\partial/\partial x^i|_p$ を使用 |
| 写像の微分 | differential / tangent map | 本文では「微分」を主表記とし、記号 $df_p$ を使用 |
| 余接空間 | cotangent space | 記号 $T_p^*M$ は保持 |
| 余ベクトル | covector | 英語を本文主語彙にしない |
| 引き戻し | pullback | 点での余ベクトルおよび後続の微分形式で使用 |
| 接束 | tangent bundle | 記号 $TM$ は保持 |
| 余接束 | cotangent bundle | 記号 $T^*M$ は保持 |
| ベクトル束 | vector bundle | 初出で英語併記可。以後は日本語主表記 |
| 局所自明化 | local trivialization | ベクトル束の局所直積表示 |
| 階数 | rank | 微分の像の次元。数式では `\operatorname{rank}` を使用可 |
| 定数階数定理 | constant rank theorem | 本文では日本語主表記 |
| はめ込み | immersion | 微分が各点で単射となる滑らかな写像 |
| 沈め込み | submersion | 微分が各点で全射となる滑らかな写像 |
| 埋め込み | embedding | はめ込みかつ像への同相写像 |
| 埋め込み部分多様体 | embedded submanifold | 初出後、文脈が明確なら「部分多様体」と略してよい |
| 正則点 | regular point | 微分が全射となる点 |
| 臨界点 | critical point | 微分が全射でない点 |
| 正則値 | regular value | 逆像の全点が正則点。空の逆像も許す |
| 臨界値 | critical value | 臨界点の像として現れる値 |
| レベル集合 | level set | (f^{-1}(q)) 型の逆像 |
| 局所有限族 | locally finite family | 各点のある近傍が有限個の集合としか交わらない族 |
| 細分 | refinement | 開被覆を、各要素が元の被覆要素の一つに含まれる別の開被覆へ細かくすること |
| パラコンパクト | paracompact | 任意の開被覆が局所有限な開細分を持つ性質 |
| 隆起関数 | bump function | コンパクト台を持つ滑らかな関数。初出で英語併記可 |
| 1 の分割 | partition of unity | 非負・局所有限な滑らかな関数族で総和が1。開被覆への従属性も日本語で記述する |
| ベクトル場 | vector field | 本文では日本語主表記 |
| 局所流 | local flow | 本文では「局所流」または文脈上明らかな場合「流れ」 |
| Lie 括弧 | Lie bracket | 人名・固有表記部分を英字で保持し、「Lie bracket」を本文主語彙にしない |
| 線形分布 | distribution / smooth distribution | 多様体上の一定階数の接方向の族。必要なら「滑らかな線形分布」と明示 |
| 積分多様体 | integral manifold | 線形分布の接方向を実現するはめ込み多様体 |
| 対合的な分布 | involutive distribution | Lie 括弧で閉じている線形分布 |
| 適応座標 | adapted coordinates | 分布が座標方向で張られる局所座標 |
| Frobenius の定理 | Frobenius theorem | 人名部分は英字表記を保持 |
| テンソル場 | tensor field | 初出で英語併記可。以後は日本語主表記 |
| 微分形式 | differential form | 記号 $\Omega^k(M)$ は保持 |
| 外微分 | exterior derivative | 記号 $d$ は数式中で使用 |
| Lie 微分 | Lie derivative | 記号 $\mathcal L_X$ は数式中で使用 |
| Cartan の公式 | Cartan formula | 人名部分は英字表記を保持。$\mathcal L_X=d\iota_X+\iota_Xd$ |
| 向き | orientation | ベクトル空間・多様体の向き。本文では日本語主表記 |
| 向き付け可能 | orientable | 多様体の性質として「向き付け可能」を主表記とする |
| 向き形式 | orientation form | どの点でも消えない最高次微分形式 |
| 境界付き滑らかな多様体 | smooth manifold with boundary | 本文では日本語主表記 |
| 境界向き | boundary orientation | 原則として外向き先頭規約を明示する |
| 最高次形式の積分 | integration of top-degree forms | 「多様体上の積分」の局所定義では最高次形式であることを明示する |
| 一般 Stokes の定理 | generalized Stokes theorem | VC5 の Kelvin--Stokes の定理と区別して「一般 Stokes の定理」と書く |
| 閉形式 | closed differential form | 外微分が 0 の微分形式。本文では「closed form」を主表記にしない |
| 完全形式 | exact differential form | 1つ低い次数の微分形式の外微分として書ける形式 |
| 滑らかなホモトピー | smooth homotopy | 本文では日本語主表記。写像間の滑らかな変形 |
| ホモトピー作用素 | homotopy operator | 記号 $K_H$ は数式中で使用可 |
| Poincaré の補題 | Poincaré lemma | 人名部分は英字表記を保持 |
| de Rham 複体 | de Rham complex | 人名部分は `de Rham` を保持 |
| de Rham コホモロジー | de Rham cohomology | 記号 $H^k_{\mathrm{dR}}(M)$ は保持 |
| 変形レトラクト | deformation retract | 位相・微分位相の文脈で日本語主表記 |
| 角度1形式 | angular 1-form | 穴あき平面の $(-y\,dx+x\,dy)/(x^2+y^2)$ を指す場合に使用 |
| Whitney の埋め込み定理 | Whitney embedding theorem | 人名部分は英字表記を保持 |
| 正則曲線 | regular curve | 速度ベクトルが消えない滑らかな曲線 |
| 弧長パラメータ | arc-length parameter | 「arc length parameter」を本文主語彙にしない |
| 曲率 | curvature | 曲線では単位接ベクトルの弧長変化率。後続の Riemann 曲率とは文脈で区別 |
| Frenet 標構 | Frenet frame | 人名部分は英字表記を保持 |
| 捩率 | torsion | 空間曲線の Frenet 標構のねじれを表す量 |
| 超曲面 | hypersurface | Euclid 空間内では余次元1の埋め込み部分多様体 |
| 単位法線場 | unit normal field | 本文では日本語主表記 |
| 第一基本形式 | first fundamental form | 周囲の Euclid 内積を接空間へ制限した内積 |
| Gauss 写像 | Gauss map | 人名部分は英字表記を保持 |
| 形作用素 | shape operator / Weingarten map | 本系列では $S=-dN$ の符号規約を使用 |
| 第二基本形式 | second fundamental form | 本系列では $II(v,w)=\langle Sv,w\rangle$ |
| 主曲率 | principal curvature | 形作用素の固有値 |
| 主方向 | principal direction | 形作用素の固有ベクトルが張る方向 |
| Gauss 曲率 | Gaussian curvature | 二次元曲面では主曲率の積 $K=\det S$ |
| 平均曲率 | mean curvature | $n$ 次元超曲面では $H=\operatorname{tr}S/n$ |
| 正規曲率 | normal curvature | 単位接方向 $v$ に対する $II(v,v)$ |
| Gauss 公式 | Gauss formula | 人名部分は英字表記を保持。超曲面の二階微分を接成分と法線成分へ分解する公式 |
| Christoffel 係数 | Christoffel symbols | 人名部分は英字表記を保持。「Christoffel symbols」を本文主語彙にしない |
| Weingarten 公式 | Weingarten formula | 人名部分は英字表記を保持。本系列では $S=-dN$ の符号規約に合わせる |
| Gauss 方程式 | Gauss equation | 人名部分は英字表記を保持 |
| Codazzi 方程式 | Codazzi equation | 人名部分は英字表記を保持 |
| 構造方程式 | structure equations | Gauss--Weingarten 系を行列値1形式でまとめる文脈で使用 |
| Gauss の驚異の定理 | Theorema Egregium | 人名部分は英字表記を保持。Gauss 曲率の内在性を表す定理 |
| 超曲面の基本定理 | fundamental theorem of hypersurfaces | Gauss--Codazzi を局所存在・剛性へ反転する定理 |
| 全臍的超曲面 | totally umbilic hypersurface | 形作用素が各点で恒等写像のスカラー倍となる超曲面 |
| 剛体運動 | Euclidean rigid motion | 直交変換と平行移動の合成 |
| Riemann 計量 | Riemannian metric | 人名部分は英字表記を保持。接空間ごとに滑らかに変化する正定値内積 |
| Riemann 多様体 | Riemannian manifold | Riemann 計量を備えた滑らかな多様体 |
| flat・sharp 同型 | musical isomorphisms | 数式では $\flat,\sharp$ を使用可。本文では必要に応じて「flat・sharp 同型」と書く |
| Riemannian 勾配 | Riemannian gradient | Euclid の「勾配」と区別が必要な箇所では Riemannian を付す |
| Riemann 長 | Riemannian length | 曲線速度の計量ノルムを積分した長さ |
| 曲線エネルギー | energy of a curve | $E_g(\gamma)=\frac12\int|\dot\gamma|_g^2$ |
| Riemann 距離 | Riemannian distance | 曲線長の下限で定義する距離 |
| Riemann 等長写像 | Riemannian isometry | 計量を引き戻しで保つ微分同相写像 |
| Riemann 体積形式 | Riemannian volume form | 向き付けられた Riemann 多様体上の正の最高次形式 |
| Riemannian 発散 | Riemannian divergence | 体積形式の Lie 微分から定義 |
| Laplace--Beltrami 作用素 | Laplace--Beltrami operator | 人名部分は英字表記を保持。$\Delta_g=\operatorname{div}_g\operatorname{grad}_g$ |
| アフィン接続 | affine connection | ベクトル場を別のベクトル場の方向へ共変微分する規則 |
| 共変微分 | covariant derivative | 接続を用いたベクトル場・テンソル場の方向微分 |
| 接続の捩率 | torsion of a connection | Frenet 標構の「捩率」と区別が必要な箇所では「接続の捩率」と書く |
| 曲線に沿う共変微分 | covariant derivative along a curve | 曲線上のベクトル場を接続で微分する演算 |
| 平行ベクトル場 | parallel vector field along a curve | 曲線に沿う共変微分が0のベクトル場 |
| 平行移動 | parallel transport | 初期接ベクトルを平行ベクトル場として曲線に沿って運ぶ線形写像 |
| 計量両立性 | metric compatibility | 共変微分が Riemann 計量の内積に対して積の微分則を満たす性質 |
| Levi-Civita 接続 | Levi-Civita connection | 人名部分は英字表記を保持。計量両立かつ捩率0の一意な接続 |
| Koszul の公式 | Koszul formula | 人名部分は英字表記を保持。計量と Lie 括弧から Levi-Civita 接続を決める公式 |
| テンソル場の共変微分 | covariant derivative of a tensor field | 接続を余ベクトル場・一般テンソル場へ Leibniz 則と縮約保存で拡張した微分 |

## DREAM THEATER：数値解析の主表記

| 主表記 | 補助的な英語表記 | 備考 |
|---|---|---|
| 零点／根 | zero / root | 関数 $f$ に対する $f(\alpha)=0$ の点。文脈に応じて「零点」「根」を使う |
| 単根 | simple root | 重複度1の根。本文の主表記は「単根」とし、「単純根」は原則として主表記にしない |
| 重根 | multiple root / repeated root | 重複度2以上の根。本文の主表記は「重根」とし、「重複根」「多重根」は原則として主表記にしない |
| 重複度 | multiplicity | $m$ 回重なる根は「$m$ 重根」と書ける |

## DREAM THEATER：ODE・PDE の主表記

| 主表記 | 補助的な英語表記 | 備考 |
|---|---|---|
| 捕捉領域 | trapping region | 初出で英語併記可。以後は日本語主表記 |
| 非斉次項 | source term | 外力・内部発熱など PDE 右辺の入力を指すときの主表記 |
| 次元降下法 | method of descent | 波動方程式で高次元公式から低次元公式を導く方法。必要なら「変数低減法」を補助併記可 |
| Legendre の陪微分方程式 | associated Legendre equation | 人名部分は英字表記を保持 |
| Legendre 陪関数 | associated Legendre function | 人名部分は英字表記を保持 |
| 立体調和関数 | solid harmonic | $r^\ell Y_\ell^m$ 型の三次元調和関数 |
| 特性焦散 | characteristic caustic | 初出で「特性焦散（caustic）」と補助併記可 |
| アイコナール方程式 | eikonal equation | eikonal 方程式を本文の主表記にしない |
| 粘性解 | viscosity solution | 必要なら初出で英語併記可。subsolution / supersolution は「粘性劣解 / 粘性優解」 |
| Poisson 核 | Poisson kernel | 人名部分は英字表記を保持し、一般名詞は日本語主表記 |
| ハミルトニアン | Hamiltonian | 初出で英語併記可。以後は「ハミルトニアン」を主表記 |

## 公式シラバス用語例

以下は `anki/syllabus/syllabus.yaml` の `items[].terms` を、シラバスの小項目ごとに反映したものです。括弧を含む表記も公式用語例としてそのまま残します。

### 統計数理：確率と確率変数

- **事象と確率**：確率の計算、統計的独立、条件付き確率、ベイズの定理、包除原理
- **確率分布と母関数**：確率関数、確率密度関数、累積分布関数、生存関数、危険率、同時分布、周辺分布、条件付き分布、確率母関数、モーメント母関数（積率母関数）
- **分布の特性値**：モーメント、期待値、分散、標準偏差、歪度、尖度、変動係数、パーセント点、中央値、四分位数、範囲、四分位範囲、最頻値、共分散、相関係数、偏相関係数
- **変数変換**：変数変換、確率変数の線形結合
- **極限定理と確率分布の近似**：大数の弱法則、中心極限定理、二項分布の正規近似とポアソン近似、少数法則、連続修正

### 統計数理：種々の確率分布

- **離散型分布**：一様分布、ベルヌーイ分布、二項分布、超幾何分布、幾何分布、ポアソン分布、負の二項分布、多項分布
- **連続型分布**：一様分布、正規分布（ガウス分布）、指数分布、ガンマ分布、ベータ分布、コーシー分布、対数正規分布、ワイブル分布、ロジスティック分布、多変量正規分布
- **標本分布**：t分布、カイ二乗分布、F分布

### 統計数理：統計的推測（推定）

- **母集団と標本・統計量**：十分統計量、ネイマンの分解定理、順序統計量
- **尤度と最尤推定**：尤度関数、対数尤度関数、有効スコア関数、最尤推定
- **各種推定法**：モーメント法、最小二乗法、線形推定（BLUE）、その他の手法
- **点推定量の性質**：不偏性、一致性、十分性、有効性、推定量の相対効率
- **モデル評価基準**：カルバック・ライブラー情報量、情報量規準AIC、クロスバリデーション
- **漸近的性質など**：クラーメル・ラオの不等式、フィッシャー情報量（1次元）、最尤推定量の漸近正規性、デルタ法
- **区間推定**：信頼係数、信頼区間の構成、被覆確率

### 統計数理：統計的推測（検定）

- **検定の基礎**：仮説、検定統計量、P値、有意水準、棄却域、第一種の過誤、第二種の過誤、検出力（検定力）、検出力曲線
- **検定法の導出**：ネイマン・ピアソンの基本定理、尤度比検定、ワルド型検定、スコア型検定
- **正規分布に関する検定**：平均値と分散に関する検定、複数の平均に関する検定
- **種々の検定法**：二項分布・ポアソン分布など基本的な分布に関する検定、適合度の検定、ノンパラメトリック検定

### 統計数理：データ解析法の考え方と各種分析手法

- **分散分析**：一元配置分散分析、二元配置分散分析、交互作用、共分散分析、多重比較
- **回帰分析**：線形単回帰、線形重回帰、最小二乗推定、回帰の分散分析、重相関係数、決定係数、残差、変数変換、平均への回帰（回帰効果）
- **分割表の解析**：カイ二乗検定、フィッシャー検定、マクネマー検定、イェーツの補正
- **ノンパラメトリック法**：符号検定、ウィルコクソン順位和検定（マン・ホイットニーU検定）、ウィルコクソン符号付き順位和検定、順位相関係数
- **不完全データ**：欠測（欠損）、打ち切り、トランケーション
- **シミュレーション**：乱数、モンテカルロシミュレーション、MCMC、ブートストラップ
- **ベイズ法**：事前分布、事後分布、階層ベイズモデル、ギブスサンプリング

### 統計応用：共通事項

- **研究の種類**：実験研究、観察研究、調査
- **標本調査法**：完全無作為抽出、層化抽出、二段階抽出、サンプルサイズの設計
- **実験計画法**：フィッシャーの3原則、一元配置法、二元配置法、ブロック化、乱塊法、一部実施要因計画
- **重回帰分析**：重回帰モデル、変数選択、残差分析、一般化最小二乗推定、ガウス・マルコフの定理、多重共線性、L1正則化法、回帰診断法
- **各種多変量解析法**：主成分分析、因子分析、判別分析、クラスター分析、ロジスティック回帰分析、プロビット分析、トービット分析、一般化線形モデル、非線形回帰モデル、サポートベクターマシン
- **確率過程**：マルコフ連鎖、ランダムウォーク、ポアソン過程、ブラウン運動
- **時系列解析**：ARIMAモデル、状態空間モデル

### 統計応用：理工学分野

- **多変量解析法**：多変量正規分布、平均ベクトル、分散共分散行列、相関行列、固有値・固有ベクトル
- **確率過程**：ランダムウォーク、マルコフ過程、ポアソン過程、マルコフ連鎖、時系列解析、自己回帰過程、移動平均過程、ARIMA過程
- **線形推測**：線形モデル、一般化線形モデル、線形結合の分布、線形対比、線形制約
- **漸近理論**：大数の法則、中心極限定理、最尤推定量の漸近正規性、漸近分散、一致性、デルタ法
- **品質管理**：管理図、信頼性、保全性、プロセス管理、工程能力指数
- **実験計画**：実験の計画と実施、固定効果、変量効果、交絡因子、ブロック化、直交表、交絡法

## CIで弾く典型的な表記揺れ

CIではコード・数式・URLを除いた本文を対象に、変更で追加された行について次を検査します。

- `PMF`、`PDF`、`CDF`、`PGF`、`MGF` などを日本語正式名なしで単独主表記にする。
- `MLE`、`LRT`、`UMP`、`UMPU`、`UMVU`、`CI`、`MSE`、`CLT`、`LLN`、`OLS`、`GLS`、`ANOVA`、`GLM` などを日本語正式名なしで単独主表記にする。
- `p値`、`p 値`、`P 値`、`p-value` を使う（`P値` に統一）。
- `Fisher情報量` を使う（`フィッシャー情報量` に統一）。
- `Cauchy`／`カウチー`、`Weibull`／`ウェイブル`／`レイブル`、`Pareto` を本文の主表記にする（それぞれ `コーシー`、`ワイブル`、`パレート` に統一）。
- `累積密度関数` を使う（`累積分布関数` に修正）。
- `共分散行列` を主表記にする（理工学シラバスに合わせ `分散共分散行列` に統一）。

日本語正式名と同じ行で初出併記する英語名・略語、コード、インラインコード、数式、URL、安定IDは検査対象外です。

## 変更手順

1. 公式シラバス由来の用語を変更する場合は、先に `anki/syllabus/syllabus.yaml` を確認する。
2. `syllabus.yaml` の `items[].terms` を変更した場合は、本ページの「公式シラバス用語例」にも同じ表記を反映する。
3. 新しい典型的な表記揺れを見つけた場合は、各教材のローカル規約ではなく本ページと `scripts/audit_terminology.mjs` に追加する。