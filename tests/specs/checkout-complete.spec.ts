import { UseType } from "@fixtures/user-credentials";
import { test, expect } from "@fixtures/test.fixture";
import { EXECUTION_TAGS } from "@fixtures/execution-tags";

import { CartPage } from "@pages/cart.page";
import { InventoryPage } from "@pages/inventory.page";
import { CheckoutStepOnePage } from "@pages/checkout-step-one.page";
import { CheckoutStepTwoPage } from "@pages/checkout-step-two.page";
import { CheckoutCompletePage } from "@pages/checkout-complete.page";

const checkoutCompleteTests = (userType: UseType) => {
  test.describe(`Checkout Complete Tests - ${userType} user`, () => {
    test.use({ userType: userType });

    let checkoutCompletePage: CheckoutCompletePage;

    test.beforeEach(async ({ page, inventoryPage }) => {
      const cartPage = new CartPage(page);
      const checkoutStepOnePage = new CheckoutStepOnePage(page);
      const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
      checkoutCompletePage = new CheckoutCompletePage(page);

      await inventoryPage.addItemToCart("Sauce Labs Backpack");
      await inventoryPage.navigateToCart();
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.fillCheckoutInfo("John", "Doe", "12345");
      await checkoutStepOnePage.continueCheckout();
      await checkoutStepTwoPage.finishCheckout();
      await checkoutCompletePage.waitForPageLoad();
    });

    test(
      "should display complete order elements",
      { tag: [EXECUTION_TAGS.smoke] },
      async () => {
        expect(
          await checkoutCompletePage.isCompleteContainerVisible()
        ).toBeTruthy();
        expect(
          await checkoutCompletePage.isCompleteHeaderVisible()
        ).toBeTruthy();
        expect(await checkoutCompletePage.isCompleteTextVisible()).toBeTruthy();
        expect(
          await checkoutCompletePage.isBackHomeButtonVisible()
        ).toBeTruthy();
        expect(
          await checkoutCompletePage.isPonyExpressImageVisible()
        ).toBeTruthy();
      }
    );

    test(
      "should display correct completion messages",
      { tag: [EXECUTION_TAGS.critical] },
      async () => {
        const header = await checkoutCompletePage.getCompleteHeader();
        const text = await checkoutCompletePage.getCompleteText();

        expect(header).toContain("Thank you");
        expect(text).toContain("Your order has been dispatched");
      }
    );

    test(
      "should navigate back to inventory when back home is clicked",
      { tag: [EXECUTION_TAGS.smoke] },
      async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await checkoutCompletePage.backToProducts();
        await inventoryPage.waitForPageLoad();
        expect(await inventoryPage.isInventoryVisible()).toBeTruthy();
      }
    );

    test(
      "should clear cart after successful order",
      { tag: [EXECUTION_TAGS.smoke] },
      async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await checkoutCompletePage.backToProducts();
        await inventoryPage.waitForPageLoad();

        expect(await inventoryPage.isShoppingCartBadgeVisible()).toBeFalsy();
      }
    );
  });
};

["standard", "performance", "error", "visual", "problem"].forEach(
  (userType) => {
    checkoutCompleteTests(userType);
  }
);
