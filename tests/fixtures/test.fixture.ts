import { test as base } from '@playwright/test';
import { InventoryPage } from '@pages/inventory.page';
import { LoginPage } from '@pages/login.page';
import { users, UseType } from '@fixtures/user-credentials';

type Fixtures = {
  inventoryPage: InventoryPage;
  loginPage: LoginPage;
  userType: UseType;
};

export const test = base.extend<Fixtures>({
  userType: ['standard', { option: true }],

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page, loginPage, userType }, use) => {
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login({ username: users[userType].username, password: users[userType].password });
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';