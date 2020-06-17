
import React, { useState } from 'react';
import CenterFlex from './CenterFlex';
import { useTheme, Box } from '@chakra-ui/core';
import Pace2Speed from './Pace2Speed';
import Calculator from './Calculator';
import Switch from './Switch';


const App = () => {
	const theme = useTheme();
	const [selected, setSelected] = useState<string | number | undefined>(0);
	return <>
		<CenterFlex h="100vh" w="100vw" className="App" flexDirection={["column", "column", "row"]} bg={theme.colors.gray[900]}>
			<Box w={["80vw", "80vw", "40vw"]} ml={[null, null, "5vmin"]}>
				<Switch choices={['Pace2Speed', 'Calculator']} value={selected} onChange={val => setSelected(val)}/>
			</Box>
        	<CenterFlex m="5vmin" h={["auto", "auto", "100vh"]} w={["85vmin", "85vmin", "60vw"]} alignItems="stretch">
				{selected === 0 ? <Pace2Speed /> : <Calculator />}
			</CenterFlex>
		</CenterFlex>
	</>;
}
export default App;