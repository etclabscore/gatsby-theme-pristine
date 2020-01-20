import React from "react";
import { Grid, Box, Link, Typography, Paper, Button } from "@material-ui/core";
import { Link as GatsbyLink } from "gatsby";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

interface IProps {
  next?: {
    name: string;
    link: string;
  };
  prev?: {
    name: string;
    link: string;
  };
}

const styles = {
  nextPrev: {
    padding: "20px 40px",
  },
};

const NextAndPrev: React.FC<IProps> = (props) => {
  return (
    <Grid container justify="space-between" style={{paddingTop: "40px", paddingBottom: "40px"}}>
      <Box style={{ visibility: props.prev ? "visible" : "hidden" }}>
        <Typography gutterBottom>Previous</Typography>
        {props.prev &&
          <>
            <Link component={(p: { children: any }) => (
              <GatsbyLink to={props.prev!.link} style={{ textDecoration: "none" }}>
                {p.children}
              </GatsbyLink>
            )}>
              <Button startIcon={<ArrowBackIos />}>{props.prev.name}</Button>
            </Link>
          </>
        }
      </Box>
      <Box style={{ visibility: props.next ? "visible" : "hidden" }}>
        <Typography gutterBottom style={{textAlign: "right"}}>Next</Typography>
        {props.next &&
          <>
            <Link component={(p: { children: any }) => (
              <GatsbyLink to={props.next!.link} style={{ textDecoration: "none" }}>
                {p.children}
              </GatsbyLink>
            )}>
              <Button endIcon={<ArrowForwardIos />}>{props.next.name}</Button>
            </Link>
          </>
        }
      </Box>
    </Grid>
  );
};

export default NextAndPrev;
