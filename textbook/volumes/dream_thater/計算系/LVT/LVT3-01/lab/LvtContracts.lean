import Lean

namespace LvtContracts

structure Order where
  stock : Nat
  qty : Nat

def Satisfies {α β : Type} (p : α → Prop)
    (q : α → β → Prop) (f : α → β) : Prop :=
  ∀ x, p x → q x (f x)

def orderPre (o : Order) : Prop := 0 < o.qty

def orderPost (o : Order) (result : Option Nat) : Prop :=
  match result with
  | some rest => o.qty ≤ o.stock ∧ rest + o.qty = o.stock
  | none => o.stock < o.qty

def takeStock (o : Order) : Option Nat :=
  if 0 < o.qty then
    if o.qty ≤ o.stock then some (o.stock - o.qty) else none
  else none

theorem takeCorrect : Satisfies orderPre orderPost takeStock := by
  intro o hp
  change 0 < o.qty at hp
  by_cases h : o.qty ≤ o.stock
  · simp only [takeStock, if_pos hp, if_pos h, orderPost]
    exact ⟨h, by omega⟩
  · simp only [takeStock, if_pos hp, if_neg h, orderPost]
    omega

theorem rejectZero (stock : Nat) :
    takeStock ⟨stock, 0⟩ = none := by
  simp [takeStock]

def weakPost (o : Order) (result : Option Nat) : Prop :=
  match result with
  | some rest => rest ≤ o.stock
  | none => True

def rejectAll (_ : Order) : Option Nat := none

theorem weakAllowsReject : Satisfies orderPre weakPost rejectAll := by
  intro o hp
  exact True.intro

theorem rejectNotCorrect : ¬ Satisfies orderPre orderPost rejectAll := by
  intro h
  have hp : orderPre ⟨5, 2⟩ := by
    change 0 < (2 : Nat)
    decide
  have bad := h ⟨5, 2⟩ hp
  change (5 : Nat) < 2 at bad
  omega

def mustSucceed (o : Order) (result : Option Nat) : Prop :=
  ∃ rest : Nat, result = some rest ∧ rest + o.qty = o.stock

theorem impossible (f : Order → Option Nat) :
    ¬ Satisfies orderPre mustSucceed f := by
  intro h
  have hp : orderPre ⟨1, 2⟩ := by
    change 0 < (2 : Nat)
    decide
  obtain ⟨rest, _, hr⟩ := h ⟨1, 2⟩ hp
  change rest + 2 = 1 at hr
  omega

theorem uniqueOnValid (f g : Order → Option Nat)
    (hf : Satisfies orderPre orderPost f)
    (hg : Satisfies orderPre orderPost g)
    (o : Order) (hp : orderPre o) : f o = g o := by
  have hqf := hf o hp
  have hqg := hg o hp
  cases h1 : f o with
  | none =>
    have hn : o.stock < o.qty := by
      simpa only [h1, orderPost] using hqf
    cases h2 : g o with
    | none => rfl
    | some b =>
      have hb : o.qty ≤ o.stock ∧ b + o.qty = o.stock := by
        simpa only [h2, orderPost] using hqg
      have hh := hb.1
      omega
  | some a =>
    have ha : o.qty ≤ o.stock ∧ a + o.qty = o.stock := by
      simpa only [h1, orderPost] using hqf
    cases h2 : g o with
    | none =>
      have hn : o.stock < o.qty := by
        simpa only [h2, orderPost] using hqg
      have hh := ha.1
      omega
    | some b =>
      have hb : o.qty ≤ o.stock ∧ b + o.qty = o.stock := by
        simpa only [h2, orderPost] using hqg
      have ea := ha.2
      have eb := hb.2
      have e : a = b := by omega
      exact congrArg some e

end LvtContracts
