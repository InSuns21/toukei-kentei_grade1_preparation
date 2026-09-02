from pathlib import Path

p = Path('textbook/volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md')
s = p.read_text()

def insert_before(marker, addition, label):
    global s
    if addition.strip() in s:
        print(f'{label}: already applied')
        return
    if marker not in s:
        raise SystemExit(f'{label}: marker not found')
    s = s.replace(marker, addition + '\n\n' + marker, 1)
    print(f'{label}: applied')

intro = r'''## 0. まず三つの列で「コーシー」と「完備」を見る

定義へ入る前に、通常の距離で三つの列を比べます。

### 0.1 具体例：$1/n$ は「後半同士」が近づく

$\mathbb R$ で

$$
x_n=\frac1n
$$

とします。もちろん $x_n\to0$ ですが、コーシー列の見方では極限0を使わず、十分大きい $m,n$ に対して

$$
|x_m-x_n|
\le
\frac1m+\frac1n
$$

が小さくなることに注目します。

つまりコーシー条件は、

> **極限がどこかをまだ知らなくても、列の後半が互いに固まっていくことを検出する条件**

です。

### 0.2 反例：$(-1)^n$ は後半になっても固まらない

$$
x_n=(-1)^n
$$

では、どれだけ後ろへ進んでも偶数番目と奇数番目の距離は

$$
|1-(-1)|=2
$$

のままです。したがってコーシー列ではありません。

「有界である」だけでは足りず、**後半の全ての項が互いに近い**必要があります。

### 0.3 具体例：有理数の中では「着地点がない」ことがある

$\sqrt2$ を小数で切り捨てた有理数列

$$
1.4,\ 1.41,\ 1.414,\ 1.4142,\ldots
$$

を考えます。この列の後半同士は好きなだけ近くなるので、$\mathbb Q$ の中でもコーシー列です。

しかし着地点 $\sqrt2$ は $\mathbb Q$ にありません。

ここで初めて「空間そのものの性質」が問題になります。

```text
列の後半が互いに近づく
        ↓
      Cauchy
        ↓
その列に着地点を空間内で用意できるか
        ↓
    completeness
```

完備性は、**コーシー列が指し示す極限に対して空間に穴がない**ことだと捉えられます。'''
insert_before('---\n\n## 1. コーシー列', intro, 'concrete-first introduction')

cauchy_reading = r'''### 1.1 直感：収束は「点との距離」、コーシーは「列内部の距離」

二つの定義は似ていますが、観測しているものが違います。

| 条件 | 比べるもの | 極限候補を先に知る必要 |
|---|---|---|
| $x_n\to x$ | $x_n$ と固定点 $x$ | ある |
| $(x_n)$ がCauchy | $x_m$ と $x_n$ | ない |

この違いが重要なのは、解析では極限の正体を先に書けない場面が多いからです。まず評価だけから「この近似列はCauchyだ」と示し、**完備性を使って極限の存在を後から確保する**、という順序が使えます。'''
insert_before('---\n\n## 2. 収束列は必ずコーシー列', cauchy_reading, 'Cauchy intuition')

proof2 = r'''### 2.1 証明の見取り図

収束列では、十分後ろの項は全て極限 $x$ の近くにあります。そこで

$$
x_m\longrightarrow x\longleftarrow x_n
$$

と極限を中継点にし、両側を $\varepsilon/2$ ずつにします。

$$
d(x_m,x_n)
\le d(x_m,x)+d(x,x_n)
<\frac\varepsilon2+\frac\varepsilon2.
$$

完全証明で行っていることは、この三角不等式だけです。'''
insert_before('<!-- proof-start -->\n### 証明\n\n$x_n\\to x$ とします。', proof2, 'convergent implies Cauchy roadmap')

after2 = r'''### 2.2 意味：逆向きには「空間の条件」が必要

ここまでで

$$
\text{収束}
\Longrightarrow
\text{Cauchy}
$$

はどんな距離空間でも成立しました。

しかしCauchy条件は「列がどこへ着地するか」を指定していません。着地点が空間の外に抜ける可能性を排除するのが、次の完備性です。'''
insert_before('逆向き\n\n$$\n\\text{コーシー列}\\Rightarrow\\text{収束列}', after2, 'post-proof meaning')

