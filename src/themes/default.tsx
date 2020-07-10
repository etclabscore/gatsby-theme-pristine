import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
const lightBackground = "#fff";
const darkBackground = grey[900];

const headerFontWeight = 400;

const typography = {
  h1: {
    fontSize: "2.25rem",
    fontWeight: headerFontWeight,
  },
  h2: {
    fontSize: "2rem",
    letterSpacing: "0",
    fontWeight: headerFontWeight,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: headerFontWeight,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: headerFontWeight,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: headerFontWeight,
  },
  h6: {
    fontSize: "1.1rem",
    fontWeight: headerFontWeight,
  },
  body1: {
    fontSize: "1.06rem",
  },
  fontSize: 17,
  fontWeightRegular: 250,
  fontFamily: ["Helvetica", "Arial", "San-Serif"].join(","),
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
    MuiPaper: {
      root: {
        zIndex: 1,
        opacity: 1,
      },
    },
    MuiToolbar: {
      root: {
        backgroundColor: lightBackground,
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: lightBackground,
      },
      colorDefault: {
        backgroundColor: lightBackground,
      },
      colorPrimary: {
        backgroundColor: lightBackground,
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
  },
  palette: {
    type: "dark",
    background: {
      default: grey[900],
      paper: grey[900],
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        zIndex: 1,
        opacity: 1,
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: darkBackground,
      },
      colorPrimary: {
        backgroundColor: darkBackground,
      },
    },
    MuiToolbar: {
      root: {
        backgroundColor: darkBackground,
      },
    },
    MuiTable: {
      root: {
        backgroundColor: darkBackground,
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
