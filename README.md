# Automated Testing Demo with Playwright

This project demonstrates automated testing of a web application using Playwright with TypeScript. It implements the Page Object Model (POM) design pattern and includes comprehensive test coverage for login, inventory, and checkout flows.

## 🛠 Tech Stack

- Playwright
- TypeScript
- Allure Report
- dotenv

## 📦 Project Structure

├── tests/
│ ├── pages/ # Page Object Models
│ ├── specs/ # Test Specifications
│ └── fixtures/ # Test Fixtures and Data
├── playwright.config.ts
├── tsconfig.json
└── package.json

## 🚀 Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Copy the `.env.example` file to `.env` and update the credentials:

```bash
cp .env.example .env
```

3. Run tests:

```bash
pnpm test # Run all tests
pnpm test:chrome # Run tests in Chrome only
pnpm test:headed # Run tests in headed mode
pnpm test:ui # Run tests with UI mode
```

4. Configure the Allure Report in your machine:

Mac OS:
```bash
brew install allure
```

Linux:
```bash
# Using package file
# 1. Download the latest release
# Go to the latest Allure Report release on GitHub and download the allure-*.deb file.

# 2. Install the package
sudo dpkg -i allure_<version>_all.deb
sudo apt-get install -f # Install dependencies if needed

# Verify installation
allure --version
```

For other Linux distributions, check the [official Allure documentation](https://docs.qameta.io/allure/).

## 📝 Test Structure

### Page Objects

- **BasePage**: Abstract base class with common functionality
- **AuthenticatedPage**: Base class for authenticated pages
- **LoginPage**: Login page interactions
- **InventoryPage**: Product inventory functionality
- **CheckoutPage**: Checkout process handling

### Test Specs

- **Login Tests**: User authentication scenarios
- **Inventory Tests**: Product listing and cart operations
- **Checkout Tests**: Order completion flow

## 🧪 Test Coverage

### Login Flow

- Standard user login
- Error scenarios (locked user, invalid credentials)
- Different user types (performance, visual, problem users)

### Inventory Management

- Product sorting (price, alphabetical)
- Cart operations (add, remove items)
- Shopping cart badge updates

### Checkout Process

- Information validation
- Order summary verification
- Complete checkout flow

## 📊 Reporting

Generate and view test reports:

```bash
pnpm report
```

## 🔍 Key Features

1. **Page Object Model**

   - Modular and maintainable test structure
   - Reusable page components
   - Type-safe interactions

2. **Cross-browser Testing**

   - Chrome, Firefox, and Safari support
   - Mobile viewport testing (configurable)

3. **Test Fixtures**

   - Shared test context
   - User credentials management
   - Error message constants

4. **CI/CD Ready**

   - Configurable retry logic (configurable)
   - Parallel test execution (configurable)
   - Failure screenshots and videos (configurable)

## 📚 Best Practices

1. **Data-test Attributes**

   - Consistent selector strategy using data-test attributes
   - Reliable element identification
   - Maintainable selectors

2. **Type Safety**

   - Strong TypeScript types
   - Interface definitions for test data
   - Compile-time error checking

3. **Error Handling**
   - Graceful failure handling
   - Detailed error messages
   - Visual failure evidence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License
