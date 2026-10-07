# DREAM THEATER 力学系コース計画

作成日: 2026-09-29  
状態: planned

## 0. 目的

DREAM THEATER には非線形 ODE・流れ・Lyapunov・周期軌道・分岐の章が存在するが、公開上は「常微分方程式 II」に分散しており、**力学系という独立科目としての導線がない**。

本計画では重複章を量産せず、既存 ODE 系を正本として再編し、足りない主題だけを追加して「力学系」コースを成立させる。

## 1. 既存資産

主な既存正本:
- ODE4: 非線形系・位相平面・線形化
- ODE8: 最大解・連続依存・流れ
- ODE9: Lyapunov・不変集合・LaSalle
- ODE10: 平面力学系・周期軌道・Poincaré--Bendixson
- ODE11: 局所分岐・Poincaré 写像・周期軌道安定性

したがって ODE4 / ODE8--11 のコピーを新設しない。

## 2. 公開上の再編案

第一候補:
- ODE1--ODE7 = 常微分方程式
- ODE4 を力学系への bridge として参照
- ODE8--ODE11 + 新規章 = 力学系

既存章 ID と URL は維持する。「科目名の再編」と「章の作り直し」を混同しない。

## 3. 新規追加候補

### DYN1 離散力学系
- iteration
- fixed point
- orbit
- stability
- logistic map
- period doubling の入口
- chaos を「複雑そう」の同義語にしない

### DYN2 位相縮約・同期
- limit cycle の位相
- phase response の概念
- weak coupling
- phase model
- synchronization
- Kuramoto model の入口

### DYN3 fast--slow dynamics
- time-scale separation
- nullcline
- relaxation oscillation
- singular perturbation の直観
- excitable system の入口

### DYN4 空間結合系への橋
- coupled cells
- lattice dynamical system
- diffusion coupling
- reaction--diffusion への橋
- pattern formation への出口

### DYN5 不変多様体とホモクリニック構造
- hyperbolic fixed point / periodic orbit
- stable / unstable manifold
- local stable manifold theorem の位置づけ
- homoclinic / heteroclinic orbit
- transverse intersection
- Poincare map
- global bifurcation
- Hamiltonian 系への橋

### DYN6 記号力学とカオス
- topological conjugacy / semi-conjugacy
- shift map
- symbolic dynamics
- Smale horseshoe
- sensitive dependence
- topological transitivity
- periodic points
- entropy の入口
- 「複雑そう」と chaos を同一視しない

DYN5--DYN6 は天体力学・三体問題系列で使う一般理論の canonical owner とする。制限三体問題や KAM そのものは CELE / INT 系列へ送る。

## 4. 前提候補

必須:
- 実解析
- 線形代数
- ODE1--ODE4 の主要内容

ODE10 の VC4 前提など既存依存は尊重し、科目名だけで一括前提にしない。

## 5. 到達点

- 状態空間・軌道・流れを区別できる
- 平衡点の局所安定性を線形化で判定できる
- Lyapunov 関数で大域的挙動を議論できる
- 周期軌道・極限周期を説明できる
- 基本的な局所分岐を読める
- 振動子の位相・同期を扱える
- 時間スケール分離を発生時計・神経・化学反応へ接続できる
- 双曲的不変集合・安定/不安定多様体・ホモクリニック交差の意味を説明できる
- horseshoe と symbolic dynamics を用いて chaos を数学的に説明できる

## 6. 数理発生学との接続

発展編では multistability、bifurcation、limit cycle、synchronization、phase wave、fast--slow dynamics、coupled oscillator を直接使う。

入門版ではこれらを局所導入に留め、発展版では本コースを prerequisite として再導出を省く。

## 7. 実装順

1. ODE4 / ODE8--11 の役割監査
2. 公開科目名の再編可否判断
3. DYN1--DYN6 の重複監査
4. DYN1--DYN4 実装
5. DYN5--DYN6 実装と CELE 系列への cross-link
6. knowledge DAG / 公開目次更新
7. 既存 URL・リンク回帰試験
