import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

//ui
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';


function LineUp(props) {
    
 const [event, setEvent] = useState({})
 const [lineUp, setLineUp] = useState([])

 const API_URL = 'http://localhost:5005'
 const id = Object.values(props).join("")

 const getEvent = () => {
        axios.get(`${API_URL}/api/map/${id}`)
        .then(res => {
            setEvent(res.data)
            setLineUp(res.data.lineUp)
    })
 }

 useEffect(() => {
    getEvent()
}, [])

//ui

const [expanded, setExpanded] = useState(false);

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

 return (
     <div>
        {lineUp.map(artist => {
            //has spotify
                if (artist.spotifyLink !== undefined 
                    && artist.topTracks[0].url !== "" 
                    && artist.topTracks[1].url !== "" 
                    && artist.topTracks[2].url !== ""){
                    return (
                        <div class="artistInLineUp">
                            <div class="artistWidthCollapseAndSpotify">
                                <h4>{artist.artistName}</h4>
                                <a href={artist.spotifyLink}>zum spotify profil</a>

                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                   <h6>listen</h6> <ExpandMoreIcon style={{color : "white"}}/>
                                </ExpandMore>
                            </div>

                            <Collapse in={expanded} timeout="auto" unmountOnExit>

                            <div class="track">   
                                <div class="titleAndAudio">
                                    <h5>{artist.topTracks[0].songTitle}</h5>
                                    <audio controls>
                                        <source src={artist.topTracks[0].url} />
                                    </audio>
                                </div>
                                <img alt="cover" src={artist.topTracks[0].cover.url} style={{height : 125, width : 125}} />
                            </div>

                            <div class="track">   
                                <div class="titleAndAudio">
                                    <h5>{artist.topTracks[1].songTitle}</h5>
                                    <audio controls>
                                        <source src={artist.topTracks[1].url} />
                                    </audio>
                                </div>
                                <img alt="cover" src={artist.topTracks[1].cover.url} style={{height : 125, width : 125}} />
                            </div>

                            <div class="track">   
                                <div class="titleAndAudio">
                                    <h5>{artist.topTracks[2].songTitle}</h5>
                                    <audio controls>
                                        <source src={artist.topTracks[2].url} />
                                    </audio>
                                </div>
                                <img alt="cover" src={artist.topTracks[2].cover.url} style={{height : 125, width : 125}} />
                            </div>
                            
                            </Collapse>
                        </div>
                    )
                } else if (artist.spotifyLink !== undefined 
                            && artist.topTracks[0].url !== ""
                            && artist.topTracks[1].url !== ""
                            && artist.topTracks[2].url === ""){
                        return (
                            <div>
                                <div class="artistWidthCollapseAndSpotify">
                                    <h3>{artist.artistName}</h3>
                                    <a href={artist.spotifyLink}>zum spotify profil</a>

                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                     <h6>listen</h6>  <ExpandMoreIcon />
                                    </ExpandMore>
                                </div>

                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <div class="track">   
                                <div class="titleAndAudio">
                                    <h5>{artist.topTracks[0].songTitle}</h5>
                                    <audio controls>
                                        <source src={artist.topTracks[0].url} />
                                    </audio>
                                </div>
                                <img alt="cover" src={artist.topTracks[0].cover.url} style={{height : 125, width : 125}} />
                            </div>

                            <div class="track">   
                                <div class="titleAndAudio">
                                    <h5>{artist.topTracks[1].songTitle}</h5>
                                    <audio controls>
                                        <source src={artist.topTracks[1].url} />
                                    </audio>
                                </div>
                                <img alt="cover" src={artist.topTracks[1].cover.url} style={{height : 125, width : 125}} />
                            </div>
                            </Collapse>

                            </div>
                    )
                } else if (artist.spotifyLink !== undefined
                            && artist.topTracks[0].url !== ""
                            && artist.topTracks[1].url === ""
                            && artist.topTracks[2].url === ""){
                        return (
                            <div>
                                <h3>{artist.artistName}</h3>
                                <a href={artist.spotifyLink}>zum spotify profil</a>

                                <div class="track">   
                                    <div class="titleAndAudio">
                                        <h5>{artist.topTracks[0].songTitle}</h5>
                                        <audio controls>
                                             <source src={artist.topTracks[0].url} />
                                        </audio>
                                    </div>
                                    <img alt="cover" src={artist.topTracks[0].cover.url} style={{height : 125, width : 125}} />
                                </div>
                            </div>
                    )
                } else if (artist.spotifyLink !== undefined
                            && artist.topTracks[0].url === ""
                            && artist.topTracks[1].url === ""
                            && artist.topTracks[2].url === ""){
                        return (
                            <div class="artistWithSpotifyLink">
                                <h4>{artist.artistName}</h4>
                                <a href={artist.spotifyLink}>zum spotify profil</a>
                            </div>
                    )
                } else if (artist.spotifyLink === undefined){
                    return (
                        <div class="artistOnlyWithName">
                            <h4>{artist.artistName}</h4>
                        </div>
                    )
                } 
        })}
     </div>
 )
}

export default LineUp
