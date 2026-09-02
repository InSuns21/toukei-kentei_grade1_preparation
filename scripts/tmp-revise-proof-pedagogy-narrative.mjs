import fs from 'node:fs';

const paths = {
  c1: 'textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md',
  c2: 'textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md',
  d1: 'textbook/volumes/00_foundations/F0_00D1_ノルム_Banach_有限次元_無限次元/index.md',
  d2d: 'textbook/volumes/00_foundations/F0_00D2D_Lp_Holder_Minkowski/index.md',
  f: 'textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md'
};

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

function write(path, text) {
  fs.writeFileSync(path, text);
}

function insertBefore(path, anchor, addition, label) {
  let src = read(path);
  const marker = addition.trim().split('\n')[0].trim();
  if (marker && src.includes(marker)) {
    console.log(`${label}: already applied`);
    return;
  }
  const index = src.indexOf(anchor);
  if (index < 0) throw new Error(`${label}: anchor not found`);
  src = src.slice(0, index) + addition + src.slice(index);
  write(path, src);
  console.log(`${label}: applied`);
}

function insertAfter(path, anchor, addition, label) {
  let src = read(path);
  const marker = addition.trim().split('\n')[0].trim();
  if (marker && src.includes(marker)) {
    console.log(`${label}: already applied`);
    return;
  }
  const index = src.indexOf(anchor);
  if (index < 0) throw new Error(`${label}: anchor not found`);
  const after = index + anchor.length;
  src = src.slice(0, after) + addition + src.slice(after);
  write(path, src);
  console.log(`${label}: applied`);
}

function replaceOnce(path, from, to, label) {
  let src = read(path);
  if (src.includes(to)) {
    console.log(`${label}: already applied`);
    return;
  }
  const index = src.indexOf(from);
  if (index < 0) throw new Error(`${label}: source text not found`);
  src = src.slice(0, index) + to + src.slice(index + from.length);
  write(path, src);
  console.log(`${label}: applied`);
}

function replaceSection(path, startHeading, nextHeading, replacement, label) {
  let src = read(path);
  if (src.includes(replacement.trim().split('\n')[0]) && src.includes(replacement.trim().split('\n')[1] ?? '')) {
    console.log(`${label}: already applied`);
    return;
  }
  const start = src.indexOf(startHeading);
  if (start < 0) throw new Error(`${label}: start heading not found`);
  const next = src.indexOf(nextHeading, start + startHeading.length);
  if (next < 0) throw new Error(`${label}: next heading not found`);
  src = src.slice(0, start) + replacement + '\n\n---\n\n' + src.slice(next);
  write(path, src);
  console.log(`${label}: applied`);
}

// ---------------------------------------------------------------------------
// C1: compactness. Put examples and the two usable interpretations before proof.
// ---------------------------------------------------------------------------
insertBefore(
  paths.c1,
  '---\n\n## 1. コンパクト性',
  String.raw`## 0. まず「コンパクト」を見分ける

定義へ入る前に、$\mathbb R$ の通常の距離で四つだけ見ます。

### 0.1 具体例：閉区間と、そこから何が壊れるか

| 集合 | コンパクトか | 何が起きるか |
|---|---|---|
| $[0,1]$ | Yes | どんな点列からも区間内へ収束する部分列を取れる |
| $(0,1)$ | No | $x_n=1/n$ は0へ近づくが、0は集合の外にある |
| $[0,\infty)$ | No | $x_n=n$ は無限遠へ逃げ、収束部分列を持たない |
| 有限集合 | Yes | 無限列なら同じ点が無限回現れ、その定数部分列を取れる |

ここで見えている失敗は二種類です。

- **境界へ逃げる**：$(0,1)$ の $1/n$。
- **無限遠へ逃げる**：$[0,\infty)$ の $n$。

コンパクト性は、ざっくり言えばこの二つの「逃げ道」を塞ぐ条件です。

### 0.2 直感：なぜ「有限部分被覆」という定義なのか

開被覆は「各点のまわりに、その点を安全に含む局所的な領域を置いたもの」と読めます。コンパクト集合では、どれほど細かい局所情報を用意しても、**有限個だけ残せば全体を管理できます**。

この有限化が、後続の

- 連続関数が最大値・最小値を実際に取る
- 互いに素なコンパクト集合の距離が正になる
- 有界な点列から収束部分列を取り出す

といった「存在する」を保証する議論の源になります。

### 0.3 二つの言語を使い分ける

本章では同じ性質を二つの言語で見ます。

```text
開被覆の言語
任意の開被覆から有限部分被覆を取れる

        ⇕  距離空間では同値

点列の言語
任意の点列から集合内へ収束する部分列を取れる
```

**定義を使うときは開被覆、実際の計算や反例では点列**という使い分けが多いです。証明を後回しにする場合も、まずこの対応を持って先へ進めます。

`,
  'C1 concrete-first introduction'
);

