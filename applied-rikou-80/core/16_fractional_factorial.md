# Core 16 一部実施要因計画・alias・解像度

- 安定ID: `RIKOU-CORE-16`
- 80大問 No.: 49
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 問題

3因子2水準実験を半分だけ実施し、生成関係

$$
C=AB
$$

を用いて $2^{3-1}$ 計画を作る。

1. defining relation を求めよ。
2. $A,B,C$ の alias を求めよ。
3. この計画の解像度を求め、その意味を説明せよ。
4. 4実験の応答から $A$ 効果を推定したとき、真にはどの効果との和を推定していることになるか。
5. 主効果と2因子交互作用を分離したい場合、この設計をどう改善すべきか述べよ。

## 詳細解答

### 1. defining relation

$C=AB$ の両辺に $C$ を掛けると

$$
I=ABC.
$$

これが defining relation である。

### 2. alias

任意の効果に defining word $ABC$ を掛ける。

$$
A=A\cdot ABC=BC,
$$

$$
B=AC,
$$

$$
C=AB.
$$

したがって alias 関係は

$$
\boxed{A\leftrightarrow BC,\quad B\leftrightarrow AC,\quad C\leftrightarrow AB}.
$$

また $I\leftrightarrow ABC$。

### 3. 解像度

defining relation の最短語 $ABC$ の長さは3だから Resolution III。主効果同士は交絡しないが、各主効果が2因子交互作用と交絡する。

### 4. 推定される量

$A$ の列と $BC$ の列は同一なので、線形モデル上で別々の係数を識別できない。通常の効果尺度では観測から得る $A$ 効果は

$$
\boxed{A+BC}
$$

という alias sum と解釈する。

### 5. 改善

主効果と2因子交互作用を分離するには、少なくとも Resolution IV 以上の一部実施計画を使うか、foldover 実験を追加して alias を解消する。全 $2^3$ 実験へ拡張するのが最も直接的である。

## 本番答案

$C=AB$ より $I=ABC$。したがって

$$
A=BC,\qquad B=AC,\qquad C=AB,
$$

であり、最短 defining word が長さ3なので Resolution III。よって主効果は2因子交互作用と交絡する。例えば観測上の $A$ は $A+BC$ を表す。分離には foldover、より高解像度の計画、または全実施を用いる。

## 採点基準

- defining relation: 4点
- alias: 6点
- 解像度と意味: 5点
- alias sum: 3点
- 改善案: 2点

25分経過時は defining relation を起点に全 alias を機械的に生成する。
