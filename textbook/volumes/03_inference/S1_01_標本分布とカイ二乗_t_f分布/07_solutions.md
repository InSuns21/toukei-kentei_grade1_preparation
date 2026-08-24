# 詳細解答

## S1-A01

$Q\sim\chi^2_\nu$ では $E[Q]=\nu$、$\operatorname{Var}(Q)=2\nu$ なので、自由度6では
$$E[Q]=6,\qquad\operatorname{Var}(Q)=12.$$

## S1-A02

正規変数の平均は正規分布に従い、
$$E[\overline X]=3,\qquad\operatorname{Var}(\overline X)=\frac4{16}=\frac14.$$
従って $\overline X\sim N(3,1/4)$。

## S1-A03

正規標本で標本標準偏差を用いるため
$$\frac{\sqrt9(\overline X-\mu)}S\sim t_{9-1}=t_8.$$

## S1-A04

F分布の逆数関係から $W^{-1}\sim F_{12,5}$。自由度の順も逆になる。

## S1-B01

$X_i-\mu=(X_i-\overline X)+(\overline X-\mu)$ を代入すると
$$
\begin{aligned}
\sum_i(X_i-\mu)^2
&=\sum_i(X_i-\overline X)^2
+2(\overline X-\mu)\sum_i(X_i-\overline X)\\
&\quad+n(\overline X-\mu)^2.
\end{aligned}
$$
$\sum_i(X_i-\overline X)=\sum_iX_i-n\overline X=0$ なので交差項が消え、結論を得る。

## S1-B02

$$Q=\frac{11S^2}{9}\sim\chi^2_{11}.$$
正の数 $11/9$ を掛けると
$$
P(6\leq S^2\leq12)
=P\left(\frac{22}{3}\leq Q\leq\frac{44}{3}\right).
$$

## S1-B03

$$t=\frac{\sqrt{25}(52-50)}{10}=1,$$
自由度は $25-1=24$。

## S1-B04

母分散が等しいので
$$\frac{S_1^2}{S_2^2}\sim F_{9,15}.$$
観測比は $8/5=1.6$。

## S1-C01

**方針。** 正規標本ベクトルを平均方向と、その直交補空間である残差方向へ分ける。

1. 線形結合の正規性から
$$\overline X\sim N\left(\mu,\frac{\sigma^2}{n}\right).$$
2. $X_i-\mu=(X_i-\overline X)+(\overline X-\mu)$ を二乗して足す。交差項は残差和0により消え、
$$\sum_i(X_i-\mu)^2=\sum_i(X_i-\overline X)^2+n(\overline X-\mu)^2.$$
3. $n$ 個の残差は $\sum_i(X_i-\overline X)=0$ という一つの線形制約を満たすので、自由に動ける方向は $n-1$ 個。
4. 残差方向を直交座標化すると独立な標準正規 $n-1$ 個の平方和になるため
$$\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.$$
5. 平均方向と残差方向は直交する。多変量正規分布では直交射影成分は共分散0で独立だから、$\overline X$ と残差平方和、従って $S^2$ は独立。

## S1-C02

1. $Q=9S^2/16\sim\chi^2_9$。
2. $S^2\leq24$ は $Q\leq9\cdot24/16=13.5$ と同値なので
$$P(S^2\leq24)=P(\chi^2_9\leq13.5).$$
3. $S^2=(16/9)Q$ と $E[Q]=9$ より $E[S^2]=16$。
4. $\operatorname{Var}(Q)=18$ より
$$\operatorname{Var}(S^2)=\left(\frac{16}{9}\right)^218=\frac{512}{9}.$$
5. 上側分位点の定義と $Q=9S^2/16$ より
$$
P\left(S^2>\frac{16}{9}\chi^2_{9;0.05}\right)
=P(Q>\chi^2_{9;0.05})=0.05.
$$
すなわち真の分散が16なら、この閾値を標本分散が上回る確率は5%である。なお3より $S^2$ は不偏である。

## S1-C03

1. $\overline X\sim N(\mu,\sigma^2/n)$ だから $Z\sim N(0,1)$。
2. $Q\sim\chi^2_{n-1}$。
3. $Z$ は平均方向、$Q$ は残差方向だけの関数であり、正規標本の直交成分なので独立。
4.
$$
\frac Z{\sqrt{Q/(n-1)}}
=\frac{\sqrt n(\overline X-\mu)/\sigma}{S/\sigma}
=\frac{\sqrt n(\overline X-\mu)}S
\sim t_{n-1}.
$$
5. 観測値は $\sqrt{16}(12-10)/4=2$、自由度15。$|2|<2.131$ なので両側5%境界の内側である。

