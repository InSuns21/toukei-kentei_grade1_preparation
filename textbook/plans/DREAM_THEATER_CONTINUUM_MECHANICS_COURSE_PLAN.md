# DREAM THEATER 連続体力学コース計画

作成日: 2026-09-29  
状態: planned

## 0. 目的

固体・流体・軟組織を、粒子一個ずつではなく連続体として記述するための標準的な入口を新設する。

発生生物学では tissue mechanics、growth、active stress、morphogenesis を扱うために必要になるが、本コース自体は生物専用にせず、弾性体・粘性流体・粘弾性体までを共通基盤として整備する。

## 1. 前提候補

必須:
- 実解析
- 線形代数
- 多変数微分
- ベクトル解析 I の主要内容

推奨:
- ODE / PDE の初歩

PDE の大学院理論、Sobolev 空間、Navier--Stokes の弱解は前提にしない。

## 2. 章構成候補

### CM1 連続体と運動学
- material point
- reference / current configuration
- motion
- displacement / velocity
- deformation gradient
- Jacobian
- local volume change

### CM2 strain と変形
- infinitesimal strain
- finite deformation の入口
- rigid motion
- principal strain
- objectivity の入口

### CM3 stress と Cauchy の定理
- traction
- Cauchy stress tensor
- normal / shear stress
- stress transformation
- principal stress

### CM4 balance laws
- mass conservation
- linear momentum
- angular momentum
- energy balance の入口
- material / spatial description
- Reynolds transport theorem の位置付け

### CM5 構成則
- constitutive relation
- linear elasticity
- Newtonian viscosity
- bulk / shear response
- dimensional analysis
- material parameter

### CM6 線形弾性
- Hooke law
- isotropic elasticity
- equilibrium equation
- boundary conditions
- simple extension / bending の例
- tissue elasticity への橋

### CM7 粘性流体と Stokes flow
- Newtonian fluid
- incompressibility
- Navier--Stokes の導出
- Reynolds number
- low-Reynolds-number limit
- Stokes flow
- 細胞スケール流体への橋

### CM8 粘弾性・active continuum
- Maxwell / Kelvin--Voigt
- relaxation / creep
- active stress
- contractile material
- active gel の入口
- biological tissue への橋

## 3. 数学上の境界

本コースでは「方程式を立て、基本例を解き、物理的意味を読む」ことを主眼とする。

別系列へ送る:
- 弱解・Sobolev 空間
- nonlinear elasticity の厳密存在論
- turbulence
- Navier--Stokes regularity
- geometric measure theory
- advanced shell / plate theory

## 4. 数理発生学との接続

発展編で deformation gradient、strain、stress、force balance、constitutive law、viscoelasticity、active stress、growth / remodeling、low-Re flow を使用する。

これにより、入門版 MDB6 の「ばね・摩擦」から発展版の tissue continuum へ自然に移行する。

## 5. 実装順

1. VC / PDE / FEM との重複監査
2. tensor notation の canonical source 確認
3. CM1--CM4 で kinematics / balance を確立
4. CM5--CM7 で elastic / viscous の標準例
5. CM8 で生体材料への橋
6. FEM / fluid / developmental biology への cross-link
7. knowledge DAG / validation