complete_intuition = r'''### 3.1 直感：「近似が勝手に空間外へ落ちない」

完備性を使う典型的な論理は

```text
具体的な極限はまだ分からない
  ↓
評価から近似列が Cauchy と分かる
  ↓
空間が complete
  ↓
空間内のどこかに極限が存在する
```

です。

ここで重要なのは、**完備性は個々の列の性質ではなく、空間が全てのCauchy列を受け止められるという性質**だという点です。'''
insert_before('---\n\n## 4. 実数は完備、有理数は完備でない', complete_intuition, 'completeness intuition')

s = s.replace('## 4. 実数は完備、有理数は完備でない', '## 4. 具体例：実数は完備、有理数は完備でない', 1)

q_vs_r = r'''### 4.1 同じ列でも「Cauchyか」と「収束するか」は別問題

上の $q_n$ を $\mathbb Q$ の列として見ても $\mathbb R$ の列として見ても、二項間の距離

$$
|q_m-q_n|
$$

は同じです。したがってCauchy性は変わりません。

一方、収束では極限がその空間の元でなければなりません。

| 見ている空間 | $(q_n)$ はCauchyか | 空間内で収束するか | 極限 |
|---|---|---|---|
| $\mathbb Q$ | Yes | No | $\sqrt2\notin\mathbb Q$ |
| $\mathbb R$ | Yes | Yes | $\sqrt2$ |

この例は

> **Cauchy性は列の内部情報、完備性は空間が着地点を持つかという外部条件**

を最もよく表します。

### 4.2 意味：$\mathbb R$ は $\mathbb Q$ の「穴を埋めた」空間

厳密な構成は別の話ですが、実数は「有理数のCauchy列が要求する不足した極限を追加して完備化したもの」と見ることができます。

この **completion（完備化）** という発想は、後で関数空間を作るときにも現れます。'''
insert_before('---\n\n## 5. 閉部分集合と完備性', q_vs_r, 'Q versus R interpretation')

closed_intro = r'''### 5.1 具体例：$[0,1]$ と $(0,1)$ の違い

$\mathbb R$ は完備です。その中で

- $[0,1]$ は閉集合なので、内部のCauchy列の極限が境界0や1に来ても集合内に残ります。
- $(0,1)$ は閉でないので、$x_n=1/n$ のようにCauchy列の極限が境界0へ抜けます。

したがって

$$
[0,1]\text{ は完備},
\qquad
(0,1)\text{ は完備でない}.
$$

完備な大空間の部分集合では、**「極限を外へ逃がさない」という閉性が、そのまま完備性を支える**と考えられます。'''
insert_before('> **定理（完備空間の閉部分集合は完備）**', closed_intro, 'closed subset example')

proof5a = r'''### 5.2 証明の見取り図：閉部分集合はなぜ完備か

流れは三段階です。

1. $F$ 内のCauchy列は、同じ距離で見れば大空間 $X$ でもCauchy。
2. $X$ の完備性により、まず $X$ のどこかへ収束する。
3. $F$ が閉なので、その極限は $F$ から外へ逃げない。

つまり **completeな環境が極限を作り、closednessが極限を部分集合内に留める** という役割分担です。'''
insert_before('<!-- proof-start -->\n### 証明\n\n$F$ 内の任意のコーシー列', proof5a, 'closed subset proof roadmap')

proof5b = r'''### 5.3 証明の見取り図：完備な部分空間はなぜ閉か

今度は向きが逆です。$F$ 内の点列が大空間 $X$ で $x$ に収束したとします。

- 収束列なので、その列はCauchy。
- $F$ 自身が完備なので、同じ列は $F$ 内のある $y$ に収束する。
- 距離空間では極限は一意だから $x=y\in F$。

したがって、$F$ の点列の極限が外へ抜けることはなく、$F$ は閉です。'''
insert_before('<!-- proof-start -->\n### 証明\n\n$F$ 内の点列 $(x_n)$ が $X$ で', proof5b, 'complete subspace proof roadmap')

