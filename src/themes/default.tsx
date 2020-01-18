import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const typography = {
  h1: {
    fontSize: "4rem",
  },
  h2: {
    fontSize: "3.5rem",
  },
  h3: {
    fontSize: "3rem",
  },
  h4: {
    fontSize: "2.5rem",
  },
  h5: {
    fontSize: "2rem",
  },
  h6: {
    fontSize: "1.5rem",
  },
  body1: {
    fontSize: "1rem",
  },
  fontSize: 20,
};

export const lightTheme = responsiveFontSizes(createMuiTheme({
  props: {
    MuiAppBar: {
      position: "sticky",
    },
    MuiCard: {
      elevation: 0,
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: "#fff !important",
      },
    },
  },
  palette: {
    background: {
      default: "#fff",
    },
  },
  typography,
}));

export const darkTheme = responsiveFontSizes(createMuiTheme({
  props: {
    MuiAppBar: {
      position: "sticky",
    },
    MuiCard: {
      elevation: 0,
    },
  },
  palette: {
    type: "dark",
    background: {
      default: grey[900],
      paper: grey[800],
    },
  },
  overrides: {
   MuiTable: {
      root: {
        background: "transparent !important",
      },
    },
    MuiTypography: {
      root: {
        color: grey[400],
      },
    },
  },
  typography,
}));

export default {
  darkTheme,
  lightTheme,
};
