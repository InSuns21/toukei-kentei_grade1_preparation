# DREAM THEATER：実解析・調和解析強化計画

作成日: 2026-09-23

## 0. 目的

この文書は、DREAM THEATER の実解析系列を、大学初年度解析の網羅性だけでなく、後続の PDE・Fourier 解析・関数解析へ十分につながる形へ補強するための設計台帳である。

参照する外部書籍は次とする。

- 杉浦光夫『解析入門1』東京大学出版会
  - https://www.utp.or.jp/book/b302042.html
- 杉浦光夫『解析入門2』東京大学出版会
  - https://www.utp.or.jp/book/b302043.html

ただし、これらの目次をそのまま DREAM THEATER の章構成へ移植しない。

現在の DREAM THEATER では、杉浦『解析入門』に含まれる内容の多くがすでに別の canonical series に分離されている。

- 複素解析：CA 系列
- 多様体：GEO 系列
- ベクトル解析：VC 系列
- Fourier 解析：FOU 系列
- 測度・Lebesgue 積分・絶対連続・BV：MT 系列
- 関数解析：FA 系列

したがって本計画の目的は、**既存正本と重複しない実解析上の不足を補い、PDE で必要になる高次元の実解析・調和解析へ自然に接続すること**である。

## 1. 現在の実解析系列

現行の主要系列は次である。

~~~text
RA1   数列・級数
RA1A  数値級数の収束論
RA2   極限・連続・一様連続
RA3   微分法の理論
RA4   Riemann/Darboux 積分・微積分学の基本定理
RA4A  広義積分・収束判定
RA5   関数列・関数級数・一様収束
RA6A  逆関数定理・陰関数定理
RA7   多重 Riemann 積分・変数変換
RA8   関数族のコンパクト性・近似
~~~

この系列だけでも、杉浦『解析入門1』の「実数と連続・微分・積分・級数」と、『解析入門2』の「陰関数・変数変換」の大部分はすでに正本化されている。

## 2. 杉浦『解析入門』からの取捨選択

### 2.1 現行系列で十分に cover されているため、新章を作らない項目

以下は既存章を canonical とし、新規 RA 章を作らない。

| 杉浦本の論点 | DREAM THEATER の正本 |
|---|---|
| 実数列・級数・上極限・下極限 | RA1 / RA1A |
| 極限・連続・コンパクト性 | RA2 / TOP 系列 |
| 一変数微分・Taylor・極値 | RA3 |
| Riemann 積分・広義積分 | RA4 / RA4A |
| 一様収束・項別微積分 | RA5 |
| 逆関数・陰関数・条件付き極値 | RA6A |
| 多重積分・変数変換 | RA7 |
| 関数族のコンパクト性・近似 | RA8 |
| Fourier 変換 | FOU3 / FOU4 |
| ベクトル場・線積分・Green / Stokes / Gauss | VC1--VC5 |
| Newton ポテンシャル | VC8 / PDE10 |
| 多様体・向き | GEO 系列 |
| 1 の分割 | GEO4 |
| 複素解析 | CA 系列 |

「同じ教科書に載っているから」という理由だけで、これらを RA 側へ再収録しない。

### 2.2 補強価値はあるが、新しい大系列にはしない項目

#### A. パラメータを含む積分

杉浦『解析入門1』では独立した節として扱われるが、現行 RA5 では「積分・微分と極限の交換」が中心であり、パラメータ積分を一つの道具として体系化する余地がある。

候補：

- F(t)=∫_a^b f(x,t) dx の連続性
- 一様収束を使う積分との極限交換
- 積分記号下の微分
- 上端・下端もパラメータに依存する場合の Leibniz 則
- 広義積分での一様収束条件
- Gamma / Beta 関数を代表例として使う

実装方針：

- RA5 の増補で閉じるなら新章を作らない。
- 章が過密になる場合のみ、仮 ID RA5A「パラメータ積分・積分記号下の微分」として独立させる。
- Lebesgue の優収束定理を必要とする一般形は MT 系列を canonical とし、RA5A へ逆輸入しない。

#### B. 多変数広義積分

PDE や Fourier 解析では R^d 上の Gaussian、基本解、放射対称積分を頻繁に使うため、有限領域上の RA7 だけでは読者が「無限領域へどう移るか」を補完しにくい。

候補：

- exhaustion による非負関数の広義積分
- 絶対収束する多変数広義積分
- 極座標・球座標と無限領域
- Gaussian 積分
- |x|^{-alpha} 型積分の原点・無限遠での可積分性判定

ただし、Fubini / Tonelli / 一般の L1 積分論は MT 系列を正本とする。

実装方針：

- RA7 の補遺または演習強化を第一候補とする。
- 独立章を作る場合も「Lebesgue 積分の代用品」にしない。

#### C. 無限積

杉浦『解析入門1』には無限積が含まれるが、現行 DREAM THEATER の主要後続理論に対する依存度は高くない。

扱うなら、

- 無限積の収束
- 対数級数との関係
- Euler 型積や特殊関数への入口

程度に限定する。

**優先度は低い。** CA や特殊関数系列で具体的必要性が生じるまで、本編新章にはしない。

### 2.3 原則として RA へ追加しない項目

#### 有界変動関数

MT4 がすでに

- bounded variation
- 全変動
- 絶対連続関数
- Lebesgue--Stieltjes 測度
- Cantor 関数

を正本化している。

