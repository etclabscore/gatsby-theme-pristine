import React from "react";
import { Link, Grid, Typography, useMediaQuery, Theme } from "@material-ui/core";
import { Link as GatsbyLink } from "gatsby";
import { useTheme } from "@material-ui/styles";

interface IFooterLink {
  name: string;
  link: string;
}

interface IProps {
  footerLinks: IFooterLink[];
}

const Footer: React.FC<IProps> = (props) => {
  const theme: Theme = useTheme();
  const smallQuery = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid container spacing={10} style={{marginTop: "60px", marginBottom: "30px", padding: smallQuery ? "" : "30px"}} direction={smallQuery ? "row" : "column"}>
      {props.footerLinks.map((footerLink) => {
        return (
          <Link href={footerLink.link} style={{paddingRight: "15px", fontSize: "16px"}} color="textSecondary">{footerLink.name}</Link>
        );
      })}
    </Grid>
  );
};

export default Footer;
