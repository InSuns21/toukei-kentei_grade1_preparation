# DREAM THEATER Kähler–Hodge理論（HOD1）

分冊: 2026-10-11  
推敲: 2026-10-28（標準教科書・講義ノートとの照合、依存・証明責務・学修順序の再設計）  
状態: planned（PLAN設計のみ。HOD1本文・系列manifestは未実装）

## 中心問いと到達点

**Kähler条件 $d\omega=0$ は、なぜ実 de Rham コホモロジーを複素型 $(p,q)$ ごとに分解し、さらに Lefschetz 作用・交叉形式の強い制約を生むのか。**

単に $\Delta_d=2\Delta_{\bar\partial}$ や Hard Lefschetz を暗記するのではなく、有限次元のHermite線形代数からKähler恒等式を計算し、調和代表・複素型・コホモロジーへの推論を順につなぐ。修了時には次を出発点から再構成できる。

1. $L=\omega\wedge(-)$ と随伴 $\Lambda$ の線形代数、およびKähler恒等式と三つのLaplacianの関係。
2. コンパクトKähler多様体のHodge分解、Hodge数の対称性、奇数次Betti数の偶数性。
3. 大域 $\partial\bar\partial$-補題の正確な仮定と証明、Kählerでない場合との相違。
4. $\mathfrak{sl}_2$ の作用からHard Lefschetz・原始分解へ至る証明と、Hodge–Riemann双線形関係の符号。
5. 複素トーラス・射影空間等の具体例、Hodge構造・周期の初歩への接続。

## 正本・直接依存・責務境界

| 分野・結果 | 既存の正本と本PLANの責務 |
|---|---|
| 複素多様体・$T^{1,0}$・$(p,q)$ 型・$\partial,\bar\partial$・Dolbeault | [CM1/CM2](../plan_done/DREAM_THEATER_COMPLEX_MANIFOLDS_I_II_PLAN.md)。特に CM2-01〜05 が正本。HOD1では複素型と調和代表の**新たな関係**を導く。 |
| Hermite計量・Chern接続・曲率 | CM2-09〜11 が正本。束一般の定義・局所計算を再実装しない。 |
| Kähler条件・基本 $(1,1)$ 形式・Fubini–Study・Kähler class | [KAH1](../plan_done/DREAM_THEATER_KAHLER_GEOMETRY_PLAN.md)、特に KAH1-02/03/07/13 が正本。**KAH1は全16章完了**。局所Kählerポテンシャル（KAH1-04）と本科目の**大域 $\partial\bar\partial$-補題**は別の主張。 |
| Hodge star・余微分・実Hodge–de Rham分解・Green作用素 | [GA計画](../plan_done/DREAM_THEATER_GEOMETRIC_ANALYSIS_PLAN.md) の**GA6**が正本。GA4は実Laplacianのスペクトル基礎であり、実Hodge分解そのものの正本ではない。HOD1は複素型別の随伴とLaplacianの比較を新たに証明する。 |
| 向き・積分・de Rham・楔積・双対性 | GEO7/9等の**実在する必要章**から参照。Poincaré双対や複素係数への拡張で未証明の補題があれば、その章で明示して構成する。 |
| Kähler恒等式、複素Hodge分解、$\partial\bar\partial$-補題、Hard Lefschetz、原始分解、Hodge–Riemann関係 | **HOD1が証明の正本**。KAH1/GA6に重複移植しない。 |
| Kodaira埋め込み、一般Chern–Weil、Calabi予想、Hodge予想、周期写像の変動理論 | 各専用科目または後続に残す。HOD1では結果の使い道・入口を説明しても**未証明を既証明扱いしない**。 |

現在は HOD1 専用の系列manifest・章本文が存在しない。**今回の改訂は設計のみ**なので `textbook/plans/` に留める。執筆開始時に系列manifestと実際の章IDを作り、各 `chapter.yaml` / `knowledge.yaml` の最小prerequisite・公開stable anchorを確認する。上の科目名だけを全章の一括prerequisiteにしない。

## 仮定・記号・正規化（初章から一貫して使う）

