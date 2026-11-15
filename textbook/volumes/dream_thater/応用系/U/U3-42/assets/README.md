# U3-42 数値実験

`vasicek_bonds.py` は Python 標準ライブラリだけで動作する。教材ページ上の `python-file-lab` から実行できる。CLI でも次を実行できる。

~~~bash
python textbook/volumes/dream_thater/応用系/U/U3-42/assets/vasicek_bonds.py --samples 20000
python textbook/volumes/dream_thater/応用系/U/U3-42/assets/vasicek_bonds.py --samples 20000 --sigma 0
~~~

年率は連続複利、短期金利と満期は年単位。$I=\int_0^T r_u\,du$ を条件付き正規分布から厳密に生成し、$\exp(-I)$ を Monte Carlo 推定するため、時間離散化バイアスはない。標本誤差は残る。数値出力は架空モデルであり市場価格・売買助言ではない。
