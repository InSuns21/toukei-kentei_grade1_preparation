# DREAM THEATER：複素解析 II（CA7--CA12）実装計画

作成日: 2026-09-22

## 0. この計画の目的

既存の CA1--CA6 は、複素微分、Cauchy--Riemann 方程式、複素線積分、Cauchy--Goursat、Cauchy 積分公式、Taylor / Laurent 展開、孤立特異点、留数、偏角原理、Rouché の定理、winding number、解析接続、monodromy、Möbius 変換、Schwarz の補題、調和関数、Poisson 核までを現行 DREAM THEATER 規約で扱っている。

一方、その先の

- 正則関数列・正規族
- Riemann 写像定理
- Riemann 面・被覆
- 楕円関数
- 無限積・整関数／有理型関数の構成
- Gamma 関数
- Riemann ζ 関数

は現行主線に canonical owner がない。

そこで CA1--CA6 を **複素解析 I：局所理論・Cauchy 理論・留数・解析接続・調和解析**、CA7--CA12 を **複素解析 II：大域正則関数論・Riemann 面・楕円関数・特殊関数** と位置付け、学部数学科の標準的な後半複素解析を独習で再構成できる系列として実装する。

新系列の主線は

~~~text
CA6
 ↓
CA7 正則関数列・正規族・Riemann 写像
 ├──────────────┐
 ↓              ↓
CA8 Riemann 面   CA10 無限積・Weierstrass・Mittag--Leffler
 ↓              ↓
CA9 楕円関数     CA11 Gamma 関数
                 ↓
               CA12 Riemann ζ 関数
~~~

とする。

実装順は読者の通読順に合わせて **CA7 → CA8 → CA9 → CA10 → CA11 → CA12** とするが、章間依存は上図の DAG を正本とし、CA10 に CA8 / CA9 を不要に要求しない。

---

## 1. 既存 CA1--CA6 との役割分担

### 1.1 CA1--CA6 で再実装しないもの

CA7 以降では次を再定義・再証明しない。

- 複素微分可能性、正則性、Cauchy--Riemann 方程式：CA1
- 複素線積分、Cauchy--Goursat、単連結領域の Cauchy の定理、正則対数：CA2
- Cauchy 積分公式、Cauchy 評価、Taylor 展開、Liouville、恒等定理、最大値原理：CA3
- Laurent 展開、孤立特異点、留数、偏角原理、Rouché：CA4
- winding number、一般閉曲線版留数定理、解析接続、monodromy：CA5
- Riemann 球面、Möbius 変換、Schwarz の補題、調和関数、Poisson 核：CA6

後続章でこれらを使うときは、章トップではなく canonical stable anchor へ直接リンクし、現在の対象が仮定を満たすことを局所的に確認する。

### 1.2 位相・Fourier との分担

Riemann 面の基礎位相では既存の

- TOP1：積位相・商位相
- TOP2：同一視空間・トーラス
- TOP3：連結性
- TOP4：Hausdorff 性・第二可算性
- TOP5：コンパクト性

を利用する。

CA8 では一般位相を再構築せず、「複素1次元多様体としての Riemann 面」に必要な部分だけを座標と正則遷移写像へ接続する。

CA12 の theta 変換では FOU3 の Gaussian の Fourier 変換を canonical dependency とする。一般の Poisson 和公式を未実装のまま仮定せず、CA12 内では **Gaussian に必要な周期化版だけを Fourier 級数から証明**する。

---

## 2. 新系列の共通完成条件

各 CA7--CA12 は DREAM THEATER として、少なくとも次を満たす。

