import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Animated, Easing, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Filter, AlertTriangle, Sparkles } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { INVENTORY_ITEMS } from '../data/mockData';

function FadeUp({ index, children, style }) {
  if (Platform.OS === 'web') {
    return <View style={style}>{children}</View>;
  }

  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, duration: 380,
        delay: index * 70, useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(ty, {
        toValue: 0, duration: 380,
        delay: index * 70, useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY: ty }] }]}>
      {children}
    </Animated.View>
  );
}

function Badge({ children, tone }) {
  return (
    <View style={[styles.badge, { backgroundColor: tone.bg }]}>
      <Text style={[styles.badgeText, { color: tone.fg }]}>{children}</Text>
    </View>
  );
}

export default function InventoryScreen() {
  const { T, dark } = useTheme();
  const insets = useSafeAreaInsets();

  const sparkAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkAnim, { toValue: 1, duration: 1300, useNativeDriver: true }),
        Animated.timing(sparkAnim, { toValue: 0, duration: 1300, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const sparkScale = sparkAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] });
  const sparkRotate = sparkAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '14deg'] });

  const lowCount = INVENTORY_ITEMS.filter((it) => it.low).length;
  const totalStock = INVENTORY_ITEMS.reduce((s, it) => s + it.stock, 0);
  const cardBg = dark ? T.cardSurface : T.surface;

  return (
    <View style={[styles.root, { backgroundColor: T.bg }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120, paddingTop: insets.top }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <FadeUp index={0} style={styles.header}>
          <View>
            <Text style={[styles.subtitle, { color: T.ink2 }]}>
              все твои товары 📦
            </Text>
            <Text style={[styles.title, { color: T.ink }]}>Склад</Text>
          </View>
          <View
            style={[
              styles.filterBtn,
              { backgroundColor: cardBg, borderColor: T.line },
            ]}
          >
            <Filter size={20} strokeWidth={2.2} color={T.ink} />
          </View>
        </FadeUp>

        {/* Summary cards */}
        <FadeUp index={1} style={styles.summaryRow}>
          {/* Total */}
          {dark && T.metricGrad1 ? (
            <LinearGradient
              colors={T.metricGrad1}
              style={[styles.summaryCard, { borderColor: T.mint + '40' }]}
            >
              <Text style={[styles.summaryLabel, { color: T.mint }]}>
                ВСЕГО ТОВАРОВ
              </Text>
              <View style={styles.summaryValueRow}>
                <Text style={[styles.summaryValue, { color: T.ink }]}>
                  {totalStock}
                </Text>
                <Animated.View
                  style={{ transform: [{ scale: sparkScale }, { rotate: sparkRotate }] }}
                >
                  <Sparkles size={12} color={T.mint} strokeWidth={2.5} />
                </Animated.View>
              </View>
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.summaryCard,
                { backgroundColor: T.mintSoft, borderColor: T.mint + '40' },
              ]}
            >
              <Text style={[styles.summaryLabel, { color: T.mint }]}>
                ВСЕГО ТОВАРОВ
              </Text>
              <View style={styles.summaryValueRow}>
                <Text style={[styles.summaryValue, { color: T.ink }]}>
                  {totalStock}
                </Text>
                <Animated.View
                  style={{ transform: [{ scale: sparkScale }, { rotate: sparkRotate }] }}
                >
                  <Sparkles size={12} color={T.mint} strokeWidth={2.5} />
                </Animated.View>
              </View>
            </View>
          )}

          {/* Low stock */}
          {dark && T.metricGrad2 ? (
            <LinearGradient
              colors={T.metricGrad2}
              style={[styles.summaryCard, { borderColor: T.coral + '40' }]}
            >
              <View style={styles.summaryLabelRow}>
                <AlertTriangle size={11} color={T.coral} strokeWidth={2.6} />
                <Text style={[styles.summaryLabel, { color: T.coral }]}>
                  ЗАКАНЧИВАЕТСЯ
                </Text>
              </View>
              <Text style={[styles.summaryValue, { color: T.coral, marginTop: 2 }]}>
                {lowCount} позиции
              </Text>
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.summaryCard,
                { backgroundColor: T.coralSoft, borderColor: T.coral + '40' },
              ]}
            >
              <View style={styles.summaryLabelRow}>
                <AlertTriangle size={11} color={T.coral} strokeWidth={2.6} />
                <Text style={[styles.summaryLabel, { color: T.coral }]}>
                  ЗАКАНЧИВАЕТСЯ
                </Text>
              </View>
              <Text style={[styles.summaryValue, { color: T.coral, marginTop: 2 }]}>
                {lowCount} позиции
              </Text>
            </View>
          )}
        </FadeUp>

        {/* Item cards */}
        <View style={styles.list}>
          {INVENTORY_ITEMS.map((it, i) => {
            const tone = T[it.color + 'Soft'] || T.primarySoft;
            const fandomTone = { bg: T.lavenderSoft, fg: T.lavender };
            const typeTone = { bg: T.skySoft, fg: T.sky };

            return (
              <FadeUp key={it.name} index={2 + i}>
                <View
                  style={[
                    styles.itemCard,
                    {
                      backgroundColor: cardBg,
                      borderColor: it.low ? T.coral + '55' : T.line,
                      borderWidth: it.low ? 2 : 1.5,
                      shadowColor: '#000',
                    },
                  ]}
                >
                  {it.low && (
                    <View
                      style={[
                        styles.lowBadge,
                        { backgroundColor: T.coralSoft },
                      ]}
                    >
                      <AlertTriangle size={10} color={T.coral} strokeWidth={2.6} />
                      <Text style={[styles.lowBadgeText, { color: T.coral }]}>
                        мало!
                      </Text>
                    </View>
                  )}
                  <View style={[styles.itemEmoji, { backgroundColor: tone }]}>
                    <Text style={{ fontSize: 34 }}>{it.emoji}</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemName, { color: T.ink }]}>{it.name}</Text>
                    <View style={styles.itemBadges}>
                      <Badge tone={fandomTone}>{it.fandom}</Badge>
                      <Badge tone={typeTone}>{it.type}</Badge>
                    </View>
                    <View style={styles.itemStockRow}>
                      <Text
                        style={[
                          styles.itemStockNum,
                          { color: it.low ? T.coral : T.ink },
                        ]}
                      >
                        {it.stock}
                      </Text>
                      <Text
                        style={[
                          styles.itemStockLabel,
                          { color: it.low ? T.coral : T.ink2 },
                        ]}
                      >
                        в наличии
                      </Text>
                    </View>
                  </View>
                </View>
              </FadeUp>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 8,
  },
  subtitle: { fontSize: 13, fontFamily: 'Nunito_600SemiBold' },
  title: { fontFamily: 'Comfortaa_700Bold', fontSize: 28, marginTop: 2 },
  filterBtn: {
    width: 46, height: 46,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    paddingBottom: 14,
    borderWidth: 1.5,
  },
  summaryLabel: {
    fontSize: 10,
    fontFamily: 'Nunito_800ExtraBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  summaryValueRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  summaryValue: {
    fontFamily: 'Comfortaa_700Bold',
    fontSize: 22,
  },
  list: { paddingHorizontal: 16, gap: 10 },
  itemCard: {
    borderRadius: 22,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  lowBadge: {
    position: 'absolute',
    top: 10, right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 999,
  },
  lowBadgeText: { fontSize: 10, fontFamily: 'Nunito_800ExtraBold' },
  itemEmoji: {
    width: 72, height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: { fontSize: 15, fontFamily: 'Nunito_700Bold', lineHeight: 20 },
  itemBadges: { flexDirection: 'row', gap: 6, marginTop: 6, flexWrap: 'wrap' },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  badgeText: { fontSize: 11, fontFamily: 'Nunito_800ExtraBold', letterSpacing: 0.1 },
  itemStockRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 8,
  },
  itemStockNum: { fontFamily: 'Comfortaa_700Bold', fontSize: 19 },
  itemStockLabel: { fontSize: 12, fontFamily: 'Nunito_600SemiBold' },
});
