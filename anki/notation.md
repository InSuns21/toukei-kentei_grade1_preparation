# Ankiの記号規約（差分）

Ankiカードは、次の共通正本を継承する。

- 一般記号：[`../references/notation-guide.md`](../references/notation-guide.md)
- 分布の台・母数化・確率質量関数・確率密度関数：[`../references/distribution-notation-guide.md`](../references/distribution-notation-guide.md)
- 用語・略語・日本語表記：[`../references/terminology-guide.md`](../references/terminology-guide.md)
- 全教材共通の執筆・KaTeX規約：[`../CONTENT_GUIDELINES.md`](../CONTENT_GUIDELINES.md)

このファイルには**Ankiだけで現在必要な追加記号・表示上の差分**だけを書く。共通記号や分布一覧を再掲しない。複数教材で使うようになった記号は `references/notation-guide.md` へ移す。

## 1. カードで使う追加記号

- $T_n\dot\sim D_n$：$T_n$ の大標本近似分布が $D_n$ であることを表す。厳密な分布一致や収束矢印とは区別する。
- $\widehat V$：推定量の推定分散共分散行列。漸近理論では文脈により漸近分散の推定値を表す。
- $\operatorname{Avar}(\widehat\theta)$：推定量自体の近似分散。$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,V)$ の $V$ を漸近分散定数と呼ぶ場合、本カード教材では $\operatorname{Avar}(\widehat\theta)=V/n$ と書く。

## 2. 品質管理・信頼性

- $CL,UCL,LCL$：管理図の中心線、上側管理限界、下側管理限界。
- $\overline{\overline X},\overline R,\overline S$：群平均の平均、群内範囲の平均、群内標本標準偏差の平均。$A_2,D_3,D_4,B_3,B_4$ は群サイズごとの管理図定数。
- $USL,LSL,T$：上側規格限界、下側規格限界、目標値。
- $C_p,C_{pk},C_{pm}$：工程能力指数。
- $R(t)=P(T>t)$、$h(t)$：寿命 $T$ の信頼度関数と故障率関数。
- $\operatorname{MTBF},\operatorname{MTTR}$：平均故障間隔と平均修復時間。$A$ はアベイラビリティ、$M(t)$ は保全度関数。
- $ARL$：管理図がシグナルを発するまでの平均標本数。$ARL_0$ は管理状態、$ARL_1$ は工程変化後の平均ラン長。
- $Z_t$：EWMA統計量、$C_t^+$：上方CUSUM統計量、$K,H$：原尺度のCUSUMの参照値と決定限界。標準偏差 $\sigma$ で割った標準化CUSUMでは $k=K/\sigma$、$h=H/\sigma$ を使う。

## 3. 実験計画

- $a,b,p$：処置数、ブロック数、ラテン方格の次数。
- $SS_{\mathrm{tr}},SS_{\mathrm{bl}},SS_E$：処置・ブロック・誤差平方和。
- $I$：2水準一部実施要因計画の単位列。A、B、Cなどは因子列、ABなどは交互作用列。
- $N$：不完備ブロック計画の処置×ブロック接続行列。$N_{ij}=1$ は処置 $i$ がブロック $j$ に現れることを表す。
- BIBDでは $v,b,r,k,\lambda$ を処置数、ブロック数、各処置の反復数、ブロックサイズ、任意の処置対が同じブロックに現れる回数とする。
- $U_i$：変量効果、$\tau^2$：変量効果分散、$\sigma^2$：実験単位誤差分散。

## 4. 区間推定

- 信頼係数は $1-\alpha$、区間推定量は $I(X)=[L(X),U(X)]$ とする。
- ピボット量は標本と未知母数の関数 $Q(X,\theta)$ で、その分布が $\theta$ に依存しないものとする。
- 結合不偏分散は $S_p^2=((n_1-1)S_1^2+(n_2-1)S_2^2)/(n_1+n_2-2)$、Welchの近似自由度は $\nu$ とする。

