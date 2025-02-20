import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class AuthenticatedPage extends BasePage {
  protected readonly primaryHeader: Locator;
  protected readonly logo: Locator;
  protected readonly menuButton: Locator;
  protected readonly closeMenuButton: Locator;
  protected readonly shoppingCartBadge: Locator;
  protected readonly shoppingCartLink: Locator;
  protected readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);

    this.primaryHeader = page.locator("div[data-test='primary-header']");
    this.logo = this.primaryHeader.locator("div[class='app_logo']");
    this.menuButton = this.primaryHeader.locator("div[id='menu_button_container']");
    this.closeMenuButton = this.primaryHeader.locator("img[data-test='close-menu']");
    this.logoutButton = this.primaryHeader.locator("button[data-test='logout-sidebar-link']");
    this.shoppingCartLink = this.primaryHeader.locator("a[data-test='shopping-cart-link']");
    this.shoppingCartBadge = this.primaryHeader.locator("span[data-test='shopping-cart-badge']");
  }

  async getCartItemCount(): Promise<string> {
    return this.getElementText(this.shoppingCartBadge);
  }

  async navigateToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async getLogoText(): Promise<string> {
    return this.getElementText(this.logo);
  }

  async clickMenuButton(): Promise<void> {
    await this.menuButton.click();
  }

  async clickLogoutButton(): Promise<void> {
    await this.logoutButton.click();
  }

  async clickCloseMenuButton(): Promise<void> {
    await this.closeMenuButton.click();
  }

  async isLogoutButtonVisible(): Promise<boolean> {
    return this.isElementVisible(this.logoutButton);
  }

  async isMenuButtonVisible(): Promise<boolean> {
    return this.isElementVisible(this.menuButton);
  }

  async isShoppingCartBadgeVisible(): Promise<boolean> {
    return this.isElementVisible(this.shoppingCartBadge);
  }

  async isShoppingCartLinkVisible(): Promise<boolean> {
    return this.isElementVisible(this.shoppingCartLink);
  }

  async isLogoVisible(): Promise<boolean> {
    return this.isElementVisible(this.logo);
  }

  async isPrimaryHeaderVisible(): Promise<boolean> {
    return this.isElementVisible(this.primaryHeader);
  }

  async isCloseMenuButtonVisible(): Promise<boolean> {
    return this.isElementVisible(this.closeMenuButton);
  }
}