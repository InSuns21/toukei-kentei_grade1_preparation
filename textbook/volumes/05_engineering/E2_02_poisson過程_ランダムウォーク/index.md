# E2-02 ポアソン過程・ランダムウォーク

ランダムウォークは独立な増分を足し続ける離散時間モデル、ポアソン過程は連続時間上でランダムに起こる事象の件数を数えるモデルです。本章では、どちらも「増分の確率構造から全体の分布を作る」という共通の考え方で整理します。位置分布・到達確率・平均到達時間、ポアソン過程の独立定常増分・指数待ち時間・第$k$到着時刻・重ね合わせ・間引きまでを扱います。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- 単純ランダムウォークを独立増分の和として表す。
- 位置分布を二項分布へ帰着し、平均・分散を求める。
- 吸収境界への到達確率・平均到達時間の差分方程式を立てる。
- ポアソン過程の独立増分・定常増分を説明する。
- 無到着事象から最初の待ち時間が指数分布になることを導く。
- 第$k$到着時刻とガンマ分布の関係を説明する。
- 独立なポアソン過程の重ね合わせと独立間引きを扱う。
- 小区間条件からポアソン確率を導く考え方を説明する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| ランダムウォーク | 独立増分、位置分布、到達問題 |
| ポアソン過程 | 独立増分、定常増分、件数分布 |
| 待ち時間 | 指数分布、第$k$到着時刻 |
| 確率過程 | 離散時間と連続時間の増分構造 |

## 前提知識チェック

1. P3-01: 二項分布、ポアソン分布。
2. P3-02: 指数分布、ガンマ分布。
3. E2-01: 一段先で条件付ける再帰方程式、マルコフ性。
4. F0-00 §12.2: ランダウ記号 $O(\cdot),o(\cdot)$。本章の第8節では特に
   $$
   r(h)=o(h)
   \quad\Longleftrightarrow\quad
   \frac{r(h)}{h}\to0\qquad(h\downarrow0)
   $$
   を使います。定義を確認したい場合は [F0-00 統計検定1級のための数学速習](../../00_foundations/F0_00_統計検定1級のための数学速習/index.md) を参照してください。

---

## 1. 単純ランダムウォーク

独立同分布な増分 $X_1,X_2,\ldots$ が
$$P(X_k=1)=p,\qquad P(X_k=-1)=q=1-p$$
を満たすとします。初期位置を $S_0$ として
$$
S_n=S_0+\sum_{k=1}^nX_k
$$
を単純ランダムウォークとします。

1回の増分の平均と分散は
$$E[X_k]=p-q=2p-1,$$
$$
\operatorname{Var}(X_k)
=E[X_k^2]-E[X_k]^2
=1-(p-q)^2
=4pq.
$$
独立性から
$$
E[S_n]=S_0+n(p-q),
$$
$$
\operatorname{Var}(S_n)=4npq.
$$

### 1.1 位置分布は二項分布へ帰着する

$n$ 回のうち右向きの回数を $B_n$ とすれば
$$B_n\sim\operatorname{Bin}(n,p).$$
右へ $B_n$ 回、左へ $n-B_n$ 回進むので
$$
S_n=S_0+B_n-(n-B_n)=S_0+2B_n-n.
$$
したがって、$S_n=s$ となるには
$$
B_n=\frac{n+s-S_0}{2}
$$
でなければならず、この値が整数で $0\le B_n\le n$ のとき
$$
P(S_n=s)
=\binom n{(n+s-S_0)/2}
 p^{(n+s-S_0)/2}
 q^{(n-s+S_0)/2}.
$$
偶奇が合わない位置には到達できません。

## 2. 吸収境界への到達確率

状態 $0,1,\ldots,N$ を動き、0と$N$を吸収状態とします。位置 $i$ から始めて、0より先に $N$ へ到達する確率を
$$
h_i=P_i(\text{$N$ に 0 より先に到達する})
$$
と書きます。

すでに0にいれば成功確率は0、すでに$N$にいれば成功確率は1なので、境界条件は
$$
h_0=0,\qquad h_N=1
$$
です。

### 2.1 なぜ再帰式が立つのか：最初の1歩で条件付ける

内部状態 $i=1,\ldots,N-1$ にいるとします。最初の1歩後の位置は二通りしかありません。

- 確率 $p$ で $i+1$ へ進む。この後に $N$ へ先に到達する確率は $h_{i+1}$。
- 確率 $q$ で $i-1$ へ進む。この後に $N$ へ先に到達する確率は $h_{i-1}$。

したがって全確率の公式より
$$
\begin{aligned}
h_i
&=P(\text{最初に右})P(\text{成功}\mid\text{最初に右})\\
&\quad+P(\text{最初に左})P(\text{成功}\mid\text{最初に左})\\
&=ph_{i+1}+qh_{i-1}.
\end{aligned}
$$
つまり
$$
\boxed{h_i=ph_{i+1}+qh_{i-1}}
$$
です。

たとえば位置3なら
$$
h_3=ph_4+qh_2
$$
です。$h_3$ を直接計算する代わりに、「最初の1歩後の状態からの同じ問題」へ分解しています。これはマルコフ連鎖で頻出する **一段先で条件付ける** 考え方です。

なお、ここには $+1$ は付きません。$h_i$ は「歩数」ではなく「成功確率」だからです。次節の平均吸収時間では、最初の1歩を実際に消費するため $+1$ が現れます。

### 2.2 対称な場合：隣り合う確率の差が一定

$p=q=1/2$ なら
$$
h_i=\frac12h_{i+1}+\frac12h_{i-1}.
$$
両辺を2倍して
$$
2h_i=h_{i+1}+h_{i-1}.
$$
ここで移項すると
$$
\boxed{h_{i+1}-h_i=h_i-h_{i-1}}.
$$
つまり、隣り合う $h_i$ の差がどこでも同じです。

差を
$$
d_i=h_i-h_{i-1}
$$
と置けば
$$
d_{i+1}=d_i.
$$
したがってすべての差が同じ値 $d$ で、
$$
h_i=h_0+id=id
$$
となります。境界条件 $h_N=1$ より
$$
Nd=1,\qquad d=\frac1N.
$$
したがって
$$
\boxed{h_i=\frac iN}.
$$

「第2差分が0だから一次式」とまとめても同じ意味ですが、実際には
$$
h_{i+1}-h_i=h_i-h_{i-1}
$$
すなわち **1次差分が一定なので $h_i$ は等差数列になる** と見ると追いやすくなります。

### 2.3 偏りがある場合：隣り合う確率の差が等比数列

$p\ne q$ の場合も、いきなり特性方程式を使わず差分を見ると構造が分かります。再帰式
$$
h_i=ph_{i+1}+qh_{i-1}
$$
と $p+q=1$ から
$$
ph_{i+1}-(p+q)h_i+qh_{i-1}=0.
$$
項をまとめると
$$
p(h_{i+1}-h_i)=q(h_i-h_{i-1}).
$$
ここで再び
$$
d_i=h_i-h_{i-1}
$$
と置くと
$$
pd_{i+1}=qd_i,
$$
したがって
$$
\boxed{d_{i+1}=\frac qp d_i}.
$$
つまり今度は差 $d_i$ が公比 $q/p$ の等比数列です。

よって
$$
d_i=\left(\frac qp\right)^{i-1}d_1.
$$
$h_0=0$ なので、差を足し戻すと
$$
\begin{aligned}
h_i
&=(h_1-h_0)+(h_2-h_1)+\cdots+(h_i-h_{i-1})\\
&=d_1\left\{1+\frac qp+\left(\frac qp\right)^2+\cdots+\left(\frac qp\right)^{i-1}\right\}.
\end{aligned}
$$
等比数列の和より
$$
h_i
=d_1\frac{1-(q/p)^i}{1-q/p}.
$$
境界条件 $h_N=1$ を使うと
$$
1=d_1\frac{1-(q/p)^N}{1-q/p}.
$$
この二式から $d_1$ を消去して
$$
\boxed{
h_i=
\frac{1-(q/p)^i}{1-(q/p)^N}
}.
$$

