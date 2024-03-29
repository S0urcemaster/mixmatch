import Match from './Match'

export default class Track {
	id:number
	modified_date:string
	modified_time:string
	title:string
	artist:string
	dir:string
	file:string
	volume:string
	volumeid:string
	album:string
	album_track: string
	bitrate:string
	genre:string
	key:string
	playcount:string
	playtime:string
	playtime_float:string
	import_date:string
	last_played:string
	flags:string
	bpm:string
	bpm_quality:string
	peak_db:string
	perceived_db:string
	analyzed_db:string
	musical_key:string
	
	// Active keys on keyboard
	keys:number[] = []
	
	// Track matches
	trackMatches:Match[] = []
	
	comment:string
	
}