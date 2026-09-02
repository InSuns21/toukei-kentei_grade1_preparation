from pathlib import Path
import re

ROOT = Path('textbook/volumes/00_foundations')


def read(name):
    p = ROOT / name / 'index.md'
    return p, p.read_text()


def write(p, text):
    p.write_text(text)
    print('updated', p)


def insert_before(text, marker, block):
    if block.strip() in text:
        return text
    if marker not in text:
        raise RuntimeError(f'marker not found: {marker[:80]}')
    return text.replace(marker, block.rstrip() + '\n\n' + marker, 1)


def insert_after(text, marker, block):
    if block.strip() in text:
        return text
    if marker not in text:
        raise RuntimeError(f'marker not found: {marker[:80]}')
    return text.replace(marker, marker + '\n\n' + block.rstrip(), 1)


def fold_body_between(text, start_heading, end_marker, visible_intro):
    """Keep start heading visible; put its old body in a proof block before end_marker."""
    start = text.find(start_heading)
    if start < 0:
        raise RuntimeError(f'start heading not found: {start_heading}')
    body_start = start + len(start_heading)
    end = text.find(end_marker, body_start)
    if end < 0:
        raise RuntimeError(f'end marker not found after {start_heading}: {end_marker[:60]}')
    old_body = text[body_start:end].strip('\n')
    if '<!-- proof-start -->' in old_body:
        return text
    replacement = (
        start_heading
        + '\n\n'
        + visible_intro.strip()
        + '\n\n<!-- proof-start -->\n### 証明\n\n'
        + old_body.strip()
        + '\n<!-- proof-end -->\n\n'
    )
    return text[:start] + replacement + text[end:]


# ---------------------------------------------------------------------------
# F0-02B: turn theorem/proof wall into geometry -> example -> theorem -> proof map.
# ---------------------------------------------------------------------------
p, s = read('F0_02B_分離超平面定理_Farkas_SVM')

intro = r'''## 0. まず2次元で「分離」を一周する

抽象的な定理へ進む前に、単位円板

$$
C=\{x\in\mathbb R^2:\|x\|\le1\}
$$

と、その外の点

$$
z=(2,0)
$$

を考えます。$z$ に最も近い $C$ の点は

$$
p=(1,0)
$$

で、$z-p=(1,0)$ は円板の外向き法線です。したがって任意の $x=(x_1,x_2)\in C$ について

$$
x_1\le1<2
$$

すなわち

$$
(z-p)^{\mathsf T}x
\le
(z-p)^{\mathsf T}p
<
(z-p)^{\mathsf T}z
$$

となります。

ここで起きていることは

$$
\boxed{
\text{外の点 }z
\to
\text{最近点 }p
\to
\text{法線 }z-p
\to
\text{分離超平面}
}
$$

です。本章の前半はこの2次元の絵を $\mathbb R^p$ の閉凸集合へ一般化し、後半では「点が錐に入らない」ことを線形不等式の **certificate** として書き直してFarkasの補題へ進みます。

---'''
if '## 0. まず2次元で「分離」を一周する' not in s:
    s = s.replace('\n---\n\n## 1. ', '\n---\n\n' + intro + '\n\n## 1. ', 1)

s = fold_body_between(
    s,
    '### 4.1 最近点の存在',
    '\n### 4.2 最近点の一意性',
    r'''閉性は「極限が $C$ の外へ落ちない」ことを、有限次元のコンパクト性は「距離の下限を実現する部分列が取れる」ことを担当します。

#### 証明の見取り図

$$
\text{距離を下限へ近づける列}
\to
\text{有界化}
\to
\text{閉有界なのでcompact}
\to
\text{収束部分列}
\to
\text{閉性で極限が }C\text{ 内}
$$

という流れです。結論は、空でない閉凸集合 $C\subset\mathbb R^p$ には $z$ からの最近点が存在する、です。'''
)

s = fold_body_between(
    s,
    '### 4.2 最近点の一意性',
    '\n---\n\n## 5. 射影点では外向き法線が得られる',
    r'''凸性が一意性を担当します。二つの最近点があるなら、その中点はさらに $z$ に近くなってしまいます。

#### 証明の見取り図

$$
p,q\text{ がともに最近点}
\to
m=(p+q)/2\in C
\to
\|z-m\|^2
=\delta^2-\frac14\|p-q\|^2
$$

なので、$p\ne q$ なら最小性に矛盾します。したがって最近点は一意で、$P_C(z)$ と書けます。'''
)

