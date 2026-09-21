# DREAM THEATER：学部 ODE・PDE 拡張計画

作成日: 2026-09-22

## 0. 目的

Encore II の ODE1--ODE7 / PDE1--PDE7 は、常微分方程式の標準解法・線形系・非線形系・Sturm--Liouville と、偏微分方程式の特性曲線・三類型・熱・波動・Laplace/Poisson・Green 表現・固有関数法までを古典解の範囲で閉じている。

一方、学部数学・数理物理の標準線としては次が薄い。

- ODE の最大解、延長定理、Grönwall、初期値依存、流れ
- Lyapunov 関数による非線形安定性
- 平面力学系、周期軌道、Poincaré--Bendixson、Bendixson--Dulac
- 初等的な局所分岐と周期軌道の安定性
- PDE の Duhamel 原理と非斉次問題
- 多次元波動方程式、Kirchhoff / Poisson 公式、Huygens 原理
- 多次元 Laplace / Poisson の基本解とポテンシャル論
- Bessel / Legendre を PDE の変数分離へ戻す橋
- 一般一階非線形 PDE と Hamilton--Jacobi の古典特性系

そこで Encore II を次のように拡張する。

~~~text
ODE1--ODE7
   ↓
ODE8 最大解・Grönwall・連続依存・流れ
   ↓
ODE9 Lyapunov 関数・不変集合・LaSalle
   ↓
ODE10 平面力学系・周期軌道・Poincaré--Bendixson
   ↓
ODE11 分岐・Poincaré 写像・周期軌道の安定性

PDE1--PDE7
   ↓
PDE8 Duhamel・非斉次熱/波動・半線形への入口
   ↓
PDE9 多次元波動・Kirchhoff/Poisson・Huygens
   ↓
PDE10 多次元 Laplace/Poisson・基本解・ポテンシャル
   ↓
PDE11 曲線座標・Bessel/Legendre・球面調和
   ↓
PDE12 一般一階 PDE・Hamilton--Jacobi
~~~

Fourier 系列は FOU1--FOU5 のままとし、重複章を作らない。

## 1. 境界線

この拡張は **学部古典論** を対象にする。超関数・弱微分・Sobolev 空間・Lax--Milgram・変分弱解・Galerkin 弱解は Encore III の正本を使い、Encore II へ逆輸入しない。

また、一般中心多様体定理、一般 Hopf 分岐定理の完全証明、保存則の entropy solution、Hamilton--Jacobi の viscosity solution、HJB、Navier--Stokes の弱解は後続発展へ送る。PDE12 は古典 Hamilton--Jacobi を正本化し、viscosity solution が必要になる地点で停止する。

## 2. ODE 拡張

### ODE8 最大解・Grönwall・連続依存・流れ

直接前提：ODE4、F0-00C1。

- 最大解・最大存在区間
- コンパクト集合から逃げない解の延長
- 有限時間 blow-up
- Grönwall の不等式
- 初期値への連続依存
- 線形成長条件による大域存在
- 自律系の流れ
- 一意性から流れの合成則

### ODE9 Lyapunov 関数・LaSalle

直接前提：ODE8。

- Lyapunov 関数
- 正定値・負定値
- 不変な劣位集合
- Lyapunov の直接法
- 正の極限集合
- LaSalle の不変性原理
- 勾配系・減衰振動子

### ODE10 平面力学系・周期軌道

直接前提：ODE9、VC4。

- 周期軌道・極限周期軌道
- trapping region
- Bendixson / Bendixson--Dulac
- Poincaré--Bendixson
- Lotka--Volterra
- van der Pol の位置付け

Poincaré--Bendixson の完全証明で必要な Jordan 曲線定理は平面位相の独立した大定理なので、追加理論を明示した意図的黒箱とする。Bendixson--Dulac は Green の定理から完全証明する。

### ODE11 分岐・周期軌道の安定性

直接前提：ODE10、RA6A。

- saddle-node
- transcritical
- pitchfork
- Hopf 正規形の直接解析
- Poincaré 写像
- 周期軌道の乗数
- 平面周期軌道の発散積分公式

一般 Hopf 分岐定理は中心多様体・正規形理論へ送る。

## 3. PDE 拡張

### PDE8 Duhamel・非斉次問題

直接前提：PDE7、ODE8。

熱核と d'Alembert 公式へ source term を積分して Duhamel 原理を導き、半線形熱方程式の Picard 反復へ接続する。抽象半群論は後続へ送る。

### PDE9 多次元波動方程式

直接前提：PDE8、VC6。

球面平均、三次元 Kirchhoff 公式、二次元 Poisson 公式、有限伝播速度、Huygens 原理を扱う。

### PDE10 多次元ポテンシャル論

直接前提：PDE6、VC4、VC6。

$n$ 次元 radial Laplacian、$n\ge3$ の基本解、Newton ポテンシャル、平均値性質、Kelvin 変換、半空間の鏡像法・Poisson kernel を扱う。VC8 の三次元 Newton ポテンシャルと重複させず一般次元と境界値問題を正本化する。

### PDE11 特殊関数と球面調和

直接前提：PDE10、ODE6、VC6。

円板・円筒から Bessel 方程式、球座標から Legendre 方程式と球面調和関数を導き、Laplace / Helmholtz / heat / wave のモードへ戻す。

### PDE12 一般一階 PDE・Hamilton--Jacobi

直接前提：PDE1、ODE8、RA6A。

$F(x,u,\nabla u)=0$ の Charpit 特性系、Hamilton--Jacobi、Hamilton の正準方程式、eikonal、特性交差と caustic、Burgers との関係を扱う。

## 4. 共通完成条件

各 ODE8--ODE11 / PDE8--PDE12 は DREAM THEATER 現行規約に従う。

- 主役の定義に直接例を置く。
- formal statement は対象・仮定・結論を単独で確定できるようにする。
- 学習目標の主要結果は核心証明まで閉じる。意図的黒箱は理由と必要な追加理論を明示する。
- 原則 Level A 4題 / Level B 3題 / Level C 1題。
- 全演習に詳細解答。
- prerequisite 外の概念を暗黙使用しない。
- 日本語の定着用語を主表記とし、人名部分は英字表記を保持する。

## 5. 実装順

~~~text
ODE8 → ODE9 → ODE10 → ODE11
  ↓
PDE8 → PDE9 → PDE10 → PDE11 → PDE12
~~~

chapter.yaml の direct prerequisite は、読書順ではなく実際の証明・定義で必要なものだけを記載する。
