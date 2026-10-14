# DREAM THEATER 超越数論Ⅰ：Hermite–LindemannからLindemann–Weierstrassへ

作成日: 2026-10-11  
改訂日: 2026-10-14（標準教科書・自足的証明資料との照合）  
状態: planned（PLAN設計のみ。TRN本文・manifestは未実装）

## 0. 中心問いと到達点

**代数的な数が満たす整数性と、指数関数の解析的な小ささをぶつけて、超越性をどう証明するか。**

既習の有理近似によるLiouville法（NDA6）を出発点に、次の順で進む。

1. 整数・代数的整数の離散性、共役、跡・ノルムを準備する。
2. Hermiteの積分恒等式と素数合同から **$e$ の超越性**を完全証明する。
3. 代数的指数・係数を整理し、**Hermite–Lindemann定理**（$0\ne\alpha\in\overline{\mathbb Q}$ なら $e^\alpha$ は超越数）を完全証明する。
4. **Lindemann–Weierstrass定理**の有理係数版を完全証明する。これから代数的独立性と係数体拡大に関する補題を使い、代数的係数版まで導く。

最終定理は、**相異なる** $\alpha_1,\ldots,\alpha_m\in\overline{\mathbb Q}$ について
$$
\sum_{j=1}^m\beta_je^{\alpha_j}=0,\qquad
\beta_j\in\overline{\mathbb Q}
\quad\Longrightarrow\quad
\beta_1=\cdots=\beta_m=0
$$
である。指数の「相異なる」と「$\mathbb Q$ 上一次独立」は別条件であり、帰結を使い分ける。

読者は次を自力で再現できること。
- **整数性・非零性・解析上界**を別個に証明し、最後に矛盾へ結合する。
- 補助多項式の零点の重複度、階乗、微分値、素数条件、分母消去を具体的に計算する。
- 複素線分積分・共役の有限積の各操作と「どの体の上の等式か」を明示できる。
- $e^\alpha$・$\pi$ の超越性、代数的指数の像の一次独立性、$\mathbb Q$ 上一次独立な指数の像の**代数的独立性**を区別して証明できる。

14章は**中心問いごとの暫定分割**で、授業時間・文字数・演習数の上限ではない。証明を追うため必要なら章を増減するが、既存計画に依存するTRN11の出口は維持する。

## 1. 既習資産と責務の境界

### 1.1 canonical dependency

