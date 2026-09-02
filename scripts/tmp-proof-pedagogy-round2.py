from pathlib import Path

ROOT = Path('textbook/volumes/00_foundations')


def load(name):
    p = ROOT / name / 'index.md'
    return p, p.read_text()


def save(p, s):
    p.write_text(s)


def insert_before(s, marker, addition, label):
    if addition.strip() in s:
        print(f'{label}: already applied')
        return s
    if marker not in s:
        raise SystemExit(f'{label}: marker not found')
    print(f'{label}: applied')
    return s.replace(marker, addition + '\n\n' + marker, 1)


def insert_after(s, marker, addition, label):
    if addition.strip() in s:
        print(f'{label}: already applied')
        return s
    if marker not in s:
        raise SystemExit(f'{label}: marker not found')
    print(f'{label}: applied')
    return s.replace(marker, marker + '\n\n' + addition, 1)


# ---------------------------------------------------------------------------
# B: metric spaces
# ---------------------------------------------------------------------------
p, s = load('F0_00B_距離空間_開集合_閉集合_収束')
intro = r'''## 0. まず「距離を変えると、近い・収束するの意味が変わる」を見る

抽象的な定義へ入る前に、同じ集合でも距離を変えると世界の見え方が変わることを確認します。

$X=\mathbb R^2$ で原点 $0=(0,0)$ と点 $x=(3,4)$ を考えると、

$$
d_2(0,x)=5,
\qquad
d_1(0,x)=7.
$$

同じ二点でも「どれくらい離れているか」は距離の選び方で変わります。さらに離散距離なら、異なる二点の距離は常に1です。

この違いは数値だけではありません。

| 距離 | 小さい球の形・意味 | 収束する列 |
|---|---|---|
| Euclid距離 $d_2$ | 丸い近傍 | 普通の意味で近づく列 |
| $d_1$ | ひし形の近傍 | $d_2$ と同じ収束を与える |
| 離散距離 | 半径1未満なら一点だけ | 最終的に定数になる列だけ |

したがって本章の主役は「点の集合」ではなく、

> **点の集合 + 何を近いとみなすか**

です。

この視点を持つと、開集合・閉集合・収束は別々の暗記事項ではなく、すべて「距離が作る近さ」を言い換えたものだと分かります。'''
s = insert_before(s, '---\n\n## 1. 距離空間', intro, 'B concrete-first intro')

road = r'''### 4.1.1 証明の見取り図：極限が二つあると三角不等式が壊れる

もし $x_n\to x$ と $x_n\to y$ が同時に起こり $x\ne y$ なら、十分後ろの $x_n$ は $x$ にも $y$ にも非常に近いはずです。

しかし

$$
d(x,y)
\le d(x,x_n)+d(x_n,y)
$$

なので、右辺を $d(x,y)$ より小さくできてしまい矛盾します。

完全証明では、この「一つの点 $x_n$ を中継すると $x$ と $y$ が近すぎる」という図だけを形式化します。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n$x\\ne y$ と仮定し', road, 'B uniqueness roadmap')

road = r'''### 4.2.1 証明の見取り図：後半は極限の近く、初項は有限個

収束列 $x_n\to x$ では、十分後ろの項は半径1の球 $B(x,1)$ に全部入ります。

残るのは有限個の初項だけなので、それらを全部含むよう半径を少し大きくすれば列全体を一つの球に入れられます。

つまり

```text
後半：収束の定義で一括して抑える
初項：有限個なので最大値で抑える
```

というだけです。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n$x_n\\to x$ とします。$\\varepsilon=1$', road, 'B bounded convergence roadmap')

closed_example = r'''### 5.1 具体例：$[0,1]$ は極限を受け止め、$(0,1)$ は逃がす

$[0,1]$ 内の点列が実数として収束すれば、その極限は0や1を含めて必ず $[0,1]$ に残ります。

一方

$$
x_n=\frac1n\in(0,1)
$$

は

$$
x_n\to0\notin(0,1).
$$

この違いが「閉集合は極限を逃さない」の中身です。閉集合の定義は補集合が開、という形ですが、実際に計算や最適化で使うときは点列版の方が直感的です。'''
s = insert_before(s, '> **定理（距離空間における閉集合の点列特徴付け）**', closed_example, 'B closed set example')

road = r'''### 5.2 証明の見取り図：開球と $1/n$ の二方向

同値性は二方向で考えます。

- **closed $\Rightarrow$ 極限を逃さない**：もし極限 $x$ が外側に出たなら、補集合が開なので $x$ の周りに外側だけの球がある。しかし収束列は最後にはその球へ入るので矛盾。
- **極限を逃さない $\Rightarrow$ closed**：閉でない点 $x$ があるなら、半径 $1/n$ の各球から $F$ の点を1つずつ取り、$x$ へ収束する列を人工的に作れる。

前半は「開球で追い出す」、後半は「$1/n$ 球から列を作る」が鍵です。'''
s = insert_before(s, '<!-- proof-start -->\n### 証明\n\nまず $F$ が閉集合であるとします。', road, 'B closed set roadmap')