- 主役となる定義には条件を直接検証する例を置く。
- formal statement は対象・仮定・結論を単独で確定できるようにする。
- 後続章が依存する主要定理は、本文または明示した canonical dependency で核心証明まで閉じる。
- 「標準的」「同様」「よく知られている」で核心論証を飛ばさない。
- コンパクト性、一様収束、正規収束、積分交換、極限交換、商位相、被覆性など、使う仮定が何を可能にするかを局所的に示す。
- 反例では、結論が偽になるだけでなく、失った仮定と壊れた証明機構を説明する。
- 各章の実本文に原則 **Level A 4題 / Level B 3題 / Level C 1題**を置き、全問に詳細解答を付ける。
- 本番答案・20点採点基準は新規追加しない。
- 日本語として定着した一般概念は日本語を主表記にする。
- 人名由来は英字を保持し、「Riemann 写像定理」「Montel の定理」「Hurwitz の定理」「Weierstrass の積」「Mittag--Leffler の定理」のように一般名詞側を日本語にする。

---

## 3. CA7 正則関数列・正規族・Riemann 写像定理

**仮タイトル**：標準複素解析 VII：正則関数列・正規族・Riemann 写像定理

**tier**：core-advanced-standard

**prerequisites**：

- CA6
- TOP5

### 3.1 役割

CA1--CA6 の「一つの正則関数」の理論から、「正則関数族の極限」へ進む。

Riemann 写像定理を名前だけ紹介せず、

~~~text
コンパクト集合上一様収束
  ↓ Cauchy積分公式・Cauchy評価
極限の正則性・導関数列の収束
  ↓
局所有界族の同程度連続性
  ↓ コンパクト集合上の部分列抽出 + 対角化
Montel の定理
  ↓
Hurwitz の定理
  ↓ 極値問題 + Schwarz の補題
Riemann 写像定理
~~~

を一つの論理鎖として閉じる。

### 3.2 主な内容

- コンパクト集合上一様収束／局所一様収束
- 正則関数列の局所一様極限
- 微分列の局所一様収束
- 正則関数級数の正規収束
- 局所有界な正則関数族
- 正規族
- Cauchy 評価による同程度連続性
- コンパクト集合上の部分列抽出補題
- コンパクト exhaustion と対角化
- Montel の定理
- Hurwitz の定理
- 単射正則関数列の極限
- Riemann 写像定理
- 正規化した Riemann 写像の一意性
- Schwarz の鏡像原理

### 3.3 主要 formal statements

少なくとも次を canonical theorem とする。

1. 正則関数列の局所一様極限は正則。
2. 導関数列も各コンパクト集合上一様収束する。
3. 正規収束する正則関数級数は正則で、項別微分できる。
4. **Montel の定理**：領域上局所有界な正則関数族は正規族。
5. **Hurwitz の定理**。
6. 単射正則関数列の非定数局所一様極限は単射。
7. **Riemann 写像定理**：空でない単連結真部分領域 $\Omega\subsetneq\mathbb C$ は単位円板と双正則。
8. 基点と微分の向きを固定した Riemann 写像の一意性。
9. **Schwarz の鏡像原理**の標準形。

### 3.4 証明境界

Montel の定理で一般 Arzelà--Ascoli 定理を未導入のまま黒箱にしない。複素解析で必要な範囲に限定して、

- 閉円板上の一様有界性
- Cauchy 評価による同程度連続性
- 有限 $\varepsilon$-net
- 点列部分列抽出
- exhaustion と対角化

を本文中で証明する。

Riemann 写像定理は「既知」とせず、標準的な extremal argument を核心まで証明する。

- まず単連結真領域から単位円板への単射正則写像が少なくとも一つ存在することを、正則平方根／Möbius 変換を使って構成する。
- 基点 $a\in\Omega$ を固定し、$f(a)=0$ の単射正則写像族で $|f'(a)|$ を最大化する。
- Montel で極値写像を得る。
- Hurwitz で単射性を極限へ移す。
- 像が円板全体でないと仮定し、平方根を使う変形で $|f'(a)|$ を改善して矛盾する。

### 3.5 直接例

