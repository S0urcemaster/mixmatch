// import { contextBridge } from 'electron'

import React, {useEffect, useState} from 'react';

import { Button, Divider } from "@blueprintjs/core";

import './App.css'

import styles, {css} from './styles'

import { useWindowSize } from './lib/WindowSizeHook'

import com from './main/processcom'
import Track from "./data/Track"

import DJSet from "./content/DJSet";
import Collection from "./content/Collection"
import TrackDetail from "./content/TrackDetail"
import PageHeader from "./content/PageHeader";
import SetHeader from "./content/DJSetHeader";
import CollectionHeader from "./content/CollectionHeader";


const app:css = {
	maxHeight:'84vh',
	height:'84vh',
}

const headerRow:css = {
	display:'flex',
	justifyContent:'space-between',
}

const detailsRow:css = {
	display:'flex',
	justifyContent:'space-between',
}

const tableRow:css = {
	display:'flex',
	justifyContent:'space-between',
}

const tableRowItem:css = {
	flex:'1 1 auto',
	// width:'100%',
}

declare const window: any;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {

	const [width, height] = useWindowSize();

	useEffect(() => {
		// console.log(width, height)
	},[width, height])

	const [zet, setZet] = useState([])
	const [collection, setCollection] = useState([])
	const [selectedCollectionTrack, setSelectedCollectionTrack] = useState({...new Track(), title:'No Track'})
	const [selectedZetTrack, setSelectedZetTrack] = useState({...new Track(), title:'No Track'})

	useEffect(() => {
		window.api.receive(com.pick_file, (data: string) => filePicked(data))
		window.api.receive(com.read_nml, (data: string) => nmlRed(data))
		window.api.receive(com.read_collection, (data: []) => collectionRed(data))
		window.api.send(com.read_collection, undefined)
	},[])

	function importSet() {
		window.api.send(com.pick_file, undefined);
	}

	function collectionRed(data: []) {
		setCollection(data.pop())
	}

	function filePicked(filename:string) {
		window.api.send(com.read_nml, filename)
	}

	function nmlRed(data:any) {
		const parser = new DOMParser()
		const doc = parser.parseFromString(data, "application/xml");
		const entries = doc.getElementsByTagName('COLLECTION').item(0).getElementsByTagName('ENTRY')
		const trax = []
		for(let i = 0; i< entries.length; i++) {
			const entry = entries.item(i)
			const track = new Track();
			track.modified_date = entry.getAttribute('MODIFIED_DATE')
			track.modified_time = entry.getAttribute('MODIFIED_TIME')
			track.title = entry.getAttribute('TITLE')
			track.artist = entry.getAttribute('ARTIST')
			const location = entry.getElementsByTagName('LOCATION').item(0)
			track.dir = location.getAttribute('DIR')
			track.volume = location.getAttribute('VOLUME')
			track.file = track.volume +track.dir.split(':').join('') +location.getAttribute('FILE')
			track.volumeid = location.getAttribute('VOLUMEID')
			const info = entry.getElementsByTagName('INFO').item(0)
			track.bitrate = info.getAttribute('BITRATE')
			track.genre = info.getAttribute('GENRE')
			track.key = info.getAttribute('KEY')
			track.playcount = info.getAttribute('PLAYCOUNT')
			track.playtime = info.getAttribute('PLAYTIME')
			track.playtime_float = info.getAttribute('PLAYTIME_FLOAT')
			track.import_date = info.getAttribute('IMPORT_DATE')
			track.last_played = info.getAttribute('LAST_PLAYED')
			track.flags = info.getAttribute('FLAGS')
			const tempo = entry.getElementsByTagName('TEMPO').item(0)
			track.bpm = tempo.getAttribute('BPM')
			track.bpm_quality = tempo.getAttribute('BPM_QUALITY')
			const loudness = entry.getElementsByTagName('LOUDNESS').item(0)
			track.peak_db = loudness.getAttribute('PEAK_DB')
			track.perceived_db = loudness.getAttribute('PERCEIVED_DB')
			track.analyzed_db = loudness.getAttribute('ANALYZED_DB')
			const musicalKey = entry.getElementsByTagName('MUSICAL_KEY').item(0)
			track.musical_key = musicalKey.getAttribute('VALUE')
			trax.push(track)
		}
		// console.log(trax)
		setZet(trax)
	}
	
	return (
			<div style={{...app, height:height}}>
				<PageHeader/>
				<Divider style={{margin: 0}}/>
				<div style={{...headerRow}}>
					<SetHeader fileSelected={importSet}/>
					<CollectionHeader />
				</div>
				<div style={{...detailsRow}}>
					<TrackDetail style={{marginRight:10, marginBottom:10}} track={selectedZetTrack} loadChannel={'left'} />
					<TrackDetail style={{marginBottom:10}} track={selectedCollectionTrack} loadChannel={'right'} />
				</div>
				<div style={{...tableRow}}>
					<div style={{...tableRowItem, height:height -470, width:0, marginRight:10}}>
						<DJSet tracks={zet} trackSelected={(track:Track) => setSelectedZetTrack(track)} />
					</div>
					<div style={{...tableRowItem, width:0}}>
						<Collection tracks={collection} height={height -430}
										trackSelected={(track:Track) => setSelectedCollectionTrack(track)} />
					</div>
				</div>
			</div>
	)
}

export default App
