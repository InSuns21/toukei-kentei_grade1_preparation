# F0-00WK2 Encore III：Lax--Milgram定理・弱解の存在一意性

WK1でPoisson方程式を

$$
a(u,v)=F(v)
\qquad(\forall v\in V)
$$

というHilbert空間上の方程式へ変換しました。

ここでは、その解がなぜ存在し、なぜ一意なのかをLax--Milgram定理で証明します。

---

## 1. 設定

$V$ を実Hilbert空間とします。

双線形形式

$$
a:V\times V\to\mathbb R
$$

が連続、つまりある $M>0$ が存在して

$$
\boxed{
|a(u,v)|
\le M\|u\|\|v\|
}
$$

を満たすとします。

さらにある $\alpha>0$ が存在して

$$
\boxed{
a(v,v)\ge\alpha\|v\|^2}
$$

を全ての $v\in V$ について満たすとします。

これをcoercivityと呼びます。

---

## 2. Lax--Milgram定理

$F\in V^*$ とします。

このとき

$$
\boxed{
\exists!u\in V:
\quad
a(u,v)=F(v)
\qquad(\forall v\in V)
}
$$

です。

さらに

$$
\boxed{
\|u\|
\le
\frac1\alpha\|F\|_{V^*}
}
$$

という安定性評価も得られます。

---

<!-- round3-hidden-proof-fixed -->
## 3. 証明の見取り図：弱形式を可逆な作用素方程式へ変える

Lax--Milgramの完全証明は長いですが、構造は一本です。

```text
Riesz表現で a(u,v)=<Au,v> と作用素 A を作る
  ↓
coercivity から ||Au|| >= alpha ||u||
  ↓
A は単射、かつ range は閉
  ↓
(Ran A)^perp={0} から range は稠密
  ↓
閉 + 稠密 なので Ran A=V、従って全射
  ↓
Au=f を解き、同じ下側評価から安定性も得る
```

有限次元なら「正定値行列だから逆がある」と一言で済んだ部分を、無限次元では単射・閉range・稠密性・全射へ分解して確認している、と読むと見通しがよくなります。

<!-- proof-start -->
### 完全証明（Lax--Milgram の存在一意性）

## 3. Riesz表現で作用素を作る

$u\in V$ を固定します。

$v\mapsto a(u,v)$ は連続線形汎関数です。

Riesz表現定理により、ただ一つの $Au\in V$ が存在して

$$
\boxed{
a(u,v)=\langle Au,v\rangle}
$$

と書けます。

これにより線形作用素

$$
A:V\to V
$$

が定まります。

連続性から

$$
\|Au\|
\le M\|u\|
$$

なので $A$ は有界です。

---

## 4. 右辺Fもベクトルで表す

Riesz表現定理により、$F\in V^*$ に対してただ一つの $f\in V$ が存在して

$$
F(v)=\langle f,v\rangle.
$$

したがって

$$
a(u,v)=F(v)
\quad(\forall v)
$$

は

$$
\langle Au-f,v\rangle=0
\quad(\forall v)
$$

と同値です。

よって解くべき問題は

$$
\boxed{Au=f}
$$

になりました。

---

## 5. coercivityからAを下から評価する

coercivityより

$$
\alpha\|u\|^2
\le a(u,u)
=\langle Au,u\rangle.
$$

Cauchy--Schwarzから

$$
\langle Au,u\rangle
\le\|Au\|\|u\|.
$$

$u\ne0$ なら割って

$$
\boxed{
\|Au\|
\ge\alpha\|u\|
}
$$

を得ます。

これは非常に強い評価です。

---

## 6. 単射性

$Au=0$ なら

$$
0=\|Au\|
\ge\alpha\|u\|.
$$

したがって $u=0$ です。

よって

$$
\boxed{A\text{ は単射}}
$$

です。

これが解の一意性に対応します。

---

## 7. rangeは閉じている

