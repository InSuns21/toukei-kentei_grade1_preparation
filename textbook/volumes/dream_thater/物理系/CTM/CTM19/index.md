# CTM19 時間依存の応答と散逸をどう測るか

前講の [Maxwell 模型](../CTM18/index.md#thm-ctm18-maxwell-law)では、ひずみを止めた後も内部のばねが緩み、応力が減少した。[Kelvin–Voigt 模型](../CTM18/index.md#thm-ctm18-kelvin-law)では一定応力でもひずみは遅れて増えた。しかし、材料試験で「ひずみを保持した後に応力が**零ではない値**に落ち着く」「速い振動では硬く、遅い振動では柔らかい」という両方の性質が観測されたら、二素子だけでは説明しきれない。

今回は**緩和しても残るばね**を追加し、過去の負荷履歴を応力へ結ぶ。さらに周期的にひずみを与え、応力の同相部分（蓄積）と位相のずれた部分（損失）を分ける。最後に、一周期で失われた仕事が正確に何に対応するかを求める。

## 0. 仮定と測定量

長い棒の軸方向のみを扱い、引張を正とする。ひずみ $\varepsilon(t)$ は無次元、応力 $\sigma(t)$ は Pa、時刻 $t$ は s、角周波数 $\omega$ は rad/s（rad は無次元）である。小変形・均質・等温・準静的な線形**受動**材料を仮定する。質量の慣性、熱流、三次元の客観的粘弾性、有限変形、非線形性は扱わない。時間微分を $\dot f=df/dt$ と書く。

材料の定数は、長時間にも残るばねの弾性率 $E_\infty>0$（Pa）、緩和する枝のばねの弾性率 $E_1>0$（Pa）、その枝のダッシュポットの係数 $\eta>0$（Pa s）である。次を略記する。

$$
E_0=E_\infty+E_1,\qquad
\tau=\frac{\eta}{E_1}>0.
$$

$E_0$ は瞬間的な有効弾性率、$E_\infty$ は十分長い時間の有効弾性率、$\tau$ は応力緩和時間（s）である。単位基準体積当たりの仕事・蓄積エネルギーは J/m$^3$、散逸率は W/m$^3$ とする。

## 1. なぜ標準線形固体を作るのか

[CTM18 の接続条件](../CTM18/index.md#def-ctm18-connections)では、直列枝は応力が共通でひずみが加算され、並列枝はひずみが共通で応力が加算された。そこで、永久に荷重を支えるばねと、時間とともに荷重を逃がす Maxwell 枝を並列に置く。

    入力端 ─┬── [ばね E∞] ───────────────────┬─ 出力端
             └── [ばね E1] ─ [粘性 η] ────────┘

Maxwell 枝が担当する応力を $q$ と書く。並列なのでその枝の全ひずみは外部ひずみ $\varepsilon$ と等しいが、**枝内部**のばねひずみとダッシュポットひずみは足し算になる。

<a id="def-ctm19-sls"></a>

<!-- formal-statement-start -->
### 定義（標準線形固体と内部応力）

$E_\infty,E_1,\eta>0$ の一定値を持ち、$E_\infty$ のばねと、弾性率 $E_1$・粘性係数 $\eta$ の Maxwell 直列枝とを並列に置いた一次元模型を**標準線形固体**（standard linear solid）とする。Maxwell 枝の共通応力を**内部応力** $q$ とすると、滑らかな時間区間では

$$
\sigma=E_\infty\varepsilon+q,\qquad
\dot q+\frac{q}{\tau}=E_1\dot\varepsilon,\qquad
\tau=\frac{\eta}{E_1}>0
$$

を満たす。$q$ の単位は Pa である。
<!-- formal-statement-end -->

### 枝の微分方程式はどこから来たか

まず、[一次元ばね・ダッシュポットの素子則](../CTM18/index.md#def-ctm18-elements)により、直列枝のばねひずみは $\varepsilon_s=q/E_1$、ダッシュポットのひずみ速度は $\dot\varepsilon_d=q/\eta$ である。直列接続では $\varepsilon=\varepsilon_s+\varepsilon_d$ なので、時間微分すると $\dot\varepsilon=\dot\varepsilon_s+\dot\varepsilon_d$ になる。[Maxwell の速度加算](../CTM18/index.md#thm-ctm18-maxwell-law)に、枝応力を $\sigma\mapsto q$、枝弾性率を $E\mapsto E_1$、枝全ひずみを $\varepsilon$ と対応させると

$$
\dot\varepsilon=\frac{\dot q}{E_1}+\frac q\eta,
\quad
E_1\dot\varepsilon=\dot q+\frac{E_1}{\eta}q
=\dot q+\frac q\tau.
$$

この一階方程式が**直列枝の記憶**を表し、並列ばねが**長時間の残留剛性**を保証する。

<!-- definition-example-start: def-ctm19-sls -->
### **定義の確認**：並列応力と直列ひずみを同時に確かめる

$E_\infty=2$ MPa、$E_1=3$ MPa、$\eta=6$ MPa s、$\varepsilon=0.01$、$q=3$ kPa、$\dot\varepsilon=0.002$ s$^{-1}$ を考える。すべての係数は正で、$\tau=2$ s となる。

直列枝の共通応力からばねひずみ $\varepsilon_s=q/E_1$ を計算し、並列枝に課されたひずみ $\varepsilon$ を直列接続の和に分ける。

$$
\varepsilon_s=\frac{3000}{3\times10^6}=0.001,\qquad
\varepsilon_d=0.01-0.001=0.009,\qquad
\varepsilon_s+\varepsilon_d=0.01.
$$

次にダッシュポットの関係式と直列枝の速度加算を用いる。

$$
\dot\varepsilon_d=\frac q\eta=0.0005\ \mathrm{s^{-1}},\qquad
\dot\varepsilon_s=0.002-0.0005=0.0015\ \mathrm{s^{-1}}.
$$

このばねひずみ速度を $\dot q=E_1\dot\varepsilon_s$ へ戻すと

$$
\dot q=E_1(0.0015)=4500\ \mathrm{Pa/s},\qquad
E_1\dot\varepsilon-\frac q\tau=6000-1500=4500\ \mathrm{Pa/s}.
$$

枝の式の両辺が一致する。また全応力は $E_\infty\varepsilon+q=20+3=23$ kPa と、並列の応力和になる。
<!-- definition-example-end -->

## 2. 過去のひずみを現在の応力へ結ぶ

瞬間の $\varepsilon(t)$ だけでは内部応力 $q(t)$ は決まらない。方程式を時間積分すると、以前のひずみ速度ほど指数因子で重みが小さくなる。初期状態を明記してから履歴を考えよう。

まず、時刻 $0$ に与えた一定ひずみ $\varepsilon_0$ を保持した場合、時刻 $t>0$ に測る応力を $\varepsilon_0$ で割る測定量を作る。すべての材料で同じ式になるとは仮定しない。

<a id="def-ctm19-relaxation"></a>

<!-- formal-statement-start -->
### 定義（ひずみステップによる緩和関数）

初期零状態の線形一次元材料へ、時刻 $0$ に正の一定ひずみ $\varepsilon_0$ を瞬時に与え、$t>0$ に保持する試験を考える。応力が $\varepsilon_0$ に比例するとき、$t>0$ の**緩和関数**を

$$
G(t)=\frac{\sigma(t)}{\varepsilon_0}
$$

と定める。瞬間の右極限を $G(0+)$ と書く。$G$ の単位は Pa である。
<!-- formal-statement-end -->

理想ステップでの初期応力を、[Maxwell 模型のステップ応答](../CTM18/index.md#thm-ctm18-maxwell-step)と同じ接続条件から求める。有限応力の近似負荷を考えると、ダッシュポットひずみの跳びは、幅 $2h$ の区間に対して

$$
\Delta\varepsilon_d=\lim_{h\downarrow0}\int_{-h}^{h}\frac{q(t)}{\eta}\,dt=0
$$

となる（$q$ がこの区間で一様有界であることを使用）。したがって全ひずみの跳び $\varepsilon_0$ は直列枝のばねが受け持ち、$q(0+)=E_1\varepsilon_0$ となる。この初期値を保持区間の一階方程式へ入れて、次の比を確かめる。

<!-- definition-example-start: def-ctm19-relaxation -->
### **定義の確認**：一定ひずみ試験で何を割るのか

$E_\infty=2$ MPa、$E_1=3$ MPa、$\tau=2$ s の標準線形固体で、初期零状態から $\varepsilon_0=0.01$ を与える。ダッシュポットのひずみは瞬間には跳べないので $q(0+)=E_1\varepsilon_0=30$ kPa。保持中は $\dot\varepsilon=0$ だから $q(t)=30e^{-t/2}$ kPa。従って

$$
G(t)=\frac{20+30e^{-t/2}}{0.01}\ \mathrm{kPa}
=(2+3e^{-t/2})\ \mathrm{MPa}.
$$

時刻 $0+$ で $5$ MPa、長時間で $2$ MPa。異なる正の $\varepsilon_0$ でも同じ比になるのは模型の線形性による。これは、定義の「ひずみを保持する」「応力で割る」の両方を実測値の形で確認した例である。
<!-- definition-example-end -->

<a id="thm-ctm19-history"></a>

<!-- formal-statement-start -->
### 定理（標準線形固体の緩和関数と履歴積分）

$E_\infty,E_1,\eta>0$ が定数の[標準線形固体](#def-ctm19-sls)を考え、$\tau=\eta/E_1$ とする。初期条件 $q(0)=0,\varepsilon(0)=0$ のもとで、$\varepsilon$ が区間 $[0,T]$ 上 $C^1$ 級なら、$0\le t\le T$ に対し

$$
\sigma(t)=\int_0^t G(t-s)\dot\varepsilon(s)\,ds,\qquad
G(u)=E_\infty+E_1e^{-u/\tau}\quad(u\ge0).
$$

別に、初期零状態から時刻 $0$ に有限な理想ひずみステップ $\varepsilon_0$ を与えて保持すれば、$t>0$ では $\sigma(t)=G(t)\varepsilon_0$ となる。後者の瞬間は $C^1$ 履歴の積分公式へ形式的な無限大の微分を代入したものではなく、枝の接続条件を用いて解く。
<!-- formal-statement-end -->

### 証明の見取り図

内部応力の一階式に積分因子 $e^{t/\tau}$ を掛ける。並列ばねの項 $E_\infty\varepsilon(t)$ も、$\varepsilon(0)=0$ のときは $\dot\varepsilon$ の積分に直せる。緩和関数は、指数核と一定核の和になる。

<!-- proof-start -->
### 証明

[標準線形固体の内部応力式](#def-ctm19-sls)より

$$
\dot q+\frac q\tau=E_1\dot\varepsilon.
$$

時間 $s$ について積分因子を掛けると

$$
\frac{d}{ds}\bigl(e^{s/\tau}q(s)\bigr)
=E_1e^{s/\tau}\dot\varepsilon(s).
$$

$0$ から $t$ まで積分し $q(0)=0$ を使うと

$$
e^{t/\tau}q(t)=E_1\int_0^t e^{s/\tau}\dot\varepsilon(s)\,ds,
\qquad
q(t)=E_1\int_0^t e^{-(t-s)/\tau}\dot\varepsilon(s)\,ds.
$$

一方、$\varepsilon(0)=0$ より

$$
E_\infty\varepsilon(t)
=E_\infty\int_0^t\dot\varepsilon(s)\,ds.
$$

$\sigma=E_\infty\varepsilon+q$ に代入して二つの積分を一つにまとめれば

$$
\sigma(t)=\int_0^t
\bigl(E_\infty+E_1e^{-(t-s)/\tau}\bigr)
\dot\varepsilon(s)\,ds.
$$

ステップについては、時刻 $0$ の直前は各素子が無ひずみで、直列ダッシュポットは有限応力の瞬間にはひずみを跳ばせない。[直列の接続条件](../CTM18/index.md#def-ctm18-connections)から $q(0+)=E_1\varepsilon_0$、全応力 $\sigma(0+)=E_0\varepsilon_0$。$t>0$ は $\dot\varepsilon=0$ なので

$$
\dot q+\frac q\tau=0,\qquad
q(t)=E_1\varepsilon_0e^{-t/\tau}.
$$

$\sigma(t)=E_\infty\varepsilon_0+q(t)=G(t)\varepsilon_0$ を得る。$\square$
<!-- proof-end -->

**核 $G(t-s)$ の意味。** 現在から $t-s$ 秒前のひずみ変化に重みを掛けて積み重ねる。$E_\infty$ 項は履歴を通じて保持され、$E_1$ 項は古い変化ほど減衰する。未来 $s>t$ の情報は使わない（因果的応答）。この積分式は**初期零状態・滑らかな履歴**に限った主張で、一般の材料のすべての時間依存を三定数で説明するものではない。

たとえば時刻 $0$ で $q_0$ と $\varepsilon_0$ が任意に与えられた滑らかな後続履歴なら、積分因子から直接

$$
\sigma(t)=E_\infty\varepsilon(t)
+e^{-t/\tau}q_0
+E_1\int_0^t e^{-(t-s)/\tau}\dot\varepsilon(s)\,ds
$$

である。**初期応力の記憶**を落として零初期履歴の式を誤用しない。

## 3. 応力を保持したときも、最後は変形が止まる

Maxwell だけなら一定応力のもとでひずみは無限に増える。[前講のクリープ](../CTM18/index.md#thm-ctm18-maxwell-step)と違い、並列ばねは最終的にも応力を支え続ける。

<a id="thm-ctm19-creep"></a>

<!-- formal-statement-start -->
### 定理（標準線形固体の応力ステップ・クリープ）

$E_\infty,E_1,\eta>0$ の標準線形固体が時刻 $0$ の直前に無応力・無ひずみであるとする。$t=0$ で応力を $\sigma_0$ へ瞬時に変え、$t>0$ に一定に保持するなら

$$
\varepsilon(t)=\sigma_0J(t),\qquad
J(t)=\frac1{E_\infty}
+\left(\frac1{E_0}-\frac1{E_\infty}\right)e^{-t/\tau_c},
$$

$$
E_0=E_\infty+E_1,\qquad
\tau_c=\frac{E_0}{E_\infty}\tau.
$$

$\varepsilon(0+)=\sigma_0/E_0$、$\lim_{t\to\infty}\varepsilon(t)=\sigma_0/E_\infty$ である。$J$ の単位は Pa$^{-1}$、$\tau_c>\tau$ である。
<!-- formal-statement-end -->

### 証明の見取り図

応力を消去したひずみの一階式を解く。ただし、時刻 $0$ にダッシュポットは跳ばないので、初期ひずみを**瞬間弾性率 $E_0$** から決めることが欠かせない。

<!-- proof-start -->
### 証明

[標準線形固体](#def-ctm19-sls)の $\sigma=E_\infty\varepsilon+q$ を微分し

$$
\dot\sigma=E_\infty\dot\varepsilon+\dot q
=(E_\infty+E_1)\dot\varepsilon-\frac q\tau.
$$

$q=\sigma-E_\infty\varepsilon$ を戻し、項を移すと

$$
\dot\sigma+\frac{\sigma}{\tau}
=E_0\dot\varepsilon+\frac{E_\infty}{\tau}\varepsilon.
$$

$t>0$ は $\dot\sigma=0$ なので

$$
\dot\varepsilon+\frac{E_\infty}{E_0\tau}\varepsilon
=\frac{\sigma_0}{E_0\tau}.
$$

この式の定常値は $\sigma_0/E_\infty$、減衰時定数は $\tau_c=E_0\tau/E_\infty$。初期値を決める際、直列枝のダッシュポットのひずみは跳ばない。並列全ひずみの跳び $\Delta\varepsilon$ は直列枝のばねひずみの跳びでもあるから、各枝の応力跳びは $E_\infty\Delta\varepsilon$ と $E_1\Delta\varepsilon$。従って

$$
\sigma_0=E_0\varepsilon(0+),\qquad
\varepsilon(0+)=\frac{\sigma_0}{E_0}.
$$

解の形 $\varepsilon(t)=\sigma_0/E_\infty+C e^{-t/\tau_c}$ に初期値を代入して $C=\sigma_0/E_0-\sigma_0/E_\infty$ を得る。$E_1>0$ より $E_0>E_\infty$ なので $\tau_c>\tau$。$\square$
<!-- proof-end -->

**緩和時間 $\tau$ とクリープ時間 $\tau_c$ は一致しない。** 同じ三定数の模型でも、何を一定に保つかで観測時間の目盛りが違う。線形性から応力ステップへのひずみ応答 $J(t)$ は後の負荷・除荷にも利用できる。

## 4. 周期的に揺すると、応力はどれだけ先行するか

実験ではひずみを一定に保つ代わりに、十分長く正弦的に変形させる場合がある。はじめの過渡成分（初期内部応力による $e^{-t/\tau}$ 成分）が小さくなった後の**定常周期解**に限る。

実数の計算を二度繰り返さないために、$i^2=-1$、$e^{i\theta}=\cos\theta+i\sin\theta$ を使う。複素数は計算用の表記であり、実際に測るひずみ・応力はその実部 $\operatorname{Re}$ である。

<a id="def-ctm19-modulus"></a>

<!-- formal-statement-start -->
### 定義（複素弾性率・貯蔵弾性率・損失弾性率）

角周波数 $\omega>0$ で入力し、初期値に依存して減衰する過渡成分を除いた、入力と同じ周期を持つ解について、$\widehat\varepsilon\ne0$ と $\widehat\sigma$ を複素振幅とし、

$$
\varepsilon(t)=\operatorname{Re}(\widehat\varepsilon e^{i\omega t}),\qquad
\sigma(t)=\operatorname{Re}(\widehat\sigma e^{i\omega t})
$$

と表す。線形材料の**複素弾性率** $E^*(\omega)$ を、$\widehat\sigma=E^*(\omega)\widehat\varepsilon$ によって定める。その実部を**貯蔵弾性率** $E'(\omega)$、虚部を**損失弾性率** $E''(\omega)$ とし、

$$
E^*(\omega)=E'(\omega)+iE''(\omega)
$$

と記す。三者の単位は Pa である。$E'$ と $E''$ のプライム記号は周波数や時間に関する導関数ではなく、実部と虚部を区別する名称である。$E''$ の符号は上記の $e^{+i\omega t}$ の規約に従う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm19-modulus -->
### **定義の確認**：複素振幅から実際の曲線へ

ある測定角周波数で $E^*=(3.5+1.5i)$ MPa、実数振幅 $\widehat\varepsilon=0.01$ とする。定義の乗算は

$$
\widehat\sigma=(3.5+1.5i)\times0.01
=(35+15i)\ \mathrm{kPa}.
$$

従って、$\theta=\omega t$ と書けば、実際の入力と応力は

$$
\varepsilon(t)=0.01\cos\theta,\qquad
\sigma(t)=35\cos\theta-15\sin\theta\quad(\mathrm{kPa}).
$$

虚数部をそのまま実測応力へ加えるのではなく、$\operatorname{Re}(i e^{i\theta})=-\sin\theta$ を用いた。複素弾性率の実部・虚部はそれぞれ $3.5$ MPa と $1.5$ MPa で、Pa の次元も一致する。
<!-- definition-example-end -->

<a id="thm-ctm19-dynamic"></a>

<!-- formal-statement-start -->
### 定理（標準線形固体の貯蔵弾性率と損失弾性率）

$E_\infty,E_1,\eta>0$ の標準線形固体に角周波数 $\omega>0$ の定常周期ひずみを与える。$x=\omega\tau>0$、$\tau=\eta/E_1$ とすると

$$
E^*(\omega)=E_\infty+E_1\frac{ix}{1+ix},
$$

$$
E'(\omega)=E_\infty+E_1\frac{x^2}{1+x^2},\qquad
E''(\omega)=E_1\frac{x}{1+x^2}>0.
$$

$\varepsilon(t)=\varepsilon_a\cos\omega t$（$\varepsilon_a>0$）なら

$$
\sigma(t)=\varepsilon_a\bigl(E'\cos\omega t-E''\sin\omega t\bigr)
=\varepsilon_a|E^*|\cos(\omega t+\delta),
$$

ただし $|E^*|=\sqrt{E'^2+E''^2}$、$\tan\delta=E''/E'$、$0<\delta<\pi/2$。低周波では $E'\to E_\infty,E''\to0$、高周波では $E'\to E_0,E''\to0$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

一階方程式に複素指数形の候補を入れると、時間微分が $i\omega$ の乗算になる。分母を実数化して実部と虚部を分ける。「高周波で損失が零になる」は**損失弾性率の極限**であり、固定振幅・周波数で測る仕事率が常に零という意味ではない。

<!-- proof-start -->
### 証明

[内部応力方程式](#def-ctm19-sls)の定常周期解を $q(t)=\operatorname{Re}(\widehat q e^{i\omega t})$ と仮定する。複素振幅 $\widehat f$ は時間に依存しない定数なので、時間 $t$ で微分する連鎖律から

$$
\frac{d}{dt}(\widehat f e^{i\omega t})=i\omega\widehat f e^{i\omega t}
$$

を得る。実部を取る操作と時間微分は交換できるため、$\dot q\mapsto i\omega\widehat q$ と $\dot\varepsilon\mapsto i\omega\widehat\varepsilon$ を代入すると

$$
\left(i\omega+\frac1\tau\right)\widehat q
=i\omega E_1\widehat\varepsilon.
$$

$\tau>0$、$\omega>0$ なので係数の絶対値は正であり、割り算できる。よって

$$
\widehat q=E_1\frac{i\omega\tau}{1+i\omega\tau}\widehat\varepsilon
=E_1\frac{ix}{1+ix}\widehat\varepsilon.
$$

$\widehat\sigma=E_\infty\widehat\varepsilon+\widehat q$ を用い、分母の共役 $1-ix$ を掛ければ

$$
\frac{ix}{1+ix}
=\frac{ix(1-ix)}{(1+ix)(1-ix)}
=\frac{x^2+ix}{1+x^2}.
$$

この実部・虚部が $E'$、$E''$ となる。$E_\infty>0,E_1>0,x>0$ なので $E',E''>0$。$\widehat\varepsilon=\varepsilon_a$ を実数として実部を取ると

$$
\operatorname{Re}\{(E'+iE'')\varepsilon_a(\cos\omega t+i\sin\omega t)\}
=\varepsilon_a(E'\cos\omega t-E''\sin\omega t).
$$

$\cos\delta=E'/|E^*|$、$\sin\delta=E''/|E^*|$ とおく。$\cos(\omega t+\delta)=\cos\omega t\cos\delta-\sin\omega t\sin\delta$ にこれらを代入すると位相式を得る。$x\to0$ では $x^2/(1+x^2),x/(1+x^2)\to0$。$x\to\infty$ では前者は $1$、後者は $0$。$\square$
<!-- proof-end -->

$E''>0$ なので、実部表示の規約では応力はひずみに対し位相 $\delta$ だけ**先行**する。例えば $E_\infty=2$ MPa、$E_1=3$ MPa、$\tau=2$ s、$\omega=0.5$ rad/s なら $x=1$ で

$$
E'=3.5\ \mathrm{MPa},\qquad E''=1.5\ \mathrm{MPa},\qquad
\tan\delta=\frac{3}{7}.
$$

定数剛性の材料なら $\sigma$ と $\varepsilon$ の山は同じ時刻に来るが、ここではずれる。どちらが先行するかは複素指数の符号規約を明示しないと取り違える。

## 5. 応力とひずみのループはどれだけの仕事を失うか

弾性ばねだけなら、伸ばすときの仕事は縮めるときに返ってくる。[Clausius–Duhem 型の受動散逸条件](../CTM10/index.md#thm-ctm10-clausius-duhem)は、等温模型の蓄積を差し引いた仕事が負にならないことを求める。周期負荷では応力とひずみの関係を一周期たどると閉じた曲線になる。その囲む面積の向き付き値を、内部の非負散逸から導こう。

<a id="prop-ctm19-energy"></a>

<!-- formal-statement-start -->
### 命題（標準線形固体の蓄積と非負散逸）

$E_\infty,E_1,\eta>0$ の標準線形固体で $\varepsilon,q$ が時間的に $C^1$ 級なら、単位基準体積当たりの蓄積エネルギー $\psi$ と散逸率 $\mathcal D$ を

$$
\psi=\frac12 E_\infty\varepsilon^2+\frac{q^2}{2E_1},
\qquad
\mathcal D=\frac{q^2}{\eta}\ge0
$$

としたとき、各滑らかな時刻で

$$
\sigma\dot\varepsilon=\dot\psi+\mathcal D
$$

が成立する。これは理想ステップの瞬間を含めた一般化関数の等式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

二本のばねだけがエネルギーを蓄え、ダッシュポットは散逸を担う。内部応力 $q$ は枝のばねひずみ $q/E_1$ を表すため、そのばねのエネルギーは $q^2/(2E_1)$ である。

<!-- proof-start -->
### 証明

$\psi$ を微分し、[枝の速度方程式](#def-ctm19-sls)を使うと

$$
\dot\psi=E_\infty\varepsilon\dot\varepsilon+\frac q{E_1}\dot q
=E_\infty\varepsilon\dot\varepsilon+\frac q{E_1}
\left(E_1\dot\varepsilon-\frac q\tau\right).
$$

右辺を二項ずつに分け、$\eta=E_1\tau$ を代入すると

$$
\dot\psi=(E_\infty\varepsilon+q)\dot\varepsilon
-\frac{q^2}{E_1\tau}
=\sigma\dot\varepsilon-\frac{q^2}{\eta}.
$$

$E_1,\eta>0$ より $\psi\ge0$、$\mathcal D\ge0$。単位は $\psi$ が Pa = J/m$^3$、$\mathcal D$ が Pa/s = W/m$^3$。$\square$
<!-- proof-end -->

<a id="thm-ctm19-loop"></a>

<!-- formal-statement-start -->
### 定理（定常一周期の仕事と損失弾性率）

$E_\infty,E_1,\eta>0$ の標準線形固体に、$\omega>0$、$\varepsilon_a>0$ の定常周期ひずみ $\varepsilon(t)=\varepsilon_a\cos\omega t$ を与える。周期 $T=2\pi/\omega$ に外部が材料へ与える単位体積当たりの仕事は

$$
W_{\mathrm{cycle}}=\int_{t_0}^{t_0+T}\sigma(t)\dot\varepsilon(t)\,dt
=\oint\sigma\,d\varepsilon=\pi E''(\omega)\varepsilon_a^2>0.
$$

これは応力–ひずみ閉曲線の囲む幾何学的面積に等しく、蓄積エネルギーの一周期増分は零、内部散逸の一周期積分と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

$\dot\varepsilon=-\omega\varepsilon_a\sin\omega t$ を応力の同相・直交成分に掛ける。同相成分の積分は零、直交成分は $\sin^2$ の平均 $1/2$ を生む。さらにエネルギー収支を一周期積分すると、内部の $q^2/\eta$ と同じ正の値になる。

<!-- proof-start -->
### 証明

[貯蔵・損失応答](#thm-ctm19-dynamic)を用いると

$$
\sigma\dot\varepsilon
=\varepsilon_a(E'\cos\omega t-E''\sin\omega t)
(-\omega\varepsilon_a\sin\omega t).
$$

積を分けて時間積分し、$\theta=\omega t$ と変数を換える。$t_0$ の取り方によらず全周期で

$$
\int_{t_0}^{t_0+T}\cos\omega t\sin\omega t\,dt=0,
\qquad
\int_{t_0}^{t_0+T}\sin^2\omega t\,dt=\frac T2=\frac\pi\omega.
$$

従って

$$
W_{\mathrm{cycle}}
=-\omega\varepsilon_a^2 E'\cdot0
+\omega\varepsilon_a^2 E''\frac{\pi}{\omega}
=\pi E''\varepsilon_a^2.
$$

幾何学的な面積との対応も確かめる。横軸を $\varepsilon$、縦軸を $\sigma$ とすると、[周期応答式](#thm-ctm19-dynamic)から

$$
\frac{(\sigma-E'\varepsilon)^2}{(E''\varepsilon_a)^2}
+\frac{\varepsilon^2}{\varepsilon_a^2}=1
$$

となり、$E''>0$ のとき閉曲線は楕円である。変数変換 $u=\varepsilon/\varepsilon_a$、$v=(\sigma-E'\varepsilon)/(E''\varepsilon_a)$ は、上の楕円方程式を $u^2+v^2=1$ に変える。逆変換は

$$
\varepsilon=\varepsilon_a u,\qquad
\sigma=\varepsilon_a(E'u+E''v)
$$

であり、$(u,v)$ から $(\varepsilon,\sigma)$ への線形写像は標準基底で次の行列を持つ。その行列式を計算すると

$$
\det\begin{pmatrix}
\varepsilon_a&0\\
E'\varepsilon_a&E''\varepsilon_a
\end{pmatrix}
=E''\varepsilon_a^2>0.
$$

$\varepsilon_a>0$ と $E''>0$ で変換は可逆であり、面積は行列式の絶対値だけ拡大する。したがって単位円の面積 $\pi$ を戻した楕円の面積は $\pi E''\varepsilon_a^2$。向きも、$\theta=0$ で右端点から下向きに進むので $\oint\sigma\,d\varepsilon>0$ と一致する。

最後に、[$\psi$ と $\mathcal D$ の分解](#prop-ctm19-energy)を $t_0$ から $t_0+T$ まで積分する。定常周期解では $\varepsilon,q$ がともに周期 $T$ を持ち、$\Delta\psi=0$。よって

$$
W_{\mathrm{cycle}}
=\int_{t_0}^{t_0+T}\mathcal D(t)\,dt
=\int_{t_0}^{t_0+T}\frac{q(t)^2}{\eta}\,dt\ge0.
$$

$E''>0$ なので実際に正。$\square$
<!-- proof-end -->

損失弾性率の単位 Pa に無次元ひずみ振幅の二乗を掛けたため、$W_{\mathrm{cycle}}$ は J/m$^3$。**一周期の仕事**と**一秒当たりの平均散逸率**は違う。後者は $\overline{\mathcal D}=W_{\mathrm{cycle}}/T=\omega E''\varepsilon_a^2/2$ である。

## 6. どの周波数で損失が最も目立つか

[周期応答式](#thm-ctm19-dynamic)による $E''=E_1x/(1+x^2)$ は、$x$ が小さくても大きくても零へ近づく。固有の緩和時間と一周期の時間が近いと、エネルギー損失が最も目立つ。

<a id="prop-ctm19-loss-peak"></a>

<!-- formal-statement-start -->
### 命題（単一緩和時間模型の損失弾性率のピーク）

$E_\infty,E_1,\eta>0$ を固定した標準線形固体で、$\tau=\eta/E_1$ とし、角周波数 $\omega$ を $(0,\infty)$ 上で動かす。このとき損失弾性率 $E''(\omega)$ は $\omega\tau=1$ において唯一の最大値 $E_1/2$ を取る。これは固定ひずみ振幅の**一周期損失**のピークであって、固定振幅の**平均散逸率**が最大となる周波数を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

$x=\omega\tau$ で一変数関数を微分し、$x<1$ と $x>1$ で符号を見る。

<!-- proof-start -->
### 証明

$x>0$ に対して

$$
\frac{d}{dx}\left(\frac{x}{1+x^2}\right)
=\frac{(1+x^2)-2x^2}{(1+x^2)^2}
=\frac{1-x^2}{(1+x^2)^2}.
$$

$0<x<1$ では正、$x>1$ では負。端では $E''\to0$ だから唯一の大域最大は $x=1$、値は $E_1/(1+1)=E_1/2$。一方、[周期当たりの仕事](#thm-ctm19-loop)を周期 $2\pi/\omega$ で割ると

$$
\overline{\mathcal D}
=\frac{\omega\varepsilon_a^2 E_1}{2}
\frac{\omega\tau}{1+\omega^2\tau^2}.
$$

固定 $\varepsilon_a$ に対し $x=\omega\tau$ とおく。平均散逸率と、その周波数依存部分の微分は

$$
\overline{\mathcal D}=\frac{E_1\varepsilon_a^2}{2\tau}\frac{x^2}{1+x^2},\qquad
\frac{d}{dx}\left(\frac{x^2}{1+x^2}\right)=\frac{2x}{(1+x^2)^2}>0.
$$

ゆえに平均散逸率は $x>0$ で単調増加し、$\omega\to\infty$ の極限 $E_1\varepsilon_a^2/(2\tau)$ は上限であって有限周波数では達しない。したがって $E''$ のピーク $\omega\tau=1$ は、平均散逸率のピークではない。$\square$
<!-- proof-end -->

例えば $E_\infty=2$ MPa、$E_1=3$ MPa、$\tau=2$ s を固定すると次の比較になる（角周波数は $\omega=x/\tau$）。

| $\omega\tau$ | $E'$ (MPa) | $E''$ (MPa) | ひずみ振幅 $0.01$ の一周期損失 (J/m$^3$) |
| --- | ---: | ---: | ---: |
| $0.1$ | $2.0297$ | $0.2970$ | $29.70\pi$ |
| $1$ | $3.5$ | $1.5$ | $150\pi$ |
| $10$ | $4.9703$ | $0.2970$ | $29.70\pi$ |

ここでは周波数を変えたときの**位相差・ループ面積**の対応を解析式と表で検証できる。速度・時間刻み・数値積分法による誤差を導入せず比較できるため、追加の動的プレイヤーは置かない。

## 7. 演習

特記しない限り、すべて等温・一次元・小変形・準静的、$E_\infty,E_1,\eta>0$、$\tau=\eta/E_1$、$E_0=E_\infty+E_1$ とする。ステップ入力はその瞬間と後続の滑らかな時間区間を分ける。周期入力は過渡応答が消えた後の定常状態を扱い、$\omega>0$ とする。

### Level A

### A1. 三定数と緩和曲線

$E_\infty=2$ MPa、$E_1=4$ MPa、$\eta=8$ MPa s の標準線形固体に、初期零状態からひずみステップ $\varepsilon_0=0.01$ を課す。$\tau,E_0,\sigma(0+),\sigma(2\ {\rm s}),\lim_{t\to\infty}\sigma(t)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[緩和関数の定理](#thm-ctm19-history)へ係数を代入すると $\tau=\eta/E_1=8/4=2$ s、$E_0=2+4=6$ MPa で

$$
G(t)=2+4e^{-t/2}\quad(\mathrm{MPa}).
$$

応力は $\sigma=0.01G$ だから

$$
\sigma(0+)=60\ \mathrm{kPa},\quad
\sigma(2)=(20+40e^{-1})\ \mathrm{kPa}\simeq34.72\ \mathrm{kPa},\quad
\sigma(\infty)=20\ \mathrm{kPa}.
$$

応力は $0$ にならず、並列ばね $E_\infty$ が長時間荷重を支える。
<!-- solution-end -->

### A2. 複素弾性率を二つの実数へ

$E_\infty=1$ MPa、$E_1=4$ MPa、$\tau=0.5$ s、$\omega=2$ rad/s とする。$x,E',E'',|E^*|$ と応力がひずみに先行する位相 $\delta$ の $\tan\delta$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[貯蔵・損失の定理](#thm-ctm19-dynamic)で $x=\omega\tau=2(0.5)=1$。従って

$$
E'=1+4\frac{1}{2}=3\ \mathrm{MPa},\qquad
E''=4\frac{1}{2}=2\ \mathrm{MPa}.
$$

絶対値は $\sqrt{3^2+2^2}=\sqrt{13}$ MPa、$\tan\delta=E''/E'=2/3$。$E''>0$ なので $e^{+i\omega t}$ の規約では応力が先行する。
<!-- solution-end -->

### A3. ループ面積の単位

正弦ひずみ振幅 $\varepsilon_a=0.01$、その角周波数で $E''=1.5$ MPa の材料の一周期損失密度を求めよ。結果の単位を明記せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[一周期の仕事](#thm-ctm19-loop)を使い、$1.5$ MPa $=1.5\times10^6$ Pa と変換する。

$$
W_{\mathrm{cycle}}=\pi(1.5\times10^6)(0.01)^2
=150\pi\simeq471.24\ \mathrm{J/m^3}.
$$

ひずみは無次元、Pa = J/m$^3$ なので単位も一致する。角周波数がないと平均散逸率（W/m$^3$）は決められない。
<!-- solution-end -->

### A4. 損失ピークから時定数を読む

ある三定数の標準線形固体では、$E''$ の最大が $\omega_p=4$ rad/s に現れ、最大値は $1.5$ MPa だった。$\tau$ と $E_1$ を決めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[単一緩和時間模型の損失弾性率のピーク](#prop-ctm19-loss-peak)より $\omega_p\tau=1$、従って $\tau=1/4=0.25$ s。さらに $E''_{\max}=E_1/2=1.5$ MPa から $E_1=3$ MPa。$\eta=E_1\tau=0.75$ MPa s も得られるが、$E_\infty$ はこの二つの観測だけでは定まらない。
<!-- solution-end -->

### A5. エネルギーと散逸の区別

ある瞬間に $\varepsilon=0.01$、$q=2000$ Pa、$E_\infty=2\times10^6$ Pa、$E_1=3\times10^6$ Pa、$\eta=4\times10^6$ Pa s とする。$\psi$ と $\mathcal D$ を計算し、両者の単位を比較せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[エネルギー分解命題](#prop-ctm19-energy)に値を代入する。並列ばねの分は $(2\times10^6)(10^{-2})^2/2=100$ J/m$^3$。Maxwell 枝のばね分は

$$
\frac{q^2}{2E_1}=\frac{(2000)^2}{2(3\times10^6)}
=\frac23\ \mathrm{J/m^3}.
$$

従って $\psi=100+\frac23$ J/m$^3$。ダッシュポットの散逸率は

$$
\mathcal D=\frac{(2000)^2}{4\times10^6}=1\ \mathrm{W/m^3}.
$$

$\psi$ はその時点の蓄積量、$\mathcal D$ は単位時間で散逸する率であり、数値だけで大小比較しない。
<!-- solution-end -->

### Level B

### B1. 複素式を実測時間波形へ戻す

$E_\infty=1$ MPa、$E_1=4$ MPa、$\tau=0.5$ s、$\omega=4$ rad/s、$\varepsilon_a=0.02$ とする。応力の定常周期波形 $\sigma(t)$ と一周期損失を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$x=\omega\tau=4(0.5)=2$。[標準線形固体の貯蔵弾性率と損失弾性率](#thm-ctm19-dynamic)から

$$
E'=1+4\frac{2^2}{1+2^2}=4.2\ \mathrm{MPa},
\qquad
E''=4\frac{2}{1+2^2}=1.6\ \mathrm{MPa}.
$$

$e^{+i\omega t}$ の実部を取るので

$$
\sigma(t)=0.02[4.2\cos(4t)-1.6\sin(4t)]\ \mathrm{MPa}
=84\cos(4t)-32\sin(4t)\quad(\mathrm{kPa}).
$$

[周期仕事公式](#thm-ctm19-loop)へ $E''=1.6\times10^6$ Pa、$\varepsilon_a^2=0.0004$ を代入して

$$
W_{\mathrm{cycle}}=\pi(1.6\times10^6)(0.0004)=640\pi\ \mathrm{J/m^3}.
$$

虚部の項を正の $\sin$ と書くと位相と仕事の符号を逆転させるので注意する。
<!-- solution-end -->

### B2. 矩形のひずみ履歴と残留応力

初期零状態の標準線形固体へ、時刻 $0$ で $\varepsilon_0>0$ のひずみを課し、$0<t<T$ は保持し、時刻 $T>0$ に元の零ひずみへ瞬時に戻してそのまま保持する。$0<t<T$ と $t>T$ の応力、および $\sigma(T-),\sigma(T+),\lim_{t\to\infty}\sigma(t)$ を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

初回の跳びは [緩和定理](#thm-ctm19-history)から $\varepsilon_0G(t)$。$T$ でひずみを $-\varepsilon_0$ だけ跳ばせた寄与は、線形性により、後続時間には $-\varepsilon_0G(t-T)$。ゆえに

$$
\sigma(t)=
\begin{cases}
\varepsilon_0(E_\infty+E_1e^{-t/\tau}),&0<t<T,\\
\varepsilon_0E_1(e^{-t/\tau}-e^{-(t-T)/\tau}),&t>T.
\end{cases}
$$

$T$ の直前は

$$
\sigma(T-)=\varepsilon_0(E_\infty+E_1e^{-T/\tau}).
$$

直後は

$$
\sigma(T+)=\varepsilon_0E_1(e^{-T/\tau}-1)<0.
$$

応力跳びは $\sigma(T+)-\sigma(T-)=-E_0\varepsilon_0$。内部応力 $q$ が除荷後に負になって緩和するため、零ひずみに戻しても一時的に圧縮応力が残る。$t\to\infty$ では二つの指数関数がともに零へ行き、応力も零へ戻る。理想ステップ瞬間の有限な跳びは、ダッシュポット自身が瞬時に変形したことを意味しない。
<!-- solution-end -->

### B3. 内部散逸から周期仕事を独立に求める

正弦ひずみ $\varepsilon_a\cos\omega t$ を与えた標準線形固体について、内部応力の振幅 $|\widehat q|$ を求め、$\int_0^{2\pi/\omega}q^2/\eta\,dt$ を計算せよ。[ループ面積定理](#thm-ctm19-loop)の値と一致することを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[複素応力の導出](#thm-ctm19-dynamic)で $\widehat\varepsilon=\varepsilon_a$ としたから

$$
\widehat q=E_1\frac{ix}{1+ix}\varepsilon_a,\qquad
|\widehat q|^2=E_1^2\frac{x^2}{1+x^2}\varepsilon_a^2,
\quad x=\omega\tau.
$$

$q(t)$ は同じ周波数の実正弦波なので、一周期での二乗平均は振幅の二乗の半分。$\theta=\omega t+\phi$ と置いて $\int_0^{2\pi}\cos^2\theta\,d\theta=\pi$ を使えば

$$
\int_0^{2\pi/\omega}\frac{q(t)^2}{\eta}\,dt
=\frac{|\widehat q|^2}{\eta}\frac{\pi}{\omega}
=\frac{\pi E_1^2x^2\varepsilon_a^2}{\eta\omega(1+x^2)}.
$$

$\eta=E_1\tau$、$x=\omega\tau$ を順に入れると

$$
\frac{E_1^2x^2}{\eta\omega(1+x^2)}
=\frac{E_1x^2}{\tau\omega(1+x^2)}
=\frac{E_1x}{1+x^2}=E''.
$$

従って結果は $\pi E''\varepsilon_a^2$。外部応力を積分する方法と内部のダッシュポット散逸を積分する方法が一致した。
<!-- solution-end -->

### B4. 緩和曲線と周波数試験で係数を同定する

ある標準線形固体の緩和試験で $G(0+)=8$ MPa、$G(\infty)=2$ MPa、$G(3\,\mathrm{s})-G(\infty)=[G(0+)-G(\infty)]/e$ を得た。$E_\infty,E_1,\tau,\eta$ と損失ピーク角周波数を求め、$\varepsilon_a=0.01$ におけるピーク周波数での一周期損失密度を算出せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[緩和関数](#thm-ctm19-history)では $G(0+)=E_\infty+E_1$、$G(\infty)=E_\infty$。よって $E_\infty=2$ MPa、$E_1=8-2=6$ MPa。指数比は

$$
\frac{G(3)-G(\infty)}{G(0+)-G(\infty)}
=e^{-3/\tau}=\frac1e.
$$

指数の単調性から $3/\tau=1$、従って $\tau=3$ s、$\eta=E_1\tau=18$ MPa s。[ピーク命題](#prop-ctm19-loss-peak)により $\omega_p=1/3$ rad/s、$E''(\omega_p)=E_1/2=3$ MPa。一周期の損失は

$$
W_{\mathrm{cycle}}=\pi(3\times10^6)(0.01)^2
=300\pi\ \mathrm{J/m^3}.
$$

$G(3)$ 自体ではなく **長時間残る分を引いた差** を緩和時間の同定に使った。
<!-- solution-end -->

### Level C

### C1. 有限時間の応力負荷・除荷をクリープから組み立てる

初期零状態の標準線形固体に、$t=0$ で正の応力 $\sigma_0$ を瞬時に与え、$0<t<T$（$T>0$）だけ保持し、時刻 $T$ に零へ除荷して保持する。$0<t<T$ と $t>T$ のひずみ、$\varepsilon(0+),\varepsilon(T-),\varepsilon(T+)$、長時間極限を求めよ。また、除荷直後にひずみが零へ戻りきらない理由と、残留ひずみが永久的かを述べ、散逸の非負性も検討せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**1. 単位応力ステップの応答。** [クリープ定理](#thm-ctm19-creep)の

$$
J(t)=\frac1{E_\infty}
+\left(\frac1{E_0}-\frac1{E_\infty}\right)e^{-t/\tau_c},
\qquad \tau_c=\frac{E_0}{E_\infty}\tau
$$

を使う。応力の大きさ $\sigma_0$ を掛けた $\sigma_0J(t)$ が初回負荷の応答である。特に $J(0+)=1/E_0$。

**2. 除荷は負のステップ。** 微分方程式は $\sigma,\varepsilon,q$ に線形で係数一定なので、時刻 $T$ に始まる $-\sigma_0$ の応力ステップを重ね合わせられる。従って、理想ステップ瞬間を除いて

$$
\varepsilon(t)=
\begin{cases}
\sigma_0J(t),&0<t<T,\\
\sigma_0[J(t)-J(t-T)],&t>T.
\end{cases}
$$

$0<t<T$ での初期値は $\varepsilon(0+)=\sigma_0/E_0$。除荷直前は

$$
\varepsilon(T-)=\frac{\sigma_0}{E_\infty}
+\sigma_0\left(\frac1{E_0}-\frac1{E_\infty}\right)e^{-T/\tau_c}.
$$

除荷後の右極限では $J(0+)=1/E_0$ を引くから

$$
\varepsilon(T+)=\varepsilon(T-)-\frac{\sigma_0}{E_0}
=\sigma_0\left(\frac1{E_\infty}-\frac1{E_0}\right)
(1-e^{-T/\tau_c})>0.
$$

ここで $E_0>E_\infty$、$T>0$ を使った。

**3. 回復の時間発展。** $t>T$ の二つの $J$ の定数項は相殺される。指数項をまとめると

$$
\varepsilon(t)=\sigma_0
\left(\frac1{E_\infty}-\frac1{E_0}\right)
(1-e^{-T/\tau_c})e^{-(t-T)/\tau_c}.
$$

従って $\lim_{t\to\infty}\varepsilon(t)=0$。最初の瞬間変形 $\sigma_0/E_0$ は除荷の瞬間に回復するが、ダッシュポットが負荷中に変形した分は瞬時には戻れず、残りは時定数 $\tau_c$ で**遅れて回復**する。Maxwell 単体の永久ひずみとは異なる。

**4. 仕事と散逸。** [非負散逸命題](#prop-ctm19-energy)では、負荷・除荷の間の各滑らかな時間区間に対し

$$
\mathcal D(t)=\frac{q(t)^2}{\eta}\ge0.
$$

したがってどちらの区間でも内部散逸が負になることはない。理想ステップの瞬間にはこの微分形の公式を無条件に使わず、実負荷では有限時間の滑らかな立ち上げ・立ち下げを考える。$t\to\infty$ では $\varepsilon,q\to0$ だから蓄積エネルギーも零へ戻るが、途中に生じた非負散逸が遡って取り消されることはない。
<!-- solution-end -->

## 8. まとめと次講への橋

- 標準線形固体は残留弾性 $E_\infty$ と緩和する Maxwell 枝を並列に持つ。緩和関数は $G(t)=E_\infty+E_1e^{-t/\tau}$。
- 初期零状態・滑らかな履歴では $\sigma(t)=\int_0^t G(t-s)\dot\varepsilon(s)\,ds$。ステップの瞬間は接続条件で別に扱う。
- 周期負荷の複素弾性率は $E^*=E'+iE''$。$E'$ は同相成分、$E''>0$ は先行・散逸成分に対応する。
- 一周期の仕事は $\pi E''\varepsilon_a^2$。内部の $q^2/\eta$ を積分しても同じ値で、単なるループの図示ではなく受動散逸と一致する。

次の CTM20 では、ここまでの**受動模型の非負散逸**を基準にして、内部からエネルギーを消費しながら力を生む**能動応力**を区別する。