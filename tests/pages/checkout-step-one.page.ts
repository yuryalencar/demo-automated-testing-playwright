import { Page, Locator } from "@playwright/test";
import { AuthenticatedPage } from "./authenticated.page";

export class CheckoutStepOnePage extends AuthenticatedPage {
  private readonly checkoutContainer: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutContainer = page.locator("div[data-test='checkout-info-container']");
    this.firstNameInput = page.locator("input[data-test='firstName']");
    this.lastNameInput = page.locator("input[data-test='lastName']");
    this.postalCodeInput = page.locator("input[data-test='postalCode']");
    this.continueButton = page.locator("input[data-test='continue']");
    this.cancelButton = page.locator("button[data-test='cancel']");
    this.errorMessage = page.locator("h3[data-test='error']");
  }

  async navigateToCheckoutStepOne(): Promise<void> {
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

  async getErrorMessage(): Promise<string> {
    return this.getElementText(this.errorMessage);
  }

  async isErrorVisible(): Promise<boolean> {
    return this.isElementVisible(this.errorMessage);
  }

  async isCheckoutContainerVisible(): Promise<boolean> {
    return this.isElementVisible(this.checkoutContainer);
  }

  async isFirstNameInputVisible(): Promise<boolean> {
    return this.isElementVisible(this.firstNameInput);
  }

  async isLastNameInputVisible(): Promise<boolean> {
    return this.isElementVisible(this.lastNameInput);
  }

  async isPostalCodeInputVisible(): Promise<boolean> {
    return this.isElementVisible(this.postalCodeInput);
  }

  async isContinueButtonVisible(): Promise<boolean> {
    return this.isElementVisible(this.continueButton);
  }

  async isCancelButtonVisible(): Promise<boolean> {
    return this.isElementVisible(this.cancelButton);
  }
}