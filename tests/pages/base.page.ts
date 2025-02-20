import { Page, Locator } from "@playwright/test";

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  async navigate(path: string): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}${path}`);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  protected async getElementText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || "";
  }

  protected async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }
}