$Au_n\to y$ とします。

下からの評価より

$$
\|u_n-u_m\|
\le
\frac1\alpha
\|Au_n-Au_m\|.
$$

したがって $Au_n$ がCauchyなら $u_n$ もCauchyです。

$V$ は完備なので

$$
u_n\to u
$$

となる $u\in V$ が存在します。

$A$ は連続なので

$$
Au_n\to Au.
$$

極限の一意性から $y=Au$ です。

したがって

$$
\boxed{\operatorname{Ran}A\text{ は閉}}
$$

です。

---

## 8. rangeは稠密である

$y$ が $\operatorname{Ran}A$ に直交するとします。

つまり全ての $u\in V$ に対して

$$
\langle Au,y\rangle=0.
$$

Rieszによる定義から

$$
a(u,y)=0
\qquad(\forall u\in V).
$$

特に $u=y$ と置けば

$$
a(y,y)=0.
$$

coercivityから

$$
0\ge\alpha\|y\|^2
$$

なので $y=0$ です。

したがって

$$
(\operatorname{Ran}A)^\perp=\{0\}.
$$

Hilbert空間ではこれは

$$
\boxed{
\overline{\operatorname{Ran}A}=V
}
$$

を意味します。

---

## 9. 閉かつ稠密なので全射

rangeは

- 閉
- 稠密

でした。

したがって

$$
\boxed{\operatorname{Ran}A=V}.
$$

つまり $A$ は全射です。

任意の $f\in V$ に対して $Au=f$ を満たす $u$ が存在します。

単射性と合わせて $A$ は一対一対応になります。

これで存在一意性が証明されました。

---

## 10. 安定性評価

解 $u$ に対して

$$
\alpha\|u\|^2
\le a(u,u)
=F(u).
$$

双対ノルムの定義から

$$
|F(u)|
\le
\|F\|_{V^*}\|u\|.
$$

したがって $u\ne0$ なら

$$
\boxed{
\|u\|
\le
\frac1\alpha
\|F\|_{V^*}
}
$$

です。

存在するだけでなく、右辺が小さければ解も制御されます。
<!-- proof-end -->

---

## 11. Poisson方程式へ適用する

$$
V=H_0^1(\Omega),
$$

$$
a(u,v)
=
\int_\Omega\nabla u\cdot\nabla v\,dx,
$$

$$
F(v)
=
\int_\Omega fv\,dx
$$

とします。

Cauchy--Schwarzで $a$ は連続、Poincare不等式でcoercive、$F$ も連続です。

したがってLax--Milgramから

$$
\boxed{
\text{Poisson方程式の弱解 }u\in H_0^1(\Omega)
\text{ は一意に存在する}
}
$$

と分かります。

---

## 12. 対称性は必要か

Lax--Milgramでは

$$
a(u,v)=a(v,u)
$$

という対称性は必須ではありません。

必要なのは

- 双線形
- 連続
- coercive

です。

一方、エネルギー最小化として直接読むには対称性が重要になります。

この区別は大切です。

---

## 13. 有限次元との対応

有限次元で

$$
Ax=b
$$

を考え、$A$ が正定値なら

$$
x^{\mathsf T}Ax
\ge\alpha\|x\|^2
$$

です。

Lax--Milgramは

$$
\boxed{
\text{正定値行列の連立方程式}
\longrightarrow
\text{Hilbert空間上のcoercive問題}
}
$$

への無限次元版と見ることができます。

---

## 章末チェック

- Lax--Milgramの仮定と結論を説明できる。
- Riesz表現から作用素 $A$ を構成できる。
- coercivityから $\|Au\|\ge\alpha\|u\|$ を導ける。
- $A$ の単射性とrangeの閉性を示せる。
- rangeの直交補空間が0であることから稠密性を示せる。
- 閉かつ稠密から全射性を導ける。
- 安定性評価を導ける。
- Poisson弱解の存在一意性へ適用できる。
