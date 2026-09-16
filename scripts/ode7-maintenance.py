from pathlib import Path
import sys

ODE7 = Path("textbook/volumes/00_foundations/ODE7/index.md")
ODE7_KNOWLEDGE = Path("textbook/volumes/00_foundations/ODE7/knowledge.yaml")
OLD_PDE3 = Path("textbook/volumes/00_foundations/F0_00PDE3_Sturm_Liouville_スペクトル展開/index.md")
PLAN = Path("textbook/DREAM_THEATER_ODE_FOURIER_PDE_RESTRUCTURE_PLAN.md")


def patch_ode7() -> None:
    s = ODE7.read_text()

    # ODE1/ODE2 both own a legacy alias "初期値問題".  In ODE7, state the
    # prescribed data explicitly rather than creating a third ambiguous owner.
    s = s.replace("初期値問題", "一点初期データ問題")
    s = s.replace("二階常微分方程式", "二階 ODE")
    s = s.replace("常微分方程式", "ODE")

    # Formal concepts are introduced by their formal panels, not by headings.
    s = s.replace("## 2. 正則 Sturm--Liouville 問題", "## 2. 正則性の仮定を固定する")
    s = s.replace("## 4. 重み付き内積と固有関数", "## 4. 固有値問題を比べる積分と非零解")
    s = s.replace("## 5. Lagrange 恒等式：直交性を生む一行の出発点", "## 5. 直交性を生む積分恒等式")
    s = s.replace("## 13. Rayleigh 商：固有値をエネルギー比として読む", "## 13. 固有値をエネルギー比として読む")

    # Avoid concept names before their formal declarations.
    s = s.replace("固有値の実数性や直交性を取り出すときに働きます。", "固有値が実数になることや直交性を取り出すときに働きます。")
    s = s.replace("後でこの問題の固有関数が $\\sin(n\\pi x/L)$ になることを、", "後でこの問題から $\\sin(n\\pi x/L)$ が現れることを、")

    # Keep headings reader-facing while terminology ownership lives in knowledge.yaml.
    s = s.replace("## 6. なぜ分離型境界条件で境界形式が消えるのか", "## 6. 分離型条件で境界形式が消える理由")
    s = s.replace("## 14. 共鳴すると、外力にも直交条件が現れる", "## 14. 共鳴すると外力に直交性が課される")
    s = s.replace("### ODE7-A02 Robin 条件で境界形式を消す", "### ODE7-A02 Robin 型で境界形式を消す")
    s = s.replace("### ODE7-A04 正弦固有関数の直交性を積分で確認する", "### ODE7-A04 正弦モードの直交性を積分で確認する")

    s = s.replace(
        "固定した固有値 $\\lambda$ に属する任意の二つの固有関数 $u,v$ は比例する。従って各固有値の固有空間は一次元である。",
        "固定した固有値 $\\lambda$ に属する任意の二つの固有関数 $u,v$ は比例する。これが本章でいう固有値の単純性である。",
    )

    # Completeness is deliberately deferred.  Describe the stopping point without
    # importing later operator-theory terminology into the ODE prerequisite graph.
    s = s.replace("**完全性**：必要な関数を固有関数列で近似・展開できる。", "**完全性**：展開対象を固有関数列で近似・展開できる。")
    s = s.replace("適切な関数空間では固有関数が完全系をなし、", "適切な関数クラスでは固有関数が完全系をなし、")
    s = s.replace("Rayleigh 商、共鳴の必要条件までは本文で閉じました。一般問題の固有値列の存在・離散性・完全性は、後続の Fourier 解析と関数解析側のコンパクト自己共役作用素論で厳密化します。", "Rayleigh 商、共鳴時の可解性制約までは本文で閉じました。一般問題の固有値列の存在・離散性・完全性は、後続の Fourier 解析と関数解析で厳密化します。")

    s = s.replace("したがって共鳴点では逆作用素に相当する一意な解写像を作れません。", "したがって共鳴点では右辺から解を一意に決めることができません。")

    ODE7.write_text(s)


