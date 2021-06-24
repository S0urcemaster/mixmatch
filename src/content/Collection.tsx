import React, {useState, useEffect, PropsWithChildren} from 'react';

import {Cell, Column, Table, Utils} from "@blueprintjs/table";

import styles, {css} from '../styles'

interface IDJSetTable {
	columns?: JSX.Element[];
	data?: any[];
	enableColumnInteractionBar?: boolean;
}

const COLLECTION_TABLE_DATA = [
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

export default function DJSet(props: PropsWithChildren<any>) {

	const getCollectionCellRenderer = (key: string) => {
		// @ts-ignore
		return (row: number) => <Cell><code>{data[row][key]}</code></Cell>;
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

	const [data, setData] = useState(COLLECTION_TABLE_DATA)

	const proposalColumns = [
		// these cellRenderers are only created once and then cloned on updates
		<Column key="1" name="Track" cellRenderer={getCollectionCellRenderer("track")}/>,
		<Column key="2" name="Class" cellRenderer={getCollectionCellRenderer("clazz")}/>,
		<Column key="3" name="Base" cellRenderer={getCollectionCellRenderer("base")}/>,
		<Column key="4" name="Interval" cellRenderer={getCollectionCellRenderer("interval")}/>,
		<Column key="5" name="Chord" cellRenderer={getCollectionCellRenderer("chord")}/>,
		<Column key="6" name="Extension" cellRenderer={getCollectionCellRenderer("extension")}/>,
		<Column key="7" name="Complex" cellRenderer={getCollectionCellRenderer("complex")}/>,
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
				<Table
						// enableColumnReordering={true}
						enableColumnResizing={false}
						enableRowReordering={true}
						enableRowResizing={false}
						numRows={data.length}
						onColumnsReordered={handleColumnsReordered}
						onRowsReordered={handleRowsReordered}
						columnWidths={[300, 70, 70, 70, 70, 70, 70]}
				>
					{proposalColumns}
				</Table>
	)


}