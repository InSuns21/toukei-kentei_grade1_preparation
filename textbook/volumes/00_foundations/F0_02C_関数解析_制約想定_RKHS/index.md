# F0-02C 関数解析補講ロードマップ：F0-00からRKHSまで

このページは、以前1ページに詰め込まれていた「関数解析・一般化KKT・RKHS」を、**前提補講を含む一学期分の講義系列**として読み直すための入口です。

出発点は [F0-00 統計検定1級のための数学速習](../F0_00_統計検定1級のための数学速習/index.md) です。

ここで想定する読者は、F0-00に出てくる

- 大学初年級の微積分
- 行列計算
- 固有値・固有ベクトルの計算
- 二次形式
- ラグランジュ未定乗数法
- 射影行列の基本計算

を読める人です。

その先は、**必要な新概念をこの補講系列の中で順に導入します**。

したがって、物量を気にせず頭から通して読む場合、途中で別の専門書やE1-04を必須前提として要求しない構成を目指します。

---

## 0. 完全通読ルート

F0-00が読める人向けの正本ルートは次です。

$$
\boxed{
\begin{array}{c}
\text{F0-00 数学速習}\\
\Downarrow\\
\text{F0-00A 集合・写像・sup/inf}\\
\Downarrow\\
\text{F0-00B 距離・開集合・閉集合・収束}\\
\Downarrow\\
\text{F0-00C 連続・コンパクト・最大最小}\\
\Downarrow\\
\text{F0-00D Cauchy列・完備性}\\
\Downarrow\\
\text{F0-00E ベクトル空間・基底・Gram--Schmidt・射影}\\
\Downarrow\\
\text{F0-00F 線形写像・スペクトル定理・SVD}\\
\Downarrow\\
\text{F0-02 制約付き最適化・双対・KKT}\\
\Downarrow\\
\text{F0-02A 接錐・polar cone・KKT導出}\\
\Downarrow\\
\text{F0-02B 分離超平面・Farkas・SVM凸幾何}\\
\Downarrow\\
\text{F0-02C1 Banach / Hilbert}\\
\Downarrow\\
\text{F0-02C2 双対空間・Riesz}\\
\Downarrow\\
\text{F0-02C3 Fr\acute{e}chet微分・作用素・随伴}\\
\Downarrow\\
\text{F0-02C4 凸解析・normal cone}\\
\Downarrow\\
\text{F0-02C5 一般化KKT・制約想定}\\
\Downarrow\\
\text{F0-02C6 Hahn--Banach・分離}\\
\Downarrow\\
\text{F0-02C7 RKHS・representer theorem・kernel SVM}
\end{array}}
$$

長いです。

ただし理論上の段差は意図的に小さくしてあります。

A〜Dが **極限・位相側の橋**、E〜Fが **線形代数側の橋** です。その2本を渡ってから有限次元の凸最適化を整理し、最後に無限次元へ進みます。

---

## 1. なぜF0-00だけでは線形代数側が足りないのか

F0-00は統計検定1級で必要な計算を速く再利用できるように作られています。

そのため、たとえば

$$
A=Q\Lambda Q^{\mathsf T}
$$

という直交対角化や

$$
P_X=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}
$$

という射影行列は扱いますが、

> そもそも正規直交基底はどう作るのか。

> なぜ実対称行列には正規直交固有基底が存在するのか。

> 行列を「線形写像」として見るとは何なのか。

という理論側は圧縮されています。

有限次元統計だけならこの圧縮でもかなり進めます。

しかしHilbert空間・Riesz表現・随伴作用素・RKHSへ進むと、

$$
\text{基底},\quad
\text{直交補空間},\quad
\text{射影},\quad
\text{線形写像},\quad
\text{作用素ノルム}
$$

が主役になります。

そこでF0-00EとF0-00Fを追加し、有限次元側を一度きちんと組み立ててから関数解析へ進みます。

---

## 2. 集合・位相側の橋

### F0-00A 集合・写像・上限と下限

[F0-00Aを読む](../F0_00A_集合_写像_上限下限/index.md)

ここでは

- 集合・部分集合・直積
- 写像
- 像・逆像
- 単射・全射
- 上界・下界
- supremum / infimum
- maximum / minimumとの違い

を扱います。

特に

$$
\inf_{x\in C}f(x)
$$

が「最小値を達成する」とは限らない、という区別をここで先に入れます。

---

### F0-00B 距離空間・開集合・閉集合・収束

[F0-00Bを読む](../F0_00B_距離空間_開集合_閉集合_収束/index.md)

ここでは

- 距離空間
- 開球
- 開集合・閉集合
- 点列の収束
- interior
- closure
- boundary

を扱います。

「閉集合なら極限を取っても集合の外へ落ちない」という事実を、F0-02BやHilbert空間の射影定理で繰り返し使います。

