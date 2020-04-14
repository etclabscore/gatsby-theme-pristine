import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import grey from "@material-ui/core/colors/grey"

const headerFontWeight = 400

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
  fontWeightRegular: "normal",
  fontFamily: [
    "system-ui",
    "apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
  ].join(","),
}

export const lightTheme = responsiveFontSizes(
  createMuiTheme({
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
      text: {
        primary: grey[900],
      },
      background: {
        default: "#fff",
      },
    },
    typography,
  })
)

export const darkTheme = responsiveFontSizes(
  createMuiTheme({
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
      text: {
        primary: grey[400],
      },
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
  })
)

export default {
  darkTheme,
  lightTheme,
}