s = fold_body_between(
    s,
    '## 5. 射影点では外向き法線が得られる',
    '\n---\n\n<a id="ref-farkas-from-separation"></a>',
    r'''$p=P_C(z)$ とすると、最近点から集合内へ少し動いたとき距離が減ってはいけません。この「片側微分が非負」という最小化条件が

$$
\boxed{
(z-p)^{\mathsf T}(x-p)\le0
\qquad(\forall x\in C)
}
$$

を与えます。つまり $z-p$ が外向き法線になります。

### 証明の見取り図

$p_t=p+t(x-p)$ と線分上を動かし、$\phi(t)=\|z-p_t\|^2$ の $t=0$ における右微分を調べるだけです。'''
)

s = fold_body_between(
    s,
    '## 6. 分離超平面定理を射影から導く',
    '\n---\n\n## 7. 閉凸錐を外の点から分離する',
    r'''空でない閉凸集合 $C\subset\mathbb R^p$ と $z\notin C$ に対し、$p=P_C(z)$、$a=z-p$ と置けば

$$
\boxed{
a^{\mathsf T}x\le a^{\mathsf T}p<a^{\mathsf T}z
\qquad(\forall x\in C)
}
$$

となります。

### 証明の見取り図

前節の射影不等式を $a=z-p$ で読み替えると集合側の上界が得られ、点 $z$ では $\|z-p\|^2>0$ の分だけ厳密に大きくなります。

#### さきほどの円板では

$C=\{\|x\|\le1\}$、$z=(2,0)$ なら $p=(1,0)$、$a=(1,0)$ なので、分離不等式はそのまま $x_1\le1<2$ です。'''
)

s = fold_body_between(
    s,
    '## 7. 閉凸錐を外の点から分離する',
    '\n---\n\n## 8. 有限生成凸錐は閉である',
    r'''錐 $K$ ではスカラー倍 $tk\in K$ を自由に使えるため、一般の分離不等式を原点を通る形まで強められます。$v\notin K$ なら、ある $d$ が存在して

$$
\boxed{
d^{\mathsf T}k\le0\ (\forall k\in K),
\qquad d^{\mathsf T}v>0
}
$$

となります。

### 証明の見取り図

最近点 $p=P_K(v)$ に対する射影不等式へ $0$ と $2p$ を代入して $d^{\mathsf T}p=0$ を引き出すのが錐特有の一手です。'''
)

s = fold_body_between(
    s,
    '## 8. 有限生成凸錐は閉である',
    '\n---\n\n<a id="thm-farkas"></a>',
    r'''Farkasの補題では

$$
K=\{Ax:x\ge0\}
$$

を **閉** 凸錐として分離する必要があります。有限個のベクトル $a_1,\dots,a_m$ が生成する錐

$$
K=\left\{\sum_{j=1}^m\lambda_ja_j:\lambda_j\ge0\right\}
$$

は閉です。

### 証明の見取り図

係数が無限大へ逃げる問題を、正の線形従属を使って不要な生成元を消すことで回避します。最後は線形独立な生成元だけに落とし、係数列の有界性から極限を錐内へ戻します。'''
)

farkas_example = r'''### 9.1 まずcertificateを数値で見る

$$
A=I_2,
\qquad
b=\begin{pmatrix}-1\\1\end{pmatrix}
$$

とします。$Ax=b$ を満たす $x$ は $x=b$ しかなく、$x\ge0$ ではありません。つまり $b$ は $A$ の列が張る非負錐（第1象限）に入りません。

そこで

$$
y=\begin{pmatrix}-1\\0\end{pmatrix}
$$

を取ると

$$
A^{\mathsf T}y
=\begin{pmatrix}-1\\0\end{pmatrix}
\le0,
\qquad
b^{\mathsf T}y=1>0.
$$

この $y$ は「$b$ は第1象限に入れない」と一つの内積不等式で証明する **certificate** です。Farkasの補題は、非負解がないときには必ずこの種のcertificateが存在すると保証します。
'''
if '### 9.1 まずcertificateを数値で見る' not in s:
    marker = '\n---\n\n## 10. 二つが同時には成立しない'
    s = s.replace(marker, '\n\n' + farkas_example.rstrip() + marker, 1)

