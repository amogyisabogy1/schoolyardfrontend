import { MaterialHeaderButtons } from './MyHeaderButtons';
import { Item } from 'react-navigation-header-buttons';

React.useLayoutEffect(() => {
  navigation.setOptions({
    title: 'Demo',
    // use MaterialHeaderButtons with consistent styling across your app
    headerRight: () => (
      <MaterialHeaderButtons>
        <Item title="add" iconName="search" onPress={() => console.warn('add')} />
        <Item title="edit" onPress={() => console.warn('edit')} />
      </MaterialHeaderButtons>
    ),
  });
}, [navigation]);