- 主定理の $X$ は**複素次元 $n$、滑らか・コンパクト・境界なしのKähler多様体**。連結性を使う主張は明記する。局所線形代数やKähler恒等式自体にコンパクト性は不要だが、調和代表・有限次元性・大域 $\partial\bar\partial$-補題には必要。非コンパクト・境界ありの $L^2$ 理論を同じ定理文へ混ぜない。
- KAH1 に合わせ $\omega=i\,g_{j\bar k}\,dz^j\wedge d\bar z^k$、$\omega(u,v)=g_{\mathbb R}(Ju,v)$、$\omega>0$。係数の $1/2$ の有無と実計量の正規化を固定し、ほかの本の式を機械的に混ぜない。
- 複素係数形式の $L^2$ 内積、第一変数の共役線形性（CM2準拠）、複素線形に延長したHodge星、形式的随伴 $d^*,\partial^*,\bar\partial^*$ を定義する。$\Delta_d=dd^*+d^*d\ge0$、$\Delta_\partial=\partial\partial^*+\partial^*\partial$、$\Delta_{\bar\partial}=\bar\partial\bar\partial^*+\bar\partial^*\bar\partial$。GA6の非負Hodge Laplacianと符号を合わせ、関数上の $\operatorname{div}\nabla$ と混同しない。
- $L\alpha=\omega\wedge\alpha$、$\Lambda=L^*$、次数 $k$ の形式上で $H=[\Lambda,L]=(n-k)\,\mathrm{id}$ とする。$[\Lambda,\partial]=i\bar\partial^*$、$[\Lambda,\bar\partial]=-i\partial^*$ の符号はこの $\omega$・随伴・交換子 $[A,B]=AB-BA$ の規約から再計算する。
- $d^c=i(\bar\partial-\partial)$、$dd^c=2i\partial\bar\partial$ を必要時に採用し、文献による $1/2$ の異同を説明する。Lefschetz定理の $L$ は**$[\omega]$ とのcup積**であり、$[\omega/(2\pi)]$ との混同を防ぐ。
- $H^{p,q}_{\bar\partial}(X)$（Dolbeault群）、$\mathcal H^{p,q}(X)$（調和$(p,q)$形式）、$H^k_{\mathrm{dR}}(X;\mathbb C)$、$h^{p,q}=\dim H^{p,q}_{\bar\partial}$ を区別する。Hodge分解の成立前に $H^{p,q}$ を de Rham の直和成分として無条件に同定しない。

## 講義構成（仮16章。章数は証明量に応じて増減可）

### I. 複素型と解析・Lefschetz線形代数

1. **HOD1-01：実Hodge理論から複素形式の随伴へ。** GA6のHodge star・$d^*$・Green作用素を必要なstable anchorで再確認し、CM2の$(p,q)$形式にHermite内積を入れる。$\partial^*,\bar\partial^*$ の型と部分積分、作用素の定義域を確認。$\mathbb C$ 上のコンパクト台形式、平坦複素トーラスのFourierモードで符号を検算。
2. **HOD1-02：Lefschetz作用素とその随伴。** 点ごとにunitary余標構をとり、$L=\omega\wedge$、$\Lambda=L^*$、$[\Lambda,L]|_{\Omega^k}=n-k$ を生成・消滅演算子の一変数計算から導く。複素次元1・2で$(p,q)$基底に作用させて確認。
3. **HOD1-03：$\mathfrak{sl}_2$ と原始形式の線形代数。** $L,\Lambda,H$ の交換子、原始形式 $P^k=\ker\Lambda$（$k\le n$）、$L^r$ の単射・同型と形式の直和分解を**有限次元線形代数として**証明する。ここではまだコホモロジー上のHard Lefschetzを宣言しない。
4. **HOD1-04：Kähler恒等式の局所導出。** KAH1の $\nabla J=0$ とunitary/normal frameを使い、$(\partial,\bar\partial)$・随伴・$\Lambda$ の局所表示を突き合わせる。特に $[\Lambda,\partial]=i\bar\partial^*$ と $[\Lambda,\bar\partial]=-i\partial^*$ の両方を証明し、一般Hermite計量ではtorsion補正が現れることを示す。平坦模型で係数と符号を二通りに検算。
5. **HOD1-05：Laplacian一致と調和形式の型保存。** Kähler恒等式と $\partial\bar\partial+\bar\partial\partial=0$ を用いて $\Delta_d=2\Delta_\partial=2\Delta_{\bar\partial}$ を導出する。$[L,\Delta_d]=[\Lambda,\Delta_d]=0$ と型保存を証明し、非KählerのHermite計量に公式を誤用しない。

