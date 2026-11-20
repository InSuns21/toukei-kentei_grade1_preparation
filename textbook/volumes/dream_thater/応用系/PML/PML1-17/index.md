# PML1-17 Noetherの保存則は学習器に自動で移るか

## 1. 対称な予測と保存する運動は別の主張

前講の[有限群平均の不変性と射影性](../PML1-16/index.md#thm-pml1-16-reynolds)は、関数の入力を変換しても値が変わらないことを保証した。しかし、ある関数が対称でも、その関数から作った時間発展が何を保存するかはまだ分からない。さらに前講の群平均は有限群での構成であり、任意の小さい角度の回転まで扱ったわけではない。

今回の問いは、学習器が予測する **Lagrangian**（運動の位置と速度から決まる関数）を使ったとき、連続回転対称性が角運動量型の一定量を与える条件は何か、である。[AMECH4 の Noether の定理](../../../物理系/AMECH/AMECH4/index.md#thm-amech4-noether)はその一般的な関係を既に証明している。ここでは学習器の出力へ実際に代入し、次の三つを分けて検証する。

1. **モデルの対称性**：学習した Lagrangian が、すべての角度の回転で変わらないか。
2. **運動方程式の確認**：その Lagrangian の Euler--Lagrange 方程式に、時間発展が実際に従うか。
3. **離散実装**：連続軌道の保存量が、数値的な一歩ごとにも一定になるか。

以下では座標と速度を列ベクトル $q=(x,y)^{\mathsf T}$、$v=(v_x,v_y)^{\mathsf T}$ とし、点は時間による常微分、$\nabla_q$ と $\nabla_v$ はそれぞれ位置と速度の二成分に関する勾配を表す。ベクトルは標準直交基底で表す。

## 2. 学習した Lagrangian に回転をどう作用させるか

力学的な [Lagrangian と Euler--Lagrange 方程式](../../../物理系/AMECH/AMECH2/index.md#thm-amech2-lagrange-equations)は既習である。パラメータ $\theta$ を訓練で選んだ後に固定し、関数 $L_\theta(q,v)$ を一つの Lagrangian として扱う。「学習済み」という語は関数をどのように選んだかを表し、それだけで力学方程式や保存量を保証するものではない。

角度 $s\in\mathbb R$ の回転と、その $s=0$ での変化率を

$$
R_s=\begin{pmatrix}\cos s&-\sin s\\ \sin s&\cos s\end{pmatrix},
\qquad
A=\left.\frac{dR_s}{ds}\right|_{s=0}
=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$

と書く。$R_0=I_2$、$R_{s+t}=R_sR_t$ であり、[前々講の剛体変換作用](../PML1-15/index.md#def-pml1-15-rigid-action)の回転部分に当たる。位置だけでなく速度も $v\mapsto R_sv$ と回すのは、時刻に依らない回転後の軌道 $R_sq(t)$ を微分すると $\frac{d}{dt}(R_sq(t))=R_s\dot q(t)$ となるからである。

微小回転での位置の変化率は

$$
\xi(q)=Aq=(-y,x)^{\mathsf T},
\qquad
\frac{d}{dt}\xi(q(t))=A\dot q(t)=Av(t).
$$

これは [無限小対称性の定義](../../../物理系/AMECH/AMECH4/index.md#def-amech4-infinitesimal-symmetry)で、時間シフトを $\tau=0$、生成方向を $\xi=Aq$ とした場合に対応する。

**回転対称な学習済み Lagrangian** とは、全ての配置・速度と回転角で同じ値を返すものをいう。訓練で対称化した *損失* ではなく、得られた関数 $L_\theta$ に課す条件である。

<a id="def-pml1-17-rotational-lagrangian"></a>

<!-- formal-statement-start -->
> **定義（学習済み Lagrangian の連続回転対称性）**  
> 固定したパラメータ $\theta$ に対し $L_\theta:\mathbb R^2\times\mathbb R^2\to\mathbb R$ を $C^2$ 級とする。任意の $q,v\in\mathbb R^2$ と任意の実数 $s$ について

$$
L_\theta(R_sq,R_sv)=L_\theta(q,v)
$$

> が成立するとき、$L_\theta$ は連続回転対称であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-17-rotational-lagrangian -->
### 例：等方的な二次モデル

**定義の確認**

$m>0$、$k>0$ を固定し、

$$
L_\theta(q,v)=\frac m2(v_x^2+v_y^2)-\frac k2(x^2+y^2),
\qquad \theta=(m,k)
$$

とする。まず多項式なので $\mathbb R^4$ 全域で $C^2$ 級である。任意の $s$ に対し

$$
R_s^{\mathsf T}R_s
=\begin{pmatrix}\cos^2s+\sin^2s&0\\0&\cos^2s+\sin^2s\end{pmatrix}
=I_2.
$$

従って $\|R_sq\|^2=q^{\mathsf T}R_s^{\mathsf T}R_sq=\|q\|^2$ であり、速度についても $\|R_sv\|^2=\|v\|^2$。両項を実際に代入すると

$$
L_\theta(R_sq,R_sv)
=\frac m2\|R_sv\|^2-\frac k2\|R_sq\|^2
=L_\theta(q,v).
$$

滑らかさ・全ての入力・全ての角度という定義の条件をそれぞれ確認できた。ここでは $\theta$ がどのデータから得られたかに依存しない。
<!-- definition-example-end -->

次に、連続回転に対する条件を一度の微分で判定できる量を作る。定義の等式の左辺を $s=0$ で微分する。連鎖律の適用対象は一変数関数 $g(s)=L_\theta(R_sq,R_sv)$ であり、

$$
\begin{aligned}
g'(0)
&=\nabla_qL_\theta(q,v)\cdot\left.\frac{dR_sq}{ds}\right|_0
+\nabla_vL_\theta(q,v)\cdot\left.\frac{dR_sv}{ds}\right|_0\\
&=\nabla_qL_\theta(q,v)\cdot Aq
+\nabla_vL_\theta(q,v)\cdot Av.
\end{aligned}
$$

この値を **対称性欠損** と呼んで測る。

<a id="def-pml1-17-symmetry-defect"></a>

<!-- formal-statement-start -->
> **定義（回転対称性欠損）**  
> $L_\theta\in C^2(\mathbb R^4)$ に対し、回転の生成行列 $A$ を上記のものとする。配置 $q$ と速度 $v$ での対称性欠損を

$$
D_\theta(q,v)
:=\nabla_qL_\theta(q,v)\cdot Aq
+\nabla_vL_\theta(q,v)\cdot Av
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-17-symmetry-defect -->
### 例：等方性と異方性

**定義の確認**

前の $L_\theta$ では $\nabla_qL_\theta=-kq$、$\nabla_vL_\theta=mv$。$A^{\mathsf T}=-A$ だから、任意の $u=(u_1,u_2)^{\mathsf T}$ に対し

$$
u\cdot Au=-u_1u_2+u_2u_1=0.
$$

よって $D_\theta=-kq\cdot Aq+mv\cdot Av=0$。一方で $a,b>0$ とした

$$
L_{a,b}(q,v)=\frac12\|v\|^2-\frac12(ax^2+by^2)
$$

は同じく $C^2$ 級だが、

$$
\begin{aligned}
D_{a,b}(q,v)
&=(-ax,-by)\cdot(-y,x)+v\cdot Av\\
&=axy-bxy=(a-b)xy.
\end{aligned}
$$

$a\ne b$ なら、例えば $q=(1,1)^{\mathsf T}$ で欠損が非零なので全回転対称ではない。$a=b$ なら最初の直接確認と同じ理由で全回転対称である。**一点で欠損が0**という検査と、**全入力で0**という条件は区別する。
<!-- definition-example-end -->

さらに $D_\theta$ が全ての $q,v$ で0なら、任意の $s$ において上の連鎖律を $(R_sq,R_sv)$ に適用することで

$$
\frac{d}{ds}L_\theta(R_sq,R_sv)
=D_\theta(R_sq,R_sv)=0
$$

となる。従って $s$ の連続関数は一定で、$L_\theta(R_sq,R_sv)=L_\theta(q,v)$。この平面の全回転・全域での設定では、定義の不変性と $D_\theta\equiv0$ が同値である。回転以外の変換や領域の欠損があるときに、この同値性をそのまま流用しない。

## 3. 連続系ではどんな量が保存するか

[一般化運動量](../../../物理系/AMECH/AMECH4/index.md#def-amech4-generalized-momentum)は位置の関数を微分した力ではなく、**速度を微分した量**である。

$$
p_\theta(q,v)=\nabla_vL_\theta(q,v)
=\begin{pmatrix}p_x\\p_y\end{pmatrix}.
$$

回転の生成方向 $Aq=(-y,x)^{\mathsf T}$ と内積を取ると、

$$
p_\theta\cdot Aq=-yp_x+xp_y.
$$

この値を運動中に追跡する。特に $p_\theta=mv$ の場合には通常の平面角運動量 $m(x\dot y-y\dot x)$ に一致するが、一般の学習済み Lagrangian で常に $p_\theta=mv$ とは限らない。

<a id="thm-pml1-17-learned-noether"></a>

<!-- formal-statement-start -->
> **定理（学習済み Lagrangian への Noether 保存則の適用）**  
> $L_\theta\in C^2(\mathbb R^4)$ が連続回転対称とする。区間 $I$ 上の $C^2$ 級軌道 $q:I\to\mathbb R^2$ が、速度 $v=\dot q$ について

$$
\frac{d}{dt}\nabla_vL_\theta(q,\dot q)
=\nabla_qL_\theta(q,\dot q)
$$

> を満たすなら、

$$
J_\theta(t)
=q_1(t)p_2(t)-q_2(t)p_1(t),
\qquad
p(t)=\nabla_vL_\theta(q(t),\dot q(t))
$$

> は区間 $I$ 上で一定である。
<!-- formal-statement-end -->

**証明の見取り図。** [有限自由度の Noether の定理](../../../物理系/AMECH/AMECH4/index.md#thm-amech4-noether)へ、対象 $L=L_\theta$、生成方向 $\xi=Aq$、時間シフト $\tau=0$ を代入する。今回は学習器のパラメータ $\theta$ を固定することが重要である。

<!-- proof-start -->
### 証明

$L_\theta$ は $C^2$ 級で、軌道は Euler--Lagrange 方程式を満たしている。回転対称性を $s=0$ で微分した式から

$$
\nabla_qL_\theta\cdot Aq+
\nabla_vL_\theta\cdot A\dot q=0
$$

である。$\xi(q)=Aq$ は $C^1$ 級で、軌道に沿った時間微分は $\dot\xi=A\dot q$、時間シフトは $\tau=0$。従って [Noether の定理の無限小対称性条件](../../../物理系/AMECH/AMECH4/index.md#def-amech4-infinitesimal-symmetry)と必要な正則性を満たす。

その定理での保存量 $p\cdot\xi-\tau E_L$ に上記を代入すると

$$
\begin{aligned}
p\cdot\xi-\tau E_L
&=p\cdot Aq\\
&=p_x(-q_2)+p_yq_1
=q_1p_y-q_2p_x=J_\theta.
\end{aligned}
$$

よって $dJ_\theta/dt=0$。これは連続時間の、学習した $L_\theta$ 自身が定める運動方程式についての結論である。
<!-- proof-end -->

**等方的な二次モデルへの適用。** 前節の $m,k>0$ のモデルでは $p=mv$、$\nabla_qL=-kq$ なので方程式は $m\ddot q=-kq$。軌道で

$$
\begin{aligned}
\frac{dJ_\theta}{dt}
&=m(\dot x\dot y+x\ddot y-\dot y\dot x-y\ddot x)\\
&=m(x\ddot y-y\ddot x)
=x(-ky)-y(-kx)=0.
\end{aligned}
$$

定理を使わずに直接検算しても一致する。力と運動量の対応を具体的に確認できた。

## 4. 対称性も方程式も近似的なら、どこで保存が崩れるか

実際の学習では $L_\theta$ の対称性が近似的であることがある。また実測軌道や別の数値解法で得た軌道が、$L_\theta$ の Euler--Lagrange 方程式に一致するとは限らない。両方のずれを分けよう。

$C^2$ 級軌道 $q(t)$ に対し、速度は $v(t)=\dot q(t)$ とし、$p(t)=\nabla_vL_\theta(q(t),v(t))$ を微分した量から位置勾配を引いたベクトルを **運動方程式残差** とする。

$$
\mathcal R_\theta(t)
:=\frac{dp(t)}{dt}-\nabla_qL_\theta(q(t),v(t)).
$$

$\mathcal R_\theta=0$ は **学習したモデルの** Euler--Lagrange 方程式を満たすことを意味する。真の物理系と一致するかどうかとは別の判定である。

<a id="prop-pml1-17-defect-balance"></a>

<!-- formal-statement-start -->
> **命題（対称性欠損と運動方程式残差による保存量収支）**  
> $L_\theta\in C^2(\mathbb R^4)$、$q\in C^2([t_0,t_1];\mathbb R^2)$ とする。$v=\dot q$、$p=\nabla_vL_\theta(q,v)$、$J_\theta=p\cdot Aq$、$D_\theta$ と $\mathcal R_\theta$ は前述の定義とする。このとき

$$
\frac{dJ_\theta}{dt}
=D_\theta(q,v)+\mathcal R_\theta\cdot Aq
$$

> が各時刻で成り立つ。特に

$$
|J_\theta(t_1)-J_\theta(t_0)|
\le\int_{t_0}^{t_1}
\left(|D_\theta(q,v)|+\|\mathcal R_\theta\|\,\|q\|\right)dt.
$$

<!-- formal-statement-end -->

**証明の見取り図。** $J_\theta=p\cdot Aq$ を時間微分し、$\dot p$ を「モデルからの位置勾配」と「残差」に分割する。すると対称性欠損がちょうど現れる。

<!-- proof-start -->
### 証明

$A$ は定数行列なので積の微分法則で

$$
\frac{dJ_\theta}{dt}
=\dot p\cdot Aq+p\cdot A\dot q.
$$

残差の定義を変形すると $\dot p=\nabla_qL_\theta+\mathcal R_\theta$ である。これを代入して

$$
\begin{aligned}
\frac{dJ_\theta}{dt}
&=(\nabla_qL_\theta+\mathcal R_\theta)\cdot Aq
+\nabla_vL_\theta\cdot Av\\
&=\underbrace{\nabla_qL_\theta\cdot Aq
+\nabla_vL_\theta\cdot Av}_{D_\theta(q,v)}
+\mathcal R_\theta\cdot Aq.
\end{aligned}
$$

ここで $A^{\mathsf T}A=I_2$ より $\|Aq\|=\|q\|$。[Cauchy--Schwarz の不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)から

$$
|\mathcal R_\theta\cdot Aq|
\le\|\mathcal R_\theta\|\,\|q\|.
$$

両辺を $[t_0,t_1]$ で積分し、三角不等式を使う。仮定より各被積分関数は連続であり、積分できるので上界が得られる。
<!-- proof-end -->

この命題はモデルの学習精度や時間離散化に無関係な**恒等式**である。小さい欠損がある点で見つかっただけでは、長時間の保存を保証しない。軌道全体で欠損と残差を積分して初めて保存量の変化へ上界がつく。

**異方的な二次モデル。** 前節の $L_{a,b}$ では $\mathcal R=0$ の連続軌道に沿って

$$
\dot J=(a-b)xy.
$$

実際、$\ddot x=-ax$、$\ddot y=-by$ であり、$J=x\dot y-y\dot x$ を微分すると

$$
\dot J=x(-by)-y(-ax)=(a-b)xy.
$$

$a\ne b$ かつ $x(0)=y(0)=1$ なら $\dot J(0)=a-b\ne0$。**時間に依存しない Lagrangian はエネルギーを保存しても、回転対称性を失えば角運動量型の量は保存しない。** これは [時間並進とエネルギーの命題](../../../物理系/AMECH/AMECH4/index.md#prop-amech4-time-translation-energy)とも矛盾しない。

## 5. 学習損失が対称でも、物理量が保存するとは限らない

何に対する不変性なのかを区別する必要がある。パラメータの交換で不変な損失 $\ell(a,b)=a^2+b^2$ は

$$
\ell(a,b)=\ell(b,a)
$$

を満たす。しかしこの交換は、状態 $q$ の**任意角度の回転**とは異なる。例えば選ばれた重みが $(a,b)=(2,1)$ のとき、前節の $L_{a,b}$ は回転対称でなく、$D_{a,b}(1,1)=1$ である。損失が対称であるという条件を、Lagrangian の連続回転不変性に置き換えることはできない。

また有限データを完全に再現しても、全状態での対称性は証明されない。例えば

$$
\widetilde L_\varepsilon(q,v)
=\frac12\|v\|^2-\frac12\|q\|^2-\varepsilon xy
$$

は、$x=0$ または $y=0$ に位置する全ての標本では $\varepsilon xy=0$ のため等方モデルと関数値が一致する。一方、

$$
D_\varepsilon(q,v)
=\varepsilon(y^2-x^2)
$$

なので $q=(1,0)$ では $D_\varepsilon=-\varepsilon$。値だけを標本上で合わせても、微分に基づく Noether 条件は確定しない。前講の[有限群等変平均](../PML1-16/index.md#thm-pml1-16-equivariant)も、指定した有限群の保証をそのまま全回転へ広げられない。

対称性をモデル構造で厳密に課す方法と、損失に対称性違反の罰則を足す方法には違いがある。後者では、学習終了時に全領域で $D_\theta\equiv0$ を別途証明できなければ、厳密な保存の仮定を得たことにはならない。

## 6. 対称な連続系でも通常の Euler 法では保存しない

ここまでは連続軌道の議論である。モデルが完全な等方的 Lagrangian であっても、数値計算の更新式は別の写像である。実例として $m=k=1$ の連続系

$$
\dot q=v,\qquad \dot v=-q,
\qquad J=q_1v_2-q_2v_1
$$

を刻み幅 $h>0$ の**[陽的 Euler 法](../../../計算系/NA/NA6/index.md#def-na6-euler-method)**で更新する。

$$
q_{n+1}=q_n+hv_n,\qquad
v_{n+1}=v_n-hq_n.
$$

回転行列 $R_s$ を両辺へ掛けると、同じ式が $(R_sq_n,R_sv_n)$ に対して成立する。よって更新写像自体は回転と可換である。それでも保存量は変わる。

<a id="prop-pml1-17-euler-drift"></a>

<!-- formal-statement-start -->
> **命題（回転等変な Euler 更新の保存量ドリフト）**  
> $h>0$ とし、二次元調和振動子の陽的 Euler 更新を上式とする。任意の初期値 $(q_0,v_0)\in\mathbb R^2\times\mathbb R^2$ に対して更新写像は全ての $R_s$ と可換だが、各 $n\ge0$ で

$$
J_{n+1}=(1+h^2)J_n,
\qquad J_n=q_{n,1}v_{n,2}-q_{n,2}v_{n,1}.
$$

> 従って $J_0\ne0$ なら $J_n=(1+h^2)^nJ_0$ となり、離散時刻では保存しない。
<!-- formal-statement-end -->

**証明の見取り図。** 二次元の向き付き面積を $[u,w]=u_1w_2-u_2w_1$ と書けば、$J_n=[q_n,v_n]$ となる。更新式を双線形性で展開する。

<!-- proof-start -->
### 証明

$R_s$ は線形であり

$$
R_s(q+hv)=R_sq+hR_sv,\qquad
R_s(v-hq)=R_sv-hR_sq
$$

だから、回転後の入力で更新しても、更新後に回転しても同じになる。

次に、$[u,u]=0$、$[v,q]=-[q,v]$ を用いると

$$
\begin{aligned}
J_{n+1}
&=[q_n+hv_n,v_n-hq_n]\\
&=[q_n,v_n]-h[q_n,q_n]+h[v_n,v_n]-h^2[v_n,q_n]\\
&=[q_n,v_n]+h^2[q_n,v_n]\\
&=(1+h^2)J_n.
\end{aligned}
$$

各段階で使ったのは双線形性と交代性である。帰納法で $J_n=(1+h^2)^nJ_0$ を得る。
<!-- proof-end -->

例えば $q_0=(1,0)^{\mathsf T}$、$v_0=(0,1)^{\mathsf T}$ なら $J_0=1$ で、初回の更新では $q_1=(1,h)^{\mathsf T}$、$v_1=(-h,1)^{\mathsf T}$、$J_1=1+h^2$。モデルの連続回転対称性も更新の回転等変性も成り立つが、**離散保存性は成り立たない**。

同様に $E_n=(\|q_n\|^2+\|v_n\|^2)/2$ について

$$
\begin{aligned}
2E_{n+1}
&=\|q_n+hv_n\|^2+\|v_n-hq_n\|^2\\
&=(1+h^2)(\|q_n\|^2+\|v_n\|^2)
\end{aligned}
$$

なのでエネルギーも増大する。保存性を数値積分でどう改善するかは後の PML1-20 で扱う。

## 7. 物理構造を学習する際の検証手順

この講義の結果をモデル評価に使うなら、以下を独立に検査する。

1. 変換の対象と範囲を決める。パラメータ交換・有限回転・全連続回転を区別し、$L_\theta(q,v)$ が作用を受ける二つの入力を明示する。
2. 学習後の $\theta$ を固定して、$L_\theta$ の微分可能性と $D_\theta$ を検査する。全入力の恒等式か有限点での数値的観測かを分ける。
3. 生成する軌道について $\mathcal R_\theta$ を検査する。実測軌道・真の系の軌道と、学習モデル自身の運動方程式の軌道を区別する。
4. 同一初期条件で時刻刻みを変え、$J_\theta(t_n)$ の変化と予測誤差を別々に記録する。連続系の恒等式を離散的な保存の証明として使わない。

## 8. 演習 Level A

<a id="ex-pml1-17-a01"></a>
### PML1-17-A01 回転の生成方向と保存量候補

- Level: A

$A=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ とする。$q=(1,2)^{\mathsf T}$、$p=(3,4)^{\mathsf T}$ で $\xi=Aq$ と $J=p\cdot\xi$ を求め、$J=xp_y-yp_x$ と照合せよ。

<!-- solution-start -->
#### 詳細解答

行列と列ベクトルを掛けて $\xi=(-2,1)^{\mathsf T}$ である。従って

$$
J=(3,4)\cdot(-2,1)=-6+4=-2.
$$

一方、$xp_y-yp_x=1\cdot4-2\cdot3=-2$ なので同じ値となる。これは候補量の**値**であり、軌道の保存を示したことにはならない。
<!-- solution-end -->

<a id="ex-pml1-17-a02"></a>
### PML1-17-A02 等方モデルの対称性欠損

- Level: A

$L(q,v)=2\|v\|^2-\frac32\|q\|^2$ について $\nabla_qL$、$\nabla_vL$ と $D(q,v)$ を全入力で求めよ。

<!-- solution-start -->
#### 詳細解答

$q=(x,y)$、$v=(v_x,v_y)$ で成分ごとに微分すると

$$
\nabla_qL=(-3x,-3y)^{\mathsf T}=-3q,\qquad
\nabla_vL=(4v_x,4v_y)^{\mathsf T}=4v.
$$

生成行列 $A$ は反対称なので $u\cdot Au=0$。従って

$$
D=(-3q)\cdot Aq+(4v)\cdot Av=0.
$$

どの $(q,v)$ でも0であり、連続回転対称性を判定できる。
<!-- solution-end -->

<a id="ex-pml1-17-a03"></a>
### PML1-17-A03 異方性の符号を確かめる

- Level: A

$L_{a,b}(q,v)=\frac12\|v\|^2-\frac12(ax^2+by^2)$ で $a=2,b=5$ とする。$q=(1,1)^{\mathsf T}$、$v=(0,0)^{\mathsf T}$ における $D_{a,b}$ を直接計算せよ。

<!-- solution-start -->
#### 詳細解答

$\nabla_qL=(-2,-5)^{\mathsf T}$、$\nabla_vL=0$ である。$Aq=(-1,1)^{\mathsf T}$ だから

$$
D=(-2,-5)\cdot(-1,1)+0=2-5=-3.
$$

$(a-b)xy=(2-5)\cdot1\cdot1=-3$ とも一致する。負号が付くのは生成方向の第1成分が $-y$ だからである。
<!-- solution-end -->

<a id="ex-pml1-17-a04"></a>
### PML1-17-A04 方程式を満たさない軌道の残差

- Level: A

$L(q,v)=(\|v\|^2-\|q\|^2)/2$、$q(t)=(t,t^2)^{\mathsf T}$ とする。$\mathcal R$、$J$、$D$ を求め、収支式 $\dot J=D+\mathcal R\cdot Aq$ を任意の $t$ で検算せよ。

<!-- solution-start -->
#### 詳細解答

$v=(1,2t)^{\mathsf T}$、$\dot v=(0,2)^{\mathsf T}$、$p=v$、$\nabla_qL=-q$ なので

$$
\mathcal R=\dot p-\nabla_qL=(0,2)+(t,t^2)=(t,2+t^2).
$$

$D=0$ は等方性から従う。$J=xv_y-yv_x=t(2t)-t^2=t^2$ なので $\dot J=2t$。一方、

$$
Aq=(-t^2,t)^{\mathsf T},\quad
\mathcal R\cdot Aq=-t^3+(2+t^2)t=2t.
$$

ゆえに $\dot J=0+2t$。対称性があっても、軌道が運動方程式を満たさなければ保存の結論は出ない。
<!-- solution-end -->

<a id="ex-pml1-17-a05"></a>
### PML1-17-A05 Euler 法の一歩

- Level: A

$h=1/2$、$q_0=(1,0)^{\mathsf T}$、$v_0=(0,1)^{\mathsf T}$ で陽的 Euler 更新を一歩計算し、$J_0$、$J_1$ を比較せよ。

<!-- solution-start -->
#### 詳細解答

定義から

$$
q_1=q_0+\tfrac12v_0=(1,\tfrac12)^{\mathsf T},\qquad
v_1=v_0-\tfrac12q_0=(-\tfrac12,1)^{\mathsf T}.
$$

したがって $J_0=1\cdot1-0=1$、一方

$$
J_1=1\cdot1-\tfrac12(-\tfrac12)=\tfrac54.
$$

$1+h^2=1+1/4=5/4$ と一致する。連続モデルでは一定のはずの量でも離散更新では増える。
<!-- solution-end -->

## 9. 演習 Level B

<a id="ex-pml1-17-b01"></a>
### PML1-17-B01 速度依存の係数を持つモデル

- Level: B

$r^2=x^2+y^2$ として

$$
L(q,v)=\frac12(1+r^2)\|v\|^2-\frac k2r^2,\qquad k>0
$$

を考える。全回転対称性を確認し、対応する保存量 $J$ を求めよ。一般化運動量を単に $v$ と置かないこと。

<!-- solution-start -->
#### 詳細解答

係数 $1+r^2$ とポテンシャル $kr^2/2$ は $\|q\|^2$ の関数なので、任意の $s$ で

$$
L(R_sq,R_sv)=\tfrac12(1+\|R_sq\|^2)\|R_sv\|^2-\tfrac k2\|R_sq\|^2=L(q,v).
$$

$L$ は多項式で全域 $C^2$ 級である。一般化運動量は速度で偏微分するため

$$
p=\nabla_vL=(1+r^2)v.
$$

従って [学習済み Lagrangian への Noether 保存則](#thm-pml1-17-learned-noether)を、その Euler--Lagrange 方程式を満たす軌道に適用すると

$$
J=p\cdot Aq=(1+r^2)(xv_y-yv_x)
$$

が一定となる。$1+r^2$ は位置に依存するので、$xv_y-yv_x$ だけを一定とは結論できない。
<!-- solution-end -->

<a id="ex-pml1-17-b02"></a>
### PML1-17-B02 近似対称性と有限時間上界

- Level: B

$a,b>0$ の $L_{a,b}$ が定める厳密な連続軌道を区間 $[0,T]$ で考える。全時刻で $|x(t)|\le M$、$|y(t)|\le M$ と分かっている場合、$|J(T)-J(0)|$ の上界を導け。どこに軌道の方程式を使ったかも述べよ。

<!-- solution-start -->
#### 詳細解答

モデルの Euler--Lagrange 方程式を満たすため残差 $\mathcal R=0$ である。さらに本文で計算した $D=(a-b)xy$ を[収支命題](#prop-pml1-17-defect-balance)へ代入すると

$$
\dot J(t)=(a-b)x(t)y(t).
$$

上式を $0$ から $T$ まで積分し、積分の絶対値は被積分関数の絶対値の積分以下であることを使うと

$$
\begin{aligned}
|J(T)-J(0)|
&=\left|\int_0^T(a-b)x(t)y(t)\,dt\right|\\
&\le |a-b|\int_0^T|x(t)|\,|y(t)|\,dt\\
&\le |a-b|M^2T.
\end{aligned}
$$

$\mathcal R=0$ と置けた箇所だけで運動方程式を用いた。有限時間の上界は $T$ とともに大きくなり得るため、$a-b$ が小さいことだけで任意の長時間の保存は示せない。
<!-- solution-end -->

<a id="ex-pml1-17-b03"></a>
### PML1-17-B03 パラメータ対称性は保存則を保証するか

- Level: B

$\ell(a,b)=a^2+b^2$ を学習損失とし、物理モデルを $L_{a,b}$ とする。損失が $(a,b)$ の交換で不変なことを示した上で、$(a,b)=(2,1)$ なら角運動量型の量が必ず保存するか判定せよ。

<!-- solution-start -->
#### 詳細解答

損失は $\ell(b,a)=b^2+a^2=\ell(a,b)$ で、二つの**パラメータの交換**では不変である。他方、学習モデルの状態は $q=(x,y)$ で、必要なのは全角度について $L(R_sq,R_sv)=L(q,v)$ という別の作用の条件である。

実際 $(a,b)=(2,1)$ では

$$
D_{2,1}(q,v)=(2-1)xy=xy.
$$

例えば $q(0)=(1,1)^{\mathsf T}$ を通るこのモデルの厳密な軌道なら $\dot J(0)=1$ なので、$J$ は一定でない。損失の対称性と Lagrangian の対称性を入れ替えた点が誤りである。
<!-- solution-end -->

<a id="ex-pml1-17-b04"></a>
### PML1-17-B04 標本上で一致する Lagrangian

- Level: B

$\widetilde L_\varepsilon(q,v)=\frac12\|v\|^2-\frac12\|q\|^2-\varepsilon xy$、$\varepsilon\ne0$ とする。$xy=0$ の標本で等方的モデルと値が一致することを示し、一方で連続回転対称性が壊れることを対称性欠損で示せ。どの計測が不足しているか説明せよ。

<!-- solution-start -->
#### 詳細解答

$xy=0$ のとき、最後の項が $-\varepsilon xy=0$ なので、どの $v$ についても値は等方的モデルと一致する。しかし位置微分は

$$
\nabla_q\widetilde L_\varepsilon=(-x-\varepsilon y,-y-\varepsilon x)^{\mathsf T}.
$$

速度微分は $v$ であり $v\cdot Av=0$ だから

$$
\begin{aligned}
D_\varepsilon
&=(-x-\varepsilon y,-y-\varepsilon x)\cdot(-y,x)\\
&=xy+\varepsilon y^2-xy-\varepsilon x^2\\
&=\varepsilon(y^2-x^2).
\end{aligned}
$$

$(x,y)=(1,0)$ では $D_\varepsilon=-\varepsilon\ne0$。従ってモデルは全回転対称ではない。標本上の**関数値だけ**では、その付近での位置微分・微小回転方向の変化を判定できなかった。
<!-- solution-end -->

## 10. 演習 Level C

<a id="ex-pml1-17-c01"></a>
### PML1-17-C01 連続欠損と離散ドリフトを切り分ける

- Level: C

$a,b>0$ に対する

$$
L_{a,b}(q,v)=\frac12\|v\|^2-\frac12(ax^2+by^2)
$$

を用いる。初期値を $q_0=(1,1)^{\mathsf T}$、$v_0=(0,1)^{\mathsf T}$ とする。

1. 学習モデルが定める連続軌道の $J(0)$ と $\dot J(0)$ を求め、$a=b$ と $a\ne b$ の違いを説明せよ。
2. この運動方程式を陽的 Euler 法 $q_1=q_0+hv_0$、$v_1=v_0-h(aq_{0,1},bq_{0,2})^{\mathsf T}$ で一歩進め、$J_1-J_0$ を求めよ。
3. $a=b=1$ としたとき連続運動は保存的であるのに離散更新では保存しないことを明示し、どの条件を変えれば何が改善するか説明せよ。

<!-- solution-start -->
#### 詳細解答

**1.** 速度微分から $p=v$ である。初期値で

$$
J(0)=x_0v_{0,y}-y_0v_{0,x}=1\cdot1-1\cdot0=1.
$$

運動方程式は $\ddot x=-ax$、$\ddot y=-by$。[対称性欠損と残差による収支](#prop-pml1-17-defect-balance)で $\mathcal R=0$、$D=(a-b)xy$ なので

$$
\dot J(0)=(a-b)x_0y_0=a-b.
$$

$a=b$ なら $D$ は全入力で0で、[Noether 保存則](#thm-pml1-17-learned-noether)により全時刻で $J$ は一定。$a\ne b$ なら少なくともこの初期値では $\dot J(0)\ne0$ である。

**2.** $h>0$ として二つの更新を成分で計算すると

$$
q_1=(1,1+h)^{\mathsf T},\qquad
v_1=(-ha,1-hb)^{\mathsf T}.
$$

従って

$$
\begin{aligned}
J_1
&=q_{1,1}v_{1,2}-q_{1,2}v_{1,1}\\
&=1(1-hb)-(1+h)(-ha)\\
&=1+h(a-b)+h^2a.
\end{aligned}
$$

$J_0=1$ を引くと

$$
J_1-J_0=h(a-b)+h^2a.
$$

一次項は連続モデルの初期保存量の変化率 $h\dot J(0)$ に対応し、二次項はこの Euler 更新の計算で現れる。一般に有限時間の真の解との誤差評価には別の解析が必要であり、この一歩の恒等式だけから長時間精度は結論できない。

**3.** $a=b=1$ のとき $D=0$、モデルの連続軌道では $\mathcal R=0$ なので $\dot J=0$。しかし前項の更新差は

$$
J_1-J_0=h^2>0.
$$

従って「連続モデルの厳密な対称性」と「この陽的 Euler 法の厳密な保存」は別である。$h$ を小さくすればこの一歩の差 $h^2$ は小さくなるが、$h>0$ で厳密に0にはならない。長時間の保存性を求めるなら、刻み幅を指定して誤差を測るだけでなく、積分法自体の保存構造を調べる必要がある。
<!-- solution-end -->

## 11. 次の講義へ

学習済みの Lagrangian でも、**連続対称性とその Euler--Lagrange 方程式に従う連続軌道**が揃えば Noether の保存量が得られる。対称性欠損と運動方程式残差は保存量の変化を分解し、離散更新の保存性はさらに別の条件である。

次の **PML1-18** では、運動を Hamiltonian から構成するモデルで、どの構造を初めから固定するかを検討する。
