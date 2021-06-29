
export interface INote {
	name:string
	value:number
}

export const notes:INote[] = [
	{name:'C', value:1},
	{name:'C#', value:2},
	{name:'D', value:3},
	{name:'D#', value:4},
	{name:'E', value:5},
	{name:'F', value:6},
	{name:'F#', value:7},
	{name:'G', value:8},
	{name:'G#', value:9},
	{name:'A', value:10},
	{name:'A#', value:11},
	{name:'B', value:12},
	{name:'-', value:13}
]

// export const notes = {c:1, cis:2, d:3, dis:4, e:5, f:6, fis:7, g:8, gis:9, a:10, ais:11, b:12}

export default class Keyboard {
	notes = [8][12]
}
