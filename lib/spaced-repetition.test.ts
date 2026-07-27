import { describe, it, expect, beforeEach } from "vitest";
import {
  reviewItem,
  previewReview,
  getDueItems,
  getSRSStats,
  getSRSCard,
  saveSRSCards,
  type SRSItem,
  type SRSRating,
  type SRSCard,
} from "./spaced-repetition";
import { type SRSSettings } from "./srs-settings";

describe("spaced-repetition", () => {
  const settings: SRSSettings = {
    newCardsPerDay: 20,
    reviewLimit: 100,
    startingEase: 2.5,
    easyBonus: 1.3,
    maxInterval: 3650,
  };

  beforeEach(() => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  });

  function newItem(id = "1"): SRSItem {
    return {
      id,
      type: "fachwort",
      front: "Hallo",
      back: "Hello",
    };
  }

  it("new item becomes due again soon on 'again' rating", () => {
    const item = newItem();
    reviewItem(item.id, 1 as SRSRating, settings);
    const updated = getSRSCard(item.id)!;
    expect(updated.interval).toBe(1);
    expect(updated.repetition).toBe(0);
    expect(updated.ease).toBe(settings.startingEase);
  });

  it("'good' advances repetition and interval", () => {
    const item = newItem();
    reviewItem(item.id, 3 as SRSRating, settings);
    const updated = getSRSCard(item.id)!;
    expect(updated.repetition).toBe(1);
    expect(updated.interval).toBeGreaterThanOrEqual(1);
  });

  it("preview does not mutate storage", () => {
    const item = newItem();
    previewReview(undefined, 4 as SRSRating, settings);
    const due = getDueItems([item], settings);
    expect(due).toHaveLength(1);
  });

  it("getDueItems returns only items due today or earlier", () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    const due = newItem("due");
    const notDue = newItem("not-due");
    const notDueCard: SRSCard = {
      itemId: "not-due",
      interval: 1,
      repetition: 1,
      ease: 2.5,
      dueDate: tomorrow,
    };
    saveSRSCards({ "not-due": notDueCard });

    expect(getDueItems([due, notDue], settings)).toHaveLength(1);
  });

  it("getSRSStats counts new and due items", () => {
    const future = "2099-01-01";

    const newCard = newItem("a");
    const reviewedCard = newItem("b");
    const reviewed: SRSCard = {
      itemId: "b",
      interval: 10,
      repetition: 2,
      ease: 2.5,
      dueDate: future,
    };
    saveSRSCards({ b: reviewed });

    const stats = getSRSStats([newCard, reviewedCard], settings);
    expect(stats.due).toBe(1);
    expect(stats.newCards).toBe(1);
    expect(stats.learned).toBe(1);
  });
});
