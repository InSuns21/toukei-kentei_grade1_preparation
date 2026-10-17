# DREAM THEATER Kähler幾何学（KAH1）

分冊: 2026-10-11  
推敲: 2026-10-14（標準教科書・講義ノートとの照合、依存と証明責務の再設計）  
状態: in_progress（KAH1-01〜KAH1-12を実装。KAH1-13以降と系列横断監査は未完了）

## 中心問いと到達点

**複素構造 $J$ とRiemann計量 $g$ を両立させ、閉じた基本2形式 $\omega$ を得ると、局所ポテンシャル・曲率・第一Chern類・大域Kähler classがなぜ一つの幾何として結び付くのか。**

単に $d\omega=0$ とRicci形式の公式を記憶するのではなく、$(J,g,\omega)$ の互換性から各公式を再導出する。終了時には (i) Kähler条件の同値性、(ii) 局所ポテンシャル、(iii) Fubini–Study形式の貼り合わせと積分、(iv) 接続と曲率、(v) $\rho/(2\pi)$ と $c_1(X)$ の関係を、定義・仮定・途中計算込みで説明できることを目標とする。

## 直接依存・責務境界

- 直接の数学的前提：**CM1/CM2**（複素アトラス、$T^{1,0}$、$(p,q)$ 形式、$\partial,\bar\partial$、正則束、Hermite計量、Chern接続・曲率）、**GEO7/9/13/16**（微分形式、de Rham、Levi–Civita接続、Riemann曲率の必要部分）。内容ごとに実在する完成章のstable anchorへリンクする。
- [CM1/CM2の現行PLAN](../plan_done/DREAM_THEATER_COMPLEX_MANIFOLDS_I_II_PLAN.md) は textbook/plan_done/ にある。旧 textbook/plans_progress/ 宛てのリンクを使用しない。CM2-09〜11の一般Hermite計量・Chern接続の存在一意性・曲率公式は**CM2が正本**である。
- 本科目 **KAH1の正本**：Kähler条件とその同値性、Kählerポテンシャル、Fubini–Study計量の幾何、Kähler接続と接束の曲率、Ricci形式、$\rho/(2\pi)$ による第一Chern類の表示、Kähler class、$U(n)$ ホロノミーへの入口。
- 後続：[HOD1](../plans/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md) が **Kähler恒等式・Hodge分解・$\partial\bar\partial$-補題の大域版・Hard Lefschetz・primitive decomposition** を所有する。KAH1の「局所$\partial\bar\partial$-ポテンシャル」とHOD1の「コンパクトKähler多様体上の大域$\partial\bar\partial$-補題」を混同しない。
- [GBG](../plans/DREAM_THEATER_PRINCIPAL_BUNDLES_GAUGE_GEOMETRY_PLAN.md) が一般の主束・ゲージ接続・Chern–Weil理論を所有する。KAH1ではCM2のChern接続を接束・標準束に適用し、**第一Chern類に必要な特殊計算**を証明する。一般の全特性類理論を二重実装しない。
- [CAG1](../plans/DREAM_THEATER_COMPLEX_ALGEBRAIC_GEOMETRY_PLAN.md) がGAGAと射影代数幾何、[CYG1](../plans/DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md) がCalabi–Yauの定義・例と諸条件の区別、[YAU1](../plans/DREAM_THEATER_YAU_CALABI_CONJECTURE_PLAN.md) が複素Monge–Ampère・連続性の方法・存在証明を所有する。**Kodaira埋め込み定理、Calabi–Yau定理の一般存在部、Ricci平坦性と標準束自明性の無条件同値**はKAH1では証明済みとしない。

## 記号と規約（初章で固定）

