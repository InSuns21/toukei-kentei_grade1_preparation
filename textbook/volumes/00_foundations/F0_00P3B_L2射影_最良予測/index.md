# F0-00P3B 条件付き期待値のL2射影・最良予測

P3Aでは条件付き期待値をRadon--Nikodym構成として定義しました。$X\in L^2$ なら、同じ対象をHilbert空間の**直交射影**として読むことができます。

$$\boxed{E[X\mid\mathcal G]=P_{L^2(\mathcal G)}X}$$

この見方がmartingale、時系列予測、control variateへそのまま伸びます。

---

## 1. $L^2(\mathcal G)$ は閉部分空間

$L^2(\mathcal F)$ のうち $\mathcal G$-可測な同値類だけを集めた部分空間を

$$L^2(\mathcal G)=\{Z\in L^2(\mathcal F):Z\text{ is }\mathcal G\text{-measurable}\}$$

とします。$L^2$ 極限からa.s.収束する部分列を取り、可測関数のa.s.極限が可測であることを使えば、この部分空間は閉です。従ってD2Eの$L^2$完備性によりHilbert空間の閉部分空間になります。

---

## 2. 残差は既知情報と直交する

$M=E[X\mid\mathcal G]$ とします。まず有界な $\mathcal G$-可測 $Z$ について単関数近似を使うと

$$E[(X-M)Z]=0.$$

一般の $Z\in L^2(\mathcal G)$ へは切断 $Z_K=(-K)\vee Z\wedge K$ とCauchy--Schwarzで極限を取ればよいので、

$$\boxed{X-M\perp L^2(\mathcal G)}$$

です。

---

## 3. Pythagoras分解

任意の $Z\in L^2(\mathcal G)$ に対し

$$X-Z=(X-M)+(M-Z).$$

二項は直交するので

$$\boxed{\|X-Z\|_2^2=\|X-M\|_2^2+\|M-Z\|_2^2}.$$

したがって

$$\boxed{E[X\mid\mathcal G]=\arg\min_{Z\in L^2(\mathcal G)}E[(X-Z)^2]}$$

であり、a.s.の意味で一意です。

---

## 4. 「情報が増える」と予測空間が広がる

$\mathcal H\subseteq\mathcal G$ なら

$$L^2(\mathcal H)\subseteq L^2(\mathcal G).$$

より多くの情報を許せば候補となる予測関数が増えるため、最小二乗誤差は悪化しません。tower propertyは射影の入れ子

$$P_{L^2(\mathcal H)}P_{L^2(\mathcal G)}=P_{L^2(\mathcal H)}$$

としても読めます。

---

## 5. 線形回帰との違い

線形回帰は「説明変数の線形span」への射影です。一方 $E[X\mid Y]$ は、$Y$ の**任意の可測関数**からなる $L^2(\sigma(Y))$ への射影です。したがって一般には非線形です。

Gaussianの場合には条件付き期待値が線形になるため、線形回帰と条件付き期待値が一致する特別な状況が現れます。

---

## 演習

### F0-00P3B-A01 条件付き期待値は二乗誤差を最小化する

- Level: A
- 目安時間: 12分

$X\in L^2$、$M=E[X\mid\mathcal G]$ とする。任意の $Z\in L^2(\mathcal G)$ について $E[(X-Z)^2]=E[(X-M)^2]+E[(M-Z)^2]$ を示せ。

<!-- solution-start -->
#### 詳細解答
$X-Z=(X-M)+(M-Z)$。交差項は $M-Z$ がG可測なので $E[(X-M)(M-Z)]=0$。従って平方展開がPythagoras型に分解する。

#### 本番答案
平方展開し、$E[(X-M)(M-Z)]=0$ を条件付き期待値の直交性から用いる。

#### 採点基準（20点）
- 分解: 4点
- 交差項: 8点
- 直交性の理由: 5点
- 結論: 3点
<!-- solution-end -->

### F0-00P3B-B01 最良予測の一意性

- Level: B
- 目安時間: 15分

上の分解から、$M=E[X\mid\mathcal G]$ が $L^2(\mathcal G)$ の中で平均二乗誤差を最小化する一意な予測であることを示せ。

<!-- solution-start -->
#### 詳細解答
右辺第2項は非負なので $E[(X-Z)^2]\ge E[(X-M)^2]$。等号なら $E[(M-Z)^2]=0$、従って $Z=M$ a.s.。

#### 本番答案
Pythagoras分解の第2項が非負。等号条件は $\|M-Z\|_2=0$ なので $Z=M$ a.s.。

#### 採点基準（20点）
- 非負性: 6点
- 最小性: 6点
- 等号条件: 5点
- a.s.一意性: 3点
<!-- solution-end -->

---

## 次に進む

条件付き期待値の測度論とHilbert幾何が揃いました。収束事象を扱う [F0-00P4](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md) へ進めます。Encore IVのmartingale・時系列予測へ行く場合、このP3BがHilbert予測の直接の橋になります。
