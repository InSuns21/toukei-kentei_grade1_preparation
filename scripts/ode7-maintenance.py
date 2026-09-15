from pathlib import Path
import sys


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one match, got {count}")
    return text.replace(old, new, 1)


def pre() -> None:
    p = Path("textbook/volumes/00_foundations/ODE7/index.md")
    s = p.read_text()
    count = s.count(r"\nu")
    if count:
        s = s.replace(r"\nu", "u")
    p.write_text(s)
    print(f"ODE7: replaced {count} accidental \\nu occurrences")

    p = Path("textbook/dream-theater.md")
    s = p.read_text()
    ode6 = "8. [ODE6 級数解・正則特異点](textbook/volumes/00_foundations/ODE6/index.md)\n"
    ode7 = "9. [ODE7 境界値問題・Sturm--Liouville](textbook/volumes/00_foundations/ODE7/index.md)\n"
    if ode7 not in s:
        s = replace_once(s, ode6, ode6 + ode7, "dream-theater ODE7 insertion")
        replacements = [
            ("9. [FA1 Fourier級数・直交展開]", "10. [FA1 Fourier級数・直交展開]", "FA1 renumber"),
            ("10. [FA2 Fourier変換・畳み込み・反転]", "11. [FA2 Fourier変換・畳み込み・反転]", "FA2 renumber"),
            ("11. [FA3 Plancherel・L2・特性関数]", "12. [FA3 Plancherel・L2・特性関数]", "FA3 renumber"),
            ("12. [PDE1 熱方程式・Fourier変換]", "13. [PDE1 熱方程式・Fourier変換]", "PDE1 renumber"),
            ("13. [PDE2 波動方程式・Laplace方程式]", "14. [PDE2 波動方程式・Laplace方程式]", "PDE2 renumber"),
            ("14. [PDE3 Sturm–Liouville・スペクトル展開]", "15. [PDE3 旧URL互換：Sturm–Liouville・スペクトル展開]", "PDE3 renumber"),
        ]
        for old, new, label in replacements:
            s = replace_once(s, old, new, label)
    p.write_text(s)

    p = Path("textbook/DREAM_THEATER_ODE_FOURIER_PDE_RESTRUCTURE_PLAN.md")
    s = p.read_text()
    old_row = "| ODE7 | 未着手 | PDE3 の Sturm--Liouville 部分を移送予定 | 未着手 | ODE2 + FOU | 未実施 |"
    in_progress = "| ODE7 | **実装中（PR #288）** | 二点境界値問題、正則Sturm--Liouville、Lagrange恒等式、分離型自己共役境界条件、実固有値、重み付き直交性、単純性、Dirichlet / Neumann / 混合スペクトル、Rayleigh商、共鳴可解条件まで実装。一般完全性は証明境界を明示 | A4 / B3 / C1。全問に詳細解答あり | ODE2。旧PDE3を互換ハブ化し、Sturm--Liouville正本をODE7へ集約。一般固有関数完全性は後続FOU / スペクトル論へ送り逆輸入しない | CI確認中 |"
    if old_row in s:
        s = replace_once(s, old_row, in_progress, "ODE7 progress row")
    p.write_text(s)


