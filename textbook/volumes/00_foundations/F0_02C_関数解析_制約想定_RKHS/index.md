# F0-02C 関数解析補講ロードマップ：F0-00からRKHSまで

このページは、以前1ページに詰め込まれていた「関数解析・一般化KKT・RKHS」を、**前提補講を含む一学期分の講義系列**として読み直すための入口です。

出発点は [F0-00 統計検定1級のための数学速習](../F0_00_統計検定1級のための数学速習/index.md) です。

ここで想定する読者は、F0-00に出てくる大学初年級の微積分・行列計算・固有値計算・二次形式・ラグランジュ未定乗数法・射影行列の基本計算を追える人です。

その先で必要になる新しい数学は、この補講系列の中で順に導入します。

> **物量を無視して読む気力があるなら、F0-00からRKHSまで外部の専門書を必須前提にせず通読できる。**

これをこの系列の設計基準にします。

---

## 0. 完全通読ルート

正本ルートは次です。

```text
F0-00   数学速習
  ↓
F0-00A  集合・写像・sup/inf
  ↓
F0-00B  距離・開閉集合・収束
  ↓
F0-00C  連続・コンパクト・最大最小
  ↓
F0-00D  Cauchy列・完備性
  ↓
F0-00E  ベクトル空間・基底・Gram--Schmidt・射影
  ↓
F0-00E2 Cauchy--Schwarz・Bessel・Parseval
  ↓
F0-00F  線形写像・スペクトル定理・SVD
  ↓
F0-00G  凸集合・凸関数・凸最適化
  ↓
F0-02   制約付き最適化・双対・KKT
  ↓
F0-02A  接錐・polar cone・KKT導出
  ↓
F0-02B  分離超平面・Farkas・SVM凸幾何
  ↓
F0-02C1 Banach / Hilbert
  ↓
F0-02C2 双対空間・Riesz
  ↓
F0-02C3 Frechet微分・作用素・随伴
  ↓
F0-02C4 凸解析・normal cone
  ↓
F0-02C5 一般化KKT・制約想定
  ↓
F0-02C6 Hahn--Banach・分離
  ↓
F0-02C7 RKHS・representer theorem・kernel SVM
```

かなり長いですが、段差は意図的に小さくしています。

A〜Dが **集合・位相・極限側の橋**、E〜Fが **線形代数側の橋**、Gが **凸最適化への橋** です。3本の橋を渡ってから有限次元KKT・分離定理を完成させ、無限次元へ進みます。

---

## 1. 集合・位相・極限側の橋

### F0-00A 集合・写像・上限と下限

[F0-00Aを読む](../F0_00A_集合_写像_上限下限/index.md)

扱う内容：

- 集合・部分集合・直積
- 写像・像・逆像
- 単射・全射
- 上界・下界
- supremum / infimum
- maximum / minimumとの違い

特に

$$
\inf_{x\in C}f(x)
$$

が「実際に最小値を達成する」とは限らないことを先に整理します。

### F0-00B 距離空間・開集合・閉集合・収束

[F0-00Bを読む](../F0_00B_距離空間_開集合_閉集合_収束/index.md)

扱う内容：

- 距離空間・開球
- 開集合・閉集合
- 点列の収束
- interior / closure / boundary

閉集合で極限を取ったとき集合の外へ落ちない、という性質を後で射影定理に使います。

### F0-00C 連続写像・コンパクト性・最大最小

[F0-00Cを読む](../F0_00C_連続写像_コンパクト性_最大最小/index.md)

扱う内容：

- epsilon-deltaと点列による連続性
- 開集合の逆像
- コンパクト性
- Heine--Borel
- 連続像のコンパクト性
- Weierstrassの最大最小定理

有限次元では

$$
\boxed{
\text{閉かつ有界}
\Longrightarrow
\text{コンパクト}
}
$$

が使えます。

### F0-00D Cauchy列・完備性・無限次元で何が壊れるか

[F0-00Dを読む](../F0_00D_Cauchy列_完備性_無限次元/index.md)

扱う内容：

- Cauchy列
- 完備性
- $\mathbb Q$ と $\mathbb R$ の違い
- 完備性とコンパクト性の違い
- $\ell^2$ の標準基底

ここで

$$
\boxed{
\text{無限次元では閉有界}
\not\Rightarrow
\text{コンパクト}
}
$$

を確認します。

---

## 2. 線形代数側の橋

F0-00は統計で使う行列計算を優先しているため、関数解析へ進むには理論側を補います。