### II. Hodge分解・$\partial\bar\partial$-補題・具体例

6. **HOD1-06：Kähler多様体のHodge分解。** GA6の実Hodge–de Rham同型とCM2のDolbeault複体に対して、$\Delta_{\bar\partial}$ の調和代表・Green作用素の型別分解を接続する。$H^k_{\mathrm{dR}}(X;\mathbb C)=\bigoplus_{p+q=k}H^{p,q}_{\bar\partial}(X)$ を証明し、単なる形式の点ごとの型分解とは区別。
7. **HOD1-07：Hodge数の対称性と位相的制約。** 複素共役、Hodge星、Poincaré/Serre型双対の対応を仮定付きで導き、$h^{p,q}=h^{q,p}=h^{n-p,n-q}$、$b_k=\sum_{p+q=k}h^{p,q}$、$b_{2r+1}$ が偶数であることを証明する。$*$ の型と複素線形・反線形の違い、非Kählerへの不適用を明示。
8. **HOD1-08：大域 $\partial\bar\partial$-補題。** コンパクトKähler上の純型形式について $\operatorname{im}\partial\cap\ker\bar\partial=\operatorname{im}\partial\bar\partial=\ker\partial\cap\operatorname{im}\bar\partial$ を示す。特に**$d$-exactかつ$d$-closedな純型形式が $\partial\bar\partial$-exact** となる理由をGreen作用素と恒等式で逐次証明。KAH1-04の**局所**ポテンシャルと峻別し、Bott–Chern/Aeppli群の定義は比較に必要な最小限だけ扱う。
9. **HOD1-09：具体例とHodgeダイヤモンドI。** 複素楕円曲線・高次元複素トーラスの定数係数形式と周期から $h^{p,q}=\binom np\binom nq$ を計算し、$\mathbb{CP}^1$ と積のKünneth型計算を条件・既習結果込みで確認。奇数 $b_1$ のコンパクト複素多様体はKählerになれないという障害を証明し、例の存在・位相は未証明なら別途根拠を示す。

### III. Hard Lefschetz・交叉形式

10. **HOD1-10：調和形式上のLefschetz作用。** $[L,\Delta_d]=0$ と $\omega$ が閉じていることから $L$ が調和代表とde Rham類に作用することを証明する。コホモロジーのcup積と微分形式の楔積の対応、次数・定数倍を実例で確認。
11. **HOD1-11：Hard Lefschetz定理。** 線形代数上の $L^{n-k}$ 同型を調和形式へ適用し、$0\le k\le n$ で $L^{n-k}:H^k(X;\mathbb C)\longrightarrow H^{2n-k}(X;\mathbb C)$ が同型となることを証明。Poincaré双対を結論へ混ぜず、$L$ の非退化性・単射・全射をそれぞれ示す。
12. **HOD1-12：原始コホモロジーとLefschetz分解。** $P^kH^k=\ker\{L^{n-k+1}:H^k\to H^{2n-k+2}\}$（$k\le n$）と調和原始形式の対応を証明し、$H^k=\bigoplus_{r\ge0}L^r P^{k-2r}H^{k-2r}$ の適用可能な次数・零項の扱いを整理する。複素型保存とprimitive $(p,q)$ に接続。
13. **HOD1-13：Hodge–Riemann双線形関係とHodge指数定理。** まず点ごとの原始$(p,q)$形式のHodge星公式と正値内積を計算し、$i^{p-q}(-1)^{k(k-1)/2}\int_X\alpha\wedge\overline\alpha\wedge\omega^{n-k}>0$（非零原始調和代表、正規化係数は正）へ進む。交叉形式の符号・実部分空間を区別し、**複素曲面の実 $(1,1)$ 部分のHodge指数定理**まで証明する。一般の代数的Hodge予想とは切り離す。
14. **HOD1-14：HodgeダイヤモンドIIと大域制約。** $\mathbb{CP}^n$、$\mathbb{CP}^1\times\mathbb{CP}^1$、複素トーラスを比較。$\mathbb{CP}^n$ のコホモロジー環は既証明の根拠があれば参照し、なければ必要な細胞分解等を本章で構成する。$L:H^k\to H^{k+2}$（$k<n$）の単射とBetti数の不等式、Kähler classの非零性・交叉積分を検算。