def write_knowledge() -> None:
    ODE7_KNOWLEDGE.write_text("""chapter: ODE7
scope: dream-theater
coverage: complete
prerequisites:
  - ODE2
forward_references:
  - pde.separation-of-variables
  - pde.heat-equation

# 一般正則Sturm--Liouville問題の完全性・離散固有値列の一般証明は、
# Fourier解析再編および後続の関数解析へ送る。
# 本章ではODE2の一意性と1次元のLagrange恒等式だけで閉じる結果を正本化する。

concepts:
  - id: ode.ode7-boundary-condition-language
    name: 境界条件
    kind: term
    aliases:
      - 境界条件
      - 端点の斉次線形境界条件
      - Dirichlet 条件
      - Neumann 条件
      - Robin 条件
      - 混合境界条件
      - 混合条件
      - 三つの標準境界条件
      - 分離型条件
    introduction: inline
    requires:
      - ode.ode2-linear-higher-order

  - id: ode.ode7-two-point-bvp
    name: 二点境界値問題
    kind: definition
    aliases: [二点境界値問題, two-point boundary value problem]
    introduction: formal
    requires:
      - ode.ode2-linear-higher-order

  - id: ode.ode7-regular-sturm-liouville
    name: 正則Sturm--Liouville問題
    kind: definition
    aliases: [Sturm--Liouville問題, 正則Sturm--Liouville問題, Sturm--Liouville problem]
    introduction_aliases: [正則 Sturm--Liouville 問題]
    introduction: formal
    requires:
      - ode.ode7-two-point-bvp

  - id: ode.ode7-separated-boundary-condition
    name: 分離型自己共役境界条件
    kind: definition
    aliases: [分離型境界条件, 自己共役境界条件, separated boundary conditions]
    introduction: formal
    requires:
      - ode.ode7-regular-sturm-liouville

  - id: ode.ode7-weighted-inner-product
    name: 重み付き内積
    kind: definition
    aliases: [重み付き内積, weighted inner product]
    introduction_aliases: [重み付き内積の記号]
    introduction: formal
    requires:
      - ode.ode7-regular-sturm-liouville

  - id: ode.ode7-eigenpair
    name: Sturm--Liouville固有値・固有関数
    kind: definition
    aliases: [Sturm--Liouville固有値, Sturm--Liouville固有関数, 固有関数]
    introduction: formal
    requires:
      - ode.ode7-regular-sturm-liouville

  - id: ode.ode7-eigenfunction-family-language
    name: 固有関数族
    kind: term
    aliases:
      - 異なる固有値の固有関数
      - 属する固有関数
      - 属する任意の二つの固有関数
      - 異なる固有関数
    introduction: inline
    requires:
      - ode.ode7-eigenpair

  - id: ode.ode7-lagrange-identity
    name: Lagrange恒等式
    kind: theorem
    aliases: [Lagrange恒等式, Lagrange identity, Green型恒等式]
    introduction_aliases: [Lagrange 恒等式]
    introduction: formal
    requires:
      - ode.ode7-regular-sturm-liouville

  - id: ode.ode7-boundary-form-vanishing
    name: 分離型境界条件による境界形式の消滅
    kind: theorem
    aliases: [境界形式の消滅, boundary form vanishing]
    introduction: formal
    requires:
      - ode.ode7-separated-boundary-condition
      - ode.ode7-lagrange-identity

  - id: ode.ode7-real-eigenvalues
    name: 固有値の実数性
    kind: theorem
    aliases: [Sturm--Liouville固有値の実数性]
    introduction: formal
    requires:
      - ode.ode7-eigenpair
      - ode.ode7-weighted-inner-product
      - ode.ode7-boundary-form-vanishing

  - id: ode.ode7-orthogonality
    name: 異なる固有値に属する固有関数の直交性
    kind: theorem
    aliases: [固有関数の直交性, Sturm--Liouville直交性]
    introduction: formal
    requires:
      - ode.ode7-real-eigenvalues

  - id: ode.ode7-simple-eigenvalue
    name: 分離型問題の固有値の単純性
    kind: theorem
    aliases: [固有値の単純性, simple eigenvalue]
    introduction: formal
    requires:
      - ode.ode7-separated-boundary-condition
      - ode.ode2-linear-ivp-wellposedness

  - id: ode.ode7-dirichlet-neumann-spectrum
    name: Dirichlet・Neumann・混合境界条件の標準固有値列
    kind: method
    aliases: [Dirichlet固有値, Neumann固有値, 混合境界条件の固有値]
    introduction_aliases: [三つの標準境界条件の固有値列]
    introduction: inline
    requires:
      - ode.ode7-eigenpair

  - id: ode.ode7-rayleigh-quotient
    name: Dirichlet問題のRayleigh商
    kind: theorem
    aliases: [Rayleigh quotient]
    introduction_aliases: [Dirichlet 問題の Rayleigh 商]
    introduction: formal
    requires:
      - ode.ode7-boundary-form-vanishing
      - ode.ode7-eigenpair

  - id: ode.ode7-resonance-compatibility
    name: 共鳴時の必要可解条件
    kind: theorem
    aliases: [共鳴時の可解条件, resonance compatibility condition, 必要条件]
    introduction: formal
    requires:
      - ode.ode7-orthogonality

  - id: ode.ode7-eigenfunction-expansion
    name: 固有関数展開の意味
    kind: method
    aliases: [固有関数展開, eigenfunction expansion]
    introduction: inline
    requires:
      - ode.ode7-orthogonality
      - ode.ode7-dirichlet-neumann-spectrum
""")