def post() -> None:
    p = Path("textbook/DREAM_THEATER_ODE_FOURIER_PDE_RESTRUCTURE_PLAN.md")
    s = p.read_text()
    old = "| ODE7 | **実装中（PR #288）** | 二点境界値問題、正則Sturm--Liouville、Lagrange恒等式、分離型自己共役境界条件、実固有値、重み付き直交性、単純性、Dirichlet / Neumann / 混合スペクトル、Rayleigh商、共鳴可解条件まで実装。一般完全性は証明境界を明示 | A4 / B3 / C1。全問に詳細解答あり | ODE2。旧PDE3を互換ハブ化し、Sturm--Liouville正本をODE7へ集約。一般固有関数完全性は後続FOU / スペクトル論へ送り逆輸入しない | CI確認中 |"
    new = "| ODE7 | **実装・検証完了（PR #288）** | 二点境界値問題、正則Sturm--Liouville、Lagrange恒等式、分離型自己共役境界条件、実固有値、重み付き直交性、単純性、Dirichlet / Neumann / 混合スペクトル、Rayleigh商、共鳴可解条件まで実装。一般完全性は証明境界を明示 | A4 / B3 / C1。全問に詳細解答あり | ODE2。旧PDE3を互換ハブ化し、Sturm--Liouville正本をODE7へ集約。一般固有関数完全性は後続FOU / スペクトル論へ送り逆輸入しない | textbook / Pages / exercises / concepts / standard math core / terminology を検証。proof / formalism pedagogy audit も実行 |"
    s = replace_once(s, old, new, "final ODE7 row")

    old_tail = "次の実装単位は **ODE7「境界値問題・Sturm--Liouville」**。PDE3 に残る Sturm--Liouville 部分を再利用候補として監査し、境界条件、自己共役形、固有値・固有関数、直交性、Fourier 系列への接続を ODE 側の正本として閉じる。後続 PDE の理論を現在章へ逆輸入しない。"
    new_tail = """## 11.8 ODE7 で今回閉じた品質論点と検証記録

- 二点境界値問題では、同じ二階線形ODEでも端点条件により解が0個・1個・無数個になり得ることを最小例で直接確認し、初期値問題との違いを先に可視化した。
- 正則Sturm--Liouville問題では $p\\in C^1$, $q,w\\in C$, $p>0$, $w>0$ の役割を局所的に説明し、分離型境界条件を端点データの一次元部分空間として扱った。Lagrange恒等式と境界形式の消滅は省略せず証明した。
- 固有値の実数性、異なる固有値の固有関数の重み付き直交性、分離型条件での固有値の単純性を、Lagrange恒等式とODE2の初期値一意性だけで閉じた。
- $-y''=\\lambda y$ について Dirichlet / Neumann / 混合境界条件を $\\lambda<0$, $\\lambda=0$, $\\lambda>0$ に分け、正弦・余弦・半整数周波数とNeumannの定数モードを手計算で導いた。
- Dirichlet問題のRayleigh商を部分積分から導き、係数の下限・上限とCauchy--Schwarzから粗い固有値下界まで計算した。共鳴する非斉次問題では、外力が固有関数に直交しなければ解けない必要条件をLagrange恒等式から導いた。
- 一般正則Sturm--Liouville問題の固有値列の存在・離散性・完全性は、直交性だけから飛躍させず意図的黒箱として証明境界を明示した。後続Fourier解析・コンパクト自己共役作用素論へ送り、未実装のFOUを現在章のprerequisiteへ逆輸入していない。
- 旧 F0-00PDE3 は内容正本から互換ハブへ退役させ、Sturm--Liouville のconcept ownershipをODE7へ一本化した。
- 演習は A4 / B3 / C1 を実装し、境界値問題の解個数、Robin境界形式、Dirichlet / Neumann / 混合スペクトル、直交性、単純性、Rayleigh商、共鳴可解条件を実際に使わせ、全問に詳細解答を付した。
- `npm run validate`、`npm run validate:pages`、`npm run validate:dream-theater-exercise-counts`、changed-only concept / knowledge / terminology、standard math core 検証を通し、`npm run audit:proof-pedagogy` と `npm run audit:formalism-pedagogy` も実行した。

次の実装単位は **FOU1「Fourier級数・直交性・係数計算」**。旧 `F0_00FA1_Fourier級数_直交展開` を主要再利用元として、初学者向けの係数計算・偶奇性・半区間展開・Bessel不等式を前段に整理し、測度論・Hilbert空間を入口の必須前提にしない。"""
    s = replace_once(s, old_tail, new_tail, "ODE7 next-work tail")
    p.write_text(s)


if __name__ == "__main__":
    if len(sys.argv) != 2 or sys.argv[1] not in {"pre", "post"}:
        raise SystemExit("usage: ode7-maintenance.py pre|post")
    pre() if sys.argv[1] == "pre" else post()