insertBefore(
  paths.c1,
  '<!-- proof-start -->\n### 証明：compact ⇒ sequentially compact',
  String.raw`### 2.1 証明の見取り図

二方向の完全証明は長いので、先に骨格だけ置きます。

- **compact $\Rightarrow$ sequentially compact**：収束部分列がないと仮定すると、各点のまわりに「列の項を有限個しか含まない球」を作れる。コンパクト性でその球を有限個に絞ると、無限列の全項が有限個しか存在できないことになって矛盾。
- **sequentially compact $\Rightarrow$ compact**：まず「任意の半径で有限個の球により覆える」という全有界性を得る。次に開被覆にLebesgue数を作り、有限個の小球を被覆の有限個の要素へ押し込む。

この節の完全証明は折りたたんだままでも構いません。以後使うのは主に「**距離空間では、コンパクト性を点列で判定してよい**」という結論です。

`,
  'C1 compact-sequential proof roadmap'
);

insertAfter(
  paths.c1,
  'この定理のおかげで、距離空間では開被覆を直接追わず、点列から収束部分列を取り出す方法を使えます。',
  String.raw`

### 2.2 使い方：証明より先にここを使えるようにする

コンパクト性を**否定**したいときは、集合内の点列を一つ作り、どの部分列も集合内へ収束できないことを示すのが典型です。

例えば $(0,1)$ では $x_n=1/n$ を取れば、どの部分列も実数として0へ収束します。しかし $0\notin(0,1)$ なので、集合内へ収束する部分列はありません。したがって $(0,1)$ はコンパクトではありません。

逆にコンパクト性が分かっている集合では、**有界な列から極限候補を取り出す装置**として点列コンパクト性を使います。C2以降ではこちらの使い方が主役です。`,
  'C1 usage after equivalence'
);

insertBefore(
  paths.c1,
  '> **補題（実数列のBolzano–Weierstrass）**',
  String.raw`### 3.1 具体例：有界列は「全部」収束しなくてよい

例えば

$$
x_n=(-1)^n+\frac1n
$$

は有界ですが、列全体は収束しません。それでも偶数番目は1へ、奇数番目は$-1$へ収束します。

Bolzano--Weierstrassが保証するのは、**有界列そのものの収束ではなく、収束部分列の存在**です。この違いを押さえると、Heine--Borelの証明で何を取り出しているのかが見えやすくなります。

`,
  'C1 Bolzano-Weierstrass example'
);

insertBefore(
  paths.c1,
  '> **定理（Heine–Borel）**',
  String.raw`### 4.1 具体例：$\mathbb R^p$ では「閉かつ有界」で判定できる

Heine--Borelは、抽象的なコンパクト性を有限次元で非常に使いやすい判定条件へ変えます。

- $[0,1]$：閉かつ有界なのでコンパクト。
- $(0,1)$：有界だが閉でないので非コンパクト。
- $[0,\infty)$：閉だが有界でないので非コンパクト。
- $[0,1]^p$：閉かつ有界なのでコンパクト。

後続で $\mathbb R^p$ の集合について「コンパクト」と言いたくなったら、まず **閉性と有界性** を確認するのが第一手です。

`,
  'C1 Heine-Borel examples'
);

insertBefore(
  paths.c1,
  '<!-- proof-start -->\n### 証明\n\n#### compact ⇒ closed and bounded',
  String.raw`### 4.2 証明の見取り図

- compact $\Rightarrow$ bounded：$B(0,n)$ という増大する開球で全体を覆い、有限部分被覆を取る。
- compact $\Rightarrow$ closed：点列コンパクト性を使い、集合内の収束列の極限が集合外へ逃げないことを示す。
- closed and bounded $\Rightarrow$ compact：有界列にBolzano--Weierstrassを使って収束部分列を取り、閉性で極限を集合内へ戻す。

ここで **Bolzano--Weierstrassが有限次元のスイッチ**です。無限次元では「閉かつ有界 $\Rightarrow$ コンパクト」は一般に壊れます。

`,
  'C1 Heine-Borel proof roadmap'
);

