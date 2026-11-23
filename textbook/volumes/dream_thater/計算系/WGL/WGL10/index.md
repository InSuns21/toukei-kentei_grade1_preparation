# WGL10 一回描いた結果を次に使うには？

[WGL9の照明モデル](../WGL9/index.md#def-wgl9-lambert)では、物体の色をフラグメントシェーダで計算し、画面に表示しました。しかしその色を**もう一度別のシェーダに渡す**には、画面へ直接描くだけでは不便です。例えば先に景色を描き、後から全画面の色を反転する処理では、景色の計算を毎回やり直したくありません。

この講義の問いは「最初に描いた結果を画像として残し、次の描画の入力にできるか」です。[WGL7のテクスチャとテクセル](../WGL7/index.md#def-wgl7-texel)で画像を**読む**方法は学んだので、今度は画像へ**描く**ための出口を作ります。WebGL2のframebuffer object（FBO）とcolor attachmentを使い、**第1パス：オフスクリーンの画像を生成 → 第2パス：保存画像を読み取って表示**します。左に同じシーンの直接描画、中央にFBOの保存画像、右に保存画像の反転を並べます。

## 1. なぜデフォルトの画面以外の描画先が必要か

[WGL1の描画バッファ](../WGL1/index.md#def-wgl1-drawing-buffer)はcanvasに結び付いた表示用の画素領域です。今までは描画命令をこのデフォルトの描画先へ送っていました。ところが描画命令の行き先を別の画像に変えられれば、途中結果を別のパスで読むことができます。

ここでは「パス」は一組の描画処理を意味します。第1パスの結果は画面外のテクスチャへ保持し、第2パスの入力になります。CPUが第1パスの全画素を読み戻して再アップロードする必要はありません。

<a id="def-wgl10-framebuffer"></a>

<!-- formal-statement-start -->
> **定義（フレームバッファオブジェクト）**  
> WebGL2のフレームバッファオブジェクト（FBO）は、描画先となる画像の接続関係を管理するオブジェクトである。 `gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)` でユーザー作成のFBOを描画先・読取り元に束縛し、 `gl.bindFramebuffer(gl.FRAMEBUFFER, null)` でcanvas側のデフォルト描画先に戻す。FBOそのものが色の画素配列を保持するわけではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-wgl10-framebuffer -->
**定義の確認**。160×240画素の画像を残したいとき、まず `gl.createFramebuffer()` でFBOを作ります。これだけでは色を書き込む画像は一つもありません。次節のcolor attachmentを接続してから、描画先をFBOへ切り替えます。画面へ出したい段階で `null` に戻します。したがって**「描画先の選択」と「画像の確保」**は別の操作です。
<!-- definition-example-end -->

FBOの接続先のうち、色のRGBAを保存する先をcolor attachmentといいます。ほかに深度・ステンシルの接続先もありますが、今回は色だけを扱い、深度テストは使いません。

<a id="def-wgl10-attachment"></a>

<!-- formal-statement-start -->
> **定義（カラーアタッチメント）**  
> WebGL2のFBOに対して `gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)` で指定する画像を、ここではカラーアタッチメントとする。 `texture` はあらかじめ2次元の幅・高さ・内部形式を割り当てたテクスチャであり、末尾の0はミップレベル0を表す。FBOへの描画で、この画像の色成分が更新される。
<!-- formal-statement-end -->

<!-- definition-example-start: def-wgl10-attachment -->
**定義の確認**。960×480のcanvasを3列（各320×480）に分け、オフスクリーン画像を320×480のRGBA8にします。 `gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, 320, 480, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)` で**画像領域を確保**し、前述の `framebufferTexture2D` で `COLOR_ATTACHMENT0` に付けます。幅160、高さ240、RGBAの各成分8bit、レベル0という接続先の実体を確かめました。画像ファイルのアップロードは必要ありません。
<!-- definition-example-end -->

画像が正しく取り付けられたかは、見た目ではなくAPIから調べます。接続が一つもなければ描画すべき領域がなく、形式や寸法が不適切でもFBOへ描けません。

<a id="def-wgl10-completeness"></a>

<!-- formal-statement-start -->
> **定義（フレームバッファの完成状態）**  
> WebGL2において、束縛中のFBOへ描画可能かを `gl.checkFramebufferStatus(gl.FRAMEBUFFER)` の返り値で判定する。 `gl.FRAMEBUFFER_COMPLETE` のとき完成（complete）であり、その他の値なら不完全である。完成状態はアタッチメントの有無・寸法・形式等を検査するが、後で描くシェーダの計算内容や画素値の正しさは保証しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-wgl10-completeness -->
**定義の確認**。アタッチメントがないFBOは `FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT` です。今回の例では、非零寸法のRGBA8テクスチャのレベル0を `COLOR_ATTACHMENT0` へ単独で取り付け、他にdepth/stencilを付けません。WebGL2でこの構成は色描画可能な形式なので、検査は通常 `FRAMEBUFFER_COMPLETE` を返します。返り値を比較せず「作成できたから完成」とはしません。
<!-- definition-example-end -->

### 1.1 描画先の切替はviewportを直さない

[WGL1のviewport対応](../WGL1/index.md#prop-wgl1-viewport-map)は、NDCから描画バッファ座標への変換です。描画先をFBOからcanvasへ切り替えても `gl.viewport` の設定は自動では切り替わりません。第1パスで320×480を指定し、次に960×480の画面へ描く場合、**あらためてviewportを設定**します。

本章の例は第2パスで画面左・中央・右の320×480をそれぞれ別のviewportにします。オフスクリーン画像とcanvasは同じ概念ではなく、オフスクリーン画像の幅は `offscreenScale` でさらに変更できます。

## 2. 画像へ描き、別のパスで読む

今度はFBOを画像に結び付け、フラグメントシェーダの出力を保存し、その保存済み画像を別の描画先で読みます。描画先と読取り元を分ける手順を確かめます。

<a id="def-wgl10-render-to-texture"></a>

<!-- formal-statement-start -->
> **定義（render-to-texture）**  
> 第1描画パスでテクスチャ画像をカラーアタッチメントとする完成済みFBOへ出力し、FBOから切り離した第2描画パスでそのテクスチャをsamplerとして読む手順を、render-to-textureとする。第2パスの描画先は第1パスのテクスチャを接続したFBOではなく、別の描画先でなければならない。1枚のテクスチャを**同時に読取り用と描画先**にするフィードバックループは許されない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-wgl10-render-to-texture -->
**定義の確認**。第1パスでは `gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)`、 `gl.viewport(0,0,320,480)`、 `u_pass=0` で夕景と細格子をRGBA8テクスチャへ描きます。第2パスは `gl.bindFramebuffer(gl.FRAMEBUFFER, null)` **の後に**そのテクスチャを `TEXTURE0` へ束縛し、 `u_pass=1` で中央へ保存画像を、 `u_pass=2` で右へRGB反転を描きます。左列だけは同じシェーダを `u_pass=0` で直接canvasへ描画した比較基準です。FBOとデフォルト描画先が異なり、先に完成した画像を入力として読むので2パスの条件を満たします。
<!-- definition-example-end -->

今回のテクスチャはRGBA8、[WGL7の最近傍フィルタ](../WGL7/index.md#def-wgl7-filter)の `NEAREST`、境界は[WGL7のラップ方式](../WGL7/index.md#def-wgl7-wrap)の `CLAMP_TO_EDGE` とします。ミップマップは生成せず、`TEXTURE_MIN_FILTER` も `NEAREST` を明示します。これはレベル0だけのテクスチャを未完成なミップ系列として誤用しないためです。

この実験で第1パスを描く間は、アタッチメントにしたテクスチャをsamplerから外します。第2パスへ切り替える**前にFBOを解除**し、それからテクスチャをsamplerへ束縛します。束縛する順序が違うだけで、同一画像を読む／書くという禁止状態を作り得ます。

## 3. 画素座標を追えば、何を読んだか計算できる

フルスクリーンの四角形の各頂点はNDCの四隅で、`v_uv = 0.5*(a_position+1)` を渡します。頂点の `w=1` は一定なので、[WGL6の透視補正補間](../WGL6/index.md#def-wgl6-perspective-interpolation)でもUVは画面座標の一次関数になります。

幅 $V_w$、高さ $V_h$ のviewport内で左下から数える画素を $(i,j)$ とし、画素の中心のUVを求めます。

<a id="prop-wgl10-pixel-centers"></a>

<!-- formal-statement-start -->
> **命題（全画面四角形の画素中心と最近傍読取り）**  
> 幅 $V_w>0$、高さ $V_h>0$ のviewportを四角形で覆い、四隅で $u=(x_{\mathrm{ndc}}+1)/2$、$v=(y_{\mathrm{ndc}}+1)/2$ を与える。各頂点のクリップ座標の $w=1$ とする。画素 $(i,j)$（$0\le i<V_w$、$0\le j<V_h$）の中心に対応するUVは

$$
u=\frac{i+\frac12}{V_w},
\qquad v=\frac{j+\frac12}{V_h}.
$$

> さらにテクスチャの寸法も $V_w\times V_h$ で、各画素中心へ最近傍サンプリングするなら、$(i,j)$ の画素は対応する同じ添字のテクセルを読む。ただし境界ちょうどの補間規則やディザリング等の別処理は除く。
<!-- formal-statement-end -->

### 証明の見取り図

viewport式を逆向きに解き、画素中心の $(i+1/2,j+1/2)$ を代入します。テクスチャのテクセル中心も同じ分数です。

<!-- proof-start -->
### 証明

[全画面viewportの写像](../WGL1/index.md#prop-wgl1-viewport-map)で、NDCの $x$ 成分は

$$
x_v=\frac{V_w}{2}(x_{\mathrm{ndc}}+1)
$$

です。$x_v=i+1/2$ を代入して両辺を $V_w$ で割ると

$$
\frac{x_{\mathrm{ndc}}+1}{2}
=\frac{i+\frac12}{V_w}=u.
$$

縦方向も同じ[viewport写像](../WGL1/index.md#prop-wgl1-viewport-map)を使います。画素中心 $y_v=j+1/2$ を代入すると

$$
y_v=\frac{V_h}{2}(y_{\mathrm{ndc}}+1)=j+\frac12,
\qquad
v=\frac{y_{\mathrm{ndc}}+1}{2}=\frac{j+\frac12}{V_h}.
$$

右半画面のようにviewportの左下がcanvas上の $(x_0,y_0)$ に移っても、局所添字 $(i,j)$ の画素中心は $(x_0+i+1/2,\,y_0+j+1/2)$ です。viewport写像の両辺から原点を引くと

$$
\begin{aligned}
x_{\mathrm{canvas}}-x_0&=\frac{V_w}{2}(x_{\mathrm{ndc}}+1)=i+\frac12,\\
y_{\mathrm{canvas}}-y_0&=\frac{V_h}{2}(y_{\mathrm{ndc}}+1)=j+\frac12.
\end{aligned}
$$

したがって原点をずらしても、**同じ局所添字とviewport寸法ならUVは変わりません**。また、各頂点の $w=1$ なので、[透視補正補間](../WGL6/index.md#def-wgl6-perspective-interpolation)の分子・分母に現れる $1/w$ は打ち消し合います。四角形の2枚の三角形内でも、頂点で与えた一次式 $u=(x_{\mathrm{ndc}}+1)/2$、$v=(y_{\mathrm{ndc}}+1)/2$ がそのまま補間されます。

[テクセル中心の定義](../WGL7/index.md#def-wgl7-texel)では、テクスチャ寸法 $T_w\times T_h$ の添字 $(k,\ell)$ の中心は

$$
\left(\frac{k+\frac12}{T_w},\frac{\ell+\frac12}{T_h}\right).
$$

$T_w=V_w$、$T_h=V_h$ なら $k=i,\ell=j$ を取るとUVが一致します。最近傍の候補の中に距離0のこのテクセルがあるため、同じ添字を返します。
<!-- proof-end -->

**画素中心の数値例**。デモの960×480とは別に、160×240のviewportで $(i,j)=(40,60)$ なら

$$
(u,v)=\left(\frac{40.5}{160},\frac{60.5}{240}\right)
=(0.253125,\,0.2520833\ldots).
$$

両成分が$1/2$未満なので、デモの左下象限に置いた**検算用の小さな色見本**の内部に対応します。中央の保存画像と右の後処理画像は同じ領域を読みますが、右はRGB反転を行います。

テクスチャを80×120に縮小すると、同じ出力画素が同じ添字のテクセルを読む、という命題の**寸法一致条件は失われます**。[最近傍の定義](../WGL7/index.md#def-wgl7-filter)に従って、今度はUVからどの低解像度テクセルが最も近いかを求めます。画面は160×240のままでも、FBO画像は80×120にできます。

## 4. 中間画像の8bit化を飛ばしてはいけない

第1パスでシェーダが $(0.2,0.3,0.4)$ を返しても、RGBA8に保存された後の画素は実数そのものではありません。第2パスで読むのは**有限桁に量子化済み**の色です。[WGL8のsRGB変換](../WGL8/index.md#def-wgl8-srgb-transfer)と混同しないように、本例では光量の加算・sRGB符号化を行わず、RGBA8の数値成分をそのまま処理します。

<a id="prop-wgl10-quantization"></a>

<!-- formal-statement-start -->
> **命題（RGBA8経由の反転は量子化後の補数）**  
> 第1パスで各成分 $c\in[0,1]$ をRGBA8へ保存し、理想的な最近接整数への量子化で次の整数値を得るとする。

$$
b=\operatorname{round}(255c)\in\{0,\ldots,255\}.
$$

> 第2パスは正規化値 $b/255$ を最近傍で読み、その補数をRGBA8へ再保存する。追加の色変換・ブレンド・ディザリングがない理想演算なら、第2パスの整数値は次である。

$$
b'=255-b.
$$
<!-- formal-statement-end -->

### 証明の見取り図

RGBA8の第1回の丸めを先に実施します。反転してから丸めるのではなく、**すでに整数になった画素を255から引く**と考えます。

<!-- proof-start -->
### 証明

第1パス後に記憶される整数を $b=\operatorname{round}(255c)$ とします。RGBA8を正規化して読むと $b/255$ なので、第2パスのシェーダ出力は

$$
c'=1-\frac{b}{255}=\frac{255-b}{255}.
$$

これを8bitへ書くと

$$
b'=\operatorname{round}(255c')
=\operatorname{round}(255-b)=255-b.
$$

最後の等号は $255-b$ が既に整数だからです。GPUの浮動小数点計算・丸め規則では微小差があり得るため、実験では成分ごとに±2を許します。仮定なしに常にビット単位一致するとは主張しません。
<!-- proof-end -->

**数値例**。第1パスの左下の小さな色見本（中心UVは $(1/4,1/4)$）は $(0.2,0.3,0.4)$ です。理想的に四捨五入すると

$$
(255\cdot0.2,\ 255\cdot0.3,\ 255\cdot0.4)
=(51,\ 76.5,\ 102)
\longrightarrow(51,77,102).
$$

したがって右列の色見本の反転結果は

$$
(255,255,255)-(51,77,102)=(204,178,153).
$$

先に実数の $0.3$ を反転して $0.7\cdot255=178.5$ を丸めると179という計算もあり得ますが、第2パスの入力は**0.3ではなく量子化された77/255**です。この1階調の違いが多段レンダリング特有の注意点です。

## 5. WebGL2で見る：シーン → FBO → 後処理

夕景・山・細格子を描くシェーダを実行し、保存用テクスチャを経由させると何が変わるかを見ます。3列はすべて**実際のGPU描画結果**です。

| 左：シーン直接描画 | 中：FBOの保存画像 | 右：保存画像の後処理 |
| --- | --- | --- |
| `u_pass=0`。比較用にシーンをcanvasへ直接描く | `u_pass=1`。第1パスのRGBA8をそのまま読む | 初期`u_pass=2`。中列と同じRGBA8画像を反転 |
| FBOを経由しない基準 | FBO縮小で細部が画素化する | 保存画像の画素化は反転後も残る |

第1パスは `gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)` で保存先を選び、`drawScene(v_uv)` をRGBA8へ書き込みます。続いて `gl.bindFramebuffer(gl.FRAMEBUFFER, null)` でcanvasへ切り替え、第2パスとして3つのviewportへ表示します。**描画先はFBO→canvasの2種類**、canvasへの描画命令は3回です。左列は同じGLSLをもう一度直接描く比較基準で、別の計算モデルではありません。

<iframe src="simulation/wgl-lab.html?lesson=WGL10" title="WGL10 実シーン・FBOテクスチャ・後処理の3段階比較とJS／GLSL編集" loading="lazy" style="width:100%;height:1100px;border:1px solid #64748b;border-radius:4px;" allow="fullscreen"></iframe>

### 5.1 実験の進め方

初期canvasは960×480画素、表示用の左・中・右はそれぞれ320×480画素です。保存用FBOはRGBA8の320×480 texel、`NEAREST`・`CLAMP_TO_EDGE`・ミップレベル0。物理計算格子ではなく**途中画像を保存する領域**です。

1. **実行**：左と中央の大きな形は同じで、右だけ色が反転します。中央と右の入力は第1パスで完成した同じFBOです。
2. **FBOの解像度倍率** `1 → 0.5`：FBO画像は160×240 texelに減りますが、表示は各320×480画素のままです。中央・右の細格子と縁のピクセル化を左と比較してください。`NEAREST` によって1テクセルを複数表示画素が読みます。
3. **保存画像の後処理** `invert → grayscale → copy`：右列だけが変わります。`copy` では中央と右が一致します。
4. **表示する段階** `scene / texture / processed`：選んだ段階だけをcanvas全幅で観察し、`all` で3列へ戻します。画像は別のプレビューではなく、同じGPU描画です。
5. **コード編集**：`framebuffer.frag` の `drawScene` の空や格子の色を変更して再実行します。中央・右にも変化が伝わります。`u_pass` の分岐を変えた場合には、対応する列だけが変わります。

GUIは `framebuffer.js` の `offscreenScale`、`filterMode`、`inspectionPass` という**同一JS定数**を直接編集して再実行します。`framebuffer.frag` では `u_pass=0` が生成、`1` がコピー、`2` が反転、`3` がグレースケールです。頂点GLSLは `v_uv` を渡す役目です。値域は倍率0.5〜1.0（0.25刻み）、後処理3種類、表示4種類です。

### 5.2 小さな色見本で12画素を検算する

シーンには $(u,v)=(1/4,1/4),(3/4,1/4),(1/4,3/4),(3/4,3/4)$ を中心とした、4個の**数値検算用の正方形**があります。夕景は現象観察のための絵であり、色見本はRGBA8の量子化を追うための場所です。

| 表示列 | 左下 | 右下 | 左上 | 右上 |
| --- | --- | --- | --- | --- |
| 左：直接描画 | (51,77,102) | (204,77,102) | (51,179,102) | (204,179,102) |
| 中：FBOコピー | (51,77,102) | (204,77,102) | (51,179,102) | (204,179,102) |
| 右：FBO反転 | (204,178,153) | (51,178,153) | (204,76,153) | (51,76,153) |

アルファはすべて255です。RGBA各成分±2を許容して12画素を独立CPU基準と照合します。実行結果の「CPU予測とGPU画素の照合」を開いて確認できます。編集したシェーダや単一段階の表示は初期基準と異なり得るため、表示される比較値は参考です。

### 5.3 FBOと描画先を混同しない

FBOは画像を保持せず、`gl.framebufferTexture2D` によって画像への接続を管理します。`gl.checkFramebufferStatus` が `FRAMEBUFFER_COMPLETE` を返すことを確認してから描き、`gl.readPixels` で中間RGBA8画像の1画素を診断できます。

**反例：FBOを束縛したまま元のテクスチャをサンプラとして読む。** 同じ画像を同時に描画先と入力にするフィードバックループとなり、結果は保証されません。FBOの完成判定だけでは防げません。canvasへ戻す際も `gl.viewport` の寸法は自動で変わらないので、各列のviewportを指定します。描画サイズの変更時にはFBOも再確保します。

実装を深掘りする資料は [WebGL2 Fundamentals：Render to Texture](https://webgl2fundamentals.org/webgl/lessons/webgl-render-to-texture.html) と [Framebuffers](https://webgl2fundamentals.org/webgl/lessons/webgl-framebuffers.html) です。GPU非対応やGLSLコンパイル失敗は結果タブの「GLSL診断・実行ログ」で確認できます。

## 6. 演習と詳細解答

B1とC1の左右2列は、3列デモとは別に設計する**応用問題**です。

### Level A

<a id="ex-wgl10-a1"></a>

**A1. 未完成のFBOを見抜く。** FBOだけ作成し、何もアタッチメントを付けなかった場合の状態を答えなさい。次に、160×240のRGBA8レベル0をCOLOR_ATTACHMENT0へ単独接続した場合を説明しなさい。

- Level: A

<!-- solution-start -->
**詳細解答**。[完成状態の定義](#def-wgl10-completeness)では、接続先が一つもないと `FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT` です。画像が存在しないので画素を書けません。次の構成では幅160・高さ240はともに正、RGBA8はWebGL2の色描画対象に使える形式で、レベル0がCOLOR_ATTACHMENT0へつながっています。その他の接続先がないので添付画像間の不一致もありません。したがって正常な環境なら `FRAMEBUFFER_COMPLETE` となります。FBOを生成した時点ではなく、**接続後**に検査する必要があります。
<!-- solution-end -->

<a id="ex-wgl10-a2"></a>

**A2. 四象限の定数色を用いる応用。** 第1パスが $u<1/2$ なら赤0.2、それ以外なら0.8、$v<1/2$ なら緑0.3、それ以外なら0.7、青は常に0.4とする。 $(u,v)=(1/4,3/4)$ と $(3/4,1/4)$ のRGBを求めなさい。

- Level: A

<!-- solution-start -->
**詳細解答**。最初は $u=1/4<1/2$ なので赤0.2、$v=3/4\ge1/2$ なので緑0.7、青0.4です。よって $(0.2,0.7,0.4)$。次は $u=3/4\ge1/2$ なので赤0.8、$v=1/4<1/2$ なので緑0.3、青0.4です。よって $(0.8,0.3,0.4)$。**UV判定とRGBA8への整数変換は別段階**であり、ここでは実数値までを求めています。
<!-- solution-end -->

<a id="ex-wgl10-a3"></a>

**A3. 画素中心のUV。** 160×240の左viewportにある $(i,j)=(40,60)$ のUVを導出し、どの象限か答えなさい。

- Level: A

<!-- solution-start -->
**詳細解答**。[画素中心の命題](#prop-wgl10-pixel-centers)の仮定は、フルスクリーン四角形、一定の $w=1$、幅160・高さ240です。式に $i=40,j=60$ を代入すると

$$
u=(40+1/2)/160=40.5/160=0.253125,
$$

$$
v=(60+1/2)/240=60.5/240\approx0.2520833.
$$

ともに $1/2$ 未満なので左下象限を読みます。ゼロ始まりの画素添字40と実数座標40.5を混同しません。
<!-- solution-end -->

<a id="ex-wgl10-a4"></a>

**A4. 8bit反転。** 第1パスがRGBA8へ $(51,77,102,255)$ を保存した。このテクスチャを読み、RGBのみを `1.0 - sampled.rgb` で反転したときの理想RGBA8整数値を求めなさい。

- Level: A

<!-- solution-start -->
**詳細解答**。[RGBA8反転の命題](#prop-wgl10-quantization)に従い、正規化された入力は $(51/255,77/255,102/255,1)$ です。反転後は

$$
(1-51/255,\ 1-77/255,\ 1-102/255,\ 1)
=(204/255,178/255,153/255,1).
$$

これを255倍すると $(204,178,153,255)$ です。アルファは1に固定し、反転しません。元の実数の0.3をそのまま使う計算とは区別します。
<!-- solution-end -->

<a id="ex-wgl10-a5"></a>

**A5. 二つの描画先。** FBOのサイズ160×240で描き終えた後、canvas320×240へ切り替えた。FBOの束縛解除だけでviewportまで320×240になるか。必要な操作を答えなさい。

- Level: A

<!-- solution-start -->
**詳細解答**。[viewportの写像](../WGL1/index.md#prop-wgl1-viewport-map)は状態に設定された幅・高さを使います。`bindFramebuffer(..., null)` は描画先を変えるだけでviewportの値は変えません。従って160×240が残ります。全面へ描くなら `gl.viewport(0,0,320,240)` を呼び直し、本例のように左右比較するなら `gl.viewport(0,0,160,240)` と `gl.viewport(160,0,160,240)` を各描画で呼びます。描画先を変えた操作と座標写像を変えた操作を分けて示しました。
<!-- solution-end -->

### Level B

<a id="ex-wgl10-b1"></a>

**B1. 奇数幅でも左右に分ける。** canvasが321×241のとき、左幅 `floor(width/2)`、右幅を残りとする。第1パスのテクスチャ寸法と、各半画面の左下4分の1の検査画素の全canvas座標を求めなさい。高さの検査は `floor(height/4)` とする。

- Level: B

<!-- solution-start -->
**詳細解答**。左幅は $\lfloor321/2\rfloor=160$、右幅は $321-160=161$。 `offscreenScale=1` なら第1パスは160×241であり、右viewportの幅と必ずしも一致しません。左の局所検査座標は

$$
(i,j)=(\lfloor160/4\rfloor,\lfloor241/4\rfloor)=(40,60).
$$

右の局所添字は $\lfloor161/4\rfloor=40$ ですが、全canvasの横座標には左側の160画素を加えるので

$$
(x,y)=(160+40,60)=(200,60).
$$

[画素中心の命題](#prop-wgl10-pixel-centers)を左右それぞれの**局所viewport座標**へ適用すると、左のUVは $(40.5/160,\ 60.5/241)$、右のUVは $(40.5/161,\ 60.5/241)$ です。右側は開始位置 $x_0=160$ を差し引いた局所添字40を使っています。いずれも両成分が $1/2$ 未満なので左下象限を読みますが、右のviewportは161幅のため画素中心UVが少し異なります。
<!-- solution-end -->

<a id="ex-wgl10-b2"></a>

**B2. フィードバックループの反例。** FBOのCOLOR_ATTACHMENT0へ付けたテクスチャを、同じFBOを描画先にしたままフラグメントシェーダのsamplerとして読みました。なぜ正しい2パスにならないか、直すコードの順序とともに答えなさい。

- Level: B

<!-- solution-start -->
**詳細解答**。[render-to-textureの定義](#def-wgl10-render-to-texture)では、第1パスで画像へ書き込みを終えてから、第2パスは**別の描画先**へ出力する必要があります。問題の状態では読み元と書き先が同じ画像であり、各フラグメントが第1パスの値を読む保証がなく、フィードバックループを作ります。例えば

`gl.bindFramebuffer(gl.FRAMEBUFFER, null);`

で描画先をデフォルトへ戻してから、

`gl.activeTexture(gl.TEXTURE0);`、`gl.bindTexture(gl.TEXTURE_2D, colorTexture);`

を実行し、 `gl.viewport(...)` を更新して第2パスを描きます。修正の要点は「先に描画先を外し、次に保存済み画像を読む」ことです。完成FBOであっても読み書き同時使用を許すわけではありません。
<!-- solution-end -->

<a id="ex-wgl10-b3"></a>

**B3. viewportの取り残し。** FBOが80×120、canvasが320×240のとき、FBO用のviewport $(0,0,80,120)$ をそのままにしてcanvasのデフォルト描画先へ全画面四角形を1回描いた。想定した全面表示にならない理由を示しなさい。

- Level: B

<!-- solution-start -->
**詳細解答**。FBOを `null` に束縛し直しても、現在のviewportは幅80・高さ120のままです。[viewport写像](../WGL1/index.md#prop-wgl1-viewport-map)によってNDCの $(-1,-1)$ は $(0,0)$、$(1,1)$ は $(80,120)$ へ写るため、全画面四角形もcanvas左下の80×120の領域へ描かれます。canvasの幅320、高さ240という保存領域と、viewportで指定する座標変換は独立しています。 `gl.viewport(0,0,320,240)` に直せば全面へ描けます。この左右2列の応用問題では各半画面のviewportを別々に指定する必要があります。
<!-- solution-end -->

<a id="ex-wgl10-b4"></a>

**B4. 第1パスでの丸めの影響。** 緑成分が0.3の第1パスをRGBA8へ保存するものとする。(i) 理想的な四捨五入での保存値、(ii) それを読んで反転した8bit値、(iii) 保存前の0.3をそのまま反転してから四捨五入した値を求め、差の原因を説明しなさい。

- Level: B

<!-- solution-start -->
**詳細解答**。(i) $255\cdot0.3=76.5$ なので四捨五入で77を保存します。(ii) [量子化後の補数命題](#prop-wgl10-quantization)によって $255-77=178$ です。(iii) 実数のまま先に反転すると $1-0.3=0.7$、さらに $255\cdot0.7=178.5$ を四捨五入して179になります。

(i)→(ii)の経路では第1パスで一度整数化した値 $77/255$ が第2パスの入力になり、(iii)では整数化前の0.3が入力になっています。入力が異なるため、1階調の差が生じます。実際のGPUで半整数の丸め方式・精度には差があり得るので、これは理想量子化の比較であり、実装が必ず77を選ぶと保証する主張ではありません。
<!-- solution-end -->

### Level C

<a id="ex-wgl10-c1"></a>

**C1. FBOの縮小と2パスの統合設計。** canvasを320×240とし、左右それぞれ160×240のviewportを作る。 `offscreenScale=0.5`、`invertRight=true` とする。第1パスは演習A2の四象限の定数色を画面全域に描く別構成とし、RGBA8・NEAREST・CLAMP_TO_EDGE・レベル0を用い、追加の色変換を行わない。

1. FBOのテクスチャ寸法と完成状態の確認条件を示しなさい。
2. 左viewportの局所座標 $(40,60)$ と $(120,180)$ に対応するUV、および最も近いテクセルの添字を求めなさい。
3. その2画素を左の原画と右の反転画像で読んだ場合のRGBA8理想値を求めなさい。
4. もし右側を描くときもFBOが束縛されたままなら、何が壊れるか説明し、最短の操作順を示しなさい。

- Level: C

<!-- solution-start -->
**詳細解答**。

**(1)** 左画面幅160、高さ240へ縮小率0.5を掛けるので、テクスチャは

$$
T_w=\lfloor160\cdot0.5\rfloor=80,\qquad
T_h=\lfloor240\cdot0.5\rfloor=120.
$$

いずれも正で、RGBA8のレベル0をCOLOR_ATTACHMENT0へ単独接続する構成です。[完成状態](#def-wgl10-completeness)を `checkFramebufferStatus` で検査し、 `FRAMEBUFFER_COMPLETE` を得てから描画します。今回は深度アタッチメントを追加しません。

**(2)** [全画面四角形の画素中心と最近傍読取り](#prop-wgl10-pixel-centers)を使い、最初のUVは

$$
(u_1,v_1)=(40.5/160,\ 60.5/240)
=(0.253125,\ 0.2520833\ldots).
$$

この問題ではviewportとテクスチャの寸法が異なるため、[画素中心命題](#prop-wgl10-pixel-centers)の**寸法一致時の添字一致**は適用できません。[WGL7のUV座標とテクセル中心の定義](../WGL7/index.md#def-wgl7-texel)に戻ると、$0\le u,v<1$ の `NEAREST` 参照では、テクスチャ寸法 $(T_w,T_h)$ に対し $(k,\ell)=(\lfloor T_wu\rfloor,\lfloor T_hv\rfloor)$ です。今回のUVは範囲内で、

$$
80u_1=80\frac{40.5}{160}=20.25,\qquad
120v_1=120\frac{60.5}{240}=30.25.
$$

したがって最近傍テクセルの添字は

$$
(k_1,\ell_1)=(\lfloor80u_1\rfloor,\lfloor120v_1\rfloor)
=(20,30).
$$

第2画素は

$$
(u_2,v_2)=(120.5/160,\ 180.5/240)
=(0.753125,\ 0.7520833\ldots),
$$

$$
(k_2,\ell_2)=(\lfloor80u_2\rfloor,\lfloor120v_2\rfloor)
=(\lfloor60.25\rfloor,\lfloor90.25\rfloor)=(60,90).
$$

どちらも境界$1/2$から離れたテクセル中心に最も近く、前者は左下、後者は右上象限です。

**(3)** この応用問題の四象限定数色では、前者の第1パスの実数色は $(0.2,0.3,0.4)$、後者は $(0.8,0.7,0.4)$。RGBA8へ四捨五入すると

$$
b_1=(51,77,102,255),\quad b_2=(204,179,102,255).
$$

左の原画はこの2値です。右側は[量子化後の補数](#prop-wgl10-quantization)により

$$
b'_1=(204,178,153,255),\quad b'_2=(51,76,153,255).
$$

描画先の右viewportでも**局所座標** $(40,60)$、$(120,180)$ を使うので、全canvasでは $x=200$、$x=280$ の画素を調べます。実GPUでの測定には±2の許容差を設けます。

**(4)** FBOを解除しなければテクスチャが書込み対象であると同時に読取り対象となり、フィードバックループのため描画結果は保証されません。先にFBOへ描き、 `gl.bindFramebuffer(gl.FRAMEBUFFER,null)` で画面へ戻してからテクスチャをサンプラへ束縛し、 `gl.viewport(0,0,160,240)` でコピー、 `gl.viewport(160,0,160,240)` で反転を実行します。FBOの80×120とは別に出力先の160×240を設定する必要があります。
<!-- solution-end -->

## 7. ここまでにできること

- FBO・カラーアタッチメント・完成状態を区別し、画面外テクスチャへの描画先を構成できる。
- 第1パスの画像をRGBA8 FBOに保存し、直接描画・保存画像・後処理の実GPU結果を比較できる。
- viewport・テクスチャ寸法・最近傍サンプリングの対応を画素中心から導出できる。
- RGBA8で**中間量子化してから**フィルタを適用した値をCPUで予測し、GPUの読み取り値と比べられる。

次のWGL11では、FBOを使って光源から見た深度を記録し、「光が遮られる領域」を判定するshadow mappingへ進みます。
