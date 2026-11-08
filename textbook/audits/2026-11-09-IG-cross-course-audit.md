# IG1--IG14 情報幾何・系列横断最終監査

- 実施日: 2026-11-09（JST）
- 対象: `textbook/volumes/dream_thater/幾何系/IG/IG1`--`IG14`、14章の `chapter.yaml` / `knowledge.yaml`、IG 系列 manifest、情報幾何 PLAN、科目別公開目次
- 目的: 完了章をつなぐ数学の仮定・記号・向き、prerequisite、安定参照、演習と解答、公開導線を検証し、PLAN の終端状態を判定する
- 実施者: 同一担当者による横断点検。第三者独立査読ではない
- 今回の章本文改稿: なし。既存14章の章別査読を再実施したと主張しない

## 1. 全章の実ファイル・metadata 棚卸し

| 範囲 | 結果 |
|---|---|
| IG manifest | IG1--IG14 が順に `completed`。計画した全14講に欠落・重複なし |
| `chapter.yaml` と `knowledge.yaml` | 各章の ID と直接 prerequisites が一致。章H1と `chapter.yaml.title` が一致 |
| formal statement | 全102件。うち定義43件。実本文の marker 件数、metadata の定義・主要結果件数、knowledge concept 件数が章ごとに一致 |
| proof block | 59件。`proof-start` / `proof-end` の各章での対応が一致 |
| 演習 | 全129題（IG1--3は各8題、IG4--8は各9題、IG9--14は各10題）。全129題に詳細解答が存在し、問題ID・Level別の実数・`chapter.yaml` の宣言が一致。すべて A4/B3/C1 の下限以上 |
| 参照 | 全14章の Markdown リンクについて相対パスと stable formal anchor を照合し、対象不在・anchor欠落を検出しなかった |
| 公開 | 科目別目次 `textbook/dream-theater-toc/050_幾何系/140_information-geometry.md` は IG1--IG14 を掲載。Pages の索引・相対リンク・参照と一致 |

## 2. 横断した主要数学と代表的な再導出

各章のすべての既存証明・詳細解答を改めて一問ずつ解いた監査ではなく、隣接章間で同じ対象を異なる表示で扱う箇所、および終端の主要結果に至る接続を重点的に検算した。

