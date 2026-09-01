# F0-00SP2 Encore IV：martingale・submartingale・optional stopping

filtrationを導入すると、条件付き期待値を時間方向に使えるようになります。

その中心概念がmartingaleです。

直感的には

> 現在までの情報を全部使っても、将来の期待値は現在値から有利にも不利にもならない

という公平ゲーム構造です。

---

## 1. martingaleの定義

filtration $(\mathcal F_n)$ にadaptedな過程 $(M_n)$ がmartingaleであるとは

1. $E|M_n|<\infty$
2. $M_n$ は $\mathcal F_n$ 可測
3. 
$$
\boxed{
E[M_{n+1}\mid\mathcal F_n]
=M_n
}
$$

を満たすことです。

一般に $m\ge n$ ならtower propertyから

$$
E[M_m\mid\mathcal F_n]=M_n
$$

です。

---

## 2. 平均は保存される

両辺の期待値を取ると

$$
E[M_{n+1}]
=E[M_n].
$$

したがって

$$
\boxed{E[M_n]=E[M_0]}
$$

です。

ただし「平均が一定」だけではmartingaleではありません。条件付き期待値の等式が本質です。

---

## 3. 公平ランダムウォーク

独立な増分 $X_k$ が

$$
E[X_k]=0
$$

を満たすとし

$$
S_n=\sum_{k=1}^nX_k
$$

とします。

自然なfiltration

$$
\mathcal F_n=\sigma(X_1,\dots,X_n)
$$

に対し

$$
\begin{aligned}
E[S_{n+1}\mid\mathcal F_n]
&=S_n+E[X_{n+1}\mid\mathcal F_n]\\
&=S_n.
\end{aligned}
$$

したがって

$$
\boxed{S_n\text{ はmartingale}}
$$

です。

---

## 4. 二乗はそのままではmartingaleでない

$E[X_k^2]=\sigma^2$ とします。

$$
E[S_{n+1}^2\mid\mathcal F_n]
=S_n^2+\sigma^2.
$$

したがって $S_n^2$ は平均的に増えます。

しかし

$$
\boxed{M_n=S_n^2-n\sigma^2}
$$

と補正すると

$$
E[M_{n+1}\mid\mathcal F_n]=M_n.
$$

この「予測可能な増加分を引く」発想がDoob decompositionへつながります。

---

## 5. submartingaleとsupermartingale

martingaleの等号を不等号へ緩めます。

submartingale：

$$
\boxed{
E[X_{n+1}\mid\mathcal F_n]
\ge X_n
}
$$

supermartingale：

$$
\boxed{
E[X_{n+1}\mid\mathcal F_n]
\le X_n
}
$$

です。

凸関数 $\phi$ とmartingale $M_n$ に対して、条件付きJensen不等式から

$$
\phi(M_n)
\le E[\phi(M_{n+1})\mid\mathcal F_n]
$$

となるので、$\phi(M_n)$ はsubmartingaleになります。

---

## 6. 条件付き期待値そのものがmartingaleを作る

$X\in L^1$ として

$$
\boxed{
M_n=E[X\mid\mathcal F_n]
}
$$

と置きます。

するとtower propertyから

$$
E[M_{n+1}\mid\mathcal F_n]
=
E[E[X\mid\mathcal F_{n+1}]\mid\mathcal F_n]
=M_n.
$$

したがってmartingaleです。

martingaleは「時間とともに情報が増える条件付き期待値」として自然に現れます。

---

## 7. predictable process

離散時間で過程 $H_n$ がpredictableであるとは、$H_n$ が

$$
\mathcal F_{n-1}
$$

可測であることです。

つまり時刻 $n$ の増分が起こる前に $H_n$ を決められます。

martingale差分

$$
\Delta M_n=M_n-M_{n-1}
$$

にpredictableな $H_n$ を掛けた和

$$
\sum_{k=1}^n H_k\Delta M_k
$$

は、適切な可積分性の下で再びmartingaleになります。

これが後のItô積分の離散時間版です。

---

## 8. stopped martingale

stopping time $\tau$ に対して

$$
M_n^\tau=M_{n\wedge\tau}
$$

とします。

適切な条件の下で、stopped processもmartingaleです。

停止するかどうかを過去情報だけで決めるため、公平性を不正に破れないという構造です。

---

## 9. optional stopping theorem

条件を満たすmartingale $M_n$ とstopping time $\tau$ に対して

$$
\boxed{
E[M_\tau]=E[M_0]
}
$$

が成り立ちます。

十分条件には例えば

- $\tau$ が有界
- stopped processが一様可積分
- 増分と停止時刻に適切な可積分性がある

などがあります。

重要なのは、**無条件ではない**ことです。

---

## 10. なぜ条件が必要なのか

「公平ゲームなら勝つまで続ければ必ず儲かる」という戦略は、無限の資金や無限時間を暗黙に使います。

stopping timeが大きくなり得ると、極限と期待値の交換が壊れる場合があります。

P4で学んだ一様可積分性がoptional stoppingにも現れるのは偶然ではありません。

---

## 11. Doob decomposition

離散時間submartingale $X_n$ は適切な条件の下で

$$
\boxed{
X_n=M_n+A_n
}
$$

と書けます。

ここで

- $M_n$：martingale
- $A_n$：predictableで増加する過程

です。

つまり

> 予測不能な公平変動 + 予測可能なドリフト

へ分解できます。

この発想はSDEの

$$
dX_t=b_tdt+\sigma_t dB_t
$$

にもつながります。

---

## 12. Brown運動への予告

Brown運動 $B_t$ は連続時間martingaleです。

さらに

$$
\boxed{B_t^2-t}
$$

もmartingaleになります。

離散ランダムウォークの

$$
S_n^2-n\sigma^2
$$

と完全に対応します。

この補正項 $t$ がBrown運動の二次変分とItô公式へつながります。

---

## 章末チェック

- martingaleを条件付き期待値で定義できる。
- 平均一定だけではmartingaleでない理由を説明できる。
- 公平ランダムウォークのmartingale性を示せる。
- $S_n^2-n\sigma^2$ がmartingaleになることを計算できる。
- submartingaleとsupermartingaleを区別できる。
- $E[X\mid\mathcal F_n]$ がmartingaleになることを示せる。
- optional stoppingに条件が必要な理由を説明できる。
- Doob decompositionをドリフトとmartingaleの分離として読める。
