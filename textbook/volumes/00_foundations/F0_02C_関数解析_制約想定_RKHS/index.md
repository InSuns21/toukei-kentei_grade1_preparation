# F0-02C 関数解析補講ロードマップ：F0-00からRKHSまで

このページはDREAM THEATERのうち、有限次元最適化から関数解析・RKHSへ進む路線の入口です。

設計原則は **一講義一学習サイクル** です。標準の読み順と、各 `chapter.yaml` に記す数学的な必須前提は区別します。

## 完全通読ルート

```text
A → A1 → A2 → A3 → B
→ C → C1 → C2 → D → D1
→ D2 → D2A → D2B → D2C → D2D → D2E
→ E → E1 → E2 → F → F1 → F2 → G
→ F0-02 → 02A → 02B → 02B1 SVM凸包幾何
→ C1  Banach / Hilbert
→ C1A Hilbert射影定理 / 直交分解
→ C2  双対空間 / Riesz
→ C3  Fréchet微分 / 有界作用素 / 連鎖律
→ C3A 随伴作用素
→ C4  劣勾配 / normal cone
→ C4A tangent / polar / dual cone
→ C5  一般化KKT / 錐制約
→ C5A LICQ / MFCQ / Robinson CQ
→ C6  Hahn--Banach / 汎関数拡張
→ C6A 分離定理 / Minkowski functional / Farkas
→ C7  RKHS / 再生核 / Moore--Aronszajn
→ C7A representer theorem / kernel SVM
```

※ 上段の `C1/C2` は F0-00C1/C2、下段は F0-02C1/C2 です。ID衝突を避けるため本文ではフルIDを確認してください。

## 関数解析路線の中心線

```text
完備性・内積
 ↓
連続線形汎関数とRiesz
 ↓
微分は有界線形作用素
 ↓
随伴で乗数を入力側へ戻す
 ↓
劣微分・normal cone
 ↓
tangent / polar / dual cone
 ↓
一般化KKT
 ↓
制約想定で乗数存在を保証
 ↓
Hahn--Banachで双対空間を豊かにする
 ↓
分離定理
 ↓
評価汎関数 + Riesz = 再生核
 ↓
representer theorem = 無限次元問題の有限和解
```

## どこまで読むか

- **有限次元KKT/Farkasまで**：F0-02Bまで。
- **SVMの凸包・最大マージン幾何**：F0-02B1まで。
- **Banach/Hilbertの基礎**：F0-02C1まで。
- **Hilbert射影定理とRiesz**：F0-02C2まで（C1Aを経由）。
- **無限次元のKKTの型**：F0-02C5まで。
- **KKT乗数の存在条件**：F0-02C5Aまで。
- **Hahn--Banachと分離**：F0-02C6Aまで。
- **RKHSそのもの**：F0-02C7まで。
- **kernel SVMまで回収**：F0-02C7Aまで。

## 依存関係を細く保つ

標準通読ではC1からC7Aまで順に読めますが、数学的には例えば次の短絡路があります。

- Hahn--Banach本体は `F0-00A3 + F0-02C2` から読める。
- RKHS本体は `F0-02C2` から読める。
- kernel SVM応用は `F0-02C7 + F0-02C3 + F0-02B1` を使う。

「前のページだから」という理由だけで機械可読prerequisiteを追加しません。