---

### F0-00C 連続写像・コンパクト性・最大最小

[F0-00Cを読む](../F0_00C_連続写像_コンパクト性_最大最小/index.md)

ここでは

- epsilon-deltaによる連続性
- 点列による連続性
- 開集合の逆像
- コンパクト性
- Heine--Borelの定理
- 連続像のコンパクト性
- Weierstrassの最大最小定理

を扱います。

有限次元では

$$
\boxed{
\text{閉かつ有界}
\Longrightarrow
\text{コンパクト}
}
$$

という強い性質があります。

F0-02Bの最近点存在証明や、F0-00FのRayleigh商最大化でこの性質を使います。

---

### F0-00D Cauchy列・完備性・無限次元で何が壊れるか

[F0-00Dを読む](../F0_00D_Cauchy列_完備性_無限次元/index.md)

ここでは

- Cauchy列
- 完備性
- $\mathbb Q$ と $\mathbb R$ の違い
- 完備性とコンパクト性の違い
- $\ell^2$ の標準基底

を扱います。

特に

$$
\boxed{
\text{無限次元では閉有界}
\not\Rightarrow
\text{コンパクト}
}
$$

を具体例で確認します。

これが、有限次元の証明をそのままHilbert空間へ移植できない最初の警告です。

---

## 3. 線形代数側の橋

### F0-00E ベクトル空間・基底・Gram--Schmidt・直交射影

[F0-00Eを読む](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md)

ここでは

- ベクトル空間・部分空間
- span
- 一次独立
- 基底・次元・座標
- 内積・直交
- 正規直交系
- Gram--Schmidt直交化
- 直交補空間
- 直交射影
- QR分解
- 最小二乗法

を扱います。

特に正規直交基底を

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

そして

$$
P_V=QQ^{\mathsf T}
$$

から

$$
P_X=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}
$$

へつなぎます。

後のHilbert空間で使う直交分解・射影の有限次元版を、ここで完成させます。

---

### F0-00F 線形写像・固有空間・スペクトル定理・SVD

[F0-00Fを読む](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md)

ここでは

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

を扱います。

実対称行列については、「直交対角化できる」を前提にせず、

$$
\text{単位球面でRayleigh商が最大値を持つ}
\to
\text{固有ベクトルが1本得られる}
\to
\text{その直交補空間が不変}
\to
\text{帰納法}
$$

で

$$
\boxed{A=Q\Lambda Q^{\mathsf T}}
$$

を導きます。

最後に

$$
\boxed{
\|A\|_{\mathrm{op}}
=\sigma_{\max}(A)
}
$$

まで進み、関数解析の「有界線形作用素」へ橋を架けます。

---

## 4. 有限次元の最適化・凸幾何を完成させる

関数解析に入る前に、有限次元でKKTと分離定理を一度完成させます。

### F0-02 制約付き最適化・双対問題・KKT条件

[F0-02を読む](../F0_02_制約付き最適化_双対_KKT/index.md)

ここでは

- 不等式制約
- Lagrangian
- 双対関数
- 弱双対性・強双対性
- KKTの4条件
- 相補性
- SVMへの適用

を扱います。

---

### F0-02A 接錐・polar cone・FarkasからKKTを導く

[F0-02Aを読む](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md)

ここでは

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

を追います。

KKTを「4条件の暗記」から、実行可能方向の幾何へ戻します。

---

### F0-02B 分離超平面定理・Farkas・SVM凸幾何

[F0-02Bを読む](../F0_02B_分離超平面定理_Farkas_SVM/index.md)

以前この章に詰め込まれていた閉集合・infimum・コンパクト性の初出説明はA〜Cへ移しました。

02B自体は

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

ここから無限次元へ進みます。

まず

$$
C([0,1]),\quad L^2([0,1]),\quad \ell^2
$$

などをベクトル空間として扱い、

- ノルム空間
- Banach空間
- 内積空間
- Hilbert空間
- Cauchy--Schwarz
- 平行四辺形恒等式
- Hilbert空間の射影定理

を導入します。

有限次元でF0-00Eにより

$$
\mathbb R^n=V\oplus V^\perp
$$

を見た後なので、Hilbert空間で

$$
H=M\oplus M^\perp
$$

となる意味を比較できます。

射影定理の存在証明では、有限次元のHeine--Borelを使わず、

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

有限次元で

$$
\ell_a(x)=a^{\mathsf T}x
$$

と書いていたものを一般化します。

扱う内容は

- 線形汎関数
- 連続性と有界性
- 双対空間 $X^*$
- 双対ノルム
- 評価汎関数
- $C([0,1])$ と $L^2$ の点評価の違い
- Riesz表現定理

です。

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

ここでは有限次元で一緒に扱いがちな

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

