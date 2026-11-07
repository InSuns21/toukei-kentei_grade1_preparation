# ITD6 測定・フィードバック・消去を閉じる全装置の循環収支

[ITD4の情報付き仕事上限](../ITD4/index.md#thm-itd4-feedback-work-bound)では系への仕事だけを数え、[ITD5のLandauer下限](../ITD5/index.md#cor-itd5-landauer)では記憶への仕事を数えました。この二つを単純に引き算してよいでしょうか。測定時に記憶へ渡った情報、測定自体の仕事、最後に残る相関を無視すると、答えを間違えます。

本章の問いは、**悪魔が同じ装置をもう一度使える状態に戻したとき、外部仕事源と熱浴まで含めて何が残るか**です。系と記憶の確率を一つの表で扱い、仕事を測定・フィードバック・消去の各段階へ割り付けます。

有限集合 $X,M$、単一の平衡熱浴 $T>0$、$k_{\mathrm B}>0$、$\beta=(k_{\mathrm B}T)^{-1}$ を用います。$\log$ は自然対数、$0\log0=0$ です。仕事 $W$ は外部仕事源が系と記憶へ**した**仕事、熱 $Q$ は浴から系と記憶へ**入った**熱を正とします。浴への放熱は $Q_{\mathrm{bath}}=-Q$ です。[ITD1の軌道第一法則](../ITD1/index.md#thm-itd1-first-law)を平均すると $\Delta U=\langle W\rangle+\langle Q\rangle$ です。

## 1. 系と記憶を一つの確率分布で扱う

系の状態を $x\in X$、記憶の状態を $m\in M$ とし、結合確率を $p(x,m)$ と書きます。周辺確率は

$$
p_X(x)=\sum_m p(x,m),\qquad
p_M(m)=\sum_x p(x,m).
$$

結合分布の不確かさは $H(X,M)=-\sum_{x,m}p(x,m)\log p(x,m)$ です。周辺エントロピーを $H(X),H(M)$ と書きます。相互情報量は[ITD4の測定情報量平均](../ITD4/index.md#prop-itd4-information-average)と同じnat単位で

$$
I(X;M)=\sum_{p(x,m)>0}p(x,m)
\log\frac{p(x,m)}{p_X(x)p_M(m)}
=H(X)+H(M)-H(X,M)
$$

です。分母は和に現れる正確率の項では正です。この和は[INFO2の相互情報量の相対エントロピー表示](../../../応用系/INFO/INFO2/index.md#thm-info2-mutual-kl)を自然対数に換算した $D_{\mathrm{nat}}(p_{XM}\Vert p_Xp_M)$ です。[Gibbs不等式の等号条件](../../../応用系/INFO/INFO2/index.md#thm-info2-gibbs)により、$I=0$ は独立分布 $p=p_Xp_M$ と同値です。

操作の各時点では系・記憶・熱浴・外部仕事源を区別します。系と記憶を収支の対象とし、浴は一定温度の熱源、外部仕事源は準位制御に伴うエネルギーの受け渡し先です。測定器や制御器の別の可動部分が初期状態へ戻らないなら、さらに装置として計上しなければなりません。

<a id="def-itd6-joint-cycle"></a>

<!-- formal-statement-start -->
> **定義（結合装置の操作と循環）**
> 有限集合 $X,M$ 上の結合分布 $p_i(x,m)$ と $p_f(x,m)$ を取り、時点 $i,f$ では相互作用エネルギーを零とし、全エネルギーを $E_X(x)+E_M(m)$ とする。途中では系と記憶の相互作用・条件付き準位制御を許すが、全ての準位操作の仕事と熱浴接触の熱を系・記憶の結合装置へ計上し、熱浴接触は単一温度 $T$ の局所詳細釣合いを満たすものとする。
>
> **完全な装置循環**とは、結合分布と始終のエネルギー関数が一致し、別の制御器も初期状態へ復帰した操作をいう。系だけの周辺分布が元へ戻ること、あるいは両周辺が元へ戻ることだけでは完全循環と呼ばない。浴と仕事源は交換した熱・仕事を蓄積し得るため、微視的な初期状態へ戻る必要はない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-itd6-joint-cycle -->
### 例：同じ周辺分布でも同じ装置状態ではない

$X=M=\{0,1\}$ とし、行を $x$、列を $m$ とした結合確率表を比較します。

$$
p_{\mathrm{ind}}=
\begin{pmatrix}1/4&1/4\\1/4&1/4\end{pmatrix},
\qquad
p_{\mathrm{corr}}=
\begin{pmatrix}1/2&0\\0&1/2\end{pmatrix}.
$$

**定義の確認**：各行列の成分は非負で合計が1、行和と列和は全て $1/2$ です。しかし前者は各成分が周辺確率の積 $1/4$ に等しく独立で、後者は $p(0,0)=1/2\ne1/4$ です。したがって周辺分布を変えずに前者から後者へ移した操作は、結合分布を戻していないので完全循環ではありません。
<!-- definition-example-end -->

## 2. 情報を結合自由エネルギーの中に戻す

始終で相互作用エネルギーが零のとき、内部エネルギーは周辺だけで決まります。しかしエントロピーは結合分布で決まります。この違いが相互情報量の項を作ります。

<a id="prop-itd6-joint-free-energy"></a>

<!-- formal-statement-start -->
> **命題（結合自由エネルギーの相互情報量分解）**
> 有限集合 $X,M$ の結合分布 $p$ と、相互作用項のない有限エネルギー $E(x,m)=E_X(x)+E_M(m)$、温度 $T>0$ に対し、

$$
\mathcal F_{XM}[p]
=\mathcal F_X[p_X]+\mathcal F_M[p_M]+k_{\mathrm B}TI(X;M)
$$

> が成立する。ここで各 $\mathcal F$ は平均エネルギーから $k_{\mathrm B}T$ とnatエントロピーの積を引いた非平衡自由エネルギーである。
<!-- formal-statement-end -->

### 証明の見取り図

平均エネルギーは二つの周辺へ分け、情報の寄与は結合エントロピーと周辺エントロピーの差から取り出します。

<!-- proof-start -->
### 証明

有限和なので順序交換ができ、まず

$$
\begin{aligned}
U_{XM}
&=\sum_{x,m}p(x,m)\{E_X(x)+E_M(m)\}\\
&=\sum_xp_X(x)E_X(x)+\sum_mp_M(m)E_M(m)
=U_X+U_M.
\end{aligned}
$$

上の相互情報量の式を整理して

$$
H(X,M)=H(X)+H(M)-I(X;M)
$$

を代入します。[ITD3で定めた非平衡自由エネルギー](../ITD3/index.md#def-itd3-noneq-free-energy)は平均エネルギーから $k_{\mathrm B}T$ とエントロピーの積を引く量なので、

$$
\begin{aligned}
\mathcal F_{XM}
&=U_X+U_M-k_{\mathrm B}TH(X,M)\\
&=\{U_X-k_{\mathrm B}TH(X)\}
 +\{U_M-k_{\mathrm B}TH(M)\}+k_{\mathrm B}TI\\
&=\mathcal F_X+\mathcal F_M+k_{\mathrm B}TI.
\end{aligned}
$$

相互作用が始終に残る場合には、その平均相互作用エネルギーも別途必要です。
<!-- proof-end -->

装置のエントロピー生成は、結合系のエントロピー変化と浴のエントロピー変化を足して定めます。温度が一定の浴へ平均 $Q_{\mathrm{bath}}$ を渡せば、浴の平均エントロピー変化は $Q_{\mathrm{bath}}/T$ です。情報量を温度の係数へ押し込めるのではなく、系・記憶と浴の二つを式に残します。

<a id="thm-itd6-joint-balance"></a>

<!-- formal-statement-start -->
> **定理（結合装置の仕事とエントロピー生成の収支）**
> [結合装置の操作](#def-itd6-joint-cycle)について、有限の準位変更と単一熱浴への局所詳細釣合いを満たす接触からなる過程を取り、始終の相互作用エネルギーを零とする。$\Delta$ を終値から始値を引く差とし、平均全エントロピー生成を

$$
\Sigma_{\mathrm{tot}}
=\Delta H(X,M)+\beta\langle Q_{\mathrm{bath}}\rangle
$$

> と無次元で定める。このとき

$$
\begin{aligned}
k_{\mathrm B}T\Sigma_{\mathrm{tot}}
&=\langle W\rangle-\Delta\mathcal F_{XM}\ge0,\\
\Delta\mathcal F_{XM}
&=\Delta\mathcal F_X+\Delta\mathcal F_M
+k_{\mathrm B}T\Delta I(X;M).
\end{aligned}
$$

> 特に完全な装置循環では $\langle W_{\mathrm{cycle}}\rangle\ge0$ であり、$\langle Q_{\mathrm{bath,cycle}}\rangle=\langle W_{\mathrm{cycle}}\rangle\ge0$ となる。等号は全過程の平均エントロピー生成が零の場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

[ITD3の平均仕事下限](../ITD3/index.md#thm-itd3-work-bound)を結合した有限状態系へ適用します。第一法則で仕事を浴への放熱と内部エネルギー変化に分けると、エントロピー生成と同一式になります。

<!-- proof-start -->
### 証明

有限集合 $X\times M$ も有限状態空間です。相互作用がある中間時点ではそのエネルギーを含めて準位変更を数え、各浴接触は局所詳細釣合いを満たします。したがって[ITD3の平均仕事下限](../ITD3/index.md#thm-itd3-work-bound)を結合装置へ適用でき、

$$
\langle W\rangle-\Delta\mathcal F_{XM}\ge0
$$

です。$\mathcal F_{XM}=U_{XM}-k_{\mathrm B}TH(X,M)$ を展開し、[ITD1の第一法則](../ITD1/index.md#thm-itd1-first-law)による $\langle W\rangle-\Delta U_{XM}=\langle Q_{\mathrm{bath}}\rangle$ を代入すると

$$
\begin{aligned}
\langle W\rangle-\Delta\mathcal F_{XM}
&=\langle W\rangle-\Delta U_{XM}
  +k_{\mathrm B}T\Delta H(X,M)\\
&=\langle Q_{\mathrm{bath}}\rangle
  +k_{\mathrm B}T\Delta H(X,M)\\
&=k_{\mathrm B}T\Sigma_{\mathrm{tot}}.
\end{aligned}
$$

始終で相互作用が零なので[結合自由エネルギーの分解](#prop-itd6-joint-free-energy)を両端へ使い、第二式を得ます。完全循環なら結合分布・準位が同じだから $\Delta\mathcal F_{XM}=\Delta U_{XM}=0$。このとき先の第一法則の式は $\langle Q_{\mathrm{bath}}\rangle=\langle W\rangle$ になり、いずれも非負です。等号は上の恒等式で $\Sigma_{\mathrm{tot}}=0$ と同値です。
<!-- proof-end -->

ここで「全装置」とは、操作中に仕事を受け渡す系と記憶、復帰する制御器を漏らさないという意味です。巨大な熱浴も元の微視状態へ完全に戻る、とする誤った循環条件ではありません。系と記憶の終端で相関が残れば、周辺量が元に戻っても $\Delta I$ の帳簿を消せません。

## 3. 雑音センサーで一周する二値の悪魔

両準位が零の $X=M=\{0,1\}$ を考え、最初は $X$ が一様、記憶 $M=0$ が確定とします。測定結果を $m$ に保存する際、真の $x$ を確率 $1-\varepsilon$ で正しく書き、確率 $\varepsilon$ で反転する二値対称チャネルを使います。ここでは $0<\varepsilon<1/2$ とし、端点は後で極限として扱います。

測定後の確率表は

$$
p_1(x,m)=
\frac12\begin{pmatrix}
1-\varepsilon&\varepsilon\\
\varepsilon&1-\varepsilon
\end{pmatrix}.
$$

行和・列和はいずれも一様です。記憶の結果 $m$ が与えられたとき、$X=m$ の条件付き確率は $1-\varepsilon$、不一致は $\varepsilon$ です。[ITD4の二値対称測定](../ITD4/index.md#prop-itd4-binary-channel)の相互情報量を $I_\varepsilon=\log2-h(\varepsilon)$ と書きます。$h$ は[ITD5の二値エントロピー](../ITD5/index.md#def-itd5-memory-entropy)です。

次の3段階を**始終でともに零準位**になる操作として考えます。

1. **測定**：$p_0(x,m)=\tfrac12\mathbf1_{\{m=0\}}$ から上の $p_1$ へ移る。記憶の初期化がすでに済んでいる状態から始める。
2. **条件付き抽出**：結果 $m$ を固定して $X$ の準位を操作し、各 $m$ において $X$ を一様へ戻す。終点は $p_2(x,m)=1/4$ で、相関が消える。
3. **記憶reset**：独立な一様記憶を無誤差で0へ戻し、$p_3=p_0$ とする。有限準位での厳密resetでなく、必要に応じて誤り率を0へ近づける理想極限として読む。

以下、$H(p_j)=-\sum_{x,m}p_j(x,m)\log p_j(x,m)$ は段階境界 $j=0,1,2,3$ における結合エントロピー $H(X,M)$ を意味します。

<a id="thm-itd6-binary-cycle"></a>

<!-- formal-statement-start -->
> **定理（二値測定・抽出・記憶初期化の全循環下限）**
> 単一温度 $T>0$、二状態の系と記憶、始終で零の準位、上記 $0<\varepsilon<1/2$ の結合分布 $p_0,p_1,p_2,p_3$ を仮定する。各段階は局所詳細釣合いを満たす結合装置の操作で、別の制御器は最後に初期状態へ戻り、段階境界に相互作用エネルギーを残さないとする。このとき各段階の平均仕事は

$$
\begin{aligned}
\langle W_{\mathrm{meas}}\rangle&\ge-k_{\mathrm B}T\,h(\varepsilon),\\
\langle W_{\mathrm{fb}}\rangle&\ge-k_{\mathrm B}T\,I_\varepsilon,\\
\langle W_{\mathrm{reset}}\rangle&\ge k_{\mathrm B}T\log2.
\end{aligned}
$$

> 総和は $\langle W_{\mathrm{cycle}}\rangle\ge0$、$\langle Q_{\mathrm{bath,cycle}}\rangle=\langle W_{\mathrm{cycle}}\rangle$ である。各段階の等号成立は、定めた準位制御と熱浴接触で可逆極限が実現できる場合に限る。仕事ゼロの測定を仮定していない。
<!-- formal-statement-end -->

### 証明の見取り図

3段階の結合エントロピーを出してから、[結合装置の仕事下限](#thm-itd6-joint-balance)へそれぞれ代入します。記憶のresetだけにLandauerの下限を適用して、測定にも同じ費用を二重計上しないようにします。

<!-- proof-start -->
### 証明

初期は $H(X)=\log2$、$H(M)=0$、$I=0$ なので $H(p_0)=\log2$ です。測定後は $p_1(x,m)=p_X(x)p(m\mid x)$ より

$$
\begin{aligned}
H(p_1)
&=-\sum_x\frac12\log\frac12
  -\sum_x\frac12\sum_m p(m\mid x)\log p(m\mid x)\\
&=\log2+h(\varepsilon).
\end{aligned}
$$

フィードバック後は独立一様なので $H(p_2)=2\log2$。reset後は $H(p_3)=\log2$ です。全ての段階境界で全準位が零なので $U_j=0$、$\mathcal F_j=-k_{\mathrm B}TH(p_j)$ となります。各段階に[結合装置の仕事下限](#thm-itd6-joint-balance)を適用するため、まず

$$
\begin{aligned}
\Delta\mathcal F_{\mathrm{meas}}
&=-k_{\mathrm B}T\{H(p_1)-H(p_0)\}
 =-k_{\mathrm B}Th(\varepsilon),\\
\Delta\mathcal F_{\mathrm{fb}}
&=-k_{\mathrm B}T\{H(p_2)-H(p_1)\}
 =-k_{\mathrm B}T\{\log2-h(\varepsilon)\},\\
\Delta\mathcal F_{\mathrm{reset}}
&=-k_{\mathrm B}T\{H(p_3)-H(p_2)\}
 =k_{\mathrm B}T\log2.
\end{aligned}
$$

各段階の仕事がそれぞれの自由エネルギー差以上です。足すと

$$
\begin{aligned}
\langle W_{\mathrm{cycle}}\rangle
&\ge k_{\mathrm B}T\{-h(\varepsilon)
  -[\log2-h(\varepsilon)]+\log2\}\\
&=0.
\end{aligned}
$$

$p_3=p_0$ と零準位から $\Delta U_{\mathrm{cycle}}=0$。第一法則より浴の熱は全仕事に等しくなります。各段階での余剰仕事は $k_{\mathrm B}T\Sigma_j\ge0$ なので、総仕事の等号には全段階の $\Sigma_j=0$ が必要です。
<!-- proof-end -->

この例の情報とエネルギーの帳簿をまとめます。表の仕事は**下限**であり、実際の機械が常にその値で動くとは限りません。各境界で $U=0$ なので、各段階についても $Q_{\mathrm{bath}}=W$ です。

| 境界 | $H(X)$ | $H(M)$ | $I(X;M)$ | $H(X,M)$ |
| --- | ---: | ---: | ---: | ---: |
| 初期 $p_0$ | $\log2$ | $0$ | $0$ | $\log2$ |
| 測定後 $p_1$ | $\log2$ | $\log2$ | $I_\varepsilon$ | $\log2+h(\varepsilon)$ |
| 抽出後 $p_2$ | $\log2$ | $\log2$ | $0$ | $2\log2$ |
| reset後 $p_3$ | $\log2$ | $0$ | $0$ | $\log2$ |

仕事と熱はエネルギー単位、表のエントロピーはnat単位です。特に測定段階の情報増分は $\Delta I=I_\varepsilon$ ですが、記憶のエントロピーも $\log2$ 増えます。[結合自由エネルギーの分解](#prop-itd6-joint-free-energy)を用いれば

$$
\Delta\mathcal F_{\mathrm{meas}}
=-k_{\mathrm B}T\log2+k_{\mathrm B}TI_\varepsilon
=-k_{\mathrm B}Th(\varepsilon).
$$

したがって「情報が $I_\varepsilon$ 増えたから測定費用は $+k_{\mathrm B}TI_\varepsilon$」という即断はできません。

## 4. 可逆測定と「仕事ゼロ」の測定は別物

測定後の結合表が同じでも、そこへ至る操作の散逸は違い得ます。$0<\varepsilon<1/2$ に対し、状態が誤った記憶値となる確率を $\varepsilon$ にするための準位差を

$$
\Delta_\varepsilon=k_{\mathrm B}T\log\frac{1-\varepsilon}{\varepsilon}>0
$$

と書きます。真の $x$ と一致する記憶の準位を0、不一致の準位を $\Delta_\varepsilon$ にすれば、熱平衡で不一致が生じる確率は

$$
\frac{e^{-\beta\Delta_\varepsilon}}{1+e^{-\beta\Delta_\varepsilon}}
=\frac{\varepsilon/(1-\varepsilon)}
{1+\varepsilon/(1-\varepsilon)}=\varepsilon
$$

です。**この準位操作を、実際の確率分布と照らして設計する**ことが仕事の計算の出発点です。

<a id="prop-itd6-measurement-protocols"></a>

<!-- formal-statement-start -->
> **命題（二値測定の可逆極限と不可逆な雑音付加）**
> [二値の全循環模型](#thm-itd6-binary-cycle)の初期結合分布 $p_0$ と測定後分布 $p_1$、$0<\varepsilon<1/2$、単一温度 $T>0$、始終で零の準位を用いる。$x$ に条件付けた記憶準位の制御と、単一浴への接触を許すとき、測定仕事の下限 $-k_{\mathrm B}Th(\varepsilon)$ へ近づく可逆な操作列が存在する。一方、可逆な二値コピーの後に等準位の記憶だけを対称に雑音化する操作では、測定仕事・熱はともに零で、平均エントロピー生成は $h(\varepsilon)>0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

前者は記憶の不要な準位を高くして熱平衡の偏りを用意し、準静的に下げてから元へ戻します。後者は記憶の準位を変えない熱浴接触で雑音を入れるので仕事も熱も零ですが、相関の劣化に伴うエントロピー増加が残ります。

<!-- proof-start -->
### 証明

まず条件付きの可逆コピー $(x,0)\mapsto(x,x)$ を考えます。これは $X\times M$ 全体では $(x,m)\mapsto(x,m\oplus x)$ という一対一の置換であり、零準位で行える理想操作として仕事・熱は零です。コピー後は $m=x$ が確定しています。

各 $x$ について、不一致の記憶準位だけを0から大きな $L>\Delta_\varepsilon$ へ瞬間的に上げます。まだ不一致の確率は0なので、この準位変更の仕事は0です。温度 $T$ の浴と接触させて準位差 $L$ の平衡分布へ近づけ、次に差を $L$ から $\Delta_\varepsilon$ まで準静的に下げます。

分配関数を $Z(d)=1+e^{-\beta d}$ と置くと、$x$ を固定した一致・不一致順の平衡分布は

$$
\pi_L=\left(\frac1{Z(L)},\frac{e^{-\beta L}}{Z(L)}\right),
\qquad q_L=\pi_L(m\ne x)=\frac{e^{-\beta L}}{Z(L)}
$$

です。最初の浴接触では準位を固定するので仕事は零、内部エネルギーは $Lq_L$ 増え、浴への放熱は $-Lq_L$ です。結合エントロピーは $h(q_L)$ 増えるため、[全エントロピー生成の収支](#thm-itd6-joint-balance)と $1-q_L=1/Z(L)$、$\log q_L=-\beta L-\log Z(L)$ を使うと

$$
\begin{aligned}
\Sigma_{\mathrm{contact}}(L)
&=h(q_L)-\beta Lq_L\\
&=\log Z(L)+\beta Lq_L-\beta Lq_L\\
&=\log Z(L)\longrightarrow0 \qquad(L\to\infty).
\end{aligned}
$$

有限な $L$ での初回接触には正の散逸がありますが、$L\to\infty$ でそれが消えることを確認できました。

この $Z(d)$ に[SM3の平衡自由エネルギー](../../SM/SM3/index.md#def-sm3-free-energy)を適用すると $F_{\mathrm{eq}}(d)=-k_{\mathrm B}T\log Z(d)$ です。ここで $d$ は不一致状態の準位差、プライムは $d$ による微分であり、時間微分ではありません。$x$ を固定した条件付き分布の不一致確率を $\pi_d(m\ne x)$ と書けば

$$
F_{\mathrm{eq}}'(d)
=-k_{\mathrm B}T\frac{-\beta e^{-\beta d}}{1+e^{-\beta d}}
=\pi_d(m\ne x).
$$

したがって、[ITD5の準静的仕事の計算](../ITD5/index.md#prop-itd5-quasistatic-reset)と同じく、準位差 $u$ を $L$ から $\Delta_\varepsilon$ へ下げる平均仕事は

$$
\begin{aligned}
W_{\mathrm{slow}}(L)
&=\int_L^{\Delta_\varepsilon}\pi_u(m\ne x)\,du
=F_{\mathrm{eq}}(\Delta_\varepsilon)-F_{\mathrm{eq}}(L)\\
&=-k_{\mathrm B}T\log Z(\Delta_\varepsilon)
 +k_{\mathrm B}T\log Z(L).
\end{aligned}
$$

終端の不一致確率が $\varepsilon$ になったら、差を $\Delta_\varepsilon$ から0へ瞬間的に戻します。状態は変えないので、その仕事は $-\varepsilon\Delta_\varepsilon$ です。$L\to\infty$ で $Z(L)\to1$、$Z(\Delta_\varepsilon)=1/(1-\varepsilon)$ より

$$
\begin{aligned}
\lim_{L\to\infty}W_{\mathrm{meas}}
&=k_{\mathrm B}T\log(1-\varepsilon)
  -\varepsilon k_{\mathrm B}T
       \log\frac{1-\varepsilon}{\varepsilon}\\
&=k_{\mathrm B}T\{
  (1-\varepsilon)\log(1-\varepsilon)
  +\varepsilon\log\varepsilon\}\\
&=-k_{\mathrm B}T h(\varepsilon).
\end{aligned}
$$

これは有限時間・有限準位での完全な可逆性ではなく、平衡接触と準静的操作の極限です。条件付き制御器が別にあるならその復帰も収支に含めます。

次に同じ可逆コピーの後、記憶の両準位を0のまま対称ジャンプ率 $r>0$ の熱浴へ接触させます。[ITD1の遷移率の模型](../ITD1/index.md#def-itd1-controlled-model)で各状態の反転率が等しいので局所詳細釣合いを満たします。時間 $t$ における反転確率 $e(t)$ は

$$
\frac{de}{dt}=r(1-e)-re=r-2re,\qquad e(0)=0
$$

を満たします。積分因子 $e^{2rt}$ を掛け、初期値 $e(0)=0$ を使って積分すると

$$
\begin{aligned}
\frac{d}{dt}\{e^{2rt}e(t)\}&=re^{2rt},\\
e^{2rt}e(t)&=\int_0^t re^{2rs}\,ds
=\frac{e^{2rt}-1}{2},\\
e(t)&=\frac{1-e^{-2rt}}2.
\end{aligned}
$$

$t=-(2r)^{-1}\log(1-2\varepsilon)>0$ を選べば $e(t)=\varepsilon$ です。準位を一度も変えておらずエネルギーは常に0なので $\langle W_{\mathrm{meas}}\rangle=0$、$\langle Q_{\mathrm{bath}}\rangle=0$ です。一方で結合エントロピーは測定前の $\log2$ から $\log2+h(\varepsilon)$ へ増えるため、[全エントロピー生成の収支](#thm-itd6-joint-balance)は $\Sigma_{\mathrm{meas}}=h(\varepsilon)>0$ となります。
<!-- proof-end -->

可逆な抽出段階の達成可能性も計算できます。測定後は結果 $m$ ごとの $X$ の一致確率が $1-\varepsilon$ です。一致状態の準位を0、不一致状態を $\Delta_\varepsilon$ に瞬間的に変更すると、状態分布はちょうどその準位の平衡分布です。最初の仕事は $\varepsilon\Delta_\varepsilon$。そこから準位差を準静的に0へ戻す仕事は

$$
-k_{\mathrm B}T\log2
+k_{\mathrm B}T\log Z(\Delta_\varepsilon)
=-k_{\mathrm B}T\log2-k_{\mathrm B}T\log(1-\varepsilon).
$$

二つの仕事を足し、$\Delta_\varepsilon=k_{\mathrm B}T\log\{(1-\varepsilon)/\varepsilon\}$ を代入すると

$$
\begin{aligned}
\langle W_{\mathrm{fb}}\rangle
&\longrightarrow \varepsilon\Delta_\varepsilon
 -k_{\mathrm B}T\log2-k_{\mathrm B}T\log(1-\varepsilon)\\
&=k_{\mathrm B}T\left\{\varepsilon\log\frac{1-\varepsilon}{\varepsilon}
 -\log2-\log(1-\varepsilon)\right\}\\
&=-k_{\mathrm B}T\{\log2-h(\varepsilon)\}
=-k_{\mathrm B}TI_\varepsilon.
\end{aligned}
$$

記憶単独のresetは[ITD5の可逆極限構成](../ITD5/index.md#prop-itd5-quasistatic-reset)で $\langle W_{\mathrm{reset}}\rangle\to k_{\mathrm B}T\log2$ へ近づけます。

したがって、上記の**仕事ゼロ・正散逸の測定**に対して抽出とresetだけを可逆極限へ近づけた場合は

$$
\begin{aligned}
\langle W_{\mathrm{cycle}}\rangle
&\longrightarrow 0-k_{\mathrm B}TI_\varepsilon
  +k_{\mathrm B}T\log2\\
&=k_{\mathrm B}Th(\varepsilon)>0,
\qquad
\Sigma_{\mathrm{cycle}}\longrightarrow h(\varepsilon).
\end{aligned}
$$

一方、**測定も可逆極限**に近づけられる理想装置では三つの仕事下限の和が0へ近づきます。同じ測定精度でも、測定実装の散逸が装置の損益を変えるのです。

## 5. 不完全な循環と、まだ残る相関

測定後に記憶を戻さず「系だけが平衡へ戻った」と宣言したり、系と記憶の周辺分布だけを調べたりすると、再使用できない状態を一周と誤認します。どの相関を初めに持ち、最後に残したかを量的に評価します。

<a id="prop-itd6-residual-correlation"></a>

<!-- formal-statement-start -->
> **命題（残留相関を持つ非完全循環の仕事下限）**
> 有限状態の系 $X$・記憶 $M$ と温度 $T>0$ の単一浴について、[結合装置の仕事下限](#thm-itd6-joint-balance)の仮定を満たす操作を取る。始終で同じ分離エネルギー $E_X+E_M$ を用い、両方の周辺分布が始終で等しいとする。ただし結合分布は等しいとは仮定しない。このとき

$$
\langle W\rangle\ge
k_{\mathrm B}T\{I_f(X;M)-I_i(X;M)\}.
$$

> 初期が独立で終期に相関が残れば、その相関の形成に正の仕事下限がある。逆に初期相関を減らす操作では右辺が負になり得るが、それは蓄えられていた相関を消費する余地であって、同じ初期状態へ戻す循環の利益ではない。
<!-- formal-statement-end -->

### 証明の見取り図

始終のエネルギーも周辺分布も同じなら、二つの周辺自由エネルギーの変化は零です。結合自由エネルギーの相関項だけが残ります。

<!-- proof-start -->
### 証明

仮定より各周辺で $p_{X,f}=p_{X,i}$、$p_{M,f}=p_{M,i}$ と $E_{X,f}=E_{X,i}$、$E_{M,f}=E_{M,i}$ が成り立ちます。したがって $\Delta\mathcal F_X=\Delta\mathcal F_M=0$ です。[結合自由エネルギー分解](#prop-itd6-joint-free-energy)から

$$
\Delta\mathcal F_{XM}
=0+0+k_{\mathrm B}T(I_f-I_i).
$$

これを[結合装置の仕事下限](#thm-itd6-joint-balance)へ代入すると結論が出ます。
<!-- proof-end -->

### 例：周辺が一様のまま完全相関を作る

[第1節の二つの確率表](#def-itd6-joint-cycle)を使い、独立な $p_{\mathrm{ind}}$ から完全相関の $p_{\mathrm{corr}}$ へ移すとします。始終の準位はどちらも零で、両周辺は一様のままですが、

$$
\begin{aligned}
I_i&=2\log2-2\log2=0,\\
I_f&=2\log2-\log2=\log2.
\end{aligned}
$$

したがって $\langle W\rangle\ge k_{\mathrm B}T\log2$ です。周辺の変化だけを数えた $\Delta\mathcal F_X+\Delta\mathcal F_M=0$ は結合装置の下限ではありません。失われた仮定は「結合分布まで初期状態へ戻る」ことです。

極限 $\varepsilon\to0$ では二値測定の $I_\varepsilon\to\log2$、$h(\varepsilon)\to0$ です。測定が可逆な完全コピーなら仕事0、可逆な抽出で $-k_{\mathrm B}T\log2$、記憶resetで $+k_{\mathrm B}T\log2$ となります。一方、$\varepsilon\to1/2$ では $I_\varepsilon\to0$ です。情報のない測定に抽出利得はありません。記憶をランダム化してからresetするなら、その生成したエントロピーの扱いが残ります。

連続状態の測定、複数の温度を持つ浴、粒子数交換、強い系浴相互作用、粗視化で隠れた相関は、いずれもここで使った有限状態・単一浴・始終で相互作用零という仮定を変えます。特に量子測定では古典結合確率表と同じ式を無条件には用いません。どの仮定が外れるかを確認してから模型を拡張する必要があります。

## 6. 演習：独立・相関・循環の境界を判定する

全問で $T>0$、$\log$ は自然対数、$W$ は系・記憶への入力、$Q_{\mathrm{bath}}$ は浴への放熱を正とします。始終で零準位と指定した段階では $\Delta U=0$ です。可逆な無誤差resetは理想極限で評価します。

### Level A：結合分布と各段階を計算する

#### A1. 二値センサーの結合表

一様な $X\in\{0,1\}$ に対し、確率 $1-\varepsilon$ で正しく $M=X$、確率 $\varepsilon$ で誤る測定を行う。$0<\varepsilon<1/2$ とする。結合表、両周辺、$H(X,M)$、$I(X;M)$ を求めよ。

- Level: A
- ID: ITD6-A1

<!-- solution-start -->
**詳細解答**

各 $x$ の確率は $1/2$ なので、行を $x$、列を $m$ とすれば

$$
p(x,m)=\frac12
\begin{pmatrix}1-\varepsilon&\varepsilon\\
\varepsilon&1-\varepsilon\end{pmatrix}.
$$

行和は $\tfrac12\{(1-\varepsilon)+\varepsilon\}=1/2$、列和も $1/2$ です。測定結果を固定して状態が一致・不一致の条件付き確率を調べると $(1-\varepsilon,\varepsilon)$ ですから

$$
\begin{aligned}
H(X,M)
&=-2\frac{1-\varepsilon}{2}\log\frac{1-\varepsilon}{2}
  -2\frac{\varepsilon}{2}\log\frac{\varepsilon}{2}\\
&=\log2+h(\varepsilon),\\
I(X;M)&=H(X)+H(M)-H(X,M)\\
&=2\log2-\{\log2+h(\varepsilon)\}
=\log2-h(\varepsilon).
\end{aligned}
$$

周辺が一様でも $I>0$ なので独立ではありません。
<!-- solution-end -->

#### A2. 測定の前後で何が増えるか

初期 $X$ は一様、$M=0$ は確定で、両準位は零とする。A1の測定後との $\Delta H(X)$、$\Delta H(M)$、$\Delta I$、$\Delta H(X,M)$ と、測定の平均仕事下限を求めよ。

- Level: A
- ID: ITD6-A2

<!-- solution-start -->
**詳細解答**

初期は $H(X)=\log2$、$H(M)=0$、$I=0$、$H(X,M)=\log2$ です。前問A1で計算した終期は周辺がともに一様、相互情報量が $I_\varepsilon=\log2-h(\varepsilon)$ なので

$$
\begin{aligned}
\Delta H(X)&=0,& \Delta H(M)&=\log2,\\
\Delta I&=\log2-h(\varepsilon),&
\Delta H(X,M)&=\log2-\Delta I=h(\varepsilon).
\end{aligned}
$$

[結合装置の仕事下限](#thm-itd6-joint-balance)で始終のエネルギーが零だから $\Delta\mathcal F_{XM}=-k_{\mathrm B}T\Delta H(X,M)$、よって $\langle W_{\mathrm{meas}}\rangle\ge-k_{\mathrm B}Th(\varepsilon)$ です。下限が負でも実際の測定で仕事を取り出せるとは限りません。
<!-- solution-end -->

#### A3. 相関を消す抽出

A1の測定後から、$M$ の値を変えずに $X$ を各結果条件付きで一様にする。終端の結合表、$\Delta I$、$\Delta H(X,M)$、仕事下限を求めよ。

- Level: A
- ID: ITD6-A3

<!-- solution-start -->
**詳細解答**

$M$ は一様のまま、条件付き分布 $p(x\mid m)=1/2$ となるので

$$
p_f(x,m)=p_M(m)p_f(x\mid m)=\frac12\frac12=\frac14
$$

が4成分すべてに成り立ちます。したがって $I_f=0$、$H_f(X,M)=2\log2$、初期は $I_i=I_\varepsilon$、$H_i(X,M)=\log2+h(\varepsilon)$ です。

$$
\Delta I=-I_\varepsilon,\qquad
\Delta H(X,M)=\log2-h(\varepsilon)=I_\varepsilon.
$$

始終の準位が零なので[結合装置の仕事下限](#thm-itd6-joint-balance)から

$$
\langle W_{\mathrm{fb}}\rangle
\ge-k_{\mathrm B}TI_\varepsilon.
$$

これは取り出す仕事 $-\langle W_{\mathrm{fb}}\rangle$ が高々 $k_{\mathrm B}TI_\varepsilon$ という意味です。
<!-- solution-end -->

#### A4. 抽出後の記憶消去

A3後の独立一様記憶を、系には触れずに0へ無誤差resetする。記憶・結合のエントロピー変化と、仕事・浴への放熱の下限を求めよ。

- Level: A
- ID: ITD6-A4

<!-- solution-start -->
**詳細解答**

$X$ は一様のまま、$M$ は $(1/2,1/2)$ から $(1,0)$ へ移ります。独立性を保つので

$$
\Delta H(M)=-\log2,\quad
\Delta I=0,\quad
\Delta H(X,M)=-\log2.
$$

初期・終端の全準位は零であり、[ITD5のLandauer下限](../ITD5/index.md#cor-itd5-landauer)により

$$
\langle W_{\mathrm{reset}}\rangle
\ge k_{\mathrm B}T\log2.
$$

$\Delta U=0$ です。[ITD1の第一法則](../ITD1/index.md#thm-itd1-first-law)に代入すると $\langle Q_{\mathrm{bath}}\rangle=\langle W_{\mathrm{reset}}\rangle$ で、放熱にも同じ下限があります。有限段の正確率接触での厳密な無誤差達成を断言してはいけません。
<!-- solution-end -->

#### A5. 熱をやり取りしない測定の不可逆性

初期と終端で零準位の測定が $p_0\to p_1$ を実現し、測定中の平均仕事・熱がともに零だったとする。測定の $\Sigma_{\mathrm{tot}}$ を求め、その測定が可逆か答えよ。

- Level: A
- ID: ITD6-A5

<!-- solution-start -->
**詳細解答**

初期 $H(p_0)=\log2$、終期 $H(p_1)=\log2+h(\varepsilon)$ より $\Delta H(X,M)=h(\varepsilon)$ です。[全エントロピー生成の定義](#thm-itd6-joint-balance)に $\langle Q_{\mathrm{bath}}\rangle=0$ を代入すると

$$
\Sigma_{\mathrm{tot}}
=h(\varepsilon)+\beta\cdot0=h(\varepsilon)>0.
$$

$0<\varepsilon<1/2$ なら両対数の和である $h(\varepsilon)$ は正なので、仕事・熱が零でも不可逆です。不可逆性は測定後に結合エントロピーが増えたことに現れます。
<!-- solution-end -->

### Level B：境界条件を替えて証明する

#### B1. 相互情報量と浴熱から仕事を復元する

有限状態で始終のエネルギーが $E_X+E_M$ に分離する操作を考える。平均仕事を $\Delta U_X,\Delta U_M,\Delta H(X),\Delta H(M),\Delta I,\Sigma_{\mathrm{tot}}$ の式で表せ。途中で相互作用を許しても結論が使える理由を述べよ。

- Level: B
- ID: ITD6-B1

<!-- solution-start -->
**詳細解答**

始終の相互作用エネルギーが零なので、[結合自由エネルギー分解](#prop-itd6-joint-free-energy)と有限和の平均エネルギー分解から

$$
\begin{aligned}
\Delta\mathcal F_{XM}
&=(\Delta U_X-k_{\mathrm B}T\Delta H(X))\\
&\quad+(\Delta U_M-k_{\mathrm B}T\Delta H(M))
  +k_{\mathrm B}T\Delta I.
\end{aligned}
$$

[仕事と生成の収支](#thm-itd6-joint-balance)は $\langle W\rangle=\Delta\mathcal F_{XM}+k_{\mathrm B}T\Sigma_{\mathrm{tot}}$ なので代入して

$$
\boxed{\langle W\rangle
=\Delta U_X+\Delta U_M
-k_{\mathrm B}T\{\Delta H(X)+\Delta H(M)-\Delta I\}
+k_{\mathrm B}T\Sigma_{\mathrm{tot}}}.
$$

途中の相互作用は準位制御で仕事・熱へ計上してあり、式が分離を使うのは始終だけです。もし終端に相互作用エネルギーが残れば、その平均変化も必要になり、この式のままでは成立しません。
<!-- solution-end -->

#### B2. 有限時間に雑音を足す

$X$ を固定し、最初 $M=X$ とコピー済みの記憶を、両準位零で両方向のジャンプ率が $r$ の熱浴へ時間 $t>0$ 接触させる。誤り率、相互情報量、平均仕事、生成エントロピーを求めよ。また指定した誤り率 $\varepsilon\in(0,1/2)$ にする時間を解け。

- Level: B
- ID: ITD6-B2

<!-- solution-start -->
**詳細解答**

不一致確率を $e(t)$ とすると、$0\to1$（一致から不一致）への確率流入が $r(1-e)$、逆向きの流出が $re$ です。ゆえに

$$
\frac{de}{dt}+2re=r,\qquad e(0)=0.
$$

両辺へ $e^{2rt}$ を掛けると

$$
\frac{d}{dt}\{e^{2rt}e(t)\}=re^{2rt},
\quad
e^{2rt}e(t)=\frac{e^{2rt}-1}{2},
$$

したがって $e(t)=\{1-e^{-2rt}\}/2$ です。$t>0$ なら $0<e(t)<1/2$ なので[二値測定の情報量](../ITD4/index.md#prop-itd4-binary-channel)により $I(t)=\log2-h(e(t))$ です。

準位は全時刻で0で変更もなく $\Delta U=0$、$\langle W\rangle=\langle Q_{\mathrm{bath}}\rangle=0$ です。[生成エントロピーの収支](#thm-itd6-joint-balance)で結合エントロピーは $\log2$ から $\log2+h(e(t))$ へ増えるため $\Sigma_{\mathrm{tot}}=h(e(t))$ です。$e(t)=\varepsilon$ を解くと

$$
1-2\varepsilon=e^{-2rt},
\qquad
t=-\frac{\log(1-2\varepsilon)}{2r}>0.
$$

仕事が零であることと、熱力学的可逆性は別です。
<!-- solution-end -->

#### B3. 周辺分布は元へ戻っても相関は増える

$X,M$ が独立一様、準位が全て零の状態から、第1節の完全相関分布へ移す操作を考える。必要な仕事下限と浴の放熱下限を求めよ。「系だけが循環した」という言い方の欠点も説明せよ。

- Level: B
- ID: ITD6-B3

<!-- solution-start -->
**詳細解答**

初期は4成分が $1/4$ で $H_i(X,M)=2\log2$、終期は対角2成分が $1/2$ で $H_f(X,M)=\log2$ です。両周辺は常に一様で $I_i=0$、$I_f=\log2$ なので[残留相関の仕事下限](#prop-itd6-residual-correlation)から

$$
\langle W\rangle
\ge k_{\mathrm B}T(I_f-I_i)
=k_{\mathrm B}T\log2.
$$

始終の準位が零なので $\Delta U=0$、したがって[第一法則](../ITD1/index.md#thm-itd1-first-law)より $\langle Q_{\mathrm{bath}}\rangle=\langle W\rangle\ge k_{\mathrm B}T\log2$ です。系の周辺 $p_X$ は戻っていても、装置の $p_{XM}$ は独立から相関へ変わり、次回の初期状態が同じではありません。結合分布の復帰という条件を落としたことが誤りです。
<!-- solution-end -->

#### B4. 非対称測定でも帳簿は閉じるか

一様な $X\in\{0,1\}$、初期 $M=0$、零準位の二状態装置で、$P(M=1\mid X=0)=a$、$P(M=0\mid X=1)=b$ とする。$0<a,b<1$。測定後の $M=1$ の確率を $q$ と置き、$H(M)$、$H(M\mid X)$、$I(X;M)$ を計算せよ。[INFO1の条件付きエントロピー](../../../応用系/INFO/INFO1/index.md#def-info1-conditional-entropy)は、ここでは底を自然対数に替えたnat単位で用いる。条件付き抽出で $X$ を独立一様へ戻し、記憶を0へresetした完全循環で、測定・抽出・resetの可逆仕事下限を求め、和を検算せよ。

- Level: B
- ID: ITD6-B4

<!-- solution-start -->
**詳細解答**

結合確率を行 $x$、列 $m$ で書くと

$$
p(x,m)=\frac12
\begin{pmatrix}1-a&a\\b&1-b\end{pmatrix}.
$$

したがって $q=\tfrac12a+\tfrac12(1-b)=(1+a-b)/2$、$H(M)=h(q)$ です。条件付き二値エントロピーは $X=0$ で $h(a)$、$X=1$ で $h(b)$ なので

$$
c=H(M\mid X)=\frac{h(a)+h(b)}2,
\qquad
I(X;M)=h(q)-c.
$$

測定前は $H(X,M)=\log2$、測定後は条件付き確率の分解から $H(X,M)=\log2+c$ です。抽出で $X$ を独立一様へ戻すと $H(X,M)=\log2+h(q)$、reset後に $\log2$ へ戻ります。全ての段階境界で零準位なので[結合装置の仕事下限](#thm-itd6-joint-balance)は

$$
\begin{aligned}
W_{\mathrm{meas}}&\ge-k_{\mathrm B}Tc,\\
W_{\mathrm{fb}}&\ge-k_{\mathrm B}T\{h(q)-c\},\\
W_{\mathrm{reset}}&\ge k_{\mathrm B}Th(q).
\end{aligned}
$$

足し合わせれば $-c-\{h(q)-c\}+h(q)=0$、全仕事は非負です。これらは各段階が可逆極限で実現できる場合の下限であり、単に確率チャネルを与えただけで達成されるものではありません。
<!-- solution-end -->

### Level C：一周の全収支を二通りで検算する

#### C1. 雑音のある悪魔はどこで損をするか

$X$ は一様、$M=0$ は確定、全て零準位から始める。最初に仕事ゼロの可逆コピーと対称ジャンプ率の記憶熱浴接触で誤り率 $\varepsilon=1/4$ を持つ測定を実現する。次に各結果に応じて $X$ を独立一様へ可逆極限で戻し、最後に $M$ を無誤差resetの可逆極限で0へ戻す。制御器は始終で復帰し、全段階の境界に相互作用エネルギーはないとする。

1. 測定後の結合確率表と情報量 $I$、条件付きエントロピー $h$ を求めよ。
2. 各段階の平均仕事・浴への熱と生成エントロピーを求め、総和を表にせよ。
3. 情報付きの抽出上限と記憶の消去下限だけを見た「利得」が、全循環の符号と異なる理由を説明せよ。
4. 測定自体も可逆極限へ取り替えた場合を再計算し、全循環の仕事下限と熱収支を確かめよ。

- Level: C
- ID: ITD6-C1

<!-- solution-start -->
**詳細解答**

測定の結合表は

$$
p_1(x,m)=\begin{pmatrix}3/8&1/8\\1/8&3/8\end{pmatrix}.
$$

行和・列和は $1/2$、全成分は非負で合計1です。[二値エントロピー](../ITD5/index.md#def-itd5-memory-entropy)を展開すると

$$
\begin{aligned}
h=h(1/4)
&=-\frac14\log\frac14-\frac34\log\frac34\\
&=2\log2-\frac34\log3,\\
I=\log2-h
&=\frac34\log3-\log2>0.
\end{aligned}
$$

測定は準位零のコピーと対称熱浴接触なので $\langle W_{\mathrm{meas}}\rangle=0$、$\langle Q_{\mathrm{bath,meas}}\rangle=0$、$\Sigma_{\mathrm{meas}}=h$ です。抽出段階は[条件付き準位操作の構成](#prop-itd6-measurement-protocols)により可逆極限で $\langle W_{\mathrm{fb}}\rangle=-k_{\mathrm B}TI$、$\Sigma_{\mathrm{fb}}=0$ に近づきます。[ITD5の記憶reset](../ITD5/index.md#prop-itd5-quasistatic-reset)により $\langle W_{\mathrm{reset}}\rangle=k_{\mathrm B}T\log2$、$\Sigma_{\mathrm{reset}}=0$ に近づきます。

各境界で内部エネルギーは零です。[ITD1の第一法則](../ITD1/index.md#thm-itd1-first-law)へ $\Delta U=0$ を代入すれば、各段階で $\langle Q_{\mathrm{bath}}\rangle=\langle W\rangle$ です。仕事・放熱を $k_{\mathrm B}T$ 単位で表した帳簿は次の通りです。

| 操作 | $W/(k_{\mathrm B}T)$ | $Q_{\mathrm{bath}}/(k_{\mathrm B}T)$ | $\Sigma_{\mathrm{tot}}$ |
| --- | ---: | ---: | ---: |
| コピーと雑音付加 | $0$ | $0$ | $h$ |
| 条件付き抽出（可逆極限） | $-I$ | $-I$ | $0$ |
| 記憶reset（可逆極限） | $\log2$ | $\log2$ | $0$ |
| 合計 | $\log2-I=h$ | $h$ | $h$ |

結果を独立に検算します。装置全体は $p_3=p_0$、エネルギーも零へ戻り、結合エントロピー変化は0です。[全装置の生成エントロピー](#thm-itd6-joint-balance)を全操作へ適用すると

$$
\Sigma_{\mathrm{cycle}}
=\underbrace{\Delta H(X,M)}_{0}
+\beta Q_{\mathrm{bath,cycle}}
=\beta k_{\mathrm B}Th=h,
$$

で、段階ごとの $h+0+0=h$ と一致します。

系だけなら可逆抽出で $W_{\mathrm{ext}}=k_{\mathrm B}TI$ を得るので利益に見えます。しかし初期化する記憶は一様で、resetに $k_{\mathrm B}T\log2$ が必要です。差は $k_{\mathrm B}T(\log2-I)=k_{\mathrm B}Th>0$ の**外部からの正味仕事**です。測定の仕事は零でも、その段階で生まれた不可逆性を忘れてはいけません。

最後に測定を[可逆測定の構成](#prop-itd6-measurement-protocols)に取り替えると、その測定は $\langle W_{\mathrm{meas}}\rangle\to-k_{\mathrm B}Th$、$\langle Q_{\mathrm{bath,meas}}\rangle\to-k_{\mathrm B}Th$、$\Sigma_{\mathrm{meas}}\to0$ です。他の二段階は同じ可逆極限なので

$$
\begin{aligned}
\frac{\langle W_{\mathrm{cycle}}\rangle}{k_{\mathrm B}T}
&\longrightarrow-h-I+\log2\\
&=-h-\{\log2-h\}+\log2=0,\\
\langle Q_{\mathrm{bath,cycle}}\rangle
&\longrightarrow0,\qquad
\Sigma_{\mathrm{cycle}}\longrightarrow0.
\end{aligned}
$$

これは有限時間・有限準位の装置で必ず完全な等号が達成されるという主張ではありません。測定精度だけを固定しても、実装によって散逸が違うことを、二つの計算法で確かめました。
<!-- solution-end -->

## 7. 次に問うこと

この章では有限状態、単一温度、始終で相互作用が零、装置の結合分布が復帰するという境界を固定しました。その上で、情報が仕事の上限を変えても全装置の第二法則を破らない理由を、測定費用を含む帳簿で示しました。

次の発展では、連続軌道への移行、複数浴と情報流、相関の粗視化、有限時間制御を同じ形式で追えるかを問います。どの一般化でも、最初に「何を系とし、何を循環させ、どの浴の熱を足したか」を確定することが出発点です。
