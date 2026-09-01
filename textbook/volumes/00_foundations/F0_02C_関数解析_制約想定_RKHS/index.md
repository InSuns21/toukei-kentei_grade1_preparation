# F0-02C 関数解析補講ロードマップ：制約想定・RKHS・kernel SVM

このページは、以前1ページに詰め込まれていた「関数解析・一般化KKT・RKHS」を **一学期分の補講系列** として分割した入口です。

統計検定1級の必須暗記事項を増やすための章ではありません。

SVM・KKT・kernel法を追っていたら

> 「有限次元では当たり前だったことは、無限次元でも本当に当たり前なのか？」

という問いにぶつかり、なぜか関数解析が始まった人のための補講です。

---

## 0. 先に結論：全部読む必要はない

目的ごとに次の読み方を推奨します。

### kernel SVMの数学的背景を理解したい

まず

1. [F0-02C1 ノルム空間・Banach空間・Hilbert空間](../F0_02C1_ノルム空間_Banach_Hilbert/index.md)
2. [F0-02C2 線形汎関数・双対空間・Riesz表現](../F0_02C2_線形汎関数_双対空間_Riesz/index.md)
3. [F0-02C7 RKHS・再生核・representer theorem・kernel SVM](../F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md)

を読めば、RKHSへの最短経路になります。

SVMの双対・KKTまで作用素の型から追いたい場合はC3〜C5も挟んでください。

### KKT・制約想定を無限次元まで理解したい

C1からC6まで順に読むのが安全です。

$$
\text{Banach/Hilbert}
\to
\text{双対}
\to
\text{Fréchet微分・随伴}
\to
\text{凸解析}
\to
\text{一般化KKT・CQ}
\to
\text{Hahn--Banach・分離}
$$

と進みます。

### 関数解析を一通り補講として学びたい

前置きのF0-00A〜DからC1〜C7まで順番に読んでください。

---

## 1. 関数解析へ行く前の「集合・位相」補講

元のF0-02Bでは、分離超平面定理へ進む前の道具箱で

$$
\text{閉集合},
\quad
\inf,
\quad
\text{コンパクト性},
\quad
\text{Heine--Borel}
$$

まで一気に導入していました。

これらは独立した補講へ分けました。

### F0-00A 集合・写像・上限と下限

[補講を読む](../F0_00A_集合_写像_上限下限/index.md)

扱う内容：

- 集合・部分集合・直積
- 像・逆像
- 単射・全射
- supremum / infimum
- minimumとの違い

### F0-00B 距離空間・開集合・閉集合・収束

[補講を読む](../F0_00B_距離空間_開集合_閉集合_収束/index.md)

扱う内容：

- 距離空間・開球
- 開集合・閉集合
- 点列の収束
- interior・closure・boundary

### F0-00C 連続写像・コンパクト性・最大最小

[補講を読む](../F0_00C_連続写像_コンパクト性_最大最小/index.md)

扱う内容：

- epsilon-deltaと点列による連続性
- 開集合の逆像
- コンパクト性
- Heine--Borel
- Weierstrassの最大最小定理
- F0-02Bの射影存在証明の分解

### F0-00D Cauchy列・完備性・無限次元で何が壊れるか

[補講を読む](../F0_00D_Cauchy列_完備性_無限次元/index.md)

扱う内容：

- Cauchy列
- 完備性
- $\mathbb R$ と $\mathbb Q$ の違い
- コンパクト性と完備性の違い
- $\ell^2$ の標準基底による
  $$
  \text{閉有界}\not\Rightarrow\text{コンパクト}
  $$
  の反例

---

## 2. 第I講：ノルム空間・Banach空間・Hilbert空間

[F0-02C1を読む](../F0_02C1_ノルム空間_Banach_Hilbert/index.md)

ここでは

$$
\text{関数をベクトルとして扱う}
$$

ところから始めます。

主な内容は

- ノルム空間
- $C([0,1])$ とsupノルム
- $L^2$ と $\ell^2$
- Banach空間
- 内積空間
- Hilbert空間
- 平行四辺形恒等式
- 直交
- Hilbert空間の射影定理

です。

特に射影定理は、有限次元でHeine--Borelを使った証明が無限次元では使えないため、平行四辺形恒等式と完備性から証明し直します。

---

## 3. 第II講：線形汎関数・双対空間・Riesz表現

[F0-02C2を読む](../F0_02C2_線形汎関数_双対空間_Riesz/index.md)

有限次元で

$$
a^{\mathsf T}x
$$

と書いていた「測定器」を

$$
\ell\in X^*
$$

として独立させます。

扱う内容は

- 線形汎関数
- 連続性と有界性
- 双対空間 $X^*$
- 双対ノルム
- 評価汎関数
- $C([0,1])$ と $L^2$ における点評価の違い
- Riesz表現定理
- 射影定理を用いたRiesz表現の証明