s = fold_body_between(
    s,
    '## 10. 二つが同時には成立しない',
    '\n---\n\n## 11. 少なくとも一方は成立する',
    r'''(A) の非負解 $x$ と (B) のcertificate $y$ が同時にあると、同じ量 $y^{\mathsf T}Ax$ が一方では正、他方では非正になって矛盾します。

### 証明の見取り図

$$
y^{\mathsf T}b
=y^{\mathsf T}Ax
=x^{\mathsf T}A^{\mathsf T}y
$$

の符号を見るだけです。'''
)

s = fold_body_between(
    s,
    '## 11. 少なくとも一方は成立する',
    '\n---\n\n## 12. KKTで使うFarkas型alternative',
    r'''非負解がない、つまり $b\notin K=\{Ax:x\ge0\}$ なら、前節までに作った **閉凸錐の分離定理** をそのまま使えます。

### 証明の見取り図

$$
b\notin K
\to
\text{separating vector }y
\to
A^{\mathsf T}y\le0,
\ b^{\mathsf T}y>0
$$

です。これが「幾何学的な分離」から「代数的なcertificate」へ移る核心です。'''
)

s = fold_body_between(
    s,
    '## 12. KKTで使うFarkas型alternative',
    '\n---\n\n<a id="ref-polar-cone-formula"></a>',
    r'''等式制約の乗数 $\nu$ は符号自由なので $\nu=\nu^+-\nu^-$ と分解し、不等式制約の生成元と $\pm B^{\mathsf T}e_j$ をまとめて一つの有限生成錐にします。するとFarkasと同じ分離論が使えます。

### 証明の見取り図

$$
K=\{A^{\mathsf T}\lambda+B^{\mathsf T}\nu:\lambda\ge0\}
$$

に $v$ が入るか、入らなければ $K$ を $v$ から分離する方向 $d$ が存在するか、という二者択一に読み替えます。'''
)

s = fold_body_between(
    s,
    '## 13. polar coneの公式',
    '\n---\n\n## 14. KKT条件への接続',
    r'''線形化制約集合

$$
L=\{d:Ad\le0,\ Bd=0\}
$$

のpolarは

$$
\boxed{
L^\circ
=\{A^{\mathsf T}\lambda+B^{\mathsf T}\nu:\lambda\ge0\}
}
$$

です。

### 証明の見取り図

右辺から左辺は内積を直接計算します。逆向きは、もし $v$ が右辺に入らなければ前節のFarkas型alternativeが $d\in L$ かつ $v^{\mathsf T}d>0$ を作り、$v\in L^\circ$ に矛盾する、という反証です。'''
)

write(p, s)


# ---------------------------------------------------------------------------
# D5: one long Vitali nonmeasurability proof -> visible roadmap + one fold.
# ---------------------------------------------------------------------------
p, s = read('F0_00D5_Vitali集合_非可測集合_選択公理')
start = s.find('## 5. 異なる有理数平行移動は互いに素')
end = s.find('\n---\n\n## 11. 結論：Vitali集合はLebesgue可測ではない', start)
if start < 0 or end < 0:
    raise RuntimeError('D5 proof range not found')
