export interface ITabsNavigationScreen {
  id: number;
  screenName: string;
  title: string;
  tabBarTestID: string;
  icon: (color: string, focused: boolean) => React.JSX.Element;
  header: any;
}