### IV. Hodge構造と周期への控えめな入口

15. **HOD1-15：Hodgeフィルトレーションと純Hodge構造。** $H^k(X;\mathbb Q)$ と複素化、$F^pH^k=\bigoplus_{r\ge p}H^{r,k-r}$ を定義し、複素共役との関係を証明。実・有理・整係数類の違い、primitive部分のpolarizationが前章の符号条件に依存することを説明。Hodge class・Hodge予想の文言は**問題提起のみ**で、証明したと誤認させない。
16. **HOD1-16：楕円曲線の周期と総合演習。** $E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$、$\operatorname{Im}\tau>0$ の $dz$ の周期 $1,\tau$ を積分して $H^{1,0}$ と格子の関係を導く。基底変更による周期の変換と正値条件を直接検証し、一般の周期写像・Griffiths横断性・変動Hodge構造の深部は後続の別計画へ送る。Kähler恒等式→Hodge→Hard Lefschetzまでの全経路を再導出する総合演習を置く。

## 必須の証明・検算ゲート

| 重点 | 本文で閉じるべき論証・誤りの防止 |
|---|---|
| $L,\Lambda,H$ | unitary余標構での随伴計算、$[\Lambda,L]=n-k$、primitive条件と分解の次数。符号・$i$・$2$・階乗を例で検算。 |
| Kähler恒等式 | normal frameの使用条件、形式的随伴の定義、二つの交換子の符号。一般Hermite計量のtorsion項を省略した誤用をしない。 |
| Laplacian | 三者の非負性、$\Delta_d=2\Delta_\partial=2\Delta_{\bar\partial}$ の交差項の打消し、調和代表の型保存とcompact仮定の使用位置。 |
| Hodge分解 | GA6の実Hodge同型とCM2のDolbeault同型を別々に参照してから結び、形式の直和・cohomologyの直和を区別。 |
| $\partial\bar\partial$-補題 | $\partial$-exact/$\bar\partial$-closed等の正確な交差条件、Green作用素との可換性、原始形式の構成と符号。局所補題・大域補題を混同しない。 |
| Hard Lefschetz | $L$ がharmonicを保つ理由、線形代数の同型をコホモロジーへ移す段階、primitiveの核の次数。 |
| Hodge–Riemann | $i^{p-q}$、$(-1)^{k(k-1)/2}$、$\omega^{n-k}$ の向き・符号・階乗、実$(1,1)$部分の負定値性。 |
| 具体例 | $E_\tau$ の周期、複素トーラスの組合せ係数、$\mathbb{CP}^n$ のcohomologyの根拠、$b_{2r+1}$ 偶数性。 |

**直接例と演習の核**：$n=1,2$ で $L,\Lambda$ の作用を手計算、平坦トーラスの $\partial^*,\bar\partial^*$、Kähler恒等式からLaplacianの係数2を再現、既知の閉形式の調和代表、$\partial\bar\partial$-exactと単なる$d$-exactの差、楕円曲線のHodgeダイヤモンド、$\mathbb{CP}^1\times\mathbb{CP}^1$ の交叉形式、primitive $(1,1)$ の負符号、周期 $1,\tau$ の算出。単に公式を代入するだけの類題で題数を水増ししない。

