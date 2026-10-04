# DREAM THEATER Navier--Stokes 方程式への道 — ミレニアム問題の入口 コース計画

作成日: 2026-10-04  
更新日: 2026-10-05  
状態: in_progress

## 0. 目的

本計画は、DREAM THEATER の既存 VC9「保存則・流体・Maxwell 方程式」、偏微分方程式 II の GPDE1--GPDE10、Fourier 解析、関数解析を土台として、**三次元非圧縮 Navier--Stokes 方程式の大域正則性問題を自力で読める入口まで到達するための独立系列**を追加する設計台帳である。

本科目の目的は、「Navier--Stokes 方程式」という有名な式を紹介して終えることではない。読者が最終的に

$$
\partial_t u +(u\cdot\nabla)u
=
-\nabla p+\nu\Delta u+f,
\qquad
\nabla\cdot u=0
$$

を見たとき、

1. 圧力と発散零制約をどう処理するか。
2. なぜ $L^2$ エネルギー評価が成立するか。
3. Leray--Hopf 型大域弱解をどう構成するか。
4. なぜ二次元では大域正則性まで進めるのか。
5. 三次元ではどの微分評価が閉じなくなるのか。
6. Navier--Stokes の尺度変換と臨界性が何を意味するか。
7. 正則性判定が「あと何を制御できればよいか」をどう表すか。
8. Clay Mathematics Institute のミレニアム問題が実際には何を要求しているか。
9. 2026年に公表された有限時間特異点構成が、公式問題のどの選択肢を狙ったものなのか。
10. 「ミレニアム問題が決着すること」と「無外力の三次元 Navier--Stokes の大域正則性問題が決着すること」が同じではない理由。

を、既知の結果名の列挙ではなく、主要な計算・証明機構まで追って説明できる状態を目標とする。

中心となる学習線は次とする。

~~~text
VC9
  非圧縮 Navier--Stokes 方程式の導出
        ↓
GPDE3--GPDE5
  Sobolev 空間・埋め込み・コンパクト性
        +
GPDE10
  時間発展弱解・Galerkin・エネルギー法
        +
FOU1--FOU4
  周期 Fourier / L2 Fourier 解析
        ↓
NS1--NS8
  非圧縮 Navier--Stokes の解析
        ↓
NS8A
  2026年の有限時間特異点構成と
  ミレニアム問題の現在地
~~~

---

## 1. 現状の canonical owner と責務分担

### 1.1 VC9 は方程式の物理的導出をすでに持つ

VC9 では、質量保存、物質微分、非圧縮条件、渦度、応力テンソル、Newton 流体、非圧縮 Navier--Stokes 方程式までが既に導入されている。

したがって NS 系列では、連続体力学の運動量収支から Navier--Stokes を再導出しない。必要な式を再掲するときも、「なぜこの PDE が流体方程式として現れるか」の canonical owner は VC9 とする。

NS 系列の中心問いは、

> この非線形時間発展 PDE に対して、解の存在・一意性・正則性をどこまで証明できるか。

である。

### 1.2 GPDE1--GPDE10 は弱解を扱うための解析基盤をすでに持つ

特に再利用するのは、

- GPDE2: 弱微分
- GPDE3: Sobolev 空間
- GPDE4: $H_0^1$、Poincaré 不等式、トレース
- GPDE5: Sobolev 埋め込み、弱収束、Rellich--Kondrachov 型コンパクト性
- GPDE6: 弱形式
- GPDE7: Lax--Milgram
- GPDE9: 正則性の考え方
- GPDE10: Gelfand 三つ組、時間発展弱解、Galerkin、エネルギー評価

である。

GPDE10 はすでに、弱収束だけでは一般の非線形項の極限を通せないこと、後続の非線形時間発展 PDE では Aubin--Lions 型コンパクト性などが必要になること、Navier--Stokes 型エネルギー弱解へ進むことを示している。

NS 系列はこの未回収部分を引き受ける。

### 1.3 FEM5 の Stokes 方程式は本線 prerequisite にしない

FEM5 は鞍点問題、速度--圧力弱形式、inf-sup 条件、Babuška--Brezzi 型理論、混合有限要素法、Schur 補行列、Taylor--Hood 要素を扱う。

これは重要な既存資産だが、**数値解析のための Stokes 方程式**が主目的である。

NS 系列の学習者に FEM1--FEM4 を経由させるのは、ミレニアム問題への本線としては遠回りになる。

したがって Stokes 方程式の解析的役割、発散零部分空間、Leray 射影、Stokes 作用素は NS1 で必要な範囲を構成する。FEM5 は速度--圧力混合形式を数値計算側から見たい読者への関連章として相互参照する。

### 1.4 Fourier 解析は周期領域での主要道具として使う

最初の主たる証明舞台は三次元トーラス

$$
\mathbb T^3
$$

とする。

理由は、

- 境界正則性を最初から混ぜずに済む。
- 発散零条件を Fourier 係数ごとに扱える。
- Leray 射影を具体的に構成できる。
- Galerkin 基底を自然に選べる。
- Navier--Stokes の非線形機構そのものへ集中できる。

ためである。

最終的に Clay の公式問題を読む段階で $\mathbb R^3$ へ移る。

---

## 2. 科目名・ID 方針

公開科目名の第一候補は

> **Navier--Stokes 方程式への道**

とする。

副題またはロードマップ説明で

> ミレニアム問題の入口

を付ける。

「流体力学 II」のような名称にはしない。圧縮性流体、境界層、乱流モデル、連続体熱力学一般までを扱う科目ではなく、非圧縮 Navier--Stokes の解析が中心だからである。

章 ID は実装開始時点で衝突がなければ NS1、NS2、NS3、NS4、NS5、NS6、NS7、NS8、NS8A を採用する。

NS8A は本編完了後の補講とし、2026年の研究結果・認定状況に依存するため、本編 NS1--NS8 と同じ固定的な数学史実として扱わない。

---

## 3. prerequisite 方針

本科目全体へ「偏微分方程式 II 全章」「関数解析全章」を一括 prerequisite として付けない。各章の chapter.yaml / knowledge.yaml では、実際に利用する canonical result へ接続する。

### 3.1 主 prerequisite

主要候補は次とする。

- VC9: 非圧縮 Navier--Stokes 方程式、渦度
- VC8: Helmholtz 分解、Biot--Savart 型再構成
- FOU1--FOU2: 周期 Fourier 級数
- FOU3--FOU4: Fourier 変換、Plancherel
- GPDE3: Sobolev 空間
- GPDE5: Sobolev 埋め込み、弱コンパクト性、Rellich--Kondrachov
- GPDE10: 時間発展弱解、Galerkin、エネルギー恒等式
- 必要に応じて FA3 / FA4 の弱位相・弱*コンパクト性結果

