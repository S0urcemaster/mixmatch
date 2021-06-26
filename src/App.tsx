// import { contextBridge } from 'electron'

import React, {useEffect, useState} from 'react';

import { Button,Divider } from "@blueprintjs/core";

import './App.css'

import styles, {css} from './styles'

import { useWindowSize } from './lib/WindowSizeHook'

import com from './main/processcom'
import Track from "./data/Track"

import DJSet from "./content/DJSet";
import Collection from "./content/Collection"
import SetSelectionDetail from "./content/SetSelectionDetail"
import CollectionSelectionDetail from "./content/CollectionSelectionDetail"
import PageHeader from "./content/PageHeader";
import SetHeader from "./content/SetHeader";
import CollectionHeader from "./content/CollectionHeader";
import SetActions from "./content/SetActions";
import CollectionActions from "./content/CollectionActions";


const app:css = {
	maxHeight:'84vh',
	height:'84vh',
	// width:'94vw',
	// boxSizing:'border-box',
	// overflow:'unset',
	// paddingBottom:10,
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

function App() {

	const [width, height] = useWindowSize();
	const audioCtx = new AudioContext();

	useEffect(() => {
		// console.log(width, height)
	},[width, height])

	const [zet, setZet] = useState([])
	const [collection, setCollection] = useState([])
	const [selectedCollectionTrack, setSelectedCollectionTrack] = useState(new Track())
	const [currentPlay, setCurrentPlay] = useState(null)
	const source:AudioBufferSourceNode = audioCtx.createBufferSource()

	useEffect(() => {
		// console.log('app: ', tracks)
	},[zet])

	useEffect(() => {
		window.api.receive(com.pick_file, (data: string) => filePicked(data))
		window.api.receive(com.read_nml, (data: string) => fileRed(data))
		window.api.receive(com.read_collection, (data: []) => collectionRed(data))
		window.api.receive(com.read_mp3, (data:any) => mp3Red(data.pop()))
		window.api.send(com.read_collection, undefined)
	},[])

	function importSet() {
		// console.log('importSet')
		window.api.send(com.pick_file, undefined);
	}

	function collectionRed(data: []) {
		// console.log('collection read', data)
		setCollection(data.pop())
	}

	function filePicked(filename:string) {
		// console.log('file picked: ', filename);
		window.api.send(com.read_nml, filename)
	}

	const mp3Red = (data:ArrayBuffer) => {
		console.log(data)
		// console.log('mp3Red', data)
		// setCurrentPlay(data)
		// source = audioCtx.createBufferSource() // Create sound source
		// console.log(source)
		// // const arrayBuffer = Uint8Array.from(data[0]).buffer
		// console.log(data)
		audioCtx.decodeAudioData(data, function(buffer){ // Create source buffer from raw binary
			source.buffer = buffer; // Add buffered data to object
			source.connect(audioCtx.destination); // Connect sound source to output
					source.start(audioCtx.currentTime); // play the source immediately
		},
				function(e) {
			console.log("Error with decoding audio data" + e.message)
		})
		console.log(source.buffer.length)
	}

	function collectionTrackSelected(track:Track) {
		setSelectedCollectionTrack(track)
		console.log(track.file)
		window.api.send(com.read_mp3, track.file)
	}

	function playCollection() {
		console.log('play', source.buffer.length)
		source.start(audioCtx.currentTime); // play the source immediately
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
					<CollectionHeader/>
				</div>
				<div style={{...detailsRow}}>
					<SetSelectionDetail style={{marginRight:10, marginBottom:10}}/>
					<CollectionSelectionDetail style={{marginBottom:10}} selected={selectedCollectionTrack}
														play={playCollection}/>
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
