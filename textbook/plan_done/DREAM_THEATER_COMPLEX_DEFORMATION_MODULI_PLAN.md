# DREAM THEATER 複素構造の変形・モジュライ（DEF1）

分冊: 2026-10-11
設計改訂: 2026-11-09
状態: completed（DEF1-01〜DEF1-14の全14章完成、本文・演習・直接解答・系列manifest・公開目次を整備。2026-11-10）

## 中心問い・完成地点

複素構造の一次変形を$H^1(X,T_X)$で、二次以上への延長で現れる障害類を$H^2(X,T_X)$で記述する。Kuranishi空間の**解析的構成・局所完全性**、Calabi–YauのBogomolov–Tian–Todorov非障害性の**核心恒等式・帰納的解法**を区別して証明し、Gauss–Manin接続から周期写像のGriffiths横断性へ進む。

## 直接依存・責務境界

[CYG1](../plan_done/DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md)（体積形式と$H^{n-1,1}$）、[AG3](../plan_done/DREAM_THEATER_ALGEBRAIC_GEOMETRY_I_III_PLAN.md)（接層・変形の入口）、[CM1/CM2](../plan_done/DREAM_THEATER_COMPLEX_MANIFOLDS_I_II_PLAN.md)（複素型・Dolbeault・接束）、[HOD1](../plan_done/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)（$\partial\bar\partial$-補題・Hodge構造）を直接の証明所有者として確認する。一般の代数的モジュライスタック、Torelliの定理、ミラーの周期微分方程式は本科目の対象外。

## 講義構成（確定14章）

1. **DEF1-01：変形族とKodaira–Spencer写像。** 固有正則沈め込みの族、Ehresmann局所自明化、複素構造と座標変更、Čech表示とDolbeault表示によるKodaira–Spencer写像を構成する。
2. **DEF1-02：Beltrami微分と接束値形式。** $A^{0,1}(T^{1,0}X)$ の局所表示、摂動された$(0,1)$-方向、座標独立性を直接例で確認する。
3. **DEF1-03：Maurer–Cartan方程式。** $\bar\partial\phi+\tfrac12[\phi,\phi]=0$ を積分可能性から導く。括弧とゲージ作用を定義し、実際の族と形式的解の違いを示す。
4. **DEF1-04：一次変形・同値・自己同型。** $\bar\partial$-閉形式と$\bar\partial$-完全形式から$H^1(X,T_X)$を得て、$H^0(X,T_X)$が無限小自己同型を記述することを明示する。
5. **DEF1-05：二次以上の障害類。** 二次近似の$[\phi_1,\phi_1]$から$H^2(X,T_X)$値の障害を構成し、$H^2\ne0$と「実際に障害が生じる」を区別する例を検算する。
6. **DEF1-06：Kuranishi構成I――調和ゲージと方程式。** $T_X$値Dolbeault複体のHodge分解・Green作用素・ゲージ固定を準備し、Maurer–Cartan方程式の無限次元成分を解く方程式を導く。
7. **DEF1-07：Kuranishi構成II――解析的収束と有限次元基底。** 関数空間・楕円型評価・陰関数定理の仮定を明示して解の収束を支え、障害写像の零点集合として局所解析空間を構成する。
8. **DEF1-08：Kuranishi構成III――局所完全性と普遍性の限界。** 任意の十分小さい変形族を局所基底から引き戻す議論を追い、versal／semiuniversal／universalの違い、自己同型による同一視の非一意性を確認する。
9. **DEF1-09：Bogomolov–Tian–Todorov I――核心恒等式。** 非消滅正則体積形式との収縮、$\partial(\phi\lrcorner\Omega)=0$の条件の下でTian–Todorov補題により括弧の収縮が$\partial$-完全になることを示し、$\partial\bar\partial$-補題へ接続する。コンパクトKähler・$K_X\simeq\mathcal O_X$の仮定を明示する。
10. **DEF1-10：Bogomolov–Tian–Todorov II――障害消滅と収束。** Maurer–Cartan方程式の次数ごとの可解性、$\partial$-閉代表の選択、解析的収束を接続し、局所基底の滑らかさを得る。形式的無障害性だけで解析的族の存在を宣言しない。
11. **DEF1-11：Calabi–Yauの局所モジュライ。** $H^1(X,T_X)\simeq H^{n-1,1}(X)$、滑らかなKuranishi基底とその局所性、自己同型・大域商空間の落とし穴を区別する。
12. **DEF1-12：Gauss–Manin接続の構成。** 滑らかな固有族の局所系$R^k\pi_*\mathbb C$、平坦接続、並行移動とde Rhamコホモロジーの関係を導く。
13. **DEF1-13：Hodge構造の変動と周期写像。** Hodgeフィルトレーションの正則変動、周期写像の定義とGriffiths横断性$\nabla F^p\subset\Omega_B^1\otimes F^{p-1}$を局所計算で示す。偏極の必要な箇所は追加仮定を宣言する。
14. **DEF1-14：quinticの101方向とミラーへの橋。** 滑らかなquinticの次数5単項式$126$、多項式のスカラー$1$、射影座標変換$24$の差$101$を、正規束列・コホモロジー計算による$h^{2,1}=101$と照合し、周期変動まで総合演習する。