// ---------------------------------------------------------------------------
// C2: compactness as an attainment engine, with escape counterexamples first.
// ---------------------------------------------------------------------------
insertBefore(
  paths.c2,
  '---\n\n## 1. Weierstrassの最大最小定理',
  String.raw`## 0. 最初に：「下限がある」と「最小値を取る」は違う

この章の主役は、計算そのものではなく **最適値が本当にどこかで達成されるか** です。

### 0.1 具体例：$(0,1)$ では最小値が消える

$$
f(x)=x,
\qquad x\in(0,1)
$$

を考えます。値はいくらでも0へ近づけられるので

$$
\inf_{0<x<1}f(x)=0
$$

ですが、$f(x)=0$ となる $x\in(0,1)$ は存在しません。したがって **下限はあるが最小値はない** という状態です。

一方、定義域を $[0,1]$ に変えれば $x=0$ が残るので

$$
\min_{0\le x\le1}f(x)=0
$$

を実際に達成します。

### 0.2 なぜコンパクト性が効くのか

最小化列・最大化列が

- 境界から外へ逃げる
- 無限遠へ逃げる

ことを防ぎ、どこかに収束部分列を確保するのがコンパクト性です。連続性は、その極限へ関数値も一緒に運びます。

つまり本章の基本形は

```text
最適値へ近づく列を作る
        ↓
コンパクト性で収束部分列を取る
        ↓
閉性・連続性で極限を問題の中へ残す
        ↓
inf / sup が min / max になる
```

です。完全証明を後回しにしても、この型を使えることを優先します。

`,
  'C2 attainment-first introduction'
);

insertBefore(
  paths.c2,
  '<!-- proof-start -->\n### 証明\n\n連続像のコンパクト性より',
  String.raw`### 1.1 証明の見取り図

Weierstrassの定理は、C1の結果をほぼ一行で使う定理です。

```text
K がコンパクト
  ↓ 連続写像 f
f(K) もコンパクト
  ↓ R では Heine--Borel
f(K) は閉かつ有界
  ↓
sup f(K), inf f(K) が f(K) 自身に入る
```

最後の「閉」が、上限・下限を単なる極限値で終わらせず、実際の関数値へ戻します。

`,
  'C2 Weierstrass roadmap'
);

insertBefore(
  paths.c2,
  '## 2. 有限直積もコンパクト',
  String.raw`### 1.2 具体例：二次関数なら何が保証されるか

$$
f(x)=x(1-x),
\qquad x\in[0,1]
$$

は連続で、$[0,1]$ はコンパクトです。したがって微分計算を始める前から、**最大値と最小値が必ず存在する**ことだけは確定します。

実際には

$$
\min f=0,
\qquad
\max f=\frac14
$$

ですが、Weierstrassの役割は値を計算することではなく「探索しても最適点が消えない」と保証することです。

---

`,
  'C2 Weierstrass concrete example'
);

insertAfter(
  paths.c2,
  '## 2. 有限直積もコンパクト',
  String.raw`

### 2.1 なぜ直積がここで必要なのか

二つの集合 $A,B$ の距離を最小化するとき、変数は一つではなく $(a,b)\in A\times B$ です。したがって「$A$ と $B$ がそれぞれコンパクト」だけでなく、**探索空間 $A\times B$ もコンパクト**であることが必要になります。

この一節は次の「集合間距離の最小値が達成される」ための準備です。`,
  'C2 product motivation'
);

insertBefore(
  paths.c2,
  '> **定理（互いに素なコンパクト集合間の正距離）**',
  String.raw`### 3.1 反例：閉集合どうしでも距離0になれる

コンパクト性を「閉集合」だけに弱めると結論は壊れます。$\mathbb R^2$ で

$$
A=\{(x,0):x\ge1\},
$$

$$
B=\{(x,1/x):x\ge1\}
$$

とします。どちらも閉集合で互いに素ですが、同じ $x$ を使えば二点間の距離は $1/x$ なので

$$
d(A,B)=0.
$$

それでも交点はありません。二つの点が **無限遠へ一緒に逃げながら距離だけ0へ近づく** からです。

コンパクト性はこの逃げ方を禁止するので、互いに素なら最小距離が実際に達成され、その値は正になります。

`,
  'C2 disjoint closed counterexample'
);

