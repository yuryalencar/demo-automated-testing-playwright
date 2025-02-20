import { Page, Locator } from "@playwright/test";
import { AuthenticatedPage } from "./authenticated.page";

export class CheckoutCompletePage extends AuthenticatedPage {
  private readonly completeContainer: Locator;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly backHomeButton: Locator;
  private readonly ponyExpressImage: Locator;

  constructor(page: Page) {
    super(page);

    this.completeContainer = page.locator("div[data-test='checkout-complete-container']");
    this.completeHeader = page.locator("h2[data-test='complete-header']");
    this.completeText = page.locator("div[data-test='complete-text']");
    this.backHomeButton = page.locator("button[data-test='back-to-products']");
    this.ponyExpressImage = page.locator("img[data-test='pony-express']");
  }

  async navigateToCheckoutComplete(): Promise<void> {
    await this.navigate("/checkout-complete.html");
  }

  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }

  async getCompleteHeader(): Promise<string> {
    return this.getElementText(this.completeHeader);
  }

  async getCompleteText(): Promise<string> {
    return this.getElementText(this.completeText);
  }

  async isCompleteContainerVisible(): Promise<boolean> {
    return this.isElementVisible(this.completeContainer);
  }

  async isCompleteHeaderVisible(): Promise<boolean> {
    return this.isElementVisible(this.completeHeader);
  }

  async isCompleteTextVisible(): Promise<boolean> {
    return this.isElementVisible(this.completeText);
  }

  async isBackHomeButtonVisible(): Promise<boolean> {
    return this.isElementVisible(this.backHomeButton);
  }

  async isPonyExpressImageVisible(): Promise<boolean> {
    return this.isElementVisible(this.ponyExpressImage);
  }
}