import React, {useState, useEffect} from 'react';
import { Button, RadioButtonGroup } from '@chakra-ui/core';

enum PositionRole {
	TOP,
	BOTTOM,
	OTHER
};

const CustomRadio = React.forwardRef((props: any, ref) => {
	const { isChecked, isDisabled, value, posRole, ...rest } = props;
	const modifier = posRole === PositionRole.TOP ?
	{borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px"} :
	posRole === PositionRole.BOTTOM ?
	{borderTopLeftRadius: "0px", borderTopRightRadius: "0px"} :
	{borderRadius: "0px"};
	return (
	  <Button
		ref={ref}
		variantColor={isChecked ? "green" : "gray"}
		aria-checked={isChecked}
		role="radio"
		isDisabled={isDisabled}
		{...rest}
		size="lg"
		marginBottom="0px"
		{...modifier}
	  />
	);
  });

interface SwitchProps {
	choices: Array<string>
	value: string | number | undefined
	onChange: (val: string | number | undefined) => void
	defaultChoice?: string
}

const Switch = (props: SwitchProps) => {
	
	const radioChildren = props.choices.map((choice, idx) => 
	<CustomRadio
		value={idx}
		key={idx}
		posRole={idx === 0 ? PositionRole.TOP : idx === props.choices.length-1 ? PositionRole.BOTTOM : PositionRole.OTHER}
	>
		{choice}
	</CustomRadio>);
	return (
		<RadioButtonGroup
		  value={props.value}
		  onChange={props.onChange}
		  display="flex"
		  flexDirection="column"
		  w="100%"
		  h="100%"
		>
		  {radioChildren}
		</RadioButtonGroup>
	  );
}
export default Switch;