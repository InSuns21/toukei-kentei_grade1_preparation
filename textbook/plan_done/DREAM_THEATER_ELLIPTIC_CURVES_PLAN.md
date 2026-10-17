# DREAM THEATER 楕円曲線（EC1〜EC11、仮章割り）

設計改訂: 2026-10-14（教科書・公開講義資料との照合）  
状態: completed（EC1〜EC11を実装・公開。MF8との局所因子・導手・modularity横断監査を完了）

## 0. 中心問い・到達点・科目の境界

**中心問い：** 非特異三次曲線上の点がなぜ群をなし、その群を複素解析・有理数・有限体から調べた結果が、素数ごとの点数とモジュラー形式の L 関数へどう合流するのか。

学習者が最後に説明・計算・証明できること：

1. 射影化、非特異性、判別式、Weierstrass 方程式の係数と標数の関係を具体例で検査する。
2. 割線・接線の作図から加法公式を導き、**結合法則を証明**して群構造を確立する。
3. CA9 の Weierstrass $\wp$ 関数を用い、複素トーラスと楕円曲線の群としての対応、格子と $j$ 不変量を説明する。
4. torsion、isogeny（同種写像）、Frobenius の定義と適用条件を確認し、有限体で点数を計算する。
5. 有理点群の有限生成性へ至る「有限な商＋高さによる降下」を理解する。一般の Mordell--Weil 定理の証明を、未履修の代数的整数論に丸投げしない。
6. Hasse 評価と有限体ゼータ関数の関係を導出する。
7. 良い還元・悪い還元、導手、素数別 Euler 因子を区別して $L(E,s)$ を構成する。
8. 重さ 2 の newform との係数比較・modularity の正確な意味を述べ、**証明済み定理と未解決予想（BSD）を区別**する。

**範囲：** 本PLANが所有するのは「楕円曲線の群則・有理点・isogeny/有限体・還元・L 関数とモジュラー形式への出口」。楕円関数の基礎証明は既存 CA8/CA9、モジュラー群から Hecke・newform の主理論は [MF PLAN](DREAM_THEATER_MODULAR_FORMS_PLAN.md) が所有する。一般の代数曲線・スキーム・Néron 模型・Galois 表現・modularity lifting は黙示的前提にしない。

**章数：** 旧 EC1〜EC8 の一章に「高さ＋descent＋Mordell--Weil」「有限体＋Hasse 証明」を詰め込みすぎないよう、**EC1〜EC11 を暫定配列**とする。章数は固定ノルマではなく、証明の閉鎖性と学習者の中心問いを基準に増減する。EC11 を終端とする参照は着手時に再確認する。

## 1. 教科書・講義資料との比較と採用判断

