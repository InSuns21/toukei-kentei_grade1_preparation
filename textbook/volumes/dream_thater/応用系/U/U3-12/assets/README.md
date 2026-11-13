# U3-12 検証コード

Python 3.10 以降の標準ライブラリのみを使用します。依存ライブラリの追加は不要です。

章ディレクトリ U3-12 で実行してください。

    python assets/brownian_limit.py --steps 4 16 64 --paths 10000 --seed 20261113
    python -m unittest discover -s assets/tests -v

出力の exact_mean / exact_var は有限刻みの独立2点増分を使った **厳密な理論モーメント**、sample_mean / sample_var は同じ Q_N から擬似乱数を生成した **標本統計量**です。limit_mean / limit_var は刻み幅 0 の理論極限であり、標本誤差と刻み幅誤差は区別してください。N が小さく評価用確率が有効でないときは例外を送出します。乱数のシードを固定し、例示出力を再現可能にしています。価格の期待値の収束を検証したものではありません。