### F0-00E ベクトル空間・基底・Gram--Schmidt・直交射影

[F0-00Eを読む](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md)

扱う内容：

- ベクトル空間・部分空間・span
- 一次独立・基底・次元・座標
- 内積・直交
- 正規直交系
- Gram--Schmidt直交化
- 直交補空間
- 直交射影
- QR分解
- 最小二乗法

正規直交基底を

$$
\boxed{
u_j
=v_j-
\sum_{i<j}\langle v_j,q_i\rangle q_i,
\qquad
q_j=\frac{u_j}{\|u_j\|}
}
$$

として実際に構成します。

さらに

$$
P_V=QQ^{\mathsf T}
$$

から

$$
P_X=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}
$$

を導きます。

### F0-00E2 Cauchy--Schwarz・Bessel不等式・Parseval等式

[F0-00E2を読む](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md)

扱う内容：

- Cauchy--Schwarz不等式の証明
- 三角不等式
- 正規直交系への係数
- Bessel不等式
- 有限次元Parseval等式
- 無限次元で「完全性」が必要になる理由

$$
\boxed{
|\langle x,y\rangle|
\le\|x\|\|y\|
}
$$

を、$\|x-ty\|^2\ge0$ から導きます。

これで後の作用素ノルムやRiesz表現でCauchy--Schwarzを既知として使えます。

### F0-00F 線形写像・固有空間・スペクトル定理・SVD

[F0-00Fを読む](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md)

扱う内容：

- 線形写像と行列表現
- 基底変換と相似変換
- kernel / image
- rank-nullity theorem
- 固有空間・不変部分空間
- Rayleigh商
- 実対称行列のスペクトル定理
- 正定値・半正定値
- PSD行列の平方根
- 特異値分解
- 作用素ノルム

実対称行列については

$$
\text{Rayleigh商の最大化}
\to
\text{固有ベクトル}
\to
\text{直交補空間の不変性}
\to
\text{帰納法}
$$

から

$$
\boxed{A=Q\Lambda Q^{\mathsf T}}
$$

を導きます。

最後に

$$
\boxed{
\|A\|_{\mathrm{op}}=\sigma_{\max}(A)
}
$$

まで進み、行列から有界線形作用素へ橋を架けます。

---

## 3. 凸最適化への橋

### F0-00G 凸集合・凸関数・凸最適化の基礎

[F0-00Gを読む](../F0_00G_凸集合_凸関数_凸最適化/index.md)

F0-02で強双対性・Slater条件へ進む前に、

- 凸結合・凸集合・凸包
- 凸関数・狭義凸関数
- 微分可能凸関数の一次支持不等式
- 凸関数では局所最小が大域最小になること
- 凸制約が凸な実行可能集合を作ること
- Slater条件

を導入します。

$$
\boxed{
\text{凸性}
=\text{局所情報を大域最適化へつなぐ構造}
}
$$

と理解してからKKTへ進みます。

---

## 4. 有限次元の最適化・凸幾何

### F0-02 制約付き最適化・双対問題・KKT条件

[F0-02を読む](../F0_02_制約付き最適化_双対_KKT/index.md)

扱う内容：

- 不等式制約とLagrangian
- 双対関数
- 弱双対性・強双対性
- KKTの4条件
- 相補性
- SVMへの適用

### F0-02A 接錐・polar cone・FarkasからKKTを導く

[F0-02Aを読む](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md)

$$
\boxed{
\text{局所最適性}
\to
T_C(x)^\circ
\to
\text{線形化錐}
\to
\text{Farkas}
\to
\text{KKT}
}
$$

を追い、KKTを「4条件の暗記」から実行可能方向の幾何へ戻します。

### F0-02B 分離超平面定理・Farkas・SVM凸幾何

[F0-02Bを読む](../F0_02B_分離超平面定理_Farkas_SVM/index.md)

閉集合・infimum・コンパクト性の初出説明はA〜Cへ移したので、この章は

$$
\boxed{
\text{射影}
\to
\text{分離超平面}
\to
\text{Farkas}
\to
\text{polar cone}
\to
\text{KKT}
}
$$

という凸幾何に集中します。

SVM側では

$$
\boxed{
\text{正負クラスの凸包}
\to
\text{最近点対}
\to
\text{最大マージン}
}
$$

を扱います。

ここまでで有限次元側の準備は完了です。

---

## 5. 関数解析I：ノルム空間・Banach空間・Hilbert空間

