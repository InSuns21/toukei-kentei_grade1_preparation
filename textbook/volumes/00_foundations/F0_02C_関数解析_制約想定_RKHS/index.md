# F0-02C 関数解析補講ロードマップ：F0-00からRKHSまで

このページはDREAM THEATERのうち、**関数解析そのものを順に積み上げ、そこから無限次元最適化・RKHSへ進む路線**の入口です。

有限次元のKKT・Farkas・SVMは、Banach/Hilbert・双対空間・Hahn--Banachといった関数解析コアの前提ではありません。ただし **一般化KKT（F0-02C5）へ進む地点では有限次元KKTの導出（F0-02A）が合流**します。

したがって本ロードマップでは、

- **短距離ルート**：有限次元の制約付き最適化・Farkas・SVMを先に見る
- **関数解析コア**：Banach/Hilbert → 双対空間 → Hahn--Banach → 分離 → Fréchet微分 → 凸解析
- **合流後**：有限次元KKTの理解を使って一般化KKT・制約想定へ進み、RKHS・kernel SVMへ回収する

と分けて示します。

設計原則は **一講義一学習サイクル** です。標準の読み順と、各 `chapter.yaml` に記す数学的な必須前提は区別しますが、**標準通読順が prerequisite に逆行しないこと**を優先します。

## 0. ここまでの床

```text
A → A1 → A2 → A3 → B
→ C → C1 → C2 → D → D1
→ D2 → D2A → D2B → D2C → D2D → D2E
→ E → E1 → E2 → F → F1 → F2 → G
```

※ 上段の `C1/C2` は F0-00C1/C2 です。以下の F0-02C1/C2 とは別物なので、本文ではフルIDを確認してください。

## 1. 有限次元の短距離ルート：KKT・Farkas・SVM

まず有限次元で制約付き最適化とSVMの仕組みを理解したい場合のルートです。関数解析コアだけを読む段階では後回しにできますが、`F0-02C5` 一般化KKTへ進む前には `F0-02A` まで読んでください。

```text
F0-00G 凸最適化
 ↓
F0-02   Lagrangian / 双対 / KKTをまず使える形で理解
 ↓
F0-02B  射影 → 分離超平面 → Farkas
 ↓
F0-02A  tangent / polar / Farkas からKKTを導出
 ↓
F0-02B1 SVMの凸包幾何・最大マージン
```

`F0-02A → F0-02B` と往復するより、**Farkasの出所を02Bで先に確保してから02AでKKT導出へ戻る**ほうが通読では自然です。

SVMの幾何だけが目的なら `F0-02B → F0-02B1` と短絡できます。

## 2. 関数解析本線

完全通読では、次の順を推奨します。

```text
F0-02C1  Banach / Hilbert
 ↓
F0-02C1A Hilbert射影定理 / 直交分解
 ↓
F0-02C2  連続線形汎関数 / 双対空間 / Riesz
 ↓
F0-02C6  Hahn--Banach / 汎関数拡張
 ↓
F0-02C6A 分離定理 / Minkowski functional / Farkas
 ↓
F0-02C3  Fréchet微分 / 有界作用素 / 連鎖律
 ↓
F0-02C3A 随伴作用素
 ↓
F0-02C4  劣勾配 / normal cone
 ↓
F0-02C4A tangent / polar / dual cone
 ↓
[合流] F0-02 → F0-02B → F0-02A
        （未読ならここで有限次元KKT導出を回収）
 ↓
F0-02C5  一般化KKT / 錐制約 / 双対乗数
 ↓
F0-02C5A LICQ / MFCQ / Robinson CQ
 ↓
F0-02C7  RKHS / 再生核 / Moore--Aronszajn
 ↓
F0-02C7A representer theorem / kernel SVM
```

この順にすると、たとえば `F0-02C4` が prerequisite に持つ `F0-02C6`・`F0-02C6A` を読まずに凸解析へ入る逆転や、`F0-02C5` が prerequisite に持つ `F0-02A` を飛ばす逆転が起きません。

## 3. 関数解析路線の中心線

```text
完備性・内積
 ↓
Hilbert射影
 ↓
連続線形汎関数・双対空間・Riesz
 ↓
Hahn--Banachで汎関数を延長する
 ↓
分離定理で凸集合を汎関数に変換する
 ↓
Fréchet微分を有界線形作用素として扱う
 ↓
随伴で双対側の量を入力側へ戻す
 ↓
劣微分・normal cone
 ↓
tangent / polar / dual cone
 ↓
有限次元KKTの導出が合流
 ↓
一般化KKT
 ↓
制約想定で乗数存在を保証
```

RKHSはこの幹から別枝として、

```text
連続線形汎関数 + Riesz
 ↓
評価汎関数
 ↓
再生核 / RKHS
 ↓
representer theorem
 ↓
kernel SVM
```

と伸びます。

## 4. どこまで読むか

- **有限次元KKTを使えるところまで**：F0-02。
- **Farkasの出所まで**：F0-02B。
- **KKTをtangent/polarから導出するところまで**：F0-02A。
- **SVMの凸包・最大マージン幾何**：F0-02B1。
- **Banach/Hilbertの基礎**：F0-02C1。
- **Hilbert射影定理とRiesz**：F0-02C2まで（C1Aを経由）。
- **Hahn--Banachと分離**：F0-02C6Aまで。
- **無限次元の微分・随伴**：F0-02C3Aまで。
- **凸解析・normal/tangent/polar cone**：F0-02C4Aまで。
- **無限次元のKKTの型**：F0-02Aを回収したうえで F0-02C5まで。
- **KKT乗数の存在条件**：F0-02C5Aまで。
- **RKHSそのもの**：F0-02C7まで。
- **kernel SVMまで回収**：F0-02B1も回収したうえで F0-02C7Aまで。

## 5. 依存関係を細く保つ

完全通読順は上記ですが、数学的には短絡路があります。

- Hahn--Banach本体は `F0-00A3 + F0-02C2` から読める。
- RKHS本体は `F0-02C2` から読める。
- kernel SVM応用は `F0-02C7 + F0-02C3 + F0-02B1` を使う。
- 有限次元Farkasは `F0-02B`、一般の分離定理との接続は `F0-02C6A` で扱う。
- 一般化KKT `F0-02C5` へ入る前に、有限次元KKT導出 `F0-02A` を回収する。

「前のページだから」という理由だけで機械可読prerequisiteを追加しません。一方で、**目次の標準通読順は prerequisite の後ろ向き参照を作らない**ようにします。
