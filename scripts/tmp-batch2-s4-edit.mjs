import fs from 'node:fs';

const target = 'textbook/volumes/03_inference/I4_02_欠測_不完全データ_期待値最大化法/index.md';
let text = fs.readFileSync(target, 'utf8');

function replaceOnce(oldText, newText, label) {
  const count = text.split(oldText).length - 1;
  if (count !== 1) throw new Error(`${label}: expected exactly one target, found ${count}`);
  text = text.replace(oldText, newText);
}

replaceOnce(
`## 本章の範囲の見取り図

期待値最大化法そのものと、その単調性をKLダイバージェンスで厳密に証明することは分けて扱います。`,
`## 学習の順序

まず欠測・打ち切り・切断で観測情報がどう違うかを区別し、次に観測データ尤度と期待値最大化法を扱います。尤度単調性をKLダイバージェンスで厳密に証明する議論は、その後の発展として分けます。`,
'I4-02 learning-order heading');

text = text.replaceAll('通常ルート', '基本');

replaceOnce(
`### 1.1 欠測

ある人が調査対象には入っているが、年収欄だけ空白であるとします。このとき「その人が標本にいる」ことは分かっていますが、変数の値がありません。これが **欠測**です。`,
`### 1.1 欠測

<a id="def-i4-02-missing"></a>

<!-- formal-statement-start -->
> **定義（欠測・欠損）**  
> 観測単位そのものは標本に含まれているが、本来観測したい変数の値の一部が得られていない状態を **欠測**（欠損）という。
<!-- formal-statement-end -->

ある人が調査対象には入っているが、年収欄だけ空白であるとします。このとき「その人が標本にいる」ことは分かっていますが、年収の値がありません。`,
'I4-02 missing definition');

replaceOnce(
`### 1.2 右打ち切り

寿命試験を100時間で終了し、その時点でまだ故障していない装置があったとします。真の寿命 $T$ は分かりませんが

$$
\\boxed{T>100}
$$

という情報は得られています。値が完全に失われたわけではありません。これが **右打ち切り**です。`,
`### 1.2 右打ち切り

<a id="def-i4-02-censoring"></a>

<!-- formal-statement-start -->
> **定義（打ち切り・右打ち切り）**  
> 観測単位は標本に含まれ、真の値そのものは分からないが、ある境界より大きい・小さいなどの部分情報が得られている観測を **打ち切り**という。特に $T>c$ だけが分かる場合を右打ち切りという。
<!-- formal-statement-end -->

寿命試験を100時間で終了し、その時点でまだ故障していない装置があったとします。真の寿命 $T$ は分かりませんが

$$
\\boxed{T>100}
$$

という情報は得られています。値が完全に失われたわけではありません。`,
'I4-02 censoring definition');

replaceOnce(
`### 1.3 切断

「寿命が5時間を超えた装置だけを登録する」仕組みなら、$T\\le5$ の装置はデータベースに存在すらしません。観測された寿命の密度は元の密度 $f(t)$ ではなく

$$
\\boxed{
f(t\\mid T>5)
=\\frac{f(t)}{P(T>5)},
\\qquad t>5
}
$$

です。これが **切断**です。`,
`### 1.3 切断

<a id="def-i4-02-truncation"></a>

<!-- formal-statement-start -->
> **定義（トランケーション・切断）**  
> ある選択条件を満たした観測単位だけが標本に入り、条件を満たさない単位はデータに現れない観測機構を **トランケーション**（切断）という。観測分布は選択条件で条件付けた分布になる。
<!-- formal-statement-end -->

「寿命が5時間を超えた装置だけを登録する」仕組みなら、$T\\le5$ の装置はデータベースに存在すらしません。観測された寿命の密度は元の密度 $f(t)$ ではなく

$$
\\boxed{
f(t\\mid T>5)
=\\frac{f(t)}{P(T>5)},
\\qquad t>5
}
$$

です。`,
'I4-02 truncation definition');

replaceOnce(
`### 1.4 3者の違い

| 状況 | 観測単位の存在 | 値について得られる情報 |
|---|---|---|
| 欠測 | 分かる | 値がない |
| 打ち切り | 分かる | 境界より大きい・小さい等が分かる |
| 切断 | 条件を満たさない単位は標本に入らない | 選択条件を満たす値だけ観測される |

この区別は用語の違いではなく、**尤度への寄与が違う**という意味で重要です。`,
`### 1.4 3者の違い

<!-- definition-example-start: def-i4-02-missing, def-i4-02-censoring, def-i4-02-truncation -->
**定義の確認**

| 状況 | 観測単位の存在 | 値について得られる情報 |
|---|---|---|
| 欠測 | 分かる | 値がない |
| 打ち切り | 分かる | 境界より大きい・小さい等が分かる |
| 切断 | 条件を満たさない単位は標本に入らない | 選択条件を満たす値だけ観測される |

この区別は用語の違いではなく、**尤度への寄与が違う**という意味で重要です。
<!-- definition-example-end -->`,
'I4-02 three-way definition check');

if (text.includes('通常ルート') || text.includes('本章の範囲の見取り図')) {
  throw new Error('reader-facing editorial route wording remains');
}

fs.writeFileSync(target, text, 'utf8');