VC8 は VC9 の既存 prerequisite なので、各 NS 章に機械的に重複登録しない。

### 3.2 新しく canonical owner を決める必要がある結果

少なくとも次は、現状の DREAM THEATER では NS 系列のために責務を確定する必要がある。

- 発散零 $L^2$ 空間
- Leray 射影
- Stokes 作用素
- Navier--Stokes 三重線形形式
- Ladyzhenskaya / Gagliardo--Nirenberg 型補間評価の NS に必要な形
- Aubin--Lions 型時間空間コンパクト性
- Leray--Hopf 弱解
- weak--strong uniqueness
- Prodi--Serrin 型正則性判定
- Navier--Stokes の尺度変換
- 必要なら斉次 Sobolev 空間 $\dot H^s$ の最小導入

同名定理が実装時点で既存 canonical owner を持つ場合は重複定理を作らず参照する。

---

## 4. 到達目標

NS8 修了時点で、読者は少なくとも次を説明できることを目標とする。

### 4.1 方程式の構造

圧力は単なる付加変数ではなく、発散零制約を保つ役割を持つ。Leray 射影により圧力を消去した抽象形

$$
u_t+\nu Au+B(u,u)=Pf
$$

を導ける。

### 4.2 エネルギー

滑らかな解について

$$
\frac12\frac{d}{dt}\|u(t)\|_2^2
+
\nu\|\nabla u(t)\|_2^2
=
(f(t),u(t))
$$

を導ける。

無外力なら

$$
\|u(t)\|_2^2
+
2\nu\int_0^t\|\nabla u(s)\|_2^2\,ds
=
\|u_0\|_2^2
$$

となる。

この評価が大域弱解には十分でも、三次元の大域正則性には十分でないことを説明できる。

### 4.3 弱解

Galerkin 近似から、

$$
u\in
L^\infty(0,T;L^2)
\cap
L^2(0,T;H^1)
$$

型の解を構成し、非線形項の極限で強収束が必要になる理由を説明できる。

### 4.4 2D / 3D の差

二次元では渦度方程式に渦伸長項がなく、追加エネルギー評価が閉じることを示せる。三次元では

$$
(\omega\cdot\nabla)u
$$

が現れ、同じ議論が閉じないことを説明できる。

### 4.5 臨界性

三次元 Navier--Stokes の尺度変換

$$
u_\lambda(x,t)
=
\lambda u(\lambda x,\lambda^2t),
\qquad
p_\lambda(x,t)
=
\lambda^2p(\lambda x,\lambda^2t)
$$

を確認し、

$$
\|u_\lambda\|_{L^p}
=
\lambda^{1-3/p}\|u\|_{L^p}
$$

から $L^3$ が尺度不変であることを導ける。

基本 $L^2$ エネルギーが三次元で臨界量ではないことを理解する。

### 4.6 ミレニアム問題

Clay の公式定式化を直接読み、正則性側、breakdown / counterexample 側、$\mathbb R^3$ 版、周期版、外力の扱いを区別できる。

2026年の解決主張がどの statement を対象にするかを、公式問題文と照合できる。

---

## 5. コース構成

## NS1 発散零空間・Leray 射影・Stokes 作用素

### 中心問い

> 非圧縮条件と圧力を、解析しやすい Hilbert 空間の構造へどう組み込むか。

### 扱う内容

- 周期領域 $\mathbb T^3$
- 平均零ベクトル場
- 発散零 Fourier モード
- 発散零滑らかベクトル場の $L^2$ 閉包
- 圧力勾配と発散零場の直交性
- 周期 Helmholtz 分解
- Leray 射影 $P$
- Fourier モードごとの Leray 射影公式
- Stokes 作用素

$$
A=-P\Delta
$$

- 発散零空間上では $A=-\Delta$ と見なせる条件
- 圧力消去後の Navier--Stokes

$$
u_t+\nu Au+B(u,u)=Pf
$$

- 圧力を後から Poisson 方程式で復元する考え方

### 主要証明責務

周期 Fourier 係数 $\widehat u(k)$ に対し、

$$
\widehat{Pu}(k)
=
\left(
I-\frac{k\otimes k}{|k|^2}
\right)\widehat u(k)
\qquad(k\neq0)
$$

を導き、なぜ発散零になるか、なぜ勾配成分を消すか、なぜ直交射影になるかを直接確認する。

### 直接例

- 単一 Fourier モード
- 勾配場の射影が零になる例
- 発散零モードがそのまま残る例
- 圧力のみが調整する簡単な速度場

---

## NS2 非線形項・三重線形形式・エネルギー評価

### 中心問い

> 非線形項 $(u\cdot\nabla)u$ があるのに、なぜ基本エネルギーは暴走せず評価できるのか。

### 扱う内容

三重線形形式

$$
b(u,v,w)
=
\int_{\mathbb T^3}
(u\cdot\nabla)v\cdot w\,dx
$$

を導入する。

発散零 $u$ に対して

$$
b(u,v,w)
=
-b(u,w,v)
$$

および

$$
b(u,v,v)=0
$$

を証明する。

そのうえで、運動エネルギー恒等式、外力付きエネルギー不等式、Cauchy--Schwarz / Young、Poincaré 型減衰、粘性散逸、エネルギー空間を扱う。

NS3 以降で必要な補間評価として、例えば三次元で

$$
\|u\|_{L^4}
\le
C
\|u\|_{L^2}^{1/4}
\|\nabla u\|_{L^2}^{3/4}
$$

などを、既存 Sobolev 埋め込みと補間から導く。

「Ladyzhenskaya 不等式」「Gagliardo--Nirenberg 不等式」という名前だけを置いて完成にしない。

### 主要証明責務

$$
\int
(u\cdot\nabla)u\cdot u\,dx
=0
$$

について、

1. 成分表示する。
2. $u_j\partial_j(|u|^2/2)$ へまとめる。
3. 周期部分積分する。
4. $\nabla\cdot u=0$ を使う。

という機構を明示する。

---

## NS3 Leray--Hopf 弱解と大域存在

### 中心問い

> 滑らかさは保証できなくても、有限エネルギーの解を全時間で構成できるのはなぜか。

### 扱う内容

- Fourier--Galerkin 近似
- 有限次元 ODE 系
- 次元に依らないエネルギー評価
- 弱収束・弱*収束
- 時間微分の負 Sobolev 空間評価
- Aubin--Lions 型コンパクト性
- $L^2_{t,x}$ 強収束
- $u_n\otimes u_n$ の極限
- 弱形式
- 初期値の回収
- エネルギー不等式
- Leray--Hopf 弱解

### Aubin--Lions 型コンパクト性の責務

