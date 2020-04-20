import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './footer.css';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/PandeyAditya14/news_portal">
        Aditya Kumar Pandey
      </Link>{''}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Made with ❤️ and 
        </Typography>
        <Typography className="footer-Thumbnails" variant="subtitle1" align="center" color="textSecondary" component="p">
          <img src={require('./react2.png')} height={'50px'} />
          <img src={require('./mongo.png')} height={'70px'}/>
          <img src={require('./node.png')} height={'50px'}/>
          <img src={require('./express.png')} height={'50px'}/>
          
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};