import { test, expect } from "@fixtures/test.fixture";
import { UseType } from "@fixtures/user-credentials";

const invetoryTests = (userType: UseType) => {
  test.describe(`Inventory Page - ${userType} user`, () => {
    test.use({ userType: userType });

    test("should display correct page title", async ({ inventoryPage }) => {
      const title = await inventoryPage.getInventoryTitle();
      expect(title).toBe("Products");
    });

    test("should sort products by price low to high", async ({ inventoryPage }) => {
      await inventoryPage.sortItemsByPrice("asc");
      const prices = await inventoryPage.getItemPrices();

      const sortedPrices = [...prices].sort((a, b) => Number(a) - Number(b));
      expect(prices).toEqual(sortedPrices);
    });

    test("should sort products by price high to low", async ({ inventoryPage }) => {
      await inventoryPage.sortItemsByPrice("desc");
      const prices = await inventoryPage.getItemPrices();

      const sortedPrices = [...prices].sort((a, b) => Number(b) - Number(a));
      expect(prices).toEqual(sortedPrices);
    });

    test("should sort products alphabetically A to Z", async ({ inventoryPage }) => {
      await inventoryPage.sortItemsByName("asc");
      const names = await inventoryPage.getItemNames();

      const sortedNames = [...names].sort();
      expect(names).toEqual(sortedNames);
    });

    test("should add item to cart and update cart badge", async ({ inventoryPage }) => {
      await inventoryPage.addItemToCart("Sauce Labs Backpack");
      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe("1");
    });

    test("should remove item from cart and update cart badge", async ({ inventoryPage }) => {
      await inventoryPage.addItemToCart("Sauce Labs Backpack");
      await inventoryPage.removeItemFromCart("Sauce Labs Backpack");

      const cartBadge = await inventoryPage.isShoppingCartBadgeVisible();
      await expect(cartBadge).toBeFalsy();
    });

    // @TODO: Fix this test
    // test('should navigate to cart page when cart icon is clicked', async () => {
    //   await inventoryPage.navigateToCart();
    //   await expect(inventoryPage.page).toHaveURL(/.*cart.html/);
    // });

    // @TODO: Fix this test
    // test('should display correct product details', async () => {
    //   const [firstProduct] = await inventoryPage.getItemNames();
    //   expect(firstProduct).toHaveProperty('name');
    //   expect(firstProduct).toHaveProperty('description');
    //   expect(firstProduct).toHaveProperty('price');
    //   expect(firstProduct.price).toMatch(/^\$\d+\.\d{2}$/); // Price format $XX.XX
    // });

    test("should add multiple items to cart", async ({ inventoryPage }) => {
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
    });

    test("should persist cart items after page reload", async ({ page, inventoryPage }) => {
      const itemName = "Sauce Labs Backpack";
      await inventoryPage.addItemToCart(itemName);
      await page.reload();

      await inventoryPage.waitForPageLoad();
      expect(await inventoryPage.isInventoryVisible()).toBeTruthy();

      const cartCount = await inventoryPage.getCartItemCount();
      expect(cartCount).toBe("1");

      const removeButton = await inventoryPage.isRemoveButtonVisible(itemName);
      await expect(removeButton).toBeTruthy();
    });
  });
};

["standard", "performance", "error", "visual", "problem"].forEach(
  (userType) => {
    invetoryTests(userType);
  }
);