closure = r'''### 7.1 直感：閉包とは「$A$ の点だけで好きなだけ近づける場所」

たとえば

$$
A=(0,1)
$$

なら、0と1は $A$ には入っていません。しかし

$$
1/n\to0,
\qquad
1-1/n\to1
$$

なので、どちらも $A$ の点だけで近づけます。したがって

$$
\overline A=[0,1].
$$

閉包を「最小の閉集合」という集合論的定義だけで覚えるより、**点列で到達できる点を全部追加したもの**と読むと後続の解析で使いやすくなります。'''
s = insert_before(s, '> **定理（閉包の点列特徴付け）**', closure, 'B closure intuition')

road = r'''### 7.2 証明の見取り図

- $x\in\overline A$ なら、どんな半径の球にも $A$ の点が入る。特に半径 $1/n$ の球から1点ずつ取れば $x_n\to x$。
- 逆に $A$ の点列 $x_n\to x$ があれば、$\overline A$ は閉集合で全ての $x_n$ を含むので、極限 $x$ も含む。

ここでも「半径 $1/n$ から列を作る」と「閉集合は極限を逃さない」の二つだけです。'''
s = insert_before(s, '<!-- proof-start -->\n### 証明\n\nまず $x\\in\\overline A$ とします。', road, 'B closure roadmap')

use = r'''## 8. この章で結局何を使えるようになったか

証明を後回しにして先へ進む場合でも、次の三つを本文として持っておけば十分です。

1. **距離が近さを決める。** 同じ集合でも距離を変えると開球や収束の意味が変わる。
2. **閉集合は極限を逃さない。** 制約集合内の近似列から極限を得たとき、閉性で極限を集合へ戻せる。
3. **閉包は点列で近づける点の集合。** 「限りなく近づけるがまだ集合に入っていない点」を追加する操作。

この三つが、次の連続性・コンパクト性・完備性の共通土台になります。'''
s = insert_before(s, '## 8. 最適化への接続', use, 'B takeaway')
s = s.replace('## 8. 最適化への接続', '## 9. 最適化への接続', 1)
s = s.replace('## 9. 演習 Level A', '## 10. 演習 Level A', 1)
s = s.replace('## 10. 演習 Level B', '## 11. 演習 Level B', 1)
s = s.replace('## 11. 次に進む', '## 12. 次に進む', 1)
save(p, s)


# ---------------------------------------------------------------------------
# C: continuity
# ---------------------------------------------------------------------------
p, s = load('F0_00C_連続写像_コンパクト性_最大最小')
intro = r'''## 0. まず一つの関数を三つの方法で見る

連続性には三つの表現がありますが、別々の概念ではありません。$f(x)=x^2$ を $x=1$ の近くで考えます。

- **$\varepsilon$--$\delta$**：$x$ を1に十分近づければ $x^2$ を1に好きなだけ近づけられる。
- **点列**：$x_n\to1$ なら $x_n^2\to1$。
- **開集合の逆像**：出力側の開集合を入力側へ引き戻しても開集合になる。

逆に段差関数

$$
f(x)=1_{[0,\infty)}(x)
$$

は0で不連続です。たとえば $x_n=-1/n\to0$ なのに

$$
f(x_n)=0\not\to1=f(0).
$$

点列版なら不連続性を一発で検出できます。

この章の目的は定義を三つ暗記することではなく、

> **同じ連続性を、問題に応じて一番使いやすい言語へ翻訳する**

ことです。'''
s = insert_before(s, '---\n\n## 1. 連続写像', intro, 'C concrete-first intro')

which = r'''### 2.1 どの表現をいつ使うか

| 表現 | 得意な場面 |
|---|---|
| $\varepsilon$--$\delta$ | 直接評価、連続性の定義そのもの |
| 点列 | 反例、極限計算、閉集合との組合せ |
| 開集合の逆像 | 位相的議論、閉集合の逆像、一般化 |

たとえば $x^2$ の連続性は点列で計算しやすく、$f^{-1}(F)$ が閉になることは逆像の言葉が最短です。'''
s = insert_before(s, '> **定理（距離空間における連続性の同値条件）**', which, 'C usage table')

road = r'''### 2.2 証明の見取り図

三つを一周させます。

```text
ε-δ
 ↓  収束列は最後にはδ球へ入る
点列
 ↓  逆像が開でないなら1/n球から反例列を作る
開集合の逆像
 ↓  出力側のε球を逆像して入力側のδ球を取る
ε-δ
```

特に中央の `点列 → 開集合` だけが少し技巧的で、F0-00Bと同じく「半径 $1/n$ の球から反例列を作る」が核心です。完全証明を閉じる場合でも、この一周だけは本文として残します。'''
s = insert_before(s, '<!-- proof-start -->\n### 証明\n\n#### 1 ⇒ 2', road, 'C equivalence roadmap')