if '<a id="thm-vitali-nonmeasurable"></a>' not in s:
    old = s[start:end].strip()
    old = re.sub(r'^## 5\. 異なる有理数平行移動は互いに素', '#### Step 1：異なる有理数平行移動は互いに素', old, count=1, flags=re.M)
    old = re.sub(r'^## 6\. これらの平行移動は `?\[0,1\]`? を覆う', '#### Step 2：平行移動族は $[0,1]$ を覆う', old, count=1, flags=re.M)
    old = re.sub(r'^## 7\. 一方、全体は有限区間に収まる', '#### Step 3：全体は有限区間 $[-1,2]$ に収まる', old, count=1, flags=re.M)
    old = re.sub(r'^## 8\. もしVitali集合が可測だったら', '#### Step 4：可測だと仮定して可算加法性を使う', old, count=1, flags=re.M)
    old = re.sub(r'^## 9\. .*$', '#### Step 5：$\\lambda(V)=0$ なら矛盾', old, count=1, flags=re.M)
    old = re.sub(r'^## 10\. .*$', '#### Step 6：$\\lambda(V)>0$ でも矛盾', old, count=1, flags=re.M)
    block = r'''<a id="thm-vitali-nonmeasurable"></a>

## 5. Vitali集合がLebesgue可測ではないことを示す

> **定理（Vitali集合の非可測性）**  
> 各 $\sim$ 同値類から代表元を一つずつ選んで得た Vitali集合 $V\subset[0,1]$ はLebesgue可測ではない。

### 5.1 証明の見取り図

証明で使う事実は四つだけです。

1. $V+q$（$q\in\mathbb Q\cap[-1,1]$）は互いに素。
2. それらの可算和は $[0,1]$ を覆う。
3. それでも全体は $[-1,2]$ に収まる。
4. 平行移動不変性により全ての $V+q$ は同じ測度を持つ。

そこで $V$ が可測だと仮定すると、$\lambda(V)$ は0か正かのどちらかです。0なら可算和の測度も0で $[0,1]$ を覆えません。正なら可算和の測度は無限大になり、$[-1,2]$ に収まりません。

$$
\boxed{
\lambda(V)=0\Rightarrow 1\le0,
\qquad
\lambda(V)>0\Rightarrow\infty\le3
}
$$

この矛盾の部分を完全に追いたい場合だけ、以下を開けば十分です。

<!-- proof-start -->
### 証明

''' + old + r'''
<!-- proof-end -->'''
    s = s[:start] + block + s[end:]
    # Renumber the visible post-proof sections so the lecture keeps a clean flow.
    replacements = [
        ('## 11. 結論：Vitali集合はLebesgue可測ではない', '## 6. 結論：Vitali集合はLebesgue可測ではない'),
        ('## 12. 何が同時には実現できないのか', '## 7. 何が同時には実現できないのか'),
        ('## 13. 選択公理はどこで使われたか', '## 8. 選択公理はどこで使われたか'),
        ('## 14. 「選択公理が悪い」のか', '## 9. 「選択公理が悪い」のか'),
        ('## 15. 可測集合の制限は欠点ではない', '## 10. 可測集合の制限は欠点ではない'),
        ('## 16. 確率論への接続', '## 11. 確率論への接続'),
        ('## 17. 関数解析への接続', '## 12. 関数解析への接続'),
        ('## 18. DREAM THEATERルートの着地点', '## 13. DREAM THEATERルートの着地点'),
    ]
    for a, b in replacements:
        s = s.replace(a, b, 1)
write(p, s)


# ---------------------------------------------------------------------------
# P7A: concrete Bernoulli model before the abstract asymptotic chain.
# ---------------------------------------------------------------------------
p, s = read('F0_00P7A_MLE_一致性_漸近正規性')
bernoulli = r'''## 0. 先にBernoulliモデルで全工程を見る

一般論へ入る前に、$X_1,\dots,X_n\overset{iid}{\sim}\operatorname{Bernoulli}(p_0)$、$0<p_0<1$ を考えます。対数尤度は、$S_n=\sum_iX_i$ として

$$
\ell_n(p)
=S_n\log p+(n-S_n)\log(1-p)
$$

です。score方程式は

$$
U_n(p)
=\frac{S_n}{p}-\frac{n-S_n}{1-p}=0
$$

なので

$$
\boxed{\widehat p_n=\frac{S_n}{n}=\overline X_n}.
$$

ここでは一致性がすぐ見えます。大数の法則から

$$
\widehat p_n=\overline X_n\xrightarrow{p}p_0.
$$

さらに

$$
I(p)
=E_p\!\left[\left\{\frac{X-p}{p(1-p)}\right\}^2\right]
=\frac1{p(1-p)}.
$$

一方、中心極限定理から直接

$$
\sqrt n(\widehat p_n-p_0)
\xrightarrow{d}
N\left(0,p_0(1-p_0)\right).
$$

そして

$$
I(p_0)^{-1}=p_0(1-p_0).
$$

したがってこの具体例だけで

$$
\boxed{
\sqrt n(\widehat p_n-p_0)
\Rightarrow
N\left(0,I(p_0)^{-1}\right)
}
$$

という一般形が見えています。

### 0.1 一般論の各部品はBernoulliでは何だったか

| 一般論 | Bernoulliモデル |
|---|---|
| consistency | $\bar X_n\to p_0$ |
| score CLT | $\sum_i(X_i-p_0)/\{p_0(1-p_0)\}$ のCLT |
| Hessian LLN | $-n^{-1}\ell_n''(p)$ が $I(p_0)$ へ近づく |
| Taylor | $U_n(\hat p_n)=0$ を $p_0$ 周りで展開 |
| Slutsky | score側の分布収束とHessian側の確率収束を合成 |

一般モデルでは $\widehat\theta_n$ が標本平均のように明示できないため、この五つを別々に証明して最後に組み立てます。

---'''
if '## 0. 先にBernoulliモデルで全工程を見る' not in s:
    s = s.replace('\n---\n\n## 1. ', '\n---\n\n' + bernoulli + '\n\n## 1. ', 1)