ここで $(q/p)^i$ が現れる理由は、$h_i$ 自体を最初から等比数列と仮定したからではありません。**隣り合う到達確率の差 $h_i-h_{i-1}$ が等比数列になるから**です。

なお、線形漸化式の特性方程式を使えば一般解
$$
h_i=A+B(q/p)^i
$$
を直接得ることもできます。試験答案ではこちらの方法も有効ですが、上の差分による導出を一度理解しておくと式の形を暗記する必要がありません。

## 3. 平均吸収時間

今度は、位置 $i$ から始めて0または$N$へ吸収されるまでの平均ステップ数を $m_i$ とします。

境界から出発した場合はすでに吸収されているので
$$
m_0=m_N=0.
$$

内部状態 $i$ からは、まず必ず1歩進みます。その1歩で

- 確率 $p$ で $i+1$ へ進み、そこから平均 $m_{i+1}$ 歩かかる。
- 確率 $q$ で $i-1$ へ進み、そこから平均 $m_{i-1}$ 歩かかる。

したがって、最初の1歩を加えて
$$
\boxed{m_i=1+pm_{i+1}+qm_{i-1}}.
$$
到達確率の再帰式との違いは、この **最初の1歩の $+1$** です。

### 3.1 対称な場合

$p=q=1/2$ なら
$$
m_i=1+\frac12m_{i+1}+\frac12m_{i-1}.
$$
2倍して整理すると
$$
m_{i+1}-2m_i+m_{i-1}=-2.
$$

ここでも差を使います。
$$
d_i=m_i-m_{i-1}
$$
と置けば
$$
m_{i+1}-2m_i+m_{i-1}=d_{i+1}-d_i
$$
なので
$$
d_{i+1}-d_i=-2.
$$
すなわち
$$
d_{i+1}=d_i-2.
$$
差 $d_i$ は公差 $-2$ の等差数列です。したがって
$$
d_i=d_1-2(i-1).
$$
$m_0=0$ から差を足し戻すと
$$
\begin{aligned}
m_i
&=d_1+d_2+\cdots+d_i\\
&=\sum_{k=1}^i\{d_1-2(k-1)\}\\
&=id_1-i(i-1).
\end{aligned}
$$
最後に $m_N=0$ を使うと
$$
0=Nd_1-N(N-1),
$$
したがって
$$
d_1=N-1.
$$
よって
$$
\begin{aligned}
m_i
&=i(N-1)-i(i-1)\\
&=i(N-i).
\end{aligned}
$$
したがって
$$
\boxed{m_i=i(N-i)}.
$$

「第2差分が一定なら二次式」という見方でも同じ結論ですが、到達確率と同じく **まず1次差分を置いて解く** と、途中の計算を追いやすくなります。

## 4. ポアソン過程

件数過程 $\{N(t):t\ge0\}$ が率 $\lambda>0$ のポアソン過程であるとは、次を満たすとします。

1. $N(0)=0$。
2. 重ならない時間区間の増分は独立。
3. 増分の分布は区間長だけで決まり、長さ$t$の区間の件数は
   $$
   N(s+t)-N(s)\sim\operatorname{Poisson}(\lambda t).
   $$

したがって
$$
P(N(t)=k)=e^{-\lambda t}\frac{(\lambda t)^k}{k!},
\qquad k=0,1,2,\ldots
$$
で、
$$E[N(t)]=\lambda t,\qquad\operatorname{Var}(N(t))=\lambda t.$$

## 5. 待ち時間は指数分布

最初の到着時刻を
$$T_1=\inf\{t:N(t)\ge1\}$$
とします。$T_1>t$ は時刻$t$まで到着が0件という事象と同じなので
$$
P(T_1>t)=P(N(t)=0)=e^{-\lambda t}.
$$
したがって
$$
P(T_1\le t)=1-e^{-\lambda t},
$$
すなわち
$$
\boxed{T_1\sim\operatorname{Exp}(\lambda)}.
$$

ポアソン過程の独立定常増分から、到着間隔
$$W_k=T_k-T_{k-1},\qquad T_0=0$$
は独立同分布の指数分布になります。

## 6. 第$k$到着時刻

$$T_k=W_1+\cdots+W_k$$
なので、独立な率$\lambda$の指数分布の和として
$$
\boxed{T_k\sim\operatorname{Gamma}(k,\lambda)}
$$
です。本教材ではガンマ分布は shape-rate 表示です。

別の見方では
$$
P(T_k>t)=P(N(t)\le k-1)
=\sum_{j=0}^{k-1}e^{-\lambda t}\frac{(\lambda t)^j}{j!}.
$$
件数と待ち時間の両方から同じ分布関係を確認できます。

## 7. 重ね合わせと間引き

### 7.1 重ね合わせ

独立な率 $\lambda_1,\lambda_2$ のポアソン過程 $N_1,N_2$ を考えます。固定した時間$t$では独立なポアソン変数の和なので
$$N_1(t)+N_2(t)\sim\operatorname{Poisson}\{(\lambda_1+\lambda_2)t\}.$$
さらに増分の独立性も保たれるため、和の過程は率 $\lambda_1+\lambda_2$ のポアソン過程です。

### 7.2 間引き

率 $\lambda$ のポアソン過程の各到着に、互いに独立な印を付けるとします。各到着を確率 $r$ でA種、確率 $1-r$ でB種へ分類し、時刻 $t$ までの件数を
$$
N_A(t),\qquad N_B(t)
$$
とします。当然
$$
N_A(t)+N_B(t)=N(t)
$$
です。

#### 7.2.1 まずA種だけを見る：条件付きでは二項分布

総到着数 $N(t)=n$ を固定すると、その $n$ 個を独立にA/Bへ分類するだけなので
$$
\boxed{
N_A(t)\mid N(t)=n
\sim\operatorname{Bin}(n,r)
}.
$$

したがって全確率の公式から
$$
\begin{aligned}
P(N_A(t)=k)
&=\sum_{n=k}^\infty
P(N_A(t)=k\mid N(t)=n)P(N(t)=n)\\
&=\sum_{n=k}^\infty
\binom nk r^k(1-r)^{n-k}
e^{-\lambda t}\frac{(\lambda t)^n}{n!}.
\end{aligned}
$$

$n=k+m$ と置けば
$$
\begin{aligned}
P(N_A(t)=k)
&=e^{-\lambda t}\frac{(r\lambda t)^k}{k!}
\sum_{m=0}^\infty
\frac{\{(1-r)\lambda t\}^m}{m!}\\
&=e^{-\lambda t}\frac{(r\lambda t)^k}{k!}
e^{(1-r)\lambda t}\\
&=e^{-r\lambda t}\frac{(r\lambda t)^k}{k!}.
\end{aligned}
$$

よって固定した $t$ について
$$
\boxed{
N_A(t)\sim\operatorname{Poisson}(r\lambda t)
}.
$$
同様に
$$
N_B(t)\sim\operatorname{Poisson}\{(1-r)\lambda t\}.
$$

しかし、**ここまででは $N_A(t)$ と $N_B(t)$ が独立であることはまだ示していません。** 周辺分布がそれぞれポアソン分布だというだけでは、二つの確率変数の独立性は一般には結論できません。

#### 7.2.2 共同分布を計算して独立性を示す

$N_A(t)=k,N_B(t)=\ell$ が同時に起きるには、総到着数が
$$
N(t)=k+\ell
$$
でなければなりません。

総数 $k+\ell$ のうち、どの $k$ 個がA種になるかを選ぶので、条件付き確率は
$$
P(N_A(t)=k,N_B(t)=\ell\mid N(t)=k+\ell)
=\binom{k+\ell}{k}r^k(1-r)^\ell.
$$

したがって
$$
\begin{aligned}
&P(N_A(t)=k,N_B(t)=\ell)\\
&=P(N(t)=k+\ell)
\binom{k+\ell}{k}r^k(1-r)^\ell\\
&=e^{-\lambda t}
\frac{(\lambda t)^{k+\ell}}{(k+\ell)!}
\frac{(k+\ell)!}{k!\,\ell!}
r^k(1-r)^\ell\\
&=e^{-\lambda t}
\frac{(r\lambda t)^k}{k!}
\frac{\{(1-r)\lambda t\}^\ell}{\ell!}.
\end{aligned}
$$

