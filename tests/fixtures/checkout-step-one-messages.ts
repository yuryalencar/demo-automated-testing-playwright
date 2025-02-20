
export interface CheckoutStepOneMessages {
  [key: string]: string;
}

export const CHECKOUT_STEP_ONE_MESSAGES: CheckoutStepOneMessages = {
  firstNameRequired: "Error: First Name is required",
  lastNameRequired: "Error: Last Name is required",
  postalCodeRequired: "Error: Postal Code is required",
};