def patch_old_hub() -> None:
    s = OLD_PDE3.read_text()
    s = s.replace("標準常微分方程式コアへ移しました。", "標準 ODE コアへ移しました。")
    OLD_PDE3.write_text(s)


def set_progress(status: str) -> None:
    s = PLAN.read_text()
    lines = s.splitlines()
    if status == "in-progress":
        row = "| ODE7 | **実装中（PR #288）** | 二点境界値問題、正則Sturm--Liouville、Lagrange恒等式、分離型自己共役境界条件、実固有値、重み付き直交性、単純性、Dirichlet / Neumann / 混合固有値列、Rayleigh商、共鳴可解条件まで実装。一般完全性は証明境界を明示 | A4 / B3 / C1。全問に詳細解答あり | ODE2。旧PDE3を互換ハブ化し、Sturm--Liouville正本をODE7へ集約。一般固有関数完全性は後続FOU / 関数解析へ送り逆輸入しない | CI確認中 |"
    else:
        row = "| ODE7 | **実装・検証完了（PR #288）** | 二点境界値問題、正則Sturm--Liouville、Lagrange恒等式、分離型自己共役境界条件、実固有値、重み付き直交性、単純性、Dirichlet / Neumann / 混合固有値列、Rayleigh商、共鳴可解条件まで実装。一般完全性は証明境界を明示 | A4 / B3 / C1。全問に詳細解答あり | ODE2。旧PDE3を互換ハブ化し、Sturm--Liouville正本をODE7へ集約。一般固有関数完全性は後続FOU / 関数解析へ送り逆輸入しない | textbook / Pages / exercises / concepts / standard math core / terminology を検証。proof / formalism pedagogy audit も実行 |"
    for i, line in enumerate(lines):
        if line.startswith("| ODE7 |"):
            lines[i] = row
            break
    else:
        raise SystemExit("ODE7 progress row not found")
    s = "\n".join(lines) + "\n"

    if status == "complete":
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


def pre() -> None:
    patch_ode7()
    write_knowledge()
    patch_old_hub()
    set_progress("in-progress")


def post() -> None:
    set_progress("complete")


if __name__ == "__main__":
    if len(sys.argv) != 2 or sys.argv[1] not in {"pre", "post"}:
        raise SystemExit("usage: ode7-maintenance.py pre|post")
    pre() if sys.argv[1] == "pre" else post()
