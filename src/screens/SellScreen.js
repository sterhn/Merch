import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Plus, Minus, ShoppingBag } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { ALL_ITEMS, SELL_FILTERS } from '../data/mockData';

function CartBounce({ count, T }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevCount = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current) {
      prevCount.current = count;
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.25, duration: 112, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20 }),
      ]).start();
    }
  }, [count]);

  return (
    <Animated.View
      style={[
        styles.badge,
        { backgroundColor: T.butter, borderColor: T.ink, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Text style={[styles.badgeText, { color: T.ink }]}>{count}</Text>
    </Animated.View>
  );
}

export default function SellScreen() {
  const { T, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('Все');
  const [counts, setCounts] = useState({});

  const items =
    activeFilter === 'Все'
      ? ALL_ITEMS
      : ALL_ITEMS.filter((it) => it.type === activeFilter);

  const inc = (name) =>
    setCounts((c) => ({ ...c, [name]: (c[name] || 0) + 1 }));
  const dec = (name) =>
    setCounts((c) => ({ ...c, [name]: Math.max(0, (c[name] || 0) - 1) }));

  const cartCount = Object.values(counts).reduce((a, b) => a + b, 0);
  const cartTotal = ALL_ITEMS.reduce(
    (sum, it) => sum + it.price * (counts[it.name] || 0),
    0
  );

  const cardBg = dark ? T.cardSurface : T.surface;

  return (
    <View style={[styles.root, { backgroundColor: T.bg }]}>
      <View style={{ paddingTop: insets.top }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.subtitle, { color: T.ink2 }]}>
            нажми, чтобы добавить 🛍️
          </Text>
          <Text style={[styles.title, { color: T.ink }]}>Давай продавать!</Text>
        </View>

        {/* Search bar */}
        <View style={[styles.searchBar, { backgroundColor: cardBg, borderColor: T.line }]}>
          <Search size={19} color={T.ink3} strokeWidth={2.2} />
          <Text style={[styles.searchPlaceholder, { color: T.ink3 }]}>
            Ищешь что-то?
          </Text>
        </View>

        {/* Filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {SELL_FILTERS.map((f) => {
            const isA = f === activeFilter;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setActiveFilter(f)}
                activeOpacity={0.7}
                style={[
                  styles.pill,
                  isA
                    ? { backgroundColor: T.primary, borderColor: 'transparent' }
                    : { backgroundColor: cardBg, borderColor: T.line },
                ]}
              >
                <Text
                  style={[
                    styles.pillText,
                    { color: isA ? '#fff' : T.ink2 },
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Item list */}
      <ScrollView
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: cartCount > 0 ? 200 : 130 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {items.map((it) => {
          const tone = T[it.color + 'Soft'] || T.primarySoft;
          const count = counts[it.name] || 0;
          return (
            <View
              key={it.name}
              style={[
                styles.itemCard,
                {
                  backgroundColor: cardBg,
                  borderColor: count ? T.primary : T.line,
                  borderWidth: count ? 2 : 1.5,
                  shadowColor: '#000',
                },
              ]}
            >
              <View style={[styles.itemEmoji, { backgroundColor: tone }]}>
                <Text style={{ fontSize: 27 }}>{it.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.itemName, { color: T.ink }]}>{it.name}</Text>
                <View style={styles.itemMeta}>
                  <Text style={[styles.itemPrice, { color: T.primary }]}>
                    ${it.price}
                  </Text>
                  <Text style={[styles.itemStock, { color: T.ink3 }]}>
                    · {it.stock} шт.
                  </Text>
                </View>
              </View>

              {count > 0 ? (
                <View style={[styles.stepper, { backgroundColor: T.primarySoft }]}>
                  <TouchableOpacity
                    onPress={() => dec(it.name)}
                    style={styles.stepBtn}
                    activeOpacity={0.7}
                  >
                    <Minus size={20} color={T.primary} strokeWidth={2.8} />
                  </TouchableOpacity>
                  <Text style={[styles.stepCount, { color: T.primary }]}>{count}</Text>
                  <TouchableOpacity
                    onPress={() => inc(it.name)}
                    style={[styles.stepPlusBtn, { backgroundColor: T.primary }]}
                    activeOpacity={0.7}
                  >
                    <Plus size={20} color="#fff" strokeWidth={2.8} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => inc(it.name)}
                  activeOpacity={0.7}
                  style={[
                    styles.addBtn,
                    { backgroundColor: T.primarySoft, borderColor: T.primaryBorder },
                  ]}
                >
                  <Plus size={24} color={T.primary} strokeWidth={2.8} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Cart bar */}
      {cartCount > 0 && (
        <View
          style={[
            styles.cartBar,
            {
              backgroundColor: T.ink,
              bottom: 94 + insets.bottom,
            },
          ]}
        >
          <View style={styles.cartLeft}>
            <View style={[styles.cartIconWrap, { backgroundColor: T.primary }]}>
              <ShoppingBag size={20} color="#fff" strokeWidth={2.4} />
              <CartBounce count={cartCount} T={T} />
            </View>
            <View>
              <Text style={[styles.cartHint, { color: T.bg + 'AA' }]}>твоя корзина</Text>
              <Text style={[styles.cartTotal, { color: T.bg }]}>${cartTotal}.00</Text>
            </View>
          </View>
          <View style={[styles.cartBtn, { backgroundColor: T.primary }]}>
            <Text style={styles.cartBtnText}>Оформить →</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 12 },
  subtitle: { fontSize: 13, fontFamily: 'Nunito_600SemiBold' },
  title: {
    fontFamily: 'Comfortaa_700Bold',
    fontSize: 28,
    letterSpacing: -0.4,
    marginTop: 2,
  },
  searchBar: {
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  searchPlaceholder: { fontSize: 15, fontFamily: 'Nunito_600SemiBold' },
  filterScroll: { marginBottom: 2 },
  filterContent: { paddingHorizontal: 20, paddingBottom: 10, gap: 8 },
  pill: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  pillText: { fontSize: 13, fontFamily: 'Nunito_700Bold' },
  listContent: { paddingHorizontal: 16, paddingTop: 2 },
  itemCard: {
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    minHeight: 72,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  itemEmoji: {
    width: 54, height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemName: { fontSize: 15, fontFamily: 'Nunito_700Bold', lineHeight: 20 },
  itemMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  itemPrice: { fontFamily: 'Comfortaa_700Bold', fontSize: 17 },
  itemStock: { fontSize: 11, fontFamily: 'Nunito_600SemiBold' },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 3,
  },
  stepBtn: {
    width: 38, height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCount: {
    fontFamily: 'Comfortaa_700Bold',
    fontSize: 19,
    minWidth: 26,
    textAlign: 'center',
  },
  stepPlusBtn: {
    width: 38, height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    width: 50, height: 50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5, right: -5,
    width: 20, height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 10, fontFamily: 'Nunito_800ExtraBold' },
  cartBar: {
    position: 'absolute',
    left: 16, right: 16,
    borderRadius: 22,
    padding: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.28,
    shadowRadius: 30,
    elevation: 12,
  },
  cartLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cartIconWrap: {
    width: 42, height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartHint: { fontSize: 11, fontFamily: 'Nunito_600SemiBold' },
  cartTotal: { fontFamily: 'Comfortaa_700Bold', fontSize: 18 },
  cartBtn: {
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 20,
  },
  cartBtnText: { color: '#fff', fontSize: 14, fontFamily: 'Nunito_800ExtraBold' },
});
