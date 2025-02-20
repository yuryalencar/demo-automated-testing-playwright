import { test, expect, Page } from "@playwright/test";

import { users } from "@fixtures/user-credentials";
import { LOGIN_MESSAGES } from "@fixtures/login-messages";
import { EXECUTION_TAGS } from "@fixtures/execution-tags";

import { LoginPage } from "@pages/login.page";
import { InventoryPage } from "@pages/inventory.page";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();

    inventoryPage = new InventoryPage(page);
  });

  const usersToLogin = [
    users.standard,
    users.performance,
    users.error,
    users.visual,
    users.problem,
  ];

  for (const user of usersToLogin) {
    test(
      `should login with ${user.description} user`,
      { tag: [EXECUTION_TAGS.critical] },
      async () => {
        const { username, password } = user;
        await loginPage.login({ username, password });
        await inventoryPage.waitForPageLoad();
        expect(await inventoryPage.isInventoryVisible()).toBeTruthy();
      }
    );
  }

  const usersToFail = [
    {
      user: users.locked,
      message: LOGIN_MESSAGES.lockedOutUserMessage,
    },
    {
      user: users.invalid,
      message: LOGIN_MESSAGES.invalidCredentialsMessage,
    },
  ];

  for (const scenario of usersToFail) {
    test(
      `should show error with ${scenario.user.description} user`,
      { tag: [EXECUTION_TAGS.critical] },
      async () => {
        const { username, password } = scenario.user;
        await loginPage.login({ username, password });

        expect(await loginPage.isErrorVisible()).toBeTruthy();
        expect(await loginPage.getErrorMessage()).toContain(scenario.message);
      }
    );
  }
});
