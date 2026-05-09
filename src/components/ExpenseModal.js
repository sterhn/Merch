import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback,
  StyleSheet, Animated, Dimensions, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, Calendar, Check } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { EXPENSE_CATS } from '../data/mockData';

const SCREEN_HEIGHT = Dimensions.get('window').height;

function Field({ label, value, placeholder, Icon, active, mono, T, dark }) {
  const cardBg = dark ? T.cardSurface : T.surface;
  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.fieldLabel, { color: T.ink2 }]}>{label}</Text>
      <View
        style={[
          styles.fieldInner,
          {
            backgroundColor: cardBg,
            borderColor: active ? T.primary : T.line,
            borderWidth: active ? 2 : 1.5,
            shadowColor: '#000',
          },
        ]}
      >
        {Icon && (
          <Icon
            size={18}
            color={active ? T.primary : T.ink3}
            strokeWidth={2.2}
          />
        )}
        <Text
          style={[
            styles.fieldValue,
            mono && styles.fieldMono,
            { color: value ? T.ink : T.ink3, fontFamily: mono ? 'Comfortaa_700Bold' : 'Nunito_600SemiBold' },
          ]}
        >
          {value || placeholder}
        </Text>
      </View>
    </View>
  );
}

export default function ExpenseModal({ visible, onClose }) {
  const { T, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [selectedCat, setSelectedCat] = useState(0);
  const [tabIdx, setTabIdx] = useState(0);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 360,
        useNativeDriver: true,
        easing: (t) => {
          const c1 = 1.70158;
          const c3 = c1 + 1;
          return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
        },
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 280,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const sheetBg = dark
    ? ['#241A38', '#18141F']
    : [T.bg, T.bg];

  const cardBg = dark ? T.cardSurface : T.surface;
  const tabs = ['💸 Расход', '💰 Доход'];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: slideAnim.interpolate({
                inputRange: [0, SCREEN_HEIGHT],
                outputRange: [1, 0],
              }),
            },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        <LinearGradient
          colors={sheetBg}
          style={[styles.sheetInner, { paddingBottom: insets.bottom + 20 }]}
        >
          {/* Drag handle */}
          <View style={styles.handleWrap}>
            <View style={[styles.handle, { backgroundColor: T.line }]} />
          </View>

          {/* Header */}
          <View style={styles.sheetHeader}>
            <View>
              <Text style={[styles.sheetSubtitle, { color: T.ink2 }]}>куда ушло? 💸</Text>
              <Text style={[styles.sheetTitle, { color: T.ink }]}>Записать расход</Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              style={[styles.closeBtn, { backgroundColor: cardBg, borderColor: T.line }]}
            >
              <X size={18} color={T.ink} strokeWidth={2.4} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Tab toggle */}
            <View style={[styles.tabBar, { backgroundColor: T.surfaceAlt }]}>
              {tabs.map((tab, i) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setTabIdx(i)}
                  activeOpacity={0.7}
                  style={[
                    styles.tabItem,
                    i === tabIdx && { backgroundColor: cardBg, shadowColor: '#000' },
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      { color: i === tabIdx ? T.ink : T.ink3 },
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Amount */}
            <Field
              label="Сколько?"
              value="$124.50"
              mono
              active
              T={T}
              dark={dark}
            />

            {/* Category */}
            <Text style={[styles.catLabel, { color: T.ink2 }]}>Категория?</Text>
            <View style={styles.catGrid}>
              {EXPENSE_CATS.map((cat, i) => {
                const isSel = selectedCat === i;
                const tone = T[cat.color + 'Soft'] || T.primarySoft;
                const fg = T[cat.color] || T.primary;
                return (
                  <TouchableOpacity
                    key={cat.label}
                    onPress={() => setSelectedCat(i)}
                    activeOpacity={0.7}
                    style={[
                      styles.catCard,
                      {
                        backgroundColor: isSel ? cardBg : tone,
                        borderColor: isSel ? T.primary : tone,
                        borderWidth: isSel ? 2 : 1.5,
                      },
                    ]}
                  >
                    <View style={[styles.catIcon, { backgroundColor: tone }]}>
                      <Text style={{ fontSize: 16 }}>{cat.emoji}</Text>
                    </View>
                    <Text style={[styles.catText, { color: T.ink }]}>{cat.label}</Text>
                    {isSel && (
                      <View style={[styles.catCheck, { backgroundColor: T.primary }]}>
                        <Check size={11} color="#fff" strokeWidth={3.5} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Note */}
            <Field
              label="Заметка (не обязательно)"
              placeholder="На что потратила?"
              T={T}
              dark={dark}
            />

            {/* Date */}
            <Field
              label="Когда?"
              value="9 мая, сегодня"
              Icon={Calendar}
              T={T}
              dark={dark}
            />

            {/* Save button */}
            <LinearGradient
              colors={
                dark
                  ? [T.primary + 'EE', T.primaryBorder + 'CC']
                  : [T.primary, T.primary + 'CC']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.saveBtn}
            >
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.85}
                style={styles.saveBtnInner}
              >
                <Text style={styles.saveBtnText}>Сохранить ✨</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ScrollView>
        </LinearGradient>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16,10,28,0.55)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.22,
    shadowRadius: 30,
    elevation: 20,
  },
  sheetInner: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 22,
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 16,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 4,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  sheetSubtitle: { fontSize: 13, fontFamily: 'Nunito_700Bold' },
  sheetTitle: { fontFamily: 'Comfortaa_700Bold', fontSize: 24, marginTop: 2 },
  closeBtn: {
    width: 40, height: 40,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    marginBottom: 18,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  tabText: { fontSize: 13, fontFamily: 'Nunito_700Bold' },
  fieldWrap: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, fontFamily: 'Nunito_700Bold', marginBottom: 6 },
  fieldInner: {
    borderRadius: 16,
    padding: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  fieldValue: { flex: 1, fontSize: 15 },
  fieldMono: { fontSize: 24, letterSpacing: -0.4 },
  catLabel: { fontSize: 12, fontFamily: 'Nunito_700Bold', marginBottom: 8 },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  catCard: {
    width: '47%',
    borderRadius: 16,
    padding: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  catIcon: {
    width: 32, height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catText: { flex: 1, fontSize: 13, fontFamily: 'Nunito_700Bold' },
  catCheck: {
    width: 18, height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtn: {
    borderRadius: 18,
    marginTop: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  saveBtnInner: {
    padding: 17,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito_800ExtraBold',
  },
});
