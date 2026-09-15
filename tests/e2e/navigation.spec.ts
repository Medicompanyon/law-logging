import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: "개인정보 처리방침" },
  { path: "/documents", heading: "내 개인정보 처리방침" },
  { path: "/mypage", heading: "마이페이지" },
];

for (const pageCase of pages) {
  test(`${pageCase.path} renders without horizontal overflow`, async ({ page }) => {
    await page.goto(pageCase.path);

    await expect(page.getByRole("heading", { level: 1, name: pageCase.heading })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "주요 메뉴" })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});
