import { UseType } from "@fixtures/user-credentials";
import { test, expect } from "@fixtures/test.fixture";

import { CartPage } from "@pages/cart.page";
import { InventoryPage } from "@pages/inventory.page";
import { CheckoutStepOnePage } from "@pages/checkout-step-one.page";
import { CheckoutStepTwoPage } from "@pages/checkout-step-two.page";
import { CheckoutCompletePage } from "@pages/checkout-complete.page";

const checkoutStepTwoTests = (userType: UseType) => {
  test.describe(`Checkout Step Two Tests - ${userType} user`, () => {
    test.use({ userType: userType });

    let checkoutStepTwoPage: CheckoutStepTwoPage;

    test.beforeEach(async ({ page, inventoryPage }) => {
      const cartPage = new CartPage(page);
      const checkoutStepOnePage = new CheckoutStepOnePage(page);
      checkoutStepTwoPage = new CheckoutStepTwoPage(page);

      await inventoryPage.addItemToCart("Sauce Labs Backpack");
      await inventoryPage.addItemToCart("Sauce Labs Bike Light");
      await inventoryPage.navigateToCart();
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.fillCheckoutInfo("John", "Doe", "12345");
      await checkoutStepOnePage.continueCheckout();
      await checkoutStepTwoPage.waitForPageLoad();
    });

    test("should display order summary elements", async () => {
      expect(await checkoutStepTwoPage.isSummaryContainerVisible()).toBeTruthy();
      expect(await checkoutStepTwoPage.isFinishButtonVisible()).toBeTruthy();
      expect(await checkoutStepTwoPage.isCancelButtonVisible()).toBeTruthy();
    });

    test("should display correct items in summary", async () => {
      const itemNames = await checkoutStepTwoPage.getCartItemNames();
      expect(itemNames).toContain("Sauce Labs Backpack");
      expect(itemNames).toContain("Sauce Labs Bike Light");
      expect(itemNames.length).toBe(2);
    });

    test("should calculate correct totals", async () => {
      const subtotal = await checkoutStepTwoPage.getSubtotal();
      const tax = await checkoutStepTwoPage.getTax();
      const total = await checkoutStepTwoPage.getTotal();

      const subtotalValue = Number(subtotal.replace(/[^0-9.-]+/g, ""));
      const taxValue = Number(tax.replace(/[^0-9.-]+/g, ""));
      const totalValue = Number(total.replace(/[^0-9.-]+/g, ""));

      expect(totalValue).toBeCloseTo(subtotalValue + taxValue, 2);
    });

    test("should complete order when finish button clicked", async ({ page }) => {
      const checkoutCompletePage = new CheckoutCompletePage(page);
      await checkoutStepTwoPage.finishCheckout();
      await checkoutCompletePage.waitForPageLoad();
      expect(await checkoutCompletePage.isCompleteContainerVisible()).toBeTruthy();
    });

    test("should return to inventory when cancel is clicked", async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      await checkoutStepTwoPage.cancelCheckout();
      await inventoryPage.waitForPageLoad();
      expect(await inventoryPage.isInventoryVisible()).toBeTruthy();
    });

    test("should persist items after page reload", async ({ page }) => {
      await page.reload();
      await checkoutStepTwoPage.waitForPageLoad();

      const itemCount = await checkoutStepTwoPage.getCartItemCount();
      expect(Number(itemCount)).toBe(2);

      const itemNames = await checkoutStepTwoPage.getCartItemNames();
      expect(itemNames.length).toBe(2);
    });
  });
};

["standard", "performance", "error", "visual", "problem"].forEach((userType) => {
  checkoutStepTwoTests(userType);
});