after = r'''### 2.3 何が分かったか：連続写像は「極限操作と両立する」

点列版

$$
x_n\to x
\Longrightarrow
f(x_n)\to f(x)
$$

は、連続関数なら

$$
\lim f(x_n)=f(\lim x_n)
$$

と極限を関数の内外で交換できることを意味します。

これが次のコンパクト性で「連続像もコンパクト」、さらに最大最小定理へ進むための橋になります。'''
s = insert_after(s, '<!-- proof-end -->', after, 'C post-proof meaning')
s = s.replace('### 2.1 例：距離関数は連続', '### 2.4 例：距離関数は連続', 1)
save(p, s)


# ---------------------------------------------------------------------------
# D2: measurable spaces and functions
# ---------------------------------------------------------------------------
p, s = load('F0_00D2_測度_可測関数_Lebesgue積分_Lp')
intro = r'''## 0. まず有限の確率空間で測度論を読む

抽象記号へ入る前に、サイコロ1回を

$$
\Omega=\{1,2,3,4,5,6\}
$$

とします。全ての部分集合を事象としてよいなら $\mathcal F=2^\Omega$、公平なサイコロなら

$$
P(A)=\frac{\#A}{6}
$$

です。

このとき測度論の言葉は、すでに知っている確率の言葉そのものです。

| 測度論 | 確率論での読み方 |
|---|---|
| $\Omega$ | 起こりうる全結果 |
| $\mathcal F$ | 確率を割り当ててよい事象の集合 |
| 測度 $\mu$ | 集合の大きさ |
| 確率測度 $P$ | 全体の大きさが1の測度 |
| 可測関数 $X$ | 確率変数 |
| a.e. | 確率0の例外を除いて |

連続空間へ行くと「全ての部分集合に確率を割り当てる」ができなくなるため、$\sigma$代数が必要になります。

したがって本章は、確率論に突然別の抽象数学を持ち込むのではなく、**有限確率空間で当たり前だった構造を無限集合でも壊れない形へ拡張する章**です。'''
s = insert_before(s, '---\n\n## 1. なぜ集合族を選ぶ必要があるのか', intro, 'D2 finite probability intro')

road = r'''### 1.1 証明の見取り図：$\sigma$代数の三条件だけで他の集合演算を作る

定義に直接入っているのは「補集合」と「可算和」です。

- 可算共通部分は De Morgan 則で「補集合 + 可算和」に変換する。
- 集合差 $A\setminus B$ は $A\cap B^c$ に変換する。

つまり新しい公理を使うのではなく、定義の三条件を集合恒等式で使い回しているだけです。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\nDe Morgan則より', road, 'D2 sigma algebra roadmap')

measure = r'''### 4.1 直感：測度の基本性質は「集合の包含・増加が大きさへ反映される」

測度の公理は可算加法性ですが、実際の計算ではそこから導かれる

- $A\subset B$ なら $\mu(A)\le\mu(B)$
- $A_n\uparrow A$ なら $\mu(A_n)\uparrow\mu(A)$

を頻繁に使います。

後者は、集合を少しずつ増やして近似したときに、その大きさも極限で回収できるという性質です。Lebesgue積分のMCTへそのまま持ち上がります。'''
s = insert_before(s, '### 命題（単調性）', measure, 'D2 measure intuition')

road = r'''#### 証明の見取り図

$B$ を

$$
B=A\sqcup(B\setminus A)
$$

と分解し、測度の非負性を使います。包含関係を「互いに素な和」へ変換すれば可算加法性が使える、という典型パターンです。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n$B=A\\sqcup(B\\setminus A)$', road, 'D2 monotonicity roadmap')

road = r'''#### 証明の見取り図

増加列 $A_n$ を、そのたびに新しく増えた部分

$$
B_1=A_1,
\qquad
B_n=A_n\setminus A_{n-1}
$$

へ分解します。$B_n$ は互いに素なので、集合の増加問題を数列の部分和問題へ変換できます。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n$B_1=A_1$', road, 'D2 continuity below roadmap')

ae = r'''### 5.1 具体例：確率0の例外は「存在しない」とは違う

一様分布 $U\sim\mathrm{Unif}(0,1)$ では

$$
P(U=1/2)=0
$$

ですが、$U=1/2$ という値そのものが論理的に不可能なわけではありません。

同様にLebesgue測度では、可算集合 $\mathbb Q\cap[0,1]$ は無数の点を含むにもかかわらず測度0です。

したがって a.e. は

> **例外集合は空ではないかもしれないが、積分・確率の観点では大きさ0**

という意味です。これが後で「関数を測度0集合上の違いを無視して同一視する」$L^p$ 空間につながります。'''
s = insert_before(s, '## 6. 可測関数', ae, 'D2 ae intuition')

meas = r'''### 6.1 直感：可測関数は「値の条件を事象へ戻せる関数」

確率変数 $X$ について

$$
P(X\le a)
$$

を考えるには、集合

$$
\{\omega:X(\omega)\le a\}
$$

