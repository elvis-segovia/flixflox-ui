import { ConfigProvider } from "antd"
import { MainMenu } from "./components"
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";
import { menuItems } from "./constants";

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
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#2563eb',
					colorSuccess: '#10b981',
					colorWarning: '#f59e0b',
					colorError: '#ef4444',
					colorInfo: '#3b82f6',
					borderRadius: 6,
				},
				components: {
					Layout: {
						siderBg: '#1e293b',
						headerBg: '#ffffff',
						bodyBg: '#f8fafc',
					},
					Menu: {
						subMenuItemBg: '#1e293b',
						darkItemBg: '#1e293b',
						darkItemColor: '#94a3b8',
						darkItemSelectedColor: '#ffffff',
						darkItemHoverColor: '#e2e8f0',
						itemBg: '#1e293b',
						itemSelectedBg: '#2563eb',
						itemHoverBg: '#334155',
						itemBorderRadius: 0
					}
				}
			}}
		>
			<MainMenu menuItems={items} />
		</ConfigProvider>
	)
}

export default App
