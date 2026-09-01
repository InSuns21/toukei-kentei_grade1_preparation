# F0-00SP1 Encore IV：確率過程・filtration・adapted process・stopping time

確率論P1〜P7では、主に一つまたは有限個の確率変数を扱いました。

確率過程では、時間 $t$ ごとに確率変数 $X_t$ がある状況を考えます。

しかし「時間発展」を扱うには値だけでは足りません。

> 時刻 $t$ までに何を知ってよいか

という情報構造も必要です。

それをfiltrationで表します。

---

## 1. 確率過程

確率空間 $(\Omega,\mathcal F,P)$ 上で、添字集合 $T$ に対する確率変数族

$$
\boxed{\{X_t:t\in T\}}
$$

を確率過程と呼びます。

$T=\{0,1,2,\dots\}$ なら離散時間、$T=[0,\infty)$ なら連続時間です。

各 $\omega$ を固定すると

$$
t\mapsto X_t(\omega)
$$

という関数が得られ、これをsample pathと呼びます。

---

## 2. 二つの見方

確率過程には二つの見方があります。

時刻 $t$ を固定すれば

$$
X_t:\Omega\to\mathbb R
$$

という確率変数です。

一方、標本点 $\omega$ を固定すれば

$$
t\mapsto X_t(\omega)
$$

という時間関数です。

確率過程論では「分布」と「pathの性質」を両方扱います。

---

## 3. filtration

sigma代数族

$$
\{\mathcal F_t\}_{t\ge0}
$$

が

$$
\boxed{
\mathcal F_s\subset\mathcal F_t
\qquad(s\le t)
}
$$

を満たすとき、filtrationと呼びます。

$\mathcal F_t$ は

> 時刻 $t$ までに利用できる情報

を表します。

時間が進むと情報は増えてよいが、忘れないという構造です。

---

## 4. natural filtration

確率過程 $X$ 自身が作る情報を

$$
\boxed{
\mathcal F_t^X
=
\sigma(X_s:0\le s\le t)
}
$$

と書きます。

これがnatural filtrationです。

過程の過去を全部観測したときに得られる最小の情報です。

離散時間なら

$$
\mathcal F_n^X
=
\sigma(X_0,\dots,X_n).
$$

---

## 5. adapted process

過程 $X_t$ がfiltration $(\mathcal F_t)$ にadaptedであるとは、各 $t$ について

$$
\boxed{X_t\text{ が }\mathcal F_t\text{-可測}}
$$

であることです。

つまり現在値 $X_t$ は、時刻 $t$ までの情報だけで決まります。

未来を見て現在値を定めるような過程はadaptedではありません。

---

## 6. なぜadaptednessが必要か

後のItô積分

$$
\int_0^t H_s\,dB_s
$$

では、係数 $H_s$ が未来のBrown運動を見て決まることを許したくありません。

取引戦略で例えるなら、時刻 $s$ のポジションを未来価格を見て決めてはいけない、という条件です。

その最初の情報制約がadaptednessです。

より厳密なItô積分ではpredictableやprogressively measurableといった条件を使いますが、この章ではまずadaptednessを軸に理解します。

---

## 7. stopping time

ランダム時刻

$$
\tau:\Omega\to[0,\infty]
$$

がstopping timeであるとは、全ての $t$ について

$$
\boxed{
\{\tau\le t\}\in\mathcal F_t
}
$$

であることです。

つまり時刻 $t$ の時点で

> もう停止したか

を、その時点までの情報だけで判定できます。

---

## 8. 初回到達時刻

例えば

$$
\tau_a
=
\inf\{t\ge0:X_t\ge a\}
$$

を考えます。

連続pathなど適切な条件の下で、これは典型的なstopping timeです。

時刻 $t$ までに $a$ へ到達したかどうかは、それまでのpathだけで判定できます。

---

## 9. stopping timeでない例

有限期間 $0\le t\le T$ で

$$
\tau
=
\text{最大値を達成する最後の時刻}
$$

のような量を考えると、通常は未来全体を見なければ判定できません。

したがってこれは自然なfiltrationに対するstopping timeではありません。

重要なのは「時刻がランダムか」ではなく、**未来を見ずに判定できるか**です。

---

## 10. stopped process

stopping time $\tau$ に対して

$$
\boxed{
X_t^\tau
=X_{t\wedge\tau}
}
$$

をstopped processと呼びます。

停止時刻までは元の過程を進み、その後は停止時の値に固定します。

martingaleを停止したとき何が起こるかが次章のoptional stoppingにつながります。

---

## 11. Markov性との関係

Markov過程では概念的に

$$
E[f(X_{t+s})\mid\mathcal F_t]
=
E[f(X_{t+s})\mid X_t]
$$

となります。

過去全部 $\mathcal F_t$ を知っても、未来予測に必要なのは現在状態 $X_t$ だけ、という構造です。

E2-01で扱うMarkov性を、ここではfiltrationと条件付き期待値の言葉で読めるようにします。

---

## 12. 確率過程と時系列の違い

数学的には離散時間時系列も確率過程です。

ただし実務的には

- 確率過程論：確率モデルの時間構造そのものを研究
- 時系列解析：観測された一本の系列から構造を推定・予測

という重点の違いがあります。

Encore IV後半では、この二つを定常過程とHilbert空間予測で接続します。

---

## 章末チェック

- 確率過程を確率変数族として定義できる。
- sample pathと固定時刻の確率変数を区別できる。
- filtrationを時間とともに増える情報として説明できる。
- natural filtrationを構成できる。
- adapted processを説明できる。
- stopping timeを情報制約から定義できる。
- 初回到達時刻と未来を使う時刻を区別できる。
- Markov性をfiltrationによる条件付き期待値で読める。
