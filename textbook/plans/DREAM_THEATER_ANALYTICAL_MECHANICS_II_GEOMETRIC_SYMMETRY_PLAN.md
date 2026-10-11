# DREAM THEATER 解析力学 II・シンプレクティック幾何／幾何学的力学 分冊ルート

作成日: 2026-10-07  
分割設計更新: 2026-10-11  
状態: planned（ルート台帳のみ。元のAMECH9〜16案は実装しない）

旧計画でAMECH9〜16に同居していた「幾何学の一般理論」と「対称性による力学の簡約」を分冊した。旧参照先を失効させないため、このパスは**索引・経路**として保持する。**個別科目の唯一の執筆正本**は次の二ファイル。

1. [シンプレクティック幾何学 I（SYM1〜8）](DREAM_THEATER_SYMPLECTIC_GEOMETRY_I_PLAN.md)：非退化閉2形式、余接束、Darboux、Lagrange部分多様体、Moser法、適合概複素構造。
2. [幾何学的力学 I（GMECH1〜8）](DREAM_THEATER_GEOMETRIC_MECHANICS_I_PLAN.md)：Lie群作用、運動量写像、Noether、正則値レベル、簡約、Lie–Poisson、剛体。

**科目間依存（必須講を選んで接続）**：AMECH1〜8 / GEO / LIE → SYM → GMECH → INT → CELE。GMECH全講をINT1の機械的必須とせず、定理ごとの直接依存を決める。シンプレクティック幾何の高次理論（擬正則曲線/Floer）は別の独立後続候補とし、今回のSYM Iで証明済み扱いしない。

既存のAMECH1〜8・定理アンカー・URLは変更しない。SYM/GMECHはまだ計画であり、公開索引・work-stateは変更しない。

---

## 元PLANの共通設計・文献・依存監査資料（各科目のシラバスは分冊先が正本）

## 1. 市販教科書との照合

主参照:

- Jerrold E. Marsden and Tudor S. Ratiu, *Introduction to Mechanics and Symmetry*, Springer  
  https://link.springer.com/book/10.1007/978-0-387-21792-5
- V. I. Arnold, *Mathematical Methods of Classical Mechanics*, Springer  
  https://link.springer.com/book/10.1007/978-1-4757-2063-1
- 伊藤秀一『常微分方程式と解析力学』共立出版  
  https://www.books.or.jp/book-details/9784320015630
- 植田一石『数物系のためのシンプレクティック幾何学入門』サイエンス社  
  https://saiensu.co.jp/search/?isbn=978-4-7819-9936-4&y=2018
- 深谷賢治『シンプレクティック幾何学』岩波書店

Marsden--Ratiu の symmetry / momentum map / reduction を本科目の主線とする。一方、擬正則曲線・Floer 理論等の大域シンプレクティック幾何は本科目の必須範囲にしない。