GPDE10 が予告しているため、NS3 で canonical owner を持つ第一候補とする。

少なくとも

$$
V\Subset H\hookrightarrow V^*
$$

の Gelfand 三つ組で、

- $u_n$ が $L^2(0,T;V)$ で一様有界
- $\partial_tu_n$ が適切な $L^q(0,T;V^*)$ で一様有界

なら $L^2(0,T;H)$ に強収束部分列を持つ標準形を、証明を追える粒度で扱う。

もし実装時に汎用性を理由として GPDE10A などの共有章へ canonical owner を移す場合は、その章を先に完成させて NS3 から stable anchor 参照する。

「コンパクト性により強収束する」で終わらせない。

### 完成点

任意の有限 $T$ に対し、適切な初期値・外力の下で Leray--Hopf 型弱解が存在するところまで証明する。

---

## NS4 二次元 Navier--Stokes はなぜ大域的に制御できるか

### 中心問い

> 同じ方程式なのに、二次元ではなぜ正則性問題が閉じるのか。

### 扱う内容

二次元渦度

$$
\omega
=
\partial_1u_2-\partial_2u_1
$$

と渦度方程式

$$
\partial_t\omega
+
u\cdot\nabla\omega
=
\nu\Delta\omega
+
\nabla^\perp\cdot f
$$

を導く。

さらに、

- $L^2$ 渦度エネルギー
- 速度の $H^1$ 制御との対応
- 二次元で渦伸長項がないこと
- 弱解の一意性
- 強解への持ち上げ
- 大域正則性への bootstrap
- 必要なら二次元 Biot--Savart / 流れ関数との接続

を扱う。

NS4 の最後で実際に三次元渦度方程式を先取りし、

$$
(\omega\cdot\nabla)u
$$

の有無を数式で比較する。

---

## NS5 三次元局所強解・一意性・有限時間発散判定

### 中心問い

> 三次元でも短時間なら滑らかな解を作れるのに、なぜその評価を任意時間まで延ばせないのか。

### 扱う内容

滑らかな解に対して一階微分エネルギーを取り、

$$
\frac12\frac{d}{dt}\|\nabla u\|_2^2
+
\nu\|Au\|_2^2
=
-\langle B(u,u),Au\rangle
+
(f,Au)
$$

を得る。

非線形項について代表的に

$$
|\langle B(u,u),Au\rangle|
\le
C
\|\nabla u\|_2^{3/2}
\|Au\|_2^{3/2}
$$

型評価を導き、Young の不等式で

$$
\frac{d}{dt}\|\nabla u\|_2^2
\le
C_\nu
\|\nabla u\|_2^6
+
\text{外力項}
$$

へ進む。

無外力の概略では

$$
y'(t)\le Cy(t)^3,
\qquad
y(t)=\|\nabla u(t)\|_2^2
$$

となる。

この微分不等式が短時間制御・局所存在には使えるが、任意時間の一様上界を与えないことを明示する。

扱う定理は、

- 三次元局所強解
- 強解の一意性
- 最大存在時間
- continuation / blow-up alternative
- weak--strong uniqueness

とする。

---

## NS6 スケーリング・臨界性・どのノルムを見るべきか

### 中心問い

> なぜ $L^2$ エネルギーを全時間で制御できても、三次元正則性を決められないのか。

### 扱う内容

無外力三次元 Navier--Stokes の尺度変換

$$
u_\lambda(x,t)
=
\lambda u(\lambda x,\lambda^2t),
$$

$$
p_\lambda(x,t)
=
\lambda^2p(\lambda x,\lambda^2t)
$$

を全項へ代入して直接確認する。

Lebesgue ノルムでは

$$
\|u_\lambda(t)\|_{L^p(\mathbb R^3)}
=
\lambda^{1-3/p}
\|u(\lambda^2t)\|_{L^p(\mathbb R^3)}
$$

を変数変換から導き、$L^3$ が空間尺度不変になることを確認する。

時空間ノルムでは

$$
\frac{2}{q}+\frac{3}{p}=1
$$

が臨界線になることを導く。

必要な Fourier 解析を確認したうえで、

$$
\|u_\lambda\|_{\dot H^s}
=
\lambda^{s-1/2}
\|u\|_{\dot H^s}
$$

を導き、

$$
s=\frac12
$$

が三次元の斉次 Sobolev 臨界指数であることを確認する。

「臨界」「劣臨界」「超臨界」という語を印象語で使わず、どの尺度変換に対してノルムが小さくなる・不変・大きくなるかを定義してから用いる。

---

## NS7 正則性判定・渦伸長・何が特異点を防ぐのか

### 中心問い

> 「もしこの量さえ有限なら正則」という条件を、Navier--Stokes の非線形項からどう導くか。

### 7.1 Prodi--Serrin 型条件

代表的な範囲で

$$
u\in L^q(0,T;L^p(\mathbb R^3)),
\qquad
\frac{2}{q}+\frac{3}{p}\le1
$$

型条件から正則性・一意性を得る機構を扱う。

端点の技術的難度は分離し、すべてを一つの証明で済ませない。

### 7.2 三次元渦度方程式

$$
\omega=\nabla\times u
$$

として

$$
\partial_t\omega
+
(u\cdot\nabla)\omega
=
(\omega\cdot\nabla)u
+
\nu\Delta\omega
+
\nabla\times f
$$

を成分計算から導出する。

### 7.3 渦伸長

$$
(\omega\cdot\nabla)u
$$

が二次元では消え、三次元では消えないことを確認する。「渦が伸びる」という図示だけで済ませず、渦度 $L^2$ エネルギーへこの項がどう入るかを計算する。

### 7.4 正則性問題の読み替え

- 臨界ノルムが blow-up 前まで有限なら何が言えるか。
- 最大存在時間でどのノルムが発散しなければ延長できるか。
- weak--strong uniqueness と Leray--Hopf 弱解の関係。

を整理する。

Beale--Kato--Majda 型判定、Escauriaza--Seregin--Šverák 型端点理論、Caffarelli--Kohn--Nirenberg 部分正則性は、必要な prerequisite と証明規模を確認したうえで発展補足とする。

---

## NS8 ミレニアム問題の公式定式化を読む

### 中心問い

> 「Navier--Stokes 問題を解く」とは、Clay の公式問題では正確には何を証明することなのか。

### 方針

この章はネット上の二次解説を正本にしない。

実装時点の

- Clay Mathematics Institute の公式問題ページ
- Charles L. Fefferman による公式 problem description
- CMI の Millennium Prize rules

を一次資料として確認する。

### 扱う内容