したがって杉浦『解析入門1』の有界変動関数を理由に RA 側へ別概念として再導入しない。

Riemann--Stieltjes 積分そのものが必要になった場合だけ、MT4 への橋として短い補遺を設ける。

#### 曲線の長さ

VC2 / GEO 系列を canonical とする。

#### 初等関数の再構成

指数・対数・三角関数を実数の完備性から再構成すること自体には教育的価値があるが、DREAM THEATER の後続依存に対する効果は小さい。

必要なら演習・補遺に置き、独立章にはしない。

## 3. PDE のために本当に不足している実解析

杉浦『解析入門』の学部解析コアを確認すると、現行 RA 系列はかなり広く cover している。

一方、Encore III 後続 PDE で必要になる次の道具は、学部解析教科書の標準範囲を越える。

- 高次元 Hardy--Littlewood 最大作用素
- covering lemma
- Riesz potential
- Hardy--Littlewood--Sobolev 不等式
- Riesz transform
- singular integral
- Calderón--Zygmund 型 Lp 評価

したがって、PDE 強化のためには RA1--RA8 を巨大化するより、**実解析から調和解析へ進む独立系列**を設ける。

## 4. 新設候補：HA 系列

ID は仮。実装前に既存 ID と knowledge DAG を確認する。

### HA1：高次元最大作用素・被覆補題

目的：

1次元 MT4 の Hardy--Littlewood 最大関数を、R^d へ拡張する。

候補論点：

- ball / cube average
- centered / uncentered maximal operator
- Vitali 型 covering lemma
- weak (1,1) estimate
- strong (p,p) estimate への入口
- Lebesgue differentiation theorem in R^d

既存 MT4 の1次元定理を再証明するのではなく、高次元化に必要な幾何部分を主役にする。

### HA2：Riesz potential・Hardy--Littlewood--Sobolev 不等式

候補論点：

- Riesz potential I_alpha
- scaling
- weak type endpoint の位置付け
- Hardy--Littlewood--Sobolev inequality
- Sobolev inequality との関係
- Newton potential / Poisson equation への接続

VC8、PDE10、GPDE5 と重複しないよう、

- potential の PDE 的意味：VC8 / PDE10
- Sobolev embedding：GPDE5
- potential operator の写像性：HA2

と責務を分ける。

### HA3：特異積分・Riesz transform・Calderón--Zygmund

候補論点：

- principal value
- singular kernel
- cancellation
- Hilbert transform を1次元モデルとして導入
- Riesz transform
- L2 boundedness
- Calderón--Zygmund decomposition
- weak (1,1) / strong (p,p) estimate の標準形
- Poisson 方程式の二階微分評価
- Navier--Stokes の圧力表示への接続

Track E Navier--Stokes で Riesz transform の有界性を暗黙使用しないための canonical series とする。

### HA4：発展候補

次は必要性が明確になってから追加する。

- Littlewood--Paley decomposition
- fractional Sobolev spaces
- Besov spaces
- BMO
- commutator estimate

Navier--Stokes の critical spaces や非線形 dispersive PDE を本格的に扱う段階までは必須化しない。

## 5. 推奨実装順

優先順位は次とする。

~~~text
既存 RA1--RA8 の監査
  ↓
RA5 parameter integral の補強
  ↓
RA7 多変数広義積分の補強
  ↓
HA1 高次元 maximal operator
  ↓
HA2 Riesz potential / HLS
  ↓
HA3 singular integral / Riesz transform / Calderón--Zygmund
~~~

無限積、Riemann--Stieltjes 積分、特殊関数の体系化は、後続章から需要が生じた場合だけ追加する。

## 6. Encore III 後続 PDE との接続

DREAM_THEATER_POST_GPDE_PDE_EXTENSIONS_PLAN.md の Track H / Track E とは次のようにつなぐ。

~~~text
RA / MT / FOU
   ↓
HA1 maximal operator
   ↓
HA2 Riesz potential / HLS
   ↓
HA3 singular integral / Riesz transform
   ├── Track H scaling / nonlinear diffusion / asymptotics
   └── Track E Navier--Stokes
~~~

ただし Track H の H1--H4 は、HA 系列全体を待たなくても既存 RA / MT / FOU で閉じる可能性が高い。

「PDE を始めるために調和解析を全部先に終える」という過剰 prerequisite は避ける。

## 7. 実装時の取捨選択基準

新しい実解析トピックを追加する前に、次を順に確認する。

1. 既存 RA / MT / FOU / FA / VC / GEO / CA に canonical result がないか。
2. 後続章が実際にその概念・定理を必要としているか。
3. 既存章への補遺で閉じるか。
4. 独立章にしないと学習目標・証明・演習が過密になるか。
5. 新章化した場合、少なくとも2つ以上の後続系列から再利用されるか。

単に「標準教科書に載っている」ことだけを新章追加の理由にしない。

## 8. 完成条件

新設・改稿する DREAM THEATER 章は現行 DREAM_THEATER_AUTHORING_STANDARD.md に従う。

特に、

- 主役の定義には直接例を置く。
- scaling や kernel estimate は途中の指数計算を省略しない。
- named inequality は仮定・指数範囲・定数依存を明示する。
- proof block の存在だけで完成扱いしない。
- 後続 PDE で使う定理は、適用条件をその場で照合できる stable anchor を持つ。
- 原則 Level A 4題 / Level B 3題 / Level C 1題と詳細解答を置く。