ここで
$$
e^{-\lambda t}
=e^{-r\lambda t}e^{-(1-r)\lambda t}
$$
なので
$$
\begin{aligned}
&P(N_A(t)=k,N_B(t)=\ell)\\
&=
\left[
e^{-r\lambda t}
\frac{(r\lambda t)^k}{k!}
\right]
\left[
e^{-(1-r)\lambda t}
\frac{\{(1-r)\lambda t\}^\ell}{\ell!}
\right]\\
&=P(N_A(t)=k)P(N_B(t)=\ell).
\end{aligned}
$$

したがって $N_A(t)$ と $N_B(t)$ は独立です。

少し意外ですが、$N(t)=n$ を条件付けた後では
$$
N_B(t)=n-N_A(t)
$$
なので両者は独立ではありません。**総数 $N(t)$ 自体もポアソン分布でランダムに動くことによって、条件を外した後のA件数とB件数が独立になる**というのが間引きの重要な点です。

#### 7.2.3 「各時刻でポアソン」だけでなく、過程としてポアソンになる理由

ポアソン過程であるためには、固定した時刻 $t$ の分布だけでなく、増分の性質も確認する必要があります。

任意の区間
$$
I=(s,s+u]
$$
を考えます。元の過程のこの区間内の到着数は
$$
N(s+u)-N(s)
\sim\operatorname{Poisson}(\lambda u).
$$
この区間内の各到着を同じように確率 $r$ でA種へ分類すれば、先ほどと全く同じ計算から
$$
N_A(s+u)-N_A(s)
\sim\operatorname{Poisson}(r\lambda u).
$$
したがってA種の増分分布は区間の長さ $u$ だけで決まり、**定常増分**を持ちます。

さらに、互いに重ならない区間 $I_1,I_2,\ldots$ では、元のポアソン過程の件数増分が独立です。しかも各到着に付けるA/Bの印も互いに独立なので、各区間のA種件数も独立になります。したがってA種過程は **独立増分**も持ちます。

よって
$$
\{N_A(t)\}\text{ は率 }r\lambda\text{ のポアソン過程}
$$
です。同様に
$$
\{N_B(t)\}\text{ は率 }(1-r)\lambda\text{ のポアソン過程}
$$
です。

さらに、任意の共通の時間分割ごとに上の共同分布の因数分解が成り立ち、異なる区間どうしの増分も独立なので、A種過程とB種過程は **過程としても互いに独立**です。

これをポアソン過程の **間引き**（thinning）または **分割**（splitting）と呼びます。

## 8. 小区間条件からの構成

第4節では
$$
N(t)\sim\operatorname{Poisson}(\lambda t)
$$
を定義の一部として使いました。一方、ポアソン過程をもっと「局所的な発生規則」から定義する流儀もあります。

ここでは $N(0)=0$、独立定常増分を持つ件数過程について、短い時間 $h>0$ で
$$
P(N(h)=1)=\lambda h+o(h)
$$
および
$$
P(N(h)\ge2)=o(h)
$$
を仮定します。

意味としては、

- 1件起こる確率は、時間長 $h$ に比例して約 $\lambda h$。
- 2件以上まとめて起こる確率は、$h$ に比べてさらに小さい。

ということです。

E2-01 の連続時間マルコフ連鎖で使った
$$
P(h)=I+hQ+o(h)
$$
と同じく、**非常に短い時間での一次近似から全時間の分布を作る**という考え方です。

### 8.1 まず「0件」の短時間確率を作る

確率の総和は1なので
$$
P(N(h)=0)
=1-P(N(h)=1)-P(N(h)\ge2).
$$
仮定を代入すると
$$
\begin{aligned}
P(N(h)=0)
&=1-\{\lambda h+o(h)\}-o(h)\\
&=1-\lambda h+o(h).
\end{aligned}
$$

したがって小区間では
$$
\begin{cases}
P(N(h)=0)=1-\lambda h+o(h),\\
P(N(h)=1)=\lambda h+o(h),\\
P(N(h)\ge2)=o(h).
\end{cases}
$$

この3本が、以下の微分方程式を作る材料になります。

### 8.2 0件確率 $p_0(t)$ の微分方程式

$$
p_k(t)=P(N(t)=k)
$$
と置きます。

$t+h$ まで0件であるためには、

1. 時刻 $t$ まで0件。
2. その後の区間 $(t,t+h]$ でも0件。

の両方が必要です。

増分の独立性から、この二つの事象は独立です。また定常増分により、長さ $h$ の後半区間の件数分布は $N(h)$ と同じです。したがって
$$
\begin{aligned}
p_0(t+h)
&=p_0(t)P\{N(t+h)-N(t)=0\}\\
&=p_0(t)P(N(h)=0)\\
&=p_0(t)\{1-\lambda h+o(h)\}.
\end{aligned}
$$

両辺から $p_0(t)$ を引くと
$$
p_0(t+h)-p_0(t)
=-\lambda h\,p_0(t)+p_0(t)o(h).
$$
$p_0(t)$ は $0\le p_0(t)\le1$ の定数なので、$p_0(t)o(h)$ も $o(h)$ です。したがって
$$
\frac{p_0(t+h)-p_0(t)}{h}
=-\lambda p_0(t)+o(1).
$$