各実装章に動機→初出定義→**全条件を確認する直接例**→適用条件付きの主要定理と中間式を省かない証明→原則 Level A 4 / B 3 / C 1 題**以上**と全問の詳細解答を置く。最低数で打ち切らず、主要learning objectiveと典型的な誤解を練習できる数まで追加する。既出の定義・定理を使う文脈では利用箇所に**実在するcanonical stable anchor**を付ける。HOD1新規本文には区分Cの全件自己再計算と別観点再査読を適用するが、**別の完了章の追跡監査は対象章IDを指定された場合のみ**行う。

## 標準教科書・テキストとの照合（2026-10-28）

| 文献 | PLANに反映した教育上の骨格 | 本PLANでの扱いの境界 |
|---|---|---|
| [Daniel Huybrechts, *Complex Geometry: An Introduction* (Springer, 2005)](https://link.springer.com/book/10.1007/b137952) | Kähler identities → Kähler上のHodge theory → Lefschetzという順序、例と演習の厚み。 | 束の一般論・変形理論はCM2と後続の正本を参照。 |
| [Werner Ballmann, *Lectures on Kähler Manifolds* (EMS, 2006), 第5章](https://ems.press/books/esi/19/contents) | Kähler geometryの既習部分からcohomologyへ接続し、局所恒等式が大域制約を生む筋道。 | Ricci・Calabi予想・Kodaira埋め込みはKAH1と専用PLANの領域。 |
| [Andrei Moroianu, *Lectures on Kähler Geometry* (Cambridge, 2007)](https://www.cambridge.org/core/books/lectures-on-kahler-geometry/EB2FCE9AF46904A6651920E161EB339F/listing) | 微分幾何の基本操作から随伴・Kähler恒等式へ進む比較的短い証明の道筋。 | 90分単位・講数を固定せず、独習に必要な中間式を追加する。 |
| [Claire Voisin, *Hodge Theory and Complex Algebraic Geometry I* (Cambridge, 2002), Part II](https://www.cambridge.org/core/books/hodge-theory-and-complex-algebraic-geometry-i/A6E52939BA107FFCB5A901D5B5D88025) | Hodge分解、Lefschetz分解からHodge構造・polarization・周期へ至る理論的な出口。 | variations、代数的cycle類、Hodge予想の深部は後続。 |
| [Jean-Pierre Demailly, *Complex Analytic and Differential Geometry*（著者公開ノート）](https://www-fourier.univ-grenoble-alpes.fr/~demailly/documents.html) | $\partial,\bar\partial$ の随伴・局所公式・Kähler幾何を原文の規約と比較し、定数・符号の誤移植を防ぐ。 | 積分表示・消滅定理の高度な一般化は本筋へ押し込まない。 |
| [University of Illinois, Math 514 syllabus](https://math.illinois.edu/resources/syllabus-math-514) | Hodge–de Rham → Kähler identities・$\partial\bar\partial$ lemma → Lefschetz・Hodge index → Hodge structuresという大学院講義の接続を補助確認。 | シラバスの授業時間や全発展項目は必須講数・修了条件にしない。 |

文献は**学修順序・定義・定理の仮定・説明粒度を照合するための一次参照**であり、書籍の記述を転載したり、著書に載るという理由だけで本科目の「証明済み」にしたりしない。具体的な局所恒等式・符号は本文執筆時に選択した内積・計量規約の下で独立に導出する。

## 実装・完了条件

1. 最初の実装時にHOD1系列manifestを初期化し、仮IDを実在IDへ確定する。**このPLANの推敲だけでは `plans_progress/` に移動しない。**
2. 学習者がprerequisiteのみで各章の主要定義・定理・証明を再構成できるよう、必要なら上記16章を分割・統合する。HOD1のためにGA6/KAH1/CM2の既習論証を無用に再執筆しない。
3. 数式の係数・符号・随伴・次数、非Kähler反例、大域のcompact仮定、実／複素／有理係数、Serre型双対の仮定を各章で監査する。
4. 新規本文の全主要証明・全演習と詳細解答を再計算し、完成本文を読者の立場で別観点再読する。CI greenやformal statementの個数だけで完成判定しない。
5. 全章実装、横断的な依存・anchor・Hodge/Lefschetz符号・章間重複・公開索引・系列manifest・対象CIを確認後にのみ `plan_done/` へ移す。独立第三者査読は実施した場合だけそのように記録する。
