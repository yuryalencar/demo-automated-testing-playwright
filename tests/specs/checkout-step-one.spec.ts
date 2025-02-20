import { UseType } from "@fixtures/user-credentials";
import { test, expect } from "@fixtures/test.fixture";
import { CHECKOUT_STEP_ONE_MESSAGES } from "@fixtures/checkout-step-one-messages";

import { CartPage } from "@pages/cart.page";
import { CheckoutStepOnePage } from "@pages/checkout-step-one.page";

const checkoutStepOneTests = (userType: UseType) => {
  test.describe(`Checkout Step One Tests - ${userType} user`, () => {
    test.use({ userType: userType });

    let checkoutStepOnePage: CheckoutStepOnePage;

    test.beforeEach(async ({ page, inventoryPage }) => {
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      const cartPage = new CartPage(page);

      await inventoryPage.addItemToCart("Sauce Labs Backpack");
      await inventoryPage.navigateToCart();
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.waitForPageLoad();
    });

    test("should display checkout form elements", async () => {
      expect(await checkoutStepOnePage.isCheckoutContainerVisible()).toBeTruthy();
      expect(await checkoutStepOnePage.isFirstNameInputVisible()).toBeTruthy();
      expect(await checkoutStepOnePage.isLastNameInputVisible()).toBeTruthy();
      expect(await checkoutStepOnePage.isPostalCodeInputVisible()).toBeTruthy();
      expect(await checkoutStepOnePage.isContinueButtonVisible()).toBeTruthy();
      expect(await checkoutStepOnePage.isCancelButtonVisible()).toBeTruthy();
    });

    // test("should proceed to checkout step two with valid information", async () => {
    //   await checkoutStepOnePage.fillCheckoutInfo("John", "Doe", "12345");
    //   await checkoutStepOnePage.continueCheckout();

    //   expect(await checkoutStepOnePage.page.url()).toContain("/checkout-step-two.html");
    // });

    test("should show error when first name is missing", async () => {
      await checkoutStepOnePage.fillCheckoutInfo("", "Doe", "12345");
      await checkoutStepOnePage.continueCheckout();

      expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy();
      expect(await checkoutStepOnePage.getErrorMessage()).toContain(CHECKOUT_STEP_ONE_MESSAGES.firstNameRequired);
    });

    test("should show error when last name is missing", async () => {
      await checkoutStepOnePage.fillCheckoutInfo("John", "", "12345");
      await checkoutStepOnePage.continueCheckout();

      expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy();
      expect(await checkoutStepOnePage.getErrorMessage()).toContain(CHECKOUT_STEP_ONE_MESSAGES.lastNameRequired);
    });

    test("should show error when postal code is missing", async () => {
      await checkoutStepOnePage.fillCheckoutInfo("John", "Doe", "");
      await checkoutStepOnePage.continueCheckout();

      expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy();
      expect(await checkoutStepOnePage.getErrorMessage()).toContain(CHECKOUT_STEP_ONE_MESSAGES.postalCodeRequired);
    });

    test("should return to cart when cancel is clicked", async ({ page }) => {
      const cartPage = new CartPage(page);
      await checkoutStepOnePage.cancelCheckout();
      await cartPage.waitForPageLoad();
      expect(await cartPage.isCartContainerVisible()).toBeTruthy();
    });
  });
};

["standard", "performance", "error", "visual", "problem"].forEach((userType) => {
  checkoutStepOneTests(userType);
});