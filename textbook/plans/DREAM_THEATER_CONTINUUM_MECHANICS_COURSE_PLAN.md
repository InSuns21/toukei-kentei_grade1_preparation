# DREAM THEATER 連続体力学コース計画（CTM1〜8：CMとのID衝突を回避）

作成日: 2026-09-29  
状態: planned

**章ID競合の解消（2026-10-11）**：従前の仮ID `CM1〜CM8` は複素多様体論 `CM1〜CM2` と重複したため、未実装の連続体力学のみ `CTM1〜CTM8` に変更した。既存の公開URL・章・概念アンカーは変更しない。

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

### CTM1 連続体と運動学
- material point
- reference / current configuration
- motion
- displacement / velocity
- deformation gradient
- Jacobian
- local volume change

### CTM2 strain と変形
- infinitesimal strain
- finite deformation の入口
- rigid motion
- principal strain
- objectivity の入口

### CTM3 stress と Cauchy の定理
- traction
- Cauchy stress tensor
- normal / shear stress
- stress transformation
- principal stress

### CTM4 balance laws
- mass conservation
- linear momentum
- angular momentum
- energy balance の入口
- material / spatial description
- Reynolds transport theorem の位置付け

### CTM5 構成則
- constitutive relation
- linear elasticity
- Newtonian viscosity
- bulk / shear response
- dimensional analysis
- material parameter

### CTM6 線形弾性
- Hooke law
- isotropic elasticity
- equilibrium equation
- boundary conditions
- simple extension / bending の例
- tissue elasticity への橋

### CTM7 粘性流体と Stokes flow
- Newtonian fluid
- incompressibility
- Navier--Stokes の導出
- Reynolds number
- low-Reynolds-number limit
- Stokes flow
- 細胞スケール流体への橋

### CTM8 粘弾性・active continuum
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
3. CTM1--CTM4 で kinematics / balance を確立
4. CTM5--CTM7 で elastic / viscous の標準例
5. CTM8 で生体材料への橋
6. FEM / fluid / developmental biology への cross-link
7. knowledge DAG / validation

## 6. 剛体力学 RBD1〜16 との境界・接続（2026-11-11）

[剛体力学・全16講PLAN](DREAM_THEATER_RIGID_BODY_DYNAMICS_PLAN.md)は、有限サイズの**変形しない物体**の姿勢・角速度・慣性・外力・転がり・衝突を担当する。CTMでは以下の局所量と有限変形を所有し、両コースで同じ定理を重複構築しない。

- **CTM1〜2**：RBD1の剛体運動 $x=c+R(X-X_C)$ を例に $F=R$、$\det F=1$、Green–Lagrangeひずみ $E=(F^TF-I)/2=0$ を確認する。有限回転で線形ひずみが一般に0になると誤認しない。strain/objectivityの定義と証明はCTM2に置く。
- **CTM2〜4**：RBD3の剛体速度場 $v=\dot c+\omega\times(x-c)$ は速度勾配の対称部分が0。CTMは局所スピン・ひずみ速度・物質微分と、密度・応力を伴う収支を扱う。
- **CTM4**：RBD7の重心まわりNewton–Euler方程式と領域積分の線形・角運動量収支を対応させる。**剛体の応力・拘束反力は必ずしも0でない**。応力対称性は古典的Cauchy連続体で体積偶力等を置かない場合の角運動量収支から導く。
- **CTM5〜8**：RBD14〜15の理想的な無滑り・衝撃拘束と、変形体の構成則・粘弾性・接触力の違いを確認する。Hertz接触・塑性・応力波などは別扱い。

CTMの履修にRBD全16講を一律必須としない。RBDも未実装CTMを必須にしない。章別の直接prerequisiteとstable anchorは各章の執筆時に実在確認する。CTM1〜8の計画講数・章ID・状態は本追記では変更しない。