です。

ここで

$$
H^*\cong H
$$

がHilbert空間特有の強力な構造であることを確認します。

---

## 4. 第III講：Fréchet微分・線形作用素・随伴

[F0-02C3を読む](../F0_02C3_Frechet微分_線形作用素_随伴/index.md)

ここでは有限次元で混ざりやすい

$$
\text{微分},
\quad
\text{勾配},
\quad
\text{Jacobian},
\quad
\text{転置}
$$

を分解します。

主な対応は

$$
\boxed{
\begin{array}{ccc}
Df(x)&\in&X^*,\\
DG(x)&\in&\mathcal L(X,Y),\\
DG(x)^*&:&Y^*\to X^*.
\end{array}}
$$

です。

KKTの

$$
J_G^{\mathsf T}\lambda
$$

が、本質的には

$$
DG^*\lambda
$$

であることがここで分かります。

---

## 5. 第IV講：凸解析・劣勾配・normal cone・双対錐

[F0-02C4を読む](../F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md)

制約付き最適化を

$$
\boxed{
0\in\partial f(x)+N_C(x)
}
$$

という包含関係へまとめます。

扱う内容は

- 凸関数の一次支持不等式
- 劣勾配・劣微分
- $|x|$ の劣微分
- convex indicator関数
- normal cone
- tangent cone
- polar cone
- dual cone

です。

KKT乗数が「制約の法線を作る係数」であることを幾何から理解します。

---

## 6. 第V講：一般化KKT・制約写像・制約想定

[F0-02C5を読む](../F0_02C5_一般化KKT_制約写像_制約想定/index.md)

不等式制約を

$$
G(x)\in-K
$$

とまとめ、一般化KKT

$$
\boxed{
Df(x^*)
+DG(x^*)^*\lambda
+DH(x^*)^*\nu
=0
}
$$

を扱います。

ただし公式からは始めません。

$$
\min x
\quad\text{s.t.}\quad
x^2\le0
$$

という、唯一の実行可能点が局所最適なのにKKT乗数が存在しない例から始めます。

そこから

- tangent coneとlinearizationのずれ
- 等式制約微分の全射性
- LICQ
- MFCQ
- Robinson CQ

へ進みます。

---

## 7. 第VI講：Hahn--Banach・分離定理

[F0-02C6を読む](../F0_02C6_Hahn_Banach_分離定理/index.md)

一般のBanach空間では、最近点も法線ベクトルも自動ではありません。

そこで

- Hahn--Banachの支配付き拡張
- ノルム保存拡張
- 双対空間が点を分離すること
- 汎関数による超平面
- 点と閉凸集合の強分離
- Hilbert空間では射影から具体的separatorが得られること
- Farkasへの接続

を扱います。

F0-02Bの有限次元分離定理が、関数解析のどこに位置するかを回収する講義です。

---

## 8. 第VII講：RKHS・再生核・representer theorem・kernel SVM

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
- kernel SVMのHilbert空間主問題
- stationarityによる有限和表示
- kernelだけで書ける双対問題
- support vectorの意味
- MercerとMoore--Aronszajnの役割の違い

まで扱います。

---

## 9. 全体の依存関係

基礎から全部並べると

$$
\boxed{
\begin{array}{c}
\text{集合・写像・inf/sup}\\
\Downarrow\\
\text{距離・開閉集合・収束}\\
\Downarrow\\
\text{連続・コンパクト}\\
\Downarrow\\
\text{Cauchy列・完備性}\\
\Downarrow\\
\text{Banach / Hilbert}\\
\Downarrow\\
\text{双対・Riesz}\\
\Downarrow\\
\text{Fréchet微分・随伴}\\
\Downarrow\\
\text{凸解析・normal cone}\\
\Downarrow\\
\text{一般化KKT・制約想定}\\
\Downarrow\\
\text{Hahn--Banach・分離}\\
\Downarrow\\
\text{RKHS・kernel SVM}
\end{array}}
$$

です。

「データをいい感じに分類したい」から始めてここまで来るのは、だいぶ数学科的な暴走に見えます。

ただ、各段階で有限次元では隠れていた仮定を一つずつ外しているので、理論の流れ自体はかなり素直です。

---

## 10. 統計検定1級の学習へ戻る

この補講系列を全部覚える必要はありません。

SVMの試験対策へ戻る場合は [E1-04 プロビット・非線形回帰・SVM](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) を参照してください。

KKTの有限次元導出へ戻る場合は [F0-02A](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md)、分離超平面・Farkas・SVMの凸幾何へ戻る場合は [F0-02B](../F0_02B_分離超平面定理_Farkas_SVM/index.md) を参照してください。

この系列の役割は、そこで出てきた公式に対して

> 「一般化すると何が壊れ、何を仮定し直せばよいのか」

を調べたくなったときの避難所です。
