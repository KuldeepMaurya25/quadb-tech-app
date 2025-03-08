
import { createTheme } from "@mui/material/styles";
import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/className";

ClassNameGenerator.configure((componentName) => `mui-${componentName}`);

const theme = createTheme(); // You can customize this theme if needed.

export default theme;
