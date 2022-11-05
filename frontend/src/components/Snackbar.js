import { memo } from "react";

const Snackbar = memo(({ show, error }) => (
  <div className={show ? "snackbar show" : "snackbar"}>{error}</div>
));
export default Snackbar;
