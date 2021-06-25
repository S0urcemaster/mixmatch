// import { contextBridge } from 'electron'

import React, {useEffect, useState} from 'react';

import { Button,Divider } from "@blueprintjs/core";

import './App.css'

import styles, {css} from './styles'

import { useWindowSize } from './lib/WindowSizeHook'

import com from './main/processcom'
import Track from "./data/Track";

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
	boxSizing:'border-box',
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

	useEffect(() => {
		// console.log(width, height)
	},[width, height])

	useEffect(() => {
		// console.log(window)
		// console.log(window.myAPI)
		// window.api.receive("fromMain", (data: any) => {
		// 	console.log(`Received ${data} from main process`);
		// });
		window.api.receive(com.pick_file, (data: string) => filePicked(data));
		window.api.receive(com.read_nml, (data: string) => fileRead(data));
		// window.api.send("toMain", "some data");
	},[])

	const [tracks, setTracks] = useState([])

	function importSet() {
		console.log('importSet')
		window.api.send(com.pick_file, undefined);
	}

	function filePicked(filename:string) {
		console.log('file picked: ', filename);
		window.api.send(com.read_nml, filename)
	}

	function fileRead(data:any) {
		// console.log('fileRead: ', data)
		const parser = new DOMParser()
		const doc = parser.parseFromString(data, "application/xml");
		const entries = doc.getElementsByTagName('COLLECTION').item(0).getElementsByTagName('ENTRY')
		const trax = []
		for(let i = 0; i< entries.length; i++) {
			const entry = entries.item(i)
			console.log(entry)
			const track = new Track();
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
		console.log(trax)
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
					<CollectionSelectionDetail style={{marginBottom:10}}/>
				</div>
				<div style={{...detailsRow}}>
					<SetActions style={{marginRight:10}}/>
					<CollectionActions style={{}}/>
				</div>
				<div style={{...tableRow}}>
					<div style={{...tableRowItem, height:height -470, width:0, marginRight:10}}>
						<DJSet/>
					</div>
					<div style={{...tableRowItem, height:height -470, width:0}}>
						<Collection/>
					</div>
				</div>
			</div>
	)
}

export default App
