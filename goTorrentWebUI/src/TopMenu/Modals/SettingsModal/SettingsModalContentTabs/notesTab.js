import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from 'material-ui/styles';



const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: 0,
    },
    paper: {
      padding: 16,
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    floatRight: {
        float: 'right',
    }
});


class NotesTab extends React.PureComponent {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>    
            Here will be notes/news/links, etc, maybe pull from github?
            </div>
        );
    }
}

export default withStyles(styles)(NotesTab)