| 参照 | 実際の構成・強み | 本PLANでの採用・注意 |
|---|---|---|
| Silverman--Tate, *Rational Points on Elliptic Curves*, 2nd ed. | 幾何と算術 → 有限位数点 → 有理点群 → 有限体 → 整数点 → 複素乗法。学部生向けの例と演習が多い。 | EC1/2、EC5/6 の具体計算と降下の導線に使う。幾何的直観の説明だけを結合法則等の厳密証明とみなさない。 |
| J. S. Milne, *Elliptic Curves*, 2nd ed. | 代数曲線・群構造・Riemann--Roch、基本理論、複素理論、Selmer/高さ/有限体、modular forms と L 関数を区別する。 | EC2 の証明責務、EC4/6 の前提コスト、EC8〜11 の橋渡しを校正する。大学院向け一般論を黙って既習扱いしない。 |
| J. H. Silverman, *The Arithmetic of Elliptic Curves*, 2nd ed. | 代数曲線から群構造、形式群、有限体、局所体、大域体、Mordell--Weil、計算法へ進む。 | EC4/6 の証明依存を洗い出すための大学院レベルの基準書とする。既習扱いするのでなく、必要な定義・核心証明をEC内か先行正本に置く。 |
| J. H. Silverman, *Advanced Topics in the Arithmetic of Elliptic Curves* | Néron 模型、Kodaira--Néron 分類、Tate のアルゴリズム、導手と判別式等の発展理論を扱う。 | EC9 で何が初等的な還元判定から出ず、何が追加理論を要するかの停止線を校正する。 |
| L. C. Washington, *Elliptic Curves: Number Theory and Cryptography*, 2nd ed. | 一般 Weierstrass 方程式・結合法則・isogeny・有限体・Weil pairing・有理点群等を体系的に扱う。 | 小標数・加法公式・Frobenius/有限体の例、計算演習の参考にする。暗号アルゴリズム全体は主線にしない。 |
| MIT OCW 18.783 *Elliptic Curves*（2025） | 計算に重点を置き、isogeny・endomorphism・Frobenius・Hasse・点数計算を連ねる。 | **Hasse 評価より前に isogeny と次数を置く**。具体的な有限体計算を理論と往復させる。 |
| Diamond--Shurman, *A First Course in Modular Forms* | 複素トーラスとモジュラー曲線、Hecke、Eichler--Shimura、L 関数、Galois 表現を段階的に接続する。 | EC11 は MF7 までの正本を再利用し、Modularity Theorem 自体は MF8 に委ねる。 |

一次的に確認した書誌・公開シラバス：

- Silverman--Tate (Springer): https://link.springer.com/book/10.1007/978-3-319-18588-0
- Milne（著者公開 PDF）: https://www.jmilne.org/math/Books/EC2.pdf
- Silverman, *The Arithmetic of Elliptic Curves* (Springer): https://link.springer.com/book/10.1007/978-0-387-09494-6
- Silverman, *Advanced Topics in the Arithmetic of Elliptic Curves* (Springer): https://link.springer.com/book/10.1007/978-1-4612-0851-8
- Washington（出版社目次）: https://www.routledge.com/Elliptic-Curves-Number-Theory-and-Cryptography-Second-Edition/Rosen-Washington/p/book/9781420071467
- MIT OCW 18.783（2025 syllabus）: https://ocw.mit.edu/courses/18-783-elliptic-curves-fall-2025/pages/syllabus/
- Diamond--Shurman (Springer): https://link.springer.com/book/10.1007/978-0-387-27226-9

参照元の演習・証明文を転載しない。構成・必要な補題・典型例・到達点の照合に用い、本文は既存 prerequisite から独立に再構成する。

## 2. 前提・分野横断依存・証明の停止線

### 主線の直接前提

- 群・商群・準同型：GRP1〜GRP3。環・多項式・因数分解：RNG1〜RNG4。
- 体・有限体・拡大：FLD0〜FLD3。初等整数論：NT1〜NT4（[NT PLAN](../plan_done/DREAM_THEATER_ELEMENTARY_NUMBER_THEORY_PLAN.md)）。
- **EC3 で初めて** CA8〜CA9（格子、複素トーラス、Weierstrass $\wp$ 関数）を必要とする。
- EC10 で Dirichlet 級数・Euler 積の基本的取り扱いを直接使用するときは、既存 CA12 / ANT の到達可能な該当章を確認する。全 ANT の一律履修は課さない。
- **EC11 で** MF1〜MF7 のうち newform・局所係数比較に必要な章を参照する。逆向きに MF1〜MF7 の全章へ EC11 を要求しない。

### 各章自身で導入する語と共通知識

射影座標と射影平面、曲線の非特異性（偏微分と共通零点）、指定された無限遠点、関数体・有理写像と正則写像、divisor／零点と極、isogeny と次数、有限体の Frobenius、整数係数モデルと還元、局所 Euler 因子を、**初めて使う前に**通常文と直接例で導入する。一般の代数幾何・数体論で正本が既に存在する場合は、執筆前にその実在 stable anchor と DAG を確かめて再利用する。形式的な prerequisite の追加だけで解決しない。