上側確率点 $z_\alpha,t_{\nu,\alpha},\chi^2_{\nu,\alpha},F_{\nu_1,\nu_2,\alpha}$ は共通記号ガイドに従う。

## 5. 確率過程・時系列

- $P=(p_{ij})$：離散時間マルコフ連鎖の1段階遷移行列。$P_{ij}^{(n)}$ は $n$ 段階遷移確率。
- $Q=(q_{ij})$：連続時間マルコフ連鎖の生成行列。$q_{ij}$（$i\ne j$）は状態 $i$ から $j$ への遷移率、$-q_{ii}=\nu_i$ は状態 $i$ から出る総率。
- $N=(I-Q)^{-1}$：吸収マルコフ連鎖で一時状態間の部分行列を $Q$ としたときの基本行列。計数過程 $N(t)$ と併用するときは引数の有無で区別する。
- $N(t)$：時刻 $t$ までの到着数を数える計数過程。
- $\lambda(t)$、$\Lambda(t)$：非一様ポアソン過程の強度と累積強度 $\Lambda(t)=\int_0^t\lambda(u)\,du$。
- $\rho=\lambda/\mu$：M/M/1待ち行列の利用率。自己相関 $\rho(h)$ とは引数の有無で区別する。
- $B_t$：時刻 $t$ の標準ブラウン運動。バックシフト演算子 $B$ とは時点添字の有無で区別する。
- $B$：$BX_t=X_{t-1}$ を満たすバックシフト演算子。
- $\varepsilon_t$：時系列モデルのホワイトノイズまたは状態空間モデルの観測雑音。文脈ごとに平均・共分散を指定する。
- $f(\omega)$：角周波数 $\omega$ におけるスペクトル密度。周期は $2\pi/\omega$ で換算する。
- $T,Z$：状態空間モデルの状態遷移行列、観測行列。
- $Q,H$：状態雑音、観測雑音の共分散行列。
- $a_{t\mid s},P_{t\mid s}$：時刻 $s$ までの観測による状態 $\boldsymbol\alpha_t$ の条件付き平均、条件付き共分散。

## 6. 多変量解析

- $\bar{\boldsymbol X},S$：標本平均ベクトル、不偏標本分散共分散行列。
- $R$：相関行列。
- $W_p(\Sigma,\nu)$：尺度行列 $\Sigma$、自由度 $\nu$ のWishart分布。
- $\lambda_j,\boldsymbol v_j$：対称行列の第 $j$ 固有値と対応する単位固有ベクトル。
- $\Lambda,\Psi$：因子分析の因子負荷量行列、独自因子の対角分散共分散行列。
- $S_W$：判別分析の群内分散共分散行列。
- $\Sigma_{XY}$：確率ベクトル $\boldsymbol X$ と $\boldsymbol Y$ の交差共分散行列。
- $d_M$：Mahalanobis距離。
- $T^2,S_p$：HotellingのT二乗統計量、2群のプールした不偏分散共分散行列。
- $c_j,y_{ij}$：第 $j$ 主成分の寄与率、第 $i$ 観測の第 $j$ 主成分得点。
- $\ell_{ij}$：第 $i$ 変数と第 $j$ 主成分の相関として定義する主成分負荷量。
- $h_i^2$：因子分析で第 $i$ 変数の共通性。
- $\boldsymbol w$：フィッシャーの線形判別方向。
- $\Delta(A,B)$：Ward法でクラスター $A,B$ を併合したときの群内平方和増加。

## 7. カード表示の差分

- カードでは、共通正本へのリンクだけで済ませず、そのカードの論点に必要な式と条件をカード内へ再掲する。
- 分布の台・母数範囲・確率質量関数・確率密度関数を一覧としてこのファイルへ複製しない。分布規約は `references/distribution-notation-guide.md`、公式・定理・定義は `formulae.md` を参照する。
- 1カード内でだけ使う補助記号は、そのカード内で定義する。局所記号をこのファイルへ無条件に追加しない。
