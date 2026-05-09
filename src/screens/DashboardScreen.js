import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Animated, Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, Sparkles, Heart } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { TOP_SELLERS } from '../data/mockData';

function FadeUp({ index, children, style }) {
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

export default function DashboardScreen() {
  const { T, dark } = useTheme();
  const insets = useSafeAreaInsets();

  const starAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(starAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(starAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const starScale = starAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] });
  const starRotate = starAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '14deg'] });

  const heroColors = dark && T.heroGrad
    ? T.heroGrad
    : [T.primary, T.primary + 'CC'];

  const topSellerBgs = [T.primarySoft, T.skySoft, T.lavenderSoft];

  return (
    <View style={[styles.root, { backgroundColor: T.bg }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120, paddingTop: insets.top }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <FadeUp index={0} style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: T.ink2 }]}>
              Привет! 👋
            </Text>
            <Text style={[styles.headTitle, { color: T.ink }]}>
              Аниме Бостон · День 2
            </Text>
          </View>
          <View
            style={[
              styles.bellBtn,
              {
                backgroundColor: dark ? T.cardSurface : T.surface,
                borderColor: T.line,
                shadowColor: T.shadowColor || '#000',
              },
            ]}
          >
            <Bell size={20} strokeWidth={2.3} color={T.ink} />
            <View style={[styles.bellDot, { backgroundColor: T.coral }]} />
          </View>
        </FadeUp>

        {/* Hero card */}
        <FadeUp index={1} style={styles.heroWrap}>
          <LinearGradient
            colors={heroColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroRow}>
              <Animated.View style={{ transform: [{ scale: starScale }, { rotate: starRotate }] }}>
                <Sparkles size={16} color="#fff" strokeWidth={2.5} />
              </Animated.View>
              <Text style={styles.heroLabel}>Ты заработала сегодня</Text>
            </View>
            <Text style={styles.heroAmount}>
              $1 284<Text style={styles.heroCents}>.50</Text>
            </Text>
            <View style={styles.heroBadge}>
              <View style={styles.heroChip}>
                <Text style={styles.heroChipText}>📈 +18% вчера</Text>
              </View>
              <Text style={styles.heroSub}>отлично!</Text>
            </View>
          </LinearGradient>
        </FadeUp>

        {/* Metric cards */}
        <FadeUp index={2} style={styles.metricsRow}>
          {/* Sales */}
          {dark && T.metricGrad1 ? (
            <LinearGradient colors={T.metricGrad1} style={[styles.metricCard, { borderColor: T.mint + '40' }]}>
              <Text style={[styles.metricLabel, { color: T.mint }]}>ПРОДАЖИ</Text>
              <Text style={[styles.metricValue, { color: T.ink }]}>$2 140</Text>
              <Text style={[styles.metricSub, { color: T.ink2 }]}>54 покупателя ✨</Text>
            </LinearGradient>
          ) : (
            <View style={[styles.metricCard, { backgroundColor: T.mintSoft, borderColor: T.mint + '40' }]}>
              <Text style={[styles.metricLabel, { color: T.mint }]}>ПРОДАЖИ</Text>
              <Text style={[styles.metricValue, { color: T.ink }]}>$2 140</Text>
              <Text style={[styles.metricSub, { color: T.ink2 }]}>54 покупателя ✨</Text>
            </View>
          )}
          {/* Expenses */}
          {dark && T.metricGrad2 ? (
            <LinearGradient colors={T.metricGrad2} style={[styles.metricCard, { borderColor: T.butter + '40' }]}>
              <Text style={[styles.metricLabel, { color: T.coral }]}>РАСХОДЫ</Text>
              <Text style={[styles.metricValue, { color: T.ink }]}>$855.50</Text>
              <Text style={[styles.metricSub, { color: T.ink2 }]}>стенд + перекусы 🥐</Text>
            </LinearGradient>
          ) : (
            <View style={[styles.metricCard, { backgroundColor: T.butterSoft, borderColor: T.butter + '40' }]}>
              <Text style={[styles.metricLabel, { color: T.coral }]}>РАСХОДЫ</Text>
              <Text style={[styles.metricValue, { color: T.ink }]}>$855.50</Text>
              <Text style={[styles.metricSub, { color: T.ink2 }]}>стенд + перекусы 🥐</Text>
            </View>
          )}
        </FadeUp>

        {/* Top sellers */}
        <FadeUp index={3} style={styles.sellersWrap}>
          <View style={styles.sellersHeader}>
            <View style={styles.sellersTitle}>
              <Heart size={18} color={T.primary} strokeWidth={2.5} fill={T.primary} />
              <Text style={[styles.sellersTitleText, { color: T.ink }]}>
                Народные фавориты
              </Text>
            </View>
            <Text style={[styles.sellersAll, { color: T.primary }]}>все</Text>
          </View>

          <View
            style={[
              styles.sellersCard,
              {
                backgroundColor: dark ? T.cardSurface : T.surface,
                borderColor: T.line,
              },
            ]}
          >
            {TOP_SELLERS.map((item, i) => (
              <View
                key={item.name}
                style={[
                  styles.sellerRow,
                  i < TOP_SELLERS.length - 1 && { borderBottomWidth: 1, borderBottomColor: T.lineSoft },
                ]}
              >
                <View
                  style={[
                    styles.sellerEmoji,
                    { backgroundColor: topSellerBgs[i] },
                  ]}
                >
                  <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.sellerName, { color: T.ink }]}>{item.name}</Text>
                  <Text style={[styles.sellerSold, { color: T.ink3 }]}>
                    {item.sold} продано ✨
                  </Text>
                </View>
                <Text style={[styles.sellerRev, { color: T.ink }]}>{item.rev}</Text>
              </View>
            ))}
          </View>
        </FadeUp>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 4,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
  },
  headTitle: {
    fontFamily: 'Comfortaa_700Bold',
    fontSize: 24,
    letterSpacing: -0.3,
    marginTop: 2,
  },
  bellBtn: {
    width: 46, height: 46,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  bellDot: {
    position: 'absolute',
    top: 10, right: 11,
    width: 9, height: 9,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  heroWrap: { paddingHorizontal: 20, paddingTop: 14 },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    overflow: 'hidden',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroLabel: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Nunito_800ExtraBold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    opacity: 0.9,
    marginLeft: 6,
  },
  heroAmount: {
    fontFamily: 'Comfortaa_700Bold',
    fontSize: 48,
    color: '#fff',
    marginTop: 8,
    letterSpacing: -1.5,
    lineHeight: 56,
  },
  heroCents: {
    fontSize: 26,
    opacity: 0.7,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  heroChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  heroChipText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Nunito_700Bold',
  },
  heroSub: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    opacity: 0.85,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  metricCard: {
    flex: 1,
    borderRadius: 22,
    padding: 14,
    paddingBottom: 16,
    borderWidth: 1.5,
  },
  metricLabel: {
    fontSize: 10,
    fontFamily: 'Nunito_800ExtraBold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontFamily: 'Comfortaa_700Bold',
    fontSize: 22,
    marginTop: 4,
    letterSpacing: -0.5,
  },
  metricSub: {
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
    marginTop: 4,
  },
  sellersWrap: { paddingHorizontal: 20, paddingTop: 20 },
  sellersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sellersTitle: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sellersTitleText: {
    fontFamily: 'Comfortaa_700Bold',
    fontSize: 18,
  },
  sellersAll: { fontSize: 12, fontFamily: 'Nunito_700Bold' },
  sellersCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    paddingHorizontal: 16,
  },
  sellerEmoji: {
    width: 42, height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerName: {
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },
  sellerSold: {
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    marginTop: 1,
  },
  sellerRev: {
    fontFamily: 'Comfortaa_700Bold',
    fontSize: 16,
  },
});