exercise = r'''### F0-00P7A-B02 Poissonモデルで漸近分散まで確認する

- Level: B
- 目安時間: 20分

$X_1,\dots,X_n\overset{iid}{\sim}\operatorname{Poisson}(\lambda_0)$、$\lambda_0>0$ とする。

1. 最尤推定量が $\widehat\lambda_n=\overline X_n$ であることを示せ。
2. 1観測あたりのFisher情報量 $I(\lambda)$ を求めよ。
3. 中心極限定理から $\sqrt n(\widehat\lambda_n-\lambda_0)$ の極限分布を求め、分散が $I(\lambda_0)^{-1}$ と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

対数尤度は定数項を除いて

$$
\ell_n(\lambda)
=\left(\sum_iX_i\right)\log\lambda-n\lambda.
$$

したがって

$$
\ell_n'(\lambda)
=\frac{\sum_iX_i}{\lambda}-n,
$$

より $\widehat\lambda_n=\bar X_n$。1観測のscoreは $s_\lambda(X)=X/\lambda-1=(X-\lambda)/\lambda$ なので

$$
I(\lambda)
=\operatorname{Var}(X)/\lambda^2
=\frac1\lambda.
$$

また $\operatorname{Var}(X)=\lambda_0$ だからCLTより

$$
\sqrt n(\widehat\lambda_n-\lambda_0)
\Rightarrow N(0,\lambda_0).
$$

確かに $I(\lambda_0)^{-1}=\lambda_0$ で一致する。

#### 本番答案

$\ell_n'(\lambda)=\sum_iX_i/\lambda-n$ より $\hat\lambda=\bar X$。$I(\lambda)=\operatorname{Var}(X)/\lambda^2=1/\lambda$。従ってCLTから $\sqrt n(\hat\lambda-\lambda_0)\Rightarrow N(0,\lambda_0)=N(0,I(\lambda_0)^{-1})$。

#### 採点基準（20点）
- MLE: 6点
- scoreとFisher情報量: 7点
- CLT: 5点
- 逆情報量との一致: 2点
<!-- solution-end -->
'''
if 'F0-00P7A-B02' not in s:
    s = s.replace('\n---\n\n## 次に進む', '\n\n' + exercise.rstrip() + '\n\n---\n\n## 次に進む', 1)
write(p, s)


# ---------------------------------------------------------------------------
# Exercise reinforcement pages.
# ---------------------------------------------------------------------------

def add_exercises(dirname, block):
    p, s = read(dirname)
    if block.splitlines()[0].strip() not in s:
        s = insert_before(s, '## 章末チェック', '## 演習\n\n' + block.strip() + '\n\n---')
    write(p, s)