が $\mathcal F$ に入っていなければなりません。

可測関数の定義はまさに、**出力側のしきい値条件を入力側の可測集合へ引き戻せる**ことを要求しています。連続写像の「開集合の逆像が開」と同じ構図です。'''
s = insert_before(s, '### 定義（実数値可測関数）', meas, 'D2 measurable intuition')

road = r'''#### 証明の見取り図：連続性の逆像条件をBorel集合全体へ広げる

連続関数なら開集合の逆像は開集合なのでBorelです。

そこで「逆像がBorelになる出力集合の族」を $\mathcal C$ と置き、$\mathcal C$ 自身が$\sigma$代数で全ての開集合を含むことを示します。すると開集合が生成する最小の$\sigma$代数、すなわちBorel$\sigma$代数全体が $\mathcal C$ に入ります。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n連続性より任意の開集合', road, 'D2 continuous measurable roadmap')

road = r'''#### 証明の見取り図：指示関数は集合そのものを0/1へ符号化している

$1_A$ の値は0と1だけなので、しきい値 $1/2$ を使えば

$$
A=\{1_A>1/2\}
$$

と集合 $A$ をそのまま復元できます。したがって「$1_A$ が可測」と「$A$ が可測」は同じ情報です。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n$A\\in\\mathcal F$ なら', road, 'D2 indicator roadmap')

summary = r'''## 7. この講義で作った土台

ここまでで次の階層ができました。

```text
測ってよい集合を決める        → σ代数
集合へ大きさを割り当てる      → 測度
大きさ0の例外を無視する       → a.e.
値の条件を可測集合へ戻せる    → 可測関数
```

次講D2Aでは、この可測関数に対して積分を

```text
指示関数 → 単関数 → 非負可測関数 → 一般可積分関数
```

の順に構成します。証明を閉じて読む場合でも、この二段の階層だけは持ったまま先へ進んでください。'''
s = insert_before(s, '## 7. 演習', summary, 'D2 takeaway')
s = s.replace('## 7. 演習', '## 8. 演習', 1)
s = s.replace('## 8. 次に進む', '## 9. 次に進む', 1)
save(p, s)


# ---------------------------------------------------------------------------
# D2A: build Lebesgue integral
# ---------------------------------------------------------------------------
p, s = load('F0_00D2A_単関数_Lebesgue積分_構成')
intro = r'''## 0. まず階段関数で「下から面積を作る」を見る

$[0,1]$ 上の

$$
f(x)=x
$$

を考えます。幅 $1/4$ ごとに高さを下側へ丸めると、たとえば

$$
\phi(x)
=
0\,1_{[0,1/4)}
+\frac14 1_{[1/4,1/2)}
+\frac12 1_{[1/2,3/4)}
+\frac34 1_{[3/4,1]}
$$

という階段関数を作れます。

この $\phi$ は $0\le\phi\le f$ で、積分は長方形の面積の和

$$
\int_0^1\phi(x)\,dx
=
\frac14\left(0+\frac14+\frac12+\frac34\right)
=
\frac38.
$$

刻みを細かくすれば、下側の階段関数は $f$ へ近づき、面積も $1/2$ へ近づきます。

Lebesgue積分の構成は、この小学校的な「長方形の面積の和」を一般の測度空間まで押し広げたものです。

```text
集合の大きさ μ(A)
 ↓ 高さ1を乗せる
指示関数 1_A の積分
 ↓ 有限個足す
単関数の積分
 ↓ 下から細かく近似
非負可測関数の積分
 ↓ 正負に分解
一般の可積分関数
```

この順番を持っていれば、後の定義が突然のものに見えません。'''
s = insert_before(s, '---\n\n## 1. 指示関数から始める', intro, 'D2A staircase intro')

road = r'''### 証明の見取り図：異なる分割を共通の細分へ落とす

同じ階段関数を違う区間分割で書いても、両方の分割を交差させた共通細分

$$
A_i\cap B_j
$$

まで細かくすれば、各小片の上では二つの表現の高さは同じです。

あとは同じ小片の「高さ×測度」を足し直すだけなので積分値は変わりません。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n2つの表現を', road, 'D2A representation roadmap')

approx = r'''### 3.1 直感：一般関数をいきなり積分せず、「有限段の下側近似」へ戻す

一般の可測関数は無限に多くの値を取るため、そのままでは「高さ×測度」の有限和にできません。

そこで

1. 高さを細かい刻みで下へ丸める。
2. 高すぎる部分は一度有限の高さで切る。
3. 刻みを細かくし、切断高さを上げる。

とすれば、単関数 $\phi_n$ が単調に $f$ へ迫ります。

この構成が、後のMCTで「単関数で分かることを一般非負関数へ持ち上げる」ためのエンジンになります。'''
s = insert_before(s, '### 定理（単関数近似）', approx, 'D2A approximation intuition')

