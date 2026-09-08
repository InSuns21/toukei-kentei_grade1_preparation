# CA2 複素線積分・原始関数・Cauchy–Goursat

> **実装状態**：定義・定理文・例・演習を固定した draft。**定理の証明は TODO**。Cauchy–Goursat を名前だけで既知扱いしません。

## 1. 複素線積分
区分的 $C^1$ 曲線 $\gamma:[a,b]\to\Omega$ に対し
$$\int_\gamma f(z)\,dz:=\int_a^b f(\gamma(t))\gamma'(t)\,dt$$
と定義する。右辺は実部・虚部ごとの Riemann 積分である。

### 定理 CA2-THM-01：再パラメータ化と ML 評価
向きを保つ再パラメータ化で値は不変で、
$$\left|\int_\gamma f(z)\,dz\right|\le L(\gamma)\max_{\gamma}|f|.$$
**証明 TODO**：実積分の置換と三角不等式を使う。

## 2. 原始関数
$F'=f$ を満たす正則関数 $F$ を原始関数という。

### 定理 CA2-THM-02：複素線積分の基本定理
$$\int_\gamma f(z)\,dz=F(\gamma(b))-F(\gamma(a)).$$
**証明 TODO**：$F\circ\gamma$ の連鎖律を実変数 FTC へ接続する。

### 定理 CA2-THM-03：経路独立性と原始関数
経路積分が端点だけで決まること、全閉曲線積分が0であること、原始関数を持つことの同値を適切な経路連結性の下で示す。
**証明 TODO**：基点からの積分で原始関数を構成する。

## 3. Cauchy–Goursat
### 定理 CA2-THM-04：三角形版 Cauchy–Goursat
三角形 $\Delta$ とその近傍で $f$ が正則なら $\int_{\partial\Delta}f\,dz=0$。
**証明 TODO**：4分割反復と局所一次近似を使い、偏導関数連続を追加仮定しない Goursat 型で証明する。

### 定理 CA2-THM-05：星型領域の Cauchy の定理
星型領域上の正則関数は原始関数を持ち、閉曲線積分は0。
**証明 TODO**：三角形版から基点を頂点とする積分を構成する。

## 4. 穴と対数
単位円 $\gamma(t)=e^{it}$ では
$$\int_\gamma\frac{dz}{z}=2\pi i,$$
したがって $1/z$ は $\mathbb C\setminus\{0\}$ 全体で原始関数を持たない。

### 定理 CA2-THM-06：正則対数の枝
単連結領域 $\Omega\subset\mathbb C\setminus\{0\}$ では $e^{L(z)}=z$ を満たす正則な対数の枝を構成できる。
**証明 TODO**：単連結性から閉曲線積分0へ進むホモトピー版 Cauchy 理論を明示する。

## 演習
- Level: A — 線分 $0\to1+i$ 上で $\int z\,dz$ を計算せよ。
- Level: A — 単位円上で $\int z^n\,dz$ を整数 $n$ ごとに計算せよ。
- Level: A — 逆向き曲線で積分の符号が反転することを示せ。
- Level: A — ML 評価で短い円弧上の積分を評価せよ。
- Level: B — 原始関数があれば閉曲線積分が0になることを示せ。
- Level: B — $1/z$ が穿孔平面で原始関数を持たないことを示せ。
- Level: B — 星型領域で基点積分から原始関数を構成せよ。
- Level: C — $\mathbb C\setminus(-\infty,0]$ 上で主値対数を構成せよ。
