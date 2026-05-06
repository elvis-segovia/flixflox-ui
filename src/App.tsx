import { ConfigProvider, theme } from "antd"
import { MainMenu } from "./components"
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";
import { menuItems } from "./constants";
import { useTheme } from "./components/theme/themeProvider";
import { lightTheme, darkTheme } from "./components/theme/themeConfig";

type MenuItem = Required<MenuProps>['items'][number];

const getMenuChildren = (item: any) => {
	if (item.children) {
		const { children, ...rest } = item;
		const childrenItems = children.filter((child: any) => child.show === 'true').map(getMenuChildren)
		if (childrenItems.length === 0) {
			return {
				...rest,
				label: rest.to ? <Link to={rest.to}>{rest.label}</Link> : rest.label
			}
		} else {
			return {
				...item,
				children: childrenItems
			};

		}
	}

	if (item.type) {
		return item
	}

	return item.show === 'false' ? null : {
		...item,
		label: item.to ? <Link to={item.to}>{item.label}</Link> : item.label
	};

}

const items: MenuItem[] = menuItems.map((item) => {
	return getMenuChildren(item);
});

function App() {
	const { mode } = useTheme();
	const themeConfig = mode === 'dark' ? darkTheme : lightTheme;

	return (
		<ConfigProvider
			theme={{
				...themeConfig,
				algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
			}}
		>
			<MainMenu menuItems={items} />
		</ConfigProvider>
	)
}

export default App