add_exercises('F0_00SP3_Brown運動_Gaussian過程_二次変分', r'''
### F0-00SP3-A01 共分散と増分分布

- Level: A
- 目安時間: 12分

標準Brown運動について $s=1,t=3$ とする。

1. $\operatorname{Cov}(B_1,B_3)$ を求めよ。
2. $B_3-B_1$ の分布を求めよ。
3. $\operatorname{Corr}(B_1,B_3)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$\operatorname{Cov}(B_s,B_t)=\min(s,t)$ より共分散は1。増分は $N(0,3-1)=N(0,2)$。また $\operatorname{Var}(B_1)=1$, $\operatorname{Var}(B_3)=3$ なので

$$
\operatorname{Corr}(B_1,B_3)=\frac1{\sqrt{1\cdot3}}=\frac1{\sqrt3}.
$$

#### 本番答案

$\operatorname{Cov}(B_1,B_3)=1$、$B_3-B_1\sim N(0,2)$、$\operatorname{Corr}(B_1,B_3)=1/\sqrt3$。

#### 採点基準（20点）
- 共分散: 6点
- 増分分布: 7点
- 相関係数: 7点
<!-- solution-end -->

### F0-00SP3-B01 二次変分を $L^2$ で確認する

- Level: B
- 目安時間: 18分

$[0,t]$ を $n$ 等分し

$$
Q_n=\sum_{k=1}^n(B_{kt/n}-B_{(k-1)t/n})^2
$$

とする。$E[Q_n]$ と $\operatorname{Var}(Q_n)$ を求め、$Q_n\to t$ in $L^2$ を示せ。

<!-- solution-start -->
#### 詳細解答

各増分 $\Delta B_k\sim N(0,t/n)$ は独立。よって $E[(\Delta B_k)^2]=t/n$ から $E[Q_n]=t$。正規分布の四次モーメントより

$$
\operatorname{Var}((\Delta B_k)^2)=2(t/n)^2.
$$

独立性から

$$
\operatorname{Var}(Q_n)=n\,2(t/n)^2=\frac{2t^2}{n}.
$$

したがって $E[(Q_n-t)^2]=2t^2/n\to0$。

#### 本番答案

$E[Q_n]=t$, $\operatorname{Var}(Q_n)=2t^2/n$。従って $E[(Q_n-t)^2]\to0$ なので $Q_n\to t$ in $L^2$。

#### 採点基準（20点）
- 増分の分布・独立性: 4点
- 期待値: 5点
- 四次モーメントから分散: 7点
- $L^2$収束: 4点
<!-- solution-end -->
''')

add_exercises('F0_00D4_Lebesgue測度_Borel集合_拡張定理', r'''
### F0-00D4-A01 有理数集合はBorelだが測度0

- Level: A
- 目安時間: 10分

$A=\mathbb Q\cap[0,1]$ がBorel集合であることを示し、Lebesgue測度 $\lambda(A)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

一点集合 $\{q\}$ は閉集合なのでBorel集合。有理数は可算だから

$$
A=\bigcup_{q\in\mathbb Q\cap[0,1]}\{q\}
$$

は可算和としてBorel集合。各一点の測度は0なので可算加法性から $\lambda(A)=0$。

#### 本番答案

$A$ は一点Borel集合の可算和なのでBorel。各一点の測度が0だから $\lambda(A)=0$。

#### 採点基準（20点）
- 一点集合がBorel: 5点
- 可算和: 7点
- 測度0: 8点
<!-- solution-end -->

### F0-00D4-B01 完備化が何を追加するか

- Level: B
- 目安時間: 15分

$N$ をLebesgue測度0のBorel集合とし、$A\subset N$ とする。$A$ がLebesgue可測で $\lambda(A)=0$ である理由を説明せよ。また、この事実だけから $A$ がBorel集合とは結論できない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

Lebesgue測度はBorel測度の完備化なので、零測度Borel集合 $N$ の任意の部分集合 $A$ もLebesgue可測として追加され、$\lambda(A)=0$ と定められる。一方、完備化はもとのBorel sigma代数に新しい集合を追加する操作なので、$A$ がもともとBorel集合であることまでは保証しない。

#### 本番答案

Lebesgue測度の完全性より $A\subset N$, $\lambda(N)=0$ なら $A$ はLebesgue可測かつ $\lambda(A)=0$。完備化はBorel sigma代数より大きいので、$A$ がBorelとは限らない。

#### 採点基準（20点）
- 完全性の適用: 8点
- $\lambda(A)=0$: 5点
- Borelとの区別: 7点
<!-- solution-end -->
''')