- FLD0–FLD2、FLD4：有限体拡大、最小多項式、共役・分解体、Galois作用。RNG3–4：整数・多項式の可除性、既約性。
- LAの有限次元線形写像・行列式：代数的整数の有限生成加群判定、跡・ノルムの橋渡しで必要な箇所だけ、実在の結果anchorを照合する。
- RA1–RA5、CA1–CA3：微積分、指数・複素指数、正則性と線積分。複素線分上の積分表示は必要な適用条件をTRNで再確認する。
- **NDA5–NDA6は2026-10-14確認時点でcompleted。** NDA6にLiouvilleの近似下界・Liouville数・超越性・構成の本文と詳細証明が実在する。TRN3ではNDA6の [Liouvilleの近似下界](../volumes/dream_thater/代数系/NDA/NDA6/index.md#thm-nda6-liouville-bound) にリンクし、同じ完全証明を繰り返さない。
- SQC7はTRN11のHermite–Lindemannを利用して円積作図不可能性を証明する。SQC側に超越性定理そのものの再証明を作らない。

実際のchapter.yamlやknowledge.yamlのprerequisitesは、章の執筆時に**使用する結果のある最小限の先行章**を照合して確定する。FLDやLAの全系列を一律に加えない。未実装のTRN章を既習にしない。

### 1.2 このPLANが証明を所有するもの

代数的整数のうち本証明に必要な算術、Hermite型恒等式、$e$ の超越性、Hermite–Lindemann、Lindemann–Weierstrassの**完全証明**。代数的整数環の一般論（Dedekind整域、素イデアル分解、類群など）には拡張しない。

実装上の重要な方針は、**一般の代数的係数版のために素数合同型の補助多項式をもう一度組み立てない**こと。有理係数版から多変数の代数的独立性、さらに代数的係数への昇格を証明して再利用する。ただし「有理係数上一次独立だから代数的係数上も一次独立」という**直接の推論は誤り**なので、TRN14の補題が不可欠である。

## 2. 標準書との照合・採用する証明ルート

| 資料 | 確認した構成・利用範囲 | 本PLANでの判断 |
| --- | --- | --- |
| M. Ram Murty / P. Rath, *Transcendental Numbers* (Springer, 2014), 第1–4章 | Liouville → Hermite → Lindemann → Lindemann–Weierstrassの独立した章立て。出版社目次を照合 | TRN3–14の大きな順序の基準。短い章をそのまま再現せず、補題と演習を展開する |
| A. Baker, *Transcendental Number Theory* (Cambridge, 1975/2022), 第1章 | 起源としてLiouville・$e$・Lindemannを扱う。出版社目次を照合 | 主結果の射程と歴史上の位置を照合。後続の対数形式は範囲外 |
| S. A. Popescu, *A simple and self-contained proof for the Lindemann-Weierstrass theorem*, arXiv:2306.14352v2, §1–3 | 算術補題を自足化し、$\mathbb Q$係数版を定理3.1として証明してから一般版へ進む。**同論文の定理3.1の証明は、それ以前に$\pi$の超越性を得ていることを使用する** | TRN11で$\pi$まで閉じてからTRN12の$\mathbb Q$係数版へ進む。整数性・mod $p$・非零性・積分上界の検算元とする |
| M. Waldschmidt, *Introduction to Diophantine methods: irrationality and transcendence* (2007) | 無理性 → Hermiteの積分式 → 超越性への段階的導入。講義概要を照合 | TRN3–4に小さい例と方法比較を配置する |

**資料の利用限界**：出版社サイトで公開された書籍の章題・目次は構成の照合資料であって、閲覧していない有料本文の個別証明を検証済みとしない。Popescuの本文も無批判に正本化せず、導関数の係数、Galois作用、素数の例外集合、複素積分を独立に検算して採用する。証明を記号・行間から再構成し、文章を転記しない。

### 最終章へ至る数学的な短絡防止

- $\mathbb Q$係数版を証明後、$\mathbb Q$ 上一次独立な代数的数 $\gamma_1,\dots,\gamma_r$ について、$y_i=e^{\gamma_i}$ の多項式関係を指数和に展開する。異なる単項式の指数 $\sum n_i\gamma_i$ は異なるので、**$y_1,\dots,y_r$ は$\mathbb Q$ 上代数的独立**。
- $y_i$ が$\mathbb Q$上代数的独立なら、**$\overline{\mathbb Q}$ 上でも代数的独立**。もし非零 $P\in K[Y_1,\dots,Y_r]$（$K/\mathbb Q$ 有限Galois）が $P(y)=0$ を満たすなら、係数だけに作用させた
  $$
  N(P)=\prod_{\sigma\in\operatorname{Gal}(K/\mathbb Q)}\sigma(P)
  \in\mathbb Q[Y_1,\dots,Y_r]\setminus\{0\}
  $$
  が $N(P)(y)=0$ を満たし矛盾する。積が非零なのは多項式環が整域だからであり、**$\sigma(e^{\alpha})=e^{\sigma(\alpha)}$ とは主張していない**。
- 任意の相異なる代数的指数$\alpha_j$は、$\mathbb Q$線形独立な代数的基底$\gamma_1,\dots,\gamma_r$を適切に有理数倍して
  $$
  \alpha_j=\sum_{i=1}^r n_{ji}\gamma_i,\qquad n_{ji}\in\mathbb Z
  $$
  と表示できる。すると $e^{\alpha_j}=\prod_i y_i^{n_{ji}}$。異なる$\alpha_j$は異なる指数ベクトルを与える。負冪を払えば、任意の代数的係数の線形関係は非零多項式関係となり矛盾する。
- この順序は「代数的係数に$\sigma$を作用させた結果、指数関数値まで共役になる」という不正な操作を回避する。

## 3. 各章の詳細設計（TRN1–TRN14）

### TRN1 代数的整数と有限生成加群の判定

**問い**：有理数の分母を消しただけの元と、真に整数性を持つ元をどう区別するか。

- $\overline{\mathbb Q}$、代数的整数、$\mathbb Z$係数モニック多項式を導入。$\mathbb Q\cap\overline{\mathbb Z}=\mathbb Z$ を証明。
- $\alpha$が代数的整数 $\Longleftrightarrow$ $1$を含み$\alpha M\subseteq M$を満たす有限生成$\mathbb Z$加群 $M\subset\mathbb C$ が存在する、という判定を、生成系に対する行列式の議論で証明。生成系が基底とは限らない点を説明する。
- 判定により代数的整数の和・積の閉性を証明。$\sqrt2$、$(1+\sqrt5)/2$、$1/2$ を各条件から直接判定する。
- **証明ゲート**：行列表示がどの有限生成加群上の乗法を表すか、モニック多項式がなぜ得られるかを途中式付きで確認。

### TRN2 共役・跡・ノルム・分母消去

**問い**：代数的整数を、絶対値が1以上の通常の整数にどう変換するか。

- 有限分離拡大の埋め込みと共役、線形写像としての跡・ノルム、共役の和・積との一致を必要な条件で証明。
- 代数的整数の共役も代数的整数であり、$K/\mathbb Q$が有限拡大なら代数的整数の跡・ノルムは$\mathbb Z$に入る。$\eta\ne0$ のときノルムが非零であることも示す。
- 任意の有限個の代数的数に共通の正整数を掛けて代数的整数にできることと、**通常の整数になったとは限らない**ことを区別する。
- 二次体の具体例、有限Galois拡大での共役積を計算する。
- **証明ゲート**：共役が重複する拡大、埋め込みの個数、跡／ノルムの作用体、非零条件を混同しない。

### TRN3 NDA6のLiouville法とHermite法の違い

- [NDA6の定理](../volumes/dream_thater/代数系/NDA/NDA6/index.md#thm-nda6-liouville-bound)により、代数的無理数には有理近似の制限があることを確認。証明は再掲しない。
- $e$ の近似や指数値の関係では、Liouville型近似だけで超越性が出たことにはならない理由を説明する。小さな「零でない整数$\to0$」模型を示す。
- **演習**：無理性／超越性／代数的独立性の量化、有理近似の良さだけではどこが不足するか。

### TRN4 Hermiteの微分和・積分恒等式

- 多項式$f$に対し $F=\sum_{k=0}^{\deg f}f^{(k)}$ と置き、
  $$
  F-F'=f,\qquad (e^{-z}F(z))'=-e^{-z}f(z)
  $$
  を検証。
- 実数の端点から複素線分の端点まで、
  $$
  e^bF(a)-e^aF(b)=\int_a^b e^{b+a-z}f(z)\,dz
  $$
  を導く（$a=0$では $e^bF(0)-F(b)=\int_0^b e^{b-z}f(z)\,dz$）。積分路、向き、原始関数の存在を示す。
- **演習**：2次・3次$f$で有限微分和と端点恒等式、線分パラメータ表示と上界を計算する。
- **証明ゲート**：符号と指数因子、$\int_a^b$の経路、微分と積分の適用条件を別々に検算する。

### TRN5 $e$に対する補助多項式と素数合同

- $e$が代数的だと仮定して $a_0+\cdots+a_ne^n=0$（$a_j\in\mathbb Z,\ a_0a_n\ne0$）を固定する。
- 十分大きな素数$p$に対し、具体候補
  $$
  f_p(x)=\frac{x^{p-1}\prod_{j=1}^{n}(x-j)^p}{(p-1)!},\qquad
  F_p=\sum_{k=0}^{\deg f_p}f_p^{(k)}
  $$
  を採用する。$f_p$そのものが整数係数であるとは誤記せず、**整数点での微分値**を検証する。
- $F_p(j)\in\mathbb Z$、$F_p(j)\equiv0\pmod p$（$j=1,\dots,n$）、$F_p(0)\equiv(-1)^{np}(n!)^p\pmod p$ をLeibniz則と階乗で導く。
- $p>n$ かつ$p\nmid a_0$等の選択条件を明示し、$A_p=\sum_{j=0}^na_jF_p(j)\in\mathbb Z\setminus\{0\}$を示す。
- **演習**：小さい$n,p$で導関数の消失次数・余りを手計算。合同と整数性を別問にする。

### TRN6 Hermiteの定理：$e$の超越性

- TRN4の恒等式をTRN5の多項式に使い、代数関係を代入して $A_p$ を有限和の積分に変換する。
- $[0,n]$上の因子を明示的に押さえ、固定された$n,a_j$に対して
  $$
  |A_p|\le C\,\frac{D^p}{(p-1)!}\longrightarrow0
  $$
  となる定数$C,D>0$（$p$には依存しない）を導出する。
- 非零整数による$|A_p|\ge1$と矛盾。誤差上界の成立に使った実積分と複素積分の区別を確認する。
- **完全証明ゲート**：TRN4–6のみから読者が$e$の超越性の最終矛盾を再現できる。

### TRN7 共役に関する対称化と代数的係数の取扱い

- 指数と係数を含む有限Galois拡大$K/\mathbb Q$を選ぶ。作用する対象は**代数的な係数・指数**であり、指数関数値へ安易に自己同型を作用させない。
- 共役を含めた有限積の展開で現れる指数の和、重複指数の統合、係数の消失、非零性をそれぞれ確認する。有限積を「初めから零でない形式的多項式」として扱う場合と「複素数として零になる評価結果」を明確に分ける。
- 共役不変な代数的整数が有理数、従って整数になる原理を証明済みのTRN2へ接続する。
- **演習**：二次・三次の共役和・積、同じ指数が二通り出る展開を検算。

### TRN8 Hermite–Lindemann：仮定と対称化

- $0\ne\alpha\in\overline{\mathbb Q}$ かつ $e^\alpha$ が代数的と仮定。最小多項式の代数関係を指数和へ直し、共役の有限積による対称化を**必要な非零性の証明付き**で設計する。
- 指数の重複や代数的係数の相殺を分類し、零係数項を削除した後の有限指数集合を明示する。
- **証明ゲート**：指数関係の最終的な矛盾に必要な「少なくとも一つの非零係数が残る」を論拠なく置かない。

### TRN9 Hermite–Lindemann：多重零点と整数性

- TRN8で確定した有限代数的指数集合に対する高重複度補助多項式を具体的に構成し、整数化の乗数を固定してから素数を選ぶ。
- 微分値の重複度、整数性・代数的整数性、合同上の特別項と非特別項を場合分けし証明する。
- **演習**：二点・三点での重複零点、$p-1$階導関数の特別項を計算。

### TRN10 Hermite–Lindemann：算術下界と複素積分上界

- 微分和と複素線分積分を接続。有限個の端点ごとに距離・係数・指数の実部を使った上界を作る。
- $p$の例外集合を有限に固定し、跡・ノルムまたは共役不変量により**非零の整数**を構成する。
- **証明ゲート**：合同で非零なのはどの環の元か、積・跡を取った後も非零か、上界の定数が$p$に依存しないかを検算する。

### TRN11 Hermite–Lindemann定理・$\pi$の超越性

- TRN8–10の正規化・補助多項式・非零整数性・解析上界を一つの**完全な最終証明**につなぐ。
- $0\ne\alpha\in\overline{\mathbb Q}$ に対し $e^\alpha$ は超越数。
- $\pi$が代数的なら$i\pi$は零でない代数的数、しかし$e^{i\pi}=-1$は代数的という矛盾から $\pi$ の超越性を証明。
- さらに指数関数の$\overline{\mathbb Q}$上の単射性を導く。$e^\alpha=e^\beta$なら$e^{\alpha-\beta}=1$であり、$\alpha-\beta\ne0$なら定理に反する。
- **出口**：SQC7で使うcanonical theorem anchorをここに置く。TRN12の証明で単射性・$\pi$超越性を利用するときも本章を参照する。

### TRN12 Lindemann–Weierstrass：$\mathbb Q$係数版と共役の有限積

- **中間定理**：相異なる代数的数$\alpha_1,\dots,\alpha_m$について$e^{\alpha_j}$は$\mathbb Q$上一次独立。
- 仮定した整数係数の指数関係を、Galois共役で得る**形式的な複数の指数和の積**に組み込む。単位元の因子が評価時に零となるので積が零になることを示す。
- 異なる項の指数和が衝突する場合は結合し、全係数消失を避けるための非零性を例えば複素数の辞書式順序での最大項選択など**明示的な補題**から証明する。
- **重要**：TRN11で$\pi$の超越性を得た結果、代数的指数上では$e^z$が単射である。Popescu §3のこの順序を守り、循環を作らない。

### TRN13 $\mathbb Q$係数版：補助多項式・非零性・誤差

- TRN12で得た有限の共役不変指数集合$W$に対し、分母を払った消滅多項式$H(x)$、各$\beta_j\in W$で$p-1$重根を持つ補助多項式
  $$
  f_{p,j}(x)=\frac{H(x)^p}{(p-1)!(x-\beta_j)}
  $$
  を候補として定め、分母除去と多項式性を逐一確認する。
- Leibniz則から各評価点での導関数の$p$可除性と、$p-1$階の非零特別項を分けて示す。共役不変な積が$\mathbb Z\setminus\{0\}$となる議論と、線分積分からの$C D^p/(p-1)!$型上界を証明する。
- **証明ゲート**：$p$の例外有限性、共役の積の非零性、$f_{p,j}$の分母と次数、$p$に依らない上界定数を全て再計算する。

### TRN14 Lindemann–Weierstrass完成・一般の代数的係数へ

1. TRN12–13から**有理係数版**の最終矛盾を完成させる。これ自体を完全証明済み定理として記録する。
2. $\mathbb Q$一次独立な代数的$\gamma_1,\dots,\gamma_r$について、異なる単項式が異なる代数的指数を持つことから$e^{\gamma_i}$の$\mathbb Q$上**代数的独立性**を証明。
3. 係数を含む有限Galois拡大での多項式ノルムにより、代数的独立性は$\overline{\mathbb Q}$上でも維持されることを証明。
4. 任意の相異なる代数的$\alpha_j$を整数係数で基底表示し、指数和を異なるLaurent単項式の線形結合に直す。負冪を払って、**一般の代数的係数版**の完全証明を閉じる。
5. $e^\alpha$の超越性、$\pi$の超越性、非零代数的数の対数値（枝を明記）の超越性、$\mathbb Q$一次独立な代数的指数の像の代数的独立性を、仮定を添えて整理する。
- **演習**：二つの指数と三つの指数での基底・指数ベクトルの構成、係数体ノルム、重複指数の誤用、対数の枝の確認。

## 4. 横断的に必ず解決する数学的論点

1. **係数体を混同しない**：$\mathbb Q$係数版、$\overline{\mathbb Q}$係数版、$\mathbb Q$上の代数的独立性、$\overline{\mathbb Q}$上の代数的独立性を全て別statementとして記録し、推論の方向を明示。
2. **共役に指数関数を作用させない**：Galois自己同型が自然に作用するのは代数的係数・指数・多項式係数。$e^\alpha$への作用は自動ではない。形式和の共役、係数多項式のノルム、複素数への評価を区別。
3. **非零性は積でも確認**：共役有限積を展開した結果の非零係数、補助微分値の合同上の非零、代数的整数のノルムの非零は、それぞれ異なる証明責務。
4. **整数性は階層がある**：有理数・代数的数・代数的整数・通常の整数のどこに属するかを毎回示す。
5. **添字・定数の量化順**：元の代数関係と有限拡大を固定 → 分母と例外素数を確定 → 十分大きな素数$p$を選ぶ → $p\to\infty$。上界の定数を途中で$p$依存にしない。
6. **複素積分**：$z(t)=a+t(b-a)$ を明示し、$|e^z|=e^{\operatorname{Re}z}$ と線分の長さで評価。実指数の単調性を複素数にそのまま移さない。
7. **単射性と対数**：$e^z$は$\mathbb C$全体で単射ではない。TRN11の単射性は**代数的数の集合への制限**である。$\log a$の枝と$e^w=a$という等式を区別。
8. **既習結果**：別章または同章の定理を実際に使う都度、実在のcanonical stable anchorに結果名からリンクする。章頭の一括リンクだけで代えない。

## 5. 演習設計と完成ゲート

- 各実装章の最低演習は原則 **Level A 4題／B 3題／C 1題、全問詳細解答付き**。最低数で打ち切らず、主要な補題・典型的な誤り・複数段の接続を自力検証できるよう増やす。
- A：整数性・共役・微分値・複素線分積分の手計算。B：共役積・mod $p$・上界・係数体ノルムの導出。C：仮定から補助構成、非零整数、解析上界、矛盾までを連結する問題。
- 主役の初出定義はformal statementの**前に通常文で意味を導入**し、直接例で各非自明条件を確認する。行列式や共役ノルムで判定する場合は、元の定義に結び付く中間式か既習結果へのリンクを示す。
- 証明では「適当に選ぶ」「同様に」「計算すると」で合同、相殺、積分上界、分母消去を飛ばさない。
- **Phase A / TRN1–3**：既習へのリンク、整数性・跡・ノルム補題、Liouvilleとの境界。
- **Phase B / TRN4–6**：$e$の超越性の全核心証明・全演習解答の再計算。
- **Phase C / TRN7–11**：Hermite–Lindemannと$\pi$の超越性を自足的に証明。SQC7で参照するTRN11のanchorを確定。
- **Phase D / TRN12–14**：有理係数版の完全証明、代数的独立性への橋、ノルム補題、代数的係数版の最終証明。
- **Phase E / 横断監査**：全14章の定義初出・prerequisite、主要定理と演習の棚卸し、数式の係数と符号・添字、安定リンク、公開索引・series manifest・レンダリング確認。

完成判定は「見出しや定理マーカーが存在すること」ではなく、上記の**全主要証明と全演習詳細解答を独習者が追えること**。新規本文は現行のDREAM THEATER著者規約の区分Cで全件自己再計算と別観点再読を分離して実施する。必要なchanged-only検証を行い、索引・知識DAG等のglobal-impact変更ではfull検証へ昇格する。CI greenは数学的正しさの代替ではない。

## 6. ライフサイクル・直接参照

- 本改訂は**計画の推敲のみ**であり、TRN章本文・TRN series manifest・公開索引・knowledge DAGは追加しない。したがってPLANは `textbook/plans/` に残す。
- TRN1の実装に着手する際にPLANを `textbook/plans_progress/` へ**移動**し、TRN系列manifestの `plan` 参照を合わせる。全章・横断監査・公開導線が完了したら `textbook/plan_done/` へ移動する。
- SQC7との既存インターフェースは**TRN11のHermite–Lindemann**のまま維持。SQCはTRN11未実装の間は証明済みの定理への実リンクと混同しない。
- 参照先の状態は着手時に再確認する。NDA5–6は2026-10-14のGitHub上のseries manifestでcompletedである。

## 7. 参考文献・照合URL

1. M. Ram Murty and P. Rath, *Transcendental Numbers*, Springer (2014), Chapters 1–4. https://link.springer.com/book/10.1007/978-1-4939-0832-5
2. Alan Baker, *Transcendental Number Theory*, Cambridge University Press (1975; reissue 2022), Chapter 1. https://www.cambridge.org/core/books/transcendental-number-theory/5B1C47AB927E21C93A0E4FC5EED33BC5
3. Sever Angel Popescu, *A simple and self-contained proof for the Lindemann-Weierstrass theorem*, arXiv:2306.14352v2 (2023), §§1–3. https://arxiv.org/abs/2306.14352
4. Michel Waldschmidt, *Introduction to Diophantine methods: irrationality and transcendence* (2007), course notes and exercises. https://webusers.imj-prg.fr/~michel.waldschmidt/coursHCMUNS2007.html
5. *Encyclopedia of Mathematics*, “Lindemann theorem / Lindemann–Weierstrass theorem” (定理の二つの形式・歴史上の帰属の確認). https://encyclopediaofmath.org/wiki/Lindemann%E2%80%93Weierstrass_theorem
6. 既存の[古典円積PLAN](DREAM_THEATER_CLASSICAL_CONSTRUCTIBILITY_SQUARING_PLAN.md)、[整数論横断ルート](DREAM_THEATER_NUMBER_THEORY_MODULARITY_ROUTE_PLAN.md)および[完成済みNDA6](../volumes/dream_thater/代数系/NDA/NDA6/index.md)。

## 8. 現在地

- 2026-10-11：旧「超越数論の証明補講」から14章の独立科目として設計。本文・演習は未実装。
- 2026-10-14：標準教科書とPopescuの証明を照合。NDA6の完成を反映し、TRN11の出口を保持しながら、有理係数版 → 代数的独立性 → 係数体ノルム → 一般版の証明ルートを明示。**設計のみ、実装未着手。**
