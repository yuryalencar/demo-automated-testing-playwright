import { UseType } from "@fixtures/user-credentials";
import { test, expect } from "@fixtures/test.fixture";
import { EXECUTION_TAGS } from "@fixtures/execution-tags";

import { CartPage } from "@pages/cart.page";

const invetoryTests = (userType: UseType) => {
  test.describe(`Inventory Tests - ${userType} user`, () => {
    test.use({ userType: userType });

    test(
      "should display correct page title",
      { tag: [EXECUTION_TAGS.regression] },
      async ({ inventoryPage }) => {
        const title = await inventoryPage.getInventoryTitle();
        expect(title).toBe("Products");
      }
    );

    test(
      "should sort products by price low to high",
      { tag: [EXECUTION_TAGS.regression] },
      async ({ inventoryPage }) => {
        await inventoryPage.sortItemsByPrice("asc");
        const prices = await inventoryPage.getItemPrices();

        const sortedPrices = [...prices].sort((a, b) => Number(a) - Number(b));
        expect(prices).toEqual(sortedPrices);
      }
    );

    test(
      "should sort products by price high to low",
      { tag: [EXECUTION_TAGS.regression] },
      async ({ inventoryPage }) => {
        await inventoryPage.sortItemsByPrice("desc");
        const prices = await inventoryPage.getItemPrices();

        const sortedPrices = [...prices].sort((a, b) => Number(b) - Number(a));
        expect(prices).toEqual(sortedPrices);
      }
    );

    test(
      "should sort products alphabetically A to Z",
      { tag: [EXECUTION_TAGS.regression] },
      async ({ inventoryPage }) => {
        await inventoryPage.sortItemsByName("asc");
        const names = await inventoryPage.getItemNames();

        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
      }
    );

    test(
      "should add item to cart and update cart badge",
      { tag: [EXECUTION_TAGS.smoke] },
      async ({ inventoryPage }) => {
        await inventoryPage.addItemToCart("Sauce Labs Backpack");
        const cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe("1");
      }
    );

    test(
      "should remove item from cart and update cart badge",
      { tag: [EXECUTION_TAGS.smoke] },
      async ({ inventoryPage }) => {
        await inventoryPage.addItemToCart("Sauce Labs Backpack");
        await inventoryPage.removeItemFromCart("Sauce Labs Backpack");

        const cartBadge = await inventoryPage.isShoppingCartBadgeVisible();
        await expect(cartBadge).toBeFalsy();
      }
    );

    test(
      "should navigate to cart page when cart icon is clicked",
      { tag: [EXECUTION_TAGS.critical] },
      async ({ inventoryPage, page }) => {
        const cartPage = new CartPage(page);
        await inventoryPage.navigateToCart();
        await expect(cartPage.isCartContainerVisible()).toBeTruthy();
      }
    );

    test(
      "should add and remove multiple items from cart",
      { tag: [EXECUTION_TAGS.smoke] },
      async ({ inventoryPage }) => {
        const itemNames = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];

        for (const itemName of itemNames) {
          await inventoryPage.addItemToCart(itemName);
        }

        let cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe("2");

        for (const itemName of itemNames) {
          await inventoryPage.removeItemFromCart(itemName);
        }

        const cartBadge = await inventoryPage.isShoppingCartBadgeVisible();
        expect(cartBadge).toBeFalsy();
      }
    );

    test(
      "should display correct product details",
      { tag: [EXECUTION_TAGS.critical] },
      async ({ inventoryPage }) => {
        const itemName = "Sauce Labs Backpack";
        const itemDescription =
          "carry.allTheThings() with the sleek, streamlined Sly Pack";
        const itemPrice = "$29.99";

        const itemDetails = await inventoryPage.getItemDetails(itemName);

        expect(itemDetails.name).toBe(itemName);
        expect(itemDetails.description).toContain(itemDescription);
        expect(itemDetails.price).toBe(itemPrice);
      }
    );

    test(
      "should add multiple items to cart",
      { tag: [EXECUTION_TAGS.smoke] },
      async ({ inventoryPage }) => {
        const itemNames = [
          "Sauce Labs Backpack",
          "Sauce Labs Bike Light",
          "Sauce Labs Bolt T-Shirt",
        ];
        for (const itemName of itemNames) {
          await inventoryPage.addItemToCart(itemName);
        }

        const cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe("3");
      }
    );

    test(
      "should persist cart items after page reload",
      { tag: [EXECUTION_TAGS.regression] },
      async ({ page, inventoryPage }) => {
        const itemName = "Sauce Labs Backpack";
        await inventoryPage.addItemToCart(itemName);
        await page.reload();

        await inventoryPage.waitForPageLoad();
        expect(await inventoryPage.isInventoryVisible()).toBeTruthy();

        const cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe("1");

        const removeButton = await inventoryPage.isRemoveButtonVisible(
          itemName
        );
        await expect(removeButton).toBeTruthy();
      }
    );
  });
};

["standard", "performance", "error", "visual", "problem"].forEach(
  (userType) => {
    invetoryTests(userType);
  }
);