add_exercises('F0_00TS2_Herglotz_spectral_measure_density', r'''
### F0-00TS2-A01 white noiseの全spectral mass

- Level: A
- 目安時間: 10分

分散 $\sigma^2$ のwhite noiseのspectral densityが $f(\lambda)=\sigma^2/(2\pi)$ であることを自己共分散列から導き、

$$
\int_{-\pi}^{\pi}f(\lambda)\,d\lambda=\gamma(0)
$$

を確認せよ。

<!-- solution-start -->
#### 詳細解答

$\gamma(0)=\sigma^2$, $\gamma(h)=0\ (h\ne0)$ なので逆Fourier級数から $f(\lambda)=\sigma^2/(2\pi)$。従って

$$
\int_{-\pi}^{\pi}f(\lambda)d\lambda
=\frac{\sigma^2}{2\pi}(2\pi)=\sigma^2=\gamma(0).
$$

#### 本番答案

$f(\lambda)=\sigma^2/(2\pi)$、全質量は $\sigma^2=\gamma(0)$。

#### 採点基準（20点）
- 自己共分散列: 5点
- density導出: 8点
- 全質量確認: 7点
<!-- solution-end -->

### F0-00TS2-B01 random phase sinusoidのline spectrum

- Level: B
- 目安時間: 18分

$\Phi\sim\operatorname{Unif}(0,2\pi)$ とし

$$
X_t=A\cos(\omega_0t+\Phi)
$$

とする。$\gamma(h)$ を求め、Herglotz表示

$$
\gamma(h)=\int e^{ih\lambda}\,dF(\lambda)
$$

を満たすspectral measure $F$ を、$\pm\omega_0$ の点質量として書け。

<!-- solution-start -->
#### 詳細解答

積和公式と位相の一様性から

$$
\gamma(h)=\frac{A^2}{2}\cos(\omega_0h).
$$

一方

$$
\frac{A^2}{4}\{e^{ih\omega_0}+e^{-ih\omega_0}\}
=\frac{A^2}{2}\cos(\omega_0h),
$$

だから

$$
dF=\frac{A^2}{4}\delta_{\omega_0}+\frac{A^2}{4}\delta_{-\omega_0}.
$$

全質量は $A^2/2=\gamma(0)$。点質量なのでLebesgue密度を持たない。

#### 本番答案

$\gamma(h)=A^2\cos(\omega_0h)/2$、$F=(A^2/4)(\delta_{\omega_0}+\delta_{-\omega_0})$。

#### 採点基準（20点）
- 共分散: 8点
- 点質量の係数: 8点
- densityを持たない説明: 4点
<!-- solution-end -->
''')

add_exercises('F0_00FA1_Fourier級数_直交展開', r'''
### F0-00FA1-A01 直交性から係数を読む

- Level: A
- 目安時間: 10分

$$
f(x)=2+3\cos(2x)-4\sin(3x)
$$

を $(-\pi,\pi)$ 上の $2\pi$ 周期関数とする。実Fourier係数 $a_0,a_n,b_n$ を求めよ。

<!-- solution-start -->
#### 詳細解答

Fourier表示 $f=a_0/2+\sum_{n\ge1}(a_n\cos nx+b_n\sin nx)$ と係数の一意性・直交性から

$$
a_0=4,\qquad a_2=3,\qquad b_3=-4,
$$

その他の $a_n,b_n$ は0。

#### 本番答案

$a_0=4,a_2=3,b_3=-4$、その他は0。

#### 採点基準（20点）
- 定数項: 6点
- cosine係数: 7点
- sine係数: 7点
<!-- solution-end -->

### F0-00FA1-B01 ParsevalからBasel和を出す

- Level: B
- 目安時間: 18分

本文の

$$
x\sim2\sum_{n=1}^\infty\frac{(-1)^{n+1}}n\sin(nx)
$$

を使い、Parseval等式から

$$
\sum_{n=1}^\infty\frac1{n^2}
$$

を求めよ。

<!-- solution-start -->
#### 詳細解答

$f(x)=x$ では $a_0=a_n=0$, $b_n=2(-1)^{n+1}/n$。Parsevalより

$$
\frac1\pi\int_{-\pi}^{\pi}x^2dx
=\sum_{n=1}^\infty b_n^2.
$$

左辺は $2\pi^2/3$、右辺は $4\sum n^{-2}$。したがって

$$
\sum_{n=1}^\infty\frac1{n^2}=\frac{\pi^2}{6}.
$$

#### 本番答案

$2\pi^2/3=4\sum_{n\ge1}n^{-2}$ より $\sum_{n\ge1}n^{-2}=\pi^2/6$。

#### 採点基準（20点）
- Parseval設定: 7点
- 左辺積分: 5点
- 係数二乗和: 5点
- 結論: 3点
<!-- solution-end -->
''')