## 講義数を14章とする理由・証明の停止線

- Kodairaの標準書は**無限小変形／存在／完全性**を独立に扱う。Kuranishiのゲージ方程式を解くことと、任意の小変形を局所基底が捕捉することは別の主張なので、DEF1-06〜08を分離する。
- Bogomolov–Tian–Todorovの収縮恒等式は、次数ごとの障害消滅・収束の代用にならない。DEF1-09・10で代数的核心と解析的閉包を分離する。
- Gauss–Maninの平坦接続が存在することと、Hodgeフィルトレーションの正則性・Griffiths横断性は別の検証対象なので、DEF1-12・13を分離する。以上の3分割が旧11章からの純増3章であり、講数合わせの補講は置かない。
- **証明の責務**：Kuranishi存在・局所完全性、BTTの核心補題・帰納法、横断性は本系列で証明を閉じる。長い楕円型正則性・関数解析の入力は既習の実在定理へ使用位置でリンクし、既習外なら導入と証明を補う。一般のモジュライスタック、全般的なTorelli定理、ミラー周期のPicard–Fuchs方程式は対象外。

## 文献との照合

- [K. Kodaira, *Complex Manifolds and Deformation of Complex Structures*（Springer）](https://link.springer.com/book/10.1007/978-1-4613-8590-5)：Infinitesimal Deformation／Theorem of Existence／Theorem of Completenessを、DEF1-04〜08の分割根拠とする。
- [D. Huybrechts, *Complex Geometry: An Introduction*（Springer）](https://link.springer.com/book/10.1007/b137952)：最終章のMaurer–Cartan方程式から変形理論への導入と教材の説明粒度を照合する。
- [M. Manetti, *Lectures on deformations of complex manifolds*](https://arxiv.org/abs/math/0507286)：滑らかな族、無限小変形、dg Lie代数、BTTの証明の区別を照合する。本系列は一般の導来・拡張変形理論まで広げない。
- [D. Popovici, *Non-Kähler Hodge Theory and Deformations of Complex Structures*](https://www.math.univ-toulouse.fr/~popovici/hodge-def.pdf)：Kuranishi基底とBTTの収束・$\partial\bar\partial$仮定を検査する。非Kählerへの一般化は発展事項に留める。
- [C. Voisin, *Hodge Theory and Complex Algebraic Geometry II*（Cambridge）](https://www.cambridge.org/core/books/hodge-theory-and-complex-algebraic-geometry-ii/47F0D9D694725A426F9CAFDFA830DB11)：Gauss–Manin・Hodge構造の変動・周期写像の導線を照合する。

## 実装・査読

設計上の14章であり90分授業・学期時間割の上限ではない。核心補題の証明が収まらない場合は根拠付きでPLANを改訂する。着手時にseries manifest、実在するanchorと必要な楕円型解析の前提を確認する。各章A4/B3/C1以上・全詳細解答、区分Cの全件自己再計算と別観点再読を実施する。**別章の追跡監査は明示依頼時のみ**。
