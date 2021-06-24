import React, {useState, PropsWithChildren} from 'react';

import { Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { MenuItem } from "@blueprintjs/core";

import { ItemRenderer } from "@blueprintjs/select";

import { moods, IMood } from '../data/Mood'


const renderer:ItemRenderer<IMood> = (mood:IMood, {handleClick}) => {
	return (
			<MenuItem key={mood.name} text={mood.name} onClick={handleClick}/>
	)
}

const MoodSelect = Select.ofType<IMood>()

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({initialNote: initialMood, ...restProps}: PropsWithChildren<any>) {

	const [mood, setMood] = useState(initialMood ?? moods[0])

	const handleSelect = (newMood:IMood) => {
		console.log("test: " +newMood)
		setMood(newMood)
	}

	return (
			<MoodSelect items={moods}
							itemRenderer = {renderer}
							onItemSelect = {handleSelect}
							filterable = {false}
							popoverProps = {{minimal: true}}
							inputProps = {restProps}
			>
				<Button
						// icon="film"
						rightIcon="caret-down"
						text={mood.name}
				/>
			</MoodSelect>
	)

}