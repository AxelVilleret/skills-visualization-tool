import { localStorageService } from "./LocalStorageService";
import { LOCAL_STORAGE_KEYS } from "../constants";

const sortTabs = (tabs) => {
	const savedTabsArray = localStorageService.getItem(LOCAL_STORAGE_KEYS.TAB_ORDER);

	if (savedTabsArray) {
		const sortedTabs = Array(savedTabsArray.length);

		savedTabsArray.forEach((tabName, index) => {
			sortedTabs[index] = tabs.find((tab) => tab.title === tabName) || null;
		});

		return sortedTabs;
	}

	return tabs;
};

export { sortTabs };