[F0-02C1を読む](../F0_02C1_ノルム空間_Banach_Hilbert/index.md)

ここから関数空間へ進みます。

- $C([0,1])$ とsupノルム
- $L^2([0,1])$ と「ほとんど至る所等しい関数」の同一視
- $\ell^2$
- Banach空間
- Hilbert空間
- 平行四辺形恒等式
- Hilbert空間の射影定理

を扱います。

特に$L^2$では、一点だけ値を変えても同じ元になるため、後のRKHSで点評価が問題になる理由までここで準備します。

射影定理の存在証明では有限次元のHeine--Borelを使わず、

$$
\boxed{
\text{凸性}
+\text{平行四辺形恒等式}
+\text{完備性}
+\text{閉性}
}
$$

を使います。

---

## 6. 関数解析II：線形汎関数・双対空間・Riesz表現

[F0-02C2を読む](../F0_02C2_線形汎関数_双対空間_Riesz/index.md)

有限次元の

$$
\ell_a(x)=a^{\mathsf T}x
$$

を一般化し、

- 連続線形汎関数
- 双対空間 $X^*$
- 双対ノルム
- 評価汎関数
- $C([0,1])$ と $L^2$ の点評価の違い
- Riesz表現定理

を扱います。

Hilbert空間では

$$
\boxed{
\ell(h)=\langle g,h\rangle
}
$$

と表せることを射影定理から示します。

---

## 7. 関数解析III：Fréchet微分・線形作用素・随伴

[F0-02C3を読む](../F0_02C3_Frechet微分_線形作用素_随伴/index.md)

有限次元で一緒に扱いがちな

$$
\text{微分},\quad
\text{勾配},\quad
\text{Jacobian},\quad
\text{転置}
$$

を分解します。

$$
\boxed{
Df(x)\in X^*,
\qquad
DG(x)\in\mathcal L(X,Y),
\qquad
DG(x)^*:Y^*\to X^*
}
$$

という「型」を確認します。

---

## 8. 関数解析IV：凸解析・劣勾配・normal cone・双対錐

[F0-02C4を読む](../F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md)

F0-00Gの微分可能な凸関数からさらに進んで、

- 劣勾配・劣微分
- $|x|$ の劣微分
- indicator関数
- normal cone
- tangent cone
- polar cone
- dual cone

を扱います。

制約付き凸最適化を

$$
\boxed{
0\in\partial f(x)+N_C(x)
}
$$

という包含関係へまとめます。

---

## 9. 関数解析V：一般化KKT・制約写像・制約想定

[F0-02C5を読む](../F0_02C5_一般化KKT_制約写像_制約想定/index.md)

不等式制約を

$$
G(x)\in-K
$$

とまとめ、

$$
\boxed{
Df(x^*)+DG(x^*)^*\lambda+DH(x^*)^*\nu=0
}
$$

という一般化KKTへ進みます。

ただし公式から始めず、

$$
\min x
\quad\text{subject to}\quad
x^2\le0
$$

という退化例から、真の接錐と線形化錐のずれを見ます。

そこからLICQ・MFCQ・Robinson CQ・等式制約微分の全射性へ進みます。

---

## 10. 関数解析VI：Hahn--Banach・分離定理

[F0-02C6を読む](../F0_02C6_Hahn_Banach_分離定理/index.md)

一般のBanach空間では、内積による法線ベクトルを当然には使えません。

そこで

- Hahn--Banachの支配付き拡張
- ノルム保存拡張
- 双対空間による点分離
- 汎関数による超平面
- 点と閉凸集合の強分離
- Hilbert空間では射影からseparatorを具体化できること

を扱います。

F0-02Bの有限次元分離定理を、連続線形汎関数の世界へ一般化します。

---

## 11. 関数解析VII：RKHS・再生核・representer theorem・kernel SVM

[F0-02C7を読む](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md)

最後に機械学習へ戻ります。

$$
\boxed{
\text{点評価が連続}
\to
\text{Riesz表現}
\to
\text{再生核}
\to
\text{PSD kernel}
\to
\text{RKHS}
}
$$

を導きます。

さらに

- canonical feature map
- Moore--Aronszajnの定理
- representer theorem
- Hilbert空間上のsoft-margin SVM
- stationarityによる有限和表示
- kernelだけで書ける双対問題
- support vectorの意味
- MercerとMoore--Aronszajnの役割の違い

まで扱います。