add_exercises('F0_00FA2_Fourier変換_畳み込み_反転', r'''
### F0-00FA2-A01 $e^{-|x|}$ のFourier変換

- Level: A
- 目安時間: 12分

$$
f(x)=e^{-|x|}
$$

について、本章の規約で $\widehat f(\xi)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

偶関数なので

$$
\widehat f(\xi)
=2\int_0^\infty e^{-x}\cos(\xi x)dx.
$$

$\int_0^\infty e^{-(1-i\xi)x}dx=(1-i\xi)^{-1}$ の実部を取ると

$$
\int_0^\infty e^{-x}\cos(\xi x)dx=\frac1{1+\xi^2}.
$$

従って

$$
\boxed{\widehat f(\xi)=\frac{2}{1+\xi^2}}.
$$

#### 本番答案

偶性より $\widehat f=2\int_0^\infty e^{-x}\cos(\xi x)dx=2/(1+\xi^2)$。

#### 採点基準（20点）
- 偶性: 5点
- 積分計算: 10点
- 結論: 5点
<!-- solution-end -->

### F0-00FA2-B01 Gaussianの尺度変換

- Level: B
- 目安時間: 15分

$\widehat{e^{-x^2}}(\xi)=\sqrt\pi e^{-\xi^2/4}$ を既知として、尺度変換則だけを使い

$$
f_a(x)=e^{-ax^2},\qquad a>0
$$

のFourier変換を導け。

<!-- solution-start -->
#### 詳細解答

$g(x)=e^{-x^2}$ とすると $f_a(x)=g(\sqrt a\,x)$。尺度変換則から

$$
\widehat f_a(\xi)
=\frac1{\sqrt a}\widehat g\left(\frac\xi{\sqrt a}\right)
=\sqrt{\frac\pi a}\exp\left(-\frac{\xi^2}{4a}\right).
$$

#### 本番答案

$f_a(x)=g(\sqrt a x)$ より $\widehat f_a(\xi)=a^{-1/2}\widehat g(\xi/\sqrt a)=\sqrt{\pi/a}e^{-\xi^2/(4a)}$。

#### 採点基準（20点）
- 尺度の同定: 6点
- 変換則: 8点
- 整理: 6点
<!-- solution-end -->
''')

add_exercises('F0_00FA3_Plancherel_L2_特性関数', r'''
### F0-00FA3-A01 Plancherelの $2\pi$ を具体例で確認する

- Level: A
- 目安時間: 15分

FA2で得た

$$
f(x)=e^{-|x|},
\qquad
\widehat f(\xi)=\frac{2}{1+\xi^2}
$$

を使い、本章の規約のPlancherel等式

$$
\int|f|^2
=\frac1{2\pi}\int|\widehat f|^2
$$

を確認せよ。ただし

$$
\int_{-\infty}^{\infty}\frac{d\xi}{(1+\xi^2)^2}=\frac\pi2
$$

を使ってよい。

<!-- solution-start -->
#### 詳細解答

空間側は

$$
\int_{\mathbb R}e^{-2|x|}dx
=2\int_0^\infty e^{-2x}dx=1.
$$

周波数側は

$$
\frac1{2\pi}\int_{\mathbb R}\frac4{(1+\xi^2)^2}d\xi
=\frac1{2\pi}\cdot4\cdot\frac\pi2
=1.
$$

両辺が一致する。

#### 本番答案

$\|f\|_2^2=1$、$(2\pi)^{-1}\|\hat f\|_2^2=(2\pi)^{-1}4(\pi/2)=1$。

#### 採点基準（20点）
- 空間側: 7点
- 周波数側: 9点
- 規約の確認: 4点
<!-- solution-end -->

### F0-00FA3-B01 Fourier変換が距離を保存する

- Level: B
- 目安時間: 12分

正規化Fourier変換 $\mathcal F_u=(2\pi)^{-1/2}\mathcal F$ について、Plancherel等式から任意の $f,g\in L^2(\mathbb R)$ に対し

$$
\|\mathcal F_u f-\mathcal F_u g\|_2=\|f-g\|_2
$$

を示し、「Fourier変換が無限次元の直交座標変換」と呼べる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

線形性より $\mathcal F_u f-\mathcal F_u g=\mathcal F_u(f-g)$。Plancherelによるノルム保存を $f-g$ に適用すれば

$$
\|\mathcal F_u(f-g)\|_2=\|f-g\|_2.
$$

従って二点間の距離を保存する。有限次元の直交行列がEuclid距離を保存するのと同じ役割である。

#### 本番答案

$\|\mathcal F_u f-\mathcal F_u g\|_2=\|\mathcal F_u(f-g)\|_2=\|f-g\|_2$。よってHilbert空間の距離を保存するunitaryな座標変換である。

#### 採点基準（20点）
- 線形性: 5点
- Plancherel適用: 8点
- 距離保存: 4点
- 解釈: 3点
<!-- solution-end -->
''')

print('all next-batch pedagogy edits prepared')