1. **IG1--IG3：正則性、score、Fisher と KL**。正の有限単体で接方向は $\sum_i u_i=0$。方向 score は $u_i/p_i$ なので $g^F_p(u,u)=\sum_i u_i^2/p_i$。Bernoulli 族なら $u=(s,-s)$ として $g^F_p(u,u)=s^2/[p(1-p)]$。$\log(1+z)$ の定数・一次・二次項を展開すると $D_{\mathrm{KL}}(p\Vert p+tu)=t^2g^F_p(u,u)/2+o(t^2)$ となる。二階微分の交換は IG3 の連続モデルで IG1 の一階正則性より強い仮定に分けている。
2. **IG4--IG8：凸双対と e/m の規約**。指数型族の $\ell_{ij}=-\psi_{ij}$ は標本に依らず、$E[\ell_k]=0$ より $\Gamma^{(+1)}_{ij,k}=E[\ell_{ij}\ell_k]=0$。Fisher $g_{ij}=\psi_{ij}$ の Hessian と Legendre 座標 $\eta=\nabla\psi$ から $\nabla^m$ も平坦になる。Bernoulli の成功確率 $p$ では $q=p(1-p)$ とし、$\Gamma^{(\alpha)p}_{pp}=(\alpha+1)(2p-1)/(2q)$。したがって m（$\alpha=-1$）は $p$ 座標で零、e（$\alpha=+1$）は logit 座標で零、LC（$\alpha=0$）は両者の平均という IG6--IG8 の結果と一致する。
3. **IG9--IG11：KL の向き、Bregman と射影**。$D_\psi(\theta:\theta')=\psi(\theta)-\psi(\theta')-\nabla\psi(\theta')\cdot(\theta-\theta')=D_{\mathrm{KL}}(p_{\theta'}\Vert p_\theta)$。IG10 の e-射影は変数 $p$ を第1引数に置く $D(p\Vert r)$、m-射影はモデル $p_\theta$ を第2引数に置く $D(\widehat q\Vert p_\theta)$ の最小化であり、IG11 の最大エントロピー／最尤法と向きが一致する。三値例では $r=(1/2,1/3,1/6)$、制約 $p_1+p_2=1/2$ から $p^*=(3/10,1/5,1/2)$ を再計算し、正性と制約を確認した。IG10 の Pythagoras 補正項の符号は $-(\theta_P-\theta_Q)\cdot(\eta_R-\eta_Q)$ であり、三点恒等式と一致する。
4. **IG12：自然勾配と局所 KL**。正定値 $G$ で一次損失 $a^Tv$ を $v^TGv/2\le\varepsilon$ のもとで最小化すると Cauchy--Schwarz の等号条件から $v_*=-\sqrt{2\varepsilon/(a^TG^{-1}a)}G^{-1}a$（$a\ne0$）。mirror descent の内点条件 $\nabla\psi(x^+)=\nabla\psi(x)-\tau a$ を $\tau=0$ で微分すれば $\dot x=-H^{-1}a$ となり、$H=G$ の場合に局所自然勾配へ接続する。有限歩幅と厳密な KL 制約を同一視していない。
5. **IG13：接続別の曲率**。正規位置尺度族の $g=\operatorname{diag}(1,2)/\sigma^2$ は LC 曲率 $K=-1/2$。自然母数領域 $\{(\theta_1,\theta_2):\theta_2<0\}$ は開凸で e/m は平坦。一方、独立な三変量単位分散正規族の平均を $F(u,v)=(u,v,u^2+v^2)$ に制限すると、原点で $G=I$ かつ $R^u{}_{vuv}=4$ なので $K=4$。前者の e/m 平坦性と後者の部分モデルの曲率非零を混同しない。
6. **IG14：粗視化と Čencov の有限次元射程**。Markov kernel で Fisher 二次形式は Cauchy--Schwarz により減少し、復元可能な写像 $R K=I$ では両方向の単調性から等号。均等な状態分割では $a_{kn}=k a_n$ となり、共通倍数 $nm$ を使うと $a_n/n=c>0$ は状態数によらない。有理確率点の分割と連続性から $h_p(u,v)=c\sum_i u_iv_i/p_i$。IG14-C01 の粗視化では $g_p(u,u)-g_{Kp}(Ku,Ku)=2(a-b)^2$ を直接再計算し、等号条件 $a=b$ と一致した。境界・連続状態・量子状態へ無条件に一般化しない。

## 3. 読者導線・参照・公開の確認

- 14章とも主役の定義から対応する条件確認例へ進み、全主要 result と proof block に安定 anchor / marker がある。学習順は統計モデル → 計量 → divergence → 凸双対 → 接続 → 射影 → 推定・最適化 → 曲率・特徴付けで、IG 直接 prerequisites に逆順の循環を検出しない。
- 個別結果の参照は、IG 章内・章間で実在する stable anchor へ向かう。外部前提は GEO の接続・曲率、確率・統計、凸解析を必要範囲で参照し、全体を暗黙の prerequisite として要求していない。
- 機械的な proof/formalism pedagogy の候補として、IG1--IG6 等に「例見出し0」が報告されるが、実本文には定義確認・具体計算・反例が見出しと独立した通常段落で置かれている。これは見出し文字列に依存する監査候補であり、この事実だけから重大な欠陥とは判定しない。
- 今回の変更は読者用章本文・数式・図版を変更せず、科目別目次も変更しない。新規の図版レンダリング監査は発生しない。

## 4. 実行した検証と限界

- `npm run validate:dream-theater-work`：成功（IG は IG14 まで completed、次章なし）。
- `npm run validate`：成功（KaTeX strict、形式、証明・解答・正式参照など）。
- `npm run validate:pages`：成功（索引、prerequisite、Pages組み立て・リンク、数式・画像、オフライン資産）。
- 14章を対象にした metadata/marker/exercise/anchor 全件照合：指摘0件。
- `npm run audit:proof-pedagogy`、`npm run audit:formalism-pedagogy`、`npm run audit:math-layout`：候補を確認。IG の `math-layout` 候補は抽出されず、見出し形態に関する候補は本文の具体例と照合した。
- `npm run validate:dream-theater-concepts`：全系列 strict 検証は失敗。IG 以外の既存教材（例：F0-00E1、LA5、F0-00D0）に宣言・metadata の不整合があり、**全体 green ではない**。本監査でこれらの他系列を修正せず、IG 系列に発見した不整合と取り違えない。変更後の scope-specific CI は別途 PR で確認する。

今回の監査は数学的な全件独立再査読ではなく、既に completed の章を横断して依存・表記・主要公式の接続と代表計算を検証する最終点検である。未実施の独立第三者査読、未読の外部文献全文、全129解答の新規独立再計算について完了を主張しない。監査した範囲に PLAN 完了を妨げる IG 固有の重大未解決項目は検出しなかったため、IG PLAN を `plan_done/` に移す判定とする。