## S1-C04

1.
$$Q_j=\frac{(n_j-1)S_j^2}{\sigma_j^2}\sim\chi^2_{n_j-1}\quad(j=1,2).$$
2. 各 $Q_j$ は互いに独立な標本だけの関数なので独立。
3.
$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
=\frac{Q_1/(n_1-1)}{Q_2/(n_2-1)}
\sim F_{n_1-1,n_2-1}.
$$
4. $\sigma_1^2=\sigma_2^2$ なら $S_1^2/S_2^2\sim F_{n_1-1,n_2-1}$。
5. 観測比3は $F_{9,15;0.05}=2.59$ より大きいので、上側5%領域に入る。逆比を用いるなら分布は $F_{15,9}$ へ変わる。

## S1-C05

1. 定義の補集合より各確率は $1-\alpha$。
2. $P(W<c)=P(1/W>1/c)$。
3. $1/W\sim F_{\nu_2,\nu_1}$ なので、下側確率を自由度を逆にしたF変数の上側確率へ変換できる。特に下側 $\alpha$ 点は $1/F_{\nu_2,\nu_1;\alpha}$。
4. 上側分位点を代入すると
$$
P\left(S^2>\frac{\sigma^2}{n-1}\chi^2_{n-1;\alpha}\right)
=P(Q>\chi^2_{n-1;\alpha})=\alpha.
$$
補集合の確率は $1-\alpha$ である。
5. 「上側確率の定義を書く→分子・分母の自由度を書く→逆数なら自由度も逆にする」の3点を答案末尾で確認する。

## S1-D01

1. 標準化ベクトル $\boldsymbol Z$ と $\boldsymbol e=n^{-1/2}\boldsymbol1$ を用いる。平均成分は $\boldsymbol e\boldsymbol e^{\mathsf T}\boldsymbol Z$、残差成分は $(\boldsymbol I-\boldsymbol e\boldsymbol e^{\mathsf T})\boldsymbol Z$。
2. 後者の射影行列は対称、べき等、階数 $n-1$。直交変換後は標準正規 $n-1$ 成分の平方和となり、$(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$。
3. 二つの射影の積は0で、正規ベクトルの射影成分は独立。従って $\overline X$ と $S^2$ は独立。
4.
$$\frac{\sqrt n(\overline X-\mu)}S
=\frac{N(0,1)}{\sqrt{\chi^2_{n-1}/(n-1)}}\sim t_{n-1}.$$
5. 独立な第二標本では $Q_1,Q_2$ が独立なので
$$\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
=\frac{Q_1/(n_1-1)}{Q_2/(n_2-1)}
\sim F_{n_1-1,n_2-1}.$$

## 完成形本番答案

### S1-C01

$$
\overline X\sim N(\mu,\sigma^2/n),\qquad
\sum_i(X_i-\mu)^2=\sum_i(X_i-\overline X)^2+n(\overline X-\mu)^2.
$$
$\boldsymbol e=n^{-1/2}\boldsymbol1$、$\boldsymbol Z=((X_1-\mu)/\sigma,\ldots,(X_n-\mu)/\sigma)^{\mathsf T}$ とし、第一行が $\boldsymbol e^{\mathsf T}$ の直交行列 $\boldsymbol A$ と $\boldsymbol W=\boldsymbol A\boldsymbol Z$ を取る。残差和0により残差空間の次元は $n-1$ で、$\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol I_n)$ だから平均成分 $W_1$ と残差成分 $W_2,\ldots,W_n$ は独立である。従って
$$
\frac{(n-1)S^2}{\sigma^2}=\sum_{j=2}^nW_j^2\sim\chi^2_{n-1},\qquad
\overline X\perp S^2.
$$

### S1-C02

$$Q=9S^2/16\sim\chi^2_9,\qquad
P(S^2\leq24)=P(Q\leq13.5).$$
$S^2=(16/9)Q$ より
$$E[S^2]=16,\qquad \operatorname{Var}(S^2)=512/9.$$
また
$$P\{S^2>16\chi^2_{9;0.05}/9\}=0.05,$$
すなわち真の分散16の下でこの閾値を超える確率は5%である。

