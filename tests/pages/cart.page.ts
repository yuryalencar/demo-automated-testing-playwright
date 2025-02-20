import { Page, Locator } from "@playwright/test";
import { AuthenticatedPage } from "./authenticated.page";

export class CartPage extends AuthenticatedPage {
  private readonly cartContainer: Locator;
  private readonly cartItems: Locator;
  private readonly itemNames: Locator;
  private readonly itemDescriptions: Locator;
  private readonly itemPrices: Locator;
  private readonly itemQuantities: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly removeButtonLocatorTemplate: string;

  constructor(page: Page) {
    super(page);

    this.cartContainer = page.locator("div[data-test='cart-contents-container']");
    this.cartItems = page.locator("div[data-test='inventory-item']");
    this.itemNames = page.locator("div[data-test='inventory-item-name']");
    this.itemDescriptions = page.locator("div[data-test='inventory-item-desc']");
    this.itemPrices = page.locator("div[data-test='inventory-item-price']");
    this.itemQuantities = page.locator("div[data-test='item-quantity']");
    this.checkoutButton = page.locator("button[data-test='checkout']");
    this.continueShoppingButton = page.locator("button[data-test='continue-shopping']");
    this.removeButtonLocatorTemplate = "button[data-test='remove-XX']";
  }

  async navigateToCart(): Promise<void> {
    await this.navigate("/cart.html");
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async removeItem(name: string): Promise<void> {
    const normalizedName = name.toLowerCase().replace(/ /g, "-");
    const locator = this.page.locator(this.removeButtonLocatorTemplate.replace("XX", normalizedName));
    await locator.click();
  }

  async getCartPageItemCount(): Promise<number> {
    return await this.cartItems.count();
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

  async getCartItemQuantities(): Promise<string[]> {
    const quantities: string[] = [];
    const count = await this.itemQuantities.count();
    for (let i = 0; i < count; i++) {
      quantities.push(await this.getElementText(this.itemQuantities.nth(i)));
    }
    return quantities;
  }

  async isCartEmpty(): Promise<boolean> {
    return (await this.getCartPageItemCount()) === 0;
  }

  async isCartContainerVisible(): Promise<boolean> {
    return this.isElementVisible(this.cartContainer);
  }

  async isCheckoutButtonVisible(): Promise<boolean> {
    return this.isElementVisible(this.checkoutButton);
  }

  async isContinueShoppingButtonVisible(): Promise<boolean> {
    return this.isElementVisible(this.continueShoppingButton);
  }
}
