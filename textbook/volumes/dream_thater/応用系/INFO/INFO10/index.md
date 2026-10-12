# INFO10 対数損失・統計的推測と相対エントロピー

[相対エントロピー](../INFO2/index.md#def-info2-relative-entropy)は二つの確率分布の差を測り、[Shannonエントロピー](../INFO1/index.md#def-info1-entropy)は一つの分布の不確かさを測りました。では、データを観測する前に「次に何が起こるか」という確率予測を発表するとき、二つの量はどんな役割を持つのでしょうか。確率1と言い切った事象が外れれば、単なる分類誤りより重い罰を与えたいはずです。

本章では**実際に起きた事象へ割り当てた確率の負の対数**を損失にします。期待損失の最小値はエントロピーで、誤った分布を発表した追加損失は相対エントロピーになります。観測後の最適予測には条件付き分布が現れ、標本からの分布当てはめには最尤推定が現れます。最後に同じ等式が、有限状態の自由エネルギー最小化にも現れる理由と、統計模型・物理模型を混同してはいけない理由を確かめます。

対数は底2、単位はビットです。第1〜5節は有限非空集合上の離散分布を扱い、確率0の規約、独立同分布性、標本数を必要な箇所で指定します。第6節の物理量だけは温度とエネルギーの単位を明示します。

## 1. 確率予測は「当たったか」だけでは測れない

$0$ が確率 $0.9$ で出る事象について、予測 $q(0)=0.6$ と $q(0)=0.9$ は、どちらも最頻値として $0$ を選びます。しかし確率を正しく表現しているのは後者です。「観測された文字にどれほどの確率を割り当てたか」を評価しましょう。

<a id="def-info10-log-loss"></a>

<!-- formal-statement-start -->
> **定義（対数損失と期待対数損失）**  
> 空でない有限集合 $\mathcal X$ の予測分布 $q$ と実現値 $x\in\mathcal X$ に対し、対数損失を

$$
\ell(q,x)=-\log_2q(x)
$$

> と定義する。$q(x)=0$ の場合は $\ell(q,x)=+\infty$ とする。真の分布 $p$ の下での期待損失（交差エントロピー）を

$$
L_p(q)=\sum_{x:p(x)>0}p(x)\ell(q,x)
$$

> と定義する。$p(x)>0$ なのに $q(x)=0$ の項があれば値は $+\infty$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info10-log-loss -->
### 例：二値の予測を採点する

**定義の確認**：$\mathcal X=\{0,1\}$、$p=(3/4,1/4)$、$q=(1/2,1/2)$ とします。$q$ は非負かつ総和1、$p$ の正確率の位置で $q>0$ なので期待損失は有限です。どちらが出ても $\ell(q,x)=1$、ゆえに $L_p(q)=3/4+1/4=1$ ビットです。$q=(1,0)$ と発表すると、確率 $1/4$ で起こる $1$ に確率0を付けたため $L_p(q)=+\infty$ です。
<!-- definition-example-end -->

予測分布を決める問題は、すべての $q$ に対する期待損失を比較する問題になりました。どんな分布を予測すればよいのでしょうか。

<a id="thm-info10-log-optimal"></a>

<!-- formal-statement-start -->
> **定理（対数損失の最適予測と相対エントロピー）**  
> 有限集合 $\mathcal X$ の真の分布 $p$ と任意の予測分布 $q$ に対し、拡張実数の等式

$$
L_p(q)=H(p)+D(p\|q)
$$

> が成り立つ。従って $\min_qL_p(q)=H(p)$ であり、最小値を達成する分布は $q=p$ に限る。
<!-- formal-statement-end -->

### 証明の見取り図

真の確率の対数を加えて引けば、[Shannonエントロピー](../INFO1/index.md#def-info1-entropy)と[相対エントロピー](../INFO2/index.md#def-info2-relative-entropy)に分かれます。最後の最小性と一意性だけに[Gibbs不等式](../INFO2/index.md#thm-info2-gibbs)を使います。

<!-- proof-start -->
### 証明

まず $p(x)>0=q(x)$ の文字があれば、左辺は定義から無限大、$D(p\|q)$ も無限大です。有限集合なので $H(p)$ は有限で、主張は成立します。

以下では $p(x)>0$ なら $q(x)>0$ とします。正確率の位置でのみ分母を使い、

$$
\begin{aligned}
L_p(q)
&=-\sum_{x:p(x)>0}p(x)\log_2q(x)\\
&=-\sum_{x:p(x)>0}p(x)\log_2p(x)
 +\sum_{x:p(x)>0}p(x)\log_2\frac{p(x)}{q(x)}\\
&=H(p)+D(p\|q).
\end{aligned}
$$

[有限分布のGibbs不等式](../INFO2/index.md#thm-info2-gibbs)により $D(p\|q)\ge0$ で、等号は $p=q$ のとき、かつそのときに限ります。$q=p$ を代入すれば実際に $L_p(p)=H(p)$ なので最小値は達成されます。
<!-- proof-end -->

**具体例**：$p=(3/4,1/4)$ を真とすると、等確率予測 $q=(1/2,1/2)$ の余分な損失は $1-H(p)$ です。

$$
\begin{aligned}
H(p)&=-\frac34\log_2\frac34-\frac14\log_2\frac14,\\
D(p\|q)&=\frac34\log_2\frac{3/4}{1/2}
+\frac14\log_2\frac{1/4}{1/2}
=1-H(p).
\end{aligned}
$$

分類を当てることと、**確率を正しく予測すること**は異なります。この定理の一意性は、対数損失が確率予測を正直に報告することを促す性質です。

## 2. 観測情報があるなら、何を予測すべきか

検査結果 $Y$ を見て病状 $X$ の確率を予測するとき、全員に同じ $q(x)$ を返すより、検査結果ごとに $q(x|y)$ を変える方がよいでしょう。ただし、その予測は $Y=y$ の下でどれくらい正しいのか、観測値の頻度まで含めて評価する必要があります。

<a id="def-info10-conditional-forecast"></a>

<!-- formal-statement-start -->
> **定義（条件付き確率予測の損失）**  
> 有限集合 $\mathcal X,\mathcal Y$ 上の結合分布 $p(x,y)$ を固定し、各 $y$ に対し予測分布 $q(\cdot|y)$ を一つ指定する。条件付き予測の期待対数損失を

$$
L(q;X|Y)=
\sum_{y:p_Y(y)>0}p_Y(y)
\sum_{x:p(x|y)>0}p(x|y)[-\log_2q(x|y)]
$$

> と定義する。$p_Y(y)>0$ では $p(x|y)=p(x,y)/p_Y(y)$ とする。正確率の事象に予測確率0を割り当てる項があれば損失は $+\infty$。$p_Y(y)=0$ の $y$ における予測は損失に影響しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info10-conditional-forecast -->
### 例：完全な観測と予測分布

**定義の確認**：$X$ は公平なビット、$Y=X$ とします。$p_Y(0)=p_Y(1)=1/2$ で、$p(x|y)$ は $x=y$ に確率1、それ以外に0を付けます。$q(x|y)=\mathbf1_{\{x=y\}}$ は各 $y$ で非負、総和1、正確率事象に確率1を付けます。従って $\ell(q,X)=0$ が確率1で成り立ち、$L(q;X|Y)=0$ です。観測を無視した公平予測なら損失は1ビットです。
<!-- definition-example-end -->

<a id="thm-info10-conditional-optimal"></a>

<!-- formal-statement-start -->
> **定理（条件付き対数損失と事後分布）**  
> 有限結合分布 $p(x,y)$ と任意の条件付き予測 $q(x|y)$ に対して

$$
L(q;X|Y)=H(X|Y)+
\sum_{y:p_Y(y)>0}p_Y(y)
D\!\left(p(\cdot|y)\|q(\cdot|y)\right)
$$

> が拡張実数で成立する。期待損失の最小値は $H(X|Y)$。最適予測は、$p_Y(y)>0$ のすべての $y$ で $q(\cdot|y)=p(\cdot|y)$ とするものに限る（零確率の $y$ では任意）。
<!-- formal-statement-end -->

### 証明の見取り図

最初の定理を観測値 $y$ ごとに適用してから、$p_Y(y)$ で加重平均します。個々の相対エントロピーが非負なので、最小性はすべての正確率 $y$ で同時に等号が成立するかどうかへ帰着します。

<!-- proof-start -->
### 証明

$p_Y(y)>0$ を固定し、$\mathcal X$ 上の二分布 $p_y(x)=p(x|y)$、$q_y(x)=q(x|y)$ を考えます。[対数損失の最適予測定理](#thm-info10-log-optimal)に、この $p_y,q_y$ を代入すると

$$
\sum_{x:p_y(x)>0}p_y(x)[-\log_2q_y(x)]
=H(p_y)+D(p_y\|q_y).
$$

両辺に $p_Y(y)>0$ を掛け、該当する有限個の $y$ を足します。左辺は定義から $L(q;X|Y)$、右辺第1項は[条件付きエントロピーの定義](../INFO1/index.md#def-info1-conditional-entropy)から $H(X|Y)$ です。もし一つの $y$ でKLが無限大なら、その $y$ の係数は正なので両辺は無限大となり矛盾しません。

各KLは[Gibbs不等式](../INFO2/index.md#thm-info2-gibbs)により非負です。有限個の非負項の正の重み付き和が0となるための必要十分条件は、すべての $p_Y(y)>0$ で $D(p_y\|q_y)=0$ となることです。等号条件から $q_y=p_y$ が従います。
<!-- proof-end -->

観測を無視した最適予測の損失は $H(X)$、観測後の最適予測の損失は $H(X|Y)$ です。従って観測で減らせる損失は、[相互情報量の定義と連鎖律](../INFO1/index.md#def-info1-mutual-information)から

$$
H(X)-H(X|Y)=I(X;Y).
$$

この等式は有限確率変数での結論です。連続変数の密度を使う場合、対数損失は基準測度に依存し、[微分エントロピーの有限性条件](../INFO9/index.md#def-info9-differential-entropy)を確認せずに上式へ移せません。

## 3. Bayesの公式は、最適な条件付き予測を計算する規則

第2節は「何が最適か」を教えますが、最適予測を実際に求めるには結合分布が必要です。原因 $\theta$ に事前確率を与え、原因が決まったときの観測の確率を与えれば、結合分布を作れます。

<a id="def-info10-posterior"></a>

<!-- formal-statement-start -->
> **定義（有限パラメータの事前・尤度・事後分布）**  
> 有限集合 $\Theta,\mathcal Z$、事前分布 $\pi(\theta)$、各 $\theta$ に対する観測分布 $f(z|\theta)$ を与える。結合分布を $\pi(\theta)f(z|\theta)$、周辺確率を

$$
m(z)=\sum_{\theta\in\Theta}\pi(\theta)f(z|\theta)
$$

> とする。$m(z)>0$ の観測 $z$ に対する事後分布を

$$
\pi(\theta|z)=\frac{\pi(\theta)f(z|\theta)}{m(z)}
$$

> と定義する。$m(z)=0$ の観測でこの比を定義しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info10-posterior -->
### 例：陽性判定後の確率

**定義の確認**：$\Theta=\{D,N\}$（該当・非該当）、$\pi(D)=1/4$、$\pi(N)=3/4$。陽性 $+$ の尤度を $f(+|D)=3/4$、$f(+|N)=1/4$、陰性はそれぞれ補数とします。各尤度は非負で陽性・陰性の和が1です。

$$
m(+)=\frac14\cdot\frac34+\frac34\cdot\frac14=\frac38>0.
$$

従って $\pi(D|+)=((1/4)(3/4))/(3/8)=1/2$、$\pi(N|+)=1/2$、二つの和は1です。陽性だから該当確率 $3/4$ になるのではなく、事前確率も掛ける必要があります。
<!-- definition-example-end -->

<a id="prop-info10-evidence-identity"></a>

<!-- formal-statement-start -->
> **命題（対数周辺尤度の変分恒等式）**  
> 上記の有限 Bayes 模型で $m(z)>0$ とし、$\pi(\theta|z)>0$ の位置にのみ質量を持つ任意の分布 $q$ を取る。次の恒等式が成り立つ。

$$
\log_2m(z)=
\sum_{\theta:q(\theta)>0}
q(\theta)\log_2\bigl(\pi(\theta)f(z|\theta)\bigr)
+H(q)+D\!\left(q\|\pi(\cdot|z)\right).
$$

> 第1項は $q(\theta)>0$ で積が正となるため有限である。特に第1項と $H(q)$ の和は $\log_2m(z)$ 以下で、等号は $q=\pi(\cdot|z)$ の場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

事後確率は「事前×尤度」を $m(z)$ で正規化したものです。これを相対エントロピーの分母に代入すると、残った定数 $\log_2m(z)$ と予測分布自身のエントロピーが現れます。

<!-- proof-start -->
### 証明

$q(\theta)>0$ なら仮定により $\pi(\theta|z)>0$。よって事後分布の定義を使って

$$
\begin{aligned}
D\!\left(q\|\pi(\cdot|z)\right)
&=\sum_{\theta:q(\theta)>0}
q(\theta)\log_2\frac{q(\theta)}{\pi(\theta|z)}\\
&=\sum_{\theta:q(\theta)>0}q(\theta)\log_2q(\theta)
-\sum_{\theta:q(\theta)>0}q(\theta)\log_2\bigl(\pi(\theta)f(z|\theta)\bigr)\\
&\quad+\log_2m(z)\sum_\theta q(\theta).
\end{aligned}
$$

ここで $\sum q=1$、$\sum q\log_2q=-H(q)$ です。従って移項して主張を得ます。[Gibbs不等式](../INFO2/index.md#thm-info2-gibbs)によるKLの非負性と等号条件から、下界とその達成分布が従います。
<!-- proof-end -->

これは近似事後分布 $q$ を最適化するときにも使えます。ただし、証明に用いた $\Theta$ は**有限**であり、$q$ の台は事後分布の台に含まれます。連続的なパラメータや近似分布族への拡張では、基準測度・密度・可積分性を別に確認します。

## 4. 最尤推定が相対エントロピーを小さくする理由

真の $p$ を知らないので標本 $z_1,\ldots,z_n$ から候補分布を選ぶ場面を考えます。尤度を最大にすることと、標本の経験分布に合う確率予測を選ぶことは同じ最適化です。

<a id="def-info10-empirical-distribution"></a>

<!-- formal-statement-start -->
> **定義（経験分布・標本対数尤度）**  
> 空でない有限 $\mathcal Z$ の標本 $z_1,\ldots,z_n$（$n\ge1$）に対し、経験分布を

$$
\widehat p_n(z)=\frac1n\sum_{i=1}^n\mathbf1_{\{z_i=z\}}
$$

> とする。候補分布 $q_\theta$（$\theta\in\Theta$）の標本対数尤度を

$$
\mathcal L_n(\theta)=\sum_{i=1}^n\log_2q_\theta(z_i)
$$

> と定義し、観測値の一つでも $q_\theta(z_i)=0$ なら $-\infty$ とする。最尤推定量は $\mathcal L_n$ を最大にする候補である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info10-empirical-distribution -->
### 例：四回のコイン投げ

**定義の確認**：$z^4=(1,0,1,1)$ なら $\widehat p_4(1)=3/4$、$\widehat p_4(0)=1/4$ で、両方非負・総和1です。候補 $q_\theta(1)=\theta$、$q_\theta(0)=1-\theta$ について $0<\theta<1$ なら $\mathcal L_4(\theta)=3\log_2\theta+\log_2(1-\theta)$ です。
<!-- definition-example-end -->

<a id="prop-info10-mle-kl"></a>

<!-- formal-statement-start -->
> **命題（経験対数尤度と相対エントロピー）**  
> 有限集合 $\mathcal Z$ の任意の標本 $z_1,\ldots,z_n$ と候補確率分布 $q_\theta$ について、拡張実数の等式

$$
-\frac1n\mathcal L_n(\theta)
=H(\widehat p_n)+D(\widehat p_n\|q_\theta)
$$

> が成り立つ。従って候補集合上の最尤推定は、経験分布から候補への相対エントロピーを最小にする操作と一致する。$\mathcal L_n$ の最大値が達成されるかは候補集合による。
<!-- formal-statement-end -->

### 証明の見取り図

標本を文字ごとに数え直すだけで、平均負対数尤度が経験分布の期待対数損失になります。最初の最適予測定理を使えばKL表示が得られます。

<!-- proof-start -->
### 証明

各 $z$ の標本内の出現回数を $N_z=\sum_i\mathbf1_{\{z_i=z\}}$ とします。$N_z>0$ なのに $q_\theta(z)=0$ なら両辺は無限大です。それ以外の場合は

$$
\begin{aligned}
-\frac1n\mathcal L_n(\theta)
&=-\frac1n\sum_{z:N_z>0}N_z\log_2q_\theta(z)\\
&=-\sum_{z:\widehat p_n(z)>0}\widehat p_n(z)\log_2q_\theta(z)\\
&=L_{\widehat p_n}(q_\theta)\\
&=H(\widehat p_n)+D(\widehat p_n\|q_\theta),
\end{aligned}
$$

最後の行は[対数損失の最適予測定理](#thm-info10-log-optimal)を $p=\widehat p_n$ に適用しました。$H(\widehat p_n)$ は $\theta$ に依存しないため、負対数尤度の最小候補とKLの最小候補が同じになります。
<!-- proof-end -->

**Bernoulliの例**：四回の標本 $(1,0,1,1)$ の対数尤度は $3\log_2\theta+\log_2(1-\theta)$。導関数の符号は底を変えても同じです。

$$
\frac{d}{d\theta}\mathcal L_4(\theta)
=\frac1{\ln2}\left(\frac3\theta-\frac1{1-\theta}\right)
=\frac{3-4\theta}{\theta(1-\theta)\ln2}.
$$

$0<\theta<3/4$ で正、$3/4<\theta<1$ で負なので、最大点は $\theta=3/4$。経験分布と一致するため $D(\widehat p_4\|q_{3/4})=0$ です。これは**四回の標本に最も合う**という意味であり、真の確率が厳密に $3/4$ と証明されたわけではありません。

## 5. 標本数を増やすと、最尤推定はどこへ向かうか

経験分布は標本によって揺れます。候補模型が真の分布を含まないとき、最尤推定は真の分布そのものではなく、真の分布からのKLが最小となる候補を選ぼうとします。ただし無条件の一般論ではなく、まず有限候補でその主張を証明します。

<a id="thm-info10-finite-model-consistency"></a>

<!-- formal-statement-start -->
> **定理（有限候補でのKL射影への収束）**  
> $\mathcal Z$ と $\Theta$ を空でない有限集合とする。$Z_1,Z_2,\ldots$ は有限分布 $p$ に従う独立同分布列とし、各 $\theta\in\Theta$ の候補分布 $q_\theta$ は、すべての $z\in\mathcal Z$ で $q_\theta(z)>0$ とする。
>
> $D(p\|q_\theta)$ を最小にする候補 $\theta^\star$ が一意であると仮定する。標本 $\{Z_i\}_{i=1}^n$ の対数尤度最大化による推定量 $\widehat\theta_n$ を、同点時には決めた順番で一つ選ぶものとする。このとき

$$
P(\widehat\theta_n=\theta^\star)\longrightarrow1
\quad(n\to\infty).
$$
<!-- formal-statement-end -->

### 証明の見取り図

各候補の一標本負対数損失 $-\log_2q_\theta(Z_i)$ は有界な独立同分布列です。INFO3の[漸近等分割性の証明](../INFO3/index.md#thm-info3-aep)と同じ二乗平均の評価を各候補に適用します。候補数が有限なので、すべての候補について同時に近似が成立し、正のKLギャップが順位を固定します。

<!-- proof-start -->
### 証明

$R(\theta):=E_p[-\log_2q_\theta(Z_1)]$ と置きます。$\mathcal Z$ は有限、候補の各確率は正なので、$\max_z|-\log_2q_\theta(z)|<\infty$ であり期待値と分散が有限です。標本負対数尤度を

$$
R_n(\theta)=-\frac1n\sum_{i=1}^n\log_2q_\theta(Z_i)
$$

とすると、独立同分布性と有限分散から $E[R_n(\theta)]=R(\theta)$、$\operatorname{Var}(R_n(\theta))=\operatorname{Var}[-\log_2q_\theta(Z_1)]/n$。平均の差の二乗は非負です。$|R_n(\theta)-R(\theta)|\ge\varepsilon$ の事象上では二乗が $\varepsilon^2$ 以上なので、期待値をこの事象と補集合に分けると

$
E[(R_n(\theta)-R(\theta))^2]\ge \varepsilon^2P(|R_n(\theta)-R(\theta)|\ge\varepsilon).
$

左辺は $\operatorname{Var}(R_n(\theta))$ です。従って任意の $\varepsilon>0$ で

$
P(|R_n(\theta)-R(\theta)|\ge\varepsilon)
\le\frac{\operatorname{Var}[-\log_2q_\theta(Z_1)]}{n\varepsilon^2}
\longrightarrow0.
$$

ここで[対数損失の最適予測定理](#thm-info10-log-optimal)から

$$
R(\theta)=H(p)+D(p\|q_\theta).
$$

従って $R(\theta)$ の唯一の最小点は $\theta^\star$ です。$\Theta$ が複数候補を持つ場合、有限性・一意性から

$$
\delta:=\min_{\theta\ne\theta^\star}
\{R(\theta)-R(\theta^\star)\}>0.
$$

各 $\theta$ について $|R_n(\theta)-R(\theta)|<\delta/3$ が同時に成立する事象 $A_n$ を取ります。有限和による和事象の確率上界を使って

$$
P(A_n^c)\le
\sum_{\theta\in\Theta}
P(|R_n(\theta)-R(\theta)|\ge\delta/3)
\longrightarrow0.
$$

$A_n$ 上で $\theta\ne\theta^\star$ なら

$$
\begin{aligned}
R_n(\theta)-R_n(\theta^\star)
&>R(\theta)-R(\theta^\star)-\frac{2\delta}3\\
&\ge\frac\delta3>0.
\end{aligned}
$$

よってこの事象上では $\widehat\theta_n=\theta^\star$。従って $P(\widehat\theta_n=\theta^\star)\ge P(A_n)\to1$ です。候補が一個だけなら推定量は常にその候補で、結論は自明に成立します。
<!-- proof-end -->

この定理では候補数を有限にし、候補が確率0を付けないようにしました。無限パラメータ模型では**候補ごとの収束**だけでは全候補の一斉制御になりません。また、一意性がなければ推定値がどの最小化候補に落ち着くかは結論できません。真の分布 $p$ が候補集合に入ることは仮定していないので、極限先は一般に**KL射影**であって真のパラメータとは限りません。

## 6. 同じ最適化が自由エネルギーに現れる

次は予測問題から離れ、有限個の物理状態に確率を割り当てる問題を考えます。状態の平均エネルギーを下げたい一方、どの状態にも広く分布するほどエントロピーが増えます。二つを競わせると、指数形の分布が現れます。これは**情報量だけから物理の法則を導く**主張ではなく、有限状態で与えられたエネルギー関数のもとでの数学的最適化です。

<a id="def-info10-free-energy"></a>

<!-- formal-statement-start -->
> **定義（有限状態の自由エネルギー汎関数）**  
> 有限非空集合 $\Omega$、実数値エネルギー $E(s)$（すべて有限）、温度 $T>0$、Boltzmann定数 $k_B>0$ を固定する。分布 $q$ に対し、物理的エントロピーと自由エネルギーを

$$
S(q)=k_B(\ln2)H(q),\qquad
F_T(q)=\sum_{s\in\Omega}q(s)E(s)-TS(q)
$$

> と定義する。$S$ の単位はエネルギー毎温度、$F_T$ の単位はエネルギーである。$H$ はビット単位のShannonエントロピーとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-info10-free-energy -->
### 例：同じエネルギーの二状態

**定義の確認**：$\Omega=\{a,b\}$、$E(a)=E(b)=E_0$、$q=(1/2,1/2)$ なら確率は非負で総和1、$H(q)=1$ ビットです。平均エネルギーは $E_0$、物理エントロピーは $k_B\ln2$、自由エネルギーは $E_0-k_BT\ln2$。$k_BT$ をそのまま「1ビットのエネルギー係数」として掛けるのではなく $\ln2$ が必要です。
<!-- definition-example-end -->

<a id="thm-info10-free-energy-variational"></a>

<!-- formal-statement-start -->
> **定理（有限状態のGibbs分布と自由エネルギーの最小性）**  
> 上の有限状態・温度のもとで

$$
Z_T=\sum_{s\in\Omega}\exp\left(-\frac{E(s)}{k_BT}\right),
\qquad
r_T(s)=\frac{\exp(-E(s)/(k_BT))}{Z_T}
$$

> と置く。$Z_T>0$、$r_T$ はすべての状態で正の確率分布であり、任意の $q$ に対して

$$
F_T(q)=-k_BT\ln Z_T
+k_BT(\ln2)D(q\|r_T).
$$

> 従って $F_T$ は $q=r_T$ で、かつそのときに限り最小となり、最小値は $-k_BT\ln Z_T$ である。
<!-- formal-statement-end -->

### 証明の見取り図

$r_T$ の対数はエネルギー $E(s)$ と定数 $\ln Z_T$ の和です。それを $D(q\|r_T)$ に入れて展開すると、平均エネルギーと負のエントロピーが現れます。最小化そのものは[Gibbs不等式](../INFO2/index.md#thm-info2-gibbs)から従います。

<!-- proof-start -->
### 証明

有限個の実数 $E(s)$ について各指数は正の有限値なので $0<Z_T<\infty$。各 $r_T(s)>0$ で総和は1です。$\ln r_T(s)=-E(s)/(k_BT)-\ln Z_T$ を代入すると

$$
\begin{aligned}
(\ln2)D(q\|r_T)
&=\sum_{s:q(s)>0}q(s)\ln\frac{q(s)}{r_T(s)}\\
&=\sum_sq(s)\ln q(s)
+\frac1{k_BT}\sum_sq(s)E(s)
+\ln Z_T\sum_sq(s)\\
&=-(\ln2)H(q)
+\frac{E_q[E]}{k_BT}+\ln Z_T,
\end{aligned}
$$

ここで $0\ln0=0$ の規約で和を拡張し、$E_q[E]=\sum_sq(s)E(s)$ です。両辺に $k_BT$ を掛け、$TS(q)=k_BT(\ln2)H(q)$ を移項すると

$$
F_T(q)=-k_BT\ln Z_T
+k_BT(\ln2)D(q\|r_T)
$$

を得ます。[Gibbs不等式](../INFO2/index.md#thm-info2-gibbs)によりKLは非負で、等号は $q=r_T$ に限ります。
<!-- proof-end -->

**二状態の具体計算**：$E(0)=0$、$E(1)=\Delta>0$ とし、$a=\exp(-\Delta/(k_BT))\in(0,1)$ と置きます。

$$
Z_T=1+a,\qquad
r_T(0)=\frac1{1+a},\qquad
r_T(1)=\frac a{1+a}.
$$

低温では $a$ が小さく、低エネルギー状態0へ集中します。$T$ を大きくすれば $a$ は1に近づき、二状態はほぼ等確率になります。これはこの有限模型の計算です。平衡の成立や熱力学過程の可逆性を情報理論の等式だけで証明したわけではありません。

## 7. 離散・連続・推測・物理の境界

ここまでの等式に共通するのは、「ある分布で対数を平均する」形です。一方、何を確率とし、何を最適化するかは問題ごとに違います。

- **確率予測**では真の有限分布 $p$ を固定し、予測分布 $q$ の対数損失を最小化します。基準値は $H(p)$、余剰は $D(p\|q)$ です。
- **統計的推測**では真の $p$ は未知で、観測標本の経験分布を使って模型 $q_\theta$ を選びます。標本適合と真の分布への接近は区別します。
- **Bayes推測**では観測後の分布 $\pi(\cdot|z)$ を計算し、任意の近似 $q$ との差を $D(q\|\pi(\cdot|z))$ で表します。KLの向きは予測損失の $D(p\|q)$ と逆であり、交換してよいわけではありません。
- **有限状態の物理模型**では状態エネルギー $E$ と温度 $T$ を固定し、平均エネルギーと $k_B\ln2$ 倍の情報エントロピーを組み合わせます。エントロピーの「ビット」は無次元、物理的エントロピーは $k_B$ を通して単位を持ちます。

連続観測 $X$ の密度予測 $q(x)$ の期待対数損失は、基準測度と $\int p|\log_2 q|$ の有限性を明示したときに限り $h(p)+D(p\|q)$ と整理できます。[連続分布の相対エントロピー](../INFO9/index.md#def-info9-continuous-kl)と[微分エントロピー](../INFO9/index.md#def-info9-differential-entropy)の条件を確認してください。微分エントロピーは負になり得て、単位変換でも変化します。したがって離散版の「期待対数損失の最小値は非負」を連続密度へそのまま移しません。

## 8. 演習と詳細解答

### Level A：損失・事後確率・単位

#### A1. 対数損失と予測確率0

真の分布を $p=(1/2,1/2)$ とする。$q=(3/4,1/4)$ と $r=(1,0)$ の期待対数損失、前者の余分な損失を求めよ。

- Level: A
- ID: INFO10-A1

<!-- solution-start -->
**詳細解答**　$q$ は両文字に正確率を与えるので

$$
\begin{aligned}
L_p(q)&=-\frac12\log_2\frac34-\frac12\log_2\frac14
=\frac12\log_2\frac{16}3,\\
H(p)&=1,\qquad
D(p\|q)=\frac12\log_2\frac{1/2}{3/4}
+\frac12\log_2\frac{1/2}{1/4}
=\frac12\log_2\frac43.
\end{aligned}
$$

$\frac12\log_2(16/3)-1=\frac12\log_2(4/3)$ なので[最適予測定理](#thm-info10-log-optimal)と一致します。$r(1)=0$ なのに $p(1)=1/2>0$ だから $L_p(r)=+\infty$ です。
<!-- solution-end -->

#### A2. 観測後に完全予測できるビット

$X$ は公平なビット、$Y=X$ とする。観測 $Y$ を使わないときと使うときの最小期待対数損失、$I(X;Y)$ を求めよ。

- Level: A
- ID: INFO10-A2

<!-- solution-start -->
**詳細解答**　観測なしでは $p_X=(1/2,1/2)$ なので最小損失は $H(X)=1$。観測ありでは $p(x|y)=\mathbf1_{\{x=y\}}$ なので条件付きエントロピーは

$$
H(X|Y)=\sum_{y=0}^1\frac12
\left[-1\log_21\right]=0.
$$

[条件付き最適予測定理](#thm-info10-conditional-optimal)により最小損失は0、差は $1-0=1$ ビットです。[相互情報量](../INFO1/index.md#def-info1-mutual-information)も $H(X)-H(X|Y)=1$ です。
<!-- solution-end -->

#### A3. Bayesの公式で陽性後の確率

事前確率 $\pi(D)=1/5$、$\pi(N)=4/5$、陽性の尤度 $f(+|D)=4/5$、$f(+|N)=1/10$ とする。$m(+)$、$\pi(D|+)$、$\pi(N|+)$ を計算せよ。

- Level: A
- ID: INFO10-A3

<!-- solution-start -->
**詳細解答**　陽性の結合確率は $P(D,+)=(1/5)(4/5)=4/25$、$P(N,+)=(4/5)(1/10)=2/25$。従って

$$
m(+)=\frac4{25}+\frac2{25}=\frac6{25}>0.
$$

[事後分布の定義](#def-info10-posterior)から

$$
\pi(D|+)=\frac{4/25}{6/25}=\frac23,\qquad
\pi(N|+)=\frac{2/25}{6/25}=\frac13.
$$

いずれも非負で、和は1です。尤度の $4/5$ を事後確率と混同しません。
<!-- solution-end -->

#### A4. 物理エントロピーへの単位換算

等エネルギーの4状態に一様分布 $q$ を与える。$H(q)$、$S(q)$、$F_T(q)$ を、共通エネルギー $E_0$ で表せ。

- Level: A
- ID: INFO10-A4

<!-- solution-start -->
**詳細解答**　各状態の確率は $1/4$、総和は1なので

$$
H(q)=-4\cdot\frac14\log_2\frac14=2.
$$

[自由エネルギーの定義](#def-info10-free-energy)から $S(q)=2k_B\ln2=k_B\ln4$、$E_q[E]=4(1/4)E_0=E_0$。ゆえに

$$
F_T(q)=E_0-2k_BT\ln2=E_0-k_BT\ln4.
$$

ビットの数値2をそのまま $k_BT$ に掛けず、$\ln2$ を掛けています。
<!-- solution-end -->

### Level B：推定と最適化の構造

#### B1. 正確率の条件付き予測

$P(Y=0)=P(Y=1)=1/2$、$P(X=1|Y=0)=1/4$、$P(X=1|Y=1)=3/4$ とする。各 $y$ で $X$ の分布を求め、最適な条件付き予測と、その最小損失を表せ。

- Level: B
- ID: INFO10-B1

<!-- solution-start -->
**詳細解答**　$Y=0$ のとき $p(\cdot|0)=(3/4,1/4)$、$Y=1$ のとき $p(\cdot|1)=(1/4,3/4)$ です。両者とも総和1であり、$p_Y(y)=1/2>0$ です。[条件付き最適予測定理](#thm-info10-conditional-optimal)より、各 $y$ で $q(\cdot|y)=p(\cdot|y)$ を選びます。二つの条件付きエントロピーは同じ二値エントロピー

$$
h_2(1/4)=-\frac14\log_2\frac14-\frac34\log_2\frac34
$$

なので、最小期待損失は $H(X|Y)=\frac12h_2(1/4)+\frac12h_2(1/4)=h_2(1/4)$ です。なお $P(X=1)=\frac12(\frac14+\frac34)=1/2$ なので観測なしでは損失1、情報利得は $1-h_2(1/4)$ ビットとなります。
<!-- solution-end -->

#### B2. 四標本での最尤推定

標本 $(1,0,1,1)$ と Bernoulli 模型 $q_\theta(1)=\theta$、$q_\theta(0)=1-\theta$、$0<\theta<1$ に対し、最尤推定値、経験エントロピー、最小平均負対数尤度を求めよ。

- Level: B
- ID: INFO10-B2

<!-- solution-start -->
**詳細解答**　経験分布は $\widehat p_4(1)=3/4$、$\widehat p_4(0)=1/4$ で、[対数尤度とKLの命題](#prop-info10-mle-kl)は

$$
-\frac14\mathcal L_4(\theta)
=H(\widehat p_4)+D(\widehat p_4\|q_\theta)
$$

を与えます。$\theta=3/4$ ならKLは0、かつ値は非負なので最小です。等号条件から唯一の最尤推定値は $\widehat\theta=3/4$。また

$$
H(\widehat p_4)
=-\frac34\log_2\frac34-\frac14\log_2\frac14
=h_2(1/4).
$$

この値が最小平均負対数尤度です。標本と候補分布が一致することからの結論であり、真の成功確率を確定したものではありません。
<!-- solution-end -->

#### B3. Bayes近似のKLギャップ

$\Theta=\{a,b\}$、観測後の事後分布は $r=(3/4,1/4)$、近似分布は $q=(1/2,1/2)$ とする。$D(q\|r)$ を計算し、[変分恒等式](#prop-info10-evidence-identity)の右辺の「第1項＋エントロピー」が $\log_2m(z)$ よりどれだけ小さいか答えよ。

- Level: B
- ID: INFO10-B3

<!-- solution-start -->
**詳細解答**　どちらの事後確率も正なのでKLは有限です。

$$
\begin{aligned}
D(q\|r)&=\frac12\log_2\frac{1/2}{3/4}
+\frac12\log_2\frac{1/2}{1/4}\\
&=\frac12\log_2\frac23+\frac12\log_22
=\frac12\log_2\frac43.
\end{aligned}
$$

変分恒等式を移項すると「$\log_2m(z)$ −（第1項＋$H(q)$）」が $D(q\|r)$ に等しいので、下界の不足は $\frac12\log_2(4/3)$ ビットです。逆向き $D(r\|q)$ に置き換えることはできません。
<!-- solution-end -->

#### B4. 予測が台を外すとどうなるか

有限集合 $\{0,1,2\}$ の真の分布を $p=(1/2,1/2,0)$ とする。候補 $q=(1/2,1/4,1/4)$、$r=(1,0,0)$ に対し $L_p(q)$、$D(p\|q)$、$L_p(r)$ を求めよ。台の条件を示せ。

- Level: B
- ID: INFO10-B4

<!-- solution-start -->
**詳細解答**　$p>0$ の位置は0,1だけで、そこでは $q>0$ なので

$$
L_p(q)=-\frac12\log_2\frac12-\frac12\log_2\frac14
=\frac12+\frac22=\frac32.
$$

$H(p)=1$ だから[最適予測定理](#thm-info10-log-optimal)により $D(p\|q)=3/2-1=1/2$。直接にも

$$
D(p\|q)=\frac12\log_2\frac{1/2}{1/2}
+\frac12\log_2\frac{1/2}{1/4}=\frac12.
$$

$q(2)=1/4$ であっても $p(2)=0$ なので、この位置から損失は生じません。一方 $r(1)=0<p(1)$ なので $L_p(r)=+\infty$ です。予測分布の台が真の台を含む必要があります。
<!-- solution-end -->

### Level C：情報・推定・自由エネルギーを一つの式で比較する

#### C1. 候補模型と二状態の変分問題

$Z_1,\ldots,Z_n$ は $P(Z_i=1)=1/4$ の独立同分布二値列とする。候補模型は $\Theta=\{a,b\}$、$q_a(1)=1/2$、$q_b(1)=1/8$ とし、いずれも両文字に正確率を与える。別に物理模型の状態 $\{0,1\}$ のエネルギーを $E(0)=0,E(1)=\Delta>0$、温度 $T>0$ とする。

1. 各候補の真の期待対数損失を式にし、真の分布からのKLと差が一致することを示せ。
2. どちらがKLの小さい候補か、対数の大小を具体的な分数比較で判定せよ。有限候補での最尤推定の確率極限を述べ、仮定を確認せよ。
3. 物理模型の $Z_T$、$r_T$、最小自由エネルギーを求めよ。任意の分布 $q$ との自由エネルギー差をKLで表し、係数の単位を説明せよ。
4. (1)のKLと(3)のKLで何を固定し、何を最適化するのか、KLの引数の意味を明示せよ。

- Level: C
- ID: INFO10-C1

<!-- solution-start -->
**詳細解答**

**(1)** 真の分布は $p(0)=3/4,p(1)=1/4$ であり、$q_a(0)=1/2,q_b(0)=7/8$ です。両候補は正の確率なので期待損失は有限で、

$$
\begin{aligned}
R(a)&=-\frac34\log_2\frac12-\frac14\log_2\frac12=1,\\
R(b)&=-\frac34\log_2\frac78-\frac14\log_2\frac18
=-\frac34\log_2\frac78+\frac34.
\end{aligned}
$$

[最適予測定理](#thm-info10-log-optimal)から、どちらも $R(\theta)=H(p)+D(p\|q_\theta)$ です。具体的に

$$
\begin{aligned}
D(p\|q_a)&=\frac34\log_2\frac{3/4}{1/2}
+\frac14\log_2\frac{1/4}{1/2},\\
D(p\|q_b)&=\frac34\log_2\frac{3/4}{7/8}
+\frac14\log_2\frac{1/4}{1/8}.
\end{aligned}
$$

各式の対数項を $R(\theta)$ へ加えると共通の $H(p)=-\frac34\log_2(3/4)-\frac14\log_2(1/4)$ になるので、差はKLの差と一致します。

**(2)** $R(a)=1$ と比較するため

$$
R(b)-R(a)
=-\frac34\log_2\frac78-\frac14
=\frac14\log_2\left[\left(\frac87\right)^3\frac12\right].
$$

括弧内は $\frac{512}{343\cdot2}=\frac{256}{343}<1$ なので対数は負です。従って $R(b)<R(a)$、唯一のKL最小候補は $b$。有限 $\Theta$、有限 $\mathcal Z$、独立同分布、$q_a,q_b>0$、一意性がすべて成立するので、[有限候補の収束定理](#thm-info10-finite-model-consistency)から

$$
P(\widehat\theta_n=b)\longrightarrow1.
$$

しかし真の成功確率 $1/4$ は候補 $1/2,1/8$ のいずれでもないため、推定値が真の模型に一致するわけではありません。

**(3)** $a=\exp(-\Delta/(k_BT))$ とすると $0<a<1$ で、

$$
Z_T=1+a,\qquad r_T(0)=\frac1{1+a},\quad r_T(1)=\frac a{1+a}.
$$

[自由エネルギー最小性定理](#thm-info10-free-energy-variational)から

$$
F_T(r_T)=-k_BT\ln(1+a),\qquad
F_T(q)-F_T(r_T)=k_BT(\ln2)D(q\|r_T).
$$

$D$ はビット単位、$\ln2$ は底2と自然対数の変換係数、$k_BT$ はエネルギー単位なので、右辺の単位は自由エネルギーと一致します。

**(4)** 統計予測では未知の真の分布 $p$ を評価上は固定し、候補 $q_\theta$ を選んで $D(p\|q_\theta)$ を小さくします。自由エネルギーの変分式では $E,T$ が固定されて参照分布 $r_T$ が定まり、選択する分布 $q$ について $D(q\|r_T)$ を小さくします。この二つは同じ相対エントロピーを使いますが、第一・第二引数を交換した等式ではありません。
<!-- solution-end -->

## 9. 章のまとめ

対数損失を通して、[Shannonエントロピー](../INFO1/index.md#def-info1-entropy)は「正しい分布を予測したときにも残る不確かさ」、[相対エントロピー](../INFO2/index.md#def-info2-relative-entropy)は「分布を外したために余分に払う損失」と読めるようになりました。観測後には条件付き分布が最適となり、経験分布による当てはめは最尤推定へ、エントロピーとエネルギーの競合は有限状態の自由エネルギーへつながります。

ただし共通の式が出るだけでは、模型の同一性まで主張できません。**KLの向き、確率の台、候補集合、独立同分布性、有限・連続の違い、物理量の単位**を明示して、どの問題で何を比較しているかを確かめることが必要です。
