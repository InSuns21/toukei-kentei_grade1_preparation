"""Regenerate the analytic RMSE figure for U3-27 using standard Python."""
from __future__ import annotations
import math
from pathlib import Path


def render() -> str:
    ms = (4, 16, 64, 256)
    xs = (125, 260, 395, 530)
    reference = 1 / math.sqrt(8)
    def coord(m: int, midpoint: bool) -> float:
        rmse = 1 / (2 * math.sqrt(m)) if midpoint else 1 / math.sqrt(2 * m)
        return round(100 + 48 * math.log2(reference / rmse), 3)
    y_left = [coord(m, False) for m in ms]
    y_mid = [coord(m, True) for m in ms]
    def points(ys: list[float]) -> str:
        return " ".join(f"{x},{y}" for x, y in zip(xs, ys))
    grid = "\n    ".join(f'<path d="M{x} 70 V290"/>' for x in xs)
    labels = "\n    ".join(f'<text x="{x}" y="313" text-anchor="middle">{m}</text>'
                           for x, m in zip(xs, ms))
    circles = "\n".join(
        f'  <circle cx="{x}" cy="{y}" r="5.5" fill="#205a85" '
        'stroke="#ffffff" stroke-width="1.5"/>'
        for x, y in zip(xs, y_left)
    )
    squares = "\n".join(
        f'  <rect x="{x-5}" y="{y-5}" width="10" height="10" fill="#b45727" '
        'stroke="#ffffff" stroke-width="1.5"/>'
        for x, y in zip(xs, y_mid)
    )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="700" height="355" viewBox="0 0 700 355" data-layout-lint="strict" role="img" aria-labelledby="title desc">
  <title id="title">Itô左端和と時刻中点和の理論RMSE</title>
  <desc id="desc">T=1、分割数mを4、16、64、256と4倍ずつ増やすと、左端和のItô積分への理論RMSEは0.354、0.177、0.088、0.044となり、実線と丸印で減少する。時刻中点和のStratonovich積分へのRMSEは0.250、0.125、0.0625、0.03125となり、破線と四角印で同じく半減する。縦軸は対数目盛である。</desc>
  <rect width="700" height="355" rx="8" fill="#fcfdff"/>
  <g stroke="#dce2e8" stroke-width="1">
    <path d="M92 100 H574 M92 148 H574 M92 196 H574 M92 244 H574"/>
    {grid}
  </g>
  <g stroke="#414b56" stroke-width="2" fill="none">
    <path d="M92 65 V290 H580"/>
  </g>
  <g fill="#263541" font-family="sans-serif" font-size="15">
    <text x="90" y="38">RMSE（対数目盛）</text>
    <text x="50" y="105" text-anchor="end">0.354</text>
    <text x="50" y="153" text-anchor="end">0.177</text>
    <text x="50" y="201" text-anchor="end">0.088</text>
    <text x="50" y="249" text-anchor="end">0.044</text>
    {labels}
    <text x="607" y="313">m</text>
  </g>
  <g data-series-group="integral-error" data-series-label="Ito-left" fill="none" stroke="#205a85" stroke-width="3">
    <polyline points="{points(y_left)}"/>
  </g>
  <g data-series-group="integral-error" data-series-label="time-midpoint" fill="none" stroke="#b45727" stroke-width="3" stroke-dasharray="10 7">
    <polyline points="{points(y_mid)}"/>
  </g>
  <g>
{circles}
{squares}
  </g>
  <g font-family="sans-serif" font-size="14" fill="#263541">
    <path d="M97 339 H132" stroke="#205a85" stroke-width="3"/>
    <circle cx="115" cy="339" r="5" fill="#205a85"/>
    <text x="143" y="344">左端／Itô</text>
    <path d="M332 339 H367" stroke="#b45727" stroke-width="3" stroke-dasharray="9 6"/>
    <rect x="346" y="334" width="10" height="10" fill="#b45727"/>
    <text x="378" y="344">時刻中点／Stratonovich</text>
  </g>
</svg>
'''


if __name__ == "__main__":
    target = Path(__file__).with_name("ito-rmse.svg")
    target.write_text(render(), encoding="utf-8")
    print(f"regenerated {target}")
