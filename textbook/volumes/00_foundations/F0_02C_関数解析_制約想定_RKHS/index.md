# F0-02C 関数解析補講ロードマップ：F0-00からRKHSまで

このページはDREAM THEATERのうち、関数解析から凸解析・制約付き最適化・RKHSへ進む部分のロードマップです。

ここでは「短距離ルート」「本線」のように分岐させず、**上から順に読める標準通読順**を一つ置きます。数学的には途中を短絡できる箇所もありますが、それは最後に補足します。

## 標準通読ルート

```text
A → A1 → A2 → A3 → B
→ C → C1 → C2 → D → D1
→ D2 → D2A → D2B → D2C → D2D → D2E
→ E → E1 → E2 → F → F1 → F2

→ C1   Banach / Hilbert
→ C1A  Hilbert射影定理 / 直交分解
→ C2   双対空間 / Riesz
→ C3   Fréchet微分 / 有界線形作用素
→ C3A  随伴作用素
→ C3B  Fréchet連鎖律 / Hilbert随伴の証明
→ C6   Hahn--Banach
→ C6A  分離定理 / Minkowski functional / Farkas

→ G    凸集合 / 凸関数 / 凸最適化の基礎
→ G1   epigraph / 閉凸関数 / 支持超平面
→ C4   劣勾配 / normal cone
→ C4A  tangent / polar / dual cone
→ C4B  tangent-normal polar identity
→ G2   Fenchel共役 / Fenchel--Young / Fenchel双対

→ F0-02 制約付き最適化 / 双対 / KKT
→ 02B   分離超平面 / Farkas
→ 02A   接錐・polar・FarkasからKKTを導出
→ C5    一般化KKT / 錐制約
→ C5A   LICQ / MFCQ / Robinson CQ

→ C7    RKHS / 再生核 / Moore--Aronszajn
→ 02B1  SVM / 凸包 / 最大マージン
→ C7A   representer theorem / kernel SVM
```

※ 上段の `C1/C2` は F0-00C1/C2、下段は F0-02C1/C2 です。本文ではフルIDを確認してください。

## なぜこの順か

### 1. まず関数解析の言葉をそろえる

```text
Banach / Hilbert
 ↓
Hilbert射影
 ↓
双対空間 / Riesz
 ↓
Fréchet微分 / 有界作用素
 ↓
随伴作用素
 ↓
Hahn--Banach
 ↓
分離定理
```

ここまでで、無限次元でも「距離」「射影」「双対」「微分」「分離」を同じ言葉で扱えるようになります。

### 2. 凸性の基礎から Fenchel 双対までを一つの塊として読む

`F0-00G` 自体は有限次元の凸性入門なので、数学的には F0-00F1 のあとから読めます。しかし標準通読では、**「凸最適化への入口」だけを関数解析より前へ孤立させず**、Hahn--Banach・分離定理まで準備したあとに凸解析系列を一気に読みます。

```text
分離定理
 ↓
G   凸集合・凸関数・局所最小=大域最小
 ↓
G1  epigraph・閉凸関数・支持超平面
 ↓
C4  劣微分・normal cone
 ↓
C4A/C4B  tangent・polar・dual cone
 ↓
G2  Fenchel共役・Fenchel--Young・双対
```

この順にすると、同じ「支持」の考えが

$$
\text{集合の支持超平面}
\to
\text{epigraphの支持}
\to
\text{劣勾配}
\to
\text{共役関数}
\to
\text{双対問題}
$$

と連続して見えます。

`F0-02C4` は機械可読の prerequisite として `F0-02C6` と `F0-02C6A` を要求しています。また G1 は分離定理を支持超平面へ使います。したがって標準通読では、Hahn--Banach と分離定理をこの凸解析ブロックより前に置きます。

### 3. KKTは凸解析のあとで回収する

有限次元KKTを最初に置くと、接錐・polar cone・Farkasが「まだ出所不明の道具」として先に現れます。そこで標準通読では、凸解析で

- normal / tangent / polar / dual cone
- Fenchel 双対
- 双対ギャップと劣勾配の等号条件

まで準備してからKKT系列へ進みます。

```text
制約付き最適化の概要
 ↓
分離超平面 / Farkas
 ↓
KKT導出
 ↓
一般化KKT
 ↓
制約想定
```

`F0-02C5` は `F0-02A` を prerequisite に持つため、一般化KKTへ入る前に有限次元KKTの導出を回収します。

### 4. 最後にRKHSとSVMが合流する

```text
Riesz
 ↓
RKHS / 再生核

凸解析 / KKT / Farkas
 ↓
SVM / 最大マージン

RKHS + SVM
 ↓
representer theorem / kernel SVM
```

## どこまで読むか

- **Banach/Hilbertの基礎**：F0-02C1まで。
- **Hilbert射影定理とRiesz**：F0-02C2まで（C1Aを経由）。
- **Fréchet微分と随伴**：F0-02C3Bまで。
- **Hahn--Banachと分離**：F0-02C6Aまで。
- **凸性の基礎**：F0-00Gまで。
- **epigraph・閉凸関数・支持超平面**：F0-00G1まで。
- **劣微分と錐**：F0-02C4Bまで。
- **Fenchel共役・双対まで含む凸解析**：F0-00G2まで。
- **有限次元KKTの導出**：F0-02Aまで。
- **一般化KKTと制約想定**：F0-02C5Aまで。
- **RKHSそのもの**：F0-02C7まで。
- **kernel SVMまで**：F0-02C7Aまで。

## 短絡できる箇所

標準通読順は上の通りですが、数学的な必須前提だけを見ると次の短絡ができます。

- `F0-00G` は `F0-00F1` のあとから読める。
- Hahn--Banach本体は `F0-00A3 + F0-02C2` から読める。
- RKHS本体は `F0-02C2` から読める。
- 有限次元KKTの概要 `F0-02` は `F0-00G` のあとに先取りできる。
- kernel SVMは `F0-02C7 + F0-02C3 + F0-02B1` がそろえば読める。

「前のページだから」という理由だけで `chapter.yaml` の prerequisite を追加しません。標準通読順と数学的な最小前提は区別します。
