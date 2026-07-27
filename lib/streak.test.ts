import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { calculateStreak } from "./streak";

describe("calculateStreak", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function setToday(iso: string) {
    const fakeDate = new Date(iso);
    vi.setSystemTime(fakeDate);
  }

  it("returns 0 for empty set", () => {
    expect(calculateStreak(new Set())).toBe(0);
  });

  it("returns 0 when neither today nor yesterday has activity", () => {
    setToday("2024-06-15");
    expect(calculateStreak(new Set(["2024-06-13"]))).toBe(0);
  });

  it("counts today as streak 1", () => {
    setToday("2024-06-15");
    expect(calculateStreak(new Set(["2024-06-15"]))).toBe(1);
  });

  it("counts consecutive days including today", () => {
    setToday("2024-06-15");
    expect(
      calculateStreak(new Set(["2024-06-15", "2024-06-14", "2024-06-13"]))
    ).toBe(3);
  });

  it("counts yesterday when today is missing", () => {
    setToday("2024-06-15");
    expect(calculateStreak(new Set(["2024-06-14", "2024-06-13"]))).toBe(2);
  });

  it("stops at first missing day", () => {
    setToday("2024-06-15");
    expect(
      calculateStreak(
        new Set(["2024-06-15", "2024-06-14", "2024-06-12", "2024-06-11"])
      )
    ).toBe(2);
  });
});
