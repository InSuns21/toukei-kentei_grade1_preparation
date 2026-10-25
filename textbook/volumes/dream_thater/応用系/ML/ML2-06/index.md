# ML2-06 EM算法と尤度の単調改善

<!-- definition-example-audit: strict -->

[ML2-05の有限混合模型](../ML2-05/index.md#def-ml2-05-finite-mixture)では、観測値 $X_i$ の背後に潜在ラベル $Z_i$ があった。[責務のBayes公式](../ML2-05/index.md#thm-ml2-05-responsibility)によって、母数を固定すればラベルの条件付き確率は求められる。しかし、[観測尤度](../ML2-05/index.md#def-ml2-05-likelihoods)は成分の和を掛け合わせた形であり、対数を取っても成分別に分離しない。

この困難を、今の母数から求めた責務で完全データの対数尤度を平均することで解決する。代理関数を増やすと元の観測尤度も増えるというEM算法（expectation-maximization）の性質を、等号条件まで導出しよう。その保証は大域最適性や母数の収束まで及ぶのかも検査する。

## 1. 有限対数和を下から押さえる

$a_1,a_2>0$ のとき、$q_1+q_2=1$、$q_1,q_2>0$ を選べば

$$
\log(a_1+a_2)
=\log\left(q_1\frac{a_1}{q_1}+q_2\frac{a_2}{q_2}\right)
\ge q_1\log\frac{a_1}{q_1}+q_2\log\frac{a_2}{q_2}.
$$

これは対数の凹性によるJensen不等式の有限版である。重要なのは、どの重みで等号が成立するかである。

<a id="lem-ml2-06-log-jensen"></a>

<!-- formal-statement-start -->
> **補題（有限対数和のJensen不等式と等号）**
> $K\ge2$、すべての $a_k>0,q_k>0$、かつ $\sum_{k=1}^Kq_k=1$ のとき、

$$
\log\sum_{k=1}^Ka_k\ge\sum_{k=1}^Kq_k\log\frac{a_k}{q_k}.
$$

> 等号となる必要十分条件は、すべての $k$ に対して $q_k=a_k/\sum_ja_j$ である。
<!-- formal-statement-end -->

### 証明の見取り図

正の数 $t$ に対する $\log t\le t-1$ を、和を1に正規化した $a_k$ に適用する。等号はすべての比が1の場合に限る。

<!-- proof-start -->
### 証明

$h(t)=t-1-\log t$ は $h'(t)=1-1/t$ により $t=1$ で唯一の最小値0を取る。従って $\log t\le t-1$、等号は $t=1$ に限る。

$m=\sum_ka_k>0$ として $t_k=a_k/(mq_k)>0$ を代入し、正の $q_k$ で重み付けすると

$$
\begin{aligned}
\sum_kq_k\log\frac{a_k}{mq_k}
&\le\sum_kq_k\left(\frac{a_k}{mq_k}-1\right)\\
&=\frac1m\sum_ka_k-\sum_kq_k=0.
\end{aligned}
$$

左辺は $\sum_kq_k\log(a_k/q_k)-\log m$ なので移項すれば主張が出る。各 $q_k>0$ だから等号はすべての $t_k=1$ に限る。すなわち $q_k=a_k/m$ である。$\square$
<!-- proof-end -->

例として $(a_1,a_2)=(1/10,9/20)$ なら $m=11/20$。等号を実現する重みは $(q_1,q_2)=(2/11,9/11)$ である。各 $a_k/q_k=11/20$ が一致するので下界も $\log(11/20)$。これに対して $q=(1/2,1/2)$ では二つの比が $1/5,9/10$ と異なり、下界は厳密に小さくなる。

## 2. 責務で接触する補助関数

独立標本 $x_1,\ldots,x_n$ と有限ラベル $Z_i\in\{1,\ldots,K\}$ を考える。成分同時密度（離散なら確率質量）を $u_{ik}(\theta)=\pi_k f_k(x_i;\theta)$ と記す。以下では比較する母数のすべての $u_{ik}$ が**厳密に正**であると仮定する。正分散Gaussian混合では成立する。零成分を許す場合は支持集合と対数の拡張値を別に処理しなければならない。

旧母数 $\eta$ における責務を

$$
r_{ik}(\eta)=\frac{u_{ik}(\eta)}{\sum_ju_{ij}(\eta)},
\qquad \sum_kr_{ik}(\eta)=1
$$

とする。これを固定して補題に $a_k=u_{ik}(\theta)$、$q_k=r_{ik}(\eta)$ を入れれば、対数和の下界が旧母数 $\eta$ に接触する。

<a id="def-ml2-06-auxiliary"></a>

<!-- formal-statement-start -->
> **定義（EM補助関数とJensen下界）**
> 独立標本 $x_1,\ldots,x_n$ を持つ有限混合で、$u_{ik}(\theta),u_{ik}(\eta)>0$ とする。旧責務 $r_{ik}(\eta)$ を固定した補助関数 $Q$、エントロピー項 $H$、下界 $F$ を

$$
\begin{aligned}
Q(\theta\mid\eta)&=\sum_{i=1}^n\sum_{k=1}^Kr_{ik}(\eta)\log u_{ik}(\theta),\\
H(\eta)&=-\sum_{i,k}r_{ik}(\eta)\log r_{ik}(\eta),\\
F(\theta\mid\eta)&=Q(\theta\mid\eta)+H(\eta)
\end{aligned}
$$

> と定める。$Q$ は旧母数での完全データ対数尤度の条件付き期待値である。観測対数尤度 $\ell(\theta)=\sum_i\log\sum_ku_{ik}(\theta)$ について、$\ell(\theta)\ge F(\theta\mid\eta)$ かつ $\ell(\eta)=F(\eta\mid\eta)$ が成り立つ。
<!-- formal-statement-end -->

[前講の完全データ尤度](../ML2-05/index.md#def-ml2-05-likelihoods)では、潜在ラベルを観測できた場合の対数尤度を次のように書ける。ここで $\mathbf1_{\{z_i=k\}}$ は $z_i=k$ のとき1、それ以外で0を取る指示関数である。

$$
\log L_{\mathrm{comp}}(\theta;x,z)
=\sum_{i,k}\mathbf1_{\{z_i=k\}}\log u_{ik}(\theta)
$$

であった。旧母数 $\eta$ で観測値 $x$ を固定すると、[責務の公式](../ML2-05/index.md#thm-ml2-05-responsibility)から

$$
E_\eta[\mathbf1_{\{Z_i=k\}}\mid x]=r_{ik}(\eta)
$$

である。有限和の期待値を取れば、上式はちょうど $Q(\theta\mid\eta)$ になる。したがって「完全データの対数を責務で平均する」という操作と補助関数の定義が対応する。

<!-- definition-example-start: def-ml2-06-auxiliary -->
**定義の確認**。一観測点において $u=(1/10,9/20)$ とし、旧責務を先ほど計算した $(2/11,9/11)$ とする。正の責務は和1であり、$Q$ と $H$ の各項が有限に定まる。接触点で

$$
\begin{aligned}
F(\eta\mid\eta)
&=\frac2{11}\log\frac{1/10}{2/11}
 +\frac9{11}\log\frac{9/20}{9/11}\\
&=\frac2{11}\log\frac{11}{20}+\frac9{11}\log\frac{11}{20}
=\log\frac{11}{20}=\ell(\eta).
\end{aligned}
$$

重みを候補母数に合わせて更新してしまうと、同じ $Q(\cdot\mid\eta)$ を最大化する問題ではなくなる。そこで旧責務を固定する。
<!-- definition-example-end -->

**下界の証明**。[対数和の補題](#lem-ml2-06-log-jensen)を各 $i$ に適用すると

$$
\begin{aligned}
\ell(\theta)&=\sum_i\log\sum_ku_{ik}(\theta)\\
&\ge\sum_{i,k}r_{ik}(\eta)\log\frac{u_{ik}(\theta)}{r_{ik}(\eta)}\\
&=Q(\theta\mid\eta)+H(\eta).
\end{aligned}
$$

$\theta=\eta$ では $u_{ik}(\eta)/r_{ik}(\eta)=\sum_ju_{ij}(\eta)$ が $k$ に依存しないため、各観測点で補題の等号条件を満たす。ここが「下から押さえる」だけでなく「現在値に接触する」理由である。

## 3. EステップとMステップ

Eステップでは各観測値を成分へ硬く割り当てるのではなく、現在母数で条件付き確率を計算する。Mステップではその確率を**更新中は固定**し、補助関数を最大化する。

<a id="def-ml2-06-em-steps"></a>

<!-- formal-statement-start -->
> **定義（Eステップ・Mステップと一般化EM）**
> 各同時密度 $u_{ik}(\theta)>0$ の有限混合を考え、初期母数 $\theta^{(0)}$ を選ぶ。第 $t$ 反復の**Eステップ**で $r_{ik}^{(t)}=r_{ik}(\theta^{(t)})$ を求め、**Mステップ**で

$$
\theta^{(t+1)}
\in\operatorname*{arg\,max}_{\theta\in\Theta}
Q(\theta\mid\theta^{(t)})
$$

> を満たす母数を選ぶ反復をEM算法という。最大化解の存在は別に確認する。厳密な最大化に代えて

$$
Q(\theta^{(t+1)}\mid\theta^{(t)})
\ge Q(\theta^{(t)}\mid\theta^{(t)})
$$

> だけを保証する更新を**一般化EM**（GEM）という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-06-em-steps -->
**定義の確認**。一次元Gaussian二成分の旧重み $(1/2,1/2)$、旧平均 $(-1,1)$、既知分散 $(1,1)$、標本 $(-1,1)$ を使う。[Gaussian密度](../ML1-07/index.md#def-ml1-07-gaussian)の一次元形を $x=-1$ に代入すると、第2成分と第1成分の密度比は

$$
\frac{\exp(-(-1-1)^2/2)}{\exp(-(-1+1)^2/2)}=e^{-2}
$$

であり、$x=1$ では逆になる。[責務の公式](../ML2-05/index.md#thm-ml2-05-responsibility)に代入し $a=(1+e^{-2})^{-1}$ とおく。各点の密度は正であり、Eステップの責務は

$$
r_1=(a,1-a),\qquad r_2=(1-a,a).
$$

各行の和は1、有効標本数 $N_k=\sum_i r_{ik}$ は成分ごとに1となる。ここでは重みも各 $1/2$、分散も1に固定して平均だけを更新する。このとき $Q$ の平均に依存する部分は次の負の加重平方和であり、各平均について微分すると

$$
Q_{\mathrm{mean}}=-\frac12\sum_{i,k}r_{ik}(x_i-\mu_k)^2,
\qquad
\frac{\partial Q_{\mathrm{mean}}}{\partial\mu_k}
=\sum_ir_{ik}(x_i-\mu_k).
$$

各平均の二階微分は $-N_k=-1<0$ だから唯一の最大化解は加重平均となる。

$$
\mu_k^+=\frac{\sum_ir_{ik}x_i}{N_k},\qquad
(\mu_1^+,\mu_2^+)=(1-2a,2a-1).
$$

平方完成で旧平均と新平均の差の二乗を比較すると、$Q$ の増分は

$$
\Delta Q=\frac12\left\{(-2+2a)^2+(2-2a)^2\right\}
=4(1-a)^2>0.
$$

よってMステップ条件だけでなく一般化EMの不等式も満たす。どの成分へ割り振るかを0か1で決める更新とは異なる。分散まで動かす場合の追加の最大化条件は第5節で導く。
<!-- definition-example-end -->

## 4. 尤度の単調性と厳密改善

前講で学んだ責務は候補母数 $\theta$ にも存在する。その違いを[INFO2の相対エントロピー](../../INFO/INFO2/index.md#def-info2-relative-entropy)で測る。INFO2は底2を使うが、以下では自然対数の単位に合わせ、同定義の値を $\log2$ 倍した

$$
D_{\mathrm{KL}}(p\Vert q)=\sum_kp_k\log\frac{p_k}{q_k}
$$

を使う。正の確率ベクトルならKLは非負であり、等号は二つのベクトルが一致するときに限る。

<a id="thm-ml2-06-monotone"></a>

<!-- formal-statement-start -->
> **定理（EMの尤度差分恒等式と単調改善）**
> 独立標本 $x_1,\ldots,x_n$、有限ラベル数 $K\ge2$ の混合模型について、比較する $\theta,\eta$ のすべての $u_{ik}$ が正とする。旧責務ベクトルを $r_i(\eta)$、候補の責務を $r_i(\theta)$ と書けば

$$
\ell(\theta)-\ell(\eta)
=Q(\theta\mid\eta)-Q(\eta\mid\eta)
 +\sum_iD_{\mathrm{KL}}(r_i(\eta)\Vert r_i(\theta)).
$$

> 従って $Q$ の差が非負なら尤度差も非負である。その条件の下で厳密改善する必要十分条件は、$Q$ の差が正、または少なくとも一つの責務ベクトルが異なることである。等号は $Q$ の差が0で、すべての新旧責務が一致する場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

候補責務の定義を逆に解いて、観測密度の対数を完全データ項と責務の対数に分ける。旧責務で平均するとKLが正確に現れる。

<!-- proof-start -->
### 証明

$r_{ik}(\theta)=u_{ik}(\theta)/p_\theta(x_i)>0$ なので、各 $i,k$ で

$$
\log p_\theta(x_i)=\log u_{ik}(\theta)-\log r_{ik}(\theta).
$$

左辺は $k$ に依存せず、旧責務の和は1。従って旧責務で重み付けして $i,k$ で足すと

$$
\begin{aligned}
\ell(\theta)
&=\sum_{i,k}r_{ik}(\eta)\log u_{ik}(\theta)
-\sum_{i,k}r_{ik}(\eta)\log r_{ik}(\theta)\\
&=Q(\theta\mid\eta)+H(\eta)
+\sum_{i,k}r_{ik}(\eta)\log\frac{r_{ik}(\eta)}{r_{ik}(\theta)}\\
&=Q(\theta\mid\eta)+H(\eta)
+\sum_iD_{\mathrm{KL}}(r_i(\eta)\Vert r_i(\theta)).
\end{aligned}
$$

$\theta=\eta$ と代入するとKLはすべて0で $\ell(\eta)=Q(\eta\mid\eta)+H(\eta)$。二つの等式を引けば差分恒等式が出る。

KLの非負性も $\log t\le t-1$ から直接確かめられる。正で和1の $p,q$ に対して

$$
-D_{\mathrm{KL}}(p\Vert q)
=\sum_kp_k\log\frac{q_k}{p_k}
\le\sum_kp_k\left(\frac{q_k}{p_k}-1\right)=0.
$$

各 $p_k>0$ より等号は $q_k=p_k$ がすべての成分で成立するときに限る。従って非負の $Q$ 差とKLの和に対する等号・厳密不等号の条件も主張通り。$\square$
<!-- proof-end -->

Mステップで $Q$ を厳密に増やせば、尤度も厳密に増える。一方、$Q$ が同値でも責務が変われば尤度は厳密に増えうる。「母数ベクトルが変わった」だけで尤度の厳密増加を断定してはいけない。[ラベル交換の不識別](../ML2-05/index.md#thm-ml2-05-label-switch)がある。定理は**非減少**を保証するだけで、有限反復での大域最大の達成や母数列の収束を保証しない。

## 5. 一次元Gaussian混合の更新を計算する

ここでは[非退化Gaussian密度](../ML1-07/index.md#def-ml1-07-gaussian)を使い、平均・分散を推定する。既習の多変量密度で次元を1、共分散行列を $[v_k]$ とすれば、その行列式は $v_k$、逆行列は $[1/v_k]$ となり、成分密度は

$$
f_k(x;\mu_k,v_k)=\frac1{\sqrt{2\pi v_k}}
\exp\left(-\frac{(x-\mu_k)^2}{2v_k}\right),
\qquad v_k>0
$$

となる。$1\times1$ 行列 $[v_k]$ の正定値性は、任意の非零実数 $t$ について $t^2v_k>0$ となること、すなわち一変数の分散 $v_k>0$ と同値である。

旧責務を $r_{ik}>0$ と固定する。混合重みは正で総和1、各成分の有効標本数は

$$
N_k=\sum_{i=1}^nr_{ik},\qquad \sum_{k=1}^KN_k=n
$$

である。$N_k$ は重み付き標本の大きさに相当し、成分ごとに0より大きい。

<a id="prop-ml2-06-gaussian-mstep"></a>

<!-- formal-statement-start -->
> **命題（Gaussian混合のMステップ更新）**
> $n\ge2$ 個の実数標本 $x_1,\ldots,x_n$ がすべて同一ではなく、すべての固定責務 $r_{ik}>0$、各観測点で $\sum_kr_{ik}=1$ とする。正の混合重み、自由な実数平均、正の分散を持つ一次元Gaussian混合では、$Q$ の唯一の最大化解は

$$
\begin{aligned}
N_k&=\sum_{i=1}^nr_{ik},&
\pi_k^+&=\frac{N_k}{n},\\
\mu_k^+&=\frac1{N_k}\sum_{i=1}^nr_{ik}x_i,&
v_k^+&=\frac1{N_k}\sum_{i=1}^nr_{ik}(x_i-\mu_k^+)^2.
\end{aligned}
$$

> 更新分散は厳密に正で、Mステップは母数空間内で達成される。
<!-- formal-statement-end -->

### 証明の見取り図

正規密度の対数を展開し、混合重み、平均、分散の項を分離する。混合比には和1制約、平均には重み付き平方完成、分散には一変数微分を使う。

<!-- proof-start -->
### 証明

[Gaussian密度](../ML1-07/index.md#def-ml1-07-gaussian)の式を補助関数へ代入すると

$$
\begin{aligned}
Q(\theta\mid\eta)
&=\sum_{i,k}r_{ik}\left[\log\pi_k
-\frac12\log(2\pi v_k)-\frac{(x_i-\mu_k)^2}{2v_k}\right]\\
&=\sum_k\left[N_k\log\pi_k-\frac{N_k}{2}\log(2\pi v_k)
-\frac{\sum_ir_{ik}(x_i-\mu_k)^2}{2v_k}\right].
\end{aligned}
$$

まず $p_k=N_k/n>0$ とすると $\sum_kp_k=1$。$\log t\le t-1$ を $t=\pi_k/p_k$ に用いて

$$
\sum_kN_k\log\frac{\pi_k}{p_k}
=n\sum_kp_k\log\frac{\pi_k}{p_k}
\le n\sum_kp_k\left(\frac{\pi_k}{p_k}-1\right)=0.
$$

等号は $\pi_k=p_k$ が全成分で成立するときに限るから、混合比の唯一の解は $N_k/n$。

次に $m_k=\sum_ir_{ik}x_i/N_k$ とおけば $\sum_ir_{ik}(x_i-m_k)=0$。平方を展開すると

$$
\begin{aligned}
\sum_ir_{ik}(x_i-\mu_k)^2
&=\sum_ir_{ik}\{(x_i-m_k)+(m_k-\mu_k)\}^2\\
&=\sum_ir_{ik}(x_i-m_k)^2+N_k(\mu_k-m_k)^2.
\end{aligned}
$$

分散が正なので $Q$ ではこの二乗和に負の係数が付き、平均の唯一の最大化解は $m_k$ である。

$S_k=\sum_ir_{ik}(x_i-m_k)^2$ と置く。標本はすべて同じではなく責務も全点で正だから $S_k>0$。分散の項

$$
g_k(v)=-\frac{N_k}{2}\log(2\pi v)-\frac{S_k}{2v},
\qquad v>0
$$

の導関数は

$$
g_k'(v)=-\frac{N_k}{2v}+\frac{S_k}{2v^2}
=\frac{S_k-N_kv}{2v^2}.
$$

$v<S_k/N_k$ で増加、$v>S_k/N_k$ で減少するため、唯一の大域最大は $S_k/N_k>0$。独立に最大化した混合比と各平均・分散をまとめれば唯一の解を得る。$\square$
<!-- proof-end -->

**定義式を数値で確認する**。旧母数を重み $(1/2,1/2)$、平均 $(-1,1)$、分散 $(1,1)$、標本 $(-1,1)$ とする。前節の $a=(1+e^{-2})^{-1}$ を使うと

$$
\begin{aligned}
N_1=N_2&=1,\\
\mu_1^+&=-a+(1-a)=1-2a=-\tanh1,\\
\mu_2^+&=-(1-a)+a=2a-1=\tanh1,\\
v_1^+=v_2^+&=1-(2a-1)^2=1-\tanh^21.
\end{aligned}
$$

各 $N_k$ は正、更新分散は約 $0.419974>0$、新平均の絶対値は約 $0.761594$。ここで成分内の加重平均 $E_r$ を使って平方和を展開すると

$$
v_k^+=E_r[X^2]-2\mu_k^+E_r[X]+(\mu_k^+)^2
=1-(\mu_k^+)^2.
$$

この一歩の観測対数尤度は[単調改善定理](#thm-ml2-06-monotone)から非減少である。

**退化する場合**。全標本が同一、または標本が1点だけなら $S_k=0$ となる。形式的更新 $v_k^+=0$ は正分散の条件に反する。実際、分散の寄与は

$$
g_k(v)=-\frac{N_k}{2}\log(2\pi v)
\longrightarrow+\infty\qquad(v\downarrow0)
$$

となり、内部のMステップ最大化解は存在しない。[前講の非有界尤度](../ML2-05/index.md#prop-ml2-05-unbounded-likelihood)も同じ危険を示す。分散下限や固定分散を課す場合には、その制約下で最大化し直す。

## 6. 固定点と大域最適を区別する

混合比の制約 $\sum_k\pi_k=1$ は一成分を消去した内部座標で扱える。例えば $\pi_K=1-\sum_{k<K}\pi_k$ とすれば、正の重みを持つ点は開集合で表せる。そこで母数を内部座標 $\beta$ で表し、通常の偏微分を考える。

<a id="def-ml2-06-fixed-stationary"></a>

<!-- formal-statement-start -->
> **定義（EM固定点と尤度停留点）**
> 有限混合の母数空間内部で $\ell$ と $Q$ が微分可能とする。内部母数 $\theta^*$ が次の最大化問題の解なら、**EM固定点**という。

$$
\theta^*\in\operatorname*{arg\,max}_{\vartheta\in\Theta}Q(\vartheta\mid\theta^*).
$$

> 内部座標 $\beta$ における対数尤度の全勾配が次の等式を満たすとき、**尤度停留点**という。

$$
\nabla_\beta\ell(\theta^*)=0.
$$

> 最大化解が複数ある場合、「固定点」は同じ点を選べることを意味し、実装が必ず同じ解を選ぶことまでは意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml2-06-fixed-stationary -->
**定義の確認**。標本 $(-2,2)$、二成分の混合重みは各 $1/2$、分散は既知の1とし、平均のみを推定する。旧平均 $(0,0)$ では二成分密度が一致し、責務は各点で $(1/2,1/2)$。平均のMステップはどちらも

$$
\mu_k^+=\frac{(1/2)(-2)+(1/2)(2)}{1/2+1/2}=0.
$$

固定分散の $Q$ は平均の負の二次関数なのでこの更新は唯一の最大化解。よって $(0,0)$ は内部EM固定点である。停留条件も独立に確かめられる。観測密度を $p_\mu(x)=\sum_k\pi_k f_k(x;\mu_k,1)$ とおくと、密度の和と対数の微分により

$$
\frac{\partial\ell}{\partial\mu_k}
=\sum_i\frac{\pi_k f_k(x_i;\mu_k,1)}{p_\mu(x_i)}(x_i-\mu_k)
=\sum_i r_{ik}(\mu)(x_i-\mu_k).
$$

この点では $r_{1k}=r_{2k}=1/2$、$\mu_k=0$ だから両成分の導関数は $(-2+2)/2=0$。従って定義の停留条件も直接満たす。次の定理では、固定分散の例に限らず内部EM固定点から停留性が出る理由を証明する。
<!-- definition-example-end -->

<a id="thm-ml2-06-fixed-stationary"></a>

<!-- formal-statement-start -->
> **定理（内点EM固定点の停留性）**
> 有限潜在カテゴリの独立標本について、内部母数座標 $\beta$ は開集合を動き、各 $u_{ik}(\beta)$ は正かつ連続微分可能とする。内部点 $\beta^*$ が $Q(\cdot\mid\beta^*)$ の局所最大点ならば、$\beta^*$ は観測対数尤度 $\ell$ の停留点である。特に内部EM固定点は停留点である。
<!-- formal-statement-end -->

### 証明の見取り図

対数混合密度の勾配は、各成分対数密度の勾配を現在責務で平均したものになる。これは旧責務を固定した $Q$ を旧母数の点で微分した式と一致する。

<!-- proof-start -->
### 証明

有限和の微分と正値関数の対数の連鎖律が許されるので

$$
\begin{aligned}
\nabla_\beta\ell(\beta)
&=\sum_i\frac{\sum_k\nabla_\beta u_{ik}(\beta)}{\sum_ju_{ij}(\beta)}\\
&=\sum_{i,k}\frac{u_{ik}(\beta)}{\sum_ju_{ij}(\beta)}
\frac{\nabla_\beta u_{ik}(\beta)}{u_{ik}(\beta)}\\
&=\sum_{i,k}r_{ik}(\beta)\nabla_\beta\log u_{ik}(\beta).
\end{aligned}
$$

旧責務を $\beta^*$ に固定した $Q$ の第一引数 $\vartheta$ について微分し、$\vartheta=\beta^*$ と置くと

$$
\left.\nabla_\vartheta Q(\vartheta\mid\beta^*)\right|_{\vartheta=\beta^*}
=\sum_{i,k}r_{ik}(\beta^*)\nabla_\beta\log u_{ik}(\beta^*)
=\nabla_\beta\ell(\beta^*).
$$

開集合内の微分可能な関数の局所最大点では各座標方向の導関数が0である。仮定により左辺が0だから右辺も0。$\square$
<!-- proof-end -->

これは「内部固定点なら停留点」という一方向の主張である。境界点・非微分点・Mステップに最大化解が存在しない場合には適用できない。また尤度値が収束したとしても、母数列が収束することは証明されていない。

<a id="prop-ml2-06-nonglobal"></a>

<!-- formal-statement-start -->
> **命題（固定点が大域最適とは限らない）**
> 標本 $(-2,2)$、二成分Gaussian混合の重みと分散を次の通り固定し、二つの平均を自由に推定する。

$$
\pi_1=\pi_2=\frac12,\qquad v_1=v_2=1.
$$

> このとき平均 $(0,0)$ は内部EM固定点であるが、対数尤度の局所最大点ですらない。
<!-- formal-statement-end -->

### 証明の見取り図

平均を $(-\varepsilon,\varepsilon)$ に分離させたときの密度倍率を計算し、対数尤度差の二階微分を0で調べる。

<!-- proof-start -->
### 証明

固定点性は上の定義例で確認した。平均を $(-\varepsilon,\varepsilon)$ にしたときの任意の観測値 $x$ の密度は

$$
\begin{aligned}
p_\varepsilon(x)
&=\frac{e^{-(x+\varepsilon)^2/2}+e^{-(x-\varepsilon)^2/2}}{2\sqrt{2\pi}}\\
&=\phi_1(x;0,1)e^{-\varepsilon^2/2}
\frac{e^{-x\varepsilon}+e^{x\varepsilon}}2\\
&=\phi_1(x;0,1)e^{-\varepsilon^2/2}\cosh(x\varepsilon).
\end{aligned}
$$

標本は $x=\pm2$ であり $\cosh$ は偶関数だから、基準点に対する対数尤度差は

$$
\Delta\ell(\varepsilon)
=-\varepsilon^2+2\log\cosh(2\varepsilon).
$$

導関数は $\Delta\ell'(\varepsilon)=-2\varepsilon+4\tanh(2\varepsilon)$、二階導関数は $\Delta\ell''(\varepsilon)=-2+8/\cosh^2(2\varepsilon)$。$0$ では関数値と一階微分が0、二階微分が6で正。従って十分小さな非零の $\varepsilon$ で $\Delta\ell(\varepsilon)>0$。固定点のどの近傍にも高尤度の母数がある。$\square$
<!-- proof-end -->

EMを正確に実行していても対称な初期値から動けないことがある。[シード](../../../計算系/MC/MC2/index.md#def-mc2-seed)（疑似乱数生成器の初期状態）を変えた標本再生成や、初期中心を変えた実行は経路の違いを見るために使える。ただし別seedだから独立な試行だと数学的に保証されるわけではない。

## 7. 反復ラボで確かめる

[Gaussian混合EMの反復ラボ](../../../../../../simulation/ml2-06.html)では、同じseedから再現した合成標本を用い、成分数を2または3、初期平均の離れ具合を変更できる。毎回の責務合計 $N_k$、新しい重みと平均、対数尤度の推移を表示する。

分散はすべて既知の1に固定した模型とし、分散の退化による非有界尤度を切り分ける。$Q$ の増分と責務のKLを数値で照合できるが、有限精度の丸めでゼロ近くに誤差が出る。単調改善の数学的証明は[差分定理](#thm-ml2-06-monotone)であり、有限桁の実験はその代わりではない。

## 8. 演習

### ML2-06-A01 Jensen下界と等号の重み

- Level: A

正数 $a_1=1,a_2=3$ と $q=(1/2,1/2)$ に対する[対数和の下界](#lem-ml2-06-log-jensen)を計算し、真の $\log(a_1+a_2)$ と比較せよ。等号を実現する重みも求めよ。

<!-- solution-start -->
### 詳細解答

$$
\sum_kq_k\log\frac{a_k}{q_k}
=\frac12\log2+\frac12\log6=\log\sqrt{12}.
$$

真の値は $\log4$ であり、$\sqrt{12}<4$ なので下界は厳密に小さい。等号の重みは補題の条件から $(1/4,3/4)$ で、両比 $a_k/q_k$ は4。このとき加重和は $(1/4+3/4)\log4=\log4$ となる。
<!-- solution-end -->

### ML2-06-A02 二成分Bernoulli混合の責務

- Level: A

潜在ラベル $Z\in\{1,2\}$ の混合比は各 $1/2$。条件付きで $X\in\{0,1\}$ は第1成分で成功確率 $1/4$、第2成分で成功確率 $3/4$ のBernoulli分布とする。独立標本 $x_1=1,x_2=0$ について、全責務 $r_{ik}$ と有効標本数 $N_k$ を計算し、正値・和1を確認せよ。

<!-- solution-start -->
### 詳細解答

第1観測は成功なので同時確率とその和は $(u_{11},u_{12})=(1/8,3/8)$、$p(x_1)=1/2$ である。第2観測は失敗なので、各成分の成功確率の補数から同時確率は $(u_{21},u_{22})=(3/8,1/8)$、$p(x_2)=1/2$ となる。[責務のBayes公式](../ML2-05/index.md#thm-ml2-05-responsibility)で各成分をそれぞれの和で割れば

$$
(r_{11},r_{12})=(1/4,3/4),\qquad
(r_{21},r_{22})=(3/4,1/4).
$$

すべて正で各行和は1。従って

$$
N_1=\frac14+\frac34=1,\qquad
N_2=\frac34+\frac14=1,\qquad N_1+N_2=2=n.
$$
<!-- solution-end -->

### ML2-06-A03 責務のKLを直接計算する

- Level: A

一観測点の旧責務が $p=(3/4,1/4)$、候補責務が $q=(1/2,1/2)$ のとき、自然対数による $D_{\mathrm{KL}}(p\Vert q)$ を求め、厳密に正であることを示せ。

<!-- solution-start -->
### 詳細解答

双方のベクトルは正で和1なので[相対エントロピーの定義](../../INFO/INFO2/index.md#def-info2-relative-entropy)を自然対数に換算できる。

$$
D_{\mathrm{KL}}(p\Vert q)
=\frac34\log\frac{3/4}{1/2}
+\frac14\log\frac{1/4}{1/2}
=\frac34\log\frac32+\frac14\log\frac12.
$$

4倍して指数を取ると $(3/2)^3(1/2)=27/16>1$。従ってKLは正。両ベクトルが一致しないから[差分定理のKL等号条件](#thm-ml2-06-monotone)でも同じ結論になる。
<!-- solution-end -->

### ML2-06-A04 一成分の重み付き平均と分散

- Level: A

実数標本 $(-1,1)$ に対し、二成分Gaussian混合の第1成分の固定責務が $(3/4,1/4)$、第2成分の責務が各点でその補数のとき、第1成分のMステップでの有効標本数、平均、正分散を求めよ。

<!-- solution-start -->
### 詳細解答

正の責務で標本は相異なるから[Mステップ命題](#prop-ml2-06-gaussian-mstep)が使える。$N=3/4+1/4=1$。平均は

$$
\mu^+=\frac{(3/4)(-1)+(1/4)(1)}1=-\frac12.
$$

偏差はそれぞれ $-1/2,3/2$ だから、

$$
v^+=\frac34\left(-\frac12\right)^2+
\frac14\left(\frac32\right)^2
=\frac3{16}+\frac9{16}=\frac34>0.
$$

分散が正なので更新は母数空間内の最大化解である。
<!-- solution-end -->

### ML2-06-B01 固定分散GaussianでのEM一歩

- Level: B

標本 $(-1,1)$、重み各 $1/2$、既知分散各1、旧平均 $(-1,1)$ の二成分Gaussian混合について、責務・更新重み・更新平均を導出し、$Q$ の増分が正であることを示せ。

<!-- solution-start -->
### 詳細解答

$x=-1$ での第2成分対第1成分の密度比は

$$
\frac{\phi_1(-1;1,1)}{\phi_1(-1;-1,1)}
=\exp\left(-\frac{(-2)^2-0^2}{2}\right)=e^{-2}.
$$

$a=(1+e^{-2})^{-1}$ とすれば責務は $(-1)$ で $(a,1-a)$、$(1)$ で $(1-a,a)$。$N_1=N_2=1$、新重みは各 $1/2$。平均は[Mステップの加重平均](#prop-ml2-06-gaussian-mstep)により

$$
\mu_1^+=-a+(1-a)=1-2a,\qquad
\mu_2^+=-(1-a)+a=2a-1.
$$

分散が固定の $Q$ は平均に関して負の加重平方和である。同命題の平方完成によって、旧平均から新平均への増分は

$$
\begin{aligned}
\Delta Q&=\frac12\sum_kN_k(\mu_k-\mu_k^+)^2\\
&=\frac12\{(-1-1+2a)^2+(1-2a+1)^2\}\\
&=4(1-a)^2>0.
\end{aligned}
$$

従って[単調改善定理](#thm-ml2-06-monotone)から観測尤度も厳密に増える。
<!-- solution-end -->

### ML2-06-B02 Qが同値でも尤度は厳密に増える

- Level: B

観測 $x=1$ 一点の二成分Bernoulli混合を考える。旧母数は混合比 $(1/2,1/2)$、成分成功確率 $(1/5,1/5)$。候補母数では混合比を維持して成功確率を $(2/25,1/2)$ とする。旧・新責務、$Q$ 差、対数尤度差、KLを求めて[差分恒等式](#thm-ml2-06-monotone)を検算せよ。

<!-- solution-start -->
### 詳細解答

旧同時確率は $u=(1/10,1/10)$、混合確率は $1/5$、旧責務は $(1/2,1/2)$。候補の同時確率は $u'=(1/25,1/4)$、混合確率は $29/100$、新責務は $(4/29,25/29)$。いずれも正で確率として定義できる。

$$
\begin{aligned}
\Delta Q&=\frac12\log\frac{1/25}{1/10}
+\frac12\log\frac{1/4}{1/10}\\
&=\frac12\log\frac25+\frac12\log\frac52=0,\\
\Delta\ell&=\log\frac{29/100}{1/5}=\log\frac{29}{20}>0.
\end{aligned}
$$

KLも旧責務の下で

$$
\begin{aligned}
D_{\mathrm{KL}}(r^{\mathrm{old}}\Vert r^{\mathrm{new}})
&=\frac12\log\frac{1/2}{4/29}
+\frac12\log\frac{1/2}{25/29}\\
&=\frac12\log\frac{29}{8}+\frac12\log\frac{29}{50}
=\log\frac{29}{20}.
\end{aligned}
$$

従って $\Delta\ell=\Delta Q+D_{\mathrm{KL}}$。新旧責務が異なるため、$Q$ の同値にもかかわらず厳密改善した。
<!-- solution-end -->

### ML2-06-B03 分散下限で退化を防ぐ

- Level: B

一次元Gaussian成分の固定責務の和が $N>0$、加重残差平方和が $S\ge0$ のとき、正の定数 $\delta$ に対して分散に $v\ge\delta$ を課す。$Q$ の最大化解を導き、$S=0$ の場合も扱え。

<!-- solution-start -->
### 詳細解答

分散の寄与は $g(v)=-(N/2)\log(2\pi v)-S/(2v)$、導関数は

$$
g'(v)=-\frac{N}{2v}+\frac{S}{2v^2}
=\frac{S-Nv}{2v^2}.
$$

$S>0$ なら $S/N$ の左で増加、右で減少する。許容領域が $[\delta,\infty)$ なので、唯一の最大化解は

$$
v^+=\max\left(\delta,\frac SN\right).
$$

$S=0$ なら導関数はすべての正の $v$ で負であり、下端 $\delta$ が最大化解。同じ公式が成立する。下限がなければ $S=0$ で $v\downarrow0$ に沿って $g(v)\to+\infty$ となり、正分散の内部解は存在しない。
<!-- solution-end -->

### ML2-06-B04 固定点が局所最大でない条件

- Level: B

二成分Gaussian混合の重みを各 $1/2$、分散を各1に固定し、標本 $(-b,b)$（$b>0$）から平均を推定する。$(0,0)$ がEM固定点であることを確認し、平均を $(-\varepsilon,\varepsilon)$ に分離した方向の尤度差の二階微分を0で求めよ。$b>1$ なら何が言えるか。

<!-- solution-start -->
### 詳細解答

平均が同じ0なら各観測点で二成分の密度が一致し、責務は $(1/2,1/2)$。両成分の加重平均は $((-b)/2+b/2)/1=0$ であり、固定分散のMステップの唯一の解だから固定点である。

[対称Gaussianの密度展開](#prop-ml2-06-nonglobal)で $x=\pm b$ と置けば、対数尤度差は

$$
\Delta\ell(\varepsilon)=-\varepsilon^2+2\log\cosh(b\varepsilon).
$$

$$
\begin{aligned}
\Delta\ell'(\varepsilon)&=-2\varepsilon+2b\tanh(b\varepsilon),\\
\Delta\ell''(\varepsilon)&=-2+\frac{2b^2}{\cosh^2(b\varepsilon)},\\
\Delta\ell''(0)&=2(b^2-1).
\end{aligned}
$$

$b>1$ なら二階微分が正で、$\varepsilon=0$ はこの方向で局所最小である。よって全パラメータについても局所最大ではない。$b\le1$ の大域最適性はこの方向の二階微分だけからは結論できない。
<!-- solution-end -->

### ML2-06-C01 EMと尤度の厳密改善を統合する

- Level: C

標本 $(-2,2)$ を、重み各 $1/2$、既知分散各1、旧平均 $(-1,1)$ の二成分Gaussian混合で推定する。

1. Eステップの全責務を導出し、平均のMステップを求めよ。
2. $Q$ の増分が正であることを示し、観測尤度の厳密改善を証明せよ。
3. 成分ラベルを交換すると更新後の観測尤度は変わるか。単調改善が大域最適を意味しない理由も述べよ。

<!-- solution-start -->
### 詳細解答

**1. E/Mの計算**。$x=-2$ での成分密度比は

$$
\frac{\phi_1(-2;1,1)}{\phi_1(-2;-1,1)}
=\exp\left[-\frac{(-3)^2-(-1)^2}{2}\right]=e^{-4}.
$$

$a=(1+e^{-4})^{-1}$ と置けば、責務は $x=-2$ で $(a,1-a)$、$x=2$ で $(1-a,a)$。各 $N_k=1$、重み更新は各 $1/2$。平均更新は

$$
\mu_1^+=-2a+2(1-a)=2-4a,\qquad
\mu_2^+=-2(1-a)+2a=4a-2.
$$

**2. 増分の証明**。分散は固定、平均に関する重み付き平方完成を用いると

$$
\begin{aligned}
\Delta Q
&=\frac12\sum_kN_k(\mu_k-\mu_k^+)^2\\
&=\frac12\{(-1-2+4a)^2+(1-4a+2)^2\}\\
&=(4a-3)^2.
\end{aligned}
$$

$e^{-4}<1/3$ だから $a>3/4$、ゆえに $\Delta Q>0$。成分密度はどこでも正なので[EM差分恒等式](#thm-ml2-06-monotone)を適用でき、

$$
\Delta\ell=\Delta Q+\sum_{i=1}^2D_{\mathrm{KL}}(r_i^{\mathrm{old}}\Vert r_i^{\mathrm{new}})
\ge(4a-3)^2>0.
$$

**3. ラベルの不識別**。旧平均を $(1,-1)$ に交換すると責務の列も交換され、更新後の平均は $(4a-2,2-4a)$。重みと分散も対称であるから、各観測点の二成分密度の和は交換で不変。従って[ラベル交換による観測分布の不変性](../ML2-05/index.md#thm-ml2-05-label-switch)から、**各反復段階でラベル交換した場合としない場合の尤度**が一致する。更新の前後で尤度が等しいという意味ではない。

上の厳密改善は**この一歩**の主張である。他の初期値や母数との大域比較はしていない。[局所最大でない固定点](#prop-ml2-06-nonglobal)が実在するので、EMの単調性だけから大域最適性を結論することはできない。
<!-- solution-end -->
