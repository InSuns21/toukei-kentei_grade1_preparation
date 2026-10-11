# DREAM THEATER 整数論・楕円曲線・モジュラー形式 依存ルート

分冊: 2026-10-11  
状態: planned（横断ルート台帳のみ）

- [整数論NT1〜10](DREAM_THEATER_ELEMENTARY_NUMBER_THEORY_PLAN.md)
- [Diophantine近似NDA1〜8](DREAM_THEATER_DIOPHANTINE_APPROXIMATION_PLAN.md)
- [解析的整数論ANT1〜8](DREAM_THEATER_ANALYTIC_NUMBER_THEORY_PLAN.md)
- [楕円曲線EC1〜8](DREAM_THEATER_ELLIPTIC_CURVES_PLAN.md)
- [モジュラー形式MF1〜8](DREAM_THEATER_MODULAR_FORMS_PLAN.md)

## 直接依存DAG

~~~text
RNG/GRP/FLD → NT1〜8 ─┬→ NDA1〜8 → TRN・EOM017
                         ├→ NT9〜10（＋CMP）→ EOM004
                         ├→ ANT1〜8（＋CA12）
                         └→ EC1〜8（＋CA9） ──────────┐
CA8/9/12＋NT2〜4 → MF1〜8 ─────────────────────────┴→ modularityの接続
~~~

NT1〜10は明確に続く一つのPLAN、NDA・ANT・EC・MFは各自の中心問いを持つ独立PLANとする。楕円関数CA8/9の既存証明を繰り返さない。未実装PLANを定理の実在stable anchorと混同しない。
