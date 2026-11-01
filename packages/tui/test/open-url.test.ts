import { expect, test } from "bun:test";
import { openUrl } from "../src/open-url";

test("openUrl reports a missing opener instead of crashing", async () => {
	const notices: string[] = [];
	expect(() =>
		openUrl("https://example.com", (m) => notices.push(m), "serenity-not-an-opener"),
	).not.toThrow();
	await new Promise((resolve) => setTimeout(resolve, 250));
	expect(notices.length).toBe(1);
	expect(notices[0]).toContain("couldn't open the link");
});

test("openUrl stays silent when no error callback is given", async () => {
	expect(() =>
		openUrl("https://example.com", undefined, "serenity-not-an-opener"),
	).not.toThrow();
	await new Promise((resolve) => setTimeout(resolve, 250));
});
