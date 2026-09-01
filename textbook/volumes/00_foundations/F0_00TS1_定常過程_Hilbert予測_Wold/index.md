# F0-00TS1 Encore IV：定常過程・Hilbert空間予測・innovation・Wold分解

ここから離散時間の時系列へ戻ります。

E2-03ではAR・MA・ARIMAの計算を扱います。この補講では、その予測理論の下にあるHilbert空間構造を見ます。

---

## 1. 二次定常過程

二乗可積分過程 $(X_t)_{t\in\mathbb Z}$ が二次定常であるとは

$$
E[X_t]=\mu
$$

が時刻によらず、

$$
\boxed{
\operatorname{Cov}(X_t,X_s)
=\gamma(t-s)
}
$$

となることです。

以下では簡単のため平均0へ中心化します。

---

## 2. 確率変数をHilbert空間のベクトルとして見る

二乗可積分確率変数全体

$$
L^2(\Omega,\mathcal F,P)
$$

には内積

$$
\boxed{
\langle X,Y\rangle
=E[XY]
}
$$

を入れられます。

平均0なら

$$
\langle X_t,X_s\rangle
=\gamma(t-s).
$$

自己共分散は、確率変数というベクトル同士の内積です。

---

## 3. 過去が張る部分空間

時刻 $t$ より前の変数の有限線形結合を考え、その $L^2$ 閉包を

$$
\boxed{
\mathcal H_{t-1}
=
\overline{\operatorname{span}}
\{X_{t-1},X_{t-2},\dots\}
}
$$

とします。

これは「過去から線形に作れる全ての予測量」の空間です。

---

## 4. 最良線形予測は直交射影

$X_t$ を過去から線形予測したいとします。

二乗誤差

$$
E[(X_t-Y)^2]
=
\|X_t-Y\|_2^2
$$

を $Y\in\mathcal H_{t-1}$ の中で最小化する問題です。

Hilbert空間の射影定理から一意な最良予測

$$
\boxed{
\widehat X_t
=P_{\mathcal H_{t-1}}X_t
}
$$

が存在します。

---

## 5. innovation

予測誤差を

$$
\boxed{
\varepsilon_t
=X_t-\widehat X_t
}
$$

とします。

射影の特徴付けから

$$
\boxed{
E[\varepsilon_tY]=0
\qquad(\forall Y\in\mathcal H_{t-1})
}
$$

です。

つまりinnovationは過去の全ての線形情報に直交します。

---

## 6. innovationはwhite noise型になる

$s<t$ なら $\varepsilon_s$ は時刻 $t-1$ までの過去空間に属するので

$$
E[\varepsilon_t\varepsilon_s]=0.
$$

したがってinnovation列は互いに無相関です。

分散が一定ならwhite noiseになります。

ここでいう離散時間white noiseは

> 平均0・一定分散・異時点で無相関

という通常の確率変数列です。

SP3で扱った連続時間white noise＝Brown運動のSchwartz超関数的微分とは区別します。

---

## 7. 有限過去での予測と正規方程式

有限個

$$
X_{t-1},\dots,X_{t-p}
$$

だけを使い

$$
\widehat X_t
=a_1X_{t-1}+\cdots+a_pX_{t-p}
$$

とします。

誤差が各説明変数に直交する条件

$$
E[(X_t-\widehat X_t)X_{t-k}]=0
$$

から

$$
\boxed{
\gamma(k)
=
\sum_{j=1}^p a_j\gamma(k-j)
}
$$

型の正規方程式が出ます。

ARモデルではこれがYule--Walker方程式になります。

---

## 8. AR(1)を射影として見る

$$
X_t=\phi X_{t-1}+\varepsilon_t,
\qquad |\phi|<1
$$

でinnovationが過去と直交するとします。

すると

$$
P_{\mathcal H_{t-1}}X_t
=\phi X_{t-1}.
$$

つまりAR(1)の予測式は、単にモデル式を代入したものではなく、過去空間への直交射影です。

---

## 9. 無限過去とdeterministic成分

過去空間をさらに遡り

$$
\mathcal H_{-\infty}
=
\bigcap_t\mathcal H_t
$$

を考えます。

ここに残る成分は、どれだけ時間を遡っても過去から完全に予測できる情報です。

これをdeterministic成分と考えます。

例えばランダムな振幅・位相を持つ完全な正弦波は、十分な過去を知れば未来を完全に予測できる成分を持ちます。

---

## 10. purely nondeterministic

$$
\mathcal H_{-\infty}=\{0\}
$$

である場合、過程をpurely nondeterministicと呼びます。

無限過去からも完全には予測できる非自明な成分が残らないという意味です。

ARMA過程の標準的なinnovation表現では、この性質が重要になります。

---

## 11. Wold decomposition

平均0の二次定常過程は、適切な条件の下で直交的に

$$
\boxed{
X_t
=X_t^{(d)}
+
\sum_{j=0}^{\infty}
\psi_j\varepsilon_{t-j}
}
$$

と分解できます。

ここで

- $X_t^{(d)}$：deterministic成分
- $\varepsilon_t$：innovation white noise
- $\psi_0=1$
- $\sum_j\psi_j^2<\infty$

です。

これがWold decompositionです。

---

## 12. Woldの意味

purely nondeterministicならdeterministic成分は消えて

$$
\boxed{
X_t
=
\sum_{j=0}^{\infty}
\psi_j\varepsilon_{t-j}
}
$$

となります。

つまり非常に広い定常過程が「現在と過去のinnovationの無限MA」として表現できます。

E2-03のMAモデルは、これを有限次数へ切った特殊な形だと見られます。

---

## 13. 条件付き期待値との違い

$$
E[X_t\mid\mathcal F_{t-1}]
$$

は全ての可測関数を許した最良二乗予測です。

一方

$$
P_{\mathcal H_{t-1}}X_t
$$

は過去の**線形結合**に制限した最良線形予測です。

Gaussian過程では条件付き期待値が線形になるため、両者が一致する重要な場合があります。

---

## 14. 次はスペクトルへ

定常過程の自己共分散列

$$
\gamma(h)
$$

は正定値列です。

次章ではHerglotzの定理により

$$
\gamma(h)
=
\int_{-\pi}^{\pi}
e^{ih\lambda}\,dF(\lambda)
$$

というspectral measureを導入します。

時系列を時間領域ではなく周波数領域で見る準備が整いました。

---

## 章末チェック

- 二次定常性を定義できる。
- 自己共分散をL2内積として読める。
- 過去の線形予測空間を定義できる。
- 最良線形予測を直交射影として説明できる。
- innovationが過去と直交することを示せる。
- 有限予測の正規方程式からYule--Walkerへの橋を説明できる。
- Wold decompositionの主張と意味を説明できる。
- 条件付き期待値による予測と線形予測を区別できる。
