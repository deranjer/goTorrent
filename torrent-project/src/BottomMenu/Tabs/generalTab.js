import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';



import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

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


class GeneralTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTorrent: []
        }

    }

    componentWillReceiveProps = () => {
        //console.log("recieving props in generaltab", "TYPE", this.props.selectionHashes[Object.keys(this.props.selectionHashes)[0]])
        if (this.props.selectionHashes.length === 1) { //if one torrent is selected
            let selectionHashTemp = this.props.selectionHashes[Object.keys(this.props.selectionHashes)[0]]// extract out the hash of the single selection
            let selectedTorrentTemp = []
            this.props.torrentList.forEach(function(singleTorrent){
                if (singleTorrent.TorrentHashString === selectionHashTemp){
                    selectedTorrentTemp = singleTorrent
                }
            })
            //selectedTorrentTemp = this.props.torrentList.filter(torrent => torrent.TorrentHashString === this.props.selectionHashes)
            console.log("SelectedTorrentTemp", selectedTorrentTemp)
            this.setState({ selectedTorrent: selectedTorrentTemp });    
        } else {
            this.setState({ selectedTorrent: [] })
        }
    }


    render() {
        const { classes } = this.props;
        return (   
            <div className={classes.root}>
             <Grid container spacing={8}>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>Torrent Name: <span className={classes.floatRight}>{this.state.selectedTorrent["TorrentName"]} </span></Paper>
                    <Paper className={classes.paper}>Torrent Size: <span className={classes.floatRight}>{this.state.selectedTorrent["Size"]} </span> </Paper>
                    <Paper className={classes.paper}>Storage Path: <span className={classes.floatRight}>{this.state.selectedTorrent["StoragePath"]} </span> </Paper>
                    <Paper className={classes.paper}>Date Added: <span className={classes.floatRight}> {this.state.selectedTorrent["DateAdded"]} </span> </Paper>
                    <Paper className={classes.paper}>Source Type: <span className={classes.floatRight}> {this.state.selectedTorrent["SourceType"]} </span> </Paper>
                    <Paper className={classes.paper}>Label: <span className={classes.floatRight}> {this.state.selectedTorrent["Status"]} </span> </Paper> 
                    <Paper className={classes.paper}>Torrent Hash: <span className={classes.floatRight}> {this.state.selectedTorrent["TorrentHashString"]} </span> </Paper>
                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>Status: <span className={classes.floatRight}>{this.state.selectedTorrent["Status"]} </span> </Paper>
                    <Paper className={classes.paper}>Percent Done: <span className={classes.floatRight}>{this.state.selectedTorrent["PercentDone"]} </span> </Paper>
                    <Paper className={classes.paper}>Torrent DL Amount: <span className={classes.floatRight}>{this.state.selectedTorrent["DownloadedSize"]} </span> </Paper>
                    <Paper className={classes.paper}>Total Upload Amount: <span className={classes.floatRight}>{this.state.selectedTorrent["Status"]} </span> </Paper>
                    <Paper className={classes.paper}>Seeding Ratio: <span className={classes.floatRight}>{this.state.selectedTorrent["Status"]} </span> </Paper>
                    <Paper className={classes.paper}>ETA: <span className={classes.floatRight}>{this.state.selectedTorrent["ETA"]} </span> </Paper>
                    <Paper className={classes.paper}>Status: <span className={classes.floatRight}>{this.state.selectedTorrent["Status"]} </span> </Paper>
                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>Status: <span className={classes.floatRight}>{this.state.selectedTorrent["Status"]} </span> </Paper>
                    <Paper className={classes.paper}>Torrent DL Amount: {this.state.selectedTorrent["DownloadedSize"]} </Paper>
                
                
                
                </Grid>
            </Grid>
            </div>
        );
    }
}





const mapStateToProps = state => {
    return {
        selectionHashes: state.selectionHashes,
        torrentList: state.torrentList,
    };
}



export default withStyles(styles)(connect(mapStateToProps)(GeneralTab))