- $f_n(z)=z^n$ の単位円板内と閉単位円板上での収束差。
- 幾何級数を正規収束する正則関数級数として扱う例。
- 円板自己同型族で Montel を確認する例。
- 零点が極限でどう振る舞うかを見る Hurwitz の直接例。
- 上半平面、帯領域、半平面から円板への具体的双正則写像。

### 3.6 演習の柱

- 局所一様収束と一様収束の区別。
- Cauchy 評価から導関数列を制御。
- 正規族の部分列抽出。
- Hurwitz による零点の安定性。
- Riemann 写像定理の一意性。
- Schwarz 鏡像原理で関数を延長。
- Level C：Riemann 写像定理の extremal proof を主要補題込みで再構成。

---

## 4. CA8 Riemann 面・被覆・多価関数

**仮タイトル**：標準複素解析 VIII：Riemann 面・被覆・多価関数

**tier**：advanced-standard

**prerequisites**：

- CA7
- TOP1
- TOP2
- TOP4
- TOP5

### 4.1 役割

CA5 で「平面領域上の解析接続」として扱った monodromy を、複素座標を持つ空間上の幾何として再解釈する。

本章で初めて Riemann 面を canonical に定義し、平方根・対数・複素トーラスが「多価関数のごまかし」ではなく通常の正則関数として扱える空間を作る。

### 4.2 主な内容

- 複素1次元の座標近傍
- 正則 atlas
- Riemann 面
- 正則写像・双正則写像
- Riemann 球面の座標による再解釈
- Riemann 面上の有理型関数
- 零点・極・位数の座標不変性
- 正則微分 $f(z)\,dz$ の入口と座標変換
- 被覆写像
- path lifting / homotopy lifting の必要な範囲
- 正則被覆
- 対数の Riemann 面
- 平方根の Riemann 面
- 解析接続と被覆の関係
- 複素トーラス $\mathbb C/\Lambda$
- 商位相から Riemann 面 atlas を作る手順
- compact Riemann surface 上の正則関数の剛性

### 4.3 主要 formal statements

1. Riemann 面上の正則性が座標選択に依存しない。
2. 零点・極の位数は座標不変。
3. Riemann 球面は Riemann 面であり、球面上の有理型関数は通常の有理関数と一致する。
4. path lifting の一意性。
5. 被覆に沿う解析接続の一意性。
6. 対数・平方根の標準 Riemann 面の構成。
7. 格子 $\Lambda\subset\mathbb C$ に対する $\mathbb C/\Lambda$ がコンパクト Riemann 面になる。
8. 連結コンパクト Riemann 面から $\mathbb C$ への正則関数は定数。

### 4.4 証明境界

一般多様体論を prerequisite にしない。

Riemann 面は

- Hausdorff
- 第二可算
- 各点が $\mathbb C$ の開集合と同相な近傍を持つ
- 座標遷移が正則

という定義から始める。

被覆空間の基本群による完全分類、deck transformation の一般論、普遍被覆の一般存在定理は本章の必須主線へは入れない。必要な lifting は局所自明化と区間のコンパクト性から証明する。

### 4.5 直接例

- Riemann 球面の二枚の標準 chart。
- $\log z$ の Riemann 面。
- $w^2=z$ の平方根曲面。
- $\mathbb C/(\mathbb Z+\tau\mathbb Z)$ の基本平行四辺形。
- compact Riemann surface 上の最大値原理。

### 4.6 停止線

次は将来の複素幾何／代数幾何系列へ送る。

- sheaf / stalk の一般論
- divisor の一般論
- Riemann--Roch theorem
- genus の一般論
- Abel--Jacobi
- algebraic curve の一般理論
- uniformization theorem

---

## 5. CA9 楕円関数・Weierstrass $\wp$ 関数

**仮タイトル**：標準複素解析 IX：楕円関数・複素トーラス・Weierstrass $\wp$

**tier**：advanced-standard

**prerequisites**：

- CA8
- CA7