road = r'''### 証明の見取り図

各 $n$ で関数値を幅 $2^{-n}$ の階段へ下向きに丸め、さらに高さ $2^n$ で切断します。

- 刻み幅 $2^{-n}$ は0へ行くので丸め誤差が消える。
- 切断高さ $2^n$ は無限大へ行くので有限値の点では切断の影響が消える。
- 前の近似より細かく・高くするため $\phi_n\le\phi_{n+1}$。

この三点で $\phi_n\uparrow f$ を作ります。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n$n\\ge1$ に対して', road, 'D2A approximation roadmap')

sup = r'''### 4.1 なぜ supremum で定義するのか

非負関数 $f$ の下に入る単関数は一つではありません。粗い近似も細かい近似もあります。

そこで「下から作れる面積のうち最大限どこまで行けるか」を

$$
\sup\left\{\int\phi:0\le\phi\le f\right\}
$$

で取ります。

この定義なら、特定の近似手順に依存せず、**全ての下側階段近似を使った最良の面積**として積分が決まります。'''
s = insert_before(s, '### 定義（非負可測関数のLebesgue積分）', sup, 'D2A supremum meaning')

road = r'''#### 証明の見取り図

$f\le g$ なら、$f$ の下に入る単関数は自動的に $g$ の下にも入ります。

したがって supremum を取る候補集合が包含され、積分の大小もそのまま従います。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n$f$ 以下の非負単関数', road, 'D2A monotonicity roadmap')

road = r'''### 証明の見取り図：差がある場所の測度が0なら、その差の面積も0

$h=|f-g|$ と置くと、$h$ が正になるのは測度0集合 $N$ の上だけです。

$h$ 以下の単関数も $N$ の外では0なので、その積分は「有限の高さ × 測度0」の和になり0です。したがって $\int|f-g|=0$、積分値は一致します。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n$h=|f-g|$ とします。', road, 'D2A ae equality roadmap')

summary = r'''## 7.1 何を構成したのか

Lebesgue積分は最初から謎の公式として置いたのではなく、

$$
\boxed{
\mu(A)
\to
\int 1_A
\to
\int\phi
\to
\int f\ (f\ge0)
\to
\int f\ (\text{符号あり})
}
$$

と、既知の「集合の大きさ」から一段ずつ作りました。

次講D2Bでは、この構成が単調極限と非常に相性がよいことを使って、極限と積分の交換定理を証明します。'''
s = insert_before(s, '---\n\n# 8. 演習', summary, 'D2A takeaway')
save(p, s)


# ---------------------------------------------------------------------------
# D2B: convergence theorems
# ---------------------------------------------------------------------------
p, s = load('F0_00D2B_単調収束_Fatou_優収束')
intro = r'''## 0. まず「点ごとに収束したから積分も収束」は偽だと知る

$[0,1]$ 上で

$$
f_n(x)=n1_{(0,1/n)}(x)
$$

を考えます。各 $x>0$ では十分大きい $n$ で $f_n(x)=0$ なので

$$
f_n\to0\quad\text{a.e.}
$$

です。

しかし面積は高さ $n$ × 幅 $1/n$ なので

$$
\int_0^1 f_n(x)\,dx=1
$$

のままです。したがって

$$
\lim_n\int f_n=1
\ne
0=\int\lim_n f_n.
$$

つまり極限と積分の交換には追加条件が必要です。

この講義の三定理は、その追加条件を別々の形で与えます。

| 定理 | 何を保証に使うか |
|---|---|
| MCT | 非負で下から単調増加 |
| Fatou | 非負性だけを残し、等号ではなく下からの不等式 |
| DCT | 単調性の代わりに一つの可積分な支配関数 |

最初にこの失敗例を持っておくと、仮定が単なる技術条件ではないことが分かります。'''
s = insert_before(s, '---\n\n## 1. 単調収束定理', intro, 'D2B counterexample intro')

road = r'''### 1.1 証明の見取り図

$f_n\le f$ なので

$$
\lim_n\int f_n\le\int f
$$

はすぐ出ます。難しいのは逆向きです。

そこで $f$ の下にある任意の単関数 $\phi$ を固定し、$f_n$ が最終的に $\alpha\phi$ を覆う部分を増やしていきます。測度の下からの連続性で

$$
\int f_n\gtrsim \alpha\int\phi
$$

を得て、最後に $\alpha\uparrow1$、さらに全ての $\phi\le f$ の supremum を取ります。

つまり **一般の $f$ を直接つかまず、Lebesgue積分の定義である単関数近似へ戻る** のが核心です。'''
s = insert_before(s, '<!-- proof-start -->\n### 証明\n\n$f_n\\le f$ なので', road, 'D2B MCT roadmap')

fatou = r'''### 2.1 直感：単調でない列から「単調な下側包絡」を作る

元の $f_n$ が上下に振動していても、

$$
g_n=\inf_{k\ge n}f_k
$$

と置けば

$$
g_1\le g_2\le\cdots
$$

という単調増加列になります。

しかも極限は

$$
g_n\uparrow\liminf f_n.
$$

