import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';

interface VerticalMenuProps {
  items: string[];
  onItemClick: (item: string) => void;
}

const VerticalMenu: React.FC<VerticalMenuProps> = ({ items, onItemClick }) => {


  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleMenu}>
        <Text style={styles.menuTrigger}>Menu</Text>
      </TouchableOpacity>
      {showMenu && (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onItemClick(item)}>
              <Text style={styles.menuItem}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.menu}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  menuTrigger: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#d3d3d3',
  },
  menu: {
    position: 'absolute',
    top: 40,
    left: 0,
    backgroundColor: '#f0f0f0',
    width: 200,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default VerticalMenu;
