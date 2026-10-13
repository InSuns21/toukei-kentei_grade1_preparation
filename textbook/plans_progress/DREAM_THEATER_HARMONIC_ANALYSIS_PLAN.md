# DREAM THEATER 調和解析 計画

作成日: 2026-10-07
改訂日: 2026-10-14（標準教科書との比較・証明依存と前提の再設計、HA5まで実装）
状態: in_progress（HA1--HA5完了、HA6--HA11未着手。系列manifestを正本として進捗管理）

## 0. 中心問いと科目の位置付け

Fourier 解析で関数を周波数へ分解できるようになった。では、点ごとの平均から元の関数を取り戻し、特異核・非局所作用素の有界性を証明し、周波数局在を PDE の正則性や曲率をもつ曲面上の Fourier 変換へ利用するには何が必要か。

本計画は Fourier 解析（FOU）、測度論（MT）、関数解析（FA）の後続に置く**現代調和解析の独立科目**である。旧「実解析強化PLAN」の HA 補講から分離した方針を維持する。

「1セメスター」は内容のまとまりを表し、15講・15週・一章一週を要求しない。講義構成は **HA1--HA11（全11講、欠番・枝番なし）** を仮IDとして固定し、個々の講義では中心問いと核心証明のまとまりを優先する。GMT PLAN から参照される restriction の入口は **HA11** とし、関連する未着手PLANの参照も連動して更新する。HA 系列の全章を終えないと PDE に進めない、という一括依存を作らない。

## 0.1 標準書との比較・採否（2026-10-14）

公開された出版社の目次・内容説明を比較対象とし、書籍の本文・演習を転載しない。

| 標準書 | 確認した標準射程 | 本計画への反映 |
|---|---|---|
| Loukas Grafakos, *Classical Fourier Analysis*, 3rd ed., Springer | 補間、最大関数、Fourier変換、特異積分、Littlewood--Paley、乗数、重み | HA1--HA8に加え **HA9 Fourier乗数**を独立。重みの完全理論は次期科目 |
| Elias M. Stein, *Singular Integrals and Differentiability Properties of Functions*, Princeton | 微分定理、特異積分、ポテンシャル論 | HA1・HA3--HA7の証明骨格を校正 |
| Elias M. Stein / Rami Shakarchi, *Fourier Analysis: An Introduction*, Princeton | Fourier級数・変換からの段階的導入 | FOU正本と重複せず、平均・核・周波数の具体例から始める |
| Elias M. Stein, *Harmonic Analysis: Real-Variable Methods, Orthogonality, and Oscillatory Integrals*, Princeton | Hardy/BMO、重み、振動積分、Fourier積分作用素 | **HA6 BMO基礎**、**HA10 振動積分**を補強。Hardy空間等の完全理論は停止線外 |
| Christopher D. Sogge, *Fourier Integrals in Classical Analysis*, 2nd ed., Cambridge | 定常位相、restriction関連評価、Fourier積分作用素、Kakeya | HA10からHA11へ証明可能な入口を作り、microlocal/FIOの完全理論は別科目 |

確認先:
- https://link.springer.com/book/10.1007/978-1-4939-1194-3
- https://www.jstor.org/stable/j.ctt1bpmb07
- https://books.google.com/books/about/Fourier_Analysis.html?id=I6CJngEACAAJ
- https://www.jstor.org/stable/j.ctt1bpmb3s
- https://www.cambridge.org/core/books/fourier-integrals-in-classical-analysis/B6564D013B4F3C1897BCC052096EE462

**主な欠落の是正**: 旧8講案では (i) Mikhlin型乗数定理が不在、(ii) L^\infty の endpoint を説明する BMO が不在、(iii) 最終講の旧HA8 で定常位相法・Stein--Tomas・wave packet を同居させ証明の前提が足りなかった。補強章はこの三点を埋めるもので、教科書の目次を網羅するための水増しではない。

## 1. canonical owner と前提監査

