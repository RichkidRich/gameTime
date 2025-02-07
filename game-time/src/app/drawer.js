'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

// checks and crosses
import { FaCheck } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";

// inputs
import { FaRegKeyboard } from "react-icons/fa";
import { IoGameControllerOutline } from "react-icons/io5";

// genres
import { FaGun } from "react-icons/fa6";
import { GiCardAceSpades } from "react-icons/gi";
import { FaDiceSix } from "react-icons/fa";
import { BiSolidParty } from "react-icons/bi";
import { PiBoxingGloveBold } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { GoSmiley } from "react-icons/go";
import { FaPaintBrush } from "react-icons/fa";

// devices
import { TbWorldCheck } from "react-icons/tb";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaSteam } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdLaptopChromebook } from "react-icons/md";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getCollection, doc, setDoc, getDoc } from 'firebase/firestore';
import app from './firebase';

const db = getFirestore(app);

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const [currGame, setCurrGame] = React.useState(null);

  const toggleDrawer = (newOpen) => () => {
    setCurrGame("JCORG");
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  function Info({ inputName }) {

    const [isLoading, setIsLoading] = useState(true);

    const [name, setName] = useState(currGame);

    const [gameImage, setGameImage] = useState("https://firebasestorage.googleapis.com/v0/b/gametime-6bae1.firebasestorage.app/o/cover-1591336739727.jpg?alt=media&token=68a42365-585e-41bc-88e5-3b2fea850076")

    const [pCountMin, setPCountMin] = useState(1);
    const [pCountMax, setPCountMax] = useState(1);
    const [input, setInput] = useState([<FaRegKeyboard />]);
    const [platforms, setPlatforms] = useState([<TbWorldCheck />]);
    const [genre, setGenre] = useState([<FaGun />]);
    const [account, setAccount] = useState(false);
    const [download, setDownload] = useState(false);

    const [notes, setNotes] = useState(null);

    const getDatabase = async (gameName) => {
        try {
            const querySnap = doc(db, 'games', gameName);
            const document = await getDoc(querySnap);
            if (document.exists()) {
                setName(document.id);
                setGameImage(document.data().image);
                setPCountMin(document.data().min);
                setPCountMax(document.data().max);

                const inputData = document.data().input;
                if (inputData === "kbm") {
                    setInput(<FaRegKeyboard />);
                } else {
                    setInput(<IoGameControllerOutline />);
                }
                const platformData = document.data().platforms
                if (platformData === "pc") {
                    setPlatforms(<MdLaptopChromebook />);
                } else {
                    setPlatforms(<TbWorldCheck />);
                }
                
                const genreData = document.data().genre;
                if (genreData === "gun") {
                    setGenre(<FaGun/>);
                } else if (genreData === "card") {
                    setGenre(<GiCardAceSpades/>);
                } else if (genreData === "board") {
                    setGenre(<FaDiceSix/>);
                } else if (genreData === "party") {
                    setGenre(<BiSolidParty/>);
                } else if (genreData === "fighting") {
                    setGenre(<PiBoxingGloveBold/>);
                } else if (genreData === "car") {
                    setGenre(<FaCar/>);
                } else if (genreData === "puzzle") {
                    setGenre(<IoExtensionPuzzleOutline/>);
                } else if (genreData === "fun") {
                    setGenre(<GoSmiley/>);
                } else if (genreData === "draw") {
                    setGenre(<FaPaintBrush/>);
                }

                
                setAccount(document.data().account);
                setDownload(document.data().download);
                setNotes(document.data().notes);
            }
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }

    useState(() => {
        // populate();
        console.log(inputName);
        if (inputName !== null) {
            getDatabase(inputName);
        } else {
            setIsLoading(false);
        }
    });

    useState(() => {
        // populate();
        console.log(inputName);
        if (inputName !== null) {
            getDatabase(inputName);
        } else {
            setIsLoading(false);
        }
    }, [currGame]);

    return (
      <div>
        {isLoading ? <Container>
            <CircularProgress />
        </Container> :
        <Container className="main-info-container">
            <Row><h1 className="game-title">{name}</h1></Row>
            <Row>
                <img 
                    className="game-banner"
                    src={gameImage}
                />
            </Row>
            <Row className='info-row'>
                <Col>
                    <Row><h2 className='sub-header'>Players</h2></Row>
                    <Row><h2 className='player-count'>{pCountMin}-{pCountMax}</h2></Row>
                </Col>
                <Col>
                    <Row><h2 className='sub-header'>Input</h2></Row>
                    <Row><h2 className='player-count'>{input}</h2></Row>
                </Col>
                <Col>
                    <Row><h2 className='sub-header'>Genre</h2></Row>
                    <Row><h2 className='player-count'>{genre}</h2></Row>
                </Col>
                <Col>
                    <Row><h2 className='sub-header'>Platform</h2></Row>
                    <Row><h2 className='player-count'>{platforms}</h2></Row>
                </Col>
            </Row>
            <Row className='info-row'>
                <Col>
                    <Row><h2 className='sub-header'>Account</h2></Row>
                    <Row><h2 className='player-count'>{account ? <FaCheck /> : <HiOutlineX />}</h2></Row>
                </Col>
                <Col>
                    <Row><h2 className='sub-header'>Download</h2></Row>
                    <Row><h2 className='player-count'>{download ? <FaCheck /> : <HiOutlineX />}</h2></Row>
                </Col>
            </Row>
            <Row>
                <h6 className="notes">{notes}</h6>
            </Row>
        </Container>}
      </div>
    );
  }

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Info inputName={currGame}/>
    </div>
  );
}