insertBefore(
  paths.c2,
  '<!-- proof-start -->\n### 証明\n\n近似最小列',
  String.raw`### 4.1 証明の見取り図

$C$ 自体は非有界かもしれないので、そのままHeine--Borelは使えません。そこで

```text
inf に近づく点だけ取る
  ↓
その尾部は有限半径の球に入る
  ↓
C ∩ 閉球 は閉かつ有界
  ↓
Heine--Borel でコンパクト
  ↓
収束部分列 → 閉性で C に残る
  ↓
距離の連続性で inf を達成
```

と、**必要な部分だけ有界化してからコンパクト性を使う**のがポイントです。

`,
  'C2 nearest-point roadmap'
);

insertBefore(
  paths.c2,
  '$$\n\\boxed{\n\\text{有界化}',
  String.raw`### 4.2 意味と注意

この結果は「最近点が**少なくとも一つ存在する**」という存在定理です。一般の閉集合では最近点が一意とは限りません。

一意性まで欲しいときは、後続で出てくる凸性やHilbert空間の射影定理のような追加構造を使います。最適化では

> **存在はコンパクト性・閉性、唯一性は凸性・狭義凸性**

という役割分担が頻出します。

`,
  'C2 nearest-point meaning'
);

// ---------------------------------------------------------------------------
// D1: show norm equivalence geometrically before the compact-sphere proof.
// ---------------------------------------------------------------------------
insertBefore(
  paths.d1,
  '---\n\n## 1. ノルムとBanach空間',
  String.raw`## 0. まず $\mathbb R^2$ で「ノルムが違う」と「収束が違う」を分ける

### 0.1 具体例：同じベクトルの大きさは違って見える

$$
x=(3,4)
$$

に対して

$$
\|x\|_1=7,
\qquad
\|x\|_2=5,
\qquad
\|x\|_\infty=4.
$$

数値は一致しません。ノルムは「同じ大きさの測り方」ではなく、**別々の物差し**です。

しかし有限次元では、これらの物差しは定数倍の範囲で互いを挟めます。例えば $\mathbb R^p$ では

$$
\|x\|_\infty
\le
\|x\|_2
\le
\sqrt p\,\|x\|_\infty,
$$

$$
\|x\|_2
\le
\|x\|_1
\le
\sqrt p\,\|x\|_2.
$$

したがって一方が0へ行けば、他方も必ず0へ行きます。

例えば

$$
x_n=
\left(\frac1n,\frac{(-1)^n}{n}\right)
$$

は、$1$-ノルムでも $2$-ノルムでも $\infty$-ノルムでも0へ収束します。

### 0.2 直感：単位球の形は違っても、有限次元では潰れすぎない

$\mathbb R^2$ では、$1$-ノルムの単位球はひし形、$2$-ノルムは円、$\infty$-ノルムは正方形です。形は違いますが、どれか一つが他を無限に細長く突き抜けることはありません。

「ある定数倍で内外から挟める」というノルム同値は、この幾何学的な事実を一般の有限次元ベクトル空間へ拡張したものです。

> **注意**：同値とは値が等しいことではありません。また比較定数はノルムや次元に依存します。

`,
  'D1 finite-dimensional norm intuition'
);

insertBefore(
  paths.d1,
  '<!-- proof-start -->\n### 証明\n\n$\\dim V=p$',
  String.raw`### 3.1 証明の見取り図：有限次元性はどこで使うのか

任意の基底 $e_1,\ldots,e_p$ を選ぶと、$V$ の元を座標 $\xi\in\mathbb R^p$ で表せます。

証明は二つの評価を作るだけです。

1. **上側評価**：三角不等式から、$\|x\|$ は座標Euclidノルムの定数倍以下になる。ここは容易。
2. **下側評価**：Euclid単位球面上で $N(\xi)=\|\sum\xi_je_j\|$ を考える。$N$ は連続かつ正で、単位球面がコンパクトだから正の最小値 $m>0$ を取る。

したがって

$$
m\|\xi\|_2
\le
\left\|\sum_j\xi_je_j\right\|
\le
M\|\xi\|_2.
$$

**有限次元性が本質的に使われるのは、単位球面がコンパクトになる箇所**です。完全証明を閉じても、この一文を先に持っておけば後続の無限次元との違いを追えます。

`,
  'D1 norm-equivalence proof roadmap'
);