| 既習結果・対象 | 正本とする既存系列 | HA側の扱い |
|---|---|---|
| Fourier級数・Fourier変換・反転・Plancherel | FOU1--FOU4 | 定義を重複証明せず、正規化を明示して使う |
| 確率測度・離散Fourier・sampling | FOU5 | 任意の横断例。必須ではない |
| Lebesgue積分・Fubini/Tonelli・Lpと双対 | MT、特に MT7 | 有界性と極限操作の前提を照合 |
| 1次元微分定理・BV | MT4 | HA1は高次元化に必要な被覆幾何を証明 |
| Hausdorff測度・次元 | MT8 | HA11で幾何との接続に用い、集合論自体は再実装しない |
| Banach/Hilbert・有界作用素 | FA / F0-02C1 | 補間・乗数・閉作用素論の必要範囲を使用 |
| 複素解析の三線定理に必要な最大値原理等 | CA系列の該当章を着手時に特定 | HA2のRiesz--Thorin証明で依存するなら direct prerequisite にする |
| Sobolev・弱PDE・圧力表示 | GPDE / PDE / NS | HAは作用素評価、方程式への適用はPDE側 |
| Frostman・rectifiability・Besicovitch/Kakeya | GMT PLAN | 幾何学的測度論はGMTが正本。HA11は解析側 |

**着手前に要確認**: FOU の Schwartz関数・急減少関数、緩増加分布、Fourier変換の微分公式・乗法公式の正本範囲を実章で点検する。未導入なら HA3/HA9 に必要最小の分布論の橋を置くが、別の full distribution theory を無条件の prerequisite にしない。FOU4 の正規化（$2\pi$の有無）を各公式で揃える。

## 2. 講義群（番号は設計用）

### HA1 高次元最大作用素・Lebesgue微分

中心問い: 平均は関数の点値をどの意味で回復するか。

- Euclid球・立方体の平均、centered/uncentered Hardy--Littlewood maximal operator
- Vitali型被覆補題の有限選択・重なりの体積比較
- weak $(1,1)$ 推定と $L^\infty$ 制御。$p>1$ の強型推定へは HA2 の補間を使う
- $L^1_{\mathrm{loc}}(\mathbb R^d)$ のLebesgue微分定理（近似恒等族との比較）
- 反例: maximal operator が一般に $L^1\to L^1$ 有界ではない
- 核心証明: covering → weak estimate → 稠密近似 → a.e.微分。MT4の1次元結果をそのまま高次元に流用しない

### HA2 弱 $L^p$ と補間

中心問い: 端点推定から中間の $L^p$ 有界性をどう得るか。

- 分布関数と layer-cake、Lorentzの弱空間 $L^{p,\infty}$ の意味
- sublinear operator、weak-type / strong-type と指数計算
- Marcinkiewicz補間の採用形と proof（truncate $f$ の大小部分→分布関数積分）
- Riesz--Thorin補間の三線定理の適用条件・複素解析側の前提・単純関数からの近似
- HA1の強型 $(p,p)$、後続CZ作用素への再利用
- endpoint は定理の仮定を満たすときのみ主張し、弱型から強型 $(1,1)$ を捏造しない

### HA3 Hilbert変換と主値

- 主値と通常積分の相違。切断 $H_\varepsilon$ と Fourier乗数 $-i\,\mathrm{sgn}(\xi)$（変換規約を明示）
- 偶奇性・消去・$L^2$ 有界性、滑らかな関数での極限計算
- $L^p$ での主値収束を扱うときは HA4--HA5 由来の最大切断評価等を前提として明記する
- Poisson核・共役Poisson核と境界値
- $f(x)=1/(1+x^2)$ 等で直接計算し、主値と絶対収束を混同しない

### HA4 Calderón--Zygmund分解

- dyadic cubes・必要な局所有限性・最大立方体
- $f=g+b$、good/bad parts、bad cubesの質量・消去・大きさ
- weak $(1,1)$ 推定で「遠方の核差」がなぜ可積分になるか
- 核心証明: cubeの選択→$L^1/L^\infty$ 評価→bad partの零平均→遠方制御
- 主役は**分解の構成**。一般作用素定理の仮定と混在させない

### HA5 特異積分とRiesz変換