F0-00Fで行列を線形写像として見ているため、行列から作用素への移行がここで自然になります。

---

## 8. 関数解析IV：凸解析・劣勾配・normal cone・双対錐

[F0-02C4を読む](../F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md)

ここでは

- 凸関数
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

という1本の包含関係へまとめます。

F0-02A/Bで見た有限次元の接錐・polar coneを、双対空間の言葉で読み直す講義です。

---

## 9. 関数解析V：一般化KKT・制約写像・制約想定

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
\quad\text{subject to}\quad
x^2\le0
$$

という退化例から、

$$
\text{真の接錐}
\ne
\text{線形化で見える錐}
$$

が起こることを確認し、

- LICQ
- MFCQ
- Robinson CQ
- 等式制約微分の全射性

へ進みます。

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
- Hilbert空間での射影による具体的separator

を扱います。

F0-02Bの有限次元分離定理が、一般のノルム空間では「ベクトル」ではなく「連続線形汎関数」に置き換わることを確認します。

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
- kernel SVMのHilbert空間主問題
- stationarityによる有限和表示
- kernelだけで書ける双対問題
- support vectorの意味
- MercerとMoore--Aronszajnの役割の違い

まで扱います。

C7ではSVMの主問題・Lagrangianを本文中で必要なだけ再掲するため、E1-04は完全通読の必須前提にはしません。

試験対策としてsoft margin・hinge loss・KKT分類を整理し直したい場合だけ、[E1-04 プロビット・非線形回帰・SVM](../../05_engineering/E1_04_プロビット_非線形回帰_SVM/index.md) へ戻ってください。

---

## 12. 近道ルート

完全通読とは別に、目的が限定されている場合は途中を短縮できます。

### RKHSの構造だけを先に見たい

F0-00を読めていて、基底・直交射影・作用素ノルムに不安がなければ

$$
\text{F0-00D}
\to
\text{F0-00E/Fを必要に応じて確認}
\to
\text{C1}
\to
\text{C2}
\to
\text{C7}
$$

で進めます。

ただしrepresenter theoremの証明では直交分解、kernel SVMの導出ではFréchet微分とKKTを使うため、式の由来まで追いたければC3〜C5も読んでください。

### KKT・制約想定を一般化したい

$$
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

が中心ルートです。

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

近道で未習語にぶつかった場合は、上の完全通読ルートへ戻れば前提が回収できます。

---

## 13. 有限次元で隠れていたもの

この系列の中心テーマは「一般化」そのものではありません。

むしろ、有限次元で無意識に使っていた構造を一つずつ可視化することです。

| 有限次元で自然に見えるもの | 一般化すると必要になるもの |
|---|---|
| ベクトルの長さ | ノルム |
| Euclid距離 | 距離空間 |
| Cauchy列は収束する | 完備性 |
| 閉有界ならコンパクト | 無限次元では一般に偽 |
| 直交基底を作れる | Gram--Schmidt・完全性 |
| 射影できる | Hilbert空間の射影定理 |
| $a^{\mathsf T}x$ | 連続線形汎関数 |
| ベクトルとしての勾配 | Fréchet微分 $Df\in X^*$ |
| 行列の転置 | 随伴作用素 |
| 法線ベクトル | normal cone・双対空間 |
| 超平面の法線 $a$ | separating functional |
| kernel trick | RKHSの内積構造 |

この対応を頭に置くと、各講義が別々の抽象数学ではなく、同じ有限次元計算を少しずつ一般化していることが見えてきます。

---

## 14. 通読完了時の到達点

この系列を順に通読すると、少なくとも次の流れを自力で説明できる状態を目指します。

$$
\boxed{
\begin{array}{c}
\text{基底をGram--Schmidtで正規直交化する}\\
\Downarrow\\
\text{直交射影と最小二乗を理解する}\\
\Downarrow\\
\text{実対称行列のスペクトル定理を理解する}\\
\Downarrow\\
\text{距離・完備性・コンパクト性を区別する}\\
\Downarrow\\
\text{Banach/Hilbert空間を区別する}\\
\Downarrow\\
\text{双対空間・Riesz・随伴を理解する}\\
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

しかし順序自体は、有限次元で使っていた道具を一つずつ分解しているだけです。

---

## 15. 統計検定1級の本編へ戻る

この補講系列の全内容を試験用に暗記する必要はありません。

統計検定1級の本編へ戻る場合は、それぞれ必要な箇所だけ使います。

- 制約付き最適化・KKTの実用形：F0-02
- SVM本編：E1-04
- 回帰の射影：L1系
- 多変量正規・共分散行列：E1系

この系列は、そこで現れる公式に対して

> なぜそう書けるのか。

> 有限次元だから何が自動だったのか。

> 無限次元へ進むと何を仮定し直す必要があるのか。

まで追いたくなったときの理論補講です。
