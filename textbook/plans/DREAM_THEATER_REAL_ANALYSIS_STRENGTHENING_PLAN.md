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

## 0.1 調和解析の範囲校正に用いる標準書

HA1--HA8 の範囲・順序は、特定の一冊を写すのではなく、次の標準書を比較して校正する。

- Loukas Grafakos, *Classical Fourier Analysis*, Springer
  - maximal function、interpolation、singular integrals、Littlewood--Paley theory の標準的な射程を参照する。
- Elias M. Stein, *Singular Integrals and Differentiability Properties of Functions*, Princeton University Press
  - maximal theorem、singular integral、Riesz potential の古典的正本として参照する。
- Elias M. Stein and Rami Shakarchi, *Fourier Analysis: An Introduction*, Princeton University Press
  - 既存 FOU 系列から現代調和解析へ進む教育的接続を校正する。

Kakeya / restriction のためだけに上記の一部を抜き出すのではなく、独立科目として自然な順序を優先する。

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

## 3. 実解析から現代調和解析へ

杉浦『解析入門』の学部解析コアを確認すると、現行 RA 系列はかなり広く cover している。

一方、FOU1--FOU5 で Fourier 級数・Fourier 変換・反転・Plancherel・離散 Fourier までを正本化した後に位置する、現代的な $L^p$ 調和解析はまだ独立科目として閉じていない。

従来の HA1--HA3 は PDE / Navier--Stokes で必要な

- Hardy--Littlewood maximal operator
- Riesz potential / HLS
- Riesz transform
- singular integral
- Calderón--Zygmund estimate

を補う最短ルートとして設計されていた。

2026-10-07 の再設計では、この方針を改める。

> **後続 PDE や Kakeya のための道具箱として数章だけ置くのではなく、「調和解析を1セメスター履修した」と言える独立系列として HA を完成させる。**

Kakeya / Fourier restriction は HA の終盤で幾何学的測度論と合流する出口として扱う。研究成果固有の技術を HA に逆輸入しない。

## 4. 調和解析 HA1--HA8

ID は仮。実装前に既存 ID と knowledge DAG を確認する。

主 prerequisite:

- FOU1--FOU4
- MT7 の $L^p$ 完備性・稠密性・双対
- 必要な章で MT4 / MT8
- 必要な章で F0-02C1 の Hilbert / Banach 基礎

### HA1 高次元最大作用素・被覆補題・Lebesgue 微分

- ball / cube average
- centered / uncentered Hardy--Littlewood maximal operator
- Vitali 型 covering lemma
- weak $(1,1)$ estimate
- strong $(p,p)$ estimate への入口
- Lebesgue differentiation theorem in $\mathbb R^d$

MT4 の1次元結果を重複証明せず、高次元化に必要な幾何を主役にする。

### HA2 weak $L^p$・補間理論

- distribution function
- weak $L^p$
- sublinear operator
- Marcinkiewicz interpolation
- Riesz--Thorin interpolation
- maximal operatorへの適用

補間定理は named theorem の引用だけで済ませず、採用する形の証明責務を実装前に確定する。

### HA3 Hilbert transform・principal value

- principal value
- Hilbert transform
- cancellation
- Fourier multiplier 表示
- $L^2$ boundedness
- Poisson kernel / conjugate Poisson kernel との関係

一般 singular integral の前に、一変数モデルを完全に扱う。

### HA4 Calderón--Zygmund decomposition

- good / bad decomposition
- maximal cubes
- good part の $L^\infty$ / $L^1$ 制御
- bad part の cancellation
- weak $(1,1)$ estimate
- interpolation への接続

分解構成そのものを主要 proof とする。

### HA5 Calderón--Zygmund singular integral・Riesz transform

- standard kernel
- size / smoothness condition
- truncated operator
- singular integral theorem
- weak $(1,1)$ / strong $(p,p)$
- Riesz transform
- Poisson 方程式の二階微分評価
- Navier--Stokes の圧力表示への出口

PDE における意味は PDE / NS 側、operator mapping property は HA 側を canonical owner とする。

### HA6 Riesz potential・Hardy--Littlewood--Sobolev

- fractional integral
- scaling
- Riesz potential $I_\alpha$
- Hardy--Littlewood--Sobolev inequality
- endpoint の位置付け
- Sobolev inequality との関係
- Newton potential

VC8 / PDE10 / GPDE5 の既存正本と役割分担する。

### HA7 Littlewood--Paley theory・周波数局在

- dyadic partition
- Littlewood--Paley projection
- square function
- almost orthogonality
- Bernstein inequality
- frequency localization
- Sobolev regularity の周波数的解釈

Besov / Triebel--Lizorkin の完全理論は必須範囲にしない。

### HA8 Fourier restriction・oscillatory integral への入口

- hypersurface measure の Fourier transform
- restriction / extension operator
- scaling necessary condition
- Stein--Tomas 型結果
- oscillatory integral の基本像
- wave packet の入口
- tube geometry
- Kakeya 問題との interface

Kakeya set / maximal problem の詳細は幾何学的測度論 PLAN および EOM074 の責務とする。

### 停止線

1セメスターの本系列では原則として次を完全理論へ広げない。

- Hardy space $H^p$
- BMO の完全理論
- weighted $A_p$
- Carleson measure
- Carleson--Hunt theorem
- time--frequency analysis
- multilinear harmonic analysis
- decoupling の完全理論

必要になった場合は「調和解析 II」として独立 PLAN を立てる。

## 5. 推奨実装順

~~~text
既存 RA1--RA8 の監査
  ↓
RA5 parameter integral の補強
  ↓
RA7 多変数広義積分の補強
  ↓
RAX1 実解析・院試／編入 演習

FOU1--FOU5
  ↓
HA1 maximal / covering
  ↓
HA2 weak Lp / interpolation
  ↓
HA3 Hilbert transform
  ↓
HA4 CZ decomposition
  ↓
HA5 CZ singular integral / Riesz transform
  ↓
HA6 Riesz potential / HLS
  ↓
HA7 Littlewood--Paley
  ↓
HA8 restriction / wave packet
  ├──→ PDE / Navier--Stokes
  └──→ 幾何学的測度論 / Kakeya
~~~

RAX1 は理論章の標準 A4/B3/C1 を増量する代わりではなく、既存の LAX1 / CAX1 と同じく **理論系列とは別の演習専用章**として計画する。

## 6. 後続理論との接続

HA 系列は、一般非線形 PDE、Navier--Stokes、幾何学的測度論 / Kakeya の共通解析基盤とする。

~~~text
RA / MT / FOU
   ↓
HA1--HA6
   ├──→ DREAM_THEATER_NONLINEAR_PDE_PLAN.md
   ├──→ Navier--Stokes
   └──→ HA7--HA8
             ↓
      geometric measure theory
             ↓
           Kakeya
~~~

ただし PDE の scaling・熱核平滑化・自己相似など、HA 全系列を必要としない章に過剰 prerequisite を課さない。

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


## 9. 2026-10-07 再設計メモ

- HA を「PDE の不足を埋める3章」から、HA1--HA8 の1セメスター正規講義へ昇格する。
- FOU1--FOU5 を Fourier 解析の canonical prerequisite とし、重複実装しない。
- Kakeya は HA8 だけで閉じず、幾何学的測度論側の Besicovitch / tube geometry と合流して読む。
- EOM074 固有の2026年結果・検証状況は EOM 側へ置く。