- サイズ・滑らかさ・消去条件、truncation、$L^2$ 有界性を仮定する標準CZ作用素の定理
- 切断作用素の弱 $(1,1)$、$1<p<\infty$ 強 $(p,p)$、双対・補間・主値の関係
- Riesz変換の核とFourier乗数、Poisson方程式の二階微分評価、圧力の非局所表示
- 核条件だけで $L^2$ 有界性が自動で出る、と誤記しない。畳込み核の特別な場合と一般CZ核を分ける
- kernel smoothness / cancellation が破れた反例を置く

### HA6 BMO・endpointの見取り図

- 平均振動で定める BMO、定数による商の意味、$L^\infty\subsetneq \mathrm{BMO}$
- John--Nirenberg不等式の立方体版（停止時刻・分解からの指数減衰）を主要証明とする
- 適切なCZ作用素の $L^\infty\to\mathrm{BMO}$（必要な正規化・局所化）を具体的な核で検証
- Hardy空間 $H^1$ との双対性は重要な**次期講義への接続**として説明し、ここで無証明の完成定理にしない

### HA7 Rieszポテンシャル・Hardy--Littlewood--Sobolev

- $0<\alpha<d$、$I_\alpha f=c_{d,\alpha}|x|^{\alpha-d}*f$
- scaling と $1/q=1/p-\alpha/d$。強型 $1<p<d/\alpha$ と弱端点 $p=1$ を分ける
- Hedberg型点wise評価：近傍/遠方積分の分割→最大関数→最適半径→HLS
- Sobolev不等式との関連、Newton potentialの次数と次元（$d=2$の対数核を別扱い）
- PDE / GPDE / VC の既存結果との重複を回避し、「作用素と指数推定」を正本化

### HA8 Littlewood--Paley理論と周波数局在

- Schwartz関数上の滑らかな dyadic partition、低周波を含む inhomogeneous 分解と homogeneous 分解の違い
- Littlewood--Paley projections、ほぼ直交性、$L^2$でのsquare function
- $1<p<\infty$ への拡張では Rademacher符号・Khintchine / CZのどの結果を使うか証明責務を明記
- Bernstein不等式と支えの半径、$L^p$ Sobolev regularityへの接続
- homogeneous な周波数分解で零周波数と多項式の曖昧さを黙殺しない

### HA9 Mikhlin--Hörmander型Fourier乗数

- $T_m f=\mathcal F^{-1}(m\widehat f)$ の定義と $L^2$ 有界性
- 十分な微分階数・$|\partial^\beta m(\xi)|\lesssim |\xi|^{-|\beta|}$（$\xi\ne0$）を仮定するMikhlin型定理の一つの版を**定理文・証明・演習まで閉じる**
- dyadic localization → 核評価 → cancellation / CZまたはsquare functionによる $L^p$評価
- Riesz乗数・滑らかなcutoff・Bessel potentialを検算
- sharp multiplier theory、Hörmanderの最適微分条件、pseudo-differential calculus はこの章の完成条件にしない

### HA10 振動積分・定常位相法

- van der Corput補題（1変数の非退化相）と integration by parts による非停留点評価
- 非退化臨界点の stationary phase の採用版と Hessian/符号・次元・$\lambda$指数の確認
- 球面測度 $\sigma_{S^{d-1}}$ の Fourier変換の減衰 $|\widehat\sigma(\xi)|\lesssim (1+|\xi|)^{-(d-1)/2}$
- 曲率ゼロの超曲面で減衰が変わる例。曲率がrestrictionで効く理由
- 定常位相の完全な高階漸近展開は停止線外。HA11に必要な採用版の核心論証を優先する

### HA11 Fourier restriction・extension・Kakeyaへの解析側入口

- 滑らかな曲面上の測度、restriction/extensionを区別。一般 $L^2(\mathbb R^d)$ の点wise制限が無定義である動機
- 球面に対する scaling・Knapp型必要条件、双対性、$TT^*$ の演算と核
- 球面の Stein--Tomas 型 $L^2(S^{d-1})\to L^{2(d+1)/(d-1)}(\mathbb R^d)$ extension（$d\ge2$）を標準到達目標とし、HA10 の曲面測度減衰・適切な補間の**どこを使うか**を全式で追う。完全証明に必要な追加補題は本章へ含めるか章を分割する
- 球面以外へ無条件に一般化しない（曲率・測度・指数を明記）
- wave-packetの局所化と cap/tube幾何、Knapp例からの直観。wave-packet分解で定理として使う主張は誤差・尺度を明記する
- GMT7--GMT8のBesicovitch/Kakeya幾何、EOM074の研究動向へ接続。研究成果の真偽・新規性はEOM側に置く

