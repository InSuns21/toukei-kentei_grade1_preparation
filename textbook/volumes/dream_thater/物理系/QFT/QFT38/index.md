# QFT38 弱崩壊・Fermi四フェルミオン相互作用と低エネルギー有効理論

[QFT36の荷電弱電流](../QFT36/index.md#thm-qft36-fermion-couplings)は、質量を持つ $W^\pm$ が左カイラルのフェルミオンを結ぶことを示しました。[QFT37のCKM荷電電流](../QFT37/index.md#thm-qft37-ckm-current)を使えばクォークの世代変換も書けます。しかし、ミューオンが電子と二つのニュートリノに崩壊するような現象では、終状態に実在の $W$ は現れません。**重い粒子を作るほどのエネルギーがないとき、その交換をどのような相互作用として計算すればよいでしょうか。**

本講では重い $W$ の仮想交換を低運動量で展開し、四つのフェルミオン場が同じ点で結合する近似を得ます。係数は電弱真空期待値 $v$ と結ばれます。さらに、ミューオン崩壊のスピン和と三体位相空間を一続きで積分し、どこまでが木レベルの予言で、どこから質量・放射・ハドロンの補正が必要かを確かめます。

時空は $3+1$ 次元のMinkowski空間、計量は $\eta=\operatorname{diag}(-1,1,1,1)$、$\hbar=c=1$ です。$g>0$、$m_W=gv/2>0$、フェルミオン運動項は正準規格化されているとします。

[QFT32のカイラリティと射影子](../QFT32/index.md#def-qft32-chirality)に従い $P_L=(1-\gamma^5)/2$ を用い、[QFT7のDirac随伴](../QFT7/index.md#def-qft7-adjoint-action)に従って $\overline\psi=\psi^\dagger H$、$H=-i\gamma^0$ とします。Lorentz添字の上下は $\eta$ で移し、同じ添字の上下反復は $0,1,2,3$ について和を取ります。

以下で $W$ の消去、四フェルミオン振幅、崩壊率を主張するのは**木レベル**です。$q$ は交換される仮想 $W$ の四元運動量で、$q^2=\eta_{\mu\nu}q^\mu q^\nu$ とします。$|q^2|\ll m_W^2$ かつ外部フェルミオンの各質量 $m_f$ も $m_W$ より十分小さい領域で扱い、遠方境界では部分積分の表面項が消えるとします。

## 1. 荷電電流の向きと世代因子

まず電弱相互作用の二つの端点を固定します。電荷 $+1$ の $W^+$ に掛かるフェルミオン双線形は $\overline u\gamma^\mu P_Ld$ や $\overline\nu\gamma^\mu P_Le$ です。これらの双線形自身の電荷は $-1$ なので、全体は電磁的に中性です。計量 $(-+++)$ の[Dirac電流](../QFT7/index.md#thm-qft7-current)は $-i$ を掛けて実の物理電流にするため、この章ではその因子を電流 $J_\pm$ の定義に含めます。

記号 $u,d,e,\nu$ は質量基底でのフェルミオン場を表します。世代添字 $\alpha,\beta\in\{1,2,3\}$ は、上型・下型それぞれを

$$
(u_1,u_2,u_3)=(u,c,t),\qquad(d_1,d_2,d_3)=(d,s,b)
$$

の順に並べたものです。これは[QFT37のCKM行・列の規約](../QFT37/index.md#def-qft37-ckm)と一致します。

レプトン添字 $\ell\in\{e,\mu,\tau\}$ は荷電レプトンの種類を表し、$\nu_\ell$ は対応するニュートリノです。ニュートリノは左Weyl成分だけを持つ質量零の最小標準模型を採用します。$\nu$ に作用する $P_L$ はこの左成分を選ぶ記法です。

交換する $W^+$ と $W^-$ の両端を取り違えないため、次の二つの電流を使います。

<a id="def-qft38-charged-current"></a>

<!-- formal-statement-start -->
> **定義（質量基底での荷電弱電流）**
> 三世代の最小標準模型で、[CKM行列](../QFT37/index.md#def-qft37-ckm) $V$ を用い、Lorentzベクトルの電流を

$$
J_+^\mu=-i\left(\sum_{\alpha,\beta=1}^3\overline u_\alpha\gamma^\mu P_LV_{\alpha\beta}d_\beta
+\sum_{\ell=e,\mu,\tau}\overline\nu_\ell\gamma^\mu P_L\ell\right),
\qquad J_-^\mu=(J_+^\mu)^\dagger
$$

> と置く（最後の $\dagger$ は電流のHermitian共役を意味する）。荷電ゲージ場との結合を

$$
\mathcal L_{\rm cc}=\frac g{\sqrt2}(W_\mu^+J_+^\mu+W_\mu^-J_-^\mu)
$$

> とする。$W^-=(W^+)^*$ で、Hermitian共役の電流は

$$
J_-^\mu=-i\left(\sum_{\alpha,\beta}V_{\alpha\beta}^*\overline d_\beta\gamma^\mu P_Lu_\alpha+\sum_\ell\overline\ell\gamma^\mu P_L\nu_\ell\right)
$$

> と展開できる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft38-charged-current -->
### 例：一つのクォーク頂点と一つのレプトン頂点

**定義の確認**：$\alpha=1,\beta=1$ とした項は $-iV_{ud}\overline u\gamma^\mu P_Ld$（$V_{ud}=V_{11}$）であり、$\overline u$ の電荷 $-2/3$ と $d$ の電荷 $-1/3$ の和は $-1$ です。$W^+$ の電荷 $+1$ と相殺します。レプトン項 $-i\overline\nu_e\gamma^\mu P_Le$ は $0-1=-1$ です。

さらに $P_R=1-P_L$ とすると、Dirac共役と左射影子の交換は

$$
H(\gamma^\mu P_L)^\dagger H
=-P_R\gamma^\mu=-\gamma^\mu P_L
$$

です。従って素の双線形のHermitian共役には負号が付きますが、$(-i)^*=+i$ と掛け合わせると $(-i\overline u\gamma^\mu P_Ld)^\dagger=-i\overline d\gamma^\mu P_Lu$ です。共役の $J_-$ には $V_{ud}^*$ が現れて $W^-$ と結合します。これは電荷・左射影・複素共役という三つの条件の直接確認です。

したがって $d\to u e^-\overline\nu_e$ を扱う局所項は $V_{ud}(\overline u\gamma^\mu P_Ld)(\overline e\gamma_\mu P_L\nu_e)$ であり、複素共役の位置まで追えます。これは自由クォークの場についての記述で、束縛された中性子の崩壊率をこの式だけで求めたことにはなりません。
<!-- definition-example-end -->

## 2. 重い $W$ を消すと何が残るか

低エネルギーの仮想交換では、$W$ の伝播関数にある $q^2+m_W^2$ の分母を $m_W^2$ のまわりで展開できます。これは[QFT26の重い場の低エネルギー展開](../QFT26/index.md#prop-qft26-heavy-matching)のベクトル場版です。ただしここでは重いゲージ場の相互作用を木レベルで評価するだけで、ループのmatchingやくりこみ群の効果は含めません。

記号 $[X]$ は自然単位系での量 $X$ の質量次元を表します。$[\psi]=3/2$ なので、一つの荷電電流は次元3です。二つの電流の積は次元6となり、作用密度の次元4に合わせる係数には質量次元 $-2$ が必要です。これが重い質量の二乗で抑制される理由です。

<a id="def-qft38-fermi-operator"></a>

<!-- formal-statement-start -->
> **定義（Fermi四フェルミオン演算子）**
> 正準規格化した左カイラル荷電電流 $J_\pm$ に対し、局所的で電荷中性な次元6演算子を（$J_{+\mu}=\eta_{\mu\nu}J_+^\nu$ として）

$$
\mathcal O_F=J_{+\mu}J_-^\mu
$$

> と置く。その係数を $+C_F$ とした低エネルギー相互作用 $\mathcal L_F=+C_F\mathcal O_F$ をFermi四フェルミオン相互作用という。$C_F$ の質量次元は $-2$ であり、係数の値は重い $W$ の消去で決める。なお $J_\pm=-iB_\pm$ と素の双線形の和 $B_\pm$ を定め直すと、$\mathcal O_F=-B_+\cdot B_-$ なので $\mathcal L_F=-C_FB_+\cdot B_-$ となり、慣用的な $V-A$ 相互作用の符号と一致する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft38-fermi-operator -->
### 例：ミューオンの崩壊に必要な四つの場

**定義の確認**：$J_+$ の $-i\overline\nu_\mu\gamma^\mu P_L\mu$ と $J_-$ の $-i\overline e\gamma_\mu P_L\nu_e$ を選ぶと、積は

$$
(-i)^2(\overline\nu_\mu\gamma^\mu P_L\mu)
(\overline e\gamma_\mu P_L\nu_e)
=-(\overline\nu_\mu\gamma^\mu P_L\mu)
(\overline e\gamma_\mu P_L\nu_e).
$$

この項は $\mu^-$ を消滅させ、$e^-$ と $\nu_\mu$ と $\overline\nu_e$ を生成でき、全電荷は両辺とも $-1$ です。各双線形の質量次元は $3$、積の次元は $6$ です。外線が同一種類ではないため、同種終状態の対称因子 $1/2!$ は付きません。
<!-- definition-example-end -->

係数の符号と $\sqrt2$ を確かめるには、まず運動量微分を無視した $W$ の二次項と線形源だけを残すのが確実です。[QFT36の質量](../QFT36/index.md#thm-qft36-neutral-spectrum)は $m_W^2=g^2v^2/4$ でした。

<a id="thm-qft38-tree-matching"></a>

<!-- formal-statement-start -->
> **定理（木レベルのW消去とFermi係数）**
> $m_W>0$ とし、正準化した荷電 $W$ の質量項および[物理的な荷電電流](#def-qft38-charged-current)への結合をそれぞれ

$$
-m_W^2W_\mu^+W^{-\mu},
\qquad \frac{g}{\sqrt2}(W^+\!\cdot J_++W^-\!\cdot J_-)
$$

> とする。この理論で $|q^2|,m_f^2\ll m_W^2$ なら、木レベルの局所展開の先頭は

$$
\mathcal L_{\rm eff}^{(6)}=+\frac{g^2}{2m_W^2}J_{+\mu}J_-^\mu,
\qquad C_F=\frac{g^2}{2m_W^2}=\frac2{v^2}.
$$

> $J_\pm=-iB_\pm$ と書いた素のDirac双線形では

$$
\mathcal L_{\rm eff}^{(6)}=-g^2B_+\cdot B_-/(2m_W^2)
$$

> となる。微分を持つ次の補正は相対的に $O(q^2/m_W^2)$ の次数で、縦成分からは電流の発散に比例する質量抑制項も生じ得る。この等式は低エネルギーの木レベルmatchingであり、$W$ の極 $q^2=-m_W^2$ 付近では使えない。
<!-- formal-statement-end -->

### 証明の見取り図

複素共役な $W^+,W^-$ を独立な変分変数として扱い、それぞれの代数的運動方程式を解きます。質量項と二つの源項をすべて戻すと、一見二倍に見える源項が質量項と部分的に相殺し、物理電流には係数 $+g^2/(2m_W^2)$ が残ります。

<!-- proof-start -->
### 証明

$a=g/\sqrt2$ として、運動量微分のない部分は

$$
\mathcal L_W=-m_W^2W_\mu^+W^{-\mu}
+aW_\mu^+J_+^\mu+aW_\mu^-J_-^\mu.
$$

$W^+$ と $W^-$ による変分から

$$
-m_W^2W_\mu^-+aJ_{+\mu}=0,
\qquad -m_W^2W_\mu^++aJ_{-\mu}=0.
$$

したがって $W_\mu^-=aJ_{+\mu}/m_W^2$、$W_\mu^+=aJ_{-\mu}/m_W^2$ です。元の作用へ代入すると

$$
\begin{aligned}
\mathcal L_W\big|_{\rm EOM}
&=-\frac{a^2}{m_W^2}J_-\cdot J_+
+\frac{a^2}{m_W^2}J_-\cdot J_+
+\frac{a^2}{m_W^2}J_+\cdot J_-\\
&=+\frac{a^2}{m_W^2}J_+\cdot J_-
=+\frac{g^2}{2m_W^2}J_+\cdot J_-.
\end{aligned}
$$

二つの電流は Grassmann 偶の複合演算子なので、木レベルの局所演算子として順序を保った積が書けます。素の双線形に戻した $J_+\cdot J_-=(-i)^2B_+\cdot B_-=-B_+\cdot B_-$ も確認でき、従来と同じ $-C_FB_+\cdot B_-$ になります。さらに $m_W=gv/2$ を代入すると $g^2/(2m_W^2)=g^2/(2g^2v^2/4)=2/v^2$ です。

導関数を戻して確かめると、ユニタリーゲージの自由伝播関数は

$$
D_{\mu\nu}(q)=\frac{-i}{q^2+m_W^2-i0}
\left(\eta_{\mu\nu}+\frac{q_\mu q_\nu}{m_W^2}\right).
$$

分母の幾何級数は $1/(m_W^2+q^2)=m_W^{-2}(1-q^2/m_W^2+\cdots)$ であり、計量テンソルに比例する部分の先頭は代数的消去と一致します。縦成分の作用も確かめましょう。質量殻上の入射スピノル $u_i(p_i)$ から出射スピノル $u_f(p_f)$ への左電流で $q=p_i-p_f$ とすると、[自由Dirac平面波の方程式](../QFT7/index.md#def-qft7-plane-waves) $i\not p_i u_i=m_i u_i$、$\overline u_f i\not p_f=m_f\overline u_f$ と $\not pP_L=P_R\not p$ から

$$
q_\mu\overline u_f\gamma^\mu P_Lu_i
=\overline u_f(\not p_i-\not p_f)P_Lu_i
=-i\big(m_i\overline u_fP_Ru_i-m_f\overline u_fP_Lu_i\big).
$$

物理電流ではさらに $-i$ を掛けるので $q_\mu J^\mu=-(m_i\overline u_fP_Ru_i-m_f\overline u_fP_Lu_i)$ です。つまり電流の発散は外線質量に比例し、伝播関数の $q_\mu q_\nu/m_W^2$ による振幅補正は軽い外線に対して質量で抑制されます。$q^2$ が極 $-m_W^2$ へ近づけば幾何級数は収束せず、重い場を陽に扱う必要があります。
<!-- proof-end -->

ここでは高次の演算子をすべて零と置いたのではありません。低エネルギーの有限精度で、先頭の次元6項を取り出しました。[QFT26の演算子次元による分類](../QFT26/index.md#def-qft26-relevance)と同じ発想で、必要な精度に応じて高次項を加えます。

## 3. $G_F$、$V-A$、ミューオン崩壊

実験的な弱崩壊の強さは、上で得た $C_F$ より四分の一小さい慣用係数を使って表されます。原因は新しい相互作用ではなく、左射影 $P_L=(1-\gamma^5)/2$ と、左射影を使わない $V-A$ 電流との書き方の違いです。$V-A$ はベクトル電流から軸性ベクトル電流を差し引いた組合せを表し、ここでは $\gamma^\mu(1-\gamma^5)$ がその具体的な行列です。

<a id="def-qft38-fermi-constant"></a>

<!-- formal-statement-start -->
> **定義（Fermi定数とV-A規約）**
> [木レベルmatching](#thm-qft38-tree-matching)の係数に対して、質量次元 $-2$ のFermi定数 $G_F>0$ を

$$
\frac{G_F}{\sqrt2}=\frac{g^2}{8m_W^2}=\frac1{2v^2},
\qquad G_F=\frac1{\sqrt2v^2}
$$

> と定める。二つの $P_L$ 電流を $1-\gamma^5=2P_L$ で表せば、ミューオン崩壊の相互作用は

$$
\mathcal L_{\mu\rm -decay}
=-\frac{G_F}{\sqrt2}
(\overline\nu_\mu\gamma^\rho(1-\gamma^5)\mu)
(\overline e\gamma_\rho(1-\gamma^5)\nu_e)+\mathrm{h.c.}
$$

> と書ける（$\mathrm{h.c.}$ はHermitian共役）。$G_F$ と $v$ の等式は木レベルの関係であり、精密測定との対応には電弱放射補正の定義が必要である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft38-fermi-constant -->
### 例：射影子の二つの $1/2$ を検査する

**定義の確認**：[局所演算子](#def-qft38-fermi-operator)を**素のDirac双線形** $B_\pm=iJ_\pm$ で書いたとき、レプトン部分の係数は $-g^2/(2m_W^2)$ です。$\gamma^\mu P_L=\gamma^\mu(1-\gamma^5)/2$ を**各**双線形に適用すると

$$
-\frac{g^2}{2m_W^2}\times\frac12\times\frac12
=-\frac{g^2}{8m_W^2}=-\frac{G_F}{\sqrt2}.
$$

この二つの $1/2$ がFermi定数の係数にある $8$ の由来です。$v$ の値そのものをここで実験から算出したわけではありません。
<!-- definition-example-end -->

この局所相互作用を使って、初期ミューオンがどのスピン状態にあっても平均した崩壊率を求めます。終状態の電子、電子反ニュートリノ、ミューニュートリノを区別し、粒子の運動量を順に $p_e,p_{\bar\nu_e},p_{\nu_\mu}$、初期を $p$ とします。まず電子質量を零と近似し、三つの終状態の質量はすべて零とします。

<a id="thm-qft38-muon-spin-sum"></a>

<!-- formal-statement-start -->
> **定理（ミューオン崩壊のスピン平均振幅）**
> 質量 $m>0$ の非偏極 $\mu^-(p)$ の木レベル崩壊 $\mu^-\to e^-(p_e)+\bar\nu_e(p_{\bar\nu_e})+\nu_\mu(p_{\nu_\mu})$ を[ $V-A$ の局所相互作用](#def-qft38-fermi-constant)で記述し、終状態質量を零とする。すべての終状態スピンを足し初期二スピンを平均すると

$$
\overline{|\mathcal M|^2}=64G_F^2
(p\cdot p_{\bar\nu_e})(p_e\cdot p_{\nu_\mu}).
$$

> 式は反粒子のスピン和を含み、ニュートリノと反ニュートリノを取り違えてはならない。
<!-- formal-statement-end -->

### 証明の見取り図

振幅の各電流にDiracスピノルを挿入し、[QFT17のスピン和計算](../QFT17/index.md#thm-qft17-spin-average)と同様に二つのガンマ行列トレースへ変えます。左射影に対応する反対称トレースの項は捨てず、対称項と合わせると特定の二つの内積だけが残ります。

<!-- proof-start -->
### 証明

$1-\gamma^5=2P_L$ なので、振幅の全体係数の絶対値は $4G_F/\sqrt2$ です。ここから $u(k)$ は粒子、$v(k)$ は反粒子の外線スピノル、$\not k=\gamma^\mu k_\mu$ を表します。外線を挿入すると

$$
\mathcal M=\frac{4G_F}{\sqrt2}
[\overline u(p_{\nu_\mu})\gamma^\rho P_Lu(p)]
[\overline u(p_e)\gamma_\rho P_Lv(p_{\bar\nu_e})]
$$

です（全体符号は二乗に影響しません）。[QFT7の $(-+++)$ スピン和](../QFT7/index.md#thm-qft7-spin-sums) $\sum u(k)\overline u(k)=i\not k+m_k$、$\sum v(k)\overline v(k)=i\not k-m_k$ を用います。質量零のニュートリノには左カイラル粒子と対応する反粒子だけが物理的に存在しますが、両ヘリシティを形式的に足すDiracスピン和を使っても、各頂点の $P_L$ が不要な偏極を消すため物理的に存在しない状態は振幅へ寄与しません。初期スピンの平均を含む二乗は

$$
\begin{aligned}
\overline{|\mathcal M|^2}
&=\frac12\left(\frac{4G_F}{\sqrt2}\right)^2
\operatorname{tr}[(i\not p+m)\gamma^\sigma P_L
i\not p_{\nu_\mu}\gamma^\rho P_L]\\
&\qquad\times
\operatorname{tr}[i\not p_e\gamma_\rho P_L
i\not p_{\bar\nu_e}\gamma_\sigma P_L].
\end{aligned}
$$

ここで [左射影子](../QFT32/index.md#def-qft32-chirality)の $P_L^2=P_L$、$\{\gamma^5,\gamma^\rho\}=0$ を用いると、質量 $m$ だけを含む奇数個のガンマ行列のトレースは零です。**二つの跡はそれぞれ運動量スラッシュを二本含むため、スピン和由来の $i^2=-1$ が一回ずつ出ます。その積は $(-1)^2=1$** となり、最後の物理振幅には符号反転が残りません。反対称成分を落とさず縮約する手順を明示します。四元ベクトル $a,b$ に対し、$\varepsilon^{0123}=+1$ のLevi-Civita記号を用いて

$$
\begin{aligned}
S^{\mu\nu}(a,b)&=a^\mu b^\nu+a^\nu b^\mu-\eta^{\mu\nu}a\cdot b,\\
E^{\mu\nu}(a,b)&=\varepsilon^{\mu\nu\alpha\beta}a_\alpha b_\beta,\\
T^{\mu\nu}(a,b)&=\operatorname{tr}(\not a\gamma^\mu P_L\not b\gamma^\nu P_L)
=2\bigl(S^{\mu\nu}(a,b)-iE^{\mu\nu}(a,b)\bigr)
\end{aligned}
$$

と定めます。最後の式は[Clifford関係](../QFT7/index.md#def-qft7-clifford)からの四本のガンマ行列の跡 $\operatorname{tr}(\not a\gamma^\mu\not b\gamma^\nu)=4S^{\mu\nu}(a,b)$ と、同じ積に $\gamma^5$ を入れた跡を使ったものです。この $T$ は $i$ を掛ける**前**の行列積の跡で、上の二つのスピン和の跡はそれぞれ $-T$ です。$S$ は対称、$E$ は反対称なので交差積は消えます。$X=(p\cdot r)(k\cdot s)$、$Y=(p\cdot s)(k\cdot r)$ と置くと、計量で添字を下げて

$$
\begin{aligned}
S^{\sigma\rho}(p,k)S_{\rho\sigma}(r,s)&=2(X+Y),\\
(-iE^{\sigma\rho}(p,k))(-iE_{\rho\sigma}(r,s))&=2(Y-X),\\
T^{\sigma\rho}(p,k)T_{\rho\sigma}(r,s)&=4\{2(X+Y)+2(Y-X)\}=16Y.
\end{aligned}
$$

二行目では $\varepsilon^{\mu\nu\alpha\beta}\varepsilon_{\mu\nu\gamma\delta}=-2(\delta^\alpha_\gamma\delta^\beta_\delta-\delta^\alpha_\delta\delta^\beta_\gamma)$ と、二本目の跡の添字順が $\rho,\sigma$ であることを使いました。したがって、どの運動量を組にした内積が残るかまで計算で確定し、

$$
\operatorname{tr}[(i\not p+m)\gamma^\sigma P_Li\not k\gamma^\rho P_L]
\operatorname{tr}[i\not r\gamma_\rho P_Li\not s\gamma_\sigma P_L]
=16(p\cdot s)(k\cdot r).
$$

$k=p_{\nu_\mu},r=p_e,s=p_{\bar\nu_e}$ を入れます。振幅全体の二乗と初期二スピンの平均から生じる係数 $(1/2)(16G_F^2/2)=4G_F^2$ を掛けると $64G_F^2(p\cdot s)(r\cdot k)$ です。
<!-- proof-end -->

最後に三体位相空間を積分します。直接三つの運動量を同時に積分するより、電子とミューニュートリノを一つの系にまとめ、その不変質量で二体位相空間を二度使うと、積分の境界も明確になります。

<a id="thm-qft38-muon-width"></a>

<!-- formal-statement-start -->
> **定理（質量零・木レベルでのミューオン全崩壊率）**
> [スピン平均振幅](#thm-qft38-muon-spin-sum)と、$m_e=m_{\nu_e}=m_{\nu_\mu}=0$、非偏極初期ミューオン、三体終状態のLorentz不変位相空間を仮定する。このとき

$$
\Gamma_0(\mu^-\to e^-\bar\nu_e\nu_\mu)
=\frac{G_F^2m^5}{192\pi^3}.
$$

> この式は電子質量、QEDの実・仮想光子放射、電弱ループ補正を無視した先頭項である。
<!-- formal-statement-end -->

### 証明の見取り図

$s=-(p_e+p_{\nu_\mu})^2$ と置き、$p-p_{\bar\nu_e}=p_e+p_{\nu_\mu}$ から振幅を $s$ の多項式へ変換します。[QFT12の二体位相空間](../QFT12/index.md#prop-qft12-two-body-phase-space)を二度使って三体測度を因数分解すると、残るのは $0\le s\le m^2$ の一変数積分です。

<!-- proof-start -->
### 証明

質量殻条件 $p^2=-m^2$、$p_e^2=p_{\bar\nu_e}^2=p_{\nu_\mu}^2=0$ と運動量保存から

$$
s=-(p_e+p_{\nu_\mu})^2=-2p_e\cdot p_{\nu_\mu}
=-(p-p_{\bar\nu_e})^2=m^2+2p\cdot p_{\bar\nu_e}.
$$

従って $p\cdot p_{\bar\nu_e}=(s-m^2)/2$、$p_e\cdot p_{\nu_\mu}=-s/2$ と、両内積は未来向き粒子のため非正です。その積は正となり、[振幅の二乗](#thm-qft38-muon-spin-sum)は

$$
\overline{|\mathcal M|^2}
=64G_F^2\frac{s-m^2}{2}\frac{-s}{2}
=16G_F^2s(m^2-s).
$$

$Q=p_e+p_{\nu_\mu}$ と置くと、[不変位相空間の定義](../QFT12/index.md#def-qft12-phase-space)で $1=\int d^4Q\,\delta^{(4)}(Q-p_e-p_{\nu_\mu})$ と $1=\int ds\,\delta(s+Q^2)$ を挿入できます。$Q^0>0$ を満たす中間系を質量 $\sqrt s$ の粒子として扱い、二つの二体測度へ組み直すと、各運動量測度の $(2\pi)$ と不変質量デルタの規格化の差から $ds/(2\pi)$ が残り、

$$
d\Phi_3(p;p_{\bar\nu_e},p_e,p_{\nu_\mu})
=\frac{ds}{2\pi}\,
d\Phi_2(p;Q,p_{\bar\nu_e})\,
d\Phi_2(Q;p_e,p_{\nu_\mu})
$$

を得ます。二体角度を積分した位相空間は、[QFT12の角度公式](../QFT12/index.md#prop-qft12-two-body-phase-space)でそれぞれ

$$
\int d\Phi_2(p;Q,p_{\bar\nu_e})=\frac{m^2-s}{8\pi m^2},
\qquad
\int d\Phi_2(Q;p_e,p_{\nu_\mu})=\frac1{8\pi}
$$

です。$Q$ の質量は $\sqrt s$、残りは質量零なので $0\le s\le m^2$。振幅はこの $s$ だけの関数のため、二つの立体角積分をそのまま実行でき、

$$
\frac{d\Phi_3}{ds}
=\frac1{2\pi}\frac{m^2-s}{8\pi m^2}\frac1{8\pi}
=\frac{m^2-s}{128\pi^3m^2}
$$

となります。[S行列規格化からの崩壊率と断面積](../QFT12/index.md#thm-qft12-rate-formulas)により

$$
\begin{aligned}
\Gamma_0
&=\frac1{2m}\int_0^{m^2}\!ds\,
16G_F^2s(m^2-s)\frac{m^2-s}{128\pi^3m^2}\\
&=\frac{G_F^2}{16\pi^3m^3}\int_0^{m^2}\!s(m^2-s)^2\,ds.
\end{aligned}
$$

$z=s/m^2$ と置けば $ds=m^2dz$ で

$$
\int_0^{m^2}s(m^2-s)^2ds
=m^8\int_0^1z(1-z)^2dz
=m^8\left(\frac12-\frac23+\frac14\right)
=\frac{m^8}{12}.
$$

従って $\Gamma_0=G_F^2m^5/(192\pi^3)$ です。粒子種が異なるため最終状態の $1/n!$ は不要です。
<!-- proof-end -->

崩壊率の $m^5$ は次元解析からも確かめられます。$[G_F^2]=-4$、$[m^5]=5$ なので $[\Gamma]=1$ です。ただし**次元解析だけでは $192\pi^3$ は出ません**。この係数はスピン和、位相空間、初期状態規格化から生じます。寿命の先頭近似は $\tau_\mu=1/\Gamma_0$ であり、実測寿命と精密比較するには電子質量と放射補正を加えます。

## 4. クォークの弱崩壊と近似の境界

レプトン崩壊では色が現れませんが、クォーク崩壊では[CKM行列](../QFT37/index.md#def-qft37-ckm)の要素が遷移振幅に掛かります。$V_{ud}$ と $V_{us}$ の違いは、電弱頂点の世代回転の違いです。低エネルギーでは $W$ は同様に消去できますが、色を閉じ込める強相互作用まで消えたわけではありません。

<a id="prop-qft38-semileptonic"></a>

<!-- formal-statement-start -->
> **命題（半レプトン崩壊のCKM係数）**
> [質量基底の電流](#def-qft38-charged-current)と[木レベルmatching](#thm-qft38-tree-matching)のもとで、上型 $u_\alpha$、下型 $d_\beta$、荷電レプトン $\ell$ に対応する低エネルギー半レプトン項は

$$
\mathcal L_{\rm sl}
=-\frac{4G_F}{\sqrt2}V_{\alpha\beta}
(\overline u_\alpha\gamma^\rho P_Ld_\beta)
(\overline\ell\gamma_\rho P_L\nu_\ell)
+\mathrm{h.c.}
$$

> となる。自由クォーク間の木レベル振幅は $V_{\alpha\beta}$ に比例するが、ハドロンの崩壊率へ変えるにはクォーク電流のハドロン状態間行列要素が別途必要である。
<!-- formal-statement-end -->

### 証明の見取り図

$J_+$ から一つのクォーク電流、$J_-$ から一つのレプトン電流を選びます。二つは別の電流和に入っているので、同じ場を重複して数えることはありません。係数を $G_F$ に書き直せば主張になります。

<!-- proof-start -->
### 証明

[電流の定義](#def-qft38-charged-current)から

$$
J_+^\rho\supset-iV_{\alpha\beta}\overline u_\alpha\gamma^\rho P_Ld_\beta,
\qquad J_-^\rho\supset-i\overline\ell\gamma^\rho P_L\nu_\ell.
$$

積 $J_+\cdot J_-$ のこの交差項へ $+g^2/(2m_W^2)$ を掛けると、二つの $-i$ から $(-i)^2=-1$ が生じます。$4G_F/\sqrt2=g^2/(2m_W^2)$ より提示した負の係数になります。他方、Hermitian共役では $V_{\alpha\beta}^*$ となります。ハドロン $H_i,H_f$ を外線に取るときは

$$
\langle H_f|\overline u_\alpha\gamma^\rho P_Ld_\beta|H_i\rangle
$$

という、自由粒子のスピノル双線形とは異なる行列要素が必要です。この行列要素の形状因子や長距離QCDを $G_F$ と $V$ だけから決めることはできません。
<!-- proof-end -->

例えば核の $\beta^-$ 崩壊や中性子の崩壊 $n\to p+e^-+\bar\nu_e$ の弱頂点は $V_{ud}$ を含みます。しかし、その率は核・核子のベクトル／軸性電流の行列要素と、位相空間に依存します。自由な下型クォークが質量零の上型クォークに崩壊する模型の $m^5$ 公式を、中性子へそのまま代入してはいけません。

また[CKMのユニタリ性](../QFT37/index.md#thm-qft37-ckm-current)から $\sum_\beta|V_{\alpha\beta}|^2=1$ が成り立ちますが、各終状態の閾値・質量・ハドロン行列要素が異なるため、**測定する各部分崩壊率が等しい**という意味ではありません。

## 5. 演習：係数・射影・崩壊率を自力で再構成する

### 演習 QFT38-A1：荷電電流と共役のCKM因子

- Level: A
- 問題：$J_+$ の $u,d$ 項と電子項を書き、各双線形の電荷を確かめよ。$J_-$ の対応するCKM係数を求めよ。

<!-- solution-start -->
**詳細解答**：[荷電電流の定義](#def-qft38-charged-current)より $J_+^\rho\supset-i(V_{ud}\bar u\gamma^\rho P_Ld+\bar\nu_e\gamma^\rho P_Le)$。最初の電荷は $-2/3-1/3=-1$、後者は $0-1=-1$ です。共役では $J_-^\rho\supset-i(V_{ud}^*\bar d\gamma^\rho P_Lu+\bar e\gamma^\rho P_L\nu_e)$ となり、それぞれ電荷 $+1$ です。$(-i\bar u\gamma P_Ld)^\dagger=-i\bar d\gamma P_Lu$ を使い、$W^+$ と $J_+$、$W^-$ と $J_-$ の積だけが電荷中性になります。
<!-- solution-end -->

### 演習 QFT38-A2：重い複素場の代数的消去

- Level: A
- 問題：$M^2>0$、$a\in\mathbb R$ に対し $(-+++)$ での重い複素ベクトルの代数的な一成分模型 $\mathcal L=-M^2X^*X+a(XJ+X^*J^*)$ を考える。$X,X^*$ の停留条件を求め、代入後の $J^*J$ の係数を計算せよ。

<!-- solution-start -->
**詳細解答**：$\partial\mathcal L/\partial X^*=-M^2X+aJ^*=0$、$\partial\mathcal L/\partial X=-M^2X^*+aJ=0$ です。従って $X=aJ^*/M^2$、$X^*=aJ/M^2$。

代入すると質量項が $-a^2J^*J/M^2$、二つの源項の和が $+2a^2J^*J/M^2$ なので、$\mathcal L_{\rm eff}=+a^2J^*J/M^2$ です。[木レベルmatching](#thm-qft38-tree-matching)の物理電流 $J_\pm$ に対する正符号と一致します。

ただしこの模型の複素数の共役 $J^*$ と、Dirac随伴で定義する素の電流 $B_-$ は同一視できません。後者は $B_-=-(B_+)^\dagger$ なので、実際の電弱電流では $J_\pm=-iB_\pm$ の双方が成立し、その積が $J_+\cdot J_-=-B_+\cdot B_-$ になります。
<!-- solution-end -->

### 演習 QFT38-A3：$P_L$ から $V-A$ への係数

- Level: A
- 問題：$J_\pm=-iB_\pm$ を用いて物理電流での $+C_FJ_+\cdot J_-$ を素の双線形で書くと $-C_F(\bar\chi\gamma^\rho P_L\psi)(\bar\xi\gamma_\rho P_L\zeta)$ を含む。これを $1-\gamma^5$ で書け。$C_F=g^2/(2m_W^2)$ とすると係数はいくらか。

<!-- solution-start -->
**詳細解答**：$P_L=(1-\gamma^5)/2$ を両方に代入するので、係数は $-C_F/4=-g^2/(8m_W^2)$ です。具体的に

$$
-\frac{g^2}{8m_W^2}
(\bar\chi\gamma^\rho(1-\gamma^5)\psi)
(\bar\xi\gamma_\rho(1-\gamma^5)\zeta)
$$

となります。[Fermi定数](#def-qft38-fermi-constant)により $-G_F/\sqrt2$ と同じです。片側の射影子だけを $2$ 倍すると二倍の誤差が生じます。
<!-- solution-end -->

### 演習 QFT38-A4：質量次元と崩壊幅の次数

- Level: A
- 問題：$[\psi]=3/2$ として四フェルミオン演算子、$G_F$、$G_F^2m^5$ の質量次元を求めよ。

<!-- solution-start -->
**詳細解答**：双線形 $\bar\psi\gamma^\rho P_L\psi$ は $3/2+3/2=3$、その積は $6$ です。$[\mathcal L]=4$ なので $[G_F]=4-6=-2$。従って $[G_F^2m^5]=2(-2)+5=1$ です。崩壊幅は寿命の逆数で、自然単位系では質量次元1なので一致します。ただし無次元係数はこの議論からは出ません。
<!-- solution-end -->

### 演習 QFT38-A5：三体位相空間の積分領域

- Level: A
- 問題：$p^2=-m^2$、三つの質量零終状態が $p_e,p_a,p_b$ であるとき、$s=-(p_e+p_b)^2$ と $p\cdot p_a$ の関係と $s$ の許容範囲を求めよ。

<!-- solution-start -->
**詳細解答**：$p=p_e+p_a+p_b$ から $s=-(p-p_a)^2=m^2+2p\cdot p_a$ です。親粒子の静止系では $p\cdot p_a=-mE_a\le0$ より $s\le m^2$、一方 $s=-(p_e+p_b)^2=2E_eE_b(1-\cos\theta_{eb})\ge0$ です。従って $0\le s\le m^2$、また $p\cdot p_a=(s-m^2)/2$ です。[三体積分](#thm-qft38-muon-width)の境界が得られます。
<!-- solution-end -->

### 演習 QFT38-B1：有限運動量の補正と極

- Level: B
- 問題：保存電流間の $W$ 交換で縦成分が消えるとし、スカラー係数 $1/(m_W^2+q^2)$ を $q^2=0$ の近傍で二次まで展開せよ。$q^2=-m_W^2/10$ で先頭近似のずれを厳密値で割った割合を正確に求めよ。

<!-- solution-start -->
**詳細解答**：$z=q^2/m_W^2$ に対して $|z|<1$ なら幾何級数から

$$
\frac1{m_W^2+q^2}=\frac1{m_W^2}(1-z+z^2+O(z^3)).
$$

$z=-1/10$ では厳密係数は $10/(9m_W^2)$、先頭は $1/m_W^2$ です。厳密値を分母にしたずれの割合は $(10/9-1)/(10/9)=1/10$、すなわち10%です。**展開が収束すること**と**先頭項だけで高精度なこと**は別で、$z\to-1$ では極のため近似できません。[matchingの適用範囲](#thm-qft38-tree-matching)の検査です。
<!-- solution-end -->

### 演習 QFT38-B2：三体位相空間と $192\pi^3$

- Level: B
- 問題：$\overline{|\mathcal M|^2}=16G_F^2s(m^2-s)$、$d\Phi_3/ds=(m^2-s)/(128\pi^3m^2)$ が与えられたとする。[QFT12の崩壊率](../QFT12/index.md#thm-qft12-rate-formulas)を用い、$\Gamma_0$ を再導出せよ。

<!-- solution-start -->
**詳細解答**：初期粒子一個の規格化による $1/(2m)$ を掛け、$s$ は質量零終状態の不変質量二乗なので $0\le s\le m^2$ です。したがって

$$
\begin{aligned}
\Gamma_0&=\frac1{2m}\int_0^{m^2}ds\,
16G_F^2s(m^2-s)\frac{m^2-s}{128\pi^3m^2}\\
&=\frac{G_F^2m^5}{16\pi^3}\int_0^1z(1-z)^2dz
=\frac{G_F^2m^5}{16\pi^3}\frac1{12}
=\frac{G_F^2m^5}{192\pi^3}.
\end{aligned}
$$

ここでは $s=m^2z$、$ds=m^2dz$、$\int_0^1(z-2z^2+z^3)dz=1/2-2/3+1/4=1/12$ を使いました。$1/(2m)$ と $1/(2\pi)$ を取り落とすと係数が変わります。
<!-- solution-end -->

### 演習 QFT38-B3：CKMのユニタリ性と閾値

- Level: B
- 問題：三世代の $V$ がユニタリであるとする。ある上型世代 $\alpha$ に対し $\sum_\beta|V_{\alpha\beta}|^2$ を求めよ。その値が実際に許された半レプトン崩壊チャネルの相対率の和と一致するとは限らない理由を二つ挙げよ。

<!-- solution-start -->
**詳細解答**：[QFT37のCKMユニタリ性](../QFT37/index.md#thm-qft37-ckm-current)から

$$
\sum_\beta|V_{\alpha\beta}|^2
=(VV^\dagger)_{\alpha\alpha}=1.
$$

しかし重い終状態が運動学的に禁止されれば、実現するチャネルの和にはその成分が含まれません。またハドロンの遷移には $\langle H_f|\bar u_\alpha\gamma^\rho P_Ld_\beta|H_i\rangle$ の形状因子とQCDの影響が入り、単に $|V_{\alpha\beta}|^2$ だけでは部分率を比較できません。[半レプトンの命題](#prop-qft38-semileptonic)は弱頂点係数の主張です。
<!-- solution-end -->

### 演習 QFT38-B4：射影とヘリシティ抑制の入口

- Level: B
- 問題：質量零の左カイラル外線 $u_L$ に対し $P_Lu_L=u_L$、右カイラル $u_R$ に対し $P_Lu_R=0$ とする。右カイラルだけを持つ仮想外線を左荷電電流へ挿入した場合の振幅を調べ、質量のある外線の場合への注意を述べよ。

<!-- solution-start -->
**詳細解答**：電流の外線因子は $\bar u'\gamma^\rho P_Lu$ であり、$u=u_R$ なら $P_Lu_R=0$ なのでこの頂点の振幅は零です。一方 $u=u_L$ なら $P_Lu_L=u_L$ なので射影による消滅は起きません。ただし別の運動学的理由で零になることはあります。[QFT32のカイラリティとヘリシティの区別](../QFT32/index.md#def-qft32-chirality)によれば、質量のあるDirac粒子の固定ヘリシティ状態は一般にカイラリティの固有状態ではなく、$P_Lu_h$ が厳密に零とは限りません。従って「右ヘリシティは常に弱崩壊に寄与しない」とは言えません。
<!-- solution-end -->

### 演習 QFT38-C1：電弱理論からミューオン寿命とクォーク遷移まで

- Level: C
- 問題：$m_W=gv/2$、$\mathcal L_{\rm cc}=g(W^+\cdot J_++W^-\cdot J_-)/\sqrt2$、$J_\pm=-iB_\pm$、$|q^2|\ll m_W^2$ とする。計量 $(-+++)$ の正準ベクトル質量項 $-m_W^2W^+\cdot W^-$ を用いて次を順に検算せよ。
  1. $W$ の代数的運動方程式から低エネルギー四フェルミオン係数を求める。
  2. $V-A$ 規約での $G_F$ と $v$ の関係を導く。
  3. 質量零三体崩壊で $s=-(p_e+p_{\nu_\mu})^2$ を選び、スピン平均振幅と積分済み位相空間の式から $\Gamma_0$ を求める。
  4. $d\to u e^-\bar\nu_e$ に現れるCKM要素を特定し、自由クォークと中性子を同じ式で扱えない理由を述べる。

<!-- solution-start -->
**詳細解答**：

1. $a=g/\sqrt2$ とし $\mathcal L_W=-m_W^2W^+\cdot W^-+a(W^+\cdot J_++W^-\cdot J_-)$ を変分します。$W^-=aJ_+/m_W^2$、$W^+=aJ_-/m_W^2$ なので、代入して $-a^2/m_W^2+2a^2/m_W^2=+a^2/m_W^2$ が残ります。すなわち $\mathcal L_F=+g^2J_+\cdot J_-/(2m_W^2)=-g^2B_+\cdot B_-/(2m_W^2)$ です。
2. 一つの電流の $P_L$ から $1/2$、もう一つから $1/2$ を取り出し、$G_F/\sqrt2=g^2/(8m_W^2)=1/(2v^2)$。よって $G_F=1/(\sqrt2v^2)$ です。
3. [スピン平均の定理](#thm-qft38-muon-spin-sum)により $\overline{|\mathcal M|^2}=64G_F^2(p\cdot p_{\bar\nu_e})(p_e\cdot p_{\nu_\mu})$。$s=-2p_e\cdot p_{\nu_\mu}=m^2+2p\cdot p_{\bar\nu_e}$ を代入すると、二つの負の内積の積から $16G_F^2s(m^2-s)$。角度積分済みの[三体測度](#thm-qft38-muon-width)は $(m^2-s)/(128\pi^3m^2)$ なので

$$
\begin{aligned}
\Gamma_0
&=\frac1{2m}\int_0^{m^2}\frac{16G_F^2s(m^2-s)^2}{128\pi^3m^2}\,ds\\
&=\frac{G_F^2m^5}{16\pi^3}\int_0^1z(1-z)^2dz
=\frac{G_F^2m^5}{192\pi^3}.
\end{aligned}
$$

4. $J_+$ の $-iV_{ud}\bar u\gamma^\rho P_Ld$ と $J_-$ の $-i\bar e\gamma_\rho P_L\nu_e$ を選ぶので、物理電流の積の $+4G_F/\sqrt2$ と $(-i)^2=-1$ から、素の双線形の係数は $-4G_FV_{ud}/\sqrt2$ です。中性子の $n\to p$ では $\langle p|\bar u\gamma^\rho P_Ld|n\rangle$ という強相互作用を含む核子行列要素が必要で、自由な場のスピノル積と同一ではありません。電子質量・位相空間・放射補正も異なります。
<!-- solution-end -->

## 6. まとめと次の問い

重い $W$ の交換は $|q^2|\ll m_W^2$ では次元6の四フェルミオン相互作用に縮約でき、木レベルで $G_F=1/(\sqrt2v^2)$ です。この一つの係数から、$V-A$ のカイラリティ、ミューオン崩壊の $G_F^2m^5$ と $192\pi^3$、半レプトン過程のCKM係数までつながりました。

しかし弱崩壊の低エネルギー計算だけでは、古典的なカイラル電流が量子補正後も必ず保存するか、あるいは電弱理論のカイラルなフェルミオン内容が量子論として矛盾なく成立するかは決まりません。次はカイラル対称性と量子異常を、保存則と正則化の関係から調べます。