- $X$ は複素次元 $n$ の**可積分**複素多様体、$J^2=-1$ はその実接束上の複素構造。概複素多様体上のalmost Kähler条件は対照例として区別する。
- 正則座標 $z^i$ で $\omega=i\,g_{i\bar j}\,dz^i\wedge d\bar z^j$、$\omega(u,v)=g_{\mathbb R}(Ju,v)$ とする。$g_{i\bar j}$ は正値Hermite行列で、重複添字を総和する。この規約で局所ポテンシャルは $\omega=i\partial\bar\partial\varphi$。
- $\rho=-i\partial\bar\partial\log\det(g_{i\bar j})$、$c_1(X)_{\mathbb R}=[\rho/(2\pi)]$、$K_X=\det(T^{*1,0}X)$、$c_1(K_X)=-c_1(X)$。$\rho$ の符号、$2\pi$、Ricciテンソルとの同定を毎回この規約へ戻して検算する。
- Fubini–Study形式は $\omega_{\mathrm{FS}}=i\partial\bar\partial\log(1+\sum|z^i|^2)$ と定義し、$\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=2\pi$、$[\omega_{\mathrm{FS}}/(2\pi)]=c_1(\mathcal O(1))_{\mathbb R}$ と整合させる。他の教科書の $1/2$ や $1/(2\pi)$ 付き正規化と混ぜない。
- 第一変数共役線形のHermite計量など、CM2で採用した内積・局所枠の規約に合わせる。接続行列 $H^{-1}\partial H$ を使う場合は列ベクトル・枠変換規約を明記する。

## 講義構成（暫定16講。15週・固定講数ではなく、証明量に応じて再編可）

### 第I部　複素・計量・シンプレクティック構造の両立

1. **KAH1-01：複素構造とHermite計量の出会い。** $g(Ju,Jv)=g(u,v)$、$\omega(u,v)=g(Ju,v)$ を定義から計算。$J,g,\omega$ のうち何を与えれば残りを復元できるかを確かめ、Hermitian / Kähler / almost Kählerの包含と非同義性を整理する。
2. **KAH1-02：基本 $(1,1)$ 形式とKähler条件。** $g_{i\bar j}$ の正定値性、$\omega$ の実性・型・非退化性を証明。$d\omega=0$ を $\partial\omega=\bar\partial\omega=0$ および $\partial_k g_{i\bar j}=\partial_i g_{k\bar j}$ の局所条件へ展開し、閉性と正値性を別々に検算する。
3. **KAH1-03：Kähler条件の同値性。** 複素構造が可積分であるという前提の下、$d\omega=0\Longleftrightarrow\nabla^{\mathrm{LC}}J=0$、および接束のChern接続とLevi–Civita接続の一致を、torsionと局所座標式を通して証明する。一般Hermite計量では一致しない理由を明示する。
4. **KAH1-04：局所Kählerポテンシャル。** 閉じた実 $(1,1)$ 形式の局所 $\omega=i\partial\bar\partial\varphi$ 表示を、Poincaré補題と型分解から導出。$\varphi$ の差が局所的に実部正則関数であることと、強多重劣調和性との同値を証明。局所の存在から大域の単一ポテンシャルを推論しない。

### 第II部　具体例と射影空間

5. **KAH1-05：平坦模型と構成操作。** $\mathbb C^n$、複素トーラス、積、正則部分多様体への誘導計量を構成。閉性・正値性・曲率の零非零を個別に検証し、複素多様体であれば自動的にKählerという誤解を避ける。
6. **KAH1-06：Fubini–Study形式I（局所構成）。** $\mathbb{CP}^n$ の各標準チャートで $\log(1+\lVert z\rVert^2)$ から $g_{i\bar j}$ を微分し、正定値性を固有値またはCauchy–Schwarzで検証する。
7. **KAH1-07：Fubini–Study形式II（貼り合わせと規格化）。** チャート遷移でポテンシャルが $\log|f|^2$ だけ変わり、$i\partial\bar\partial\log|f|^2=0$ により形式が大域に貼り合うことを示す。$\mathbb{CP}^1$ で面積積分 $2\pi$ を直接計算し、$\mathcal O(1)$ のChern形式と比較する。

### 第III部　接続・曲率・第一Chern類

