declare module "*.css";
declare module "*.module.css";
declare module "*.scss";
declare module "*.module.scss";

// Extend React HTML attributes to include the inert attribute
declare namespace React {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    inert?: boolean;
  }
}