- $\mathbb R^3$ と周期版
- 初期値条件
- 発散零条件
- 滑らかさ・減衰条件
- 外力の有無
- 大域存在・滑らかさ側
- breakdown 側
- 公式定式化の A / B / C / D の論理関係
- どれを証明すれば prize problem の解答になるか
- Leray--Hopf 弱解の大域存在だけではなぜ不足か
- 「弱解が存在する」と「滑らかな解が全時間存在する」の違い
- 強解 breakdown 後に弱解理論が何を意味するか

NS8 は、補講 NS8A を読まなくても、2026年以前の歴史的問題設定として何が未解決だったのかを完全に理解できる章にする。NS8A の最新研究状況を NS8 の定理構造へ混ぜない。

---

## NS8A 補講：2026年の有限時間特異点構成とミレニアム問題の現在地

### 8A.0 この補講だけは時点依存である

この補講は、通常の数学定理章と異なり、**研究結果の公表・検証・CMI の認定状況が更新され得るページ**である。

実装時および大きな改稿時に、必ず一次資料の現況を再確認する。

2026-10-04 時点で確認されている状況は次である。

1. 2026-09-08、OpenAI は Navier--Stokes Millennium Prize Problem に対する解答として、有限時間特異点を構成する解析的証明と Lean 形式化を公表した。
2. OpenAI の公表では、公式 formulation の statement C、および D を確立すると説明されている。
3. 2026-09-11、Clay Mathematics Institute は「Navier--Stokes problem has apparently been settled」と発表し、評価手続きは意図的に時間をかけて行うと説明した。
4. 2026-10-04 時点で CMI の Navier--Stokes 問題ページは依然として Active 表示である。

したがって、この補講の実装時点では

> **非常に有力な解決結果が公表され、CMI も apparent settlement と認識しているが、CMI の最終認定状況は別途確認する**

という書き分けを行う。

### 8A.1 表題の更新規則

実装時に CMI がまだ Active なら、公開表題は例えば

> **補講：2026年の Navier--Stokes 解決結果と検証状況**

とする。

CMI が正式認定済みなら、

> **補講：Navier--Stokes ミレニアム問題の解決**

のような確定表現へ更新してよい。

古い表題を維持するためだけに現状とずれた表現を残さない。

### 8A.2 一次資料

少なくとも次を確認する。

- OpenAI, "On the Navier--Stokes Millennium Prize Problem", 2026-09-08
- 公開された解析的 proof paper
- 公開された Lean formalization
- Clay Mathematics Institute, "Navier-Stokes Announcement", 2026-09-11
- CMI Navier--Stokes Millennium Problem page
- CMI official problem description
- CMI prize rules

OpenAI の一般向け解説だけから証明内容を再構成しない。

### 8A.3 最初に A / B / C / D を再確認する

NS8 の公式定式化を受け、どの statement が大域正則性側か、どの statement が breakdown 側か、外力付き / 無外力をどう区別するかを公式 problem description と照合する。

この補講の最重要注意は

$$
\boxed{
\text{Millennium Prize Problem が C/D により決着する}
\not\Rightarrow
\text{無外力三次元問題の A/B 側まで同時に決着する}
}
$$

という論理的区別である。

「Navier--Stokes が解けた」という見出しだけで、この区別を消さない。

### 8A.4 2026年結果の設定を正確に読む

proof paper から少なくとも次を抽出し、仮定を省略せず説明する。

- 空間領域
- 初期速度
- 外力
- 外力の滑らかさ・減衰条件
- 非圧縮条件
- 粘性係数
- エネルギー条件
- 何が有限時間で非有界になるか
- どの時刻まで古典解が存在するか
- singularity / breakdown を公式 problem statement の意味へどう対応させるか

特に、外力自体を singular にすることで breakdown を作っているわけではないことを、外力の正則性条件の検証から追う。

### 8A.5 特異点構成の幾何

OpenAI の一般向け説明では、中心領域が縮小しながら渦構造が伸長し、速度が増大する像が説明されている。

教材ではその比喩をそのまま証明扱いしない。

解析論文を読んだうえで、

1. どの ansatz / 座標 / 対称性を使うか。
2. 速度・圧力・外力をどう構成するか。
3. どの尺度が時間とともに縮むか。
4. どの量が発散するか。
5. エネルギーが有限に残ることをどう積分評価するか。
6. 方程式の大きな項同士がどう相殺されるか。
7. 残差が滑らかな外力として条件を満たすことをどう確認するか。

を主要中間式付きで追う。

「渦が細くなるから blow-up」で済ませない。

### 8A.6 NS6 のスケーリングとの接続

2026年構成で現れる尺度を NS6 と照合し、

- Navier--Stokes 自然スケール
- 構成解の局所スケール
- 速度の増幅率
- 空間体積の縮小
- エネルギー積分

を対応させる。

速度が大きくなっても

$$
\int |u|^2\,dx
$$

が有限に残り得る理由を、振幅と集中領域体積の釣り合いから具体的に確認する。

### 8A.7 粘性と非線形項の競合

NS2--NS7 の道具を使い、慣性項、圧力勾配、粘性項、外力の大きさを構成解の尺度で比較する。

「粘性は平滑化するのになぜ特異点が生じ得るのか」を、定性的説明だけでなく論文の主要バランス式から説明する。

### 8A.8 Leray--Hopf 弱解との整合

有限時間で古典解が breakdown しても、

$$
u\in
L^\infty_tL^2_x
\cap
L^2_tH^1_x
$$

型の大域弱解理論と論理矛盾しないことを NS3 へ戻って説明する。

少なくとも、古典解の存在、強解の存在、Leray--Hopf 弱解の存在、一意性、正則性、breakdown 後の continuation の意味を区別する。

### 8A.9 Lean 形式化をどう読むか

「Lean で通ったから CMI の認定が自動的に終わる」とは説明しない。

少なくとも、

- 解析的 proof paper
- 形式化された theorem statement
- Lean が検証する論理的導出
- ライブラリ化された前提
- CMI / 数学界による問題設定との照合・評価

を区別する。

形式証明が何を強く保証し、何を別途確認する必要があるかを説明する。

### 8A.10 研究史としての結論

補講の最後では、実装日時点の事実に応じて次を更新する。

例として 2026-10-04 時点では、

~~~text
OpenAI による C/D 型有限時間特異点構成      公表済み
解析的 proof paper                         公開済み
Lean formalization                         公開済み
CMI の反応                                 "apparently been settled"
CMI 問題ページ                             Active
CMI の最終認定                             実装時点で再確認
無外力 A/B 側の問い                        C/D の論理的帰結ではない
~~~

という状態を記録する。

この状態表は日付を必ず付ける。

---

## 6. 2D から 3D へ進む教育設計

本科目では最初から三次元の難しい評価だけを並べない。

次の対照を繰り返し使う。

### 二次元