### 証明未閉鎖を隠さない境界

- **EC2 結合法則：** 複素一様化の証明だけでは $\mathbb F_p$ 上の主張を正当化できない。一般 Weierstrass 方程式の代数的証明（全例外ケースを含む）か、**定義・証明済みの divisor / Picard 群と必要な genus 1 の補題**を用いる。実装前に採用経路と先行補題を確定する。
- **EC4 / EC8：** Hasse の標準的な次数法を採るなら、endomorphism の次数の二次性、Frobenius の次数、$\deg(1-\pi)=\#E(\mathbb F_q)$ を先に証明する。双対 isogeny 等を「標準事実」で省略しない。
- **EC6 Mordell--Weil：** 有理 2-torsion を持つ曲線の明示的 2-descent は核心例として全件証明する。しかし、**それだけで任意の $E/\mathbb Q$ の有限生成性が証明されたとはしない**。一般の場合の weak Mordell--Weil を閉じるために、有限エタール代数での descent・数体の有限性等の実際の使用箇所を棚卸しする。必要な前提の定義・補題をその章（または確認済みの先行 canonical 章）に置く。閉じられなければ一般形は明示的に引用定理として区別し、主要到達目標の証明完了とは判定しない。
- **EC9 導手：** $p=2,3$ の wild ramification、minimal model、一般の conductor exponent は初等判別式だけから決められない。一般形を主張するなら追加理論・証明責務を特定する。入門主線では半安定還元と明示例を完全に説明し、一般形は定義と理論上の境界を区別する。
- **EC11：** Modularity Theorem は証明済みの外部大定理として正確に掲げ、EC11 で Wiles--Taylor--Wiles の証明を再構成したと称しない（最終の theorem と FLT 接続の正本は MF8）。BSD は予想と明記する。

## 3. 暫定章構成と章ごとの証明責務

### EC1 非特異三次曲線・Weierstrass 方程式

**問い：** 楕円曲線を方程式としてどう識別し、特異点をどう排除するか。

- 射影平面 $\mathbb P^2(k)$、同次化、無限遠点 $O=[0:1:0]$ と $k$-有理点の意味。
- 非特異性の偏微分判定。**幾何学的非特異性**は代数閉包上で判定すること、判別式の非零性との同値を導く。
- 一般形 $y^2+a_1xy+a_3y=x^3+a_2x^2+a_4x+a_6$、$b_i,c_4,c_6,\Delta$、許される変数変換と $\Delta$ の変換則。
- $\operatorname{char}k\ne2,3$ で短い形 $y^2=x^3+Ax+B$ に移す変換を途中式から導く。$\operatorname{char}k=2,3$ に短い形を無条件に流用しない。
- smooth projective genus 1 curve + marked rational point という一般的定義との関係を述べる際、genus と Riemann--Roch が必要な同値証明の所在・停止線を明記する。
- $\mathbb Q,\mathbb R,\mathbb C,\mathbb F_2,\mathbb F_3,\mathbb F_5$ の非特異例・特異反例。各例で判別式または偏微分条件を実際に照合する。

**検算点：** $\Delta=-16(4A^3+27B^2)$ は短い形かつ標数制限の文脈で用いる。一般形との規約差・スケーリング・$j=c_4^3/\Delta$ の意味を混同しない。

### EC2 割線・接線群則と結合法則の証明

**問い：** 点の図形的な加算がなぜ群の公理を満たすか。

- 異なる 2 点、接点、鉛直線、無限遠点を分けて加法と逆元を定義。係数一般形の否定写像 $(x,y)\mapsto(x,-y-a_1x-a_3)$。
- 傾きの計算から $P+Q$、$2P$ の公式を導く。公式の分母が零となる場合を正しく分岐する。
- 単位元・逆元・可換性の確認。**結合法則を主要定理として完結した証明を置く**。
- 事前選択すべき証明経路：①一般係数の有理式・多項式恒等式を、分母の消失する場合も含めて検証する、または②関数・divisor の零点と極、主 divisor、次数 0 の divisor 類と点との全単射を導入・証明し、その準同型性から導く。後者で Riemann--Roch の未習の一般定理を単に引用しない。
- 重ね合わせ順序を実際に計算する $(P+Q)+R=P+(Q+R)$ の具体例と、特異三次曲線では何が破綻するかの反例。