$h\downarrow0$ とすると
$$
\boxed{p_0'(t)=-\lambda p_0(t)}.
$$

初期条件は $N(0)=0$ より
$$
p_0(0)=1.
$$
したがって
$$
\boxed{p_0(t)=e^{-\lambda t}}.
$$

つまり、**小区間で「何も起こらない確率」が $1-\lambda h$ だけ減るという局所条件を積み上げると、有限時間での無到着確率が指数関数になる**わけです。

### 8.3 一般の $k$ 件確率：小区間で何件増えたかに分ける

$k\ge1$ とします。$t+h$ までにちょうど $k$ 件になる場合を、最後の短い区間 $(t,t+h]$ で増えた件数によって分けます。

増分を
$$
\Delta_hN(t)=N(t+h)-N(t)
$$
と書くと、厳密には
$$
\begin{aligned}
p_k(t+h)
&=\sum_{j=0}^k
P\{N(t)=k-j,\Delta_hN(t)=j\}.
\end{aligned}
$$

独立増分より
$$
P\{N(t)=k-j,\Delta_hN(t)=j\}
=p_{k-j}(t)P(N(h)=j),
$$
なので
$$
\begin{aligned}
p_k(t+h)
&=p_k(t)P(N(h)=0)\\
&\quad+p_{k-1}(t)P(N(h)=1)\\
&\quad+\sum_{j=2}^k p_{k-j}(t)P(N(h)=j).
\end{aligned}
$$

ここで最後の和は
$$
0\le
\sum_{j=2}^k p_{k-j}(t)P(N(h)=j)
\le P(N(h)\ge2)=o(h)
$$
なので、全体として $o(h)$ です。

また
$$
P(N(h)=0)=1-\lambda h+o(h),
$$
$$
P(N(h)=1)=\lambda h+o(h)
$$
です。したがって
$$
\begin{aligned}
p_k(t+h)
&=p_k(t)\{1-\lambda h+o(h)\}\\
&\quad+p_{k-1}(t)\{\lambda h+o(h)\}+o(h)\\
&=p_k(t)(1-\lambda h)
+p_{k-1}(t)\lambda h+o(h).
\end{aligned}
$$

この式で重要なのは、一次の精度では

- $t$ までにすでに $k$ 件で、最後の区間では0件。
- $t$ までに $k-1$ 件で、最後の区間で1件。

の2通りだけが残り、**最後の区間で2件以上起こる場合は $o(h)$ に吸収される**ことです。

両辺から $p_k(t)$ を引き、$h$ で割ると
$$
\frac{p_k(t+h)-p_k(t)}{h}
=-\lambda p_k(t)+\lambda p_{k-1}(t)+o(1).
$$

よって $h\downarrow0$ で
$$
\boxed{
p_k'(t)
=-\lambda p_k(t)+\lambda p_{k-1}(t),
\qquad k\ge1
}.
$$

これは「$k$ 件状態への流入」と「$k$ 件状態からの流出」の差と見ることもできます。

### 8.4 微分方程式を実際に解く

ここで「順に解く」とだけ書くと飛躍が残るので、積分因子を使って実際に解きます。

すでに
$$
p_0(t)=e^{-\lambda t}
$$
が分かっています。

まず $k=1$ では
$$
p_1'(t)+\lambda p_1(t)
=\lambda p_0(t)
=\lambda e^{-\lambda t}.
$$
両辺に積分因子 $e^{\lambda t}$ を掛けると
$$
\frac{d}{dt}\{e^{\lambda t}p_1(t)\}
=\lambda.
$$
$N(0)=0$ なので $p_1(0)=0$。したがって0から$t$まで積分して
$$
e^{\lambda t}p_1(t)=\lambda t,
$$
よって
$$
\boxed{p_1(t)=e^{-\lambda t}\lambda t}.
$$

次に一般の $k$ を考えます。帰納法で
$$
p_{k-1}(t)
=e^{-\lambda t}\frac{(\lambda t)^{k-1}}{(k-1)!}
$$
まで分かっているとします。

微分方程式
$$
p_k'(t)+\lambda p_k(t)
=\lambda p_{k-1}(t)
$$
に $e^{\lambda t}$ を掛けると
$$
\begin{aligned}
\frac{d}{dt}\{e^{\lambda t}p_k(t)\}
&=\lambda e^{\lambda t}p_{k-1}(t)\\
&=\lambda\frac{(\lambda t)^{k-1}}{(k-1)!}\\
&=\frac{\lambda^k t^{k-1}}{(k-1)!}.
\end{aligned}
$$

$k\ge1$ では $p_k(0)=0$ なので、0から$t$まで積分して
$$
\begin{aligned}
e^{\lambda t}p_k(t)
&=\int_0^t
\frac{\lambda^k s^{k-1}}{(k-1)!}\,ds\\
&=\frac{\lambda^k t^k}{k!}.
\end{aligned}
$$

したがって
$$
\boxed{
p_k(t)
=e^{-\lambda t}\frac{(\lambda t)^k}{k!}
}.
$$

よって小区間条件と独立定常増分から
$$
\boxed{
N(t)\sim\operatorname{Poisson}(\lambda t)
}
$$
が導かれました。

流れをまとめると
$$
\boxed{
\begin{array}{c}
P(N(h)=1)=\lambda h+o(h),\\
P(N(h)\ge2)=o(h)
\end{array}
}
$$
$$
\Downarrow
$$
$$
P(N(h)=0)=1-\lambda h+o(h)
$$
$$
\Downarrow
$$
$$
\begin{cases}
p_0'=-\lambda p_0,\\
p_k'=-\lambda p_k+\lambda p_{k-1}\quad(k\ge1)
\end{cases}
$$
$$
\Downarrow
$$
$$
\boxed{
p_k(t)=e^{-\lambda t}\dfrac{(\lambda t)^k}{k!}
}.
$$

---

## 9. 演習：問題の直後に解答

### Level A：基礎部品

#### E2-02-A01 ランダムウォークの平均と分散
- level: A
- minutes: 8
- topics: ランダムウォーク
- techniques: 独立和
- calculation_load: low

$S_0=0$、右へ1進む確率 $p=0.6$、左へ1進む確率0.4の単純ランダムウォークについて $E[S_{10}]$ と $\operatorname{Var}(S_{10})$ を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
1歩の増分を $X$ とすると
$$
P(X=1)=0.6,\qquad P(X=-1)=0.4.
$$
したがって
$$
E[X]=1\cdot0.6+(-1)\cdot0.4=0.2.
$$
また $X^2=1$ は常に成り立つので
$$
E[X^2]=1.
$$
よって
$$
\operatorname{Var}(X)
=E[X^2]-E[X]^2
=1-0.2^2
=0.96.
$$

$S_{10}=X_1+\cdots+X_{10}$ で、増分は独立同分布です。したがって期待値の線形性から
$$
E[S_{10}]
=\sum_{j=1}^{10}E[X_j]
=10\cdot0.2=2.
$$
分散については独立性により共分散項が0なので
$$
\operatorname{Var}(S_{10})
=\sum_{j=1}^{10}\operatorname{Var}(X_j)
=10\cdot0.96
=9.6.
$$
ここで分散を足せるのは **増分が独立だから** です。
###### 本番答案
1歩増分 $X$ について $E[X]=0.2,E[X^2]=1$ より $\operatorname{Var}(X)=0.96$。独立な10増分の和なので
$$E[S_{10}]=2,\qquad\operatorname{Var}(S_{10})=9.6.$$
###### 採点基準
1歩平均5点、1歩分散7点、和の平均4点、独立性を用いた和の分散4点。合計20点。
<!-- solution-end -->

#### E2-02-A02 位置分布
- level: A
- minutes: 8
- topics: ランダムウォーク
- techniques: 二項分布
- calculation_load: medium

$S_0=0,p=1/2$ の単純ランダムウォークについて $P(S_6=2)$ を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
6歩のうち右へ進んだ回数を $B_6$ とします。各歩は独立で、右へ進む確率は $1/2$ なので
$$
B_6\sim\operatorname{Bin}(6,1/2).
$$
右へ $B_6$ 回、左へ $6-B_6$ 回進むから
$$
S_6=B_6-(6-B_6)=2B_6-6.
$$
したがって
$$
S_6=2
\quad\Longleftrightarrow\quad
2B_6-6=2
\quad\Longleftrightarrow\quad
B_6=4.
$$
よって
$$
P(S_6=2)
=P(B_6=4)
=\binom64(1/2)^4(1/2)^2
=\frac{15}{64}.
$$
###### 本番答案
$B_6\sim\operatorname{Bin}(6,1/2)$、$S_6=2B_6-6$ より $S_6=2\iff B_6=4$。したがって $15/64$。
###### 採点基準
二項変数4点、位置との関係6点、回数4点、確率6点。合計20点。
<!-- solution-end -->

#### E2-02-A03 ポアソン件数
- level: A
- minutes: 7
- topics: ポアソン過程
- techniques: ポアソン確率
- calculation_load: low

率3件/時間のポアソン過程で、20分間にちょうど2件起こる確率を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
20分は $1/3$ 時間です。率が3件/時間なので、長さ $t$ の区間の件数は
$$
N(t)\sim\operatorname{Poisson}(3t).
$$
したがって
$$
N(1/3)\sim\operatorname{Poisson}(1).
$$
よって
$$
P(N(1/3)=2)
=e^{-1}\frac{1^2}{2!}
=\frac{e^{-1}}2.
$$
「平均件数が1だから」だけでなく、**区間長 $t$ に対するポアソン母数が $\lambda t$** であることを明示して使います。
###### 本番答案
20分は $1/3$ 時間で、$N(1/3)\sim\operatorname{Poisson}(3\cdot1/3)=\operatorname{Poisson}(1)$。したがって $e^{-1}/2$。
###### 採点基準
時間換算5点、母数 $\lambda t$ 5点、分布4点、確率6点。合計20点。
<!-- solution-end -->

#### E2-02-A04 最初の待ち時間
- level: A
- minutes: 7
- topics: 待ち時間
- techniques: 無到着事象
- calculation_load: low

率3件/時間のポアソン過程で最初の到着まで20分を超える確率を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
最初の到着時刻を $T_1$ とします。20分は $1/3$ 時間なので
$$
T_1>1/3
$$
という事象は「最初の $1/3$ 時間に到着が1件もない」という事象と同じです。すなわち
$$
\{T_1>1/3\}=\{N(1/3)=0\}.
$$
A03と同じく
$$
N(1/3)\sim\operatorname{Poisson}(1)
$$
だから
$$
P(T_1>1/3)
=P(N(1/3)=0)
=e^{-1}.
$$
指数分布の生存関数を直接暗記して代入するより、**待ち時間の事象を件数の事象に読み替える**ことが本質です。
###### 本番答案
$T_1>1/3\iff N(1/3)=0$、かつ $N(1/3)\sim\operatorname{Poisson}(1)$ より $e^{-1}$。
###### 採点基準
事象の同値10点、時間換算4点、件数分布と確率6点。合計20点。
<!-- solution-end -->

#### E2-02-A05 独立増分と定常増分を読む
- level: A
- minutes: 9
- topics: ポアソン過程
- techniques: 独立増分, 定常増分
- calculation_load: low

率 $\lambda$ のポアソン過程 $N(t)$ について
$$
Y_1=N(2)-N(1),\qquad
Y_2=N(4)-N(2),\qquad
Y_3=N(5)-N(4)
$$
とする。

1. $Y_1,Y_2,Y_3$ の分布をそれぞれ答えよ。
2. $Y_1,Y_2,Y_3$ は互いに独立か。
3. $Y_1$ と $Y_3$ が同じ分布になる理由を「定常増分」という言葉を使って説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$Y_1,Y_2,Y_3$ はそれぞれ区間 $(1,2],(2,4],(4,5]$ の到着件数です。区間長は順に1,2,1なので、定常増分から
$$
Y_1\sim\operatorname{Poisson}(\lambda),
$$
$$
Y_2\sim\operatorname{Poisson}(2\lambda),
$$
$$
Y_3\sim\operatorname{Poisson}(\lambda).
$$

3区間は互いに重ならないので、独立増分の性質から $Y_1,Y_2,Y_3$ は互いに独立です。

$Y_1$ と $Y_3$ は異なる時刻に位置する区間の件数ですが、どちらも区間長は1です。定常増分とは「増分の分布が開始時刻ではなく区間長だけで決まる」という性質なので、両者は同じ $\operatorname{Poisson}(\lambda)$ 分布になります。
###### 本番答案
区間長が1,2,1なので $Y_1,Y_3\sim\operatorname{Poisson}(\lambda)$、$Y_2\sim\operatorname{Poisson}(2\lambda)$。区間が互いに重ならないため3変数は独立。$Y_1,Y_3$ が同分布なのは定常増分による。
###### 採点基準
各分布8点、独立増分6点、定常増分の説明6点。合計20点。
<!-- solution-end -->

### Level B：標準技能の組合せ

#### E2-02-B01 対称ランダムウォークの到達確率
- level: B
- minutes: 13
- topics: 到達確率
- techniques: 差分方程式
- calculation_load: medium

状態$0,1,\ldots,8$を対称ランダムウォークし、0と8を吸収状態とする。位置3から始めて8へ0より先に到達する確率を、再帰式から求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$h_i$を8へ先に到達する確率とすると
$$h_0=0,h_8=1,$$
$$h_i=\frac12h_{i+1}+\frac12h_{i-1}.$$
したがって
$$h_{i+1}-h_i=h_i-h_{i-1}.$$
差 $d_i=h_i-h_{i-1}$ は一定なので $h_i=h_0+id=id$。$h_8=1$ より $8d=1$、したがって
$$h_i=\frac{i}{8}.$$
よって
$$h_3=\frac38.$$
###### 本番答案
$2h_i=h_{i+1}+h_{i-1}$ より隣接差は一定。境界 $h_0=0,h_8=1$ から $h_i=i/8$、したがって $3/8$。
###### 採点基準
境界4点、再帰式6点、差分一定の導出5点、代入5点。合計20点。
<!-- solution-end -->

#### E2-02-B02 平均吸収時間
- level: B
- minutes: 13
- topics: 平均到達時間
- techniques: 差分方程式
- calculation_load: medium

B01と同じ対称ランダムウォークで、位置3から0または8へ吸収されるまでの平均ステップ数を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$m_i$を平均時間とすると $m_0=m_8=0$。内部では最初の1歩を使うため
$$m_i=1+\frac12m_{i+1}+\frac12m_{i-1}.$$
したがって
$$m_{i+1}-2m_i+m_{i-1}=-2.$$
$d_i=m_i-m_{i-1}$ と置けば
$$d_{i+1}-d_i=-2,$$
したがって $d_i=d_1-2(i-1)$。$m_0=0$ から
$$m_i=id_1-i(i-1).$$
$m_8=0$ を代入すると $8d_1-8\cdot7=0$ なので $d_1=7$。よって
$$m_i=7i-i(i-1)=i(8-i).$$
したがって
$$m_3=3(8-3)=15.$$
###### 本番答案
$m_i=1+(m_{i-1}+m_{i+1})/2$ から第1差分は公差$-2$の等差数列。境界条件より $m_i=i(8-i)$、したがって15。
###### 採点基準
境界4点、再帰式6点、第1差分の導出5点、値5点。合計20点。
<!-- solution-end -->

#### E2-02-B03 第3到着時刻
- level: B
- minutes: 12
- topics: 第k到着時刻
- techniques: 件数との同値
- calculation_load: medium

率2件/時間のポアソン過程で第3到着時刻を$T_3$とする。$P(T_3>1)$ を件数分布を使って求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
第3到着が1時間を超えるということは、1時間以内にまだ3件目が来ていないということです。したがって
$$
\{T_3>1\}=\{N(1)\le2\}.
$$
率が2件/時間なので
$$
N(1)\sim\operatorname{Poisson}(2).
$$
よって
$$
\begin{aligned}
P(T_3>1)
&=P(N(1)\le2)\\
&=\sum_{j=0}^2e^{-2}\frac{2^j}{j!}\\
&=e^{-2}\left(1+2+\frac{2^2}{2}\right)\\
&=5e^{-2}.
\end{aligned}
$$
###### 本番答案
$T_3>1\iff N(1)\le2$、$N(1)\sim\operatorname{Poisson}(2)$ より $5e^{-2}$。
###### 採点基準
事象同値8点、分布4点、和8点。合計20点。
<!-- solution-end -->

#### E2-02-B04 重ね合わせを分布から示す
- level: B
- minutes: 15
- topics: ポアソン過程
- techniques: 独立な和, 二項定理
- calculation_load: medium

独立な二つのポアソン過程 $N_1,N_2$ の率がそれぞれ2件/時間、5件/時間である。$M(t)=N_1(t)+N_2(t)$ とする。

1. 固定した $t$ について、$M(t)\sim\operatorname{Poisson}(7t)$ を独立な件数の和から示せ。
2. $M$ が独立定常増分を持つ理由を説明し、率7のポアソン過程であることを確認せよ。
3. 30分間に0件の確率と平均件数を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
固定した $t$ では
$$
N_1(t)\sim\operatorname{Poisson}(2t),
\qquad
N_2(t)\sim\operatorname{Poisson}(5t)
$$
で、両者は独立です。したがって $k=0,1,2,\ldots$ について
$$
\begin{aligned}
P(M(t)=k)
&=\sum_{j=0}^kP(N_1(t)=j)P(N_2(t)=k-j)\\
&=\sum_{j=0}^k
\left(e^{-2t}\frac{(2t)^j}{j!}\right)
\left(e^{-5t}\frac{(5t)^{k-j}}{(k-j)!}\right)\\
&=e^{-7t}\frac{t^k}{k!}
\sum_{j=0}^k\binom{k}{j}2^j5^{k-j}.
\end{aligned}
$$
二項定理より
$$
\sum_{j=0}^k\binom{k}{j}2^j5^{k-j}
=(2+5)^k=7^k.
$$
したがって
$$
P(M(t)=k)
=e^{-7t}\frac{(7t)^k}{k!},
$$
すなわち
$$
M(t)\sim\operatorname{Poisson}(7t).
$$

次に互いに重ならない時間区間を考えます。各区間での $M$ の増分は、同じ区間での $N_1$ の増分と $N_2$ の増分の和です。$N_1,N_2$ は互いに独立な過程で、それぞれ独立増分を持つので、異なる区間に対応するこれらの和も独立です。また各増分の分布は区間長だけで決まるので定常増分です。

よって $M$ は率7のポアソン過程です。

30分は $t=1/2$ なので
$$
M(1/2)\sim\operatorname{Poisson}(7/2).
$$
したがって
$$
P(M(1/2)=0)=e^{-7/2},
$$
また
$$
E[M(1/2)]=\frac72.
$$
###### 本番答案
独立なポアソン変数の畳み込みと二項定理から $M(t)\sim\operatorname{Poisson}(7t)$。成分過程の独立増分・定常増分から $M$ も独立定常増分を持つので率7のポアソン過程。30分では0件確率 $e^{-7/2}$、平均 $7/2$。
###### 採点基準
固定時刻の分布8点、独立定常増分6点、30分の計算6点。合計20点。
<!-- solution-end -->

### Level C：本番標準

#### E2-02-C01 偏りのある破産問題
- level: C
- minutes: 24
- topics: ランダムウォーク, 到達確率
- techniques: 差分方程式, 等比数列
- calculation_load: high

状態$0,1,2,3,4,5$を動き、0と5を吸収状態とする。内部状態では右へ確率$p=0.6$、左へ$q=0.4$で進む。位置2から始めて5へ0より先に到達する確率を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
$h_i$を5へ先に到達する確率とすると
$$h_0=0,h_5=1,$$
$$h_i=0.6h_{i+1}+0.4h_{i-1}.$$
$p+q=1$ を使って整理すると
$$0.6(h_{i+1}-h_i)=0.4(h_i-h_{i-1}).$$
$d_i=h_i-h_{i-1}$ と置けば
$$d_{i+1}=\frac23d_i,$$
なので
$$d_i=\left(\frac23\right)^{i-1}d_1.$$
$h_0=0$ から
$$
h_i=d_1\left\{1+\frac23+\cdots+\left(\frac23\right)^{i-1}\right\}
=d_1\frac{1-(2/3)^i}{1-2/3}.
$$
同様に $h_5=1$ だから
$$
1=d_1\frac{1-(2/3)^5}{1-2/3}.
$$
二式を割れば
$$h_i=\frac{1-(2/3)^i}{1-(2/3)^5}.$$
よって
$$
h_2=\frac{1-4/9}{1-32/243}
=\frac{5/9}{211/243}
=\frac{135}{211}.
$$
###### 本番答案
再帰式から $d_i=h_i-h_{i-1}$ は公比$2/3$の等比数列。境界条件より $h_i=\{1-(2/3)^i\}/\{1-(2/3)^5\}$、ゆえに $h_2=135/211$。
###### 採点基準
境界・再帰6点、差分の等比性5点、境界適用5点、数値4点。合計20点。
<!-- solution-end -->

#### E2-02-C02 待ち時間と件数を同時に使う
- level: C
- minutes: 22
- topics: ポアソン過程, 待ち時間
- techniques: 条件の読み替え
- calculation_load: medium

率4件/時間のポアソン過程について次を求めよ。

1. 最初の到着が15分を超える確率。
2. 30分間にちょうど1件の確率。
3. 第2到着が30分を超える確率。
4. 2と3の事象の関係を説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
15分は $1/4$ 時間です。最初の到着時刻を $T_1$ とすると
$$
\{T_1>1/4\}=\{N(1/4)=0\}.
$$
率4なので
$$
N(1/4)\sim\operatorname{Poisson}(4\cdot1/4)
=\operatorname{Poisson}(1).
$$
よって
$$
P(T_1>1/4)=P(N(1/4)=0)=e^{-1}.
$$

30分は $1/2$ 時間で、
$$
N(1/2)\sim\operatorname{Poisson}(4\cdot1/2)
=\operatorname{Poisson}(2).
$$
したがって
$$
P(N(1/2)=1)
=e^{-2}\frac{2^1}{1!}
=2e^{-2}.
$$

第2到着時刻を $T_2$ とすると
$$
T_2>1/2
$$
とは、30分の時点でまだ2件目が到着していないことです。したがって
$$
\{T_2>1/2\}=\{N(1/2)\le1\}.
$$
よって
$$
\begin{aligned}
P(T_2>1/2)
&=P(N(1/2)=0)+P(N(1/2)=1)\\
&=e^{-2}+2e^{-2}\\
&=3e^{-2}.
\end{aligned}
$$

問2の事象は $\{N(1/2)=1\}$、問3の事象は
$$
\{N(1/2)=0\}\cup\{N(1/2)=1\}
$$
です。したがって問2は問3に含まれる事象で、問3には「30分間に0件」の場合も含まれます。
###### 本番答案
$T_1>1/4\iff N(1/4)=0$ より $e^{-1}$。$N(1/2)\sim\operatorname{Poisson}(2)$ より1件確率は $2e^{-2}$。また $T_2>1/2\iff N(1/2)\le1$ より $3e^{-2}$。問2の事象は問3の部分事象。
###### 採点基準
各事象の読み替え8点、件数分布4点、各確率4点、事象関係4点。合計20点。
<!-- solution-end -->

#### E2-02-C03 間引きの条件付き導出と独立性
- level: C
- minutes: 30
- topics: ポアソン過程, 間引き
- techniques: 条件付き二項分布, 全確率, 共同分布
- calculation_load: high

率$\lambda$のポアソン過程の各到着を独立に確率$r$でA種、確率$1-r$でB種へ分類する。$N_A(t),N_B(t)$をそれぞれの件数とする。

1. $N(t)=n$ の条件のもとで $N_A(t)$ の分布を答えよ。
2. 全確率の公式から $N_A(t)\sim\operatorname{Poisson}(r\lambda t)$ を示せ。
3. $P(N_A(t)=k,N_B(t)=\ell)$ を計算し、$N_A(t)$ と $N_B(t)$ が独立であることを示せ。
4. 固定した $t$ の分布だけでなく、$\{N_A(t)\},\{N_B(t)\}$ がそれぞれポアソン過程になり、互いに独立な過程である理由を説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
総到着数を固定すれば各到着を独立分類するので
$$
N_A(t)\mid N(t)=n
\sim\operatorname{Bin}(n,r).
$$
したがって
$$
P(N_A(t)=k)=\sum_{n=k}^\infty
\binom nk r^k(1-r)^{n-k}
e^{-\lambda t}\frac{(\lambda t)^n}{n!}.
$$
$n=k+m$ と置くと
$$
\begin{aligned}
P(N_A(t)=k)
&=e^{-\lambda t}\frac{(r\lambda t)^k}{k!}
\sum_{m=0}^\infty\frac{\{(1-r)\lambda t\}^m}{m!}\\
&=e^{-r\lambda t}\frac{(r\lambda t)^k}{k!}.
\end{aligned}
$$
よって
$$
N_A(t)\sim\operatorname{Poisson}(r\lambda t).
$$

次に $N_A(t)=k,N_B(t)=\ell$ なら総数は $k+\ell$。したがって
$$
\begin{aligned}
&P(N_A(t)=k,N_B(t)=\ell)\\
&=e^{-\lambda t}\frac{(\lambda t)^{k+\ell}}{(k+\ell)!}
\binom{k+\ell}{k}r^k(1-r)^\ell\\
&=e^{-\lambda t}
\frac{(r\lambda t)^k}{k!}
\frac{\{(1-r)\lambda t\}^\ell}{\ell!}\\
&=\left[e^{-r\lambda t}\frac{(r\lambda t)^k}{k!}\right]
\left[e^{-(1-r)\lambda t}\frac{\{(1-r)\lambda t\}^\ell}{\ell!}\right].
\end{aligned}
$$
右辺はA種とB種の周辺確率の積なので独立。

さらに任意の区間長 $u$ に対して同じ間引き計算ができるため、A種増分は $\operatorname{Poisson}(r\lambda u)$、B種増分は $\operatorname{Poisson}\{(1-r)\lambda u\}$ となり定常増分を持つ。互いに重ならない区間では元過程の増分が独立で、分類も独立なので、それぞれの種の増分も独立。したがって両者は各々ポアソン過程である。

また各区間でA/B共同分布が因数分解し、異なる区間の組も独立なので、有限個の区間増分についてA側とB側の共同分布全体が因数分解する。よってA種過程とB種過程は過程としても独立。
###### 本番答案
条件付き二項分布を全確率で混合するとA種は率$r\lambda$のポアソン分布。A/B共同確率は
$$
P(N_A=k,N_B=\ell)
=P(N_A=k)P(N_B=\ell)
$$
と因数分解する。任意の区間でも同じ分布が成り立ち、元過程の独立増分と独立分類から、両者は独立なポアソン過程となる。
###### 採点基準
条件付き分布4点、A種周辺分布6点、共同分布と独立性6点、過程としての独立定常増分4点。合計20点。
<!-- solution-end -->

#### E2-02-C04 第3到着時刻の分布を件数から導く
- level: C
- minutes: 28
- topics: 第k到着時刻, ガンマ分布
- techniques: 件数との同値, 微分, 独立和
- calculation_load: medium

率 $\lambda$ のポアソン過程の第3到着時刻を $T_3$ とする。

1. $T_3>t$ と $N(t)\le2$ が同値であることを説明し、$P(T_3>t)$ を求めよ。
2. $T_3$ の分布関数 $F_{T_3}(t)$ を書き、微分して密度関数を求めよ。
3. 得られた密度から $T_3$ の分布名を答えよ。
4. 到着間隔 $W_1,W_2,W_3$ が独立な $\operatorname{Exp}(\lambda)$ であることを用いて、$E[T_3]$ と $\operatorname{Var}(T_3)$ を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
第3到着が時刻 $t$ より後ということは、時刻 $t$ までに到着した件数が高々2件ということです。したがって
$$
\{T_3>t\}=\{N(t)\le2\}.
$$
$N(t)\sim\operatorname{Poisson}(\lambda t)$ より
$$
\begin{aligned}
P(T_3>t)
&=P(N(t)\le2)\\
&=e^{-\lambda t}
\left\{1+\lambda t+\frac{(\lambda t)^2}{2}\right\},
\qquad t\ge0.
\end{aligned}
$$

したがって分布関数は
$$
F_{T_3}(t)
=1-e^{-\lambda t}
\left\{1+\lambda t+\frac{(\lambda t)^2}{2}\right\}
\qquad(t\ge0).
$$
密度はこれを微分して
$$
\begin{aligned}
f_{T_3}(t)
&=\frac{d}{dt}F_{T_3}(t)\\
&=\frac{\lambda^3t^2}{2}e^{-\lambda t},
\qquad t>0.
\end{aligned}
$$

shape-rate 表示のガンマ分布 $\operatorname{Gamma}(k,\lambda)$ の密度は
$$
f(t)=\frac{\lambda^k}{\Gamma(k)}t^{k-1}e^{-\lambda t}.
$$
$k=3$ では $\Gamma(3)=2!=2$ なので
$$
\frac{\lambda^3}{2}t^2e^{-\lambda t}
$$
となり、上で得た密度と一致します。したがって
$$
T_3\sim\operatorname{Gamma}(3,\lambda).
$$

一方
$$
T_3=W_1+W_2+W_3
$$
で、各 $W_j$ は独立な $\operatorname{Exp}(\lambda)$ です。指数分布の平均と分散は
$$
E[W_j]=\frac1\lambda,
\qquad
\operatorname{Var}(W_j)=\frac1{\lambda^2}.
$$
したがって
$$
E[T_3]=\frac3\lambda,
$$
独立性から
$$
\operatorname{Var}(T_3)=\frac3{\lambda^2}.
$$

これで「指数分布の和だからガンマ」という公式を使うだけでなく、**件数分布からガンマ密度そのものを導く**ことができました。
###### 本番答案
$T_3>t\iff N(t)\le2$ より
$$
P(T_3>t)=e^{-\lambda t}\left(1+\lambda t+\frac{(\lambda t)^2}{2}\right).
$$
したがって
$$
f_{T_3}(t)=\frac{\lambda^3t^2}{2}e^{-\lambda t},
$$
よって $T_3\sim\operatorname{Gamma}(3,\lambda)$。また独立な指数待ち時間3個の和より
$$E[T_3]=3/\lambda,\quad\operatorname{Var}(T_3)=3/\lambda^2.$$
###### 採点基準
事象同値5点、生存関数・CDF5点、密度・ガンマ同定6点、平均分散4点。合計20点。
<!-- solution-end -->

#### E2-02-C05 重ね合わせ後の「由来」を条件付き分布で求める
- level: C
- minutes: 28
- topics: 重ね合わせ, 条件付き分布
- techniques: 独立ポアソン, 条件付き二項分布
- calculation_load: high

独立なA系統、B系統の到着がそれぞれ率2、3のポアソン過程とする。$N_A(t),N_B(t)$ を各件数、$N(t)=N_A(t)+N_B(t)$ を合計件数とする。

1. $N$ の率を求めよ。
2. 任意の $t>0$ と整数 $n\ge0$ について
   $$
   N_A(t)\mid N(t)=n
   \sim\operatorname{Bin}\left(n,\frac25\right)
   $$
   を示せ。
3. 合計で1件到着したとき、その1件がA系統由来である確率を求めよ。
4. 1時間で合計4件、うちA系統が1件である確率を求めよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
B04の重ね合わせより
$$
N(t)\sim\operatorname{Poisson}(5t),
$$
したがって合計過程の率は5です。

条件付き分布を直接計算します。$k=0,1,\ldots,n$ について、$N(t)=n$ かつ $N_A(t)=k$ なら $N_B(t)=n-k$ です。独立性から
$$
\begin{aligned}
&P(N_A(t)=k\mid N(t)=n)\\
&=\frac{P(N_A(t)=k,N_B(t)=n-k)}{P(N(t)=n)}\\
&=\frac{
\left[e^{-2t}(2t)^k/k!\right]
\left[e^{-3t}(3t)^{n-k}/(n-k)!\right]
}{e^{-5t}(5t)^n/n!}\\
&=\binom nk
\left(\frac25\right)^k
\left(\frac35\right)^{n-k}.
\end{aligned}
$$
したがって
$$
N_A(t)\mid N(t)=n
\sim\operatorname{Bin}\left(n,\frac25\right).
$$

$n=1$ とすれば
$$
P(N_A(t)=1\mid N(t)=1)=\frac25.
$$
つまり、重ね合わせた到着を1件だけ見たとき、それがA由来である確率は「率の比」
$$
\frac{2}{2+3}=\frac25
$$
です。ただしこれは単なる暗記則ではなく、上の条件付きポアソン分布から出ています。

1時間で「合計4件、うちAが1件」は
$$
N_A(1)=1,\qquad N_B(1)=3
$$
という事象です。独立性から直接
$$
\begin{aligned}
P(N_A(1)=1,N_B(1)=3)
&=\left(e^{-2}\frac{2^1}{1!}\right)
\left(e^{-3}\frac{3^3}{3!}\right)\\
&=9e^{-5}.
\end{aligned}
$$

条件付き分布から計算しても
$$
P(N(1)=4)
P(N_A(1)=1\mid N(1)=4)
$$
となり、
$$
\left(e^{-5}\frac{5^4}{4!}\right)
\left\{\binom41\frac25\left(\frac35\right)^3\right\}
=9e^{-5}
$$
で一致します。
###### 本番答案
合計率は5。独立なポアソン確率の比を取ると
$$
P(N_A=k\mid N=n)
=\binom nk(2/5)^k(3/5)^{n-k},
$$
ゆえに条件付き二項分布。したがって1件の由来がAである確率は $2/5$。1時間でA1件・B3件の確率は $9e^{-5}$。
###### 採点基準
合計率4点、条件付き二項分布8点、由来確率3点、共同確率5点。合計20点。
<!-- solution-end -->

### Level D：発展

#### E2-02-D01 小区間条件からポアソン分布を導く
- level: D
- minutes: 40
- topics: ポアソン過程
- techniques: 微分方程式, 積分因子, 帰納法
- calculation_load: high

$N(0)=0$、独立定常増分を持つ件数過程について、$h\downarrow0$ で
$$P(N(h)=1)=\lambda h+o(h),$$
$$P(N(h)\ge2)=o(h)$$
とする。$p_k(t)=P(N(t)=k)$ と置く。

1. $P(N(h)=0)=1-\lambda h+o(h)$ を導き、$p_0'(t)=-\lambda p_0(t)$ から $p_0(t)$ を求めよ。
2. $k\ge1$ について、最後の小区間 $(t,t+h]$ の増分が0件、1件、2件以上の場合に分け、2件以上の寄与が $o(h)$ になることを示して
   $$
   p_k'(t)=-\lambda p_k(t)+\lambda p_{k-1}(t)
   $$
   を導け。
3. 積分因子 $e^{\lambda t}$ を用い、$k$ に関する帰納法で
   $$
   p_k(t)=e^{-\lambda t}\frac{(\lambda t)^k}{k!}
   $$
   を導け。

<!-- solution-start -->
##### 解答
###### 詳細解答
確率の総和から
$$
\begin{aligned}
P(N(h)=0)
&=1-P(N(h)=1)-P(N(h)\ge2)\\
&=1-\lambda h+o(h).
\end{aligned}
$$
独立定常増分より
$$
p_0(t+h)=p_0(t)P(N(h)=0)
=p_0(t)\{1-\lambda h+o(h)\}.
$$
したがって
$$
\frac{p_0(t+h)-p_0(t)}h
=-\lambda p_0(t)+o(1),
$$
極限から
$$p_0'=-\lambda p_0.$$
$p_0(0)=1$ より
$$
p_0(t)=e^{-\lambda t}.
$$

$k\ge1$ では
$$
\begin{aligned}
p_k(t+h)
&=p_k(t)P(N(h)=0)
+p_{k-1}(t)P(N(h)=1)\\
&\quad+\sum_{j=2}^kp_{k-j}(t)P(N(h)=j).
\end{aligned}
$$
最後の和は
$$
0\le\sum_{j=2}^kp_{k-j}(t)P(N(h)=j)
\le P(N(h)\ge2)=o(h),
$$
なので
$$
p_k(t+h)
=p_k(t)(1-\lambda h)
+p_{k-1}(t)\lambda h+o(h).
$$
差を取り $h$ で割って極限すると
$$
p_k'=-\lambda p_k+\lambda p_{k-1}.
$$

次に帰納的に解く。$p_0(t)=e^{-\lambda t}$ は既知。$k\ge1$ について
$$
p_{k-1}(t)
=e^{-\lambda t}\frac{(\lambda t)^{k-1}}{(k-1)!}
$$
と仮定する。

$$
p_k'+\lambda p_k=\lambda p_{k-1}
$$
に $e^{\lambda t}$ を掛けると
$$
\frac{d}{dt}\{e^{\lambda t}p_k(t)\}
=\frac{\lambda^k t^{k-1}}{(k-1)!}.
$$
$N(0)=0$ より $p_k(0)=0$ なので、0から$t$まで積分して
$$
e^{\lambda t}p_k(t)
=\frac{\lambda^k t^k}{k!}.
$$
したがって
$$
\boxed{
p_k(t)=e^{-\lambda t}\frac{(\lambda t)^k}{k!}
}.
$$
###### 本番答案
小区間条件から0件確率を作り、独立定常増分で
$$p_0'=-\lambda p_0,
\qquad
p_k'=-\lambda p_k+\lambda p_{k-1}
$$
を導く。積分因子 $e^{\lambda t}$ と帰納法より
$$p_k(t)=e^{-\lambda t}(\lambda t)^k/k!.$$
###### 採点基準
0件確率と$p_0$方程式6点、一般再帰と$o(h)$評価8点、積分因子・帰納法6点。合計20点。
<!-- solution-end -->

## 10. 30分ドリル

### E2-02-DRILL-01 ランダムウォークとポアソン過程の増分構造

次の二つを考える。

**A：ランダムウォーク**
$S_0=0$、右へ1進む確率0.6、左へ1進む確率0.4。

**B：ポアソン過程**
率4件/時間。

1. Aで $E[S_8],\operatorname{Var}(S_8)$ を求めよ。
2. Aで状態0と5を吸収境界としたとき、位置2から5へ先に到達する確率を求めよ。
3. Bで30分間の件数分布を答え、ちょうど2件の確率を求めよ。
4. Bで第2到着が30分を超える確率を求めよ。
5. Bの各到着を独立に確率0.25で重大事象と分類する。重大事象過程の率と、1時間に重大事象が0件の確率を求めよ。
6. AとBに共通する「増分から全体を作る」という考え方を説明せよ。

<!-- solution-start -->
##### 解答
###### 詳細解答
まずAの1歩増分を $X$ とすると
$$
E[X]=0.6-0.4=0.2,
$$
また $X^2=1$ なので
$$
\operatorname{Var}(X)=1-0.2^2=0.96.
$$
$S_8=X_1+\cdots+X_8$ で増分は独立だから
$$
E[S_8]=8\cdot0.2=1.6,
$$
$$
\operatorname{Var}(S_8)=8\cdot0.96=7.68.
$$

次に0と5への吸収問題を考えます。$h_i$ を位置 $i$ から5へ先に到達する確率とすると
$$
h_0=0,\qquad h_5=1,
$$
内部では最初の1歩で条件付けて
$$
h_i=0.6h_{i+1}+0.4h_{i-1}.
$$
整理すると
$$
0.6(h_{i+1}-h_i)=0.4(h_i-h_{i-1}).
$$
$d_i=h_i-h_{i-1}$ と置けば
$$
d_{i+1}=\frac23d_i.
$$
したがって第2節と同じ導出から
$$
h_i=\frac{1-(2/3)^i}{1-(2/3)^5}.
$$
よって
$$
h_2=\frac{135}{211}.
$$

Bでは30分は $t=1/2$ 時間なので
$$
N(1/2)\sim\operatorname{Poisson}(4\cdot1/2)
=\operatorname{Poisson}(2).
$$
したがって
$$
P(N(1/2)=2)
=e^{-2}\frac{2^2}{2!}
=2e^{-2}.
$$

第2到着時刻を $T_2$ とすると
$$
T_2>1/2
\quad\Longleftrightarrow\quad
N(1/2)\le1.
$$
したがって
$$
P(T_2>1/2)
=e^{-2}+2e^{-2}
=3e^{-2}.
$$

各到着を確率0.25で重大事象へ分類するので、間引きにより任意の長さ $t$ の区間の重大事象件数は
$$
\operatorname{Poisson}\{4t\cdot0.25\}
=\operatorname{Poisson}(t).
$$
したがって重大事象過程の率は1件/時間で、1時間に0件の確率は
$$
e^{-1}.
$$

最後に共通構造を整理します。ランダムウォークでは各時点の位置が
$$
S_n=S_0+X_1+\cdots+X_n
$$
という独立増分の和で作られます。一方ポアソン過程では、例えば $0<t_1<t_2$ に対し
$$
N(t_2)=N(t_1)+\{N(t_2)-N(t_1)\}
$$
と、重ならない時間区間の独立な件数増分を足して全体の件数を作ります。

したがって両者に共通するのは、**局所的な増分の分布と独立性を指定すると、それを足し上げることで複数時点の確率構造が決まる**という点です。
###### 本番答案
Aでは1歩増分の平均0.2、分散0.96より $E[S_8]=1.6,\operatorname{Var}(S_8)=7.68$。到達確率は一段目解析から差分比 $2/3$ を得て $h_2=135/211$。Bでは $N(0.5)\sim\operatorname{Poisson}(2)$ より2件確率 $2e^{-2}$、$T_2>0.5\iff N(0.5)\le1$ より $3e^{-2}$。間引き後は率1で0件確率 $e^{-1}$。両者とも独立増分を積み上げて全体を作る。
###### 採点基準
A平均分散15点、到達確率20点、B件数20点、第2到着15点、間引き15点、共通構造15点。合計100点。
<!-- solution-end -->

## 11. 本番での確認点

- ランダムウォークの位置は右向き回数の二項分布へ帰着できる。
- 到達確率の再帰式には$+1$がなく、平均到達時間には最初の1歩の$+1$がある。
- ポアソン過程の定常増分は「開始時刻ではなく区間長だけで分布が決まる」、独立増分は「重ならない区間の件数が独立」という意味。
- ポアソン件数と待ち時間は $T_k>t\iff N(t)\le k-1$ でつながる。
- 第$k$到着時刻のガンマ分布は、指数待ち時間の和だけでなく $T_k>t\iff N(t)\le k-1$ からも導ける。
- 重ね合わせでは「率を足す」と暗記する前に、固定時刻のポアソン分布と独立定常増分を確認する。
- 間引きでは「各種の周辺分布がポアソン」だけでなく、共同分布の因数分解で独立性を確認する。
- 小区間条件では、0件・1件の一次項を残し、2件以上を$o(h)$として落とすことが微分方程式の核心である。