$$
\partial_t\omega
+
u\cdot\nabla\omega
=
\nu\Delta\omega
$$

### 三次元

$$
\partial_t\omega
+
u\cdot\nabla\omega
=
(\omega\cdot\nabla)u
+
\nu\Delta\omega
$$

差は一項だが、この一項がエネルギー階層を変える。

NS4 で「閉じる世界」を完成させてから NS5--NS7 で「閉じない世界」へ進む。

これにより、「三次元は難しいから未解決だった」という説明ではなく、「どの評価式のどこが閉じないか」を紙上で再現できるようにする。

---

## 7. 定義・定理導入の方針

この系列は専門用語が多いため、formal statement の連続になりやすい。

各主要概念は次の順を守る。

~~~text
今ある道具
  ↓
そのままでは何が困るか
  ↓
何を制御したいか
  ↓
新しい対象・空間・評価
  ↓
最小例
  ↓
formal statement
  ↓
主要証明
  ↓
Navier--Stokes での使用箇所
~~~

### 7.1 Leray 射影

「$P$ を Leray 射影とする」から始めない。

圧力勾配が発散零 test field と直交することを確認し、「圧力方向と発散零方向を分離したい」という必要性を先に示す。

### 7.2 Leray--Hopf 弱解

定義を先に置く前に、古典解を Galerkin で近似すると何が一様に残るか、何は失われるか、どの正則性なら極限後も意味があるかを示す。

### 7.3 臨界空間

critical space という用語を先に置かない。$L^p$ ノルムの尺度変換を手計算し、指数が零になる点を見つけてから臨界性を定義する。

---

## 8. 主要証明の完成責務

本科目では、次を「標準的」で飛ばさない。

1. 周期 Leray 射影の構成。
2. 非線形項のエネルギー消去。
3. Navier--Stokes に必要な補間評価。
4. Galerkin 近似の一様エネルギー評価。
5. 非線形項の極限通過。
6. Leray--Hopf 弱解の大域存在。
7. 二次元大域正則性の核心評価。
8. 三次元局所強解を支える $H^1$ 評価。
9. blow-up alternative。
10. Navier--Stokes scaling の導出。
11. 代表的な Prodi--Serrin 型正則性判定の証明。
12. 三次元渦度方程式。
13. NS8 の公式 problem statement の論理整理。
14. NS8A で採用する 2026年 proof の核心機構。

NS8A の 2026年 proof が大規模で、一ページに完全証明を押し込むことが教育上不適切な場合は、補講本体で全体構成を示し、必要な技術補題を NS8B / NS8C などへ分離してよい。

ただし「論文を参照」で核心を丸ごと閉じない状態を、DREAM THEATER の完成扱いにはしない。

---

## 9. 反例・失敗機構

本科目では「成立する定理」だけでなく、失敗機構を教材化する。

### 9.1 弱収束だけでは二次非線形項を通せない

GPDE10 の反例を受け、

$$
u_n\rightharpoonup u
$$

だけでは

$$
u_n\otimes u_n
\rightharpoonup
u\otimes u
$$

とは限らないことを NS3 の導入で再確認する。

### 9.2 $L^2$ エネルギーだけでは三次元高階ノルムを支配できない

NS5 / NS6 で尺度を比較し、「有限エネルギーだから特異点は起こらない」という誤解を潰す。

### 9.3 2D の証明を 3D へコピーできない

渦伸長項を実際に残して、消えない箇所を示す。

### 9.4 C/D の解決を A/B の解決と同一視しない

NS8A で公式 problem statement に戻って論理を確認する。

---

## 10. 演習設計

各実装章は、理由付き例外がなければ DREAM THEATER 標準どおり最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

を置き、全問に詳細解答を付ける。

### NS1

- Fourier モードの発散零条件。
- Leray 射影行列を具体的な $k$ で計算。
- 勾配モードが射影で消えることの確認。
- Stokes 固有値の計算。

### NS2

- 三重線形形式の反対称性。
- $b(u,v,v)=0$ の直接証明。
- 明示的発散零ベクトル場のエネルギー消去。
- 補間評価を使った $B(u,v)$ のノルム評価。

### NS3

- 有限 Fourier--Galerkin 系を実際に書く。
- 一様エネルギー評価。
- 時間微分の負 Sobolev 評価。
- 強収束から二次項の極限を通す。
- Leray--Hopf 構成を一連の証明として再現する Level C。

### NS4

- 二次元渦度方程式の導出。
- 渦度 $L^2$ 評価。
- 速度 $H^1$ と渦度の関係。
- 二次元弱解一意性。

### NS5

- $H^1$ エネルギー式。
- 非線形項の補間評価。
- $y'\le Cy^3$ の比較方程式。
- continuation criterion。

### NS6

- $L^p$ scaling。
- $L^q_tL^p_x$ scaling。
- $\dot H^s$ scaling。
- エネルギー空間と臨界空間の比較。

### NS7

- 三次元渦度方程式。
- 渦伸長の具体例。
- Prodi--Serrin 型評価。
- weak--strong uniqueness の再構成。

### NS8

- Clay の各 statement の仮定を表に整理する。
- 「Leray--Hopf 存在」だけではどの statement も自動的に終わらない理由。
- 周期版と $\mathbb R^3$ 版の相違。
- A/B/C/D の論理関係。

### NS8A

単なるニュースクイズにしない。

- 2026年 proof の仮定照合。
- 構成された速度場のエネルギー積分。
- blow-up 量の確認。
- 外力正則性の確認。
- C/D への対応。
- Lean theorem statement と公式 C/D の対応確認。
- 実装時点の CMI status を一次資料から検証する資料読解問題。

---

## 11. 本科目に含めないもの

入口目標を守るため、次は本系列の必須完成条件に入れない。

- 圧縮性 Navier--Stokes の完全理論
- Euler 方程式の全正則性理論
- Prandtl 境界層
- 乱流モデル
- Reynolds 平均
- LES / DNS の数値流体力学
- Navier--Stokes の有限要素離散化
- SPDE と確率 Navier--Stokes
- Littlewood--Paley 理論の体系
- Besov / Triebel--Lizorkin 空間の体系
- Koch--Tataru の完全理論
- Caffarelli--Kohn--Nirenberg 部分正則性の完全証明
- convex integration の体系
- Onsager 予想の完全理論
- 圧縮性流体の衝撃波・弱解理論

必要なら後続として「Navier--Stokes 発展：臨界関数空間」「Euler・乱流・convex integration」「数値流体力学」を別 plan にする。

---

## 12. 既存系列との責務分担

### VC9

- 流体の物理的導出。
- 物質微分。
- 非圧縮条件。
- Newton 流体。
- Navier--Stokes 標準形。

### VC8

