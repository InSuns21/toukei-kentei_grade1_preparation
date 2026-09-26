# F0-02C7A 関数解析VII-A：representer theorem・kernel SVM

[RKHS2 の表現定理](../RKHS2/index.md#thm-rkhs2-representer)で、訓練点での値と RKHS ノルムだけに依存する正則化問題の最小解が、核切片の有限線形結合へ落ちることを証明しました。

ここではその結果を使い、soft-margin SVM の停留条件から得られる有限和表示と、核値だけで書ける双対問題・判別関数を確認します。表現定理そのものの証明は RKHS2 を参照し、本ページでは SVM 側の計算へ集中します。

## 1. 表現定理から持ち込む有限和表示

訓練点 $x_1,\dots,x_n$ に対して
$$
S=\operatorname{span}\{K_{x_1},\dots,K_{x_n}\}
$$
と置くと、RKHS2 の表現定理により、二乗 RKHS ノルム正則化を持つ問題の最小解は
$$
f^*(\cdot)
=
\sum_{i=1}^n\alpha_iK(\cdot,x_i)
$$
の形に取れます。

この章では、SVM の Lagrange 停留条件から同じ有限標本構造がどのように現れるかを追います。


---

## 2. kernel SVMの主問題

特徴写像

$$
\varphi(x)\in\mathcal H
$$

をHilbert空間に取ります。

soft-margin SVMの主問題は

$$
\min_{w\in\mathcal H,b\in\mathbb R,\xi_i\ge0}
\frac12\|w\|_{\mathcal H}^2
+C\sum_{i=1}^n\xi_i
$$

subject to

$$
y_i
\bigl(
\langle w,\varphi(x_i)\rangle_{\mathcal H}+b
\bigr)
\ge1-\xi_i.
$$

これはまさに **Hilbert空間上の凸最適化** です。

---

## 3. Lagrangian

マージン制約に $\alpha_i\ge0$、$\xi_i\ge0$ に $\mu_i\ge0$ を入れると

$$
\begin{aligned}
L
&=\frac12\|w\|^2
+C\sum_i\xi_i\\
&\quad+
\sum_i\alpha_i
\left[
1-\xi_i
-y_i(\langle w,\varphi(x_i)\rangle+b)
\right]
-\sum_i\mu_i\xi_i.
\end{aligned}
$$

$w$ に関するFréchet微分を取ります。

---

## 4. stationarityから有限和が出る

F0-02C3で見たように

$$
D_w\frac12\|w\|^2[h]
=\langle w,h\rangle.
$$

また

$$
D_w\langle w,\varphi(x_i)\rangle[h]
=\langle h,\varphi(x_i)\rangle.
$$

したがって $w$ に関するstationarityは

$$
\left\langle
w-\sum_i\alpha_i y_i\varphi(x_i),
 h
\right\rangle
=0
\qquad(\forall h\in\mathcal H).
$$

Riesz表現の一意性から

$$
\boxed{
w
=\sum_{i=1}^n
\alpha_i y_i\varphi(x_i)
}.
$$

無限次元かもしれない空間で、最適法線が有限個の訓練特徴の張る空間へ落ちました。

---

## 5. $b$ と $\xi$ のstationarity

$b$ について

$$
\boxed{
\sum_i\alpha_i y_i=0
}
$$

が得られます。

$\xi_i$ について

$$
C-\alpha_i-\mu_i=0.
$$

$\mu_i\ge0$ なので

$$
\boxed{0\le\alpha_i\le C}.
$$

---

## 6. 双対目的関数

$w$ の有限和表示をLagrangianへ戻すと

$$
\boxed{
\max_{\alpha}
\sum_{i=1}^n\alpha_i
-
\frac12
\sum_{i,j=1}^n
\alpha_i\alpha_jy_iy_j
\langle\varphi(x_i),\varphi(x_j)\rangle
}
$$

subject to

$$
0\le\alpha_i\le C,
\qquad
\sum_i\alpha_i y_i=0.
$$

ここで

$$
\langle\varphi(x_i),\varphi(x_j)\rangle
=K(x_i,x_j)
$$

なので

$$
\boxed{
\max_{\alpha}
\sum_i\alpha_i
-
\frac12
\sum_{i,j}
\alpha_i\alpha_jy_iy_jK(x_i,x_j)
}
$$

となります。

特徴ベクトルそのものは消え、kernel値だけが残ります。

---

## 7. 判別関数

新しい入力 $x$ に対して

$$
\begin{aligned}
f(x)
&=\langle w,\varphi(x)\rangle+b\\
&=
\sum_i\alpha_i y_i
\langle\varphi(x_i),\varphi(x)\rangle+b\\
&=
\boxed{
\sum_i\alpha_i y_iK(x_i,x)+b
}.
\end{aligned}
$$

したがって予測時にも特徴空間の座標を明示する必要がありません。

---

## 8. サポートベクトル

$\alpha_i=0$ の訓練点は

$$
w
=\sum_i\alpha_i y_i\varphi(x_i)
$$

にも判別関数にも寄与しません。

したがって

$$
\boxed{\alpha_i>0}
$$

の点だけが解を直接支えます。

これが **support vector** という名前の代数的な意味です。

相補性条件と合わせると、どの点がmargin上・margin内・誤分類側にあるかをさらに整理できます。具体的なKKT分類はE1-04へ戻ります。

---

## 9. representer theoremとSVM stationarityは同じ現象を見る

representer theoremは

$$
f^*\in\operatorname{span}\{K_{x_i}\}
$$

と言います。

SVMのstationarityは

$$
w^*\in\operatorname{span}\{\varphi(x_i)\}
$$

と言います。

canonical feature map

$$
\varphi(x)=K_x
$$

を使えば同じ構造です。

つまり

$$
\boxed{
\text{無限次元の最適化}
\quad\text{なのに}\quad
\text{解は有限標本が張る部分空間へ落ちる}
}
$$

ことがkernel法の核心です。

---

## 10. 「kernel trick」の正体

よくある説明は

> 高次元へ写して内積だけkernelで計算する。

です。

関数解析まで遡ると、より正確には

$$
\boxed{
\begin{array}{c}
K\text{ がPSD}\\
\Downarrow\\
K\text{ を再生核とするRKHSが存在}\\
\Downarrow\\
\varphi(x)=K_x\\
\Downarrow\\
K(x,z)=\langle\varphi(x),\varphi(z)\rangle\\
\Downarrow\\
\text{representer theorem / KKTにより有限和解}\\
\Downarrow\\
\text{Gram行列だけで学習できる}
\end{array}
}
$$

です。

---

## 11. Mercerの定理とは区別する

kernelの説明で「Mercerの定理」が同義語のように使われることがありますが、区別した方が安全です。

**Moore--Aronszajnの定理** は、抽象的なPSD kernelとRKHSの対応を与えます。

一方 **Mercerの定理** は、コンパクトな領域上の連続kernelなど追加条件の下で、積分作用素の固有関数を用いた展開を与える定理です。

したがって

$$
\boxed{
\text{kernelからRKHSを得るだけなら
Moore--Aronszajnが基本}
}
$$

と整理します。

---

## 12. 02C系列の全体回収

ここまでの7講を一本にすると

$$
\boxed{
\begin{array}{c}
\text{ノルム・完備性}\\
\Downarrow\\
\text{Banach / Hilbert}\\
\Downarrow\\
\text{双対空間・Riesz}\\
\Downarrow\\
\text{Fr\'echet微分・随伴}\\
\Downarrow\\
\text{normal cone・双対錐}\\
\Downarrow\\
\text{一般化KKT・制約想定}\\
\Downarrow\\
\text{Hahn--Banach・分離}\\
\Downarrow\\
\text{RKHS・再生核・kernel SVM}
\end{array}
}
$$

です。

SVMのkernelは最後に突然追加された計算テクニックではありません。

**線形代数・最適化を関数空間まで一般化していくと、かなり自然な場所に現れる構造**です。

---

## 演習

### F0-02C7A-A01 直交成分は訓練点で見えない

- Level: A
- 目安時間: 10分

$S=\operatorname{span}\{K_{x_i}\}$、$f_\perp\in S^\perp$ とする。$f_\perp(x_i)=0$ を示せ。

<!-- solution-start -->
#### 詳細解答
再生性より $f_\perp(x_i)=\langle f_\perp,K_{x_i}\rangle=0$。
#### 本番答案
再生性より $f_\perp(x_i)=\langle f_\perp,K_{x_i}\rangle=0$。
#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### F0-02C7A-B01 kernel SVMの有限和

- Level: B
- 目安時間: 15分

Hilbert空間SVMのstationarityから $w=\sum_i\alpha_i y_i\varphi(x_i)$ が出る理由を説明せよ。

<!-- solution-start -->
#### 詳細解答
$w$ 方向の微分を0とすると $\langle w-\sum_i\alpha_i y_i\varphi(x_i),h\rangle=0$ が全hで成立。内積の非退化性より括弧内が0。
#### 本番答案
$w$ 方向の微分を0とすると $\langle w-\sum_i\alpha_i y_i\varphi(x_i),h\rangle=0$ が全hで成立。内積の非退化性より括弧内が0。
#### 採点基準（20点）
- 方針: 5点
- 中心となる導出: 11点
- 結論: 4点
<!-- solution-end -->

---

## 系列の回収

これで、Banach/Hilbert → 双対/Riesz → Fréchet微分 → 随伴 → 劣微分/normal cone → cone幾何 → 一般化KKT → 制約想定 → Hahn--Banach → 分離 → RKHS → representer/kernel SVM が一講義一サイクルで接続されます。
