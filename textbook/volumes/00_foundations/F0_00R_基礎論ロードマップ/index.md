# F0-00R 基礎論ロードマップ：標準ルートと完全基礎論ルート

このページは、F0-00の先に増えた発展補講を **どこまで読めばよいか** 整理するための入口です。

出発点は [F0-00 統計検定1級のための数学速習](../F0_00_統計検定1級のための数学速習/index.md) です。

設計基準は次の二つです。

1. **標準通読ルート**：関数解析・RKHSまで進むために必要な前提を、未定義語なしで順に積む。
2. **完全基礎論ルート**：さらに「その定理や測度はどこから来た？」まで掘り、外測度・選択公理・非可測集合まで自前で回収する。

後者は通称 **DREAM THEATERルート** とします。

---

## 1. 標準通読ルート

関数解析・RKHSへ進むための正本は次です。

```text
F0-00   数学速習
  ↓
F0-00A  集合・写像・sup/inf
  ↓
F0-00A2 選択公理・Zorn・極大原理
  ↓
F0-00B  距離・開閉集合・収束
  ↓
F0-00C  連続・コンパクト・最大最小
  ↓
F0-00D  Cauchy列・完備性
  ↓
F0-00D2 測度・可測関数・Lebesgue積分・Lp
  ↓
F0-00E  ベクトル空間・基底・Gram--Schmidt・射影
  ↓
F0-00E2 Cauchy--Schwarz・Bessel・Parseval
  ↓
F0-00F  線形写像・スペクトル定理・SVD
  ↓
F0-00G  凸集合・凸関数・凸最適化
  ↓
F0-02 → F0-02A → F0-02B
  ↓
F0-02C1 → C2 → C3 → C4 → C5 → C6 → C7
```

A2を標準ルートへ入れた理由は、C6のHahn--Banachを証明まで読むとZornの補題が必要になるからです。

一方、D2ではLebesgue測度の存在を一度受け入れて、積分論を先に進めます。

この時点で

- $L^2$
- a.e.
- 可測関数
- 条件付き期待値への入口
- Hahn--BanachのZorn証明

まで通読できます。

---

## 2. 完全基礎論ルート：DREAM THEATER

「Lebesgue測度をあるものとして使うのも気になる」という場合は、D2の直後に次の3講を挿入します。

```text
F0-00D2  測度・Lebesgue積分
  ↓
F0-00D3  外測度・Carathéodory可測性
  ↓
F0-00D4  Lebesgue測度・Borel集合・拡張定理
  ↓
F0-00D5  Vitali集合・非可測集合・選択公理
  ↓
F0-00E   線形代数理論へ戻る
```

この寄り道を入れると

$$
\boxed{
\text{区間の長さ}
\to
\text{外測度}
\to
\text{Carathéodory可測性}
\to
\text{Lebesgue測度}
\to
\text{Lebesgue積分}
}
$$

を全部自前で辿れます。

さらにA2とD5を合わせると

$$
\boxed{
\text{選択公理}
\begin{cases}
\to\text{Zorn}\to\text{Hahn--Banach}\\
\to\text{Vitali集合}\to\text{非可測集合}
\end{cases}
}
$$

まで一本につながります。

---

## 3. なぜD3〜D5を標準ルート必須にしないのか

D2で必要なのは

- sigma代数とは何か
- 測度とは何か
- Lebesgue測度が存在すること
- Lebesgue積分をどう定義するか

です。

D3〜D5はさらに一段下へ降りて

- そのLebesgue測度をどう作ったか
- なぜ全ての部分集合を可測にできないか

を説明します。

したがって関数解析を学ぶだけなら必須ではありません。

しかし完全基礎論ルートを選んだ場合は、D2→D3→D4→D5の順に読めば、前提語彙を外部へ取りに行く必要はありません。

---

## 4. D3で何を作るか

[F0-00D3 外測度・Carathéodory可測性](../F0_00D3_外測度_Caratheodory可測性/index.md)

$$
\lambda^*(A)
=
\inf\left\{
\sum_n|I_n|:
A\subset\bigcup_nI_n
\right\}
$$

からLebesgue外測度を作ります。

次に

$$
\mu^*(T)
=
\mu^*(T\cap E)+\mu^*(T\setminus E)
$$

を満たす集合 $E$ をCarathéodory可測と定義し、可測集合全体がsigma代数になることを追います。

---

## 5. D4でLebesgue測度を完成する

[F0-00D4 Lebesgue測度・Borel集合・拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md)

区間について

$$
\lambda^*([a,b])=b-a
$$

を示し、開集合・Borel集合が可測であることを確認します。

さらに

$$
\text{premeasure}
\to
\text{outer measure}
\to
\text{measure on generated sigma-algebra}
$$

