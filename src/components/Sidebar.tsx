import React, { useState } from "react";
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby";
import { Drawer, List, ListItem, ListItemText, Typography, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<IProps> = ({ children, open, onClose }) => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      site {
        siteMetadata {
          title
          logoUrl
          menuLinks {
            name
            link
          }
        }
      }
    }
  `);
  const theme: any = useTheme();

  return (
    <Drawer open={open} onClose={onClose}>
      <Grid container style={{ paddingLeft: "20px", paddingTop: "20px" }}>
        <img
          alt="logo"
          height="30"
          style={{paddingRight: "10px"}}
          src={data.site.siteMetadata.logoUrl} />
        <Typography color="textSecondary" variant="h6">
          {data.site.siteMetadata.title}
        </Typography>
      </Grid>
      <List style={{ minWidth: "250px" }}>
        {data.site.siteMetadata.menuLinks.map((menuLink: any) => (
          <GatsbyLink
            to={menuLink.link} key={menuLink.name}
            style={{ color: theme.palette.text.secondary, textDecoration: "none" }}
            activeStyle={{ color: theme.palette.text.secondary }}
          >
            <ListItem button key="foo" onClick={onClose}>
              <ListItemText primary={menuLink.name} />
            </ListItem>
          </GatsbyLink>
        ))}
      </List>
    </Drawer>
  );

};

export default Sidebar;
