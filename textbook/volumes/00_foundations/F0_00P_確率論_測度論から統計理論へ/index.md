# F0-00P 確率論補講ロードマップ：測度論から統計理論へ

確率論を「公式集」ではなく、測度論から統計理論へ一本の構造として読み直す路線です。設計原則は他のDREAM THEATERと同じく **一講義一学習サイクル** です。

## 標準通読

```text
D2 測度・可測関数
 ↓
P1 確率空間・確率変数・分布
 ↓
P2 RN密度・pmf/pdf
 ↓
P2A 期待値・LOTUS
 ↓
P3 独立・積測度
 ↓
P3A 条件付き期待値
 ↓
P3B L2射影・最良予測
 ↓
P3C Lévy上昇定理・情報の増加
 ↓
P4 limsup・Borel--Cantelli・収束関係
 ↓
P4A 一様可積分性・Vitali
 ↓
P5 Kolmogorov最大不等式・有限分散SLLN
 ↓
P5A truncation・Kolmogorov収束・Kronecker・一般iid SLLN
 ↓
P6 特性関数・Lévy
 ↓
P6A iid CLT
 ↓
P7 dominated model・score・Fisher・正則性
 ↓
P7A MLE一致性・漸近正規性
 ↓
P7B QMD・LAN
```

## 標準読み順と必須前提は違う

上は通読しやすい順番です。machine-readable prerequisiteは証明で実際に使う数学まで明示します。

- P2のRadon--Nikodym定理は、章内で必要な $L^2$ 表現補題まで証明する。表現補題は [Hilbert射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection) から直接導くため、P2のchapter metadataには $L^2$ 完備性とHilbert射影を前提として記録している。
- P3Cは一般のmartingale収束定理を前提にしない。$M_n=E[X\mid\mathcal G_n]$ という条件付き期待値から作られる特別な列について、$L^1$近似とupcrossing評価をその場で証明してLévy上昇定理を閉じる。
- P6「特性関数・Lévy」は強大数則を必要としない。標準通読ではP5の後だが、必須前提にはしない。
- [P6Aの独立同分布 中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)も強大数則を証明に使わない。
- P5Aの一般強大数則はheavy-tailまで追う読者向けで、中心極限定理へ進むための必須駅ではない。
- P7B QMD/LANはP7Aの最尤推定量論を必須にせず、P7 + P6A + L2基礎から読める。
- P3BはEncore IVの時系列予測に重要だが、確率過程のfiltrationへ進むだけならP3Aまででよい。条件付き期待値列の収束まで先に押さえるならP3Cまで進む。

## どこで降りるか

- **確率変数・期待値を測度論で読みたい**：P2Aまで。
- **条件付き期待値・martingaleへ行きたい**：P3Aまで。Hilbert予測も見るならP3B、情報増加に伴う収束まで見るならP3C。
- **a.s.収束とBorel--Cantelli**：P4まで。
- **期待値まで極限交換したい**：P4Aまで。
- **有限分散強大数則**：P5まで。
- **一般独立同分布有限平均強大数則の証明**：P5Aまで。
- **中心極限定理**：P6→P6A。
- **正則統計モデル**：P7。
- **最尤推定量漸近論**：P7A。
- **Le Cam方向の入口**：P7B。

## 今回あえて先へ送るもの

この路線でも、次は別Encore/発展層へ送ります。

- Kolmogorov extension theoremの完全証明
- 一般のmartingale convergence theorem（Encore IV）
- Lévy--Khintchine formula
- stable law一般論
- empirical processによる一般M-estimator理論
- Le Cam第三補題・convolution theorem・local asymptotic minimax theorem

一方、条件付き期待値から作るmartingaleの収束については **[P3C Lévy上昇定理](../F0_00P3C_Levy上昇定理_情報の増加/index.md#thm-f0-00p3c-levy-upward)** で証明を閉じました。また旧P5で名前だけ登場していた **[Kolmogorov収束定理](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#thm-kolmogorov-convergence)と[Kronecker補題](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#thm-kronecker)はP5Aで証明を閉じました**。
