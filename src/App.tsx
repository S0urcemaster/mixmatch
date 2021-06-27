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
import SetSelectionDetail from "./content/SetSelectionDetail"
import TrackDetail from "./content/TrackDetail"
import PageHeader from "./content/PageHeader";
import SetHeader from "./content/SetHeader";
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


const zetNode:AudioBufferSourceNode = null

function App() {

	const [width, height] = useWindowSize();

	useEffect(() => {
		// console.log(width, height)
	},[width, height])

	const [zet, setZet] = useState([])
	const [collection, setCollection] = useState([])
	const [selectedCollectionTrack, setSelectedCollectionTrack] = useState({})

	useEffect(() => {
		// console.log('app: ', tracks)
	},[zet])

	useEffect(() => {
		window.api.receive(com.pick_file, (data: string) => filePicked(data))
		window.api.receive(com.read_nml, (data: string) => fileRed(data))
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

	function collectionTrackSelected(track:Track) {
		setSelectedCollectionTrack(track)
	}

	function fileRed(data:any) {
		// console.log('fileRead: ', data)
		const parser = new DOMParser()
		const doc = parser.parseFromString(data, "application/xml");
		const entries = doc.getElementsByTagName('COLLECTION').item(0).getElementsByTagName('ENTRY')
		const trax = []
		for(let i = 0; i< entries.length; i++) {
			const entry = entries.item(i)
			// console.log(entry)
			const track = new Track();
			track.modified_date = entry.getAttribute('MODIFIED_DATE')
			track.modified_time = entry.getAttribute('MODIFIED_TIME')
			track.title = entry.getAttribute('TITLE')
			track.artist = entry.getAttribute('ARTIST')
			const location = entry.getElementsByTagName('LOCATION').item(0)
			track.dir = location.getAttribute('DIR')
			track.file = location.getAttribute('FILE')
			track.volume = location.getAttribute('VOLUME')
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
			// console.log(dir)
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
					<SetSelectionDetail style={{marginRight:10, marginBottom:10}}/>
					<TrackDetail style={{marginBottom:10}} track={selectedCollectionTrack}
					/>
				</div>
				<div style={{...tableRow}}>
					<div style={{...tableRowItem, height:height -470, width:0, marginRight:10}}>
						<DJSet tracks={zet}/>
					</div>
					<div style={{...tableRowItem, width:0}}>
						<Collection tracks={collection} height={height -430}
										collectionTrackSelected={collectionTrackSelected} />
					</div>
				</div>
			</div>
	)
}

export default App