## 3. 証明依存・実装可能な順序

~~~text
FOU / MT7 / FA ──────────────┐
     │                       │
    HA1 → HA2 → HA3 → HA4 → HA5 ──→ HA6
                    │         │
                    └─────────┴──────→ HA7
                                    ↓
                         HA8（周波数局在）
                          │          │
                         HA9       HA10（CA/多変数解析も照合）
                          │          │
                          └─────┬────┘
                                ↓
                              HA11
                                ↓
                        GMT7/8・EOM074
~~~

図は読順の概略であり全矢印を強制 prerequisite にしない。HA3/HA4/HA5とHA7の直接依存は採用証明で決める。BMOはHA11に必須ではない。GAの多様体上スペクトル・熱核も HA全章を prerequisite にしない。

## 4. 射程の境界と将来の調和解析 II

本系列で**完全理論まで扱わない**項目:

- Hardy空間 $H^p$ 全般、$H^1$--BMO双対性、tent/Carleson空間
- Weighted $A_p$ 全理論、$T(1)$/$T(b)$、一般非畳込みCZの最高度な版
- Besov / Triebel--Lizorkin全理論、endpoint乗数定理
- Carleson--Hunt、time--frequency、multilinear estimates
- decoupling、Kakeya/restrictionの最先端の証明全体
- Fourier積分・擬微分作用素、microlocal analysisの体系

HA6にBMOの基礎を置くことと、BMOの完全理論を終えることは別である。HA11には証明できる採用結果を明示し、一般restriction予想を「定理」と書かない。将来の調和解析 II は必要が確定した段階で別PLAN化する。

## 5. 例・演習・査読設計

理由付き例外がなければ**変更・新設した各章に A4/B3/C1 を最低数として置き、全問に詳細解答**。章の学修目標を再現するのに不足する場合は追加する。

核となる問題:
- maximalの弱 $(1,1)$ の被覆と、強 $(1,1)$ の失敗例
- weak/strongの区別、Marcinkiewiczの指数とRiesz--Thorinの解析性
- Hilbert変換の符号・Fourier正規化・主値
- CZ good/bad の零平均、kernel差による遠方評価
- BMOの非有界例、John--Nirenbergの指数減衰
- HLSの近傍/遠方分割・指数範囲・端点
- LPのhomogeneous/inhomogeneousの違い・Bernsteinのスケール
- Mikhlin乗数の導関数の階数と$L^p$対応
- 定常位相での Hessian と曲面の曲率、Knapp必要条件・$TT^*$の中間式

名付き定理は対象関数空間、次元、指数、切断、収束モード、定数依存、正規化を自己完結に記す。「定理より」から最終式へ飛ばず、必要な補題を含める。実装時に各 chapter.yaml・knowledge.yaml と canonical stable anchor を実際に照合する。

## 6. 完了ゲート

1. HA1の高次元被覆と微分定理、HA2の採用補間を証明できる。
2. HA3の主値と $L^2$、HA4--HA5の分解・特異積分の証明責務が閉じる。
3. HA6のBMOとendpointの必要性を例とJohn--Nirenbergの主要証明で説明できる。
4. HA7のHLSの指数・端点、HA8--HA9の周波数局在と乗数評価を再現できる。
5. HA10の定常位相・球面測度減衰がHA11のrestriction定理の証明に実際に接続する。
6. HA11の証明可能なrestriction到達点、Knapp条件、wave-packet/tubeの射程と未解決問題の境界を区別できる。
7. PDE / NS / GPDE、GMT、EOMの正本に無断の重複や逆依存を作らない。
8. 計画の実装開始時にmanifest・ID・anchorを照合し、全教材・演習・詳細解答・変更区分に応じた査読・CI・公開導線が完成して初めてPLAN状態を移す。