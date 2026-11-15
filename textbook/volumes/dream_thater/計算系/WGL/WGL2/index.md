# WGL2 GPUは頂点とピクセルをどう区別する？

WGL1では「すべての画素を同じ橙色で塗る」三角形を描きました。しかし、3つの頂点に別々の色を持たせ、三角形内部をなめらかな色にするには、**各頂点で異なるデータ**と**描画全体で共通のデータ**を区別する必要があります。さらに頂点は3個しかないのに、内部の何千個ものフラグメントの色は誰が決めるのでしょうか。

本講では、**頂点ごとに変化する入力・描画全体で共通の変数・頂点から画素候補へ渡すデータとその補間**を順番に定義して使います。数式で画素の色を予測した後、WGL1と同じ隔離された3タブWebGL2ラボでJavaScript・2種類のGLSLを編集し、GPUの画素値と比較します。

本章は [WGL1のシェーダ段階と描画呼出し](../WGL1/index.md#def-wgl1-shader-stages)、[全画面viewportの座標対応](../WGL1/index.md#prop-wgl1-viewport-map)、[三角形の符号付き面積判定](../WGL1/index.md#prop-wgl1-edge-test) を使います。線形代数の一般定理は暗黙の前提としません。

## 1. 頂点ごとの入力と描画全体の共通値

頂点 $A,B,C$ の位置はWGL1と同じく

$$
A=(-0.8,-0.8),\quad B=(0.8,-0.8),\quad C=(0,0.8)
$$

とし、色を順に赤 $c_A=(1,0,0)$、緑 $c_B=(0,1,0)$、青 $c_C=(0,0,1)$ とします。色の各成分は $0$ 以上 $1$ 以下の実数です。

JavaScriptは、頂点ごとに「位置2個、色3個」の5個の数を並べます。[WGL1のシェーダ段階](../WGL1/index.md#def-wgl1-shader-stages)で扱った、描画される頂点の番号 $k=0,1,2$ に応じて、頂点シェーダは対応する5個の数を受け取ります。一方、`layout(location=0)` と `layout(location=1)` の番号は**頂点番号ではなく、位置・色という属性の種類を区別する場所番号**です。同じ頂点 $k$ について、場所0から位置2成分、場所1から色3成分を読みます。全頂点で同じ倍率 $(g_R,g_G,g_B)$ を使って色を調整したい場合は、頂点ごとに同じ値を何度も格納する必要はありません。この使い分けを定義します。

<a id="def-wgl2-attribute"></a>

<!-- formal-statement-start -->
> **定義（頂点属性）**  
> WebGL2の一つの描画呼出しで、頂点番号に従って読み出され、頂点シェーダへ入力される値を**頂点属性（attribute）**という。GLSL ES 3.00の頂点シェーダでは `in` で宣言し、JavaScript側の頂点属性配列設定から供給する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-wgl2-attribute -->
**定義の確認**。 属性の場所番号0を位置 `a_position`（2成分）、場所番号1を色 `a_color`（3成分）に割り当てます。すると頂点番号 $k=0$（頂点 $A$）ではそれぞれ $(-0.8,-0.8)$ と $(1,0,0)$、$k=1$（頂点 $B$）では $(0.8,-0.8)$ と $(0,1,0)$ が入力されます。**同じ属性の場所番号でも頂点番号が変われば値が変わる**ことを、2頂点で確認できます。
<!-- definition-example-end -->

<a id="def-wgl2-uniform"></a>

<!-- formal-statement-start -->
> **定義（uniform）**  
> WebGL2のリンク済みプログラムに設定し、一つの描画呼出しの間に同じ値として参照されるシェーダ変数を**uniform**という。GLSLでは `uniform` で宣言し、JavaScriptでは対応する `uniform*` APIで値を設定する。頂点ごとの属性とは異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-wgl2-uniform -->
**定義の確認**。 フラグメントシェーダの `uniform vec3 u_gain;` に対して、リンク済みプログラムを `useProgram` した後、`getUniformLocation(program, "u_gain")` で変数の位置情報 `gain` を取得します。`uniform3f(gain,1.0,0.5,0.25)` を一度実行すれば、三角形の**どの内部フラグメントでも**同じ倍率 $(1,0.5,0.25)$ を参照します。ここでの `gain` はuniformの位置情報であり、頂点属性の `layout(location=0)` のような場所番号とは別物です。頂点 $A$ と $B$ に別々の倍率を設定する操作ではありません。
<!-- definition-example-end -->

uniform の初期値はゼロです。したがって本講の `u_gain` を設定し忘れると全色が黒になります。「変数を宣言しただけで $(1,1,1)$ が入る」とは考えないでください。

### 実データのバイト配置

本講の `colors.js` では、各頂点を

```text
[x, y, red, green, blue]
```

の順で保存します。各要素は32 bitの `float`、つまり4 byteです。1頂点の**stride（次の頂点までの間隔）**は $5\times4=20$ byte、色の開始位置の**offset（先頭からの位置）**は $2\times4=8$ byteです。

```js
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 20, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 20, 8);
```

ここで `0` と `1` は頂点シェーダの `layout(location=0)`、`layout(location=1)` に対応します。 `gl.enableVertexAttribArray(0)` と `(1)` も必要です。位置と色を同じバッファに並べても、読み方を別々に設定できます。初期値では $3\times5=15$ 個、合計60 byteをGPUへ転送します。

## 2. 頂点3個から内部の色が生まれる

頂点シェーダは各頂点で実行されます。しかし、三角形の内部のどこに点があるかは、頂点シェーダの時点ではまだ決まっていません。そこで頂点シェーダの出力を、ラスタ化処理が内部へ**補間**してから、フラグメントシェーダの入力にします。

<a id="def-wgl2-varying"></a>

<!-- formal-statement-start -->
> **定義（頂点・フラグメント間の varying）**  
> 頂点シェーダの `out` 変数と、同じ名前・互換な型で対応するフラグメントシェーダの `in` 変数を、両段階を結ぶ**varying**とする。本講では浮動小数点の `vec3` を用い、標準の滑らかな補間（`smooth`）で内部フラグメントに値を渡す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-wgl2-varying -->
**定義の確認**。 頂点側が `out vec3 v_color;` に $(1,0,0)$、$(0,1,0)$、$(0,0,1)$ をそれぞれ代入し、フラグメント側が `in vec3 v_color;` と受ければ、内部では3成分すべてが補間されます。一方、片方を `vec2` に変えると型が一致しなくなり、プログラムの**リンク**に失敗します。これは頂点属性のバッファ設定の誤りとは異なる失敗です。
<!-- definition-example-end -->

この章でいうフラグメントは描画バッファの画素そのものとは限りません。ラスタ化で生成され、深度検査等を経て画素に寄与する候補です。WGL2では重なり・深度検査・ブレンドを使わず、不透明な三角形を1枚だけ描きます。

### なぜ3頂点の重みで表せるか

内部の位置 $P$ を「3頂点それぞれからどれだけ寄与したか」という重みで表したいと考えます。[WGL1の符号付き面積](../WGL1/index.md#prop-wgl1-edge-test)で使った関数

$$
E(U,V,P)=(V_x-U_x)(P_y-U_y)-(V_y-U_y)(P_x-U_x)
$$

を用います。三角形の符号付き二倍面積は

$$
D=E(A,B,C)=1.6\cdot1.6=2.56>0
$$

です。

<a id="def-wgl2-barycentric"></a>

<!-- formal-statement-start -->
> **定義（三角形の重心座標）**  
> 平面の非一直線の3点 $A,B,C$ と点 $P$ に対して、$D=E(A,B,C)\ne0$ とする。次の3数を $P$ の三角形 $ABC$ に関する**重心座標**という。

$$
\lambda_A=\frac{E(B,C,P)}{D},\qquad
\lambda_B=\frac{E(C,A,P)}{D},\qquad
\lambda_C=\frac{E(A,B,P)}{D}.
$$

> これらは和が $1$ となり、$P$ を3頂点の重み付き和で表す。
<!-- formal-statement-end -->

この定義は単なる計算のコツではありません。分母 $D$ が非零なので、$P-A=s(B-A)+t(C-A)$ を成分に分けた2本の一次方程式は、消去法で $D$ を分母として $s,t$ を一意に決定できます。右辺を展開すると

$$
P=(1-s-t)A+sB+tC
$$

です。$E$ に代入すると $E(A,B,P)=tD$、$E(C,A,P)=sD$、$E(B,C,P)=(1-s-t)D$ となるので、定義した3数が実際にその係数であることが分かります。これは[WGL1の内外判定](../WGL1/index.md#prop-wgl1-edge-test)の証明で使った関係そのものです。

<!-- definition-example-start: def-wgl2-barycentric -->
**定義の確認**。 $P=(0,0)$ に対して

$$
E(A,B,P)=1.28,\quad E(B,C,P)=0.64,\quad E(C,A,P)=0.64
$$

なので

$$
(\lambda_A,\lambda_B,\lambda_C)
=\left(\frac14,\frac14,\frac12\right).
$$

3数は非負で総和が1、実際に

$$
\frac14A+\frac14B+\frac12C=(0,0)
$$

となります。面積から得た係数が位置を再現することまで確認できました。
<!-- definition-example-end -->

**NDCの重心座標と画面上の重みの対応。** ここまでの $A,B,C,P$ は[透視除算](../WGL1/index.md#def-wgl1-perspective-division)後のNDC上の点です。次の命題では画面上の重みを使うため、[全画面viewportの座標対応](../WGL1/index.md#prop-wgl1-viewport-map)によって値が変わらないことを確かめます。$W,H>0$ の全画面viewportでは、横座標は $x_v=\frac W2(x_n+1)$、縦座標は $y_v=\frac H2(y_n+1)$ です。$P=\lambda_AA+\lambda_BB+\lambda_CC$ と $\lambda_A+\lambda_B+\lambda_C=1$ を横成分へ代入すれば

$$
\frac W2(x_P+1)
=\lambda_A\frac W2(x_A+1)
+\lambda_B\frac W2(x_B+1)
+\lambda_C\frac W2(x_C+1)
$$

となり、縦成分も $W,x$ を $H,y$ に置き換えて同じ式が成り立ちます。したがってNDCの点をviewportに写しても、**3頂点に掛かる重みは同じ**です。$W,H>0$ なので座標対応は各軸で一対一であり、非退化な三角形の重心座標の一意性も失われません。ここには行列計算や後続章の投影理論は必要ありません。

<a id="prop-wgl2-barycentric-color"></a>

<!-- formal-statement-start -->
> **命題（clip座標の第4成分が等しい三角形の色補間）**  
> 頂点シェーダが3頂点から同じ正のclip座標の第4成分 $w_c$ を出力し、透視除算後のNDC上で非退化な三角形 $ABC$ ができるとする。補間指定は `smooth`、各頂点のvarying値は $c_A,c_B,c_C\in\mathbb R^3$ とする。フラグメント中心に対応する三角形内部のNDC上の点 $P$ の重心座標を $\lambda_A,\lambda_B,\lambda_C$ とすると（直前に示したように画面上でも同じ重みである）、フラグメント側へ渡される色は

$$
c(P)=\lambda_Ac_A+\lambda_Bc_B+\lambda_Cc_C
$$

> である。とくに頂点色を赤・緑・青として

$$
c_A=(1,0,0),\qquad c_B=(0,1,0),\qquad c_C=(0,0,1)
$$

> と設定した場合は、各色成分は順に $(\lambda_A,\lambda_B,\lambda_C)$ となる。クリップ、ラスタ化、フラグメント破棄・深度検査の結果により、すべての画面点が実際に描画されるとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

GPUの補間規則はWebGL2の描画仕様が定めるものであり、ここでハードウェアの実装を数学から証明するわけではありません。規則の式へ「3頂点の $w_c$ が等しい」を代入すると、透視補正の分母・分子に共通因子が現れて消えることを確認します。

<!-- proof-start -->
### 証明

重心座標の和は $\lambda_A+\lambda_B+\lambda_C=1$ です。GLSLの `smooth` varying に対する透視補正補間の値は、頂点ごとのclip座標の第4成分を $w_A,w_B,w_C$ とすると、フラグメントが生成される内部位置について

$$
c(P)=
\frac{\lambda_Ac_A/w_A+\lambda_Bc_B/w_B+\lambda_Cc_C/w_C}
{\lambda_A/w_A+\lambda_B/w_B+\lambda_C/w_C}
$$

で与えられます（この一般の場合はWGL6でさらに扱います）。仮定 $w_A=w_B=w_C=w_c>0$ を分子・分母へ代入すると

$$
c(P)=
\frac{(\lambda_Ac_A+\lambda_Bc_B+\lambda_Cc_C)/w_c}
{(\lambda_A+\lambda_B+\lambda_C)/w_c}.
$$

分母は $1/w_c$ なので約分し、命題の式を得ます。頂点色が標準基底の3色なら各成分はそれぞれ該当する $\lambda$ です。$\square$
<!-- proof-end -->

この証明は**固定機能のGPU補間規則を前提とした式の導出**です。$w_A,w_B,w_C$ が異なるとき、画面上の単純な重心座標だけで色を重ねると一般に誤ります。すべて同じ値を補間する場合は $\lambda_A+\lambda_B+\lambda_C=1$ から常にその値となります。

## 3. 画素の色を描画前に手計算する

[全画面viewportの座標対応](../WGL1/index.md#prop-wgl1-viewport-map)により、$320\times240$ 描画バッファの中心近くの画素 $(i,j)=(160,120)$ の中心は

$$
x_n=\frac{2(160+\frac12)}{320}-1=\frac1{320},
\qquad
y_n=\frac{2(120+\frac12)}{240}-1=\frac1{240}.
$$

$A,B$ の高さはともに $-0.8$、$C$ の高さは $0.8$ なので

$$
y_n=-0.8(\lambda_A+\lambda_B)+0.8\lambda_C
=-0.8+1.6\lambda_C.
$$

よって

$$
\lambda_C=\frac{y_n+0.8}{1.6}
=\frac12+\frac58y_n=\frac{193}{384}
\approx0.502604.
$$

横座標 $x_n=-0.8\lambda_A+0.8\lambda_B$ から差を、重みの総和1から和を求めると

$$
\lambda_B-\lambda_A=\frac{x_n}{0.8}=\frac54x_n,
\qquad
\lambda_A+\lambda_B=1-\lambda_C.
$$

この2式を加減して

$$
\lambda_B=\frac{1-\lambda_C+(5/4)x_n}{2}
=\frac14+\frac58x_n-\frac5{16}y_n
\approx0.250651,
$$

$$
\lambda_A=\frac{1-\lambda_C-(5/4)x_n}{2}
=\frac14-\frac58x_n-\frac5{16}y_n
\approx0.246745.
$$

ここで $\lambda_A,\lambda_B,\lambda_C>0$ なので画素中心は三角形の内部です。[色補間の命題](#prop-wgl2-barycentric-color)を適用すると、初期uniform $u_{\mathrm{gain}}=(1,1,1)$ に対するフラグメント色は

$$
c(P)\approx(0.246745,0.250651,0.502604).
$$

8 bit RGBAへ換算して各RGB値を $255$ 倍・整数へ丸めると

$$
(63,64,128,255)
$$

と予測できます（GPU側との照合は補間・量子化差を考慮して各成分 $\pm2$）。これはCPUで **画素座標→NDC→重心座標→RGB** と計算した結果であり、GPU値を真値として逆算していません。

一方、画素 $(0,0)$ の中心は $(-0.996875,-0.995833\ldots)$ であり、$AB$ の高さ $-0.8$ より下なので三角形の外です。背景の $(0,0,0,255)$ がCPU側の基準値です。色が違うだけの検査と、塗られる領域が違う検査を分けているのが重要です。

## 4. 編集する3つのソースと失敗の種類

頂点シェーダでは2種類の入力属性を読み、位置と色の出力を分けます。

```glsl
#version 300 es
precision highp float;
layout(location = 0) in vec2 a_position;
layout(location = 1) in vec3 a_color;
out vec3 v_color;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_color = a_color;
}
```

フラグメントシェーダは補間済みの色に共通倍率をかけます。

```glsl
#version 300 es
precision highp float;
in vec3 v_color;
uniform vec3 u_gain;
out vec4 outColor;

void main() {
  outColor = vec4(v_color * u_gain, 1.0);
}
```

**失敗の切り分け**をしておきます。GLSLのセミコロンを消せば通常はそのシェーダの**コンパイル**に失敗します。頂点 `out vec3 v_color` とフラグメント `in vec2 v_color` は個別には文法上有効でも、2段階を接続する**リンク**で失敗します。他方、JavaScriptの `vertexAttribPointer(1,3,...,20,8)` を誤って `(1,2,...,20,8)` とすると、GPUは色の3成分目を読めず、**エラーを出さずに誤った絵になることがある**ので、CPU基準と照合する必要があります。

WebGL2でシェーダが組み合わさること、描画呼出しの順序は[WGL1の段階定義](../WGL1/index.md#def-wgl1-shader-stages)に従います。本講のプログラムは `drawArrays(gl.TRIANGLES,0,3)` を呼び、JavaScriptが色を画素ごとに描き込むのではありません。頂点バッファの共有と `drawElements` は次のWGL3で扱います。

## 5. 3タブWebGL2実験

実行欄の **JavaScript・頂点GLSL・フラグメントGLSLの編集結果が、そのまま隔離されたWebGL2描画に使われます**。WGL1と共通のホストを使い、本章固有のソースとCPU検算だけを切り替えます。

<iframe src="simulation/wgl-lab.html?lesson=WGL2" title="WGL2 頂点属性・uniform・varying 補間の編集実行ラボ" loading="lazy" style="width:100%;height:980px;border:1px solid #64748b;border-radius:7px;" allow="fullscreen"></iframe>

最初は $320\times240$ の初期ソースを実行し、「中央・赤側・緑側・背景」の4画素について予測と `readPixels` を照合してください。次に `colors.js` の `gl.uniform3f(gain,1.0,1.0,1.0)` を $(1,0.5,0.25)$ へ変え、予測した変化が現れるか確認します。最後に「varyingの型不一致」プリセットでリンクエラー、「構文エラー」でコンパイルエラーをそれぞれ観察してください。

このラボは初期値のままならCPUとGPUの差を自動比較します。**編集した後の不一致は、それだけで誤答ではありません**。修正したuniform/頂点色に合わせてCPU側の理論予測も自分で更新してください。初期プログラムからの差分や数値表が、思いどおりにシェーダへ伝わったかの手掛かりです。ブラウザがWebGL2非対応の場合、CPUの式を学習できてもGPU課題の完了にはなりません。

編集JSは `sandbox="allow-scripts"` の不透明originの子フレームだけで実行され、保存コードを自動実行しません。GPU停止やJS無限ループの完全な強制停止は保証できません。保存・初期化・停止・再実行の操作を用意しています。

## 6. 演習

### Level A

<a id="ex-wgl2-a1"></a>
**A1. 属性と共通値を分ける**

頂点3個に位置 $(x,y)$ と色 $(r,g,b)$ を設定し、同一倍率 $(1,0.5,0.25)$ を全体へ適用する。それぞれ attribute と uniform のどちらに置くべきか述べ、`in` と `uniform` を使ったGLSL宣言を記せ。

- Level: A

<!-- solution-start -->
**詳細解答。** 位置と色は頂点番号で変わるため、頂点シェーダの属性として `in vec2 a_position;` と `in vec3 a_color;` を宣言します。倍率は全頂点・全フラグメントに共通でよいので、フラグメントシェーダに `uniform vec3 u_gain;` を宣言します。JavaScriptでリンク済みプログラムを有効にし、`gl.uniform3f(location,1.0,0.5,0.25)` を設定します。位置と色をuniformにすると3頂点で異なる値を個別に読み出す仕組みにならず、倍率をattributeにすると同じ3数を各頂点へ冗長に送ることになります。
<!-- solution-end -->

<a id="ex-wgl2-a2"></a>
**A2. 三角形中心の重心座標**

$A=(-0.8,-0.8),B=(0.8,-0.8),C=(0,0.8)$、$P=(0,0)$ に対し、定義の符号付き面積から $(\lambda_A,\lambda_B,\lambda_C)$ を求め、位置が再現されることも示せ。

- Level: A

<!-- solution-start -->
**詳細解答。** [重心座標の定義](#def-wgl2-barycentric)を用います。分母は $D=1.6\cdot1.6=2.56$、分子は $E(B,C,P)=0.64$、$E(C,A,P)=0.64$、$E(A,B,P)=1.28$ です。したがって

$$
(\lambda_A,\lambda_B,\lambda_C)
=(0.64/2.56,0.64/2.56,1.28/2.56)
=(1/4,1/4,1/2).
$$

総和は $1$ です。位置は $x=(-0.8)/4+(0.8)/4+0/2=0$、$y=(-0.8)/4+(-0.8)/4+0.8/2=0$ と求まり、指定された $P$ に戻ります。
<!-- solution-end -->

<a id="ex-wgl2-a3"></a>
**A3. バッファのstrideとoffset**

1頂点を `Float32Array` の位置2成分・色3成分で交互に格納する。3頂点分の要素数と総byte数、位置・色それぞれの `vertexAttribPointer` の成分数、stride、offsetを求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 1頂点に $2+3=5$ 個の32 bit値があるので、3頂点では $5\cdot3=15$ 個、$15\cdot4=60$ byteです。次の頂点までの間隔は $5\cdot4=20$ byteです。位置は先頭なので `(location=0,size=2,stride=20,offset=0)`、色は位置2個の後なので `(location=1,size=3,stride=20,offset=2\cdot4=8)` です。strideを誤って12 byteにすると頂点の開始位置を3成分先と見なし、異なる頂点の値を混ぜて読みます。
<!-- solution-end -->

<a id="ex-wgl2-a4"></a>
**A4. uniformを掛けた中心色**

頂点色を赤・緑・青、重心座標を $(1/4,1/4,1/2)$ とし、uniform倍率を $(1,1/2,1/4)$ とする。出力RGBと8 bit RGBAの目安を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [色補間命題](#prop-wgl2-barycentric-color)から、uniform適用前は $(1/4,1/4,1/2)$ です。各成分に倍率をかけると

$$
(1/4\cdot1,\ 1/4\cdot1/2,\ 1/2\cdot1/4)
=(1/4,1/8,1/8).
$$

$255$ 倍すれば $(63.75,31.875,31.875)$ なので、四捨五入したRGBAは約 $(64,32,32,255)$ です。uniformは出力色の共通倍率であって、重心座標自体を変更しません。
<!-- solution-end -->

### Level B

<a id="ex-wgl2-b1"></a>
**B1. 画素中心を実際に予測する**

描画バッファ $320\times240$ の画素 $(160,120)$ に、本文の三角形と赤・緑・青の頂点色を使う。NDC、重心座標、初期uniform $(1,1,1)$ のRGB、8 bit値を順に求めよ。画素左下隅の連続座標を使わないこと。

- Level: B

<!-- solution-start -->
**詳細解答。** [WGL1の画素中心式](../WGL1/index.md#prop-wgl1-viewport-map)で $(x_n,y_n)=(1/320,1/240)$ です。$y_n=-0.8+1.6\lambda_C$ より

$$
\lambda_C=\frac12+\frac58\frac1{240}
=\frac12+\frac1{384}=\frac{193}{384}.
$$

さらに $x_n=0.8(\lambda_B-\lambda_A)$ と $\lambda_A+\lambda_B=1-\lambda_C$ を解くと

$$
\lambda_B=\frac{1-\lambda_C+(5/4)x_n}{2}
=\frac14+\frac5{8\cdot320}-\frac5{16\cdot240}
\approx0.250651,
$$

$$
\lambda_A=1-\lambda_B-\lambda_C\approx0.246745.
$$

3値が正なので内側です。[色補間命題](#prop-wgl2-barycentric-color)でRGBはこの順の3数となり、$255$ 倍した $(62.9199\ldots,63.9160\ldots,128.1640\ldots)$ を丸めて $(63,64,128,255)$ です。左下隅 $(160,120)$ を直接NDCへ逆変換すると画素中心から半画素ずれ、少し違う補間結果になります。
<!-- solution-end -->

<a id="ex-wgl2-b2"></a>
**B2. 何がどの段階で壊れるか**

次の3操作を、コンパイル・リンク・実行/画素値のどの段階の誤りか分類し、その理由を述べよ。(i) フラグメントGLSLの代入文の `;` を消す。(ii) 頂点側 `out vec3 v_color` を維持し、フラグメント側を `in vec2 v_color` に変える。(iii) JSの色属性のsizeを3から2に変える。

- Level: B

<!-- solution-start -->
**詳細解答。** (i) はGLSL構文が成立しないので、該当フラグメントシェーダの**コンパイル失敗**です。(ii) は各ソース内の宣言自体は有効ですが、同名varyingの型が一致しないため**プログラムのリンク失敗**です。(iii) は `vertexAttribPointer` のsize=2自体は有効なAPI指定です。しかし `in vec3 a_color` へ渡す色の第3成分がバッファから読まれず、欠けた成分の既定値0が補われます。すなわち元の $(r,g,b)$ は $(r,g,0)$ として入力され、青の寄与が消えます。そのため**描画できても色が違う**という種類の失敗になり、`readPixels` とCPU予測で検出する必要があります。エラーログが空でも正しいとは限りません。
<!-- solution-end -->

<a id="ex-wgl2-b3"></a>
**B3. すべての頂点の色が同じ場合**

$D\ne0$ の三角形で $w_A=w_B=w_C=1$、3頂点のvarying値がすべて $q=(0.2,0.4,0.6)$ である。内部のどの点でも同じ値になることを証明せよ。さらに、uniform倍率が $(1,0,0.5)$ の場合の出力と、uniformを設定し忘れた場合を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** [重心座標](#def-wgl2-barycentric)は $\lambda_A+\lambda_B+\lambda_C=1$ です。[補間命題](#prop-wgl2-barycentric-color)に $c_A=c_B=c_C=q$ を代入すると

$$
c(P)=\lambda_Aq+\lambda_Bq+\lambda_Cq
=(\lambda_A+\lambda_B+\lambda_C)q=q.
$$

よって内部の位置によらず一定です。uniformを成分別に掛けた出力は $(0.2\cdot1,0.4\cdot0,0.6\cdot0.5)=(0.2,0,0.3)$ です。一方 `u_gain` の初期値は $(0,0,0)$ なので、未設定なら $(0,0,0)$ になります。頂点色を均一にしてもuniformの未設定は救えません。
<!-- solution-end -->

### Level C

<a id="ex-wgl2-c1"></a>
**C1. 設計・予測・診断をつなぐ**

$A=(-0.8,-0.8), B=(0.8,-0.8), C=(0,0.8)$ にそれぞれ赤・緑・青を与える。三角形内の $P=(0.2,0)$ について、(1)重心座標、(2)uniform $u_{\mathrm{gain}}=(0.8,0.5,1)$ を使ったRGBAの8 bit予測値、(3)`a_color` を3成分ずつ読むための1頂点5 floatのVBO設定（位置と色のsize・stride・offset）、(4)結果が青成分だけ不足するときに最初に点検すべきAPI設定と、ログだけで正否を判定できない理由、を説明せよ。すべて $w_c=1$、補間は `smooth`、不透明、深度検査なしとする。

- Level: C

<!-- solution-start -->
**詳細解答。**

(1) 位置の $y$ 成分から $0=-0.8+1.6\lambda_C$ なので $\lambda_C=1/2$ です。$x$ 成分から $0.2=0.8(\lambda_B-\lambda_A)$、すなわち $\lambda_B-\lambda_A=1/4$ を得ます。また $\lambda_A+\lambda_B=1-\lambda_C=1/2$ なので、和と差を解いて

$$
\lambda_B=\frac{1/2+1/4}{2}=\frac38,\qquad
\lambda_A=\frac{1/2-1/4}{2}=\frac18.
$$

(2) [補間命題](#prop-wgl2-barycentric-color)を、頂点の $w_c$ がすべて1である条件で適用します。色の補間は $(1/8,3/8,1/2)$ です。uniform倍率を成分別に掛けると

$$
(0.8/8,\ 0.5\cdot3/8,\ 1\cdot1/2)
=(0.1,0.1875,0.5).
$$

$255$ 倍すると $(25.5,47.8125,127.5)$ なので、8 bit RGBAの目安は $(26,48,128,255)$ です。丸め方やGPU量子化により±1〜2程度の差はあり得ます。

(3) 1頂点は位置2 float、色3 floatです。floatは4 byteなのでstrideは20 byte。位置属性（location 0）はsize=2、offset=0、色属性（location 1）はsize=3、offset=8 byteです。両方とも `gl.FLOAT` で設定して有効化します。

(4) 色属性の `gl.vertexAttribPointer(1,3,gl.FLOAT,false,20,8)` をまず確認します。sizeが2なら青に対応する第3成分をバッファから読めず、補間後の青成分が期待より小さくなります。このAPI呼出し自体は合法なのでGLエラーやshaderのコンパイル・リンクエラーが出ない場合があります。したがってエラーログだけでは不十分で、CPU基準の $(26,48,128,255)$ とGPU値を比較し、さらにuniformの第3成分が本当に1かを調べる必要があります。
<!-- solution-end -->

## 7. この先

WGL2で、**頂点番号ごとの入力→頂点シェーダの出力→フラグメントへの補間→uniformを用いた色決定**が、一枚の三角形で追えるようになりました。次のWGL3では、共有する頂点を重複コピーせず多数の三角形へ使うためのVBO・VAO・EBOとインデックス描画を扱います。