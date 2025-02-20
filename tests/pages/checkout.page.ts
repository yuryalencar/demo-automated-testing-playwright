import { Page, Locator } from "@playwright/test";
import { AuthenticatedPage } from "./authenticated.page";

export class CheckoutPage extends AuthenticatedPage {
  private readonly checkoutContainer: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;

  private readonly summaryContainer: Locator;
  private readonly finishButton: Locator;
  private readonly itemTotal: Locator;
  private readonly tax: Locator;
  private readonly total: Locator;
  private readonly cartItems: Locator;
  private readonly itemNames: Locator;
  private readonly itemPrices: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutContainer = page.locator("div[data-test='checkout-container']");
    this.firstNameInput = page.locator("input[data-test='firstName']");
    this.lastNameInput = page.locator("input[data-test='lastName']");
    this.postalCodeInput = page.locator("input[data-test='postalCode']");
    this.continueButton = page.locator("input[data-test='continue']");
    this.cancelButton = page.locator("button[data-test='cancel']");
    this.errorMessage = page.locator("h3[data-test='error']");

    this.summaryContainer = page.locator("div[data-test='summary-container']");
    this.finishButton = page.locator("button[data-test='finish']");
    this.itemTotal = page.locator("div[data-test='subtotal']");
    this.tax = page.locator("div[data-test='tax']");
    this.total = page.locator("div[data-test='total']");
    this.cartItems = page.locator("div[data-test='cart-item']");
    this.itemNames = page.locator("div[data-test='item-name']");
    this.itemPrices = page.locator("div[data-test='item-price']");
  }

  async navigateToCheckout(): Promise<void> {
    await this.navigate("/checkout-step-one.html");
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.getElementText(this.errorMessage);
  }

  async getItemTotal(): Promise<string> {
    return this.getElementText(this.itemTotal);
  }

  async getTax(): Promise<string> {
    return this.getElementText(this.tax);
  }

  async getTotal(): Promise<string> {
    return this.getElementText(this.total);
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

  async isErrorVisible(): Promise<boolean> {
    return this.isElementVisible(this.errorMessage);
  }

  async isCheckoutContainerVisible(): Promise<boolean> {
    return this.isElementVisible(this.checkoutContainer);
  }

  async isSummaryContainerVisible(): Promise<boolean> {
    return this.isElementVisible(this.summaryContainer);
  }
}