replaceSection(
  paths.d1,
  '## 4. なぜこの証明に「有限次元」が効いているのか',
  '## 5. 有限次元ノルム空間は完備',
  String.raw`## 4. 証明を閉じたまま何を持ち帰るか

有限次元で重要なのは、ノルムの具体的な式ではなく

$$
\boxed{
\text{どのノルムを選んでも}
\quad
\text{収束・Cauchy性・完備性が変わらない}
}
$$

ということです。

証明で有限次元性が使われた場所は、Euclid単位球面

$$
S^{p-1}
=
\{\xi:\|\xi\|_2=1\}
$$

のコンパクト性でした。連続な正値関数がそこで正の最小値を取るため、ノルムがある方向だけ極端に小さくなることを防げます。

無限次元では単位球面が一般にコンパクトではありません。したがって同じ「正の最小値を取る」議論が壊れ、ノルム同値も自動ではなくなります。

この有限次元／無限次元の断絶が、本章後半から関数解析へ進む入口です。`,
  'D1 post-proof takeaway section'
);

insertAfter(
  paths.d1,
  '## 5. 有限次元ノルム空間は完備',
  String.raw`

### 5.1 証明の見取り図

ノルム同値が分かれば、完備性は座標へ移して考えられます。

```text
V の Cauchy列
  ↓ 下側のノルム比較
R^p の座標 Cauchy列
  ↓ R^p の完備性
座標が ξ へ収束
  ↓ 上側のノルム比較
V の元 x へ収束
```

つまり有限次元では「極限が空間の外へ逃げない」ことまで座標空間 $\mathbb R^p$ から引き戻せます。`,
  'D1 completeness roadmap'
);

// ---------------------------------------------------------------------------
// D2D: make Young -> Hölder -> Minkowski a chain of jobs, not a parade.
// ---------------------------------------------------------------------------
insertBefore(
  paths.d2d,
  '---\n\n## 1. なぜ関数をa.e.で同一視するのか',
  String.raw`## 0. まず有限個の値で見る：$L^p$ はベクトルのノルムの連続版

### 0.1 具体例：二点空間なら普通の $\ell^p$ と同じ

$\Omega=\{1,2\}$ に数え上げ測度を入れ、

$$
f(1)=3,
\qquad
f(2)=4
$$

とします。このとき

$$
\|f\|_1=|3|+|4|=7,
$$

$$
\|f\|_2=\sqrt{3^2+4^2}=5,
$$

$$
\|f\|_\infty=4.
$$

つまり $L^p$ は、有限次元ベクトル

$$
(3,4)
$$

の $\ell^p$ ノルムで「成分の和」をしていたところを、一般の測度空間で「積分」に置き換えたものです。

### 0.2 意味：$p$ によって何を重く見るか

| ノルム | ざっくりした見方 | 統計・解析での典型 |
|---|---|---|
| $L^1$ | 絶対量をそのまま足す | 絶対誤差、可積分性 |
| $L^2$ | 大きい誤差を二乗で強く罰する | 分散、最小二乗、Hilbert空間 |
| $L^\infty$ | 最悪点だけを見る | 一様誤差、本質的上限 |

この章でHölderやMinkowskiを証明する理由は、不等式を増やすためではありません。

- **Hölder**：積 $fg$ を積分してよいことを保証する。
- **Minkowski**：$\|f+g\|_p\le\|f\|_p+\|g\|_p$ を保証し、$L^p$ を本当にノルム空間にする。

という役割があります。

`,
  'D2D discrete Lp introduction'
);

