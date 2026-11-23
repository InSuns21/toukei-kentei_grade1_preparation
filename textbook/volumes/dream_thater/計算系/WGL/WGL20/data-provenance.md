# WGL20 固定PLATEAUサンプルの出典・変換・制限

このページは**実在するサンプルから抽出した建物形状1棟**と、教材で作った**合成DEM・周辺建物8棟・道路・仮想水位**を厳密に区別するための記録です。

## 入力の固定

- 公式公開元：国土交通省 Project PLATEAU が公開する [PLATEAU-generator-for-spatialid](https://github.com/Project-PLATEAU/PLATEAU-generator-for-spatialid) のサンプルファイル。
- ファイル： [examples/citygml/udx/bldg/building_sample.gml](https://github.com/Project-PLATEAU/PLATEAU-generator-for-spatialid/blob/e921990effa2e884f1c8667cef1cab491d1de619/examples/citygml/udx/bldg/building_sample.gml)
- 固定コミット： e921990effa2e884f1c8667cef1cab491d1de619
- 元GML：CityGML 2.0、gml:Envelopeとlod1Solidの srsName は http://www.opengis.net/def/crs/EPSG/0/6697、gml:posListは緯度・経度・高さの3成分。
- gml:id： bldg_5c7cdfba-8d61-4c2e-be32-9029e6b144ba
- measuredHeight（元属性）：14.5 m。元の利用用途コードは402（コードの意味は外部コード表未読のため断定しない）。
- **元サンプルの整備自治体・測量年度・データ年版は確定できない**。代表緯度経度から地名を推定しても出典情報の代用とはしない。
- 上記GitHubリポジトリの [LICENSE](https://github.com/Project-PLATEAU/PLATEAU-generator-for-spatialid/blob/e921990effa2e884f1c8667cef1cab491d1de619/LICENSE) は BSD 3-Clause（Copyright 2023 MLIT Japan）。リポジトリ内コードのライセンス記載と、元の3D都市モデルデータの個別利用条件が**常に同一だとは断定しない**。二次利用時には元データの利用条件・出典表記・配布条件を別途確認すること。

## 再現方法（Node.js、外部ランタイム依存なし）

1. 上の**固定コミット**の building_sample.gml をローカルへダウンロードする（ブラウザから保存可）。教材のWebGL2実行中には外部取得しません。
2. リポジトリのWGL20ディレクトリで、次のコマンドを実行します。

    node extract-plateau.mjs building_sample.gml plateau-lod1.json

3. 出力が**建物1棟・LOD1の25面、138頂点、88三角形**となることを確認します。形状変更・穴付き面・CRS変更は勝手に通さず、スクリプトが失敗する仕様です。
4. 原点は $(37.63308^\circ,140.96242^\circ,29.70502587\,\mathrm{m})$、入力軸順は緯度・経度・高さ、出力軸は東・北・上でメートルです。GRS80の局所線形化で変換し、最終座標だけを0.0001 mへ丸めます。元GMLの代表点 $(37.63297022805161,140.9624389225186,29.70502587)$ は出力で $(1.6703,-12.1835,0)$ mです。
5. 出力の metadata・頂点・三角形を [pages/simulation/wgl20-lab-core.mjs](https://github.com/InSuns21/toukei-kentei_grade1_preparation/blob/main/pages/simulation/wgl20-lab-core.mjs) の独立基準およびWGL20ラボの報告値で検算します。静的JSONは厳密な地理投影全体を再現したものではありません。

**表示上の建物数**：WebGL2ラボに見える9棟のうち、PLATEAUの元GMLに対応するのは黄土色の1棟だけです。灰白色の8棟は `terrain.js` の `blocks` 配列から作った合成形状で、実在の位置や属性を表しません。建物の影は実際のメッシュを光源側から描く1024×1024深度テクスチャによって計算しますが、影や道路の表示から実測道路を推定してはいけません。

**限界**：この抽出は公式GMLの**この一棟のサンプル用**です。一般のCityGML parserではありません。穴を持つ多角形、外部参照、複数建物、別CRS、独立した高さ基準変換は対応していません。EPSG:6697はJGD2011の水平・鉛直複合CRSであり、本章の合成DEMと仮想水位はその鉛直基準に合わせたと**仮定した教材値**です。実際のDEMや浸水予測として引用しないでください。

付属[CS1](cs1.md)、[CS2](cs2.md)、[CS3](cs3.md)は、基礎講の座標・高さの誤解を防ぐための応用課題であり、別の市街地データを扱う際には元の出典とライセンスを改めて確認します。
