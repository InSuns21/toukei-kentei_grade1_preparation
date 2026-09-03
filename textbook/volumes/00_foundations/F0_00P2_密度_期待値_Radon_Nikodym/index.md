# F0-00P2 密度・Radon–Nikodym：pmfとpdfを同じ式で読む

P1で分布を確率測度として定義しました。この講義では「密度」をLebesgue密度だけに限定せず、**基準測度に対するRadon--Nikodym微分**として統一します。

$$\boxed{P_X\ll\nu\quad\Longrightarrow\quad P_X(A)=\int_A\frac{dP_X}{d\nu}\,d\nu}$$

離散分布のpmfも連続分布のpdfもこの一式の特殊例です。期待値そのものは次講P2Aへ分離します。

---

## 1. まず「密度がある」とは何か

実数上のLebesgue測度を $\lambda$ とします。

確率分布 $P_X$ が $\lambda$ に対して絶対連続であるとは

$$
\lambda(A)=0
\Longrightarrow
P_X(A)=0
$$

が任意の可測集合 $A$ で成り立つことです。

記号で

$$
P_X\ll\lambda
$$

と書きます。

つまり、Lebesgue測度から見て大きさ0の集合へ、分布が正の確率質量を置かないという条件です。

---

## 2. Radon--Nikodym定理

<a id="thm-f0-00p2-radon-nikodym"></a>

<!-- formal-statement-start -->
> **定理（Radon--Nikodym定理）**  
> $(\Omega,\mathcal F)$ 上の sigma 有限な非負測度 $\mu,\nu$ が $\nu\ll\mu$ を満たすとします。このとき非負可測関数 $f$ が存在し、任意の $A\in\mathcal F$ に対して

$$
\boxed{
\nu(A)=\int_A f\,d\mu
}
$$

> が成り立ちます。この $f$ は $\mu$-a.e. の意味で一意です。
<!-- formal-statement-end -->

測度 $\nu$ が sigma有限測度 $\mu$ に対して絶対連続なら、ある非負可測関数 $f$ が存在して

$$
\boxed{
\nu(A)=\int_A f\,d\mu
}
$$

と書けます。

$f$ は $\mu$-a.e. の意味で一意です。

これがRadon--Nikodym定理です。

記号で

$$
\boxed{
f=\frac{d\nu}{d\mu}}
$$

と書き、Radon--Nikodym微分と呼びます。

完全証明は測度論の標準講義に譲りますが、ここで重要なのは

> 「測度を基準測度に対する密度関数で表す」ことを保証する定理

だという点です。

---

## 3. pdfの正体

$P_X\ll\lambda$ ならRadon--Nikodym定理から

$$
\boxed{
f_X=\frac{dP_X}{d\lambda}}
$$

が存在します。

そして任意の可測集合 $A$ について

$$
\boxed{
P(X\in A)
=P_X(A)
=\int_A f_X(x)\,dx
}
$$

です。

これが確率密度関数pdfです。

つまり理論上は

$$
\boxed{
\text{分布}
\to
\text{絶対連続性}
\to
\text{Radon--Nikodym微分}
\to
\text{pdf}
}
$$

という順です。

---

## 4. 離散分布も基準測度を変えれば密度を持つ

離散分布はLebesgue測度に対して絶対連続ではありません。

例えば一点集合 $\{x_0\}$ は

$$
\lambda(\{x_0\})=0
$$

ですが、点質量があれば

$$
P_X(\{x_0\})>0
$$

です。

しかし整数上の数え上げ測度 $\# $ を基準に取れば

$$
P_X\ll \#
$$

であり、Radon--Nikodym微分はpmfになります。

したがってpmfとpdfは本質的に別々の概念ではありません。

$$
\boxed{
\text{pmf/pdf}
=\text{基準測度に対する分布の密度}
}
$$

です。

---

## 5. 支配測度という考え方

統計モデルではパラメータ $\theta$ ごとに分布

$$
P_\theta
$$

があります。

全ての $P_\theta$ が同じ測度 $\mu$ に対して絶対連続なら

$$
P_\theta\ll\mu
$$

であり、

$$
p_\theta
=\frac{dP_\theta}{d\mu}
$$

と書けます。

この $\mu$ を支配測度と呼びます。

連続モデルならLebesgue測度、離散モデルなら数え上げ測度を使うことが多いです。

後の尤度は、この $p_\theta$ を観測値で評価したものです。

---

## 演習

### F0-00P2-A01 Bernoulli分布をcounting measureで書く

- Level: A
- 目安時間: 10分

$P(X=1)=p$, $P(X=0)=1-p$ とする。$\{0,1\}$ 上のcounting measure $\nu$ に対する $P_X$ のRadon--Nikodym密度を求めよ。

<!-- solution-start -->
#### 詳細解答
counting measureでは一点の測度が1なので、密度はそのままpmfである。$dP_X/d\nu(0)=1-p$, $dP_X/d\nu(1)=p$。

#### 本番答案
$dP_X/d\nu(x)=p^x(1-p)^{1-x}\;(x=0,1)$。

#### 採点基準（20点）
- counting measureの理解: 6点
- 2点の密度: 10点
- RN表示: 4点
<!-- solution-end -->

### F0-00P2-B01 支配測度を変えても同じ分布

- Level: B
- 目安時間: 15分

有限集合 $S$ 上で $\nu(\{x\})=w_x>0$ とする。確率質量 $p_x=P(X=x)$ を持つ分布の $\nu$ に対する密度 $f$ を求め、$\int_A f\,d\nu=P(X\in A)$ を確認せよ。

<!-- solution-start -->
#### 詳細解答
一点 $\{x\}$ で $p_x=f(x)w_x$ だから $f(x)=p_x/w_x$。従って $\int_Af\,d\nu=\sum_{x\in A}(p_x/w_x)w_x=\sum_{x\in A}p_x=P(X\in A)$。

#### 本番答案
$f(x)=p_x/w_x$。ゆえに $\int_Af\,d\nu=\sum_{x\in A}p_x$。

#### 採点基準（20点）
- RN密度: 8点
- 積分計算: 8点
- 分布との一致: 4点
<!-- solution-end -->

---

## 次に進む

密度を統一したら [F0-00P2A 期待値・LOTUS](../F0_00P2A_期待値_LOTUS/index.md) で、確率変数の期待値を分布上の積分へ移します。
