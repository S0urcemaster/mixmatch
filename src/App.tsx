import React, {useEffect} from 'react';

import { Button,Divider } from "@blueprintjs/core";

import './App.css'

import styles, {css} from './styles'

import { useWindowSize } from './lib/WindowSizeHook'

// import DJSet from "./content/DJSet";
// import Collection from "./content/Collection"
// import SetSelectionDetail from "./content/SetSelectionDetail"
// import CollectionSelectionDetail from "./content/CollectionSelectionDetail"
import PageHeader from "./content/PageHeader";
import SetHeader from "./content/SetHeader";
// import CollectionHeader from "./content/CollectionHeader";
// import SetActions from "./content/SetActions";
// import CollectionActions from "./content/CollectionActions";

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

function App() {

	const [width, height] = useWindowSize();

	useEffect(() => {
		console.log(width, height)
	},[width, height])

	const importSet = () => {

	}

	return (
			<div style={{...app, height:height}}>
				<PageHeader/>
				<Divider style={{margin: 0}}/>
				<div style={{...headerRow}}>
					<SetHeader fileSelected={importSet}/>
					{/*<CollectionHeader/>*/}
				</div>
				{/*<div style={{...detailsRow}}>*/}
				{/*	<SetSelectionDetail style={{marginRight:10, marginBottom:10}}/>*/}
				{/*	<CollectionSelectionDetail style={{marginBottom:10}}/>*/}
				{/*</div>*/}
				{/*<div style={{...detailsRow}}>*/}
				{/*	<SetActions style={{marginRight:10}}/>*/}
				{/*	<CollectionActions style={{}}/>*/}
				{/*</div>*/}
				{/*<div style={{...tableRow}}>*/}
				{/*	<div style={{...tableRowItem, height:height -470, width:0, marginRight:10}}>*/}
				{/*		<DJSet/>*/}
				{/*	</div>*/}
				{/*	<div style={{...tableRowItem, height:height -470, width:0}}>*/}
				{/*		<Collection/>*/}
				{/*	</div>*/}
				{/*</div>*/}
			</div>
	)
}

export default App