### 5.1 役割

「周期が一つ」の三角関数から「独立な二周期」を持つ有理型関数へ進み、コンパクト Riemann 面 $\mathbb C/\Lambda$ 上の有理型関数として楕円関数を理解する。

### 5.2 主な内容

- 格子 $\Lambda=\mathbb Z\omega_1+\mathbb Z\omega_2$
- 基本平行四辺形
- 楕円関数
- 基本領域上の極・零点の有限性
- 基本平行四辺形境界での積分相殺
- 楕円関数の留数和は0
- 零点数と極数の一致
- 非定数楕円関数は極を持つ
- Weierstrass の $\wp$ 級数
- 級数の正規収束
- $\wp$ の偶性・二重極・周期性
- $\wp'$ の奇性
- 半周期点
- invariants $g_2,g_3$
- 微分方程式
  $$
  (\wp')^2=4\wp^3-g_2\wp-g_3
  $$
- 加法公式
- $\mathbb C/\Lambda$ と平面三次曲線の対応の入口

### 5.3 主要 formal statements

1. 非定数楕円関数は基本平行四辺形内に極を持つ。
2. 基本平行四辺形内の留数和は0。
3. 零点と極の総重複度は一致する。
4. Weierstrass $\wp$ 級数は格子点を除いて正規収束する。
5. $\wp$ は $\Lambda$-周期を持つ偶な有理型関数で、格子点に二重極を持つ。
6. $(\wp')^2=4\wp^3-g_2\wp-g_3$。
7. $\wp$ の標準加法公式。
8. 適切な非退化条件の下で $z\mapsto(\wp(z),\wp'(z))$ が複素トーラスと cubic の関係を与える。

### 5.4 証明境界

$\wp$ の定義で級数を「収束することにする」としない。格子点の個数評価と $1/|\omega|^3$ 型 majorant を用いて、コンパクト集合上の一様収束を確認する。

微分方程式は Laurent 展開と楕円関数の極消去から「差が entire elliptic なので定数」という機構まで示す。

### 5.5 直接例

- 正方格子と六方格子。
- 基本平行四辺形の境界積分相殺。
- $\wp$ の原点近傍 Laurent 展開。
- 半周期での $\wp'$ の零点。
- $g_2,g_3$ と cubic の具体形。

### 5.6 停止線

- Jacobi elliptic functions の体系的理論
- modular forms
- modular group の基本領域
- complex multiplication
- elliptic curve arithmetic

は必須主線へは入れない。

---

## 6. CA10 無限積・Weierstrass 因数分解・Mittag--Leffler

**仮タイトル**：標準複素解析 X：無限積・Weierstrass 因数分解・Mittag--Leffler

**tier**：advanced-standard

**prerequisites**：

- CA7
- CA4

### 6.1 役割

Taylor / Laurent 展開が「与えられた関数を展開する」理論だったのに対し、本章では **零点や極を指定して正則関数・有理型関数そのものを構成する**。

### 6.2 主な内容

- 数の無限積
- 関数の無限積
- コンパクト集合上一様収束
- 無限積と零点
- elementary factor
  $$
  E_p(w)=(1-w)\exp\left(w+\frac{w^2}{2}+\cdots+\frac{w^p}{p}\right)
  $$
- canonical product
- 離散零点集合と重複度
- Weierstrass 因数分解定理
- 零点を持たない整関数の指数表示
- 指定した principal part
- Mittag--Leffler の定理
- $\pi\cot\pi z$ の部分分数展開
- $\sin \pi z$ の Euler 積
- 整関数・有理型関数を零点／極データから読む方法

### 6.3 主要 formal statements

1. 無限積の局所一様収束判定。
2. elementary factor の誤差評価。
3. 任意の離散零点集合と重複度を持つ整関数の存在。
4. **Weierstrass 因数分解定理**。
5. 零点を持たない整関数は $e^{g}$ と書ける。
6. **Mittag--Leffler の定理**。
7. $\pi\cot\pi z$ の標準部分分数展開。
8. Euler の積
   $$
   \frac{\sin\pi z}{\pi z}
   =
   \prod_{n=1}^{\infty}
   \left(1-\frac{z^2}{n^2}\right).
   $$

### 6.4 証明境界

Weierstrass 因数分解と Mittag--Leffler を「存在定理」とだけ述べない。

Weierstrass では elementary factor が所与のコンパクト集合上で tail を制御する仕組みを示す。

Mittag--Leffler では、極が外側へ逃げる順に並べ、各 principal part から低次 Taylor 多項式を差し引いて内側 compact 上の tail を一様小さくする構成を追う。

### 6.5 直接例

- 零点が整数全体の整関数。
- $\sin \pi z$ の零点構造。
- 所与の単純極列を持つ有理型関数。
- $\pi\cot\pi z$ の留数。
- Euler 積から $\sum 1/n^2$ が現れる入口。

### 6.6 停止線

- Hadamard factorization の有限位数一般論
- Runge の近似定理
- Mergelyan の定理
- Picard の定理
- Nevanlinna 理論

は CA10 の必須完成条件には含めない。将来「複素近似・値分布」枝を独立させる候補とする。

---

## 7. CA11 Gamma 関数

**仮タイトル**：標準複素解析 XI：Gamma 関数・反射公式・Stirling 公式

**tier**：advanced-standard

**prerequisites**：

- CA10
- CA7

### 7.1 役割

特殊関数を公式集として紹介せず、正則性、解析接続、無限積、留数という CA1--CA10 の理論が一つの具体的関数に集約されることを示す。

### 7.2 主な内容

- Euler 積分
  $$
  \Gamma(z)=\int_0^\infty t^{z-1}e^{-t}\,dt
  \qquad(\Re z>0)
  $$
- 右半平面での正則性
- 関数等式 $\Gamma(z+1)=z\Gamma(z)$
- 階乗との対応
- $\Gamma(1/2)=\sqrt\pi$
- 有理型解析接続
- 非正整数での単純極と留数
- Gamma 関数の零点不存在
- $1/\Gamma$ の Weierstrass 積
- Euler 定数
- Beta 関数との関係
- Euler の反射公式
- Legendre の倍角公式
- Stirling 公式
- 必要に応じて digamma 関数を補助的に使用

### 7.3 主要 formal statements

1. Euler 積分は $\Re z>0$ で正則。
2. $\Gamma(z+1)=z\Gamma(z)$。
3. Gamma 関数は全平面へ有理型に延長され、$0,-1,-2,\ldots$ に単純極を持つ。
4. $1/\Gamma$ の Weierstrass 積。
5. Gamma 関数は零点を持たない。
6. **Euler の反射公式**
   $$
   \Gamma(z)\Gamma(1-z)=\frac{\pi}{\sin\pi z}.
   $$
7. **Legendre の倍角公式**。
8. **Stirling 公式**。少なくとも正の実軸上の形を核心証明し、複素 sector 版の適用範囲も明示する。

### 7.4 証明境界

反射公式は「既知の特殊関数公式」としない。CA10 の $\sin$ の積または留数を使い、どの積表示を比較しているかを示す。

Stirling 公式は係数 $\sqrt{2\pi}$ を未決定のまま終えない。

### 7.5 直接例

- $\Gamma(n+1)=n!$。
- Gaussian 積分から $\Gamma(1/2)=\sqrt\pi$。
- $\operatorname{Res}(\Gamma,-n)=(-1)^n/n!$。
- 反射公式から半整数値を計算。
- Stirling 公式による $n!$ の近似。

### 7.6 補遺候補

Bohr--Mollerup theorem は実解析的特徴付けとして教育価値があるが、複素解析の主線ではないため補遺扱いとする。

---

## 8. CA12 Riemann ζ 関数・theta 変換・関数等式

**仮タイトル**：標準複素解析 XII：Riemann ζ 関数・Euler 積・解析接続・関数等式

**tier**：advanced-standard

**prerequisites**：

- CA11
- FOU2
- FOU3
- F0-00D2C

### 8.1 役割

複素解析 II の終点として、

~~~text
Dirichlet級数
  ↓ 絶対収束
Euler積
  ↓
素数と複素関数の接続

Gaussian Fourier変換
  ↓ 周期化
theta変換
  ↓ Mellin変換
ζの解析接続
  ↓
関数等式
~~~

を閉じる。

### 8.2 主な内容

- Dirichlet 級数
  $$
  \zeta(s)=\sum_{n=1}^{\infty}n^{-s},
  \qquad \Re s>1
  $$
- 絶対・局所一様収束
- 正則性
- Euler 積
- $\Re s>1$ での零点不存在
- 交代級数 $\eta(s)$ による $\Re s>0$ への入口
- Jacobi theta 関数
  $$
  \theta(t)=\sum_{n\in\mathbb Z}e^{-\pi n^2 t}
  $$
- Gaussian の周期化
- Gaussian に対する Poisson 型和公式
- theta 変換
  $$
  \theta(t)=t^{-1/2}\theta(1/t)
  $$
- Mellin 表現
- ζ の有理型解析接続
- $s=1$ の単純極と留数1
- completed zeta
- 関数等式
- trivial zeros
- $\zeta(0),\zeta(-1),\zeta(2)$ 等の標準値
- 非自明零点と critical strip の位置付け
- Riemann hypothesis は定義と背景のみ

### 8.3 主要 formal statements

1. $\Re s>1$ で ζ の Dirichlet 級数は局所一様絶対収束し正則。
2. **Euler 積**
   $$
   \zeta(s)=\prod_p(1-p^{-s})^{-1}.
   $$
3. $\Re s>1$ で ζ は零点を持たない。
4. Gaussian 周期化から theta 変換を導ける。
5. theta の Mellin 表現から ζ は $\mathbb C\setminus\{1\}$ へ正則に延長し、$s=1$ に留数1の単純極を持つ。
6. **Riemann ζ 関数の関数等式**。
7. 負の偶数が trivial zero である。
8. completed zeta の対称性。
9. $\zeta(2)=\pi^2/6$ を CA10 の Euler 積または Fourier 正本へ接続して導く。

### 8.4 証明境界

一般 Poisson 和公式を未証明のまま呼ばない。

CA12 では FOU3 の Gaussian Fourier 変換を使い、

- Gaussian を周期化する。
- FOU2 の Fourier 係数計算を適用する。
- 係数が再び Gaussian になることを確認する。
- $x=0$ で評価して theta 変換を得る。

という特殊形を本文で閉じる。

Mellin 表現では和と積分の交換条件を F0-00D2C の Tonelli / Fubini へ直接リンクし、$t\to0$ と $t\to\infty$ の積分を theta 変換で分けて解析接続する。

### 8.5 直接例

- $\zeta(2)$ の数値・厳密値。
- Euler 積を有限素数で打ち切った近似。
- theta 変換の $t=1$ における自己双対性。
- $s=0,-1,-2$ の値・零点。
- 関数等式で $s$ と $1-s$ を対応させる例。

### 8.6 停止線

- 素数定理の完全証明
- zero-free region
- Riemann--von Mangoldt formula
- universality
- L-functions の一般論
- modular forms
- Riemann hypothesis の証明論

は本章の必須主線には入れない。

---

## 9. 章間依存の設計

実装時の直接 prerequisite は原則次とする。

~~~text
CA7:  CA6, TOP5

CA8:  CA7, TOP1, TOP2, TOP4, TOP5

CA9:  CA8, CA7

CA10: CA7, CA4

CA11: CA10, CA7

CA12: CA11, FOU2, FOU3, F0-00D2C
~~~

既に推移的に到達できる prerequisite を機械的に大量列挙しない。ただし、章内で theorem-level dependency を直接使う場合は stable anchor link を置く。

CA10 を CA9 の後に実装するが、CA9 を prerequisite にしない。これにより、

~~~text
Riemann面・楕円関数 branch
CA7 → CA8 → CA9

整関数・特殊関数 branch
CA7 → CA10 → CA11 → CA12
~~~

という二本の自然な読書経路も保つ。

---

## 10. 演習設計

各章で A4 / B3 / C1 を最低ラインとする。

### CA7

- A：局所一様収束、Cauchy 評価、導関数列
- B：Montel / Hurwitz の適用、円板自己同型族
- C：Riemann 写像定理の extremal proof 再構成

### CA8

- A：chart・遷移写像・正則性
- B：対数／平方根 Riemann 面、複素トーラス
- C：被覆と解析接続を使う monodromy 再解釈

### CA9

- A：格子・基本平行四辺形・周期性
- B：$\wp$ の収束、零点・極・留数
- C：$\wp$ の微分方程式または加法公式

### CA10

- A：無限積の収束、elementary factor
- B：零点指定、principal part 指定、cotangent 展開
- C：Weierstrass / Mittag--Leffler の構成を用いて Euler 積まで導く

### CA11

- A：Gamma の漸化式、特殊値、極・留数
- B：積表示、反射公式、倍角公式
- C：Stirling 公式の主要導出

### CA12

- A：Dirichlet 級数、Euler 積、特殊値
- B：theta 変換、解析接続、関数等式
- C：theta Mellin 法から解析接続と関数等式を一続きで再構成

題数を満たすためだけの類題増殖はしない。各章の主要 learning objective を実際に使わせる。

---

## 11. 実装フェーズ

### Phase 0：計画のみ

本計画書を追加する。

この時点では未実装の CA7--CA12 を

- textbook/dream-theater-index.json
- reader-facing 目次
- knowledge DAG の implemented concept
- 「完成済み」一覧

へ先行登録しない。

### Phase 1：CA7 ✅

1. chapter.yaml ✅
2. index.md ✅
3. A4/B3/C1 + 詳細解答 ✅
4. stable anchors ✅
5. validation / pedagogy audit ✅
6. reader-facing index 反映 ✅
7. merge ✅

CA7 は CA8--CA12 全体の解析的コンパクト性の床なので、独立した品質ゲートを置く。

**現在地（2026-09-22）**：CA7 は本文・演習・詳細解答・stable anchor・knowledge/glossary・reader-facing index まで実装済み。Riemann 写像定理は Montel の定理、Hurwitz の定理、正則平方根、極値法を用いて核心証明まで閉じた。PR #353 は全 CI green を確認して squash merge 済み。次は Phase 2 の CA8「Riemann 面・被覆・多価関数」へ進む。

### Phase 2：CA8 ✅

1. chapter.yaml ✅
2. index.md ✅
3. A4/B3/C1 + 詳細解答 ✅
4. stable anchors ✅
5. knowledge / glossary ✅
6. reader-facing index / standard math core 反映 ✅
7. PR #359 ✅
8. validation / pedagogy audit ✅
9. merge 準備完了 ✅

Riemann 面・被覆・複素トーラスを実装し、TOP1/TOP2/TOP4/TOP5 への theorem-level link を整備した。対数・平方根の多価性は正則被覆上の一価正則関数として構成し、経路持ち上げ・ホモトピー持ち上げから CA5 のモノドロミーを幾何的に再解釈する。複素トーラスは商位相からアトラス、Hausdorff 性、第二可算性、コンパクト性まで証明する。

**現在地（2026-09-22）**：CA8 の本文・演習・詳細解答・stable anchor・knowledge/glossary・reader-facing index を実装済み。PR #359 で Pages / textbook / terminology / DREAM THEATER concepts / exercises / standard math core の各 workflow が green、proof pedagogy / formalism pedagogy も green。次工程は Phase 3 の CA9「楕円関数・Weierstrass $\wp$ 関数」。

### Phase 3：CA9 ✅

1. chapter.yaml ✅
2. index.md ✅
3. A4/B3/C1 + 詳細解答 ✅
4. stable anchors ✅
5. knowledge / glossary ✅
6. reader-facing index / standard math core 反映 ✅
7. validation / pedagogy audit ✅
8. PR #362 / squash merge ✅

楕円関数と Weierstrass $\wp$ を実装し、CA8 の複素トーラスを実際に canonical dependency として使用する。基本平行四辺形の対辺積分相殺、留数和0、零点・極の総重複度一致から始め、格子点個数評価と $\sum |\omega|^{-3}$ majorant により $\wp$ 級数の正規収束を閉じた。Laurent 展開から $g_2,g_3$ と微分方程式を導き、半周期・判別式非零・加法公式・非特異三次曲線との対応の入口まで実装した。

**現在地（2026-09-22）**：CA9 は本文・演習 A4/B3/C1・詳細解答・stable anchor・knowledge/glossary・reader-facing index・standard math core の同期まで完了。PR #362 で Pages / textbook / terminology / DREAM THEATER concepts / exercises / standard math core を green にし、通常CIに含まれる proof pedagogy / formalism pedagogy も通過した。次工程は Phase 4 の CA10「無限積・Weierstrass 因数分解・Mittag--Leffler」。

### Phase 4：CA10

無限積・Weierstrass 因数分解・Mittag--Leffler を実装する。

### Phase 5：CA11

Gamma 関数を実装し、CA10 の積表示が実際に特殊関数へ接続されることを確認する。

### Phase 6：CA12

Riemann ζ 関数を実装し、FOU2/FOU3 との横断リンクを完成させる。

### Phase 7：横断監査

- CA7--CA12 の読順
- CA1--CA6 からの forward link
- FOU2/FOU3 との cross-link
- TOP 系との prerequisite
- 日本語用語
- stable anchors
- chapter.yaml / index / DAG の同期

をまとめて監査する。

---

## 12. 機械検証

各変更章について最低限

~~~bash
npm run validate
npm run validate:pages
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
~~~

を通す。

knowledge / standard math core / dependency を変更した場合は対応する strict validation も実行する。

CI green は必要条件であり、完成の十分条件ではない。特に CA7 の Riemann 写像定理、CA9 の $\wp$ の収束と微分方程式、CA10 の二大存在定理、CA12 の解析接続と関数等式は、本文を人手で追って核心証明が閉じているかを確認する。

---

## 13. この系列を完了したときの到達点

CA1--CA12 を通読した学習者が、少なくとも次を自力で再構成できる状態を完成条件とする。

1. 正則関数の局所理論から Cauchy 理論・留数理論までを証明付きで扱える。
2. 正則関数列の compact convergence が Cauchy 理論によって強く制御されることを説明できる。
3. Montel / Hurwitz を使って Riemann 写像定理を証明できる。
4. 多価関数を Riemann 面上の一価正則関数として読み替えられる。
5. 複素トーラス上の有理型関数として楕円関数を扱い、Weierstrass $\wp$ の微分方程式を導ける。
6. 零点・極を指定して整関数・有理型関数を構成できる。
7. Gamma 関数の解析接続・積表示・反射公式を複素解析から導ける。
8. Riemann ζ 関数の Euler 積・解析接続・関数等式を、Gaussian Fourier 変換と theta 変換を含めて追える。
9. 「複素解析の公式集」ではなく、局所理論・コンパクト性・位相・Fourier 解析・特殊関数がどう接続しているかを依存 DAG とともに説明できる。

この到達点を **DREAM THEATER 複素解析 II の完成条件**とする。
