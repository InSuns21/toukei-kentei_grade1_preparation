# U3-57 有限状態 ES ヘッジ実験

- Python 3.11 以降、標準ライブラリのみ。外部データ・乱数・API キー不要。
- 金額は万円、数量はヘッジ単位、期間は1営業日、確率は実確率 P。
- ES は分位点積分と等価な尾部重み付けで計算。境界の同額損失はソート順の一例として表示し、値は並べ替えに依存しない。
- 1変数の厳密分数演算で、すべてのシナリオ損失線の交点と数量制約端点を列挙し、目的値を比較する。

章ディレクトリをカレントディレクトリにして実行する。

~~~text
python assets/es_hedge.py --alpha 0.50 --cost 1 --cap 2
python assets/es_hedge.py --alpha 0.50 --cost 1 --cap 1
python assets/es_hedge.py --alpha 0.50 --cost 5 --cap 2
python assets/es_hedge.py --alpha 0.75 --cost 1 --cap 2
python -m unittest discover -s assets/tests -v
~~~

基準例は x=4/3、ES=44/3 万円、費用=4/3 万円、目的値16万円。上限1の例は x=1、目的値17万円。費用5の例は x=0、目的値20万円。75% ES の例は x=1/2、目的値37/2万円。

計算量は m 状態について交点列挙 O(m^2)、各候補のソート O(m log m)、全体 O(m^3 log m)、候補メモリ O(m^2)。小規模教育実験用であり、多資産・大規模シナリオでは線形計画ソルバーを利用する。