insertAfter(
  paths.d2d,
  '## 3. Youngの不等式',
  String.raw`

### 3.1 なぜYoungの不等式を先に置くのか

Hölderでは積 $|fg|$ を扱いたいのですが、$f$ と $g$ は別々の $L^p,L^q$ 情報しか持っていません。そこでYoungの不等式を使い、**積を $p$ 乗と $q$ 乗の和へ分解**します。

```text
積 ab
  ↓ Young
p乗の項 + q乗の項
  ↓ 積分
L^p ノルム + L^q ノルム
```

Youngは、Hölderを作るための「積を分離する部品」と読めば位置付けが明確です。

### 3.2 具体例：$p=q=2$ なら平方完成の不等式

$p=q=2$ では

$$
ab\le\frac{a^2}{2}+\frac{b^2}{2}
$$

です。これは

$$
0\le(a-b)^2
$$

を展開したものと同値です。一般のYoungは、この二乗の場合を共役指数 $p,q$ へ広げた形だと考えられます。`,
  'D2D Young motivation and example'
);

insertBefore(
  paths.d2d,
  '<!-- proof-start -->\n### 証明\n\n$\\|f\\|_p=0$',
  String.raw`### 4.1 証明の見取り図

Hölderの証明は正規化が核心です。

1. $F=|f|/\|f\|_p$、$G=|g|/\|g\|_q$ として、それぞれの $p$ 乗・$q$ 乗積分を1にする。
2. 各点でYoungを使い、$FG\le F^p/p+G^q/q$ とする。
3. 積分すると右辺は $1/p+1/q=1$。
4. 最後にノルムを掛け戻す。

つまり **正規化 → 点wise不等式 → 積分 → 元へ戻す** という一つの型です。

`,
  'D2D Holder roadmap'
);

insertBefore(
  paths.d2d,
  '### 系（Cauchy--Schwarz）',
  String.raw`### 4.2 具体例：$[0,1]$ 上で本当に積が抑えられる

$[0,1]$ 上で $p=q=2$、$f(x)=1$、$g(x)=x$ とすると

$$
\int_0^1|f(x)g(x)|\,dx
=\frac12.
$$

一方

$$
\|f\|_2=1,
\qquad
\|g\|_2=\frac1{\sqrt3},
$$

なのでHölder（この場合はCauchy--Schwarz）は

$$
\frac12
\le
\frac1{\sqrt3}
$$

を与えます。

重要なのは数値評価そのものより、$f\in L^2$ と $g\in L^2$ から **積 $fg$ が $L^1$ に入る**ことまで保証される点です。

`,
  'D2D Holder concrete example'
);

insertBefore(
  paths.d2d,
  '<!-- proof-start -->\n### 証明\n\n$p=1$ では',
  String.raw`### 5.1 証明の見取り図

Minkowskiは「$L^p$ ノルムの三角不等式」そのものです。$p>1$ では

$$
|f+g|^p
=
|f+g|\,|f+g|^{p-1}
$$

を

$$
|f|\,|f+g|^{p-1}
+
|g|\,|f+g|^{p-1}
$$

で抑え、二つの積へHölderを使います。共役指数 $q=p/(p-1)$ を選ぶと

$$
(p-1)q=p
$$

となるため、残った項がちょうど $\|f+g\|_p^{p-1}$ に戻ります。

> **Hölderを一度使って、三角不等式を作る。**

これが証明の一行要約です。

`,
  'D2D Minkowski roadmap'
);

insertBefore(
  paths.d2d,
  '## 6. $L^p$はノルム空間になる',
  String.raw`### 5.2 意味：なぜ $p\ge1$ なのか

Minkowskiが成り立つから、$\|\cdot\|_p$ は三角不等式を満たします。$0<p<1$ では一般に三角不等式が壊れるため、同じ式は通常の意味のノルムにはなりません。

したがって $1\le p$ という範囲は単なる慣習ではなく、**関数の大きさを距離・幾何として扱うための境界**です。

### 5.3 三つの不等式の役割を一枚で整理する

| 結果 | 何をする道具か | 次に何を作るか |
|---|---|---|
| Young | 点wiseの積を二つの冪へ分ける | Hölder |
| Hölder | $L^p$ と $L^q$ の積を $L^1$ で制御する | 内積・積分の正当化 |
| Minkowski | 和の $L^p$ 大きさを制御する | $L^p$ の三角不等式 |

この依存関係を見失わなければ、証明を折りたたんでも章全体の論理線は追えます。

---

`,
  'D2D inequality roles summary'
);