- Helmholtz 分解。
- Biot--Savart 型渦度再構成。

### GPDE

- 弱微分。
- Sobolev 空間。
- Sobolev 埋め込み。
- 弱形式。
- 時間発展 PDE の抽象エネルギー法。

NS はそれらを非線形流体 PDE へ適用する。

### FEM5

- Stokes 混合有限要素法。
- inf-sup。
- 圧力離散化。

NS 側からは optional cross-reference に留める。

### Fourier 解析

- 周期基底。
- Parseval。
- Plancherel。
- $\mathbb R^3$ での scaling と Sobolev ノルムの Fourier 表現。

### 実解析・調和解析

- Hardy--Littlewood maximal operator、Riesz potential、Riesz transform、Calderón--Zygmund の一般理論は DREAM_THEATER_REAL_ANALYSIS_STRENGTHENING_PLAN.md の HA 系列を canonical owner とする。
- NS 側では、圧力表示・渦度表示・正則性評価で実際に使う result の仮定を局所確認する。
- NS の都合だけで singular integral theory を再構築しない。

### 非線形偏微分方程式

- 一般の scaling・self-similarity・非線形拡散・長時間漸近は DREAM_THEATER_NONLINEAR_PDE_PLAN.md を canonical owner とする。
- Navier--Stokes 固有の scaling、臨界空間、Leray--Hopf 弱解、渦伸長、Prodi--Serrin は本計画を canonical owner とする。
- NS6 の核心を一般非線形 PDE 計画へ移して prerequisite 化しない。共有できる一般機構だけ相互参照する。

---

## 13. 標準学習順での位置

本科目は偏微分方程式 II の後続発展科目とする。

概念上は

~~~text
ベクトル解析 II（VC8--VC9）
          +
偏微分方程式 II（GPDE1--GPDE10）
          +
Fourier 解析
          ↓
Navier--Stokes 方程式への道
~~~

である。

標準数学コアの主幹へ強制的に挿入するか、PDE II 後の発展分岐にするかは実装開始時に dream-theater-standard-math-core.md の最新構成と照合する。

現時点の第一候補は **PDE II 修了後の発展分岐**である。

---

## 14. NS8A の更新ポリシー

NS8A は研究状況依存のため、通常の「完成したら固定」運用にしない。

### 14.1 ページ冒頭に基準日を置く

例:

> この補講の研究状況は 2026年10月4日時点。

### 14.2 更新トリガー

次のいずれかが起きた場合に status section を再確認する。

- CMI が正式な prize decision を発表。
- CMI の Navier--Stokes 問題ページが Active から変更。
- proof paper に重大な訂正・撤回・改訂。
- Lean formalization の theorem statement に重要な変更。
- 数学界の検証で公式 C/D との対応に重大な論点が生じる。

### 14.3 数学本文と status を分離する

証明の数学的内容と、prize recognition、authorship / credit、review status を同じ節で混ぜない。

数学的 theorem statement が固定できる部分は固定教材として書き、status は日付付きの短い節として独立させる。

---

## 15. 実装フェーズ

### Phase 0: canonical dependency 監査

current main で少なくとも VC8、VC9、FOU1--FOU4、GPDE3--GPDE5、GPDE10、FEM5 の stable anchor / knowledge ID を確認する。

Aubin--Lions 型コンパクト性の既存 owner がないことを再確認し、NS3 owner とするか GPDE10A へ分離するかを確定する。

### Phase 1: NS1--NS2

発散零空間、Leray 射影、Stokes 作用素、三重線形形式、基本エネルギー評価を完成させる。

### Phase 2: NS3

Galerkin、時間空間コンパクト性、Leray--Hopf 弱解を完成させる。

ここは系列最大の存在証明章の一つなので、薄く分割して題数を水増ししない。

必要なら NS3A を「Aubin--Lions 型コンパクト性」の共有補講として独立させる。

### Phase 3: NS4--NS5

二次元大域正則性、三次元局所強解、blow-up alternative、weak--strong uniqueness を完成させる。

### Phase 4: NS6--NS7

scaling、criticality、regularity criteria、vorticity stretching を完成させる。

### Phase 5: NS8

CMI official problem description を一次資料として読み、ミレニアム問題の定式化を教材化する。

### Phase 6: NS8A

2026年 proof paper と Lean formalization を直接読み、theorem statement、construction、blow-up mechanism、energy、smooth forcing、C/D mapping を教材化する。

同時に CMI の最新 status を確認する。

### Phase 7: 公開目次・依存同期

実装したページだけを

- textbook/dream-theater-index.json
- textbook/dream-theater.md
- textbook/dream-theater-standard-math-core.md
- textbook/dependency-graph.md

へ同期する。

plan 段階で未実装パスを learner-facing index に追加しない。

### Phase 8: 横断監査

- 用語
- prerequisite
- knowledge DAG
- proof owner
- forward reference
- exercise count
- 詳細解答
- 公式問題の引用・要約範囲
- NS8A の基準日・status

を監査する。

---

## 16. 用語方針

日本語として定着している語は日本語を主表記にする。

候補:

- 非圧縮 Navier--Stokes 方程式
- 発散零ベクトル場
- Leray 射影
- Stokes 作用素
- 三重線形形式
- エネルギー不等式
- Leray--Hopf 弱解
- 渦度
- 渦伸長
- 弱--強一意性
- 尺度変換
- 臨界空間
- 正則性判定
- 有限時間特異点
- 特異点形成

Leray、Hopf、Stokes、Ladyzhenskaya、Gagliardo--Nirenberg、Prodi--Serrin、Aubin--Lions など人名部分は英字表記を保持する。

blow-up は初出で「有限時間発散（blow-up）」など補助併記し、その後は日本語として自然な箇所では「有限時間発散」「特異点形成」を主に使う。

ただし論文の theorem 名や stable anchor は機械的に日本語化しない。

---

## 17. 機械検証

各実装章で変更内容に応じて少なくとも

~~~text
npm run validate
npm run validate:pages
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
~~~

を実行する。

新規章 pure-add は changed-only strict validation を原則とする。

knowledge DAG、concept registry、resolver、監査ロジックなど全体へ波及する変更を行った場合は full audit を実行する。

NS8 / NS8A は外部一次資料を使うため、リンク切れ・引用過多・時点依存記述も人手監査する。

---

## 18. 完成条件

本科目を completed とするには、少なくとも次を全て満たす。