**禁止：** 作図が対称に見えること・複素数上で成立することだけを全体の証明にしない。

### EC3 複素一様化・格子・$j$ 不変量

**問い：** 複素数上でなぜ三次曲線がトーラスになるか。

- CA8/CA9 の実在する完成本文・stable anchor を執筆時に特定し、$\wp$ の微分方程式から $z\mapsto(\wp(z),\wp'(z)/2)$ を作る。
- $z=0$ に対応する $O$、核が $\Lambda$ であること、加法公式による群準同型性、全射性・正則性（または複素トーラス／曲線の同型）を確認する。
- 格子のスケーリング、$g_2,g_3,\Delta,j$。$j$ による **$\mathbb C$ 上の**同型分類を述べる。 $\mathbb Q$ 上の同型・twist とは区別する。
- CM は自己準同型が増える具体例（正方格子・六角格子）まで。CM 一般理論は任意発展へ送る。

### EC4 Isogeny・自己準同型・torsion の代数的基盤

**問い：** 楕円曲線間の写像をどう測り、Frobenius の評価へ備えるか。

- 有理写像と正則写像（分母、極、射影点での延長）の区別。群を保つ非定数写像で原点を送る isogeny、kernel、degree、separable / inseparable。
- multiplication-by-$n$、$E[n]$ と標数による差。$\operatorname{char}k\nmid n$ なら代数閉包上 $E[n]\simeq(\mathbb Z/n\mathbb Z)^2$ となる証明経路を確定する。
- endomorphism と環構造、同種写像の合成・次数の乗法性。双対 isogeny と $\deg(m\alpha+n\beta)$ の二次性（EC8 の Hasse 証明に必要な特殊形まで）。
- 選んだ証明に必要な関数体拡大次数、divisor の引き戻し、微分・separability を定義から例で検証する。必要なら本章を2章へ分割する。
- 具体例：$2$-torsion、$[2]$ の次数、複素格子の有限指数部分格子による isogeny。

### EC5 有理数体上の torsion・高さの入口

**問い：** 有理点を全部探す前に、有限位数点と点の大きさをどう制御するか。

- $E(\mathbb Q)_{\mathrm{tors}}$、$2$-torsion、整数モデル上の有理点とその座標。
- **Nagell--Lutz 定理**の適用可能な整数係数短 Weierstrass 形の仮定を明記し、証明と整数解の候補絞り込みを行う。
- 有理数 $x=a/b$（既約）の高さ $h(x)=\log\max(|a|,|b|)$、$\mathbb Q$ 上の有界高さの有限性。
- doubling からの $h(x([2]P))=4h(x(P))+O_E(1)$ の主要不等式（$x=O$ の約束と例外は明示）。標準高さと canonical height の正規化を統一する。
- 実例で torsion 候補を抽出し、位数を加法で照合する。逆に座標が整数というだけで torsion と判定しない。

### EC6 Descent・weak Mordell--Weil・Mordell--Weil

**問い：** 有理点が無限にあっても、なぜ有限個の生成元で足りるか。

- まず有理 2-torsion を持つ曲線の 2-isogeny / 明示的 2-descent で、有限な候補集合と $E(\mathbb Q)/2E(\mathbb Q)$ の有限性を示す。
- 一般の weak Mordell--Weil：$\#(E(\mathbb Q)/mE(\mathbb Q))<\infty$（$m\ge2$）の正確な statement。全 $E/\mathbb Q$ へ拡張するための Kummer/descent の補題と、必要な有限性の証明依存を棚卸しする。
- EC5 の高さ評価を使う **有限商＋高さ降下（infinite descent）⇒ 有限生成** の論証を、代表元・高さを減らす反復・停止性まで記述する。
- 具体例の rank、torsion、点の倍算と独立性。有限生成の証明と、実際に rank を計算するアルゴリズムの停止問題・Selmer 上界を混同しない。
- 証明依存を閉じられない一般形を特別例の証明で代用しない。一般形は未証明として表示し、実装時の別の前提講座（代数的整数論など）を要する場合は DAG と根拠を更新してから扱う。

### EC7 有限体の点数と Frobenius

**問い：** $\mathbb F_q$ では曲線をどう数え、加法と Frobenius がどう働くか。

- $E(\mathbb F_q)$ と $E(\overline{\mathbb F}_q)$ の区別、無限遠点を含む総点数、$p=2,3$ では一般 Weierstrass 形を用いる。
- Frobenius $\pi_q:(x,y)\mapsto(x^q,y^q)$（$\mathbb F_q$ 上の係数を固定すること）、固定点と $E(\mathbb F_q)$、$\deg\pi_q=q$。
- $\#E(\mathbb F_2),\#E(\mathbb F_3),\#E(\mathbb F_5)$ を手計算し、群演算と一致させる。$a_q=q+1-\#E(\mathbb F_q)$ を定義する。
- 有限体では点群が有限であることを用いた例。計算量・Schoof 法・暗号は任意発展とし、本科目の前提へ強制しない。

### EC8 Hasse 評価・拡大体上の点数・有限体ゼータ関数

**問い：** 有限体の点数が $q+1$ から大きく離れないのはなぜか。

- EC4 の次数理論を適用して
  $$
  \deg([m]-[n]\pi_q)=m^2-a_qmn+qn^2\ge0
  $$
  を導き、全整数 $m,n$ に対する非負性から $a_q^2\le4q$ を示す。**式の導出に必要な双対・次数の二次性を出発点から照合**する。
- $\pi_q$ の特性多項式 $T^2-a_qT+q$、根 $\alpha,\beta$ と $\alpha+\beta=a_q,\alpha\beta=q$、$|\alpha|=|\beta|=\sqrt q$。
- $\#E(\mathbb F_{q^n})=q^n+1-\alpha^n-\beta^n$ を示し、
  $Z(E/\mathbb F_q,T)=(1-a_qT+qT^2)/((1-T)(1-qT))$ を指数型定義から導く。
- Hasse の定理を「曲線の一般の Weil 予想を使った」とだけ書かない。一般の曲線については証明・適用範囲を分離する。
- 小さな有限体の計算で $a_q$、$a_{q^2}$、ゼータ関数の係数を相互照合する。

### EC9 整数モデル・良い／悪い還元・導手

**問い：** なぜ有限体へ簡約できない素数が L 関数で特別扱いされるか。

- 整数係数 Weierstrass モデルと $\bmod p$ の還元。判別式を用い、**選んだモデルの特異性と曲線自体の良い還元を区別**する。必要なら最小整モデルの役割を定義する。
- good reduction / split・nonsplit multiplicative reduction / additive reduction の局所例。nodal と cuspidal の判別は特異点の局所二次項の因数分解などで検証する。
- $p\ge5$ の tame 事例、$p=2,3$ の注意。一般 conductor $N_E=\prod p^{f_p}$ に現れる $f_p$ は、単なる $\operatorname{ord}_p(\Delta)$ ではない。
- 半安定例では $f_p=0$（good）または $1$（multiplicative）を実際に確認する。additive/wild の一般公式・Tate algorithm は証明範囲と未習理論を明示して分離する。
- **導手の正確な一般的定義を与えられないまま、全モデルで $f_p$ を判定できるとは述べない**。後続 MF の level と接続する必要な事実をラベル付きで管理する。

### EC10 Hasse--Weil $L$ 関数と局所因子

**問い：** 「全ての素数で点を数える」情報をどう一つの解析関数にするか。

- 良い素数 $p$ では
  $a_p=p+1-\#E(\mathbb F_p)$,
  $L_p(E,s)=(1-a_pp^{-s}+p^{1-2s})^{-1}$。
- 悪い素数では **同じ点数式を無条件に流用しない**。split multiplicative: $(1-p^{-s})^{-1}$、nonsplit multiplicative: $(1+p^{-s})^{-1}$、additive: $1$。EC9 で局所型を実際に判定できた例について検算する。
- Euler 積 $L(E,s)=\prod_pL_p(E,s)$、Hasse 評価からの **絶対収束域 $\Re(s)>3/2$**（各素数項の大きさと素数和の比較を示す）。
- 複素 $s$ 全体への解析接続と
  $\Lambda(E,s)=N_E^{s/2}(2\pi)^{-s}\Gamma(s)L(E,s)$,
  $\Lambda(E,s)=w_E\Lambda(E,2-s)$（$w_E\in\{\pm1\}$）を、**現在では $\mathbb Q$ 上の楕円曲線について modularity から従う定理**として結果先行で述べ、根拠の接続先は MF8 と明示する。Euler 積の収束域から勝手に解析接続を導かない。
- 予想 BSD への入口として、解析的 rank と $E(\mathbb Q)$ の代数的 rank の等しさを**予想**として述べる。例で L の係数と有限体の点数を照合する。

### EC11 モジュラー形式との照合と modularity interface

**2026-10-17 正式実装：** MF7の定義・局所因子・レベル11のnewformへの使用箇所リンクを接続し、旧先行稿をEC11正規章へ移設。導手・レベル・良い／悪い素数の係数比較、Euler積とDirichlet係数の一致、modularityの引用境界を確認した。演習A4/B5/C1と詳細解答を持ち、EC series manifestと公開索引へ登録。MF8の正式執筆と楕円曲線系列の横断監査は2026-10-17に完了。


**問い：** 曲線の $L$ 関数がなぜ重さ 2 の newform によって表されるか。

- MF1〜MF7 の定義と証明済み結果を実際の使用箇所で参照し、newform、Fourier 係数 $a_p(f)$、Euler 因子の規約を揃える。
- 導手 $N_E$ と level $N$ の一致、good prime での $a_p(E)=a_p(f)$、bad prime の局所因子を含む **$L(E,s)=L(f,s)$** の意味を説明する。
- 同値な modularity の表現：ある重さ 2 の newform の L 関数に一致すること、$X_0(N_E)\to E$ の非定数 $\mathbb Q$-上の射が存在すること。射の意味・対象・基点・未導入の modular curve／Jacobian を区別する。
- **Modularity Theorem の最終 statement と Fermat 最終定理への接続は MF8 が canonical owner**。EC11 では入力データと比較の論理を仕上げ、MF8 の結果を EC11 の前提に逆流させない。
- 自由研究分岐として CM、BSD（rank 0/1 の既知の部分結果と一般予想の境界）、暗号や計算機実験を案内するが、未証明大定理を授業内で証明済み扱いしない。

## 4. 章間 DAG と MF との合流

~~~text
GRP/RNG/FLD + NT1〜4 → EC1 → EC2
                               ├→ EC3 ← CA8/CA9
                               ├→ EC4 ─┬→ EC7 → EC8
                               │       └→ EC6
                               └→ EC5 ───→ EC6

EC1 + EC7 → EC9（還元と導手）
EC8 + EC9 → EC10（L 関数）

CA8/CA9/CA12 + 必要な ANT → MF1 → ... → MF7
EC10 + MF7 → EC11（係数・局所因子・level の比較）
EC11 + MF7 → MF8（modularity theorem / FLT）
~~~

この図は**学習上の概形**であり、横列を全章の自動 prerequisite にしない。例えば EC9 は EC6 の descent を使わないので依存させない。EC5 は EC4 の isogeny 一般論を待たず始められる。EC11 は MF7 を読み、MF7 は EC11 を読まない。

既存 [整数論・modularity 横断ルート](../plans/DREAM_THEATER_NUMBER_THEORY_MODULARITY_ROUTE_PLAN.md) の MF/EC の双方向説明は、この非循環 DAG に従って実装時に確定する。仮 ID を公開索引、knowledge DAG、chapter manifest へ設計段階で登録しない。

## 5. 章ごとの直接例・演習・査読の受け入れ基準

- 各章の入口に「今できること → 足りないこと → 新しい道具 → 何が判定・計算できるか」を通常文で示す。専門語を formal statement より先に紹介し、その語の定義を実際に検査する**直接例**を付ける。
- 理論の**異なる体・標数・モデル**を必ず区別する。少なくとも「短 Weierstrass の $\mathbb Q$ 例」「$\mathbb F_2,\mathbb F_3$ の一般形」「特異曲線の反例」「悪い還元の局所型」を全体で網羅する。
- 各章 Level A **4題以上**、B **3題以上**、C **1題以上**（理由付き例外は規約に従う）。これは下限であり、主要結果・典型誤答・仮定の使用・複数概念の結合の演習が足りなければ追加する。全問の**詳細解答**に開始点・条件・中間計算・結論を残す。
- 特に EC2 は結合法則の証明経路、EC4 は degree/isogeny の正当化、EC6 は weak Mordell--Weil の有限性、EC8 は Hasse の証明、EC9 は conductor の定義可能範囲、EC10 は収束域と悪い素数の因子、EC11 は MF7/MF8 との非循環性を**個別ゲート**とする。
- 変更章の全主要定理・証明・全演習と詳細解答について、本文完成後に出発点から再計算する自己査読と、読者順・定義使用順・前提・stable anchor を確認する別観点再査読を分ける。**同じ担当者の再読を第三者独立査読とは称しない**。変更していない別章の追跡監査はユーザーから章IDの明示依頼があった場合のみ実施する。
- PR で数学的未確認事項と採用した proof route を記録する。検証は変更スコープに応じて changed-only を基本とし、global index や knowledge DAG 等の変更時は full validation。実際の表示・数式・リンクも確認する。
- EC 系列と MF8 の合流後に、章一覧・参照・定義の共有・導手/level・L 関数の正規化の横断監査を行う。**設計文書の改訂だけでは「科目着手」や「完成」に遷移しない**。

## 完了記録（2026-10-17、EC・MF系列横断）

- EC9の良い・乗法的・加法的還元と導手指数、EC10の局所多項式、EC11の同一レベルのnewformとの照合を、MF7/MF8との使用箇所・実在anchorを辿って点検した。
- 良い素数は $P_p=1-a_pT+pT^2$、分裂／非分裂乗法的還元は $1\mp T$、加法的還元は $1$。MF7の自明指標・重さ2newformでは $p\mid N$ の二次項が消え、$v_p(N)=1$ なら $a_p=\pm1$、$v_p(N)\ge2$ なら $a_p=0$ と一致する。$p=2,3$ の野分岐はEC9の外部結果として扱う。
- 導手11の実例の判別式は $-11^5$（$-11$ ではない）。$p=11$ の分裂節点・一次因子を再照合し、$p=2,3,5,7$ の点数とMF7のFourier係数を独立計算した。
- EC11が証明するのは「全局所因子が一致するなら共通の絶対収束領域で$L$関数と係数が一致する」方向。全ての曲線に対応形式が存在するModularity Theorem、$\mathbb Q$ 上のparametrization、FLTへの帰結はMF8の外部引用と証明責務を切り分けた。
- EC1〜EC11のstatus、公開索引と目次、MF7 → EC11 → MF8 の非循環依存を確認。横断監査は指定インターフェースを対象とし、他章の全件追跡監査を意味しない。