8. **KAH1-08：Kähler接続と正則座標。** CM2のChern接続を $T^{1,0}X$ に適用し、Kähler条件下の $\Gamma^k_{ij}=g^{k\bar\ell}\partial_i g_{j\bar\ell}$、混合成分の扱い、局所Kähler正規座標の意味を導く。一般の主束接続の存在・一意性は再証明しない。
9. **KAH1-09：Kähler曲率テンソル。** $R_{i\bar j k\bar\ell}$ の二階微分・二次項を明示し、$R_{i\bar j k\bar\ell}=R_{k\bar j i\bar\ell}$ などの対称性を導く。$R(X,Y)Z$ の符号規約を冒頭で固定し、複素・実の曲率添字を無断で入れ替えない。
10. **KAH1-10：曲率の具体計算。** 平坦トーラス、複素次元1の局所共形計量、Fubini–Studyの曲率を題材に、正規座標・曲率成分・Ricci縮約を手計算する。正の定曲率・正のholomorphic sectional curvatureの規格化の差を必要に応じて区別する。
11. **KAH1-11：Ricci形式の局所導出。** $R_{i\bar j}$ を曲率の縮約から求め、Jacobiの行列式微分公式を使って $\rho=-i\partial\bar\partial\log\det(g_{i\bar j})$ に至る。座標変換の下で $\log\det g$ 自体は不変でないが $\rho$ が大域的に定義されること、および $d\rho=0$ を証明する。
12. **KAH1-12：Chern類と標準束。** $\det(T^{1,0}X)=K_X^{-1}$ の誘導Chern接続を使い、局所曲率のtraceと $\rho$、$c_1(X)_{\mathbb R}=[\rho/(2\pi)]$ を結ぶ。一般Chern–Weilの独立性に必要な補題はGBGまたは対象章のstable anchorに依存を記し、未証明の一般論を黙って用いない。$c_1(K_X)=-c_1(X)$ の符号を確認する。

### 第IV部　大域的帰結と後続への橋

13. **KAH1-13：Kähler classと正値性。** $[\omega]\in H^2_{\mathrm{dR}}(X;\mathbb R)$ の定義、同一複素構造の下で正の実閉 $(1,1)$ 形式が与えるclass、足し合わせと正のスカラー倍、開性の有限次元コホモロジー的意味を仮定を付して扱う。コンパクト正次元では $\omega^n$ の正の積分により $[\omega]\ne0$、したがって大域ポテンシャル一つで $\omega=i\partial\bar\partial\varphi$ と書けないことを示す。
14. **KAH1-14：射影多様体・整数classとの境界。** 射影多様体へのFubini–Study形式の制限、積分Kähler classと正の線束との関係の入口を示す。「Kählerなら射影的」とは主張しない。**Kodaira埋め込み定理の十分性**、$(1,1)$ classと線束の同定、Hodge分解が必要な箇所は定理の仮定・掲載先を明記してCAG1/HOD1へ送る。
15. **KAH1-15：Kähler–Einstein・Ricci平坦への入口。** $\rho=\lambda\omega$ と $[\rho]=2\pi c_1(X)_{\mathbb R}$ の必要なコホモロジー条件、$\rho=0\Rightarrow c_1(X)_{\mathbb R}=0$ を導く。$c_1(X)_{\mathbb R}=0$ からRicci平坦計量が存在することは**YAU1で扱う深い存在定理**であり、本科目では仮定付き予告に留める。$\rho=0$、$K_X\simeq\mathcal O_X$、$c_1(X)$ の整係数・実係数での消滅を同義としない。
16. **KAH1-16：ホロノミーと総合演習。** $\nabla J=0$ から $\mathrm{Hol}(g)\subseteq U(n)$ を導き、Ricci形式が接続の行列式表現の曲率を測ることを説明する。$\rho=0$ なら**制限ホロノミー**が $SU(n)$ に含まれるという結論と、大域の全ホロノミーが必ず $SU(n)$ に含まれるという主張を区別する。例・反例・必要条件を総合しCYG1/YAU1へ接続する。

## 必須の証明・計算チェックポイント

| 項目 | 合格条件 |
|---|---|
| Kähler同値性 | 複素構造の可積分性を仮定し、$d\omega$・接続係数・torsionの消滅を行間省略なく往復する |
| 局所ポテンシャル | 局所Poincaré補題から $i\partial\bar\partial$ 表示まで導き、重なり上の差と大域非存在を区別する |
| Fubini–Study | 二つ以上のチャートで係数・遷移・正値性を検算し、$\mathbb{CP}^1$ の積分が上記規約で $2\pi$ となることを実積分で確認する |
| 接続・曲率 | CM2既出の一般Chern接続を参照してKähler固有の一致を証明し、曲率の二階微分・積項・縮約を明示する |
| Ricci形式・第一Chern類 | 行列式微分、座標変換、$d\rho=0$、$2\pi$、$K_X$ の符号をそれぞれ独立に再計算する |
| Kähler classとホロノミー | コンパクト性・連結性・正次元・曲率零・制限ホロノミーなど各命題の仮定を落とさない |