// ---------------------------------------------------------------------------
// F: move a complete 2D running example to the front and fold rank-nullity proof.
// ---------------------------------------------------------------------------
insertBefore(
  paths.f,
  '---\n\n## 1. 線形写像',
  String.raw`## 0. 具体例を先に見る：同じ写像が対角行列になるまで

抽象記号へ入る前に、この講義全体で何をするのかを $\mathbb R^2$ の一例で見ます。

$$
T(x,y)=(2x+y,x+2y)
$$

とします。標準基底

$$
e_1=(1,0)^T,
\qquad
e_2=(0,1)^T
$$

では

$$
T(e_1)=(2,1)^T,
\qquad
T(e_2)=(1,2)^T
$$

なので、表現行列は

$$
A=
\begin{pmatrix}
2&1\\
1&2
\end{pmatrix}.
$$

ところが

$$
v_1=(1,1)^T,
\qquad
v_2=(1,-1)^T
$$

を使うと

$$
T(v_1)=3v_1,
\qquad
T(v_2)=v_2.
$$

したがって新しい基底

$$
\mathcal B'=(v_1,v_2)
$$

では同じ写像が

$$
D=
\begin{pmatrix}
3&0\\
0&1
\end{pmatrix}
$$

と対角行列で表されます。

新基底のベクトルを旧基底の座標で列に並べると

$$
P=
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}.
$$

このとき

$$
AP=PD,
$$

したがって

$$
D=P^{-1}AP.
$$

ここで起きたことを言葉にすると、

```text
抽象的な線形写像 T
  ↓ 基底を選ぶ
行列 A が現れる
  ↓ 固有ベクトルを基底に選び直す
同じ T の行列が D へ変わる
  ↓
D は対角なので作用が「方向ごとの倍率」に分解される
```

です。

### 0.1 直感：何が本体で、何が座標表示か

| 本体 | 基底を選ぶと見えるもの |
|---|---|
| 線形写像 $T$ | 表現行列 $[T]$ |
| ベクトル $x$ | 座標ベクトル $[x]$ |
| 同じ写像を別基底で見る | 相似変換 $P^{-1}AP$ |
| 固有方向 | 固有ベクトルの座標 |
| 固有ベクトル基底が存在する | 対角化可能 |

この章の一般式は、すべてこの一例を任意のベクトル空間・任意の基底へ拡張したものです。まずこの図を持ち、必要になったところで一般式へ戻ってください。

`,
  'F running example at front'
);

replaceSection(
  paths.f,
  '## 3. rank-nullity theorem',
  '## 4. 表現行列：行列は基底を選んだ後に現れる',
  String.raw`## 3. rank-nullity theorem

有限次元の線形写像では、「入力の自由度」がどこへ行ったかを次の式で数えられます。

> **定理（rank-nullity theorem）**  
> 有限次元ベクトル空間 $V$ と線形写像 $T:V\to W$ に対して
> $$
> \boxed{
> \dim V
> =
> \dim\ker T
> +
> \dim\operatorname{Im}T
> }
> $$
> が成り立つ。

### 3.1 意味：潰れた方向 + 生き残った方向 = 入力の次元

- $\dim\ker T$ は、$T$ によって0へ潰れる独立な方向の本数。
- $\dim\operatorname{Im}T$ は、出力側へ実際に届く独立な方向の本数。

したがって定理は

> **入力の自由度 = 消えた自由度 + 出力として残った自由度**

と読めます。

### 3.2 具体例：射影では1方向が潰れる

$$
T:\mathbb R^2\to\mathbb R^2,
\qquad
T(x,y)=(x,0)
$$

なら

$$
\ker T=\operatorname{span}((0,1)^T),
\qquad
\operatorname{Im}T=\operatorname{span}((1,0)^T).
$$

したがって

$$
2=1+1
$$

です。行列のrankを単なる掃き出し計算として覚えるより、何本の方向が残ったかを数えていると理解できます。

### 3.3 証明の見取り図

$\ker T$ の基底を取り、それを $V$ 全体の基底へ延長します。追加した基底ベクトルの像が、ちょうど $\operatorname{Im}T$ の基底になることを示せば次元を数えられます。

<!-- proof-start -->
### 証明

$V$ を有限次元とし

$$
\dim V=n
$$

とします。

$\ker T$ の基底を

$$
u_1,\dots,u_r
$$

と取ります。

F0-00Eの基底延長定理により、これを $V$ の基底

$$
u_1,\dots,u_r,v_1,\dots,v_{n-r}
$$

へ延長できます。

任意の $x\in V$ は

$$
x
=
\sum_{i=1}^r a_i u_i
+
\sum_{j=1}^{n-r} b_j v_j
$$

と書けるので

$$
T(x)
=
\sum_{j=1}^{n-r}b_jT(v_j).
$$

したがって

$$
\operatorname{Im}T
=
\operatorname{span}(T(v_1),\dots,T(v_{n-r})).
$$

さらに $T(v_1),\dots,T(v_{n-r})$ は一次独立です。

もし

$$
\sum_j c_jT(v_j)=0
$$

なら

$$
T\left(\sum_jc_jv_j\right)=0,
$$

つまり

$$
\sum_jc_jv_j\in\ker T.
$$

しかし $u_i,v_j$ を合わせたものは基底なので、$v_j$ の非自明な線形結合が $\ker T$ に入ることはありません。したがって全ての $c_j=0$ です。

よって

$$
\dim\operatorname{Im}T=n-r.
$$

したがって

$$
\dim V
=
\dim\ker T
+
\dim\operatorname{Im}T.
$$

$\square$
<!-- proof-end -->`,
  'F rank-nullity theorem rewrite'
);

