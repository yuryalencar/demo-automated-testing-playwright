import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

interface LoginCredentials {
  username: string;
  password: string;
}

export class LoginPage extends BasePage {
  private readonly loginContainer: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.loginContainer = page.locator("div[data-test='login-container']");
    this.usernameInput = this.loginContainer.locator("input[data-test='username']");
    this.passwordInput = this.loginContainer.locator("input[data-test='password']");
    this.loginButton = this.loginContainer.locator("input[data-test='login-button']");
    this.errorMessage = this.loginContainer.locator("h3[data-test='error']");
  }

  async login({ username, password }: LoginCredentials): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async navigateToLogin(): Promise<void> {
    await this.navigate("/");
  }

  async getErrorMessage(): Promise<string> {
    return this.getElementText(this.errorMessage);
  }

  async isErrorVisible(): Promise<boolean> {
    return this.isElementVisible(this.errorMessage);
  }
}
