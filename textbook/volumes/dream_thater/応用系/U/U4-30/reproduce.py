#!/usr/bin/env python3
"""U4-30: deterministic, synthetic three-arbitrage audit.

No market connection, no random number generator, no external dependencies.
All money amounts are in JPY and all quantities are single units/shares.
Run: python3 textbook/volumes/dream_thater/応用系/U/U4-30/reproduce.py
"""
from __future__ import annotations

from datetime import datetime, timezone
import hashlib
import json
from math import isclose

DATA = {
    "schema": "u4-30-v1",
    "static": {
        "decision_utc": "2026-01-05T09:00:00+00:00",
        "ask_a": 97.0, "bid_b": 101.0, "fees": 1.5,
        "available_utc": "2026-01-05T08:59:59+00:00",
        "quantity": 1.0, "capacity_a": 1.0, "capacity_b": 1.0,
        "borrow_b": 1.0, "required_collateral": 5.0,
        "free_cash": 10.0, "common_terminal_cash": 100.0,
        "stale_case_executable_bid_b": 96.0,
    },
    "pair": {
        "training_last_available_utc": "2025-12-29T18:00:00+00:00",
        "holdout_first_available_utc": "2026-01-06T18:00:00+00:00",
        "holdout_last_available_utc": "2026-01-07T18:00:00+00:00",
        "x_train": [100, 101, 102, 103, 104, 105, 106, 107],
        "y_train": [102, 100, 104, 102, 106, 104, 108, 106],
        "x_holdout": [108, 109],
        "y_holdout": [110, 115],
        "threshold": 2.0, "holding_period_observations": 1,
        "shares_each": 1.0, "half_spread_each_execution": 0.5,
        "borrow_capacity_y": 1.0,
    },
    "event": {
        "decision_utc": "2026-01-05T09:00:00+00:00",
        "buy_ask": 91.0, "success_cash": 100.0,
        "failure_cash": 50.0, "other_cost": 1.0,
        "assumed_success_probability": 0.9,
        "loss_budget": 30.0, "available_cash": 100.0,
    },
}

def time_utc(s: str) -> datetime:
    d = datetime.fromisoformat(s)
    if d.tzinfo is None or d.utcoffset() != timezone.utc.utcoffset(d):
        raise ValueError("timestamps must have an explicit UTC offset")
    return d

def static_trade(bid_b: float, borrow_b: float) -> tuple[float, bool]:
    s = DATA["static"]
    assert time_utc(s["available_utc"]) <= time_utc(s["decision_utc"])
    q = s["quantity"]
    feasible = (
        s["capacity_a"] >= q
        and s["capacity_b"] >= q
        and borrow_b >= q
        and s["free_cash"] >= s["required_collateral"]
    )
    initial_gain = q * (bid_b - s["ask_a"]) - s["fees"]
    # Long A and short B cancel in every terminal state.
    terminal_gain = initial_gain + q * (
        s["common_terminal_cash"] - s["common_terminal_cash"]
    )
    assert isclose(initial_gain, terminal_gain)
    return terminal_gain, feasible

def pair_pnl(s0: float, s1: float, half_spread: float) -> float:
    # Two legs at entry and two legs at exit: 4 * half_spread.
    return s0 - s1 - 4.0 * half_spread

def pair_audit() -> tuple[float, float, float]:
    p = DATA["pair"]
    assert time_utc(p["training_last_available_utc"]) < time_utc(
        p["holdout_first_available_utc"]
    ) < time_utc(p["holdout_last_available_utc"])
    assert p["borrow_capacity_y"] >= p["shares_each"] == 1.0
    train = [y - x for x, y in zip(p["x_train"], p["y_train"])]
    holdout = [y - x for x, y in zip(p["x_holdout"], p["y_holdout"])]
    assert train == [2, -1, 2, -1, 2, -1, 2, -1]
    assert holdout == [2, 6]
    h = p["half_spread_each_execution"]
    train_gains = []
    for i in range(0, len(train), 2):
        if train[i] >= p["threshold"]:
            train_gains.append(pair_pnl(train[i], train[i + 1], h))
    holdout_gain = pair_pnl(holdout[0], holdout[1], h)
    return sum(train_gains), holdout_gain, sum(train_gains) + holdout_gain

def event_audit() -> tuple[float, float, float, float, bool]:
    e = DATA["event"]
    assert e["available_cash"] >= e["buy_ask"] + e["other_cost"]
    success = e["success_cash"] - e["buy_ask"] - e["other_cost"]
    failure = e["failure_cash"] - e["buy_ask"] - e["other_cost"]
    p = e["assumed_success_probability"]
    expected = p * success + (1.0 - p) * failure
    break_even = -failure / (success - failure)
    budget_pass = max(0.0, -success, -failure) <= e["loss_budget"]
    return success, failure, expected, break_even, budget_pass

def main() -> None:
    canonical = json.dumps(
        DATA, ensure_ascii=False, sort_keys=True, separators=(",", ":")
    ).encode("utf-8")
    digest = hashlib.sha256(canonical).hexdigest()
    s = DATA["static"]
    static_gain, static_feasible = static_trade(s["bid_b"], s["borrow_b"])
    stale_gain, _ = static_trade(s["stale_case_executable_bid_b"], s["borrow_b"])
    _, no_borrow_feasible = static_trade(s["bid_b"], 0.0)
    train, holdout, all_gains = pair_audit()
    success, failure, expected, break_even, budget_pass = event_audit()
    assert isclose(static_gain, 2.5) and static_feasible
    assert isclose(stale_gain, -2.5) and not no_borrow_feasible
    assert (train, holdout, all_gains) == (4.0, -6.0, -2.0)
    assert (success, failure, expected) == (8.0, -42.0, 3.0)
    assert isclose(break_even, 0.84) and not budget_pass
    print(f"data_sha256={digest}")
    print(f"static_gain={static_gain:.2f}, static_feasible={static_feasible}")
    print(
        f"static_stale_gain={stale_gain:.2f}, "
        f"static_no_borrow_feasible={no_borrow_feasible}"
    )
    print(
        f"pair_train_total={train:.2f}, pair_holdout={holdout:.2f}, "
        f"pair_all_total={all_gains:.2f}"
    )
    print(f"event_success={success:.2f}, event_failure={failure:.2f}")
    print(
        f"event_expected={expected:.2f}, event_break_even={break_even:.4f}, "
        f"event_budget_pass={budget_pass}"
    )

if __name__ == "__main__":
    main()
