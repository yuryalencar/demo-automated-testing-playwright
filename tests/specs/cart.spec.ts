import { UseType } from "@fixtures/user-credentials";
import { test, expect } from "@fixtures/test.fixture";
import { EXECUTION_TAGS } from "@fixtures/execution-tags";

import { CartPage } from "@pages/cart.page";
import { InventoryPage } from "@pages/inventory.page";
import { CheckoutStepOnePage } from "@pages/checkout-step-one.page";

const cartTests = (userType: UseType) => {
  test.describe(`Cart Tests - ${userType} user`, () => {
    test.use({ userType: userType });

    let cartPage: CartPage;

    test.beforeEach(async ({ page, inventoryPage }) => {
      cartPage = new CartPage(page);

      const itemsToAdd = [
        "Sauce Labs Backpack",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt",
      ];

      for (const item of itemsToAdd) {
        await inventoryPage.addItemToCart(item);
      }

      await inventoryPage.navigateToCart();
    });

    test(
      "should display correct number of items in cart",
      { tag: [EXECUTION_TAGS.smoke] },
      async () => {
        const itemCount = await cartPage.getCartPageItemCount();
        expect(itemCount).toBe(3);
      }
    );

    test(
      "should display correct item names",
      { tag: [EXECUTION_TAGS.smoke] },
      async () => {
        const itemNames = await cartPage.getCartItemNames();
        expect(itemNames).toContain("Sauce Labs Backpack");
        expect(itemNames).toContain("Sauce Labs Bike Light");
        expect(itemNames).toContain("Sauce Labs Bolt T-Shirt");
      }
    );

    test(
      "should remove item from cart",
      { tag: [EXECUTION_TAGS.critical] },
      async () => {
        const itemToRemove = "Sauce Labs Backpack";
        await cartPage.removeItem(itemToRemove);

        const itemNames = await cartPage.getCartItemNames();
        expect(itemNames).not.toContain(itemToRemove);

        const itemCount = await cartPage.getCartPageItemCount();
        expect(itemCount).toBe(2);
      }
    );

    test(
      "should navigate to checkout when checkout button clicked",
      { tag: [EXECUTION_TAGS.critical] },
      async ({ page }) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await cartPage.proceedToCheckout();
        await checkoutStepOnePage.waitForPageLoad();
        expect(
          await checkoutStepOnePage.isCheckoutContainerVisible()
        ).toBeTruthy();
      }
    );

    test(
      "should navigate back to inventory when continue shopping clicked",
      { tag: [EXECUTION_TAGS.smoke] },
      async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await cartPage.continueShopping();
        await inventoryPage.waitForPageLoad();
        expect(await inventoryPage.isInventoryVisible()).toBeTruthy();
      }
    );

    test(
      "should persist cart items after page reload",
      { tag: [EXECUTION_TAGS.regression] },
      async ({ page }) => {
        await page.reload();
        await cartPage.waitForPageLoad();

        const itemCount = await cartPage.getCartPageItemCount();
        expect(itemCount).toBe(3);

        const itemNames = await cartPage.getCartItemNames();
        expect(itemNames.length).toBe(3);
      }
    );
  });
};

["standard", "performance", "error", "visual", "problem"].forEach(
  (userType) => {
    cartTests(userType);
  }
);
