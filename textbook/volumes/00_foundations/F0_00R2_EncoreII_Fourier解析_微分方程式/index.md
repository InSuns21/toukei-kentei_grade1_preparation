# F0-00R2 Encore II：ODE・Fourier解析・PDE

このページは、DREAM THEATER の **標準常微分方程式（ODE）・標準Fourier解析（FOU）・標準偏微分方程式（PDE）** の入口です。

再編前の `F0_00H1`、`F0_00FA1`～`F0_00FA3`、`F0_00PDE1`～`F0_00PDE3` は URL 互換・移送元確認のためリポジトリ内に保持しますが、**現行教材としては隔離し、読者向け目次・通常導線には表示しません**。理論の正本は以下の新系列へ一本化します。

---

## 1. 推奨通読ルート

```text
標準実解析・線形代数
        │
        ├───────────────┐
        ↓               ↓
   ODE1 → … → ODE7   FOU1 → … → FOU5
        │               │
        └──────┬────────┘
               ↓
          PDE1 → … → PDE7
               │
               ↓
 Encore III：distribution / Sobolev / 弱解
```

Fourier解析は ODE 全章の修了を前提にしません。PDE 系列で ODE と Fourier解析が合流します。

---

## 2. 標準常微分方程式コア

1. [ODE1 一階常微分方程式・初期値問題](../ODE1/index.md)
2. [ODE2 高階線形微分方程式](../ODE2/index.md)
3. [ODE3 線形連立系・行列指数・安定性](../ODE3/index.md)
4. [ODE4 非線形系・位相平面・線形化](../ODE4/index.md)
5. [ODE5 Laplace変換と初期値問題](../ODE5/index.md)
6. [ODE6 級数解・正則特異点](../ODE6/index.md)
7. [ODE7 境界値問題・Sturm--Liouville](../ODE7/index.md)

ODE は PDE の準備だけではなく、一階解法・存在一意性・高階線形・連立系・非線形系・Laplace変換・級数解・境界値問題までを独立した学部標準コアとして閉じます。

Sturm--Liouville 理論の正本は ODE7 です。PDE 側では重複証明せず、固有関数法の入力として使います。

---

## 3. 標準Fourier解析コア

1. [FOU1 Fourier級数・直交性・係数計算](../FOU1/index.md)
2. [FOU2 Fourier級数の収束・Fejér・Parseval](../FOU2/index.md)
3. [FOU3 Fourier変換・畳み込み・反転](../FOU3/index.md)
4. [FOU4 Plancherel・$L^2$ Fourier解析](../FOU4/index.md)
5. [FOU5 確率・離散Fourier変換・サンプリング](../FOU5/index.md)

FOU1–FOU2 では周期関数を離散周波数へ分解し、FOU3 で実数全体上の連続周波数へ進みます。

```text
周期関数                 実数全体
Fourier級数              Fourier変換
離散周波数 n             連続周波数 ξ
      │                       │
      └──── Parseval ─────────┤
                              ↓
                         Plancherel
```

FOU3 は $L^1$ Fourier 変換、Riemann--Lebesgue、畳み込み、Gaussian、反転までを扱います。FOU4 では $L^2$ 全体への拡張を行い、完備内積空間上の正規化 Fourier 変換をユニタリ作用素として構成します。FOU5 では確率測度の Fourier 変換・独立和と畳み込みを既存の確率論正本へ接続し、さらに DFT・離散反転・Parseval・巡回畳み込み・FFT・エイリアシングまで有限次元側の理論を閉じます。

---

## 4. 標準偏微分方程式コア

PDE 系列は次の順で実装します。

1. [PDE1 PDEの基本・一次方程式・特性曲線](../PDE1/index.md)
2. [PDE2 二階線形PDEの分類](../PDE2/index.md)
3. PDE3 熱方程式
4. PDE4 波動方程式
5. PDE5 Laplace・Poisson方程式と調和関数
6. PDE6 Greenの恒等式・基本解・Green関数
7. PDE7 Fourier法・固有関数法の統合

PDE1 では一次方程式を入口に、[曲線に沿う連鎖律](../PDE1/index.md#prop-pde1-curve-composition)と特性曲線法を順に導入し、定係数・非斉次・変数係数の輸送方程式を解きます。さらに Burgers 方程式で、特性写像の一対一性が失われると空間勾配が発散し、古典解が破綻し得る機構まで確認します。弱解・entropy solution は Encore III 以降へ送り、PDE1 の証明には逆輸入しません。

PDE2 では[二階線形PDEの型](../PDE2/index.md#def-pde2-type)を主部と判別式から定義し、主二次形式・特性方向・座標変換不変性・三つの標準形まで導出します。Laplace / heat / wave を三類型の代表として比較し、Laplace 方程式の Cauchy データが不安定になり得る具体列から、型と自然なデータ配置の関係まで確認します。

熱・波動・Laplace 方程式を単なる三つの計算例として並べず、parabolic / hyperbolic / elliptic の代表として位置付けます。最大値原理・エネルギー法など、一意性を支える論証まで標準コアに含めます。

---

## 5. 三系列が合流する仕組み

Fourier変換では

$$
\frac d{dx}\longleftrightarrow i\xi,
\qquad
-\frac{d^2}{dx^2}\longleftrightarrow \xi^2.
$$

したがって PDE を空間変数について Fourier 変換すると、周波数 $\xi$ ごとの ODE が残ります。例えば熱方程式

$$
\partial_tu=\kappa\partial_{xx}u
$$

は

$$
\partial_t\widehat u=-\kappa\xi^2\widehat u
$$

へ変わります。

有界区間では Fourier 級数や Sturm--Liouville の離散固有モードが同じ役割を担います。

```text
全空間                   有界区間・領域
Fourier変換              Sturm--Liouville
連続周波数               離散固有モード
      └────────┬─────────┘
               ↓
          モードごとの ODE
```

---

## 6. 確率論への横接続

確率変数 $X$ の特性関数

$$
\varphi_X(t)=E[e^{itX}]
$$

は確率測度の Fourier 変換です。独立和と畳み込み、CLT、Gaussian は Fourier 解析と自然につながります。この横断整理は [FOU5](../FOU5/index.md) でまとめます。

---

## 7. Encore II の停止線

Encore II の標準 PDE コアは古典解までで一度閉じます。

- Schwartz超関数
- 弱微分
- Sobolev空間
- 弱解
- Lax--Milgram
- 一般楕円型方程式の変分理論

は [Encore III](../F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md) の正本を使います。後続理論を現在章の証明へ逆輸入しません。

---

## 8. 旧教材の扱い

再編前ページは削除しません。古い外部リンクを即座に壊さないこと、移送元を追跡できることが理由です。ただし運用は明確に分けます。

- ファイル自体はリポジトリに残す。
- `textbook/dream-theater-index.json` には登録しない。
- `textbook/dream-theater.md` の現行目次には掲載しない。
- 現行章から旧章を prerequisite / concept owner / proof dependency にしない。
- 内容を移送した後は、新旧両方を並行して育てない。
- 旧URLを残す場合も、表示するのは移行案内と新正本へのリンクだけとし、旧本文そのものは通常表示しない。
- 読者が通常導線を辿ったときは新 ODE / FOU / PDE 系列だけを見る。

つまり旧教材は **削除ではなく隔離** です。