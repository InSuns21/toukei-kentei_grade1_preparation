"""Deterministic order-book fills and execution-shortfall accounting (U3-59).

All prices and fees use decimal arithmetic; synthetic data only.
"""
from __future__ import annotations

import argparse
from decimal import Decimal


def book_snapshot():
    """Price priority: bids descending, asks ascending; (price, shares)."""
    return {
        "bids": [(Decimal("99.9"), 60), (Decimal("99.8"), 100)],
        "asks": [(Decimal("100.1"), 40), (Decimal("100.2"), 100)],
    }


def validate_book(book):
    bids, asks = book["bids"], book["asks"]
    if not bids or not asks:
        raise ValueError("both sides of book must be nonempty")
    for levels in (bids, asks):
        if any(price <= 0 or type(quantity) is not int or quantity <= 0
               for price, quantity in levels):
            raise ValueError("prices and quantities must be positive")
    if any(bids[i][0] <= bids[i + 1][0] for i in range(len(bids) - 1)):
        raise ValueError("bids must be strictly descending")
    if any(asks[i][0] >= asks[i + 1][0] for i in range(len(asks) - 1)):
        raise ValueError("asks must be strictly ascending")
    if bids[0][0] >= asks[0][0]:
        raise ValueError("book must have strictly positive spread")


def sweep(side="buy", quantity=70, terminal_mid=Decimal("100"),
          fee_per_share=Decimal("0.02"), book=None):
    """Return exact fills, inventory/cash ledger, and shortfall components.

    Remaining shares are only MARKED at terminal mid; not added to actual cash.
    """
    if book is None:
        book = book_snapshot()
    validate_book(book)
    if side not in ("buy", "sell"):
        raise ValueError("side must be buy or sell")
    if type(quantity) is not int or quantity <= 0:
        raise ValueError("quantity must be a positive integer")
    terminal_mid = Decimal(terminal_mid)
    fee_per_share = Decimal(fee_per_share)
    if not terminal_mid.is_finite() or terminal_mid <= 0:
        raise ValueError("terminal midpoint must be positive and finite")
    if not fee_per_share.is_finite() or fee_per_share < 0:
        raise ValueError("fee must be nonnegative and finite")

    sign = 1 if side == "buy" else -1
    bid, ask = book["bids"][0][0], book["asks"][0][0]
    middle, half_spread = (bid + ask) / 2, (ask - bid) / 2
    remaining = quantity
    fills = []
    for price, available in book["asks" if side == "buy" else "bids"]:
        taken = min(remaining, available)
        if taken:
            fills.append((price, taken))
            remaining -= taken
        if remaining == 0:
            break

    filled = quantity - remaining
    notional = sum((price * shares for price, shares in fills), Decimal(0))
    fee = fee_per_share * filled
    avg_price = notional / filled if filled else None
    inventory_change = sign * filled
    cash_change = -sign * notional - fee
    reference_cash = -sign * Decimal(quantity) * middle
    residual_mark_cash = -sign * Decimal(remaining) * terminal_mid

    spread_cost = Decimal(filled) * half_spread
    depth_cost = sum((Decimal(shares) *
                      (sign * (price - middle) - half_spread)
                      for price, shares in fills), Decimal(0))
    opportunity_cost = sign * Decimal(remaining) * (terminal_mid - middle)
    shortfall = sign * (notional + Decimal(remaining) * terminal_mid
                        - Decimal(quantity) * middle) + fee
    assert depth_cost >= 0
    assert shortfall == spread_cost + depth_cost + opportunity_cost + fee
    assert shortfall == reference_cash - (cash_change + residual_mark_cash)
    return {
        "side": side, "quantity": quantity, "fills": fills,
        "filled": filled, "remaining": remaining, "notional": notional,
        "average_price": avg_price, "arrival_mid": middle,
        "half_spread": half_spread, "fee": fee, "inventory": inventory_change,
        "cash": cash_change, "reference_cash": reference_cash,
        "residual_mark_cash": residual_mark_cash, "spread_cost": spread_cost,
        "depth_cost": depth_cost, "opportunity_cost": opportunity_cost,
        "shortfall": shortfall,
    }


def main():
    parser = argparse.ArgumentParser(description="U3-59 synthetic order book")
    parser.add_argument("--side", choices=["buy", "sell"], default="buy")
    parser.add_argument("--quantity", type=int, default=70)
    parser.add_argument("--terminal-mid", default="100")
    parser.add_argument("--fee-per-share", default="0.02")
    args = parser.parse_args()
    result = sweep(args.side, args.quantity, Decimal(args.terminal_mid),
                   Decimal(args.fee_per_share))
    print("All amounts in JPY; prices JPY/share; quantity in shares")
    print(f"side={result['side']} parent={result['quantity']} "
          f"filled={result['filled']} remaining={result['remaining']}")
    for price, shares in result["fills"]:
        print(f"fill {shares} @ {price} JPY/share")
    for key in ("notional", "average_price", "cash", "inventory", "fee",
                "spread_cost", "depth_cost", "opportunity_cost", "shortfall"):
        print(f"{key}={result[key]}")
    print("CHECK shortfall = spread + depth + opportunity + fee")
    print("CHECK shortfall = reference_cash - cash - residual_mark_cash")


if __name__ == "__main__":
    main()
