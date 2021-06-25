import React, {useState, useEffect, PropsWithChildren} from 'react';

import {Cell, Column, Table, Utils} from "@blueprintjs/table";

import styles, {css} from '../styles'
import Track from "../data/Track";

interface IDJSetTable {
	columns?: JSX.Element[];
	data?: any[];
	enableColumnInteractionBar?: boolean;
}


const DJSET_TABLE_DATA = [
	["Track 1", "C", "C", "E", "G", "", ""],
	["Track X", "C#m", "C#", "E", "G#", "", ""],
	["Hello", "F#sus","D", "F#", "B", "", ""],
	["Feel It", "D#6", "D#", "F#", "A", "", ""],
	["The Last Sunday", "Am", "C", "E", "A", "", ""],
	["Phoenix", "C", "C", "E", "G", "", ""],
	["B", "C#m", "C#", "E", "G#", "", ""],
	["C", "F#sus","D", "F#", "B", "", ""],
	["D", "D#6", "D#", "F#", "A", "", ""],
	["A", "Am", "C", "E", "A", "", ""],
	["Track 1", "C", "C", "E", "G", "", ""],
	["Track X", "C#m", "C#", "E", "G#", "", ""],
	["Hello", "F#sus","D", "F#", "B", "", ""],
	["Feel It", "D#6", "D#", "F#", "A", "", ""],
	["The Last Sunday", "Am", "C", "E", "A", "", ""],
	["Phoenix", "C", "C", "E", "G", "", ""],
	["B", "C#m", "C#", "E", "G#", "", ""],
	["C", "F#sus","D", "F#", "B", "", ""],
	["D", "D#6", "D#", "F#", "A", "", ""],
	["A", "Am", "C", "E", "A", "", ""],
	["Track 1", "C", "C", "E", "G", "", ""],
	["Track X", "C#m", "C#", "E", "G#", "", ""],
	["Hello", "F#sus","D", "F#", "B", "", ""],
	["Feel It", "D#6", "D#", "F#", "A", "", ""],
	["The Last Sunday", "Am", "C", "E", "A", "", ""],
	["Phoenix", "C", "C", "E", "G", "", ""],
	["B", "C#m", "C#", "E", "G#", "", ""],
	["C", "F#sus","D", "F#", "B", "", ""],
	["D", "D#6", "D#", "F#", "A", "", ""],
	["A", "Am", "C", "E", "A", "", ""],
].map(([track, clazz, base, interval, chord, extension, complex]) =>
		({track, clazz, base, interval, chord, extension, complex}));

export default function DJSet(props: PropsWithChildren<any> & {tracks:Track[]}) {

	const [tracks, setTracks] = useState(props.tracks)

	useEffect(() => {
		console.log('props.tracks set')
		console.log('props.tracks: ', props.tracks)
		console.log('tracks: ', tracks)
		setTracks(props.tracks)
	},[props.tracks])

	useEffect(() => {
		// console.log('tracks: ', props.tracks)
		console.log('tracks set')
	},[tracks])

	const getDjsetCellRenderer = (key: string) => {
		// const trax = tracks.map()
		// console.log('cell: ', tracks)
		// @ts-ignore
		// if(!props.tracks[0]) {
		// 	console.log(props.tracks)
		// 	return
		// }
		return (row: number) => <Cell><code>{props.tracks[row][key]}</code></Cell>;
	}

	const handleColumnsReordered = (oldIndex: number, newIndex: number, length: number) => {
		if (oldIndex === newIndex) {
			return;
		}
		// @ts-ignore
		const nextChildren = Utils.reorderArray(tableData, oldIndex, newIndex, length);
		// @ts-ignore
		setTable({columns: nextChildren});
	};

	const handleRowsReordered = (oldIndex: number, newIndex: number, length: number) => {
		if (oldIndex === newIndex) {
			return;
		}
		// @ts-ignore
		setDjsetData({data: Utils.reorderArray(djsetData, oldIndex, newIndex, length)});
	}

	const [djsetData, setDjsetData] = useState(DJSET_TABLE_DATA)

	const djsetColumns = [
		// these cellRenderers are only created once and then cloned on updates
		<Column key="1" name="Title" cellRenderer={getDjsetCellRenderer("title")}/>,
		<Column key="2" name="Artist" cellRenderer={getDjsetCellRenderer("artist")}/>,
		<Column key="3" name="BPM" cellRenderer={getDjsetCellRenderer("bpm")}/>,
		<Column key="4" name="KEY" cellRenderer={getDjsetCellRenderer("key")}/>,
		<Column key="5" name="Genre" cellRenderer={getDjsetCellRenderer("genre")}/>,
		<Column key="6" name="MusKey" cellRenderer={getDjsetCellRenderer("musical_key")}/>,
		<Column key="7" name="QBPM" cellRenderer={getDjsetCellRenderer("bpm_quality")}/>,
	]

	useEffect(() => {
		// const { enableColumnInteractionBar } = this.state;
		// if (nextState.enableColumnInteractionBar !== enableColumnInteractionBar) {
		// 	const nextColumns = React.Children.map(this.state.columns, (column: JSX.Element) => {
		// 		return React.cloneElement(column, { enableColumnInteractionBar });
		// 	});
		// 	this.setState({ columns: nextColumns });
		// }
	},[])


	return (
			<>

			<Table
						// enableColumnReordering={true}
						enableColumnResizing={false}
						enableRowReordering={true}
						enableRowResizing={false}
						numRows={tracks.length}
						onColumnsReordered={handleColumnsReordered}
						onRowsReordered={handleRowsReordered}
						columnWidths={[300, 70, 70, 70, 70, 70, 70]}
				>
					{djsetColumns}
				</Table>
			</>
	)


}