というCarathéodory拡張定理へ一般化します。

確率測度の構成にも同じ思想が使われます。

---

## 6. D5で「全部測ればよくない？」を破壊する

[F0-00D5 Vitali集合・非可測集合・選択公理](../F0_00D5_Vitali集合_非可測集合_選択公理/index.md)

$$
x\sim y
\Longleftrightarrow
x-y\in\mathbb Q
$$

で $[0,1]$ を同値類に分け、各同値類から一つずつ代表元を選んでVitali集合を作ります。

その有理数平行移動に可算加法性を適用すると、Vitali集合が可測だという仮定は矛盾します。

これで

> 事象は全ての部分集合ではなく、sigma代数に属する集合だけ

という確率論の形式が必要な理由まで回収します。

---

## 7. 確率論「それどこから来た？」ルート

D2まで読んだら、関数解析ではなく確率論を掘ることもできます。

```text
F0-00D2
  ↓
F0-00P1  確率空間・確率変数・分布
  ↓
F0-00P2  Radon--Nikodym・密度・期待値
  ↓
F0-00P3  独立・積測度・条件付き期待値
  ↓
F0-00P4  収束・Borel--Cantelli・一様可積分性
  ↓
F0-00P5  大数の強法則
  ↓
F0-00P6  特性関数・中心極限定理
  ↓
F0-00P7  統計モデル・尤度・正則性
```

D3〜D5はこの確率論系列にも必須ではありません。

ただし完全基礎論ルートを先に通ると、

- なぜsigma代数が必要か
- 測度の拡張はどう行われるか
- pdfの基準になるLebesgue測度はどこから来たか

まで既知の状態でP1へ進めます。

---

## 8. Encore II：Fourier Analysis & Differential Equations

線形代数・Lebesgue積分・Hilbert空間まで読んだ後、さらにFourier解析と古典的PDEへ進む任意ルートを用意します。

[Encore II ロードマップを読む](../F0_00R2_EncoreII_Fourier解析_微分方程式/index.md)

```text
F0-00H1   常微分方程式・線形系・行列指数
  ↓
F0-00FA1  Fourier級数・直交展開
  ↓
F0-00FA2  Fourier変換・畳み込み・反転
  ↓
F0-00FA3  Plancherel・L2 Fourier変換・特性関数
  ↓
F0-00PDE1 熱方程式・Gaussian heat kernel
  ↓
F0-00PDE2 波動方程式・Laplace方程式・変数分離
  ↓
F0-00PDE3 Sturm--Liouville・自己共役性・スペクトル展開
```

このルートは通常カリキュラム、RKHS通読、確率論P1〜P7の必須前提ではありません。

ただし入場した後は、ODE→Fourier級数→Fourier変換→Plancherel→PDE→Sturm--Liouvilleの順に、主要概念を未定義のまま飛ばさず進みます。

---

## 9. 読み方の推奨

### 試験対策が目的

F0-00から通常教材へ戻ってください。ここから先は明確に発展補講です。

### RKHS・関数解析まで理解したい

標準通読ルートを読んでください。

### 漸近統計の理論まで理解したい

D2からP1〜P7へ分岐してください。

### 「存在するって誰が言った？」が気になる

DREAM THEATERルートへ進んでください。

### 「特性関数ってFourier変換ですよね？」が気になった

Encore IIへ進んでください。

DREAM THEATER追加分はA2を含め約19時間、Encore IIは約30時間を目安とします。

---

## 10. 通読可能性の確認基準

完全基礎論ルートとEncore IIでは、次を満たすように章順を設計します。

1. 定義語は原則として使う前に導入する。
2. 高度定理を証明しない場合は「定理として使う」と明記する。
3. 一つ前の章で導入した概念が次章で何に使われるか明記する。
4. 有限次元と無限次元で成立条件が変わる定理は、その差を明記する。
5. 選択公理・コンパクト性・完備性・可測性を互いに代用しない。
6. 古典的PDEから弱解理論へ無断で飛ばない。

つまり

> 物量に負ける可能性はあるが、未定義語に殴られて脱落する構成にはしない

ことを保証目標にします。

---

## 11. 現在の全体像

```text
                             ┌→ D3 → D4 → D5 ─┐
F0-00 → A → A2 → B → C → D → D2               ├→ E → E2 → F → G → 02 → 02A → 02B → C1 ... C7
                             └→ P1 → P2 → P3 → P4 → P5 → P6 → P7
                                                        │
                                   C1 / F / D2 / E2 ───┴→ H1 → FA1 → FA2 → FA3 → PDE1 → PDE2 → PDE3
```

D3〜D5は測度論の深掘り、P1〜P7は確率・漸近統計の深掘り、H1〜PDE3がEncore IIです。

A2は後でC6のHahn--Banachにも再利用されます。
