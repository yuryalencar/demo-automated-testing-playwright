import { test, expect } from "@fixtures/test.fixture";
import { UseType } from "@fixtures/user-credentials";

const checkoutTests = (userType: UseType) => {
  test.describe(`Checkout Page - ${userType} user`, () => {
    test.use({ userType: userType });

    test("should complete checkout process successfully", async ({ checkoutPage }) => {
      await checkoutPage.fillCheckoutInfo("John", "Doe", "12345");
      await checkoutPage.continueCheckout();

      expect(await checkoutPage.isSummaryContainerVisible()).toBeTruthy();
      const itemNames = await checkoutPage.getCartItemNames();
      expect(itemNames).toContain("Sauce Labs Backpack");

      await checkoutPage.finishCheckout();
    });

    test("should show error with empty required fields", async ({ checkoutPage }) => {
      await checkoutPage.continueCheckout();
      await checkoutPage.continueCheckout();

      expect(await checkoutPage.isErrorVisible()).toBeTruthy();
      expect(await checkoutPage.getErrorMessage()).toContain("Error: First Name is required");
    });

    test("should calculate correct total with tax", async ({ checkoutPage }) => {
      await checkoutPage.fillCheckoutInfo("John", "Doe", "12345");
      await checkoutPage.continueCheckout();

      const itemTotal = await checkoutPage.getItemTotal();
      const tax = await checkoutPage.getTax();
      const total = await checkoutPage.getTotal();

      expect(itemTotal).toBeTruthy();
      expect(tax).toBeTruthy();
      expect(total).toBeTruthy();
      expect(Number(itemTotal) + Number(tax)).toBe(Number(total));
    });
  });
};

["standard", "performance", "error", "visual", "problem"].forEach((userType) => {
  checkoutTests(userType);
});