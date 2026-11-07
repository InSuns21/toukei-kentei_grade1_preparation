# DREAM THEATER 複素構造の変形・モジュライ（DEF1）

分冊: 2026-10-11
設計改訂: 2026-11-08
状態: planned（設計のみ、講義数は11章に確定）

## 中心問い・完成地点

複素構造の無限小変形を$H^1(X,T_X)$で、一次障害を$H^2(X,T_X)$で記述する。Kuranishiの局所モデルとCalabi–Yauの非障害性を、仮定・核心論証・証明が長い解析的入力の境界まで明示して、周期とHodge構造の変動へ進む。

## 直接依存・責務境界

[CYG1](../plan_done/DREAM_THEATER_CALABI_YAU_GEOMETRY_PLAN.md)（体積形式と$H^{n-1,1}$）、[AG3](../plan_done/DREAM_THEATER_ALGEBRAIC_GEOMETRY_I_III_PLAN.md)（接層・変形の入口）、[CM1/CM2](../plan_done/DREAM_THEATER_COMPLEX_MANIFOLDS_I_II_PLAN.md)（複素型・Dolbeault・接束）、[HOD1](../plan_done/DREAM_THEATER_KAHLER_HODGE_THEORY_PLAN.md)（$\partial\bar\partial$-補題・Hodge構造）を直接の証明所有者として確認する。一般の代数的モジュライスタック、Torelliの定理、ミラーの周期微分方程式は本科目の対象外。

## 講義構成（確定11章）

1. **DEF1-01：何を変形するか。** 滑らかな族、Ehresmann局所自明化、複素構造と座標変更、Kodaira–Spencer写像の構成。
2. **DEF1-02：Beltrami微分と接束値形式。** $A^{0,1}(T^{1,0}X)$ の局所表示、摂動された$(0,1)$-方向、座標独立性。
3. **DEF1-03：Maurer–Cartan方程式。** $\bar\partial\phi+\tfrac12[\phi,\phi]=0$ を積分可能性から導き、ゲージ同値と一次近似を区別する。
4. **DEF1-04：接空間と自己同型。** $\bar\partial$-閉形式と$\bar\partial$-完全形式から$H^1(X,T_X)$を得る。$H^0(X,T_X)$が同一視に与える影響を明示する。
5. **DEF1-05：障害類。** 二次近似の$[\phi_1,\phi_1]$から$H^2(X,T_X)$の障害を構成し、群が非零でも必ず障害が出るわけではない例を示す。
6. **DEF1-06：Kuranishi構成I。** Hodge分解、Green作用素、ゲージ固定、陰関数定理の解析的前提と局所方程式を検算する。
7. **DEF1-07：Kuranishi構成II。** 有限次元障害写像、局所基底、普遍性と自己同型による非一意性の違いを示す。一般存在定理の補題は証明担当を明記する。
8. **DEF1-08：Bogomolov–Tian–Todorov。** 正則体積形式による収縮と$\partial\bar\partial$-補題から障害消滅の核心恒等式を追い、Kähler・標準束などの仮定を落とさない。
9. **DEF1-09：Calabi–Yauの局所モジュライ。** $H^{n-1,1}$と接空間、無障害性による滑らかな基底とその局所性、自己同型と大域空間の落とし穴。
10. **DEF1-10：Gauss–ManinとHodgeフィルトレーション。** 局所系、平坦接続、周期写像、Griffiths横断性の計算と適用条件を説明する。
11. **DEF1-11：quinticの101方向とミラーへの橋。** 多項式変形$126-1-24$と$h^{2,1}=101$の突合、局所座標から周期変動への総合演習。

## 文献との照合

- [D. Huybrechts, Complex Geometry: An Introduction（Springer）](https://link.springer.com/book/10.1007/b137952)：Deformations of Complex Structures章。
- [C. Voisin, Hodge Theory and Complex Algebraic Geometry I・II（Cambridge）](https://www.cambridge.org/core/books/hodge-theory-and-complex-algebraic-geometry-ii/47F0D9D694725A426F9CAFDFA830DB11)：Hodge構造の変動、Gauss–Maninと周期の導線。
- [BIMSA, Complex Geometry講義シラバス](https://bimsa.net/activity/ComGeo0/)：Kodaira–SpencerからTian–Todorovまでの教育的順序。

## 実装・査読

設計上の11章であり時間割の上限ではない。核心補題の証明が収まらない場合は根拠付きでPLANを改訂する。着手時にseries manifest、実在するanchorと必要な楕円型解析の前提を確認する。各章A4/B3/C1以上・全詳細解答、区分Cの全件自己再計算と別観点再読を実施する。**別章の追跡監査は明示依頼時のみ**。
