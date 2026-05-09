import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated, Easing,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, ShoppingBag, Plus, Package, PiggyBank } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import DashboardScreen from '../screens/DashboardScreen';
import SellScreen from '../screens/SellScreen';
import InventoryScreen from '../screens/InventoryScreen';
import FinanceScreen from '../screens/FinanceScreen';
import ExpenseModal from '../components/ExpenseModal';

const Tab = createBottomTabNavigator();

function EmptyScreen() {
  return <View />;
}

function CustomTabBar({ state, descriptors, navigation, T, dark, onFABPress }) {
  const insets = useSafeAreaInsets();
  const bobAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, {
          toValue: -7,
          duration: 1750,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(bobAnim, {
          toValue: 0,
          duration: 1750,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, []);

  const barBg = dark ? T.cardSurface : T.surface;

  return (
    <View
      style={[
        styles.bar,
        {
          paddingBottom: insets.bottom + 8,
          backgroundColor: barBg,
          borderTopColor: T.line,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isFAB = route.name === 'Add';

        if (isFAB) {
          return (
            <Animated.View
              key="fab"
              style={[styles.fabWrap, { transform: [{ translateY: bobAnim }] }]}
            >
              <TouchableOpacity
                onPress={onFABPress}
                activeOpacity={0.85}
                style={[
                  styles.fab,
                  {
                    backgroundColor: T.primary,
                    shadowColor: T.primary,
                    borderColor: barBg,
                  },
                ]}
              >
                <Plus color="#fff" size={34} strokeWidth={2.8} />
                <View
                  style={[
                    styles.diamond,
                    { backgroundColor: T.butter, borderColor: barBg },
                  ]}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        }

        const label =
          typeof options.tabBarLabel === 'string' ? options.tabBarLabel : route.name;
        const icon = options.tabBarIcon?.({
          color: isFocused ? T.primary : T.ink3,
          size: 27,
          focused: isFocused,
        });

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.tab}
          >
            <View
              style={[
                styles.iconWrap,
                isFocused && { backgroundColor: T.primarySoft },
              ]}
            >
              {icon}
            </View>
            <Text style={[styles.label, { color: isFocused ? T.primary : T.ink3 }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
  fabWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
  },
  fab: {
    width: 66,
    height: 66,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  diamond: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 14,
    height: 14,
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
    borderWidth: 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 11,
    marginTop: 2,
  },
});

export default function TabNavigator() {
  const { T, dark } = useTheme();
  const [expenseVisible, setExpenseVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        tabBar={(props) => (
          <CustomTabBar
            {...props}
            T={T}
            dark={dark}
            onFABPress={() => setExpenseVisible(true)}
          />
        )}
        screenOptions={{ headerShown: false }}
        initialRouteName="Dashboard"
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Главная',
            tabBarIcon: ({ color, focused }) => (
              <Home size={27} color={color} strokeWidth={focused ? 2.8 : 2} />
            ),
          }}
        />
        <Tab.Screen
          name="Sell"
          component={SellScreen}
          options={{
            tabBarLabel: 'Продать',
            tabBarIcon: ({ color, focused }) => (
              <ShoppingBag size={27} color={color} strokeWidth={focused ? 2.8 : 2} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={EmptyScreen}
          options={{ tabBarLabel: '' }}
        />
        <Tab.Screen
          name="Inventory"
          component={InventoryScreen}
          options={{
            tabBarLabel: 'Склад',
            tabBarIcon: ({ color, focused }) => (
              <Package size={27} color={color} strokeWidth={focused ? 2.8 : 2} />
            ),
          }}
        />
        <Tab.Screen
          name="Finance"
          component={FinanceScreen}
          options={{
            tabBarLabel: 'Финансы',
            tabBarIcon: ({ color, focused }) => (
              <PiggyBank size={27} color={color} strokeWidth={focused ? 2.8 : 2} />
            ),
          }}
        />
      </Tab.Navigator>
      <ExpenseModal visible={expenseVisible} onClose={() => setExpenseVisible(false)} />
    </>
  );
}
