# DREAM THEATER ホモロジカル・ミラー対称性（HM1）

分冊: 2026-10-11
設計改訂: 2026-11-08
状態: planned（設計のみ、講義数は18章に確定）

## 中心問いと責務境界

Fukaya $A_\infty$-圏と連接層の導来圏を比較するとは何か。最初の厳密なモデルとして楕円曲線を扱い、一般のCalabi–Yau三次元多様体に対するKontsevichの予想を証明済みと混同しない。

直接参照：[MIR2](DREAM_THEATER_MIRROR_SYMMETRY_I_II_PLAN.md)、[AG3](../plan_done/DREAM_THEATER_ALGEBRAIC_GEOMETRY_I_III_PLAN.md)、[SYM1〜8](../plan_done/DREAM_THEATER_SYMPLECTIC_GEOMETRY_I_PLAN.md)。導来圏・ホモロジー代数・Floer理論の既存canonical ownerを着手前に調べ、不足が実在するときは**HM1前の独立補講**を設計する。MIR2のGW数値計算から$A_\infty$圏の構成が直ちに従うわけではない。

## 講義構成（確定18章）

1. **HM1-01**：圏・関手・自然変換、加法圏と導来の問い。
2. **HM1-02**：複体、鎖ホモトピー、擬同型と導来圏の局所化。
3. **HM1-03**：連接層の有界導来圏、Extと楕円曲線上の例。
4. **HM1-04**：次数付き演算、Koszul符号、$A_\infty$代数の定義。
5. **HM1-05**：Stasheff恒等式を低次で計算し、結合律のホモトピー的意味を確認。
6. **HM1-06**：$A_\infty$-関手、準同値、twisted complexes、分裂閉包。
7. **HM1-07**：Lagrange交叉、作用汎関数、Floer複体の生成元と次数。
8. **HM1-08**：Floer微分、擬正則strip、$\partial^2=0$のコンパクト化・境界。
9. **HM1-09**：三角形の計数と$\mu^2$、楕円曲線での積の例。
10. **HM1-10**：多角形計数と高次$\mu^k$、境界分裂から$A_\infty$恒等式。
11. **HM1-11**：向き・spin・grading・局所系と符号の管理。
12. **HM1-12**：obstructed曲線、$\mu^0$とbounding cochain、構成可能範囲。
13. **HM1-13**：Fukaya圏の対象・射・合成を正確に組み立てる。
14. **HM1-14**：楕円曲線の直線Lagrange部分多様体とdual torusの線束。
15. **HM1-15**：三角形の計数とtheta関数、積の対応を具体係数で照合。
16. **HM1-16**：楕円曲線HMSの関手と準同値――必要な生成元・完全忠実性・本質的全射性の証明担当を分離。
17. **HM1-17**：Dehn twist・完全三角形と導来圏の対応を例で検証。
18. **HM1-18**：一般Calabi–Yauへの拡張の限界、Kontsevich予想の正確な射程、総合演習。

## 参考文献

- [P. Seidel, Fukaya Categories and Picard–Lefschetz Theory（EMS）](https://ems.press/books/zlam/2/contents)：$A_\infty$の代数、Floer理論、Fukaya圏、完全三角形。
- [MIT OCW, Topics in Geometry: Mirror Symmetry（2009）](https://ocw.mit.edu/courses/18-969-topics-in-geometry-mirror-symmetry-spring-2009/pages/lecture-notes/)：導来圏、楕円曲線のHMS、theta関数との教育的接続。
- [K. Hori et al., Mirror Symmetry（Clay）](https://www.claymath.org/resource/mirror-symmetry/)：圏論的ミラーの位置づけ。

## 実装・査読

18章は設計数であり証明を圧縮する上限ではない。Floer構成の解析基盤・圏論の不足が見つかれば正式な依存PLANを先に作り、実装講数も根拠付きで再審議する。各章A4/B3/C1以上・全詳細解答、新規章自身の区分C査読を守る。**別章の追跡監査は明示依頼時のみ**。設計改訂のみで系列をstartedとしない。