したがってFatouは「振動する列を liminf という単調な下側近似へ変換し、MCTを使う定理」と読めます。'''
s = insert_before(s, '### 補題（Fatouの補題）', fatou, 'D2B Fatou intuition')

road = r'''### 2.2 証明の見取り図

1. $g_n=\inf_{k\ge n}f_k$ を作る。
2. $g_n\uparrow\liminf f_n$ なのでMCT。
3. $g_n\le f_k$ $(k\ge n)$ から積分も下から抑える。
4. $n\to\infty$ で liminf が現れる。

Fatouは独立の巨大定理というより、MCTを使える形へ列を加工した結果です。'''
s = insert_before(s, '<!-- proof-start -->\n### 証明\n\n$$\ng_n(\\omega)', road, 'D2B Fatou roadmap')

dct = r'''### 3.1 直感：支配関数は「質量が細い場所へ逃げて集中する」のを防ぐ

冒頭の反例 $n1_{(0,1/n)}$ は、高さがどんどん大きくなるため、一つの可積分関数では全てを支配できません。

DCTの条件

$$
|f_n|\le g,\qquad \int g<\infty
$$

は、関数列の質量が無限に高いスパイクとして逃げるのを一つの積分可能な天井で抑えます。

単調性がなくてもこの天井があれば、点ごとの収束を $L^1$ 収束まで強められます。'''
s = insert_before(s, '### 定理（Lebesgueの優収束定理）', dct, 'D2B DCT intuition')

road = r'''### 3.2 証明の見取り図

$|f_n-f|\to0$ を示したいので、それを直接DCTに使うのではなくFatouへ戻します。

$$
0\le 2g-|f_n-f|
$$

という非負関数を作ると、Fatouの不等式を整理するだけで

$$
\limsup_n\int|f_n-f|\le0
$$

が出ます。

つまり証明の依存関係は

```text
MCT
 ↓
Fatou
 ↓
DCT
```

そのものです。'''
s = insert_before(s, '<!-- proof-start -->\n### 証明\n\n$f_n\\to f$ a.e.', road, 'D2B DCT roadmap')

summary = r'''## 4.1 三定理を一つの絵で覚える

```text
非負 + 単調増加
   └─ MCT: 等号で極限交換

非負だけ
   └─ Fatou: 下からの不等式だけ残る

符号あり・単調でない
   + 可積分な共通上界
   └─ DCT: L1収束まで得る
```

「どの定理名だったか」より、**何が極限交換を安全にしているか**を先に見ます。'''
s = insert_before(s, '## 5. DCTの仮定がないと何が起きるか', summary, 'D2B summary')
save(p, s)


# ---------------------------------------------------------------------------
# D2C: product measure, Tonelli, Fubini
# ---------------------------------------------------------------------------
p, s = load('F0_00D2C_積測度_Tonelli_Fubini')
intro = r'''## 0. まず普通の二重積分から「順序交換の条件」を考える

長方形上の

$$
f(x,y)=xy,
\qquad 0\le x\le1,\ 0\le y\le2
$$

なら、高校・大学初年級の計算では

$$
\int_0^1\int_0^2xy\,dy\,dx
=
\int_0^2\int_0^1xy\,dx\,dy
=1
$$

と積分順序を自由に変えます。

測度論で問うのは、

> **この順序交換は、どんな関数・どんな空間でも本当に安全なのか。**

です。

答えは「条件つき」です。

- $f\ge0$ なら **Tonelli**：値が $\infty$ でもよく、反復積分を安全に作れる。
- 符号があるなら **Fubini**：$\int|f|<\infty$ という絶対可積分性を要求する。

この二つを区別するために、まず積空間とsectionを準備します。'''
s = insert_before(s, '---\n\n## 1. 積σ代数', intro, 'D2C integral-order intro')

section = r'''### 3.1 具体例：長方形を縦に切る

$E=[0,1]\times[0,2]$ とすると、固定した $x$ に対するsectionは

$$
E_x=
\begin{cases}
[0,2],&0\le x\le1,\\
\varnothing,&\text{otherwise}.
\end{cases}
$$

です。

したがって

$$
\nu(E_x)=2\,1_{[0,1]}(x)
$$

をさらに $x$ で積分すると面積2が出ます。

sectionは「二次元集合を一方向にスライスし、その断面の大きさをもう一方で積分する」ための道具です。'''
s = insert_before(s, '### 命題（可測集合のsectionは可測）', section, 'D2C section example')

road = r'''#### 証明の見取り図

固定した $x$ について「sectionが可測になる集合 $E$ 全体」を $\mathcal C_x$ と置きます。

- sectionは補集合・可算和と可換するので $\mathcal C_x$ は$\sigma$代数。
- 長方形 $A\times B$ のsectionは $B$ または空集合なので可測。

したがって長方形が生成する積$\sigma$代数全体が $\mathcal C_x$ に入ります。'''
s = insert_before(s, '<!-- proof-start -->\n#### 証明\n\n固定した $x\\in X$ に対して', road, 'D2C section roadmap')

tonelli = r'''### 4.1 直感：Tonelliは「非負だから足し合わせる順序で相殺事故が起きない」