### S1-C03

$$Z=\frac{\sqrt n(\overline X-\mu)}\sigma\sim N(0,1),\qquad
Q=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},\qquad Z\perp Q.$$
よって
$$\frac{\sqrt n(\overline X-\mu)}S=\frac Z{\sqrt{Q/(n-1)}}\sim t_{n-1}.$$
$n=16,\overline x=12,s=4,\mu=10$ では $t=2$、自由度15で、$|2|<2.131$ より両側5%境界の内側である。

### S1-C04

$$Q_j=\frac{(n_j-1)S_j^2}{\sigma_j^2}\sim\chi^2_{n_j-1}$$
であり、標本間独立性から $Q_1\perp Q_2$。従って
$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
=\frac{Q_1/(n_1-1)}{Q_2/(n_2-1)}\sim F_{n_1-1,n_2-1}.
$$
等分散なら $S_1^2/S_2^2$ 自体がこの分布に従う。$n_1=10,n_2=16$ で観測比3は $F_{9,15;0.05}=2.59$ を超え、上側5%領域に入る。逆比は $F_{15,9}$。

### S1-C05

上側分位点の定義から
$$
P(\chi^2_\nu\leq\chi^2_{\nu;\alpha})=1-\alpha,
\qquad
P(F_{\nu_1,\nu_2}\leq F_{\nu_1,\nu_2;\alpha})=1-\alpha.
$$
$W\sim F_{\nu_1,\nu_2}$ なら $P(W<c)=P(W^{-1}>c^{-1})$ かつ $W^{-1}\sim F_{\nu_2,\nu_1}$。また
$$P\left(W<\frac1{F_{\nu_2,\nu_1;\alpha}}\right)=\alpha.$$
$$P\left(S^2>\frac{\sigma^2}{n-1}\chi^2_{n-1;\alpha}\right)=\alpha.$$
逆数を取ると不等号と自由度順の両方が逆になることを確認する。

### S1-D01

$\boldsymbol Z=((X_1-\mu)/\sigma,\ldots,(X_n-\mu)/\sigma)^{\mathsf T}$、$\boldsymbol e=n^{-1/2}\boldsymbol1$ とする。第一行を $\boldsymbol e^{\mathsf T}$ とする直交行列 $\boldsymbol A$ を取り、$\boldsymbol W=\boldsymbol A\boldsymbol Z$ と置くと $\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol I_n)$。従って
$$
W_1=\frac{\sqrt n(\overline X-\mu)}\sigma,\qquad
\frac{(n-1)S^2}{\sigma^2}=\sum_{j=2}^nW_j^2\sim\chi^2_{n-1},\qquad
W_1\perp(W_2,\ldots,W_n).
$$
よって $\overline X\perp S^2$ かつ $\sqrt n(\overline X-\mu)/S\sim t_{n-1}$。独立な第二標本についても同様に $Q_j\sim\chi^2_{n_j-1}$ を作れば、標準化分散比は $F_{n_1-1,n_2-1}$ に従う。

## 小問別採点

Level C/Dは各小問5点。分布名2点、標準化式・自由度2点、根拠または解釈1点を基本とする。後半の境界判断では比較式3点、領域判断2点を独立に配点する。

### 3分・15分・25分判断

| ID | 3分 | 15分 | 25分 |
|---|---|---|---|
| C01 | 平方和分解を想起できれば選択 | $\chi^2$ と自由度までなら継続 | 独立性を一文で閉じる |
| C02 | $Q=9S^2/16$ を書ければ選択 | 確率変形と平均・分散までなら継続 | 上側5%閾値とその意味まで書いて提出 |
| C03 | 正規/カイ二乗の比と見抜けば選択 | 独立性を含むt構成までなら継続 | $t=2$ と境界 $2.131$ を比較して提出 |
| C04 | 二標本独立を確認できれば選択 | 二つの $Q_j$ とF比までなら継続 | 観測比3と上側点2.59を比較して提出 |
| C05 | 上側分位点の定義を書ければ選択 | 逆数関係までなら継続 | 標本分散への適用を提出 |
| D01 | 射影分解が見えなければ後回し | 階数 $n-1$ まで出れば継続 | tまで清書し、Fは救済式から部分点 |
