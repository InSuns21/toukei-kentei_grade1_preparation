# DREAM THEATER 調和解析 計画

作成日: 2026-10-07  
状態: planned

## 0. 目的

本計画は、DREAM THEATER に **現代調和解析を1セメスターの独立科目として整備する**ための設計台帳である。

従来、`DREAM_THEATER_REAL_ANALYSIS_STRENGTHENING_PLAN.md` 内の HA1--HA3 は、PDE / Navier--Stokes で必要な maximal operator、Riesz potential、Riesz transform、Calderón--Zygmund 評価を補う後続系列として設計されていた。

2026-10-07 の再整理では、この位置付けを改める。

> **調和解析を「実解析強化の補講」ではなく、Fourier解析・測度論・関数解析を前提とする独立した1セメスター科目として canonical 化する。**

Kakeya / restriction は本科目の終盤で幾何学的測度論と合流する出口として扱う。EOM074 固有の2026年研究結果・検証状況は EOM 側へ送る。

## 0.1 範囲校正に用いる標準書

HA1--HA8 の範囲・順序は、特定の一冊を写すのではなく、次の標準書を比較して校正する。

- Loukas Grafakos, *Classical Fourier Analysis*, Springer
  - maximal function、interpolation、singular integrals、Littlewood--Paley theory の標準的な射程を参照する。
- Elias M. Stein, *Singular Integrals and Differentiability Properties of Functions*, Princeton University Press
  - maximal theorem、singular integral、Riesz potential の古典的正本として参照する。
- Elias M. Stein and Rami Shakarchi, *Fourier Analysis: An Introduction*, Princeton University Press
  - 既存 FOU 系列から現代調和解析へ進む教育的接続を校正する。

Kakeya / restriction のためだけに上記の一部を抜き出すのではなく、独立科目として自然な順序を優先する。

## 1. canonical owner と既存資産

既存正本:

- Fourier 級数・Fourier 変換・反転・Plancherel: FOU1--FOU4
- 確率測度・離散 Fourier / sampling: FOU5
- $L^p$ 完備性・稠密性・双対: MT7
- 1次元 Lebesgue 微分定理・BV: MT4
- Hausdorff measure / dimension: MT8
- Banach / Hilbert 基礎: F0-02C1 系列
- Sobolev / PDE 的応用: GPDE / PDE / NS 系列

本計画はこれらを重複実装しない。

特に、

- operator mapping property / harmonic-analysis proof: HA
- PDE での利用・方程式上の意味: PDE / GPDE / NS
- Besicovitch set / rectifiability / geometric tube problem: GMT

と責務を分ける。

## 2. 主 prerequisite

主 prerequisite:

- FOU1--FOU4
- MT7
- 必要な章で MT4 / MT8
- 必要な章で F0-02C1

FOU5 は必須 prerequisite ではなく、確率・離散解析との横断参照に使う。

「HA を始めるために PDE や GMT を先に終える」という逆依存は作らない。

## 3. 科目構成 HA1--HA8

ID は仮。実装前に既存 ID と knowledge DAG を確認する。

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
- maximal operator への適用

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

Kakeya set / maximal problem の詳細は `DREAM_THEATER_GEOMETRIC_MEASURE_THEORY_PLAN.md` および EOM074 の責務とする。

## 4. 依存と出口

~~~text
RA / MT / FOU / FA
        ↓
   HA1 → HA2
        ↓
   HA3 → HA4 → HA5
        └────→ HA6
                ↓
              HA7
                ↓
              HA8
        ┌───────┼─────────┐
        ↓       ↓         ↓
      PDE      NS        GMT
                           ↓
                        Kakeya
                           ↓
                         EOM074
~~~

実際の chapter prerequisite はこの図を機械的に転写せず、各章が直接使用する最小依存だけを登録する。

## 5. PDE / Navier--Stokes との境界

HA 系列は一般非線形 PDE と Navier--Stokes の共通解析基盤として再利用する。

ただし、

- scaling
- heat-kernel smoothing
- self-similarity
- energy estimate

など HA 全系列を必要としない PDE 章には過剰 prerequisite を課さない。

Riesz transform / singular integral / Littlewood--Paley が実際に必要になった章だけ該当 HA 章を direct prerequisite にする。

## 6. GMT / Kakeya との境界

HA8 は restriction / extension、wave packet、tube geometry への解析側の入口を担当する。

GMT 側では、

- Hausdorff dimension
- Frostman / energy
- Besicovitch set
- tube overlap
- Kakeya set problem

を担当する。

EOM074 は両者を合流させ、2026年研究成果の exact claim / proof architecture / verification status を扱う。

## 7. 停止線

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

## 8. 演習・証明方針

各章は DREAM THEATER 標準の A4/B3/C1 を原則とする。

特に、

- covering argument
- weak-type estimate
- interpolation の指数計算
- principal value の収束
- CZ decomposition の構成
- kernel cancellation
- HLS の scaling
- Littlewood--Paley decomposition
- restriction の scaling condition

を演習で自力再構成させる。

named inequality は仮定・指数範囲・定数依存を明示する。

## 9. 完成条件

1. FOU1--FOU4 の後続として、現代調和解析を独立科目として読める。
2. maximal operator の weak $(1,1)$ と $L^p$ boundedness を追える。
3. Marcinkiewicz / Riesz--Thorin interpolation の役割を説明できる。
4. Hilbert transform を singular integral のモデルとして理解できる。
5. Calderón--Zygmund decomposition と singular integral theorem の proof mechanism を説明できる。
6. Riesz transform / Riesz potential / HLS を PDE と接続できる。
7. Littlewood--Paley の周波数局在を使える。
8. restriction / wave packet / tube geometry の入口から GMT / Kakeya へ接続できる。
9. EOM074 が HA の基礎定義の初出場所にならない。