insertAfter(
  paths.f,
  '> **入力基底と出力基底を選んだときの座標表示**\n\nです。',
  String.raw`

### 4.1 最初の具体例へ戻る

$T(x,y)=(2x+y,x+2y)$ では、標準基底を選んだため

$$
[T]_{​\mathcal E\leftarrow\mathcal E}
=
\begin{pmatrix}2&1\\1&2\end{pmatrix}
$$

となりました。もし基底を変えれば数値の並びは変わりますが、抽象的な写像 $T$ 自体は変わりません。

この「本体と座標表示を分ける」視点が、基底変換と相似の混乱を防ぎます。`,
  'F return to running example after representation matrix'
);

insertAfter(
  paths.f,
  '$$\n[x]_{\\mathcal B\'}\n=P^{-1}[x]_{\\mathcal B}\n$$\n\nです。',
  String.raw`

### 7.1 具体例：固有ベクトル基底への座標変換

最初の例では

$$
P=
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
$$

の列が新基底 $v_1=(1,1)^T,v_2=(1,-1)^T$ でした。

旧座標 $[x]_{\mathcal E}$ と新座標 $[x]_{\mathcal B'}$ の関係は

$$
[x]_{\mathcal E}=P[x]_{\mathcal B'}.
$$

つまり $P$ は「新しい座標値を、標準基底で見たベクトルへ組み立てる行列」です。向きを暗記するより、**列に何を並べたか**から判断できます。`,
  'F basis change running example'
);

insertBefore(
  paths.f,
  '<!-- proof-start -->\n### 証明\n\n$k$ に関する帰納法',
  String.raw`### 10.1 証明の見取り図

異なる固有値 $\lambda_i$ の固有ベクトルを一次結合して0になったと仮定します。最後の固有値 $\lambda_k$ を消すために

$$
T-\lambda_kI
$$

を作用させると、$v_k$ の項だけが消え、残りは係数 $\lambda_i-\lambda_k\ne0$ を伴います。これを帰納法で繰り返すと全係数が0になります。

「固有値が違う」ことを、$T-\lambda I$ で一方向ずつ分離する証明です。

`,
  'F eigenvector independence roadmap'
);

replaceOnce(
  paths.f,
  '## 15. 表現行列の具体例',
  '## 15. もう一つの具体例：多項式の微分写像',
  'F rename late concrete example'
);

insertAfter(
  paths.f,
  'ここで重要なのは、$D$ は関数を関数へ送る抽象的な写像であり、この行列は **基底 $1,x,x^2$ を選んだ後の座標表示** だということです。',
  String.raw`

### 15.1 意味：行列は $\mathbb R^n$ の写像だけのものではない

微分という「関数から関数への操作」も、有限次元部分空間と基底を選べば行列として表せます。

したがって表現行列の考え方は、数ベクトルの計算テクニックではなく、**抽象的な線形作用を有限個の座標へ翻訳する仕組み**です。`,
  'F meaning after polynomial example'
);

console.log('Narrative revisions completed.');