演習の必須モデル：$\mathbb C^n$ 上の非定数局所ポテンシャル、格子商への降下、$\mathbb{CP}^1$ のチャート貼り合わせと積分、Hermiteだが非Kählerとなる計量の局所反例、コンパクト多様体のexact symplectic形式不可能性、$K_X^{-1}$ のRicci形式と第一Chern類。式の符号・係数はテキストに掲載する前に独立な二通りの計算法で照合する。

## 実装・品質・停止条件

- **KAH1-01から実装を開始した。** 今後は章の実装状態を系列manifestで追跡する。想定16講は上限でも固定達成目標でもなく、一章ごとの主要証明・例・演習に応じて分割・統合する。
- 正式着手時に最新版のCM1/CM2・GEO・GBG・HOD1・CAG1・CYG1・YAU1を再読し、章別の必要十分なprerequisiteと**実在する公開stable anchor**を確定する。未公開章を完成済みの証明として引用しない。
- 各章に導入・動機、初出定義、例の実計算、主要定理と必要補題の省略なしの証明、**演習A4/B3/C1以上と全詳細解答**を用意する。符号・実／複素次元・正則／滑らか・局所／大域・整係数／実係数の取り違えをレビュー項目にする。
- 自己再計算→別観点の全件査読→同一章の追跡監査→章横断の依存・リンク・数式配置・CI・公開導線検証を完了条件とする。他科目の完了章の追加追跡監査は章IDを指定した依頼時のみ行う。
- HOD1/YAU1の核心定理を証明せず借りる場合は、主張を「後続で証明する結果先行」と明示し、推論の途中で既証明扱いしない。将来追加補講が必要なら実際の欠損補題を具体化して計画化する。

## 標準教科書・テキストとの照合記録（2026-10-14）

| 文献 | 今回KAH1へ取り込む観点 | 今回の非採用・後送 |
|---|---|---|
| [Werner Ballmann, *Lectures on Kähler Manifolds* (EMS, 2006)](https://ems.press/books/esi/19/contents) | Kähler計量→曲率・大域構造という微分幾何の主線、計算からRicciへ進む順序 | cohomologyの詳細・Calabi予想・Kodaira埋め込みはHOD1/YAU1/CAG1 |
| [Andrei Moroianu, *Lectures on Kähler Geometry* (Cambridge, 2007)](https://www.cambridge.org/core/books/abs/lectures-on-kahler-geometry/contents/823EB6F94327152106F30C3046D6DBF4) | 接続・Hermite/Kählerの区別、曲率、例、ホロノミーへの橋 | Hodge/Dolbeaultの大域理論とCalabi–Yauの深部は後続 |
| [Daniel Huybrechts, *Complex Geometry: An Introduction* (Springer, 2005)](https://link.springer.com/book/10.1007/b137952) | 複素多様体→Kähler多様体→束・Chern類の間の概念依存 | Kähler identities / Hodge theoryはHOD1、変形理論はDEF1 |
| [Claire Voisin, *Hodge Theory and Complex Algebraic Geometry I* (Cambridge, 2002)](https://www.cambridge.org/core/books/hodge-theory-and-complex-algebraic-geometry-i/A6E52939BA107FFCB5A901D5B5D88025) | Kähler幾何をHodge・Lefschetzへ進める数学的接続点の確認 | Hodge分解・Hard Lefschetzの証明はHOD1 |
| [Jean-Pierre Demailly, *Complex Analytic and Differential Geometry*（著者公開ノート）](https://www-fourier.ujf-grenoble.fr/~demailly/source_files/analgeom/agbook.pdf) | Chern接続・第一Chern類・正の線束・$\mathcal O(k)$ の局所公式との照合 | 正値性に関する高度な消滅・埋め込み定理はCAG1以降 |
| [MIT OCW 18.966, lecture 14（Denis Auroux）](https://ocw.mit.edu/courses/18-966-geometry-of-manifolds-spring-2007/resources/lect14/) | 正のポテンシャルとFubini–Studyの初学者向け導出順序 | 講義内のHodge分解の説明はHOD1 |

この文献一覧は**構成・扱う範囲・定義の照合先**であり、書籍に記された定理をそのまま証明済みとして輸入する根拠ではない。本文の正式着手時には個別命題の仮定と規約を原文・一次資料まで突き合わせる。
