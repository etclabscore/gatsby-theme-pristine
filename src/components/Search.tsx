import React, { useState } from "react";
import { useStaticQuery, graphql, Link as GatsbyLink, navigate } from "gatsby";
import { List, ListItem, ListItemText, Popper, Paper, InputBase } from "@material-ui/core";
import _ from "lodash";
const { useFlexSearch } = require("react-use-flexsearch"); //tslint:disable-line

const Search: React.FC = () => {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      localSearchPages {
        index
        store
      }
    }
  `);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleFocus = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const results = useFlexSearch(
    query,
    data.localSearchPages.index,
    JSON.parse(data.localSearchPages.store),
  );
  const open = Boolean(anchorEl);
  const selected = selectedItem || results[0];

  return (
    <div style={{ marginRight: "5px" }}>
      <InputBase
        onKeyDown={(ev: any) => {
          // Enter
          if (ev.keyCode === 13) {
            if (selected) {
              setQuery("");
              if (anchorEl !== null) {
                (anchorEl as any).blur();
                setAnchorEl(null);
              }
              navigate(selected.slug);
            }
          } else if (ev.keyCode === 40) {
            // Down
            const currIndex = _.findIndex(results, (result: any) => result.id === selected.id);
            const newSelected = results[currIndex + 1];
            if (newSelected) {
              setSelectedItem(newSelected);
            }
          } else if (ev.keyCode === 38) {
            // Up
            const currIndex = _.findIndex(results, (result: any) => result.id === selected.id);
            const newSelected = results[currIndex - 1];
            if (newSelected) {
              setSelectedItem(newSelected);
            }
          }
        }}
        onChange={(ev: any) => {
          setQuery(ev.target.value);
        }}
        onFocus={handleFocus}
        placeholder={"🔎 Search"}
        value={query}
        style={{
          fontSize: "16px",
          background: "rgba(0,0,0,0.1)",
          borderRadius: "4px",
          paddingRight: "10px",
          paddingLeft: "10px",
          paddingTop: "4px",
          marginBottom: "4px",
        }}

      />
      {results.length !== 0 &&
        <Popper
          open={open}
          style={{ marginTop: "5px" }}
          anchorEl={anchorEl as any}
          popperOptions={{
            placement: "bottom",
          }}
        >
          <Paper style={{ maxWidth: "450px", marginTop: "12px" }}>
            <List>
              {results.map((result: any) => (
                <ListItem key={result.id} selected={selected.id === result.id}>
                  <GatsbyLink to={result.slug} style={{ textDecoration: "none" }} onClick={() => {
                    setQuery("");
                    setAnchorEl(null);
                  }}>
                    <ListItemText primary={result.slug} secondary={result.title} />
                  </GatsbyLink>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popper>
      }
    </div>
  );

};

export default Search;
