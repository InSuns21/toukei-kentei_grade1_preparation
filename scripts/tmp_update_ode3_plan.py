from pathlib import Path

p = Path("textbook/DREAM_THEATER_ODE_FOURIER_PDE_RESTRUCTURE_PLAN.md")
s = p.read_text()

old_row = "| ODE3 | 未着手 | H1 §8–11 を主要再利用予定 | 未着手 | ODE2 + LA4 等 | 未実施 |"
new_row = "| ODE3 | **実装・検証完了（PR #280）** | 線形連立系、行列指数の級数構成と微分、基本行列、Jordan block、複素固有対、定数変化公式、2次元位相図、Lyapunov・漸近・指数安定性と境界 Jordan 条件まで実装 | A4 / B3 / C1。全問に詳細解答あり | ODE2 + LA4。H1 §8–11 を移送・補強し、旧H1を ODE1–ODE3 への互換ハブ化。FA2 / PDE1 / PDE2 の旧ODE concept依存も現行IDへ移管 | textbook / Pages / exercises / concepts / standard math core / terminology の6系統 green。proof / formalism pedagogy audit も green |"
if old_row not in s:
    raise SystemExit("ODE3 status row not found")
s = s.replace(old_row, new_row, 1)

old_next = "次の実装単位は **ODE3 線形連立系・行列指数・安定性**。H1 §8–11 を主要再利用元とし、基本行列・行列指数・Jordan 構造・非斉次系・2次元位相図・固有値実部と安定性までを学部標準コアとして閉じる。"
new_next = r"""## 11.5 ODE3 で今回閉じた品質論点と検証記録

- 行列指数は記号として置くだけでなく、成分ごとの絶対・一様収束、項別微分、時間加法則、逆行列まで冪級数から閉じた。
- $x'=Ax$ の一意性は $e^{-(t-t_0)A}x(t)$ の微分が0になることから直接示し、基本行列・主基本行列へ接続した。
- Jordan block では冪零部分が多項式因子を生む機構を明示し、$\operatorname{Re}\lambda=0$ の境界で非自明 Jordan block が Lyapunov 安定性を壊すことを反例と一般証明の両方で示した。
- 複素固有対から実解へ戻す計算、非斉次系の定数変化公式、2次元 node / saddle / spiral / center の読み方を本文から再構成できる粒度にした。
- 旧 F0-00H1 は内容正本から互換ハブへ退役させ、後続 Fourier / PDE 章の旧 ODE concept 依存も ODE1 / ODE2 の現行IDへ付け替えた。
- 演習は A4 / B3 / C1 を実装し、対角系、複素固有値、Jordan block、定数変化、saddle、境界安定性、パラメータ付き完全分類を実際に使わせ、全問に詳細解答を付した。
- **Validate textbook / Validate Pages assembly / Validate DREAM THEATER exercises / Validate DREAM THEATER concepts / Validate DREAM THEATER standard math core / Validate terminology** の6系統を green 確認し、さらに `npm run audit:proof-pedagogy` と `npm run audit:formalism-pedagogy` も green を確認した。

次の実装単位は **ODE4 非線形系・位相平面・線形化**。平衡点、Jacobian による線形化、2次元 phase plane、保存量を持つ系、線形化で判定不能になる境界例までを標準コアとして閉じる。"""
if old_next not in s:
    raise SystemExit("next-unit text not found")
s = s.replace(old_next, new_next, 1)
p.write_text(s)
