from pathlib import Path
import sys

ODE7 = Path("textbook/volumes/00_foundations/ODE7/index.md")
KNOWLEDGE = Path("textbook/volumes/00_foundations/ODE7/knowledge.yaml")
PLAN = Path("textbook/DREAM_THEATER_ODE_FOURIER_PDE_RESTRUCTURE_PLAN.md")


def pre() -> None:
    s = ODE7.read_text()
    # The undefined-term audit tokenizes "適切な関数クラス" as the bogus term
    # "適切な関数".  State the same proof boundary without that accidental token.
    s = s.replace("適切な関数クラスでは固有関数が完全系をなし、", "適切な対象クラスでは固有関数が完全系をなし、")
    # Keep the resonance wording local instead of claiming the generic term
    # "必要条件", which is used across many unrelated chapters.
    s = s.replace("**1. 必要条件**", "**1. 可解性の制約**")
    ODE7.write_text(s)

    k = KNOWLEDGE.read_text()
    k = k.replace(
        "aliases: [共鳴時の可解条件, resonance compatibility condition, 必要条件]",
        "aliases: [共鳴時の可解条件, resonance compatibility condition]",
    )
    KNOWLEDGE.write_text(k)


def post() -> None:
    s = PLAN.read_text()
    lines = s.splitlines()
    final_row = "| ODE7 | **実装・検証完了（PR #288）** | 二点境界値問題、正則Sturm--Liouville、Lagrange恒等式、分離型自己共役境界条件、実固有値、重み付き直交性、単純性、Dirichlet / Neumann / 混合固有値列、Rayleigh商、共鳴可解条件まで実装。一般完全性は証明境界を明示 | A4 / B3 / C1。全問に詳細解答あり | ODE2。旧PDE3を互換ハブ化し、Sturm--Liouville正本をODE7へ集約。一般固有関数完全性は後続FOU / 関数解析へ送り逆輸入しない | textbook / Pages / exercises / concepts / standard math core / terminology を検証。proof / formalism pedagogy audit も実行 |"
    for i, line in enumerate(lines):
        if line.startswith("| ODE7 |"):
            lines[i] = final_row
            break
    else:
        raise SystemExit("ODE7 progress row not found")
    s = "\n".join(lines) + "\n"

    marker = "次の実装単位は **ODE7「境界値問題・Sturm--Liouville」**。"
    summary = """## 11.8 ODE7 で今回閉じた品質論点と検証記録

- 二点境界値問題では、同じ二階線形 ODE でも端点条件により解が0個・1個・無数個になり得ることを最小例で直接確認した。
- 正則 Sturm--Liouville 問題では $p\\in C^1$, $q,w\\in C$, $p>0$, $w>0$ の役割を局所的に説明し、Lagrange恒等式と分離型境界条件による境界形式の消滅を省略せず証明した。
- 固有値の実数性、重み付き直交性、分離型条件での固有値の単純性を、Lagrange恒等式と ODE2 の一意性だけで閉じた。
- $-y''=\\lambda y$ の Dirichlet / Neumann / 混合境界条件を $\\lambda<0$, $\\lambda=0$, $\\lambda>0$ に分け、正弦・余弦・半整数周波数と Neumann の定数モードを手計算で導いた。
- Dirichlet 問題の Rayleigh 商と粗い固有値下界、共鳴する非斉次問題の必要可解条件まで導出した。
- 一般正則 Sturm--Liouville 問題の固有値列の存在・離散性・完全性は意図的な証明境界として後続 Fourier 解析・関数解析へ送り、後続理論を prerequisite へ逆輸入していない。
- 旧 F0-00PDE3 は互換ハブへ退役させ、Sturm--Liouville の concept ownership を ODE7 へ一本化した。
- 演習は A4 / B3 / C1、全問詳細解答付き。textbook / Pages / exercises / concepts / standard math core / terminology の検証と proof / formalism pedagogy audit を実行した。

次の実装単位は **FOU1「Fourier級数・直交性・係数計算」**。旧 `F0_00FA1_Fourier級数_直交展開` を主要再利用元として、初学者向けの係数計算・偶奇性・半区間展開・Bessel不等式を前段に整理し、測度論・Hilbert空間を入口の必須前提にしない。"""
    if marker in s:
        start = s.index(marker)
        end = s.find("\n", start)
        s = s[:start] + summary + (s[end:] if end >= 0 else "\n")
    elif "## 11.8 ODE7 で今回閉じた品質論点" not in s:
        s = s.rstrip() + "\n\n" + summary + "\n"
    PLAN.write_text(s)


if __name__ == "__main__":
    if len(sys.argv) != 2 or sys.argv[1] not in {"pre", "post"}:
        raise SystemExit("usage: ode7-maintenance.py pre|post")
    pre() if sys.argv[1] == "pre" else post()