非負関数では、どの方向から積分しても全ての寄与は足し算です。途中で $+\infty$ になっても矛盾は起きません。

そのためTonelliは

$$
f\ge0
$$

だけで二重積分と反復積分の一致を保証し、値 $\infty$ も許します。

証明もLebesgue積分の構成と同じく

```text
指示関数 → 単関数 → 一般の非負可測関数
```

と持ち上げます。'''
s = insert_before(s, '### 定理（Tonelli）', tonelli, 'D2C Tonelli intuition')

road = r'''### 4.2 証明の見取り図

1. 長方形の指示関数では「面積 = 横の測度 × 縦の測度」で直接確認。
2. 一般の可測集合の指示関数へ拡張。
3. 有限線形性で単関数へ。
4. 単関数近似 $\phi_n\uparrow f$ とMCTで一般の非負関数へ。

つまりTonelliは、積測度の構成を土台にして **D2Aの単関数近似 + D2BのMCT** を二変数へ適用した定理です。'''
s = insert_before(s, '<!-- proof-start -->\n### 証明\n\n証明は「指示関数', road, 'D2C Tonelli roadmap')

fubini = r'''### 5.1 直感：符号があると「正と負の無限大の相殺」を禁止する必要がある

符号付き関数では、正の部分と負の部分がそれぞれ無限大だと

$$
\infty-\infty
$$

のような不定形が入り込み、積分順序によって見かけの値が変わる危険があります。

そこでFubiniは

$$
\int|f|<\infty
$$

を要求します。これは正部分・負部分の両方が有限であることを保証し、順序交換を安全にします。'''
s = insert_before(s, '### 定理（Fubini）', fubini, 'D2C Fubini intuition')

road = r'''### 5.2 証明の見取り図

まずTonelliを非負関数 $|f|$ に適用し、ほとんど全てのsectionで

$$
\int|f(x,y)|d\nu(y)<\infty
$$

を確保します。

次に

$$
f=f^+-f^-
$$

と分解し、非負な $f^+,f^-$ それぞれにTonelliを適用して最後に差を取ります。

つまりFubiniはTonelliの別証明ではなく、**絶対可積分性によってTonelliを正負二回使えるようにした系**です。'''
s = insert_before(s, '<!-- proof-start -->\n### 証明\n\nTonelliを非負関数 $|f|$', road, 'D2C Fubini roadmap')

decision = r'''### 6.1 実戦の判定順

二重積分を見たら、いきなり積分順序を交換せず次の順で確認します。

```text
f >= 0 ?
 ├─ Yes → Tonelli。∞でもよい
 └─ No
      ↓
   ∫|f| < ∞ ?
      ├─ Yes → Fubini。順序交換可
      └─ No  → そのまま交換しない。個別検討
```

特に確率論では非負密度・非負期待値ならTonelli、一般の期待値交換ではFubiniという使い分けが頻出します。'''
s = insert_before(s, '## 7. 具体例', decision, 'D2C decision rule')
save(p, s)


# ---------------------------------------------------------------------------
# D2E: L2 completeness
# ---------------------------------------------------------------------------
p, s = load('F0_00D2E_L2完備性_Riesz_Fischer')
example = r'''## 0. まず「$L^2$で近い」を具体例で見る

$[0,1]$ 上で

$$
f_n=1_{[0,1/n]}
$$

とします。各 $f_n$ は高さ1ですが、非零な区間が縮むので

$$
\|f_n\|_2^2
=
\int_0^1|f_n|^2dx
=
\frac1n,
$$

したがって

$$
\|f_n\|_2=\frac1{\sqrt n}\to0.
$$

つまり $L^2$ では「各点でどれくらい違うか」ではなく、**差の二乗を全体で積分した平均的な大きさ**で近さを測ります。

有限次元の $\mathbb R^p$ ならCauchy列が座標ごとに収束して極限ベクトルを作れますが、$L^2$ は無限次元です。そこで本章では

> **関数のCauchy列から、同じ $L^2$ の中に極限関数を本当に作れるか**

を証明します。'''
s = insert_before(s, '---\n\n## 1. Cauchy列と完備性の復習', example, 'D2E L2 example intro')

road = r'''### 5.1 証明の見取り図

長い完全証明に入る前に、役割だけ五段階で追います。

```text
L2-Cauchy列 (f_n)
 ↓
差が 2^{-k} 以下になる速い部分列を取る
 ↓
差分の絶対値級数が a.e. で有限になる
 ↓
各点で部分列の極限 f を作る
 ↓
尾部評価で f_{n_k} → f in L2
 ↓
元のCauchy列全体も f へ収束
```

難所は「$L^2$-Cauchyだから点wise Cauchy」と直接は言えない点です。そこで速い部分列と差分級数を橋にします。

