import React, {useState, PropsWithChildren} from 'react';

import { Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { MenuItem } from "@blueprintjs/core";

import { ItemRenderer } from "@blueprintjs/select";

import { genres, IGenre } from '../data/Genre'


const renderer:ItemRenderer<IGenre> = (genre:IGenre, {handleClick}) => {
	return (
			<MenuItem key={genre.name} text={genre.name} onClick={handleClick}/>
	)
}

const GenreSelect = Select.ofType<IGenre>()

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({initialNote: initialGenre, ...restProps}: PropsWithChildren<any>) {

	const [genre, setGenre] = useState(initialGenre ?? genres[0])

	const handleSelect = (newGenre:IGenre) => {
		console.log("test: " +newGenre)
		setGenre(newGenre)
	}

	return (
			<GenreSelect items={genres}
							itemRenderer = {renderer}
							onItemSelect = {handleSelect}
							filterable = {false}
							popoverProps = {{minimal: true}}
							inputProps = {restProps}
			>
				<Button
						// icon="film"
						rightIcon="caret-down"
						text={genre.name}
				/>
			</GenreSelect>
	)

}