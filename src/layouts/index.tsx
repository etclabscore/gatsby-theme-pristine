import React, { useState } from "react";
import { MuiThemeProvider, AppBar, Toolbar, Typography, IconButton, Tooltip, CssBaseline, Grid, Table, TableRow, TableBody, TableCell, TableHead, Link, Divider, Container, Hidden } from "@material-ui/core"; //tslint:disable-line
import useDarkMode from "use-dark-mode";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import MenuIcon from "@material-ui/icons/Menu";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { lightTheme, darkTheme } from "../themes/default";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../components/CodeBlock";
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby";
import Sidebar from "../components/Sidebar";
import "./index.css";
import { ReusableProvider } from "reusable";
import Footer from "../components/Footer";
import { useTheme } from "@material-ui/styles";

const Layout: React.FC = ({ children }) => {
  const darkMode = useDarkMode();
  const theme = darkMode.value ? darkTheme : lightTheme;
  const components = {
    h1: (props: any) => <Typography variant={"h1"} {...props} gutterBottom={true} />,
    h2: (props: any) => <Typography variant={"h2"} {...props} gutterBottom={true} />,
    h3: (props: any) => <Typography variant={"h3"} {...props} gutterBottom={true} />,
    h4: (props: any) => <Typography variant={"h4"} {...props} gutterBottom={true} />,
    h5: (props: any) => <Typography variant={"h5"} {...props} gutterBottom={true} />,
    h6: (props: any) => <Typography variant={"h6"} {...props} gutterBottom={true} />,
    Demo: (props: any) => <h1>This is a demo component</h1>,
    code: (props: any) => <CodeBlock darkMode={darkMode.value} {...props} />,
    thematicBreak: (props: any) => <Divider  {...props} />,
    a: (props: any) => <Link {...props} />,
    table: (props: any) => <Table {...props} style={{ marginBottom: "15px", ...props.style }} />,
    thead: (props: any) => <TableHead {...props} />,
    tr: (props: any) => <TableRow {...props} />,
    tableBody: (props: any) => <TableBody {...props} />,
    td: (props: any) => {
      return (
        <TableCell>
          {props.children || ""}
        </TableCell>
      );
    },
  };
  const [open, setOpen] = useState();

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          description
          logoUrl
          primaryColor
          primaryColorDark
          secondaryColor
          secondaryColorDark
          footerLinks {
            name
            link
          }
        }
      }
    }
  `);

  return (
    <MDXProvider components={components}>
      <MuiThemeProvider theme={{
        ...theme,
        palette: {
          ...theme.palette,
          primary: {
            ...theme.palette.primary,
            main: darkMode.value ? data.site.siteMetadata.primaryColorDark : data.site.siteMetadata.primaryColor,
          },
          secondary: {
            ...theme.palette.secondary,
            main: darkMode.value ? data.site.siteMetadata.secondaryColorDark : data.site.siteMetadata.secondaryColor,
          },
        },
      }}>
        <CssBaseline />
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <AppBar position="fixed" color="default" elevation={0}>
          <Toolbar>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon fontSize="small" />
            </IconButton>
            <Grid container alignContent="center" alignItems="center" justify="space-between">
              <Grid item container direction="row" xs={5}>
                <Grid style={{ paddingRight: "5px" }}>
                  <img
                    alt="logo"
                    height="30"
                    style={{
                      marginTop: "6px",
                    }}
                    src={data.site.siteMetadata.logoUrl} />
                </Grid>
                <Grid style={{ marginTop: "7px" }}>
                  <GatsbyLink to="/" style={{ textDecoration: "none" }}>
                    <Typography color="textSecondary" variant="h6">
                      {data.site.siteMetadata.title}
                    </Typography>
                  </GatsbyLink>
                </Grid>
              </Grid>
              <Grid item container direction="row" xs={7} justify="flex-end" alignItems="center">
                <Tooltip title={"Toggle Dark Mode"}>
                  <IconButton onClick={darkMode.toggle}>
                    {darkMode.value ? <Brightness3Icon fontSize="small" /> : <WbSunnyIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div style={{ paddingTop: "64px" }}>
          {children}
          {/* <Footer footerLinks={data.site.siteMetadata.footerLinks} /> */}
        </div>
      </MuiThemeProvider >
    </MDXProvider >
  );
};

export default Layout;
