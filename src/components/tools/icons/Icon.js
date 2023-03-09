import React from 'react';
import PropTypes from 'prop-types';
import AppStore from './apps/Appstore';
import Bookmark from './tools/Bookmark';
import Codepen from './apps/Codepen';
import External from './tools/External';
import Folder from './tools/Folder';
import Fork from './tools/Fork';
import Instagram from './networks/Instagram';
import Linkedin from './networks/Linkedin';
import Logo from './Logo';
import PlayStore from './apps/Playstore';
import Star from './tools/Star';
import Twitter from './networks/Twitter';
import Globe from './tools/Globe';
import Facebook from './networks/Facebook';
import Whatsapp from './networks/Whatsapp';
import Pinterest from './networks/Pinterest';
import Share from './tools/Share';
import ArrowOutlined from './tools/ArrowOutlined';
import Envelope from './tools/Envelope';
import GithubOutlined from './apps/GithubOutlined';
import Moon from './tools/Moon';
import Sun from './tools/Sun';
import Computer from './tools/Computer';
import Lock from './tools/Lock';
import Bootstrap from './code/Bootstrap';
import Chrome from './code/Chrome';
import Command from './code/Command';
import Css from './code/Css';
import Express from './code/Express';
import Gatsby from './code/Gatsby';
import Github from './code/Github';
import Html from './code/Html';
import Graphql from './code/Graphql';
import Gulp from './code/Gulp';
import Javascript from './code/Javascript';
import Nextjs from './code/Nextjs';
import Photoshop from './code/Photoshop';
import Postman from './code/Postman';
import Reactjs from './code/React';
import ReactRouter from './code/ReactRouter';
import Redux from './code/Redux';
import Sass from './code/Sass';
import Socketio from './code/Socketio';
import StyledComponents from './code/StyledComponents';
import Tailwindcss from './code/Tailwindcss';
import Typescript from './code/Typescript';
import NodeJS from './code/Nodejs';
import Code from './code/Code';
import Settings from './tools/Settings';
import LayoutLeftPanelOne from './tools/LayoutLeftPanelOne';
import Cross from './tools/Cross';
import CaretRight from './tools/CaretRight';
import Axios from './code/Axios';
import Earth from './tools/Earth';
import Api from './code/Api';
import Npm from './code/Npm';
import Json from './code/Json';
import Mongodb from './code/Mongodb';
import Database from './tools/Database';
import InfoCircle from './tools/InfoCircle';
import Seo from './code/Seo';
import CheckCircle from './tools/CheckCircle';
import Picture from './tools/Picture';
import Image from './tools/Image';
import CrossCircle from './tools/CrossCircle';
import Play from './music/Play';
import Pause from './music/Pause';
import Backward from './music/Backward';
import Forward from './music/Forward';
import Music from './music/Music';
import VolumeFull from './music/VolumeFull';
import Mute from './music/Mute';
import Stop from './music/Stop';
import DoubleArrowDown from './tools/DoubleArrowDown';
import DoubleArrowUp from './tools/DoubleArrowUp';

const Icon = (props) => {
    switch (props.name) {
        case 'Logo':
            return <Logo {...props} />;
        case 'Share':
            return <Share {...props} />;
        case 'Globe':
            return <Globe {...props} />;
        case 'AppStore':
            return <AppStore {...props} />;
        case 'Codepen':
            return <Codepen {...props} />;
        case 'GithubOutlined':
            return <GithubOutlined {...props} />;
        case 'PlayStore':
            return <PlayStore {...props} />;
        case 'Bookmark':
            return <Bookmark {...props} />;
        case 'External':
            return <External {...props} />;
        case 'Envelope':
            return <Envelope {...props} />;
        case 'Folder':
            return <Folder {...props} />;
        case 'Fork':
            return <Fork {...props} />;
        case 'Arrow':
            return <ArrowOutlined {...props} />;
        case 'Sun':
            return <Sun {...props} />;
        case 'Moon':
            return <Moon {...props} />;
        case 'Computer':
            return <Computer {...props} />;
        case 'Lock':
            return <Lock {...props} />;
        case 'Instagram':
            return <Instagram {...props} />;
        case 'Star':
            return <Star {...props} />;
        case 'Twitter':
            return <Twitter {...props} />;
        case 'Facebook':
            return <Facebook {...props} />;
        case 'Pinterest':
            return <Pinterest {...props} />;
        case 'Linkedin':
            return <Linkedin {...props} />;
        case 'Whatsapp':
            return <Whatsapp {...props} />;
        case 'Bootstrap':
            return <Bootstrap {...props} />;
        case 'Chrome':
            return <Chrome {...props} />;
        case 'Command':
            return <Command {...props} />;
        case 'Css':
            return <Css {...props} />;
        case 'Html':
            return <Html {...props} />;
        case 'Express':
            return <Express {...props} />;
        case 'Gatsby':
            return <Gatsby {...props} />;
        case 'Github':
            return <Github {...props} />;
        case 'Graphql':
            return <Graphql {...props} />;
        case 'Gulp':
            return <Gulp {...props} />;
        case 'Javascript':
            return <Javascript {...props} />;
        case 'Nextjs':
            return <Nextjs {...props} />;
        case 'NodeJS':
            return <NodeJS {...props} />;
        case 'Photoshop':
            return <Photoshop {...props} />;
        case 'Postman':
            return <Postman {...props} />;
        case 'Reactjs':
            return <Reactjs {...props} />;
        case 'ReactRouter':
            return <ReactRouter {...props} />;
        case 'Redux':
            return <Redux {...props} />;
        case 'Sass':
            return <Sass {...props} />;
        case 'Socketio':
            return <Socketio {...props} />;
        case 'StyledComponents':
            return <StyledComponents {...props} />;
        case 'Tailwindcss':
            return <Tailwindcss {...props} />;
        case 'Typescript':
            return <Typescript {...props} />;
        case 'Axios':
            return <Axios {...props} />;
        case 'Earth':
            return <Earth {...props} />;
        case 'Api':
            return <Api {...props} />;
        case 'Npm':
            return <Npm {...props} />;
        case 'Json':
            return <Json {...props} />;
        case 'Mongodb':
            return <Mongodb {...props} />;
        case 'Database':
            return <Database {...props} />;
        case 'Code':
            return <Code {...props} />;
        case 'Settings':
            return <Settings {...props} />;
        case 'LayoutLeftPanelOne':
            return <LayoutLeftPanelOne {...props} />;
        case 'Cross':
            return <Cross {...props} />;
        case 'CrossCircle':
            return <CrossCircle {...props} />;
        case 'InfoCircle':
            return <InfoCircle {...props} />;
        case 'CaretRight':
            return <CaretRight {...props} />;
        case 'Seo':
            return <Seo {...props} />;
        case 'CheckCircle':
            return <CheckCircle {...props} />;
        case 'Picture':
            return <Picture {...props} />;
        case 'Image':
            return <Image {...props} />;
        case 'Play':
            return <Play {...props} />;
        case 'Pause':
            return <Pause {...props} />;
        case 'Music':
            return <Music {...props} />;
        case 'Backward':
            return <Backward {...props} />;
        case 'Forward':
            return <Forward {...props} />;
        case 'VolumeFull':
            return <VolumeFull {...props} />;
        case 'Mute':
            return <Mute {...props} />;
        case 'Stop':
            return <Stop {...props} />;
        case 'DoubleArrowDown':
            return <DoubleArrowDown {...props} />;
        case 'DoubleArrowUp':
            return <DoubleArrowUp {...props} />;
        default:
            return <External {...props} />;
    }
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Icon;