C7ではSVMの主問題とLagrangianを本文中で必要な範囲だけ再掲するため、E1-04は完全通読の必須前提ではありません。

試験向けにsoft margin・hinge loss・KKT分類を整理したい場合だけ、[E1-04 プロビット・非線形回帰・SVM](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) へ戻ります。

---

## 12. 近道ルート

完全通読とは別に、目的が限定されている場合は短縮できます。

### RKHSの構造だけを先に見たい

基底・直交射影・Cauchy--Schwarz・作用素ノルムに不安がなければ

$$
\text{F0-00D}
\to
\text{E/E2/Fを必要に応じて確認}
\to
\text{C1}
\to
\text{C2}
\to
\text{C7}
$$

と進めます。

representer theoremの証明は直交分解、kernel SVMの導出はFréchet微分とKKTを使うため、式の由来まで追うならC3〜C5も読みます。

### KKT・制約想定を一般化したい

$$
\text{F0-00G}
\to
\text{F0-02}
\to
\text{F0-02A/B}
\to
\text{C1}
\to
\text{C2}
\to
\text{C3}
\to
\text{C4}
\to
\text{C5}
$$

が中心です。

### 分離定理だけを無限次元化したい

$$
\text{F0-02B}
\to
\text{C1}
\to
\text{C2}
\to
\text{C6}
$$

で有限次元とBanach/Hilbert空間を比較できます。

未習語にぶつかった場合は完全通読ルートへ戻れば前提を回収できます。

---

## 13. 有限次元で隠れていたもの

| 有限次元で自然に見えるもの | 一般化すると必要になるもの |
|---|---|
| ベクトルの長さ | ノルム |
| Euclid距離 | 距離空間 |
| Cauchy列は収束する | 完備性 |
| 閉有界ならコンパクト | 無限次元では一般に偽 |
| 正規直交基底 | Gram--Schmidt・完全性 |
| 座標係数の平方和 | Bessel・Parseval |
| 射影行列 | 直交射影作用素 |
| $a^{\mathsf T}x$ | 連続線形汎関数 |
| 行列 $A$ | 線形作用素 $T$ |
| 最大特異値 | 作用素ノルム |
| ベクトルとしての勾配 | Fréchet微分 $Df\in X^*$ |
| 行列の転置 | 随伴作用素 |
| 法線ベクトル | normal cone・双対空間 |
| 超平面の法線 $a$ | separating functional |
| kernel trick | RKHSの内積構造 |

各講義は別々の抽象数学ではなく、有限次元で暗黙に使っていた構造を一つずつ可視化しています。

---

## 14. 通読完了時の到達点

この系列を順に通読すると、次の流れを自力で説明できる状態を目指します。

$$
\boxed{
\begin{array}{c}
\text{Gram--Schmidtで正規直交基底を作る}\\
\Downarrow\\
\text{Cauchy--Schwarz・Bessel・Parsevalを導く}\\
\Downarrow\\
\text{射影・最小二乗・QRを理解する}\\
\Downarrow\\
\text{スペクトル定理・SVDを有限次元で理解する}\\
\Downarrow\\
\text{距離・完備性・コンパクト性を区別する}\\
\Downarrow\\
\text{凸性・双対・KKT・分離を有限次元で理解する}\\
\Downarrow\\
\text{Banach/Hilbert・双対・Riesz・随伴へ進む}\\
\Downarrow\\
\text{凸解析と一般化KKTを読む}\\
\Downarrow\\
\text{Hahn--Banachから分離定理を見る}\\
\Downarrow\\
\text{RKHSとrepresenter theoremを導く}\\
\Downarrow\\
\text{kernel SVMが有限和へ落ちる理由を説明する}
\end{array}}
$$

「データをいい感じに分類したい」から始めてここまで来るのは、かなり数学徒です。

ただし、順序としては有限次元で使っていた道具を一つずつ分解し、必要なものだけ無限次元へ持ち上げています。

---

## 15. 統計検定1級の本編へ戻る

この補講系列を試験用に全部暗記する必要はありません。

- 制約付き最適化・KKTの実用形：F0-02
- SVM本編：E1-04
- 回帰の射影：L1系
- 多変量正規・共分散行列：E1系

へ必要に応じて戻ります。

この系列は、そこで現れる公式に対して

> なぜそう書けるのか。

> 有限次元だから何が自動だったのか。

> 無限次元へ進むと何を仮定し直す必要があるのか。

まで追いたくなったときの理論補講です。