closed_summary = r'''### 5.4 まとめ：完備な大空間の中では「closed = complete」

$X$ 自体が完備なら、制限距離を入れた部分集合 $F\subset X$ について

$$
\boxed{
F\text{ が完備}
\Longleftrightarrow
F\text{ が }X\text{ で閉}
}
$$

とまとめられます。

この形で覚えると、$\mathbb R^p$ の閉球・閉部分空間・閉制約集合などの完備性を、毎回Cauchy列から直接証明しなくて済みます。'''
insert_before('---\n\n---\n\n## 6. コンパクト距離空間は完備', closed_summary, 'closed complete summary')

compact_intro = r'''### 6.1 直感：compactnessは「収束する部分列」を必ず渡してくれる

Cauchy列 $(x_n)$ に対して、もし一つでも

$$
x_{n_k}\to x
$$

という収束部分列が見つかれば、実は列全体も同じ $x$ に収束します。

理由は、Cauchy条件によって十分後ろの全ての項が $x_{n_k}$ の近くに集まっているからです。

```text
compact
  ↓
Cauchy列から収束部分列を1本取る
  ↓
Cauchy性で残りの項もその部分列へ引き寄せる
  ↓
列全体が同じ極限へ収束
```

これが「compact $\Rightarrow$ complete」の中身です。'''
insert_before('> **定理（コンパクト距離空間は完備）**', compact_intro, 'compact completeness intuition')

proof6 = r'''### 6.2 証明の見取り図

完全証明では $\varepsilon/2$ を二回使います。

- Cauchy性から $x_n$ と十分後ろの部分列項 $x_{n_k}$ を $\varepsilon/2$ 以内にする。
- 部分列収束から $x_{n_k}$ と極限 $x$ を $\varepsilon/2$ 以内にする。

三角不等式で

$$
d(x_n,x)
\le d(x_n,x_{n_k})+d(x_{n_k},x)
<\varepsilon
$$

となり、元の列全体が収束します。'''
insert_before('<!-- proof-start -->\n### 証明\n\n$(x_n)$ を $K$ のコーシー列', proof6, 'compact proof roadmap')

comparison = r'''### 6.3 complete と compact は何が違うか

両者は「極限が逃げない」という点では似ていますが、compactの方が強い条件です。

| 空間・集合 | complete | compact | 何が壊れるか |
|---|---|---|---|
| $[0,1]$ | Yes | Yes | 逃げ道なし |
| $(0,1)$ | No | No | 境界0や1へ逃げる |
| $\mathbb R$ | Yes | No | 穴はないが無限遠へ逃げられる |
| $\mathbb Q$ | No | No | $\sqrt2$ などの穴がある |

完備性が防ぐのは主に **「Cauchy列が穴へ落ちること」** です。コンパクト性はそれに加えて、無限遠へ逃げたり、互いに離れた点を無限に並べたりすることも許しません。

距離空間ではさらに

$$
\text{compact}
\Longleftrightarrow
\text{complete} + \text{totally bounded}
$$

という定理があります。F0-00C1で出てきた全有界性は、compactnessがcompletenessより強い残り半分を表しています。'''

use_section = r'''## 7. なぜ解析で完備性を要求するのか

完備性は「定義を一つ増やす」ための概念ではなく、**近似から存在を作るための装置**です。

たとえば、未知の対象 $x$ を直接求められず、近似

$$
x_1,x_2,x_3,\ldots
$$

を作ったとします。評価から

$$
d(x_m,x_n)\to0
$$

を示せても、空間が非完備なら極限が空間外へ落ちる可能性があります。

空間が完備なら

$$
\boxed{
\text{近似列をCauchyにする}
\Longrightarrow
\text{求める極限が同じ空間内に存在する}
}
$$

へ進めます。

この考え方は次講以降で

- Banach空間
- $L^p$ 空間
- 関数列の極限
- Fourier解析や微分方程式での近似
- 最適化や反復法の収束議論

へつながります。

証明を後回しにする場合は、まず

> **Cauchy = 近似列が内部的に固まる条件、complete = その固まり先を空間内に保証する条件**

という役割分担を持って次へ進めば十分です。'''

marker = '---\n\n---\n\n## 7. 演習'
if marker not in s:
    raise SystemExit('exercise transition marker not found')
s = s.replace(marker, comparison + '\n\n---\n\n' + use_section + '\n\n---\n\n## 8. 演習', 1)
s = s.replace('## 8. 次に進む', '## 9. 次に進む', 1)

p.write_text(s)
print('F0-00D narrative revision completed.')
