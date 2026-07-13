declare module "*.css";
declare module "*.module.css";
declare module "*.scss";
declare module "*.module.scss";

// Extend React HTML attributes to include the inert attribute.
// The `T` param must match React's `HTMLAttributes<T>` name for declaration
// merging to work, so it is intentionally unused here.
declare namespace React {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface HTMLAttributes<T> {
    inert?: boolean;
  }
}