完全証明の各Stepは、この矢印を一つずつ正当化しています。'''
s = insert_before(s, '<!-- proof-start -->\n### 証明\n\n$(f_n)$ を $L^2', road, 'D2E main proof roadmap')

meaning = r'''## 6.1 完備性が何を買っているか

$L^2$ が完備であることで、近似計算や射影法から得た

$$
f_1,f_2,\ldots
$$

について「互いにどんどん近づく」ことを $L^2$ ノルムで示せば、極限候補を先に知っていなくても

$$
\exists f\in L^2:\quad \|f_n-f\|_2\to0
$$

を保証できます。

これはF0-00Dで見た

> **Cauchy + complete = 極限の存在**

を関数空間で実現したものです。'''
s = insert_before(s, '---\n\n## 7. なぜ統計学で重要なのか', meaning, 'D2E completeness meaning')
save(p, s)


# ---------------------------------------------------------------------------
# P4: Borel-Cantelli and convergence
# ---------------------------------------------------------------------------
p, s = load('F0_00P4_収束_Borel_Cantelli_一様可積分性')
intro = r'''## 0. まず「無限回起こる」をコイン投げで見る

独立なコイン投げで、$A_n$ を「$n$ 回目が表」とします。

各 $A_n$ は1回限りの事象ですが、

$$
\limsup_n A_n
$$

は

> **どれだけ先へ進んでも、その後また表が出る**

すなわち「表が無限回出る」という一つの事象です。

逆に $P(A_n)\le2^{-n}$ のように事象が急速に希少になるなら

$$
\sum_nP(A_n)<\infty
$$

で、第一Borel--Cantelliにより無限回は起こりません。

この章でやることは、個々の確率 $P(A_n)$ を

> **長期的に何度起きるか**

という経路の情報へ変換することです。これが確率収束からa.s.収束を引き出す道具になります。'''
s = insert_before(s, '---\n\n## 1. 事象のlimsup', intro, 'P4 coin intro')

limsup_ex = r'''### 1.1 具体例：limsupとliminfは「無限回」と「最終的にずっと」

決定論的な集合列

$$
A_n=\begin{cases}
\{0\},&n\text{ が偶数},\\
\varnothing,&n\text{ が奇数}
\end{cases}
$$

では、0は無限回 $A_n$ に入るので

$$
\limsup A_n=\{0\}.
$$

しかし「ある時点以降ずっと」入るわけではないので

$$
\liminf A_n=\varnothing.
$$

この差が、確率変数列で「大きな誤差がたまに再発する」と「最終的に誤差が消える」を区別します。'''
s = insert_before(s, '## 2. liminf', limsup_ex, 'P4 limsup example')

bc = r'''### 4.1 証明の見取り図：無限回起こるなら、どの尾部にも少なくとも一回起こる

$$
\{A_n\text{ i.o.}\}
\subset
\bigcup_{n\ge m}A_n
$$

は任意の $m$ で成り立ちます。

右辺の確率をunion boundで

$$
P\left(\bigcup_{n\ge m}A_n\right)
\le\sum_{n\ge m}P(A_n)
$$

と抑え、収束級数の尾部が0へ行くことを使います。

つまり第一補題は「無限回」という複雑な経路事象を、単なる級数の尾部評価へ変換しています。'''
s = insert_before(s, '<!-- proof-start -->\n### 証明\n\n任意の $m$ について', bc, 'P4 BC1 roadmap')

use = r'''### 5.1 具体例：確率評価を summable にできると a.s. まで上がる

たとえば

$$
P(|X_n-X|>\varepsilon)\le C_\varepsilon n^{-2}
$$

と評価できれば

$$
\sum_nP(|X_n-X|>\varepsilon)<\infty.
$$

したがって超過事象はa.s.有限回しか起きません。

単に

$$
P(|X_n-X|>\varepsilon)\to0
$$

だけでは確率収束ですが、**級数として足せるほど速く0へ行く**とBorel--Cantelliを通して経路ごとのa.s.収束へ強化できます。'''
s = insert_before(s, '## 6. Borel--Cantelli第2補題', use, 'P4 summability example')

mapsec = r'''## 8.1 収束概念の地図

この講義で直接得た含意は

$$
X_n\xrightarrow{a.s.}X
\Longrightarrow
X_n\xrightarrow{p}X,
$$

$$
X_n\xrightarrow{L^p}X
\Longrightarrow
X_n\xrightarrow{p}X.
$$

です。一方、確率収束からa.s.収束は一般にはそのまま戻せませんが、**a.s.収束する部分列は必ず取れる**という重要な事実を演習B01で示します。

```text
L^p ───────→ probability
                ↑
a.s. ───────────┘

probability ──→ a.s. convergent subsequence
```

次講P4Aでは、さらに「確率収束だけでは期待値収束しない」という別の不足を一様可積分性で埋めます。'''
s = insert_before(s, '---\n\n## 演習', mapsec, 'P4 convergence map')
save(p, s)

print('Proof pedagogy round2 narrative revisions completed.')
