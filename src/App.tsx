
import React, { useState } from 'react';
import CenterFlex from './CenterFlex';
import { useTheme, Box } from '@chakra-ui/core';
import Pace2Speed from './Pace2Speed';
import Calculator from './Calculator';
import Switch from './Switch';


const App = () => {
	const theme = useTheme();
	const [selected, setSelected] = useState<string | number | undefined>();
	return <>
		<CenterFlex h="100vh" w="100vw" className="App" flexDirection="row" bg={theme.colors.gray[900]}>
			<Box w="20vw">
				<Switch choices={['Pace2Speed', 'Calculator']} defaultChoice="Pace2Speed" value={selected} onChange={val => setSelected(val)}/>
			</Box>
        	<CenterFlex h="100vh" w="85vmin" alignItems="stretch">
				{selected === 'Pace2Speed' ? <Pace2Speed /> : <Calculator />}
			</CenterFlex>
		</CenterFlex>
	</>;
}
export default App;