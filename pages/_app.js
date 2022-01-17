import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { CookiesProvider } from 'react-cookie';
import Layout from './../components/Layout';
const theme = createTheme({
	palette: {
		primary: {
			main: '#F9675C',
		},
		// secondary: white
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

export default MyApp;
