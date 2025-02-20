import { Page, Locator } from "@playwright/test";
import { AuthenticatedPage } from "./authenticated.page";

export class InventoryPage extends AuthenticatedPage {
  private readonly invetoryTitle: Locator;

  private readonly sortSelect: Locator;
  private readonly sortByNameOptions: { asc: string, desc: string };
  private readonly sortByPriceOptions: { asc: string, desc: string };

  private readonly inventoryContainer: Locator;
  private readonly inventoryItems: Locator;
  private readonly itemNames: Locator;
  private readonly itemPrices: Locator;
  private readonly itemDescriptions: Locator;

  private readonly removeButtonLocatorTemplate: string;
  private readonly addToCartButtonLocatorTemplate: string;

  constructor(page: Page) {
    super(page);

    this.invetoryTitle = page.locator("span[data-test='title']");

    this.sortSelect = page.locator("select[data-test='product-sort-container']");
    this.sortByNameOptions = { asc: "az", desc: "za" };
    this.sortByPriceOptions = { asc: "lohi", desc: "hilo" };

    this.inventoryContainer = page.locator("div[data-test='inventory-container']");
    this.inventoryItems = page.locator("div[data-test='inventory-item']");
    this.itemNames = page.locator("div[data-test='inventory-item-name']");
    this.itemDescriptions = page.locator("div[data-test='inventory-item-desc']");
    this.itemPrices = page.locator("div[data-test='inventory-item-price']");

    this.removeButtonLocatorTemplate = "button[data-test='remove-XX']";
    this.addToCartButtonLocatorTemplate = "button[data-test='add-to-cart-XX']";
  }

  async navigateToInventory(): Promise<void> {
    await this.navigate("/inventory.html");
  }

  async isInventoryVisible(): Promise<boolean> {
    return this.isElementVisible(this.inventoryContainer);
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async getItemNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.itemNames.count();
    for (let i = 0; i < count; i++) {
      names.push(await this.getElementText(this.itemNames.nth(i)));
    }
    return names;
  }

  async getItemPrices(): Promise<string[]> {
    const prices: string[] = [];
    const count = await this.itemPrices.count();
    for (let i = 0; i < count; i++) {
      prices.push(await this.getElementText(this.itemPrices.nth(i)));
    }
    return prices;
  }

  async getItemDescriptions(): Promise<string[]> {
    const descriptions: string[] = [];
    const count = await this.itemDescriptions.count();
    for (let i = 0; i < count; i++) {
      descriptions.push(await this.getElementText(this.itemDescriptions.nth(i)));
    }
    return descriptions;
  }

  async addItemToCart(name: string): Promise<void> {
    const normalizedName = name.toLowerCase().replace(/ /g, "-");
    const locator = this.page.locator(this.addToCartButtonLocatorTemplate.replace("XX", normalizedName));
    await locator.click();
  }

  async removeItemFromCart(name: string): Promise<void> {
    const normalizedName = name.toLowerCase().replace(/ /g, "-");
    const locator = this.page.locator(this.removeButtonLocatorTemplate.replace("XX", normalizedName));
    await locator.click();
  }

  async sortItemsByName(direction: "asc" | "desc"): Promise<void> {
    await this.sortSelect.selectOption(this.sortByNameOptions[direction]);
  }

  async sortItemsByPrice(direction: "asc" | "desc"): Promise<void> {
    await this.sortSelect.selectOption(this.sortByPriceOptions[direction]);
  }

  async getInventoryTitle(): Promise<string> {
    return this.getElementText(this.invetoryTitle);
  }

  async isRemoveButtonVisible(name: string): Promise<boolean> {
    const normalizedName = name.toLowerCase().replace(/ /g, "-");
    const locator = this.page.locator(this.removeButtonLocatorTemplate.replace("XX", normalizedName));
    return this.isElementVisible(locator);
  }

  async isAddToCartButtonVisible(name: string): Promise<boolean> {
    const normalizedName = name.toLowerCase().replace(/ /g, "-");
    const locator = this.page.locator(this.addToCartButtonLocatorTemplate.replace("XX", normalizedName));
    return this.isElementVisible(locator);
  }
}
