import { Page, Locator } from "@playwright/test";
import { AuthenticatedPage } from "./authenticated.page";

export class CheckoutStepTwoPage extends AuthenticatedPage {
  private readonly summaryContainer: Locator;
  private readonly cartItems: Locator;
  private readonly itemNames: Locator;
  private readonly itemDescriptions: Locator;
  private readonly itemPrices: Locator;
  private readonly itemQuantities: Locator;
  private readonly subtotal: Locator;
  private readonly tax: Locator;
  private readonly total: Locator;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);

    this.summaryContainer = page.locator("div[data-test='checkout-summary-container']");
    this.cartItems = page.locator("div[data-test='inventory-item']");
    this.itemNames = page.locator("div[data-test='inventory-item-name']");
    this.itemDescriptions = page.locator("div[data-test='inventory-item-desc']");
    this.itemPrices = page.locator("div[data-test='inventory-item-price']");
    this.itemQuantities = page.locator("div[data-test='item-quantity']");
    this.subtotal = page.locator("div[data-test='subtotal-label']");
    this.tax = page.locator("div[data-test='tax-label']");
    this.total = page.locator("div[data-test='total-label']");
    this.finishButton = page.locator("button[data-test='finish']");
    this.cancelButton = page.locator("button[data-test='cancel']");
  }

  async navigateToCheckoutStepTwo(): Promise<void> {
    await this.navigate("/checkout-step-two.html");
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  async getCartItemNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.itemNames.count();
    for (let i = 0; i < count; i++) {
      names.push(await this.getElementText(this.itemNames.nth(i)));
    }
    return names;
  }

  async getCartItemPrices(): Promise<string[]> {
    const prices: string[] = [];
    const count = await this.itemPrices.count();
    for (let i = 0; i < count; i++) {
      prices.push(await this.getElementText(this.itemPrices.nth(i)));
    }
    return prices;
  }

  async getSubtotal(): Promise<string> {
    return this.getElementText(this.subtotal);
  }

  async getTax(): Promise<string> {
    return this.getElementText(this.tax);
  }

  async getTotal(): Promise<string> {
    return this.getElementText(this.total);
  }

  async isSummaryContainerVisible(): Promise<boolean> {
    return this.isElementVisible(this.summaryContainer);
  }

  async isFinishButtonVisible(): Promise<boolean> {
    return this.isElementVisible(this.finishButton);
  }

  async isCancelButtonVisible(): Promise<boolean> {
    return this.isElementVisible(this.cancelButton);
  }

  async getCartCheckoutPageTwoItemCount(): Promise<number> {
    return await this.cartItems.count();
  }
}