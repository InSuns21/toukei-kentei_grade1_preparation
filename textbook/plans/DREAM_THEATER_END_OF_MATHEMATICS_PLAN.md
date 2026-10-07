# DREAM THEATER THE END OF MATHEMATICS? 計画

作成日: 2026-10-07  
状態: planned

## 0. 目的

2026年に公開された数学研究成果群のうち、DREAM THEATER で深く追うテーマを次の5本に限定する。

- EOM074: Kakeya
- EOM017: $\pi$ の無理数度
- EOM004: Hilbert第10問題 over $\mathbb Q$
- EOM376: Navier--Stokes × 計算可能性
- EOM221: diluted spin glass / Mézard--Parisi

本系列はニュース紹介ではない。

> **既存の学部・大学院基礎講義を辿り、研究最前線の exact statement と proof architecture を読める地点まで登る。**

一方、EOMテーマのためだけに短い基礎補講を乱立させない。

## 1. 基礎講義整備原則

1. 既存 canonical owner があれば再利用する。
2. 既存章の自然な増補で閉じるなら増補する。
3. 欠けている内容が独立した1セメスター科目として成立するなら、短いEOM補講ではなく正規講義を立てる。
4. 複数の既存正規講義を合流させるだけなら発展章に留める。
5. 研究成果固有の技法・2026年の status は EOM 側へ置く。

この原則により、今回整備する基礎は次となる。

- 調和解析 HA1--HA8（`DREAM_THEATER_HARMONIC_ANALYSIS_PLAN.md`）
- 幾何学的測度論 GMT1--GMT8
- Diophantine近似 NDA1--NDA8
- NT9--NT10 Hilbert第10問題発展章
- 熱力学 TH1--TH8
- 統計力学 SM1--SM8
- スピングラス SG1--SG8

既存の FOU / MT / NT / EC / CMP / NS は再利用する。

## 2. EOM074 Kakeya

prerequisite:

~~~text
FOU1--FOU5
 ↓
HA1--HA8 ─────────┐
                  ↓
MT8 → GMT1--GMT8 → EOM074
~~~

EOM074で扱う:

- 3D Kakeya maximal / 4D Kakeya dimension の exact claim
- classical Kakeya set conjecture
- maximal formulationとの関係
- 2026年以前の frontier
- proof architecture
- verification status
- 残る問題

Hausdorff measure / maximal operator / restriction を EOM 内で初出定義しない。

## 3. EOM017 $\pi$ の無理数度

prerequisite:

~~~text
NT7
 ↓
NDA1--NDA8
 ↓
EOM017
~~~

扱う:

- irrationality exponent の exact definition
- algebraic irrational / Roth との比較
- $\pi$ について2026年以前に何が分かっていたか
- Family 017 の exact claim
- Flint--Hills 系列との接続
- proof / formalization / human verification の区別

## 4. EOM004 Hilbert第10問題 over Q

prerequisite:

~~~text
NT1 / NT6
     ↓
NT9 ← CMP1--CMP6
 ↓
NT10 ← EC の必要章
 ↓
EOM004
~~~

NT9--NT10 は独立1セメスター科目ではなく、複数分野の正規講義を合流させる整数論発展章とする。

EOM004では2026結果固有の証明戦略と検証状況を扱う。

## 5. EOM376 Navier--Stokes × 計算可能性

新規基礎講義は追加しない。

~~~text
NS1--NS8A ─────┐
               ├→ EOM376
CMP1--CMP6 ────┤
CELL1--CELL2 ──┘
~~~

扱う:

- computation の流れへの符号化
- smooth forced flow
- particle reachability
- halting problem との対応
- universal computation の exact formulation
- proof architecture / verification status

## 6. EOM221 Mézard--Parisi

~~~text
TH1--TH8
 ↓
SM1--SM8
 ↓
SG1--SG8
 ↓
EOM221
~~~

扱う:

- diluted spin glass
- cavity / Mézard--Parisi prediction
- exact theorem statement
- dense SK / Parisi formula との違い
- proof architecture
- verification status
- random CSP 等への影響

## 7. EOM章共通フォーマット

各 EOM 章は原則として次を持つ。

1. 問題の入口
2. exact theorem / conjecture statement
3. prerequisite map
4. classical history
5. 2026年直前の frontier
6. 2026 result の exact claim
7. proof architecture
8. 既存 DREAM THEATER 理論へのリンク
9. verification status
10. remaining questions

## 8. 検証状態の記述規約

EOMでは必ず次を分離する。

- announced claim
- manuscript / proof artifact
- formal verification
- independent human verification
- peer-reviewed publication
- prize / institutional recognition

「公開された」ことと「数学界で確立した」ことを同義にしない。

status には基準日を付ける。

## 9. EOM0 / EOM6

### EOM0 THE END OF MATHEMATICS?

- 2026年の数学研究AIの位置付け
- result family / manuscript / open problem の違い
- proof generation と verification の違い
- 研究数学の scarcity がどこで変わるか

### EOM6 AFTER MATHEMATICS?

- theorem production
- verification
- importance judgment
- theory building
- problem selection
- education

を分け、「数学の終わり」ではなく数学者の作業分解がどう変わるかを論じる。

## 10. 実装順

基礎講義の整備順とEOM公開順は分ける。

基礎講義側:

~~~text
1. NUMBER THEORY PLAN
   - NDA
   - NT9 / NT10

2. HARMONIC ANALYSIS PLAN
   - HA1--HA8

3. GMT

4. TH → SM → SG

5. EOM
~~~

EOM本文は prerequisite が canonical 化されたテーマから着手する。

## 11. 完成条件

- 5テーマ以外へ無制限に EOM を増殖させない。
- EOM のためだけの短い基礎講座が残っていない。
- 欠けている独立分野は1セメスター基準で設計されている。
- NT9--NT10 のような複数分野の合流章を無理に一科目化していない。
- EOM本文が exact claim / proof architecture / verification status を分離している。
- public index へ未実装 EOM ID を先行登録しない。
