# CA3 Cauchy積分公式・Taylor展開・Liouville・最大値原理

> **実装状態**：FA5 の正式前提になる中核章の draft。**定理の証明は TODO**。FA5 はこの章の証明完成後に実装します。

## 1. Cauchy 積分公式
### 定理 CA3-THM-01：Cauchy 積分公式
$f$ が $\overline{D(a,R)}$ を含む開集合で正則なら $|z-a|<R$ に対して
$$f(z)=\frac1{2\pi i}\int_{|\zeta-a|=R}\frac{f(\zeta)}{\zeta-z}\,d\zeta.$$
**証明 TODO**：可除特異性と Cauchy の定理から導く。

### 定理 CA3-THM-02：高階導関数公式
$$f^{(n)}(a)=\frac{n!}{2\pi i}\int_{|\zeta-a|=R}\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta.$$
**証明 TODO**：積分核を一様評価して微分と積分の交換を正当化する。

## 2. Taylor 展開
### 定理 CA3-THM-03：正則なら解析的
$f$ が $D(a,R)$ で正則なら
$$f(z)=\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(z-a)^n\qquad(|z-a|<R).$$
**証明 TODO**：Cauchy 核の幾何級数展開と一様収束による項別積分を使う。

## 3. Cauchy 評価と Liouville
### 定理 CA3-THM-04：Cauchy 評価
$M_R=\max_{|\zeta-a|=R}|f(\zeta)|$ なら
$$|f^{(n)}(a)|\le n!M_R/R^n.$$
**証明 TODO**：高階公式と ML 評価を組み合わせる。

### 定理 CA3-THM-05：Liouville の定理
有界な整関数は定数である。
**証明 TODO**：任意半径での Cauchy 評価から $f'=0$ を得る。

### 系 CA3-COR-01：代数学の基本定理
非定数複素多項式は零点を持つ。
**証明 TODO**：零点なしなら $1/p$ が有界整関数になることを示す。

## 4. 零点と剛性
### 定理 CA3-THM-06：零点の孤立性・恒等定理
非零正則関数の零点は孤立し、集積点を持つ一致集合は連結領域全体へ広がる。
**証明 TODO**：Taylor 展開の最初の非零係数で因数分解する。

### 定理 CA3-THM-07：最大値原理
非定数正則関数は領域内部で $|f|$ の局所最大を取らない。
**証明 TODO**：Cauchy 平均値表示の等号条件を追う。

### 定理 CA3-THM-08：開写像定理（複素解析）
非定数正則関数は開写像である。
**証明 TODO**：局所因数分解から示し、関数解析 FA2 の開写像定理とは概念を分離する。

## 5. FA5 への橋
複素 Banach 空間の resolvent をスカラー化した
$$\lambda\mapsto f\bigl((\lambda I-T)^{-1}x\bigr)$$
に Liouville を適用してスペクトル非空性を示す。FA5 では Liouville を再証明しない。

## 演習
- Level: A — Cauchy公式で $\int_{|z|=2}e^z/z\,dz$ を求めよ。
- Level: A — $\int_{|z|=2}e^z/(z-1)^3\,dz$ を求めよ。
- Level: A — Cauchy評価から導関数を評価せよ。
- Level: A — Liouville を Cauchy 評価から導け。
- Level: B — Taylor係数の積分表示を導け。
- Level: B — Liouville から代数学の基本定理を導け。
- Level: B — 零点が集積すれば恒等的に0であることを示せ。
- Level: C — $|f(z)|\le C(1+|z|^m)$ を満たす整関数が次数高々 $m$ の多項式であることを示せ。
