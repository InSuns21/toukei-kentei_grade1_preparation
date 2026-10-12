# SGT7 電気ネットワークと有効抵抗

[SGT1のDirichletエネルギー](../SGT1/index.md#thm-sgt1-dirichlet)では、辺の両端の値の差の二乗を足すと組合せLaplacianの二次形式になることを学びました。しかし「この二次形式が小さい」というだけでは、二つの頂点が電気回路としてどれだけつながりやすいかを数値にできません。辺を電気の通り道と考え、二点間に一定の電流を送り込んだら必要な電圧はいくらか、という問いに置き換えます。

この問いでは頂点ごとの電位、辺を流れる電流、電流の出入りの保存則が必要です。すると、確率やクラスタリングに使った同じLaplacianが電位を決め、エネルギーの最小化、固有値分解、全域木まで結び付きます。本章は**有限・連結・無向・正コンダクタンス**の回路で議論します。点群から連続空間への極限は主張しません。

## 1. 辺の向きは計算の約束である

有限頂点集合 $V=\{1,\ldots,n\}$、$n\geq2$ とします。各辺の重み $c_e>0$ は**コンダクタンス**（電気の流れやすさ）で、その逆数 $r_e=1/c_e$ が抵抗です。異なる二頂点を結ぶ正重みの辺からなるグラフは連結とし、自己ループはありません。以下では各無向辺に、計算のためだけに一つの向きを選びます。

例えば道 $1-2-3$ の両辺を $1\to2$、$2\to3$ と向けると、辺の電流が正ならその矢印方向に流れている、負なら逆方向に流れていると読めます。向きの取り方で物理的な電位差や有効抵抗が変わっては困ります。

<a id="def-sgt7-incidence"></a>

<!-- formal-statement-start -->
> **定義（接続行列と向き付き電流）**  
> 有限連結無向重み付きグラフの各辺 $e$ を $u\to v$ と仮に向け、$n\times m$ 行列 $B$ の列 $e$ を $b_e=e_u-e_v$ とする。$C=\operatorname{diag}(c_e)$ とし、$f\in\mathbb R^m$ を向き付き辺電流、$Bf\in\mathbb R^n$ を各頂点からの正味流出量とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt7-incidence -->
### 例：三頂点の道の保存則

**定義の確認**：$1\to2$、$2\to3$ という向きでは

$$
B=\begin{pmatrix}1&0\\-1&1\\0&-1\end{pmatrix},\qquad
B\begin{pmatrix}1\\1\end{pmatrix}
=\begin{pmatrix}1\\0\\-1\end{pmatrix}.
$$

頂点1から1単位が出て、頂点2では入った1単位がそのまま出て、頂点3へ1単位が入ります。全成分の和は常に0です。一本の向きを反転すれば $B$ の対応列と $f$ の成分の符号を両方反転するだけなので、$Bf$ は変わりません。
<!-- definition-example-end -->

頂点電位 $v\in\mathbb R^n$ を置くと、辺 $u\to v$ の電圧降下は $(B^{\mathsf T}v)_e=v_u-v_v$ です。Ohmの法則では、その辺の電流を $f_e=c_e(v_u-v_v)$ と定めます。従って

$$
f=CB^{\mathsf T}v,\qquad
Bf=BCB^{\mathsf T}v.
$$

各辺の寄与は $c_e(e_u-e_v)(e_u-e_v)^{\mathsf T}$ です。対角成分では接する全辺の重みが加算され、非対角成分 $(u,v)$ では $-c_e$ が現れるので

$$
BCB^{\mathsf T}=D-W=L.
$$

これは[SGT1の組合せLaplacianの定義](../SGT1/index.md#def-sgt1-laplacian)と一致します。向きを反転しても各辺の $b_eb_e^{\mathsf T}$ は変わりません。

## 2. 一単位の電流で抵抗を測る

二つの異なる頂点 $s,t$ を決めます。$s$ で1単位を注入し、$t$ で1単位を回収するなら、電流保存則は $Bf=e_s-e_t$ です。電圧の基準値は自由です。全頂点の電位へ同じ定数を足しても辺の電位差は変わりません。

<a id="def-sgt7-resistance"></a>

<!-- formal-statement-start -->
> **定義（電位・電流・有効抵抗）**  
> 上記の有限連結無向グラフで、異なる頂点 $s,t$ に対し $b=e_s-e_t$ とする。$Lv=b$ を満たす電位を取り、Ohm電流を $f=CB^{\mathsf T}v$ とする。このとき二点間の有効抵抗を

$$
R_{\mathrm{eff}}(s,t)=v_s-v_t=b^{\mathsf T}v
$$

> と定義する。辺の散逸エネルギーは $\mathcal E(f)=\sum_e f_e^2/c_e$、電位のエネルギーは $\mathcal D(v)=v^{\mathsf T}Lv$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt7-resistance -->
### 例：重み2と1の道

**定義の確認**：$1-2-3$ のコンダクタンスを順に2と1にします。電流を1ずつ流し、$v_3=0$ と固定すると、辺の電圧降下は $1/2$ と1なので

$$
(v_1,v_2,v_3)=(3/2,1,0),\qquad
f=(2(3/2-1),1(1-0))=(1,1).
$$

実際 $Bf=e_1-e_3$ で、$R_{\mathrm{eff}}(1,3)=3/2$ です。また $\mathcal E(f)=1^2/2+1^2/1=3/2$。電流と電圧の両経路で同じ値を得ました。
<!-- definition-example-end -->

$a^{\mathsf T}La$ は[SGT1の辺エネルギー表示](../SGT1/index.md#thm-sgt1-dirichlet)により $\sum_e c_e(a_u-a_v)^2$ です。$f=CB^{\mathsf T}v$ を代入すると

$$
\mathcal E(f)
=f^{\mathsf T}C^{-1}f
=v^{\mathsf T}BCB^{\mathsf T}v
=v^{\mathsf T}Lv
=v^{\mathsf T}b
=R_{\mathrm{eff}}(s,t).
$$

最後の等号は一単位電流という正規化によります。ここでは電位の解が存在し、同じ二点間の差が一意であることも確認する必要があります。

<a id="prop-sgt7-potential"></a>

<!-- formal-statement-start -->
> **命題（電位方程式の解と一意性）**  
> 有限連結無向グラフの各辺で $c_e>0$ とする。実ベクトル $b$ に対し $Lv=b$ が解を持つ必要十分条件は $\sum_i b_i=0$ であり、解があれば定数ベクトルの加算を除いて一意である。とくに $b=e_s-e_t$ なら $v_s-v_t>0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

[SGT1の核と連結成分の定理](../SGT1/index.md#thm-sgt1-kernel-components)により核は定数方向だけです。実対称行列では像が核の直交補空間であることを使います。抵抗が正であることはエネルギーの辺表示で示します。

<!-- proof-start -->
### 証明

$L\boldsymbol1=0$ かつ $L=L^{\mathsf T}$ なので、$Lv=b$ が解を持てば $\boldsymbol1^{\mathsf T}b=\boldsymbol1^{\mathsf T}Lv=0$ です。逆に[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)から $\operatorname{im}L=(\ker L)^\perp$。連結性と[核の定理](../SGT1/index.md#thm-sgt1-kernel-components)から $\ker L=\operatorname{span}\{\boldsymbol1\}$ なので、$\sum_i b_i=0$ なら $b\in\operatorname{im}L$ です。

二つの解 $v,w$ は $L(v-w)=0$ を満たすため $v-w=a\boldsymbol1$。従って差 $v_s-v_t$ は選んだ解によらない。一単位電流のとき $v^{\mathsf T}Lv=v_s-v_t=\sum_e c_e(v_u-v_v)^2\geq0$。もし零なら全辺で電位差が零となり、連結なので $v$ は定数、したがって $Lv=0$ となって $b=e_s-e_t\ne0$ に矛盾します。ゆえに $v_s-v_t>0$。
<!-- proof-end -->

連結性を失うと、別々の成分に電流源と回収点を置いた場合には $Lv=e_s-e_t$ が解けません。この仮定は後の擬似逆公式でも不可欠です。

## 3. どの経路に電流を流すのが最も安いか

一単位の流れを実現する方法は通常一つではありません。環のあるグラフでは、電流を迂回させたり、不要な循環を足したりできます。ただし保存則 $Bf=b$ は守らなければなりません。現実のOhm電流が特別なのは、電流の二乗に比例する散逸が最小となることです。

<a id="thm-sgt7-thomson"></a>

<!-- formal-statement-start -->
> **定理（Thomsonの最小エネルギー原理）**  
> 有限連結無向グラフの各辺で $c_e>0$ とし、異なる頂点 $s,t$ に対して $b=e_s-e_t$ とする。このとき

$$
R_{\mathrm{eff}}(s,t)
=\min_{Bf=b}\sum_e\frac{f_e^2}{c_e}
$$

> が成り立ち、最小化する電流は $f_*=CB^{\mathsf T}v$（$Lv=b$）ただ一つである。
<!-- formal-statement-end -->

### 証明の見取り図

保存則を満たす別の電流 $f$ はOhm電流 $f_*$ と循環分 $h$ に分けられます。$Bh=0$ とOhmの法則の組合せで、エネルギーの交差項が零になります。残るのは非負の二乗和です。

<!-- proof-start -->
### 証明

[電位方程式の命題](#prop-sgt7-potential)から $Lv=b$ の解 $v$ が存在します。$f_*=CB^{\mathsf T}v$ とすると

$$
Bf_*=BCB^{\mathsf T}v=Lv=b.
$$

任意の実現可能な $f$ に対し $h=f-f_*$ と置けば $Bh=Bf-Bf_*=0$ です。$C^{-1}f_*=B^{\mathsf T}v$ を用いて平方を展開すると

$$
\begin{aligned}
f^{\mathsf T}C^{-1}f
&=(f_*+h)^{\mathsf T}C^{-1}(f_*+h)\\
&=f_*^{\mathsf T}C^{-1}f_*+2h^{\mathsf T}C^{-1}f_*+h^{\mathsf T}C^{-1}h\\
&=f_*^{\mathsf T}C^{-1}f_*+2(Bh)^{\mathsf T}v+h^{\mathsf T}C^{-1}h\\
&=R_{\mathrm{eff}}(s,t)+\sum_e h_e^2/c_e.
\end{aligned}
$$

全ての $c_e>0$ だから最後の和は非負で、零になるのは $h=0$ のときだけです。よって最小値は有効抵抗で、唯一の最小化電流は $f_*$ です。
<!-- proof-end -->

この証明では、迂回電流を個別に列挙していません。保存則と電位差が互いに直交するため、複雑なネットワークでも同じ結論が成立します。

## 4. 電圧を固定して考えるもう一つの最小化

電流1を送り込む代わりに、$s$ の電位を1、$t$ の電位を0に固定してみます。そのとき回路全体が流す電流が多いほど抵抗は小さくなります。この設定では、内部頂点の電位を自由に動かし、辺の電位差に関するエネルギーを最小化します。

<a id="thm-sgt7-dirichlet"></a>

<!-- formal-statement-start -->
> **定理（Dirichletの境界電位原理）**  
> 有限連結無向グラフの各辺で $c_e>0$ とし、$s\ne t$ とする。境界条件 $\phi_s=1$、$\phi_t=0$ を課したとき、

$$
\min_{\phi_s=1,\,\phi_t=0}\phi^{\mathsf T}L\phi
=\frac1{R_{\mathrm{eff}}(s,t)}
$$

> である。最小化する電位 $\phi_*$ は一意で、$s,t$ 以外の各頂点で $(L\phi_*)_i=0$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

一単位電流を流す電位を抵抗で割れば、両端の電位差が1になります。その電位からのずれは両端で零なので、エネルギーを展開した交差項が消えます。最小値は抵抗の逆数になります。

<!-- proof-start -->
### 証明

[電位方程式の命題](#prop-sgt7-potential)から $Lv=b=e_s-e_t$ を満たす $v$ を選び、定数を引いて $v_t=0$ とします。$R=R_{\mathrm{eff}}(s,t)=v_s>0$ なので $\phi_*=v/R$ とすれば $\phi_{*,s}=1$、$\phi_{*,t}=0$。また

$$
L\phi_*=\frac1R(e_s-e_t),\qquad
\phi_*^{\mathsf T}L\phi_*=\frac1R(\phi_{*,s}-\phi_{*,t})=\frac1R.
$$

他の境界電位 $\phi$ は $h=\phi-\phi_*$ と書け、$h_s=h_t=0$ です。従って

$$
\begin{aligned}
\phi^{\mathsf T}L\phi
&=\phi_*^{\mathsf T}L\phi_*+2h^{\mathsf T}L\phi_*+h^{\mathsf T}Lh\\
&=\frac1R+\frac2R(h_s-h_t)+\sum_e c_e(h_u-h_v)^2\\
&=\frac1R+\sum_e c_e(h_u-h_v)^2\geq\frac1R.
\end{aligned}
$$

等号なら連結性により $h$ は定数、しかも $h_s=0$ なので $h=0$。よって最小化は一意です。最後に $L\phi_*=(e_s-e_t)/R$ の内部座標は零で、内部頂点では流入と流出が釣り合っています。
<!-- proof-end -->

### 例：三角形の中央頂点が選ぶ電位

頂点1と3を辺重み1で直接結び、別に $1-2-3$ の二辺を重み2とします。境界 $\phi_1=1,\phi_3=0$ とし、未知の中間電位を $x=\phi_2$ とすると

$$
\mathcal D(\phi)
=1(1-0)^2+2(1-x)^2+2x^2
=2+4(x-1/2)^2.
$$

よって $x=1/2$ で最小値2。有効抵抗は $R_{\mathrm{eff}}(1,3)=1/2$ です。直通の抵抗1と、道を通る抵抗 $1/2+1/2=1$ が並列になっていることとも一致します。

## 5. 解の自由度を取り除く擬似逆

$L$ は定数ベクトルを零へ送るので通常の逆行列がありません。だからといって、任意の一頂点を固定する計算しかできないわけではありません。零固有値の方向だけを無視した演算子を作れば、どの二頂点に対しても同じ式で抵抗を表せます。

[実対称行列のスペクトル定理](../../../基礎科目/F0/F0-00F1/index.md#thm-real-symmetric-spectral)と[SGT1の核の定理](../SGT1/index.md#thm-sgt1-kernel-components)により、連結グラフの $L$ には正規直交固有ベクトル $u_1,\ldots,u_n$ があり、$u_1=\boldsymbol1/\sqrt n$、$0=\lambda_1<\lambda_2\leq\cdots\leq\lambda_n$ と取れます。

<a id="def-sgt7-pseudoinverse"></a>

<!-- formal-statement-start -->
> **定義（Laplacianの擬似逆）**  
> 連結な有限無向正重み付きグラフの組合せLaplacian $L=\sum_{k=2}^n\lambda_ku_ku_k^{\mathsf T}$ に対して

$$
L^+=\sum_{k=2}^n\frac1{\lambda_k}u_ku_k^{\mathsf T}
$$

> と定める。ここで固有値0の方向の係数は0とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt7-pseudoinverse -->
### 例：二頂点一本の辺

**定義の確認**：辺重み $c>0$ に対して

$$
L=c\begin{pmatrix}1&-1\\-1&1\end{pmatrix},
\quad
u_2=\frac1{\sqrt2}\begin{pmatrix}1\\-1\end{pmatrix},
\quad\lambda_2=2c.
$$

従って

$$
L^+=\frac1{4c}\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

$LL^+=\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$ は定数方向を除いた直交射影です。これは通常の逆行列 $L^{-1}$ ではありません。
<!-- definition-example-end -->

<a id="thm-sgt7-pseudoinverse"></a>

<!-- formal-statement-start -->
> **定理（擬似逆による有効抵抗公式）**  
> 有限連結無向グラフの各辺で $c_e>0$ とし、$s\ne t$、$b=e_s-e_t$ とする。このとき

$$
R_{\mathrm{eff}}(s,t)
=b^{\mathsf T}L^+b
=\sum_{k=2}^n\frac{(u_k(s)-u_k(t))^2}{\lambda_k}.
$$

> 電位の一つは $v=L^+b$ であり、任意の電位解はこれに定数ベクトルを加えたものである。
<!-- formal-statement-end -->

### 証明の見取り図

$b$ の座標和が零であるため、固有値0の成分は存在しません。非零固有値の成分を割れば $Lv=b$ の解になります。その電位差が有効抵抗でした。

<!-- proof-start -->
### 証明

$\boldsymbol1^{\mathsf T}b=0$ より $u_1^{\mathsf T}b=0$。正規直交基底で

$$
b=\sum_{k=2}^n(u_k^{\mathsf T}b)u_k.
$$

[擬似逆の定義](#def-sgt7-pseudoinverse)から

$$
LL^+b
=\sum_{k=2}^n \lambda_ku_ku_k^{\mathsf T}
\sum_{j=2}^n\frac{u_ju_j^{\mathsf T}b}{\lambda_j}
=\sum_{k=2}^n u_ku_k^{\mathsf T}b=b,
$$

ここで $u_k^{\mathsf T}u_j$ が $k=j$ の場合だけ1となることを使いました。従って $v=L^+b$ は電位方程式を解きます。[電位の一意性](#prop-sgt7-potential)から他の解は $v+a\boldsymbol1$。最後に

$$
\begin{aligned}
R_{\mathrm{eff}}(s,t)
&=b^{\mathsf T}v=b^{\mathsf T}L^+b\\
&=\sum_{k=2}^n\frac{(u_k^{\mathsf T}b)^2}{\lambda_k}
=\sum_{k=2}^n\frac{(u_k(s)-u_k(t))^2}{\lambda_k}.
\end{aligned}
$$
<!-- proof-end -->

これはグラフのスペクトルと電気抵抗の橋です。ただし分母の $\lambda_k$ は**非正規化**Laplacianの固有値です。[SGT2の正規化Laplacian](../SGT2/index.md#def-sgt2-normalized)の固有値をそのまま代入してはいけません。

## 6. 辺を増やすと抵抗は下がる

回路に導線を追加したのに二点間の有効抵抗が上がることはありません。この直感を、行列の固有値を一つずつ比較せずに証明できます。電流の保存則を満たす候補に対する散逸を比較すればよいからです。

<a id="prop-sgt7-monotonicity"></a>

<!-- formal-statement-start -->
> **命題（Rayleighの単調性）**  
> 同じ有限頂点集合の連結な無向ネットワーク $G,G'$ を考え、両者の辺集合を合わせて重み0の欠辺も許す形で、各辺のコンダクタンスが $c'_e\geq c_e\geq0$ とする。正重みの辺だけを使った電流の保存則を課すと、任意の $s\ne t$ に対して

$$
R_{\mathrm{eff}}^{G'}(s,t)\leq R_{\mathrm{eff}}^G(s,t)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

古い回路で最適だった電流を、新しい回路でも同じ値で流します。新しく増えた辺の電流を零にすれば保存則は変わりません。コンダクタンスを大きくした辺は $f_e^2/c_e$ が小さくなります。

<!-- proof-start -->
### 証明

[Thomson原理](#thm-sgt7-thomson)の旧回路で最適な電流を $f_*$ とし、新たな辺では電流を0とします。旧回路で $Bf_*=e_s-e_t$ を満たすので、新回路でも同じ保存則を満たします。旧回路の正重み辺では $c'_e\geq c_e>0$ なので

$$
\sum_{e:c_e>0}\frac{f_{*,e}^2}{c'_e}
\leq\sum_{e:c_e>0}\frac{f_{*,e}^2}{c_e}
=R_{\mathrm{eff}}^G(s,t).
$$

新設辺の電流は0です。一方、$G'$ の最適エネルギーはこの候補のエネルギー以下なので

$$
R_{\mathrm{eff}}^{G'}(s,t)
=\min_{B'f=e_s-e_t}\sum_{e:c'_e>0}\frac{f_e^2}{c'_e}
\leq\sum_{e:c_e>0}\frac{f_{*,e}^2}{c'_e}
\leq R_{\mathrm{eff}}^G(s,t).
$$
<!-- proof-end -->

増やした辺が実際に電位差のない二点を結ぶだけなら等号の可能性があります。単調性は一般に**厳密な減少**を主張しません。

## 7. 全域木で一本の辺の重要さを読む

すべての頂点をつなぎ、閉路を含まない辺集合を**全域木**といいます。有限連結グラフには全域木が存在します。各全域木の重みを使えば、どの辺が木に採用されやすいかを確率として測れます。驚くことに、その採用確率にも有効抵抗が現れます。

<a id="def-sgt7-spanning-tree"></a>

<!-- formal-statement-start -->
> **定義（重み付き全域木分布）**  
> 有限連結無向グラフの辺のコンダクタンスを $c_e>0$ とする。すべての頂点を結ぶ閉路のない辺集合 $T$ を全域木とし、$\omega(T)=\prod_{e\in T}c_e$、$\tau(G)=\sum_{T\text{ 全域木}}\omega(T)$ と定める。全域木 $T$ を確率 $\mathbb P(T)=\omega(T)/\tau(G)$ で選ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sgt7-spanning-tree -->
### 例：三角形にある三つの全域木

**定義の確認**：三角形の三辺を $a=c_{12}$、$b=c_{23}$、$c=c_{13}$ とします。全域木はどれか一本を除いた二辺なので、その重みは順に $ab,ac,bc$。すべて正で

$$
\tau(G)=ab+ac+bc,\qquad
\mathbb P(\{12,23\})=\frac{ab}{ab+ac+bc}.
$$

三つの確率を足せば1になります。
<!-- definition-example-end -->

<a id="thm-sgt7-spanning-tree"></a>

<!-- formal-statement-start -->
> **定理（重み付き全域木と有効抵抗）**  
> 有限連結無向グラフの全辺で $c_e>0$ とする。一頂点 $r$ の行と列を除いた $(n-1)\times(n-1)$ のLaplacian主小行列を $L_{[r]}$ とすると

$$
\det L_{[r]}=\tau(G).
$$

> さらに任意の辺 $e=\{u,v\}$ が重み付き全域木分布で採用される確率は

$$
\mathbb P(e\in T)=c_e R_{\mathrm{eff}}(u,v)
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

まず接続行列を使って主小行列の行列式を展開します。閉路を持つ辺集合の行列式は零、全域木の行列式だけが1になります。次に一本の辺の重みを変化させ、行列式の変化率を二点間の電位差へ結びます。

<!-- proof-start -->
### 証明

頂点 $r$ の行を削った接続行列を $B_{[r]}$ とします。$L_{[r]}=B_{[r]}CB_{[r]}^{\mathsf T}$ です。[LA3Bの行列式の多重線形性](../../../基礎科目/LA/LA3B/index.md#thm-la3b-det-alternating-multilinear)を列ごとに適用して導きます。一般に $(n-1)\times m$ 行列 $U$ と $m\times(n-1)$ 行列 $V$ について、$UV$ の第 $j$ 列は $\sum_e U_{:,e}V_{e,j}$ です。これを各列へ代入して行列式を展開すると、同じ列番号を2回選ぶ項は交代性により零です。残った相異なる $n-1$ 個の列番号を一組 $S$ にまとめると、選択順序の符号付き和が $\det(V_{S,:})$ となり、

$
\det(UV)=\sum_{|S|=n-1}\det(U_{:,S})\det(V_{S,:}).
$

ここで $U=B_{[r]}C^{1/2}$、$V=C^{1/2}B_{[r]}^{\mathsf T}$ と代入し、$(n-1)$ 本の辺集合 $S$ を走らせると

$$
\det L_{[r]}
=\sum_{|S|=n-1}\det(B_{[r],S})^2\prod_{e\in S}c_e.
$$

この式は、$B_{[r]}C^{1/2}$ と $C^{1/2}B_{[r]}^{\mathsf T}$ の積の行列式を列番号の組ごとに展開したものです。$S$ が閉路を含めば、閉路を一周した接続列の符号付き和が零となるため行列式は零です。$S$ が閉路を含まず $n-1$ 辺あれば、有限グラフの各成分が木であることから成分数は $n-(n-1)=1$、すなわち全域木です。全域木なら根 $r$ 以外の葉が少なくとも一つあり、その葉の行には残った辺の非零成分が一つだけあります。その行で行列式を展開して葉と辺を取り去る操作を繰り返すと、最後は $1\times1$ の $\pm1$ に至るので $\det(B_{[r],S})^2=1$。従って $\det L_{[r]}=\sum_T\prod_{e\in T}c_e=\tau(G)$。

次に固定した辺 $e=\{u,v\}$ の重み $c_e$ だけを変数とします。$L_{[r]}$ を $A(c_e)$ と書き、接続列 $b_e=e_u-e_v$ から行 $r$ を削った列を $\beta$ と書くと、$A(c_e)=A(0)+c_e\beta\beta^{\mathsf T}$ です。$A(c_e)$ は連結性により正定値で逆行列を持ちます。行列式の各列に関する多重線形性（一本の $\beta\beta^{\mathsf T}$ から二列以上を選ぶと列が比例して行列式が零になる）を使えば、十分小さい $h$ について

$$
\det(A(c_e)+h\beta\beta^{\mathsf T})
=\det A(c_e)\left(1+h\,\beta^{\mathsf T}A(c_e)^{-1}\beta\right).
$$

したがって

$$
\frac{\partial \log\tau}{\partial c_e}
=\beta^{\mathsf T}L_{[r]}^{-1}\beta.
$$

右辺が $R_{\mathrm{eff}}(u,v)$ であることを確認します。$\widehat v=L_{[r]}^{-1}\beta$ とし、削った頂点で $v_r=0$ として元の空間へ戻すと、$Lv$ は $r$ 以外の頂点で $b_e$ に一致します。両ベクトルの成分和は零なので、残りの $r$ 成分も一致します。従って $Lv=b_e$ であり、[有効抵抗の定義](#def-sgt7-resistance)から

$$
R_{\mathrm{eff}}(u,v)
=b_e^{\mathsf T}v
=\beta^{\mathsf T}L_{[r]}^{-1}\beta.
$$

一方、$\tau(G)$ は $c_e$ に関して一次式であり、$e$ を含む全域木だけを微分すると

$$
c_e\frac{\partial \tau}{\partial c_e}
=\sum_{T:e\in T}\prod_{a\in T}c_a.
$$

両辺を $\tau(G)>0$ で割れば $\mathbb P(e\in T)=c_e\partial\log\tau/\partial c_e=c_eR_{\mathrm{eff}}(u,v)$ を得ます。
<!-- proof-end -->

この結果は、直接のコンダクタンスが同じでも、辺の両端を別経路で結びやすいなら、その辺が全域木へ採用される確率が小さくなることを示します。橋である辺なら、両端の唯一の接続路に必ず含まれるため確率は1で、$c_eR_{\mathrm{eff}}(u,v)=1$ です。

## 8. 演習：電位・電流・行列・木を結ぶ

### Level A：定義を実際の回路へ代入する

#### A1. 一本の辺

頂点1と2をコンダクタンス3の一本の辺で結ぶ。1から2へ一単位の電流を送るとき、$v_2=0$ として電位、電流、散逸エネルギー、有効抵抗を求めよ。

- Level: A
- ID: SGT7-A1

<!-- solution-start -->
**詳細解答**　向きを $1\to2$ とすると $B=(1,-1)^{\mathsf T}$、$C=(3)$。保存則は電流 $f=1$ を要求します。Ohmの法則から $1=3(v_1-v_2)$、$v_2=0$ なので $v_1=1/3$。エネルギーは $\mathcal E(f)=f^2/c=1/3$、電位差も $v_1-v_2=1/3$。よって $R_{\mathrm{eff}}(1,2)=1/3$ です。
<!-- solution-end -->

#### A2. 重み付き三頂点道

$1-2$ のコンダクタンスを2、$2-3$ を1とする。辺を $1\to2\to3$ と向け、1から3への一単位電流について、$B,C,f,v$ を $v_3=0$ のもとで求めよ。

- Level: A
- ID: SGT7-A2

<!-- solution-start -->
**詳細解答**　接続行列と重みは

$$
B=\begin{pmatrix}1&0\\-1&1\\0&-1\end{pmatrix},
\qquad C=\begin{pmatrix}2&0\\0&1\end{pmatrix}.
$$

$Bf=(1,0,-1)^{\mathsf T}$ の第1行から $f_1=1$、第3行から $f_2=1$。$f=CB^{\mathsf T}v$ より $v_1-v_2=f_1/2=1/2$、$v_2-v_3=f_2/1=1$。$v_3=0$ として $v=(3/2,1,0)^{\mathsf T}$。有効抵抗とエネルギーはいずれも $1/2+1=3/2$ です。
<!-- solution-end -->

#### A3. 基準電位を変える

連結グラフで $Lv=e_s-e_t$ とする。任意の実数 $a$ について $v+a\boldsymbol1$ も解であることを示し、電流と有効抵抗が変わらないことを式で説明せよ。

- Level: A
- ID: SGT7-A3

<!-- solution-start -->
**詳細解答**　各辺の接続列の成分和は零なので $B^{\mathsf T}\boldsymbol1=0$。従って $L\boldsymbol1=BCB^{\mathsf T}\boldsymbol1=0$ で、$L(v+a\boldsymbol1)=Lv=e_s-e_t$。電流は $CB^{\mathsf T}(v+a\boldsymbol1)=CB^{\mathsf T}v$ と不変です。有効抵抗も $(v_s+a)-(v_t+a)=v_s-v_t$ なので不変です。
<!-- solution-end -->

#### A4. 連結性を外すと何が壊れるか

辺のない二頂点グラフで、$Lv=e_1-e_2$ の可解性を判定せよ。形式的に $L^+$ を零行列とした値 $(e_1-e_2)^{\mathsf T}L^+(e_1-e_2)$ を有効抵抗と呼べない理由も説明せよ。

- Level: A
- ID: SGT7-A4

<!-- solution-start -->
**詳細解答**　辺がないので $L=0$。任意の $v$ に対して $Lv=0$ であり、$e_1-e_2\ne0$ だから方程式は解を持ちません。零行列の擬似逆を零行列にしても形式的な二次形式は0ですが、頂点間に電流を送る経路がないため、これは電圧差として定義された抵抗ではありません。[擬似逆公式](#thm-sgt7-pseudoinverse)には連結性が仮定され、今回その仮定を失っています。壊れる箇所は $e_1-e_2\in\operatorname{im}L$ とする解の存在の部分です。
<!-- solution-end -->

### Level B：二つの原理を別の方法で再現する

#### B1. 境界電位を最小化する

三角形の辺 $1-3$ のコンダクタンスは1、辺 $1-2$ と $2-3$ は2である。$\phi_1=1$、$\phi_3=0$ のとき $\phi_2=x$ としてエネルギーを計算し、最小値から $R_{\mathrm{eff}}(1,3)$ を求めよ。

- Level: B
- ID: SGT7-B1

<!-- solution-start -->
**詳細解答**　[SGT1の辺エネルギー表示](../SGT1/index.md#thm-sgt1-dirichlet)から

$$
\phi^{\mathsf T}L\phi
=(1-0)^2+2(1-x)^2+2(x-0)^2
=2+4(x-1/2)^2.
$$

二乗項は $x=1/2$ でだけ零なので、最小値は2です。[Dirichlet原理](#thm-sgt7-dirichlet)の仮定である連結性と全辺正重みが成り立つため $1/R_{\mathrm{eff}}(1,3)=2$、従って $R_{\mathrm{eff}}(1,3)=1/2$ です。内部の保存則も $2(x-1)+2(x-0)=0$ として $x=1/2$ を与えます。
<!-- solution-end -->

#### B2. 四頂点サイクルの分流

単位コンダクタンスのサイクル $1-2-3-4-1$ で、1から3へ一単位の電流を送る。二つの長さ2の道に流す電流を $x$ と $1-x$ として散逸を最小化し、有効抵抗を求めよ。

- Level: B
- ID: SGT7-B2

<!-- solution-start -->
**詳細解答**　道 $1\to2\to3$ に流れる電流を $x$、道 $1\to4\to3$ に $1-x$ とします。頂点1では合計1が出て、頂点3では1が入り、内部頂点2と4では流入と流出が一致するため保存則を満たします。散逸は四辺それぞれの電流の二乗なので

$$
\mathcal E(x)=x^2+x^2+(1-x)^2+(1-x)^2
=4(x-1/2)^2+1.
$$

$x=1/2$ で最小値1。[Thomson原理](#thm-sgt7-thomson)より $R_{\mathrm{eff}}(1,3)=1$ です。それぞれ抵抗2の二つの道を並列にした計算とも一致します。
<!-- solution-end -->

#### B3. スペクトルから三頂点道の抵抗

単位コンダクタンスの三頂点道 $1-2-3$ に対し、非正規化Laplacianの固有値と固有ベクトルを使って $R_{\mathrm{eff}}(1,3)$ を求めよ。

- Level: B
- ID: SGT7-B3

<!-- solution-start -->
**詳細解答**　Laplacianは

$$
L=\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}.
$$

正規直交固有ベクトルとして $u_1=(1,1,1)^{\mathsf T}/\sqrt3$、$u_2=(1,0,-1)^{\mathsf T}/\sqrt2$、$u_3=(1,-2,1)^{\mathsf T}/\sqrt6$ を取ると、行列を掛けて $Lu_1=0$、$Lu_2=u_2$、$Lu_3=3u_3$ と確かめられます。$b=e_1-e_3=\sqrt2u_2$ で、$u_3^{\mathsf T}b=(1-1)/\sqrt6=0$。よって[擬似逆公式](#thm-sgt7-pseudoinverse)で

$$
R_{\mathrm{eff}}(1,3)=\frac{(\sqrt2)^2}{1}+\frac{0^2}{3}=2.
$$

直列の二辺の抵抗 $1+1$ とも一致します。
<!-- solution-end -->

#### B4. 新しい辺を追加した前後を比較する

単位コンダクタンスの道 $1-2-3$ に辺 $1-3$（コンダクタンス1）を追加する。追加前後の1と3の有効抵抗を計算し、[Rayleighの単調性](#prop-sgt7-monotonicity)と比較せよ。

- Level: B
- ID: SGT7-B4

<!-- solution-start -->
**詳細解答**　追加前には一単位電流が二辺をともに1ずつ通るため、散逸は $1^2+1^2=2$。従って抵抗2です。追加後、直通辺に $x$、道 $1-2-3$ に $1-x$ を流すと保存則を満たし、散逸は

$$
\mathcal E(x)=x^2+2(1-x)^2
=3(x-2/3)^2+\frac23.
$$

最小は $x=2/3$ で、追加後の抵抗は $2/3$。[Thomson原理](#thm-sgt7-thomson)よりこの最小値が抵抗です。$2/3<2$ なので単調性と整合します。新設辺に零でない電流が流れるため、この例では厳密に減少します。
<!-- solution-end -->

### Level C：全域木、電流、抵抗を一つの計算で検算する

#### C1. 三角形の重み付き全域木

三角形の辺コンダクタンスを $a=c_{12}>0$、$b=c_{23}>0$、$c=c_{13}>0$ とする。(i) 全域木の重みの総和を計算せよ。(ii) $1\to3$ の一単位電流について中間電位と各経路の電流を求め、$R_{\mathrm{eff}}(1,3)$ を導け。(iii) 辺13が全域木へ採用される確率を直接求め、$cR_{\mathrm{eff}}(1,3)$ と一致することを示せ。(iv) $c\downarrow0$ のときの意味を説明せよ。

- Level: C
- ID: SGT7-C1

<!-- solution-start -->
**詳細解答**　(i) 全域木は二辺の選択三通りで、その重みは $ab,ac,bc$。従って $\tau=ab+ac+bc$ です。

(ii) $v_3=0$、一単位注入で $v_1=R$、$v_2=x$ と置きます。内部頂点2の保存則は $a(x-R)+bx=0$ なので

$$
x=\frac{a}{a+b}R.
$$

頂点1から出る電流は直通辺と辺12の合計で

$$
1=cR+a(R-x)
=cR+a\left(R-\frac{a}{a+b}R\right)
=\left(c+\frac{ab}{a+b}\right)R.
$$

従って

$$
R=\frac{a+b}{ab+c(a+b)}=\frac{a+b}{\tau}.
$$

直通の電流は $I_{13}=cR=c(a+b)/\tau$、道を通る電流は $I_{12}=a(R-x)=abR/(a+b)=ab/\tau$ で、$I_{23}=bx=ab/\tau$。よって $I_{13}+I_{12}=[c(a+b)+ab]/\tau=1$ と検算できます。

(iii) 辺13を含む全域木は $\{12,13\}$ と $\{23,13\}$ だけです。その重みは $ac$ と $bc$ なので

$$
\mathbb P(13\in T)=\frac{ac+bc}{\tau}
=\frac{c(a+b)}{\tau}=cR_{\mathrm{eff}}(1,3).
$$

これは[全域木と有効抵抗の定理](#thm-sgt7-spanning-tree)の具体例です。

(iv) $c\downarrow0$ では直通の辺13がなくなる極限となり、$R\to(a+b)/(ab)=1/a+1/b$、$I_{13}\to0$、$\mathbb P(13\in T)\to0$。道 $1-2-3$ だけが残り、その二辺が唯一の全域木となることと一致します。
<!-- solution-end -->

## 9. 得られた道具と次の境界

有効抵抗は単なる辺抵抗の足し算ではありません。一単位電流の最小散逸であり、境界電圧1に対する最小エネルギーの逆数であり、さらにLaplacian擬似逆の二次形式です。重み付き全域木に特定の辺が登場する確率まで、同じ量で読めます。

SGT8ではこれら有限グラフのエネルギーやスペクトルを、点群から作るグラフへ適用します。ただし点群のグラフLaplacianが連続空間のLaplace–Beltrami作用素へどの正規化・極限操作で近づくかは、別の定理と仮定を必要とします。有限グラフでの等式をそのまま連続極限の証明と取り違えないことが次の焦点です。