1. VC9 の物理導出を重複せず、解析問題へ自然に移れている。
2. 発散零空間と Leray 射影を Fourier モードから構成できる。
3. 圧力消去の意味を「圧力を無視すること」と混同しない。
4. 非線形項のエネルギー消去を成分計算から証明できる。
5. Navier--Stokes で使う補間不等式を適用条件込みで使える。
6. Leray--Hopf 弱解の大域存在を Galerkin と強コンパクト性から追える。
7. 弱収束だけでは非線形項を通せない理由を説明できる。
8. 二次元大域正則性の核心を渦度エネルギーから証明できる。
9. 三次元局所強解と blow-up alternative の主要評価を再現できる。
10. 三次元で $H^1$ 評価が大域的に閉じない箇所を式で指摘できる。
11. Navier--Stokes scaling を全項へ代入して確認できる。
12. $L^3$、$L^q_tL^p_x$、$\dot H^{1/2}$ の臨界性を指数計算から説明できる。
13. Prodi--Serrin 型正則性判定の代表的証明を追える。
14. 二次元と三次元の差を渦伸長項で説明できる。
15. Clay の公式 A/B/C/D を一次資料から読み分けられる。
16. Leray--Hopf 弱解の存在と Millennium Problem の解答を同一視しない。
17. NS8A で 2026年有限時間特異点構成の theorem statement を解析論文から正確に取り出している。
18. NS8A で smooth forcing・有限 energy・finite-time singularity の各条件を本文の計算から追える。
19. 2026年結果の C/D 対応を公式 problem description と照合している。
20. C/D の決着と無外力 A/B 側を論理的に区別している。
21. Lean 形式化と CMI 認定を別の概念として説明している。
22. NS8A の研究 status に基準日を付け、CMI の最新状態と一致している。
23. 各変更章が DREAM THEATER の導入・直接例・証明粒度・演習数・詳細解答規約を満たす。
24. FEM5 など既存 canonical content を不要に再実装していない。

---

## 19. 最終的な科目像

~~~text
NS1
発散零空間
Leray 射影
Stokes 作用素
        ↓
NS2
非線形項
三重線形形式
エネルギー評価
        ↓
NS3
Galerkin
Aubin--Lions 型コンパクト性
Leray--Hopf 弱解
        ↓
NS4
2D 渦度
大域正則性
        ↓
NS5
3D 局所強解
H1 評価
blow-up alternative
        ↓
NS6
scaling
criticality
        ↓
NS7
Prodi--Serrin
渦伸長
正則性判定
        ↓
NS8
Clay 公式問題を読む
A / B / C / D
        ↓
NS8A
2026年有限時間特異点構成
解析的 proof
Lean formalization
CMI の認定状況
~~~

この系列では、最後にニュースを付け足すのではない。

NS1--NS7 で「何が難しかったのか」を自分の手で理解し、NS8 で公式問題を正確に読んだあと、NS8A で 2026年の結果を**既に学んだ解析道具を使って読む**。

これを「ミレニアム問題の入口に立つ」の完成像とする。

---

## 20. 2026-10-04 時点の外部一次資料メモ

plan 作成時点で確認した一次資料:

- OpenAI, "On the Navier--Stokes Millennium Prize Problem", 2026-09-08  
  https://openai.com/index/navier-stokes-solution/
- Clay Mathematics Institute, "Navier-Stokes Announcement", 2026-09-11  
  https://www.claymath.org/news/navier-stokes-announcement/
- Clay Mathematics Institute, "Navier-Stokes Equation" Millennium Problem page  
  https://www.claymath.org/millennium/Navier-Stokes-Equation/

この節は learner-facing 本文へそのまま転載するためのものではない。

NS8A 実装時にはリンク・日付・status を再確認し、解析論文と Lean formalization を追加してから本文を執筆する。


---

## 21. 2026-10-05 進捗

実装完了:

- 既存 ID、VC9 / FOU4 / GPDE3 の prerequisite と knowledge dependency を確認
- NS1「発散零空間・Leray 射影・Stokes 作用素」を実装
- 周期 Fourier 表示から発散零条件を導出
- Leray 射影と周期 Helmholtz 分解をモードごとに構成
- Stokes 作用素、射影後 Navier--Stokes 方程式、圧力 Poisson 方程式を導出
- NS1 に Level A 4題 / B 3題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・読む順・dependency graph・series routing を NS 系列へ接続

次作業:

- NS2「非線形項・三重線形形式・エネルギー評価」

---

## 22. 2026-10-05 NS2 進捗

実装完了:

- NS2「非線形項・三重線形形式・エネルギー評価」を実装
- 発散零エネルギー空間 V と周期平均零場の Poincaré 型評価を Fourier 表示から導出
- GPDE5 の Sobolev 不等式から周期 L6 評価を構成し、Hölder の不等式で L4 補間評価を途中式付きで導出
- 三重線形形式 b(u,v,w) を定義し、反対称性 b(u,v,w)=-b(u,w,v) と b(u,v,v)=0 を周期部分積分から証明
- 発散零仮定を失うとエネルギー相殺が壊れる具体例を追加
- Leray 射影後の方程式から滑らかな解の基本エネルギー恒等式、外力付き評価、無外力での指数減衰を導出
- 有限時間エネルギー階級 L-infinity(0,T;H) intersect L2(0,T;V) を明示し、三次元大域正則性には基本評価だけでは不足する点を分離
- NS2 に Level A 5題 / B 4題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・読む順・dependency graph・series routing を NS2 完了へ同期

次作業:

- NS3「Leray--Hopf 弱解と大域存在」


---

## 23. 2026-10-05 NS3 進捗

実装完了:

- NS3「Leray--Hopf 弱解と大域存在」を実装
- Fourier--Galerkin 近似を有限次元 ODE として構成し、NS2 のエネルギー相殺から次元に依らない大域評価を導出
- 非線形項を V* で評価し、時間微分の L^(4/3)(0,T;V*) 一様評価を指数計算つきで導出
- Fourier 低周波射影、高周波尾部評価、低周波係数の時間等連続性、Arzelà--Ascoli を組み合わせ、周期版 Aubin--Lions 型コンパクト性を NS3 内で証明
- L2_t H 強収束から u_m tensor u_m の L1 強収束を導き、二次非線形項の極限を処理
- 時間積分弱形式から初期値を回収し、極限解の C_w([0,T];H) 弱連続性を確認
- 弱収束に対するノルムの liminf 評価から Galerkin エネルギー恒等式を Leray--Hopf エネルギー不等式へ移行
- 任意有限時間区間の構成と対角部分列により三次元周期 Navier--Stokes の大域弱解存在を証明
- 大域弱解の存在、弱解一意性、大域正則性を明確に分離
- NS3 に Level A 4題 / B 3題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・読む順・dependency graph・series routing を NS3 完了へ同期

次作業:

- NS4「二次元 Navier--Stokes はなぜ大域的に制御できるか」


---

## 24. 2026-10-05 NS4 進捗

実装完了:

- NS4「二次元 Navier--Stokes はなぜ大域的に制御できるか」を実装
- 二次元スカラー渦度を導入し、速度方程式の成分微分から渦度方程式を途中式付きで導出
- 発散零 Fourier モードから速度--渦度再構成を導き、||grad u||_2=||omega||_2、||Au||_2=||grad omega||_2 を証明
- 二次元周期 Ladyzhenskaya 型評価を一変数基本定理、Fubini、Cauchy--Schwarz、周期カットオフ、Poincaré 評価から導出
- 渦度 L2 エネルギーから L-infinity_t H1 と L2_t H2 の大域評価を導出
- 二つの Leray--Hopf 弱解の差に二次元 L4 評価を適用し、積分因子まで展開して弱解一意性を証明
- Galerkin 近似を一段強い空間へ持ち上げ、非線形項と時間微分の L2_t H 評価から二次元大域強解を構成
- 滑らかなデータに対する高階エネルギー bootstrap の機構を整理し、有限時間で正則性を失わない理由を説明
- 二次元場の三次元埋め込みから (omega dot grad)u=0 を直接確認し、三次元渦度エネルギーでは渦伸長項が残ることを数式で比較
- NS4 に Level A 5題 / B 4題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・標準数学コア・dependency graph・series routing を NS4 完了へ同期

次作業:

- NS5「三次元局所強解・一意性・有限時間発散判定」


---

## 25. 2026-10-05 NS5 進捗

実装完了:

- NS5「三次元局所強解・一意性・有限時間発散判定」を実装
- 強解を C([0,T];V)・L2_t D(A)・時間微分 L2_t H で定義し、滑らかなせん断流で条件を直接確認
- Au で試した H1 エネルギー式を導き、L6-L3-L2 の Hölder、L3 補間、周期 Sobolev、Fourier 表示をつないで |b(u,u,Au)| <= C||grad u||_2^(3/2)||Au||_2^(3/2) を証明
- Young の共役指数 4/3 と 4 を明示し、y=||grad u||_2^2 に対する y' <= C_nu y^3 + forcing を導出
- Galerkin 近似を first-hitting-time bootstrap で短時間 L-infinity_t V / L2_t D(A) に一様制御
- 非線形項の L2_t H 評価から時間微分 L2_t H を得て、Fourier 高低周波分解で L2_t V 強収束を構成し局所強解を得る流れを実装
- 二つの強解の差に三次元 L4 評価を適用し、Gronwall の不等式で強解一意性を証明
- 最大強解存在時間を定義し、有限最大時刻で H1 ノルムが有界なら一様局所存在時間で再出発できることから blow-up alternative を証明
- int ||grad u||_2^4 dt が有限なら延長できる積分型 H1 continuation criterion を導出
- 強解のエネルギー等号、Leray--Hopf 弱解のエネルギー不等式、交差項の式から相対エネルギーを作り、weak--strong uniqueness を証明
- NS5 に Level A 5題 / B 4題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・標準数学コア・dependency graph・series routing を NS5 完了へ同期

次作業:

- NS6「スケーリング・臨界性・どのノルムを見るべきか」


---

## 26. 2026-10-05 NS6 進捗

実装完了:

- NS6「スケーリング・臨界性・どのノルムを見るべきか」を実装
- 連続 scaling を正確に扱うため、周期領域から全空間 R^3 へ移る理由を明示
- u_lambda(x,t)=lambda u(lambda x,lambda^2 t)、p_lambda(x,t)=lambda^2 p(lambda x,lambda^2 t) を時間微分・対流項・圧力勾配・Laplacian・発散条件へ直接代入し、Navier--Stokes の尺度不変性を証明
- Lp ノルムの尺度指数 1-3/p を変数変換から導き、L2 が超臨界、L3 が臨界、p>3 が劣臨界であることを定義から整理
- エネルギーと粘性散逸がともに lambda^(-1) で変換されることを示し、エネルギー恒等式は尺度整合的でもエネルギー階級自体は三次元で超臨界であることを説明
- 時空間 Lq_t Lp_x の尺度指数 1-3/p-2/q を導き、2/q+3/p=1 の臨界線を確認
- FOU4 の Fourier 規約を三次元へ拡張し、斉次 Sobolev ノルムを最小導入
- Fourier 変換から ||u_lambda||_{dot H^s}=lambda^(s-1/2)||u||_{dot H^s} を導き、dot H^(1/2) が臨界、dot H^1 が劣臨界であることを証明
- scaling が「見るべき量」を示す一方、臨界ノルム有限性から正則性を得るには追加の非線形評価が必要であることを NS7 への接続として明示
- NS6 に Level A 5題 / B 4題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・標準数学コア・dependency graph・series routing を NS6 完了へ同期

次作業:

- NS7「正則性判定・渦伸長・何が特異点を防ぐのか」


---

## 27. 2026-10-05 NS7 進捗

実装完了:

- NS7「正則性判定・渦伸長・何が特異点を防ぐのか」を実装
- 3<p<infinity に対し r=2p/(p-2)、theta=3/p を指数計算から導き、Hölder と L2-L6 補間から Prodi--Serrin 型非線形項評価を構成し、p=infinity は直接評価で処理
- Young の共役指数 2/(1+theta)、2/(1-theta) を明示し、3<p<infinity では q_c=2p/(p-3)、p=infinity では q_c=2 として H1 の線形 Gronwall 型評価を導出
- 2/q+3/p<=1 の Prodi--Serrin 条件から三次元周期最大強解の延長判定を証明し、有限最大時刻では対応する Lq_t Lp_x ノルムが発散することを確認
- p=3, q=infinity の端点では同じ Young 吸収が退化し、単純 H1 エネルギー法だけでは一般の有限 L-infinity_t L3_x を扱えないことを分離
- 三次元渦度を導入し、交代記号と Kronecker delta の成分恒等式から curl((u dot grad)u)=(u dot grad)omega-(omega dot grad)u を導出
- 三次元渦度方程式と渦度 L2 エネルギーを導き、二次元では消える渦伸長項が三次元で残る位置を明示
- 速度勾配の対称部分だけが omega^T grad(u) omega に寄与することを示し、発散零 affine 場で伸長・圧縮を直接計算
- int ||grad u||_infinity dt による尺度臨界延長判定を渦度エネルギーと H1 blow-up alternative から証明
- Leray--Hopf 弱解、weak--strong uniqueness、Prodi--Serrin 型判定を接続し、追加積分可能性の下で弱解が強解として一意になることを証明
- NS7 に Level A 5題 / B 4題 / C 1題と全問詳細解答を追加
- DREAM THEATER 目次・標準数学コア・dependency graph・series routing を NS7 完了へ同期

次作業:

- NS8「ミレニアム問題の公式定式化を読む」
